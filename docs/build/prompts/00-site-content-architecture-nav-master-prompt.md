# Site content, IA, and navigation — master inventory & agent prompts

**Created:** 2026-04-15  
**Purpose:** Single document that (1) inventories every shipped `(site)` page as implemented in the repo, (2) states strategic IA/content recommendations aligned with the **home** narrative spine, **`/fragmentation`** (six-stage story), and **`/book`** (*From Fragmentation to Movement*), (3) defines a **canonical final URL set**, (4) supplies **copy-paste prompts** for per-page work, and (5) specifies **perfected primary navigation** per `docs/design/DESIGN.md` and the repo’s architecture conventions.

**Ground truth paths:** `src/app/(site)/**/page.tsx`, `src/components/nav/nav-links.ts`, `src/lib/articles.ts`, `src/lib/book-meta.ts`, `src/lib/book-types.ts` (`BOOK_SPINE`), `next.config.ts` (redirects). If this file disagrees with code, **update this file in the same PR** as routing or nav changes.

---

## Part 1 — Copy-paste master prompts (run these first)

Prepend **every** downstream page prompt with the following block:

```text
You are editing the Movemental marketing site (Next.js 16 App Router, Tailwind v4, token-first UI).

Non-negotiables:
1. Read docs/design/DESIGN.md — semantic tokens only (no raw hex / bg-white / decorative section borders). Midnight bands use Section variant="midnight". Inter only.
2. Marketing pages compose primitives (Section, Container, Display, Eyebrow, Prose, SurfaceCard, ArrowLink) and patterns from docs/build/prompts/stitch-to-react-migration.md. Pinned Stitch project: 2208910962065880866 only when generating new screens.
3. Narrative spine to preserve and cross-link explicitly:
   - Home (/) = problem → six-stage arc → proof → entry points (see src/components/sections/home/home-page-content.tsx).
   - /fragmentation = canonical “fragmentation story” — six stages: Fragmentation, Integration, Activation, Formation, Multiplication, Movement; audience/field/node query params where implemented.
   - /book = free book From Fragmentation to Movement — same vocabulary as fragmentation + home; spine in src/lib/book-types.ts; chapter reader at /book/read/[slug].
4. Do not invent endorsements, case study outcomes, or client names. Label placeholders clearly.
5. Keep "use client" as deep as possible; respect src/app/(site)/layout.tsx chrome (SiteNav, pt-16, SiteFooter).
6. Navigation data lives in src/components/nav/nav-links.ts — SITE_HEADER_NAV_MAX = 4 dropdown groups for desktop; footer uses full siteNavSections. Any new top-level IA must respect the four-dropdown cap or propose restructuring groups.
7. Long routes should use InPageToc (DESIGN.md § proof / wayfinding) instead of duplicating global nav in page body.

Placement SSOT: read [`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) — **book** = `/book`; the **AI Stewardship Sequence field guide** = `/articles/ssss-field-guide-for-organizational-leaders`; `/assess` vs `/assessment-new` must stay distinct; Movemental AI = f(context, corpus, governance).

Deliverables for this task: [DESCRIBE]. Output a short summary of files touched and any new internal links added between Home, Fragmentation, Book, and Articles.
```

**Whole-site alignment pass (single agent run):**

```text
Using 00-site-content-architecture-nav-master-prompt.md Part 4 (final URL list) as canonical:

