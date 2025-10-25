"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import ChatInterface from '@/components/ChatInterface';
import UserStats from '@/components/UserStats';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { getUserProfile, saveUserProfile } from '@/lib/storage';
import { UserProfile } from '@/types';

export default function Demo() {
  const { publicKey } = useWallet();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (publicKey) {
      const walletAddress = publicKey.toBase58();
      const userProfile = getUserProfile(walletAddress);
      setProfile(userProfile);
      
      console.log('Wallet Connected!');
      console.log('Base58 Address:', walletAddress);
      console.log('Public Key bytes:', publicKey.toBytes());
    } else {
      setProfile(null);
    }
  }, [publicKey]);

  const handleTogglePremium = () => {
    if (profile) {
      const updatedProfile = {
        ...profile,
        isPremium: !profile.isPremium,
      };
      saveUserProfile(updatedProfile);
      setProfile(updatedProfile);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="zoom-transition">
              <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                {t.title}
              </h1>
              <p className="text-gray-700 text-base" style={{ fontFamily: 'Arial, sans-serif' }}>
                {t.subtitle}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {profile && (
                <button
                  onClick={handleTogglePremium}
                  className={`px-4 py-2 rounded-lg font-medium zoom-transition ${
                    profile.isPremium
                      ? 'jewel-button text-white premium-glow'
                      : 'bg-white bg-opacity-40 hover:bg-opacity-60 text-gray-700 shadow-md'
                  }`}
                >
                  {profile.isPremium ? t.premium : t.upgradeToPremium}
                </button>
              )}
              <div className="jewel-button rounded-lg">
                <WalletMultiButton className="!bg-transparent !shadow-none" />
              </div>
            </div>
          </div>

          {publicKey && <UserStats />}

          <div className="web3-card rounded-xl p-6 h-[600px]">
            <ChatInterface />
          </div>

          <div className="mt-8 text-center text-gray-600 text-sm">
            <p className="mb-2">
              {t.footerText}
            </p>
            {profile && profile.tokenBalance >= 500 && !profile.isPremium && (
              <p className="text-amber-600 font-medium animate-pulse premium-glow">
                ✨ {t.premiumUnlockText}
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
