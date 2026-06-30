# Agent orchestration — status overview

**Created:** 2026-06-29  
**Purpose:** Single readable map of how the Movemental agent currently works — what it says, what it shows, how each is prompted and routed — so humans and secondary agents can reason about modular redesign without spelunking scattered SSOTs.  
**Audience:** Product, engineering, and external agents evaluating orchestration changes (e.g. more chat-first, less screen-swap).  
**Pack:** [README.md](./README.md) — how to share this directory with Claude.  
**Index:** [documentation-index.md](./documentation-index.md) — authoritative registry; this doc **synthesizes** it for orchestration decisions.

**Related prior work (do not duplicate blindly — read for history):**

| Doc | What it covers |
| --- | --- |
| [agent-platform-complete-reference.md](./ssot/agent-platform-complete-reference.md) | End-to-end topology, screen inventory, classifier, engine tools |
| [agent-room-conversation-choreography-model-ssot.md](./ssot/agent-room-conversation-choreography-model-ssot.md) | Caption vs thread invariants (I1–I6) |
| [agent-room-chat-conversation-ui-ssot.md](./ssot/agent-room-chat-conversation-ui-ssot.md) | Dock collapsed/expanded, component tree, Discuss wiring |
| [movemental-ui-ai-design-consultation-2026-06-18.md](./ssot/movemental-ui-ai-design-consultation-2026-06-18.md) | Strategic assessment + AU prompt pack source |
| [agent-room-handoff.md](./policy/agent-room-handoff.md) | Hybrid local vs SSE handoff policy |
| [engine/README.md](./engine/README.md) | Engine prompt/tool edit workflow |
| [prompts/agent-updates/](./prompts/agent-updates/) | Consultation execution prompts (AU-01–22) |
| [dock-pill-screen-first-routing.md](./prompts/dock-pill-screen-first-routing.md) | Screen-first pill routing rationale |
| [agent-room-stub-stream-parity/](./prompts/agent-room-stub-stream-parity/) | Stub ↔ stream ↔ hybrid parity reconciliation |

---

## 1. Executive summary — what exists today

Movemental.ai’s public home is **`/agent`**. The product is an **agent-first concierge room**, not a marketing site with a chat widget. A visitor sees three zones:

| Zone | Role |
| --- | --- |
| **Mast** | Logo (home/replay), audience nav, sign-in |
| **Screen** | Full-bleed “manuscript sheet” — pre-built React screens (home, pricing, path, safety flow, beat, …) |
| **Agent dock** | Collapsed composer + ink caption **or** expanded conversation drawer |

The agent communicates on **two coupled channels** every meaningful turn:

1. **Voice** — short Caveat ink line (collapsed) and/or prose in the expanded thread. Live turns stream via SSE `text_delta`.
2. **Screen** — swaps the sheet via local `show` acts **or** engine `ui_render` tool calls.

**Default runtime is `hybrid`:** most visitor journeys are **deterministic local scenes** (zero network, instant). The live LLM (`room-host` in `movemental-ai-agents`) runs only when input is classified **AGENT**.

### Why pre-built pages appear so often

This is **by design**, not an accident:

- **Screen-first routing (2026-06-17):** Default float chips on the **collapsed** dock open **local scenes** that almost always begin with `{ show: "<screenId>" }` — e.g. “What does it cost?” → `cost` scene → `pricing` screen.
- **Regex router:** First collapsed typed message matching patterns like `cost`, `about`, `path` → local scene → screen swap.
- **Host prompt policy:** “Speak **and** show — paired channels; don’t describe UI you could render.” Engine turns call `show_pricing`, `show_path`, etc.
- **Closed screen vocabulary:** The product metaphor is a **manuscript on paper**, not free-form chat. Screens are first-class product UI.

**Tension (documented, unresolved):** Operators often want **chat-first** dialogue; the shipped system defaults to **choreography-first** (structured screens + short captions). The expanded dock + AGENT classification is the chat path, but reaching it requires expand, unmatched text, or specific chip surfaces.

---

## 2. System topology

