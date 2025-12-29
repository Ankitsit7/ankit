'use client';

import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import type { Message } from '@/lib/types';
import ChatPanel from './chat-panel';
import { getBotResponse } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const initialMessages: Message[] = [
    {
      id: nanoid(),
      role: 'assistant',
      content: "Hello! I'm Mano, your intelligent assistant from Manoindia. I can help you with waste management solutions. How can I assist you today?",
      createdAt: new Date(),
    },
];

export default function ChatLayout() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
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
    } catch (error) {
      console.error('Error getting bot response:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response from the bot. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-8">
        <ChatPanel 
          messages={messages}
          isPending={isPending}
          onSendMessage={handleSendMessage} 
        />
    </div>
  );
}
