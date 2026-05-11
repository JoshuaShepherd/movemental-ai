# Dashboard architecture & flow — Natasha Nikkel (Youthfront)

**Audience:** Product, engineering, and facilitation prompts where the primary operator is **Natasha Nikkel**, Chief Operating Officer at **Youthfront**, signing into the Movemental authenticated workspace.

**Org record (Supabase):** `organizations.slug = youthfront` (verify in environment before hard-coding URLs).

**Companion canon:** Youthfront is an **implementation organization** (nonprofit buyer), not the “trusted voices” ecosystem lane. Natasha’s dashboard journey should reinforce **operations ownership**, **inventory**, **board-ready documentation**, and **cross-functional routing** (development, programs, strategy)—consistent with internal Youthfront leadership briefs and the Sandbox Season exemplar narrative.

---

## 1. Identity & success criteria

Natasha’s professional mandate is to keep Youthfront **runnable**: administration, systems, internal coordination, and the operational side of **risk, scope, and documentation**, especially where work touches **data, vendors, HR-adjacent process, finance handoffs, and multi-site operations** (camps, neighborhood programming, central office).

**She succeeds in the dashboard when:**

1. She can **see and advance onboarding** without ambiguity—especially steps that mirror “who uses what, where” and operational readiness.
2. She can open **Program → Safety** templates that speak to **governance, inventory, and scope** (not generic “AI tips”).
3. She can hand **programs / formation** and **development / comms** owners clear artifacts (draft policies, inventories, board packet inputs) without mixing their lanes.
4. Nothing in the UX implies **youth-facing or formation content** should be generated inside unmanaged tools—the stance in Youthfront AI guides remains intact.

---

## 2. Route architecture (what exists in code)

Authenticated shell: `(dashboard)/layout.tsx` wraps all routes below with `DashboardShell` + persistent **`OnboardingPanel`**.

| URL / rewrite | Purpose for Natasha |
|---------------|---------------------|
| `/dashboard` | **Overview** — module cards to Program templates, Teaching library, and full onboarding (`/welcome`). |
| `/welcome` | **Full onboarding checklist** — expanded view of phases and tasks. |
| `/onboarding/:step` → `/dashboard/onboarding/:step` | **Per-task flows** (agreement, payment, cohort, corpus, agent, placeholders, etc.). |
| `/program` | Index of **Safety** and **Sandbox** Stitch fixture templates (authenticated migration hub). |
| `/program/safety/[templateId]`, `/program/sandbox/[templateId]` | Template viewer; merges **`program_engagements`** overlays when rows exist for her org + template. |
| `/dashboard/teaching/claude-skills` | Pedagogical reading—not core to COO operations, but useful for literacy when briefing staff. |
| `/admin/onboarding` | **Staff only** — Natasha does not see this unless she is also in a staff org membership. |

**Organization context:** Header org switcher writes `?org=youthfront` (or equivalent) so APIs resolve **`resolveActiveOrganizationId`** consistently across onboarding and program routes.

---

## 3. Intended journey (happy path)

1. **Login** → redirected to `/dashboard` if membership exists; otherwise `/login?reason=no_org`.
2. **Land on Overview** — copy should acknowledge **onboarding panel above** and **org switcher** when multiple memberships exist (rare for Natasha; possible if she ever has a personal Movemental lab org).
3. **Onboarding panel (compact)** — surfaces checklist state for **Youthfront**. Phases after commitment unlock as dependencies clear; tasks that require Movemental prep show **waiting** state until staff unlocks corpus/themes/agent stages.
4. **Deep work in Program / Safety** — Natasha (or her delegate) uses templates aligned to **inventory**, **policy stance**, **vendor boundaries**, and **incident / escalation patterns**. Fixture content should eventually mirror board-facing language parity.
5. **Sandbox templates** — used for **facilitated experiments** (e.g., synthesis of operational reports, scenario planning) with explicit **human review** gates—matching the Sandbox Season pattern: operational time savings are acceptable only when **accuracy and disagreement** are preserved where material is contested.
6. **Finalize onboarding steps** — tour, cohort prep, confirmation—signal readiness for **ongoing** platform use without gamification.

---

## 4. Governance & data boundaries (non-negotiables in UX copy)

When authoring prompts, microcopy, or fixtures aimed at Natasha:

- **Youth and vulnerable-family data** stay under **program / ministry ownership** for policy interpretation; operations owns **where tools are registered**, **vendor contracts**, and **inventory accuracy**.
- **Donor / CRM exports** route through **VP Development** ownership in real life; the dashboard should **never** train users to paste donor lists into public LLMs.
- **Inventory before hardening** — COO brief emphasizes a **current-use survey** grounded in reality; onboarding and Safety templates should reinforce “document what is already true” before aspirational policy language.

---

## 5. Relationship to public marketing & engagements

- Public site pathways (`/pathway/*`, `/organizations`, etc.) are **not** the dashboard; Natasha’s authenticated experience should **not** duplicate marketing IA.
- Strategic docs such as the Youthfront **Sandbox Season exemplar** (`docs/engagements/youthfront/`) describe **portfolio owner** and **board-facing artifacts**—use them when specifying future dashboard widgets (tasks, document locks, approval chains), but keep **this repo’s implementation** aligned with actual routes and services above.

---

## 6. Prompting checklist for engineers / AI agents

When building features “for Youthfront / Natasha”:

1. Confirm **`org` slug** resolution and RLS behavior for `program_engagements` and onboarding tables.
2. Prefer **explicit ownership labels** on templates (“operations”, “development”, “programs”) where a template could be misinterpreted across lanes.
3. Avoid empty surfaces: Overview, Program index, template views, and onboarding steps should always show **actionable copy** or **clear blocked states** (e.g., fixture missing sections).
4. After schema or task definition changes, run onboarding backfill scripts if required—do not assume Youthfront rows exist for new task keys.

---

## 7. Source index (internal)

| Topic | Location |
|-------|----------|
| COO AI brief (inventory, operations scope) | `docs/research/state-of-ai-2026/core-docs-repo/youthfront-ai-guides/ai-core-leadership-youthfront/brief-coo.md` |
| Core leadership guide | `docs/research/state-of-ai-2026/core-docs-repo/youthfront-ai-guides/ai-core-leadership-youthfront/index.md` |
| Research persona (simulation bounds) | `docs/personas/natasha-nikkel-youthfront-coo-research-persona.md` |
| Sandbox Season exemplar (portfolio narrative) | `docs/engagements/youthfront/05-exemplar.md` |
| Movement leaders vs organizations doctrine | `docs/build/strategy/movement-leaders-as-ecosystem-layer.md` |
