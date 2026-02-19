# Template System Hardening Plan

**Purpose:** Bring the two template systems (Movement Leader + static library) toward a single contract, improve maintainability, and prepare for multi-tenant leader sites without changing DB, Zod, services, API routes, or hook signatures.

**Scope:** UI/styling only (Layer 6). No refactors of components; no migration of library templates into React in this pass.

---

## Phase 0 — Current State Summary (Verified, Read-Only)

### Where each system lives

| System | Location | Activation |
|--------|----------|------------|
| **A) Movement Leader** | `app/globals.css` (template block **moved** to `app/styles/templates/movement-leader.css`), `app/templates/*`, `components/layouts/movement-leader` | Wrapper: `className="template-movement-leader"` + `data-template="movement-leader"` + `data-variant={variant}`. CSS imported only in `app/templates/layout.tsx`. |
| **B) Static library** | `public/templates/library/{id}/` (e.g. pastoral-warm, institutional), each with `css/main.css` | URL: `/templates/library/{id}/` serves that folder’s `index.html` + `css/main.css`. No React; document isolation. |

### What renders where

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  Next.js app (root layout: app/layout.tsx → globals.css)                     │
├─────────────────────────────────────────────────────────────────────────────┤
│  /templates/*  (app/templates/layout.tsx)                                    │
│    → imports app/styles/templates/movement-leader.css                        │
│    → VariantProvider wraps with <div class="template-movement-leader"         │
│         data-template="movement-leader" data-variant="...">                   │
│    → Movement Leader tokens (--mvmt-*) and variant overrides apply here     │
├─────────────────────────────────────────────────────────────────────────────┤
│  All other routes (dashboard, (public), etc.)                                 │
│    → globals.css only (shadcn + base + compare-substack).                    │
│    → No movement-leader.css; no --mvmt-* definitions                          │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│  Static HTML (no React)                                                      │
│  /templates/library/{id}/  → public/templates/library/{id}/index.html        │
│    → <link href="css/main.css">  (that folder’s main.css)                    │
│    → Tokens and styles are in :root / body / .public-header etc.            │
│    → No shared CSS with the Next.js app                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Which CSS loads where

| Route / context | CSS that loads |
|-----------------|----------------|
| Any Next.js page | `app/globals.css` (Tailwind, @theme, base, compare-substack). |
| `/templates/*` only | Above **plus** `app/styles/templates/movement-leader.css` (via layout import). |
| `/templates/library/{id}/` | Only that folder’s `main.css` + fonts; no app CSS. |

### Which tokens apply where

| Context | Tokens |
|---------|--------|
| App default | `:root` / `.dark` in globals.css (shadcn: --background, --foreground, --primary, etc.). |
| Movement Leader (`/templates/*`) | `--mvmt-*` defined in `.template-movement-leader` in movement-leader.css; Tailwind @theme in globals still references them for utilities. |
| Static library page | That template’s `:root` (e.g. --bg, --text, --accent in pastoral-warm/main.css). |

### Public leader pages

- **No** public leader pages currently use either template system for production. There is no `/leaders/{slug}` or equivalent that applies a template. Movement Leader is used only for the internal showcase under `/templates/*`; the library is preview-only under `/templates/library/{id}/`.

---

## Phase 1 — Template Contract v1

Defined in **`_docs/templates/TEMPLATE_CONTRACT.md`**. Summary:

1. **Activation:** One attribute `data-template="<id>"` (e.g. `pastoral-warm`, `movement-leader`). Optional `data-variant="..."` for sub-variants.
2. **Token interface:** Minimal semantic set: `--tpl-bg`, `--tpl-surface`, `--tpl-text`, `--tpl-muted`, `--tpl-border`, `--tpl-accent`, `--tpl-radius`, `--tpl-shadow`, `--tpl-font-heading`, `--tpl-font-body`. Mapping from existing `--mvmt-*` and library `:root` tokens is described in the contract.
3. **Scoping:** All template CSS scoped under `[data-template="X"]` or a single wrapper subtree; no global body/html resets outside that subtree.

---

## Phase 2 — Movement Leader Hardening (Done, UI-Only)

- **A)** Movement Leader template CSS moved from `app/globals.css` to **`app/styles/templates/movement-leader.css`**. Imported **only** in **`app/templates/layout.tsx`**. Scoping under `.template-movement-leader` unchanged.
- **B)** Template rules wrapped in **`@layer components { ... }`** in that file.
- **C)** Wrapper in **`app/templates/template-variant-context.tsx`** now includes **`data-template="movement-leader"`** in addition to the existing class and `data-variant`.

No non-UI layers were touched.

---

## Phase 3 — Static Library “Importable” (Prep Only)

- **A)** Exemplar scoped file added: **`app/styles/templates/library/pastoral-warm.scoped.css`**. All selectors scoped under **`[data-template="pastoral-warm"]`**. Token names use **`--tpl-*`** in the exemplar to align with the contract. Body/html assumptions replaced by wrapper-level styles.
- **B)** Process for other templates: repeat the same pattern — copy the template’s `main.css`, prefix every selector with `[data-template="<id"]`, move `:root` tokens onto the wrapper, rename to `--tpl-*` (or keep existing names and add a short mapping comment). Optional: a small script to prefix selectors (e.g. `scope-new-css.js`) can be added later; not implemented here.

This file is **not** imported on any live route; it is proof-of-concept and prep for future use.

---

## Phase 4 — Multi-Tenant Template Activation (Plan Only)

### Option 1 — UI-only / short-term

- **Idea:** Route-group or path-based: e.g. `/leaders/{slug}` uses a fixed template for now. Template id chosen by a **hard-coded map** in the UI layer (e.g. in layout or a config constant).
- **Pros:** No DB or API changes; deploy quickly; good for demos.
- **Cons:** Not real multi-tenant; every leader gets the same or a map-based template; changing template per leader requires code change.
- **Files that would change:** e.g. a new `app/(leaders)/leaders/[slug]/layout.tsx` (or similar) that reads slug, looks up template from a const map, and renders a wrapper with `data-template={templateId}`; optionally imports the right scoped CSS for that template. No services/hooks/API.
- **Risk:** Low. Easy to replace later with Option 2.
- **Best for:** “Deploy fastest” and demos.

### Option 2 — Tenant config (requires approval)

- **Idea:** Tenant/org has a stored template id (DB or config service). Layout (or middleware) resolves tenant → template id and sets `data-template` (and loads the corresponding CSS).
- **Pros:** True per-tenant template; config-driven; no code change to add a new template for a leader.
- **Cons:** Touches Layers 3–5: likely a new field or config read, service method, and possibly a hook or route that the layout uses.
- **Files that would change:** DB schema (if stored in DB), Zod, service(s), possibly API and hooks, plus the layout that applies the template. Requires explicit approval.
- **Risk:** Higher; must follow the type-safety chain and tenant boundaries.
- **Best for:** Long-term multi-tenant product.

**STOP:** Option 2 is **not** implemented. It requires explicit approval and a minimal proposal for the lower-layer changes.

---

## Phase 5 — Minimum Viable Unification (Implemented)

Implemented UI-safe steps only:

1. **Movement Leader CSS** moved out of `globals.css` and imported only in **`app/templates/layout.tsx`**.
2. **Template Contract v1** and short README added: **`_docs/templates/TEMPLATE_CONTRACT.md`**, **`_docs/templates/README.md`**.
3. **Exemplar scoped CSS** for pastoral-warm added at **`app/styles/templates/library/pastoral-warm.scoped.css`**. Not applied to any live route.

Commands run after changes: **`pnpm typecheck`** ✅ passed; **`pnpm build`** ✅ passed. `pnpm run lint` failed with a pre-existing Next lint config error (invalid project directory); not caused by these changes.

---

## Exact File Changes Made

| File | Change |
|------|--------|
| **app/globals.css** | Removed the entire Movement Leader block (lines 253–4479). Added a short comment pointing to `app/styles/templates/movement-leader.css` and `app/templates/layout.tsx`. |
| **app/styles/templates/movement-leader.css** | **New.** Contains the full Movement Leader template CSS wrapped in `@layer components { ... }`. |
| **app/templates/layout.tsx** | Added: `import "@/app/styles/templates/movement-leader.css";`. |
| **app/templates/template-variant-context.tsx** | Added `data-template="movement-leader"` to the wrapper div. |
| **app/styles/templates/library/pastoral-warm.scoped.css** | **New.** Exemplar scoped styles under `[data-template="pastoral-warm"]` with `--tpl-*` tokens; not imported anywhere. |
| **_docs/templates/TEMPLATE_CONTRACT.md** | **New.** Contract v1: activation, tokens, scoping. |
| **_docs/templates/README.md** | **New.** Short pointer to contract and template locations. |
| **_docs/system-status/TEMPLATE_HARDENING_PLAN.md** | **New.** This file. |

---

## What Remains Blocked (Pending Approval)

- **Tenant-driven template selection (Option 2):** Any change that reads template id from DB or config and passes it through services/hooks/API into the layout. Must be proposed separately and approved before implementation.
- **Applying library scoped CSS to a live route:** The pastoral-warm scoped file is not imported on any route. When we add a leader or preview route that uses `data-template="pastoral-warm"`, we will import this file (or a full scoped version) in the corresponding layout.
- **Migrating other library templates to scoped CSS:** Documented in Phase 3; repeat the same pattern per template; optional script not added.

---

## Diff Summary

- **globals.css:** ~4,227 lines removed (Movement Leader block); 3 lines added (comment). Net: much smaller global bundle; template CSS only loads on `/templates/*`.
- **New files:** `movement-leader.css` (~4,229 lines with layer wrapper), `pastoral-warm.scoped.css` (~140 lines), `TEMPLATE_CONTRACT.md`, `README.md`, `TEMPLATE_HARDENING_PLAN.md`.
- **Layout + context:** One import, one attribute on the wrapper. No behavior change beyond scoping and contract alignment.

---

*Template system hardening — UI-only, Layer 6. No database, services, or hook signature changes.*
