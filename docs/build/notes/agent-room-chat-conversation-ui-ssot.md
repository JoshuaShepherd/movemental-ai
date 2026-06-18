# Agent Room — chat & conversation UI (SSOT)

**Index:** [agent-room-documentation-index.md](./agent-room-documentation-index.md)

**Status:** Authoritative reference for how the Movemental concierge chat works in code — collapsed vs expanded dock, handwriting strip vs screen vs thread, Guide vs Discuss, and where to change behavior.

**Created:** 2026-06-17  
**Audience:** Engineers and external agents modifying the agent room via prompt. Read this before touching dock, voice, or transcript code.

**Scope:** Conversation presentation and input routing on `/agent` and `/agent/*` document surfaces. For engine topology, screen inventory, and capture APIs, see [agent-platform-complete-reference.md](./agent-platform-complete-reference.md). For Discuss product intent (historical), see [agent-room-long-form-discussion-ui.md](./agent-room-long-form-discussion-ui.md).

**Supersedes for chat UI:** Sections in [agent-home-dock-functionality-2026-06-15.md](./agent-home-dock-functionality-2026-06-15.md) and platform reference §4.3 that describe voice/thread split — this doc reflects the **shipped** wiring as of 2026-06-17.

---

## 0. Mental model (one paragraph)

The agent room is **not** a chat widget. It is a three-zone Ink Band surface — **mast**, **screen** (the manuscript sheet), and **agent dock** — where the concierge speaks through **handwriting** (Caveat ink in the collapsed strip) and/or a **conversation thread** (body prose in the expanded drawer). The **screen** shows structured product UI (home, beat, path, safety flow, …) driven by local choreography or engine `ui_render`. **Live LLM turns** stream over SSE; **local scenes** run with zero network. The dock is always **either collapsed or expanded**, never both; expanding hides the screen so conversation owns the viewport below the mast.

---

## 1. Where the chat lives

| Surface | Route(s) | Shell | Live agent? |
|--------|----------|-------|-------------|
| **Agent room (home)** | `/agent` (site root redirects here) | `AgentRoomShell` → `AgentRoom` → `AgentRoomView` | Yes (hybrid default) |
| **Document pages** | `/agent/nonprofits`, `/agent/churches`, `/agent/institutions`, `/agent/about`, `/agent/how-we-use-ai`, `/agent/movement-voices`, `/agent/invite`, `/agent/assessment`, deck routes | `DocumentPageShell` | No — composer **hands off** to `/agent?ask=…` |
| **Ask your AI button** | On some document CTAs | `AskAiPromptButton` | No — opens external providers |

Shared substrate: `src/app/agent/layout.tsx` wraps all `/agent/*` routes in `AgentRoomProvider` (ink + voice queue persists across navigation).

---

## 2. Component tree (room)

```
AgentRoomShell (hydration guard)
└─ AgentRoom (mode: hybrid | stub | stream)
   └─ AgentRoomView
      ├─ InkOverlay (SVG gesture layer)
      ├─ Mast
      ├─ ScreenZone                    ← hidden while dock expanded
      │  ├─ screenNode (HybridScreen | StubScreen | StreamScreen)
      │  └─ DiscussFold (Guide only, when transcript non-empty)
      └─ AgentDock                     ← collapsed OR expanded (never both)
```

**Key files**

| Layer | File |
|-------|------|
| Shell / mode dispatch | `src/components/agent-room/agent-room.tsx` |
| Dock (collapsed + expanded) | `src/components/agent-room/shell/agent-dock.tsx` |
| Handwriting (collapsed only) | `src/components/agent-room/shell/voice-zone.tsx` |
| Ink queue + stream line | `src/components/agent-room/agent-room-context.tsx`, `ink/use-ink-voice.ts`, `ink/ink-voice.tsx` |
| Room controllers | `use-agent-room-hybrid.ts`, `use-agent-room-stub.ts`, `use-agent-room-stream.ts` |
| Discuss state | `use-discuss-phase.ts`, `lib/agent-room/discuss.ts` |
| Thread rendering | `discuss/discuss-thread.tsx`, `discuss/passage-markdown.tsx` |
| Document handoff | `document/document-page-shell.tsx` |

---

## 3. Runtime modes

`NEXT_PUBLIC_AGENT_ROOM_MODE` → `src/lib/agent-room/mode.ts` (default: **`hybrid`**).

