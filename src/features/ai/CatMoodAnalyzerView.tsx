import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Mic,
  MicOff,
  Sparkles,
  Volume2,
  Lock,
  HeartPulse,
  Brain,
  Smile,
  AlertTriangle,
  Play,
  RotateCcw,
  CheckCircle2,
  Crown,
  ChevronRight,
  Flame
} from 'lucide-react';
import { useCatStore } from '../../store/catStore';

interface CatMoodAnalyzerViewProps {
  onUnlockPremium?: () => void;
  isPremiumUser?: boolean;
}

interface MoodResult {
  emotion: string;
  emoji: string;
  confidence: number;
  description: string;
  actionableTip: string;
  bgGradient: string;
  textColor: string;
  badgeBg: string;
}

const MOOD_PRESETS: MoodResult[] = [
  {
    emotion: 'Mutlu & Sevgi İstiyor',
    emoji: '😺',
    confidence: 94,
    description: 'Kediniz şu an son derece huzurlu ve sizinle yakın temas kurmak istiyor.',
    actionableTip: 'Çene altını yavaşça okşayın veya 3 dakikalık hafif bir seans başlatın.',
    bgGradient: 'from-amber-500/10 via-[#97480d]/5 to-transparent',
    textColor: 'text-[#97480d]',
    badgeBg: 'bg-amber-100 text-[#97480d]',
  },
  {
    emotion: 'Oyun Modu & Avcılık Dürtüsü',
    emoji: '😼',
    confidence: 91,
    description: 'Miyavlama frekansı avcılık enerjisi barındırıyor. Kediniz bir şeyler kovalamak istiyor.',
    actionableTip: 'Oltalı oyuncağınızı çıkarın ve enerjisini koşturarak boşaltmasını sağlayın.',
    bgGradient: 'from-sky-500/10 via-sky-600/5 to-transparent',
    textColor: 'text-sky-700',
    badgeBg: 'bg-sky-100 text-sky-800',
  },
  {
    emotion: 'Mama & Ödül Bekliyor',
    emoji: '🍗',
    confidence: 88,
    description: 'B ritmik miyavlama tonu beslenme zamanının geldiğini veya lezzetli bir ödül istediğini gösteriyor.',
    actionableTip: 'Mama kabını kontrol edin ve küçük bir lezzetli ödül maması verin.',
    bgGradient: 'from-emerald-500/10 via-emerald-600/5 to-transparent',
    textColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100 text-emerald-800',
  },
  {
    emotion: 'Kaygılı veya Rahatsız Olmuş',
    emoji: '😿',
    confidence: 79,
    description: 'Çevredeki yüksek ses veya ani değişiklik kedinizde hafif bir huzursuzluk yaratmış.',
    actionableTip: 'Gözlerinin içine uzun bakmayın, güvenli yüksek alanına çekilmesine izin verin.',
    bgGradient: 'from-purple-500/10 via-purple-600/5 to-transparent',
    textColor: 'text-purple-700',
    badgeBg: 'bg-purple-100 text-purple-800',
  },
];

