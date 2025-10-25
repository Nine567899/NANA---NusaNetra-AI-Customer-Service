"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          language === 'en'
            ? 'bg-purple-600 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        🇬🇧 EN
      </button>
      <button
        onClick={() => setLanguage('id')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
          language === 'id'
            ? 'bg-purple-600 text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        🇮🇩 ID
      </button>
    </div>
  );
}
