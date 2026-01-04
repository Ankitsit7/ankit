'use client';

import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import type { Message } from '@/lib/types';
import ChatPanel from './chat-panel';
import { getBotResponse } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RefreshCcw, AlertTriangle } from 'lucide-react';

const initialMessages: Message[] = [
    {
      id: nanoid(),
      role: 'assistant',
      content: "👋 Hi! I’m the Manoindia Assistant.\nI can help you with:\n- Scrap pickup\n- Organic manure\n- Pricing & process",
      createdAt: new Date(),
    },
];

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
    setError(null); // Clear error on new message
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: nanoid(),
      role: 'user',
      content,
      createdAt: new Date(),
    };
    addMessage(userMessage);
    setIsPending(true);

    try {
      const responseContent = await getBotResponse(userMessage.content, messages);
      
      const assistantMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: responseContent,
        createdAt: new Date(),
      };
      addMessage(assistantMessage);
    } catch (e) {
      console.error('Error getting bot response:', e);
      setError("😕 Oops! I had trouble answering that.");
    } finally {
      setIsPending(false);
    }
  };

  const retryLastMessage = () => {
    const lastUserMessage = messages.slice().reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      setError(null);
      handleSendMessage(lastUserMessage.content);
    }
  }

  const resetChat = () => {
    setMessages(initialMessages);
    setError(null);
  }

  return (
    <div className="container mx-auto max-w-3xl py-8">
        <ChatPanel 
          messages={messages}
          isPending={isPending}
          onSendMessage={handleSendMessage}
          error={error}
          retryLastMessage={retryLastMessage}
          resetChat={resetChat}
        />
    </div>
  );
}
