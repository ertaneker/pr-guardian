# PR GUARDIAN — ANA PLAN

> **Proje:** GitHub PR Guardian Action — AI destekli PR kod inceleme asistanı
> **Başlangıç:** 12 Haziran 2026
> **Hedef:** GitHub Marketplace'te aylık $9,000+ gelir elde eden, tamamen AI ile yönetilen SaaS ürünü
> **Proje Yöneticisi:** Claude (AI) — Tüm geliştirme, pazarlama, operasyon
> **İnsan Operatör:** Ertan — Dış bağlantılar, ödeme hesapları, fiziksel erişimler

---

## FAZ İNDEKSİ

| Faz | Ad | Süre | Durum |
|-----|-----|------|-------|
| 0 | Proje Kurulumu ve Ortam Hazırlığı | 2 gün | ⬜ Bekliyor |
| 1 | Pazar Araştırması ve Validasyon | 3 gün | ⬜ Bekliyor |
| 2 | GitHub Action Skeleton Geliştirme | 3 gün | ⬜ Bekliyor |
| 3 | Diff Parser ve Kod Analiz Altyapısı | 2 gün | ⬜ Bekliyor |
| 4 | AI Motor Entegrasyonu — Temel | 4 gün | ⬜ Bekliyor |
| 5 | Prompt Mühendisliği ve İyileştirme | 3 gün | ⬜ Bekliyor |
| 6 | PR Comment Formatlama ve Gönderim | 2 gün | ⬜ Bekliyor |
| 7 | Hata Yönetimi ve Edge Case'ler | 2 gün | ⬜ Bekliyor |
| 8 | Test Altyapısı ve Otomasyon | 3 gün | ⬜ Bekliyor |
| 9 | MVP Lansmanı — Ücretsiz Beta | 3 gün | ⬜ Bekliyor |
| 10 | GitHub Marketplace Listeleme | 2 gün | ⬜ Bekliyor |
| 11 | Akıllı Dil Desteği — Çoklu Dil Analizi | 5 gün | ⬜ Bekliyor |
| 12 | Framework-Aware Derinlemesine Analiz | 5 gün | ⬜ Bekliyor |
| 13 | "Production'da Ne Kırabilir?" Motoru | 5 gün | ⬜ Bekliyor |
| 14 | API Server Geliştirme | 5 gün | ⬜ Bekliyor |
| 15 | Kullanıcı Yönetimi ve Auth Sistemi | 3 gün | ⬜ Bekliyor |
| 16 | Monetizasyon — Pricing Tiers ve Billing | 5 gün | ⬜ Bekliyor |
| 17 | Dashboard ve Web Arayüzü | 5 gün | ⬜ Bekliyor |
| 18 | Büyüme ve Pazarlama Operasyonu | 7 gün | ⬜ Bekliyor |
| 19 | Enterprise Özellikler ve Skalama | 7 gün | ⬜ Bekliyor |
| 20 | Sürekli İyileştirme, Bakım ve Ölçekleme | Sürekli | ⬜ Bekliyor |

---

## FAZ 0: PROJE KURULUMU VE ORTAM HAZIRLIĞI

**Süre:** 2 gün
**Hedef:** Projenin geliştirme ortamını tamamen hazır hale getirmek.

### Adım 0.1: GitHub Hesap ve Repo Kurulumu
- [ ] GitHub hesabı kontrolü / yeni hesap açılması (Ertan)
- [ ] `pr-guardian` reposunun oluşturulması
- [ ] Repo ayarları: public, MIT lisansı
- [ ] Branch protection kuralları (main branch)
- [ ] `.gitignore` oluştur (Node.js + TypeScript)

### Adım 0.2: Yerel Geliştirme Ortamı
- [ ] Node.js 20+ LTS kurulum kontrolü
- [ ] TypeScript global kurulumu
- [ ] VS Code / Cursor ayarları
- [ ] GitHub CLI (`gh`) kurulumu ve auth
- [ ] npm/yarn/pnpm tercihi ve kurulumu

### Adım 0.3: Proje Yapılandırması
- [ ] `package.json` ana proje
- [ ] `tsconfig.json` strict mod
- [ ] ESLint + Prettier konfigürasyonu
- [ ] Husky + lint-staged kurulumu
- [ ] CI/CD için GitHub Actions workflow

### Adım 0.4: Geliştirici API Anahtarları
- [ ] Anthropic API key (Claude) — (Ertan)
- [ ] GitHub Personal Access Token (PAT) — (Ertan)
- [ ] `.env` dosyası ve `.env.example` oluştur
- [ ] API anahtarlarının güvenli saklanması

### Adım 0.5: Dökümantasyon Şablonları
- [ ] `README.md` (proje açıklaması)
- [ ] `CONTRIBUTING.md`
- [ ] `CODE_OF_CONDUCT.md`
- [ ] `LICENSE` (MIT)

### Faz 0 Kontrol Noktası
```
✅ GitHub reposu oluşturuldu
✅ Yerel ortam hazır
✅ API anahtarları alındı ve güvende
✅ Proje iskeleti commit'lendi
```

---

## FAZ 1: PAZAR ARAŞTIRMASI VE VALİDASYON

**Süre:** 3 gün
**Hedef:** Pazarı anlamak, rakipleri analiz etmek, fiyatlandırmayı netleştirmek.

### Adım 1.1: Rakip Analizi — Tam Liste
- [ ] **CodeRabbit** — Özellikler, fiyatlandırma, zayıf yönler
- [ ] **CodeClimate Quality** — Özellikler, fiyatlandırma, zayıf yönler
- [ ] **DeepSource** — Özellikler, fiyatlandırma, zayıf yönler
- [ ] **Reviewpad** — Özellikler, fiyatlandırma, zayıf yönler
- [ ] **PullRequest.com** — Özellikler, fiyatlandırma, zayıf yönler
- [ ] **Sourcery** — Özellikler, fiyatlandırma, zayıf yönler
- [ ] **Codacy** — Özellikler, fiyatlandırma, zayıf yönler
- [ ] **SonarQube / SonarCloud** — Özellikler, fiyatlandırma, zayıf yönler
- [ ] Her rakip için SWOT analizi dökümanı

