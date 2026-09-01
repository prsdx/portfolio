# Architecture

## Stack
- **Framework:** Astro 5 — static output, zero JS by default, best for content sites
- **Styling:** Tailwind CSS v4 + CSS custom properties
- **Components:** shadcn/ui where needed
- **Language:** TypeScript throughout
- **Font:** Geist (self-hosted, no Google Fonts DNS lookup)
- **Deploy:** Vercel (free tier)
- **Domain:** TBD by Shubham

## Content
- **Blog:** Notion API → `notion-to-md` → MDX in `/content/blog/` → Astro static pages
- **Projects:** MDX in `/content/projects/` — case studies, not just links
- **Writing flow:** Write in Notion → toggle Published → GitHub Action fetches → Vercel rebuilds

## Pages
```
/              → Home (design variation TBD)
/about
/projects
/projects/[slug]
/blog
/blog/[slug]   ← opens on this domain (Arpit-style, not external redirect)
/cp            ← competitive programming
/uses
/now
/api/me.json
/api/projects.json
/api/blog.json
```

## AI agent readability (build phase, not mockup phase)
- `/public/llms.txt` + `/public/llms-full.txt`
- JSON-LD on every page
- `/public/robots.txt` allowing ClaudeBot, GPTBot, PerplexityBot
- Semantic HTML throughout
- `/rss.xml` auto-generated

## Branching strategy
```
main           ← stable, always deployable
feat/<name>    ← one branch per task
```
PRs merged to main after Shubham reviews. Never push directly to main.
