# Kedi Eğitim Uygulaması — Proje Dokümanı

> Sürüm: 0.1 (MVP planı)
> Ödeme altyapısı: RevenueCat
> Not: Bu aşamada uygulama içinde runtime AI kullanılmıyor. Aşağıdaki görsel/video promptları
> yalnızca uygulamaya konacak içerikleri (illüstrasyon, adım görselleri, kısa eğitim videoları)
> önceden üretmek içindir.

---

## 1. Amaç ve Kapsam

Kedi sahiplerinin kedilerini bilimsel/pozitif pekiştirmeye dayalı yöntemlerle eğitmesine yardımcı olan,
davranış sorunlarını (özellikle agresiflik) yönetmeyi öğreten bir mobil uygulama.

Kedi eğitimi köpekten farklıdır: kısa seanslar (3–5 dk), ceza yok, clicker/target training,
yüksek değerli ödül. Uygulamanın tüm içeriği bu ilkeler üzerine kuruludur.

### MVP (İlk sürüm)
- Eğitim programları (adım adım dersler)
- İlerleme takibi (kedi başına beceri durumu)
- Seans zamanlayıcısı (kısa seans mantığı)
- Davranış sorunları kütüphanesi (agresiflik dahil)
- Çoklu kedi profili
- RevenueCat ile premium abonelik (paywall)

### Sonraki sürümler (şimdilik kapsam dışı)
- Fotoğraftan vücut dili / ruh hali okuma
- Sohbet tarzı davranış danışmanı
- Kişiselleştirilmiş program önerisi

---

## 2. Özellik Detayları

### 2.1 Eğitim Programları
Her ders statik veri (JSON/DB). AI gerekmez.
Öğretilebilir davranışlar:
- İsmine gelme (recall)
- Target çubuğuna / ele dokunma
- Oturma
- Patisini verme ("beşlik")
- Taşıma kutusuna gönüllü girme
- Tasma/kayış alıştırması
- Tırmalama tahtasını kullanma
- Tuvalet eğitimi / kum kabı sorunları

Her ders alanları:
- `id`, `title`, `category`, `difficulty` (kolay/orta/zor)
- `goal` (hedef)
- `materials` (gerekli malzeme)
- `steps[]` (adım adım, her adımda kısa açıklama + görsel/video referansı)
- `commonMistakes[]`
- `estimatedMinutes`
- `isPremium` (bool)

### 2.2 Davranış Sorunları Kütüphanesi (Agresiflik dahil)
Konular:
- Oyun kaynaklı ısırma/tırmalama
- Korku kaynaklı saldırganlık
- Bölge/kaynak koruma agresifliği
- Yönlendirilmiş (redirected) agresiflik
- Diğer kedilere saldırganlık
- Mobilya tırmalama
- Tuvalet dışına yapma
- Gece hiperaktivitesi

Her konu: nedenler, ne yapmalı, ne yapmamalı, ne zaman veterinere/uzmana gitmeli.

### 2.3 İlerleme Takibi
- Beceri durumu: `learning` / `reinforcing` / `mastered`
- Seans geçmişi (tarih, süre, kullanılan ödül sayısı)
- Streak (üst üste çalışılan gün sayısı)

### 2.4 Seans Zamanlayıcısı
- 3–5 dk arası hedef süre
- "Seansı bitir ve kaydet" akışı
- Günlük ödül sayacı (aşırı beslemeyi önlemek için)

### 2.5 Hatırlatıcılar
- Eğitim seansı, mama, ilaç, aşı, veteriner
- Native bildirim API'si

### 2.6 Çoklu Kedi Profili
- Foto, isim, yaş, cins, ilerleme
- Kedi başına ayrı takip

---

## 3. Önerilen Teknik Yapı

> Platformu netleştirdiğinde bu bölüm güncellenecek. Aşağıdakiler öneri.

