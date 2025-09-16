'use client';

import { useActionState } from 'react';
import { useEffect, useRef, useState, useTransition } from 'react';
import { ClipboardCheck, FileWarning } from 'lucide-react';
import { analyzeContentAction, type FormState } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { AnalysisForm } from '@/components/truth-ai/analysis-form';
import { ResultsDisplay } from '@/components/truth-ai/results-display';
import { LoadingSkeleton } from '@/components/truth-ai/loading-skeleton';
import { Card } from '@/components/ui/card';
import { Icons } from '@/components/icons';

const initialState: FormState = {
  result: null,
  error: null,
  key: Date.now(),
};

function InitialState() {
  return (
    <Card className="flex flex-col items-center justify-center h-full min-h-[400px] border-dashed p-8">
      <div className="text-center">
        <ClipboardCheck className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">
          Ready for Analysis
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Submit text or an image to begin fact-checking.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Your results will be displayed here.
        </p>
      </div>
    </Card>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <Card className="flex flex-col items-center justify-center h-full min-h-[400px] border-dashed border-destructive/50 p-8">
      <div className="text-center">
        <FileWarning className="mx-auto h-12 w-12 text-destructive" />
        <h3 className="mt-4 text-lg font-semibold text-destructive">
          Analysis Failed
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {message}
        </p>
      </div>
    </Card>
  );
}


export default function Home() {
  const [state, formAction, isPending] = useActionState(analyzeContentAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [previousKey, setPreviousKey] = useState(state.key);

  useEffect(() => {
    if (state.key !== previousKey) {
        setPreviousKey(state.key);
        if (state.error) {
            toast({
                variant: 'destructive',
                title: 'Analysis Failed',
                description: state.error,
            });
        }
        if (state.result) {
            formRef.current?.reset();
        }
    }
  }, [state, toast, previousKey]);
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-card">
        <div className="container mx-auto flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center">
            <Icons.logo className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight font-headline">
              TruthAI Assistant
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">AI-Powered Fact-Checking</h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
              Paste text, upload an image, or provide a URL to get an instant analysis of its claims and potential for misinformation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="sticky top-24">
              <AnalysisForm formRef={formRef} action={formAction} isPending={isPending} />
            </div>
            <div className="min-h-[400px]">
              {isPending ? (
                <LoadingSkeleton />
              ) : state.result ? (
                <ResultsDisplay result={state.result} />
              ) : state.error ? (
                <ErrorState message={state.error} />
              ) : (
                <InitialState />
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TruthAI Assistant. For educational purposes only.</p>
        </div>
      </footer>
    </div>
  );
}
