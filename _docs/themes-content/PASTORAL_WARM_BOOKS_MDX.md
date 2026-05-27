# Pastoral-warm books and MDX content

**Pastoral-warm only.** All Alan Hirsch books with MDX source are listed in the template and the book reader loads content built from `_docs/themes-content/mdx/`.

## Source

- **MDX:** `_docs/themes-content/mdx/<book-slug>/` — each folder has `book.json` (slug, title, author, sections) and section files (e.g. `00-introduction.mdx`).
- **Leader data:** `public/templates/library/data/alan-hirsch.json` — `books` array drives the books grid and book-detail; every book that has MDX (and optionally others like *The Starfish and the Spirit*) is listed.

## Build

Content is **built** from MDX into static HTML so the pastoral-warm book reader can run without a Next.js server:

```bash
npm run template:build-pastoral-warm-books
```

This script:

1. Reads every `_docs/themes-content/mdx/*/book.json`.
2. For each section, reads the `.mdx` file, strips frontmatter, converts markdown → HTML with `remark` + `remark-html`.
3. Writes:
   - `public/templates/library/pastoral-warm/content/books/<bookSlug>/<sectionSlug>.html`
   - `public/templates/library/pastoral-warm/content/books/manifest.json` (list of books and sections for the reader UI).

Run after changing any MDX under `_docs/themes-content/mdx/`.

## Reader behavior

- **books.html** — Grid of all books from `alan-hirsch.json`; each card links to `book-detail.html?book=<slug>`.
- **book-detail.html?book=<slug>** — Detail for that book; “Start Reading” goes to `book-reader.html?book=<slug>`.
- **book-reader.html?book=<slug>&section=<slug>** — Loads `content/books/manifest.json`, renders the sidebar from sections, fetches `content/books/<book>/<section>.html` and injects it into the prose area. If `?section=` is omitted, the first section is shown. If the book is not in the manifest (e.g. no MDX), a “not available to read online” message is shown.

## Books with MDX (in build order)

All of these are in `alan-hirsch.json` and have built content after running the build script:

- 5Q  
- Disciplism  
- Fast Forward to Mission  
- Metanoia  
- On the Verge  
- Reframation  
- ReJesus  
- Right Here, Right Now  
- The Faith of Leap  
- The Forgotten Ways  
- The Forgotten Ways Handbook  
- The Permanent Revolution  
- Untamed  

*The Starfish and the Spirit* is in the books list but has no MDX; the reader shows a placeholder for it.
