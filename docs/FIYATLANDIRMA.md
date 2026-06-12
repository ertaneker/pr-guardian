# PR GUARDIAN — FİYATLANDIRMA STRATEJİSİ

> **Son güncelleme:** 2026-06-12

---

## RAKİP FİYAT KARŞILAŞTIRMASI

| Rakip | Free Tier | Giriş Seviyesi | Pro/Team | Enterprise |
|-------|-----------|----------------|----------|------------|
| CodeRabbit | ✅ Sınırsız public | $24/dev/ay | $48/dev/ay | ~$15K+/ay |
| DeepSource | ⚠️ Kısıtlı | $24/user/ay | — | Custom |
| Qodo Merge | ✅ 75 PR/ay | $19/dev/ay | $30/dev/ay | Custom |
| Greptile | ❌ Yok | $30/dev/ay | — | Custom |
| Sourcery | ✅ OSS | $12/dev/ay | $24/dev/ay | — |
| Codacy | ✅ ~50 user | $15/dev/ay | — | Custom |
| Copilot Review | ✅ 50/ay | $19/ay (bundle) | $39/ay (bundle) | — |
| SonarQube | ✅ CE (self-host) | — | — | Custom |

**Ortalama giriş fiyatı:** $20-25/dev/ay

---

## PR GUARDIAN FİYATLANDIRMA

### FREE — $0/ay
- Public repo'larda sınırsız kullanım
- Ayda 50 PR analizi
- Temel kontroller (güvenlik, bug, kod kalitesi)
- PR comment olarak sonuçlar
- Topluluk desteği (GitHub Issues)

### TEAM — $29/ay
- 5 private repo
- Sınırsız PR analizi
- Tüm check'ler (production risk, DB migration, API contract)
- Custom rules (.prguardian.yml)
- Email desteği
- 5 team member

### PRO — $79/ay
- Sınırsız repo
- Sınırsız team member
- CI/CD pipeline entegrasyonu (build fail)
- Slack / Discord notifications
- Custom AI prompts
- Öncelikli destek (Slack kanalı)
- Analytics dashboard

### ENTERPRISE — $299/ay
- Self-hosted seçenek (Docker/K8s)
- SSO + SAML (Okta, Azure AD, Google Workspace)
- Audit logs
- Kendi AI API key'ini kullanabilme
- Custom AI model / fine-tuning
- SLA (%99.9 uptime)
- Dedicated support

---

## NEDEN PER-TEAM PRICING?

Rakipler **per-developer** fiyatlandırıyor. Örneğin CodeRabbit'te 10 developer'lık ekip için:

| Araç | Aylık Maliyet (10 dev) |
|------|----------------------|
| CodeRabbit Pro | $240/ay |
| DeepSource Team | $240/ay |
| Qodo Merge | $190/ay |
| Greptile | $300/ay |
| **PR Guardian Team** | **$29/ay** |

**12x daha ucuz.** Bu, küçük ekipler için büyük avantaj.

### Per-team pricing'in avantajları:
1. Küçük ekipler için düşük giriş bariyeri
2. Bütçe onayı gerektirmez (CTO kendi karar verebilir)
3. Büyüdükçe doğal upgrade (daha fazla repo → PRO)
4. Fiyat itirazı minimum (zaten çok ucuz)

---

## GELİR PROJEKSİYONU

| Ay | Free Kullanıcı | Team ($29) | PRO ($79) | Enterprise ($299) | MRR |
|----|---------------|------------|-----------|-------------------|-----|
| 1 | 50 | 3 | 2 | 0 | $245 |
| 3 | 300 | 15 | 10 | 2 | $1,823 |
| 6 | 1,000 | 40 | 30 | 5 | $5,025 |
| 12 | 3,000 | 100 | 70 | 15 | $10,915 |

### Varsayımlar
- Free → Team dönüşüm: %5
- Team → PRO dönüşüm: %20 (zamanla)
- Churn: %5/ay altı
- Büyüme: Organik + Product Hunt + içerik pazarlaması

---

## MALİYET ANALİZİ

### Aylık Sabit Maliyetler (Başlangıç)

| Kalem | Maliyet |
|-------|---------|
| DeepSeek API | ~$50-200/ay (kullanıma bağlı) |
| Supabase/Neon (DB) | $0 (free tier) |
| Vercel/Railway (hosting) | $0-20/ay |
| Domain | $12/yıl |
| **Toplam** | **~$70-220/ay** |

### Birim Maliyet (PR başına)
- DeepSeek API: 50K token ~$0.07/PR
- 1000 PR/ay: $70 AI maliyeti
- Team planı (29$): %240 kar marjı

---

## İNDİRİM STRATEJİSİ

| Durum | İndirim |
|-------|---------|
| Yıllık ödeme | %20 (Team $278/yıl, PRO $758/yıl) |
| Açık kaynak projeler | Tamamen ücretsiz (PRO özellikleri) |
| Eğitim kurumları | %50 indirim |
| Startup'lar (Seed öncesi) | 6 ay %50 indirim |
| Referans indirimi | 1 ay ücretsiz |
