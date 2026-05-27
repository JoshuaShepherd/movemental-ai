# Implementation Request: Legal & Support Documentation

## Context

I need to implement the **Legal & Support Documentation** UI section for the Movemental.ai platform. This includes legal pages (Terms, Privacy, etc.) and help/support documentation. The design should be easy to navigate, easy to read, and trustworthy—users visiting these pages often have specific questions and need to find answers quickly.

---

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/legal-support/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/legal-support/reference-images/`
  - `framer-docs-sidebar-layout.png` - Sidebar navigation, documentation typography
  - `framer-docs-integrations.png` - Integrations sidebar, plugin documentation
  - `framer-help-articles-menu.png` - Help menu, categorized articles

### Implementation Context
- `_docs/ai-vision/05_implementation-checklist.md` - Overall implementation checklist

---

## Tech Stack Requirements

Implement using the established Movemental stack:
- **Next.js 15** with App Router
- **TypeScript** with strict mode
- **shadcn/ui** components (do NOT modify `components/ui/`)
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **MDX** (optional) for content authoring

---

## Component Structure

```
components/
├── legal-support/
│   ├── DocsLayout.tsx                # Main docs layout with sidebar
│   ├── DocsSidebar.tsx               # Left navigation sidebar
│   ├── DocsNavSection.tsx            # Navigation section with items
│   ├── DocsNavItem.tsx               # Individual nav item
│   ├── DocsContent.tsx               # Main content area
│   ├── DocsHeader.tsx                # Page header with title
│   ├── DocsParagraph.tsx             # Styled paragraph
│   ├── DocsHeading.tsx               # Section headings (H2, H3)
│   ├── DocsList.tsx                  # Bullet/numbered lists
│   ├── DocsCallout.tsx               # Important notice callout
│   ├── DocsLink.tsx                  # Inline link styling
│   ├── TableOfContents.tsx           # On-page TOC (optional)
│   ├── LastUpdated.tsx               # Last updated timestamp
│   ├── HelpSearch.tsx                # Help search component
│   └── index.ts                      # Barrel export
```

---

## Page Structure

```
app/
├── (public)/
│   ├── legal/
│   │   ├── layout.tsx                # Legal pages layout
│   │   ├── terms/
│   │   │   └── page.tsx              # Terms of Service
│   │   ├── privacy/
│   │   │   └── page.tsx              # Privacy Policy
│   │   ├── cookies/
│   │   │   └── page.tsx              # Cookie Policy
│   │   └── security/
│   │       └── page.tsx              # Security page
│   └── help/
│       ├── layout.tsx                # Help center layout
│       ├── page.tsx                  # Help center home
│       └── [category]/
│           └── [article]/
│               └── page.tsx          # Individual help article
```

---

## Key Design Patterns to Implement

### Pattern 1: Sidebar Navigation + Content Layout
- **Left sidebar**: Fixed position, navigation links
- **Content area**: Main reading area, max-width for readability
- Navigation grouped by category (Terms, Privacy, Policies)
- Active link highlighted
- Sidebar collapses on mobile

**Sidebar structure**:
```
Terms of Service
Terms of Service Update
Privacy Statement
Sub-Processors
Cookie Policy
Security
```

### Pattern 2: Documentation Typography
- **Page title**: Large, bold, italic (48-56px)
- **Section headers (H2)**: Bold, clear hierarchy (24-32px)
- **Subsection headers (H3)**: Semibold (18-20px)
- **Body text**: 16-18px, comfortable line-height (1.6-1.8)
- **Inline links**: Blue/accent, clear affordance
- **Lists**: Proper indentation, consistent styling
- **Callout boxes**: For important notices

### Pattern 3: Help Articles Menu
- Sidebar menu with categories
- "Get Started", "Effects", "Elements", "Hosting" sections
- Simple text list format
- Expandable items within categories

---

## Visual Language Requirements

### Layout
- **Two-column**: Sidebar (200-250px) + content area
- **Content max-width**: 700-800px for readability
- **Generous whitespace**: 40-60px between major sections
- **Mobile**: Sidebar becomes drawer/overlay

### Typography
- **Page title**: 48-56px, bold italic
- **H2 (sections)**: 24-32px, bold
- **H3 (subsections)**: 18-20px, semibold
- **Body**: 16-18px, regular, #333 or darker
- **Links**: Accent blue, underline on hover
- **Line-height**: 1.6-1.8 for body text

### Color & Contrast
- **Background**: White
- **Sidebar background**: Same or very light gray
- **Active nav item**: Subtle background or left border
- **Text**: Near-black for body, medium gray for less important
- **Links**: Consistent accent color (blue)

### Interaction
- **Sidebar links**: Hover highlight, active indicator
- **Smooth scroll**: For on-page anchor links
- **Mobile nav**: Slide-in drawer with overlay
- **Print styles**: Clean, sidebar hidden

---

## Implementation Requirements

### 1. DocsLayout Component
```tsx
interface DocsLayoutProps {
  children: React.ReactNode
  sidebar: React.ReactNode
  title?: string
  description?: string
  className?: string
}
```

### 2. DocsSidebar Component
```tsx
interface DocsSidebarProps {
  sections: DocsSection[]
  activeHref: string
  onNavigate?: (href: string) => void
  className?: string
}

