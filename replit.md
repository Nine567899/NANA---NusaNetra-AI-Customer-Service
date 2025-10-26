# NANA AI - Web3 AI Customer Service Platform

## Overview

NANA AI is a decentralized AI-powered customer service chatbot built on the Solana blockchain. The platform combines Web3 technology with artificial intelligence to create an autonomous customer support system featuring wallet-based authentication, token rewards, and tiered service levels. Users interact with a cheerful AI assistant named NANA that provides customer service in both English and Indonesian languages.

The application enables businesses and startups to offer blockchain-verified customer support while rewarding users with tokens for engagement. It features a premium tier system where users can unlock enhanced AI responses and priority support.

## User Preferences

- Preferred communication style: Simple, everyday language
- Default language: Indonesian (ID), with English as secondary option
- Design theme: Pink gradient (linear-gradient(135deg, #FFC0CB, #D8A39D)) - NO purple colors
- Emoji usage: Only sparkle (✨) allowed, all other emojis removed

## Recent Changes (October 26, 2025)

1. **Complete NANA AI Rebranding**
   - Changed all platform branding from "NUSANETRA" to "NANA AI"
   - Updated all translations and copy across 5 pages
   - Changed target audience from "UMKM" to "perusahaan dan startup" (companies and startups)

2. **Enhanced Chat Experience with NANA Character**
   - Added animated NANA character in chat interface
   - CSS-based expression animations (scale, brightness, hue-rotate, pulse effects)
   - Character expressions change during interactions (idle, happy, talking)
   - Character bounces and pulses when AI is thinking/responding

3. **Customer Service Quick Reply Shortcuts**
   - Added quick reply buttons for common questions in chat interface
   - Bilingual shortcuts (English/Indonesian)
   - Includes: Product Info, Pricing, Support, Account Status
   - Reduces repetitive typing and improves user experience

4. **Updated AI Personality**
   - Enhanced prompts to be more cheerful, fun, and engaging
   - Added emojis to AI responses for friendlier tone
   - Maintained professionalism while being more approachable
   - Better bilingual personality consistency

5. **Navigation & Layout Improvements**
   - Moved wallet connection button to navigation bar (next to language switcher)
   - Homepage hero now shows two symmetrical buttons: "Coba Demo" and "Hubungkan Wallet"
   - Fixed hydration errors with proper client-side rendering
   - Consistent pink gradient styling across all CTAs

## System Architecture

### Frontend Architecture

**Framework**: Next.js 15 with App Router and React 19
- Server and client components architecture for optimal performance
- TypeScript for type safety across the application
- Tailwind CSS for responsive, Web3-themed UI with gradient accents

**Component Structure**:
- **Navigation**: Horizontal navigation bar with 5 pages (Home, Demo, Whitepaper, About, Rating), language switcher, and wallet connection button
- **ChatInterface**: Real-time messaging component with AI responses, animated NANA character, and quick reply shortcuts
- **UserStats**: Displays token balance, rewards, and account tier
- **Footer**: Professional footer with navigation links and social media (Twitter/X, Discord, GitHub)
- **WalletContextProvider**: Wraps application with Solana wallet adapter context

**State Management**:
- React Context API for language preferences (English/Indonesian)
- React hooks (useState, useEffect) for local component state
- Browser localStorage for persisting user profiles and chat history

**Routing Strategy**:
- `/` - Landing page with product information and hero section
- `/demo` - Interactive chat demo with wallet connection
- `/about` - Platform vision, mission, and contact information
- `/whitepaper` - Technical documentation, roadmap, and tokenomics
- `/rating` - Dedicated rating and feedback page for service quality

### Backend Architecture

**API Routes** (Next.js Route Handlers):
- `/api/chat` - POST endpoint for processing user messages and generating AI responses
- Serverless function architecture using Next.js API routes

**AI Integration**:
- **Primary AI**: Groq SDK for fast LLM inference (llama-3.3-70b-versatile model)
- **Model Personality**: Cheerful, fun, and engaging NANA character with customer service expertise
- **Bilingual Support**: Context-aware responses in English and Indonesian with consistent personality
- **Tiered Responses**: Different response lengths and features for Premium vs Standard users
- **Enhanced Prompts**: Includes emojis and friendly tone while maintaining professionalism

**Business Logic**:
- Token reward calculation (random 1-10 tokens per message)
- Premium tier detection based on token balance (>= 100 tokens)
- Customer service principles embedded in AI prompts
- Multi-language prompt engineering for consistent quality

### Data Storage Solutions

**Client-Side Storage** (localStorage):
- User profiles indexed by wallet address
- Chat history persistence per user
- Token balances and reward tracking
- Rating and feedback submissions
- Language preferences

**Data Models**:
```typescript
UserProfile {
  walletAddress: string
  tokenBalance: number
  isPremium: boolean
  totalRewards: number
  chatHistory: Message[]
}

Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
  rewards?: number
}
```

**Storage Pattern**:
- Key format: `web3_ai_customer_service_{walletAddress}`
- Automatic profile creation on first wallet connection
- Real-time updates on user interactions

### Authentication & Authorization

**Wallet-Based Authentication**:
- Solana wallet adapter for multi-wallet support (Phantom, Solflare)
- Public key verification for user identity
- No traditional login/password system - wallet signature serves as authentication
- Base58 address encoding for wallet identification

**Access Control**:
- Premium features gated by token balance (>= 100 tokens)
- Wallet connection required for chat functionality
- Client-side tier detection and feature toggling

### Design Patterns

**Provider Pattern**: 
- WalletContextProvider wraps entire app for wallet state
- LanguageProvider for global language switching

**Component Composition**:
- Reusable UI components (Navigation, Footer, Stats)
- Container/Presentational component separation

**Optimistic UI Updates**:
- Immediate message display before AI response
- Token balance updates reflected instantly

**Responsive Design**:
- Mobile-first approach with Tailwind breakpoints
- Glass-morphic cards with backdrop blur effects
- Consistent pink gradient theme: linear-gradient(135deg, #FFC0CB, #D8A39D) throughout all pages
- Only sparkle emoji (✨) used across the application
- Professional hover effects and smooth transitions

## External Dependencies

### Blockchain Infrastructure
- **Solana Web3.js** (v1.98.4): Core blockchain interaction library
- **Wallet Adapter Packages**: 
  - Base, React, React UI for wallet integration framework
  - Phantom and Solflare wallet adapters
- **Network**: Solana Devnet for testing (configurable to Mainnet)
- **bs58**: Base58 encoding for Solana addresses

### AI Services
- **Groq SDK** (v0.34.0): LLM inference API for fast AI responses
- **OpenAI Package** (v6.7.0): Type definitions and utilities (prepared for future OpenAI integration)
- **Environment Variable Required**: `GROQ_API_KEY`

### Frontend Framework & Tooling
- **Next.js** (v15.0.0): React framework with App Router
- **React** (v19.0.0): UI library
- **TypeScript** (v5.6.3): Type safety
- **Tailwind CSS** (v3.4.15): Utility-first styling
- **PostCSS** & **Autoprefixer**: CSS processing

### Utilities
- **BigNumber.js** (v9.3.1): Precise numeric calculations for token amounts

### Build Configuration
- **Webpack externals**: Excludes `pino-pretty`, `lokijs`, `encoding` to avoid bundling issues
- **React Strict Mode**: Enabled for development safety
- **Module Resolution**: Bundler mode for Next.js optimization

### Third-Party Service Integration Points
- Groq API endpoint for AI inference
- Solana RPC endpoints (devnet.solana.com via clusterApiUrl)
- Future integrations prepared: SPL Token program, on-chain rating storage