# Launch note — assessments, book, field guide, and accompanying launch plan

**Created:** 2026-04-19  
**Purpose:** One place that (1) **fully summarizes what already exists** in repo and docs for vision, business model, and these artifacts, and (2) **states what should exist** for a coherent public launch, including video, demos, and AI agents. When this file disagrees with the running site, **verify routes in `src/app/(site)/`** and **`src/components/nav/nav-links.ts`** in the same PR.

**Related SSOT:** [`docs/arguments/SITE-SSOT.md`](../../arguments/SITE-SSOT.md) (may lag the repo on individual routes), [`docs/build/prompts/strategy-artifacts-placement-and-flow.md`](../prompts/strategy-artifacts-placement-and-flow.md) (artifact placement and vocabulary locks).

---

## Part 1 — Vision and business model (what the org is building)

### Vision (from canon content and site copy)

Movemental addresses a **generational rupture** in how mission-driven organizations produce, distribute, and compound intellectual work: **fragmentation** (output that does not connect), **static content** (slots filled without formation), **signal collapse** (surface polish no longer proxies depth), **invisibility of expertise**, and the end of **isolated assets** as sufficient. Artificial intelligence **lowers production cost** but **does not lower coherence cost**; the core tension is framed as **integrity vs impact** — coherence between what you say, ship, and become, versus the temptation to accelerate without governance or formation.

The **path** is not a vendor roadmap but a **disciplined sequence** — the **AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions**. The order is the framework. That ordered path sits on a longer **six-stage arc** (fragmentation → movement vocabulary used consistently on marketing surfaces).

**Two intelligences** (informational vs relational) name why fixes that only address content systems or only address community graphs fail; the deepest formal treatment belongs in the book’s thesis arc, especially Chapter 2, with shorter summaries + links everywhere else.

### Business model (from offering docs and live services surfaces)

**Public methodology, private client work.** The primary packaged engagement described in internal offering docs is **Sandbox Season**: a **12-week**, **single-organization** facilitated season with a small cohort, producing a **validated use-case portfolio**, **governance one-pager**, **trained internal team**, and explicit **out-of-scope** boundaries (no tool procurement, no implementation engineering as core scope, etc.). Pricing is **published tier bands** and **fixed fee** to signal productized engagement vs open-ended consulting.

**Follow-ons** (named separately): quarterly portfolio refresh, Skills-stage engagement, Solutions-stage advisory — sold only when prior stages earn the next.

**Sales sequence** (documented in engagement design): research-and-brief → capability brief → exemplar review → tailored proposal — evidence of understanding before generic site conversion.

The **site’s job** at launch is therefore not only “explain AI” but **align** thesis (book + fragmentation + articles), **operating discipline** (AI Stewardship Sequence field guide), **diagnostics** (assessments), and **commercial next steps** (`/contact`, `/services`, `/pricing`, audience pages) without collapsing distinct instruments or distinct artifacts into one fuzzy CTA.

---

## Part 2 — Full inventory: what exists today (repo + wiring)

### Canonical routes and vocabulary (code)

- **`src/lib/canon-routes.ts`** defines:
  - **`BOOK_HUB_PATH`** → `/book` — living manuscript (*From Fragmentation to Movement*): two intelligences, fragmentation tax, six-stage map, integration thesis.
  - **`SSSS_FIELD_GUIDE_PATH`** → `/articles/ssss-field-guide-for-organizational-leaders` — **separate artifact**: the AI Stewardship Sequence (Safety, Sandbox, Skills, Solutions) as an operating sequence; links *to* the book for the longer arc.

This split is **intentional**; agents and editors must not use “field guide” to mean both without disambiguation.

### Navigation (code)

- **`src/components/nav/nav-links.ts`** — Story column includes **Book**, **AI Stewardship Sequence field guide**, **Articles**, archive; header flat nav includes Story surfaces, Book, Articles, **Services** (broad active prefix), **Organizations**, **About**; primary CTA **Start a conversation** → `/contact`.
- **`/assess`** appears in **Story** (footer + mobile accordion) and in the **primary header row** as **Assessments** (with active state for `/assessment-new`). FAQ and pricing also link the hub where relevant.

### Book — what exists

| Item | Status |
| ---- | ------ |
| **Book hub** | `/book` — landing, metadata, OG image route. |
| **Chapter reader** | `/book/read/[slug]` — reads from `docs/book-development/fragmentation-manuscript-ordered/` via `src/lib/book.ts` (`BOOK_SPINE`, server-only load). |
| **Endorse / contributors / moderate** | `/book/endorse`, `/book/contributors`, `/book/moderate` (moderation gated). |
| **UI components** | `src/components/book/*` — reader chrome, nav, cover variants (`book` vs `field-guide` art for homepage-style blocks). |

