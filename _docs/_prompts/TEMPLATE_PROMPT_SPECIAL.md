# Special Page Templates - Build From Scratch Prompt

## Objective

Build the special page template set from scratch. These are utility/one-off pages (404, maintenance, coming soon, etc.). No templates exist yet. ~7 reference images are available.

## Current State

**0 variants implemented.** No switcher, no route, no manifest.

## Reference Images

Located in `_docs/reference-images-all/` with prefix `special-page-*` (~7 images).

## Required Work

### 1. Full Build for Each Reference Image

For each of the ~7 reference images, follow `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md`:

1. Analyze the reference
2. Define `[data-variant="special-*"]` token overrides in `globals.css`
3. Build component in `components/layouts/movement-leader/special-{variant-name}.tsx`
4. Verify against `00-iron-clad-rules.md`

Special pages may include:
- 404 / not found pages
- Maintenance / downtime pages
- Coming soon / launch pages
- Thank you / confirmation pages
- Error state pages
- Under construction pages
- Redirect/loading pages

### 2. Source Additional References if Needed

If the 7 existing images don't cover all needed utility page types, source more from established products.

### 3. Create Template Switcher

Create `components/layouts/movement-leader/special-template-switcher.tsx`.

### 4. Create Page Route

Create `app/templates/special/page.tsx`.

### 5. Create manifest.json

Create `_docs/reference-archive/special-page/manifest.json`.

### 6. Register in Index

Export all components and the `SpecialVariant` type from `index.ts`.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full.

## File Locations

| Item | Path |
|------|------|
| Template components (create) | `components/layouts/movement-leader/special-*.tsx` |
| Template switcher (create) | `components/layouts/movement-leader/special-template-switcher.tsx` |
| Page route (create) | `app/templates/special/page.tsx` |
| Reference images | `_docs/reference-images-all/special-page-*` |
| Reference archive (create) | `_docs/reference-archive/special-page/manifest.json` |
| Central registry (update) | `components/layouts/movement-leader/index.ts` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides (update) | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Full build workflow | `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` |
