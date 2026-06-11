# AI-reality / readiness assessment instruments — inventory

> **BUILD NOTE (2026-06-10):** The "Organizational AI Reality Assessment" front door +
> "AI Reality Dashboard" were built additively on these instruments. New code: `src/lib/ai-reality/`,
> `src/app/agent/{assessment,invite}`, `src/app/team-invite/[token]`, `src/app/dashboard/ai-reality`,
> `src/app/share/ai-reality/[token]`, `src/app/api/ai-reality/{submit,invite,email}`. New tables:
> `ai_reality_results`, `ai_reality_org_results`, `ai_reality_invites`, `ai_reality_share_tokens`
> (migrations `scripts/sql/20260610_ai_reality_{invites,results}.sql`). Reuses MAP_Q/`computeMapRead`
> and `computeSsssIntegrityResult` as-is.

**Generated:** 2026-06-10  
**Scope:** What actually exists across `movemental-ai`, `movemental-dashboard`, `yf-np-dashboard`, and referenced sibling repos — not a design for a new front door.

**Repos checked:** `movemental-ai` (primary), `movemental-dashboard`, `yf-np-dashboard`, `movemental-ai-agents` (agent prompts only).  
**Note:** `movemental-ai` is mid **agent-only** pivot — most marketing assessment UIs and the full `(dashboard)` / SandboxLive tree live under `_archive/pre-marketing-migration-2026-06/` or in `movemental-dashboard`, not in live `src/app/(site)`.

---

## Summary table

| Instrument | State | Participants | Magic link? | Dashboard? |
|------------|-------|--------------|-------------|--------------|
| **Youthfront pre-engagement assessment** (MOU + readiness intake) | **Contract + partial build** — MOU PDF; DB schema + archived UI; no live dashboard synthesis | Per-participant async; team + org synthesis **promised in MOU, not fully built** | **Token link** for anonymous staff intake (`/readiness-invite/[token]`, archived); MOU says “organizational dashboard” | **Partial** — admin CSV/list in `movemental-dashboard` Phase 02; **no** MOU-style team/org synthesis UI |
| **Organizational Reality Map** (agent room) | **Production** — `/agent` + `MAP_Q` | Single visitor (session) | **`/assess`** → Supabase OTP → `/agent` (optional identity) | **In-session readback only**; optional email capture → `agent_room_leads` |
| **Field Guide “Take Stock” self-assessment** | **PDF / doc content** — not a web app | Leadership team (15 Q, not 5) | No | No — worksheet inside PDF |
| **Sandbox Phase 02 — Current Reality Map** | **Production** in `movemental-dashboard` | Authenticated cohort members | Share token for **generic** assessment results (`/assessments/share/[token]`) | **Admin** cohort list + CSV; **no** auto team synthesis |
| **Sandbox staff readiness intake** (Week 0 / pre-engagement) | **Schema + API live**; **UI archived** | Per staff; anonymous via invite | **Yes** — hashed invite token | Facilitator invite panel + exports (archived routes) |
| **SSSS Path Integrity diagnostic** (18 Likert) | **API live**; **UI archived** | Org / leadership | No | Inline computed result; optional `analytics_events` only |
| **Integrity Diagnostic** (22 MCQ) | **API live**; **UI archived** | Senior leaders (+ colleagues) | No | **Human-written** narrative read-back (operational promise); rows in DB |
| **Safety Self-Assessment** (7 Q) | **Archived UI only** | Team | No | Client-side tier readback only |
| **Dual-intelligence diagnostic** (~30 Likert) | **DB + CRUD only** — question bank **removed** from repo | Was single submitter | No | Was JSON readout; **`/api/assess/dual-intelligence` route absent** |
| **System readiness diagnostic** (25 Likert) | **DB + CRUD only** — question bank **removed** | Was single submitter | No | Was JSON readout; **`/api/assess/system-readiness` route absent** |
| **Formation maturity** (`/assess/formation`) | **Doc-only** — referenced in launch notes, **no route or lib** | — | No | No |
| **yf-np-dashboard / `prospect_search`** | **Production** — donor intel, **not** org AI readiness | Fundraising ops | No | Prospect profiles — **different product** |
| **Legacy `POST /api/assess`** | **Misnamed** — serves Integrity Diagnostic, not generic assess | — | No | — |
| **mDNA assessment HTML template** | **Static artifact** | Individual learner | No | Template only |

