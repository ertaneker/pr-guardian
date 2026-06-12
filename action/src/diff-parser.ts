export interface FileChunk {
  filename: string;
  language: string;
  patch: string;
  additions: number;
  deletions: number;
  changes: number;
}

const EXT_TO_LANG: Record<string, string> = {
  '.ts': 'TypeScript',
  '.tsx': 'TypeScript/React',
  '.js': 'JavaScript',
  '.jsx': 'JavaScript/React',
  '.py': 'Python',
  '.go': 'Go',
  '.rs': 'Rust',
  '.java': 'Java',
  '.kt': 'Kotlin',
  '.cs': 'C#',
  '.rb': 'Ruby',
  '.php': 'PHP',
  '.swift': 'Swift',
  '.sql': 'SQL',
  '.yaml': 'YAML',
  '.yml': 'YAML',
  '.json': 'JSON',
  '.toml': 'TOML',
  '.md': 'Markdown',
  '.css': 'CSS',
  '.scss': 'SCSS',
  '.html': 'HTML',
  '.vue': 'Vue',
  '.svelte': 'Svelte',
};

function detectLanguage(filename: string): string {
  const ext = filename.substring(filename.lastIndexOf('.'));
  return EXT_TO_LANG[ext] || 'Unknown';
}

function isExcluded(filename: string, patterns: string[]): boolean {
  return patterns.some((pattern) => {
    const regex = new RegExp(
      '^' + pattern.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$'
    );
    return regex.test(filename);
  });
}

export function parseDiff(
  diff: string,
  excludePatterns: string[],
  maxSizeBytes: number
): FileChunk[] {
  const chunks: FileChunk[] = [];
  const fileHeaderRegex = /^diff --git a\/(.+) b\/(.+)$/m;

  const files = diff.split(/(?=^diff --git )/m);

  let totalSize = 0;

  for (const file of files) {
    if (!file.trim()) continue;

    const headerMatch = file.match(fileHeaderRegex);
    if (!headerMatch || !headerMatch[1]) continue;

    const filename = headerMatch[1];

    if (isExcluded(filename, excludePatterns)) {
      continue;
    }

    const lines = file.split('\n');
    let additions = 0;
    let deletions = 0;

    for (const line of lines) {
      if (line.startsWith('+') && !line.startsWith('+++')) additions++;
      if (line.startsWith('-') && !line.startsWith('---')) deletions++;
    }

    const patchSize = Buffer.byteLength(file, 'utf8');
    if (totalSize + patchSize > maxSizeBytes) {
      break;
    }

    totalSize += patchSize;

    chunks.push({
      filename,
      language: detectLanguage(filename),
      patch: file,
      additions,
      deletions,
      changes: additions + deletions,
    });
  }

  return chunks;
}
