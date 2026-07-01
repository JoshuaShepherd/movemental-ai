# Agent platform — complete reference

**Index:** [agent-room-documentation-index.md](./agent-room-documentation-index.md)

**Status:** Working SSOT for external review and implementation planning  
**Created:** 2026-06-17  
**Audience:** Engineers, product, and external agents who need to understand *how the Movemental agent works end-to-end* — surfaces, screens, routing, tools, and what is local vs live LLM.

**Supersedes in part:** scattered dock/phase-1 notes. Still see [agent-home-dock-functionality-2026-06-15.md](./agent-home-dock-functionality-2026-06-15.md) for Playwright specifics and [agent-room-prompt-baseline.md](./agent-room-prompt-baseline.md) for prompt editing workflow.

**Chat / conversation UI (expanded dock, handwriting strip, thread, Discuss):** [agent-room-chat-conversation-ui-ssot.md](./agent-room-chat-conversation-ui-ssot.md) — authoritative for dock behavior and where agent text renders.

---

## 0. Executive summary

Movemental’s agent is not a floating chat widget bolted onto a marketing site. **`/agent` is the home page** (site root redirects here). The product is a **three-zone Ink Band room**:

| Zone | Role |
|------|------|
| **Mast** | Logo (home/replay), audience nav (Non-profits · Churches · Institutions), sign-in |
| **Screen** | Full-bleed “sheet” — headlines, diagnostics, path, pricing, safety flow, readback, etc. |
| **Agent dock** | Collapsed composer + handwriting strip **or** expanded conversation dialog |

The agent speaks through **two coupled channels** on every meaningful turn:

1. **Voice** — Caveat “hand” ink line (collapsed dock) and/or conversation thread (expanded dock). Live turns stream via SSE `text_delta`.
2. **Screen** — React screen swapped on the sheet via local choreography (`show` acts) **or** engine `ui_render` chunks.

**Default runtime is `hybrid`:** most visitor journeys are **deterministic local scenes** (zero network, instant). The live LLM (`room-host` in `movemental-ai-agents`) runs only when input is classified **AGENT** — open text, Discuss phase, agent-routed chips, or engine-driven follow-ups.

---

## 1. System topology

```
┌─────────────────────────────────────────────────────────────────────────┐
│  movemental-ai (this repo) — room UI + proxy + local choreography       │
│  ┌──────────────┐   POST SSE    ┌──────────────────────────────────┐  │
│  │ /agent       │ ────────────► │ /api/agent-room/turn               │  │
│  │ AgentRoom    │               │ (forwards to engine, injects auth) │  │
│  │ hooks        │ ◄──────────── │                                    │  │
│  └──────────────┘   StreamChunk └──────────────────────────────────┘  │
└────────────────────────────────────────────│────────────────────────────┘
                                             │ Bearer + X-Tenant-Org-Id
                                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  movemental-ai-agents — headless agent runtime                          │
│  POST /api/agents/stream  →  agent-runner  →  room-host (Opus 4-6)        │
│                              handoff tool  →  room-diagnostician (Opus) │
│  Tools: render_*, gesture_at, suggest_chips, request_diagnosis, …      │
└─────────────────────────────────────────────────────────────────────────┘
```

| Repo | Responsibility |
|------|----------------|
| **`movemental-ai`** | Ink Band UI, `SCENES` data, regex router, hybrid classifier, SSE client, screen registry, capture/enroll API routes |
| **`movemental-ai-agents`** | DB-seeded agents, prompts, tool loop, `ui_render` honesty rail, handoff to diagnostician, optional `file_search` corpus |

The browser **never** calls the engine directly. Tenant id and service secret are injected server-side in `src/lib/agent-room/stream-route-handler.ts`.

---

## 2. Where the agent appears

### 2.1 Primary surface — `/agent`

- **Route:** `src/app/agent/page.tsx` → `AgentRoomShell` → `AgentRoom`
- **Layout:** `src/app/agent/layout.tsx` — `.ink-band-surface`, shared `AgentRoomProvider` (ink/voice substrate spans all `/agent/*` routes)
- **SSR:** Static `AgentRoomFallback` until hydration; live room takes over when JS runs
- **Shell:** Marketing chrome hidden via `proxy.ts` (`x-movemental-shell: room`)

### 2.2 Document surfaces under `/agent/*`

Long-form audience and trust pages use **`DocumentPageShell`** — same ink/voice provider, lighter mast+dock, chips that **scroll locally** or **hand off** to the room:

