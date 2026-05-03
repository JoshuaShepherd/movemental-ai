# The four-week “onbuilding” phase — current repository understanding

## 1. Title and purpose

**Title:** The intended four-week onbuilding (content-building) phase for Movemental leaders and organizations — current-state synthesis from the Movemental repo

**What this note does:** It consolidates what the repository *actually says or implies* about a concentrated, time-bound period in which a leader (or, in org-facing language, a tenant) moves from commitment or kickoff into **substantive construction** of the informational and formation layer: corpus grounding, article architecture, pathways, course scaffolding, AI/voice configuration, and launch-readiness. The term **“onbuilding” does not appear anywhere in the repo** as a controlled vocabulary token; this note uses it as a **convenience label** for the phase the user asked about, and maps it to the terms the repo *does* use: **“four-week author residency,”** **“integration residency / build,”** **“initial build phase,”** and **“four-week system build” (content).**

**Not a spec:** This is a **current-state synthesis** for founders and product leads. It is **not** a final product spec, a promise to any customer, or a single canonical timeline. Where numbers conflict, they are reported.

---

## 2. Executive summary

- The repo’s **richest, most concrete** description of a **four-week leader-facing content program** is the published document **`docs/articles/07-author-onboarding-course-outline.md`**, titled *Author Onboarding Course: The Movemental Author Residency* — 21 working days, daily modules, weekly 90-minute cohort sessions, and a **cumulative deliverables table** through week 4.
- **“Onbuilding” is not a repo term**; closest equivalents are **“author residency”** (course outline + `docs/system-builds/charters/README.md`), **“integration residency / 4-week build”** (narrative prompts), and the book’s **“four-week residency for a movement leader”** (fragmentation manuscript).
- A **second four-week model** for **organizational / tenant content system builds** lives in **`docs/system-builds/charters/04-content.md`**: week-by-week **tenant provision, corpus ingestion, ontology, article wave, course + pathways** — aligned in prose with the **same book frame** as the author residency.
- **Operational “onboarding” docs** (`12-author-journey-map.md`, `27-post-commitment-onboarding.md`) also use **Weeks 1–4**, but with **different week themes** (first article → rhythm → audience → network) and **imply a 12-week** post-commitment program — **not** the same as the 21-day author residency day map.
- **Timeline drift is real:** the repo simultaneously references **2–4 weeks to platform launch**, **3–4 week leader onboarding to launch**, **4-week residencies / system builds**, **8-week tiered onboarding**, and **12-week** onboarding in messaging and ops docs. These are not reconciled in one place.
- **Book narrative** (`docs/book-development/fragmentation-manuscript-ordered/*.md`) is **high authority for the “why four weeks / what it ends with”** story: ingested corpus, **articles across themes**, at least one **transformational course**, **pathways per theme** — and optional **~60-day** framing (30 days prep + 4-week build).
- **Marketing / `(site)` product surfaces** in *this* repo are mostly **narrative and contact-routed**; the author residency **expects** a **reference tenant (alanhirsch.com)**, **AI Lab**, **ingest workflows**, and **multi-layer stack language** that reads as **implementation-adjacent** to a tenant app, not all of which is implemented in the marketing Next app.
- The **data model** in `src/lib/db/schema.ts` includes `onboarding_step`, `onboarding_completed`, **`sprint_pathway` (JSON)**, and **`onboarding_responses`**, but **this note did not find a user-facing “onbuilding wizard”** in `src/app/(site)/**` — suggesting **the story is ahead of or split across** product surfaces.
- **Cohort language** appears in the **author residency** (weekly live cohort sessions) and in **generic** formation and business docs; there is **no** single “cohort size / facilitator ratio” as a hard repo constant for Movemental-led residencies.
- The **sharpest conflict** to resolve in product: **Residency 07** promises a **full thematic article map + 12-section pathway + 8-week course scaffold** in **four weeks**; **journey map week 3–4** only demands **2–3 articles and editorial calendar** — different definitions of “done” for the same week numbers.

### What is most settled

- **Four weeks** is a **repeatable unit** for (a) **author / leader integration** in canon narrative and (b) **per-domain org system builds** in charters.
- **Exit shape** in strategic docs converges on: **corpus in**, **voice articulated**, **structured articles**, at least one **course**, **pathways** as connective layer, **AI grounded on corpus**, **human sign-off** on publish.

