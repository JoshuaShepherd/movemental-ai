# Concept Modern (HTML prototypes) — historical charter / delta log

> **Status: absorbed into the main charter — 2026-04-17.** Concept Modern **is** the Movemental design system now. Canonical tokens, typography, sectioning, and CTA rules live in **[DESIGN.md](./DESIGN.md)** and in `src/app/globals.css`. The former `--editorial-*` namespace has been retired — base semantic tokens (`--background`, `--foreground`, `--primary`, `--border`) now resolve directly to the Concept Modern values. Existing `bg-editorial-paper` / `text-editorial-foreground` utilities are preserved as identity aliases so in-flight components keep compiling, but new work should use the plain semantic tokens.
>
> This file remains a **detailed reference** for static HTML under `docs/html/*-concept-modern*/` — stylesheet load order, prototype-only behaviors, and class-level BEM contracts — and for any future port from the prototype source. When this charter and `DESIGN.md` disagree, **`DESIGN.md` wins.**
>
> **Execution prompts:** numbered migration steps (nav, home, books, audience, articles, team, assess, contributors) live in [concept-modern-html-to-react-prompts.md](../build/prompts/concept-modern-html-to-react-prompts.md).

## 1. Scope — source templates

The charter unifies these prototypes (same palette, type stack, and most primitives; layout and motion vary by page):

| Path | Role |
|------|------|
| `docs/html/homepage-concept-modern/` | Base stylesheet: tokens, nav, hero, long-form sections, footer, reveal |
| `docs/html/fragmentation-concept-modern/` | Long narrative + dark hero/outro, jump grid, stage blocks, query card, infra lists |
| `docs/html/fragmentation-stages-gsap/` | Horizontal pinned “deck” + SVG narrative viz (GSAP), compact header/footer |
| `docs/html/fragmentation-stages-morph/` | Sticky viz + scroll-linked stages, node morph SVG, `<dialog>` asset browser |
| `docs/html/fragmentation-stages-steps/` | Typography-only six-step list; minimal chrome |
| `docs/html/audience-concept-modern/` | **Extension CSS** over homepage base (`../homepage-concept-modern/styles.css`) |
| `docs/html/articles-concept-modern/` | **Extension CSS** over homepage base |

**Audience** and **articles** concepts assume the homepage base stylesheet is loaded first, then their local `styles.css` overrides or adds blocks.

## 2. Design intent (what this system is for)

- **Register:** Warm editorial product UI in the neighborhood of Notion, Anthropic marketing, and Medium—**cream surfaces**, **ink typography**, **flat hierarchy**, **hairline structure** instead of heavy cards.
- **Voice:** Inter carries structure and UI; **Instrument Serif italic** carries emphasis, stage names, and “human” pull quotes—never for long body copy.
- **Restraint:** Color is essentially **duotone** (warm paper + near-black ink) with a **midnight footer/hero band**. Accents are rare; motion is subtle and scroll-linked where possible.
- **Differentiation from production DESIGN.md:** These prototypes use **ink-filled pills** as the primary CTA, not brand blue. If you port to React, **either** remap CTAs to `bg-primary` / semantic tokens **or** keep this as an alternate “warm editorial” theme with its own token namespace (recommended below).

## 3. Principles (for designers and agents)

1. **Typography is the interface.** Prefer type scale, measure (`ch`), and whitespace over boxes and shadows.
2. **Sectioning via lines and bands.** `border-top` / full-bleed grid borders on `--border`; alternate sections use `--bg-alt`. Avoid decorative box-shadow except dialogs (`asset-dlg`).
3. **Italic serif = emphasis layer only.** Use `<em>` inside titles, short labels, or quotes—not paragraphs of serif body.
4. **Motion supports comprehension.** Reveal-on-scroll (`translateY(12px)` + fade), deck transitions, SVG draw-in—all respect `prefers-reduced-motion` in the reference CSS.
5. **Monochrome diagrams.** Viz uses `currentColor`, `stroke`, light `color-mix` fills—diagrams read as part of the page, not a second palette.
6. **Accessible baselines:** Skip link, focus-visible on interactive nodes, `aria-label` on nav toggles, semantic `<main>` / `<article>` / `<header>`.

