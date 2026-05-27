import * as React from 'react';
import { cn } from '@/lib/utils';

export type CardVariant = 'base' | 'hoverable' | 'elevated';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

const variantClasses: Record<CardVariant, string> = {
  base: 'embassy-card shadow-card',
  hoverable: 'embassy-card-hover',
  elevated: 'embassy-card shadow-elevated',
};

export function Card({
  className,
  variant = 'base',
  ...props
}: CardProps) {
  return (
    <div className={cn(variantClasses[variant], className)} {...props} />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5 pb-3', className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5 pt-0', className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-5 pt-0', className)} {...props} />;
}
