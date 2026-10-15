# Brand and navigation (S13)

**Source of truth:** the "Brand and navigation" page of the Movemental canvas
(https://claude.ai/artifact/B9fXMaQiYTWj6MdZkknNYf), committed here under `source/`:
`Brand-Logo`, `Brand-Navbar`, `Brand-Navbar-Phone`, `Brand-Navbar-Phone-Open`.

## Decisions (Josh, October 15, 2026: "follow your own recommendations")

| Question | Decision |
|---|---|
| Logo direction | **B, the signet** (rosette mark + Instrument Serif wordmark) in the navbar and task headers. **C, the flourish** (italic wordmark, the line runs out under the name) in the footer. A, heritage, not used. |
| "Work with us" in the main nav | Not added. It stays in the footer and the page CTAs. Open for a later call. |
| Favicon | The 12-loop rosette, white on an ink tile: `src/app/icon.svg`, `src/app/favicon.ico`. |

## What was built

| File | What |
|---|---|
| `src/components/mv/brand/rosette-mark.ts`, `rosette-display.ts` | Generated rosette geometry (one hypotrochoid line). Regenerate with `python3 scripts/brand/rosette.py`. |
| `src/components/mv/brand/mark.tsx` | `Rosette` (16 loops; 12 below 20 px) and `MvSignet`. |
| `src/components/mv/brand/flourish.tsx` | `MvFlourish`. Draws on the first time it scrolls into view; drawn without JS or with reduced motion. |
| `src/components/mv/mv-header.tsx` | Client. Sticky; 84 → 64 px and frosted on scroll; pen-stroke underline on hover and the current section; The Map panel (Escape and outside click close, focus returns); full-screen menu below 900 px (body locked, focus to Close, Escape returns focus). |
| `src/components/mv/mv-footer.tsx` | Flourish lockup, links, rule, "Movemental, LLC". |
| `src/components/mv/mv-task-header.tsx` | Signet at 24. |
| `src/app/(new)/mv.css` | "Brand" and "Header (the navbar)" sections replace the old header and footer block. |

The old raster `MovementalLogo` (`src/components/brand/`) is untouched and still used by the Ink Band surfaces.

## Checks

typecheck, eslint (mv and (new)), link:check (37 hrefs), no color literals in `.tsx`. Dev server: 23 Paper pages 200; at 1440 the bar, scrolled state and Map panel match the board; at 390 no horizontal scroll, menu opens, focus moves to Close and back to Open menu on Escape.

## Deviations from the board

- The board's live bar shows "Work with us"; built without it (decision above).
- Stroke weight of the flourish rosette scales with its rendered width, so it holds at footer size.
