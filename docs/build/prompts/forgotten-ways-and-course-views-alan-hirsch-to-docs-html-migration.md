# Prompt: Full front-end migration — Alan Hirsch “Forgotten Ways” + all course surfaces → Movemental-style static HTML/CSS/JS (`docs/html`)

## Purpose

This document is a **step-by-step agent prompt** for taking **every** user-facing view in the sibling **`alan-hirsch`** codebase that belongs to **The Forgotten Ways** course and to **course-related product surfaces** (catalog, enrollment, learn experience, section types, auxiliary chrome, and edge states), and **re-implementing the entire front-end** as **standalone HTML + CSS + JavaScript** under **`movemental/docs/html/`**, using **Movemental’s canonical design language** (Concept Modern / `DESIGN.md` + static parity in `site-theme.css` and related shared sheets).

**Non-negotiable completeness bar:** no omitted routes, no omitted components, no paraphrased copy, no skipped empty/loading/error states, no “we’ll add later” placeholders. If a string, image, icon, control, tooltip, modal, or layout region exists in production React/TSX for that view, it must exist in the static template with the same semantics and content.

**Out of scope for this prompt:** wiring Supabase, Drizzle, auth, payments, or TanStack Query in `movemental`. This pass produces **faithful static prototypes** that later prompts (e.g. `concept-modern-html-to-react-prompts.md`, `stitch-to-react-migration.md`) can promote into Next.js.

---

## 0. Preconditions and machine paths

1. **Primary workspace:** the **`movemental`** repository (this repo).
2. **Sibling source repo (read-only unless the human explicitly authorizes edits there):** canonical path on this machine is **`~/Desktop/dev/repos/movemental-sites/alan-hirsch`** (`Dev` vs `dev` may alias on macOS). Before starting, confirm that path exists and contains `package.json`, `src/app/`, and `src/components/`.
3. Use **`pnpm`** terminology when referring to the sibling app; do not assume `npm`/`yarn`.

---

## 1. Authoritative design sources (read in this order)

Work **design-down**: tokens and shells before page bodies.

| Order | Document / artifact | Why |
| ----- | -------------------- | --- |
| 1 | [`docs/design/DESIGN.md`](../../design/DESIGN.md) | Creative charter, typography roles, motion, semantic color, approved patterns. |
| 2 | [`docs/design/STATIC_HTML_AND_TEMPLATES.md`](../../design/STATIC_HTML_AND_TEMPLATES.md) | **Operational SSOT** for `docs/html`: `<head>` contracts, load order, forbidden duplication of `:root`, shell choice (`.site-top` vs `.site-header`). |
| 3 | `docs/html/site-templates/site-theme.css` | Static **L0–L2 (+ L2b)** token parity with `src/app/globals.css`. |
| 4 | `docs/html/site-templates/prototype-pages.css` | Glass **root prototype** chrome (only if you place files at `docs/html/*.html` and choose that shell). |
| 5 | `docs/html/site-templates/course-preview.css` + `course-preview-app.js` | Existing **course lesson preview** patterns under `docs/html/course-previews/**` — extend or mirror before inventing parallel CSS. |
| 6 | `templates/alan-hirsch/exemplars/*.html` | UI pattern lab already aligned to Movemental tokens; reuse structure where it matches the target view. |

**Hard rules from STATIC_HTML_AND_TEMPLATES:**

- Do **not** paste a second copy of `:root`, global reset, or `html`/`body` rules into page `<style>` blocks.
- Preserve fixed load order where documented: **site-theme → prototype-pages (if used) → optional extras → page-local `<style>` for layout-only deltas**.
- Pick **one** L4 shell per page (draft `.site-top` **or** root `.site-header` + drawer); never mix both.

---

## 2. Output layout in `movemental` (create and keep stable)

Create a **dedicated tree** so course migrations do not collide with unrelated marketing prototypes:

```text
docs/html/alan-hirsch-course-migration/
  README.md                          # index: route → file map, last updated, human owner
  _shared/
    forgotten-ways-shell.css         # layout-only: learn chrome, sidebar widths, TOC — no :root
    forgotten-ways-learn.js        # hash routing, drawer, tabs, accordions — minimal, a11y-first
  forgotten-ways/
    index.html                       # course marketing landing (if distinct from generic catalog entry)
    ...                              # one HTML file per distinct URL pattern / state matrix row
  course-platform/                   # non–Forgotten-Ways but course-shared UI (catalog, account, billing teasers)
    ...
  assets/
    README.md                        # list of copied images/svg with source paths in alan-hirsch
```