interface DocsSection {
  title: string
  items: { label: string; href: string }[]
}
```

### 3. DocsCallout Component
```tsx
interface DocsCalloutProps {
  type: 'info' | 'warning' | 'important' | 'tip'
  title?: string
  children: React.ReactNode
  className?: string
}
```

### 4. TableOfContents Component
```tsx
interface TableOfContentsProps {
  headings: { id: string; text: string; level: 2 | 3 }[]
  activeId?: string
  className?: string
}
```

---

## Responsive Design

### Mobile (<768px)
- Sidebar: Drawer/hamburger menu
- Content: Full-width with padding
- Typography: Slightly smaller scale
- TOC: Hidden or collapsible

### Tablet (768-1024px)
- Sidebar: Collapsible or mini
- Content: Centered, narrower
- Typography: Standard scale

### Desktop (>1024px)
- Full two-column layout
- Optional right sidebar for TOC
- Full typography scale

---

## Deliverables

1. **Components**: All components listed in structure
2. **Legal Pages**: Terms, Privacy, Cookies, Security
3. **Help Center**: Home and article pages
4. **Sidebar Navigation**: With active states
5. **Typography Components**: Headers, paragraphs, lists
6. **Callout Component**: For important notices
7. **Mobile Navigation**: Drawer for sidebar
8. **Responsive**: All breakpoint variations working

---

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] Sidebar navigation with grouped sections
- [ ] Active navigation item highlighting
- [ ] Typography hierarchy clear
- [ ] Comfortable reading width
- [ ] Callout boxes for important notices
- [ ] Mobile sidebar drawer working
- [ ] Smooth scroll for anchors
- [ ] Mobile responsive (test at 375px width)
- [ ] Tablet responsive (test at 768px width)
- [ ] Desktop responsive (test at 1280px width)
- [ ] Keyboard navigation works
- [ ] Print styles clean
- [ ] No TypeScript errors
- [ ] No linter errors

---

## Additional Context

- Legal pages need to be trustworthy and easy to read
- Users often have specific questions—make navigation clear
- Consider search functionality within docs
- Last updated timestamps build trust
- May use MDX for content authoring
- Consider versioning for legal document updates
- Feedback mechanism ("Was this helpful?") is nice-to-have

---

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing all three reference images
3. Planning the component structure
4. Implementing `DocsLayout` first (foundational)
5. Building `DocsSidebar` with navigation
6. Adding typography components
7. Implementing `DocsCallout` for notices
8. Testing thoroughly at all breakpoints
