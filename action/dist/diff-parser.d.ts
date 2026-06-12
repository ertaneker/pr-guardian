export interface FileChunk {
    filename: string;
    language: string;
    patch: string;
    additions: number;
    deletions: number;
    changes: number;
}
export declare function parseDiff(diff: string, excludePatterns: string[], maxSizeBytes: number): FileChunk[];
