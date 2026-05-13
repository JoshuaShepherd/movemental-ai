# public/downloads

Static download targets for the marketing site. Files here are served at
`/downloads/<filename>` and linked from CTAs across the platform.

## Safety Field Guide PDF (*It Starts With Safety*)

**Canonical lead-magnet file:** `movemental-it-starts-with-safety-field-guide.pdf`

- Stable, descriptive filename for SEO, email links, and saves.
- Replace this file when shipping a new edition; keep the filename unless you
  update every reference (see `src/lib/safety-field-guide.ts`) and add redirects
  in `next.config.ts`.

**Optional web export:** To generate a PDF from the markdown-driven page
`/field-guide/safety` (for drafts only — not a substitute for the designed guide):

```bash
pnpm dev                        # in another terminal
pnpm exec playwright install chromium  # one-time, if not already installed
pnpm field-guide:pdf            # writes movemental-it-starts-with-safety-field-guide-web-export.pdf
```

Override the source URL with `FIELD_GUIDE_URL` if the dev server uses a non-default port:

```bash
FIELD_GUIDE_URL=http://localhost:4000/field-guide/safety pnpm field-guide:pdf
```

Legacy URLs `/downloads/it-starts-with-safety-v1.pdf` and `/toolkit/safety-toolkit.pdf`
redirect to the canonical PDF.

## Sandbox Field Guide PDF (*It Continues With Exploration*)

**Canonical file:** `movemental-it-continues-with-exploration-field-guide.pdf`

- Linked from `/pathway/sandbox` (gated form) and transactional email (`sendToolkitLeadEmail` → Sandbox).
- Raster cover for the site: `public/images/books/movemental-it-continues-with-exploration-field-guide-cover.webp`
  (keep in sync with the PDF cover page when the designed file changes).

Legacy filename `movemental-sandbox-field-guide-it-continues-with-exploration.pdf` redirects to the canonical download.

## Youthfront implementation MOU (engagement)

**Canonical file:** `youthfront-implementation-mou.pdf`

- Served at `/downloads/youthfront-implementation-mou.pdf`.
- Linked from **Documents → MOU** when the active workspace organization slug is `youthfront` (`AgreementSigningPanel` + `YOUTHFRONT_IMPLEMENTATION_MOU_PDF_HREF` in `src/lib/legal/agreement-catalog.ts`).
- A duplicate for engagement documentation lives at `docs/engagements/youthfront/youthfront-implementation-mou.pdf`.
- Replace both copies when counsel ships a new MOU; verify with `sha256sum` against the approved source file.
