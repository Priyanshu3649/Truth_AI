import type { AnalysisResult } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TruthScore } from './truth-score';
import { ClaimCard } from './claim-card';
import { CounterfactualCard } from './counterfactual-card';
import { BrainCircuit } from 'lucide-react';

interface ResultsDisplayProps {
  result: AnalysisResult;
}

export function ResultsDisplay({ result }: ResultsDisplayProps) {
  const { truthScore, explanation, claims, counterfactuals } = result;

  return (
    <Card>
      <CardHeader className="items-center text-center p-6">
        <TruthScore score={truthScore} />
        <CardTitle className="mt-4">Analysis Complete</CardTitle>
        <p className="text-muted-foreground text-sm max-w-md">{explanation}</p>
      </CardHeader>

      {(claims.length > 0 || (counterfactuals && counterfactuals.counterfactualScenarios.length > 0)) && <Separator />}

      <CardContent className="p-6 space-y-6">
        {claims.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">Fact-Checked Claims</h3>
            <div className="space-y-6">
              {claims.map((claim, index) => (
                <ClaimCard
                  key={index}
                  claim={claim.claim}
                  verdict={claim.verdict}
                  source={claim.source}
                  url={claim.url}
                />
              ))}
            </div>
          </div>
        )}

        {counterfactuals && counterfactuals.counterfactualScenarios.length > 0 && (
           <>
            {claims.length > 0 && <Separator />}
            <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center">
                    <BrainCircuit className="h-5 w-5 mr-2 text-primary" />
                    Educational Counterfactuals
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                    What if this information was widely believed? Here are some possible scenarios.
                </p>
                <div className="space-y-3">
                {counterfactuals.counterfactualScenarios.map((scenario, index) => (
                    <CounterfactualCard key={index} scenario={scenario} />
                ))}
                </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
