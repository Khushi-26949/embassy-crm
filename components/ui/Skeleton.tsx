import * as React from 'react';
import { cn } from '@/lib/utils';

export type SkeletonVariant = 'text' | 'card' | 'circle';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
}

const variantClasses: Record<SkeletonVariant, string> = {
  text: 'h-4 w-full rounded',
  card: 'h-28 w-full rounded-lg',
  circle: 'h-10 w-10 rounded-full',
};

export function Skeleton({
  className,
  variant = 'text',
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-coolgrey/60 dark:bg-night-surface',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}

