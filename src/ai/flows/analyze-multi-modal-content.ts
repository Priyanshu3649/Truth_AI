// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview Analyzes multi-modal content (text, images, videos) to detect misinformation.
 *
 * - analyzeMultiModalContent - A function that handles the multi-modal content analysis process.
 * - AnalyzeMultiModalContentInput - The input type for the analyzeMultiModalContent function.
 * - AnalyzeMultiModalContentOutput - The return type for the analyzeMultiModalContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMultiModalContentInputSchema = z.object({
  text: z.string().optional().describe('The text content to analyze.'),
  imageDataUri: z
    .string()
    .optional()
    .describe(
      "The image data as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  videoDataUri: z
    .string()
    .optional()
    .describe(
      "The video data as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeMultiModalContentInput = z.infer<
  typeof AnalyzeMultiModalContentInputSchema
>;

const AnalyzeMultiModalContentOutputSchema = z.object({
  truthScore: z
    .number()
    .describe(
      'A score representing the likelihood that the content is truthful (0-1).' + ' 0 is likely false, 1 is likely true.'
    ),
  explanation: z
    .string()
    .describe('A detailed explanation of the truth score, including evidence.'),
});
export type AnalyzeMultiModalContentOutput = z.infer<
  typeof AnalyzeMultiModalContentOutputSchema
>;

export async function analyzeMultiModalContent(
  input: AnalyzeMultiModalContentInput
): Promise<AnalyzeMultiModalContentOutput> {
  return analyzeMultiModalContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMultiModalContentPrompt',
  input: {schema: AnalyzeMultiModalContentInputSchema},
  output: {schema: AnalyzeMultiModalContentOutputSchema},
  prompt: `You are an expert fact-checker. Analyze the content provided and determine its truthfulness.

Consider the following inputs:

{{#if text}}
Text: {{{text}}}
{{/if}}

{{#if imageDataUri}}
Image: {{media url=imageDataUri}}
{{/if}}

{{#if videoDataUri}}
Video: {{media url=videoDataUri}}
{{/if}}

Provide a truthScore (0-1) and a detailed explanation of your reasoning.
`,
});

const analyzeMultiModalContentFlow = ai.defineFlow(
  {
    name: 'analyzeMultiModalContentFlow',
    inputSchema: AnalyzeMultiModalContentInputSchema,
    outputSchema: AnalyzeMultiModalContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
