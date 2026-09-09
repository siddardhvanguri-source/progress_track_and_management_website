import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 to 100
  color?: 'primary' | 'emerald' | 'amber' | 'rose' | 'blue' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function Progress({
  value = 0,
  color = 'primary',
  size = 'md',
  showLabel = false,
  className,
  ...props
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  const colorClasses = {
    primary: 'bg-primary',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  };

  // Determine auto-color if not overridden
  const autoColor =
    clamped >= 80 ? 'bg-emerald-500' : clamped >= 50 ? 'bg-blue-500' : clamped >= 25 ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <div className={cn('w-full flex items-center gap-2', className)} {...props}>
      <div className={cn('relative w-full overflow-hidden rounded-full bg-secondary/80 border border-border/40', sizeClasses[size])}>
        <div
          className={cn('h-full transition-all duration-500 ease-out rounded-full', color === 'primary' ? autoColor : colorClasses[color])}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && <span className="text-xs font-semibold tabular-nums text-muted-foreground w-8 text-right">{clamped}%</span>}
    </div>
  );
}
