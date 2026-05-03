# Static HTML and `docs/html` templates — operational SSOT

This document is the **single accountable spec** for bringing `docs/html` pages, `docs/html/site-templates/*`, and `templates/alan-hirsch/exemplars/*` into alignment with Movemental’s design vision. The creative charter lives in [DESIGN.md](./DESIGN.md); **token values and parity with production** live in `src/app/globals.css` (`:root`) and **static parity** in [docs/html/site-templates/site-theme.css](../html/site-templates/site-theme.css) (`:root`).

When `globals.css`, `site-theme.css`, or static markup disagree, treat that as a bug and fix **globals + DESIGN.md + site-theme** in one accountable change (per DESIGN.md §16).

---

## 1. File roles (do not fork)

| Artifact | Role |
| -------- | ---- |
| `src/app/globals.css` | Production **L0** tokens + Tailwind `@theme inline` + `@layer base`. Authoritative hex and semantic names. |
| `docs/html/site-templates/site-theme.css` | Static **L0–L2 + L2b + draft `site-top` shell**. `:root` must stay in **numeric parity** with `globals.css` (same ramp; layout tokens may use `clamp()` where noted below). |
| `docs/html/site-templates/prototype-pages.css` | Root `docs/html/*.html` prototypes: **`.site-header`**, drawer, `.section--surface-*`, shared display/hero/card primitives that mirror production layout. Loaded **after** `site-theme.css`. |
| `docs/html/site-templates/course-preview.css` | **`docs/html/course-previews/**`** lesson browser: light-primary chrome, sidebar TOC, callouts. Load **after** `site-theme.css`; `<body class="course-preview">`. |
| `docs/html/site-templates/course-sequence-preview.css` | **`docs/html/courses/**`** AI Stewardship Sequence static previews (index + Safety / Sandbox Season / Skills / Solutions). Load **after** `site-theme.css`; uses shared bands, cards, pull-quotes, and grids from DESIGN.md / PATTERNS.md. |
| `docs/html/site-templates/course-preview-app.js` | Hash-routed lesson renderer for course previews (expects `window.COURSE_LESSONS` from `*-lessons-*.js`). |
| `docs/html/site-templates/site-shell.js` | Mobile nav for **`.site-top`** draft templates only. |
| `templates/alan-hirsch/exemplars/*.html` | Static **UI pattern lab** (content library, article reader, course landing, e-reader, nav chrome, etc.); links `site-theme.css` / `site-shell.js` under `docs/html/site-templates/`. |
| `scripts/sync-docs-html-nav.py` | Rewrites standard header blocks for listed root pages. |
| `scripts/dedupe-docs-html-chrome-css.py` | Removes accidental duplicate chrome CSS pasted into root HTML. |
| `scripts/strip-docs-html-inline-l0-l1.py` | Removes accidental pasted `:root` + base reset + `body` blocks from root `docs/html/*.html` page `<style>` tags (run after manual merges). |

**Forbidden:** pasting a second copy of `:root` token ramps or `html`/`body` / `box-sizing` reset into a page `<style>` block. Page-local `<style>` is for **page-only** layout (one-off grids, tab panels, etc.).

---

## 2. Mandatory `<head>` contract

### 2.1 Files under `docs/html/site-templates/`

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
<link rel="stylesheet" href="./site-theme.css" />
<!-- If using .site-top + toggle: -->
<script src="./site-shell.js" defer></script>
```

- **Inter** via Google Fonts is allowed **only** for static previews (DESIGN.md §5 / §14).
- Path to `site-theme.css` is always **`./site-theme.css`** from this folder.

### 2.1b Files under `templates/alan-hirsch/exemplars/` (UI pattern lab)

These pages share the same token ramp but live outside `docs/html/`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
<link rel="stylesheet" href="../../../docs/html/site-templates/site-theme.css" />
<!-- If using .site-top + toggle: -->
<script src="../../../docs/html/site-templates/site-shell.js" defer></script>
```

