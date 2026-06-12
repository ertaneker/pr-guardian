# PR GUARDIAN — PAZAR ARAŞTIRMASI RAPORU

> **Tarih:** 12 Haziran 2026
> **Araştırmacı:** Claude (AI)

---

## 1. PAZAR GENEL GÖRÜNÜMÜ

### Pazar Büyüklüğü
- **Kategori ARR:** ~$420M (2026, %133 YoY büyüme)
- **Benimseyen ekipler:** %44'ü en azından bazı PR'larda AI review kullanıyor
- **Arama talebi:** +%310 büyüme (2025 ortası → 2026 Q1)
- **Ana itici güç:** Yeni kodun %46-51'i AI tarafından üretiliyor → AI review zorunlu hale geliyor

### Pazar Trendleri
1. AI-generated code patlaması → AI review zorunluluk
2.Shift-left security: Review aşamasında güvenlik kontrolü
3. Developer experience ön planda: Hızlı, gürültüsüz, otomatik
4. Multi-model AI: Tek model yerine hybrid yaklaşımlar
5. Compliance: SOC2, GDPR, HIPAA uyumluluğu kurumsal satışta şart

---

## 2. RAKİP ANALİZİ

### 2.1 CodeRabbit — PAZAR LİDERİ

| Özellik | Detay |
|---------|-------|
| **Pazar Payı** | #1, 2M+ repo, 13M+ PR işlenmiş |
| **ARR** | $40M (Nisan 2026, %700 YoY) |
| **Fiyat** | Free / $24-48/dev/ay / Enterprise custom |
| **AI Model** | o3, o4-mini, Claude, Nemotron (multi-model) |
| **Güçlü Yönler** | 40+ linter, PR walkthrough, one-click fix, learnable preferences |
| **Zayıf Yönler** | ~%28 noise, cross-file zayıf, production risk analizi YOK, business logic YOK |
| **Platform** | GitHub + GitLab + Bitbucket + Azure DevOps |
| **Açık Kaynak** | Ücretsiz (Pro özellikleri) |

**PR Guardian'a Karşı Avantajımız:**
- CodeRabbit kod stilini ve bug'ları bulur ama **production'da ne kırabileceğini söylemez**
- DB migration, API contract, config değişikliği analizi yapmaz
- "Risk score" konsepti yok

### 2.2 GitHub Copilot Code Review

| Özellik | Detay |
|---------|-------|
| **Pazar Payı** | ~2.4M bundled seats |
| **Fiyat** | $0-39/ay (Copilot bundle içinde) |
| **AI Model** | GPT-4 tabanlı |
| **Güçlü Yönler** | Sıfır kurulum, CodeQL/ESLint entegrasyonu, @copilot fix |
| **Zayıf Yönler** | SADECE GitHub, karmaşık PR'larda zayıf, derinlik eksik |
| **Platform** | Sadece GitHub |

**PR Guardian'a Karşı Avantajımız:**
- Copilot genel amaçlı — biz specialist'ız
- Production risk analizi yok
- DeepSeek ile çok daha ucuz maliyet

### 2.3 DeepSource

| Özellik | Detay |
|---------|-------|
| **Fiyat** | $24/user/ay |
| **AI Model** | Hybrid: 5000+ statik kural + AI review agent |
| **Güçlü Yönler** | Autofix, %84.51 F1 skoru, SAST+SCA+secrets hepsi bir arada |
| **Zayıf Yönler** | AI review daha yeni, production context yok |
| **Platform** | GitHub + GitLab + Bitbucket |

**PR Guardian'a Karşı Avantajımız:**
- DeepSource kod kalitesine odaklı, production riski değil
- Migration/API contract kontrolü yok

### 2.4 Qodo Merge (eski CodiumAI/PR-Agent)

| Özellik | Detay |
|---------|-------|
| **Fiyat** | Free / $19-30/dev/ay |
| **AI Model** | Multi-agent |
| **Güçlü Yönler** | Test generation, 6 platform desteği, en geniş platform |
| **Zayıf Yönler** | Karmaşık kurulum, küçük ekipler için overkill |
| **Platform** | GitHub + GitLab + Bitbucket + Azure DevOps + Gitea + CodeCommit |

### 2.5 Greptile

| Özellik | Detay |
|---------|-------|
| **Fiyat** | $30/dev/ay (free tier YOK) |
| **AI Model** | Claude Agent SDK |
| **Güçlü Yönler** | Codebase graph indexing, cross-file bug'lar, dependency chain |
| **Zayıf Yönler** | En pahalı, GitHub-only, küçük ekipler için pahalı |

### 2.6 Diğer Rakipler

| Rakip | Fiyat | Öne Çıkan | Eksik |
|-------|-------|-----------|-------|
| **Sourcery** | $12-24/dev/ay | Python specialist, adaptive learning | Sadece 4 dil |
| **Codacy** | $15/dev/ay | 49 dil, en geniş kapsam | AI özellikleri yeni |
| **SonarQube** | Free (CE) / Enterprise | 6500+ kural, compliance | Deterministik, AI yok |
| **CodeClimate** | $12-20/seat/ay | Kalite metrikleri, test coverage | AI yok, sadece metrik |

---

## 3. REKABET BOŞLUĞU — PR GUARDIAN'IN KONUMU

