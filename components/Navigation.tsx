"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: '/', label: t.navHome },
    { href: '/demo', label: t.navDemo },
    { href: '/whitepaper', label: t.navWhitepaper },
    { href: '/about', label: t.navAbout },
    { href: '/rating', label: t.navRating },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 hover-lift">
              <span className="text-2xl font-bold bg-gradient-to-r from-[#FFC0CB] to-[#D8A39D] text-transparent bg-clip-text">
                {t.title}
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-[#FFC0CB] to-[#D8A39D] text-white'
                    : 'text-gray-700 hover:bg-pink-50'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <LanguageSwitcher />
            <WalletMultiButton className="!bg-gradient-to-r !from-[#FFC0CB] !to-[#D8A39D] hover-lift" />
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-pink-600 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-white/95 backdrop-blur-md">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive(item.href)
                  ? 'bg-gradient-to-r from-[#FFC0CB] to-[#D8A39D] text-white'
                  : 'text-gray-700 hover:bg-pink-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <WalletMultiButton className="!w-full !bg-gradient-to-r !from-[#FFC0CB] !to-[#D8A39D]" />
          </div>
        </div>
      </div>
    </nav>
  );
}
