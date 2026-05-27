# Color Palettes 2026

Color palettes extracted from reference images for Home Hero template variants. Each palette is designed to match its source reference for visual fidelity.

---

## Palette Index

| Variant | Reference | Primary BG | CTA Color | Accent | Text Primary |
|---------|-----------|------------|-----------|--------|--------------|
| colorful-headline | Spotify for Developers | Warm image | `#1DB954` (Green) | `#C026D3` (Magenta) | `#000000` |
| agency-gradient | Framer Agencies | `#2B1AFF` (Blue) | `#FFFFFF` | `#FFDD00` (Yellow) | `#FFFFFF` |
| centered-product | NYT Cooking | `#FFFFFF` | `#D4421E` (Red) | `#D4421E` | `#1A1A1A` |
| centered-serif | Substack | `#FFFFFF` | `#E67E22` (Orange) | `#E67E22` | `#1A1A1A` |
| chat-widget | Intercom | Warm image | `#000000` | `#5468FF` | `#000000` |
| circular-feature | ClassPass | `#FFFFFF` | `#3B82F6` (Blue) | `#3B82F6` | `#1A1A1A` |
| clean-minimal | Unsplash | `#FFFFFF` | `#111111` | `#111111` | `#111111` |
| clean-minimal-alt | Airbnb | `#F7F7F7` | `#222222` | `#222222` | `#222222` |
| dark-features | Zapier | `#1A1A1A` | `#FF6B35` (Orange) | `#FF6B35` | `#FFFFFF` |
| floating-card | OpenTable | Full-bleed image | `#DA3743` (Red) | `#DA3743` | `#1A1A1A` |
| full-bleed | Wix Learn | Full-bleed image | `#333333` | `#FACC15` (Yellow) | `#FFFFFF` |
| gradient-illustration | GitLab | `#FFFFFF` | `#FFFFFF` (outline) | `#6B4FBB` (Purple) | `#1A1A2E` |
| how-it-works | Blue Apron Wine | Full-bleed image | `#1B3A5C` (Navy) | `#1B3A5C` | `#FFFFFF` |
| image-grid | Dropbox | `#000000` | `#0061FF` (Blue) | `#0061FF` | `#FFFFFF` |
| pricing-card | Codecademy | Gradient purple | `#5B4FE5` (Indigo) | `#5B4FE5` | `#FFFFFF` |
| product-showcase | Blue Apron | Light blue | `#0047AB` (Blue) | `#0047AB` | `#1A1A2E` |
| product-showcase-alt | Webflow Enterprise | `#0E0E1A` | `#4353FF` (Blue) | `#4353FF` | `#FFFFFF` |
| split-tabs | LinkedIn | Light gray | `#0A66C2` (Blue) | `#0A66C2` | `#1A1A1A` |
| template-preview | Framer Boost | Lavender gradient | `#7C3AED` (Purple) | `#7C3AED` | `#1A1A2E` |

---

## Detailed Palettes

### colorful-headline (Spotify for Developers)

**Source**: Spotify for Developers homepage

```css
--mvmt-surface-dark: #181818;
--mvmt-surface-dark-elevated: #282828;
--mvmt-on-dark-primary: #000000;        /* BLACK headline text */
--mvmt-on-dark-secondary: #1A1A1A;
--mvmt-accent: #C026D3;                 /* MAGENTA for accent words */
--mvmt-accent-hover: #A21CAF;
--mvmt-cta-bg: #1DB954;                 /* SPOTIFY GREEN */
--mvmt-cta-text: #FFFFFF;
```

**Key visual**: Warm golden/sepia background image, black headline text with magenta accent words ("playback", "personalization"), green pill-shaped CTA button.

---

### agency-gradient (Framer Agencies)

**Source**: Framer for Agencies

```css
--mvmt-surface-dark: #2B1AFF;
--mvmt-surface-dark-elevated: #3D2FFF;
--mvmt-on-dark-primary: #FFFFFF;
--mvmt-accent: #FFDD00;                 /* Yellow accent elements */
--mvmt-accent-hover: #E5C700;
--mvmt-cta-bg: #FFFFFF;                 /* White primary CTA */
--mvmt-cta-text: #1A1A2E;
--mvmt-gradient-hero-brand: linear-gradient(135deg, #2B1AFF 0%, #4F46E5 50%, #6D28D9 100%);
```

**Key visual**: Bold blue/purple gradient background, white headline, yellow accent chips, UI preview cards on right side.

---

### centered-product (NYT Cooking)

**Source**: NYT Cooking

```css
--mvmt-surface-light: #FFFFFF;
--mvmt-text-primary: #1A1A1A;
--mvmt-text-secondary: #666666;
--mvmt-accent: #D4421E;                 /* NYT Cooking red */
--mvmt-accent-hover: #B83918;
--mvmt-cta-bg: #D4421E;
--mvmt-cta-text: #FFFFFF;
--mvmt-font-heading: var(--font-playfair), Georgia, serif;  /* Serif headline */
```

**Key visual**: Clean white background, serif headline, warm editorial feel, red CTA button, product images.

---

### centered-serif (Substack)

