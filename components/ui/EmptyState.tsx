import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-coolgrey bg-white px-6 py-10 text-center dark:border-night-border dark:bg-night-card',
        className
      )}
    >
      <Icon className="h-10 w-10 text-ink/25 dark:text-ivory/30" strokeWidth={1.5} />
      <p className="mt-3 font-medium text-ink dark:text-ivory">{title}</p>
      {description ? (
        <p className="mt-1 max-w-sm text-sm text-ink/60 dark:text-ivory/60">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
