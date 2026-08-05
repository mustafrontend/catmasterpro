import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Home as HomeIcon,
  GraduationCap,
  ShieldAlert,
  User as ProfileIcon,
  Timer as TimerIcon,
  Sparkles,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Flame,
  Play,
  Crown,
  ShieldCheck,
  RotateCcw,
  Cat as CatIcon,
  Brain,
} from 'lucide-react';
import { useCatStore } from './store/catStore';
import { CatSelectorHeader } from './features/cat/CatSelectorHeader';
import { AddCatModal } from './features/cat/AddCatModal';
import { CatProfileManager } from './features/cat/CatProfileManager';
import { HomePageView } from './features/home/HomePageView';
import { TrainingCenterView } from './features/training/TrainingCenterView';
import { HealthHubView } from './features/health/HealthHubView';
import { CatMoodAnalyzerView } from './features/ai/CatMoodAnalyzerView';
import { CatRelaxingPlayerView } from './features/calming/CatRelaxingPlayerView';
import { BehaviorLibraryView } from './features/behavior/BehaviorLibraryView';
import { LessonDetailView } from './features/training/LessonDetailView';
import { SessionTimerView } from './features/timer/SessionTimerView';
import { PaywallModal } from './features/paywall/PaywallModal';
import { initializeRevenueCat } from './services/revenueCatService';
import { LESSONS_DATA, Lesson } from './features/training/lessonsData';
import { Cat } from './types/cat';

export type AppPage = 'home' | 'lessons' | 'lesson-detail' | 'behavior' | 'profile' | 'mood' | 'calming';

