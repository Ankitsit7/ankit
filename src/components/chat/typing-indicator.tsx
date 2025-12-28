import { Bot } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground p-2">
      <Avatar className="h-8 w-8">
        <AvatarFallback>
          <Bot className="h-5 w-5 text-primary" />
        </AvatarFallback>
      </Avatar>
      <div className="flex items-center space-x-1">
        <span className="h-1.5 w-1.5 animate-[pulse_1s_ease-in-out_infinite] rounded-full bg-muted-foreground"></span>
        <span className="h-1.5 w-1.5 animate-[pulse_1s_ease-in-out_0.2s_infinite] rounded-full bg-muted-foreground"></span>
        <span className="h-1.5 w-1.5 animate-[pulse_1s_ease-in-out_0.4s_infinite] rounded-full bg-muted-foreground"></span>
      </div>
    </div>
  );
}
