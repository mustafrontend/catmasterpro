import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Globe,
  GraduationCap,
  ShieldAlert,
  HeartPulse,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Cat as CatIcon,
  Check,
} from 'lucide-react';
import { useCatStore } from '../../store/catStore';
import { AppLanguage } from '../../types/cat';

interface OnboardingWalkthroughModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

const LANGUAGES = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷', native: 'Türkçe' },
  { code: 'en', name: 'English', flag: '🇬🇧', native: 'English' },
  { code: 'es', name: 'Español', flag: '🇪🇸', native: 'Español' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', native: 'Deutsch' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', native: 'Français' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹', native: 'Italiano' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', native: 'Português' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', native: 'Русский' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', native: '日本語' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', native: '한국어' },
  { code: 'zh', name: '中文', flag: '🇨🇳', native: '中文' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', native: 'العربية' },
];

export const OnboardingWalkthroughModal: React.FC<OnboardingWalkthroughModalProps> = ({
  isOpen,
  onComplete,
}) => {
  const { t, i18n } = useTranslation();
  const setStoreLanguage = useCatStore((state) => state.setLanguage);

  const [stage, setStage] = useState<'language' | 'walkthrough'>('language');
  const [selectedLang, setSelectedLang] = useState<string>(i18n.language || 'tr');
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const handleSelectLanguage = (langCode: string) => {
    setSelectedLang(langCode);
    i18n.changeLanguage(langCode);
    setStoreLanguage(langCode as AppLanguage);
    document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = langCode;
  };

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

  const stepData = steps[currentStep];
  const IconComponent = stepData.icon;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (stage === 'language') {
      setStage('walkthrough');
    } else if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (stage === 'walkthrough' && currentStep === 0) {
      setStage('language');
    } else if (currentStep > 0) {
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
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-[0.5px] border-slate-200 overflow-hidden z-10 p-6 sm:p-7 font-sans"
        >
          {/* Header Progress & Skip */}
          <div className="flex items-center justify-between mb-5">
            {stage === 'language' ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-[#97480d] border border-amber-200 text-xs font-bold">
                <Globe className="w-3.5 h-3.5 text-amber-600" />
                <span>1 / 2 — {t('onboarding.selectLangStep', 'Dil Seçimi')}</span>
              </div>
            ) : (
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
            )}

            <button
              type="button"
              onClick={onComplete}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors px-2 py-1"
            >
              {t('onboarding.skip', 'Atla')}
            </button>
          </div>

          {/* Slide 0: Language Selector */}
          {stage === 'language' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="text-center space-y-1.5">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100/90 text-[#97480d] flex items-center justify-center border border-amber-200 shadow-sm">
                  <Globe className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-serif pt-1">
                  Dilinizi Seçin / Select Language
                </h3>
                <p className="text-xs font-medium text-slate-500">
                  Uygulamayı kullanmak istediğiniz dili seçiniz
                </p>
              </div>

              {/* 12 Language Grid */}
              <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1 custom-scrollbar">
                {LANGUAGES.map((lang) => {
                  const isSelected = selectedLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={`p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-white border-amber-600 shadow-md font-bold scale-[1.02]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 font-semibold'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{lang.flag}</span>
                        <div className="flex flex-col">
                          <span className="text-xs font-bold leading-tight">{lang.native}</span>
                          <span
                            className={`text-[10px] ${
                              isSelected ? 'text-amber-100' : 'text-slate-400'
                            }`}
                          >
                            {lang.name}
                          </span>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Slide 1-4: Feature Walkthrough */}
          {stage === 'walkthrough' && (
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
          )}

          {/* Bottom Action Navigation */}
          <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            {stage === 'walkthrough' || currentStep > 0 ? (
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
              {stage === 'language' ? (
                <>
                  <span>{t('onboarding.continueToTour', 'Devam Et')}</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : isLastStep ? (
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
