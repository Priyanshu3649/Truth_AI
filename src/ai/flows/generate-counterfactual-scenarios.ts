// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview Generates counterfactual scenarios to educate users about the potential consequences of believing misinformation.
 *
 * - generateCounterfactualScenarios - A function that generates counterfactual scenarios based on input text.
 * - GenerateCounterfactualScenariosInput - The input type for the generateCounterfactualScenarios function.
 * - GenerateCounterfactualScenariosOutput - The return type for the generateCounterfactualScenarios function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCounterfactualScenariosInputSchema = z.object({
  misinformationText: z
    .string()
    .describe('The text of the misinformation to generate counterfactual scenarios for.'),
});

export type GenerateCounterfactualScenariosInput = z.infer<
  typeof GenerateCounterfactualScenariosInputSchema
>;

const GenerateCounterfactualScenariosOutputSchema = z.object({
  counterfactualScenarios: z
    .array(z.string())
    .describe(
      'An array of counterfactual scenarios that illustrate the potential consequences of believing the misinformation.'
    ),
});

export type GenerateCounterfactualScenariosOutput = z.infer<
  typeof GenerateCounterfactualScenariosOutputSchema
>;

export async function generateCounterfactualScenarios(
  input: GenerateCounterfactualScenariosInput
): Promise<GenerateCounterfactualScenariosOutput> {
  return generateCounterfactualScenariosFlow(input);
}

const generateCounterfactualScenariosPrompt = ai.definePrompt({
  name: 'generateCounterfactualScenariosPrompt',
  input: {schema: GenerateCounterfactualScenariosInputSchema},
  output: {schema: GenerateCounterfactualScenariosOutputSchema},
  prompt: `You are an AI assistant designed to educate users about misinformation.

  Given a piece of misinformation, your task is to generate several counterfactual scenarios that illustrate the potential negative consequences of believing this misinformation.

  Misinformation: {{{misinformationText}}}

  Generate 3 distinct counterfactual scenarios.

  Format your response as a JSON object with a single key "counterfactualScenarios" that is an array of strings.
  `,
});

const generateCounterfactualScenariosFlow = ai.defineFlow(
  {
    name: 'generateCounterfactualScenariosFlow',
    inputSchema: GenerateCounterfactualScenariosInputSchema,
    outputSchema: GenerateCounterfactualScenariosOutputSchema,
  },
  async input => {
    const {output} = await generateCounterfactualScenariosPrompt(input);
    return output!;
  }
);
