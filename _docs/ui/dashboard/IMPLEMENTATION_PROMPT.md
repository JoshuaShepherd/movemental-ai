# Implementation Request: Dashboard

## Context

I need to implement the **Dashboard** UI section for the Movemental.ai platform. This is the user's home base after login—where they manage content, navigate the platform, and understand their current state and next actions. The design should feel organized, productive, and welcoming.

---

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/dashboard/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/dashboard/reference-images/`
  - `framer-settings-sidebar.png` - Settings sidebar, grouped navigation, active states
  - `framer-dashboard-nudge-popup.png` - Nudge popup, feature discovery, dual-action

### Implementation Context
- `_docs/ai-vision/05_implementation-checklist.md` - Overall implementation checklist
- `_docs/ai-vision/04_ui-ux-proposal.md` - UI/UX proposal details

---

## Tech Stack Requirements

Implement using the established Movemental stack:
- **Next.js 15** with App Router
- **TypeScript** with strict mode
- **shadcn/ui** components (do NOT modify `components/ui/`)
- **Tailwind CSS** for styling
- **Framer Motion** for animations (optional)
- **Lucide React** for icons

---

## Component Structure

```
components/
├── dashboard/
│   ├── DashboardLayout.tsx           # Main layout with sidebar + content
│   ├── DashboardSidebar.tsx          # Left navigation sidebar
│   ├── DashboardHeader.tsx           # Top header with user info, search
│   ├── NavSection.tsx                # Grouped navigation section
│   ├── NavItem.tsx                   # Individual nav item with active state
│   ├── ProjectCard.tsx               # Content/project card in grid
│   ├── ProjectGrid.tsx               # Grid layout for projects
│   ├── EmptyState.tsx                # Empty state for new users
│   ├── NudgePopup.tsx                # Feature discovery popup
│   ├── QuickActions.tsx              # Quick action buttons
│   └── index.ts                      # Barrel export
```

---

## Page Structure

```
app/
├── dashboard/
│   ├── layout.tsx                    # Dashboard layout wrapper
│   ├── page.tsx                      # Dashboard home/overview
│   └── settings/
│       └── page.tsx                  # Settings page
```

---

## Key Design Patterns to Implement

### Pattern 1: Settings Sidebar Navigation
- **Left sidebar** with grouped navigation (200-250px width)
- **Site Settings section**: General, Domains, Redirects, Versions, Analytics, Plans
- **Page Settings section**: Home, /about, /contact, /404
- Active item: Darker background or left border accent
- Section headers distinguish categories
- Compact spacing, scannable list

### Pattern 2: Dashboard Nudge Popup
- Small floating popup/tooltip style
- Appears over dashboard content (non-blocking)
- Bold headline ("Watch and learn")
- Description text explaining benefit
- Dual-action buttons: Primary ("Start App Tour"), Secondary ("Dismiss")
- Can be triggered by first login, returning after inactivity, new features
- Dismissible with "Don't show again" option

---

## Visual Language Requirements

### Layout
- **Two-panel layout**: Sidebar (200-250px) + main content area
- **Main content**: Grid of projects/content cards
- **Nudge popup**: Floating, positioned top-center or near trigger
- **Header**: User info, search, quick actions

### Typography
- **Sidebar nav items**: 14-16px, regular weight
- **Section headers**: 12-14px, uppercase or muted, bold
- **Popup headline**: 18-24px, bold
- **Popup description**: 14-16px, regular
- **Button text**: 14px, medium weight

### Color & Contrast
- **Sidebar background**: Light gray (#f5f5f5) or white
- **Active nav**: Slightly darker or accent border
- **Popup background**: White with subtle shadow
- **Primary button**: Accent color (blue)
- **Secondary button**: Outlined or muted

### Interaction
- **Sidebar hover**: Subtle highlight
- **Sidebar click**: Navigates to section/page
- **Popup dismiss**: Closes popup, optionally persists preference
- **Popup CTA**: Starts tour or navigates to feature

---

## Implementation Requirements

### 1. DashboardLayout Component
```tsx
interface DashboardLayoutProps {
  children: React.ReactNode
  sidebar?: React.ReactNode
  header?: React.ReactNode
}
```
- Two-panel responsive layout
- Sidebar collapses on mobile
- Header fixed at top

### 2. DashboardSidebar Component
```tsx
interface DashboardSidebarProps {
  sections: NavSection[]
  activeItem?: string
  onNavigate: (href: string) => void
  className?: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

interface NavItem {
  label: string
  href: string
  icon?: LucideIcon
  badge?: string
}
```

### 3. NudgePopup Component
```tsx
interface NudgePopupProps {
  id: string
  headline: string
  description: string
  primaryAction: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
  position?: 'top-center' | 'top-right' | 'near-trigger'
  onDismiss: () => void
  className?: string
}
```
- Stores dismissed state in localStorage
- Can be triggered conditionally

### 4. ProjectCard Component
```tsx
interface ProjectCardProps {
  title: string
  description?: string
  thumbnail?: string
  status?: 'draft' | 'published' | 'archived'
  lastModified?: Date
  href: string
  className?: string
}
```

---

## Responsive Design

### Mobile (<768px)
- Sidebar collapses to hamburger menu
- Full-width content area
- Project cards: Single column
- Nudge popup: Bottom sheet or full-width

### Tablet (768-1024px)
- Sidebar can be collapsible
- Project cards: 2-column grid
- Header simplified

### Desktop (>1024px)
- Full sidebar visible
- Project cards: 3-4 column grid
- Nudge popup: Floating position

---

## Deliverables

1. **Components**: All components listed in structure
2. **Layout**: Dashboard layout with sidebar and content
3. **Sidebar**: Grouped navigation with active states
4. **Header**: User info, search, quick actions
5. **Project Grid**: Card grid with empty state
6. **Nudge System**: Popup component with dismiss persistence
7. **Responsive**: All breakpoint variations working

---

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] Sidebar navigation with grouped sections
- [ ] Active nav item highlighting
- [ ] Nudge popup working with dismiss
- [ ] Project card grid layout
- [ ] Empty state for new users
- [ ] Mobile responsive with hamburger menu
- [ ] Tablet responsive
- [ ] Desktop responsive
- [ ] Keyboard navigation works
- [ ] No TypeScript errors
- [ ] No linter errors

---

## Additional Context

- Dashboard is the authenticated home base
- Should feel organized and productive
- Nudge system helps with feature discovery without being annoying
- Consider "Getting Started" checklist for new users
- Project grid should handle empty state gracefully
- Settings accessed from sidebar

---

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing both reference images
3. Planning the component structure
4. Implementing `DashboardLayout` first (foundational)
5. Building `DashboardSidebar` with navigation
6. Adding `DashboardHeader` component
7. Implementing `ProjectGrid` with cards
8. Adding `NudgePopup` system
9. Testing thoroughly at all breakpoints
