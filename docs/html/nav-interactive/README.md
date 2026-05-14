# nav-interactive

Fifteen HTML/CSS/JS mockups exploring how to upgrade the movemental.com top-of-page chrome
(Movemental Path + Audiences mega-menus) and the home hero — without changing any copy.

Spec: [docs/build/prompts/nav-interactive-hero-and-mega-menu.md](../../build/prompts/nav-interactive-hero-and-mega-menu.md).

Each file is self-contained — inline `<style>` and `<script>`, no build step. Open directly in a browser.

## First set — directions A–E

These argue about *how the chrome teaches the path's structure*. Same uniform card styling per stage.

| #  | File                                                 | Approach                                                                            |
| -- | ---------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 01 | [01-atlas-stages.html](01-atlas-stages.html)         | Full-width stepper mega-menu · six-dot system spine in hero                         |
| 02 | [02-trail-map.html](02-trail-map.html)               | SVG hand-drawn trail · terrain-tinted audience tiles · larger trail-map in hero     |
| 03 | [03-compass.html](03-compass.html)                   | Split-pane mega-menu with live preview · tabbed stage carousel in hero              |
| 04 | [04-editorial-index.html](04-editorial-index.html)   | Book-of-the-site chapter list · centered editorial hero with italic serif emphasis  |
| 05 | [05-living-system.html](05-living-system.html)       | Diagrammatic chrome · spine + branches diagram replaces hero gadget                 |

## Second set — directions F–J (per-stage visual identity)

Each path stage gets a **distinct visual identity** matching what it *actually is*:
**Safety** = policy/charter documentation with an attention indicator for live threats;
**Sandbox** = console/training arena;
**Skills** = transformative cohort syllabus;
**Solutions** = agentic architecture built on cleaned data.

Hero copy is identical to production in every mockup. Only the layout, background, and illustration change.

| #  | File                                                                | Approach                                                                                                       |
| -- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 06 | [06-artifact-cards.html](06-artifact-cards.html)                    | Four artifact cards (charter / console / syllabus / architecture) · two-intelligences weave thumbnail in hero  |
| 07 | [07-stacked-layers.html](07-stacked-layers.html)                    | Stack-of-layers mega · ribboned banded background in hero with mini stack card                                 |
| 08 | [08-editorial-spread.html](08-editorial-spread.html)                | Magazine 2-page spread with art-directed numerals · drop-cap full editorial hero on a faint baseline grid      |
| 09 | [09-status-console.html](09-status-console.html)                    | Live system register with attention indicator on Safety · status bar + signal-collapse panel in hero           |
| 10 | [10-two-intelligences-weave.html](10-two-intelligences-weave.html)  | Each stage shows corpus + relational strands woven differently · full-bleed weave background in hero           |

## Third set — directions K–O (analog & editorial registers)

Five more directions that stay grounded in the brand vocabulary (paper, ink, hairlines, editorial register, charters, cohorts, agentic builds) and lean into different on-brand artifact metaphors. Each path stage keeps its distinct visual identity. Hero copy is byte-identical to production; only layout, background, and illustration vary.

| #  | File                                                       | Approach                                                                                                       |
| -- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| 11 | [11-catalog-cards.html](11-catalog-cards.html)             | Library catalog cards with typed fields and punch-holes · fanned title-card stack in hero on a faint grid      |
| 12 | [12-cohort-calendar.html](12-cohort-calendar.html)         | Quarterly program calendar with cohort statuses · year-card calendar in hero on a calendar-grid background     |
| 13 | [13-editorial-ledger.html](13-editorial-ledger.html)       | Numbered ledger with tabular numerals and kind/outcome columns · intelligence balance-sheet card in hero       |
| 14 | [14-press-imprint.html](14-press-imprint.html)             | Letterhead bar + per-stage seals (charter / tested / laurel / build-plate) · large charter seal in hero        |
| 15 | [15-reading-room-shelf.html](15-reading-room-shelf.html)   | Four volumes on a wooden shelf with active spine raised · focused Volume I card with bookmark ribbon in hero   |

**Active state:** every mockup pins **Path stage 01 · Safety** as the current stage.
**Tokens:** the Concept Modern palette from [src/app/globals.css](../../../src/app/globals.css) is mirrored verbatim at `:root` in each file.
