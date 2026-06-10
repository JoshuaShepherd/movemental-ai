# INT-04 — `ink_gesture`: new chunk + render-tool (engine + client)

**Prompt ID:** INT-04
**Target agent:** Cursor / Claude Code
**Primary repos:** `movemental-ai-agents` + `movemental-ai` (cross-repo)
**Blocks:** INT-00
**Status:** Done ✅ (live turn deferred → INT-07)
**Last updated:** 2026-06-10

---

## 1. Role and stance

Give the agent the **gesture** act. The Ink Band runner draws `underline | circle | arrow` over a target selector; the stream has **no `ink_gesture` chunk** today. Add it end-to-end: an engine render-tool that emits the chunk, the chunk in both contracts, and a client handler that calls the existing `drawGesture(kind, target)`.

---

## 2. Load-bearing facts

- **Client gesture API already exists** (AF-04): `drawGesture(kind, target)` on the ink context; `ink/use-ink-gestures.ts` + `gesture-paths.ts` own the SVG math. `GestureKind = "underline" | "circle" | "arrow"`.
- **Targets are selectors the screens expose:** `#phrase` (home), `#opts` / `[data-oi="N"]` (beat), `#hereStage` / `#rbphrase` (readback), **`#capture`** (capture form-cell, INT-02/INT-09). In Discuss, gestures target the **dominant sheet** (Model B — screen not shrunk). Any new target must be a stable id/attr on the rendered screen.
- **Chunk union today** (`stream-chunk.ts`) has no gesture variant. Engine `StreamChunk` (`ai/types.ts`) likewise.

---

## 3. Work

1. **Engine** — add an `ink_gesture` chunk to `ai/types.ts`: `{ type: "ink_gesture", kind: "underline"|"circle"|"arrow", target: string }`. Add a render-tool (`render-tools.tool.ts`) the agent calls to emit it, with a **target allow-list** (only selectors the current screen exposes) so the agent can't point at nothing.
2. **Client** — add the matching variant to `streamChunkSchema`; in the stream hook's `drain()` switch, `case "ink_gesture": drawGesture(ch.kind, ch.target)`.
3. **Sequencing** — gestures must fire **after** the target screen mounts. Honor ordering: a gesture chunk after its `ui_render`. If the agent can emit out of order, queue the gesture until the target exists (small retry/raf, mirroring the stub runner's act order).
4. **Reduced motion** — gestures already instant-complete client-side (AF-04); no engine change needed.

---

## 4. Definition of Done

- [x] `ink_gesture` chunk in **both** `ai/types.ts` and `stream-chunk.ts` (mirror in sync).
- [x] Engine render-tool emits gestures with a per-screen target allow-list.
- [x] Client draws the gesture via `drawGesture`; targeting a missing selector is a safe no-op (no throw).
- [x] Gesture fires after its screen mounts (ordering/queue handled — bounded rAF poll in `resolveTarget`).
- [x] Stub gestures unchanged; no network added to the stub path. *(Stub `/agent` 200; full live-trace re-confirm → INT-07.)*
- [x] `pnpm typecheck` green in both repos; engine tool tests green; §10 + master runner updated.

---

## 5. Verification

- Live turn: agent shows `beat` then gestures `arrow` at `#opts` → arrow draws on the beat screen.
- Gesture at a non-existent selector → no crash, logged no-op.
- Reduced motion: gesture instant.

---

## §10 Attempt log

### 2026-06-10 — Claude Code — Done ✅ (no commit, operator-gated)

**Chunk shape.** Added `{ type: "ink_gesture"; kind: "underline"|"circle"|"arrow"; target: string }` to the `StreamChunk` union in **both** repos — engine `ai/types.ts` and client `stream-chunk.ts` (`z.enum` kind + `z.string` target). Mirror verified in sync.

**Engine emit path.** New `defineInkGestureTool({ name, allow })` in `ui-render.ts`, parallel to `defineRenderTool`. It builds a Zod schema `{ screen: enum(allow keys), kind: enum(GESTURE_KINDS), target: string }` and a handler that:

- blocks invalid input / unknown screen / disallowed target → reuses the `__uiRenderError` envelope (→ `error` chunk; `component` field is unread on the error path, set to the parsed screen or a neutral sentinel),
- on success emits a new `__inkGesture` envelope. `interpretToolOutput` gained a `gesture` `ToolOutcome` branch (→ `ink_gesture` chunk + `{ gestured }` model ack); `toolResultContentForModel` already routes non-plain outcomes through `modelAck`. `agent-runner.ts` `uiRenderChunksFor` now yields on `kind === "gesture"` too, so the chunk streams from all three provider tool-result branches.

**Allow-list (per-screen).** One tool `gesture_at` registered in `render-tools.tool.ts` with `GESTURE_TARGETS`: `home→[#phrase]`, `beat→[#opts, /^\[data-oi="\d+"\]$/]`, `readback→[#hereStage, #rbphrase]`, `capture→[#capture]`. Selectors confirmed against the live stub screens (`opening-hero`/`home`, `beat-screen`, `readback-screen`, `capture-screen`). Screens with no gesture target are simply absent from the map (→ blocked). RegExp entries cover the `[data-oi="N"]` option-chip family.

**Ordering / queue.** Handled at the DOM source: `drawGesture` in `use-ink-gestures.ts` now resolves its target via `resolveTarget`, which polls `sheet.querySelector(target)` for up to 20 rAFs before giving up. A live `ink_gesture` can arrive in the same drain batch as the `ui_render` that mounts its target (and the screen remounts on a new key), so the element may not exist on frame 1; the poll waits it out, then no-ops on a stale/never-rendered target — never throws. Stub authored scenes find the element on frame 1, so no added delay on the happy path. The stream hook calls `void drawGesture(ch.kind, ch.target)` in `drain()` (fire-and-forget; never blocks the loop), pulling `drawGesture` from the shared `useInk()` (the stream hook is only mounted inside `AgentRoomProvider`).

**Reduced motion.** Unchanged — `drawPath` already instant-completes under `prefers-reduced-motion` (AF-04); no engine change.

**Cross-repo sync.** Both sides landed in this prompt. Contract mirror green.

**Verification.** UI `pnpm typecheck` ✅ · engine `pnpm typecheck` ✅ · engine `pnpm test:run` 151/151 ✅ (incl. `ui-render.test.ts` 8/8 — 4 new gesture-gate tests: allowed target, RegExp family, disallowed target, unknown screen) · client lint clean on touched files ✅ · stub `/agent` HTTP 200, `.ink-band-surface` present, no fetch added to stub path ✅. **Engine lint** not configured (interactive `next lint` setup — engine verified via typecheck + tests, per prior INT prompts). **Live agent turn (arrow at `#opts`) unverified** — engine down (INT-00 baseline) → deferred to INT-07.

**Note.** `use-agent-room-stream.ts` was concurrently extended by INT-03 (text_delta → ink voice). The `ink_gesture` case integrated cleanly into that evolved `drain()`; combined-state typecheck green.

**DoD:**

- [x] `ink_gesture` chunk in both `ai/types.ts` and `stream-chunk.ts` (mirror in sync).
- [x] Engine render-tool emits gestures with a per-screen target allow-list.
- [x] Client draws via `drawGesture`; missing selector = safe no-op (no throw).
- [x] Gesture fires after its screen mounts (bounded rAF poll in `resolveTarget`).
- [x] Stub gestures unchanged; no network added to the stub path.
- [x] `pnpm typecheck` green both repos; engine tool tests green; §10 + master runner updated.
