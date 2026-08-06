import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Edit3, Check, Plus, User, Sparkles } from 'lucide-react';
import { useCatStore } from '../../store/catStore';
import { Cat } from '../../types/cat';
import { LANGUAGES, changeAppLanguage } from '../../i18n';

interface CatSelectorHeaderProps {
  onOpenAddCatModal?: () => void;
  onOpenEditCatModal?: (cat: Cat) => void;
  onOpenPaywallModal: () => void;
}

export const CatSelectorHeader: React.FC<CatSelectorHeaderProps> = ({
  onOpenAddCatModal,
  onOpenEditCatModal,
  onOpenPaywallModal,
}) => {
  const {
    cats,
    activeCatId,
    setActiveCatId,
    isPremium,
    getActiveCat,
    syncWithCloudBackend,
    isSyncingWithApi,
    currentLanguage,
    setLanguage,
  } = useCatStore();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const activeCat = getActiveCat();

  return (
    <header className="relative z-30 bg-[#fbf9f7]/90 backdrop-blur-md border-b border-slate-200/60 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 min-h-[4.25rem] flex items-center justify-between shadow-2xs font-sans">
      {/* 1. Left: Paw Icon (Pets) */}
      <button
        type="button"
        onClick={() => syncWithCloudBackend()}
        title="Canlı VPS API Senkronize Et"
        className="w-10 h-10 rounded-full hover:bg-slate-200/50 flex items-center justify-center text-[#97480d] transition-all active:scale-95 shrink-0"
      >
        <span className="text-2xl" role="img" aria-label="Paw">
          🐾
        </span>
      </button>

      {/* 2. Center: Cat Master Title */}
      <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => setProfileDropdownOpen(true)}>
        <h1 className="font-serif text-lg sm:text-xl font-black text-[#97480d] tracking-tight">
          Cat Master
        </h1>
        {isSyncingWithApi && (
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" title="API İstek Atılıyor..." />
        )}
      </div>

      {/* 3. Right: Small PRO Badge + Profile Account Circle */}
      <div className="flex items-center gap-2 relative">
        {/* Small PRO Badge */}
        {isPremium ? (
          <div className="flex items-center gap-1 bg-amber-100 border border-amber-300 text-[#97480d] px-2.5 py-1 rounded-full text-[11px] font-black shadow-2xs">
            <Crown className="w-3.5 h-3.5 fill-[#97480d]" />
            <span>PRO</span>
          </div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onOpenPaywallModal}
            className="flex items-center gap-1 bg-gradient-to-r from-[#97480d] to-[#f59153] text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm active:scale-95"
          >
            <Crown className="w-3 h-3 fill-white" />
            <span>PRO</span>
          </motion.button>
        )}

        {/* Account / Cat Switcher Circle */}
        <button
          type="button"
          onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          className="w-10 h-10 rounded-full hover:bg-slate-200/60 flex items-center justify-center text-slate-700 transition-all active:scale-95 shrink-0"
          title="Kedi Profili & Ayarlar"
        >
          <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center font-bold text-xs text-[#97480d]">
            {activeCat?.name ? activeCat.name.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
          </div>
        </button>

        {/* Profile / Cat Selector Dropdown Modal */}
        <AnimatePresence>
          {profileDropdownOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)} />

              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 overflow-hidden text-slate-900"
              >
                <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Kedileriniz ({cats.length})
                  </span>
                  {activeCat && (
                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        if (activeCat && onOpenEditCatModal) onOpenEditCatModal(activeCat);
                      }}
                      className="text-[11px] font-bold text-[#97480d] hover:underline flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" /> Düzenle
                    </button>
                  )}
                </div>

                <div className="max-h-48 overflow-y-auto py-1">
                  {cats.map((cat) => {
                    const isSelected = cat.id === activeCatId;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setActiveCatId(cat.id);
                          setProfileDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 flex items-center justify-between text-left transition-colors ${
                          isSelected ? 'bg-amber-50 text-[#97480d] font-bold' : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className="w-7 h-7 rounded-lg bg-amber-100 text-[#97480d] flex items-center justify-center text-xs font-bold">
                            {cat.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-bold leading-tight">{cat.name}</p>
                            <p className="text-[10px] text-slate-400">{cat.breed} • {cat.ageYears}y</p>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#97480d]" />}
                      </button>
                    );
                  })}
                </div>

                {/* Language Switcher in Dropdown */}
                <div className="px-3 py-2 border-t border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">Dil (Language):</span>
                  <select
                    value={currentLanguage}
                    onChange={(e) => {
                      const lang = e.target.value as any;
                      setLanguage(lang);
                      changeAppLanguage(lang);
                    }}
                    className="bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.label} ({l.code.toUpperCase()})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="px-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      if (onOpenAddCatModal) onOpenAddCatModal();
                    }}
                    className="w-full py-2 px-3 rounded-xl border border-dashed border-slate-300 hover:border-[#97480d] hover:bg-amber-50/40 text-slate-700 hover:text-[#97480d] text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Plus className="w-4 h-4 text-[#97480d]" /> Yeni Kedi Ekle
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default CatSelectorHeader;
