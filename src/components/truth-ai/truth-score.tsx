'use client';

import { useMemo } from 'react';

interface TruthScoreProps {
  score: number;
}

export function TruthScore({ score }: TruthScoreProps) {
  const percentage = Math.max(0, Math.min(100, Math.round(score * 100)));
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colorClass = useMemo(() => {
    if (percentage < 40) return 'text-red-500';
    if (percentage < 70) return 'text-yellow-500';
    return 'text-green-500';
  }, [percentage]);

  return (
    <div className="relative h-32 w-32">
      <svg className="h-full w-full" viewBox="0 0 120 120">
        <circle
          className="text-gray-200 dark:text-gray-700"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <circle
          className={`transform -rotate-90 origin-center transition-all duration-500 ease-out ${colorClass}`}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
      </svg>
      <div className={`absolute inset-0 flex flex-col items-center justify-center ${colorClass}`}>
        <div className='flex items-baseline'>
            <span className="text-3xl font-bold font-headline">
            {percentage}
            </span>
            <span className="text-xl font-semibold">%</span>
        </div>
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Truth Score
        </div>
      </div>
    </div>
  );
}
