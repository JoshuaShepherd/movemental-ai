# Agent Prompts for Cursor Implementation

Use these prompts **one at a time** in Cursor Agent mode. Each assumes repository access, `pnpm` only, and adherence to [`docs/design/DESIGN.md`](../../design/DESIGN.md), [`docs/build/prompts/stitch-to-react-migration.md`](../prompts/stitch-to-react-migration.md), and [`CLAUDE.md`](../../../CLAUDE.md).

---

### Prompt 1 — React fragmentation page upgrade (parity + refactor)

**Context.** Production story lives under `src/components/sections/fragmentation-story/`. [`docs/build/audit/fragmentation-story-approaches-audit.md`](../audit/fragmentation-story-approaches-audit.md) §6 describes the gap: Approach A’s HTML mockup has **multiplication infrastructure overlay** (search/AI/translation/peer network) and caption reframes that React (`fragmentation-story-part-two.tsx`) has not fully ported. [`docs/build/fragmentation-react-migration-plan.md`](../fragmentation-react-migration-plan.md) requires **Movement** as a real final stage (not a stub), audience label convergence where applicable, and splitting the ~1,155-line `fragmentation-story-part-two.tsx`.

**Task.**

1. Port the **infrastructure multiplication** block and aligned caption copy from [`docs/build/fragmentation-unified-full-story-mockup.html`](../fragmentation-unified-full-story-mockup.html) into React—prefer a dedicated component (e.g. `fragmentation-story-stage-multiplication.tsx` + optional `MultiplicationInfrastructure`) consumed from a slimmer Part II shell.
2. Replace the **Movement** placeholder with a first-class stage: node-based **network of platforms** visualization, copy from `fragmentation-story-content.ts`, GSAP only where it matches existing patterns (desktop + reduced-motion fallbacks per current components).
3. **Refactor** `fragmentation-story-part-two.tsx` into stage-scoped files mirroring other `fragmentation-story-stage-*.tsx` pieces; keep props typed; no new `"use client"` at unnecessary levels.

**Constraints.** Semantic Tailwind tokens only; no raw hex; preserve URL contract (`audience`, `field`, `debug`); do not duplicate copy—extend [`src/components/sections/fragmentation-story/fragmentation-story-content.ts`](../../../src/components/sections/fragmentation-story/fragmentation-story-content.ts) for new strings; run `pnpm typecheck` and `pnpm lint` when done.

**Expected output.** PR-ready diff: ported infra UI, implemented Movement stage, smaller Part II orchestrator, updated content module, no regressions to scatter/acts; brief note in PR description listing touched files.

---

### Prompt 2 — Homepage alignment to stage model + fragmentation deep links

**Context.** Canonical stage spine: Fragmentation → Integration → Activation → Formation → Multiplication → Movement. Home composition is [`src/components/sections/home/home-page-content.tsx`](../../../src/components/sections/home/home-page-content.tsx). Full spec and locked copy anchors live in [`docs/build/prompts/home-page-fragmentation-funnel-narrative.md`](../prompts/home-page-fragmentation-funnel-narrative.md). `/fragmentation` is the **primary public interface** to the same model—home must **compress**, not clone, the long scroll.

**Task.**

1. Audit each `home-*.tsx` section against the prompt’s **13-section spine** (ids, variants, locked strings). Fix any drift in headings, CTAs, or stage order.
2. Ensure every stage block that maps to Part II of the story links to the correct **`/fragmentation` anchor or query** (e.g. movement hint → `#stage-movement` when present; system rail → `/fragmentation` with optional `?audience=` from context if already available).
3. Remove tonal dead zones: hero secondary CTA and closing CTAs must route to `/fragmentation` where the prompt specifies.

**Constraints.** Do not paste the full fragmentation scroll into home; keep client boundaries shallow; reuse primitives (`Section`, `Container`, etc.); no new marketing copy that contradicts locked strings in the prompt.

**Expected output.** Updated home sections + `home-data.ts` if needed for links; list of anchor URLs added; `pnpm typecheck` clean.

---

