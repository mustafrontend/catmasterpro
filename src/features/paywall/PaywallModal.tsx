import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  X,
  GraduationCap,
  PlayCircle,
  HeartPulse,
  BookOpen,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
  Crown,
} from 'lucide-react';
import { useCatStore } from '../../store/catStore';
import { purchaseProPackage, restoreProPurchases as serviceRestorePurchases } from '../../services/revenueCatService';
import { Capacitor } from '@capacitor/core';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { setPremium, restorePurchases } = useCatStore();
  const [selectedPlan, setSelectedPlan] = useState<'annual' | 'lifetime' | 'monthly'>('annual');
  const [isLoading, setIsLoading] = useState(false);
  const [restoreMessage, setRestoreMessage] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setIsLoading(true);
    const platform = Capacitor.getPlatform();
    if (platform === 'ios' || platform === 'android') {
      const success = await purchaseProPackage(selectedPlan);
      if (success) {
        setPremium(true);
        onClose();
      }
    } else {
      // Web browser sandbox simulation
      await new Promise((res) => setTimeout(res, 800));
      setPremium(true);
      onClose();
    }
    setIsLoading(false);
  };

  const handleRestore = async () => {
    setIsLoading(true);
    setRestoreMessage(null);
    const restored = await restorePurchases();
    setIsLoading(false);
    if (restored) {
      setRestoreMessage('Satın alımlarınız geri yüklendi! PRO aktif.');
      setTimeout(() => onClose(), 1500);
    } else {
      setRestoreMessage('Daha önce satın alınmış bir abonelik bulunamadı.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-full max-w-md bg-[#fbf9f7] text-[#1b1c1b] rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-6 flex flex-col font-sans"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#fbf9f7]/90 backdrop-blur-md px-6 py-4 border-b border-slate-200/60 flex items-center justify-between z-20">
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-slate-200/60 hover:bg-slate-300/80 text-slate-700 flex items-center justify-center transition-colors active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="font-serif font-black text-lg text-[#97480d] tracking-tight">
                Cat Master PRO
              </span>

              <div className="w-9" />
            </div>

            {/* Main Body Canvas */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Hero Section */}
              <div className="text-center flex flex-col items-center gap-2">
                {/* Hero Cat Portrait Avatar */}
                <div className="w-28 h-28 rounded-full relative z-10 shadow-lg bg-amber-100 flex items-center justify-center overflow-hidden border-4 border-white mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80"
                    alt="PRO Cat"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-1 right-1 w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                    <Crown className="w-4 h-4 fill-slate-950" />
                  </div>
                </div>

                <h1 className="font-serif text-xl sm:text-2xl font-black text-[#97480d] leading-tight">
                  {t('paywall.title')}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xs mx-auto">
                  {t('paywall.subtitle')}
                </p>
              </div>

              {/* Value Props Bento Grid (2x2) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-2xl p-3.5 shadow-2xs flex flex-col gap-1.5 items-start justify-center h-24 border border-slate-200/60">
                  <div className="bg-amber-100 p-2 rounded-full text-[#97480d]">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">8 Temel Ders</span>
                </div>

                <div className="bg-white rounded-2xl p-3.5 shadow-2xs flex flex-col gap-1.5 items-start justify-center h-24 border border-slate-200/60">
                  <div className="bg-sky-100 p-2 rounded-full text-sky-700">
                    <PlayCircle className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">AI Video Rehberler</span>
                </div>

                <div className="bg-white rounded-2xl p-3.5 shadow-2xs flex flex-col gap-1.5 items-start justify-center h-24 border border-slate-200/60">
                  <div className="bg-purple-100 p-2 rounded-full text-purple-700">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">Gelişmiş Sağlık Takibi</span>
                </div>

                <div className="bg-white rounded-2xl p-3.5 shadow-2xs flex flex-col gap-1.5 items-start justify-center h-24 border border-slate-200/60">
                  <div className="bg-rose-100 p-2 rounded-full text-rose-700">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 leading-tight">Agresiflik Kütüphanesi</span>
                </div>
              </div>

              {/* Pricing Cards Selection */}
              <div className="space-y-3 pt-1">
                {/* 1. Annual Plan Card (Recommended %70 OFF) */}
                <div
                  onClick={() => setSelectedPlan('annual')}
                  className={`relative cursor-pointer rounded-2xl p-4 transition-all border-2 ${
                    selectedPlan === 'annual'
                      ? 'bg-white border-[#97480d] shadow-md ring-2 ring-amber-200'
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-amber-600 to-[#97480d] text-white font-black text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <span>🔥 %70 İNDİRİM</span>
                    <span>•</span>
                    <span>3 GÜN ÜCRETSİZ</span>
                  </div>

                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm block">Yıllık PRO Erişim</span>
                      <span className="text-xs font-bold text-emerald-600 block mt-0.5">3 Gün Ücretsiz Dene & Sonra $19.99</span>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5 justify-end">
                        <span className="text-xs text-slate-400 line-through font-semibold">$60.00</span>
                        <span className="font-black text-xl text-[#97480d]">$19.99</span>
                      </div>
                      <div className="text-[10px] font-semibold text-slate-400">/yıl ($1.66/ay)</div>
                    </div>
                  </div>
                </div>

                {/* 2. Lifetime Plan Card */}
                <div
                  onClick={() => setSelectedPlan('lifetime')}
                  className={`relative cursor-pointer rounded-2xl p-4 transition-all border-2 ${
                    selectedPlan === 'lifetime'
                      ? 'bg-white border-[#97480d] shadow-md ring-2 ring-amber-200'
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-slate-900 text-sm">Ömür Boyu Sınırsız</span>
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-[#97480d] text-[9px] font-black uppercase">
                          Sınırsız
                        </span>
                      </div>
                      <span className="text-xs font-medium text-slate-500 block mt-0.5">Tek Seferlik Ödeme (Sonsuz Erişim)</span>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-xl text-slate-900">$39.99</div>
                      <div className="text-[10px] font-semibold text-slate-400">tek seferlik</div>
                    </div>
                  </div>
                </div>

                {/* 3. Monthly Plan Card */}
                <div
                  onClick={() => setSelectedPlan('monthly')}
                  className={`cursor-pointer rounded-2xl p-4 transition-all border-2 ${
                    selectedPlan === 'monthly'
                      ? 'bg-white border-[#97480d] shadow-md ring-2 ring-amber-200'
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-slate-900 text-sm">Aylık PRO Plan</span>
                    <div className="text-right">
                      <div className="font-black text-xl text-slate-900">$4.99</div>
                      <div className="text-[10px] font-semibold text-slate-400">/ay</div>
                    </div>
                  </div>
                </div>
              </div>

              {restoreMessage && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs font-bold text-amber-900 text-center">
                  {restoreMessage}
                </div>
              )}

              {/* Action CTA & Legal Section */}
              <div className="space-y-3 pt-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  disabled={isLoading}
                  onClick={handleSubscribe}
                  className="w-full bg-[#97480d] hover:bg-[#7a3600] text-white font-black text-base py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      İşleniyor...
                    </span>
                  ) : (
                    <span>
                      {selectedPlan === 'annual'
                        ? t('paywall.startTrialBtn')
                        : t('paywall.subscribeBtn')}
                    </span>
                  )}
                </motion.button>

                <div className="flex justify-center items-center gap-3 text-[11px] font-semibold text-slate-500 pt-1">
                  <button
                    type="button"
                    onClick={handleRestore}
                    disabled={isLoading}
                    className="hover:text-[#97480d] flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3 text-[#97480d]" /> {t('paywall.restorePurchases')}
                  </button>
                  <span>•</span>
                  <a
                    href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#97480d] transition-colors"
                  >
                    {t('paywall.terms')}
                  </a>
                  <span>•</span>
                  <a
                    href="https://www.sosyalvideoolustur.com.tr/privacy"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#97480d] transition-colors"
                  >
                    {t('paywall.privacy')}
                  </a>
                </div>

                <p className="text-center text-[10px] text-slate-400 font-normal leading-relaxed px-2">
                  {t('paywall.disclaimer')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaywallModal;
