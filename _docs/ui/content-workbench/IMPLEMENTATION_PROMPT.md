# Implementation Request: Content Workbench

## Context

I need to implement the **Content Workbench** UI section for the Movemental.ai platform. This is the authoring and management hub for platform content—articles, tutorials, courses, and media. The design should feel professional, organized, and empowering, giving content creators the tools they need without overwhelming them.

---

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/content-workbench/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/content-workbench/reference-images/`
  - `framer-checklist-guidelines.png` - Checklist, best practices, guidelines
  - `framer-gallery-grid.png` - Card grid, gallery view, carousel
  - `framer-howto-tutorial.png` - Numbered steps, tutorial, screenshot
  - `framer-tutorial-video.png` - Video embed, tutorial headline
  - `framer-welcome-modal-tour.png` - Welcome modal, editor intro
  - `framer-template-selection-grid.png` - Template grid, starting points
  - `framer-help-articles-menu.png` - Help sidebar, categorized articles
  - `framer-component-insert-panel.png` - Component grid, insert panel
  - `framer-hero-template-cards.png` - Template showcase, image collage
  - `framer-template-category-grid.png` - Category grid, template organization

### Content Specification
- `_docs/site-docs/07_learning_and_enablement_hub.md` - Related content requirements

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
├── content-workbench/
│   ├── WorkbenchContainer.tsx        # Main workbench layout
│   ├── Checklist.tsx                 # Checklist/guidelines component
│   ├── ChecklistItem.tsx             # Individual checklist item
│   ├── GalleryGrid.tsx               # Card grid with carousel
│   ├── GalleryCard.tsx               # Individual gallery card
│   ├── TutorialPage.tsx              # Tutorial page layout
│   ├── NumberedSteps.tsx             # Numbered steps list
│   ├── StepItem.tsx                  # Individual step item
│   ├── ProTip.tsx                    # Pro tip callout
│   ├── VideoEmbed.tsx                # Video player with overlay
│   ├── TemplateGrid.tsx              # Template selection grid
│   ├── TemplateCard.tsx              # Template preview card
│   ├── CategoryGrid.tsx              # Category selection grid
│   ├── CategoryCard.tsx              # Category card with stacked previews
│   ├── HelpSidebar.tsx               # Help articles sidebar
│   ├── HelpSection.tsx               # Collapsible help section
│   ├── ComponentPanel.tsx            # Component insert panel
│   ├── ComponentItem.tsx             # Individual component item
│   └── index.ts                      # Barrel export
```

---

## Page Structure

```
app/
├── dashboard/
│   └── workbench/
│       ├── page.tsx                  # Workbench home
│       ├── templates/
│       │   └── page.tsx              # Template selection
│       └── tutorials/
│           └── [slug]/
│               └── page.tsx          # Individual tutorial
```

---

## Key Design Patterns to Implement

### Pattern 1: Checklist/Guidelines Component
- Bold section header ("Best practices")
- Subheadline explaining purpose
- Vertical list of checkbox items
- Can be interactive or read-only
- Used for submission requirements, quality guidelines

### Pattern 2: Gallery/Card Grid
- Section header with "View all" link
- 4-5 column card grid (responsive)
- Each card: Image preview + title + author
- Hover carousel navigation
- Dark background variant for immersive feel

### Pattern 3: How-To Tutorial with Steps
- Bold page title
- Numbered steps list (1. 2. 3. 4. 5.)
- Inline links for related resources
- Pro tip below steps (keyboard shortcuts)
- Large screenshot showing process

### Pattern 4: Tutorial Page with Video
- Bold italic headline
- Paragraph explanation
- Embedded video with play button overlay
- Video shows side-by-side comparison

### Pattern 5: Template Selection Interface
- Bold headline ("Choose your Starting Point")
- 4-column grid of template cards
- Cards with angled/stacked preview images
- Click to select and begin editing

### Pattern 6: Component Insert Panel
- Grid of insertable components
- Icon + label for each
- Categories: Layout, Media, Social
- Hover reveals description

---

## Visual Language Requirements