**Source**: Substack homepage

```css
--mvmt-surface-light: #FFFFFF;
--mvmt-text-primary: #1A1A1A;
--mvmt-text-secondary: #666666;
--mvmt-accent: #E67E22;                 /* Substack orange */
--mvmt-accent-hover: #D35400;
--mvmt-cta-bg: #E67E22;
--mvmt-cta-text: #FFFFFF;
--mvmt-font-heading: var(--font-playfair), Georgia, serif;  /* Serif headline */
```

**Key visual**: Clean white background, large centered serif headline, orange CTA button, testimonial quote below.

---

### chat-widget (Intercom)

**Source**: Intercom homepage

```css
--mvmt-surface-light: #FFFFFF;
--mvmt-text-primary: #000000;
--mvmt-text-secondary: #666666;
--mvmt-text-muted: #999999;
--mvmt-accent: #5468FF;
--mvmt-accent-hover: #3D4EDB;
--mvmt-cta-bg: #000000;                 /* Black CTA */
--mvmt-cta-text: #FFFFFF;
```

**Key visual**: Full-bleed warm image background, bold black sans-serif headline, floating chat widget card on right, black CTA buttons.

---

### circular-feature (ClassPass)

**Source**: ClassPass

```css
--mvmt-surface-light: #FFFFFF;
--mvmt-text-primary: #1A1A1A;
--mvmt-text-secondary: #666666;
--mvmt-accent: #3B82F6;                 /* ClassPass blue */
--mvmt-accent-hover: #2563EB;
--mvmt-cta-bg: #3B82F6;
--mvmt-cta-text: #FFFFFF;
```

**Key visual**: Clean minimal white background, circular/rounded feature image, blue CTA, dark section below.

---

### clean-minimal (Unsplash)

**Source**: Unsplash

```css
--mvmt-surface-light: #FFFFFF;
--mvmt-text-primary: #111111;
--mvmt-text-secondary: #666666;
--mvmt-accent: #111111;
--mvmt-accent-hover: #333333;
--mvmt-cta-bg: #111111;                 /* Black CTA */
--mvmt-cta-text: #FFFFFF;
--mvmt-border-light: #E5E5E5;
```

**Key visual**: Clean white background, text left, image grid right, black CTA with outline secondary, minimal aesthetic.

---

### clean-minimal-alt (Airbnb)

**Source**: Airbnb Community

```css
--mvmt-surface-light: #F7F7F7;
--mvmt-text-primary: #222222;
--mvmt-text-secondary: #717171;
--mvmt-accent: #222222;
--mvmt-accent-hover: #444444;
--mvmt-cta-bg: #222222;
--mvmt-cta-text: #FFFFFF;
--mvmt-border-light: #DDDDDD;
```

**Key visual**: Warm minimal off-white background, soft tones, lifestyle image, rounded corners, outline button.

---

### dark-features (Zapier)

**Source**: Zapier Platform

```css
--mvmt-surface-dark: #1A1A1A;
--mvmt-surface-dark-elevated: #2A2A2A;
--mvmt-on-dark-primary: #FFFFFF;
--mvmt-on-dark-secondary: #CCCCCC;
--mvmt-accent: #FF6B35;                 /* Zapier orange */
--mvmt-accent-hover: #E55A28;
--mvmt-cta-bg: #FF6B35;
--mvmt-cta-text: #FFFFFF;
```

**Key visual**: Dark background, feature grid below hero, orange CTA button, subtle elevated cards.

---

### floating-card (OpenTable)

**Source**: OpenTable for Restaurants

```css
--mvmt-surface-light: #FFFFFF;
--mvmt-text-primary: #1A1A1A;
--mvmt-text-secondary: #666666;
--mvmt-accent: #DA3743;                 /* OpenTable red */
--mvmt-accent-hover: #C12E39;
--mvmt-cta-bg: #DA3743;
--mvmt-cta-text: #FFFFFF;
```

**Key visual**: Full-bleed warm restaurant image, floating white card with headline, red CTA button.

---

### full-bleed (Wix Learn)

**Source**: Wix Learn

```css
--mvmt-surface-dark: rgba(0,0,0,0.5);   /* Overlay on image */
--mvmt-on-dark-primary: #FFFFFF;
--mvmt-on-dark-secondary: #E5E5E5;
--mvmt-accent: #FACC15;                 /* Yellow accent text */
--mvmt-accent-hover: #EAB308;
--mvmt-cta-bg: #333333;                 /* Dark gray rounded pill */
--mvmt-cta-text: #FFFFFF;
```

**Key visual**: Full-bleed video/image background, centered text overlay, yellow accent in headline, dark rounded pill CTA.

---

### gradient-illustration (GitLab)

**Source**: GitLab TeamOps

```css
--mvmt-surface-light: #FFFFFF;
--mvmt-text-primary: #1A1A2E;
--mvmt-text-secondary: #666666;
--mvmt-accent: #6B4FBB;                 /* GitLab purple */
--mvmt-accent-hover: #5A3FA3;
--mvmt-cta-bg: #FFFFFF;                 /* White outline button */
--mvmt-cta-text: #1A1A2E;
--mvmt-cta-border: #1A1A2E;
--mvmt-gradient-hero-brand: linear-gradient(135deg, #E8F4FD 0%, #C7E0F4 100%);  /* Light blue gradient */
```

