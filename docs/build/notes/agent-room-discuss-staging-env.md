# Agent Room Discuss — staging env checklist

**Last updated:** 2026-06-18 (AU-09)

Discuss is **off in production by default**. Enable on staging/preview only until AU-10 + AU-11 sign-off.

## Required env (movemental-ai)

```bash
NEXT_PUBLIC_AGENT_ROOM_MODE=hybrid
NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1
NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP=7
AI_AGENTS_BASE_URL=https://your-agents-host
AI_AGENTS_SERVICE_SECRET=your-service-secret
```

## Engine (movemental-ai-agents)

Run `pnpm seed:agent-room` so `room-host.md` includes the Discuss phase block (`runtime/discuss-phase-block.md`).

## E2E

```bash
# Mocked hybrid Discuss (default CI path)
NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1 NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP=2 pnpm test:e2e tests/e2e/agent-room-discuss.spec.ts

# Live engine (optional)
RUN_AGENT_ROOM_EE=1 NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1 pnpm test:e2e tests/e2e/agent-room-discuss.spec.ts
```

## Production default

**Recommendation:** keep `NEXT_PUBLIC_AGENT_ROOM_DISCUSS` unset until overlay vs marginalia (AU-10) and readback entry chips (AU-11) are complete, unless an operator explicitly enables Discuss in prod.