### What is implied but not explicit

- **Whether** every author goes through `07` as implemented vs. a **lighter** journey map track.
- **Where** the “AI Lab” and `pnpm ingest:articles` workflows run for a *given* customer (this repo vs. a tenant/studio app).

### What is still unclear

- **Single** canonical 4-week calendar (author residency vs. charter vs. post-commitment weeks 1–4).
- **“Onboarding” vs. “residency”** as SKUs, pricing, and **when** the clock starts (contract, kickoff, tenant provision).

---

## 3. What “onbuilding” appears to mean in the repo today

### Likely meaning

**Onbuilding** (in this note’s sense) = the **intensive content-and-structure build** that turns scattered intellectual work into a **legible, linked formation layer** on the platform: **not** merely logging in, **not** a multi-year “digital strategy,” but a **bounded residency** in which the leader and Movemental (or a facilitator) produce **inspectable artifacts** (inventory, pillars/clusters, pathway, course scaffold, voice/corpus alignment).

### Distinction from general onboarding

- **“Onboarding”** in `27-post-commitment-onboarding.md` and the **onboarding guide** = **Slack, dashboard, curriculum videos, first calls, 12-week** rhythm — *broader* and *longer* than the **21-day** module design in `07`.
- The **3–4 week** `movemental_leader_onboarding_process.md` = **inquiry → launch** (often **platform**-centric), not the same as **07**’s **formation architecture** residency.

### Distinction from longer-term platform usage

- `12-author-journey-map.md` **Phase 3+** = months of publishing, monetization, scale — “running on the foundation.”
- The **book** and **charters** are explicit: after the **four weeks**, the org or leader is **on the system**; maturation is **ongoing** (`04-content.md` months 2–5, etc.).

### Where it begins and ends (per strongest sources)

| Boundary | Stated in repo as |
| -------- | ----------------- |
| **Start** | **Day 1 of author residency** (`07` — after prerequisites) **or** **day 31–60 “initial build phase”** after prep (`09-why-integration-stalls.md`) **or** **Week 1 vision & voice** (`12`, `27`) **or** **week 1 tenant provision** (`04-content` charter) |
| **End** | **“Graduation”** criteria in `07` (7 bullets) **or** **exit artifact** in `04-content` (live tenant, voice guide, corpus, published articles, one course, pathways) **or** end of **Week 4** in `12` / `27` (audience + 3+ articles) |

**Inference:** The repo **does not** draw one clean line “onboarding ends, onbuilding begins.” **07** fuses product education and **all major structure** into **one** four-week residency.

---

## 4. The likely sequence of the four-week onbuilding course

Two **parallel** “four-week” models exist. Below, **A** = author residency (most detailed) and **B** = org content system build charter. **C** = operational onboarding (weeks 1–4 from journey/post-commitment).

### Model A — Movemental Author Residency (`07-author-onboarding-course-outline.md`)

| Week | Probable focus | Leader work (stated) | Movemental / system work (stated) | Outputs / artifacts | Confidence |
| ---- | -------------- | -------------------- | ----------------------------------- | -------------------- | ---------- |
| **1** | Vision, voice, pathways-as-doorways, monetization | Daily readings/exercises; watermark line; 3–5 candidate pathways; voice memo; 1-page monetization map; cohort presents | Cohort **session 90 min** (peer feedback) | Body-of-work paragraph, watermark, pathway candidates, voice memo, monetization map | **High** (fully specified) |
| **2** | **Pillar–cluster** article strategy + publish pillar + cluster | Full **thematic article inventory**; first pillar + cluster **drafts to publish**; 90 min cohort peer review | Peer review **structure** in doc | Pillar (3.5–4.5k), cluster (2.2–3.2k), execution slice for primary pathway | **High** |
| **3** | **8-week course** scaffold, AI prompts, Week 2 module | 8-week outline, Week 2 **full** module draft, dissonance prompts for weeks 2–4, optional assessment | Cohort **feedback** on outline | Course thesis, outline, one full module, AI dissonance prompts, assessment concept | **High** |
| **4** | **12-section primary pathway**, ecosystem map, **staging** publish, launch brief | Pathway sections 1–12, visual ecosystem map, publish pillar+cluster to **staging**, 1-page launch brief | **Commissioning** cohort session | Complete pathway, map, launch brief, **updated** inventory | **High** |

