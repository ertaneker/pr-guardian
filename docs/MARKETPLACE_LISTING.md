# PR GUARDIAN — GITHUB MARKETPLACE LİSTİNG HAZIRLIĞI

## ADIM 1: Logo PNG'ye Çevir

`assets/logo.svg` dosyasını https://svgtopng.com adresine yükle, 1024x1024 PNG olarak indir.
Dosyayı `assets/logo.png` olarak kaydet.

## ADIM 2: GitHub App Oluştur

https://github.com/settings/apps/new adresine git ve aşağıdakileri doldur:

### App Adı
```
PR Guardian
```

### Açıklama
```
AI-powered PR code review with production risk analysis
```

### Homepage URL
```
https://github.com/ertaneker/pr-guardian
```

### Webhook URL (şimdilik boş bırak)
```
(boş)
```

### Webhook Secret (opsiyonel)
```
(boş)
```

### Permissions (Repository)
| Permission | Access |
|------------|--------|
| Contents | Read |
| Pull requests | Read & Write |
| Checks | Read & Write |
| Issues | Read & Write |
| Metadata | Read (default) |

### Subscribe to Events
- [x] Pull request
- [x] Check suite

### Where can this app be installed?
- [x] Any account

### "Create GitHub App" butonuna bas

## ADIM 3: App Ayarları

App oluşturulduktan sonra:

1. **Private key oluştur:** "Generate a private key" → `.pem` dosyasını indir
2. **App ID'yi not et:** About bölümünde yazan App ID
3. **Client ID'yi not et**
4. **Client Secret oluştur:** "Generate a new client secret"
5. **Install App:** "Install App" → sahibi olduğun repolara kur

Bu bilgileri bana ilet (App ID, Client ID, Client Secret), ben `.env` dosyasına ekleyeyim.

## ADIM 4: Marketplace Listing

App oluşturulduktan sonra app'in ayar sayfasında **"Marketplace"** bölümü görünecek.
Oraya tıkla ve aşağıdaki içerikleri gir:

### Short Description (40-80 karakter)
```
AI code review that catches production-breaking changes
```

### Full Description
```markdown
# PR Guardian — AI Code Review for Production Safety

PR Guardian answers the critical question every developer has before merging:
**"What could this PR break in production?"**

Unlike traditional code review tools that check style and basic patterns, PR Guardian
uses AI to detect production-breaking changes before they reach your users.

## What It Detects

| Risk | Example |
|------|---------|
| Database Breaking | New column added without migration |
| API Contract Breaking | Response shape changed, frontend unaware |
| Security | SQL injection, XSS, hardcoded secrets |
| Config Drift | .env changed, .env.example not updated |
| Dependency Breaking | Major version bumps with breaking changes |
| Performance | N+1 queries, memory leaks, blocking I/O |

## How It Works

1. PR opened → PR Guardian analyzes the diff
2. AI checks for production risks (25 languages, 9 with deep rules)
3. Findings posted as PR comment with 1-10 risk score
4. Score above threshold? Action warns before merge

## Key Features

- 25 languages supported, 9 with deep language-specific analysis
- Risk score system (1-10) with configurable threshold
- Inline findings with file, line number, and fix suggestions
- Custom rules via .prguardian.yml
- Zero CI configuration needed
- Free for open source and public repositories

## Pricing

FREE — Public repos, 50 PR/month, all check types
TEAM — $29/month for 5 private repos, unlimited PRs
PRO — $79/month for unlimited repos, CI/CD integration
ENTERPRISE — $299/month with self-hosting, SSO, audit logs

## Getting Started

Add to your .github/workflows/pr-guardian.yml:

- uses: ertaneker/pr-guardian@main
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    deepseek_api_key: ${{ secrets.DEEPSEEK_API_KEY }}

Visit https://github.com/ertaneker/pr-guardian for full documentation.
```

### Category
- Primary: **Code review**
- Secondary: **Security** (veya **Continuous integration**)

### Pricing
- **Free:** $0 — Public repos, 50 PR/month
- **Team:** $29/month — 5 private repos, unlimited PRs
- **Pro:** $79/month — Unlimited repos, CI/CD, Slack
- **Enterprise:** $299/month — Self-hosted, SSO, audit logs

### Screenshots
En az 3 ekran görüntüsü yükle:
1. PR yorumu olarak analiz sonucu
2. Risk skoru ve bulgular
3. Workflow yapılandırması

### Logo
1024x1024 PNG yükle

### Support
- Documentation: https://github.com/ertaneker/pr-guardian/blob/main/docs/USAGE.md
- Issues: https://github.com/ertaneker/pr-guardian/issues
- Email: ertaneker@gmail.com

## ADIM 5: Submit for Review

Tüm bilgileri girdikten sonra "Submit for review" butonuna bas.
GitHub ekibi 2-5 iş günü içinde inceler.
