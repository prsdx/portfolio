import type { APIRoute } from 'astro';
import { generateOgImage } from '../../lib/og';

export const prerender = true;

export const GET: APIRoute = async () => {
  const png = await generateOgImage({
    title: 'Shubham',
    subtitle: 'Building AI systems, solving DSA problems, and writing about it. Third-year CS student at IIITM Gwalior.',
    tag: 'PORTFOLIO',
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400, immutable',
    },
  });
};