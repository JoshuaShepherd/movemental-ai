# INT-00 — Preflight: engine reachability + contract-drift baseline

**Prompt ID:** INT-00
**Target agent:** Cursor / Claude Code
**Primary repos:** `movemental-ai` (read) + `movemental-ai-agents` (read)
**Blocks:** none (run first)
**Status:** Not started
**Last updated:** 2026-06-10

---

## 1. Role and stance

You are an **integration auditor**. This session is **read-only** except for updating [`master_runner.md`](./master_runner.md) and this file's **§10**. Establish a green/amber/red baseline before any wiring. Do not edit code.

Read first: [AF-90](../migration-agentic-front-end/90-deferred-agent-backend-integration.md), the [AF-01 ADR](../../../src/components/agent-room/README.md), [agent-room-long-form-discussion-ui.md](../../notes/agent-room-long-form-discussion-ui.md) (Discuss / Model B), and `movemental-agentic-front-end/docs/notes/intent-and-migration.md`.

---

## 2. Goal

A dated baseline in **§10** answering:

1. Is the engine reachable, and what does a real stream look like? (env present, proxy 200, a captured chunk sequence for one turn.)
2. Where do the two contracts drift **today** — client `stream-chunk.ts` / `component-props.ts` vs engine `src/lib/ai/types.ts` / `src/lib/tools/render-tools.tool.ts`?
3. What is the exact id gap — engine `ComponentId` (8) vs Ink Band `ScreenId` (12)?
4. Which acts have **no** chunk yet (`gesture`, `suggest`)?
5. Per-phase risk notes for INT-01…INT-10.
6. **Discuss baseline:** Is `phase` in the stream POST today? Does a `capture` component / `submitLead` seam exist? Is `RoomPhase` in the client hooks?

---

## 3. Load-bearing facts (verify, don't trust)

- **Client stream contract:** `src/lib/agent-room/stream-chunk.ts` — `StreamChunk` union: `text_delta`, `tool_call`, `tool_result`, `agent_handoff`, `ui_render`, `done`, `progress`, `error`. **No `ink_gesture`, no `suggest`.**
- **Client ComponentId (8):** `reality_check_beat`, `readback`, `path`, `pricing`, `network`, `audience`, `founders`, `handoff_human`.
- **Ink Band ScreenId (12):** `home`, `beat`, `readback`, `safety`, `confirm`, `path`, `founders`, `leader`, `about`, `contact`, `pricing`, `faq` (`src/lib/agent-room/acts.ts`).
- **Prop schemas:** `src/lib/agent-room/component-props.ts` (`reality_check_beat`, `readback`, `handoff_human` typed; the rest `emptyProps`).
- **Proxy:** `src/app/api/agent-room/stream/route.ts` → engine `${AI_AGENTS_BASE_URL}/api/agents/stream`, injecting `AI_AGENTS_TENANT_ORG_ID` + `Bearer AI_AGENTS_SERVICE_SECRET`. 503 if any of the three env vars is missing.
- **Engine source of truth:** `movemental-ai-agents/src/lib/ai/types.ts`, `src/lib/tools/render-tools.tool.ts`, `src/lib/ai/runtime/ui-render.ts`, `agent-runner.ts`.

---

## 4. Procedure

```bash
# UI side
pnpm check:env | grep -i AI_AGENTS         # are the three keys present?
pnpm typecheck                              # clean baseline

# capture a real stream (engine must be up); inspect the chunk sequence
curl -N -X POST http://localhost:3000/api/agent-room/stream \
  -H 'Content-Type: application/json' \
  -d '{"message":"map where we stand","sessionId":"int00","anonId":"int00"}' | head -40
```

- Diff the **component id list** and the **chunk union** in both repos; produce a drift table.
- Note every `ui_render.component` the engine can emit and whether the client renders it.
- If the engine is **not** reachable, record that as the top blocker (INT-01–INT-06 can still be *authored/coded*, but only INT-07 strictly needs a live engine; flag which steps can be done contract-first vs. live).

---

## 5. Definition of Done

