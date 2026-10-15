# Movemental

Paper, ink and one blue. Movemental's public site reads like a working document a person could sign: white ground, serif statements on ruled lines, one ultramarine accent for whatever is live right now. This system was extracted from the home page and the Resolution screens on the Movemental design canvas in October 2026, and it is the reference for building movemental.ai in code.

## Content fundamentals

The words carry the design. These rules come from the site's own principles.

- **Plain and declarative.** Short sentences in the reader's language. No em dashes. No runs of rhetorical questions. No negation pairs used for drama ("not X, but Y").
- **Statements are "we," organizational, and defensible.** "We should keep the moments of care human." Every statement in a theme is a position a thoughtful person could hold, including the counter-positions, and none is labeled as wrong.
- **Counts, never names.** Wherever several people's choices are combined, show "8 of 9," never who. Below five people, show nothing but how many have written theirs.
- **Say what the screen does with a person's words.** Every share, invite or count control carries one line saying who will see what. "Inviting a colleague never shows them your choices."
- **No urgency, no manufactured scarcity, no funnel language.** No countdowns, no "only 3 spots left," no "unlock."
- **One primary action per page.** Everything else is visibly quieter: an underlined text link.
- **Sources for every figure.** A number on a page links to where it came from.

Examples of the voice: "About four minutes. No account." · "Riverbend still decides." · "Starting a space gives no one authority. This screen says so."

## Visual foundations

**Color.** White `ground` everywhere. Text in `ink`; captions and counts in `graphite`. The Resolution itself sits on `sheet`, a cool paper grey with a `rule` border and `radius-sheet` corners. `accent` (ultramarine) marks the one live thing: the focus ring, the current theme, the line just starred. Use it on one element at a time. `accent-tint` washes a selected row. `field` is reserved for the dark network figure on the home page.

**Type.** Three faces, each with one job.

- `display` (Instrument Serif, regular only) for titles, theme names and questions. Large, tight leading, never bold.
- `reading` (Source Serif 4) for every statement and every paragraph a person reads closely. A statement is always in this face, wherever it appears.
- `ui` (Geist) for controls, labels, counts and captions.

All three load from Google Fonts: `family=Instrument+Serif:ital@0;1&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;0,8..60,600;1,8..60,400&family=Geist:wght@300;400;500;600`.

**Structure.** Hairlines over boxes. Lists are rows divided by 1px `rule` lines, with the label column at 110px and the statement beside it. Cards are rare and plain: a `rule` border, `radius-field`, no shadow. The only shadow-like effect anywhere is the dialog scrim.

**Layout.** Flow pages are one centered column at `measure-flow`, with a `space-7` gutter (20px on a phone). The result page sets the sheet beside a 300px action column, which stacks under the sheet below 1100px. Sections are separated by `space-6`.

**Controls.** Every button is a pill: `ink` fill, white `button` text, `button-height` tall. Secondary actions are underlined text links at least `target-min` tall. Checkboxes are 22px rounded squares that fill with `ink`. Switches are 40×22 pills. Focus is a 2px `accent` outline, offset 3px, on everything.

**Motion.** Two small motions only: `settle` (fade down 6px over .5s) when something appears, and a brief `accent` rule flash on a line just starred. Both are off under reduced motion.

**Print.** The Resolution prints. Site chrome carries `noprint`; the sheet prints as it looks.

## Iconography

There is no icon set, on purpose. Actions are words. The only marks are the checkbox tick, the theme progress marks (small filled or outlined squares) and the wordmark. If an icon is ever needed, use a 1.5px stroke inline SVG in `ink` and give it a text label.

## Logos

`assets/Logos/movemental-wordmark.png` is the lowercase wordmark used in every header at 22px tall, linked home with `aria-label="Movemental home"`.

## Components

The components here are reference markup, not a packaged library: each card shows the exact markup and states to rebuild in the app. Start with **SiteHeader**, **Button**, **TextLink**, **Field** and **Choice**, then the Resolution pieces: **ResolutionSheet**, **CountRow**, **DifferenceCard** and **ThresholdNote**.
