---
name: Movemental Research
colors:
  surface: '#fcf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fcf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f5'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e4'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45464d'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1e'
  on-tertiary-container: '#818486'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#fcf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e4'
typography:
  display-title:
    fontFamily: Instrument Serif
    fontSize: 42px
    fontWeight: '400'
    lineHeight: '1.2'
  document-title:
    fontFamily: Instrument Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  h1:
    fontFamily: inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.02em
  h2:
    fontFamily: inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-reading:
    fontFamily: inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-ui:
    fontFamily: inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  metadata:
    fontFamily: inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  sidebar-width: 280px
  content-max-width: 760px
  gutter: 24px
  section-gap: 48px
---

## Brand & Style

This design system is built for an internal research library, emphasizing intellectual rigor, high information density, and a quiet, academic aesthetic. The brand personality is disciplined and sophisticated, aiming to evoke a sense of focus and institutional reliability. 

The design style is a hybrid of **Minimalism** and **Glassmorphism**, leaning heavily into "The New Library" aesthetic. It prioritizes content hierarchy through precise typography and subtle structural division rather than heavy ornamentation. The interface feels lightweight and ephemeral, using translucent layers and frosted glass effects to maintain a sense of spatial depth without relying on traditional shadows.

## Colors

The palette is strictly functional, utilizing a high-contrast foundation for legibility. The background is a crisp white to off-white, providing a neutral canvas for long-form reading. 

- **Primary**: A deep charcoal (#0F172A) used for headers and active states, providing a grounded, authoritative presence.
- **Secondary**: A muted slate (#64748B) reserved for metadata, timestamps, and secondary UI labels.
- **Accent**: A focused blue (#2563EB) used sparingly for interactive highlights, text selection, and primary action indicators.
- **Borders**: All structural divisions use a 1px solid border (#E2E8F0) to maintain a rigid, grid-like structure without visual clutter.

## Typography

This design system utilizes a sophisticated pairing of **Instrument Serif** and **Inter**. 

- **Instrument Serif (Italic)**: Used exclusively for document titles, display moments, and evocative pull quotes. It should always be set in italics to lean into the "archival" and "curated" feel of the research library.
- **Inter**: The workhorse for all UI elements and long-form body text. It is selected for its exceptional legibility at small sizes and high-density environments. 

For markdown content, prioritize a generous line height (1.6) for the `body-reading` style to ensure comfort during extended research sessions.

## Layout & Spacing

The layout follows a **Fixed-Fluid hybrid grid**. 
- A fixed **Sidebar Navigation** (280px) stays docked to the left, providing immediate access to the library's hierarchy.
- The **Main Content Area** is fluid but contains a centered "prose" container with a max-width of 760px to optimize line length for readability.
- **Sticky Headers** use a frosted glass backdrop (backdrop-filter: blur(12px)) to maintain context while scrolling through dense documents.

The rhythm is based on a 4px baseline grid. Use tight spacing for UI components to maintain high density, but increase vertical gaps between prose paragraphs to ensure the text remains inviting.

## Elevation & Depth

In line with the Movemental inspiration, depth is achieved through **Tonal Layering** and **Frosted Glass** rather than shadows.

- **Level 0 (Background)**: Solid white/light-grey base.
- **Level 1 (Panels)**: Sidebar and secondary panels are separated by 1px muted borders.
- **Level 2 (Overlays)**: Sticky headers, dropdowns, and modals use a semi-transparent surface (e.g., `rgba(255, 255, 255, 0.8)`) with a high-quality backdrop-blur. 
- **Active State**: Primary buttons and active sidebar items use solid color fills with no depth, emphasizing a "flat but layered" architectural feel. Shadows should be avoided entirely, or limited to a single 1px "stroke-like" shadow for elevated native-style selects.

## Shapes

The shape language is conservative and professional. A **Soft (0.25rem)** border radius is the standard for almost all UI components, including input fields, buttons, and card containers. This provides a subtle modern touch without feeling overly "app-like" or consumer-oriented. 

Interactive elements like tags or "pills" may use a slightly higher radius, but the overall geometry should remain rectangular and structured to reflect the academic nature of the content.

## Components

- **Sidebar Navigation**: High-density list items. Active states use a subtle background fill (tertiary color) and a vertical 2px accent bar on the left.
- **Sticky Headers**: Minimal height. Text-only titles in `document-title` (Instrument Serif). 1px bottom border.
- **Buttons**:
    - *Primary*: Deep charcoal background, white text, 4px radius.
    - *Secondary*: 1px solid border, no background, slate text.
- **Native-Style Selects**: Use the browser's native appearance where possible, but wrapped in a custom container that matches the system's 1px border and Inter typography.
- **Prose (Markdown)**:
    - *Blockquotes*: Italicized Inter, with a 2px accent-colored left border.
    - *Code Blocks*: Monospace font, light grey background, no border.
    - *Lists*: Custom hanging indents for bullet points to maintain the vertical rhythm.
- **Metadata Chips**: Small-scale `label-caps`, grey background, no border, used for document tags and categories.