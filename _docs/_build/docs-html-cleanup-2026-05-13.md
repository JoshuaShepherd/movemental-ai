# docs/html Cleanup Report — 2026-05-13

**Repo:** `movemental-ai`
**Branch:** `slice/S00-frontend-cleanup-2026-05-13` (continues from `9898856` frontend-cleanup + `62be7ae` repo-cleanup)
**Skill:** `$repo-cleanup` focused pass on `docs/html/`
**Authority:** [`docs/html/README.md`](../../docs/html/README.md) — *"This folder is a prototype lab for mockups and experiments. It is not the source of truth for production UI. When a prototype ships as React, archive superseded HTML."* The folder is also `.cursorignore`d.

---

## Summary

| Metric | Count |
|---|---:|
| Total files in `docs/html/` at start of this pass | **283** |
| **Keep (protected)** | **164** |
| **Archive (this run)** | **119** |

Destination for moves: `_archive/2026-05-13/docs-html/` (mirroring origin paths).

---

## Why these 164 stay

Three reasons survive a file in `docs/html/`:

### 1. Generator outputs (scripts actively write here)

| Path | Generator |
|---|---|
| `scenius-network-v2/` (5 files) | `scripts/sync-movement-voices-html-data.ts`, `scripts/generate-movement-voices-html-app-js.py` |
| `scenius-network-v3/` (4 files) | `scripts/generate-scenius-network-v3-html.py` |
| `toolkit-text-review.html` | `scripts/generate-toolkit-text-review-html.mjs` |
| `books-concept-modern/book-reader-from-manuscript.html` | `scripts/build-book-reader-html.py` (writes inside `books-concept-modern/`) |
| `site-templates/` (9 files) | `scripts/sync-hero-previews.ts` reads from here; `scripts/dedupe-docs-html-chrome-css.py` consolidates rules into `prototype-pages.css` here |

Keeping the entire `books-concept-modern/` directory (4 files) as a unit — the book-reader generator targets a path inside it.

### 2. Read by build / sync scripts

| Path | Read by |
|---|---|
| `deduped-megapage.{html,css,js}` (3 files) | `scripts/extract-arguments.mjs` (canonical for `docs/arguments/custom-gpt/messaging-*.md`) |
| `tabbed-argument-page.html` | `scripts/extract-arguments.mjs` |
| `argument-ids.json` | Referenced by `docs/build/notes/movemental-master-talking-points-index.md` |

### 3. Cited by canonical build prompts

| Path | Cited by |
|---|---|
| `home-citations-ledger.html` | `docs/build/prompts/inline-citation-system-with-references-rail.md` (explicitly named as **Design source of truth**) |
| `site-claims-eeat-research-map.html` | `docs/build/prompts/site-footnotes-eeat-registry.md` (named as optional HTML mirror that the JSON reconciles against) |

### 4. Self-contained subdirs left intact (deferred, not protected)

These are kept this run because they're large, self-contained, and not clearly stale. A focused follow-up should look at them individually:

- `alan-hirsch-course-migration/` (72 files) — separate migration project; one specific subdir is cited by `scripts/validate-sandbox-course-structure.ts`
- `master-components/` (29 files)
- `course-previews/` (20 files)
- `assets/` (10 files) — supporting images/fonts for prototypes
- `scripts/` (2 files) — local Python helpers for the HTML pages

### 5. Plus

- `README.md` — the policy doc for this directory.

---

## What gets archived (119 files)

Breakdown by category:

| Category | Files |
|---|---:|
| Flat `*-modern.html` page mockups (about, approach, churches, institutions, nonprofits, contributors, services-pricing, assessments) | 8 |
| Flat `*-path-sticky-mockup.html` (churches, institutions, nonprofits) | 3 |
| Flat `*-revised.html` (safety, sandbox, skills) | 3 |
| Flat `mock-*.html` page mocks (16 files — about, assess, churches, contact, faq, field-guide, home, index, institutions, movement-leaders, nonprofits, organizations, team, voices, plus `mock-pages.css`) | 16 |
| Flat `preview-audience-*.html` (4 files) | 4 |
| Flat `home-citations-{live,margin}.html` (not the canonical ledger) | 2 |
| Flat `core-claims-50.{html,css,js}` | 3 |
| Flat `internal-site-faq.{html,css,js}` | 3 |
| Flat `audience-pages-preview.{css,js}` | 2 |
| Flat `tabbed-argument-page.{css,js}` (HTML stays — only the sidecar styling) | 2 |
| Flat one-off mockups (`stitch-5-10`, `prompt-library`, `marginalia-blue-pen-layer`, `highlighter-human-layer`, `claude-teaching-atlas-template`, `quotes-in-situ-concept`, `home-with-quotes-concept`, `contributor-layer`, `movemental-promo-two-errors-storyboard`, `argument-publication-status.js`, `index.html`) | 11 |
| Flat `*proposal*.html` / `youthfront-executive-summary.html` / `white-paper-ai-mission-sector-state-of-the-union.html` / `internal-platform-ops-...html` | 4 |
| Subdir `articles-concept-modern/` (5) | 5 |
| Subdir `assessment-concept-modern/` (3) | 3 |
| Subdir `audience-concept-modern/` (5) | 5 |
| Subdir `business-model-breakdown/` (3) | 3 |
| Subdir `contact-concept-modern/` (3) | 3 |
| Subdir `courses/` (5 — superseded by `course-previews/` which is kept) | 5 |
| Subdir `fragmentation-concept-modern/` (3) | 3 |
| Subdir `fragmentation-stages-{gsap,morph,steps}/` (9) | 9 |
| Subdir `homepage-concept-modern/` (3) | 3 |
| Subdir `movemental-social-strategy/` (3) | 3 |
| Subdir `onbuilding/` (4) | 4 |
| Subdir `perfect-church-platform-movemental/` (2) | 2 |
| Subdir `perfect-seminary-platform-movemental/` (2) | 2 |
| Subdir `team-concept-modern/` (2) | 2 |
| Subdir `vision-concept-modern/` (3) | 3 |
| Subdir `youthfront-proposal/` (3) | 3 |
| **Total** | **119** |

Spot-check: every page mockup whose React route is live in `src/app/(site)/` is in this archive list. JSDoc comments in `src/` that reference these HTMLs are informational (not load-bearing); they'll point at archived paths after this run but won't break anything.

---

## Plan

1. `mkdir -p _archive/2026-05-13/docs-html/<all required subdirs>`
2. `git mv` each of the 119 files into its archived home
3. Append moves to `_archive/2026-05-13/MANIFEST.md`
4. `pnpm typecheck` (insurance — HTML moves shouldn't affect TS)
5. Sanity grep: no live `src/` or `scripts/` reference points to a moved path (JSDoc comments allowed, those are informational)
6. Commit

If verification fails, single `git revert HEAD` restores everything.
