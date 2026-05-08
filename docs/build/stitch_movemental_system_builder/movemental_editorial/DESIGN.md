```markdown
# Design System Document: The Architectural Manifesto

## 1. Overview & Creative North Star

### The Creative North Star: "The Living Manifesto"
This design system rejects the ephemeral nature of standard web interfaces in favor of the permanence and authority of a high-end strategy firm’s printed ledger. It is designed for "Movemental · Perfect church platform · exemplar," focusing on a long-scroll editorial experience that conveys high trust, deep structure, and quiet confidence.

The "Living Manifesto" aesthetic is achieved through **intentional austerity**. By removing traditional UI crutches—such as drop shadows, rounded corners, and decorative borders—we force the layout to rely on world-class typography and sophisticated tonal shifts. This is not a "user interface" in the traditional sense; it is a digital archive of record.

**Core Principles:**
*   **Asymmetric Precision:** Break the rigid center-aligned grid. Use intentional whitespace to guide the eye and create an editorial rhythm.
*   **Tonal Logic:** Hierarchy is defined by the weight of the color, not the depth of a shadow.
*   **Zero-Radius Geometry:** Sharp corners only. The 0px rounding scale communicates institutional strength and architectural precision.

---

## 2. Colors

The palette is rooted in the tactile world of physical print—ink on heavy-stock cream paper.

### Surface Hierarchy & Nesting
This design system prohibits the use of 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts or the "No-Line" rule.

*   **Primary Surface (`surface` / `#faf6ee`):** The default state. Evokes warm, premium paper.
*   **The Tonal Shift (`surface-container` / `#f2ece0`):** Used for alternating bands in the long-scroll. This subtle shift provides a "rest" for the eyes without breaking the flow of the document.
*   **The High-Contrast Emphasis (`inverse-surface` / `#141110`):** Reserved for "Midnight" bands. Use this for the most critical strategic pillars or the footer. Typography here must switch to `on-primary` (#f4efe5).

### The "No-Line" Rule
Traditional borders create visual noise. To separate content:
1.  **Tonal Stacking:** Place a `surface-container-high` card on top of a `surface` background.
2.  **Vertical Breathing:** Increase spacing by 1.5x the standard margin to denote a new thematic section.
3.  **Hairline Exception:** Hairlines (`outline-variant` at 20% opacity) are only permitted inside "Ledger Rows" (data tables) or as vertical "Inset Asides" for marginalia.

---

## 3. Typography

The typographic soul of this system lies in the tension between the academic rigor of **Instrument Serif** and the functional clarity of **Inter**.

*   **Display & Headline (Instrument Serif):** These should be treated as architectural elements. Use *Italic* variants for emphatic display text to mimic a curated, editorial feel. Letter-spacing should be slightly tightened for large headlines to increase "ink density."
*   **Body & Structure (Inter):** Used for all functional reading. Keep line lengths between 60–75 characters to maintain the "Strategy Paper" readability standard.
*   **Labels & Metadata:** All caps with increased letter-spacing (0.05em) using Inter. This identifies structural data without competing with the editorial voice.

---

## 4. Elevation & Depth

### The Layering Principle
We do not use shadows to create depth. Instead, we use "Tonal Layering."
*   **Level 0:** Base `surface` (#faf6ee).
*   **Level 1 (Subtle Lift):** `surface-container-low`.
*   **Level 2 (Active Element):** `surface-container-highest`.

### Ambient Softness (The Ghost Fallback)
If an element must "float" (e.g., a sticky navigation bar), use a **Glassmorphism** effect:
*   **Background:** `surface` at 80% opacity.
*   **Backdrop Blur:** 20px.
*   **Border:** None. The blur itself creates the edge.

### Sharpness by Default
All containers, buttons, and inputs must have a **0px border-radius**. Rounding is viewed as a concession to "consumer" tech; sharpness is the hallmark of professional-grade tools.

---

## 5. Components

### Buttons: The "Block" Action
*   **Primary:** Solid `primary` (#645d55) background, `on-primary` (#fff6ee) text. Rectangle shape, no rounding.
*   **Secondary:** Ghost style. No background, `outline` (#838172) at 20% opacity for the border.
*   **Interaction:** On hover, the background should shift to a slightly darker tone (`primary-dim`) or the ghost border should become 100% opaque. No "bounce" or "pop" animations; use simple, 200ms linear fades.

### Ledger Rows (Lists)
Do not use standard cards. Use "Ledger Rows":
*   A full-width horizontal area.
*   Separated by a single 0.5px hairline (`outline-variant`) only at the bottom.
*   Columns should be asymmetrically weighted, favoring the primary text.

### Input Fields: The "Typewriter" Field
*   **Styling:** A simple bottom-border only (`outline-variant`).
*   **Focus State:** The bottom border thickens to 2px using `primary`.
*   **Labels:** Small, all-caps Inter `label-sm` placed 8px above the input line.

### Editorial Asides
A component unique to this system. Small blocks of text (Inter, `body-sm`) placed in the right or left "gutters" of the long-scroll. These provide context or "Movemental" exemplars without interrupting the primary narrative flow. Use a vertical `primary` hairline to the left of the aside.

---

## 6. Do's and Don'ts

### Do:
*   **Embrace Verticality:** Use generous white space between sections. If a section feels crowded, double the padding.
*   **Use Intentional Italics:** Use Instrument Serif Italic for pull-quotes that act as "thematic anchors" throughout the scroll.
*   **Align to the Type Grid:** Ensure all elements, especially in the "Midnight" bands, align to a strict baseline grid.

### Don't:
*   **No Rounded Corners:** Never use `border-radius`. A single rounded corner will break the architectural integrity of the system.
*   **No Generic Icons:** Avoid "out-of-the-box" icon libraries. If an icon is required, it must be a minimal, thin-stroke (1px) custom SVG that matches the stroke weight of the Inter typeface.
*   **No Vibrant Colors:** Do not introduce colors outside the specified palette. Trust is built through consistency and restraint.
*   **No "Cards" on Surfaces:** Avoid placing white boxes on cream backgrounds. Instead, use a tonal shift in the background color itself to define the area.

---

**Director’s Note:** 
Remember, we are building a *System Map*, not a dashboard. Every pixel should feel like it was placed by a cartographer. If a design choice feels "easy," it is likely too generic for this system. Seek the tension between the ink and the paper.```