'use client';

import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ClaimCardProps {
  claim: string;
  verdict: string;
  source: string;
  url: string;
}

const verdictConfig = {
  true: { icon: CheckCircle2, color: 'text-green-600', variant: 'secondary' as const, badgeText: 'Verified' },
  false: { icon: XCircle, color: 'text-red-600', variant: 'destructive' as const, badgeText: 'False' },
  misleading: { icon: AlertTriangle, color: 'text-yellow-600', variant: 'default' as const, badgeText: 'Misleading' },
  default: { icon: HelpCircle, color: 'text-muted-foreground', variant: 'outline' as const, badgeText: 'Unverified' },
};

const getVerdictConfig = (verdict: string) => {
  const lowerVerdict = verdict.toLowerCase();
  if (lowerVerdict.includes('true')) return verdictConfig.true;
  if (lowerVerdict.includes('false')) return verdictConfig.false;
  if (lowerVerdict.includes('misleading')) return verdictConfig.misleading;
  return verdictConfig.default;
};

export function ClaimCard({ claim, verdict, source, url }: ClaimCardProps) {
  const config = getVerdictConfig(verdict);
  const Icon = config.icon;

  return (
    <div className="flex items-start space-x-4">
      <Icon className={`mt-1 h-5 w-5 shrink-0 ${config.color}`} />
      <div className="flex-grow">
        <p className="font-medium text-foreground">{claim}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
          <Badge variant={config.variant}>{config.badgeText}</Badge>
          <span className="text-muted-foreground">Source:</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            {source}
          </a>
        </div>
        {(config.variant === 'destructive' || config.variant === 'default') && (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="link" size="sm" className="px-0 h-auto mt-1">
                        <Lightbulb className="mr-1.5 h-4 w-4" />
                        Immunity Booster
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Why might this be misinformation?</DialogTitle>
                        <DialogDescription>
                            Misinformation often uses specific tactics to appear credible. Here are some common red flags to watch for:
                        </DialogDescription>
                    </DialogHeader>
                    <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5 py-2">
                        <li><strong>Emotional Language:</strong> Does it use strong, emotionally charged words to provoke a reaction?</li>
                        <li><strong>Lack of Sources:</strong> Does it fail to cite credible, verifiable sources for its claims?</li>
                        <li><strong>Appeals to Authority:</strong> Does it mention "experts" or "studies" without naming them?</li>
                        <li><strong>Unprofessional Look:</strong> Are there spelling errors, poor grammar, or low-quality images?</li>
                        <li><strong>Binary Thinking:</strong> Does it present a complex issue as a simple, black-and-white choice?</li>
                    </ul>
                </DialogContent>
            </Dialog>
        )}
      </div>
    </div>
  );
}