```text
┌─────────────────────────────────────────────────────────────────────────┐
│  movemental-ai (this repo)                                              │
│  ┌──────────────┐   POST SSE    ┌──────────────────────────────────┐  │
│  │ /agent       │ ────────────► │ /api/agent-room/turn               │  │
│  │ AgentRoom    │               │ stream-route-handler.ts            │  │
│  │ hooks        │ ◄──────────── │ (auth + tenant injected server-side)│  │
│  └──────────────┘   StreamChunk └──────────────────────────────────┘  │
│         │                                                               │
│         ├── LOCAL: scenes.ts → scene-runner.ts → show/say/suggest       │
│         └── AGENT: agent-stream-turn.ts → SSE callbacks → UI          │
└────────────────────────────────────────────│────────────────────────────┘
                                             │ Bearer + X-Tenant-Org-Id
                                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  movemental-ai-agents                                                   │
│  POST /api/agents/stream → agent-runner → room-host (Claude Opus 4.6)   │
│                            handoff tool → room-diagnostician (Opus)     │
│  Tools: render_*, gesture_at, suggest_chips, request_diagnosis,         │
│         file_search (optional RAG)                                      │
└─────────────────────────────────────────────────────────────────────────┘
```

| Repo | Responsibility |
| --- | --- |
| **`movemental-ai`** | Ink Band UI, `SCENES` data, regex router, hybrid classifier, SSE client, screen registry, capture/enroll APIs |
| **`movemental-ai-agents`** | DB-seeded agents, prompts, tool loop, `ui_render` honesty rail, handoff to diagnostician, optional corpus search |

The browser **never** calls the engine directly.

---

## 3. Orchestration layers (modular view)

Think of orchestration as **six layers**. Types and behavior flow downstream; prompts and scenes are edited in different repos.

```text
Layer 0 — Product metaphor & invariants
    INK_BAND design charter, choreography SSOT (I1–I6), closed ScreenId set

Layer 1 — Runtime mode
    hybrid | stub | stream  (mode.ts)

Layer 2 — Input classification
    move-classifier.ts + route-input.ts + composer-routing.ts + discuss-entry.ts

Layer 3 — Local choreography (no LLM)
    scenes.ts (data) → scene-runner.ts (playScene) → acts: say|show|gesture|wait|suggest

Layer 4 — Live agent (LLM)
    room-host prompt + tools → SSE chunks → hybrid hook callbacks

Layer 5 — Presentation
    dockState (collapsed|expanded), ScreenZone, voice-zone, discuss-thread

Layer 6 — Capture & handoff
    capture forms, /enroll, /assess, document-page handoff to /agent?ask=
```

### Layer 0 — Invariants that constrain redesign

From [agent-room-conversation-choreography-model-ssot.md](./ssot/agent-room-conversation-choreography-model-ssot.md):

| ID | Rule |
| --- | --- |
| **I1** | Ink caption = one short non-wrapping line — **scene choreography only**, never a full agent answer |
| **I2** | Every **AGENT** turn renders in the **expanded thread only** |
| **I3** | Collapsed caption and expanded conversation are mutually exclusive |
| **I4** | `dockState` is the **only** surface switch (not phase, length, or mode) |
| **I5** | `caption-validator.ts` caps ink-bound strings; overflow → thread + expand |
| **I6** | Expanding overlays screen behind scrim; collapse restores sheet |

**Implication for chat-first redesign:** You cannot put long agent prose in the collapsed ink band without violating I1/I5. Chat-first means **expanded dock** or rethinking invariants.

### Layer 1 — Runtime mode

**SSOT:** `src/lib/agent-room/mode.ts`  
**Env:** `NEXT_PUBLIC_AGENT_ROOM_MODE` (default **`hybrid`**)

| Mode | Hook | When LLM runs |
| --- | --- | --- |
| **hybrid** | `use-agent-room-hybrid.ts` | Only on AGENT-classified moves |
| **stub** | `use-agent-room-stub.ts` | Never |
| **stream** | `use-agent-room-stream.ts` | Every composer action (deprecated; maps to hybrid unless `NEXT_PUBLIC_AGENT_ROOM_LEGACY_STREAM=1`) |

Dispatch: `src/components/agent-room/agent-room.tsx`.

### Layer 2 — Routing decision tree (the core choreography fork)

**Classifier SSOT:** `src/lib/agent-room/move-classifier.ts`  
**Regex SSOT:** `src/lib/agent-room/route-input.ts` (first match wins)  
**Chip SSOT:** `src/lib/agent-room/composer-routing.ts`