- İstemci: React Native / Flutter (RevenueCat her ikisini de destekler)
- Yerel veri: SQLite / MMKV / AsyncStorage
- İçerik: JSON paketleri (offline çalışabilir)
- Bildirim: native local notifications
- Ödeme/abonelik: **RevenueCat**
- (Opsiyonel) Bulut senkron: sonraya bırakılabilir

### Örnek veri modeli (kavramsal)
```
Cat { id, name, birthDate, breed, photoUri }
Skill { id, catId, lessonId, status, updatedAt }
Session { id, catId, lessonId, durationSec, treatsUsed, date }
Lesson { id, title, category, difficulty, goal, materials[], steps[], commonMistakes[], estimatedMinutes, isPremium }
BehaviorArticle { id, title, category, causes[], dos[], donts[], vetWarning, isPremium }
```

---

## 4. RevenueCat Entegrasyonu

### 4.1 Kavramlar
- **Entitlement**: Kullanıcının erişim hakkı. Örn: `premium`.
- **Offering**: Paywall'da gösterilecek paket seti (aylık/yıllık).
- **Package**: Tek bir satın alma seçeneği (ör. `$rc_monthly`, `$rc_annual`).
- **Product**: App Store / Google Play tarafında tanımlı gerçek ürün.

### 4.2 Kurulum Adımları
1. RevenueCat hesabı aç, proje oluştur.
2. App Store Connect ve Google Play Console'da abonelik ürünlerini tanımla
   (ör. `cat_premium_monthly`, `cat_premium_annual`).
3. RevenueCat panelinde:
   - Entitlement oluştur: `premium`
   - Offering oluştur: `default` → içine monthly + annual paketleri
   - Ürünleri entitlement'a bağla
4. iOS ve Android için RevenueCat API key'lerini al.
5. SDK'yı entegre et ve uygulama açılışında configure et.

### 4.3 Örnek Akış (kavramsal, React Native)
```js
// Uygulama açılışında
await Purchases.configure({ apiKey: RC_API_KEY });

// Paywall'da paketleri çek
const offerings = await Purchases.getOfferings();
const packages = offerings.current?.availablePackages ?? [];

// Satın alma
const { customerInfo } = await Purchases.purchasePackage(pkg);
const isPremium = customerInfo.entitlements.active['premium'] != null;

// Erişim kontrolü (her premium içerikte)
const info = await Purchases.getCustomerInfo();
const hasPremium = info.entitlements.active['premium'] != null;
```

### 4.4 Ücretsiz / Premium Ayrımı (öneri)
Ücretsiz:
- Temel dersler (oturma, target, recall giriş)
- 1 kedi profili
- Seans zamanlayıcısı

Premium:
- Tüm eğitim programları
- Agresiflik ve ileri davranış kütüphanesi (video dahil)
- Çoklu kedi profili
- İlerleme geçmişi / streak analizi
- Reklamsız (varsa)

### 4.5 Fiyatlandırma ve Para Kazanma Stratejisi

**Model:** Freemium + ücretsiz deneme. Uygulama ücretsiz indirilir, asıl değer
(agresiflik kütüphanesi, tüm programlar, çoklu kedi, video içerik) premium'da kalır.
Kullanıcı değeri görür → paywall'a çarpar → yıllık plana yönlendirilir.

**Önerilen fiyatlar (global, USD):**

| Plan | Fiyat | Rol |
|------|-------|-----|
| Aylık | $9.99 | Pahalı seçenek; yıllığı ucuz gösterir (çapa) |
| Yıllık | $49.99 | VARSAYILAN / "en popüler" — ayda ~$4.16, %58 tasarruf |
| Ömür boyu (opsiyonel) | $99.99 | Üst uç çapa; aboneliği makul gösterir |

- Yıllık plana **3 günlük ücretsiz deneme** koy. En yüksek gelir buradan gelir.
- RevenueCat ürün ID önerisi: `cat_premium_monthly`, `cat_premium_annual`,
  `cat_premium_lifetime` (lifetime non-consumable).

