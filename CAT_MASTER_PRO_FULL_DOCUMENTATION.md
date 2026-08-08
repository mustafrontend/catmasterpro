# 🐱 CatMaster PRO — A'dan Z'ye Tam Proje Mimari & Geliştirme Dokümantasyonu

> **Proje Adı:** CatMaster PRO (Kinetic 3D Full-Stack Cat Training, Health & Behavior SuperApp)  
> **Konum:** `C:\Users\mustafaozturk\Desktop\app\cat`  
> **Tarih:** 2026-08-08  
> **Geliştirici & Mimar:** Senior Full-Stack Architect (Antigravity Antigravity Engine)  
> **Felsefe & Tasarım kuralı:** `<RULE[user_global]>` (`fullstack-kinetic-architect-v2`)

---

## 📌 1. Proje Genel Bakış & Felsefe

CatMaster PRO; kedi sahiplerinin kedilerini bilimsel pozitif pekiştirme ve clicker metoduyla eğitmesini, agresyon/davranış sorunlarını çözmesini, sağlık takvimini (aşı, kilo, veteriner randevusu) yönetmesini ve yapay zeka ile kedi ruh halini analiz etmesini sağlayan ultra lüks, mobil odaklı bir SuperApp'tir.

### 🎨 **Tasarım & İnteraksiyon Felsefesi (Kinetic Lithography)**:
- **Light Mode First**: `bg-slate-50` uygulama arka planı vs. `bg-white` kart yüzeyleri.
- **Ultra İnce Kenarlıklar**: Ağır gölgeler yerine `border-[0.5px] border-slate-200/80` ile minimalist editoryal görünüm.
- **Mikro Etkileşimler**: Framer Motion tabanlı yumuşak yaylanma (`type: 'spring'`), `active:scale-[0.98]` tıklama fizikleri.
- **3D Kinetic Derinlik**: Hero alanında 3B perspektif eğilme, dikey nefes alma animasyonu ve dinamik aura ışıması.
- **%100 Dinamik 12 Dil**: Sayfa yenilemeye gerek kalmadan anında dil değişimi ve Arapça (`ar`) için tam RTL (Right-to-Left) düzen desteği.

---

## 🚀 2. A'dan Z'ye Tamamlanan Özellikler ve Mimari Yapı

### 1️⃣ **İlk Giriş Onboarding & Dil Seçim Turu (`OnboardingWalkthroughModal.tsx`)**
- Uygulama cihaza ilk kez indirildiğinde/açıldığında otomatik tetiklenir (`localStorage.getItem('catmaster_onboarding_completed')`).
- **Adım 0 (Dil Seçim Ekranı)**: Kullanıcıyı bayraklı 12 dil seçeneği karşılar (TR, EN, ES, DE, FR, IT, PT, RU, JA, KO, ZH, AR). Dil seçildiği an tüm uygulama dili güncellenir.
- **Adım 1-4 (Özellik Turu)**: Pozitif pekiştirme, davranış rehberleri, sağlık karnesi ve AI modülleri tanıtan kinetik slaytlar.
- Tur tamamlandığında kaydedilir ve kullanıcı uygulamayı tekrar açtığında **bir daha asla gösterilmez**.

### 2️⃣ **3D Kinetic Hero Kartı (`HomePageView.tsx`)**
- 3B boyutlu derinliği olan interaktif kedi görseli.
- **Rozetler**:
  - `Pozitif Pekiştirme` (Animasyonlu Sparkles)
  - `Uzman Veterinerler Tarafından Hazırlanmıştır 🩺` (Yeşil Güven Rozeti)
  - `Canlı Seans Hazır` (Yeşil Yanıp Sönen Darbe Halesi)
- **3 Dk Hızlı İstatistikler**: İdeal Seans (3 Dakika), Ödül Odaklı (%94 Başarı), Adım Adım (8 Ders).

### 3️⃣ **Eğitim Merkezi & 30 PRO Ders (`TrainingCenterView.tsx` & `lessonsData.ts`)**
- 8 Adım Adım Ücretsiz & 30 PRO Ders (İsmine Gelme, Target Stick, Otur, Beşlik Çak, Taşıma Çantası Alıştırma, Tasma Alıştırma, Tırmalama Tahtası, Kum Kabı Eğitimi vb.).
- `getLocalizedLesson(lesson, lang)` motoru sayesinde 30 dersin tüm başlıkları, özetleri, adımları, talimatları ve hataları 12 dilde anında yerelleşir.
- Ders içi adım adım ilerleme barı ve step oynatıcısı (`LessonDetailView.tsx`).

