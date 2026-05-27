# Homepage - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 12

---

## Design Vision

The homepage should **establish credibility immediately** while providing a **clear path to action**. The design balances bold, confident messaging with social proof elements that validate the platform's value. Typography is the hero—large, expressive statements that communicate the core value proposition without relying on heavy imagery.

The Framer references show how a SaaS platform can feel approachable yet professional: gradient backgrounds create visual interest, logo bars provide instant credibility, typography with intentional contrast (bold/light) guides the reader's attention, and feature sections demonstrate value through clear visual hierarchy.

---

## Key Patterns Identified

### Pattern 1: CTA Section with Social Proof
- **Source(s)**: `framer-cta-social-proof.png`
- **What it solves**: Combines action prompt with credibility in a single, high-impact section
- **Implementation guidance**:
  - Bold headline (H1) stating the core benefit
  - Supporting body text addressing objections ("No trial, no fees, no risk")
  - Primary CTA button with high contrast
  - Logo bar below with recognizable customer/partner logos
  - Tagline explaining logos ("Join these amazing companies who...")
  - Optional: Quick-link accordions to pricing tiers (expandable)

### Pattern 2: Typography with Inline CTA
- **Source(s)**: `framer-typography-cta-link.png`
- **What it solves**: Draws attention to a call-to-action within narrative text
- **Implementation guidance**:
  - Large typography (40-60px) for narrative statements
  - Bold/regular contrast within same sentence ("**Come work with us** on building...")
  - Inline link styled distinctively (color + arrow icon)
  - Works well for "soft" CTAs that don't require a button

### Pattern 3: Feature Preview Card with Icon List
- **Source(s)**: `framer-features-preview-card.png`
- **What it solves**: Shows product capabilities with visual preview alongside feature descriptions
- **Implementation guidance**:
  - Left side: Large preview card showing actual UI/product (slight shadow, rounded corners)
  - Right side: Stacked feature items with icon + title + description + "Learn more" link
  - Each feature item: Icon (rounded square background), bold title, 2-line description
  - "Learn more >" links in accent color with arrow
  - Generous whitespace between feature items

### Pattern 4: Two-Column Feature Section
- **Source(s)**: `framer-features-two-column.png`
- **What it solves**: Explains features with text + visual proof in alternating layout
- **Implementation guidance**:
  - Alternating layout: text left / visual right, then visual left / text right
  - Text side: Bold headline (24-32px), paragraph description (16-18px)
  - Visual side: Product screenshot or UI mockup with subtle gradient background
  - Screenshots can show menus, layer panels, or actual product interface
  - Gradient backgrounds (blue/purple tones) add depth without distraction

### Pattern 5: Hero Headline with Feature Section
- **Source(s)**: `framer-features-hero-section.png`
- **What it solves**: Combines bold value proposition with immediate feature demonstration
- **Implementation guidance**:
  - Large, centered headline (48-64px) stating key benefit
  - Supporting paragraph below (18-20px, max-width for readability)
  - Below: Feature section with text + screenshot side by side
  - Screenshot can show dark UI/code interface for contrast
  - This pattern works well for "how it works" sections

### Pattern 6: Step Process Cards (Dark Variant)
- **Source(s)**: `framer-step-cards-dark.png`
- **What it solves**: Explains a multi-step process (e.g., "How to get started") in scannable format
- **Implementation guidance**:
  - Dark background section for visual contrast
  - Bold headline above cards (centered, white text)
  - 3-column card layout (responsive to stack on mobile)
  - Each card: Icon (accent color), bold title, description paragraph
  - First card can include CTA button ("Join today")
  - Cards have subtle rounded corners, same dark background as section
  - Icons use accent color (cyan/blue) on dark background

### Pattern 7: Hero with Process Steps Indicator
- **Source(s)**: `framer-hero-process-steps.png`
- **What it solves**: Shows user journey/workflow while maintaining strong headline
- **Implementation guidance**:
  - Light/gray muted headline above main headline
  - Bold main headline (multi-line, centered)
  - "Learn more" inline link with arrow
  - Below: Horizontal 3-step process indicator with numbered circles
  - Steps connected by line: "1. Design a prototype" → "2. Create a webpage" → "3. Publish and share"
  - Each step in accent color with label below
  - Product screenshot/preview below steps

