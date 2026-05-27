# Reconciliation Note: colorful-headline

**Reference**: Spotify for Developers homepage
**Archived As**: `home-hero-colorful-headline-01.png`
**Variant ID**: `colorful-headline`

---

## Current vs Reference Analysis

### Critical Discrepancies

| Element | Current | Reference | Fix Required |
|---------|---------|-----------|--------------|
| CTA Button | Purple `#9B59B6` | **GREEN** `#1DB954` | **YES - CRITICAL** |
| Accent Words | Purple `#9B59B6` | **MAGENTA** `#C026D3` | YES |
| Headline Text | White | **BLACK** `#000000` | YES |

### Visual Reference Details

The Spotify for Developers hero features:
- **Background**: Warm golden/sepia image of person with headphones
- **Headline**: Black text "Build experiences for millions of music lovers with **playback**, **personalization**, and **much, much more**."
- **Accent Words**: "playback", "personalization", "much, much more" in **MAGENTA/PINK**
- **CTA Button**: Pill-shaped **SPOTIFY GREEN** (`#1DB954`) with white text "DISCOVER FEATURES"

---

## Color Palette

```css
--mvmt-surface-dark: #181818;
--mvmt-surface-dark-elevated: #282828;
--mvmt-on-dark-primary: #000000;        /* BLACK headline - NOT white */
--mvmt-on-dark-secondary: #1A1A1A;
--mvmt-accent: #C026D3;                 /* MAGENTA for accent words */
--mvmt-accent-hover: #A21CAF;
--mvmt-cta-bg: #1DB954;                 /* SPOTIFY GREEN */
--mvmt-cta-text: #FFFFFF;
--mvmt-gradient-overlay-hero: linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.0) 100%);
```

---

## Typography

- **Heading Font**: Inter (Bold), sans-serif
- **Body Font**: Inter, sans-serif
- **Headline Weight**: Bold (700)
- **Scale**: Large, impactful headline

---

## Layout

- Split layout: Text left (40-50%), image right (50-60%)
- Image has warm overlay/treatment
- Text positioned on semi-transparent dark overlay
- CTA is pill-shaped with full rounding

---

## Effects

- **Radius**: Pill/full for CTA (`border-radius: 9999px`)
- **Shadows**: Minimal
- **Image treatment**: Warm color grading, slight vignette

---

## Token Updates Required

```css
.template-movement-leader[data-variant="colorful-headline"] {
  --mvmt-accent: #C026D3;           /* Magenta for accent words */
  --mvmt-accent-hover: #A21CAF;
  --mvmt-cta-bg: #1DB954;           /* Spotify GREEN */
  --mvmt-cta-text: #FFFFFF;
  --mvmt-on-dark-primary: #000000;  /* Black headline text */
  --mvmt-surface-dark: #181818;
  --mvmt-surface-dark-elevated: #282828;
  --mvmt-gradient-overlay-hero: linear-gradient(to right, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.0) 100%);
}
```

---

## Checklist

- [ ] CTA button is Spotify green (#1DB954)
- [ ] Accent words are magenta (#C026D3)
- [ ] Headline text is black on warm background
- [ ] Pill-shaped CTA button
- [ ] Warm image treatment preserved
