# Agentic front-end migration — HTML/CSS/JS → React / Next.js

**Canonical location:** `movemental-ai/docs/build/prompts/migration-agentic-front-end/`  
**Source repo (read-only design canon):** `movemental-agentic-front-end`  
**Target repo (implementation):** `movemental-ai` (this repo)  
**Out of scope for this pack:** wiring to `movemental-ai-agents`, SSE streams, Supabase, or tenant auth — see [90-deferred-agent-backend-integration.md](./90-deferred-agent-backend-integration.md).

---

## What this pack is

A **sequenced agent prompt program** to migrate the vanilla **Ink Band** agent-room prototype into the Next.js 16 app as React + Tailwind (scoped CSS module where necessary). The prototype is a **front-end mock-up**: scripted scenes, no LLM. This pack preserves that behavior using a **local stub runner** until a later integration phase.

**Execute in order.** Start with [`master_runner.md`](./master_runner.md).

---

## Source of truth hierarchy

1. **Monolith:** `movemental-agentic-front-end/movemental-agent-ink-band.html` — edit here in the source repo, then regenerate splits.
2. **Split layout:** `css/ink-band.css`, `js/**`, `pages/**` — generated; do not hand-edit in source repo.
3. **Intent doc:** `movemental-agentic-front-end/docs/notes/intent-and-migration.md`
4. **Line map:** `movemental-agentic-front-end/MIGRATION.md`

When prototype React in this repo disagrees with the split HTML, **the prototype HTML wins** for visual and interaction canon.

---

## Prompt index

| Order | ID | Prompt | Primary focus | Blocks |
| ---: | --- | --- | --- | --- |
| 0 | AF-00 | [00-preflight-audit-and-baseline.md](./00-preflight-audit-and-baseline.md) | Inventory source + target; gap report | — |
| 1 | AF-01 | [01-scope-and-architecture-decisions.md](./01-scope-and-architecture-decisions.md) | Boundaries, folder layout, client boundaries | AF-00 |
| 2 | AF-02 | [02-design-tokens-and-font-foundation.md](./02-design-tokens-and-font-foundation.md) | Ink Band tokens, fonts, scoped surface | AF-01 |
| 3 | AF-03 | [03-route-shell-and-layout.md](./03-route-shell-and-layout.md) | `/agent` route, 100dvh shell, proxy chrome | AF-02 |
| 4 | AF-04 | [04-ink-voice-and-gesture-layer.md](./04-ink-voice-and-gesture-layer.md) | Voice line, SVG ink, gestures | AF-03 |
| 5 | AF-05 | [05-scene-runner-stub-choreography.md](./05-scene-runner-stub-choreography.md) | `play()` / acts / stub `SCENES` | AF-04 |
| 6 | AF-06 | [06-data-layer-typescript-port.md](./06-data-layer-typescript-port.md) | leaders, profiles, faq, map-q, scenes | AF-05 |
| 7 | AF-07 | [07-screen-registry-and-render-pipeline.md](./07-screen-registry-and-render-pipeline.md) | Closed screen set, `renderScreen` port | AF-06 |
| 8 | AF-08 | [08-screens-interactive-flow.md](./08-screens-interactive-flow.md) | home, beat, readback, path | AF-07 |
| 9 | AF-09 | [09-screens-static-and-info.md](./09-screens-static-and-info.md) | about, contact, pricing, faq, safety, founders, confirm | AF-07 |
| 10 | AF-10 | [10-screens-leader-profiles.md](./10-screens-leader-profiles.md) | leader band + 17 profile screens | AF-07 |
| 11 | AF-11 | [11-composer-input-and-suggestions.md](./11-composer-input-and-suggestions.md) | Composer, chips, regex routing | AF-05, AF-07 |
| 12 | AF-12 | [12-visual-parity-and-qa-pass.md](./12-visual-parity-and-qa-pass.md) | Side-by-side QA vs `pages/**` | AF-08–AF-11 |
| — | AF-90 | [90-deferred-agent-backend-integration.md](./90-deferred-agent-backend-integration.md) | Future SSE / agents pack | AF-12 |

---

## Target directory map (after migration)

```text
src/
  app/agent/page.tsx              # Route (exists — align to ink-band shell)
  components/agent-room/          # Shell + screens (extend/replace oat-surface work)
    ink-band/                     # Optional subfolder for ink-specific primitives
  lib/agent-room/
    acts.ts                       # Act vocabulary types
    scenes.ts                     # Stub SCENES (from js/data/scenes.js)
    data/                         # leaders, profiles, faq, map-q
    scene-runner.ts               # play(), goHome(), run() — no fetch
```

Existing files under `src/components/agent-room/` and `src/lib/agent-room/stream-chunk.ts` were built for **live agent streaming**. This migration may **replace visual/styling** and **swap the stream hook for the stub runner** — do not delete stream types until AF-90.

---

## Skills (read when relevant)

| Skill | When |
| --- | --- |
| `.claude/skills/concept-modern-ui/SKILL.md` | Token discipline; note Ink Band is a **scoped surface**, not marketing Concept Modern |
| `.claude/skills/design-section/SKILL.md` | Section structure for static screens |
| `.claude/skills/tailwind-cleanup/SKILL.md` | After CSS port — remove hardcoded hex in TSX |
| `.claude/skills/typography-polish/SKILL.md` | Display/hand/mono hierarchy |
| `.claude/skills/responsive-audit/SKILL.md` | Beat opts, faces band, path drawers |
| `.claude/skills/gsap-react/SKILL.md` | Only if replacing rAF ink with GSAP (optional) |
| Vercel `react-best-practices` | Client boundaries, hooks cleanup |

**HTML → React decomposition pattern** (from Stitch migration workflow referenced in `CLAUDE.md`):

1. Read static HTML snapshot under `pages/<screen>.html`.
2. Map CSS classes → module or Tailwind utilities against token table (AF-02).
3. Extract repeating DOM → React components; keep data in top-level `const` / TS modules.
4. Push `"use client"` only on leaves that need DOM refs, gestures, or runner state.
5. Verify with side-by-side browser compare (AF-12).

---

## Package manager

`pnpm` only.

---

## Related docs

| Document | Relationship |
| --- | --- |
| `movemental-agentic-front-end/docs/notes/intent-and-migration.md` | Why the mock-up exists; act grammar |
| `movemental-agentic-front-end/MIGRATION.md` | Monolith → file map |
| `src/lib/agent-room/stream-chunk.ts` | Future stream contract (do not wire in this pack) |
| `docs/design/DESIGN.md` | Marketing site tokens — **do not** apply to agent room shell |
