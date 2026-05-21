# Movemental Field Guide PDFs (designed editions)

Reference copies of the **designed** lead-magnet PDFs (Volume One and Volume Two). These are **not** the web-export PDF from `pnpm field-guide:pdf` and **not** legacy filenames (`it-starts-with-safety-v1.pdf`, `movemental-sandbox-field-guide-it-continues-with-exploration.pdf`) — those URLs only redirect to the canonical files below.

## Volumes

| Volume | Title | File | Landing page | Code constants |
| ------ | ----- | ---- | ------------ | -------------- |
| 1 | *It Starts With Safety* | `movemental-it-starts-with-safety-field-guide.pdf` | `/field-guides/safety` | `src/lib/safety-field-guide.ts` |
| 2 | *It Continues With Exploration* | `movemental-it-continues-with-exploration-field-guide.pdf` | `/field-guides/sandbox` | `src/lib/sandbox-field-guide.ts` |

**Do not confuse** with the long-form article at `docs/articles/ssss-field-guide-for-organizational-leaders.md` (`SSSS_FIELD_GUIDE_PATH` in `src/lib/canon-routes.ts`) — that artifact is the AI Stewardship Sequence essay; these PDFs are the printable Field Guide series.

## Edition in repo (2026-05-21)

Designed PDFs replaced smaller web-generated exports. Verify integrity after any replace:

```bash
sha256sum docs/build/artifacts/field-guides/*.pdf public/downloads/movemental-it-*-field-guide.pdf
```

| File | SHA-256 |
| ---- | ------- |
| `movemental-it-starts-with-safety-field-guide.pdf` | `9718ccdd73d48a335bb47a07dd3a44f39154ed0aba2caf5119cd980311649653` |
| `movemental-it-continues-with-exploration-field-guide.pdf` | `9b880021d8c294abdc6de821f69560bcdc72f2f1705bd7cf996fffa9a6b49957` |

## Shipping a new edition

1. Replace both files in **this directory** from the approved source (e.g. designer export).
2. Copy byte-identical copies to `public/downloads/` (same filenames — stable URLs).
3. Re-run `sha256sum` on both paths; hashes must match.
4. Update cover WebPs under `public/images/books/` if the cover page changed.
5. Update page counts or edition notes in email copy (`src/lib/email/send-safety-toolkit-email.ts`) and field-guide landings if the edition size changed.

```bash
cp docs/build/artifacts/field-guides/movemental-it-starts-with-safety-field-guide.pdf public/downloads/
cp docs/build/artifacts/field-guides/movemental-it-continues-with-exploration-field-guide.pdf public/downloads/
```

## What must not live in the repo

- **`movemental-it-starts-with-safety-field-guide-web-export.pdf`** — Playwright export from the markdown web view; gitignored under `public/downloads/`. Never overwrite the designed canonical file with this output.
- **Legacy download filenames** — only redirects in `next.config.ts`, not duplicate PDF binaries.
- **Older designed editions** — remove from `docs/build/artifacts/field-guides/` and `public/downloads/` when superseded; do not keep `_v1` or dated side-by-side copies in-tree.
