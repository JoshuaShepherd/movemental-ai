# Movemental design system — Concept Modern (warm editorial)

> **Charter shift — 2026-04-17.** The Movemental design system is now **Concept Modern**: warm cream paper (`#faf6ee`), near-black ink (`#19150f`), hairline sectioning, Inter body with **Newsreader italic** for emphasis, and ink-filled **999px pill** CTAs. The previous "Digital Curator" cool ramp (`#f7f9fb` / `#2a3439` / blue `#0053db`) has been replaced at the token level. Semantic tokens (`bg-background`, `text-foreground`, `bg-primary`, `border-border`) keep their names — only the **values** moved — so most existing components continue to work without edit. Midnight (`--inverse-surface` = `#141110` / `--inverse-foreground` = `#f4efe5`) remains the regional dark band for authority moments, and the user-facing light/dark toggle now switches between the cream-paper day theme and a deep-ink night theme.

## How to use this document

This file is the **canonical design charter** for the Movemental organizational site: creative direction, semantic color model, typography rules, spacing philosophy, elevation, component layering, and how those ideas map into the repo.

**Implementation lives in code.** Literal color values, Tailwind v4 `@theme inline` wiring, base-layer typography, and motion safeguards are defined in `src/app/globals.css`. Primitives, navigation, sections, and pages live under `src/components/` and `src/app/`. When this document and the codebase disagree, treat that as a bug: fix both in one change so they stay aligned.

**Static HTML (Core `1-html` library).** Operational SSOT for templates, `<head>` contracts, token parity with `globals.css`, primitive mapping, forbidden patterns, and **copy-paste agent prompts** is [STATIC_HTML_AND_TEMPLATES.md](./STATIC_HTML_AND_TEMPLATES.md). The relocated tree index stub is [README.md](../html/README.md). **Sibling static mirror (Oatmeal HTML):** [MOVEMENTAL_HTML_TEMPLATE.md](./MOVEMENTAL_HTML_TEMPLATE.md) — full page manifest (54 HTML files), CSS namespaces (`mh-*`, `sf-*`, …), `js/main.js` interaction map, token translation, sync decisions, and what **not** to port into this repo. Per-page agent prompts: [html-template-exemplars-index.md](../build/prompts/html-template-exemplars-index.md).

**Process vs. product.** Step-by-step Stitch migration, CLI commands, and validation checklists are in [docs/build/prompts/stitch-to-react-migration.md](../build/prompts/stitch-to-react-migration.md). That prompt **imports** the rules here; it does not replace them.

### Document map (quick navigation)

| Area | Primary section |
| ---- | ----------------- |
| Brand intent, pillars, quality bar | §1 |
| Token stack & implementation chain | §2 |
| Color, surfaces, elevation, radius | §3 (incl. Midnight + light/dark policy §3.6–3.9) |
| Layout, spacing, grid, breakpoints | §4 |
| Typography & reading experience | §5 |
| Motion, interaction, accessibility | §6 · html-template parity [MOTION.md](./MOTION.md) §8 |
| Primitives & UI shell | §7–§8 |
| Stitch translation & patterns | §11–§12 |
| Static HTML parity | §14 |
| Imagery, performance, forms polish | §15 |
| Change control | §16 |
| Concept Modern (marketing editorial) | §17 |
| Stitch-surface tokens (`safestart-*`, product rails) | §18 |
| Concept Modern HTML → React agent prompts | [docs/build/prompts/concept-modern-html-to-react-prompts.md](../build/prompts/concept-modern-html-to-react-prompts.md) |

---

## 1. Creative north star

The interface is a **warm editorial product UI** — Notion, Anthropic marketing, and Medium are the register. Cream paper surfaces, near-black ink typography, flat hierarchy, **hairline** structure instead of heavy cards. Premium quality comes from **typography and whitespace**, not ornament.

### Editorial signature principles

- **Typography is the interface.** Prefer type scale, measure (`ch`), and whitespace over boxes and shadows.
- **Sectioning via lines and bands.** `border-top` / full-bleed grid borders on `--border`; alternate sections use `--section` (the alt paper tone). Avoid decorative box-shadow except dialogs.
- **Italic serif = emphasis layer only.** Wrap stressed words in `<em>` inside display headings or short lines — the base layer swaps them to **Newsreader italic** at ~1.04em optical compensation. Never use serif for multi-paragraph body copy.
- **Restraint.** Color is essentially **duotone** — warm paper + near-black ink — with a **Midnight** regional band for authority moments. Motion is subtle and scroll-linked (700ms reveal at `cubic-bezier(0.22, 1, 0.36, 1)`).
- **Breathing layout.** If something feels crowded, **add padding**. Do not shrink type to fit a container. Layout tokens (`--container-max`, `--section-y-*`) exist so pages share one outer rail and vertical cadence.

### 1.1 Experience pillars (charter)

These pillars translate “editorial premium” into decisions under pressure:

1. **Clarity over cleverness.** Readers should understand the offer and the next step without decoding layout tricks. Asymmetry and stagger exist to **orient**, not to puzzle.
2. **Trust through inspectability.** Claims sit next to how they were formed (sources, caveats, methodology). Visual polish never substitutes for honest framing (see L2b / §14.2).
3. **One voice, one system.** Inter + semantic tokens + shared primitives keep the site feeling like one publication, not a collage of third-party widgets.
4. **Accessible by default.** Color contrast, focus visibility, motion restraint, and semantic HTML are part of the brand—not a compliance patch.
5. **Calm motion.** Movement confirms state and directs attention; it does not entertain for its own sake (see §6).
6. **Token discipline.** If a new color or shadow is needed, it enters `:root` / `@theme` and this document together—never as a one-off in a page file.

### 1.2 Quality bar (“what award-level means here”)

- **Continuity:** Any page should feel like the next chapter of the same house style—shared outer rail, section cadence, and type roles—not a one-off landing template.
- **Tonal architecture:** Major transitions happen through **surface ramp shifts** and Midnight bands, not borders, heavy outlines, or rainbow accents.
- **Typography-first hierarchy:** Headings earn attention through scale and spacing; body copy stays comfortable for long reading (`Prose` measure and line height).
- **Restraint in brand color:** **Ink** (`bg-primary` / `text-primary`) is **sparse**—reserved for primary CTAs, key action links, and focus—so the pill stays legible and credible (Concept Modern; see §3.2).
- **Craft in defaults:** Loading states, empty states, errors, and focus rings should look considered, not “developer default.”

### 1.3 Non-goals

- **No duplicate palette systems.** User-facing dark mode uses the **same CSS variables** as light (`.dark` on `<html>` overrides values — see §3.7–3.8). Do not introduce a parallel set of ad-hoc hex utilities in TSX.
- **No decorative noise:** parallax stacks, gratuitous particle fields, neon gradients, or stock “tech” tropes that fight the editorial voice.
- **No type shrinking** to force fit; change composition or spacing instead.

---

## 2. Design chain — tokens to layouts

Work **bottom-up**: settle tokens and primitives before composing pages. This mirrors the build order in the migration prompt.

