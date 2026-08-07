import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  GraduationCap,
  ShieldAlert,
  HeartPulse,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Cat as CatIcon,
} from 'lucide-react';

interface OnboardingWalkthroughModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const OnboardingWalkthroughModal: React.FC<OnboardingWalkthroughModalProps> = ({
  isOpen,
  onComplete,
}) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: GraduationCap,
      badgeColor: 'bg-amber-100 text-[#97480d] border-amber-200',
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white',
      title: t('onboarding.step1Title', 'CatMaster PRO\'ya Hoş Geldiniz'),
      subtitle: t(
        'onboarding.step1Sub',
        '3 dakikalık bilimsel pozitif pekiştirme ve clicker metodu ile kedinizin zeka ve komut eğitimini tamamlayın.'
      ),
      highlight: t('onboarding.step1Highlight', '🎓 8 Adım Adım Eğitim Dersi'),
    },
    {
      icon: ShieldAlert,
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
      iconBg: 'bg-gradient-to-br from-sky-500 to-indigo-600 text-white',
      title: t('onboarding.step2Title', 'Agresyon & Davranış Çözümleri'),
      subtitle: t(
        'onboarding.step2Sub',
        'Isırma, tırmalama, kum kabı reddi ve gece koşturması gibi zorlu davranışlar için veteriner onaylı kılavuzlar.'
      ),
      highlight: t('onboarding.step2Highlight', '🛡️ Davranış & Agresyon Kütüphanesi'),
    },
    {
      icon: HeartPulse,
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      iconBg: 'bg-gradient-to-br from-purple-500 to-pink-600 text-white',
      title: t('onboarding.step3Title', 'Sağlık Karnesi & Aşı Takvimi'),
      subtitle: t(
        'onboarding.step3Sub',
        'Kedinizin kilo değişimini grafiklerle izleyin, aşı günlerini ve veteriner randevularını bildirimlerle hatırlayın.'
      ),
      highlight: t('onboarding.step3Highlight', '💉 Akıllı Mobil Bildirim Motoru'),
    },
    {
      icon: Sparkles,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white',
      title: t('onboarding.step4Title', 'AI Mood & Rahatlatıcı Müzikler'),
      subtitle: t(
        'onboarding.step4Sub',
        'Yapay zeka miyavlama analizörü ile kedi ruh halini tespit edin, anti-stres müzikleri ile kedinizi sakinleştirin.'
      ),
      highlight: t('onboarding.step4Highlight', '🧠 Yapay Zeka & Rahatlatıcı Sesler'),
    },
  ];

  if (!isOpen) return null;

  const stepData = steps[currentStep];
  const IconComponent = stepData.icon;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-[0.5px] border-slate-200 overflow-hidden z-10 p-6 sm:p-8 font-sans"
        >
          {/* Header Progress & Skip */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1.5">
              {steps.map((_, idx) => (
                <motion.div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentStep
                      ? 'w-7 bg-[#97480d]'
                      : idx < currentStep
                      ? 'w-2 bg-amber-300'
                      : 'w-2 bg-slate-200'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={onComplete}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors px-2 py-1"
            >
              {t('onboarding.skip', 'Atla')}
            </button>
          </div>

          {/* Slide Content with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center text-center space-y-4 my-2"
            >
              {/* Animated Icon Avatar */}
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.08, 1], rotate: [0, 2, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl ${stepData.iconBg} shadow-xl flex items-center justify-center`}
                >
                  <IconComponent className="w-10 h-10 sm:w-12 sm:h-12" />
                </motion.div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#97480d]">
                  <CatIcon className="w-4 h-4" />
                </div>
              </div>

              {/* Highlight Pill */}
              <span
                className={`px-3 py-1 rounded-full text-[11px] font-extrabold border ${stepData.badgeColor}`}
              >
                {stepData.highlight}
              </span>

              {/* Title & Subtitle */}
              <div className="space-y-2 pt-1">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-serif">
                  {stepData.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed max-w-xs mx-auto">
                  {stepData.subtitle}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Action Navigation */}
          <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="px-4 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t('onboarding.prev', 'Geri')}</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#97480d] via-[#b65813] to-[#fd9859] hover:from-[#7a3600] text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              {isLastStep ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-amber-200" />
                  <span>{t('onboarding.startNowBtn', 'Harika! Başlayalım 🚀')}</span>
                </>
              ) : (
                <>
                  <span>{t('onboarding.next', 'Devam Et')}</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