### Prompt 3 — Data model alignment (single stage vocabulary across surfaces)

**Context.** Today’s canonical **copy matrix** for the fragmentation route is [`src/components/sections/fragmentation-story/fragmentation-story-content.ts`](../../../src/components/sections/fragmentation-story/fragmentation-story-content.ts). Home uses [`src/components/sections/home/home-data.ts`](../../../src/components/sections/home/home-data.ts). Pricing, assessments, and articles will diverge unless they import or mirror the **same stage ids, labels, and ordering**.

**Task.**

1. Introduce a **small shared module** (e.g. `src/lib/stage-model.ts` or `src/content/stage-model.ts`) exporting: ordered `StageId` union, display labels, one-line definitions, and optional `fragmentationAnchorId` per stage—**no React** in this file.
2. Refactor `fragmentation-story-content.ts` and `home-data.ts` to consume that module for stage lists where feasible without breaking GSAP `id` attributes tied to the DOM.
3. Add a short **README-style comment block** at top of the shared module documenting that the stage model is canonical and `/fragmentation` is the primary public UI.

**Constraints.** Avoid circular imports; keep bundle impact minimal; do not change public URLs; preserve existing `searchParams` parsing behavior.

**Expected output.** Shared types + refactors; grep shows consistent stage ordering in home + fragmentation content; typecheck/lint pass.

---

### Prompt 4 — Movement stage implementation (network layer, audience-aware)

**Context.** **Movement** is a **future-facing strategic expansion layer**: interconnected platforms, field-level behavior, ecosystem value—not multiplication infra. Narrative spec in [`docs/build/fragmentation-react-migration-plan.md`](../fragmentation-react-migration-plan.md) §3–4. Audiences: movement leaders, nonprofits, churches, institutions (see content parsers in `fragmentation-story-content.ts`).

**Task.**

1. Implement **node–edge network** visualization for Movement: each node represents a **platform instance** (not a person dot); edges suggest interoperability / trust / shared canon—abstract enough to stay tenant-agnostic.
2. Wire **audience-aware** subtitles or microcopy via `fragmentation-story-content.ts` (extend matrix; avoid hardcoding tenant names in components).
3. Add **node scaling logic**: e.g. cap visible nodes, cluster remainder as “+N networks,” or level-of-detail by scroll segment—document chosen rules in a file-level comment.

**Constraints.** Respect `prefers-reduced-motion`; mobile fallback = static diagram + text; semantic tokens only; GSAP scoped to this section’s refs.

**Expected output.** New stage component + content keys; screenshot-friendly desktop layout; reduced-motion path documented in code comment.

---

### Prompt 5 — Assessment system (stage diagnostic + deep links)

**Context.** Assessments should output **stage readiness** aligned to the same six-stage model, with **informational vs relational** dimensions and **audience** context. Results should deep-link to [`/fragmentation`](../../../src/app/(site)/fragmentation/page.tsx) with `?audience=` / `field=` where helpful.

**Task.**

1. Design a **schema-first** assessment data model (Zod): questions tagged with `stage`, `intelligence: "informational" | "relational" | "both"`, optional `audienceWeight`; scoring produces stage scores + recommended next stage—not medical or psychological claims.
2. Implement UI flow: could be new route under `src/app/(site)/` or a section component—follow existing patterns (`Section`, forms with `react-hook-form` if already in repo).
3. Results page: printable summary + **“see this in the story”** buttons linking to `/fragmentation` with query params; anchor to stage sections when ids exist.

**Constraints.** No new env vars unless already standard; if persistence is out of scope, use client-side completion + URL state only—state that explicitly in comments; accessibility: keyboardable form, error text.

**Expected output.** Working MVP path: start → answer → results + deep links; types exported for future CRM/email handoff.

---

# Strategic impact of `/fragmentation` on Movemental’s go-to-market and delivery model

