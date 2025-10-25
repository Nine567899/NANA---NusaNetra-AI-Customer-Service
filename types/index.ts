export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  rewards?: number;
}

export interface UserProfile {
  walletAddress: string;
  tokenBalance: number;
  isPremium: boolean;
  totalRewards: number;
  chatHistory: Message[];
}

export interface ChatResponse {
  message: string;
  rewards: number;
  isPremium: boolean;
}
