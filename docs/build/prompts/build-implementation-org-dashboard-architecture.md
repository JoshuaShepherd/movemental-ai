# Agent prompt — build implementation-org dashboard architecture (Natasha-class) without changing movement-leader structure

> **Outcome.** Authenticated users whose organization is an **implementation buyer** (nonprofit / institution ops lane—exemplar: Youthfront COO workflow in [`dashboard-flow-natasha-nikkel-youthfront.md`](./dashboard-flow-natasha-nikkel-youthfront.md)) get **tailored overview copy**, **onboarding emphasis**, and **Program template surfacing** aligned with governance, inventory, and board-ready artifacts. Users whose organizations are **movement-leader tenants** keep the **existing checklist shape, task catalog, nav order, and corpus → themes → agent narrative** documented in [`movement-leader-onboarding-flow.md`](./movement-leader-onboarding-flow.md). No regressions for `lucas-pulley`-style orgs.
>
> Treat this document as the **ordered instruction set** for the build. Follow steps in sequence. Do not skip the compatibility gates in §3.

---

## 0. Read before writing code

1. [`CLAUDE.md`](../../../CLAUDE.md) — six-layer chain (schema → … → UI), pnpm, semantic tokens, dashboard route group.
2. [`docs/design/DESIGN.md`](../../design/DESIGN.md) — tonal stacking; no raw hex; restraint in onboarding copy.
3. [`docs/build/strategy/movement-leaders-as-ecosystem-layer.md`](../strategy/movement-leaders-as-ecosystem-layer.md) — implementation orgs vs trusted voices; do not collapse the two IA stories.
4. Target UX spec — [`dashboard-flow-natasha-nikkel-youthfront.md`](./dashboard-flow-natasha-nikkel-youthfront.md).
5. Existing onboarding contract — [`movement-leader-onboarding-flow.md`](./movement-leader-onboarding-flow.md) (task keys, phases, prep gates).
6. Schema — [`src/lib/db/schema.ts`](../../../src/lib/db/schema.ts) (`organizations`, including `organization_type`, `type`, `settings` jsonb, onboarding timestamps).
7. Dashboard entrypoints — `src/app/(dashboard)/layout.tsx`, `src/components/dashboard/dashboard-shell.tsx`, `src/app/(dashboard)/dashboard/page.tsx` (paths relative to repo root).

---

## 1. Definitions

| Term | Meaning |
|------|---------|
| **Movement-leader persona** | Default dashboard narrative: personal corpus, themes, agent QA, trusted-voice activation. Org slug pattern examples: `lucas-pulley`, Alan / JR / Liz rows. |
| **Implementation-org persona** | Ops-forward nonprofit / institutional buyer: inventory, policy scope, cross-functional routing (programs vs development), board-facing outputs. Exemplar: `youthfront`. |
| **Persona resolution** | One server-side or shared helper that returns `movement_leader \| implementation_org` (or boolean `isImplementationOrg`) from **org record only**, never from user email heuristics. |

---

## 2. Hard constraints (non-negotiable)

1. **Default = movement leader.** If persona cannot be resolved, behave exactly as today (movement-leader assumptions). Implementation-org behavior is **opt-in per organization**.
2. **No duplicate route trees.** Same URLs (`/dashboard`, `/welcome`, `/program`, `/onboarding/...`) for everyone; differences are **copy**, **module ordering**, **task visibility rules**, and **curated Program links**—not a second `(dashboard-implementation)` folder unless product explicitly expands scope later.
3. **Do not delete or rename existing task keys** used by movement leaders. If implementation orgs need fewer steps or different labels, implement **filtering / alternate descriptions** driven by persona, not a forked `tasks.ts` file that drifts.
4. **Schema changes are last resort.** Prefer `organizations.settings` (jsonb) or a **controlled value** in existing text columns (`organization_type` / `type`) with a documented enum. If you add a column, migrate + regenerate layers per `CLAUDE.md`; never patch hooks alone.
5. **RLS and org resolution** stay centralized (`resolveActiveOrganizationId`, membership lists). Persona must use the **same org id** as onboarding and program APIs.

---

## 3. Compatibility gates (run after every slice)

| Gate | Check |
|------|--------|
| G1 | Sign in as a movement-leader test org: onboarding panel shows **unchanged** phase labels and task routes; corpus/themes/agent prep gates still apply. |
| G2 | Sign in as implementation-org test org: sees **implementation** overview emphasis and any hidden/reordered tasks per §7; no broken links. |
| G3 | `pnpm typecheck` and `pnpm lint` green; add/adjust unit tests for **persona resolution** and **task filtering** if logic is non-trivial. |
| G4 | No new empty dashboard surfaces (overview, program template view, onboarding step). |

