---
name: project-pr-guardian
description: GitHub PR Guardian Action — AI destekli PR kod inceleme SaaS projesi. 20 fazlık master plan ile yönetiliyor.
metadata:
  type: project
---

# PR Guardian Projesi

**Başlangıç:** 2026-06-12
**Proje Dizini:** D:\dosyalar\projeler\Yeni klasör\pr-guardian
**Aktif Faz:** FAZ 0 — Proje Kurulumu ve Ortam Hazırlığı
**Aktif Adım:** 0.1 — GitHub Hesap ve Repo Kurulumu

## Proje Özeti

GitHub Marketplace'te satılacak, AI destekli PR kod inceleme GitHub Action'ı.
USP: "Production'da ne kırabilir?" sorusuna cevap veren tek PR review aracı.

## Ana Plan Dosyası
Tüm fazlar ve adımlar `docs/MASTER_PLAN.md` içinde 20 faz olarak detaylandırılmıştır.

## Durum Takibi
Güncel durum `docs/STATE.md` dosyasındadır. Her oturum başlangıcında bu dosya okunmalı, her oturum sonunda güncellenmelidir.

## Rol Dağılımı
- **Claude (AI):** Tüm kod, test, dökümantasyon, pazarlama, pazar araştırması, sosyal medya
- **Ertan (İnsan):** GitHub hesabı, API anahtarları, ödeme hesapları, domain, dış bağlantılar

## Proje Dizin Yapısı
- `docs/` — Plan ve dökümantasyon
- `action/` — GitHub Action kaynak kodu
- `api/` — API server
- `web/` — Dashboard frontend
- `scripts/` — Utility script'ler
- `memory/` — Kalıcı hafıza

## Oturum Protokolü
1. Açılış: `docs/STATE.md` oku → aktif fazı/adımı bul → devam et
2. Kapanış: `docs/STATE.md` güncelle → değişiklikleri commit'le → push'la

**Why:** Proje tamamen AI tarafından yönetiliyor. Konsol kapatılıp açıldığında proje durumunu hatırlamak ve kaldığı yerden devam etmek için kalıcı durum takibi şart.

**How to apply:** Her oturum başında STATE.md oku, STATE.md'deki aktif adımdan devam et. Her oturum sonunda STATE.md'yi güncelle.
