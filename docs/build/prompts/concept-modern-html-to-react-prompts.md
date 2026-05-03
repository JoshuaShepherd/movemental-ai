# Concept Modern HTML → React migration prompts

Running list of **paste-ready prompts** for moving the static **Concept Modern** prototypes under `docs/html/` into the production **Next.js 16 + React 19 + Tailwind v4 + shadcn/ui** app, while keeping repo conventions (`pnpm`, Server Components by default, `proxy.ts`, six-layer chain when touching data).

**How to use:** Paste one prompt block into the agent in the `movemental` repo root. Complete prompts in order when possible: **design charter refresh → global nav → page migrations**. After each migration, run `pnpm typecheck` and `pnpm lint`.

**Authoritative mechanical migration rules:** [stitch-to-react-migration.md](./stitch-to-react-migration.md) (token remaps, `"use client"` boundaries, no raw hex in components). When this file conflicts with an updated `DESIGN.md` produced by **Prompt 01**, **`DESIGN.md` wins**.

**Prototype style charter (read in Prompt 01):** [docs/design/FUTURE-concept-modern-html-charter.md](../../design/FUTURE-concept-modern-html-charter.md)

**Phase 0 — Locked source map (HTML inventory, route map, redirects):** [concept-modern-source-map.md](../concept-modern-source-map.md)

---

## Prompt 01 — Inventory the Concept Modern HTML system and revise `DESIGN.md` to match

You are working in the `movemental` repo.

**Goal:** Make [docs/design/DESIGN.md](../../design/DESIGN.md) the **single canonical design spec** for production, **aligned with the Concept Modern static HTML language** used across `docs/html/*-concept-modern*` prototypes—not as a loose “future” note, but as enforceable rules engineers can implement in Tailwind semantic tokens.

**Do this:**

1. **Read and synthesize** the following sources (in this order):
   - [docs/design/FUTURE-concept-modern-html-charter.md](../../design/FUTURE-concept-modern-html-charter.md) — scope, principles, token intent, typography roles (Inter + Instrument Serif emphasis), motion, a11y baselines, and documented differences vs the old DESIGN.md.
   - The **shared foundations** in:
     - `docs/html/homepage-concept-modern/styles.css` (base tokens, nav, hero, sections, footer, reveal behavior).
     - `docs/html/homepage-concept-modern/index.html` (document structure and section naming patterns).
   - **Extension surfaces** that layer on the homepage base (note import/ordering assumptions from the charter):
     - `docs/html/audience-concept-modern/styles.css` plus any of `churches.html`, `nonprofits.html`, `institutions.html`, `movement-leaders.html` for layout deltas.
     - `docs/html/articles-concept-modern/styles.css` and `index.html`.
   - Any **master component** HTML that is meant to set global chrome patterns under the same system, especially `docs/html/master-components/nav-01.html` (for nav semantics and breakpoints only—full nav implementation is Prompt 02).

2. **Produce an updated `DESIGN.md`** that:
   - Replaces contradictory guidance where Concept Modern should now govern **marketing / editorial** surfaces (homepage, audience hubs, articles index, books hub, team, assessments hub, contributor layer).
   - Defines a **clear token strategy**: how warm paper / ink / midnight bands map to existing or new **semantic** CSS variables and Tailwind classes in `src/app/globals.css` (no raw hex in TSX). If Concept Modern needs new tokens (e.g. serif accent, warm backgrounds), **name them and add them to `@theme`** in a follow-up implementation pass—in this prompt pass, specify the exact token table edits you want.
   - Resolves **CTA philosophy** (charter notes ink pills vs brand primary): pick one default for marketing pages and document exceptions, with accessibility contrast requirements.
   - States **border/line sectioning** rules honestly (Concept Modern uses hairlines and bands). If production still forbids 1px section borders globally, document the **approved alternative** (e.g. `border-border` at outline opacity for dividers only) or update the rule to match the prototype—do not leave ambiguity.
   - Preserves **non-negotiables** that should remain global: Inter as primary UI font via `next/font/google`, no decorative drop shadows except `shadow-ambient` where elevation is justified, light default + optional global dark if already a product requirement, WCAG baselines, reduced-motion behavior.
   - Adds a short **“Concept Modern → React”** subsection: how static `script.js` behaviors (e.g. reveal-on-scroll) should be reimplemented (CSS-first vs minimal client leaves with `motion` / GSAP), and how `prefers-reduced-motion` must gate motion.