**Stated vs inferred:** Week themes and day-by-day tasks are **stated in `07`**. That **“Movemental team”** beyond cohort facilitation is **inferred** from general onboarding docs; **07** emphasizes **self-paced + cohort** more than 1:1 account management.

### Model B — Content system build (`docs/system-builds/charters/04-content.md`)

| Week | Stated focus | Stated exit emphasis |
| ---- | -------------- | -------------------- |
| **1** | Tenant provision, voice markers, **corpus inventory**, governance registry entries for AI use cases | Foundation + inventory |
| **2** | Core **ingest**, **ontology** (themes, pillars, pathways…), RAG drafting live, **voice guard** in audit | Intelligence graph + safe drafting |
| **3** | **First article wave** across themes; paratext/images; at least one **8-week course scaffolded** | Content layer + course skeleton |
| **4** | **One course live**; **pathways page per theme**; first articles **published, audited, author-signed** | **Production** (not just drafts) |

**Stated** in charter. This model is **more platform/ops** and **“live”** than `07`’s explicit **staging** publish in week 4 day 20.

**Confidence: High** for weekly themes; **Medium** for how often real engagements hit every line (charters say *mature end state* / *roadmap* language).

### Model C — `12-author-journey-map` / `27` Weeks 1–4 (onboarding, not the full `07` residency map)

| Week in doc | Stated focus | Stated deliverables (differs from `07`) |
| ------------ | -------------- | ---------------------------------------- |
| **1** | Vision & voice, platform tour, first **draft** | First article **draft** assigned |
| **2** | **First publication** | First article **live** |
| **3** | **Repurposing** rhythm, editorial **8 weeks** | 2–3 articles, calendar |
| **4** | **Audience** building, **network** | Migration, 3+ articles, connections |

**Confidence: High** that this doc family is **internal ops truth for “first 90 days style”** — **Low** that it is the same program as `07` without **explicit** cross-link (none found).

### Overall inference for “the” four weeks

If the user’s **“onbuilding”** means **author-side architecture** (map, pathways, course), **Model A (`07`)** is the best **day-level** source. If they mean **tenant + governance + RAG** for an **organization**, **Model B** is the best **charter** source. **Model C** covers **publishing confidence** in parallel.

---

## 5. Expected artifacts produced during onbuilding

| Artifact | Evidence | Role in narrative | Confidence |
| -------- | -------- | ----------------- | ---------- |
| **Ingested corpus (books, talks, transcripts, video)** | `04-content` weeks 1–2; book chapters on corpus + LLM; charter README | **Grounding** for RAG; tenant isolation | **High** in charters/book; **Medium** per-tenant in this app |
| **Voice / style documentation + “voice guard”** | `04-content`; `27` week 1 (AI voice capture) | **Audit** before publish | **High** |
| **Thematic / pillar–cluster article inventory (full map)** | `07` Day 6, cumulative table | **SEO/GEO** surface, strategic completeness | **High** (author residency) |
| **Pillar + cluster article(s) — published** | `07` (2+ pieces); `04-content` end state “first wave” | **Discovery** layer | **High** (author); charter adds **across all themes** |
| **8-week transformational course — outline + at least one full week drafted**; charter says **one course live** by week 4 | `07` week 3–4; `04-content` week 3–4; book | **Formation** product | **High** (outline+draft in `07`); **“live”** in charter vs **staging** in `07` = **tension** |
| **12-section primary pathway** | `07` week 4 | **Integration** of articles, course, assessment | **High** |
| **Ecosystem map + 90-day roadmap** | `07` Days 19–21 | **Launch** sequencing | **High** |
| **Assessments as entry points (concept)** | `07` Day 15 | **Funnel** design | **Medium** (optional) |
| **AI / “AI Lab” configuration** (dissonance prompts, etc.) | `07` week 3 | **Conversational** course layer | **High** in doc; **product surface TBD** in this repo’s `(site)` |
| **Monetization map (pricing layers)** | `07` week 1 | **Business** alignment | **High** (author doc) |
| **Governance registry for AI use cases** | `04-content` week 1 | **Org** safety | **High** in charter, **not** in `07` (leader-focused) |
| **Portal / site on Movemental spine** | Charters, book; `siteNav` in SITE-SSOT | **Host** for pathways, courses, articles | **Stated** strategically; **implementation** multi-repo |