**Naming convention:** kebab-case HTML filenames aligned to **source route segments**, e.g. `learn-[slug]-lesson.html`, plus **state suffixes** where needed: `…--loading.html`, `…--empty.html`, `…--error.html`, `…--locked.html`. Prefer **one HTML file per matrix row** over impossible mega-files — but **do not** drop states; if a state is rare, it still gets its own file or a clearly labeled section in the same file with a toggle comment block the human can open.

Update **`docs/html/alan-hirsch-course-migration/README.md`** after every batch so the map stays the contract for “nothing missing.”

---

## 3. Phase A — Inventory the sibling repo (nothing is optional)

You are **discovering ground truth in `alan-hirsch`**. Do not rely on memory of Next.js App Router from other projects.

### A.1 Map every **route** that can show course or Forgotten Ways UI

1. Under `src/app/`, **glob** and list all directories/files touching:
   - `courses`, `course`, `learn`, `lesson`, `module`, `week`, `cohort`, `enroll`, `checkout`, `library`, `dashboard`, `account`, `progress`, `certificate`, `discussion`, `quiz`, `assessment`, `onboarding`, `preview`, `forgotten`, `tfw`, `transformation` (add more tokens if ripgrep suggests them).
2. For each **page.tsx**, **layout.tsx**, **template.tsx**, **loading.tsx**, **error.tsx**, **not-found.tsx**, and **route group** `(…)`, record:
   - **URL pattern** (dynamic segments written as `[param]`).
   - **Auth / gating** (public, signed-in, role, purchase).
   - **Primary layout** file(s) that wrap it.
3. Build a **Route manifest table** (Markdown) with columns:
   - `route_pattern`
   - `app_files` (all server/client boundaries)
   - `primary_components` (leaf imports)
   - `output_html` (planned path under `docs/html/alan-hirsch-course-migration/`)
   - `states` (comma-separated: default, loading, empty, error, locked, mobile, …)

### A.2 Map every **component** used by those routes

1. From the route manifest, trace imports into:
   - `src/components/course-*`
   - `src/components/learn-*` (or equivalent)
   - `src/components/sections/*` tied to courses
   - shared UI: `src/components/ui/*`, `primitives/*`, `nav/*`
2. For **each component file**, note:
   - Props / variants (boolean props → separate static examples if visuals differ).
   - **All user-visible strings** (including `aria-label`, `title`, `placeholder`, button text, validation messages).
   - **Images** (`next/image` src, static imports, remote patterns).
   - **Client-only** behavior (`"use client"`, hooks): list what must be reproduced in vanilla JS.

### A.3 Content and data surfaces

1. Identify where **copy** lives: TSX literals, `content/*.ts`, `lib/copy`, CMS, markdown importers, database-driven labels. **The HTML migration must inline the same final strings** the React app would render for the chosen fixture (use **production-like fixtures**: real week titles if present in repo fixtures; otherwise snapshot from a dev run the human approves).
2. Identify **section types** for the learn experience (example categories — expand to match code):
   - reading / prose blocks
   - video embed + transcript + chapters
   - reflection prompts, journaling fields
   - exercises / worksheets
   - discussion prompts / forum stubs
   - quizzes / knowledge checks
   - downloads / resources lists
   - navigation / TOC / “next lesson” footer
3. Identify **Forgotten Ways–specific** branding: badges, course hero art, mDNA / journey language, week numbering, any **canonical** quotes — copy **verbatim**.

### A.4 Deliverable at end of Phase A

A single Markdown file committed next to the migration work (suggested path):

`docs/html/alan-hirsch-course-migration/_shared/SOURCE_ROUTE_AND_COMPONENT_MANIFEST.md`

containing the **complete** route + component inventory. If anything is ambiguous, add a **Risk / unknown** subsection rather than guessing.

---

## 4. Phase B — Classify “course-related” vs general site chrome

Every row in the manifest must receive one **classification tag**:

| Tag | Meaning |
| --- | ------- |
| `FW-CORE` | The Forgotten Ways course: marketing + learn + assessments tied to that SKU. |
| `COURSE-GLOBAL` | Shared course shell used by FW and other courses (catalog row, generic lesson chrome). |
| `COURSE-AUX` | Account, billing, certificates, notifications — only if surfaced from course/learn flows. |
| `MARKETING-OVERLAP` | Public pages that link into FW (e.g. books hub) — include **only** the embedded blocks that appear on those pages when the human requests full-site parity; otherwise skip to stay scoped. |

**Rule:** If a page is reachable **without leaving the mental model** of “I am studying / enrolling in / continuing The Forgotten Ways,” it is in scope for `FW-CORE` or `COURSE-GLOBAL`/`COURSE-AUX` as appropriate.

---

## 5. Phase C — Design translation rules (Movemental skin, Alan fidelity)

### C.1 Tokens and typography

