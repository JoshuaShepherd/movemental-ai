# INT-08 — Discuss phase foundation + Model B layout

**Prompt ID:** INT-08
**Target agent:** Cursor / Claude Code
**Primary repo:** `movemental-ai`
**Blocks:** AF-12 complete ✅
**Status:** Done ✅ (Model B foundation; UI-only, flag-gated; live headless-verified)
**Last updated:** 2026-06-10

**Design authority:** [agent-room-long-form-discussion-ui.md](../../notes/agent-room-long-form-discussion-ui.md) — **Model B (“mark up one document”)** is the ratified layout. Do not implement Model A (shrink-the-screen / pin-plus-transcript).

---

## 1. Role and stance

Add the **Guide → Discuss** phase to the room controller and build the **Model B** UI shell: dominant screen preserved, expandable voice band, sheet marginalia blocks, multi-line composer in Discuss. This is UI-only — **no new network**, no engine changes. Stub and stream hooks share the same `AgentRoomController` extensions so `AgentRoomView` stays mode-agnostic (AF-01 ADR).

Skills: **`responsive-audit`**, **`typography-polish`**.

---

## 2. Goal

1. `RoomPhase`: `"guide" | "discuss"` on both `useAgentRoomStub` and `useAgentRoomStream`.
2. `transcript: TranscriptTurn[]` + `discussTurnCount` (agent turns in Discuss; drives turn-cap nudge in INT-09/INT-05).
3. Model B layout in Discuss (screen stays ~dominant; voice band grows; marginalia on sheet).
4. Feature flag (`NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1` or internal constant) so Discuss UI can ship before stream policy (INT-05/INT-10).

---

## 3. Model B layout (build exactly this)

```text
Guide (today)                     Discuss (Model B)
─────────────────                 ─────────────────────────────────
screen  ~70% flex                 screen  ~70% flex (.scroll on)
voice   ~1–2 lines, ~4.7rem min   voice  3–5 lines, ~8–10rem max; tap expands recent history
composer single-line + chips      composer textarea + 0–2 contextual chips
sheet   one screen composition    sheet = screen + appended marginalia below fold
```

**Do not:** compact the screen to a pin; collapse the voice band to zero; render a two-column bubble chat.

### 3.1 Voice band (Discuss)

- Expand `InkVoice` visibility from 2 → **3–5** lines; older lines use existing `.old` fade.
- **Tap-to-expand:** drawer showing last ~3 agent utterances (Caveat only — not full scrollback dump).
- Latest line keeps write-on nib animation (stub + stream).

### 3.2 Sheet marginalia (Discuss)

New components under `components/agent-room/discuss/` (or co-located with stub screens):

| Block | Typography | Behavior |
| --- | --- | --- |
| Visitor turn | Inter, left hairline `--margin-red` at low opacity | Appended below active screen content on submit |
| Agent passage (long) | Body on paper; latest gets ink write-on | Appended when content exceeds voice-band capacity (stream: INT-03 routes; stub: manual test data) |
| Fold on exit Discuss | Collapsible “What we discussed” at sheet bottom | §6.2 motion in design note |

### 3.3 Composer (Discuss)

- `<textarea>` auto-grow, 2–6 rows; placeholder “Say as much as you need…”
- Send: → or ⌘/Ctrl+Enter; Shift+Enter newline.
- Replay confirm when `phase === "discuss"`.

### 3.4 Motion

- Guide → Discuss: voice band height eases open; composer cross-fades to textarea; **no screen shrink**.
- Honor `prefers-reduced-motion`: instant swap.

---

## 4. Controller API (both hooks)

```ts
type RoomPhase = "guide" | "discuss";

type TranscriptTurn = {
  role: "user" | "assistant";
  content: string;
  surface?: "voice" | "margin" | "passage" | "capture";
};

// Extend AgentRoomController return:
phase: RoomPhase;
discussTurnCount: number;
enterDiscuss: (reason?: "user" | "agent" | "post-readback") => void;
exitDiscuss: () => void;
transcript: TranscriptTurn[];
```

- Guide: keep ephemeral `voiceLines` + ink queue.
- `enterDiscuss`: seed `transcript` from recent voice history; set `phase`; apply `.discuss` on sheet.
- Stub: `enterDiscuss` may be triggered from scenes/chips (INT-09); no LLM multi-turn.

---

## 5. Implicit transition offers (UI only — logic in INT-09)

Primary implicit signals (offer consent chips — **never** auto-morph):

1. Meta / objection / hypothetical question patterns.
2. Third consecutive free-text turn without chip tap.
3. Repeated router fallback.

**Weak secondary only:** message length ~120+ chars (people paste — never trigger alone).

Consent copy (design note §4.2):

> *“This sounds specific enough to talk through properly. Want to switch to open conversation? The path we mapped stays on the page.”*

Chips: **Yes, talk it through** · **Stay on the guided path**

---

## 6. Definition of Done