---

## 1. Youthfront pre-engagement assessment & organizational dashboard

### Name & where it lives

| Layer | Location |
|-------|----------|
| **Contract (canonical promise)** | `public/downloads/youthfront-implementation-mou.pdf` → `/downloads/youthfront-implementation-mou.pdf` |
| **Org slug constant** | `src/lib/legal/agreement-catalog.ts` — `YOUTHFRONT_ORG_SLUG = "youthfront"` |
| **Question bank (staff readiness)** | `_archive/pre-marketing-migration-2026-06/lib/sandboxlive/readiness-intake-sections.ts` (`READINESS_INTAKE_VERSION = "2026-05-15"`) |
| **Youthfront overrides** | `_archive/.../readiness-org-overrides.ts` — hides `time_per_week`, `best_time` for Youthfront; extra `youthfront_use` question |
| **Authenticated intake UI** | `_archive/.../app/(dashboard)/sandboxlive/readiness/page.tsx` + `readiness-intake-wizard.tsx` |
| **Anonymous magic-link intake** | `_archive/.../app/readiness-invite/[token]/page.tsx` |
| **Invite server** | `_archive/.../lib/sandboxlive/readiness-invite.server.ts` |
| **Parallel instrument (cohort map)** | `movemental-dashboard/src/lib/assessments/phase-02-current-reality-map.ts` |
| **Nonprofit customer shell** | `movemental-dashboard` — `/dashboard/path/**` (Safety artifacts; not the readiness wizard) |
| **Donor dashboard (separate)** | `yf-np-dashboard` — prospect search / profiles (**not** this assessment) |

### State

- **MOU:** Production legal artifact (May 12, 2026).
- **Implementation:** **Partial / split-brain.** Database tables and simplified APIs exist in shared Supabase; **live UI routes were archived** from `movemental-ai` during the agent-only pivot. **`movemental-dashboard`** ships Phase 02 Current Reality Map + admin views; **MOU-described team-level and cross-team synthesis dashboards are not implemented** as automated products (Future Plan editor shows “Planned” synthesis assistant in archive).

### Questions & inputs (staff readiness intake — archived canonical bank)

**9 sections**, **69 questions** (count of `type:` fields in `readiness-intake-sections.ts`; question `id`s are a **public contract**). Section ids: `about`, `week`, `stack`, `experience`, `sentiment`, `ministry`, `capacity`, `goals`, plus Youthfront-only fields.

Representative verbatim prompts (not exhaustive):

- **About:** full name, work email, role, team (single-select incl. Camps & retreats, Development & fundraising, …), tenure, work setting (multi).
- **Week:** hours/week band; sliders for % meetings, focused work, admin/comms, relational work; energizing/draining/time-eater text areas.
- **Stack:** email tool, docs, CRM, PM, comms, design, social, video, finance, camp ops (Youthfront-specific multi), where work lives (shared vs siloed), tools list.
- **Experience:** AI used (single); **mental model** (single + optional “Other” textarea); tools tried (multi); tasks (multi); **`youthfront_use`** (Youthfront org only); confidence slider 1–10; winning/failing text.
- **Sentiment:** 8 Likert items (excited, worried, overwhelmed, save time, threat, trust, disclosure, avoid, curious) + “three words for AI”.
- **Ministry:** off-limits / fair-game multis; ministry concerns & hopes (textarea).
- **Capacity:** tech comfort slider; learning style (multi); past learning; time per week; best time (hidden for Youthfront); format preferences; safe experiment textarea.
- **Goals:** magic wand, most hope, worried about, questions, anything else.

**Response types:** `text`, `textarea`, `single`, `multi`, `likert` (5-point), `slider` (numeric).

