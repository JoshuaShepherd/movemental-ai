# Implementation Request: Course Enrollment

## Context

I need to implement the **Course Enrollment** UI section for the Movemental.ai platform. This is where users discover and start learning content—courses, tutorials, and educational resources. The design should make discovering and starting learning content feel inviting and organized.

---

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/course-enrollment/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/course-enrollment/reference-images/`
  - `framer-video-cards-learning.png` - Video cards, duration badges, text links
  - `framer-gradient-cards-grid.png` - Gradient cards, resource categories
  - `framer-category-cards-grid.png` - Category cards, stacked previews

### Content Specification
- `_docs/site-docs/07_learning_and_enablement_hub.md` - Content requirements and copy

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
├── course-enrollment/
│   ├── LearningHubContainer.tsx      # Main learning hub layout
│   ├── LearningSection.tsx           # Section with header and content
│   ├── VideoLearningCard.tsx         # Video card with duration
│   ├── VideoCardGrid.tsx             # Grid layout for video cards
│   ├── GradientResourceCard.tsx      # Large gradient resource card
│   ├── ResourceCardGrid.tsx          # 2x2 resource card grid
│   ├── CategoryCard.tsx              # Category with stacked previews
│   ├── CategoryGrid.tsx              # Category selection grid
│   ├── DurationBadge.tsx             # Duration indicator badge
│   ├── PlayOverlay.tsx               # Video play button overlay
│   ├── TextLinkList.tsx              # Additional resource links
│   ├── ProgressIndicator.tsx         # Course progress display
│   └── index.ts                      # Barrel export
```

---

## Page Structure

```
app/
├── (public)/
│   └── learn/
│       ├── page.tsx                  # Learning hub home
│       └── [category]/
│           └── page.tsx              # Category page
├── dashboard/
│   └── courses/
│       ├── page.tsx                  # My courses
│       └── [courseId]/
│           └── page.tsx              # Individual course
```

---

## Key Design Patterns to Implement

### Pattern 1: Video Learning Cards with Duration
- Section header ("Get started") with search hint
- 3-column card layout for featured videos
- Each card: Thumbnail with play icon overlay
- Title below thumbnail (bold)
- Duration indicator ("15m", "10m", "5m")
- Text link list below for additional resources

### Pattern 2: Gradient Resource Cards Grid
- 2x2 grid of large cards
- Each card: Gradient background (blue→pink, purple→blue)
- Title (bold, white) + description (smaller, white)
- Screenshot/preview within some cards
- Categories: "In-App Tour", "3 Hour Course", "Videos", "Examples"

### Pattern 3: Course Category Cards Grid
- 4-column grid of category cards
- Each card: Stack of course preview images
- Category name below (Agency, Blog, Landing Pages)
- Subtitle describing purpose
- Multiple preview images stacked/overlapped

---

## Visual Language Requirements

### Layout
- **Hero section**: Optional intro with search/filter
- **Card grids**: 2-3 columns depending on content type
- **Video cards**: Smaller, more numerous
- **Resource cards**: Larger, fewer, more impact
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
- **Gradient cards**: Subtle animation on hover
- **Progress indicators**: For enrolled courses

---

## Implementation Requirements

### 1. VideoLearningCard Component
```tsx
interface VideoLearningCardProps {
  title: string
  thumbnail: string
  duration: string // "15m", "1h 30m"
  href: string
  isWatched?: boolean
  progress?: number // 0-100
  className?: string
}
```

### 2. GradientResourceCard Component
```tsx
interface GradientResourceCardProps {
  title: string
  description: string
  gradient: 'blue-teal' | 'purple-pink' | 'orange-red' | 'blue-purple'
  preview?: string // Screenshot URL
  href: string
  className?: string
}
```

### 3. CategoryCard Component
```tsx
interface CategoryCardProps {
  title: string
  subtitle: string
  previews: string[] // Array of preview image URLs (stacked)
  href: string
  className?: string
}
```

### 4. LearningSection Component
```tsx
interface LearningSectionProps {
  title: string
  searchHint?: string
  viewAllHref?: string
  children: React.ReactNode
  className?: string
}
```

---

## Responsive Design

### Mobile (<768px)
- Video cards: 2-column grid
- Resource cards: Single column
- Category cards: 2-column grid
- Full-width sections

### Tablet (768-1024px)
- Video cards: 2-3 columns
- Resource cards: 2x2 grid
- Category cards: 2-3 columns

### Desktop (>1024px)
- Video cards: 3 columns
- Resource cards: 2x2 grid
- Category cards: 4 columns

---

## Deliverables

1. **Components**: All components listed in structure
2. **Video Learning Cards**: With duration badges and play overlay
3. **Gradient Resource Cards**: With preset gradients
4. **Category Cards**: With stacked preview images
5. **Learning Sections**: With headers and search hints
6. **Progress Tracking**: For enrolled users (optional)
7. **Responsive**: All breakpoint variations working

---

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] Video cards with thumbnails and duration badges
- [ ] Play overlay on video cards
- [ ] Gradient resource cards with proper gradients
- [ ] Category cards with stacked previews
- [ ] Section headers with "View all" links
- [ ] Mobile responsive (test at 375px width)
- [ ] Tablet responsive (test at 768px width)
- [ ] Desktop responsive (test at 1280px width)
- [ ] Keyboard navigation works
- [ ] No TypeScript errors
- [ ] No linter errors

---

## Additional Context

- Course enrollment is about discovery and starting
- Make learning content feel approachable yet substantive
- Duration badges help users estimate time commitment
- Gradient cards create premium, organized feel
- Progress indicators show where user left off
- Consider "My Learning" section for enrolled courses

---

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing all three reference images
3. Planning the component structure
4. Implementing `VideoLearningCard` first (most common)
5. Building `VideoCardGrid` layout
6. Adding `GradientResourceCard` with gradients
7. Implementing `CategoryCard` with stacked previews
8. Testing thoroughly at all breakpoints