```text
Visitor action (chip tap, typed text, leader tap, beat answer)
    │
    ├─ Discuss phase? ─────────────────────────────► AGENT (always)
    │
    ├─ chatActive? (thread or server history has ≥1 turn — not merely expanded dock)
    │       └─ typed text → AGENT (open_text)  [bypasses regex]
    │
    ├─ Meta/objection streak + DISCUSS_ENABLED? ─► LOCAL discussOffer scene
    │
    ├─ regex match (route-input.ts)?
    │       ├─ high-confidence? ─────────────────► LOCAL scene
    │       └─ low-confidence match ─────────────► AGENT
    │
    └─ else ─────────────────────────────────────► AGENT (open_text)
```

**Chip routing (hybrid, screen-first — AU-07):**

| Chip label | Collapsed dock | Expanded drawer |
| --- | --- | --- |
| Get a clear next AI step | LOCAL → `toSafetyFlow` → safety flow screen | LOCAL → `toSafetyFlow` |
| About Movemental | LOCAL → `whatIs` → **about screen** | AGENT utterance → SSE |
| What does it cost? | LOCAL → `cost` → **pricing screen** | AGENT → SSE |
| Get in touch | LOCAL → `talkToUs` → **contact screen** | AGENT → SSE |

**This table is the main reason “I tapped something and a page appeared.”** Collapsed pills are wired to `show` acts in `scenes.ts`.

**Scene follow-up chips** (e.g. on path screen “Show me Safety”) use `SuggestChip.to` → local `SCENES[name]` when not in expanded-drawer agent routes.

### Layer 3 — Local choreography

**Contract:** `src/lib/agent-room/acts.ts` — locked prototype vocabulary.

| Act | Effect | Engine equivalent |
| --- | --- | --- |
| `say` | One ink voice line | `text_delta` |
| `show` | Swap screen (`ScreenId` + opts) | `ui_render` |
| `gesture` | underline / circle / arrow on DOM target | `ink_gesture` |
| `wait` | Timed beat | — |
| `suggest` | Float chips → `run(scene)` or hybrid routing | `suggest` |
| `clear` | Wipe ink | — |
| `await: "capture"` | Pause until form submits/skips | — |

**Scene data SSOT:** `src/lib/agent-room/data/scenes.ts` — keyed scenes (`opening`, `whatIs`, `cost`, `toPath`, …).  
**Runner:** `src/lib/agent-room/scene-runner.ts` — `playScene()` with generation guard (replay cancels in-flight).

**Opening scene (boot):**

```text
show home → wait → say (greeting) → gesture underline #phrase → suggest 4 default chips
```

Voice lines for scripted moments also live in `src/lib/agent-room/data/concierge-voice-lines.ts`.

**Special local handlers** (not plain `SCENES` keys):

| Handler | Module | Effect |
| --- | --- | --- |
| Beat answers | `beat-scenes.ts` + `data/map-q.ts` | Advances diagnostic, local readback on gate fail |
| Leader carousel | `leader-scenes.ts` | FLIP + leader profile screen |
| Capture targets | `suggest-chip-targets.ts` | Focus email, navigate `/enroll`, `/assess` |

### Layer 4 — Live agent

**Agents** (seeded in `movemental-ai-agents` via `pnpm seed:agent-room`):

| Slug | Model | When |
| --- | --- | --- |
| `room-host` | `claude-opus-4-6` | Every AGENT-classified turn |
| `room-diagnostician` | `claude-opus-4-6` | Handoff after reality-check beats via `request_diagnosis` |

**Prompt edit workflow:**

1. Human-editable docs: `docs/build/agents/agent-room/prompts/room-host.md`, `room-diagnostician.md`
2. Copy/sync to `movemental-ai-agents/scripts/seed-data/prompts/`
3. `pnpm seed:agent-room` — **database is runtime SSOT**, not git

**Runtime assembly** (what the model actually sees): [runtime-assembly.md](../agents/agent-room/runtime/runtime-assembly.md)

```text
[optional prompt pack layers]
+ seeded system_prompt (room-host.md)
+ dynamic context block (usually empty for anonymous /agent)
+ Discuss phase block (when phase=discuss) — code in agent-runner.ts, not seed
+ tools (separate API payload)
```

**SSE chunk → client effect** (`use-agent-room-hybrid.ts`):

