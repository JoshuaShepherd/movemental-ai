# AU-04 — Single beat SSOT (local MAP_Q + engine beats)

**Prompt ID:** au-04-single-beat-ssot  
**Target agent:** Cursor / Claude Code  
**Primary repos:** `movemental-ai` + `movemental-ai-agents`  
**Last updated:** 2026-06-18  
**Source:** [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §18.3

Paste the block below into a fresh agent turn.

---

## Problem statement

The organizational reality map runs on **two beat definitions**:

| Path | Questions | Source |
| --- | --- | --- |
| Local stub/hybrid | 4 questions (`MAP_Q`) | `src/lib/agent-room/data/map-q.ts` |
| Engine stream | 6 beats | `movemental-ai-agents` host scenes / `render_beat` |

Verdict logic is contract-tested via `beat-verdict-spec.json`, but visitors may get different diagnostic depth depending on path. One SSOT is required.

---

## The prompt

> You are converging the **organizational reality map (beat)** to a **single source of truth** shared by local choreography and the live engine — without breaking the Safety gate, readback verdict contract, or Playwright/e2e probes.
>
> ### 0. Orient first
>
> **movemental-ai:**
> - `src/lib/agent-room/data/map-q.ts`
> - `src/lib/agent-room/beat-scenes.ts`
> - `src/lib/agent-room/data/scenes.ts` (`toBeat`, `beatIntro`)
> - `src/components/agent-room/screen/stub/beat-screen.tsx`
> - `tests/` — grep `MAP_Q`, `beat`, `map-q`
>
> **movemental-ai-agents:**
> - `scripts/seed-data/prompts/room-host.md` (reality check section)
> - Host scenes / beats definition (grep `HOST_SCENES`, `beats`, `render_beat`)
> - `src/lib/tools/render-tools.tool.ts` — `RealityCheckBeatProps`
> - `beat-verdict-spec.json` or equivalent contract test
>
> Read [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §10 and §18.3.
>
> ### 1. Decision (document in PR)
>
> Pick **one** canonical beat set:
>
> | Option | Pros | Cons |
> | --- | --- | --- |
> | **A. Expand local to 6** | Engine unchanged | More stub choreography |
> | **B. Reduce engine to 4** | Matches current local UX | Prompt + tool contract change |
> | **C. Shared JSON package** | True SSOT | Cross-repo import path |
>
> **Default recommendation:** Option **A or C** — keep Safety gate on Q1; align question text verbatim between repos.
>
> ### 2. Implement SSOT
>
> Preferred: add `beat-catalog.json` (or `.ts`) in **movemental-ai** at `src/lib/agent-room/data/beat-catalog.ts` exporting:
>
> ```ts
> export type BeatQuestion = { id: string; tag: "Safety"|"Sandbox"|"Training"|"Technology"; prompt: string; options: { label: string; value: string }[]; gate?: ... }
> export const BEAT_CATALOG: BeatQuestion[]
> ```
>
> - Local: `map-q.ts` imports from catalog (delete duplicate literals).
> - Engine: copy or symlink catalog into agents repo seed data **or** document manual sync with CI check comparing hashes.
>
> If cross-repo sync is too heavy this slice, implement catalog in movemental-ai and add a **contract test** in agents that fails when beat count/text diverges.
>
> ### 3. Safety gate invariant (must hold)
>
> Q1 pass **only** if answer matches "Yes, all four, in writing" (or current SSOT exact string). Gate fail → threat readback, stop. Do not weaken.
>
> ### 4. Verdict alignment
>
> Run existing verdict tests:
> ```bash
> # movemental-ai-agents
> pnpm test:room-host  # or equivalent beat contract test
> ```
> Update `computeSafetyVerdict()` inputs if beat answer shape changes.
>
> ### 5. UI parity
>
> - `beat-screen.tsx` renders N questions from catalog length
> - Progress indicator shows correct count
> - Stream mode `render_beat` props match catalog indices
>
> ### 6. Docs
>
> Update [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §10 — remove "local vs engine divergence" from gaps when done.

---

## Definition of done

- [ ] One catalog defines all beat questions and options
- [ ] Local and engine use same count and Q1 gate text
- [ ] Contract tests green in both repos (or hash sync test)
- [ ] `pnpm test:e2e tests/e2e/agent-home-dock.spec.ts` green (movemental-ai)
- [ ] Platform reference gap §18.3 updated

## Verification commands

```bash
# movemental-ai
pnpm typecheck
pnpm test:run tests/unit/*beat* tests/unit/*map*
pnpm test:e2e tests/e2e/agent-home-dock.spec.ts

# movemental-ai-agents (if available)
pnpm test:room-host
```

## Do not

- Change verdict rules to flatter "past Safety" without named refusals
- Remove beat screen from closed set
- Hand-patch upper layers if schema/types break — fix catalog first
