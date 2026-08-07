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
  ArrowLeft,
  Volume2,
} from 'lucide-react';
import { playClickerSound, playCompletionChime, playKittenWelcomeMeow } from '../../services/soundService';

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

  // Clicker visual pulse animation state
  const [clickerRipples, setClickerRipples] = useState<number[]>([]);

  // Summary Modal state
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [notes, setNotes] = useState<string>('');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer countdown tick
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playCompletionChime();
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
    playClickerSound();
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    playClickerSound();
    setIsRunning(false);
    setTimeLeft(selectedDuration);
    setTreatCount(0);
  };

  const handleTriggerClicker = () => {
    playClickerSound();
    setClickerRipples((prev) => [...prev.slice(-3), Date.now()]);
  };

  const handleIncrementTreats = () => {
    playClickerSound();
    setTreatCount((prev) => prev + 1);
  };

  const handleDecrementTreats = () => {
    setTreatCount((prev) => Math.max(0, prev - 1));
  };

  const handleFinishEarly = () => {
    setIsRunning(false);
    playCompletionChime();
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

  // SVG Circular Gauge calculations
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = (selectedDuration - timeLeft) / selectedDuration;
  const strokeDashoffset = circumference * (1 - progressRatio);

  return (
    <div className="min-h-screen bg-[#fbf9f7] text-slate-800 pb-16 pt-4 px-4 sm:px-6 max-w-xl mx-auto flex flex-col justify-between font-sans relative overflow-hidden">
      
      {/* Clicker Screen Ripple Animations */}
      {clickerRipples.map((timestamp) => (
        <motion.div
          key={timestamp}
          initial={{ scale: 0.2, opacity: 0.8 }}
          animate={{ scale: 2.8, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-4 border-amber-400 bg-amber-400/20 pointer-events-none z-20"
        />
      ))}

      {/* Top Bar */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors font-bold text-xs py-2 px-3.5 rounded-full bg-slate-200/60 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kapat</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-100/90 text-[#97480d] border border-amber-200">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>Pozitif Pekiştirme</span>
          </div>
        </div>

        {/* Skill Title Header */}
        <div className="text-center mb-4">
          <span className="text-[11px] font-extrabold text-[#97480d] uppercase tracking-wider block mb-1">
            EĞİTİM SEANSI
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-serif">
            {skillTitle}
          </h1>

          {/* Duration Preset Selector */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {[180, 240, 300].map((sec) => {
              const label = `${sec / 60} Dk`;
              const isSelected = selectedDuration === sec;
              return (
                <button
                  key={sec}
                  disabled={isRunning}
                  onClick={() => handleSelectPreset(sec)}
                  className={`px-4 py-1.5 rounded-full text-xs font-black transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-amber-50'
                  } ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Circular Gauge Timer Display */}
        <div className="relative my-4 flex items-center justify-center">
          <svg className="w-64 h-64 sm:w-72 sm:h-72 transform -rotate-90">
            {/* Track Circle */}
            <circle
              cx="50%"
              cy="50%"
              r={radius}
              className="stroke-slate-200/80"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Animated Progress Circle */}
            <motion.circle
              cx="50%"
              cy="50%"
              r={radius}
              className="stroke-[#97480d]"
              strokeWidth="12"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Timer Text */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="font-mono text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter">
              {formatTime(timeLeft)}
            </span>
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mt-1">
              {isRunning ? 'Seans Devam Ediyor' : 'Hazır'}
            </span>
          </div>
        </div>

        {/* Tactile High-Tech Clicker Button */}
        <div className="mt-2 text-center">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleTriggerClicker}
            className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-sm rounded-2xl shadow-lg border-2 border-amber-300 flex items-center justify-center gap-2 transition-all active:scale-95 group"
          >
            <Bell className="w-5 h-5 fill-slate-950 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span>Clicker Sesi Çal 🔔</span>
          </motion.button>
          <p className="text-[11px] text-slate-400 font-medium mt-1.5">
            Kedinizin doğru hareketi yaptığı an clicker butonuna basın
          </p>
        </div>

        {/* Treat Counter Card */}
        <div className="mt-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider block">
              VERİLEN ÖDÜL SAYISI
            </span>
            <span className="text-lg font-black text-slate-900">
              {treatCount} adet
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrementTreats}
              className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors active:scale-95"
            >
              <Minus className="w-5 h-5" />
            </button>
            <button
              onClick={handleIncrementTreats}
              className="w-10 h-10 rounded-xl bg-[#97480d] hover:bg-[#7a3600] text-white font-bold flex items-center justify-center shadow-sm transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Control Actions (Start / Pause / Reset / Finish) */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleStartPause}
            className={`flex-1 py-4 font-black text-sm sm:text-base rounded-2xl shadow-md flex items-center justify-center gap-2 transition-all ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-slate-950 hover:bg-slate-800 text-white'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-white" />
                <span>Duraklat</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                <span>Başlat</span>
              </>
            )}
          </motion.button>

          <button
            onClick={handleReset}
            title="Sıfırla"
            className="w-14 h-14 rounded-2xl border border-slate-200/90 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center shadow-2xs transition-colors active:scale-95 shrink-0"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Finish Early Action */}
        {(isRunning || selectedDuration - timeLeft > 10) && (
          <button
            onClick={handleFinishEarly}
            className="w-full py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Seansı Bitir ve Kaydet</span>
          </button>
        )}
      </div>

      {/* Completion Summary Evaluation Modal */}
      <AnimatePresence>
        {isFinished && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-200 max-w-sm w-full space-y-4 font-sans text-center"
            >
              <div className="w-14 h-14 rounded-full bg-amber-100 text-[#97480d] flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 font-serif">
                  Tebrikler! 🎉
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {skillTitle} eğitimi tamamlandı
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 flex items-center justify-around text-xs font-extrabold text-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block font-normal">Süre</span>
                  <span>{formatTime(selectedDuration - timeLeft)}</span>
                </div>
                <div className="w-px h-6 bg-slate-200" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-normal">Ödül</span>
                  <span>{treatCount} Adet</span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-600 block">
                  Seans Değerlendirmesi
                </span>
                <div className="flex items-center justify-center gap-1.5">
                  {([1, 2, 3, 4, 5] as const).map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform active:scale-125"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes Input */}
              <div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Seans notları (ör: Ses tonuna harika tepki verdi...)"
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#97480d]"
                />
              </div>

              <button
                onClick={handleSaveModal}
                className="w-full py-3.5 bg-[#97480d] hover:bg-[#7a3600] text-white font-black text-xs rounded-2xl shadow-md transition-all active:scale-95"
              >
                Seansı Kaydet
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
