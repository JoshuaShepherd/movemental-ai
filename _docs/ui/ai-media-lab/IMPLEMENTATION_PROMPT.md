# Implementation Request: AI Media Lab

## Context

I need to implement the **AI Media Lab** UI section for the Movemental.ai platform. This is where users create, enhance, and manage media content with AI assistance—video, audio, and animations. The design should feel creative, capable, and inspiring, showcasing media prominently while providing clear tools and navigation.

---

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/ai-media-lab/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/ai-media-lab/reference-images/`
  - `framer-video-embed-tabs.png` - Video embed, category tabs, gradient background
  - `framer-video-tutorials-sidebar.png` - Tutorial sidebar, video list, durations
  - `framer-component-insert-panel.png` - Component grid, media inserts, icons

### Implementation Context
- `_docs/ai-vision/05_implementation-checklist.md` - Overall implementation checklist

---

## Tech Stack Requirements

Implement using the established Movemental stack:
- **Next.js 15** with App Router
- **TypeScript** with strict mode
- **shadcn/ui** components (do NOT modify `components/ui/`)
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

---

## Component Structure

```
components/
├── ai-media-lab/
│   ├── MediaLabContainer.tsx         # Main media lab layout
│   ├── VideoPlayer.tsx               # Video player with controls
│   ├── VideoHero.tsx                 # Large video with gradient background
│   ├── CategoryTabs.tsx              # Category navigation tabs
│   ├── CategoryTabItem.tsx           # Individual tab item
│   ├── MediaGrid.tsx                 # Grid of media items
│   ├── MediaCard.tsx                 # Individual media item card
│   ├── TutorialSidebar.tsx           # Tutorial video sidebar
│   ├── TutorialItem.tsx              # Sidebar tutorial item
│   ├── ComponentPanel.tsx            # Component insert panel
│   ├── ComponentItem.tsx             # Individual component item
│   ├── VideoActions.tsx              # Watch Later, Share buttons
│   ├── IntegrationBadge.tsx          # Integration badges (YouTube, etc.)
│   └── index.ts                      # Barrel export
```

---

## Page Structure

```
app/
├── dashboard/
│   └── media-lab/
│       ├── page.tsx                  # Media lab home
│       └── [category]/
│           └── page.tsx              # Category view
```

---

## Key Design Patterns to Implement

### Pattern 1: Video Embed with Category Tabs
- Large video player as hero element
- Gradient background section (pink/coral tones)
- Video with standard controls (play/pause, seek, fullscreen)
- "Watch Later" and "Share" actions
- Description text below video
- Category navigation tabs: "Forms", "Video & Animation", "Audio", "Social", "Shop", "Utilities"
- Integration badges (YouTube logo, etc.)

### Pattern 2: Video Tutorials Sidebar
- Sidebar with search at top
- "Video Tutorials" section highlighted
- Thumbnail + title + duration for each video
- Help Articles section
- Component categories below (Layout, Navigation, etc.)
- Collapsible section design

### Pattern 3: Component Insert Panel
- Grid of insertable components
- Media section: Image, Video, Carousel, Ticker
- Slideshow, YouTube embed options
- Icon + label for each component
- Hover for description

---

## Visual Language Requirements

### Layout
- **Video hero**: Large, centered, prominent
- **Category tabs**: Horizontal, centered below video
- **Content area**: Adjusts based on selected category
- **Gradient backgrounds**: For visual interest and section separation

### Typography
- **Video title**: In player or below
- **Description**: 16-18px, below video
- **Tab labels**: 14-16px, clear, clickable
- **Integration callouts**: Smaller, with brand logos

### Color & Contrast
- **Video section**: Gradient background (pink, coral, purple)
- **Video player**: Dark with white text/controls
- **Tabs**: Neutral on light background
- **Active tab**: Underline or bold indicator

### Interaction
- **Video controls**: Standard play/pause, seek, volume, fullscreen
- **Tab switching**: Instant content change
- **Watch Later**: Saves to user's list
- **Share**: Opens share options

---

## Implementation Requirements

### 1. VideoPlayer Component
```tsx
interface VideoPlayerProps {
  src: string
  title?: string
  poster?: string
  provider?: 'youtube' | 'vimeo' | 'self-hosted'
  autoPlay?: boolean
  showActions?: boolean
  onWatchLater?: () => void
  onShare?: () => void
  className?: string
}
```

### 2. CategoryTabs Component
```tsx
interface CategoryTabsProps {
  categories: Category[]
  activeCategory: string
  onCategoryChange: (categoryId: string) => void
  className?: string
}

interface Category {
  id: string
  label: string
  icon?: LucideIcon
  badge?: string
}
```

### 3. TutorialSidebar Component
```tsx
interface TutorialSidebarProps {
  tutorials: Tutorial[]
  sections: SidebarSection[]
  onTutorialSelect: (tutorialId: string) => void
  onSearch?: (query: string) => void
  className?: string
}

interface Tutorial {
  id: string
  title: string
  thumbnail: string
  duration: string
  isWatched?: boolean
}

interface SidebarSection {
  title: string
  items: { label: string; href: string }[]
  isCollapsible?: boolean
}
```

### 4. VideoHero Component
```tsx
interface VideoHeroProps {
  video: VideoPlayerProps
  description?: string
  gradient?: 'pink-coral' | 'purple-blue' | 'orange-red'
  integrations?: { name: string; logo: string }[]
  className?: string
}
```

---

## Responsive Design

### Mobile (<768px)
- Video: Full-width
- Tabs: Horizontal scroll
- Sidebar: Drawer/overlay
- Component panel: Grid simplified

### Tablet (768-1024px)
- Video: Centered with padding
- Tabs: All visible
- Sidebar: Collapsible

### Desktop (>1024px)
- Full layout with sidebar
- Video hero prominent
- Component panel: Full grid

---

## Deliverables

1. **Components**: All components listed in structure
2. **Video Player**: With standard controls and actions
3. **Video Hero**: Gradient background section
4. **Category Tabs**: Navigation between media types
5. **Tutorial Sidebar**: Video list with search
6. **Component Panel**: Insert panel for media types
7. **Responsive**: All breakpoint variations working

---

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] Video player with controls working
- [ ] Video hero with gradient background
- [ ] Category tabs with active state
- [ ] Tutorial sidebar with search
- [ ] Component panel grid
- [ ] Watch Later and Share actions
- [ ] Mobile responsive (test at 375px width)
- [ ] Tablet responsive (test at 768px width)
- [ ] Desktop responsive (test at 1280px width)
- [ ] Keyboard navigation works
- [ ] No TypeScript errors
- [ ] No linter errors

---

## Additional Context

- AI Media Lab is for creative media work
- Should feel inspiring and capable
- Video is the primary content type initially
- AI features (enhancement, transcription) are future
- Component panel helps users insert media quickly
- Tutorial sidebar provides contextual help

---

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing all three reference images
3. Planning the component structure
4. Implementing `VideoPlayer` first (core component)
5. Building `VideoHero` with gradient background
6. Adding `CategoryTabs` navigation
7. Implementing `TutorialSidebar` 
8. Testing thoroughly at all breakpoints
