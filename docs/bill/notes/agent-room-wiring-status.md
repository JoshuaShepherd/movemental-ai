# Agent Room — wiring status handoff (for Claude)

**Created:** 2026-06-05  
**Audience:** Claude (or any agent continuing this work)  
**Source prompt:** *Build Brief — The Movemental Agent Room (Phase 1)*  
**Build split (confirmed):** engine → `movemental-ai-agents`; room shell + UI → `movemental-ai`

This note captures **what was wired, what was not, and what is blocked** after the Phase 1 agent prompt. It supersedes scattered context in `docs/build/notes/agent-room-phase1-status.md` for handoff purposes, but that file remains the original build report.

---

## TL;DR

| Layer | Repo | Status |
|-------|------|--------|
| Engine protocol (`ui_render`, render tools, runner) | `movemental-ai-agents` | **Built locally — not committed** |
| Agent seed (`room-host`, `room-diagnostician`, tools, handoff row) | `movemental-ai-agents` | **Script written — not committed; not run against prod DB in this session** |
| Client stream contract (Zod + SSE parser) | `movemental-ai` | **Committed** (`53b5263`) |
| Room UI (`/agent`, paper components, stream hook, proxy) | `movemental-ai` | **Not started** (held for prototypes) |
| Host → diagnostician handoff at runtime | `movemental-ai-agents` | **Blocked** — DB row exists; engine never emits `agent_handoff` |
| Onboarding chat proxy | `movemental-ai` | **Stub only** — `agentTestChat` returns placeholder text, not the engine |

**Verified 2026-06-05:** `movemental-ai-agents` → `pnpm typecheck` 0 errors, `pnpm test:run` **144/144 pass**. `movemental-ai` → `pnpm typecheck` 0 errors.

---

## 1. What this agent is

The **Movemental Agent Room** is a public-facing, three-zone conversational surface (screen / voice / input) for org leaders (churches, nonprofits, seminaries). It:

- Runs a **host** agent (`room-host`, Haiku) that speaks + renders UI via tools.
- Drives a **reality check** (6 beats) through `render_reality_check_beat`.
- Should **hand off** to a **diagnostician** (`room-diagnostician`, Opus) to compose a bespoke read-back via `show_readback`.
- Enforces an **honesty rail**: only eight closed `ComponentId` values may appear on the screen; invalid tool props are blocked (not swallowed).

Room UI (`/agent`, three-zone shell, render components, stream hook, proxy) is **intentionally deferred** until prototypes land. Style the room with **Concept Modern** tokens (`concept-modern-ui` skill, `src/app/globals.css`, `docs/design/DESIGN.md`) — the same system as the marketing site.

---

## 2. Architecture (two repos)

```
┌─────────────────────────────────────────────────────────────────┐
│  movemental-ai (room host)                                      │
│  • /agent page (NOT BUILT)                                      │
│  • stream hook + render React components (NOT BUILT)             │
│  • proxy route → engine SSE (NOT BUILT; pattern in visual-editor) │
│  • src/lib/agent-room/stream-chunk.ts ✅ (client contract)      │
│  • agent DB schema + studio admin ✅ (pre-existing)             │
└───────────────────────────┬─────────────────────────────────────┘
                            │ POST /api/agents/stream
                            │ Bearer SERVICE_API_SECRET
                            │ X-Tenant-Org-Id
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│  movemental-ai-agents (engine)                                  │
│  • agent-runner, tool loop, adapters ✅                           │
│  • ui_render chunk + render tools ✅ (local, uncommitted)         │
│  • seed: room-host, room-diagnostician ✅ (local, uncommitted)    │
│  • /api/agents/stream ✅ (pre-existing route)                   │
└─────────────────────────────────────────────────────────────────┘
```

**Important correction from the brief:** the engine does **not** live in `movemental-ai`. That repo holds the marketing site, agent **schema** (Drizzle tables + simplified API routes), studio admin (`/agent-runtime`), and will host the room UI. Inference runs in `movemental-ai-agents`.

