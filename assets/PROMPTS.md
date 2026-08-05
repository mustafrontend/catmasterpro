# AI Video & Görsel Üretim Prompt Rehberi (Asset Reference Guide)

> **Uygulama:** Kedi Eğitim & Davranış Uygulaması  
> **Kullanım Amacı:** Uygulama içi illüstrasyonlar, eğitim videoları, davranış rehberi ve App Store pazarlama görselleri için hazır AI prompt kütüphanesi.  
> **Desteklenen AI Araçları:**  
> - **Görsel:** Midjourney v6, DALL-E 3, Ideogram v2, Stable Diffusion 3 / XL  
> - **Video:** Runway Gen-3 Alpha, OpenAI Sora, Google Veo, Pika Labs, Kling AI  

---

## 1. Standart Stil Ekleri (Style Suffixes)

Tüm istemlerin (prompt) görsel bütünlüğü koruması için uygun stil ekini prompt sonuna ekleyiniz.

### 1.1 Düz İllüstrasyon Stili (Flat Illustration - Varsayılan Uygulama İçi Stil)
```text
consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

### 1.2 Fotogerçekçi Stil (Photorealistic Style)
```text
photorealistic, natural soft lighting, shallow depth of field, calm domestic setting, high detail fur, no text, no watermark
```

### 1.3 3D Cam Efekti / Cam Biçimcilik (3D Glassmorphism - İkon & Pazarlama)
```text
3D glassmorphism style, smooth translucent glass textures, vibrant ambient gradients, soft volumetric shadows, clean modern UI aesthetic, high resolution 3D render, no text, no watermark
```

---

## 2. Video Üretim Promptları (5–10 Saniye Kısa Eğitim Videoları)

> **Motorlar:** Runway Gen-3 / Sora / Veo / Pika / Kling  
> **İpucu:** Kısa süreli (5-8 sn), tek net kamera hareketi ve tek odak aksiyon kullanın. Görsel bozulmaları önlemek için sahneyi karmaşıklaştırmayın.

### 2.1 8 Temel Eğitim Dersi Videoları

#### 1. İsmine Gelme (Recall Training)
- **Süre:** 8 saniye | **Kamera:** Takip çekimi (Smooth tracking shot)
- **Prompt:**
```text
Wide tracking shot: A happy short-haired cat responds immediately when called, walking confidently across a bright living room towards a crouching owner holding a treat in an open palm. Smooth camera motion, warm cheerful indoor lighting, calm educational tone, 8 seconds.
```

#### 2. Target Çubuğuna Dokunma (Target Stick Training)
- **Süre:** 6 saniye | **Kamera:** Yakın çekim (Close-up shot)
- **Prompt:**
```text
Close-up shot: A calm domestic cat gently reaches forward and touches its nose to the target ball tip of a training stick held by a hand. A clicker is pressed followed immediately by handing a small treat reward. Paced and clear motion, soft warm lighting, 6 seconds.
```

#### 3. Oturma Komutu (Sit Command)
- **Süre:** 6 saniye | **Kamera:** Orta çekim (Medium shot)
- **Prompt:**
```text
Medium shot: A cat sitting gracefully on its hind legs as a hand gently moves a treat slightly upwards and over its head, smoothly guiding the cat into a sit posture. Calm atmosphere, high detail motion, 6 seconds.
```

#### 4. Patisini Verme / Beşlik (High Five)
- **Süre:** 6 saniye | **Kamera:** Yakın odak (Focused close-up)
- **Prompt:**
```text
Close-up shot: A playful cat gently lifts its front paw to touch an open human palm in a high-five gesture, receiving a treat immediately after. Soft focus background, friendly domestic environment, 6 seconds.
```

#### 5. Taşıma Kutusuna Gönüllü Girme (Carrier Training)
- **Süre:** 8 saniye | **Kamera:** Sabit geniş çekim (Static wide shot)
- **Prompt:**
```text
Static wide shot: A relaxed cat voluntarily walks into a soft cozy open pet carrier containing a soft blanket and treats, then turns around and curls up comfortably inside. Patient, stress-free video pace, 8 seconds.
```

#### 6. Tasma / Kayış Alıştırması (Harness Conditioning)
- **Süre:** 7 saniye | **Kamera:** Yan takip çekimi (Side profile tracking)
- **Prompt:**
```text
Side profile shot: A cat wearing a well-fitted soft harness walks comfortably and calmly across a sunlit room while taking treats from a human hand. Smooth natural motion, no distress, 7 seconds.
```

#### 7. Tırmalama Tahtası Kullanımı (Scratching Post Training)
- **Süre:** 6 saniye | **Kamera:** Orta boy çekim (Medium shot)
- **Prompt:**
```text
Medium shot: A playful cat stretching upwards and happily scratching a sturdy vertical sisal rope post next to its bed, ignoring furniture. Bright welcoming home setting, clean movement, 6 seconds.
```

#### 8. Tuvalet Eğitimi / Kum Kabı Kullanımı (Litter Box Routine)
- **Süre:** 7 saniye | **Kamera:** Sabit açı (Static medium shot)
- **Prompt:**
```text
Static medium shot: A clean domestic cat calmly stepping into a spacious, uncovered, low-entry litter box in a quiet sunlit corner of a room, digging softly. Gentle ambient lighting, educational focus, 7 seconds.
```

---

### 2.2 Agresiflik Yönetimi & Sakinleştirme Videoları

#### 1. Oyun Agresifliğini Yönlendirme (Redirecting Play Biting)
- **Süre:** 6 saniye | **Kamera:** Dinamik orta çekim (Dynamic medium)
- **Prompt:**
```text
Medium shot: A cat lunges with high play energy towards a feather wand toy being moved swiftly away across the floor, showing play aggression successfully redirected away from hands onto the toy. Smooth motion capture, 6 seconds.
```

#### 2. Korku / Savunma Agresifliğinde Alan Tanıma (Giving Space)
- **Süre:** 7 saniye | **Kamera:** Yavaş gerileme çekimi (Slow pull-back shot)
- **Prompt:**
```text
Slow pull-back shot: A person sitting completely still on the floor, keeping hands low and avoiding eye contact, giving a nervous cat space to approach voluntarily without feeling trapped. Peaceful calm lighting, 7 seconds.
```

#### 3. Aşırı Uyarılmada Mola / Sakinleşme (Cool-Down Time-Out)
- **Süre:** 7 saniye | **Kamera:** Yavaş ve huzurlu çekim (Slow peaceful tracking)
- **Prompt:**
```text
Slow tracking shot: An overstimulated cat is calmly guided into a quiet, softly lit room with a cozy bed and water bowl, the door gently closing to allow a peaceful cool-down period. Warm soothing tones, 7 seconds.
```

#### 4. İki Kedi Arasında Kademeli Koku Tanıştırması (Gradual Scent Introduction)
- **Süre:** 8 saniye | **Kamera:** İki tarafı gösteren orta çekim (Split space medium)
- **Prompt:**
```text
Medium shot: Two cats on opposite sides of a slightly open door or mesh gate, sniffing each other's scents calmly while eating high-value treats from bowls. Harmonious, gradual introduction, 8 seconds.
```

---

## 3. Görsel & İllüstrasyon Promptları (Midjourney / DALL-E 3 / Ideogram / SD)

---

### 3.1 Vücut Dili & Ruh Hali Görselleri (Body Language & Mood States)

#### 1. Sakin & Rahat Kedi (Relaxed Mood)
- **Prompt:**
```text
A relaxed domestic cat lying down with a soft loose body posture, half-closed contented eyes, tail resting calmly on the floor, ears facing forward with a gentle relaxed facial expression, illustrating a calm and content emotional state, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