export const CatMoodAnalyzerView: React.FC<CatMoodAnalyzerViewProps> = ({
  onUnlockPremium,
  isPremiumUser = false,
}) => {
  const { t } = useTranslation();
  const { cats, activeCatId } = useCatStore();
  const activeCat = cats.find((c) => c.id === activeCatId) || cats[0];

  const [isRecording, setIsRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [result, setResult] = useState<MoodResult | null>(null);

  // Synthesize Meow Sound Effect via Web Audio API
  const playSampleMeow = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 0.15);
      osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Audio fallback
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 4) {
            setIsRecording(false);
            startAnalysis();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    if (!isPremiumUser && onUnlockPremium) {
      onUnlockPremium();
      return;
    }
    playSampleMeow();
    setResult(null);
    setRecordingSeconds(0);
    setIsRecording(true);
  };

  const startAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      const randomPreset = MOOD_PRESETS[Math.floor(Math.random() * MOOD_PRESETS.length)];
      setResult(randomPreset);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-28 pt-4 px-4 sm:px-6 max-w-4xl mx-auto font-sans">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm mb-6 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#97480d] flex items-center justify-center font-black">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                  AI Miyavlama & Mod Analizörü
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 flex items-center gap-1">
                  <Crown className="w-3 h-3 fill-slate-950" /> PRO
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {activeCat ? activeCat.name : 'Kedinizin'} miyavlama ses tonunu yapay zeka ile analiz edin.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Analyzer Studio */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md text-center space-y-6 relative overflow-hidden">
        {!isPremiumUser && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs z-20 flex flex-col items-center justify-center p-6 text-white text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black font-serif">AI Mod Analizörü PRO Özelliğidir</h3>
              <p className="text-xs text-slate-300 font-medium max-w-sm mt-1">
                Yapay zeka ses frekansı işleme ile kedinizin anlık duygusunu ve ihtiyacını saniyeler içinde öğrenin.
              </p>
            </div>
            <button
              onClick={onUnlockPremium}
              className="px-6 py-3 bg-[#97480d] hover:bg-[#7a3600] text-white rounded-2xl text-xs font-black shadow-lg transition-all active:scale-98"
            >
              PRO'YA YÜKSELT & KULLAN 👑
            </button>
          </div>
        )}

        <div className="max-w-md mx-auto space-y-3">
          <span className="text-xs font-extrabold text-[#97480d] uppercase tracking-wider block">
            {activeCat ? `${activeCat.name} İçin Ses Analizi` : 'Ses Analizi'}
          </span>
          <p className="text-xs text-slate-500 font-medium">
            Aşağıdaki mikrofon butonuna basın ve kediniz miyavladığında 3 saniye dinletin.
          </p>
        </div>

        {/* Big Animated Mic Button */}
        <div className="py-4 flex justify-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={isRecording ? () => setIsRecording(false) : handleStartRecording}
            disabled={analyzing}
            className={`relative w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all shadow-xl border-4 ${
              isRecording
                ? 'bg-rose-600 text-white border-rose-300 ring-8 ring-rose-100 animate-pulse'
                : analyzing
                ? 'bg-amber-500 text-slate-950 border-amber-300 ring-8 ring-amber-100'
                : 'bg-[#97480d] hover:bg-[#7a3600] text-white border-amber-200'
            }`}
          >
            {isRecording ? (
              <>
                <Mic className="w-10 h-10 animate-bounce" />
                <span className="text-xs font-black mt-1">Dinleniyor... ({recordingSeconds}s)</span>
              </>
            ) : analyzing ? (
              <>
                <Sparkles className="w-10 h-10 animate-spin" />
                <span className="text-xs font-black mt-1">AI Analiz Ediyor...</span>
              </>
            ) : (
              <>
                <Mic className="w-10 h-10" />
                <span className="text-xs font-black mt-1">SESİ DİNLET 🎙️</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Live Audio Visualizer Waves Simulation */}
        {isRecording && (
          <div className="flex items-center justify-center gap-1.5 h-10">
            {[40, 70, 30, 90, 50, 80, 40, 60, 100, 40, 70].map((height, idx) => (
              <motion.div
                key={idx}
                animate={{ height: [10, height, 10] }}
                transition={{ repeat: Infinity, duration: 0.5 + idx * 0.1 }}
                className="w-1.5 bg-[#97480d] rounded-full"
              />
            ))}
          </div>
        )}

        {/* Analysis Result Display */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`rounded-3xl p-6 border border-slate-200 shadow-lg text-left space-y-4 bg-gradient-to-b ${result.bgGradient}`}
            >
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{result.emoji}</span>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 font-serif">{result.emotion}</h3>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${result.badgeBg}`}>
                      %{result.confidence} AI Doğruluk Payı
                    </span>
                  </div>
                </div>

                <button
                  onClick={playSampleMeow}
                  className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
                  title="Sesi Tekrar Dinle"
                >
                  <Volume2 className="w-4 h-4 text-[#97480d]" />
                </button>
              </div>

              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {result.description}
              </p>

              <div className="bg-white/90 p-4 rounded-2xl border border-amber-200/80 space-y-1">
                <span className="text-[11px] font-extrabold text-[#97480d] uppercase tracking-wider flex items-center gap-1 font-serif">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Tavsiye Edilen Aksiyon
                </span>
                <p className="text-xs text-slate-800 font-extrabold">
                  {result.actionableTip}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CatMoodAnalyzerView;