| Layer | Role | Location in repo | Static HTML parity (Core `1-html/labs/movemental-ai/docs-html`) |
| ----- | ---- | ----------------- | -------------------------------- |
| **L0 — Design tokens** | Colors, radii, shadows, layout metrics, font stack | `:root` and `@theme inline` in `src/app/globals.css` | `:root` in [docs/html/site-templates/site-theme.css](../../../1-html/labs/movemental-ai/docs-html/site-templates/site-theme.css) — **numeric parity** with `globals.css` (see [STATIC_HTML_AND_TEMPLATES.md §4](./STATIC_HTML_AND_TEMPLATES.md)); static HTML may load Inter + Newsreader via `<link>` for preview—production uses **`next/font`** for both (see §17.3) |
| **L1 — Global base** | `html`/`body`, heading defaults, Midnight scoping, selection, reduced motion | `@layer base` in `src/app/globals.css` | Base reset + `html`/`body` + link defaults + `prefers-reduced-motion` guard in `site-theme.css` |
| **L2 — Primitives** | Section bands, max-width container, display type, eyebrow, prose column, editorial arrow link | `src/components/primitives/*` | `site-theme.css`: `.band-midnight`, `.band-section`, `.band-default`, `.container`, `.prose`, `.eyebrow`, `.display`, `.lede`, `.card`, `.grid-3`, `.btn-row`, `.btn` / `.btn-primary` / `.btn-ghost`. **Canonical midnight band:** `.band-midnight` (templates). **Legacy (root prototypes):** `.section--surface-midnight` — same token intent; migrate markup to `.band-midnight` when convenient. |
| **L2b — Trust / evidence** | Grounded citations, inspectability, relationship to sources | (compose with `Prose`, `Card`, `Section` in TSX) | `site-theme.css`: `.evidence-note`, `.evidence-note--inverse`, `.pull-quote`, `.pull-question`, `.relationship-row`, `.references`, `.figure-doc` — see §14 |
| **L3 — UI shell** | Accessible controls from shadcn/ui (Button, Card, Input, …) | `src/components/ui/*` (generated; avoid hand-editing for one-off visuals) | Static mocks: `.btn` / `.btn-primary` / `.btn-ghost` (no React). Prefer **`Button`** in TSX when building product. |
| **L4 — Domain chrome & sections** | Site nav, footer, mobile drawer; reusable homepage blocks | `src/components/nav/*`, `src/components/sections/*` | **Two static shells (do not fork):** (1) **Draft templates** — `site-theme.css`: `.site-top`, `.site-nav`, `.site-footer`; mobile toggle via [site-shell.js](../../../1-html/labs/movemental-ai/docs-html/site-templates/site-shell.js). (2) **Root long-form prototypes** (`docs/html/*.html`) — glass **`.site-header`**, two-tier nav (site-wide links + in-page anchors), **`.site-drawer`** / **`.nav-toggle`** in [`prototype-pages.css`](../../../1-html/labs/movemental-ai/docs-html/site-templates/prototype-pages.css); drawer behavior stays as a small **inline** script at the bottom of each page (same pattern as production `Sheet`). **Nav / UI galleries:** [exemplar-top-nav-header.html](../../../1-html/labs/movemental-ai/docs-templates/alan-hirsch/exemplars/exemplar-top-nav-header.html) (glass bar, sticky shell, mega-row), [exemplar-ui-components.html](../../../1-html/labs/movemental-ai/docs-templates/alan-hirsch/exemplars/exemplar-ui-components.html) (buttons, chips, cards, forms). **Do not** paste duplicate L4 chrome CSS into page `<style>` blocks—extend the shared stylesheets. Maintenance: [scripts/sync-docs-html-nav.py](../../scripts/sync-docs-html-nav.py) rewrites the two-tier header block; [scripts/dedupe-docs-html-chrome-css.py](../../scripts/dedupe-docs-html-chrome-css.py) strips accidental re-duplication. |
| **L5 — Routes & layouts** | Pages, route groups, metadata | `src/app/**/page.tsx`, `src/app/layout.tsx`, `src/app/(site)/layout.tsx` | Standalone `.html` under `docs/html/` and `docs/html/site-templates/`; compose from shared CSS + optional page-local `<style>` for one-offs only |

**Consumption rule:** upper layers may depend on lower layers only. Pages compose sections and primitives; primitives use tokens. **Do not** hardcode hex or raw Tailwind palette colors in TSX—only semantic utilities backed by `globals.css`.

---

## 3. Color & surface model (L0)

The palette is a **warm duotone**: cream paper plus near-black ink, with an optional deep-ink **Midnight** band. Names below use **semantic** tokens (what designers say) and **Tailwind utilities** (what engineers type). They refer to the same underlying CSS variables.

### 3.1 Surface ramp (tonal layering)

Depth is **tonal stacking** between paper tones, plus **hairline** structure for cards, path steps, and inset asides. A `bg-card` block on `bg-section` is the default "ghost lift"; full-bleed hairlines on `--border` are allowed for structural grids.

| Semantic | CSS variable | Typical utilities | Hex (light theme) |
| -------- | ------------ | ----------------- | ----------------- |
| Paper (base) | `--background` | `bg-background` | `#faf6ee` |
| Alt band | `--section` | `bg-section`, `bg-muted` | `#f2ece0` |
| Card / sheet | `--card` | `bg-card` | `#ffffff` |
| Card text | `--card-foreground` | `text-card-foreground` | `#19150f` |
| Elevated band | `--elevated` | `bg-elevated` | `#f2ece0` |
| Deepest paper / input well | `--surface-highest` | `bg-surface-highest` | `#efe7d6` |
| Muted fill (alias of section) | `--muted` | `bg-muted` | `#f2ece0` |
| Primary ink | `--foreground` | `text-foreground` | `#19150f` |
| Secondary ink | `--muted-foreground` | `text-muted-foreground` | `#6b6660` |
| Tertiary ink / meta | `--ink-soft` | `text-ink-soft` | `#7e786f` |
| Midnight band | `--inverse-surface` | `bg-inverse-surface` | `#141110` |
| On midnight | `--inverse-foreground` | `text-inverse-foreground` | `#f4efe5` |

**Hairline rule:** Structural hairlines on `--border` (cream `#e6ddcb`) are **allowed** between cards, path steps, ledger rows, and inset asides — the register is flat editorial, not only ghost-lift cards. Do not use hairlines to "stripe" entire viewport-width bands; tonal alternation (`default` vs `section`) remains the primary section rhythm.

**Forms:** use `border-border` (cream at token opacity) for fields, focus rings, and other accessibility-driven edges.

### 3.2 Brand & state

**"Primary" is ink.** In Concept Modern, the CTA is an **ink-filled 999px pill** — not a saturated brand color. `bg-primary` resolves to near-black ink in light mode and to warm cream in dark mode. The pill is the brightest object on the page either way.

| Role | CSS variable | Utilities | Hex (light) |
| ---- | ------------ | --------- | ----------- |
| Primary (ink pill) | `--primary` | `bg-primary`, `text-primary` | `#19150f` |
| Primary dim (hover) | `--primary-dim` | `bg-primary-dim` | `#000000` |
| On primary (paper) | `--primary-foreground` | `text-primary-foreground` | `#faf6ee` |
| Secondary fill (alt band) | `--secondary` | `bg-secondary` | `#f2ece0` |
| On secondary | `--secondary-foreground` | `text-secondary-foreground` | `#19150f` |
| Accent (deepest paper) | `--accent` / `--accent-foreground` | `bg-accent`, `text-accent-foreground` | `#efe7d6` / `#19150f` |
| Destructive | `--destructive` | `bg-destructive`, `text-destructive` | `#9c2d20` |
| On destructive | `--destructive-foreground` | `text-destructive-foreground` | `#ffffff` |

**Restraint.** Large fields of saturated color read as cheap; the ink register reads as premium. Use `bg-primary` only for actions, links that behave like actions, and high-priority focus. Pill hover lifts by `translateY(-1px)` and darkens to `--primary-dim`.

**CTA gradient (rare):** `linear-gradient(135deg, var(--primary), var(--primary-dim))` is exposed as `--gradient-primary` for bespoke moments. Default is flat ink.

### 3.3 Chrome & outlines

| Role | CSS variable | Utilities | Notes |
| ---- | ------------ | --------- | ----- |
| Hairline (structural) | `--border` | `border-border` | Cream `#e6ddcb` — hairline structure between cards, rows, grids |
| Hairline (softer) | `--border-soft` | `border-border-soft` | `#efe7d6` — inside cards or groups where the main hairline feels heavy |
| Field chrome | `--input` | `border-input` | `#8b8479` (clears WCAG 1.4.11 UI 3:1 against paper) |
| Focus ring | `--ring` | `ring-ring` | Ink at 20% opacity |
| Outline reference | `--outline` | (use via border token) | `#7e786f` (ink-soft) |
| Popover surface | `--popover` | `bg-popover` | `#ffffff` |
| Midnight hairline | `--inverse-border` | — | Cream at 14% opacity (for rules on Midnight) |

### 3.4 Elevation & glass

- **Ghost lift (preferred):** stack surfaces (`bg-card` on `bg-section`) before reaching for shadow. Cards and path steps may add a hairline `border-border` for extra definition.
- **Ambient shadow (dialog-only):** `shadow-ambient` maps to `--shadow-ambient-value` (`0 24px 80px rgba(25, 21, 15, 0.12)` light, deeper under `.dark`). Reserved for dialogs and the rare floating moment. No arbitrary `shadow-md` / `shadow-lg`.
- **Glass navigation:** the header is **transparent** over the hero and flips to `bg-background/80` + `backdrop-blur-md backdrop-saturate-150` + a `border-b border-border` hairline once scrolled past 20px (see `SiteNav` + `NavScrollShadow`).

