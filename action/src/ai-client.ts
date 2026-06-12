import OpenAI from 'openai';
import type { FileChunk } from './diff-parser';
import {
  SYSTEM_PROMPT,
  buildUserPrompt,
  buildLanguageContext,
} from './prompts';

// --- Types ---

export interface AnalysisFinding {
  severity: 'critical' | 'warning' | 'info';
  file: string;
  line: number;
  category: 'security' | 'performance' | 'bug' | 'architecture' | 'style';
  title: string;
  description: string;
  suggestion: string;
  code_snippet?: string;
  confidence?: number; // 0-100, AI's confidence in this finding
}

export interface AnalysisResult {
  risk_score: number;
  summary: string;
  findings: AnalysisFinding[];
  model: string;
  tokens_used: number;
  analysis_time_ms: number;
}

export interface AIError {
  code: string;
  message: string;
  retryable: boolean;
}

// --- AI Client ---

const DEEPSEEK_BASE_URL = 'https://api.deepseek.com/v1';
const MODEL = 'deepseek-chat';
const MAX_TOKENS = 4096;
const TEMPERATURE = 0.1;
const MAX_RETRIES = 2;
const MAX_DIFF_CHARS = 45000;

function chunkDiffForAI(chunks: FileChunk[]): string {
  return chunks
    .map((c) => {
      const header = `### ${c.filename} (${c.language}) [+${c.additions} -${c.deletions}]`;
      return `${header}\n\`\`\`diff\n${c.patch}\n\`\`\``;
    })
    .join('\n\n');
}

function parseAIResponse(text: string): AnalysisResult {
  // Strip markdown code blocks, trim whitespace
  let jsonStr = text
    .replace(/```(?:json)?\s*/gi, '')
    .replace(/```\s*$/gi, '')
    .trim();

  // Find JSON object boundaries if there's surrounding text
  const jsonStart = jsonStr.indexOf('{');
  const jsonEnd = jsonStr.lastIndexOf('}') + 1;
  if (jsonStart >= 0 && jsonEnd > jsonStart) {
    jsonStr = jsonStr.substring(jsonStart, jsonEnd);
  }

  const result = JSON.parse(jsonStr) as AnalysisResult;

  // Validate
  if (typeof result.risk_score !== 'number' || result.risk_score < 1 || result.risk_score > 10) {
    throw new Error(`Invalid risk_score: ${result.risk_score}`);
  }
  if (!Array.isArray(result.findings)) {
    throw new Error('findings is not an array');
  }
  if (typeof result.summary !== 'string') {
    throw new Error('summary is not a string');
  }

  // Validate each finding
  for (const f of result.findings) {
    if (!['critical', 'warning', 'info'].includes(f.severity)) {
      f.severity = 'info';
    }
    if (!['security', 'performance', 'bug', 'architecture', 'style'].includes(f.category)) {
      f.category = 'style';
    }
    f.file = f.file || 'unknown';
    f.line = typeof f.line === 'number' ? f.line : 0;
    f.title = f.title || 'Untitled finding';
    f.description = f.description || 'No description';
    f.suggestion = f.suggestion || 'No suggestion provided';
  }

  return result;
}

function buildFallbackResult(partialText: string): AnalysisResult {
  return {
    risk_score: 5,
    summary: 'AI analysis returned an unexpected format. Manual review recommended.',
    findings: [
      {
        severity: 'info',
        file: 'N/A',
        line: 0,
        category: 'style',
        title: 'AI Response Parse Error',
        description: `Could not parse AI response as JSON. Raw response (truncated): ${partialText.substring(0, 300)}`,
        suggestion: 'Re-run the action or review the PR manually. If this persists, the diff may be too large or contain unparseable content.',
        confidence: 100,
      },
    ],
    model: MODEL,
    tokens_used: 0,
    analysis_time_ms: 0,
  };
}

async function callDeepSeek(
  client: OpenAI,
  userMessage: string
): Promise<{ text: string; tokens: number }> {
  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userMessage },
    ],
    temperature: TEMPERATURE,
    max_tokens: MAX_TOKENS,
  });

  const text = response.choices[0]?.message?.content || '';
  const tokens = response.usage?.total_tokens || 0;

  return { text, tokens };
}

// --- Public API ---

export async function analyzeDiff(
  chunks: FileChunk[],
  apiKey: string,
  prContext?: { title?: string; body?: string }
): Promise<AnalysisResult> {
  const startTime = Date.now();

  if (!chunks || chunks.length === 0) {
    return {
      risk_score: 1,
      summary: 'No files to analyze in this PR.',
      findings: [],
      model: MODEL,
      tokens_used: 0,
      analysis_time_ms: 0,
    };
  }

  const client = new OpenAI({
    apiKey,
    baseURL: DEEPSEEK_BASE_URL,
    maxRetries: 1,
    timeout: 60000,
  });

  const prTitle = prContext?.title || 'N/A';
  const prBody = prContext?.body || 'N/A';
  const languages = chunks.map((c) => c.language);
  const languageContext = buildLanguageContext(languages);
  const additions = chunks.reduce((s, c) => s + c.additions, 0);
  const deletions = chunks.reduce((s, c) => s + c.deletions, 0);

  let diffText = chunkDiffForAI(chunks);

  // Truncate if too large
  if (diffText.length > MAX_DIFF_CHARS) {
    diffText = diffText.substring(0, MAX_DIFF_CHARS) +
      '\n\n[Diff truncated — too large for analysis. Consider splitting this PR.]';
  }

  const userMessage = buildUserPrompt(
    diffText,
    prTitle,
    prBody,
    chunks.length,
    additions,
    deletions,
    languageContext
  );

  let lastError: Error | null = null;
  let totalTokens = 0;

  // Retry loop
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const { text, tokens } = await callDeepSeek(client, userMessage);
      totalTokens = tokens;

      const result = parseAIResponse(text);
      result.model = MODEL;
      result.tokens_used = totalTokens;
      result.analysis_time_ms = Date.now() - startTime;

      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on parse errors (prompt issue, not transient)
      if (lastError.message.includes('Invalid risk_score') ||
          lastError.message.includes('findings is not') ||
          lastError.message.includes('summary is not')) {
        return buildFallbackResult('');
      }

      // Last attempt — give up
      if (attempt === MAX_RETRIES) {
        break;
      }

      // Wait before retry (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // All retries exhausted
  return {
    risk_score: 5,
    summary: `AI analysis failed after ${MAX_RETRIES + 1} attempts: ${lastError?.message || 'Unknown error'}. Please re-run or review manually.`,
    findings: [
      {
        severity: 'info',
        file: 'N/A',
        line: 0,
        category: 'style',
        title: 'AI Analysis Failed',
        description: `All ${MAX_RETRIES + 1} analysis attempts failed. Last error: ${lastError?.message || 'Unknown'}`,
        suggestion: 'Check that the DEEPSEEK_API_KEY is valid and the DeepSeek API is available. Re-run the action.',
        confidence: 100,
      },
    ],
    model: MODEL,
    tokens_used: 0,
    analysis_time_ms: Date.now() - startTime,
  };
}