---

## 6. Workflow model implied by the repo

**Stated end-to-end shape** (synthesized from `07`, `04-content`, book, formation articles):

1. **Preparation (optional 30 days)** — “minting” schema, scoping what enters residency (`09-why-integration-stalls.md`).
2. **Corpus inventory & intake** — locate assets; **ingest** to chunk/embed pipeline (`04-content`; skills references in charter).
3. **Voice capture** — markers, calibration memos, anti-patterns (`07` week 1; `27` week 1).
4. **Ontology / themes / pillars** — name what is canonical; article inventory (`04-content` week 2; `07` day 6).
5. **Pillar–cluster writing** with **nine-section** evergreen architecture (`07` week 2).
6. **Course: 8-week scaffold** + formation loop + AI conversation layers (`07` week 3; `lms_content.md` references cohort **cadence** in another doc).
7. **Pathways: 12 sections** as integration hub (`07` week 4; charter “pathways page per theme”).
8. **AI assistance** — drafting with **RAG over corpus**; **humans** edit and sign (`04-content` constraints; `07` voice checks).
9. **Review / audit** — voice guard, paratext, not auto-publish (`04-content` §6).
10. **Publish / launch prep** — staging → production, ecosystem map, calendar (`07`); charter emphasizes **signed** and **live** by end of build.

**How product is supposed to work (from docs, not all verified in `(site)`):**  
**Supabase + Drizzle schema → Zod → services → API → hooks → UI** (explicit in `07` day 20); **markdown ingest** to DB for articles; **pathways and courses** as structured content; **AI Lab** for conversational layer; **PostHog / analytics** in charter for formation metrics. **This marketing repo** implements **assessments** and **content marketing**; **full LMS + tenant CMS** is described as shared spine / reference implementation, not fully enumerated here in `src/app/(site)`.

---

## 7. Human roles implied by the current system

| Role | Appears to do | Sync vs async; manual vs product |
| ---- | -------------- | --------------------------------- |
| **Movement leader (author)** | Write, decide canonical positions, sign content, own voice, participate in **cohort** | **Stated** weekly 90 min + daily async (`07`); **manual** creative work; **product** for draft/publish when available |
| **“Residency facilitator” / onboarding coordinator** (named in book **07-minting**; in ops docs “onboarding coordinator”) | Telescopes decisions; runs calls (`27`, book) | **Stated** human-led calls in `27`; **inferred** for `07` as cohort host |
| **Peers in cohort** | **Peer review** of pillar article; feedback in sessions (`07`) | **Synchronous** sessions |
| **Movemental platform/team** | Deploy tenant, **AI voice capture**, SEO, **network intros**, `27` “Movemental team” post-call tasks | **Mix** — some **automated** (announcements, indexing **described** in `27`) |
| **AI / agents** | **Drafting**, dissonance chats, RAG; **not** autonomously publish (`04-content`) | **Async**; **guardrailed** |
| **Product surfaces** | Dashboard, curriculum, “AI Lab,” editors, staging | `07` assumes **strong** product; **this** repo = partial **(site)** + **APIs** for assessments (see below) |

---

## 8. Product surfaces and UI that appear relevant

**Within this monorepo’s marketing / app code:**

- **Public site** (`src/app/(site)/**`) per **`docs/arguments/SITE-SSOT.md`**: home, **fragmentation**, **platform / system**, **/articles** (MD from `docs/articles/`), **/assess** + **`SystemReadinessDiagnostic`**, **/assessment-new**, **/book**, **/contact**. **No** dedicated `/(site)/onboarding` or `/(site)/residency` route in SSOT.
- **System readiness** logic: `src/lib/system-readiness/*`, UI copy `system-readiness-copy.ts`, **routes** to **/contact** and audience hubs for **“content system build”** and **foundation** (`compute.ts`) — **lead routing**, not a build workspace.
- **Assessment forms** and pathway-related **copy** in `assessment-form.tsx` (self-assessment of pathway design, etc.) — **diagnostic**, not the residency workspace.
- **DB schema** (`src/lib/db/schema.ts`): `organizations` with **`onboarding_step`**, **`onboarding_completed`**, **`sprint_pathway` (JSON)**, `pathways` / `pathway_sections` tables, **`onboarding_responses`**, and extensive **course-*** table names in API route filenames — **implies** a **larger** product (Studo/course) exists in **API surface** for simplified services.
- **Simplified API** routes: `src/app/api/simplified/course-*.ts`, `onboarding-responses` — **suggests** a **course + onboarding** backend; **not** all wired to public marketing pages.