**Strategy role (existing doc lock):** `/book` owns **sustained thesis** and chapter order; it is one of the few places allowed to open the full argument from zero alongside `/fragmentation` and compressed `/`.

### AI Stewardship Sequence field guide — what exists

| Item | Status |
| ---- | ------ |
| **Article** | Filesystem article under `docs/articles/` with slug `ssss-field-guide-for-organizational-leaders`, mounted at **`SSSS_FIELD_GUIDE_PATH`** (see `src/lib/articles.ts` labels). |
| **Cross-links** | Wired from book-adjacent sections, fragmentation outro, system/team pages, `canon-routes` consumers — pattern: field guide ↔ book **once** where orientation is needed. |

**Strategy role:** Owns **operating discipline** for adopting AI under constraint; does **not** replace the book’s fragmentation→movement arc.

### Movemental Field Guide PDFs (Volumes One & Two) — what exists

Designed printable lead magnets — **separate artifact** from the SSSS article above. Reference copies and edition SHA-256 live in **`docs/build/artifacts/field-guides/`**; production downloads are byte-identical under **`public/downloads/`**.

| Volume | Title | Docs reference | Public URL | Landing |
| ------ | ----- | -------------- | ---------- | ------- |
| 1 | *It Starts With Safety* | `docs/build/artifacts/field-guides/movemental-it-starts-with-safety-field-guide.pdf` | `/downloads/movemental-it-starts-with-safety-field-guide.pdf` | `/field-guides/safety` |
| 2 | *It Continues With Exploration* | `docs/build/artifacts/field-guides/movemental-it-continues-with-exploration-field-guide.pdf` | `/downloads/movemental-it-continues-with-exploration-field-guide.pdf` | `/field-guides/sandbox` |

- **Lead capture:** `src/app/api/toolkit-download/route.ts` → `sendToolkitLeadEmail` (Resend) with PDF links from `src/lib/safety-field-guide.ts` / `src/lib/sandbox-field-guide.ts`.
- **Do not commit** `movemental-it-starts-with-safety-field-guide-web-export.pdf` (Playwright export from markdown; gitignored). Legacy download paths redirect in `next.config.ts` only — no duplicate PDF binaries.

### Assessments — what exists

| Route | Instrument | Implementation notes |
| ----- | ----------- | --------------------- |
| **`/assess`** | **Hub** | `AssessPageContent` — explains three entry points with **one vocabulary** (six stages); cards link to `/assessment-new`, in-page `#system-readiness`, `/assess/formation`. |
| **`/assessment-new`** | **Dual-intelligence infrastructure** | `DualIntelligenceDiagnostic` — ~30 questions, informational vs relational across arc; posts to **`/api/assess/dual-intelligence`** (see `dual-intelligence-diagnostic.tsx`). |
| **On `/assess`** (anchor) | **System readiness** | `SystemReadinessDiagnostic` — operational/structural map; posts to **`/api/assess/system-readiness`**. |
| **`/assess/formation`** | **Formation maturity** | Separate snapshot; links back to hub and dual-intelligence diagnostic. |

**Hard constraint (existing strategy doc):** Do **not** merge `/assess` system readiness with `/assessment-new` dual-intelligence in UI labels, scoring, payloads, or lead semantics without an **explicit product decision** recorded in-repo — different visitor moments and analytics.

**Simplified / admin-shaped API layers:** `src/app/api/simplified/assessment-*` and hooks under `src/hooks/simplified/` exist for share tokens, responses, questions, checkpoints — part of a broader assessment data story; marketing flows use the public `/api/assess/*` paths above.

### Other launch-adjacent surfaces that already exist

- **Narrative:** `/`, `/fragmentation`, `/about`, `/faq`, `/evidence` (if present in your branch), `/case-studies`, articles index and detail routes, **sandbox article hub** `/articles/sandbox`, **methodology** `/methodology` and **eight patterns** `/methodology/eight-patterns`.
- **Commercial:** `/services` (services hub content), **`/services/sandbox-season`**, **`/services/sandbox-season/exemplar`**, `/pricing`, `/resources/templates`, `/contact`.
- **Product story pages:** **`/platform`**, **`/system`** — live editorial pages (metadata present); not stubs in current tree.
- **Walkthrough:** **`src/app/(site)/_archived/walkthrough/`** — archived; if launch messaging promises a “guided tour,” either restore a route or stop promising it until un-archived.

### Documentation that already backs launch decisions