| Route | Purpose |
|-------|---------|
| `/agent/nonprofits` | Non-profit audience document |
| `/agent/churches` | Church audience document |
| `/agent/institutions` | Institution audience document |
| `/agent/about` | About Movemental |
| `/agent/how-we-use-ai` | AI stance / transparency |
| `/agent/movement-voices` | Trusted voices ecosystem |
| `/agent/invite` | Invite flow |
| `/agent/assessment` | Org assessment entry |
| `/agent/*/deck` | Slide decks (churches, nonprofits, institutions) |
| `/agent/churches-old`, `/agent/nonprofits-old` | **Archived** prior audience documents (redirect targets from migration; not in mast nav) |

**Hand-off pattern:** chips or typed composer text → `router.push('/agent?ask=…&from=segment')`. On mount, hybrid controller reads the deep link, stashes audience for Ways-in, clears URL, sends first turn after opening settles (`src/lib/agent-room/deep-link.ts`).

### 2.3 Secondary “Ask your AI” control

`AskAiPromptButton` on some document ends — copies a prompt and opens **external** AI providers (ChatGPT, Claude, Gemini). **Not** the Movemental concierge; never competes with the dock.

### 2.4 Related funnels (not the room LLM)

| Route / API | Agent relationship |
|-------------|-------------------|
| `/enroll` | Safety dashboard enrollment (Stripe); chip target `toEnroll` |
| `/assess` | Deep org AI reality assessment; chip target `toOrgAssessment` |
| `/api/agent-room/capture` | Lead persistence from capture forms |
| `/api/agent-room/enroll` | Paid dashboard provisioning |
| `/api/agent-room/mast-auth` | Mast sign-in |

### 2.5 Out of scope for this doc

- **Movement leader tenant apps** (`alan-hirsch`, etc.) — separate product with AI Lab / floating chat; see [movement-leader-platform-screen-inventory.md](./movement-leader-platform-screen-inventory.md)
- **Studio / visual editor** agent — separate consumer of `movemental-ai-agents`

---

## 3. Runtime modes

Controlled by `NEXT_PUBLIC_AGENT_ROOM_MODE` (build-time, client-inlined). Default: **`hybrid`**.

| Mode | Hook | Network | When to use |
|------|------|---------|-------------|
| **`hybrid`** | `useAgentRoomHybrid` | SSE only on AGENT-classified moves | **Production default** |
| **`stub`** | `useAgentRoomStub` | None | Demos, engine-down, offline QA |
| **`stream`** | `useAgentRoomStream` | Every composer action → SSE | **Deprecated (AU-20)** — maps to hybrid unless `NEXT_PUBLIC_AGENT_ROOM_LEGACY_STREAM=1` |

Dispatch: `src/components/agent-room/agent-room.tsx`.

---

## 4. UI layout and conversation dock

### 4.1 Collapsed dock (default)

- Single-line `#composer-input`, Send, Expand chat, drawer handle
- Placeholder: `Type here, or tap a suggestion…`
- **Handwriting strip** above composer — concierge ink line from local `say` acts or live `text_delta`
- **Float chips** — quick utterances above the composer card

### 4.2 Expanded dock

- Full-height dialog: thread + composer footer
- **Stage sheet hidden** while expanded (`dockExpanded` → screen zone unmounted) so conversation owns the viewport below mast
- **Ways in** panel when thread is empty: audience segments + curated doors (`src/lib/agent-room/ways-in-doors.ts`)
- Escape / backdrop / collapse restores sheet

### 4.3 Voice vs thread

| State | Where agent text appears |
|-------|---------------------------|
| Collapsed, Guide phase | Handwriting strip (`voice.text` / streaming ink) |
| Expanded | Conversation thread (`liveText` + committed `voice.text`) |
| Discuss, long reply (>180 chars) | Sheet passage (marginalia) + short lines in band |
| Discuss, short reply | Voice band only |

### 4.4 Busy / streaming gates

- `busy` (local scene running) disables send/chips but **input stays focusable** (2026-06-15 fix)
- Once `conversationActiveRef` is true, busy gate is bypassed for sends
- Opening choreography sets `busy` during ink animation

---

## 5. The act vocabulary (local choreography)

Source of truth: `src/lib/agent-room/acts.ts` (ported from `movemental-agentic-front-end` prototype).

| Act | Effect | Engine equivalent |
|-----|--------|-------------------|
| `say` | One ink voice line | `text_delta` (streamed) |
| `show` | Swap screen (`ScreenId` + opts) | `ui_render` |
| `gesture` | underline / circle / arrow on DOM target | `ink_gesture` |
| `wait` | Timed beat (respects reduced motion) | — |
| `suggest` | Float chips → local `run(scene)` or hybrid routing | `suggest` |
| `clear` | Wipe ink + voice | — |
| `await: "capture"` | Pause scene until capture form submits/skips | — |

