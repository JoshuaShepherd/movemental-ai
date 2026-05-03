# Movemental site — SSOT snapshot (design, architecture, routes, components)

**As of:** 2026-04-19  
**Scope:** Public marketing / product surfaces under the `(site)` route group (`src/app/(site)/`), shared chrome, and reusable components that those pages import. **Out of scope:** `src/app/api/**` (list only where forms call APIs).

If this file disagrees with the repo, **the repo wins** — update this document in the same PR.

---

## 1. Design system (where truth lives)

| Layer | Location |
| ----- | -------- |
| Charter (pillars, tokens, motion, a11y, Stitch rules) | `docs/design/DESIGN.md` |
| Tailwind v4 `@theme`, MD3-style `:root` tokens, base typography | `src/app/globals.css` |
| Root layout (Inter via `next/font`, providers) | `src/app/layout.tsx`, `src/app/providers.tsx` |
| Site chrome layout (nav offset, footer) | `src/app/(site)/layout.tsx` |

**Product shape:** light-primary editorial site; **Midnight** (`variant="midnight"` / `bg-inverse-surface`) for regional dark bands — **no** global `class="dark"` on `<html>`. Semantic tokens only (`bg-background`, `text-foreground`, `bg-primary`, etc.); primary `#0053db`. Inter only.

**Stitch:** pinned project `2208910962065880866` — see `docs/build/stitch-project.md`.

---

## 2. Architecture (stack & patterns)

| Area | Choice |
| ---- | ------ |
| Framework | Next.js **16** (App Router), React **19**, Turbopack dev default |
| Styling | Tailwind **v4** (CSS-first config in `globals.css`) |
| UI primitives | shadcn/ui–style components under `src/components/ui/*` |
| Auth / DB | Supabase (SSR cookies via `@supabase/ssr`), Postgres, Drizzle ORM |
| Validation | Zod **4** |
| Data on client | TanStack Query **v5** (see `src/app/providers.tsx`) |
| Middleware | `proxy.ts` at repo root (Next 16; not `middleware.ts`) |

**Six-layer type-safety chain** (aspirational, from org conventions): Drizzle schema → Zod → services → API routes → hooks → UI. Marketing pages are mostly static composition; forms hit route handlers under `src/app/api/`.

---

## 3. Information architecture & navigation

**Single source of truth:** `src/components/nav/nav-links.ts` — `siteNavSections` drives **desktop dropdowns** (first four sections via `SITE_HEADER_NAV_MAX`), **mobile accordion**, and **footer columns**. Implementation: `SiteNavDesktop`, `MobileNav`, `SiteFooter`.

**Artifact placement SSOT:** [`docs/build/prompts/strategy-artifacts-placement-and-flow.md`](../build/prompts/strategy-artifacts-placement-and-flow.md) — **book** (`/book`) vs **AI Stewardship Sequence field guide** (`/articles/ssss-field-guide-for-organizational-leaders`) vs Ch. 2; `/assess` hub vs `/assessment-new`; AI posture; articles; proof types; `/about`.

**Naming doctrine:** Movemental's canonical AI adoption framework is called the **AI Stewardship Sequence**. It consists of four ordered stages: **Safety → Sandbox → Skills → Solutions**. The order is load-bearing: later stages borrow trust from earlier ones. Acronym-first naming (e.g. "SSSS," "4S") is **deprecated** and must not appear in new materials. First mention in any piece expands once ("the AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions"); subsequent mentions say "the AI Stewardship Sequence" or use the stage names directly. Internal file paths (`src/lib/ssss-integrity-assessment/`, `/api/assess/ssss-integrity`, `/articles/ssss-field-guide-for-organizational-leaders`) retain their historical slugs for route stability — see [§12](#12-naming-edge-cases).

**Footer / mobile accordion (`siteNavSections`):**

