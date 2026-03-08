# UI Implementation Prompt

> **Standard prompt for building front-end pages from completed UI design direction**

**Version**: 1.0.0  
**Last Updated**: January 2026

---

## How to Use This Prompt

When a UI section has a completed `DESIGN_DIRECTION.md` with reference images, use this prompt to build the actual front-end implementation. Copy the prompt below and fill in the `{variables}` with the specific section you're implementing.

---

## The Prompt

```markdown
# Implementation Request: {UI_SECTION_NAME}

## Context

I need to implement the **{UI_SECTION_NAME}** UI section for the Movemental.ai platform. The design direction and reference images are ready.

## Source Documents

Please read and synthesize these documents before implementation:

### Design Direction (PRIMARY)
- `_docs/ui/{ui-section-folder}/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/{ui-section-folder}/reference-images/` - All reference images for this section

### Content Specification
- `_docs/site-docs/{relevant-content-doc}.md` - Content requirements and copy

### Implementation Context
- `_docs/ai-vision/05_implementation-checklist.md` - Overall implementation checklist
- `_docs/ai-vision/04_ui-ux-proposal.md` - UI/UX proposal details (if relevant)

## Tech Stack Requirements

Implement using the established Movemental stack:
- **Next.js 15** with App Router
- **TypeScript** with strict mode
- **shadcn/ui** components (do NOT modify `components/ui/`)
- **Tailwind CSS** for styling
- **React Hook Form** + **Zod** for forms
- **Lucide React** for icons

## Implementation Requirements

### 1. Follow Design Direction
- Implement all patterns identified in DESIGN_DIRECTION.md
- Reference the visual language specifications (layout, typography, color, interaction)
- Check off items in the Implementation Checklist as you complete them

### 2. Component Structure
Create components in this structure:
```
components/
├── {section-name}/
│   ├── {SectionName}.tsx          # Main container component
│   ├── {SubComponent1}.tsx        # Sub-components as needed
│   ├── {SubComponent2}.tsx
│   └── index.ts                   # Barrel export
```

### 3. Page Structure
Create pages in the App Router:
```
app/
├── (public)/
│   └── {route-name}/
│       └── page.tsx               # Public page
└── dashboard/
    └── {route-name}/
        └── page.tsx               # Authenticated page (if applicable)
```

### 4. Type Safety
- Define types in `lib/schemas/` if data contracts needed
- Use Zod schemas for form validation
- Follow the six-layer type safety chain

### 5. Responsive Design
- Mobile-first implementation
- Breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- Test all layouts at each breakpoint

### 6. Accessibility
- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Color contrast compliance (WCAG 2.1 AA)

## Deliverables

1. **Components**: All components needed for the section
2. **Pages**: Route pages with proper layouts
3. **Types**: Any necessary type definitions
4. **Content**: Hardcoded content from site-docs (for now)
5. **Responsive**: All breakpoint variations working

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] All Implementation Checklist items checked
- [ ] Mobile responsive (test at 375px width)
- [ ] Tablet responsive (test at 768px width)
- [ ] Desktop responsive (test at 1280px width)
- [ ] Keyboard navigation works
- [ ] No TypeScript errors
- [ ] No linter errors
- [ ] shadcn/ui components used where appropriate
- [ ] Tailwind classes follow project conventions
- [ ] Content matches site-docs specification

## Additional Context

{ADD_ANY_SPECIFIC_CONTEXT_FOR_THIS_SECTION}

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing the reference images
3. Planning the component structure
4. Implementing mobile-first, then enhancing for larger screens
5. Testing thoroughly at all breakpoints
```

---

## Section-Specific Variables

Fill in these variables for each UI section:

| Variable | Description | Example |
|----------|-------------|---------|
| `{UI_SECTION_NAME}` | Human-readable section name | "Fit Check" |
| `{ui-section-folder}` | Folder name in `_docs/ui/` | "fit-check" |
| `{relevant-content-doc}` | Content doc in `_docs/site-docs/` | "02_fit_check" |
| `{section-name}` | Component folder name (kebab-case) | "fit-check" |
| `{SectionName}` | Component name (PascalCase) | "FitCheck" |
| `{route-name}` | URL route segment | "fit-check" |
| `{ADD_ANY_SPECIFIC_CONTEXT}` | Section-specific notes | "Timer should count down from 60s" |

---

## Pre-Built Section Prompts

### Fit Check

```markdown
# Implementation Request: Fit Check

## Context

I need to implement the **Fit Check** UI section for the Movemental.ai platform. This is the 60-second assessment that determines visitor fit.

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/fit-check/DESIGN_DIRECTION.md`

### Reference Images
- `_docs/ui/fit-check/reference-images/`
  - typeform-single-question-likert.png
  - typeform-nps-scale.png
  - hubspot-quiz-progress-validation.png
  - hims-visual-selection-cards.png
  - wetransfer-quiz-landing-dark.png
  - kajabi-modal-quiz-progress.png

### Content Specification
- `_docs/site-docs/02_fit_check.md`

### Implementation Context
- `_docs/ai-vision/05_implementation-checklist.md` (Phase 1, Item 1)

## Tech Stack Requirements

(Use standard stack from main prompt)

## Component Structure

```
components/
├── fit-check/
│   ├── FitCheckContainer.tsx      # Main assessment container
│   ├── FitCheckLanding.tsx        # Intro/landing screen
│   ├── FitCheckQuestion.tsx       # Single question display
│   ├── FitCheckProgress.tsx       # Progress bar component
│   ├── FitCheckTimer.tsx          # Optional timer display
│   ├── FitCheckResults.tsx        # Results screen (fit/non-fit)
│   ├── AnswerCard.tsx             # Text-based answer card
│   ├── AnswerCardVisual.tsx       # Image-based answer card
│   ├── ScaleInput.tsx             # NPS-style scale input
│   └── index.ts
```

## Page Structure

```
app/
├── (public)/
│   └── fit-check/
│       └── page.tsx
```

## Additional Context

- Assessment should complete in ~60 seconds
- 6 questions covering: Movement Alignment, Audience Size, Content Quality, Revenue Potential, Platform Ownership, Network Value
- Keyboard shortcuts (A-E) for answer selection
- Auto-advance after selection (with brief 300ms delay)
- Results: Fit Confirmed → /why-movemental, Non-Fit → exit with resources
- Consider dark theme for landing screen

## Deliverables

1. Complete Fit Check flow (landing → questions → results)
2. All question types: Likert, NPS scale, visual cards
3. Progress tracking and optional timer
4. Results screens for fit/non-fit outcomes
5. Mobile-first responsive implementation
```

---

### Assessment System

```markdown
# Implementation Request: Assessment System

## Context

I need to implement the **Assessment System** UI components for the Movemental.ai platform. These are reusable assessment components for quizzes, evaluations, and milestone tracking.

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/assessment-system/DESIGN_DIRECTION.md`

### Reference Images
- `_docs/ui/assessment-system/reference-images/`
  - typeform-single-question-likert.png
  - typeform-nps-scale.png
  - hubspot-quiz-progress-validation.png
  - hims-visual-selection-cards.png
  - kajabi-modal-quiz-progress.png

### Implementation Context
- `_docs/ai-vision/05_implementation-checklist.md` (Phase 4, Item 16)

## Component Structure

```
components/
├── assessment/
│   ├── AssessmentContainer.tsx     # Full-page assessment wrapper
│   ├── AssessmentModal.tsx         # Modal overlay variant
│   ├── AssessmentStepper.tsx       # Multi-phase progress stepper
│   ├── AssessmentQuestion.tsx      # Question display
│   ├── AssessmentResults.tsx       # Results/score display
│   ├── QuestionCounter.tsx         # "Question X of Y"
│   ├── ValidationFeedback.tsx      # Correct/incorrect feedback
│   ├── inputs/
│   │   ├── SingleSelectCard.tsx    # Text card selection
│   │   ├── VisualSelectCard.tsx    # Image + text card
│   │   ├── LikertScale.tsx         # 5-point Likert
│   │   ├── NumericScale.tsx        # 0-10 NPS scale
│   │   └── MultiSelectCheckbox.tsx # Multi-select
│   └── index.ts
```

## Additional Context

- Build as a reusable component library
- Support both full-page and modal variants
- Include validation mode ("Check Answer") for quizzes
- Support survey mode (auto-advance) for self-assessments
- Types: Knowledge Quiz, Self-Assessment, Visual Preference, Contextual Recommender
```

