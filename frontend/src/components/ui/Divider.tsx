import React from 'react';
import { cn } from '../../lib/utils';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation = 'horizontal', ...props }, ref) => {
    return (
      <hr
        ref={ref}
        className={cn(
          'border-0 bg-linen',
          {
            'h-[0.5px] w-full': orientation === 'horizontal',
            'h-full w-[0.5px]': orientation === 'vertical',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Divider.displayName = 'Divider';
