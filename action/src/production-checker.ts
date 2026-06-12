/**
 * Production Breaking Change Detection Engine
 *
 * Deterministic rule-based checks that run alongside AI analysis.
 * These catch what AI might miss — the PR Shield USP layer.
 */

import type { FileChunk } from './diff-parser';
import type { AnalysisFinding } from './ai-client';

// --- Types ---

interface MigrationPattern {
  schemaPatterns: RegExp[];
  migrationPaths: string[];
  framework: string;
}

interface DependencyFile {
  path: string;
  dependencySection: RegExp;
  versionExtractor: RegExp;
}

// --- Migration Detection ---

const MIGRATION_PATTERNS: Record<string, MigrationPattern> = {
  prisma: {
    schemaPatterns: [/prisma\/schema\.prisma$/],
    migrationPaths: ['prisma/migrations/'],
    framework: 'Prisma',
  },
  typeorm: {
    schemaPatterns: [/\.entity\.ts$/],
    migrationPaths: ['migrations/', 'src/migrations/', 'db/migrations/'],
    framework: 'TypeORM',
  },
  django: {
    schemaPatterns: [/models\.py$/],
    migrationPaths: ['migrations/'],
    framework: 'Django',
  },
  rails: {
    schemaPatterns: [/db\/schema\.rb$/, /db\/migrate\/.+\.rb$/],
    migrationPaths: ['db/migrate/'],
    framework: 'Rails',
  },
  golang: {
    schemaPatterns: [/-migration\.go$/, /migration_.+\.go$/],
    migrationPaths: ['migrations/', 'db/migrations/'],
    framework: 'Go Migrations',
  },
  flyway: {
    schemaPatterns: [/\.sql$/],
    migrationPaths: ['db/migration/', 'sql/', 'migrations/'],
    framework: 'Flyway/SQL',
  },
  knex: {
    schemaPatterns: [/knexfile\./, /migration.*\.ts$/, /migration.*\.js$/],
    migrationPaths: ['migrations/'],
    framework: 'Knex',
  },
};

const ALL_MIGRATION_PATTERNS = Object.values(MIGRATION_PATTERNS);

export function checkMigrationChanges(chunks: FileChunk[]): AnalysisFinding[] {
  const findings: AnalysisFinding[] = [];

  // Find schema/model changes
  const schemaChanges = chunks.filter((c) =>
    ALL_MIGRATION_PATTERNS.some((p) =>
      p.schemaPatterns.some((r) => r.test(c.filename))
    )
  );

  if (schemaChanges.length === 0) return findings;

  // Find migration files in the same PR
  const migrationFiles = chunks.filter((c) =>
    ALL_MIGRATION_PATTERNS.some((p) =>
      p.migrationPaths.some((path) => c.filename.includes(path))
    )
  );

  for (const schemaChange of schemaChanges) {
    // Determine which framework
    const matchedFramework = ALL_MIGRATION_PATTERNS.find((p) =>
      p.schemaPatterns.some((r) => r.test(schemaChange.filename))
    );

    if (matchedFramework && migrationFiles.length === 0) {
      findings.push({
        severity: 'critical',
        file: schemaChange.filename,
        line: 1,
        category: 'bug',
        title: `Schema change detected without migration file (${matchedFramework.framework})`,
        description: `This PR modifies ${schemaChange.filename} which appears to be a database schema/model file. However, no corresponding migration file was found in the PR. Deploying this without a migration will cause schema drift between code and database.`,
        suggestion: `Add a migration file in ${matchedFramework.migrationPaths.join(' or ')} that reflects the schema changes in this PR.`,
        confidence: 90,
      });
    }
  }

  return findings;
}

// --- API Contract Break Detection ---

const API_CONTRACT_PATTERNS = [
  // TypeScript interfaces / types used in API responses
  /\.types?\.ts$/,
  /\.dto\.ts$/,
  /\.schema\.ts$/,
  /-response\.ts$/,
  /-request\.ts$/,
  // GraphQL schemas
  /schema\.graphql$/,
  /\.graphql$/,
  // OpenAPI / Swagger
  /openapi\.ya?ml$/,
  /swagger\.ya?ml$/,
  // Protobuf
  /\.proto$/,
  // JSON Schema
  /\.schema\.json$/,
];

const BREAKING_CHANGE_INDICATORS = [
  // Removed fields (line starts with - and contains a field definition)
  { pattern: /^-\s*(readonly\s+)?(\w+)\??\s*:\s*.+/, type: 'removed_field' },
  { pattern: /^-\s*(\w+)\s*\(.*\)\s*:\s*.+/, type: 'removed_method' },
  // Required added (optional → required)
  { pattern: /^\+\s*(readonly\s+)?(\w+)\s*:\s*(?!.*\?)/, type: 'new_required_field' },
];

