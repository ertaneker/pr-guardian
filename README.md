# PR Guardian

AI-powered GitHub PR code review with production risk analysis.

**"Don't just review code — protect production."**

## What is PR Guardian?

PR Guardian is a GitHub Action that uses AI to analyze pull requests. Unlike traditional code review tools that only check style and basic patterns, PR Guardian answers the critical question: **"What could this PR break in production?"**

## Key Features

- AI-powered code review using DeepSeek
- Breaking change detection
- Database migration validation
- Security vulnerability scanning
- Performance regression detection
- API contract break detection
- Multi-language support (TS, Python, Go, Rust, Java, C#, Ruby)
- Framework-aware analysis (React, Django, Express, Rails, Spring Boot)

## Quick Start

```yaml
name: PR Guardian
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: pr-guardian/action@v1
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          deepseek_api_key: ${{ secrets.DEEPSEEK_API_KEY }}
```

## Pricing

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | Public repos, 50 PR/month, basic checks |
| Team | $29/mo | Private repos, 5 repos, all checks |
| Pro | $79/mo | Unlimited repos, CI/CD integration, Slack |
| Enterprise | $299/mo | Self-hosted, SSO, audit logs |

## Links

- [GitHub Marketplace](https://github.com/marketplace/pr-guardian)
- [Documentation](https://docs.prguardian.dev)
- [Website](https://prguardian.dev)

## License

MIT
