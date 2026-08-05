import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Globe, ChevronDown, Plus } from 'lucide-react';
import { LANGUAGES, changeAppLanguage } from '@/i18n';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';

export interface HeaderProps {
  onNewProject?: () => void;
  activeNav?: string;
  onNavChange?: (nav: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNewProject,
  activeNav = 'dashboard',
  onNavChange,
}) => {
  const { t, i18n } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0];

  const handleLanguageSelect = (code: string) => {
    changeAppLanguage(code);
    setLangMenuOpen(false);
  };

  const navItems = [
    { id: 'dashboard', label: t('nav.dashboard') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'templates', label: t('nav.templates') },
    { id: 'analytics', label: t('nav.analytics') },
    { id: 'settings', label: t('nav.settings') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight text-slate-900">
                  {t('appName')}
                </span>
                <Badge variant="indigo" size="sm" dot>
                  {t('badge.pro')}
                </Badge>
              </div>
              <p className="text-[10px] text-slate-500 font-normal hidden sm:block">
                {t('tagline')}
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 ltr:ml-4 rtl:mr-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavChange?.(item.id)}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${
                  activeNav === item.id
                    ? 'text-slate-900 bg-slate-100'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border-[0.5px] border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>{currentLang.label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-40 bg-white border-[0.5px] border-slate-200 rounded-xl shadow-lg py-1 z-50 max-h-60 overflow-y-auto">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`w-full text-left rtl:text-right px-3 py-1.5 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 ${
                      i18n.language === lang.code ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-700'
                    }`}
                  >
                    <span>{lang.label}</span>
                    {lang.code === 'ar' && (
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-1 rounded">RTL</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-4 h-4" />}
            onClick={onNewProject}
          >
            {t('actions.create')}
          </Button>
        </div>
      </div>
    </header>
  );
};