**Date:** 2026-04-15  
**Scope.** This document synthesizes internal build docs, the **six-stage model**, the shipped React route at [`src/app/(site)/fragmentation/page.tsx`](../../../src/app/(site)/fragmentation/page.tsx) as **that model’s primary public interface**, and the home-page funnel spec so we can align **system builds**, **pricing**, **assessments**, **core editorial**, **organizational acquisition**, and **visual metaphor** work around one operating logic.

**Meta-system thesis.** Movemental is a system that converts fragmented **informational** and **relational** intelligence into **integrated**, **activated**, **formational**, **multiplying**, and ultimately **networked** systems. The **stage model** (Fragmentation → Integration → Activation → Formation → Multiplication → Movement) is the **operating logic of the company**. The **`/fragmentation` route** is the **primary public interface** to that model—not a substitute for the model itself.

**Upstream references (read in this order for implementation detail).**

| Topic | Document |
| --- | --- |
| Three implementations compared (HTML mockups vs React) | [`docs/build/audit/fragmentation-story-approaches-audit.md`](../audit/fragmentation-story-approaches-audit.md) |
| Target six-stage model + migration backlog | [`docs/build/fragmentation-react-migration-plan.md`](../fragmentation-react-migration-plan.md) |
| Home funnel spine (compressed narrative, links to `/fragmentation`) | [`docs/build/prompts/home-page-fragmentation-funnel-narrative.md`](../prompts/home-page-fragmentation-funnel-narrative.md) |
| Intel-artifact vocabulary vs story | [`docs/build/audit/fragmentation-intel-artifacts-gap.md`](../audit/fragmentation-intel-artifacts-gap.md) |
| Evidence discipline for “fragmentation” claims | [`docs/build/research/articles/10-content-fragmentation.md`](../research/articles/10-content-fragmentation.md) |

---

## 1. What changed strategically (not just visually)

**Canonical system.** The **stage model** is the canonical spine. **`/fragmentation`** is the **primary public interface** to it—a typed, shareable, production narrative surface that **demonstrates** the model, not a separate “truth” from it.

That route ships:

- **A stable URL contract** — e.g. `/(site)/fragmentation?audience=nonprofit&field=relational` — so sales, content, and campaigns can deep-link to the same story with audience and informational/relational emphasis pre-selected.
- **A single pure-data module** for copy matrices (`fragmentation-story-content.ts`), which makes the interface maintainable as the **wording lab** for the six-stage arc before phrases propagate to pricing pages, assessments, and articles.
- **Explicit separation of concerns** — Server Components for shell/metadata, a thin client shell for dock state and GSAP, and motion that degrades on small viewports and under `prefers-reduced-motion`.

We can treat the **stage model** as a **product primitive** (like design tokens or the six-layer type chain) and treat **`/fragmentation`** as the **default public explainer** for that primitive—compress elsewhere (home), expand here.

**Relational intelligence (economic emphasis).** **Relational intelligence is often the highest-leverage economic layer**: donor and stakeholder mapping that increases funding likelihood; awareness of who actually holds decisions that unlocks partnerships; communication and memory across teams that improves retention and alignment. The model is **dual-intelligence** throughout: informational and relational are **co-equal in the framework**, and relational must be **weighted at least equally** in assessments, pricing narratives, and case proof—not treated as a cosmetic toggle.

**Open narrative debt (from audits).** The React interface still lags the latest HTML mockup on **multiplication infrastructure overlay** (search/AI/translation/peer network), **Movement** is largely a placeholder in the UI, **Part II** remains oversized for safe iteration, and **audience naming** may need to converge on *Institutions* (with seminaries as a subtype). Strategy should assume those gaps close on a predictable timeline so downstream artifacts do not fork.

---

## 2. System builds

**Implication.** Client-facing “builds” should be framed and scoped as **progress through the six-stage model**: Fragmentation → Integration → Activation → Formation → Multiplication → Movement. Internal delivery checklists, statements of work, and milestone reviews should use **the same stage names and order** as the operating logic to reduce cognitive load for buyers and for our own team.