**Proxy pattern to copy:** `movemental-visual-editor-main/src/app/api/ai/agents/stream/route.ts` — uses `AI_AGENTS_BASE_URL` + `AI_AGENTS_SERVICE_SECRET` (must match engine `SERVICE_API_SECRET`). **`movemental-ai` does not yet define these env vars** in `src/lib/env.ts`.

---

## 3. Done — engine (`movemental-ai-agents`)

All paths relative to `~/dev/01-Movemental-Core/movemental-ai-agents`.

| Area | File | What |
|------|------|------|
| Protocol | `src/lib/ai/types.ts` | `ui_render` `StreamChunk` variant + closed `ComponentId` enum |
| Guardrail gate | `src/lib/ai/runtime/ui-render.ts` | `defineRenderTool`, render/error envelopes, `interpretToolOutput`; invalid props → `error` chunk, never rendered |
| Tests | `src/lib/ai/runtime/ui-render.test.ts` | 4/4 — valid→render, invalid→blocked, plain passthrough, replace honored |
| Render tools | `src/lib/tools/render-tools.tool.ts` | 8 tools; 4 live (`render_reality_check_beat`, `show_readback`, `show_path`, `offer_human_handoff`); 4 static placeholders |
| Registration | `src/lib/ai/runtime/register-builtins.ts` | Imports render tools |
| Runner | `src/lib/ai/runtime/agent-runner.ts` | Emits typed `ui_render` / `error` from tool results across provider branches; model gets small `{ rendered }` ack |
| Seed script | `scripts/seed-agent-room.ts` | Idempotent upsert of agents, tools, assignments, handoff row |
| Prompts | `scripts/seed-data/prompts/room-host.md`, `room-diagnostician.md` | Verbatim from brief §6 |
| Package script | `package.json` | `"seed:agent-room": "tsx scripts/seed-agent-room.ts"` |

**Models (real registry ids, not placeholders):**

- `room-host` → `claude-haiku-4-5-20251001`
- `room-diagnostician` → `claude-opus-4-6` (no `claude-opus-4-8` in registry)

**Component repertoire (`ComponentId`):**

`reality_check_beat` · `readback` · `path` · `pricing` · `network` · `audience` · `founders` · `handoff_human`

---

## 4. Done — client contract (`movemental-ai`)

| File | What |
|------|------|
| `src/lib/agent-room/stream-chunk.ts` | Zod mirror of engine `StreamChunk` incl. `ui_render`; `parseStreamChunk`, `parseSSEBuffer` (incremental SSE, drops malformed) |

**Contract rule:** keep in sync with `movemental-ai-agents/src/lib/ai/types.ts` manually — repos do not share a package.

**Also pre-existing in `movemental-ai` (not part of this prompt, but relevant):**

- Drizzle agent tables: `agents`, `agent_tools`, `agent_tool_assignments`, `agent_handoffs`, traces, etc. (`src/lib/db/schema.ts`)
- Simplified CRUD API routes under `src/app/api/simplified/agent-*`
- Studio page: `src/app/(studio)/agent-runtime/page.tsx` (assign corpus bindings + prompt packs)
- Onboarding stub: `src/app/api/onboarding/agent-chat/route.ts` → `agentTestChat()` returns **placeholder copy**, not engine traffic

---

## 5. Not done / held

### 5.1 Room UI (`movemental-ai`) — **held**

Waiting on Agent Room UI prototypes (three-zone shell). When they land, build:

1. `/agent` route — three-zone shell (`100dvh`, screen / voice / input, corner hamburger, static crawlable fallback)
2. Four live React components: `reality_check_beat`, `readback`, `path`, `handoff_human`
3. Stream hook (analog of visual-editor `use-agent-chat-stream`) handling `ui_render`
4. Proxy route to engine (copy visual-editor pattern; add `AI_AGENTS_*` to `src/lib/env.ts`)
5. Concept Modern styling via `concept-modern-ui` skill + site tokens (no separate theme scope)

### 5.2 Engine → client integration (`movemental-ai`) — **not wired**

- No `AI_AGENTS_BASE_URL` / `AI_AGENTS_SERVICE_SECRET` in env schema
- No `/api/.../agents/stream` proxy route
- No stream hook or room components
- Onboarding `agentTestChat` still stubbed (`src/lib/services/onboarding/onboarding-http.service.ts` ~L534)

### 5.3 Host → diagnostician handoff — **blocked (DoD §9.5)**

The seed creates an `agent_handoffs` row (host → diagnostician), and the runner **handles** incoming `agent_handoff` chunks via `resolveHandoff`. But **nothing emits** `agent_handoff` today — no adapter, no tool, no model action produces it.

**Recommended fix (~30–50 lines):**

1. Add handoff tool `request_diagnosis` whose handler returns a handoff envelope
2. In `streamAgentInner`, after tool-result processing, detect envelope → `yield { type: "agent_handoff", ... }` → `resolveHandoff(...)` → `yield* streamAgentInner(nextAgent, message)` where `message` is JSON-serialized reality-check answers
3. Confirm design: pass answers as diagnostician's user turn (recommended in build report)

**Interim (not recommended):** host calls `show_readback` directly — loses Opus-composed read-back quality.

### 5.4 Database seed — **script exists; run status unknown**

Seed has not been verified as applied to a live org in this handoff. Requires:

```bash
cd movemental-ai-agents
TENANT_ORG_ID=<org-uuid> pnpm seed:agent-room
```

Then smoke-test:

```bash
# POST /api/agents/stream with agentSlug "room-host", Bearer SERVICE_API_SECRET
# Needs ANTHROPIC_API_KEY in engine env
```

---

## 6. Git state (critical for Claude)

### `movemental-ai`

- Agent room client contract + build notes **committed** in `53b5263` ("first new agent work")
- Working tree clean at handoff time

### `movemental-ai-agents`

- **Agent Room engine work is local and uncommitted** as of 2026-06-05
- Untracked (`??`): `ui-render.ts`, `ui-render.test.ts`, `render-tools.tool.ts`, `seed-agent-room.ts`, `room-host.md`, `room-diagnostician.md`
- Modified (`M`): `agent-runner.ts`, `register-builtins.ts`, `types.ts`, and other unrelated WIP on the branch

**Action for Claude:** commit the Agent Room files as a focused changeset before deploying or sharing the branch.

---

## 7. DoD scorecard (Phase 1 brief)

| Item | Status | Notes |
|------|--------|-------|
| §9.1 Engine stream contract | ✅ | `ui_render` in types + SSE passthrough |
| §9.2 Blocking prop guardrail | ✅ | Zod in `defineRenderTool`; tested |
| §9.3 Room UI | ⏸ | Held for prototypes |
| §9.4 Host prompt + tools seeded | ✅ engine-side | Needs `pnpm seed:agent-room` + live POST to observe |
| §9.5 Host → diagnostician handoff | ⛔ | DB row only; no runtime emit |
| §9.6 Human handoff rail | ✅ engine-side | `offer_human_handoff` tool + prompt |
| §9.7 Four live render tools | ✅ | reality check, readback, path, handoff |
| §9.8 Real telemetry / no swallowed guardrails | ✅ | `logTurnUsage`; invalid render → error chunk |

---

## 8. How to run / verify

### Engine (`movemental-ai-agents`)

```bash
cd ~/dev/01-Movemental-Core/movemental-ai-agents
pnpm typecheck && pnpm test:run
pnpm check:env   # DATABASE_URL, SERVICE_API_SECRET, Supabase keys, etc.
TENANT_ORG_ID=<org-uuid> pnpm seed:agent-room
pnpm dev         # default :3000 — POST /api/agents/stream
```

