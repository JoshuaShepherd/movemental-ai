# Agent home dock — how it works (2026-06-15)

Notes on the live `/agent` home experience after Playwright coverage in `tests/e2e/agent-home-dock.spec.ts`. The site root (`/`) redirects to `/agent`; the agent room **is** the home page.

---

## 1. Surface layout

| Zone | Role |
| ---- | ---- |
| **Mast** | Logo (home/replay), audience nav (Non-profits · Churches · Institutions), sign-in |
| **Screen** | Ink Band “sheet” — headline, leader band, or full screens (path, pricing, safety flow, beat, …) |
| **Handwriting strip** | Collapsed dock only — concierge ink line above the composer |
| **Float chips** | Quick utterances above the collapsed composer card |
| **Agent dock** | Collapsed composer **or** expanded `Agent conversation` dialog (modal sheet from bottom) |

Mode default: **`hybrid`** (`NEXT_PUBLIC_AGENT_ROOM_MODE`, unset → hybrid). Alternatives: `stub` (offline scenes only), `stream` (legacy full-AI).

---

## 2. Opening choreography (every visit)

1. `SCENES.opening` runs locally — **no network**.
2. Screen → `home` (centered headline + leader carousel).
3. Concierge voice: *“I'm the Movemental Concierge…”* (`CONCIERGE_VOICE.openingGreeting`).
4. Ink gesture on `#phrase`.
5. Float chips appear (see §4).

While a scene is `busy`, send/chips are disabled but the **input stays focusable** (typing can start during the short opening beat).

---

## 3. Composer and conversation dock

### Collapsed (default)

- Single-line `#composer-input`, Send, Expand chat, drawer handle.
- Placeholder: `Type here, or tap a suggestion…`
- Submitting text expands the dock and adds the user line to the thread.

### Expanded

- Full-height dialog: thread + composer footer.
- **Stage sheet is hidden** while expanded (`dockExpanded` → screen zone unmounted) so conversation owns the viewport below the mast.
- **Ways in** panel when no thread yet: audience segments + curated doors (`ways-in-doors.ts`).
- Escape or backdrop/collapse returns to collapsed dock and restores the sheet.

### Conversation vs sheet

| Signal | Behavior |
| ------ | -------- |
| First collapsed typed message matching a **local regex** | Sheet swaps (e.g. “whole path” → path screen); dock may stay collapsed |
| Expanded dock, or second+ message (`chatEngaged`), or agent-classified chip | `conversationActive` → typed text goes to **live agent** (`POST /api/agent-room/turn`) |
| Lead chip “Get a clear next AI step” | Always **local** `toSafetyFlow` (screen + voice, no agent) |
| Scene follow-up chips (e.g. “Show me Safety”) | Local `SCENES` runner → sheet swap |

Agent replies in expanded mode render in the **thread** (live stream + committed `voice.text`). Collapsed mode still shows the reply in the handwriting strip.

---

## 4. Default float chips (opening)

| Chip | Hybrid (default, after 2026-06-15) | Stream mode |
| ---- | ------------------------------------ | ----------- |
| **Get a clear next AI step** | Local `toSafetyFlow` → safety diagnostic sheet | Same (local) |
| **About Movemental** | Agent utterance → expand dock + SSE turn | Agent utterance |
| **What does it cost?** | Agent utterance → expand dock + SSE turn | Agent utterance |
| **Get in touch** | Agent utterance → expand dock + SSE turn | Agent utterance |

Before this alignment, hybrid routed About / Cost / Contact chips to **full screens** (`whatIs`, `pricing`, `contact`) — the “screen takeover” users reported for pricing.

Scene-specific chips (after navigating a sheet) still use `SuggestChip.to` → local scenes when the label is **not** in `STREAM_CHIP_ROUTES` (`composer-routing.ts`).

---

## 5. Typed-input routing (hybrid)

Order (`route-input.ts` + `move-classifier.ts`):

1. **Discuss phase** → always agent.
2. **`chatActive`** (expanded dock, prior agent turn, or `markConversationActive`) → always agent.
3. Meta/objection streak → local `discussOffer` (if `NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1`).
4. Regex table → local scene (`cost`, `toSafety`, `toPath`, `whatIs`, …).
5. Unmatched → agent (`open_text`).

**Gotcha:** regex includes `about` — phrases like “question **about** donors” match `whatIs` locally on the **first** collapsed message. Prefer chips or expand the dock first for free-form chat.

---

## 6. Live agent path