3. **Update cross-links** at the top of [docs/design/FUTURE-concept-modern-html-charter.md](../../design/FUTURE-concept-modern-html-charter.md) so it reads as **historical / delta log** pointing at the new canonical sections in `DESIGN.md` (or merge its unique technical detail upward and slim the charter—your call, but avoid two competing specs).

4. **Deliverables checklist:** edited `DESIGN.md`, edited or slimmed `FUTURE-concept-modern-html-charter.md`, and a short bullet list of **follow-up engineering tasks** (globals.css token additions, font loading for Instrument Serif if approved, component refactors)—no unrelated refactors.

**Constraints:** Do not change application code in this prompt unless you must fix a broken link in docs. Use `pnpm` terminology only.

---

## Prompt 02 — Implement site navigation from `nav-01.html` (Concept Modern)

You are working in the `movemental` repo. [docs/design/DESIGN.md](../../design/DESIGN.md) is canonical; if Prompt 01 is done, follow the revised token and CTA rules there.

**Source of truth (structure, density, breakpoints, a11y):** `docs/html/master-components/nav-01.html` (and any CSS it assumes from the Concept Modern base—trace linked styles or embedded patterns).

**Goal:** Update the **production site chrome** so `SiteNav` / mobile nav / CTA cluster match the **layout, interaction, and visual hierarchy** of `nav-01.html`, implemented with **semantic tokens** only in React + Tailwind.

**Do this:**

1. Locate the live nav implementation (`src/components/nav/` or equivalent), link config, and `(site)/layout.tsx` spacing assumptions (`pt-16`, etc.). Map every major region in `nav-01.html` to a React structure (logo lockup, primary links, secondary links, CTAs, mobile drawer, focus order).

2. Translate visuals strictly through **semantic utilities** (`bg-background`, `text-foreground`, `border-border`, `bg-primary`, etc.). Replace any prototype hex with the token mapping table from `DESIGN.md`. **Do not** import Google Fonts in raw `<link>` tags in layout; use `next/font/google` per project rules.

3. Preserve **SSR-friendly** behavior: no hydration mismatch from layout measurement unless isolated in a tiny client leaf. Keyboard navigation, `aria-expanded` on toggles, and skip-link behavior must match or exceed the prototype.

4. After edits: `pnpm typecheck`, `pnpm lint`. Fix any regressions to footer or main content offset.

**Out of scope:** Rewriting page bodies, changing route targets unless the prototype clearly fixes a broken IA label (if you change labels or hrefs, update the central nav config in one place).

---

## Prompt 03 — Migrate **Homepage (Concept Modern)** → overwrite `src/app/(site)/page.tsx`

**Sources (read all, including JS motion):**

- `docs/html/homepage-concept-modern/index.html`
- `docs/html/homepage-concept-modern/styles.css`
- `docs/html/homepage-concept-modern/script.js`

**Target (overwrite composition and dependent sections, not unrelated routes):** `src/app/(site)/page.tsx` and any **home-only** section components under `src/components/sections/` (or create `sections/home/` if that matches existing patterns).

**Instructions:**

1. Rebuild the homepage in **React Server Components** by default; extract **only** true interactivity (mobile-only behaviors already in nav, carousels, scroll-driven effects) into **leaf** client components.

2. Reproduce **section order, copy hierarchy, typographic roles** (Inter vs Instrument Serif per `DESIGN.md`), and **spacing rhythm** from the HTML. Do not paste the prototype’s raw color classes—translate everything to semantic Tailwind per the updated `DESIGN.md`.

3. Replace prototype assets with **existing** `public/` images where they already exist; if an asset is missing, use a **neutral placeholder** pattern already used elsewhere in the repo (do not invent new CDN stock).