### 3.5 Radius scale

- **Base `--radius`:** `0.625rem` (10px) — form controls, inner controls, skip-link chips.
- **`--radius-card` (14px):** cards, dialogs, query cards, hero images — reach for `rounded-card`.
- **`--radius-pill` (9999px):** **all buttons and CTAs.** Use `rounded-pill` (or `rounded-full` for backward compatibility).
- **Tailwind scale:** `rounded-xs` → `rounded-xl` step off the base. Marketing primitives should prefer `rounded-card` for surfaces and `rounded-pill` for interactive pills.

### 3.6 Regional inverse — “Midnight” bands (in-page dark)

Midnight is the **canonical dark surface** inside the marketing experience: `Section variant="midnight"` maps to `--inverse-surface` / `--inverse-foreground` and sets `data-variant="midnight"` so base-layer headings inherit inverted ink.

**Ink hierarchy on Midnight** (there is no separate `--inverse-muted-foreground` token today—use controlled opacity on the inverse ink):

| Layer | Utility pattern | Notes |
| ----- | ----------------- | ----- |
| Primary heading | `text-inverse-foreground` | Titles, display lines |
| Body / supporting | `text-inverse-foreground/80` to `/90` | Longer paragraphs |
| Meta / de-emphasis | `text-inverse-foreground/50` to `/70` | Eyebrows, captions, list markers |
| Inset cards / wells | `bg-inverse-foreground/6` to `/10` | Ghost surfaces **on** Midnight—still no decorative borders |

**Primary on Midnight:** Keep `text-primary` / `bg-primary` for actions where contrast allows; pair with **`focus-visible:ring-primary`** and a **ring offset** on the inverse surface (`focus-visible:ring-offset-2 focus-visible:ring-offset-inverse-surface`) so focus remains visible.

**`color-scheme`:** In **light** mode the root uses `color-scheme: light`. When **`html.dark`** is set (user-chosen global dark via `next-themes`), the root uses `color-scheme: dark` so native controls match. Midnight regions still use inverse tokens; popover/sheet chrome follows the **active** global theme variables.

### 3.7 Global theme modes (policy)

| Mode | Status | Implementation |
| ---- | ------ | ---------------- |
| **Light** | **Shipped** | `:root` tokens in `src/app/globals.css`; `html { color-scheme: light; }` when not `.dark` |
| **Dark (user / system)** | **Shipped** | `.dark` on `<html>` (via `next-themes`, `ThemeProvider` in `src/app/providers.tsx`) assigns the parallel ramp in `globals.css`; `html.dark { color-scheme: dark; }` |
| **Midnight (regional dark)** | **Shipped** | `Section variant="midnight"` + `[data-variant="midnight"]` base styles; uses `--inverse-surface` / `--inverse-foreground` |

**Default for new visitors:** `defaultTheme="system"` — the site follows OS light/dark until the user toggles, at which point the explicit choice is stored under the `movemental-theme` key (see [`docs/build/prompts/global-dark-mode-theme-rollout.md`](../build/prompts/global-dark-mode-theme-rollout.md)).

**Midnight + global dark (Option A):** `--inverse-surface` / `--inverse-foreground` **keep the same hex values** as in light mode. The global dark body/card ramp is **lifted lighter** than `#101820` so Midnight bands remain a distinct, deeper editorial moment.

**Tailwind `dark:`:** `tailwind.config.ts` uses `darkMode: "class"`. shadcn components may ship `dark:` utilities; prefer **semantic tokens** (`bg-card`, `text-foreground`) so most UI needs **no** `dark:` branches in marketing code.

### 3.8 Global dark surface ramp (hex reference)

When `html` has class `dark`, these values apply — Concept Modern inverts the ramp (deep-ink paper, cream ink, low-opacity hairlines). See `src/app/globals.css` `.dark { … }` — treat code as SSOT if this table drifts:

| Semantic | CSS variable | Typical utilities | Hex (dark theme) |
| -------- | ------------ | ------------------- | ---------------- |
| Paper (ink) | `--background` | `bg-background` | `#141110` |
| Alt band | `--section` | `bg-section`, `bg-muted` | `#1b1714` |
| Card / sheet | `--card` | `bg-card` | `#211c18` |
| Card text | `--card-foreground` | `text-card-foreground` | `#f4efe5` |
| Elevated band | `--elevated` | `bg-elevated` | `#1b1714` |
| Deepest / input well | `--surface-highest` | `bg-surface-highest` | `#2a241f` |
| Muted fill | `--muted` | `bg-muted` | `#1b1714` |
| Primary ink (cream) | `--foreground` | `text-foreground` | `#f4efe5` |
| Secondary ink | `--muted-foreground` | `text-muted-foreground` | cream @ 72% |
| Tertiary ink / meta | `--ink-soft` | `text-ink-soft` | cream @ 54% |
| Midnight band | `--inverse-surface` | `bg-inverse-surface` | `#141110` (same) |
| On midnight | `--inverse-foreground` | `text-inverse-foreground` | `#f4efe5` (same) |

**Brand & chrome (dark):** `--primary` flips to **cream** (`#f4efe5`) with **ink** foreground (`#141110`) — the pill stays the brightest object on the page. `--primary-dim` is pure `#ffffff`. `--border` uses cream at 14% opacity; `--border-soft` at 8%; `--ring` at 28%. `--destructive` lifts to `#e08c7f` for dark-surface legibility.

**Midnight on dark:** Midnight bands keep their canonical `#141110` / `#f4efe5` — they remain distinct from the slightly-warmer `--background` paper (`#141110` vs `#141110` are the same hex; the distinction comes from surrounding content, not the band color).

**Ambient shadow:** `--shadow-ambient-value` retints to `0 24px 80px rgba(0, 0, 0, 0.55)` under `.dark` (see `@theme inline` mapping in `globals.css`).

### 3.9 Contrast, states, and semantics

- **Targets:** Aim for **WCAG 2.2 AA** minimum for body text (4.5:1) and **3:1** for large display type and meaningful non-text cues where applicable. Primary actions must remain distinguishable in **hover**, **focus**, and **disabled** states—not only at rest.
- **Disabled:** Muted ink and reduced opacity are acceptable; never remove visible boundaries from controls that still look clickable.
- **Links vs buttons:** Use **primary-colored text + underline on hover** inside prose; reserve filled **primary** buttons for the one or two most important actions per view.
- **Don’t rely on color alone** for errors—pair `destructive` with copy or iconography.

---

## 4. Layout & spacing (L0 + L2)

These custom properties are exposed in `@theme inline` for use in arbitrary utilities or primitives:

| Token | Value | Usage |
| ----- | ----- | ----- |
| `--container-max` | `1200px` | `Container` default max width |
| `--container-narrow` | `740px` | `Container width="narrow"` intro bands |
| `--prose-max` | `640px` | `Prose` / `Container width="reading"` long-form measure |
| `--section-y-sm` | `clamp(3rem, 6vw, 4.5rem)` | Default section vertical padding |
| `--section-y-lg` | `clamp(5rem, 10vw, 8rem)` | Hero / landmark vertical padding |

**`Container`** (`src/components/primitives/container.tsx`): `max-w-[var(--container-max)]` with responsive horizontal padding `px-4 sm:px-6 lg:px-12`.

**`Section`** (`src/components/primitives/section.tsx`): full-bleed vertical band. Props:

| Prop | Values | Behavior |
| ---- | ------ | -------- |
| `variant` | `default`, `section`, `elevated`, `midnight` | Maps to `bg-background`, `bg-section`, `bg-elevated`, `bg-inverse-surface` (+ text pairs) |
| `spacing` | `sm` (default), `lg` | Maps to `--section-y-sm` / `--section-y-lg` |
| `as` | any polymorphic element | Default `section` |

Midnight sections set `data-variant="midnight"` for base-layer heading color overrides scoped to the band.

**Site layout** (`src/app/(site)/layout.tsx`): fixed `SiteNav` with `main` using `pt-16` so content clears the bar; pages that need the hero to tuck under the nav may apply a negative top margin on the first band (documented in layout comments).

### 4.1 Spacing rhythm & density

