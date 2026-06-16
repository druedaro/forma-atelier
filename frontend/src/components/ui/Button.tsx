import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        data-cursor="expand"
        className={cn(
          'inline-flex items-center justify-center font-body transition-smooth duration-400',
          {
            // Variants
            'bg-noir text-ivory hover:bg-stone': variant === 'primary',
            'bg-gold text-ivory hover:bg-gold-light': variant === 'secondary',
            'border-[0.5px] border-linen bg-transparent text-noir hover:border-gold': variant === 'outline',
            'bg-transparent text-noir hover:text-stone': variant === 'ghost',
            // Sizes
            'h-8 px-4 text-sm tracking-wider': size === 'sm',
            'h-12 px-8 text-base tracking-wider uppercase': size === 'md',
            'h-16 px-12 text-lg tracking-widest uppercase': size === 'lg',
          },
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