### 4️⃣ **Agresyon & Davranış Kütüphanesi (`BehaviorLibraryView.tsx` & `behaviorData.ts`)**
- Isırma, tırmalama, gece koşturması, kum kabı reddi, tezgahtan inme gibi zorlu agresyon problemleri için veteriner onaylı rehberler.
- "Yapılması Gerekenler", "Yapılmaması Gerekenler" ve "Veteriner Uyarısı" bento kartları.

### 5️⃣ **3 Dakikalık İnteraktif Seans Zamanlayıcı (`SessionTimerView.tsx`)**
- 3 dakikalık geri sayım halkası.
- Dahili ses efektleri (Clicker sesi, mama ödülü sesi).
- Ödül maması sayacı (`+ / -`), seans sonu reytingi (1-5 yıldız) ve seans özeti kaydı.

### 6️⃣ **Sağlık Karnesi, Aşı & Kilo Takip Grafiği (`HealthHubView.tsx`)**
- Kedinizin kilo değişimini gösteren bento görsel çubuk grafiği.
- Aşı günleri ve son tarih takibi (`+ Aşı Ekle`).
- Veteriner randevu ajandası (`+ Randevu Ekle`).

### 7️⃣ **Akıllı Mobil Bildirim Motoru (`NotificationService.ts`)**
- `@capacitor/local-notifications` entegrasyonu.
- Günde 3 defa otomatik yerel bildirim (Saat 10:00, 15:00 ve 20:00).
- *"Kediniz seansa hazır mı? 🐾"* uyarısı.

### 8️⃣ **AI Miyavlama & Mood Analizörü + Sakinleştirici Sesler (`CatMoodAnalyzerView.tsx` & `CatRelaxingPlayerView.tsx`)**
- Yapay zeka ile miyavlama ve kedi ruh hali tespiti.
- Anti-stres, kedileri rahatlatıcı ve uyutucu özel ses frekansları oynatıcısı.

### 9️⃣ **RevenueCat Paywall & Abonelik Motoru (`PaywallModal.tsx` & `revenueCatService.ts`)**
- **Üretim API Anahtarı**: `appl_JYVlJKQALPEgHINrBpUgYismGUU`
- Pakete özel fiyatlandırma: Yıllık $19.99 (%70 İndirim + 3 Gün Ücretsiz Deneme) veya $39.99 ömür boyu erişim.
- Apple StoreKit entegrasyonu & Satın Alımları Geri Yükle (*Restore Purchases*) butonu.

🔟 **NecoAI VPS Backend & SMTP Gmail Bildirim Entegrasyonu (`CatApiService.ts` & `app.py`)**
- NecoAI VPS sunucusuna (`94.73.180.193`) bağlı Flask Python backend (`C:\Users\mustafaozturk\Desktop\Projects\necoai\backend-py\app.py`).
- **Giriş Bildirimi API**: `/api/cat/notify_login` -> Uygulamaya her giriş yapıldığında Gmail SMTP (`57mustafass57@gmail.com`) üzerinden `mustafaozturk35@gmail.com` adresine anında mail atar.
- **Satın Alma Bildirimi API**: `/api/cat/notify_purchase` -> Her RevenueCat satın almasında anında admin e-postası düşer.

---

## 🛠️ 3. Dosya ve Klasör Mimarisi

