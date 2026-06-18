# AU-20 — Deprecate stream mode

**Prompt ID:** au-20-deprecate-stream-mode  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-18  
**Source:** [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §3 · consultation §7 Tier 6

**Gate:** Run only after hybrid parity proven (AU-07, agent-home-dock e2e green, operator sign-off).

Paste the block below into a fresh agent turn.

---

## Problem statement

Three modes (`stub`, `hybrid`, `stream`) increase test matrix and doc confusion. **Hybrid is the architectural center.** Stream mode (every turn → SSE) is legacy regression path — deprecate without breaking offline demos.

---

## The prompt

> You are **deprecating `stream` mode** in the agent room — keeping `stub` + `hybrid`, reducing docs/tests, and adding runtime warnings if stream env is set.
>
> ### 0. Orient first
>
> - `src/lib/agent-room/mode.ts`
> - `src/components/agent-room/agent-room.tsx` dispatch
> - `use-agent-room-stream.ts`
> - Tests: grep `AGENT_ROOM_MODE.*stream`, `useAgentRoomStream`
> - Docs listing stream as equal citizen
>
> ### 1. Runtime behavior
>
> | Env value | New behavior |
> | --- | --- |
> | unset / `hybrid` | hybrid (unchanged) |
> | `stub` | stub (unchanged) |
> | `stream` | **Log deprecation warning** once; run **hybrid** OR keep stream behind `NEXT_PUBLIC_AGENT_ROOM_LEGACY_STREAM=1` — pick one and document |
>
> Recommended: map `stream` → `hybrid` with `console.warn` in dev and Sentry breadcrumb in prod.
>
> ### 2. Code removal scope
>
> **Phase A (this PR):** deprecate, don't delete
> - Mark `use-agent-room-stream.ts` `@deprecated`
> - Update mode.ts JSDoc
> - Redirect stream env to hybrid
>
> **Phase B (optional follow-up):** delete stream hook after 30 days — only if e2e migrated
>
> ### 3. Tests
>
> - Migrate `agent-room.spec.ts` stream probes to hybrid + mocked SSE
> - Keep `RUN_AGENT_ROOM_EE=1` live engine test on hybrid path
> - Remove or skip stream-specific tests with comment referencing AU-20
>
> ### 4. Docs sweep
>
> Update:
> - [agent-platform-complete-reference.md](../../notes/agent-platform-complete-reference.md) §3 — stream deprecated
> - [agent-room-chat-conversation-ui-ssot.md](../../notes/agent-room-chat-conversation-ui-ssot.md) §3
> - `CLAUDE.md` if it lists three equal modes
>
> ### 5. Composer routing
>
> - `STREAM_CHIP_ROUTES` rename to `EXPANDED_DRAWER_CHIP_ROUTES` (optional cleanup) — keep behavior for expanded drawer

---

## Definition of done

- [ ] `NEXT_PUBLIC_AGENT_ROOM_MODE=stream` warns and runs hybrid (or explicit legacy flag)
- [ ] Docs say hybrid is default/center; stream deprecated
- [ ] E2e suite green without stream-only tests failing
- [ ] `pnpm typecheck` green

## Verification commands

```bash
pnpm test:e2e tests/e2e/agent-home-dock.spec.ts
RUN_AGENT_ROOM_EE=1 pnpm test:e2e tests/e2e/agent-room.spec.ts
pnpm typecheck
```

## Do not

- Delete stub mode (offline demos)
- Remove stream code without migrating tests
- Change hybrid classifier behavior in same PR unless test-required
