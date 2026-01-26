# Movemental.ai Public Site Audit

> **Inventory & Evidence Report for Proposed Public Pages**  
> **Generated**: January 2026  
> **Purpose**: Identify what exists vs. what's missing to inform content/framing vision refinement

---

## Executive Summary

| # | Page/Section | Status | Type | MVP-Ready? |
|---|--------------|--------|------|------------|
| 1 | Fit Check | **Yes** | Route page | **Ready** |
| 2 | Why Movemental? | **Yes** | Route page | **Ready** |
| 3 | What Movemental Is / Is Not | **No** | Missing | Needs creation |
| 4 | Team / Stewards | **Partial** | Route page | Needs content |
| 5 | How It Works | **Partial** | Homepage section + Onboarding | Needs consolidation |
| 6 | AI Vision & Posture | **Yes** | Route page | **Ready** |
| 7 | Onboarding Path | **Yes** | Route page | **Ready** |
| 8 | Learning & Formation Hub | **Partial** | Route page | Needs content |
| 9 | Book as Living Artifact | **Yes** | Route page | **Ready** |
| 10 | Secondary Audience Off-ramp | **Partial** | Fit Check result | Needs destination pages |

---

## 1. Fit Check (Self-Selection Experience)

### A) Status Summary
- **Exists?** Yes
- **Type:** Dedicated route page with full component suite
- **Publicly reachable?** Yes — `/fit-check`
- **Quality:** **MVP-ready** — well-implemented, fully functional

### B) Evidence (Concrete)
- **Route(s):** `/fit-check`
- **File paths:**
  - `app/(public)/fit-check/page.tsx`
  - `components/fit-check/FitCheckContainer.tsx`
  - `components/fit-check/FitCheckLanding.tsx`
  - `components/fit-check/FitCheckProgress.tsx`
  - `components/fit-check/FitCheckQuestion.tsx`
  - `components/fit-check/FitCheckResults.tsx`
  - `components/fit-check/AnswerCard.tsx`
  - `components/fit-check/ScaleInput.tsx`
- **Key components used:** FitCheckContainer (state machine), FitCheckLanding, FitCheckProgress, FitCheckQuestion, FitCheckResults, AnswerCard, ScaleInput
- **Data dependencies:** `lib/schemas/fit-check.ts` — contains `FIT_CHECK_QUESTIONS` array, `calculateFitResult()`, tier definitions

### C) UI Snapshot Notes
- **Landing screen:** Clean, centered layout with headline "Is Movemental Right for You?", 60-second promise, single CTA to start
- **Question flow:** Full-screen questions with fixed header (progress bar) and fixed footer (navigation). Clean typography, card-based answer options with hover states
- **Results screen:** Tier-based results (tier1/tier2/tier3/non-fit) with icon, title, subtitle, score card, and alignment breakdown bars
- **Navigation:** Back/Continue buttons, keyboard support (Enter, Escape, Arrow keys), auto-advance after selection
- **Missing pieces:** None significant — this is fully implemented

### D) Gaps + Recommendations
- **What's missing:** Nothing critical. This is the most polished public page.
- **Recommendation:** Consider adding email capture on results page for lead nurturing. Currently redirects directly to `/why-movemental` or `/resources`.

---

## 2. Why Movemental? (Core Narrative)

### A) Status Summary
- **Exists?** Yes
- **Type:** Dedicated route page with narrative scrolling sections
- **Publicly reachable?** Yes — `/why-movemental`
- **Quality:** **MVP-ready** — excellent narrative flow

### B) Evidence (Concrete)
- **Route(s):** `/why-movemental`
- **File paths:**
  - `app/(public)/why-movemental/page.tsx`
  - `components/why-movemental/WhyMovementalContainer.tsx`
  - `components/why-movemental/NarrativeStatement.tsx`
  - `components/why-movemental/NarrativeSection.tsx`
  - `components/why-movemental/ScrollProgress.tsx`
  - `components/why-movemental/SectionNav.tsx`
  - `components/why-movemental/StatisticsCallout.tsx`
  - `components/why-movemental/PullQuote.tsx`
