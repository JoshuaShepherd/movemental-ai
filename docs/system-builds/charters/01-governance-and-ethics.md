---
title: Governance & Ethics — AI charter for the mature non-profit
status: v1 (2026-04-14)
owner: movemental
module: system-builds/governance-ethics
---

# Governance & Ethics

> **This charter is load-bearing.** The other three charters (training, fundraising, content) all depend on this one being real. If an organization does not have a governance layer, "AI adoption" in the other three areas is just deniable risk accumulation.

---

## 1. Goal — the mature organization picture

A mature non-profit treats AI the way it treats finance, safeguarding, and legal exposure: **not as an innovation lane, but as a governed capability**. The board can answer four questions at any time, on demand, without the staff scrambling:

1. **Where is AI used in this organization, with what data, and who owns each use?**
2. **What decisions is AI involved in, and at what level of authority — assist, recommend, or act?**
3. **When AI makes or shapes a decision, how do we reconstruct why, and who is accountable if it was wrong?**
4. **What are we choosing *not* to do with AI, and why?**

The operational artifact is a **living AI use-case registry** paired with an **AI policy** (board-approved, annually reviewed) and a **decision log** (append-only, exported monthly). Staff do not have to guess; auditors do not have to interview; donors do not have to trust vibes.

Crucially: in the mature state, **the governance layer is not a brake on the other three areas — it is what makes them shippable**. Content, fundraising, and experimentation are faster *because* authority, data classification, and escalation paths are already decided.

---

## 2. Where we already are

- The movemental organizational site has a `/system-builds/governance-ethics` page and a course preview under [docs/system-builds/ai-governance-ethics-course-preview/](../ai-governance-ethics-course-preview/) — both are **external-facing surfaces**, not the internal artifact a client installs.
- The [Discovery Lab](../../../src/components/sections/system-builds-discovery-lab/discovery-lab-page-content.tsx) currently catches most of the "what could AI do here" work, but the **ethics/authority half** of those conversations is under-deliverable right now. Use-case ideation happens; policy scaffolding does not.
- There is no installed governance artifact yet — no shared registry template, no decision-log format, no board-rhythm calendar.

**Implication for the charter:** the first deliverable is not a policy PDF. It is a **governance operating system** — registry + decision log + policy + board cadence — installed as code and documents inside the client, owned by a named person on their side, reviewed on a schedule.

---

## 3. Top 20 AI use cases in governance & ethics

Ranked by leverage. Each lists the **surface** (where it lives) and the **authority level** it operates at (Assist / Recommend / Act).

