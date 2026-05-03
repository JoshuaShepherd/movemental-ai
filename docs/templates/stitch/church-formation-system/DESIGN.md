```markdown
# Design System Strategy: The Modern Sanctuary

## 1. Overview & Creative North Star
This design system is built upon the Creative North Star of **"The Modern Sanctuary."** 

In an era of digital noise and "growth-hack" church marketing, this system moves in the opposite direction. It is a quiet, intentional space for spiritual formation. We are not building a dashboard; we are curating an experience that feels as grounded as stone and as breathable as light. 

To achieve this "High-End Editorial" feel, we reject the standard Bootstrap/SaaS aesthetic. We embrace **intentional asymmetry**, high-contrast typography scales, and **tonal layering**. The interface should never feel "pasted on"—it should feel like a series of soft, physical layers resting atop one another in a sunlit room.

---

## 2. Colors & Surface Philosophy
The palette is rooted in warm neutrals and muted stones, designed to reduce cognitive load and evoke a sense of "sacred modernism."

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders for sectioning or containment. 
Visual boundaries must be defined through:
1.  **Background Color Shifts:** A `surface-container-low` section sitting on a `surface` background.
2.  **Generous Whitespace:** Using the gutter to imply the edge.
3.  **Soft Tonal Transitions:** Moving from `surface` to `surface-container` to define content blocks.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of fine paper. 
*   **Base:** Use `surface` (#fbf9f4) for the global background.
*   **Sections:** Use `surface-container-low` (#f5f3ee) for large secondary areas or sidebars.
*   **Active Elements:** Use `surface-container-lowest` (#ffffff) for primary cards to create a "lifted" feel without using a heavy shadow.
*   **Depth:** Reserve `surface-container-highest` (#e4e2dd) for deeply nested items or navigation anchors.

### The "Glass & Gradient" Rule
To add "soul" to the digital interface:
*   **Glassmorphism:** Use semi-transparent `surface` colors with a `backdrop-blur (20px)` for floating navigation bars. This allows the "warm stone" colors to bleed through, maintaining a sense of place.
*   **Signature Textures:** For main Call-to-Actions or Hero backgrounds, use a subtle linear gradient from `primary` (#272420) to `primary_container` (#3d3935). This prevents the "flat" look of standard buttons and adds a premium, tactile weight.

---

## 3. Typography: Quiet Confidence
The typography pairs a timeless serif with a functional, modern sans-serif to bridge the gap between ancient tradition and modern life.

*   **Display & Headlines (Newsreader):** This is our "Sacred" voice. It is serious, elegant, and editorial. Use `display-lg` through `headline-sm` for storytelling, scripture, and core messaging. It should feel like a high-end publication.
*   **Body & UI (Manrope):** This is our "Human" voice. It is clean, approachable, and highly legible. Use `body-lg` for reading long-form content and `label-md` for functional metadata.
*   **Editorial Hierarchy:** Do not be afraid of extreme scale. A `display-lg` headline followed by a small, wide-tracked `label-md` creates an authoritative, "designed" look that standard church apps lack.

---

## 4. Elevation & Depth
We convey hierarchy through **Tonal Layering** rather than traditional structural lines or heavy shadows.

*   **The Layering Principle:** Stacking tiers (e.g., a `surface-container-lowest` card on a `surface-container-low` section) creates a natural, soft lift.
*   **Ambient Shadows:** If a floating effect is required (e.g., a dropdown or modal), use a shadow color tinted with the `on-surface` (#1b1c19) token at **4%–6% opacity**. Shadows must have a blur radius of at least 24px to mimic natural ambient light.
*   **The "Ghost Border" Fallback:** If a border is essential for accessibility, use the `outline-variant` token at **15% opacity**. Never use 100% opaque borders.
*   **Tactile Feedback:** Use the `surface-tint` (#625d59) for subtle hover states, suggesting a gentle change in the material's interaction with light.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` background with `on-primary` text. Use `md` (0.375rem) roundedness. Add a subtle inner-glow gradient for a premium finish.
*   **Secondary:** No fill. Use a "Ghost Border" (`outline-variant` at 20%) or a `surface-container-high` background.
*   **Tertiary:** Text-only in `primary` with a `label-md` font weight.

### Cards & Lists
*   **No Dividers:** Forbid the use of 1px horizontal lines between list items. Use vertical padding and alternating `surface-container` tiers or simply generous whitespace to separate content.
*   **Soft Cards:** Use `surface-container-lowest` with a `lg` (0.5rem) corner radius. No border.

### Input Fields
*   **Minimalist Entry:** Input fields should use `surface-container-high` as a background with no border. On focus, transition the background to `surface-container-lowest` and provide a 1px `primary` bottom-border (an exception to the no-line rule to signify active focus).

### Ritual Elements (Custom Components)
*   **The Breath Indicator:** A soft, pulsating `tertiary_container` element used for meditation or liturgical pacing.
*   **Formation Progress:** Instead of a "loading bar," use a series of soft `surface-container-highest` dots that fill with `secondary` as the user progresses through a formation track.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical layouts (e.g., a headline offset to the left with body text tucked into the right column).
*   **Do** prioritize "Reading Mode"—ensure line lengths for `body-lg` never exceed 70 characters.
*   **Do** use `primary_fixed_dim` for subtle emphasis in long-form text.

### Don't
*   **Don’t** use pure black (#000000). Use `primary` (#272420) for the deepest tones to maintain warmth.
*   **Don’t** use "Alert Red" for everything. Use `error` (#ba1a1a) sparingly; for soft warnings, use the `tertiary` palette.
*   **Don’t** use stock "business" icons. Use thin-stroke, hand-drawn, or custom-curated iconography that feels deeply human.
*   **Don’t** use aggressive animations. All transitions should be slow, using an "Ease-in-out" curve (300ms–500ms) to mimic a calm breath.

---
**Director's Note:** Every pixel should feel like a deliberate choice. If a screen feels "busy," remove a container, don't add a line. Trust the whitespace.```