```
c:\Users\mustafaozturk\Desktop\app\cat\
├── assets/                           # Statik 3D görseller ve MP4 video materyalleri
├── ios/                              # Capacitor iOS Xcode Proje Dizini (AppStore / TestFlight)
├── public/                           # Web varlıkları
├── src/
│   ├── components/                   # Atomic Design Bileşenleri
│   │   ├── atoms/                    # Button, Badge, Skeleton, Modal base
│   │   ├── molecules/                # Form bileşenleri, kart öğeleri
│   │   └── organisms/                # Header, QuickActionsSheet, OnboardingWalkthroughModal
│   ├── features/                     # Özellik Modülleri
│   │   ├── ai/                       # CatMoodAnalyzerView.tsx (AI Miyavlama Analizörü)
│   │   ├── behavior/                 # BehaviorLibraryView.tsx & behaviorData.ts
│   │   ├── calming/                  # CatRelaxingPlayerView.tsx (Kedi TV & Müzik)
│   │   ├── cat/                      # AddCatModal.tsx, CatProfileManager.tsx, CatSelectorHeader.tsx
│   │   ├── health/                   # HealthHubView.tsx (Kilo, Aşı, Randevu)
│   │   ├── home/                     # HomePageView.tsx (3D Hero Kartı, Hızlı Erişim)
│   │   ├── paywall/                  # PaywallModal.tsx (RevenueCat Abonelik)
│   │   ├── timer/                    # SessionTimerView.tsx (3 Dk Eğitim Oynatıcısı)
│   │   └── training/                 # TrainingCenterView.tsx, LessonDetailView.tsx, lessonsData.ts
│   ├── i18n/                         # 12 Dil i18next Çeviri Sistem Dizini
│   │   ├── locales/                  # tr, en, es, de, fr, it, pt, ru, ja, ko, zh, ar .json dosyaları
│   │   └── index.ts                  # Dil yükleyici ve RTL kontrolörü
│   ├── services/                     # Servis Katmanı
│   │   ├── catApiService.ts          # VPS Backend HTTP İstekleri (notify_login, notify_purchase)
│   │   ├── notificationService.ts    # Capacitor Local Notifications (Günde 3x)
│   │   ├── revenueCatService.ts      # RevenueCat Purchases SDK Katmanı
│   │   ├── soundService.ts           # Dahili Web Audio & Efekt Sesleri
│   │   └── storageService.ts         # LocalStorage Kalıcılık Yönetimi
│   ├── store/                        # Zustand Global State
│   │   └── catStore.ts               # Kedi profilleri, aktif kedi, seanslar, dil ve premium durumu
│   ├── types/                        # Strict TypeScript Arayüzleri
│   │   └── cat.ts                    # Cat, Lesson, Health, Language tipleri
│   ├── App.tsx                       # Uygulama Kök Bileşeni & Sayfa Yönlendirici
│   ├── index.css                     # Tailwind CSS & Kinetic Stiller
│   └── main.tsx                      # Uygulama Başlangıç Noktası
├── capacitor.config.json             # Capacitor Uygulama Yapılandırması (com.catmaster.pro)
├── package.json                      # Bağımlılıklar ve Komutlar
├── tsconfig.json                     # Strict TypeScript Ayarları
└── vite.config.ts                    # Vite Yapılandırması
```

---

## 📦 4. Bağımlılıklar ve `package.json` Yapısı

Projede kullanılan temel kütüphaneler:

```json
{
  "name": "cat-care-app",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@capacitor/core": "^7.0.0",
    "@capacitor/ios": "^7.0.0",
    "@capacitor/local-notifications": "^7.0.7",
    "@revenuecat/purchases-capacitor": "^13.3.0",
    "clsx": "^2.1.1",
    "framer-motion": "^11.18.2",
    "i18next": "^24.2.2",
    "lucide-react": "^0.475.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-i18next": "^15.4.0",
    "tailwind-merge": "^3.0.1",
    "zustand": "^5.0.3"
  },
  "devDependencies": {
    "@types/node": "^22.13.1",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.5.1",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3",
    "vite": "^5.4.14"
  }
}
```

---

## ☁️ 5. Codemagic CI/CD & App Store Derleme Süreçleri (`codeweb.io` / Codemagic)

Proje iOS cihazlarda çalıştırılmak ve Apple App Store'a gönderilmek üzere hazırlanmıştır.

### **Codemagic Derleme Adımları**:
1. **Repository**: `https://github.com/mustafrontend/catmasterpro.git` (Ana dal: `main`)
2. **Derleme Komutları**:
   ```bash
   # 1. Bağımlılıkları yükle
   npm install

   # 2. Vite üretim paketini derle
   npm run build

   # 3. Capacitor iOS senkronizasyonu
   npx cap sync ios
   ```
3. **App Store İzinleri & Certs**:
   - `Info.plist` içinde gerekli kamera, ses ve bildirim izinleri tanımlanmıştır.
   - RevenueCat iOS Public Key: `appl_JYVlJKQALPEgHINrBpUgYismGUU`
   - Paket Kimliği (`Bundle Identifier`): `com.catmaster.pro`

---

## 🎨 6. Kalite Kontrol & Doğrulama

- ✅ **TypeScript Tür Güvenliği**: `npx tsc --noEmit` komutu sıfır (0) hata ile geçmektedir.
- ✅ **VPS Sağlık Kontrolü**: NecoAI sunucusu HTTP 200/401 ile aktif çalışmakta ve SMTP bildirimi yapmaktadır.
- ✅ **12 Dil Yerelleştirme**: Tüm metinler i18n motoruna bağlı olup, dinamik geçiş sağlamaktadır.
- ✅ **Kinetic UI**: Tüm modal ve kartlar Framer Motion ile responsive ve akıcı şekilde çalışmaktadır.

---

## 🤖 7. AI & Otomasyon Program Komutu (Full Context Generator Prompt)

> **Kullanım Amacı:** Bu komut bloğu, herhangi bir yapay zeka modeline (ChatGPT, Claude, Gemini, Antigravity) verildiğinde uygulamanın tüm teknik mimarisini, kod yapısını, 12 dilde mağaza metinlerini ve derleme talimatlarını eksiksiz olarak tek seferde ürettirmek/özetletmek için tasarlanmıştır.

