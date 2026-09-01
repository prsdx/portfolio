# Decisions

Architecture Decision Records. Add new entries at the top.

---

## ADR format
```
### ADR-XXX — Title
Date: YYYY-MM-DD
Status: decided | pending | superseded
Decision: what was chosen
Reason: why
```

---

### ADR-001 — Design variation
Date: 2026-09-01 (v1 decided) / 2026-09-01 (v3 revision — final)
Status: decided — FINAL, ready for build
Decision: "K2 v3 — Dashboard, Hired" (dark bento, converged from K + L +
skysingh04 + arpitbhayani + grahammann)

Final mockups (served via `python -m http.server 8080`):
- `variation-k2.html` — front page, recruiter-first. Section order:
  hero (headline + fact row + "Currently" line + download-resume button +
  photo placeholder 3:4) → SIGNALS strip (CF 1847 → codeforces.com/profile/prsdx,
  DSA 500+ aggregate → Codolio, GitHub 300+ → github.com/prsdx, 3 products
  shipped) → Selected work (3 cards, "case study →" full-width button per
  card, Merix → project-merix.html) → Achievements (3-slot list: place /
  event / year — placeholders, Shubham fills real ones) → About (two-column:
  photo left 150px, text right; stacks centered on mobile) → Latest writing
  (3 posts with category tag chips [AI/ML]/[Codeforces]/[Systems]) → Now/Open
  (full-width chip-bg strip, 10px pulse dot, "open to" block) → Footer
  ("Shubham." + "Built at IIITM Gwalior, India. Last updated Sep 2026." +
  github · x · codeforces · rss · email)
- `writing.html` — full post list with tag chips + honest "in draft" section
- `reading.html` — Bookshelf, Papershelf, Articles with status chips + notes
- `project-merix.html` — case-study template (skysingh pattern): problem →
  built → architecture → hard parts → honest status

Design system (locked):
- Dark default + light theme via prefers-color-scheme
- Amber primary accent: #e0aa3e dark / #a4711b light (kicker, pulse, active
  nav, resume button)
- Steel-blue secondary accent: #5a7a9a dark / #4a6a8a light (tag hover,
  case-study button hover, footer links)
- Geist Sans/Mono (self-hosted at build, jsdelivr in mockups)
- 1080px homepage / 760px content measure; single 768px breakpoint
- Motion budget: staggered .rv reveals (IntersectionObserver), scrollspy nav,
  one pulsing "now" dot, warm hero glow, hover border-lighten + translateY(-2px)
  on cards + soft shadow — all reduced-motion gated, noscript-safe
- Resume button stays visible on mobile (not in hamburger)

Options considered:
- A: Dark Bento Grid — dense, information-rich, dashboard feel
- B: Light Editorial — minimal, writing-forward, quiet
- C: Terminal — monospace, code-editor aesthetic, polarising
- D: The Ledger — sticky identity rail, numbered entries
- E: Human Editorial — warm, person-first, grahammann.net inspired
- Batch 2/3 refinements: F–J, K (bento alive), L (field notes), M (build log),
  N (poster grid)
Reason: HR-perspective review favored one-screen scannability (K's bento) plus
L's reading-as-first-class culture plus skysingh04's fresher structure
(role-typed hero, signals strip, case studies, resume button, explicit
"open to" line). v3 revision added grahammann's human warmth (photo weight,
footer personality, writing tags) and arpitbhayani's momentum signal
("Currently" line) after direct comparison with the three reference sites.
For a fresher with no experience, the signals strip + achievements + case
studies ARE the work-experience section.
Rejected alternatives: M's build-log timeline made recruiters hunt for
projects; N's poster typography was memorable but unscannable for HR in
10 seconds; E lacked the recruiter-focused density.

### ADR-001a — Content placeholders that must be real before launch
Status: pending — Shubham owns these
- Real portrait photo (replace "S" placeholder in hero + about)
- Real email address (currently shubham@example.com placeholder)
- 3 real achievement rows (hackathons/certs/milestones/club roles)
- resume.pdf file wired to both resume buttons
- Real repo/live URLs for all projects (all href="#" today)
- Codolio profile created; DSA cell linked to it
- First 3 real blog posts with naturally staggered dates

### ADR-002 — Blog content source
Date: 2026-09-01
Status: decided
Decision: Notion API → notion-to-md → MDX in /content/blog/
Reason: Fast writing experience (Notion editor) + on-domain reading (Arpit-style) + no external redirect

### ADR-003 — Framework
Date: 2026-09-01
Status: decided
Decision: Astro 5
Reason: Content-driven site, zero JS by default, best SEO, pulls from multiple sources at build time

### ADR-004 — Animations
Date: 2026-09-01
Status: decided
Decision: CSS-only. No Framer Motion, no GSAP.
Reason: Readability first. Every animation must reveal content, never delay it.

### ADR-005 — Font
Date: 2026-09-01
Status: decided
Decision: Geist (self-hosted)
Reason: No Google Fonts DNS lookup, clean and technical, used by Vercel ecosystem

### ADR-006 — Coding stats pipeline (Codolio)
Date: 2026-09-01
Status: decided
Decision: Daily GitHub Action fetches api.codolio.com/user (+TUF dsa-progress
+Codolio GitHub proxy) → writes public/coding-stats.json → site reads it at
build time. See docs/coding-stats.md for endpoints and response shape.
Reason: One Codolio token replaces per-platform hacks (LeetCode/GFG have no
official APIs); numbers are fresh and verifiable (CF/GitHub cells link to real
profiles) while the site stays static; graceful degradation — if the Action
fails, the last committed JSON persists and the site never breaks.
