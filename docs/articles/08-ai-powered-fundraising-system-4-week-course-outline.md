---
author: Josh Shepherd
---

# AI-Powered Fundraising System — 4-Week Implementation Course

A structured implementation journey for **non-profit executives, development leaders, board members, and operations/comms staff** who are ready to deploy an **AI-assisted, human-centered fundraising system**: governed donor intelligence, scored prioritization, connection-informed cultivation, and measurable stewardship — without trading trust for throughput.

This course assumes you want **implementation**, not generic AI literacy. It pairs naturally with [AI Adoption for Non-Profits: A 4-Week Course for Leaders and Teams](./07-ai-adoption-for-nonprofits-course-outline.md) (orientation, charter, and playbook). Complete that first *or* run the Week 0 prerequisites below so governance and data boundaries are already in motion.

**Source material in this repo:** fundraising playbooks and rubrics under `_docs/_imported/04-fundraising/`, governance/ethics for donor intelligence under `_docs/_imported/03-governance-ethics/`, and the **two-map** product narrative (prospect landscape × relationship network) developed for the **non-profit dashboard** relationship-video work (`non-profit-dashboard` — prospect database + org-side connection graph).

---

## What “the system” is

A practical stack your organization can operate:

1. **Single narrative spine** — Case for support and messaging guide as the non-negotiable anchor for every AI-assisted draft.
2. **Governed intelligence** — Prospect research and enrichment using **approved tools and data classes**; no raw PII in consumer chatbots.
3. **Scoring & segmentation** — Composite donor/prospect scores (capacity, affinity, engagement, recency/frequency), personas, lifecycle stages, and segment-specific plays.
4. **Connection mapping** — Structured org-side network (board, staff, churches, volunteers, alumni) matched to external prospect data so development asks *people who already have relationships* to make introductions.
5. **Human-in-the-loop communications** — AI drafts; humans edit, personalize, and approve every donor-facing message.
6. **Measurement** — Expected value thinking, conversion modifiers, pipeline metrics, and relationship-quality indicators — not vanity metrics alone.

---

## Who this is for

- **Executive directors and CFOs** who must align fundraising innovation with risk, board expectations, and accreditation (e.g. ECFA-style stewardship).
- **VP/Director of Development** — owns pipeline, portfolio balance, and staff capacity.
- **Major gift officers and annual fund leads** — day-to-day cultivation and appeals.
- **Marketing/communications** — message consistency, channels, and disclosure language.
- **Data/operations** — CRM hygiene, list pulls, and integration with approved AI workflows.

**Prerequisite:** willingness to document policies, name owners, and run disciplined pilots. No engineering degree required; technical integration is scoped as “with IT/vendor support” where needed.

---

## Week 0 — Prerequisites (before Week 1)

Complete or explicitly waive each item with leadership sign-off.

| Prerequisite | Outcome |
|----------------|---------|
| **Team AI Charter** (from general AI course or equivalent) | Written boundaries on data, disclosure, review, and approved tools. |
| **Fundraising AI owner** | Named executive or director accountable for donor-facing AI use. |
| **CRM reality check** | Know where donor data lives, who can export it, and what fields exist for gift history, events, and volunteer roles. |
| **Stakeholder alignment** | Board chair or governance committee aware that **donor intelligence** and **connection mapping** will be discussed (transparency beats surprise). |

**Optional diagnostic:** Use the Kairos-style recognition flow on the Movemental resources surface (`KairosAssessment` / `KAIROS_ASSESSMENT_RUBRIC.md`) if you want a shared language for team stress points before you add fundraising workload.

---

## Week 1 — Foundation: Narrative, governance, and ethical donor intelligence

### Learning objectives

- Align fundraising around one **case for support** and a practical **messaging guide** (single source of truth for AI and humans).
- Adopt the **10 rules** pattern for fundraising AI: governance, PII boundaries, human review, transparency, and ownership — as in the AI fundraising guide (`_docs/_imported/04-fundraising/ai-fundraising-guide.md`).
- Understand the **ethical terrain** of mass donor intelligence and OSINT-style enrichment: what’s possible, what’s permissible, and what damages trust — see `ai-ethics-donor-intelligence.md`.
- Produce **Fundraising AI addendum** to your charter: what is allowed for research, scoring, drafting, and segmentation.

