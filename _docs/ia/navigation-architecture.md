# Movemental.ai Navigation Architecture

> **Document Type**: Information Architecture & Navigation Strategy  
> **Last Updated**: January 2026  
> **Purpose**: Define the 3-tier navigation model for the public site

---

## Executive Summary

This document defines the information architecture (IA) for Movemental.ai's public-facing site. The goal is to make the **first-time visitor journey obvious**, reduce cognitive load, and ensure every navigation item has a clear purpose.

### Design Principles

1. **Clarity over comprehensiveness** — New visitors shouldn't feel overwhelmed
2. **Conversion path first** — Primary nav guides visitors toward engagement
3. **Trust on demand** — Credibility information is accessible but not pushy
4. **Content as reward** — Library/explore features are for engaged users

---

## The 3-Tier IA Model

### Tier A — "Start Here" (Conversion Path)

**Purpose**: Guide first-time visitors through the primary journey to engagement.

| Item | Route | Purpose |
|------|-------|---------|
| Fit Check | `/fit-check` | Self-selection entry point (60s assessment) |
| Why Movemental | `/why-movemental` | Core narrative and value proposition |
| How It Works | `/how-it-works` | Canonical process/journey explanation |
| Pricing | `/pricing` | Transparent pricing and comparison |
| **Get Started** (CTA) | `/fit-check` | Primary call-to-action button |

**Rationale**: These items answer the fundamental visitor questions: "Is this for me?", "Why should I care?", "How does it work?", and "What does it cost?"

---

### Tier B — "Trust & Context" (Credibility Path)

**Purpose**: Provide depth for visitors who want to understand the people and philosophy behind Movemental.

| Item | Route | Purpose |
|------|-------|---------|
| AI Vision | `/ai-vision` | AI posture and philosophy (differentiator) |
| Team | `/team` | Stewards behind Movemental |
| What Is Movemental | `/what-is-movemental` | Clear "is/is not" expectations |
| About | `/about` | Mission statement for curious visitors |

**Rationale**: These items build trust without cluttering the primary journey. Visitors who want to go deeper can find them in the footer or "About" section.

---

### Tier C — "Explore the Library" (Content Path)

**Purpose**: Provide access to content for engaged users and returning visitors.

| Item | Route | Purpose |
|------|-------|---------|
| AI Book | `/book` | The living artifact (flagship content) |
| Books | `/books` | Book catalog |
| Topics | `/topics` | Topic hubs for discovery |
| Learn | `/learn` | Learning resources hub |
| Search | `/search` | Global search |
| Network | `/network` | Movement leader network (discovery) |
| Authors | `/authors` | Author/leader listing |

**Rationale**: Content exploration is valuable but shouldn't compete with the conversion path for first-time visitors.

---

## Navigation Implementation

### Primary Navigation (Desktop)

```
[Logo: Movemental]                                              [Search] [Get Started]

     Fit Check    Why Movemental    How It Works    Pricing    [Explore ▼]
```

**Primary Nav Items** (Tier A):
- Fit Check → `/fit-check`
- Why Movemental → `/why-movemental`  
- How It Works → `/how-it-works`
- Pricing → `/pricing`

**Explore Dropdown** (Tier C):
- AI Book → `/book`
- Books → `/books`
- Topics → `/topics`
- Learn → `/learn`

**CTA Area**:
- Search icon → `/search`
- "Get Started" button → `/fit-check`

### Mobile Navigation

```
[Logo]                                                          [Menu ☰]

┌─────────────────────────────────────┐
│ Search                              │
│                                     │
│ Fit Check                           │
│ Why Movemental                      │
│ How It Works                        │
│ Pricing                             │
│                                     │
│ ── Explore ──                       │
│ AI Book                             │
│ Books                               │
│ Topics                              │
│ Learn                               │
│                                     │
│ [Get Started]                       │
└─────────────────────────────────────┘
```

### Footer Navigation

The footer contains all tiers organized by purpose:

**Platform** (Tier A):
- Fit Check
- Why Movemental
- How It Works
- Pricing

**Explore** (Tier C):
- AI Book
- Books
- Topics
- Learn
- Search
- Network

**About** (Tier B):
- About
- What Is Movemental
- AI Vision
- Team

**Legal**:
- Privacy Policy
- Terms of Service

---

## Canonical "How It Works" Decision

### Decision: `/how-it-works` is the canonical route

**Implementation**:
1. Create `/how-it-works/page.tsx` as a wrapper that imports the existing `OnboardingPathContainer`
2. Add redirect from `/onboarding` → `/how-it-works` in `next.config.mjs`
3. Update all internal references to use `/how-it-works`

**Rationale**:
- "How It Works" is clearer and more visitor-centric than "Onboarding"
- "Onboarding" implies existing relationship; "How It Works" invites exploration
- `/onboarding` redirect preserves any existing links or bookmarks

**Alternative Considered**: Keeping `/onboarding` as canonical but labeling it "How It Works" in nav. Rejected because URL should match mental model.

---

## Items Removed from Primary Nav

