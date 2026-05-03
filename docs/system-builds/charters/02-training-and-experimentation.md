---
title: Training & Experimentation — AI charter for the mature non-profit
status: v1 (2026-04-14)
owner: movemental
module: system-builds/discovery-lab
---

# Training & Experimentation (Valuable Use Cases)

> The purpose of this area is not "AI literacy." It is the organization's ongoing discipline of **finding, validating, and retiring** AI use cases — treating experimentation as a repeatable capability, not a season.

---

## 1. Goal — the mature organization picture

A mature non-profit has a **small, persistent experimentation engine** that:

- Turns ideas into tested use cases on a known cadence (weeks, not quarters).
- Produces evidence that is legible to the governance layer and the board.
- Kills losing ideas quickly without burning the people who proposed them.
- Graduates a steady trickle of winners into the operational system (content, fundraising, service delivery).
- Teaches staff — by doing — how to reason about AI rather than how to prompt.

In steady state: **the org knows its top five live experiments, its top ten graduated use cases, and its top ten retired ideas.** Learning is institutional, not tribal. Staff at any level can propose an experiment through a standard intake, and know what happens next.

The operational artifact is an **internal use-case registry** (the same one the governance charter references, extended with experimentation state: `proposed → approved → running → evaluated → graduated/retired`) plus a **quarterly learning review** that leadership cannot skip.

---

## 2. Where we already are

- `system-builds/discovery-lab` is the outward-facing surface — [`discovery-lab-page-content.tsx`](../../../src/components/sections/system-builds-discovery-lab/discovery-lab-page-content.tsx) — framing Discovery Lab as the entry point for "what AI could do here."
- Today Discovery Lab mostly produces a **shortlist document and an opinion**. It does not yet install the experimentation engine in the client; it mostly runs the experiments *for* them.
- There is a course preview under [docs/system-builds/ai-experimentation-course-preview/](../ai-experimentation-course-preview/), aimed at teaching, not at running experiments.

**Implication for the charter:** Discovery Lab's mature output is **not a report**. It is an installed experimentation loop owned by the client — intake, prioritization rubric, evaluation template, graduation criteria, retirement etiquette — with the first three experiments already running inside it.

This is the area where Movemental most often has to refuse to do the work *for* the client; doing so trains learned helplessness. The charter bias is **install the loop, run the first three with them, hand over the fourth**.

---

## 3. Top 20 AI use cases for training & experimentation

These are meta-use-cases — the use cases of the **experimentation function itself** — not the downstream use cases being tested (those live in content/fundraising/ops charters).

| # | Use case | Surface | Authority |
| --- | --- | --- | --- |
| 1 | Use-case intake form with guided prompt-engineering scaffolding (job-to-be-done, hypothesis, reversibility, data class) | Internal app | Assist |
| 2 | Automatic routing of intake to the right reviewer based on data class + risk tier | Internal app | Recommend |
| 3 | Prioritization rubric engine (scores intake on impact × effort × reversibility × formation-fit) | Internal app | Recommend |
| 4 | Experiment templates by pattern (retrieval, summarization, drafting, classification, agent, evaluation) | Docs + code | Assist |
| 5 | Evaluation harness (golden set, regression runs, side-by-side model comparison) scoped per use case | Internal app | Recommend |
| 6 | Cost + latency + accuracy telemetry per use case (PostHog LLM analytics + Supabase) | Dashboard | Assist |
| 7 | Prompt library with versioning and changelog | Internal app | Assist |
| 8 | Model-portability layer (every use case names models as `provider/model` strings; no lock-in) | Code | Assist |
| 9 | "Kill criteria" specified at experiment start, enforced at review | Process + template | Assist |
| 10 | Sandbox environment with synthetic / redacted data for staff exploration | Internal app | Assist |
| 11 | Staff-led "AI office hours" (weekly, recorded, searchable) | Internal | Assist |
| 12 | Paired-staff pattern: every experiment has a proposer and a skeptic, named | Process | Assist |
| 13 | Quarterly learning review (what graduated, what retired, what surprised) | Board + staff | Assist |
| 14 | Retirement post-mortems (why we stopped, published internally) | Docs | Assist |
| 15 | Graduation checklist (governance tagged, observability added, ownership transferred, cost budgeted) | Process | Recommend |
| 16 | Public case studies of graduated or retired experiments (anonymized if needed) | External site | Assist |
| 17 | Peer-network exchange (share patterns with sibling orgs; learn from their retirements) | External | Assist |
| 18 | Custom eval set builder for mission-specific language (theology, safeguarding tone, formation voice) | Internal app | Assist |
| 19 | Bring-your-own-idea Friday: scheduled time for staff to submit intakes without meeting overhead | Process | Assist |
| 20 | Annual "stop doing" review that prunes the registry aggressively | Board + staff | Recommend |

