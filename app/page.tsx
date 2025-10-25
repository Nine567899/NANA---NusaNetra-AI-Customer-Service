"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import ChatInterface from '@/components/ChatInterface';
import UserStats from '@/components/UserStats';
import RatingFeedback from '@/components/RatingFeedback';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect, useState } from 'react';
import { getUserProfile, saveUserProfile } from '@/lib/storage';
import { UserProfile } from '@/types';

export default function Home() {
  const { publicKey } = useWallet();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (publicKey) {
      const walletAddress = publicKey.toBase58();
      const userProfile = getUserProfile(walletAddress);
      setProfile(userProfile);
      
      // Test bs58 encoding - log wallet address
      console.log('✅ Wallet Connected!');
      console.log('📍 Base58 Address:', walletAddress);
      console.log('🔢 Public Key bytes:', publicKey.toBytes());
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
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">
              {t.title}
            </h1>
            <p className="text-gray-400">
              {t.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            {profile && (
              <button
                onClick={handleTogglePremium}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  profile.isPremium
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                {profile.isPremium ? t.premium : t.upgradeToPremium}
              </button>
            )}
            <WalletMultiButton />
          </div>
        </div>

        {publicKey && <UserStats />}

        <div className="web3-card rounded-xl p-6 h-[600px]">
          <ChatInterface />
        </div>

        {publicKey && <RatingFeedback />}

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p className="mb-2">
            {t.footerText}
          </p>
          {profile && profile.tokenBalance >= 500 && !profile.isPremium && (
            <p className="text-yellow-500 font-medium animate-pulse">
              {t.premiumUnlockText}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