### Pattern 8: Gradient Headline with Feature Cards
- **Source(s)**: `framer-hero-feature-cards.png`
- **What it solves**: Combines value messaging with tangible features in one section
- **Implementation guidance**:
  - Bold two-color headline (gradient or two weights: "Deliver with **speed**")
  - Supporting paragraph below
  - Two feature cards below: one gradient (blue), one light
  - Gradient card: Collaboration/sharing feature with form UI mockup
  - Light card: CMS/content feature with table preview
  - Each card: Title, description, optional UI preview

### Pattern 9: Split Hero with UI Preview
- **Source(s)**: `framer-split-hero-preview.png`
- **What it solves**: Balances messaging with product demonstration
- **Implementation guidance**:
  - Two-column layout: Text left, UI preview right
  - Left: Eyebrow label, bold headline, paragraph, dual CTAs (button + link)
  - Badges near CTAs ("Agency", "Client" labels)
  - Right: Floating UI mockup with gradient/dark background
  - Mockup can show actual product interface
  - Full-bleed gradient background (blue/purple)

### Pattern 10: Dark Gradient Hero Section
- **Source(s)**: `framer-hero-dark-gradient.png`
- **What it solves**: Creates high-impact, memorable first impression with strong value proposition
- **Implementation guidance**:
  - Full-width dark gradient background (blue to near-black)
  - Large gradient text headline with italic styling ("Design, publish, done.")
  - Subheadline paragraph explaining the value (white text, 18-20px)
  - Single prominent CTA button (contrasting color, rounded)
  - Top announcement bar (gradient, full-width)
  - Navigation bar integrated with dark theme
  - Bottom hint text with arrow ("just design and... publish!")
  - Minimal design—text is the hero, no heavy imagery

### Pattern 11: Hero with Image Gallery Collage
- **Source(s)**: `framer-hero-image-gallery.png`
- **What it solves**: Shows product versatility through visual examples above the fold
- **Implementation guidance**:
  - Top: Horizontal image strip/collage of real website examples
  - Images show variety (portfolio, product, personal sites)
  - Below: Bold gradient headline (pink/orange gradient text)
  - Subheadline paragraph explaining templates
  - CTA button (gradient pill shape)
  - Below CTA: Template preview cards carousel
  - Cards show actual template thumbnails
  - Clean white background for text section

### Pattern 12: Feature Bento Grid
- **Source(s)**: `framer-feature-bento-grid.png`
- **What it solves**: Showcases multiple features in visually engaging, scannable format
- **Implementation guidance**:
  - Asymmetric grid layout (bento box style)
  - Large feature card: Gradient background (pink/purple), title, description, interactive preview
  - Interactive preview shows image carousel with navigation dots
  - Smaller feature cards: Light background, title, description, UI demo
  - UI demos show actual interface elements (breakpoints, responsive controls)
  - Cards labeled: "Design", "Layout", "Collaboration", "Content Management System"
  - Mixed card sizes create visual hierarchy
  - Video play buttons for demo features
  - Tablet/Mobile breakpoint indicators in Layout card

---

## Visual Language

### Layout
- **Hero section**: Full-width, centered content, generous vertical padding
- **CTA section**: Two-column on desktop (text left, links right), stacked on mobile
- **Logo bar**: Horizontal row, evenly spaced, grayscale for subtlety
- **Narrative sections**: Centered text, max-width 900-1000px
- **Feature sections**: Two-column alternating, full-width with contained content
- **Process sections**: 3-column card grid on dark background

### Typography
- **Hero headline**: 48-64px, bold, high contrast
- **Section headlines**: 32-48px, bold
- **Feature titles**: 20-24px, bold
- **Supporting text**: 18-20px, lighter weight or muted color
- **Feature descriptions**: 16-18px, regular weight
- **Inline links**: Accent color, underline or arrow indicator
- **Logo tagline**: Small caps or smaller size, muted

