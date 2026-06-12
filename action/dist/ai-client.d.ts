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
    confidence?: number;
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
export declare function analyzeDiff(chunks: FileChunk[], apiKey: string, prContext?: {
    title?: string;
    body?: string;
}): Promise<AnalysisResult>;