| Chunk | UI effect |
| --- | --- |
| `text_delta` | Stream into thread (and caption path only for local `say`) |
| `ui_render` | Swap screen or engine-extra overlay (`network`, `audience`, `handoff_human`) |
| `ink_gesture` | SVG gesture layer |
| `suggest` | Replace float chips (values return to agent on tap) |
| `agent_handoff` | Clear stream; diagnostician continues → `show_readback` |
| `progress` | Thinking pulse / tool status |
| `error` | Stall recovery voice line |

**Proxy:** `src/lib/agent-room/stream-route-handler.ts` → `/api/agent-room/turn`  
**Client drain:** `src/lib/agent-room/agent-stream-turn.ts`

### Layer 5 — Presentation (what the visitor sees)

**Component tree:**

```text
AgentRoomShell
└─ AgentRoom (mode dispatch)
   └─ AgentRoomView
      ├─ InkOverlay (gestures)
      ├─ Mast
      ├─ ScreenZone          ← hidden when dock expanded
      │  └─ HybridScreen | StubScreen | StreamScreen
      └─ AgentDock           ← collapsed OR expanded (never both)
           ├─ collapsed: VoiceZone (caption) + float chips + composer
           └─ expanded: DiscussThread / guideMessages + WaysInPanel + composer
```

**Key presentation files:**

| Concern | Path |
| --- | --- |
| Dock | `src/components/agent-room/shell/agent-dock.tsx` |
| Ink caption | `src/components/agent-room/shell/voice-zone.tsx`, `ink/ink-voice.tsx` |
| Thread | `src/components/agent-room/discuss/discuss-thread.tsx` |
| Screen registry | `src/components/agent-room/screen/stub/stub-screen.tsx` |
| Engine render map | `src/lib/agent-room/screen-map.ts` |
| Caption cap | `src/lib/agent-room/caption-validator.ts` |
| Thread state | `src/components/agent-room/use-room-thread.ts` |

**Auto-expand triggers:** **AGENT-classified** sends call `requestExpandConversation()` in `use-agent-room-hybrid.ts`; LOCAL sends keep the dock collapsed (or auto-collapse on `screenKey` change). Streaming expand effect in `agent-dock.tsx` when thread has active deltas. Discuss phase forces expanded.

### Layer 6 — Phases, Discuss, capture

**Guide vs Discuss:** `src/lib/agent-room/discuss.ts`  
**Flag:** `NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1` (default **off**)

| Phase | Typed input | Screen behavior |
| --- | --- | --- |
| **guide** | May run local scenes | Screen-first default |
| **discuss** | Always AGENT | Long prose in thread; optional marginalia on sheet (layout tension — AU-10 open) |

**Capture kinds:** `map`, `paid`, `free`, `discuss` → `src/lib/agent-room/capture.ts` → `/api/agent-room/capture`

---

## 4. Prompting design — three knowledge stores

The host prompt (`room-host.md` v3.0) defines a **split** between deterministic copy and model work. Tag legend:

| Tag | Meaning | Who speaks |
| --- | --- | --- |
| `[const]` | Fixed string in scene data | Runtime / local runner |
| `[template]` | Fixed structure with slots | Runtime fills slots |
| `[model:decide]` | Route, tool choice, beat advance | LLM returns decision only |
| `[model:author]` | Novel prose | LLM, bounded by core canon + `file_search` |

### Three stores (keep distinct)

| Store | Location | Used for |
| --- | --- | --- |
| **Scene layer** | `scenes.ts`, `beat-scenes.ts`, `concierge-voice-lines.ts` | Exact copy for local choreography and scripted beats |
| **Core canon** | §5 of `room-host.md` | Prices, stage names, founders, contact — volatile facts |
| **File base (RAG)** | `docs/build/agents/agent-room/files/` → OpenAI vector store | Depth: fragmentation thesis, sector nuance, AI stance |

**Host policy summary:**

1. Speak **and** show — paired channels.
2. Closed repertoire — only listed tools/screens.
3. Reality check beats are **scripted**; host advances via `render_beat`, then `request_diagnosis`.
4. **Never quote prices in voice** — call `show_pricing` (`room-output-guardrail.ts` in engine).
5. Discuss phase: prose-first; screens optional.
6. Off-domain → refusal + `offer_human_handoff`.

**Diagnostician:** Separate prompt; verdict `pre` vs `past` computed in code (`compute-safety-verdict.ts`), model narrates only.

