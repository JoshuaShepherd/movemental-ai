# User Account - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 3

---

## Design Vision

The User Account experience should feel **secure, simple, and efficient**. Users interact with account settings infrequently, so the design must be immediately intuitive when they do. The interface prioritizes clear organization, straightforward forms, and minimal friction for common tasks like updating profile info, managing team settings, and configuring site preferences.

The Framer references show clean, minimal patterns for authentication states, team management, and settings forms—all centered around single-task focus and clear visual hierarchy.

---

## Key Patterns Identified

### Pattern 1: Email Verification State
- **Source(s)**: `framer-email-verification.png`
- **What it solves**: Confirms action completion and guides next step
- **Implementation guidance**:
  - Centered layout, minimal design
  - Icon above headline (email/envelope)
  - Bold headline ("Check your inbox")
  - Subtext with instructions ("We sent you an activation link...")
  - Note about checking spam folder
  - Clean white background, no distractions
  - Single focus—one message, one action

### Pattern 2: Team Creation Form
- **Source(s)**: `framer-team-creation-form.png`
- **What it solves**: Captures organization/team info with minimal friction
- **Implementation guidance**:
  - Centered form container
  - Bold headline ("Create new team")
  - Subtext explaining purpose
  - Single text input field (team name)
  - Prominent CTA button ("Create team")
  - Blue/accent color for primary action
  - One field at a time approach

### Pattern 3: Site Settings Form with Sidebar
- **Source(s)**: `framer-site-settings-form.png`
- **What it solves**: Organizes multiple settings categories with clear navigation
- **Implementation guidance**:
  - Two-column layout: Sidebar + Form
  - **Left sidebar sections**:
    - Site Settings: General, Domains, Redirects, Versions, Analytics, Plans
    - Page Settings: Home, /about, /contact, /404
  - **Main form area**:
    - Bold section title ("Site Settings")
    - Save button in header (top-right)
    - Form fields: Site Title, Site Language, Site Description
    - Preview section showing how it appears
    - Accessibility options (reduced motion checkbox)
    - Danger Zone section (unpublish, red button)
    - Site Images section below
  - Clean organization with logical groupings

---

## Visual Language

### Layout
- **Verification/Confirmation pages**: Centered, minimal, single-column
- **Forms**: Centered container for simple forms, two-column for complex settings
- **Settings pages**: Sidebar navigation (200-250px) + main content area
- **Whitespace**: Generous padding between sections

### Typography
- **Headlines**: 32-40px, bold, centered for single-task pages
- **Section headers**: 24-28px, bold
- **Form labels**: 14-16px, regular weight, above inputs
- **Body text**: 16-18px, muted color for instructions
- **Danger zone**: Red text for destructive actions

### Color & Contrast
- **Background**: White
- **Primary buttons**: Blue/accent color
- **Danger buttons**: Red for destructive actions
- **Input borders**: Light gray, darker on focus
- **Sidebar**: Light gray background or same as content
- **Active nav**: Subtle highlight or left border

### Interaction
- **Form validation**: Inline error messages
- **Save button**: Prominent, possibly sticky in header
- **Danger zone**: Confirmation dialog before destructive actions
- **Settings nav**: Instant navigation between sections

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| `framer-email-verification.png` | Framer | Email verification, centered minimal, confirmation state | P1 |
| `framer-team-creation-form.png` | Framer | Team creation, single-field form, centered | P1 |
| `framer-site-settings-form.png` | Framer | Settings form, sidebar navigation, form fields, danger zone | P1 |

---

## Implementation Checklist

### Authentication States
- [ ] Create `ConfirmationPage` component (icon, headline, subtext)
- [ ] Style email verification page
- [ ] Create password reset confirmation page
- [ ] Add "check spam" helper text pattern

### Team Management
- [ ] Create `TeamCreationForm` component
- [ ] Single-field focused form design
- [ ] Team switching UI (if multi-team)
- [ ] Team member management interface

### Settings Pages
- [ ] Create `SettingsLayout` component (sidebar + content)
- [ ] Create `SettingsSidebar` component
- [ ] Implement active state for nav items
- [ ] Create form field components (text, select, checkbox)
- [ ] Create `PreviewSection` component
- [ ] Create `DangerZone` component with confirmation
- [ ] Implement save button in header pattern

### Profile Management
- [ ] Profile edit form
- [ ] Avatar upload
- [ ] Email change flow
- [ ] Password change flow

---

## Open Questions

- Should team creation be a modal or full page?
- How do we handle multiple organizations per user?
- What settings are user-level vs organization-level?
- Do we need email verification for profile changes?
- Should there be activity/audit log for account actions?

---

## Related Features

- **onboarding-path**: Team creation may be part of onboarding flow
- **dashboard**: Settings often accessed from dashboard
- **subscription-management**: Billing settings integration

---

**Design Direction Status**: Foundation established (ready for implementation)
