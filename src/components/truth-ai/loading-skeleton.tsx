import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export function LoadingSkeleton() {
  return (
    <Card>
      <CardHeader className="items-center">
        <Skeleton className="h-32 w-32 rounded-full" />
        <Skeleton className="h-6 w-48 mt-4" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-3/4 mt-1" />
      </CardHeader>
      <Separator />
      <CardContent className="p-6 space-y-6">
        <div>
          <Skeleton className="h-5 w-40 mb-4" />
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-start space-x-4">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div>
          <Skeleton className="h-5 w-52 mb-4" />
          <div className="space-y-3">
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