### Color & Contrast
- **Gradient backgrounds**: Dark purple → blue/black gradient for hero sections
- **Text on gradient**: White or very light
- **Logo bar**: Grayscale logos on light background, white logos on dark background
- **CTA buttons**: High contrast (light button on dark background)
- **Feature icons**: Accent color background (rounded square)
- **Dark sections**: Near-black (#0a0a0a) for process cards
- **Accent color**: Cyan/blue for icons and links on dark backgrounds

### Interaction
- **Button hover**: Slight scale or background color shift
- **Link hover**: Underline animation or color transition
- **Accordion hover**: Subtle highlight on expandable items
- **Card hover**: Subtle lift or border glow (optional)

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| `framer-cta-social-proof.png` | Framer | CTA + logo bar, gradient background, accordion links | P1 |
| `framer-features-hero-section.png` | Framer | Hero headline, feature section, text + screenshot | P1 |
| `framer-features-preview-card.png` | Framer | Preview card, icon feature list, "Learn more" links | P1 |
| `framer-split-hero-preview.png` | Framer | Split hero, UI mockup, dual CTAs, gradient background | P1 |
| `framer-hero-process-steps.png` | Framer | Process steps indicator, numbered workflow | P2 |
| `framer-hero-feature-cards.png` | Framer | Gradient headline, feature cards with UI previews | P2 |
| `framer-features-two-column.png` | Framer | Two-column alternating, gradient screenshot backgrounds | P2 |
| `framer-step-cards-dark.png` | Framer | Dark process cards, 3-column, icons + CTA | P2 |
| `framer-typography-cta-link.png` | Framer | Large typography, inline CTA link, bold/light contrast | P2 |
| `framer-hero-dark-gradient.png` | Framer | Dark hero, gradient text, announcement bar, minimal | P1 |
| `framer-hero-image-gallery.png` | Framer | Image collage, gradient headline, template cards | P1 |
| `framer-feature-bento-grid.png` | Framer | Bento grid, feature cards, interactive demos | P1 |

---

## Implementation Checklist

### Hero & CTA
- [ ] Create `HeroSection` component with headline, body, CTA button props
- [ ] Create `LogoBar` component with logo array and tagline
- [ ] Implement gradient background variants (dark purple/blue)
- [ ] Create `NarrativeText` component with inline link support
- [ ] Add bold/light typography contrast utilities
- [ ] Create expandable quick-link accordion for pricing tiers

### Feature Sections
- [ ] Create `FeaturePreviewCard` component (preview left, feature list right)
- [ ] Create `FeatureItem` component (icon, title, description, link)
- [ ] Create `TwoColumnFeature` component with alternating layout prop
- [ ] Create `FeatureScreenshot` component with gradient background
- [ ] Create `HeroFeatureSection` component (headline + feature demo)

### Process Section
- [ ] Create `ProcessSection` component with dark background variant
- [ ] Create `StepCard` component (icon, title, description, optional CTA)
- [ ] Implement 3-column responsive grid

### General
- [ ] Ensure full responsiveness (text scaling, stacking)
- [ ] Add subtle animations (button hover, link hover, card hover)

### Dark Hero Variant
- [ ] Create `DarkHeroSection` component with gradient background
- [ ] Implement gradient text effect (CSS gradient clip)
- [ ] Create `AnnouncementBar` component (gradient, dismissible)
- [ ] Add navigation bar dark variant

### Image Gallery Hero
- [ ] Create `ImageCollage` component with responsive grid
- [ ] Create `TemplateCarousel` component with preview cards
- [ ] Implement gradient text effect (pink/orange variant)
- [ ] Add horizontal scroll on mobile

### Bento Feature Grid
- [ ] Create `BentoGrid` component with asymmetric layout
- [ ] Create `FeatureCard` variants (large gradient, small light)
- [ ] Implement interactive image carousel within cards
- [ ] Add breakpoint indicator component
- [ ] Create video play button overlay

---

## Open Questions

- Which partner/customer logos do we have permission to display?
- Should the gradient be animated or static?
- Do we need multiple CTA variants (primary, secondary, ghost)?
- How does this connect to the Fit Check entry point?
- What features do we highlight in the preview card section?
- Should process cards link to detailed pages or just be informational?
