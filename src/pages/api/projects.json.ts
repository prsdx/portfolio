import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const projects = await getCollection('projects');

  const BASE = import.meta.env.SITE;

  const data = projects
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .map((p) => ({
      slug: p.slug,
      title: p.data.title,
      excerpt: p.data.excerpt,
      tags: p.data.tags,
      date: p.data.date.toISOString().slice(0, 10),
      url: `${BASE}/projects/${p.slug}`,
      // github: null,   // add real URLs when ready
      // live: null,
    }));

  return new Response(JSON.stringify(data, null, 2), {
    headers: { 'Content-Type': 'application/json' },
  });
};
