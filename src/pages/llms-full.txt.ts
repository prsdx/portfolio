import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);

  const sorted = posts.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );

  const BASE = import.meta.env.SITE;

  // Build the full llms.txt — same header as /llms.txt plus all blog posts
  const header = `# Shubham

> B.Tech + M.Tech student at IIITM Gwalior (graduating 2027).
> Builds full-stack products, AI/ML systems, and writes about what he learns.
> GitHub: github.com/prsdx — X: @prsd_x — CF: prsdx (Expert, ~1847)

## Projects
- [Merix](${BASE}/projects/merix): AI-powered placement matching — parses resumes + JDs, embeds them, ranks candidates with plain-language explanations. Stack: FastAPI, Next.js, PostgreSQL, OpenAI.
- [Platewise](${BASE}/projects/platewise): RAG-based menu assistant that answers "what can I eat?" from restaurant menus via semantic search + LLM reasoning. Stack: LangChain, Python, FastAPI, ChromaDB.
- [YourTomo](${BASE}/projects/yourtomo): Renders pixel art from Git commit history — turns your contribution graph into a shareable SVG cat. Stack: TypeScript, Node.js, Git API, SVG.

## Structured Data (JSON APIs)
- [/api/me.json](${BASE}/api/me.json) — identity, skills, links
- [/api/projects.json](${BASE}/api/projects.json) — all projects
- [/api/blog.json](${BASE}/api/blog.json) — all published posts

## Pages
- [/about](${BASE}/about) · [/now](${BASE}/now) · [/cp](${BASE}/cp) · [/reading](${BASE}/reading) · [/uses](${BASE}/uses)

## All Blog Posts
`;

  const postLines = sorted
    .map(
      (p) =>
        `- [${p.data.title}](${BASE}/blog/${p.slug}) — ${p.data.date.toISOString().slice(0, 10)} [${p.data.tags.join(', ')}]`
    )
    .join('\n');

  return new Response(header + postLines + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
