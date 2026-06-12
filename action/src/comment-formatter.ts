import type { AnalysisResult, AnalysisFinding } from './ai-client';

function severityEmoji(severity: string): string {
  switch (severity) {
    case 'critical': return '🚨';
    case 'warning': return '⚠️';
    case 'info': return 'ℹ️';
    default: return '📌';
  }
}

function riskEmoji(score: number): string {
  if (score <= 3) return '🟢';
  if (score <= 6) return '🟡';
  if (score <= 8) return '🟠';
  return '🔴';
}

function riskLabel(score: number): string {
  if (score <= 3) return 'SAFE';
  if (score <= 6) return 'MODERATE';
  if (score <= 8) return 'HIGH RISK';
  return 'CRITICAL';
}

function formatFinding(f: AnalysisFinding): string {
  const lines: string[] = [];
  lines.push(`<details>`);
  lines.push(`<summary>${severityEmoji(f.severity)} **${f.title}** — \`${f.file}:${f.line}\`</summary>`);
  lines.push('');
  lines.push(`**Category:** ${f.category} | **Severity:** ${f.severity}`);
  lines.push('');
  lines.push(`**Issue:** ${f.description}`);
  lines.push('');
  lines.push(`**Fix:** ${f.suggestion}`);
  if (f.code_snippet) {
    lines.push('');
    lines.push('```suggestion');
    lines.push(f.code_snippet);
    lines.push('```');
  }
  lines.push('</details>');
  return lines.join('\n');
}

export function formatComment(result: AnalysisResult, threshold: number): string {
  const lines: string[] = [];

  const passed = result.risk_score <= threshold;

  lines.push(`## ${riskEmoji(result.risk_score)} PR Guardian Report`);
  lines.push('');
  lines.push(`**Risk Score: ${result.risk_score}/10** — ${riskLabel(result.risk_score)} ${passed ? '✅' : '❌'}`);
  lines.push(`> Threshold: ${threshold}/10`);
  lines.push('');

  if (!passed) {
    lines.push('> [!CAUTION]');
    lines.push('> Risk score exceeds threshold. Review the findings below before merging.');
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push(`### 📊 Summary`);
  lines.push(result.summary);
  lines.push('');

  // Group findings by severity
  const critical = result.findings.filter((f) => f.severity === 'critical');
  const warnings = result.findings.filter((f) => f.severity === 'warning');
  const info = result.findings.filter((f) => f.severity === 'info');

  if (critical.length > 0) {
    lines.push('---');
    lines.push('');
    lines.push(`### 🚨 Critical (${critical.length})`);
    lines.push('');
    lines.push('| File | Line | Issue |');
    lines.push('|------|------|-------|');
    for (const f of critical) {
      lines.push(`| \`${f.file}\` | ${f.line} | ${f.title} |`);
    }
    lines.push('');
    for (const f of critical) {
      lines.push(formatFinding(f));
      lines.push('');
    }
  }

  if (warnings.length > 0) {
    lines.push('---');
    lines.push('');
    lines.push(`### ⚠️ Warnings (${warnings.length})`);
    lines.push('');
    lines.push('| File | Line | Issue |');
    lines.push('|------|------|-------|');
    for (const f of warnings) {
      lines.push(`| \`${f.file}\` | ${f.line} | ${f.title} |`);
    }
    lines.push('');
    for (const f of warnings) {
      lines.push(formatFinding(f));
      lines.push('');
    }
  }

  if (info.length > 0) {
    lines.push('---');
    lines.push('');
    lines.push(`<details><summary>ℹ️ Info (${info.length})</summary>`);
    lines.push('');
    for (const f of info) {
      lines.push(formatFinding(f));
      lines.push('');
    }
    lines.push('</details>');
  }

  lines.push('---');
  lines.push('');
  lines.push('<sub>🤖 Powered by [PR Guardian](https://github.com/ertaneker/pr-guardian) — AI code review for production safety</sub>');

  return lines.join('\n');
}

export function formatCheckRunSummary(result: AnalysisResult): string {
  const criticalCount = result.findings.filter((f) => f.severity === 'critical').length;
  const warningCount = result.findings.filter((f) => f.severity === 'warning').length;

  return [
    `Risk: ${result.risk_score}/10`,
    criticalCount > 0 ? `🚨 ${criticalCount} critical` : '',
    warningCount > 0 ? `⚠️ ${warningCount} warnings` : '',
  ]
    .filter(Boolean)
    .join(' | ');
}
