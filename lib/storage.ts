import { UserProfile, Message } from '@/types';

const STORAGE_KEY = 'web3_ai_customer_service';

export function getUserProfile(walletAddress: string): UserProfile | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(`${STORAGE_KEY}_${walletAddress}`);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(
      `${STORAGE_KEY}_${profile.walletAddress}`,
      JSON.stringify(profile)
    );
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}

export function createUserProfile(walletAddress: string): UserProfile {
  return {
    walletAddress,
    tokenBalance: Math.floor(Math.random() * 1000),
    isPremium: false,
    totalRewards: 0,
    chatHistory: [],
  };
}

export function addMessageToHistory(
  profile: UserProfile,
  message: Message
): UserProfile {
  const updatedProfile = {
    ...profile,
    chatHistory: [...profile.chatHistory, message],
  };
  saveUserProfile(updatedProfile);
  return updatedProfile;
}

export function updateUserRewards(
  profile: UserProfile,
  rewards: number
): UserProfile {
  const updatedProfile = {
    ...profile,
    tokenBalance: profile.tokenBalance + rewards,
    totalRewards: profile.totalRewards + rewards,
  };
  saveUserProfile(updatedProfile);
  return updatedProfile;
}