- **Baseline:** Think in **4px** steps (Tailwind’s default spacing scale). Prefer `gap-*`, `space-y-*`, and padding on **containers** over margin hacks between arbitrary wrappers.
- **Section verticals:** `--section-y-sm` (80px) is the default band; `--section-y-lg` (120px) marks **openings**, **heroes**, and **major narrative turns**. Do not invent new vertical gaps per page without a token rationale.
- **Density rule:** Marketing pages skew **airy**. If a band feels tight, increase **padding** or **split content across bands** before shrinking type (see §1.3).

### 4.2 Grid, composition, and alignment

- **Outer rail:** `Container` defines the horizontal safe area; avoid full-bleed text blocks that collide with the viewport edge on mobile.
- **Asymmetry:** Deliberate imbalance (e.g. `FeatureSplit`, staggered cards) should still snap to a **consistent** max width and baseline grid so the looseness reads as editorial, not broken alignment.
- **Reading column:** Keep long copy at or below **`--prose-max`** (`680px`) for legibility; sidebars, metadata, and CTAs can sit outside `Prose` in a split layout.

### 4.3 Breakpoints & responsive behavior

- **Mobile-first:** Author default styles for small viewports, then enhance at `sm` / `md` / `lg` / `xl` as needed—especially for `Display` sizes (see `display.tsx` responsive steps).
- **Nav & drawers:** Respect fixed chrome height; don’t place critical actions where the mobile drawer or browser UI will obscure them.
- **Avoid horizontal scroll** for primary content; horizontal **scroll-snap rails** (e.g. testimonials) are allowed when labeled and keyboard-accessible.

---

## 5. Typography (L0 + L1 + L2)

**Fonts:**

- **Inter** is the sole UI and long-form sans, loaded via `next/font/google` in `src/app/layout.tsx` with CSS variable `--font-sans`. Weights **400 / 500**.
- **Newsreader** (400/500, normal + italic) is loaded via `next/font` as `--font-serif-display` for the **italic emphasis layer** — `<em>` inside display headings, stage names, pull quotes, and short labels. **Never** set it as the body font; never use it for multi-paragraph reading columns.

**Body defaults:** `font-size: 17px; line-height: 1.55; font-feature-settings: "kern", "liga", "cv11"` (single-story `g`). Antialiased rendering is set at `html` level — do not override.

**Heading weight:** **500 for h1–h4** (not 700). Hierarchy comes from **scale + tracking**, not heft. Letter-spacing: `-0.028em` for display lines (`--tracking-display`), `-0.022em` for tight sans leads (`--tracking-tight`), `0.09em` uppercase for eyebrows / labels (`--tracking-eyebrow`).

**Italic emphasis convention.** Wrap stressed words in `<em>` inside headings or short lines — the base layer in `globals.css` automatically applies:

```css
font-family: var(--font-serif);
font-style: italic;
font-weight: 400;
letter-spacing: -0.01em;
font-size: 1.04em;
```

This keeps the typography **uniform** across primitives: authors just write `<em>` and get the editorial italic without per-component class juggling.

**Utilities:** Tailwind `font-serif` / `font-serif-display` both map to `var(--font-serif-display)`; `tracking-display` / `tracking-tight` / `tracking-eyebrow` and the fluid `text-display` / `text-h1` / `text-h2` / `text-h3` / `text-h4` sizes are defined in `tailwind.config.ts`.

### 5.1 Type roles (product mapping)

| Role | Spec | Implementation |
| ---- | ---- | -------------- |
| Display / hero | Tight tracking `-0.02em`, semibold–bold feel, balanced lines (`text-balance` where appropriate) | **`Display`** primitive (`font-semibold`, responsive steps in `display.tsx`); global `h1` gets `-0.02em` |
| Headline | `tracking-tight`, `text-foreground` | Default `h2`–`h4` in `@layer base` |
| Eyebrow / label | ~12px, uppercase, widened tracking, muted | **`Eyebrow`** (`text-muted-foreground`) |
| Body (marketing) | Comfortable line height (~1.7), muted default ink | **`Prose`**: `text-muted-foreground`, `leading-[1.7]`, max width `--prose-max`; emphasis → `text-foreground` |
| Inline links in prose | Primary, underline on hover | **`Prose`** `a` → `text-primary` |
| UI labels / buttons | Refer to shadcn / `tailwind.config.ts` `fontSize.label` / `button` | Keep UI dense controls readable at default browser zoom |

### 5.2 Named scale (Tailwind extension)

`tailwind.config.ts` defines a **reference scale** (`display`, `h1`–`h4`, `body`, `body-lg`, `small`, `label`, `button`, `micro`) with line heights and weights. Marketing routes should still **prefer primitives** (`Display`, `Eyebrow`, `Prose`) so spacing and color track this charter; use the named sizes when a leaf component needs explicit parity with design tooling.

### 5.3 Hierarchy rules

- **One display-class hero per page** in typical marketing flows; downstream landmarks use `Display` `md`/`sm` or semantic headings.
- **Avoid all-caps paragraphs;** caps are for **eyebrows**, **micro labels**, and **small UI chrome** only.
- **Quotes / pull quotes** use `PullQuote` (L2) so attribution, weight, and band contrast stay consistent—don’t freestyle blockquote styles per page.

### 5.4 Numbers, symbols, and code

- **Tabular numerals** (`font-variant-numeric: tabular-nums`) are appropriate for **StatStrip**, pricing comparisons, and any aligned columns of figures—add at the component level, not globally on `body`.
- **Monospace** (`theme.extend.fontFamily.mono`) is for **code, technical IDs, and data snippets**—not for marketing headings.

### 5.5 Language & localization (forward-looking)

Inter covers the site’s **Latin** marketing copy. If localized routes ship later: audit **line length** per script, **hyphenation**, and **translated string expansion** (German, etc.); do not assume English-based `truncate` or narrow chips will fit without layout tests.

Long-form **legal** pages may use `Prose` or article-specific wrappers but must still obey token rules (no raw grays).

---

## 6. Motion, interaction, and accessibility

### 6.1 Motion language (tokens + intent)

Motion sells **confidence**—small, fast transitions for hover/focus; slightly longer easing for **entrance** of key panels. Avoid cinematic durations on utility UI.

| Token | Value (in `globals.css`) | Typical use |
| ----- | ------------------------ | ----------- |
| `--duration-fast` | `150ms` | Color/opacity, hover border |
| `--duration-normal` | `300ms` | Height accordions, drawers |
| `--duration-slow` | `450ms` | Large reveals (sparingly) |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Decelerating entrances |
| `--ease-expressive` | `cubic-bezier(0.4, 0, 0.2, 1)` | Material-style emphasis |

Tailwind exposes these as **`duration-fast` / `duration-normal` / `duration-slow`** and **`ease-out` / `ease-expressive`** (`transitionDuration` / `transitionTimingFunction` in `tailwind.config.ts`). Prefer them over arbitrary `duration-[437ms]`.

**Keyframes shipped:** `accordion-down` / `accordion-up`, `fade-up`, `fade-in` (see `tailwind.config.ts`). Use **`fade-up` / `fade-in`** only for **hero or one-off reveals**, never for lists that repaint on scroll (performance + motion sickness).

**Scroll-linked motion:** If using scroll-driven animations (GSAP, CSS scroll-timeline), **gate** them behind `prefers-reduced-motion: no-preference`, provide a static first paint, and never block reading the primary copy.

### 6.2 Interaction & feedback

- **Hover:** Prefer **tonal shift** (`bg-*` step, subtle `shadow-ambient` on cards) over aggressive scale transforms. If using **translate** or **scale**, keep amplitude small (≤ 2–4px / ≤ 1.02 scale) and duration fast.
- **Focus:** All interactive marketing components must expose **`focus-visible`** rings using **`ring-ring`** / **`ring-primary`** with sufficient offset on dark bands (see §3.6). Never `outline-none` without a replacement.
- **Active / pressed:** Buttons may darken slightly toward `primary-dim`; avoid multi-step bounce effects.
- **Loading:** Prefer **inline skeletons** or **quiet progress** that preserve layout stability; avoid blocking full-screen spinners unless submitting critical data.

### 6.3 Accessibility & inclusion

