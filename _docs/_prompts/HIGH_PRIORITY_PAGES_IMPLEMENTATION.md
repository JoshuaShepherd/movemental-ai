# High Priority Pages Implementation Prompt

> **Comprehensive implementation guide for all high-priority missing UI pages**

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Priority**: HIGH - These pages have no design direction and no components

---

## Overview

This document provides complete implementation prompts for the six high-priority pages that are missing both design direction and components. These pages are critical platform functionality that need to be built.

**Pages Covered:**
1. AI Book Landing Page
2. AI Vision Page (Scrollytelling)
3. Topic Hub
4. Analytics Dashboard
5. Search Interface
6. Book Purchase & E-Reader

---

## Tech Stack Requirements (All Pages)

Implement using the established Movemental stack:
- **Next.js 15** with App Router
- **TypeScript** with strict mode
- **shadcn/ui** components (do NOT modify `components/ui/`)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Hook Form** + **Zod** for forms

---

## Global Design Language

### Typography Scale
- **Hero Headlines**: 48-72px desktop, 32-48px mobile
- **Section Headlines**: 32-48px desktop, 24-32px mobile
- **Subheadlines**: 20-28px
- **Body Text**: 16-20px (reading-optimized: 18-20px)
- **Small Text**: 14-16px

### Spacing System (8px base)
- **Section Padding**: 80-120px vertical
- **Card Padding**: 24-32px
- **Component Spacing**: 16-32px
- **Text Line Height**: 1.6-1.8 for body

### Color Palette
- **Primary Gradient**: Dark purple → blue/black
- **Accent**: Cyan/teal for CTAs and highlights
- **Success**: Green for positive feedback
- **Muted**: Gray tones for secondary text
- **Background**: White (light) / Near-black #0a0a0a (dark sections)

### Responsive Breakpoints
- **Mobile**: < 768px (single column)
- **Tablet**: 768px - 1024px (2 columns)
- **Desktop**: > 1024px (full layout)

---

# Page 1: AI Book Landing

## Context

The AI Book Landing page is the entry point to Movemental's **Knowledge Spine**—comprehensive foundational knowledge that establishes shared language, discernment, and posture. This page must communicate that the content is **free but not casual**, substantial enough to require engagement.

## Content Specification

Reference: `_docs/site-docs/06_ai_book_as_knowledge_spine.md`

**Key Messages:**
- Free foundational knowledge for all platform users
- Establishes Language, Discernment, and Posture
- Functions as Knowledge Spine, not lead magnet
- Comprehensive, authoritative, requiring engagement

## Route Structure

```
app/
├── (public)/
│   └── book/
│       ├── page.tsx                    # Landing page
│       └── [chapterId]/
│           └── page.tsx                # Chapter reading (existing)
```

## Component Structure

```
components/
├── ai-book-landing/
│   ├── AIBookLandingContainer.tsx      # Main container
│   ├── BookHero.tsx                    # Hero section
│   ├── BookValueProp.tsx               # Language/Discernment/Posture cards
│   ├── ChapterPreview.tsx              # Table of contents preview
│   ├── ChapterCard.tsx                 # Individual chapter card
│   ├── BookCTA.tsx                     # Start reading CTA
│   ├── BookStats.tsx                   # Reading time, chapters count
│   ├── TestimonialQuote.tsx            # Optional: quotes about the book
│   └── index.ts                        # Barrel export
```

## Design Patterns

### Pattern 1: Dark Gradient Hero
```
┌─────────────────────────────────────────────────────────┐
│  [Gradient Background: Purple → Black]                  │
│                                                         │
│           The Knowledge Spine                           │
│           ─────────────────────                         │
│                                                         │
│     Free foundational knowledge that establishes        │
│     the language, discernment, and posture needed       │
│     to use Movemental effectively.                      │
│                                                         │
│              [Start Reading →]                          │
│                                                         │
│         📖 14 Chapters  •  ⏱️ 2-3 hour read             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Full-width dark gradient background (purple → near-black)
- Large gradient text headline (48-72px)
- Subheadline paragraph explaining value (20-24px, lighter)
- Single prominent CTA button (cyan/teal accent)
- Stats row: chapters count, estimated reading time
- Scroll indicator animation

### Pattern 2: Value Proposition Cards (Language, Discernment, Posture)
```
┌─────────────────────────────────────────────────────────┐
│  Why This Matters                                       │
│                                                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │  📝 Language │ │ 🔍 Discernment│ │ 🎯 Posture   │    │
│  │              │ │              │ │              │    │
│  │ Shared vocab │ │ Critical     │ │ The attitude │    │
│  │ for platform │ │ thinking to  │ │ needed to    │    │
│  │ ownership... │ │ evaluate...  │ │ create...    │    │
│  └──────────────┘ └──────────────┘ └──────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- 3-column grid (1 column on mobile)
- Each card: Icon + title + 2-3 sentence description
- Subtle hover lift animation
- Consistent card styling (white background, subtle shadow)

