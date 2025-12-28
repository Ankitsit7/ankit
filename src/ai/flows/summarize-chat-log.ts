'use server';

/**
 * @fileOverview A chat log summarization AI agent.
 *
 * - summarizeChatLog - A function that summarizes a chat log.
 * - SummarizeChatLogInput - The input type for the summarizeChatLog function.
 * - SummarizeChatLogOutput - The return type for the summarizeChatLog function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeChatLogInputSchema = z.object({
  chatLog: z
    .string()
    .describe('The complete chat log to be summarized. Include all turns.'),
});
export type SummarizeChatLogInput = z.infer<typeof SummarizeChatLogInputSchema>;

const SummarizeChatLogOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the chat log.'),
});
export type SummarizeChatLogOutput = z.infer<typeof SummarizeChatLogOutputSchema>;

export async function summarizeChatLog(input: SummarizeChatLogInput): Promise<SummarizeChatLogOutput> {
  return summarizeChatLogFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeChatLogPrompt',
  input: {schema: SummarizeChatLogInputSchema},
  output: {schema: SummarizeChatLogOutputSchema},
  prompt: `You are an AI assistant that summarizes chat logs for administrators.

  Given the following chat log, provide a concise summary that captures the main points, issues discussed, and the overall outcome of the conversation.

  Chat Log:
  {{chatLog}}`,
});

const summarizeChatLogFlow = ai.defineFlow(
  {
    name: 'summarizeChatLogFlow',
    inputSchema: SummarizeChatLogInputSchema,
    outputSchema: SummarizeChatLogOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