```text
[PROGRAM INSTRUCTION PROMPT FOR CATMASTER PRO]
You are a Senior Full-Stack Architect & Mobile Product Engineer acting on the CatMaster PRO codebase.

CONTEXT & ARCHITECTURE OVERVIEW:
- Repository: https://github.com/mustafrontend/catmasterpro.git (main branch)
- Project Path: C:\Users\mustafaozturk\Desktop\app\cat
- Tech Stack: React 18, Strict TypeScript, Tailwind CSS, Framer Motion, Zustand, i18next (12 Languages + RTL), Capacitor 7 iOS, Python Flask VPS Backend, RevenueCat SDK.
- Design System Rule: fullstack-kinetic-architect-v2 (Light Mode First, bg-slate-50 app background, bg-white cards, border-[0.5px] border-slate-200/80, 3D Hero depth, spring micro-interactions).

CORE FEATURES & SUBSYSTEMS:
1. First-Launch Onboarding: Step 0 Language Selector (12 flags) + 4-Step Feature Walkthrough (localStorage persistence).
2. 3D Kinetic Hero Card: 3D perspective tilt, vertical breathing, ambient aura ring, "Prepared by Expert Vets 🩺" badge.
3. Training Center: 8 Free & 30 PRO Lessons dynamically localized into 12 languages via getLocalizedLesson engine.
4. Behavior & Aggression Library: Vet-approved guides for biting, scratching, litter avoidance, furniture scratching.
5. 3-Minute Interactive Timer: Clicker audio cues, treat counter (+/-), daily streak logging.
6. Vet Passport & Health Hub: Weight log bento bar chart, vaccine schedule, vet appointment agenda, printable PDF exporter.
7. Local Notification Engine: 3x daily automated reminders (10:00, 15:00, 20:00) via @capacitor/local-notifications.
8. Cat TV & Calming Audio: 10 sleep frequencies (432Hz) + 10 kitten call sounds.
9. RevenueCat Paywall: $19.99/yr (70% OFF + 3-day trial) or $39.99 lifetime (Key: appl_JYVlJKQALPEgHINrBpUgYismGUU).
10. VPS Backend & SMTP Mailer: Python Flask at 94.73.180.193 sending instant Gmail alerts for login and purchases.

REQUIRED ACTIONS WHEN EXECUTING THIS PROMPT:
- Verify 100% i18n key coverage across all 12 locales.
- Run strict TypeScript check (`npx tsc --noEmit`).
- Execute production build & Capacitor iOS sync (`npm run build && npx cap sync ios`).
- Deploy Next.js Privacy Policy page on Vercel at https://www.sosyalvideoolustur.com.tr/privacy.
- Generate complete 12-language App Store listing texts without AI policy flags.
```

---

## 🌐 8. Web Privacy Policy & App Store Privacy Declarations

### 1️⃣ **Canlı Next.js Gizlilik Politikası Rotaları (Web & Vercel)**:
- **Canlı Web URL:** `https://www.sosyalvideoolustur.com.tr/privacy`
- **Dosya Konumu:** `C:\Users\mustafaozturk\Desktop\Projects\necoai\frontend\src\app\privacy\page.tsx`
- **Barındırma:** Vercel (Next.js App Router UI)
- **Özellikler:** 12 dilde dinamik sekme seçici, Apple StoreKit ve RevenueCat veri politikası açıklamaları, kişisel veri silme ve GDPR hakları.

### 2️⃣ **App Store Connect — App Privacy (Veri Beyanı) Yapılandırması**:
- **Do you collect data?** -> `Yes, we collect data from this app`
- **Seçilen Veri Tipleri**:
  - `Purchases` -> `Purchase History` (Amaç: `App Functionality` | Kimlikle Eşleşme: `No` | Takip: `No`)
  - `Identifiers` -> `User ID` (Amaç: `App Functionality` | Kimlikle Eşleşme: `No` | Takip: `No`)
- **App Store ASO Anahtar Kelimeler (100 Karakter Sınırı - Kopyalamaya Hazır)**:
  `kedi eğitimi,kedi sesi,kedi oyunu,miyav,veteriner,yavru kedi,kedi miyavlaması,kum kabı,kedi bakımı`
- **Çözülen Hata**: App Store Connect üzerindeki tüm dillerin (Fransızca, Almanca, İtalyanca vb.) Privacy Policy URL alanına `https://www.sosyalvideoolustur.com.tr/privacy` eklenerek kırmızı onay engeli kaldırılmıştır.

---

> *CatMaster PRO — Mühendislik ve Tasarım Mükemmelliği.* 🚀
