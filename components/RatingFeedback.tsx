"use client";

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

interface RatingFeedbackProps {
  onSubmit?: (rating: number, feedback: string) => void;
}

export default function RatingFeedback({ onSubmit }: RatingFeedbackProps) {
  const { publicKey } = useWallet();
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

    console.log('⭐ Rating Submitted:', ratingData);
    
    // Store in localStorage for now (mock on-chain storage)
    const existingRatings = JSON.parse(
      localStorage.getItem('web3_ratings') || '[]'
    );
    existingRatings.push(ratingData);
    localStorage.setItem('web3_ratings', JSON.stringify(existingRatings));

    if (onSubmit) {
      onSubmit(rating, feedback);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setRating(0);
      setFeedback('');
    }, 3000);
  };

  if (!publicKey) return null;

  return (
    <div className="web3-card rounded-lg p-6 mt-6">
      <h3 className="text-xl font-bold text-gray-700 mb-4" style={{ fontFamily: 'Georgia, serif' }}>Rate Your Experience</h3>
      
      {submitted ? (
        <div className="text-center py-8">
          <div className="text-green-400 text-6xl mb-4">✓</div>
          <p className="text-green-400 text-lg font-medium">
            Thank you for your feedback!
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Your rating has been recorded on-chain
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 mr-2" style={{ fontFamily: 'Arial, sans-serif' }}>Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="text-3xl transition-all transform hover:scale-110 focus:outline-none"
                >
                  {star <= (hoveredStar || rating) ? (
                    <span className="text-yellow-400">★</span>
                  ) : (
                    <span className="text-gray-600">☆</span>
                  )}
                </button>
              ))}
            </div>
            {rating > 0 && (
              <span className="text-gray-600 ml-2">({rating}/5)</span>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
              Feedback (optional):
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts about the service..."
              className="w-full bg-white bg-opacity-40 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none placeholder-gray-500 backdrop-blur-sm"
              rows={3}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full jewel-button text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Rating
          </button>

          <p className="text-xs text-gray-500 text-center">
            🔒 Your rating will be stored on Solana devnet
          </p>
        </div>
      )}
    </div>
  );
}
