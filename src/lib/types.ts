export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
};

export type KnowledgeItem = {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
};

export type ChatLog = {
  id: string;
  user: string;
  query: string;
  response: string;
  timestamp: string;
  satisfaction: number;
};