4. If `script.js` implements scroll reveal: reimplement with **CSS `@media (prefers-reduced-motion)`** gating and a minimal client hook only if CSS alone cannot match the prototype.

5. Verify: `pnpm typecheck`, `pnpm lint`, and a quick local smoke of `/` for layout shift around the fixed nav.

---

## Prompt 04 — Migrate **Books hub (Concept Modern)** → overwrite `src/app/(site)/book/page.tsx`

**Sources:**

- `docs/html/books-concept-modern/index.html`
- `docs/html/books-concept-modern/styles.css`

**Target:** `src/app/(site)/book/page.tsx` and any book-index-specific components (e.g. cards grid, featured title band) that should live next to other book routes.

**Instructions:** Same discipline as Prompt 03 (semantic tokens, RSC-first, leaf clients only, no raw hex, preserve metadata export patterns for `Metadata` on the page). Match IA and copy blocks from the prototype; wire **real** book links only where the app already has canonical slugs—otherwise keep structure with TODO data hooks **without** inventing fake catalog entries.

---

## Prompt 05 — Migrate **Audience hub pages (Concept Modern)** → overwrite audience routes

**Sources (folder):** `docs/html/audience-concept-modern/`

| Prototype HTML | Overwrite this Next route | Primary React composition today |
|----------------|---------------------------|-----------------------------------|
| `movement-leaders.html` | `src/app/(site)/movement-leaders/page.tsx` | `src/components/sections/movement-leaders/movement-leaders-page-content.tsx` |
| `churches.html` | `src/app/(site)/churches/page.tsx` | `src/components/sections/churches/churches-page-content.tsx` |
| `nonprofits.html` | `src/app/(site)/nonprofits/page.tsx` | `src/components/sections/nonprofits/nonprofits-page-content.tsx` |
| `institutions.html` | `src/app/(site)/institutions/page.tsx` | `src/components/sections/institutions/institutions-page-content.tsx` |

**Dependency chain (read in this order for every audience page):**

1. `docs/html/homepage-concept-modern/styles.css` — base tokens, hero, label, errors, stakes, orientation, path, invitation, footer register.
2. `docs/html/audience-concept-modern/styles.css` — **extensions only**: `.audience-tag`, `.hero__aside--audience`, `.shape` / `.failure`, `.moves` / `.move`, `.outcomes` / `.outcome`, `.starting` / `.question`, `.hero__tension`, list typography inside `.orientation__body`, path step body paragraphs, etc.
3. Each `*.html` — document order, ids for in-page anchors, copy hierarchy, optional hero-embedded tension (churches / institutions).
4. **JS:** each HTML file loads `../homepage-concept-modern/script.js` (nav scroll class, reveal-on-scroll, reading-progress fill, footer year). There is **no** separate `audience-concept-modern/*.js` — parity means reusing the same behaviors already implemented for the homepage (`RevealOnScroll`, `NavScrollShadow`, `NavReadingProgress`, etc.).

---

### Compare / contrast — prototype vs current React (strategic)

**What the HTML prototypes are**

- A **single warm editorial system**: Inter body, Instrument Serif for italic emphasis and audience-specific pull quotes, cream duotone surfaces, hairline borders for rhythm, ink-filled pill CTAs, Medium-style reading progress in the **embedded** prototype nav.
- **Long-form narrative arcs** per audience: hero + optional tension/errors + stakes/orientation + **shape-of-the-problem** grids (`.shape` / `.failure`) + **moves** (stacked `.move` rows on `bg-alt`) + **outcomes** (three-column statement grid) + **starting** (intro + numbered diagnostic questions) + **invitation** on **paper** (same as homepage HTML — not a midnight band).
- **Shared chrome in the static files** only for offline viewing; production must keep **one** `SiteNav` / `SiteFooter` from `(site)` / root layout.

**What the React pages are today**

