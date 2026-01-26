# Movemental.ai Public Sitemap

> **Document Type**: Route Inventory & Sitemap  
> **Last Updated**: January 2026  
> **Purpose**: Canonical list of all public routes, organized by IA tier

---

## Tier A — Primary Journey (Conversion Path)

These routes form the core visitor journey from discovery to engagement.

| Route | Page Title | Status | Notes |
|-------|------------|--------|-------|
| `/` | Homepage | Active | Entry point with hero, features, CTA |
| `/fit-check` | Fit Check | Active | 60-second self-selection assessment |
| `/why-movemental` | Why Movemental | Active | Core narrative and value proposition |
| `/how-it-works` | How It Works | Active | Canonical journey explanation |
| `/pricing` | Pricing | Active | Transparent pricing comparison |

---

## Tier B — Trust & Context (Credibility Path)

These routes provide depth for visitors who want to understand Movemental's philosophy and team.

| Route | Page Title | Status | Notes |
|-------|------------|--------|-------|
| `/about` | About | Active | Mission statement for curious visitors |
| `/what-is-movemental` | What Movemental Is (and Is Not) | Active | Clear expectations and positioning |
| `/ai-vision` | AI Vision | Active | AI posture and philosophy |
| `/team` | Team | Active | Stewards behind Movemental (needs content) |

---

## Tier C — Explore (Content Path)

These routes provide access to the content library for engaged users.

### Book Content

| Route | Page Title | Status | Notes |
|-------|------------|--------|-------|
| `/book` | AI Book | Active | Living artifact landing page |
| `/book/read` | Book Reader | Active | E-reader interface |
| `/book/[chapterId]` | Book Chapter | Active | Individual chapter pages |
| `/books` | Books | Active | Book catalog |
| `/books/[slug]` | Book Detail | Active | Individual book pages |
| `/books/[slug]/read` | Book Reading | Active | Book reading view |

### Topic & Learning Content

| Route | Page Title | Status | Notes |
|-------|------------|--------|-------|
| `/topics` | Topics | Active | Topic listing |
| `/topics/[slug]` | Topic Hub | Active | Individual topic hubs |
| `/learn` | Learn | Active | Learning hub (needs content) |

### Network & Discovery

| Route | Page Title | Status | Notes |
|-------|------------|--------|-------|
| `/search` | Search | Active | Global search |
| `/network` | Network | Active | Movement leader network |
| `/authors` | Authors | Active | Author/leader listing |
| `/profile/[id]` | Profile | Active | Individual leader profiles |

---

## Utility Routes

| Route | Page Title | Status | Notes |
|-------|------------|--------|-------|
| `/legal/privacy` | Privacy Policy | Active | Legal requirement |
| `/legal/terms` | Terms of Service | Active | Legal requirement |

---

## Redirects

| From | To | Type | Reason |
|------|-----|------|--------|
| `/onboarding` | `/how-it-works` | 301 (Permanent) | Canonical route change |

---

## Dashboard Routes (Auth-Protected)

These routes are NOT part of the public site and require authentication.

| Route | Page Title | Status |
|-------|------------|--------|
| `/dashboard` | Dashboard Home | Active |
| `/dashboard/analytics` | Analytics | Active |
| `/dashboard/settings` | Settings | Active |

Note: Dashboard sidebar references additional routes that may not be implemented yet.

---

## Routes NOT Implemented (by design)

These routes are intentionally not part of the public site:

| Route | Referenced From | Resolution |
|-------|-----------------|------------|
| `/resources` | Previously in audit | Not needed; `/learn` serves this purpose |
| `/features/*` | N/A | Feature info integrated into existing pages |
| `/learn/*` | Learn page cards | Future: individual learning content |

---

## Navigation Placement Summary

### In Primary Nav
- Fit Check
- Why Movemental
- How It Works
- Pricing
- Explore dropdown (Book, Books, Topics, Learn)

### In Footer Only
- About, What Is Movemental, AI Vision, Team (Trust section)
- Network, Search (Explore section)
- Privacy Policy, Terms of Service (Legal)

### Not in Any Nav
- Individual content pages (accessed via parent routes)
- Dashboard routes (auth-gated)
- Profile pages (accessed via Network/Authors)

---

## Internal Link Audit

### Links Verified Working
- [x] All nav items link to existing routes
- [x] All footer items link to existing routes
- [x] Fit Check results link to valid routes (/why-movemental, /about)
- [x] Homepage CTAs link to valid routes

### Links to Monitor
- [ ] `/learn` page cards → detail pages (placeholder)
- [ ] `/team` member cards → profiles (not implemented)

---

**Document Status**: Complete  
**Maintained By**: Navigation architecture decisions
