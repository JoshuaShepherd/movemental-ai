# Agent Room — runtime assembly

What the model sees **beyond** the seeded `system_prompt`.

---

## Layer stack (bottom → top)

1. **Prompt pack layers** (optional) — ordered `prompt_pack_layers.content`, joined with `---`
2. **Base system prompt** — `agents.system_prompt` from seed (`room-host.md` / `room-diagnostician.md`)
3. **Dynamic context block** — `context-injector.ts` → `injectContextBlocks()`
   - Active page / books / courses (usually empty for anonymous `/agent`)
   - User / persona / memories (anonymous stub)
4. **Phase block** — Discuss only (see below)
5. **Tools** — passed separately via API, not embedded in prompt text

Dynamic blocks are appended **last** so Anthropic prefix cache hits the static prompt.

---

## Client → engine POST body

Proxy: `movemental-ai/src/app/api/agent-room/stream/route.ts`  
Upstream: `movemental-ai-agents` `/api/agents/stream`

| Field | Source | Notes |
|-------|--------|-------|
| `tenantOrgId` | Server env | Never from browser |
| `userId` | `anon-<uuid>` | Public room |
| `agentSlug` | Default `room-host` | Diagnostician only via handoff |
| `message` | Visitor text or chip value | |
| `sessionId` | Client session | |
| `history` | Prior turns | Client-managed |
| `phase` | `guide` \| `discuss` | INT-10 |
| `roomContext` | Hybrid mode metadata | See below |

---

## Hybrid mode (`roomContext`)

When the client runs local choreography (`SCENES` runner), it may send:

| Field | Meaning |
|-------|---------|
| `screenId` | Current screen (`home`, `beat`, …) |
| `lastScene` | Last local scene name |
| `phase` | `guide` or `discuss` |
| `mapAnswersCount` | Beats answered so far |
| `inLocalScene` | Local runner in flight |

Host prompt §12: do not override local choreography; prefer voice for off-script questions.

---

## Scene layer (deterministic copy)

Scripted visitor copy lives in **`movemental-ai`**, not the engine:

| Asset | Path |
|-------|------|
| Host scenes | `src/lib/agent-room/data/scenes.ts` → `HOST_SCENES` |
| Diagnostician scenes | Same file → `DIAGNOSTICIAN_SCENES` |
| Beat definitions | `src/lib/agent-room/beat-scenes.ts` |

Prompt tags `[const]` / `[template]` refer to this data. Changing beat **wording** may require UI repo edits **and** prompt/seed if questions are duplicated in handoff payloads.

---

## Modes: stub vs stream vs hybrid

| Mode | Engine calls | Use |
|------|--------------|-----|
| Stub | None | Local script only (dev/fixtures) |
| Stream | Every AGENT turn | Full engine |
| Hybrid (default) | AGENT-classified turns only | Chips/beats local; open text → engine |

Controlled by client hooks: `use-agent-room-hybrid.ts`, `use-agent-room-stream.ts`.

---

## Traces

Each turn may persist:

- `agent_traces` — tokens, model, `corpus_binding_id`, `prompt_pack_id`
- `agent_interactions` — tool calls and outcomes

Public room: minimal PII by design (anonymous ids).
