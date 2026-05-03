# Prompt: Static HTML — ebook / e-reader template (Movemental tokens)

## Goal

Produce a **standalone** prototype of an in-browser book reading experience: sticky reader chrome, chapter navigation, optional sidebar with TOC and reading progress, and a central **editorial prose** column. Information architecture may follow the sibling reference; **visual language must follow Movemental** (`docs/design/DESIGN.md`).

## Output

Create:

`templates/alan-hirsch/exemplars/exemplar-ebook-reader.html`

Link stylesheet:

`./site-theme.css`

Add this file to any sibling nav list in `docs/html/README.md` if that file indexes static templates.

## Design constraints (Movemental)

- **Surfaces:** `background` / `section` / `card` for chrome and panels; use `inverse-surface` + `inverse-foreground` only if the spec calls for a midnight band (e.g. compact top bar is allowed in light `card` with glass blur per DESIGN).
- **Reading column:** Max width aligned with prose intent (`--prose-max: 680px`); comfortable line height; no shrunken type to fit—add padding instead.
- **Primary:** Reserve `#0053db` / `var(--primary)` for active chapter, links that act as navigation, and primary toolbar actions—not full-width blue fields.
- **Depth:** Ghost lift via stacked surfaces; `box-shadow: var(--shadow-ambient)` only for floating toolbar or drawer if needed.
- **Borders:** Use `var(--border)` only for toolbar row, sidebar list dividers, or form-like controls—not between every vertical section.
- **Type:** Inter; display headings `letter-spacing: -0.02em`; small labels uppercase + wide tracking per DESIGN.
- **Motion:** Optional smooth scroll to chapter; honor `prefers-reduced-motion`.

## Reference IA (read-only)

Sibling implementation for **behavior and layout responsibilities** (do not copy colors/spacing literally):

- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/app/(public)/content/books/[slug]/read/page.tsx`
- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/book-reader/reader-chapter-content.tsx`
- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/book-reader/reader-sidebar.tsx`
- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/book-reader/reader-header.tsx`, `reader-toolbar.tsx`, `reader-chapter-nav.tsx`

## Page structure (minimum)

1. Skip link + `site-top` nav (pattern from existing templates).
2. **Reader header:** back link, book title, optional font-size control (three sizes as buttons or segmented control using semantic tokens).
3. **Layout:** CSS Grid or flex — optional **collapsible sidebar** (TOC list + circular or linear progress indicator) + main column.
4. **Chapter block:** small uppercase “Part N” label; chapter title; optional “N min read”; horizontal rule using token border only if it aids scan (otherwise use spacing).
5. **Prose body:** several paragraphs of placeholder + one `h2` / `h3` to show hierarchy; first paragraph may use a subtle drop cap **only** if it stays within editorial restraint (optional).
6. **Prev / next chapter** footer actions.
7. **Mobile:** TOC in a disclosure panel or bottom sheet pattern with minimal JS.

## Acceptance criteria

- [ ] Single HTML file + existing `site-theme.css`; no npm.
- [ ] All colors via `:root` variables from `site-theme.css` (or local fallbacks that match DESIGN hex table).
- [ ] Main text column respects `--prose-max`.
- [ ] No global `dark` class on `html`; midnight used only as intentional band if you include one.
- [ ] Keyboard-focus styles visible on TOC links and buttons.