**Neden bu yapı:** Asıl para yıllıktan gelir. Aylık plan sadece yıllığı ucuz
göstermek için var (fiyat çapalama). Paywall'da üç seçenek yan yana, yıllık
önceden seçili ve "en popüler" etiketli sunulur.

**Türkiye / bölgesel fiyat:** Global satılacaksa RevenueCat + App Store fiyat
kademeleri kullanılır. TR'nin alım gücü düşük olduğundan RevenueCat panelinden
Türkiye'ye ayrı (daha düşük) bir kademe atanabilir — TR pazarında dönüşümü
artırır. Fiyatlar koda gömülmez, hep RevenueCat'ten çekilir.

**Dönüşüm taktikleri:**
- Paywall'ı değer gösterildikten sonra aç (ilk ders bitince veya agresiflik
  makalesine girmeye çalışınca).
- Yıllığı varsayılan seç; "ayda X$" diye böl, yıllık toplamı öne çıkarma.
- Deneme bitmeden hatırlatma bildirimi gönder.
- "Restore Purchases" butonu ekle (mağaza zorunlu).

### 4.6 Dikkat Edilecekler
- Erişim kontrolünü her zaman `entitlements.active` üzerinden yap, ürün ID'sine göre değil.
- `restorePurchases` butonu ekle (App Store zorunlu tutar).
- Fiyatları RevenueCat'ten çek, koda gömme.
- Deneme + otomatik yenileme kurallarını mağaza politikasına uygun ve şeffaf yaz
  (yenileme tarihi, iptal yolu). Aksi halde mağaza reddi gelir.

---

## 5. Ekranlar (Öneri)
1. Onboarding (kedi ekle)
2. Ana ekran (bugünkü seans önerisi, streak)
3. Eğitim programları listesi
4. Ders detayı (adımlar + görsel/video)
5. Seans ekranı (timer + ödül sayacı)
6. Davranış kütüphanesi
7. Kedi profili / ilerleme
8. Paywall (RevenueCat offering)
9. Ayarlar / hatırlatıcılar

---

## 6. İçerik Üretim Promptları

> Bu promptlar uygulamaya konacak GÖRSEL ve VİDEO içeriklerini üretmek içindir.
> Görsel için: Midjourney / DALL·E / Ideogram / Stable Diffusion
> Video için: Runway / Sora / Veo / Pika / Kling
> Not: Tutarlı bir görsel stil için tüm promptların sonuna aynı "stil eki"ni ekle.

### Ortak Stil Eki (tüm görsellere ekle)
```
consistent flat illustration style, soft rounded shapes, warm friendly color
palette, clean minimal background, educational app illustration, high clarity,
no text, no watermark, centered composition
```

### Ortak Stil Eki (fotogerçekçi istersen)
```
photorealistic, natural soft lighting, shallow depth of field, calm domestic
setting, high detail fur, no text, no watermark
```

---

### 6.1 Vücut Dili / Ruh Hali Görselleri

**Sakin / rahat kedi**
```
A relaxed domestic cat lying down with a soft loose body, half-closed eyes,
tail resting calmly, ears facing forward, gentle expression, illustrating a
content and comfortable mood, {stil eki}
```

**Korkmuş / gergin kedi**
```
A frightened cat crouched low to the ground, ears flattened sideways, dilated
pupils, tail tucked, body tense, illustrating fear body language, {stil eki}
```

**Agresif / savunmacı kedi**
```
A defensive cat in an arched posture, fur raised along the back, ears turned
back, mouth slightly open, tail puffed, illustrating aggressive warning body
language, {stil eki}
```

**Oyun moduna geçmiş kedi**
```
A playful cat in a crouched pounce-ready stance, wide alert eyes, whiskers
forward, tail twitching, illustrating hunting-play body language, {stil eki}
```

