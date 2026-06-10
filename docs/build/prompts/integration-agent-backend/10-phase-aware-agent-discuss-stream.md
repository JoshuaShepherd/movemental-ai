# INT-10 — Phase-aware agent + Discuss stream behavior

**Prompt ID:** INT-10
**Target agent:** Cursor / Claude Code
**Primary repos:** `movemental-ai-agents` + `movemental-ai` (cross-repo)
**Blocks:** INT-03, INT-05, INT-08, INT-09
**Status:** Done ✅ (Option A wired end-to-end; live stream pending engine — INT-07)
**Last updated:** 2026-06-10

**Design authority:** [agent-room-long-form-discussion-ui.md](../../notes/agent-room-long-form-discussion-ui.md) §7 (Option A committed), §7.3.

---

## 1. Role and stance

Make **stream mode** respect `RoomPhase` end-to-end: client sends `phase` on every POST; room-host gets a **phase-aware prompt block** when `phase === "discuss"` (**Option A — ship first**). Do **not** add a `room-discuss` handoff agent yet (Option B — document as future refactor when Discuss volume justifies it).

Pair with INT-03 (voice + sheet routing) and INT-05 (suggest chips) so Discuss is live multi-turn, not a textarea talking to a beat-script host.

---

## 2. Option A deliverables (committed)

### 2.1 Proxy + client POST body

Extend `/api/agent-room/stream` request schema:

```json
{
  "message": "…",
  "sessionId": "…",
  "anonId": "…",
  "history": [ … ],
  "phase": "guide" | "discuss"
}
```

Forward `phase` to engine. Default `"guide"` when omitted (backward compatible).

Stream hook: pass `room.phase` on every `sendMessage`.

### 2.2 Engine — phase-aware prompt block

Append to `room-host.md` (or inject at runtime) when `phase === "discuss"`:

- Closed screens remain available but **optional** — prefer substantive prose.
- Still forbid fabricated pricing/path facts (honesty rail).
- **`capture` (`kind:'discuss'`)** when thread earned follow-up or `discussTurnCount` approaches cap (~6–8, tunable).
- `offer_human_handoff` for off-domain / escalated cases outside capture.
- Do **not** force `render_reality_check_beat` on every turn in Discuss.

Re-seed: `pnpm seed:agent-room` in `movemental-ai-agents` after prompt edit.

### 2.3 Discuss `text_delta` routing (extends INT-03)

When `phase === "discuss"`:

| Content | Destination |
| --- | --- |
| Short reply (fits voice band) | Caveat voice band (3–5 lines, INT-08) |
| Long reply | Voice band excerpt + **full passage** appended to sheet marginalia |
| Streaming | Growing ink in band; on turn complete, commit passage block if over threshold |

When `phase === "guide"`: INT-03 behavior unchanged (1–2 lines, ephemeral).

### 2.4 `suggest` chips for Discuss (extends INT-05)

| Phase | Chips |
| --- | --- |
| Guide | On-ramp + navigation (existing) |
| Discuss | 0–2 contextual (`Show safety on the wall`, `Summarize where we landed`) |
| Transition offer | **Yes, talk it through** · **Stay on the guided path** (client calls `enterDiscuss` on yes — not a network round-trip for the UI transition itself) |

**Do not** require `phase_offer` / `phase_enter` chunks for ship (Option B/later polish). `suggest` is sufficient.

### 2.5 Agent renders capture

Add render-tool / `ui_render` for **`capture`** with props `{ kind: "discuss" | "map" | "paid" | "free", … }` (align with INT-01 id + INT-02 adapter). Agent invokes near turn-cap or after substantive exchange.

---

## 3. Option B — documented later (do not implement)

Handoff to `room-discuss` agent (separate seed row, tools subset, trigger rule). Earn when Discuss volume and depth justify operational split. INT-10 must not block on Option B.

---

## 4. Stream contract — what ships in Option A

| Chunk / field | Ship in INT-10? |
| --- | --- |
| `phase` in POST | **Yes** |
| Phase-aware prompt block | **Yes** |
| `suggest` (INT-05) | **Yes** — Discuss transition + contextual |
| `text_delta` → band + sheet (INT-03) | **Yes** when `phase === "discuss"` |
| `ui_render` → `capture` | **Yes** |
| `ink_gesture` → `#capture`, marginalia | **Yes** (INT-04) |
| `phase_offer` / `phase_enter` chunks | **No** — later |

---

## 5. Definition of Done

