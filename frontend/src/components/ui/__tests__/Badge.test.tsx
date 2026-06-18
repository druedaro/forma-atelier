import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';
import { describe, it, expect } from 'vitest';

describe('Badge', () => {
  it('renders correctly with children', () => {
    render(<Badge>New Collection</Badge>);
    const badge = screen.getByText(/New Collection/i);
    expect(badge).toBeInTheDocument();
  });

  it('applies the correct default classes', () => {
    render(<Badge>Test</Badge>);
    const badge = screen.getByText(/Test/i);
    expect(badge).toHaveClass('inline-flex', 'items-center', 'px-2', 'py-0.5', 'rounded-sm', 'font-body', 'text-[10px]', 'font-medium', 'tracking-widest', 'uppercase', 'bg-smoke', 'text-stone', 'border-[0.5px]', 'border-linen');
  });

  it('accepts additional class names', () => {
    render(<Badge className="bg-stone">Custom</Badge>);
    const badge = screen.getByText(/Custom/i);
    expect(badge).toHaveClass('bg-stone');
  });
});