- **Reduced motion:** `prefers-reduced-motion: reduce` in `globals.css` collapses animation/transition duration and sets `scroll-behavior: auto`. Any JS-driven motion must **read the same media query** and skip or simplify timelines.
- **Keyboard:** Carousels/rails (`TestimonialRail`, etc.) must be **scrollable and focusable** without requiring a pointing device; do not trap focus except in intentional modals (`Dialog` / `Sheet`).
- **Semantics:** Landmarks (`main`, `nav`, `footer`), heading order, and **visible labels** trump `aria-label` shortcuts when text is already on screen.
- **Contrast:** On light bands, pair `foreground` / `muted-foreground` per §3; on Midnight, follow §3.6 opacity ladder—never `text-muted-foreground` directly on `inverse-surface` (it targets light surfaces).
- **Video / audio:** No autoplay with sound; captions or transcript links when speech carries meaning (`MediaVideo`).

---

## 7. Primitives catalog (L2)

| Component | File | Purpose |
| --------- | ---- | ------- |
| `Section` | `section.tsx` | Tonal vertical band; replaces “strip with border” |
| `Container` | `container.tsx` | Horizontal safe area + max width |
| `Display` | `display.tsx` | Hero display sizes (`lg` / `md` / `sm`) |
| `Eyebrow` | `eyebrow.tsx` | Overline / kicker |
| `Prose` | `prose.tsx` | Reading column body copy |
| `ArrowLink` | `arrow-link.tsx` | Editorial CTA row with arrow icon, sizes `sm`/`md`/`lg`, tones `primary`/`foreground` |
| `SurfaceCard` | `surface-card.tsx` | Marketing card with tonal ghost lift: `on-background` (shadow on hover when `interactive`), `on-section` (static `shadow-ambient`), `midnight` (inset inverse surface). Prefer over raw `rounded-xl bg-section` stacks; pairs with §12 Cards. |
| `FeatureSplit` | `feature-split.tsx` | Two-column **hero-split** composition (narrow intro + wide content) per §14.3 / `site-theme.css` `.hero-split`. |
| `StatStrip` / `StatItem` | `stat-strip.tsx` | Editorial KPI row: large primary numeral, label, optional hint — no chart chrome. |
| `EditorialComparisonTable` | `editorial-comparison-table.tsx` | Tonal comparison matrix (caption, thead on `elevated`, tbody rows alternate `background` / `section`). No decorative outer section borders; internal table semantics preserved for a11y. |
| `LogoStrip` | `logo-strip.tsx` | Partner / segment strip: consistent logo height or typographic fallback pills; optional links; muted default, full color on hover. |
| `MediaVideo` | `media-video.tsx` | `aspect-video` shell, `figure`/`figcaption`, optional transcript link; embed via `children` (e.g. `iframe` with `title`). Never autoplay with sound. |
| `InPageToc` | `in-page-toc.tsx` | Sticky anchor nav (“On this page”) for long routes — pills on `card`/`section`, no JS. |
| `Timeline` / `TimelineItem` | `timeline.tsx` | Vertical process / roadmap with primary node + spine between items. |
| `PullQuote` | `pull-quote.tsx` | L2b attributed quotation; variants `default` and `midnight`. |
| `TestimonialRail` / `TestimonialSlide` | `testimonial-rail.tsx` | Horizontal scroll-snap rail of `SurfaceCard` quotes; no auto-advance (reduced-motion safe). |
| `TopographicHero` | `studio/hero/TopographicHero.tsx` | The midnight / topographic hero on the home page. Eyebrow / italic display / lede / CTA-row composition with the home terrain image as ambient backdrop. |
| `LightTextureHero` | `studio/hero/LightTextureHero.tsx` | Light-default companion to `TopographicHero`. Same terrain image inverted to dark linework with `mix-blend-multiply` over cream paper. Use on light-themed marketing pages where a topographic hero is wanted but a midnight band is wrong. |

Each primitive sets a `data-slot` attribute for debugging and stable styling hooks.

### 7.1 Editorial Stitch palette (composed primitives)

Reusable cards, quotes, CTAs, and intros translated from the Stitch design-tool galleries. Authored against the [stitch-to-react migration prompt](../build/prompts/stitch-to-react-migration.md); semantic tokens only, lucide icons (not Material), `data-slot` attributes for debugging. All exports live at `@/components/editorial-stitch`.

| Component | File | Purpose |
| --------- | ---- | ------- |
| `AtmosphericMediaCard` | `editorial-stitch/atmospheric-media-card.tsx` | Full-bleed image card with gradient scrim, icon anchor, `ArrowLink` CTA. Min height 28rem. Use as a magazine-style feature card. |
| `DotTextureCard` | `editorial-stitch/dot-texture-card.tsx` | Tonal "dot field" surface with side media. Pattern uses `var(--outline)` so the texture stays on the semantic ramp. |
| `IconFeatureCard` | `editorial-stitch/icon-feature-card.tsx` | Icon-forward feature panel on a lifted inner surface (Ghost Lift). Requires per-card `eyebrow`. Pair with §12 Cards. |
| `MidnightStatementQuote` | `editorial-stitch/midnight-statement-quote.tsx` | Midnight band pull-quote with decorative `Quote` watermark. Distinct from `PullQuote variant="midnight"` (bar variant) — use this when the quote is the section's full editorial moment, not an inline quotation. |
| `GhostCtaPanel` | `editorial-stitch/ghost-cta-panel.tsx` | Centered Ghost Lift CTA slab — `shadow-ambient` + a single primary gradient button. **Single CTA only.** Multi-CTA closing panels stay bespoke. |
| `EditorialShowcaseIntro` | `editorial-stitch/showcase-intro.tsx` | Page-level intro lockup: eyebrow + display + description, left or center. Pass `titleAs="h2"` when the page already has an `h1`. |
| `EditorialPreviewWell` | `editorial-stitch/preview-well.tsx` | Tonal well for nesting nav / layout previews. |
| `StitchGlassTopBar` | `editorial-stitch/stitch-glass-top-bar.tsx` | Fixed glass top bar for **focused flows / assess-only layouts**. Marketing pages keep `SiteNav` from `(site)/layout.tsx`. |

**When to reach for one.** Before authoring a new card, quote, or intro lockup on a marketing page, check whether one of the above already covers the pattern. Improvising over the palette is the most common way the design system fragments. Conversely, **do not force a fit**: the green-light conditions in the [editorial-stitch promotion prompt](../build/prompts/editorial-stitch-and-light-texture-hero-promotion.md) §4 are load-bearing — numerals are not icons, multi-CTA is not single-CTA, midnight is not light. If the live pattern doesn't satisfy all green-lights, leave the existing code and file the gap in the palette gap log.

A 2026-05-08 audit ([`docs/build/plans/editorial-stitch-promotion-audit-2026-05-08.md`](../build/plans/editorial-stitch-promotion-audit-2026-05-08.md)) found the live marketing tree currently has zero qualifying swaps — pages were authored with their own idioms (numerals, comparison columns, multi-CTA panels) that the palette doesn't yet cover. The components remain canonical for new work.

---

## 8. UI shell — shadcn/ui (L3)

**Stack:** `components.json` → `style: radix-nova`, `cssVariables: true`, Tailwind v4 with `src/app/globals.css` as the CSS entry.

**Installed components** (as of this writing): `accordion`, `avatar`, `button`, `card`, `dialog`, `dropdown-menu`, `input`, `label`, `navigation-menu`, `separator`, `sheet`, `tabs`, `textarea`.

**Rules:**

1. **Do not hand-edit generated files** for one-off marketing polish. Prefer wrapping in a primitive or passing `className`.
2. **Theme changes** flow through CSS variables in `globals.css`, not through ad-hoc hex in `ui/*`.
3. **Focus rings** should continue to use `ring-ring` / `border-ring` so they track `--ring`.
4. shadcn’s `dark:` variants exist for library compatibility. **Marketing chrome** is token-first: global **light** (`:root`) or **dark** (`html.dark`) from the same variables; **Midnight** remains **`Section variant="midnight"`** for in-page inverse bands.

---

## 9. Domain components (L4)

| Area | Directory | Notes |
| ---- | --------- | ----- |
| Global marketing chrome | `src/components/nav/` | `SiteNav`, `SiteFooter`, `MobileNav` |
| Homepage sections | `src/components/sections/` | e.g. `home-hero`, `home-bento`, … — Stitch-derived fragments reused by `src/app/(site)/page.tsx` |

Extract any block that appears on more than one route into `sections/` (or a future shared package) rather than copying JSX.

---

## 10. Pages & route layouts (L5)

