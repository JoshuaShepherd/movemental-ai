# Template System — Architectural Status

**Purpose:** Read-only architectural review of the public template system (pastoral-warm, institutional, editorial-light, dark-first, etc.) and its alignment with Next.js App Router, Tailwind layering, CSS scoping, multi-tenant architecture, theme tokens, and maintainability.

**Scope:** Analysis only. No refactors, rewrites, or changes to database, services, or hooks.

---

## 1. Current Template Architecture

### Two Distinct Systems

The codebase has **two separate template-related systems** that do not share activation or styling:

| Aspect | **A. Next.js “Movement Leader” template** | **B. Public template library (pastoral-warm, etc.)** |
|--------|------------------------------------------|------------------------------------------------------|
| **Location** | `app/globals.css` + `app/templates/` route group | `public/templates/library/{id}/` (static HTML + per-folder `css/main.css`) |
| **Served as** | React app under `/templates/*` | Static files under `/templates/library/{id}/` |
| **Activation** | Wrapper + `data-variant` (see below) | URL path; each request loads that folder’s `index.html` and `css/main.css` |

---

### A. Next.js Movement Leader template

**Where template styles are defined**

- **`app/globals.css`**:
  - **Tailwind v4 `@theme` block:** Defines Tailwind tokens that reference CSS variables (e.g. `--color-mvmt-text-primary`, `--color-mvmt-accent`). Those variables are **not** defined in `@theme`; they are defined later under `.template-movement-leader`.
  - **`.template-movement-leader`:** A large block (outside any `@layer`) that sets `--mvmt-*` tokens (colors, surfaces, typography, gradients, radius, shadows, button hierarchy). A long list of **`.template-movement-leader[data-variant="..."]`** overrides then adjusts tokens per section variant (e.g. `colorful-headline`, `agency-gradient`, `courses-video-player`).
  - **Scoped utility classes:** e.g. `.template-movement-leader .bg-mvmt-gradient-hero-brand` for gradient backgrounds.
- **Tailwind config:** Tailwind v4 is configured via `app/globals.css` (`@import "tailwindcss"`, `@theme`, `@layer base`). There is no separate `tailwind.config.js`; content/source is controlled in CSS.

**How the template is activated**

- **Layout:** `app/templates/layout.tsx` wraps children in `VariantProvider` and `SiteNavigation`.
- **Wrapper:** `app/templates/template-variant-context.tsx` renders a single wrapper:
  - `className="min-h-screen template-movement-leader"`
  - `data-variant={variant}` (variant is React state, set from the template picker).
- So activation is **wrapper class + optional `data-variant`**. There is **no `data-theme`** in the app (only in a standalone `html/brad-brisco-terrain.html` file).

**Driven by**

- **Hybrid:**
  - **CSS-variable driven:** All look-and-feel is via `--mvmt-*` (and per-variant overrides). Tailwind `@theme` maps some of these into `--color-mvmt-*` for use with Tailwind utilities.
  - **Tailwind class driven:** Components use Tailwind classes (including those that reference the theme tokens).
  - **Scoped CSS driven:** All template-specific rules are scoped under `.template-movement-leader` (and `[data-variant="..."]`). No unscoped template rules at global level.

**Template-specific fonts**

- **Root layout** (`app/layout.tsx`) loads Next.js fonts (Inter, Poppins, DM Sans, Nunito, Playfair Display, Lora, Space Grotesk) and exposes them as CSS variables on `<html>` (e.g. `--font-inter`).
- **Movement Leader template** uses them via tokens: `--mvmt-font-heading: var(--font-inter), ...` and `--mvmt-font-body: var(--font-inter), ...` in `.template-movement-leader`. So fonts are **global from the app**, and the template only references them; it does not load its own font files.

**What the template affects**

- **Tokens:** Yes — all `--mvmt-*` and variant overrides.
- **Surface styles:** Yes — backgrounds, text colors, borders, gradients, shadows, radius.
- **Layout:** Only indirectly (e.g. `min-h-screen` on the wrapper; section layouts are in component structure).
- **Structural markup:** No — markup is in React components under `components/layouts/movement-leader` and template pages; the template system does not change DOM structure, only styling.

---

### B. Public template library (pastoral-warm, institutional, editorial-light, dark-first, etc.)

**Where template styles are defined**

- **Per-template CSS:** Each template folder has `css/main.css` (e.g. `public/templates/library/pastoral-warm/css/main.css`). No Tailwind; plain CSS only.
- **Token definition:** Each `main.css` starts with a **`:root`** block defining semantic tokens (e.g. `--font-heading`, `--font-body`, `--bg`, `--bg-elevated`, `--text`, `--accent`, `--radius`, spacing, line-height). Names are **consistent across templates** (e.g. `--bg`, `--accent`) but **values** differ per design (e.g. pastoral-warm: warm neutrals, Lora + DM Sans; dark-first: dark surfaces, Inter; institutional: navy/slate, Inter).
- **No `globals.css`:** These pages do not load the Next.js app or `app/globals.css`. They are standalone HTML documents.

**How a template is activated**

