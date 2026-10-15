# movemental.ai route inventory and disposition

> **Status, October 15, 2026:** the cutover (S10) is done. Sections 3 and 4 are applied: the Paper pages hold their final URLs, the colliding redirects are removed or repointed, `/agent`, `/agent/about`, the old audience pages, `/agent/assessment`, `/agent/invite`, `/agent/path/safety` and `/voices` redirect to the new pages. Still open: section 0 (the API), and the deferred items in the cutover receipt.

*From the repository, October 15, 2026 (branch `slice/S07-assessment-new`). Every `page.tsx`, every API group and every redirect in `next.config.ts`. Reconciled with the external audit of the live site.*

**Rules this follows.** Preserve content, not positioning. Keep durable URLs (articles, research, profiles). Archive means out of navigation and noindex, code kept, never deleted in the same step. Anything holding customer records, tokens already sent by email, or payments is **Protected**: no redesign or redirect until its data and users are checked. One methodology is authoritative: Resolve and Respond, the five-stage Map.

**Key.** Keep · Restyle (Paper) · Replace (a `-new` page takes the URL at cutover) · Merge (content moves, URL redirects) · Archive · Protected.

## 0. Fix before anything else

**Security: `/api/simplified/*` (228 route files) has no authentication.** None of the 228 route handlers checks a session, `proxy.ts` refreshes cookies but blocks nothing, and the services use Drizzle over `DATABASE_URL`, which bypasses Row Level Security. If these routes are deployed, anyone who knows a path can list, create and update rows (for example `GET /api/simplified/organization-inquiries` returns every inquiry). Lock them behind an admin session or a server-only key, or delete the ones nothing calls. This was not probed against production.

## 1. Public pages

