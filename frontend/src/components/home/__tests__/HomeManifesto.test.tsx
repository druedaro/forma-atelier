import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomeManifesto } from '../HomeManifesto';
import { describe, it, expect, vi } from 'vitest';

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn() })),
    fromTo: vi.fn(),
  },
}));
vi.mock('gsap/ScrollTrigger', () => ({ default: {} }));

describe('HomeManifesto', () => {
  it('renders the manifesto headline', () => {
    render(<HomeManifesto />);
    expect(screen.getByText(/atemporalidad/i)).toBeInTheDocument();
  });

  it('renders the subtitle text', () => {
    render(<HomeManifesto />);
    expect(screen.getByText(/arquitectura/i)).toBeInTheDocument();
  });

  it('renders the Barcelona byline', () => {
    render(<HomeManifesto />);
    expect(screen.getByText(/Diseñado en Barcelona/i)).toBeInTheDocument();
  });
});
