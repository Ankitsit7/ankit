'use client';

import { useRef, useEffect } from 'react';
import type { Message } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ChatMessage from './chat-message';
import ChatInput from './chat-input';

interface ChatPanelProps {
  messages: Message[];
  isPending: boolean;
  onSendMessage: (content: string) => void;
}

export default function ChatPanel({ messages, isPending, onSendMessage }: ChatPanelProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <Card className="h-[calc(100vh-10rem)] flex flex-col shadow-lg">
      <CardHeader className="border-b">
        <CardTitle>Conversation</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-6 space-y-6">
            {messages.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <ChatInput onSendMessage={onSendMessage} isPending={isPending} />
      </CardFooter>
    </Card>
  );
}