### Engine tools (render surface)

Registered in `movemental-ai-agents/src/lib/tools/render-tools.tool.ts`. Full table: [agent-platform-complete-reference.md §9](./ssot/agent-platform-complete-reference.md).

Honesty rail: Zod validates tool props engine-side; client re-validates in `validateComponentProps`.

---

## 5. Screen inventory (what can appear on the sheet)

**Closed `ScreenId` set:** `src/lib/agent-room/acts.ts`

| Screen | Typical entry |
| --- | --- |
| `home` | Opening, `show_home` |
| `about` | `whatIs` scene, chip “About Movemental” (collapsed) |
| `pricing` | `cost` scene, `show_pricing` |
| `path` | `toPath`, regex “how does it work” |
| `safety` / `safetyFlow` | Safety stage, lead chip “Get a clear next AI step” |
| `beat` | `toBeat`, `render_beat` |
| `readback` | Post-diagnostic, `show_readback` |
| `contact` | `talkToUs` |
| `founders` | `whoBehind` |
| `faq` | `toFaq` |
| `leader` | Leader carousel |
| `capture` | Conversion forms |
| `sandbox` / `training` / `technology` | Path stage detail |

**Engine-only extras** (no `ScreenId`): `network`, `audience`, `handoff_human` via `HybridScreen`.

Each screen is a **pre-built React component** under `src/components/agent-room/screen/stub/`. This is why agent turns often “show a web page” — the screen **is** the product UI, not a generated layout.

---

## 6. End-to-end visitor journeys (choreography scripts)

### 6.1 Cold visit (hybrid, default)

```text
1. SSR: AgentRoomFallback (static home copy until hydration)
2. Hydrate → useAgentRoomHybrid mounts
3. playOpeningChoreography / run("opening"):
     show home → ink greeting → gesture → 4 float chips
4. Visitor taps "What does it cost?" (collapsed):
     classify → LOCAL cost scene → show pricing + 2 say lines + follow-up chips
     (zero /turn calls)
5. Visitor expands dock, types "we're a small nonprofit":
     classify → AGENT open_text → POST /api/agent-room/turn
     → text_delta in thread; host may call show_pricing or answer in prose
```

### 6.2 Document page handoff

Routes like `/agent/nonprofits` use `DocumentPageShell` — **no live LLM on page**. Composer pushes to `/agent?ask=…&from=segment`; hybrid reads deep link and sends first turn after opening settles (`deep-link.ts`).

### 6.3 Reality check (beat)

**Local path:** `toBeat` → `beat` screen → `beatScene()` per answer → local `mapRead` → readback screen on completion or gate fail.

**Engine path:** Host `render_beat` → visitor answers feed back → `request_diagnosis` → diagnostician `show_readback`.

### 6.4 Replay / home

Logo or ↺ replay → `goHome()` → cancel scenes → `run("opening")` → clears agent session/history.

---

## 7. Configuration surface (feature flags)

| Variable | Effect |
| --- | --- |
| `NEXT_PUBLIC_AGENT_ROOM_MODE` | `hybrid` \| `stub` \| `stream` |
| `NEXT_PUBLIC_AGENT_ROOM_DISCUSS` | `1` enables Discuss phase UI |
| `NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP` | Assistant turn cap in Discuss (default 7) |
| `AI_AGENTS_BASE_URL` + `AI_AGENTS_SERVICE_SECRET` + `AI_AGENTS_TENANT_ORG_ID` | Engine proxy; missing → 503, local scenes still work |
| `OPENAI_VECTOR_STORE_ID` (engine) | Enables `file_search` on host |

---

## 8. Source file map (orchestration only)

### 8.1 movemental-ai — routing & choreography

