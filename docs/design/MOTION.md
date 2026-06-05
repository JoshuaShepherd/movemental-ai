# Movemental motion system — Calm Confidence

Companion spec to [DESIGN.md](./DESIGN.md) §6. This document is the **canonical motion charter**: every animation, transition, and scroll-driven effect on the Movemental site traces back to a rule here.

**Implementation lives in code.** Tokens are in `globals.css` `:root` + `@theme inline` and `tailwind.config.ts`. The `<Reveal>` primitive handles scroll entrances. When this document and the codebase disagree, fix both in one change.

---

## 1. Motion philosophy

Motion on Movemental serves **three purposes only**:

1. **Confirm state** — hover, focus, active, open/close feedback.
2. **Direct attention** — scroll-reveal entrances that guide the eye down the page.
3. **Convey continuity** — transitions between states that feel like one fluid publication, not a series of jump-cuts.

Motion **never** entertains for its own sake, loops indefinitely, or blocks reading. If removing an animation makes the page harder to understand, the animation is justified. If removing it changes nothing, remove it.

### Non-goals

- No parallax scrolling or scroll-jacking.
- No particle fields, floating elements, or ambient decorative loops.
- No page-transition animations (Next.js App Router navigations are instant).
- No auto-advancing carousels or tickers.
- No 3D transforms or perspective effects on marketing content.

---

## 2. Token inventory

All motion tokens live in `globals.css` `:root` and are exposed to Tailwind via `tailwind.config.ts`.

### 2.1 Duration scale

| Token | Value | Tailwind utility | When to use |
| ----- | ----- | ---------------- | ----------- |
| `--duration-fast` | `150ms` | `duration-fast` | Hover, focus, toggle, icon rotation |
| `--duration-normal` | `300ms` | `duration-normal` | Card lift, dropdown open/close, nav transitions |
| `--duration-slow` | `450ms` | `duration-slow` | Section entrance reveals, hero fade-in |
| `--duration-reveal` | `600ms` | `duration-reveal` | Scroll-triggered entrance (Reveal component) |
| `--duration-stagger` | `80ms` | — | Per-child delay offset in staggered reveals |

### 2.2 Easing curves

| Token | Value | Tailwind utility | Character |
| ----- | ----- | ---------------- | --------- |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | `ease-out` | Decelerating entrance — fast start, gentle stop. Default for reveals. |
| `--ease-expressive` | `cubic-bezier(0.4, 0, 0.2, 1)` | `ease-expressive` | Material-style emphasis — used for interactive feedback (accordion, sheet). |

### 2.3 Transform amplitudes

Keep transforms **subtle**. Large movements feel like a theme park, not a publication.

| Effect | Max value | Notes |
| ------ | --------- | ----- |
| Reveal translate-Y | `20px` | Sections slide up 20px as they enter. |
| Hover translate-X (arrow) | `4px` | ArrowLink arrow nudge on hover. |
| Hover translate-Y (card lift) | `-2px` | SurfaceCard float-up on hover. |
| Hover scale | `1.02` | Reserved for interactive cards only, never images or sections. |
| Focus ring scale | none | Focus rings do not animate scale. |

---

## 3. Animation catalog

### 3.1 Keyframes (defined in `tailwind.config.ts`)

| Name | From | To | Duration | Easing | Use |
| ---- | ---- | -- | -------- | ------ | --- |
| `fade-in` | `opacity: 0` | `opacity: 1` | 400ms | ease-out | Hero text entrance, standalone reveals |
| `fade-up` | `opacity: 0; translateY(20px)` | `opacity: 1; translateY(0)` | 600ms | ease-out | Primary scroll-reveal entrance |
| `fade-up-sm` | `opacity: 0; translateY(12px)` | `opacity: 1; translateY(0)` | 500ms | ease-out | Staggered children within a revealed section |
| `scale-in` | `opacity: 0; scale(0.97)` | `opacity: 1; scale(1)` | 300ms | ease-out | Dialog/sheet/popover open |
| `accordion-down` | `height: 0` | `height: var(--radix-*)` | 200ms | ease-out | Radix accordion expand |
| `accordion-up` | `height: var(--radix-*)` | `height: 0` | 200ms | ease-out | Radix accordion collapse |