- **`docs/build/prompts/strategy-artifacts-placement-and-flow.md`** — journey table, book vs AI Stewardship Sequence field guide lock, assessment separation, AI demo posture, articles vs blog, proof types.
- **`docs/movemental-offering/03-sandbox-playbook.md`**, **`04-engagement-design.md`** — season shape, roles, deliverables, pricing tiers, sales sequence, decline criteria.
- **`docs/articles/the-movemental-thesis.md`** — single-argument thesis essay; aligns vocabulary with book and field guide.
- **Engagement exemplars** (e.g. `docs/engagements/youthfront/*`) — sales artifact patterns.

---

## Part 3 — What should exist for launch (recommendations)

This section is **normative**: minimum credible public story + optional accelerators. Adjust dates to your actual launch window.

### A. Must exist (or be explicitly de-scoped) before “platform launch”

1. **Artifact clarity on home and key landings**  
   Visitors should see **paired** paths: **thesis** → `/book`; **operating sequence** (the AI Stewardship Sequence) → `SSSS_FIELD_GUIDE_PATH`; **staged story** → `/fragmentation`. Home and fragmentation outro should not collapse both into one vague “field guide” link.

2. **Assessments discoverability**  
   Either add **`/assess`** to nav (footer and/or Story dropdown) as **“Assessments”** per strategy doc §5.3, **or** keep it off primary nav but ensure **FAQ**, **services**, and **pricing** point to the hub with one sentence each on **when** to use which instrument. Avoid orphaning the dual-intelligence flow only inside audience components.

3. **Lead handling truth**  
   For each assessment + contact + newsletter: confirm **CRM / inbox / consent copy** matches what the API actually does (double opt-in for newsletter where required, etc.). Launch trust dies on email mishandling.

4. **Walkthrough promise audit**  
   If any live copy still points to `/walkthrough`, either ship a page or redirect to `/platform` + `/fragmentation` with honest labeling until a real walkthrough returns.

5. **SSOT hygiene**  
   Reconcile [`SITE-SSOT.md`](../../arguments/SITE-SSOT.md) route table with **actual** `(site)` routes (e.g. platform/system/services vs archived notes) so agents and humans do not ship contradictory IA.

### B. Should exist soon after launch (first 30–60 days)

1. **Assessments hub polish**  
   Short video or annotated screenshot on `/assess` explaining **three entry points** in under 90 seconds — reduces misuse between operational and philosophical diagnostics.

2. **Case study or exemplar depth**  
   One **inspectable** narrative (even anonymized composite with honest scope) on `/case-studies` or linked from `/services/sandbox-season` — aligns with “proof of outcomes” in strategy doc.

3. **Article cadence**  
   2–3 articles that **self-locate** in the model (link fragmentation + relevant book chapter + evidence) for SEO/GEO and LLM citation — articles **prove**; book **teaches**.

### C. Video, demonstration, AI agents — create before launch or after?

Use the **existing posture lock** (strategy doc §6): Movemental AI is a **function of context, corpus, and governance**, not magic.

| Asset | Before launch? | Role |
| ----- | -------------- | ---- |
| **Short lo-fi explainers** (2–3 min) | **Yes, if cheap** | Book *why*, fragmentation *stages*, the AI Stewardship Sequence *in order* — three separate scripts; no fake product UI. |
| **Sandbox season explainer** | **Yes** | Translates `04-engagement-design.md` into human pacing; drives `/contact` with clear **out of scope**. |
| **Product UI capture / walkthrough** | **Only if truthful** | Prefer `/platform` + diagrams + captioned screenshots; label **demo vs production**. |
| **Public AI agent “try me”** | **Defer** unless guardrails, corpus boundary, and data posture are launch-grade | Risk: hero demo overclaims; better to point to **evidence** + **private pilot** language. |
| **Assessment result share pages** | **As needed** | If share tokens are user-facing, ship **privacy copy** and retention statement before promoting socially. |

**Rule of thumb:** Anything **hero-level** at launch should be **defensible in a board room**; keep speculative agent experiences in **sales conversations** or **passworded previews** until they match production boundaries.

### D. Suggested launch phases (practical sequence)

| Phase | Audience | Goal | Primary surfaces |
| ----- | -------- | ---- | ----------------- |
| **0 — Internal** | Team + close advisors | Lock vocabulary, assessment semantics, email flows | `strategy-artifacts-placement-and-flow.md`, `/assess` copy, env + API smoke tests |
| **1 — Soft** | Waitlist, partners | Thesis + field guide + one CTA | `/`, `/book`, AI Stewardship Sequence article, `/contact` |
| **2 — Public** | Buyers + movement leaders | Add proof + commercial clarity | `/fragmentation`, `/services/sandbox-season`, `/pricing`, `/faq`, assessments hub linked |
| **3 — Amplify** | Search + social + LLM discovery | Article drops, optional video, case material | `/articles`, `/faq` (and dedicated `/evidence` when it exists beyond redirect) |

---

## Part 4 — One-page decision summary

