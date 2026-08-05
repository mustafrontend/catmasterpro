import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Play,
  Lock,
  Star,
  Clock,
  Sparkles,
  Award,
  CheckCircle2,
  Megaphone,
  Target,
  UserCheck,
  Box,
  Shield,
  Feather,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { LESSONS_DATA, Lesson, getLocalizedLesson } from './lessonsData';
import { useCatStore } from '../../store/catStore';
import { Badge } from '../../components/atoms/Badge';

interface TrainingCenterViewProps {
  onOpenLesson: (lesson: Lesson) => void;
  onOpenPaywall: () => void;
  isPremiumUser: boolean;
}

const LESSON_IMAGES: Record<string, string> = {
  recall: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
  'target-stick': 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80',
  sit: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80',
  'high-five': 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80',
  carrier: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=600&q=80',
  harness: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=600&q=80',
  scratching: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80',
  'litter-box': 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80',
  spin: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80',
  stay: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?auto=format&fit=crop&w=600&q=80',
  down: 'https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?auto=format&fit=crop&w=600&q=80',
  'shake-hands': 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=600&q=80',
  'jump-hoop': 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?auto=format&fit=crop&w=600&q=80',
  'ring-bell': 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=600&q=80',
  'go-to-bed': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
  'stand-up': 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=600&q=80',
  wave: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=80',
  kiss: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&w=600&q=80',
  fetch: 'https://images.unsplash.com/photo-1577023311546-acd0767731ff?auto=format&fit=crop&w=600&q=80',
  'weave-legs': 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?auto=format&fit=crop&w=600&q=80',
  'paws-up': 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?auto=format&fit=crop&w=600&q=80',
  'nail-clipping': 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=600&q=80',
  brushing: 'https://images.unsplash.com/photo-1516139008210-96e45dccd83b?auto=format&fit=crop&w=600&q=80',
  'teeth-brushing': 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
  'eye-ear-drops': 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80',
  'open-mouth': 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80',
  'vet-table': 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80',
  'quiet-meow': 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
  'no-door-scratch': 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80',
  'table-off': 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80'
};

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1561948955-570b270e7c36?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=600&q=80'
];

export const TrainingCenterView: React.FC<TrainingCenterViewProps> = ({
  onOpenLesson,
  onOpenPaywall,
  isPremiumUser,
}) => {
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useCatStore();
  const activeLang = i18n.language || currentLanguage || 'en';

  const localizedLessons = LESSONS_DATA.map((l) => getLocalizedLesson(l, activeLang));

  return (
    <div className="space-y-6 pb-6 animate-fade-in font-sans">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#97480d] tracking-tight font-serif">
          {t('lessons.title')}
        </h1>
        <p className="text-sm font-medium text-slate-600 mt-1">
          {t('lessons.subtitle')}
        </p>
      </div>

      {/* Premium Upgrade Banner */}
      {!isPremiumUser && (
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={onOpenPaywall}
          className="bg-gradient-to-r from-[#97480d] via-amber-600 to-amber-500 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4 cursor-pointer"
        >
          <div className="flex items-start gap-3.5 z-10">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black shrink-0">
              👑
            </div>
            <div>
              <h3 className="text-base font-black font-serif">{t('lessons.proBannerTitle')}</h3>
              <p className="text-xs text-amber-100 font-medium mt-0.5">{t('lessons.proBannerSub')}</p>
            </div>
          </div>

          <button
            type="button"
            className="z-10 bg-white text-[#97480d] font-extrabold text-xs px-5 py-3 rounded-2xl shadow-md transition-all active:scale-95 whitespace-nowrap"
          >
            {t('lessons.upgradeBtn')}
          </button>
        </motion.div>
      )}

      {/* Lessons Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {localizedLessons.map((lesson, index) => {
          const isLocked = lesson.isPremium && !isPremiumUser;
          const imageUrl =
            LESSON_IMAGES[lesson.id] || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length];

          return (
            <motion.div
              key={lesson.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (isLocked) {
                  onOpenPaywall();
                } else {
                  onOpenLesson(lesson);
                }
              }}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer relative"
            >
              {/* Cover Image Header or Video Preview */}
              <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                {lesson.videoUrl ? (
                  <video
                    src={lesson.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <img
                    src={imageUrl}
                    alt={lesson.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-xs font-mono">
                    {t('lessons.lessonNumber', { num: index + 1 })}
                  </span>
                </div>

                <div className="absolute top-3 right-3 z-10">
                  {isLocked ? (
                    <span className="px-3 py-1 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-full shadow-md flex items-center gap-1">
                      <Lock className="w-3 h-3" /> PRO
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-md">
                      {t('lessons.free')}
                    </span>
                  )}
                </div>

                {isLocked && (
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center text-white z-0">
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg mb-1">
                      <Lock className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider">PRO ABONELİK GEREKTİRİR</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" /> {t('lessons.mins', { mins: lesson.estimatedMinutes })}
                  </span>
                  <span>•</span>
                  <span>{t('lessons.stepCount', { count: lesson.steps.length })}</span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#97480d] transition-colors leading-tight font-serif">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-2 mt-1 leading-relaxed">
                    {lesson.subtitle}
                  </p>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                  <span className="text-xs font-bold text-[#97480d] group-hover:underline flex items-center gap-1">
                    {isLocked ? 'Kiliti Aç' : t('lessons.startLesson')}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-amber-50 text-[#97480d] flex items-center justify-center group-hover:bg-[#97480d] group-hover:text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
