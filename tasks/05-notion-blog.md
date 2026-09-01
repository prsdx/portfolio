# Task 05 — Notion API Blog Integration

## Session start checklist
```bash
cat CLAUDE.md
graphify query "how is the blog content collection currently structured"
graphify query "what environment variables are used"
find /mnt/skills -name "SKILL.md" | sort
git checkout -b feat/notion-blog
```

---

## Context
- Tasks 01–04 complete. Blog currently uses static MDX files.
- Goal: replace static MDX with Notion as the writing interface.
- Writing flow after this task: write in Notion → toggle Published → GitHub Action → Vercel rebuild → post live.
- Reference: `docs/architecture.md` (content section)

---

## Goal
Wire Notion API → `notion-to-md` → MDX generation → Astro content collection.
Writing experience: Notion (fast, rich). Reading experience: own domain (Arpit-style).

---

## Scope
- [ ] Notion database schema (document what columns Shubham needs to create)
- [ ] `scripts/fetch-notion.ts` — fetches published pages, converts to MDX, writes to `src/content/blog/`
- [ ] `.env` variables documented in `.env.example`
- [ ] GitHub Action: `.github/workflows/fetch-content.yml` — runs on push to main, fetches Notion content, commits if changed
- [ ] Vercel webhook trigger after content commit (document setup steps for Shubham)

## Out of scope
- No Notion for projects (MDX files stay for projects — less frequent updates)
- No real-time sync — build-time fetch only
- No Notion as a CMS dashboard UI

---

## Notion database schema
Tell Shubham to create a Notion database with these exact properties:
```
Title        Text (primary)
Slug         Text — URL slug e.g. "how-i-built-platewise"
Excerpt      Text — one sentence summary
Tags         Multi-select
Published    Checkbox — toggle this to publish
Date         Date — publish date
```

---

## `scripts/fetch-notion.ts`
```typescript
// Uses: @notionhq/client + notion-to-md
// Steps:
// 1. Query database for pages where Published = true
// 2. For each page: convert blocks to markdown via NotionToMarkdown
// 3. Write MDX file to src/content/blog/[slug].mdx with frontmatter
// 4. Log: X new, Y updated, Z unchanged
```

Install:
```bash
npm install @notionhq/client notion-to-md
```

Required env vars:
```
NOTION_TOKEN=         # Notion integration secret
NOTION_DATABASE_ID=   # the blog database ID
```

---

## `.env.example`
```
NOTION_TOKEN=your_notion_integration_secret
NOTION_DATABASE_ID=your_database_id
```
Never commit `.env`. Add to `.gitignore`.

---

## GitHub Action
```yaml
# .github/workflows/fetch-content.yml
name: Fetch Notion Content
on:
  push:
    branches: [main]
  schedule:
    - cron: '0 */6 * * *'   # every 6 hours
  workflow_dispatch:          # manual trigger

jobs:
  fetch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx tsx scripts/fetch-notion.ts
        env:
          NOTION_TOKEN: ${{ secrets.NOTION_TOKEN }}
          NOTION_DATABASE_ID: ${{ secrets.NOTION_DATABASE_ID }}
      - uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "content: sync from Notion"
```

---

## Ask Shubham if
- [ ] **STOP HERE** before writing any code — Shubham needs to:
  1. Create the Notion integration at https://www.notion.so/my-integrations
  2. Create the blog database in Notion with the schema above
  3. Share the database with the integration
  4. Provide `NOTION_TOKEN` and `NOTION_DATABASE_ID`
  5. Add both as GitHub Secrets (Settings → Secrets → Actions)
- [ ] Confirm: should draft posts (Published = false) be skipped entirely or staged locally?

---

## Done when
- [ ] `npx tsx scripts/fetch-notion.ts` runs locally and generates MDX files
- [ ] Generated MDX files match content collection schema from task 03
- [ ] Existing placeholder MDX posts not broken
- [ ] GitHub Action runs successfully on push
- [ ] `.env` is in `.gitignore`
- [ ] `.env.example` is committed
- [ ] Branch `feat/notion-blog` pushed

---

## Notes for next task
<!-- Fill in after completing -->
- Notion database ID:
- Any quirks in the Notion → MDX conversion:
