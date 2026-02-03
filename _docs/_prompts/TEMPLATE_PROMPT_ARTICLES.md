# Articles / Blog Templates - Completion Prompt

## Objective

Complete and polish the articles/blog template set. 12 variants exist. Focus is on fidelity reconciliation, style cleanup, and manifest creation.

## Current State

**12 variants implemented:**
articles-blockquote-editorial, articles-bold-editorial, articles-bold-header, articles-case-study, articles-clean-longform, articles-colorful-sidebar, articles-dark-case-study, articles-docs-sidebar, articles-faq-accordion, articles-guide-hero, articles-help-center, articles-stats-highlight

**Switcher:** `components/layouts/movement-leader/articles-template-switcher.tsx`
**Route:** `app/templates/articles/page.tsx`

## Reference Images

Located in `_docs/reference-images-all/` with prefix `articles-*`:
- ~22 reference images available

Some images may not have corresponding components yet. If reference images exist without matching templates, create the missing components.

## Required Work

### 1. Create manifest.json

Create `_docs/reference-archive/articles/manifest.json`:

```json
{
  "templateCategory": "articles",
  "variants": [
    { "id": "articles-blockquote-editorial", "file": "articles-blockquote-editorial.tsx", "reference": "<matching-image>.png", "source": "<source-app>" }
  ]
}
```

Match all 12 variants to reference images. If there are ~22 images but only 12 components, identify the 10 unbuilt references and create components for them.

### 2. Build Missing Variants

For any reference images without matching components:

1. Follow the full workflow in `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md`
2. Extract color palette and typography from the reference image
3. Define `[data-variant="..."]` token overrides in `globals.css`
4. Build the component using only `--mvmt-*` tokens and Tailwind classes
5. Add to the switcher type union and template record
6. Export from `index.ts`

### 3. Fidelity Reconciliation Pass

For each variant, follow `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md`:

1. Compare reference image to implementation
2. Document gaps in a reconciliation note
3. Fix using tokens and Tailwind only
4. Verify against `00-iron-clad-rules.md` checklist

### 4. Style Cleanup

Per `_docs/_prompts/STYLE_CLEANUP_PROMPT.md`, migrate all inline `style={{}}` to Tailwind utilities. Replace `var(--mvmt-*)` inline usage with `text-mvmt-*`, `bg-mvmt-*`, `border-mvmt-*` classes.

### 5. Export and Route Verification

- All variants exported from `components/layouts/movement-leader/index.ts`
- Switcher type union includes every variant ID
- Route at `app/templates/articles/page.tsx` renders all variants correctly

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full.

## File Locations

| Item | Path |
|------|------|
| Template components | `components/layouts/movement-leader/articles-*.tsx` |
| Template switcher | `components/layouts/movement-leader/articles-template-switcher.tsx` |
| Page route | `app/templates/articles/page.tsx` |
| Reference images | `_docs/reference-images-all/articles-*` |
| Reference archive | `_docs/reference-archive/articles/` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Full build workflow | `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` |
| Fidelity plan | `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md` |
| Style cleanup guide | `_docs/_prompts/STYLE_CLEANUP_PROMPT.md` |
