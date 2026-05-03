# Prompt: Static HTML — article / post detail template (Movemental tokens)

## Goal

Build a **long-form article detail** page: breadcrumbs, title meta, optional featured image, **table of contents** (desktop sticky rail + mobile “on this page” block), share row, and article body with heading anchors. IA inspired by the sibling reader; **styling is Movemental editorial**, not a clone of another tenant.

## Output

`templates/alan-hirsch/exemplars/exemplar-article-detail.html`  
Stylesheet: `./site-theme.css`

## Design constraints (Movemental)

- **Bands:** Open with light `background` or a short `inverse-surface` hero band only if it improves title contrast; transition into `section` / `card` for body—no hard border stacks between bands.
- **TOC:** Muted foreground for TOC links; `primary` for active section if implementing scroll-spy (optional JS).
- **Prose:** `--prose-max` for article body; generous vertical rhythm (`--section-y-sm` scale for section padding).
- **Share row:** Icon or text links; do not invent new brand colors—use `foreground` / `muted-foreground` / `primary` for actions only.
- **Related / newsletter blocks:** Optional footer blocks on `section` surface as `card` inset panels (ghost lift), not heavy outlines.

## Reference IA (read-only)

- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/content/ArticleReader.tsx`
- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/content/article/` (decomposed pieces)
- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/app/(public)/content/articles/[slug]/page.tsx`

## Page structure (minimum)

1. Nav + skip link.
2. **Breadcrumbs** (muted, small).
3. **Header:** category eyebrow; `h1`; byline / date / read time row using `muted-foreground`.
4. **Optional featured image** with rounded corners (`--radius`) and restrained aspect ratio.
5. **Layout:** two columns on wide screens — **main** (prose) + **aside** (TOC); single column on small screens with TOC collapsed above body or in `<details>`.
6. **Body:** placeholder HTML with `h2`/`h3` sections; ensure each heading has `id="..."` for anchor links; TOC links use `href="#id"`.
7. **Share** strip (placeholder links).
8. **Optional:** “Continue reading” as 2–3 horizontal cards using the same tokens as [html-template-card-article.md](./html-template-card-article.md) (simplified inline version OK).

## Acceptance criteria

- [ ] Semantic HTML (`article`, `nav`, `aside`, `header`).
- [ ] TOC reflects at least four headings.
- [ ] Focus states and skip link present.
- [ ] Token-only palette; Inter loaded like other static templates.
