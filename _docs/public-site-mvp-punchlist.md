# Movemental.ai Public Site MVP Punchlist

> **Generated**: January 2026  
> **Purpose**: Document what was changed, what was preserved, and remaining gaps for MVP launch

---

## Summary of Changes

### Routes Created

| Route | Purpose | Status |
|-------|---------|--------|
| `/about` | Mission page for non-fit visitors and curious browsers | **Created** |
| `/what-is-movemental` | Clear "is/is not" expectations page with positioning | **Created** |

### Routes Modified

| Route | Changes Made |
|-------|--------------|
| `/learn` | Converted from placeholder links to "coming soon" hub with links to existing content |
| `/team` | Updated with real steward data (Josh, Alan, Brad) and stewardship posture section |

### Components Modified

| Component | Changes Made |
|-----------|--------------|
| `FitCheckContainer.tsx` | Fixed `/resources` → `/about` for non-fit visitors |
| `FeatureSection.tsx` | Fixed `/features/*` links → real routes (`/onboarding`, `/pricing`, `/ai-vision`, `/network`, `/what-is-movemental`) |
| `PublicNavigation.tsx` | Added "How It Works" to primary nav; removed "Learn" from Content dropdown; removed "Network" from secondary nav |
| `PublicFooter.tsx` | Added "About", "What Is Movemental", "How It Works"; reorganized sections |
| `TeamCredibilityContainer.tsx` | Replaced placeholder team with real stewards; added stewardship posture section |
| `ContentCard.tsx` | Fixed `/learn/*` dynamic links to point to `/learn` hub |
| `SearchResultCard.tsx` | Fixed `/learn/*` dynamic links to point to `/learn` hub |

---

## What Was NOT Changed

| Item | Reason |
|------|--------|
| `/fit-check` | Explicitly excluded per requirements |
| `/why-movemental` | Explicitly excluded per requirements |
| `/ai-vision` | Already MVP-ready |
| `/onboarding` | Already MVP-ready |
| `/pricing` | Already MVP-ready |
| `/book` + reader routes | Already MVP-ready |
| `/books`, `/topics`, `/network`, `/authors`, `/profile/[id]` | Functional, no broken links |
| `/search` | Functional |
| Legal pages | Functional |
| Visual design system | No new design language introduced |
| shadcn/ui components | Not modified |

---

## Team Page Updates

### Before (Placeholder)
- Generic role names: "Platform Team", "Movement Council", "Pioneer Leaders"
- No real photos, bios, or links
- Generic testimonial quote

### After (Real Stewards)
| Name | Role | Bio Summary |
|------|------|-------------|
| Josh Shepherd | Platform Lead | Builder and technologist at intersection of AI, publishing, movement leadership |
| Alan Hirsch | Movement Catalyst | Author and thought leader on missional ecclesiology and apostolic movements |
| Brad Briscoe | Church Planting Strategist | Practitioner focused on church planting and multiplication networks |

Added: "Stewardship Posture" section explaining curated cohort approach.

---

## Navigation Changes

### Primary Nav (Desktop)
**Before**: Fit Check, Why Movemental  
**After**: Fit Check, Why Movemental, **How It Works**

### Content Dropdown
**Before**: AI Book, Books, Topics, AI Vision, Learn  
**After**: AI Vision, AI Book, Books, Topics (removed Learn)

### Secondary Nav
**Before**: Network, Team, Pricing  
**After**: Team, Pricing (Network moved to Content section in footer only)

### Footer Sections
**Platform**: Fit Check, Why Movemental, How It Works, Pricing  
**Content**: AI Vision, AI Book, Books, Topics, Network  
**Company**: About, What Is Movemental, Team, Privacy Policy, Terms of Service

---

## Broken Links Fixed

| Original Link | Referenced From | Fixed To |
|---------------|-----------------|----------|
| `/resources` | FitCheckContainer (non-fit result) | `/about` |
| `/features/publishing` | FeatureSection | `/onboarding` |
| `/features/revenue` | FeatureSection | `/pricing` |
| `/features/audience` | FeatureSection | `/what-is-movemental` |
| `/features/ai` | FeatureSection | `/ai-vision` |
| `/features/network` | FeatureSection | `/network` |
| `/features/analytics` | FeatureSection | `/onboarding` |
| `/learn/getting-started` | Learn page | Removed (page now shows hub) |
| `/learn/first-course` | Learn page | Removed |
| `/learn/ownership` | Learn page | Removed |
| `/learn/tour`, `/learn/mastery`, etc. | Learn page | Removed |
| `/learn/${slug}` (dynamic) | ContentCard, SearchResultCard | `/learn` |

---

## Remaining Known Gaps

### Content Gaps (Non-Blocking for MVP)
- [ ] Team member photos/avatars (using no images currently - acceptable for MVP)
- [ ] Video content for learning hub
- [ ] Course detail pages (`/learn/[slug]`)
- [ ] Article detail pages (`/articles/[slug]`)
- [ ] Video detail pages (`/videos/[slug]`)

### Future Enhancements (Post-MVP)
- [ ] Email capture on `/about` and `/learn` pages
- [ ] Real testimonials with attribution on Team page
- [ ] Individual team member profile pages
- [ ] PDF download functionality for AI Book
- [ ] Progress tracking for book reading
- [ ] Actual course content and enrollment

### Intentionally Deferred
- [ ] Dashboard routes (require auth - separate scope)
- [ ] User-generated content flows
- [ ] Commerce/payment integration

---

## Testing Checklist

### Routes to Verify
- [ ] `/` (homepage) - all feature links work
- [ ] `/fit-check` - result CTAs link correctly
- [ ] `/about` - all links work
- [ ] `/what-is-movemental` - all links work
- [ ] `/team` - steward data displays correctly
- [ ] `/learn` - no broken links, hub displays correctly
- [ ] `/onboarding` - accessible via "How It Works" nav
- [ ] Navigation - all items link to real routes
- [ ] Footer - all items link to real routes

### Build Verification
```bash
pnpm lint
pnpm build
```

---

## File Manifest

### New Files
```
app/(public)/about/page.tsx
app/(public)/what-is-movemental/page.tsx
_docs/public-site-mvp-punchlist.md
```

### Modified Files
```
components/fit-check/FitCheckContainer.tsx
components/homepage/FeatureSection.tsx
components/team-credibility/TeamCredibilityContainer.tsx
components/shared/PublicNavigation.tsx
components/shared/PublicFooter.tsx
components/topic-hub/ContentCard.tsx
components/search/SearchResultCard.tsx
app/(public)/learn/page.tsx
```

---

**Report Generated**: January 2026  
**Scope**: Public site MVP polish (excluding /fit-check and /why-movemental)