| Section ID | Column title | Links (order) |
| ---------- | ------------ | ------------- |
| `story` | Story | `/fragmentation`, `/platform`, `/system`, `/book`, AI Stewardship Sequence field guide, `/articles`, `/articles/archive`, **`/assess`** |
| `organizations` | Organizations | `/organizations`, `/who-is-a-movement-leader`, `/movement-leaders`, `/churches`, `/nonprofits`, `/institutions` |
| `engagements` | Engagements | `/services`, `/services/sandbox-season`, `/articles/sandbox`, `/methodology/eight-patterns`, `/resources/templates`, `/pricing`, `/methodology` |
| `trust` | Trust & next step | `/faq`, `/about`, `/team`, `/contact` |

**Primary header row (`siteHeaderFlatNavLinks`):** Story → `/fragmentation`; Platform; System; Book; Articles; **Assessments** → `/assess` (active also for `/assessment-new`); Services (active for `/services`, `/pricing`, `/methodology`, `/resources/templates`, `/articles/sandbox`); Organizations (active for audience subtree); About.

**Header CTAs:** Primary **Start a conversation** → `/contact`; secondary **FAQ** → `/faq` (`siteCtaLink` / `siteSecondaryCtaLink`).

**Legal strip:** `footerLegalLinks` — Privacy, Terms, Cookies.

**Blog:** `/blog` exists (`src/app/(site)/blog/page.tsx`) — **not** in header nav; must not fork vocabulary or duplicate `docs/articles` ([`docs/build/prompts/strategy-artifacts-placement-and-flow.md`](../build/prompts/strategy-artifacts-placement-and-flow.md) §7). Canonical long-form library: `/articles`.

**Walkthrough:** There is **no** live `(site)/walkthrough` route; prior UI lives under `src/app/(site)/_archived/walkthrough/`. Product-truth linking should use **`/platform`**, **`/system`**, and **`/evidence`** (when that page exists) until walkthrough is restored.

---

## 4. Route table (live `(site)` pages)

All paths omit the `(site)` segment. **`_archived/`** tree under `(site)` is **not** linked from production nav; keep for reference or redirects only.

| Path | Role |
| ---- | ---- |
| `/` | Home — `home-concept-modern-page-content` (and related marketing sections). |
| `/organizations` | Organizations hub — routes to audience segments. |
| `/who-is-a-movement-leader` | Definition / “marks” of movement leadership. |
| `/movement-leaders`, `/churches`, `/nonprofits`, `/institutions` | Audience pages. |
| `/fragmentation` | Six-stage fragmentation story (canonical narrative surface). |
| `/platform`, `/system` | Product / architecture narrative pages. |
| `/services` | Engagements hub — Sandbox Season, AI Stewardship Sequence engagements, links to pricing and articles. |
| `/services/sandbox-season` | Sandbox Season offering. |
| `/services/sandbox-season/exemplar` | Composite exemplar. |
| `/methodology` | Methodology landing. |
| `/methodology/eight-patterns` | Eight patterns methodology page. |
| `/resources/templates` | Template pack request page. |
| `/pricing` | Pricing & economics. |
| `/faq` | FAQ (long-form; receives **301** from `/evidence` and `/case-studies` per `next.config.ts`). |
| `/blog` | Blog route (separate from canonical `/articles` library). |
| `/articles`, `/articles/archive`, `/articles/[slug]` | Article library (`docs/articles` via `src/lib/articles.ts`). |
| `/articles/sandbox`, `/articles/sandbox/[slug]` | Sandbox canon article hub. |
| `/assess` | **Assessments hub** — three entry points; hosts **system readiness** at `#system-readiness` ([`strategy-artifacts-placement-and-flow.md`](../build/prompts/strategy-artifacts-placement-and-flow.md) §5). |
| `/assess/formation` | Formation maturity snapshot. |
| `/assessment-new` | **Dual-intelligence** diagnostic (distinct from system readiness). |
| `/contact` | Contact form + trust signals. |
| `/about`, `/team` | About / team. |
| `/book`, `/book/read/[slug]`, `/book/endorse`, `/book/contributors`, `/book/moderate` | Book hub, reader, endorsements, contributors, gated moderation. |
| `/newsletter/confirmed`, `/newsletter/unsubscribed` | Newsletter post-signup surfaces. |
| `/system/intel-artifacts` | Design QA grid (`robots: noindex`). |
| `/privacy`, `/terms`, `/cookies` | Legal. |