- **Key components used:** WhyMovementalContainer (orchestrates sections), NarrativeStatement (animated text reveals), NarrativeSection (background variants), ScrollProgress, SectionNav (sticky section navigation)
- **Data dependencies:** Static content embedded in component

### C) UI Snapshot Notes
- **Layout:** Single-column narrative with alternating backgrounds (dark/light/muted)
- **Hierarchy:** 5 sections: Intro (problem statement), Part I (The Reality), Part II (The Shift), Part III (Solution), Outro (Mission)
- **Visual elements:** 
  - Sticky section navigation (Intro/Part I/Part II/Part III/Outro)
  - Scroll progress bar at top
  - Large statistics callouts (66%, 10x) with gradient backgrounds
  - Pull quotes with distinctive styling
  - Final stats grid (90%/\$1K/2-4 weeks)
- **CTA:** "See Your Journey" button linking to `/onboarding`
- **Missing pieces:** None — well-structured narrative

### D) Gaps + Recommendations
- **What's missing:** Content is solid but heavily focused on economic argument. Could benefit from more "why movement leaders specifically" framing.
- **Recommendation:** The narrative is strong. May want to add testimonial quotes from actual leaders rather than generic pull quotes.

---

## 3. What Movemental Is / Is Not

### A) Status Summary
- **Exists?** No
- **Type:** Missing entirely — no dedicated page
- **Publicly reachable?** No
- **Quality:** N/A

### B) Evidence (Concrete)
- **Route(s):** None exists
- **File paths:** No dedicated page or components
- **Key components used:** N/A
- **Data dependencies:** N/A

### C) UI Snapshot Notes
- N/A — page does not exist

### D) Gaps + Recommendations
- **What's missing:** A clear "Is/Is Not" page that sets expectations. Some of this content appears scattered:
  - `/why-movemental` addresses "why" but not "what"
  - `/pricing` FAQ touches on comparisons but from a features lens
  - Homepage features section talks about capabilities but not boundaries
- **Recommendation:** Create a dedicated `/about` or `/what-is-movemental` page with:
  - What Movemental IS (platform for movement leaders, ownership model, network)
  - What Movemental IS NOT (generic website builder, social media, content mill)
  - Clear positioning against competitors (Substack, Kajabi, traditional publishers)

---

## 4. Team / Stewards (Josh / Alan / Brad)

### A) Status Summary
- **Exists?** Partial
- **Type:** Dedicated route page exists, but content is generic
- **Publicly reachable?** Yes — `/team`
- **Quality:** **Needs content** — structure exists, but no real team data

### B) Evidence (Concrete)
- **Route(s):** `/team`
- **File paths:**
  - `app/(public)/team/page.tsx`
  - `components/team-credibility/TeamCredibilityContainer.tsx`
  - `components/team-credibility/GradientHero.tsx`
  - `components/team-credibility/Timeline.tsx`
  - `components/team-credibility/TimelineMilestone.tsx`
  - `components/team-credibility/TeamGrid.tsx`
  - `components/team-credibility/TeamMemberCard.tsx`
  - `components/team-credibility/TestimonialQuote.tsx`
  - `components/team-credibility/NetworkVisualization.tsx`
- **Key components used:** TeamCredibilityContainer, GradientHero, Timeline, TeamGrid, TeamMemberCard, TestimonialQuote, NetworkVisualization
- **Data dependencies:** Static placeholder data in `TeamCredibilityContainer.tsx`:
  - `MILESTONES` array (journey timeline)
  - `TEAM_MEMBERS` array (generic: "Platform Team", "Movement Council", "Pioneer Leaders")
  - `NETWORK_MEMBERS` array (includes names like "Alan H.", "Brad B.", "Deb H." but as network visualization nodes, not team members)

### C) UI Snapshot Notes
- **Layout:** 
  - Gradient hero with headline "The People Behind Movemental"
  - Journey timeline (2023-2026 milestones)
  - Testimonial quote block
  - Team grid (3 cards)
  - Network visualization
  - Final CTA to Fit Check
