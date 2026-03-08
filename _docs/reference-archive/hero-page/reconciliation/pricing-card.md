# Reconciliation Note: pricing-card

**Reference**: Codecademy Bootcamp
**Archived As**: `home-hero-pricing-card-01.png`
**Variant ID**: `pricing-card`

---

## Current vs Reference Analysis

### Critical Discrepancies

| Element | Current | Reference | Fix Required |
|---------|---------|-----------|--------------|
| Background | Solid dark `#1D1547` | **Gradient purple** | **YES - CRITICAL** |
| CTA Color | Indigo `#5B4FE5` | Indigo `#5B4FE5` | No - correct |
| Pricing Card | Floating white | Floating white | No - correct |

### Visual Reference Details

The Codecademy Bootcamp hero features:
- **Background**: Dark purple **GRADIENT** (not solid) - transitions from deep purple to slightly lighter purple
- **Left side**: Course title, description, instructor info
- **Right side**: Floating white pricing card with strikethrough price, CTA buttons
- **Below hero**: Stats row with icons (8 weeks, expert career guidance, 4+ projects, 1 year)
- **Background image**: Subtle image of person working, overlaid with purple gradient

---

## Color Palette

```css
--mvmt-surface-dark: #1D1547;
--mvmt-surface-dark-elevated: #2A1F5E;
--mvmt-on-dark-primary: #FFFFFF;
--mvmt-on-dark-secondary: #CBD5E1;
--mvmt-on-dark-muted: #94A3B8;
--mvmt-accent: #5B4FE5;                 /* Codecademy indigo */
--mvmt-accent-hover: #4A3FCC;
--mvmt-cta-bg: #5B4FE5;
--mvmt-cta-text: #FFFFFF;
```

---

## Gradient Definition

```css
--mvmt-gradient-hero-brand: linear-gradient(135deg, #1D1547 0%, #2A1E6D 50%, #1D1547 100%);
```

Alternative with image overlay:
```css
background: linear-gradient(135deg, rgba(29, 21, 71, 0.95) 0%, rgba(42, 30, 109, 0.9) 50%, rgba(29, 21, 71, 0.95) 100%);
```

---

## Typography

- **Heading Font**: Inter (Bold), sans-serif
- **Body Font**: Inter, sans-serif
- **Price display**: Large, with strikethrough on original price
- **Badge**: Small caps "Includes a year of Pro"

---

## Layout

- Split layout: Content left (55%), Pricing card right (45%)
- Floating white card with shadow
- Stats row below hero with 4 columns
- Instructor avatar + credentials on left side

---

## Effects

- **Radius**: Medium rounded (`border-radius: 12px`) for pricing card
- **Shadows**: Elevated shadow on pricing card (`box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25)`)
- **Card**: White background with generous padding

---

## Token Updates Required

```css
.template-movement-leader[data-variant="pricing-card"] {
  --mvmt-accent: #5B4FE5;
  --mvmt-accent-hover: #4A3FCC;
  --mvmt-cta-bg: #5B4FE5;
  --mvmt-cta-text: #FFFFFF;
  --mvmt-surface-dark: #1D1547;
  --mvmt-surface-dark-elevated: #2A1F5E;
  --mvmt-gradient-hero-brand: linear-gradient(135deg, #1D1547 0%, #2A1E6D 50%, #1D1547 100%);
}
```

---

## Checklist

- [ ] Background uses purple gradient (not solid)
- [ ] Floating white pricing card with shadow
- [ ] Indigo CTA buttons (#5B4FE5)
- [ ] Stats row below hero
- [ ] Strikethrough pricing display
