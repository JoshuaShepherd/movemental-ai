# Design System Specification: Premium Editorial Marketing

## 1. Overview & Creative North Star: "The Institutional Muse"

This design system is built upon the **"Institutional Muse"**—a creative north star that balances the rigid authority of an academic journal with the fluid grace of high-end movement. It is designed to feel permanent, airy, and curated. 

To achieve this, we move away from "web-native" tropes like heavy borders and generic grids. Instead, we embrace **intentional asymmetry** and **tonal depth**. The interface should not look like a series of boxes, but like a single, cohesive canvas where content is revealed through light, shadow, and sophisticated vertical rhythm. We prioritize the "breath" between elements as much as the elements themselves.

---

## 2. Color & Surface Architecture

The palette is rooted in a "cool slate" spectrum, using blue-tinted neutrals to maintain a professional, clinical-yet-premium feel.

### The "No-Line" Rule
**Explicit Instruction:** Sectioning must never be achieved via 1px solid borders. Structural boundaries are defined exclusively through background color shifts. A transition from `surface` (#f7f9fb) to `surface-container-low` (#f2f4f6) provides all the visual separation required for a premium editorial experience.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper. Depth is created by "stacking" tones:
*   **Base:** `surface` (#f7f9fb) for the main page background.
*   **Sectioning:** `surface-container-low` (#f2f4f6) or `surface-container` (#eceef0) for large structural blocks.
*   **Floating Elements:** `surface-container-lowest` (#ffffff) for cards and modals to provide a natural lift.
*   **Nesting:** When placing a card inside a muted section, use `surface-container-lowest` on top of `surface-container`. This "nested" depth replaces the need for heavy shadows.

### Signature Textures & Glass
*   **The Signature Gradient:** For primary CTAs and hero highlights, transition from `primary` (#003ea8) to `primary_container` (#0053db) at a 135° angle. This adds "soul" and prevents the brand blue from feeling flat.
*   **Frosted Navigation:** The top navigation must utilize a backdrop-blur (12px to 20px) combined with a semi-transparent `surface` color. This ensures the editorial content bleeds through the chrome, maintaining a sense of continuity.

---

## 3. Typography: Editorial Authority

We use **Inter** exclusively, but we treat it with the discipline of a master typographer.

| Level | Token | Weight | Letter Spacing | Line Height | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Semibold (600) | -0.02em | 1.1 | Used for high-impact hero headlines. |
| **Headline** | `headline-md` | Medium (500) | -0.01em | 1.2 | Section headings; authoritative and clear. |
| **Title** | `title-lg` | Medium (500) | 0 | 1.4 | Card titles and sub-headings. |
| **Body** | `body-lg` | Regular (400) | 0 | **1.75** | High-readability editorial prose. |
| **Eyebrow** | `label-md` | Bold (700) | **0.05em** | 1.0 | **UPPERCASE.** Used for labels and small tags. |

**Editorial Note:** Use "Eyebrow" labels (uppercase with wide tracking) above `display-lg` headers to create an institutional, categorized look.

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows are too "digital." We use **Ambient Light Simulation.**

*   **The Layering Principle:** Rather than an "Elevation 1, 2, 3" system, use the Surface Hierarchy. If an element needs to feel "closer" to the user, move it to a lighter surface token.
*   **Ambient Shadows:** For floating cards, use a single, ultra-diffused shadow: `0 12px 40px rgba(42, 52, 57, 0.06)`. The color is a tint of our "ink," not pure black, ensuring it feels like a natural shadow on paper.
*   **The "Ghost Border" Fallback:** If accessibility requires a border (e.g., in high-contrast modes or complex forms), use `outline_variant` (#c3c6d7) at **15% opacity**. It should be felt, not seen.
*   **Interactivity:** On hover, a card should not "pop" with a heavy shadow; instead, slightly shift the background tone or subtly increase the ambient shadow blur.

---

## 5. Component Guidelines

### Buttons & Controls
*   **Primary:** `primary` background, `on-primary` text. Radius: `0.375rem` (6px). Use the signature gradient for a premium feel.
*   **Secondary:** `surface-container-high` background. No border.
*   **Pills:** Use `full` radius for tags and status indicators to contrast against the 6px radius of functional controls.

### Cards & Lists
*   **The Divider Ban:** Never use horizontal lines to separate list items. Use **Vertical White Space** (32px - 48px) or subtle tonal shifts between list items.
*   **Editorial Cards:** Cards should have generous internal padding (at least 40px) to maintain the "Airy" aesthetic.

### Input Fields
*   **State:** Default state uses `surface-container-low` with no border. On focus, transition to a `ghost border` and a slight lift using the ambient shadow.
*   **Validation:** Use `error` (#ba1a1a) sparingly. Errors should be communicated via an icon and `label-sm` text, never by turning the entire background red.

### Signature Component: The "Content Rail"
A 1200px centered container. However, allow imagery or secondary pull-quotes to break the rail (asymmetric bleed) to maintain the editorial feel and avoid the "template" look.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use 80px to 120px of vertical padding between sections. Space is a luxury brand attribute.
*   **Do** stack `surface-container` tiers to create hierarchy.
*   **Do** use uppercase eyebrows with `0.05em` tracking for all categorization.
*   **Do** use the `inverse_surface` (Midnight #101820) for high-impact footer sections or "Dark Mode" call-outs within a light page.

### Don’t
*   **Don’t** use 1px solid borders for anything other than essential form clarity.
*   **Don’t** use standard drop shadows; if it looks "fuzzy," it’s too heavy.
*   **Don’t** crowd the text. If a paragraph feels tight, increase the `line-height` to the `1.75` maximum.
*   **Don’t** use pure black (#000000). Use `primary ink` (#2a3439) for all text to keep the palette sophisticated and soft.