- **Hierarchy:** Hero → Timeline → Testimonial → Team → Network → CTA
- **Missing pieces:**
  - **No actual team member profiles** — uses generic role descriptions ("Platform Team", "Movement Council", "Pioneer Leaders")
  - **No photos, bios, or social links** for Josh, Alan, Brad
  - No individual team member pages
- **Problems:** The page exists structurally but lacks authentic content. Feels like a placeholder.

### D) Gaps + Recommendations
- **What's missing:** 
  - Real team member data (Josh Shepherd, Alan Hirsch, Brad Brisco at minimum)
  - Individual photos/avatars
  - Personal bios and roles
  - Social/website links
- **Recommendation:** Populate `TEAM_MEMBERS` array with actual steward data. Consider individual profile links (e.g., `/profile/josh-shepherd`).

---

## 5. How It Works (Conceptual Mechanics)

### A) Status Summary
- **Exists?** Partial — split across homepage and onboarding page
- **Type:** Homepage section (`ProcessSteps`) + dedicated onboarding page
- **Publicly reachable?** Yes (as parts) — homepage and `/onboarding`
- **Quality:** **Needs consolidation** — content exists but fragmented

### B) Evidence (Concrete)
- **Route(s):** 
  - Homepage (`/`) has `ProcessSteps` component
  - `/onboarding` has full journey explanation
- **File paths:**
  - `components/homepage/ProcessSteps.tsx`
  - `app/(public)/onboarding/page.tsx`
  - `components/onboarding-path/OnboardingPathContainer.tsx`
  - `components/onboarding-path/Timeline.tsx`
  - `components/onboarding-path/PhaseCard.tsx`
  - `lib/schemas/onboarding-path.ts` (defines `ONBOARDING_PHASES`)
- **Key components used:** ProcessSteps (homepage), OnboardingPathContainer, Timeline, PhaseCard
- **Data dependencies:** `ONBOARDING_PHASES` from `lib/schemas/onboarding-path.ts`

### C) UI Snapshot Notes
- **Homepage ProcessSteps:** Brief 3-4 step visual showing the journey (not examined in detail)
- **Onboarding page:**
  - Hero section with "See Your Journey"
  - Horizontal timeline preview (desktop)
  - Vertical expandable timeline with 4 phases: Discovery & Vision, Content Research, Platform Architecture, Network Integration
  - "What Makes This Different" grid (Movement-First, Evidence-Based, Launch-Ready, Network Effects, Owned Not Rented, AI-Amplified)
  - Bottom CTA
- **Missing pieces:** No dedicated `/how-it-works` route — user must navigate to `/onboarding` or rely on homepage section

### D) Gaps + Recommendations
- **What's missing:** A dedicated "How It Works" page that explains the conceptual model without being onboarding-focused
- **Recommendation:** 
  - Option A: Rename/reframe `/onboarding` as "How It Works" and make it the canonical explanation page
  - Option B: Create separate `/how-it-works` for conceptual overview (visitor-focused), keep `/onboarding` for prospect-focused journey detail
  - The `/onboarding` page is well-structured — consider whether "How It Works" needs to be separate or if `/onboarding` serves both purposes

---

## 6. AI Vision & Posture

### A) Status Summary
- **Exists?** Yes
- **Type:** Dedicated route page with scrollytelling experience
- **Publicly reachable?** Yes — `/ai-vision`
- **Quality:** **MVP-ready** — comprehensive, well-designed

### B) Evidence (Concrete)
- **Route(s):** `/ai-vision`
- **File paths:**
  - `app/(public)/ai-vision/page.tsx`
  - `components/ai-vision/AIVisionContainer.tsx`
  - `components/ai-vision/AIVisionHero.tsx`
  - `components/ai-vision/PillarNavigation.tsx`
  - `components/ai-vision/PillarSection.tsx`
  - `components/ai-vision/ComparisonTable.tsx`
  - `components/ai-vision/NetworkVisualization.tsx`
  - `components/ai-vision/AIVisionCTA.tsx`
  - `components/ai-vision/MobileNavTabs.tsx`
  - `components/ai-vision/ScrollProgressBar.tsx`
  - `components/ai-vision/ScrollRevealBlock.tsx`
  - `components/ai-vision/useScrollProgress.ts`
  - `components/ai-vision/useActiveSection.ts`
