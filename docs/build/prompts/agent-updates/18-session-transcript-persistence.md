# AU-18 — Session transcript persistence

**Prompt ID:** au-18-session-persistence  
**Target agent:** Cursor / Claude Code  
**Primary repos:** `movemental-ai` + `movemental-ai-agents` (optional)  
**Last updated:** 2026-06-18  
**Source:** [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §18.2 · grep `agent_room_transcripts`

Paste the block below into a fresh agent turn.

---

## Problem statement

Returning visitors **restart cold** — no transcript persistence. Proposed `agent_room_transcripts` + `persistRoomTranscript` should store tenant-scoped session history for continuity and ops review.

---

## The prompt

> You are implementing **agent room transcript persistence** — DB table, server-side write on turn completion, optional client restore on return visit.
>
> ### 0. Orient first
>
> - Grep `agent_room_transcripts`, `persistRoomTranscript`, `sessionId`, `anonId`
> - `src/lib/agent-room/stream-route-handler.ts` — proxy adds userId from anonId
> - `scripts/query-room-transcripts.ts` if exists
> - [TYPE_SAFETY_CHAIN.md](../../../architecture/TYPE_SAFETY_CHAIN.md)
>
> ### 1. Schema (Layer 1)
>
> If table missing, additive migration via Drizzle + Supabase MCP:
>
> ```text
> agent_room_transcripts
>   id, organization_id, session_id, anon_id, user_id (nullable),
>   phase (guide|discuss), screen_id, turns (jsonb), metadata (jsonb),
>   created_at, updated_at
> ```
>
> Index: `(organization_id, session_id)`, `(anon_id, updated_at desc)`
>
> Full waterfall: generate schemas → services → routes → hooks per project protocol.
>
> ### 2. Write path
>
> - After SSE `done` chunk in `stream-route-handler.ts` OR engine callback — persist turn pair
> - Store: sanitized user message + assistant text (no secrets)
> - Rate limit / max turn array size (e.g. last 50 turns)
> - **PII:** email only if already in capture flow — don't log composer before submit
>
> ### 3. Read path (minimal)
>
> - Client sends `sessionId` / `anonId` on `/turn` (already in proxy schema)
> - On mount, optional GET `/api/agent-room/transcript?sessionId=` restores history into thread when `chatActive`
> - Mast home / replay → clear or new session (existing behavior)
>
> ### 4. Privacy & retention
>
> - Document retention policy in code comment (e.g. 90 days — operator configurable later)
> - RLS: tenant-scoped; anon sessions readable only with session id cookie/localStorage
>
> ### 5. Tests
>
> - Route test: POST turn → row appended
> - GET restores history
> - `pnpm validate:all`
>
> ### 6. Ops script
>
> Ensure `scripts/query-room-transcripts.ts` works for support debugging.

---

## Definition of done

- [ ] `agent_room_transcripts` table live with migration
- [ ] Turns persisted on agent completion
- [ ] Optional restore on return (document if deferred)
- [ ] Tenant scoped + validate:all green
- [ ] Platform reference §18.2 gap updated

## Verification commands

```bash
pnpm db:check
pnpm validate:all
pnpm typecheck
```

## Do not

- Store service secrets or full engine tool payloads with PII
- Break anonymous room access when user not logged in
- Skip RLS on tenant table