**Multiplication vs Movement (delivery lens).** **Multiplication** is the **infrastructure layer** that enables **scaling and reproduction** (informational + relational infrastructure: commerce, subscriptions, SEO/GEO, translation, CRM, comms, identity, agents). **Movement** is the **emergent network of systems**—**actual interconnected platforms**, field-level behavior, ecosystem-level value—not “more infra sliders.” Engagements should never collapse “we will multiply you” into “we will put you on the movement map” without naming which **infra** and which **network** obligations are in scope.

**Movement as strategic layer (not only “stage 6”).** Movement is a **system-level and potentially product-level** direction: **cross-platform interoperability**, **shared identity/profile layers**, **shared intelligence systems** (canon, retrieval, permissions), **network effects as a capability**, and **ecosystem-level value creation** (trust, referrals, co-teaching, shared pathways). Narrative on `/fragmentation` is one expression; roadmaps, partnerships, and data architecture must carry the same meaning.

**Concrete alignment actions.**

1. **Scope statements** — Map each engagement phase to one **primary** stage (even when work spans two). Example: “Phase 1 — Integration + Activation readiness” reads clearer than a generic “discovery and setup.”
2. **Artifact vocabulary** — Prefer the **intel-artifacts** and scatter-tile language from the story and [`fragmentation-intel-artifacts-gap.md`](../audit/fragmentation-intel-artifacts-gap.md) so design, eng, and content describe the same objects (book, module, thread, hub, pathway stops, infra surfaces).
3. **Technical debt** — Finish migration-plan items (infrastructure multiplication in React, real Movement stage, split `fragmentation-story-part-two.tsx`) **before** we mirror the same visuals on methodology or product pages; otherwise we ship **two truths** (HTML mockup vs production).
4. **Home vs deep interface** — Home is the **compressed funnel**; `/fragmentation` is the **exhibit hall** for the model. System build docs should say explicitly which surface anchors which promise so we do not duplicate the full scroll experience on every page.

**Success metric.** A prospect could read a proposal appendix that lists stages **verbatim** from the **stage model** and recognize the same journey on the website—whether they land on home or `/fragmentation`—without terminology drift.

---

## 3. Pricing

**Implication.** Pricing should be legible as **which stages we help a buyer enter and how we charge for progression**, not only “which stages appear in a tier.” **Pricing as stage entry + stage progression** means packaging reflects **where the buyer is stuck** and **which transitions we operationalize next**—not a flat checklist of features.

**Economic nuance (stages monetize differently).**

- **Not all stages monetize equally** in buyer perception or margin.
- **Integration** is often **high effort, low perceived value** (“organizing files”)—price and narrative must **bundle it with visible wins** (searchability, governance, reduced duplication) or attach it to a larger arc so it is not sold alone as commodity labor.
- **Activation** and **Multiplication** are typically **easier to sell**—they look like software, infrastructure, and measurable surfaces (agents, CRM, SEO, subscriptions).
- **Formation** is **high value but slow**—often retainer, cohort design, or services-heavy; avoid promising speed where the constraint is human rhythm.
- **Movement** may require **new pricing models**: network fees, ecosystem partnerships, revenue share, multi-org agreements, or platform-to-platform commercial terms—not only seat expansion on one tenant.

**Multiplication vs Movement (pricing lens).** **Multiplication** pricing answers: “How does **this** system reproduce and compound through **infra**?” **Movement** pricing answers: “How do **multiple** systems interoperate and create **network-level** value?” Conflating them creates **discountable ‘platform’ bundles** that promise a field without funding interoperability work.

**Pricing narrative hooks (aligned to the model).**

| Stage | Pricing story (buyer language) |
| --- | --- |
| Integration | Canonical home for corpus + relationships; taxonomies; single source of truth |
| Activation | Tooling, search, agents, CRM/LMS surfaces — “usable,” not archived |
| Formation | Pathway design, cohort rhythm, community layer — where transformation is designed |
| Multiplication | Commerce, subscriptions, SEO/GEO, translation, peer channels — **scale the system** through **informational + relational infrastructure** |
| Movement | **Interconnected platforms**, shared identity/intelligence layers, ecosystem partnerships — typically custom, network, or enterprise commercial structures |

**Guardrails.**

