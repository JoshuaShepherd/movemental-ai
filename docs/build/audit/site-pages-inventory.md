# Site pages inventory

Authoritative list of every **Next.js App Router page** (`page.tsx`) under `src/app/(site)/`, with a short summary of what each route renders or collects. URLs omit the `(site)` route group segment (it does not appear in the path).

**Scope:** Public marketing and product surfaces plus gated/internal tools that still ship as pages. **Out of scope:** `src/app/api/**` route handlers (JSON/API, not HTML pages).

**Book reader:** `/book/read/[slug]` is one route file; it materializes one URL per spine entry (preface, chapters 1–22, coda), including **coming soon** placeholders. Manuscript markdown is read from `docs/book-development/fragmentation-manuscript-ordered/` via `BOOK_SPINE` in [`src/lib/book-types.ts`](../../src/lib/book-types.ts). Prior *Content That Moves* chapter URLs redirect to `/book` (see `src/lib/book-legacy-read-redirects.ts` + `next.config.ts`).

**Navigation:** Primary IA is Radix dropdown groups in [`src/components/nav/nav-links.ts`](../../src/components/nav/nav-links.ts). The "Who it serves" menu is split into two columns — **Organizations** (churches, nonprofits, institutions; the primary implementation audiences) and **Movement leaders** (definition, practitioner fit, trusted voices). Footer mirrors the same structure. See canonical doctrine: [../strategy/movement-leaders-as-ecosystem-layer.md](../strategy/movement-leaders-as-ecosystem-layer.md).

**Canonical redirects** (see [`next.config.ts`](../../next.config.ts)): `/blog` → `/articles`; `/fragmentation-old` and `/fragmentation-intel` → `/fragmentation`; `/nonprofits-new` (+ `/next`) → `/nonprofits`; `/churches-new` → `/churches`; `/movement-leaders-new` → `/movement-leaders`; `/institutions-new` → `/institutions`; `/nonprofits-system-example-new` → `/nonprofits`; `/assessment-new` → `/assess`; `/platform` → `/how-it-works#hiw-platform`; `/system` → `/how-it-works#hiw-layers`; `/movemental-at-100` → `/vision#vision-structure`; `/knowledge-ecosystem` → `/vision#vision-ecosystem`. Legacy `/services` → `/system-builds` unchanged.

---

## Core home, narrative, and positioning

| Path | Summary |
|------|---------|
| `/` | **Home** — Editorial hero (“infrastructure for a credibility-scarce age”), Pew-style credibility section, scenius quote, network bento, leader profile cards (consolidation), Alan Hirsch spotlight, AI/stat callout, “Convergence” midnight grid, closing CTAs. Stitch-derived layout (`movemental_optimized_editorial_home_page`). |
| `/about` | **About** — Who is behind Movemental, beliefs, and why the product exists; aimed at movement leaders and supporting organizations. |
| `/manifesto` | **Manifesto** — Posture on credibility, formation, and adaptive work with AI: bounds, non-goals, and explicit refusals. |
| `/vision` | **Vision — Movemental at 100** — “Projected-state” narrative: what the field looks like at ~100 movement leaders (coherence, structure, density). |
| `/movemental-at-100` | **301 → `/vision#vision-structure`** — `page.tsx` is a null archived stub; canonical narrative lives on `/vision`. |
| `/knowledge-ecosystem` | **301 → `/vision#vision-ecosystem`** — `page.tsx` is a null archived stub; ecosystem framing is on `/vision`. |
| `/who-is-a-movement-leader` | **Who is a Movement Leader?** — Working definition focused on formative, multiplying impact (not follower counts or theory alone); numbered “marks” of movement leadership. |

---

## Audience landing pages

**Canonical distinction** (see [../strategy/movement-leaders-as-ecosystem-layer.md](../strategy/movement-leaders-as-ecosystem-layer.md)):

- `/churches`, `/nonprofits`, `/institutions` are **implementation audiences** — the organization types that actually adopt and run Movemental.
- `/movement-leaders` and `/who-is-a-movement-leader` are **movement-leader surfaces** — a definition + practitioner-fit page for authors/teachers whose own life's work has fragmented. They are **not** a fourth parallel audience segment; the trusted-voice / ecosystem layer proper lives at `/voices`.

