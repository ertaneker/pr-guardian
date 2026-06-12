/**
 * Production Breaking Change Detection Engine
 *
 * Deterministic rule-based checks that run alongside AI analysis.
 * These catch what AI might miss — the PR Shield USP layer.
 */
import type { FileChunk } from './diff-parser';
import type { AnalysisFinding } from './ai-client';
export declare function checkMigrationChanges(chunks: FileChunk[]): AnalysisFinding[];
export declare function checkApiContractBreaks(chunks: FileChunk[]): AnalysisFinding[];
export declare function checkConfigDrift(chunks: FileChunk[]): AnalysisFinding[];
export declare function checkDependencyConflicts(chunks: FileChunk[]): AnalysisFinding[];
export interface ProductionCheckResult {
    migrationFindings: AnalysisFinding[];
    apiContractFindings: AnalysisFinding[];
    configDriftFindings: AnalysisFinding[];
    dependencyFindings: AnalysisFinding[];
    allFindings: AnalysisFinding[];
    riskContribution: number;
}
export declare function runProductionChecks(chunks: FileChunk[]): ProductionCheckResult;
