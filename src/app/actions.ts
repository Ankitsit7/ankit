'use server';

import type { Message } from '@/lib/types';

const staticResponses: { [key: string]: string } = {
  'scrap': "Manoindia connects waste generators with verified scrap dealers for efficient and transparent waste collection. You can easily schedule a pickup through our platform.",
  'manure': "We facilitate the sale of organic manure produced from biodegradable waste, supporting sustainable agriculture. You can browse and purchase it on our platform.",
  'contact': "You can reach Mayramurti Pvt. Ltd. at Bhub, BSFC Building, Frazer Road, 800001. Phone: 8709736094.",
  'about': "Manoindia, by Mayramurti Pvt. Ltd., is an online platform for waste management, connecting scrap dealers with waste generators and promoting organic manure.",
  'hello': "Hello! I'm Mano, your intelligent assistant from Manoindia. I can help you with waste management solutions. How can I assist you today?",
  'default': "I'm sorry, I can only answer questions related to Manoindia's services. Please ask me about scrap collection, organic manure, or our company."
};

function findResponse(query: string): string {
    const lowerQuery = query.toLowerCase();
    for (const keyword in staticResponses) {
        if (lowerQuery.includes(keyword)) {
            return staticResponses[keyword];
        }
    }
    return staticResponses['default'];
}

export async function getBotResponse(userQuery: string, history: Message[]): Promise<string> {
  // Simple context from the last 4 messages
  const context = history
    .slice(-4)
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join('\n');

  try {
    // Artificial delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Simulate a failure for demonstration
    if (userQuery.toLowerCase().includes('fail')) {
        throw new Error("Simulated backend error");
    }

    const responseContent = findResponse(userQuery);
    return responseContent;
  } catch (error) {
    console.error('Error getting bot response:', error);
    // Re-throw the error to be handled by the UI
    throw error;
  }
}