| Path | Summary |
|------|---------|
| `/movement-leaders` | **For Movement Leaders** — Practitioner fit + five failures / five moves for authors, teachers, and leaders whose own body of work has fragmented. Treats the reader as a movement leader looking at their own work, not as a buyer browsing an audience funnel. |
| `/churches` | **For Churches** — Formation vs activity; systems that move people through teaching; “start here” style cards and church-specific framing. |
| `/nonprofits` | **For Nonprofits** — Merged canonical journey: two-intelligences diagnosis, four system builds, stage translations for nonprofit operations, next-step paths, story spine, midnight CTA. |
| `/institutions` | **For Institutions** — Same foundation applied to research, curriculum, and faculty collaboration; links to system builds and inquiry. |

---

## Product, platform, and “how it works”

| Path | Summary |
|------|---------|
| `/platform` | **301 → `/how-it-works#hiw-platform`** — `page.tsx` is a null archived stub; platform framing lives under **How it works**. |
| `/system` | **301 → `/how-it-works#hiw-layers`** — `page.tsx` is a null archived stub; layer stack lives under **How it works**. |
| `/how-it-works` | **How It Works** — Process narrative: existing teaching, content, relationships, and tools turned into a system people can move through; TOC-driven sections. |
| `/walkthrough` | **Platform Walkthrough** — Guided tour of the system: content libraries, pathways, AI-assisted formation, and representative UI/surface explanations. |
| `/evidence` | **Evidence** — Argumentation page: integrated product depth, AI in context, formation-oriented architecture, multi-tenant design; uses editorial comparison patterns with clear scope. |
| `/pricing` | **Pricing** — Economics narrative ($1,000 + 10%, ownership, network) contrasted with publishers, platforms, builders, and custom dev; comparison columns and supporting copy. |
| `/faq` | **FAQ** — Long-form answers on fit, AI behavior, pricing, ownership, implementation, and engagement expectations; TOC for jumping within the page. |

---

## Services and system builds

| Path | Summary |
|------|---------|
| `/services` | **Services** — Top-level services overview: turning a body of work into a structured, discoverable system (not books/PDFs alone). |
| `/services/discovery-lab` | **Discovery Lab** — Four-week sprint: prioritized AI use cases, experiment briefs, measurement/risk notes, internal playbook draft; “bounded experimentation” positioning. |
| `/services/organizational-systems` | **Organizational Systems** — Integrated digital system for orgs: content, fundraising, governance, and AI capability as one posture. |
| `/services/system-builds` | **System Builds** — Hub for modular four-week installs (Discovery Lab, content, fundraising, governance/ethics, foundation sequencing) with artifact/owner/handoff emphasis. |
| `/services/system-builds/foundation` | **Foundation Layer Build** — Governance vs ethics, decision maps, disclosure posture as operating spine before deeper builds. |
| `/services/system-builds/content` | **Content System Build** — Four-week content system: structured library, thematic pathways, SEO-ready IA, deployable spec (reuse/discoverability). |
| `/services/system-builds/fundraising` | **Fundraising System Build** — Four-week fundraising rails: donor opportunities, relationship visibility, dashboards, stewardship workflows. |
| `/services/system-builds/governance-ethics` | **Governance & Ethics System Build** — Four-week collaborative sprint: governance manual, ethics charter, authority matrix, compliance protocol. |

---

## Book: *From Fragmentation to Movement* (fragmentation manuscript)

| Path | Summary |
|------|---------|
| `/book` | **Book landing** — Public title/subtitle from `src/lib/book-meta.ts`; TOC for full spine; stats for published vs total; four audience lenses (`movement-leaders`, `churches`, `nonprofits`, `institutions` via `?lens=`). |
| `/book/read/[slug]` | **Chapter reader** — Toolbar, lens, share; **live** chapters load markdown + margin notes / endorsements / highlight-share; **coming soon** entries show a placeholder (no margin submission). Metadata uses `BOOK_TITLE`; coming-soon routes use a fixed description. |
| `/book/endorse` | **Endorse** — Public form; chapter dropdown is spine-backed. |
| `/book/contributors` | **Contributors** — Credited margin contributors (data layer). |
| `/book/moderate` | **Book moderation (internal)** — **Not linked publicly.** Requires `?token=` matching `BOOK_MODERATION_TOKEN`; returns 404 otherwise. |

