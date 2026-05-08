# Design System Document: High-End Editorial Strategy

## 1. Overview & Creative North Star
This design system is anchored by the Creative North Star: **"The Digital Curator."** 

Moving beyond the rigid, boxy templates of standard productivity tools, this system treats the digital interface as a high-end editorial spread. It is characterized by an authoritative use of white space, a dramatic tonal shift between a "Midnight" hero experience and an "Airy" body, and a rejection of traditional structural lines. We achieve premium quality not through more decoration, but through more intentional restraint. The experience should feel like a bespoke publication—structured, sophisticated, and breathing with purpose.

### Editorial Signature Principles
*   **Intentional Asymmetry:** Break the 12-column monotony. Use staggered card heights and off-center typography to guide the eye dynamically.
*   **Tonal Anchoring:** Utilize the high-contrast dark hero (using `inverse_surface`) to establish immediate authority, then transition into a multi-layered light environment for deep work.
*   **The "Breathing" Layout:** Every element must have room to exist. If a component feels crowded, increase the padding; never reduce the font size to fit a container.

---

## 2. Colors & Surface Philosophy

The palette is a sophisticated blend of deep technical blues and organic grays, designed to reduce cognitive load while maintaining a premium "pro" aesthetic.

### Surface Hierarchy & Nesting
We reject the "flat" web. Depth is achieved through **Tonal Layering**, not shadows alone.
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Boundaries are defined by background shifts. Use `surface_container_low` sections sitting on a `background` to create a natural break.
*   **Nesting Logic:** Treat the UI as physical layers of fine paper.
    *   **Level 0 (Base):** `surface` (#f7f9fb)
    *   **Level 1 (Sections):** `surface_container_low` (#f0f4f7)
    *   **Level 2 (Interactive Cards):** `surface_container_lowest` (#ffffff)
    *   **Level 3 (Elevated Accents):** `surface_container_high` (#e1e9ee)

### Signature Textures
*   **The Glass Rule:** Floating navigation or modal elements should use `surface_container_lowest` at 80% opacity with a `24px` backdrop-blur.
*   **Subtle Gradients:** To add "soul" to CTAs, use a linear gradient from `primary` (#0053db) to `primary_dim` (#0048c1) at 135 degrees. This prevents the "flat-asset" look and provides a tactile, premium feel.

---

## 3. Typography

The system utilizes **Inter** for its neutral, architectural quality. The hierarchy is designed to feel like an editorial layout where the scale does the heavy lifting.

*   **Display (lg/md):** Reserved for Hero sections. Tracking should be set to `-0.02em` to create a tight, authoritative "headline" look.
*   **Headline (lg/md):** Used for primary section titles. These should always sit on a significant bed of whitespace (minimum 80px top margin).
*   **Title (sm/md):** Used for card titles. Use `on_surface` to ensure maximum legibility against light containers.
*   **Body (lg/md):** Use `on_surface_variant` (#566166) for long-form text to soften the contrast and improve reading stamina.
*   **Label:** Always uppercase with `+0.05em` letter spacing to denote secondary metadata or "overlines."

---

## 4. Elevation & Depth

We avoid the "pasted-on" look of traditional drop shadows in favor of **Ambient Light**.

*   **Tonal Stacking:** A card using `surface_container_lowest` placed on a `surface_container_low` background creates a "Ghost Lift." This is the preferred method for elevation.
*   **Ambient Shadows:** If a floating state is required (e.g., a dropdown), use a highly diffused shadow:
    *   `box-shadow: 0 12px 40px rgba(42, 52, 57, 0.06);`
    *   The shadow is tinted with `on_surface` to feel like natural occlusion rather than gray ink.
*   **The Ghost Border Fallback:** For accessibility in forms, use `outline_variant` (#a9b4b9) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` fill or subtle gradient. Radius: `md` (0.375rem). No border. High contrast text using `on_primary`.
*   **Secondary:** Ghost style. No background, `outline` token at 20% opacity. Text in `primary`.
*   **Tertiary:** Text-only with a subtle `primary_container` background on hover.

### Cards & Containers
*   **Strict Rule:** No dividers. Use vertical spacing (using the `xl` or `lg` scale) to separate content.
*   **Interaction:** On hover, a card should transition from `surface_container_lowest` to a subtle "lift" using the Ambient Shadow, rather than changing border color.

### Input Fields
*   **Base State:** `surface_container_highest` background with a `0.25rem` radius.
*   **Active State:** `surface_container_lowest` background with a 1px `primary` ghost border (20% opacity).
*   **Focus:** A soft `2px` outer glow using `primary_fixed_dim`.

### Selection Chips
*   Use `secondary_container` with `on_secondary_container` text. The roundedness should be `full` to contrast against the more architectural `md` radius of cards and buttons.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical padding. Allow more room on the left of a headline than the right to create "Editorial Flow."
*   **Do** use `primary` sparingly. It is a "light-switch"—it should only appear where action or high-priority focus is required.
*   **Do** stack surfaces. A `surface_container_lowest` card on a `surface_container_low` background is the "Gold Standard" for this system.

### Don't
*   **Don't** use 1px solid borders to separate sections. It breaks the "Curator" aesthetic and makes the UI look like a legacy enterprise app.
*   **Don't** use pure black (#000). Always use `inverse_surface` or `on_background` for dark elements to keep the palette sophisticated and "ink-like."
*   **Don't** crowd the edges. If a component is within 24px of another, it is likely too close. Refer to the Spacing Scale for generous gutters.