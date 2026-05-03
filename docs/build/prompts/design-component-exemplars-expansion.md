# Prompt: expand DESIGN.md + static exemplars for all marketing component types

Use this document when **docs/design/DESIGN.md** (and matching static exemplars under `templates/alan-hirsch/exemplars/`) need to grow into a complete **single source of truth** for every recurring UI pattern on the organizational site—not only homepage cards and feature splits.

## Preconditions

1. Read [docs/design/DESIGN.md](../../design/DESIGN.md) end-to-end (design chain §2, surfaces §3, primitives §7, UI shell §8, static recipes §14).
2. Read [docs/design/STATIC_HTML_AND_TEMPLATES.md](../../design/STATIC_HTML_AND_TEMPLATES.md) for how static HTML stays numerically aligned with `src/app/globals.css`.
3. Skim [docs/build/prompts/stitch-to-react-migration.md](./stitch-to-react-migration.md) §7 token remap table before proposing any new color.

## Goal

Produce **paired updates** for each component family below:

- **Charter** — Add or extend a subsection in `DESIGN.md` (usually §7 primitives, §12 patterns, or §14.3 recipe index) describing intent, allowed tokens, forbidden patterns, and when to use the pattern vs alternatives.
- **Static exemplar** — Add or extend a row in §14.3’s recipe table *and* ship a working preview under `templates/alan-hirsch/exemplars/exemplar-*.html` (or extend [exemplar-ui-components.html](../../../templates/alan-hirsch/exemplars/exemplar-ui-components.html)) using **only** `site-theme.css` / `prototype-pages.css` classes—no raw hex, no non-semantic Tailwind in static files.
- **React implementation** — When the pattern is stable, add a primitive under `src/components/primitives/` or a composed block under `src/components/sections/`, export from `primitives/index.ts` where appropriate, and migrate at least one live route to prove the API.

## Already implemented in React (document + mirror in static if missing)

These ship in `src/components/primitives/` and are summarized in **DESIGN.md §7 / §12 / §14.3**. **Close the loop** in static HTML exemplars when a recipe is still marked TBD in §14.3.

| Pattern | React | Docs gap to close |
| ------- | ----- | ----------------- |
| Editorial marketing card (ghost lift + ambient shadow on section bands) | `SurfaceCard` | Ensure §12 “Cards” references `SurfaceCard` tones; add static `.card` parity notes if needed. |
| Hero-split / feature rail | `FeatureSplit` | Confirm `exemplar-landing-general.html` / `site-theme.css` `.hero-split` narrative matches `FeatureSplit` breakpoints. |
| Icon-forward value / pillar grid | Homepage sections | Promote to a named recipe in §14.3 (e.g. `ValuesIconGrid`) and optionally a tiny primitive if reused ≥3 routes. |
| KPI / stats strip | `StatStrip`, `StatItem` | Add numeric exemplar block to `exemplar-ui-components.html` (or dedicated page). |
| Editorial comparison table | `EditorialComparisonTable` | Add `exemplar-comparison-table.html` mirroring tonal thead/tbody rules. |
| Logo strip | `LogoStrip` | Add `exemplar-logo-strip.html` (image + fallback pill rows). |
| Media video shell | `MediaVideo` | Add `exemplar-media-video.html` (iframe + caption + transcript link). |
| In-page TOC | `InPageToc` | Add `exemplar-inpage-toc.html` (sticky pill nav). |
| Vertical timeline | `Timeline`, `TimelineItem` | Add `exemplar-timeline.html`. |
| Pull quote | `PullQuote` | Cross-link §14.2 `.pull-quote` class recipe with React API. |
| Testimonial rail | `TestimonialRail`, `TestimonialSlide` | Add `exemplar-testimonials.html` (scroll-snap, no auto-advance). |

## UI families still needing SSoT treatment

For **each** row, the agent should: (1) name the pattern, (2) specify primary user story, (3) list building blocks from existing tokens/primitives, (4) note **one** static exemplar file to create or extend, (5) list acceptance checks (a11y, reduced motion, no-line rule, no new shadow types).

### Navigation & wayfinding

- **Mega-row / deep IA** — Second-tier links under a primary nav category; keyboard traps and `aria-expanded` contract. Exemplar: extend `exemplar-top-nav-header.html`.
- **In-page chapter nav** — Sticky sub-nav for long pages (methodology, evidence). Exemplar: new `exemplar-inpage-toc.html`.
- **Breadcrumb + meta row** — Article / legal / case study header band. Exemplar: `exemplar-article-detail.html` or new thin exemplar.

### Data-dense marketing (still editorial)

- **Comparison table** — Feature matrix (Movemental vs generic stack); must use tonal rows, not zebra borders. New exemplar `exemplar-comparison-table.html`.
- **KPI / stats strip** — Large numerals + caption; no chart junk. Extend landing exemplar or `exemplar-ui-components.html`.
- **Timeline / roadmap** — Vertical rhythm with primary accent nodes; respect reduced motion for any draw animation. New `exemplar-timeline.html`.

### Media & proof

- **Logo strip** — Partner / publisher strip with consistent height, `muted` placeholders, optional marquee **only** if motion respects `prefers-reduced-motion`. New `exemplar-logo-strip.html`.
- **Video embed shell** — 16:9 container, caption, optional transcript link; no autoplay with sound. New `exemplar-media-video.html` (may pair with existing card rails).
- **Screenshot / device frame** — Product storytelling without fake UI chrome colors; uses `shadow-ambient` only if the frame floats. Section composition in `sections/`.

### Forms & conversion

- **Lead capture (short)** — Email + consent microcopy on `bg-section` with field `border-border`. Wire to existing `Input` / `Button` §12.
- **Multi-step evaluate flow** — Progress indicator, step validation, error summary region. New exemplar + eventual route under `(site)/evaluate` parity.

### Social & quotes

- **Testimonial carousel** — Prefer CSS scroll-snap over JS where possible; reduced-motion = no auto-advance. New `exemplar-testimonials.html`.
- **Pull-quote wall** — Multiple L2b pull quotes; spacing between quotes. Cross-link §14.2 classes.

### Overlays & disclosure

- **Modal / dialog marketing use** — When a dialog is allowed on marketing (rare): focus trap, title, `role="dialog"`. shadcn `Dialog` + DESIGN notes.
- **Disclosure stack** — FAQ beyond one-off; accordion tokens, no border-between-sections violation for **outer** bands (inner `border-border` on `details` is the form exception per §3.1).

### System / internal

- **`/system` preview grid** — Living registry of primitives + installed shadcn components on real tokens; keeps marketing and product controls visually aligned.

## Execution instructions (for the agent running this prompt)

1. Pick **one** family from “still needing SSoT” (highest site traffic or highest reuse first).
2. Draft the `DESIGN.md` subsection (5–15 sentences + a small table if useful).
3. Build the static exemplar; run existing validation scripts if HTML structure changes (`sync-docs-html-nav.py`, etc., only if touched).
4. Implement or extend the React primitive/section; migrate one page.
5. Open a single PR with: `DESIGN.md`, static assets, TSX, and a one-line cross-link in [docs/design/README.md](../../design/README.md) if the doc map changes.

## Explicit non-goals

- No new global gradients beyond `--gradient-primary` (DESIGN §3.2).
- No `dark` mode on `<html>`; no raw black/white hex in TSX.
- No decorative section borders; no arbitrary box-shadows beyond `shadow-ambient`.

When this list is exhausted, retire or shrink this prompt file so `DESIGN.md` §14.3 remains the authoritative index.
