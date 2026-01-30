# Content Hub Templates - Completion Prompt

## Objective

Complete and polish the content hub template set. 19 variants exist — tied for the largest category. Focus is on fidelity reconciliation, style cleanup, and manifest creation.

## Current State

**19 variants implemented:**
content-accordion-features, content-case-studies, content-category-blog, content-component-gallery, content-dark-browse, content-dark-personalized, content-dark-recordings, content-docs-grid, content-feature-preview, content-filtered-gallery, content-instructor-courses, content-integration-guides, content-lesson-list, content-product-carousel, content-resource-cards, content-resource-hub, content-template-showcase, content-toc-illustrated, content-training-resources, content-video-tutorials

**Switcher:** `components/layouts/movement-leader/content-template-switcher.tsx`
**Route:** `app/templates/movement-leader/content/page.tsx`

## Reference Images

Located in `_docs/reference-images-all/` with prefix `content-*` (~19 images).

## Required Work

### 1. Create manifest.json

Create `_docs/reference-archive/content-page/manifest.json` mapping all 19 variants to their reference images.

### 2. Fidelity Reconciliation Pass

Follow `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md` for each variant. With 19 variants this is the biggest reconciliation job — work through them systematically.

### 3. Style Cleanup

Per `_docs/_prompts/STYLE_CLEANUP_PROMPT.md`, migrate all inline `style={{}}` to Tailwind utilities. With 19 components, expect a high volume of inline style violations.

### 4. Export and Route Verification

All 19 variants exported from `index.ts`, switcher type union complete, route renders correctly.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full.

## File Locations

| Item | Path |
|------|------|
| Template components | `components/layouts/movement-leader/content-*.tsx` |
| Template switcher | `components/layouts/movement-leader/content-template-switcher.tsx` |
| Page route | `app/templates/movement-leader/content/page.tsx` |
| Reference images | `_docs/reference-images-all/content-*` |
| Reference archive | `_docs/reference-archive/content-page/` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Fidelity plan | `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md` |
| Style cleanup guide | `_docs/_prompts/STYLE_CLEANUP_PROMPT.md` |
