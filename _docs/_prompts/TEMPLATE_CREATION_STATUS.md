# Template Creation Status Report

**Date:** 2026-01-29
**Total template components:** 110 across 12 page types

---

## Existing Page Types

| Page Type | Variants | Status |
|-----------|----------|--------|
| Hero / Landing | 19 | Complete |
| Content Hubs | 19 | Complete |
| Assessments / Quizzes | 15 | Complete — style cleanup in progress |
| Articles / Blog | 12 | Complete |
| Chat Interfaces | 10 | Complete |
| Books / Products | 9 | Complete |
| About | 8 | **NEW** — full page type with switcher, route, manifest |
| Auth / Login | 8 | **NEW** — full page type with switcher, route, manifest |
| Search | 3 | Minimal |
| FAQ | 2 | Minimal |
| Reader / E-book | 2 | Minimal |
| Misc (CTA, Orgs) | 2 | Minimal |

---

## Missing Page Types

These page types are referenced in `_docs/reference-archive/` but have **no templates yet**:

| Page Type | Reference Directory | Ref Images | Notes |
|-----------|-------------------|------------|-------|
| **Courses** | `courses-page/` | ~16 | Best-resourced unbuilt category |
| **Special Pages** | `special-page/` | ~7 | 404, maintenance, coming soon |
| **Pricing** | `pricing-page/` | ~6 | hero-pricing-card is a hero section, not a full page |
| **Lead Magnet** | `lead-magnet-page/` | ~5 | Opt-in / gated content pages |
| **Testimonials** | `testimonials-page/` | ~2 | Needs reference sourcing |

---

## Page Types Needing More Variants

FAQ (2), Reader (2), and Search (3) have significantly fewer variants than other categories (8-19). These should be expanded for parity.

---

## Recently Completed Work

### About Page Type (NEW)
- 7 new components: team-grid, timeline-story, mission-values, stats-hero, manifesto-dark, split-media, founder-letter
- Migrated about-video-bio from misc to about page type
- Created about-template-switcher.tsx with AboutVariant type
- Created app/templates/about/page.tsx
- Added 7 data-variant token override blocks in globals.css
- Created _docs/reference-archive/about-page/manifest.json
- Updated index.ts exports

### Auth Page Type (NEW)
- 8 new components: split-image, centered-card, dark-minimal, social-first, branded-hero, magic-link, tabbed-form, gradient-overlay
- Created auth-template-switcher.tsx with AuthVariant type
- Created app/templates/auth/page.tsx
- Added 8 data-variant token override blocks in globals.css
- Created _docs/reference-archive/auth-page/manifest.json
- Updated index.ts exports

### Assessments Audit
- All 15 token override blocks verified present in globals.css
- ~40 static inline style violations identified for migration to Tailwind
- No hardcoded colors or Tailwind color classes found (only token-based inline styles)
- Style cleanup in progress

---

## Infrastructure Gaps

### No Database Persistence
Template selection is runtime-only. No schema in `db/schema.ts` stores which template an organization has chosen per page type. This will be needed for multi-tenant template customization.

### Style Cleanup Pending
Per `STYLE_CLEANUP_PROMPT.md`, ~1,500+ hard-coded `style={{}}` declarations across ~130 files need migration to Tailwind utility classes and the `--mvmt-*` token system.

### Incomplete Reference Archive
Manifests exist for: assessments, about-page, auth-page. Other page types lack structured reference mappings.

---

## Architecture Summary

Templates follow this pattern:

```
components/layouts/movement-leader/
  [page-type]-[variant-name].tsx    # Individual template component
  [page-type]-template-switcher.tsx # Switcher with variant type + category metadata
  index.ts                          # Central export registry
```

Template preview routes live at `app/templates/[page-type]/page.tsx` (e.g. `app/templates/about/page.tsx`) and use the switcher pattern with `data-variant` attributes for per-variant CSS token overrides in `globals.css`.

---

## Recommended Next Steps

1. **Build missing page types** — Prioritize Courses (16 refs), Special (7 refs), Pricing (6 refs)
2. **Expand thin categories** — Add 5-8 more variants each for FAQ, Reader, and Search
3. **Complete reference archives** — Populate manifests for all existing page types
4. **Continue style cleanup** — Migrate remaining inline styles to Tailwind across all categories
5. **Add persistence layer** — Create database schema for organization-level template selection
