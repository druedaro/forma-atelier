// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
// Platform adapter — swap this single line to move to a different host:
//   Vercel:  @astrojs/vercel  → vercel()
//   Netlify: @astrojs/netlify → netlify()
//   Node.js: @astrojs/node   → node({ mode: 'standalone' })
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // Astro 5: 'static' + prerender=false in API routes = same as legacy 'hybrid'
  // Pages are static; src/pages/api/* endpoints are SSR (prerender=false)
  output: 'static',
  adapter: vercel(),
  site: 'https://forma-atelier.com',
  integrations: [
    react(),
    tailwind(),
    sitemap({
      filter: (page) =>
        !page.includes('/checkout') &&
        !page.includes('/success') &&
        !page.includes('/cart') &&
        !page.includes('/wishlist') &&
        !page.includes('/login') &&
        !page.includes('/api/'),
    }),
  ],
  vite: {
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('@stripe/')) {
              return 'vendor-stripe';
            }
            if (id.includes('node_modules/firebase')) {
              return 'vendor-firebase';
            }
            if (id.includes('node_modules/gsap')) {
              return 'vendor-gsap';
            }
          },
        },
      },
    },
  },
});