# Agent Room — stub ↔ stream parity reconciliation

**Canonical location:** `movemental-ai/docs/build/prompts/agent-room-stub-stream-parity/`  
**Target agent:** Cursor / Claude Code executing one prompt at a time  
**Primary repos:** `movemental-ai` (UI) **+** `movemental-ai-agents` (engine, prompts 03–04)  
**Predecessor:** [integration-agent-backend](../integration-agent-backend/master_runner.md) (INT-00–INT-10, **signed off 2026-06-10** with known deltas)  
**Authoritative stub script:** [`docs/movemental-room-script.md`](../../../movemental-room-script.md) (currently stale on mode defaults — fixed in PAR-05)

---

## What this pack is

A **follow-on reconciliation program** after INT-07 flipped the default to `"stream"`. The Ink Band migration (AF-12) and agent integration (INT-07) each succeeded on their own terms, but the **composed product** still treats stub and stream as two parallel implementations sharing a shell — not one coherent experience with a defined handoff.

This pack defines the problem, desired end state, and sequenced prompts so a runner agent (and a **reviewer agent**) can close the gap without regressing the offline fallback.

**Start here:** [`master_runner.md`](./master_runner.md)

---

## Prompt index

| Order | ID | Prompt | Primary focus |
| ---: | --- | --- | --- |
| 0 | PAR-00 | [00-parity-audit-and-matrix.md](./00-parity-audit-and-matrix.md) | Read-only: stub path vs stream path matrix |
| 1 | PAR-01 | [01-local-choreography-layer.md](./01-local-choreography-layer.md) | Formalize scripted beats that must never depend on the LLM |
| 2 | PAR-02 | [02-composer-routing-parity.md](./02-composer-routing-parity.md) | Chip + typed-input semantics in stream vs stub |
| 3 | PAR-03 | [03-beat-readback-engine-contract.md](./03-beat-readback-engine-contract.md) | Beat → readback choreography + gesture targets (cross-repo) |
| 4 | PAR-04 | [04-room-host-script-reconciliation.md](./04-room-host-script-reconciliation.md) | Align `room-host.md` + seed with stub SSOT |
| 5 | PAR-05 | [05-docs-drift-and-fallback-policy.md](./05-docs-drift-and-fallback-policy.md) | ADR, room script, env docs; optional degrade policy |
| 6 | PAR-06 | [06-parity-e2e-signoff.md](./06-parity-e2e-signoff.md) | Mode-aware tests + draft sign-off (executor) |
| 7 | PAR-07 | [07-reviewer-sign-off-audit.md](./07-reviewer-sign-off-audit.md) | **Claude reviewer** — independent audit, sign-off or fix, merge gate |

**Status values:** `Not started` · `In progress` · `Blocked` · `PR open` · `Done` · `Deferred`

**Merge rule:** Pack is complete only when PAR-07 verdict is **Approved** or **Approved with reviewer fixes**.