### Pattern 3: Chapter Table of Contents
```
┌─────────────────────────────────────────────────────────┐
│  What's Inside                                          │
│                                                         │
│  ┌────────────────────────────────────────────────┐    │
│  │ 01  The Credibility Collapse                    │    │
│  │     Understanding why expertise is drowning...  │    │
│  │     ⏱️ 8 min read                               │    │
│  ├────────────────────────────────────────────────┤    │
│  │ 02  AI as Both Problem and Solution            │    │
│  │     The paradox of AI in content creation...   │    │
│  │     ⏱️ 12 min read                              │    │
│  ├────────────────────────────────────────────────┤    │
│  │ 03  Why Movement Leaders Were Right to Ignore  │    │
│  │     SEO never served theological depth...      │    │
│  │     ⏱️ 10 min read                              │    │
│  └────────────────────────────────────────────────┘    │
│                                                         │
│              [View All Chapters →]                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Vertical list of chapter cards
- Each card: Number badge + title + excerpt + reading time
- Click to navigate to chapter
- "View All" expands or navigates to full TOC
- First 3-5 chapters visible, rest collapsed

### Pattern 4: Bottom CTA Section
```
┌─────────────────────────────────────────────────────────┐
│  [Dark Background]                                      │
│                                                         │
│     Ready to begin?                                     │
│                                                         │
│     This is foundational knowledge—                    │
│     not a quick read, but a foundation                 │
│     for everything else.                               │
│                                                         │
│     [Start Chapter 1 →]    [Download PDF]              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Dark section with gradient background
- Large text statement
- Dual CTAs: Primary (start reading), Secondary (download PDF)
- Subtle transition from light to dark section

## Component Specifications

### BookHero Props
```tsx
interface BookHeroProps {
  title: string
  subtitle: string
  stats: {
    chapters: number
    readingTime: string
  }
  ctaLabel: string
  ctaHref: string
  className?: string
}
```

### ChapterCard Props
```tsx
interface ChapterCardProps {
  number: number
  title: string
  excerpt: string
  readingTime: string
  href: string
  isLocked?: boolean
  className?: string
}
```

### BookValueProp Props
```tsx
interface BookValuePropProps {
  items: {
    icon: LucideIcon
    title: string
    description: string
  }[]
  className?: string
}
```

## Quality Checklist

- [ ] Dark gradient hero with strong visual impact
- [ ] Value proposition cards (Language, Discernment, Posture)
- [ ] Chapter table of contents with reading times
- [ ] Stats display (chapters, total reading time)
- [ ] Primary CTA prominent and accessible
- [ ] Mobile responsive (test at 375px)
- [ ] Keyboard navigation works
- [ ] No TypeScript errors

---

# Page 2: AI Vision Page (Scrollytelling)

## Context

The AI Vision page presents **Movemental Intelligence**—the unique approach to AI that amplifies authentic voices while maintaining theological depth. This is a scrollytelling experience with sticky navigation and progressive content reveal.

## Content Specification

Reference: `_docs/ai-vision/01_ai-vision-overview.md`, `_docs/ai-vision/04_ui-ux-proposal.md`

**Four Pillars:**
1. **Scenius-Enhanced Intelligence** - AI trained on collective knowledge
2. **Amplification, Not Replacement** - AI enhances, doesn't replace
3. **Network-Aware Intelligence** - Cross-pollination and discovery
4. **Credibility Through Quality** - Curation over algorithms

## Route Structure

```
app/
├── (public)/
│   └── ai-vision/
│       └── page.tsx                    # AI Vision scrollytelling page
```

## Component Structure

```
components/
├── ai-vision/
│   ├── AIVisionContainer.tsx           # Main scrollytelling container
│   ├── AIVisionHero.tsx                # Hero section
│   ├── PillarNavigation.tsx            # Sticky sidebar navigation
│   ├── PillarSection.tsx               # Individual pillar section
│   ├── PillarCard.tsx                  # Feature card within pillar
│   ├── ScrollProgressBar.tsx           # Global scroll progress
│   ├── StickyHeader.tsx                # Sticky header during scroll
│   ├── ScrollRevealBlock.tsx           # Animated reveal wrapper
│   ├── NetworkVisualization.tsx        # Visual network diagram
│   ├── ComparisonTable.tsx             # AI approach comparison
│   ├── AIVisionCTA.tsx                 # Bottom CTA section
│   └── index.ts                        # Barrel export
```

## Design Patterns

### Pattern 1: Immersive Hero with Scroll Cue
```
┌─────────────────────────────────────────────────────────┐
│  [Full-viewport Hero with Animated Background]          │
│                                                         │
│                                                         │
│              Movemental                                 │
│              Intelligence                               │
│              ─────────────────                          │
│                                                         │
│         AI that amplifies authentic voices              │
│         while maintaining theological depth             │
│                                                         │
│                                                         │
│                    ↓ Scroll to explore                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Full viewport height (100vh)
- Animated gradient background (subtle movement)
- Large gradient text headline (64-72px)
- Subheadline (24-28px)
- Animated scroll indicator (bouncing arrow)
- Smooth scroll to first section on click

### Pattern 2: Sticky Pillar Navigation (Desktop)
```
┌───────────────────────┬─────────────────────────────────┐
│  [Sticky Sidebar]     │  [Main Content Area]            │
│                       │                                 │
│  ○ Scenius            │  ┌─────────────────────────┐   │
│  ● Amplification ←    │  │  Amplification,         │   │
│  ○ Network            │  │  Not Replacement        │   │
│  ○ Credibility        │  │                         │   │
│                       │  │  [Content cards and     │   │
│  ───────────          │  │   explanations]         │   │
│  Progress: 45%        │  │                         │   │
│                       │  └─────────────────────────┘   │
│                       │                                 │
└───────────────────────┴─────────────────────────────────┘
```

**Implementation:**
- Fixed sidebar (left, 250px width) on desktop
- Navigation items with dot indicators
- Active item highlighted (filled dot, bold text)
- Progress bar showing overall scroll progress
- Smooth scroll to section on click
- Mobile: Converts to horizontal tabs at top

### Pattern 3: Pillar Section Layout
```
┌─────────────────────────────────────────────────────────┐
│  Scenius-Enhanced Intelligence                          │
│  ─────────────────────────────────                      │
│                                                         │
│  [Fade-in Introduction Paragraph]                       │
│                                                         │
│  ┌────────────────┐  ┌────────────────┐                │
│  │ 🧠 Theologically│  │ 🎤 Voice-Aware │                │
│  │    Grounded     │  │                │                │
│  │                │  │ Recognizes and │                │
│  │ Understands    │  │ preserves      │                │
│  │ movemental     │  │ authentic      │                │
│  │ principles...  │  │ leader voice   │                │
│  └────────────────┘  └────────────────┘                │
│                                                         │
│  ┌────────────────┐  ┌────────────────┐                │
│  │ 🌐 Context-    │  │ 🔗 Network-    │                │
│  │    Sensitive   │  │    Enabled     │                │
│  │                │  │                │                │
│  │ Adapts to      │  │ Benefits from  │                │
│  │ different      │  │ collective     │                │
│  │ domains...     │  │ knowledge      │                │
│  └────────────────┘  └────────────────┘                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Section ID for navigation anchor
- Fade-in animation on scroll (Intersection Observer)
- 2-column grid of feature cards (1 column on mobile)
- Cards have icon, title, description
- Staggered animation for cards (100ms delay between)

