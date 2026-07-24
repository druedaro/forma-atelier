import React from 'react';
import { render } from '@testing-library/react';
import { Divider } from '../Divider';
import { describe, it, expect } from 'vitest';

describe('Divider', () => {
  it('renders an hr element with default styles', () => {
    const { container } = render(<Divider />);
    const hr = container.querySelector('hr');
    expect(hr).toBeInTheDocument();
    expect(hr).toHaveClass('border-0', 'bg-linen', 'h-[0.5px]', 'w-full');
  });

  it('accepts and applies custom class names', () => {
    const { container } = render(<Divider className="my-8 border-noir" />);
    const hr = container.querySelector('hr');
    expect(hr).toHaveClass('my-8', 'border-noir');
  });
});
