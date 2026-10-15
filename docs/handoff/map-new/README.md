# /map-new — handoff and receipt

Slice `S03-map-new`. Boards redrawn for five stages on October 15, 2026 and committed under `source/`: `Map.dc.html` (the public Map) and `Map-Stage.dc.html` (the stage template; its stage switch becomes five routes).

## What was built

- `src/app/(new)/map-new/page.tsx` and `src/app/(new)/map-new/[stage]/page.tsx` (`decide`, `gather`, `practice`, `build`, `review`; statically generated, unknown stages 404).
- `src/components/mv/map/` — `stages.ts` (stage copy and the sample artifacts, verbatim), `map-page.tsx`, `stage-page.tsx`.
- `src/app/(new)/mv.css` — a Map section (trailhead grid, stage rows, figures, stage nav, tables, review layout).
- `MV_ROUTES.map` now points to `/map-new`, so the home page's "Explore the complete Map" lands here. `mapStageHref(slug)` builds stage links.

## Fixture seam

| Surface | Real now | Stubbed | Arrives |
|---|---|---|---|
| All copy and stage content | Yes | — | — |
| Riverbend's charter, context, course, decisions, tools and review | Board samples, labeled "sample" | All of it | Never live on public pages |
| Begin your organization's response | Goes to Your people (`/resolve-new/people`), where inviting people is the first move | The begin screen (R3-Respond) and an organization space | Back-end merge |
| For churches / nonprofits / institutions | Go to `/field-guide` | Audience pages | S08 (`TODO(S08-audience-new)`) |
| Guidebook links | `/field-guide` | — | S04 |
| Work with Movemental | `/home-page-new#work` | — | S06 |

## Deviations from the boards

- The stage switch is five real routes instead of in-page state.
- "Before this · the trailhead" goes to the Map page's trailhead section (the board linked R3-Team, which isn't built). Stage 5's "Then · Back to the charter" is a link to stage 1.
- Responsive sizes and columns live in `mv.css` classes, so phones get the single-column layouts the boards specify.

## Gates

- `pnpm typecheck`, ESLint on `src/components/mv/**` and `src/app/(new)/**`, `pnpm link:check`: pass.
- No color literals in `.tsx`.
- `/map-new` and all five stage routes return 200 with no horizontal scroll at 1,440px and 390px; no page errors. `/home-page-new` rechecked.
