# AI Book Reading - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 2

---

## Design Vision

The AI Book Reading experience should prioritize **comfortable, distraction-free reading** while enabling AI-enhanced features (highlights, notes, contextual information) without disrupting the reading flow. The interface should feel more like a well-designed book than a software application—clean typography, generous margins, and thoughtful hierarchy that makes long-form content a pleasure to consume.

The Framer and Medium references demonstrate professional article typography that translates well to book reading: clear H2 headings, readable body text with comfortable line height, proper use of bullet points, italic emphasis for key terms, and inline links. These patterns establish a foundation for text-heavy content presentation with reading time indicators and audio options.

---

## Key Patterns Identified

### Pattern 1: Longform Article Typography
- **Source(s)**: `framer-article-typography.png`
- **What it solves**: Makes dense, text-heavy content readable and scannable
- **Implementation guidance**:
  - **H2 section headers**: Bold, clear hierarchy (24-32px), with generous top margin
  - **Body paragraphs**: 16-18px, line-height 1.6-1.8, max-width ~700px
  - **Bullet lists**: Proper indentation, consistent markers, comfortable spacing
  - **Italic emphasis**: For key terms, questions, or highlighted concepts ("*not* going to help you")
  - **Section spacing**: 40-60px between major sections
  - **Reading width**: Constrained to ~65-75 characters per line for optimal readability

**Typography hierarchy example**:
```
# Chapter Title (40-48px, bold)
## Section Header (24-32px, bold)
Body paragraph text (16-18px, regular)
• Bullet point item (16-18px, proper indent)
*Emphasized text* (italic for key terms)
```

### Pattern 2: Medium Article Reading Experience
- **Source(s)**: `medium-article-typography.png`
- **What it solves**: Professional reading interface with audio option and time estimate
- **Implementation guidance**:
  - Clean, centered reading column
  - Inline links styled distinctively (underlined, accent color)
  - Reading time indicator ("4 min 3 s remaining")
  - Audio player option for text-to-speech
  - Comfortable paragraph spacing
  - Book/article title references in italics (e.g., "_Meditations_")
  - Pull quotes or block quotes with distinct styling

---

## Visual Language

### Layout
- **Reading column**: Centered, max-width 700-800px
- **Margins**: Generous (80-120px top/bottom on desktop)
- **Section breaks**: Visual whitespace, optional subtle divider
- **Mobile**: Full-width with padding, adjusted font sizes

### Typography
- **Chapter titles**: 40-48px, bold, centered or left-aligned
- **Section headers (H2)**: 24-32px, bold, clear top margin (60-80px)
- **Subsection headers (H3)**: 18-22px, semibold
- **Body text**: 16-18px, regular weight, line-height 1.6-1.8
- **Bullet lists**: 16-18px, left indent, consistent bullet style
- **Emphasized text**: Italic for terms, questions, key concepts
- **Font family**: System serif or readable sans-serif (Georgia, Merriweather, Inter)

### Color & Contrast
- **Background**: White or very light cream (#fafafa or similar)
- **Body text**: Near-black (#1a1a1a or #222)
- **Headers**: Slightly darker or same as body
- **Links**: Accent color (blue), underline on hover
- **Highlights**: Light yellow or accent tint (for AI-highlighted passages)

### Interaction
- **Text selection**: Standard selection for highlighting
- **AI highlights**: Subtle background tint on AI-suggested passages
- **Margin notes**: Slide-in or tooltip on hover/tap
- **Chapter navigation**: Sticky header or sidebar (optional)
- **Reading progress**: Subtle progress indicator (top bar or scroll position)

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| `framer-article-typography.png` | Framer | H2 headers, body text, bullet lists, italic emphasis, section spacing | P1 |
| `medium-article-typography.png` | Medium | Inline links, audio player, reading time, paragraph spacing | P1 |

---

## Implementation Checklist

### Core Typography
- [ ] Define reading typography scale (H1, H2, H3, body, bullets)
- [ ] Create `ReadingContainer` component with proper max-width
- [ ] Implement comfortable line-height and letter-spacing
- [ ] Add proper spacing between sections
- [ ] Style bullet/numbered lists with consistent indentation

### Content Components
- [ ] Create `ChapterHeader` component
- [ ] Create `SectionHeader` (H2) component with top margin
- [ ] Create `ReadingParagraph` component with proper styling
- [ ] Create `ReadingList` component for bullet/numbered items
- [ ] Create `Emphasis` component for italic/highlighted terms

### AI Features (Future)
- [ ] Create `AIHighlight` component for suggested passages
- [ ] Create `MarginNote` component for AI annotations
- [ ] Create `ContextPanel` for definitions/explanations
- [ ] Implement non-intrusive AI suggestion indicators

### Reading Experience
- [ ] Add reading progress indicator
- [ ] Add reading time estimate ("X min remaining")
- [ ] Implement audio player option (text-to-speech)
- [ ] Implement chapter/section navigation
- [ ] Create table of contents sidebar (collapsible)
- [ ] Add bookmark/save functionality
- [ ] Implement responsive typography scaling

### Accessibility
- [ ] Ensure proper heading hierarchy
- [ ] Add skip-to-content links
- [ ] Test with screen readers
- [ ] Implement text size adjustment option
- [ ] Ensure sufficient color contrast

---

## Open Questions

- Should we use a serif or sans-serif font for body text?
- Do we want a dark mode / reader mode option?
- How prominent should AI features be vs. staying out of the way?
- Should chapter navigation be a sidebar, header dropdown, or bottom sheet?
- Do we integrate with physical book experience (page numbers, chapter references)?
- How do we handle multimedia content (images, diagrams) within reading flow?

---

## Related Features

- **content-workbench**: Authoring side of the reading experience
- **ai-book-landing**: Entry point before reading begins
- **why-movemental**: Similar longform typography patterns

---

**Design Direction Status**: Ready for implementation (typography and reading experience patterns established)
