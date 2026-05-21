# safety-new — changelog

A PR-style log of the Safety stage `-new` rebuild. Sibling routes under `(site)/`, sibling components under `_new/`, no edits to existing files.

---

## 2026-05-21 — `/pathway/safety-new` canonical Safety stage page

**Type:** feat
**Scope:** marketing, Safety stage
**Status:** built, typechecks clean

### Summary

Built the canonical Safety stage page at `/pathway/safety-new` as a sibling to the existing `/pathway/safety`. The new page introduces the canonical Field Guide taxonomy (Care Boundaries under Layer 04 Rules; Named Refusals as a first-class Layer 02 artifact), names the two paths into Safety explicitly (SafeGuide free + SafeStart facilitated), and embeds the `FiveLayerRead` diagnostic. The original `/pathway/safety` remains live.

### Routes

- **Created:** `GET /pathway/safety-new`

### Components created

- `src/components/safety/_new/SafetyNewPage.tsx` — 360 LOC, `"use client"`. Eight sections, top to bottom:
  1. Hero (cream background, `For Churches · For Nonprofits · For Institutions` eyebrow, Newsreader italic display headline, two CTAs).
  2. Five-Layer Read diagnostic embed (`<FiveLayerRead />`, anchored as `#five-layer-read`).
  3. Architecture of Safety — five-layer explainer with five-column grid, icons + numerals + canonical document lists.
  4. Two paths into Safety — `<TwoPathsTable />` comparison surface.
  5. SafeStart section (`id="safestart"`) — facilitated path detail with deliverables card.
  6. Audiences trio (churches / nonprofits / institutions) — three-card grid linking to segment hubs.
  7. Credibility section — Movement Voices (Rios / Woodward / Smith) + `FieldGuideAuthorBios`.
  8. Midnight CTA band — `.band-midnight` recipe, three CTAs.
- `src/components/safety/_new/TwoPathsTable.tsx` — 185 LOC, server component. Hairline-ruled 3-column desktop grid (Comparison / SafeGuide / SafeStart) collapses to a mobile two-card stack with a sticky `Choose your path` kicker. Seven rows: Cost, Timeline, Difficulty, Who Drafts, Finished Artifact, Likely Challenges, Best Fit. Below-table CTA row: primary `Get the Field Guide (SafeGuide)` + ghost text link `Talk about SafeStart →`.
- `src/app/(site)/pathway/safety-new/page.tsx` — 23 LOC server component shell. Metadata (title, description, canonical) via `canonicalPageUrl`.

### Components reused (no edits)

- `FiveLayerRead` — `@/components/safety/_new/FiveLayerRead` (pre-existing, built in prior session).
- `PathwayStageRail` — `@/components/pathway/pathway-stage-rail` (`variant="safety"`).
- `FieldGuideSeriesMast` — `@/components/pathway/field-guide-series-mast` (`active="vol-01"`).
- `FieldGuideAuthorBios` — `@/components/pathway/field-guide-author-bios`.
- `PathwayVoiceFallback` — `@/components/pathway/pathway-voice-fallback`.
- `Reveal` — `@/components/studio/Reveal`.
- `canonicalPageUrl` — `@/lib/site-url`.

### Components replicated inline (not editable existing components)

- **Audience trio** — `SafetyPage.tsx` has no audience trio; home page `AudienceFold` carries home-specific copy. Replicated three-card markup inside `SafetyNewPage.tsx` using `Link` + `cn` + Tailwind utilities. Copy: same segment hubs (`/churches`, `/nonprofits`, `/institutions`) with the canonical segment descriptions from `AudienceFold`.
- **Credibility / founders block** — `SafetyPage.tsx` does not export an internal credibility component; replicated the Movement Voices + `FieldGuideAuthorBios` composition inline using the existing primitives. Names, roles, and bios verbatim from `SafetyPage.tsx`.

### Decisions made under ambiguity

