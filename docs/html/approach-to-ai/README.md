# approach-to-ai

Five self-contained HTML/CSS/JS mockups for the **"How Movemental Approaches AI"** page — the editorial covenant that governs how the platform uses AI.

Each file is a single page with inline `<style>` and `<script>` — no build step. Open directly in a browser.

Same copy in every direction (per the Stitch prompt). Only layout, interaction, and visual conceit change.

## Shared design contract

- **Palette:** Paper (`#faf6ee`) · Alt Band (`#f2ece0`) · Ink (`#19150f`) · Midnight (`#141110`) for authority bands · Destructive (`#9c2d20`) used *strictly* as a "Red Light" accent.
- **Type:** Inter for body, UI, and labels; Newsreader italic *sparingly* for stressed words inside display lines.
- **Layout:** 1200px max content column; narrow reading measures (640–740px) for heavy text blocks; hairlines (`#e6ddcb`) for structure.
- **No:** drop shadows, neon gradients, raw hex outside the palette, 1px solid sectioning borders.

## Directions

| #  | File                                                       | Approach                                                                                                       |
| -- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 01 | [01-editorial-manifesto.html](01-editorial-manifesto.html) | Long-form editorial spread · floating chapter index with scroll-spy · drop cap on the framing article          |
| 02 | [02-traffic-light-console.html](02-traffic-light-console.html) | Console-bar chrome · mini policy state panel in hero · mirror toggle · acid-test tabs · expandable lights      |
| 03 | [03-diagrammatic.html](03-diagrammatic.html)               | SVG infrastructure-stack hero · interactive mirror/amplifier diagram · acid-test slider · vertical lights timeline |
| 04 | [04-governance-charter.html](04-governance-charter.html)   | Printed-document treatment · Articles I–IV with sticky sidenote marginalia · numbered Named Permissions / Refusals ledger · signatures block |
| 05 | [05-stepped-walkthrough.html](05-stepped-walkthrough.html) | Argument in four numbered steps · sticky progress bar with active-step indicator · italic Roman marker glyphs per step |

## How to view

```bash
# from repo root
open docs/html/approach-to-ai/01-editorial-manifesto.html
# (or just open the file in your editor's preview / drag into a browser)
```

## Notes

- Each file uses identical CSS custom properties at `:root` so palette swaps are trivial.
- The destructive color is reserved for Red Light indicators only — never for general accent or links.
- Newsreader is used as a *stress* font, not a body font; if a line looks busy, the italic is doing too much.
- All interactive controls have `aria-pressed` / `aria-expanded` state and respect `prefers-reduced-motion`.
