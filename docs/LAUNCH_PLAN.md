# PR GUARDIAN — LANSMAN PLANI

> **Hedef Tarih:** 13-14 Haziran 2026
> **Hedef Kitle:** Developer'lar, CTO'lar, Engineering Manager'lar

---

## 1. REDDIT — r/programming, r/github, r/webdev

### r/programming Post (Cuma sabahı TR saati 15:00 = EST 08:00)

**Başlık:** I built an AI code reviewer that answers "What could this PR break in production?" — free for open source

**İçerik:**

Hey r/programming,

I got tired of code review tools that just check style and basic patterns. So I built **PR Guardian** — an AI-powered GitHub Action that focuses on one question: **"If I merge this PR, what breaks in production?"**

**What it checks:**
- Database schema changes without migrations
- API contract breaks (response shape changed, frontend will crash)
- Config changes not reflected in .env.example
- Security issues (SQL injection, XSS, hardcoded secrets)
- Performance regressions (N+1 queries, memory leaks)

**Why it's different:**
Every other tool (CodeRabbit, Sourcery, SonarQube) tells you about code quality. PR Guardian tells you about **production risk**. It gives each PR a 1-10 risk score based on what could actually break.

**Tech stack:**
- GitHub Action (TypeScript)
- DeepSeek AI (10x cheaper than Claude/GPT-4)
- 25 languages supported, 9 with deep analysis rules
- Open source (MIT)

**Try it:** https://github.com/ertaneker/pr-guardian

---

Free for public repos. Would love feedback from the community!

### r/github Post

**Başlık:** PR Guardian — AI code review focused on production safety (free on public repos)

**İçerik:** Daha kısa, GitHub Actions odaklı. Marketplace yakında.

### r/webdev Post

**Başlık:** Built a free AI PR reviewer that catches production-breaking changes

**İçerik:** Web developer odaklı — Next.js, Express, React özel kontrollerden bahset.

---

## 2. HACKER NEWS — SHOW HN

**Başlık:** Show HN: PR Guardian — AI code review that answers "Will this break production?"

**İçerik:**

I built PR Guardian, a GitHub Action that uses AI to review pull requests with a focus on production safety.

Every other AI code review tool tells you about code style, naming conventions, and basic bugs. PR Guardian asks a different question: "If I deploy this PR right now, what breaks?"

It catches things like:
- A new database column added without a migration file
- An API endpoint changing its response shape (breaking the frontend)
- A dependency major version bump that silently breaks things
- Config changes where .env.example wasn't updated

Each PR gets a 1-10 risk score. Above your threshold? It warns you before merge.

Built with TypeScript, runs as a GitHub Action, uses DeepSeek for AI (keeps costs low). MIT licensed.

Free for open source and public repos.

https://github.com/ertaneker/pr-guardian

Would love feedback, bug reports, and feature requests!

---

## 3. DEV.TO BLOG POST

**Başlık:** I Built an AI Code Reviewer That Asks "What Breaks in Production?" — Here's What I Learned

**İçerik planı:**
1. Problem: Code quality tools don't catch production issues
2. Solution: PR Guardian
3. Technical deep dive: How it works (diff parsing, prompt engineering, AI integration)
4. Why DeepSeek over Claude/GPT-4 (cost: $0.07 per PR vs $0.70)
5. Results so far
6. Open source — try it!

---

## 4. TWITTER/X

**Thread:**

1/ I built PR Guardian — an AI code reviewer that answers one question: "What could this PR break in production?"

2/ Every other tool checks code quality. PR Guardian checks for DB migrations, API contract breaks, config changes, security holes.

3/ It gives each PR a risk score (1-10). Free for open source.

4/ Built with TypeScript + DeepSeek. MIT licensed.

github.com/ertaneker/pr-guardian

---

## 5. GITHUB — TRENDING REPOLARA COMMENT

Hedef repolar: next.js, react, express, django (AI PR review öner)

Her yeni PR açan repoya manuel veya bot ile PR Guardian önerme.

---

## LANSMAN KONTROL LİSTESİ

- [ ] Reddit r/programming post
- [ ] Reddit r/github post
- [ ] Hacker News Show HN
- [ ] dev.to blog post
- [ ] Twitter/X thread
- [ ] GitHub trending repolara organic etkileşim
- [ ] Product Hunt (FAZ 18'de)
- [ ] GitHub Marketplace listing (FAZ 10)

---

## İLK HAFTA HEDEFLERİ

- 20+ GitHub star
- 10+ kurulum
- 5+ feedback (issue/comment)
- 1+ paying user sinyali
