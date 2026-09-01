# Task 02 — Home Page (chosen design variation)

## Session start checklist
```bash
cat CLAUDE.md
graphify                          # refresh graph — task 01 changed many files
find /mnt/skills -name "SKILL.md" | sort   # read relevant ones
git checkout -b feat/home
```

---

## Context
- Task 01 complete: Astro scaffold, BaseLayout, global.css, Geist, Graphify running
- Design variation chosen: **K2 v3 — "Dashboard, Hired"** — see `docs/decisions.md` ADR-001 (FINAL)
- The approved mockup is `variation-k2.html` at repo root — it IS the spec.
  Port it to Astro components; do not redesign.
- Query Graphify for current file structure before touching anything:
  ```bash
  graphify query "what pages and components currently exist"
  graphify query "what CSS custom properties are defined in global.css"
  ```
- Visual references: `docs/references.md` — read before designing

---

## Goal
Build the home page (`src/pages/index.astro`) using the chosen design variation. Fully styled, responsive, with real placeholder content.

---

## Scope — build only this
- [ ] `src/pages/index.astro` — full home page, porting `variation-k2.html`
      section-for-section: hero (fact row + Currently line + resume button +
      photo) → signals strip → selected work → achievements → about
      (two-column) → latest writing (tag chips) → now/open strip → footer
- [ ] CSS custom property tokens in `global.css` — exact set from the mockup:
      `--bg --surface --border --border-hover --text --muted --accent
      --accent2 --chip --header-bg --glow --shadow` (dark default + light
      theme via prefers-color-scheme)
- [ ] Home components in `src/components/home/`: `Hero.astro`, `Signals.astro`,
      `ProjectCard.astro`, `Achievements.astro`, `About.astro`,
      `WritingPreview.astro`, `NowStrip.astro`
- [ ] `Header.astro` — sticky nav, scrollspy, resume button visible on mobile
- [ ] `Footer.astro` — "Shubham." + location/last-updated line + links
- [ ] Responsive: 375px and 1440px

## Out of scope
- No other pages yet
- No real blog data — use hardcoded placeholder posts (use content from `docs/references.md` — the 3 blog post titles defined there)
- No real project data from CMS — hardcode from `CLAUDE.md` projects list
- No Notion API
- No JSON-LD yet

---

## References
- Chosen variation spec: in the mockup file Shubham selected — re-read it
- Visual references: `docs/references.md`
- Architecture: `docs/architecture.md`

---

## Design process — two passes (from frontend-design skill)

**Pass 1 — plan before coding:**
Write a `<!-- DESIGN PLAN -->` comment at the top of `index.astro`:
- Color tokens (name + hex for each)
- Typography choices
- Layout concept (ASCII wireframe)
- What makes this variation distinct — one sentence
- What AI-generated defaults you are actively avoiding

**Pass 2 — build, then self-critique:**
After building, run `design-critique` skill mentally:
- Does the layout reflect the chosen variation's personality?
- Is the copy human? Run `humanizer` skill check on all text.
- Does anything look like a generic AI portfolio? Fix it.
Write findings as `<!-- SELF-CRITIQUE -->` at bottom of `index.astro`.

---

## Technical notes
- Token system: all values via CSS custom properties — no hardcoded hex anywhere in components
- Hover states: border lightens OR `translateY(-2px)` — pick one, not both
- Page load animation: one fade-in on hero only, max `0.4s ease-out`
- Blog preview section: hardcode exactly 3 posts — title, date, excerpt
- Project preview: hardcode all 3 projects (Merix, Platewise, Yourtomo)
- `<h1>`: one per page, the name or identity statement
- All project/blog items: wrapped in `<article>` or `<li>` — no div soup

---

## Ask Shubham if
- [x] Accent color — locked: amber #e0aa3e (dark) / #a4711b (light), steel-blue
      #5a7a9a secondary
- [x] Profile photo — placeholder in hero + about; real photo needed before
      launch (see ADR-001a)
- [x] Codeforces rating — 1847 placeholder; live value via Codolio/CF API
      at build time (ADR-006)
- [ ] Preferred domain to hardcode in any absolute URLs
- [ ] Real email address for mailto links (mockup uses shubham@example.com)
- [ ] 3 real achievements for the Achievements section

---

## Done when
- [ ] `astro build` passes
- [ ] Home page renders correctly at 375px and 1440px
- [ ] No hardcoded hex colors — all via CSS custom properties
- [ ] `prefers-reduced-motion` block present
- [ ] No Google Fonts network requests
- [ ] No console errors
- [ ] Design plan comment at top of `index.astro`
- [ ] Self-critique comment at bottom of `index.astro`
- [ ] Branch `feat/home` pushed

---

## Notes for next task
<!-- Fill in after completing -->
- Tokens defined (list them):
- Components created:
- Anything Header/Footer needs in task 03:
