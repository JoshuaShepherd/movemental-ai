# Implementation Request: Team & Credibility

## Context

I need to implement the **Team & Credibility** UI section for the Movemental.ai platform. This section humanizes the platform while demonstrating track record through timelines, team profiles, network visualizations, and testimonials.

---

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/team-credibility/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/team-credibility/reference-images/`
  - `framer-timeline-milestones.png` - Horizontal timeline with year markers and icons
  - `framer-testimonial-quote.png` - Full-bleed testimonial with avatar and quote
  - `framer-network-visualization.png` - Radial avatar constellation, community proof
  - `framer-careers-page.png` - Gradient hero, culture messaging, social sidebar

### Content Specification
- `_docs/site-docs/05_team_and_credibility.md` - Content requirements and copy

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
- **Framer Motion** for animations
- **Lucide React** for icons

---

## Component Structure

```
components/
├── team-credibility/
│   ├── TeamCredibilityContainer.tsx  # Main page container
│   ├── Timeline.tsx                  # Horizontal/vertical timeline
│   ├── TimelineMilestone.tsx         # Individual milestone item
│   ├── NetworkVisualization.tsx      # Avatar constellation component
│   ├── NetworkAvatar.tsx             # Individual avatar with hover
│   ├── TestimonialQuote.tsx          # Full-bleed testimonial section
│   ├── TestimonialCarousel.tsx       # Multiple testimonials (optional)
│   ├── TeamGrid.tsx                  # Team member grid layout
│   ├── TeamMemberCard.tsx            # Individual team member card
│   ├── GradientHero.tsx              # Warm gradient hero section
│   └── index.ts                      # Barrel export
```

---

## Page Structure

```
app/
├── (public)/
│   └── team/
│       └── page.tsx                  # Public team/credibility page
│   └── about/
│       └── page.tsx                  # Alternative route (about us)
```

---

## Key Design Patterns to Implement

### Pattern 1: Horizontal Timeline with Milestones
From `framer-timeline-milestones.png`:
- Horizontal layout on desktop; vertical stack on mobile
- Each milestone: icon/logo + year + label (two-line max)
- Connected by a subtle line (solid or dotted)
- Color-coded milestone types (product = blue, funding = green, etc.)

```tsx
interface TimelineMilestone {
  id: string
  year: string
  label: string
  icon: LucideIcon
  type: 'product' | 'funding' | 'event' | 'milestone'
}
```

### Pattern 2: Network/Community Visualization
From `framer-network-visualization.png`:
- Radial/constellation layout with central brand element
- Avatar circles of varying sizes
- Subtle connection lines between avatars
- Hover state shows name/role
- Limit to 20-30 visible avatars for performance

### Pattern 3: Testimonial Quote Section
From `framer-testimonial-quote.png`:
- Full-bleed colored background (brand accent)
- Avatar photo (circular, left side)
- Name + title + company below avatar
- Large quote text (24-32px, light weight, white)
- Social link icon (optional)

### Pattern 4: Gradient Hero (Culture/Careers)
From `framer-careers-page.png`:
- Warm gradient (orange → pink → purple)
- Large, inviting headline
- Primary CTA button
- Below hero: text + media layout

---

## Visual Language Requirements

### Layout
- **Timeline**: Full-width, centered content
- **Network viz**: Large canvas (80-100vh), centered radial layout
- **Team grid**: 3-4 columns of profile cards
- **Testimonial**: Full-bleed section, single focused quote

### Typography
- **Timeline labels**: 12-14px, uppercase or semibold
- **Timeline years**: 18-24px, bold
- **Hero headlines**: 48-64px, light weight on gradient
- **Quote text**: 24-32px, light weight, generous line-height
- **Body text**: 16-18px, comfortable reading width

### Color & Contrast
- **Timeline**: Neutral line with colored milestone markers
- **Network viz**: Light background, subtle gray connections
- **Testimonial**: Brand blue/accent full-bleed background
- **Profile cards**: White background, subtle shadow

### Interaction
- **Timeline hover**: Highlight milestone, show tooltip
- **Avatar hover**: Show name, role, optional link
- **Profile card hover**: Subtle lift/shadow increase
- **CTA hover**: Standard button interaction

---

## Implementation Requirements

### 1. Timeline Component
```tsx
interface TimelineProps {
  milestones: TimelineMilestone[]
  className?: string
}
```
- Render horizontal on desktop (md+), vertical on mobile
- Use CSS Grid or Flexbox for layout
- Connector line using pseudo-elements or SVG

### 2. NetworkVisualization Component
```tsx
interface NetworkVisualizationProps {
  members: NetworkMember[]
  className?: string
}

