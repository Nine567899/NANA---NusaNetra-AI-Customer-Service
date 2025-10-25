"use client";

import { useState, useEffect, useRef } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Message, UserProfile } from '@/types';
import {
  getUserProfile,
  saveUserProfile,
  createUserProfile,
  addMessageToHistory,
  updateUserRewards,
} from '@/lib/storage';

export default function ChatInterface() {
  const { publicKey } = useWallet();
  const { language, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleSend = async () => {
    if (!input.trim() || !publicKey || !profile) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
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
        content: 'Sorry, I encountered an error processing your request. Please try again.',
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
        <div className="text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-xl text-gray-300 mb-2">{t.connectWallet}</p>
          <p className="text-gray-500">{t.connectWalletDesc}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg mb-2">{t.welcomeTitle}</p>
            <p className="text-sm">{t.welcomeDesc}</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'chat-bubble-user text-white'
                    : 'chat-bubble-ai text-gray-100'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.rewards && message.rewards > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-600">
                    <span className="text-xs text-yellow-400">
                      +{message.rewards} {t.tokensEarned}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="flex justify-start">
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

      <div className="p-4 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
            placeholder={t.typingPlaceholder}
            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="gradient-bg text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {t.sendButton}
          </button>
        </div>
      </div>
    </div>
  );
}
