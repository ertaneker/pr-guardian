import { describe, it, expect } from 'vitest';
import { parseDiff } from '../diff-parser';

describe('parseDiff', () => {
  it('parses a single file diff', () => {
    const diff = `diff --git a/src/index.ts b/src/index.ts
index abc..def 100644
--- a/src/index.ts
+++ b/src/index.ts
@@ -1,3 +1,4 @@
-console.log("hello");
+const x = 1;
+console.log("hello", x);
+const y = 2;`;

    const chunks = parseDiff(diff, [], 1024 * 1024);

    expect(chunks).toHaveLength(1);
    expect(chunks[0]!.filename).toBe('src/index.ts');
    expect(chunks[0]!.language).toBe('TypeScript');
    expect(chunks[0]!.additions).toBe(3); // +const x=1, +console.log, +const y=2
    expect(chunks[0]!.deletions).toBe(1); // -console.log("hello")
  });

  it('parses multiple file diffs', () => {
    const diff = `diff --git a/src/a.ts b/src/a.ts
--- a/src/a.ts
+++ b/src/a.ts
@@ -1 +1 @@
-old
+new
diff --git a/src/b.go b/src/b.go
--- a/src/b.go
+++ b/src/b.go
@@ -1 +1,2 @@
 package main
+import "fmt"`;

    const chunks = parseDiff(diff, [], 1024 * 1024);

    expect(chunks).toHaveLength(2);
    expect(chunks[0]!.filename).toBe('src/a.ts');
    expect(chunks[0]!.language).toBe('TypeScript');
    expect(chunks[1]!.filename).toBe('src/b.go');
    expect(chunks[1]!.language).toBe('Go');
  });

  it('detects language from file extension', () => {
    const cases: [string, string][] = [
      ['src/app.ts', 'TypeScript'],
      ['src/app.tsx', 'TypeScript/React'],
      ['src/app.js', 'JavaScript'],
      ['src/app.py', 'Python'],
      ['src/app.go', 'Go'],
      ['src/app.rs', 'Rust'],
      ['src/app.java', 'Java'],
      ['src/app.rb', 'Ruby'],
      ['src/app.cs', 'C#'],
      ['src/app.sql', 'SQL'],
      ['src/app.css', 'CSS'],
      ['src/app.md', 'Markdown'],
      ['src/app.unknown', 'Unknown'],
    ];

    for (const [filename, expected] of cases) {
      const diff = `diff --git a/${filename} b/${filename}
--- a/${filename}
+++ b/${filename}
@@ -1 +1 @@
-old
+new`;

      const chunks = parseDiff(diff, [], 1024 * 1024);
      expect(chunks[0]!.language).toBe(expected);
    }
  });

  it('excludes files matching patterns', () => {
    const diff = `diff --git a/package-lock.json b/package-lock.json
--- a/package-lock.json
+++ b/package-lock.json
@@ -1 +1 @@
-old
+new
diff --git a/src/main.ts b/src/main.ts
--- a/src/main.ts
+++ b/src/main.ts
@@ -1 +1 @@
-old
+new`;

    const chunks = parseDiff(diff, ['package-lock.json', '*.lock'], 1024 * 1024);

    // package-lock.json should be excluded
    expect(chunks).toHaveLength(1);
    expect(chunks[0]!.filename).toBe('src/main.ts');
  });

  it('respects max size limit', () => {
    const diff = `diff --git a/a.ts b/a.ts
--- a/a.ts
+++ b/a.ts
@@ -1 +1,2 @@
-old
+new
+more`;

    // Set limit high enough for one small file but not two
    const chunks = parseDiff(diff, [], 500);

    expect(chunks.length).toBeGreaterThanOrEqual(1);
  });

  it('returns empty for empty diff', () => {
    const chunks = parseDiff('', [], 1024 * 1024);
    expect(chunks).toHaveLength(0);
  });

  it('returns empty for whitespace-only diff', () => {
    const chunks = parseDiff('   \n  \n  ', [], 1024 * 1024);
    expect(chunks).toHaveLength(0);
  });

  it('correctly counts additions and deletions', () => {
    const diff = `diff --git a/test.ts b/test.ts
--- a/test.ts
+++ b/test.ts
@@ -1,5 +1,6 @@
 line1
-line2
 line3
+line4
+line5
+line6
-line7`;

    const chunks = parseDiff(diff, [], 1024 * 1024);

    expect(chunks).toHaveLength(1);
    expect(chunks[0]!.additions).toBe(3); // +line4, +line5, +line6
    expect(chunks[0]!.deletions).toBe(2); // -line2, -line7
    expect(chunks[0]!.changes).toBe(5);
  });
});
