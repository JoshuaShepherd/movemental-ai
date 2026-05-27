# Implementation Request: Subscription Management

## Context

I need to implement the **Subscription Management** UI section for the Movemental.ai platform. This includes pricing pages, tier comparison, billing management, and subscription controls. The design should feel transparent, scannable, and confidence-building—users need to quickly understand options and make informed decisions.

---

## Source Documents

### Design Direction (PRIMARY)
- `_docs/ui/subscription-management/DESIGN_DIRECTION.md` - Synthesized design patterns and implementation checklist

### Reference Images
- `_docs/ui/subscription-management/reference-images/`
  - `framer-pricing-cards-tiers.png` - 3-tier cards, feature checkmarks, CTA buttons
  - `framer-pricing-team-calculator.png` - Seat calculator, dark variant, cost breakdown
  - `framer-enterprise-features-dark.png` - Enterprise features, 3-column dark cards
  - `framer-comparison-table.png` - Feature grid, tier columns, category grouping
  - `framer-faq-accordion.png` - Accordion, expandable items
  - `framer-billing-typography.png` - Title/subtitle hierarchy
  - `framer-billing-help-content.png` - Help content, inline callouts

### Content Specification
- `_docs/site-docs/08_pricing_and_access.md` - Content requirements and pricing structure