**`next.config.ts` redirects (selected; see file for full list):** `/who-its-for` → `/organizations`; `/how-it-works` (+ `/:path*`) → `/fragmentation`; `/vision` → `/fragmentation`; `/movemental-at-100`, `/knowledge-ecosystem` → `/fragmentation`; `/evidence`, `/case-studies` → `/faq`; `/system-builds` (+ `/:path*`) → `/contact`; `/services/discovery-lab`, `/services/organizational-systems`, `/services/system-builds` → `/contact`; `/manifesto`, `/apply`, `/inquiry` → `/contact`; legacy `/book/read/:slug` slugs → `/book`.

**Archived / stub route files (not linked from nav):** `(site)/_archived/**`, `(site)/knowledge-ecosystem/page.tsx` (redirect), `(site)/services/discovery-lab/page.tsx` (null shell + redirect), **`(site)/_archived/walkthrough/`** — no live `/walkthrough` URL.

**Not present as dedicated pages today:** standalone `/evidence`, `/case-studies`, `/apply`, `/inquiry`, `/manifesto`, `/walkthrough` (use redirects above or `/faq` / `/contact` / `/platform` as appropriate).

---

## 5. Component inventory (by folder)

Paths under `src/components/`.

### `primitives/`

Layout and editorial building blocks: `Section`, `Container`, `Display`, `Eyebrow`, `Prose`, `ArrowLink`, `FeatureSplit`, `SurfaceCard`, `Reveal`, `LightHeroPhotoBackdrop`, `LogoStrip`, `StatStrip`, `PullQuote`, `Timeline`, `InPageToc`, `EditorialComparisonTable`, `TestimonialRail`, `MediaVideo`, etc. **Start here** for new marketing sections.

### `editorial-stitch/`

Stitch-aligned patterns: `GhostCtaPanel`, `MidnightStatementQuote`, `IconFeatureCard`, `AtmosphericMediaCard`, `DotTextureCard`, `PreviewWell`, `ShowcaseIntro`, barrel `index.ts`.

### `marketing/`

Narrative and diagram-heavy blocks:

- `marketing/story/` — `NarrativeProjection`, `CapacityAxes`, `SequenceFlow`, `LayerImpactCards`, `NetworkAggregationView`, etc.
- `marketing/knowledge-graph/` — field / ecosystem visualizations (`FieldNetworkView`, `SystemLayerFlow`, `LeaderEcosystemView`, filters, inspector panels, etc.).
- `marketing/ui/` — shared small UI helpers for marketing (`ImpactShapeIndicator`, types).

### `system-builds/`

System-build pages: `AdaptiveLeadershipThroughline`, `SystemStackSection`, `BuildFormatSection`, `SystemBuildCard`, `TypicalPathsSection`, `ReadinessSection`, `OutputsSection`, `StartHereSection`, `SystemsIntegrationSection`, `AfterTheBuildSection`, `ConcretenessSection`, barrel `index.ts`.

### `nav/`

`SiteNav`, `SiteFooter`, `MobileNav`, `SiteNavMenus`, `NavScrollShadow`, `SiteLogo`, `nav-links.ts`.

### `book/`

Reader experience: `BookSection`, `BookHero`, `ChapterBody`, `ChapterNav`, `ReadingToolbar`, `MarginColumn`, `MarginNote`, `LensSelector`, endorsements, share/highlight, etc.

### `forms/`

`ContactForm`, `InquiryForm`, `ApplyForm`, `AssessmentForm`, `NewsletterForm`, `BookExportForm` — pair with `src/app/api/contact`, `inquiry`, `apply`, `newsletter`, etc.

### `assessment/`

`SystemReadinessDiagnostic`, Likert/progress helpers, copy in `system-readiness-copy.ts`.

### `sections/`

Marketing sections live under `src/components/sections/**` (home, book, services hub, pricing, FAQ data, fragmentation, assessments, etc.). Home composition is driven from **`src/components/sections/home/home-concept-modern-page-content.tsx`** (and `(site)/page.tsx` imports it).

---

## 6. Content sources (on-site)

