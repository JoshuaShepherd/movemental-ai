# Course Enrollment - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 5

---

## Design Vision

The Course Enrollment experience should make **discovering and starting learning content feel inviting and organized**. Users need to quickly understand what's available, estimate time commitments, and choose a starting point. The design prioritizes visual hierarchy that showcases content quality while providing clear pathways to begin learning.

The Framer references show patterns for video-based learning cards with duration indicators and gradient resource cards that create a premium, organized feel. These patterns make learning content feel approachable yet substantive.

---

## Key Patterns Identified

### Pattern 1: Video Learning Cards with Duration
- **Source(s)**: `framer-video-cards-learning.png`
- **What it solves**: Presents video learning content with clear time commitments
- **Implementation guidance**:
  - Section header ("Get started") with search hint
  - 3-column card layout for featured videos
  - Each card: Thumbnail with play icon overlay
  - Title below thumbnail (bold)
  - Duration indicator ("15m", "10m", "5m")
  - Below cards: Text link list for additional resources
  - Text links have icon prefix (document icon)
  - Keyboard shortcut hint in header area

### Pattern 2: Gradient Resource Cards Grid
- **Source(s)**: `framer-gradient-cards-grid.png`
- **What it solves**: Creates visually distinct categories for learning resources
- **Implementation guidance**:
  - 2x2 grid of large cards (can expand)
  - Each card: Gradient background (blue→pink, purple→blue, etc.)
  - Card title (bold, white text)
  - Card description (smaller, white text)
  - Screenshot/preview within some cards
  - Cards are large and inviting (200-300px height)
  - Categories: "In-App Tour", "3 Hour Course", "Videos", "Examples"
  - Click navigates to that learning track

### Pattern 3: Course Category Cards Grid
- **Source(s)**: `framer-category-cards-grid.png`
- **What it solves**: Organizes courses by category with visual previews
- **Implementation guidance**:
  - 4-column grid of category cards
  - Each card: Stack of course preview images
  - Category name below (Agency, Blog, Landing Pages, Personal)
  - Subtitle describing purpose ("Sell your services", "Host your thoughts")
  - Multiple preview images stacked/overlapped per card
  - Creates visual richness showing course variety
  - Click navigates to category page
  - Responsive: 2 columns on tablet, 1 on mobile

### Pattern 4: Illustrated Table of Contents
- **Source(s)**: `userinterviews-toc-illustrated-cards.png`
- **What it solves**: Presents course/guide structure with visual appeal
- **Implementation guidance**:
  - "WHAT'S INSIDE" header with "Table of Contents" title
  - 2-column grid of section cards
  - Each card: Custom illustration + numbered badge + title
  - Introduction card without number badge
  - Sections numbered 01, 02, 03, 04, 05
  - Illustrations are relevant to topic (people doing UX research)
  - Clean, minimal card styling
  - Muted teal/green accent for badges
  - Click navigates to section

### Pattern 5: Creator Resources Grid
- **Source(s)**: `teachable-resources-icon-cards.png`
- **What it solves**: Organizes learning resources by type with clear CTAs
- **Implementation guidance**:
  - 3-column grid of resource cards
  - Each card: Icon + title + description + link
  - Green top border accent on each card
  - Resource types: Guides, Courses, Blog, Podcast, Videos, Events
  - Description explains the value proposition
  - Underlined link at bottom ("Explore now", "Learn more", etc.)
  - Clean, minimal icon style
  - Consistent card height

---

## Visual Language

### Layout
- **Hero section**: Optional intro with search/filter
- **Card grids**: 2-3 columns depending on content type
- **Video cards**: Smaller, more numerous
- **Resource cards**: Larger, fewer, more visual impact
- **Section separation**: Clear headers, generous spacing

### Typography
- **Section headers**: 24-32px, bold
- **Card titles**: 18-24px, bold, white on gradient
- **Card descriptions**: 14-16px, lighter weight
- **Duration badges**: 12-14px, subtle styling
- **Link lists**: 16px, with icon prefix

### Color & Contrast
- **Video cards**: Light background, dark text
- **Resource cards**: Gradient backgrounds (vibrant)
  - Blue → Teal gradient
  - Purple → Pink gradient
  - Orange → Red gradient
- **Text on gradients**: White
- **Play button overlay**: Semi-transparent dark with white icon

### Interaction
- **Card hover**: Subtle lift or shadow increase
- **Play button**: Appears/emphasizes on hover
- **Gradient cards**: May have subtle animation on hover
- **Progress indicators**: For courses in progress (optional)

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| `framer-video-cards-learning.png` | Framer | Video cards, duration badges, text links | P1 |
| `framer-gradient-cards-grid.png` | Framer | Gradient cards, resource categories, 2x2 grid | P1 |
| `framer-category-cards-grid.png` | Framer | Category cards, stacked previews, 4-column | P1 |
| `userinterviews-toc-illustrated-cards.png` | User Interviews | Illustrated TOC, numbered sections, 2-column | P1 |
| `teachable-resources-icon-cards.png` | Teachable | Resource cards, icon grid, CTAs | P2 |

---

## Implementation Checklist

### Video Learning Cards
- [ ] Create `VideoLearningCard` component
- [ ] Add play button overlay
- [ ] Display duration badge
- [ ] Create `VideoCardGrid` layout (3 columns)
- [ ] Style thumbnail with aspect ratio

### Resource Cards
- [ ] Create `GradientResourceCard` component
- [ ] Define gradient presets (blue, purple, orange, etc.)
- [ ] Add title + description + optional preview
- [ ] Create `ResourceCardGrid` layout (2x2)
- [ ] Implement click navigation

### Learning Hub
- [ ] Create `LearningSection` component with header
- [ ] Add search/filter hint
- [ ] Create `TextLinkList` for additional resources
- [ ] Implement "Get started" section pattern

### Progress Tracking
- [ ] Add progress indicator to cards (for enrolled users)
- [ ] Show completion status
- [ ] Display "Continue" vs "Start" CTAs

---

## Open Questions

- Should courses have prerequisite indicators?
- Do we show estimated total time for course tracks?
- How to handle course series vs standalone tutorials?
- Should there be a "My Learning" section for enrolled courses?

---

## Related Features

- **content-workbench**: Content authoring side of courses
- **ai-media-lab**: Video handling patterns shared
- **dashboard**: Progress tracking integration

---

**Design Direction Status**: Ready for implementation