- [x] Env/reachability status captured (env present; both servers down → live trace recorded as the INT-07 blocker).
- [x] Contract-drift table (client vs engine) for chunk union **and** component ids — both in sync; `.strict()`↔`.passthrough()` drift noted.
- [x] Id gap table: which `ScreenId`s have no engine component, which `ComponentId`s have no Ink Band screen.
- [x] Missing-act table: `gesture` / `suggest` have no chunk → INT-04 / INT-05 scope.
- [x] Discuss gap table: `phase` POST, `capture`/`kind:'discuss'`, `RoomPhase`, Model B UI → INT-08…INT-10 scope.
- [x] `master_runner.md` INT-00 row updated; §10 appended.

---

## §10 Attempt log

<!-- Reachability trace, drift tables, per-phase risk. Append; do not delete. -->

### 2026-06-10 — Claude Code — baseline (read-only)

**Verdict: 🟡 AMBER.** Contracts are healthier than AF-90 assumed (chunk union + ComponentId set are **already in sync** across repos), but no live engine is running, so the stream trace is deferred. All contract-first phases (INT-01…INT-06, INT-08…INT-10) are unblocked; only **INT-07** needs a live engine.

#### 1. Env / reachability

| Check | Result |
| --- | --- |
| `AI_AGENTS_BASE_URL` / `_SERVICE_SECRET` / `_TENANT_ORG_ID` in `.env.local` | ✅ all three present (`check:env` does **not** surface them — verified by direct grep). `BASE_URL=http://localhost:3001`. |
| `NEXT_PUBLIC_AGENT_ROOM_MODE` | not set → default **`stub`** (correct; live wiring stays gated). |
| Engine `:3001` reachable | ❌ HTTP `000` (down). |
| Next dev `:3000` reachable | ❌ HTTP `000` (down). |
| **Live chunk trace** | ⛔ **Not captured** — both servers down. Top blocker for INT-07 only. Re-run the INT-00 curl once `pnpm dev` (UI) + the engine on `:3001` are both up. |
| UI `pnpm typecheck` | ✅ green (exit 0). |
| Engine `pnpm typecheck` | ✅ green (exit 0). |
| Engine `ui-render.test.ts` (`tsx --test`) | ✅ green (4/4) — INT-01 must keep this green. |

#### 2. Contract-drift table (client vs engine) — **STREAM CHUNK UNION: IN SYNC**

Client `stream-chunk.ts` and engine `ai/types.ts` carry the **same 8 chunk variants**: `text_delta`, `tool_call`, `tool_result`, `agent_handoff`, `ui_render`, `done`, `progress`, `error`. **Neither** has `ink_gesture` or `suggest`. `progressPhaseSchema` matches `ProgressPhase` exactly (6 values). The contract mirror is currently consistent on the chunk layer — no drift to fix in INT-01 here.

**One subtle prop-schema drift to reconcile in INT-01:** static-component empty props differ in strictness — engine `EmptyProps = z.object({}).strict()` (rejects extra keys → render *blocked*) vs client `emptyProps = z.object({}).passthrough()` (tolerates extra keys). Direction matters: the engine is stricter, so a static component the model over-feeds is dropped engine-side before it ever streams. Harmonize when touching `component-props.ts`.

#### 3. Id gap table — engine/client `ComponentId` (8) vs Ink Band `ScreenId` (**13**, not 12)

Both `COMPONENT_IDS` (client) and `ComponentId` (engine) are the **same 8**: `reality_check_beat`, `readback`, `path`, `pricing`, `network`, `audience`, `founders`, `handoff_human`. The drift is **not** client-vs-engine — it's render-vocabulary-vs-screen-set:

| Disposition | Ids |
| --- | --- |
| **Aligned 1:1** | `readback`, `path`, `pricing`, `founders` |
| **Renamed** | engine `reality_check_beat` ↔ Ink Band `beat` |
| **Engine/client-only** (rendered by `screen.tsx`, absent from `acts.ts` `SCREEN_IDS`) | `network`, `audience`, `handoff_human` |
| **Ink-Band-only** (in `SCREEN_IDS`, no engine component, **not** rendered via `ui_render`) | `home`, `safety`, `confirm`, `leader`, `about`, `contact`, `faq`, `capture` |

**Correction to INT-01 §2:** `acts.ts` `SCREEN_IDS` already contains **`capture`** (13 ids, not 12). The prompt's "add capture" instruction is partly done client-side; the gap is that `capture` is neither an engine `ComponentId` nor a `screen.tsx` render case, and `capture.ts` `CaptureKind` is `map|paid|free` (**no `discuss`**).

**Render-side fact that lowers INT-02 risk:** every Ink-Band-only screen **already has a built stub component** under `src/components/agent-room/screen/stub/` (`home-screen`, `safety-screen`, `confirm-screen`, `leader-screen`, `about-screen`, `contact-screen`, `faq-screen`, `beat-screen`, `capture-screen`). They are wired into the offline `play()` runner, **not** into the live `screen.tsx` `ui_render` switch (which has 8 cases = the 8 engine ids). INT-02 is mostly *wiring existing components into a registry*, not building new screens.

#### 4. Missing-act table

| Act (`acts.ts` `ACT_KINDS`) | Stream chunk today | Phase |
| --- | --- | --- |
| `say` | ✅ `text_delta` | — |
| `show` | ✅ `ui_render` | INT-02 |
| `gesture` | ❌ **no `ink_gesture` chunk** (neither repo) | **INT-04** (cross-repo, new chunk) |
| `suggest` | ❌ **no `suggest` chunk** | **INT-05** |
| `wait` / `clear` | local-only (runner housekeeping; no chunk needed) | — |

#### 5. Discuss gap table

| Seam | State today | Phase |
| --- | --- | --- |
| `phase` in stream POST | ❌ absent — neither `proxy-schema.ts` (`agentRoomClientBodySchema`) nor the proxy `upstreamBody` carries `phase`; hook POSTs only `message/sessionId/anonId/history`. | INT-10 |
| `RoomPhase` in client hooks | ❌ absent — `use-agent-room-stream.ts` has no phase state (the only `phase` refs are `progress.phase`). | INT-08 |
| `capture` component / `submitLead` seam | 🟡 partial — `capture.ts` exports `CAPTURE_VARIANTS` + `submitLead()` (console stub, the lone network seam) + `capture-screen.tsx` stub exists. But no `discuss` kind, no engine component, no live `ui_render` route. | INT-09 |
| Model B layout | ❌ not present — room is single screen-zone + voice-zone; no marginalia / voice-expand / Discuss layout. | INT-08 |

#### 6. Per-phase risk (INT-01…INT-10)

- **INT-01** 🟢 *low–moderate.* Chunk union already in sync; only the namespace differs. Decision **A** = grow engine enum by 8 (`home/safety/confirm/leader/about/contact/faq/capture`) + rename `reality_check_beat→beat`. The rename touches 3 spots each side (engine `ComponentId` + render-tool name/`component` + test; client `COMPONENT_IDS` + `component-props.ts` key + `screen.tsx` case). Don't forget the `.strict()`↔`.passthrough()` empty-props reconciliation and `capture`'s `{kind}` prop schema.
- **INT-02** 🟢 *low.* Stub components for all ids already exist; convert `screen.tsx`'s 8-case switch into a registry over the full `ScreenId` set (+ `capture` as a sheet figure per the Discuss spec, not a 13th route).
- **INT-03** 🟢 *low.* `text_delta`→voice already works; Discuss passage routing is additive.
- **INT-04** 🟡 *moderate, cross-repo.* New `ink_gesture` chunk must land on **both** sides in one prompt (mirror rule); both lack it today.
- **INT-05** 🟡 needs INT-02+03+04; `suggest` chunk missing.
- **INT-06** 🟡 *moderate.* Engine already has `corpus-search.tool.ts` + `corpus-vector-store.ts`; wiring `getProfile()`→Supabase `movement_leader_corpus_data`. Live data, but infra exists.
- **INT-07** 🔴 **blocked on reachability** — needs UI dev + engine both up. Re-capture the chunk trace here.
- **INT-08** 🟢 UI-only, no engine; add `RoomPhase` + Model B.
- **INT-09** 🟡 needs INT-08; add `discuss` kind + stub gate + sessionStorage.
- **INT-10** 🟡 needs INT-05+08+09; add `phase` to `proxy-schema` + `upstreamBody` + Option A prompt.

**Files verified this session:** client — `stream-chunk.ts`, `component-props.ts`, `acts.ts`, `capture.ts`, `proxy-schema.ts`, `api/agent-room/stream/route.ts`, `use-agent-room-stream.ts`, `screen/screen.tsx`, `screen/stub/*`. Engine — `ai/types.ts`, `tools/render-tools.tool.ts`, `ai/runtime/ui-render.ts`.