- Mostly **Stitch-era or hybrid marketing** compositions: photo heroes (`LightHeroPhotoBackdrop`, decorative background `Image`), `Display` / `Eyebrow` / `EditorialShowcaseIntro`, icon cards, gradient CTAs (`bg-linear-to-br from-primary …`), system-build pathways, and nonprofit-specific funnel content — **not** the same section order, copy, or typographic roles as the Concept Modern HTML.
- `data-editorial="concept-modern"` appears on wrappers, but **visual language does not match** the audience HTML/CSS templates; several pages still use patterns the Concept Modern charter discourages for this register (e.g. heavy card chrome vs hairline grids).

**Implication:** Migrating is not a reskin. It is a **content + structure replacement** aligned to `docs/design/DESIGN.md` and the tokenized `globals.css` ramp, then deleting or archiving Stitch-only blocks that no longer apply.

---

### Canonical section algebra (anchor ids from HTML)

Use this when planning shared components and scroll targets. **Not every page includes every block.**

| Block (HTML class) | Movement leaders | Nonprofits | Churches | Institutions |
|--------------------|------------------|------------|----------|----------------|
| `hero` | ✓ | ✓ | ✓ | ✓ |
| Tension / two errors **inside** hero (`errors__*` in hero) | — | — | ✓ (extended hero) | ✓ (`hero__tension`) |
| `errors` **full band** | — | ✓ | — | — |
| `stakes` | — | ✓ | ✓ | ✓ |
| `orientation` | — | ✓ | ✓ | ✓ |
| `shape` (`#shape`) | ✓ | ✓ | ✓ | ✓ |
| `authority` | — | ✓ | ✓ | ✓ |
| `path` (`#path`) | — | ✓ | ✓ | ✓ |
| `moves` (`#moves`) | ✓ | ✓ | ✓ | ✓ |
| `outcomes` | ✓ | ✓ | ✓ | ✓ |
| `starting` (`#starting`) | ✓ | ✓ | ✓ | ✓ |
| `invitation` (`#invitation`) | ✓ | ✓ | ✓ | ✓ |

Implement **per-page composition** in `*-page-content.tsx` by importing shared primitives; do not force one monolithic template if a page omits a section.

---

### Step-by-step — fully integrate HTML/CSS/JS with `globals.css` and React

**Phase A — Design and tokens (do once, before touching all four pages)**

1. **Open** [docs/design/DESIGN.md](../../design/DESIGN.md) **and** the homepage parity work in Prompt 03. Confirm: pill CTAs = ink on paper, invitation stays on **light** inverse of midnight unless DESIGN explicitly overrides, hairline `border-border` is allowed for editorial rhythm, Instrument Serif scope (emphasis + audience asides + select headings per CSS).

2. **Inventory `audience-concept-modern/styles.css`** rule by rule. For each selector group, decide:
   - **Already covered** by existing utilities / `:root` / `[data-variant]` (e.g. `.moves { background: var(--bg-alt) }` → `Section variant="section"` or `bg-section`).
   - **Needs a new semantic utility** — add to `@theme` / `:root` in `src/app/globals.css` only if the token does not exist (avoid duplicating `--ink` as random hex in TSX).
   - **Needs a small `@layer components` block** scoped under a stable hook, e.g. `[data-audience="concept-modern"]`, for patterns that are painful to express as Tailwind only (multi-breakpoint `.failure` / `.shape__grid` border logic — mirror homepage path-step strategy).

3. **Font roles:** Instrument Serif for `.audience-tag`, `.hero__aside--audience` pull quotes, `.failure__title`, `.move__title`, `.outcome__title`, `.question__prompt`, and `em` inside headings — use `font-serif` / `SerifEm` / existing `h1 em` global rules; load fonts **only** via `next/font` in `layout.tsx` (never add `<link>` fonts in pages).

**Phase B — Shared React primitives (create before rewriting pages)**

