# Task 01 — Project Scaffold + Graphify Setup

## Session start checklist
```bash
# This is task 01 — no existing repo yet
# Start from an empty folder

# 1. Read project context
cat CLAUDE.md

# 2. Discover skills — read descriptions, use what applies
find /mnt/skills -name "SKILL.md" | sort
```

---

## Context
- New project. Nothing exists yet.
- Design variation: pending ADR-001 in `docs/decisions.md` — scaffold is variation-agnostic
- Stack: Astro 5 + Tailwind v4 + TypeScript + shadcn/ui + Geist font
- References: `docs/references.md`

---

## Goal
Scaffold the full Astro project, install all dependencies, configure tooling, set up Graphify, and create placeholder pages — so every subsequent task starts from a clean, working base.

---

## Scope — build only this

### Scaffold
```bash
npm create astro@latest . -- --template minimal --typescript strict --no-git
npx astro add tailwind
npx shadcn@latest init
npm install geist
pip install graphifyy   # Graphify — do this after npm install
graphify                # Build initial knowledge graph
```

### File structure to create
```
src/
├── pages/
│   ├── index.astro          ← placeholder "coming soon" — single h1 only
│   ├── about.astro          ← placeholder
│   ├── blog/
│   │   ├── index.astro      ← placeholder
│   │   └── [...slug].astro  ← placeholder
│   ├── projects/
│   │   ├── index.astro      ← placeholder
│   │   └── [slug].astro     ← placeholder
│   ├── cp.astro             ← placeholder
│   ├── uses.astro           ← placeholder
│   └── now.astro            ← placeholder
├── layouts/
│   └── BaseLayout.astro     ← head, meta, OG, font, global CSS import
├── components/
│   ├── Header.astro         ← nav shell, no styling yet
│   └── Footer.astro         ← footer shell, no styling yet
├── content/
│   └── config.ts            ← Astro content collections config
└── styles/
    └── global.css           ← CSS custom properties + prefers-reduced-motion

public/
├── fonts/                   ← Geist self-hosted files go here
├── robots.txt               ← allow all crawlers including AI bots
└── llms.txt                 ← placeholder, real content in later task

docs/                        ← copy from task system (already exists)
tasks/                       ← copy from task system (already exists)
CLAUDE.md                    ← copy from task system (already exists)
```

### `BaseLayout.astro` must include
- `<html lang="en">`
- `<meta charset="utf-8">`
- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- `<title>` prop
- `<meta name="description">` prop
- `<link rel="canonical">` prop
- Self-hosted Geist font via `@font-face` in global.css
- Import `global.css`
- Slot for page content

### `global.css` must include
```css
/* Tokens — all colors via CSS custom properties */
:root {
  --font-sans: 'Geist', system-ui, sans-serif;
  --font-mono: 'Geist Mono', monospace;
  /* Colors populated in task 02 once design variation is chosen */
}

/* Required — no exceptions */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Base */
body {
  font-family: var(--font-sans);
  font-size: 16px;
  line-height: 1.6;
}
```

### `robots.txt`
```
User-agent: ClaudeBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: *
Allow: /
```

### `content/config.ts`
Define two collections: `blog` and `projects`. Schema: title, date, excerpt, tags, draft.
Use Astro's `defineCollection` + `z` schema.

### Graphify
After scaffold is complete:
```bash
graphify   # builds graphify-out/ — add this folder to .gitignore
```
Add to `.gitignore`:
```
graphify-out/
node_modules/
dist/
.astro/
```

---

## Out of scope — do not build
- No actual page content or design yet (that's task 02+)
- No Notion API integration yet (task 05)
- No blog post content yet
- No llms.txt content yet (task 07)
- No JSON-LD yet (task 02)
- No component styling yet

---

## Ask Shubham if
- [ ] Python not available (Graphify needs Python 3.10+)
- [ ] Preferred domain name (needed for canonical URLs later, can skip for now)
- [ ] Any existing code to preserve or migrate

---

## Done when
- [ ] `npm run dev` starts without errors
- [ ] `astro build` passes with zero errors or warnings
- [ ] All placeholder pages return 200 at their routes
- [ ] Geist font loads (check Network tab — no Google Fonts requests)
- [ ] `graphify-out/` exists and is non-empty
- [ ] `graphify-out/` is in `.gitignore`
- [ ] Branch: `feat/scaffold` pushed to remote

---

## Notes for next task
<!-- Fill in after completing this task -->
- Node version used: v24.19.0 (npm 11.17.0), Python 3.12.11, Astro 5.18.2, Tailwind 4.3.3
- Any install issues encountered:
  - `npm create astro@latest .` refuses non-empty dirs — scaffolded in a temp folder and copied in. Template overwrote CLAUDE.md/README.md; both restored manually.
  - Latest create-astro ships Astro 7 — pinned `astro@^5` per ADR-003.
  - `npx astro add tailwind` and long `npm install` calls hit the 30s command timeout on Windows; Tailwind v4 was wired manually via `@tailwindcss/vite` in `astro.config.mjs` instead. Same effect, no interactive prompts.
  - `pip install graphifyy` is not the package name on this machine; `graphify` CLI (0.9.48) was already available. Build command is `graphify update .` (bare `graphify` just prints help). Its parser warns on `.astro` frontmatter — cosmetic only, expected.
  - Geist variable woff2 files copied from `node_modules/geist/dist/fonts/` to `public/fonts/` (Geist-Variable.woff2 + GeistMono-Variable.woff2).
- Graphify graph size (approximate): 223 nodes, 217 edges, 22 communities
- Git: committed on `feat/scaffold` (root commit). **No git remote configured — `git push` skipped. Add remote and push when ready.**
