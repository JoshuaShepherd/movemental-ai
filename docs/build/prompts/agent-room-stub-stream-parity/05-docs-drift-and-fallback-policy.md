# PAR-05 — Docs drift and fallback policy

**Prompt ID:** PAR-05  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Blocks:** PAR-01, PAR-02  
**Status:** Done  
**Last updated:** 2026-06-10

---

## 1. Role and stance

Fix **documentation lies** and lock **fallback policy** so operators and future agents do not repeat the opening regression.

**Operator decision required** for optional stream→stub degrade on engine error (implement or explicitly reject).

---

## 2. Goal

### 2.1 Documentation updates (required)

| File | Fix |
| --- | --- |
| [`docs/movemental-room-script.md`](../../../movemental-room-script.md) | Default mode = `stream`; stub = offline fallback; add “Local choreography in stream” section pointing to `opening-choreography.ts` + PAR-01 LOCAL list |
| [`src/components/agent-room/README.md`](../../../src/components/agent-room/README.md) | ADR amendment: local layer + handoff rule; fix stale “stub default” body text where not historical |
| [`src/components/agent-room/agent-room.tsx`](../../../src/components/agent-room/agent-room.tsx) | Fix comment “Stub container — default” if still wrong |
| [`master_runner` INT](../integration-agent-backend/master_runner.md) | Add pointer to PAR pack + note PAR supersedes known deltas where closed |

### 2.2 Fallback policy (choose one — document in ADR)

**Option A — Env only (current):** Stream errors show error voice; operator sets `NEXT_PUBLIC_AGENT_ROOM_MODE=stub` for offline demos. No code change.

**Option B — Runtime degrade:** On 502/503 from `/api/agent-room/stream`, show banner + offer “Continue offline” that runs stub controller for session (large scope — needs design).

Default recommendation in §10: **Option A** unless operator selects B in Attempt log.

---

## 3. Work steps

1. Apply doc edits above.
2. Add `docs/build/agent-room-handoff.md` (short): mode switch, local layer, SSE handoff, REPLAY behavior, env vars.
3. Record operator choice on fallback policy.
4. If Option B chosen: spawn follow-up prompt — do not implement B inside PAR-05 without explicit §10 approval.

---

## 4. Definition of Done

- [ ] No doc still claims stub is default without “superseded by INT-07” context.
- [ ] `agent-room-handoff.md` exists and matches implemented behavior.
- [ ] Fallback policy recorded in ADR + handoff doc.
- [ ] Master runner PAR-05 → Done; §10 log.

---

## 5. Verification

```bash
pnpm typecheck
# Grep docs for stale claims:
rg "default.*stub|stub.*default" docs/ src/components/agent-room/ --glob "*.md"
```

---

## §10 Attempt log

### 2026-06-10 — Cursor

- Updated `movemental-room-script.md`, `README.md` ADR, `agent-room.tsx` comments.
- Created `docs/build/agent-room-handoff.md`.
- Fallback: **Option A** (env-only stub).

### Operator decisions (fill in)

| Decision | Choice | Date |
| --- | --- | --- |
| Stream engine error fallback | A | 2026-06-10 |
