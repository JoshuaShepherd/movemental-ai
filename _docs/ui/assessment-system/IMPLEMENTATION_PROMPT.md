# Implementation Request: Assessment System

## Context

I need to implement the **Assessment System** UI components for the Movemental.ai platform. These are reusable assessment components for quizzes, evaluations, and milestone tracking throughout the platform. Unlike the focused 60-second Fit Check, the Assessment System supports longer, more educational assessments with validation, scoring, and progressive learning elements.

---

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/assessment-system/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/assessment-system/reference-images/`
  - `typeform-single-question-likert.png` - Likert scale, single question focus
  - `typeform-nps-scale.png` - NPS scale, labeled endpoints
  - `hubspot-quiz-progress-validation.png` - Quiz validation, educational progress
  - `headspace-emotional-checkin.png` - Mood check-in, visual icons, gradient
  - `hims-visual-selection-cards.png` - Visual selection, illustration cards
  - `hims-binary-choice.png` - Binary Yes/No, screening questions
  - `hims-radio-list-stepper.png` - Radio list, segmented progress
  - `kajabi-modal-quiz-progress.png` - Modal overlay, progress bar
  - `kajabi-modal-quiz.png` - Modal quiz, checkmark selection
  - `wetransfer-quiz-landing.png` - Quiz intro, serif headline

### Content Specification
- `_docs/site-docs/02_fit_check.md` - Related assessment patterns

### Implementation Context
- `_docs/ai-vision/05_implementation-checklist.md` - Overall implementation checklist (Phase 4, Item 16)

---

## Tech Stack Requirements

Implement using the established Movemental stack:
- **Next.js 15** with App Router
- **TypeScript** with strict mode
- **shadcn/ui** components (do NOT modify `components/ui/`)
- **Tailwind CSS** for styling
- **React Hook Form** + **Zod** for form state
- **Framer Motion** for animations
- **Lucide React** for icons

---

## Component Structure

```
components/
├── assessment/
│   ├── AssessmentContainer.tsx       # Full-page assessment wrapper
│   ├── AssessmentModal.tsx           # Modal overlay variant
│   ├── AssessmentStepper.tsx         # Multi-phase progress stepper
│   ├── AssessmentQuestion.tsx        # Question display component
│   ├── AssessmentResults.tsx         # Results/score display
│   ├── AssessmentLanding.tsx         # Quiz intro/landing screen
│   ├── QuestionCounter.tsx           # "Question X of Y" display
│   ├── ValidationFeedback.tsx        # Correct/incorrect feedback
│   ├── CheckAnswerButton.tsx         # "Check Answer" validation button
│   ├── inputs/
│   │   ├── SingleSelectCard.tsx      # Text card selection
│   │   ├── VisualSelectCard.tsx      # Image + text card
│   │   ├── LikertScale.tsx           # 5-point Likert scale
│   │   ├── NumericScale.tsx          # 0-10 NPS scale
│   │   ├── MultiSelectCheckbox.tsx   # Multi-select options
│   │   ├── BinaryChoice.tsx          # Yes/No selection
│   │   ├── EmotionalCheckin.tsx      # Mood/emotion icons
│   │   └── RadioList.tsx             # Vertical radio list
│   └── index.ts                      # Barrel export
```

---

## Assessment Types to Support

### Type 1: Knowledge Quiz
- Educational framing, validation required
- "Check Answer" button before advancing
- Explanations for wrong answers
- Score displayed at completion
- **Reference**: hubspot-quiz-progress-validation.png

### Type 2: Self-Assessment
- Reflective questions, no right/wrong
- Likert or scale responses
- Results generate recommendations
- Auto-advance after selection
- **Reference**: typeform-single-question-likert.png

### Type 3: Visual Preference
- Image-based selection
- Personality/style determination
- Fun, engaging tone
- Grid layout for options
- **Reference**: hims-visual-selection-cards.png

### Type 4: Contextual Recommender
- Modal overlay on decision pages
- Brief (2-4 questions)
- Surfaces recommendation based on answers
- Dismissible but valuable
- **Reference**: kajabi-modal-quiz-progress.png

---

## Key Design Patterns to Implement

### Pattern 1: Educational Quiz Framing
- Multi-phase progress indicator ("Learn the Basics" → "Test Your Knowledge")
- Question counter within sections ("Question 1 of 3")
- "Check Answer" validation button
- Explanatory feedback after validation

### Pattern 2: Validation & Feedback
- "Check Answer" button for quiz mode
- Correct/incorrect visual feedback (green checkmark, red X)
- Brief explanation of correct answer when wrong
- Progress gated by validation for learning paths

### Pattern 3: Visual Selection Cards
- Illustration-based answer options
- Grid layout (2-4 options per row)
- Clear labels under each illustration
- Works well for categorical questions

### Pattern 4: Scale-Based Responses
- 0-10 numeric scale for NPS-style questions
- Labeled endpoints ("Not likely at all" ↔ "Extremely likely")
- Individual clickable numbers (not slider)

### Pattern 5: Modal/Overlay Assessments
- Modal overlay on relevant pages
- Dismissible but not accidentally closeable
- Progress bar within modal
- Maintains context of underlying page

---

## Visual Language Requirements

### Layout
- **Full-page**: Same pattern as Fit Check (centered, spacious)
- **Modal**: 600-700px max-width, centered overlay
- **Section progress**: Horizontal stepper showing phases
- **Question progress**: Linear bar or counter within sections

### Typography
- **Section headers**: Bold, descriptive ("Test Your Knowledge")
- **Questions**: Large, clear (24-28px)
- **Helper text**: Smaller, muted (14-16px)
- **Validation messages**: Highlighted, distinct from question

### Color & Contrast
- **Correct answers**: Green accent (success state)
- **Incorrect answers**: Red/orange accent (not alarming)
- **Selected state**: Strong accent color
- **Progress**: Accent color fill

### Interaction
- **Quiz mode**: Require "Check Answer" before advancing
- **Survey mode**: Allow immediate advance after selection
- **Validation**: Inline feedback, brief delay before retry
- **Milestone completion**: Celebration moment (confetti, badge)

---

## Implementation Requirements

### 1. AssessmentContainer Component
```tsx
interface AssessmentContainerProps {
  assessment: Assessment
  mode: 'quiz' | 'survey' | 'preference'
  onComplete: (results: AssessmentResults) => void
  className?: string
}