| Mode | Hook | Network | Chat behavior |
|------|------|---------|---------------|
| **hybrid** | `useAgentRoomHybrid` | SSE only when input classified **AGENT** | Script first; open conversation after expand / agent chip / unmatched text |
| **stub** | `useAgentRoomStub` | None | Typed input → regex scenes; Discuss flag on → stub capture, not real LLM |
| **stream** | `useAgentRoomStream` | Every composer action → SSE | **Deprecated (AU-20)** — env maps to hybrid unless `NEXT_PUBLIC_AGENT_ROOM_LEGACY_STREAM=1` |

All three expose the same `AgentRoomView` props shape (`phase`, `transcript`, `voice`, `isStreaming`, `onSay`, …).

---

## 4. Room phases: Guide vs Discuss

Defined in `src/lib/agent-room/discuss.ts`. Feature flag: `NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1` → `DISCUSS_ENABLED`.

| Phase | Default | Typed input | Transcript | Dock on enter |
|-------|---------|-------------|------------|---------------|
| **guide** | Yes | Regex / chips may run **local** scenes unless `chatActive` | Optional; shown in **DiscussFold** after a Discuss session | User-driven expand |
| **discuss** | No | Always **AGENT** (SSE) | `TranscriptTurn[]` via `useDiscussPhase` | **Forced expanded** (`agent-dock` effect) |

**Discuss entry** (`lib/agent-room/discuss-entry.ts`):

- Chip `toDiscuss` → `enterDiscuss(reason)`
- Agent suggest chip `value: "enter-discuss"` (`ENTER_DISCUSS_VALUE`) → local `enterDiscuss("agent")`, no network round-trip
- Implicit offer → local scene `discussOffer` (consent chips) when meta/objection / 3rd free-text / 2nd fallback (flag on, not on `beat` screen)

**Discuss exit:** `exitDiscuss()` returns to Guide but **keeps transcript** for `DiscussFold`. Full wipe on mast home / replay → `resetDiscuss()`.

---

## 5. The agent dock — collapsed vs expanded

`AgentDock` is the **only** composer on the room. Contract: **collapsed bar OR expanded conversation dialog — never both.**

### 5.1 Collapsed dock (default)

Rendered structure:

```
.handwritingStrip          ← VoiceZone (Caveat ink)
.floatChips                ← scene / agent suggestion chips
.agentCard
  ├─ composer form OR handbook capture
  └─ .cardHandle            ← tap to expand
```

- Single-line `#composer-input`, Send, Expand chat icon, drawer handle.
- Placeholder: `Type here, or tap a suggestion…` (beat screen: `BEAT_PLACEHOLDER`).
- **Handwriting strip** shows the agent’s live presence (see §6).
- Float chips sit above the composer card.

**Send behavior (`sendText`):**

1. Appends user line to `guideMessages` (Guide only).
2. Sets `chatEngaged = true`.
3. Calls `onSay` → controller `sendMessage`.
4. If dock was collapsed → **auto-expands** (`setExpandedState(true)`).

### 5.2 Expanded dock

Rendered structure:

```
.dockBackdrop              ← click to collapse
.agentCardExpanded (dialog)
  ├─ cardHeader ("Conversation" + collapse)
  ├─ cardThread
  │  ├─ Discuss: DiscussThread | WaysInPanel | stub capture
  │  └─ Guide: guideMessages thread | WaysInPanel | stub capture
  └─ composer footer (same ComposerForm as collapsed)
```

- **Screen zone unmounted** while expanded (`AgentRoomView`: `!dockExpanded` guard on `ScreenZone` children).
- `roomDockConversation` class on `.room` for layout.
- Escape, backdrop click, or collapse button restores sheet + collapsed dock.
- **Handwriting strip not mounted** in expanded branch — agent text must appear in the **thread** (§7).
- Empty thread → **Ways in** panel (`ways-in-doors.ts`): audience segments + curated door utterances.
- Active conversation → optional **Ways in** resummon button in composer footer.

### 5.3 State that drives expand/collapse

| State | Location | Effect |
|-------|----------|--------|
| `expanded` | `agent-dock.tsx` local | UI branch collapsed vs expanded |
| `dockExpanded` | `agent-room.tsx` local | Hides `ScreenZone`; synced via `onExpandedChange` |
| `chatEngaged` | `agent-dock.tsx` | User sent a message or expanded with intent |
| `conversationActiveRef` | hybrid controller | Bypasses `busy` gate; forces AGENT routing for typed text |
| `discuss` phase | `useDiscussPhase` | Auto-expands dock on enter |