**Scoring / gap logic:** **None automated** in code — qualitative intake for facilitation and CSV export. MOU promises **team-level synthesis** and **cross-team synthesis** as deliverables (human/facilitator-authored, not wired as generated dashboards).

### Mapping to Safety / Sandbox / Skills / Solutions

- Intake is **pre-Sandbox / Week 0** — maps to **Sandbox** discovery inputs (workflows, tools, sentiment, protected categories) and informs **Skills** (learning style, capacity) and **Safety** (off-limits, data handling in `about.data_handling`).
- Not scored against the four stages; used to **personalize recipes** and cohort facilitation.

### Delivery & access

| Mode | Mechanism |
|------|-----------|
| **Authenticated staff** | `(dashboard)/sandboxlive/readiness` — Supabase login, org context (`?org=youthfront`) — **archived** |
| **Anonymous staff** | Facilitator creates invite → raw token URL `/readiness-invite/{token}` — **archived**; token stored as SHA-256 in `sandbox_staff_readiness_invites.token_hash` |
| **MOU language** | “Digital assessment from movemental.ai through Youthfront’s **organizational dashboard**” — aligns with archived SandboxLive dashboard, **not** the public `/assess` magic-link flow |

**Who sees what:** Participant sees own wizard; facilitators see invite panel + submissions (org-scoped). **No built org-wide synthesis view** matching MOU “organizational read-back”.

### Dashboard / output

- **Per participant:** JSON `answers` blob on submission row.
- **Team level:** MOU + facilitation copy — **not** a shipped auto dashboard.
- **Cross-team:** MOU § organizational deliverable — **doc/facilitator workflow**, no repo route named for it.
- **Phase 02 admin** (`movemental-dashboard`): list submissions, detail view, **CSV export** — `Phase02AdminClient.tsx`.

### Storage / data model

| Table | Purpose |
|-------|---------|
| `sandbox_staff_readiness_submissions` | One row per `(organization_id, user_id)` — `answers` jsonb |
| `sandbox_staff_readiness_invites` | Token-gated anonymous entry |
| `sandbox_staff_readiness_anonymous_submissions` | Anonymous answers linked to `invite_id` |
| `assessments` + `assessment_questions` + `assessment_responses` + `user_assessments` | Phase 02 Current Reality Map (seeded per org, slug `phase-02-current-reality-map`) |

Migrations: `scripts/sql/20260514_sandbox_staff_readiness_submissions.sql`, `scripts/sql/20260514_sandbox_staff_readiness_invites_anon.sql`.

### Dependencies

- Drizzle schema in `src/lib/db/schema.ts` (shared Supabase `vhaiiiykcukrlyvwlgip`).
- Archived server actions: `readiness-intake.server.ts`, `readiness-invite.server.ts`.
- Phase 02 seed script referenced in dashboard: `scripts/seed-phase-02-assessment.ts` (dashboard repo).
- **Not** the agent-room `MAP_Q` instrument (different question set and length).

---

## 2. Organizational Reality Map (agent room)

### Name & where it lives

| Item | Path |
|------|------|
| Question bank + scoring | `src/lib/agent-room/data/map-q.ts` |
| Beat UI | `src/components/agent-room/screen/stub/beat-screen.tsx` |
| State / readback | `src/components/agent-room/use-agent-room-stub.ts`, `use-agent-room-hybrid.ts` |
| Capture after map | `src/lib/agent-room/capture.ts` → `POST /api/agent-room/capture` |
| Public entry | `src/app/assess/page.tsx` (magic link) → `src/app/auth/callback/route.ts` → `/agent` |
| Agent room | `src/app/agent/page.tsx` |

### State

**Production** — live routes and data file; primary “free reality check” in the agent-only site.

### Questions (6 — verbatim)

Ordered **gentlest-first** in `MAP_Q` (order affects beat UX, not scoring aggregation):