#### 2. Korkmuş & Gergin Kedi (Scared / Fearful Mood)
- **Prompt:**
```text
A frightened cat crouched low to the ground with tense muscles, ears flattened sideways like airplane wings, dilated black pupils, tail tightly tucked under the body, illustrating anxiety and fear body language, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

#### 3. Agresif & Savunmacı Kedi (Defensive / Warning Posture)
- **Prompt:**
```text
A defensive cat in an arched back posture with fur raised along the spine, ears turned back flat against the head, mouth slightly open displaying teeth in a hiss warning, puffed bottle-brush tail, illustrating defensive aggression warning signs, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

#### 4. Oyun Modunda Kedi (Playful / Hunting Stance)
- **Prompt:**
```text
A playful cat in a crouched pounce-ready stance, bright wide alert eyes, forward whiskers, tail twitching slightly at the tip, illustrating energetic play and hunting drive, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

#### 5. Rahatsız / Uyarı Veren Kedi (Annoyed / Swishing Tail)
- **Prompt:**
```text
A slightly irritated cat sitting upright with a swishing thumping tail, ears turned sideways, narrowed eyes, and tense whiskers, illustrating early warning indicators before aggression, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

---

### 3.2 Temel Eğitim Ders İllüstrasyonları (Adım Adım)