**Auto-expand triggers:**

- User sends message (collapsed → expand).
- `liveText` or `liveThinking` while `chatEngaged` or Discuss (`useEffect` in dock).
- `EXPAND_CONVERSATION_EVENT` (`requestExpandConversation`) — used by agent-classified chips.
- `FOCUS_HANDBOOK_EMAIL_EVENT` — handbook capture.
- Enter Discuss phase.

**Reset on screen change:** `screenKey` change clears `guideMessages`, `chatEngaged`, `expanded`, composer value.

### 5.4 Busy / disabled gates

```ts
composerBusy = disabled && !expanded && !chatEngaged
```

- `disabled` ← `isStreaming` from controller (`isStreaming || busy` in hybrid).
- Opening choreography sets `busy` during `inkLine` animation.
- Input stays **focusable** while busy; send/chips gated unless `expanded || chatEngaged || bypassDisabled`.
- Once visitor engages conversation panel, `conversationActiveRef` allows sends during residual busy.

---

## 6. Handwriting strip (collapsed dock only)

`VoiceZone` in `voice-zone.tsx`, mounted only in the **collapsed** `AgentDock` return branch with `strip={true}`.

### 6.1 Ink layer (`useInkVoice`)

Two parallel mechanisms:

| Mechanism | API | Used for | Animation |
|-----------|-----|----------|-----------|
| **Queue** | `inkLine(text)` | Local `say` acts, committed stream lines | `VoiceLine` — nib write-on (single line ≤640px); `settled` lines show full width |
| **Stream** | `beginStream` / `appendStream` / `commitStream` | Live SSE `text_delta` | `StreamVoice` — growing tail; multiline wrap on long text |

Queue holds **at most 2 lines** (older `.old` faded). `commitStream()` moves active stream into queue as `settled: true`.

### 6.2 Guide phase (collapsed)

Priority in `VoiceZone`:

1. `error` → error line
2. `voiceLines` → `InkVoice` (local scripted lines)
3. `voiceStream` → `StreamVoice` (live deltas)
4. `voice.thinking` && !`voiceStream` → thinking pulse (+ optional `voice.note` tool label)
5. Fallback: `voice.text` as plain wrapped line if nothing else

### 6.3 Discuss phase (collapsed)

1. `DiscussVoice` — last `DISCUSS_VOICE_LINES` (5) assistant transcript lines as Caveat `InkVoice`
2. `voiceStream` — live turn (multiline)
3. Thinking pulse when waiting for first delta

Short assistant turns (`surface: "voice"`, ≤180 chars) stay **ephemeral in the band** — not in expanded thread filter (§8).

`hideLiveStream` prop exists on `VoiceZone` but is **not wired** from `AgentDock`; instead the expanded branch simply omits `VoiceZone`.

### 6.4 Write-on animation rules (`ink-voice.tsx`)

- Nib horizontal clip sweep requires **single non-wrapping line** and width > 640px.
- `multiline` or `prefers-reduced-motion` → full text immediately, no nib.
- Streamed / long agent replies use **multiline wrap** in strip and thread.
- Unmounting strip mid write-on calls `onDone` so opening choreography does not leave composer stuck disabled.

---

## 7. Conversation thread (expanded dock only)

When expanded, agent/user text renders in `cardThread` — **not** in the handwriting strip.

### 7.1 Guide phase thread

Local state in `agent-dock.tsx`: `guideMessages: { role, content, streaming? }[]`.

| Source | When |
|--------|------|
| User send | Appended on `sendText` |
| Agent streaming | `useEffect` syncs `liveText` into last agent message with `streaming: true` |
| Agent complete | Same effect clears `streaming` when `liveText` ends |
| `EXPAND_CONVERSATION_EVENT` | Pre-seeds user line from chip utterance |

**`liveText` pipeline** (`agent-room.tsx`):

```ts
liveText = isStreaming && voice.text && !hideLiveDuplicate ? voice.text : undefined
```

Guide mode: `hideLiveDuplicate` is false. Discuss mode: true when last assistant transcript content equals `voice.text` (prevents duplicate after turn commits).

