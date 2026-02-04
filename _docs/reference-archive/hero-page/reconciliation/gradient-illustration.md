# Reconciliation Note: gradient-illustration

**Reference**: GitLab TeamOps
**Archived As**: `home-hero-gradient-illustration-01.png`
**Variant ID**: `gradient-illustration`

---

## Current vs Reference Analysis

### Critical Discrepancies

| Element | Current | Reference | Fix Required |
|---------|---------|-----------|--------------|
| CTA Button | Purple filled `#6B4FBB` | **White outline/bordered** | **YES - CRITICAL** |
| Background | Light/white | Light blue gradient | YES |
| Accent | Purple `#6B4FBB` | Purple (nav CTA only) | Adjust context |

### Visual Reference Details

The GitLab TeamOps hero features:
- **Background**: Light blue gradient, almost white with subtle blue tint
- **Left side**: "TeamOps" label, large headline "Stay Connected. Stay Productive.", subtitle, **OUTLINE CTA button** "Learn How"
- **Right side**: Line illustration of people collaborating (hand-drawn style)
- **Nav CTA**: Purple filled "Get free trial" button (this is nav, not hero CTA)
- **Hero CTA**: **White/transparent with dark border** - NOT purple filled

---

## Color Palette

```css
--mvmt-surface-light: #FFFFFF;
--mvmt-text-primary: #1A1A2E;
--mvmt-text-secondary: #666666;
--mvmt-text-muted: #94A3B8;
--mvmt-accent: #6B4FBB;                 /* GitLab purple - for nav/secondary */
--mvmt-accent-hover: #5A3FA3;
--mvmt-cta-bg: transparent;             /* Outline button */
--mvmt-cta-text: #1A1A2E;
--mvmt-cta-border: #1A1A2E;             /* Dark border for outline */
--mvmt-border-light: #E5E5E5;
```

---

## Gradient Definition

```css
--mvmt-gradient-hero-brand: linear-gradient(180deg, #E8F4FD 0%, #F5FAFF 50%, #FFFFFF 100%);
```

Light blue at top, fading to white at bottom.

---

## Typography

- **Heading Font**: Inter (Bold), sans-serif
- **Body Font**: Inter, sans-serif
- **Label**: Small caps or uppercase "TeamOps" with icon

---

## Layout

- Split layout: Text left (45%), Illustration right (55%)
- Line illustration style (hand-drawn, not photo)
- Clean, airy spacing
- Horizontal nav bar with announcement banner above

---

## Effects

- **Radius**: Medium rounded for CTA (`border-radius: 6px`)
- **Shadows**: None on hero elements
- **Button style**: **Outline/bordered** - white/transparent fill with dark border

---

## Token Updates Required

```css
.template-movement-leader[data-variant="gradient-illustration"] {
  --mvmt-accent: #6B4FBB;
  --mvmt-accent-hover: #5A3FA3;
  --mvmt-cta-bg: transparent;
  --mvmt-cta-text: #1A1A2E;
  --mvmt-cta-border: #1A1A2E;
  --mvmt-gradient-hero-brand: linear-gradient(180deg, #E8F4FD 0%, #F5FAFF 50%, #FFFFFF 100%);
}
```

**Note**: The hero CTA in this variant should be an **outline button** (transparent bg with border), not a filled button. This may require component-level adjustment if the component doesn't support outline CTAs via tokens.

---

## Component Consideration

If the hero component always renders a filled CTA button, consider:
1. Adding a `--mvmt-cta-style: outline` token concept
2. Or using `--mvmt-cta-bg: #FFFFFF` with `--mvmt-cta-border: #1A1A2E` and adjusting component to show border

For now, a white filled button with dark text approximates the look:
```css
--mvmt-cta-bg: #FFFFFF;
--mvmt-cta-text: #1A1A2E;
```

---

## Checklist

- [ ] Light blue gradient background
- [ ] Outline/bordered CTA button (or white with dark text)
- [ ] Line illustration on right side
- [ ] Clean, minimal aesthetic
- [ ] Purple accent only for secondary elements (nav)
