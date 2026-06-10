# PAR-00 — Parity audit and matrix

**Prompt ID:** PAR-00  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** —  
**Status:** Done  
**Last updated:** 2026-06-10

---

## 1. Role and stance

You are the **parity auditor**. Produce a read-only artifact that maps every visitor-visible move in the stub script to its stream-mode implementation (or absence). **Do not change product code** in this prompt except to add the matrix file under `docs/`.

**Reviewer use:** A second agent uses this matrix to approve or challenge classifications before PAR-01–06 execute.

---

## 2. Goal

Create **`docs/build/agent-room-stub-stream-parity-matrix.md`** (or update if exists) containing:

1. **Inventory** of all scenes in `SCENES` (`data/scenes.ts`) with act counts.
2. **Per-scene table** for at least: `opening`, `beatIntro`, `toBeat`, `whatIs`, `cost`, `toFaq`, `whoBehind`, `talkToUs`, `toPath`, `toSafety`, beat/readback flow (via `beat-scenes.ts`), `leaderScene`, capture gates.
3. **Classification** per move (see master runner §2.2): LOCAL / AGENT / STUB-ONLY / GAP.
4. **Stream implementation column:** file + mechanism (e.g. `opening-choreography.ts`, `DEFAULT_SUGGESTIONS`, SSE `ui_render`, engine tool name, “none”).
5. **Stub implementation column:** `run(name)`, `routeInput`, chip `to`, etc.

---

## 3. Work steps

1. Read [`docs/movemental-room-script.md`](../../../movemental-room-script.md) end-to-end.
2. Read `src/lib/agent-room/data/scenes.ts`, `beat-scenes.ts`, `leader-scenes.ts`, `route-input.ts`.
3. Read `use-agent-room-stub.ts`, `use-agent-room-stream.ts`, `opening-choreography.ts`, `composer.tsx`.
4. Read `stream-screen.tsx` — note stub-only vs stream handlers.
5. Skim INT-07 §10 known deltas in [07-e2e-live-and-fallback.md](../integration-agent-backend/07-e2e-live-and-fallback.md).
6. Write the matrix markdown with a **Summary** section: count of GAP rows, top 5 risks, recommended PAR prompt order adjustments (if any).

---

## 4. Definition of Done

- [ ] Matrix file committed under `docs/build/`.
- [ ] Every scene name in `SCENES` appears in the matrix.
- [ ] Opening move explicitly notes: stream uses `OPENING_CHOREOGRAPHY` (partial local); stub uses full `opening` scene.
- [ ] Lead chip row documents stub `beatIntro` vs stream `sendMessage("Get a clear next AI step")`.
- [ ] Summary lists GAP count and blocker rows for PAR-01+.
- [ ] Master runner PAR-00 row updated; §10 Attempt log appended here.

---

## 5. Verification (read-only)

```bash
pnpm typecheck   # should be unchanged
```

No runtime tests required.

---

## §10 Attempt log

### 2026-06-10 — Cursor

- Created `docs/build/agent-room-stub-stream-parity-matrix.md` (18 scenes, 6 GAP → 4 after PAR-01/02).
- Master runner PAR-00 → Done.
