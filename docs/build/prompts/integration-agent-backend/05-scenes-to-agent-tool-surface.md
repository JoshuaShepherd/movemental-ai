# INT-05 — Replace `SCENES` choreography with agent-driven acts

**Prompt ID:** INT-05
**Target agent:** Cursor / Claude Code
**Primary repos:** `movemental-ai-agents` + `movemental-ai` (cross-repo)
**Blocks:** INT-02, INT-03, INT-04
**Status:** Done ✅ (carrier + minimal seed; broad seed/prompt OLD-vocab drift logged as open item)
**Last updated:** 2026-06-10

**Discuss:** [agent-room-long-form-discussion-ui.md](../../notes/agent-room-long-form-discussion-ui.md) — `suggest` chips include Discuss transition offers; **`capture`** render is separate (INT-02). Phase-aware prompt + POST `phase` → **INT-10** (Option A).

---

## 1. Role and stance

In **stream mode**, the *agent* performs the choreography that `SCENES` hard-codes in stub mode. The four expressive acts must all have a stream carrier so a turn can `say` + `show` + `gesture` + `suggest` — exactly the prototype's act grammar, now model-driven. The stub `SCENES`/`playScene` stays as the offline fallback.

**Discuss** adds phase-specific `suggest` chips (transition consent, contextual Discuss chips) — see INT-08 §5, INT-09 §5. Do not merge stub Discuss into stream history (AF-90 guardrail).

---

## 2. Act → carrier status (after INT-02/03/04)

| Act | Stream carrier | Status |
| --- | --- | --- |
| `say` | `text_delta` | ✅ INT-03 |
| `show` | `ui_render` | ✅ INT-02 |
| `gesture` | `ink_gesture` | ✅ INT-04 |
| `suggest` | **(none yet)** | **this prompt** |
| `wait` / `clear` | client-side timing/housekeeping | n/a (model paces via token flow) |

---

## 3. Work

1. **`suggest` carrier** — add a `suggest` chunk (or a render-tool emitting it): `{ type: "suggest", chips: { label: string; lead?: boolean; value: string }[] }`. `value` is the utterance sent back through `sendMessage` when a chip is tapped (stream chips route to the agent, **not** to a local `run(to)`). Add to `ai/types.ts` + `stream-chunk.ts` (mirror) + the stream hook (`case "suggest": setSuggestions(...)`), reusing the existing `ComposerChip` shape.
2. **Agent surface** — give the room-host agent the four render-tools (`say` is implicit via text; `show`/`gesture`/`suggest` are tools) plus a system prompt that encodes the prototype's flow intent (opening → map → readback → path/safety → confirm) **as guidance, not a script**. The closed screen set + target allow-list are the honesty rails.
3. **Mode boundary** — stub keeps `SCENES` + `playScene`; stream drives acts from chunks. Do **not** merge the two into one untyped path (AF-90 guardrail). The `AgentRoomController` shape stays identical so `AgentRoomView` is mode-agnostic.
4. **Beat answers** — in stream mode, a beat option tap sends its value as a user turn (the agent decides the next `ui_render`), replacing the stub's local `beatScene` choreography.
5. **Discuss transition chips (Guide phase)** — `suggest` may offer: *Yes, talk it through* / *Stay on the guided path* (client `enterDiscuss` on yes — INT-08). Post-readback: *Talk through what this means for us* (INT-09 entry points).
6. **Defer to INT-10** for `phase` in POST, Discuss prompt block, turn-cap → `capture` agent policy, and long-turn sheet routing.

---

## 4. Definition of Done

- [x] `suggest` chunk in both contracts (mirror in sync); stream chips route utterances back through the agent.
- [x] Discuss transition + contextual chips defined in seed prompt (Guide vs Discuss chip sets).
- [x] Room-host agent can drive a full turn: stream text + render a screen + gesture + offer chips. *(seed wires render_beat + gesture_at + suggest_chips; mechanically complete, live turn pending engine — INT-07)*
- [x] Stub `SCENES`/`playScene` untouched and still default; **zero network** in stub.
- [x] No merged untyped stub/stream path; mode flag intact.
- [x] `pnpm typecheck` both repos; engine tool tests green; §10 + master runner updated.

> **Open item (operator-chosen "Minimal + document"):** broad pre-existing seed/prompt OLD-vocab drift (`show_field_guide_signup`/`show_enrollment` vs `show_capture`; unseeded INT-01 screens; `HOST_SCENES`) → a dedicated reconciliation slice. See §10.

---

## 5. Verification

- Live: "map where we stand" → agent says + shows `beat` + gestures `#opts` + offers chips; tapping a chip advances the conversation.
- Stub: AF-12 scene flows unchanged.
- Chip in stream mode sends an utterance (network call to the proxy); chip in stub mode runs a local scene (no network).

---

## §10 Attempt log

### 2026-06-10 — Claude Code (suggest carrier + minimal seed; operator chose "Minimal + document")