A **scene** is an ordered `Act[]`. The single runner `playScene` in `src/lib/agent-room/scene-runner.ts` walks acts with a generation guard (new `goHome` / `run` cancels in-flight scenes).

**Choreography is data:** `src/lib/agent-room/data/scenes.ts` — not bespoke React code per funnel step.

---

## 6. Screen inventory

### 6.1 Closed `ScreenId` set

Defined in `acts.ts`; rendered via `SCREEN_COMPONENTS` in `src/components/agent-room/screen/stub/stub-screen.tsx`.

| `ScreenId` | Component | Typical content |
|------------|-----------|-----------------|
| `home` | `HomeScreen` | Headline + leader carousel |
| `beat` | `BeatScreen` | Organizational reality map (4 questions, Safety gate on Q1) |
| `readback` | `ReadbackScreen` | Path placement, prose, fork chips, map email capture |
| `safety` | `SafetyScreen` | Stage 01 Safety explainer |
| `confirm` | `ConfirmScreen` | Post-capture confirmation |
| `path` | `PathScreen` | Four-stage path (Safety → Sandbox → Training → Technology) |
| `founders` | `FoundersScreen` | Who stands behind Movemental |
| `leader` | `LeaderScreen` | Trusted voice profile |
| `about` | `AboutScreen` | What Movemental is |
| `contact` | `ContactScreen` | Contact form |
| `pricing` | `PricingScreen` | SafeGuide vs SafeStart — copy SSOT: `src/lib/agent-room/data/pricing.ts` |
| `faq` | `FaqScreen` | FAQ groups |
| `capture` | `CaptureScreen` | Lead forms (`map` / `paid` / `free` / `discuss`) |
| `safetyDashboard` | `SafetyDashboardScreen` | Paid Safety funnel (legacy stub) |
| `sandbox` | `SandboxScreen` | Stage 02 detail |
| `training` | `TrainingScreen` | Stage 03 detail |
| `technology` | `TechnologyScreen` | Stage 04 detail |
| `safetyFlow` | `SafetyFlowScreen` | Self-serve Safety wizard (question → fork → charter → DIY/signup → result) |

**Scroll behavior:** all screens scroll except `beat` (compact sheet). Only `home` is centered without margin rules.

### 6.2 Engine-extra components (no `ScreenId`)

Rendered directly by `HybridScreen` when `ui_render` targets ids with no Ink Band screen (`src/lib/agent-room/screen-map.ts`):

| `ComponentId` | Component | Notes |
|---------------|-----------|-------|
| `network` | `NetworkScreen` | Connected leaders constellation |
| `audience` | `AudienceScreen` | Churches / nonprofits / seminaries |
| `handoff_human` | `HandoffHuman` | Contact Josh card (`josh@movemental.ai`) |

### 6.3 Engine `ComponentId` ↔ `ScreenId` map

`src/lib/agent-room/screen-map.ts` — compile-time `satisfies` rail. Ink Band screens map 1:1 by name. Stub-only screens (`safetyFlow`, `sandbox`, …) reverse-map to nearest engine id for documentation purposes.

### 6.4 Canonical public stage labels (AU-01, 2026-06-18)

**Visitor-facing vocabulary:** Safety · Sandbox · Training · Tech (tight UI) / Technology (long form).

**SSOT:** `src/lib/agent-room/naming.ts` (`PATH_STAGE_LABELS`, `PATH_STAGE_RAIL`). Legacy assessment keys (`Skills`, `Solutions`) map at display time via `src/lib/ai-reality/stage-mapper.ts` — never render those legacy names on agent-room, path, pricing, field-guide, or `/research` surfaces. Internal DB columns (`stage_skills`, `stage_solutions`) are unchanged.

---

## 7. When screen vs chat — the routing decision tree

This is the core product behavior external reviewers should understand.

### 7.1 Hybrid mode (default)

```
Visitor action
    │
    ├─ Discuss phase? ─────────────────────────────► AGENT (always)
    │
    ├─ chatActive? (expanded dock OR prior agent turn OR markConversationActive)
    │       └─ unless Ways-in door text from expanded panel ─► may still regex-locally
    │
    ├─ Meta/objection streak + DISCUSS_ENABLED? ───► LOCAL discussOffer scene
    │
    ├─ regex match (route-input.ts)? ──────────────► LOCAL scene (show + say + suggest)
    │
    └─ else ───────────────────────────────────────► AGENT (open_text)
```

