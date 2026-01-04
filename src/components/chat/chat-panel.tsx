'use client';

import { useRef, useEffect } from 'react';
import type { Message } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import ChatMessage from './chat-message';
import ChatInput from './chat-input';
import { Button } from '../ui/button';
import { Bot, RefreshCcw, Home, Phone, Recycle, TreeDeciduous } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface ChatPanelProps {
  messages: Message[];
  isPending: boolean;
  onSendMessage: (content: string) => void;
  error: string | null;
  retryLastMessage: () => void;
  resetChat: () => void;
}

const quickReplies = [
  { display: "Scrap Pickup", value: "Tell me about scrap pickup", icon: Recycle },
  { display: "Organic Manure", value: "Where can I buy organic manure?", icon: TreeDeciduous },
  { display: "Contact Support", value: "How can I contact support?", icon: Phone },
];


export default function ChatPanel({ messages, isPending, onSendMessage, error, retryLastMessage, resetChat }: ChatPanelProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const showQuickReplies = messages.length === 1;

  return (
    <Card className="h-[calc(100vh-10rem)] flex flex-col shadow-lg bg-background">
      <CardHeader className="border-b flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot className="h-7 w-7 text-primary" />
          <div>
            <h1 className="text-lg font-semibold">Manoindia Assistant</h1>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
             <p className="text-xs text-muted-foreground mt-1">Ask about scrap pickup, manure, services</p>
          </div>
        </div>
         <Button variant="ghost" size="icon" onClick={resetChat} title="Start Over">
            <RefreshCcw className="h-5 w-5" />
          </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-6 space-y-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t flex flex-col items-start gap-3">
        {error && (
            <Alert variant="destructive" className="w-full">
                <AlertTitle>😕 Oops! I had trouble answering that.</AlertTitle>
                <AlertDescription>
                Try one of these options:
                <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="sm" onClick={retryLastMessage}>
                        <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
                    </Button>
                    <Button variant="outline" size="sm" onClick={resetChat}>
                        <Home className="mr-2 h-4 w-4" /> Main Menu
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onSendMessage('contact')}>
                        <Phone className="mr-2 h-4 w-4" /> Talk to Human
                    </Button>
                </div>
                </AlertDescription>
            </Alert>
        )}
        {showQuickReplies && !isPending && (
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <Button key={reply.value} variant="outline" size="sm" onClick={() => onSendMessage(reply.value)}>
                <reply.icon className="mr-2 h-4 w-4" />
                {reply.display}
              </Button>
            ))}
          </div>
        )}
        <ChatInput onSendMessage={onSendMessage} isPending={isPending} />
      </CardFooter>
    </Card>
  );
}
