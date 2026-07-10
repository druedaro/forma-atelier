import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';
import { describe, it, expect } from 'vitest';

describe('[MUST] Badge', () => {
  it('[M1] renders children text correctly', () => {
    render(<Badge>New Collection</Badge>);
    expect(screen.getByText('New Collection')).toBeInTheDocument();
  });

  it('[M2] renders as an inline-flex span element', () => {
    render(<Badge>Test</Badge>);
    const badge = screen.getByText('Test');
    expect(badge.tagName).toBe('SPAN');
  });

  it('[M3] accepts additional class names via className prop', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    const badge = screen.getByText('Custom');
    expect(badge).toHaveClass('custom-class');
  });

  it('[M4] renders empty when no children', () => {
    render(<Badge>{''}</Badge>);
    const badge = screen.getByText('', { selector: 'span' });
    expect(badge).toBeInTheDocument();
  });
});