1. “Has your team tried AI against real work, in a way you could point to?” — 3 options → optional **Sandbox** gap signals.
2. “Has your board or leadership put anything in writing — what you will, and won’t, do with AI?” → **Safety** gaps.
3. “Could your leadership name every AI tool your staff already use — and what data each touches?” → **Safety** gaps.
4. “Picture your staff. How ready do they feel to use AI well?” → **Training** (maps to **Skills** in public vocabulary) gaps.
5. “Would it bother your team if a colleague used AI on shared work and didn’t say so?” → **Safety** gaps.
6. “Where does your team’s work live — could AI actually plug into it?” → **Tech** (maps to **Solutions** / fragmentation) gaps.

**Response type:** Single-select buttons; each option has agent `say` line and optional `read: { stage, line, sev }` where `sev` is 1–3.

**Scoring:** `computeMapRead(answers)` — per stage keeps **worst** gap; lists gaps **sharpest first**. Stages: `safety | sandbox | training | tech` (agent vocabulary; public path uses Safety / Sandbox / Skills / Solutions).

### Delivery & access

- **Anonymous** play-through in `/agent` (no save until capture).
- **`/assess`:** Supabase `signInWithOtp` magic link; callback lands authenticated user in `/agent` so map can tie to identity.
- **Map capture (`kind: map`):** email + optional first name → `agent_room_leads` with `map_answers` + `metadata.mapRead`; newsletter upsert source `assessment-map`; internal notify via `notifyAgentRoomLead`. **No automated “send my map” email yet** (comment in capture route: “map email is Phase 7”).

### Dashboard / output

- **In-session:** spoken/readback UI from `MapRead` (stage clear lines + gap list).
- **Post-capture:** DB row only; no participant-facing dashboard URL.

### Storage

`agent_room_leads` — `map_answers` jsonb, `metadata` jsonb (`mapRead`).

### Dependencies

- Agent engine tools: `render_beat`, `suggest_chips` (`movemental-ai-agents` room-host prompt).
- Supabase Auth OTP; `TENANT_ORG_ID` for lead persistence.

---

## 3. Field Guide “Take Stock” self-assessment

### Name & where it lives

- **PDF:** `public/downloads/movemental-it-starts-with-safety-field-guide.pdf` (canonical lead magnet).
- **Landing / email capture:** `src/app/field-guide/page.tsx`, `POST /api/toolkit-download`.
- **Section 3 content source (archived):** referenced as `src/components/sections-mock/toolkit-read/toolkit-read-content.tsx` in `scripts/generate-toolkit-text-review-html.mjs` — **file not present in live tree** (generator expects archived mock path).
- **Script catalog:** `scripts/generate-toolkit-text-review-html.mjs` embeds assessment copy for proofreading.

### State

**Doc-only / PDF worksheet** — not an interactive web assessment. Lead capture sends PDF via email (`recordFieldGuideLead`).

### Questions

**Not five questions** — canonical copy is **15 questions**, section titled **“Take this together”** (not a quiz; designed for **disagreement among leaders**).

Format per question (worksheet):

- Question text + **tension** framing.
- Two **position boxes** (A / B) — “competing reasonable views”.
- Space for “where your team landed”.

Intro copy (verbatim gist from generator): *“This is not a quiz… fifteen questions calibrated to produce disagreement… Each member writes their own answer first — literally writes it — before any conversation happens.”*

Full question list lives in the archived `ASSESSMENT_QUESTIONS` constant (not checked into live `src/`); recoverable from PDF or archived mock if restored.

**Scoring:** None — facilitation protocol (if 3–5 disagreements → typical; 6+ → fragmentation; &lt;3 → alignment or insufficient seriousness).

### Mapping to path

- **Safety stage only** — precedes Sandbox in the Field Guide narrative.
- Post-assessment copy routes to Safety engagement or self-serve toolkit.

### Delivery

- PDF download / email; **no magic link** to a scored dashboard.

---

## 4. Sandbox “Current Reality Map” / Phase 02 assessment

### Name & where it lives

