'use server';

import { suggestResponse } from '@/ai/flows/suggest-response';
import type { Message } from '@/lib/types';

export async function getBotResponse(userQuery: string, history: Message[]): Promise<string> {
  // Simple context from the last 4 messages
  const context = history
    .slice(-4)
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join('\n');

  try {
    const response = await suggestResponse({
      userQuery,
      context,
    });
    return response.suggestedResponse;
  } catch (error) {
    console.error('Error in AI flow:', error);
    return "I'm sorry, I encountered an error. Please try again.";
  }
}
