# /guidebook-new — handoff and receipt

Slice `S04-guidebook-new`. Board: `source/Guidebook.dc.html` (index and one chapter).

## What was built

- `src/app/(new)/guidebook-new/page.tsx` (index) and `[chapter]/page.tsx` (written chapters only; others 404).
- `src/components/mv/guidebook/guidebook.ts` (parts, chapters, editions, the Policy example by edition) and `guidebook-views.tsx`.
- `?edition=nonprofit|church|school|network` picks the edition; Nonprofit is the default. The edition bar is links, so editions are shareable.
- `MV_ROUTES.guidebook` → `/guidebook-new` (home, Map, stage pages, Work, Resolve all link here now).

## Locked drift

The board's parts predate the five stages ("Part five · Decisions about technology", "Closing · Keeping it alive · Review, learn, revise, continue"). Built as "Part five · Build only what belongs" and "Part six · Review what changes", chapter titles unchanged.

## Fixture seam

| Surface | Real now | Stubbed | Arrives |
|---|---|---|---|
| Chapter 6, Policy | Written, verbatim from the board, in four editions | — | — |
| The other 16 chapters | Listed, not linked | Their text | As they are written (`WRITTEN` in `guidebook.ts`) |
| Download the edition as a PDF | — | Not shown | When an edition PDF exists |

## Deviations

- Added one line above the chapter list: "Chapters are published as they are written." Without it, unlinked chapters read as broken.
- Unwritten chapters in the side list and in previous/next render as muted text, not links.
- "Open the Map" goes to `/map-new/decide`, the stage Policy belongs to.

## Open question

1. The flow document's launch claim is that the guidebook is public and complete for at least the nonprofit and church editions. Sixteen chapters need writing; the old field guides (Safety, Sandbox) are the likely source.

## Gates

typecheck, lint, link:check pass; no color literals; `/guidebook-new` (two editions) and `/guidebook-new/policy` (two editions) return 200 with no horizontal scroll at 1,440px and 390px; `/guidebook-new/statement` returns 404.