| Former Location | Item | New Location | Rationale |
|-----------------|------|--------------|-----------|
| Primary nav | Content dropdown | "Explore" dropdown | Clearer label, de-emphasized |
| Primary nav | Team | Footer "About" section | Trust item, not conversion |
| Content dropdown | AI Vision | Footer "About" section | Trust item, not content |
| Content dropdown | Network | Footer "Explore" section | Niche; doesn't help new visitors |

---

## Route Mapping

### Active Routes (All Exist)

| Route | Page | Tier |
|-------|------|------|
| `/` | Homepage | — |
| `/fit-check` | Fit Check | A |
| `/why-movemental` | Why Movemental | A |
| `/how-it-works` | How It Works (NEW) | A |
| `/pricing` | Pricing | A |
| `/ai-vision` | AI Vision | B |
| `/team` | Team | B |
| `/what-is-movemental` | What Is Movemental | B |
| `/about` | About | B |
| `/book` | AI Book | C |
| `/book/read` | Book Reader | C |
| `/book/[chapterId]` | Book Chapter | C |
| `/books` | Book Catalog | C |
| `/books/[slug]` | Book Detail | C |
| `/topics` | Topics | C |
| `/topics/[slug]` | Topic Hub | C |
| `/learn` | Learn | C |
| `/search` | Search | C |
| `/network` | Network | C |
| `/authors` | Authors | C |
| `/profile/[id]` | Profile | C |
| `/legal/privacy` | Privacy Policy | Utility |
| `/legal/terms` | Terms of Service | Utility |

### Redirects Implemented

| From | To | Reason |
|------|-----|--------|
| `/onboarding` | `/how-it-works` | Canonical route change |

---

## Verification Checklist

### Routes Verified (January 2026)

- [x] `/fit-check` — Active, MVP-ready
- [x] `/why-movemental` — Active, MVP-ready
- [x] `/how-it-works` — Created (wrapper for onboarding content)
- [x] `/pricing` — Active
- [x] `/ai-vision` — Active, MVP-ready
- [x] `/team` — Active (needs content population)
- [x] `/what-is-movemental` — Active
- [x] `/about` — Active
- [x] `/book` — Active, MVP-ready
- [x] `/books` — Active
- [x] `/topics` — Active
- [x] `/learn` — Active (needs content population)
- [x] `/search` — Active
- [x] `/network` — Active
- [x] `/authors` — Active

### Link Integrity Scan Results

**Scan Date**: January 2026

| Pattern | Result |
|---------|--------|
| `href="/onboarding"` (external links) | ✅ 0 found — all updated to `/how-it-works` |
| `href="/resources"` | ✅ 0 found — no dead links |
| `href="/features/"` | ✅ 0 found — no dead links |
| Fit Check results navigation | ✅ Links to `/why-movemental` (fits) and `/about` (non-fits) |

### Files Updated

| File | Changes |
|------|---------|
| `app/(public)/about/page.tsx` | Updated `/onboarding` → `/how-it-works` |
| `app/(public)/learn/page.tsx` | Updated `/onboarding` → `/how-it-works` |

### Known Issues / Future Work

1. **Team page** — Structure exists but needs real team member data (Josh, Alan, Brad)
2. **Learn page** — Structure exists but links to non-existent detail pages
3. **Dashboard** — Already gated behind auth; not visible to public users
4. **Homepage** — Uses its own Navigation/Footer components (now aligned with PublicNavigation/PublicFooter)

---

## Implementation Files

### Files Modified

| File | Change |
|------|--------|
| `components/shared/PublicNavigation.tsx` | Updated nav structure for 3-tier model |
| `components/shared/PublicFooter.tsx` | Updated footer sections |
| `components/homepage/Navigation.tsx` | Updated to match PublicNavigation |
| `components/homepage/Footer.tsx` | Updated to match PublicFooter |
| `app/(public)/how-it-works/page.tsx` | NEW: Canonical How It Works page |
| `next.config.mjs` | Added redirect from /onboarding |

### Files Unchanged

| File | Reason |
|------|--------|
| `app/(public)/fit-check/*` | Content unchanged per constraints |
| `app/(public)/why-movemental/*` | Content unchanged per constraints |
| `app/(public)/onboarding/*` | Kept as source; redirect handles routing |

---

## Design Notes

### Why Not Remove /onboarding Entirely?

The `/onboarding` route and its components (`OnboardingPathContainer`, etc.) represent significant existing work. Rather than duplicate or refactor, the `/how-it-works` page imports and renders the same content. The redirect ensures SEO consistency.

### Why Put AI Vision in Tier B?

AI Vision is a differentiator and trust-builder, not a content piece. Visitors looking for "the content" don't expect AI philosophy there. Moving it to Tier B (About section) keeps the Explore dropdown focused on actual content.

### Why Keep Learn in Nav Despite Placeholder Content?

The structure is solid and demonstrates platform capabilities. If it becomes credibility-damaging (broken links, empty states), it should be hidden behind a feature flag until content is ready.

---

**Document Status**: Complete  
**Next Review**: After launch feedback