### Pattern 4: Comparison Block
```
┌─────────────────────────────────────────────────────────┐
│  Movemental Intelligence vs. Generic AI                 │
│                                                         │
│  ┌─────────────────────┬─────────────────────┐         │
│  │  Generic AI         │  Movemental AI      │         │
│  ├─────────────────────┼─────────────────────┤         │
│  │  ❌ Keyword-based    │  ✅ DNA-aware        │         │
│  │  ❌ Voice-agnostic   │  ✅ Voice-preserving │         │
│  │  ❌ Isolated tools   │  ✅ Network-enabled  │         │
│  │  ❌ Volume-focused   │  ✅ Quality-focused  │         │
│  └─────────────────────┴─────────────────────┘         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Two-column comparison table
- Red X for generic AI limitations
- Green checkmark for Movemental advantages
- Alternating row backgrounds for readability
- Mobile: Stacked cards instead of table

### Pattern 5: Network Visualization
```
┌─────────────────────────────────────────────────────────┐
│  Network-Aware Intelligence                             │
│                                                         │
│         [Animated Network Diagram]                      │
│                                                         │
│              ○───○───○                                  │
│             /│   │   │\                                 │
│            ○ │   ○   │ ○                                │
│             \│       │/                                 │
│              ○───────○                                  │
│                                                         │
│         Leaders connected, ideas flowing                │
│         Cross-pollination at scale                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Canvas or SVG-based network visualization
- Animated connections (subtle pulse)
- Nodes represent leaders/domains
- Hover reveals node details
- Mobile: Simplified static version

### Pattern 6: Bottom Vision CTA
```
┌─────────────────────────────────────────────────────────┐
│  [Dark Gradient Background]                             │
│                                                         │
│         AI that serves Kingdom advancement,             │
│         not platform extraction.                        │
│                                                         │
│    [Read the AI Book]    [Explore the Network]         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Scrollytelling Implementation

### Intersection Observer Setup
```tsx
// Hook for scroll-triggered animations
function useScrollReveal(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}
```

### Scroll Progress Calculation
```tsx
// Hook for scroll progress
function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress((scrollTop / docHeight) * 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
```

### Active Section Detection
```tsx
// Hook for detecting active section
function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    
    return () => observer.disconnect()
  }, [sectionIds])

  return activeId
}
```

## Component Specifications

### PillarSection Props
```tsx
interface PillarSectionProps {
  id: string
  title: string
  subtitle: string
  features: {
    icon: LucideIcon
    title: string
    description: string
  }[]
  className?: string
}
```

### PillarNavigation Props
```tsx
interface PillarNavigationProps {
  pillars: {
    id: string
    label: string
  }[]
  activeId: string | null
  progress: number
  className?: string
}
```

### ScrollRevealBlock Props
```tsx
interface ScrollRevealBlockProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}
```

## Quality Checklist

- [ ] Full-viewport hero with animated scroll cue
- [ ] Sticky sidebar navigation (desktop)
- [ ] Mobile-friendly tab navigation
- [ ] Four pillar sections with scroll reveal
- [ ] Comparison table (Movemental vs. Generic AI)
- [ ] Network visualization (can be simplified)
- [ ] Scroll progress indicator
- [ ] Active section highlighting
- [ ] Bottom CTA section
- [ ] Smooth scroll between sections
- [ ] Mobile responsive (test at 375px)
- [ ] Framer Motion animations
- [ ] No TypeScript errors

---

# Page 3: Topic Hub

## Context

Topic Hub pages aggregate content by topic/category—psychology, technology, worship, justice, etc. These pages enable content discovery and cross-pollination across the network.

## Route Structure

```
app/
├── (public)/
│   └── topics/
│       ├── page.tsx                    # All topics listing
│       └── [slug]/
│           └── page.tsx                # Individual topic hub
```

## Component Structure

```
components/
├── topic-hub/
│   ├── TopicHubContainer.tsx           # Main container
│   ├── TopicHero.tsx                   # Topic-specific hero
│   ├── FeaturedContentGrid.tsx         # Featured articles/books
│   ├── ContentCard.tsx                 # Individual content card
│   ├── LeaderContributors.tsx          # Leaders in this topic
│   ├── ContributorCard.tsx             # Individual contributor
│   ├── RelatedTopics.tsx               # Related topic tags
│   ├── TopicSubscribe.tsx              # Subscribe to topic
│   ├── TopicStats.tsx                  # Topic statistics
│   └── index.ts                        # Barrel export
```

## Design Patterns

### Pattern 1: Topic Hero
```
┌─────────────────────────────────────────────────────────┐
│  [Topic Color Gradient Background]                      │
│                                                         │
│     🧠 Psychology & Formation                           │
│     ─────────────────────────────                       │
│                                                         │
│     Exploring the intersection of faith,                │
│     psychology, and human formation.                    │
│                                                         │
│     [Subscribe to Topic]                                │
│                                                         │
│     📚 142 Articles  •  👥 28 Contributors              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Topic-specific color gradient
- Large topic icon + title
- Description paragraph
- Subscribe CTA button
- Stats row: article count, contributor count

