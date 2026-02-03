# Misc Templates (CTA, Orgs) - Completion Prompt

## Objective

Complete and polish the remaining misc templates. After migrating `about-video-bio` to the about page type (see TEMPLATE_PROMPT_ABOUT.md), this category retains CTA and Orgs components. Expand each into its own small set or keep as a shared misc category.

## Current State

**2 remaining variants after about migration:**
cta-bold-banner, orgs-enterprise-trust

**Switcher:** `components/layouts/movement-leader/misc-template-switcher.tsx`
**Route:** `app/templates/misc/page.tsx`

## Reference Images

- `_docs/reference-images-all/cta-*` (~1 image)
- `_docs/reference-images-all/orgs-*` (~1 image)

## Required Work

### 1. Expand CTA Variants

Source 3-4 CTA reference designs and build:
- cta-gradient-split (gradient background with split layout)
- cta-minimal-centered (centered text with single button)
- cta-dark-full-width (dark full-bleed CTA section)
- cta-social-proof (CTA with testimonial snippet)

### 2. Expand Orgs Variants

Source 3-4 organization/enterprise reference designs and build:
- orgs-logo-grid (partner/client logo grid)
- orgs-case-study-cards (enterprise case study highlights)
- orgs-feature-comparison (enterprise vs standard feature table)
- orgs-contact-sales (enterprise contact/demo request)

### 3. Follow Standard Process

For each new variant, follow `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md`. Define token overrides, build with Tailwind and `--mvmt-*` tokens only, verify against iron-clad rules.

### 4. Create manifest.json

Create manifests for CTA and Orgs under their respective `_docs/reference-archive/` directories (or a combined `_docs/reference-archive/misc/manifest.json`).

### 5. Update Switcher and Exports

Update `misc-template-switcher.tsx` to remove about-video-bio and add new CTA/Orgs variants. Update `index.ts` exports.

### 6. Style Cleanup

Migrate any inline styles to Tailwind per `_docs/_prompts/STYLE_CLEANUP_PROMPT.md`.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full.

## File Locations

| Item | Path |
|------|------|
| Template components | `components/layouts/movement-leader/cta-*.tsx`, `components/layouts/movement-leader/orgs-*.tsx` |
| Template switcher | `components/layouts/movement-leader/misc-template-switcher.tsx` |
| Page route | `app/templates/misc/page.tsx` |
| Reference images | `_docs/reference-images-all/cta-*`, `_docs/reference-images-all/orgs-*` |
| Central registry | `components/layouts/movement-leader/index.ts` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Full build workflow | `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` |
| Style cleanup guide | `_docs/_prompts/STYLE_CLEANUP_PROMPT.md` |