### Session 1 — The anchor: case for support and organizational story

**Core content**

- Distill or refresh the **case for support** (`case-for-support.md` pattern): need, approach, impact, ask — usable in donor meetings and as the top of every AI prompt context.
- **Ideal donor profile** (`ideal-donor-profile.md`): who you are built to serve among funders; use this to filter prospect lists so “wealth” never outweighs **affinity**.
- **Donor personas** (`donor-personas.md`): segment-level motivations; later weeks map messages and journeys to these personas.

**Deliverable:** One-page **message hierarchy** + **non-negotiables** (“we never say X,” “we always lead with Y”).

### Session 2 — Governance layer for fundraising AI

**Core content**

- Map data classes: public, internal, confidential, restricted — and which may enter **which** tools (aligned with `ai-fundraising-guide.md` and governance briefs in `_docs/_imported/03-governance-ethics/`).
- **Human review** for every donor-facing touch; AI as draft engine, not sender.
- **Disclosure**: plain-language answers for “Do you use AI?” — prepared for donors, board, and partners.

**Deliverable:** **Fundraising AI addendum** (draft): approved use cases, prohibited use cases, tool classes, and escalation path when someone wants a new workflow.

### Session 3 — Donor intelligence: opportunity vs. harm

**Core content**

- Walk the **financial opportunity model** and the **ethical assessment** structure from `ai-ethics-donor-intelligence.md` (capacity vs. relationship, warm vs. cold conversion logic, stewardship of sensitive inference).
- **Board-level clarity**: mass prospect lists + public enrichment vs. surveillance creep; **mission alignment** as a filter for every use case.

**Deliverable:** **Ethical use-case scorecard** (adapt the rubric in the ethics doc): each proposed data source or automation gets a documented score and mitigation.

### Homework

- **Read:** `ai-fundraising-guide.md` (full), skim `ai-ethics-donor-intelligence.md` Part I–II.
- **Write:** 5 FAQ answers for board/donors on AI in development.
- **Audit:** List every place donor PII is currently exported (events, mail house, volunteer tools) — closes gaps before Week 2 data work.

---

## Week 2 — Data design: Prospects, scoring, segmentation, and the org network

### Learning objectives

- Implement or approximate the **four-dimension donor scoring model** (capacity, affinity, engagement, recency/frequency) — `donor-scoring-rubric.md`.
- Build **segmentation** that combines score bands, personas, and lifecycle — `donor-segmentation.md`.
- Begin **connection mapping**: harvest an org-side relationship graph and define how it will match to prospect records — `connection-mapping-playbook.md`.
- Understand **donor expected value** and **conversion modifiers** as prioritization math — `donor-expected-value.md`, `donor-conversion-modifiers.md`.

### Session 4 — Scoring: one composite model the whole team trusts

**Core content**

- Train the team to score with **partial data**; document what’s missing when you assign a band.
- Align score bands to **portfolio coverage**: how many major gift officer hours per Platinum/Gold tier.

**Deliverable:** Scoring worksheet or CRM fields + definitions (even if MVP is spreadsheet-based).

### Session 5 — Segmentation in practice

**Core content**

- **Score × persona × lifecycle** matrix — who gets mass email vs. handwritten note vs. CEO call (`donor-segmentation.md`).
- **Cultivation guide** integration: match segments to cadence — `donor-cultivation-guide.md`.

**Deliverable:** **Segment playbook** — for each primary segment: goal, channel, frequency, owner, and success metric.

### Session 6 — Connection mapping: the “second map”

**Core content**

- Teach the **two-map** mental model from the non-profit dashboard narrative: **Reality map** (who could give — prospect universe) + **Relationship map** (who we know — insiders, churches, partners, volunteers).
- Follow the **connection-mapping-playbook** phases: harvest insiders, normalize identifiers, fuzzy match, score connection strength, output prioritized **connector–prospect** pairs for human activation.