**Outcome:** ✅ Done. The fourth act carrier (`suggest`) is implemented end-to-end and verified in both repos. Seed/prompt reconciled the minimum needed for a full live turn; the broader pre-existing OLD-vocab drift is logged below as an open item (operator decision).

**`suggest` chunk shape (mirror in sync).** `{ type: "suggest"; chips: { label: string; lead?: boolean; value: string }[] }`. Engine `ai/types.ts` + client `stream-chunk.ts` (`z.array(...).min(1)`). `value` = the utterance sent back as the next **user turn** when a chip is tapped (chips route to the agent, never a local `run(to)`). Like the gesture allow-list, the per-tool **cap** (max 4) lives engine-side only — the client just validates shape and drops malformed frames (documented intentional asymmetry, not drift).

**Engine carrier.** `ui-render.ts`: `SUGGEST_KEY` envelope + `SuggestEnvelope` + `ToolOutcome` `suggest` variant + `interpretToolOutput` branch + **`defineSuggestTool({ name, max })`** (Zod: chips `min(1).max(max)`, each `{label,value}` required + `lead?`; invalid → blocked `error` chunk, reusing the render-error envelope). `render-tools.tool.ts`: `defineSuggestTool({ name: "suggest_chips", max: 4 })`. `agent-runner.ts` `uiRenderChunksFor` now yields `suggest`. New `ui-render.test.ts` suggest block: valid → chunk+ack, empty → blocked, over-cap → blocked.

**Client.** `use-agent-room-stream.ts`: `agentChips` state (`null` = static on-ramp fallback); `case "suggest"` maps chips → `ComposerChip[]` with `onSelect: () => sendMessage(value)`; `suggestions` derivation = beat→[] else `agentChips ?? DEFAULT_SUGGESTIONS`. Cleared to `[]` at send-start, `null` on `reset`. `AgentRoomController` shape unchanged → `AgentRoomView` stays mode-agnostic.

**Beat-in-stream (work item 4): already satisfied by INT-02.** A stream beat renders via `RealityCheckBeat` (the `stream` channel in `beat-screen.tsx`); each option tap calls `onSay(opt)` → `sendMessage(opt)`. The agent decides the next `ui_render`. No new work needed; verified by reading the wiring.

**Mode boundary (work item 3).** Untouched: stub keeps `SCENES`/`playScene` (zero network); stream drives acts from chunks. No merged untyped path. `NEXT_PUBLIC_AGENT_ROOM_MODE` flag intact.

**Seed + prompt (minimal, operator-chosen).** `seed-agent-room.ts`: added `gesture_at` (INT-04) + `suggest_chips` (INT-05) TOOL_SEEDS + room-host ASSIGNMENTS (order 8/9), and **fixed `render_reality_check_beat` → `render_beat`** (INT-01 renamed the *registered* handler but the seed name — which the model calls, dispatched by name — was never updated → beat rendering would 404 the handler live). `room-host.md`: renamed the beat tool to `render_beat` (4 refs), added a `suggest_chips` "Suggestion tool" subsection + a **Discuss transition chips** block (Guide→Discuss consent chips *Yes, talk it through* / *Stay on the guided path*; post-readback *Talk through what this means for us*) with the "until INT-10 plumbs phase, treat consent as ordinary canon-bounded Q&A" note.

**⚠️ OPEN ITEM — pre-existing seed/prompt OLD-vocab drift (a dedicated reconciliation slice).** The seed/prompt layer is a different design generation than the INT-01..04 registered render tools, and was never reconciled:

- `room-host.md` §4/§9 still names `show_field_guide_signup` / `show_enrollment` (free/paid capture) — these are **not registered tools**; the live capture tool is `show_capture { kind }`. Capture wiring is INT-09 anyway.
- The INT-01 Ink Band screens (`show_home`, `show_safety`, `show_confirm`, `show_leader`, `show_about`, `show_contact`, `show_faq`, `show_capture`) are **registered** but **unseeded** → the host can't show them live despite INT-01's "the agent may now show any of these by name."
- The prompt references a `HOST_SCENES` scene layer (`scripts/seed-data/scenes/room-scenes.ts`) whose tool/scene vocabulary predates INT-01.
- **None of this is live-verifiable now** (engine down → INT-07). A follow-up slice should reconcile `TOOL_SEEDS`/`ASSIGNMENTS` + `room-host.md` + `room-scenes.ts` to `render-tools.tool.ts` as the SSOT.

**Verification.** Engine `pnpm typecheck` ✅ (incl. seed script) · UI `pnpm typecheck` ✅ · engine `ui-render.test.ts` ✅ 11/11 (+3 suggest) · `agent-runner.test.ts` ✅ 23/23 · UI lint ✅ 0 problems in touched files · stub `/agent` HTTP 200, `ink-band-surface`, **0** stream-endpoint refs. **Live full turn unverified** (engine down → INT-07).
