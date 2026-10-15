# Cutover — receipt

Slice `S10-cutover`, October 15, 2026. Governed by `docs/build/ROUTE-INVENTORY.md` sections 3 and 4.

## What moved

| Was | Now |
|---|---|
| `/home-page-new` | `/` |
| `/resolve-new`, `/document`, `/others` | `/resolve`, `/resolve/document`, `/resolve/others` |
| `/resolve-new/people` | `/me/people` (the flow document's route) |
| `/resolve-new/r/[token]` | `/r/[token]` |
| `/map-new`, `/[stage]` | `/map`, `/map/[stage]` |
| `/guidebook-new`, `/[chapter]` | `/guidebook`, `/guidebook/[chapter]` |
| `/leaders-new`, `/[slug]` | `/leaders`, `/leaders/[slug]` |
| `/work-with-us-new`, `/inquire` | `/work-with-us`, `/work-with-us/inquire` |
| `/assessment-new` (+ `/predict`, `/answer`, `/results`) | `/assessment` (+ the same) |
| `/churches-new`, `/nonprofits-new`, `/institutions-new` | `/churches`, `/nonprofits`, `/institutions` |
| `/about-new`, `/story-new` | `/about`, `/story` |

Every old `-new` path redirects (308) to its new URL. `/document` has no `[id]` yet (there is no server-side Resolution); the flow document's `/resolve/document/[id]` waits for the back end.

## What was archived (kept, not routed)

- `src/app/page.tsx` (the four-stage `HomeV4Content` home) → `_archive/pre-cutover-2026-10/app-root/page.tsx`
- `src/app/about/page.tsx` (`AboutPageView`, unreachable before because `/about` redirected) → `_archive/pre-cutover-2026-10/app-about/page.tsx`

The components they render (`src/v2/...`) are untouched. `/about/[slug]` founder profiles stay live.

## Redirects (`next.config.ts`)

- **Added, first in the list:** the `-new` paths above; `/agent` → `/`; `/agent/about` → `/about`; `/agent/churches|nonprofits|institutions` → the new audience pages; `/agent/assessment`, `/agent/invite` → `/assessment`; `/agent/path/safety` → `/map/decide`; `/voices` → `/leaders`; `/voices/:slug` → `/leaders/:slug` (the three voice slugs exist as leader profiles).
- **Removed** (they pointed the new URLs at old pages): `/work-with-us`, `/work-with-us/:slug*`, `/about`, `/churches`, `/nonprofits`, `/institutions`.
- **Repointed (40):** `/movement-leaders*`, `/movement-voices`, `/scenius`, `/agent/movement-voices` → `/leaders`; `/pricing`, `/organizations*`, `/who-its-for` → `/work-with-us`; `/contact`, `/inquiry`, `/apply` → `/work-with-us/inquire`; `/case-studies` → `/work-with-us#practice`; `/evidence` → `/sources`; `/pathway*` and `/path*` → `/map` and the matching stage (safety and foundations → decide; sandbox and lab → gather; skills, training and fluency → practice; solutions, tech and build → build).
- **To `/` instead of `/agent` (21):** every other old redirect that went to the agent-room home, so nothing takes two hops.

## Indexing

`src/app/(new)/layout.tsx` now uses `previewRobotsMetadata()`, the same switch as every other surface: indexed when `NEXT_PUBLIC_SITE_LAUNCH_READY=1`, `noindex` until then. `src/app/sitemap.ts` lists the new pages, the five stages, written guidebook chapters and all leader profiles, and drops `/agent/*`, `/assess`, `/enroll` and `/voices`.

## Deliberately not changed

- `/assess` and `/api/assess` (old assessment data), `/enroll` (enrollment records), `/program` (templates): still live, no longer linked from the new pages. Retire after their data is checked.
- `/field-guide` and its redirects (`/field-guides*`, `/book*`, `/toolkit*`): kept until the guidebook has its chapters; the old field guides and their PDFs are the only full method text today.
- `/agent/how-we-use-ai` (with `/how-we-use-ai` redirecting to it), `/agent/*/deck`, articles, research, sources, footnotes, legal, auth, dashboard, newsletter, AI Reality shares: unchanged.
- The agent room's own shell (`proxy.ts` still marks `/agent/*` as the room).

## Verified

`pnpm typecheck`, ESLint on the changed areas, `pnpm link:check` pass. Under `next dev` (a production build cannot fetch Google Fonts from the build sandbox; Vercel can): 30 pages return 200, 29 redirects land where listed, the home page at `/` is the new page, a bad share token returns 404, the Resolution and Reality Assessment walkthroughs pass at 1,440px and 390px with no horizontal scroll.

## Still to do

1. Set `NEXT_PUBLIC_SITE_LAUNCH_READY=1` in Vercel when you want the site indexed (it also hides the "build in progress" bar).
2. Lock down `/api/simplified/*` before the back end is relied on (inventory section 0).
3. Retire `/assess`, `/enroll`, `/program` pricing and `/field-guide` as their data and content are moved.
