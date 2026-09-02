import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '../../../lib/og';

export const prerender = true;

export async function getStaticPaths() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.id.replace(/\.mdx$/, '') },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: { data: { title: string; date: Date; excerpt: string } } };

  const dateStr = new Date(post.data.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const png = await generateOgImage({
    title: post.data.title,
    subtitle: dateStr,
    tag: 'BLOG POST',
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400, immutable',
    },
  });
};