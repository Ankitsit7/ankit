import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-chat-log.ts';
import '@/ai/flows/suggest-response.ts';
import '@/ai/flows/generate-initial-q-and-a.ts';