- Map colors to **semantic roles** from `DESIGN.md` / `site-theme.css`: `background`, `section`, `card`, `foreground`, `muted-foreground`, `border`, `primary`, `inverse-surface`, etc.
- **Inter** is the UI body face; **Instrument Serif italic** only where `DESIGN.md` allows emphasis in display lines — do not set long body in serif.
- Respect **hairline** sectioning and **tonal bands**; avoid heavy card borders unless `border-border` for form fields per charter.

### C.2 Motion and JS

- Any scroll reveal, sticky sidebar, TOC spy, hash navigation, or mobile drawer must respect **`prefers-reduced-motion`** (document the exact behavior).
- Prefer **small progressive enhancement**: works without JS where possible; with JS for convenience parity.

### C.3 Assets

- Copy **SVG/PNG/WebP** into `docs/html/alan-hirsch-course-migration/assets/` with stable names; record source path in `assets/README.md`.
- Inline **icons** as SVG with `currentColor` where the React app used icon components, preserving `aria-hidden` / titles as in source.

---

## 6. Phase D — Build order (repeat per view)

For **each** manifest row (each distinct visual state file):

### D.1 Preflight

1. Open **all** source files for that row (page, layout segments, components, styles modules, colocated CSS).
2. List **all UI regions** top-to-bottom, **including**:
   - global nav / course sub-nav / breadcrumbs
   - sidebars, rails, floating “continue” bars on mobile
   - footers, legal microcopy, version stamps
   - modals, toasts, banners (render as visible blocks or separate HTML variants)

### D.2 HTML skeleton

1. Use the correct **`<head>` contract`** from `STATIC_HTML_AND_TEMPLATES.md` for your chosen output tier (`docs/html/alan-hirsch-course-migration/...` should mirror **`course-previews`** or **root prototype** patterns — pick one shell family per subtree and document it in the subtree `README.md`).
2. Use semantic landmarks: `header`, `nav`, `main`, `aside`, `footer`, heading levels preserved from the React tree’s **intent** (do not skip levels without reason).
3. Preserve **landmark labels** and **live regions** if the source used `aria-live`.

### D.3 CSS

1. Put **token-level** styles only in linked shared CSS (`site-theme.css`); put **layout** for FW in `_shared/forgotten-ways-shell.css` (or extend `course-preview.css` if you are extending that subtree — **one strategy**, documented).
2. Page files may include a **tiny** `<style>` block for one-off grids only.

### D.4 JavaScript

1. Re-implement only what is required for **fidelity**: mobile nav drawer, TOC scroll spy, tab panels, collapsible syllabus, hash-based lesson switching (pattern already in `course-preview-app.js` — **prefer extending** that script with configuration objects rather than duplicating a second router).

### D.5 Copy audit (blocking)

1. **Diff-check mentality:** every string in source TSX for that view appears in the HTML (use a checklist in the manifest row).
2. If the source uses **i18n** or conditional copy, ship **one HTML variant per branch** the human cares about; default branch = `FW-CORE` learner enrolled.

### D.6 Accessibility audit (blocking)

- Keyboard path matches React behavior (focus trap in modals if any).
- Visible **`:focus-visible`** styles on all interactive elements.
- Color contrast matches token intent; if a rare badge fails WCAG, adjust **within** Movemental palette (document delta).

---

## 7. Phase E — Required view categories (ensure manifest covers all)

The inventory phase must explicitly confirm **yes/no** for each category below, then produce HTML for every **yes**.

### E.1 Public marketing / acquisition

- Course **landing** (hero, logistics, outcomes, syllabus preview, faculty/testimonial blocks, pricing CTAs).
- **Catalog** row / card for The Forgotten Ways (if separate from landing).
- **SEO** blocks: meta title/description are not visible but may appear in `<title>` / `<meta name="description">` for each template.
- **Legal / trust** snippets that appear on course pages (privacy link, refund note) — verbatim.

### E.2 Enrollment and commerce UI (static only)

- Checkout or plan picker **chrome** as rendered by course pages (no live Stripe).
- “Success / cancel” **receipt-style** layouts if routed under course URLs.

### E.3 Auth surfaces that are **in-flow** for learners

- Sign-in / sign-up / password reset **as reached from** course CTAs (only if distinct layouts from generic site).

### E.4 Learn shell

- Default **learn layout**: sidebar (weeks/modules/lessons), progress indicator, header bar (course title, user menu placeholder), **mobile** drawer equivalent.
- **Lesson page**: all section renderer types instantiated at least once across the suite of static files (if not all in one lesson, use **`/alan-hirsch-course-migration/forgotten-ways/fixtures/`** companion pages that showcase each section type with real copy).

### E.5 Lesson content primitives

For **each** `SectionType` (name taken from code — do not invent names), produce at least one HTML fixture that includes:

- headings, lists, callouts, blockquotes, tables, code blocks, images with captions
- primary CTA row (“Mark complete”, “Next”, “Save draft” if present)
- secondary actions (download, copy link, transcript toggle)

### E.6 Collaboration / social features

- Discussion threads / comments / “post reply” composer states (empty, populated, moderated).
- Cohort or schedule UI if present.

### E.7 Assessment / quiz / survey

- Question renderers (MCQ, multi-select, short answer, scale).
- **Feedback states:** correct/incorrect, answer reveal, try again limits.
- **Timer** UI if shown (static snapshot).

### E.8 Progress, completion, certificates

- Progress bars, checkmarks, locked units.
- Certificate or badge preview pages.

### E.9 Search, library, bookmarks

- Course-scoped search results, empty states, error states.

### E.10 System states (mandatory variants)

For any interactive view, ship separate HTML (or clearly separated sections) for:

- **Loading** (`loading.tsx` or suspense fallbacks)
- **Error** (`error.tsx`, form validation errors)
- **Empty** (no lessons, no posts, no notifications)
- **403 / paywall / “enroll to unlock”**
- **404** for unknown slug / lesson id
- **Offline / slow** only if the app has explicit UI; otherwise skip with manifest note “not applicable.”

---

## 8. Phase F — Verification gates (run before claiming “done”)

### F.1 Completeness gate

- [ ] Every **route** in `SOURCE_ROUTE_AND_COMPONENT_MANIFEST.md` maps to at least one HTML file (or an explicit exclusion signed by human in README).
- [ ] Every **section type** appears in at least one fixture page.
- [ ] Every **state** column value for high-traffic routes has a template.
- [ ] **No TODO/TBD** strings remain in HTML bodies for visible copy.

### F.2 Design compliance gate

- [ ] No duplicate `:root` in page `<style>`.
- [ ] Linked CSS matches **`STATIC_HTML_AND_TEMPLATES.md`** load order.
- [ ] Shell choice is consistent inside the subtree.

### F.3 Engineering hygiene gate

- [ ] All internal links between static files are **relative** and work when opened as `file://` **or** served from `pnpm reader:serve` / simple static server (document which you tested).
- [ ] `assets/README.md` lists every binary with **provenance**.