- Avoid implying that **buying a tier “fixes fragmentation”** without integration work; the research article [`10-content-fragmentation.md`](../research/articles/10-content-fragmentation.md) stresses arguing the **fragmentation tax** as time-structure and measurement noise — pricing copy should stay in that defensible lane.
- **URL-deep links** from pricing FAQs to `?audience=` variants reduce bounce for nonprofits vs churches vs institutions.

**Success metric.** Pricing page sections (or modals) can each end with a single CTA line: **“See this stage in the full story”** → `/fragmentation` anchor, without rewriting the model.

---

## 4. Assessment(s)

**Implication.** Diagnostics should output a **stage score or readiness label** that maps to the **same six-stage model**. That turns an assessment from a PDF into an **on-ramp to the primary public interface** (`/fragmentation`: “here is where you are on the arc”).

**Assessment design principles.**

1. **Dual field** — Mirror the interface’s informational vs relational lens: questions and scoring dimensions should tag **which intelligence** is fragmented (or integrated). Weight **relational** dimensions heavily where economic leverage lives (donors, partnerships, retention).
2. **Audience-aware weighting** — Use the same audience segments as the dock (leaders, nonprofits, churches, institutions) so results pages can deep-link to the matching `?audience=` story.
3. **Outcome artifact** — Deliver a short **“you are strongest at X / weakest at Y”** summary where Y is always named with a **stage + artifact** example (e.g. “Activation: retrieval is not citation-ready”) to match visual literacy from the story.
4. **Honesty about Movement** — Until Movement is a first-class narrative **and** product posture is clear, assessments should not over-claim field-level network maturity; separate **multiplication infra gaps** (“you cannot reproduce or measure”) from **movement readiness** (“your platform is not yet meaningfully interoperable with peer orgs”).

**Success metric.** Assessment report PDF and `/fragmentation` feel like **one information architecture** — same vocabulary, same order, same metaphors.

---

## 5. Core content and articles

**Implication.** Long-form content should **cite `/fragmentation` as the primary public interface** for abstract claims about the model, and that interface should **pull evidence discipline** from research, not the other way around.

**Editorial strategy.**

- **Pillar article** — The research piece [`10-content-fragmentation.md`](../research/articles/10-content-fragmentation.md) should stay the **evidence anchor**; public articles should link to it or its raw companion where claims need footnotes.
- **Canonical phrases** — Stage headlines and hinge lines locked in [`home-page-fragmentation-funnel-narrative.md`](../prompts/home-page-fragmentation-funnel-narrative.md) and `fragmentation-story-content.ts` should be treated as **copy DNA**: blog posts and case studies either use them or deliberately contrast them (with editorial intent), never accidentally drift.
- **GEO/SEO** — Multiplication’s informational infrastructure (search, entity surfaces, translation) is both **product truth** and **content ops truth**; articles about discoverability should explicitly tie to that stage on `/fragmentation` once the React port matches the HTML overlay.

**Success metric.** New articles answer: **which stage does this advance for the reader**, and do we have a **`/fragmentation` deep-link** that makes the argument felt in one scroll?

---

## 6. Funnel for organizations

**Implication.** The **organizational funnel** is a **two-step story** at minimum: home compresses tension and stages; `/fragmentation` resolves it with emotion (scatter), cost ledger, and stage visuals. Campaign and outbound sequences should assume that split instead of dumping the full story in email.

**Looping behavior (non-linear).** `/fragmentation` is also a **reusable cognitive tool**: stakeholders **revisit** it across weeks, **switch audience**, **toggle informational vs relational**, and use it as a **shared reference** in internal meetings (“which chapter are we arguing about?”). Analytics and nurture design should assume **repeat sessions** and **param changes**, not a single linear “viewed once” funnel step.

**Funnel mechanics.**

| Funnel step | Primary surface | Role |
| --- | --- | --- |
| Awareness | Home hero + problem | Name fragmentation; credibility collapse |
| Education | `/fragmentation` | Earn attention; audience + field personalization; **repeatable reference** |
| Consideration | Methodology, services, pricing | Map stages to offers; **stage entry + progression** |
| Decision | Contact + assessment | Stage-labeled next steps |

