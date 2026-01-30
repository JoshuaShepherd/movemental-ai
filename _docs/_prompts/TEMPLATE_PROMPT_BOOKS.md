# Books / Product Templates - Completion Prompt

## Objective

Complete and polish the books/product template set. 9 variants exist. Focus is on fidelity reconciliation, style cleanup, manifest creation, and building any missing variants from reference images.

## Current State

**9 variants implemented:**
books-detail-cart, books-detail-clean, books-detail-modal, books-detail-split, books-filtered-grid, books-minimal-grid, books-product-showcase, books-related-products, books-spec-cards

**Switcher:** `components/layouts/movement-leader/books-template-switcher.tsx`
**Route:** `app/templates/movement-leader/books/page.tsx`

## Reference Images

Located in `_docs/reference-images-all/` with prefix `books-*` (~10 images). If any images lack matching components, build the missing variants.

## Required Work

### 1. Create manifest.json

Create `_docs/reference-archive/books-page/manifest.json`:

```json
{
  "templateCategory": "books-page",
  "variants": [
    { "id": "books-detail-cart", "file": "books-detail-cart.tsx", "reference": "<matching-image>.png", "source": "<source-app>" }
  ]
}
```

### 2. Build Missing Variants

Compare the ~10 reference images to the 9 existing components. For unmatched references, follow the full workflow in `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md`.

### 3. Fidelity Reconciliation Pass

For each variant, follow `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md`. Compare reference to implementation, document gaps, fix with tokens only.

### 4. Style Cleanup

Per `_docs/_prompts/STYLE_CLEANUP_PROMPT.md`, migrate all inline `style={{}}` to Tailwind utilities.

### 5. Export and Route Verification

All variants exported from `index.ts`, switcher type union complete, route renders correctly.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full.

## File Locations

| Item | Path |
|------|------|
| Template components | `components/layouts/movement-leader/books-*.tsx` |
| Template switcher | `components/layouts/movement-leader/books-template-switcher.tsx` |
| Page route | `app/templates/movement-leader/books/page.tsx` |
| Reference images | `_docs/reference-images-all/books-*` |
| Reference archive | `_docs/reference-archive/books-page/` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Full build workflow | `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` |
| Fidelity plan | `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md` |
| Style cleanup guide | `_docs/_prompts/STYLE_CLEANUP_PROMPT.md` |