**Docs / static previews (not the live app router):**

- **`docs/system-builds/author-onboarding-course-preview/`** (HTML/JS) — **local preview** of the author course; scripts reference `pnpm dlx serve` for static preview.
- **Course tab links** between other **system-build** HTML previews in `docs/system-builds/`.

**Inference:** The **residency** is **documented** as a first-class **author onboarding course** (`07`) with **preview** artifacts; the **“live” tenant editor** is **implied** (alanhirsch reference, ingest commands) and may live in a **sibling** codebase or unmerged routes not listed in SITE-SSOT.

---

## 9. Source-of-truth analysis

| Layer | What it’s good for | Drift / caveat |
| ----- | ------------------ | -------------- |
| **`07-author-onboarding-course-outline.md`** | **Day/artifact granularity** for leader four-week onbuilding | References `_docs/publishable`, `alanhirsch.com`, `pnpm ingest` — some paths are **stale** next to this repo; **treat as conceptual** + verify paths in PRs |
| **`docs/system-builds/charters/04-content.md` + README** | **Org-tenant** builds, **exit artifacts**, **don’ts** (no auto-publish) | Aspirational maturity + **tension** on “course live by week 4” vs `07` staging |
| **Book (`fragmentation-manuscript-ordered`)** | **Why 4 weeks**, **60-day** frame, **integration** stage, **Maggie** persona | **Narrative** authority; not an ops checklist |
| **`12-author-journey` + `27` post-commitment** | **Support cadence**, first articles, 12-week structure | **Different** weekly breakdown than `07` |
| **`movemental_leader_onboarding_process.md`** | 3–4 week **inquiry to launch** | Conflates **phases** with `07`’s *content* residency if read quickly |
| **`docs/arguments/SITE-SSOT` + `nav-links`** | **What ships on movemental.com** | **No** “residency” as public route |
| **`messaging-08` / `messaging-04`** | **Claims** for 12-week onboarding and 2–4 week launch | **Contradict** each other on duration — **intentional** in marketing vs reality not resolved in repo |
| **Alan Hirsch flagship spec** | **Weeks 1–4 “foundation”** = infra checklist | **Different** meaning than **content** charter weeks |

**Clarity vs drift:** **Clearest** on *what* should exist after integration (corpus, pathways, course, human-signed articles). **Driftest** on *how long* onboarding takes and *which* week model is in production for paying authors.

---

## 10. Contradictions, ambiguities, and missing pieces

1. **No “onbuilding” or “onbuild” string** in repo — **naming** is unsynchronized (`residency`, `integration build`, `Phase 2 weeks 1–4`, `system build`).
2. **Three different Week 1–4 definitions** (`07` vs `12`/`27` vs `04-content`) — same **week count**, different **outcomes** (e.g. first article **draft** vs. **full article inventory**).
3. **12 weeks** (post-commitment) vs **4 weeks** (residency) — **is** the residency a **slice** of the 12, or a **separate** offering? **Unstated.**
4. **Tiered onboarding: 8 vs 12 weeks** (`12-author-journey`) vs **4-week** residency — **incompatible** without a **product decision**.
5. **2–4 weeks to “launch”** in business copy vs **4-week residency** that also assumes **prerequisites** and **21 working days** of work — “launch” **means different things** (public site up vs. architecture complete).
6. **`07` week 4** uses **staging** publish; **`04-content` week 4** says **“first articles published”** and **course live** as exit — **production bar** not unified.
7. **Charter `04` week 3** says “first wave… across every theme” + **course scaffolded**; **week 4** = course **live** + pathways **per theme**. **`07`** has **one** **primary** pathway and **8-week** **course** scaffold — **scale of themes** differs.
8. **Cohort**: `07` assumes **cohort** sessions; `27` is **1:1 + coordinator** heavy — **cohort vs individual** not reconciled.
9. **60-day** prep+build in book (`09`) — rarely referenced in product docs; **is prep universal?** **Unclear.**
10. **M100, Scholar tier, alanhirsch** — **business** vocabulary in `07` may be **out of date** vs public pricing pages; **not verified** here.
11. **Implementation gap:** **Schema/API** hints at courses + onboarding; **no** end-user residency UI described in `SITE-SSOT`.
12. **`the_five_steps.md` Phase 1A (weeks 1–4)** = Alan’s **MVP** platform (articles, basic media). **`07` weeks 1–4** = **pathway + course + full article inventory** — different **product scope** for the same “four weeks to foundation” slot unless explicitly sequenced.
13. **LMS / learner cadence** (e.g. 8- or 14-week **formation** courses in `lms_content.md`) is easy to conflate with the **four-week author residency** that *designs* an 8-week *learner* course. **Residency** ≠ **seat time** for a cohort taking the product.
14. **Youthfront** and other **org system builds** label **four weeks** for **governance, SSoT, Discovery Lab** end-to-end; deliverables are **not** the same as **author residency** `07` unless a proposal bundles both.
15. **Charter README** references `../../../src/lib/system-builds/hub-cards.ts` for **pricing** — that path is **not present** in a repo-wide file search; **treat** pricing SKUs for builds as **site + trello** notes, not this path.

