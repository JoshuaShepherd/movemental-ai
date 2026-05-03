# Articles — consolidated audit fixes

**Created:** 2026-04-19  
**Targets (execution map):**

| Surface | Route(s) | Primary implementation |
| --- | --- | --- |
| Article detail (canon) | `/articles/[slug]` | [`src/app/(site)/articles/[slug]/page.tsx`](../../../src/app/(site)/articles/[slug]/page.tsx) → [`ArticleDetailPageContent`](../../../src/components/sections/article-detail/article-detail-page-content.tsx) |
| Article detail (sandbox) | `/articles/sandbox/[slug]` | [`src/app/(site)/articles/sandbox/[slug]/page.tsx`](../../../src/app/(site)/articles/sandbox/[slug]/page.tsx) → same content component |
| Articles hub | `/articles` | [`src/app/(site)/articles/page.tsx`](../../../src/app/(site)/articles/page.tsx) |
| Archive | `/articles/archive` | [`src/app/(site)/articles/archive/page.tsx`](../../../src/app/(site)/articles/archive/page.tsx) → [`ArticlesArchiveClient`](../../../src/components/sections/articles/articles-archive-client.tsx) |
| Sandbox canon hub | `/articles/sandbox` | [`src/app/(site)/articles/sandbox/page.tsx`](../../../src/app/(site)/articles/sandbox/page.tsx) → [`ArticlesSandboxHubPageContent`](../../../src/components/sections/articles-sandbox-hub/articles-sandbox-hub-page-content.tsx) |
| Data + metadata | build-time | [`src/lib/articles.ts`](../../../src/lib/articles.ts), [`src/lib/article-page-helpers.ts`](../../../src/lib/article-page-helpers.ts) |
| Long-form typography | global CSS | [`.article-prose` in `src/app/globals.css`](../../../src/app/globals.css) |

**Purpose:** Single, growing execution prompt for the **articles system** (hub, archive, detail, sandbox canon, OG, related reads, share). Each audit skill appends a dated section. Fixes are grouped by priority; **markdown source-of-truth** (`docs/articles/**/*.md`) and **React shell** are intentionally separate workstreams.

**Audit passes completed:**

