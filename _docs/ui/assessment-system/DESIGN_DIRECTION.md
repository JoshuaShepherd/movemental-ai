# Assessment System - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 11

---

## Design Vision

The Assessment System extends beyond the initial Fit Check to provide ongoing evaluations, quizzes, and milestone tracking throughout the platform. While the Fit Check is a focused 60-second experience, the Assessment System supports longer, more educational assessments that may include validation, scoring, and progressive learning elements.

The design draws from Typeform's conversational elegance, HubSpot's educational quiz framing with validation, Hims' visual clarity, and Kajabi's contextual modal approach. The synthesized approach prioritizes: **progressive disclosure, educational context, validation feedback, and achievement recognition**.

---

## Key Patterns Identified

### Pattern 1: Educational Quiz Framing
- **Source(s)**: hubspot-quiz-progress-validation.png
- **What it solves**: Positions assessment as learning opportunity, not just filtering
- **Implementation guidance**:
  - Multi-phase progress indicator (e.g., "Learn the Basics" → "Test Your Knowledge" → "Take Action")
  - Question counter within sections ("Question 1 of 3")
  - "Check Answer" validation button for quiz-style assessments
  - Explanatory feedback after answer validation

### Pattern 2: Validation & Feedback
- **Source(s)**: hubspot-quiz-progress-validation.png
- **What it solves**: Provides learning moments, confirms understanding
- **Implementation guidance**:
  - "Check Answer" button rather than auto-advance for educational assessments
  - Correct/incorrect visual feedback (green checkmark, red X)
  - Brief explanation of correct answer when wrong
  - Progress gated by validation for learning paths

### Pattern 3: Visual Selection Cards
- **Source(s)**: hims-visual-selection-cards.png
- **What it solves**: Makes abstract concepts concrete, improves engagement
- **Implementation guidance**:
  - Illustration-based answer options for visual learners
  - Grid layout (2-4 options per row)
  - Clear labels under each illustration
  - Works well for categorical questions

### Pattern 4: Scale-Based Responses
- **Source(s)**: typeform-nps-scale.png
- **What it solves**: Captures nuanced responses, enables scoring
- **Implementation guidance**:
  - 0-10 numeric scale for NPS-style questions
  - Labeled endpoints ("Not likely at all" ↔ "Extremely likely")
  - Individual clickable numbers (not slider)
  - Consistent sizing for all scale options

### Pattern 5: Modal/Overlay Assessments
- **Source(s)**: kajabi-modal-quiz-progress.png, kajabi-modal-quiz.png
- **What it solves**: Contextual assessment without full page navigation
- **Implementation guidance**:
  - Modal overlay on relevant pages (e.g., pricing page recommender)
  - Dismissible (X button) but not accidentally closeable
  - Progress bar within modal
  - Maintains context of underlying page
  - "QUESTION X OF Y" label with progress indicator
  - "NEXT QUESTION" CTA button

### Pattern 6: Emotional/Mood Assessment
- **Source(s)**: `headspace-emotional-checkin.png`
- **What it solves**: Captures emotional/psychological state using visual metaphors
- **Implementation guidance**:
  - Visual icon cards (weather metaphors: storm → sun)
  - Horizontal layout of 4 options
  - Immersive gradient background
  - Works well for wellness, mindset, or satisfaction checks
  - Can be used as assessment opener or periodic check-in

### Pattern 7: Binary Screening Questions
- **Source(s)**: `hims-binary-choice.png`
- **What it solves**: Fast Yes/No screening for eligibility or branching
- **Implementation guidance**:
  - Two large cards with clear icons
  - Minimal UI—question and options only
  - Use for qualification gates or branching logic
  - Can trigger different assessment paths based on answer

### Pattern 8: Multi-Option Radio Lists
- **Source(s)**: `hims-radio-list-stepper.png`
- **What it solves**: Handles demographic or categorical questions with many options
- **Implementation guidance**:
  - Vertical stack of radio card options
  - Segmented progress bar showing completion
  - Question counter and section labels
  - Helper text explaining sensitivity or purpose

### Pattern 9: Quiz Landing/Intro Screen
- **Source(s)**: `wetransfer-quiz-landing.png`
- **What it solves**: Sets expectations and invites participation
- **Implementation guidance**:
  - Bold serif headline (personality/brand voice)
  - Description of what user will learn/accomplish
  - Question count or time estimate
  - Single "Start the quiz" CTA
  - Can use dark theme for distinction

---

## Visual Language