- **Key components used:** AIVisionContainer, AIVisionHero, PillarNavigation (sticky sidebar), PillarSection, ComparisonTable, NetworkVisualization, ScrollProgressBar, MobileNavTabs
- **Data dependencies:** Static content embedded (`PILLARS`, `PILLAR_CONTENT`, `COMPARISON_ITEMS`)

### C) UI Snapshot Notes
- **Layout:** Full scrollytelling experience with:
  - Scroll progress bar at top
  - Hero section
  - Sticky sidebar navigation (desktop) / tab navigation (mobile)
  - 4 pillar sections: Scenius Intelligence, Amplification, Network Aware, Credibility
  - Comparison table (Movemental vs. Generic AI)
  - Network visualization
  - Bottom CTA
- **Hierarchy:** Clear pillar-based structure with active section highlighting
- **Features:** 
  - Scroll-driven animations
  - Feature cards within each pillar
  - Comparison table with checkmarks/X marks
  - Network visualization diagram
- **Missing pieces:** None — this is a complete, polished page

### D) Gaps + Recommendations
- **What's missing:** Nothing critical. Page is comprehensive.
- **Recommendation:** Consider adding specific examples or case studies of AI-assisted content creation to make it more tangible.

---

## 7. Onboarding Path (Visible Path, Even if Gated)

### A) Status Summary
- **Exists?** Yes
- **Type:** Dedicated route page
- **Publicly reachable?** Yes — `/onboarding`
- **Quality:** **MVP-ready** — clear journey visualization

### B) Evidence (Concrete)
- **Route(s):** `/onboarding`
- **File paths:**
  - `app/(public)/onboarding/page.tsx`
  - `components/onboarding-path/OnboardingPathContainer.tsx`
  - `components/onboarding-path/OnboardingHero.tsx`
  - `components/onboarding-path/Timeline.tsx`
  - `components/onboarding-path/PhaseCard.tsx`
  - `components/onboarding-path/OnboardingCTA.tsx`
  - `lib/schemas/onboarding-path.ts`
- **Key components used:** OnboardingPathContainer, OnboardingHero, Timeline (vertical + horizontal), PhaseCard, OnboardingCTA
- **Data dependencies:** `ONBOARDING_PHASES` from `lib/schemas/onboarding-path.ts`

### C) UI Snapshot Notes
- **Layout:**
  - Hero with "See Your Journey" and scroll CTA
  - Section header "Four Phases to Launch"
  - Horizontal timeline preview (desktop only)
  - Vertical timeline with expandable phase cards
  - "What Makes This Different" 6-card grid
  - Bottom CTA section
- **Hierarchy:** Hero → Phases → Differentiators → CTA
- **Features:**
  - Expandable phase cards with deliverables
  - Duration indicators per phase
  - Icon-based visual hierarchy
- **Missing pieces:** None significant

### D) Gaps + Recommendations
- **What's missing:** Nothing critical. The journey is well-explained.
- **Recommendation:** Consider adding specific examples of what gets delivered in each phase (e.g., "Phase 2: We analyze your top 50 articles...").

---

## 8. Learning & Formation Hub (Guides/Resources)

### A) Status Summary
- **Exists?** Partial
- **Type:** Dedicated route page with placeholder content
- **Publicly reachable?** Yes — `/learn`
- **Quality:** **Needs content** — structure exists, data is static placeholders

### B) Evidence (Concrete)
- **Route(s):** `/learn`
- **File paths:**
  - `app/(public)/learn/page.tsx`
  - `components/course-enrollment/VideoLearningCard.tsx`
  - `components/course-enrollment/GradientResourceCard.tsx`
  - `components/course-enrollment/CategoryCard.tsx`
  - `components/course-enrollment/IllustratedTOC.tsx`
  - `components/course-enrollment/ResourceIconCard.tsx`
