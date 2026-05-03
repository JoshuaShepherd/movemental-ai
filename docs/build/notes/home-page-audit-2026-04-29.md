# Home page expanded migration — audit notes (2026-04-29)

> Companion to [`docs/build/prompts/home-page-mock-to-react-full-migration.md`](../prompts/home-page-mock-to-react-full-migration.md).
> Source: [`docs/html/mock-home.html`](../../html/mock-home.html). Target: `/`.

## What shipped

Ten Server Component sections under [`src/components/sections-mock/home/`](../../../src/components/sections-mock/home/), composed in document order by [`home-content.tsx`](../../../src/components/sections-mock/home/home-content.tsx):

| # | Section | File | Band |
| --: | --- | --- | --- |
| 1 | Hero (path-stacked headline) | `hero-fold.tsx` | `band-midnight hero hero--fold hero--path` |
| 2 | Audience cards (3) | `audience-fold.tsx` | `band-default audience-section` |
| 3 | Movemental AI Path (4 steps) | `path-fold.tsx` | `band-section path-section` |
| 4 | Why this matters (3 blocks) | `matters-fold.tsx` | `band-default matters-section` |
| 5 | What you build (6 items) | `build-fold.tsx` | `band-section build-section` |
| 6 | Difference (4 blocks) | `difference-fold.tsx` | `band-default difference-section` |
| 7 | Proof (3 pillars) | `proof-fold.tsx` | `band-section proof-section` |
| 8 | Final CTA | `final-cta.tsx` | `band-midnight final-cta` |
| 9 | Trusted voices + founders | `people-fold.tsx` | `band-default people-fold` |
| 10 | Diagnosis | `diagnosis-fold.tsx` | `band-section` (`#problem`) |

Skipped: HTML lines 847–1209 (internal scorecard self-audit, not production).

## Recipe layer

[`src/app/recipes.css`](../../../src/app/recipes.css) gained ~570 lines of recipes ported verbatim from [`docs/html/mock-pages.css`](../../html/mock-pages.css):

- Hero stacked headline (`.hero-headline`, `.hero-headline__line`, `.hero-subhead`)
- Audience section / cards (scoped under `.audience-section .audience-card` to coexist with the legacy `.audience-card` block at recipes.css line ~1800 used by `/about`, `/contact`, `/who-we-serve`)
- Path section + 4-stage cards with mobile timeline rail
- Matters / build / difference / proof / final-cta folds

All recipes reference only semantic CSS variables already declared in [`src/app/globals.css`](../../../src/app/globals.css) `:root` and `.dark` overrides.

## Validation

- `pnpm typecheck` — clean (with `NODE_OPTIONS=--max-old-space-size=8192` for the workspace; pre-existing memory issue, not migration-induced)
- `pnpm build` — clean, "Compiled successfully in 5.5s"
- `pnpm exec eslint src/components/sections-mock/home/` — clean (zero errors, zero warnings)
- Layers 1–5 untouched (`git diff --stat` confirms only `src/app/recipes.css`, `src/components/sections-mock/home/*.tsx`, and these notes/work-log files)

### Manual a11y / token sweep

| Check | Result |
| --- | --- |
| `"use client"` in any home file | none (verified `grep -rn '"use client"' src/components/sections-mock/home/`) |
| Raw hex / `bg-white` / `bg-black` / `text-gray-*` in TSX | none |
| `images.unsplash.com` URLs | none (placeholder treatment for headshots; six asset TODOs logged below) |
| Inline SVGs wrapped in `aria-hidden="true"` containers | yes (audience icons, build icons, audience-card cta-arrow, people-tile photo, people-fold divider) |
| Heading order | `h1` (hero) → `h2` per band → `h3` inside cards — monotonic |
| Audience grid card count | 3 (nonprofits / churches / institutions) — movement-leader doctrine respected |

### `design-audit` skill report

6/7 dimensions pass. One nice-to-have: card box-shadows in the new recipes use bespoke rgba ink tuples (`rgba(25, 21, 15, 0.06)`, etc.) instead of `var(--shadow-ambient-value)`. Not blocking — values came verbatim from the static SSOT and the migration prompt mandates parity. Cross-repo follow-up below.

## Asset TODOs (people-fold headshots)

Six 88×88 placeholders awaiting real assets:

- [ ] Rev. Dr. Liz Rios — home people-fold (Trusted voices column)
- [ ] JR Woodward — home people-fold (Trusted voices column)
- [ ] L. Rowland Smith — home people-fold (Trusted voices column)
- [ ] Alan Hirsch — home people-fold (Founders column)
- [ ] Brad Brisco — home people-fold (Founders column)
- [ ] Joshua Shepherd — home people-fold (Founders column)

When real photos land, replace the inline `<span style={{ background: "var(--elevated)", … }}>` placeholder in `people-fold.tsx` with `next/image`.

## Follow-ups (non-blocking)

- **Card shadow token unification.** Add `--shadow-card-soft` / `--shadow-card-lift` tokens to both `src/app/globals.css` and `docs/html/site-templates/site-theme.css`, then refactor the new home recipes (`audience-section .audience-card`, `matters-block`, `proof-pillar`) and their `mock-pages.css` counterparts to use them. Must be a single cross-repo PR to preserve static/React parity.
- **Live `/assess` diagnostic** — out of scope for this migration; the page still renders the mock preview only.
- **Per-route Lighthouse run** — the dev server smoke-rendered `/` at HTTP 200 / 92 KB, but a clean Lighthouse pass under headed Chrome is recommended before tagging release.

## Commits

```
83eb90f feat(site): migrate mock-home full design to / (F2 — section decomposition)
49970a6 feat(site): port mock-home recipes (audience/path/matters/build/difference/proof/final-cta)
```