**Key visual**: Light blue gradient background, line illustrations, outline CTA button, purple nav CTA.

---

### how-it-works (Blue Apron Wine)

**Source**: Blue Apron Wine

```css
--mvmt-surface-dark: rgba(0,0,0,0.4);   /* Overlay on image */
--mvmt-on-dark-primary: #FFFFFF;
--mvmt-accent: #1B3A5C;                 /* Navy blue */
--mvmt-accent-hover: #152E49;
--mvmt-cta-bg: #1B3A5C;
--mvmt-cta-text: #FFFFFF;
```

**Key visual**: Full-bleed product image hero, white text overlay, navy CTA, "How It Works" steps section below.

---

### image-grid (Dropbox)

**Source**: Dropbox Champions

```css
--mvmt-surface-dark: #000000;
--mvmt-surface-dark-elevated: #1A1A1A;
--mvmt-on-dark-primary: #FFFFFF;
--mvmt-on-dark-secondary: #CCCCCC;
--mvmt-accent: #0061FF;                 /* Dropbox blue */
--mvmt-accent-hover: #004FD4;
--mvmt-cta-bg: #0061FF;
--mvmt-cta-text: #FFFFFF;
```

**Key visual**: Black background, white headline, image grid on right side, blue CTA.

---

### pricing-card (Codecademy)

**Source**: Codecademy Bootcamp

```css
--mvmt-surface-dark: #1D1547;
--mvmt-surface-dark-elevated: #2A1F5E;
--mvmt-on-dark-primary: #FFFFFF;
--mvmt-on-dark-secondary: #CBD5E1;
--mvmt-accent: #5B4FE5;                 /* Codecademy indigo */
--mvmt-accent-hover: #4A3FCC;
--mvmt-cta-bg: #5B4FE5;
--mvmt-cta-text: #FFFFFF;
--mvmt-gradient-hero-brand: linear-gradient(135deg, #1D1547 0%, #2A1E6D 50%, #1D1547 100%);
```

**Key visual**: Dark purple gradient background, floating white pricing card, indigo CTA buttons, stats row below.

---

### product-showcase (Blue Apron)

**Source**: Blue Apron homepage

```css
--mvmt-surface-light: #E8F4FD;          /* Light blue background */
--mvmt-text-primary: #1A1A2E;
--mvmt-text-secondary: #4A5568;
--mvmt-accent: #0047AB;                 /* Blue Apron blue */
--mvmt-accent-hover: #003A8C;
--mvmt-cta-bg: #0047AB;
--mvmt-cta-text: #FFFFFF;
```

**Key visual**: Light blue background, full product image, white headline text on dark overlay, blue CTA, stat line below.

---

### product-showcase-alt (Webflow Enterprise)

**Source**: Webflow Enterprise

```css
--mvmt-surface-dark: #0E0E1A;
--mvmt-surface-dark-elevated: #1A1A2E;
--mvmt-on-dark-primary: #FFFFFF;
--mvmt-on-dark-secondary: #A0AEC0;
--mvmt-accent: #4353FF;                 /* Webflow blue */
--mvmt-accent-hover: #3344DD;
--mvmt-cta-bg: #4353FF;
--mvmt-cta-text: #FFFFFF;
```

**Key visual**: Very dark background, split layout with UI preview, logo bar below, blue CTA.

---

### split-tabs (LinkedIn)

**Source**: LinkedIn Talent Solutions

```css
--mvmt-surface-light: #F3F2EF;          /* LinkedIn light gray */
--mvmt-text-primary: #1A1A1A;
--mvmt-text-secondary: #666666;
--mvmt-accent: #0A66C2;                 /* LinkedIn blue */
--mvmt-accent-hover: #084E96;
--mvmt-cta-bg: #0A66C2;
--mvmt-cta-text: #FFFFFF;
--mvmt-font-heading: var(--font-playfair), Georgia, serif;  /* Serif headline (italic) */
```

**Key visual**: Split hero with image, serif italic headline, tabbed content section below, blue CTA.

---

### template-preview (Framer Boost)

**Source**: Framer Boost template

```css
--mvmt-surface-light: #F5F3FF;          /* Light lavender */
--mvmt-text-primary: #1A1A2E;
--mvmt-text-secondary: #6B7280;
--mvmt-accent: #7C3AED;                 /* Purple */
--mvmt-accent-hover: #6D28D9;
--mvmt-cta-bg: #7C3AED;
--mvmt-cta-text: #FFFFFF;
--mvmt-gradient-hero-brand: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 50%, #DDD6FE 100%);
```

**Key visual**: Lavender gradient background, floating preview cards, purple CTA, template showcase layout.

---

## Usage

Import palette values into `app/globals.css` under the appropriate variant selector:

```css
.template-movement-leader[data-variant="variant-name"] {
  /* Paste relevant token values here */
}
```

Ensure all template components use `--mvmt-*` tokens rather than hardcoded colors.