```
Composer / chip (agent-classified)
  → useAgentRoomHybrid.sendMessage
  → classifyTypedInput → agent
  → runAgentStreamTurn
  → POST /api/agent-room/turn  (SSE)
  → movemental-ai-agents engine (when AI_AGENTS_BASE_URL + secret configured)
```

Stream chunks: `text_delta`, `progress`, `ui_render` (beat/readback/…), `suggest`, `ink_gesture`, `error`. UI render can still swap sheets (e.g. engine sends `beat`).

Without engine env: 503 / retryable stall messaging (`CONCIERGE_VOICE.stallRecovery`).

---

## 7. Screens the agent can open (local choreography)

| Screen id | Typical entry |
| --------- | ------------- |
| `home` | Opening / mast home |
| `path` | Regex / “See the whole path” chip |
| `pricing` | Regex `cost|price|…` (typed, first message) |
| `about` | Regex `about|movemental|…` |
| `faq`, `founders`, `contact` | Regex or chips |
| `safety`, `sandbox`, `training`, `technology` | Path stage chips |
| `beat` | “Map where we actually stand” / diagnostic |
| `safetyFlow` | Lead chip or cold on-ramp |
| Engine `ui_render` | Live agent tool (e.g. `beat`, `readback`) |

Full-screen sheets scroll behind the dock padding; long content uses `.screen.scroll`.

---

## 8. Discuss mode (optional)

`NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1` (default off). When on:

- “Yes, talk it through” / meta-objection offer → **Discuss** phase.
- Every typed turn → agent; transcript as marginalia (`DiscussThread`).
- Cap ~7 assistant turns then handoff chips.

---

## 9. Deep links

`/agent?ask=…&from=nonprofits|churches|institutions` — stashes audience for Ways in, clears URL, sends first turn after opening settles.

---

## 10. Playwright coverage (`tests/e2e/agent-home-dock.spec.ts`)

| Test | What it proves |
| ---- | -------------- |
| Composer typing after opening | Input enabled and holds text |
| Typed fallback expands dock | Unmatched text → dialog + mocked agent reply |
| Lead chip | Local safety flow, zero `/turn` calls |
| Cost / About chips | Dialog + agent reply; **no** pricing/about sheet |
| Typed “whole path” | Local path sheet |
| Path → “Show me Safety” chip | Scene follow-up still local |
| Expand drawer | Ways in prompt |
| Mast home | Replay returns to opening |

Run: `pnpm test:e2e tests/e2e/agent-home-dock.spec.ts` (starts dev server unless `PLAYWRIGHT_BASE_URL` is set).

Related: `tests/e2e/agent-room.spec.ts` (gated `RUN_AGENT_ROOM_EE=1`) for stream/stub/hybrid engine probes.

---

## 11. Fixes shipped with this audit (2026-06-15)

1. **Typing blocked** — input no longer `disabled` during `busy`/streaming (send/chips still gated).
2. **Pricing/about chips** — hybrid default chips use `STREAM_CHIP_ROUTES` → agent + expand dock (parity with stream mode).
3. **Expand on agent chip** — `requestExpandConversation(utterance)` adds user line and opens dialog.
4. **Thread shows agent text** — expanded dock reads `liveText` + `voice.text` when handwriting strip is hidden.

---

## 12. Operator checklist

- [ ] `AI_AGENTS_BASE_URL` + service secret for live turns
- [ ] `pnpm test:e2e tests/e2e/agent-home-dock.spec.ts` green
- [ ] Spot-check: cost chip → conversation, not pricing sheet
- [ ] Spot-check: lead chip → safety flow sheet (screen visible when dock collapsed)

---

## Related docs

- **[agent-room-chat-conversation-ui-ssot.md](./agent-room-chat-conversation-ui-ssot.md)** — **SSOT** for collapsed vs expanded dock, handwriting vs thread, Guide vs Discuss, typography, duplicate prevention
- **[agent-platform-complete-reference.md](./agent-platform-complete-reference.md)** — full platform SSOT (screens, tools, routing, engine, gaps)
- `docs/build/notes/home-page-ctas-capture-and-ai-engagement.md` — older hybrid/discuss summary (partially superseded by dock UX)
- `docs/build/notes/agent-room-suggestion-pills-inventory-and-recommendations.md` — chip inventory
- `src/lib/agent-room/composer-routing.ts` — PAR-02 chip routing SSOT
- `src/lib/agent-room/move-classifier.ts` — local vs agent classifier
