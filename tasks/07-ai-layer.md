# Task 07 — AI Agent Readability Layer

## Session start checklist
```bash
cat CLAUDE.md
graphify query "what api routes and public files exist"
graphify query "what content is in the blog and projects collections"
find /mnt/skills -name "SKILL.md" | sort
git checkout -b feat/ai-layer
```

---

## Context
- Tasks 01–06 complete. Site is built, blog works, SEO done.
- This task: make the site readable and queryable by AI agents.
- Reference: `docs/references.md` — this is what makes the portfolio stand out vs every other student site.

---

## Goal
A portfolio that works for three audiences: human recruiters, AI agents, developer tools (Claude Code, Cursor) that might reference Shubham's work.

---

## Scope
- [ ] `/public/llms.txt` — compact AI-readable summary
- [ ] `/public/llms-full.txt` — expanded version with all blog/project links
- [ ] `src/pages/api/me.json.ts` — structured JSON about Shubham
- [ ] `src/pages/api/projects.json.ts` — all projects as JSON
- [ ] `src/pages/api/blog.json.ts` — all blog posts as JSON
- [ ] Update `robots.txt` — verify AI crawlers are allowed
- [ ] Auto-regenerate `llms-full.txt` at build time from content collections

## Out of scope
- No MCP server (future task if Shubham wants it)
- No WebMCP registration

---

## `/public/llms.txt`
```markdown
# Shubham

> B.Tech + M.Tech student at IIITM Gwalior (CPI 9.01).
> Builds full-stack products, AI/ML systems, and writes about what he learns.
> GitHub: github.com/prsdx — X: @prsd_x — CF: prsdx (Expert, ~1847)

## Projects
- [Merix](/projects/merix): B2B SaaS AI resume-to-JD matching platform
- [Platewise](/projects/platewise): RAG-based restaurant menu assistant
- [Yourtomo](/projects/yourtomo): GitHub Action pixel-cat SVG from commit activity

## Writing
- [Blog](/blog): AI/ML, systems, full-stack, competitive programming
- [RSS](/rss.xml)

## Data
- [/api/me.json](/api/me.json)
- [/api/projects.json](/api/projects.json)
- [/api/blog.json](/api/blog.json)

## Links
- [/about](/about) · [/cp](/cp) · [/uses](/uses) · [/now](/now)
```

## `/public/llms-full.txt`
Same as above + auto-appended list of all blog post titles, dates, and URLs.
Generate this at build time: create `src/pages/llms-full.txt.ts` as an Astro endpoint
that queries the blog content collection and renders the full list.

---

## API endpoints — static JSON generated at build time

**`src/pages/api/me.json.ts`**
```typescript
export const GET = () => new Response(JSON.stringify({
  name: "Shubham",
  role: "B.Tech + M.Tech student, Information Technology",
  institution: "IIITM Gwalior",
  cpi: 9.01,
  skills: ["TypeScript", "Python", "React", "Next.js", "Astro", "FastAPI", "RAG", "LangChain"],
  github: "https://github.com/prsdx",
  x: "https://x.com/prsd_x",
  codeforces: "https://codeforces.com/profile/prsdx",
  projects: ["merix", "platewise", "yourtomo"]
}, null, 2), {
  headers: { "Content-Type": "application/json" }
});
```

**`src/pages/api/projects.json.ts`** — query projects content collection, return array of `{slug, title, description, stack, github, live}`.

**`src/pages/api/blog.json.ts`** — query blog content collection, return array of `{slug, title, date, tags, excerpt}`. Exclude drafts.

---

## Technical notes
- These are static Astro endpoints — zero server required, generated at build time
- Pretty-print JSON (`null, 2`) — human and AI readable
- `Content-Type: application/json` header required
- Test all three: `curl https://yoursite.com/api/me.json | jq`

---

## Ask Shubham if
- [ ] Confirm final domain (needed for absolute URLs in llms.txt)
- [ ] Any skills or tools to add to `me.json` skills array
- [ ] Whether to include Codeforces rating in `me.json` (it changes — hardcode or omit)

---

## Done when
- [ ] `/llms.txt` accessible, valid markdown
- [ ] `/llms-full.txt` includes all blog post URLs
- [ ] `/api/me.json` returns valid JSON
- [ ] `/api/projects.json` returns all 3 projects
- [ ] `/api/blog.json` returns all published posts, no drafts
- [ ] `astro build` passes
- [ ] Branch `feat/ai-layer` pushed

---

## Notes for next task
<!-- Fill in -->
