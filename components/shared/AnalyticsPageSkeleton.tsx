import { Skeleton } from '@/components/ui';

export function AnalyticsPageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton variant="text" className="h-10 w-72" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="card" className="h-24" />
        ))}
      </div>
      <Skeleton variant="card" className="h-[380px]" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Skeleton variant="card" className="h-80" />
        <Skeleton variant="card" className="h-80" />
      </div>
    </div>
  );
}
