import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';
import { describe, it, expect } from 'vitest';

describe('Badge', () => {
  it('renders children text correctly', () => {
    render(<Badge>New Collection</Badge>);
    expect(screen.getByText('New Collection')).toBeInTheDocument();
  });

  it('renders as a span element', () => {
    render(<Badge>Test</Badge>);
    const badge = screen.getByText('Test');
    expect(badge.tagName).toBe('SPAN');
  });

  it('accepts additional class names via the className prop', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    const badge = screen.getByText('Custom');
    expect(badge).toHaveClass('custom-class');
  });

  it('renders an empty span when given no text', () => {
    render(<Badge>{''}</Badge>);
    const badge = screen.getByText('', { selector: 'span' });
    expect(badge).toBeInTheDocument();
  });
});