### Adım 1.2: Fiyatlandırma Araştırması
- [ ] Rakiplerin fiyatlandırma modellerini çıkar (per-seat, per-usage, flat)
- [ ] Freemium çizgisi nerede? (hangi özellikler ücretsiz)
- [ ] Enterprise pricing benchmark
- [ ] Hedef fiyatlandırma tablosu oluştur

### Adım 1.3: Hedef Kitle Profili
- [ ] ICP (Ideal Customer Profile) dökümanı
- [ ] Startup CTO'ları (1-50 dev)
- [ ] Mid-size engineering teams (50-200 dev)
- [ ] Enterprise (200+ dev)
- [ ] Open source maintainer'lar

### Adım 1.4: Unique Selling Proposition (USP)
- [ ] "Production'da ne kırabilir?" açısını netleştir
- [ ] Rakiplerin yapamadığı 5 şeyi listele
- [ ] USP cümlesi: "PR Guardian — sadece kod kalitesini değil, production'u korur"
- [ ] Landing page copy taslağı

### Adım 1.5: Pazar Araştırması Raporu
- [ ] Tüm bulguları içeren PAZAR_ARASTIRMASI.md yaz
- [ ] Fiyatlandırma stratejisi FİYATLANDIRMA.md yaz
- [ ] ICP dökümanı ICP.md yaz

### Faz 1 Kontrol Noktası
```
✅ 8+ rakip analiz edildi
✅ Fiyatlandırma stratejisi netleşti
✅ USP belirlendi
✅ Pazar raporu dökümante edildi
```

---

## FAZ 2: GITHUB ACTION SKELETON GELİŞTİRME

**Süre:** 3 gün
**Hedef:** Çalışan bir GitHub Action iskeleti oluşturmak.

### Adım 2.1: Action TypeScript Projesi Kurulumu
- [ ] `action/` dizininde `package.json` oluştur
- [ ] `@actions/core`, `@actions/github` bağımlılıklarını ekle
- [ ] `typescript`, `@types/node`, `@vercel/ncc` dev bağımlılıkları
- [ ] `tsconfig.json` yapılandırması
- [ ] Build script: `ncc build src/main.ts -o dist`

### Adım 2.2: Action Metadata
- [ ] `action/action.yml` oluştur
  ```yaml
  name: 'PR Guardian'
  description: 'AI-powered PR code review with risk analysis'
  branding:
    icon: 'shield'
    color: 'blue'
  inputs:
    github_token:
      description: 'GitHub token'
      required: true
    anthropic_api_key:
      description: 'Anthropic API key'
      required: true
    risk_threshold:
      description: 'Minimum risk score to fail the check (1-10)'
      required: false
      default: '7'
  runs:
    using: 'node20'
    main: 'dist/index.js'
  ```

