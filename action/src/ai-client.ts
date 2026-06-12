import Anthropic from '@anthropic-ai/sdk';
import type { FileChunk } from './diff-parser';

export interface AnalysisFinding {
  severity: 'critical' | 'warning' | 'info';
  file: string;
  line: number;
  category: 'security' | 'performance' | 'bug' | 'architecture' | 'style';
  title: string;
  description: string;
  suggestion: string;
  code_snippet?: string;
}

export interface AnalysisResult {
  risk_score: number;
  summary: string;
  findings: AnalysisFinding[];
}

const SYSTEM_PROMPT = `You are a senior software engineer conducting a thorough code review of a pull request.
Your goal is to answer: "What could this PR break in production?"

Analyze the diff and identify:
1. BREAKING CHANGES: API changes, DB schema changes, config changes
2. SECURITY: SQL injection, XSS, hardcoded secrets, auth bypass
3. BUGS: Null pointers, type errors, race conditions, logic errors
4. PERFORMANCE: N+1 queries, memory leaks, blocking I/O
5. ARCHITECTURE: Circular deps, God classes, layer violations

Respond with a JSON object (no markdown code block):
{
  "risk_score": 1-10,
  "summary": "2-3 sentence executive summary of the overall risk",
  "findings": [
    {
      "severity": "critical|warning|info",
      "file": "filename",
      "line": line_number,
      "category": "security|performance|bug|architecture|style",
      "title": "short title",
      "description": "what the issue is and why it matters",
      "suggestion": "how to fix it",
      "code_snippet": "example fix (optional)"
    }
  ]
}

Important rules:
- Only report REAL issues, not theoretical ones
- Provide specific line numbers when possible
- Be concise but thorough
- Risk score 1-3: safe, minor changes. 4-6: moderate risk. 7-8: high risk. 9-10: critical, likely to break production`;

export async function analyzeDiff(
  chunks: FileChunk[],
  apiKey: string,
  prContext?: { title?: string; body?: string }
): Promise<AnalysisResult> {
  const anthropic = new Anthropic({ apiKey });

  // Build the diff text from chunks
  const diffText = chunks
    .map((c) => `### ${c.filename} (${c.language})\n\`\`\`diff\n${c.patch}\n\`\`\``)
    .join('\n\n');

  const prTitle = prContext?.title || 'N/A';
  const prBody = prContext?.body || 'N/A';

  const userMessage = `PR Title: ${prTitle}
PR Description: ${prBody}

Files changed: ${chunks.length}
Total additions: ${chunks.reduce((s, c) => s + c.additions, 0)}
Total deletions: ${chunks.reduce((s, c) => s + c.deletions, 0)}

DIFF:
${diffText}`;

  // Truncate if too large for context window
  const maxChars = 150000; // ~37K tokens safely under 200K limit
  const truncated = userMessage.length > maxChars
    ? userMessage.substring(0, maxChars) + '\n\n[Diff truncated due to size]'
    : userMessage;

  const msg = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: truncated }],
  });

  const text = msg.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n');

  // Parse JSON response
  try {
    // Strip markdown code blocks if present
    const jsonStr = text.replace(/```(?:json)?\s*/g, '').replace(/```\s*$/g, '').trim();
    const result: AnalysisResult = JSON.parse(jsonStr);

    // Validate
    if (typeof result.risk_score !== 'number' || !Array.isArray(result.findings)) {
      throw new Error('Invalid AI response structure');
    }

    return result;
  } catch {
    // Fallback: return a basic result
    return {
      risk_score: 5,
      summary: 'AI analysis produced an unexpected response format. Please review manually.',
      findings: [
        {
          severity: 'info',
          file: 'N/A',
          line: 0,
          category: 'style',
          title: 'AI Analysis Error',
          description: `The AI returned an unexpected response format. Raw response:\n\n${text.substring(0, 500)}`,
          suggestion: 'Please review the PR manually or re-run the action.',
        },
      ],
    };
  }
}
