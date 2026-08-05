import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Cat,
  Plus,
  Edit2,
  Calendar,
  Weight,
  ShieldCheck,
  Heart,
  Info,
  CheckCircle2,
  Globe,
  Trash2,
  RotateCcw,
  Download,
  Star,
  FileText,
  Shield,
  MessageSquare,
  ExternalLink,
  Crown
} from 'lucide-react';
import { useCatStore } from '../../store/catStore';
import { AppLanguage } from '../../types/cat';
import { AddCatModal } from './AddCatModal';
import { CatSkillProgress } from './CatSkillProgress';
import { CatSelectorHeader } from './CatSelectorHeader';

interface CatProfileManagerProps {
  onOpenPaywallModal?: () => void;
  onStartTraining?: () => void;
}

export const CatProfileManager: React.FC<CatProfileManagerProps> = ({
  onOpenPaywallModal,
  onStartTraining,
}) => {
  const { t, i18n } = useTranslation();
  const {
    cats,
    activeCatId,
    setActiveCatId,
    isPremium,
    currentLanguage,
    setLanguage,
    restorePurchases
  } = useCatStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<any | null>(null);

  // App Store Modal States
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const activeCat = cats.find((c) => c.id === activeCatId) || cats[0];

  const handleOpenAddModal = () => {
    setEditingCat(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (cat: any) => {
    setEditingCat(cat);
    setIsAddModalOpen(true);
  };

  // App Store Guideline 5.1.1: Account & Data Deletion
  const handleDeleteAllData = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  // App Store GDPR: Export Data JSON
  const handleExportData = () => {
    const dataStr = JSON.stringify({ cats, isPremium, exportDate: new Date().toISOString() }, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cat_master_data_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setStatusMessage('Verileriniz JSON olarak indirildi.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleRestore = async () => {
    const success = await restorePurchases();
    setStatusMessage(success ? 'Satın alımlar başarıyla geri yüklendi.' : 'Satın alım kaydı bulunamadı.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleRateApp = () => {
    window.open('https://apps.apple.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-28 font-sans">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 space-y-8">
        
        {/* Language Selection Card */}
        <section className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-[#97480d] flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 font-serif">
                  {t('profile.language')}
                </h3>
                <p className="text-xs text-slate-500 font-medium">12 Dil Desteği</p>
              </div>
            </div>

            <select
              value={currentLanguage}
              onChange={(e) => {
                const lang = e.target.value as AppLanguage;
                setLanguage(lang);
                i18n.changeLanguage(lang);
              }}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="tr">Türkçe (TR)</option>
              <option value="en">English (EN)</option>
              <option value="es">Español (ES)</option>
              <option value="de">Deutsch (DE)</option>
              <option value="fr">Français (FR)</option>
              <option value="it">Italiano (IT)</option>
              <option value="pt">Português (PT)</option>
              <option value="ru">Русский (RU)</option>
              <option value="ja">日本語 (JA)</option>
              <option value="ko">한국어 (KO)</option>
              <option value="zh">中文 (ZH)</option>
              <option value="ar">العربية (AR)</option>
            </select>
          </div>
        </section>

        {/* Active Cat Detailed Profile Card */}
        {activeCat && (
          <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-[#97480d] text-white flex items-center justify-center font-black text-2xl shadow-sm">
                  {activeCat.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight font-serif">{activeCat.name}</h2>
                    {isPremium && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 flex items-center gap-1">
                        <Crown className="w-3 h-3 fill-slate-950" /> PRO
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">{activeCat.breed}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleOpenEditModal(activeCat)}
                className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-[#97480d] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Edit2 className="w-3.5 h-3.5" />
                DÜZENLE
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                <div className="flex items-center text-xs font-semibold text-slate-400 gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-500" /> Yaş
                </div>
                <p className="text-sm font-extrabold text-slate-900">{activeCat.ageYears} Yıl {activeCat.ageMonths} Ay</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                <div className="flex items-center text-xs font-semibold text-slate-400 gap-1.5 mb-1">
                  <Weight className="w-3.5 h-3.5 text-emerald-500" /> Kilo
                </div>
                <p className="text-sm font-extrabold text-slate-900">{activeCat.weightKg} kg</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                <div className="flex items-center text-xs font-semibold text-slate-400 gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> Mikroçip ID
                </div>
                <p className="text-xs font-extrabold text-slate-900 truncate">
                  {activeCat.microchipId || 'Kayıtlı Değil'}
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                <div className="flex items-center text-xs font-semibold text-slate-400 gap-1.5 mb-1">
                  <Heart className="w-3.5 h-3.5 text-rose-500" /> Sağlık Durumu
                </div>
                <p className="text-xs font-extrabold text-emerald-600">Mükemmel (Aşılar Tam)</p>
              </div>
            </div>
          </section>
        )}

        {/* Skill Progress & Streak Section */}
        <section>
          <CatSkillProgress />
        </section>

        {/* Multi-Cat Profile List Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black text-slate-900 tracking-tight font-serif">{t('profile.yourCats')}</h3>
              <p className="text-xs text-slate-500 font-medium">Profil kartına tıklayarak aktif kediyi değiştirebilirsiniz.</p>
            </div>
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 bg-[#97480d] hover:bg-[#7a3600] text-white rounded-2xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              {t('profile.addCat')}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cats.map((cat) => {
              const isActive = cat.id === activeCatId;
              return (
                <motion.div
                  key={cat.id}
                  whileHover={{ y: -2 }}
                  onClick={() => setActiveCatId(cat.id)}
                  className={`p-5 rounded-3xl border transition-all cursor-pointer bg-white relative overflow-hidden ${
                    isActive
                      ? 'border-[#97480d] ring-2 ring-amber-200 shadow-md'
                      : 'border-slate-200/80 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  {isActive && (
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-[#97480d] text-white text-[10px] font-black rounded-full uppercase tracking-wider">
                      Aktif Profil
                    </span>
                  )}

                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#97480d] flex items-center justify-center font-black text-lg text-white">
                      {cat.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900 font-serif">{cat.name}</h4>
                      <p className="text-xs font-semibold text-slate-500">{cat.breed}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                    <span>{cat.ageYears} Yıl {cat.ageMonths} Ay</span>
                    <span>{cat.weightKg} kg</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* APP STORE REVIEW & LEGAL COMPLIANCE MANDATORY SECTION */}
        <section className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight font-serif">
              App Store & Yasal Haklar
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Apple App Store şartları, gizlilik hakları ve satın alım yönetimi.
            </p>
          </div>

          {statusMessage && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs font-extrabold text-amber-900 text-center">
              {statusMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Restore Purchases Button */}
            <button
              onClick={handleRestore}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-extrabold flex items-center gap-2.5 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-[#97480d]" />
              <span>Satın Alımları Geri Yükle</span>
            </button>

            {/* Rate App Button */}
            <button
              onClick={handleRateApp}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-extrabold flex items-center gap-2.5 transition-colors"
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Uygulamayı Değerlendir ⭐</span>
            </button>

            {/* Export GDPR Data JSON */}
            <button
              onClick={handleExportData}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-extrabold flex items-center gap-2.5 transition-colors"
            >
              <Download className="w-4 h-4 text-sky-600" />
              <span>Verilerimi İndir (GDPR JSON)</span>
            </button>

            {/* App Store Mandatory Guideline 5.1.1: Account & Data Deletion */}
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-3.5 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-extrabold flex items-center gap-2.5 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-rose-600" />
              <span>Hesabı ve Tüm Verileri Sil</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-500 pt-2 border-t border-slate-100">
            <a
              href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#97480d] flex items-center gap-1 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" /> Kullanım Koşulları (EULA)
            </a>
            <span>•</span>
            <a
              href="https://www.sosyalvideoolustur.com.tr/privacy"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#97480d] flex items-center gap-1 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" /> Gizlilik Politikası
            </a>
          </div>
        </section>
      </main>

      {/* Account Deletion Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 font-serif">Hesabı ve Tüm Verileri Sil</h3>
              <p className="text-xs text-slate-600 font-medium">
                Bu işlem geri alınamaz. Kedilerinizin tüm eğitimi, ağırlık geçmişi ve hatırlatıcı verileri cihazdan kalıcı olarak silinecektir.
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  İptal
                </button>
                <button
                  onClick={handleDeleteAllData}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-md"
                >
                  Evet, Sil
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add / Edit Cat Modal */}
      <AddCatModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        editingCat={editingCat}
      />
    </div>
  );
};
