# AU-13 — Leader band card carousel

**Prompt ID:** au-13-leader-carousel  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-18  
**Source:** [ink-band-interactive-ui-patterns-proposal.md](../../notes/ink-band-interactive-ui-patterns-proposal.md) §3.2 · consultation §7 Tier 4

Paste the block below into a fresh agent turn.

---

## Problem statement

The home leader band shows **17 trusted voices** but one-at-a-time scroll under-sells network depth. **P0:** rounded-card carousel with prev/next and scroll indicator — Ink Band adapted pattern D.

---

## The prompt

> You are upgrading the **leader proof band** on the agent home screen to a browsable card carousel without breaking leader tap → `leader` screen routing.
>
> ### 0. Orient first
>
> - `src/components/agent-room/screen/stub/home-screen.tsx`
> - `src/components/agent-room/leader-band.tsx` (or equivalent)
> - Leader data source (grep `COMMITTED_VOICES`, `leaders`, `leader-band`)
> - `ink-band.module.css` — existing `.carouselBtn` if present
> - Doctrine: public label **"Trusted voices"** — not "Scenius" in H1
>
> ### 1. Carousel spec
>
> - **Cards:** square-ish wells on `--paper`, hairline border, ~16px radius
> - **Content per card:** duotone portrait (existing asset pattern), name, role line (mono eyebrow)
> - **Nav:** prev/next circle buttons; optional pill indicator "3 / 17"
> - **Visible at once:** 3 on desktop, 1.2 on mobile (peek next card)
> - **Tap card:** existing `leaderScene` / navigate to leader profile screen
>
> ### 2. Motion & a11y
>
> - Scroll-snap or transform-based slide — prefer CSS scroll-snap for simplicity
> - `prefers-reduced-motion`: jump without animation
> - Carousel region: `aria-roledescription="carousel"`, items `role="group"`, nav buttons labeled
>
> ### 3. Performance
>
> - Use Next.js `Image` for portraits if not already
> - Do not load all 17 full-res images eagerly if band lazy-loads today — preserve pattern
>
> ### 4. Copy
>
> Band label: **Trusted voices** (doctrine). Subline may mention movement leaders in explanatory prose only.
>
> ### 5. Tests
>
> - Playwright: home loads → carousel next advances visible card
> - Tap card → leader screen or voice line (existing behavior)
>
> ### 6. Optional reuse
>
> Export `LeaderCarousel` for founders band (P3) — keep scope minimal unless trivial.

---

## Definition of done

- [ ] Multiple leaders visible/browsable on desktop
- [ ] Prev/next works keyboard + pointer
- [ ] Leader tap routing unchanged
- [ ] Trusted voices labeling in band chrome
- [ ] `pnpm typecheck` green

## Verification commands

```bash
pnpm typecheck
pnpm test:e2e tests/e2e/agent-home-dock.spec.ts
```

## Do not

- Add "nominate a leader" recruiting UI
- Use Concept Modern card shadows
- Autoplay carousel (accessibility)
