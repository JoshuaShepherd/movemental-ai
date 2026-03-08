# Content Workbench - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 13

---

## Design Vision

The Content Workbench is the authoring and management hub for platform content—articles, tutorials, courses, and media. The design should feel **professional, organized, and empowering**, giving content creators the tools they need without overwhelming them. The interface balances discoverability of features with a clean workspace that lets content shine.

The Framer references show patterns for content guidelines (checklists), gallery views, how-to tutorials with numbered steps, and video-embedded tutorial pages. These patterns support both creating content and learning how to use the platform effectively.

---

## Key Patterns Identified

### Pattern 1: Checklist/Guidelines Component
- **Source(s)**: `framer-checklist-guidelines.png`
- **What it solves**: Provides clear requirements or best practices for content creators
- **Implementation guidance**:
  - Bold section header ("Best practices")
  - Subheadline explaining purpose
  - Vertical list of checkbox items
  - Each item: checkbox + description text
  - Clean, minimal styling—focus on content
  - Can be used for submission requirements, quality guidelines, or onboarding checklists

### Pattern 2: Gallery/Card Grid
- **Source(s)**: `framer-gallery-grid.png`
- **What it solves**: Displays content library, templates, or user work in browsable format
- **Implementation guidance**:
  - Section header with "View all" link
  - 4-5 column card grid (responsive)
  - Each card: Image preview + title + author/creator
  - Cards have consistent aspect ratio
  - Hover carousel navigation (arrow buttons)
  - Dark background for immersive gallery feel
  - Author avatar badge on cards

### Pattern 3: How-To Tutorial with Steps
- **Source(s)**: `framer-howto-tutorial.png`
- **What it solves**: Guides users through multi-step processes with clarity
- **Implementation guidance**:
  - Bold page title ("How to Paste")
  - Numbered steps list (1. 2. 3. 4. 5.)
  - Each step: number + instruction text
  - Inline links for related resources
  - Pro tip below steps (keyboard shortcuts, etc.)
  - Large screenshot below showing the process
  - Clean, scannable layout

### Pattern 4: Tutorial Page with Video
- **Source(s)**: `framer-tutorial-video.png`
- **What it solves**: Combines text explanation with video demonstration
- **Implementation guidance**:
  - Bold italic headline
  - Paragraph explanation below headline
  - Embedded video with play button overlay
  - Video shows side-by-side comparison (before/after)
  - Generous whitespace around video
  - Video caption optional

### Pattern 5: Welcome Modal Overlay
- **Source(s)**: `framer-welcome-modal-tour.png`
- **What it solves**: Introduces content workbench features to new users
- **Implementation guidance**:
  - Modal overlay showing editor interface behind
  - Product preview image in modal
  - Bold headline with welcome message
  - Description of capabilities
  - "Take the Tour" CTA button
  - Dismiss option
  - Shows actual editor in background for context

### Pattern 6: Template Selection Interface
- **Source(s)**: `framer-template-selection-grid.png`
- **What it solves**: Helps content creators choose starting templates
- **Implementation guidance**:
  - Bold headline ("Choose your Starting Point")
  - Description text for customization
  - 4-column grid of template cards
  - Cards with angled/stacked preview images
  - Template name + type below each
  - Click to select and begin editing

### Pattern 7: Help Articles Navigation
- **Source(s)**: `framer-help-articles-menu.png`
- **What it solves**: Organizes help content within editor sidebar
- **Implementation guidance**:
  - Sidebar menu with categorized sections
  - "Get Started" section with basics
  - "Effects" section (Sticky Scroll, Overlays, 3D)
  - "Elements" section (Video, Text Styles, Links)
  - "Hosting" section (Versions, Rollback)
  - Simple text list with category headers
  - Expandable sections

### Pattern 8: Component Insert Panel
- **Source(s)**: `framer-component-insert-panel.png`
- **What it solves**: Provides quick access to insertable components
- **Implementation guidance**:
  - Grid layout of component options
  - Each item: Icon + label
  - Categories: Layout (Rows, Columns, Grid)
  - Media (Image, Video, Carousel)
  - Social (YouTube, Button)
  - Consistent icon styling
  - Hover reveals description

### Pattern 9: Hero with Template Cards
- **Source(s)**: `framer-hero-template-cards.png`
- **What it solves**: Showcases template library with visual appeal
- **Implementation guidance**:
  - Top image collage of example sites
  - Bold gradient headline
  - "Browse templates" CTA
  - Below: Template preview cards
  - Cards with stacked screenshots
  - Category labels and descriptions

### Pattern 10: Template Category Grid
- **Source(s)**: `framer-template-category-grid.png`
- **What it solves**: Organizes templates by purpose/use case
- **Implementation guidance**:
  - 4-column grid of category cards
  - Each card: Stacked preview images
  - Category name below (Agency, Blog, etc.)
  - Subtitle describing purpose
  - Cards show multiple template previews stacked
  - Click navigates to category

