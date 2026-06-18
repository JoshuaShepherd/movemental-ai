# AU-15 — Readback ghost-number spine

**Prompt ID:** au-15-readback-spine  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-18  
**Source:** [ink-band-interactive-ui-patterns-proposal.md](../../notes/ink-band-interactive-ui-patterns-proposal.md) §3.4 · consultation §7 Tier 4

Paste the block below into a fresh agent turn.

---

## Problem statement

After the beat diagnostic, readback must answer **"you are here"** on the path. Ghost-number step spine (pattern A) improves scan: large faint stage index, Playfair title, ink-blue rail — without changing verdict logic.

---

## The prompt

> You are enhancing **readback screens** (stub + stream) with a ghost-number path spine showing the visitor's placement across Safety → Sandbox → Training → Technology.
>
> ### 0. Orient first
>
> - `src/components/agent-room/screen/stub/readback-screen.tsx`
> - Stream: `src/components/agent-room/screen/stream/readback.tsx`
> - `src/lib/agent-room/map-read.ts` or `computeMapRead` — placement output
> - Existing spine: grep `readback`, `rb-num`, `spine` in `ink-band.module.css`
> - `src/components/ink-band/step-spine.tsx` — reuse if compatible
>
> ### 1. Visual spec
>
> - **Active stage:** large ghost numeral (`clamp(3rem, 11vw, 5rem)`), muted opacity ~0.12
> - **Rail:** 2px vertical `--color-ink-band-blue` beside active stage row
> - **Labels:** mono uppercase stage name; Playfair for readback headline
> - **Inactive stages:** smaller nums, `--ink-muted`
>
> ### 2. Data binding
>
> Map `mapRead` / readback props to active stage index (1–4):
> - Safety gate fail → emphasize stage 1, red margin tick optional (reserved red token)
> - Verdict `pre` vs `past` affects copy block, not spine count
>
> Do **not** change verdict computation in this slice.
>
> ### 3. Stream + stub parity
>
> Both readback components show same spine given same props. Shared subcomponent: `ReadbackPathSpine.tsx`.
>
> ### 4. Tests
>
> - Unit: spine highlights stage 2 when mapRead indicates Sandbox gap (fixture)
> - Visual optional: storybook or screenshot in PR
>
> ### 5. Discuss chips
>
> Coordinate with AU-11 — fork chips sit below spine, not competing visually.

---

## Definition of done

- [ ] Shared `ReadbackPathSpine` used by stub + stream readback
- [ ] Active stage visually obvious at glance
- [ ] Verdict logic untouched
- [ ] Ink Band tokens only
- [ ] `pnpm typecheck` green

## Verification commands

```bash
pnpm typecheck
pnpm test:run tests/unit/*readback* tests/unit/*map* 2>/dev/null || true
```

## Do not

- Flatter past Safety in UI when verdict is pre
- Add animated confetti or green checkmarks
- New ScreenId
