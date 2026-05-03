# Prompt: Static HTML — cinematic full-viewport hero (Movemental tokens)

## Goal

Implement a **landmark hero**: near full-viewport height, background image or gradient field, centered headline + subtitle, optional eyebrow pill, and a **scroll cue** at the bottom. Inspired by pathway “cinematic” moments in the exemplar doc; **colors and type must follow Movemental** (midnight band uses `inverse-surface`, not arbitrary blues).

## Output

Either:

- `templates/alan-hirsch/exemplars/exemplar-hero-cinematic.html` (standalone demo), **or**
- A clearly delimited `<section id="hero-cinematic">` embedded in another exemplar page.

Stylesheet: `./site-theme.css` plus a **scoped** `<style>` block only for layout math that cannot live in the shared theme (document why).

## Design constraints (Movemental)

- **Midnight / imagery:** Full-bleed background may use a dark photo with **`linear-gradient`** overlay only if it matches allowed patterns: prefer solid `inverse-surface` wash + opacity on image, or subtle `primary` tint at low opacity in the gradient (no rainbow, no extra brand gradients beyond DESIGN allowance).
- **Text on image:** Must meet contrast; default body text on midnight = `inverse-foreground`. If contrast fails on photo, add a stronger scrim (document in comment).
- **Typography:** Inter; display headline may be large with tight leading; optional italic subtitle—keep letter-spacing disciplined.
- **Scroll indicator:** Small label + chevron; `prefers-reduced-motion: reduce` disables pulse animation.
- **No fake video controls** unless this prompt is paired with a video asset (not required).

## Reference IA (read-only)

- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/pathways-hub/detail/metanoia-cinematic-hero.tsx`

## Structure (minimum)

1. `section` min-height ~100vh (use `min-height: 100dvh` with fallback).
2. Background: `Image` equivalent → use CSS `background-image` with `background-size: cover` and a token-based overlay.
3. Centered stack: eyebrow span → `h1` → `p`.
4. Scroll cue absolutely positioned bottom center.

## Acceptance criteria

- [ ] Works when JS is disabled (pure CSS).
- [ ] No structural borders; depth from overlay + type only.
- [ ] Primary color used sparingly (e.g. scroll hint accent), not as full wash.
