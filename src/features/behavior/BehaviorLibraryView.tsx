import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Search,
  Zap,
  ShieldAlert,
  AlertTriangle,
  Home,
  Moon,
  AlertCircle,
  Scissors,
  CheckCircle2,
  XCircle,
  Stethoscope,
  Clock,
  Lock,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  Shield
} from 'lucide-react';
import { BehaviorArticle, BEHAVIOR_ARTICLES, getLocalizedBehaviorArticle } from './behaviorData';
import { useCatStore } from '../../store/catStore';

interface BehaviorLibraryViewProps {
  onUnlockPremium?: () => void;
  isPremiumUser?: boolean;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  ShieldAlert,
  AlertTriangle,
  Home,
  Moon,
  AlertCircle,
  Scissors,
  Shield,
};

export const BehaviorLibraryView: React.FC<BehaviorLibraryViewProps> = ({
  onUnlockPremium,
  isPremiumUser = false,
}) => {
  const { t, i18n } = useTranslation();
  const { currentLanguage } = useCatStore();
  const activeLang = i18n.language || currentLanguage || 'en';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<BehaviorArticle | null>(null);

  const categories = [
    { id: 'all', label: t('behavior.categoryAll') },
    { id: 'aggression', label: t('behavior.categoryAggression') },
    { id: 'anxiety', label: t('behavior.categoryNight') },
    { id: 'habits', label: t('behavior.categoryLitter') },
  ];

  const localizedArticles = useMemo(() => {
    return BEHAVIOR_ARTICLES.map((art) => getLocalizedBehaviorArticle(art, activeLang));
  }, [activeLang]);

  const filteredArticles = useMemo(() => {
    return localizedArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'all' || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [localizedArticles, selectedCategory, searchQuery]);

  const getSeverityBadge = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'high':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
            High Severity
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            Medium Severity
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Low Severity
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 pt-4 px-4 sm:px-6 max-w-5xl mx-auto font-sans">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#97480d] tracking-tight mb-1 font-serif">
          {t('behavior.title')}
        </h1>
        <p className="text-slate-600 text-sm font-medium">
          {t('behavior.subtitle')}
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder={t('behavior.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-[#97480d] text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredArticles.map((article) => {
          const Icon = ICON_MAP[article.icon] || ShieldAlert;
          const isLocked = article.isPremium && !isPremiumUser;

          return (
            <motion.div
              key={article.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (isLocked && onUnlockPremium) {
                  onUnlockPremium();
                } else {
                  setActiveArticle(article);
                }
              }}
              className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-[#97480d] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    {getSeverityBadge(article.severity)}
                    {article.isPremium && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 uppercase tracking-wider">
                        PRO
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-[#97480d] transition-colors leading-snug font-serif">
                    {article.title}
                  </h3>
                  <p className="text-xs font-medium text-[#97480d] mt-0.5">
                    {article.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-500 font-medium line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-3 mt-3 flex items-center justify-between border-t border-slate-100">
                <span className="text-xs font-bold text-[#97480d] group-hover:underline flex items-center gap-1">
                  {t('behavior.readGuide')}
                </span>
                <ChevronRight className="w-4 h-4 text-[#97480d] group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl overflow-y-auto max-h-[85vh] space-y-5 relative"
            >
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div>
                <h2 className="text-xl font-black text-slate-900 font-serif">{activeArticle.title}</h2>
                <p className="text-xs font-bold text-[#97480d] mt-1">{activeArticle.subtitle}</p>
              </div>

              {activeArticle.videoUrl && (
                <div className="rounded-2xl overflow-hidden bg-slate-950 border border-slate-200">
                  <video src={activeArticle.videoUrl} autoPlay loop muted playsInline controls className="w-full h-48 object-cover" />
                </div>
              )}

              {/* Dos & Donts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 space-y-2">
                  <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t('behavior.dos')}
                  </h4>
                  <ul className="space-y-1 text-xs text-emerald-950 font-medium">
                    {activeArticle.dos.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 space-y-2">
                  <h4 className="text-xs font-black text-rose-800 uppercase tracking-wider flex items-center gap-1">
                    <XCircle className="w-4 h-4 text-rose-600" /> {t('behavior.donts')}
                  </h4>
                  <ul className="space-y-1 text-xs text-rose-950 font-medium">
                    {activeArticle.donts.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Vet Warning */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs font-medium text-amber-950 space-y-1">
                <div className="font-extrabold text-amber-900 flex items-center gap-1">
                  <Stethoscope className="w-4 h-4 text-amber-700" /> {t('behavior.vetWarning')}
                </div>
                <p>{activeArticle.vetWarning}</p>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="w-full bg-[#97480d] text-white font-extrabold py-3 rounded-2xl text-xs shadow-md"
              >
                Kapat
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BehaviorLibraryView;