export const App: React.FC = () => {
  const { t } = useTranslation();
  const { isPremium, streak, getActiveCat, recordTrainingSession, fetchLessonsFromApi, syncWithCloudBackend, restorePurchases } = useCatStore();

  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('recall');
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);

  // Play cute kitten meow 2 times on app opening
  const playKittenWelcomeMeowDouble = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const playSingleKittenMeow = (startTime: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        // Cute high-pitched kitten frequency (650Hz -> 1250Hz -> 500Hz)
        osc.frequency.setValueAtTime(650, startTime);
        osc.frequency.exponentialRampToValueAtTime(1250, startTime + 0.12);
        osc.frequency.exponentialRampToValueAtTime(500, startTime + 0.28);

        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.28);
      };

      // 2 meows: 1st at 0s, 2nd at 0.35s
      const now = ctx.currentTime;
      playSingleKittenMeow(now);
      playSingleKittenMeow(now + 0.35);
    } catch {
      // Audio fallback
    }
  };

  // Sync VPS backend, lessons, and trigger meow on launch
  useEffect(() => {
    fetchLessonsFromApi();
    syncWithCloudBackend();

    // Trigger welcome meow
    const timer = setTimeout(() => {
      playKittenWelcomeMeowDouble();
    }, 600);

    // Fallback on first click for strict browser autoplay policies
    const handleFirstInteraction = () => {
      playKittenWelcomeMeowDouble();
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleFirstInteraction);
    };
  }, []);

  const activeCat = getActiveCat();

  const handleOpenLesson = (lesson: Lesson) => {
    setSelectedLessonId(lesson.id);
    setCurrentPage('lesson-detail');
  };

  const handleStartSession = (lesson?: Lesson) => {
    if (lesson) setSelectedLessonId(lesson.id);
    setIsTimerOpen(true);
  };

  const handleSaveSession = (data: { durationSeconds: number; treatCount: number; rating: number; notes?: string }) => {
    const currentLesson = LESSONS_DATA.find((l) => l.id === selectedLessonId);
    recordTrainingSession({
      catId: activeCat?.id || 'cat_1',
      date: new Date().toISOString().slice(0, 10),
      durationSeconds: data.durationSeconds,
      treatCount: data.treatCount,
      rating: data.rating as 1 | 2 | 3 | 4 | 5,
      notes: data.notes,
      skillId: selectedLessonId,
      skillTitle: currentLesson?.title || 'Serbest Seans',
    });
    setIsTimerOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f7] text-slate-800 flex flex-col font-sans">
      {/* Clean Single Top Header Bar */}
      <CatSelectorHeader onOpenPaywallModal={() => setIsPaywallOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pt-4 pb-28">
        {/* PAGE 1: HOME */}
        {currentPage === 'home' && (
          <HomePageView
            onOpenLesson={handleOpenLesson}
            onOpenTimer={() => setIsTimerOpen(true)}
            onOpenPaywall={() => setIsPaywallOpen(true)}
            onNavigateTab={(page) => setCurrentPage(page)}
          />
        )}

        {/* PAGE 2: LESSONS CENTER */}
        {currentPage === 'lessons' && (
          <TrainingCenterView
            onOpenLesson={handleOpenLesson}
            onOpenPaywall={() => setIsPaywallOpen(true)}
            isPremiumUser={isPremium}
          />
        )}

        {/* PAGE 3: LESSON DETAIL PLAYER */}
        {currentPage === 'lesson-detail' && (
          <LessonDetailView
            lessonId={selectedLessonId}
            onStartSession={handleStartSession}
            onBack={() => setCurrentPage('lessons')}
            onUnlockPremium={() => setIsPaywallOpen(true)}
            isPremiumUser={isPremium}
          />
        )}

        {/* PAGE 4: BEHAVIOR LIBRARY */}
        {currentPage === 'behavior' && (
          <BehaviorLibraryView
            onUnlockPremium={() => setIsPaywallOpen(true)}
            isPremiumUser={isPremium}
          />
        )}

        {/* PAGE 5: AI MOOD ANALYZER */}
        {currentPage === 'mood' && (
          <CatMoodAnalyzerView
            onUnlockPremium={() => setIsPaywallOpen(true)}
            isPremiumUser={isPremium}
          />
        )}

        {/* PAGE 6: CAT TV & CALMING MEDIA PLAYER */}
        {currentPage === 'calming' && (
          <CatRelaxingPlayerView
            onUnlockPremium={() => setIsPaywallOpen(true)}
            isPremiumUser={isPremium}
          />
        )}

        {/* PAGE 6: PROFILE & HEALTH */}
        {currentPage === 'profile' && (
          <div className="space-y-6">
            <CatProfileManager
              onOpenPaywallModal={() => setIsPaywallOpen(true)}
              onStartTraining={() => setCurrentPage('lessons')}
            />
            <div className="border-t border-slate-200 pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black tracking-tight text-slate-900 font-serif">
                  Kedim Sağlık & Takip Merkezi
                </h3>
                <button
                  onClick={() => restorePurchases()}
                  className="text-xs font-bold text-[#97480d] flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Satın Alımları Geri Yükle
                </button>
              </div>
              <HealthHubView />
            </div>
          </div>
        )}
      </main>

      {/* Floating Action Button & Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#fbf9f7]/95 backdrop-blur-md border-t border-slate-200/80 px-4 py-2">
        <div className="max-w-md mx-auto flex items-center justify-between relative">
          
          {/* Nav Item 1: Home */}
          <button
            onClick={() => setCurrentPage('home')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
              currentPage === 'home' ? 'text-[#97480d] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="text-[10px]">{t('nav.home')}</span>
          </button>

          {/* Nav Item 2: Lessons */}
          <button
            onClick={() => setCurrentPage('lessons')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
              currentPage === 'lessons' || currentPage === 'lesson-detail'
                ? 'text-[#97480d] font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <GraduationCap className="w-5 h-5" />
            <span className="text-[10px]">{t('nav.lessons')}</span>
          </button>

          {/* Center Floating Action Button: Start Training Session */}
          <div className="relative -top-5">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsTimerOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#97480d] to-[#fd9859] text-white flex flex-col items-center justify-center shadow-lg border-4 border-[#fbf9f7] active:scale-95 transition-all"
            >
              <CatIcon className="w-6 h-6 fill-white text-white" />
            </motion.button>
          </div>

          {/* Nav Item 3: Behavior */}
          <button
            onClick={() => setCurrentPage('behavior')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
              currentPage === 'behavior' ? 'text-[#97480d] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldAlert className="w-5 h-5" />
            <span className="text-[10px]">{t('nav.behavior')}</span>
          </button>

          {/* Nav Item 4: Profile & Health */}
          <button
            onClick={() => setCurrentPage('profile')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
              currentPage === 'profile' ? 'text-[#97480d] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ProfileIcon className="w-5 h-5" />
            <span className="text-[10px]">{t('nav.profile')}</span>
          </button>
        </div>
      </div>

      {/* Interactive Training Session Timer Modal */}
      {isTimerOpen && (
        <div className="fixed inset-0 z-50 bg-[#fbf9f7] overflow-y-auto">
          <SessionTimerView
            skillTitle={
              LESSONS_DATA.find((l) => l.id === selectedLessonId)?.title || 'Serbest Seans'
            }
            skillId={selectedLessonId}
            onSaveSession={handleSaveSession}
            onClose={() => setIsTimerOpen(false)}
          />
        </div>
      )}

      {/* Paywall Subscription Modal */}
      <PaywallModal
        isOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
      />
    </div>
  );
};

export default App;
