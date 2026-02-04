# Typography 2026

Font pairings for Home Hero template variants. All fonts are already loaded in `app/layout.tsx`.

---

## Available Fonts

The following fonts are available in the system:

| Font | Variable | Style | Use Case |
|------|----------|-------|----------|
| Inter | `--font-inter` | Sans-serif | Default body and UI |
| Poppins | `--font-poppins` | Sans-serif | Friendly, rounded headings |
| DM Sans | `--font-dm-sans` | Sans-serif | Modern, geometric |
| Nunito | `--font-nunito` | Sans-serif | Soft, approachable |
| Playfair Display | `--font-playfair` | Serif | Editorial, elegant headings |
| Lora | `--font-lora` | Serif | Warm, readable body serif |
| Space Grotesk | `--font-space-grotesk` | Sans-serif | Technical, modern |

---

## Variant Typography Assignments

### Serif Headline Variants

These variants require serif fonts for their headlines to match reference fidelity:

| Variant | Heading Font | Body Font | Reference |
|---------|--------------|-----------|-----------|
| centered-serif | Playfair Display | Inter | Substack |
| centered-product | Playfair Display | Inter | NYT Cooking |
| split-tabs | Playfair Display (italic) | Inter | LinkedIn Talent Solutions |

### Sans-Serif Headline Variants (Default)

These variants use sans-serif fonts (default behavior):

| Variant | Heading Font | Body Font | Reference |
|---------|--------------|-----------|-----------|
| colorful-headline | Inter (Bold) | Inter | Spotify for Developers |
| agency-gradient | Inter (Bold) | Inter | Framer Agencies |
| chat-widget | Inter (Bold) | Inter | Intercom |
| circular-feature | Inter (Semibold) | Inter | ClassPass |
| clean-minimal | Inter (Bold) | Inter | Unsplash |
| clean-minimal-alt | Inter (Semibold) | Inter | Airbnb |
| dark-features | Inter (Semibold) | Inter | Zapier |
| floating-card | Inter (Bold) | Inter | OpenTable |
| full-bleed | Inter (Bold) | Inter | Wix Learn |
| gradient-illustration | Inter (Bold) | Inter | GitLab |
| how-it-works | Inter (Semibold) | Inter | Blue Apron Wine |
| image-grid | Inter (Bold) | Inter | Dropbox |
| pricing-card | Inter (Bold) | Inter | Codecademy |
| product-showcase | Inter (Bold) | Inter | Blue Apron |
| product-showcase-alt | Inter (Semibold) | Inter | Webflow Enterprise |
| template-preview | Inter (Semibold) | Inter | Framer Boost |

---

## CSS Token Overrides

### Serif Variants

```css
/* centered-serif - Substack */
.template-movement-leader[data-variant="centered-serif"] {
  --mvmt-font-heading: var(--font-playfair), Georgia, serif;
}

/* centered-product - NYT Cooking */
.template-movement-leader[data-variant="centered-product"] {
  --mvmt-font-heading: var(--font-playfair), Georgia, serif;
}

/* split-tabs - LinkedIn (serif italic) */
.template-movement-leader[data-variant="split-tabs"] {
  --mvmt-font-heading: var(--font-playfair), Georgia, serif;
}
```

### Alternative Sans-Serif (if needed)

```css
/* Example: Using Poppins for a friendlier feel */
.template-movement-leader[data-variant="example-variant"] {
  --mvmt-font-heading: var(--font-poppins), system-ui, sans-serif;
}

/* Example: Using Space Grotesk for technical feel */
.template-movement-leader[data-variant="example-variant-2"] {
  --mvmt-font-heading: var(--font-space-grotesk), system-ui, sans-serif;
}
```

---

## Implementation Notes

1. **Font loading**: All fonts listed above are already imported in `app/layout.tsx` via `next/font/google`. No additional imports needed.

2. **Token usage**: Components should use `font-mvmt-heading` and `font-mvmt-body` Tailwind classes, which map to `--mvmt-font-heading` and `--mvmt-font-body` tokens.

3. **Fallback chain**: Always include system fallbacks:
   - Serif: `var(--font-playfair), Georgia, serif`
   - Sans: `var(--font-inter), system-ui, sans-serif`

4. **Weight considerations**: The font variable provides all weights. Use Tailwind classes (`font-bold`, `font-semibold`) to control weight.

---

## Typography Scale

The default type scale for all variants:

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Hero H1 | 48-72px | Bold/Semibold | 1.1-1.2 |
| Hero subtitle | 18-24px | Regular | 1.5-1.6 |
| Body | 16px | Regular | 1.6-1.7 |
| Small/Meta | 14px | Regular | 1.5 |
| Tiny/Caption | 12px | Regular | 1.4 |

Individual variants may adjust these based on their reference's density and rhythm.
