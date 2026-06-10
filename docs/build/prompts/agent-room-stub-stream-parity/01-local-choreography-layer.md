# PAR-01 — Local choreography layer

**Prompt ID:** PAR-01  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** PAR-00  
**Status:** Done  
**Last updated:** 2026-06-10

---

## 1. Role and stance

Formalize the **Local Choreography Layer** — deterministic `playScene` beats that run in **stream mode without the LLM**, separate from SSE. The opening intro fix (`opening-choreography.ts`) is the seed; this prompt defines policy, structure, and tests.

**Guardrail:** Do not merge stub and stream hooks. Stream calls local choreography through a shared module; stub may keep calling `run("opening")` or refactor to the same helper — behavior must stay identical in stub.

---

## 2. Goal

1. Document in code (module header + ADR snippet) which beats are **LOCAL** per PAR-00 matrix.
2. Refactor if needed so local beats are declared in one place (e.g. extend `opening-choreography.ts` → `local-choreography.ts` with named exports: `OPENING`, optional `BEAT_INTRO`, etc.).
3. Ensure stream mode:
   - Runs LOCAL beats on load + REPLAY (`reset`).
   - Bumps generation token on first `sendMessage` (already true — verify).
   - Sets busy flag during local beats (composer disabled — verify).
4. Add unit tests (fix vitest `@/` alias if broken, or use relative imports).

---

## 3. Work steps

1. Read PAR-00 matrix LOCAL rows.
2. Audit current `opening-choreography.ts` + `use-agent-room-stream.ts` integration.
3. If PAR-00 marks `beatIntro` as LOCAL: extract acts from `SCENES.beatIntro` (or equivalent) and trigger before first agent turn when lead chip fires — **only if matrix says LOCAL**; otherwise document deferral in §10.
4. Centralize `scheduleOpeningChoreography` usage; stub may import the same scheduler.
5. Tests:
   - `OPENING_CHOREOGRAPHY` contains say + gesture, excludes show/suggest.
   - Optional: test generation cancel when gen bumps mid-scene (pure `playScene` test).

---

## 4. Definition of Done

- [ ] LOCAL beat list documented (comment or small `LOCAL_CHOREOGRAPHY` map).
- [ ] Stream load + REPLAY play opening say + gesture with **zero** `/api/agent-room/stream` calls.
- [ ] Stub mode unchanged (spot-check: `pnpm dev` with `NEXT_PUBLIC_AGENT_ROOM_MODE=stub`, opening plays).
- [ ] Unit test(s) green for choreography module.
- [ ] Master runner PAR-01 → Done; §10 log.

---

## 5. Verification

```bash
pnpm typecheck
pnpm test:run tests/unit/<new-or-updated-spec>.ts
# Manual: stream mode /agent — wait ~2s — voice line + underline visible; network tab 0 stream calls on load
```

---

## §10 Attempt log

### 2026-06-10 — Cursor

- Added `src/lib/agent-room/local-choreography.ts` (`OPENING`, `BEAT_INTRO`, `LOCAL_CHOREOGRAPHY` map).
- `opening-choreography.ts` re-exports for compat; stream hook uses `localGen` + `localBusy`.
- Tests: `tests/unit/local-choreography.test.ts` (4 cases, green).
