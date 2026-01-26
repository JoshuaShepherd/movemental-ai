# Implementation Request: User Account

## Context

I need to implement the **User Account** UI section for the Movemental.ai platform. This includes authentication states, team management, profile settings, and account configuration. The design should feel secure, simple, and efficient—users interact with these pages infrequently, so they must be immediately intuitive.

---

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/user-account/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/user-account/reference-images/`
  - `framer-email-verification.png` - Email verification, centered minimal
  - `framer-team-creation-form.png` - Team creation, single-field form
  - `framer-site-settings-form.png` - Settings form, sidebar navigation, form fields

### Implementation Context
- `_docs/ai-vision/05_implementation-checklist.md` - Overall implementation checklist

---

## Tech Stack Requirements

Implement using the established Movemental stack:
- **Next.js 15** with App Router
- **TypeScript** with strict mode
- **shadcn/ui** components (do NOT modify `components/ui/`)
- **Tailwind CSS** for styling
- **React Hook Form** + **Zod** for form validation
- **Lucide React** for icons

---

## Component Structure

```
components/
├── user-account/
│   ├── SettingsLayout.tsx            # Settings page layout
│   ├── SettingsSidebar.tsx           # Settings navigation sidebar
│   ├── SettingsSection.tsx           # Settings section with header
│   ├── SettingsNavItem.tsx           # Sidebar navigation item
│   ├── ConfirmationPage.tsx          # Generic confirmation state
│   ├── EmailVerification.tsx         # Email verification page
│   ├── TeamCreationForm.tsx          # Team/org creation form
│   ├── ProfileEditForm.tsx           # Profile editing form
│   ├── AvatarUpload.tsx              # Avatar upload component
│   ├── PasswordChangeForm.tsx        # Password change form
│   ├── PreviewSection.tsx            # Settings preview display
│   ├── DangerZone.tsx                # Destructive actions section
│   ├── FormField.tsx                 # Styled form field wrapper
│   └── index.ts                      # Barrel export
```

---

## Page Structure

```
app/
├── (auth)/
│   ├── verify-email/
│   │   └── page.tsx                  # Email verification
│   ├── reset-password/
│   │   └── page.tsx                  # Password reset
│   └── confirm/
│       └── page.tsx                  # Generic confirmation
├── dashboard/
│   └── settings/
│       ├── layout.tsx                # Settings layout
│       ├── page.tsx                  # General settings (default)
│       ├── profile/
│       │   └── page.tsx              # Profile settings
│       ├── team/
│       │   └── page.tsx              # Team settings
│       ├── billing/
│       │   └── page.tsx              # Billing settings
│       └── security/
│           └── page.tsx              # Security settings
```

---

## Key Design Patterns to Implement

### Pattern 1: Email Verification State
- Centered layout, minimal design
- Icon above headline (email/envelope)
- Bold headline ("Check your inbox")
- Subtext with instructions
- Note about checking spam folder
- Single focus—one message, one action

### Pattern 2: Team Creation Form
- Centered form container
- Bold headline ("Create new team")
- Subtext explaining purpose
- Single text input field
- Prominent CTA button
- One field at a time approach

### Pattern 3: Site Settings Form with Sidebar
- Two-column layout: Sidebar + Form
- **Sidebar sections**:
  - Site Settings: General, Domains, Redirects, Analytics, Plans
  - Page Settings: Home, /about, /contact, /404
- **Form area**:
  - Bold section title
  - Save button in header (top-right)
  - Form fields with labels
  - Preview section
  - Danger Zone section (red button for destructive actions)

---

## Visual Language Requirements

### Layout
- **Verification/Confirmation**: Centered, minimal, single-column
- **Forms**: Centered container for simple, two-column for complex
- **Settings pages**: Sidebar (200-250px) + main content
- **Whitespace**: Generous padding between sections

### Typography
- **Headlines**: 32-40px, bold, centered for single-task pages
- **Section headers**: 24-28px, bold
- **Form labels**: 14-16px, regular, above inputs
- **Body text**: 16-18px, muted for instructions
- **Danger zone**: Red text for destructive actions

### Color & Contrast
- **Background**: White
- **Primary buttons**: Blue/accent color
- **Danger buttons**: Red for destructive actions
- **Input borders**: Light gray, darker on focus
- **Sidebar**: Light gray or same as content
- **Active nav**: Subtle highlight or left border

### Interaction
- **Form validation**: Inline error messages
- **Save button**: Prominent, possibly sticky in header
- **Danger zone**: Confirmation dialog before destructive actions
- **Settings nav**: Instant navigation between sections

---

## Implementation Requirements

### 1. SettingsLayout Component
```tsx
interface SettingsLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  saveAction?: {
    label: string
    onClick: () => void
    isLoading?: boolean
    isDisabled?: boolean
  }
  className?: string
}
```

### 2. SettingsSidebar Component
```tsx
interface SettingsSidebarProps {
  sections: SettingsSection[]
  activeHref: string
  className?: string
}

