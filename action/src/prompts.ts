// Prompt templates for PR Shield — optimized for DeepSeek V3

export const SYSTEM_PROMPT = `You are PR Shield, a senior software engineer specialized in production safety.
Your mission: identify what could break in production if this PR is merged.

ANALYSIS CATEGORIES (check each):

1. PRODUCTION BREAKING CHANGES:
   - Database schema changes without migrations
   - API response shape changes (added/removed/renamed fields)
   - Config/environment variable changes not reflected in .env.example
   - Dependency version bumps that include breaking changes

2. SECURITY:
   - SQL/NoSQL injection (string concatenation in queries)
   - XSS (unsanitized output, innerHTML, dangerouslySetInnerHTML)
   - Hardcoded secrets, tokens, keys, passwords
   - Missing authentication/authorization checks
   - Path traversal, command injection

3. BUGS:
   - Null/nil/undefined access without guards
   - Type mismatches, unsafe casts, "any" types
   - Race conditions (shared state without synchronization)
   - Unhandled promise rejections, missing await
   - Off-by-one errors, incorrect boundary checks
   - Infinite loops or recursion without base case

4. PERFORMANCE:
   - Database queries inside loops (N+1 pattern)
   - Missing index for new query patterns
   - Large allocations without cleanup
   - Synchronous I/O in async context
   - Missing memoization/caching where appropriate

5. ARCHITECTURE:
   - Circular imports/dependencies
   - Tight coupling between unrelated modules
   - Missing error handling for external calls
   - God objects/classes doing too many things

RULES:
- Only report REAL issues found in the diff. Do not invent hypothetical problems.
- For each finding, provide the EXACT file and line number from the diff.
- If there are no issues, return an empty findings array with risk_score 1.
- Be specific: say "line 42: user.email might be null, accessing .toLowerCase() will throw" not "null safety issue".
- If a dependency was updated, check if it's a major version bump (breaking change).
- For database changes, check if a migration file was also added in the same PR.
- For config changes, check if .env.example or equivalent was also updated.`;

export const FEW_SHOT_EXAMPLE = `EXAMPLE ANALYSIS:

INPUT DIFF:
--- a/src/auth.ts
+++ b/src/auth.ts
@@ -40,6 +40,8 @@ export async function login(req: Request) {
   const { email, password } = req.body;
+  const user = await db.query("SELECT * FROM users WHERE email = '" + email + "'");
+  localStorage.setItem('session', JSON.stringify(user));
   return { token: generateToken(user) };

--- a/package.json
+++ b/package.json
@@ -12,7 +12,7 @@
-    "express": "^4.18.0",
+    "express": "^5.0.0",

OUTPUT:
{
  "risk_score": 9,
  "summary": "Critical: SQL injection vulnerability introduced via string concatenation in auth query. Session stored in localStorage (XSS risk). Express major version bump (v4 to v5) includes breaking changes. Deploying this will likely compromise user sessions and potentially break middleware.",
  "findings": [
    {
      "severity": "critical",
      "file": "src/auth.ts",
      "line": 42,
      "category": "security",
      "title": "SQL Injection in login query",
      "description": "User email is directly concatenated into SQL query string. An attacker can inject SQL via the email field to bypass authentication or extract data.",
      "suggestion": "Use parameterized queries: db.query('SELECT * FROM users WHERE email = ?', [email])",
      "code_snippet": "const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);"
    },
    {
      "severity": "critical",
      "file": "src/auth.ts",
      "line": 43,
      "category": "security",
      "title": "Session token stored in localStorage",
      "description": "Storing session tokens in localStorage exposes them to XSS attacks. Any script on the page can read the token.",
      "suggestion": "Use httpOnly, secure, SameSite cookies for session tokens instead of localStorage.",
      "code_snippet": "res.cookie('session', token, { httpOnly: true, secure: true, sameSite: 'strict' });"
    },
    {
      "severity": "warning",
      "file": "package.json",
      "line": 14,
      "category": "architecture",
      "title": "Express v5 major version bump",
      "description": "Express v5 includes breaking changes: app.del() removed, app.param() signature changed, res.json() behavior changes. Middleware and route handlers may break silently.",
      "suggestion": "Review the Express v5 migration guide. Test all route handlers and middleware. Consider keeping v4 until changes are verified."
    }
  ]
}`;

export const LANGUAGE_SPECIFIC_RULES: Record<string, string> = {
  TypeScript: `
TypeScript-specific checks:
- "any" type usage that bypasses type safety
- "as" assertions that could hide type mismatches
- Missing null checks on optional properties (user?.profile?.name)
- Promise<void> without error handling
- React hooks: missing useEffect dependencies, state mutation
`,
  JavaScript: `
JavaScript-specific checks:
- == instead of === (type coercion bugs)
- Undeclared variables or implicit globals
- Callback-based code without error handling
- console.log left in production code
`,
  Python: `
Python-specific checks:
- Bare except: clauses swallowing exceptions
- Mutable default arguments (def f(items=[]))
- eval() or exec() usage with user input
- f-string used in logging (potential injection)
- Asyncio.create_task without error handling
- Opening files without context manager (with)
`,
  Go: `
Go-specific checks:
- Unhandled error returns (val, _ := func())
- Goroutine leaks (missing context cancellation)
- Defer in loop body (resource accumulation)
- Nil pointer dereference without guard
- Mutex copy by value
- time.Ticker without Stop()
`,
  Java: `
Java-specific checks:
- SQL string concatenation (PreparedStatement not used)
- Resource leak (Stream, Connection not in try-with-resources)
- Null return without @Nullable annotation
- Thread safety (SimpleDateFormat shared across threads)
- equals() vs == for String comparison
`,
  'C#': `
C#-specific checks:
- async void methods (should be async Task)
- IDisposable not wrapped in using statement
- LINQ multiple enumeration (ToList() missing)
- NullReferenceException risk without null guard
- HttpClient not reused (socket exhaustion)
`,
  Rust: `
Rust-specific checks:
- unwrap() or expect() in production code
- unsafe block usage
- Clone() in hot paths (performance)
- Mutex lock held across await points
- Missing error context (using ? without .context())
`,
  Ruby: `
Ruby-specific checks:
- SQL injection via string interpolation
- Mass assignment vulnerability (no strong params)
- N+1 query pattern (missing .includes())
- Secrets in code (Rails.credentials not used)
- eval() with user input
`,
  SQL: `
SQL migration checks:
- New columns without DEFAULT value on NOT NULL
- Dropped columns referenced in application code
- Index missing on new foreign key columns
- Table locks (ALTER TABLE without CONCURRENTLY in Postgres)
- Data type change that could truncate data
`,
};

export function buildLanguageContext(languages: string[]): string {
  const unique = [...new Set(languages)];
  return unique
    .map((lang) => LANGUAGE_SPECIFIC_RULES[lang])
    .filter(Boolean)
    .join('\n');
}

export function buildUserPrompt(
  diffText: string,
  prTitle: string,
  prBody: string,
  fileCount: number,
  additions: number,
  deletions: number,
  languageContext: string
): string {
  return `PR Title: ${prTitle}
PR Description: ${prBody || 'No description provided'}

Statistics: ${fileCount} files, +${additions} -${deletions} lines

${languageContext ? `LANGUAGE-SPECIFIC CHECKS:\n${languageContext}` : ''}

DIFF TO REVIEW:
${diffText}

${FEW_SHOT_EXAMPLE}

Now analyze the DIFF TO REVIEW above following the same format. Output ONLY valid JSON (no markdown wrapping):`;
}
