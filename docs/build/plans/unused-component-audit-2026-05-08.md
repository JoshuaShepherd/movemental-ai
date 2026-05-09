# Unused component audit — 2026-05-08

A dependency-graph scan of `src/components/**/*.tsx` (excluding `_archive/`)
turned up roughly **50 unused modules / ~28,000 lines of dead code** that
have accumulated through three parallel redesigns of this codebase. This
plan rationalizes them by **design value** (is the visual/interaction
pattern worth preserving?) and **content value** (is the embedded copy,
research, or data worth preserving?), and gives each a single
recommendation: **PROMOTE**, **ARCHIVE**, or **DELETE**.

## How the codebase fragmented

There are three parallel component trees, accreted in this order:

1. **`sections/`** — older Concept Modern editorial. Was the canonical
   page-content layer. Most of it is now superseded.
2. **`sections-mock/`** — HTML-to-React translations from `docs/html/`.
   This is the active mock layer; six folders are wired into live routes
   (`home`, `path`, `start-with-safety`, `toolkit-read`, `work-with-us`,
   plus parts of `field-guide`). The rest are prototypes that never got
   wired.
3. **`studio/pages/`** — the **canonical wired entry points**. Each
   `app/(site)/<route>/page.tsx` imports from here. This is "live."

Three siblings of `studio/pages/` also matter:
- **`studio/`** — shared building blocks (`Container`, `Reveal`, hero
  variants, primitives) consumed by `studio/pages/`. Mostly live.
- **`primitives/`** — the lower-level primitive layer (`Section`,
  `Container`, `Display`, `Eyebrow`, `PullQuote`, etc.). All live.
- **`editorial-stitch/`** — a recent Stitch-translated editorial
  component library. Documented, well-typed, **zero consumers**. See §3
  below — strongest PROMOTE candidate in the audit.

## Scope and definitions

A component is **unused** when no live `.tsx`/`.ts` file outside
`_archive/` imports it — directly, transitively via barrel re-export, or
through dynamic import. The agent that produced the inventory checked
all three.

I evaluate each unused module against two questions:

- **Design value.** Is the visual or interaction pattern worth keeping
  around? Is it a layout / motion / data-viz pattern that the live
  pages would benefit from?
- **Content value.** Is the embedded copy, research, or data worth
  keeping? Is it founder-authored editorial that took real work to
  write, or is it scaffold-style boilerplate?

Recommendations:

| Tag | Meaning | Action |
|---|---|---|
| **PROMOTE** | Real value; wire it into a live route or replace ad-hoc patterns with it | Author wiring; keep file |
| **ARCHIVE** | Real value but no current home; preserve under `_archive/` for later revival | `git mv` to `_archive/` with date suffix |
| **DELETE** | Superseded, redundant, or genuinely scaffold-style; safe to remove | `rm -rf` |
| **INVESTIGATE** | Need a product decision before recommending | Bring to founder review |

---

## 1 — PROMOTE candidates (real design value, currently dark)

> **Update 2026-05-08 (post-promotion audit).** Slice 1 of the
> [editorial-stitch promotion prompt](../prompts/editorial-stitch-and-light-texture-hero-promotion.md)
> ran and found **zero qualifying swap candidates** across the live
> marketing tree. The palette is good code; the live pages have just
> diverged from its design assumptions (numerals not icons, midnight
> heroes not light, multi-CTA closing panels, comparison columns, form
> integrations). Detailed findings:
> [`editorial-stitch-promotion-audit-2026-05-08.md`](editorial-stitch-promotion-audit-2026-05-08.md).
>
> Net: §1.1 and §1.2 stay listed as **canonical for new work** (and are
> now catalogued in DESIGN.md §7.1 so future authors find them before
> improvising), but the active migration work has been deferred to a
> future palette-expansion prompt that would extend the components to
> cover the divergent live patterns. The recommendation effectively
> downgrades from "PROMOTE this slice" to **"PROMOTE for new work,
> defer retrofit until palette is extended."**

### 1.1 `editorial-stitch/` — 9 reusable editorial components

| File | Lines | What it is |
|---|---|---|
| `atmospheric-media-card.tsx` | ~1,987 | Tonal image card with gradient scrim, icon anchor, ArrowLink CTA |
| `dot-texture-card.tsx` | ~ | Card with dot-texture background |
| `ghost-cta-panel.tsx` | ~ | Outline / ghost-styled CTA panel |
| `icon-feature-card.tsx` | ~ | Icon + feature description card |
| `midnight-statement-quote.tsx` | ~1,534 | Midnight-band pull-quote with decorative watermark, distinct from `PullQuote` |
| `preview-well.tsx` | ~ | Editorial preview well |
| `showcase-intro.tsx` | ~ | Showcase intro / lockup |
| `stitch-glass-top-bar.tsx` | ~ | Glass-effect top bar (assessment TopNavBar parity) |
| `index.ts` | barrel | Clean exports + types |

