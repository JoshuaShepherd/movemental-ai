# Prompt: Static HTML — article list card (Movemental tokens)

## Goal

Build the **article tile** pattern: top row (content type + read time), large title, italic excerpt, image band with **grayscale-to-color on hover** (CSS filter), full-width bottom CTA bar. Movemental tokens; grayscale effect must not break contrast for the title area.

## Output

`templates/alan-hirsch/exemplars/exemplar-cards-article.html`  
Stylesheet: `./site-theme.css`

## Design constraints (Movemental)

- **Surface:** Slightly recessed feel via `section`-tone panel (`background` slightly different from page)—use token variables; if `site-theme.css` lacks `surface-container-low` equivalent, use `card` on `section` parent with padding only (no new hex).
- **Image strip:** Fixed height (e.g. `12rem`); `object-fit: cover`; `filter: grayscale(1)` default, `grayscale(0)` on `:hover` on the card link; reduce motion = always color or always grayscale (pick one).
- **CTA bar:** Primary-filled full width is allowed **inside this card pattern** as a deliberate affordance (mirrors reference IA)—keep text `primary-foreground`.

## Reference IA (read-only)

- `StitchArticleCard` in `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/content-library/ContentLibraryGrid.tsx`

## Markup (minimum)

- Grid of 2–4 cards.
- Each card: link wrapping title + excerpt + image + CTA span.

## Acceptance criteria

- [ ] Hover/focus states visible for keyboard (`:focus-visible` on link).
- [ ] Grayscale transition disabled under `prefers-reduced-motion: reduce`.
- [ ] No borders around entire card; separation from page = parent surface only.
