# Book cover images

**Last updated:** 2026-02-19

## Source

- **Primary:** Fetched from [Open Library Covers API](https://openlibrary.org/dev/docs/api/covers) (by ISBN or title/author search) using `directories/images/scripts/fetch-book-covers.js`. Covers are used under Open Library’s terms; a link back to Open Library on book pages is appreciated.
- **Placeholders:** For a few titles not found in Open Library, `book-hero-maker` was copied to the missing filenames so template pages do not 404. Replace with real covers when available.

## Placeholder files (replace with real covers when possible)

| File | Title | Note |
|------|--------|------|
| `book-multiplier.webp` / `.jpg` | Multiplier (Dave Ferguson) | 2025/2026 release; may not be in Open Library yet |
| `book-legacy-hero-maker.webp` / `.jpg` | The Legacy of a Hero Maker | Placeholder |
| `book-one-eighty.webp` / `.jpg` | One Eighty | Placeholder |
| `book-keeping-score.webp` / `.jpg` | Keeping Score | Placeholder |
| `book-starting-over.webp` / `.jpg` | Starting Over | Placeholder |

## Formats

- Templates and leader JSON reference both `.webp` (editorial, Alan, pastoral-warm) and `.jpg` (Dave, Brad in `directories/data/*.json`). Both are kept so all references resolve.
- After adding new `.jpg` files, run from `directories/images/scripts`: `node convert-to-webp.js --keep` to generate `.webp` alongside.

## Scripts

- **Fetch (missing only):** `node fetch-book-covers.js --missing-only`
- **Fetch all:** `node fetch-book-covers.js`
- **Config:** `book-covers-config.json` (ISBN or title/author per output filename)