| # | Use case | Surface | Authority |
| --- | --- | --- | --- |
| 1 | AI use-case registry (living inventory of every AI tool, owner, data class, risk tier) | Internal app (Supabase table + UI) | Assist |
| 2 | AI decision log (append-only record of consequential AI-influenced decisions, with prompt, model, outputs, reviewer) | Internal app | Assist |
| 3 | Data classification assistant (tags a file/stream as public / partner / restricted / donor-sensitive / safeguarding) | Internal app, pre-ingest hook | Recommend |
| 4 | Policy drafting & redlining copilot (scoped to the org's own policy corpus) | Doc editor | Recommend |
| 5 | Board-meeting preparation brief (packet summaries, prior-meeting recall, risk callouts) | Board portal | Assist |
| 6 | Conflict-of-interest disclosure triage (intake → routing → risk tier) | Intake form + admin queue | Recommend |
| 7 | Grant & contract clause risk scanner (flags clauses that conflict with the org's policies) | Doc review | Recommend |
| 8 | Safeguarding / whistleblower intake triage (never auto-resolves, only routes) | Intake form | Assist (only) |
| 9 | Regulatory horizon scanner (monitors jurisdiction-specific AI, data, nonprofit law changes) | Weekly brief | Assist |
| 10 | Incident response copilot (guides staff through a data/AI incident checklist, preserves evidence) | Internal app | Assist |
| 11 | Third-party vendor AI assessment (when a SaaS vendor adds AI, auto-assesses new data exposure) | Procurement workflow | Recommend |
| 12 | Model-card / tool-card generator for each AI use in the registry | Registry | Assist |
| 13 | Annual AI audit report generator (board-ready rollup of registry + decision log + incidents) | Report builder | Assist |
| 14 | Red-team prompt bank for the org's top 5 AI-exposed workflows | Internal app | Assist |
| 15 | Donor-data access anomaly detection (reads access logs, flags unusual patterns) | Observability dashboard | Recommend |
| 16 | Plain-language policy explainer for staff ("can I use ChatGPT for this task?") | Slack/Teams bot or internal chat | Assist |
| 17 | Training-completion + attestation tracker (who has read/signed which policy at which version) | Internal app | Assist |
| 18 | Public AI transparency page generator (what we use, on what data, to what end) | Org website | Recommend |
| 19 | Governance meeting minutes copilot (drafts, but signed by human chair) | Board portal | Recommend |
| 20 | "No" memo generator (helps leadership write and publish refusals — what we will **not** automate and why) | Policy repo | Recommend |

**Notes on authority:** nothing in this list is authorized at **Act** level. Governance is the one area where fully autonomous AI action is categorically ruled out in a mature non-profit. Everything either assists a human or recommends to a human who signs.

---

## 4. Mature leadership guide

Signs the leadership layer is ready for governance-grade AI:

- **A single named owner.** There is a Chief of Staff, Ops Director, or General Counsel who owns the AI policy the way a CFO owns the chart of accounts. Not a committee. A person.
- **The board asks for the registry unprompted.** AI is a standing agenda item the same way finance is — not a novelty briefing.
- **Refusals are published.** The org can name three things it has decided **not** to do with AI in the past 12 months, and the reasoning is documented.
- **Policy is versioned.** `v1.3, approved 2026-03-11` is normal speech. Staff know which version they are bound by.
- **Escalation paths are rehearsed, not theoretical.** Someone has actually walked through "what happens if an AI response leaks donor-restricted data" in the last six months.
- **Leadership can distinguish between authority levels.** Assist vs Recommend vs Act is language leadership uses; if they still say "the AI decided," they are not ready to scale.
- **Vendors are told, not asked.** When a SaaS tool turns on AI features, the org's first move is an assessment, not a passive opt-in.
- **Staff feel safer, not more watched.** If AI governance is experienced as surveillance, leadership has built the wrong system.

A leader who cannot hold these postures will not produce a durable governance artifact — no framework will save them.

---

## 5. Roadmap to AI maturity

The system build is four weeks. What follows the build is the organization running on it and maturing with it. The build has a named end state; the adoption stages have named milestones.

### The four-week system build

- **Week 1.** Name the accountable owner. Inventory current AI use, including shadow use (staff tools, vendor features). Choose and approve the data classification scheme.
- **Week 2.** Draft AI policy v1 for board approval. Apply authority-level tagging to every registered use case.
- **Week 3.** Stand up the decision log for the top three risk-tier uses. Rehearse the incident response checklist live, once, with the real team.
- **Week 4.** Board review of policy v1. Registry, decision log, and rehearsal record inspectable in a 30-minute walk-through.
- **Exit artifact:** populated AI use-case registry v1, signed policy, running decision log, one live rehearsal on record, and a one-page "what we know, what we don't" memo to the board.

This is overlappable with the other three four-week system builds, but in most cases will run linearly — governance first, then the domains that depend on it.

### Adoption milestones after the build

- **Month 2–4.** Registry covers 100% of AI use, including vendor-provided features. Red-team prompts exist for the top five workflows. Staff attestation + policy training tracked in-system.
- **Month 4–6.** Annual audit report generator runs end-to-end in a dry run. Staff attestation >95%.
- **Month 6 onward.** AI is a standing board agenda item with its own rhythm. Governance artifacts are inspectable by external auditors without staff prep. Public AI transparency page is live and up to date. The org is now capable of sharing its governance artifacts with peer non-profits as a pattern, not a one-off. First full-cycle annual audit delivered.

An org whose governance build has shipped but whose adoption stalls for more than 12 months should stop adding AI use cases in the other three areas until governance catches up. Velocity without governance is not maturity; it is accumulated risk in a confident voice.

---

## 6. Constraints and don'ts

Violations here stop a build. They are not trade-offs.

- **No AI at Act authority on decisions affecting a person's wellbeing, giving record, safeguarding disclosure, or employment status.** Ever.
- **No silent model changes.** If the underlying model or vendor changes, the registry and decision log record it; downstream uses are re-reviewed.
- **No shadow AI.** Staff using unregistered AI tools on org data is a policy violation, not a grey area. The response is registration, not punishment — but the tool lands in the registry.
- **No training third-party models on restricted or donor-sensitive data.** Default-deny; specific opt-in only, with board notice.
- **No AI-generated board minutes without a human chair's signature.** Drafts are fine; the signature carries weight no model can produce.
- **No "AI ethics" statements without operational backing.** If the policy promises explainability, the decision log must actually capture the prompt, model, and reviewer. Otherwise the statement is marketing, not governance.
- **No outsourcing governance to a vendor's trust center.** Vendor attestations are inputs to the org's own assessment, not substitutes for it.
- **No policy longer than staff will actually read.** If the AI policy cannot be walked through in 20 minutes, it will not be applied under pressure. Length is a failure mode.
- **No private-by-default decision log.** The internal log is shared with the board; summary categories are shared externally on the transparency page. Opacity here compounds.
- **No charter-violating integrations for short-term wins.** If a content or fundraising use case requires bending a governance principle, the answer is to redesign the use case, not the principle.
