# /home-page-new — handoff and receipt

Slice `S01-home-page-new`. Migrated from the Claude Design board "Home · v3 · revision prompt (Oct 15)" on the canvas "Movemental home hero".

## Package

| File | What it is |
|---|---|
| `source/Home-v3.dc.html` | The board source. Source of truth for copy, order and layout. |
| `spec/homepage-revision-prompt.md` | The revision prompt the board was built from. |
| `../../design/MV_DESIGN_CHARTER.md` | The design system this page established. |
| `../../build/prompts/canvas-to-react-new.md` | The governing prompt for every later `-new` page. |

## What was built

- `src/app/(new)/layout.tsx` — route group for every `-new` page: fonts, `.mv-surface`, noindex.
- `src/app/(new)/mv.css` — tokens and classes.
- `src/app/(new)/home-page-new/page.tsx` — the page.
- `src/components/mv/` — header, footer, route map, home sections, leader network, Resolution preview, network data.

## Sections, in order

Hero with leader network · Your organization is already responding · The human questions · Resolve with the live first theme · Agreement (illustrative team of nine) · Respond, five stages with artifacts · Work with Movemental · Built with people already doing the work · No one has to work this out alone · Movemental is a company · Closing band · Footer.

## Fixture seam

| Surface | Real now | Stubbed | Arrives |
|---|---|---|---|
| Leader network | Names, credentials, headshot paths from `movement_leaders`; ties from the board | Profile links go to `/voices` | S05 leaders-new |
| Resolve preview | Selections in component state | Nothing saved; the button goes to `#resolve` | S02 resolve-new |
| Agreement bars | Board sample, labeled "An illustrative team of nine." | All of it | Never live on the home page |
| Proof section | Domains verified in `v_tenant_hosts` | Screenshots are labeled placeholders | When approved screenshots exist |
| Discuss your organization's response | Links to `/enroll` | Inquiry form | S06 work-with-us-new |

## Gates

- `pnpm typecheck`: pass.
- ESLint on `src/components/mv/**` and `src/app/(new)/**`: clean.
- `pnpm link:check`: all internal hrefs resolve.
- No color literals in `.tsx`.
- `/home-page-new` returns 200 in dev; no horizontal scroll at 1,440px or 390px.

## Deviations from the board

- Leader names use database spellings: Debra Hirsch, Meghan Larissa Good.
- The network's name label now sits on a field-colored backing above the nodes, so headshots never cover it on phones.
- The wordmark is the repo's `MovementalLogo`, not the canvas upload.

## Open questions

1. Approved screenshots for alanhirsch.com, bradbrisco.org and drmichaelcooper.com.
2. Where "Discuss your organization's response" should land before the inquiry form exists. It currently goes to `/enroll`.
3. The three statistics are still marked for verification against their studies before cutover.
4. Headshots could not be checked from the build sandbox (no network to Supabase storage). They use the same public bucket as `/voices`.