### 3.2 Scroll-reveal entrance (`<Reveal>`)

The `<Reveal>` client component wraps any content block and plays `fade-up` when it enters the viewport. It is the **only** mechanism for scroll-triggered animation on the site.

**Behavior:**
- Uses `IntersectionObserver` with `threshold: 0.15` and `rootMargin: "0px 0px -60px 0px"`.
- Starts with `opacity: 0; transform: translateY(20px)`.
- On intersection, transitions to `opacity: 1; transform: translateY(0)` over `--duration-reveal` with `--ease-out`.
- Fires **once** — no re-hiding on scroll-up.
- Respects `prefers-reduced-motion: reduce` — skips to visible immediately (no transform, instant opacity).

**Stagger:** Pass `stagger` prop to `<Reveal>` to delay children by `--duration-stagger × index`. Each direct child gets `transition-delay` applied via CSS custom property.

**Where to apply:**
- Wrap each `<Section>` on the home page and marketing pages.
- Do **not** wrap navigation, footer, or content that is above the fold on load.
- Do **not** wrap individual paragraphs inside a section — reveal the section as a unit, optionally stagger its top-level children.

### 3.3 Hero entrance

The hero section (above the fold) uses a **CSS-only** entrance — no IntersectionObserver needed since it's visible on load.

- Eyebrow: `animate-fade-in` with 200ms delay
- Display heading: `animate-fade-up` with 100ms delay
- Prose body: `animate-fade-up` with 300ms delay
- CTA buttons: `animate-fade-up` with 500ms delay

All use `animation-fill-mode: both` (Tailwind `fill-mode-both`) so they start invisible.

### 3.4 Nav scroll shadow

The `SiteNav` glass bar gains `shadow-nav-scroll` after scrolling past `20px`. Implemented via a lightweight scroll listener (or CSS `@scroll-timeline` if supported) with `transition: box-shadow var(--duration-normal) var(--ease-out)`.

### 3.5 Hover & focus micro-interactions

| Element | Effect | Duration | Easing |
| ------- | ------ | -------- | ------ |
| `SurfaceCard` (interactive) | `translateY(-2px)` + `shadow-ambient` | `duration-normal` | `ease-out` |
| `SurfaceCard` (non-interactive) | No hover effect | — | — |
| `Button` (primary) | Slight brightness shift via `opacity-92` | `duration-fast` | `ease-out` |
| `Button` (outline) | `bg-section` tonal shift | `duration-fast` | `ease-out` |
| `ArrowLink` | Arrow `translateX(4px)` | `duration-fast` | default (Tailwind) |
| Nav links | `color` transition to `foreground` | `duration-fast` | `ease-out` |
| Cards with images | No image scale — keep editorial restraint | — | — |

### 3.6 Accordion / Sheet / Dialog

Radix-powered UI components use their own keyframes:
- Accordion: `accordion-down` / `accordion-up` at 200ms.
- Sheet/Dialog: `scale-in` + backdrop fade, coordinated by shadcn defaults.

Do not override these with custom motion — they are already accessible and tested.

---

## 4. Reduced-motion policy