### Adım 2.3: Event Handler — PR Event'lerini Yakala
- [ ] `action/src/main.ts` — Entry point
- [ ] `pull_request.opened` event handler
- [ ] `pull_request.synchronize` event handler
- [ ] Event payload'dan repo, PR numarası, branch bilgilerini çıkar
- [ ] Input validasyonu (token'lar var mı?)

### Adım 2.4: GitHub API İletişimi
- [ ] Octokit client kurulumu
- [ ] PR diff'ini alma: `octokit.pulls.get()`
- [ ] PR'a comment yazma: `octokit.issues.createComment()`
- [ ] Check run oluşturma: `octokit.checks.create()`
- [ ] Commit status güncelleme: `octokit.repos.createCommitStatus()`

### Adım 2.5: Test Action'ı — "Hello World" Çalıştır
- [ ] Basit bir test reposu oluştur
- [ ] Action'ı çalıştır ve PR comment olarak "Hello from PR Guardian!" yazdır
- [ ] Action log'larını kontrol et, hata varsa düzelt

### Faz 2 Kontrol Noktası
```
✅ Action TypeScript projesi kuruldu
✅ action.yml metadata tamam
✅ PR event'leri yakalanıyor
✅ GitHub API iletişimi çalışıyor
✅ "Hello World" testi başarılı
```

---

## FAZ 3: DIFF PARSER VE KOD ANALİZ ALTYAPISI

**Süre:** 2 gün
**Hedef:** PR diff'ini anlamlı parçalara ayıran parser'ı geliştirmek.

### Adım 3.1: Diff Parser Modülü
- [ ] `action/src/diff-parser.ts` oluştur
- [ ] Unified diff formatını parse et
- [ ] Dosya bazında değişiklikleri ayır
- [ ] Eklenen/silinen/değişen satırları tespit et
- [ ] Dosya uzantısından dil tespiti

### Adım 3.2: Diff Optimizasyonu
- [ ] Büyük diff'leri chunk'lara böl (AI token limiti)
- [ ] Binary dosyaları filtrele
- [ ] `.lock` dosyalarını filtrele
- [ ] Generated code'ları tespit et (örn. protobuf)
- [ ] Diff boyutu sınırı (max 100KB)

### Adım 3.3: Kod Bağlamı Toplama
- [ ] Değişen her dosya için etkilenen fonksiyon/class'ı bul
- [ ] İlgili test dosyalarını tespit et
- [ ] Package/dependency değişikliklerini yakala
- [ ] Config dosyası değişikliklerini yakala

### Adım 3.4: Dil Tespit Motoru
- [ ] Dosya uzantısı → dil eşleştirme tablosu
- [ ] `package.json` → TypeScript/JavaScript projesi
- [ ] `go.mod` → Go projesi
- [ ] `Cargo.toml` → Rust projesi
- [ ] `requirements.txt` / `pyproject.toml` → Python projesi
- [ ] `pom.xml` / `build.gradle` → Java/Kotlin projesi

### Faz 3 Kontrol Noktası
```
✅ Diff parser çalışıyor
✅ Büyük diff'ler chunk'lanıyor
✅ Kod bağlamı toplanıyor
✅ Dil tespiti yapılıyor
```

---

## FAZ 4: AI MOTOR ENTEGRASYONU — TEMEL

**Süre:** 4 gün
**Hedef:** Claude API ile kod analizi yapan temel AI motorunu kurmak.

### Adım 4.1: Anthropic API Client
- [ ] `action/src/ai-client.ts` oluştur
- [ ] `@anthropic-ai/sdk` bağımlılığını ekle
- [ ] API key'i `.env`'den/input'tan al
- [ ] Hata yönetimi (rate limit, timeout, auth error)
- [ ] Retry mekanizması (exponential backoff, max 3 retry)

### Adım 4.2: Temel Analiz Prompt'u
- [ ] Sistem prompt'unu oluştur (senior dev rolü)
- [ ] Diff'i prompt'a ekle (chunk'lanmış)
- [ ] JSON formatında cevap iste
- [ ] Cevap şeması:
  ```json
  {
    "risk_score": 1-10,
    "summary": "Kısa özet",
    "findings": [
      {
        "severity": "critical|warning|info",
        "file": "dosya_adı",
        "line": 42,
        "category": "security|performance|bug|style|architecture",
        "title": "Kısa başlık",
        "description": "Detaylı açıklama",
        "suggestion": "Düzeltme önerisi",
        "code_snippet": "Örnek kod"
      }
    ]
  }
  ```

### Adım 4.3: AI Cevap İşleme
- [ ] JSON parse ve validasyon
- [ ] Malformed cevapları handle et
- [ ] Cevap yoksa fallback (temel regex analizi)
- [ ] Token kullanım loglaması

### Adım 4.4: Prompt Optimizasyonu — İlk Tur
- [ ] Çok kısa diff'ler için lightweight prompt
- [ ] Çok uzun diff'ler için özetleme stratejisi
- [ ] Dil-specific talimatları prompt'a ekle

### Adım 4.5: İlk Canlı Test
- [ ] Gerçek bir PR'da çalıştır
- [ ] Sonuçları incele, prompt'u ayarla
- [ ] False positive/negative'leri not et
- [ ] İyileştirme listesi çıkar

### Faz 4 Kontrol Noktası
```
✅ Anthropic API client çalışıyor
✅ Temel analiz prompt'u hazır
✅ JSON cevap işleme çalışıyor
✅ İlk canlı test yapıldı
```

---

## FAZ 5: PROMPT MÜHENDİSLİĞİ VE İYİLEŞTİRME

**Süre:** 3 gün
**Hedef:** AI analiz kalitesini production seviyesine çıkarmak.

### Adım 5.1: Kategori Bazlı Prompt Tasarımı
- [ ] **Security:** SQL injection, XSS, CSRF, auth bypass, hardcoded secrets
- [ ] **Performance:** N+1 queries, memory leak, blocking I/O, unnecessary allocations
- [ ] **Bugs:** Null pointer, type mismatch, off-by-one, race condition, deadlock
- [ ] **Architecture:** Circular dependency, God class, layer violation, tight coupling
- [ ] **Style:** Naming convention, inconsistent patterns, dead code, TODO

### Adım 5.2: False Positive Azaltma
- [ ] Test dosyalarında daha esnek kontrol
- [ ] Config dosyalarında daha akıllı analiz
- [ ] Known-safe pattern'leri whitelist'e ekle
- [ ] Confidence score ekle (0-100%)

### Adım 5.3: Context-Aware Prompting
- [ ] PR title ve description'ı analize kat
- [ ] Commit mesajlarını oku
- [ ] Issue reference'larını tespit et
- [ ] Related PR'ları kontrol et

### Adım 5.4: Prompt A/B Test Altyapısı
- [ ] İki farklı prompt versiyonunu aynı PR'da test et
- [ ] Sonuçları karşılaştır
- [ ] Daha iyi olanı seç

### Adım 5.5: Prompt Versiyonlama
- [ ] Prompt'ları versiyonla (`prompts/v1/`, `prompts/v2/`)
- [ ] Her versiyon için changelog
- [ ] Rollback mekanizması

### Faz 5 Kontrol Noktası
```
✅ 5 kategoride optimize prompt
✅ False positive oranı <%20
✅ Context-aware analiz
✅ Prompt versiyonlama sistemi
```

---

## FAZ 6: PR COMMENT FORMATLAMA VE GÖNDERİM

**Süre:** 2 gün
**Hedef:** Analiz sonuçlarını güzel, okunabilir PR yorumlarına dönüştürmek.

### Adım 6.1: Markdown PR Comment Template
- [ ] Başlık: Risk skoru ve emoji
- [ ] Özet paragrafı
- [ ] Kritik bulgular tablosu
- [ ] Uyarılar listesi
- [ ] Bilgi notları
- [ ] PR Guardian imzası

### Adım 6.2: GitHub Comment API
- [ ] PR'a genel yorum olarak gönder
- [ ] Satır bazlı inline comment'ler
- [ ] Review summary olarak gönder
- [ ] Check run status güncelleme (success/failure)

### Adım 6.3: Comment Güncelleme ve Yönetimi
- [ ] Aynı PR için önceki yorumu bul
- [ ] Güncelle (edit) vs yeni yorum
- [ ] Spam önleme (aynı içerik tekrar gönderilmez)
- [ ] "Outdated" diff'lerde yorumu gizle

### Adım 6.4: Etkileşimli Yorumlar
- [ ] "Bu bulguyu yoksay" butonu
- [ ] "Daha fazla detay" genişletme
- [ ] "Benzer bulguları tara" tetikleyici

### Faz 6 Kontrol Noktası
```
✅ PR yorum şablonu hazır
✅ Inline + genel yorum çalışıyor
✅ Yorum güncelleme mantığı çalışıyor
✅ Etkileşimli elementler eklenebiliyor
```

---

## FAZ 7: HATA YÖNETİMİ VE EDGE CASE'LER

**Süre:** 2 gün
**Hedef:** Her türlü hata durumunu yöneten robust bir sistem kurmak.

### Adım 7.1: Hata Kategorileri
- [ ] **Auth hatası:** Geçersiz token, expired token
- [ ] **Rate limit:** API kotası doldu
- [ ] **Timeout:** AI cevabı çok geç geldi
- [ ] **Empty diff:** PR'da değişiklik yok (merge commit vb.)
- [ ] **Binary diff:** İncelenemez dosyalar
- [ ] **Huge diff:** Token limitini aşan PR'lar
- [ ] **Malformed diff:** Parse edilemeyen format
- [ ] **Network error:** Bağlantı kopması

### Adım 7.2: Hata Mesajları
- [ ] Her hata için kullanıcı dostu mesaj
- [ ] Debug modunda detaylı log
- [ ] Hata kodu sistemi (PG-001, PG-002...)
- [ ] Çözüm önerisi içeren mesajlar

### Adım 7.3: Graceful Degradation
- [ ] AI çalışmazsa regex-based temel analize geç
- [ ] Kısmi başarısızlıkta kalan bulguları göster
- [ ] "Elimizden gelen bu" mesajı

### Adım 7.4: Logging ve Monitoring
- [ ] Structured logging (JSON format)
- [ ] Log seviyeleri: DEBUG, INFO, WARN, ERROR
- [ ] Action output'a anlamlı log'lar bas
- [ ] Metrics: response time, token usage, error rate

### Faz 7 Kontrol Noktası
```
✅ Tüm hata kategorileri yakalanıyor
✅ Kullanıcı dostu hata mesajları
✅ Graceful degradation çalışıyor
✅ Logging sistemi kuruldu
```

---

## FAZ 8: TEST ALTYAPISI VE OTOMASYON

**Süre:** 3 gün
**Hedef:** Tam test kapsamı ve CI/CD pipeline'ı kurmak.

### Adım 8.1: Unit Test'ler
- [ ] Jest/Vitest kurulumu
- [ ] Diff parser test'leri (50+ test case)
- [ ] AI client mock test'leri
- [ ] Prompt template test'leri
- [ ] Comment formatter test'leri
- [ ] Hata yönetimi test'leri
- [ ] Hedef: >%80 code coverage

### Adım 8.2: Integration Test'ler
- [ ] GitHub API mock ile entegrasyon testi
- [ ] Anthropic API mock ile entegrasyon testi
- [ ] End-to-end: diff → analiz → comment akışı

### Adım 8.3: Test Fixture'ları
- [ ] Örnek PR diff'leri (her dil için)
- [ ] Bilinçli bug içeren diff'ler
- [ ] Edge case diff'ler (boş diff, binary, huge)

### Adım 8.4: CI/CD Pipeline
- [ ] GitHub Actions workflow: test on push
- [ ] Lint kontrolü
- [ ] TypeScript type check
- [ ] Build kontrolü
- [ ] Coverage raporu

### Adım 8.5: Pre-commit Hook'ları
- [ ] Husky: pre-commit → lint-staged
- [ ] Commit message formatı
- [ ] Branch naming convention

### Faz 8 Kontrol Noktası
```
✅ Unit test coverage >%80
✅ Integration test'ler çalışıyor
✅ CI/CD pipeline aktif
✅ Pre-commit hook'ları kurulu
```

---

## FAZ 9: MVP LANSMANI — ÜCRETSİZ BETA

**Süre:** 3 gün
**Hedef:** Ürünü gerçek kullanıcılara açmak ve ilk geri bildirimi almak.

### Adım 9.1: MVP Özellik Seti
- [ ] Public repo'larda çalışıyor
- [ ] Temel güvenlik analizi
- [ ] Temel bug tespiti
- [ ] PR comment olarak sonuçlar
- [ ] Sadece TypeScript/JavaScript desteği
- [ ] Ücretsiz

### Adım 9.2: Beta Kullanıcı Alımı
- [ ] r/github, r/programming'de paylaşım
- [ ] Hacker News "Show HN" postu
- [ ] Dev.to blog postu
- [ ] Twitter/X duyurusu
- [ ] GitHub'da trending repolara issue/PR açarak tanıt

### Adım 9.3: Feedback Toplama Sistemi
- [ ] GitHub Issues template (bug report, feature request)
- [ ] NPS anketi (Google Forms / Typeform)
- [ ] Her kurulum yapana teşekkür email'i/dm'i

### Adım 9.4: İlk Hafta Analizi
- [ ] Kurulum sayısı
- [ ] Kullanılan PR sayısı
- [ ] Bulunan bug sayısı
- [ ] False positive şikayetleri
- [ ] Kullanıcı yorumları

### Faz 9 Kontrol Noktası
```
✅ MVP public repolarda çalışıyor
✅ En az 20 beta kullanıcısı
✅ Feedback kanalları aktif
✅ İlk hafta metrikleri toplandı
```

---

## FAZ 10: GITHUB MARKETPLACE LİSTELEME

**Süre:** 2 gün
**Hedef:** GitHub Marketplace'te profesyonel bir listing ile yer almak.

### Adım 10.1: Marketplace Listing Hazırlığı
- [ ] Logo tasarımı (1024x1024 PNG)
- [ ] Kısa açıklama (40-80 karakter)
- [ ] Uzun açıklama (markdown, özellikler, kullanım)
- [ ] Screenshot'lar (en az 3-5 adet)
- [ ] Kategori: Code review, Security
- [ ] Tags: ai, code-review, security, pull-request, automation

### Adım 10.2: GitHub App Olarak Kayıt
- [ ] GitHub App oluştur
- [ ] Permissions: Pull requests (read/write), Checks (read/write), Contents (read)
- [ ] Webhook URL (sonraki fazlarda)
- [ ] OAuth flow (sonraki fazlarda)

### Adım 10.3: Marketplace Onay Süreci
- [ ] Listing'i submit et
- [ ] GitHub review bekle (genelde 2-5 iş günü)
- [ ] Feedback gelirse düzelt

### Adım 10.4: Launch Day Hazırlığı
- [ ] Launch tarihini belirle
- [ ] Sosyal medya post'larını hazırla
- [ ] "Launch HN" postunu yaz

### Faz 10 Kontrol Noktası
```
✅ Logo ve görseller hazır
✅ GitHub App kaydı yapıldı
✅ Marketplace listing submit edildi
✅ Launch planı hazır
```

---

## FAZ 11: AKILLI DİL DESTEĞİ — ÇOKLU DİL ANALİZİ

**Süre:** 5 gün
**Hedef:** 7+ programlama dilinde derinlemesine analiz yapabilmek.

### Adım 11.1: TypeScript/JavaScript Derin Analizi
- [ ] `any` kullanım tespiti
- [ ] `as` / type assertion riskleri
- [ ] Unhandled promise'ler
- [ ] React hook kuralları
- [ ] `useEffect` dependency array
- [ ] Memory leak pattern'leri (event listener, setInterval)

### Adım 11.2: Python Derin Analizi
- [ ] Bare `except:` yakalama
- [ ] Mutable default argument (`def f(x=[])`)
- [ ] F-string injection riski
- [ ] `eval()` / `exec()` kullanımı
- [ ] Global interpreter lock farkındalığı

### Adım 11.3: Go Derin Analizi
- [ ] Unhandled `error` dönüşleri
- [ ] Goroutine leak'leri
- [ ] Nil pointer dereference
- [ ] Defer hataları (loop içinde defer)
- [ ] Race condition pattern'leri

### Adım 11.4: Rust Derin Analizi
- [ ] `unwrap()` / `expect()` kullanımı
- [ ] `unsafe` block tespiti
- [ ] Borrow checker atlatma hileleri
- [ ] Deadlock riskleri (Mutex)

### Adım 11.5: Java/Kotlin Derin Analizi
- [ ] Null safety (Optional kullanımı)
- [ ] Resource leak (try-with-resources eksik)
- [ ] Thread safety
- [ ] SQL injection (Raw query)

### Adım 11.6: C#/.NET Derin Analizi
- [ ] `async void` tespiti
- [ ] IDisposable pattern
- [ ] LINQ performans tuzakları
- [ ] Null reference exception riskleri

### Adım 11.7: Ruby/Rails Derin Analizi
- [ ] Mass assignment (strong params)
- [ ] N+1 query (bullet gem benzeri tespit)
- [ ] SQL injection
- [ ] Callback hell

### Faz 11 Kontrol Noktası
```
✅ 7+ dil için derin analiz
✅ Her dil için en az 5 özel kontrol
✅ Dil-specific test fixture'ları
```

---

## FAZ 12: FRAMEWORK-AWARE DERİNLEMESİNE ANALİZ

**Süre:** 5 gün
**Hedef:** Popüler framework'lere özel analiz yetenekleri eklemek.

### Adım 12.1: React/Next.js Analizi
- [ ] Server/client component boundary ihlalleri
- [ ] `getServerSideProps` / `getStaticProps` pattern'leri
- [ ] State mutation (doğrudan state değiştirme)
- [ ] Key prop eksikliği
- [ ] useEffect infinite loop riski
- [ ] useMemo/useCallback eksikliği (performans)

### Adım 12.2: Django/Flask Analizi
- [ ] N+1 query tespiti (`select_related` / `prefetch_related` eksik)
- [ ] Migration conflict'leri
- [ ] Middleware sıralama hataları
- [ ] DEBUG=True production'da
- [ ] SECRET_KEY hardcoded

### Adım 12.3: Express/Fastify Analizi
- [ ] Middleware sıralama hataları
- [ ] Error handler eksikliği
- [ ] req.body validasyon eksikliği
- [ ] CORS misconfiguration
- [ ] Rate limiting eksikliği
- [ ] Helmet.js eksikliği

### Adım 12.4: Rails Analizi
- [ ] Strong parameters eksikliği
- [ ] Mass assignment vulnerability
- [ ] N+1 query (`.includes()` eksik)
- [ ] Callback zinciri karmaşıklığı
- [ ] CSRF koruması

### Adım 12.5: Spring Boot Analizi
- [ ] Transaction yönetimi
- [ ] JPA N+1 query
- [ ] CORS konfigürasyonu
- [ ] Actuator endpoint exposure

### Faz 12 Kontrol Noktası
```
✅ 5 framework için özel analiz
✅ Her framework için en az 5 kontrol
✅ Framework-specific test fixture'ları
```

---

## FAZ 13: "PRODUCTION'DA NE KIRABİLİR?" MOTORU

**Süre:** 5 gün
**Hedef:** PR Guardian'ın ana USP'si olan production risk analizini geliştirmek.

### Adım 13.1: Database Migration Check
- [ ] Yeni field eklenmiş ama migration dosyası yok → CRITICAL
- [ ] Kolon tipi değişmiş ama migration'da ALTER yok → CRITICAL
- [ ] Index eklenmiş ama migration'da CREATE INDEX yok → WARNING
- [ ] Foreign key eklenmiş ama migration'da yok → CRITICAL
- [ ] Migration dosyası sıralaması bozuk → WARNING

### Adım 13.2: Config Change Detection
- [ ] `.env.example`'a yeni değişken eklenmiş
- [ ] Kodda `process.env.NEW_VAR` var ama `.env.example`'da yok
- [ ] Default değer olmadan okunan env var
- [ ] Production config ile dev config farkı
- [ ] Docker compose / K8s config değişiklikleri

### Adım 13.3: API Contract Break Detection
- [ ] Response shape değişmiş (yeni/kaldırılan field)
- [ ] Response type değişmiş (string → number)
- [ ] Endpoint path değişmiş
- [ ] HTTP method değişmiş
- [ ] Frontend'in bu endpoint'i kullanıp kullanmadığını kontrol et

### Adım 13.4: Dependency Conflict Analizi
- [ ] `package.json` / `Cargo.toml` / `go.mod` değişiklikleri
- [ ] Breaking change içeren versiyon yükseltmeleri
- [ ] Peer dependency conflict'leri
- [ ] Deprecated package kullanımı
- [ ] Known vulnerability (CVE) check

### Adım 13.5: Performance Regression Tespiti
- [ ] Loop içinde DB sorgusu
- [ ] N+1 query pattern'i
- [ ] Senkron I/O (event loop'ta)
- [ ] Büyük allocation'lar
- [ ] Unbounded collection büyümesi
- [ ] Cache invalidation eksikliği

### Adım 13.6: Risk Skoru Algoritması
- [ ] Her bulgu tipi için ağırlık
- [ ] Critical: 10 puan
- [ ] High: 7 puan
- [ ] Medium: 4 puan
- [ ] Low: 1 puan
- [ ] Ağırlıklı toplam → 1-10 arası normalize et
- [ ] Threshold'a göre PASS/FAIL

### Faz 13 Kontrol Noktası
```
✅ 5 ana production risk kategorisi
✅ DB migration check çalışıyor
✅ API contract break tespiti
✅ Risk skoru algoritması
```

---

## FAZ 14: API SERVER GELİŞTİRME

**Süre:** 5 gün
**Hedef:** Action'dan bağımsız, kendi ayakları üzerinde duran bir API server kurmak.

### Adım 14.1: Server Framework Kurulumu
- [ ] Fastify (veya Hono) ile proje başlat
- [ ] `api/package.json`, `api/tsconfig.json`
- [ ] Route yapısı: `/api/v1/*`
- [ ] Middleware: CORS, rate limiting, logging
- [ ] Health check endpoint: `GET /api/v1/health`

### Adım 14.2: Core Endpoint'ler
- [ ] `POST /api/v1/analyze` — Ana analiz endpoint'i
  - Body: `{ repo, pr_number, diff, language?, framework? }`
  - Response: `{ risk_score, findings[], summary, analysis_id }`
- [ ] `GET /api/v1/analysis/:id` — Analiz sonucu sorgulama
- [ ] `GET /api/v1/usage` — Kullanım istatistikleri

### Adım 14.3: Queue Sistemi
- [ ] BullMQ / Redis ile job queue
- [ ] Async analiz (hemen cevap dön, sonra işle)
- [ ] Webhook ile sonuç bildirimi
- [ ] Queue monitoring

### Adım 14.4: Rate Limiting ve Kota
- [ ] Free tier: 50 PR/ay, 10 req/dk
- [ ] Team tier: 500 PR/ay, 60 req/dk
- [ ] Pro tier: 2000 PR/ay, 120 req/dk
- [ ] Enterprise: unlimited

### Adım 14.5: Veritabanı Tasarımı
- [ ] PostgreSQL (Supabase veya Neon.tech)
- [ ] Tablolar: users, repos, analyses, subscriptions, api_keys
- [ ] Migration'lar (Drizzle ORM veya Prisma)
- [ ] Index optimizasyonu

### Faz 14 Kontrol Noktası
```
✅ API server çalışıyor
✅ Queue sistemi kurulu
✅ Rate limiting aktif
✅ Veritabanı şeması hazır
```

---

## FAZ 15: KULLANICI YÖNETİMİ VE AUTH SİSTEMİ

**Süre:** 3 gün
**Hedef:** Kullanıcı kaydı, giriş ve yetkilendirme sistemini kurmak.

### Adım 15.1: GitHub OAuth Entegrasyonu
- [ ] GitHub OAuth App oluştur
- [ ] OAuth flow: authorize → callback → token
- [ ] JWT token üretimi (access + refresh)
- [ ] Session yönetimi

### Adım 15.2: Kullanıcı Modeli
- [ ] `users` tablosu
- [ ] `api_keys` tablosu (per-user API key)
- [ ] `organizations` tablosu (team hesapları için)
- [ ] `subscriptions` tablosu

### Adım 15.3: Yetkilendirme
- [ ] API key authentication middleware
- [ ] JWT authentication middleware
- [ ] Role-based access: user, org_admin, super_admin
- [ ] Repo-level permissions

### Faz 15 Kontrol Noktası
```
✅ GitHub OAuth çalışıyor
✅ JWT auth sistemi kurulu
✅ Role-based access control
```

---

## FAZ 16: MONETİZASYON — PRICING TIERS VE BILLING

**Süre:** 5 gün
**Hedef:** Ödeme sistemini tamamen entegre etmek.

### Adım 16.1: Pricing Tier'ları Kodla
- [ ] FREE: public repos, 50 PR/ay, basic checks
- [ ] TEAM ($29/ay): 5 private repo, tüm check'ler, custom rules
- [ ] PRO ($79/ay): sınırsız repo, CI/CD entegrasyonu, Slack
- [ ] ENTERPRISE ($299/ay): self-hosted, SSO, audit logs

### Adım 16.2: Stripe Entegrasyonu
- [ ] Stripe hesabı (Ertan)
- [ ] Stripe Checkout Session oluşturma
- [ ] Webhook: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- [ ] Invoice yönetimi
- [ ] Dunning (failed payment retry)

### Adım 16.3: GitHub Marketplace Billing
- [ ] GitHub Marketplace billing API entegrasyonu
- [ ] Purchase event webhook
- [ ] Change/cancel event webhook
- [ ] GitHub'ın kendi billing'i üzerinden tahsilat (%0-5 komisyon)

### Adım 16.4: Kullanım Takibi
- [ ] PR sayacı (aylık)
- [ ] Token kullanım takibi
- [ ] Kotaya yaklaşma uyarısı
- [ ] Kullanım dashboard'u (kullanıcıya göster)

### Adım 16.5: Faturalandırma
- [ ] Aylık fatura oluşturma
- [ ] PDF fatura (Stripe)
- [ ] Email ile fatura gönderimi
- [ ] Fatura geçmişi sayfası

### Faz 16 Kontrol Noktası
```
✅ Stripe entegrasyonu tamam
✅ GitHub Marketplace billing
✅ Kullanım takibi çalışıyor
✅ Faturalandırma sistemi hazır
```

---

## FAZ 17: DASHBOARD VE WEB ARAYÜZÜ

**Süre:** 5 gün
**Hedef:** Kullanıcıların analiz sonuçlarını görebileceği, ayarları yönetebileceği bir web paneli.

### Adım 17.1: Frontend Framework
- [ ] Next.js veya Remix ile proje başlat
- [ ] Tailwind CSS kurulumu
- [ ] shadcn/ui component kütüphanesi
- [ ] Responsive tasarım (mobile-friendly)

### Adım 17.2: Sayfa Tasarımları
- [ ] **Landing Page:** Hero, features, pricing, testimonials, FAQ
- [ ] **Dashboard:** Genel bakış, son analizler, metrikler
- [ ] **Repo Listesi:** Bağlı repolar, analiz durumu
- [ ] **Analiz Detay:** Tek bir analizin tüm bulguları
- [ ] **Ayarlar:** Plan, billing, API keys, notifications
- [ ] **Billing:** Fatura geçmişi, plan değiştirme

### Adım 17.3: Auth UI
- [ ] "Sign in with GitHub" butonu
- [ ] Kullanıcı profil sayfası
- [ ] Organizasyon yönetimi

### Adım 17.4: Analytics Dashboard
- [ ] Bulunan bug sayısı (zaman grafiği)
- [ ] Risk skoru trendi
- [ ] En çok hata yapılan dosyalar
- [ ] Dil/framework dağılımı
- [ ] Takım liderlik tablosu

### Faz 17 Kontrol Noktası
```
✅ Landing page yayında
✅ Dashboard fonksiyonel
✅ Auth UI çalışıyor
✅ Analytics dashboard hazır
```

---

## FAZ 18: BÜYÜME VE PAZARLAMA OPERASYONU

**Süre:** 7 gün
**Hedef:** Sürdürülebilir büyüme kanalları oluşturmak.

### Adım 18.1: Content Marketing
- [ ] Blog: "AI Code Review Tools Compared 2026"
- [ ] Blog: "Top 10 PR Mistakes We Caught with AI"
- [ ] Blog: "How We Reduced Production Bugs by 70%"
- [ ] Dev.to haftalık yazı serisi
- [ ] Medium publication'da yayınla

### Adım 18.2: Product Hunt Lansmanı
- [ ] Launch günü planlaması
- [ ] Görseller, GIF'ler, demo video hazırla
- [ ] İlk yorumu kendin yaz (ürün hikayesi)
- [ ] Maker community'den destek iste
- [ ] #1 Product of the Day hedefle

### Adım 18.3: SEO
- [ ] Landing page SEO optimizasyonu
- [ ] "AI code review", "github PR review tool", "automated code review" keyword'leri
- [ ] Backlink stratejisi
- [ ] Google Search Console kurulumu

### Adım 18.4: Sosyal Medya
- [ ] Twitter/X hesabı aç (@prguardian)
- [ ] LinkedIn sayfası
- [ ] Haftada 3 post
- [ ] "Bug of the week" serisi
- [ ] Developer influencer'larla işbirliği

### Adım 18.5: Açık Kaynak Büyüme
- [ ] Büyük open source repolarda ücretsiz kullan
- [ ] Issue/PR'larda görünür ol
- [ ] "Powered by PR Guardian" badge'i
- [ ] Sponsorluk sayfası

### Adım 18.6: Email Marketing
- [ ] Resend / Loops.so ile email altyapısı
- [ ] Welcome email dizisi (5 email)
- [ ] Weekly digest: "Bu hafta Guardian X bug yakaladı"
- [ ] Churn riski taşıyan kullanıcılara özel kampanya

### Faz 18 Kontrol Noktası
```
✅ Blog aktif (en az 5 yazı)
✅ Product Hunt lansmanı yapıldı
✅ SEO temelleri atıldı
✅ Sosyal medya hesapları aktif
✅ Email marketing başladı
```

---

## FAZ 19: ENTERPRISE ÖZELLİKLER VE SKALAMA

**Süre:** 7 gün
**Hedef:** Büyük şirketlere satış yapabilmek için gerekli özellikleri eklemek.

### Adım 19.1: Self-Hosted Seçenek
- [ ] Docker image
- [ ] Docker Compose ile tek komutta kurulum
- [ ] Kubernetes Helm chart
- [ ] Kendi AI API key'ini kullanabilme

### Adım 19.2: SSO ve SAML
- [ ] SAML 2.0 entegrasyonu
- [ ] OIDC desteği
- [ ] Okta, Azure AD, Google Workspace entegrasyonu
- [ ] Otomatik kullanıcı provisioning (SCIM)

### Adım 19.3: Audit Logs
- [ ] Tüm aksiyonların loglanması
- [ ] Log retention policy
- [ ] Export edilebilir log'lar (CSV, JSON)
- [ ] SIEM entegrasyonu (Splunk, Datadog)

### Adım 19.4: Özel AI Model
- [ ] Kendi fine-tuned model'ini kullanabilme
- [ ] On-premise LLM desteği (ollama, vLLM)
- [ ] Custom prompt'lar
- [ ] Company-specific coding standards

### Adım 19.5: Performans Skalama
- [ ] Horizontal scaling (K8s HPA)
- [ ] Database connection pooling
- [ ] Redis cluster
- [ ] CDN (Cloudflare)
- [ ] Multi-region deployment (fly.io / Railway)

### Adım 19.6: SLA ve Support
- [ ] %99.9 uptime SLA
- [ ] Öncelikli destek (Slack kanalı)
- [ ] Response time garantisi
- [ ] Status page (status.prguardian.dev)

### Faz 19 Kontrol Noktası
```
✅ Docker/K8s deployment
✅ SSO entegrasyonu
✅ Audit log'lar
✅ Self-hosted seçeneği
✅ Enterprise satışa hazır
```

---

## FAZ 20: SÜREKLİ İYİLEŞTİRME, BAKIM VE ÖLÇEKLEME

**Süre:** Sürekli
**Hedef:** Ürünü canlı tutmak, sürekli iyileştirmek ve büyütmek.

### Adım 20.1: Kullanıcı Geri Bildirim Döngüsü
- [ ] Haftalık feedback review
- [ ] Feature request oylama sistemi
- [ ] "Bug bounty" (false positive bildirene teşekkür)
- [ ] Quarterly user survey

### Adım 20.2: A/B Test Altyapısı
- [ ] Landing page A/B test'leri
- [ ] Pricing sayfası A/B test'leri
- [ ] Prompt A/B test'leri
- [ ] Sonuçları analiz et, optimize et

### Adım 20.3: Yeni Dil/Framework Desteği
- [ ] Kullanıcılardan gelen taleplere göre
- [ ] Ayda en az 1 yeni dil
- [ ] Ayda en az 1 yeni framework

### Adım 20.4: Güvenlik Güncellemeleri
- [ ] Haftalık bağımlılık güncellemesi (Dependabot)
- [ ] Aylık güvenlik audit'i
- [ ] Penetrasyon testi (yılda 1)

### Adım 20.5: Metrikler ve Raporlama
- [ ] Aylık MRR takibi
- [ ] Churn rate analizi
- [ ] Customer acquisition cost (CAC)
- [ ] Lifetime value (LTV)
- [ ] Net revenue retention (NRR)

### Adım 20.6: Yeni Feature'lar
- [ ] IDE entegrasyonu (VS Code extension)
- [ ] GitLab desteği
- [ ] Bitbucket desteği
- [ ] Linear/Jira entegrasyonu (issue oluşturma)
- [ ] Team velocity analitiği

### Faz 20 Kontrol Noktası (Aylık)
```
✅ Churn <%5
✅ MRR büyüyor
✅ Kullanıcı memnuniyeti >8/10
✅ Yeni feature'lar ekleniyor
✅ Sistem stabil
```

---

## GENEL HEDEFLER

| Metrik | 1. Ay | 3. Ay | 6. Ay | 12. Ay | 24. Ay |
|--------|-------|-------|-------|--------|--------|
| Kurulum | 50 | 300 | 1,000 | 3,000 | 10,000 |
| Paying Users | 5 | 30 | 100 | 300 | 1,000 |
| MRR | $150 | $900 | $3,000 | $9,000 | $30,000 |
| Churn Rate | - | <%10 | <%5 | <%5 | <%3 |
| Response Time | <30s | <15s | <5s | <2s | <1s |
| False Positive | <%30 | <%20 | <%15 | <%10 | <%5 |

---

## ROL DAĞILIMI

### Claude (AI) — Proje Yöneticisi ve Geliştirici
- Tüm kod geliştirme
- Tüm test yazımı
- Tüm dökümantasyon
- Pazar araştırması
- Pazarlama içeriği üretimi
- Sosyal medya yönetimi
- Müşteri desteği
- Proje yönetimi
- Karar verme

### Ertan (İnsan Operatör) — Dış Bağlantı
- GitHub hesap yönetimi
- API anahtarı temini (Anthropic, Stripe, vb.)
- Ödeme hesap yönetimi (Stripe, banka)
- Domain kaydı
- Yasal işlemler
- Fiziksel/manuel doğrulamalar
- Claude'un yönlendirdiği dış işlemler

---

## PROTOKOL: OTURUM AÇILIŞ KONTROLÜ

Her yeni oturum başladığında Claude şunları yapacak:

1. `docs/STATE.md` dosyasını oku — mevcut durumu gör
2. `docs/MASTER_PLAN.md` dosyasını kontrol et — nerede kaldığını hatırla
3. Aktif faz ve adımı belirle
4. "Devam ediyorum" raporu ver
5. Kaldığı yerden çalışmaya başla

---

## PROTOKOL: OTURUM KAPANIŞ KAYDI

Her oturum kapanmadan önce Claude şunları yapacak:

1. `docs/STATE.md` dosyasını güncelle
   - Hangi fazda olduğumuzu
   - Hangi adımda olduğumuzu
   - Ne yapıldığını (✅)
   - Ne kaldığını (⬜)
   - Sonraki adımda ne yapılacağını
2. Değişiklikleri commit'le
3. Push'la (mümkünse)

---

## PROJE DİZİN YAPISI

```
pr-guardian/
├── docs/
│   ├── MASTER_PLAN.md          ← Bu dosya (20 fazlık ana plan)
│   ├── STATE.md                ← Güncel durum takip dosyası
│   ├── PAZAR_ARASTIRMASI.md    ← Faz 1 çıktısı
│   ├── FİYATLANDIRMA.md        ← Faz 1 çıktısı
│   ├── ICP.md                  ← Faz 1 çıktısı
│   ├── ARCHITECTURE.md         ← Sistem mimarisi dökümanı
│   └── CHANGELOG.md            ← Değişiklik kaydı
├── action/                     ← GitHub Action kaynak kodu
│   ├── action.yml
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── main.ts
│   │   ├── diff-parser.ts
│   │   ├── ai-client.ts
│   │   ├── comment-formatter.ts
│   │   └── utils.ts
│   └── dist/                   ← Build çıktısı
├── api/                        ← API server kaynak kodu
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── server.ts
│       ├── routes/
│       ├── services/
│       ├── models/
│       └── middleware/
├── web/                        ← Dashboard frontend
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── pages/
│       ├── components/
│       └── lib/
├── scripts/                    ← Utility script'ler
├── .github/
│   └── workflows/              ← Kendi CI/CD'miz
├── memory/                     ← Oturum kalıcı hafızası
│   ├── MEMORY.md
│   └── *.md
├── .gitignore
├── .env.example
└── README.md
```
