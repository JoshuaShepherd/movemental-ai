# Reconciliation Note: template-preview

**Reference**: Framer Boost template
**Archived As**: `home-hero-template-preview-01.png`
**Variant ID**: `template-preview`

---

## Current vs Reference Analysis

### Critical Discrepancies

| Element | Current | Reference | Fix Required |
|---------|---------|-----------|--------------|
| Background | White/light | **Lavender gradient** | **YES - CRITICAL** |
| CTA Color | Purple `#7C3AED` | Purple `#7C3AED` | No - correct |
| Preview Cards | Unknown | Floating template previews | Check component |

### Visual Reference Details

The Framer Boost hero features:
- **Background**: **LAVENDER GRADIENT** - soft purple/violet tones
- **Left side**: "FREE FRAMER TEMPLATE" label, headline "Boost your website.", subtitle, two CTA buttons (purple filled + outline)
- **Right side**: Multiple floating template preview cards at different angles/sizes
- **Overall feel**: Light, airy, showcasing templates/pages

---

## Color Palette

```css
--mvmt-surface-light: #F5F3FF;          /* Light lavender base */
--mvmt-text-primary: #1A1A2E;
--mvmt-text-secondary: #6B7280;
--mvmt-text-muted: #9CA3AF;
--mvmt-accent: #7C3AED;                 /* Framer purple */
--mvmt-accent-hover: #6D28D9;
--mvmt-cta-bg: #7C3AED;
--mvmt-cta-text: #FFFFFF;
--mvmt-border-light: #E9D5FF;           /* Light purple border */
```

---

## Gradient Definition

```css
--mvmt-gradient-hero-brand: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #DDD6FE 100%);
```

Alternative with more violet:
```css
--mvmt-gradient-hero-brand: linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 30%, #E9D5FF 70%, #DDD6FE 100%);
```

---

## Typography

- **Heading Font**: Inter (Semibold to Bold), sans-serif
- **Body Font**: Inter, sans-serif
- **Label**: Small uppercase "FREE FRAMER TEMPLATE" in accent color

---

## Layout

- Split layout: Text left (40%), Preview cards right (60%)
- Multiple floating preview cards (3-5 cards)
- Cards at various sizes and slight rotations
- Two CTAs side by side: filled purple + outline

---

## Effects

- **Radius**: Medium rounded for CTAs (`border-radius: 8px`), larger for preview cards
- **Shadows**: Soft shadows on floating preview cards (`box-shadow: 0 20px 40px rgba(0,0,0,0.1)`)
- **Card treatment**: White cards with subtle shadow, showing template screenshots

---

## Token Updates Required

```css
.template-movement-leader[data-variant="template-preview"] {
  --mvmt-accent: #7C3AED;
  --mvmt-accent-hover: #6D28D9;
  --mvmt-cta-bg: #7C3AED;
  --mvmt-cta-text: #FFFFFF;
  --mvmt-surface-light: #F5F3FF;
  --mvmt-gradient-hero-brand: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #DDD6FE 100%);
}
```

---

## Checklist

- [ ] Lavender gradient background
- [ ] Purple filled CTA button (#7C3AED)
- [ ] Secondary outline CTA button
- [ ] Floating template preview cards on right
- [ ] "FREE FRAMER TEMPLATE" label in purple
- [ ] Soft shadows on preview cards
