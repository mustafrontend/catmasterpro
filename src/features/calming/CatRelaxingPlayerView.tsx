import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Play,
  Volume2,
  VolumeX,
  Music,
  Moon,
  ShieldCheck,
  Sparkles,
  Search,
  CheckCircle2,
  Tv,
  Crown,
  Heart,
  Radio,
  BellRing,
  ExternalLink,
  Pause,
  Lock
} from 'lucide-react';
import { CALMING_VIDEOS, CalmingVideo } from './calmingVideosData';
import { CAT_CALLING_SOUNDS, CatCallingSound } from './catCallingData';
import { useCatStore } from '../../store/catStore';

interface CatRelaxingPlayerViewProps {
  onUnlockPremium?: () => void;
  isPremiumUser?: boolean;
}

export const CatRelaxingPlayerView: React.FC<CatRelaxingPlayerViewProps> = ({
  onUnlockPremium,
  isPremiumUser = false,
}) => {
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useCatStore();
  const isTr = (i18n.language || currentLanguage || 'tr') === 'tr';

  const [activeTab, setActiveTab] = useState<'relaxing' | 'calling'>('relaxing');
  const [isPlayingSynthSound, setIsPlayingSynthSound] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [playerSourceMode, setPlayerSourceMode] = useState<'local' | 'youtube'>('local');

  const initialItem = CALMING_VIDEOS[0];
  const [selectedItem, setSelectedItem] = useState<{
    youtubeId: string;
    localVideoUrl?: string;
    title: string;
    description: string;
    type: 'relaxing' | 'calling';
  }>({
    youtubeId: initialItem.youtubeId,
    localVideoUrl: initialItem.localVideoUrl,
    title: isTr ? initialItem.title : initialItem.titleEn,
    description: isTr ? initialItem.description : initialItem.descriptionEn,
    type: 'relaxing',
  });

  // Native Web Audio API Sound Synthesizer for 100% guaranteed sound playback
  const toggleSynthSound = (isCallingSound = false) => {
    try {
      if (isPlayingSynthSound) {
        if (audioCtxRef.current) {
          audioCtxRef.current.close();
          audioCtxRef.current = null;
        }
        setIsPlayingSynthSound(false);
        return;
      }

      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      if (isCallingSound) {
        // High-pitched kitten meow call sound synth
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1300, ctx.currentTime + 0.15);
        osc.frequency.exponentialRampToValueAtTime(550, ctx.currentTime + 0.35);

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);

        setIsPlayingSynthSound(true);
        setTimeout(() => setIsPlayingSynthSound(false), 400);
      } else {
        // 432Hz Soothing Low Purr Ambient Wave
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(75, ctx.currentTime); // Low warm purr hum

        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(432, ctx.currentTime); // 432Hz calming chord

        gain.gain.setValueAtTime(0.15, ctx.currentTime);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();
        setIsPlayingSynthSound(true);
      }
    } catch {
      // Audio fallback
    }
  };

  const handleSelectVideo = (item: { youtubeId: string; localVideoUrl?: string; title: string; description: string; type: 'relaxing' | 'calling'; isPremium: boolean }) => {
    if (item.isPremium && !isPremiumUser) {
      if (onUnlockPremium) onUnlockPremium();
      return;
    }
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-28 pt-4 px-4 sm:px-6 max-w-5xl mx-auto font-sans">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm mb-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#97480d] flex items-center justify-center font-black">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                  Kedi TV & Çağırıcı Medya Oynatıcı
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 flex items-center gap-1">
                  <Crown className="w-3 h-3 fill-slate-950" /> PRO
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Kediniz için özel rahatlatıcı müzikler ve anında kedi çağırıcı sesler. (1 Ücretsiz / 9 PRO)
              </p>
            </div>
          </div>

          {/* Quick Sound Synth Play Button */}
          <button
            onClick={() => toggleSynthSound(activeTab === 'calling')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md ${
              isPlayingSynthSound
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-amber-500 to-[#97480d] text-white'
            }`}
          >
            {isPlayingSynthSound ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Sesi Durdur</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>{activeTab === 'calling' ? '🐾 Anında Kedi Çağır' : '🎵 Sakinleştirici Purr Sesi Çal'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Video & Audio Player Card */}
      {selectedItem && (
        <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-xl border border-slate-800 mb-6 text-white space-y-4">
          
          {/* Mode Switcher Header Bar */}
          <div className="px-5 pt-4 flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-400">Oynatma Modu:</span>
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setPlayerSourceMode('local')}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  playerSourceMode === 'local'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                📼 Kesintisiz HD Video (Yerel)
              </button>
              <button
                onClick={() => setPlayerSourceMode('youtube')}
                className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                  playerSourceMode === 'youtube'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🌐 YouTube Canlı
              </button>
            </div>
          </div>

          {/* Video Player Display */}
          <div className="relative aspect-video w-full bg-black">
            {playerSourceMode === 'local' && selectedItem.localVideoUrl ? (
              <video
                src={selectedItem.localVideoUrl}
                autoPlay
                loop
                controls
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${selectedItem.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                title={selectedItem.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-none"
              />
            )}
          </div>

          <div className="p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-lg font-black font-serif text-amber-300">{selectedItem.title}</h2>
              <a
                href={`https://www.youtube.com/watch?v=${selectedItem.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 w-fit active:scale-95 transition-all"
              >
                <span>YouTube'da İzle</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-xs text-slate-300 font-medium leading-relaxed">
              {selectedItem.description}
            </p>
          </div>
        </div>
      )}

      {/* Tab Switcher: Sakinleştirici Müzikler vs Kedi Çağırıcı Sesler */}
      <div className="flex items-center gap-2 mb-6">
        <button
          onClick={() => setActiveTab('relaxing')}
          className={`flex-1 py-3 px-4 rounded-2xl text-xs font-black transition-all shadow-2xs flex items-center justify-center gap-2 active:scale-98 ${
            activeTab === 'relaxing'
              ? 'bg-[#97480d] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Moon className="w-4 h-4 text-amber-300" />
          <span>Sakinleştirici Müzikler (1 Ücretsiz / 9 PRO)</span>
        </button>

        <button
          onClick={() => setActiveTab('calling')}
          className={`flex-1 py-3 px-4 rounded-2xl text-xs font-black transition-all shadow-2xs flex items-center justify-center gap-2 active:scale-98 ${
            activeTab === 'calling'
              ? 'bg-[#97480d] text-white shadow-md'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
          }`}
        >
          <BellRing className="w-4 h-4 text-amber-300" />
          <span>Kedi Çağırıcı Sesler (1 Ücretsiz / 9 PRO)</span>
        </button>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activeTab === 'relaxing'
          ? CALMING_VIDEOS.map((item) => {
              const isCurrent = selectedItem?.youtubeId === item.youtubeId;
              const isLocked = item.isPremium && !isPremiumUser;
              const title = isTr ? item.title : item.titleEn;
              const desc = isTr ? item.description : item.descriptionEn;

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    handleSelectVideo({
                      youtubeId: item.youtubeId,
                      localVideoUrl: item.localVideoUrl,
                      title,
                      description: desc,
                      type: 'relaxing',
                      isPremium: item.isPremium,
                    })
                  }
                  className={`p-4 rounded-3xl border transition-all cursor-pointer bg-white flex items-start gap-4 relative overflow-hidden ${
                    isCurrent
                      ? 'border-[#97480d] ring-2 ring-amber-200 shadow-md'
                      : 'border-slate-200/80 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="relative w-28 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <img src={item.thumbnail} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      {isLocked ? (
                        <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                          <Lock className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md">
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </div>
                      )}
                    </div>
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-slate-950/80 text-white text-[9px] font-mono rounded">
                      {item.duration}
                    </span>
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-sm font-extrabold text-slate-900 font-serif leading-tight">{title}</h3>
                      {isLocked ? (
                        <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-black uppercase rounded shrink-0">
                          PRO
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-emerald-500 text-white text-[9px] font-black uppercase rounded shrink-0">
                          ÜCRETSİZ
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              );
            })
          : CAT_CALLING_SOUNDS.map((item) => {
              const isCurrent = selectedItem?.youtubeId === item.youtubeId;
              const isLocked = item.isPremium && !isPremiumUser;
              const title = isTr ? item.title : item.titleEn;
              const desc = isTr ? item.description : item.descriptionEn;

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    handleSelectVideo({
                      youtubeId: item.youtubeId,
                      title,
                      description: desc,
                      type: 'calling',
                      isPremium: item.isPremium,
                    })
                  }
                  className={`p-4 rounded-3xl border transition-all cursor-pointer bg-white flex items-start gap-4 relative overflow-hidden ${
                    isCurrent
                      ? 'border-[#97480d] ring-2 ring-amber-200 shadow-md'
                      : 'border-slate-200/80 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  <div className="relative w-28 h-20 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                    <img src={item.thumbnail} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                      {isLocked ? (
                        <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
                          <Lock className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md">
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </div>
                      )}
                    </div>
                    <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-slate-950/80 text-white text-[9px] font-mono rounded">
                      {item.duration}
                    </span>
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-sm font-extrabold text-slate-900 font-serif leading-tight">{title}</h3>
                      {isLocked ? (
                        <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-black uppercase rounded shrink-0">
                          PRO
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-emerald-500 text-white text-[9px] font-black uppercase rounded shrink-0">
                          ÜCRETSİZ
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              );
            })}
      </div>
    </div>
  );
};

export default CatRelaxingPlayerView;
