# Legal & Support Documentation - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 5

---

## Design Vision

Legal and support documentation should be **easy to navigate, easy to read, and trustworthy**. Users visiting these pages often have specific questions or concerns—they need to find answers quickly without wading through dense text. The design prioritizes clear hierarchy, scannable structure, and professional presentation that reinforces platform credibility.

The Framer reference shows a classic documentation pattern: sidebar navigation for wayfinding, clean content area with proper typographic hierarchy, and inline links for related content. This pattern has become an industry standard for good reason—it works.

---

## Key Patterns Identified

### Pattern 1: Sidebar Navigation + Content Layout
- **Source(s)**: `framer-docs-sidebar-layout.png`
- **What it solves**: Allows users to navigate between related documents while reading
- **Implementation guidance**:
  - **Left sidebar**: Fixed position, contains navigation links
  - **Content area**: Main reading area, max-width for readability
  - Navigation links grouped by category (Terms, Privacy, Policies, etc.)
  - Active link highlighted
  - Sidebar collapses to hamburger menu on mobile
  - Optional: On-page table of contents (right sidebar) for long documents

**Sidebar structure example**:
```
Terms of Service
Terms of Service Update
Privacy Statement
Sub-Processors
Cookie Policy
Security
```

### Pattern 2: Documentation Typography
- **Source(s)**: `framer-docs-sidebar-layout.png`
- **What it solves**: Makes dense legal/technical content readable
- **Implementation guidance**:
  - **Page title**: Large, bold, italic for distinction (48-56px)
  - **Section headers (H2)**: Bold, clear hierarchy (24-32px)
  - **Subsection headers (H3)**: Semibold (18-20px)
  - **Body text**: 16-18px, comfortable line-height (1.6-1.8)
  - **Inline links**: Blue/accent color, clear affordance
  - **Lists**: Proper indentation, consistent bullet/number styling
  - **Callout boxes**: For important notices (bordered, light background)

### Pattern 3: Integrations/Plugins Documentation
- **Source(s)**: `framer-docs-integrations.png`
- **What it solves**: Documents integrations with clear sidebar navigation
- **Implementation guidance**:
  - Left sidebar with integration/plugin list
  - Sidebar items: Simple text links grouped by category
  - Main content: Bold title, subtitle/description, "Overview" section
  - Body paragraphs with inline links
  - Preview/demo area (light background box)
  - Integration-specific icons or logos optional
  - Categories: Formspark, Google Optimize, Hubspot, Intercom, etc.

### Pattern 4: Help Articles Menu
- **Source(s)**: `framer-help-articles-menu.png`
- **What it solves**: Organizes help/support content by category
- **Implementation guidance**:
  - Sidebar menu structure
  - "Get Started" section: How to use templates, Importing, Publishing, etc.
  - "Effects" section: Sticky Scroll, Scroll Effects, Overlays
  - "Elements" section: Video Component, Text Styles, Links
  - "Hosting" section: Versions, Rollback, Pre-rendering
  - Simple text list format
  - Category headers with expandable items
  - Links to individual help articles

### Pattern 5: Creator Resources Icon Grid
- **Source(s)**: `teachable-resources-icon-cards.png`
- **What it solves**: Organizes help resources by type with visual hierarchy
- **Implementation guidance**:
  - 3-column grid of resource cards
  - Each card: Icon + title + description + action link
  - Green/accent top border on each card
  - Resource types: Guides & how-tos, Courses (teachable:u), Blog, Podcast, Videos, Events
  - Description explains what user will find
  - Underlined action link at bottom ("Explore now", "Learn more", "Watch videos", etc.)
  - Clean, outlined icon style
  - Consistent card sizing

### Pattern 6: Developer Documentation Resource Grid
- **Source(s)**: `workos-docs-resource-grid.png`
- **What it solves**: Organizes technical/developer documentation by topic
- **Implementation guidance**:
  - Section headers: "Events and webhooks", "Resources"
  - 3-column card grid
  - Each card: Line icon + title + brief description
  - Documentation topics: Event types, Data syncing, Observability, API reference, Integrations, Migrate to..., SDKs, Email delivery, Dashboard, Glossary, Custom domains, Changelog
  - Light gradient background (purple/gray)
  - Minimal, technical styling
  - External link indicator on some cards
  - Search bar in header
  - Navigation: API reference, Feedback, Dashboard links

---

## Visual Language

### Layout
- **Two-column**: Sidebar (200-250px) + content area
- **Content max-width**: 700-800px for readability
- **Generous whitespace**: 40-60px between major sections
- **Mobile**: Sidebar becomes drawer/overlay

### Typography
- **Page title**: 48-56px, bold italic (distinctive style)
- **H2 (sections)**: 24-32px, bold
- **H3 (subsections)**: 18-20px, semibold
- **Body**: 16-18px, regular, #333 or darker
- **Links**: Accent blue, underline on hover
- **Line-height**: 1.6-1.8 for body text

### Color & Contrast
- **Background**: White
- **Sidebar background**: Same as content or very light gray
- **Active nav item**: Subtle background or left border accent
- **Text**: Near-black for body, medium gray for less important info
- **Links**: Consistent accent color (blue)

### Interaction
- **Sidebar links**: Hover highlight, active state indicator
- **Smooth scroll**: When clicking on-page anchor links
- **Mobile nav**: Slide-in drawer with overlay
- **Print styles**: Clean, sidebar hidden

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| `framer-docs-sidebar-layout.png` | Framer | Sidebar navigation, documentation typography, inline links | P1 |
| `framer-docs-integrations.png` | Framer | Integrations sidebar, plugin documentation, overview sections | P2 |
| `framer-help-articles-menu.png` | Framer | Help menu, categorized articles, expandable sections | P2 |
| `teachable-resources-icon-cards.png` | Teachable | Resource icon grid, help categories, action links | P1 |
| `workos-docs-resource-grid.png` | WorkOS | Developer docs grid, technical resources, icon cards | P2 |

---

## Implementation Checklist

- [ ] Create `DocsLayout` component with sidebar + content slots
- [ ] Create `DocsSidebar` component with navigation links
- [ ] Implement active link highlighting
- [ ] Create responsive sidebar (collapse on mobile)
- [ ] Define typography styles for docs (title, H2, H3, body, links)
- [ ] Create `Callout` component for important notices
- [ ] Add smooth scroll for anchor links
- [ ] Create on-page TOC component (optional, for long docs)
- [ ] Implement print stylesheet
- [ ] Add last-updated timestamp to documents

---

## Open Questions

- Do we need a search function within docs?
- Should we use MDX for content authoring?
- How do we handle versioning of legal documents?
- Is there a feedback mechanism ("Was this helpful?")?
- Do we need multi-language support for legal content?
