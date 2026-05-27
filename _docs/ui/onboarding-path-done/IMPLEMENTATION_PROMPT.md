# Implementation Request: Onboarding Path

## Context

I need to implement the **Onboarding Path** UI section for the Movemental.ai platform. This is the timeline visualization showing visitors what happens after Fit Confirmed—the 3-4 week journey from initial discovery to platform launch. Unlike the transactional Fit Check, this communicates a collaborative journey with clear phases and expectations.

---

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/onboarding-path/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/onboarding-path/reference-images/`
  - `wetransfer-landing-intro.png` - Bold intro, typography, CTA
  - `wise-numbered-steps.png` - Numbered steps, "how it works", light variant
  - `hims-visual-selection-cards.png` - Visual cards, clean selection UI
  - `framer-step-cards-process.png` - Dark step cards, 3-column, icons + CTA
  - `framer-email-verification.png` - Email verification, centered minimal
  - `framer-team-creation-form.png` - Team creation, single-field form
  - `framer-welcome-modal-tour.png` - Welcome modal, app tour, dual actions
  - `framer-template-selection-grid.png` - Template grid, starting point selection
  - `framer-tutorials-sidebar.png` - Tutorial sidebar, video list
  - `framer-dashboard-nudge-popup.png` - Dashboard popup, re-engagement

### Content Specification
- `_docs/site-docs/04_onboarding_path_overview.md` - Content requirements and copy

### Implementation Context
- `_docs/ai-vision/05_implementation-checklist.md` - Overall implementation checklist (Phase 1, Item 3)

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
├── onboarding-path/
│   ├── OnboardingPathContainer.tsx   # Main page container
│   ├── OnboardingHero.tsx            # Bold intro section
│   ├── Timeline.tsx                  # Main timeline visualization
│   ├── TimelineVertical.tsx          # Mobile vertical timeline
│   ├── TimelineHorizontal.tsx        # Desktop horizontal timeline
│   ├── PhaseCard.tsx                 # Expandable phase card
│   ├── PhaseConnector.tsx            # Visual connector between phases
│   ├── StepCards.tsx                 # 3-column process cards section
│   ├── StepCard.tsx                  # Individual step card
│   ├── NumberedSteps.tsx             # Numbered "how it works" section
│   ├── WelcomeModal.tsx              # Welcome modal with app tour
│   ├── EmailVerification.tsx         # Email verification state
│   ├── TeamCreationForm.tsx          # Team creation single-field form
│   └── index.ts                      # Barrel export
```

---

## Page Structure

```
app/
├── (public)/
│   └── onboarding/
│       └── page.tsx                  # Public onboarding path page
```

---

## Key Design Patterns to Implement

### Pattern 1: Bold Landing/Intro
- Strong headline framing the journey ("Your Path to Platform Launch")
- Subheadline with time commitment ("3-4 weeks from fit to live")
- Single CTA to begin or explore phases
- Distinctive visual treatment (bold typography)

### Pattern 2: Timeline Visualization
- Vertical on mobile, horizontal on desktop
- 4 phases with clear progression
- Phase cards expandable for detail
- Visual connectors between phases

### Pattern 3: Step Process Cards (Dark Variant)
- Dark background section for visual impact
- Bold headline above cards (white text)
- 3-column card layout
- Each card: Accent icon, bold title, description
- First card can include primary CTA

### Pattern 4: Numbered Step Cards (Light Variant)
- Light/neutral background
- Bold headline ("HOW IT WORKS")
- Large numbers (1, 2, 3), bold title, description
- Final CTA below cards

### Pattern 5: Email Verification State
- Centered, minimal layout
- Icon above headline
- Bold headline ("Check your inbox")
- Subtext with instructions

### Pattern 6: Team Creation Form
- Centered single-field form
- Bold headline ("Create new team")
- Single text input + CTA button

---

## Visual Language Requirements

### Layout
- **Hero section**: Bold intro with timeline preview
- **Timeline**: Vertical (mobile) or horizontal (desktop)
- **Phase cards**: Expandable accordion or modal detail
- **CTA placement**: After timeline overview, within phases