| Item | Path |
|------|------|
| **Canonical question SSOT** | `movemental-dashboard/src/lib/assessments/phase-02-current-reality-map.ts` |
| Slug | `phase-02-current-reality-map` |
| Leader form | `movemental-dashboard/src/app/(dashboard)/dashboard/assessment/phase-02/` |
| Admin cohort view | `movemental-dashboard/src/app/(dashboard)/dashboard/admin/assessments/phase-02/` |
| Public generic assessment shell | `movemental-dashboard/src/app/(public)/assessments/[slug]/` |
| APIs | `movemental-dashboard/src/app/api/custom/assessments/phase-02-current-reality-map/*` |
| Stitch fixture (visual shell only) | `movemental-ai/src/lib/program/fixtures/sandbox/phase_02_assessment_sandboxlive_workspace.content.json` — **archived program route context** |
| Phase manifest | `_archive/.../lib/sandboxlive/phase-manifest.ts` — Phase 02 name **“Current Reality Map”** |

### State

**Production in `movemental-dashboard`** (authenticated product). **Not mounted** on live `movemental-ai` `(dashboard)` (that tree was removed/archived).

### Questions & inputs

**8 sections**, **55 questions** (count of `type:` fields in `phase-02-current-reality-map.ts`; exported as `PHASE_02_TOTAL_QUESTIONS`).

Sections: About you · Your work · Your tech stack · Your AI experience · How you feel about it · What you would protect · How you learn · Goals and curiosity.

Types: `text`, `textarea`, `single`, `multi`, `likert` (Strongly disagree → Strongly agree), `slider` (0–100% or 1–10).

Substantively parallel to **staff readiness intake** but **generic org** team options (not Youthfront camp-specific) and **no** `youthfront_use` / `mental_model` block.

**Scoring:** None — structured map for cohort customization (Phase 03 recipes).

### Mapping to path

- **Sandbox Phase 02** — “document where AI is in use today” (`phase-manifest.ts` produces line).
- Informs **Safety** boundaries (protected section) and later **Skills/Solutions** — not auto-staged.

### Delivery & access

- Requires **authenticated org member** + seeded `assessments` row for tenant.
- Submit: `POST .../phase-02-current-reality-map/submit` with `{ answers: Record<questionUuid, value>, completed? }`.
- **Share tokens:** generic `assessment_share_tokens` + `/assessments/share/[token]` — implementation returns **mDNA-style gift scores** (`apostolic_score`, etc.) for legacy assessment type, **not** Phase 02 map rendering (verify before reuse).

### Dashboard / output

- **Leader:** resume/edit own submission (`my-submission`).
- **Admin:** all cohort submissions, detail drawer, **CSV summary** export.
- **Synthesis:** `_archive/.../future-plan-editor.tsx` — UI placeholder for AI pulling Phase 02 maps; **“Planned… wired up once cohort data layer is populated.”**

### Storage

`assessments`, `assessment_questions`, `assessment_responses`, `user_assessments` (org-scoped).

---

## 5. Sandbox staff readiness intake (Week 0) — separate from Phase 02

Same as **§1 Youthfront** bank when org slug is `youthfront`; generic for other orgs.

**Live in movemental-ai today:** Drizzle tables + `src/app/api/simplified/sandbox-staff-readiness-{invites,submissions,anonymous-submissions}/route.ts` + hooks/services — **CRUD backbone only**, no public wizard route in live `src/app/`.

---

## 6. SSSS Path Integrity diagnostic (18 Likert items)

### Name & where it lives

- Items + compute: `src/lib/ssss-integrity-assessment/` (`items.ts`, `compute.ts`, `submit-schema.ts`)
- API: `GET|POST /api/assess/ssss-integrity` — comment: *“The single live assessment”* (API-only; UI archived)
- Archived UI: `_archive/.../components/assessment/ssss-integrity-diagnostic.tsx`
- Archived hub copy: `_archive/.../components/sections/assess/assess-page-content.tsx`

### State

**API production**; **UI archived**. POST stores optional row in `analytics_events` (not dedicated results table) when `TENANT_ORG_ID` set.

### Questions (abbreviated — full prompts in `items.ts`)

18 items, Likert 1–5 (“Not at all true” … “Fully true”), tagged by stage:

| Stage | Item ids | Themes |
|-------|----------|--------|
| Safety | Q01–Q04 | forbidden/review, decision rights, conviction lines, data tiers |
| Sandbox | Q05–Q08 | experiment log, compliant environments, portfolio, voice evidence |
| Skills | Q09–Q12 | distributed judgment, self-correction, verification norms, judgment vs buttonology |
| Solutions | Q13–Q16 | workflows, procurement gates, measurement, tool independence |
| Cross | Q17–Q18 | honest location / skips; incident posture |

**Scoring:** `computeSsssIntegrityResult` — stage subscores, normalized overall %, **dominant gap stage**, **illusion flags** (e.g. `safety_paper`, `shadow_sandbox`, `skills_theater`).

### Delivery

- Optional `email`, `audience` (from deprecated dual-intelligence audience list), `clientSessionId`.
- **No magic link**; localStorage persistence in archived UI only.

---

## 7. Integrity Diagnostic (22 multiple-choice)

### Name & where it lives

- Questions: `src/lib/integrity-diagnostic/questions.ts` (`INTEGRITY_DIAGNOSTIC_VERSION = "2026-05-02"`, **22** questions, **6 dimensions**)
- Shorter studio bank (12 Q): `src/lib/integrity-diagnostic/studio-questions.ts` — archived `IntegrityDiagnosticForm`
- API: `POST /api/assess/route.ts` (despite path, **only** integrity diagnostic)
- Email: `src/lib/email/integrity-diagnostic-notifications.ts`
- Table: `integrity_diagnostic_submissions`

### State

**API production**; **UI archived** (studio + sections-mock). Product promise on archived pages: **human narrative read-back in 5 business days** — not auto-generated in code.

### Questions

6 dimensions × 3–4 questions each; each answer is option index **0–3**. Shared option pools (e.g. safety maturity, visibility, scale). Optional **follow_ups** jsonb keyed by dimension id; optional `closing_note`.

**Scoring:** **Explicitly none** in schema/comments — qualitative submission for Movemental team review.

### Mapping

Dimensions align 1:1 with path concerns: sequence integrity → Safety ordering; sandbox truth → Sandbox; formation-not-training → Skills; solution restraint → Solutions; plus posture clarity & refusal capacity (Safety/governance).

---

## 8. Safety Self-Assessment (7 questions)

### Name & where it lives

- `_archive/.../components/sections-mock/start-with-safety/safety-self-assessment.tsx`
- Catalog PDF: `scripts/generate-pre-sandbox-ai-assessment-catalog-pdf.mts`

### State

**Archived UI** — client-only tier readback (`ready | refining | significant | beginning`) from flagged answers (“Partially” / “Not yet”).

### Questions (verbatim)

1. Do you know which AI tools your staff are already using?
2. Do you have written guidance for acceptable and unacceptable use?
3. Have you defined what information should never enter AI tools?
4. Do leaders agree on when human review is required?
5. Do staff know how to handle confidential, pastoral, donor, student, or client information?
6. Do you have a process for reviewing new AI use cases?
7. Can your team explain why your AI boundaries exist?

Options: Yes / Mostly / Partially / Not yet.

---

## 9. Dual-intelligence infrastructure diagnostic

### Name & where it lives (historical)

- Documented: `docs/build/notes/launch-artifacts-assessments-book-field-guide-and-media.md` — `/assessment-new`, `DualIntelligenceDiagnostic`, `POST /api/assess/dual-intelligence`
- Schema: `dual_intelligence_assessments` in `src/lib/db/schema.ts` — references **`src/lib/dual-intelligence-assessment/`** which **does not exist** in repo
- CRUD: `src/app/api/simplified/dual-intelligence-assessments/route.ts`
- Redirect: `next.config.ts` — `/assessment-new` → `/assess`

### State

**Half-built / stripped.** Table + admin CRUD remain; **question bank, compute, and public API route removed**. Launch doc still describes ~30 Likert questions (informational vs relational).

### Intended mapping (from docs)

Philosophy-level bottleneck across **dual intelligences** and infrastructure — **not** operational system readiness.

---

## 10. System readiness diagnostic

### Name & where it lives (historical)

