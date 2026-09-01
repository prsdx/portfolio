# Task 03 — Blog System

## Session start checklist
```bash
cat CLAUDE.md
graphify query "what components and layouts exist"
graphify query "what content collections are defined"
find /mnt/skills -name "SKILL.md" | sort
git checkout -b feat/blog
```

---

## Context
- Tasks 01 + 02 complete: scaffold + home page done
- Blog uses Astro Content Collections with MDX — no Notion API yet (that's task 05)
- The core reading experience goal: posts open on this domain, styled like arpitbhayani.me
- Reference: `docs/references.md` (Arpit's blog implementation notes)

---

## Goal
Blog listing page + individual post page. Beautiful reading experience. Static, MDX-driven.

---

## Scope
- [ ] `src/pages/blog/index.astro` — all posts, sorted by date descending
- [ ] `src/pages/blog/[...slug].astro` — individual post page
- [ ] `src/layouts/BlogPostLayout.astro` — post wrapper (reading-optimised)
- [ ] `src/components/blog/PostCard.astro` — reusable card for listing
- [ ] 2 real placeholder MDX posts in `src/content/blog/`
- [ ] RSS feed: `src/pages/rss.xml.ts`

## Out of scope
- No Notion API (task 05)
- No comments
- No share buttons
- No reading progress bar
- No sidebar

---

## Blog post layout — reading experience rules
```
max-width: 65ch        /* non-negotiable */
font-size: 17px
line-height: 1.75
font-family: var(--font-sans)
```
Code blocks: Shiki (built into Astro — use `syntaxHighlight: 'shiki'` in astro.config).
Theme: `github-dark` for dark mode, `github-light` for light.

Post header must include:
- Title (`<h1>`)
- Date formatted as `Aug 15, 2026`
- Reading time estimate (`~N min read` — calculate from word count)
- Tags as `<a>` links (non-functional for now, `href="#"`)

Post footer:
- Prev / Next post navigation
- Link back to `/blog`

No author bio, no related posts, no social proof — just the writing.

---

## Two placeholder MDX posts — write real content

**Post 1:** `src/content/blog/how-i-built-platewise.mdx`
```yaml
---
title: "How I Built a RAG-Based Menu Assistant"
date: 2026-07-15
tags: ["AI/ML", "RAG", "LangChain"]
excerpt: "Building Platewise taught me that RAG systems fail in ways you don't expect."
draft: false
---
```
Body: 400-500 words. Real technical content about building a RAG system.
Include one code snippet (Python or TypeScript). Write like a student who built this.
Run the `humanizer` skill on the copy before finalising.

**Post 2:** `src/content/blog/codeforces-lessons.mdx`
```yaml
---
title: "What 200 Codeforces Problems Taught Me"
date: 2026-06-30
tags: ["competitive programming", "Codeforces"]
excerpt: "The skills transfer more than I expected — and in ways I didn't predict."
draft: false
---
```
Body: 300-400 words. Specific, honest observations. Not generic advice.
Run the `humanizer` skill on the copy before finalising.

---

## RSS feed (`src/pages/rss.xml.ts`)
Use `@astrojs/rss`. Include all non-draft posts. Site URL: use `import.meta.env.SITE`.

---

## Technical notes
- Query Graphify before touching `content/config.ts` to understand current schema
- Heading hierarchy in MDX: post title is `<h1>`, MDX headings start at `##` (`<h2>`)
- Images in MDX: use Astro's `<Image />` — never raw `<img>`
- Code blocks: Shiki handles syntax highlighting at build time — zero client JS

---

## Ask Shubham if
- [ ] Preferred code block theme (dark/light or always dark)
- [ ] Should tags link to a tag filter page, or just be decorative for now?
- [ ] Any specific posts he wants to write — can stub them as drafts

---

## Done when
- [ ] `/blog` lists both posts, sorted by date
- [ ] Each post renders correctly with proper reading typography
- [ ] Code blocks syntax-highlighted via Shiki
- [ ] `/rss.xml` returns valid RSS (validate at https://validator.w3.org/feed/)
- [ ] `astro build` passes
- [ ] No Google Fonts requests
- [ ] Branch `feat/blog` pushed

---

## Notes for next task
<!-- Fill in after completing -->
