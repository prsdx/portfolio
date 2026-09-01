# Coding Stats Pipeline (build phase)

Source article: https://dev.to/naman_2004/extracting-dsa-question-statistics-from-codolio-and-takeuforward-tuf-5g7o

Goal: the homepage SIGNALS strip (and future CP page) shows live, verifiable
numbers — DSA solved across platforms, GitHub activity — without runtime API
calls on the site.

## Endpoints

1. Codolio DSA stats (all platforms except TUF)
   - `GET https://api.codolio.com/user`
   - Header: `Authorization: Bearer <JWT>` (personal token from browser
     devtools: network tab → filter "user" → copy authorization header)
   - Response: `data.platformProfiles.platformProfiles[]` — per platform:
     `totalQuestionStats` with `easyQuestionCounts`, `mediumQuestionCounts`,
     `hardQuestionCounts`, `totalQuestionCounts`
   - CAVEAT: undocumented API, personal token, can expire or change.
2. TakeUForward progress (public, no auth)
   - `GET https://backend-go.takeuforward.org/api/v1/shared/profile/dsa-progress/{tuf_username}`
3. GitHub activity via Codolio proxy
   - `GET https://api.codolio.com/github/profile?userKey={codolio_profile}`
   - Returns commits, stars, PRs, total active days

## Pipeline (GitHub Action, daily)

- `aggregator.py`: fetch Codolio (token from `CODOLIO_TOKEN` secret) + TUF
  (`TUF_USERNAME` secret) + GitHub proxy (`CODOLIO_PROFILE` secret) → merge →
  write `public/coding-stats.json`:
  `{ codolio: {easy, medium, hard, total}, tuf: {...}, final: {...},
     github: {commits, stars, activeDays, ...} }`
- Workflow `.github/workflows/update-stats.yml`: cron `0 0 * * *` +
  `workflow_dispatch`; secrets in repo settings; commits JSON to repo.
- Dedupe rule: TUF stats overlap platforms already in Codolio — count TUF
  only for its exclusive sheet, per the article.

## Site consumption

- Astro reads `coding-stats.json` at build time → static numbers, zero
  runtime API calls.
- Graceful degradation: if the Action fails (token expired, API changed),
  the last committed JSON stays and the site is unaffected.
- Each stat renders with its fetch date (honest, not stale-looking).

## Where the numbers show

- Homepage SIGNALS strip: CF 1847 (also from official CF API as cross-check),
  DSA total (Codolio `final.total`), GitHub contributions, products shipped.
- CF + GitHub cells link to real profiles (codeforces.com/profile/prsdx,
  github.com/prsdx); DSA cell can link to the Codolio profile for the full
  per-platform breakdown.
