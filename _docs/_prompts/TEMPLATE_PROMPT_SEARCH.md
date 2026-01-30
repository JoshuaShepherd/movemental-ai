# Search Templates - Completion Prompt

## Objective

Expand and polish the search template set. Only 3 variants exist — needs expansion.

## Current State

**3 variants implemented:**
search-ai-assistant, search-minimal-centered, search-resource-hub

**Switcher:** `components/layouts/movement-leader/search-template-switcher.tsx`
**Route:** `app/templates/movement-leader/search/page.tsx`

## Reference Images

Located in `_docs/reference-images-all/` with prefix `search-*` (~3 images).

## Required Work

### 1. Source Additional References

To reach 8-10 variants, source new reference designs from:

- Algolia (faceted search with filters)
- Spotify (discovery-oriented search)
- YouTube (video search with filters and suggestions)
- Notion (command palette search)
- Google (clean results with categories)
- Perplexity (AI-powered search with sources)

Save to `_docs/reference-images-all/search-{descriptor}-{index}.png`.

### 2. Build New Variants

**Suggested new variant concepts:**
- search-faceted-filters (sidebar filters with result grid)
- search-command-palette (modal/overlay quick search)
- search-discovery-grid (browse-oriented with categories)
- search-results-list (traditional search results page)
- search-dark-spotlight (dark theme spotlight search)
- search-ai-conversational (conversational search with follow-ups)

Follow `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` for each.

### 3. Create manifest.json

Create `_docs/reference-archive/search-page/manifest.json` mapping all variants to reference images.

### 4. Fidelity Reconciliation and Style Cleanup

Follow the fidelity plan and style cleanup guide for all variants.

### 5. Export and Route Verification

All variants exported from `index.ts`, switcher updated, route working.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full.

## File Locations

| Item | Path |
|------|------|
| Template components | `components/layouts/movement-leader/search-*.tsx` |
| Template switcher | `components/layouts/movement-leader/search-template-switcher.tsx` |
| Page route | `app/templates/movement-leader/search/page.tsx` |
| Reference images | `_docs/reference-images-all/search-*` |
| Reference archive | `_docs/reference-archive/search-page/` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Full build workflow | `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` |
| Fidelity plan | `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md` |
| Style cleanup guide | `_docs/_prompts/STYLE_CLEANUP_PROMPT.md` |
