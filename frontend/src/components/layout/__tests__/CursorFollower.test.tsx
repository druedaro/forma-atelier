import React from 'react';
import { render } from '@testing-library/react';
import { CursorFollower } from '../CursorFollower';
import { describe, it, expect, beforeEach } from 'vitest';

describe('CursorFollower', () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: originalInnerWidth });
  });

  it('renders nothing when inactive (mobile)', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 800 });
    const { container } = render(<CursorFollower />);
    expect(container.firstChild).toBeNull();
  });

  it('renders the cursor on desktop', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1200 });
    const { container } = render(<CursorFollower />);
    const div = container.querySelector('div.fixed.top-0');
    expect(div).toBeInTheDocument();
  });
});