- **URL only.** Visiting `/templates/library/pastoral-warm/` (or `/templates/library/pastoral-warm`) serves `pastoral-warm/index.html`, which links to `css/main.css`. Next.js redirects in `next.config.mjs` map those paths to the correct `index.html`. There is no React, no wrapper class, and no `data-theme` in these pages.

**Driven by**

- **CSS-variable driven** for tokens.
- **Scoped CSS driven** only in the sense that each template is a **separate document** with its own stylesheet. Within that sheet, selectors are **not** namespaced by a wrapper (e.g. no `.pastoral-warm` root); they use shared BEM-style names (e.g. `.public-header`, `.home-hero`). So “scoping” is **document-level**, not class-level.

**Template-specific fonts**

- Each HTML file loads its own fonts (e.g. Google Fonts: DM Sans + Lora for pastoral-warm, Inter for institutional). Fonts are referenced in `:root` (e.g. `--font-heading: 'Lora', ...`). No sharing with the Next.js app.

**What templates affect**

- **Tokens:** Yes — full `:root` set per template.
- **Surface styles and layout:** Yes — same file defines components (header, hero, cards, etc.) and layout (flex, grid, spacing). **Structural markup** is in the static HTML (e.g. `.public-header`, `.main-content`). So these templates affect **layout, tokens, and surface styles** within their own document.

---

## 2. Template Switching Model

- **Next.js Movement Leader**
  - **Runtime.** Variant is React state in `VariantProvider`; user picks a variant in the UI and `data-variant` updates. No build-time choice.
  - **Not multi-tenant.** No `organizationId` or tenant in template or variant logic. Used only for the internal template showcase under `/templates/*`.
  - **Not URL driven.** Variant is in memory; refreshing can reset it unless you add persistence.
  - **Config / code:** Variant set is hard-coded in `app/templates/page.tsx` (e.g. `HeroVariant`, `templateComponents`). No external config file.

- **Public template library**
  - **“Switch” = which URL you open.** Each template is a different path. No runtime switching within one page.
  - **Not multi-tenant.** These are design prototypes for preview. No tenant or org association; no API or app logic selects a template per tenant.
  - **URL driven.** Template id comes from the path (`/templates/library/{id}/`).
  - **Config:** `public/templates/library/templates-manifest.json` lists templates and pages; the templates dashboard reads it to build links. Content is synced from an external repo via `npm run template:sync-library` (see `_docs/TEMPLATE_LIBRARY_SYNC.md`).

**Summary:** There is no tenant-aware, config-driven template selection for leader sites today. The app has an internal variant picker (Movement Leader) and a static library of standalone HTML/CSS prototypes (pastoral-warm, etc.), with no connection between them or to tenant identity.

---

## 3. Layering Integrity

**Templates do NOT modify**

- **Drizzle schemas** — No references to “template” or “theme” in `db/`.
- **Zod schemas** — No template/theme types in `lib/schemas/` (only unrelated “themes” in onboarding copy).
- **Services** — No template/theme logic in `lib/services/`.
- **Hook signatures** — No template/theme in `hooks/`.
- **Data flow** — No API or hooks pass template id or theme; type chain is unchanged.

**Templates live in Layer 6 (UI + styling)**

- **Movement Leader:** Implemented as layout + context + components under `app/templates/` and `components/layouts/movement-leader`. Styling is in `app/globals.css`. This is all presentation.
- **Public library:** Static HTML/CSS in `public/`; not part of the React type chain. They are design assets consumed by URL.

**Leakage**

- **None identified.** No template or theme concept in Layers 1–5. The only “theme” in the app is the optional `data-theme="terrain"` in `html/brad-brisco-terrain.html`, which is outside the main app and not used by the template system.

---

## 4. CSS Collision Risk

**Next.js Movement Leader**

- **Scoping:** All rules are under `.template-movement-leader` or `.template-movement-leader[data-variant="..."]`. So they do not apply outside that wrapper. **Properly scoped.**
- **Tailwind layers:** The template block is **not** inside `@layer base` (or any other `@layer`). It sits in the default (unlayered) cascade, so it can override Tailwind base if selectors match. Risk is **low** because every selector is prefixed by `.template-movement-leader`; they won’t affect the rest of the app unless something outside the template mistakenly uses the same class.
- **Element selectors:** Used only **inside** the scoped block (e.g. `.template-movement-leader .bg-mvmt-gradient-hero-brand`). No raw `body` or `html` overrides in the template block. **Safe.**
- **Variables:** `--mvmt-*` are defined on `.template-movement-leader`, so they are **isolated** to that subtree. They don’t overwrite `:root` or global shadcn tokens.

**Public template library**

- **Document isolation:** Each template is a separate HTML document with its own `main.css`. These styles **never** load in the same document as the Next.js app, so **no collision** with the app or with each other.
- **Within a template:** Selectors are global in that document (e.g. `body`, `.public-header`). If two templates were ever combined into one page (they aren’t), same class names could clash. **Not a current risk** given one-document-per-template.

**Compare-substack**

- `.compare-substack-page` in `globals.css` is another scoped block (like Movement Leader). Used for `/compare/substack`. Same pattern: scoped, no global leakage.

