# Reconciliation Note: product-showcase

**Reference**: Blue Apron homepage
**Archived As**: `home-hero-product-showcase-01.png`
**Variant ID**: `product-showcase`

---

## Visual Reference Details

The Blue Apron hero features:
- **Background**: Light blue (#E8F4FD) with product photography
- **Left side**: White headline "The meal kit that puts quality first", blue CTA
- **Right side**: Product imagery (meal dishes, overhead shot)
- **Below hero**: "465+ million meals shipped" stat line
- **Overall feel**: Food, freshness, quality-focused

---

## Color Palette

```css
--mvmt-surface-light: #E8F4FD;          /* Light blue background */
--mvmt-text-primary: #1A1A2E;
--mvmt-text-secondary: #4A5568;
--mvmt-accent: #0047AB;                 /* Blue Apron blue */
--mvmt-accent-hover: #003A8C;
--mvmt-cta-bg: #0047AB;
--mvmt-cta-text: #FFFFFF;
```

---

## Status

**Token update needed** - Add light blue surface color.

---

## Token Updates Required

```css
.template-movement-leader[data-variant="product-showcase"] {
  --mvmt-surface-light: #E8F4FD;        /* Light blue background */
  --mvmt-accent: #0047AB;
  --mvmt-accent-hover: #003A8C;
  --mvmt-cta-bg: #0047AB;
  --mvmt-cta-text: #FFFFFF;
}
```

---

## Checklist

- [x] Blue Apron blue CTA (#0047AB)
- [ ] Light blue background (#E8F4FD)
- [ ] Product imagery (food photos)
- [ ] Stat line below hero