---

## 11. Recommendations for refinement

### Naming

- Pick **one** external name for the leader four-week (e.g. **“author residency”** is already in `charters` + `07` title) and **retire** ad hoc “integration / onbuilding” unless you define it.
- In `12`/`27`, add a **cross-link**: “**Optional / alternate: see Author Residency (`/articles/07-…`)**” or “**simplified** onboarding track” to reduce **false merge** of week numbers.

### Sequencing

- **Declare** whether **`07` is the superset** and `27` is **simplified** for non-architect authors, or whether **`27` is canonical** and `07` is **aspirational** — and **date** the decision in `SITE-SSOT` or a single `docs/build/notes/` SSOT.
- Reconcile **staging** vs **production** exit: either **align** `07` day 20 to “production after audit” or **state** that residency ends at **ready for review**.

### Deliverables

- Add a **one-page** “**MVP vs. stretch**” row for: **# themes with pathways**, **# articles live by week 4**, **course live vs. scaffolded**.

### Product flow

- If **`sprint_pathway` JSON** is real, **document** its schema and **where** leaders edit it (or **remove** if unused).
- **Surface** whether **AI Lab** and **ingest** live in **this** repo or a **Studio** sub-app — link **README** from `CLAUDE.md`.

### Documentation

- Fix broken internal references in `07` (paths like `_docs/publishable` where applicable).
- In **`charters` README**, add **explicit** pointer to `docs/articles/07-…` as the **complementary author-facing lesson plan**.

### Messaging

- In **custom-gpt** bundles, add a **glossary** note: “**12-week onboarding = operations support; 4-week residency = architecture sprint**” or the **true** model — to stop **answer contradictions** in `messaging-04` and `messaging-08`.

---

## 12. Exact source list

**Convention:** *Primary* = direct description of 4-week leader/org content build. *Secondary* = adjacent timeline, ops, or pricing. *Peripheral* = useful context, not defining the four weeks.

### docs/