---

## Step 1 — Lock the data primitive for “implementation org”

**Goal:** One authoritative flag or enum on the organization row that engineering and Supabase seeds agree on.

**Actions:**

1. Inspect live `organizations.organization_type`, `organizations.type`, and typical `settings` payloads for `youthfront` vs `lucas-pulley` (Supabase MCP or Studio).
2. Choose **one** source of truth:
   - **Option A (preferred if enum fits):** Normalize `organization_type` (or `type`) to include values like `movement_leader` and `implementation_organization` (exact strings documented in a single `src/lib/organizations/persona.ts` or similar—avoid string scattering).
   - **Option B:** `settings.dashboardPersona = "implementation_org" | "movement_leader"` with default `"movement_leader"` when missing.
3. Document allowed values in a short comment next to the helper introduced in Step 2.
4. Backfill **only** known implementation buyers (e.g. Youthfront) and verify movement-leader orgs remain **unset or explicitly movement_leader** so behavior does not flip accidentally.

**Stop condition:** You can query an org by slug and deterministically know its persona in TypeScript.

---

## Step 2 — Implement `resolveDashboardPersona(org)` (single choke point)

**Goal:** All branching reads one function.

**Actions:**

1. Add a small pure function + types (e.g. `src/lib/dashboard/dashboard-persona.ts`):
   - Input: organization row or `{ organization_type, type, settings }`.
   - Output: `'movement_leader' | 'implementation_org'` with **default `'movement_leader'`**.
2. Use this function from:
   - Server components that need persona-specific metadata (e.g. pass `persona` into layout children via React context **only if necessary**—prefer passing props from layout data loaders to avoid client bundle growth).
   - `GET /api/onboarding/state` response shaping **if** task lists or copy blocks differ by persona (see Step 7).
3. **Do not** branch on `slug === 'youthfront'` in UI components except as a temporary feature flag behind `NODE_ENV === 'development'` during migration; remove once Step 1 primitive exists.

**Stop condition:** Grep shows persona branching centralized; no scattered slug checks in TSX.

---

## Step 3 — Dashboard overview (`/dashboard`) — conditional modules & copy

**Goal:** Natasha-class users see ops-forward language and module emphasis; movement leaders see current framing.

**Actions:**

1. In `src/app/(dashboard)/dashboard/page.tsx` (or a tiny extracted component), load the active organization server-side (mirror how layout resolves memberships—use the **same** active org as query `org` param rules).
2. Call `resolveDashboardPersona`.
3. For **`implementation_org`**:
   - Adjust headline / body copy to foreground **Program → Safety**, **inventory / governance**, and **onboarding as operational readiness** (see Natasha doc §1–3).
   - Re-order cards if needed: e.g. Program templates first, Teaching library third.
4. For **`movement_leader`**:
   - Keep existing module set and ordering unless product requests otherwise; copy should continue to support corpus/agent journey without COO jargon.

**Stop condition:** G2 satisfied; G1 unchanged visuals/copy for movement leader.

---

## Step 4 — `DashboardShell` nav labels (optional, minimal)

**Goal:** Subtle IA alignment without new routes.

**Actions:**

1. If nav duplication is confusing for implementation orgs only, allow optional label tweaks via persona (e.g. “Program templates” → “Safety & Sandbox library”) **without** changing `href`s.
2. Movement-leader nav strings stay default.

**Stop condition:** URLs unchanged; movement-leader nav identical byte-for-byte to pre-change unless copy was shared-neutral.

---

## Step 5 — Program index and template curation

**Goal:** Implementation orgs surface governance-heavy templates first; movement leaders may keep alphabetical or existing grouping.

**Actions:**

1. Extend manifest or fixture metadata (e.g. tags on `loadStitchTemplatesManifest()` entries) with optional `audience: ('implementation' | 'movement_leader' | 'all')[]` defaulting `'all'`.
2. In `src/app/(dashboard)/program/page.tsx`, accept persona from server props and:
   - **Sort** or **subsection** templates so Safety templates tagged `inventory`, `policy`, `vendor`, `incident` appear in an “Operations & governance” group for implementation orgs.
   - Movement-leader view: either **full list** as today or **exclude** ops-only stubs if they add noise—only if product confirms; default is show-all sorted neutrally.