### Pattern 2: Featured Content Grid
```
┌─────────────────────────────────────────────────────────┐
│  Featured Content                                       │
│                                                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │  [Image]     │ │  [Image]     │ │  [Image]     │    │
│  │              │ │              │ │              │    │
│  │  Article     │ │  Book        │ │  Course      │    │
│  │  Title       │ │  Title       │ │  Title       │    │
│  │              │ │              │ │              │    │
│  │  Author      │ │  Author      │ │  Instructor  │    │
│  │  8 min read  │ │  14 chapters │ │  6 modules   │    │
│  └──────────────┘ └──────────────┘ └──────────────┘    │
│                                                         │
│              [View All Content →]                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- 3-column grid (2 on tablet, 1 on mobile)
- Cards with image, content type badge, title, author, metadata
- Hover lift animation
- "View All" link to full listing

### Pattern 3: Leader Contributors
```
┌─────────────────────────────────────────────────────────┐
│  Topic Contributors                                     │
│                                                         │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐       │
│  │  [Pic] │  │  [Pic] │  │  [Pic] │  │  [Pic] │       │
│  │        │  │        │  │        │  │        │       │
│  │  Alan  │  │  Mindy │  │  Tim   │  │  Mandy │       │
│  │ Hirsch │  │Caliguire│  │  Keel │  │ Smith  │       │
│  │        │  │        │  │        │  │        │       │
│  │ 23 pcs │  │ 15 pcs │  │ 12 pcs │  │ 8 pcs  │       │
│  └────────┘  └────────┘  └────────┘  └────────┘       │
│                                                         │
│              [View All Contributors →]                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Horizontal scroll on mobile, grid on desktop
- Avatar + name + piece count
- Click navigates to leader profile
- "View All" link to full contributor list

### Pattern 4: Related Topics
```
┌─────────────────────────────────────────────────────────┐
│  Explore Related Topics                                 │
│                                                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │ 🙏 Spiritual │ │ 🧬 Neurology │ │ 🌱 Formation │    │
│  │  Formation   │ │  & Faith     │ │  Practices   │    │
│  └──────────────┘ └──────────────┘ └──────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Horizontal row of topic tags/pills
- Each has icon + label
- Click navigates to that topic hub
- Subtle hover animation

## Component Specifications

### TopicHero Props
```tsx
interface TopicHeroProps {
  topic: {
    title: string
    slug: string
    description: string
    icon: string
    color: string
    articleCount: number
    contributorCount: number
  }
  className?: string
}
```

### ContentCard Props
```tsx
interface ContentCardProps {
  content: {
    type: 'article' | 'book' | 'course' | 'video'
    title: string
    slug: string
    image?: string
    author: {
      name: string
      avatar?: string
    }
    metadata: string // "8 min read" or "14 chapters"
  }
  className?: string
}
```

### ContributorCard Props
```tsx
interface ContributorCardProps {
  contributor: {
    name: string
    slug: string
    avatar: string
    pieceCount: number
  }
  className?: string
}
```

## Quality Checklist

- [ ] Topic hero with color gradient and stats
- [ ] Featured content grid with content type badges
- [ ] Leader contributors section
- [ ] Related topics navigation
- [ ] Subscribe to topic functionality (can be UI-only initially)
- [ ] Mobile responsive (horizontal scroll where appropriate)
- [ ] Keyboard navigation works
- [ ] No TypeScript errors

---

# Page 4: Analytics Dashboard

## Context

The Analytics Dashboard provides movement leaders with insights into their content performance, audience reach, revenue metrics, and network engagement. This is a data-rich interface that needs to be clear and actionable.

## Route Structure

```
app/
├── dashboard/
│   └── analytics/
│       └── page.tsx                    # Analytics dashboard
```

## Component Structure

```
components/
├── analytics-dashboard/
│   ├── AnalyticsDashboardContainer.tsx # Main container
│   ├── MetricOverview.tsx              # Top metrics row
│   ├── MetricTile.tsx                  # Individual metric card
│   ├── RevenueChart.tsx                # Revenue line/bar chart
│   ├── AudienceReachGauge.tsx          # Reach visualization
│   ├── ContentPerformanceTable.tsx     # Top performing content
│   ├── ContentRow.tsx                  # Individual content row
│   ├── NetworkInsightsCard.tsx         # Network metrics
│   ├── TransparencyMetrics.tsx         # Badge usage stats
│   ├── DateRangePicker.tsx             # Date filter
│   ├── ExportButton.tsx                # Export data
│   └── index.ts                        # Barrel export
```

## Design Patterns

### Pattern 1: Metric Overview Row
```
┌─────────────────────────────────────────────────────────┐
│  Analytics Overview               [Last 30 Days ▼]      │
│                                                         │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌──────┐ │
│  │  Revenue   │ │   Reach    │ │  Content   │ │ AI   │ │
│  │            │ │            │ │            │ │ QA   │ │
│  │  $4,250    │ │   28.5K    │ │    42      │ │ 94%  │ │
│  │  ↑ 12%     │ │   ↑ 45%    │ │   ↑ 8     │ │ Good │ │
│  └────────────┘ └────────────┘ └────────────┘ └──────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- 4-column grid (2x2 on mobile)
- Each tile: Label, large number, trend indicator
- Trend: Green up arrow (positive), Red down arrow (negative)
- Click tile to see detailed breakdown