| Route | What it is now | Decision | Restyle | Notes and cutover destination |
|---|---|---|---|---|
| `/` | `HomeV4Content`, the four-stage Safety → Sandbox → Training → Tech home | Replace | Yes | `/home-page-new` takes `/` |
| `/agent` | The same `HomeV4Content` inside the agent-room shell, a duplicate home | Merge | — | Redirect to `/`. The audit was right about this one. |
| `/agent/churches`, `/agent/nonprofits`, `/agent/institutions` | `AudienceEditionView`: old safety-first audience pages, $1,000 sprint | Replace | Yes | S08 builds `/churches`, `/nonprofits`, `/institutions`; these redirect there. Keep their audience concerns as source material. |
| `/agent/churches/deck`, `/nonprofits/deck`, `/institutions/deck` | Interactive platform decks | Archive | — | Out of navigation, noindex. Mine the slides for the "what we could build" sections and private proposals. |
| `/agent/path/safety` | Safety stage content: the five-part charter | Merge | — | Into `/guidebook` (Part two, the charter) and `/map/decide`, then redirect |
| `/agent/about` | About experience (agent room). `/about` redirects here | Merge | Yes | Into `/about` on Paper (S09). Its fragmentation, origins and refusals are the strongest source for the story. |
| `/about` | `AboutPageView`, unreachable today because `next.config.ts` redirects `/about` → `/agent/about` | Replace | Yes | `/about-new` takes it in S09; remove that redirect at cutover |
| `/about/[slug]` | Founder profiles (Josh, Alan, Brad) | Keep | Light | Update product descriptions; verify claims |
| `/agent/how-we-use-ai`, `/how-we-use-ai` | Movemental's own AI practice; `/how-we-use-ai` redirects to the agent-room copy | Keep | Yes | One Paper page at `/how-we-use-ai`; update old-model references, keep the refusals |
| `/agent/movement-voices`, `/movement-voices`, `/scenius` | Redirect chain to `/voices` | Merge | — | Point all of them at `/leaders` |
| `/voices`, `/voices/[slug]` | "Trusted voices" hub and three editorial profiles (Liz Rios, JR Woodward, Rowland Smith in `src/lib/committed-voices.ts`) | Replace | — | `/leaders` and `/leaders/[slug]`; redirect slug to slug. **Bring those three 2–3 paragraph bios into the S05 profiles**: they are the only curated bios besides Brian Sanders. |
| `/assess` | `RealityMapFlow`, the six-question four-stage assessment, with `/api/assess` | Replace (protect data) | — | `/assessment` takes over. Keep stored responses; redirect only after the data is checked. |
| `/agent/assessment`, `/agent/invite`, `/dashboard/ai-reality` | Already redirect to `/assess` | Merge | — | Repoint to `/assessment` |
| `/share/ai-reality/[token]`, `/team-invite/[token]` | Shared AI Reality results and team invitations, tokens already sent | Protected | Later | Must keep resolving. Fold into the new assessment once its back end exists. |
| `/field-guide` | Old Safety and Sandbox field guides with PDF downloads | Merge | — | Into `/guidebook` as chapters are written; keep the PDFs and their redirects |
| `/enroll` | Safety Sprint enrollment form | Archive (protect records) | — | Off navigation. Redirect to `/work-with-us` once enrollments and payments are confirmed preserved. The new pages already point "Discuss" at the inquiry form. |
| `/program`, `/program/[category]/[templateId]` | Program and pricing; program templates behind sign-in | Archive (pricing) · Protected (templates) | — | No prices on the site. Check whether clients use the templates before touching them. |
| `/articles`, `/articles/[slug]` | Articles hub and reader | Keep | Later | Durable URLs. Restyle after launch; consider one Writing and research index. |
| `/research`, `/research/[slug]`, `/research/findings` | Research library, papers, findings | Keep | Later | Durable URLs. Audit each paper's claims and wording ("peer-reviewed" only where true). |
| `/sources`, `/research/sources` | The same sources view at two URLs | Keep one | Later | `/sources` canonical; redirect `/research/sources` |
| `/footnotes` | Claims and sources registry | Merge | Later | Into `/sources` (the flow document's plan); redirect, keeping anchors |
| `/style-finder` | Style wizard for leader platforms | Keep | — | Leader tool, not public navigation |
| `/privacy`, `/terms`, `/cookies` | Legal pages (Ink Band) | Keep | Light | Update for the Resolution's data practices, invitations, sharing and counts; legal review |
| `/newsletter/confirm`, `/confirmed`, `/unsubscribe`, `/unsubscribed` | Newsletter confirmation flow | Protected | Minimal | Links live in sent emails |

## 2. Signed-in and staff surfaces (all Protected)

`/login`, `/signup`, `/forgot-password`, `/auth/update-password`, `/welcome` (auth) · `/dashboard`, `/dashboard/safety`, `/dashboard/onboarding/[step]`, `/dashboard/onboarding/leader/[step]` (client and leader workspaces) · `/agent-runtime` (staff agent admin, Studio) · `/admin/onbuilding` (admin composition editor; confirm it requires an admin session).

Keep them working; update copy that says "agent room" or describes the old stages. The Safety dashboard's documents become part of the organization's Map later.

## 3. The new pages (`src/app/(new)/`)

| Now | Takes at cutover |
|---|---|
| `/home-page-new` | `/` |
| `/resolve-new`, `/document`, `/people`, `/others`, `/r/[token]` | `/resolve`, `/resolve/document/[id]`, `/me/people`, `/resolve/others`, `/r/[token]` |
| `/map-new`, `/map-new/[stage]` | `/map`, `/map/[stage]` |
| `/guidebook-new`, `/guidebook-new/[chapter]` | `/guidebook`, `/guidebook/[chapter]` |
| `/leaders-new`, `/leaders-new/[slug]` | `/leaders`, `/leaders/[slug]` |
| `/work-with-us-new`, `/work-with-us-new/inquire` | `/work-with-us`, `/work-with-us/inquire` |
| `/assessment-new` (+ `/predict`, `/answer`, `/results`) | `/assessment` (+ the same) |
| S08 audience pages, S09 About | `/churches`, `/nonprofits`, `/institutions`, `/about`, `/story` |

## 4. Redirects that collide with the new URLs

Today `next.config.ts` sends these to old pages. Each must be removed or repointed **in the cutover slice**, not before:

| Source | Goes to today | At cutover |
|---|---|---|
| `/work-with-us`, `/work-with-us/:slug*` | `/agent` | Remove (the new page) |
| `/about` | `/agent/about` | Remove |
| `/churches`, `/nonprofits`, `/institutions` | `/agent/...` | Remove |
| `/movement-leaders`, `/movement-leaders/:path*` | `/agent` | `/leaders` |
| `/pricing`, `/organizations`, `/who-its-for` | `/enroll` | `/work-with-us` |
| `/contact`, `/inquiry`, `/apply` | `/agent` | `/work-with-us/inquire` |
| `/case-studies`, `/evidence` | `/agent` | `/work-with-us#practice`, `/sources` |
| `/pathway`, `/pathway/*`, `/path/*`, `/training/*`, `/skills` | `/field-guide` or `/agent` | `/map` and `/map/[stage]` (safety → decide, sandbox → gather, skills/training → practice, solutions/tech/build → build) |
| `/field-guides/*`, `/book/*`, `/toolkit/*` | `/field-guide` | `/guidebook` |
| `/agent/movement-voices`, `/movement-voices`, `/scenius` | `/voices` | `/leaders` |
| `/manifesto`, `/vision`, `/how-it-works/*`, `/fragmentation/*`, `/faq`, `/services/*`, `/system-builds/*` | `/agent` | `/` or the nearest new page |

Already removed (S07): `/assessment-new`, `/churches-new`, `/nonprofits-new`, `/institutions-new` → old pages.

## 5. API groups

| Group | Files | Decision | Notes |
|---|---|---|---|
| `/api/simplified/*` | 228 | **Lock down now** | See section 0 |
| `/api/contact` | 1 | Keep | The new inquiry form posts here |
| `/api/assess` | 2 | Protected | Old assessment's data; migrate before retiring |
| `/api/ai-reality` | 3 | Protected | Shared results and team invitations |
| `/api/safety` | 9 | Protected | Enrollments and sign-up; check payment links |
| `/api/webhooks`, `/api/cron` | 4 | Protected | External callers |
| `/api/newsletter` | 3 | Protected | |
| `/api/onboarding`, `/api/leader` | 21 | Protected | Leader onboarding (Studio) |
| `/api/admin`, `/api/internal` | 12 | Protected | Confirm each requires an admin session |
| `/api/agent-room`, `/api/book`, `/api/program`, `/api/toolkit-download` | 12 | Keep while their pages live | Retire with their pages |

## 6. Where this differs from the external audit

- **`/agent`:** the audit said redirect it to `/`. The repo confirms `/agent` renders the same home as `/`, so yes. The agent-room components behind `/agent/about` and the leader experiences are a separate question from that index page.
- **The audit's page list was the live site;** this one is the code. It adds the unreachable `/about`, the duplicated sources pages, the three curated voice bios, the redirect collisions above, and the unprotected API.
- **"28 leaders":** the database has 26 active plus Jamie Roach and Natasha Nikkel, held back for now.
- **The audience pages:** agreed. Redesign them on the canvas with one shared section system, Institutions first, then migrate (S08).

## 7. Order

1. **Now:** lock down `/api/simplified/*`.
2. **Release 1 (in progress):** finish S08 and S09; bring the three curated bios into the leader profiles.
3. **Cutover slice:** move `-new` pages to their URLs, rewrite the redirects in section 4, flip indexing, redirect `/agent`, `/voices`, `/assess` (after data check), `/enroll` (after records check).
4. **After launch:** restyle articles, research, sources and legal on Paper; archive the decks; fold the Safety dashboard and AI Reality shares into the Map and the new assessment.