### Layout
- **Content area**: Centered, max-width 800-900px for tutorials
- **Gallery**: Full-width or near-full-width for card grids
- **Sidebar**: Optional for navigation in docs
- **Whitespace**: Generous padding between sections

### Typography
- **Page titles**: 32-40px, bold (sometimes italic)
- **Section headers**: 24-28px, bold
- **Step numbers**: Can match body or slightly larger
- **Body text**: 16-18px, comfortable line-height
- **Inline links**: Accent color, underlined

### Color & Contrast
- **Light mode**: White background for tutorials
- **Dark mode**: Near-black for galleries
- **Accent links**: Blue or brand accent
- **Checkbox items**: Subtle gray checkboxes

### Interaction
- **Gallery cards**: Hover reveals navigation
- **Video**: Play button overlay, standard controls
- **Checklist**: Checkboxes can be interactive or static
- **Step links**: Clickable for related docs

---

## Implementation Requirements

### 1. Checklist Component
```tsx
interface ChecklistProps {
  title: string
  description?: string
  items: ChecklistItem[]
  mode?: 'interactive' | 'readonly'
  onItemToggle?: (itemId: string, checked: boolean) => void
  className?: string
}

interface ChecklistItem {
  id: string
  label: string
  checked?: boolean
  description?: string
}
```

### 2. GalleryGrid Component
```tsx
interface GalleryGridProps {
  title: string
  viewAllHref?: string
  items: GalleryItem[]
  columns?: 3 | 4 | 5
  variant?: 'light' | 'dark'
  className?: string
}

interface GalleryItem {
  id: string
  title: string
  thumbnail: string
  author?: { name: string; avatar?: string }
  href: string
}
```

### 3. NumberedSteps Component
```tsx
interface NumberedStepsProps {
  steps: Step[]
  className?: string
}

interface Step {
  number: number
  instruction: string
  links?: { text: string; href: string }[]
}
```

### 4. VideoEmbed Component
```tsx
interface VideoEmbedProps {
  src: string
  title?: string
  caption?: string
  provider?: 'youtube' | 'vimeo' | 'self-hosted'
  aspectRatio?: '16:9' | '4:3' | '1:1'
  className?: string
}
```

---

## Responsive Design

### Mobile (<768px)
- Gallery: 2-column grid
- Templates: 1-2 columns
- Tutorial: Full-width, stacked
- Help sidebar: Drawer/overlay

### Tablet (768-1024px)
- Gallery: 3-column grid
- Templates: 2-3 columns
- Tutorial: Centered content

### Desktop (>1024px)
- Gallery: 4-5 column grid
- Templates: 4 columns
- Tutorial: Max-width with sidebar

---

## Deliverables

1. **Components**: All components listed in structure
2. **Checklist**: Interactive and readonly modes
3. **Gallery Grid**: With hover navigation
4. **Tutorial Layout**: Numbered steps + video
5. **Template Selection**: Grid with preview cards
6. **Help Sidebar**: Categorized articles
7. **Responsive**: All breakpoint variations working

---

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] Checklist component working (interactive/readonly)
- [ ] Gallery grid with hover states
- [ ] Tutorial layout with numbered steps
- [ ] Video embed with play overlay
- [ ] Template selection grid
- [ ] Help sidebar with sections
- [ ] Mobile responsive (test at 375px width)
- [ ] Tablet responsive (test at 768px width)
- [ ] Desktop responsive (test at 1280px width)
- [ ] Keyboard navigation works
- [ ] No TypeScript errors
- [ ] No linter errors

---

## Additional Context

- Content Workbench is the authoring hub—should feel empowering
- Balance discoverability with clean workspace
- Gallery dark variant creates immersive feel
- Templates help users get started quickly
- Help sidebar provides contextual assistance
- Consider lazy loading for gallery images

---

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing all reference images
3. Planning the component structure
4. Implementing `Checklist` first (most foundational)
5. Building `GalleryGrid` with cards
6. Adding `TutorialPage` layout with steps
7. Implementing `TemplateGrid` selection
8. Testing thoroughly at all breakpoints
