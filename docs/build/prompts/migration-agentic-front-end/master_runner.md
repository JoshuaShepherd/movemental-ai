# Agentic front-end migration — master runner

**Canonical location:** `movemental-ai/docs/build/prompts/migration-agentic-front-end/`  
**Target agent:** Cursor / Claude Code executing one prompt at a time  
**Source repo:** `movemental-agentic-front-end` (sibling checkout)  
**Last updated:** 2026-06-09

---

## Mandatory agent protocol (every session)

You are the **Ink Band migration runner**. Before ending any session:

1. **Read this file first** when picking up work in a new context window.
2. Execute prompts in **Recommended order** unless the status table shows a blocker resolved elsewhere.
3. After each prompt, **update this file**:
   - Set **Status**, **Last touched**, **Branch**, **Blockers** in the master table.
   - Append a row to **Session changelog**.
   - Append to the individual prompt's **§10 Attempt log**.
4. Run the **Verification checklist** for every touched area.
5. **Do not** call `/api/agent-room/stream`, `movemental-ai-agents`, or Supabase in this program — stub runner only.

**Never** mark a row **Done** without checked Definition of Done in the child prompt **and** a green verification checklist.

---

## Master status table

| Order | ID | Prompt | Status | Last touched | Branch | Blockers / notes |
| ---: | --- | --- | --- | --- | --- | --- |
| 0 | AF-00 | [00-preflight-audit-and-baseline.md](./00-preflight-audit-and-baseline.md) | **Done** | 2026-06-09 | — (read-only) | Baseline in §10. typecheck green. Existing React agent-room is oat-surface/stream build, **not** an ink-band port → AF-01 should build a fresh scoped surface behind the mode flag. |
| 1 | AF-01 | [01-scope-and-architecture-decisions.md](./01-scope-and-architecture-decisions.md) | **Done** | 2026-06-09 | — (uncommitted) | ADR + mode flag (`stub` default) + scaffold (`mode/acts/scene-runner/data/`, stub hook). typecheck green. Stream code untouched. Token swap → AF-02. |
| 2 | AF-02 | [02-design-tokens-and-font-foundation.md](./02-design-tokens-and-font-foundation.md) | **Done** | 2026-06-09 | — (uncommitted) | `.ink-band-surface` scoped ramp (`--color-ink-band-*`/`--font-ink-*`) + Caveat via `agent/layout.tsx` + temp oat→ink bridge. Verified live on `/agent`. Margin rule + `<InkFilters/>` → AF-03/04. |
| 3 | AF-03 | [03-route-shell-and-layout.md](./03-route-shell-and-layout.md) | **Done** | 2026-06-09 | — (uncommitted) | Four-zone shell (mast/screen/voice/composer) in new `ink-band.module.css` + `AgentRoomProvider` refs + shell/ components. Separate voice zone, margin rule, gradient, `#ink` filters. Headless-verified, 0 console errors. Screen content still oat → AF-08–10. |
| 4 | AF-04 | [04-ink-voice-and-gesture-layer.md](./04-ink-voice-and-gesture-layer.md) | **Done** | 2026-06-09 | — (uncommitted) | Ink layer: `ink/{gesture-paths,use-ink-gestures,use-ink-voice,ink-voice}` + context API (`inkLine`/`drawGesture`/`clearInk`). Playwright-verified: Caveat ink-blue voice w/ nib, `.old` fade, gesture/clear, reduced-motion. Act wiring → AF-05. |
| 5 | AF-05 | [05-scene-runner-stub-choreography.md](./05-scene-runner-stub-choreography.md) | **Done** | 2026-06-09 | — (uncommitted) | `playScene` runner (gen-supersede) + `useAgentRoomStub` wired to ink layer; provider moved to wrap dispatch; minimal `opening` scene; `ComposerChip` actions. Playwright-verified: scene plays, busy gating, goHome, **0 network**. `show` registry + scenes → AF-06/07. |
| 6 | AF-06 | [06-data-layer-typescript-port.md](./06-data-layer-typescript-port.md) | **Done** | 2026-06-09 | — (uncommitted) | 5 data modules + index (LEADERS/PROFILES+getProfile/MAP_Q+computeMapRead/FAQ/SCENES×14). Portraits externalized to `public/`. Byte-identical copy. tsx-verified (12 checks). HTML builders → AF-08–10. Synced src @9d54e78. |
| 7 | AF-07 | [07-screen-registry-and-render-pipeline.md](./07-screen-registry-and-render-pipeline.md) | **Done** | 2026-06-09 | — (uncommitted) | `StubScreen` registry + router (`renderScreen` port), 12 placeholders, `ShowOpts`/`StubScreenState`(+nonce); `AgentRoomView` split into presentational + stub/stream containers. Playwright: `show`→screen swap, scroll table (beat=no-scroll), stream still renders. Real screens → AF-08–10. |
| 8 | AF-08 | [08-screens-interactive-flow.md](./08-screens-interactive-flow.md) | **Done** | 2026-06-09 | — (uncommitted) | home (+17-face band), beat, readback, path screens + `beat-scenes.ts`; `mapAnswers`/`mapRead` threaded through the hook. Playwright: full beat→readback flow (5 sev ticks match pattern), path accordion. Screen CSS ported. |
| 9 | AF-09 | [09-screens-static-and-info.md](./09-screens-static-and-info.md) | **Done** | 2026-06-09 | — (uncommitted) | 7 screens (about/pricing/faq/safety/founders/contact/confirm) + `chrome.tsx` (Crumb/LayerRow/Way). FAQ native accordion, contact UI-only form, confirm free/paid. Playwright-verified all; 0 errors. Only `leader` placeholder remains → AF-10. |
| 10 | AF-10 | [10-screens-leader-profiles.md](./10-screens-leader-profiles.md) | **Done** | 2026-06-10 | — (uncommitted) | `leader-screen` (real `LeaderScreen` + band→hero FLIP via `leader-flip.ts`), `leader-scenes.ts` (`leaderScene`/`leaderWork`/`leaderConnect` factories), hook `currentLeaderRef` + `onLeaderSelect` + `run()` intercept; band click captures `#ph-N` rect; lead-* CSS ported. Playwright: 17/17 profiles full content, work/connect/back chips, reduced-motion FLIP skip, 0 errors, 0 network. Registry 12/12 real. |
| 11 | AF-11 | [11-composer-input-and-suggestions.md](./11-composer-input-and-suggestions.md) | **Done** | 2026-06-10 | — (uncommitted) | `route-input.ts` (pure `routeInput` — verbatim `handleInput` regex table + `FALLBACK_SAY`); hook `sendMessage` now routes typed input → `run(scene)` or plays the fallback. Per-screen placeholder rotation (`BEAT_PLACEHOLDER` on beat, threaded through `AgentRoomView`). Send disabled + submit guarded while busy (input stays focusable, matching prototype). Playwright matrix: cost→pricing, who→founders, help→beat, "quantum physics"→fallback line; replay→opening; 0 errors, 0 network. |
| 12 | AF-12 | [12-visual-parity-and-qa-pass.md](./12-visual-parity-and-qa-pass.md) | **Done** | 2026-06-10 | — (uncommitted) | **Stub migration signed off.** Parity 13/13 🟢 + interaction table all pass + reduced-motion instant + 0 `/stream` + 0 console errors; typecheck/lint green. 15 QA screenshots in `qa-screenshots/`. Two documented deltas (marketing `/`→`/agent` from the unrelated in-progress marketing migration; `leader` carries container `settle`). Ready for AF-90. |
| — | AF-90 | [90-deferred-agent-backend-integration.md](./90-deferred-agent-backend-integration.md) | **Deferred** | — | — | Out of scope |

