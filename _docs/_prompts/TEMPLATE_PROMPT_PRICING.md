# Pricing Page Templates - Build From Scratch Prompt

## Objective

Build the entire pricing page template set from scratch. No dedicated pricing templates exist yet (hero-pricing-card is a hero section, not a full pricing page). This is a **new page type** — 6 reference images are available.

## Current State

**0 variants implemented.** No switcher, no route, no manifest.

## Reference Images

Located in `_docs/reference-images-all/` with prefix `pricing-*` (~6 images). These are the starting point for all variants.

## Required Work

### 1. Full Build for Each Reference Image

For each of the ~6 reference images, follow the complete workflow in `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md`:

1. **Analyze** the reference image — extract layout structure, color palette, typography
2. **Define tokens** — create `[data-variant="pricing-*"]` override blocks in `globals.css`
3. **Build component** — `components/layouts/movement-leader/pricing-{variant-name}.tsx` using only `--mvmt-*` tokens and Tailwind classes
4. **Verify** against `00-iron-clad-rules.md` checklist

### 2. Create Template Switcher

Create `components/layouts/movement-leader/pricing-template-switcher.tsx` following the pattern in `assessments-template-switcher.tsx`:

- Define `PricingVariant` type union
- Create template metadata array with id, name, category
- Build dropdown UI with category filters

### 3. Create Page Route

Create `app/templates/pricing/page.tsx` following the pattern in `app/templates/assessments/page.tsx`:

- State for active template
- `className="template-movement-leader"` wrapper
- `data-variant={activeTemplate}` attribute
- Sticky switcher + dynamic component rendering

### 4. Create manifest.json

Create `_docs/reference-archive/pricing-page/manifest.json` mapping all variants to reference images.

### 5. Register in Index

Export all pricing components and the `PricingVariant` type from `components/layouts/movement-leader/index.ts`.

### 6. Fidelity Verification

After building, run the fidelity reconciliation pass per `02-template-reference-fidelity-plan.md` to confirm each component matches its reference.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full. This is especially critical for a new page type — get the token foundation right from the start.

## File Locations

| Item | Path |
|------|------|
| Template components (create) | `components/layouts/movement-leader/pricing-*.tsx` |
| Template switcher (create) | `components/layouts/movement-leader/pricing-template-switcher.tsx` |
| Page route (create) | `app/templates/pricing/page.tsx` |
| Reference images | `_docs/reference-images-all/pricing-*` |
| Reference archive (create) | `_docs/reference-archive/pricing-page/manifest.json` |
| Central registry (update) | `components/layouts/movement-leader/index.ts` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides (update) | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Full build workflow | `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` |
| Fidelity plan | `_docs/reference-images-all/template-process-prompts/02-template-reference-fidelity-plan.md` |
| Existing switcher example | `components/layouts/movement-leader/assessments-template-switcher.tsx` |
| Existing route example | `app/templates/assessments/page.tsx` |
