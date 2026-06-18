# AU-12 — Path screen horizontal process accordion

**Prompt ID:** au-12-path-accordion  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-18  
**Source:** [ink-band-interactive-ui-patterns-proposal.md](../../notes/ink-band-interactive-ui-patterns-proposal.md) §3.1 · consultation §7 Tier 4

Paste the block below into a fresh agent turn.

---

## Problem statement

The path screen is the highest-information surface after readback. Vertical drawers hide comparative structure (Safety → Sandbox → Training → Technology). **P0 UI upgrade:** horizontal process accordion on `md+`, vertical stack on narrow viewports.

---

## The prompt

> You are upgrading **`path-screen.tsx`** to a horizontal process accordion on desktop while preserving Ink Band tokens, stage ramps, and mobile vertical drawers.
>
> ### 0. Orient first
>
> - `src/components/agent-room/screen/stub/path-screen.tsx`
> - `src/components/agent-room/ink-band.module.css` — `.pathStack`, `.pathDrawer`
> - [INK_BAND_DESIGN_CHAIN.md](../../../design/INK_BAND_DESIGN_CHAIN.md)
> - [ink-band-interactive-ui-patterns-proposal.md](../../notes/ink-band-interactive-ui-patterns-proposal.md) §3.1 — copy adaptation table
>
> ### 1. Layout spec
>
> **Desktop (`min-width: 768px`):**
> - Four equal columns visible simultaneously (titles + stage nums)
> - One column **expanded** with body, stage panel ramp, tags
> - Active column: `2px` left rail `--color-ink-band-blue`
> - Click column header → expand that stage (accordion, one open)
>
> **Mobile:** keep existing vertical `.pathDrawer` stack — no horizontal squeeze
>
> ### 2. Implementation
>
> - Prefer presentational `ProcessAccordion` in `src/components/agent-room/screen/process-accordion.tsx` if reusable for AU-14
> - State: `activeStage: 1|2|3|4` — default stage 1 (Safety)
> - Reuse existing stage copy from path screen — **no new product copy**
> - Motion: house easing `cubic-bezier(.2,.7,.2,1)`; `prefers-reduced-motion` → instant swap
>
> ### 3. Accessibility
>
> - `role="tablist"` / `tab` / `tabpanel` OR accordion `button` + `aria-expanded`
> - Keyboard: arrow keys between headers optional; Enter/Space toggles
> - Focus ring: ink-blue
>
> ### 4. Scene integration
>
> Local scene `toPath` and chips "See the whole path" must still land on path screen — no routing changes.
>
> ### 5. Tests
>
> - Playwright: navigate to path → four stage titles visible at 1280px
> - Tap Sandbox column → Sandbox detail visible
> - 390px viewport → vertical layout (no broken horizontal scroll)
>
> ### 6. Do not duplicate
>
> No raw hex; no green accent from reference screenshots; no new ScreenId.

---

## Definition of done

- [ ] Desktop: 4-column accordion with one expanded stage
- [ ] Mobile: vertical drawers unchanged in behavior
- [ ] a11y roles on accordion controls
- [ ] Ink Band CSS module only — no Tailwind arbitrary hex on agent sheet
- [ ] `pnpm typecheck` green

## Verification commands

```bash
pnpm typecheck
pnpm test:e2e tests/e2e/agent-home-dock.spec.ts  # path via typed "whole path"
```

## Do not

- Modify `scenes.ts` routing
- Add fifth path stage
- Shrink type below Ink Band minimums on mobile
