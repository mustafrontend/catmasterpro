export interface CalmingVideo {
  id: string;
  youtubeId: string;
  localVideoUrl?: string;
  title: string;
  titleEn: string;
  category: 'sleep' | 'anxiety' | 'music' | 'nature' | 'purr';
  duration: string;
  description: string;
  descriptionEn: string;
  thumbnail: string;
  isPremium: boolean;
}

// 1 Free video, remaining 9 PRO videos with local MP4 fallbacks for 100% guarantee
export const CALMING_VIDEOS: CalmingVideo[] = [
  {
    id: 'calming-1',
    youtubeId: 'CYnsIvpiqUM',
    localVideoUrl: '/assets/Static_wide_shot_A_relaxed_ca.mp4',
    title: '8 Saatlik Kedi Derin Uykusu & Sakinleştirici Müzik',
    titleEn: '8 Hours Relaxing Music for Cats to Sleep',
    category: 'sleep',
    duration: '8:00:00',
    description: 'Kedinizin beyin dalgalarını sakinleştiren 432Hz frekansta özel kedi mırıltılı uyku müziği.',
    descriptionEn: 'Special 432Hz calming feline sleep music with gentle purring sound overlay.',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    isPremium: false, // FREE
  },
  {
    id: 'calming-2',
    youtubeId: '6S2v12V03P0',
    localVideoUrl: '/assets/Slow_pull_back_shot_A_person.mp4',
    title: 'Stres & Kaygı Giderici Kedi Rahatlatma Müziği',
    titleEn: 'Cat Stress & Anxiety Relief Calming Music',
    category: 'anxiety',
    duration: '3:00:00',
    description: 'Veteriner ziyareti ve fırtına anında kedilerdeki korku ve stresi sıfırlayan piyano melodileri.',
    descriptionEn: 'Calming piano melodies designed by vets to soothe fear and stress during storms.',
    thumbnail: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calming-3',
    youtubeId: 's9y9m1H-Jc4',
    localVideoUrl: '/assets/Camera_Night_vision_low_li.mp4',
    title: 'Kesintisiz Kedi Mırlaması ve Doğa Sesleri',
    titleEn: 'Non-Stop Relaxing Cat Purr & Relaxing Music',
    category: 'purr',
    duration: '10:00:00',
    description: 'Bebek ve yetişkin kedileri anında mırlama frekansına geçiren doğal terapi sesleri.',
    descriptionEn: 'Non-stop soothing feline purring tones combined with soft ambient rain sounds.',
    thumbnail: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calming-4',
    youtubeId: 'w3_iO5w1n_8',
    localVideoUrl: '/assets/Medium_shot_A_playful_cat_str.mp4',
    title: 'Yalnızlık Kaygısı İçin Sakinleştirici Kedi Müzikleri',
    titleEn: 'Separation Anxiety Reliever for Home Alone Cats',
    category: 'anxiety',
    duration: '6:00:00',
    description: 'Siz evde yokken kedinizin kendisini yalnız hissetmesini engelleyen huzurlu frekanslar.',
    descriptionEn: 'Peaceful frequencies that keep home-alone cats relaxed while owners are away.',
    thumbnail: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calming-5',
    youtubeId: 'jfKfPfyJRdk',
    localVideoUrl: '/assets/Static_medium_shot_A_clean_do.mp4',
    title: 'Kuş & Doğa Manzaralı Kedi TV Rahatlama Videosu',
    titleEn: 'Relaxing Cat TV - Birds & Forest Nature Relax',
    category: 'nature',
    duration: '4:00:00',
    description: 'Orman kuşları ve dere sesleri eşliğinde kediler için görsel ve işitsel terapi.',
    descriptionEn: 'Visual and auditory relaxing ambient experience with woodland birds.',
    thumbnail: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calming-6',
    youtubeId: 'DWcJFNfaw9c',
    localVideoUrl: '/assets/Camera_Medium_shot_static_a.mp4',
    title: 'Yavru Kedi Ninni & Uyku Terapisi',
    titleEn: 'Kitten Lullaby & Deep Sleep Therapy',
    category: 'sleep',
    duration: '5:00:00',
    description: 'Yavru kedilerin anne mırıltısı hissiyle güvenle uykuya dalmasını sağlayan ninni.',
    descriptionEn: 'Gentle kitten lullaby recreating maternal heartbeats for deep peaceful sleep.',
    thumbnail: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calming-7',
    youtubeId: '2OEL4P1Rz04',
    localVideoUrl: '/assets/Slow_pull_back_shot_A_person.mp4',
    title: 'Yağmur Sesi & Mırlama Karışımı Kedi Terapisi',
    titleEn: 'Cozy Rain & Purr Therapy for Nervous Cats',
    category: 'nature',
    duration: '8:00:00',
    description: 'Pencereye vuran yağmur damlaları ve huzurlu kedi mırıltısı kombinasyonu.',
    descriptionEn: 'Cozy fireplace rain sounds combined with therapeutic cat purring.',
    thumbnail: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calming-8',
    youtubeId: 'xAE1E9k08xY',
    localVideoUrl: '/assets/Camera_Night_vision_low_li.mp4',
    title: 'Gece Hiperaktivitesini Durduran Sakinleşme Müziği',
    titleEn: 'Stop Night Zoomies - Bedtime Calming Frequencies',
    category: 'sleep',
    duration: '6:00:00',
    description: 'Gece saat 3\'te koşturan kedileri hızlıca sakinleştirip yatağa çeken özel modülasyon.',
    descriptionEn: 'Bedtime audio modulation designed to calm energetic cats down before sleep.',
    thumbnail: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calming-9',
    youtubeId: 'CevxZvSJLk8',
    localVideoUrl: '/assets/Static_wide_shot_A_relaxed_ca.mp4',
    title: 'Veteriner Öncesi Korku Engelleyici Kedi Terapisi',
    titleEn: 'Pre-Vet Anti-Stress Calming Audio for Cats',
    category: 'anxiety',
    duration: '2:30:00',
    description: 'Taşıma kutusuna koymadan 15 dakika önce dinletildiğinde kalbi sakinleştiren melodi.',
    descriptionEn: 'Calms heart rate when played 15 minutes before placing cat in carrier.',
    thumbnail: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
  {
    id: 'calming-10',
    youtubeId: 'M576WGiDBdQ',
    localVideoUrl: '/assets/Medium_shot_A_playful_cat_str.mp4',
    title: 'Sonsuz Huzur: Klasik Kedi Arp & Piyano Terapisi',
    titleEn: 'Endless Peace: Classical Harp & Piano for Cats',
    category: 'music',
    duration: '4:00:00',
    description: 'Kedilerin duyma aralığına tailör edilmiş yumuşak arp ve piyano armonileri.',
    descriptionEn: 'Soft harp and piano harmonies tailored specifically for feline hearing ranges.',
    thumbnail: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80',
    isPremium: true, // PRO
  },
];