**Deliverable:** **Minimum viable relationship graph** — e.g. board/staff LinkedIn or connection exports, church partner list, volunteer leaders — plus a **matching protocol** (who runs it, how often, quality checks).

### Homework

- Score 25 records manually (calibration).
- Identify **10 warm paths** to high-capacity prospects via connection mapping (paper prototype acceptable).
- Read `donor-expected-value.md` and list three **conversion modifiers** your org believes matter most (e.g. event attendance, peer intro).

---

## Week 3 — Activation: Cultivation, AI-assisted comms, and pipeline discipline

### Learning objectives

- Tie **personas and lifecycle** to specific **journeys** (welcome, upgrade, lapsed win-back, major gift).
- Operationalize **AI-assisted drafting** with prompt libraries grounded in case for support and persona voice.
- Use **expected value** and **conversion modifiers** to choose weekly priorities — where human time buys the most lift.
- Reinforce **stewardship ethics**: authenticity, non-formulaic tone, gratitude — `donor-cultivation-guide.md`, `ai-fundraising-guide.md` “doing it wrong” examples.

### Session 7 — Cultivation sequences that scale

**Core content**

- Translate segment matrix into **90-day plans** for top tiers (who touches the donor, how often, what story).
- **Major gift** vs. **annual fund** rhythms; when AI is appropriate for research summaries vs. drafts.

**Deliverable:** **Three blueprint journeys** (e.g. new first-time donor, lapsed mid-level, warm major-gift prospect with connector).

### Session 8 — Prompt library for development (governed)

**Core content**

- Build a **shared prompt pattern**: role + mission context + case-for-support excerpt + persona + constraints + output format.
- **Channel variants**: appeal letter, thank-you, event invite, major-gift briefing memo (internal).
- **Quality bar**: cite only facts from supplied context; ban invented statistics; flag uncertainty.

**Deliverable:** **Prompt packet v1** (10–15 prompts) stored where the team actually accesses it — with **mandatory human edit checklist**.

### Session 9 — Pipeline meeting: EV and conversion modifiers in the MGO weekly standup

**Core content**

- Run a real **pipeline review** using scored lists: expected value bands, next actions, connector asks.
- **Portfolio sizing** — evidence on deeper vs. wider portfolios (reference narrative in non-profit-dashboard `SOURCES.md` / relationship video — e.g. Northwestern portfolio concentration study cited there).

**Deliverable:** **Weekly development cadence** document: meeting agenda, metrics on one page, definition of a qualified prospect.

### Homework

- Run **two controlled AI drafting tests** (appeal + thank-you) with senior reviewer sign-off; log time saved and edit burden.
- Update **Fundraising AI addendum** with any new approved prompts or tools.

---

## Week 4 — Integration: Dashboards, measurement, rollout, and continuous improvement

### Learning objectives

- Define **success metrics** that balance revenue with relationship health (retention, upgrade rate, connector activation, time-to-first-meeting).
- Map **roles** to system components: who owns data refresh, scoring QA, connector outreach, comms approval.
- Plan **staged rollout**: pilot cohort of prospects/donors, feedback loop, then expand.
- Align optional **platform** touchpoints: formation content, AI Lab, and assessments as **long-term donor and leader engagement** layers on the public Movemental-class stack — see `_docs/_prompts/platform-product-demo-design.md` for how the library and AI Lab reinforce thought leadership that feeds trust in your mission (secondary to core fundraising ops).

### Session 10 — Metrics that don’t lie

**Core content**

- **Dashboards:** leading indicators (tasks completed, introductions requested, meetings held) vs. lagging (revenue).
- **Donor health:** retention by segment; downgrade/churn signals.
- **Ethical KPI:** incidents of policy violation (should stay at zero with training).

**Deliverable:** **KPI sheet v1** — fewer than 12 metrics, each with owner and source (CRM or spreadsheet).

### Session 11 — Operating model and RACI

**Core content**

- **RACI** for: prospect list refresh, enrichment vendor/API, scoring runs, connector matching, appeal approvals, vendor relationships.
- **Integration checkpoints** with IT/legal: DPAs, data retention, subprocessors.