**Rahatsız / uyarı veren kedi (kuyruk sallama)**
```
A slightly irritated cat sitting upright with a swishing tail, ears turning
sideways, tense whiskers, illustrating early warning signs before aggression,
{stil eki}
```

---

### 6.2 Agresiflik Eğitimi / Yönetimi Görselleri

**Oyun kaynaklı ısırmayı yönlendirme**
```
A person redirecting a cat's biting behavior toward a wand toy instead of a
hand, cat focused on the toy, calm home setting, illustrating proper redirection
technique, {stil eki}
```

**El yerine oyuncakla oynamak (doğru davranış)**
```
A hand holding a feather wand toy while a cat swats at it, showing that hands
should never be used as toys, educational contrast illustration, {stil eki}
```

**Kediye alan tanıma (yaklaşma yok)**
```
A calm person sitting still and not reaching toward a wary cat, giving the cat
space and choice to approach, illustrating respectful distance to reduce fear
aggression, {stil eki}
```

**İki kedi arasında kademeli tanıştırma**
```
Two cats on opposite sides of a slightly open door sniffing calmly, illustrating
gradual scent-based introduction to reduce inter-cat aggression, {stil eki}
```

**Yönlendirilmiş agresiflikte ayırma**
```
A person gently separating an overstimulated cat into a quiet room, calm neutral
mood, illustrating a cool-down time-out, no punishment, {stil eki}
```

---

### 6.3 Temel Eğitim Adım Görselleri

**Target training — çubuğa dokunma**
```
A cat touching its nose to the tip of a small target stick held by a hand,
clicker visible, treat ready, illustrating target training step, {stil eki}
```

**İsmine gelme (recall)**
```
A cat walking toward a crouching person who is holding out a treat and saying
the cat's name, illustrating recall training, {stil eki}
```

**Oturma komutu**
```
A cat sitting on its hind legs while a hand moves a treat slightly upward and
back over its head, illustrating the sit lure technique, {stil eki}
```

**Taşıma kutusu alıştırması**
```
A cat calmly walking into an open pet carrier that has a soft blanket and a
treat inside, illustrating stress-free carrier training, {stil eki}
```

**Clicker + ödül zamanlaması**
```
A close-up of a hand pressing a clicker at the exact moment a cat performs a
behavior, followed by a treat, illustrating reward timing, {stil eki}
```

---

### 6.4 Kısa Eğitim Videosu Promptları (5–10 sn)

> Video promptlarında kamera hareketi + tek net aksiyon tut. Fazla eleman koyma.

**Target training demo**
```
Close-up shot: a cat gently touches its nose to a target stick, a soft click
sound cue, then receives a small treat. Slow calm motion, steady camera, warm
indoor lighting, 6 seconds.
```

**Recall demo**
```
Wide shot: a cat walks across a living room toward a person crouching with an
open hand and a treat. Smooth tracking camera, cheerful calm tone, 8 seconds.
```

**Oyun agresifliğini yönlendirme demo**
```
Medium shot: a cat lunges at a wand toy being moved away by a hand, showing
energetic play redirected onto the toy and never the hand. Dynamic but gentle
motion, 6 seconds.
```

**Sakinleştirme / cool-down demo**
```
Slow shot: an overstimulated cat is calmly guided into a quiet room, the door
softly closing, dim warm lighting conveying a peaceful time-out. Slow steady
camera, 7 seconds.
```

**Carrier training demo**
```
Static shot: a hesitant cat slowly steps into an open carrier with a treat
inside, then settles down. Calm patient pacing, soft lighting, 8 seconds.
```

---

### 6.5 Prompt Kullanım İpuçları
- Tutarlılık için aynı stil ekini her promptta kullan; kedinin cinsini sabitlemek
  istersen ekle (ör. "short-haired grey tabby cat").
