# Agent Room hybrid hand-off — sign-off

**Pack:** HYB (hybrid handoff)  
**Last updated:** 2026-06-10  
**Status:** **Approved** — finalized by independent checker (Claude) per [`prompts/checkers/agent-room-hybrid-handoff-review.md`](./prompts/checkers/agent-room-hybrid-handoff-review.md)

---

## Summary

| Item | Result |
| --- | --- |
| Default mode | `hybrid` (`src/lib/agent-room/mode.ts`) |
| Classifier SSOT | `src/lib/agent-room/move-classifier.ts` |
| Hybrid controller | `src/components/agent-room/use-agent-room-hybrid.ts` |
| Shared SSE | `src/lib/agent-room/agent-stream-turn.ts` |
| `roomContext` on POST | `src/lib/agent-room/proxy-schema.ts` + stream route |
| Engine prompt §12 | `movemental-ai-agents/.../room-host.md` |

---

## Behavior checklist

- [x] Load / REPLAY: full `run("opening")`, zero stream calls
- [x] Chips → local `run(to)`
- [x] Leader tap → `leaderScene` + FLIP
- [x] Beat tap → local `beatScene`
- [x] Typed regex → local `run(routeInput)`
- [x] Typed fallback → SSE (`open_text`)
- [x] Engine 502/503 → error + local `FALLBACK_SAY`
- [x] `stub` mode unchanged (zero network)
- [x] `stream` mode refactored to use `runAgentStreamTurn`

---

## Verification (executor)

```bash
pnpm typecheck          # pass 2026-06-10
pnpm test:run tests/unit/move-classifier.test.ts tests/unit/agent-stream-turn.test.ts tests/unit/agent-room-stream-contract.test.ts
# E2E (dev server in hybrid default):
# RUN_AGENT_ROOM_E2E=1 pnpm test:e2e tests/e2e/agent-room.spec.ts
```

---

## Known GAP (v1 waived)

- Beat → readback via engine diagnostician in hybrid (stays local stub path)
- Discuss stream policy (existing flag behavior only)

---

## Reviewer verification (Claude, 2026-06-10)

| Check | Command / method | Result |
| --- | --- | --- |
| Typecheck | `pnpm typecheck` | **pass** (exit 0) |
| Unit suites | `pnpm test:run move-classifier / agent-stream-turn / agent-room-stream-contract` | **pass** — 3 files, 23 tests |
| Lint (HYB scope) | `pnpm lint` + cross-ref against HYB diff | **clean for HYB** — 0 of 26 repo errors touch any HYB file |
| Lint (repo-wide) | `pnpm lint` | **fails (pre-existing)** — 26 errors in `_archive/`, `public/templates/`, `scripts/`, `docs/`, and unrelated `screen/stub/{leader-band,capture-screen}.tsx`. Not introduced by HYB; out of scope. |
| Default mode | `mode.ts` | `"hybrid"` ✓ |
| Classifier SSOT | `move-classifier.ts` | LOCAL/AGENT routes + doc comments ✓ |
| `roomContext` | `proxy-schema.ts` (zod) + `stream/route.ts:51` forward to engine | present & forwarded ✓ |
| Engine §12 | `movemental-ai-agents/.../room-host.md` | "Hybrid handoff policy (client `roomContext`)" present, 4 obligations ✓ |
| Parity matrix | `agent-room-stub-stream-parity-matrix.md` | Hybrid column on `opening` ✓ |

### Guardrails (static trace — engine-free)

- **No fetch on load.** Boot effect calls `run("opening")` (local `play`) only. No stream POST. ✓
- **Chip / leader / beat taps are local.** Chip `onSelect → runRef.current(c.to)`; `onLeaderSelect → play(leaderScene)`; `onBeatAnswer → play(beatScene)`. None POST. ✓
- **Stream POST is gated.** The single `runAgentStreamTurn` call is reachable only via `sendMessage → runAgentTurn`, and only when `classifyTypedInput` returns a non-local route (the `route.kind === "local"` branch returns first). ✓
- **502/503 degrade.** `runAgentTurn` sets the error voice and plays local `FALLBACK_SAY` on 502/503; room stays on current screen. ✓
- **Shared provider / ink layer.** `AgentRoom` wraps all modes in `AgentRoomProvider`; hybrid drives the same `useInk()` voice/gesture layer as stub/stream. ✓
- **Stub unchanged.** `use-agent-room-stub.ts` not in the diff; zero-network path intact.
- **Stream refactor.** `use-agent-room-stream.ts` now drains via shared `runAgentStreamTurn`; no behavior regression in trace.

### Not executed

- **E2E (`tests/e2e/agent-room.spec.ts`).** Environment-gated (`RUN_AGENT_ROOM_E2E=1` + dev server + engine). Spec is well-formed and mode-aware; hybrid block asserts zero stream calls on load / lead chip and one POST on open text. Confirmed equivalently by static trace above.

### Reviewer fixes applied

None. The HYB handoff required no code changes. The repo-wide lint failure is pre-existing and unrelated; flagged here rather than silently absorbed.

---

## Verdict

**Approved.**

The hybrid handoff is correct and complete: deterministic `SCENES` script by default, SSE strictly on classifier-AGENT moves, script-aware `roomContext` plumbed to the engine (§12), and graceful 502/503 degrade. Both hard merge-blockers are satisfied — hybrid load makes **zero** stream calls and chip/leader/beat taps never POST to the agent.

One out-of-scope note for the operator: `pnpm lint` does not pass repo-wide (26 pre-existing errors, none in HYB files). It does not block this handoff but should be cleaned up in a separate housekeeping pass.

**Signed:** Claude (reviewer role) — 2026-06-10
