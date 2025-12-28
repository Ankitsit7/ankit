// This file holds the Genkit flow for suggesting responses to user queries, intended for admin review and chatbot knowledge base improvement.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestResponseInputSchema = z.object({
  userQuery: z.string().describe('The user query from the chat log.'),
  context: z.string().optional().describe('Additional context from the chat log, if available.'),
});
export type SuggestResponseInput = z.infer<typeof SuggestResponseInputSchema>;

const SuggestResponseOutputSchema = z.object({
  suggestedResponse: z.string().describe('The AI-suggested response to the user query.'),
  confidenceScore: z.number().describe('A score (0-1) indicating the AI agent confidence in the suggested response.'),
});
export type SuggestResponseOutput = z.infer<typeof SuggestResponseOutputSchema>;

export async function suggestResponse(input: SuggestResponseInput): Promise<SuggestResponseOutput> {
  return suggestResponseFlow(input);
}

const suggestResponsePrompt = ai.definePrompt({
  name: 'suggestResponsePrompt',
  input: {schema: SuggestResponseInputSchema},
  output: {schema: SuggestResponseOutputSchema},
  prompt: `You are an AI assistant tasked with suggesting appropriate responses to user queries in a chatbot context.

  Given the following user query and any available context, generate a response that is helpful, informative, and aligned with the chatbot's purpose.
  Also, estimate your confidence that the response is appropriate.

  User Query: {{{userQuery}}}

  Context: {{{context}}}

  Respond with a suggested response and a confidence score (0-1) for how confident you are that the response is accurate and appropriate.
  `,
});

const suggestResponseFlow = ai.defineFlow(
  {
    name: 'suggestResponseFlow',
    inputSchema: SuggestResponseInputSchema,
    outputSchema: SuggestResponseOutputSchema,
  },
  async input => {
    const {output} = await suggestResponsePrompt(input);
    return output!;
  }
);