### Kimsenin Yapmadığı 5 Şey

| # | Özellik | Açıklama |
|---|---------|----------|
| 1 | **Production Risk Skoru** | 1-10 arası risk puanı. "Bu PR production'ı kırabilir mi?" |
| 2 | **DB Migration Validasyonu** | Yeni field var, migration yok → CRITICAL |
| 3 | **API Contract Break Tespiti** | Response shape değişmiş, frontend kırılacak → WARNING |
| 4 | **Config Change Impact** | `.env` değişmiş ama example güncellenmemiş |
| 5 | **Dependency Conflict** | Breaking change içeren versiyon yükseltmesi |

### Konumlandırma

```
                    Kod Kalitesi →           Production Güvenliği →
                    ─────────────           ──────────────────────
                    SonarQube               PR GUARDIAN ← BURASI BOŞ!
                    CodeClimate             
                    Codacy                  
                    DeepSource              
                    Sourcery                
                              CodeRabbit   
                              Qodo Merge   
                              Greptile     
```

**PR Guardian = Production safety specialist.** Kod kalitesi değil, production güvenliği.

---

## 4. HEDEF KİTLE (ICP)

### Primary ICP
- **Rol:** CTO, Engineering Manager, Senior Developer
- **Ekip Büyüklüğü:** 5-200 developer
- **Tech Stack:** TypeScript/Node.js, Python, Go, Java
- **Ağrı Noktası:** "Production'da kırılan şeyler yüzünden hafta sonu çalışıyoruz"
- **Bütçe:** Aylık $29-79/araç için onay gerektirmez
- **Davranış:** PR review süreci var ama yeterince derin değil

### Secondary ICP
- **Açık kaynak maintainer'ları** (ücretsiz kullanım → büyük takımlara yayılma)
- **Startup CTO'ları** (hızlı büyüyen, production riski yüksek)
- **Fintech/Healthcare** (compliance önemli, production hatası maliyetli)

---

## 5. FİYATLANDIRMA STRATEJİSİ

### Rakip Fiyat Karşılaştırması

| Rakip | En Düşük Ücretli | Orta | Enterprise |
|-------|-----------------|------|------------|
| CodeRabbit | $24/dev/ay | $48/dev/ay | Custom |
| DeepSource | $24/dev/ay | — | — |
| Qodo Merge | $19/dev/ay | $30/dev/ay | Custom |
| Greptile | $30/dev/ay | — | — |
| Copilot | $19/ay | $39/ay | — |

### PR Guardian Fiyatlandırma

| Plan | Fiyat | Hedef |
|------|-------|-------|
| **FREE** | $0 | Public repos, 50 PR/ay, basic checks |
| **TEAM** | **$29/ay** | 5 private repo, tüm check'ler, custom rules |
| **PRO** | **$79/ay** | Sınırsız repo, CI/CD, Slack notifications |
| **ENTERPRISE** | **$299/ay** | Self-hosted, SSO, audit logs |

**Strateji:** Per-team pricing (per-developer değil). Küçük takımlar için cazip, büyüdükçe upgrade.

---

## 6. SWOT ANALİZİ

### Güçlü Yönler (Strengths)
- Benzersiz konumlandırma: Production risk analizi
- DeepSeek ile düşük maliyet (10x rakiplerden ucuz AI)
- Basit kurulum: Tek action.yml, hemen çalışır
- Per-team pricing → düşük giriş bariyeri

### Zayıf Yönler (Weaknesses)
- Yeni oyuncu, referans yok
- Tek platform (sadece GitHub, sonra GitLab)
- AI kalitesi DeepSeek'e bağlı
- Tek kişilik ekip (AI + Ertan)

### Fırsatlar (Opportunities)
- AI-generated code patlaması → review talebi artıyor
- Production risk analizi yapan RAKİP YOK
- GitHub Marketplace'te kategoride boşluk var
- DeepSeek maliyet avantajı agresif fiyatlandırmaya izin veriyor

### Tehditler (Threats)
- CodeRabbit production risk özelliği ekleyebilir
- GitHub Copilot ücretsiz hale gelebilir
- DeepSeek API fiyat artışı veya kesintisi
- AI review araçları commoditize olabilir

---

## 7. SONUÇ VE ÖNERİ

### Pazara Giriş Stratejisi

1. **İlk 3 ay:** GitHub Marketplace'te "production safety" kategorisinde tek oyuncu ol
2. **Farklılaşma:** Kod kalitesi DEĞİL, production güvenliği. Bu açıyı her yerde vurgula
3. **Fiyat avantajı:** DeepSeek maliyetiyle rakiplerin yarı fiyatına aynı kalite
4. **Büyüme:** Açık kaynak → küçük takımlar → enterprise

### USP Cümlesi

> **"PR Guardian — don't just review code, protect production."**
> 
> Kod kalitesini herkes kontrol eder. PR Guardian size bu PR'ın yarın sabah production'ı kırabileceği 5 yolu söyler.

### İlk Hedef

- İlk ay: 50 kurulum, 5 paying user ($150 MRR)
- Üçüncü ay: 300 kurulum, 30 paying user ($900 MRR)
- Hedef kitleye ulaşma: Reddit, Hacker News, GitHub trending, dev.to