- ✅ **`/articles` hub pass (2026-04-19)** — targeted read of [`src/app/(site)/articles/page.tsx`](../../../src/app/(site)/articles/page.tsx); findings in [§ `/articles` hub — audit findings](#articles-hub--audit-findings-2026-04-19) below
- ⏳ `movemental-page-auditor` — full six-pass on `/articles/archive`, representative `/articles/[slug]`, `/articles/sandbox`, `/articles/sandbox/[slug]` (hub partial above)
- ⏳ `movemental-narrative-audit` — cross-site role: how articles bridge home → book → services → methodology
- ⏳ `design-audit` — DESIGN.md fidelity on hub + detail chrome (not only `.article-prose`)
- ⏳ `visual-storytelling-audit` — hub/archive rhythm, card grids, empty states
- ⏳ `color-audit` / `typography-polish` / `tailwind-cleanup` / `responsive-audit` — token + layout pass on article routes
- ⏳ `article-audit` / `paratext-audit` — per-article corpus voice, SEO/GEO, CTA when treating a single slug
- ⏳ `movemental-prose` — line-level prose in `docs/articles/**` before publish

**Fix status (seed list — update as audits land):**

| Fix | Title | Status |
| --- | --- | --- |
| 1 | Replace naive `buildRelatedSummaries` with intentional related picks | ⏳ Proposed |
| 2 | Sandbox breadcrumb + cross-link to `/articles/sandbox` from article hero | ⏳ Proposed |
| 3 | Optional YAML frontmatter: `deck`, `author` (vs hardcoded byline) | ⏳ Proposed |
| 4 | Canonical URLs: dedupe `articleUrlPath` branches; verify OG routes for root + sandbox | ⏳ Proposed |
| 5 | Cross-site hairlines on long reads (book, fragmentation, methodology, services) | ⏳ Proposed |
| 6 | Hub invitation: align primary path with newsletter where canon says “free path” | ⏳ Proposed — needs parity with home Fix 3 decision |
| 7 | JSON-LD `Article` / `BlogPosting` in metadata for indexable slugs | ⏳ Proposed |
| 8 | `next/image` or explicit sizing policy for markdown images | ⏳ Proposed |
| 9 | Remove or replace `§ § §` end ornament in `.article-prose__end` (product UI convention) | ⏳ Proposed |
| 10 | Featured set on `/articles` — editorial governance + drift check | ⏳ Proposed |
| 11 | Archive: explicit treatment of sandbox slugs (chip, label, or filter) | ⏳ Proposed |
| 12 | Reading progress + TOC — reduced-motion and anchor focus polish | ⏳ Proposed |
| 13 | **`/articles` hub:** `Sandbox` eyebrow omitted from `LIBRARY_GROUPS` → sandbox MD never listed under “Full library” | ✅ Shipped — add `"Sandbox"` to methodology cluster (matches `articleArchiveCategory`) |
| 14 | **`/articles` hub:** metadata missing `alternates.canonical` + OG/Twitter | ✅ Shipped — aligned with [`archive/page.tsx`](../../../src/app/(site)/articles/archive/page.tsx) |

**Companion prompts (read first):**

- [`stitch-to-react-migration.md`](./stitch-to-react-migration.md) — token remap for any new chrome
- [`docs/design/DESIGN.md`](../../design/DESIGN.md) — semantic tokens, section variants
- [`sandbox-offering-web-integration.md`](./sandbox-offering-web-integration.md) — sandbox canon ↔ services
- [`three-pass-page-audit-with-fixes.md`](./three-pass-page-audit-with-fixes.md) — optional stricter audit workflow

---

## 0 · Non-negotiables

1. **Two sources of truth.** Public wording ships from `docs/articles/**/*.md`. Layout, TOC, share, related reads, and metadata ship from `src/`. Do not fork canon terms in TSX that contradict the markdown library.
2. **Semantic tokens only** on all chrome (hero, hub cards, archive controls, share strip). Raw hex / `bg-white` / `text-gray-*` forbidden per DESIGN.md.
3. **Slug rules.** Logical slugs use `sandbox/…` for nested files; URLs are `/articles/sandbox/{slug}` for those entries. `getArticle`, `listArticles`, and `href` builders must stay aligned — regression test when adding a third route shape.
4. **No fabricated proof.** Byline, dates, “updated”, and claims in cards must map to real frontmatter or repo facts.
5. **Canonical vocabulary** matches the rest of the site: the AI Stewardship Sequence, two intelligences, field guide, six stages, integration — use [`docs/arguments/SITE-SSOT.md`](../../arguments/SITE-SSOT.md) where needed.
6. **Client boundaries.** Keep `"use client"` only on interactive leaf components (`ShareStrip`, archive filters, TOC scroll-spy if client). Pages and `ArticleMarkdown` stay Server Components unless there is a hard requirement.
7. **Tonal stacking over borders** for cards and rails; article `blockquote` left rule is an allowed editorial exception inside `.article-prose` (already scoped).

---

## Fix 1 · Intentional “Continue reading”

**Problem:** [`buildRelatedSummaries`](../../../src/lib/article-page-helpers.ts) returns the first *N* articles from `listArticles()` after filtering out the current slug — order is filesystem sort, not topical relevance. That produces arbitrary “related” rows and may surface unrelated sandbox pieces next to canon essays.

**Fix direction:**

- **Minimum viable:** pass `article.eyebrow` (and optionally `archiveCategory`) into the helper; prefer same category, then fill from adjacent categories; always exclude current slug; cap at 3.
- **Stronger:** optional `related_slugs: []` in frontmatter (authorial control) with fallback to the MV algorithm.
- **Sandbox detail pages:** prefer other `sandbox/*` first, then hub CTA, then empty state rather than random canon.

**Acceptance:** no related card set repeats the same three slugs for every article spot-check (5 random slugs).

---

## Fix 2 · Article hero — breadcrumb + IA for sandbox

**Current:** [`ArticleHero`](../../../src/components/sections/article-detail/article-hero.tsx) always shows `Movemental / Articles / {title}`.

**Problem:** Sandbox canon pieces are curriculum, not general “Articles” library shape. Visitors lose the parent context of [`/articles/sandbox`](../../../src/app/(site)/articles/sandbox/page.tsx).

**Fix:** when `article.slug.startsWith("sandbox/")`, middle crumb becomes **Sandbox canon** linking to `/articles/sandbox`, and optional third segment shows shortened title or “Curriculum” per IA decision.

**Preserve:** midnight hero variant, `Display` for H1, read time row.

---

## Fix 3 · Frontmatter for `deck` and `author`

**Current:** [`parseArticle`](../../../src/lib/articles.ts) sets `deck: null` always; hero byline is hardcoded **Movemental**.

**Fix:** extend frontmatter parser (minimal YAML) to support:

- `deck:` — shown under H1 when present (already wired in hero).
- `author:` — single string or `authors: []`; default remains “Movemental” when absent.

**Voice:** run author-facing lines through `alan-voice` only when the attributed voice is Alan; organization line can stay institutional.

**Dependency:** update one pilot markdown file to prove the pipeline before bulk migration.

---

## Fix 4 · `articleUrlPath` + OG parity

**Current:** [`articleUrlPath`](../../../src/lib/article-page-helpers.ts) uses a ternary with **identical** branches — dead code and a readability hazard.

**Fix:** single return expression: `/articles/${logicalSlug}` is correct for both root and `sandbox/x` because the App Router path is `/articles/sandbox/[slug]`.

**Verify:** [`[slug]/opengraph-image.tsx`](../../../src/app/(site)/articles/[slug]/opengraph-image.tsx) and [`sandbox/[slug]/opengraph-image.tsx`](../../../src/app/(site)/articles/sandbox/[slug]/opengraph-image.tsx) both resolve the same canonical URL shape as `buildArticleMetadata`.

---

## Fix 5 · Cross-site links inside long reads (pattern)

**Problem:** Articles own depth; they often introduce fragmentation, the AI Stewardship Sequence, or the book without giving a **deterministic** exit ramp to the page that owns that story.

**Fix (content + optional chrome):**

- In markdown, prefer explicit hairlines to `/book`, `/fragmentation`, `/methodology`, `/services` where the argument hands off.
- Optionally add a **single** optional block component after `ArticleMarkdown` for “canon routes” when `article.slug` is in a curated list — but default should stay markdown-first to avoid double navigation noise.

**Pre-flight:** each `href` must exist in `src/app/(site)` before shipping.

---

## Fix 6 · `/articles` invitation — conversion alignment

**Current:** On the [articles hub](../../../src/app/(site)/articles/page.tsx), `AudienceInvitationSection`’s primary CTA is **Get new writing → `/contact`**.

**Problem:** Home page decision space (see [`home-page-audit-fixes.md`](./home-page-audit-fixes.md) Fix 3) may standardize on **newsletter** as the low-intent path. Articles hub should not fight that pattern.

**Fix:** once org decision is locked, either wire `NewsletterForm` here (with `source="articles-hub"`) or keep `/contact` but rewrite copy so the primary label matches the actual destination.

---

## Fix 7 · JSON-LD for articles

**Problem:** [`buildArticleMetadata`](../../../src/lib/article-page-helpers.ts) sets OpenGraph/Twitter but no `structuredData` / JSON-LD `BlogPosting`.

**Fix:** add `jsonLd` in article layout or page using title, description, url, `dateModified` from file mtime (already on archive entries) or frontmatter `date` when added.

**Acceptance:** Rich Results test shows Article/BlogPosting without errors for at least one slug.

---

## Fix 8 · Images inside markdown

**Current:** [`ArticleMarkdown`](../../../src/components/sections/article-detail/article-markdown.tsx) renders `<img>` via react-markdown.

**Fix direction:** either (a) map `img` to `next/image` with explicit `width`/`height` from frontmatter, or (b) document a **single** allowed pattern (e.g. all figures width=1200) and enforce in `article-audit` for new pieces.

**Performance:** LCP for article pages should remain the hero band, not inline figures — lazy-load below-fold images.

---

## Fix 9 · End ornament (`§ § §`)

**Current:** [`.article-prose__end::before`](../../../src/app/globals.css) inserts `§ § §`.

**Problem:** Section sign reads academic but is easy to mis-render; site convention prefers avoiding `§` in user-facing chrome.

**Fix:** replace with a neutral end mark (e.g. “—” triplet or small `✻` row to match `hr` styling) or remove the pseudo-content entirely.

---

## Fix 10 · Featured slugs governance

**Current:** [`FEATURED_SLUGS`](../../../src/app/(site)/articles/page.tsx) is a hardcoded tuple.

**Fix:** document in this file’s status table which slugs are “pinned” and why; add a CI or unit test that fails if a pinned slug disappears from `listArticles()`; optionally move the list to `src/lib/articles.ts` next to `EXCLUDED_SLUGS`.

---

## Fix 11 · Archive + sandbox discoverability

**Current:** Sandbox articles appear in `listArticlesForArchive()` like any other slug; category maps `Sandbox` eyebrow into the **methodology** chip bucket ([`articleArchiveCategory`](../../../src/lib/articles.ts)).

**Decision needed:** either (a) **label** sandbox rows distinctly in the archive UI, or (b) add a **Sandbox** chip, or (c) exclude `sandbox/*` from archive and rely on `/articles/sandbox` only. Pick one; do not leave ambiguous overlap with “Methodology.”

---

## Fix 12 · TOC + reading progress UX

**Targets:** [`ArticleTocRail`](../../../src/components/sections/article-detail/article-toc-rail.tsx), [`ArticleTocMobile`](../../../src/components/sections/article-detail/article-toc-mobile.tsx), [`ReadingProgress`](../../../src/components/sections/article-detail/reading-progress.tsx).

**Pass criteria:**

- `prefers-reduced-motion`: no janky scroll jank; progress bar optional hide.
- Focus order: mobile TOC drawer (if any) traps focus; skip link to content.
- Anchor scroll: `scroll-margin-top` respects fixed nav (`--site-chrome-total`).

---

## `/articles` hub — audit findings (2026-04-19)

**Scope:** [`src/app/(site)/articles/page.tsx`](../../../src/app/(site)/articles/page.tsx) only (not archive, not detail).

### Shipped this pass

| Item | Notes |
| --- | --- |
| **Fix 13** | `groupArticles()` filtered by `LIBRARY_GROUPS.*.eyebrows`. Files under `docs/articles/sandbox/*.md` resolve to logical slug `sandbox/…` with eyebrow **`Sandbox`** ([`articles.ts`](../../../src/lib/articles.ts)); that string was **not** in any cluster, so every sandbox piece was **absent** from the hub’s “By shape” grids while still appearing in the archive. Added `"Sandbox"` to the methodology cluster to match [`articleArchiveCategory`](../../../src/lib/articles.ts) (`Sandbox` → methodology chip). |
| **Fix 14** | Hub `metadata` had title + description only. Added `alternates.canonical`, `openGraph`, and `twitter` via [`canonicalPageUrl`](../../../src/lib/site-url.ts) for parity with `/articles/archive`. |

### Six-pass notes (hub)

| Pass | Verdict |
| --- | --- |
| 1. Sequencing | **Strong** — hero header → `#featured` → `#library` → invitation `#subscribe`; in-page nav jumps match anchors. |
| 2. Copy | **Partial** — invitation promises “subscribe” / “one email per piece” but primary CTA still routes to **`/contact`** ([`AudienceInvitationSection`](../../../src/components/sections/audience-concept/audience-invitation-section.tsx)); label **Get new writing** underspecifies destination. Align with Fix 6 + home newsletter decision. |
| 3. Typography | **Good** — `text-display` on H1, `text-h2` on library title, card scale hierarchy consistent with Concept Modern. **Watch:** library H3 uses full `font-serif` italic (same deferral theme as home design-audit on whole-H3 serif). |
| 4. UI / demonstration | **Partial** — cards are editorial-only (no false screenshots). **Gap:** no hairline to **`/articles/sandbox`** for readers who only land on `/articles`; sandbox canon is discoverable only via archive search or cards after Fix 13. Optional: nav link “Sandbox canon” or one row of copy under header. |
| 5. Proof | **Aligned** — excerpts come from loader first paragraph; no fabricated metrics on chrome. |
| 6. Cross-site | **Partial** — book linked in invitation secondary; no link to **`/fragmentation`**, **`/methodology`**, or **`/services`** on the hub itself. Acceptable if hub stays “library front door”; otherwise add one muted line + hairlines. |

### Follow-ups (not shipped)

- **Featured drift:** `FEATURED_SLUGS` silently drops cards if a slug is renamed or excluded — Fix 10 (test or build-time assert).
- **`href` for cards:** `\/articles\/${slug}` is correct for both root slugs and `sandbox/x` (URL `/articles/sandbox/x`). No change.
- **Invitation CTA truthfulness:** either wire newsletter (if product decision) or change body copy so it does not say “subscribe” while sending people to contact.

---

## Narrative audit — questions to answer (articles system)

Record decisions here as they land (mirrors home doc “Decisions resolved”):

| # | Question | Decision |
| --- | --- | --- |
| 1 | Are sandbox canon pages “articles” or a separate product surface in nav labels? | ⏳ |
| 2 | Should the book always be linked from essay footers, or only thesis-tier slugs? | ⏳ |
| 3 | Does `/articles` own “proof of thinking” for the org, or does `/evidence` share that job? | ⏳ |
| 4 | Newsletter vs contact as the default conversion on hub + end-of-article? | ⏳ |

---

## Page-auditor — stub checklist (fill after first run)

Hub checklist: **partially satisfied** by [§ `/articles` hub — audit findings](#articles-hub--audit-findings-2026-04-19). Remaining surfaces:

1. **Sequencing** — archive → detail flow; sandbox hub insertion point in nav.
2. **Copy** — archive intro; article hero deck consistency.
3. **Typography** — article `.article-prose` handoff vs hub chrome.
4. **UI / proof** — detail share strip, TOC; archive empty states.
5. **Proof burden** — markdown-only claims in body (run `article-audit` per slug).
6. **Cross-site** — thesis articles link out to canonical surfaces where required.

---

## Design-audit — stub (fill after first run)

Track token violations, shadow misuse on cards (`shadow-ambient` allowance vs DESIGN.md), and midnight hero contrast for breadcrumb text (`text-inverse-foreground/55`).

---

## Execution order (suggested)

**Pass A — data / correctness (low visual risk):** Fixes 1, 4, 7, 10, 11  
**Pass B — chrome / IA:** Fixes 2, 6, 12  
**Pass C — author experience:** Fix 3, then markdown pilot  
**Pass D — performance / a11y media:** Fix 8  
**Pass E — polish:** Fixes 5, 9  

Each fix should be its own commit with `slice/articles-audit-fixN-<slug>` per CLAUDE.md conventions.

---

## Open discussion points

1. **Single newsletter component everywhere?** Aligns articles hub with home once home Fix 3 is final.
2. **Related algorithm vs manual curation** — editorial labor vs maintainability.
3. **Sandbox in main nav** — yes/no; affects Fix 2 copy and Fix 11 archive behavior.
4. **Author attribution** — when a piece is signed by a named human, does org schema still say `publisher: Movemental` only?

---

*After each audit skill run, append a dated `## {Skill} findings (YYYY-MM-DD)` section above “Execution order,” then add rows to the status table at the top.*
