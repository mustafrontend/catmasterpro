import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  X,
  Timer,
  GraduationCap,
  ShieldAlert,
  HeartPulse,
  Brain,
  Music,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface QuickActionsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (action: 'timer' | 'lessons' | 'behavior' | 'health' | 'mood' | 'calming') => void;
}

export const QuickActionsSheet: React.FC<QuickActionsSheetProps> = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  const { t } = useTranslation();

  const actions = [
    {
      id: 'timer',
      title: '3 Dakikalık Eğitime Başla',
      subtitle: 'Clicker ve ödül maması ile seans başlat',
      icon: Timer,
      color: 'bg-[#97480d] text-white',
      badge: 'Şimdi Başla',
    },
    {
      id: 'lessons',
      title: 'Eğitim Derslerini İncele',
      subtitle: 'İsmine gelme, pati verme, çanta eğitimi',
      icon: GraduationCap,
      color: 'bg-amber-100 text-[#97480d]',
    },
    {
      id: 'behavior',
      title: 'Agresyon & Isırma Rehberi',
      subtitle: 'Isırma, tırmalama ve gece koşturması çözümleri',
      icon: ShieldAlert,
      color: 'bg-sky-100 text-sky-700',
    },
    {
      id: 'health',
      title: 'Sağlık, Kilo ve Aşı Takibi',
      subtitle: 'Kilo grafiği, aşı takvimi ve vet randevuları',
      icon: HeartPulse,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      id: 'mood',
      title: 'AI Miyavlama & Mood Analizörü',
      subtitle: 'Yapay zeka ile kedi ruh hali tespiti',
      icon: Brain,
      color: 'bg-emerald-100 text-emerald-700',
      badge: 'AI',
    },
    {
      id: 'calming',
      title: 'Sakinleştirici Kedi Müzikleri',
      subtitle: 'Stres önleyici rahatlatıcı sesler ve müzik',
      icon: Music,
      color: 'bg-rose-100 text-rose-700',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          {/* Slide-Up Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#fbf9f7] rounded-t-3xl border-t border-slate-200 shadow-2xl p-6 z-10 max-h-[85vh] overflow-y-auto font-sans"
          >
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif font-black text-xl text-[#97480d] tracking-tight">
                    Ne Yapmak İstiyorsunuz?
                  </h2>
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  Kediniz için hızlı bir işlem veya eğitim seçin
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions List */}
            <div className="space-y-3">
              {actions.map((act) => {
                const IconComponent = act.icon;
                return (
                  <motion.button
                    key={act.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelectAction(act.id as any);
                      onClose();
                    }}
                    className="w-full bg-white hover:bg-amber-50/50 p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between transition-all group text-left"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-xl ${act.color} flex items-center justify-center shrink-0 shadow-2xs`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-sm group-hover:text-[#97480d] transition-colors">
                            {act.title}
                          </span>
                          {act.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider">
                              {act.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-medium text-slate-500 mt-0.5 line-clamp-1">
                          {act.subtitle}
                        </p>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#97480d] group-hover:translate-x-0.5 transition-all shrink-0 ltr:ml-2 rtl:mr-2" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
