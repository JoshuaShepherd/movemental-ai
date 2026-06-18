# AU-21 — Engine safety flow parity

**Prompt ID:** au-21-safety-flow-parity  
**Target agent:** Cursor / Claude Code  
**Primary repos:** `movemental-ai` + `movemental-ai-agents`  
**Last updated:** 2026-06-18  
**Source:** [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §12 · [safety-flow-migration-audit.md](../safety-flow-migration-audit.md)

Paste the block below into a fresh agent turn.

---

## Problem statement

Local choreography enters `safetyFlow` via `toSafetyFlow` scenes with steps: `question`, `fork`, `charter`, `diy`, `signup`, `ahead`, `result`. Engine tool `show_safety_flow` must drive **the same wizard** with validated `step` props — today parity may be partial.

---

## The prompt

> You are aligning **engine-driven safety flow** (`show_safety_flow`) with the local `SafetyFlowScreen` wizard — one step enum, one component, agent-driven branching.
>
> ### 0. Orient first
>
> **movemental-ai:**
> - `src/components/agent-room/screen/safety-flow/` (or `safety-flow-screen.tsx`)
> - `src/lib/agent-room/data/scenes.ts` — `toSafetyFlow*`
> - `screen-map.ts` — `safetyFlow` ComponentId
> - [safety-flow-migration-audit.md](../safety-flow-migration-audit.md)
>
> **movemental-ai-agents:**
> - `render-tools.tool.ts` — `show_safety_flow` schema
> - `room-host.md` — when to render safety flow vs beat
>
> ### 1. Step enum SSOT
>
> Export shared type (movemental-ai):
> ```ts
> export type SafetyFlowStep = 'question'|'fork'|'charter'|'diy'|'signup'|'ahead'|'result'
> ```
> Mirror in agents Zod enum — consider duplicated const + contract test hash.
>
> ### 2. Component behavior
>
> For each step, verify UI matches local scene outcomes:
> | Step | UI | Agent can advance via |
> | --- | --- | --- |
> | question | diagnostic Q | tool call with next step |
> | fork | DIY / signup / ahead | user tap + agent suggest |
> | charter | charter preview | |
> | diy | handbook email | capture |
> | signup | enroll CTA | navigate `/enroll` |
> | ahead | already past | voice |
> | result | outcome | suggest chips |
>
> Fix any step that renders blank in engine path.
>
> ### 3. Host prompt
>
> Document branching policy: after question, call `show_safety_flow({ step: 'fork' })` etc. Seed after edit.
>
> ### 4. Hybrid routing
>
> Lead chip "Get a clear next AI step" stays **local** `toSafetyFlow` — zero `/turn`. Engine path is for open-text agent turns only.
>
> ### 5. Tests
>
> - Unit: Zod accepts all steps; rejects unknown
> - E2e: lead chip → safety flow question visible, zero `/turn` (regression)
> - Mock ui_render with `step: 'charter'` → charter UI visible
>
> ### 6. Audit prompt
>
> Run checklist from [safety-flow-migration-audit.md](../safety-flow-migration-audit.md) on touched files.

---

## Definition of done

- [ ] Step enum shared/validated both repos
- [ ] All 7 steps render in engine ui_render path
- [ ] Lead chip still local-only in e2e
- [ ] Host prompt safety flow section seeded
- [ ] Platform reference §12 gap closed

## Verification commands

```bash
pnpm test:e2e tests/e2e/agent-home-dock.spec.ts
pnpm typecheck
# agents: pnpm test:room-host
```

## Do not

- Merge safety flow into beat screen
- Remove local scenes (offline requirement)
- Add raw hex from HTML prototype
