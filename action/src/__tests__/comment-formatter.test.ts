import { describe, it, expect } from 'vitest';
import { formatComment, formatCheckRunSummary } from '../comment-formatter';
import type { AnalysisResult } from '../ai-client';

const baseResult: AnalysisResult = {
  risk_score: 3,
  summary: 'Test summary',
  findings: [],
  model: 'deepseek-chat',
  tokens_used: 1000,
  analysis_time_ms: 2500,
};

describe('formatComment', () => {
  it('returns a formatted comment with safe score', () => {
    const comment = formatComment(baseResult, 7);

    expect(comment).toContain('PR Shield Report');
    expect(comment).toContain('Risk Score: 3/10');
    expect(comment).toContain('SAFE');
    expect(comment).toContain('✅');
  });

  it('returns a formatted comment with critical score', () => {
    const result: AnalysisResult = {
      ...baseResult,
      risk_score: 9,
    };

    const comment = formatComment(result, 7);

    expect(comment).toContain('CRITICAL');
    expect(comment).toContain('❌');
  });

  it('includes critical findings as table', () => {
    const result: AnalysisResult = {
      ...baseResult,
      risk_score: 8,
      findings: [
        {
          severity: 'critical',
          file: 'src/auth.ts',
          line: 42,
          category: 'security',
          title: 'SQL Injection',
          description: 'Unsafe query',
          suggestion: 'Use parameterized query',
        },
      ],
    };

    const comment = formatComment(result, 5);

    expect(comment).toContain('Critical');
    expect(comment).toContain('src/auth.ts');
    expect(comment).toContain('SQL Injection');
    expect(comment).toContain('Unsafe query');
  });

  it('includes warning findings', () => {
    const result: AnalysisResult = {
      ...baseResult,
      findings: [
        {
          severity: 'warning',
          file: 'src/app.ts',
          line: 10,
          category: 'performance',
          title: 'N+1 query',
          description: 'Query in loop',
          suggestion: 'Batch the query',
        },
      ],
    };

    const comment = formatComment(result, 7);

    expect(comment).toContain('Warnings');
    expect(comment).toContain('N+1 query');
  });

  it('collapses info findings', () => {
    const result: AnalysisResult = {
      ...baseResult,
      findings: [
        {
          severity: 'info',
          file: 'src/style.ts',
          line: 5,
          category: 'style',
          title: 'Naming convention',
          description: 'Use camelCase',
          suggestion: 'Rename to camelCase',
        },
      ],
    };

    const comment = formatComment(result, 7);

    expect(comment).toContain('<details>');
    expect(comment).toContain('Info');
  });

  it('includes model and token stats', () => {
    const comment = formatComment(baseResult, 7);

    expect(comment).toContain('deepseek-chat');
    expect(comment).toContain('1000 tokens');
    expect(comment).toContain('2.5s');
  });

  it('shows zero findings message when empty', () => {
    const comment = formatComment(baseResult, 7);

    expect(comment).toContain('Summary');
    expect(comment).toContain('Test summary');
  });
});

describe('formatCheckRunSummary', () => {
  it('returns summary with risk score', () => {
    const summary = formatCheckRunSummary(baseResult);
    expect(summary).toContain('3/10');
  });

  it('includes critical count when present', () => {
    const result: AnalysisResult = {
      ...baseResult,
      findings: [
        {
          severity: 'critical',
          file: 'x.ts',
          line: 1,
          category: 'bug',
          title: 'Bug',
          description: 'Bug desc',
          suggestion: 'Fix it',
        },
      ],
    };

    const summary = formatCheckRunSummary(result);
    expect(summary).toContain('1 critical');
  });
});
