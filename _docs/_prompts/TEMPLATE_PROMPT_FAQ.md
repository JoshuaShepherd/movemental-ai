# FAQ Templates - Completion Prompt

## Objective

Expand and polish the FAQ template set. Only 2 variants exist — this is one of the thinnest categories and needs significant expansion to reach parity with other page types.

## Current State

**2 variants implemented:**
faq-dark-hero, faq-minimal-accordion

**Switcher:** `components/layouts/movement-leader/faq-template-switcher.tsx`
**Route:** `app/templates/faq/page.tsx`

## Reference Images

Located in `_docs/reference-images-all/` with prefix `faq-*` (~2 images). This category needs additional reference sourcing.

## Required Work

### 1. Source Additional References

Only 2 reference images exist. To reach 8-10 variants (parity target), source 6-8 new reference designs from platforms like:

- Stripe (clean accordion FAQ)
- Notion (docs-style FAQ with search)
- Intercom (support center FAQ with categories)
- Linear (minimal FAQ with sidebar navigation)
- Zendesk (help center with topic grouping)
- Apple (tabbed FAQ sections)

Save new references to `_docs/reference-images-all/` using the naming pattern `faq-{descriptor}-{index}.png`.

### 2. Build New Variants

For each new reference, follow the full workflow in `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md`:

1. Analyze the reference image
2. Extract color palette and typography
3. Define `[data-variant="faq-*"]` token overrides in `globals.css`
4. Build the component using only `--mvmt-*` tokens and Tailwind
5. Add to the switcher type union and template record
6. Export from `index.ts`

**Suggested new variant concepts:**
- faq-categorized-grid (grouped questions in card grid)
- faq-search-hero (prominent search with popular questions)
- faq-sidebar-nav (left navigation, right content)
- faq-tabbed-sections (topic tabs with accordion content)
- faq-support-center (help desk style with contact options)
- faq-gradient-cards (visual card-based FAQ)

### 3. Create manifest.json

Create `_docs/reference-archive/faq-page/manifest.json` mapping all variants (existing + new) to reference images.

### 4. Fidelity Reconciliation Pass

Follow `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md` for all variants including the 2 existing ones.

### 5. Style Cleanup

Per `_docs/_prompts/STYLE_CLEANUP_PROMPT.md`, migrate all inline styles to Tailwind utilities.

### 6. Export and Route Verification

All variants exported from `index.ts`, switcher type union updated, route renders correctly.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full.

## File Locations

| Item | Path |
|------|------|
| Template components | `components/layouts/movement-leader/faq-*.tsx` |
| Template switcher | `components/layouts/movement-leader/faq-template-switcher.tsx` |
| Page route | `app/templates/faq/page.tsx` |
| Reference images | `_docs/reference-images-all/faq-*` |
| Reference archive | `_docs/reference-archive/faq-page/` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Full build workflow | `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` |
| Fidelity plan | `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md` |
| Style cleanup guide | `_docs/_prompts/STYLE_CLEANUP_PROMPT.md` |
