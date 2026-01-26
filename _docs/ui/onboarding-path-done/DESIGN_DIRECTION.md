# Onboarding Path - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 10

---

## Design Vision

The Onboarding Path is a timeline visualization that shows visitors what happens after Fit Confirmed—the 3-4 week journey from initial discovery to platform launch. Unlike the transactional Fit Check, the Onboarding Path communicates a collaborative journey with clear phases and expectations.

Drawing from WeTransfer's bold introductions and Hims' visual selection patterns, the synthesized approach prioritizes: **bold visual clarity, phase-based progression, and inviting entry points**. The experience should feel like receiving a roadmap to success, not a to-do list.

---

## Key Patterns Identified

### Pattern 1: Bold Landing/Intro
- **Source(s)**: wetransfer-landing-intro.png
- **What it solves**: Sets confident tone, invites engagement
- **Implementation guidance**:
  - Strong headline framing the journey ("Your Path to Platform Launch")
  - Subheadline with time commitment ("3-4 weeks from fit to live")
  - Single CTA to begin or explore phases
  - Consider distinctive visual treatment (dark theme, bold typography)

### Pattern 2: Visual Selection/Phase Cards
- **Source(s)**: hims-visual-selection-cards.png
- **What it solves**: Makes phases tangible, creates visual hierarchy
- **Implementation guidance**:
  - Each phase as a visual card with icon/illustration
  - Phase title and brief description
  - Time estimate per phase
  - Expandable for detailed activities
  - Visual progression indicator connecting phases

### Pattern 3: Step Process Cards (Dark Variant)
- **Source(s)**: `framer-step-cards-process.png`
- **What it solves**: Explains the onboarding process in a scannable, numbered format
- **Implementation guidance**:
  - Dark background section for visual impact and contrast
  - Bold headline above cards (white text, centered)
  - 3-column card layout (stacks on mobile)
  - Each card: Accent icon, bold title, description paragraph
  - First card can include primary CTA button
  - Sequential flow implied by horizontal arrangement
  - Icons use accent color (cyan/teal) for visibility on dark background
  - Cards can represent: "Sign up" → "Get verified" → "Start building"

### Pattern 4: Numbered Step Cards (Light Variant)
- **Source(s)**: `wise-numbered-steps.png`
- **What it solves**: Clear "how it works" explanation with numbered sequence
- **Implementation guidance**:
  - Light/neutral background (light gray or off-white)
  - Bold all-caps headline ("HOW [X] WORKS")
  - 3-column card layout
  - Each card: Large number (1, 2, 3), bold title, description paragraph
  - Numbers in accent color or bold black
  - Cards have white background with subtle shadow/border
  - Final CTA button below cards ("Give it a go")
  - Good for explaining any multi-step process

### Pattern 5: Email Verification State
- **Source(s)**: `framer-email-verification.png`
- **What it solves**: Confirms action and guides next step during onboarding
- **Implementation guidance**:
  - Centered, minimal layout
  - Icon (email/checkmark) above headline
  - Bold headline ("Check your inbox")
  - Subtext with instructions (check spam folder, etc.)
  - Clean white background
  - No distraction—focus on single action

### Pattern 6: Team Creation Form
- **Source(s)**: `framer-team-creation-form.png`
- **What it solves**: Captures team/organization info during onboarding
- **Implementation guidance**:
  - Centered single-field form
  - Bold headline ("Create new team")
  - Subtext explaining purpose
  - Single text input (team name)
  - Prominent CTA button ("Create team")
  - Minimal design—one task at a time

### Pattern 7: Welcome Modal with App Tour
- **Source(s)**: `framer-welcome-modal-tour.png`
- **What it solves**: Introduces platform features to new users
- **Implementation guidance**:
  - Modal overlay on main interface
  - Image preview showing product
  - Bold headline ("Welcome to [Platform]")
  - Description paragraph
  - Dual-action buttons ("Take the Tour", dismiss)
  - Can be triggered on first login

### Pattern 8: Template Selection Grid
- **Source(s)**: `framer-template-selection-grid.png`
- **What it solves**: Helps users choose starting point during setup
- **Implementation guidance**:
  - Bold headline ("Choose your Starting Point")
  - Subtext explaining customization
  - 4-column card grid
  - Each card: Angled preview image, title, subtitle
  - Cards show different template types
  - Click selects and proceeds