- Schema: `system_readiness_assessments` — fields: `reality_situation`, `audience_context`, `likert_scores` (25×0–4), `bottleneck_note`, `result_payload` jsonb, version `sr-v1`
- Referenced lib path `src/lib/system-readiness/*` — **absent**
- CRUD: `src/app/api/simplified/system-readiness-assessments/route.ts`

### State

Same as dual-intelligence — **DB + CRUD only**, no live public instrument.

---

## 11. Formation maturity (`/assess/formation`)

**Doc-only.** Mentioned in launch notes and page-auditor references; **no** `src/app/assess/formation` route, component, or API in live or archived trees searched.

---

## 12. yf-np-dashboard / `prospect_search` (Non-Profit Dashboard)

### What it is

**Donor intelligence / prospect research dashboard** for Youthfront-style fundraising — **not** an organizational AI readiness assessment.

### Where

- Repo: `yf-np-dashboard`
- Prospect search index: `public/data/prospects-search-index.json` (~23k names)
- Agent docs: `_docs/_build/agents/donor-intel-assistant/AGENT.md` — “Prospect Search” tool
- UI: e.g. `src/pages/ProspectProfile.tsx`

### State

**Production** (separate Vite app). Scoring is **donor capacity/affinity** tiers, not Safety/Sandbox/Skills/Solutions.

---

## 13. movemental-dashboard — other assessment-adjacent surfaces

| Surface | Route | Notes |
|---------|-------|-------|
| Assessments index | `/dashboard/assessments` | Links Phase 02 leader + admin |
| Public assessments | `/assessments`, `/assessments/[slug]/take` | Generic seeded assessments |
| Simplified admin lists | `/api/simplified/{dual-intelligence,system-readiness,integrity-diagnostic}-*` | Operator CRUD on marketing submission tables |
| Customer path | `/dashboard/path/**` | Safety **artifacts** (guidebook layers), not readiness intake |
| Share link | `/assessments/share/[token]` | Legacy mDNA score payload |

Full route map: `movemental-dashboard/DIFF-DASHBOARD-VS-VISUAL-EDITOR.md` §6.2.

---

## 14. Static / HTML artifacts

| Artifact | Path | State |
|----------|------|-------|
| Pre-sandbox assessment catalog PDF | `docs/build/artifacts/pre-sandbox-ai-assessment-questions-full-catalog.pdf` (via `scripts/generate-pre-sandbox-ai-assessment-catalog-pdf.mts`) | Generated doc bundling Safety 7Q + Integrity 22Q + SSSS 18 |
| mDNA assessment HTML | `public/templates/library/pastoral-warm/assessment-mdna.html` | Theme template — **movement leader** gift assessment, unrelated to org AI path |
| Toolkit text review HTML | External `docs-html/toolkit-text-review.html` generator | Field Guide + 15Q worksheet copy |

---

## Naming inventory

| Name used | Where it appears | Refers to |
|-----------|------------------|-----------|
| **Organizational Reality Map** | `map-q.ts` header; `/assess` marketing copy | Agent 6-question `MAP_Q` |
| **Reality map / reality check** | Agent room beats, capture variant `map` | Same as above |
| **Current Reality Map** | SandboxLive phase manifest; Phase 02 assessment name | Long-form Phase 02 / readiness intake family |
| **Pre-engagement assessment** | MOU; `safety-sandbox-and-audiences-content-inventory.md` Week 0 | Staff readiness intake |
| **Staff AI readiness intake** | `readiness-intake-sections.ts` | Same intake wizard |
| **Phase 02 — Current Reality Map** | `movemental-dashboard` slug | Seeded DB assessment (55 Q) |
| **Integrity Diagnostic** | `/api/assess`, archived `/assess` pages | 22Q human-reviewed diagnostic |
| **Movemental Path — integrity diagnostic** | SSSS UI / `/api/assess/ssss-integrity` | 18 Likert SSSS instrument |
| **SSSS Path Integrity / SSSS integrity** | `ssss-integrity-assessment/` | Same 18-item Likert |
| **Safety Self-Assessment** | `start-with-safety` archived page | 7Q Safety-only check |
| **Take Stock / Take this together** | Field Guide §3 PDF & generator | 15-question leadership worksheet |
| **Dual-intelligence diagnostic** | Launch docs, DB table | Removed public instrument |
| **System readiness diagnostic** | Launch docs, DB table | Removed public instrument |
| **Formation maturity** | Launch docs only | **Not built** |
| **Assessments hub** | Former `/assess` marketing hub | Was multi-instrument; **live `/assess` = magic link only** |
| **Readiness Assessment** | MOU deliverable #3 per team | Post-Sandbox memo template (doc), not pre-engagement intake |
| **Non-Profit Dashboard** | Internal docs | Often `movemental-dashboard` `/dashboard/path` or **`yf-np-dashboard`** — clarify which |
| **prospect_search** | yf-np-dashboard agents | Donor search — **not** readiness |
| **Assessment map** | `agent_room_leads`, newsletter source `assessment-map` | Email capture after agent map |