## 4. Foundations

### 4.1 Color

| Token | Typical use | Value |
|--------|-------------|--------|
| `--bg` | Default page surface | `#faf6ee` |
| `--bg-alt` | Alternating section / subtle hover wash | `#f2ece0` |
| `--surface` | Elevated panel (cards, query card) | `#ffffff` |
| `--ink` | Primary text, primary button fill | `#19150f` |
| `--ink-muted` | Secondary text | `#6b6660` |
| `--ink-soft` | Tertiary / meta / grid labels | `#9f978b` |
| `--border` | Hairlines, dividers, ghost button border | `#e6ddcb` |
| `--border-soft` | Softer card border | `#efe7d6` |
| `--dark` | Midnight band (hero, footer, outro) | `#141110` |
| `--dark-ink` | Text on midnight | `#f4efe5` |
| `--dark-muted` | Muted on midnight (often rgba) | `rgba(244, 239, 229, 0.62–0.72)` |
| `--dark-soft` | Tertiary on midnight (fragmentation hero) | `rgba(244, 239, 229, 0.54)` |
| `--dark-border` | Rules on midnight | `rgba(244, 239, 229, 0.14)` |

**Glass nav (scrolled):** `background: color-mix(in srgb, var(--bg) 82%, transparent);` + `backdrop-filter: saturate(140%) blur(14px);` + `border-bottom: 1px solid var(--border)`.

**Selection:** `background: var(--ink); color: var(--bg)`.

### 4.2 Typography

- **Sans:** Inter — weights **400 / 500 / 600 / 700** in prototypes (Google Fonts URL below).
- **Serif accent:** Instrument Serif — **italic** for emphasis; regular upright available for rare display.
- **Mono:** `ui-monospace`, SF Mono, Menlo, etc. — code, tree rows, file names in viz.

**Google Fonts link (as in HTML heads):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap"
/>
```

**Body defaults:** `font-size: 17px; line-height: 1.55; font-feature-settings: "kern", "liga", "cv11";` with antialiased rendering.

**Tracking tokens:**

| Token | Value | Use |
|--------|--------|-----|
| `--tr-display` | `-0.028em` | Display headings |
| `--tr-tight` | `-0.022em` | Large sans lead lines |
| `--tr-label` | `0.09em` | Uppercase meta / eyebrow (with `text-transform: uppercase`) |

**Heading weight:** `font-weight: 500` for h1–h4 in the shared reset (not 700).

### 4.3 Layout tokens

| Token | Homepage / most | GSAP deck |
|--------|------------------|-----------|
| `--container` | `1200px` | `1280px` |
| `--container-narrow` | `740px`–`760px` | — |
| `--reading-max` | `640px` | — |
| `--gutter` | `clamp(1.25rem, 4vw, 2.5rem)` | same |
| `--section-y` | `clamp(5rem, 10vw, 8rem)` or `clamp(4.5rem, 9vw, 7rem)` | — |
| `--section-y-sm` | `clamp(3rem, 6vw, 4.5rem)` (fragmentation) | — |
| `--nav-h` / `--header-h` | `4.25rem` | `4.25rem` |

**Common grids:** `minmax(0, 5fr) minmax(0, 7fr)` for split intros; 2 → 3 → 4 or 6 column border-grids for tiles.

### 4.4 Radii, strokes, elevation

- **Pills / buttons:** `border-radius: 999px`.
- **Cards / dialogs / query card:** `border-radius: 14px` (inner controls e.g. `8px`–`10px`).
- **Skip link / small chips:** `6px`.
- **Primary CTA hover:** `translateY(-1px)`; ghost **no** fill shift until border darkens.
- **Card hover (articles):** `translateY(-2px)` + border shift to `--border`.
- **Dialog shadow (morph only):** `0 24px 80px rgba(25, 21, 15, 0.18)`.

### 4.5 Motion tokens

| Token | Value |
|--------|--------|
| `--ease-out` / `--ease` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--dur` | `0.7s` |
| `--morph-dur` (morph) | `0.95s` |
| `--fade-dur` (morph) | `0.65s` |