**Duplicate prevention (Guide):**

- `guideMessages` holds streaming agent content (updated in `useEffect`).
- Separate `liveText` block renders **only** when `!liveTextInGuideMessages` (first frame before effect runs).
- After stream ends, `voice.text` fallback renders only if not already in `guideMessages`.

**Typography:** Agent bubbles use `AgentThreadProse` → `PassageMarkdown` (GFM: `**bold**`, lists, links). User bubbles stay plain `<p>`.

### 7.2 Discuss phase thread

`DiscussThread` with `compact` + default `showAllAssistant={false}`.

**Filter:** show user turns + assistant turns where `surface !== "voice"`. Short voice replies appear only in collapsed handwriting band, not thread.

| Role | Style | Content rendering |
|------|-------|-------------------|
| user | `marginUserCompact` (right-aligned bubble) | Plain text |
| assistant (passage) | `passageCompact` + `passageMarkdown` | `PassageMarkdown` |
| live stream | `liveInkCompact` + `AgentThreadProse` | Streaming turn until committed |

**Duplicate prevention (Discuss):**

- `liveDuplicatesTranscript` — skip `liveText` if it matches last shown assistant turn.
- Parent `hideLiveDuplicate` — suppress `liveText` prop when transcript already has same content as `voice.text`.

### 7.3 Thinking state in thread

`liveThinking={isStreaming && voice.thinking}` — pulse when waiting for first `text_delta` or during `agent_handoff` / tool work. Optional `liveThinkingNote` from engine tool activity (e.g. “searching the archive…”).

---

## 8. Discuss transcript routing (turn end)

Constants: `src/lib/agent-room/discuss.ts`

| Constant | Value | Meaning |
|----------|-------|---------|
| `DISCUSS_PASSAGE_THRESHOLD` | 180 chars | Assistant turn length boundary |
| `DISCUSS_TURN_CAP` | 7 (env override) | Soft cap before capture offer |
| `DISCUSS_VOICE_LINES` | 5 | Lines in collapsed Discuss voice band |
| `DISCUSS_DRAWER_LINES` | 3 | “Recent conversation” drawer in band |

**On user send (Discuss):** `appendTranscript({ role: "user", content, surface: "margin" })` — except retry.

**On assistant turn end** (`runAgentTurn` in hybrid/stream):

```ts
appendTranscript({
  role: "assistant",
  content: assistant,
  surface: assistant.length > DISCUSS_PASSAGE_THRESHOLD ? "passage" : "voice",
});
clearVoice();
setVoice({
  thinking: false,
  text: assistant.length <= DISCUSS_PASSAGE_THRESHOLD ? assistant : "",
});
```

**Guide turn end:** `commitStream()` + `setVoice({ text: assistant })` — full text in `voice.text` and ink queue.

**Persistence:** `useDiscussPhase` writes `phase` + `transcript` to `sessionStorage` for refresh survival.

---

## 9. Screen vs handwriting vs thread — decision matrix

Use this table when prompting changes (“show X here, not there”).

| Condition | Screen (sheet) | Handwriting strip | Expanded thread |
|-----------|----------------|-------------------|-----------------|
| Collapsed, Guide, local scene | ✅ Active screen | ✅ `say` / stream ink | ❌ Not mounted |
| Collapsed, Guide, agent streaming | ✅ Stays (unless `ui_render` swaps) | ✅ `voiceStream` / `voice.text` | ❌ |
| **Expanded**, any phase | ❌ **Unmounted** | ❌ **Unmounted** | ✅ Thread only |
| Discuss, assistant ≤180 chars | ✅ Visible when collapsed | ✅ DiscussVoice + stream | ❌ Filtered out of thread |
| Discuss, assistant >180 chars | ✅ When collapsed | Stream in band while live | ✅ Passage in thread |
| After Discuss → Guide | ✅ + `DiscussFold` | ✅ Normal Guide | ❌ unless user re-expands |
| Document page | ✅ Long-form doc | ✅ One `inkLine` voiceLine | Handoff to `/agent` |

**Engine `ui_render` during expanded chat:** Screen is hidden — visitor does not see sheet swaps until they collapse the dock. Controllers still update `screen` state; it appears on collapse.

---

## 10. Live agent turn lifecycle (SSE)

Path: `sendMessage` → `runAgentStreamTurn` → `POST /api/agent-room/turn` → `movemental-ai-agents`.

