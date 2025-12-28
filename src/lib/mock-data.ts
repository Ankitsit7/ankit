import type { ChatLog, KnowledgeItem } from './types';

export const mockKnowledgeBase: KnowledgeItem[] = [
  { id: '1', question: 'What are your hours?', answer: 'We are open 24/7.', createdAt: '2023-10-27T10:00:00Z' },
  { id: '2', question: 'How do I reset my password?', answer: 'You can reset your password by clicking the "Forgot Password" link on the login page.', createdAt: '2023-10-27T10:05:00Z' },
  { id: '3', question: 'What is your return policy?', answer: 'We offer a 30-day return policy on all items.', createdAt: '2023-10-27T10:10:00Z' },
  { id: '4', question: 'How can I track my order?', answer: 'Once your order ships, you will receive an email with a tracking number.', createdAt: '2023-10-27T10:15:00Z' },
];

export const mockChatLogs: ChatLog[] = [
  { id: '1', user: 'user123', query: 'What are your hours?', response: 'We are open 24/7.', timestamp: '2023-10-27T11:00:00Z', satisfaction: 5 },
  { id: '2', user: 'user456', query: 'How do I track my order?', response: 'Once your order ships, you will receive an email with a tracking number.', timestamp: '2023-10-27T11:05:00Z', satisfaction: 4 },
  { id: '3', user: 'user789', query: 'Can I change my shipping address?', response: 'I am not sure how to help with that. Please contact support.', timestamp: '2023-10-27T11:10:00Z', satisfaction: 2 },
  { id: '4', user: 'user101', query: 'return policy', response: 'We offer a 30-day return policy on all items.', timestamp: '2023-10-27T11:15:00Z', satisfaction: 5 },
];

export const mockPerformanceData = {
  responseAccuracy: [
    { month: 'Jan', accuracy: 82 }, { month: 'Feb', accuracy: 85 }, { month: 'Mar', accuracy: 88 },
    { month: 'Apr', accuracy: 86 }, { month: 'May', accuracy: 90 }, { month: 'Jun', accuracy: 91 },
  ],
  responseTime: [
    { month: 'Jan', time: 1.8 }, { month: 'Feb', time: 1.6 }, { month: 'Mar', time: 1.5 },
    { month: 'Apr', time: 1.7 }, { month: 'May', time: 1.4 }, { month: 'Jun', time: 1.2 },
  ],
  userSatisfaction: [
    { rating: 5, count: 120 }, { rating: 4, count: 80 }, { rating: 3, count: 30 },
    { rating: 2, count: 10 }, { rating: 1, count: 5 },
  ],
  resolvedQueries: [
    { name: 'Resolved by Bot', value: 75, fill: 'hsl(var(--primary))' },
    { name: 'Human Escalation', value: 25, fill: 'hsl(var(--accent))' },
  ]
};
