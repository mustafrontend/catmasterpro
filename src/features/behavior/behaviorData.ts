export interface BehaviorArticle {
  id: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  category: 'aggression' | 'anxiety' | 'habits';
  severity: 'low' | 'medium' | 'high';
  readTimeMinutes: number;
  isPremium: boolean;
  summary: string;
  summaryEn?: string;
  causes: string[];
  causesEn?: string[];
  dos: string[];
  dosEn?: string[];
  donts: string[];
  dontsEn?: string[];
  vetWarning: string;
  vetWarningEn?: string;
  icon: string;
  videoUrl?: string;
}

export const BEHAVIOR_ARTICLES: BehaviorArticle[] = [
  // 1. FREE ARTICLE
  {
    id: 'play-biting',
    title: 'Oyun Kaynaklı Isırma ve Tırmalama',
    titleEn: 'Play Biting & Scratching',
    subtitle: 'El ve ayaklarınızı av yapmaktan vazgeçirme rehberi',
    subtitleEn: 'Guide to stop hands and feet hunting behavior',
    category: 'aggression', severity: 'medium', readTimeMinutes: 4, isPremium: false,
    videoUrl: '/assets/Medium_shot_A_cat_lunges_with.mp4',
    summary: 'Yavru ve genç kedilerin ellerinizi av zannederek ısırması çok yaygındır.',
    summaryEn: 'Kittens and young cats biting hands or ankles as prey is very common.',
    causes: ['Ellerle oyun oynatılması', 'Can sıkıntısı', 'Bite inhibition eksikliği'],
    causesEn: ['Hand play during kittenhood', 'Boredom', 'Lack of bite inhibition'],
    dos: ['Oltalı oyuncak kullanın', 'Isırdığında tepkisiz kalıp donun'],
    dosEn: ['Use wand toys', 'Freeze when bitten'],
    donts: ['Asla elle boğuşmayın', 'Isırınca elinizi hızla çekmeyin'],
    dontsEn: ['Never roughhouse with hands', 'Do not jerk hand away'],
    vetWarning: 'Derin ısırıklarda doktor kontrolü şarttır.', vetWarningEn: 'Seek medical care if skin is broken.',
    icon: 'Zap'
  },

  // 2 - 20 PRO ARTICLES
  {
    id: 'fear-aggression',
    title: 'Korku ve Stres Kaynaklı Saldırganlık', titleEn: 'Fear & Stress Aggression',
    subtitle: 'Korkmuş bir kediyle iletişim ve güven tazeleme', subtitleEn: 'Communicating with a frightened cat',
    category: 'aggression', severity: 'high', readTimeMinutes: 5, isPremium: true,
    videoUrl: '/assets/Slow_pull_back_shot_A_person.mp4',
    summary: 'Korkmuş kedinin kendini savunmak için sergilediği tırmalama.', summaryEn: 'Defensive scratching when cat feels threatened.',
    causes: ['Yüksek sesler', 'Geçmiş travmalar'], causesEn: ['Loud noises', 'Past trauma'],
    dos: ['Yüksek saklanma alanları sunun'], dosEn: ['Provide high safe spots'],
    donts: ['Korkmuş kediye zorla sarılmayın'], dontsEn: ['Do not force hug a scared cat'],
    vetWarning: 'Süreç uzarsa veteriner kontrolü önerilir.', vetWarningEn: 'Consult vet if fear persists.',
    icon: 'ShieldAlert'
  },
  {
    id: 'redirected-aggression',
    title: 'Yönlendirilmiş Saldırganlık', titleEn: 'Redirected Aggression',
    subtitle: 'Dışarıdaki bir tetikleyiciyi görüp sahibine saldırma', subtitleEn: 'Attacking owner after outside trigger',
    category: 'aggression', severity: 'high', readTimeMinutes: 4, isPremium: true,
    videoUrl: '/assets/Medium_shot_A_cat_lunges_with.mp4',
    summary: 'Dışarıdaki kediye sinirlenen kedinin en yakınındaki kişiye saldırması.', summaryEn: 'Agitated cat redirects frustration on owner.',
    causes: ['Pencereden sokak kedisi görme'], causesEn: ['Spotting outdoor cats'],
    dos: ['Kediyi 2 saat karanlık odada dinlendirin'], dosEn: ['Isolate cat in dark room for 2 hours'],
    donts: ['Sinirli kediye dokunmayın'], dontsEn: ['Do not touch an aroused cat'],
    vetWarning: 'Yaralanma riski yüksektir.', vetWarningEn: 'High injury risk.',
    icon: 'AlertTriangle'
  },
  {
    id: 'territorial-aggression',
    title: 'Bölgesel Saldırganlık & Yeni Kedi', titleEn: 'Territorial Aggression & New Cat',
    subtitle: 'Çoklu kedi evlerinde aşamalı tanıştırma yöntemleri', subtitleEn: 'Gradual introduction for multi-cat homes',
    category: 'aggression', severity: 'high', readTimeMinutes: 5, isPremium: true,
    summary: 'Yeni gelen kediyi veya misafiri alanına alçaltmama tepkisi.', summaryEn: 'Defending territory against new cats.',
    causes: ['Koku paylaşımının yapılmaması'], causesEn: ['Lack of scent swapping'],
    dos: ['Kapı arkasından koku değişimi yapın'], dosEn: ['Swap scents under closed doors'],
    donts: ['Kedileri pat diye aynı odaya atmayın'], dontsEn: ['Never throw cats together immediately'],
    vetWarning: 'Kavgalar yaralanmaya yol açabilir.', vetWarningEn: 'Fights can cause severe injury.',
    icon: 'ShieldAlert'
  },
  {
    id: 'night-hyperactivity',
    title: 'Gece Hiperaktivitesi & Gece Saldırıları', titleEn: 'Night Hyperactivity & Zoomies',
    subtitle: 'Gece 3\'te koşturma ve yatakta ayak ısırma çözümü', subtitleEn: 'Solving 3 AM zoomies and bed biting',
    category: 'anxiety', severity: 'medium', readTimeMinutes: 4, isPremium: true,
    videoUrl: '/assets/Wide_tracking_shot_A_happy_sh.mp4',
    summary: 'Kedinin gece evde koşturması ve yataktaki ayaklara saldırması.', summaryEn: 'Nocturnal zoomies and toe biting.',
    causes: ['Gündüz enerjisini boşaltamaması'], causesEn: ['Unspent day energy'],
    dos: ['Yatmadan önce Av-Ye-Uyu rutini uygulayın'], dosEn: ['Do Hunt-Eat-Sleep routine before bed'],
    donts: ['Gece miyavlayınca kalkıp mama vermeyin'], dontsEn: ['Never get up to feed at night'],
    vetWarning: 'Yaşlı kedilerde demans belirtisi olabilir.', vetWarningEn: 'Senior vocalizing may indicate dementia.',
    icon: 'Moon'
  },
  {
    id: 'litter-box-issues',
    title: 'Kum Kabı Dışına Yapma Sorunu', titleEn: 'Litter Box Avoidance',
    subtitle: 'Medikal vs davranışsal kum reddi sebepleri', subtitleEn: 'Medical vs behavioral litter refusal',
    category: 'habits', severity: 'high', readTimeMinutes: 5, isPremium: true,
    videoUrl: '/assets/Slow_pull_back_shot_A_person.mp4',
    summary: 'Kedinin kum kabı yerine halıya çiş/kaka yapması.', summaryEn: 'Urinating outside the box on carpets.',
    causes: ['İdrar yolu enfeksiyonu', 'Kirli kum kabı'], causesEn: ['Urinary infection', 'Dirty box'],
    dos: ['İdrar tahlili için veterinere gidin'], dosEn: ['Visit vet for urine test first'],
    donts: ['Kedinin burnunu çişe sürteyim demeyin'], dontsEn: ['NEVER rub nose in urine'],
    vetWarning: 'Erkek kedilerde tıkanma ölümcüldür!', vetWarningEn: 'Blockage in males is fatal!',
    icon: 'AlertCircle'
  },
  {
    id: 'furniture-scratching',
    title: 'Mobilya & Koltuk Tırmalama', titleEn: 'Furniture & Sofa Scratching',
    subtitle: 'Koltuk köşelerini tırmalamadan koruma', subtitleEn: 'Stop claw damage on house furniture',
    category: 'habits', severity: 'low', readTimeMinutes: 3, isPremium: true,
    summary: 'Koltuk ve halıları tırmalayarak alan işaretleme.', summaryEn: 'Scratching sofas to mark territory.',
    causes: ['Tırmalama direğinin olmaması'], causesEn: ['Lack of proper scratching post'],
    dos: ['Koltuğun tam yanına sisal direk koyun'], dosEn: ['Put sisal post right next to sofa'],
    donts: ['Tırmaladığı için kediye bağırmayın'], dontsEn: ['Do not yell at cat for scratching'],
    vetWarning: 'Tırnak bakımı düzenli yapılmalıdır.', vetWarningEn: 'Maintain regular nail trims.',
    icon: 'Scissors'
  },
  {
    id: 'mating-aggression',
    title: 'Kızgınlık Dönemi Saldırganlığı & Miyavlama', titleEn: 'In-Heat Behavior & Aggression',
    subtitle: 'Kısırlaştırılmamış kedilerde hormonal huzursuzluk', subtitleEn: 'Hormonal restlessness in unneutered cats',
    category: 'aggression', severity: 'high', readTimeMinutes: 4, isPremium: true,
    summary: 'Kızgınlık dönemindeki yüksek sesli miyavlama ve kaçma çabaları.', summaryEn: 'Loud vocalizing and escape attempts during heat.',
    causes: ['Yüksek üreme hormonları'], causesEn: ['High reproductive hormones'],
    dos: ['Kısırlaştırma randevusu planlayın'], dosEn: ['Schedule spay/neuter surgery'],
    donts: ['Kızgınlıktaki kediye ceza vermeyin'], dontsEn: ['Do not punish a cat in heat'],
    vetWarning: 'Kısırlaştırma en sağlıklı çözümdür.', vetWarningEn: 'Spaying/neutering is best healthcare.',
    icon: 'ShieldAlert'
  },
  {
    id: 'visitor-anxiety',
    title: 'Eve Gelen Misafir Korkusu & Saklanma', titleEn: 'Visitor Phobia & Hiding',
    subtitle: 'Zil çaldığında yatak altına kaçan kediyi rahatlatma', subtitleEn: 'Calming cats that hide from guests',
    category: 'anxiety', severity: 'medium', readTimeMinutes: 4, isPremium: true,
    summary: 'Yabancı insanlardan korkup saatlerce yatak altında saklanma.', summaryEn: 'Hiding under beds for hours from guests.',
    causes: ['Yetersiz erken sosyalleşme'], causesEn: ['Lack of early kitten socialization'],
    dos: ['Misafirlerden kediye yaklaşmamalarını rica edin'], dosEn: ['Ask guests to ignore the cat initially'],
    donts: ['Kediyi saklandığı yerden zorla çekmeyin'], dontsEn: ['Never drag cat out from hiding'],
    vetWarning: 'Aşırı korkuda feliway sprey kullanın.', vetWarningEn: 'Use soothing pheromone sprays.',
    icon: 'Moon'
  },
  {
    id: 'separation-anxiety',
    title: 'Ayrılık Kaygısı & Yalnızlık Stresi', titleEn: 'Separation Anxiety in Cats',
    subtitle: 'Evde yalnız kaldığında ağlama ve eşyalara zarar verme', subtitleEn: 'Excessive meowing and distress when left alone',
    category: 'anxiety', severity: 'medium', readTimeMinutes: 4, isPremium: true,
    summary: 'Sahibi evden çıktığında kapı önünde sürekli ağlama.', summaryEn: 'Distress and crying when owner leaves house.',
    causes: ['Aşırı bağımlı bağlanma'], causesEn: ['Hyper-attachment to single owner'],
    dos: ['Evden çıkarken vedalaşmayı abartmayın'], dosEn: ['Keep departures low-key without fuss'],
    donts: ['Giderken uzun uzun sarılmayın'], dontsEn: ['Avoid dramatic long goodbyes'],
    vetWarning: 'Zeka oyuncakları ile yalnızlığı eğlenceli kılın.', vetWarningEn: 'Provide puzzle feeders while away.',
    icon: 'Moon'
  },
  {
    id: 'food-aggression',
    title: 'Mama Korumacılığı & Yemek Saldırganlığı', titleEn: 'Food Guarding & Aggression',
    subtitle: 'Mama kabına yaklaşıldığında hırlama ve tırmalama', subtitleEn: 'Growling or swatting near food bowl',
    category: 'aggression', severity: 'medium', readTimeMinutes: 4, isPremium: true,
    summary: 'Yemek yerken yanına yaklaşan insana veya kediye hırlama.', summaryEn: 'Growling when anyone nears food bowl.',
    causes: ['Geçmişte aç kalma travması'], causesEn: ['Past starvation trauma'],
    dos: ['Kedilerin mama kaplarını ayrı odalara koyun'], dosEn: ['Feed multi-cats in separate rooms'],
    donts: ['Yemek yerken elinizi kabın içine sokmayın'], dontsEn: ['Do not put hands near bowl while eating'],
    vetWarning: 'Açlık stresi mide ülserine yol açabilir.', vetWarningEn: 'Hunger stress can cause stomach issues.',
    icon: 'AlertTriangle'
  },
  {
    id: 'petting-aggression',
    title: 'Okşanırken Birden Isırma (Overstimulation)', titleEn: 'Petting-Induced Aggression',
    subtitle: 'Sevilirken aniden pati atma ve ısırma sebepleri', subtitleEn: 'Sudden biting during cuddling',
    category: 'aggression', severity: 'medium', readTimeMinutes: 4, isPremium: true,
    summary: 'Kedi sevilirken bir anda durup elinizi ısırması.', summaryEn: 'Sudden nip after enjoying petting.',
    causes: ['Dokunsal aşırı uyarılma (Overstimulation)'], causesEn: ['Tactile overstimulation on skin'],
    dos: ['Beden dilini takip edin (kuyruk seğirmesi = dur!)'], dosEn: ['Watch body language (tail twitch = stop!)'],
    donts: ['Kuyruğuna ve karnına sert dokunmayın'], dontsEn: ['Avoid rough petting on belly or tail'],
    vetWarning: 'Cilt hassasiyeti ve ağrı kontrolü yaptırın.', vetWarningEn: 'Rule out skin pain or arthritis.',
    icon: 'Zap'
  },
  {
    id: 'noise-phobia',
    title: 'Yüksek Ses & Fırtına/Flaş Korkusu', titleEn: 'Thunderstorm & Noise Phobia',
    subtitle: 'Gök gürültüsü ve havai fişek sesinde sakinleştirme', subtitleEn: 'Calming cats during fireworks & storms',
    category: 'anxiety', severity: 'medium', readTimeMinutes: 3, isPremium: true,
    summary: 'Fırtına ve patlama seslerinde titreme ve saklanma.', summaryEn: 'Trembling and panic during loud fireworks.',
    causes: ['Akustik hassasiyet'], causesEn: ['Sensitive feline acoustic range'],
    dos: ['Pencereleri kapatıp beyaz gürültü açın'], dosEn: ['Close windows and turn on white noise'],
    donts: ['Korktuğunda ona panikle yaklaşmayın'], dontsEn: ['Do not panic or rush to comfort dramatically'],
    vetWarning: 'Şiddetli vakalarda veteriner sakinleştirici önerir.', vetWarningEn: 'Vets can prescribe anxiety meds for storms.',
    icon: 'Moon'
  },
  {
    id: 'vet-visit-trauma',
    title: 'Veteriner Dönüşü Diğer Kediye Saldırma', titleEn: 'Non-Recognition Aggression',
    subtitle: 'Klinik kokusu yüzünden evdeki kedilerin kavga etmesi', subtitleEn: 'Attacking housemate cat returning from vet',
    category: 'aggression', severity: 'high', readTimeMinutes: 4, isPremium: true,
    summary: 'Veterinerden dönen kediye evdeki diğer kedinin saldırması.', summaryEn: 'Resident cat attacking returning cat due to clinic smell.',
    causes: ['Klinik ilaç ve dezenfektan kokusu'], causesEn: ['Unfamiliar clinic & disinfectant scents'],
    dos: ['Dönen kediyi havlu ile ovup 2 saat ayrı tutun'], dosEn: ['Rub returning cat with home towel and isolate for 2h'],
    donts: ['Kutudan çıkar çıkmaz yan yana getirmeyin'], dontsEn: ['Never release returning cat directly together'],
    vetWarning: 'Kavga başlarsa hemen ayırın.', vetWarningEn: 'Separate immediately if fight erupts.',
    icon: 'AlertTriangle'
  },
  {
    id: 'wool-sucking',
    title: 'Kumaş & İp Emme/Yutma (Pica Sendromu)', titleEn: 'Pica & Fabric Eating Syndrome',
    subtitle: 'Battaniye emme ve yabancı cisim yutma tehlikesi', subtitleEn: 'Sucking blankets and eating non-food items',
    category: 'habits', severity: 'high', readTimeMinutes: 4, isPremium: true,
    summary: 'Kedinin battaniye, çorap veya ip çiğneyip yutması.', summaryEn: 'Chewing and swallowing socks, strings, or blankets.',
    causes: ['Erken sütten kesilme', 'Pica sendromu'], causesEn: ['Early weaning', 'Pica syndrome'],
    dos: ['Evdeli tüm ipleri ve küçük objeleri kaldırın'], dosEn: ['Remove all loose strings and small objects'],
    donts: ['Ağzından ip sarkıyorsa çekip çekmeyin!'], dontsEn: ['NEVER pull a string hanging from mouth/anus!'],
    vetWarning: 'Yutulan ip bağırsak düğümlenmesine yol açar, ACİL tıbbi durumdur!', vetWarningEn: 'Swallowed string causes intestinal blockage, EMERGENCY!',
    icon: 'AlertCircle'
  },
  {
    id: 'excessive-grooming',
    title: 'Aşırı Yalanma & Tüy Dökme (Psychogenic Alopecia)', titleEn: 'Psychogenic Alopecia & Over-Grooming',
    subtitle: 'Stres kaynaklı karnını ve bacaklarını kelliğe kadar yalama', subtitleEn: 'Licking belly bald due to stress & anxiety',
    category: 'anxiety', severity: 'high', readTimeMinutes: 4, isPremium: true,
    summary: 'Stres yüzünden tüylerini dökene kadar yalanma.', summaryEn: 'Licking fur until skin becomes bald.',
    causes: ['Evdeki değişiklikler', 'Pire alerjisi'], causesEn: ['Household changes', 'Flea allergy dermatitis'],
    dos: ['Deride yara var mı diye veteriner muayenesi yaptırın'], dosEn: ['Get vet skin exam to rule out parasites'],
    donts: ['Yalandığı için kediye bağırmayın'], dontsEn: ['Do not scold cat for grooming'],
    vetWarning: 'Pire alerjisi ve gıda alerjisi eksize edilmelidir.', vetWarningEn: 'Rule out flea & food allergies first.',
    icon: 'AlertCircle'
  },
  {
    id: 'window-frustration',
    title: 'Kuş/Kedi Görüp Miyavlama ve Ağlama Stresi', titleEn: 'Window Frustration & Chattering',
    subtitle: 'Penceredeki avı yakalayamama stresini çözme', subtitleEn: 'Frustration from uncatchable prey behind glass',
    category: 'anxiety', severity: 'low', readTimeMinutes: 3, isPremium: true,
    summary: 'Pencereden kuş görüp garip sesler çıkarma ve hırçınlaşma.', summaryEn: 'Chattering teeth and pacing at windows.',
    causes: ['Yakalanabilir av algısı ve cam engeli'], causesEn: ['Visual prey stimulation without physical catch'],
    dos: ['Kuşu gördüğü an oltalı oyuncakla avı tamamlatın'], dosEn: ['Redirect with wand toy so cat completes the catch'],
    donts: ['Kedi bu haldeyken kucağa almayın'], dontsEn: ['Do not pick up cat during window pacing'],
    vetWarning: 'Stres birikimi yönlendirilmiş saldırganlığa dönebilir.', vetWarningEn: 'Build-up of frustration causes redirected aggression.',
    icon: 'Zap'
  },
  {
    id: 'moving-house-stress',
    title: 'Taşınma & Yeni Ev Uyum Süreci', titleEn: 'Moving House Stress & Adaptation',
    subtitle: 'Yeni eve taşınırken kedinin kaygısını sıfırlama', subtitleEn: 'Smooth house move transition for cats',
    category: 'anxiety', severity: 'medium', readTimeMinutes: 5, isPremium: true,
    summary: 'Yeni eve geçildiğinde günlerce saklanma ve korku.', summaryEn: 'Hiding and territorial distress after moving.',
    causes: ['Bölge koku haritasının kaybolması'], causesEn: ['Loss of familiar scent map in new house'],
    dos: ['Yeni evde önce tek bir odaya alıştırın'], dosEn: ['Confine cat to one safe room first'],
    donts: ['Tüm evi aynı gün açmayın'], dontsEn: ['Do not give access to whole house on day 1'],
    vetWarning: 'Feliway difüzör taşınma günlerinde etkilidir.', vetWarningEn: 'Pheromone diffusers aid moving day comfort.',
    icon: 'Moon'
  },
  {
    id: 'baby-introduction',
    title: 'Eve Yeni Bebek / Çocuk Gelmesi', titleEn: 'Introducing Cat to New Baby',
    subtitle: 'Bebek sesleri ve kokusuna kediyi alıştırma', subtitleEn: 'Preparing cat for newborn baby arrival',
    category: 'anxiety', severity: 'medium', readTimeMinutes: 5, isPremium: true,
    summary: 'Bebek ağlaması ve yeni kokular karşısında huzursuzluk.', summaryEn: 'Restlessness and stress over newborn sounds.',
    causes: ['İlginin azalması ve yüksek bebek sesleri'], causesEn: ['Shift in owner attention & crying noises'],
    dos: ['Doğumdan önce bebek losyonu kokusunu koklatın'], dosEn: ['Introduce baby lotion scents prior to birth'],
    donts: ['Bebeği kedinin yüzüne aniden yaklaştırmayın'], dontsEn: ['Never force immediate face-to-face contact'],
    vetWarning: 'Bebek ile kedi asla yalnız bırakılmamalıdır.', vetWarningEn: 'Never leave infants and cats unsupervised.',
    icon: 'ShieldAlert'
  },
  {
    id: 'senior-cat-dementia',
    title: 'Yaşlı Kedi Unutkanlığı & Demans', titleEn: 'Senior Cat Cognitive Dysfunction',
    subtitle: '12 yaş üzeri kedilerde gece ağlaması ve kafa karışıklığı', subtitleEn: 'Managing dementia in cats over 12 years old',
    category: 'anxiety', severity: 'high', readTimeMinutes: 5, isPremium: true,
    summary: 'Yaşlı kedinin evde yolunu kaybetmesi ve gece bağırması.', summaryEn: 'Disorientation and night howling in senior cats.',
    causes: ['Beyin yaşlanması (CDS - Cognitive Dysfunction)'], causesEn: ['Brain aging & feline cognitive decline'],
    dos: ['Gece koridora gece lambası takın'], dosEn: ['Install nightlights in hallways for vision'],
    donts: ['Evdeki mobilyaların yerini sık değiştirmeyin'], dontsEn: ['Do not rearrange furniture frequently'],
    vetWarning: 'Veteriner hekiminizden beyin destekleyici Omega-3 isteyin.', vetWarningEn: 'Vets can prescribe Omega-3 & brain antioxidants.',
    icon: 'AlertCircle'
  }
];

export const getLocalizedBehaviorArticle = (article: BehaviorArticle, lang: string): BehaviorArticle => {
  if (lang === 'tr') return article;

  return {
    ...article,
    title: article.titleEn || article.title,
    subtitle: article.subtitleEn || article.subtitle,
    summary: article.summaryEn || article.summary,
    causes: article.causesEn || article.causes,
    dos: article.dosEn || article.dos,
    donts: article.dontsEn || article.donts,
    vetWarning: article.vetWarningEn || article.vetWarning,
  };
};