### Typography
- **Headlines**: Bold, confident (32-48px display)
- **Phase titles**: Clear hierarchy (24-28px)
- **Descriptions**: Readable body copy (16-18px)
- **Time estimates**: Badge or tag style

### Color & Contrast
- **Timeline connector**: Accent color line
- **Phase indicators**: Numbered or icon-based
- **Completed phases**: Filled/checkmarked (returning users)
- **Current phase**: Highlighted, prominent
- **Future phases**: Slightly muted but visible

### Interaction
- **Phase expansion**: Click to reveal detailed activities
- **Progress tracking**: Visual indication of completed vs. upcoming
- **CTA progression**: Phase-specific actions where appropriate

---

## Implementation Requirements

### 1. Timeline Component
```tsx
interface TimelineProps {
  phases: Phase[]
  currentPhase?: number
  variant?: 'vertical' | 'horizontal' | 'auto'
  className?: string
}

interface Phase {
  id: string
  number: number
  title: string
  duration: string
  description: string
  activities: string[]
  isCompleted?: boolean
  isCurrent?: boolean
}
```

### 2. Phase Cards
```tsx
interface PhaseCardProps {
  phase: Phase
  isExpanded: boolean
  onToggle: () => void
  variant?: 'horizontal' | 'vertical'
  className?: string
}
```

### 3. Step Cards Section
```tsx
interface StepCardsProps {
  headline: string
  steps: {
    icon: LucideIcon
    title: string
    description: string
    cta?: { label: string; href: string }
  }[]
  variant?: 'dark' | 'light' | 'numbered'
  className?: string
}
```

---

## Phases Content (from site-docs)

### Phase 1: Discovery & Vision (Week 1)
- Initial consultation
- Vision alignment
- Content audit
- Platform goals

### Phase 2: Content Research (Week 1-2)
- Content inventory
- Gap analysis
- AI content mapping
- Research synthesis

### Phase 3: Platform Architecture (Week 2)
- Site structure
- Navigation design
- Feature configuration
- Integration setup

### Phase 4: Network Integration & Launch (Week 3-4)
- Network onboarding
- Content migration
- Testing & QA
- Launch preparation

---

## Responsive Design

### Mobile (<768px)
- Vertical timeline only
- Phase cards stacked
- Step cards: Single column
- Touch-friendly expansion

### Tablet (768-1024px)
- Horizontal timeline with scroll if needed
- 2-column step cards
- Phase cards: Compact view

### Desktop (>1024px)
- Full horizontal timeline
- 3-column step cards
- Phase cards: Full detail view

---

## Deliverables

1. **Components**: All components listed in structure
2. **Page**: `/onboarding` route
3. **Hero Section**: Bold intro with value proposition
4. **Timeline**: Working horizontal/vertical responsive
5. **Phase Cards**: Expandable with activities list
6. **Step Cards**: Dark and light variants
7. **Forms**: Team creation and email verification states
8. **Responsive**: All breakpoint variations working

---

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] Hero section with bold intro working
- [ ] Timeline renders correctly on mobile (vertical)
- [ ] Timeline renders correctly on desktop (horizontal)
- [ ] Phase cards expand/collapse properly
- [ ] Step cards section with icons
- [ ] Mobile responsive (test at 375px width)
- [ ] Tablet responsive (test at 768px width)
- [ ] Desktop responsive (test at 1280px width)
- [ ] Keyboard navigation works
- [ ] No TypeScript errors
- [ ] No linter errors
- [ ] Content matches site-docs specification

---

## Additional Context

- This page follows Fit Check in user journey (fit confirmed → onboarding path)
- Should feel like receiving a roadmap to success, not a to-do list
- Timeline is primarily informational but could track progress for returning users
- Consider "Schedule Discovery Call" as primary CTA
- Phase details should reduce uncertainty and build confidence

---

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing all reference images
3. Planning the component structure
4. Implementing `OnboardingHero` first (sets the tone)
5. Building `Timeline` component with responsive variants
6. Adding `PhaseCard` with expansion
7. Implementing `StepCards` section
8. Testing thoroughly at all breakpoints
