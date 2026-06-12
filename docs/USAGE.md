# PR Guardian — Kullanım Kılavuzu

## 2 Dakikada Kurulum

### 1. DeepSeek API Key Al

https://platform.deepseek.com/ adresine git → API Keys → Create Key → Kopyala

### 2. GitHub Secrets'a Ekle

Repo → Settings → Secrets and variables → Actions → New repository secret

| Secret | Değer |
|--------|-------|
| `DEEPSEEK_API_KEY` | DeepSeek API key'in |

### 3. Workflow Dosyası Oluştur

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

### 4. PR Aç, Çalıştığını Gör

Her PR açtığında veya güncellediğinde PR Guardian otomatik çalışır ve sonuçları PR yorumu olarak ekler.

---

## Input Parametreleri

| Parametre | Zorunlu | Varsayılan | Açıklama |
|-----------|---------|------------|----------|
| `github_token` | Evet | — | `${{ secrets.GITHUB_TOKEN }}` |
| `deepseek_api_key` | Evet | — | DeepSeek API key |
| `risk_threshold` | Hayır | `7` | 1-10 arası. Bu skorun üstünde FAIL verir |
| `exclude_patterns` | Hayır | `*.lock,*.lockb,*-lock.json` | Analizden hariç tutulacak glob pattern'ler |
| `max_diff_size` | Hayır | `100` | Analiz edilecek maksimum diff boyutu (KB) |

---

## Risk Skoru Ne Anlama Gelir?

| Skor | Seviye | Anlamı |
|------|--------|--------|
| 1-3 | 🟢 SAFE | Küçük değişiklikler, risk yok |
| 4-6 | 🟡 MODERATE | Orta risk, dikkatli review önerilir |
| 7-8 | 🟠 HIGH RISK | Yüksek risk, merge'den önce mutlaka kontrol et |
| 9-10 | 🔴 CRITICAL | Production'ı kırma ihtimali yüksek |

---

## Hangi Kontrolleri Yapar?

| Kategori | Örnek |
|----------|-------|
| **Production Breaking** | DB migration eksik, API contract değişmiş, config güncellenmemiş |
| **Security** | SQL injection, XSS, hardcoded secret, auth bypass |
| **Bugs** | Null pointer, type mismatch, race condition, unhandled promise |
| **Performance** | N+1 query, loop içinde DB sorgusu, memory leak |
| **Architecture** | Circular dependency, tight coupling, God class |

---

## Desteklenen Diller

| Dil | Özel Kontroller |
|-----|-----------------|
| TypeScript | any kullanımı, as assertion, promise handling, React hooks |
| JavaScript | == vs ===, callback hataları, console.log |
| Python | Bare except, mutable default args, eval/exec, f-string injection |
| Go | Unhandled errors, goroutine leaks, nil pointer |
| Java | PreparedStatement eksik, resource leak, thread safety |
| C# | async void, IDisposable, LINQ çoklu enumeration |
| Rust | unwrap() kullanımı, unsafe block, Mutex across await |
| Ruby | SQL injection, mass assignment, N+1 query |
| SQL | Migration eksik, DEFAULT yok, index eksik |

---

## Özel Kurallar (`.prguardian.yml`)

Reponun kök dizinine `.prguardian.yml` ekleyerek özel kurallar tanımlayabilirsin (Team plan ve üstü):

```yaml
# .prguardian.yml
exclude:
  files:
    - "**/*.test.ts"
    - "**/*.spec.ts"
  rules:
    - "style"  # Stil uyarılarını kapat

rules:
  custom:
    - pattern: "console\\.log"
      severity: warning
      message: "console.log kalmış"
    - pattern: "TODO|FIXME"
      severity: info
      message: "TODO/FIXME var, takip et"

threshold:
  risk_score: 6  # 7 yerine 6 kullan
```

---

## Sık Sorulan Sorular

### Ücretsiz mi?
Public repolarda tamamen ücretsiz. Ayda 50 PR'a kadar tüm özellikler.

### Private repolarda?
Team plan ($29/ay) ile 5 private repo. PRO ($79/ay) ile sınırsız.

### DeepSeek yerine kendi API key'imi kullanabilir miyim?
Enterprise planda kendi Anthropic/OpenAI/DeepSeek key'inizi kullanabilirsiniz.

### Hangi event'lerde çalışır?
`pull_request.opened` ve `pull_request.synchronize` (yeni commit push'landığında).

### Çok büyük PR'larda ne olur?
100KB üstü diff'ler otomatik kesilir. `max_diff_size` ile ayarlayabilirsiniz.

### GitHub dışında çalışır mı?
Şu an sadece GitHub. GitLab ve Bitbucket roadmap'te var.
