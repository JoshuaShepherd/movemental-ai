# Design System Document: The Scholarly Intelligence Framework

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Curator"**

This design system is built to facilitate high-stakes decision-making through a lens of "Intellectual Rigor." We are moving away from the frantic, data-dense dashboards of the last decade and toward a "Quietly Premium" editorial experience. The goal is to make the user feel like they are reading a bespoke intelligence briefing rather than navigating a software tool.

We achieve this by breaking the standard "SaaS template" look. We reject rigid, boxed-in layouts in favor of intentional asymmetry, wide margins, and high-contrast typography scales. The interface should feel like a physical desk—composed of layers of fine paper and glass—where information has room to breathe and authority is conveyed through precision, not noise.

---

## 2. Colors: Tonal Depth & The Muted Palette

Our palette is anchored in high-trust neutrals. We utilize a "Cream-on-Navy" or "Navy-on-Cream" foundation to avoid the sterile coldness of pure white (#FFFFFF) and pure black (#000000).

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders to section off the UI. 
Boundaries must be defined solely through background color shifts or subtle tonal transitions. For example, a sidebar should be defined by `surface-container-low` (#f5f4ef) sitting against a `surface` (#faf9f4) main content area. If a visual break is needed, use a change in elevation or vertical white space.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to create "nested" depth:
- **Base Layer:** `surface` (#faf9f4)
- **Secondary Grouping:** `surface-container-low` (#f5f4ef)
- **Primary Focus Cards:** `surface-container-lowest` (#ffffff)
- **Utility/Navigation:** `surface-container-high` (#e9e8e3)

### The "Glass & Gradient" Rule
To elevate the experience, floating elements (like dropdowns or hovering navigation) should use **Glassmorphism**. Apply `surface` colors at 80% opacity with a `backdrop-blur` (12px-20px). 
**Signature Textures:** For main CTAs, use a subtle linear gradient from `primary` (#041627) to `primary-container` (#1a2b3c) at a 135-degree angle. This adds a "lithographic" soul to the interface.

---

## 3. Typography: Editorial Discipline

The typography is the voice of the platform. It must feel authoritative and precise.

- **Serif (Newsreader):** Used for `display` and `headline` scales. This provides an "Institutional" feel, reminiscent of high-end journalism and academic journals. Use tight tracking (-2%) for larger headers.
- **Sans-Serif (Inter):** Used for `title`, `body`, and `labels`. It provides the technical "Modern" precision required for data interpretation.

**Hierarchy Strategy:** 
Maintain a high contrast between scales. A `display-lg` (3.5rem) heading should often sit near a `body-md` (0.875rem) sub-text to create a sense of curated importance. Never "middle-ground" your font sizes; commit to either being bold and editorial or quiet and functional.

---

## 4. Elevation & Depth: Tonal Layering

We reject traditional material shadows in favor of **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by stacking tiers. A `surface-container-lowest` card placed on a `surface-container-low` background creates a natural lift that feels sophisticated rather than "computer-generated."
- **Ambient Shadows:** When a component must float (e.g., a modal), use a "Whisper Shadow":
  - Color: `on-surface` (#1b1c19) at 5% opacity.
  - Blur: 32px to 64px.
  - Y-Offset: 8px.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. Never use a 100% opaque border.
- **Intentional Asymmetry:** Avoid centering everything. Use a "Golden Ratio" grid where the primary content occupies 62% of the width, leaving the remaining space for "marginalia" (metadata, citations, or secondary actions).

---

## 5. Components

### Buttons
- **Primary:** `primary` background with `on-primary` text. Use `md` (0.375rem) roundedness. No borders.
- **Secondary:** Transparent background with a "Ghost Border" (15% opacity `outline`).
- **Tertiary:** Text-only, using `secondary` (#48626e) for a muted, "intellectual" look. Use `label-md` typography.

### Cards & Lists
**Strict Rule:** No divider lines. Separate items using:
1. **Vertical Space:** Use a consistent 24px or 32px gap.
2. **Background Shifts:** Alternate between `surface` and `surface-container-low` for list items.
3. **Typography:** Use a `title-sm` header to clearly define the start of a new section.

### Input Fields
Avoid the "boxed" input. Use a `surface-container-highest` background with a subtle 2px bottom-stroke of `primary` when focused. Labels should be `label-sm` and positioned above the field, never inside as a placeholder.

### Marginalia (Additional Component)
Specialized for this platform, "Marginalia" are small side-notes or data-point callouts that sit in the gutters of the main text. Use `body-sm` in `secondary` color. This reinforces the "Editorial" nature of the intelligence platform.

---

## 6. Do's and Don'ts

### Do:
- **Embrace White Space:** Give every data point a "buffer zone." If it feels "empty," you are likely doing it right.
- **Use "Deep" Accents:** Use `tertiary-container` (#3f2302) sparingly for highlighting critical intelligence insights.
- **Align to the Baseline:** Ensure all typography sits on a consistent 4px or 8px baseline grid to maintain "Precision."

### Don't:
- **No Pure Grays:** Always use our tinted neutrals (slates and creams). Pure gray feels "generic corporate."
- **No "Standard" Icons:** Use thin-stroke icons (0.5pt to 1pt) to match the refinement of the serif typography. 
- **No Heavy Shadows:** If a shadow is noticeable, it is too heavy. It should be felt, not seen.
- **No Animations for "Fluff":** Only use motion to indicate state changes or data loading. Keep transitions under 200ms with a "Linear Out, Slow In" easing.