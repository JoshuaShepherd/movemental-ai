# AU-09 — Discuss mode staging E2E

**Prompt ID:** au-09-discuss-staging-e2e  
**Target agent:** Cursor / Claude Code  
**Primary repos:** `movemental-ai` + `movemental-ai-agents`  
**Last updated:** 2026-06-18  
**Source:** [agent-room-long-form-discussion-ui.md](../../notes/agent-room-long-form-discussion-ui.md) · consultation §7 Tier 3

Paste the block below into a fresh agent turn.

---

## Problem statement

**Discuss** is the long-form AI engagement path — flag `NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1`, turn cap, capture handoff — but **default off**. Staging must prove: enter Discuss → multi-turn agent → cap → `discuss` capture → inbox.

---

## The prompt

> You are enabling and **end-to-end validating Discuss mode** on staging — not necessarily production default. Prove the full path works with engine configured.
>
> ### 0. Orient first
>
> **movemental-ai:**
> - `src/lib/agent-room/discuss.ts`, `discuss-entry.ts`, `use-discuss-phase.ts`
> - `tests/e2e/agent-room-discuss.spec.ts`
> - Env: `NEXT_PUBLIC_AGENT_ROOM_DISCUSS`, `NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP`
> - [agent-room-chat-conversation-ui-ssot.md](../../notes/agent-room-chat-conversation-ui-ssot.md) §4
>
> **movemental-ai-agents:**
> - `room-host.md` Discuss phase block
> - `runtime/discuss-phase-block.md` if present
>
> ### 1. Staging env checklist
>
> Document in PR (`.env.example` or internal note):
> ```bash
> NEXT_PUBLIC_AGENT_ROOM_MODE=hybrid
> NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1
> NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP=7
> AI_AGENTS_BASE_URL=...
> AI_AGENTS_SERVICE_SECRET=...
> ```
>
> Run `pnpm seed:agent-room` in agents repo if prompt block missing.
>
> ### 2. Entry paths to test
>
> | Trigger | Expected |
> | --- | --- |
> | Chip `toDiscuss` | `enterDiscuss`, dock expands |
> | Agent chip `enter-discuss` | Local enter, no round-trip |
> | `discussOffer` consent "Yes, talk it through" | Discuss phase |
> | Post-readback chip (if exists) | Discuss with readback context |
>
> Fix any broken entry wiring found.
>
> ### 3. Runtime behavior
>
> - Typed input in Discuss → always AGENT (SSE)
> - Turn counter increments per assistant message
> - At cap → offer capture (`show_capture` discuss or local stub capture)
> - `submitLead('discuss', ...)` → `/api/agent-room/capture` → contact path
>
> ### 4. E2E tests
>
> Extend `agent-room-discuss.spec.ts`:
> - Mock or live engine (`RUN_AGENT_ROOM_EE=1`) for at least 2 turns
> - Assert phase=`discuss` in request body to `/api/agent-room/turn`
> - Cap triggers capture UI
>
> Stub mode with flag on: must show honest capture, not fake LLM.
>
> ### 5. Production default decision (document only)
>
> PR comment: recommend **stay off in prod** until AU-10 + AU-11 complete, or enable with operator sign-off.
>
> ### 6. Update docs
>
> [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §11 — note staging validation date.

---

## Definition of done

- [ ] Discuss flag on passes e2e (mocked or live engine)
- [ ] Turn cap → capture surface visible
- [ ] discuss capture POST verified (mock or integration)
- [ ] Stub + flag on does not pretend to be live chat
- [ ] Engine Discuss prompt block seeded

## Verification commands

```bash
NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1 pnpm test:e2e tests/e2e/agent-room-discuss.spec.ts
RUN_AGENT_ROOM_EE=1 NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1 pnpm test:e2e tests/e2e/agent-room-discuss.spec.ts
pnpm typecheck
```

## Do not

- Enable Discuss in production env without explicit operator instruction in this task
- Remove turn cap
- Add bubble-column chat UI