### Pattern 2: Revenue Chart
```
┌─────────────────────────────────────────────────────────┐
│  Revenue                                   [MTD | QTD]  │
│                                                         │
│  $5K ┤                                    ╭─────        │
│      │                              ╭─────╯             │
│  $4K ┤                        ╭─────╯                   │
│      │                  ╭─────╯                         │
│  $3K ┤            ╭─────╯                               │
│      │      ╭─────╯                                     │
│  $2K ┤╭─────╯                                           │
│      └──────────────────────────────────────────────    │
│       Jan   Feb   Mar   Apr   May   Jun                 │
│                                                         │
│  Total: $24,500    Avg: $4,083/mo    Peak: $5,200      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Line chart with gradient fill under line
- Toggle: MTD (Month to Date) / QTD (Quarter)
- Hover shows exact value at point
- Summary stats below chart
- Use Recharts or similar charting library

### Pattern 3: Audience Reach Gauge
```
┌─────────────────────────────────────────────────────────┐
│  Audience Reach                                         │
│                                                         │
│              ┌───────────────────┐                      │
│              │                   │                      │
│              │    ╭───────╮      │                      │
│              │   ╱   28x  ╲     │     Amplification    │
│              │  │ Baseline │    │     vs. solo reach   │
│              │   ╲        ╱     │                      │
│              │    ╰──────╯      │                      │
│              │                   │                      │
│              └───────────────────┘                      │
│                                                         │
│  Your content: 1,200     Network reach: 33,600         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Circular gauge or radial chart
- Center shows amplification multiplier
- Compare own audience vs. network reach
- Animated fill on load

### Pattern 4: Content Performance Table
```
┌─────────────────────────────────────────────────────────┐
│  Top Performing Content                    [View All]   │
│                                                         │
│  ┌────────────────────────────────────────────────────┐│
│  │ Title                    Views   Shares  Revenue   ││
│  ├────────────────────────────────────────────────────┤│
│  │ The Credibility Crisis   4,250   342     $850     ││
│  │ Network Effects Matter   3,100   256     $620     ││
│  │ APEST in Practice        2,800   198     $540     ││
│  │ AI and Theology          2,450   187     $480     ││
│  │ Formation Practices      2,100   145     $420     ││
│  └────────────────────────────────────────────────────┘│
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Table with sortable columns
- Click row to view content detail
- Show top 5, "View All" for full list
- Mobile: Card view instead of table

### Pattern 5: Network Insights Card
```
┌─────────────────────────────────────────────────────────┐
│  Network Insights                                       │
│                                                         │
│  ┌──────────────────┐  ┌──────────────────┐            │
│  │ Audience Overlap │  │  Collaboration   │            │
│  │                  │  │  Opportunities   │            │
│  │     34%          │  │      12          │            │
│  │  with network    │  │  suggested       │            │
│  └──────────────────┘  └──────────────────┘            │
│                                                         │
│  Top Overlaps:                                          │
│  • Alan Hirsch (28%)                                    │
│  • Tim Keel (22%)                                       │
│  • Mindy Caliguire (18%)                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Two-column stat cards
- List of top overlapping leaders
- Click leader name to view profile