**Stream request shape** (see `src/app/api/agents/shared.ts`):

- Headers: `Authorization: Bearer <SERVICE_API_SECRET>`, optional `X-Tenant-Org-Id`
- Body: `{ agentSlug, message, tenantOrgId?, userId?, sessionId?, uiContext?, history? }`

### Room host (`movemental-ai`)

```bash
cd ~/dev/01-Movemental-Core/movemental-ai
pnpm typecheck
pnpm dev
# /agent — 404 until UI is built
# /agent-runtime — studio admin for agent bindings (pre-existing)
```

### Env wiring (when proxy is built)

In `movemental-ai` `.env.local` (mirror visual-editor):

```bash
AI_AGENTS_BASE_URL=https://movemental-ai-agents.vercel.app   # or http://localhost:3000
AI_AGENTS_SERVICE_SECRET=<same as movemental-ai-agents SERVICE_API_SECRET>
```

---

## 9. Suggested next steps (priority order)

1. **Commit** Agent Room engine changes in `movemental-ai-agents` (isolated commit).
2. **Run** `pnpm seed:agent-room` against the Movemental org UUID; smoke-test `room-host` stream and confirm `ui_render` chunks for `render_reality_check_beat`.
3. **Implement** `request_diagnosis` handoff tool + runner emit path (unblocks read-back flow).
4. **Add** `AI_AGENTS_*` env vars + proxy route in `movemental-ai` (copy from visual-editor).
5. **When prototypes arrive:** build `/agent` shell + render components + stream hook on top of `src/lib/agent-room/stream-chunk.ts` (Concept Modern tokens).
6. **Replace** onboarding `agentTestChat` stub with real proxy once `/agent` or onboarding should hit the engine.

---

## 10. Reference docs (read order)

| Doc | Purpose |
|-----|---------|
| `docs/build/notes/agent-room-phase1-status.md` | Original Phase 1 build report |
| `.claude/skills/concept-modern-ui/SKILL.md` | Concept Modern UI build/restyle expert for room + marketing |
| `docs/design/DESIGN.md` | Canonical design spec + token rationale |
| `docs/build/notes/ai-agent-inventory-best-of-breed.md` | Org-wide agent repo inventory (why engine + visual-editor patterns were chosen) |
| `movemental-visual-editor-main/src/app/api/ai/agents/stream/route.ts` | Proxy route template |
| `movemental-visual-editor-main/src/hooks/custom/use-agent-chat-stream.ts` | Stream hook template |
| `movemental-visual-editor-main/src/lib/ai/agent-sse-parse.ts` | SSE parser (already mirrored in `stream-chunk.ts`) |
| `docs/build/plans/movemental-multi-repo-env-bootstrap.md` | Multi-repo env setup |
| `docs/build/agent-org-clone-workflow.md` | Tenant org + agent registry workflow |

---

## 11. Crown-jewel file index

**Engine**

- `movemental-ai-agents/src/lib/ai/types.ts`
- `movemental-ai-agents/src/lib/ai/runtime/ui-render.ts`
- `movemental-ai-agents/src/lib/ai/runtime/agent-runner.ts`
- `movemental-ai-agents/src/lib/tools/render-tools.tool.ts`
- `movemental-ai-agents/scripts/seed-agent-room.ts`
- `movemental-ai-agents/scripts/seed-data/prompts/room-host.md`
- `movemental-ai-agents/scripts/seed-data/prompts/room-diagnostician.md`

**Client (movemental-ai)**

- `movemental-ai/src/lib/agent-room/stream-chunk.ts`

**Patterns to port (sibling repo)**

- `movemental-visual-editor-main/src/lib/ai/agent-proxy-schema.ts`
- `movemental-visual-editor-main/src/components/ai-suite/AgentChatPanel.tsx`

---

*Last verified: 2026-06-05. Re-run typecheck/tests and git status before continuing work.*
