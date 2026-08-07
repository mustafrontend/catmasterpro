import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Flame,
  Play,
  BookOpen,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  HeartPulse,
  Crown,
  Calendar,
  Scale,
  Zap,
  Brain,
  Tv,
  Bell,
  Clock,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useCatStore } from '../../store/catStore';
import { LESSONS_DATA, Lesson } from '../training/lessonsData';
import { AppPage } from '../../App';

interface HomePageViewProps {
  onOpenLesson: (lesson: Lesson) => void;
  onOpenTimer: () => void;
  onOpenPaywall: () => void;
  onNavigateTab: (page: AppPage) => void;
}

export const HomePageView: React.FC<HomePageViewProps> = ({
  onOpenLesson,
  onOpenTimer,
  onOpenPaywall,
  onNavigateTab,
}) => {
  const { t } = useTranslation();
  const { streak, getActiveCat, isPremium } = useCatStore();
  const activeCat = getActiveCat();
  const freeLesson = LESSONS_DATA[0]; // Recall lesson

  return (
    <div className="space-y-5 pb-8 animate-fade-in font-sans max-w-xl mx-auto">
      
      {/* Top Bar / Header Section matching design */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <span className="text-[11px] font-extrabold text-[#97480d] uppercase tracking-wider block">
            {t('appName')}
          </span>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight font-serif">
            {t('home.title')}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Day Streak Badge */}
          <div className="flex items-center gap-1.5 bg-amber-50/80 border border-amber-200/90 px-3 py-1.5 rounded-full shadow-2xs">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="text-xs font-black text-slate-800">
              {streak.currentStreak || 5} {t('home.streakBadge')}
            </span>
          </div>

          {/* Upgrade PRO Badge */}
          {!isPremium && (
            <button
              onClick={onOpenPaywall}
              className="bg-[#97480d] hover:bg-[#7a3600] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Crown className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>{t('home.proUpgrade')}</span>
            </button>
          )}
        </div>
      </div>

      {/* 3D Soft Pedestal Hero Banner (Today's Session) */}
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/70 relative overflow-hidden flex flex-col justify-between"
      >
        {/* Soft Warm Glow Background */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-amber-100/80 text-[#97480d]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t('home.positiveReinforcement', 'Pozitif Pekiştirme')}</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight font-serif">
            {activeCat
              ? t('home.heroTitle', { name: activeCat.name })
              : t('home.heroTitleDefault')}
          </h2>

          <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-sm">
            {t('home.heroSubtitle')}
          </p>

          {/* 3D Cat & Brain Spheres Illustration Display */}
          <div className="my-2 relative flex items-center justify-center py-2">
            <div className="w-full h-36 rounded-2xl bg-gradient-to-b from-amber-50/50 to-orange-100/40 border border-amber-100 flex items-center justify-center overflow-hidden relative shadow-inner">
              <img
                src="/assets/cat_3d_hero.jpg"
                alt="3D Cat Training"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={onOpenTimer}
              className="w-full py-3.5 bg-[#97480d] hover:bg-[#7a3600] text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>{t('home.startSessionBtn')}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 5 Feature Cards (Lessons, Behavior, Kedi TV, AI Mod, Health) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* Card 1: Lessons */}
        <button
          onClick={() => onNavigateTab('lessons')}
          className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-center gap-2 text-center group"
        >
          <div className="w-11 h-11 rounded-2xl bg-amber-100/80 text-[#97480d] flex items-center justify-center group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-xs font-extrabold text-slate-800">{t('home.quickLessons')}</span>
        </button>

        {/* Card 2: Behavior */}
        <button
          onClick={() => onNavigateTab('behavior')}
          className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-center gap-2 text-center group"
        >
          <div className="w-11 h-11 rounded-2xl bg-sky-100/80 text-sky-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xs font-extrabold text-slate-800">{t('home.quickBehavior')}</span>
        </button>

        {/* Card 3: Kedi TV */}
        <button
          onClick={() => onNavigateTab('calming')}
          className="bg-white p-4 rounded-3xl border border-amber-300 shadow-2xs hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-center gap-2 text-center group relative overflow-hidden"
        >
          <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-2xs group-hover:scale-105 transition-transform">
            <Tv className="w-5 h-5" />
          </div>
          <span className="text-xs font-black text-[#97480d]">{t('home.quickCalming', 'Kedi TV & Çağırıcı')}</span>
        </button>

        {/* Card 4: AI Mod */}
        <button
          onClick={() => onNavigateTab('mood')}
          className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-center gap-2 text-center group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-[#97480d] text-white flex items-center justify-center font-black shadow-2xs group-hover:scale-105 transition-transform">
            <Brain className="w-5 h-5" />
          </div>
          <span className="text-xs font-extrabold text-[#97480d]">{t('home.quickPrompts')}</span>
        </button>

        {/* Card 5: Health */}
        <button
          onClick={() => onNavigateTab('profile')}
          className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all active:scale-95 flex flex-col items-center justify-center gap-2 text-center group col-span-2 sm:col-span-1"
        >
          <div className="w-11 h-11 rounded-2xl bg-purple-100/80 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <HeartPulse className="w-5 h-5" />
          </div>
          <span className="text-xs font-extrabold text-slate-800">{t('home.quickHealth')}</span>
        </button>
      </div>

      {/* Spotlight Free Lesson Stage Section (Matching 3D Stage UI design) */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-black uppercase text-[#97480d] tracking-wider flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            {t('home.freeLessonSpotlight')}
          </span>
          <span className="bg-emerald-100 text-emerald-800 font-extrabold text-[10px] uppercase px-3 py-0.5 rounded-full">
            {t('home.freeBadge')}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-black text-slate-900 font-serif">İsmine Gelme (Recall)</h3>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Kedinizin seslendiğinizde koşarak gelmesini sağlayın
          </p>
        </div>

        <div className="pt-1">
          <button
            onClick={() => onOpenLesson(freeLesson)}
            className="w-full py-3.5 bg-slate-950 hover:bg-slate-800 text-white rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 active:scale-98 shadow-md"
          >
            <span>{t('home.goToLesson')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Health & Vet Summary */}
      {activeCat && (
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 font-serif">
              {t('home.healthSummaryTitle')}
            </h3>
            <button
              onClick={() => onNavigateTab('profile')}
              className="text-xs font-extrabold text-[#97480d] hover:underline"
            >
              {t('home.viewAll')}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold mb-1">
                <Scale className="w-4 h-4 text-sky-500" />
                <span>{t('home.lastWeight')}</span>
              </div>
              <p className="text-base font-black text-slate-900">{activeCat.weightKg} kg</p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/60">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold mb-1">
                <Calendar className="w-4 h-4 text-emerald-500" />
                <span>{t('home.upcomingVet')}</span>
              </div>
              <p className="text-xs font-extrabold text-slate-800 truncate">15 Aug (Rabies)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