### Pattern 11: Illustrated Table of Contents
- **Source(s)**: `userinterviews-toc-illustrated-cards.png`
- **What it solves**: Presents guide/content structure with custom illustrations
- **Implementation guidance**:
  - "WHAT'S INSIDE" small header
  - "Table of Contents" main title
  - 2-column card grid
  - Each card: Custom illustration (people doing activities)
  - Numbered badge (01, 02, 03, etc.) on illustration
  - Section title below illustration
  - Introduction card without number
  - Teal/green accent color for badges
  - Clean, friendly illustration style
  - Click navigates to section

### Pattern 12: Content Dashboard Card Grid
- **Source(s)**: `gamma-content-card-grid.png`
- **What it solves**: Displays content library with rich metadata
- **Implementation guidance**:
  - Card grid (4-5 columns)
  - Each card: Preview thumbnail with title overlay
  - Site/shared badges
  - Author attribution with avatar
  - Last viewed timestamp
  - Pin/favorite indicators
  - Filter tabs: All, Recently viewed, Created by you, Favorites
  - Hover states for interaction
  - Support for different content types (presentations, documents)

### Pattern 13: App/Tool Marketplace Grid
- **Source(s)**: `gorgias-app-store-categories.png`
- **What it solves**: Organizes available tools and integrations by category
- **Implementation guidance**:
  - Category sidebar for filtering
  - Card grid organized by category
  - Featured section at top
  - Each card: App icon, name, brief description
  - "View All →" links per category
  - Search functionality
  - Categories: Featured, specific use cases (Chat, Phone, SMS, etc.)

---

## Visual Language

### Layout
- **Content area**: Centered, max-width 800-900px for tutorials
- **Gallery**: Full-width or near-full-width for card grids
- **Sidebar**: Optional for navigation in docs/tutorials
- **Whitespace**: Generous padding between sections

### Typography
- **Page titles**: 32-40px, bold (sometimes italic for tutorials)
- **Section headers**: 24-28px, bold
- **Step numbers**: Can match body text or be slightly larger
- **Body text**: 16-18px, comfortable line-height
- **Inline links**: Accent color, underlined

### Color & Contrast
- **Light mode**: White background for tutorials/docs
- **Dark mode**: Near-black for galleries and immersive views
- **Accent links**: Blue or brand accent color
- **Checkbox items**: Subtle gray checkboxes, clear text

### Interaction
- **Gallery cards**: Hover reveals additional info or navigation
- **Video**: Play button overlay, standard video controls
- **Checklist**: Checkboxes can be interactive or static
- **Step links**: Clickable for related documentation

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| `framer-checklist-guidelines.png` | Framer | Checklist, best practices, guidelines | P1 |
| `framer-gallery-grid.png` | Framer | Card grid, gallery view, carousel | P1 |
| `framer-howto-tutorial.png` | Framer | Numbered steps, tutorial, screenshot | P1 |
| `framer-tutorial-video.png` | Framer | Video embed, tutorial headline, explanation | P2 |
| `framer-welcome-modal-tour.png` | Framer | Welcome modal, editor intro, app tour | P2 |
| `framer-template-selection-grid.png` | Framer | Template grid, starting points, 4-column | P1 |
| `framer-help-articles-menu.png` | Framer | Help sidebar, categorized articles | P2 |
| `framer-component-insert-panel.png` | Framer | Component grid, insert panel, icons | P1 |
| `framer-hero-template-cards.png` | Framer | Template showcase, image collage, cards | P2 |
| `framer-template-category-grid.png` | Framer | Category grid, template organization | P1 |
| `userinterviews-toc-illustrated-cards.png` | User Interviews | Illustrated TOC, numbered sections, custom illustrations | P2 |
| `gamma-content-card-grid.png` | Gamma | Content cards, dashboard grid, metadata display | P1 |
| `gorgias-app-store-categories.png` | Gorgias | Tool marketplace, category grid, app cards | P2 |

---

## Implementation Checklist

### Checklist/Guidelines
- [ ] Create `Checklist` component with items array
- [ ] Create `ChecklistItem` component (checkbox + text)
- [ ] Style for both interactive and read-only modes
- [ ] Support for section headers within checklists

### Gallery View
- [ ] Create `GalleryGrid` component with responsive columns
- [ ] Create `GalleryCard` component (image, title, author)
- [ ] Add hover states and navigation arrows
- [ ] Implement "View all" link pattern
- [ ] Support dark background variant

### Tutorial Pages
- [ ] Create `TutorialPage` layout component
- [ ] Create `NumberedSteps` component
- [ ] Create `StepItem` component with inline link support
- [ ] Create `ProTip` component for keyboard shortcuts
- [ ] Style screenshots with proper framing

### Video Integration
- [ ] Create `VideoEmbed` component with play overlay
- [ ] Support YouTube, Vimeo, and self-hosted
- [ ] Add video caption component
- [ ] Implement responsive video sizing

---

## Open Questions

- Should galleries support filtering/search?
- Do tutorials need a sidebar table of contents?
- How to handle multi-page tutorial series?
- Should checklists save progress for logged-in users?

---

## Related Features

- **ai-book-reading**: Similar typography patterns for content
- **course-enrollment**: Tutorial patterns overlap with course content
- **ai-media-lab**: Video handling patterns shared

---

**Design Direction Status**: Ready for implementation