**Classifier SSOT:** `src/lib/agent-room/move-classifier.ts`  
**Regex table SSOT:** `src/lib/agent-room/route-input.ts` (first match wins; order matters)

### 7.2 Default float chips (after opening)

**Screen-first matrix (AU-07):** [agent-room-chip-routing-matrix.md](./agent-room-chip-routing-matrix.md)

| Chip | Hybrid collapsed dock | Hybrid expanded drawer | Stream behavior |
|------|----------------------|------------------------|-----------------|
| **Get a clear next AI step** | LOCAL `toSafetyFlow` → safety flow sheet | LOCAL `toSafetyFlow` | LOCAL `toSafetyFlow` |
| **About Movemental** | LOCAL `whatIs` → about | AGENT utterance → SSE | AGENT |
| **What does it cost?** | LOCAL `cost` → pricing | AGENT → SSE | AGENT |
| **Get in touch** | LOCAL `talkToUs` → contact | AGENT → SSE | AGENT |

Chip routing SSOT: `src/lib/agent-room/composer-routing.ts` (`resolveChipRoute` + `OPENING_CHIP_LOCAL_SCENES`).

**Important:** Scene follow-up chips (e.g. on path screen “Show me Safety”) still use `SuggestChip.to` → local `SCENES` when label is **not** in `STREAM_CHIP_ROUTES`.

### 7.3 Typed regex routes (first collapsed message only)

| Pattern (summary) | Scene | Screen |
|-------------------|-------|--------|
| after / whole path / how.*work | `toPath` | `path` |
| sandbox / exploration | `toSandbox` | `sandbox` |
| training / formation | `toTraining` | `training` |
| technology / deployment | `toTechnology` | `technology` |
| safety / charter / handbook | `toSafety` | `safety` |
| cost / price / afford | `cost` | `pricing` |
| faq / philosophy / stance | `toFaq` | `faq` |
| contact / email / human | `talkToUs` | `contact` |
| who / behind / leader | `whoBehind` | `founders` |
| what / movemental / **about** | `whatIs` | `about` |
| stuck / next / assess / safe | `toSafetyFlow` | `safetyFlow` |

**Gotcha:** regex includes `about` — phrases like “question **about** donors” match `whatIs` locally on the **first** collapsed message. Prefer chips or expand dock first for free-form chat.

### 7.4 Agent turn side effects

When classified AGENT, `runAgentStreamTurn` POSTs to `/api/agent-room/turn`. Callbacks in `useAgentRoomHybrid`:

| SSE chunk | Client effect |
|-----------|---------------|
| `text_delta` | Stream into ink / thread |
| `progress` (thinking) | Thinking pulse |
| `progress` (tool_call) | Quiet status note (“searching the archive”) |
| `ui_render` | Swap screen or engine-extra overlay |
| `ink_gesture` | Draw gesture on target |
| `suggest` | Replace float chips (values go back to agent) |
| `agent_handoff` | Clear stream; thinking pulse; diagnostician continues |
| `error` | Error state / stall recovery |

Engine `ui_render` for `capture` with `kind: "map"` does **not** swap screens — focuses inline readback email (`focusReadbackMapEmail`).

### 7.5 Stub mode

All input routes through `routeInput` → local scenes. Unmatched text plays `FALLBACK_SAY` (refusal line). No SSE.

### 7.6 Stream mode

Virtually all composer input → SSE. Local choreography limited to opening ink + safety-flow voice (`src/lib/agent-room/local-choreography.ts`). Default chips use `resolveStreamChipRoute`.

---

## 8. Local scenes catalog

All keys in `SCENES` (`src/lib/agent-room/data/scenes.ts`). Runner: `run(name)`.

| Scene | Shows | Purpose |
|-------|-------|---------|
| `opening` | `home` | Boot greeting + default chips |
| `whatIs` | `about` | About Movemental |
| `cost` | `pricing` | Pricing |
| `toFaq` | `faq` | FAQ |
| `whoBehind` | `founders` | Founders / trust |
| `talkToUs` | `contact` | Contact |
| `toPath` | `path` | Whole path |
| `toSandbox` / `toTraining` / `toTechnology` | stage screens | Path stage detail |
| `toSafety` | `safety` | Safety stage |
| `whySafetyFirst` / `safetyWithoutIt` | (voice only) | Safety objection handling |
| `toSafetyFlow` | `safetyFlow` step `question` | Primary on-ramp |
| `toSafetyFlowDiy` / `toSafetyFlowSignup` | `safetyFlow` | Wizard branches |
| `beatIntro` | (voice only) | Bridge before diagnostic |
| `toBeat` / `toBeatCold` | `beat` | Reality map |
| `toSafetyDashboard` | `safetyFlow` signup | Dashboard enrollment |
| `withUs` | `capture` paid → `confirm` | Paid capture flow |
| `focusHandbook` / `onOwn` | (gesture to dock email) | Free handbook |
| `toDiscuss` | `capture` discuss | Stub Discuss capture gate |
| `discussOffer` | (voice + consent chips) | Offer Discuss switch |
| `charter` / `involved` | (voice) | Charter explanation |
| `leaderConnect` | (voice) | Leader network (overridden per leader in hook) |

