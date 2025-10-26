"use client";

import { useState, useEffect, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Message, UserProfile } from '@/types';
import Image from 'next/image';
import {
  getUserProfile,
  saveUserProfile,
  createUserProfile,
  addMessageToHistory,
  updateUserRewards,
} from '@/lib/storage';

const nanaExpressions = {
  idle: '/images/nana-character.png',
  talking: '/images/nana-character.png',
  happy: '/images/nana-character.png',
  thinking: '/images/nana-character.png',
};

export default function ChatInterface() {
  const { publicKey } = useWallet();
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [nanaExpression, setNanaExpression] = useState<'idle' | 'talking' | 'happy' | 'thinking'>('idle');
  const [isNanaAnimating, setIsNanaAnimating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = language === 'id' ? [
    "Bagaimana cara mendapatkan token?",
    "Apa itu NANA token?",
    "Cara menghubungkan wallet",
    "Apa keuntungan premium?",
    "Bagaimana cara staking?",
    "Jelaskan tentang Solana"
  ] : [
    "How do I earn tokens?",
    "What is NANA token?",
    "How to connect wallet?",
    "What are premium benefits?",
    "How to stake?",
    "Tell me about Solana"
  ];

  useEffect(() => {
    if (publicKey) {
      const walletAddress = publicKey.toBase58();
      let userProfile = getUserProfile(walletAddress);
      
      if (!userProfile) {
        userProfile = createUserProfile(walletAddress);
        saveUserProfile(userProfile);
      }
      
      setProfile(userProfile);
      setMessages(userProfile.chatHistory);
    } else {
      setProfile(null);
      setMessages([]);
    }
  }, [publicKey]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (loading) {
      setNanaExpression('thinking');
      setIsNanaAnimating(true);
    } else if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
      setNanaExpression('talking');
      setIsNanaAnimating(true);
      setTimeout(() => {
        setNanaExpression('happy');
        setTimeout(() => {
          setNanaExpression('idle');
          setIsNanaAnimating(false);
        }, 2000);
      }, 1500);
    }
  }, [loading, messages]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || !publicKey || !profile) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setNanaExpression('thinking');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          walletAddress: publicKey.toBase58(),
          isPremium: profile.isPremium,
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.message) {
        throw new Error('Invalid response from server');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: Date.now(),
        rewards: data.rewards || 0,
      };

      setMessages(prev => [...prev, assistantMessage]);

      let updatedProfile = addMessageToHistory(profile, userMessage);
      updatedProfile = addMessageToHistory(updatedProfile, assistantMessage);
      if (data.rewards !== undefined && data.rewards !== null) {
        updatedProfile = updateUserRewards(updatedProfile, data.rewards);
      }
      
      setProfile(updatedProfile);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: language === 'id' 
          ? 'Maaf, ada error saat memproses pesanmu. Coba lagi yuk! 🙏' 
          : 'Sorry, I encountered an error processing your request. Please try again! 🙏',
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  if (!publicKey) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center zoom-transition">
          <div className="mb-4 diamond-sparkle text-6xl">
            ✨
          </div>
          <p className="text-2xl text-gray-700 mb-3 font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
            {t.connectWallet}
          </p>
          <p className="text-gray-600 mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
            {t.connectWalletDesc}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-full gap-4">
      <div className="hidden md:flex flex-col items-center justify-center w-1/4 bg-gradient-to-b from-pink-50 to-white rounded-lg p-4">
        <div className={`relative transition-all duration-500 ${isNanaAnimating ? 'animate-bounce' : ''}`}>
          <div className="w-48 h-48 relative">
            <Image
              src={nanaExpressions[nanaExpression]}
              alt="NANA Character"
              width={192}
              height={192}
              className={`transition-all duration-300 ${
                loading 
                  ? 'scale-110 brightness-110 hue-rotate-15' 
                  : nanaExpression === 'happy'
                  ? 'scale-105 brightness-125'
                  : nanaExpression === 'talking'
                  ? 'scale-102 animate-pulse'
                  : 'scale-100'
              }`}
              priority
            />
          </div>
        </div>
        <p className="text-sm text-pink-600 font-semibold mt-4 text-center">
          {loading 
            ? (language === 'id' ? 'NANA sedang berpikir... 🤔' : 'NANA is thinking... 🤔')
            : (language === 'id' ? 'NANA siap membantu! 💕' : 'NANA is ready to help! 💕')}
        </p>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="space-y-6">
              <div className="text-center text-gray-600 mt-8 zoom-transition">
                <div className="text-5xl mb-4">✨</div>
                <p className="text-2xl mb-3 font-semibold" style={{ fontFamily: 'Georgia, serif' }}>{t.welcomeTitle}</p>
                <p className="text-base" style={{ fontFamily: 'Arial, sans-serif' }}>{t.welcomeDesc}</p>
              </div>
              
              <div className="mt-8">
                <p className="text-sm text-gray-600 font-semibold mb-3 text-center">
                  {language === 'id' ? '🚀 Pertanyaan Cepat:' : '🚀 Quick Questions:'}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {quickReplies.map((reply, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(reply)}
                      className="px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 hover:from-pink-200 hover:to-purple-200 rounded-lg text-sm text-gray-700 hover:text-gray-900 transition-all duration-300 hover:shadow-md text-left"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} zoom-transition`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'chat-bubble-user text-white'
                        : 'chat-bubble-ai text-gray-800'
                    }`}
                  >
                    <p className="text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>{message.content}</p>
                    {message.rewards && message.rewards > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-400">
                        <span className="text-xs text-amber-600 font-semibold diamond-sparkle">
                          ✨ +{message.rewards} {t.tokensEarned}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
          {loading && (
            <div className="flex justify-start items-center gap-3">
              <div className="chat-bubble-ai text-gray-100 rounded-lg p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-white border-opacity-30">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
              placeholder={t.typingPlaceholder}
              className="flex-1 bg-white bg-opacity-40 text-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder-gray-500 backdrop-blur-sm zoom-transition"
              style={{ fontFamily: 'Arial, sans-serif' }}
              disabled={loading}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              className="jewel-button text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t.sendButton}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
