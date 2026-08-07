import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Play,
  Lock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Target,
  Megaphone,
  UserCheck,
  Box,
  Shield,
  Feather
} from 'lucide-react';
import { Lesson, LESSONS_DATA, getLocalizedLesson } from './lessonsData';

interface LessonDetailViewProps {
  lessonId: string;
  onStartSession?: (lesson: Lesson) => void;
  onBack?: () => void;
  onUnlockPremium?: () => void;
  isPremiumUser?: boolean;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Megaphone,
  Target,
  UserCheck,
  Sparkles,
  Box,
  Shield,
  Feather,
  CheckCircle2,
};

export const LessonDetailView: React.FC<LessonDetailViewProps> = ({
  lessonId,
  onStartSession,
  onBack,
  onUnlockPremium,
  isPremiumUser = false,
}) => {
  const { t, i18n } = useTranslation();
  const rawLesson = LESSONS_DATA.find((l) => l.id === lessonId) || LESSONS_DATA[0];
  const lesson = getLocalizedLesson(rawLesson, i18n.language || 'tr');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const isLocked = lesson.isPremium && !isPremiumUser;
  const currentStep = lesson.steps[currentStepIndex];
  const progressPercent = Math.round(((currentStepIndex + 1) / lesson.steps.length) * 100);

  const handleNextStep = () => {
    if (currentStepIndex < lesson.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-28 pt-4 px-4 sm:px-6 max-w-4xl mx-auto font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#97480d] hover:text-[#7a3600] transition-colors font-extrabold text-xs py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('lessons.backToLessons')}</span>
        </button>

        {isLocked ? (
          <button
            onClick={onUnlockPremium}
            className="px-3 py-1.5 bg-amber-500 text-slate-950 text-xs font-black rounded-full flex items-center gap-1 shadow-xs"
          >
            <Lock className="w-3.5 h-3.5" /> PRO
          </button>
        ) : (
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full">
            {t('lessons.free')}
          </span>
        )}
      </div>

      {/* Hero Lesson Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">{lesson.title}</h1>
          <span className="text-xs font-bold text-slate-400">⏱️ {t('lessons.mins', { mins: lesson.estimatedMinutes })}</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">{lesson.summary}</p>

        {lesson.videoUrl && (
          <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-200">
            <video src={lesson.videoUrl} autoPlay loop muted playsInline controls className="w-full h-52 object-cover" />
          </div>
        )}

        <button
          onClick={() => onStartSession && onStartSession(lesson)}
          className="w-full bg-[#97480d] hover:bg-[#7a3600] text-white font-black text-sm py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{t('lessons.startLesson')}</span>
        </button>
      </div>

      {/* Step Navigator Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-[#97480d] uppercase tracking-wider font-serif">
            {t('lessons.stepLabel', 'Adım')} {currentStepIndex + 1} / {lesson.steps.length}: {currentStep.title}
          </h3>
          <span className="text-xs font-bold text-slate-400">{progressPercent}%</span>
        </div>

        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div className="bg-[#97480d] h-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>

        <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
          {currentStep.instruction}
        </p>

        {/* Step Prev/Next Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 font-bold text-xs rounded-xl flex items-center gap-1 transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" /> {t('lessons.prevStep', 'Önceki Adım')}
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStepIndex === lesson.steps.length - 1}
            className="px-4 py-2.5 bg-[#97480d] hover:bg-[#7a3600] text-white disabled:opacity-40 font-bold text-xs rounded-xl flex items-center gap-1 transition-all active:scale-95"
          >
            {t('lessons.nextStep', 'Sonraki Adım')} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetailView;
