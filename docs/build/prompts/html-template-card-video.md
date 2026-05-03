# Prompt: Static HTML — video list card (Movemental tokens)

## Goal

Implement the **video tile**: 16:9 thumbnail area, centered play affordance, duration pill, type label, title, optional tier badge + date row. Static HTML only—no real video embed required.

## Output

`templates/alan-hirsch/exemplars/exemplar-cards-video.html`  
Stylesheet: `./site-theme.css`

## Design constraints (Movemental)

- **Thumb:** `aspect-ratio: 16/9`; rounded corners; optional slight opacity increase on hover.
- **Play control:** Circle with `backdrop-filter` blur allowed (glass) using `card` at partial opacity + `inverse-foreground` or `primary` icon on readable background—verify contrast.
- **Duration pill:** Small mono or tabular nums in bottom-right; `foreground` at high opacity on semi-transparent `inverse-surface` or dark mix.
- **Secondary band:** Card may sit on `secondary`-like surface only if token exists; otherwise `card` on `section`.

## Reference IA (read-only)

- `StitchVideoCard` in `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/content-library/ContentLibraryGrid.tsx`

## Markup (minimum)

- 3–6 cards in a responsive grid.
- Play icon: inline SVG `currentColor`.

## Acceptance criteria

- [ ] Play hit area at least 44×44px (can be invisible padding).
- [ ] Duration readable on both light and dark thumb placeholders.
- [ ] Token compliance throughout.