3. Do not break deep links: `/program/safety/[id]` still works for any manifest id.

**Stop condition:** Youthfront-like persona lands on Program page and immediately sees governance-relevant templates; Lucas-like persona still sees appropriate full set.

---

## Step 6 — Fixture copy and ownership labels (content pass)

**Goal:** Templates Natasha opens do not read like “personal brand onboarding.”

**Actions:**

1. For Safety fixtures Youthfront will touch first, add eyebrow / metadata / intro lines that name **operational ownership** and **handoffs** (development / programs) per [`dashboard-flow-natasha-nikkel-youthfront.md`](./dashboard-flow-natasha-nikkel-youthfront.md) §4.
2. Avoid any CTA that suggests pasting **donor** or **youth** PII into consumer AI tools.
3. Movement-leader–only Sandbox fixtures can keep existing voice.

**Stop condition:** Spot-check with persona doc “Governance & data boundaries.”

---

## Step 7 — Onboarding checklist behavior (filter & copy, not fork)

**Goal:** Implementation orgs emphasize operational tasks; movement leaders keep corpus/themes/agent spine.

**Actions:**

1. Decide policy per task key using a table in code, e.g. `TASK_PERSONA_VISIBILITY[taskKey][persona] = 'full' | 'hidden' | 'optional_copy'`.
2. Preferred minimal first slice:
   - **Same tasks**, **different descriptions** where the step is shared (e.g. organization profile explains multi-site ops for implementation orgs).
   - Hide or mark **optional** only tasks that truly do not apply (e.g. skip heavy “corpus review” only if product explicitly waives it for implementation-only engagements—coordinate with stakeholders; do not hide prep-gated tasks without staff workflow approval).
3. Implement filtering in **one** place: either server-side in onboarding state builder (`src/lib/services/onboarding/` / `src/lib/onboarding/state.ts`) or in the API response mapper so the client checklist stays dumb.
4. **Movement-leader org:** returned task list must match current production behavior (G1).

**Stop condition:** Automated or manual matrix: every `task_key` documented for both personas (`full` / `hidden` / `copy variant`).

---

## Step 8 — Onboarding step pages (`/onboarding/:step`)

**Goal:** Shared routes; implementation-specific body copy where placeholders exist today.

**Actions:**

1. For `PlaceholderOnboardingStep` tasks, inject persona-aware paragraphs (inventory language vs voice corpus language) via props from page loader.
2. Do not introduce separate routes like `/onboarding-implementation/...` in this phase.

**Stop condition:** No blank steps; copy matches persona doc tone.

---

## Step 9 — Staff admin (`/admin/onboarding`)

**Goal:** Staff can see persona tag for each org row (debug + unlock discipline).

**Actions:**

1. Add a column or badge “Persona: implementation / movement leader” sourced from `resolveDashboardPersona`.
2. No change to unlock mechanics unless implementation orgs gain different prep-gated tasks—in that case, unlock buttons must remain correct per org.

---

## Step 10 — Verification & rollout

1. Run `pnpm validate:all` if schema or generated layers touched.
2. Manual **dual-persona** sign-in checklist (G1–G4).
3. Update [`dashboard-flow-natasha-nikkel-youthfront.md`](./dashboard-flow-natasha-nikkel-youthfront.md) §2–3 only if routes or data primitives changed (keep SSOT accurate).
4. Ship behind nothing if movement-leader defaults are preserved; otherwise feature-flag **only** the new classification until backfill is verified.

---

## Reference — exemplar org slugs (verify in Supabase)

| Persona | Example slug (production snapshot) |
|---------|-------------------------------------|
| Implementation org | `youthfront` |
| Movement leader | `lucas-pulley` |

Replace with your test tenants in staging before relying on slug-based QA.

---

## Source index

| Doc | Use |
|-----|-----|
| [`dashboard-flow-natasha-nikkel-youthfront.md`](./dashboard-flow-natasha-nikkel-youthfront.md) | UX / governance intent |
| [`movement-leader-onboarding-flow.md`](./movement-leader-onboarding-flow.md) | Must-not-break contract |
| [`dashboard-flow-lucas-pulley.md`](./dashboard-flow-lucas-pulley.md) | Movement-leader dashboard narrative cross-check |
| Youthfront COO brief | `docs/research/state-of-ai-2026/core-docs-repo/youthfront-ai-guides/ai-core-leadership-youthfront/brief-coo.md` |