- **Key components used:** VideoLearningCard, GradientResourceCard, CategoryCard
- **Data dependencies:** Static placeholder data in page.tsx:
  - `FEATURED_VIDEOS` (3 items with placeholder links like `/learn/getting-started`)
  - `RESOURCE_CARDS` (In-App Tour, 3 Hour Course, Video Library, Examples)
  - `CATEGORIES` (Content Strategy, Course Creation, Audience Growth, Monetization)

### C) UI Snapshot Notes
- **Layout:**
  - Hero section "Learn Movemental"
  - "Get Started" section with 3 video cards
  - "Resources" section with 4 gradient cards
  - "Browse by Topic" section with 4 category cards
- **Hierarchy:** Hero → Featured Videos → Resources → Categories
- **Missing pieces:**
  - All links are placeholder (e.g., `/learn/getting-started` doesn't exist)
  - No actual video content
  - No actual courses or guides
  - Static durations ("15m", "10m", "12m")

### D) Gaps + Recommendations
- **What's missing:**
  - Actual learning content/videos
  - Working internal links
  - Real course structure
  - Integration with content management
- **Recommendation:** Either populate with real content or consider gating this page until content exists. The structure is good but links to nowhere currently.

---

## 9. The Book as a Living Artifact

### A) Status Summary
- **Exists?** Yes
- **Type:** Dedicated route page + e-reader interface
- **Publicly reachable?** Yes — `/book`, `/book/read`, `/book/[chapterId]`
- **Quality:** **MVP-ready** — comprehensive book experience

### B) Evidence (Concrete)
- **Route(s):** 
  - `/book` (landing page)
  - `/book/read` (e-reader)
  - `/book/[chapterId]` (chapter pages)
- **File paths:**
  - `app/(public)/book/page.tsx`
  - `app/(public)/book/read/page.tsx`
  - `app/(public)/book/read/AIBookReader.tsx`
  - `app/(public)/book/[chapterId]/page.tsx`
  - `lib/data/ai-book-chapters.ts` (chapter data)
  - `components/ai-book-reading/*` (10 components)
  - `components/e-reader/*` (8 components)
- **Key components used:** Book landing with chapter list, EReaderContainer, EReaderContent, EReaderHeader, EReaderNavigation, EReaderProgress, EReaderSettings, EReaderTOC
- **Data dependencies:** `BOOK_PARTS`, `BOOK_METADATA`, `ALL_CHAPTERS` from `lib/data/ai-book-chapters.ts`

### C) UI Snapshot Notes
- **Book Landing (`/book`):**
  - Dark gradient hero with title "The Movemental AI Book"
  - Subtitle: "Navigating Credibility, AI, and Movement Leadership"
  - Stats: chapters count, total reading time
  - CTAs: "Start Reading", "Download PDF"
  - 5-part structure overview
  - Full table of contents organized by parts
  - "Why Read This Book?" section
  - Final CTA
- **E-Reader (`/book/read`):**
  - Minimal header with controls (TOC, settings, bookmarks)
  - Reading progress bar
  - Chapter navigation
  - Reading-optimized typography
  - Settings panel (font size, theme, line spacing)
- **Hierarchy:** Landing → TOC → Chapter Reading
- **Features:**
  - Part-based organization (5 parts, multiple chapters each)
  - Reading time per chapter
  - Chapter descriptions
  - Progress tracking

### D) Gaps + Recommendations
- **What's missing:** Nothing critical for MVP. Book experience is complete.
- **Recommendation:** 
  - Consider adding actual chapter content (currently references `BOOK_PARTS` data structure)
  - "Download PDF" button may need actual PDF generation
  - Could add highlighting/notes functionality later

---

## 10. Secondary Audience / "Just Curious" Off-ramp

### A) Status Summary
- **Exists?** Partial
- **Type:** Fit Check result state, but destination pages missing
- **Publicly reachable?** Partially — result displays but links broken
- **Quality:** **Needs destination pages**

### B) Evidence (Concrete)
- **Route(s):** 
  - Fit Check results page (part of `/fit-check`)
  - References `/about` and `/resources` which don't exist
- **File paths:**
  - `components/fit-check/FitCheckResults.tsx` (lines 159-168)
  - `lib/schemas/fit-check.ts` (tier definitions)
- **Key components used:** FitCheckResults component
- **Data dependencies:** `getTierInfo()` function returns `ctaText` and navigation behavior

### C) UI Snapshot Notes
- **Non-fit result:**
  - Different icon (AlertCircle in slate gray)
  - Different color gradient
  - Title varies by tier
  - Primary CTA varies ("Continue to Platform" for fits, different for non-fits)
  - Secondary text: "Still curious about what we're building?"
  - Secondary CTA: "Learn About Our Mission" linking to `/about`
- **Problem:** The `/about` page doesn't exist. Neither does `/resources` (referenced in `FitCheckContainer.tsx` line 113)

### D) Gaps + Recommendations
- **What's missing:**
  - `/about` page for curious non-fits
  - `/resources` page (or clarify what this should be)
  - Clear "off-ramp" content for those who don't fit
- **Recommendation:** Create simple `/about` page explaining Movemental's mission without the sales-focused framing. This gives non-fits a gentle landing spot rather than a dead link.

---

## Additional Global Inventory

### 1) Current Public Sitemap (Actual)

#### Marketing/Site Pages
| Route | Status | Notes |
|-------|--------|-------|
| `/` | Active | Homepage with hero, features, stats, CTA |
| `/fit-check` | Active | Self-selection assessment |
| `/why-movemental` | Active | Core narrative page |
| `/onboarding` | Active | Journey/process explanation |
| `/pricing` | Active | Pricing comparison page |
| `/team` | Active | Team page (placeholder content) |
| `/ai-vision` | Active | AI posture scrollytelling |

#### Library/Content Pages
| Route | Status | Notes |
|-------|--------|-------|
| `/book` | Active | AI Book landing |
| `/book/read` | Active | E-reader interface |
| `/book/[chapterId]` | Active | Individual chapters |
| `/books` | Active | Book catalog (placeholder data) |
| `/books/[slug]` | Active | Individual book detail |
| `/books/[slug]/read` | Active | Book reading |
| `/topics` | Active | Topic listing |
| `/topics/[slug]` | Active | Individual topic hub |
| `/learn` | Active | Learning hub (placeholder data) |

#### Network/Profile Pages
| Route | Status | Notes |
|-------|--------|-------|
| `/network` | Active | Network discovery |
| `/authors` | Active | Movement leaders listing |
| `/profile/[id]` | Active | Individual profiles |

#### Utility Pages
| Route | Status | Notes |
|-------|--------|-------|
| `/search` | Active | Global search |
| `/legal/privacy` | Active | Privacy policy |
| `/legal/terms` | Active | Terms of service |

#### Missing/Broken Pages
| Route | Referenced From | Issue |
|-------|-----------------|-------|
| `/about` | Fit Check non-fit result | Does not exist |
| `/resources` | FitCheckContainer | Does not exist |
| `/features/*` | FeatureSection "Learn more" links | Does not exist |
| `/learn/*` | Learn page cards | Does not exist |

---

### 2) Navigation Reality Check

#### Current Top Navigation Items
**Primary Nav:**
- Fit Check → `/fit-check`
- Why Movemental → `/why-movemental`

**Content Dropdown:**
- AI Book → `/book`
- Books → `/books`
- Topics → `/topics`
- AI Vision → `/ai-vision`
- Learn → `/learn`

**Secondary Nav:**
- Network → `/network`
- Team → `/team`
- Pricing → `/pricing`

**CTA:**
- Search icon → `/search`
- "Get Started" button → `/fit-check`

#### Which Feel Out of Place for Movemental.ai?
| Item | Assessment |
|------|------------|
| "Books" | Could feel confusing alongside "AI Book" — are these different? |
| "Topics" | Low value for new visitors — more useful once engaged |
| "Network" | Makes sense but may be premature before user understands platform |
| "Pricing" | Good placement, expected |

#### Which of the 10 Intended Items Are in Nav?
| Intended Item | In Nav? | Location |
|---------------|---------|----------|
| 1. Fit Check | **Yes** | Primary nav + CTA button |
| 2. Why Movemental? | **Yes** | Primary nav |
| 3. What Is/Is Not | **No** | Missing entirely |
| 4. Team/Stewards | **Yes** | Secondary nav |
| 5. How It Works | **Partial** | Onboarding not in nav, ProcessSteps only on homepage |
| 6. AI Vision | **Yes** | Content dropdown |
| 7. Onboarding Path | **No** | Not in nav (accessible via CTAs) |
| 8. Learning Hub | **Yes** | Content dropdown as "Learn" |
| 9. Book as Artifact | **Yes** | Content dropdown as "AI Book" |
| 10. Off-ramp | **No** | Not in nav (only in Fit Check results) |

---

### 3) "Ready for MVP" Call

#### Already MVP-Ready
- **Fit Check** — Fully functional self-selection experience
- **Why Movemental?** — Strong narrative, good design
- **AI Vision & Posture** — Comprehensive scrollytelling page
- **Onboarding Path** — Clear journey explanation
- **Book as Living Artifact** — Full book landing + e-reader experience
- **Pricing** — Complete comparison page with FAQ

#### Close But Needs Polish
- **Team/Stewards** — Structure exists, needs real team member data (Josh, Alan, Brad)
- **Learning Hub** — Structure exists, needs actual content or hide until ready
- **How It Works** — Content exists but split across homepage/onboarding — needs consolidation or clearer IA

#### Missing Entirely
- **What Movemental Is/Is Not** — No dedicated page
- **Secondary Audience Off-ramp** — Fit Check references pages that don't exist (`/about`, `/resources`)
- **Various internal links** — `/features/*`, `/learn/*` routes referenced but non-existent

---

## Recommendations Summary

### Immediate (Before Launch)
1. **Create `/about` page** — Simple mission page for non-fit visitors
2. **Fix broken links** — Remove or update `/resources` reference, `/features/*` links
3. **Populate Team page** — Add Josh, Alan, Brad with real photos/bios

### Short-Term
4. **Create "What Is/Is Not" page** — Clear positioning and expectations
5. **Consolidate "How It Works"** — Either make `/onboarding` the canonical page or create dedicated `/how-it-works`
6. **Hide or populate Learn page** — Either add real content or remove from nav

### Navigation Suggestions
7. Consider adding "How It Works" to primary nav
8. Consider moving "Topics" and "Books" to footer (reduce cognitive load for new visitors)
9. Add "About" or "What Is Movemental" to footer or secondary nav

---

## File Manifest (Key Files)

### Routes
```
app/
├── page.tsx                           # Homepage
├── (public)/
│   ├── fit-check/page.tsx             # Fit Check
│   ├── why-movemental/page.tsx        # Why Movemental
│   ├── team/page.tsx                  # Team
│   ├── onboarding/page.tsx            # Onboarding Path
│   ├── ai-vision/page.tsx             # AI Vision
│   ├── pricing/page.tsx               # Pricing
│   ├── book/page.tsx                  # Book Landing
│   ├── book/read/page.tsx             # E-Reader
│   ├── books/page.tsx                 # Book Catalog
│   ├── topics/page.tsx                # Topics
│   ├── learn/page.tsx                 # Learning Hub
│   ├── network/page.tsx               # Network
│   ├── search/page.tsx                # Search
│   └── legal/                         # Legal pages
```

### Component Directories
```
components/
├── fit-check/                         # 8 components
├── why-movemental/                    # 7 components  
├── team-credibility/                  # 9 components
├── onboarding-path/                   # 6 components
├── ai-vision/                         # 14 components
├── homepage/                          # 10 components
├── book-purchase/                     # 8 components
├── e-reader/                          # 8 components
├── ai-book-reading/                   # 11 components
├── course-enrollment/                 # 6 components
├── topic-hub/                         # 9 components
├── network-discovery/                 # 7 components
├── search/                            # 10 components
└── shared/                            # 4 components (nav, footer, breadcrumbs)
```

---

**Report Generated**: January 2026  
**Scope**: Public site pages inventory  
**Next Steps**: Use this audit to inform content/framing decisions before implementation
