import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  const BASE = import.meta.env.SITE;

  const data = posts
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((p) => ({
      slug: p.slug,
      title: p.data.title,
      excerpt: p.data.excerpt,
      tags: p.data.tags,
      date: p.data.date.toISOString().slice(0, 10),
      url: `${BASE}/blog/${p.slug}`,
    }));

  return new Response(JSON.stringify(data, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
};
