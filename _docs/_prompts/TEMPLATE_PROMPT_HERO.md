# Hero / Landing Page Templates - Completion Prompt

## Objective

Complete and polish the hero/landing page template set. 19 variants exist. This category is the most mature — focus is on fidelity reconciliation, style cleanup, and manifest creation.

## Current State

**19 variants implemented:**
hero-agency-gradient, hero-centered-product, hero-centered-serif, hero-chat-widget, hero-circular-feature, hero-clean-minimal, hero-clean-minimal-alt, hero-colorful-headline, hero-dark-features, hero-floating-card, hero-full-bleed, hero-gradient-illustration, hero-how-it-works, hero-image-grid, hero-pricing-card, hero-product-showcase, hero-product-showcase-alt, hero-split-tabs, hero-template-preview

**Switcher:** `components/layouts/movement-leader/template-switcher.tsx`
**Route:** `app/templates/movement-leader/page.tsx` (root movement-leader page)

## Reference Images

Located in `_docs/reference-images-all/` with prefix `home-hero-*` and `landing-*`:
- ~19 images prefixed `home-hero-*`
- ~6 images prefixed `landing-*`

## Required Work

### 1. Create manifest.json

Create `_docs/reference-archive/landing-page/manifest.json` following the assessments pattern:

```json
{
  "templateCategory": "landing-page",
  "variants": [
    { "id": "hero-agency-gradient", "file": "hero-agency-gradient.tsx", "reference": "<matching-image>.png", "source": "<source-app>" }
  ]
}
```

Match each of the 19 variants to its reference image file in `_docs/reference-images-all/`.

### 2. Fidelity Reconciliation Pass

For each variant, follow `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md`:

1. Open the reference image and the component side by side
2. Write a reconciliation note documenting gaps (spacing, colors, typography, layout)
3. Fix gaps using only `--mvmt-*` tokens and Tailwind classes — **no inline styles**
4. Verify each variant against the checklist in `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md`

### 3. Style Cleanup

Per `_docs/_prompts/STYLE_CLEANUP_PROMPT.md`, migrate any remaining inline `style={{}}` declarations to Tailwind utilities using `--mvmt-*` tokens from `tailwind.config.ts`. Priority order:

1. Replace `style={{ color: 'var(--mvmt-*)' }}` with `text-mvmt-*` classes
2. Replace `style={{ backgroundColor: 'var(--mvmt-*)' }}` with `bg-mvmt-*` classes
3. Remove all hard-coded hex colors
4. Remove arbitrary pixel values

### 4. Export Verification

Confirm all 19 variants are exported from `components/layouts/movement-leader/index.ts` and that the switcher type union includes every variant ID.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full. Key points:

- Components MUST use `--mvmt-*` tokens, never raw colors or Shadcn tokens
- Every variant gets its own `[data-variant="..."]` override block in `globals.css`
- Page wrapper must include `className="template-movement-leader"` and `data-variant={activeTemplate}`
- Run the verification checklist for every component before marking complete

## File Locations

| Item | Path |
|------|------|
| Template components | `components/layouts/movement-leader/hero-*.tsx` |
| Template switcher | `components/layouts/movement-leader/template-switcher.tsx` |
| Page route | `app/templates/movement-leader/page.tsx` |
| Reference images | `_docs/reference-images-all/home-hero-*`, `_docs/reference-images-all/landing-*` |
| Reference archive | `_docs/reference-archive/landing-page/` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Fidelity plan | `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md` |
| Style cleanup guide | `_docs/_prompts/STYLE_CLEANUP_PROMPT.md` |
