# HTML template prompts (exemplar pages)

These prompts turn the UI patterns catalogued in [dev-repos-ui-ux-exemplars.md](../dev-repos-ui-ux-exemplars.md) into **standalone static HTML** (exemplar pages ship under [`templates/alan-hirsch/exemplars/`](../../../templates/alan-hirsch/exemplars/); marketing drafts remain under `docs/html/`), using **Movemental’s canonical design** from [docs/design/DESIGN.md](../../design/DESIGN.md) and the shared stylesheet [docs/html/site-templates/site-theme.css](../../html/site-templates/site-theme.css).

**Read first for static work:** [STATIC_HTML_AND_TEMPLATES.md](../../design/STATIC_HTML_AND_TEMPLATES.md) — mandatory `<head>` order, token parity, shell choice, forbidden patterns, and validation checklist.

**Canonical pattern names, trust primitives, and layout recipes** (static HTML parity + exemplar mapping) live in **DESIGN.md §14** — update that section when you add or rename exemplar-level compositions.

| Prompt | Output file (suggested) |
|--------|-------------------------|
| [html-template-ebook-reader.md](./html-template-ebook-reader.md) | `templates/alan-hirsch/exemplars/exemplar-ebook-reader.html` |
| [html-template-article-detail.md](./html-template-article-detail.md) | `templates/alan-hirsch/exemplars/exemplar-article-detail.html` |
| [html-template-content-library.md](./html-template-content-library.md) | `templates/alan-hirsch/exemplars/exemplar-content-library.html` |
| [html-template-landing-course.md](./html-template-landing-course.md) | `templates/alan-hirsch/exemplars/exemplar-landing-course.html` |
| [html-template-landing-general.md](./html-template-landing-general.md) | `templates/alan-hirsch/exemplars/exemplar-landing-general.html` |
| [html-template-hero-cinematic.md](./html-template-hero-cinematic.md) | Section in a page or `exemplar-hero-cinematic.html` |
| [html-template-hero-product-split.md](./html-template-hero-product-split.md) | Section or `exemplar-hero-product-split.html` |
| [html-template-hero-scroll-narrative.md](./html-template-hero-scroll-narrative.md) | Section or `exemplar-hero-scroll-narrative.html` |
| [html-template-card-book.md](./html-template-card-book.md) | `exemplar-cards-book.html` or embedded in library page |
| [html-template-card-article.md](./html-template-card-article.md) | `exemplar-cards-article.html` or embedded |
| [html-template-card-video.md](./html-template-card-video.md) | `exemplar-cards-video.html` or embedded |
| [html-template-wildcard-doc-workspace.md](./html-template-wildcard-doc-workspace.md) | `exemplar-wildcard-doc-workspace.html` |
| [html-template-wildcard-editor-chrome.md](./html-template-wildcard-editor-chrome.md) | `exemplar-wildcard-editor-chrome.html` |
| [html-template-wildcard-collab-presence.md](./html-template-wildcard-collab-presence.md) | `exemplar-wildcard-collab-presence.html` |
| [perfect-church-platform-movemental-template-prompts.md](./perfect-church-platform-movemental-template-prompts.md) | `docs/html/perfect-church-platform-movemental/` (dedicated pack + Stitch section) |
| [perfect-seminary-platform-movemental-template-prompts.md](./perfect-seminary-platform-movemental-template-prompts.md) | `docs/html/perfect-seminary-platform-movemental/` (dedicated pack + Stitch section) |
| _(no prompt yet — authored from sibling repo patterns)_ | `exemplar-top-nav-header.html` |
| _(no prompt yet)_ | `exemplar-home-heroes.html` |
| _(no prompt yet)_ | `exemplar-feature-sections.html` |
| _(no prompt yet)_ | `exemplar-data-visualization.html` |
| _(no prompt yet)_ | `exemplar-ui-components.html` |

### Built exemplar pages (repo)

These files live under `templates/alan-hirsch/exemplars/` (static HTML previews of sibling-repo UI patterns; they load `docs/html/site-templates/site-theme.css`):

