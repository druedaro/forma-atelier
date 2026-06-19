import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        noir: 'var(--color-noir)',
        ivory: 'var(--color-ivory)',
        gold: 'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        stone: 'var(--color-stone)',
        linen: 'var(--color-linen)',
        smoke: 'var(--color-smoke)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)'],
      },
      letterSpacing: {
        tight: 'var(--tracking-tight)',
        normal: 'var(--tracking-normal)',
        wide: 'var(--tracking-wide)',
        wider: 'var(--tracking-wider)',
        widest: 'var(--tracking-widest)',
      },
      spacing: {
        gutter: 'var(--spacing-gutter)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        pill: 'var(--radius-pill)',
      },
      transitionTimingFunction: {
        spring: 'var(--transition-spring)',
      },
    },
  },
  plugins: [],
}

export default config