interface NetworkMember {
  id: string
  name: string
  role: string
  avatarUrl: string
  position: { x: number; y: number } // Percentage-based
  size: 'sm' | 'md' | 'lg'
}
```
- Use absolute positioning within relative container
- Center brand logo/element
- Animate connections on hover (optional)

### 3. TestimonialQuote Component
```tsx
interface TestimonialQuoteProps {
  quote: string
  author: {
    name: string
    title: string
    company: string
    avatarUrl: string
    socialUrl?: string
  }
  backgroundColor?: string
  className?: string
}
```
- Full-bleed background color
- Responsive quote text sizing

### 4. TeamMemberCard Component
```tsx
interface TeamMemberCardProps {
  name: string
  role: string
  bio?: string
  avatarUrl: string
  socialLinks?: { platform: string; url: string }[]
}
```
- Use shadcn Card component as base
- Hover effect with shadow increase

---

## Responsive Design

### Mobile (<768px)
- Timeline: Vertical layout
- Network viz: Simplified or hidden
- Team grid: 1-2 columns
- Testimonial: Full-width, smaller text

### Tablet (768-1024px)
- Timeline: Horizontal with scroll if needed
- Network viz: Smaller canvas
- Team grid: 2-3 columns

### Desktop (>1024px)
- Timeline: Full horizontal display
- Network viz: Full canvas
- Team grid: 3-4 columns

---

## Content Structure (from site-docs)

Reference `_docs/site-docs/05_team_and_credibility.md` for:
- Company milestones (5-8 key events)
- Team member profiles
- Testimonial quotes
- Mission/culture statements

---

## Deliverables

1. **Components**: All components listed in structure
2. **Page**: `/team` or `/about` route
3. **Timeline**: Working horizontal/vertical responsive timeline
4. **Network Viz**: Avatar constellation (can be simplified initially)
5. **Testimonials**: At least one full-bleed testimonial section
6. **Team Grid**: Profile cards for team members
7. **Responsive**: All breakpoint variations working

---

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] Timeline renders correctly on mobile (vertical)
- [ ] Timeline renders correctly on desktop (horizontal)
- [ ] Testimonial section has proper contrast/readability
- [ ] Avatar hovers show name/role
- [ ] Mobile responsive (test at 375px width)
- [ ] Tablet responsive (test at 768px width)
- [ ] Desktop responsive (test at 1280px width)
- [ ] Keyboard navigation works
- [ ] Proper alt text for all images/avatars
- [ ] No TypeScript errors
- [ ] No linter errors
- [ ] Content matches site-docs specification

---

## Additional Context

- This section answers "Who is behind this, and can I trust them?"
- Balance professional polish with approachability
- Milestones should be credibility-building for movement leaders
- Network visualization can be simplified or deferred if complex
- Consider lazy loading for avatar images

---

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing all four reference images
3. Planning the component structure
4. Implementing `Timeline` component first (most foundational)
5. Building `TestimonialQuote` next (highest visual impact)
6. Adding `TeamGrid` with profile cards
7. Implementing `NetworkVisualization` last (most complex)
8. Testing thoroughly at all breakpoints