1. Audit internal links sitewide for references to deprecated paths (/services, legacy book slugs, /fragmentation-old, /fragmentation-intel if removed from IA).
2. Align hero/eyebrow/CTA language on movement-leaders, churches, nonprofits, who-its-for, how-it-works, platform, system, evidence, and pricing with the six-stage vocabulary used on /fragmentation and /book (integration as load-bearing, informational vs relational intelligence, scatter field → field).
3. Add a consistent “three beats” footer strip on key landings: Read the fragmentation story → Read the book → Browse articles (when Articles is linked in nav).
4. Update src/components/nav/nav-links.ts and mobile/footer consumers so the perfected IA in Part 5 is implemented; verify isNavActive still highlights /book/read/* under Book.
5. Refresh docs/build/audit/site-pages-inventory.md and docs/arguments/SITE-SSOT.md § navigation to match nav-links.ts (remove outdated “mega menu” wording if still present).
```

---

## Part 2 — Current-state summary by route

Paths omit the `(site)` route group. Summaries reflect **composition / intent** as of the investigation date (code + content loaders).

### Core narrative & home

| Path | What visitors get (summary) |
|------|----------------------------|
| `/` | Full editorial home: `HomeHero` through `HomeCta` — credibility-scarce age framing, problem/consequence/turn, system + six-stage sections (`HomeIntegration` … `HomeMovement`), proof, audience entry cards, closing CTAs. Metadata positions formation + AI + field guide. |

### Audience & definitions

| Path | Summary |
|------|---------|
| `/who-its-for` | Hub page routing to movement leaders, churches, nonprofits (`WhoItsForPageContent`). |
| `/movement-leaders` | Audience landing — consolidation, ownership, network; movement-author profile. |
| `/churches` | Church-specific formation vs activity, systems framing. |
| `/nonprofits` | Nonprofit fragmentation → systems narrative (legacy audience page). |
| `/who-is-a-movement-leader` | Definition with numbered “marks”; formative/multiplying leadership vs vanity metrics. |

### Fragmentation narrative (canonical + variants)

| Path | Summary |
|------|---------|
| `/fragmentation` | **Canonical public story:** six-stage editorial experience (`FragmentationStoryNewShell`), stage preview strip, `FragmentationIntroHeader`; query params `audience`, `field`, `nodes` for tailored copy/intel. |
| `/fragmentation-intel` | Same narrative family rendered with **live intel artifact components** (no raster thumbnails) — QA/showcase sibling. |
| `/fragmentation-old` | **Legacy** implementation (`FragmentationStoryPageContent`); `robots: { index: false }`; preserved for comparison. |

### Book (*From Fragmentation to Movement*)

| Path | Summary |
|------|---------|
| `/book` | Landing: `BOOK_TITLE` / subtitle from `book-meta.ts`, hero, lens selector (`?lens=`), spine TOC, live vs coming-soon counts, endorsement wall (DB or placeholders), export/subscribe CTAs, links to read chapters. |
| `/book/read/[slug]` | Chapter reader: toolbar, lenses, share, markdown from `docs/book-development/fragmentation-manuscript-ordered/` per `BOOK_SPINE`; coming-soon entries placeholder. |
| `/book/endorse` | Public endorsement form (spine-backed chapter dropdown). |
| `/book/contributors` | Contributor credits. |
| `/book/moderate` | Token-gated moderation UI (`BOOK_MODERATION_TOKEN`); `notFound()` without token — not linked in nav. |

### Product / system / process

| Path | Summary |
|------|---------|
| `/platform` | “Living digital system” — layers, ownership, boundaries vs generic SaaS. |
| `/system` | Connected system story — content, learning, community, commerce, AI; often includes on-page TOC to themes. |
| `/how-it-works` | Process: scattered assets → coherent system people move through; TOC-driven. |
| `/walkthrough` | Guided tour — libraries, pathways, AI-assisted formation, representative UI. |
| `/evidence` | Argumentation / comparison patterns — depth, AI-in-context, formation architecture, multi-tenant. |
| `/pricing` | Economics ($1k + 10%, ownership, network) vs alternatives; comparison layout. |
| `/faq` | Long-form FAQ with TOC navigation. |

### System builds & services (URL layer)

| Path | Summary |
|------|---------|
| `/system-builds` | **Canonical hub** for modular sprints (cards from hub config). |
| `/system-builds/discovery-lab` | Four-week Discovery Lab sprint. |
| `/system-builds/foundation` | Foundation / governance-ethics spine sprint. |
| `/system-builds/content` | Content system build. |
| `/system-builds/fundraising` | Fundraising rails build. |
| `/system-builds/governance-ethics` | Governance & ethics collaborative sprint. |
| `/services` | **Redirect** (301) to `/system-builds`; `page.tsx` returns null (archived defense-in-depth). |
| `/services/discovery-lab`, `/services/organizational-systems`, `/services/system-builds` | Still routed in app; **redirected** to `/system-builds` via `next.config.ts` (verify behavior for nested paths). |

### Vision, manifesto, ecosystem

| Path | Summary |
|------|---------|
| `/about` | Orientation — why Movemental exists; links to `/book`, `/fragmentation`, trust surfaces; **not** primary owner of full thesis ([`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md)). |
| `/manifesto` | Credibility, formation, AI bounds, refusals, posture. |
| `/vision` | “Movemental at 100” projected-state narrative — field coherence at ~100 leaders. |
| `/movemental-at-100` | Complements vision — five dimensions, bounded cohort scale (not viral growth fantasy). |
| `/knowledge-ecosystem` | Corpus → visible system; many leaders → field. |

### Social proof, articles, blog

| Path | Summary |
|------|---------|
| `/case-studies` | Index with segment cards; many “coming soon” deep dives; testimonial-style rail. |
| `/articles` | Index of **filesystem-backed** essays in `docs/articles/` (loader excludes internal drafts — see `EXCLUDED_SLUGS` in `src/lib/articles.ts`). **27 public slugs** at time of writing (Part 3). |
| `/articles/[slug]` | Static params from `listArticleSlugs()`; `ArticleDetailPageContent` + related articles. |
| `/blog` | Shorter updates (`BlogPageContent`); **must not** duplicate `docs/articles` or fork vocabulary — canonical essay library remains `/articles` ([`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) §7). |

### Assessments, apply, contact

| Path | Summary |
|------|---------|
| `/assess` | **Operational system readiness** diagnostic — marketing + `AssessmentForm` (wired to assessment API as implemented); **not** the dual-intelligence / stage instrument ([`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) §5). |
| `/assess/formation` | Formation maturity assessment surface. |
| `/assessment-new` | **Dual-intelligence × six-stage infrastructure diagnostic** (`AssessmentEntryContent`) — **semantically distinct** from `/assess` operational readiness; see [`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) §5. |
| `/apply` | Movement leader application. |
| `/inquiry` | Org inquiry (churches / nonprofits / institutions). |
| `/contact` | Relationship-first contact + form. |

### Nonprofit funnel (merged)

Former `/nonprofits-new` and `/nonprofits-new/next` **301 → `/nonprofits`**. Stage translations and diagnosis copy now live on the canonical nonprofit audience page.

### Legal & internal / QA

| Path | Summary |
|------|---------|
| `/privacy`, `/terms`, `/cookies` | Legal policies. |
| `/system/intel-artifacts` | **Design QA** grid for intel artifact components (narrative + operational slugs). |

### Archived under `(site)/_archived/`

Not linked from production nav; retained for reference or migration. Includes archived `knowledge-ecosystem`, `how-it-works`, `services` subtree, `vision`, `walkthrough`, `system`, `platform`, `who-is-a-movement-leader`, `movemental-at-100`, etc. Treat as **historical** unless explicitly revived.

---

## Part 3 — Articles index (public slugs)

Sourced from `docs/articles/*.md` minus `EXCLUDED_SLUGS` in `src/lib/articles.ts` (27 public routes):

1. `01-content-strategy-for-movement-leaders`  
2. `02-the-evergreen-article-architecture`  
3. `03-transformation-over-information`  
4. `04-the-eight-week-formation-scaffold`  
5. `05-formation-journeys-the-pathway-architecture`  
6. `06-the-christocentric-spine`  
7. `ai-collapses-the-cost-of-integration`  
8. `ai-means-organizations-have-to-rebuild`  
9. `case-study-youthfront`  
10. `context-changes-everything`  
11. `fragmentation-inventory`  
12. `fragmentation-to-multiplication`  
13. `guide-ai-credibility-2026`  
14. `intelligence-fragmentation`  
15. `movemental-stack-nonprofit-use-cases`  
16. `nonprofits-pii-private-agentic-rag`  
17. `playbook-church`  
18. `playbook-institution`  
19. `playbook-movement-leader`  
20. `playbook-nonprofit`  
21. `relational-intelligence`  
22. `substack-and-movemental-system`  
23. `the-cost-of-fragmentation`  
24. `the-one-constraint-behind-every-ai-conversation`  
25. `the-story-of-movemental`  
26. `two-intelligences-integration`  
27. `why-your-content-isnt-compounding`  

Eyebrow categories are assigned in `EYEBROW_OVERRIDES` (Essay, AI, Strategy, Guide, Case study, Methodology, etc.).

---

## Part 4 — Book spine (chapter URLs)

One dynamic route `/book/read/[slug]` materializes **24** reader URLs from `BOOK_SPINE` in `src/lib/book-types.ts` (preface, chapters 1–22, coda). Titles and live vs coming-soon follow manuscript files under `docs/book-development/fragmentation-manuscript-ordered/`. Legacy *Content That Moves* chapter URLs **301** to `/book` per `book-legacy-read-redirects` + `next.config.ts`.

---

## Part 5 — Strategic recommendations (architecture & content)

### Diagnosis (short)

- **Strong spine** exists in code: home sections mirror the **six stages**; `/fragmentation` is the dedicated narrative surface; `/book` deepens the same thesis with long-form reading.  
- **IA drift:** many overlapping routes (`/platform` vs `/system`, `/vision` vs `/movemental-at-100`, `/services/*` vs `/system-builds/*`, `/blog` vs `/articles`, `/nonprofits` vs `/nonprofits-new/*`). **`/assess` and `/assessment-new` are intentionally two URLs** (operational readiness vs dual-intelligence diagnosis) — reduce **cognitive** noise via hub copy, **not** by merging instruments ([`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) §5).  
- **Nav gap:** `Articles` is **not** in `nav-links.ts` while **27** substantive articles ship — missed distribution for the same argument the book makes.  
- **Experimental / QA routes** (`fragmentation-intel`, `fragmentation-old`, `nonprofits-new`, `system/intel-artifacts`) add SEO/cognitive noise unless gated, noindexed, or merged. **`/assessment-new`** follows the dual-intelligence placement SSOT above — not lumped with legacy QA routes for “merge” decisions.

### Recommended actions (types)

| Action type | Candidate | Rationale |
|-------------|-----------|-----------|
| **Delete / de-route** | `/blog` *or* replace entirely | Placeholders undermine credibility; either ship real posts or remove from nav and redirect to `/articles` with a “library” framing. |
| **Merge** | `/vision` + `/movemental-at-100` | Same “at 100” thesis; one route with two major anchors (or `/vision` canonical + `/movemental-at-100` → 301). |
| **Merge or differentiate sharply** | `/platform` + `/system` | If both stay, assign **non-overlapping jobs**: e.g. Platform = ownership/product boundary; System = layer diagram + connected surfaces — and cross-link once. |
| **Consolidate** | `/nonprofits` + `/nonprofits-new` (+ maybe `/nonprofits-new/next`) | One nonprofit journey: pain → fragmentation story → stages applied → CTA (inquiry / Discovery Lab). |
| **Hub without merge** | `/assess`, `/assess/formation`, `/assessment-new` | A single **nav** “Assessments” label may point to a **hub** that explains **two instruments** — still **two URLs**, **two scorers**, **two result semantics**: `/assess` = operational readiness; `/assessment-new` = dual-intelligence / stage diagnosis. **Do not** merge UI, scoring, or lead language without an explicit product decision ([`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) §5). |
| **Retire / noindex / redirect** | `/fragmentation-old` | Already noindex; add **301 to `/fragmentation`** when comfortable losing side-by-side QA. |
| **Retire from public IA** | `/fragmentation-intel`, `/system/intel-artifacts` | Move to preview env, auth gate, or `robots: noindex` + remove from any accidental sitemap if duplicated story. |
| **Keep + edit** | `/how-it-works`, `/walkthrough`, `/evidence`, `/faq`, `/pricing` | Tune copy so opening paragraphs **name** informational/relational fragmentation and point to `/fragmentation` and `/book`. |
| **Keep + strengthen cross-links** | `/movement-leaders`, `/churches`, `/nonprofits`, `/who-its-for` | Each should end with the same **next three steps**: fragmentation story → book chapter 0/1 → articles tagged by audience (future) or playbook articles. |

### Redirects & SSOT

- Treat **`/system-builds`** as the only customer-facing services taxonomy; keep `next.config.ts` redirects as SSOT.  
- Align **`docs/arguments/SITE-SSOT.md`** navigation section with actual `nav-links.ts` (dropdown sections, not legacy mega-menu copy).

---

## Part 6 — Canonical final page list (recommended public IA)

**Must ship (core):**

`/`, `/fragmentation`, `/book`, `/book/read/[slug]`, `/book/endorse`, `/book/contributors`, `/articles`, `/articles/[slug]`, `/who-its-for`, `/movement-leaders`, `/churches`, `/nonprofits`, `/who-is-a-movement-leader`, `/how-it-works`, `/system-builds`, `/system-builds/discovery-lab`, `/system-builds/foundation`, `/system-builds/content`, `/system-builds/fundraising`, `/system-builds/governance-ethics`, `/evidence`, `/pricing`, `/faq`, `/case-studies`, `/walkthrough`, `/assess`, `/assess/formation`, `/apply`, `/inquiry`, `/contact`, `/about`, `/manifesto`, `/knowledge-ecosystem`, `/privacy`, `/terms`, `/cookies`

**Pick one vision stack (recommendation):**

- **Option A (minimal URLs):** `/vision` only (merge `movemental-at-100` content in-page or redirect).  
- **Option B:** keep both only if titles differ clearly: Vision = narrative; At 100 = numeric/scenario appendix.

**Platform / system (pick differentiation or merge):**

- **Option A:** Keep `/platform` + `/system` with explicit cross-links and distinct H1 promises.  
- **Option B:** Single `/system` with a “Platform ownership” anchor section (redirect `/platform`).

**Deprioritize or remove from public marketing:**

- `/blog` (until real content)  
- `/fragmentation-old`, `/fragmentation-intel`, `/system/intel-artifacts`  
- `/nonprofits-new`, `/nonprofits-new/next` (after merging into `/nonprofits`)  
- `/assessment-new` (after merging into `/assess` hub)  
- `/services` tree (already redirected — optional cleanup of `page.tsx` files in a dedicated refactor PR)

**Internal only:**

- `/book/moderate` (token gate; never primary nav)

---

## Part 7 — Per-route content prompts (existing pages)

Use **Part 1 master prepend** for each block.

### `/` (Home)

```text
Tighten lexical alignment with /fragmentation and /book: in HomeHero and early bands, explicitly name “informational and relational intelligence” once each; ensure stage section headings match the six-stage order and wording on /fragmentation. Add one subdued text link to /book and /articles near HomeProof or HomeEntryPoints. Follow docs/build/prompts/home-hero-scatter-integration-visual-plan.md if extending the hero visual. Do not add raw hex or new decorative borders.
```

### `/fragmentation`

```text
Treat as canonical narrative: verify each stage section id matches FRAGMENTATION_STAGE_PREVIEWS jump targets; ensure audience/field/nodes params are documented in-page for sharable URLs. Cross-link to /book/read/preface-the-scatter-field (or current preface slug) and to /articles (fragmentation-inventory, two-intelligences-integration). Confirm metadata description matches six-stage names exactly.
```

### `/book` and `/book/read/[slug]`

```text
On landing: first screen should echo fragmentation vocabulary (scatter field → field, integration load-bearing). Lens copy (movement-leaders, churches, nonprofits, institutions) should each tie to one chapter recommendation + one article slug where possible. For each live chapter: opening paragraph re-states stage thesis; end-of-chapter “Read next” points to next spine slug. No duplicate H1 vs chapter title in rendered markdown.
```

### `/movement-leaders`, `/churches`, `/nonprofits`, `/who-its-for`

```text
Rewrite closing CTA band to a shared pattern: (1) Read the fragmentation story (2) Start the book at preface (3) Browse articles — with audience-specific one-line rationale. Remove any language that contradicts book subtitle (“structural path…”). Churches: tie “formation vs information” to Formation stage; nonprofits: tie operational fragmentation to Integration + Multiplication.
```

### `/how-it-works`, `/walkthrough`, `/platform`, `/system`

```text
Opening lede: one paragraph mapping “tools stack” to “two intelligences fragmented.” Link to /fragmentation#stage-integration (or precise anchor) in first 2 screens. Differentiate routes: if merging is out of scope, add a comparison pull-quote between Platform (ownership / what you keep) vs System (connected surfaces / how it feels to use).
```

### `/system-builds` and child sprint pages

```text
Each sprint page opens with which **stage(s)** it primarily advances (usually Integration + Activation for Discovery Lab; Multiplication for fundraising visibility; Formation for content pathways; Foundation for governance). Link horizontally to adjacent sprints and vertically to /book chapters that justify the sprint (cite chapter titles in prose, not code).
```

### `/evidence`, `/pricing`, `/faq`

```text
Evidence: add a short “How this connects to the book’s argument” box linking /book. Pricing: clarify “fragmentation tax” metaphor alignment with book chapter 1 framing; avoid implying unlimited scale. FAQ: first FAQ should define informational vs relational fragmentation in plain language with link to /fragmentation.
```

### `/vision` and/or `/movemental-at-100`

```text
If keeping both: remove duplicated paragraphs; vision page gets narrative poetry; at-100 page gets scenarios/metrics — each links to the other once. If merging: produce one TOC with two major H2s; set redirect from deprecated URL.
```

### `/knowledge-ecosystem`

```text
Position as “Part III” companion to book’s corpus argument: link to /book/read/* chapters on corpus/schema where relevant; avoid inventing product features not in platform copy.
```

### `/manifesto`, `/about`

```text
Manifesto: cross-link to /book (ethics, refusal, credibility) and /articles/guide-ai-credibility-2026. About: keep human; one sentence on six-stage methodology for scanners.
```

### `/case-studies`, `/blog`, `/articles`

```text
Case studies: replace generic teaser with one real metric or quote only when verified. Blog: either (A) delete nav + add redirect to /articles with explanatory banner component, or (B) implement first 3 real posts from docs/articles slugs — no empty cards. Articles index: add optional filter chips by eyebrow category; featured slot for book + fragmentation story.
```

### `/assess`, `/assess/formation`, `/assessment-new`

```text
Create a single assessments hub intro on /assess explaining both tools + when to use; /assessment-new content folded in or linked as “preview” until merged. Terminology: use same stage names as /fragmentation.
```

### Legal

```text
No structural change unless product surfaces change; ensure footer legal links remain.
```

---

## Part 8 — Perfected navigation (DESIGN + architecture)

### Design constraints (from `docs/design/DESIGN.md`)

- **L4 domain chrome:** `SiteNav`, `SiteFooter`, `MobileNav` — token-first glass bar, Midnight only as **section bands**, not ad-hoc `dark:` marketing hacks.  
- **IA tooling:** `InPageToc` on long marketing pages (FAQ, How it works, System, Evidence) — anchors instead of bloating header menus.  
- **Accessibility:** `nav` landmarks, dropdown keyboard behavior (already Radix), visible focus rings.  
- **Stitch:** new visuals only from pinned project when needed.

### Architecture constraints (from repo)

- **Single config object:** `src/components/nav/nav-links.ts` drives desktop dropdowns, mobile accordion, and footer columns — **one IA, three consumers**.  
- **Hard cap:** `SITE_HEADER_NAV_MAX = 4` — desktop `SiteNavDesktop` slices `siteNavSections` to four groups. Footer may expose **more links** than any single dropdown by using the same full `siteNavSections` array (already does).  
- **Active state:** `isNavActive` uses prefix match for nested routes (e.g. `/book/read/...` active under Book).

### Recommended perfected IA (four header groups)

Proposed **titles and intent** (edit labels for tone; keep count at four):

1. **Story** — Fragmentation story (`/fragmentation`), Book (`/book`), Articles (`/articles`). *Rationale:* matches product thesis and elevates shipped longform.  
2. **Who it’s for** — Overview (`/who-its-for`), Movement leaders, Churches, Nonprofits (add **Institutions** when `playbook-institution` / inquiry copy is ready as a first-class audience page or anchor).  
3. **System & builds** — How it works, Platform **or** System (pick one primary link + secondary in footer), System builds hub, Discovery Lab, Content / Fundraising / Governance builds (footer can list all; header keeps hub + Discovery Lab + one build spotlight rotating by campaign).  
4. **Trust & next step** — Evidence, Case studies, Pricing, FAQ, Walkthrough, Assessments (single line → `/assess` hub), About, Manifesto, Vision, Apply, Inquiry, Contact.

**Header CTAs (unchanged intent, tune labels):**

- Primary: **Start a conversation** → `/contact`  
- Secondary: **Discovery Lab** → `/system-builds/discovery-lab`

**Footer:** mirror **full** `siteNavSections` after restructure; keep legal strip (`footerLegalLinks`). Ensure **Blog** is removed or redirected before continuing to list it.

**Mobile:** same sections as accordion (`mobile-nav.tsx`); verify first tap targets and scroll height with new Story group link count.

**Sitemap / SEO:** exclude `noindex` QA routes from sitemap generation if present; canonical URLs for merged pages.

### Implementation checklist (for the engineer/agent)

1. Edit `siteNavSections` in `nav-links.ts` to match Part 8 groupings; keep `SITE_HEADER_NAV_MAX` at 4.  
2. Update `siteSecondaryCtaLink` / `siteCtaLink` only if campaign priorities change.  
3. Grep for removed paths (`/blog`, intel routes) in `src/` and `content`.  
4. Run `pnpm lint` + `pnpm typecheck`; spot-check `SiteNavDesktop` overflow on `xl` breakpoints.  
5. Update `docs/build/audit/site-pages-inventory.md` row count and nav description.

---

## Part 9 — Related internal docs

- `docs/build/audit/site-pages-inventory.md` — route checklist  
- `docs/arguments/SITE-SSOT.md` — stack snapshot (sync nav section after IA change)  
- `docs/build/prompts/stitch-to-react-migration.md` — React migration authority  
- `docs/build/prompts/home-hero-scatter-integration-visual-plan.md` — home hero visual direction  
- `docs/build/prompts/fragmentation-new-six-stage-views.md` — fragmentation UI notes  

---

*End of document.*
