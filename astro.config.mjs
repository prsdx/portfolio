// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

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
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
