# Prompt: Fragmentation stages — clean six-step minimal layout

## Goal

The quietest possible version. Six stages, **title and single-sentence description only**, arranged as a clean, dependency-free step layout. No visualizations, no scroll choreography, no dynamic morph — just typography, rhythm, and hierarchy doing the whole job.

This is the "standard" take: a reader should be able to understand the arc in under ten seconds at a glance.

## Output

```
docs/html/fragmentation-stages-steps/
  index.html
  styles.css
  script.js   (tiny — nav scroll state, reveal, reading bar; same runtime as modern homepage)
```

Self-contained. Inter + Instrument Serif via Google Fonts. No GSAP, no other libraries.

## Design constraints

- Reuse the **modern token system** (`docs/html/fragmentation-concept-modern/styles.css`).
- Warm cream page (`--bg`) with a dark footer. No dark hero.
- Typography-forward: titles in Instrument Serif italic at display scale; descriptions in Inter at comfortable reading size.
- Flat surfaces, thin hairlines only. No cards with shadows.
- Symmetric rhythm across the six steps. They should feel like a series, not individually featured.

## Content — the six steps

| # | Title | One-sentence description |
|---|-------|--------------------------|
| 01 | Fragmentation | Your intelligence exists — but in pieces. |
| 02 | Integration | Everything is brought into one system. |
| 03 | Activation | Your intelligence becomes usable. |
| 04 | Formation | People are shaped, not just informed. |
| 05 | Multiplication | Your work begins to scale through systems. |
| 06 | Movement | Your work becomes part of a connected field. |

Nothing else goes in the step row. No sub-bullets, no icons, no links, no CTAs inside steps.

## Page structure

1. **Nav** — same as `homepage-concept-modern` (sticky, glassy on scroll, reading progress bar).
2. **Hero block** — single headline + single lede paragraph. Tight.
   - Label: `· Six stages`
   - Title (Inter 500, big): **The arc out of fragmentation.**
   - Lede (Inter 400, muted): *Six stages that re-compose the same intelligence — knowledge and relationships — into a system you can lead from.*
3. **Steps block** — the heart of the page. Two layouts to choose from; pick one and commit.
4. **Outro** — single centered sentence + a primary CTA:
   - Title: *This is where fragmentation becomes movement.*
   - CTA: `Start with clarity →`
5. **Footer** — identical to sibling mockups.

## Steps block — pick one of two layouts

### Option A · Vertical table-of-contents (recommended default)

Six rows. Each row is a 3-column grid:

```
[ 01 ]      Fragmentation                Your intelligence exists — but in pieces.
[ 02 ]      Integration                  Everything is brought into one system.
[ 03 ]      Activation                   Your intelligence becomes usable.
[ 04 ]      Formation                    People are shaped, not just informed.
[ 05 ]      Multiplication               Your work begins to scale through systems.
[ 06 ]      Movement                     Your work becomes part of a connected field.
```

- Column 1: stage number (Inter, tabular-nums, ink-soft) — 4rem wide.
- Column 2: stage title (Instrument Serif italic, ~2rem display).
- Column 3: description (Inter 400, ~1.05rem, ink-muted), max 48ch.
- Thin `--border` rule **between** rows; top + bottom rules close the set.
- Stack to two-column (number + content) below 720px.

### Option B · 3×2 grid

Six equal cells in a 3-column / 2-row grid (stacks to 2-col then 1-col).

- Each cell has the number (top-left), the title (center-left, serif italic), and the description (bottom).
- Hairlines between cells only — no cell backgrounds.
- Slightly more scannable; slightly less editorial. Pick A unless the page needs to fit above the fold at ≥ 1200px.

**Implementation detail (A):**

```html
<ol class="steps">
  <li class="step">
    <span class="step__num">01</span>
    <h3 class="step__title">Fragmentation</h3>
    <p class="step__body">Your intelligence exists — but in pieces.</p>
  </li>
  … five more …
</ol>
```

```css
.steps { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--border); }
.step {
  display: grid;
  grid-template-columns: 4rem 14rem 1fr;
  gap: 2.5rem;
  padding-block: 1.75rem;
  border-bottom: 1px solid var(--border);
  align-items: baseline;
}
.step__num { font-size: 0.78rem; letter-spacing: 0.09em; text-transform: uppercase; color: var(--ink-soft); font-feature-settings: "tnum"; }
.step__title { font-family: "Instrument Serif", serif; font-style: italic; font-weight: 400; font-size: clamp(1.6rem, 2.4vw, 2rem); color: var(--ink); letter-spacing: -0.01em; line-height: 1.1; }
.step__body { font-size: 1.05rem; line-height: 1.55; color: var(--ink-muted); max-width: 48ch; }
@media (max-width: 760px) {
  .step { grid-template-columns: 4rem 1fr; }
  .step__body { grid-column: 2; }
}
```

## Motion

- Reveal on scroll using IntersectionObserver. Per-row stagger of ~80ms.
- Optional single-word italic emphasis on one title (e.g. *Movement*) — but only if it earns attention rather than being decoration.
- Nothing else moves. No parallax, no morph, no particles. Restraint is the signature.
- `prefers-reduced-motion: reduce` — disable the reveal, show everything in final state.

## Acceptance criteria

- [ ] Each of the six steps renders exactly: number, title, one-sentence description. No more.
- [ ] Titles use Instrument Serif italic; numbers and descriptions use Inter; no other fonts.
- [ ] Hairlines only — no cards, no shadows, no backgrounds on steps.
- [ ] Symmetry: all six rows have the same padding, same rule thickness, same column widths.
- [ ] Stacks gracefully at ≤ 760px (number + content two-column).
- [ ] Nav + footer match `homepage-concept-modern` exactly for cross-page continuity.
- [ ] No external JS libraries. Single `script.js` handles only: scroll-nav state, reveal, reading bar, year.
- [ ] A reader scanning the page for five seconds can still name all six stages in order.

## Why this version exists

The horizontal-GSAP and sticky-morph variants are maximalist — they ask the reader to watch something happen. This minimal version trusts that the **sequence and the language alone** carry the idea. When the full fragmentation story is already available at `docs/html/fragmentation-concept-modern/`, this step page becomes the canonical "at-a-glance" link surface — the thing you drop into a deck, an email, or a homepage section to say *"the arc, in one screen."*