- Görsellerde **metin isteme** — uygulama içi metni sen koyacaksın.
- Video üreticilerinde uzun/çok aksiyonlu sahneler bozulur; tek aksiyon + kısa süre.
- Agresiflik görsellerinde "kan, yara, şiddet" gibi ifadelerden kaçın; "warning
  posture / defensive posture" gibi davranışsal terimler kullan.

---

## 6.6 Uzun Vadeli Sürdürülebilirlik (Ömür Boyu Yaşayan Yapı)

> Abonelik uygulamalarında asıl risk fiyat değil, **"mezuniyet churn'ü"**:
> kullanıcı kedisini eğitir, işi biter, iptal eder. Uygulamayı ömür boyu
> sürdürülebilir kılmak = ödemeye devam etmek için sürekli sebep vermek.

### A) Churn'ü yönet — uygulamayı sürekli kullanılan araca çevir
Eğitim bitse bile her gün açılan özellikler ekle:
- Sağlık günlüğü (kilo, tuvalet alışkanlığı, iştah)
- Mama / ilaç / aşı / veteriner takibi ve hatırlatıcıları
- Kedi başına günlük not / gözlem kaydı
Hedef konum: "kedi eğitimi" değil, **"kedimin genel yönetim merkezi"**.

### B) Sürekli taze içerik (algılanan değeri tazeler, maliyeti düşük)
- Ayda birkaç yeni ders/makale yayınla.
- Mevsimsel/olaya özel içerik: bayram stresi, yeni yavru katılımı, taşınma,
  veteriner korkusu, yılbaşı gürültüsü.
- Yeni davranış senaryoları ekle. İçerik statik veri olduğu için ucuz.

### C) Düşük işletme maliyeti (sürdürülebilirlik = gelir − maliyet)
- İçeriği offline paketlerde tut → sunucu maliyeti ~sıfır.
- Backend'i minimumda tut; ağır AI/video streaming'i sonraya bırak.
- Amaç: az kullanıcıyla bile kâr et, büyümeye bağımlı olma.

### D) Lifetime planı uyarısı
Lifetime bugün nakit verir ama tekrarlayan gelir vermez; çok satarsa gelecekteki
gelirini bugüne satmış olursun. Öneri: lifetime'ı ya hiç koyma, ya da yüksek
fiyatla (ör. $129.99) ve sadece lansmana özel/sınırlı tut. Asıl motor **yıllık
abonelik** olmalı.

### E) Winback ve elde tutma döngüsü
- İptal edenlere otomatik geri kazanım: RevenueCat + mağaza indirimli teklif.
- Deneme bitmeden hatırlatma bildirimi.
- Streak + günlük bildirimlerle alışkanlık oluştur.
- İlke: Elde tutmak, yeni kullanıcı bulmaktan çok daha ucuzdur.

### F) Ölçüm (neyi izlersen onu iyileştirirsin)
- Trial → paid dönüşüm oranı
- Aylık/yıllık churn oranı
- LTV (kullanıcı yaşam boyu değeri) ve CAC (edinme maliyeti)
- D1 / D7 / D30 elde tutma
RevenueCat bu metrikleri panelde verir; kararları bunlara göre al.

---

