import React from 'react';
import { render } from '@testing-library/react';
import { Divider } from '../Divider';
import { describe, it, expect } from 'vitest';

describe('Divider', () => {
  it('renders correctly', () => {
    const { container } = render(<Divider />);
    const hr = container.querySelector('hr');
    expect(hr).toBeInTheDocument();
    expect(hr).toHaveClass('border-0', 'bg-linen', 'h-[0.5px]', 'w-full');
  });

  it('accepts custom classes', () => {
    const { container } = render(<Divider className="my-8 border-noir" />);
    const hr = container.querySelector('hr');
    expect(hr).toHaveClass('my-8', 'border-noir');
  });
});
