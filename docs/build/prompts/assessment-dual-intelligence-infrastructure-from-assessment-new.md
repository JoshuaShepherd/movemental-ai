# Build prompt — Dual-intelligence infrastructure assessment (from `/assessment-new`)

**Purpose.** Turn the scaffold at [`src/app/(site)/assessment-new/page.tsx`](../../../src/app/(site)/assessment-new/page.tsx) into the **canonical public diagnostic** that tests organizational readiness for **informational** and **relational** intelligence **infrastructure**, aligned with the **six-stage arc** on [`/fragmentation`](../../../src/app/(site)/fragmentation/page.tsx), the fragmentation manuscript (especially **Chapter 2 — Two intelligences**, **Chapter 11 — Library / pathways / voice**, **Chapter 12 — Formation at the seam**, **Chapter 15 — Orbits and infra channels**), and site copy in [`AssessmentEntryContent`](../../../src/components/sections/nonprofit-funnel-new/AssessmentEntryContent.tsx) + [`assessmentEntry`](../../../src/components/sections/nonprofit-funnel-new/nonprofit-content.ts).

**This is not** a repeat of the **System Readiness Diagnostic** on [`/assess`](../../../src/app/(site)/assess/page.tsx) — that instrument ([`src/lib/system-readiness/questions.ts`](../../../src/lib/system-readiness/questions.ts)) optimizes for **operational dimensions** (knowledge, SSOT, ops, leadership, AI readiness, visibility, formation structure, fundraising). The dual-intelligence assessment optimizes for **paired intelligences × foundation × stages**, explicitly scoring **which intelligence is lagging** and **which stage is the bottleneck**, in the vocabulary the book and `/fragmentation` already teach.