### F.4 Optional mechanical check

Run existing maintenance scripts only if you touched root-level `docs/html/*.html` prototypes (per repo tooling); otherwise skip.

---

## 9. Phase G — Handoff to React (future work)

After static HTML is accepted:

1. Use [`concept-modern-html-to-react-prompts.md`](./concept-modern-html-to-react-prompts.md) and [`stitch-to-react-migration.md`](./stitch-to-react-migration.md) to port **section by section**, preserving **six-layer** rules if the migration touches real data.
2. Treat `_shared/forgotten-ways-shell.css` rules as the spec for **Tailwind composition** or small CSS modules in `src/components/`.

---

## 10. Invocation block (paste below the fold to an agent)

> You are working in the **`movemental`** repo. Execute **`docs/build/prompts/forgotten-ways-and-course-views-alan-hirsch-to-docs-html-migration.md`** end-to-end.
>
> 1. Resolve and enter the sibling **`alan-hirsch`** repo path on this machine (read-only).  
> 2. Produce **`docs/html/alan-hirsch-course-migration/_shared/SOURCE_ROUTE_AND_COMPONENT_MANIFEST.md`** with a **complete** inventory of all **Forgotten Ways** and **course-related** routes, layouts, components, strings, and assets.  
> 3. Create the output tree under **`docs/html/alan-hirsch-course-migration/`** with **`README.md`** as the route → file index.  
> 4. For **every** manifest row and **every** required state in §7, implement **full HTML/CSS/JS** using **`docs/design/DESIGN.md`**, **`docs/design/STATIC_HTML_AND_TEMPLATES.md`**, **`docs/html/site-templates/site-theme.css`**, and (where appropriate) extend **`course-preview.css` / `course-preview-app.js`** instead of forking token ramps.  
> 5. Do **not** omit components, copy, images, `aria-*` text, or edge states. Do **not** edit the sibling repo unless the human explicitly allows it.  
> 6. Finish by running the §8 verification gates and listing any **human decisions** still blocking perfect fidelity.

---

## 11. Maintenance

When **`DESIGN.md`**, **`STATIC_HTML_AND_TEMPLATES.md`**, or **`site-theme.css`** changes, re-audit:

- token class names on migrated pages,
- serif emphasis rules,
- shell markup contracts,

and update `_shared/*.css` + README notes in the same PR as the design change (or file a follow-up task in `README.md`).