- [x] Client sends `phase`; proxy forwards; engine reads it. *(proxy-schema → proxy route → invoke schema → `RunParams.phase`)*
- [x] Discuss prompt block live (runtime-injected, no re-seed needed); Guide prompt unchanged. *(`DISCUSS_PROMPT_BLOCK` appended only when `phase==='discuss'`)*
- [x] Stream Discuss: multi-turn history works; voice band + sheet passages per Model B. *(headless: short→band, long→sheet passage, visitor→margin; live agent turn pending engine — INT-07)*
- [x] Agent can emit `capture` (`kind:'discuss'`) via `ui_render`. *(`show_capture` seeded to room-host; renders via INT-02 adapter)*
- [x] Turn-cap nudge renders capture (not `/contact` redirect). *(prompt block instructs `show_capture` near `DISCUSS_TURN_CAP`)*
- [x] Transition offer via `suggest` chips; client `enterDiscuss` on accept. *(`ENTER_DISCUSS_VALUE` sentinel → local `enterDiscuss`, no round-trip)*
- [x] Option B **not** implemented; noted in §10/§3.
- [x] Stub unchanged; **zero network** in stub. *(headless: 0 `/api/agent-room/stream` calls)*
- [x] `pnpm typecheck` both repos; tool tests green; §10 + master runner updated. *(seed re-run is an operator step — needs DB)*

---

## 6. Verification

- Stream: enter Discuss → multi-turn thread; long answer appears on sheet; short in band.
- Turn-cap triggers capture render on sheet.
- Guide stream: beat → readback flow still works (phase `guide`).
- Malformed `capture` props → voice carries turn, no crash.

---

## §10 Attempt log

### 2026-06-10 — Claude Code (Option A, end-to-end phase wiring)

**Outcome:** ✅ Done. `RoomPhase` now flows client → proxy → engine → prompt, and stream-mode Discuss is wired per Model B. **Option B (`room-discuss` handoff agent) was NOT implemented** — documented as the later refactor (§3), to be earned when Discuss volume justifies a second seed row + tool subset. The live agent turn is unverifiable this session (engine down → INT-07), as with every stream-side INT; everything is typecheck-/test-/headless-verified by construction.

**`phase` plumbing.** Client `proxy-schema.ts` + `app/api/agent-room/stream/route.ts` (forward `phase` in `upstreamBody`) → engine `agentsInvokeBodySchema` (`phase: z.enum(["guide","discuss"]).optional()`) → `stream/route.ts` passes `body.phase` → `RunParams.phase` (new `RoomPhase` type). Absent → `"guide"` (backward compatible). Stream hook sends `phaseRef.current` on every POST (a ref mirrors `discuss.phase` to dodge the async send loop's stale closure).

**Prompt block (location + strategy).** `DISCUSS_PROMPT_BLOCK` lives in `agent-runner.ts`; `withPhaseBlock(systemPrompt, phase)` appends it **only** when `phase==='discuss'`, as the LAST block (after the dynamic context) so the static Guide prefix-cache is untouched — handles both `string` and `ContentBlock[]` prompt shapes. **Runtime injection, not a static prompt edit**, so it works without a re-seed and Guide is byte-unchanged. `room-host.md` got a documentation note (Discuss section) for operator legibility; the runtime block is the operative control.

**Agent renders capture.** `show_capture` (props `{kind}`, registered since INT-01) was previously unseeded — added to `seed-agent-room.ts` TOOL_SEEDS + room-host ASSIGNMENTS (order 10). Re-seed (`pnpm seed:agent-room`) is an operator step (needs the DB) — flagged.

**Discuss `text_delta` routing (extends INT-03).** Stream hook, when `phase==='discuss'`: user turn → `appendTranscript({surface:'margin'})` at send; assistant turn at stream end → `appendTranscript({surface: len > DISCUSS_PASSAGE_THRESHOLD ? 'passage' : 'voice'})` then `clearVoice()` (drop the ephemeral ink). Guide turn-end unchanged (`commitStream`). **Passage threshold = `DISCUSS_PASSAGE_THRESHOLD` (180 chars)** in `discuss.ts`. `VoiceZone` discuss branch now also renders the live `StreamVoice` (growing ink) + thinking pulse during a turn; `DiscussMarginalia` filters to visitor turns + non-`voice` assistant turns (short replies stay band-only).

**Transition offer (extends INT-05).** `ENTER_DISCUSS_VALUE = "enter-discuss"` sentinel in `discuss.ts`; the stream `suggest` handler routes a chip with that value to `enterDiscuss("agent")` **locally** (no network round-trip — design §2.4) instead of `sendMessage`. `room-host.md`'s Guide→Discuss "Yes" chip now uses `value: "enter-discuss"` (kept in lockstep).

**turn-cap env key:** `NEXT_PUBLIC_AGENT_ROOM_DISCUSS_TURN_CAP` (`DISCUSS_TURN_CAP`, default 7) — set in INT-09, referenced by the prompt block.

**Verification.** Engine `pnpm typecheck` ✅ · UI `pnpm typecheck` ✅ · engine `agent-runner` + `ui-render` tests **34/34** ✅ · UI lint ✅ 0 in touched files. Headless `@playwright/test` (cached chromium, dev seam, flag on): stub `/agent` **0** `/api/agent-room/stream` calls · marginalia shows visitor + long passage, **excludes** short `voice` turn · short reply in the voice band · textarea composer present. **Live stream (phase POST → engine block → agent capture/suggest, multi-turn) unverified** — engine down (INT-07). Guide stream path untouched (phase defaults to guide; prompt block not appended).
