# Prompt: Static HTML — editorial book card (Movemental tokens)

## Goal

Implement the **book tile** pattern: 3:4 cover, type badge, optional tier pill, title, excerpt (3-line clamp), footer row (price or date + text CTA). Standalone file or embeddable fragment for the content library page.

## Output

`templates/alan-hirsch/exemplars/exemplar-cards-book.html`  
(or a fragment documented for copy-paste into `exemplar-content-library.html`)

Stylesheet: `./site-theme.css`

## Design constraints (Movemental)

- **Card surface:** `background: var(--card)` on parent `section` of `var(--section)` for ghost lift.
- **Cover:** `aspect-ratio: 3/4`; `border-radius: var(--radius)`; image or neutral placeholder.
- **Badge:** Uppercase micro label; primary-filled chip allowed **only** for “Book” / content-type label size small (not entire card).
- **Title:** `foreground`; hover may shift to `primary` for link cards.
- **Motion:** Optional slight `translateY(-4px)` on `:hover` + `shadow-ambient`; disable when `prefers-reduced-motion: reduce`.
- **No** multi-color glows not derived from DESIGN.

## Reference IA (read-only)

- `StitchBookCard` in `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/content-library/ContentLibraryGrid.tsx`

## Markup (minimum)

- One `<a class="…">` or `<article>` wrapping interactive region with clear focus ring.
- Inner cover `div`, `h3`, `p.excerpt`, footer flex.

## Acceptance criteria

- [ ] At least three example cards in a row/grid for rhythm review.
- [ ] Entire card is keyboard-focusable if implemented as a link.
- [ ] Excerpt uses line-clamp (CSS) without JS.
