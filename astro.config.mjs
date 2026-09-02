// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Vercel injects VERCEL_URL at build time. For custom domain: replace with 'https://yourdomain.com'
  site: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:4321',
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        themes: {
          dark: 'github-dark',
          light: 'github-light',
        },
        defaultColor: false,
      },
    }),
    sitemap({
      filter: (page) => !page.includes('/og/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
