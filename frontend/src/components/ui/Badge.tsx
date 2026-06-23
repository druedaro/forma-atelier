import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-medium tracking-widest uppercase', className)}
        style={{
          fontFamily: 'var(--font-body)',
          backgroundColor: '#F0EBE3',
          color: '#0A0A0A',
          border: '0.5px solid #E8DDD0',
          letterSpacing: '0.15em',
        }}
        {...props}
      >
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';

