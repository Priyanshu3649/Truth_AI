'use server';

import {
  analyzeMultiModalContent,
  type AnalyzeMultiModalContentInput,
} from '@/ai/flows/analyze-multi-modal-content';
import {
  extractClaims,
} from '@/ai/flows/extract-claims-from-text';
import {
  compareClaimsAgainstVerifiedSources,
  type CompareClaimsAgainstVerifiedSourcesOutput,
} from '@/ai/flows/compare-claims-against-verified-sources';
import {
  generateCounterfactualScenarios,
  type GenerateCounterfactualScenariosOutput,
} from '@/ai/flows/generate-counterfactual-scenarios';

export interface AnalysisResult {
  truthScore: number;
  explanation: string;
  claims: CompareClaimsAgainstVerifiedSourcesOutput;
  counterfactuals: GenerateCounterfactualScenariosOutput | null;
}

export interface FormState {
  result: AnalysisResult | null;
  error: string | null;
  key: number;
}

async function fileToDataUri(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return `data:${file.type};base64,${buffer.toString('base64')}`;
}

export async function analyzeContentAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const text = formData.get('text') as string;
  const imageFile = formData.get('image') as File | null;

  if (!text && (!imageFile || imageFile.size === 0)) {
    return {
      result: null,
      error: 'Please provide text or an image to analyze.',
      key: Date.now(),
    };
  }

  try {
    let imageDataUri: string | undefined = undefined;
    if (imageFile && imageFile.size > 0) {
      if (imageFile.size > 4 * 1024 * 1024) { // 4MB limit for some models
        return {
          result: null,
          error: 'Image size is too large. Please upload an image smaller than 4MB.',
          key: Date.now(),
        };
      }
      imageDataUri = await fileToDataUri(imageFile);
    }

    const analysisInput: AnalyzeMultiModalContentInput = {
      text: text || undefined,
      imageDataUri: imageDataUri,
    };

    const [analysisResult, claimsResult] = await Promise.all([
      analyzeMultiModalContent(analysisInput),
      text ? extractClaims({ text }) : Promise.resolve({ claims: [] }),
    ]);

    const { truthScore, explanation } = analysisResult;

    let factCheckResults: CompareClaimsAgainstVerifiedSourcesOutput = [];
    if (claimsResult.claims.length > 0) {
      factCheckResults = await compareClaimsAgainstVerifiedSources(
        claimsResult.claims
      );
    }

    let counterfactualsResult: GenerateCounterfactualScenariosOutput | null =
      null;
    const hasFalseClaims = factCheckResults.some(r =>
      r.verdict.toLowerCase().includes('false')
    );
    if (text && (truthScore < 0.5 || hasFalseClaims)) {
      counterfactualsResult = await generateCounterfactualScenarios({
        misinformationText: text,
      });
    }

    return {
      result: {
        truthScore,
        explanation,
        claims: factCheckResults,
        counterfactuals: counterfactualsResult,
      },
      error: null,
      key: Date.now(),
    };
  } catch (e: any) {
    console.error(e);
    return {
      result: null,
      error: 'An unexpected error occurred during analysis. The AI model may be overloaded.',
      key: Date.now(),
    };
  }
}