Leader-aware scenes (`leaderScene`, `leaderWork`, `leaderConnect`) are wired in `use-agent-room-hybrid.ts` with `currentLeaderRef`.

---

## 9. Live agents and tools (engine)

Seeded by `pnpm seed:agent-room` in **`movemental-ai-agents`**. Prompt files: `scripts/seed-data/prompts/room-host.md`, `room-diagnostician.md`.

### 9.1 Agents

| Slug | Model | Role | When invoked |
|------|-------|------|--------------|
| `room-host` | `claude-opus-4-6` (seed SSOT; see `agent-room-waf-and-model-hygiene.md`) | Movemental Concierge — prose, optional renders, reality check | Every AGENT-classified turn |
| `room-diagnostician` | `claude-opus-4-6` | Composes read-back once | Handoff via `request_diagnosis` after final beat |

**Handoff:** Host calls `request_diagnosis` with verbatim beat answers → runner emits `agent_handoff` → diagnostician streams `show_readback`. Resolved as of 2026-06 (supersedes open decision in phase-1 status doc).

### 9.2 Render and action tools

Registered in `movemental-ai-agents/src/lib/tools/render-tools.tool.ts`:

| Tool | `ComponentId` | Assigned to | Live vs placeholder |
|------|---------------|-------------|---------------------|
| `render_beat` | `beat` | host | **Live** — dynamic Q + options |
| `show_readback` | `readback` | diagnostician | **Live** — composed judgment |
| `show_path` | `path` | host | Static copy in component |
| `show_pricing` | `pricing` | host | **Dynamic props** — `highlightStage`, `eyebrow` (amounts stay in component) |
| `show_safety_flow` | `safetyFlow` | host | **Live** — wizard `step` prop |
| `show_network` | `network` | host | Engine-extra |
| `show_audience` | `audience` | host | Engine-extra |
| `show_founders` | `founders` | host | **Dynamic props** — optional `introLine` |
| `show_capture` | `capture` | host | Form cell by `kind` |
| `offer_human_handoff` | `handoff_human` | both | Engine-extra |
| `show_home` | `home` | (registry) | Static |
| `show_safety` | `safety` | (registry) | Static |
| `show_confirm` | `confirm` | (registry) | Static |
| `show_leader` | `leader` | (registry) | Static |
| `show_about` | `about` | (registry) | **Dynamic props** — optional `lede` |
| `show_contact` | `contact` | (registry) | Static |
| `show_faq` | `faq` | (registry) | Static |
| `gesture_at` | — | host | Emits `ink_gesture` (allow-list per screen) |
| `suggest_chips` | — | host | Emits `suggest` (max 4 chips) |
| `request_diagnosis` | — | host | Handoff envelope (not a render) |
| `file_search` | — | host (optional) | OpenAI vector store; gated on `OPENAI_VECTOR_STORE_ID` |

**Honesty rail:** Zod validates tool props engine-side (`defineRenderTool`). Invalid props → `error` chunk, never rendered. Client re-validates in `validateComponentProps`.

### 9.3 Host prompt policy (summary)

1. Speak **and** show — paired channels; don’t describe UI you could render.
2. Closed repertoire — only listed tools/screens.
3. Reality check beats are **scripted** in `room-host.md`; host advances via `render_beat`, then `request_diagnosis`.
4. **Prose guardrail:** never quote prices in voice — call `show_pricing` (`room-output-guardrail.ts`).
5. Discuss phase (when `phase: "discuss"`): lead with prose; screens optional; don’t force `render_beat` every turn.
6. Off-domain → honest refusal + `offer_human_handoff`.

Full lever table: [agent-room-prompt-baseline.md](./agent-room-prompt-baseline.md).

### 9.4 Diagnostician verdict rule

Computed in code by `computeSafetyVerdict()` in the engine (`movemental-ai-agents/src/lib/ai/runtime/compute-safety-verdict.ts`). Injected into the diagnostician handoff message; the model narrates only.

