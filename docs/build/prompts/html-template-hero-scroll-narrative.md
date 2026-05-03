# Prompt: Static HTML — scroll-linked narrative hero (Movemental tokens)

## Goal

Approximate a **pinned, multi-phase narrative hero** (successive statements revealed by scroll) without requiring React or GSAP. Prefer **CSS scroll-driven animations** (`animation-timeline: view()` / `scroll()`) where supported, with a **static fallback** (all phases visible in sequence) when unsupported or when `prefers-reduced-motion: reduce`.

Sibling reference used GSAP; this HTML deliverable must stay **dependency-free**.

## Output

`templates/alan-hirsch/exemplars/exemplar-hero-scroll-narrative.html`  
Stylesheet: `./site-theme.css` + scoped `<style>` for scroll experiment (clearly commented).

## Design constraints (Movemental)

- **Background:** Default to `inverse-surface` band with `inverse-foreground` type **or** deep `section` + strong type—still within token set. No new palette.
- **Phases:** 2–3 short text blocks that tell a progressive story (“What if…” → “This week…” → “Here is the move”).
- **Pinning:** If using CSS sticky, ensure total scroll height does not trap keyboard users—provide skip link past the section.
- **Reduced motion:** Disable scroll-linked opacity/transform; show final message + short intro only, or stack all lines with headings.

## Reference IA (read-only)

- `/Users/joshuashepherd/Desktop/dev/repos/movemental-ai/components/why-movemental-final/GSAPHeroTextSection.tsx`

## Structure (minimum)

1. Short intro paragraph **before** the pinned region (context).
2. **Pinned region** (~200–300vh scroll space OR compact alternative with `@supports` branch):
   - Sticky inner box vertically centered for supported browsers.
3. **Post-hero** light `background` section proving the page continues (CTA + paragraph).

## Acceptance criteria

- [ ] Document in HTML comments which browsers get scroll-linked behavior.
- [ ] Fallback path is readable and not broken.
- [ ] No external JS libraries.
- [ ] Token-only colors.