| File | Role |
| --- | --- |
| `src/lib/agent-room/mode.ts` | Runtime mode |
| `src/lib/agent-room/move-classifier.ts` | LOCAL vs AGENT |
| `src/lib/agent-room/route-input.ts` | Regex → scene name |
| `src/lib/agent-room/composer-routing.ts` | Chip → local vs agent |
| `src/lib/agent-room/data/scenes.ts` | All local scenes (DATA) |
| `src/lib/agent-room/scene-runner.ts` | `playScene` act executor |
| `src/lib/agent-room/acts.ts` | Act + ScreenId contract |
| `src/lib/agent-room/opening-choreography.ts` | Re-exports `local-choreography.ts` |
| `src/lib/agent-room/local-choreography.ts` | Boot ink sequence |
| `src/lib/agent-room/beat-scenes.ts` | Diagnostic choreography |
| `src/lib/agent-room/discuss.ts` | Phase constants |
| `src/lib/agent-room/discuss-entry.ts` | Discuss entry signals |
| `src/lib/agent-room/deep-link.ts` | `?ask=` handoff |
| `src/lib/agent-room/ways-in-doors.ts` | Expanded empty-thread doors |
| `src/lib/agent-room/caption-validator.ts` | I5 enforcement |
| `src/lib/agent-room/agent-stream-turn.ts` | SSE client |
| `src/lib/agent-room/stream-route-handler.ts` | Server proxy |
| `src/lib/agent-room/stream-chunk.ts` | Chunk types |
| `src/lib/agent-room/screen-map.ts` | ComponentId ↔ ScreenId |
| `src/lib/agent-room/component-props.ts` | Client honesty rail |

### 8.2 movemental-ai — UI controllers

| File | Role |
| --- | --- |
| `src/components/agent-room/agent-room.tsx` | Mode dispatch |
| `src/components/agent-room/use-agent-room-hybrid.ts` | **Default orchestration brain** |
| `src/components/agent-room/use-agent-room-stub.ts` | Offline-only |
| `src/components/agent-room/use-agent-room-stream.ts` | Legacy full-AI |
| `src/components/agent-room/shell/agent-dock.tsx` | Collapsed/expanded UX |
| `src/components/agent-room/use-discuss-phase.ts` | Discuss transcript |
| `src/components/agent-room/use-room-thread.ts` | Thread turns |
| `src/components/agent-room/agent-room-context.tsx` | Ink queue |
| `src/components/agent-room/screen/hybrid-screen.tsx` | Local + engine render |

### 8.3 movemental-ai — prompts & docs (human-editable)

| Path | Role |
| --- | --- |
| `docs/build/agents/agent-room/prompts/room-host.md` | Host system prompt v3.0 |
| `docs/build/agents/agent-room/prompts/room-diagnostician.md` | Diagnostician prompt |
| `docs/build/agents/agent-room/tools.md` | Tool catalog |
| `docs/build/agents/agent-room/handoffs.md` | Host → diagnostician contract |
| `docs/build/agents/agent-room/runtime/discuss-phase-block.md` | Discuss append block |
| `docs/build/agents/agent-room/corpus-and-rag.md` | RAG setup |
| `docs/build/agents/agent-room/files/` | Corpus upload pack |

### 8.4 movemental-ai-agents — runtime

| Path | Role |
| --- | --- |
| `scripts/seed-agent-room.ts` | Agents, tools, assignments |
| `scripts/seed-data/prompts/room-host.md` | Seeded prompt copy |
| `src/lib/tools/render-tools.tool.ts` | Render tool definitions |
| `src/lib/ai/runtime/agent-runner.ts` | Turn loop, Discuss block |
| `src/lib/ai/runtime/room-output-guardrail.ts` | Price-in-voice guard |
| `src/lib/ai/runtime/compute-safety-verdict.ts` | Diagnostician verdict |

### 8.5 Tests (behavior contracts)

| Test | Proves |
| --- | --- |
| `tests/unit/move-classifier.test.ts` | LOCAL vs AGENT |
| `tests/unit/route-input.test.ts` | Regex table |
| `tests/unit/composer-routing.test.ts` | Chip routes |
| `tests/e2e/agent-home-dock.spec.ts` | Collapsed chips → local screens |
| `tests/e2e/agent-room.spec.ts` | Engine integration (flagged) |
| `tests/e2e/agent-room-discuss.spec.ts` | Discuss flag |

---

## 9. Known tensions (why it feels unwieldy)

These are **documented product/architecture tensions**, not bugs — useful when scoping redesign.

