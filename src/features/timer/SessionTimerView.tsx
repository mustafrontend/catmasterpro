import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Plus,
  Minus,
  Bell,
  Star,
  X,
  Sparkles,
  Flame,
  Award,
  ArrowLeft
} from 'lucide-react';

export interface SessionSaveData {
  durationSeconds: number;
  treatCount: number;
  rating: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  skillId?: string;
  skillTitle?: string;
}

interface SessionTimerViewProps {
  skillTitle?: string;
  skillId?: string;
  onSaveSession: (data: SessionSaveData) => void;
  onClose?: () => void;
}

export const SessionTimerView: React.FC<SessionTimerViewProps> = ({
  skillTitle = 'Serbest Seans',
  skillId,
  onSaveSession,
  onClose,
}) => {
  // Preset selection in seconds (default 3 min = 180s)
  const [selectedDuration, setSelectedDuration] = useState<number>(180);
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [treatCount, setTreatCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Clicker pulse animation state
  const [clickerPulse, setClickerPulse] = useState<boolean>(false);

  // Summary Modal state
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [notes, setNotes] = useState<string>('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sound synthesis via Web Audio API (Clicker & Chime)
  const playAudioCue = (type: 'click' | 'finish') => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'finish') {
        // Double Chime for completion
        const now = ctx.currentTime;
        [523.25, 659.25, 783.99].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.2, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.3);
        });
      }
    } catch {
      // Audio fallback silent
    }
  };

  // Timer countdown tick
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playAudioCue('finish');
      setIsFinished(true);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const handleSelectPreset = (seconds: number) => {
    if (isRunning) return;
    setSelectedDuration(seconds);
    setTimeLeft(seconds);
  };

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedDuration);
    setTreatCount(0);
  };

  const handleTriggerClicker = () => {
    playAudioCue('click');
    setClickerPulse(true);
    setTimeout(() => setClickerPulse(false), 300);
  };

  const handleIncrementTreats = () => {
    setTreatCount((prev) => prev + 1);
    playAudioCue('click');
  };

  const handleDecrementTreats = () => {
    setTreatCount((prev) => Math.max(0, prev - 1));
  };

  const handleFinishEarly = () => {
    setIsRunning(false);
    playAudioCue('finish');
    setIsFinished(true);
  };

  const handleSaveModal = () => {
    const elapsedSeconds = selectedDuration - timeLeft;
    onSaveSession({
      durationSeconds: Math.max(10, elapsedSeconds),
      treatCount,
      rating,
      notes: notes.trim() || undefined,
      skillId,
      skillTitle,
    });
  };

  // Format time (MM:SS)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Progress percentage
  const progressPercent = Math.round(
    ((selectedDuration - timeLeft) / selectedDuration) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 pt-4 px-4 sm:px-6 max-w-2xl mx-auto flex flex-col justify-between">
      {/* Top Bar */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors font-medium text-xs py-2 px-3 rounded-lg hover:bg-slate-200/50 active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kapat</span>
          </button>

          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Flame className="w-3.5 h-3.5 text-amber-600" /> Pozitif Pekiştirme
          </span>
        </div>

        {/* Skill Title Header */}
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
            Eğitim Seansı
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {skillTitle}
          </h1>
        </div>

        {/* Duration Preset Selector Buttons */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { label: '3 Dk', seconds: 180 },
            { label: '4 Dk', seconds: 240 },
            { label: '5 Dk', seconds: 300 },
          ].map((preset) => (
            <button
              key={preset.seconds}
              onClick={() => handleSelectPreset(preset.seconds)}
              disabled={isRunning}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-[0.98] ${
                selectedDuration === preset.seconds
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 border-[0.5px] border-slate-200 hover:bg-slate-100'
              } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Big Circular / Kinetic Timer Display */}
        <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center">
          {/* SVG Progress Ring */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="110"
              className="stroke-slate-200"
              strokeWidth="10"
              fill="transparent"
            />
            <motion.circle
              cx="128"
              cy="128"
              r="110"
              className="stroke-amber-500"
              strokeWidth="10"
              strokeDasharray="691"
              strokeDashoffset={691 - (691 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
              initial={{ strokeDashoffset: 691 }}
              animate={{ strokeDashoffset: 691 - (691 * progressPercent) / 100 }}
              transition={{ duration: 0.5 }}
            />
          </svg>

          {/* Center Timer Text */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <motion.div
              animate={{ scale: clickerPulse ? 1.1 : 1 }}
              className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 font-mono mb-1"
            >
              {formatTime(timeLeft)}
            </motion.div>
            <span className="text-xs font-semibold text-slate-400">
              {isRunning ? 'Seansta...' : timeLeft === 0 ? 'Tamamlandı' : 'Hazır'}
            </span>
          </div>
        </div>

        {/* Clicker Button (Interactive Sound / Visual Cue) */}
        <div className="mb-8 text-center">
          <button
            onClick={handleTriggerClicker}
            className={`w-full max-w-xs mx-auto py-4 px-6 rounded-2xl font-black text-sm transition-all shadow-md active:scale-[0.96] flex items-center justify-center gap-2 border ${
              clickerPulse
                ? 'bg-amber-400 text-slate-950 border-amber-500 ring-4 ring-amber-200'
                : 'bg-white text-slate-800 border-slate-200 hover:bg-amber-50 hover:border-amber-300'
            }`}
          >
            <Bell className="w-5 h-5 text-amber-600" />
            <span>Clicker Sesi Çal 🔔</span>
          </button>
          <span className="text-[11px] font-medium text-slate-400 mt-1 block">
            Kedinin doğru hareketi yaptığı an clicker butonuna basın
          </span>
        </div>

        {/* Treat Counter Component */}
        <div className="bg-white rounded-2xl p-5 mb-8 border-[0.5px] border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Verilen Ödül Sayısı
            </span>
            <span className="text-xl font-black text-slate-900">
              {treatCount} adet
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrementTreats}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold transition-all active:scale-[0.95]"
            >
              <Minus className="w-4 h-4" />
            </button>

            <button
              onClick={handleIncrementTreats}
              className="w-12 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center font-black transition-all shadow-sm active:scale-[0.95] gap-1"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <button
            onClick={handleStartPause}
            className={`flex-1 py-4 rounded-xl font-extrabold text-sm transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2 ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Duraklat</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>{timeLeft < selectedDuration ? 'Devam Et' : 'Başlat'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-4 rounded-xl bg-white text-slate-600 border-[0.5px] border-slate-200 hover:bg-slate-100 transition-all active:scale-[0.95]"
            title="Sıfırla"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {timeLeft < selectedDuration && (
          <button
            onClick={handleFinishEarly}
            className="w-full py-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200 hover:bg-emerald-100 transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Seansı Bitir ve Kaydet</span>
          </button>
        )}
      </div>

      {/* Save Session Summary Modal */}
      <AnimatePresence>
        {isFinished && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 border-[0.5px] border-slate-200 shadow-2xl relative"
            >
              <button
                onClick={() => setIsFinished(false)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">
                <Award className="w-6 h-6" />
              </div>

              <h2 className="text-xl font-black text-slate-900 tracking-tight mb-1">
                Tebrikler! Seans Tamamlandı 🎉
              </h2>
              <p className="text-xs text-slate-500 font-medium mb-5">
                Kedinizin odaklanma performansını kaydedin.
              </p>

              {/* Summary Stats Badges */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-center">
                  <span className="text-[11px] font-bold text-slate-400 block">Süre</span>
                  <span className="text-base font-black text-slate-800">
                    {formatTime(selectedDuration - timeLeft)}
                  </span>
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-center">
                  <span className="text-[11px] font-bold text-amber-700 block">Ödül Sayısı</span>
                  <span className="text-base font-black text-amber-900">
                    {treatCount} Adet
                  </span>
                </div>
              </div>

              {/* Rating Star Selection */}
              <div className="mb-5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Seans Başarı Derecesi
                </label>
                <div className="flex items-center justify-center gap-2">
                  {([1, 2, 3, 4, 5] as const).map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-2 text-amber-400 hover:scale-110 transition-transform active:scale-95"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes Textarea */}
              <div className="mb-6">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  Seans Notları (Opsiyonel)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Kedi bugün ne kadar odaklıydı? Hangi adımlarda zorlandı?"
                  rows={3}
                  className="w-full bg-slate-50 border-[0.5px] border-slate-200 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              {/* Save CTA */}
              <button
                onClick={handleSaveModal}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Seansı Kaydet</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
