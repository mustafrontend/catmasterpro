import { PromptItem, PromptCategory, PromptStyleSuffixes } from '../types/prompts';

export const STYLE_SUFFIXES: PromptStyleSuffixes = {
  flatIllustration: 'consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
  photorealistic: 'photorealistic, natural soft lighting, shallow depth of field, calm domestic setting, high detail fur, no text, no watermark',
  glassmorphism3D: '3D glassmorphism style, smooth translucent glass textures, vibrant ambient gradients, soft volumetric shadows, clean modern UI aesthetic, high resolution 3D render, no text, no watermark'
};

export const PROMPTS_DATA: PromptItem[] = [
  // ==========================================
  // 1. VIDEO GENERATION PROMPTS (8 LESSONS)
  // ==========================================
  {
    id: 'vid-lesson-recall',
    title: 'Recall Training Video Demo',
    titleTr: 'İsmine Gelme Eğitimi Video Demosu',
    category: 'video-lessons',
    targetEngine: 'Runway Gen-3 / Sora / Veo / Pika / Kling',
    promptText: 'Wide tracking shot: A happy short-haired cat responds immediately when called, walking confidently across a bright living room towards a crouching owner holding a treat in an open palm. Smooth camera motion, warm cheerful indoor lighting, calm educational tone, 8 seconds.',
    basePrompt: 'A happy short-haired cat responds immediately when called, walking confidently across a bright living room towards a crouching owner holding a treat in an open palm.',
    durationSec: 8,
    lessonId: 'recall',
    aspectRatio: '16:9',
    description: 'Smooth tracking video showing cat recalling upon hearing its name.',
    descriptionTr: 'İsmine yanıt veren kedinin sahibine doğru güvenle yürümesini gösteren pürüzsüz takip videosu.'
  },
  {
    id: 'vid-lesson-target-stick',
    title: 'Target Stick Touch Video Demo',
    titleTr: 'Target Çubuğuna Dokunma Video Demosu',
    category: 'video-lessons',
    targetEngine: 'Runway Gen-3 / Sora / Veo / Pika / Kling',
    promptText: 'Close-up shot: A calm domestic cat gently reaches forward and touches its nose to the target ball tip of a training stick held by a hand. A clicker is pressed followed immediately by handing a small treat reward. Paced and clear motion, soft warm lighting, 6 seconds.',
    basePrompt: 'A calm domestic cat gently reaches forward and touches its nose to the target ball tip of a training stick held by a hand.',
    durationSec: 6,
    lessonId: 'target-stick',
    aspectRatio: '16:9',
    description: 'Close-up video demonstration of target stick nose touching and reward timing.',
    descriptionTr: 'Target çubuğuna burun dokundurma ve ödül zamanlamasının yakın çekim videosu.'
  },
  {
    id: 'vid-lesson-sit',
    title: 'Sit Command Video Demo',
    titleTr: 'Oturma Komutu Video Demosu',
    category: 'video-lessons',
    targetEngine: 'Runway Gen-3 / Sora / Veo / Pika / Kling',
    promptText: 'Medium shot: A cat sitting gracefully on its hind legs as a hand gently moves a treat slightly upwards and over its head, smoothly guiding the cat into a sit posture. Calm atmosphere, high detail motion, 6 seconds.',
    basePrompt: 'A cat sitting gracefully on its hind legs as a hand gently moves a treat slightly upwards and over its head, smoothly guiding the cat into a sit posture.',
    durationSec: 6,
    lessonId: 'sit',
    aspectRatio: '16:9',
    description: 'Video showing the lure technique guiding a cat into a sitting posture.',
    descriptionTr: 'Kediyi ödül yönlendirmesiyle oturma pozisyonuna geçiren tekniğin videosu.'
  },
  {
    id: 'vid-lesson-high-five',
    title: 'High Five Paw Touch Video Demo',
    titleTr: 'Patisini Verme / Beşlik Video Demosu',
    category: 'video-lessons',
    targetEngine: 'Runway Gen-3 / Sora / Veo / Pika / Kling',
    promptText: 'Close-up shot: A playful cat gently lifts its front paw to touch an open human palm in a high-five gesture, receiving a treat immediately after. Soft focus background, friendly domestic environment, 6 seconds.',
    basePrompt: 'A playful cat gently lifts its front paw to touch an open human palm in a high-five gesture, receiving a treat immediately after.',
    durationSec: 6,
    lessonId: 'high-five',
    aspectRatio: '16:9',
    description: 'Close-up video showing cat lifting its paw for a high five.',
    descriptionTr: 'Patisini insan eline beşlik şeklinde dokunduran kedinin yakın çekim videosu.'
  },
  {
    id: 'vid-lesson-carrier',
    title: 'Voluntary Carrier Entry Video Demo',
    titleTr: 'Taşıma Kutusuna Gönüllü Girme Video Demosu',
    category: 'video-lessons',
    targetEngine: 'Runway Gen-3 / Sora / Veo / Pika / Kling',
    promptText: 'Static wide shot: A relaxed cat voluntarily walks into a soft cozy open pet carrier containing a soft blanket and treats, then turns around and curls up comfortably inside. Patient, stress-free video pace, 8 seconds.',
    basePrompt: 'A relaxed cat voluntarily walks into a soft cozy open pet carrier containing a soft blanket and treats, then turns around and curls up comfortably inside.',
    durationSec: 8,
    lessonId: 'carrier',
    aspectRatio: '16:9',
    description: 'Stress-free video showing voluntary carrier entry.',
    descriptionTr: 'Kedinin taşıma kutusuna stres olmadan gönüllü girmesini gösteren video.'
  },
  {
    id: 'vid-lesson-harness',
    title: 'Harness Walk Video Demo',
    titleTr: 'Tasma ile Yürüme Video Demosu',
    category: 'video-lessons',
    targetEngine: 'Runway Gen-3 / Sora / Veo / Pika / Kling',
    promptText: 'Side profile shot: A cat wearing a well-fitted soft harness walks comfortably and calmly across a sunlit room while taking treats from a human hand. Smooth natural motion, no distress, 7 seconds.',
    basePrompt: 'A cat wearing a well-fitted soft harness walks comfortably and calmly across a sunlit room while taking treats from a human hand.',
    durationSec: 7,
    lessonId: 'harness',
    aspectRatio: '16:9',
    description: 'Video demonstrating cat walking naturally with a harness indoor.',
    descriptionTr: 'Kedinin ev içinde göğüs tasması ile rahatça yürümesini gösteren video.'
  },
  {
    id: 'vid-lesson-scratching',
    title: 'Scratching Post Usage Video Demo',
    titleTr: 'Tırmalama Tahtası Kullanımı Video Demosu',
    category: 'video-lessons',
    targetEngine: 'Runway Gen-3 / Sora / Veo / Pika / Kling',
    promptText: 'Medium shot: A playful cat stretching upwards and happily scratching a sturdy vertical sisal rope post next to its bed, ignoring furniture. Bright welcoming home setting, clean movement, 6 seconds.',
    basePrompt: 'A playful cat stretching upwards and happily scratching a sturdy vertical sisal rope post next to its bed, ignoring furniture.',
    durationSec: 6,
    lessonId: 'scratching',
    aspectRatio: '16:9',
    description: 'Video showcasing healthy scratching post usage.',
    descriptionTr: 'Kedinin mobilya yerine tırmalama direğini keyifle kullanmasını gösteren video.'
  },
  {
    id: 'vid-lesson-litter-box',
    title: 'Litter Box Routine Video Demo',
    titleTr: 'Kum Kabı Kullanımı Video Demosu',
    category: 'video-lessons',
    targetEngine: 'Runway Gen-3 / Sora / Veo / Pika / Kling',
    promptText: 'Static medium shot: A clean domestic cat calmly stepping into a spacious, uncovered, low-entry litter box in a quiet sunlit corner of a room, digging softly. Gentle ambient lighting, educational focus, 7 seconds.',
    basePrompt: 'A clean domestic cat calmly stepping into a spacious, uncovered, low-entry litter box in a quiet sunlit corner of a room, digging softly.',
    durationSec: 7,
    lessonId: 'litter-box',
    aspectRatio: '16:9',
    description: 'Quiet educational video demonstration of clean litter box habits.',
    descriptionTr: 'Sakin ve açık kum kabına giren kedinin eğitim videosu.'
  },

  // ==========================================
  // 2. VIDEO GENERATION PROMPTS (AGGRESSION & CALMING)
  // ==========================================
  {
    id: 'vid-aggr-redirect-play',
    title: 'Redirecting Play Aggression Video',
    titleTr: 'Oyun Agresifliğini Yönlendirme Videosu',
    category: 'video-aggression',
    targetEngine: 'Runway Gen-3 / Sora / Veo / Pika / Kling',
    promptText: 'Medium shot: A cat lunges with high play energy towards a feather wand toy being moved swiftly away across the floor, showing play aggression successfully redirected away from hands onto the toy. Smooth motion capture, 6 seconds.',
    basePrompt: 'A cat lunges with high play energy towards a feather wand toy being moved swiftly away across the floor, showing play aggression successfully redirected away from hands onto the toy.',
    durationSec: 6,
    aspectRatio: '16:9',
    description: 'Video showing biting behavior redirected away from human hands to a wand toy.',
    descriptionTr: 'Isırma ve tırmalama davranışının olta oyuncağına yönlendirilmesini gösteren video.'
  },
  {
    id: 'vid-aggr-giving-space',
    title: 'Fear Aggression - Giving Space Video',
    titleTr: 'Korku Agresifliği - Alan Tanıma Videosu',
    category: 'video-aggression',
    targetEngine: 'Runway Gen-3 / Sora / Veo / Pika / Kling',
    promptText: 'Slow pull-back shot: A person sitting completely still on the floor, keeping hands low and avoiding eye contact, giving a nervous cat space to approach voluntarily without feeling trapped. Peaceful calm lighting, 7 seconds.',
    basePrompt: 'A person sitting completely still on the floor, keeping hands low and avoiding eye contact, giving a nervous cat space to approach voluntarily without feeling trapped.',
    durationSec: 7,
    aspectRatio: '16:9',
    description: 'Video showing passive posture allowing timid cat to choose distance.',
    descriptionTr: 'Ürkek kediye müdahale etmeden alan ve seçenek tanıma tekniğinin videosu.'
  },
  {
    id: 'vid-aggr-cooldown',
    title: 'Overstimulation Cool-Down Room Video',
    titleTr: 'Aşırı Uyarılma Mola Odası Videosu',
    category: 'video-aggression',
    targetEngine: 'Runway Gen-3 / Sora / Veo / Pika / Kling',
    promptText: 'Slow tracking shot: An overstimulated cat is calmly guided into a quiet, softly lit room with a cozy bed and water bowl, the door gently closing to allow a peaceful cool-down period. Warm soothing tones, 7 seconds.',
    basePrompt: 'An overstimulated cat is calmly guided into a quiet, softly lit room with a cozy bed and water bowl, the door gently closing to allow a peaceful cool-down period.',
    durationSec: 7,
    aspectRatio: '16:9',
    description: 'Video demonstrating non-punitive isolation cool-down room technique.',
    descriptionTr: 'Heyecanlı kedinin sakinleşmesi için cezasız mola odası yönetim videosu.'
  },
  {
    id: 'vid-aggr-scent-intro',
    title: 'Gradual Scent Introduction Video',
    titleTr: 'Kademeli Koku Tanıştırması Videosu',
    category: 'video-aggression',
    targetEngine: 'Runway Gen-3 / Sora / Veo / Pika / Kling',
    promptText: 'Medium shot: Two cats on opposite sides of a slightly open door or mesh gate, sniffing each other\'s scents calmly while eating high-value treats from bowls. Harmonious, gradual introduction, 8 seconds.',
    basePrompt: 'Two cats on opposite sides of a slightly open door or mesh gate, sniffing each other\'s scents calmly while eating high-value treats from bowls.',
    durationSec: 8,
    aspectRatio: '16:9',
    description: 'Video showing positive association introduction through a door gap.',
    descriptionTr: 'Kapı aralığında lezzetli mama ile kedilerin kademeli tanıştırılması videosu.'
  },

  // ==========================================
  // 3. BODY LANGUAGE & MOOD STATES
  // ==========================================
  {
    id: 'img-mood-relaxed',
    title: 'Relaxed Body Language Illustration',
    titleTr: 'Sakin ve Rahat Vücut Dili İllüstrasyonu',
    category: 'body-language',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A relaxed domestic cat lying down with a soft loose body posture, half-closed contented eyes, tail resting calmly on the floor, ears facing forward with a gentle relaxed facial expression, illustrating a calm and content emotional state, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A relaxed domestic cat lying down with a soft loose body posture, half-closed contented eyes, tail resting calmly on the floor, ears facing forward with a gentle relaxed facial expression, illustrating a calm and content emotional state',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    aspectRatio: '1:1',
    description: 'Flat illustration showing relaxed cat posture, soft eyes, and calm tail.',
    descriptionTr: 'Sakin kedinin vücut duruşu, yarık kapalı gözleri ve rahat kuyruğunu gösteren illüstrasyon.'
  },
  {
    id: 'img-mood-scared',
    title: 'Frightened / Fearful Body Language',
    titleTr: 'Korkmuş ve Gergin Vücut Dili',
    category: 'body-language',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A frightened cat crouched low to the ground with tense muscles, ears flattened sideways like airplane wings, dilated black pupils, tail tightly tucked under the body, illustrating anxiety and fear body language, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A frightened cat crouched low to the ground with tense muscles, ears flattened sideways like airplane wings, dilated black pupils, tail tightly tucked under the body, illustrating anxiety and fear body language',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    aspectRatio: '1:1',
    description: 'Flat illustration showing crouched scared cat with flattened ears and tucked tail.',
    descriptionTr: 'Sinmiş, kulakları yana yatmış ve kuyruğunu saklamış korkmuş kedi illüstrasyonu.'
  },
  {
    id: 'img-mood-defensive',
    title: 'Defensive / Aggressive Warning Posture',
    titleTr: 'Savunmacı ve Uyarı Veren Agresif Duruş',
    category: 'body-language',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A defensive cat in an arched back posture with fur raised along the spine, ears turned back flat against the head, mouth slightly open displaying teeth in a hiss warning, puffed bottle-brush tail, illustrating defensive aggression warning signs, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A defensive cat in an arched back posture with fur raised along the spine, ears turned back flat against the head, mouth slightly open displaying teeth in a hiss warning, puffed bottle-brush tail, illustrating defensive aggression warning signs',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    aspectRatio: '1:1',
    description: 'Flat illustration depicting arched back, raised fur, and puffed tail defensive posture.',
    descriptionTr: 'Kamburlaşmış, tüyleri dikilmiş ve kabarık kuyruklu savunmacı kedi duruşu.'
  },
  {
    id: 'img-mood-playful',
    title: 'Playful / Hunting Stance Illustration',
    titleTr: 'Oyun Modu ve Avlanma Duruşu İllüstrasyonu',
    category: 'body-language',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A playful cat in a crouched pounce-ready stance, bright wide alert eyes, forward whiskers, tail twitching slightly at the tip, illustrating energetic play and hunting drive, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A playful cat in a crouched pounce-ready stance, bright wide alert eyes, forward whiskers, tail twitching slightly at the tip, illustrating energetic play and hunting drive',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    aspectRatio: '1:1',
    description: 'Flat illustration showing pounce stance, wide eyes, and twitching tail.',
    descriptionTr: 'Saldırmaya hazır pusuda bekleyen oyun modundaki kedi illüstrasyonu.'
  },
  {
    id: 'img-mood-annoyed',
    title: 'Irritated / Swishing Tail Warning',
    titleTr: 'Rahatsız ve Kuyruk Sallayan Kedi Uyarısı',
    category: 'body-language',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A slightly irritated cat sitting upright with a swishing thumping tail, ears turned sideways, narrowed eyes, and tense whiskers, illustrating early warning indicators before aggression, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A slightly irritated cat sitting upright with a swishing thumping tail, ears turned sideways, narrowed eyes, and tense whiskers, illustrating early warning indicators before aggression',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    aspectRatio: '1:1',
    description: 'Flat illustration showing early warning signs like swishing tail and sideways ears.',
    descriptionTr: 'Sert kuyruk sallama ve kulak geriye yatırma gibi erken tepki uyarı illüstrasyonu.'
  },

  // ==========================================
  // 4. STEP-BY-STEP LESSON ILLUSTRATIONS
  // ==========================================
  // Lesson 1: Recall
  {
    id: 'img-step-recall-1',
    title: 'Recall Step 1 - Calling with Treat',
    titleTr: 'İsmine Gelme Adım 1 - Ödülle Çağırma',
    category: 'lesson-steps',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A person crouching friendly on a rug holding out a small treat on an open hand, gently calling to a cat, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A person crouching friendly on a rug holding out a small treat on an open hand, gently calling to a cat',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    lessonId: 'recall',
    aspectRatio: '4:3',
    description: 'Step 1: Crouch down low and offer a treat while vocalizing cat name.',
    descriptionTr: 'Adım 1: Yere çömelip elinizde ödülle kediye ismiyle seslenin.'
  },
  {
    id: 'img-step-recall-2',
    title: 'Recall Step 2 - Cat Approaching',
    titleTr: 'İsmine Gelme Adım 2 - Kedinin Yaklaşması',
    category: 'lesson-steps',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A happy short-haired cat walking confidently towards a crouching owner with its tail raised vertically in a happy greeting gesture, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A happy short-haired cat walking confidently towards a crouching owner with its tail raised vertically in a happy greeting gesture',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    lessonId: 'recall',
    aspectRatio: '4:3',
    description: 'Step 2: Cat approaches with vertical happy tail posture.',
    descriptionTr: 'Adım 2: Kedi dik kuyrukla mutlu şekilde sahibine doğru adımlar.'
  },
  {
    id: 'img-step-recall-3',
    title: 'Recall Step 3 - Rewarding Arrival',
    titleTr: 'İsmine Gelme Adım 3 - Anında Ödül Verme',
    category: 'lesson-steps',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A cat taking a treat happily from a person\'s palm, illustrating instant click-and-reward positive reinforcement timing, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A cat taking a treat happily from a person\'s palm, illustrating instant click-and-reward positive reinforcement timing',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    lessonId: 'recall',
    aspectRatio: '4:3',
    description: 'Step 3: Instant clicker sound and reward delivery upon arrival.',
    descriptionTr: 'Adım 3: Kedi geldiği an clicker basıp ödülünü verin.'
  },

  // Lesson 2: Target Stick
  {
    id: 'img-step-target-1',
    title: 'Target Stick Step 1 - Presenting Stick',
    titleTr: 'Target Çubuğu Adım 1 - Çubuğu Uzatma',
    category: 'lesson-steps',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A hand holding a slim target stick with a soft colored sphere at the tip, held 2 inches away from a curious cat\'s face, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A hand holding a slim target stick with a soft colored sphere at the tip, held 2 inches away from a curious cat\'s face',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    lessonId: 'target-stick',
    aspectRatio: '4:3',
    description: 'Step 1: Presenting target stick close to cat nose.',
    descriptionTr: 'Adım 1: Target çubuğunu kedinin burnuna yakın tutun.'
  },
  {
    id: 'img-step-target-2',
    title: 'Target Stick Step 2 - Nose Touch',
    titleTr: 'Target Çubuğu Adım 2 - Burun Dokunuşu',
    category: 'lesson-steps',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A cute cat stretching its neck to touch its pink nose directly onto the rounded tip of a target stick, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A cute cat stretching its neck to touch its pink nose directly onto the rounded tip of a target stick',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    lessonId: 'target-stick',
    aspectRatio: '4:3',
    description: 'Step 2: Cat touches its nose to target ball tip.',
    descriptionTr: 'Adım 2: Kedi burnunu çubuğun ucuna değdirir.'
  },

  // Lesson 3: Sit
  {
    id: 'img-step-sit-1',
    title: 'Sit Step 1 - Lure Over Head',
    titleTr: 'Oturma Adım 1 - Yemle Baş Üstüne Yönlendirme',
    category: 'lesson-steps',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A hand holding a treat right above a cat\'s nose and slowly moving it backwards over its forehead to guide its eyes upward, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A hand holding a treat right above a cat\'s nose and slowly moving it backwards over its forehead to guide its eyes upward',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    lessonId: 'sit',
    aspectRatio: '4:3',
    description: 'Step 1: Move treat above nose towards forehead.',
    descriptionTr: 'Adım 1: Ödülü kedinin burnundan alnına doğru geriye kaydırın.'
  },
  {
    id: 'img-step-sit-2',
    title: 'Sit Step 2 - Hind Legs Lowering',
    titleTr: 'Oturma Adım 2 - Kalçayı Yere İndirme',
    category: 'lesson-steps',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A cat naturally dropping its hind legs onto the floor into a neat sitting posture while looking up at a treat lure, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A cat naturally dropping its hind legs onto the floor into a neat sitting posture while looking up at a treat lure',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    lessonId: 'sit',
    aspectRatio: '4:3',
    description: 'Step 2: Cat drops hind legs into sit position.',
    descriptionTr: 'Adım 2: Kedi başını kaldırırken arka ayaklarının üzerine oturur.'
  },

  // Lesson 4: High Five
  {
    id: 'img-step-highfive-1',
    title: 'High Five Step 1 - Present Open Palm',
    titleTr: 'Beşlik Adım 1 - Açık Avuç Gösterme',
    category: 'lesson-steps',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A human hand held vertically open near the floor in front of a sitting cat, inviting a paw touch, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A human hand held vertically open near the floor in front of a sitting cat, inviting a paw touch',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    lessonId: 'high-five',
    aspectRatio: '4:3',
    description: 'Step 1: Present flat open hand near sitting cat.',
    descriptionTr: 'Adım 1: Oturan kedinin önüne avucunuzu dikey tutun.'
  },
  {
    id: 'img-step-highfive-2',
    title: 'High Five Step 2 - Paw Touch',
    titleTr: 'Beşlik Adım 2 - Patinin Avuca Dokunması',
    category: 'lesson-steps',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A cat lifting its front right paw upward and tapping the palm of a human hand in a high-five gesture, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A cat lifting its front right paw upward and tapping the palm of a human hand in a high-five gesture',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    lessonId: 'high-five',
    aspectRatio: '4:3',
    description: 'Step 2: Cat raises paw and taps open palm.',
    descriptionTr: 'Adım 2: Kedi patisini kaldırıp elinize dokundurur.'
  },

  // Lesson 5: Carrier
  {
    id: 'img-step-carrier-1',
    title: 'Carrier Step 1 - Open Carrier with Blanket',
    titleTr: 'Kutu Adım 1 - Açık Kutuda Battaniye & Ödül',
    category: 'lesson-steps',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'An open plastic pet carrier sitting in a living room with a fluffy fleece blanket inside and treats scattered around the entrance, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'An open plastic pet carrier sitting in a living room with a fluffy fleece blanket inside and treats scattered around the entrance',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    lessonId: 'carrier',
    aspectRatio: '4:3',
    description: 'Step 1: Leave carrier door open with blanket and treats.',
    descriptionTr: 'Adım 1: Kutuyu kapısı açık bırakıp içine yumuşak örtü koyun.'
  },
  {
    id: 'img-step-carrier-2',
    title: 'Carrier Step 2 - Voluntary Entry',
    titleTr: 'Kutu Adım 2 - Kedinin Gönüllü Girmesi',
    category: 'lesson-steps',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A curious cat voluntary stepping its front paws into the warm comfortable pet carrier to eat treats without force, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A curious cat voluntary stepping its front paws into the warm comfortable pet carrier to eat treats without force',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    lessonId: 'carrier',
    aspectRatio: '4:3',
    description: 'Step 2: Cat voluntarily steps inside carrier without pushing.',
    descriptionTr: 'Adım 2: Kedi zorlama olmadan kutuya kendi adımıyla girer.'
  },

  // Lesson 6: Harness
  {
    id: 'img-step-harness-1',
    title: 'Harness Step 1 - Scent Association',
    titleTr: 'Tasma Adım 1 - Koklama ve Ödül Eşleşmesi',
    category: 'lesson-steps',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A lightweight cat walking harness placed flat on a rug with delicious treats resting directly on top of the fabric for positive scent association, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A lightweight cat walking harness placed flat on a rug with delicious treats resting directly on top of the fabric for positive scent association',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    lessonId: 'harness',
    aspectRatio: '4:3',
    description: 'Step 1: Place harness on floor with treats to build positive scent association.',
    descriptionTr: 'Adım 1: Tasmanın üzerine ödül koyup kokuya alışmasını sağlayın.'
  },

  // Lesson 7: Scratching
  {
    id: 'img-step-scratching-1',
    title: 'Scratching Post Placement',
    titleTr: 'Tırmalama Direği Konumlandırma',
    category: 'lesson-steps',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A tall sisal rope scratching post positioned next to a plush cat bed in a sunlit room, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A tall sisal rope scratching post positioned next to a plush cat bed in a sunlit room',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    lessonId: 'scratching',
    aspectRatio: '4:3',
    description: 'Step 1: Position sturdy vertical sisal post near sleeping or entrance area.',
    descriptionTr: 'Adım 1: Tırmalama direğini uykudan uyanma noktasına yakın koyun.'
  },

  // Lesson 8: Litter Box
  {
    id: 'img-step-litter-1',
    title: 'Litter Box Quiet Corner Setup',
    titleTr: 'Kum Kabı Sakin Köşe Kurulumu',
    category: 'lesson-steps',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A broad open-top litter box filled with clean fine clumping litter located in a quiet private corner away from noisy appliances, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A broad open-top litter box filled with clean fine clumping litter located in a quiet private corner away from noisy appliances',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    lessonId: 'litter-box',
    aspectRatio: '4:3',
    description: 'Step 1: Uncovered spacious litter box in quiet location.',
    descriptionTr: 'Adım 1: Gürültüden uzak sakin köşede geniş ve açık kum kabı.'
  },

  // ==========================================
  // 5. BEHAVIOR & AGGRESSION GUIDES
  // ==========================================
  {
    id: 'img-guide-do-wand-toy',
    title: 'Behavior Guide DO - Wand Toy Play',
    titleTr: 'Davranış Rehberi DO - Olta Oyuncağı İle Oyun',
    category: 'behavior-guides',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'Educational DO diagram: A person using a long feather wand toy to play energetically with a cat, keeping hands far away from biting distance, illustrating safe play habits, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A person using a long feather wand toy to play energetically with a cat, keeping hands far away from biting distance, illustrating safe play habits',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    aspectRatio: '16:9',
    description: 'Visual guide for correct play habit: wand toy at distance.',
    descriptionTr: 'Doğru oyun alışkanlığı rehberi: Uzun saplı oltayla oyun.'
  },
  {
    id: 'img-guide-dont-hand-play',
    title: 'Behavior Guide DONT - No Hand Play',
    titleTr: 'Davranış Rehberi DONT - Elle Oynamayın',
    category: 'behavior-guides',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'Educational DONT diagram: A hand roughly wrestling with a cat on its back causing overstimulation biting, crossed out or highlighted as an unsafe play habit, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A hand roughly wrestling with a cat on its back causing overstimulation biting, crossed out or highlighted as an unsafe play habit',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    aspectRatio: '16:9',
    description: 'Visual guide for forbidden habit: using hands or feet as targets.',
    descriptionTr: 'Yanlış oyun alışkanlığı: Elleri kediye hedef göstermek.'
  },
  {
    id: 'img-guide-safe-distance',
    title: 'Behavior Guide - Respecting Safe Distance',
    titleTr: 'Davranış Rehberi - Güvenli Mesafe ve Alan Tanıma',
    category: 'behavior-guides',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A person sitting 6 feet away from a timid cat reading a book peacefully, allowing the cat to observe from a safe high perch without pressure, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A person sitting 6 feet away from a timid cat reading a book peacefully, allowing the cat to observe from a safe high perch without pressure',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    aspectRatio: '16:9',
    description: 'Illustration showing passive peaceful presence giving distance to fearful cat.',
    descriptionTr: 'Ürkek kediyi zorlamadan mesafeli ve sakince oturma rehberi.'
  },
  {
    id: 'img-guide-scent-swap',
    title: 'Behavior Guide - Scent Blanket Swap',
    titleTr: 'Davranış Rehberi - Koku Değişimi Battaniye Yöntemi',
    category: 'behavior-guides',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'Two cat blankets being swapped between two separate rooms so two cats can safely sniff each other\'s scents before meeting face to face, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'Two cat blankets being swapped between two separate rooms so two cats can safely sniff each other\'s scents before meeting face to face',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    aspectRatio: '16:9',
    description: 'Visual guide for inter-cat scent swapping before physical meeting.',
    descriptionTr: 'Kediler yüz yüze gelmeden önce örtü değişimiyle koku tanıştırma rehberi.'
  },
  {
    id: 'img-guide-cooldown-sanctuary',
    title: 'Behavior Guide - Quiet Sanctuary Room',
    titleTr: 'Davranış Rehberi - Mola ve Sakinleşme Alanı',
    category: 'behavior-guides',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'A calm, dimly lit quiet sanctuary room with a cat bed, water bowl, and litter box for an overstimulated cat to rest without punishment, consistent flat illustration style, soft rounded shapes, warm friendly color palette, clean minimal background, educational app illustration, high clarity, no text, no watermark, centered composition',
    basePrompt: 'A calm, dimly lit quiet sanctuary room with a cat bed, water bowl, and litter box for an overstimulated cat to rest without punishment',
    styleSuffix: STYLE_SUFFIXES.flatIllustration,
    aspectRatio: '16:9',
    description: 'Safe cool-down room setup guide for overstimulated or redirected aggression.',
    descriptionTr: 'Aşırı uyarılmış kedi için cezasız, loş ve konforlu mola odası kurulumu.'
  },

  // ==========================================
  // 6. APP ICON & APP STORE SCREENSHOT ASSETS
  // ==========================================
  {
    id: 'app-asset-icon-3d',
    title: 'App Icon - 3D Glassmorphism Cat Head',
    titleTr: 'Uygulama İkonu - 3D Cam Biçimci Kedi Kafası',
    category: 'app-assets',
    targetEngine: 'Midjourney v6 / DALL-E 3 / Ideogram / SD3',
    promptText: 'App icon design: A stylized cute cat head silhouette crafted from smooth 3D translucent frosted glass with soft glowing ambient violet and teal gradients, warm inner luminescence, subtle glossy reflections, floating on a minimal clean rounded square tile backdrop, 3D glassmorphism style, smooth translucent glass textures, vibrant ambient gradients, soft volumetric shadows, clean modern UI aesthetic, high resolution 3D render, no text, no watermark, centered composition',
    basePrompt: 'A stylized cute cat head silhouette crafted from smooth 3D translucent frosted glass with soft glowing ambient violet and teal gradients, warm inner luminescence, subtle glossy reflections, floating on a minimal clean rounded square tile backdrop',
    styleSuffix: STYLE_SUFFIXES.glassmorphism3D,
    aspectRatio: '1:1',
    description: '1024x1024 3D glassmorphism app icon render prompt.',
    descriptionTr: 'App Store / Play Store için 1024x1024 boyutunda 3D cam efektli uygulama ikonu.'
  },
  {
    id: 'app-asset-store-hero-bg',
    title: 'App Store Screenshots - Hero Banner Background',
    titleTr: 'App Store Ekran Görüntüleri - Hero Arka Plan',
    category: 'app-assets',
    targetEngine: 'Midjourney v6 / DALL-E 3 / SD3',
    promptText: 'App store screenshot background banner: Modern floating 3D glassmorphism panels depicting cat training icons, clicker, target stick, treat bowl, soft ambient pastel lighting, abstract smooth wave geometry, high resolution 3D render, pristine clean background, no text, no watermark',
    basePrompt: 'Modern floating 3D glassmorphism panels depicting cat training icons, clicker, target stick, treat bowl, soft ambient pastel lighting, abstract smooth wave geometry',
    styleSuffix: STYLE_SUFFIXES.glassmorphism3D,
    aspectRatio: '16:9',
    description: 'Marketing background template for App Store 6.7" iPhone & 12.9" iPad hero shots.',
    descriptionTr: 'App Store pazarlama görselleri için 3D cam efektli arka plan şablonu.'
  },
  {
    id: 'app-asset-store-dark-mode-bg',
    title: 'App Store Screenshots - Dark Mode Showcase BG',
    titleTr: 'App Store Ekran Görüntüleri - Koyu Mod Arka Plan',
    category: 'app-assets',
    targetEngine: 'Midjourney v6 / DALL-E 3 / SD3',
    promptText: 'Dark mode mobile app showcase background: Sleek dark slate backdrop with subtle glowing neon gradient orbs in emerald and warm amber, glassmorphism framing surfaces, luxury tech aesthetic, 3D glassmorphism style, no text, no watermark',
    basePrompt: 'Sleek dark slate backdrop with subtle glowing neon gradient orbs in emerald and warm amber, glassmorphism framing surfaces, luxury tech aesthetic',
    styleSuffix: STYLE_SUFFIXES.glassmorphism3D,
    aspectRatio: '9:16',
    description: 'Dark mode presentation backdrop for premium feature highlights.',
    descriptionTr: 'Premium özellikleri vurgulayan koyu mod App Store arka plan şablonu.'
  }
];

// ==========================================
// HELPER UTILITY FUNCTIONS
// ==========================================

export function getPromptsByCategory(category: PromptCategory): PromptItem[] {
  return PROMPTS_DATA.filter(item => item.category === category);
}

export function getPromptsByLesson(lessonId: string): PromptItem[] {
  return PROMPTS_DATA.filter(item => item.lessonId === lessonId);
}

export function searchPrompts(query: string): PromptItem[] {
  const q = query.toLowerCase().trim();
  if (!q) return PROMPTS_DATA;
  return PROMPTS_DATA.filter(item => 
    item.title.toLowerCase().includes(q) ||
    item.titleTr.toLowerCase().includes(q) ||
    item.promptText.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.descriptionTr.toLowerCase().includes(q) ||
    (item.lessonId && item.lessonId.toLowerCase().includes(q))
  );
}

export function getPromptById(id: string): PromptItem | undefined {
  return PROMPTS_DATA.find(item => item.id === id);
}
