# INT-01 — Harmonize `ComponentId` ↔ Ink Band `ScreenId`

**Prompt ID:** INT-01
**Target agent:** Cursor / Claude Code
**Primary repos:** `movemental-ai` + `movemental-ai-agents` (cross-repo)
**Blocks:** INT-00
**Status:** Not started
**Last updated:** 2026-06-10

**Discuss:** [agent-room-long-form-discussion-ui.md](../../notes/agent-room-long-form-discussion-ui.md) — include **`capture`** in the harmonized id set (sheet figure, not a full-screen swap).

---

## 1. Role and stance

Make the agent's render vocabulary and the Ink Band screen set **one namespace** with **one mapping SSOT**, so a `ui_render` can target any of the 12 Ink Band screens **and** the Discuss **`capture`** form-cell, and the client always knows what to render. This is the keystone — INT-02 depends on it.

---

## 2. The gap (from INT-00)

| | Engine `ComponentId` (8) | Ink Band `ScreenId` (12) |
| --- | --- | --- |
| **Aligned name** | `readback`, `path`, `pricing`, `founders` | same |
| **Renamed** | `reality_check_beat` | `beat` |
| **Engine-only** | `network`, `audience`, `handoff_human` | — (not in Ink Band closed set) |
| **Ink-Band-only** | — | `home`, `safety`, `confirm`, `leader`, `about`, `contact`, `faq` |
| **Discuss capture** | — (missing) | `capture` — form-cell on sheet; props `{ kind: 'map' \| 'paid' \| 'free' \| 'discuss' }` |

The engine can't currently ask for `home/safety/confirm/leader/about/contact/faq` or **`capture`**; the Ink Band set has no `network/audience/handoff_human`.

---

## 3. Decision to make (record in §10)

Pick **one** and document the rationale:

- **(A) Extend the engine enum to the Ink Band closed set** (rename `reality_check_beat`→`beat`, add the seven missing ids **plus `capture`**, keep `network`/`audience`/`handoff_human` as engine-extra). The client maps 1:1. *Recommended* — the Ink Band set is the product's screen vocabulary; the agent should speak it directly. **`capture` is a sheet figure** (INT-02): it appends into the current sheet in Discuss, not a 13th full-screen route.
- **(B) Keep two enums + a client adapter** (`componentIdToScreenId(ComponentId): ScreenId`). Lower blast radius, but two sources of truth to keep in sync forever.

Either way, create **one mapping module** as SSOT: `src/lib/agent-room/screen-map.ts` exporting the bidirectional table and a typed `toScreenId(component)` / `toComponentId(screen)`.

---

## 4. Work

1. **Engine** (`movemental-ai-agents/src/lib/ai/types.ts` + `render-tools.tool.ts`): apply the chosen id set; update the render-tool's `component` enum and any per-component prop schema names. Keep `ui-render.test.ts` green.
2. **Client** (`src/lib/agent-room/stream-chunk.ts`): update `COMPONENT_IDS` to match; regenerate `componentIdSchema`. Update `component-props.ts` validator keys.
3. **`screen-map.ts`** (new): the bidirectional SSOT mapping `ComponentId ↔ ScreenId`, exhaustive (a `satisfies Record<ComponentId, ScreenId>` so a new id fails compile until mapped).
4. Update `screen/screen.tsx`'s switch (or replace it in INT-02) to consume the map, not string literals.

---

## 5. Definition of Done

- [x] One id set agreed (16); mapping SSOT (`screen-map.ts`) exhaustive and typed (`satisfies` both directions).
- [x] Engine enum + render-tool + client `COMPONENT_IDS` + `component-props.ts` all agree (contract mirror in sync).
- [x] `reality_check_beat`↔`beat` resolved by **rename**, consistently across both repos.
- [x] Engine-extra ids (`network`/`audience`/`handoff_human`) → `null` in the map = **render** directly (defined disposition).
- [x] `pnpm typecheck` green in both repos; `ui-render.test.ts` green (4/4); `screen-map.test.ts` green (6/6).
- [x] §10 records the decision + the final mapping table; master runner updated.

---

## 6. Verification

- Engine emits each id → client resolves to the right `ScreenId` (unit test over the map).
- A removed/renamed id breaks compile on both sides (proves the SSOT bites).

---

## §10 Attempt log

<!-- Decision (A/B), final mapping table, cross-repo sync notes. -->

### 2026-06-10 — Claude Code — Decision A executed (cross-repo)

**Decision: (A)** — extend the engine `ComponentId` enum to speak the Ink Band screen vocabulary directly. Rationale: the Ink Band set is the product's screen vocabulary; one namespace beats two-enums-forever (B). The agent now emits `beat`/`home`/`safety`/… by name, and the client maps 1:1.

#### Final id set (16) — engine `ComponentId` ≡ client `COMPONENT_IDS`

`home`, `beat`, `readback`, `safety`, `confirm`, `path`, `founders`, `leader`, `about`, `contact`, `pricing`, `faq`, `capture` (= the 13 Ink Band `ScreenId`s) **+** `network`, `audience`, `handoff_human` (engine-extra).

