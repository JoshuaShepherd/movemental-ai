# Legacy public site — archived 2026-04-28

This directory contains the entire `(site)` route group as it existed before the
HTML-mocks → React rebuild documented in
[`docs/build/prompts/mock-html-to-react-migration.md`](../../../../docs/build/prompts/mock-html-to-react-migration.md).

**Status:** dormant. Files live here for diff/reference only. Next.js does not
route them because the parent segment starts with an underscore (`_archive`).

## Why archived

The new public surface is being rebuilt from the canonical Concept Modern HTML
mockups in [`docs/html/`](../../../../docs/html). Once the new build lands, the
legacy is replaced wholesale rather than refactored in place — the IA, design
system, and copy are all changing in the same pass.

## What is in here

The full `(site)` route group as of 2026-04-28:

- 24 route folders (`about/`, `articles/`, ..., `who-is-a-movement-leader/`)
- The legacy `(site)/layout.tsx` (passthrough)
- The legacy `(site)/page.tsx` (home)

Component imports inside these files still point at `@/components/...`. Those
components were **not** archived and remain live in the new build until each is
either reused, replaced, or pruned during the migration.

## Restoring a single page

If a section of legacy copy or layout needs to be revived during the rebuild,
copy (do not move) the file out of this directory and into its target route under
`src/app/(site)/<route>/`. Do **not** restore the entire `(site)/` tree.

## Deleting

Do not delete this directory until the migration is closed out per
[`docs/build/prompts/mock-html-to-react-migration.md`](../../../../docs/build/prompts/mock-html-to-react-migration.md)
§13 (Definition of Done) and the user explicitly confirms.
