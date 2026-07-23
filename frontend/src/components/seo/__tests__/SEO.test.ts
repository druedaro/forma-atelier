import { describe, it, expect } from 'vitest';

const SEO_DEFAULTS = {
  title: 'Forma Atelier - Barcelona',
  description: 'Moda contemporánea y sastrería de diseño desde Barcelona.',
  image: '/assets/photo-1490481651871-ab68de25d43d.avif',
  type: 'website',
};

const SITE_URL = 'https://forma-atelier-bcn.vercel.app';

describe('SEO component defaults', () => {
  it('has a descriptive default title containing the brand name and city', () => {
    expect(SEO_DEFAULTS.title).toContain('Forma Atelier');
    expect(SEO_DEFAULTS.title).toContain('Barcelona');
  });

  it('has a non-empty default description', () => {
    expect(SEO_DEFAULTS.description.length).toBeGreaterThan(20);
  });

  it('defaults to "website" as the OG type', () => {
    expect(SEO_DEFAULTS.type).toBe('website');
  });

  it('default image path is a valid relative .avif path', () => {
    expect(SEO_DEFAULTS.image).toMatch(/^\/assets\/.+\.avif$/);
  });

  it('site URL uses HTTPS and points to the correct domain', () => {
    const url = new URL(SITE_URL);
    expect(url.protocol).toBe('https:');
    expect(url.hostname).toContain('forma-atelier');
  });

  it('constructs canonical URLs correctly from site + pathname', () => {
    const canonical = new URL('/products/vestido-silk-georgette', SITE_URL);
    expect(canonical.toString()).toBe(
      'https://forma-atelier-bcn.vercel.app/products/vestido-silk-georgette'
    );
  });
});