### Pattern 6: Transparency Metrics
```
┌─────────────────────────────────────────────────────────┐
│  AI Transparency                                        │
│                                                         │
│  Badge Usage                                            │
│  ████████████████░░░░ 78% of content has badges        │
│                                                         │
│  Badge Distribution:                                    │
│  • Human-Created: 42%                                   │
│  • AI-Assisted: 35%                                     │
│  • AI-Generated: 1%                                     │
│  • No Badge: 22%                                        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Progress bar for badge coverage
- Breakdown list with percentages
- Color-coded by badge type

## Component Specifications

### MetricTile Props
```tsx
interface MetricTileProps {
  label: string
  value: string | number
  trend?: {
    direction: 'up' | 'down' | 'neutral'
    percentage: number
  }
  icon?: LucideIcon
  onClick?: () => void
  className?: string
}
```

### ContentRow Props
```tsx
interface ContentRowProps {
  content: {
    title: string
    slug: string
    views: number
    shares: number
    revenue: number
  }
  className?: string
}
```

### DateRangePicker Props
```tsx
interface DateRangePickerProps {
  value: { start: Date; end: Date }
  onChange: (range: { start: Date; end: Date }) => void
  presets?: { label: string; value: { start: Date; end: Date } }[]
  className?: string
}
```

## Quality Checklist

- [ ] Metric overview row with 4 key metrics
- [ ] Revenue chart with time series
- [ ] Audience reach gauge/visualization
- [ ] Content performance table (sortable)
- [ ] Network insights card
- [ ] Transparency metrics
- [ ] Date range picker
- [ ] Export functionality (can be placeholder)
- [ ] Mobile responsive (cards instead of table)
- [ ] Loading states for data
- [ ] No TypeScript errors

---

# Page 5: Search Interface

## Context

The Search Interface enables platform-wide content discovery across articles, books, courses, videos, and leaders. It must be fast, relevant, and provide filtering options.

## Route Structure

```
app/
├── (public)/
│   └── search/
│       └── page.tsx                    # Search results page
```

## Component Structure

```
components/
├── search/
│   ├── SearchContainer.tsx             # Main container
│   ├── SearchInput.tsx                 # Search input with suggestions
│   ├── SearchSuggestions.tsx           # Autocomplete dropdown
│   ├── SearchResults.tsx               # Results layout
│   ├── SearchResultCard.tsx            # Individual result
│   ├── SearchFilters.tsx               # Filter sidebar
│   ├── FilterSection.tsx               # Individual filter group
│   ├── SearchEmptyState.tsx            # No results state
│   ├── RecentSearches.tsx              # Recent search history
│   ├── SearchPagination.tsx            # Results pagination
│   └── index.ts                        # Barrel export
```

## Design Patterns

### Pattern 1: Search Hero
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                       Search                            │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  🔍  Search articles, books, courses, leaders...  │ │
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  Recent: formation practices, APEST, network effects   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Large, prominent search input
- Placeholder text suggesting content types
- Recent searches below (clickable tags)
- Auto-focus on page load

### Pattern 2: Search Suggestions Dropdown
```
┌───────────────────────────────────────────────────────┐
│  🔍  forma                                            │
├───────────────────────────────────────────────────────┤
│  📚 Books                                             │
│    • Formation for Mission - Hugh Halter              │
│    • Spiritual Formation - Mindy Caliguire           │
│                                                       │
│  📝 Articles                                          │
│    • Formation Practices for Leaders                  │
│    • The Formation Crisis                            │
│                                                       │
│  👤 Leaders                                           │
│    • Alan Hirsch (formation expert)                  │
└───────────────────────────────────────────────────────┘
```

**Implementation:**
- Dropdown appears after 2+ characters
- Results grouped by type
- Keyboard navigation (arrow keys, enter)
- Click or enter to search/navigate

### Pattern 3: Search Results with Filters
```
┌───────────────────┬─────────────────────────────────────┐
│  Filters          │  Results for "formation"            │
│                   │  124 results                        │
│  Type             │                                     │
│  ☑ Articles (89) │  ┌─────────────────────────────────┐│
│  ☑ Books (23)    │  │  [Image]  Article Title         ││
│  ☐ Courses (8)   │  │           Excerpt text here...  ││
│  ☐ Videos (4)    │  │           Author • 8 min read   ││
│                   │  └─────────────────────────────────┘│
│  Topic            │                                     │
│  ☐ Psychology    │  ┌─────────────────────────────────┐│
│  ☑ Formation     │  │  [Cover]  Book Title            ││
│  ☐ Leadership    │  │           Author Name           ││
│                   │  │           14 chapters           ││
│  Date             │  └─────────────────────────────────┘│
│  ○ Any time      │                                     │
│  ○ Past week     │  [1] [2] [3] ... [10] [Next →]      │
│  ○ Past month    │                                     │
│  ● Past year     │                                     │
│                   │                                     │
│  [Clear Filters]  │                                     │
│                   │                                     │
└───────────────────┴─────────────────────────────────────┘
```

**Implementation:**
- Left sidebar filters (collapse to top on mobile)
- Checkbox filters for type, topic
- Radio filters for date range
- Results count updates as filters change
- Pagination at bottom

### Pattern 4: Search Result Card
```
┌─────────────────────────────────────────────────────────┐
│  [Thumbnail]   The Formation Crisis                     │
│                                                         │
│                Why spiritual formation matters more     │
│                than ever in an age of distraction...    │
│                                                         │
│                📝 Article  •  Mindy Caliguire          │
│                🏷️ Formation, Psychology  •  8 min read │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Horizontal card layout (vertical on mobile)
- Thumbnail, title, excerpt, metadata
- Content type badge
- Author with avatar
- Topic tags
- Reading time/chapter count

### Pattern 5: Empty State
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                    🔍                                   │
│                                                         │
│           No results for "xyz123"                       │
│                                                         │
│           Try:                                          │
│           • Using different keywords                   │
│           • Removing some filters                      │
│           • Checking your spelling                     │
│                                                         │
│           [Browse All Content]                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Centered layout
- Large search icon
- Helpful suggestions
- CTA to browse content

## Component Specifications

### SearchInput Props
```tsx
interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
  className?: string
}
```

### SearchFilters Props
```tsx
interface SearchFiltersProps {
  filters: {
    types: string[]
    topics: string[]
    dateRange: 'any' | 'week' | 'month' | 'year'
  }
  onChange: (filters: SearchFiltersProps['filters']) => void
  availableFilters: {
    types: { value: string; label: string; count: number }[]
    topics: { value: string; label: string; count: number }[]
  }
  className?: string
}
```

### SearchResultCard Props
```tsx
interface SearchResultCardProps {
  result: {
    type: 'article' | 'book' | 'course' | 'video' | 'leader'
    title: string
    slug: string
    excerpt: string
    thumbnail?: string
    author?: {
      name: string
      avatar?: string
    }
    topics: string[]
    metadata: string
  }
  className?: string
}
```