interface SettingsSection {
  title: string
  items: { label: string; href: string; icon?: LucideIcon }[]
}
```

### 3. ConfirmationPage Component
```tsx
interface ConfirmationPageProps {
  icon?: LucideIcon
  headline: string
  description: string
  helperText?: string
  action?: { label: string; href: string }
  className?: string
}
```

### 4. DangerZone Component
```tsx
interface DangerZoneProps {
  title: string
  description: string
  action: {
    label: string
    onClick: () => void
    confirmMessage?: string
  }
  className?: string
}
```

### 5. TeamCreationForm Component
```tsx
interface TeamCreationFormProps {
  onSubmit: (data: { teamName: string }) => void
  isLoading?: boolean
  error?: string
  className?: string
}
```

---

## Form Patterns

### Single-Field Focus Pattern
```tsx
// Used for team creation, important decisions
<div className="max-w-md mx-auto text-center">
  <h1 className="text-3xl font-bold mb-2">Create new team</h1>
  <p className="text-muted-foreground mb-8">Description text</p>
  <form>
    <Input placeholder="Team name" className="mb-4" />
    <Button type="submit" className="w-full">Create team</Button>
  </form>
</div>
```

### Settings Form Pattern
```tsx
// Used for multi-field settings
<SettingsLayout title="General Settings" saveAction={...}>
  <SettingsSection title="Site Information">
    <FormField label="Site Title" name="title" />
    <FormField label="Site Description" name="description" />
  </SettingsSection>
  <SettingsSection title="Preview">
    <PreviewSection {...preview} />
  </SettingsSection>
  <DangerZone title="Danger Zone" {...dangerProps} />
</SettingsLayout>
```

---

## Responsive Design

### Mobile (<768px)
- Sidebar: Hamburger menu or tabs
- Forms: Full-width
- Confirmation: Full-screen centered
- Save button: Fixed at bottom

### Tablet (768-1024px)
- Sidebar: Collapsible
- Forms: Centered container
- Confirmation: Centered modal-like

### Desktop (>1024px)
- Full two-column layout
- Sidebar always visible
- Save button in header

---

## Deliverables

1. **Components**: All components listed in structure
2. **Settings Layout**: Two-column with sidebar
3. **Settings Sidebar**: With navigation and active states
4. **Confirmation Pages**: Email verification, password reset
5. **Team Creation**: Single-field focused form
6. **Profile Form**: Multi-field settings
7. **Danger Zone**: With confirmation dialog
8. **Responsive**: All breakpoint variations working

---

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] Email verification page with icon and instructions
- [ ] Team creation form with single field focus
- [ ] Settings sidebar with navigation
- [ ] Settings forms with proper validation
- [ ] Save button working in header
- [ ] Danger zone with confirmation
- [ ] Mobile responsive (test at 375px width)
- [ ] Tablet responsive (test at 768px width)
- [ ] Desktop responsive (test at 1280px width)
- [ ] Keyboard navigation works
- [ ] Form validation displaying errors
- [ ] No TypeScript errors
- [ ] No linter errors

---

## Additional Context

- Account pages need to feel secure and trustworthy
- Single-field focus reduces friction for important actions
- Confirmation dialogs prevent accidental destructive actions
- Settings should save explicitly (Save button), not auto-save
- Consider activity/audit log for account actions (future)
- Team creation may be part of onboarding flow

---

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing all three reference images
3. Planning the component structure
4. Implementing `SettingsLayout` first (foundational)
5. Building `SettingsSidebar` with navigation
6. Adding `ConfirmationPage` for auth states
7. Implementing `TeamCreationForm`
8. Building settings form components
9. Testing thoroughly at all breakpoints