`verdict: "past"` **only if** decision answer is “Yes — written and ratified” **and** follow-up probe names specific refusals. Otherwise `pre`. Never flatter past Safety.

---

## 10. Organizational reality map (local beat)

**Data:** `src/lib/agent-room/data/map-q.ts` — four questions, Safety gate on Q1.

| Q | Tag | Gate behavior |
|---|-----|---------------|
| 1 | Safety | Pass only if “Yes, all four, in writing”; else `gateFail` → threat readback, stop |
| 2 | Sandbox | Gap signals for experimentation |
| 3 | Training | Formation gaps |
| 4 | Technology | Deployment gaps |

**Choreography:** `beatScene` in `src/lib/agent-room/beat-scenes.ts` — local voice lines per answer, advances `qi`, computes `MapRead` via `computeMapRead`.

**Engine path:** Host emits `render_beat` with props matching `RealityCheckBeatProps`; beat screen in stream mode uses `stream` payload + `onSay` for answers (feeds back to agent).

**Readback:** Local stub uses `mapRead` state; engine uses diagnostician `show_readback` with richer prose + `fork` intents (`pricing` | `path` | `handoff_human`).

---

## 11. Discuss mode (optional)

**Flag:** `NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1` (default **off**). Staging checklist: [agent-room-discuss-staging-env.md](./agent-room-discuss-staging-env.md). **Validated:** 2026-06-18 (AU-09 — mocked hybrid E2E + turn-cap capture overlay).

| Concept | Behavior |
|---------|----------|
| Phases | `guide` (default) vs `discuss` |
| Entry | Chip `toDiscuss`, agent chip `enter-discuss`, post-readback chip, or `discussOffer` consent |
| Typed in Discuss | Always AGENT |
| Transcript | Marginalia on sheet (`margin` / `passage` / `voice` surfaces) |
| Turn cap | Default 7 assistant turns (`DISCUSS_TURN_CAP`) then capture offer |
| Stub w/ flag off | `toDiscuss` scene → email capture (honest “can’t script this”) |

SSOT: `src/lib/agent-room/discuss.ts`, `discuss-entry.ts`, `use-discuss-phase.ts`.

---

## 12. Safety flow wizard

**Screen:** `safetyFlow` with `opts.step`:

| Step | UI |
|------|-----|
| `question` | Single diagnostic question |
| `fork` | DIY vs signup vs ahead |
| `charter` | Charter preview |
| `diy` | Self-serve path |
| `signup` | Dashboard signup |
| `ahead` | Already past Safety |
| `result` | Outcome |

Entered locally via `toSafetyFlow` (lead chip “Get a clear next AI step”) or by the host via `show_safety_flow` (`step` prop) in hybrid/stream mode.

---

## 13. Capture and leads

### 13.1 Capture kinds

| `kind` | UX | Backend fan-out (`/api/agent-room/capture`) |
|--------|-----|---------------------------------------------|
| `map` | Email map result after beat | Newsletter + map persistence |
| `paid` | SafeStart dashboard | Team notify; full enroll via `/api/agent-room/enroll` |
| `free` | Handbook download | Field guide lead + PDF email |
| `discuss` | Team follow-up | `contact_submissions` + inbox |

All writes `agent_room_leads` row (tenant-scoped).

### 13.2 Chip targets that skip scenes

`src/lib/agent-room/suggest-chip-targets.ts`:

| Target | Action |
|--------|--------|
| `focusMapEmail` | Focus readback inline email |
| `focusHandbook` | Expand dock + handbook capture |
| `toEnroll` | Navigate `/enroll` |
| `toOrgAssessment` | Navigate `/assess` |

---

## 14. Stream protocol

**Client contract:** `src/lib/agent-room/stream-chunk.ts`  
**Proxy body:** `src/lib/agent-room/proxy-schema.ts`

### 14.1 Request (browser → room proxy)

```json
{
  "message": "string",
  "sessionId": "optional client-persisted",
  "anonId": "optional stable browser id",
  "history": [{ "role": "user"|"assistant", "content": "..." }],
  "phase": "guide"|"discuss",
  "roomContext": {
    "screenId": "home",
    "lastScene": "opening",
    "phase": "guide",
    "mapAnswersCount": 0,
    "inLocalScene": false
  }
}
```

Proxy adds: `tenantOrgId`, `userId` (from anonId), `agentSlug` (default `room-host`).

### 14.2 Response chunks

`text_delta` · `tool_call` · `tool_result` · `agent_handoff` · `ui_render` · `ink_gesture` · `suggest` · `progress` · `done` · `error`