### Pattern 9: Tutorials Sidebar
- **Source(s)**: `framer-tutorials-sidebar.png`
- **What it solves**: Provides learning resources during onboarding
- **Implementation guidance**:
  - Sidebar with categorized tutorials
  - Video Tutorials section with thumbnails
  - Each video: Thumbnail, title, duration
  - Help Articles section
  - Component categories (Layout, Navigation, etc.)
  - Search at top
  - Collapsible sections

### Pattern 10: Dashboard Nudge Popup
- **Source(s)**: `framer-dashboard-nudge-popup.png`
- **What it solves**: Re-engages users who haven't completed onboarding
- **Implementation guidance**:
  - Small popup/tooltip on dashboard
  - Headline ("Watch and learn")
  - Description of benefit
  - Dual actions ("Start App Tour", "Dismiss")
  - Non-blocking—user can continue
  - Positioned near relevant feature

---

## Visual Language

### Layout
- **Hero section**: Bold intro with timeline preview
- **Timeline**: Vertical (mobile) or horizontal (desktop) visualization
- **Phase cards**: Expandable accordion or modal detail view
- **CTA placement**: After timeline overview, within each phase

### Typography
- **Headlines**: Bold, confident (32-48px display font)
- **Phase titles**: Clear hierarchy (24-28px)
- **Descriptions**: Readable body copy (16-18px)
- **Time estimates**: Badge or tag style

### Color & Contrast
- **Timeline connector**: Accent color line
- **Phase indicators**: Numbered or icon-based
- **Completed phases**: Filled/checkmarked (for returning users)
- **Current phase**: Highlighted, prominent
- **Future phases**: Slightly muted but visible

### Interaction
- **Phase expansion**: Click to reveal detailed activities
- **Progress tracking**: Visual indication of completed vs. upcoming
- **CTA progression**: Phase-specific actions where appropriate

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| wetransfer-landing-intro.png | WeTransfer | Bold intro, typography, CTA | P1 |
| wise-numbered-steps.png | Wise | Numbered steps, "how it works", light variant | P1 |
| hims-visual-selection-cards.png | Hims | Visual cards, clean selection UI | P2 |
| framer-step-cards-process.png | Framer | Dark step cards, 3-column, icons + CTA | P2 |
| framer-email-verification.png | Framer | Email verification, centered minimal, single action | P1 |
| framer-team-creation-form.png | Framer | Team creation, single-field form, centered | P1 |
| framer-welcome-modal-tour.png | Framer | Welcome modal, app tour, dual actions | P1 |
| framer-template-selection-grid.png | Framer | Template grid, starting point selection | P1 |
| framer-tutorials-sidebar.png | Framer | Tutorial sidebar, video list, help articles | P2 |
| framer-dashboard-nudge-popup.png | Framer | Dashboard popup, re-engagement, nudge | P2 |

---

## Implementation Checklist

### Hero Section
- [ ] Bold headline ("Your Path to Platform Launch")
- [ ] Subheadline with timeline overview
- [ ] Time commitment badge ("3-4 weeks")
- [ ] Visual preview of timeline

### Timeline Visualization
- [ ] Vertical timeline component (mobile-first)
- [ ] Horizontal timeline component (desktop enhancement)
- [ ] Phase connector lines
- [ ] Phase number/icon indicators

### Phase Cards
- [ ] Phase 1: Discovery & Vision (Week 1)
  - [ ] Icon/illustration
  - [ ] Description
  - [ ] Key activities list
  - [ ] Time estimate
- [ ] Phase 2: Content Research (Week 1-2)
  - [ ] Same structure
- [ ] Phase 3: Platform Architecture (Week 2)
  - [ ] Same structure
- [ ] Phase 4: Network Integration & Launch (Week 3-4)
  - [ ] Same structure

### Progress Tracking (Returning Users)
- [ ] Completed phase visual treatment
- [ ] Current phase highlight
- [ ] Future phase preview

### CTAs
- [ ] "Start Your Journey" (main CTA)
- [ ] Phase-specific CTAs (if applicable)
- [ ] "Schedule Discovery Call" or equivalent

---

## Open Questions

- Should phases be expandable inline or link to detail pages?
- How to handle users returning mid-onboarding—show progress?
- Include testimonials or success stories per phase?
- Integrate with actual onboarding system or purely informational?

---

## Related Documentation

- `_docs/site-docs/04_onboarding_path_overview.md` - Content specification
- `_docs/ai-vision/05_implementation-checklist.md` - Implementation checklist (Phase 1, Item 3)
- `_docs/ui/fit-check/DESIGN_DIRECTION.md` - Precedes onboarding path in user flow

---

**Design Direction Status**: Ready for implementation (step cards pattern added for process visualization)
