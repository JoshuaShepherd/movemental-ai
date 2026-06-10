# PAR-02 — Composer routing parity

**Prompt ID:** PAR-02  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** PAR-00, PAR-01  
**Status:** Done  
**Last updated:** 2026-06-10

---

## 1. Role and stance

Align **composer semantics** so the same chip label does not accidentally fork into unrelated backends. Stub binds chips to `run(to)`; stream binds to `sendMessage(say)`. Product must choose per chip whether stream should:

- **A)** Send utterance to agent (AGENT), or  
- **B)** Run local scene/choreography first (LOCAL), then optionally agent, or  
- **C)** Stay stub-only.

---

## 2. Goal

1. Implement PAR-00 decisions for each `DEFAULT_SUGGESTIONS` chip and opening `suggest` chip.
2. For LOCAL lead path (“Get a clear next AI step”): if matrix says LOCAL, wire stream chip to local `beatIntro` (or equivalent) **before** any SSE call; if AGENT, ensure utterance matches what `room-host.md` expects and document in matrix.
3. Typed input in stream: today always goes to agent. Decide if any regex routes should run **local** choreography first (probably no — document as intentional AGENT-only in stream).
4. Ensure `agentChips` from SSE `suggest` chunk still route through `sendMessage(value)` — unchanged.

---

## 3. Work steps

1. Read `composer.tsx` `DEFAULT_SUGGESTIONS` vs `SCENES.opening` suggest chips.
2. Read `use-agent-room-stub.ts` `suggest` binding vs `use-agent-room-stream.ts` suggestions builder.
3. Implement chip routing table in code comments + update parity matrix rows.
4. Add unit test for chip handler selection in stream (mock sendMessage / local runner).

---

## 4. Definition of Done

- [ ] Each default chip has documented routing: LOCAL / AGENT in matrix + code comment.
- [ ] Lead chip path no longer accidental divergence (explicit product choice implemented).
- [ ] Stub chip routing unchanged.
- [ ] No network on load; network only after user action that is classified AGENT.
- [ ] Master runner PAR-02 → Done; §10 log.

---

## 5. Verification

```bash
pnpm typecheck
pnpm test:run tests/unit/<composer-routing-spec>.ts
# Manual stream: tap each default chip — observe local-only vs SSE per matrix
# Manual stub: tap chips — still run scenes locally, 0 network
```

---

## §10 Attempt log

### 2026-06-10 — Cursor

- Added `src/lib/agent-room/composer-routing.ts`; wired in `use-agent-room-stream.ts`.
- Lead chip → local `beatIntro`; follow-up "Okay, map it" → `sendMessage`.
- Tests: `tests/unit/composer-routing.test.ts` (3 cases, green).
