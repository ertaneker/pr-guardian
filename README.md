# PR Guardian

**AI code review that answers: "What could this PR break in production?"**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Test](https://img.shields.io/badge/tests-17%20passed-green)](https://github.com/ertaneker/pr-guardian/actions)

---

## Why PR Guardian?

Code review tools check style. Linters catch bugs. But **nobody asks the critical question**: "If I deploy this right now, what breaks in production?"

PR Guardian is a GitHub Action that uses AI to analyze your pull requests and answer exactly that.

### What It Catches

| Check | Example |
|-------|---------|
| DB Migration | New column added, no migration file → **CRITICAL** |
| API Contract | Response shape changed, frontend unaware → **WARNING** |
| Config Drift | `.env` changed, `.env.example` not updated |
| Security | SQL injection, XSS, hardcoded secrets |
| Breaking Deps | `express@4` → `express@5` (major version bump) |
| Performance | N+1 queries, blocking I/O in async context |

### Risk Score

Every PR gets a **1-10 risk score**:

| Score | Level | Action |
|-------|-------|--------|
| 1-3 | 🟢 SAFE | Merge confidently |
| 4-6 | 🟡 MODERATE | Quick review recommended |
| 7-8 | 🟠 HIGH RISK | Address findings before merge |
| 9-10 | 🔴 CRITICAL | Do not deploy — production will break |

---

## Quick Start (2 minutes)

### 1. Get a DeepSeek API Key

https://platform.deepseek.com/ → API Keys → Create

### 2. Add GitHub Secret

Repo → Settings → Secrets → Actions → `DEEPSEEK_API_KEY`

### 3. Create Workflow

`.github/workflows/pr-guardian.yml`:

```yaml
name: PR Guardian
on:
  pull_request:
    types: [opened, synchronize, reopened]

permissions:
  contents: read
  pull-requests: write
  issues: write

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: ertaneker/pr-guardian@main
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          deepseek_api_key: ${{ secrets.DEEPSEEK_API_KEY }}
```

### 4. Open a PR

PR Guardian will analyze it and post findings as a PR comment.

---

## Features

- **25 languages** supported — 9 with deep, language-specific rules
- **Production-focused** — not just code quality, but what actually breaks
- **Risk score** — clear, actionable 1-10 rating
- **Inline findings** — file, line number, severity, fix suggestion
- **Customizable** — threshold, exclude patterns, max diff size
- **Fast** — 10-30 seconds per PR (DeepSeek-powered)
- **Affordable** — ~$0.07 per PR AI cost (10x cheaper than Claude/GPT-4)

### Languages with Deep Analysis

TypeScript, JavaScript, Python, Go, Java, C#, Rust, Ruby, SQL

---

## Pricing

| Plan | Price | What You Get |
|------|-------|-------------|
| **FREE** | $0 | Public repos, 50 PR/month, all checks |
| **TEAM** | $29/mo | 5 private repos, unlimited PRs, custom rules |
| **PRO** | $79/mo | Unlimited repos, CI/CD integration, Slack alerts |
| **ENTERPRISE** | $299/mo | Self-hosted, SSO, audit logs, custom AI model |

**Free for open source — forever.**

[Full documentation →](docs/USAGE.md) | [Pricing details →](docs/FIYATLANDIRMA.md)

---

## How It Works

```
PR opened → GitHub Action triggers
  → Diff is parsed (files, languages, changes)
  → AI analyzes (DeepSeek with specialized prompts)
  → Findings posted as PR comment
  → Risk score determines pass/fail
```

Built with TypeScript, compiled to a single JavaScript bundle (ncc).

---

## Contributing

Found a bug? Have a feature idea? [Open an issue](https://github.com/ertaneker/pr-guardian/issues/new/choose).

MIT licensed. PRs welcome.

---

## Links

- [Usage Guide](docs/USAGE.md)
- [Market Research](docs/PAZAR_ARASTIRMASI.md)
- [Pricing Strategy](docs/FIYATLANDIRMA.md)
- [Launch Plan](docs/LAUNCH_PLAN.md)

---

<sub>Built with [DeepSeek](https://deepseek.com) · MIT License · [ertaneker/pr-guardian](https://github.com/ertaneker/pr-guardian)</sub>