- [x] `RoomPhase` + `transcript` + `discussTurnCount` on stub and stream hooks (shared `useDiscussPhase`); `AgentRoomView` shape compatible (additive optional props, Guide defaults).
- [x] Model B layout: dominant screen, expanded voice band, marginalia append, textarea composer in Discuss. *(headless: screen 397px ≫ voice 128px; 1 visitor margin + 2 passages; 1 textarea)*
- [x] Voice band tap-to-expand (last ~3 agent lines).
- [x] Guide phase visually identical to AF-12 sign-off. *(flag off → no discuss markup, no `undefined` class leak, 0 net)*
- [x] Feature flag (`NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1`) gates Discuss UI until operator enables.
- [x] Stub still **zero network**; stream hook compiles (live Discuss stream policy waits for INT-10).
- [x] `pnpm typecheck` + lint green; §10 + master runner updated.

---

## 7. Verification

- Toggle Discuss via dev flag + manual `enterDiscuss()`: layout matches Model B ASCII; voice band > Guide height; screen not shrunk.
- `exitDiscuss()` folds marginalia; Guide restore.
- Reduced motion: no height animation errors.
- Stub AF-12 flows unchanged with flag off.

---

## §10 Attempt log

### 2026-06-10 — Claude Code (Model B foundation, UI-only)

**Outcome:** ✅ Done. Model B ratified in the design note (revision 2026-06-10, §5.1). Guide → Discuss phase + Model B shell built, flag-gated, **headless-verified live** (9/9 layout assertions). No network, no engine changes.

**Flag:** `NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1` (`DISCUSS_ENABLED` in `lib/agent-room/discuss.ts`). Off → `enterDiscuss` no-ops, room can never leave Guide → AF-12-identical.

**Controller API (shared).** New `useDiscussPhase()` hook (`components/agent-room/use-discuss-phase.ts`) owns `phase` / `transcript` / `discussTurnCount` / `enterDiscuss(reason?)` / `exitDiscuss()` + internal `appendTranscript` / `resetDiscuss`. Both `useAgentRoomStub` and `useAgentRoomStream` spread the five public fields and call `resetDiscuss()` from their `reset`/`goHome`, so `AgentRoomController` is identical across modes. `AgentRoomView` gained optional `phase` / `transcript` / `onExitDiscuss` props (default `"guide"` / `[]`), so its shape stays Guide-compatible. `exitDiscuss` keeps the transcript (for the fold); `resetDiscuss` clears it.

**Types/contract.** `RoomPhase`, `TranscriptTurn { role, content, surface? }`, `DiscussReason` in `lib/agent-room/discuss.ts` (+ `DISCUSS_VOICE_LINES=5`, `DISCUSS_DRAWER_LINES=3`).

**Model B components** (`components/agent-room/discuss/`):

- `discuss-voice.tsx` — `DiscussVoice`: voice band grows to the recent 3–5 **assistant** transcript lines, reusing `InkVoice` (stable absolute-index ids → only the newest animates, older `settled`); tap-to-expand drawer (last 3, Caveat).
- `discuss-sheet.tsx` — `DiscussMarginalia` (visitor turns = Inter + `--margin-red` hairline left rule via `color-mix`; agent passages = body prose, latest `.settle`) appended inside `#sheet` below the screen; `DiscussFold` ("What we discussed", collapsible, Guide-only after a session).
- `discuss-composer.tsx` — `DiscussComposer`: auto-grow `<textarea>` (2–6 rows), Enter/⌘/Ctrl+Enter send, Shift+Enter newline, "Say as much as you need…", replay `window.confirm`, "↑ back to the guided path" → `exitDiscuss`.

**Layout wiring.** `AgentRoomView` adds `.discuss` to `.room`, forces `.scroll` on the screen, renders `DiscussMarginalia` in Discuss / `DiscussFold` in Guide inside `ScreenZone`, swaps `Composer`→`DiscussComposer`, and passes `phase`/`transcript` to `VoiceZone` (which branches to `DiscussVoice`). **Screen stays dominant** (no shrink-to-pin). CSS appended to `ink-band.module.css` (voice grow + transition, marginalia, fold, textarea field; `prefers-reduced-motion` disables the height ease + composer fade).

**Dev seam.** `window.__agentRoomDiscuss = { enter, exit, append }` (non-prod only) drives the phase + pushes transcript turns for manual/Playwright verification before the INT-09 triggers exist.

**Scope boundary.** INT-08 is the *foundation*: transition triggers (chips, implicit signals, sessionStorage, stub capture gate) are INT-09; live `text_delta`→passage routing + `phase` in POST are INT-10. The implicit-signal patterns (§5) and consent copy are documented here for INT-09 to wire.

**Verification.** UI `pnpm typecheck` ✅ · lint ✅ 0 in touched files · **flag off**: stub `/agent` 200, 0 stream refs, no discuss markup, no `undefined` class leak, no compile errors (Guide = AF-12). **Flag on (headless `@playwright/test`, cached chromium, dev seam):** `.discuss` room class · voiceDiscuss band grew 75→128px · screen dominant (397px ≫ voice) · 1 textarea in Discuss / 0 in Guide · marginalia (1 visitor + 2 passages) · tap-to-expand present · **0 network** in stub Discuss · `exitDiscuss` → fold + textarea gone. Reduced-motion handled in CSS (no JS height animation to error).

**Note (caching gotcha):** `NEXT_PUBLIC_*` is build-inlined; Turbopack reused the stale flag-off build on restart — had to `rm -rf .next` for the flag to take. First Playwright pass false-passed on the `discussFold` substring before the cache was cleared.