| Tension | Current state | Chat-first alternative (not implemented) |
| --- | --- | --- |
| **Screen-first vs chat-first** | Collapsed chips open screens; caption is not for answers | Default chips → AGENT or prose-only thread; screens on explicit request |
| **Two repos for one utterance** | Scene copy in UI repo; host policy in engine repo | Single orchestration config or shared package |
| **Regex false positives** | Word `about` in first message → `whatIs` local scene | Require expand before regex, or drop regex |
| **Expanded dock hides sheet** | I6 — conversation owns viewport | Split layout: thread + smaller sheet, or inline cards |
| **Host told to render** | Prompt pairs voice + `show_*` tools | Prompt mode: prose-only default, tools opt-in |
| **Discuss behind flag** | Full long-form discuss off in prod | Discuss as default conversation mode |
| **Static screen components** | 15+ bespoke screens | Dynamic markdown blocks or simpler card vocabulary |
| **Doc ↔ code drift** | Index tracks stale ADR items (stream default, Haiku model) | See drift table in [documentation-index.md](./documentation-index.md) |

**Consultation framing** ([movemental-ui-ai-design-consultation-2026-06-18.md](./ssot/movemental-ui-ai-design-consultation-2026-06-18.md)): The engine says “not a chatbot”; the UI says “screen-first navigation.” They align architecturally but **visitor mental model** friction remains — especially when users expect ChatGPT-style dialogue and get a pricing page.

---

## 10. Modular redesign levers (for secondary agent planning)

If the goal is **more chat, fewer surprise page swaps**, these are the **smallest independent levers** (ordered by blast radius):

### 10.1 Low risk — routing only

| Lever | File(s) | Effect |
| --- | --- | --- |
| Flip collapsed chip routing | `composer-routing.ts` | All opening chips → `{ kind: "agent" }` instead of local scenes |
| Narrow regex table | `route-input.ts` | Fewer typed messages trigger local `show` |
| Raise `chatActive` earlier | `use-agent-room-hybrid.ts` | Treat first message as conversation |
| Change default chips | `scenes.ts` `opening.suggest` | Different entry intents |

### 10.2 Medium risk — prompt + tools

| Lever | File(s) | Effect |
| --- | --- | --- |
| Host prompt “prose-first” mode | `room-host.md` + seed | Default to `text_delta` without `ui_render` unless visitor asks to “show” |
| Reduce tool assignments | `seed-agent-room.ts` | Host cannot call `show_pricing` etc. |
| Discuss on by default | env + `discuss.ts` | Long-form in thread |

### 10.3 High risk — invariants & layout

| Lever | File(s) | Effect |
| --- | --- | --- |
| Revise I1–I6 | choreography SSOT + dock | Allow split view or inline answers on sheet |
| Replace screen swap with cards | `stub-screen.tsx`, scenes | Smaller UI units inside thread |
| Collapse hybrid to stream | `mode.ts` | Every turn LLM (cost/latency tradeoff) |
| New orchestration DSL | new module | Replace `SCENES` + classifier with declarative flow config |

**Recommended analysis order for a secondary agent:**

1. Read §2 routing table and reproduce one Playwright path (`agent-home-dock.spec.ts`).
2. Decide target: **choreography-first** (current), **balanced**, or **chat-first**.
3. Map target to levers in §10; estimate test surface (`move-classifier`, `composer-routing`, e2e).
4. If prompt changes needed, edit `docs/build/agents/agent-room/` then plan seed + deploy.
5. If invariant changes needed, update choreography SSOT first — it governs dock behavior.

---

## 11. Operator quick reference

| Task | Start here |
| --- | --- |
| Change when pages appear | `composer-routing.ts`, `move-classifier.ts`, `scenes.ts` |
| Change what host says (live) | `docs/build/agents/agent-room/prompts/room-host.md` → seed |
| Change local ink lines | `scenes.ts`, `concierge-voice-lines.ts` |
| Change dock expand/collapse | `agent-dock.tsx`, choreography SSOT |
| Add a screen | `acts.ts` ScreenId + stub component + `screen-map.ts` + engine tool |
| Understand full inventory | [agent-platform-complete-reference.md](./ssot/agent-platform-complete-reference.md) |
| Run consultation fixes | [agent-updates/master_runner.md](./prompts/agent-updates/master_runner.md) |

---

## 12. Changelog

| Date | Change |
| --- | --- |
| 2026-06-29 | Initial orchestration status overview — synthesis doc for modular redesign review |

---

*When behavior changes, update the underlying SSOT first (`scenes.ts`, `composer-routing.ts`, `move-classifier.ts`, engine seed), then revise this overview’s §2, §5, and §9.*