**Status values:** `Not started` · `In progress` · `Blocked` · `PR open` · `Done` · `Deferred`

---

## Recommended execution order

```text
AF-00  Preflight audit (read-only baseline)
  ↓
AF-01  Scope + architecture (stub vs stream decision)
  ↓
AF-02  Tokens + fonts (ink-band scoped surface)
  ↓
AF-03  Route + three-zone shell
  ↓
AF-04  Ink voice + SVG gestures
  ↓
AF-05  Scene runner (local stub)
  ↓
AF-06  Data modules (TS port of js/data/*)
  ↓
AF-07  Screen registry + renderScreen
  ↓
AF-08  Interactive screens (home, beat, readback, path)     ← can overlap AF-09/10 after AF-07
AF-09  Static/info screens
AF-10  Leader profiles
  ↓
AF-11  Composer + input routing
  ↓
AF-12  Visual parity QA
  ↓
AF-90  Agent backend (operator request only)
```

**One prompt per PR** when possible. AF-08, AF-09, and AF-10 may ship as separate PRs once AF-07 lands.

---

## Verification checklist (run after each prompt)

| Check | Command / action | Pass criterion |
| --- | --- | --- |
| TypeScript | `pnpm typecheck` | Zero errors |
| Lint | `pnpm lint` | No new errors in touched files |
| Dev server | `pnpm dev` → `http://localhost:3000/agent` | Page loads; no console errors |
| Stub runner | Type in composer / tap chips | Scenes play; screens swap |
| No live agent | Network tab | **No** calls to `/api/agent-room/stream` during stub phase |
| Reduced motion | OS `prefers-reduced-motion: reduce` | Ink/gestures skip animation per prototype |

