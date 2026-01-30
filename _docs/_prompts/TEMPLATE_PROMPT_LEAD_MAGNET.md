# Lead Magnet Page Templates - Build From Scratch Prompt

## Objective

Build the entire lead magnet page template set from scratch. No templates exist yet. ~5 reference images are available.

## Current State

**0 variants implemented.** No switcher, no route, no manifest.

## Reference Images

Located in `_docs/reference-images-all/` with prefix `lead-magnet-*` (~5 images).

## Required Work

### 1. Build Variants from Existing References

For each of the ~5 reference images, follow `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md`:

1. Analyze the reference — layout, color palette, typography, form elements
2. Define `[data-variant="lead-magnet-*"]` token overrides in `globals.css`
3. Build component in `components/layouts/movement-leader/lead-magnet-{variant-name}.tsx`
4. Verify against `00-iron-clad-rules.md`

Lead magnet pages typically include:
- Compelling headline and value proposition
- Preview of the downloadable resource
- Email capture form
- Social proof elements
- Urgency/scarcity indicators

### 2. Source Additional References

To reach 8-10 variants, source more from:

- ConvertKit (creator-focused opt-in pages)
- Leadpages (high-conversion landing pages)
- HubSpot (gated content pages)
- Kajabi (digital product opt-ins)

Save to `_docs/reference-images-all/lead-magnet-{descriptor}-{index}.png`.

### 3. Build Additional Variants

**Suggested concepts:**
- lead-magnet-ebook-preview (book cover with chapter preview)
- lead-magnet-checklist (visual checklist with opt-in)
- lead-magnet-webinar (event registration with speaker info)
- lead-magnet-toolkit (resource bundle with itemized contents)
- lead-magnet-dark-minimal (dark theme with focused CTA)

### 4. Create Template Switcher

Create `components/layouts/movement-leader/lead-magnet-template-switcher.tsx`.

### 5. Create Page Route

Create `app/templates/movement-leader/lead-magnet/page.tsx`.

### 6. Create manifest.json

Create `_docs/reference-archive/lead-magnet-page/manifest.json`.

### 7. Register in Index

Export all components and the `LeadMagnetVariant` type from `index.ts`.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full.

## File Locations

| Item | Path |
|------|------|
| Template components (create) | `components/layouts/movement-leader/lead-magnet-*.tsx` |
| Template switcher (create) | `components/layouts/movement-leader/lead-magnet-template-switcher.tsx` |
| Page route (create) | `app/templates/movement-leader/lead-magnet/page.tsx` |
| Reference images | `_docs/reference-images-all/lead-magnet-*` |
| Reference archive (create) | `_docs/reference-archive/lead-magnet-page/manifest.json` |
| Central registry (update) | `components/layouts/movement-leader/index.ts` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides (update) | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Full build workflow | `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` |
| Existing switcher example | `components/layouts/movement-leader/assessments-template-switcher.tsx` |
| Existing route example | `app/templates/movement-leader/assessments/page.tsx` |
