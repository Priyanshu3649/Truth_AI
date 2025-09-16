'use server';

/**
 * @fileOverview Extracts claims from user-submitted text using AI.
 *
 * - extractClaims - A function that handles the claim extraction process.
 * - ExtractClaimsInput - The input type for the extractClaims function.
 * - ExtractClaimsOutput - The return type for the extractClaims function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractClaimsInputSchema = z.object({
  text: z.string().describe('The text to extract claims from.'),
});
export type ExtractClaimsInput = z.infer<typeof ExtractClaimsInputSchema>;

const ExtractClaimsOutputSchema = z.object({
  claims: z.array(z.string()).describe('The extracted claims from the text.'),
});
export type ExtractClaimsOutput = z.infer<typeof ExtractClaimsOutputSchema>;

export async function extractClaims(input: ExtractClaimsInput): Promise<ExtractClaimsOutput> {
  return extractClaimsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractClaimsPrompt',
  input: {schema: ExtractClaimsInputSchema},
  output: {schema: ExtractClaimsOutputSchema},
  prompt: `You are an expert fact checker. Extract the main claims from the following text. Return each claim as a separate element in a JSON array.\n\nText: {{{text}}}`,
});

const extractClaimsFlow = ai.defineFlow(
  {
    name: 'extractClaimsFlow',
    inputSchema: ExtractClaimsInputSchema,
    outputSchema: ExtractClaimsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