Use Chrome DevTools MCP for browser verification when available.

---

## Global Definition of Done (runner level)

A prompt is **Done** only when:

- [ ] Child prompt **Definition of Done** boxes checked.
- [ ] Verification checklist green.
- [ ] **`pnpm typecheck`** passes.
- [ ] **`master_runner.md`** status row updated + session changelog appended.
- [ ] Child prompt **§10 Attempt log** appended.
- [ ] No accidental agent API wiring introduced.

---

## Session changelog (append-only)

| Date | Agent / human | Prompt ID | Summary | typecheck | Outcome |
| --- | --- | --- | --- | --- | --- |
| 2026-06-09 | build-prompt | — | Created migration prompt pack | — | Ready for execution |
| 2026-06-09 | Claude Code | AF-00 | Read-only baseline audit: 34 source pages (17 leaders, 6 beats) + 5 JS data modules; target = oat-surface/stream build with divergent screen set, tokens, copy. Gap table + token/font delta + arch rec in §10. | ✅ green | Done — AF-01 unblocked |
| 2026-06-09 | Claude Code | AF-01 | ADR (`agent-room/README.md`) + `AGENT_ROOM_MODE` (default `stub`) + scaffold (`mode.ts`, `acts.ts`, `scene-runner.ts`, `data/`, `use-agent-room-stub.ts`). `AgentRoom` dispatches stub/stream via two containers (rules-of-hooks safe); no stream code deleted. | ✅ green | Done — AF-02 unblocked |
| 2026-06-09 | Claude Code | AF-02 | Scoped `.ink-band-surface` token ramp in globals.css (10 colors + margin-red + `--font-ink-*`), Caveat loaded scoped via new `agent/layout.tsx`, room rewrapped, temp oat→ink bridge. Live-verified: tokens compiled, Caveat `/agent`-only, no leak. `next typegen` fixed stale route validator. | ✅ green | Done — AF-03 unblocked |
| 2026-06-09 | Claude Code | AF-03 | Four-zone prototype shell: new `ink-band.module.css` + `agent-room-context` (4 refs) + `shell/{mast,screen-zone,voice-zone,ink-overlay}`; composer rewritten (voice moved to its own zone), `AgentRoomView` recomposed, oat CornerMenu dropped. Playwright-verified: 4 zones, gradient, margin rule, `#ink` filters, 100dvh, no page scroll, 0 console errors. | ✅ green | Done — AF-04 unblocked |
| 2026-06-09 | Claude Code | AF-04 | Ink voice + gesture layer ported to `ink/` (pure path-math + gesture hook owning stage refs + voice queue + self-animating `VoiceLine`); context exposes `inkLine`/`drawGesture`/`clearInk` + dev `__agentRoomInk` seam. Resolved React-Compiler memo lint via ref ownership. Playwright-verified all DoD incl. reduced-motion. | ✅ green | Done — AF-05 unblocked |
| 2026-06-09 | Claude Code | AF-05 | Scene runner (`playScene` + gen-supersede) + `useAgentRoomStub` driving the ink layer; `AgentRoomProvider` hoisted to wrap mode dispatch; `ComposerChip` pre-bound actions; minimal `opening` scene; `id="phrase"` on hero. Playwright-verified: opening plays (say+gesture+6 chips), busy gating, goHome supersede, 0 `/api` calls. | ✅ green | Done — AF-06 unblocked |
| 2026-06-09 | Claude Code | AF-06 | Data layer ported: `data/{leaders,profiles,map-q,faq,scenes,index}.ts` — LEADERS(17), PROFILES(17)+getProfile+sayScene, MAP_Q(6)+computeMapRead(pure), FAQ(10), SCENES(14). Portraits → `public/agent-room/leaders/`. Byte-identical copy. tsx-verified 12 checks; vitest spec committed (rolldown binding blocks local run). | ✅ green | Done — AF-07 unblocked |
| 2026-06-09 | Claude Code | AF-07 | Screen registry + pipeline: `screen/stub/{stub-screen,placeholders}` (12 ScreenId placeholders, exhaustive registry), `ShowOpts`/`StubScreenState`+nonce, runner `show` updates state, `AgentRoomView` split presentational + stub/stream containers. Playwright: show→swap, scroll table holds, stream path renders. | ✅ green | Done — AF-08 unblocked |
| 2026-06-09 | Claude Code | AF-08 | Interactive screens: `screen/stub/{home-screen,leader-band,beat-screen,readback-screen,path-screen}` + `beat-scenes.ts`; `mapAnswers`(ref)/`mapRead`(state) threaded; screen-content CSS ported. Playwright (full flow): home+17 band, beat cycles 6, readback gaps match (5 ticks), path accordion. | ✅ green | Done — AF-09 unblocked |
| 2026-06-09 | Claude Code | AF-09 | Static/info screens: `chrome.tsx` (Crumb/LayerRow/Way) + about/pricing/faq/safety/founders/contact/confirm; contact-form + static-screen CSS ported. `onHome` threaded; registry 11/12 real. Playwright: all 7 render, faq accordion, contact validate+success, confirm free/paid. | ✅ green | Done — AF-10 unblocked |
| 2026-06-10 | Claude Code | AF-10 | Leader profiles: real `LeaderScreen` (`leaderHTML` port — crumb/lead-head/hero/bio/work-layers/connection) replacing the last placeholder; `leader-scenes.ts` (`leaderScene`/`leaderWorkScene`/`leaderConnectScene` factories) + hook `currentLeaderRef`, `onLeaderSelect`, and `run()` intercept for `leaderWork`/`leaderConnect`; band click captures `#ph-N` rect → `leader-flip.ts` one-shot → band→hero FLIP (reduced-motion skip). lead-* + `.fade` CSS ported. `placeholders.tsx` deleted; registry 12/12 real. Playwright: 17/17 full profiles, chips work/connect/back, FLIP skip under reduced motion, 0 console errors, 0 `/api` calls. | ✅ green | Done — AF-11 unblocked |
| 2026-06-10 | Claude Code | AF-11 | Composer input routing: `route-input.ts` — pure `routeInput(text)` porting the `handleInput` regex table verbatim (ordered, first-match-wins, broad `toBeat` catch-all) + `FALLBACK_SAY`. Hook `sendMessage(raw)` routes → `run(scene)` or plays the fallback say line (was a no-op stub). Composer gains a `placeholder` prop (`BEAT_PLACEHOLDER`/`DEFAULT_PLACEHOLDER`), threaded through `AgentRoomView`; rotates by `screen.id`. Send button + submit guarded while busy (input stays focusable, prototype-faithful). Playwright matrix all green (cost→pricing, who→founders, help→beat, "quantum physics"→fallback spoken, replay→opening, submit-while-busy ignored); 0 errors, 0 `/api`. | ✅ green | Done — AF-12 unblocked |
| 2026-06-10 | Claude Code | AF-12 | **Final QA gate — stub migration signed off.** Playwright sweep (1440/768/390 + reduced-motion): screen parity **13/13 🟢**, interaction table all pass (opening choreography, chip nav, regex input, beat→readback, path accordion, goHome via logo, replay, resize, busy lock), reduced-motion instant-complete (chips 21 ms, beat+readback 611 ms). 0 `/api/agent-room/stream`, 0 console errors; `AGENT_ROOM_MODE` default `"stub"`. 15 screenshots in `qa-screenshots/`. No code fixes needed (4 initial reds were harness timing/logic, re-probed green). Deltas documented: marketing `/`→`/agent` (unrelated in-progress marketing migration on this branch; agent work scoped to `*/agent-room/*`), `leader` carries container `settle`. | ✅ green | Done — stub migration complete; AF-90 ready |
