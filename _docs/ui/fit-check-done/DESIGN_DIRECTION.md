# Fit Check - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 12

---

## Design Vision

The Fit Check is a focused, single-question-per-screen assessment that determines visitor alignment with Movemental in approximately 60 seconds. The UI should feel confident, minimal, and respectful of user time—communicating that we value efficiency and self-selection over engagement metrics.

Drawing from Typeform's conversational flow, Hims' visual clarity, WeTransfer's bold introductions, Kajabi's contextual guidance, and HubSpot's educational framing, the synthesized approach prioritizes: **one question at a time, clear visual hierarchy, minimal chrome, and confident typography**. The experience should feel like a concise professional conversation, not a marketing funnel.

---

## Key Patterns Identified

### Pattern 1: Single Question Focus
- **Source(s)**: typeform-single-question-likert.png, typeform-nps-scale.png, hims-visual-selection-cards.png
- **What it solves**: Reduces cognitive load, creates forward momentum, prevents abandonment
- **Implementation guidance**: 
  - Display only one question at a time
  - Center the question vertically in the viewport
  - Use generous whitespace (40-60% of screen is breathing room)
  - Question number serves as subtle progress indicator ("1→")

### Pattern 2: Progress Visualization
- **Source(s)**: typeform-single-question-likert.png, hubspot-quiz-progress-validation.png, kajabi-modal-quiz-progress.png
- **What it solves**: Provides context of journey length, reduces uncertainty
- **Implementation guidance**:
  - Horizontal stepper/progress bar at top of screen
  - Show completion percentage or step count ("Question 1 of 6")
  - For Fit Check's 6 questions, use a simple linear progress bar
  - Optional: Include timer estimate ("~45s remaining") per documentation

### Pattern 3: Answer Cards (Visual Selection)
- **Source(s)**: hims-visual-selection-cards.png, typeform-single-question-likert.png, kajabi-modal-quiz-progress.png
- **What it solves**: Makes selection feel intentional, creates clear touch targets
- **Implementation guidance**:
  - Card-based answer options (not raw radio buttons)
  - Minimum 44px touch target height
  - Clear selected/unselected states
  - For text-only options: full-width cards with left-aligned text
  - For visual options: grid of image cards (Hims pattern)
  - Keyboard shortcuts (A, B, C...) as Typeform shows for power users

### Pattern 4: Bold Landing/Intro Screen
- **Source(s)**: wetransfer-quiz-landing-dark.png
- **What it solves**: Sets tone, explains value, invites participation
- **Implementation guidance**:
  - Strong headline with personality (serif or display font)
  - Subheadline explaining what user will learn/accomplish
  - Single CTA button ("Start the Fit Check" or "Begin Assessment")
  - Consider dark theme for distinction from main site
  - ~60 second time estimate prominently displayed

### Pattern 5: Contextual Helper Text
- **Source(s)**: kajabi-modal-quiz-progress.png, hubspot-quiz-progress-validation.png
- **What it solves**: Clarifies question intent without adding clutter
- **Implementation guidance**:
  - Brief subtext under question headline
  - Lighter weight, smaller size than question
  - Use sparingly—not every question needs it
  - Example: "Include both your social following and email list"

### Pattern 6: Keyboard Navigation Support
- **Source(s)**: typeform-single-question-likert.png, typeform-nps-scale.png
- **What it solves**: Speeds up completion for power users
- **Implementation guidance**:
  - Letter keys (A, B, C, D, E) for option selection
  - Enter to confirm/proceed
  - Show keyboard hints subtly near options
  - Navigation arrows for back/forward

### Pattern 7: Emotional/Mood Check-In
- **Source(s)**: `headspace-emotional-checkin.png`
- **What it solves**: Captures emotional state using visual metaphors, creates engaging entry point
- **Implementation guidance**:
  - Visual icon cards representing emotional states (weather metaphors: storm, cloudy, sunny)
  - 4 options in horizontal row
  - Each card: icon + short label ("Not great", "Okay", "Pretty Good", "Great")
  - Full-bleed gradient background (blue tones) for immersive feel
  - Top navigation shows progress steps ("Check In • Verify Insurance • Schedule appointment")
  - Pre-question text ("Before we get started...")

### Pattern 8: Binary Yes/No Selection
- **Source(s)**: `hims-binary-choice.png`
- **What it solves**: Simple, fast response for screening questions
- **Implementation guidance**:
  - Two large cards side by side
  - Clear icons (checkmark for Yes, X for No)
  - Minimal design—question and two options only
  - Back arrow for navigation
  - Ultra-clean layout with maximum whitespace