- **Inter** via Google Fonts: same static-preview rule as §2.1.
- **Never** duplicate `:root` in page `<style>` — the linked `site-theme.css` remains authoritative.

### 2.2 Root prototypes `docs/html/*.html` (glass header + two-tier nav)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
  rel="stylesheet"
/>
<link rel="stylesheet" href="./site-templates/site-theme.css" />
<link rel="stylesheet" href="./site-templates/prototype-pages.css" />
<!-- Optional third-party or page-only CSS, then: -->
<!-- <link rel="stylesheet" href="./site-templates/site-inventory-viz.css" /> -->
<style>
  /* Page-only rules — no :root, no html/body reset */
</style>
```

Load order is fixed: **site-theme → prototype-pages → optional extras → page `<style>`**.

---

## 3. Shell choice (L4)

| Shell | Markup | Scripts | When to use |
| ----- | ------ | ------- | ----------- |
| **Draft band** | `.site-top`, `.site-nav`, `.site-nav__toggle` | `site-shell.js` | `site-templates/*` drafts; **UI exemplars** live in `templates/alan-hirsch/exemplars/` (same shell; link `site-theme.css` from `docs/html/site-templates/`). |
| **Root prototype** | `.site-header`, `.site-drawer`, `.nav-toggle` | Inline drawer snippet at bottom of page (same idea as production `Sheet`) | Public-facing org-site HTML prototypes in `docs/html/*.html`. |

Do not mix both shells on one page. Do not duplicate their CSS into `<style>`.

---

## 4. Token parity (`globals.css` ↔ `site-theme.css`)

Static `:root` in `site-theme.css` must define at least every **semantic** in DESIGN.md §3 that appears in static templates, including form/destructive chrome when exemplars use them.

**Canonical names** (use in new static CSS):

| Semantic | CSS variable |
| -------- | ------------ |
| Surfaces | `--background`, `--foreground`, `--section`, `--card`, `--card-foreground`, `--elevated`, `--surface-highest`, `--muted`, `--muted-foreground` |
| Inverse / Midnight | `--inverse-surface`, `--inverse-foreground` |
| Brand | `--primary`, `--primary-dim`, `--primary-foreground`, `--gradient-primary` |
| Secondary / accent | `--secondary`, `--secondary-foreground`, `--accent`, `--accent-foreground` |
| State | `--destructive`, `--destructive-foreground` |
| Chrome | `--border`, `--input`, `--ring`, `--popover`, `--popover-foreground`, `--outline` |
| Layout | `--container-max`, `--prose-max`, `--section-y-sm`, `--section-y-lg`, `--site-header-height` |
| Radius | `--radius` (base md), plus stepped `--radius-sm` / `--radius-md` / `--radius-lg` / `--radius-pill` as in static file |

**Legacy `--color-*` aliases** exist for older prototype markup (`var(--color-card)`, etc.). New markup should prefer **`--card`** / **`--foreground`**; aliases remain aliases to the same ramp, not a second palette.

**Section vertical rhythm:** In production, `--section-y-sm` / `--section-y-lg` are fixed `80px` / `120px` in `@theme`. In static `site-theme.css` they may use `clamp()` for small viewports; do not change hex ramp when adjusting clamps.

---

## 5. Primitives mapping (static class → React)

Use this when translating static → `src/components` or auditing alignment.

| Static (`site-theme.css` / `prototype-pages.css`) | React primitive / pattern |
| ------------------------------------------------- | --------------------------- |
| `.band-default`, `.band-section`, `.band-midnight` | `<Section variant="default \| section \| elevated \| midnight">` |
| `.container` | `<Container>` |
| `.prose` | `<Prose>` |
| `.display`, `.eyebrow`, `.lede` | `<Display>`, `<Eyebrow>`, (lede: prose / layout copy) |
| `.btn-primary`, `.btn-ghost`, `.btn-row` | `<Button variant="default \| outline \| secondary \| ghost \| link">` in product |
| `.card`, `.grid-3`, `.hero-split`, `.values-grid` | Compose `<Card>` + layout; homepage `sections/*` |
| `.evidence-note`, `.pull-quote`, … | DESIGN.md §14.2 — compose with `Prose` / `Card` in TSX |

---

## 6. Forbidden patterns (static HTML)

- **No** decorative `border-bottom` / `divide-y` between major sections — use tonal bands (DESIGN.md §3.1).
- **No** raw hex / `rgb()` in page `<style>` for theme colors — use `var(--…)` from `site-theme.css`.
- **No** `bg-black`, `#000`, `text-white` as theme — use `--inverse-surface` / `--inverse-foreground`.
- **No** new box-shadows except `var(--shadow-ambient)` (DESIGN.md §3.4).
- **No** second full **`html`/`body` reset** or **`:root` ramp** in page `<style>`.

**Allowed hex outside `:root`:** Mermaid / diagram config, third-party widget JSON, or **explicit** `color-mix(in srgb, var(--inverse-surface) 92%, #ffffff 8%)`-style tints — prefer `var(--card)` or `color-mix` with **semantic** vars when possible.

---

## 7. Validation checklist (before merging static HTML)

1. [ ] `<head>` matches §2 for this file location.
2. [ ] No `:root` token block in page `<style>`; no duplicate `*, html, body` reset.
3. [ ] Surfaces use semantic vars; Midnight uses `.band-midnight` or `.section--surface-midnight` consistently.
4. [ ] `prefers-reduced-motion` respected for any scroll-linked or CSS animation demos.
5. [ ] Focus visible on interactive controls (links, buttons, drawer toggles).
6. [ ] If IA changed, run `python3 scripts/sync-docs-html-nav.py` where applicable.

---

## 8. Agent prompts (copy-paste)

### 8.1 Align one static HTML file to the system

Use on a single `docs/html/**/*.html` file.

> Read `docs/design/STATIC_HTML_AND_TEMPLATES.md` and `docs/design/DESIGN.md` §14. Open the target HTML and `docs/html/site-templates/site-theme.css`. Remove any pasted `:root` ramp or `html`/`body` / `box-sizing` reset from the page `<style>`; ensure `<head>` stylesheet order matches §2. Replace raw marketing hex with semantic `var(--…)` tokens. Prefer `.band-*` for new sectioning; keep `.section--surface-*` only where tied to `prototype-pages.css`. Do not duplicate `.site-header` or `.site-top` CSS into the page. List any remaining page-only rules and why they must stay local.

### 8.2 Align all alan-hirsch UI exemplars (`templates/alan-hirsch/exemplars/`)

> For each `templates/alan-hirsch/exemplars/exemplar-*.html`, verify §2.1b head block, stylesheet link to `docs/html/site-templates/site-theme.css` (no second `:root` fork), plus `site-shell.js` from the same folder if `.site-top` is used, no inline token forks, and Midnight/light band alternation per DESIGN.md. Normalize Inter weights to 300–700 unless the exemplar is explicitly simulating marketing `display` weight (then 800 is acceptable). Report files that need `prototype-pages.css` for root-only classes — prefer refactoring markup to `site-theme` primitives instead.

### 8.3 Token drift audit

> Diff `src/app/globals.css` `:root` against `docs/html/site-templates/site-theme.css` `:root`. For every missing or mismatched semantic (not counting intentional `clamp()` on section Y), update `site-theme.css` and note the change in `docs/design/DESIGN.md` §16 change control if the ramp itself changed.

---

## 9. Related prompts index

- [html-template-exemplars-index.md](../build/prompts/html-template-exemplars-index.md) — per-template build prompts.
- [stitch-to-react-migration.md](../build/prompts/stitch-to-react-migration.md) — Stitch → React (imports DESIGN.md).