**Reveal pattern:** from `opacity: 0; transform: translateY(12px)` to visible; stagger via inline `--d: 0.08s` on elements.

**Reduced motion:** collapse animations to near-zero duration, or freeze deck/morph to readable end states (see reference CSS in `fragmentation-stages-gsap` and `fragmentation-stages-morph`).

---

## 5. Primitives catalog (class-level contract)

These BEM-style classes appear across templates. When porting to React/Tailwind, treat each as a **component** or **cva** variant—not scattered one-off utilities.

### 5.1 Global / chrome

| Primitive | Purpose |
|-----------|---------|
| `.skip-link` | Off-screen until focus; jumps to `#main` |
| `.container`, `.container--narrow` | Horizontal padding + max width |
| `.sr-only` | Screen-reader only (steps template) |

### 5.2 Labels and meta

| Class | Notes |
|--------|--------|
| `.label` + `.label__dot` | Uppercase eyebrow with 6px ink dot |
| `.label--on-ink` | Fragmentation: muted variant on `--dark` |
| `.sub-label` | Smaller uppercase meta (`fragmentation-concept-modern`) |

### 5.3 Buttons

| Class | Appearance |
|--------|------------|
| `.btn` | Pill, `gap-0.55rem`, arrow child `.arrow` shifts `3px` on hover |
| `.btn--primary` | `--ink` bg, `--bg` text; hover `#000` |
| `.btn--ghost` | Transparent, `--border` border → `--ink` border |
| `.btn--sm` / `.btn--lg` | Size steps |
| `.btn--primary-inverse` / `.btn--ghost-inverse` | For midnight bands |

### 5.4 Navigation

**Marketing nav (`homepage`, `fragmentation`, `steps`, `articles`):**

- `.nav` fixed, `.nav.is-scrolled` glass + border
- `.nav__inner`, `.brand`, `.brand__mark` (donut mark), `.nav__links`, `.nav__actions`, `.nav__toggle`
- `.nav__progress` + inner `span` width from `--reading-progress`

**Fragmentation hero:** nav defaults to **light text** on `--dark`; `.nav.is-scrolled` flips to cream-field colors and inverts CTA.

**Deck header (`gsap`):** `.deck-header`, `.deck-header__inner`, `.stage-indicator`, `.stage-dots` (dot buttons).

**Morph header:** `.site-head`, `.site-head__inner`, `.site-head__crumb` (center breadcrumb with italic segment).

### 5.5 Typography blocks

| Pattern | Representative classes |
|---------|-------------------------|
| Hero | `.hero`, `.hero__grid`, `.hero__title`, `.hero__subhead`, `.hero__ctas`, `.hero__aside` |
| Section title | `.section-title`, `.section-title--xl` |
| Editorial stage | `.stage`, `.stage--alt`, `.stage__header`, `.stage__name`, `.stage__lead`, `.stage__split`, `.stage__conclusion` |
| Pull quote / stanza | `.hero__stanza` (left border), `.hero__arc` |
| Jump grid | `.jump`, `.jump__grid`, `.jump__num`, `.jump__label` |
| Ledger list | `.ledger`, `.ledger__items` |
| Carry band | `.carry`, `.carry__grid`, `.carry__text`, `.carry__sub` |
| Query card | `.query-card`, `.query-card__head`, `.query-card__live`, `.query-card__dot` (pulse) |
| Arc / infra | `.arc`, `.arc__steps`, `.infra`, `.infra__list` |
| Outro midnight | `.outro`, `.outro__title`, `.outro__body`, `.outro__ctas` |
| Deeper reading | `.deeper`, `.deeper__note` |
| Footer | `.footer`, `.footer__grid`, `.footer__brand`, `.footer__cols`, `.footer__rule`, `.footer__meta` |