### Pattern 9: Radio List with Progress Stepper
- **Source(s)**: `hims-radio-list-stepper.png`
- **What it solves**: Handles questions with 5+ text options elegantly
- **Implementation guidance**:
  - Vertical list of radio card options
  - Each option: radio button + label, full-width card
  - Segmented progress bar at top (colored sections showing completion)
  - Question number ("9 of 21")
  - Helper text explaining why question is asked
  - Section label ("Your Health")

---

## Visual Language

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
- **Background**: Clean white or very light neutral (main flow) OR bold dark (intro screen)
- **Question text**: Near-black for maximum readability
- **Option cards**: Light background with clear borders
- **Selected state**: Strong accent color fill or border
- **Progress bar**: Accent color (blue/orange per brand)

### Interaction
- **Selection**: Immediate visual feedback on click/tap
- **Transitions**: Smooth slide or fade between questions (200-300ms)
- **Auto-advance**: Consider auto-advancing after selection (with brief delay)
- **Validation**: Inline, immediate for required fields
- **Back navigation**: Always available, never destructive

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| typeform-single-question-likert.png | Typeform | Single question, keyboard shortcuts, progress stepper | P1 |
| typeform-nps-scale.png | Typeform | NPS scale, labeled endpoints, keyboard navigation | P1 |
| hims-visual-selection-cards.png | Hims | Visual selection, illustration cards, minimal chrome | P1 |
| wetransfer-quiz-landing-dark.png | WeTransfer | Bold intro screen, dark theme, typography | P1 |
| headspace-emotional-checkin.png | Headspace | Mood check-in, visual icon cards, gradient background | P1 |
| hims-binary-choice.png | Hims | Binary Yes/No, large icon cards, minimal design | P1 |
| hims-radio-list-stepper.png | Hims | Radio list, segmented progress, helper text | P2 |
| kajabi-modal-quiz.png | Kajabi | Modal overlay, progress bar, checkmark selection | P2 |
| kajabi-modal-quiz-progress.png | Kajabi | Progress bar, helper text, card selection | P2 |
| hubspot-quiz-progress-validation.png | HubSpot | Multi-step progress, quiz validation, educational framing | P2 |
| wetransfer-quiz-landing.png | WeTransfer | Quiz intro, serif headline, CTA button | P2 |
| typeform-nps-scale.png | Typeform | 0-10 scale, endpoint labels, keyboard hint | P1 |

---

## Implementation Checklist

### Landing Screen
- [ ] Bold headline with Movemental voice
- [ ] Subheadline explaining 60-second assessment
- [ ] Time estimate badge ("~60 seconds")
- [ ] "Begin Fit Check" CTA button
- [ ] Consider dark theme option

### Question Screens
- [ ] Progress bar component (top, linear)
- [ ] Question counter ("Question 1 of 6")
- [ ] Single question display (centered, large type)
- [ ] Optional helper subtext
- [ ] Answer card components (text and/or visual variants)
- [ ] Keyboard shortcut indicators
- [ ] Navigation (back arrow, forward/OK button)

### Answer Types
- [ ] Likert scale (5-point: Definitely → Definitely Not)
- [ ] Numeric scale (0-10 NPS style)
- [ ] Visual selection (image + label cards)
- [ ] Single select radio cards

### Results Screens
- [ ] Fit Confirmed: celebration + next steps CTA
- [ ] Non-Fit: graceful exit + alternative resources
- [ ] Uncertain: additional context or learn more path

### Technical
- [ ] Keyboard navigation (A-E selection, Enter to confirm)
- [ ] Touch-friendly targets (minimum 44px)
- [ ] Smooth transitions between questions
- [ ] Progress state persistence (browser refresh recovery)
- [ ] Analytics events per question

---

## Open Questions

- Should the intro screen use dark theme to distinguish from main site?
- Auto-advance after selection, or require explicit "Next" action?
- Include actual timer countdown, or just estimate?
- How to handle "Uncertain" fit result—additional questions or defer to human?
- Should keyboard shortcuts be visible by default or only on desktop?

---

## Related Documentation

- `_docs/site-docs/02_fit_check.md` - Structural specification
- `_docs/ai-vision/05_implementation-checklist.md` - Implementation checklist (Phase 1)
- `_docs/ui/assessment-system/DESIGN_DIRECTION.md` - Shared patterns with assessment system

---

**Design Direction Status**: Ready for implementation
