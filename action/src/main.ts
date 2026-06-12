import * as core from '@actions/core';
import * as github from '@actions/github';
import { parseDiff } from './diff-parser';
import { analyzeDiff } from './ai-client';
import { formatComment, formatCheckRunSummary } from './comment-formatter';

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput('github_token', { required: true });
    const deepseekApiKey = core.getInput('deepseek_api_key', { required: true });
    const riskThreshold = parseInt(core.getInput('risk_threshold') || '7', 10);
    const excludePatterns = core.getInput('exclude_patterns') || '*.lock,*.lockb';
    const maxDiffSizeKB = parseInt(core.getInput('max_diff_size') || '100', 10);

    const octokit = github.getOctokit(githubToken);
    const { owner, repo } = github.context.repo;
    const prNumber = github.context.payload.pull_request?.number;

    if (!prNumber) {
      core.setFailed('This action must be run on a pull_request event.');
      return;
    }

    core.info(`PR Guardian analyzing PR #${prNumber} in ${owner}/${repo}...`);

    // Fetch PR diff
    const response = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
      mediaType: { format: 'diff' },
    });

    const diff = response.data as unknown as string;

    if (!diff) {
      core.info('No diff found in this PR. Skipping analysis.');
      return;
    }

    // Parse diff into chunks
    const patterns = excludePatterns.split(',').map((p: string) => p.trim());
    const chunks = parseDiff(diff, patterns, maxDiffSizeKB * 1024);

    core.info(`Parsed ${chunks.length} file(s) from diff`);

    // Analyze with AI
    const results = await analyzeDiff(chunks, deepseekApiKey, github.context.payload.pull_request);

    // Post comment on PR
    const commentBody = formatComment(results, riskThreshold);
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body: commentBody,
    });

    // Update check run status
    const passed = results.risk_score <= riskThreshold;
    core.info(`Risk Score: ${results.risk_score}/10 — ${passed ? 'PASSED' : 'FAILED'}`);

    if (passed) {
      core.info('PR Guardian: Risk score within threshold. ✅');
    } else {
      core.warning(`PR Guardian: Risk score (${results.risk_score}) exceeds threshold (${riskThreshold}). Review the findings above.`);
    }

  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(`PR Guardian failed: ${error.message}`);
    } else {
      core.setFailed('PR Guardian failed with unknown error');
    }
  }
}

run();
