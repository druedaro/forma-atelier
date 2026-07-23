import React from 'react';
import { render, screen } from '@testing-library/react';
import { CampaignManifesto } from '../CampaignManifesto';
import { describe, it, expect, vi } from 'vitest';

vi.mock('gsap', () => ({
  gsap: {
    registerPlugin: vi.fn(),
    context: vi.fn(() => ({ revert: vi.fn() })),
    fromTo: vi.fn(),
    to: vi.fn(),
  },
}));
vi.mock('gsap/ScrollTrigger', () => ({ ScrollTrigger: {} }));

describe('CampaignManifesto', () => {
  it('renders the manifesto text wrapped in quotes', () => {
    render(<CampaignManifesto manifesto="La luz no solo ilumina, esculpe." />);
    expect(screen.getByText(/"La luz no solo ilumina, esculpe\."/)).toBeInTheDocument();
  });

  it('renders the image when an image prop is provided', () => {
    render(<CampaignManifesto manifesto="Test text" image="/assets/test.avif" />);
    const img = screen.getByAltText('Manifesto detail');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/assets/test.avif');
  });

  it('does not render an image when no image prop is provided', () => {
    render(<CampaignManifesto manifesto="Test text" />);
    expect(screen.queryByAltText('Manifesto detail')).not.toBeInTheDocument();
  });
});
