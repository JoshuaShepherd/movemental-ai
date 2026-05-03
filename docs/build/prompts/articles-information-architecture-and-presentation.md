# Articles — Information Architecture & Presentation Rebuild

> **How to run this:** Paste this file into Claude Code inside the `movemental` repo (or invoke via `@docs/build/prompts/articles-information-architecture-and-presentation.md`). It is designed to be executed **stage-by-stage** — each stage has an exit check. Do not collapse stages. Do not skip preflight.

**Created:** 2026-04-20
**Supersedes for IA decisions:** the hub-level IA in [`articles-audit-fixes.md`](./articles-audit-fixes.md) (which remains canonical for per-fix execution).
**Sibling prompts (prepend as context):**

- [`stitch-to-react-migration.md`](./stitch-to-react-migration.md) — token remap + build order
- [`articles-audit-fixes.md`](./articles-audit-fixes.md) — execution log for discrete fixes
- [`core-articles/movemental-canon-article-prompts.md`](./core-articles/movemental-canon-article-prompts.md) — canon voice and frontmatter contract
- [`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) — where articles live in site strategy
- [`LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md`](../../articles/LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md) — linking / topic-cluster strategy that shapes URL choices

**Canonical design references:**

- [`docs/design/DESIGN.md`](../../design/DESIGN.md) — Concept Modern token system, Midnight policy, typography, §17 editorial register
- [`docs/design/PATTERNS.md`](../../design/PATTERNS.md) — primitive / section patterns
- [`docs/design/MOTION.md`](../../design/MOTION.md) — motion tokens and reduced-motion contract
- [`docs/architecture/TYPE_SAFETY.md`](../../architecture/TYPE_SAFETY.md) — six-layer chain (articles are FS-backed today; any DB move follows this)

---

## 0. Mission

The Movemental library has ~92 markdown files under [`docs/articles/`](../../articles/) — 83 root pieces plus 9 sandbox curriculum pieces. The current React shell treats them as one undifferentiated pile tagged by a single `eyebrow` string. It is functional, but it **hides the actual shape of the work** — a 22–23 piece Movemental Canon staircase, five audience playbooks, a six-piece content-strategy sequence, topic-clustered essays, case studies, field guides, and the sandbox curriculum.

Your mission in this prompt is to rebuild the **organization and presentation** of articles so that readers can:

1. **Enter at the thesis** (read the canon as an argument, in order) OR
2. **Enter at a problem** (read by audience, by topic cluster, by question) OR
3. **Enter at the archive** (searchable, filterable full list) OR
4. **Enter at a specific piece** (arrive via share / SEO / referral and see where it sits)

…while staying inside the Concept Modern editorial voice of the rest of the site: cream paper, hairlines, Instrument Serif italic for emphasis, Midnight bands only for authority moments.

**Non-goals**

- Do **not** rewrite article prose. Public wording ships from `docs/articles/**/*.md` only. This prompt governs structure, metadata, and presentation.
- Do **not** move articles to the database in this pass. FS-backed rendering stays; frontmatter becomes the source of truth.
- Do **not** introduce new routes with the article slug moving (SEO stability). Slugs keep their existing URL; collection pages are **additive**.
- Do **not** add authentication or gating.

---

## 1. Preflight (STOP if any step fails)

```bash
pwd                           # must end in /movemental
pnpm --version                # >= 10
pnpm typecheck                # must pass before you start
pnpm lint                     # must pass before you start
pnpm test:run                 # must pass before you start
```

Confirm the current article surfaces load:

```bash
pnpm dev
# manually visit:
#   http://localhost:3000/articles
#   http://localhost:3000/articles/archive
#   http://localhost:3000/articles/sandbox
#   http://localhost:3000/articles/the-movemental-thesis
#   http://localhost:3000/articles/sandbox/the-three-kinds-of-value
```

Required context files to read end-to-end before Stage 2:

- [`src/lib/articles.ts`](../../../src/lib/articles.ts) (FS loader, eyebrow overrides, excluded slugs, archive chip logic)
- [`src/lib/article-page-helpers.ts`](../../../src/lib/article-page-helpers.ts) (metadata + related builder)
- [`src/lib/sandbox-canon.ts`](../../../src/lib/sandbox-canon.ts) (reference pattern for frontmatter-driven collections)
- [`src/app/(site)/articles/page.tsx`](../../../src/app/(site)/articles/page.tsx)
- [`src/app/(site)/articles/archive/page.tsx`](../../../src/app/(site)/articles/archive/page.tsx)
- [`src/app/(site)/articles/[slug]/page.tsx`](../../../src/app/(site)/articles/[slug]/page.tsx)
- [`src/components/sections/article-detail/*`](../../../src/components/sections/article-detail/)
- [`src/components/sections/articles/articles-archive-client.tsx`](../../../src/components/sections/articles/articles-archive-client.tsx)
- [`docs/design/DESIGN.md`](../../design/DESIGN.md) §3 (surfaces), §5 (typography), §11 (Stitch remaps), §17 (Concept Modern editorial)

**Exit check:** You can recite the file → URL mapping for all five article routes; you have DESIGN.md open.

---

## 2. Content survey (mandatory — do NOT skip)

Before touching code, run a **content audit** so the IA you build matches the content that actually exists.

### 2.1 Run the audit via skills

Invoke these skills **in this order** and capture their output inline in a throwaway scratch file (`.agent-scratch/articles-audit.md`, not committed):

1. **`article-audit`** — per-piece voice, SEO/GEO, CTA. Sample 10 pieces across categories; report which frontmatter keys exist vs missing.
2. **`paratext-audit`** — cross-surface paratext (decks, blurbs, CTAs) to see what's missing for hub cards.
3. **`movemental-narrative-audit`** — how articles bridge home → book → services → methodology. Record which pieces are **load-bearing** for the narrative vs supporting.
4. **`movemental-page-auditor`** — six-pass audit on `/articles`, `/articles/archive`, and two representative detail pages.
5. **`article-corpus`** — for each of the 23 canon pieces, confirm the canonical terms (AI Stewardship Sequence, signal, formation, integrity) are consistent.

### 2.2 Build the canonical inventory

Produce `docs/articles/_inventory.md` (commit this — it is the artifact). Columns:

| slug | shape | canon_section | canon_order | series | audience | topics | reading_time | status |
| ---- | ----- | ------------- | ----------- | ------ | -------- | ------ | ------------ | ------ |

**Valid values:**

- `shape`: `canon` · `guide` · `playbook` · `field-guide` · `case-study` · `methodology` · `ai-note` · `sandbox` · `story`
- `canon_section`: `moment` · `problem` · `path` · `future` · `synthesis` (only when `shape = canon`)
- `canon_order`: 1–23 (only when `shape = canon`)
- `series`: `fragmentation` · `content-strategy` · `sandbox` · `ai-stewardship-sequence` · `two-intelligences` · `ai-governance` · `null`
- `audience`: `leader` · `nonprofit` · `church` · `institution` · `seminary` · `any` (multi-value allowed)
- `topics`: `fragmentation` · `ai-stewardship-sequence` · `integrity` · `signal` · `formation` · `sandbox` · `multiplication` · `dual-intelligence` · `ai-posture` · `ai-credibility` · `content-strategy` (multi-value)
- `status`: `published` · `draft` · `excluded`

Use existing signals to populate:

- `EYEBROW_OVERRIDES` in `src/lib/articles.ts` → rough shape mapping (Essay→canon/story, Strategy→guide, Playbook→playbook, etc.)
- Existing frontmatter in some files (e.g. `the-movemental-thesis.md` already has `canon_section: synthesis`, `canon_order: 23`)
- The canon prompt at [`core-articles/movemental-canon-article-prompts.md`](./core-articles/movemental-canon-article-prompts.md) lists the 22–23 pieces by name; map those first.

**Exit check:** `_inventory.md` has one row per publishable slug; every `shape` is assigned; no canon piece is missing a `canon_section` or `canon_order`.

---

## 3. Frontmatter contract (source of truth)

Retire the hand-maintained `EYEBROW_OVERRIDES` map. Replace it with a frontmatter contract that `src/lib/articles.ts` parses once.

### 3.1 Canonical frontmatter schema

Every publishable article in `docs/articles/` must have at minimum:

```yaml
---
title: "Full article title exactly as the H1"
slug: the-movemental-thesis
shape: canon                       # REQUIRED — one of the nine shapes above
deck: "One-sentence editorial deck shown under the hero H1. Max ~200 chars."
author: "Josh Shepherd"
published_at: 2026-03-04           # ISO date; falls back to mtime if missing
updated_at: 2026-04-20             # optional
audience: [leader, nonprofit]      # optional; default [any]
topics: [ai-stewardship-sequence, integrity]          # optional
related_slugs: [the-ssss-framework, integrity-vs-impact]  # optional; authorial override for Continue Reading
featured: false                    # optional; true promotes to /articles hero set
canonical_url: null                # optional; override for non-canonical republishes

# Canon-only fields (REQUIRED when shape: canon):
canon_section: synthesis           # moment | problem | path | future | synthesis
canon_order: 23                    # 1..23

# Series-only fields (REQUIRED when shape is part of a multi-part series):
series: fragmentation              # e.g. fragmentation, content-strategy, sandbox
series_order: 2
---
```

### 3.2 Migration rules

- Any article **without** `shape` is treated as `shape: canon` **only** if it appears in the canon prompt manifest; otherwise treat as `shape: story` and surface in audit. Do not silently default.
- Do **not** parse free-text bodies to guess `shape` or `canon_order` — fail loudly with a build-time assertion in `scripts/validate-article-frontmatter.ts`.
- Keep `EXCLUDED_SLUGS` in `articles.ts` **only** for internal briefs / course outlines that should never ship publicly. Everything else should carry real frontmatter.

### 3.3 Build the validator

Create [`scripts/validate-article-frontmatter.ts`](../../../scripts/) that:

1. Reads every `.md` under `docs/articles/` (recursive).
2. Parses frontmatter against a Zod schema (mirrors §3.1).
3. Exits non-zero with a readable report on missing/invalid keys.
4. Is wired into `prebuild` (via `scripts/pre-build-check.ts`).

Add a `pnpm` script: `articles:check`. It must be part of `pnpm validate:all`.

**Exit check:** `pnpm articles:check` passes on every publishable slug; `EYEBROW_OVERRIDES` is deleted.

---

## 4. Data layer rebuild (`src/lib/articles.ts` + friends)

### 4.1 Parse & expose the full contract

In `src/lib/articles.ts`:

- Replace the minimal frontmatter stripper with a Zod-validated parser. Use the schema you just built.
- Expand `Article` / `ArticleSummary` types to include `shape`, `deck`, `author`, `publishedAt`, `updatedAt`, `audience`, `topics`, `series`, `seriesOrder`, `canonSection`, `canonOrder`, `relatedSlugs`, `featured`.
- Keep the public signature `listArticles()` / `getArticle(slug)` the same, but have them return the richer type.

### 4.2 Add collection helpers (pure — no React)

Add a new `src/lib/articles-collections.ts` with these typed helpers (consumed by the new route surfaces in Stage 6):

```ts
export function listCanonOrdered(): Article[];                                  // shape=canon, sorted by canonOrder
export function listBySection(section: CanonSection): Article[];               // grouped canon view
export function listGuides(): Article[];                                        // shape=guide
export function listPlaybooks(): Article[];                                     // shape=playbook
export function listCaseStudies(): Article[];                                   // shape=case-study
export function listFieldGuides(): Article[];                                   // shape=field-guide
export function listMethodology(): Article[];                                   // shape=methodology
export function listAiNotes(): Article[];                                       // shape=ai-note
export function listSeries(series: string): Article[];                          // ordered by seriesOrder
export function listByTopic(topic: string): Article[];                          // cross-shape
export function listByAudience(audience: Audience): Article[];                  // cross-shape
export function adjacentCanon(slug: string): { prev?: Article; next?: Article };
export function adjacentSeries(slug: string): { prev?: Article; next?: Article };
```

### 4.3 Fix `buildRelatedSummaries`

Replace the filesystem-sort fallback with an intent-driven picker (per [`articles-audit-fixes.md`](./articles-audit-fixes.md) Fix 1):

1. If `article.relatedSlugs` is set, respect authorial choice (cap at 3).
2. Else prefer same `series` neighbors (prev + next in order).
3. Else prefer same `shape` with shared `topics` (cosine-style overlap, not full text).
4. Else fall back to same `shape`.
5. Never include the current slug; never mix sandbox into canon detail and vice versa by default.

### 4.4 Keep the archive chip system but re-anchor on `shape`

Replace `ArticleArchiveCategory` with a direct map over `shape`:

- `all`
- `canon`
- `guides`
- `playbooks`
- `methodology`  (methodology + field-guide + case-study)
- `sandbox`

**Exit check:** `pnpm typecheck`, `pnpm lint`, `pnpm articles:check`, `pnpm validate:all` all green. Spot-check that `listCanonOrdered()` returns 23 pieces in ascending order via a quick temp test or `pnpm tsx scripts/manual-verify-canon.ts`.

---

## 5. Presentation primitives (design-first)

Before touching routes, invoke the design skills **in order** to align what you're about to build with DESIGN.md:

1. **`design-audit`** on `/articles`, `/articles/[slug]`, `/articles/archive` — capture deviations from DESIGN.md §17 Concept Modern editorial.
2. **`color-audit`** — confirm every card / chip / rail uses semantic tokens; no `bg-white`, no raw hex.
3. **`typography-polish`** — eyebrow scale, Instrument Serif italic on emphasis, Inter tracking.
4. **`visual-storytelling-audit`** — hub/archive rhythm, empty states, card grids.
5. **`responsive-audit`** — breakpoint coverage + touch targets for chips, card rows, and the TOC rail.
6. **`icon-audit`** — Lucide consistency in article chrome (arrows, share, bookmark, reading-time clock).

Before composing new UI, read DESIGN.md §17 carefully: the **editorial register** is the constraint that separates Movemental articles from generic blog UI.

### 5.1 New primitives (add to `src/components/primitives/`)

Keep them **tonal and hairline** — no decorative borders, no boxes fighting each other, no drop shadows outside `shadow-ambient`.

- **`ArticleCard`** (`article-card.tsx`) — variant-aware card primitive. Props: `variant: "default" | "featured" | "canon" | "sandbox" | "compact"`, `article`, `index` (for display numerals), `href`. A `canon` variant shows the **canon numeral** (01–23) in Instrument Serif italic at ~2.75rem, top-right corner, `text-primary/20`. A `featured` variant uses `bg-elevated` with bigger display type. Compact is single-line for rails.
- **`SeriesPositionBadge`** — small label + numeral showing `Canon · Problem · 08 of 23` or `Series · Fragmentation · 02 of 04`. Placed in the article hero under the eyebrow. Tonal, no border.
- **`ShelfHeader`** — section-scale heading with right-aligned count pill + optional "See all →" arrow link. Used by every shelf on `/articles` and the collection pages.
- **`ReadingPathRail`** — sticky rail for canon detail pages: collapsed list of canon pieces in section order, current item bolded, `prev`/`next` footer. Reuse `ArticleTocRail` structure (same `lg:grid-cols-[minmax(0,1fr)_220px]` measure) — but slot _either_ TOC _or_ ReadingPathRail based on shape.
- **`CanonProgressStrip`** — thin full-width strip (under hero on canon detail) showing position in the staircase as a typographic progress line (`01 · · · 08 ━━━ · · · 23`). Reference [DESIGN.md §17](../../design/DESIGN.md) for editorial treatment — no filled bars; use typographic mark.

All primitives are Server Components unless they need `useState`/`useEffect`. Scroll-spy inside `ReadingPathRail` stays in the client leaf it already is.

**Exit check:** Each primitive has a story file under [`src/stories/`](../../../src/stories/) (or a scratch route) you can see in isolation; each passes `responsive-audit` touch-target review.

---

## 6. New collection routes (additive — do not break existing URLs)

The canonical piece URL stays `/articles/[slug]`. Sandbox stays `/articles/sandbox/[slug]`. Everything else is an **additive collection surface** layered on top.

### 6.1 Routes to add

Under `src/app/(site)/articles/`:

```
articles/
  page.tsx                          # Rebuilt — see §6.2
  archive/page.tsx                  # Keep; re-point to shape-based chips (Stage 4.4)
  canon/
    page.tsx                        # Canon staircase view
  guides/
    page.tsx                        # Numbered guides (content-strategy + SEO/GEO)
  playbooks/
    page.tsx                        # Audience-tabbed playbooks
  methodology/
    page.tsx                        # Methodology + field-guide + case-study
  series/
    [slug]/page.tsx                 # e.g. /articles/series/fragmentation
  topic/
    [slug]/page.tsx                 # e.g. /articles/topic/ssss
  sandbox/
    page.tsx                        # Existing — keep
    [slug]/page.tsx                 # Existing — keep
  [slug]/page.tsx                   # Existing — enhanced in Stage 7
```

### 6.2 `/articles` — the editorial front door (rebuild)

**Layout (top to bottom):**

1. **Editorial header** (`variant="default"`, hairline top border inherited from site layout) — `AudienceLabel "Writing"`, `h1 "Articles"`, lede lede_text, right-aligned in-page jump nav (Canon · Guides · Playbooks · Methodology · Sandbox · Archive).
2. **Start Here strip** (3-up) — the three `featured: true` pieces. Use `ArticleCard variant="featured"`. This replaces the current hard-coded `FEATURED_SLUGS`.
3. **The Canon** shelf — `ShelfHeader "Read the argument"` + "See the full staircase →" linking `/articles/canon`. Rail of the 5 canon-section entry points (_one_ representative piece per `canon_section`, chosen via `featured_in_section: true` frontmatter OR first by order). Use `ArticleCard variant="canon"` with canon numeral.
4. **Guides** shelf — 3-up + "See all →" `/articles/guides`. `ArticleCard variant="default"`.
5. **Playbooks** shelf — up to 5 cards, one per audience. `ArticleCard variant="default"` with audience label.
6. **Methodology & Evidence** shelf — 3-up of methodology + case study + field guide. Mixed shapes but visually cohesive.
7. **Sandbox curriculum** teaser — single horizontal card (`variant="featured"`) pointing to `/articles/sandbox` with the nine-piece count.
8. **Invitation** — keep existing `AudienceInvitationSection`.

**Do NOT** show the full library list on `/articles`. That belongs in the archive.

### 6.3 `/articles/canon`

Dedicated staircase. Layout:

1. Midnight hero (`variant="midnight"`) — `Display "The Movemental Canon"`, deck: "One argument, in four movements and a synthesis. Read top-to-bottom, or jump to where you are."
2. Four numbered sections — **Moment · Problem · Path · Future · Synthesis** — each with `ShelfHeader` (roman or Instrument Serif numeral), then a vertical ordered list of canon pieces (not a card grid — a vertical "reading path" with numerals and deck text).
3. Invitation footer: book link + newsletter.

Use `listBySection("moment")` etc. Order within section by `canonOrder`.

### 6.4 `/articles/guides` / `/articles/playbooks` / `/articles/methodology`

All three share a template:

1. Default-variant header (no midnight).
2. One-line explanation of what this shelf is.
3. Grid of `ArticleCard` — 3 cols at `lg`, 2 at `sm`, 1 mobile.
4. For `/articles/playbooks`, add audience chip filters (`leader | nonprofit | church | institution | seminary`).
5. Footer CTA back to `/articles` ("Return to editorial index").

### 6.5 `/articles/series/[slug]` and `/articles/topic/[slug]`

Thin pages powered entirely by `listSeries()` / `listByTopic()`. Generate `generateStaticParams` from the set of unique `series` and `topics` values across all articles. No UI primitives beyond `ShelfHeader` + `ArticleCard` grid.

Build a series/topic registry in `src/lib/articles-collections.ts`:

```ts
export const SERIES_META: Record<string, { title: string; deck: string; shape: Shape }> = { ... };
export const TOPIC_META:  Record<string, { title: string; deck: string }> = { ... };
```

This keeps presentation labels stable even as articles come and go.

**Exit check:** Every collection route static-generates, returns a non-empty card list, and matches `design-audit` / `responsive-audit` clean passes.

---

## 7. Article detail page upgrades

Upgrade `ArticleDetailPageContent` to treat shape as a layout signal.

### 7.1 Hero

Enhancements (per [`articles-audit-fixes.md`](./articles-audit-fixes.md) Fix 2 + Fix 3):

- **Breadcrumb** reflects shape: `Movemental / Articles / {shape plural} / {title}` where `{shape plural}` links to the appropriate collection (`/articles/canon`, `/articles/guides`, `/articles/playbooks`, `/articles/methodology`, `/articles/sandbox`).
- **Deck** renders if frontmatter `deck` is set (remove the hard null).
- **Byline** pulls `author` from frontmatter (default "Movemental" only if missing).
- **`SeriesPositionBadge`** under the eyebrow when shape=canon or series is set.
- Keep `variant="midnight"` but the numeral treatment (e.g. `08 / 23`) is in Instrument Serif italic, not a filled chip.

### 7.2 Body rail (the decisive layout swap)

Current layout is `lg:grid-cols-[minmax(0,1fr)_220px]` with TOC on the right. Keep this, but make the **right rail context-aware**:

| Shape | Right rail |
| ----- | ---------- |
| canon | `ReadingPathRail` showing all canon pieces grouped by section, current bolded; below it, `ArticleTocRail` as a collapsed subsection |
| guide (numbered series) | `SeriesRail` showing series ordered list + current bolded |
| sandbox | `SandboxRail` already-analogous pattern from `articles-sandbox-hub` |
| playbook / methodology / field-guide / case-study / ai-note / story | `ArticleTocRail` (as today) |

The rail is **one component with variants**, not four separate ones.

### 7.3 After-body chrome

- Add `CanonProgressStrip` **only** for canon pieces, under the body, above share.
- Add **Previous / Next** nav for `canon` and `series` pieces (via `adjacentCanon` / `adjacentSeries`). Tonal, hairline divider above; no border boxes.
- Existing `ShareStrip` stays.
- Replace `ContinueReading`'s generic header for canon pieces: "More in the canon" (drawn from same section); for series pieces: "More in this series"; for everything else: "Related reading" (topic-overlapped).
- Remove the `SandboxCanonArticleCta` branch; replace with shape-aware CTAs driven by frontmatter `shape`.

### 7.4 Metadata / SEO / JSON-LD (per Fix 4 and Fix 7)

- Emit `Article` JSON-LD with `author`, `datePublished`, `dateModified`, `headline`, `description`, `mainEntityOfPage`. Use the shape of [`next-seo`-style](https://developers.google.com/search/docs/appearance/structured-data/article) objects; ship via `<script type="application/ld+json">` in `buildArticleMetadata`.
- Canonical URL must come from `article.canonical_url` if set; otherwise `canonicalPageUrl(articleUrlPath(slug))`.

### 7.5 Reading experience polish

- **Reading progress bar** exists — audit for reduced-motion via `motion-safe:` guards.
- **Anchor focus** — ensure heading ids are stable and focusable. Respect `scroll-mt-(--site-chrome-total)`.
- **`next/image`** or explicit `width`/`height` policy for any markdown images (Fix 8).
- Kill the `§ § §` end ornament or replace with a hairline + small `<ArrowLink>` pointing to the next piece (Fix 9).

**Exit check:** A canon detail page shows: midnight hero with canon badge → article prose → canon progress strip → prev/next canon → share → "More in the canon". A story/essay detail page shows today's layout but now with proper deck + frontmatter byline.

---

## 8. Archive page refinements

Keep the archive at `/articles/archive`. Re-anchor filtering on `shape` (Stage 4.4) and add a second chip row for audience.

Changes:

- Chips (shape): `All · Canon · Guides · Playbooks · Methodology · Sandbox`.
- Secondary chip row (audience, optional): `All audiences · Leader · Nonprofit · Church · Institution · Seminary`. Hidden at `< sm`, expandable via an "Audience" disclosure.
- Sort options: keep `recent | oldest | shortest | title`; add `canon order` which only appears when `shape=canon` chip is pressed.
- Empty state — the current "No pieces match…" is fine; make sure it links to clearing both chip rows.
- URL state — persist chip + sort to `?shape=canon&audience=leader&sort=canon` for shareable deep links. Use `useSearchParams()` + `router.replace({ query })`. Keep client boundary tight.

**Exit check:** Archive renders the full library, chips filter correctly with URL state, and `responsive-audit` passes.

---

## 9. Navigation integration

Update the site top nav + footer to surface the new collections without bloating the menu.

In `src/components/nav/`:

- **Top nav** — the existing `Articles` link stays pointing to `/articles`. On hover (desktop) / tap (mobile), open a small mega-row with: **Canon** · **Guides** · **Playbooks** · **Methodology** · **Sandbox** · **Archive**. Reuse the glass bar + `Sheet` pattern already in place — do not fork chrome.
- **Footer** — add a "Writing" column with Canon, Guides, Playbooks, Methodology, Sandbox, Archive.
- **Cross-links** — home page thesis strip, fragmentation page, book page, services pages, and methodology page should deep-link into collection URLs (not the full archive) where it makes sense. Capture the cross-link edits in [`articles-audit-fixes.md`](./articles-audit-fixes.md) rather than this prompt.

**Exit check:** Nav parity between desktop and mobile drawer; no `border` 1px chrome hacks added; works with light/dark toggle.

---

## 10. Motion, accessibility, performance

Invoke these skills in this order after Stage 9:

1. **`responsive-audit`** — end-to-end across `/articles`, `/articles/canon`, `/articles/guides`, `/articles/playbooks`, `/articles/methodology`, `/articles/archive`, a canon detail, a playbook detail, a sandbox detail.
2. **`web-design-guidelines`** — accessibility pass (focus rings, contrast, reduced motion on reveal / reading progress, aria-current on rails).
3. **`tailwind-cleanup`** — purge any hardcoded tokens introduced during the rebuild. **Fail the stage** on any `bg-white` / `text-gray-*` / raw hex in the article surfaces.
4. **`icon-audit`** — confirm Lucide-only, consistent size scale.
5. **`visual-storytelling-audit`** — final rhythm pass on all collection pages.
6. **`movemental-page-auditor`** — six-pass on every new collection page.
7. **`analytics-audit`** — event coverage for article interactions (card click, TOC jump, share copy, canon prev/next, chip toggles) — wire missing events via existing `src/lib/analytics` helpers. Respect the analytics telemetry standards already in use.

**Performance budget:**

- No layout shift on hero load (reserve hero height via tokens).
- LCP element on detail pages is the H1; keep it text-first.
- Archive client hydration stays below current baseline (`pnpm build` reports route sizes — canon / guides / playbooks / methodology should be RSC-only; only archive is client for filtering).

**Exit check:** All six skills report clean. `pnpm build` shows no new client routes beyond archive.

---

## 11. Content migration pass

For each article file under `docs/articles/`:

1. Add / reconcile frontmatter per §3.1 using `_inventory.md` as source.
2. Run `paratext-author` to fill any missing `deck`.
3. Run `movemental-prose` for line-level cleanup on pieces that fail `article-audit`.
4. Re-run `pnpm articles:check` until clean.

This stage is **manual + skill-driven** — do not attempt to batch-generate decks. Every deck is load-bearing editorial copy and must be reviewed.

**Exit check:** `pnpm articles:check` green on every publishable slug. `_inventory.md` status column reads `published` or `excluded` for every row.

---

## 12. Verification & release

### 12.1 Programmatic checks

```bash
pnpm typecheck
pnpm lint
pnpm articles:check
pnpm validate:all
pnpm test:run
pnpm test:e2e   # add e2e specs for /articles hub shelves, /articles/canon staircase, chip filtering
pnpm build
```

### 12.2 Editorial QA (browser)

- Canon staircase reads top to bottom as one argument.
- A reader arriving at `/articles/the-movemental-thesis` from a share link immediately sees: canon position, prev/next, section shelf.
- An archive visitor filtering `Canon + Leader` returns a sensible subset sortable by canon order.
- Sandbox surfaces remain intact and match their prior behavior.

### 12.3 Update prompts & docs

- Close the relevant rows in [`articles-audit-fixes.md`](./articles-audit-fixes.md) (Fix 1, 2, 3, 4, 7, 8, 9, 10, 11, 12) with "Shipped — see this prompt."
- Append a "2026-04-?? IA rebuild" entry to [`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) noting the new collection routes.
- Update [`docs/articles/_inventory.md`](../../articles/) frontmatter header with the shape taxonomy.
- Update [`README.md`](../../../README.md) (if articles are referenced) with the new routes.

**Exit check:** One PR per stage is a reasonable cadence; if batching, the PR description references this prompt and lists which stages shipped.

---

## 13. Shape → URL → Primitive cheat sheet

Pin this table on your monitor. It is the only IA reference you should need day-to-day.

| Shape | Shelf on `/articles` | Collection URL | Detail URL | Rail on detail | Canon position? | Prev/next? |
| ----- | -------------------- | -------------- | ---------- | -------------- | --------------- | ---------- |
| `canon` | "The Canon" | `/articles/canon` | `/articles/[slug]` | `ReadingPathRail` | Yes | Canon order |
| `guide` | "Guides" | `/articles/guides` | `/articles/[slug]` | `SeriesRail` if series, else `ArticleTocRail` | No | Series order if any |
| `playbook` | "Playbooks" | `/articles/playbooks` | `/articles/[slug]` | `ArticleTocRail` | No | No |
| `field-guide` | "Methodology & Evidence" | `/articles/methodology` | `/articles/[slug]` | `ArticleTocRail` | No | No |
| `case-study` | "Methodology & Evidence" | `/articles/methodology` | `/articles/[slug]` | `ArticleTocRail` | No | No |
| `methodology` | "Methodology & Evidence" | `/articles/methodology` | `/articles/[slug]` | `ArticleTocRail` | No | No |
| `ai-note` | Archive only | — | `/articles/[slug]` | `ArticleTocRail` | No | No |
| `sandbox` | "Sandbox curriculum" teaser | `/articles/sandbox` | `/articles/sandbox/[slug]` | `SandboxRail` | Sandbox order | Yes |
| `story` | Archive only | — | `/articles/[slug]` | `ArticleTocRail` | No | No |

---

## 14. Guardrails (re-read before shipping)

1. **Concept Modern or nothing.** Warm paper, hairlines, Instrument Serif italic for emphasis only. No drop shadows beyond `shadow-ambient`. No 1px solid borders for sectioning. No raw hex.
2. **Server Components by default.** Only `ArticlesArchiveClient`, the reading-progress bar, the TOC scroll-spy, and the nav mega-row need `"use client"`.
3. **Frontmatter is the source of truth.** No runtime scraping of prose to infer shape or topics.
4. **SEO stability.** Existing `/articles/[slug]` URLs must keep working. Collection URLs are additive. Set up 0 redirects unless a slug is actually being retired.
5. **Audit skills are mandatory, not advisory.** Stages 5, 10, and 11 invoke named Claude skills; run them and capture their output before merging the stage.
6. **No DB migration here.** Articles stay FS-backed. If a future task moves them to Postgres, follow the six-layer chain in [`docs/architecture/TYPE_SAFETY.md`](../../architecture/TYPE_SAFETY.md) — Drizzle schema first, services down to hooks last.
7. **One change per PR where possible.** Stages are intentionally shippable independently.

---

## 15. Appendix — Skill invocation map

| Stage | Skill(s) to invoke | Output form |
| ----- | ------------------ | ----------- |
| 2 Content survey | `article-audit`, `paratext-audit`, `movemental-narrative-audit`, `movemental-page-auditor`, `article-corpus` | `_inventory.md` commit |
| 5 Presentation primitives | `design-audit`, `color-audit`, `typography-polish`, `visual-storytelling-audit`, `responsive-audit`, `icon-audit` | Notes in PR description; fixes in-stage |
| 10 Polish | `responsive-audit`, `web-design-guidelines`, `tailwind-cleanup`, `icon-audit`, `visual-storytelling-audit`, `movemental-page-auditor`, `analytics-audit` | Green reports; fixes inline |
| 11 Content migration | `paratext-author`, `movemental-prose`, `article-audit` | Frontmatter edits only; no prose drift |

When a skill reports red, fix **at the layer it points to** — do not paper over at a higher layer.

---

## 16. Done definition

You are done when:

- `pnpm articles:check && pnpm validate:all && pnpm typecheck && pnpm lint && pnpm test:run && pnpm test:e2e && pnpm build` all pass.
- Every publishable slug has a complete frontmatter block per §3.1.
- `/articles`, `/articles/canon`, `/articles/guides`, `/articles/playbooks`, `/articles/methodology`, `/articles/series/[slug]`, `/articles/topic/[slug]`, `/articles/archive`, `/articles/sandbox`, `/articles/[slug]`, `/articles/sandbox/[slug]` all render, RSC-first, with clean audits.
- `EYEBROW_OVERRIDES` is deleted.
- Canon pieces show their position in the staircase and link to adjacent canon pieces.
- [`articles-audit-fixes.md`](./articles-audit-fixes.md) fixes 1–12 are closed or explicitly deferred with a reason.

Now go — one stage at a time.
