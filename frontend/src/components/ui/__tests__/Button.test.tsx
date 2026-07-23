import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';
import { describe, it, expect, vi } from 'vitest';

describe('Button — core', () => {
  it('renders children text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders as a button element', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls the onClick handler when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Blocked</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('Button — variants', () => {
  it('applies primary variant classes by default', () => {
    render(<Button>Primary</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-noir', 'text-ivory');
  });

  it('applies outline variant classes', () => {
    render(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-transparent', 'text-noir');
  });

  it('applies ghost variant classes', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-transparent');
  });
});

describe('Button — sizes', () => {
  it('applies small size classes', () => {
    render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-8', 'px-4');
  });

  it('applies large size classes', () => {
    render(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('h-16', 'px-12');
  });

  it('merges a custom className with the defaults', () => {
    render(<Button className="my-custom-class">Custom</Button>);
    expect(screen.getByRole('button')).toHaveClass('my-custom-class');
  });
});