### Implementation Context
- `_docs/ai-vision/05_implementation-checklist.md` - Overall implementation checklist

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
├── subscription/
│   ├── PricingContainer.tsx          # Main pricing page layout
│   ├── PricingCard.tsx               # Individual tier card
│   ├── PricingGrid.tsx               # 3-column pricing grid
│   ├── PricingToggle.tsx             # Monthly/annual billing toggle
│   ├── FeatureList.tsx               # Feature checkmark list
│   ├── FeatureItem.tsx               # Individual feature with checkmark
│   ├── SeatCalculator.tsx            # Team seat cost calculator
│   ├── CalculatorInput.tsx           # Number input for calculator
│   ├── CostBreakdown.tsx             # Cost calculation display
│   ├── EnterpriseFeatures.tsx        # Enterprise features section
│   ├── FeatureCard.tsx               # Dark feature card with icons
│   ├── ComparisonTable.tsx           # Full feature comparison table
│   ├── TableHeader.tsx               # Table header with tier names
│   ├── TableRow.tsx                  # Feature row with tier values
│   ├── FAQAccordion.tsx              # FAQ accordion component
│   ├── FAQItem.tsx                   # Individual FAQ item
│   ├── BillingContent.tsx            # Billing documentation layout
│   ├── BillingCallout.tsx            # Important billing notices
│   └── index.ts                      # Barrel export
```

---

## Page Structure

```
app/
├── (public)/
│   └── pricing/
│       └── page.tsx                  # Public pricing page
├── dashboard/
│   └── billing/
│       ├── page.tsx                  # Billing overview
│       ├── plans/
│       │   └── page.tsx              # Plan management
│       └── history/
│           └── page.tsx              # Billing history
```

---

## Key Design Patterns to Implement

### Pattern 1: Three-Tier Pricing Cards
- 3 cards maximum for primary tiers (Free, Pro, Business)
- Highlight "recommended" tier with visual differentiation
- Stack features with checkmarks
- Price is most prominent after tier name
- Billing frequency toggle (monthly/annual)

### Pattern 2: Team/Seat Calculator
- Interactive number inputs for seats/editors
- Real-time cost calculation
- Show cost breakdown (per-seat × quantity)
- "First one free" or similar callouts
- Dark card variant for visual contrast

### Pattern 3: Feature Comparison Table
- Horizontal scroll or fixed first column on mobile
- Checkmarks for boolean, values for quantitative
- Group features by category
- Tier names with prices at top
- Sticky header for long tables

### Pattern 4: FAQ Accordion
- Expandable/collapsible items with + icon
- Questions in user's voice ("Can I cancel...?")
- Concise answers, link to docs if needed
- 5-7 questions maximum

### Pattern 5: Enterprise Features (Dark)
- Dark/gradient background section
- 3-column card layout
- Each card: Accent icon, bold title, bullet features
- Categories: "Features", "Services", "Contract"
- Single CTA below cards

---

## Visual Language Requirements

### Layout
- **Card grid**: 3-column on desktop, stacked on mobile
- **Comparison table**: Full-width with horizontal scroll on mobile
- **FAQ section**: Centered, max-width ~800px
- **Generous whitespace** between sections

### Typography
- **Tier names**: Bold, large (24-32px)
- **Prices**: Extra bold, largest (36-48px)
- **Feature lists**: Regular weight, smaller (14-16px)
- **FAQ questions**: Medium weight, 18px

### Color & Contrast
- **Highlighted tier**: Accent gradient (purple/blue) with white text
- **Standard tiers**: White/light background with dark text
- **Checkmarks**: Accent color
- **Calculator**: Dark background for contrast
- **Enterprise section**: Near-black background

### Interaction
- **Hover states** on cards
- **Toggle animation** for monthly/annual
- **Smooth accordion** expand/collapse
- **Calculator**: Immediate feedback on changes

---

## Implementation Requirements

### 1. PricingCard Component
```tsx
interface PricingCardProps {
  tier: {
    id: string
    name: string
    price: { monthly: number; annual: number }
    description: string
    features: string[]
    cta: { label: string; href: string }
    isHighlighted?: boolean
    badge?: string
  }
  billingPeriod: 'monthly' | 'annual'
  onSelect?: () => void
  className?: string
}
```

### 2. SeatCalculator Component
```tsx
interface SeatCalculatorProps {
  basePrice: number
  pricePerSeat: number
  freeSeats?: number
  minSeats?: number
  maxSeats?: number
  onChange?: (seats: number, total: number) => void
  className?: string
}
```

### 3. ComparisonTable Component
```tsx
interface ComparisonTableProps {
  tiers: {
    id: string
    name: string
    price: number
    period: string
  }[]
  categories: {
    name: string
    features: {
      name: string
      values: Record<string, string | boolean | number>
    }[]
  }[]
  className?: string
}
```

### 4. FAQAccordion Component
```tsx
interface FAQAccordionProps {
  items: {
    question: string
    answer: string | React.ReactNode
  }[]
  className?: string
}
```

### 5. EnterpriseFeatures Component
```tsx
interface EnterpriseFeaturesProps {
  headline: string
  categories: {
    icon: LucideIcon
    title: string
    features: string[]
    iconColor?: string
  }[]
  cta: { label: string; href: string }
  className?: string
}
```

---

## Responsive Design

### Mobile (<768px)
- Pricing cards: Single column, stacked
- Comparison table: Horizontal scroll
- Calculator: Full-width
- FAQ: Full-width accordion

### Tablet (768-1024px)
- Pricing cards: 2-3 columns (may stack)
- Comparison table: Horizontal scroll
- Calculator: Centered container

### Desktop (>1024px)
- Pricing cards: 3 columns
- Comparison table: Full display
- Calculator: Fixed-width dark card
- Enterprise: 3-column cards

---

## Deliverables

1. **Components**: All components listed in structure
2. **Pricing Cards**: 3-tier layout with toggle
3. **Seat Calculator**: Interactive with real-time cost
4. **Comparison Table**: Full feature grid
5. **FAQ Accordion**: Expandable items
6. **Enterprise Section**: Dark background variant
7. **Billing Pages**: Overview and management
8. **Responsive**: All breakpoint variations working

---

## Quality Checklist

Before marking complete, verify:
- [ ] All DESIGN_DIRECTION.md patterns implemented
- [ ] 3-tier pricing cards displaying correctly
- [ ] Highlighted/recommended tier visually distinct
- [ ] Monthly/annual toggle with price update
- [ ] Seat calculator calculating correctly
- [ ] Comparison table scrollable on mobile
- [ ] FAQ accordion expanding/collapsing
- [ ] Enterprise features section (dark)
- [ ] Mobile responsive (test at 375px width)
- [ ] Tablet responsive (test at 768px width)
- [ ] Desktop responsive (test at 1280px width)
- [ ] Keyboard navigation works
- [ ] No TypeScript errors
- [ ] No linter errors
- [ ] Analytics tracking for tier selection

---

## Additional Context

- Pricing is a high-stakes decision—design should build confidence
- Toggle animation for monthly/annual should be smooth
- Calculator helps organizations estimate costs
- FAQ addresses common objections (cancellation, upgrades)
- May need custom enterprise tier with "Contact us" CTA
- Consider multi-tenant pricing (per-org vs per-user)

---

## Start Implementation

Please begin by:
1. Reading all source documents listed above
2. Analyzing all seven reference images
3. Planning the component structure
4. Implementing `PricingCard` first (most visible)
5. Building `PricingGrid` with toggle
6. Adding `SeatCalculator` component
7. Implementing `ComparisonTable`
8. Building `FAQAccordion`
9. Adding `EnterpriseFeatures` section
10. Testing thoroughly at all breakpoints