Nothing here is at Act authority. Experimentation *produces* authorized-to-act use cases (after graduation), but the experimentation function itself is always human-in-the-loop.

---

## 4. Mature leadership guide

A leader running a healthy experimentation engine:

- **Treats intakes as sacred and killing as ordinary.** Every idea gets a serious first look. Most ideas die; that is the goal, not a failure.
- **Publishes retirements.** The team can name the last three experiments that died and why. If they cannot, learning is leaking.
- **Separates proposer from evaluator.** The person with the idea does not grade the experiment. This is social, not technical — it protects honest evaluation.
- **Budgets experimentation with real money.** There is a line item. It is not "whenever we have time."
- **Refuses novelty for novelty's sake.** A use case has to connect to a mission outcome or a staff capacity bottleneck, or it does not enter the queue.
- **Keeps the loop small.** Five or fewer simultaneous experiments. More is performance theater, not learning.
- **Teaches reasoning, not prompts.** Staff training focuses on *when* to use AI, *when not to*, and *how to tell if it worked*. Prompt craft follows.
- **Knows the formation cost.** Leadership can name which experiments, if successful, would change staff roles, and has a human plan for that transition.
- **Graduates cleanly.** When a use case graduates, ownership transfers to a functional area, governance tags are attached, observability is wired in, and the experiment register notes the handoff. No "we'll clean it up later."
- **Retires visibly.** Killing an experiment is announced, not quietly dropped. This protects future proposers and honors the ones whose ideas died.

A leader who treats experimentation as a way to *prove AI is good* will bias the system toward false positives. A leader who treats it as a way to *learn what their organization can and cannot responsibly absorb* will build a durable engine.

---

## 5. Roadmap to AI maturity

The system build is four weeks. What follows is ongoing practice. The four-week build delivers a working experimentation engine — not a deck about one.

### The four-week system build

- **Week 1.** Discovery Lab runs the intake session with 8–12 candidate use cases. Prioritization rubric agreed. Governance Stage 0 artifacts (registry, data classification) in place or installed in parallel.
- **Week 2.** Top three experiments defined, each with a proposer + skeptic, eval set, telemetry, and kill criteria. Internal registry tracks experiment state.
- **Week 3.** Three experiments running live. First "AI office hours" held with staff.
- **Week 4.** First round of evaluations: at least one experiment retired on purpose, at least one graduated into operational use. The engine (rubric, registry, office hours, eval harness) is now running as a standing capability.
- **Exit artifact:** three evaluated experiments (one retired, one graduated); running registry; rubric and eval harness in use; office hours on the calendar.

This build is overlappable with the content and fundraising builds but usually runs after governance.

### Adoption milestones after the build

- **Month 2–4.** Prompt library and eval harness in use across all new experiments. Custom eval sets exist for mission-specific language. Experimentation becomes a named line in the annual plan.
- **Month 4–9.** Two quarterly learning reviews completed; graduated-use-case count ≥ 5. Board visibility established on the rhythm.
- **Month 9 onward.** Experimentation is a standing capability with a named owner distinct from the governance owner. Retired experiments published internally with post-mortems. Annual "stop doing" review prunes graduated use cases that no longer pay rent. The org contributes patterns to a peer network.

An organization that ships the four-week build and then stops maintaining the engine — no new experiments, no retirements, no office hours — will end up with a portfolio of zombie pilots: half-finished, nobody's job, quietly eroding trust in AI work. The build creates the engine; the ongoing practice runs it.

---

## 6. Constraints and don'ts

- **No experiment without explicit kill criteria.** If the team cannot name in advance what would make them stop, they are not running an experiment; they are rationalizing a decision already made.
- **No production use case bypassing the graduation checklist.** An experiment that is "just going to keep running" without graduation is shadow production; it will break badly and late.
- **No experiment on restricted or donor-sensitive data without governance Stage 1 complete.** Not later. Not "with care." Not at all.
- **No vendor-led experiments.** A SaaS vendor's AI feature does not count as a Movemental experiment; it is evaluated, not studied.
- **No experiments whose success would displace staff without an announced human plan.** Leadership must decide whether they are willing to let that use case graduate *before* it proves out, not after.
- **No mixing of training environments with production data.** Staff sandboxes use synthetic or redacted data. Violating this is a governance incident, not a style issue.
- **No "AI literacy training" as a substitute for experimentation.** Training detached from live experiments produces confident users with no evaluation instincts. The training happens **around** the experiments, not in place of them.
- **No retiring experiments in silence.** Every retirement gets a post-mortem. Silent retirement teaches staff that proposing is punished.
- **No growing the loop beyond five simultaneous experiments** without retiring or graduating two. Capacity is the constraint; managing it is the leadership work.
- **No use cases that contradict the "no" memos from governance.** If governance has refused a category, experimentation does not pilot in that category to "test the refusal." The refusal is the answer.
