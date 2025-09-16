import { Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface CounterfactualCardProps {
  scenario: string;
}

export function CounterfactualCard({ scenario }: CounterfactualCardProps) {
  return (
    <Card className="bg-amber-50 border-amber-200 dark:bg-amber-950 dark:border-amber-800">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Zap className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-sm text-amber-800 dark:text-amber-200">
            {scenario}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