### 5.6 Italic emphasis convention

Wrap stressed words in `<em>` inside headings or short lines; CSS sets:

- `font-family: var(--font-serif); font-style: italic; font-weight: 400; letter-spacing: -0.01em; font-size: ~1.03–1.06em;`

### 5.7 Audience extensions (`audience-concept-modern`)

| Block | Classes |
|--------|---------|
| Audience hero | `.audience-tag`, `.hero__aside--audience`, `.hero__aside-attr` |
| Failure grid | `.shape`, `.shape__head`, `.shape__lede`, `.shape__grid`, `.failure`, `.failure__num`, `.failure__title`, `.failure__body` |
| Moves | `.moves`, `.moves__list`, `.move`, `.move__num`, `.move__title`, `.move__body` |
| Outcomes | `.outcomes`, `.outcomes__grid`, `.outcome`, … |
| Starting / diagnostics | `.starting`, `.starting__intro`, `.starting__questions`, `.question`, `.question__num`, `.question__prompt`, `.question__gloss` |

### 5.8 Articles extensions (`articles-concept-modern`)

| Block | Classes |
|--------|---------|
| Hero variant | `.hero--articles` |
| Featured row | `.featured`, `.featured__grid` |
| Card | `.card`, `.card__eyebrow`, `.card__title`, `.card__dek`, `.card__meta` |
| Library | `.library`, `.library__group`, `.library__group-head`, `.library__group-title`, `.library__group-count`, `.library__list`, `.library__item`, … |

### 5.9 GSAP deck (`fragmentation-stages-gsap`)

| Block | Classes |
|--------|---------|
| Deck shell | `.deck`, `.deck__track`, `.slide`, `.slide__inner`, `.slide__text`, `.slide__viz`, `.slide__label`, `.slide__title`, `.slide__caption` |
| Viz families | `.viz--fragmentation`, `.viz--integration`, `.viz--activation`, `.viz--formation`, `.viz--multiplication`, `.viz--movement` |
| After deck | `.after-deck`, `.after-deck__kicker`, `.after-deck__title`, `.after-deck__body`, `.after-deck__ctas` |
| Footer | `.deck-footer`, `.deck-footer__tag` |

### 5.10 Morph template (`fragmentation-stages-morph`)

| Block | Classes |
|--------|---------|
| Intro | `.intro`, `.intro__title`, `.intro__body` |
| Deck | `.deck`, `.deck__viz-col`, `.deck__sticky`, `.deck__text-col`, `.viz` |
| Stage text | `.stage`, `.stage__name`, `.stage__caption`, `.stage__hint` |
| Progress rail | `.stage-progress`, `.stage-progress__num`, `.stage-progress__name`, `.is-active` |
| SVG graph | `.node`, `.node-dot`, `.edges`, `.edge`, `.traveller`, `.node-pulse-wrap` |
| After + foot | `.after`, `.site-foot` |
| Dialog / tree | `.asset-dlg`, `.asset-file-list`, `.tree`, `.tree__row`, `.asset-md`, … |

---

## 6. Tailwind v4 — ready-to-paste theme layer

Use a **separate namespace** (here: `cm` = “concept modern”) so these tokens do not collide with production `bg-background`, `text-primary`, etc.

### 6.1 `@theme` custom properties

Add to `src/app/globals.css` (or a dedicated `concept-modern.css`) **only if** you intentionally ship this theme:

