export interface CatCallingSound {
  id: string;
  youtubeId: string;
  title: string;
  titleEn: string;
  category: 'kitten' | 'mother' | 'attract' | 'curiosity' | 'birds';
  duration: string;
  description: string;
  descriptionEn: string;
  thumbnail: string;
  isPremium: boolean;
}

// 1 Free video, remaining 9 PRO videos
export const CAT_CALLING_SOUNDS: CatCallingSound[] = [
  {
    id: 'calling-1',
    youtubeId: '1Lwy9e-w428',
    title: 'Kedinizi Anında Yanınıza Getiren Ses (Kitten Meow Call)',
    titleEn: 'Kitten Calling Sound to Instantly Attract Cats',
    category: 'kitten',
    duration: '3:20',
    description: 'Yavru kedi arayış miyavlaması. Kediniz meraklanıp anında yanınıza koşacaktır.',
    descriptionEn: 'High-pitched kitten call that makes cats curious and run toward you instantly.',
    thumbnail: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80',
    isPremium: false, // FREE
  },
  {
    id: 'calling-2',
    youtubeId: 'W3_O8m7B9i4',
    title: 'Anne Kedi Çağrı Sesi (Mother Cat Calling Kittens)',
    titleEn: 'Mother Cat Calling Her Kittens Sound',
    category: 'mother',
    duration: '5:10',
    description: 'Anne kedinin yavrularını yanına toplamak için çıkardığı guvlama ve çağrı tonu.',
    descriptionEn: 'Maternal trilling and calling sound used by mother cats to gather their kittens.',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calling-3',
    youtubeId: 'DWcJFNfaw9c',
    title: 'Saklanan Kediyi Çıkarma Sesi (Un-hiding Cat Call)',
    titleEn: 'Sound to Get Hiding Cats Out From Under Bed',
    category: 'attract',
    duration: '4:15',
    description: 'Korkup saklanan veya koltuk altına kaçan kedileri meraklandırıp dışarı çıkaran ton.',
    descriptionEn: 'Curiosity-stimulating feline tones to gently coax hiding cats out.',
    thumbnail: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calling-4',
    youtubeId: 'xAE1E9k08xY',
    title: 'Kedi Odaklanma & Dikkat Çekici Bip ve Miyav',
    titleEn: 'Cat Attention Grabber & Chirp Sounds',
    category: 'curiosity',
    duration: '2:45',
    description: 'Fotoğraf çekerken veya eğitim anında kedinin doğrudan kameraya bakmasını sağlar.',
    descriptionEn: 'High-frequency chirps to make your cat look directly at the camera for photos.',
    thumbnail: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calling-5',
    youtubeId: 'CevxZvSJLk8',
    title: 'Yavru Kedi Ağlama & Çağrı Sesi (Distress Call)',
    titleEn: 'Distress Kitten Meow Sound',
    category: 'kitten',
    duration: '3:50',
    description: 'Koruyuculuk içgüdüsünü tetikleyen yüksek frekanslı yavru miyavlama efekti.',
    descriptionEn: 'Triggers protective maternal instincts in both male and female cats.',
    thumbnail: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calling-6',
    youtubeId: 'xAE1E9k08xY',
    title: 'Kuş & Fare Cıvıltıları (Cat Attraction Nature)',
    titleEn: 'Bird Chirps & Squeaks for Cat Attraction',
    category: 'birds',
    duration: '6:00',
    description: 'Kuş ve minik fare cıvıltıları ile kedinizi anında hareket geçiren doğa sesleri.',
    descriptionEn: 'Bird and rodent squeaks that instantly grab your cat\'s hunting curiosity.',
    thumbnail: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calling-7',
    youtubeId: '2OEL4P1Rz04',
    title: 'Dost Kedi Selamlaşma Trill Sesi (Greeting Trill)',
    titleEn: 'Friendly Cat Greeting Trill Sound',
    category: 'attract',
    duration: '2:15',
    description: 'Neşeli kedi selamlaşma guvlaması. Güven tazelemek ve kediye yaklaşmak için.',
    descriptionEn: 'Friendly chirp-trill sound used by cats to greet friends happily.',
    thumbnail: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calling-8',
    youtubeId: 'M576WGiDBdQ',
    title: 'Mama Kabı & Tıkırtı Çağrı Sesi (Treat Bag Shake)',
    titleEn: 'Treat Container & Food Bag Shake Sound',
    category: 'curiosity',
    duration: '1:30',
    description: 'Mama poşeti tıkırtısı ve ödül kabı sesi. Kediler bu sesi 100 metreden duyar.',
    descriptionEn: 'Realistic food bag rustling that brings cats running from anywhere.',
    thumbnail: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calling-9',
    youtubeId: 'V1RPiM0-c9w',
    title: 'Oyuncu Kedi Miyavlama Döngüsü (Playful Meow)',
    titleEn: 'Playful Kitten Meow Loop',
    category: 'kitten',
    duration: '3:10',
    description: 'Oyuna davet eden sevimli ve enerjik kedi miyavlaması.',
    descriptionEn: 'Energetic play-meow loop encouraging interaction.',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calling-10',
    youtubeId: '5qap5aO4i9A',
    title: 'Kedi Ağız Şapırdatma & Cıvıldama (Chirping Sound)',
    titleEn: 'Cat Chirping & Chattering Sound Effect',
    category: 'curiosity',
    duration: '2:00',
    description: 'Avını gören kedinin heyecanlı cıvıldama ve diş tıkırdatma sesi.',
    descriptionEn: 'Excited chattering sound made when cats spot prey.',
    thumbnail: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
];
