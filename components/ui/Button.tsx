import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, disabled, ...props }, ref) => {
    const variantStyles = {
      primary:
        'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 active:scale-[0.98] border border-primary/20',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98] border border-border/50',
      outline:
        'border border-border bg-card/60 hover:bg-accent hover:text-accent-foreground active:scale-[0.98]',
      ghost:
        'hover:bg-accent hover:text-accent-foreground active:scale-[0.98] border-transparent',
      danger:
        'bg-rose-600 text-white shadow-sm hover:bg-rose-700 active:scale-[0.98]',
      success:
        'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 active:scale-[0.98]',
    };

    const sizeStyles = {
      sm: 'h-8 px-3 text-xs rounded-md',
      md: 'h-9 px-4 text-sm rounded-lg',
      lg: 'h-11 px-6 text-base rounded-lg',
      icon: 'h-9 w-9 p-0 rounded-lg flex items-center justify-center',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