4. Under e.g. `src/components/sections/audience-concept/` (name to taste), add **presentational** building blocks that map 1:1 to HTML regions, accepting props for copy and lists:
   - `AudienceConceptLabel` — dot + uppercase label (same as homepage `ConceptLabel` or reuse that component).
   - `AudienceHero` — two-column `hero__grid`, optional `audience-tag` in the label row, main column + `hero__aside--audience` with optional `.hero__aside-attr`.
   - `AudienceErrorsBand` — narrow container, `errors__lead` + `errors__pair` hairlines + optional `stakes__note` coda.
   - `AudienceShapeSection` — `shape__head` + `shape__lede` + `ol.shape__grid` / `.failure` cells (ensure `li` is direct child of `ol` for valid HTML and border math; wrap reveal **inside** `li` if using `RevealOnScroll`).
   - `AudiencePathSection` — reuse the same border-grid pattern as homepage Concept Modern path steps.
   - `AudienceMovesSection` — `moves__list` of `.move` rows (two-column from `md` per CSS).
   - `AudienceOutcomesSection` — `outcomes__grid` three-up with shared border rules.
   - `AudienceStartingSection` — `starting__intro` + `starting__questions` list.
   - `AudienceInvitationSection` — paper invitation matching homepage HTML (no midnight unless DESIGN says otherwise).

5. **Motion / JS parity:** wrap block entrances with `RevealOnScroll` using the same `threshold` / `rootMargin` / stagger delays as `homepage-concept-modern/script.js`. Respect `prefers-reduced-motion`. Do **not** add new global scroll listeners per page.

6. **Images:** the audience HTML prototypes are **type- and photo-free** in the hero. Remove Stitch photo heroes unless DESIGN explicitly requires photography; if a page must keep an asset, treat it as an exception documented in the PR.

**Phase C — Per-route integration**

7. For **each** route in the mapping table:
   - Replace `*PageContent` implementation so section order and **ids** match the HTML (`#shape`, `#path`, `#moves`, `#starting`, `#invitation`, etc.) for deep links and nav parity.
   - Move long copy into `*-data.ts` (or colocated constants) as structured objects (steps, failures, moves, questions) — same pattern as homepage / system builds data files.
   - Update `page.tsx` `metadata` **title** and **description** to match each HTML `<title>` and `<meta name="description">` unless product/SEO owners supply overrides (then document the delta in a code comment).

8. **Nav / footer:** keep `SiteNav` link config as the single IA source; do not duplicate prototype’s four-link-only bar unless Prompt 02 already aligned global nav to Concept Modern. Ensure CTA labels/hrefs are consistent with invitation anchors (`#invitation` → `/contact` or agreed conversion path).

9. **Strip conflicting patterns** from the old React pages: gradient CTA washes, `rounded-md` marketing buttons where the template uses pills, `shadow-ambient` on flat editorial surfaces, and extra Stitch-only sections that have **no** counterpart in the HTML — archive to `docs/build/stitch/` or delete per repo policy.

**Phase D — Verification**

10. Run `pnpm typecheck` and `pnpm lint` after **each** page lands (or after all four if you batch, but fix failures before merging).

11. Manual pass: compare side-by-side at `sm` / `md` / `lg` breakpoints — hero aside border-left vs card, path / shape border grids, moves band background, invitation typography.

12. Optional: add or extend a Playwright spec that loads each audience route and asserts presence of canonical `#invitation` and one audience-specific `#shape` heading string (smoke only; not a pixel diff).

**Explicit out of scope for Prompt 05**

- Redesigning `SiteNav` data model (that remains Prompt 02).
- Rewriting `/how-it-works`, `/contact`, or assessment flows unless the HTML prototype links to them and the link target is broken.
- Importing raw hex or Google Fonts `<link>` tags in audience pages.

---

## Prompt 06 — Migrate **Articles index (Concept Modern)** → overwrite `src/app/(site)/articles/page.tsx`

**Sources:**

- `docs/html/articles-concept-modern/index.html`
- `docs/html/articles-concept-modern/styles.css`

**Target:** `src/app/(site)/articles/page.tsx` (list / hub only).

**Instructions:** Port the prototype’s **index** layout and filters/cards if present. If the app’s articles list is **data-backed**, preserve existing data fetching patterns (Server Component `async` page, hooks in child components if needed) and only change presentation to match the prototype. Do not redesign `[slug]` article detail in this prompt unless the prototype explicitly covers it (it does not in the file list you gave).

