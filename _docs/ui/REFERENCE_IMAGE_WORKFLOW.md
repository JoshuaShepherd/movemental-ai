# Reference Image Processing Workflow

> **Standard workflow for sorting and synthesizing UI reference images**

**Version**: 1.0.0  
**Last Updated**: January 2026

---

## Purpose

This document defines the repeatable workflow for processing reference images submitted to `_docs/ui/reference-images-source/`. The goal is to sort images into appropriate UI feature folders, then create synthesized design direction documents that guide implementation.

---

## Workflow Overview

```
reference-images-source/ → Analysis → Sorting → Synthesis → Implementation
```

### Phase 1: Analysis
1. Review each image in `reference-images-source/`
2. Identify the UI patterns, components, and design decisions present
3. Map each image to relevant UI feature folder(s)
4. Note commonalities and distinctions across images

### Phase 2: Sorting
1. Copy images to appropriate `{feature}/reference-images/` folders
2. Rename files descriptively per naming convention
3. Update source attribution if known
4. Delete original from `reference-images-source/` after sorting

### Phase 3: Synthesis
1. For each affected feature folder, create/update `DESIGN_DIRECTION.md`
2. Document the synthesized design approach based on all reference images
3. Extract patterns, principles, and implementation guidance
4. Link to specific reference images for traceability

### Phase 4: Implementation
1. Use `DESIGN_DIRECTION.md` as the source of truth for UI implementation
2. Reference images inform but don't dictate exact replication
3. Synthesize commonalities into a unified Movemental visual language

---

## File Naming Convention

When moving images from `reference-images-source/` to feature folders:

```
{source}-{pattern-type}-{variant}.{ext}

Examples:
- typeform-single-question-likert.png
- hims-visual-selection-cards.png
- wetransfer-quiz-landing-dark.png
- kajabi-modal-quiz-progress.png
- hubspot-quiz-validation.png
```

**Source Prefixes:**
- Brand name when identifiable (typeform, hims, wetransfer, etc.)
- `mobbin` for Mobbin-curated without clear source
- `custom` for custom designs or mockups
- `reference` for general inspiration

---

## DESIGN_DIRECTION.md Template

Each feature folder should have a `DESIGN_DIRECTION.md` file with this structure:

```markdown
# {Feature Name} - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: {date}  
**Reference Image Count**: {count}

---

## Design Vision

{1-2 paragraph summary of the unified design direction}

---

## Key Patterns Identified

### Pattern 1: {Name}
- **Source(s)**: {image references}
- **What it solves**: {problem addressed}
- **Implementation guidance**: {how to apply}

### Pattern 2: {Name}
...

---

## Visual Language

### Layout
{Layout decisions}

### Typography
{Type decisions}

### Color & Contrast
{Color decisions}

### Interaction
{Interaction decisions}

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| {filename} | {source} | {patterns} | {P1/P2/P3} |

---

## Implementation Checklist

- [ ] {Specific implementation item}
- [ ] {Specific implementation item}

---

## Open Questions

- {Questions to resolve during implementation}
```

---

## Sorting Matrix

When analyzing images, use this matrix to map patterns to features:

| Pattern Type | Primary Feature | Secondary Features |
|-------------|-----------------|-------------------|
| Single-question form | fit-check | assessment-system |
| Progress stepper | fit-check | onboarding-path, ai-media-lab |
| NPS/Rating scale | fit-check | assessment-system |
| Visual selection cards | fit-check | assessment-system, onboarding-path |
| Quiz landing/intro | fit-check | assessment-system |
| Modal overlay form | fit-check | assessment-system, subscription-management |
| Quiz validation | assessment-system | course-enrollment |
| Timeline visualization | onboarding-path | ai-media-lab |
| Reading interface | ai-book-reading | content-workbench |
| Scrollytelling | ai-vision | why-movemental |
| Rich text editor | content-workbench | ai-media-lab |
| Analytics charts | analytics-dashboard | dashboard |
| Pricing comparison | subscription-management | book-purchase |
| Profile cards | leader-profile | team-credibility |
| Course cards | course-enrollment | book-purchase |
| Search interface | search | navigation |