#### Final mapping table (`screen-map.ts` — the SSOT)

| ComponentId | → ScreenId | Disposition |
| --- | --- | --- |
| `home`/`beat`/`readback`/`safety`/`confirm`/`path`/`founders`/`leader`/`about`/`contact`/`pricing`/`faq`/`capture` | same name | 1:1 Ink Band screen |
| `network` | `null` | engine-extra — rendered directly by the live `screen.tsx` (disposition = **render**) |
| `audience` | `null` | engine-extra — render |
| `handoff_human` | `null` | engine-extra — render |

**Deviation from the prompt's literal `satisfies Record<ComponentId, ScreenId>`:** the map is `Record<ComponentId, ScreenId | null>`. Keeping `network`/`audience`/`handoff_human` as engine-extra (per Decision A) means they have **no** Ink Band `ScreenId`. A total non-null Record would have forced either polluting `ScreenId` with three non-Ink-Band ids — which breaks the stub renderer's exhaustive `Record<ScreenId, Component>` in `stub-screen.tsx` and would demand three fake stub screens — or removing live-rendered components. `| null` is the explicit "no Ink Band screen; rendered directly" disposition (the DoD's "render or explicitly ignore"). It still **bites**: `satisfies Record<ComponentId, ScreenId | null>` makes a new/renamed `ComponentId` a compile error until mapped, and `SCREEN_TO_COMPONENT satisfies Record<ScreenId, ComponentId>` bites the reverse.

#### `reality_check_beat` → `beat` (resolved by rename, both repos)

- Engine: `ComponentId` member; render tool `render_reality_check_beat`→`render_beat`, `component: "beat"`; zod export `RealityCheckBeatProps`→`BeatProps`; `ui-render.test.ts` literal `"reality_check_beat"`→`"beat"` + regex.
- Client: `COMPONENT_IDS`; `component-props.ts` dispatch (kept the `realityCheckBeatProps` symbol name — internal shape, renaming the React component is INT-02's renderer work); `screen.tsx` case; `use-agent-room-stream.ts` + `agent-room.tsx` `inBeat` literals.

#### `capture` prop schema (new, both sides, mirrored)

`z.object({ kind: z.enum(["map","paid","free","discuss"]) })` — engine `CaptureProps` + tool `show_capture`; client `captureProps` + dispatch case. `discuss` is forward-declared for INT-09 (the `capture.ts` `CaptureKind` variant stays `map|paid|free` until then). `capture` is already in `SCREEN_IDS` (INT-00 correction).

#### Subtle drift noted by INT-00 — **still open, deferred to INT-02**

Static-component empty props: engine `EmptyProps = z.object({}).strict()` vs client `emptyProps = z.object({}).passthrough()`. Left as-is — harmonizing it belongs with INT-02's renderer/validator unification (changing it here has no contract effect since static components carry no props in Phase 1). Flagged so INT-02 doesn't lose it.

#### Files touched

- **Engine:** `src/lib/ai/types.ts`, `src/lib/tools/render-tools.tool.ts`, `src/lib/ai/runtime/ui-render.test.ts`.
- **Client:** `src/lib/agent-room/stream-chunk.ts`, `src/lib/agent-room/component-props.ts`, `src/lib/agent-room/screen-map.ts` (**new**), `src/lib/agent-room/screen-map.test.ts` (**new**), `src/components/agent-room/screen/screen.tsx`, `src/components/agent-room/agent-room.tsx`, `src/components/agent-room/use-agent-room-stream.ts`.

#### Verification

| Check | Result |
| --- | --- |
| Engine `pnpm typecheck` | ✅ |
| Engine `ui-render.test.ts` (`tsx --test`) | ✅ 4/4 |
| Client `pnpm typecheck` | ✅ (validates both `satisfies` SSOT guards) |
| Client `screen-map.test.ts` (vitest) | ✅ 6/6 |
| Client lint (touched files) | ✅ |
| Stub path | untouched (uses `ScreenId`, kept `beat`); no `reality_check_beat` remains in either repo |

**§6 "SSOT bites" — demonstrated by construction:** the rename forced edits at every `reality_check_beat` site in both repos (compile would fail otherwise), and the `satisfies` clauses gate `screen-map.ts`. Adding an unmapped `ComponentId` or removing a mapped `ScreenId` is a compile error on `screen-map.ts`.

**Env note:** the client vitest run first failed on a missing `rolldown` native binding (`@rolldown/binding-linux-x64-gnu` — a platform optional pnpm skipped; INT-00 never hit it because it ran engine tests via `tsx`). Fixed by fetching `@rolldown/binding-linux-x64-gnu@1.0.0-rc.15` and placing `rolldown-binding.linux-x64-gnu.node` in `rolldown/dist/`. A `pnpm install` may need to re-place it; consider pinning the optional dep.

**Branch:** `slice/S02-leader-corpus-onboarding` (cross-repo edits live in both working trees; no commit yet — operator-gated).
