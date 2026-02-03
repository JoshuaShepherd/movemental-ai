# Reader / E-book Templates - Completion Prompt

## Objective

Expand and polish the reader/e-book template set. Only 2 variants exist — needs significant expansion.

## Current State

**2 variants implemented:**
reader-docs-sidebar, reader-ebook-dark

**Switcher:** `components/layouts/movement-leader/reader-template-switcher.tsx`
**Route:** `app/templates/reader/page.tsx`

## Reference Images

Located in `_docs/reference-images-all/` with prefix `reader-*` (~4 images). 2 references may not have matching components yet.

## Required Work

### 1. Build Variants for Existing References

Check for unmatched reference images among the ~4 available. Build components for any that lack implementations, following `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md`.

### 2. Source Additional References

To reach 8-10 variants, source new reference designs from:

- Kindle (classic e-reader with font/theme controls)
- Medium (clean reading experience with highlights)
- Substack (newsletter-style reader)
- Notion (docs reader with TOC)
- GitBook (developer docs reader)
- Apple Books (paginated reader)

Save to `_docs/reference-images-all/reader-{descriptor}-{index}.png`.

### 3. Build New Variants

**Suggested new variant concepts:**
- reader-minimal-scroll (distraction-free scrolling reader)
- reader-paginated-book (page-turn e-book experience)
- reader-highlight-notes (reader with sidebar annotations)
- reader-chapter-nav (chapter-based navigation with progress)
- reader-split-reference (side-by-side text and references)
- reader-immersive-dark (full-screen dark reading mode)

Follow the full build workflow for each.

### 4. Create manifest.json

Create `_docs/reference-archive/reader-page/manifest.json` mapping all variants to reference images.

### 5. Fidelity Reconciliation and Style Cleanup

Follow the fidelity plan and style cleanup guide for all variants.

### 6. Export and Route Verification

All variants exported from `index.ts`, switcher updated, route working.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full.

## File Locations

| Item | Path |
|------|------|
| Template components | `components/layouts/movement-leader/reader-*.tsx` |
| Template switcher | `components/layouts/movement-leader/reader-template-switcher.tsx` |
| Page route | `app/templates/reader/page.tsx` |
| Reference images | `_docs/reference-images-all/reader-*` |
| Reference archive | `_docs/reference-archive/reader-page/` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Full build workflow | `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` |
| Fidelity plan | `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md` |
| Style cleanup guide | `_docs/_prompts/STYLE_CLEANUP_PROMPT.md` |
