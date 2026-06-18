import React from 'react';
import { render } from '@testing-library/react';
import { LookbookScroll } from '../LookbookScroll';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../../../animations/lookbookScroll', () => ({
  initLookbookScroll: vi.fn(() => ({ kill: vi.fn() })),
}));

vi.mock('../../../animations/scrollTrigger', () => ({
  registerScrollTrigger: vi.fn(),
}));

describe('LookbookScroll', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <LookbookScroll>
        <div>Test Child</div>
      </LookbookScroll>
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('renders the wrapper and container with correct classes', () => {
    const { container } = render(
      <LookbookScroll>
        <div>Child</div>
      </LookbookScroll>
    );
    expect(container.firstChild).toHaveClass('h-screen', 'w-full', 'overflow-hidden', 'bg-ivory');
    expect(container.querySelector('.w-max')).toBeInTheDocument();
  });
});