**Request carries:** `message`, `history`, `sessionId`, `anonId`, `phase` (`guide`|`discuss`), `roomContext` (screenId, lastScene, mapAnswersCount, …).

**Stream chunks** (`lib/agent-room/stream-chunk.ts`):

| Chunk | Client effect |
|-------|----------------|
| `text_delta` | `beginStream` + `appendStream`; `setVoice({ thinking: false, text: acc })` |
| `progress` (thinking) | `setVoice({ thinking: true })` |
| `tool_call` / activity | `voice.note` beside pulse |
| `agent_handoff` | `commitStream`; thinking until diagnostician speaks |
| `ui_render` | `applyAgentUiRender` → screen swap or engine-extra component |
| `ink_gesture` | `drawGesture` on sheet target |
| `suggest` | Agent float chips |
| `error` | Error voice / retryable stall |

**Hybrid classification** (`move-classifier.ts`) before network:

1. Discuss phase → AGENT  
2. `chatActive` (expanded / prior agent / `markConversationActive`) → AGENT  
3. Implicit Discuss offer → local `discussOffer`  
4. Regex (`route-input.ts`) → local scene if high-confidence  
5. Else → AGENT  

**Ways-in door text** from expanded panel sets `source: "ways-in"` — may still route locally if text matches a Ways-in utterance (not treated as `chatActive` bypass for those strings).

---

## 11. Float chips and expand handoff

Default opening chips (`composer.tsx` `DEFAULT_SUGGESTIONS`):

| Chip | Hybrid routing (`resolveChipRoute`, collapsed dock) |
|------|-----------------------------------------------------|
| Get a clear next AI step | **Local** `toSafetyFlow` |
| About Movemental | **Local** `whatIs` |
| What does it cost? | **Local** `cost` |
| Get in touch | **Local** `talkToUs` |

When the dock is **expanded**, the same opening labels route **agent** utterances (conversational ways-in context). Stream mode (`resolveStreamChipRoute`) keeps info chips on agent utterances.

Scene follow-up chips use `SuggestChip.to` → `run(scene)` when `isKnownScene`.

Agent `suggest` chips from SSE replace float chips; `ENTER_DISCUSS_VALUE` intercepted locally.

---

## 12. Typography and markdown

| Surface | Component | Markdown? |
|---------|-----------|-----------|
| Expanded Guide agent bubbles | `AgentThreadProse` | Yes — GFM via `react-markdown` + `remark-gfm` |
| Expanded Discuss passages / live | `PassageMarkdown` / `AgentThreadProse` | Yes |
| Collapsed handwriting (`InkVoice`, `StreamVoice`) | Plain `{text}` | **No** — preserves nib animation |
| Discuss voice band (`DiscussVoice`) | Plain text | No |
| User margin notes | Plain text | No |

Styles: `.passageMarkdown` in `ink-band.module.css` (`strong`, `em`, lists, `passageLink`).

**Rule for modifiers:** Full typography belongs on the **expanded reading surface**. Do not run `PassageMarkdown` on the Caveat write-on line without disabling or replacing the animation.

---

## 13. Document surfaces (`DocumentPageShell`)

Audience/about pages use a **lighter dock**:

- One-shot `inkLine(voiceLine)` on mount (page-specific Caveat line).
- Chips: scroll to section, `action: "scene"` → `/agent` + sessionStorage scene handoff, or `router.push('/agent?ask=…&from=segment')` for genuine chat.
- Composer `onSay` → always handoff URL; **no SSE on the document page**.
- Same `AgentDock` collapsed/expanded UX if user expands before navigating away.
- No `ScreenZone` / no beat / no Discuss transcript on document pages themselves.

---

## 14. Environment flags (chat-relevant)

| Variable | Default | Effect |
|----------|---------|--------|
| `NEXT_PUBLIC_AGENT_ROOM_MODE` | `hybrid` | stub / hybrid / stream |
| `NEXT_PUBLIC_AGENT_ROOM_DISCUSS` | off | `DISCUSS_ENABLED` — Discuss phase UI + routing |
| `NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP` | `7` | Discuss capture nudge threshold |
| `AI_AGENTS_BASE_URL` + service secret | — | Required for live SSE (server-side) |

---

## 15. Orphaned / unwired components (do not assume active)

