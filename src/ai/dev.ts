import { config } from 'dotenv';
config();

import '@/ai/flows/generate-counterfactual-scenarios.ts';
import '@/ai/flows/compare-claims-against-verified-sources.ts';
import '@/ai/flows/analyze-multi-modal-content.ts';
import '@/ai/flows/extract-claims-from-text.ts';