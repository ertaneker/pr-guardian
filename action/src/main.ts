import * as core from '@actions/core';
import * as github from '@actions/github';
import { parseDiff } from './diff-parser';
import { analyzeDiff } from './ai-client';
import { formatComment, formatCheckRunSummary } from './comment-formatter';
import { runProductionChecks } from './production-checker';

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

    core.info(`PR Shield analyzing PR #${prNumber} in ${owner}/${repo}...`);

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

    // Run deterministic production safety checks
    const prodChecks = runProductionChecks(chunks);
    if (prodChecks.allFindings.length > 0) {
      core.info(`Production checks: ${prodChecks.allFindings.length} findings (${prodChecks.migrationFindings.length} migration, ${prodChecks.apiContractFindings.length} API contract, ${prodChecks.configDriftFindings.length} config drift, ${prodChecks.dependencyFindings.length} dependency)`);
    }

    // Analyze with AI
    const results = await analyzeDiff(chunks, deepseekApiKey, github.context.payload.pull_request);

    // Merge deterministic findings with AI findings (deterministic first)
    results.findings = [...prodChecks.allFindings, ...results.findings];

    // Adjust risk score with deterministic contribution
    results.risk_score = Math.min(10, results.risk_score + prodChecks.riskContribution);

    const criticalCount = results.findings.filter(f => f.severity === 'critical').length;
    const warnCount = results.findings.filter(f => f.severity === 'warning').length;
    const infoCount = results.findings.filter(f => f.severity === 'info').length;

    core.info(`Total findings: ${results.findings.length} (${criticalCount} critical + ${warnCount} warnings + ${infoCount} info) [${prodChecks.allFindings.length} deterministic + AI]`);

    // Post comment on PR
    const commentBody = formatComment(results, riskThreshold);
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: prNumber,
      body: commentBody,
    });

    // Log analysis stats
    core.info(`Model: ${results.model}`);
    core.info(`Tokens: ${results.tokens_used}`);
    core.info(`Time: ${(results.analysis_time_ms / 1000).toFixed(1)}s`);
    core.info(`Findings: ${results.findings.length} (${results.findings.filter(f => f.severity === 'critical').length} critical, ${results.findings.filter(f => f.severity === 'warning').length} warnings, ${results.findings.filter(f => f.severity === 'info').length} info)`);

    // Update check run status
    const passed = results.risk_score <= riskThreshold;
    core.info(`Risk Score: ${results.risk_score}/10 (threshold: ${riskThreshold}) — ${passed ? 'PASSED ✅' : 'FAILED ❌'}`);

    if (passed) {
      core.info('PR Shield: Risk score within threshold.');
    } else {
      core.warning(`PR Shield: Risk score (${results.risk_score}) exceeds threshold (${riskThreshold}). Review findings before merging.`);
    }

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    // Categorize errors
    if (message.includes('ENOTFOUND') || message.includes('ECONNREFUSED')) {
      core.setFailed(`PR Shield: Network error — cannot reach API. Check your network connection. (${message})`);
    } else if (message.includes('401') || message.includes('403') || message.includes('auth')) {
      core.setFailed(`PR Shield: Authentication failed — invalid API key. Check your DEEPSEEK_API_KEY. (${message})`);
    } else if (message.includes('429') || message.includes('rate')) {
      core.setFailed(`PR Shield: Rate limited by AI provider. Please wait and re-run. (${message})`);
    } else if (message.includes('timeout') || message.includes('ETIMEDOUT')) {
      core.setFailed(`PR Shield: Request timed out. The diff may be too large or the API is slow. (${message})`);
    } else {
      core.setFailed(`PR Shield failed: ${message}`);
    }
  }
}

run();