#### Lesson 1: Recall (İsmine Gelme)
- **Adım 1:** Owner crouching down holding out a treat, calling the cat's name softly.
```text
A person crouching friendly on a rug holding out a small treat on an open hand, gently calling to a cat, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 2:** Cat walking towards owner with tail high in the air.
```text
A happy short-haired cat walking confidently towards a crouching owner with its tail raised vertically in a happy greeting gesture, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 3:** Cat receiving treat and positive reinforcement.
```text
A cat taking a treat happily from a person's palm, illustrating instant click-and-reward positive reinforcement timing, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

#### Lesson 2: Target Stick (Çubuğa Dokunma)
- **Adım 1:** Presenting target stick near cat's nose level.
```text
A hand holding a slim target stick with a soft colored sphere at the tip, held 2 inches away from a curious cat's face, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 2:** Cat sniffing and touching the tip.
```text
A cute cat stretching its neck to touch its pink nose directly onto the rounded tip of a target stick, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 3:** Clicking clicker and rewarding immediately.
```text
Close-up of a human hand pressing a colorful pet clicker while simultaneously offering a tasty reward morsel to a cat, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

#### Lesson 3: Sit (Oturma)
- **Adım 1:** Luring treat upwards over cat's head.
```text
A hand holding a treat right above a cat's nose and slowly moving it backwards over its forehead to guide its eyes upward, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 2:** Cat lowering rear quarters into a sit.
```text
A cat naturally dropping its hind legs onto the floor into a neat sitting posture while looking up at a treat lure, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 3:** Rewarding sitting cat.
```text
A cat resting calmly in a sit position while receiving a treat and gentle chin scratch, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

#### Lesson 4: High Five (Patisini Verme)
- **Adım 1:** Placing palm flat near cat paw level.
```text
A human hand held vertically open near the floor in front of a sitting cat, inviting a paw touch, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 2:** Cat reaching paw to touch palm.
```text
A cat lifting its front right paw upward and tapping the palm of a human hand in a high-five gesture, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 3:** Rewarding paw touch.
```text
A cat happily munching a treat after performing a high five paw tap, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

#### Lesson 5: Carrier (Taşıma Kutusu)
- **Adım 1:** Leaving carrier open with blanket & treats inside.
```text
An open plastic pet carrier sitting in a living room with a fluffy fleece blanket inside and treats scattered around the entrance, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 2:** Cat voluntarily exploring and stepping inside.
```text
A curious cat voluntary stepping its front paws into the warm comfortable pet carrier to eat treats without force, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 3:** Cat sitting relaxed inside open carrier.
```text
A calm cat resting inside a cozy pet carrier looking out contentedly, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

#### Lesson 6: Harness (Tasma / Kayış)
- **Adım 1:** Scenting harness with treats on the floor.
```text
A lightweight cat walking harness placed flat on a rug with delicious treats resting directly on top of the fabric for positive scent association, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 2:** Gently fitting harness without pressure.
```text
A calm owner softly slipping a comfortable H-style harness over a cat's shoulders while feeding a tube treat reward, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 3:** Cat walking freely wearing harness indoors.
```text
A proud cat walking smoothly around the house wearing an ergonomic green harness attached to a loose leash, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

