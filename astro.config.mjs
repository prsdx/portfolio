// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://prsdx.github.io',
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