---

## Processing Checklist

Use this checklist for each round of reference image submissions:

### Pre-Processing
- [ ] List all images in `reference-images-source/`
- [ ] Open and analyze each image
- [ ] Identify source/brand for each image
- [ ] Map each image to primary feature(s)
- [ ] Map each image to secondary feature(s)

### Sorting
- [ ] For each feature affected:
  - [ ] Copy relevant images to `{feature}/reference-images/`
  - [ ] Rename according to naming convention
- [ ] Verify all images copied correctly
- [ ] Delete originals from `reference-images-source/`

### Synthesis
- [ ] For each feature that received new images:
  - [ ] Create/update `DESIGN_DIRECTION.md`
  - [ ] Document patterns identified
  - [ ] Define visual language decisions
  - [ ] Create implementation checklist
- [ ] Cross-reference between related features

### Verification
- [ ] `reference-images-source/` is empty
- [ ] All affected features have updated `DESIGN_DIRECTION.md`
- [ ] Implementation team can begin work

---

## Satisficing Principle

This workflow follows a **satisficing** approach:

1. **Don't over-iterate**: Find good reference models, not perfect ones
2. **Don't over-search**: A handful of quality references beats exhaustive research
3. **Synthesize, don't replicate**: Extract principles, create unified direction
4. **Progress over perfection**: Complete the checklist, then move forward
5. **Iterate as needed**: Future rounds can refine direction

The goal is to establish clear design direction that enables implementation, not to create comprehensive design documentation for its own sake.

---

## Round Tracking

### Current Round Status
- **Round**: 7
- **Date**: 2026-01-25
- **Images Processed**: 10
- **Features Affected**: leader-profile (4), user-account (3), network-discovery (2), course-enrollment (2), dashboard (3), content-workbench (3), ai-media-lab (1), legal-support (2), why-movemental (1)
- **Status**: Complete

### Round History
| Round | Date | Images | Features | Notes |
|-------|------|--------|----------|-------|
| 7 | 2026-01-25 | 10 | leader-profile (4), user-account (3), network-discovery (2), course-enrollment (2), dashboard (3), content-workbench (3), ai-media-lab (1), legal-support (2), why-movemental (1) | Profile patterns from Retool, Buy Me a Coffee, Medium, Coinbase; TOC from User Interviews; dashboard from Gamma, Gorgias; resources from Teachable, WorkOS; longform from Kajabi (Mobbin) |
| 6 | 2026-01-25 | 13 | homepage (3), onboarding-path (6), user-account (3), content-workbench (6), ai-media-lab (2), dashboard (2), legal-support (1), course-enrollment (1) | Email verification, team creation, welcome modals, template selection, settings forms, dashboard nudge, dark hero, bento grid, tutorials from Framer (Mobbin) |
| 5 | 2026-01-23 | 13 | homepage (3), content-workbench (4), course-enrollment (2), subscription-management (1), team-credibility (1), legal-support (1), ai-media-lab (1) | Hero variants, galleries, tutorials, video embeds, testimonials from Framer (Mobbin) |
| 4 | 2026-01-23 | 8 | fit-check (6), assessment-system (6), ai-book-reading (1), onboarding-path (1) | Quiz patterns from Headspace, Hims, Kajabi, Typeform, WeTransfer; article from Medium; process from Wise |
| 3 | 2026-01-23 | 5 | homepage (4), ai-book-reading (1), onboarding-path (1) | Feature sections, step cards, article typography from Framer (Mobbin) |
| 2 | 2026-01-23 | 13 | subscription-management (6), homepage (2), team-credibility (3), why-movemental (1), network-discovery (1), legal-support (1) | Pricing, CTA, timeline, network, typography patterns from Framer (Mobbin) |
| 1 | 2026-01-23 | 6 | fit-check (6), assessment-system (5), onboarding-path (2) | Form/quiz patterns from Typeform, HubSpot, Hims, WeTransfer, Kajabi |

---

**Next Step**: When images appear in `reference-images-source/`, follow this workflow to process them.