export function checkApiContractBreaks(chunks: FileChunk[]): AnalysisFinding[] {
  const findings: AnalysisFinding[] = [];

  const apiFiles = chunks.filter((c) =>
    API_CONTRACT_PATTERNS.some((p) => p.test(c.filename))
  );

  if (apiFiles.length === 0) return findings;

  for (const file of apiFiles) {
    const lines = file.patch.split('\n');

    for (const line of lines) {
      for (const indicator of BREAKING_CHANGE_INDICATORS) {
        if (indicator.pattern.test(line)) {
          const severity: 'critical' | 'warning' =
            indicator.type === 'removed_field' || indicator.type === 'removed_method'
              ? 'critical'
              : 'warning';

          const descriptions: Record<string, string> = {
            removed_field: `A field appears to have been removed from \`${file.filename}\`. Clients depending on this field will break.`,
            removed_method: `A method appears to have been removed from \`${file.filename}\`. Clients calling this method will break.`,
            new_required_field: `A new required field appears to have been added to \`${file.filename}\`. Existing clients that don't send this field may break.`,
          };

          findings.push({
            severity,
            file: file.filename,
            line: lines.indexOf(line) + 1,
            category: 'bug',
            title: `API Contract Break: ${indicator.type.replace(/_/g, ' ')}`,
            description: descriptions[indicator.type] || `API contract change detected in ${file.filename}`,
            suggestion: 'Verify that all API consumers are compatible with this change. Consider versioning the API or adding a deprecation period.',
            confidence: 70,
          });
        }
      }
    }
  }

  return findings;
}

// --- Config Drift Detection ---

const CONFIG_FILE_PAIRS: [RegExp, RegExp][] = [
  // .env → .env.example
  [/\.env$/, /\.env\.example$/],
  // config.ts → config.example.ts
  [/config\.(ts|js|json|ya?ml)$/, /config\.example\.(ts|js|json|ya?ml)$/],
  // docker-compose → docker-compose.example
  [/docker-compose\.ya?ml$/, /docker-compose\.example\.ya?ml$/],
];