| File | Responsibility |
| ---- | -------------- |
| `src/app/layout.tsx` | Root `<html>` / `<body>`, **Inter + Newsreader** via `next/font`, `Providers`, skip link, **`SiteNav`**, **`SiteFooter`**, and `<main id="main">` for all routes |
| `src/app/(site)/layout.tsx` | Pass-through — global chrome lives in the root layout |
| `src/app/(site)/**/page.tsx` | Page composition only—sections and primitives, minimal logic |

**Server Components by default.** Reserve `"use client"` for interactive islands (menus, sheets, forms with state). Never mark `layout.tsx` or `page.tsx` as client components without an exceptional, documented reason.

---

## 11. Stitch & external HTML translation

Stitch exports often contain **raw hex** and **non-semantic Tailwind colors**. Those values are **not** authoritative—this system is. When translating a screen, remap mechanically. Common mappings:

| Incoming pattern | Replace with |
| ---------------- | ------------- |
| `bg-white`, `#ffffff` | `bg-card` or `bg-popover` |
| `#f7f9fb` | `bg-background` |
| `#f0f4f7` | `bg-section` / `bg-muted` |
| `#e1e9ee` | `bg-elevated` / `bg-secondary` |
| `#0053db`, `bg-blue-600` (legacy Stitch / Digital Curator) | `bg-primary` — **today** `primary` is **ink** on light / **cream** on dark (Concept Modern §3.2), not blue |
| `#101820`, `bg-black` | `bg-inverse-surface` |
| `text-black`, `#000` | `text-foreground` |
| `#566166`, `text-gray-500` | `text-muted-foreground` |
| `text-white` on dark bands | `text-inverse-foreground` |
| Decorative `border-b`, `divide-y` | Remove; use `Section` variants + spacing |
| `shadow`, `shadow-lg` | `shadow-ambient` or none |
| Pure black overlays | **Never**; use `inverse-surface` |

If a Stitch color is **not** on the ramp, stop and extend the palette **here and in `globals.css` together**—do not invent a one-off hex in a page.

---

## 12. Component pattern reference (marketing + forms)

### Buttons

Use **`Button`** from `src/components/ui/button.tsx` for actions. Variants map to design language as:

- **`default`** — primary solid (`bg-primary`).
- **`outline` / `secondary` / `ghost`** — tertiary/secondary patterns; prefer ghost or outline on busy bands.
- **`link`** — inline text actions.

Marketing-specific button shapes (e.g. full-width mobile CTA) should wrap `Button` in layout primitives rather than forking new button components.

### Cards

Use **`Card`** (shadcn, L3) for product-dense UI and forms-adjacent grouping. For **marketing** surfaces, prefer **`SurfaceCard`** (L2) with `tone` set for the parent band (`on-background`, `on-section`, `midnight`) so ghost lift and `shadow-ambient` follow `site-theme.css` rules. Avoid borders for separation—use tonal contrast or `shadow-ambient` when the card truly floats.

### Inputs

**`Input`**, **`Textarea`**, **`Label`** for forms. Respect `border-border` and `ring-ring`. Do not strip focus outlines.

### Chips / tags

Rounded-full chips sit on `secondary` / `accent` bands with `secondary-foreground` text per tone rules.

### Editorial CTAs

Prefer **`ArrowLink`** for “start here” row links with arrow iconography—it bundles focus, hover motion, and typography.

### Data-dense marketing (still editorial)

- **`StatStrip` / `StatItem`** — Use for a small set of headline numbers (economics, layer counts). Keep copy short; prefer hints for caveats rather than footnotes in the grid.
- **`EditorialComparisonTable`** — Use when two or three **named columns** (e.g. “Assembled stack” vs “Movemental”) clarify tradeoffs. Rows must use tonal alternation only—do not add zebra `border-b` between every row for decoration. Caption should frame the table as editorial, not a competitive scorecard.
- **`Timeline` / `TimelineItem`** — Use for ordered phases (sprints, migration, “how we work”). Do not animate the spine unless `prefers-reduced-motion` is respected.

### Proof, media, and in-page wayfinding

- **`PullQuote`** — Use for hinge quotations and attributed voice; on Midnight bands use `variant="midnight"`.
- **`MediaVideo`** — Wraps any 16:9 embed; always provide a visible `title` and optional transcript link when audio matters.
- **`LogoStrip`** — Prefer real logos from `public/`; typographic pills are an acceptable fallback until assets exist.
- **`TestimonialRail`** — Use only when quotes are **sourced or clearly labeled** (e.g. preview text reused from case cards). Do not invent named endorsements.
- **`InPageToc`** — Use on long marketing pages (FAQ, How it works, System) so anchors replace duplicate nav chrome.

---

## 13. Do’s and don’ts (checklist)

### Do