---

## Gaps and ambiguities

1. **Front door vs MOU delivery:** MOU promises assessment via **organizational dashboard** with **team synthesis**; live public front door is **`/assess` → OTP → `/agent`** (6Q map), a different instrument and depth.
2. **Two long-form intakes:** **Staff readiness** (~60 Q, Youthfront-tuned) vs **Phase 02** (~56 Q, generic) — overlapping purpose, different codepaths; unclear canonical merge.
3. **Archived dashboard UI:** SandboxLive readiness routes, Future Plan synthesis, and `(dashboard)` shell **removed from live movemental-ai** but **MOU and docs still describe them**.
4. **Dual-intelligence & system readiness:** Docs and DB imply full instruments; **lib + `/api/assess/*` routes missing** — only simplified CRUD remains.
5. **Formation maturity:** Referenced in IA docs; **no implementation**.
6. **Field Guide “Take Stock”:** User-facing name varies; **15 questions in canon**, not 5; **no web form** — PDF worksheet only.
7. **Map capture email:** `kind: map` persists leads but **does not email the map** to participants yet.
8. **Share tokens:** Generic share route appears tied to **legacy mDNA scoring**, not Phase 02 or agent map.
9. **Cross-team synthesis:** MOU organizational deliverable — **no automated dashboard** found; facilitator/manual.
10. **Agent map vs authenticated identity:** Magic link ties session to user, but **map answers live in `agent_room_leads`**, not `user_assessments` / assessment_responses chain.
11. **Naming collision:** “Integrity Diagnostic” (22Q, human read-back) vs “SSSS integrity diagnostic” (18 Likert, auto-scored) vs “Organizational Reality Map” (6Q, agent).
12. **`prospect_search` confusion:** Not part of AI readiness — donor intel in sibling repo.
13. **Launch notes staleness:** `launch-artifacts-assessments-book-field-guide-and-media.md` describes `/assess` hub with three instruments; **live `/assess` is OTP gate only** (hub archived).

---

## If you were wiring a public, low-friction front door (build-on note)

The closest **production** path today is **`/assess` (Supabase OTP) → `/agent` (6-question Organizational Reality Map)** with optional **`agent_room_leads` persistence** on email capture — already scoped for low friction and tenant-stamped leads. To reach **MOU-grade depth** (20–30 min async, team synthesis, magic-link cohort collection), the build-on pieces are largely **already authored but archived or in `movemental-dashboard`**: **`readiness-intake-sections.ts` / Phase 02 question SSOT**, **`sandbox_staff_readiness_*` tables + invite tokens**, and **Phase 02 admin CSV/submission APIs** — not the removed dual-intelligence/system-readiness marketing diagnostics. A front door should **explicitly choose** whether it feeds the **short agent map** (conversation + gap readback) or the **long intake** (DB assessment rows + facilitator dashboard), because they use **different storage models** and **different names** in the codebase; merging them without a product decision will duplicate MOU/intake overlap. **`movemental-dashboard`** remains the host for **authenticated cohort assessment + admin views** on the shared Supabase DB; **`yf-np-dashboard` is unrelated** (donor prospects). Field Guide **Take Stock (15Q)** remains a **PDF leadership worksheet**, not an API-backed instrument.
