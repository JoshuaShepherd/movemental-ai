# System builds — comprehensive reference (audit)

**Purpose:** Single place to answer procurement, operations, and executive questions about Movemental **organizational system builds** (modular sprints under `/system-builds`). Use this for discovery calls, SOW drafting, and internal alignment.  

**Audience:** COO / operations leads, CFOs, development directors, IT, legal, and board-adjacent sponsors—anyone who needs **deliverables, money, time, people, and post-engagement posture** before saying yes.

**Maintenance:** When shipped copy or pricing changes, update this doc and the code sources listed in [Source of truth](#source-of-truth-in-repo) together.

**Disclaimer:** Where this doc says **Policy (internal)**, it reflects **leadership decisions + agreed best practices** for contracting and delivery—not necessarily what the public site or `src/` still prints. Align code/FAQ/pricing pages when you intentionally change customer-facing numbers.

---

## How to use this document

| Reader | Start here |
|--------|------------|
| **Sales / discovery** | [What system builds are](#what-system-builds-are-one-paragraph) → [Pricing](#pricing-as-shipped-in-code-vs-internal-policy) → [Per-build reference](#per-build-reference) for the SKU in play → that build’s **Policy (internal)** table (caps, Tier A/B, counsel checklists). |
| **COO / risk / operations** | [Policy (internal) — universal](#policy-internal-universal) (money, time, pause/sponsor, handoff, PII posture, post-sprint) → the build-specific **Policy (internal)** subsection below. |
| **Legal / finance** | Universal policy (MSA/SOW, DPA, retention) + each build’s **Still confirm with counsel** bullets + [Commercial & legal instrument](#commercial--legal-instrument) + [Still open (cross-build)](#still-open-cross-build-needs-legalfinance-sign-off). |
| **Engineering / IT** | [Technology posture](#policy-internal-technology) (Tier A vs B) + [Content policy](#policy-internal-content) (hosting/migration) + [Fundraising policy](#policy-internal-fundraising) (CRM prototype vs production) + [Discovery Lab](#policy-internal-discovery-tech) (keys, sandbox) + [Discovery scope](#policy-internal-discovery-scope). |

**What lives where**

- **Shipped marketing + product copy** = repo files in [Source of truth](#source-of-truth-in-repo) (routes, hub cards, `build-page-content.ts` outputs, FAQ, pricing page).  
- **Internal operating policy** = everything under **Policy (internal)** in this doc (universal first, then per-build tables). **When policy and code disagree** (e.g. bundle **$25k** vs **$30k** in code), **this doc + signed SOW win** until code is updated.  
- **Explicit gaps** = checkbox lists under **Still open** / **Still confirm with counsel**—do not treat unchecked items as customer promises.

---

## Table of contents

1. [How to use this document](#how-to-use-this-document)  
2. [Source of truth in repo](#source-of-truth-in-repo)  
3. [Policy (internal) — universal](#policy-internal-universal) — pricing & invoicing; timeline & live cadence; MoSCoW; pause / sponsor / travel; post-sprint support; handoff pack; technology Tier A/B; data & legal; glossary; cross-build TBDs  
4. [What system builds are](#what-system-builds-are-one-paragraph)  
5. [Canonical routes](#canonical-routes-public)  
6. [Pricing (code vs. internal policy)](#pricing-as-shipped-in-code-vs-internal-policy)  
7. [Timeline & cadence](#timeline--cadence)  
8. [Organizational commitment](#organizational-commitment--people-governance-access)  
9. [Post–sprint servicing](#postsprint-servicing-warranty-and-ongoing-relationship)  
10. [Data, security, privacy, and IP](#data-security-privacy-and-ip)  
11. [Commercial & legal instrument](#commercial--legal-instrument)  
12. [Sequencing & where to start](#sequencing--where-to-start)  
13. [Per-build reference](#per-build-reference) — Content, Fundraising, Governance, Discovery Lab, Foundation (each: shipped outputs + **Policy (internal)** where defined)  
14. [Internal policy index (quick links)](#internal-policy-index-quick-links)  
15. [Integration between builds](#integration-between-builds-how-they-fit-together)  
16. [Natasha-style question bank](#natasha-style-question-bank-coo--risk--ops)  
17. [Changelog](#changelog)  

---

## Source of truth in repo

| Concern | Primary files |
|--------|----------------|
| Prices, bundle total, pricing notes | `src/lib/system-builds/build-pricing.ts` |
| Per-build outputs, after-build narrative, readiness (requires / if-not-ready) | `src/lib/system-builds/build-page-content.ts` |
| Hub card blurbs, typical paths, stack layers, week-by-week format, default readiness | `src/lib/system-builds/hub-cards.ts`, `src/lib/system-builds/pathway-data.ts` |
| Engagement model UI (“How a build runs”) | `src/components/system-builds/build-format-section.tsx` |
| FAQ (includes org sprint pricing; also broader “platform sprint” language) | `src/components/sections/faq/faq-data.ts` |
| Pricing page (org builds + caveats) | `src/components/sections/pricing/pricing-page-content.tsx` |
| Foundation layer (overview, illustrative artifacts) | `src/components/sections/system-builds-foundation/foundation-page-content.tsx` |
| Route map | `docs/arguments/SITE-SSOT.md` (system-builds rows) |

**This audit doc** is the place for **internal policy** that spans builds until it is promoted into legal templates or the site.

---

## Policy (internal) — universal engagement, commercial, data, and delivery

<a id="policy-internal-universal"></a>

*Captured from leadership input (April 2026) and completed with standard B2B / mission-sector practice where noted.*

### Pricing & invoicing

| Item | Policy |
|------|--------|
| **À la carte list prices** | Unchanged from code: Discovery Lab **$5k**, Governance & ethics **$5k**, Fundraising **$10k**, Content **$10k**. |
| **Four-build bundle** | **$25,000** when all four sprints are sequenced together (intentional package discount). **Code + FAQ today still say $30,000** (`bundledBuildTotalLabel` / FAQ)—update `src/lib/system-builds/build-pricing.ts`, FAQ, and pricing page when marketing approves the new number. |
| **Payment schedule** | **50% on signed SOW / kickoff**, **50% on delivery** (final invoice tied to agreed deliverable checklist). **Net 15** unless client AP requires PO + longer terms—in that case prefer **partial prepay** or documented credit check. |
| **Refunds** | **Full refund of deposit** if Movemental cancels before kickoff or client withdraws before kickoff. After kickoff, fees **non-refundable for work already performed**; if Movemental cannot perform, **refund unearned fees**. Optional good-faith remedy: **one bounded remediation week** or **credit toward a future build** for disputes over **Must**-tier deliverables only. |
| **Currency / tax / PO** | **USD only** for now; taxes per entity rules; **PO accepted** when required (PO number on invoice). |
| **Multi-currency** | **Deferred**—do not complicate billing until needed. |
| **On-site** | **Remote-first.** No default on-site line item. Travel only by **mutual written change order**; **client reimburses travel at cost** (or pre-agreed per-diem + travel-day rate). |
| **Optional retainer** | **Offered**—e.g. monthly or quarterly blocks (2–4 hours/month) for governance hygiene, AI triage, office hours, light roadmap support. Not included in base sprint. |

### Timeline, live touchpoints, and client time

| Item | Policy |
|------|--------|
| **Sprint shape** | Default remains **~four weeks** per `pathway-data` (Week 1 map/decide; Weeks 2–3 build in open; Week 4 handoff). |
| **Live sessions** | **One 90-minute live session per week** during the sprint (decisions, demos, Q&A). |
| **Async learning** | **Full guided online experience** alongside the sprint: multimedia, video, hands-on labs—**flipped** model (pre-work before live, exercises after). Participants get **access to the engagement lead** for course-related questions during the sprint window (define channel + expected response time in SOW—e.g. **two business days** async). |
| **Client time budget** | Target **~4 hours/week total** from the client org (the **90-minute live is inside** that budget; remainder = async course, reviews, homework). **Sponsor + at least one operator** are expected in the rhythm. |
| **Movemental staffing (named on SOW)** | At minimum: **Engagement lead**, **delivery/PM function**, **AI/governance lens** (may be combined on small engagements); add **engineering** when Tier B implementation (see Technology) is in scope. |

### Scope control (MoSCoW)

| Item | Policy |
|------|--------|
| **End of Week 1** | Publish **Must / Should / Could / Won’t** through week 4. **Invoice / “done”** ties to **Must** only; **Could** is time-boxed surplus. |

### Pause, sponsor change, travel

| Item | Policy |
|------|--------|
| **Pause** | **Allowed:** up to **60 calendar days once** per engagement without penalty **if requested before rework is triggered**; timeline shifts; **no automatic scope expansion** from pause alone. |
| **Sponsor leaves mid-sprint** | **Pause up to 14 calendar days once** to name a replacement sponsor. If idle **>30 days**, engagement **suspends**—**fees for completed work** remain due; **unused prepaid** credited toward restart within **6 months** (restart on new SOW amendment). |
| **Travel** | Default **none**. If travel: **client reimburses at cost** with receipts **or** pre-approved flat per diem. |

### Post–sprint support (included “generous” baseline)

| Item | Policy |
|------|--------|
| **Window** | **60 days** after final delivery. |
| **Channels** | Async first (email or agreed shared channel); **two 45-minute office-hours blocks** (or one 60-minute) in that window for clarifications on **delivered artifacts**. |
| **Response time** | **Reasonable effort, two business days** for “how do I use what you delivered?”—not new product build. |
| **Fix-it** | **30 days** to correct **factual errors**, broken internal references, or **template defects** in **in-scope** deliverables. |
| **Out of scope** | New experiments, new integrations, or net-new strategy → **change order** or **retainer**. |

### Handoff standard (what “deliverables” means operationally)

<a id="policy-internal-handoff"></a>

Each sprint ends with a **handoff pack**, not vibes:

1. **Deliverables index** — versioned checklist of every artifact named in the SOW.  
2. **RACI** — who runs weekly rhythm, who approves AI use cases / publishing / CRM hygiene as relevant.  
3. **Runbook (short)** — where assets live, naming, publishing flow, escalation path (typically 5–10 pages equivalent).  
4. **Export pack** — templates, prompts, specs, dashboard definitions, screenshots / Looms as needed.  

*Formats (Notion vs. Google Docs vs. PDF vs. repo) remain **choose per client** in SOW unless product standardizes.*

### Technology posture (implementation vs. advisory)

<a id="policy-internal-technology"></a>

Many engagements will eventually include **client-owned web surface** (e.g. **Next.js/React**) plus **server-side AI** (no secrets in browser). **Preferred reassurance pattern:**

| Tier | Meaning |
|------|--------|
| **Tier A — Advisory / education** | Specs, playbooks, experiments, governance hooks—**no** production deployment obligation in base sprint unless SOW says otherwise. |
| **Tier B — Implementation** | Client-owned deployment (e.g. **Vercel** + **their** GitHub org under **their** domain); **tenant Postgres** in **their** cloud (Supabase, Neon, RDS) with **RLS**; **their** API keys in **their** env where possible; PII-touching logic **server-side only**. Movemental may have **time-limited admin access** during build, **revoked at handoff**. |

**Pricing implication:** **Separate line items** in SOW—**sprint fee** vs. **implementation / hosting setup fee** vs. **retainer**—so COOs see implementation cost distinctly.

**Marketing alignment:** Public Discovery Lab copy today emphasizes **playbooks and registers**; if Tier B is sold, **explicit SOW language** must match so site ≠ reality.

### Data, PII, subprocessors, retention, legal wrappers

| Topic | Policy |
|-------|--------|
| **DPA** | Use a **Data Processing Agreement** (or MSA data exhibit) for any sprint where Movemental or its subprocessors **process personal data** on the client’s behalf—list **subprocessors** (hosting, model providers, email, analytics). |
| **Subprocessors** | Maintain a **living subprocessors page** + attach to DPA; update when vendors change. |
| **Data location** | **Default target:** **client-owned** database + deployment where feasible; otherwise document **what** Movemental holds, **where**, and **for how long**. |
| **PII / donor / youth (reassurance)** | **Data minimization** for pilots (redacted/synthetic first where possible). **CRM remains system of record** for donors unless SOW moves it. **No model training** on client data unless explicitly contracted otherwise. **Role-based access** + **no shadow copies** in consumer chat tools for production donor data. **Youth:** avoid collecting under-13 in tools without **parental consent** flows; minimize identifiers in AI experiments. Publish a **one-page “Data & AI guardrails”** summary for prospects. |
| **Insurance** | As company matures: carry **E&O (professional liability)** and **Cyber**; provide **Certificate of Insurance (COI)** on request for larger orgs / RFPs. |
| **Retention & deletion** | Delete Movemental-held **working copies within 30–90 days** of final payment unless extended hosting is purchased; **always** provide client **full export** at handoff. State this in MSA. |
| **NDA** | **Mutual NDA** before receiving sensitive exports; **not** a substitute for DPA where personal data is processed. Movemental may sign when receiving client secrets. |
| **MSA / SOW** | **MSA** = umbrella (IP, confidentiality, liability, termination). **SOW** = this sprint’s scope, schedule, fees, assumptions, **out of scope**. **Liability cap** = **fees paid under that SOW** (market standard for services of this scale). **Client indemnity** for data they supply; **Movemental indemnity** for IP infringement in Movemental-delivered materials. **Change orders** in writing mid-sprint. |

### Glossary (for non-lawyers)

| Term | Meaning |
|------|--------|
| **DPA** | Contract governing **how** you process **personal data** as a processor for the client. |
| **Subprocessors** | Vendors **you** use who might touch client data. |
| **E&O** | Errors & omissions / **professional liability** insurance. |
| **Cyber** | **Security incident** / breach-related liability coverage. |
| **Retention** | How long **you** keep their materials on **your** systems after handoff. |
| **MSA / SOW** | Master terms vs. **this project’s** scope and money. |
| **MoSCoW** | **Must / Should / Could / Won’t** scope prioritization. |
| **Tier A** | Advisory / education / spec / prototype the **client copies** into production—**default** for base sprint fees in Content & Fundraising policy tables. |
| **Tier B** | Production implementation (hosting, CRM automation, SSO, ETL, go-live)—**separate SOW or line item** unless explicitly written into the base SOW. |
| **Handoff pack** | [Handoff standard](#policy-internal-handoff): deliverables index + RACI + runbook + export pack. |
| **RACI** | Responsible / Accountable / Consulted / Informed matrix for ongoing rhythms. |
| **COI** | **Certificate of insurance** (proof of E&O / Cyber coverage) for RFPs and large orgs. |

### Still open (cross-build, needs legal/finance sign-off)

- [ ] Exact **liability cap** language and **venue** / governing law.  
- [ ] Final **subprocessor list** and DPA template version.  
- [ ] **COI** thresholds (when required).  
- [ ] **Background checks** for staff with export access (if required by sector).  
- [ ] **HIPAA / FERPA** posture if ever selling into regulated contexts.  
- [ ] **EU/UK transfers** mechanism if international clients appear.  
- [ ] **Rush pricing** and **max concurrent cohorts**.  
- [ ] **Movemental hours/week** promised to client (internal capacity model).  

---

## What “system builds” are (one paragraph)

**System builds** are **focused guided sprints** (marketed as **~four weeks**) where Movemental works **with** the client team—not as a generic workshop series—to produce **operational artifacts** (structure, specs, maps, playbooks, workflow rails) that connect **content**, **fundraising**, **governance/ethics**, and **governed AI capability** as **one system installed in parts**. The **Foundation** route (`/system-builds/foundation`) is an **overview** of how governance and ethics form the operating spine **before** deeper content, fundraising, or Discovery Lab work; the priced modular SKUs are the four builds below plus sequencing guidance on the hub.

---

## Canonical routes (public)

| Route | Role |
|-------|------|
| `/system-builds` | Hub: stack, typical paths, integration story, build cards |
| `/system-builds/content` | Content system build |
| `/system-builds/fundraising` | Fundraising system build |
| `/system-builds/governance-ethics` | Governance & ethics build |
| `/system-builds/discovery-lab` | Discovery Lab |
| `/system-builds/foundation` | Foundation layer **overview** (positions governance + ethics; links to governance deep dive) |

Legacy `/services/*` organizational paths **301** to `/system-builds` per site SSOT.

---

## Pricing (as shipped in code vs. internal policy)

**Code / FAQ today:** `build-pricing.ts`, FAQ, pricing page.

| Build | Public list price (code) | `note` in code (internal label) |
|-------|--------------------------|----------------------------------|
| Discovery Lab | **$5,000** | AI experimentation and team training sprint |
| Governance & ethics | **$5,000** | Governance and ethics sprint |
| Fundraising system | **$10,000** | Donor and stewardship system sprint |
| Content system | **$10,000** | Content system sprint |
| **All four sequenced (code)** | **$30,000** | `bundledBuildTotalLabel` / FAQ |

**Internal policy (April 2026):** **Four-build bundle = $25,000.** Treat as deliberate discount; **sync repo + FAQ + pricing** when ready to go public.

**Foundation layer** (`/system-builds/foundation`): **no separate price** in `build-pricing.ts` — treat as **scoped via conversation** until product defines a SKU.

**Caveats (explicit on site):** Base sprint cost only; **scope adjustments, data volume, or travel** may change figures; **first conversation** names what fits the client’s stage.

---

## Timeline & cadence

### Default shape (modular org builds)

From `BuildFormatSection` default intro + `buildFormatWeekNotes` in `pathway-data.ts`:

- **Duration:** “Usually on the order of **four weeks**” (guided sprint).  
- **Week 1 — Map and decide:** Inventory reality, name constraints, pick what must be true by sprint end; **leadership and operators in the same room** (literal or figurative).  
- **Weeks 2–3 — Build in the open:** Assemble the system **with** the client team—**working structure, drafts, visible decisions**—not a slide deck alone.  
- **Week 4 — Handoff and operate:** Leave with **artifacts, owners, and a short operating rhythm**—not a binder no one opens.  
- **Modality:** **Sync** sessions for decisions and alignment; **async** work for drafting, structuring, validation.

**Aligned with internal policy:** **One 90-minute live per week** + **async guided course**; see [Policy (internal) — universal](#policy-internal-universal).

**Still TBD (calendar / ops)**

- [ ] Movemental-side hours per week per engagement tier  
- [ ] Time zone coverage, business hours, holiday blackout  
- [ ] Whether four weeks is strictly calendar-consecutive vs. “four sprint weeks” with agreed pauses  
- [ ] Rush / compressed timeline pricing  
- [ ] Maximum concurrent client cohort size  

### FAQ tension (flag for internal copy QA)

FAQ “What happens in a sprint?” (`faq-data.ts`) describes a **full platform** sprint (ingest content, configure AI, community, commerce, analytics, launch). Modular **system-build** pages describe a **four-week artifact sprint**. **Reconcile** externally so prospects are not confused about which sprint shape applies when.

---

## Organizational commitment — people, governance, access

### Universal readiness (default on many build pages)

From `defaultReadiness` (`pathway-data.ts`) — **what this requires:**

1. A **sponsor** who can **make or escalate** decisions during the sprint.  
2. **Access** to the content, lists, or tools the build depends on—even **messy exports** are fine.  
3. **Time from people who will run the system after we leave** (not only executives).  
4. **Willingness to choose:** clarity beats preserving every legacy habit.

**If not fully ready** (same block):

- Imperfect data is normal—start from what exists and **document gaps** instead of pretending the house is clean.  
- If ownership is split, **surface early** and build **decision paths**, not hidden compromises.  
- If calendars are tight, **narrow scope** so the sprint still ships something operational.

### Client time (internal policy)

**~4 hours/week** org-wide, including **one 90-minute live** per week and async guided coursework / homework. Sponsor + operator participation expected.

### Hours per role (still granular TBD)

- [ ] Recommended split across executive sponsor, program, comms, development, IT/security, finance **per build**  
- [ ] Minimum FTE-equivalent per build  
- [ ] Whether legal counsel must be on retainer for governance/ethics week-4 signoff  

---

## Post–sprint servicing, warranty, and ongoing relationship

**Public FAQ (general Movemental):** ongoing system, support as needed; service to build / platform to run.

**Internal baseline for org sprints:** see **Post–sprint support** in [Policy (internal) — universal](#policy-internal-universal).

**Platform economics** (90/10 leader model) remain **separate** from modular sprint support unless explicitly bundled in a custom deal.

---

## Data, security, privacy, and IP

**Stated or implied in copy**

- Builds work from **real** drafts, exports, and tools; **messy** starting points acceptable.  
- Discovery Lab: pilots routed through **tools and data-handling rules the organization can defend**; sponsor aligns boundaries with **comms and legal** for external publish/share.  
- Governance outputs include **policy starter set** “ready for **legal review** where required.”  
- FAQ ownership: client owns **content, IP, data**; **export** available; Movemental does not “hold work hostage” (platform / leader framing).

**Internal policy:** DPA, subprocessors, PII/youth posture, retention, NDA, insurance—see [Policy (internal) — universal](#policy-internal-universal).

**Sprint deliverable IP:** Client owns **their** inputs and **customer-specific** outputs in the handoff pack. **Movemental methodology** (templates, course structure, reusable frameworks) may remain Movemental IP **licensed for client use**—confirm exact language with counsel (previously TBD in Natasha bank).

---

## Commercial & legal instrument

**Internal policy:** MSA + SOW, liability cap, indemnities, change orders—see [Policy (internal) — universal](#policy-internal-universal).

**Still need templates**

- [ ] Executed MSA + SOW boilerplate in `docs/legal/` or counsel’s drive  
- [ ] Board resolution / signatory threshold guidance for nonprofits  

---

## Sequencing & “where to start”

### Stack mental model (`systemInstallStack`)

1. **Foundation layer** — Governance & ethics build + foundation overview.  
2. **Growth layer** — Content + Fundraising system builds.  
3. **Capability layer** — Discovery Lab (measured AI that reinforces other layers when governed).

### Hub “three doors” (all Integration-stage variants)

1. **Discovery Lab first** — AI use cases, ownership, measurement are the constraint.  
2. **Content & Fundraising** — story and support systems need the same spine.  
3. **Governance & ethics** (+ foundation) — judgment, authority, or ethics already throttling growth.

### Typical nonprofit paths (`typicalNonprofitPaths`)

Examples (each is a **named sequence**, not a mandate):

- Content → Fundraising → Discovery Lab (strong programs, weak digital coherence / donor systems).  
- Governance & ethics → Content → Fundraising (governance/ethics strain already slowing publishing, campaigns, partnerships).  
- Discovery Lab → Content → “Deeper installs as needed” (AI pressure high; use cases undefined).

### Constraint → start card (`nonprofitConstraintStarts`)

Signals mapped to suggested first build: scattered knowledge → **Content**; inconsistent fundraising / CRM vs. reality → **Fundraising**; unclear decision-making → **Governance & ethics**; ad hoc risky AI → **Discovery Lab**; leadership alignment bottleneck → **Governance** + explicit tensions / executive narrative (not a separate SKU).

---

## Per-build reference

Each subsection lists **deliverables** (from `build-page-content.ts` unless noted), **readiness**, **after-build narrative**, and **gaps**.

---

### Content system build (`/system-builds/content`)

**List price:** $10,000.

**What they get (named outputs)**

1. Structured article and resource library — modular units tagged for reuse; authoritative versions for supporters.  
2. Thematic pathways — journeys reflecting mission priorities; formation and campaigns point at same story.  
3. SEO-ready information architecture — entry points, internal linking, metadata patterns the team can sustain.  
4. Deployable content system spec — enough to implement **in Movemental or map to your stack**; roles, publishing checks, reuse rules.

**During / after / 90 days** (`contentAfterPhases`)

- During: messy inventory → ordered structure from real drafts/archives; themes; duplicates retired; voice aligned where it matters.  
- After: editors know where things live; fewer Slack handoffs between program, comms, development.  
- 90 days: reuse compounds; campaigns/courses pull from same spine; AI (if Discovery Lab added) has bounded material.

**Readiness:** Uses default `ReadinessSection` unless page overrides—see universal block.

### Policy (internal) — Content system build

<a id="policy-internal-content"></a>

*Best-practice defaults for **$10,000** base sprint (Tier A unless SOW adds Tier B). Adjust only via written SOW / change order.*

| # | Topic | Policy |
|---|--------|--------|
| 1 | **Volume caps (“what’s included”)** | **Inventory & structure pass** is capped so the sprint stays shippable: **up to ~50 content units** (articles, key static pages, and up to **10** long-form PDFs/decks counted as one unit each) **or** **~5 GB** of client-supplied exports—**whichever limit is hit first**. **Video/audio review** for tagging *recommendations*: **up to 60 minutes total runtime** across **≤3 flagship** files in base scope. Anything beyond → **Phase 2** or **change order** with a new ceiling. *Rationale:* caps protect both sides from “migrate the whole archive” scope creep without naming dollars per GB in marketing. |
| 2 | **CMS / stack mapping (“map to your stack”)** | **Tier‑1 (committed spec patterns):** WordPress (block editor + common SEO plugins), Webflow (Collections), Sanity (content lake + desk), Notion (as **export** / structured hub), **Google Workspace** (Docs/Drive as **source** corpus). **Tier‑2:** custom headless (any vendor) → **generic mapping doc** (fields, flows, webhooks) **without** guaranteed implementation code. **Anything else** → **scoping call** or bespoke quote. |
| 3 | **Movemental tenant / hosting** | **$10k base = Tier A** (advisory + spec + pilot structure). **Production Movemental tenant** (DNS, env, go-live, RLS, backups) is **Tier B**—**separate line item** or follow-on SOW, not silently bundled. Optional: **demo/staging** in Movemental for **Must** pathway **if** pre-negotiated cap (e.g. one preview environment) to avoid unpaid hosting debt. |
| 4 | **Migration execution** | **Default:** **no full bulk migration** in base sprint. Included: **inventory, taxonomy, IA, modular content spec, cutover checklist**, and a **pilot batch** of **≤25 pieces** moved or rebuilt into the agreed target (CMS drafts, Movemental preview, or structured export pack—per SOW). **Archive-wide migration** = **Phase 2** implementation. |
| 5 | **WCAG / accessibility** | **In scope (proportionate):** accessibility **requirements in the content system spec** (heading order, link text, alt text *workflow*, forms, media captions pattern). **In scope for Must-tier pilot surfaces only:** automated scan + fix **critical** issues on the **delivered pilot pathway pages / pilot articles** (not whole legacy site). **Full-site WCAG 2.2 AA audit + remediation** = **add-on** or separate vendor. |
| 6 | **Editorial source of truth** | **Working:** client-owned **Google Drive** (or Microsoft 365) folder + **single sprint board** (Notion or Google Doc index). **Canonical by mid-sprint:** one agreed destination (client CMS **draft** state or Movemental preview). **Merge conflicts:** **client-named lead editor** has tie-break; Movemental maintains a **version log** in the handoff pack. |
| 7 | **Brand / voice guide** | **Prerequisite from client by end of Week 1:** existing brand/voice materials **or** **3–5 exemplar** pieces. Sprint delivers **editorial alignment checklist** + **do/don’t examples** tied to their corpus—not a **net-new** full brand identity unless scoped as **add-on**. |
| 8 | **Multimedia (transcripts, tagging)** | **Base:** as row 1—**≤3 flagship** assets / **≤60 min** total for **transcript + tagging + placement in IA**. **Full archive** transcription or podcast pipeline = **add-on**. |
| 9 | **Localization** | **Out of scope** for base sprint (**English-primary** deliverables). **Optional add-on:** bilingual **metadata pattern** + outline for **one** translated pathway (not full professional translation unless separately contracted). |
|10 | **Pathway “Must” at week 4** | **Must:** **one** primary pathway **fully specified** (**5–7 ordered steps** or equivalent page outline) + **modular pattern** applied to **2 pilot articles** (or equivalent units). **Should:** second pathway **skeleton**. **Could:** additional units if time remains after MoSCoW. |
|11 | **Stakeholder interviews** | **Up to 8** structured sessions (**45–60 minutes** each) across program, comms, development/fundraising, ops—**included**. **Additional sessions** → change order. |
|12 | **Ongoing publishing** | **Client-operated** after handoff. Movemental provides **runbook + universal 60-day / 30-day support** ([Policy (internal) — universal](#policy-internal-universal)). **Weekly publishing, CMS hygiene, or campaign execution** = **retainer** or separate engagement—never implied by the $10k sprint alone. |

**Still confirm with counsel / first SOW**

- [ ] Exact wording for “content unit” and overage pricing table  
- [ ] Whether any **client sector** (e.g. healthcare content) triggers **special compliance** language in Content SOW  

---

### Fundraising system build (`/system-builds/fundraising`)

**List price:** $10,000.

**What they get (named outputs)**

1. Prioritized donor opportunity map — who to deepen next, why, relationship context before outreach.  
2. Relationship and influence sketch — practical visibility into partnerships, connectors, internal ownership of key accounts (explicitly **not** “generic network graphs” only).  
3. Working dashboard or report pack — small set of views the team actually reviews (pipeline health, stewardship queues, campaign readiness).  
4. Outreach and stewardship workflow structure — repeatable steps tied to content and story.

**Extra readiness copy** (`fundraisingReadinessExtra`): Faster when development and comms share vocabulary; if disconnected, sprint **builds the bridge**.

**Fundraising-specific requires** (`fundraisingReadinessRequires`)

- Access to donor/prospect lists, campaign history, existing tools—even messy exports.  
- Development **and** communications time in same room or same sprint channel.  
- Sponsor who protects **stewardship rhythms** over one-off heroics for the four-week window.  
- Honesty about **who actually knows the donor** vs. CRM field owner.

**If not ready** (`fundraisingReadinessIfNotReady`)

- Phase data cleaning before deeper patterning; four weeks still ships usable slice.  
- CRM migration mid-flight → design around **interim truth**; document what must **not** be automated yet.  
- If story architecture is bottleneck → **sequence toward Content build** without inventing clarity.

**During / after / 90 days** (`fundraisingAfterPhases`)

- During: data becomes decisions; reconcile lists, fields, reality.  
- After: stewardship queues and rhythms; clear next actions owned by named roles.  
- 90 days: coherence with content; fewer one-off decks; asks sound like the org.

### Policy (internal) — Fundraising system build

<a id="policy-internal-fundraising"></a>

*Best-practice defaults for **$10,000** base sprint (Tier A unless SOW adds Tier B). Aligns with universal **~4 h/week** client cadence ([Policy (internal) — universal](#policy-internal-universal)). Adjust only via written SOW / change order.*

| # | Topic | Policy |
|---|--------|--------|
| 1 | **CRM / tools — “dashboard or report pack”** | **Tier‑1 (committed deliverable patterns):** **Salesforce** (incl. NPSP common objects), **HubSpot** (Sales/CRM + lists), **Bloomerang**, **DonorPerfect**, **Raiser’s Edge NXT** (accept **CSV/Query-export–driven** cycles if API access is limited), **Airtable** (relational base), **Google Sheets** + **Looker Studio** (when CRM is hostile to custom views—**read-only** exports). Sprint ships **field mapping doc + 3–6 defined views** (spec + formulas / Looker, or native CRM reports where feasible). **Tier‑2 / bespoke CRM or data warehouse** → **generic dashboard specification + wireframes + refresh cadence** without guaranteed native build. **Anything else** → scoping call or bespoke quote. |
| 2 | **Donor PII & minimum-necessary** | **Data-classification appendix** in every Fundraising handoff: **(A)** public / prospect identifiers suitable for broad lists; **(B)** identified donor / giving history (treat as **confidential**); **(C)** notes, wealth indicators, health/family detail (treat as **high-sensitivity**—**exclude from base sprint exports** unless client legal approves and SOW expands scope). **Default:** sprint uses **only fields the client certifies are appropriate** for the agreed use cases; **no Social Security numbers, bank tokens, or payment card data** in scope; **no minors’ PII** in relationship maps unless youth program is explicitly scoped with guardian/consent posture. **Minimum-necessary rule:** every field in the opportunity map / dashboard must answer **“who needs this to take the next stewardship action?”**—otherwise **Won’t** for the sprint. |
| 3 | **Development / MGO time (numeric)** | **Minimum:** designated **development lead or gift officer ~2 h/week** synchronous or async review (lists, prioritization, naming reality)—**in addition** to the org-wide **~4 h/week** sponsor/operator budget. **Ideal:** **second 45–60 min** block weekly with **comms + development together** (per `fundraisingReadinessRequires`)—count toward the 4 h org budget when possible. |
| 4 | **Implementation vs. design (Tier A / B)** | **$10k base = Tier A:** Movemental **designs** the opportunity map, relationship sketch, **dashboard/report pack as spec + working prototype** in **Sheets / Looker / agreed Tier‑1 CRM reports** that the **client owns and copies** into production. **No** silent obligation to configure production Salesforce/HubSpot roles, SSO, or ETL pipelines in base fee. **Tier B:** production CRM build, automation (Flows/Zapier enterprise), **or** custom stewardship app → **separate line item** or follow-on SOW with named environments and UAT window. |

**Still confirm with counsel / first SOW**

- [ ] **CAN-SPAM / TCPA / state charitable solicitation** language when deliverables touch **email/text cadences**  
- [ ] **International donors / GDPR** if lists include EU/UK data subjects  
- [ ] **Written data-use acknowledgment** from client for each export source (who authorized pull)  

---

### Governance & ethics build (`/system-builds/governance-ethics`)

**List price:** $5,000.

**What they get (named outputs)**

1. Documented governance model — board, executive, staff lanes; authority; escalation without drama.  
2. Decision rights matrix — plain-language “who decides” for publishing, partnerships, crises, AI-assisted work.  
3. Ethics framework tied to scenarios — short, tested guidance for real inbox situations.  
4. Usable policy starter set — aligned to mission and ops; legal review where required; staff-usable where safe.

**Requires** (`governanceReadinessRequires`)

- Executive and **board** access for decisions touched (publishing, partnerships, major donor posture).  
- Willingness to name where ethics was **improvised under pressure** (practical, not performative).  
- Sponsor who holds the line when expediency pushes against boundaries.  
- Time from people who carry decisions **week to week**—not only an off-site.

**During / after / 90 days** (`governanceAfterPhases`)

- During: implicit habits → explicit; judgment that lived in personalities → shared rails.  
- After: faster, kinder decisions; documentation when AI, fundraising, publishing hit gray space.  
- 90 days: new programs/tools plug into known boundaries; growth does not outrun accountability.

### Policy (internal) — Governance & ethics build

<a id="policy-internal-governance"></a>

*Best-practice defaults for **$5,000** base sprint. **Not** a substitute for client counsel where law or accreditation applies.*

| # | Topic | Policy |
|---|--------|--------|
| 1 | **Board-facing deliverables** | Handoff includes **board-ready summary deck** (≤15 slides or equivalent memo) **plus** **draft governance memo** for board packet (who decides what; what needs board vs. delegated authority). **Optional Should:** one-page **resolution shell** (“Board resolves to adopt the attached decision rights matrix…”)—**language for counsel to finalize**, not legal advice from Movemental. **Committee charter shells** (Governance, Ethics, AI Stewardship) = **Could** if time remains. |
| 2 | **Jurisdiction / sector packs** | **Default:** **US-generic** nonprofit framing in policy starters (501(c)(3) common patterns: conflicts, whistleblower *references*, gift acceptance *categories*—always labeled **draft for counsel**). **Not in base scope:** state-by-state charitable registration playbooks, lobbying rules, or international subsidiary governance—**Won’t** unless SOW add-on names a jurisdiction. **Sector overlays:** **accreditation / denominational** content = **add-on** or scoped **Could** (see row 3). |
| 3 | **Accreditation & denominational overlays** | **Included at pattern level only:** matrix column “**what accreditors / judicatories typically ask to see mapped to these artifacts**” (e.g. evidence of oversight for published materials, youth safety adjacent to comms). **Excluded from base fee:** writing **submission-specific** accreditation answers or denominational judicial process docs—those are **client + counsel + subject-matter experts**; Movemental provides **structure**, not canonical submission text. |
| 4 | **Volume / workshop caps** | Align with universal cadence: **up to 8** facilitated sessions (45–60 min) **or** governance-specific variant—**same cap as Content interviews** unless SOW changes—so governance + ethics workshops with exec/board do not silently expand. **Ethics scenario deck:** **8–12** scenarios in **Must** tier; additional = **Could**. |

**Still confirm with counsel / first SOW**

- [ ] Which **policy starter** pages require **state-specific** edits before distribution  
- [ ] Whether client is **501(c)(4) / union / school** and needs non-default module  
- [ ] **D&O** or insurer-mandated language for AI / disclosure sections  

---

### Discovery Lab (`/system-builds/discovery-lab`)

**List price:** $5,000.

**What they get (named outputs)**

1. Prioritized use-case register — what to try / not try yet / why; bounded scope; named owners.  
2. Experiment briefs and outcomes — what was tested, with what data, what was learned.  
3. Measurement and risk notes — lightweight mission-relevant metrics; documented safeguards.  
4. Internal playbook draft — propose, approve, retire AI-assisted workflows; tighten after sprint.

**Requires** (`discoveryReadinessRequires`)

- Sponsor aligns experiment boundaries with **comms and legal** (especially external publish/share).  
- Access to **real workflows** and representative samples, routed through defensible data-handling rules.  
- Time from **operators**, not only leadership curiosity.  
- Commitment to **document** tests: owners, stop conditions, outcomes.

**If not ready** (`discoveryReadinessIfNotReady`)

- Narrow use-case register + **sandbox-only** while access sorts.  
- Shadow tools common to **name**; sprint reduces random adoption; no individual shaming.  
- If governance thin → pair with **explicit guardrails** during learning; tighten as ethics frame matures.

**During / after / 90 days** (`discoveryAfterPhases`)

- During: capability—not tool shopping; small documented experiments with stop conditions.  
- After: governance hooks in real work; use cases tie to content, fundraising, ethics boundaries.  
- 90 days: selective scale; “wins” list worth operationalizing + credible “not yet” list.

<a id="policy-internal-discovery-tech"></a>

**Policy (internal) — Discovery Lab technology / IP**

| Topic | Policy |
|-------|--------|
| **Model providers / keys** | Prefer **client-owned API keys** and **enterprise / zero-retention** settings where available; otherwise document provider + data flow in DPA exhibit. |
| **Sandbox** | **Client-owned** sandbox tenant when possible; Movemental may administer **during** sprint, **revoked at handoff**. Token costs: **either** included up to a **SOW-stated cap** **or** pass-through—**pick one** and write it in SOW. |
| **Prompts & experiment logs** | **Client owns** customer-specific prompts, logs, and outcomes in the handoff pack. **Movemental** may retain **anonymized methodology improvements** only if contract says so; default stance: **client owns project artifacts**. |

**Board involvement:** Not required for Discovery Lab **by default**; **sponsor + legal/comms** alignment per `discoveryReadinessRequires`. Governance **build** is where board access is explicit.

### Policy (internal) — Discovery Lab scope & volume

<a id="policy-internal-discovery-scope"></a>

*Caps so the **$5,000** sprint stays bounded; adjust via SOW. Tier A default—no production AI product implied.*

| # | Topic | Policy |
|---|--------|--------|
| 1 | **Use-case register** | **Must:** **≤12** candidate use cases inventoried with **priority, owner, data class, and stop conditions**; **≤5** marked for **Must** pilot in sprint. **Should:** “not yet” list with reasons. |
| 2 | **Executed experiments** | **Must:** **≥2** and **≤4** documented experiment briefs **run during the sprint** (each with hypothesis, dataset rules, outcome, go/no-go). **Could:** additional briefs if time. |
| 3 | **Playbook length** | **Must:** internal playbook **draft** covering propose → approve → run → retire workflow (**≤25 pages** equivalent or single structured Notion space). **Not:** production LangChain agent, fine-tuning, or multi-tenant product. |
| 4 | **Data for pilots** | **Synthetic or redacted by default** for shared demos; **production-like** data only when client signs **data-use acknowledgment** and DPA path is satisfied (see universal policy). |

---

### Foundation layer (`/system-builds/foundation`)

**List price:** **TBD** (not in `build-pricing.ts`).

**Positioning (from page copy)**

- Overview of how **governance + ethics** fit as **one operating spine** before deeper content, fundraising, or Discovery Lab.  
- Names decision rights, publishing rules, disclosure posture, formation-aware practice under pressure—**before** they’re needed.  
- Still described as a **guided sprint**: decisions, drafts, artifacts in the open—not a policy retreat that never lands in ops.

**Illustrative sprint-end artifacts (on page, not duplicated in `build-page-content` outputs array)**

- Decision maps and authority paths across the executive layer.  
- Documentation core aligned to how you actually publish.  
- Ethics framework for high-stakes calls tied to transparency commitments.

### Policy (internal) — Foundation layer

<a id="policy-internal-foundation"></a>

| # | Topic | Policy |
|---|--------|--------|
| 1 | **Relationship to Governance & ethics SKU** | **Foundation** = **orientation + spine overview** (how governance + ethics fit together **before** Content / Fundraising / Discovery Lab). **Governance & ethics** = **deep vertical** with the four named outputs in `build-page-content.ts`. **Do not** sell both as the same scope without clarifying: Foundation can be **prep** for a later Governance sprint **or** **lightweight** exec alignment when org is not ready for full governance build. |
| 2 | **Overlap / duplication** | If client buys **Governance & ethics** build, **Foundation** content should be **absorbed as Week 0/1 framing** or **waived**—avoid paying twice for the same spine narrative. Document choice in SOW. |
| 3 | **Pricing** | **No public list price** in code. **Internal default:** price Foundation at **~30–50% of Governance sprint** *or* **bundle as included** when sequenced with Governance in same quarter—**pick one rule** and stick to it in proposals until product publishes a number. |
| 4 | **Deliverable parity** | Foundation handoff should still include **mini handoff pack** (index + RACI stub + reading list + links to Governance deep dive)—lighter than full governance pack but **traceable**. |

**Still TBD (product)**

- [ ] Publish **Foundation** list price in `build-pricing.ts` when finalized  
- [ ] Decide whether Foundation is **always** a prerequisite SKU or **optional** narrative page only  

---

## Internal policy index (quick links)

| Build | Shipped outputs (`build-page-content.ts`) | Internal policy (this doc) |
|-------|---------------------------------------------|------------------------------|
| **Universal** | — | [Policy (internal) — universal](#policy-internal-universal) |
| **Content** | [Content system build](#content-system-build-system-buildscontent) | [Policy (internal) — Content](#policy-internal-content) |
| **Fundraising** | [Fundraising system build](#fundraising-system-build-system-buildsfundraising) | [Policy (internal) — Fundraising](#policy-internal-fundraising) |
| **Governance & ethics** | [Governance & ethics build](#governance--ethics-build-system-buildsgovernance-ethics) | [Policy (internal) — Governance](#policy-internal-governance) |
| **Discovery Lab** | [Discovery Lab](#discovery-lab-system-buildsdiscovery-lab) | [Technology / IP](#policy-internal-discovery-tech) · [Scope & volume](#policy-internal-discovery-scope) |
| **Foundation** | [Foundation layer](#foundation-layer-system-buildsfoundation) | [Policy (internal) — Foundation](#policy-internal-foundation) |

---

## Integration between builds (how they fit together)

From `integrationBullets` (`pathway-data.ts`) — **summary bullets for buyers**

- Content is not separate from formation or fundraising—it is the **discoverable spine** supporters and participants move through.  
- Fundraising gains when story, evidence, and pathways are **structured**—not only when asks get louder.  
- Discovery Lab produces documented use cases, owners, measures—AI **assists** workflows instead of inventing risk.  
- Governance stabilizes publishing, partnerships, and AI boundaries so teams do not **improvise ethics under pressure**.

---

## Natasha-style question bank (COO / risk / ops)

Use this as a checklist for sales engineering and legal. Many rows are now answered in **[Policy (internal) — universal](#policy-internal-universal)** and the per-build policy tables—update proposal boilerplate accordingly.

| # | Question | Where answered |
|---|-----------|----------------|
| 1 | Week 4 deliverable **formats**? | Handoff pack + SOW choose formats; policy defines **contents** |
| 2 | Movemental staffing? | Policy: named roles on SOW |
| 3 | Sync hours / week? | Policy: **90 min live/week** + async course |
| 4 | Sponsor leaves? | Policy: pause / suspend / credit |
| 5 | PII / youth / donor? | Policy: PII + data minimization section |
| 6 | Subprocessors? | Policy: DPA + living list (template TBD) |
| 7 | Warranty / fix-it? | Policy: **30-day** factual/template fix-it |
| 8 | Discovery Lab without board? | Policy: default **yes**; board explicit in **Governance** build |
| 9 | Template IP ownership? | Policy: **client owns customer outputs**; methodology license **confirm with counsel** |
|10 | Pause? | Policy: **60 days once** |
|11 | Travel? | Policy: remote-first; reimbursable if CO |
|12 | Movemental vs. client stack? | Policy: Tier A vs Tier B |
|13 | Mandatory vs. stretch? | Policy: **MoSCoW end of week 1** |
|14 | References / case studies? | Still **TBD**—add links when available |
|15 | Content volume / CMS / migration / WCAG? | [Policy (internal) — Content](#policy-internal-content) |
|16 | CRM list, donor PII classes, gift officer hours? | [Policy (internal) — Fundraising](#policy-internal-fundraising) |
|17 | Board packet, jurisdiction, accreditation depth? | [Policy (internal) — Governance](#policy-internal-governance) |
|18 | Discovery experiment count / playbook bounds? | [Policy (internal) — Discovery Lab scope](#policy-internal-discovery-scope) |
|19 | Foundation vs. Governance overlap / price? | [Policy (internal) — Foundation](#policy-internal-foundation) |

---

## Changelog

| Date | Author | Change |
|------|--------|--------|
| 2026-04-15 | Leadership + audit | Added **Policy (internal)** (commercial, cadence, handoff, tech tiers, data/legal, post-sprint). Bundle **$25k** internal vs **$30k** code note. Filled Discovery Lab tech/IP. |
| 2026-04-15 | Leadership + audit | **Content system build:** added **Policy (internal)** table (12 topics: volume caps, CMS tiers, Tier A vs B tenant, migration pilot limits, WCAG scope, editorial SoT, brand prereq, multimedia caps, localization out-of-scope, pathway Must, interview cap, post-handoff publishing). Removed standalone open-question list. |
| 2026-04-15 | Leadership + audit | **Fundraising system build:** added **Policy (internal)** table (CRM Tier‑1 list, PII classes + minimum-necessary, dev/MGO hours, Tier A prototype vs Tier B production). |
| 2026-04-15 | Leadership + audit | **Documentation pass:** TOC, “How to use,” policy vs. code disclaimer, glossary (Tier A/B, handoff, RACI, COI), **Governance** + **Foundation** internal policy tables, **Discovery Lab** scope/volume caps, **Internal policy index** table, Natasha bank rows 15–19, changelog. |

---

*End of reference.*
