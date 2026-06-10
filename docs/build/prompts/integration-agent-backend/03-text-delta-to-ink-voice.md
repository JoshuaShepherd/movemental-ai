# INT-03 — `text_delta` → streaming ink voice

**Prompt ID:** INT-03
**Target agent:** Cursor / Claude Code
**Primary repo:** `movemental-ai`
**Blocks:** INT-00
**Status:** Done ✅ (Guide-phase; Discuss band/passage deferred to INT-08/INT-10)
**Last updated:** 2026-06-10

**Discuss:** [agent-room-long-form-discussion-ui.md](../../notes/agent-room-long-form-discussion-ui.md) Model B — when `phase === "discuss"`, voice band grows (3–5 lines); long replies also append as **sheet passages** (INT-08 + INT-10).

---

## 1. Role and stance

Make the ink voice (`ink/use-ink-voice.ts` + `ink-voice.tsx`) render **streaming** `text_delta` chunks with the same handwritten Caveat write-on it uses for a finished `say` line — without losing the stub's one-shot behavior.

In **Discuss** phase, extend voice to 3–5 visible lines (INT-08) and route overflow to sheet marginalia on turn commit (INT-10).

---

## 2. The mismatch

- **Stub `say`:** `inkLine(text)` gets a **complete** string and self-animates a clip-path write-on over a duration derived from `text.length` (prototype `dur = max(620, len*38)`).
- **Stream:** `text_delta` arrives incrementally; the final length is unknown until `done`. The current stream hook just accumulates into `voice.text` and the `VoiceZone` shows it (no ink write-on).

---

## 3. Work

1. Add a **streaming mode** to the ink voice: accept appended deltas and animate the *growing tail* (reveal new glyphs as they arrive) rather than animating a known-length line. Keep the nib + `.old` fade behaviors.
2. Decide line-commit policy (record in §10): treat one assistant turn as one ink line that grows, **or** commit on sentence boundaries (`.`/`?`/newline) into stacked lines. *Recommended:* one growing line per turn; commit to `.old` on the next `ui_render` or `agent_handoff` (matches the stub's "new screen clears the voice").
3. Wire the stream hook's `text_delta` branch to the ink voice API instead of plain `setVoice` text, so stream and stub share the same visual voice.
4. Preserve `progress.phase === "thinking"` → the calm pulse before the first delta (the stub has no thinking state; keep it stream-only).
5. **Reduced motion:** deltas append instantly (no per-glyph animation), mirroring the stub's collapse-to-0.
6. **Discuss routing (when `phase === "discuss"`):** stream to expanded voice band; on turn end, if content exceeds band capacity (threshold in §10), append full text as a **passage** block on the sheet. Guide phase: keep 1–2 line ephemeral behavior.

---

## 4. Definition of Done

- [x] A streamed turn writes in Caveat ink-blue with the nib, growing as deltas arrive. *(code/typecheck verified; live turn pending engine — INT-07)*
- [ ] Discuss phase: 3–5 line voice band + passage append for long turns (Guide unchanged). **Deferred to INT-08/INT-10** (no `phase` plumbed to client yet).
- [x] The stub's one-shot `say` is unchanged (same component, same look).
- [x] Thinking pulse shows before the first delta; clears on first token.
- [x] Reduced motion: instant text, no per-glyph animation.
- [x] Voice commits/clears on screen change consistently across modes.
- [x] `pnpm typecheck` + lint green; stub still **zero network**; §10 + master runner updated.

---

## 5. Verification

- `AGENT_ROOM_MODE=stream`: a multi-sentence reply writes on progressively; no layout jump; nib tracks the tail.
- `AGENT_ROOM_MODE=stub`: AF-12 opening/leader `say` lines identical to sign-off.
- Reduced-motion context: streamed text appears without animation, no errors.

---

## §10 Attempt log

### 2026-06-10 — Claude Code (Guide-phase streaming; Discuss deferred to INT-08/10)

**Outcome:** ✅ Done for the Guide-phase scope. Live `text_delta` now writes through the **same** Caveat ink voice the stub's `say` uses; thinking pulse + reduced-motion handled. Discuss 3–5 line band + passage append is **deferred to INT-08/INT-10** (the `phase` machinery / `RoomPhase` does not exist yet — INT-08 Not started — and the stream hook receives no `phase`, so there is nothing to branch on). Precedent: INT-02 shipped Done while deferring the capture sheet-append to INT-08.

**Line-commit policy (decided):** **one growing ink line per assistant turn.** First `text_delta` opens a streaming line (`beginStream`); subsequent deltas grow its tail (`appendStream(fullAccumulatedText)`). The line **commits to the queue** (settled, already-revealed) on the next `ui_render`, `agent_handoff`, or turn end (`commitStream`) — matching the prototype's "a new screen settles the voice." `clearVoice()` runs at send-start (fresh turn) and on `reset`/error. The committed queue stays ≤2 (prior line faded to `.old`).

**Ink-voice streaming API (new):** `use-ink-voice.ts` gains `stream: StreamLine | null` + `beginStream` / `appendStream` / `commitStream`; `VoiceLineItem` gains `settled?` (a finished stream line shows full, no re-animation). Exposed through `agent-room-context` `InkApi` (`voiceStream`, `beginStream`, `appendStream`, `commitStream`) so the stream hook and voice zone share one layer with the stub.

**Animation:** new `StreamVoiceLine` (in `ink-voice.tsx`) eases a revealed-width toward the text's **live** `scrollWidth` each frame (exponential approach + small floor), nib trailing the write head — so it tracks growth without restarting per delta (unlike `VoiceLine`, whose mount-time `useEffect` would replay the whole line). Reuses `.vline/.vspan/.nib` so the existing `prefers-reduced-motion` media query applies; `prefersReducedMotion()` also short-circuits the rAF (full text, no nib).

**Thinking pulse:** stream-only — rendered in `voice-zone.tsx` when `voice.thinking && !voiceStream` (the stub's `IDLE_VOICE` never sets `thinking`, so stub is unaffected). Shows before the first delta and again while the read-back composes (post-`agent_handoff`); committed lines fade via the new `InkVoice forceOld` prop while the pulse/stream is the focus.

**Stub parity:** stub path untouched — `voiceStream` null, `thinking` false, `forceOld` false → byte-identical render. `clearVoice` additionally clears the (always-null) stream: harmless.

**Files:** `ink/use-ink-voice.ts`, `ink/ink-voice.tsx` (+`StreamVoice` export), `agent-room-context.tsx`, `shell/voice-zone.tsx`, `use-agent-room-stream.ts`.

**Verification:** UI `pnpm typecheck` ✅ 0 err · `pnpm lint` ✅ 0 problems in touched files (all 27 repo errors are pre-existing in `_archive/`) · `screen-map.test.ts` ✅ 6/6 · stub `/agent` HTTP 200, `ink-band-surface` rendered, **0** `api/agent-room/stream` refs in markup, no compile errors. Engine UI-only → no engine typecheck. **Live streamed turn unverified** (engine down → INT-07), same as INT-02 — the growing-tail write-on is verified by code/typecheck, not yet by a real stream.

**Open items for downstream:** INT-08 adds `RoomPhase`; INT-10 plumbs `phase` into the POST + stream so this hook can branch Guide vs Discuss (expand band to 3–5 lines, append long turns as sheet passages). The streaming API here is shaped to support that without rework.
