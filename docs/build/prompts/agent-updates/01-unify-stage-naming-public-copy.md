# AU-01 — Unify stage naming in public copy

**Prompt ID:** au-01-unify-stage-naming  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-18  
**Source:** [movemental-ui-ai-design-consultation-2026-06-18.md](../../notes/movemental-ui-ai-design-consultation-2026-06-18.md) §7 Tier 1

Paste the block below into a fresh agent turn.

---

## Problem statement

Public copy uses **two stage vocabularies**:

| Surface | Stages |
| --- | --- |
| Agent room / path canon | **Safety · Sandbox · Training · Technology** (stage 04 often **Tech**) |
| Research, field guide, `/research` | **Safety · Sandbox · Skills · Solutions** |

`src/lib/ai-reality/stage-mapper.ts` bridges internally, but visitors see both. Detail-oriented buyers (seminary provosts, nonprofit COOs) lose trust when labels silently differ.

---

## The prompt

> You are unifying **public-facing stage naming** across Movemental.ai so every visitor-facing surface uses one vocabulary (or explicit bridge copy where legacy URLs must stay).
>
> ### Canonical public vocabulary (agent room wins)
>
> **Safety · Sandbox · Training · Technology**
>
> Short form for tight UI: **Tech** (not "Solutions"). Never use **Skills** on agent-room or path surfaces.
>
> Internal mapper keys (`Skills` → `Training`, `Solutions` → `Tech`) may remain in `stage-mapper.ts` for backward compatibility with assessment data — but **rendered copy** must use the canonical names.
>
> ### 0. Orient first
>
> 1. Read `src/lib/ai-reality/stage-mapper.ts` — understand the bridge.
> 2. Grep the repo for public strings:
>    ```bash
>    rg -n "Skills|Solutions|Training|Technology|Sandbox|Safety" src/ docs/build/research public/ --glob '*.{tsx,ts,md,html}'
>    ```
> 3. Read [movemental-site-audit.md](../../notes/movemental-site-audit.md) §1 finding #1.
>
> ### 1. Inventory and classify hits
>
> Produce a short table in your PR description:
>
> | File | Current label | Action |
> | --- | --- | --- |
> | … | Skills | → Training |
> | … | Solutions | → Technology (or Tech in tight UI) |
> | … | internal enum | keep; add display map |
>
> **Do not change** internal DB enum values or assessment slug keys unless a migration is explicitly required — prefer display-layer mapping.
>
> ### 2. Fix surfaces (priority order)
>
> 1. **Agent room screens** — `path-screen.tsx`, `pricing-screen.tsx`, `sandbox-screen.tsx`, `training-screen.tsx`, `technology-screen.tsx`, `safety-flow/*`, `src/lib/agent-room/data/pricing.ts`
> 2. **Document pages** — audience configs, `/agent/how-we-use-ai`, decks
> 3. **Utility routes** — `/field-guide`, `/assess`, `/enroll` copy visible to visitors
> 4. **Research library** — `/research` index and article intros: either rename headings to Training/Technology **or** add a one-line bridge at first mention: *"Training (we also call this Skills in our research series)"* — pick **one** approach repo-wide; prefer rename for consistency
> 5. **Agent KB / seed copy** in `docs/build/agents/agent-room/files/public/` if referenced by live UI
>
> ### 3. Single display helper (optional but preferred)
>
> If the same mapping appears in 3+ files, add:
>
> ```ts
> // src/lib/agent-room/stage-labels.ts (or extend stage-mapper with display exports)
> export const PUBLIC_STAGE_LABELS = {
>   safety: "Safety",
>   sandbox: "Sandbox",
>   training: "Training",
>   technology: "Technology",
> } as const;
> export function publicStageLabel(id: "safety" | "sandbox" | "training" | "technology"): string
> ```
>
> Use in screens instead of hard-coded strings.
>
> ### 4. Tests
>
> - Add or extend a unit test asserting path/pricing screens render "Training" and "Technology", not "Skills"/"Solutions".
> - Run `pnpm typecheck`.
>
> ### 5. Docs
>
> Append one line to [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §6 or a new § noting canonical public labels and where legacy names may appear in URLs only.

---

## Definition of done

- [ ] Grep shows no visitor-facing "Skills" or "Solutions" on `/agent`, path, pricing, or field-guide hero copy without an explicit bridge sentence
- [ ] Agent room path fold uses Safety · Sandbox · Training · Technology consistently
- [ ] `pnpm typecheck` green
- [ ] PR includes inventory table of files changed

## Verification commands

```bash
rg "Skills|Solutions" src/components/agent-room src/app/agent src/lib/agent-room --glob '*.{tsx,ts}'
pnpm typecheck
```

## Do not

- Rename database columns or assessment slugs without team approval and migration
- Introduce a fifth stage or rename Safety/Sandbox
- Change Concept Modern archived marketing copy under `_archive/`