**Organization-specific use.**

- **Nonprofits / churches / institutions** — Pre-set `audience` query in nurture tracks and conference one-pagers.
- **Entry points** — Home section `entry-points` (per home prompt) should route to audience-specific landers that **re-open the dock defaults** when those landers link back to `/fragmentation`.
- **Sales enablement** — One slide: scatter climax + one slide: multiplication infra — both exported from the **same** React page when possible so decks and product do not diverge.

**Success metric.** Organics and paid can each use **one UTM + audience param** and still land a coherent story without custom microsites; **return visits with toggled `field=`** still read as coherent.

---

## 7. Impact visualizations and metaphors (through-line vs finale)

**Implication.** We have a **tiered metaphor system** for the **same underlying model**:

| Metaphor | Where it lives | Strategic use |
| --- | --- | --- |
| **Scatter → ledger → flash** | Part I climax (`/fragmentation`) | Emotional proof of cost; best for campaigns and talks |
| **Sticky cross-fade acts** | Part I | Explains *how* coherence broke over time |
| **Hub + drawn lines** | Integration | “One graph” mental model |
| **IDE / query surface** | Activation | “Grounded, citable” AI story |
| **Pathway arc + five stops** | Formation | Aligns with formation product language |
| **Tenant constellation + infra cards** | Multiplication | **Infrastructure** scale (informational + relational)—not the movement field |
| **Node network of platforms** | Movement | **Interconnected systems**—interop, shared intelligence, ecosystem value |
| **Continuous transform (Approach B)** | [`fragmentation-unified-system-mockup.html`](../fragmentation-unified-system-mockup.html) | **Mechanism explainer** for shorter pages, talks, and embedded widgets — not a replacement for the emotional arc |

**Recommendations from audits (strategic, not only visual).**

1. **Port infrastructure multiplication to React** so every external metaphor deck matches production.
2. **Borrow Approach B’s “same objects rearrange”** inside the multiplication stage or on `/methodology` to satisfy buyers who experience the long story as “scene changes.”
3. **Movement** — When built, it is the **capstone metaphor for networked platforms**, not mixed into multiplication; **multiplication = infra that reproduces**; **movement = emergent multi-system network behavior**.
4. **Reduced motion** — All campaign cuts should have a **static storyboard** variant for accessibility-sensitive contexts (major donors, seminary procurement).

**Success metric.** Creative and product can choose **one of three depths** — icon strip (six labels), Approach B loop (mechanism), full `/fragmentation` (emotion + proof) — without inventing a fourth vocabulary.

---

## 8. Sequencing (recommended)

1. **Close production gaps** — Infrastructure overlay in React; audience label convergence; split Part II for maintainability (per audit §7); **Movement** elevated to match the strategic layer definition.
2. **Wire cross-links** — Pricing, methodology, and contact flows gain stage-aware anchors to `/fragmentation`.
3. **Ship assessment v1** — Stage + field + audience tagging only; no new metaphors until (1) is done.
4. **Refresh articles** — Point to the live interface; align claims with [`10-content-fragmentation.md`](../research/articles/10-content-fragmentation.md).
5. **Movement product/network posture + org funnel assets** — Clarify commercial and interoperability story so later assets do not require a full redraw.

---

## 9. Closing strategic thesis

**Operating logic.** The **stage model** is the **operating logic of the company**. **`/fragmentation`** is its **primary public interface**—not the system itself.

**Dual intelligence.** Movemental converts fragmented **informational** and **relational** intelligence into **integrated**, **activated**, **formational**, **multiplying**, and ultimately **networked** systems—treating **relational intelligence** as a **first-class, often highest-leverage** layer.

**Coherence rule.** System builds, pricing, assessments, articles, org acquisition, and visuals should **map to the stage model** (and link through `/fragmentation` where helpful) or **explicitly document why they diverge**—so buyers experience one coherent argument from first click to signed statement of work, **including on repeat visits and param toggles**.