**Design value:** High. These are the canonical Stitch-translated
editorial primitives, well-typed (`*Props` exported), with proper
DESIGN.md token usage and lucide icons (per
`docs/build/prompts/stitch-to-react-migration.md`). They are the
intended replacement for the ad-hoc card patterns scattered across
`studio/pages/` and `sections-mock/`.

**Content value:** None — they are presentation primitives with no
embedded copy.

**Recommendation:** **PROMOTE.** Audit the live page tree for ad-hoc
versions of these patterns and replace with imports from
`@/components/editorial-stitch`. Likely targets: the founder cards on
`/about` (could use `IconFeatureCard` or an atmospheric variant), the
midnight pull-quote in `/about` Origin section (use
`MidnightStatementQuote`), the various "or skip ahead" panels (use
`GhostCtaPanel`), the toolkit-read-page large quote moments, the
pricing-page atmospheric tier hero.

**Action:** Open a discrete slice — *"Wire editorial-stitch into the
live page tree"* — and migrate 3-5 highest-leverage patterns. Anything
not adopted within 30 days of that slice gets ARCHIVED for further
review.

---

### 1.2 `studio/hero/LightTextureHero.tsx` — 4.4 KB

**What it is:** Documented as "the light-default companion to
`TopographicHero`." Same terrain texture, but `filter: invert()` flips
the source to dark linework with `mix-blend-multiply` to gently darken
cream paper. Eyebrow / title / subhead / children API, `headingId` for
a11y.

**Design value:** High. The `TopographicHero` pattern is the most
distinctive visual on the site (used on `/`); this is the
intentionally-paired light companion for non-midnight pages. The
churches / nonprofits / institutions audience hubs and `/about` hero
all currently use bespoke light-themed heroes that could use a
canonical variant.

**Content value:** None.

**Recommendation:** **PROMOTE.** Wire it into 1-2 audience hubs and
`/about` next time those pages get touched. If after 30 days no page
adopts it, ARCHIVE.

**Action:** Note in the design system docs (DESIGN.md or a sibling
doc) that `LightTextureHero` exists as the canonical light hero
companion. Add a lightweight Storybook entry or a doc snippet so the
next page author finds it before improvising.

---

### 1.3 `sections/services-sandbox-season/` — sandbox cohort offering page

| File | Notes |
|---|---|
| `sandbox-season-page-content.tsx` | Full Sandbox Season offering page |
| `sandbox-season-data.tsx` | Cohort roles, deliverables, timeline phases, pricing zones, out-of-scope items |
| `index.ts` | barrel |

**Design value:** Moderate — uses `Timeline`, `SurfaceCard`, structured
data. Patterns are reusable.