| Path | Why it matters | Tier |
| ---- | -------------- | ---- |
| `docs/articles/07-author-onboarding-course-outline.md` | **Day-by-day 4-week author residency**, deliverables, cohort structure | **Primary** |
| `docs/system-builds/charters/README.md` | Defines **four-week system builds**; **“four-week author residency”** summary. (*References `src/lib/system-builds/hub-cards.ts` for pricing — that file was **not** found in the repo; treat pricing as live site + sales notes.*) | **Primary** |
| `docs/system-builds/charters/04-content.md` | **Week 1–4** org/tenant **content** build, exit artifacts, constraints | **Primary** |
| `docs/book-development/fragmentation-manuscript-ordered/03-fragmentation-is-structural.md` | **Four-week residency** outcomes at integration | **Primary** (narrative) |
| `docs/book-development/fragmentation-manuscript-ordered/05-the-six-stages-at-a-glance.md` | Integration = **4-week** build; outputs list | **Primary** (narrative) |
| `docs/book-development/fragmentation-manuscript-ordered/07-minting-the-schema.md` | **Maggie** 4-week residency; facilitator + schema minting | **Primary** (narrative) |
| `docs/book-development/fragmentation-manuscript-ordered/08-carry-forward.md` | **Horizon** for 4-week residency (leader vs. org domains) | **Primary** (narrative) |
| `docs/book-development/fragmentation-manuscript-ordered/09-why-integration-stalls.md` | **60-day** model: prep + 4-week build; scoping | **Primary** (narrative) |
| `docs/book-development/fragmentation-manuscript-ordered/02-two-intelligences.md` | Example of **4-week** church content build | **Secondary** |
| `docs/business-docs/core-docs/12-author-journey-map.md` | **Phase 2: Weeks 1–4** onboarding; tiered **8/12** week; **conflicts** with `07` | **Secondary** |
| `docs/business-docs/core-docs/27-post-commitment-onboarding.md` | **12-week** program; week 1–4 **detail** (calls, deliverables) | **Secondary** |
| `docs/business-docs/05_leadership_ops/leader_management/onboarding/movemental_leader_onboarding_process.md` | **3–4 week** process **inquiry → launch**; phases 1–4 | **Secondary** |
| `docs/business-docs/06_creator_education/curriculum/creator_curriculum_and_onboarding.md` | **Curriculum modules**, dashboard philosophy, time investment | **Secondary** |
| `docs/business-docs/04_thought_leadership/core_narrative/the_five_steps.md` | **Weeks 1–4** = core publishing in Alan’s platform build (internal **product** roadmap) | **Peripheral** |
| `docs/business-docs/02_product_platform/architecture/alan_hirsch_flagship_platform_spec.md` | **Phase 1 weeks 1–4** = infra checklist; **not** the author residency | **Peripheral** |
| `docs/business-docs/core-docs/13-onboarding-guide.md` / `docs/business-docs/documentation-index/13-onboarding-guide.md` (if duplicate) | Pre–first call automation vs human | **Secondary** |
| `docs/arguments/SITE-SSOT.md` | **Routes, components, API**; **assessment** vs **residency** | **Primary** (implementation scope for *this* app) |
| `docs/build/prompts/audience-pages-narrative-audit.md` | **4-week integration residency / build** language in prompts | **Secondary** |
| `docs/articles/case-study-youthfront.md` | **4-week org** engagement (nonprofit SSoT; **not** same as author residency) | **Peripheral** |
| `docs/content/trello-cards/pricingmodel-page.md` | **“Four-week builds”** mention | **Peripheral** |
| `docs/articles/formation-workflow.md` | Pathways, cohort, formation — conceptual | **Peripheral** |
| `docs/arguments/custom-gpt/messaging-04-strategy.md` | 12-step onboarding **claims** | **Secondary** (messaging) |
| `docs/arguments/custom-gpt/messaging-08-by-page.md` | 12-week onboarding, 2–4 week deploy **claims** | **Secondary** (messaging) |
| `docs/build/notes/movemental-master-talking-points-index.md` | **Authority** hierarchy (SSOT, live app) | **Peripheral** |
| `docs/articles/_inventory.md` | Lists `07-author-onboarding-course-outline` in inventory | **Peripheral** |
| `docs/reader/assets/manifest.js` | **Reader** pack metadata for author onboarding article | **Peripheral** |
| `docs/system-builds/author-onboarding-course-preview/` (`index.html`, `course-lessons-0*.js`, `app.js`) | **Local static preview** of the 4-week author course (served with `serve`; hash nav `#w1d3`) | **Peripheral** (companion to `07`) |
| `docs/system-builds/ai-*-course-preview/index.html` | Cross-links **“Author residency”** tab to author preview | **Peripheral** |
| `docs/articles/01-content-strategy-for-movement-leaders.md` … `06-the-christocentric-spine.md` | **Prereqs** cited inside `07` (pillar–cluster, pathways, course scaffold) | **Secondary** (residency dependencies) |
| `docs/business-docs/02_product_platform/capabilities/lms_content.md` | **14-week** core LMS phase with weekly cohorts — **learner** product, distinct from 4-week **author** residency | **Peripheral** |
| `scripts/validate-article-frontmatter.ts` | Lists `07-author-onboarding-course-outline` in allowed slugs | **Peripheral** (build/validation) |