| Artifact | Exists? | Launch integration |
| -------- | ------- | ------------------- |
| **Book** (`/book` + reader) | Yes | **Thesis spine** — pair with the AI Stewardship Sequence field guide on home and fragmentation outro; keep Ch. 2 as canonical deep link for two intelligences. |
| **AI Stewardship Sequence field guide** (article URL) | Yes | **Operating spine** — link from services, methodology, book; never fold into `BOOK_SPINE` without editorial merge decision. |
| **System readiness** (`/assess` + `#system-readiness`) | Yes | **Commercial mid-funnel** — after problem belief; pair CTAs with `/contact` and system/services pages. |
| **Dual-intelligence** (`/assessment-new`) | Yes | **Philosophy-first diagnostic** — after `/fragmentation` or Ch. 2; do not merge with system readiness. |
| **Formation snapshot** (`/assess/formation`) | Yes | **Audience depth** — churches / institutions / formation-heavy paths. |
| **Video** | Optional pre-launch | Lo-fi thesis + season explainer first; avoid fake UI. |
| **Live AI agent demo** | Defer default | Until evidence + policy + corpus boundaries match headline. |

---

## Comms and API verification (implementation truth)

Verified against `src/app/api/**` (2026-04-19). Details also belong in [`docs/build/markdown/contact-newsletter-operations-playbook.md`](../markdown/contact-newsletter-operations-playbook.md).

| Surface | Endpoint / behavior | User-visible outcome |
| ------- | -------------------- | --------------------- |
| **Contact** | `POST /api/contact` — Zod `ContactSchema`; sliding-window rate limit **5 / hour / IP**; inserts `contact_submissions` | Internal notify via `notifyContactInbox`; submitter ack via `sendContactSubmitterAck` (Resend — requires env keys in playbook). |
| **Newsletter** | `POST /api/newsletter` — **double opt-in**; requires **`TENANT_ORG_ID`**; inserts `newsletter_subscribers` with confirm token; `sendNewsletterConfirmationEmail` | Confirmation email with link to confirm route; unsubscribe token path documented in codebase. |
| **Dual-intelligence** | `POST /api/assess/dual-intelligence` — requires **`TENANT_ORG_ID`**; persists `dual_intelligence_assessments` + optional `analytics_events` | JSON result only — **no** completion email in handler; copy on `/assessment-new` must not promise email unless added later. |
| **System readiness** | `POST /api/assess/system-readiness` — same tenant gate; persists `system_readiness_assessments` + optional analytics | JSON result only — **no** completion email in handler. |
| **Legacy assess** | `POST /api/assess` — older `AssessSchema` → `assessment_results` | Prefer not to mix with new diagnostics in marketing. |

**Smoke:** `pnpm check:env` and `scripts/smoke-comms-env.ts` (when Resend keys present) validate transactional paths per playbook.

---

## Launch readiness status (checklist)

| Item | Status |
| ---- | ------ |
| **`/assess` in nav** | Done — Story column + primary header row (`nav-links.ts`); `activeWhenPathMatches` includes `/assessment-new`. |
| **Assessments discoverability** | Done — fragmentation outro, services hub hairline links, pricing copy + link row, FAQ qualify copy, nonprofit assessment entry. |
| **Book / AI Stewardship Sequence / fragmentation CTAs** | Verified on home (existing `canon-routes`); book hero AI Stewardship Sequence line added; fragmentation outro unchanged for book + the sequence. |
| **Walkthrough / auditor SSOT** | Done — `cross-site-map.md` + `proof-burden.md` use `/platform` + `/system` + `/evidence` until `/walkthrough` is live; `SITE-SSOT.md` notes archived walkthrough. |
| **`SITE-SSOT.md` vs repo** | Done — §3 nav, §4 routes, §7 APIs, §8 crosswalk updated to 2026-04-19 repo + `next.config.ts` redirects. |
| **Comms truth documented** | Done — this section + playbook remains operational SSOT for env vars. |

---

## Post-launch backlog (tracked, non-blocking)

1. **Short video** on `/assess` (three entry points, under 90s).  
2. **One inspectable case** (or honest composite) on case studies when `/case-studies` is more than a redirect.  
3. **2–3 articles** with “where am I?” openings for SEO/GEO.  
4. **Lo-fi explainer scripts** (book, fragmentation, the AI Stewardship Sequence, Sandbox Season) — `docs/build/prompts/` or `docs/build/notes/`.  
5. **Public AI “try me”** — deferred until guardrails + corpus policy match headline claims.

---

## Maintenance

When routes or nav change, update this file **or** add a line here pointing to the PR that superseded it. Prefer updating [`strategy-artifacts-placement-and-flow.md`](../prompts/strategy-artifacts-placement-and-flow.md) for **rules**, and this file for **launch sequencing** and **existence inventory**.
