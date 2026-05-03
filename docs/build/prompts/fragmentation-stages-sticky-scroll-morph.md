# Prompt: Fragmentation stages — sticky-left text, morphing-right visualization

## Goal

A scroll-driven alternative to the horizontal GSAP deck: **left column scrolls** through the six stages (stage title + one-sentence caption each); **right column is sticky** and the visualization **morphs from one state to the next** as the reader moves through the stages.

The identity of each "shape" persists across stages — a dot that is scattered in Stage 1 is the same dot that lands in a grid cell in Stage 2, then emits a ray in Stage 3, and so on. **The visualization is one continuous object**, not six separate illustrations.

Built in plain **HTML / CSS / JS**. GSAP is allowed (`ScrollTrigger` for stage → timeline scrubbing) but **not** required — native `IntersectionObserver` + CSS transitions is sufficient. Choose the tool that produces the calmest result.

## Output

```
docs/html/fragmentation-stages-morph/
  index.html
  styles.css
  script.js
```

Self-contained. Inter + Instrument Serif via Google Fonts. If using GSAP, CDN only; no build step.

## Design constraints

- Token set: same as `docs/html/fragmentation-concept-modern/styles.css` (warm cream + ink duotone).
- Page background: `--bg`. Right-hand viz panel sits on `--bg-alt` so the sticky region reads as a canvas.
- Monochrome only. Stroke + fill derived from `currentColor`.
- Visualization lives in a single SVG (`<svg id="stage-viz">`) with all elements present in the DOM at all times. Transitions are driven by adding/removing state classes on the SVG root (`data-stage="1"` … `data-stage="6"`).
- Reduced motion: disable the morph; render the final state (Movement) and show the six stages stacked with each stage's caption.

## Content — six stages (same as before)

| # | Title | Caption |
|---|-------|---------|
| 01 | Fragmentation | Your intelligence exists — but in pieces. |
| 02 | Integration | Everything is brought into one system. |
| 03 | Activation | Your intelligence becomes usable. |
| 04 | Formation | People are shaped, not just informed. |
| 05 | Multiplication | Your work begins to scale through systems. |
| 06 | Movement | Your work becomes part of a connected field. |

## The shape language — one visualization that evolves

Use a cast of **twelve primary nodes** (circles, ~8px radius) plus a reusable set of edges. Track element identity — node `#n-01` is the same DOM element across all six stages; only its attributes (`cx`, `cy`, `r`, `opacity`) change.

| Stage | State of the visualization |
|---|---|
| **01 Fragmentation** | Twelve nodes scattered at slightly random (but fixed) positions. No edges visible. Subtle idle drift (±1px) loops. |
| **02 Integration** | The same twelve nodes ease into a clean 4×3 grid centered in the canvas. No edges yet — order itself is the idea. |
| **03 Activation** | Grid persists; one node becomes a filled disk (the "live" node) and three edges draw from it to three other nodes — retrieval rays. The filled node pulses slowly. |
| **04 Formation** | Grid dissolves into a horizontal left→right path through five of the twelve nodes (the other seven fade to ~30% opacity). A small traveller dot walks the path in a 6s loop, pausing at each waypoint. The five path nodes correspond to Recognition · Belonging · Alignment · Accountability · Imitation (labelled beneath, optional). |
| **05 Multiplication** | Path dissolves. From one root node, edges branch outward into a small symmetric tree (root → 2 → 4) reaching eight of the twelve. Branch lines draw in with `stroke-dashoffset` animation. |
| **06 Movement** | Tree collapses into a loose network — all twelve nodes active, ~16 edges connecting them into an interlinked field. Slow breathing (nodes nudge ±1–2px on staggered 6–9s loops). Nothing is prominent; the field itself is the subject. |

**Transitions are morphs, not cuts.** Use `<animate>` or JS-driven CSS transitions on `cx`, `cy`, `opacity`, `stroke-dashoffset`. Default duration ~900ms with `cubic-bezier(0.22, 1, 0.36, 1)`.

## Structure — step by step

1. **Layout**
   ```html
   <section class="deck">
     <div class="deck__viz">
       <svg id="stage-viz" viewBox="0 0 640 640" data-stage="1"> … </svg>
     </div>
     <div class="deck__text">
       <article class="stage" data-stage="1">…</article>
       <article class="stage" data-stage="2">…</article>
       …six articles…
     </div>
   </section>
   ```
2. **CSS**
   - `.deck` is `display: grid; grid-template-columns: 1fr 1fr; gap: 0;` on ≥ 960px, stacked below.
   - `.deck__viz` is `position: sticky; top: 0; height: 100dvh;` with the SVG centered inside.
   - `.deck__text` has generous `padding-block` so each `.stage` fills roughly 100dvh — one stage at a time reads as the "active" stage.
   - Each `.stage` has:
     - small label (`Stage 01` · dot marker)
     - large title (Inter 500, display-scale, italic-serif emphasis allowed on one word)
     - single-sentence caption (Inter 400, muted)
3. **Stage activation (IntersectionObserver)**
   - Observe each `.stage` with `rootMargin: '-40% 0px -40% 0px'` so the "active" stage is the one closest to the viewport midpoint.
   - When a stage becomes active, set `svg.dataset.stage = n` (1–6). CSS / JS reads that attribute and moves the nodes to their stage-`n` positions.
4. **Morph implementation (two acceptable paths)**
   - **Path A — JS coordinates lookup**: keep a `STAGE_STATES = { 1: {...}, 2: {...}, … }` object in `script.js` mapping each node id to `{cx, cy, r, opacity}`. On stage change, iterate over nodes and set attributes via `animate()` (Web Animations API) with `{duration: 900, easing: 'cubic-bezier(0.22, 1, 0.36, 1)'}`.
   - **Path B — CSS variables**: define per-node `--x-stage-1: 120px; --x-stage-2: 260px;` etc., and use CSS custom property interpolation on the SVG root keyed by `[data-stage="n"]`. Works but harder to sequence edge draw-ins.
   - Path A is recommended. Edge draw-ins (Stage 3 rays, Stage 5 branches) stagger by `i * 80ms`.
5. **Edges**
   - All edges exist in the DOM but have `stroke-opacity: 0` until their stage. Use `stroke-dasharray` + `stroke-dashoffset` so they can "draw in" on reveal.
6. **GSAP path (optional)**
   - If GSAP+ScrollTrigger is already loaded in the repo, bind per-stage `ScrollTrigger` instances that call the morph function on `onEnter` and reverse on `onLeaveBack`. You do not need scrub — snapping between discrete stages is cleaner than continuous interpolation here.
7. **Progress indicator**
   - A tiny vertical dot stack on the right edge of the viz panel (6 small dots, one filled for the active stage). Not required; optional polish.
8. **Reduced motion**
   - If `prefers-reduced-motion: reduce`, collapse the deck to stacked single column, show the SVG in its Stage 6 state once, and let the stages read as a plain vertical sequence.

## Micro-choices that make this feel calm

- Morph duration: ~900ms. Slower than default; you want the reader to feel shapes travelling, not snapping.
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (same as the sibling pages).
- Never animate two things at cross-purposes in the same stage transition. If Stage 3 draws rays, freeze node drift during that ~900ms.
- Idle drift loops should be **subtle** — amplitude ≤ 2px, period ≥ 5s, staggered offsets so no two nodes sync.
- Never use color. Use `currentColor` so the whole diagram inherits `--ink` (or `--dark-ink` if inverted).

## Acceptance criteria

- [ ] A single SVG persists across all six stages; nodes retain identity.
- [ ] Scrolling the left column morphs the right visualization through six well-defined states.
- [ ] Each stage's text is title + one-sentence caption only.
- [ ] Morph is continuous (no hard cuts). Rays, paths, and branches draw in, not pop in.
- [ ] `prefers-reduced-motion: reduce` collapses to stacked static layout.
- [ ] No new color hues; monochrome throughout.
- [ ] Keyboard users can tab through stage headings; `aria-current="step"` on the active stage is recommended.
- [ ] Works without GSAP; GSAP is an acceptable implementation tool but never required.
