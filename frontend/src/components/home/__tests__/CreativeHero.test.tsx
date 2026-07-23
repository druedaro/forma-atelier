import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreativeHero } from '../CreativeHero';
import { describe, it, expect, vi } from 'vitest';

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn() })),
    set: vi.fn(),
    to: vi.fn(),
    timeline: vi.fn(() => ({ to: vi.fn().mockReturnThis() })),
  },
}));
vi.mock('gsap/ScrollTrigger', () => ({
  default: { getAll: vi.fn(() => []) },
}));

describe('CreativeHero', () => {
  it('renders the brand name "Forma"', () => {
    render(<CreativeHero />);
    expect(screen.getByText('Forma')).toBeInTheDocument();
  });

  it('renders the brand name "Atelier"', () => {
    render(<CreativeHero />);
    expect(screen.getByText('Atelier')).toBeInTheDocument();
  });

  it('renders the scroll hint text', () => {
    render(<CreativeHero />);
    expect(screen.getByText(/Scroll para explorar/i)).toBeInTheDocument();
  });

  it('renders the hero image as decorative (role="presentation")', () => {
    render(<CreativeHero />);
    expect(screen.getByRole('presentation')).toBeInTheDocument();
  });
});
