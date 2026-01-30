# About Page Templates - Build From Scratch Prompt

## Objective

Build the about page template set. Currently only `about-video-bio.tsx` exists in the misc category. This needs to become a standalone page type with multiple variants.

## Current State

**1 variant exists** in misc: `about-video-bio.tsx`
**No dedicated switcher, route, or manifest.**

## Reference Images

Check `_docs/reference-images-all/` for any `about-*` prefixed images. The reference archive directory `_docs/reference-archive/about-page/` exists but has no manifest.

## Required Work

### 1. Migrate Existing Component

Move `about-video-bio` from misc into the about page type:
- Keep the component file but update its variant ID prefix to `about-*`
- Remove from `misc-template-switcher.tsx`
- Add to the new about switcher

### 2. Source References

Source 7-9 reference designs from:

- Stripe (team grid with values)
- Linear (timeline-based company story)
- Notion (mission-driven about with team)
- Vercel (minimal about with stats)
- Webflow (creative agency about)
- Basecamp (opinionated company manifesto)

Save to `_docs/reference-images-all/about-{descriptor}-{index}.png`.

### 3. Build New Variants

Follow `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` for each.

**Suggested variant concepts:**
- about-team-grid (team member cards with bios)
- about-timeline-story (company history timeline)
- about-mission-values (mission statement with value cards)
- about-stats-hero (hero with key metrics)
- about-manifesto-dark (dark theme with bold manifesto text)
- about-split-media (alternating text/image sections)
- about-founder-letter (personal letter-style about page)

### 4. Create Template Switcher

Create `components/layouts/movement-leader/about-template-switcher.tsx`.

### 5. Create Page Route

Create `app/templates/movement-leader/about/page.tsx`.

### 6. Create manifest.json

Create `_docs/reference-archive/about-page/manifest.json`.

### 7. Register in Index

Export all about components and the `AboutVariant` type from `index.ts`.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full.

## File Locations

| Item | Path |
|------|------|
| Existing component | `components/layouts/movement-leader/about-video-bio.tsx` |
| Template components (create) | `components/layouts/movement-leader/about-*.tsx` |
| Template switcher (create) | `components/layouts/movement-leader/about-template-switcher.tsx` |
| Page route (create) | `app/templates/movement-leader/about/page.tsx` |
| Reference images | `_docs/reference-images-all/about-*` |
| Reference archive (create) | `_docs/reference-archive/about-page/manifest.json` |
| Central registry (update) | `components/layouts/movement-leader/index.ts` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides (update) | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Full build workflow | `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` |
