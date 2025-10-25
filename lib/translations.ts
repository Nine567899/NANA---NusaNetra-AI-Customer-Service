export type Language = 'en' | 'id';

export const translations = {
  en: {
    // Header
    title: "Web3 AI Customer Service",
    subtitle: "Decentralized AI-powered support with Solana integration",
    selectWallet: "Select Wallet",
    premium: "⭐ Premium",
    upgradeToPremium: "Upgrade to Premium",
    
    // Chat Interface
    connectWallet: "Connect Your Wallet",
    connectWalletDesc: "Please connect your Solana wallet to start chatting",
    welcomeTitle: "Welcome to Web3 AI Customer Service!",
    welcomeDesc: "Ask me anything about blockchain, Solana, or our services.",
    typingPlaceholder: "Type your message...",
    sendButton: "Send",
    
    // User Stats
    tokenBalance: "Token Balance",
    totalRewards: "Total Rewards",
    accountType: "Account Type",
    accountPremium: "Premium",
    accountStandard: "Standard",
    
    // Rating Feedback
    ratingTitle: "Rate Your Experience",
    ratingLabel: "Rating:",
    feedbackLabel: "Feedback (optional):",
    feedbackPlaceholder: "Share your thoughts about the service...",
    submitRating: "Submit Rating",
    ratingSuccess: "Thank you for your feedback!",
    ratingSuccessDesc: "Your rating has been recorded on-chain",
    ratingOnChain: "🔒 Your rating will be stored on Solana devnet",
    
    // Footer
    footerText: "🔒 Wallet-verified interactions • 🤖 AI-powered responses • 🪙 Earn rewards for engagement",
    premiumUnlockText: "You have enough tokens to unlock premium features! Click \"Upgrade to Premium\" above.",
    
    // Tokens
    tokensEarned: "tokens earned",
  },
  
  id: {
    // Header
    title: "Layanan Pelanggan AI Web3",
    subtitle: "Dukungan AI terdesentralisasi dengan integrasi Solana",
    selectWallet: "Pilih Dompet",
    premium: "⭐ Premium",
    upgradeToPremium: "Upgrade ke Premium",
    
    // Chat Interface
    connectWallet: "Hubungkan Dompet Anda",
    connectWalletDesc: "Silakan hubungkan dompet Solana Anda untuk mulai chatting",
    welcomeTitle: "Selamat datang di Layanan Pelanggan AI Web3!",
    welcomeDesc: "Tanyakan apa saja tentang blockchain, Solana, atau layanan kami.",
    typingPlaceholder: "Ketik pesan Anda...",
    sendButton: "Kirim",
    
    // User Stats
    tokenBalance: "Saldo Token",
    totalRewards: "Total Hadiah",
    accountType: "Tipe Akun",
    accountPremium: "Premium",
    accountStandard: "Standar",
    
    // Rating Feedback
    ratingTitle: "Beri Rating Pengalaman Anda",
    ratingLabel: "Rating:",
    feedbackLabel: "Feedback (opsional):",
    feedbackPlaceholder: "Bagikan pendapat Anda tentang layanan ini...",
    submitRating: "Kirim Rating",
    ratingSuccess: "Terima kasih atas feedback Anda!",
    ratingSuccessDesc: "Rating Anda telah tersimpan on-chain",
    ratingOnChain: "🔒 Rating Anda akan disimpan di Solana devnet",
    
    // Footer
    footerText: "🔒 Interaksi terverifikasi wallet • 🤖 Respon AI • 🪙 Dapatkan hadiah dari engagement",
    premiumUnlockText: "Anda memiliki cukup token untuk membuka fitur premium! Klik \"Upgrade ke Premium\" di atas.",
    
    // Tokens
    tokensEarned: "token didapat",
  }
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
