import { Skeleton } from '@/components/ui';

export function PipelinePageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton variant="text" className="h-10 w-48" />
      <Skeleton variant="card" className="h-24" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="card" className="h-[560px] min-w-[280px] shrink-0" />
        ))}
      </div>
    </div>
  );
}
