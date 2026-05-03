# Movemental Reader (internal)

A zero-dependency HTML/CSS/JS reader for everything we've drafted:

- The **manuscript** at `docs/book-development/manuscript-ordered/`
- The full **articles** set at `docs/articles/`

Design follows the Digital Curator system in [`docs/design/DESIGN.md`](../design/DESIGN.md) — same tokens, Inter, light-default with optional dark, Midnight hero band.

## How to run

Browsers block `fetch()` for local files under `file://`. Serve the `docs/` folder with any static server:

```bash
pnpm reader:serve                    # python3 -m http.server on :8765
open http://localhost:8765/reader/
```

Or without npm scripts: `python3 -m http.server 8000 -d docs`, or `npx serve docs -l 8000`.

## Keeping content in sync

Whenever you add, rename, or delete a file in `docs/articles/` or `docs/book-development/manuscript-ordered/`, run:

```bash
pnpm reader:sync        # rescan and rewrite assets/manifest.js
pnpm reader:check       # CI-friendly: exit 1 if manifest is stale
```

The script ([`sync-manifest.mjs`](./sync-manifest.mjs)):

- Rescans both directories and rewrites `assets/manifest.js` deterministically.
- **Preserves your category assignments** — it keys on file path, so edits you made to the `category` field survive across runs.
- **Flags new files** with `category: "uncategorized"` and prints them so you can triage. An "Uncategorized (needs triage)" pill appears in the reader UI until you assign them.
- Reports added / removed / title-changed files and updated word counts.
- Book chapters are auto-ordered by numeric prefix (`00-`, `01-`, `10a-`, …). `Chapter N: Title` headings are split into `label` + `title` automatically.

Assigning a category to a new article: open [`assets/manifest.js`](./assets/manifest.js), find the line, change `"uncategorized"` to one of `system`, `credibility`, `content`, `courses`, `nonprofit`, `platform`, `narrative`. Add a new category by appending to `articleCategories` in the file (sync preserves custom additions too).

## Features

- **Library view** — hero with running totals, two tabs (Book · Articles), category filter pills for articles.
- **Reader view** — sticky chapter sidebar, centered prose column, right-rail page TOC (auto-generated from headings), reading-progress bar, prev/next chapter nav.
- **Font scale** (`A A A A`) — 4 steps, persisted.
- **Theme** — light / dark toggle, syncs with `prefers-color-scheme` on first visit, persisted.
- **Progress memory** — scroll position per doc + per-doc "mark as read" (localStorage, key-prefix `movemental-reader:`).
- **Keyboard** — `←` / `→` jump to prev/next chapter while inside the book.
- **Print-friendly** — strips chrome and prints the prose cleanly.

## File layout

```text
docs/reader/
├─ index.html            # single-page shell (library + reader via #/ hash routes)
├─ sync-manifest.mjs     # rescans docs/ and rewrites assets/manifest.js
├─ assets/
│  ├─ manifest.js        # auto-generated index — safe to hand-edit 'category' fields
│  ├─ reader.css         # Digital Curator tokens + layout
│  └─ reader.js          # router, markdown render, progress, theme, storage
└─ README.md
```

Word counts drive reading-time estimates (~220 wpm) and are refreshed on every `pnpm reader:sync`.

The only runtime dependency is [`marked`](https://marked.js.org/) via CDN.

## Not part of the site build

This reader is intentionally outside `src/` so it won't affect `pnpm build`, routing, or prod deploys. It's a read-only internal tool.
