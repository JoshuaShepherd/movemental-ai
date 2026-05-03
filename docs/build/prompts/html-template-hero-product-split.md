# Prompt: Static HTML — product / offer split hero (Movemental tokens)

## Goal

Build a **two-column hero** suited for courses or product offers: left = badge, headline, italic subtitle, **meta strip** (icons + facts), dual CTAs; right = cover/visual in a framed card. IA from sibling `CourseHeroSection`; **Movemental surfaces and CTA rules**.

## Output

`templates/alan-hirsch/exemplars/exemplar-hero-product-split.html`  
Stylesheet: `./site-theme.css`

## Design constraints (Movemental)

- **Layout:** `max-width: var(--container-max)`; 12-column spirit OK in CSS Grid (e.g. 7/5 split on `lg`).
- **Badge:** Rounded pill on `secondary` / muted surface—not primary-filled unless it is the single strongest label.
- **Meta row:** Use `border-top` / `border-bottom` with `var(--border)` **only** for this dense strip (forms/dense UI exception per DESIGN).
- **Cover frame:** `bg-card`, `shadow-ambient` optional; rotation ≤2deg.
- **Buttons:** Primary + outline secondary; gradient allowed on primary CTA only per DESIGN.

## Reference IA (read-only)

- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/course-landing/CourseHeroSection.tsx`

## Structure (minimum)

1. `section` with generous `padding-top` / `padding-bottom` (hero rhythm).
2. Grid: text column + media column.
3. Meta strip with 3 placeholder facts.
4. Two `<a>` or `<button>` elements styled as CTAs.

## Acceptance criteria

- [ ] Collapses to single column on narrow viewports (image below text or above—pick one and stay consistent).
- [ ] No hex outside `:root` tokens.
- [ ] Touch-friendly tap targets (min 44px height for buttons).
