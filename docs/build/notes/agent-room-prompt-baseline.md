# Agent Room — prompt & construction baseline

**Created:** 2026-06-05
**Purpose:** A single map of *how the `/agent` agents are prompted and constructed*, so you can change the result deterministically. This is the "what to edit, then what to run" reference. For build/DoD history see [agent-room-phase1-status.md](agent-room-phase1-status.md).

---

## TL;DR — is it ready?

**The code is built and committed in both repos.** What makes it actually run, end to end:

| Requirement | State |
|---|---|
| Engine code (`movemental-ai-agents`) | ✅ committed (`893a90f` feat, `0fe98af`) |
| Room code (`movemental-ai`, `/agent` + proxy + client contract) | ✅ committed |
| Prompts exist | ✅ `room-host.md`, `room-diagnostician.md` |
| Models registered | ✅ host `claude-haiku-4-5-20251001`, diagnostician `claude-opus-4-6` |
| Room → engine env wiring | ✅ `AI_AGENTS_BASE_URL` / `AI_AGENTS_SERVICE_SECRET` / `AI_AGENTS_TENANT_ORG_ID` present |
| Engine env | ✅ `ANTHROPIC_API_KEY`, `SERVICE_API_SECRET`, `TENANT_ORG_ID` present |

**To actually go live you still need three runtime steps** (none are code changes):

1. **Seed the agents into the DB** for the pinned tenant — `pnpm seed:agent-room` in `movemental-ai-agents` (idempotent upsert; re-run after any prompt/model edit).
2. **Run the engine** on `:3001` (`pnpm dev` in `movemental-ai-agents`) — the room proxy calls `AI_AGENTS_BASE_URL`.
3. **Run the room** (`pnpm dev` in `movemental-ai`) and open `/agent`.

> **Verdict:** ready to *run*, not yet *running*. The agents live in the database (the seed is the source of truth at runtime), so editing a `.md` file changes nothing until you re-run the seed.

> The handoff that the older status doc flagged as an "OPEN DECISION" (§3) is **resolved**: the host calls `request_diagnosis`, the runner detects the handoff envelope, emits `agent_handoff`, and continues in the diagnostician. That section of the phase-1 doc is superseded.

---

## The two agents at a glance

| | **room-host** | **room-diagnostician** |
|---|---|---|
| Role | First/only presence; drives the reality check; renders the repertoire | Composes the path-placement read-back, once, after the reality check |
| Model | `claude-haiku-4-5-20251001` (fast/cheap, every turn) | `claude-opus-4-6` (best reasoning, one shot) |
| Temperature | `0.6` | `0.4` |
| max_tokens | `1500` | `2000` |
| agent_type | `conversational` | `synthesis` |
| Invoked | always (boots the room) | only via handoff (`request_diagnosis`) |
| Can render | `render_reality_check_beat`, `show_path`, `show_pricing`, `show_network`, `show_audience`, `show_founders`, `offer_human_handoff` + action tool `request_diagnosis` | `show_readback`, `offer_human_handoff` |

Construction is data-driven in [`scripts/seed-agent-room.ts`](../../../../movemental-ai-agents/scripts/seed-agent-room.ts): `AGENT_SEEDS` (model/temp/tokens/type), `TOOL_SEEDS` (tool JSON-Schemas), `ASSIGNMENTS` (which agent gets which tools, in what order), and `upsertHandoff` (host→diagnostician, trigger `"compose read-back"`).

---

## Where the prompt files live

```
movemental-ai-agents/scripts/seed-data/prompts/
├── room-host.md            ← the host system prompt (4.7 KB)
└── room-diagnostician.md   ← the read-back composer system prompt (2.8 KB)
```

(Other `.md` files in that folder — `ai-writing-assistant.md`, `seo-expert.md`, `concierge-agent.md`, etc. — belong to **other** agents, not the room.)

The seed reads them verbatim via `loadPrompt(slug)` → stored in `agents.system_prompt` in the DB.

---

## What the model actually sees (the assembled prompt)

The `.md` is **not** the whole system prompt at runtime. The engine wraps it:

```
[ room-host.md / room-diagnostician.md  (static, verbatim from DB) ]
+
[ dynamic context block, appended last ]   ← context-injector.ts → injectContextBlocks()
      ━━━ ACTIVE PAGE CONTEXT ━━━ (page title/type, books, courses, lesson…)
      ━━━ USER CONTEXT ━━━ (User: …  Persona: …  Relevant memories: …)
```

- Assembly: `agent-runner.ts` → `buildSystemPromptForAdapter()` → `injectContextBlocks(systemBlocks, fullCtx)`.
- The dynamic block is **always last** to preserve prefix-cache hits on the static prompt.
- **For the public room this block is mostly empty** — the proxy ([`src/app/api/agent-room/stream/route.ts`](../../../src/app/api/agent-room/stream/route.ts)) sends an **anonymous** user (`anon-<uuid>`), no UI context, no memories. So the host effectively sees `room-host.md` + a near-empty USER CONTEXT stub. Good to know: most editorial control is in the `.md`, not in injected context.

**Tools are passed separately** (not in the prompt text) — from the `agent_tools` rows the seed creates, gated by `ASSIGNMENTS`. The Zod/JSON-Schema on each tool is a *blocking* guardrail: invalid props → no render + an `error` chunk (the "honesty rail").

---

## The host prompt, decomposed (`room-host.md`)

Eight labelled blocks — edit these to change behavior:

1. **Identity** — "host of Movemental's room… calm, warm, exact… not a chatbot."
2. **YOUR ONE DOMAIN** — only: where a church/nonprofit/seminary stands with AI and what to do next. Honesty about limits is "the product Movemental sells."
3. **TWO CHANNELS, ALWAYS PAIRED** — speak (text = voice) **and** show (render tool = screen) every turn; never render silently; never describe what it could show.
4. **WHAT YOU CAN SHOW** — the closed render repertoire (list above) + the one action tool `request_diagnosis`. No improvising UI.
5. **LEAD, DON'T FORCE** — speak first with substance; name the real problem (trust, not tech); point to the reality check as the natural first move.
6. **THE REALITY CHECK** — the scripted beats, **verbatim**, in order: `org_kind → reality → visibility → decision → trust → BRANCH`. The branch: if `decision = "Yes — written and ratified"` → probe specific refusals; else → "what are you most worried about getting wrong?". After the final beat → call `request_diagnosis` with every `{beatId, question, answer}` verbatim, then render nothing.
7. **HONESTY RAIL** — never fabricate pricing/path/network/situation; off-domain → say so + `offer_human_handoff` to `josh@movemental.ai`.
8. **VOICE & RESTRAINT** + **CONVERSION** — plain/warm/unhurried, no emoji, no "Great question," short lines; gently return to "want to see where you actually stand?"

> The reality-check beats (block 6) are the script. The exact question wording and chip options live **here**, not in the UI — the host emits them through `render_reality_check_beat`.

## The diagnostician prompt, decomposed (`room-diagnostician.md`)

1. **Single moment** — invoked once, to compose the read-back ("the most important moment in the product").
2. **INPUT** — the verbatim answers; interpret free text **conservatively** ("we talked about it" ≠ decided).
3. **JUDGMENT** — place on the four-stage path `01 Safety → 02 Sandbox → 03 Skills → 04 Solutions`.
4. **DETERMINISTIC VERDICT RULE** — `verdict = "past"` **only if** `decision == "Yes — written and ratified"` **AND** probe `== "Names specific refusals"`; otherwise `"pre"`. (Never flatter someone past Safety.)
5. **OUTPUT** — call `show_readback` with typed props: `verdict`, `hereStageIndex`, `prose {lead, body[]}`, `fork[]`, optional `handoffNote`. Frame the gap as **trust** work, never a score.
6. **Pre vs past body recipes** — explicit instructions for what each body must name (normalize, name the trust-at-risk, reflect the trust answer, connect their worry, name Safety + two doors: free field guide / $1,000 facilitated).

---

## The levers — how to "directly affect the result"

Ordered from highest to lowest leverage:

| You want to change… | Edit | Then run |
|---|---|---|
| **Host tone, domain, what it leads with** | `room-host.md` blocks 1–5, 7–8 | `pnpm seed:agent-room` |
| **The reality-check questions / chip options / order / branch** | `room-host.md` block 6 (the beats) | `pnpm seed:agent-room` |
| **Read-back content, verdict logic, framing, the two doors** | `room-diagnostician.md` | `pnpm seed:agent-room` |
| **Which model runs each agent** | `AGENT_SEEDS[].model` in `seed-agent-room.ts` (must be an id in `model-registry.ts`) | `pnpm seed:agent-room` |
| **Creativity / length** | `AGENT_SEEDS[].temperature` / `.max_tokens` | `pnpm seed:agent-room` |
| **Which tools an agent may render** | `ASSIGNMENTS[]` in `seed-agent-room.ts` | `pnpm seed:agent-room` |
| **The shape/validation of a rendered component's props** | `TOOL_SEEDS[].tool_config.parameters` (mirror the Zod schema in `src/lib/tools/render-tools.tool.ts`) | `pnpm seed:agent-room` |
| **The opening hero copy / endorser faces** (static, not agent-driven) | `movemental-ai/src/components/agent-room/screen/opening-hero.tsx` | room rebuild only — **no seed** |
| **How a rendered component looks** | `movemental-ai/src/components/agent-room/screen/*.tsx` + `agent-room.module.css` | room rebuild only — **no seed** |

**The one rule that trips people up:** the running agent is the **DB row**, not the file. Any `.md` / `seed-agent-room.ts` edit is inert until `pnpm seed:agent-room` re-upserts it for the tenant org. The opening hero and component visuals are React in `movemental-ai` and are *not* seeded — they change on rebuild.

### To use a newer model (e.g. Opus 4.8)
The engine registry has **no** `claude-opus-4-8`. Add the adapter id in `movemental-ai-agents/src/lib/ai/model-registry.ts` (and `KNOWN_MODEL_IDS`), then set `AGENT_SEEDS[diagnostician].model` and re-seed.

---

## Pinned facts

- **Tenant org (seeded):** `6bc0fcf7-2e55-4914-b88d-c6eb49eb0d71` (`TENANT_ORG_ID` / `AI_AGENTS_TENANT_ORG_ID`).
- **Handoff trigger row:** `from=room-host → to=room-diagnostician`, `trigger_rules.trigger = "compose read-back"` — matched by `resolveHandoff`.
- **Public proxy:** `movemental-ai` `/api/agent-room/stream` → injects tenant + service bearer, anonymous userId, forwards to engine `/api/agents/stream`.
- **Handoff email (off-domain / human):** `josh@movemental.ai` (hard-coded `const` in the `offer_human_handoff` schema).
