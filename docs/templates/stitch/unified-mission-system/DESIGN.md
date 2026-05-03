# Design System Specification: The Architectural Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Living Archive"**
This design system moves away from the sterile, "disruptive" tropes of Silicon Valley in favor of a grounded, "Living Archive" aesthetic. It is designed to feel like a high-end architectural monograph—authoritative, permanent, and meticulously organized. We reject the "SaaS-lite" aesthetic of pill-shaped buttons and neon accents. Instead, we embrace **Intentional Asymmetry** and **Tonal Depth**.

The system breaks the "template" look by treating the browser as a canvas for editorial storytelling. We use extreme shifts in typographic scale and "The Layering Principle" to create a sense of operational maturity. This is not just a platform; it is a repository of collective intelligence.

---

## 2. Colors & Surface Philosophy
The palette is rooted in organic, earthy tones that suggest longevity and wisdom. We use a "Material-Editorial" approach where color defines the environment rather than just the element.

### The Palette
- **Core Backgrounds:** `surface` (#fbf9f4) and `surface_container_low` (#f5f3ee). These are your primary canvases.
- **The Forest Accent:** `primary` (#23422a). Used sparingly for high-value actions and brand presence.
- **The Terracotta Accent:** `secondary` (#884f45). Used for secondary emphasis and warm human-centric callouts.
- **The Deep Ink:** `on_surface` (#1b1c19). Our "charcoal" for all primary reading experiences.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section content. Traditional "boxes" make a system feel rigid and cheap. Boundaries must be defined by:
1.  **Tonal Shifts:** Placing a `surface_container_highest` (#e4e2dd) card on a `surface` (#fbf9f4) background.
2.  **Generous Gaps:** Using the 64px or 80px spacing increments to create mental boundaries through void.

### Glass & Soul
While we avoid "flashy" gradients, we use **Tonal Gradients** to provide a sense of natural light. For hero sections, use a subtle linear gradient from `primary` (#23422a) to `primary_container` (#3a5a40) at a 155° angle. This mimics the way light hits a textured surface.

---

## 3. Typography: The Editorial Voice
We utilize a high-contrast pairing to establish a hierarchy of "The Lead" (Storytelling) vs "The Data" (System).

### The Serif: Newsreader (Display & Headlines)
*Sophisticated, Intellectual, Grounded.*
- **display-lg (3.5rem):** Reserved for hero impact. Use -0.02em letter spacing.
- **headline-md (1.75rem):** For section starts. Always set in `on_surface`.

### The Sans: Manrope (UI & Body)
*Functional, Modern, Highly Legible.*
- **body-lg (1rem):** The workhorse. Increased line-height (1.6) is mandatory for the "editorial" feel.
- **label-md (0.75rem):** Always Uppercase with +0.05em tracking for a "system-oriented" look in navigation or metadata.

---

## 4. Elevation & Depth: Tonal Layering
We do not use elevation to "lift" objects; we use it to "stack" them like fine stationery.

- **The Layering Principle:** 
    - Level 0: `surface` (The Base)
    - Level 1: `surface_container_low` (In-page sections)
    - Level 2: `surface_container_highest` (Floating cards or interactive elements)
- **Ambient Shadows:** Shadows are rare. When used (e.g., for a modal), use a "Ghost Shadow": `0px 20px 40px rgba(27, 28, 25, 0.06)`. It should look like a soft blur, not a dark edge.
- **The Ghost Border:** If accessibility requires a stroke, use `outline_variant` at 20% opacity. It should be felt, not seen.
- **Glassmorphism:** For floating navigation bars, use `surface` at 80% opacity with a `blur(12px)` effect. This allows the "warmth" of the underlying content to bleed through.

---

## 5. Components

### Cards & Containers
**The Rule:** Forbid divider lines. Use `surface_container` increments.
- **Editorial Cards:** No borders. `0.25rem` (sm) roundedness. Use `surface_container_low` against a `surface` background.
- **Data Cards:** Use `surface_container_highest` to denote interactive utility.

### Buttons (The "Foundational" Style)
- **Primary:** `primary` (#23422a) background with `on_primary` (#ffffff) text. Shape: `0.25rem` (sm) corner radius. Avoid pill shapes.
- **Secondary:** `outline` (#727971) Ghost Border (20% opacity) with `primary` text.
- **Tertiary:** Text-only with a 2px underline in `secondary_fixed_dim`.

### Input Fields
- **Atmosphere:** Inputs should look like a form on a physical document. Use `surface_container_low` as the fill. 
- **States:** Focus state should never be a blue glow. Use a 1px solid `primary` (#23422a) bottom-border only.

### Additional Components: "The Intelligence Feed"
- **The Curator Chip:** Small, `label-sm` text inside a `surface_container_highest` container. Used for tagging systemic issues (e.g., "Policy," "Impact," "Infrastructure").
- **The Breadcrumb Trail:** Using Manrope `label-md` with `secondary` (#884f45) separators to emphasize the "systems" nature of the platform.

---

## 6. Do’s and Don’ts

### Do:
- **Use "White Space" as a Component:** Treat empty space as if it costs money; it is a luxury.
- **Asymmetrical Grids:** Place a headline in the first 4 columns of a 12-column grid and the body text in the last 6 columns.
- **Tinted Shadows:** Always tint your shadows with the `on_surface` color to maintain warmth.

### Don’t:
- **Don't use "Startup Blue":** If a link needs to stand out, use the `secondary` terracotta or the `primary` green. 
- **Don't use Roundness > 0.75rem:** We want the system to feel architectural. Large radii (pill shapes) feel like consumer toys.
- **Don't use Center Alignment for long-form text:** Maintain the "Editorial" integrity with left-aligned, structured blocks.
- **No 100% Black:** Never use #000000. Use `on_surface` (#1b1c19) to maintain the "ink on paper" softness.