**Stall watchdog:** 45s connect, 30s idle (`agent-stream-turn.ts`) → retryable `stalled`.

**Public path note:** `/api/agent-room/turn` not `…/stream` (Cloudflare WAF). Proposed allow-rule: [`agent-room-waf-and-model-hygiene.md`](./agent-room-waf-and-model-hygiene.md).

---

## 15. Environment and feature flags

### 15.1 Room (`movemental-ai`)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_AGENT_ROOM_MODE` | `hybrid` \| `stub` \| `stream` |
| `NEXT_PUBLIC_AGENT_ROOM_DISCUSS` | `1` enables Discuss UI |
| `NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP` | Discuss assistant turn cap |
| `AI_AGENTS_BASE_URL` | Engine origin |
| `AI_AGENTS_SERVICE_SECRET` | Bearer for proxy |
| `AI_AGENTS_TENANT_ORG_ID` | Pinned org uuid |

Without engine env: POST returns **503**; hybrid shows stall recovery voice line.

### 15.2 Engine (`movemental-ai-agents`)

| Variable | Purpose |
|----------|---------|
| `ANTHROPIC_API_KEY` | Model calls |
| `SERVICE_API_SECRET` | Validates room proxy |
| `TENANT_ORG_ID` | Seed target |
| `OPENAI_VECTOR_STORE_ID` | Optional `file_search` for host |
| `OPENAI_API_KEY` | Required when `file_search` is assigned |

**RAG operator setup (staging/production):**

1. Sync the public corpus pack: `pnpm agent-room:corpus:sync` in `movemental-ai` (see [`corpus-and-rag.md`](../agents/agent-room/corpus-and-rag.md)).
2. Set `OPENAI_VECTOR_STORE_ID` and `OPENAI_API_KEY` on the engine deployment.
3. Re-seed room tools: `pnpm seed:agent-room` in `movemental-ai-agents` (assigns `file_search` when the vector store id is present).
4. Smoke test: ask an in-domain depth question answered only in a KB file (e.g. fragmentation thesis).

**After prompt edits:** `pnpm seed:agent-room` in engine repo (DB is runtime SSOT).

---

## 16. Key source files (navigation map)

| Concern | Path |
|---------|------|
| Mode dispatch | `src/components/agent-room/agent-room.tsx` |
| Hybrid controller | `src/components/agent-room/use-agent-room-hybrid.ts` |
| Stream controller | `src/components/agent-room/use-agent-room-stream.ts` |
| Stub controller | `src/components/agent-room/use-agent-room-stub.ts` |
| Scenes data | `src/lib/agent-room/data/scenes.ts` |
| Regex router | `src/lib/agent-room/route-input.ts` |
| Move classifier | `src/lib/agent-room/move-classifier.ts` |
| Chip routing | `src/lib/agent-room/composer-routing.ts` |
| Screen registry | `src/components/agent-room/screen/stub/stub-screen.tsx` |
| ComponentId map | `src/lib/agent-room/screen-map.ts` |
| SSE client | `src/lib/agent-room/agent-stream-turn.ts` |
| Room proxy | `src/lib/agent-room/stream-route-handler.ts` |
| Ink provider | `src/components/agent-room/agent-room-context.tsx` |
| Dock UI | `src/components/agent-room/shell/agent-dock.tsx` |
| Engine tools | `movemental-ai-agents/src/lib/tools/render-tools.tool.ts` |
| Safety verdict | `movemental-ai-agents/src/lib/ai/runtime/compute-safety-verdict.ts` |
| Output guardrail | `movemental-ai-agents/src/lib/ai/runtime/room-output-guardrail.ts` |
| Engine seed | `movemental-ai-agents/scripts/seed-agent-room.ts` |

---

## 17. Testing

| Suite | Proves |
|-------|--------|
| `tests/e2e/agent-home-dock.spec.ts` | Hybrid dock: chips, regex path, expand, lead chip local |
| `tests/e2e/agent-room.spec.ts` | Stream/stub/hybrid engine probes (`RUN_AGENT_ROOM_EE=1`) |
| `tests/e2e/agent-room-discuss.spec.ts` | Discuss flag behavior |
| `tests/unit/move-classifier.test.ts` | LOCAL vs AGENT classification |
| `tests/unit/route-input.test.ts` | Regex table |
| `tests/unit/composer-routing.test.ts` | Default chip routes |
| `movemental-ai-agents` `test:room-host` | Tool registry + handoff contract |

---

## 18. Known gaps and recommended work

Prioritized for external review — not an committed roadmap.

### 18.1 Product / UX

