# Prompt: Primary site top navigation — variant choice and full integration

> **How to run this:** Paste the entire prompt into an authoring agent inside the `movemental` repo. Complete the **preflight reads** before editing code. This document **does not** replace [`stitch-to-react-migration.md`](./stitch-to-react-migration.md) for token mechanics — use §7 there when translating any leftover Stitch literals.

---

## 1. Mission

Choose a **single canonical primary header** for every page under the `(site)` route group, align it with the **Navigation Strategy Gallery** (five structural nav “types”), and **integrate it end-to-end**: desktop bar, scroll behavior, mobile drawer, link configuration, CTAs, accessibility, and layout offset so content never sits under the fixed bar.

The gallery’s five concepts live in the pinned Stitch export:

- [`docs/build/stitch/movemental_navigation_showcase_gallery/code.html`](../stitch/movemental_navigation_showcase_gallery/code.html)

Production chrome today lives under:

- `src/components/nav/site-nav.tsx` — fixed glass `<header>`, brand, `SiteNavMenus`, desktop CTAs, `MobileNav`
- `src/components/nav/site-nav-menus.tsx` — flat primary links + hover “More” dropdown
- `src/components/nav/mobile-nav.tsx` — `Sheet` drawer, mirrors IA
- `src/components/nav/nav-links.ts` — `sitePrimaryNavFlat`, `siteNavMore`, `siteSecondaryCtaLink`, `siteCtaLink`
- `src/components/nav/nav-scroll-shadow.tsx` — scroll-linked elevation
- `src/app/(site)/layout.tsx` — mounts `SiteNav` + `pt-16` on `<main>`

If you have added **React “nav type” library pieces** (e.g. presentational shells or `variant` props under `src/components/nav/`), this task **composes** them into one shipped header rather than maintaining multiple competing top bars.

---

## 2. Non-negotiables (design + engineering)

1. **[`docs/design/DESIGN.md`](../../design/DESIGN.md)** is law: semantic tokens only, Inter, **no decorative sectioning borders** on the nav shell (no `border-b` / `divide-y` for “separation”), **no raw hex** or `bg-slate-*` / `text-gray-*` in TSX. Stitch HTML in the gallery uses literal colors — **re-map** every color to tokens per [`stitch-to-react-migration.md`](./stitch-to-react-migration.md) §7.
2. **Glass primary bar** stays the default for the marketing site: `bg-card/80 backdrop-blur-xl` (or equivalent token-backed glass), consistent with [`templates/alan-hirsch/exemplars/exemplar-top-nav-header.html`](../../../templates/alan-hirsch/exemplars/exemplar-top-nav-header.html) and the comment block in `site-nav.tsx`.
3. **Primary is a light-switch:** reserve `bg-primary` / primary-gradient CTAs for high-intent actions only; secondary text links use `text-muted-foreground` → hover `text-foreground`.
4. **Icons:** use `lucide-react` only in production nav — do **not** ship Material Symbols from the gallery HTML.
5. **Server Components by default:** keep `site-nav.tsx` as a Server Component; push `"use client"` only to leaves that need hooks (`SiteNavMenus`, `MobileNav`, dropdowns).
6. **`pnpm` only**; `pnpm typecheck` and `pnpm lint` must pass before the task is considered done.

---

## 3. Variant decision — what should be the primary top nav?

### 3.1 Gallery concepts (short names)

| # | Gallery label | Summary |
| - | -------------- | ------- |
| 01 | **Standard Institutional** | Wordmark + **balanced link cluster** + primary CTA; glass; institutional authority. |
| 02 | **Search-First Editorial** | Discovery-first with search field and uppercase index labels; better for **archive / blog** than global org chrome. |
| 03 | **The Deep Rail** | Taller bar, heavy CTAs; Stitch sample uses **bottom border + generic shadow** — conflicts with DESIGN.md **no-line** and controlled `shadow-ambient` rules unless redesigned with tokens only. |
| 04 | **The Minimalist Centered** | Luxury editorial **mark + icons**; too sparse for the **current flat + “More” IA** without hiding most destinations. |
| 05 | **The Midnight Utility** | Inverse-surface chrome for **dark bands**; appropriate as a **scoped variant**, not the default light-primary header. |

### 3.2 Recommendation (canonical primary)

**Adopt Concept 01 — Standard Institutional** as the **default site-wide top nav**.

**Rationale:**

- Matches the org site’s job: **credibility**, clear destinations, and a **single primary CTA** without turning the whole site into a product app shell.
- Aligns with existing **glass fixed bar** and **brand + links + CTA** triad already in `SiteNav`.
- Scales with **dense IA** via the existing **flat primary + “More”** pattern in `nav-links.ts` (Concept 04 cannot carry this without regressing wayfinding).
- Avoids baking **global search** (02) into every page before `/blog` or archive UX is scoped and designed.
- Avoids **03**’s structural debt (border-forward separation, extra-tall rail) relative to DESIGN.md’s tonal stacking discipline unless you explicitly redesign 03 **without** decorative borders.
- Keeps **05** available as `variant="midnight"` (or a sibling component) for heroes/sections that use `bg-inverse-surface`, **without** enabling a global `dark` class on `<html>`.

### 3.3 Optional follow-ups (explicitly out of scope for “primary”)

- **02 Search-First:** reserve for `/blog`, resource indexes, or a dedicated “library” surface — ship as a **route-local header** or a **second composable** invoked only from those layouts, not `(site)/layout.tsx` by default.
- **05 Midnight:** implement as an **opt-in prop** on the nav shell when the first viewport band is midnight and the bar must stay readable (token: `bg-inverse-surface`, `text-inverse-foreground`, focus rings that meet contrast on inverse).