#### Lesson 7: Scratching (Tırmalama Tahtası)
- **Adım 1:** Placing scratching post near sleeping area.
```text
A tall sisal rope scratching post positioned next to a plush cat bed in a sunlit room, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 2:** Guiding with toy/catnip to post.
```text
A hand dangling a toy feather near the top of a scratching post to entice a cat to reach upwards and grip the sisal rope, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 3:** Cat scratching post vigorously and happily.
```text
A happy cat stretching its back and digging its claws into a sisal scratching post in a healthy stretch routine, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

#### Lesson 8: Litter Box (Kum Kabı)
- **Adım 1:** Quiet, uncovered, accessible litter box setup.
```text
A broad open-top litter box filled with clean fine clumping litter located in a quiet private corner away from noisy appliances, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 2:** Guiding cat gently to box after meals or naps.
```text
An owner placing a kitten gently inside a clean litter box right after mealtime, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```
- **Adım 3:** Quiet praise and reward post-litter box use.
```text
A cat stepping out of its litter box and receiving soft verbal praise and a treat, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

---

### 3.3 Davranış & Agresiflik Rehberi İllüstrasyonları

#### 1. Yapılması Gerekenler (DOs: Proper Wand Toy Redirection)
- **Prompt:**
```text
Educational DO diagram: A person using a long feather wand toy to play energetically with a cat, keeping hands far away from biting distance, illustrating safe play habits, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

#### 2. Yapılmaması Gerekenler (DONTs: Never Use Hands as Toys)
- **Prompt:**
```text
Educational DONT diagram: A hand roughly wrestling with a cat on its back causing overstimulation biting, crossed out or highlighted as an unsafe play habit, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

#### 3. Güvenli Mesafe & Alan Tanıma (Safe Distance & Boundaries)
- **Prompt:**
```text
A person sitting 6 feet away from a timid cat reading a book peacefully, allowing the cat to observe from a safe high perch without pressure, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

#### 4. Kademeli Tanıştırma / Koku Değişimi (Gradual Scent Swap)
- **Prompt:**
```text
Two cat blankets being swapped between two separate rooms so two cats can safely sniff each other's scents before meeting face to face, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

#### 5. Yönlendirilmiş Agresiflikte Sakin Odaya Ayırma (Neutral Cool-Down Space)
- **Prompt:**
```text
A calm, dimly lit quiet sanctuary room with a cat bed, water bowl, and litter box for an overstimulated cat to rest without punishment, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition
```

---

### 3.4 Uygulama İkonu & App Store Ekran Görüntüsü Şablonları

#### 1. 3D Glassmorphism Uygulama İkonu (1024x1024)
- **Prompt:**
```text
App icon design: A stylized cute cat head silhouette crafted from smooth 3D translucent frosted glass with soft glowing ambient violet and teal gradients, warm inner luminescence, subtle glossy reflections, floating on a minimal clean rounded square tile backdrop, 3D glassmorphism style, smooth translucent glass textures, vibrant ambient gradients, soft volumetric shadows, clean modern UI aesthetic, high resolution 3D render, no text, no watermark, centered composition
```

#### 2. App Store Screenshots: Hero Banner Background
- **Prompt:**
```text
App store screenshot background banner: Modern floating 3D glassmorphism panels depicting cat training icons, clicker, target stick, treat bowl, soft ambient pastel lighting, abstract smooth wave geometry, high resolution 3D render, pristine clean background, no text, no watermark
```

#### 3. App Store Screenshots: Feature Presentation Spotlight (Dark Mode)
- **Prompt:**
```text
Dark mode mobile app showcase background: Sleek dark slate backdrop with subtle glowing neon gradient orbs in emerald and warm amber, glassmorphism framing surfaces, luxury tech aesthetic, 3D glassmorphism style, no text, no watermark
```

---

## 4. Prompt Kullanım İpuçları & Kalite Standartları

1. **Metinsiz Üretim:** Görsel AI motorlarında (Midjourney vb.) metin oluşturulması hataya açıktır. Promptlarda her zaman `no text, no watermark` bulundurun. Metinler React/React Native arayüzünde i18n ile eklenecektir.
2. **Kedi Irkı Sabitleme:** İllüstrasyonlar arasında aynı kediyi devam ettirmek için promptlara ırk ve renk tanımı ekleyebilirsiniz. Örnek: `short-haired orange tabby cat with amber eyes`.
3. **Agresiflik Görsellerinde Kelime Seçimi:** Güvenlik filtrelerine taktırmamak için `blood, attack, injury, violent, fight` kelimelerini **kullanmayın**. Bunların yerine `defensive posture, puffed fur, warning posture, arched back, hissed stance` gibi davranışsal terimler kullanın.
4. **Video Motoru İpuçları:**  
   - Runway Gen-3: Yüksek aksiyonlu sahnelerde `motion: 4-6` tercih edin.
   - Sora / Veo: Işıklandırma ve detaylarda `natural lighting, slow camera pan` komutlarına iyi tepki verir.
