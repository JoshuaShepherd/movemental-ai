# Implementation Request: Homepage

## Context

I need to implement the **Homepage** UI section for the Movemental.ai platform. This is the public landing page that establishes credibility immediately while providing a clear path to action. The design balances bold, confident messaging with social proof elements and feature demonstrations.

---

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/homepage/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/homepage/reference-images/`
  - `framer-cta-social-proof.png` - CTA + logo bar, gradient background, accordion links
  - `framer-features-hero-section.png` - Hero headline, feature section, text + screenshot
  - `framer-features-preview-card.png` - Preview card, icon feature list, "Learn more" links
  - `framer-features-two-column.png` - Two-column alternating, gradient screenshot backgrounds
  - `framer-split-hero-preview.png` - Split hero, UI mockup, dual CTAs, gradient background
  - `framer-hero-dark-gradient.png` - Dark hero, gradient text, announcement bar, minimal
  - `framer-hero-feature-cards.png` - Gradient headline, feature cards with UI previews
  - `framer-hero-process-steps.png` - Process steps indicator, numbered workflow
  - `framer-hero-image-gallery.png` - Image collage, gradient headline, template cards
  - `framer-step-cards-dark.png` - Dark process cards, 3-column, icons + CTA
  - `framer-typography-cta-link.png` - Large typography, inline CTA link, bold/light contrast
  - `framer-feature-bento-grid.png` - Bento grid, feature cards, interactive demos

### Content Specification
- `_docs/site-docs/09_homepage_role.md` - Content requirements and copy

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
- **Framer Motion** for animations (optional)
- **Lucide React** for icons

---

## Component Structure

```
components/
├── homepage/
│   ├── HomepageContainer.tsx        # Main page container
│   ├── HeroSection.tsx              # Hero with headline, body, CTA
│   ├── DarkHeroSection.tsx          # Dark gradient hero variant
│   ├── SplitHero.tsx                # Two-column hero with UI preview
│   ├── AnnouncementBar.tsx          # Top announcement strip
│   ├── LogoBar.tsx                  # Partner/customer logos
│   ├── FeaturePreviewCard.tsx       # Preview left, feature list right
│   ├── FeatureItem.tsx              # Icon, title, description, link
│   ├── TwoColumnFeature.tsx         # Alternating text/image layout
│   ├── FeatureScreenshot.tsx        # Screenshot with gradient background
│   ├── ProcessSection.tsx           # Dark background process cards
│   ├── StepCard.tsx                 # Icon, title, description, CTA
│   ├── ProcessSteps.tsx             # Horizontal numbered steps
│   ├── BentoGrid.tsx                # Asymmetric feature grid
│   ├── BentoCard.tsx                # Individual bento card
│   ├── NarrativeText.tsx            # Large text with inline links
│   ├── ImageCollage.tsx             # Gallery strip of examples
│   ├── TemplateCarousel.tsx         # Template preview cards
│   └── index.ts                     # Barrel export
```

---

## Page Structure

```
app/
├── (public)/
│   └── page.tsx                     # Homepage (root route)
```

---

## Key Design Patterns to Implement

### Pattern 1: CTA Section with Social Proof
- Bold headline (H1) stating the core benefit
- Supporting body text addressing objections
- Primary CTA button with high contrast
- Logo bar below with partner/customer logos
- Tagline explaining logos ("Trusted by movement leaders...")

### Pattern 2: Dark Gradient Hero
- Full-width dark gradient background (blue to near-black)
- Large gradient text headline with styling
- Subheadline paragraph explaining value
- Single prominent CTA button
- Top announcement bar (gradient, full-width)

### Pattern 3: Split Hero with UI Preview
- Two-column layout: Text left, UI preview right
- Eyebrow label, bold headline, paragraph, dual CTAs
- Floating UI mockup with gradient background

### Pattern 4: Feature Preview Card
- Large preview card showing actual UI
- Stacked feature items with icon + title + description
- "Learn more >" links in accent color

### Pattern 5: Process Section (Dark)
- Dark background for visual contrast
- Bold headline above cards
- 3-column card layout with icons
- First card can include CTA button

### Pattern 6: Bento Feature Grid
- Asymmetric grid layout (bento box style)
- Large feature card with gradient background
- Smaller feature cards with UI demos
- Mixed card sizes for visual hierarchy

---

## Visual Language Requirements

### Layout
- **Hero section**: Full-width, centered content, generous vertical padding
- **CTA section**: Two-column on desktop, stacked on mobile
- **Logo bar**: Horizontal row, evenly spaced, grayscale
- **Feature sections**: Two-column alternating, full-width contained
- **Process sections**: 3-column card grid on dark background

### Typography
- **Hero headline**: 48-64px, bold, high contrast
- **Section headlines**: 32-48px, bold
- **Feature titles**: 20-24px, bold
- **Supporting text**: 18-20px, lighter weight or muted
- **Feature descriptions**: 16-18px, regular weight
- **Inline links**: Accent color, underline or arrow indicator

### Color & Contrast
- **Gradient backgrounds**: Dark purple → blue/black for hero
- **Text on gradient**: White or very light
- **Logo bar**: Grayscale on light, white on dark
- **CTA buttons**: High contrast (light on dark)
- **Feature icons**: Accent color background (rounded square)
- **Dark sections**: Near-black (#0a0a0a)
- **Accent color**: Cyan/blue for icons and links

### Interaction
- **Button hover**: Slight scale or background color shift
- **Link hover**: Underline animation or color transition
- **Card hover**: Subtle lift or border glow

---

## Implementation Requirements

### 1. HeroSection Component
```tsx
interface HeroSectionProps {
  eyebrow?: string
  headline: string
  subheadline: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  variant?: 'light' | 'dark' | 'gradient'
  className?: string
}
```

### 2. LogoBar Component
```tsx
interface LogoBarProps {
  logos: { name: string; src: string; href?: string }[]
  tagline?: string
  variant?: 'light' | 'dark'
  className?: string
}
```

### 3. ProcessSection Component
```tsx
interface ProcessSectionProps {
  headline: string
  steps: {
    icon: LucideIcon
    title: string
    description: string
    cta?: { label: string; href: string }
  }[]
  className?: string
}
```

---

## Responsive Design

### Mobile (<768px)
- Hero: Stacked layout, smaller headline (32-40px)
- Logo bar: 2-row grid or horizontal scroll
- Feature sections: Single column, image above text
- Process cards: Stacked vertically
- Bento grid: Single column stack

### Tablet (768-1024px)
- Hero: Two-column with smaller preview
- Logo bar: Single row, smaller logos
- Feature sections: Two-column maintained
- Process cards: 2-column grid

### Desktop (>1024px)
- Full layouts as designed
- Bento grid with asymmetric layout
- Large UI previews and screenshots

---

## Deliverables

1. **Components**: All components listed in structure
2. **Page**: Homepage at root route `/`
3. **Hero Section**: At least one hero variant (dark gradient recommended)
4. **Logo Bar**: With placeholder logos
5. **Feature Sections**: Two-column and preview card variants
6. **Process Section**: Dark background with step cards
7. **Responsive**: All breakpoint variations working
8. **Animations**: Subtle hover states and transitions

---

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] Hero section with strong visual impact
- [ ] Logo bar with proper grayscale treatment
- [ ] Feature sections with proper typography hierarchy
- [ ] Process section with dark background
- [ ] Mobile responsive (test at 375px width)
- [ ] Tablet responsive (test at 768px width)
- [ ] Desktop responsive (test at 1280px width)
- [ ] Keyboard navigation works
- [ ] No TypeScript errors
- [ ] No linter errors
- [ ] Content matches site-docs specification

---

## Additional Context

- Homepage is the primary entry point—first impressions matter
- Must clearly communicate value proposition to movement leaders
- Should include path to Fit Check CTA
- Balance visual impact with fast load times
- Gradient backgrounds can use CSS for performance
- Logo bar logos may be placeholder initially

---

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing all 12 reference images
3. Planning the component structure
4. Implementing `HeroSection` first (most impactful)
5. Building `LogoBar` for social proof
6. Adding feature sections incrementally
7. Implementing `ProcessSection` with dark background
8. Testing thoroughly at all breakpoints