## Quality Checklist

- [ ] Large, accessible search input
- [ ] Autocomplete suggestions (type-grouped)
- [ ] Filter sidebar (type, topic, date)
- [ ] Search results with cards
- [ ] Result type badges
- [ ] Empty state with suggestions
- [ ] Recent searches display
- [ ] Pagination
- [ ] Mobile responsive (filters as modal/sheet)
- [ ] Keyboard navigation
- [ ] URL query params for shareable searches
- [ ] No TypeScript errors

---

# Page 6: Book Purchase & E-Reader

## Context

The Book Purchase pages enable users to browse, purchase, and read books. This includes a catalog, individual book pages, checkout flow, and an e-reader interface.

## Route Structure

```
app/
├── (public)/
│   └── books/
│       ├── page.tsx                    # Book catalog
│       └── [slug]/
│           ├── page.tsx                # Book detail page
│           └── read/
│               └── page.tsx            # E-reader interface
```

## Component Structure

```
components/
├── book-purchase/
│   ├── BookCatalogContainer.tsx        # Catalog container
│   ├── BookCatalogGrid.tsx             # Book grid
│   ├── BookCatalogCard.tsx             # Individual book card
│   ├── BookDetailContainer.tsx         # Detail page container
│   ├── BookCover.tsx                   # Large book cover
│   ├── BookMeta.tsx                    # Author, pages, format
│   ├── BookDescription.tsx             # Full description
│   ├── BookSample.tsx                  # Sample chapter preview
│   ├── BookPurchaseCard.tsx            # Purchase options card
│   ├── BookReviews.tsx                 # Reviews section
│   └── index.ts                        # Barrel export
├── e-reader/
│   ├── EReaderContainer.tsx            # E-reader container
│   ├── EReaderHeader.tsx               # Reading header
│   ├── EReaderContent.tsx              # Main reading area
│   ├── EReaderTOC.tsx                  # Table of contents
│   ├── EReaderProgress.tsx             # Reading progress
│   ├── EReaderSettings.tsx             # Font size, theme
│   ├── EReaderBookmarks.tsx            # Bookmarks panel
│   ├── EReaderNotes.tsx                # Notes/highlights
│   └── index.ts                        # Barrel export
```

## Design Patterns

### Pattern 1: Book Catalog Grid
```
┌─────────────────────────────────────────────────────────┐
│  Books                                    [Filter ▼]    │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  [Cover] │  │  [Cover] │  │  [Cover] │  │ [Cover]│ │
│  │          │  │          │  │          │  │        │ │
│  │  Title   │  │  Title   │  │  Title   │  │ Title  │ │
│  │  Author  │  │  Author  │  │  Author  │  │ Author │ │
│  │  $19.99  │  │  $24.99  │  │  Free    │  │ $14.99 │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐ │
│  │  [Cover] │  │  [Cover] │  │  [Cover] │  │ [Cover]│ │
│  │   ...    │  │   ...    │  │   ...    │  │  ...   │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- 4-column grid (3 on tablet, 2 on mobile)
- Book cover image (aspect ratio 2:3)
- Title, author, price
- Hover: subtle lift, "View Details" overlay
- Filter by topic, price, format

### Pattern 2: Book Detail Page
```
┌─────────────────────────────────────────────────────────┐
│  ← Back to Books                                        │
│                                                         │
│  ┌──────────────────┐  ┌────────────────────────────┐  │
│  │                  │  │  The Forgotten Ways         │  │
│  │    [Large       │  │  by Alan Hirsch             │  │
│  │     Book        │  │                              │  │
│  │     Cover]      │  │  ⭐⭐⭐⭐⭐ (142 reviews)      │  │
│  │                  │  │                              │  │
│  │                  │  │  📖 312 pages  •  2024      │  │
│  │                  │  │                              │  │
│  │                  │  │  ┌────────────────────────┐ │  │
│  │                  │  │  │  $24.99   [Buy Now]   │ │  │
│  │                  │  │  │  or $9.99/mo with sub │ │  │
│  │                  │  │  └────────────────────────┘ │  │
│  │                  │  │                              │  │
│  │                  │  │  [Read Sample]              │  │
│  └──────────────────┘  └────────────────────────────┘  │
│                                                         │
│  Description                                            │
│  ─────────────                                          │
│  Lorem ipsum dolor sit amet, consectetur adipiscing     │
│  elit. Sed do eiusmod tempor incididunt ut labore...   │
│                                                         │
│  What You'll Learn                                      │
│  ──────────────────                                     │
│  • Point one about the book                            │
│  • Point two about the book                            │
│  • Point three about the book                          │
│                                                         │
│  Reviews                                                │
│  ───────                                                │
│  [Review cards...]                                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Two-column layout (stacked on mobile)
- Large book cover (left)
- Book info + purchase card (right)
- Description section below
- "What You'll Learn" bullet points
- Reviews section with rating summary

