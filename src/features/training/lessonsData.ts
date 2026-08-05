export interface LessonStep {
  stepNumber: number;
  title: string;
  titleEn?: string;
  instruction: string;
  instructionEn?: string;
  tip?: string;
  tipEn?: string;
  imagePrompt?: string;
}

export interface Lesson {
  id: string;
  title: string;
  titleEn?: string;
  subtitle: string;
  subtitleEn?: string;
  category: 'basic' | 'tricks' | 'care' | 'behavior';
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  isPremium: boolean;
  goal: string;
  goalEn?: string;
  materials: string[];
  materialsEn?: string[];
  steps: LessonStep[];
  commonMistakes: string[];
  commonMistakesEn?: string[];
  icon: string;
  summary: string;
  summaryEn?: string;
  videoUrl?: string;
}

export const LESSONS_DATA: Lesson[] = [
  // 1. FREE LESSON
  {
    id: 'recall',
    title: 'İsmine Gelme (Recall)',
    titleEn: 'Name Recall Training',
    subtitle: 'Kedinizin seslendiğinizde koşarak gelmesini sağlayın',
    subtitleEn: 'Get your cat to run to you when called',
    category: 'basic',
    difficulty: 'easy',
    estimatedMinutes: 3,
    isPremium: false,
    goal: 'Kedinizin ismi söylendiğinde 3 saniye içinde tepki verip yanınıza gelmesi.',
    goalEn: 'Cat responds to name within 3 seconds and approaches you.',
    materials: ['Yüksek değerli ödül maması', 'Clicker (isteğe bağlı)'],
    materialsEn: ['High-value treats', 'Clicker (optional)'],
    summary: 'İsmine gelme eğitimi acil durumlarda kedinizin güvenliği için en hayati temel eğitimdir.',
    summaryEn: 'Recall training is vital for your cat\'s safety in emergency situations.',
    icon: 'Megaphone',
    videoUrl: '/assets/Camera_Smooth_dolly_backward.mp4',
    steps: [
      { stepNumber: 1, title: 'Dikkat Çekin', titleEn: 'Attract Attention', instruction: 'Kediden 2m uzakta durup adını neşeli tonda söyleyin.', instructionEn: 'Stand 2m away and call name cheerfully.', tip: 'Kızgın ses tonu kullanmayın.', tipEn: 'Never use angry tone.' },
      { stepNumber: 2, title: 'Zamanında Ödüllendirin', titleEn: 'Reward On Time', instruction: 'Adım attığı an click yapıp ödülü verin.', instructionEn: 'Click and reward the moment cat moves toward you.', tip: 'Zamanlama 1 saniye içinde olmalı.', tipEn: 'Deliver treat within 1 second.' }
    ],
    commonMistakes: ['Çağırdıktan sonra sevmediği bir şey yapmak', 'İsmini çok fazla tekrarlamak'],
    commonMistakesEn: ['Doing unpleasant tasks right after recall', 'Repeating name excessively']
  },

  // 2 - 30 PRO LESSONS
  {
    id: 'target-stick',
    title: 'Target Çubuğu / Ele Dokunma', titleEn: 'Target Stick & Nose Touch',
    subtitle: 'Kediyi istediğiniz noktaya yönlendirmenin en kolay yolu', subtitleEn: 'Easily guide your cat to any designated spot',
    category: 'basic', difficulty: 'easy', estimatedMinutes: 3, isPremium: true,
    goal: 'Kedinin hedef çubuğunun ucuna burnuyla dokunması.', goalEn: 'Cat touches target stick tip with nose.',
    materials: ['Target çubuğu', 'Ödül maması'], materialsEn: ['Target stick', 'Treats'],
    summary: 'Target eğitimi taşıma çantası ve numara eğitimlerinin temel taşıdır.', summaryEn: 'Cornerstone for crate and trick training.',
    icon: 'Target', videoUrl: '/assets/Camera_Slow_zoom_in_on_cat_s.mp4',
    steps: [{ stepNumber: 1, title: 'Çubuğu Uzatın', titleEn: 'Present Stick', instruction: 'Çubuğu burnunun 2 cm uzağında tutun.', instructionEn: 'Hold stick 2cm from nose.', tip: 'Yüzüne dürtmeyin.', tipEn: 'Do not poke face.' }],
    commonMistakes: ['Çubuğu itmek'], commonMistakesEn: ['Pushing stick into face']
  },
  {
    id: 'sit',
    title: 'Otur Komutu', titleEn: 'Sit Command',
    subtitle: 'Mama öncesi özdenetim ve sabır kazandırın', subtitleEn: 'Teach self-control before meals',
    category: 'basic', difficulty: 'easy', estimatedMinutes: 3, isPremium: true,
    goal: 'Kedinin sözel komutla oturması.', goalEn: 'Cat sits on command.',
    materials: ['Ödül maması'], materialsEn: ['Treats'],
    summary: 'Kedilerde özdenetim geliştirir ve mama saati heyecanını dengeler.', summaryEn: 'Builds impulse control during feeding.',
    icon: 'UserCheck', videoUrl: '/assets/create_video_Camera_Eye_leve.mp4',
    steps: [{ stepNumber: 1, title: 'Ödülü Yukarı Yönlendirin', titleEn: 'Lure Treat Up', instruction: 'Ödülü burnunun üstünden arkaya kaydırın.', instructionEn: 'Move treat slightly over head.', tip: 'Zıplatmayın.', tipEn: 'Don\'t jump.' }],
    commonMistakes: ['Elle bastırmak'], commonMistakesEn: ['Pushing down on hips']
  },
  {
    id: 'high-five',
    title: 'Pati Ver / Çak Bir Beşlik', titleEn: 'High Five & Paw Touch',
    subtitle: 'Kedinizin özgüvenini artıran eğlenceli numara', subtitleEn: 'Fun trick to boost cat confidence',
    category: 'tricks', difficulty: 'medium', estimatedMinutes: 4, isPremium: true,
    goal: 'Kedinin patisini avucunuza dokundurması.', goalEn: 'Cat touches open palm with paw.',
    materials: ['Ödül maması'], materialsEn: ['Treats'],
    summary: 'Kedi ile insan arasında eğlenceli bağ kurmayı sağlar.', summaryEn: 'Fun bonding trick for cat and owner.',
    icon: 'Sparkles', videoUrl: '/assets/create_video_Camera_Macro_cl.mp4',
    steps: [{ stepNumber: 1, title: 'Pati Kaldırmayı Ödüllendirin', titleEn: 'Reward Paw Lift', instruction: 'Pati kaldırdığı an tıklayın.', instructionEn: 'Click when paw lifts.', tip: 'Sabırlı olun.', tipEn: 'Be patient.' }],
    commonMistakes: ['Patiyi zorla tutmak'], commonMistakesEn: ['Grabbing paw forcibly']
  },
  {
    id: 'carrier',
    title: 'Taşıma Kabına Alıştırma', titleEn: 'Carrier & Crate Conditioning',
    subtitle: 'Stressiz veteriner ziyaretleri ve seyahatler', subtitleEn: 'Stress-free vet visits and travel',
    category: 'care', difficulty: 'medium', estimatedMinutes: 5, isPremium: true,
    goal: 'Kedinin taşıma kabına kendi isteğiyle girmesi.', goalEn: 'Cat enters carrier voluntarily.',
    materials: ['Taşıma kutusu', 'Catnip'], materialsEn: ['Carrier', 'Catnip'],
    summary: 'Veteriner yolculuğundaki stresi tamamen ortadan kaldırır.', summaryEn: 'Eliminates travel stress.',
    icon: 'Box', videoUrl: '/assets/Slow_pull_back_shot_A_person.mp4',
    steps: [{ stepNumber: 1, title: 'Kutuyu Odada Açık Tutun', titleEn: 'Keep Carrier Open', instruction: 'Taşıma kabını sürekli odada tutun.', instructionEn: 'Leave carrier open indoors 24/7.', tip: 'Kapıyı kapatmayın.', tipEn: 'Don\'t shut door.' }],
    commonMistakes: ['Zorla tıkıştırmak'], commonMistakesEn: ['Forcing cat inside']
  },
  {
    id: 'harness',
    title: 'Tasma & Göğüslük Eğitimi', titleEn: 'Harness & Leash Walking',
    subtitle: 'Güvenli açık hava keşifleri', subtitleEn: 'Safe outdoor exploration with your cat',
    category: 'care', difficulty: 'hard', estimatedMinutes: 5, isPremium: true,
    goal: 'Kedinin göğüslükle evde rahatça yürümesi.', goalEn: 'Cat walks comfortably wearing harness.',
    materials: ['H-tipi göğüslük'], materialsEn: ['H-style harness'],
    summary: 'Kaçma riski olmadan dış dünyayı keşfetmesini sağlar.', summaryEn: 'Allows safe outdoor stimulation.',
    icon: 'Shield', videoUrl: '/assets/Side_profile_shot_A_cat_weari.mp4',
    steps: [{ stepNumber: 1, title: 'Koklatıp Ödüllendirin', titleEn: 'Sniff and Reward', instruction: 'Göğüslüğü koklatıp mamalar yedirin.', instructionEn: 'Let cat sniff harness and give treats.', tip: 'Acele etmeyin.', tipEn: 'Don\'t rush.' }],
    commonMistakes: ['Hemen dışarı çıkarmak'], commonMistakesEn: ['Heading outside immediately']
  },
  {
    id: 'scratching',
    title: 'Tırmalama Tahtası Yönlendirme', titleEn: 'Scratching Post Training',
    subtitle: 'Koltuk ve mobilyalarınızı koruyun', subtitleEn: 'Protect your furniture and carpets',
    category: 'behavior', difficulty: 'easy', estimatedMinutes: 3, isPremium: true,
    goal: 'Kedinin tırmalama direğini tercih etmesi.', goalEn: 'Cat uses scratching post instead of sofa.',
    materials: ['Tırmalama direği'], materialsEn: ['Scratching post'],
    summary: 'Tırmalama dürtüsünü koltuklardan tahtaya yönlendirir.', summaryEn: 'Redirects clawing to post.',
    icon: 'Feather', videoUrl: '/assets/Camera_Vertical_pan_upward_.mp4',
    steps: [{ stepNumber: 1, title: 'Koltuğun Yanına Koyun', titleEn: 'Place Beside Sofa', instruction: 'Tırmalama direğini koltuk yanına yerleştirin.', instructionEn: 'Place post right next to sofa.', tip: 'Catnip sıkın.', tipEn: 'Spray catnip.' }],
    commonMistakes: ['Kötü köşeye saklamak'], commonMistakesEn: ['Hiding post away']
  },
  {
    id: 'litter-box',
    title: 'Kum Kabı Hijyeni ve Alışkanlığı', titleEn: 'Litter Box Routine',
    subtitle: 'Kum kabı dışına yapma sorunlarını önleyin', subtitleEn: 'Prevent litter box avoidance',
    category: 'behavior', difficulty: 'easy', estimatedMinutes: 3, isPremium: true,
    goal: 'Kedinin kum kabını stressiz kullanması.', goalEn: 'Cat uses litter box stress-free.',
    materials: ['Temiz kum'], materialsEn: ['Clean litter'],
    summary: 'Kum kabı hijyen standartlarının sağlanması.', summaryEn: 'Ensures litter box acceptance.',
    icon: 'CheckCircle2', videoUrl: '/assets/Camera_Medium_shot_static_a.mp4',
    steps: [{ stepNumber: 1, title: 'Günde En Az 1 Kez Temizleyin', titleEn: 'Scoop Daily', instruction: 'Topaklaşan kumu her gün temizleyin.', instructionEn: 'Scoop clumps daily.', tip: 'Parfümsüz kum kullanın.', tipEn: 'Use unscented litter.' }],
    commonMistakes: ['Kirli bırakmak'], commonMistakesEn: ['Leaving box dirty']
  },
  {
    id: 'spin',
    title: 'Kendi Etrafında Dönme (Spin)', titleEn: 'Spin in Circles',
    subtitle: 'Daire çizerek 360 derece dönme eğitimi', subtitleEn: 'Teach cat to spin 360 degrees',
    category: 'tricks', difficulty: 'medium', estimatedMinutes: 3, isPremium: true,
    goal: 'Kedinin işaret diliyle daire çizerek dönmesi.', goalEn: 'Cat spins 360 degrees on cue.',
    materials: ['Ödül maması'], materialsEn: ['Treats'],
    summary: 'Zihinsel uyarım sağlayan neşeli bir hareket.', summaryEn: 'Great trick for mental enrichment.',
    icon: 'RotateCcw', videoUrl: '/assets/Camera_High_angle_top_down_v.mp4',
    steps: [{ stepNumber: 1, title: 'Elinizle Daire Çizin', titleEn: 'Lure in Circle', instruction: 'Ödülü dairesel hareketle çevirin.', instructionEn: 'Move treat in circle around cat.', tip: 'Dönüş tamamlanınca ödüllendirin.', tipEn: 'Reward when spin completes.' }],
    commonMistakes: ['Hızlı el hareketi'], commonMistakesEn: ['Moving hand too fast']
  },
  {
    id: 'stay',
    title: 'Bekle / Kal Komutu (Stay)', titleEn: 'Stay & Wait Command',
    subtitle: 'Kapı açıldığında dışarı fırlamayı önleyin', subtitleEn: 'Prevent door bolting and rush',
    category: 'basic', difficulty: 'hard', estimatedMinutes: 4, isPremium: true,
    goal: 'Kedinin işaret verilen noktada sabit beklemesi.', goalEn: 'Cat stays in place until released.',
    materials: ['Mat veya Yatak'], materialsEn: ['Mat or Bed'],
    summary: 'Açık kapı güvenliği için kritik komuttur.', summaryEn: 'Essential for open door safety.',
    icon: 'UserCheck', videoUrl: '/assets/Camera_Static_wide_shot_A_c.mp4',
    steps: [{ stepNumber: 1, title: 'Bekle El İşareti Yapın', titleEn: 'Give Stay Hand Cue', instruction: 'Açık avucunuzla bekle işareti verip 2 saniye bekleyin.', instructionEn: 'Show open palm cue and wait 2 seconds.', tip: 'Süreyi yavaşça artırın.', tipEn: 'Increase duration gradually.' }],
    commonMistakes: ['Acele etmek'], commonMistakesEn: ['Rushing duration']
  },
  {
    id: 'down',
    title: 'Yat Komutu (Lay Down)', titleEn: 'Lay Down Command',
    subtitle: 'Dirseklerini yere koyarak uzanma eğitimi', subtitleEn: 'Teach cat to lie down on belly',
    category: 'basic', difficulty: 'medium', estimatedMinutes: 4, isPremium: true,
    goal: 'Kedinin sözel komutla yere yatması.', goalEn: 'Cat lies flat on belly on command.',
    materials: ['Ödül maması'], materialsEn: ['Treats'],
    summary: 'Sakinleşme ve rahatlama için ideal bir davranıştır.', summaryEn: 'Promotes calmness and relaxation.',
    icon: 'UserCheck', videoUrl: '/assets/Camera_Low_angle_slow_tilt_d.mp4',
    steps: [{ stepNumber: 1, title: 'Ödülü Yere Yönlendirin', titleEn: 'Lure Treat to Floor', instruction: 'Ödülü burnundan aşağı yere indirin.', instructionEn: 'Lower treat straight to floor.', tip: 'Dirsekler değince ödüllendirin.', tipEn: 'Reward when elbows touch floor.' }],
    commonMistakes: ['Elle ittirmek'], commonMistakesEn: ['Physically pushing cat']
  },
  {
    id: 'shake-hands',
    title: 'El Sıkışma (Paw Shake)', titleEn: 'Paw Shake Trick',
    subtitle: 'Patisiyle elinizi nazikçe tokalaşma', subtitleEn: 'Gentle paw shake greeting',
    category: 'tricks', difficulty: 'medium', estimatedMinutes: 3, isPremium: true,
    goal: 'Kedinin patisini elinize koyup tutması.', goalEn: 'Cat places paw gently in your hand.',
    materials: ['Ödül maması'], materialsEn: ['Treats'],
    summary: 'Misafirlere gösterilecek sevimli bir selamlaşma.', summaryEn: 'Adorable greeting trick for visitors.',
    icon: 'Sparkles', videoUrl: '/assets/create_video_Camera_Close_up.mp4',
    steps: [{ stepNumber: 1, title: 'Avucunuzu Açın', titleEn: 'Open Palm', instruction: 'Elinizi açık tutun, patisini koyunca ödüllendirin.', instructionEn: 'Hold open hand, reward when paw touches.', tip: 'Patiyi sıkmayın.', tipEn: 'Do not squeeze paw.' }],
    commonMistakes: ['Sıkı tutmak'], commonMistakesEn: ['Squeezing paw']
  },
  {
    id: 'jump-hoop',
    title: 'Çemberden Atlama (Hoop Jump)', titleEn: 'Hoop Jump Agility',
    subtitle: 'Halka veya çemberin içinden süzülerek atlama', subtitleEn: 'Agility jump through a hoop',
    category: 'tricks', difficulty: 'hard', estimatedMinutes: 5, isPremium: true,
    goal: 'Kedinin havada duran çemberden geçmesi.', goalEn: 'Cat leaps cleanly through hoop.',
    materials: ['Plastik hulahop / Çember'], materialsEn: ['Hula hoop'],
    summary: 'Çeviklik ve fiziksel egzersiz sağlar.', summaryEn: 'Builds agility and physical stamina.',
    icon: 'Sparkles', videoUrl: '/assets/Camera_Slow_motion_fps_si.mp4',
    steps: [{ stepNumber: 1, title: 'Çemberi Yere Yakın Tutun', titleEn: 'Hold Hoop Low', instruction: 'İlk adımlarda hulahopu yere değecek hizada tutun.', instructionEn: 'Hold hoop touching floor first.', tip: 'Yüksekliği yavaşça artırın.', tipEn: 'Raise height gradually.' }],
    commonMistakes: ['Çok yüksek tutmak'], commonMistakesEn: ['Holding hoop too high']
  },
  {
    id: 'ring-bell',
    title: 'Zil Çalma (Ring Bell for Treats)', titleEn: 'Ring Bell for Food',
    subtitle: 'Resepsiyon ziline patisiyle basma eğitimi', subtitleEn: 'Teach cat to press desk bell',
    category: 'tricks', difficulty: 'medium', estimatedMinutes: 4, isPremium: true,
    goal: 'Kedinin masadaki zile patisiyle basması.', goalEn: 'Cat taps desk bell with paw.',
    materials: ['Resepsiyon zili'], materialsEn: ['Desk bell'],
    summary: 'Sosyal medyada çok sevilen ikonik numara.', summaryEn: 'Iconic viral trick loved on social media.',
    icon: 'Sparkles', videoUrl: '/assets/create_video_Camera_Extreme.mp4',
    steps: [{ stepNumber: 1, title: 'Zile Dokunmayı Ödüllendirin', titleEn: 'Reward Bell Touch', instruction: 'Zile her pati temasında click atın ve mama verin.', instructionEn: 'Click and treat every bell touch.', tip: 'Ses çıkınca ödül miktarını artırın.', tipEn: 'Big reward on ring sound.' }],
    commonMistakes: ['Ses çıkmadan mama vermek'], commonMistakesEn: ['Treating without ring sound']
  },
  {
    id: 'go-to-bed',
    title: 'Yatağına Git Komutu (Go to Bed)', titleEn: 'Go to Bed Command',
    subtitle: 'Yemek yerken masadan uzak tutma çözümü', subtitleEn: 'Keep cat away from dining table',
    category: 'behavior', difficulty: 'medium', estimatedMinutes: 4, isPremium: true,
    goal: 'Kedinin "Yatağına git" denince yatağına yönelmesi.', goalEn: 'Cat goes to designated bed on cue.',
    materials: ['Kedi yatağı'], materialsEn: ['Cat bed'],
    summary: 'Yemek masasına tırmanma alışkanlığını çözer.', summaryEn: 'Solves table jumping during dinner.',
    icon: 'Box', videoUrl: '/assets/create_video_Camera_Panning.mp4',
    steps: [{ stepNumber: 1, title: 'Yatağa Mamalar Bırakın', titleEn: 'Place Treats in Bed', instruction: 'Kediyi yatağa yönlendirip mamayı yatakta verin.', instructionEn: 'Guide cat to bed and feed treats there.', tip: 'Yatağı huzurlu alana koyun.', tipEn: 'Place bed in quiet spot.' }],
    commonMistakes: ['Masa yanına koymak'], commonMistakesEn: ['Placing bed near table']
  },
  {
    id: 'stand-up',
    title: 'İki Ayak Üstünde Durma (Stand Up)', titleEn: 'Stand on Hind Legs',
    subtitle: 'Tıpkı mırkat gibi 2 ayak üstüne kalkma', subtitleEn: 'Meerkat pose on hind legs',
    category: 'tricks', difficulty: 'easy', estimatedMinutes: 3, isPremium: true,
    goal: 'Kedinin 2 arka ayağı üstünde dengede durması.', goalEn: 'Cat stands up on hind legs.',
    materials: ['Ödül maması'], materialsEn: ['Treats'],
    summary: 'Arka bacak kaslarını güçlendirir.', summaryEn: 'Strengthens hind leg muscles.',
    icon: 'Sparkles', videoUrl: '/assets/create_video_Camera_Vertical.mp4',
    steps: [{ stepNumber: 1, title: 'Ödülü Yüksekte Tutun', titleEn: 'Hold Treat Up', instruction: 'Ödülü havada tutup ayağa kalkmasını bekleyin.', instructionEn: 'Hold treat up and wait for bipedal stand.', tip: 'Dengede durunca tıklayın.', tipEn: 'Click when balanced.' }],
    commonMistakes: ['Çok yüksek tutmak'], commonMistakesEn: ['Holding treat out of reach']
  },
  {
    id: 'wave',
    title: 'El Sallama (Wave Bye-Bye)', titleEn: 'Wave Bye-Bye',
    subtitle: 'Havada patisini sallayarak vedalaşma', subtitleEn: 'Wave paw in the air',
    category: 'tricks', difficulty: 'hard', estimatedMinutes: 5, isPremium: true,
    goal: 'Kedinin patisini havada 2 kez sallaması.', goalEn: 'Cat waves paw in the air.',
    materials: ['Ödül maması'], materialsEn: ['Treats'],
    summary: 'İleri düzey şirinlik numarasıdır.', summaryEn: 'Advanced cute wave trick.',
    icon: 'Sparkles', videoUrl: '/assets/create_video_Camera_Close_up (1).mp4',
    steps: [{ stepNumber: 1, title: 'Patiyi Havada Ödüllendirin', titleEn: 'Reward Air Paw', instruction: 'Patiyi havada sallayınca click atın.', instructionEn: 'Click when paw waves in air.', tip: 'Sabır gerektirir.', tipEn: 'Requires patience.' }],
    commonMistakes: ['Erken vazgeçmek'], commonMistakesEn: ['Giving up early']
  },
  {
    id: 'kiss',
    title: 'Öpücük Verme (Nose Kiss)', titleEn: 'Nose Kiss Touch',
    subtitle: 'Yanağınıza veya burnunuza burnunu dokundurma', subtitleEn: 'Gentle nose touch to cheek',
    category: 'tricks', difficulty: 'easy', estimatedMinutes: 3, isPremium: true,
    goal: 'Kedinin burnunu yüzünüze nazikçe dokundurması.', goalEn: 'Cat touches nose to your cheek.',
    materials: ['Ödül maması'], materialsEn: ['Treats'],
    summary: 'Duygusal bağı pekiştirir.', summaryEn: 'Strengthens emotional bond.',
    icon: 'Sparkles', videoUrl: '/assets/create_video___Camera_Push_in.mp4',
    steps: [{ stepNumber: 1, title: 'Yanağınızı Yaklaştırın', titleEn: 'Present Cheek', instruction: 'Yanağınızı gösterin, burnunu değdirince tıklayın.', instructionEn: 'Present cheek, click when nose touches.', tip: 'Ani hareket yapmayın.', tipEn: 'Avoid sudden movements.' }],
    commonMistakes: ['Korkutmak'], commonMistakesEn: ['Startling cat']
  },
  {
    id: 'fetch',
    title: 'Top Getirme (Fetch Game)', titleEn: 'Fetch Ball Game',
    subtitle: 'Atılan yumuşak topu ağzında geri getirme', subtitleEn: 'Retrieve thrown toy ball',
    category: 'tricks', difficulty: 'hard', estimatedMinutes: 6, isPremium: true,
    goal: 'Kedinin atılan oyuncağı getirip önünüze bırakması.', goalEn: 'Cat retrieves toy and drops at feet.',
    materials: ['Yumuşak ponpon top'], materialsEn: ['Soft pompom ball'],
    summary: 'Avcılık dürtüsünü ve enerjisini boşaltır.', summaryEn: 'Channels hunting energy through fetch.',
    icon: 'Sparkles', videoUrl: '/assets/create_video_Camera_Dynamic.mp4',
    steps: [{ stepNumber: 1, title: 'Topu Yakına Atın', titleEn: 'Throw Ball Short', instruction: 'Topu 1m ileri atın, ağzına alınca tıklayın.', instructionEn: 'Toss ball 1m away, click when picked up.', tip: 'Hafif ponpon top kullanın.', tipEn: 'Use lightweight pompoms.' }],
    commonMistakes: ['Ağır top kullanmak'], commonMistakesEn: ['Using heavy balls']
  },
  {
    id: 'weave-legs',
    title: 'Bacak Arasından Geçme (Leg Weave)', titleEn: 'Weave Through Legs',
    subtitle: 'Yürürken bacaklarınızın arasından 8 çizerek geçme', subtitleEn: 'Figure-8 weave between legs',
    category: 'tricks', difficulty: 'hard', estimatedMinutes: 5, isPremium: true,
    goal: 'Kedinin adımlarınızın arasından dolanarak yürümesi.', goalEn: 'Cat weaves through legs while walking.',
    materials: ['Ödül maması'], materialsEn: ['Treats'],
    summary: 'Harika bir zihinsel egzersizdir.', summaryEn: 'Great mental stimulation game.',
    icon: 'Sparkles', videoUrl: '/assets/create_video_Camera_Low_angl.mp4',
    steps: [{ stepNumber: 1, title: 'Adım Atıp Ödülü Geçirin', titleEn: 'Step Forward & Lure', instruction: 'Bacağınızı öne atın, mama ile kediyi aradan geçirin.', instructionEn: 'Step forward, guide cat through with treat.', tip: 'Yavaş yürüyün.', tipEn: 'Walk slowly.' }],
    commonMistakes: ['Hızlı yürümek'], commonMistakesEn: ['Walking too fast']
  },
  {
    id: 'paws-up',
    title: 'Patilerini Kucağa Koyma (Paws Up)', titleEn: 'Paws Up on Lap',
    subtitle: 'Sandalyede otururken patilerini dizinize koyma', subtitleEn: 'Place front paws on lap',
    category: 'basic', difficulty: 'easy', estimatedMinutes: 3, isPremium: true,
    goal: 'Kedinin ön patilerini kucağınıza koyması.', goalEn: 'Cat puts front paws on your lap.',
    materials: ['Ödül maması'], materialsEn: ['Treats'],
    summary: 'Temas kurma alışkanlığı kazandırır.', summaryEn: 'Builds comfortable physical contact.',
    icon: 'UserCheck', videoUrl: '/assets/create_video_Camera_Medium_s.mp4',
    steps: [{ stepNumber: 1, title: 'Kucağınıza Mama Koyun', titleEn: 'Place Treat on Lap', instruction: 'Ödülü dizinizde tutun, patisini koyunca ödüllendirin.', instructionEn: 'Hold treat on lap, reward when paws touch.', tip: 'Kucağa zorla çekmeyin.', tipEn: 'Don\'t pull cat up.' }],
    commonMistakes: ['Zorla çekmek'], commonMistakesEn: ['Forcing cat onto lap']
  },
  {
    id: 'nail-clipping',
    title: 'Tırnak Kesimine Alıştırma', titleEn: 'Nail Clipping Desensitization',
    subtitle: 'Tırnak keserken tırmalama ve ısırmayı önleyin', subtitleEn: 'Painless stress-free nail trimming',
    category: 'care', difficulty: 'medium', estimatedMinutes: 5, isPremium: true,
    goal: 'Kedinin patisine dokunulduğunda sakin kalması.', goalEn: 'Cat stays calm during paw handling.',
    materials: ['Kedi tırnak makası'], materialsEn: ['Cat nail clipper'],
    summary: 'Tırnak kesimi stresini sıfıra indirir.', summaryEn: 'Eliminates nail clipping panic.',
    icon: 'Shield', videoUrl: '/assets/create_video_Camera_Extreme (1).mp4',
    steps: [{ stepNumber: 1, title: 'Patiye Basıp Ödüllendirin', titleEn: 'Press Paw & Reward', instruction: 'Patiye hafifçe basıp tırnağı çıkartın ve mama verin.', instructionEn: 'Press pad gently to expose claw and treat.', tip: 'Her gün 1 tırnak kesin.', tipEn: 'Trim only 1 nail per day.' }],
    commonMistakes: ['Hepsini tekte kesmeye çalışmak'], commonMistakesEn: ['Clipping all 10 nails at once']
  },
  {
    id: 'brushing',
    title: 'Tarama & Tüy Bakımına Alıştırma', titleEn: 'Grooming & Brushing Habit',
    subtitle: 'Fırçayı sevdirme ve tüy yumaklarını önleme', subtitleEn: 'Love brushing and prevent hairballs',
    category: 'care', difficulty: 'easy', estimatedMinutes: 4, isPremium: true,
    goal: 'Kedinin taranırken mırlayarak keyif alması.', goalEn: 'Cat purrs and enjoys being brushed.',
    materials: ['Yumuşak kedi tarağı'], materialsEn: ['Soft cat brush'],
    summary: 'Tüy yumağı kusmalarını engeller.', summaryEn: 'Prevents hairball vomiting.',
    icon: 'Shield', videoUrl: '/assets/create_video_Camera_Extreme (2).mp4',
    steps: [{ stepNumber: 1, title: 'Fırçayı Koklatın', titleEn: 'Sniff Brush', instruction: 'Fırçayı koklatıp 1 darbe tarayın ve ödüllendirin.', instructionEn: 'Let cat sniff brush, do 1 brush stroke & treat.', tip: 'Bastırmayın.', tipEn: 'Don\'t press hard.' }],
    commonMistakes: ['Sert taramak'], commonMistakesEn: ['Brushing too hard']
  },
  {
    id: 'teeth-brushing',
    title: 'Diş Fırçalamaya Alıştırma', titleEn: 'Tooth Brushing Routine',
    subtitle: 'Tartar ve diş eti hastalıklarını önleme', subtitleEn: 'Prevent tartar and gum disease',
    category: 'care', difficulty: 'hard', estimatedMinutes: 5, isPremium: true,
    goal: 'Kedinin tavuk aromalı kedi diş macununu kabul etmesi.', goalEn: 'Cat accepts enzymatic poultry toothpaste.',
    materials: ['Kedi diş fırçası & macunu'], materialsEn: ['Cat toothbrush & paste'],
    summary: 'Ağız kokusu ve veteriner diş temizliğini önler.', summaryEn: 'Prevents bad breath and dental disease.',
    icon: 'Shield', videoUrl: '/assets/create_video_Camera_Macro_cl.mp4',
    steps: [{ stepNumber: 1, title: 'Macunu Parmağınızdan Yalattırın', titleEn: 'Lick Paste Off Finger', instruction: 'Aromalı macunu parmağınızdan yalatarak alıştırın.', instructionEn: 'Let cat lick flavored paste from finger first.', tip: 'İnsan macunu kullanmayın.', tipEn: 'Never use human toothpaste.' }],
    commonMistakes: ['İnsan macunu kullanmak'], commonMistakesEn: ['Using human toothpaste']
  },
  {
    id: 'eye-ear-drops',
    title: 'Göz ve Kulak Damlası Alıştırma', titleEn: 'Eye & Ear Drops Handling',
    subtitle: 'Tedavi anında kaçma ve tırmalamayı engelleme', subtitleEn: 'Calm application of medication',
    category: 'care', difficulty: 'hard', estimatedMinutes: 5, isPremium: true,
    goal: 'Kedinin başı tutulduğunda sakin kalması.', goalEn: 'Cat permits gentle head holding for drops.',
    materials: ['Ödül maması'], materialsEn: ['Treats'],
    summary: 'Hastalandığında tedavi sürecini kolaylaştırır.', summaryEn: 'Crucial for smooth medical treatments.',
    icon: 'Shield', videoUrl: '/assets/create_video_Camera_Close_up (2).mp4',
    steps: [{ stepNumber: 1, title: 'Başını Nazikçe Tutun', titleEn: 'Gently Hold Head', instruction: 'Başını yavaşça geriye yatırıp mama verin.', instructionEn: 'Tilt head back gently and give treat.', tip: 'Sert sıkmayın.', tipEn: 'Don\'t squeeze head.' }],
    commonMistakes: ['Zorla sıkıştırmak'], commonMistakesEn: ['Rough restraint']
  },
  {
    id: 'open-mouth',
    title: 'Ağız Açma & Hap Yutturma', titleEn: 'Pill Swallowing Routine',
    subtitle: 'Hap verirken tırmalanmadan kolay yutturma', subtitleEn: 'Easy pill administration without scratching',
    category: 'care', difficulty: 'hard', estimatedMinutes: 5, isPremium: true,
    goal: 'Kedinin hap yutma aparatını kabul etmesi.', goalEn: 'Cat accepts pill pocket or popper.',
    materials: ['Hap yutma aparatı / Ödül cepleri'], materialsEn: ['Pill pockets'],
    summary: 'Zorla hap içirme travmasına son verir.', summaryEn: 'Ends forced pill swallowing trauma.',
    icon: 'Shield', videoUrl: '/assets/create_video_Camera_Close_up (3).mp4',
    steps: [{ stepNumber: 1, title: 'Ödül Cebi Kullanın', titleEn: 'Use Pill Pocket', instruction: 'Hapı lezzetli yapışkan mama cebine saklayın.', instructionEn: 'Hide tablet inside a tasty soft pill pocket.', tip: 'Direkt yutacaktır.', tipEn: 'Cat eats it naturally.' }],
    commonMistakes: ['Boğaza zorla itmek'], commonMistakesEn: ['Forcing down dry throat']
  },
  {
    id: 'vet-table',
    title: 'Muayene Masasında Sakin Kalma', titleEn: 'Vet Table Calmness',
    subtitle: 'Veteriner klinik korkusunu yenme', subtitleEn: 'Overcome vet clinic anxiety',
    category: 'care', difficulty: 'medium', estimatedMinutes: 4, isPremium: true,
    goal: 'Kedinin yabancı masada sakince durması.', goalEn: 'Cat remains calm on exam table.',
    materials: ['Ödül maması'], materialsEn: ['Treats'],
    summary: 'Veteriner hekim muayenesini kolaylaştırır.', summaryEn: 'Makes physical vet exams easy.',
    icon: 'Shield', videoUrl: '/assets/create_video_Camera_Medium_t.mp4',
    steps: [{ stepNumber: 1, title: 'Masada Mama Verin', titleEn: 'Feed on Table', instruction: 'Muayene masasına çıkarıp lezzetli mama verin.', instructionEn: 'Place on clinic table and feed high-value treats.', tip: 'Korkusunu kırar.', tipEn: 'Reduces clinic anxiety.' }],
    commonMistakes: ['Sadece iğne anında çıkarmak'], commonMistakesEn: ['Only taking out for shots']
  },
  {
    id: 'quiet-meow',
    title: 'Gece Sessiz Kalma (Quiet Control)', titleEn: 'Night Meow Control',
    subtitle: 'Gece miyavlama alışkanlığını kesme', subtitleEn: 'Stop excessive nighttime meowing',
    category: 'behavior', difficulty: 'medium', estimatedMinutes: 4, isPremium: true,
    goal: 'Kedinin gece miyavlayarak dikkat çekmeyi bırakması.', goalEn: 'Cat stops meowing for attention at night.',
    materials: ['Av-Ye-Uyu rutini'], materialsEn: ['Hunt-Eat-Sleep routine'],
    summary: 'Kesintisiz gece uykusu sağlar.', summaryEn: 'Ensures uninterrupted night sleep.',
    icon: 'CheckCircle2', videoUrl: '/assets/Camera_Night_vision_low_li.mp4',
    steps: [{ stepNumber: 1, title: 'Gece Sıfır Tepki Verin', titleEn: 'Zero Reaction at Night', instruction: 'Gece miyavlayınca ses çıkarmayın, yerinizden kalkmayın.', instructionEn: 'Ignore night meowing completely; do not move.', tip: '1 haftada pes eder.', tipEn: 'Cat quits in 1 week.' }],
    commonMistakes: ['Gece kalkıp mama vermek'], commonMistakesEn: ['Feeding cat at 3 AM']
  },
  {
    id: 'no-door-scratch',
    title: 'Kapı Tırmalamayı Bırakma', titleEn: 'No Door Scratching',
    subtitle: 'Yatak odası kapısını tırmalama çözümü', subtitleEn: 'Stop bedroom door clawing',
    category: 'behavior', difficulty: 'medium', estimatedMinutes: 4, isPremium: true,
    goal: 'Kedinin kapı önünde tırmalama yapmaması.', goalEn: 'Cat stops clawing outside closed doors.',
    materials: ['Çift taraflı koruyucu bant'], materialsEn: ['Double-sided sticky tape'],
    summary: 'Kapı ve ahşap hasarlarını önler.', summaryEn: 'Protects doors and wooden frames.',
    icon: 'CheckCircle2', videoUrl: '/assets/create_video_Camera_Pan_left.mp4',
    steps: [{ stepNumber: 1, title: 'Kapı Dibine Bant Yapıştırın', titleEn: 'Apply Tape to Door Base', instruction: 'Kapı altına çift taraflı şeffaf bant yapıştırın.', instructionEn: 'Stick double-sided tape at bottom of door.', tip: 'Pati yapışınca vazgeçer.', tipEn: 'Cat dislikes sticky paw feeling.' }],
    commonMistakes: ['Kapıyı açmak'], commonMistakesEn: ['Opening door when clawed']
  },
  {
    id: 'table-off',
    title: 'Masadan / Tezgahtan İnme (Off Command)', titleEn: 'Off Counter & Table Command',
    subtitle: 'Mutfak tezgahına çıkmayı engelleme', subtitleEn: 'Keep cat off kitchen counters',
    category: 'behavior', difficulty: 'easy', estimatedMinutes: 3, isPremium: true,
    goal: 'Kedinin "İn" komutuyla masadan aşağı atlaması.', goalEn: 'Cat jumps down from counters on "Off" cue.',
    materials: ['Alternatif yüksek kedi kulesi'], materialsEn: ['Alternative cat tree'],
    summary: 'Mutfak hijyeni ve yemek güvenliği sağlar.', summaryEn: 'Ensures kitchen hygiene and safety.',
    icon: 'CheckCircle2', videoUrl: '/assets/create_video_Camera_Medium_s.mp4',
    steps: [{ stepNumber: 1, title: 'İn Komutu ile Yere Ödül Atın', titleEn: 'Toss Treat on "Off"', instruction: '"İn" deyin ve yere mama atarak inmesini sağlayın.', instructionEn: 'Say "Off" and toss treat onto floor.', tip: 'Tezgahta asla mama vermeyin.', tipEn: 'Never feed treats on counter.' }],
    commonMistakes: ['Tezgahta mama yedirmek'], commonMistakesEn: ['Feeding cat on counter']
  }
];

export const getLocalizedLesson = (lesson: Lesson, lang: string): Lesson => {
  if (lang === 'tr') return lesson;

  return {
    ...lesson,
    title: lesson.titleEn || lesson.title,
    subtitle: lesson.subtitleEn || lesson.subtitle,
    goal: lesson.goalEn || lesson.goal,
    materials: lesson.materialsEn || lesson.materials,
    summary: lesson.summaryEn || lesson.summary,
    commonMistakes: lesson.commonMistakesEn || lesson.commonMistakes,
    steps: lesson.steps.map((s) => ({
      ...s,
      title: s.titleEn || s.title,
      instruction: s.instructionEn || s.instruction,
      tip: s.tipEn || s.tip,
    })),
  };
};