interface Assessment {
  id: string
  title: string
  description?: string
  phases?: Phase[]
  questions: Question[]
  scoring?: ScoringConfig
}

interface Question {
  id: string
  type: 'likert' | 'nps' | 'single' | 'visual' | 'multi' | 'binary'
  question: string
  helperText?: string
  options: Option[]
  correctAnswer?: string | string[] // For quiz mode
  explanation?: string
}
```

### 2. ValidationFeedback Component
```tsx
interface ValidationFeedbackProps {
  isCorrect: boolean
  correctAnswer?: string
  explanation?: string
  onContinue: () => void
  className?: string
}
```

### 3. AssessmentResults Component
```tsx
interface AssessmentResultsProps {
  score?: number
  totalQuestions?: number
  recommendations?: Recommendation[]
  badge?: Badge
  onRetake?: () => void
  onContinue: () => void
  className?: string
}
```

---

## Responsive Design

### Mobile (<768px)
- Full-width question area
- Stacked option cards (1 column)
- Modal becomes full-screen
- Larger touch targets (48px)

### Tablet (768-1024px)
- Centered content container
- 2-column grid for visual options
- Modal with proper overlay

### Desktop (>1024px)
- Max-width container (700px)
- Grid layouts for visual options
- Hover states on cards

---

## Deliverables

1. **Components**: All components listed in structure
2. **Assessment Types**: Support for quiz, survey, preference, recommender
3. **Input Components**: All input types (Likert, NPS, cards, visual, binary)
4. **Validation System**: Check answer, feedback, explanations
5. **Results Display**: Score, recommendations, badges
6. **Modal Variant**: Overlay assessment for contextual use
7. **Responsive**: All breakpoint variations working

---

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] All input types working (Likert, NPS, single, visual, multi, binary)
- [ ] Quiz mode with "Check Answer" validation
- [ ] Survey mode with auto-advance
- [ ] Correct/incorrect feedback displaying
- [ ] Score calculation working
- [ ] Results screen with recommendations
- [ ] Modal variant working
- [ ] Mobile responsive (test at 375px width)
- [ ] Tablet responsive (test at 768px width)
- [ ] Desktop responsive (test at 1280px width)
- [ ] Keyboard navigation works
- [ ] No TypeScript errors
- [ ] No linter errors

---

## Additional Context

- Build as a reusable component library
- Components should be composable for different assessment types
- Scoring engine should be server-side for validation
- Results should be storable in user profile
- Consider gamification: badges, streaks (future enhancement)
- Share results option (optional)

---

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing all reference images
3. Planning the component structure
4. Implementing core input components first (most reusable)
5. Building `AssessmentContainer` with state management
6. Adding `ValidationFeedback` for quiz mode
7. Implementing `AssessmentResults` display
8. Building `AssessmentModal` variant
9. Testing all assessment types thoroughly