These exist in `src/components/agent-room/discuss/` but are **not mounted** in `AgentRoomView` as of 2026-06-17:

| Component | Intended role | Shipped replacement |
|-----------|---------------|---------------------|
| `DiscussOverlay` | Full-screen Model C overlay | **Expanded `AgentDock`** dialog |
| `DiscussComposer` | Multi-line textarea in Discuss | **Same single-line `ComposerForm`** in expanded dock |
| `DiscussMarginalia` | Transcript on sheet during Discuss | **DiscussThread** in expanded dock only |

`DiscussFold` **is** wired — bottom of sheet in **Guide** phase when `transcript.length > 0`.

Older docs (`agent-room-long-form-discussion-ui.md`, `agent-room/README.md`) describe Model C overlay; **trust this SSOT** for runtime behavior.

---

## 16. Modification recipes (for prompt agents)

### Show agent reply only in thread when expanded (no double text)

- Do not add a second `liveText` render if `guideMessages` already has `streaming` agent content.
- Keep `liveTextInGuideMessages` / `liveDuplicatesTranscript` guards.
- Do not mount `VoiceZone` in expanded branch.

### Change when screen hides

- `AgentRoomView`: `!dockExpanded` condition on `ScreenZone` children.
- `dockExpanded` synced from `AgentDock` `onExpandedChange`.

### Force conversation routing for typed text

- Set `conversationActiveRef` via `markConversationActive` / expand dock / prior agent turn.
- Or enter Discuss phase.

### Change long vs short Discuss storage

- Adjust `DISCUSS_PASSAGE_THRESHOLD` in `discuss.ts`.
- Thread filter: `surface !== "voice"` in `DiscussThread`.

### Add markdown rendering to a new surface

- Reuse `AgentThreadProse` or `PassageMarkdown` + `.passageMarkdown` class.
- Do not apply to `InkVoice` / `StreamVoice` without accepting plain-text animation tradeoff.

### Wire sheet marginalia during Discuss

- Mount `DiscussMarginalia` inside `ScreenZone` when `phase === "discuss" && !dockExpanded` (currently not done).

### Change chip → agent vs local

- `lib/agent-room/composer-routing.ts` (`STREAM_CHIP_ROUTES`)
- Hybrid `suggest` callback in `use-agent-room-hybrid.ts`

---

## 17. Tests and verification

| Test | Path |
|------|------|
| Dock expand, chips, local vs agent | `tests/e2e/agent-home-dock.spec.ts` |
| Discuss flag | `tests/e2e/agent-room-discuss.spec.ts` |
| Engine probes | `tests/e2e/agent-room.spec.ts` (`RUN_AGENT_ROOM_EE=1`) |

Manual checks:

1. Collapsed agent stream → text in handwriting strip only.  
2. Expanded agent stream → text in thread only (no duplicate).  
3. `**name**` in expanded thread → bold typography, not literal asterisks.  
4. Collapse expanded dock → screen returns; voice in strip.  
5. Discuss long reply → passage in expanded thread; short reply in strip when collapsed.

---

## 18. Related documentation

| Doc | Use for |
|-----|---------|
| [agent-platform-complete-reference.md](./agent-platform-complete-reference.md) | End-to-end platform, screens, engine tools, capture |
| [agent-home-dock-functionality-2026-06-15.md](./agent-home-dock-functionality-2026-06-15.md) | Playwright checklist, 2026-06-15 chip parity fixes |
| [agent-room-long-form-discussion-ui.md](./agent-room-long-form-discussion-ui.md) | Product intent for Discuss (historical layout notes) |
| [agent-room-prompt-baseline.md](./agent-room-prompt-baseline.md) | Editing engine prompts (`room-host.md`) |
| `src/components/agent-room/README.md` | ADR migration history (may lag shipped UI) |
| `docs/design/INK_BAND_DESIGN_CHAIN.md` | Visual tokens and charter |

---

## 19. Changelog

| Date | Change |
|------|--------|
| 2026-06-17 | **Screen-first pill routing** — collapsed dock opening chips (About / Cost / Contact) → local scenes; expanded drawer keeps agent utterances; document chips gain `action: "scene"` handoff |
| 2026-06-17 | Initial SSOT — documents expanded/collapsed split, typography (`AgentThreadProse`), duplicate guards, unwired Discuss overlay vs shipped dock behavior |
