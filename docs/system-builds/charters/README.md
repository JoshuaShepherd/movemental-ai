---
title: System Build Charters — the mature shape
status: v1 (2026-04-14)
owner: movemental
---

# System Build Charters

These four documents are the **charter** for what a Movemental system build should finally look like in a mature non-profit — not the sales page, not the pilot scope, not the course preview. They describe the end state we are guiding organizations toward, the AI integration depth we believe is healthy, and the discipline required to get there without betraying mission.

They apply across our four vertical modules. Read them together; they share a spine.

| Area | Charter | Primary deliverable surface |
| --- | --- | --- |
| Governance & Ethics | [01-governance-and-ethics.md](01-governance-and-ethics.md) | Policy + board rhythm + inspectable decision log |
| Training & Experimentation | [02-training-and-experimentation.md](02-training-and-experimentation.md) | Discovery Lab → internal use-case registry |
| Donor / Fundraising | [03-donor-and-fundraising.md](03-donor-and-fundraising.md) | Next.js + Supabase donor dashboard (seeded from `non-profit-dashboard`) |
| Content | [04-content.md](04-content.md) | Next.js + Supabase multi-tenant platform (seeded from the Alan Hirsch content stack) |

## Shared premises

1. **AI maturity is a governance problem before it is a tooling problem.** An org that cannot name who owns what decision cannot safely automate any of them.
2. **Artifacts, not decks.** Every charter ends in inspectable operational artifacts: a registry, a dashboard, a playbook, a policy. If a build cannot be reviewed in a 30-minute board walk-through, it did not happen.
3. **Formation sits above productivity.** Non-profits are not law firms. "Faster output" is not the goal; faithful stewardship at larger scale is. Speed gains must route back to mission capacity, not to staff fear.
4. **Inspectability beats velocity.** We would rather have a slower decision with a clear trail than a fast one that no trustee can reconstruct.
5. **Multi-tenant by default.** Every platform-layer deliverable (content, fundraising, and eventually governance logs) is built on the same Next.js 16 / Supabase / Drizzle / RLS spine already in use for Alan Hirsch and the donor dashboard. We do not ship single-tenant forks.

## How to read each charter

Each charter follows the same six-section shape so they can be compared cleanly:

1. **Goal (the mature organization picture).** One paragraph that names what this area looks like when it is working.
2. **Where we already are.** What has been built, what that constrains, what that enables.
3. **Top 20 AI use cases.** Ranked, concrete, with the surface they live in.
4. **Mature leadership guide.** What a leader has to be willing to do (and willing to refuse) for this area to stay healthy under AI pressure.
5. **Roadmap to AI maturity.** The four-week system build, followed by adoption milestones. Each build ends with an inspectable working system, not a deck.
6. **Constraints and don'ts.** The non-negotiables. Violating these should stop a build, not slow it.

## Timeline shape

Each of the four areas is a **four-week system build.** A build ends with a working, board-inspectable system for its domain — not a pilot, not a staging environment. The four builds are overlappable but in most cases run linearly, typically in the order: governance → training & experimentation → donor & fundraising → content (or content in parallel with fundraising once governance is live).

What follows each build is not "more build." It is the organization running on the system and maturing its adoption — the milestones named inside each charter describe that ongoing practice, not additional construction phases.

For movement leaders (authors), the content **onbuilding** block is a **single four-week, cohort-based** build. **Canonical** definition: [docs/build/notes/onbuilding-4-week-course-SSOT.md](../../build/notes/onbuilding-4-week-course-SSOT.md). It ends with: **ingested** corpus, **sufficient** evergreen **pillar + cluster** for launch (not a full long-tail **library** in four weeks), **at least one** **pathway** and **one** **usable** **transformational** **course** arc, **signed** bylines, and **public**-facing (or “soft” launch) **routable** product — **not** a staging-only artifact. *Residency* is **deprecated** as a product name. It is not a **12**-**week** program and not **primarily 1:1**; the method is AI-assisted, human-led, and draft-heavy. It is not a **marathon**; it is a **bounded** **cohort** **sprint** to **launch** **clarity**.

## Out of scope for these charters

- **Pricing, packaging, SKUs.** Those live on the site and in [hub-cards.ts](../../../src/lib/system-builds/hub-cards.ts).
- **Technical implementation details.** Those live in the respective repo READMEs and `_docs/` folders.
- **Client-specific playbooks.** Charters are the shape we build toward; client work is how we install it.