1. **`/contact?topic=…` → `/contact?interest=…`.** The brief asked for `?topic=safestart`. The actual contact page reads `interest` (see `src/lib/contact-interest.ts#normalizeContactInterest`). Using `interest=safestart` for parity with the existing `SafetyPage.tsx` and `SandboxPage.tsx` — the value normalizes to `null` (it's not one of `churches | nonprofits | institutions`) so the contact form renders without pre-selected audience, but the convention is sitewide. **Action for Joshua:** decide whether to extend `normalizeContactInterest` to recognize engagement intents (`safestart`, `sandboxlive`, etc.) or whether to introduce a parallel `engagement` param. For now the page is consistent with the rest of the site.
2. **Canonical taxonomy enforced.** Layer 04 Rules contains Care Boundaries. Layer 02 Policy includes Named Refusals. Layer 03 Context is Vendor & Tool Inventory + Data Classification. The non-canonical `/start-with-safety` "five areas" framing is not referenced anywhere on the page.
3. **Hero on cream, not midnight.** Matches the register of the existing `SafetyPage.tsx` hero; the midnight register is reserved for the closing CTA band.
4. **No inline lead capture.** Page CTAs route to `/field-guides/safety-new` and `/contact?interest=safestart`; the `ToolkitDownloadForm` lives on the SafeGuide landing (out of scope for this build).
5. **No new design tokens, fonts, or motion libraries.** Concept Modern palette + Newsreader italic + Tailwind utilities + existing `motion`-backed `Reveal` only.
6. **Architecture section keeps the five-column grid.** Matches the visual register of the original `SafetyPage.tsx` ordered list; numerals in `text-pathway-accent`, icons in `text-muted-foreground/70`, document lists in tracked-caps.

### Verification

- `pnpm typecheck` — clean.
- ESLint — not run as part of this build (the brief permits skipping if lint is slow and the typecheck is clean; only project-specific lint policy would surface issues in the new files, and they follow the existing patterns).

### Not touched

- `src/app/(site)/pathway/safety/page.tsx`
- `src/components/studio/pages/pathway/SafetyPage.tsx`
- `src/components/safety/_new/FiveLayerRead.tsx`
- `src/components/sections-mock/start-with-safety/*` (non-canonical; will be retired in a future migration)
- Any pathway, field-guide, studio, or toolkit component used by the existing pages

---

## 2026-05-21 — `/field-guides/safety-new` SafeGuide path landing (lean lead-capture)

**Type:** feat
**Scope:** marketing, Safety stage, Field Guide
**Status:** built, typechecks clean, lints clean (new files)

### Summary

Built the SafeGuide path landing page at `/field-guides/safety-new` as a sibling to the existing `/field-guides/safety`. The new page does ONE job: make the SafeGuide path real and capture the email to deliver the Field Guide PDF. Restraint is the design intent — the visible vertical footprint is roughly half the existing landing, the five-layer methodology grid and "Plus / Self-Assessment" card are removed (the depth lives on `/pathway/safety-new` now), and lead capture appears twice (hero + midnight footer) using the canonical `ToolkitDownloadForm` with distinct `source` strings.

### Routes

- **Created:** `GET /field-guides/safety-new`

### Components created

- `src/components/safety/_new/FieldGuideSafetyNewLanding.tsx` — ~165 LOC, server component. Five sections:
  1. Hero (cream `bg-background`, two-column desktop). Left: `FREE FIELD GUIDE · VOLUME ONE` kicker, `It Starts With Safety.` headline (Newsreader italic, leading `It` wrapped in `<em>`), 33-page lede, four tracked-caps pills (`33 pages · Free · Self-assessment included · No drip campaign`), top `ToolkitDownloadForm` (source `field-guide-safety-new-hero`). Right: book cover via `next/image` from `SAFETY_FIELD_GUIDE_COVER_IMAGE`.
  2. Two-paragraph explainer (no methodology rehash). Names the Guidebook output, then names the two paths in plain terms with an inline link to `/pathway/safety-new#safestart`.
  3. Audience trio — three-column "Written for senior leaders…" block. Copy replicated verbatim from `field-guide-safety-landing.tsx`.
  4. Self-assessment note — small `bg-elevated` band stating the 30-minute self-assessment lives inside the PDF.
  5. Midnight bottom band (`.band-midnight` recipe). Same kicker + headline as section 1, second `ToolkitDownloadForm` (source `field-guide-safety-new-footer`) wrapped in a `bg-card` cream tile so it retains native styling on the midnight background.
- `src/app/(site)/field-guides/safety-new/page.tsx` — ~65 LOC server component shell. Metadata (title, description, canonical via `canonicalPageUrl`, OG/Twitter) + an `Article` JSON-LD `<script>` block mirroring the existing `/field-guides/safety` page pattern. Imports `getFieldGuide("it-starts-with-safety")` for the JSON-LD authors / publisher / date.

### Components reused (no edits)

- `ToolkitDownloadForm` — `@/components/toolkit/ToolkitDownloadForm`. Twice, with `source="field-guide-safety-new-hero"` and `source="field-guide-safety-new-footer"`. Default submit label `"Send me the toolkit"` left in place.
- `SAFETY_FIELD_GUIDE_COVER_IMAGE` — `@/lib/safety-field-guide`. Hero cover image + OG/Twitter image.
- `getFieldGuide` — `@/lib/field-guide`. JSON-LD authors/publisher/date.
- `canonicalPageUrl` — `@/lib/site-url`.

### Decisions made under ambiguity

1. **`fieldGuide` prop missing on the form.** The brief asked to pass `fieldGuide="safety"`, but `ToolkitDownloadForm` does not expose that prop — the API endpoint defaults to `"safety"` server-side. Per the constraint "DO NOT modify ToolkitDownloadForm", omitted the prop; the API call produces the same result.
2. **Midnight band: cream-card wrap, not an inverse-variant prop.** `ToolkitDownloadForm` has no built-in dark variant. The existing `/field-guides/safety` midnight footer ships ~7 `*ClassName` overrides to force inverse; per the explicit constraint "DO NOT modify ToolkitDownloadForm to add a dark variant", the new midnight band wraps the form in a `bg-card` + `shadow-ambient` tile so the form keeps native styling and the band still reads as midnight.
3. **Default submit copy retained.** Brief said the form should ship "as-is" if a label override didn't land cleanly. Default `"Send me the toolkit"` left in place rather than overriding to `"Send me the Field Guide"`. Worth A/B testing later — flag for the conversion-data review.
4. **Four pills, not three.** Brief said "three pill-labels" then listed four. Per the brief's own resolution note, shipped all four as a single tracked-caps row separated by bullets.
5. **JSON-LD pattern replicated.** Existing page reads `guide.title` + `guide.subtitle` from `getFieldGuide`. The new page reuses the same helper for `authors` / `publisher` / `date` but defines its own `title` / `description` in metadata (per the brief's explicit `metadata` block) — this means the JSON-LD `headline` is derived from `guide.title: guide.subtitle` (the canonical Field Guide headline) while the OG title is the new page-level title. Clean separation; both are correct.
6. **`/contact?interest=safestart` convention preserved** sitewide (the prior SafetyNewPage decision). Not used directly on this page — the only outbound link from the SafeGuide story goes to `/pathway/safety-new#safestart`.
7. **Italic `It` letterform.** Headline wraps the leading word in `<em>` so Newsreader's italic `It` form lands intentionally; the rest of the line inherits `italic` from the heading.
8. **Page is visibly leaner.** Existing landing: 256 LOC, 5 dense sections, including a heavy 6-card methodology grid. New landing: ~165 LOC, 5 lean sections, no methodology grid, no plus-card. Vertical footprint roughly half.

### Verification

- `pnpm typecheck` — clean.
- `npx eslint` on the two new files — clean (no errors, no warnings).

### Not touched

- `src/app/(site)/field-guides/safety/page.tsx`
- `src/components/field-guide/field-guide-safety-landing.tsx`
- `src/components/toolkit/ToolkitDownloadForm.tsx`
- `src/app/api/toolkit-download/route.ts`
- `src/lib/safety-field-guide.ts` (read-only)
- `src/lib/field-guide.ts` (read-only)
- Any other existing component, page, or library

---

## 2026-05-21 — `/home-new` home page with cleaned-up Safety CTAs

**Type:** feat
**Scope:** marketing, Safety stage, home
**Status:** built, typechecks clean, lints clean (new files)

### Summary

Built `/home-new` as a sibling to `/`. The page is identical to the existing home in every respect except two surgical CTA changes that route traffic into the `-new` Safety stack: (1) the Path fold's Stage 01 (Safety) CTA now points at `/pathway/safety-new`, and (2) the bottom midnight CTA band collapses from three CTAs to two (Get the Field Guide → `/field-guides/safety-new`; Talk about SafeStart → `/contact?interest=safestart`). Hero, audience trio, credibility fold, and the citations provider are reused verbatim.

### Routes

- **Created:** `GET /home-new`

### Components created

- `src/components/safety/_new/PathFoldNew.tsx` — ~256 LOC, server component. Verbatim copy of `src/components/sections-mock/home/path-fold.tsx` with **only** the two Stage 01 (Safety) hrefs changed from `/pathway/safety` to `/pathway/safety-new`. `SatelliteStage` helper, copy, layout, all other stages identical.
- `src/components/safety/_new/HomeCTABandNew.tsx` — ~49 LOC, server component. New two-CTA midnight band using the `.band-midnight` + `.final-cta` recipe pair so typography, padding, and container width match the existing `FinalCta` exactly. Primary `BtnPill` becomes white-on-midnight automatically via `.band-midnight .btn-pill--primary` in `src/app/recipes.css`; ghost `BtnPill` becomes inverse-foreground-bordered via `.band-midnight .btn-pill--ghost`. Headline and lede copy match `FinalCta` verbatim — only the action set changes.
- `src/components/safety/_new/HomeContentNew.tsx` — ~40 LOC, server component. Mirrors `HomeContent` import-for-import, swapping `PathFold` → `PathFoldNew` and `FinalCta` → `HomeCTABandNew`.
- `src/app/(site)/home-new/page.tsx` — ~28 LOC, server component shell. Metadata mirrors `src/app/(site)/page.tsx` verbatim (title `"A wiser way to navigate AI"`, description naming the four-stage path).

### Components reused (no edits)

- `TopographicHero` — `@/components/studio/hero/TopographicHero`.
- `AudienceFold` — `@/components/sections-mock/home/audience-fold`.
- `CredibilityFold` — `@/components/sections-mock/home/credibility-fold` (and its embedded `SceniusNetworkHome`).
- `CitationsProvider` — `@/components/citations`.
- `HOME_PAGE_CLAIM_ORDER` — `@/lib/citations/home-page-claims`.
- `BtnPill` — `@/components/sections-mock/primitives`.

### Non-destructive carry-overs (FLAGGED — migration-step items)

Two CTAs sit on shared chrome rendered by the root layout (`src/app/layout.tsx`). Both are deferred to the eventual `-new` → canonical promotion because flipping their hrefs would affect every page on the site, not just `/home-new`. Per the brief's non-destructive constraint, neither was modified:

1. **Footer "Read the field guide"** — `src/components/nav/site-footer.tsx` line 192–197. Currently points at `/field-guides` (the hub), not at any specific Safety surface. On `/home-new` the footer renders identically to every other page. Will be revisited at the migration step.
2. **Nav "Field Guide" CTA** — `src/components/nav/site-header.tsx` lines 235 and 359 both hardcode `/field-guides/safety`. The nav is global chrome rendered by the root layout. **The brief's intent is that this nav CTA point at `/field-guides/safety-new`** — that href flip will land at the same time the `-new` pages are promoted to canonical (the rename + the nav href change land together).

### Decisions made under ambiguity

1. **Footer option (a) chosen over option (b).** The brief asked to check whether `(site)` has its own layout that injects the footer. Confirmed via `src/app/layout.tsx` that the footer is global (root layout), not `(site)`-scoped. Per the brief's default-to-(a) guidance, left the footer untouched on `/home-new`; documented as a migration-step item above.
2. **Metadata mirrors the existing home verbatim.** The existing `(site)/page.tsx` defines `title: "A wiser way to navigate AI"` + a description naming the four-stage path. Reused that object so the existing home's SERP / OG signal carries over to the new home — at promotion time the metadata simply moves with the page.
3. **`HomeCTABandNew` as a new component, not inline JSX.** Could have inlined the two-CTA midnight band inside `HomeContentNew` — chose extraction so the band can be reused on other `-new` surfaces later (e.g., a segment hub or the eventual canonical home).
4. **`PathFoldNew` was a full copy, not a prop refactor.** Could have proposed refactoring `PathFold` to accept the Safety href as a prop and reusing it — chose not to, because (a) the non-destructive constraint says "Do not edit it" without exception, and (b) a full copy is the lowest-risk option that survives the eventual promotion (when `PathFoldNew` is renamed and the original is deleted, no parent component needs to change its prop wiring).
5. **`/contact?interest=safestart` convention preserved.** Same convention used on `/pathway/safety-new` and `/field-guides/safety-new`. The contact page's `normalizeContactInterest` does not recognize `safestart` (it expects `churches | nonprofits | institutions`), so the contact form renders without pre-selected audience — accepted as the sitewide convention. Broader `interest` enum extension is a separate task.
6. **No new design tokens, fonts, or motion libraries.** Concept Modern palette + Newsreader italic + Tailwind utilities only. The midnight band's white pill / ghost pill inversions come from existing `.band-midnight` recipes in `src/app/recipes.css` — no new CSS.

### Verification

- `pnpm typecheck` — clean.
- `npx eslint` on the four new files — clean (no errors, no warnings).

### Not touched

- `src/app/(site)/page.tsx`
- `src/components/sections-mock/home/home-content.tsx`
- `src/components/sections-mock/home/path-fold.tsx`
- `src/components/sections-mock/home/final-cta.tsx`
- `src/components/sections-mock/home/audience-fold.tsx`
- `src/components/sections-mock/home/credibility-fold.tsx`
- `src/components/sections-mock/home/scenius-network-home.tsx`
- `src/components/studio/hero/TopographicHero.tsx`
- `src/components/nav/site-header.tsx` (carry-over: "Field Guide" CTA still points at `/field-guides/safety`)
- `src/components/nav/site-header-cta.tsx`
- `src/components/nav/site-footer.tsx` (carry-over: "Read the field guide" still points at `/field-guides`)
- `src/app/layout.tsx`
- Any other existing component, page, or library

---

## 2026-05-21 — QA fixes (Prompt 7)

**Type:** fix
**Scope:** marketing, Safety stage `-new`
**Status:** all 7 fixes applied, typecheck clean

### Summary

Applied the seven fixes listed in `docs/_new/qa-report.md` (verdict: Ready with fixes). One ❌ (the "seven deliverables" copy carry-over in `PathFoldNew`) plus six ⚠️ cleanups across the three touched components. No new files. No edits outside `_new/`.

### Fixes applied

- **Fix 1** — `FiveLayerRead.tsx:370,771` — replaced raw `#ffffff` hex in two inline icon-glyph color rules with `var(--inverse-foreground)` (resolves to the warm-paper token, more on-brand than pure white on the cream-context status fills).
- **Fix 2** — `PathFoldNew.tsx:64,117` — removed the "seven deliverables" count. Line 64 now reads `$1,000 · two weeks · ratifiable Guidebook.`; line 117 now reads `Two weeks of facilitated work that produces a board-ratifiable AI Organizational Guidebook in five layers your leadership can sign and your team can follow.`
- **Fix 3** — Layer 02 phrasing aligned across surfaces. `SafetyNewPage.tsx:51` split `"Acceptable Use Policy (with Named Refusals)"` into two document entries `["Acceptable Use Policy", "Named Refusals"]` matching `FiveLayerRead`. `PathFoldNew.tsx:128` swapped `"Acceptable Use Statement and Named Refusals"` → `"Acceptable Use Policy and Named Refusals"`.
- **Fix 4** — `SafetyNewPage.tsx:231–235` — dropped the paraphrased caveat paragraph. The verbatim canonical caveat already renders on the embedded `FiveLayerRead` results screen one section above, so the duplication was off-key.
- **Fix 5** — `FiveLayerRead.tsx:520` — dropped the dead `max-w-content` Tailwind class. The token doesn't exist in `tailwind.config.ts` or `globals.css`; the parent `.container` already constrains width.
- **Fix 6** — `SafetyNewPage.tsx:67` — `"Disclosure & Attribution Rules"` → `"Disclosure & Attribution"` to match `FiveLayerRead`.
- **Fix 7** — `PathFoldNew.tsx:127–136` — rewrote the "What this stage produces" bullets so they trace the canonical layer order (02 → 03 → 04 → 05) instead of collapsing layers: `Acceptable Use Policy and Named Refusals` / `Vendor & Tool Inventory and Data Classification` / `Data Handling, Disclosure, and Care Boundaries` / `Incident Response Plan`.

### Verification

- `pnpm typecheck` clean (no errors).
- All other QA findings (the asymmetric SafeGuide vs Field Guide naming, the in-page SafeStart anchor vs. contact-form CTA distinction, the `text-primary` audience-card titles) were ⚠️ flags that the QA report itself marked as acceptable / awareness-only and do not need code changes.

### Open items deferred to migration

- Footer "Read the field guide" link in `site-footer.tsx` (global chrome).
- Nav "Field Guide" CTA in `site-header.tsx` (global chrome).
- "Seven deliverables" / count framing in the rest of the live site (`/pathway/safety`, `/field-guides/safety`, `/start-with-safety`).
- "SafeGuide" public-facing naming question (current `-new` set uses the asymmetric convention: "the Field Guide" for the self-directed path, "SafeStart" for facilitated).

---

## 2026-05-21 — Migration: `-new` promoted to canonical, existing pages archived to `-old`

**Type:** chore (migration)
**Scope:** marketing, Safety stage routes
**Status:** complete, typecheck clean

### Summary

Promoted the three `-new` pages to their canonical URLs. The three previously-live pages are archived (not deleted) at `-old` routes and marked `noindex`. The empty `-new/` directories were removed. All internal `-new` suffix links inside the now-canonical content were stripped so the promoted pages have clean cross-links.

### Route changes

| Was | Now (canonical, live) | Archived at |
| --- | --- | --- |
| `/` (old home) → moved to `/home-old` | `/` ← promoted from `/home-new` | `/home-old` (noindex) |
| `/pathway/safety` (old) → moved to `/pathway/safety-old` | `/pathway/safety` ← promoted from `/pathway/safety-new` | `/pathway/safety-old` (noindex) |
| `/field-guides/safety` (old) → moved to `/field-guides/safety-old` | `/field-guides/safety` ← promoted from `/field-guides/safety-new` | `/field-guides/safety-old` (noindex) |

The `-new` route segments (`/home-new`, `/pathway/safety-new`, `/field-guides/safety-new`) no longer exist — their `page.tsx` files were moved to the canonical paths and the empty directories were removed.

### File moves

Tracked → archived (via `git mv`, so rename history is preserved):

- `src/app/(site)/page.tsx` → `src/app/(site)/home-old/page.tsx`
- `src/app/(site)/pathway/safety/page.tsx` → `src/app/(site)/pathway/safety-old/page.tsx`
- `src/app/(site)/field-guides/safety/page.tsx` → `src/app/(site)/field-guides/safety-old/page.tsx`

Untracked (new) → promoted to canonical:

- `src/app/(site)/home-new/page.tsx` → `src/app/(site)/page.tsx`
- `src/app/(site)/pathway/safety-new/page.tsx` → `src/app/(site)/pathway/safety/page.tsx`
- `src/app/(site)/field-guides/safety-new/page.tsx` → `src/app/(site)/field-guides/safety/page.tsx`

Components remain at `src/components/safety/_new/`. The directory name is now historical-only; the user can rename it as a follow-up cleanup if desired.

### Link & metadata updates

- Canonical / Open Graph URLs in the promoted pages dropped their `-new` suffixes.
- `FieldGuideSafetyPage` default-export name reverted from `FieldGuideSafetyNewPage`.
- All `href="/field-guides/safety-new"` and `href="/pathway/safety-new#safestart"` references inside `_new/` components were stripped to `/field-guides/safety` and `/pathway/safety#safestart`. Affected: `HomeCTABandNew`, `TwoPathsTable`, `SafetyNewPage`, `FieldGuideSafetyNewLanding`, `FiveLayerRead`, `PathFoldNew`.
- Analytics `source` strings on the field-guide lead-capture form were merged into the existing convention: `field-guide-safety-new-hero` → `field-guide-safety-hero`, `field-guide-safety-new-footer` → `field-guide-safety-footer`. Safe to merge because the archived `-old` field-guide page is `noindex` and won't generate competing leads.

### Archive page hardening

Each `-old/page.tsx` had its metadata updated:

- `title` suffixed with `(archived)` so it's obvious if the page is ever opened directly.
- `robots: { index: false, follow: false }` added so search engines won't index the archives or follow their links.
- Canonical URL on `-old` pages still points at the canonical (non-`-old`) URL so any inbound traffic gets the canonical signal.

### Carry-overs from the rebuild (still pending, deliberately not touched in this migration)

- **Global nav** (`src/components/nav/site-header.tsx`) — the "Field Guide" CTA href is hardcoded to `/field-guides/safety`. Since the canonical content there is now the new lean landing, this link is already pointing at the right destination. No change needed.
- **Global footer** (`src/components/nav/site-footer.tsx`) — the "Read the field guide" link is similarly hardcoded to a canonical URL. Auto-resolved by the migration.
- **`/start-with-safety`** — still live with the non-canonical taxonomy. Brief's migration plan recommended a 301 redirect from `/start-with-safety` → `/pathway/safety`. **Not done in this migration** — flagged for separate decision.
- **Component directory naming** — `src/components/safety/_new/` is still named `_new/`. Working as-is; rename is a follow-up cleanup if desired.
- **JSDoc comments** inside the `_new/` components still describe the components as belonging to `/home-new` / `/field-guides/safety-new` etc. Historical context only — not user-facing, not active links. Left as-is.

### Verification

- `pnpm typecheck`: clean.
- `grep -rn "safety-new\|home-new" src/` shows only JSDoc comment residue (no live URL refs).
- Sitemap (`src/app/sitemap.ts`) lists `/pathway/safety`, `/field-guides/safety`, `/start-with-safety` — these URLs all resolve correctly; no sitemap change needed.
- Robots: `-old` routes are not in the sitemap and carry `noindex`, so they're effectively private archives.

### Rollback

If something is wrong with the promoted content, the migration is reversible:

```sh
git mv src/app/\(site\)/home-old/page.tsx src/app/\(site\)/page.tsx
git mv src/app/\(site\)/pathway/safety-old/page.tsx src/app/\(site\)/pathway/safety/page.tsx
git mv src/app/\(site\)/field-guides/safety-old/page.tsx src/app/\(site\)/field-guides/safety/page.tsx
```

…then move the new content back to `-new/` paths and revert link-stripping edits. Git history makes this clean.
