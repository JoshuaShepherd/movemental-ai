# Design System Specification: Editorial Sophistication

## 1. Overview & Creative North Star: "The Digital Curator"

This design system is built upon the concept of **The Digital Curator**. It moves away from the frantic, cluttered patterns of traditional social and knowledge platforms, opting instead for the poise of a high-end art gallery or a premium print journal. 

The Creative North Star is defined by **Intentional Restraint**. We achieve a premium feel not through addition, but through the mastery of negative space, asymmetric balance, and tonal depth. By breaking the rigid, boxy constraints of "standard" web design, we create an experience that feels bespoke, authoritative, and calm. This system prioritizes the "quiet" moments, allowing typography and high-quality content to breathe.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule

The palette is rooted in a philosophy of **Atmospheric Neutrals**. We use a deep forest green (`primary`) as our sole intellectual anchor against a landscape of warm off-whites and soft charcoals.

### The "No-Line" Rule
Standard UI relies on 1px borders to separate ideas. This design system forbids them. Boundaries must be defined through **Background Color Shifts**. To separate a sidebar from a main feed, transition from `surface` (#faf9f6) to `surface-container-low` (#f4f3f0). This creates a "soft edge" that feels integrated rather than partitioned.

### Surface Hierarchy & Nesting
Treat the interface as a physical desk of fine paper. 
*   **Base:** `surface` (#faf9f6) for primary page backgrounds.
*   **In-set Content:** `surface-container` (#efeeeb) for secondary regions.
*   **Elevated Elements:** `surface-container-lowest` (#ffffff) for floating cards or interactive modals.
*   **The Signature CTA:** Use a subtle gradient from `primary` (#061b0e) to `primary_container` (#1b3022) to give buttons a sense of "physicality" and weight without resorting to 3D gimmicks.

### Glass & Texture
For floating navigation or overlays, employ **Glassmorphism**:
*   **Background:** `surface` at 80% opacity.
*   **Effect:** `backdrop-filter: blur(12px)`.
*   **Border:** Use the "Ghost Border" (see Section 4).

---

## 3. Typography: The Editorial Voice

The system uses a high-contrast pairing: the intellectual gravity of a serif (`newsreader`) and the modern clarity of a sans-serif (`manrope`).

*   **Display & Headlines (`newsreader`):** These are your "Art Director" moments. Use `display-lg` for hero statements with tight letter-spacing (-0.02em). Headlines should feel like title cards in a film—large, confident, and centered or dramatically left-aligned.
*   **Body & Labels (`manrope`):** Functional and invisible. Use `body-lg` (1rem) for long-form reading to ensure maximum legibility. 
*   **The Hierarchy:** Hierarchy is driven by scale, not weight. Avoid excessive "Bold" weights; use size differentials between `headline-lg` and `body-lg` to guide the eye.

---

## 4. Elevation & Depth: Tonal Layering

We reject the "drop shadow" of 2010. Depth in this system is achieved through light and material properties.

*   **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card atop a `surface-container-low` (#f4f3f0) background. The subtle 2% difference in brightness provides all the separation a sophisticated user needs.
*   **Ambient Shadows:** If an element must float (e.g., a high-level modal), use an ambient shadow: `box-shadow: 0 20px 40px rgba(27, 28, 26, 0.04)`. The shadow is a tinted version of `on_surface`, making it feel like a natural occlusion of light.
*   **The Ghost Border:** For accessibility on white-on-white elements, use the `outline_variant` (#c3c8c1) at 15% opacity. It should be felt, not seen.
*   **Intentional Asymmetry:** Break the grid. Place a `display-md` headline overlapping two columns while the body text remains strictly in one. This creates a "custom-coded" look that avoids the "template" feel.

---

## 5. Components: Refined Primitives

### Buttons
*   **Primary:** Background: `primary` (#061b0e); Text: `on_primary` (#ffffff). Shape: `md` (0.375rem). Use wide horizontal padding (2rem) for a luxurious footprint.
*   **Secondary:** Background: `secondary_container` (#dbe5de); Text: `on_secondary_container` (#5d6661). No border.
*   **Tertiary:** Text only in `primary`. Use for low-emphasis actions like "Cancel" or "View Less."

### Cards & Lists
*   **Constraint:** Zero dividers. Zero borders.
*   **Layout:** Use the Spacing Scale (typically 2rem to 4rem) to separate list items. 
*   **The "Knowledge Card":** A `surface-container-low` container with `xl` (0.75rem) rounded corners. Content inside follows a strict editorial layout (Serif title top, sans-serif metadata bottom).

### Input Fields
*   **Style:** Minimalist underline or soft-fill.
*   **Active State:** Transition from `surface-container-high` to a `surface-container-highest` background with a 1px `primary` bottom-border. Avoid "boxing" the user in.

### The Curator’s Feed (Specialty Component)
An asymmetric grid where items alternate between 1-column and 2-column widths. This mimics the layout of high-end fashion or architecture lookbooks.

---

## 6. Do’s & Don’ts

### Do
*   **DO** use whitespace as a functional element. If a section feels "too empty," add more space, not more content.
*   **DO** use `newsreader` for any text that is meant to be "savored" (quotes, insights, names).
*   **DO** use `surface_variant` for subtle backgrounds of interactive elements to indicate "hover" states.

### Don’t
*   **DON'T** use pure black (#000000). Use `primary` (#061b0e) for the deepest blacks to maintain the forest-green undertone.
*   **DON'T** use 1px solid lines to separate content sections. It breaks the "premium paper" metaphor.
*   **DON'T** use neon or high-vibrancy colors. Every color must feel like it could be found in a natural, dimly lit library.
*   **DON'T** use "Standard" icons. Opt for thin-stroke (1px or 1.5px) custom iconography that matches the weight of the `manrope` typeface.

---

## 7. System Preview: Color & Roundedness

| Token | Value | Usage |
| :--- | :--- | :--- |
| **Primary** | `#061b0e` | CTAs, Headlines, Brand moments |
| **Surface** | `#faf9f6` | Page background (The "Paper") |
| **On-Surface** | `#1b1c1a` | High-emphasis body text |
| **Corner-MD** | `0.375rem` | Buttons, Input fields |
| **Corner-XL** | `0.75rem` | Cards, Large containers |