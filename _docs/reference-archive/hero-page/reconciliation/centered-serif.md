# Reconciliation Note: centered-serif

**Reference**: Substack homepage
**Archived As**: `home-hero-centered-serif-01.png`
**Variant ID**: `centered-serif`

---

## Current vs Reference Analysis

### Critical Discrepancies

| Element | Current | Reference | Fix Required |
|---------|---------|-----------|--------------|
| Headline Font | Inter (sans) | **Serif (Playfair-like)** | **YES - CRITICAL** |
| CTA Color | Orange `#E67E22` | Orange `#E67E22` | No - correct |
| Layout | Centered | Centered | No - correct |

### Visual Reference Details

The Substack hero features:
- **Background**: Clean white
- **Headline**: Large centered **SERIF** font - "A comprehensive support structure for independent writers."
- **Subtitle**: Small sans-serif body text below
- **CTA Button**: Orange rounded rectangle "Start writing"
- **Below fold**: Testimonial quote in serif italic

---

## Color Palette

```css
--mvmt-surface-light: #FFFFFF;
--mvmt-text-primary: #1A1A1A;
--mvmt-text-secondary: #666666;
--mvmt-text-muted: #999999;
--mvmt-accent: #E67E22;                 /* Substack orange */
--mvmt-accent-hover: #D35400;
--mvmt-cta-bg: #E67E22;
--mvmt-cta-text: #FFFFFF;
--mvmt-border-light: #E5E5E5;
```

---

## Typography

- **Heading Font**: **Playfair Display** (Serif) - CRITICAL CHANGE
- **Body Font**: Inter, sans-serif
- **Headline Weight**: Regular to Medium (400-500)
- **Scale**: Large, elegant serif headline

```css
--mvmt-font-heading: var(--font-playfair), Georgia, serif;
```

---

## Layout

- Centered single-column layout
- Generous vertical spacing
- Headline → Subtitle → CTA vertical stack
- Testimonial section below with serif italic quote

---

## Effects

- **Radius**: Medium rounded for CTA (`border-radius: 6-8px`)
- **Shadows**: Minimal/none
- **Borders**: Subtle divider line between sections

---

## Token Updates Required

```css
.template-movement-leader[data-variant="centered-serif"] {
  --mvmt-font-heading: var(--font-playfair), Georgia, serif;
  --mvmt-accent: #E67E22;
  --mvmt-accent-hover: #D35400;
  --mvmt-cta-bg: #E67E22;
  --mvmt-cta-text: #FFFFFF;
}
```

---

## Checklist

- [ ] Headline uses serif font (Playfair Display)
- [ ] Orange CTA button (#E67E22)
- [ ] Centered layout
- [ ] Clean white background
- [ ] Testimonial quote uses serif italic