| Surface | Source in repo |
| ------- | ---------------- |
| Book chapters | `docs/book-development/fragmentation-manuscript-ordered/*.md` (wired via `src/lib/book.ts`; legacy *Content That Moves* tree is not served) |
| FAQ / long pages | Mostly inline in respective `page.tsx` files |
| System build hub cards | `src/lib/system-builds/hub-cards.ts` |

Articles under `docs/articles/` are **mounted** at `/articles` and `/articles/[slug]` via `src/lib/articles.ts` (`listArticleSlugs`) — **authority / discovery** surfaces; vocabulary must stay aligned with `/book` and `/fragmentation` ([`strategy-artifacts-placement-and-flow.md`](../build/prompts/strategy-artifacts-placement-and-flow.md) §7).

---

## 7. Key API routes (marketing-related)

| Endpoint | Used for |
| -------- | -------- |
| `POST /api/contact` | Contact form |
| `POST /api/inquiry` | Organization inquiry |
| `POST /api/apply` | Apply flow |
| `POST /api/newsletter` | Newsletter signup |
| `GET`/`POST /api/assess/dual-intelligence` | Dual-intelligence diagnostic — validates `DualIntelligenceSubmitSchema`, persists to `dual_intelligence_assessments`; requires `TENANT_ORG_ID`. |
| `GET`/`POST /api/assess/system-readiness` | System readiness diagnostic — `SystemReadinessSubmitSchema`, persists to `system_readiness_assessments`; requires `TENANT_ORG_ID`. |
| `POST /api/assess` (root) | Legacy assessment payload (`AssessSchema` — email + five scores); persists to `assessment_results`. Prefer **`/api/assess/dual-intelligence`** and **`/api/assess/system-readiness`** for current marketing diagnostics. |

---

## 8. Legacy claim routing (messaging corpus vs live site)

**Custom GPT companion:** For **current** narrative (home, `/fragmentation`, book, publishable articles) upload **`docs/arguments/custom-gpt/messaging-00-live-site-and-narrative-ssot.md`** alongside `messaging-01` … `messaging-08` — it takes precedence over stale YAML page labels for public facts.

The Custom GPT bundles in `docs/arguments/custom-gpt/messaging-01-arguments.md` (YAML **Page routing**) and `messaging-08-by-page.md` (historical **by-page** sections) were built from an older HTML corpus. Use this crosswalk when interpreting **page** labels inside claims:

| Corpus / legacy label | Live site |
| --------------------- | --------- |
| Who we serve | `/who-its-for` (+ audience children) |
| Churches nonprofits (combined) | `/churches` and `/nonprofits` separately |
| Services / system-builds | Live hub: **`/services`**; legacy **`/system-builds`** URLs **301 → `/contact`** (`next.config.ts`). |
| Methodology | **`/methodology`** and **`/methodology/eight-patterns`**; `/how-it-works` → `/fragmentation` |
| Pricing Faq (combined) | `/pricing` and `/faq` |
| Proof about | Proof-style claims: map to `/evidence`, `/about`, `/case-studies` as context dictates |

---

## 9. Related validation scripts

`package.json` includes `routes:check`, `validate:all`, and alignment scripts — run after large IA changes.

---

## 12. Naming edge cases

The public name of the framework is **the AI Stewardship Sequence**. For route and identifier stability, a small number of internal surfaces retain historical `ssss-*` slugs:

| Surface | Public label (UI / docs) | Internal slug / path |
| ------- | ------------------------ | -------------------- |
| Field guide article | "the AI Stewardship Sequence field guide" | `/articles/ssss-field-guide-for-organizational-leaders` |
| Canonical framework article | "the AI Stewardship Sequence" | `/articles/the-ssss-framework` |
| Integrity diagnostic | "AI Stewardship Sequence integrity diagnostic" | `src/lib/ssss-integrity-assessment/`, `POST /api/assess/ssss-integrity`, `<SsssIntegrityDiagnostic />` |

Do **not** introduce new slugs or identifiers that begin with `ssss-` or `4s-`. When new material needs a slug, derive it from the stage name (`safety-`, `sandbox-`, `skills-`, `solutions-`) or from the concept ("ai-stewardship-sequence").
