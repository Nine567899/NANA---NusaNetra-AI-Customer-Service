"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { UserProfile } from '@/types';
import { getUserProfile } from '@/lib/storage';

export default function UserStats() {
  const { publicKey } = useWallet();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (publicKey) {
      const userProfile = getUserProfile(publicKey.toBase58());
      setProfile(userProfile);
    } else {
      setProfile(null);
    }
  }, [publicKey]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (publicKey) {
        const userProfile = getUserProfile(publicKey.toBase58());
        setProfile(userProfile);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [publicKey]);

  if (!profile) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="web3-card rounded-lg p-4 zoom-transition hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>Token Balance</p>
            <p className="text-2xl font-bold gradient-text">{profile.tokenBalance}</p>
          </div>
          <div className="text-5xl diamond-sparkle">
            💎
          </div>
        </div>
      </div>

      <div className="web3-card rounded-lg p-4 zoom-transition hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>Total Rewards</p>
            <p className="text-2xl font-bold text-amber-600">{profile.totalRewards}</p>
          </div>
          <div className="text-5xl premium-glow">
            ⭐
          </div>
        </div>
      </div>

      <div className="web3-card rounded-lg p-4 zoom-transition hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>Account Type</p>
            <p className="text-2xl font-bold">
              {profile.isPremium ? (
                <span className="text-amber-600 premium-glow">Premium</span>
              ) : (
                <span className="text-gray-600">Standard</span>
              )}
            </p>
          </div>
          <div className={profile.isPremium ? "text-5xl premium-glow" : "text-5xl"}>
            {profile.isPremium ? "👑" : "🎭"}
          </div>
        </div>
      </div>
    </div>
  );
}
