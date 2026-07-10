import '@testing-library/jest-dom';
import { vi } from 'vitest';

const gsapMock = {
  registerPlugin: vi.fn(),
  set: vi.fn(),
  to: vi.fn(),
  from: vi.fn(),
  fromTo: vi.fn(),
  kill: vi.fn(),
  timeline: vi.fn(() => ({
    to: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    fromTo: vi.fn().mockReturnThis(),
    kill: vi.fn().mockReturnThis(),
    add: vi.fn().mockReturnThis(),
  })),
  context: vi.fn((fn: () => void) => {
    fn();
    return { revert: vi.fn() };
  }),
  ticker: {
    add: vi.fn(),
    remove: vi.fn(),
    lagSmoothing: vi.fn(),
  },
  lagSmoothing: vi.fn(),
};

vi.mock('gsap', () => ({
  default: gsapMock,
  gsap: gsapMock,
  ...gsapMock,
}));

vi.mock('gsap/ScrollTrigger', () => ({
  default: {
    getAll: vi.fn(() => []),
    update: vi.fn(),
    refresh: vi.fn(),
    kill: vi.fn(),
  },
  ScrollTrigger: {
    getAll: vi.fn(() => []),
    update: vi.fn(),
    refresh: vi.fn(),
    kill: vi.fn(),
  },
}));

vi.mock('lenis', () => ({
  default: vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    scrollTo: vi.fn(),
    raf: vi.fn(),
    destroy: vi.fn(),
  })),
}));