```css
/* FUTURE / ALT THEME — Concept Modern (docs/html prototypes) */
@theme inline {
  /* Surfaces */
  --color-cm-bg: #faf6ee;
  --color-cm-bg-alt: #f2ece0;
  --color-cm-surface: #ffffff;

  /* Ink scale */
  --color-cm-ink: #19150f;
  --color-cm-ink-muted: #6b6660;
  --color-cm-ink-soft: #9f978b;

  /* Rules */
  --color-cm-border: #e6ddcb;
  --color-cm-border-soft: #efe7d6;

  /* Midnight */
  --color-cm-dark: #141110;
  --color-cm-dark-ink: #f4efe5;
  --color-cm-dark-muted: rgb(244 239 229 / 0.68);
  --color-cm-dark-border: rgb(244 239 229 / 0.14);

  /* Fonts */
  --font-cm-sans: var(--font-inter, ui-sans-serif, system-ui, sans-serif);
  --font-cm-serif: "Instrument Serif", "Iowan Old Style", ui-serif, Georgia, serif;
  --font-cm-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Tracking */
  --tracking-cm-display: -0.028em;
  --tracking-cm-tight: -0.022em;
  --tracking-cm-label: 0.09em;

  /* Layout */
  --width-cm-container: 1200px;
  --width-cm-container-wide: 1280px;
  --width-cm-narrow: 760px;
  --width-cm-reading: 640px;
  --spacing-cm-gutter: clamp(1.25rem, 4vw, 2.5rem);
  --spacing-cm-section: clamp(4.5rem, 9vw, 8rem);
  --spacing-cm-section-sm: clamp(3rem, 6vw, 4.5rem);
  --height-cm-nav: 4.25rem;

  /* Motion */
  --ease-cm-out: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-cm-reveal: 700ms;
  --duration-cm-morph: 950ms;
}
```

**Next.js note:** If Inter is already loaded via `next/font`, bind `--font-inter` in `:root` from the font variable so `--font-cm-sans` resolves cleanly.

### 6.2 Utility mapping cheat sheet

Use these as the default translation from prototype CSS to Tailwind utilities:

| Prototype | Tailwind (cm namespace) |
|-----------|-------------------------|
| `background: var(--bg)` | `bg-cm-bg` |
| `background: var(--bg-alt)` | `bg-cm-bg-alt` |
| `color: var(--ink)` | `text-cm-ink` |
| `color: var(--ink-muted)` | `text-cm-ink-muted` |
| `border-color: var(--border)` | `border-cm-border` |
| `max-width: var(--container)` | `max-w-[var(--width-cm-container)]` or add `--container-cm` to `@theme` |
| `padding-inline: var(--gutter)` | `px-[var(--spacing-cm-gutter)]` |
| `padding-block: var(--section-y)` | `py-[var(--spacing-cm-section)]` |
| `letter-spacing: var(--tr-label)` + uppercase | `tracking-[var(--tracking-cm-label)] uppercase` |
| `font-family: serif accent` | `font-cm-serif italic font-normal` |
| Midnight hero/footer | `bg-cm-dark text-cm-dark-ink` |

**Glass nav (approximate Tailwind):**

```txt
fixed inset-x-0 top-0 z-50 h-[var(--height-cm-nav)] border-b border-transparent transition-colors
data-[scrolled=true]:border-cm-border data-[scrolled=true]:bg-cm-bg/80 data-[scrolled=true]:backdrop-blur-md data-[scrolled=true]:backdrop-saturate-150
```

**Pill primary button:**

```txt
inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-cm-ink px-5 py-3 text-sm font-medium text-cm-bg transition hover:-translate-y-px hover:bg-black
```

**Ghost button:**

```txt
inline-flex items-center justify-center gap-2 rounded-full border border-cm-border bg-transparent px-5 py-3 text-sm font-medium text-cm-ink transition hover:border-cm-ink
```

**Eyebrow label with dot:**

```txt
mb-5 inline-flex items-center gap-2 text-[0.78rem] font-medium uppercase tracking-[var(--tracking-cm-label)] text-cm-ink-muted
```

Dot span:

```txt
size-1.5 rounded-full bg-cm-ink/80
```

**Reveal section (client):**

```txt
translate-y-3 opacity-0 transition duration-[var(--duration-cm-reveal)] ease-[var(--ease-cm-out)] data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100
```

**Articles card (composite):**

```txt
flex min-h-[260px] flex-col gap-[0.9rem] rounded-[14px] border border-cm-border-soft bg-cm-surface p-7 transition hover:-translate-y-0.5 hover:border-cm-border
```

### 6.3 Example semantic layout utilities (optional layer)

