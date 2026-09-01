# Design References

Study these before any UI work. Understand structure and intent — do not copy.

---

## Primary references

### arpitbhayani.me
https://arpitbhayani.me
- Built with Astro 5. Blog posts are MDX files in a separate GitHub repo (`arpitbbhayani/articles`)
- `blogs.json` manifest + per-slug markdown → Astro dynamic routes → static HTML on own domain
- Clicking a blog post opens it on the same domain (not redirected). This is the target reading experience.
- Update flow: new `.md` in articles repo → GitHub webhook → Vercel rebuild → post live in ~60s

### grahammann.net
https://grahammann.net
- Single-column, editorial, long scroll. Writing is the feature.
- Nav: `Graham.` — period is intentional, a personality signal
- Hero: text left + portrait photo right
- Section subtitles are descriptive and warm, not just labels
- Category tags inline on blog/project items
- Footer: "Written & built in Lunenburg, Nova Scotia." — location as personality
- Theme color: `#2F5D7C` (muted steel blue, trustworthy)

### skysingh04.xyz
https://www.skysingh04.xyz
- Student/fresher level — closest to Shubham's current stage
- Stack: Next.js + TypeScript + Tailwind + shadcn/ui
- Open-source credentials and program participation (GSoC, LFX) front and center
- Dev.to for writing, linked from portfolio

### brittanychiang.com
https://brittanychiang.com
- Dark sidebar layout, sticky nav, projects front and center
- Most battle-tested student portfolio layout

### bentogrids.com
https://bentogrids.com
- Bento grid inspiration — modular card layouts, Apple-style
- Reference for home page card arrangements

---

## What Shubham likes (from conversation)
- Arpit's blog experience: posts open on the same domain
- Graham Mann's human editorial feel: warm, person-first, category tags
- Bento grid layout for information density
- Dark theme, clean, technical — not flashy or 3D
- CSS-only animations, readability always first
- "This person ships real things and writes clearly" — the feeling the site should create

## What to avoid
- Typewriter effects on name/title
- Particle backgrounds, floating blobs, parallax
- Centered hero text
- Skill bars
- Generic SaaS landing page aesthetic
- Any of the AI-generated design defaults listed in the frontend-design skill