- Compose pages from **`Section` → `Container` → content`**.
- Reach for **semantic tokens** (`bg-section`, `text-muted-foreground`) before inventing new utilities.
- Use **Midnight** (`variant="midnight"`) sparingly for narrative impact; on those bands, step secondary ink with **`text-inverse-foreground/{opacity}`** per §3.6.
- Use **motion tokens** (`duration-*`, `ease-*` from `tailwind.config.ts` / CSS vars) for transitions instead of arbitrary milliseconds.
- Keep **Inter** as the primary brand typeface; use **Newsreader** only as the scoped emphasis layer (§5 / §17).

### Don’t

- Don’t **hand-set** `class="dark"` on `<html>` in page code — theme class is owned by **`next-themes`** / `ThemeProvider` and the nav toggle (see §3.7).
- Don’t use **`text-muted-foreground`** on **`inverse-surface`**—it is tuned for light surfaces; use the Midnight ladder instead (§3.6).
- Don’t use **`bg-black` / `text-black`** or unconstrained raw hex in TSX/CSS outside `globals.css`.
- Don’t use **decorative borders** between major sections.
- Don’t ship **new drop-shadow styles** beyond `shadow-ambient`.
- Don’t **shrink type** to fix layout—change spacing or composition.
- Don’t ship **autoplay video with sound** or block primary reading with motion (§6).

---

## 14. Static HTML prototypes, trust primitives, and layout recipes

Static pages under `docs/html/` are **not** production Next.js, but they must follow the same token ramp and narrative rules so Stitch → React work and marketing prototypes do not fork the system.

**Authoritative operational detail** (mandatory `<head>` order, shell choice, token parity table, static ↔ React primitive map, validation checklist, agent prompts): [STATIC_HTML_AND_TEMPLATES.md](./STATIC_HTML_AND_TEMPLATES.md). Update that file when static workflow or contracts change; keep §14 here as the narrative summary and recipe index.

### 14.1 Stylesheet split

| File | Responsibility |
| ---- | ---------------- |
| [docs/html/site-templates/site-theme.css](../../../1-html/labs/movemental-ai/docs-html/site-templates/site-theme.css) | Shared L0–L2 + L2b trust + template shell (bands, type scale, cards, CTAs, evidence patterns, `site-top` nav, footer). Defines **`--site-header-height`** (used by root prototypes and drawer offset). |
| [docs/html/site-templates/prototype-pages.css](../../../1-html/labs/movemental-ai/docs-html/site-templates/prototype-pages.css) | Root `docs/html/*.html` prototypes: glass fixed **`.site-header`**, two-tier nav, drawer, `.section--surface-*`, display sizes, hero/narrative/split layouts, FAQ accordion, page footers — **loaded after** `site-theme.css`. **All** shared chrome for `.site-header` / `.site-drawer` / `main` top padding lives here (glass + border hairline + focus rings + `aria-current` treatment). Page `<style>` blocks should contain **page-only** layout, not another copy of the header stack. |
| [scripts/sync-docs-html-nav.py](../../scripts/sync-docs-html-nav.py) | Rewrites the standard header + drawer markup for root pages listed in `PAGE_CONFIG` (run after changing global IA). |
| [scripts/dedupe-docs-html-chrome-css.py](../../scripts/dedupe-docs-html-chrome-css.py) | Removes pasted duplicate skip-link / `.site-header` / `.site-drawer` / `main { padding-top }` rules from root HTML if they reappear. |

### 14.2 Trust / evidence primitives (L2b) — HTML structure

Use on **light** bands (ghost lift on `card`) or **midnight** bands (`.evidence-note--inverse`). Keep claims inspectable; do not use these blocks as generic callouts.

| Class | Role | Expected markup |
| ----- | ---- | ----------------- |
| `.evidence-note` | Short “source + caveat” card | Optional `.evidence-note__label`, `.evidence-note__body`, `.evidence-note__meta`, `.evidence-note__caveat` |
| `.evidence-note--inverse` | Same on `inverse-surface` | Modifier on root |
| `.pull-quote` | Attributed quotation | `blockquote` / `p` + `footer` / `cite` |
| `.pull-question` | Display-weight hinge line | Single phrase or short sentence |
| `.relationship-row` | “Built with / verify via” outbound links | `.relationship-row__label` + links |
| `.references` | Numbered end sources | `.references__title` + `ol` |
| `.figure-doc` | Documentary figure | `figure` > `img` + `figcaption` |

### 14.3 Layout recipes (composite patterns)

Each row is a **composition reference** for IA and stacking; React pages should map to `Section` → `Container` → `Prose` / `Card` without inventing new ramps.

| Use case | Canonical label | Primary exemplar(s) | Building blocks |
| -------- | ---------------- | -------------------- | ----------------- |
| General marketing landing | `LandingGeneral` | [exemplar-landing-general.html](../../../1-html/labs/movemental-ai/docs-templates/alan-hirsch/exemplars/exemplar-landing-general.html) | `band-midnight` + `.hero-split` + `.values-grid` (recipe CSS may be inline on exemplar or promoted to `site-theme.css`) |
| Course-style landing | `LandingCourse` | [exemplar-landing-course.html](../../../1-html/labs/movemental-ai/docs-templates/alan-hirsch/exemplars/exemplar-landing-course.html) | Midnight hero + section bands + syllabus-style blocks |
| Long-form article | `ArticleDetail` | [exemplar-article-detail.html](../../../1-html/labs/movemental-ai/docs-templates/alan-hirsch/exemplars/exemplar-article-detail.html) | Prose column, meta / aside, pull-quote |
| Content hub / library | `ContentLibrary` | [exemplar-content-library.html](../../../1-html/labs/movemental-ai/docs-templates/alan-hirsch/exemplars/exemplar-content-library.html) | Filters row + card grid |
| Media cards (article / book / video) | `CardRails` | `exemplar-cards-article.html`, `exemplar-cards-book.html`, `exemplar-cards-video.html` | `.card` or grid-specific wrappers on tonal bands |
| Hero variants | `HeroCinematic`, `HeroProductSplit`, `HeroScrollNarrative` | `exemplar-hero-*.html` | Cinematic = editorial drama; product split = asymmetric offer; scroll narrative = chapter pacing (respect `prefers-reduced-motion`) |
| In-browser book | `EbookReader` | [exemplar-ebook-reader.html](../../../1-html/labs/movemental-ai/docs-templates/alan-hirsch/exemplars/exemplar-ebook-reader.html) | TOC + chapter column + prev/next |
| Workspace / product metaphor | `WildcardWorkspace` | `exemplar-wildcard-doc-workspace.html`, `exemplar-wildcard-editor-chrome.html`, `exemplar-wildcard-collab-presence.html` | Use only when the narrative is tooling/process—not for every marketing page |
| Static UI inventory (marketing controls) | `HtmlUiKit` | [exemplar-ui-components.html](../../../1-html/labs/movemental-ai/docs-templates/alan-hirsch/exemplars/exemplar-ui-components.html) | Maps to shadcn-style **Button** / **Card** / inputs in product; static file shows token-correct gradients, chips, and field chrome |
| Header pattern lab | `HtmlNavLab` | [exemplar-top-nav-header.html](../../../1-html/labs/movemental-ai/docs-templates/alan-hirsch/exemplars/exemplar-top-nav-header.html) | Glass fixed bar (SiteNav parity), `.site-top` sticky shell, optional mega-row — pick one shell per surface, do not mix ramps |
| KPI / stats strip | `StatStrip` | _(React)_ `stat-strip.tsx` — static parity: promote from `exemplar-ui-components.html` when numeric | `StatStrip` + `StatItem`; primary numeral + label |
| Editorial comparison matrix | `EditorialComparisonTable` | _(React)_ `editorial-comparison-table.html` TBD | Tonal thead/tbody; caption; semantic `<table>` |
| Logo strip | `LogoStrip` | _(React)_ `exemplar-logo-strip.html` TBD | Image or typographic fallback; muted → hover full color |
| Media embed shell | `MediaVideo` | _(React)_ `exemplar-media-video.html` TBD | `aspect-video`, `figure`, transcript pattern |
| In-page TOC | `InPageToc` | _(React)_ `exemplar-inpage-toc.html` TBD | Sticky pills, anchor-only |
| Vertical timeline | `Timeline` | _(React)_ `exemplar-timeline.html` TBD | Primary nodes + spine |
| Testimonial rail | `TestimonialRail` | _(React)_ `exemplar-testimonials.html` TBD | Scroll-snap; `SurfaceCard` slides |

**Stitch / React alignment:** static exemplars define **composition and rhythm**; production TSX should match the same recipe with primitives and `sections/*`, not copy raw class names from HTML.

### 14.4 Relative paths (static tree)

| Page location | Link to shared CSS / JS |
| ------------- | ------------------------ |
| `docs/html/site-templates/*.html` | `./site-theme.css`; add `./site-shell.js` when using `.site-top` + `.site-nav__toggle` |
| `docs/html/*.html` (root) | `./site-templates/site-theme.css` then `./site-templates/prototype-pages.css`; add `./site-templates/site-shell.js` only for pages that use the **`.site-top`** template shell (most root marketing prototypes use **`.site-header`** + inline drawer script instead) |

---

## 15. Imagery, iconography, data, and performance

### 15.1 Photography & illustration

- **Editorial authenticity:** Prefer real contexts, real people, and believable light over generic “corporate handshake” stock. When Stitch or NB2 assets are used, they must match the **warm paper + ink tonal ramp**—not neon cyberpunk or unrelated metaphors.
- **Cropping & ratio:** Heroes and cards use **consistent aspect treatments** (`next/image` `sizes`, fixed aspect slots like `MediaVideo`). Avoid arbitrary crops that clip faces at the chin or remove hands that establish trust.
- **Text in images:** Minimize baked-in text in raster images; when unavoidable (OG images, social cards), follow [docs/build/prompts/site-media-image-prompts-executor.html](../build/prompts/site-media-image-prompts-executor.html) patterns so type remains legible and on-brand.

### 15.2 Icons

- **Library:** `lucide-react` via shadcn-style composition—consistent **stroke width** and **corner radii** per icon.
- **Sizing:** Align to Tailwind text steps (`size-4`, `size-5`, …) and center with optical padding in buttons and `ArrowLink`.
- **Meaning:** Pair icons with **visible text** for primary navigation; icons alone are for compact/secondary affordances where tooltips are not the only hint.

### 15.3 Data presentation

- **Marketing “metrics”** use **`StatStrip`** / **`EditorialComparisonTable`**—typographic emphasis, not chart junk. If a true chart ships later, it must use **semantic tokens** for series ink and gridlines—never raw rainbow defaults.
- **Honesty:** Label axes, units, and time ranges; prefer **caveats in copy** over misleading precision.

### 15.4 Performance & sustainability (designer-facing)

- **Fonts:** Inter is loaded once via `next/font`—no duplicate webfont requests in the Next app.
- **Motion cost:** Prefer CSS transitions and **one-off** `fade-in` over per-item stagger on long lists. Test **mid-tier mobile** for jank when adding canvas, video, or heavy blur stacks.
- **Images:** Use responsive `srcset`, modern formats where available, and meaningful **`sizes`** so layouts don’t download desktop hero pixels on phones.

### 15.5 Forms & transactional polish

- **Errors:** Inline, specific, next to the field; use `destructive` + icon only if copy is present.
- **Success:** Confirm state without hijacking the entire viewport unless the flow completes a major commitment (e.g. payment).

---

## 16. Change control

When you intentionally evolve the system (new token, new primitive, altered ramp):

1. Update **`src/app/globals.css`** and this document **together** (including §18 when Stitch-surface or program-rail tokens change, and the staff swatch page `src/app/(dashboard)/admin/design-tokens/page.tsx`).
2. For **static** patterns used by `templates/alan-hirsch/exemplars/` HTML, other `docs/html` prototypes, or shared templates, update **`docs/html/site-templates/site-theme.css`** (and **`prototype-pages.css`** when the change affects root prototypes) **together with this document** and [STATIC_HTML_AND_TEMPLATES.md](./STATIC_HTML_AND_TEMPLATES.md). If root HTML regains pasted chrome CSS, run **`python3 scripts/dedupe-docs-html-chrome-css.py`** after fixing the shared stylesheet. If root pages regain pasted **`:root` / `html` / `body` resets**, run **`python3 scripts/strip-docs-html-inline-l0-l1.py`**.
3. Run **`pnpm typecheck`** and **`pnpm lint`**.
4. If the change affects Stitch translation rules, add a row to section 11 (and optionally to the migration prompt table for agent ergonomics).

This keeps **docs/design** and **implementation** a single, accountable source for Movemental’s visual system.

---

## 17. Concept Modern — marketing editorial

This subsection canonizes the **Concept Modern** language from static prototypes under `docs/html/*-concept-modern*/` (see also the historical detail log in [FUTURE-concept-modern-html-charter.md](./FUTURE-concept-modern-html-charter.md)). Use it for **marketing / editorial** routes: homepage, audience hubs, articles index, books hub, team, assessments hub, contributor layer, and related long-scroll pages.

### 17.1 Intent

- **Warm paper + ink duotone** (cream surfaces, near-black type) with **Midnight** reserved for closing CTAs and authority bands—not the default cool `#f7f9fb` MD3 ramp.
- **Typography-first hierarchy:** generous measure, `ch`-based reading widths where the prototype specifies them, whitespace over boxes.
- **Primary ink (pill) is the light switch:** primary CTAs use `Button` + `bg-primary` / `--gradient-primary` per §3.2. Secondary actions use `outline` / `ghost` with **muted / foreground** ink, not a second saturated accent.