---

## 4. Target UX spec (Concept 01 translated to production)

Describe the shipped bar in **behavioral** terms so implementation is testable:

1. **Placement:** `fixed inset-x-0 top-0 z-50` (keep parity with `NavScrollShadow` wrapper).
2. **Height:** `h-16` (64px) unless DESIGN.md / `globals.css` defines a shared `--site-header-height` — if you introduce a token, update `(site)` layout padding to match (`pt-*` = header height).
3. **Layout grid (Concept 01 parity):** three regions — **start:** wordmark link to `/`; **center:** primary navigation cluster (visually centered in the viewport, not squeezed against the brand); **end:** secondary text link + primary CTA button.  
   - *Implementation hint:* a three-column grid (`grid-cols-[auto_1fr_auto]` or `grid grid-cols-3 items-center`) with the middle column centering `SiteNavMenus` reads closer to the gallery than `flex` + `flex-1 justify-end` alone. Preserve truncation/overflow behavior for many links (`overflow-x-auto` / wrap at `lg` as today).
4. **Desktop links:** keep `sitePrimaryNavFlat` + `siteNavMore` semantics; ensure **active route** styling is visible but not reliant on bottom borders (use `text-foreground` / subtle `bg-section/80` only).
5. **“More” dropdown:** keyboard-accessible (`Escape` closes, `aria-expanded` on the control); click-outside and hover behavior should not trap focus; no raw `shadow-lg` — use `shadow-ambient` if elevation is needed.
6. **Mobile:** keep `Sheet` pattern from `mobile-nav.tsx`; ensure **secondary CTA** appears in the drawer if it is removed from the collapsed top row (parity with desktop).
7. **Scroll:** retain `NavScrollShadow` so the bar gains **only** the approved ambient elevation token when scrolled (no ad-hoc shadows).

---

## 5. Implementation plan (full integration)

Work in this order:

### Step A — Inventory and align nav “library” components

1. List every nav-type-related file under `src/components/nav/` (and any `editorial-stitch` preview-only pieces).
2. Decide which pieces are **preview-only** vs **production**. Production must not import demo-only wrappers into `(site)/layout.tsx`.
3. If the library exposes **variants** (e.g. `standard-institutional`, `midnight-utility`), define a **single default export** used by `SiteNav` and map optional props for future routes.

### Step B — Refactor `SiteNav` to the Concept 01 structure

1. Update `site-nav.tsx` to match §4 (grid, centered cluster, end CTAs).
2. Keep glass tokens and focus ring patterns consistent with DESIGN.md.
3. Ensure the **wordmark** retains visible focus styles and correct `href="/"`.

### Step C — `SiteNavMenus` and IA

1. Reconcile link density: if the centered cluster overflows on `md`, preserve horizontal scroll or implement **responsive demotion** (e.g. move additional items into “More” at `md` only) — **document the rule** in a short comment above `sitePrimaryNavFlat` or in `nav-links.ts`.
2. Avoid duplicating labels between flat list and footer; footer remains the long tail in `footerSections`.

### Step D — Mobile parity

1. Audit `mobile-nav.tsx` against desktop: every item in `sitePrimaryNavFlat` + `siteNavMore` + both CTAs must have a clear path (drawer link or button).
2. Confirm `SheetTitle` / `aria-*` labels are correct for screen readers.

### Step E — Layout and heroes

1. Confirm `src/app/(site)/layout.tsx` uses the same top padding as the header height.
2. Search `(site)` pages for **full-bleed heroes** that use negative margin to tuck under the nav; adjust only if the new grid changes bar height or z-index stacking.

### Step F — Static HTML parity (optional but valuable)

If `docs/html` prototypes still use an older header pattern, align the **glass `.site-header`** story with the chosen Concept 01 structure per DESIGN.md §2 L4 — or note “React is canonical; HTML follows in a separate PR” in your handoff.

---

## 6. Verification checklist

- [ ] No raw palette utilities or hex in touched TSX/CSS modules.
- [ ] No decorative `border-b` on the nav shell; forms inside nav (if any) still use `border-border`.
- [ ] Desktop: Tab order is **brand → primary links → More → secondary CTA → primary CTA → mobile trigger** (hidden on `md+` as appropriate).
- [ ] Mobile: menu opens, focus moves into drawer, Escape closes, links navigate and close drawer.
- [ ] `pnpm typecheck` and `pnpm lint` pass.
- [ ] Visual spot-check at `sm`, `md`, `lg`, `xl` for overflow and CTA visibility.

---

## 7. Handoff summary (required in the agent’s final reply)

The implementing agent should end with:

1. **Which variant is primary** (expected: Concept 01) and why in one paragraph.
2. **List of files changed** with a one-line purpose each.
3. **Screenshots or notes** for `md` and `sm` breakpoints.
4. **Follow-ups** explicitly deferred (02 global search, 05 midnight prop, 03 deep rail redesign).

---

## 8. Related references

| Artifact | Role |
| -------- | ---- |
| [`docs/design/DESIGN.md`](../../design/DESIGN.md) | Tokens, L4 chrome, no-line rule |
| [`docs/build/prompts/stitch-to-react-migration.md`](./stitch-to-react-migration.md) | Stitch → token translation |
| [`docs/build/stitch/movemental_navigation_showcase_gallery/code.html`](../stitch/movemental_navigation_showcase_gallery/code.html) | Five nav concepts (source visuals) |
| [`templates/alan-hirsch/exemplars/exemplar-top-nav-header.html`](../../../templates/alan-hirsch/exemplars/exemplar-top-nav-header.html) | Static glass header lab |
