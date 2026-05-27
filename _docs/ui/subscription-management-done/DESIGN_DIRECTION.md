# Subscription Management - Design Direction

> **Synthesized design approach based on reference images**

**Last Updated**: January 2026  
**Reference Image Count**: 7

---

## Design Vision

The subscription management experience should feel **transparent, scannable, and confidence-building**. Users need to quickly understand their options, compare tiers, and make informed decisions without friction. The design prioritizes visual hierarchy that guides the eye from value proposition to action, with supporting elements (FAQ, comparison tables) that resolve doubts without overwhelming.

The Framer reference images demonstrate a mature approach: clean card layouts, feature grids with checkmarks, interactive calculators, and accordion FAQs—all working together to reduce cognitive load during a high-stakes decision (spending money).

---

## Key Patterns Identified

### Pattern 1: Three-Tier Pricing Cards
- **Source(s)**: `framer-pricing-cards-tiers.png`
- **What it solves**: Presents multiple options in a scannable, side-by-side format
- **Implementation guidance**:
  - Use 3 cards maximum for primary tiers (Free, Basic/Pro, Pro/Business)
  - Highlight the "recommended" tier with visual differentiation (colored background, border, or badge)
  - Stack features with checkmarks; use consistent vertical rhythm
  - Price should be the most prominent element after the tier name
  - Include billing frequency toggle if offering monthly/annual

### Pattern 2: Team/Seat Calculator
- **Source(s)**: `framer-pricing-team-calculator.png`
- **What it solves**: Allows organizations to estimate costs before committing
- **Implementation guidance**:
  - Interactive number inputs for seats/editors
  - Real-time cost calculation displayed prominently
  - Show cost breakdown (per-seat rate × quantity)
  - Include "first one free" or similar value callouts
  - Dark card variant for calculator to differentiate from static info

### Pattern 3: Feature Comparison Table
- **Source(s)**: `framer-comparison-table.png`
- **What it solves**: Detailed feature-by-feature comparison for thorough buyers
- **Implementation guidance**:
  - Horizontal scroll or fixed first column on mobile
  - Use checkmarks for boolean features, values for quantitative (e.g., "10 GB")
  - Group features by category (Hosting, Publishing, etc.)
  - Highlight tier names at top with price
  - Sticky header for long tables

### Pattern 4: FAQ Accordion
- **Source(s)**: `framer-faq-accordion.png`
- **What it solves**: Addresses common objections without cluttering the page
- **Implementation guidance**:
  - Expandable/collapsible items with + icon
  - Questions should be in user's voice ("Can I cancel at any time?")
  - Keep answers concise; link to detailed docs if needed
  - Position after pricing cards but before final CTA
  - 5-7 questions maximum; prioritize billing/cancellation questions

### Pattern 5: Billing Content Typography
- **Source(s)**: `framer-billing-typography.png`, `framer-billing-help-content.png`
- **What it solves**: Clear hierarchy for legal/billing documentation
- **Implementation guidance**:
  - Bold title + lighter subtitle for page headers
  - Section headers (H2) should be bold, scannable
  - Body text with comfortable line-height (1.5-1.7)
  - Inline links for related content
  - Use callout boxes for important notices (e.g., "Adding editors may result in extra charges")

### Pattern 6: Enterprise Features Cards (Dark)
- **Source(s)**: `framer-enterprise-features-dark.png`
- **What it solves**: Highlights premium/enterprise tier benefits distinctly
- **Implementation guidance**:
  - Dark/gradient background section
  - 3-column card layout
  - Each card: Accent icon, bold title, bullet list of features with checkmarks
  - Categories: "Features", "Services", "Contract"
  - Single prominent CTA below cards ("Upgrade to Business")
  - Cards have dark background matching section, subtle borders
  - Icons in different accent colors per category (blue, purple, pink)
  - Good for enterprise/business tier promotion sections

---

## Visual Language

### Layout
- **Card grid**: 3-column on desktop, stacked on mobile
- **Comparison table**: Full-width with horizontal scroll on mobile
- **FAQ section**: Centered, max-width ~800px
- **Generous whitespace** between sections

### Typography
- **Tier names**: Bold, large (24-32px)
- **Prices**: Extra bold, largest element (36-48px)
- **Feature lists**: Regular weight, smaller (14-16px)
- **FAQ questions**: Medium weight, 18px

### Color & Contrast
- **Highlighted tier**: Accent color background (purple/blue gradient) with white text
- **Standard tiers**: White/light background with dark text
- **Checkmarks**: Accent color (blue/purple)
- **Calculator**: Dark background (near-black) for contrast

### Interaction
- **Hover states** on cards to indicate clickability
- **Toggle animation** for monthly/annual switch
- **Smooth accordion** expand/collapse
- **Calculator**: Immediate feedback on number changes

---

## Reference Image Inventory

| Image | Source | Patterns | Priority |
|-------|--------|----------|----------|
| `framer-pricing-cards-tiers.png` | Framer | 3-tier cards, feature checkmarks, CTA buttons | P1 |
| `framer-pricing-team-calculator.png` | Framer | Seat calculator, dark variant, cost breakdown | P1 |
| `framer-enterprise-features-dark.png` | Framer | Enterprise features, 3-column dark cards, icons | P1 |
| `framer-comparison-table.png` | Framer | Feature grid, tier columns, category grouping | P2 |
| `framer-faq-accordion.png` | Framer | Accordion, expandable items | P2 |
| `framer-billing-typography.png` | Framer | Title/subtitle hierarchy, section headers | P3 |
| `framer-billing-help-content.png` | Framer | Help content, inline callouts, screenshots | P3 |

---

## Implementation Checklist

- [ ] Create `PricingCard` component with tier, price, features, CTA props
- [ ] Create `PricingGrid` layout component (3-column responsive)
- [ ] Add billing frequency toggle (monthly/annual) with price recalculation
- [ ] Create `FeatureComparisonTable` component with sticky headers
- [ ] Create `FAQAccordion` component using Radix UI primitives
- [ ] Create `SeatCalculator` component with real-time calculation
- [ ] Style highlighted/recommended tier variant
- [ ] Add billing documentation pages with proper typography
- [ ] Implement mobile-responsive comparison table (horizontal scroll)
- [ ] Add analytics tracking for tier selection, FAQ opens

---

## Open Questions

- Should we highlight a "recommended" tier, and which one?
- Do we need a custom enterprise tier with "Contact us" CTA?
- Should FAQ be on the same page or a separate /pricing/faq route?
- How do we handle multi-tenant pricing (per-organization vs per-user)?
