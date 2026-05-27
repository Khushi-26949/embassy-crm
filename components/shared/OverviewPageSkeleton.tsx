import { Skeleton } from '@/components/ui';

export function OverviewPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
        <Skeleton variant="text" className="h-10 w-64" />
        <div className="flex gap-2">
          <Skeleton variant="text" className="h-10 w-32" />
          <Skeleton variant="text" className="h-10 w-32" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="card" className="h-28" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <Skeleton variant="card" className="h-[360px] xl:col-span-3" />
        <Skeleton variant="card" className="h-[360px] xl:col-span-2" />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Skeleton variant="card" className="h-64" />
        <Skeleton variant="card" className="h-64" />
      </div>
    </div>
  );
}
