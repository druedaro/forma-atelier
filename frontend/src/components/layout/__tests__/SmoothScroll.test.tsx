import { render } from '@testing-library/react';
import SmoothScroll from '../SmoothScroll';
import { describe, it, expect, vi } from 'vitest';

// Lenis is a class so the mock must also be constructible.
// Using `class` syntax guarantees `new Lenis()` works in the test environment.
vi.mock('lenis', () => {
  class MockLenis {
    scrollTo = vi.fn();
    start = vi.fn();
    stop = vi.fn();
    destroy = vi.fn();
    on = vi.fn();
    raf = vi.fn();
  }
  return { default: MockLenis };
});

vi.mock('gsap', () => ({
  default: {
    registerPlugin: vi.fn(),
    ticker: { add: vi.fn(), remove: vi.fn(), lagSmoothing: vi.fn() },
  },
}));

vi.mock('gsap/ScrollTrigger', () => ({
  default: { getAll: vi.fn(() => [{ kill: vi.fn() }]), update: vi.fn() },
}));

describe('SmoothScroll', () => {
  it('renders nothing (returns null)', () => {
    const { container } = render(<SmoothScroll />);
    expect(container.firstChild).toBeNull();
  });

  it('mounts and unmounts without errors', () => {
    expect(() => {
      const { unmount } = render(<SmoothScroll />);
      unmount();
    }).not.toThrow();
  });

  it('attaches an astro:page-load event listener on mount', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    render(<SmoothScroll />);
    expect(addSpy).toHaveBeenCalledWith('astro:page-load', expect.any(Function));
  });

  it('attaches an astro:before-preparation event listener on mount', () => {
    const addSpy = vi.spyOn(document, 'addEventListener');
    render(<SmoothScroll />);
    expect(addSpy).toHaveBeenCalledWith('astro:before-preparation', expect.any(Function));
  });
});
