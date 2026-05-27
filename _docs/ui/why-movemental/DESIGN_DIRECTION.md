# Why Movemental - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 2

---

## Design Vision

The "Why Movemental" page makes the case for the platform—communicating vision, mission, and value proposition through compelling storytelling. The design should feel **inspiring, credible, and emotionally resonant**, using narrative techniques to connect with visitors on both logical and emotional levels. The interface should guide readers through a story that builds conviction.

The reference images show long-form narrative content with compelling statistics, gradient backgrounds, and section navigation (Kajabi), plus clean narrative typography (Framer). These patterns support scrollytelling and persuasive content presentation.

---

## Key Patterns Identified

### Pattern 1: Long-form Narrative with Statistics Callouts
- **Source(s)**: `kajabi-longform-stats-callout.png`
- **What it solves**: Makes data memorable and supports narrative arguments
- **Implementation guidance**:
  - **Section navigation tabs** at top:
    - INTRO | PART I | PART II | PART III | OUTRO
    - Active tab highlighted (filled button)
    - Horizontal centered navigation
  - **Large statistics callout**:
    - Oversized number (66%) with decorative elements
    - Bold complementary text explaining the stat
    - Gradient background (yellow → pink/green)
    - Money/relevant icons as decoration
  - **Body paragraphs**:
    - Bold lead sentences for emphasis
    - Regular weight follow-up text
    - Inline footnote references (superscript)
  - Gradient sections break up content
  - Each section builds narrative arc

### Pattern 2: Narrative Typography
- **Source(s)**: `framer-narrative-typography.png` (from why-movemental-done)
- **What it solves**: Creates elegant, readable long-form content
- **Implementation guidance**:
  - Large serif or clean sans-serif headlines
  - Generous line-height (1.6-1.8)
  - Optimal line length (60-80 characters)
  - Pull quotes for emphasis
  - Subheadings to break sections
  - Whitespace between paragraphs

---

## Visual Language

### Layout
- **Section navigation**: Sticky or fixed at top during scroll
- **Content width**: Narrower for readability (700-800px)
- **Statistics callouts**: Full-width or card-style breakouts
- **Gradient sections**: Span full width, content centered
- **Whitespace**: Generous between sections

### Typography
- **Statistics numbers**: 80-120px, bold, display font
- **Stat context text**: 32-48px, bold
- **Body lead sentences**: Bold, slightly larger
- **Body text**: 18-20px, comfortable reading size
- **Navigation tabs**: 12-14px, uppercase, pill-style buttons
- **Footnotes**: Superscript, smaller

### Color & Contrast
- **Gradient backgrounds**: 
  - Yellow → Green/Teal
  - Blue → Purple
  - Pink → Orange
- **Statistics text**: Dark on gradient (purple/blue on yellow)
- **Body text**: Dark gray or near-black on white
- **Navigation active**: Filled button (blue/dark)
- **Navigation inactive**: Outlined or ghost

### Interaction
- **Section navigation**: Click jumps to section
- **Scroll progress**: Optional indicator
- **Footnotes**: Hover or click for reference
- **Statistics**: May animate in on scroll
- **Parallax**: Subtle effects on gradient sections

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| `kajabi-longform-stats-callout.png` | Kajabi | Section nav tabs, large statistics, gradient background, narrative flow | P1 |
| `framer-narrative-typography.png` | Framer | Long-form typography, pull quotes, whitespace | P1 |

---

## Implementation Checklist

### Section Navigation
- [ ] Create `SectionNav` component with pill-style tabs
- [ ] Implement scroll-to-section on click
- [ ] Add active state tracking based on scroll position
- [ ] Make sticky/fixed on scroll (optional)

### Statistics Callouts
- [ ] Create `StatisticsCallout` component
- [ ] Support large number + context text layout
- [ ] Add gradient background variants
- [ ] Include decorative icon support
- [ ] Implement scroll-triggered animation (optional)

### Narrative Content
- [ ] Create `NarrativeSection` component
- [ ] Style body text with bold lead sentences
- [ ] Add footnote/reference support
- [ ] Create `PullQuote` component
- [ ] Implement gradient section backgrounds

### Page Structure
- [ ] Create `WhyMovementalPage` layout
- [ ] Define section structure (Intro, Parts I-III, Outro)
- [ ] Add scroll progress indicator (optional)
- [ ] Implement smooth scroll between sections

---

## Open Questions

- What is the complete narrative structure for "Why Movemental"?
- Should statistics animate in on scroll?
- Do we need footnote/citation management?
- Is there a video component to the story?
- Should sections be individually shareable?

---

## Related Features

- **homepage**: Value proposition sections may share patterns
- **ai-book-reading**: Long-form reading patterns
- **team-credibility**: Trust-building content

---

**Design Direction Status**: Foundation established (content strategy needed before full implementation)
