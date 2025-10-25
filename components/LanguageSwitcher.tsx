"use client";

import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-white bg-opacity-30 rounded-lg p-1 backdrop-blur-sm">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all zoom-transition ${
          language === 'en'
            ? 'jewel-button text-white'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        🇬🇧 EN
      </button>
      <button
        onClick={() => setLanguage('id')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all zoom-transition ${
          language === 'id'
            ? 'jewel-button text-white'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        🇮🇩 ID
      </button>
    </div>
  );
}
