'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizontal, LoaderCircle } from 'lucide-react';
import TypingIndicator from './typing-indicator';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isPending: boolean;
}

export default function ChatInput({ onSendMessage, isPending }: ChatInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && !isPending) {
      onSendMessage(content);
      setContent('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="w-full">
      {isPending && <TypingIndicator />}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="min-h-0 resize-none"
          rows={1}
          disabled={isPending}
        />
        <Button type="submit" size="icon" disabled={isPending || !content.trim()}>
          {isPending ? (
            <LoaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            <SendHorizontal className="h-5 w-5" />
          )}
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  );
}