### Frontend app / src/ (and root config)

| Path | Why it matters | Tier |
| ---- | -------------- | ---- |
| `src/lib/db/schema.ts` | `onboarding_step`, `sprint_pathway`, `pathways`, `onboarding_responses` | **Primary** (data model hints) |
| `src/lib/system-readiness/compute.ts` + `types.ts` + `questions.ts` | **Routing** readers to “content system,” foundation, etc. | **Secondary** |
| `src/components/sections/services/services-data.tsx` | **“Four-week installs”** for pathways/libraries (services copy) | **Secondary** (marketing) |
| `src/components/assessment/*` (e.g. `system-readiness`) | System readiness **diagnostic**; not residency workspace | **Peripheral** |
| `src/app/api/simplified/course-*.ts`, `onboarding-responses/route.ts` | **API** surface for courses and onboarding | **Peripheral** (incomplete without Studio UI) |
| `src/lib/articles.ts` | **Mounts** `07-author-onboarding-course-outline` in article list | **Primary** (proves public article slug) |
| `next.config.ts` | Redirects (`/system-builds` → `/contact`, etc.) | **Peripheral** |
| `docs/arguments/SITE-SSOT.md` | Already under docs but **defines** `src` mapping | **Primary** |

### Notes or research (including cross-repo)

| Path | Why it matters | Tier |
| ---- | -------------- | ---- |
| `docs/notes/mvmtl-cross-repo-documentation-index-2026-04-11.md` | Flags **pricing** / **four-week** doc contradictions | **Peripheral** |

---

## 13. Appendix: evidence excerpts or code references

**Author residency title and outcome (published article):**  
> “**Duration:** 4 weeks (21 working days) … **Outcome:** Each author finishes Week 4 with a **complete strategic map** … **flagship** … **full eight-week course scaffold** … **complete twelve-section primary pathway** …”  
— `docs/articles/07-author-onboarding-course-outline.md` (lines 5–9 in repo read)

**System-build charter exit (org / tenant):**  
> “**Week 4.** One transformational course **live** … A **pathways page for each theme** … **Exit artifact:** live tenant, voice guide v1, **ingested corpus**, **new articles published** across every theme, **one** transformational course live, and **a pathways page per theme**.”  
— `docs/system-builds/charters/04-content.md` (excerpted from §5)

**Charter README, author phrasing:**  
> “For movement leaders (authors), the content build is a **four-week author residency** that ends with **core content** … **ingested**, **new articles** … **at least one transformational course live**, and **pathways** … for each **theme**.”  
— `docs/system-builds/charters/README.md` (see “For movement leaders (authors)…”)

**Book, integration stage (four weeks):**  
> “**Integration** … the **initial build** is a **four-week residency** for a movement leader (ending with **core content ingested**, **new articles** across every theme, at least one **transformational course**, and a **pathways page per theme**) or a **four-week system build** for a **non-profit** in a **single domain** …”  
— `docs/book-development/fragmentation-manuscript-ordered/05-the-six-stages-at-a-glance.md` (condensed; see full paragraph in file)

**Journey map Phase 2 (different weekly shape):**  
> “**Phase 2: Onboarding & Setup (Weeks 1-4)** … **Week 1: Vision & Voice** … **Week 2: First Publication** … **Week 3: Rhythm & Repurposing** … **Week 4: Audience Building** …”  
— `docs/business-docs/core-docs/12-author-journey-map.md`

**System readiness key type (routing, not build UI):**  
`SystemBuildKey` includes `content_system`, `foundation`, `discovery_lab`, etc. — `src/lib/system-readiness/types.ts` (imported in `compute.ts`).

**Services page copy (four-week installs):**

```40:40:src/components/sections/services/services-data.tsx
      "Four-week installs for structured libraries, pathways, donor visibility, and stewardship workflows — scoped in conversation.",
```

**Schema: sprint pathway + onboarding fields** (abridged): see `src/lib/db/schema.ts` (search for `sprint_pathway`, `onboarding_responses`).

---

*End of document. For the next pass, consider: (1) a one-page decision on whether `07` or `27` is the operational default, (2) a short SSOT addendum in `docs/build/notes/` for “four-week” naming, (3) verifying live routes for the author course preview and AI Lab in whatever repo hosts the tenant app.*
