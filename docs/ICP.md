# PR GUARDIAN — IDEAL CUSTOMER PROFILE (ICP)

> **Son güncelleme:** 2026-06-12

---

## PRIMARY ICP

### Profil Kartı

| Kriter | Değer |
|--------|-------|
| **Rol** | CTO, VP Engineering, Engineering Manager, Tech Lead |
| **Ekip Büyüklüğü** | 5-200 developer |
| **Sektör** | SaaS, Fintech, E-commerce, Developer Tools |
| **Lokasyon** | Global (İngilizce konuşan pazarlar öncelikli) |
| **Tech Stack** | TypeScript/Node.js, Python, Go, Java, Ruby |
| **Git** | GitHub (primary), GitLab (sonraki) |
| **Bütçe** | Aylık $29-299 (bütçe onayı gerektirmez) |

### Ağrı Noktaları

1. **"Production'da ne kırılacak bilmiyoruz"** — PR review'da bunu soran yok
2. **"Cuma deploy'u sendromu"** — Her deploy riskli, neyin riskli olduğu belirsiz
3. **"Migration'ı unuttuk, 3 saat downtime"** — DB değişikliği takibi manuel
4. **"Frontend kırıldı, 2 gündür farkında değiliz"** — API contract değişiklikleri sessiz
5. **"AI yazdı, kimse review etmedi"** — AI-generated code'un review'dan kaçması

### Davranışsal Sinyaller

- PR review süreci var ama formal değil
- CI/CD pipeline'ları var
- En az haftada 10 PR merge ediliyor
- Production incident'ı yaşamış (son 6 ay)
- Developer productivity tool'larına bütçe ayırıyor

### Nerede Bulunur?

- GitHub Marketplace'te "code review" araması yapar
- Reddit r/programming, r/github, r/devops
- Hacker News
- dev.to, Medium engineering blog'ları
- Stack Overflow / Stack Exchange
- Tech Twitter/X
- Developer Slack/Discord toplulukları

---

## SECONDARY ICP: OPEN SOURCE MAINTAINER

| Kriter | Değer |
|--------|-------|
| **Rol** | Open source maintainer |
| **Repo** | GitHub'da 100+ star, aktif PR'lar |
| **İhtiyaç** | Ücretsiz, kaliteli PR review |
| **Değer** | Büyüme motoru — kullanan developer'lar şirketlerine önerir |

---

## SECONDARY ICP: STARTUP CTO

| Kriter | Değer |
|--------|-------|
| **Rol** | Solo CTO veya 2-5 kişilik ekip |
| **Aşama** | Seed / Series A |
| **İhtiyaç** | Hızlı, ucuz, kurulum gerektirmeyen çözüm |
| **Ağrı Noktası** | "Review yapacak kimsemiz yok, AI olsun" |

---

## SECONDARY ICP: FINTECH / HEALTHCARE

| Kriter | Değer |
|--------|-------|
| **Rol** | Engineering Manager, Security Lead |
| **İhtiyaç** | Production güvenliği, audit trail, compliance |
| **Değer** | Enterprise plan için ideal (SSO, audit logs) |
| **Ağrı Noktası** | "Her production hatası regülasyon sorunu demek" |

---

## KİMLER HEDEF KİTLE DEĞİL?

- **Enterprise (500+ dev):** İlk aşamada değil — custom çözüm isterler, uzun satış döngüsü
- **Non-technical ekipler:** Kod review yapmazlar
- **Git kullanmayan ekipler:** Ürün GitHub Action
- **Sadece mobile development:** İlk aşamada diller arasında yok (sonra eklenir)

---

## PAZARLAMA MESAJLARI (ICP'ye Özel)

### CTO / Engineering Manager için
> "Every PR is a potential production incident. PR Guardian gives you a risk score before you merge — so you can deploy on Friday and sleep at night."

### Senior Developer için
> "Stop reviewing boilerplate. Let AI catch the dangerous stuff while you focus on architecture."

### Startup CTO için
> "$29/month. One prevented outage pays for 10 years."

### Open Source Maintainer için
> "Free for open source. Protect your project from breaking changes and security issues."