**`prefers-reduced-motion: reduce`** is respected globally in `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Additionally:
- The `<Reveal>` component checks `matchMedia('(prefers-reduced-motion: reduce)')` and renders children visible immediately without transforms.
- Any JS-driven motion (GSAP, scroll-timeline) **must** read the same query and skip or simplify.
- Color transitions (hover tonal shifts) are acceptable under reduced-motion — they don't cause vestibular issues.

---

## 5. Performance budget

- **No layout-triggering animations.** Only animate `opacity` and `transform` (both compositor-friendly). Never animate `height`, `width`, `padding`, or `margin` outside of Radix's accordion (which uses `will-change: height`).
- **No per-item stagger on long lists.** If a grid has more than 6 items, reveal them as a batch, not individually.
- **No heavy blur stacks.** The nav `backdrop-blur-xl` is the only approved blur. Do not add blur to section backgrounds or card hover states.
- **Test on mid-tier mobile.** Animations must feel smooth on a 2021-era Android phone, not just a MacBook Pro.

---

## 6. Implementation map

| Artifact | Location | Role |
| -------- | -------- | ---- |
| Duration + easing tokens | `globals.css` `:root` | Source of truth |
| Tailwind duration/easing | `tailwind.config.ts` → `transitionDuration`, `transitionTimingFunction` | Utility classes |
| Keyframes | `tailwind.config.ts` → `keyframes` + `animation` | Named animations |
| `<Reveal>` component | `src/components/primitives/reveal.tsx` | Scroll-reveal entrances |
| Nav scroll shadow | `src/components/nav/site-nav.tsx` | Scroll listener + class toggle |
| Hero entrance | Page-level CSS animation classes | Above-fold reveal |
| Reduced-motion guard | `globals.css` `@media` + JS `matchMedia` in Reveal | Accessibility |

---

## 7. Change control

New motion effects require:

1. A rule in this document (§3) with duration, easing, and amplitude.
2. A token in `globals.css` if the value is new.
3. A keyframe in `tailwind.config.ts` if it's a named animation.
4. Verification that `prefers-reduced-motion` is respected.
5. Testing on a real mobile device or throttled DevTools.

Do not add one-off `transition-all duration-[437ms]` in page files. If the existing token scale doesn't fit, propose a new token here first.

---

## 8. Sibling static reference (`movemental-html-template`)

The html-template repo implements Layer 6 in `js/main.js` (Oatmeal aesthetic). Use this section when auditing static ↔ React parity — **remap motion behavior**, not Oatmeal easing values, into Concept Modern tokens.

Source: `~/dev/01-Movemental-Core/movemental-html-template/js/main.js`, `_reference/style-spec.md` § Motion. Bridge doc: [MOVEMENTAL_HTML_TEMPLATE.md](./MOVEMENTAL_HTML_TEMPLATE.md) §6.

### 8.1 Reveal-on-scroll

| | html-template | movemental-ai |
| --- | ------------- | ------------- |
| Class / API | `.reveal` → `.is-revealed` | `<Reveal>` |
| Observer | `threshold: 0.1`, `rootMargin: 0px 0px -8% 0px` | `threshold: 0.15`, `rootMargin: 0px 0px -60px 0px` |
| Transform | CSS transition on `.reveal` (pages.css) | `translateY(20px)` → `0` over `--duration-reveal` (600ms) |
| Easing | `--ease` in tokens.css | `--ease-out` |
| Reduced motion | Skip IO; add `.is-revealed` immediately | Skip transform; instant opacity |
| Stagger | Hero `.reveal:nth-child(n)` delays 0–320ms | `--duration-stagger` (80ms) via `<Reveal stagger>` |

When porting a static band, prefer **one `<Reveal>` per section**, not per paragraph.

### 8.2 Nav & chrome

| Behavior | html-template | movemental-ai |
| -------- | ------------- | ------------- |
| Scroll shadow | `.ml-nav.is-scrolled` after `scrollY > 8` | `SiteNav` shadow after ~20px |
| Mobile drawer | `.ml-nav-toggle` + `#ml-nav-drawer` | `Sheet` / mobile nav |
| Mega-menu | `.mh-mega-group` hover-intent (861px breakpoint) | Path/audience nav — desktop hover + mobile accordion |

### 8.3 Interactive widgets (product-specific)

| Widget | html-template | React target |
| ------ | ------------- | -------------- |
| Five-Layer Read | `initFiveLayerRead(.flr-root)` on `pathway-safety.html` | `/pathway/safety` product wizard |
| Field guide form | `.fg-form` preventDefault + `.is-submitted` | API + React Hook Form |
| Filter chips | `.ml-filter-chips` (Tier D leader pages) | N/A on Movemental marketing |
| Scarcity line | `[data-committed-seats]` text injection | `committed-seats.ts` + home CTA |

### 8.4 Card hover (Oatmeal style spec)

Oatmeal reference allows `translateY(-2px)` on card hover with border tone shift. Concept Modern matches this amplitude in [PATTERNS.md](./PATTERNS.md) §1 (`hover:-translate-y-0.5` ≈ 2px) — do not exceed **2px** lift on marketing cards.