---

### Onboarding Path

```markdown
# Implementation Request: Onboarding Path

## Context

I need to implement the **Onboarding Path** UI section for the Movemental.ai platform. This is the timeline visualization showing the 3-4 week journey from fit confirmed to platform launch.

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/onboarding-path/DESIGN_DIRECTION.md`

### Reference Images
- `_docs/ui/onboarding-path/reference-images/`
  - wetransfer-landing-intro.png
  - hims-visual-selection-cards.png

### Content Specification
- `_docs/site-docs/04_onboarding_path_overview.md`

### Implementation Context
- `_docs/ai-vision/05_implementation-checklist.md` (Phase 1, Item 3)

## Component Structure

```
components/
├── onboarding-path/
│   ├── OnboardingPathContainer.tsx  # Main container
│   ├── OnboardingHero.tsx           # Bold intro section
│   ├── Timeline.tsx                 # Timeline visualization
│   ├── TimelineVertical.tsx         # Mobile vertical timeline
│   ├── TimelineHorizontal.tsx       # Desktop horizontal timeline
│   ├── PhaseCard.tsx                # Expandable phase card
│   ├── PhaseConnector.tsx           # Visual connector between phases
│   └── index.ts
```

## Page Structure

```
app/
├── (public)/
│   └── onboarding/
│       └── page.tsx
```

## Additional Context

- 4 phases: Discovery & Vision, Content Research, Platform Architecture, Network Integration & Launch
- Timeline should be vertical on mobile, horizontal on desktop
- Phase cards should be expandable to show detailed activities
- Consider bold/dark theme for hero section (WeTransfer pattern)
- CTA: "Start Your Journey" or "Schedule Discovery Call"

## Note

Design direction is partially ready. More reference images may be needed for timeline visualization patterns. Proceed with available patterns and flag gaps.
```

---

## Component Conventions

### File Naming
- Components: `PascalCase.tsx`
- Hooks: `use-kebab-case.ts`
- Utils: `kebab-case.ts`
- Types: `types.ts` or inline

### Import Organization
```tsx
// External imports
import { useState } from 'react'
import { useForm } from 'react-hook-form'

// UI components (shadcn)
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

// Internal components
import { FitCheckQuestion } from './FitCheckQuestion'

// Types
import type { Question } from '@/lib/schemas'

// Utils
import { cn } from '@/lib/utils'
```

### Component Template
```tsx
'use client'

import { cn } from '@/lib/utils'

interface ComponentNameProps {
  // Props with JSDoc comments
  /** Description of prop */
  propName: string
  className?: string
}

export function ComponentName({ 
  propName,
  className 
}: ComponentNameProps) {
  return (
    <div className={cn('base-classes', className)}>
      {/* Component content */}
    </div>
  )
}
```

---

## Post-Implementation

After completing implementation:

1. **Update DESIGN_DIRECTION.md**: Check off completed items in Implementation Checklist
2. **Document deviations**: Note any patterns that couldn't be implemented as designed
3. **Flag gaps**: Identify any missing reference patterns needed
4. **Test thoroughly**: Verify all breakpoints and interactions
5. **Screenshot**: Consider adding implementation screenshots to reference-images for future reference

---

**Usage**: Copy the appropriate section prompt above, or create a new one using the template, and provide it when ready to implement a UI section.
