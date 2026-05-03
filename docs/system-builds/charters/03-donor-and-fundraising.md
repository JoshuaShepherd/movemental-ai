---
title: Donor & Fundraising — AI charter for the mature non-profit
status: v1 (2026-04-14)
owner: movemental
module: system-builds/fundraising
seed_repo: /Users/joshuashepherd/Desktop/dev/repos/non-profit-dashboard
---

# Donor & Fundraising

> AI in fundraising is a **relational** capability, not an acquisition one. The mature org uses AI to see the donors it already has more clearly, steward them more faithfully, and ask them for the right thing at the right time — not to drive top-of-funnel through volume.

---

## 1. Goal — the mature organization picture

A mature non-profit fundraising operation, at AI maturity:

- Has a **single donor record** per household, not five views across Salesforce / HubSpot / spreadsheet / inbox / memory.
- Has **portfolio clarity** — every major donor has a named relationship owner, a stewardship rhythm, and a legible history of contacts, asks, and responses.
- Uses AI to **surface attention** (who is drifting, who just signaled readiness, what didn't get followed up on) without impersonating the fundraiser.
- Produces **board-ready reports** on giving health, pipeline, and retention on a rhythm that does not depend on a heroic weekend from the development director.
- Keeps **donor voice in the loop** — the fundraiser still writes the note, makes the call, hosts the meal. AI drafts, but never sends, major-donor communications.

The operational artifact is a **donor dashboard** built on the same Next.js + Supabase + Drizzle spine used elsewhere in this stack, seeded by `non-profit-dashboard`, with RLS-scoped per org. It replaces spreadsheets, not relationships.

---

## 2. Where we already are

- [`non-profit-dashboard`](file:///Users/joshuashepherd/Desktop/dev/repos/non-profit-dashboard) is the seed. It already has: `Dashboard`, `Pipeline`, `InsiderDirectory`, `ProspectProfile`, `ProspectSearch`, `Connections`, `AIAgent`, and `DocumentationResources`, plus a LinkedIn MCP server in-tree.
- The dashboard is Vite today; the mature shape is **Next.js 16 App Router** aligned with the rest of the Movemental stack (same auth, same RLS, same observability). Migration is a tractable lift, not a rewrite.
- The `AIAgent` component signals the right instinct — an **agent embedded in the workflow**, not a chatbot bolted onto a navbar — but it needs governance tagging, observability, and scoped tools before it is something we install in a client.

**Implication for the charter:** the mature deliverable is a **multi-tenant Next.js donor platform** with:

- Supabase-backed donor, household, gift, interaction, and portfolio tables, RLS per org.
- An agent surface per fundraiser scoped to *their* portfolio with *their* data class.
- Integrations to the org's existing CRM (read-in + write-back, never unilateral replacement).
- Reporting that a CFO trusts.
- A governance registry entry and a decision log from day one — this is the *most* donor-sensitive surface in the entire system, and the discipline has to be present at Stage 0, not bolted on at Stage 2.

---

## 3. Top 20 AI use cases in donor & fundraising

| # | Use case | Surface | Authority |
| --- | --- | --- | --- |
| 1 | Unified donor record resolution (dedupe across CRM, email, events, gifts) | Dashboard | Recommend |
| 2 | Portfolio health scoring per major-donor relationship (freshness, reciprocity, ask-cadence) | Dashboard | Recommend |
| 3 | Drift detection (donor has gone quiet relative to their own baseline) | Dashboard alerts | Recommend |
| 4 | Next-best-action recommender per donor (thank, update, meet, ask, pause) | Dashboard | Recommend |
| 5 | Gift-capacity and likely-ask-range estimation, drawing on self-reported + public signals | Prospect profile | Recommend |
| 6 | Relationship map discovery (who in our network already knows this prospect) | Connections surface | Recommend |
| 7 | Meeting-prep brief (history, prior commitments, open threads, do-not-repeat notes) | Dashboard / email | Assist |
| 8 | Thank-you draft per gift, conditioned on donor's prior language and giving history | Email drafts | Assist |
| 9 | Proposal / case-for-support drafting copilot, grounded in the org's real outcomes | Doc editor | Recommend |
| 10 | Grant-fit screener (does this funder's priorities actually match our work?) | Internal app | Recommend |
| 11 | Grant writing copilot with traceable citations to the org's own evidence base | Doc editor | Recommend |
| 12 | Renewal-risk model on mid-tier donors (who needs a touch before renewal window) | Dashboard | Recommend |
| 13 | Lapsed-donor segmentation and re-engagement drafting | Campaign workflow | Recommend |
| 14 | Event follow-up sequencer (attendees → timely, personalized follow-ups, scheduled and queued for human send) | Dashboard + email | Recommend |
| 15 | Board-ready giving-health dashboard with natural-language summary | Dashboard | Assist |
| 16 | Major-gift moves-management assistant (stages, aging, stalls, coaching prompts) | Dashboard | Recommend |
| 17 | Donor-intent preservation (respect restrictions, designations, anonymity flags, explicitly surfaced at every touch) | Dashboard + drafts | Recommend |
| 18 | Sunset and memorial donor handling workflow (respectful, opt-in, human-reviewed) | Dashboard | Recommend |
| 19 | Campaign retrospective analysis (what worked, what didn't, with causal humility) | Reports | Assist |
| 20 | Confidentiality enforcement on agent output (redacts unrelated portfolios, prevents cross-donor leakage) | Agent layer | Act (only here) |

**The only Act-level authority in this list** is use case 20 — automatic redaction/refusal. AI *must* refuse to expose a donor it is not scoped to. That refusal is not a recommendation the fundraiser can override; it is enforced by the platform.

---

## 4. Mature leadership guide

A development director and ED operating this area well:

- **Treat the donor record as sacred.** Dedupe work is prioritized, gift designations are respected, restricted funds are protected. Every AI feature is evaluated against whether it honors this.
- **Write the hard note themselves.** Apology notes, condolence notes, "we have bad news" letters, and first major-gift asks are not AI-drafted. The director types them. The model may refine tone, never originate.
- **Never let AI send.** Every outbound major-donor communication passes a human queue. Mid-tier automated sends (thank-yous, event logistics) are governed by explicit rules.
- **Refuse predatory segmentation.** The platform can identify vulnerable donors (late-life, recently bereaved, cognitive decline signals if ever surfaced). The mature leader's job is to **reduce** contact frequency with those segments, not increase it.
- **Publish retention, not vanity.** Board reports lead with retention, portfolio health, and unrestricted-reserve runway. Gross raised comes later.
- **Explain the agent.** Staff can describe, in one paragraph, what the AI agent sees, what it can draft, what it cannot send, and how to override. If staff cannot, the leader has not installed the tool; they have installed confusion.
- **Keep major donors off AI-facing surfaces when they ask.** Some donors will prefer not to have their profile parsed by a model. The platform supports per-donor opt-out at a data-handling level, not just a preference flag.
- **Protect the fundraiser's voice.** Leadership measures whether AI drafts are **sharpening** or **flattening** the team's writing. Flattening is a signal to pull back, not to push forward.
- **Keep a human floor on portfolio size.** AI does not justify raising the ratio of donors per fundraiser past what relationship stewardship can carry. If the model makes one person feel like they can "handle 500," the mature leader says no.

The clearest signal of maturity: the development director is **relieved** by AI, not **replaced by it or hiding behind it**.

---

## 5. Roadmap to AI maturity

The system build is four weeks and ends with a working donor platform, not a pilot. What follows is adoption and widening — fundraisers using it daily, the board receiving its reports from it, and integrations accruing over time.

### The four-week system build

- **Week 1.** Donor data audit: sources, duplicates, restrictions, consent, deceased/do-not-contact flags. Governance registry entries for every planned AI use case in this area. Dashboard deployed in dev, connected read-only to existing CRM.
- **Week 2.** Single source-of-truth donor record established for the top 200 relationships. Top three AI use cases scoped: meeting-prep briefs, thank-you drafting, portfolio health. Agent scoping enforced (fundraiser sees only their portfolio). Human-send queue in place. Decision log active.
- **Week 3.** The three use cases live for 2–3 fundraisers. Drift and data issues surfacing through real use.
- **Week 4.** Platform live on the Movemental spine (Next.js 16, multi-tenant, RLS-scoped). First end-of-week retrospective with kept / retired / modified decisions; fundraiser trust scored qualitatively. Board-ready reporting template produced from the platform.
- **Exit artifact:** live donor platform, three AI use cases in production, first retrospective on record, and a board-ready report produced end-to-end from the platform.

Overlappable with the content build but typically run after governance.

### Adoption milestones after the build

- **Month 2–4.** Drift detection, next-best-action, and renewal risk deployed. Grant fit + grant drafting copilot graduated from experimentation. Board reporting becomes the default rhythm, not a build artifact.
- **Month 4–9.** Integrations extend to events, email marketing, and designated-fund ledger. First full quarter where the board report is produced entirely from the platform.
- **Month 9 onward.** Annual donor consent + preferences review is run from the platform. Major-donor opt-outs from AI-parsed surfaces are available and honored. Platform serves as audit surface for restricted funds and gift intent, yielding a clean external audit.

An org that deploys AI drafting before the Week 1 dedupe is compounding data debt at higher velocity. An org that deploys drift detection before portfolio ownership is defined will create alerts nobody acts on. Sequencing inside the four weeks is part of the charter.

---

## 6. Constraints and don'ts

- **No AI-originated sends to major donors.** Drafts only. The queue is human-released.
- **No cross-portfolio data access by an agent.** Scope is enforced at the platform layer, not trusted to prompting.
- **No training third-party models on donor records.** Default-deny. If a vendor cannot contractually guarantee this, the vendor is not used for donor-bearing surfaces.
- **No scoring of donor "worth" or "value" in user-facing language.** Capacity and likely-ask-range are analytic outputs; they do not become labels on a donor card. Language like "A-list" or "low value" is a charter violation.
- **No dark-pattern urgency.** AI-drafted appeals do not manufacture scarcity, fear, or false deadlines. If the appeal requires those, the appeal is wrong before the model is involved.
- **No donor "leaderboards."** Internal dashboards do not rank donors by amount in ways that leak into outbound communications.
- **No AI in grief communications.** Condolence notes are human-written. The platform does not draft them. It may remind the fundraiser that one is owed.
- **No auto-enrichment from sources the donor did not consent to.** Public signals are acceptable in disciplined ways; aggressive data-brokered enrichment is not.
- **No platform change that breaks gift-designation traceability.** Every gift has a restricted/designated/unrestricted tag, a date, and a source. An AI feature that complicates or obscures that chain is declined.
- **No "growth hacks" imported from for-profit marketing stacks** without explicit board review. Non-profit fundraising is not DTC marketing; the charter refuses to let it drift into that idiom.
