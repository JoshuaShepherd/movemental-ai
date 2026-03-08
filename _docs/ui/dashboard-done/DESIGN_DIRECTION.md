# Dashboard - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 2

---

## Design Vision

The Dashboard is the user's home base—where they land after login and where they manage their content and navigate the platform. The design should feel **organized, productive, and welcoming**. It needs to surface relevant content, provide clear navigation, and help users understand their current state and next actions.

The Framer references show patterns for settings sidebar navigation and contextual nudge popups that guide users without being intrusive. The dashboard balances content display with helpful prompts for users who may need guidance.

---

## Key Patterns Identified

### Pattern 1: Settings Sidebar Navigation
- **Source(s)**: `framer-settings-sidebar.png`
- **What it solves**: Organizes dashboard settings and pages in accessible navigation
- **Implementation guidance**:
  - **Left sidebar** with grouped navigation
  - **Site Settings section**:
    - General (active state highlighted)
    - Domains
    - Redirects
    - Versions
    - Analytics
    - Plans
  - **Page Settings section**:
    - Home
    - /about
    - /contact
    - /404
  - Active item: Darker background or left border accent
  - Section headers distinguish categories
  - Compact spacing, scannable list

### Pattern 2: Dashboard Nudge Popup
- **Source(s)**: `framer-dashboard-nudge-popup.png`
- **What it solves**: Re-engages users and promotes feature discovery without blocking
- **Implementation guidance**:
  - Small floating popup/tooltip style
  - Appears over dashboard content (non-blocking)
  - Bold headline ("Watch and learn")
  - Description text explaining benefit
  - Dual-action buttons: Primary ("Start App Tour"), Secondary ("Dismiss")
  - Positioned near relevant feature or prominent location
  - Can be triggered by:
    - First login
    - Returning after inactivity
    - New feature announcement
    - Incomplete onboarding
  - Dismissible with "Don't show again" option

---

## Visual Language

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

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| `framer-settings-sidebar.png` | Framer | Settings sidebar, grouped navigation, active states | P1 |
| `framer-dashboard-nudge-popup.png` | Framer | Nudge popup, feature discovery, dual-action | P1 |

---

## Implementation Checklist

### Sidebar Navigation
- [ ] Create `DashboardSidebar` component
- [ ] Create `NavSection` component with header + items
- [ ] Create `NavItem` component with active state
- [ ] Implement collapsible sections (optional)
- [ ] Add responsive collapse (hamburger on mobile)

### Main Content Area
- [ ] Create `DashboardLayout` component
- [ ] Create `ProjectCard` component for content items
- [ ] Implement grid/list view toggle
- [ ] Add search/filter functionality
- [ ] Create empty state for new users

### Nudge System
- [ ] Create `NudgePopup` component
- [ ] Implement positioning logic (near trigger or fixed)
- [ ] Add dismiss persistence (localStorage or database)
- [ ] Create nudge trigger system
- [ ] Define nudge content variants:
  - [ ] Welcome/first login
  - [ ] Feature discovery
  - [ ] Incomplete onboarding
  - [ ] New feature announcement

### Header
- [ ] Create `DashboardHeader` component
- [ ] User avatar/menu
- [ ] Search bar
- [ ] Quick actions (Create, Settings)
- [ ] Notification indicator

---

## Open Questions

- What content types appear in the main dashboard grid?
- Should there be a "Getting Started" checklist for new users?
- How do we prioritize nudges (which shows first)?
- Should sidebar state (collapsed sections) persist?
- Do we need dashboard customization (widgets, layout)?

---

## Related Features

- **user-account**: Settings accessed from sidebar
- **onboarding-path**: Dashboard nudges support onboarding completion
- **content-workbench**: Content created here appears in dashboard
- **analytics-dashboard**: May be integrated or linked from sidebar

---

**Design Direction Status**: Foundation established (ready for implementation)