If you prefer semantic aliases **without** overwriting production tokens:

```css
@utility cm-prose {
  max-width: var(--width-cm-reading);
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--color-cm-ink-muted);
}
```

---

## 7. Template-specific implementation notes

### 7.1 `fragmentation-stages-gsap`

- **Pinned horizontal scroll:** `.deck` is `100vh` / `100dvh`; track is `display: flex; width: max-content`; GSAP drives `x` transform.
- **Typography:** `.slide__title` uses extreme `clamp(3.4rem, 9vw, 7.5rem)` — keep line length short; viz column maxes SVG around `640px` width.
- **Reduced motion:** deck becomes vertical stack; animations frozen in “revealed” state.

### 7.2 `fragmentation-stages-morph`

- **Two-column desktop:** sticky viz (`bg-alt`) + scrolling text; below `960px` adjust sticky height and stack.
- **Stage state:** `[data-stage="1"]` … `[data-stage="6"]` on `.viz` drives node positions; edges use stroke-dash animation.
- **Dialogs:** `::backdrop` uses warm ink tint + blur—mirror in React with Radix/shadcn `Dialog` and same rgba.

### 7.3 `fragmentation-stages-steps`

- **Table-of-contents rows:** three-column grid (`4rem | 14rem | 1fr`) collapses at `900px`.
- **Hover:** row background `color-mix(in srgb, var(--bg-alt) 60%, transparent)`.

### 7.4 `audience-concept-modern` & `articles-concept-modern`

- Always load **homepage** base first to inherit nav, footer, buttons, reveal, core tokens.
- Extensions only define **delta** blocks—keep this pattern in React (shared layout + route-specific CSS module or Tailwind layer).

---

## 8. Token summary (machine-readable)

```yaml
concept_modern:
  colors:
    bg: "#faf6ee"
    bg_alt: "#f2ece0"
    surface: "#ffffff"
    ink: "#19150f"
    ink_muted: "#6b6660"
    ink_soft: "#9f978b"
    border: "#e6ddcb"
    border_soft: "#efe7d6"
    dark: "#141110"
    dark_ink: "#f4efe5"
    dark_muted: "rgba(244, 239, 229, 0.62)"
    dark_border: "rgba(244, 239, 229, 0.14)"
  fonts:
    sans: Inter
    serif_accent: Instrument Serif
    mono: ui-monospace stack
  layout_px:
    container_default: 1200
    container_gsap: 1280
    container_narrow_min: 740
    container_narrow_max: 760
    reading_max: 640
    nav_height: 68
  motion:
    ease_primary: "cubic-bezier(0.22, 1, 0.36, 1)"
    reveal_ms: 700
    morph_ms: 950
```

---

## 9. Freedom to iterate (explicit)

This charter is intentionally **prescriptive on tokens and primitives** and **non-prescriptive on narrative, exact copy, section count, and motion choreography**. Safe directions to explore:

- Introduce a **single** saturated accent (for example a link underline or progress bar) if accessibility contrast requires it.
- Swap Instrument Serif for another **high-contrast** editorial serif—keep the “italic for emphasis only” rule.
- Replace ink CTAs with **production `primary`** when merging into the Stitch-aligned site.
- For React, prefer **composable sections** (`<Section>`, `<Eyebrow>`, `<Prose>`) matching existing movemental primitives while mapping colors to `cm-*` or to merged semantic tokens.

---

## 10. File references (canonical prototype paths)

- `docs/html/homepage-concept-modern/styles.css`
- `docs/html/fragmentation-concept-modern/styles.css`
- `docs/html/fragmentation-stages-gsap/styles.css`
- `docs/html/fragmentation-stages-morph/styles.css`
- `docs/html/fragmentation-stages-steps/styles.css`
- `docs/html/audience-concept-modern/styles.css`
- `docs/html/articles-concept-modern/styles.css`

When in doubt, the **homepage** stylesheet is the **default source of truth** for shared tokens; other files document **extensions** or **alternate shells** (deck/morph).
