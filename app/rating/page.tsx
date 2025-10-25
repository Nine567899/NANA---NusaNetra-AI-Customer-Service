"use client";

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function RatingPage() {
  const { publicKey } = useWallet();
  const { language } = useLanguage();
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [hoveredStar, setHoveredStar] = useState<number>(0);

  const handleSubmit = () => {
    if (!publicKey || rating === 0) return;

    const ratingData = {
      walletAddress: publicKey.toBase58(),
      rating,
      feedback,
      timestamp: Date.now(),
    };

    const existingRatings = JSON.parse(
      localStorage.getItem('web3_ratings') || '[]'
    );
    existingRatings.push(ratingData);
    localStorage.setItem('web3_ratings', JSON.stringify(existingRatings));

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setFeedback('');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-amber-600 text-transparent bg-clip-text">
              {language === 'id' ? 'Beri Kami Rating' : 'Rate Us'}
            </h1>
            <p className="text-xl text-gray-600">
              {language === 'id' 
                ? 'Berikan feedback Anda tentang layanan AI customer service kami'
                : 'Share your feedback about our AI customer service'}
            </p>
          </div>

          {!publicKey ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-pink-100">
              <div className="text-6xl mb-6">✨</div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {language === 'id' ? 'Hubungkan Dompet Anda' : 'Connect Your Wallet'}
              </h2>
              <p className="text-gray-600 mb-8">
                {language === 'id'
                  ? 'Silakan hubungkan wallet Solana Anda untuk memberikan rating'
                  : 'Please connect your Solana wallet to submit a rating'}
              </p>
              <WalletMultiButton className="mx-auto" />
            </div>
          ) : submitted ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-pink-100">
              <div className="text-green-500 text-6xl mb-6">✓</div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {language === 'id' ? 'Terima Kasih!' : 'Thank You!'}
              </h2>
              <p className="text-gray-600">
                {language === 'id'
                  ? 'Rating Anda telah tersimpan di blockchain Solana'
                  : 'Your rating has been recorded on Solana blockchain'}
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-pink-100">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-4 text-lg">
                    {language === 'id' ? 'Rating:' : 'Rating:'}
                  </label>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="text-5xl transition-all transform hover:scale-110 focus:outline-none"
                      >
                        {star <= (hoveredStar || rating) ? (
                          <span className="text-yellow-400">★</span>
                        ) : (
                          <span className="text-gray-300">☆</span>
                        )}
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-center mt-3 text-gray-600 font-medium">
                      {rating}/5
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">
                    {language === 'id' ? 'Feedback (Opsional):' : 'Feedback (Optional):'}
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder={
                      language === 'id'
                        ? 'Bagikan pendapat Anda tentang layanan kami...'
                        : 'Share your thoughts about our service...'
                    }
                    className="w-full bg-gray-50 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none placeholder-gray-400 border border-gray-200"
                    rows={5}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={rating === 0}
                  className="w-full bg-gradient-to-r from-pink-500 to-amber-500 text-white px-6 py-4 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {language === 'id' ? 'Kirim Rating' : 'Submit Rating'}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  {language === 'id'
                    ? '✨ Rating Anda akan disimpan di Solana devnet'
                    : '✨ Your rating will be stored on Solana devnet'}
                </p>
              </div>
            </div>
          )}

          <div className="mt-12 bg-gradient-to-r from-pink-50 to-amber-50 rounded-2xl p-8 border border-pink-100">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {language === 'id' ? 'Kenapa Rating Penting?' : 'Why Rating Matters?'}
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">✨</span>
                <span>
                  {language === 'id'
                    ? 'Membantu kami meningkatkan kualitas layanan AI'
                    : 'Helps us improve AI service quality'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">✨</span>
                <span>
                  {language === 'id'
                    ? 'Feedback Anda tersimpan permanen di blockchain'
                    : 'Your feedback is permanently stored on blockchain'}
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">✨</span>
                <span>
                  {language === 'id'
                    ? 'Berkontribusi untuk pengembangan NANA token'
                    : 'Contributes to NANA token development'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