### Layout
- **Full-page assessments**: Same pattern as Fit Check (centered, spacious)
- **Modal assessments**: 600-700px max-width, centered overlay
- **Section progress**: Horizontal stepper showing phases
- **Question progress**: Linear bar or counter within sections

### Typography
- **Section headers**: Bold, descriptive (e.g., "Test Your Knowledge")
- **Questions**: Large, clear (24-28px)
- **Helper text**: Smaller, muted (14-16px)
- **Validation messages**: Highlighted, distinct from question text

### Color & Contrast
- **Correct answers**: Green accent (success state)
- **Incorrect answers**: Red/orange accent (error state, not alarming)
- **Selected state**: Strong accent color
- **Progress**: Accent color fill

### Interaction
- **Quiz mode**: Require "Check Answer" before advancing
- **Survey mode**: Allow immediate advance after selection
- **Validation**: Inline feedback, brief delay before allowing retry
- **Milestone completion**: Celebration moment (confetti, badge reveal)

---

## Assessment Types

### Type 1: Knowledge Quiz
- Educational framing, validation required
- Explanations for wrong answers
- Score at completion
- **Reference**: hubspot-quiz-progress-validation.png

### Type 2: Self-Assessment
- Reflective questions, no right/wrong
- Likert or scale responses
- Results generate recommendations
- **Reference**: typeform-single-question-likert.png, typeform-nps-scale.png

### Type 3: Visual Preference
- Image-based selection
- Personality/style determination
- Fun, engaging tone
- **Reference**: hims-visual-selection-cards.png

### Type 4: Contextual Recommender
- Modal overlay on decision pages
- Brief (2-4 questions)
- Surfaces recommendation
- **Reference**: kajabi-modal-quiz-progress.png

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| typeform-single-question-likert.png | Typeform | Likert scale, single question focus | P1 |
| typeform-nps-scale.png | Typeform | NPS scale, labeled endpoints | P1 |
| hubspot-quiz-progress-validation.png | HubSpot | Quiz validation, educational progress, check answer | P1 |
| headspace-emotional-checkin.png | Headspace | Mood check-in, visual icons, gradient background | P1 |
| hims-visual-selection-cards.png | Hims | Visual selection, illustration cards | P2 |
| hims-binary-choice.png | Hims | Binary Yes/No, screening questions | P2 |
| hims-radio-list-stepper.png | Hims | Radio list, segmented progress, helper text | P2 |
| kajabi-modal-quiz-progress.png | Kajabi | Modal overlay, progress bar, contextual | P2 |
| kajabi-modal-quiz.png | Kajabi | Modal quiz, checkmark selection, next button | P2 |
| wetransfer-quiz-landing.png | WeTransfer | Quiz intro, serif headline, dark theme | P2 |
| typeform-nps-scale.png | Typeform | 0-10 scale, endpoint labels | P1 |

---

## Implementation Checklist

### Core Components
- [ ] Assessment container (full-page and modal variants)
- [ ] Progress stepper (multi-phase)
- [ ] Question counter ("Question X of Y")
- [ ] Question display component
- [ ] Helper text component

### Answer Types
- [ ] Single-select card (text)
- [ ] Single-select card (image + text)
- [ ] Likert scale (5-point)
- [ ] Numeric scale (0-10)
- [ ] Multi-select checkboxes

### Validation
- [ ] "Check Answer" button component
- [ ] Correct answer feedback (green, checkmark)
- [ ] Incorrect answer feedback (red/orange, explanation)
- [ ] "Try Again" or "Continue" actions

### Results & Completion
- [ ] Score calculation and display
- [ ] Results summary screen
- [ ] Recommendation cards (based on results)
- [ ] Milestone badge award animation
- [ ] Share results option (optional)

### Technical
- [ ] Progress state persistence
- [ ] Analytics per question and per assessment
- [ ] Scoring engine (server-side validation)
- [ ] Results storage in user profile

---

## Open Questions

- How to handle assessment retakes—allow unlimited, or gate?
- Should scores be visible during assessment, or only at end?
- Integration with course enrollment—prerequisite assessments?
- Gamification level—badges, streaks, leaderboards?

---

## Related Documentation

- `_docs/ui/fit-check/DESIGN_DIRECTION.md` - Shared patterns with Fit Check
- `_docs/ai-vision/05_implementation-checklist.md` - Implementation checklist (Phase 4, Item 16)
- `_docs/site-docs/02_fit_check.md` - Initial assessment pattern

---

**Design Direction Status**: Ready for implementation