- [`exemplar-ebook-reader.html`](../../../templates/alan-hirsch/exemplars/exemplar-ebook-reader.html)
- [`exemplar-article-detail.html`](../../../templates/alan-hirsch/exemplars/exemplar-article-detail.html)
- [`exemplar-content-library.html`](../../../templates/alan-hirsch/exemplars/exemplar-content-library.html)
- [`exemplar-landing-course.html`](../../../templates/alan-hirsch/exemplars/exemplar-landing-course.html)
- [`exemplar-landing-general.html`](../../../templates/alan-hirsch/exemplars/exemplar-landing-general.html)
- [`exemplar-hero-cinematic.html`](../../../templates/alan-hirsch/exemplars/exemplar-hero-cinematic.html)
- [`exemplar-hero-product-split.html`](../../../templates/alan-hirsch/exemplars/exemplar-hero-product-split.html)
- [`exemplar-hero-scroll-narrative.html`](../../../templates/alan-hirsch/exemplars/exemplar-hero-scroll-narrative.html)
- [`exemplar-cards-book.html`](../../../templates/alan-hirsch/exemplars/exemplar-cards-book.html)
- [`exemplar-cards-article.html`](../../../templates/alan-hirsch/exemplars/exemplar-cards-article.html)
- [`exemplar-cards-video.html`](../../../templates/alan-hirsch/exemplars/exemplar-cards-video.html)
- [`exemplar-wildcard-doc-workspace.html`](../../../templates/alan-hirsch/exemplars/exemplar-wildcard-doc-workspace.html)
- [`exemplar-wildcard-editor-chrome.html`](../../../templates/alan-hirsch/exemplars/exemplar-wildcard-editor-chrome.html)
- [`exemplar-wildcard-collab-presence.html`](../../../templates/alan-hirsch/exemplars/exemplar-wildcard-collab-presence.html)
- [`exemplar-top-nav-header.html`](../../../templates/alan-hirsch/exemplars/exemplar-top-nav-header.html)
- [`exemplar-home-heroes.html`](../../../templates/alan-hirsch/exemplars/exemplar-home-heroes.html)
- [`exemplar-feature-sections.html`](../../../templates/alan-hirsch/exemplars/exemplar-feature-sections.html)
- [`exemplar-data-visualization.html`](../../../templates/alan-hirsch/exemplars/exemplar-data-visualization.html)
- [`exemplar-ui-components.html`](../../../templates/alan-hirsch/exemplars/exemplar-ui-components.html)

---

## Shared instructions (prepend mentally to every prompt below)

1. **Read first:** `docs/design/DESIGN.md` (charter) and `docs/design/STATIC_HTML_AND_TEMPLATES.md` (static `<head>` order, shells, token rules, checklist).
2. **Styles:** From an exemplar file, link `docs/html/site-templates/site-theme.css` via a relative path such as `../../../docs/html/site-templates/site-theme.css` (see existing `exemplar-*.html` head blocks).
3. **Typography:** Inter via Google Fonts (static preview exception; production uses `next/font`).
4. **Tokens only:** Use CSS variables from `site-theme.css` / DESIGN.md — no raw Tailwind from React, no ad-hoc hex except where variables are defined in `:root`.
5. **Sectioning:** Prefer **tonal bands** (`background` → `section` → `card`, or `inverse-surface` for midnight) instead of decorative borders between major regions. Per DESIGN.md, hairline `border` is for forms and dense UI sub-panels only.
6. **Motion:** Respect `prefers-reduced-motion: reduce`; any scroll-linked demo must degrade to a static stack.
7. **JS:** Vanishingly small (nav toggle, TOC scroll-spy optional). No React, no build step.
8. **Content:** Placeholder copy only (“Movemental”, “Sample chapter”, etc.); no client secrets; no real PII.
9. **Nav:** Include the same lightweight top nav pattern as other exemplar pages (link back to `docs/html/site-templates/index.html` and sibling `exemplar-*.html` files using the relative paths in existing exemplars).

Sibling repo paths in the per-prompt **Reference IA** blocks are for **information architecture and component responsibilities** only — the visual outcome must still be Movemental.