**Content value:** **High.** Contains structured authored content
about the Sandbox engagement (cohort roles, timeline phases, what's in
scope, what's explicitly out of scope, pricing zones). Given the
**new pricing tiers about to ship include $15,000 Sandbox** as a
discrete public offering, the content of this orphaned page is now
load-bearing for the public-facing Sandbox story.

**Recommendation:** **PROMOTE — but as content reference, not as-is.**
Treat `sandbox-season-data.tsx` as a content source for the new
`/pathway/sandbox` stage page when it gets the equivalent of the
Safety stage page treatment. The page-content component itself is
likely to be replaced; the data file is what matters.

**Action:** When the new pricing migration ships, port the structured
data (timeline phases, deliverables, out-of-scope, cohort roles) into
the `/pathway/sandbox` Safety-style page. Then this directory can be
DELETED.

---

## 2 — ARCHIVE candidates (real value, no current home)

### 2.1 `sections/fragmentation-deck/` — interactive 6-stage narrative

| File | Notes |
|---|---|
| `fragmentation-deck.tsx` | GSAP ScrollTrigger 6-stage scroll narrative |
| `corpus-data.ts` | Folder roots and corpus data |
| `integration-browser.tsx` | Folder browser UI |
| `fragmentation-deck.module.css` | Component-scoped CSS |
| `index.ts` | barrel |

**Design value:** High. Sophisticated GSAP-driven scroll narrative
covering Fragmentation → Integration → Activation → Formation →
Multiplication → Movement, with NewsletterForm and folder browser UI.
This is the most ambitious interactive component in the codebase.

**Content value:** High. Embeds the canonical fragmentation thesis
content — referenced from the live methodology page as a target
(`href: "/fragmentation"`) but the route doesn't exist.

**Recommendation:** **ARCHIVE.** The /fragmentation route is named in
strategy docs and pointed at from existing pages, so this work will
likely revive. Move to `_archive/fragmentation-deck-2026-05-08/` with
a README explaining it was the deck for the future /fragmentation
route. Removes ~2,200 lines of dead code from active surfaces while
preserving the work for later.

**Action:** `git mv` plus a one-paragraph README noting the integration
points. Add a TODO in the methodology page where it links to
`/fragmentation` so the dependency stays visible.

---

### 2.2 `sections/article-detail/` — article reading experience

| Files | Lines | Notes |
|---|---|---|
| `article-detail-page-content.tsx` | core | Full article reader composition |
| `article-hero.tsx`, `article-markdown.tsx` | | Hero + prose primitives |
| `article-toc-mobile.tsx`, `article-toc-rail.tsx` | | TOC variants |
| `continue-reading.tsx`, `prev-next-strip.tsx` | | Adjacent-article nav |
| `reading-path-rail.tsx`, `reading-progress.tsx` | | Reading progress UI |
| `sandbox-canon-article-cta.tsx` | | Per-article CTA |

**Design value:** High. Substantial library — TOC, reading progress,
adjacent-article nav, reading-path rail. If the platform ever ships
articles again, this is the foundation, and rebuilding it from scratch
would be weeks of work.

**Content value:** Low — it's a reading shell, not embedded copy.

**Recommendation:** **ARCHIVE.** Articles aren't a current product
surface. Move to `_archive/article-reader-2026-05-08/` with a one-page
README so a future articles route knows where to look.

**Action:** `git mv` and write a short README with the integration
points (`@/lib/articles`, `@/lib/articles-collections`, `CANON_*`
constants).

---

### 2.3 `sections/methodology/` and `sections/methodology-eight-patterns/`

**Design value:** Moderate.

**Content value:** High. Methodology pages contain founder-authored
framework explanations (the eight patterns, the methodology overview).
This is the kind of editorial that would be expensive to recreate.

**Recommendation:** **ARCHIVE.** Methodology may revive as part of the
fragmentation-thesis push; preserve the content. The page-content
components themselves are likely superseded by future Stitch
translations, so the data and copy are what matter.

**Action:** `git mv` to `_archive/methodology-2026-05-08/`. Cross-link
to the `_archive/fragmentation-deck-2026-05-08/` archive since the two
are conceptually paired.

---

### 2.4 `sections/home/` — old Concept Modern homepage

**Design value:** Moderate. The Concept Modern home was the prior
canonical homepage and contains layout patterns that may inform future
home-page revisions.

**Content value:** Moderate. Contains hero copy and section copy from
the prior home.

**Recommendation:** **ARCHIVE.** The active home is rendered through
`sections-mock/home/` plus `studio/hero/TopographicHero` (the recent
hero migration). The old Concept Modern home is no longer the source
of truth, but it's a reference for the design progression.

**Action:** `git mv` to `_archive/home-concept-modern-2026-05-08/`.

---

### 2.5 `sections/book-{landing,read,contributors}/`

| Path | Lines | Notes |
|---|---|---|
| `sections/book-landing/` | ~244 | Book landing page |
| `sections/book-read/` | ~200 | Book reading experience |
| `sections/book-contributors/` | ~290 | Book contributors / endorsers list |
| `sections/book-endorsements-featured.tsx` | — | Featured-endorsements server component (uses `book-data`) |

**Design value:** Moderate. Book product surface had a coherent
visual language.

**Content value:** Moderate. Contains author bios, endorsement copy,
and structured book metadata (via `@/lib/book-data`).

**Recommendation:** **ARCHIVE.** Book product is dormant; preserve
the work for future revival. Note that `book-endorsements-featured.tsx`
is an async server component pulling from `book-data` — confirm it's
not silently rendered anywhere before archiving.

**Action:** `git mv` to `_archive/book-feature-2026-05-08/`. Confirm no
silent renders via `grep -r "BookEndorsementsFeatured" src/`.

---

### 2.6 `marketing/knowledge-graph/` and `marketing/story/` — visualization libraries

| Path | Component count | Description |
|---|---|---|
| `marketing/knowledge-graph/` | 12 | `FieldNetworkView`, `EcosystemEmergenceView`, `LeaderEcosystemView`, `MachineLegibilityView`, `SystemLayerFlow`, `LegibilityLanesFlow`, `ClusterLabelLayer`, `GraphFilters`, `GraphStoryControls`, `GraphDetailPanel`, `NodeInspector`, `NarrativeStepOverlay`, `VisualizationLegend` |
| `marketing/story/` | 9 | `CapacityAxes`, `ImpactDimensionCards`, `LayerImpactCards`, `LayerImpactMatrix`, `NarrativeProjection`, `NetworkAggregationView`, `SequenceFlow`, `StoryCallout`, `TranslationMultiplier` |
| `marketing/path-shared/` | 3 | Pathway / journey shared utilities |
| `marketing/ui/` | several | Marketing-section UI wrappers |

**Design value:** **High.** This is a substantial visualization
library — D3 / sigma / graphology / xyflow are all listed in the tech
stack precisely because of this work. The component names suggest
narrative scrollytelling for a fragmentation / movement-leaders deck.

**Content value:** Low to moderate — depends on whether the views read
their data from `corpus-data.ts` style sources or take it as props.

**Recommendation:** **ARCHIVE.** The viz stack (`d3`, `sigma`,
`graphology`, `@xyflow/react`) is still in `package.json`, suggesting
the libraries are intended to revive. But 2,720 lines of unimported
code on the active tree is hygiene debt.

**Action:** `git mv` to
`_archive/marketing-visualization-2026-05-08/`. Preserve the
package.json viz dependencies (don't remove them) since the archive
will need them when revived. Add a top-level archive README explaining
the relationship to the fragmentation-deck archive.

---

## 3 — DELETE candidates (truly superseded, no preservable value)

### 3.1 `sections-mock/` orphans — 10 directories

These are HTML-to-React prototypes that never got wired and have been
superseded by `studio/pages/` canonicals. The studio versions are the
source of truth for the live routes.

| Path | Superseded by |
|---|---|
| `sections-mock/about/` | `studio/pages/AboutPage.tsx` (just rewritten) |
| `sections-mock/assess/` | `studio/pages/AssessPage.tsx` |
| `sections-mock/contact/` | `studio/pages/ContactPage.tsx` |
| `sections-mock/evidence/` | `studio/pages/EvidencePage.tsx` |
| `sections-mock/faq/` | `studio/pages/FaqPage.tsx` |
| `sections-mock/field-guide/` | (still wired — DO NOT DELETE; remove from this list) |
| `sections-mock/movement-leaders/` | `studio/pages/MovementLeadersPage.tsx` |
| `sections-mock/team/` | `/team` route deleted 2026-05-08 |
| `sections-mock/voices/` | `sections/voices/voices-page-content.tsx` (live) |
| `sections-mock/who-we-serve/` | `studio/pages/WhoWeServePage.tsx` (verify) |

**Recommendation:** **DELETE.** Confirm each one is not silently
rendered anywhere via grep, then `rm -rf`. Saves ~5,400 lines.

**Caveat:** Verify the field-guide entry — the audit flagged it as
unwired but I'm uncertain. Keep `sections-mock/field-guide/` until
confirmed.

---

### 3.2 `sections/` orphans — 15+ directories with no design or content reuse value

These are old Concept Modern page-content components for routes that
either don't exist anymore or are served by `studio/pages/`:

- `sections/about/` — superseded by `studio/pages/AboutPage.tsx`
  (just rewritten)
- `sections/contact/` — superseded by `studio/pages/ContactPage.tsx`
- `sections/assess/` — superseded by `studio/pages/AssessPage.tsx`
- `sections/movement-leaders/` — superseded by
  `studio/pages/MovementLeadersPage.tsx`
- `sections/services/`, `sections/services-sandbox-exemplar/` —
  services hub not currently a route (note: `services-sandbox-season`
  is the PROMOTE candidate above; these other two are orphan stubs)
- `sections/articles/`, `sections/articles-sandbox-hub/`,
  `sections/article-cards/` — articles not a current feature; cascade
  partner to article-detail (which is ARCHIVE'd)
- `sections/resources-templates/` — templates hub not a route
- `sections/nonprofit-funnel-new/` — superseded by current `/nonprofits`
- `sections/organizations/` — orphan
- `sections/platform/` — orphan
- `sections/legal-privacy/`, `sections/legal-terms/`,
  `sections/legal-cookies/` — confirm; these may be active or auto-
  generated. The `(site)/{privacy,terms,cookies}` routes do exist;
  verify whether they import from these directories before deleting.

**Recommendation:** **DELETE** after verifying the legal pages.

**Caveat:** The legal sections need verification before deletion —
confirm whether the current `/privacy`, `/terms`, `/cookies` routes
render through these directories or through a different path. Read
each route's `page.tsx` first.

---

## 4 — INVESTIGATE (need a product decision)

### 4.1 `sections/faq-accordion.tsx` and `sections/faq/`

**Status:** The agent flagged `sections/faq` as "partially used" —
`studio/pages/FaqPage.tsx` imports components from it. The
`faq-accordion.tsx` root file imports from `./faq/faq-data`.

**Question:** Is `studio/pages/FaqPage.tsx` actually rendering
`faq-accordion.tsx`? Or has the FAQ been migrated to `sections-mock/faq`
(unwired) instead?

**Action:** Read `studio/pages/FaqPage.tsx` end-to-end before
recommending. If FAQ uses `sections/faq/faq-data` and
`sections/faq-accordion.tsx`, KEEP both. If not, DELETE and the
sections-mock/faq becomes the candidate.

### 4.2 `sections/voices/voice-portrait.tsx` (and siblings)

The voices directory has a mix of live and dead components. Live:
`voices-page-content.tsx`, `voice-detail-page-content.tsx`,
`voice-portrait.tsx`. Possibly orphan: `voices-strip.tsx` or related.

**Action:** Audit each file in `sections/voices/` against the import
graph; expect a partial-cleanup rather than a wholesale delete.

### 4.3 `sections/methodology-eight-patterns/`

**Question:** Is this a duplicate of `sections/methodology` or a
separate piece of editorial content?

**Action:** Spot-read both files. If true duplicate, DELETE one. If
distinct content, ARCHIVE both alongside fragmentation-deck.

---

## 5 — Execution sequence

The audit is large enough that batching matters. Recommended order:

1. **Verify the legal-page imports** before deleting `sections/legal-*`.
   30 minutes.
2. **DELETE pass — `sections-mock/` orphans.** Confirm no silent
   imports, then `rm -rf` ten directories. Saves ~5,400 lines.
   Standalone PR.
3. **DELETE pass — `sections/` orphans.** After legal verification,
   bulk-delete the 15+ confirmed orphans. Saves ~7,000 lines.
   Standalone PR.
4. **ARCHIVE pass.** `git mv` fragmentation-deck, article-detail,
   methodology, home (Concept Modern), book-feature, and marketing
   visualizations into dated `_archive/` subdirectories with READMEs.
   Standalone PR.
5. **PROMOTE pass — `editorial-stitch` adoption.** Audit live page
   tree for ad-hoc card patterns; replace 3-5 highest-leverage
   instances with `editorial-stitch` imports. Standalone PR.
6. **PROMOTE pass — `LightTextureHero` adoption.** Wire into 1-2
   audience hubs and `/about`. Standalone PR.
7. **PROMOTE pass — `services-sandbox-season` content port.** When the
   pricing migration ships, port the data file into the new
   `/pathway/sandbox` page treatment. Then DELETE the stub directory.

Total estimated cleanup: **~13,000 lines deleted, ~7,000 lines
archived, ~3 PROMOTE slices** that improve the live experience.

## 6 — What this plan deliberately does not touch

- `_archive/*` — already archived; out of scope.
- `studio/pages/*`, `studio/Container`, `studio/Reveal`, `studio/hero/TopographicHero` — live canonical surface.
- `primitives/*` — all primitives appear to be live.
- `nav/*`, `toolkit/*`, `citations/*`, `forms/*`, `motion/*`, `case-study/*`, `book/*` (component primitives, not the orphaned `sections/book-*` page surfaces) — appear to be live infrastructure.
- The `tests/`, `docs/`, and `scripts/` trees — out of scope for a component audit.

## 7 — Open questions for founder review

1. **Does the `/fragmentation` route still belong on the public
   roadmap?** If yes, the fragmentation-deck archive should be flagged
   for a near-term revival pass. If no, it can collapse to DELETE.
2. **Will the platform ship articles again?** Decides whether
   article-detail goes to ARCHIVE or DELETE.
3. **Is the knowledge-graph / story visualization library tied to a
   future product surface (e.g., a "movement leaders ecosystem"
   visualization)?** Decides whether `marketing/` goes to ARCHIVE or
   DELETE, and whether the viz dependencies in `package.json` stay.
4. **The book product** — is there an upcoming launch that will revive
   `sections/book-*`? If launching in 2026, ARCHIVE is correct. If
   not, DELETE is acceptable.

These four answers materially change the size of the cleanup. None
should block the DELETE passes (§5 steps 1–3) since those targets are
unambiguous.