### Pattern 3: E-Reader Interface
```
┌─────────────────────────────────────────────────────────┐
│  ← [Book Title]              [TOC] [⚙️] [🔖]   Ch 3/14 │
│  ████████░░░░░░░░░░░░░░░░░░░░░ 28%                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                   Chapter 3                             │
│                   The Apostolic Genius                  │
│                                                         │
│     Lorem ipsum dolor sit amet, consectetur             │
│     adipiscing elit. Sed do eiusmod tempor             │
│     incididunt ut labore et dolore magna aliqua.       │
│                                                         │
│     Ut enim ad minim veniam, quis nostrud              │
│     exercitation ullamco laboris nisi ut               │
│     aliquip ex ea commodo consequat.                   │
│                                                         │
│     [Highlighted text with note indicator]             │
│                                                         │
│     Duis aute irure dolor in reprehenderit in          │
│     voluptate velit esse cillum dolore eu              │
│     fugiat nulla pariatur.                             │
│                                                         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [← Prev Chapter]                    [Next Chapter →]   │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Minimal header with controls
- Progress bar (percentage and chapter)
- Reading-optimized typography (18-20px, 1.7 line-height)
- Max-width for reading comfort (65-75ch)
- Keyboard navigation (arrow keys for pages)
- TOC slide-out panel
- Settings panel (font size, theme)
- Bookmark functionality
- Text highlighting with notes

### Pattern 4: E-Reader TOC Panel
```
┌─────────────────────────────────────────────────────────┐
│  Table of Contents                              [Close] │
│                                                         │
│  ✓ 1. Introduction                                      │
│  ✓ 2. The Problem                                       │
│  ● 3. The Apostolic Genius                   [Current] │
│    4. Movemental DNA                                    │
│    5. Incarnational Theology                            │
│    6. APEST Leadership                                  │
│    7. Organic Systems                                   │
│    8. Network Effects                                   │
│    ...                                                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Slide-out from left
- Checkmarks for completed chapters
- Current chapter highlighted
- Click to navigate
- Keyboard accessible

### Pattern 5: E-Reader Settings Panel
```
┌─────────────────────────────────────────────────────────┐
│  Reading Settings                               [Close] │
│                                                         │
│  Font Size                                              │
│  [A-] ──────●────── [A+]                               │
│                                                         │
│  Theme                                                  │
│  ○ Light   ● Sepia   ○ Dark                            │
│                                                         │
│  Line Spacing                                           │
│  ○ Compact   ● Normal   ○ Relaxed                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Slide-out from right
- Font size slider
- Theme toggle (light/sepia/dark)
- Line spacing options
- Settings persist in localStorage

## Component Specifications

### BookCatalogCard Props
```tsx
interface BookCatalogCardProps {
  book: {
    slug: string
    title: string
    author: string
    coverImage: string
    price: number | 'free'
    rating?: number
    reviewCount?: number
  }
  className?: string
}
```

### BookDetailContainer Props
```tsx
interface BookDetailContainerProps {
  book: {
    slug: string
    title: string
    author: {
      name: string
      slug: string
      avatar?: string
    }
    coverImage: string
    price: number | 'free'
    pageCount: number
    publishYear: number
    rating: number
    reviewCount: number
    description: string
    learningPoints: string[]
    sampleChapterSlug?: string
  }
}
```

### EReaderContainer Props
```tsx
interface EReaderContainerProps {
  book: {
    title: string
    chapters: {
      number: number
      title: string
      slug: string
      content: string
    }[]
  }
  currentChapter: number
  onChapterChange: (chapter: number) => void
}
```

### EReaderSettings Props
```tsx
interface EReaderSettingsProps {
  settings: {
    fontSize: number // 14-24
    theme: 'light' | 'sepia' | 'dark'
    lineSpacing: 'compact' | 'normal' | 'relaxed'
  }
  onChange: (settings: EReaderSettingsProps['settings']) => void
}
```

## Quality Checklist

- [ ] Book catalog grid with filtering
- [ ] Book detail page with purchase options
- [ ] Sample chapter preview
- [ ] E-reader with reading-optimized typography
- [ ] E-reader TOC panel
- [ ] E-reader settings (font size, theme)
- [ ] Reading progress tracking
- [ ] Bookmarks functionality (can be UI-only)
- [ ] Keyboard navigation in e-reader
- [ ] Mobile responsive (all pages)
- [ ] No TypeScript errors

---

# Implementation Order

## Recommended Sequence

1. **AI Book Landing** - Simplest, foundational page
2. **Search Interface** - Core platform functionality
3. **Topic Hub** - Content discovery
4. **AI Vision Page** - Complex scrollytelling
5. **Book Purchase & E-Reader** - Commerce functionality
6. **Analytics Dashboard** - Data visualization (may need backend)

## Per-Page Estimates

| Page | Components | Complexity |
|------|------------|------------|
| AI Book Landing | 8 | Low |
| AI Vision Page | 12 | High (scrollytelling) |
| Topic Hub | 9 | Medium |
| Analytics Dashboard | 12 | High (charts) |
| Search Interface | 11 | Medium |
| Book Purchase | 16 | High (e-reader) |

---

# Global Quality Checklist

Before marking any page complete:

- [ ] All patterns from this document implemented
- [ ] Mobile responsive (test at 375px, 768px, 1024px, 1280px)
- [ ] Tablet responsive (test at 768px, 1024px)
- [ ] Desktop responsive (test at 1280px, 1440px)
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] No TypeScript errors
- [ ] No linter errors
- [ ] shadcn/ui components used where appropriate
- [ ] Tailwind classes follow project conventions
- [ ] Framer Motion for animations
- [ ] Loading states implemented
- [ ] Error states implemented
- [ ] Empty states implemented

---

# Related Documentation

- `_docs/site-docs/` - Content specifications for each page
- `_docs/ai-vision/` - AI Vision content and messaging
- `_docs/ui/` - Existing design directions and reference images
- `_docs/type/` - Type safety architecture (for data contracts)

---

**Last Updated**: January 2026  
**Version**: 1.0.0