---

## 5. Tailwind & shadcn Integration

**Movement Leader (Next.js)**

- **Tailwind tokens:** `@theme` in `globals.css` maps `--mvmt-*` into Tailwind’s token system (e.g. `--color-mvmt-text-primary`). So templates are **aligned** with Tailwind’s token system for the tokens that are mapped. Not every `--mvmt-*` may have a Tailwind alias, but the main ones do.
- **shadcn:** The template wrapper only wraps the `/templates/*` subtree. Dashboard and other app routes use shadcn with default `:root` / `.dark` tokens. Template pages could use shadcn components inside the wrapper; those would get the app’s global tokens unless components are built to use `--mvmt-*`. So **no structural fight** with shadcn; potential **token split** if you mix shadcn defaults and Movement Leader tokens in the same tree.
- **Raw CSS:** The template uses a lot of raw CSS in `globals.css` (scoped under `.template-movement-leader`) for variant overrides and gradients. That **bypasses** Tailwind utilities for those rules but still uses the same underlying `--mvmt-*` variables. So it’s **token-consistent** but not fully “Tailwind-first” for every style.
- **Duplication:** Token **values** live once in `.template-movement-leader` (and variants). Tailwind `@theme` only **references** those variables; it doesn’t duplicate values. So **no value duplication** between Tailwind config and template CSS.

**Public library**

- **No Tailwind.** Templates use only plain CSS and their own `:root` tokens. So **no Tailwind or shadcn** in those pages; no conflict, no integration.

---

## 6. Multi-Tenant Viability

**Current state**

- **Per-tenant template:** Not implemented. There is no tenant or org field that selects a template; no API or layout that applies “pastoral-warm” or “institutional” based on tenant.
- **Style bleed:**
  - **Between tenants:** N/A — tenant-specific rendering with different templates isn’t built yet.
  - **Library vs app:** No bleed — library templates are separate documents. Movement Leader is scoped to a single wrapper used only under `/templates/*`.
- **Path to versioning:**
  - **Library:** Templates are file-based and synced from an external repo. You could version by path (e.g. `v1/pastoral-warm`) or by manifest. No versioning is in place today.
  - **Movement Leader:** Variants are fixed in code; no version field or A/B matrix.

**If each tenant were to have a template**

- **Library templates:** You’d need to either (1) render those designs inside the app (e.g. React + shared components with template-specific tokens), or (2) serve tenant-specific static builds. Current static set doesn’t know about tenants.
- **Movement Leader:** You could drive `data-variant` (or a future `data-template`) from tenant config. Scoping would still hold; the main work would be wiring tenant → template/variant in layout or middleware and ensuring one wrapper per request.
- **Risk:** If multiple templates load in one document (e.g. wrong layout applying two wrappers or two stylesheets), shared class names in the library (e.g. `.public-header`) could clash. Today’s design avoids that by keeping library and app separate and one-doc-per-template.

---

## 7. Verdict

### Overall health score: **6.5 / 10**

- **Clear separation** between the two systems and no type-layer leakage.
- **Movement Leader** is scoped and token-based but lives in a large, unlayered block in `globals.css` and is not tenant-aware.
- **Public library** is maintainable as static prototypes but **not integrated** with the app or multi-tenant model.

### Top 3 structural strengths

1. **Strict Layer 6 boundary** — Templates and theme variants are presentation-only; no schema, services, or hooks depend on them. Easy to evolve styling without touching the type chain.
2. **Movement Leader scoping** — Single wrapper (`.template-movement-leader`) and `data-variant` with token overrides keeps template CSS from affecting the rest of the app and keeps variables isolated.
3. **Document-level isolation of the library** — Static HTML per template avoids any CSS or JS collision with the Next app and makes the library easy to sync and preview by URL.

### Top 3 architectural risks

1. **No multi-tenant template story** — Neither system is wired to tenant/org. Giving each leader a template will require new config, layout, and possibly a bridge from library tokens to the app (or a move to in-app rendering of library designs).
2. **Movement Leader CSS volume and layering** — Hundreds of variant overrides in `globals.css` outside any `@layer` increase maintenance cost and make it harder to reason about cascade vs. Tailwind. One big file also makes it easier to introduce unscoped or overly broad selectors over time.
3. **Dual systems and naming** — Two unrelated “template” concepts (Movement Leader variants vs. library IDs) and overlapping token names (e.g. `--accent`, `--bg`) in the library without a shared contract can cause confusion when/if you unify or reuse library designs in the app.

### Most direct improvement to harden the system

**Put Movement Leader template CSS in a named Tailwind layer and keep a single entry point.** Move the entire `.template-movement-leader` block (and the gradient utility classes) into `@layer components` (or a dedicated `@layer template`), and keep all template rules in that layer so Tailwind’s cascade is explicit and future utilities don’t accidentally override template styles without intent. Optionally split the file (e.g. `globals.css` + `template-movement-leader.css` imported after base) so the main bundle stays readable without changing behavior. This improves maintainability and aligns with Tailwind best practice without a rewrite.

---

*Document generated from read-only analysis of the template system. No code or data layers were modified.*
