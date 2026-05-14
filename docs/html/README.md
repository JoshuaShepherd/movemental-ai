# Static HTML lab (relocated)

All former `docs/html/**` files now live in the monorepo-wide HTML library:

`01-Movemental-Core/1-html/labs/movemental-ai/docs-html/`

When this repo sits next to `1-html` in a Core checkout, scripts resolve that path automatically. For CI or machines with a different layout, set:

`MOVEMENTAL_STATIC_HTML_ROOT` → absolute path to the `docs-html` directory above.

This folder intentionally contains **no** `.html` files so the Next.js repo stays free of hand-authored static pages.
