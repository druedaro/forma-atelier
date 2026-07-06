// @ts-check
import { defineConfig } from 'astro/config';
import Critters from 'critters';
import fs from 'node:fs';
import path from 'node:path';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

function criticalCssIntegration() {
  return {
    name: 'critical-css',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const critters = new Critters({
          path: dir.pathname,
          publicPath: '/',
          preload: 'swap',
          inlineFonts: false,
          pruneSource: false,
          logLevel: 'silent',
        });

        const htmlFiles = [];
        const scanDir = (d) => {
          for (const entry of fs.readdirSync(d)) {
            const full = path.join(d, entry);
            if (fs.statSync(full).isDirectory()) scanDir(full);
            else if (entry.endsWith('.html')) htmlFiles.push(full);
          }
        };
        scanDir(dir.pathname);

        for (const file of htmlFiles) {
          try {
            const html = fs.readFileSync(file, 'utf-8');
            const result = await critters.process(html);
            fs.writeFileSync(file, result);
          } catch (e) {
            console.warn(`[critical-css] skipped ${file}: ${e.message}`);
          }
        }
        console.log(`[critical-css] processed ${htmlFiles.length} HTML files`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  // Astro 5: 'static' + prerender=false in API routes = same as legacy 'hybrid'
  // Pages are static; src/pages/api/* endpoints are SSR (prerender=false)
  output: 'static',
  adapter: vercel(),
  site: 'https://forma-atelier-bcn.vercel.app',
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
    criticalCssIntegration(),
  ],
  vite: {
    build: {
      chunkSizeWarningLimit: 600,
      modulePreload: {
        polyfill: false,
      },
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