| Gap | Notes |
|-----|-------|
| **Hybrid vs user mental model** | First message requires high-confidence local match; ambiguous text → AGENT (see `isHighConfidenceLocalRoute`) |
| **Pricing/about chips → conversation** | By design (2026-06-15); screens still exist for typed regex first message |
| **Safety flow engine id** | Resolved — `show_safety_flow` + `safetyFlow` ComponentId |
| **Discuss default off** | Full long-form Discuss requires flag + engine Discuss prompt block |
| **Ways-in doors vs regex** | Expanded panel doors can still match local regex unless `chatActive` |

### 18.2 Engine / content

| Gap | Notes |
|-----|-------|
| ~~**Static render tools**~~ | **Resolved (AU-16):** `show_pricing`, `show_founders`, `show_about` accept optional validated props |
| **`file_search` optional** | Without vector store, host is canon-only — wired + documented (AU-17) |
| **Guardrails** | Host prose screened in `room-output-guardrail.ts`; tool props via Zod honesty rail |
| ~~**Session persistence**~~ | **Resolved (AU-18):** `agent_room_transcripts` live; engine writes on turn completion; client restores via `GET /api/agent-room/transcript`; ops: `scripts/query-room-transcripts.ts` |

### 18.3 Parity / tech debt

| Gap | Notes |
|-----|-------|
| **Local beat vs engine beat** | **Resolved (AU-04):** `beat-catalog.ts` SSOT; local stub uses six engine-aligned beats; sync test vs `movemental-ai-agents` `HOST_SCENES.beats` |
| **Stream mode** | Legacy; hybrid is the architectural center |
| **`safetyDashboard` screen** | Funnel stub; enrollment moving to `safetyFlow` + `/enroll` |
| **Concept Modern** | Archived for marketing; agent room is Ink Band only |

### 18.4 Suggested next slices (for planning)

1. **Engine `safety_flow` component** — align wizard with render tool for agent-driven branching  
2. ~~**Turn on Discuss in staging**~~ — **Done (AU-09):** mocked E2E + turn-cap → discuss capture overlay; prod default still off  
3. ~~**Unify beat data**~~ — **Done (AU-04):** `beat-catalog.ts` SSOT  
4. **Analytics** — wire `roomContext`, `DiscussReason`, chip labels to PostHog events  
5. ~~**SEO / no-JS**~~ — **Done (AU-08):** expanded `AgentRoomFallback` with SSOT copy + `<noscript>`  
6. ~~**Document surfaces chip audit**~~ — **Done (AU-07):** routing matrix + Playwright coverage

---

## 19. Quick operator checklist

- [ ] `AI_AGENTS_*` env vars set in `movemental-ai`
- [ ] Engine running; `pnpm seed:agent-room` applied for tenant
- [ ] `pnpm test:e2e tests/e2e/agent-home-dock.spec.ts` green
- [ ] Spot-check: cost chip → conversation dialog, not pricing sheet
- [ ] Spot-check: lead chip → safety flow sheet (local, zero `/turn` calls)
- [ ] Spot-check: expand dock → Ways in panel with audience segment
- [ ] Engine down → hybrid still serves local funnels; agent chips show stall recovery

---

## 20. Related documentation

| Doc | Topic |
|-----|-------|
| [agent-home-dock-functionality-2026-06-15.md](./agent-home-dock-functionality-2026-06-15.md) | Dock UX audit + Playwright |
| [agent-room-prompt-baseline.md](./agent-room-prompt-baseline.md) | Prompt editing + seed workflow |
| [agent-room-phase1-status.md](./agent-room-phase1-status.md) | Phase 1 build history (partially historical) |
| [agent-room-suggestion-pills-inventory-and-recommendations.md](./agent-room-suggestion-pills-inventory-and-recommendations.md) | Chip inventory |
| [agent-room-long-form-discussion-ui.md](./agent-room-long-form-discussion-ui.md) | Discuss design spec |
| [agent-room-discuss-layout-decision.md](./agent-room-discuss-layout-decision.md) | Shipped Discuss layout (Model C) |
| [docs/design/INK_BAND_DESIGN_CHAIN.md](../design/INK_BAND_DESIGN_CHAIN.md) | Visual design canon |
| [ai-agent-inventory-best-of-breed.md](./ai-agent-inventory-best-of-breed.md) | Org-wide agent architecture context |

---

*This document reflects the codebase as of 2026-06-30. When behavior changes, update the relevant SSOT file first (`scenes.ts`, `composer-routing.ts`, `move-classifier.ts`, `screen-map.ts`, engine seed), then revise this reference.*
