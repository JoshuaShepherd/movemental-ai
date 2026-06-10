# Agent Room stub ↔ stream parity sign-off

## Parity sign-off 2026-06-10 (DRAFT — PAR-06 executor)

- **Executor agent:** Cursor (PAR-01–06 pack)
- **Reviewer agent:** _(PAR-07 fills in)_
- **PAR-00 GAP rows remaining:** 4 (G1–G4 in matrix; G5/G6 closed)
- **Opening local choreography:** pass (unit + e2e stream-local block)
- **Lead chip parity:** pass (LOCAL beatIntro → AGENT "Okay, map it")
- **Beat→readback live:** skipped (engine-gated; fixture contract tests pass)
- **Stub regression:** pass (unchanged hook; e2e stub block)
- **Docs aligned:** pass (`movemental-room-script.md`, handoff doc, ADR amendment)
- **Test evidence:**

```text
pnpm typecheck          — pass
pnpm test:run tests/unit/local-choreography.test.ts — pass
pnpm test:run tests/unit/composer-routing.test.ts — pass
pnpm test:run tests/unit/agent-room-stream-contract.test.ts — pass
pnpm lint               — (run at PAR-07)
RUN_AGENT_ROOM_E2E=1 AGENT_ROOM_TEST_MODE=stream pnpm test:e2e tests/e2e/agent-room.spec.ts — stream-local + fallback
RUN_AGENT_ROOM_E2E=1 AGENT_ROOM_TEST_MODE=stub pnpm test:e2e tests/e2e/agent-room.spec.ts — stub offline
```

- **Reviewer approval:** _(PAR-07 only — do not mark Approved here)_

### Cross-repo (PAR-03/04)

- `movemental-ai-agents/scripts/seed-data/prompts/room-host.md` — gesture policy + beatIntro stream entry
- Seed re-run: `pnpm seed:agent-room` in agents repo when deploying prompt changes

---

## PAR-07 Independent review

| Phase | Result | Notes |
| --- | --- | --- |
| A Artifacts | pass | Matrix covers all 17 `SCENES` keys + dynamic leader/beat scenes; every row classified; no blanks. (Summary header says "18" — cosmetic off-by-one, see Issue #2.) |
| B Automated | pass | UI typecheck ✅ · lint (touched files) ✅ 0 · targeted unit 22/22 ✅ · engine typecheck ✅ · engine tests 154/154 ✅ |
| C Guardrails | pass | G1–G6 below |
| D Behavioral | pass / live-deferred | Stub & stream-local + fallback proven by spec; live engine-up e2e block `test.skip`s without engine (G1–G4 live closure) |
| E Docs | pass | Stream-default truth in `movemental-room-script.md`, handoff doc, ADR; no un-superseded stub-default claim |

### Guardrail audit (C)

| # | Check | Result |
| --- | --- | --- |
| G1 | Stub zero network on load | **pass** — `useAgentRoomStub` untouched (not in diff); e2e stub block asserts 0 stream calls after 2.5s |
| G2 | Stream zero network on load | **pass** — opening via `scheduleLocalChoreography(playOpening)`, no fetch; e2e stream-local asserts 0 stream calls on load + lead-chip beatIntro |
| G3 | No merged controller | **pass** — `AgentRoom` still dispatches `StreamRoom \| StubRoom` (`agent-room.tsx:183`); two separate hooks, no fetch+playScene union |
| G4 | Generation cancel | **pass (after reviewer fix)** — `sendMessage`/`reset`/`playBeatIntro` bump `localGenRef`; `playScene` `myGen` guard bails in-flight scenes. **Fixed:** stale-chip re-set race in `playBeatIntro.then()` (see Issues) |
| G5 | Contract mirror | **pass** — UI `stream-chunk.ts` gesture kinds `["underline","circle","arrow"]` ↔ engine `ai/types.ts` `"underline"\|"circle"\|"arrow"`; chunk types unchanged in UI diff |
| G6 | ADR history | **pass** — `README.md` retains AF-01 §1 (marked *Superseded*) + INT-07 + PAR-01 amendments; nothing overwritten |

### Matrix GAP status

- **Open GAPs:** 4 — G1 (beat-intro `arrow → #opts` via engine), G2 (per-answer `circle → [data-oi]` live), G3 (full beat→readback live e2e), G4 (capture-gate parity live). *Matrix GAP IDs; distinct from guardrail G1–G6.*
- **Classification:** all four are **AGENT** moves whose *code + prompt contract is complete and verified by fixtures* (`agent-room-stream-contract.test.ts` beat/readback/handoff fixtures pass; `room-host.md` prompts the gestures per PAR-04; gesture kinds align). What remains is **live end-to-end proof with the engine running**, which the engine-gated Playwright block (`live (engine up)`) covers but `test.skip`s when the engine is unreachable.
- **Disposition:** **accepted as engine-gated**, consistent with the master-runner DoD which authored these as "engine-gated." Not silently closed. **Operator action to fully close:** run with the engine up:
  `RUN_AGENT_ROOM_E2E=1 AGENT_ROOM_TEST_MODE=stream NEXT_PUBLIC_AGENT_ROOM_MODE=stream` (UI) + engine on `:3001`, confirm `#opts` + a mid-beat `ink_gesture`.
- **Closed:** G5 (docs stub-default lie — PAR-05), G6 (lead-chip divergence — PAR-02).

### Issues found

| Severity | ID | Description | Resolution |
| --- | --- | --- | --- |
| blocker | 1 | `playBeatIntro` `.then()` set `localChips` unconditionally. If the visitor sends/replays *during* beatIntro, `playScene` bails early but still resolves → the stale "Okay, map it" chip re-appeared over the live turn (`localChips` outranks `agentChips`). | **fixed** — generation guard captures `myGen` after `playScene`'s synchronous bump; `.then()` no-ops if superseded. `use-agent-room-stream.ts`. typecheck/lint/unit re-run green. |
| minor | 2 | Parity matrix summary says "Scenes in `SCENES`: 18"; actual static keys = 17 (opening, beatIntro, toBeat, whatIs, cost, toFaq, whoBehind, talkToUs, leaderConnect, toPath, toSafety, charter, involved, withUs, onOwn, toDiscuss, discussOffer). | **deferred (non-blocking)** — cosmetic count; every key is classified, no blank rows. |
| minor | 3 | Repo-wide `pnpm test:run` exits 1: 23 test files fail with `Cannot find package '@/…'` (e.g. `onboarding/tasks`, `webhooks/calendly-*`). **Pre-existing**, unrelated to this pack — files not in the diff; `vitest.config.mts` alias config untouched; PAR specs deliberately use relative imports (DoD §3.3 allows). All 34 executing tests pass. | **deferred (non-blocking, out of scope)** — flag for a separate vitest-alias fix. |

### Verdict

**Approved with reviewer fixes**

- Reviewer: Claude (PAR-07)
- Date: 2026-06-10
- Diff reviewed: uncommitted working tree on `main` (`movemental-ai` + `movemental-ai-agents`)
- Fixes applied during review: Issue #1 — `playBeatIntro` generation guard (`use-agent-room-stream.ts`)
- Waived / conditional items: matrix GAP G1–G4 accepted as **engine-gated**; live closure requires the operator running the engine-up e2e block (command above)
- Architecture intact: dual-mode preserved, stub zero-network preserved, no merged controller