## 7. Yol Haritası (Öneri)
1. Veri modeli + statik içerik (dersler, davranış makaleleri)
2. Temel ekranlar + navigasyon
3. Seans zamanlayıcısı + ilerleme takibi
4. RevenueCat entegrasyonu + paywall
5. Bildirimler
6. Görsel/video içeriklerin üretimi ve yerleştirilmesi
7. Test + mağaza yayını
8. Elde tutma katmanı: sağlık/mama/aşı takibi + hatırlatıcılar (churn'e karşı)
9. Sürekli içerik takvimi (aylık yeni ders/makale + mevsimsel içerik)
10. Winback akışları + metrik takibi (RevenueCat Experiments ile fiyat/paywall testi)
11. (Sonra) AI katmanı

---

## 8. Açık Sorular
- Offline mı, bulut senkronlu mu?
- (Netleşti) Platform: **Capacitor**, build/yayın: **Codemagic**
- (Netleşti) Push backend: **kendi VPS'imiz + Node.js + firebase-admin (FCM/APNs)**
- (Netleşti) Dil: **12 dil** (bkz. Bölüm 10)

---

## 9. Asset / Klasör Yapısı

> Tüm üretilecek görseller (iPad ekran görüntüleri, iPhone ekran görüntüleri,
> logo vb.) proje klasörüne **dosyalar halinde** eklenecek:
> `C:\Users\mustafaozturk\Desktop\app\cat`

Önerilen klasör düzeni:
```
cat/
├─ PROJE.md
├─ push-server.js
├─ assets/
│  ├─ logo/                # app ikonu, mağaza logosu (1024x1024 dahil)
│  ├─ screenshots/
│  │  ├─ iphone-6.7/       # iPhone Pro Max ekran görüntüleri (App Store zorunlu)
│  │  ├─ iphone-6.5/
│  │  ├─ ipad-12.9/        # iPad Pro ekran görüntüleri (App Store zorunlu)
│  │  └─ android/          # Play Store ekran görüntüleri
│  ├─ illustrations/       # ders/davranış illüstrasyonları
│  └─ videos/              # kısa eğitim videoları
└─ store-listing/          # mağaza metinleri (bkz. Bölüm 10)
```

App Store ekran görüntüsü zorunlulukları (özet):
- iPhone 6.7" (ör. 1290x2796) — zorunlu
- iPad 12.9" (ör. 2048x2732) — iPad destekliyorsan zorunlu
- App ikonu 1024x1024 (şeffaf/alpha OLMADAN)
- Her dil için ayrı ekran görüntüsü seti YÜKLENEBİLİR (opsiyonel ama dönüşümü artırır)

---

## 10. Çoklu Dil / Lokalizasyon (12 Dil)

Uygulama yayınlanırken **12 dilde** sunulacak. Hem uygulama içi metinler (i18n)
hem de App Store / Play Store mağaza açıklamaları bu 12 dilde hazırlanacak.

**Desteklenen 12 dil:**
1. İngilizce (en)
2. Türkçe (tr)
3. İspanyolca (es)
4. Almanca (de)
5. Fransızca (fr)
6. İtalyanca (it)
7. Portekizce - Brezilya (pt-BR)
8. Rusça (ru)
9. Japonca (ja)
10. Korece (ko)
11. Çince - Basitleştirilmiş (zh-Hans)
12. Arapça (ar) — *RTL (sağdan sola) desteği gerekir*

Teknik notlar:
- Uygulama içi metinler için i18n dosyaları (ör. `en.json`, `tr.json` ...).
- Arapça için arayüzde RTL yerleşim desteği eklenmeli.
- Tarih/sayı/ölçü biçimleri lokale göre biçimlendirilmeli.
- App Store Connect'te her dil ayrı "localization" olarak girilir
  (başlık, alt başlık, açıklama, anahtar kelimeler, ekran görüntüleri).

### 10.1 iOS Developer için Mağaza Açıklamaları
> **Bu 12 dildeki App Store açıklama metinleri (title, subtitle, description,
> keywords) BU DOSYADA / `store-listing/` klasöründe yazılacaktır.**
> iOS developer bu metinleri App Store Connect'e her dil için tek tek girecektir.

Her dil için hazırlanacak alanlar:
- App Title (30 karakter sınırı)
- Subtitle (30 karakter sınırı)
- Promotional Text (170 karakter)
- Description (4000 karakter)
- Keywords (100 karakter, virgülle ayrık)
- Ekran görüntüsü açıklamaları (opsiyonel)

> Not: 12 dilin tam açıklama metinleri bir sonraki adımda bu bölüme /
> `store-listing/` klasörüne eklenecektir.
