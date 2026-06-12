# PR GUARDIAN — AI Proje Yönetim Protokolü

> Bu proje tamamen Claude tarafından yönetilmektedir. Ertan (insan operatör) sadece dış bağlantılarda yardımcı olur.

## HER OTURUM BAŞLANGICINDA

1. `docs/STATE.md` dosyasını oku — aktif fazı ve adımı gör
2. Aktif adımdan çalışmaya başla
3. Ertan'a kısa bir "nerede kalmıştık" özeti ver

## HER OTURUM SONUNDA

1. `docs/STATE.md` dosyasını güncelle (✅/⬜)
2. Tüm değişiklikleri kaydet

## PROJE ÖZETİ

- **Ürün:** GitHub PR Guardian Action — AI destekli PR kod inceleme
- **USP:** "Production'da ne kırabilir?" sorusuna cevap veren tek araç
- **Platform:** GitHub Marketplace
- **Gelir modeli:** Freemium SaaS ($29-299/ay)
- **Ana plan:** `docs/MASTER_PLAN.md` (20 faz)

## MEVCUT DURUM

- Başlangıç: 2026-06-12
- Aktif Faz: FAZ 0 — Proje Kurulumu ve Ortam Hazırlığı
- Aktif Adım: 0.1 — GitHub Hesap ve Repo Kurulumu
- İlerleme: %0

## DİZİN YAPISI

```
pr-guardian/
├── docs/           ← Plan ve dökümantasyon
├── action/         ← GitHub Action kaynak kodu
├── api/            ← API server
├── web/            ← Dashboard frontend
├── scripts/        ← Utility script'ler
├── memory/         ← Kalıcı hafıza
└── .github/        ← CI/CD workflow'ları
```

## ROL DAĞILIMI

- **Claude:** Tüm geliştirme, test, dökümantasyon, pazarlama, pazar araştırması
- **Ertan:** GitHub hesabı, API anahtarları, ödeme hesapları, domain

## ÖNEMLİ KURALLAR

- Her fazı sırayla yap, atlama
- Her adımı bitirmeden sonrakine geçme
- STATE.md'yi sürekli güncel tut
- Ertan'a sadece gerçekten dış erişim gerektiğinde sor
- Türkçe iletişim kur
