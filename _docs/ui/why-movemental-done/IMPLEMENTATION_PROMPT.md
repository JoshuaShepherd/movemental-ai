# Implementation Request: Why Movemental

## Context

I need to implement the **Why Movemental** UI section for the Movemental.ai platform. This is a narrative experience that communicates the platform's purpose, philosophy, and differentiation through typography-focused storytelling.

---

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/why-movemental/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/why-movemental/reference-images/`
  - `framer-narrative-typography.png` - Bold/light contrast, large-scale text, scannable emphasis

### Content Specification
- `_docs/site-docs/03_why_movemental_longform.md` - Content requirements and copy

### Implementation Context
- `_docs/ai-vision/05_implementation-checklist.md` - Overall implementation checklist
- `_docs/ai-vision/04_ui-ux-proposal.md` - UI/UX proposal details

---

## Tech Stack Requirements

Implement using the established Movemental stack:
- **Next.js 15** with App Router
- **TypeScript** with strict mode
- **shadcn/ui** components (do NOT modify `components/ui/`)
- **Tailwind CSS** for styling
- **Framer Motion** for scroll animations (optional)
- **Lucide React** for icons (if needed)

---

## Component Structure

```
components/
├── why-movemental/
│   ├── WhyMovementalContainer.tsx    # Main page container
│   ├── NarrativeStatement.tsx        # Bold/light text statement component
│   ├── NarrativeSection.tsx          # Section wrapper with spacing
│   ├── ScrollProgress.tsx            # Optional progress indicator
│   └── index.ts                      # Barrel export
```

---

## Page Structure

```
app/
├── (public)/
│   └── why-movemental/
│       └── page.tsx                  # Public narrative page
```

---

## Key Design Patterns to Implement

### Pattern 1: Narrative Typography with Emphasis
From `framer-narrative-typography.png`:
- Large-scale typography (40-64px for statements)
- **Bold** for key phrases that anchor meaning
- Light/gray for supporting context
- Sentence structure supports scanning (bold words form coherent phrase alone)
- Generous line-height (1.3-1.5) and letter-spacing
- Minimal to no imagery—text IS the design

**Example markup:**
```tsx
<NarrativeStatement>
  <strong>Over the years,</strong> Movemental has evolved from a simple idea 
  into a comprehensive platform. <strong>Focused on helping movement leaders 
  ship their vision</strong> every step of the way.
</NarrativeStatement>
```

---

## Visual Language Requirements

### Layout
- Full-width text blocks, centered
- Max-width: 900-1100px for comfortable reading
- Generous vertical padding between statements (100-200px)
- Optional: Alternating alignment for rhythm

### Typography
- **Primary statement**: 48-64px, mixed bold/light weights
- **Supporting text**: 18-24px, regular weight, muted color
- **Line-height**: 1.3-1.5 for large text
- **Font**: Use project's configured font (Inter or similar)

### Color & Contrast
- **Bold text**: Full black (#000) or near-black
- **Light text**: Medium gray (text-muted-foreground)
- **Background**: White or very light gray
- **Accent**: Minimal—one color for links if needed

### Interaction
- **Scroll-triggered animation**: Fade in + slight translate on reveal
- **No hover states** on text—this is a reading experience
- **Progress indicator** if page is long (optional)

---

## Implementation Requirements

### 1. NarrativeStatement Component
```tsx
interface NarrativeStatementProps {
  children: React.ReactNode
  className?: string
  alignment?: 'center' | 'left' | 'right'
}
```
- Parse children to handle `<strong>` tags for bold emphasis
- Support markdown or rich text input
- Responsive text scaling using `clamp()` or viewport units

### 2. Scroll Animation
- Fade in from opacity 0 → 1
- Slight translateY (20px → 0)
- Stagger if multiple statements in view
- Use Intersection Observer or Framer Motion

### 3. Responsive Design
- **Mobile**: 24-32px statement text, full-width padding
- **Tablet**: 36-48px statement text
- **Desktop**: 48-64px statement text, max-width container

---

## Content Structure (from site-docs)

Reference `_docs/site-docs/03_why_movemental_longform.md` for:
- Opening statement
- Philosophy/mission sections
- Differentiator statements
- Closing CTA or transition

---

## Deliverables

1. **Components**: `NarrativeStatement`, `NarrativeSection`, `WhyMovementalContainer`
2. **Page**: `/why-movemental` route with full narrative
3. **Animations**: Scroll-triggered reveal animations
4. **Responsive**: All breakpoint variations working
5. **Content**: Hardcoded content from site-docs (for now)

---

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] Narrative typography with bold/light contrast working
- [ ] Mobile responsive (test at 375px width)
- [ ] Tablet responsive (test at 768px width)
- [ ] Desktop responsive (test at 1280px width)
- [ ] Scroll animations smooth and performant
- [ ] Keyboard navigation works (if interactive elements)
- [ ] No TypeScript errors
- [ ] No linter errors
- [ ] Content matches site-docs specification
- [ ] Text is readable and scannable at all sizes

---

## Additional Context

- This page follows the Fit Check in the user journey (fit confirmed → why movemental)
- Should feel like a manifesto, not a marketing page
- Typography is the hero—no complex imagery needed
- Consider dark/light theme variants for impact
- May include a final CTA to continue to onboarding path

---

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing the `framer-narrative-typography.png` reference image
3. Planning the component structure
4. Implementing the `NarrativeStatement` component first
5. Building mobile-first, then enhancing for larger screens
6. Adding scroll animations last
7. Testing thoroughly at all breakpoints