**Deliverable:** **Operating manual addendum** — who does what weekly/monthly/quarterly.

### Session 12 — Go-live readiness and 90-day plan

**Core content**

- **Pilot scope:** e.g. one major gift officer portfolio + one annual fund segment.
- **Rollback triggers:** if trust issues, data leaks, or message quality failures — pause AI drafting, keep research/scoring human-reviewed.
- **Stakeholder comms:** board summary + internal FAQ.

**Final deliverables (organization-level)**

| Deliverable | Description |
|-------------|-------------|
| **Fundraising AI addendum** | Signed attachment to AI charter; fundraising-specific. |
| **Case for support + messaging guide** | Current, versioned, referenced in prompts. |
| **Scoring + segmentation model** | Documented; CRM or spreadsheet implementation. |
| **Connection mapping MVP** | Org network inventory + match process + owner. |
| **Prompt library v1** | With human review checklist. |
| **KPI sheet + cadence** | Weekly pipeline + quarterly ethics/policy review. |
| **Pilot retrospective template** | What worked, what broke, what to tighten. |

---

## Facilitation notes

### Pacing

- **12 sessions** (3 per week × 4 weeks) at 60–90 minutes, plus homework — same flex pattern as the general AI adoption course.
- **Data and connection-mapping work** often needs **Week 2 extended** in calendar time if CRM cleanup is heavy; treat sessions as modules, not rigid calendar days.

### Team size

- Ideal: **5–10** people with development leadership **always** in governance sessions.
- **Board or governance committee** should receive a **15-minute brief** at end of Week 1 and Week 4.

### Relationship to the Movemental platform

- This course is **system- and vendor-aware** but not tied to a single CRM. The **Movemental** public platform (content library, pathways, AI Lab, assessments) supports **mission storytelling and leader formation**; your fundraising system should **feed** consistent narratives into those channels when appropriate, but CRM and prospect operations may live elsewhere until integrated.

### Related repos (local ecosystem)

- **`non-profit-dashboard`** — narrative and proof assets for **relationship graph × prospect landscape** (relationship video scripts and cited statistics in `video/relationship-video/` and `_docs/_public/video/`).
- **`movemental-dashboard`** — dashboard/agent experimentation aligned with multi-tenant Movemental direction (treat as conceptual reference unless your deployment explicitly uses it).

---

## Canonical reading map (internal docs)

| Topic | Primary doc |
|-------|-------------|
| AI + fundraising principles | `_docs/_imported/04-fundraising/ai-fundraising-guide.md` |
| Ethics at scale (donor intelligence) | `_docs/_imported/03-governance-ethics/ai-ethics-donor-intelligence.md` |
| Case for support | `_docs/_imported/04-fundraising/case-for-support.md` |
| Ideal donor profile | `_docs/_imported/04-fundraising/ideal-donor-profile.md` |
| Personas | `_docs/_imported/04-fundraising/donor-personas.md` |
| Scoring | `_docs/_imported/04-fundraising/donor-scoring-rubric.md` |
| Segmentation | `_docs/_imported/04-fundraising/donor-segmentation.md` |
| Connection mapping | `_docs/_imported/04-fundraising/connection-mapping-playbook.md` |
| Expected value | `_docs/_imported/04-fundraising/donor-expected-value.md` |
| Conversion modifiers | `_docs/_imported/04-fundraising/donor-conversion-modifiers.md` |
| Cultivation | `_docs/_imported/04-fundraising/donor-cultivation-guide.md` |
| General AI adoption (prerequisite) | `_docs/publishable/07-ai-adoption-for-nonprofits-course-outline.md` |

---

## What this course does not replace

- **Legal/compliance** specific to your jurisdiction or subsector (health, education, international); engage counsel.
- **Vendor procurement** — this course prepares requirements; your IT/finance team runs RFPs and DPAs.
- **Full technical CRM migration** — scope that as a parallel IT project.

---

*Created: April 8, 2026 — aligned with imported fundraising corpus, governance ethics briefs, publishable AI adoption course, and non-profit-dashboard relationship-fundraising narrative.*
