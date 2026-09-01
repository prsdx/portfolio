# Task 06 — SEO + Performance

## Session start checklist
```bash
cat CLAUDE.md
graphify query "what is in BaseLayout.astro"
graphify query "what pages exist and what meta tags do they have"
find /mnt/skills -name "SKILL.md" | sort
git checkout -b feat/seo-perf
```

---

## Context
- Tasks 01–05 complete. Site works, blog pulls from Notion.
- This task: make the site fast, crawlable, and SEO-complete before deploy.

---

## Goal
Lighthouse 95+ on all pages. Complete meta coverage. Auto-generated OG images. Sitemap.

---

## Scope
- [ ] `@astrojs/sitemap` integration — auto-generates `/sitemap.xml`
- [ ] OG image generation via Satori (`@vercel/og`) for every page and blog post
- [ ] JSON-LD structured data in BaseLayout (Person schema on home, Article schema on blog)
- [ ] Complete meta in BaseLayout: description, canonical, OG, Twitter card, RSS link
- [ ] `astro.config.ts` — set `site` to actual domain
- [ ] Lighthouse audit — fix any issues found

## Out of scope
- No analytics (Shubham's call — ask)
- No `/api/*` routes yet (task 07)

---

## OG image strategy
Auto-generate at build time using Satori. One template, two variants:
- Default (home, about, etc.): name + tagline
- Blog post: post title + date + site name

```bash
npm install @vercel/og
```

Create `src/pages/og/[...slug].png.ts` — Astro endpoint that generates PNG.

---

## JSON-LD

**Home page (`src/pages/index.astro`):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Shubham",
  "url": "https://[domain]",
  "sameAs": [
    "https://github.com/prsdx",
    "https://x.com/prsd_x",
    "https://codeforces.com/profile/prsdx"
  ],
  "alumniOf": { "@type": "EducationalOrganization", "name": "IIITM Gwalior" },
  "knowsAbout": ["Full-Stack", "AI/ML", "RAG Systems", "Competitive Programming", "TypeScript", "Python"]
}
```

**Blog post layout:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{{title}}",
  "author": { "@type": "Person", "name": "Shubham" },
  "datePublished": "{{date}}",
  "url": "{{canonical}}"
}
```

---

## Lighthouse checklist
Run after build (`npx astro build && npx serve dist`):
- Performance: 95+
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

Common fixes:
- Images missing width/height → use Astro `<Image />` with explicit dimensions
- Unused JS → verify no animation libraries snuck in
- Missing meta description → check every page's BaseLayout usage
- Font display swap → add `font-display: swap` to `@font-face`

---

## Ask Shubham if
- [ ] Confirm actual domain (needed for `site` in astro.config and canonical URLs)
- [ ] Does he want analytics? (Plausible / Fathom / none — no Google Analytics)
- [ ] Twitter/X card type preference: `summary` or `summary_large_image`

---

## Done when
- [ ] `/sitemap.xml` accessible and valid
- [ ] OG images generate for home and at least one blog post
- [ ] JSON-LD present on home and blog post pages (verify with Google Rich Results Test)
- [ ] Lighthouse: all 95+ on home and a blog post
- [ ] No Google Fonts network requests on any page
- [ ] Branch `feat/seo-perf` pushed

---

## Notes for next task
<!-- Fill in -->
- Domain confirmed:
- Lighthouse scores:
- Any performance issues found and fixed:
