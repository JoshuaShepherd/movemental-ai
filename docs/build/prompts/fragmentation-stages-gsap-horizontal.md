# Prompt: Fragmentation stages — horizontal GSAP slide deck

## Goal

Build a **simplified, one-screen-at-a-time** version of the fragmentation story. The full editorial page at `docs/html/fragmentation-concept-modern/` is the content source; this deliverable strips it down to the essentials:

- **Six horizontal slides**, one per stage.
- Each slide contains **only**:
  1. A stage **title** (e.g. `Fragmentation`).
  2. The **best single visualization** of what that stage looks like.
  3. A **one-sentence caption** of what the stage entails.
- Navigation is **pinned horizontal scroll** (pin the section, translate the slide track on vertical scroll) using **GSAP + ScrollTrigger**.

This is a concept mockup — dependency-free otherwise, no framework, no build step.

## Output

```
docs/html/fragmentation-stages-gsap/
  index.html
  styles.css
  script.js
```

Everything self-contained in that folder. Inter + Instrument Serif via Google Fonts. GSAP + ScrollTrigger via CDN (`<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>` + ScrollTrigger).

## Design constraints

Reuse the **modern token system** from `docs/html/fragmentation-concept-modern/styles.css`:

- `--bg: #faf6ee`, `--bg-alt: #f2ece0`, `--dark: #141110`
- `--ink: #19150f`, `--ink-muted: #6b6660`, `--dark-ink: #f4efe5`
- Fonts: **Inter** (UI + title), **Instrument Serif** (italic emphasis only)
- Label style: small caps + `·` dot marker
- No drop shadows on content; elevation via tonal stacking only
- Every animation respects `prefers-reduced-motion: reduce`

Page background: `--bg` (warm cream). Each slide is the full viewport. Visualizations are monochrome (ink on cream or cream on ink), **no color hues**. The visualization is a semantic diagram — not decoration.

## Content — the six slides

| # | Title | Caption (one sentence) |
|---|-------|------------------------|
| 01 | Fragmentation | Your intelligence exists — but in pieces. |
| 02 | Integration | Everything is brought into one system. |
| 03 | Activation | Your intelligence becomes usable. |
| 04 | Formation | People are shaped, not just informed. |
| 05 | Multiplication | Your work begins to scale through systems. |
| 06 | Movement | Your work becomes part of a connected field. |

Each caption is the full textual payload beneath the title. No sub-bullets, no extra paragraphs, no CTAs inside slides.

## Visualization — one SVG per stage

All visualizations are **pure SVG**, authored in the same sketch grammar so they feel like a family. Use a 640×480 viewBox, `currentColor` for strokes, stroke-width ~1–1.5, no fills unless explicitly noted. Scale each to fit within the slide's right column.

1. **Fragmentation** — Fourteen small rectangles scattered at random positions and slight rotations across the canvas. No lines between them. Slight idle drift animation (`translateY` ±2–4px, staggered, 5–7s loops).
2. **Integration** — The same fourteen rectangles pulled into an orderly 7×2 grid at the canvas center. No lines; alignment itself is the idea. A subtle single entry animation (grid locks in on slide enter).
3. **Activation** — One filled central circle, pulsing. Three radial rays emanating outward on a loop (retrieval pings). Two small satellite rectangles at ray endpoints (the "retrieved" artifacts).
4. **Formation** — A horizontal line with **five equidistant nodes** labelled beneath (Recognition, Belonging, Alignment, Accountability, Imitation — use tiny text below each node). A single traveller dot (~8px) walks left→right across the line in a slow loop (~6s), pausing briefly at each node.
5. **Multiplication** — A single node at center. On slide enter, it branches: 2 → 4 → 8 descendants (binary-tree-ish). Branch lines draw in with a staggered `stroke-dashoffset` animation. Result is a small symmetric tree.
6. **Movement** — A force-directed-looking network graph of ~12 nodes connected by ~18 edges (hand-placed, not computed). Subtle "breathing" — nodes nudge ±1–2px on slow, staggered loops, as if the field is alive. No node is more prominent than any other.

Keep all six visualizations within the same stroke weight and palette. The family relationship is the point.

## Structure — step by step

1. **Markup**
   - One fixed header (brand + small `01 / 06` slide indicator updated by JS).
   - A **pinned section** (`.stage-deck`) with two children:
     - `.stage-deck__track` — horizontal flex row, 600vw wide, six `.slide` children each 100vw.
   - A post-deck footer matching `fragmentation-concept-modern` (dark band, brand + copyright).
2. **Each `.slide` markup**
   ```html
   <section class="slide" data-slide="01">
     <div class="slide__inner">
       <div class="slide__text">
         <p class="label"><span class="label__dot"></span>Stage 01</p>
         <h2 class="slide__title">Fragmentation</h2>
         <p class="slide__caption">Your intelligence exists — but in pieces.</p>
       </div>
       <figure class="slide__viz" aria-hidden="true">
         <svg viewBox="0 0 640 480">…</svg>
       </figure>
     </div>
   </section>
   ```
3. **Layout CSS**
   - `.slide` is 100vw, 100dvh, display:grid, left column = text (40%), right column = viz (60%). Stack to single column below 820px.
   - Title in Inter 500, `clamp(3rem, 7vw, 6rem)`. One italic-serif word allowed per title if the content earns it — otherwise roman.
   - Caption in Inter 400, `clamp(1.1rem, 1.8vw, 1.4rem)`, `--ink-muted`, max-width 32ch. Any thematic word may be set in Instrument Serif italic.
   - Viz figure centered, max-width ~560px, currentColor driven.
4. **GSAP wiring** (`script.js`)
   - Import GSAP + ScrollTrigger (CDN).
   - Pin `.stage-deck` and translate `.stage-deck__track` horizontally.
     ```js
     const track = document.querySelector(".stage-deck__track");
     const slides = gsap.utils.toArray(".slide");
     const tween = gsap.to(track, {
       xPercent: -100 * (slides.length - 1),
       ease: "none",
       scrollTrigger: {
         trigger: ".stage-deck",
         pin: true,
         scrub: 0.5,
         snap: 1 / (slides.length - 1),
         end: () => "+=" + (track.offsetWidth - window.innerWidth),
       },
     });
     ```
   - Slide indicator: listen to `ScrollTrigger.update` or derive the active slide from `tween.progress()` and update the `01 / 06` text + a bottom-left stage nav (six small dots).
5. **Per-slide enter animations**
   - Use `ScrollTrigger.create({ trigger: slide, containerAnimation: tween, start: "left center", onEnter: () => runSlideAnim(slide), onLeaveBack: () => resetSlideAnim(slide) })` for each slide so the visualization plays when it scrolls into view.
   - Stage 2 grid snap, Stage 3 pulse start, Stage 4 traveller, Stage 5 tree unfurl, Stage 6 network breathe.
6. **Keyboard + accessibility**
   - Arrow keys advance / rewind slides by animating `scrollTo` to the ScrollTrigger offset for that slide.
   - The section is labelled `aria-roledescription="carousel"`; each slide labelled.
   - Skip link at the top of the page jumps past the pinned deck to the footer (keyboard users should not get trapped).
7. **Reduced motion fallback**
   - If `prefers-reduced-motion: reduce`, **do not** pin. Convert `.stage-deck__track` to `flex-direction: column`, let the slides stack vertically, disable all loop animations, and show each SVG in its final resting state.

## Acceptance criteria

- [ ] Six slides, horizontal pin, correct snap behavior on trackpad + mousewheel.
- [ ] Each slide: title, one-sentence caption, one SVG visualization. Nothing else.
- [ ] Visualizations share one stroke weight, one palette, one viewBox size.
- [ ] Title typography hierarchy is the visual star; visualizations are diagram-scale, not illustration-scale.
- [ ] `01 / 06` indicator updates live with active slide.
- [ ] Keyboard left/right works; skip link works.
- [ ] `prefers-reduced-motion: reduce` path stacks slides vertically with all animations off.
- [ ] No color beyond ink / cream / a single mid-gray; zero shadow decoration.
- [ ] GSAP + ScrollTrigger from CDN are the only external scripts; no framework.