---

## Prompt 07 — Migrate **Team page (Concept Modern)** → overwrite `src/app/(site)/team/page.tsx`

**Sources:**

- `docs/html/team-concept-modern/index.html`
- `docs/html/team-concept-modern/styles.css`

**Target:** `src/app/(site)/team/page.tsx` and any team-specific section components.

**Instructions:** Same RSC-first + semantic token rules. If the prototype hardcodes bios, replace with the project’s **real team data source** if one exists (constants file, CMS hook, etc.); otherwise keep structure with clearly marked placeholders **without** inventing fake people.

---

## Prompt 08 — Migrate **Assessments hub (Concept Modern)** → overwrite `src/app/(site)/assess/page.tsx` (+ linked section components)

**Sources:**

- `docs/html/assessments-concept-modern.html` (self-contained prototype; read inline `<style>` and any inline scripts)

**Target:**

- `src/app/(site)/assess/page.tsx`
- `src/components/sections/assess/*` as needed (the prototype’s own comments reference `assess-page-content.tsx`, `system-readiness-diagnostic.tsx`, etc.—**diff against those** rather than fork-duplicating logic)

**Instructions:**

1. The static file is a **visual shell** for the assessments hub; the **28-step diagnostic flow** remains in React. Align **hero, intro bands, typography, and CTA placement** with the HTML while preserving existing business logic, routes, and analytics events.

2. If the prototype suggests new copy, merge carefully with existing metadata in `assess/page.tsx` (`Metadata` export).

3. Strongly prefer **tokenizing** any warm/neutral palette from the prototype into `DESIGN.md` / `globals.css` rather than inline styles.

---

## Prompt 09 — Migrate **Contributor layer (Concept Modern)** → overwrite `src/app/(site)/book/contributors/page.tsx`

**Sources:**

- `docs/html/contributor-layer.html` (read fully; trace any shared CSS assumptions against homepage Concept Modern base if linked)

**Target:** `src/app/(site)/book/contributors/page.tsx` and any directly related components under `src/components/sections/` or `src/components/` used only by this page.

**Instructions:** Port the prototype’s **layered narrative / stacked sections** into RSC-first React. Preserve book ecosystem IA (breadcrumbs, links back to ` /book`, etc.) if already present. Use semantic tokens only; ensure **focus order** and **heading hierarchy** are valid after conversion from static HTML.

---

## Appendix — Quick path index

| Area | Prototype path(s) | Primary Next target |
|------|-------------------|---------------------|
| Design charter | `docs/design/FUTURE-concept-modern-html-charter.md` + Concept Modern CSS | `docs/design/DESIGN.md` |
| Global nav | `docs/html/master-components/nav-01.html` | `src/components/nav/*`, `(site)/layout.tsx` |
| Home | `docs/html/homepage-concept-modern/*` | `(site)/page.tsx` |
| Books | `docs/html/books-concept-modern/*` | `(site)/book/page.tsx` |
| Audience | `docs/html/audience-concept-modern/*.html` + `./styles.css` + `../homepage-concept-modern/styles.css` + `../homepage-concept-modern/script.js` | `(site)/{movement-leaders,churches,nonprofits,institutions}/page.tsx` + `src/components/sections/{movement-leaders,churches,nonprofits,institutions}/*-page-content.tsx` (Prompt 05) |
| Articles hub | `docs/html/articles-concept-modern/*` | `(site)/articles/page.tsx` |
| Team | `docs/html/team-concept-modern/*` | `(site)/team/page.tsx` |
| Assessments hub | `docs/html/assessments-concept-modern.html` | `(site)/assess/page.tsx` + assess sections |
| Contributors | `docs/html/contributor-layer.html` | `(site)/book/contributors/page.tsx` |

When adding new prompts to this file, append a new **numbered Prompt** section with: **Goal**, **Sources**, **Targets**, **Instructions**, **Verification commands**, and **Explicit out-of-scope** lines to keep agents from drifting.
