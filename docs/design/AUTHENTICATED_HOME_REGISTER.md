# Authenticated product home — editorial register

This document defines **magazine-quality editorial register** for the three authenticated product homes:

- **SafeStart** — `/safestart`
- **SandboxLive** — `/sandboxlive` (active engagement home)
- **Movement leader overview** — `/leader` (Author reflection landing)

These surfaces are where a senior leader’s **first authenticated impression** is formed. They should read like opening a substantial editorial work (field guide, long-form profile), not a SaaS dashboard.

## Alignment references

- **Vertical scale & hero rhythm** — public Field Guide hero bands (`hero`, `hero--field-guide` in `src/app/recipes.css`): generous vertical padding (target **96–120px** top on desktop, easing on small viewports), breathing room before the first interior band.
- **Pacing & proof** — public `/movement-leaders/[slug]` and field-guide articles: sequential reading, typographic hierarchy, restrained chrome.

## Hero band

- **Padding** — `padding-top` in the **clamp(6rem, 10vw, 7.5rem)** range (96–120px effective on common desktop widths); proportional bottom padding so the band feels like a chapter opener, not a utility header.
- **Eyebrow** — uppercase, letterspaced label in **burnished amber** (`pathway-accent` token — `#b8893a`), not muted gray.
- **Display** — **Newsreader** (`font-serif` / `--font-serif`) **italic**, fluid **48–64px** scale (`clamp(3rem, 5.5vw, 4rem)` or equivalent). Org name, cohort state, or leader name is the dominant line.
- **Lede** — **Inter**, **17px**, comfortable line height (~1.6), **max-width 600px**, secondary ink (`text-muted-foreground` or controlled `text-foreground` for emphasis only inside prose).

## Below the hero

- **Bands** — major sections are **editorial bands** separated by **hairline rules** (`border-border` / `border-t`), not card grids or elevated tiles.
- **No dashboard skin** — avoid card shadows, dense grids of metrics, and “widget” framing. Depth comes from **tonal stacking** (background / section) and **rules**, per DESIGN.md.

## Status and progress

- **Status copy** — set as **Newsreader italic** running lines (short paragraphs), e.g. cohort phase and next session as *prose*, not KPI tiles, badge components, or uppercase micro-label strips.
- **Numerals** — phase index, workspace index, and section index use **italic Newsreader** at band-appropriate sizes (24–32px) as the **dominant typographic mark** in lists — still not “dashboard numbers in a card.”

## CTAs

- **Default** — **text links** with hairline-adjacent rhythm (underline, offset, hover to pathway accent). No filled “secondary buttons” for navigation blocks.
- **Single primary** — **one** filled action per home band where a decisive step exists; fill uses **burnished amber** (`bg-pathway-accent`) with **legible dark ink** on the label. No competing primary fills.

## Lists: workspaces, phases, sections

- **Layout** — vertical list of **editorial rows**: optional left rail — **3px solid `pathway-accent`** for the **current** workspace / phase / active item only; others use a transparent or absent rail so alignment stays optical.
- **Spacing** — generous **padding-y** per row (not compact table density).
- **Typography** — number (italic serif, amber), title (italic serif), one-line description (Inter 14px muted), meta/status (Inter 11px italic muted) as specified per product copy deck.
- **Borders** — row separators = **hairline** horizontal rules; **no** card shadow, **no** `rounded-xl` product cards for these lists.

## Forbidden on these homes

- **SaaS icon + label tiles** for navigation.
- **Badge** UI components for status.
- **Progress bars** except the **small pathway-accent rail** already provided in `AuthenticatedShell` for pathway progress — do not duplicate bar widgets on the page body.

## Cross-product consistency

All three homes share:

- Same hero **scale**, **eyebrow color**, **display font treatment**, and **lede width**.
- Same **hairline** sectioning vocabulary.
- Same **row list** grammar (amber numeral, italic title, muted description).
- Same **primary CTA** treatment (single amber fill when needed).

Visual variance is **copy and band titles** only — not a different layout system per product.
