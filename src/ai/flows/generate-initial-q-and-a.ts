'use server';
/**
 * @fileOverview A flow to generate initial question and answer pairs for the chatbot.
 *
 * - generateInitialQandA - A function that handles the generation of initial question and answer pairs.
 * - GenerateInitialQandAInput - The input type for the generateInitialQandA function.
 * - GenerateInitialQandAOutput - The return type for the generateInitialQandA function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInitialQandAInputSchema = z.object({
  topic: z.string().describe('The topic for which to generate question and answer pairs.'),
  numPairs: z.number().describe('The number of question and answer pairs to generate.'),
});
export type GenerateInitialQandAInput = z.infer<
  typeof GenerateInitialQandAInputSchema
>;

const GenerateInitialQandAOutputSchema = z.object({
  qAndAPairs: z
    .array(
      z.object({
        question: z.string().describe('The generated question.'),
        answer: z.string().describe('The generated answer.'),
      })
    )
    .describe('The generated question and answer pairs.'),
});
export type GenerateInitialQandAOutput = z.infer<
  typeof GenerateInitialQandAOutputSchema
>;

export async function generateInitialQandA(
  input: GenerateInitialQandAInput
): Promise<GenerateInitialQandAOutput> {
  return generateInitialQandAFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInitialQandAPrompt',
  input: {schema: GenerateInitialQandAInputSchema},
  output: {schema: GenerateInitialQandAOutputSchema},
  prompt: `You are an expert at generating question and answer pairs for chatbots.

  Generate {{numPairs}} question and answer pairs on the topic of {{topic}}.

  Each question should be clear and concise, and each answer should be informative and helpful.

  Format the output as a JSON array of objects, where each object has a "question" and "answer" field.

  For example:
  [
    {
      "question": "What is the capital of France?",
      "answer": "The capital of France is Paris.",
    },
    {
      "question": "What is the highest mountain in the world?",
      "answer": "The highest mountain in the world is Mount Everest.",
    },
  ]
  `,
});

const generateInitialQandAFlow = ai.defineFlow(
  {
    name: 'generateInitialQandAFlow',
    inputSchema: GenerateInitialQandAInputSchema,
    outputSchema: GenerateInitialQandAOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
