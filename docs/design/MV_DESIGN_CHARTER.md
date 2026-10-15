# Movemental "Paper" design charter

The design system for the new movemental.ai public site, built around Resolve and Respond. It governs every page in the `(new)` route group (`src/app/(new)/`), which carries the `-new` route suffix until migration cuts over.

Paper, ink and one blue. The site reads like a serious editorial publication and an institutional research organization, with the polish of a good software company. It is human, intellectual, credible, contemplative and technically capable.

## Sources of truth

| What | Where |
|---|---|
| Tokens (machine-readable) | [`docs/design/mv/tokens.json`](./mv/tokens.json) |
| Brand book (content and visual rules) | [`docs/design/mv/BRAND_BOOK.md`](./mv/BRAND_BOOK.md) |
| Component reference (markup and states) | [`docs/design/mv/components/`](./mv/components/) |
| Live implementation | [`src/app/(new)/mv.css`](../../src/app/(new)/mv.css) and [`src/app/(new)/layout.tsx`](../../src/app/(new)/layout.tsx) |
| Shared React pieces | [`src/components/mv/`](../../src/components/mv/) |
| Design canvas (pixels and copy) | The Claude Design canvas "Movemental home hero", Current page; boards are committed under `docs/handoff/<page>-new/source/` as they migrate |
| Upstream design system | The Claude Design System artifact "Movemental" (same tokens; edit there first, then copy `tokens.json` here) |

When these disagree, the order of authority is: the committed board source for a page, then `tokens.json`, then this charter, then `mv.css`. Fix `mv.css` to match, never the other way round.

## Scope and isolation

- Every Paper page lives in `src/app/(new)/` and renders inside `.mv-surface`, set by the group layout.
- The root layout puts `.ink-band-surface` on `<body>`. `mv.css` resets Ink Band's heading face and weight inside `.mv-surface` with a doubled selector. Do not remove it.
- Paper tokens are `--mv-*` custom properties declared on `.mv-surface`. Classes are `mv-*`. Nothing Paper touches `globals.css`, `--color-ink-band-*`, `--font-ink-*` or Tailwind `@theme`.
- Ink Band remains the system for `/agent`, `/agent-runtime` and auth. The two never share tokens or components.
- Every `-new` page is `noindex` (set in the group layout) until cutover.

## Tokens

### Color

| Token | Value | Use |
|---|---|---|
| `--mv-ground` | `#FFFFFF` | Page background. The site is white; there is no dark theme. |
| `--mv-sheet` | `#F6F7F9` | Paper bands, the Resolution sheet, panels. |
| `--mv-ink` | `#1C1D24` | Primary text, the primary button, signature rules. |
| `--mv-body-muted` | `#34363F` | Long explanatory paragraphs. |
| `--mv-graphite` | `#5B5E6B` | Captions, counts, labels, quiet links. Never body copy longer than two lines. |
| `--mv-rule` | `#DDDFE5` | Hairlines and borders. Decorative only. |
| `--mv-accent` | `#2236C4` | Ultramarine. Focus rings, link hover, the one live thing. One element at a time. |
| `--mv-accent-tint` | `#E8EBFA` | Selected-row wash. |
| `--mv-field` | `#0F0F12` | The dark leader-network field only. |
| `--mv-field-line` | `#C9D2FF` | Lit ties and focus rings on the field. |

### Type

Three faces, each with one job. Loaded with `next/font/google` in the group layout.

| Family | Variable | Job |
|---|---|---|
| Instrument Serif, regular only | `--mv-font-display` | Titles, section heads, questions, stage numbers. Large, tight leading, never bold. |
| Source Serif 4 | `--mv-font-reading` | Every statement and every paragraph a person reads closely. A Resolution statement is always in this face. |
| Geist | `--mv-font-ui` | Controls, labels, counts, captions, interface copy. |

Scale (desktop; phone in brackets): hero 78 (46), section 52 (38), large section 64 (38), Resolve/Respond 128 (72), stage title 40, question litany 56 (28), closing 88 (44). Reading 22 / 18. Interface 19, 17, 16, 15, 14, 13.

### Space, radius, size

Content max 1,296px with a 72px gutter (20px on phones), so the text column is about 1,150px. Sections pad 128px (80px on phones). Radii: sheet 4, field 6, card 8, dialog 10, pill 999. Minimum target 44px; primary button 52px tall.

## Layout patterns

| Class | Pattern |
|---|---|
| `.mv-hero` | 52 / 48 two-column hero |
| `.mv-split` | 5 / 7 editorial split: heading left, text right |
| `.mv-desk` | 7 / 5 working layout: interactive left, document right |
| `.mv-step` | Numbered stage row: number, title and text, artifact plate |
| `.mv-caps` | Two-by-two ruled grid, no cards |
| `.mv-proof` | Asymmetric 7 / 5 showcase |

All stack to one column below 1,100px. Nothing scrolls sideways at 390px.

## Rules

1. **One primary action per section.** The ink pill. Everything else is an underlined text link at least 44px tall.
2. **Hairlines over boxes.** Lists are rows divided by `--mv-rule`. Cards are rare and plain, with no shadows.
3. **Show the artifact.** Each method stage shows the thing it produces: a signed charter clause, an inclusion and exclusion list, a formation week, a workspace, a review ledger.
4. **Counts, never names.** Any combined view shows "8 of 9". Below five people, nothing but how many have written theirs.
5. **Say what happens to a person's words** beside every share, invite or count control.
6. **Label examples as examples.** "An illustrative team of nine." Placeholders say "Representative preview."
7. **Every figure links to its source.**
8. **No urgency, scarcity or funnel language. No prices** until pricing is decided.
9. **No AI tropes.** No gradients except the placeholder hatch, no glows, no robots, no neural-net art, no emoji, no animated counters.
10. **Motion is small:** a settle on appear, the network pulse. Both stop under reduced motion.
11. **Plain prose in the voice of the brand book.** No em dashes. Copy from a board is pasted verbatim.

## Adding a component

Add it to the Design System artifact first, with a `README.md` and `preview.html`. Copy both into `docs/design/mv/components/<Name>/`. Then implement it in `src/components/mv/`, using `mv-*` classes and `--mv-*` tokens only. Do not import from `src/components/ui` (shadcn) or `src/components/agent-room` into Paper pages.
