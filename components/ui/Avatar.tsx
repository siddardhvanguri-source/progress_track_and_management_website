import React, { useState } from 'react';
import { cn, getInitials } from '@/lib/utils';
import { AttendanceStatus } from '@/lib/types';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: AttendanceStatus | 'WORKING' | 'ON_LEAVE' | 'ABSENT' | 'LATE' | 'REMOTE' | 'PRESENT' | 'DEEP_WORK' | string;
}

export function Avatar({ src, name, size = 'md', status, className, ...props }: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    xs: 'h-6 w-6 text-[10px]',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-xl',
  };

  const statusSize = {
    xs: 'h-2 w-2 ring-1',
    sm: 'h-2.5 w-2.5 ring-1.5',
    md: 'h-3 w-3 ring-2',
    lg: 'h-3.5 w-3.5 ring-2',
    xl: 'h-4 w-4 ring-2',
  };

  const statusColors: Record<string, string> = {
    WORKING: 'bg-emerald-500',
    PRESENT: 'bg-emerald-500',
    ON_LEAVE: 'bg-sky-400',
    LEAVE_ON_DUTY: 'bg-sky-400',
    ABSENT: 'bg-rose-500',
    UNINFORMED_ABSENCE: 'bg-rose-500',
    LATE: 'bg-amber-500',
    REMOTE: 'bg-violet-500',
    DEEP_WORK: 'bg-violet-500',
  };

  return (
    <div className={cn('relative inline-block flex-shrink-0', className)} {...props}>
      <div
        className={cn(
          'relative flex items-center justify-center rounded-full overflow-hidden font-semibold border border-border/70 bg-gradient-to-tr from-primary/20 via-accent to-secondary text-foreground select-none',
          sizeClasses[size]
        )}
      >
        {src && !imgError ? (
          <img
            src={src}
            alt={name}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-background',
            statusSize[size],
            statusColors[status] || 'bg-zinc-400'
          )}
          title={`Status: ${status}`}
        />
      )}
    </div>
  );
}
