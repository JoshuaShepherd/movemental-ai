# PAR-03 — Beat → readback engine contract

**Prompt ID:** PAR-03  
**Target agent:** Cursor / Claude Code  
**Primary repos:** `movemental-ai` **+** `movemental-ai-agents`  
**Blocks:** PAR-00, PAR-02  
**Status:** Done  
**Last updated:** 2026-06-10

---

## 1. Role and stance

Close the **highest-value flow gap**: reality-check beat → readback. Stub uses `beatScene()` + `computeMapRead()`; stream relies on agent tools + `agent_handoff`. INT-07 sign-off noted full multi-beat→readback not driven live in browser.

Cross-repo: keep `stream-chunk.ts` ↔ `ai/types.ts` in sync.

---

## 2. Goal

1. Live stream: visitor completes at least one beat answer → screen updates → gesture targets resolve → readback or explicit AGENT-equivalent screen.
2. Client: stream beat component exposes all gesture targets from INT-04 allow-list (`#opts`, `[data-oi="N"]`, etc.) — verify `reality-check-beat.tsx` / prop-driven beat.
3. Engine: `render_beat`, diagnosis/readback tools, `agent_handoff` sequence documented and seeded; no stale tool names.
4. Optional LOCAL micro-choreography on beat tap (circle → reply) — only if PAR-00 classifies those acts as LOCAL; otherwise agent must emit `ink_gesture` chunks.

---

## 3. Work steps

1. Trace stub path: `onBeatAnswer` → `beatScene` in `beat-scenes.ts`.
2. Trace stream path: beat props → user selection → `onSay` → SSE → `ui_render` / `ink_gesture`.
3. Engine: read beat + readback tools, runner yield order, `room-host.md` beat section.
4. Fix client/engine gaps found (target ids, props schema, missing handoff).
5. Record one live trace (or mocked SSE fixture test) in §10.

---

## 4. Definition of Done

- [ ] Live or fixture-proven: beat answer → next beat OR readback render.
- [ ] At least one `ink_gesture` in beat flow (local or SSE).
- [ ] `agent_handoff` fires on readback path when stub would transition to diagnostician (or documented alternative).
- [ ] Both repos typecheck; engine tests for render tools pass.
- [ ] Parity matrix beat/readback rows updated from GAP → AGENT/LOCAL.
- [ ] Master runner PAR-03 → Done; §10 log.

---

## 5. Verification

```bash
# movemental-ai
pnpm typecheck
pnpm test:run tests/unit/agent-room-stream-contract.test.ts

# movemental-ai-agents
pnpm typecheck
pnpm test:run  # render tool tests

# E2E (engine required)
RUN_AGENT_ROOM_E2E=1 AGENT_ROOM_TEST_MODE=stream pnpm test:e2e tests/e2e/agent-room.spec.ts
```

---

## §10 Attempt log

### 2026-06-10 — Cursor

- Verified `reality-check-beat.tsx` exposes `#opts` + `[data-oi]` (INT-04 parity).
- Added beat→readback SSE fixture tests in `agent-room-stream-contract.test.ts`.
- Live E2E remains engine-gated (`RUN_AGENT_ROOM_E2E=1`); existing live beat test unchanged.
