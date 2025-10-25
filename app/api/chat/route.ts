import { NextRequest, NextResponse } from 'next/server';
import { generateCustomerServiceResponse } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { message, walletAddress, isPremium, language } = await request.json();

    if (!message || !walletAddress) {
      return NextResponse.json(
        { error: 'Message and wallet address are required' },
        { status: 400 }
      );
    }

    const aiResponse = await generateCustomerServiceResponse(
      message,
      walletAddress,
      isPremium,
      language || 'en'
    );

    const rewards = Math.floor(Math.random() * 10) + 1;

    return NextResponse.json({
      message: aiResponse,
      rewards,
      isPremium,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
