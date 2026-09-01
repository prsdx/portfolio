# Task 08 — Deploy

## Session start checklist
```bash
cat CLAUDE.md
graphify query "what environment variables are used across the project"
git checkout main
git status   # should be clean — all feature branches merged
```

---

## Context
- All tasks 01–07 complete and merged to main.
- This task: Vercel deployment + domain + GitHub secrets.

---

## Goal
Live site at Shubham's domain. GitHub pushes auto-deploy.

---

## Scope
- [ ] Verify all env vars documented in `.env.example`
- [ ] Add all secrets to GitHub Actions (NOTION_TOKEN, NOTION_DATABASE_ID)
- [ ] Add all env vars to Vercel project settings
- [ ] `astro.config.ts` — confirm `site` is set to real domain
- [ ] Vercel deployment via CLI or dashboard (document steps)
- [ ] Custom domain configured in Vercel
- [ ] Test full deploy: push to main → Notion sync → Vercel rebuild → live

## Out of scope
- No CI test suite yet
- No staging environment yet

---

## Ask Shubham — STOP before any of this
- [ ] Domain name confirmed and purchased
- [ ] Vercel account exists (vercel.com)
- [ ] GitHub repo created and code pushed to main
- [ ] All secrets ready to add (NOTION_TOKEN, NOTION_DATABASE_ID)

## Deploy steps (document as you go)
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Add custom domain in Vercel dashboard
# 5. Update DNS at your registrar (document nameservers or CNAME)
# 6. Wait for SSL provisioning (~5 min)
```

---

## Done when
- [ ] `https://[domain]` loads correctly
- [ ] `https://[domain]/blog` shows posts
- [ ] `https://[domain]/llms.txt` accessible
- [ ] `https://[domain]/api/me.json` returns JSON
- [ ] Push a new blog post to Notion → verify it appears on live site after Action runs
- [ ] Lighthouse on live URL: 95+ all categories

---

## Notes
<!-- Fill in after deploy -->
- Domain:
- Vercel project URL:
- Deploy time (git push → live):
