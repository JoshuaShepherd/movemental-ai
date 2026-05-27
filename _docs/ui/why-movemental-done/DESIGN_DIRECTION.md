# Why Movemental - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 1

---

## Design Vision

The "Why Movemental" section is a **narrative experience** that communicates the platform's purpose, philosophy, and differentiation. Unlike transactional pages, this is about storytelling—using typography as the primary visual element to create rhythm, emphasis, and emotional resonance.

The Framer reference demonstrates "narrative typography": large-scale text with intentional contrast between bold and light weights, creating a reading experience that feels more like a manifesto than a marketing page. This approach works well for mission-driven platforms where "why" matters as much as "what."

---

## Key Patterns Identified

### Pattern 1: Narrative Typography with Emphasis
- **Source(s)**: `framer-narrative-typography.png`
- **What it solves**: Communicates story/philosophy through text as a visual medium
- **Implementation guidance**:
  - Large-scale typography (40-64px for statements)
  - **Bold** for key phrases that anchor meaning
  - Light/gray for supporting context
  - Sentence structure that supports scanning (bold words form a coherent phrase alone)
  - Generous line-height (1.3-1.5) and letter-spacing
  - Minimal to no imagery—text IS the design
  - Progressive reveal possible (scroll-triggered animation)

**Example**:
> **Over the years,** Framer has evolved from a simple JavaScript library into a full-blown web design platform. Focused on helping you ship your ideas every step of the way.

The bold words form a scannable summary: "Over the years... every step of the way."

---

## Visual Language

### Layout
- **Full-width text blocks**, centered
- **Max-width**: 900-1100px for comfortable reading
- **Generous vertical padding** between statements (100-200px)
- **Optional**: Alternating alignment (centered → left → centered) for rhythm

### Typography
- **Primary statement**: 48-64px, mixed bold/light
- **Supporting text**: 18-24px, regular weight, muted color
- **Line-height**: 1.3-1.5 for large text
- **Font**: System or modern sans-serif (Inter, Neue Haas, etc.)

### Color & Contrast
- **Bold text**: Full black (#000) or near-black
- **Light text**: Medium gray (#666-#888)
- **Background**: White or very light gray
- **Accent**: Minimal—one color for links if needed

### Interaction
- **Scroll-triggered animation**: Fade in + slight translate on reveal (optional)
- **No hover states** on text—this is a reading experience
- **Progress indicator** if page is long (optional)

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| `framer-narrative-typography.png` | Framer | Bold/light contrast, large-scale text, scannable emphasis | P1 |

---

## Implementation Checklist

- [ ] Create `NarrativeStatement` component with bold/light text support
- [ ] Support rich text or markdown for bold formatting
- [ ] Create `WhySection` layout component with proper spacing
- [ ] Add scroll-triggered fade animation (Framer Motion or CSS)
- [ ] Ensure responsive text scaling (clamp or viewport units)
- [ ] Test readability on mobile (font size, line length)
- [ ] Consider progress indicator for long-form version

---

## Open Questions

- How many narrative statements/sections do we need?
- Should this be a single long-scroll page or multi-section with navigation?
- Do we incorporate any visuals (illustrations, photos) or stay text-only?
- Should there be a final CTA, or does this page flow into another section?
- What's the actual content/story we're telling? (Need content draft)
