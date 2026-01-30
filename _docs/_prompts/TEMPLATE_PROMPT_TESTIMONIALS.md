# Testimonials Page Templates - Build From Scratch Prompt

## Objective

Build the entire testimonials page template set from scratch. No templates exist yet. ~2 reference images are available — additional references will need to be sourced.

## Current State

**0 variants implemented.** No switcher, no route, no manifest.

## Reference Images

Located in `_docs/reference-images-all/` with prefix `testimonials-*` (~2 images). This category needs additional reference sourcing to reach a viable set.

## Required Work

### 1. Source Additional References

Only ~2 reference images exist. Source 6-8 more from:

- Stripe (customer story cards with metrics)
- Webflow (visual testimonial showcase)
- Calendly (logo wall with featured quotes)
- Slack (case study testimonials with company details)
- Notion (community stories grid)
- HubSpot (video testimonial gallery)
- Kajabi (success stories with before/after)

Save to `_docs/reference-images-all/testimonials-{descriptor}-{index}.png`.

### 2. Full Build for Each Reference

Follow `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md`:

1. Analyze each reference image
2. Define `[data-variant="testimonials-*"]` token overrides in `globals.css`
3. Build component in `components/layouts/movement-leader/testimonials-{variant-name}.tsx`
4. Verify against `00-iron-clad-rules.md`

**Suggested variant concepts:**
- testimonials-card-grid (masonry grid of quote cards)
- testimonials-featured-hero (hero with rotating featured testimonial)
- testimonials-video-gallery (video testimonials with thumbnails)
- testimonials-logo-wall (company logos with expandable quotes)
- testimonials-case-study-list (detailed case study summaries)
- testimonials-dark-carousel (dark theme with carousel navigation)
- testimonials-metrics-highlight (testimonials paired with impact metrics)
- testimonials-community-voices (social-media-style testimonial feed)

### 3. Create Template Switcher

Create `components/layouts/movement-leader/testimonials-template-switcher.tsx`.

### 4. Create Page Route

Create `app/templates/movement-leader/testimonials/page.tsx`.

### 5. Create manifest.json

Create `_docs/reference-archive/testimonials-page/manifest.json`.

### 6. Register in Index

Export all components and the `TestimonialsVariant` type from `index.ts`.

## Iron-Clad Rules

Read and follow `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` in full.

## File Locations

| Item | Path |
|------|------|
| Template components (create) | `components/layouts/movement-leader/testimonials-*.tsx` |
| Template switcher (create) | `components/layouts/movement-leader/testimonials-template-switcher.tsx` |
| Page route (create) | `app/templates/movement-leader/testimonials/page.tsx` |
| Reference images | `_docs/reference-images-all/testimonials-*` |
| Reference archive (create) | `_docs/reference-archive/testimonials-page/manifest.json` |
| Central registry (update) | `components/layouts/movement-leader/index.ts` |
| Token config | `tailwind.config.ts` |
| Global CSS overrides (update) | `app/globals.css` |
| Iron-clad rules | `_docs/reference-images-all/template-process-prompts/00-iron-clad-rules.md` |
| Full build workflow | `_docs/reference-images-all/template-process-prompts/01-mobbin-design-implementation.md` |
| Existing switcher example | `components/layouts/movement-leader/assessments-template-switcher.tsx` |
| Existing route example | `app/templates/movement-leader/assessments/page.tsx` |
