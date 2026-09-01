# Stack

## Why each choice was made

| Tool | Choice | Why |
|---|---|---|
| Framework | Astro 5 | Content-driven site. Zero JS by default. Best SEO. Multi-source content at build time. |
| Styling | Tailwind v4 + CSS custom properties | Tailwind for utilities, custom properties for design tokens that Cline/agents can query |
| Components | shadcn/ui | Accessible, unstyled base — tokens do the theming |
| Language | TypeScript strict | Catches errors at build time, better Graphify graph nodes |
| Font | Geist (self-hosted) | No Google Fonts DNS. Clean. Vercel ecosystem. |
| Blog source | Notion API | Fast writing (rich editor) + on-domain reading (Arpit-style) |
| Syntax highlight | Shiki (built-in Astro) | Zero client JS. Accurate. |
| OG images | Satori (@vercel/og) | Build-time generation. No server. |
| Deploy | Vercel | Free tier. Vercel + Astro = zero config. |
| Codebase context | Graphify | Reduces Cline token usage 60%+ per session |

## What was ruled out and why

| Tool | Ruled out | Why |
|---|---|---|
| Next.js | Too heavy | Site is content-driven, not app-driven. Astro outputs zero JS. |
| Framer Motion | Ruled out | Adds 40-100kb JS. Animations are CSS-only. |
| Google Fonts | Ruled out | DNS lookup. Self-hosting Geist is trivial. |
| Hashnode/Substack as reading destination | Ruled out | Posts must open on own domain (Arpit-style). Platform hosting loses SEO. |
| Separate blog site | Ruled out | Two sites = twice the maintenance. |
| Notion as reading destination | Ruled out | Reading experience must be on own domain. |