**Hard constraint (do not merge):** `/assess` and `/assessment-new` remain **two products**. Do not unify them in **UI copy**, **Likert/scoring code**, **results payloads**, or **CRM / lead field language** without an **explicit in-repo product decision**. See [`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) §5.

---

## 1. Agent pre-read (do not skip)

1. **Scaffold + promise:** `assessment-new/page.tsx` → `AssessmentEntryContent` → `assessmentEntry` bullets (stage score, field score, one next stage).
2. **Narrative SSOT:** `/fragmentation` + `FragmentationStoryNewShell` chapter ids: `fragmentation` → `integration` → `activation` → `formation` → `multiplication` → `movement` (section anchors `stage-*`).
3. **Book (manuscript folder):**  
   - `docs/book-development/fragmentation-manuscript-ordered/02-two-intelligences.md` — definitions, asymmetry by audience (leader / nonprofit / church / institution), ten+ten categories.  
   - `docs/book-development/fragmentation-manuscript-ordered/11-the-library-the-pathways-the-voice.md` — three informational surfaces.  
   - `docs/book-development/fragmentation-manuscript-ordered/12-formation-as-the-moral-stage.md` — seam between intelligences; formation not reducible to structure alone.  
   - `docs/book-development/fragmentation-manuscript-ordered/15-orbits-and-infra-channels.md` — infra channels vocabulary (informational: discovery, grounded response, translation, access; relational: memory, communications, network awareness, participation).
4. **Design + migration:** [`docs/design/DESIGN.md`](../../design/DESIGN.md) and [`docs/build/prompts/stitch-to-react-migration.md`](stitch-to-react-migration.md) for tokens, primitives, and client-boundary discipline.
5. **Persistence (code SSOT):** Inspect Drizzle tables in [`src/lib/db/schema.ts`](../../../src/lib/db/schema.ts): `system_readiness_assessments` (marketing diagnostic today), `assessments` / `assessment_questions` / `assessment_responses` / `user_assessments` (generalized assessment chain, **organization-scoped**). Choose one approach in §5; do not invent a third storage shape without migration.

**Optional:** If your environment has **Supabase MCP**, confirm live columns match `schema.ts` for the table you extend or add (`system_readiness_assessments` vs `assessment_questions`). The repo schema is authoritative for types and services.

---

## 2. Product definition

### 2.1 One-sentence outcome

After submission, the user receives a **short readout** (not a generic PDF) that states:

1. **Primary bottleneck stage** — one of the six chapters (the stage where scores imply the most friction *ahead* of compounding).  
2. **Weaker intelligence** — informational, relational, or **balanced gap** (both below threshold).  
3. **Top 2–3 infra themes** — mapped to Ch. 15 channels (e.g. “relational memory + informational translation”).  
4. **One next conversation** — same CTA posture as `/assess` (contact / walkthrough), optionally deep-linked to `/fragmentation` with `?audience=&field=` pre-filled when it helps.

### 2.2 Explicit non-goals

- Not APEST / MDNA / gift inventory (do not reuse `user_assessments` APEST columns semantically).  
- Not a 200-question research instrument — target **completed in 8–12 minutes**.  
- Not “AI maturity” as the headline — AI may appear as a **subset** of activation/multiplication only where the book allows grounded response.

### 2.3 Audience routing

Mirror **book Ch. 2 asymmetry** in copy and optional weighting (implementation detail):

| Context | Default hypothesis (for copy tone only) |
|--------|-------------------------------------------|
| Movement leader / author / teacher | Informational over-invested; relational graph under-integrated |
| Nonprofit / mission org | CRM slice of relational; informational corpus / decision memory weak |
| Church / ministry | Both in pastor memory; weak explicit foundations |
| Institution / network | Formal informational layers siloed; relational alumni/partner graphs under-linked |

Use the same **context picker** pattern as system readiness (`CONTEXT_OPTIONS` shape) but **rename labels** if needed to match site audience pages (`/who-its-for`, institutions, nonprofits, churches, movement leaders).

---

## 3. Instrument shape (UX)

1. **Intro** — Reuse `assessmentEntry` promise; replace “Scaffold” CTA with live flow; link to `/fragmentation` for vocabulary.  
2. **Block A — Situation** (single choice, 4–5 options): adapted from `REALITY_OPTIONS` but **reworded** so each option names **both** intelligences where relevant (book’s “half the whiteboard”).  
3. **Block B — Context** — audience / org type (parallel to `CONTEXT_OPTIONS`).  
4. **Block C — Likert bank** — **30 items**, 5-point, labels aligned with `LIKERT_LABELS` or a softer “Rarely → Consistently” scale **if** user testing shows intimidation; keep **0–4 storage** for scoring.  
5. **Block D — Optional free text** (1 field): “What would break first if your best person left tomorrow?” (surfaces succession / tacit load from Ch. 2–3 themes without leading the likert).  
6. **Results** — Server-computed JSON readout + optional persistence (see §5).

**Accessibility:** One question per screen or grouped by **section header** with clear `fieldset` / `legend`; respect reduced motion; no essential information from color alone.

---

## 4. Canonical metadata on every likert item

Each stored question MUST carry (in code constants or DB JSON metadata):

| Key | Values |
|-----|--------|
| `intelligence` | `informational` \| `relational` |
| `stage` | `fragmentation` \| `integration` \| `activation` \| `formation` \| `multiplication` \| `movement` |
| `infra_channel` (optional) | `discovery` \| `grounded_response` \| `translation` \| `access` \| `memory` \| `communications` \| `network_awareness` \| `participation` |
| `book_anchor` | Short string, e.g. `ch02-categories`, `ch11-library`, `ch15-memory` |

Scoring aggregates:

- **Per intelligence:** mean of items for that intelligence (or weighted mean if you add weights in `assessment_questions.weight`).  
- **Per stage:** mean across both intelligences for that stage (stage health).  
- **Bottleneck stage:** lowest stage mean, **with tie-break** — prefer the **earlier** stage in the arc when within ε (0.15), so you “fix the foundation first.”  
- **Weaker intelligence:** compare overall informational vs relational means; flag “balanced” if \|Δ\| < ε.

Narrative layer: map lowest 2–3 **stage × intelligence** cells to **plain-language recommendations** using Ch. 11–12 and Ch. 15 vocabulary (no raw jargon dump in the primary readout).

---

## 5. Persistence strategy (pick one)

**Option A — New assessment version (recommended for fastest ship)**  
Extend the pattern of `system_readiness_assessments`: add e.g. `dual_intelligence_assessments` table **or** add `assessment_version: "di-v1"` and new columns to a generalized marketing assessments table. Store `likert_scores` as ordered array + `result_payload` JSON mirroring `computeSystemReadinessResult`-style server compute in a **new** `src/lib/dual-intelligence-assessment/` module (mirror `src/lib/system-readiness/`).

**Option B — Full `assessment_questions` chain**  
Seed rows for a new `assessments` slug (e.g. `dual-intelligence-infrastructure-v1`) per tenant `organization_id` (see schema constraints). Good if assessments must be **editable in admin** without deploy. Requires seed migration + hooks wiring.

**Do not** overload `SYSTEM_READINESS_QUESTIONS` with mixed semantics; keep sr-v1 pure. If reusing POST route patterns, version the API path or body discriminator (`assessment_kind: "system_readiness" | "dual_intelligence"`).

---

## 6. Proposed likert bank (30 items, v1)

**Instructions to the implementer:** Preserve **order** for analytics continuity. Prompts may be tightened for tone in implementation; **do not** change `intelligence` / `stage` / `infra_channel` assignment without updating the scorer and any seeded DB rows.

**Scale (stored 0–4):**  
0 = Not true / rarely · 1 = Slightly · 2 = Partly · 3 = Mostly · 4 = Fully / consistently  

---

### Block C — Informational intelligence (15 items)

| # | `stage` | `infra_channel` | Prompt |
|---|---------|-------------------|--------|
| 1 | fragmentation | discovery | Important knowledge still lives only in scattered files, inboxes, or one person’s head—not because we lack tools, but because nothing has been gathered on purpose. *(reverse-scored: true = bad → implement as reverse_scored in schema)* |
| 2 | fragmentation | translation | We can name multiple “canonical” versions of the same idea across websites, decks, and documents—with no clear designated source. *(reverse)* |
| 3 | integration | translation | We have a **designated place** where finished knowledge is supposed to live (a library, corpus, or SSOT)—and people actually use it. |
| 4 | integration | access | Permissions and ownership for who can publish or change canonical material are clear enough that we do not fear accidental drift. |
| 5 | integration | discovery | Someone new could orient to our core frameworks in a day without needing private tours of ten folders. |
| 6 | activation | discovery | People can **find** the right material when they need it (search, navigation, or grounded lookup)—not only when they already know where to look. |
| 7 | activation | grounded_response | When we use AI or summarization, answers are **scoped and attributable** to our corpus—not generic web opinion. |
| 8 | activation | translation | We reuse and link prior work instead of re-creating near-duplicate explainers every quarter. |
| 9 | formation | translation | Our pathways (cohorts, courses, curricula) draw on the same canonical content the public site does—not a parallel unpublished stack. |
| 10 | formation | access | People can move through learning in order (steps, prerequisites, “what’s next”) rather than only browsing disconnected pieces. |
| 11 | formation | grounded_response | Staff and volunteers can answer “why do we teach it this way?” from shared sources, not only oral tradition. |
| 12 | multiplication | discovery | Our best ideas are discoverable beyond the inner circle (SEO, citations, partner-facing libraries, or equivalent). |
| 13 | multiplication | translation | We can repackage depth into briefings, grants, or partner kits **without** rewriting from scratch each time. |
| 14 | movement | participation | External partners or carriers can **use** our frameworks with integrity (licensing, glossaries, or partner toolkits)—not only admire them from afar. |
| 15 | movement | access | We meter reach (seats, credentials, commerce) without fragmenting the canon into conflicting private copies nobody can sync. |

**Note on item 1–2:** Implement **reverse scoring** in the scorer (store raw 0–4, convert for aggregation: `score = 4 - raw` when `reverse_scored` is true). If reverse scoring is too confusing in UI, flip the wording to positive phrasing and drop reverse flags.

---

### Block C — Relational intelligence (15 items)

| # | `stage` | `infra_channel` | Prompt |
|---|---------|-------------------|--------|
| 16 | fragmentation | memory | Relationship history and context reset when a key staff person changes—or lives in private inboxes nobody else can see. *(reverse)* |
| 17 | fragmentation | network_awareness | We could not produce a credible map of who actually matters in our network (peers, donors, partners, endorsers) beyond a vague sense. *(reverse)* |
| 18 | integration | memory | Important relationships have a **durable record** (CRM, notes, or linked threads) that survives turnover—not perfection, but continuity. |
| 19 | integration | communications | Communications about a person or partner can be found attached to the record of **work artifacts** (proposals, grants, agreements)—not only in side channels. |
| 20 | activation | communications | Handoffs between teams (programs ↔ development ↔ comms) include enough context that the receiving side is not starting at zero. |
| 21 | activation | network_awareness | We know who introduced whom, who trusts whom, and which bridges are load-bearing—not only contact names. |
| 22 | formation | participation | Formation happens in named containers (cohorts, mentors, circles, pastoral rhythms) the organization supports—not only informal charisma. |
| 23 | formation | memory | We can see continuity of care for people in formation arcs (who walked with whom, what was committed, what’s next). |
| 24 | formation | network_awareness | Orbit is honest: we distinguish inner-ring relationships from expansion noise—we do not treat every follower as equally stewarded. |
| 25 | multiplication | participation | Trusted carriers (staff, volunteers, partners) are authorized to represent the work without bottlenecks at one hero leader. |
| 26 | multiplication | network_awareness | Partner and peer institutions are treated as nodes with edges (collaborations, introductions), not as static logos. |
| 27 | multiplication | memory | Donor / funder / board context is structured enough to brief a leader before a meeting without last-minute archaeology. |
| 28 | movement | participation | The field outside our walls (alumni, hubs, allied orgs) can carry practice forward with integrity—scenius-like loops exist on purpose. |
| 29 | movement | communications | When collaborations restart after years, we do not fully “start at zero” because shared memory and artifacts are findable. |
| 30 | movement | access | Access to inner formation or trusted roles is gated ethically (clarity, consent, boundaries)—not an accidental free-for-all dashboard. |

---

## 7. Situation block (Block A — proposed options)

Replace generic “AI disconnected” framing with **paired** language where possible:

1. **Scattered informational, invisible relational** — “Our ideas and documents are everywhere; our real network mostly lives in a few people’s heads and phones.”  
2. **Tool-heavy relational, thin informational** — “We track contacts and campaigns, but our knowledge, voice, and decisions are not a durable library.”  
3. **High activity, low foundation** — “We produce constantly, but there is no layer underneath that carries forward across tools and people.”  
4. **AI experiments without house** — “We are trying AI, but it is not grounded in a corpus and governance we trust.”  
5. **Everything at once** — “We are paying the fragmentation tax in both intelligences and need a single place to start.”

Store `situation_id` on the assessment row for segmentation.

---

## 8. Results copy architecture (server-side)

Implement `computeDualIntelligenceResult(input)` returning at minimum:

```ts
type DualIntelligenceResult = {
  version: "di-v1";
  audience_context: string;
  situation_id: string;
  means: {
    informational: number;
    relational: number;
    by_stage: Record<"fragmentation" | "integration" | "activation" | "formation" | "multiplication" | "movement", number>;
    cells: Array<{ stage: string; intelligence: string; mean: number }>;
  };
  verdict: {
    bottleneck_stage: string;
    weaker_intelligence: "informational" | "relational" | "balanced";
    infra_themes: string[]; // 2–3 channel ids
  };
  copy: {
    headline: string;
    subhead: string;
    bullets: string[]; // max 5
    primary_cta: { label: string; href: string };
    secondary_cta?: { label: string; href: string };
  };
};
```

**Copy rules:**  
- Name **one** bottleneck stage + **one** weaker intelligence in the headline or first line.  
- Bullets must mix **informational** and **relational** recommendations when verdict is `balanced`.  
- Never shame; use book tone: **structural**, **paired work**, **inheritance**.

---

## 9. Engineering checklist

- [ ] New lib module + Zod submit schema + POST handler (mirror `src/app/api/assess/system-readiness/route.ts` patterns).  
- [ ] Telemetry category distinct from `system_readiness` (e.g. `dual_intelligence_assessment`).  
- [ ] Wire `assessment-new` CTA to live flow; if `/assess` acts as an **assessments hub**, it **explains and routes** to **both** instruments — **never** merges scoring, results, or lead semantics ([`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) §5).  
- [ ] Unit tests: scorer tie-break, reverse scoring, balanced intelligence detection.  
- [ ] Optional: deep link to `/fragmentation?audience=&field=` from results when `weaker_intelligence` or bottleneck suggests it.

---

## 10. Definition of done

1. A visitor can complete the flow from `/assessment-new` without “coming soon” scaffolding.  
2. Results reflect **six stages × two intelligences** semantics consistent with `/fragmentation` and book Ch. 2 / 11 / 15.  
3. Stored payloads are versioned (`di-v1`) and reproducible from raw answers.  
4. `pnpm typecheck` and relevant tests pass; tokens and layout follow DESIGN.md.

---

## 11. PR / handoff block (for agents)

**Branch:** `slice/Sxx-dual-intelligence-assessment`  
**Title:** Add dual-intelligence infrastructure assessment (di-v1) from assessment-new scaffold  
**Summary:** Introduces a versioned likert instrument distinct from system readiness, scoring informational vs relational infrastructure across the six-stage fragmentation arc, with server-authored readouts and optional persistence. Updates assessment-new entry content to live CTAs and aligns copy with the book’s paired-intelligence framing.
