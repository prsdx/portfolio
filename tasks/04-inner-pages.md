# Task 04 — Inner Pages

## Session start checklist
```bash
cat CLAUDE.md
graphify query "what pages exist and what components are shared"
graphify query "what CSS tokens are defined"
find /mnt/skills -name "SKILL.md" | sort
git checkout -b feat/inner-pages
```

---

## Context
- Tasks 01–03 complete: scaffold, home, blog done
- All pages share Header, Footer, BaseLayout, and token system from task 02
- Query Graphify for current component/layout state before any new code
- Approved mockups at repo root ARE the spec: `variation-k2.html` (home),
  `writing.html` (writing index), `reading.html` (reading index),
  `project-merix.html` (case-study template) — port, don't redesign

---

## Goal
Build all remaining pages. Real content, consistent with chosen design variation.

---

## Scope — one section at a time

### `/projects` and `/projects/[slug]`
- Listing: all 3 projects as cards matching the home page card design.
  Name, one-line description, stack tags, GitHub/Live links, "case study →" button.
- Individual project page (`/projects/merix`, `/projects/platewise`, `/projects/yourtomo`):
  - MDX case study in `src/content/projects/`
  - Port `project-merix.html` structure: problem → what I built →
    architecture (mono flow diagram) → hard parts → honest status →
    prev/next navigation
  - Layout: same reading width as blog (`max-width: 65ch`)
  - Not a marketing page — write like an engineer reflecting on what they built

### `/reading`
- Port `reading.html`: three shelves — Bookshelf, Papershelf, Articles
- Status chips (reading / finished / queued), one-line honest notes, links
  to public notes where they exist
- Data: start hardcoded; later a content collection (`src/content/reading/`)

### `/about`
- Text only. No skills bars. No percentages.
- Cover: IIITM Gwalior, B.Tech+M.Tech IT, when started (CPI intentionally
  omitted from site — decision from mockup phase)
- Interests: full-stack, AI/ML, competitive programming
- Photo (same portrait as home hero)
- A brief timeline (academic milestones, projects, CP progression)
- Achievements list (same data as home Achievements section)
- Links: GitHub, X, Codeforces

### `/cp`
- Codeforces handle: `prsdx`, rating placeholder: `1847`, category: Expert
- Show: rating, problems solved, best performance
- One paragraph: what competitive programming means to you as an engineer — not a brag, a reflection
- Link to Codeforces profile

### `/uses`
Categories and real tools:
- **Editor:** VS Code (or whichever Shubham actually uses — ask if unsure)
- **Terminal:** Warp
- **Languages:** TypeScript, Python, C++
- **Frameworks:** Next.js, Astro, FastAPI
- **AI tools:** Claude, Cline
- **Design:** Figma
- **Deploy:** Vercel, GitHub Actions

Each tool: name + one honest sentence. No ratings. No stars.

### `/now`
Current snapshot — plain text, journal-like. Example:
> Last updated: September 2026
>
> Finishing 4th semester at IIITM Gwalior. Working on Merix — currently fixing the matching pipeline. Reading Designing Data-Intensive Applications. Writing about RAG systems.

This page should feel visually different from the rest — quieter, more personal. No cards.

---

## Out of scope
- No `/api/*` routes yet (task 07)
- No contact form
- No guestbook
- No analytics dashboard

---

## Technical notes
- Project MDX files go in `src/content/projects/` — use same Astro collection pattern as blog
- Run `humanizer` skill on all copy, especially `/about` and `/now` — these are the most likely to sound AI-generated
- `/uses` and `/now` should feel visually quieter than home — less chrome, more content
- `/cp` rating: display the number large (48px+) — the number is the design element, not a bar

---

## Ask Shubham if
- [ ] Which editor he actually uses daily
- [ ] Current Codeforces rating (confirm vs placeholder 1847)
- [ ] Anything specific for the /now page he wants included
- [ ] Whether to link projects to live deploys (confirm URLs for Merix, Platewise)

---

## Done when
- [ ] All 5 page groups render at 375px and 1440px
- [ ] `/projects/[slug]` works for all 3 projects
- [ ] No Lorem Ipsum anywhere — all real content
- [ ] `humanizer` check passed on `/about` and `/now` copy
- [ ] `astro build` passes
- [ ] Branch `feat/inner-pages` pushed

---

## Notes for next task
<!-- Fill in after completing -->