export function checkConfigDrift(chunks: FileChunk[]): AnalysisFinding[] {
  const findings: AnalysisFinding[] = [];

  for (const [configPattern, examplePattern] of CONFIG_FILE_PAIRS) {
    const configFile = chunks.find((c) => configPattern.test(c.filename));
    const exampleFile = chunks.find((c) => examplePattern.test(c.filename));

    // Config changed but example wasn't updated
    if (configFile && !exampleFile) {
      // Extract new env vars from the config change
      const newVars = extractNewEnvVars(configFile.patch);

      findings.push({
        severity: 'warning',
        file: configFile.filename,
        line: 1,
        category: 'architecture',
        title: 'Config file changed without updating example file',
        description: `\`${configFile.filename}\` was modified but no corresponding change was found for its example file. Team members won't know about the new configuration requirements.${newVars.length > 0 ? `\n\nNew variables detected: \`${newVars.join('`, `')}\`` : ''}`,
        suggestion: `Update the corresponding example config file with the new variables and safe defaults.`,
        confidence: 85,
      });
    }
  }

  return findings;
}

function extractNewEnvVars(patch: string): string[] {
  const vars: string[] = [];
  const lines = patch.split('\n');
  for (const line of lines) {
    if (line.startsWith('+') && !line.startsWith('+++')) {
      const match = line.match(/^\+[^=]*?(\w+)\s*=\s*/);
      if (match && match[1]) {
        vars.push(match[1]);
      }
    }
  }
  return [...new Set(vars)];
}

// --- Dependency Breaking Change Detection ---

const DEPENDENCY_FILES: DependencyFile[] = [
  {
    path: 'package.json',
    dependencySection: /"dependencies"\s*:\s*\{([^}]+)\}/,
    versionExtractor: /"([^"]+)":\s*"([^"]+)"/g,
  },
  {
    path: 'pyproject.toml',
    dependencySection: /dependencies\s*=\s*\[([^\]]+)\]/,
    versionExtractor: /"([^"]+)\s*([><=!^~]+.*?)"/g,
  },
  {
    path: 'go.mod',
    dependencySection: /require\s*\(([^)]+)\)/,
    versionExtractor: /(\S+)\s+(v[\d.]+)/g,
  },
  {
    path: 'Cargo.toml',
    dependencySection: /\[dependencies\]([\s\S]*?)(?:\[|$)/,
    versionExtractor: /(\w+)\s*=\s*"([^"]+)"/g,
  },
  {
    path: 'Gemfile',
    dependencySection: /gem\s+['"](\w+)['"]\s*,\s*['"]([^'"]+)['"]/g,
    versionExtractor: /gem\s+['"](\w+)['"]\s*,\s*['"]([^'"]+)['"]/g,
  },
];

function isMajorVersionBump(oldVer: string, newVer: string): boolean {
  const extract = (v: string) => {
    const match = v.match(/[v^~>=<\s]*(\d+)\.(\d+)(?:\.(\d+))?/);
    if (!match) return null;
    return {
      major: parseInt(match[1] || '0'),
      minor: parseInt(match[2] || '0'),
      patch: parseInt(match[3] || '0'),
    };
  };

  const oldV = extract(oldVer);
  const newV = extract(newVer);

  if (!oldV || !newV) return false;
  return newV.major > oldV.major;
}

export function checkDependencyConflicts(chunks: FileChunk[]): AnalysisFinding[] {
  const findings: AnalysisFinding[] = [];

  for (const depFile of DEPENDENCY_FILES) {
    const chunk = chunks.find((c) => c.filename === depFile.path);
    if (!chunk) continue;

    const lines = chunk.patch.split('\n');
    const changes: { name: string; oldVer: string; newVer: string }[] = [];

    for (const line of lines) {
      if (line.startsWith('-') && !line.startsWith('---')) {
        const clean = line.substring(1);
        const match = depFile.versionExtractor.exec(clean);
        // Need to handle differently per format
        // Generic approach: look for version changes
      }

      // Simpler approach: compare - and + lines for the same dependency
      const depMatch = line.match(/"([^"]+)":\s*"([^"]+)"/);
      if (depMatch) {
        const name = depMatch[1] || '';
        const version = depMatch[2] || '';
        if (line.startsWith('-') && !line.startsWith('---')) {
          // Find corresponding + line
          const addLine = lines.find(
            (l) =>
              l.startsWith('+') &&
              !l.startsWith('+++') &&
              l.includes(`"${name}"`)
          );
          if (addLine) {
            const addMatch = addLine.match(/"([^"]+)":\s*"([^"]+)"/);
            if (addMatch && addMatch[2]) {
              changes.push({ name, oldVer: version, newVer: addMatch[2] });
            }
          }
        }
      }
    }

    // Reset regex lastIndex
    depFile.versionExtractor.lastIndex = 0;

    for (const change of changes) {
      if (isMajorVersionBump(change.oldVer, change.newVer)) {
        findings.push({
          severity: 'warning',
          file: depFile.path,
          line: 1,
          category: 'architecture',
          title: `Major version bump: ${change.name} (${change.oldVer} → ${change.newVer})`,
          description: `${change.name} is being upgraded from ${change.oldVer} to ${change.newVer}. This is a MAJOR version change which likely includes breaking API changes, removed features, or changed behavior.`,
          suggestion: `Review the ${change.name} changelog for breaking changes. Test thoroughly before deploying.`,
          confidence: 80,
        });
      }
    }
  }

  return findings;
}

// --- Combined Check ---

export interface ProductionCheckResult {
  migrationFindings: AnalysisFinding[];
  apiContractFindings: AnalysisFinding[];
  configDriftFindings: AnalysisFinding[];
  dependencyFindings: AnalysisFinding[];
  allFindings: AnalysisFinding[];
  riskContribution: number; // 0-3 points added to AI risk score
}

export function runProductionChecks(chunks: FileChunk[]): ProductionCheckResult {
  const migrationFindings = checkMigrationChanges(chunks);
  const apiContractFindings = checkApiContractBreaks(chunks);
  const configDriftFindings = checkConfigDrift(chunks);
  const dependencyFindings = checkDependencyConflicts(chunks);

  const allFindings = [
    ...migrationFindings,
    ...apiContractFindings,
    ...configDriftFindings,
    ...dependencyFindings,
  ];

  // Calculate risk contribution (0-3)
  let riskContribution = 0;
  if (migrationFindings.length > 0) riskContribution += 2;
  if (apiContractFindings.length > 0) riskContribution += 1;
  if (configDriftFindings.length > 0) riskContribution += 0.5;
  if (dependencyFindings.length > 0) riskContribution += 0.5;

  return {
    migrationFindings,
    apiContractFindings,
    configDriftFindings,
    dependencyFindings,
    allFindings,
    riskContribution: Math.min(3, Math.round(riskContribution)),
  };
}
