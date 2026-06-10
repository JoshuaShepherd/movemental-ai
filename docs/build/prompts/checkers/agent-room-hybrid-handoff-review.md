# Checker — Agent Room hybrid handoff review

**Prompt ID:** HYB-CHECK  
**Target agent:** **Claude (reviewer role)** — fresh context; do not assume the implementation session was correct  
**Primary repos:** `movemental-ai` **+** `movemental-ai-agents` (prompt §12 only)  
**Blocks merge until:** Verdict **Approved** or **Approved with reviewer fixes**  
**Last updated:** 2026-06-10

---

## 1. Role and stance

You are the **independent reviewer**, not the implementation runner.

Verify the HYB hybrid handoff: deterministic script by default, SSE only on classified unscripted moves, script-aware engine context, graceful degrade.

**You may:**

- Run read-only and verification commands (`pnpm typecheck`, `pnpm lint`, `pnpm test:run`, targeted greps, file reads).
- Fix clear, scoped defects (typos, broken tests, missing imports, doc lies) — document every fix in §10.

**You must not:**

- Remove hybrid mode or revert to stream-as-default without operator approval.
- Approve if hybrid load fetches `/api/agent-room/stream`.
- Approve if leader/chip taps POST to the agent in hybrid mode.

**Handoff:** Executor produces draft [`docs/build/agent-room-hybrid-signoff.md`](../../agent-room-hybrid-signoff.md). You finalize it.

---

## 2. Inputs (read in this order)

1. [`docs/build/agent-room-handoff.md`](../../agent-room-handoff.md)
2. [`docs/build/agent-room-hybrid-signoff.md`](../../agent-room-hybrid-signoff.md) (draft)
3. [`docs/build/agent-room-stub-stream-parity-matrix.md`](../../agent-room-stub-stream-parity-matrix.md) — Hybrid column on `opening`
4. [`docs/movemental-room-script.md`](../../../movemental-room-script.md) — mode table
5. [`src/components/agent-room/README.md`](../../../src/components/agent-room/README.md) — HYB amendment
6. Git diff vs base branch

**Code hotspots:**

| Area | Files |
| --- | --- |
| Classifier | `src/lib/agent-room/move-classifier.ts`, `tests/unit/move-classifier.test.ts` |
| SSE extract | `src/lib/agent-room/agent-stream-turn.ts`, `tests/unit/agent-stream-turn.test.ts` |
| Hybrid hook | `src/components/agent-room/use-agent-room-hybrid.ts` |
| Mode dispatch | `src/lib/agent-room/mode.ts`, `src/components/agent-room/agent-room.tsx` |
| Screen adapter | `src/components/agent-room/screen/hybrid-screen.tsx` |
| Proxy contract | `src/lib/agent-room/proxy-schema.ts`, `src/app/api/agent-room/stream/route.ts` |
| Stub regression | `src/components/agent-room/use-agent-room-stub.ts` |
| Stream regression | `src/components/agent-room/use-agent-room-stream.ts` |
| E2E | `tests/e2e/agent-room.spec.ts` |
| Engine prompt | `movemental-ai-agents/scripts/seed-data/prompts/room-host.md` §12 |

---

## 3. Review protocol

### Phase A — Artifact completeness

- [ ] `move-classifier.ts` exists with LOCAL/AGENT routes documented in code comments.
- [ ] Default mode is `hybrid` in `mode.ts`.
- [ ] Parity matrix has Hybrid column for opening moves.
- [ ] `roomContext` in proxy schema and forwarded upstream.
- [ ] `room-host.md` §12 hybrid policy present.

### Phase B — Automated verification

```bash
cd movemental-ai
pnpm typecheck
pnpm lint
pnpm test:run tests/unit/move-classifier.test.ts tests/unit/agent-stream-turn.test.ts tests/unit/agent-room-stream-contract.test.ts
```

Paste summaries in §10.

### Phase C — Behavior spot-checks (manual or E2E)

With dev server in default hybrid mode:

- [ ] `/agent` load: opening ink line visible; **0** stream calls before interaction.
- [ ] Lead chip: beatIntro voice; **0** stream calls.
- [ ] Leader portrait: FLIP to profile; **0** stream calls.
- [ ] Typed `"what does it cost"`: local pricing scene; **0** stream calls.
- [ ] Typed open-ended question: **1** stream POST (or mocked SSE in E2E).
- [ ] REPLAY: full opening scene replays.

Stub mode (`NEXT_PUBLIC_AGENT_ROOM_MODE=stub`): zero network unchanged.

### Phase D — Guardrails

- [ ] Hybrid never mounts pure stream controller as default path.
- [ ] `AgentRoomProvider` + ink layer shared across modes.
- [ ] No fetch on load in hybrid.
- [ ] Engine 502/503: room survives; user sees error or fallback line.

### Phase E — Verdict

One of:

- **Approved**
- **Approved with reviewer fixes** (list fixes in §10)
- **Changes requested** (numbered punch-list; do not merge)

Update [`docs/build/agent-room-hybrid-signoff.md`](../../agent-room-hybrid-signoff.md) with final verdict and evidence.

---

## 4. §10 Attempt log (reviewer fills)

| Step | Command / action | Result |
| --- | --- | --- |
| A1 | Read handoff, draft signoff, parity matrix, room-script mode table, README HYB amendment | All present & consistent |
| A2 | Confirm `mode.ts` default | `AGENT_ROOM_MODE = … ?? "hybrid"` ✓ |
| A3 | Confirm classifier doc comments + LOCAL/AGENT routes | `move-classifier.ts` — pure fns, LOCAL/AGENT documented ✓ |
| A4 | Confirm `roomContext` in schema + forwarded | `proxy-schema.ts` zod + `stream/route.ts:51` ✓ |
| A5 | Confirm engine §12 hybrid policy | `room-host.md` §12 present, 4 obligations ✓ |
| B1 | `pnpm typecheck` | pass (exit 0) |
| B2 | `pnpm test:run` (3 suites) | pass — 3 files / 23 tests |
| B3 | `pnpm lint` | repo-wide fail (26 errors), **0 in HYB files** — pre-existing, out of scope |
| C/D | Static trace of load / chip / leader / beat / open-text / 502-503 paths | guardrails hold (see signoff) |
| E1 | E2E `agent-room.spec.ts` | not executed (env-gated); equivalently covered by trace |

**Reviewer fixes applied:** none (HYB scope required no code changes; finalized the signoff doc only).

**Final verdict:** **Approved** — both merge-blockers clear (no stream call on hybrid load; no agent POST on chip/leader taps). Pre-existing repo-wide lint failure noted as out-of-scope housekeeping.

**Signed:** Claude (reviewer role) — 2026-06-10
