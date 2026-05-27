# Implementation Request: Fit Check

## Context

I need to implement the **Fit Check** UI section for the Movemental.ai platform. This is the 60-second assessment that determines visitor alignment with Movemental—a focused, single-question-per-screen experience that communicates efficiency and self-selection over engagement metrics.

---

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/fit-check/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/fit-check/reference-images/`
  - `typeform-single-question-likert.png` - Single question focus, keyboard shortcuts, progress stepper
  - `typeform-nps-scale.png` - NPS scale, labeled endpoints, keyboard navigation
  - `hubspot-quiz-progress-validation.png` - Multi-step progress, quiz validation
  - `hims-visual-selection-cards.png` - Visual selection, illustration cards, minimal chrome
  - `hims-binary-choice.png` - Binary Yes/No, large icon cards, minimal design
  - `hims-radio-list-stepper.png` - Radio list, segmented progress, helper text
  - `wetransfer-quiz-landing.png` - Bold intro screen, dark theme, typography
  - `headspace-emotional-checkin.png` - Mood check-in, visual icon cards, gradient background
  - `kajabi-modal-quiz-progress.png` - Progress bar, helper text, card selection
  - `kajabi-modal-quiz.png` - Modal overlay, checkmark selection

### Content Specification
- `_docs/site-docs/02_fit_check.md` - Content requirements, questions, and copy

### Implementation Context
- `_docs/ai-vision/05_implementation-checklist.md` - Overall implementation checklist (Phase 1, Item 1)

---

## Tech Stack Requirements

Implement using the established Movemental stack:
- **Next.js 15** with App Router
- **TypeScript** with strict mode
- **shadcn/ui** components (do NOT modify `components/ui/`)
- **Tailwind CSS** for styling
- **React Hook Form** + **Zod** for form state and validation
- **Framer Motion** for transitions (optional but recommended)
- **Lucide React** for icons

---

## Component Structure

```
components/
├── fit-check/
│   ├── FitCheckContainer.tsx      # Main assessment container, state management
│   ├── FitCheckLanding.tsx        # Intro/landing screen with CTA
│   ├── FitCheckQuestion.tsx       # Single question display
│   ├── FitCheckProgress.tsx       # Progress bar component
│   ├── FitCheckTimer.tsx          # Optional timer display (~60s remaining)
│   ├── FitCheckResults.tsx        # Results screen (fit/non-fit)
│   ├── AnswerCard.tsx             # Text-based answer card
│   ├── AnswerCardVisual.tsx       # Image/icon-based answer card
│   ├── LikertScale.tsx            # 5-point Likert scale input
│   ├── NumericScale.tsx           # 0-10 NPS-style scale input
│   ├── BinaryChoice.tsx           # Yes/No selection component
│   └── index.ts                   # Barrel export
```

---

## Page Structure

```
app/
├── (public)/
│   └── fit-check/
│       └── page.tsx               # Public Fit Check page
```

---

## Key Design Patterns to Implement

### Pattern 1: Single Question Focus
- Display only one question at a time
- Center question vertically in viewport
- Generous whitespace (40-60% of screen is breathing room)
- Question number serves as subtle progress indicator

### Pattern 2: Progress Visualization
- Horizontal progress bar at top of screen
- Show completion percentage or step count ("Question 1 of 6")
- Optional timer estimate ("~45s remaining")

### Pattern 3: Answer Cards
- Card-based answer options (not raw radio buttons)
- Minimum 44px touch target height
- Clear selected/unselected states
- Keyboard shortcuts (A, B, C, D, E) for power users

### Pattern 4: Bold Landing/Intro Screen
- Strong headline with personality
- Subheadline explaining 60-second assessment
- Single CTA button ("Begin Fit Check")
- Consider dark theme for distinction from main site

### Pattern 5: Keyboard Navigation
- Letter keys (A-E) for option selection
- Enter to confirm/proceed
- Navigation arrows for back/forward
- Show keyboard hints subtly near options

---

## Visual Language Requirements

### Layout
- **Structure**: Full-viewport, vertically centered content
- **Max width**: 600-700px for question content
- **Spacing**: Generous—40% minimum whitespace
- **Progress bar**: Fixed at top, thin (4-8px height)
- **Navigation**: Minimal, bottom-right for forward/back

### Typography
- **Question**: Large, confident (24-32px), medium weight
- **Subtext**: Smaller (14-16px), lighter weight, muted color
- **Options**: Clear, readable (16-18px), consistent weight
- **Numbers/Scale**: Tabular figures for NPS-style scales

### Color & Contrast
- **Background**: Clean white or light neutral (main flow) OR bold dark (intro screen)
- **Question text**: Near-black for maximum readability
- **Option cards**: Light background with clear borders
- **Selected state**: Strong accent color fill or border
- **Progress bar**: Accent color (blue/orange per brand)

### Interaction
- **Selection**: Immediate visual feedback on click/tap
- **Transitions**: Smooth slide or fade between questions (200-300ms)
- **Auto-advance**: Consider auto-advancing after selection (with brief 300ms delay)
- **Back navigation**: Always available, never destructive

---

## Implementation Requirements

### 1. FitCheckContainer Component
```tsx
interface FitCheckState {
  currentQuestion: number
  answers: Record<string, string | number>
  startTime: Date
  isComplete: boolean
  result: 'fit' | 'non-fit' | 'uncertain' | null
}
```
- Manage assessment state
- Handle question navigation
- Calculate fit result based on answers
- Track time spent

### 2. Question Types to Support
- **Likert Scale**: 5-point scale (Definitely → Definitely Not)
- **NPS Scale**: 0-10 numeric scale with labeled endpoints
- **Single Select Cards**: Text-based answer cards
- **Visual Select Cards**: Icon/image + label cards
- **Binary Choice**: Yes/No with large icon cards

### 3. Results Logic
- **Fit Confirmed**: Navigate to `/why-movemental`
- **Non-Fit**: Graceful exit with alternative resources
- **Uncertain**: Additional context or learn more path

---

## Responsive Design

### Mobile (<768px)
- Full-width question area with padding
- Stacked answer cards (1 column)
- Larger touch targets (48px minimum)
- Progress bar thinner (4px)

### Tablet (768-1024px)
- Centered content container
- 2-column card grid for visual options
- Standard touch targets

### Desktop (>1024px)
- Max-width container (600-700px)
- Keyboard shortcuts visible
- Hover states on cards

---

## Deliverables

1. **Components**: All components listed in structure
2. **Page**: `/fit-check` route with full assessment flow
3. **Landing Screen**: Bold intro with CTA
4. **Question Screens**: All question types working
5. **Results Screens**: Fit confirmed and non-fit outcomes
6. **Progress Tracking**: Visual progress bar and optional timer
7. **Keyboard Navigation**: A-E selection, Enter to confirm
8. **Responsive**: All breakpoint variations working
9. **Transitions**: Smooth animations between questions

---

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] Landing screen with personality and CTA
- [ ] Single question focus with proper whitespace
- [ ] Progress bar working correctly
- [ ] All question types implemented (Likert, NPS, Cards, Visual, Binary)
- [ ] Keyboard navigation (A-E, Enter, arrows)
- [ ] Mobile responsive (test at 375px width)
- [ ] Tablet responsive (test at 768px width)
- [ ] Desktop responsive (test at 1280px width)
- [ ] Smooth transitions between questions
- [ ] Results routing working (fit → /why-movemental)
- [ ] No TypeScript errors
- [ ] No linter errors
- [ ] Content matches site-docs specification

---

## Additional Context

- Assessment should complete in ~60 seconds
- 6 questions covering: Movement Alignment, Audience Size, Content Quality, Revenue Potential, Platform Ownership, Network Value
- Auto-advance after selection (with brief 300ms delay)
- Consider dark theme for landing screen to distinguish from main site
- Progress state persistence (browser refresh recovery) is nice-to-have
- Analytics events per question are important for optimization

---

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing all reference images
3. Planning the component structure
4. Implementing `FitCheckLanding` first (sets the tone)
5. Building `FitCheckQuestion` with one question type
6. Adding remaining question types
7. Implementing `FitCheckResults` with routing
8. Adding keyboard navigation
9. Testing thoroughly at all breakpoints