### 17.2 Semantic tokens (implementation)

These live in `:root` / `@theme inline` as Tailwind colors—**never** paste prototype hex into TSX.

| Token | Role | Typical utilities |
| ----- | ---- | ------------------- |
| `--editorial-paper` | Default warm page base | `bg-editorial-paper` |
| `--editorial-paper-alt` | Alternating band | `bg-editorial-paper-alt` |
| `--editorial-surface` | Card / inset well on paper | `bg-editorial-surface` |
| `--editorial-foreground` | Primary ink on paper | `text-editorial-foreground` |
| `--editorial-muted-foreground` | Supporting ink | `text-editorial-muted-foreground` |
| `--editorial-border` | Hairlines, card edges | `border-editorial-border` |

**`Section` variants:** `editorial` and `editorialAlt` map to the paper / paper-alt pair (`src/components/primitives/section.tsx`). Midnight narrative bands continue to use `variant="midnight"` + inverse tokens.

### 17.3 Global chrome

- **SiteNav** follows the **nav-01** structure from [`docs/html/master-components/nav-01.html`](../../../1-html/labs/movemental-ai/docs-html/master-components/nav-01.html): fixed glass bar, **brand → centered primary row → actions** (ghost secondary + ink pill primary + mobile toggle), plus **reading progress** hairline under the bar (`NavReadingProgress`, `--site-nav-progress-height`, `--site-chrome-total`). Main content padding-top must clear **`--site-chrome-total`**, not `4rem` alone.
- **Breakpoint:** Desktop nav and inline CTAs use the Tailwind **`nav`** screen (**`min-width: 901px`**) so behavior matches [`nav-demos.css`](../../../1-html/labs/movemental-ai/docs-html/master-components/css/nav-demos.css) (`max-width: 900px` drawer threshold). Use `nav:*` utilities in `src/components/nav/*`; do not use `lg:` (1024px) for this chrome split.
- **IA source of truth:** hrefs and labels for header, footer, and mobile drawer come only from [`src/components/nav/nav-links.ts`](../../src/components/nav/nav-links.ts). `nav-01.html` still shows placeholder anchors (Services, Methodology, …); production IA intentionally differs.
- **Newsreader:** Loaded in `src/app/layout.tsx` via `next/font/google` as `--font-serif-display`. `@theme` / `:root` **`--font-serif`** stacks that variable first so `@layer base` heading `<em>` and `font-serif` utilities resolve to the self-hosted font, with string fallbacks matching Concept Modern HTML.
- **Skip link** is required in `src/app/layout.tsx` (first focusable, targets `#main`).

### 17.4 Motion (static `script.js` → React)

- **Reveal-on-scroll:** Prefer a small client leaf with `IntersectionObserver`, threshold ~`0.14`, `rootMargin` `0px 0px -6% 0px`, and **one-shot** unobserve after reveal. If `prefers-reduced-motion: reduce` or IO is missing, show content at full opacity immediately.
- **Nav scroll state:** Optional `is-scrolled` class on the bar is subsumed by existing `NavScrollShadow`; do not duplicate competing scroll listeners without merging.
- **Reading progress:** Implemented in `NavReadingProgress`; must not animate width under reduced motion (bar stays at 0% or static off).

### 17.5 Stitch coexistence

Stitch project `2208910962065880866` remains the source for **productized** flows not covered by Concept Modern HTML. Where both exist, **merge layout intent from Stitch into these tokens**—do not fork parallel hex palettes per page.

---

## 18. Stitch-surface token namespace (`safestart-*` and product rails)

**Status:** Load-bearing. These names are the **canonical register** for authenticated product surfaces that are lifted from Stitch HTML (`public/templates/`) or intentionally match that MD3-forward register—not a deprecated alias layer.

### 18.1 What this namespace is for

- **`safestart-*`** — Warm paper, ink, hairlines, and container tones that map directly to MD3-style tokens in Stitch exports (e.g. surface containers, outline variants, completed-state green). They sit **alongside** Concept Modern marketing tokens (`bg-background`, `text-foreground`, …) without replacing them.
- **`movemental-midnight`** — Deep ink header/sidebar chrome shared across authenticated shell and Stitch-derived bands.
- **`sandbox-sidebar*`, `sandbox-border`, `sandbox-muted`** — Midnight-adjacent rail for `/sandboxlive` and phase workspaces.
- **`pathway-accent`** — Burnished editorial accent for Safety/Sandbox pathways (stage labels, active rules, pull-quote energy). Reserved for that product register; do not use for generic marketing highlights or citation UI (Ledger uses `cite-hl*` only).
- **`status-go`, `status-caution`, `status-stop`** — Desaturated program signals (e.g. Sandbox “lights”) tuned to read on cream paper.

### 18.2 Why a parallel namespace exists

Concept Modern (§17) optimizes the **marketing** story: cream paper, ink pill, Instrument moments. Stitch-derived **product** HTML encodes a slightly different MD3 ramp (slightly different creams, hairlines, and container stacks). Rather than forcing every lifted screen through a lossy remap into marketing tokens, we **name and own** the Stitch register in `@theme inline` so lifts stay faithful and grep-friendly. Translation tables for agents still live in the Stitch migration prompt; this section is the **charter** for when those utilities are correct.

### 18.3 When to use these tokens

**Use** `safestart-*`, `movemental-midnight`, `sandbox-sidebar*`, `pathway-accent`, and related utilities when:

- Building or maintaining routes under **`/sandboxlive`**, **`/safestart`**, **`/program`**, or other authenticated product shells that consume Stitch fixtures or parity HTML.
- Lifting `<main>` subtrees from `public/templates/**` where the source uses MD3-adjacent classes mapped to this namespace (see migration prompt mechanical tables).

**Do not** default to this namespace for:

- Marketing / `(site)` routes, primitives, legal pages, or editorial hubs—use **semantic Concept Modern** tokens (`bg-background`, `bg-section`, `text-foreground`, …) unless a specific Stitch lift explicitly requires a local exception (then document it in the PR).

### 18.4 Where values are defined

All of the above are registered as **`--color-*`** entries inside **`@theme inline`** in **`src/app/globals.css`** (same block as Concept Modern and status colors). Tailwind v4 exposes them as utilities such as `bg-safestart-bg`, `text-safestart-ink`, `border-safestart-hairline`, `bg-movemental-midnight`, `bg-sandbox-sidebar`, `text-pathway-accent`. **Do not delete** these entries in favor of ad-hoc hex in TSX—if a value changes, update `globals.css`, this section, and the **`TOKEN_GROUPS`** hex labels on **`/admin/design-tokens`** together (see §16).

### 18.5 Staff reference

A read-only **swatch index** for every token in this namespace ships at **`/admin/design-tokens`** (staff-gated). Use it when lifting templates to confirm class names and hex without spelunking `globals.css`.
