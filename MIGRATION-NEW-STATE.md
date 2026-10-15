# `-new` migration state

**Cut over October 15, 2026.** The `-new` routes now live at their final URLs; the old `-new` paths redirect. Route names in the table below are the pre-cutover names.

Governing prompt: [docs/build/prompts/canvas-to-react-new.md](docs/build/prompts/canvas-to-react-new.md). Design charter: [docs/design/MV_DESIGN_CHARTER.md](docs/design/MV_DESIGN_CHARTER.md).

## Pages

| Slice | Route | Board source | Status | Gates |
|---|---|---|---|---|
| S01 | `/home-page-new` | `docs/handoff/home-page-new/source/Home-v3.dc.html` | Done | typecheck, lint, link:check, no color literals, 200 at 1440 and 390 |
| S02 | `/resolve-new`, `/document`, `/people`, `/others`, `/r/[token]` | R3-Flow, R4-Result, R4-People, R3-Others, R3-Shared, R3-States | Done (front end only) | typecheck, lint, link:check, no color literals, walkthrough at 1440 and 390 with no horizontal scroll |
| S03 | `/map-new`, `/map-new/[stage]` | Map, Map-Stage (five stages, Oct 15) | Done | typecheck, lint, link:check, no color literals, 200 and no horizontal scroll at 1440 and 390 on all six routes |
| S04 | `/guidebook-new`, `/guidebook-new/[chapter]` | Guidebook | Done (1 of 17 chapters written) | typecheck, lint, link:check, no color literals, 200 and no horizontal scroll at 1440 and 390 |
| S05 | `/leaders-new`, `/leaders-new/[slug]` | Leaders, Leader-Profile | Done (26 profiles; 1 curated) | typecheck, lint, link:check, no color literals, 200 and no horizontal scroll at 1440 and 390 |
| S06 | `/work-with-us-new`, `/work-with-us-new/inquire` | Work, Work-Inquire | Done (form live via `/api/contact`) | typecheck, lint, link:check, no color literals, 200 and no horizontal scroll at 1440 and 390, mocked form submission |
| S07 | `/assessment-new` (+ `/predict`, `/answer`, `/results`) | Assessment | Done (front end only) | typecheck, lint, link:check, no color literals, walkthrough at 1440 and 390 |
| S08 | `/churches-new`, `/nonprofits-new`, `/institutions-new` | Audience-Institutions, -Churches, -Nonprofits (Oct 15) | Done | typecheck, lint, link:check, no color literals, 200 and no horizontal scroll at 1440 and 390 |
| S09 | `/about-new`, `/story-new` | LongForm (+ existing approved About copy) | Done | typecheck, lint, link:check, no color literals, 200 and no horizontal scroll at 1440 and 390 |
| S10 | Cutover: final URLs, redirects, indexing | — | Done (October 15, 2026) | typecheck, lint, link:check; every page 200 and every redirect checked under `next dev`; Resolve and Assessment walkthroughs at the new URLs. Receipt: `docs/handoff/cutover/README.md` |

## Check-and-branch outcomes (S01)

| Capability | Present? | Path taken |
|---|---|---|
| `/resolve-new` | Yes (S02) | `MV_ROUTES.resolve` repointed |
| `/map-new` | Yes (S03) | `MV_ROUTES.map` repointed; `respondBegin` goes to Your people until the back end (`TODO(back-end merge)`) |
| Leader profile route | Yes (S05) | `MV_ROUTES.leaders`, `leaderHref(slug)` |
| Inquiry form | Yes (S06) | `MV_ROUTES.discuss` → `/work-with-us-new/inquire` |
| Guidebook route | Yes (S04) | `MV_ROUTES.guidebook` → `/guidebook-new` |
| Assessment route | Yes (S07) | `MV_ROUTES.assessment` → `/assessment-new`. Legacy `-new` redirects removed from `next.config.ts` (see S07 receipt) |
| Proof screenshots | No | Labeled placeholders |

## Check-and-branch outcomes (S02)

| Capability | Present? | Path taken |
|---|---|---|
| Resolution storage or service | No (`src/lib/services`, `src/hooks` have none) | Device storage in `draft.ts`; tables requested in `docs/handoff/resolve-new/SCHEMA-REQUEST.md` |
| Email, sign-in link, invitations | No | Front-end states only; `TODO(back-end merge)` |
| Begin the response screen (R3-Respond) | No | Links go to `MV_ROUTES.respondBegin`; `TODO(S03)` |
| Movement-leader Resolutions | None published | Sections hidden (5.6) |

## Stop-and-report

None for S01.