**Slug source of truth:** `BOOK_SPINE` + optional on-disk files `NN-<slug>.md` under `docs/book-development/fragmentation-manuscript-ordered/` (see [`src/lib/book.ts`](../../src/lib/book.ts)). The prior *Content That Moves* tree remains in `docs/book-development/manuscript-ordered/` for editorial reference; a snapshot copy lives under `docs/book-development/archive/content-that-moves-manuscript-ordered/`.

---

## Social proof, content marketing, and assessments

| Path | Summary |
|------|---------|
| `/case-studies` | **Case Studies** — Index of segment cards (movement leader, church, nonprofit) with “coming soon” full write-ups; logo strip and horizontal testimonial-style rail with the same teaser summaries. |
| `/voices` | **Trusted voices** — Hub page for the trusted-voice / ecosystem layer: named movement leaders whose public work shapes the platform. Portrait-forward grid (currently three: Liz Rios, JR Woodward, L. Rowland Smith). Roster data lives in `src/lib/committed-voices.ts` (internal name retained to avoid churn). Per canonical doctrine (`docs/build/strategy/movement-leaders-as-ecosystem-layer.md`): not an audience segment, not a recruitment funnel. |
| `/voices/[slug]` | **Trusted voice — detail** — Per-voice editorial bio, credentials, selected works, curated outbound links, and "On Movemental" empty-state slots (Courses / Articles / Conversation agents). `generateStaticParams` materializes one page per slug; includes `Person` JSON-LD. |
| `/blog` | **301 → `/articles`** — Route file may remain; public traffic should use the article library. |
| `/articles` | **Articles index** — Filesystem-backed list from `docs/articles/` (see `src/lib/articles.ts`); featured strip + full grid. |
| `/articles/[slug]` | **Article detail** — Markdown body + TOC + related articles. |
| `/assess` | **Assessments hub** — Intro + cards linking to formation snapshot; **system readiness diagnostic** (`SystemReadinessDiagnostic`) on-page. |
| `/assess/formation` | **Formation maturity** — Fifteen-question snapshot; links back to `/assess` hub. |

---

## Conversion and contact

| Path | Summary |
|------|---------|
| `/contact` | **Contact** — Expectation-led, relationship-first contact entry point (form and supporting copy for starting a conversation). |
| `/apply` | **Apply to Join** — Application flow for movement leaders: work, audience, fit (movement-leader onboarding). |
| `/inquiry` | **Organization Inquiry** — Form for churches, nonprofits, or institutions; positioning that recommendations may point outside Movemental when not a fit. |

---

## Legal and policies

| Path | Summary |
|------|---------|
| `/privacy` | **Privacy Policy** — Collection, use, and protection of information for site visitors and prospects. |
| `/terms` | **Terms of Service** — Terms for website and related services. |
| `/cookies` | **Cookie Policy** — Cookie and similar technologies, plus user controls. |

---

## Count checklist

| Category | Count |
|----------|------:|
| `(site)` routes with one URL per `page.tsx` (every file except dynamic readers) | 39 |
| Chapter reader | +1 file: `/book/read/[slug]` |
| Distinct chapter URLs from that file | +24 slugs (full spine: preface, Chapters 1–22, coda) |
| Committed voice reader | +1 file: `/voices/[slug]` |
| Distinct voice URLs from that file | +3 slugs (`liz-rios`, `jr-woodward`, `rowland-smith`) |
| **Distinct paths this inventory describes** | **39 + 24 + 3 = 66** |

`/book/moderate` is included in the **39**; without a valid `?token=` it returns **404** (`notFound()`), but the route still exists in the app.

**Files counted as site pages:** 41 × `src/app/(site)/**/page.tsx` (39 singleton routes + `book/read/[slug]/page.tsx` + `voices/[slug]/page.tsx`).

---

## Maintenance

When adding or removing routes, update this document in the same PR or immediately after so the inventory stays aligned with `glob: src/app/(site/**/page.tsx`.
