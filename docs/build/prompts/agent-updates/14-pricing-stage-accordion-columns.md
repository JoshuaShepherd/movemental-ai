# AU-14 — Pricing stage accordion columns

**Prompt ID:** au-14-pricing-accordion  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-18  
**Source:** [ink-band-interactive-ui-patterns-proposal.md](../../notes/ink-band-interactive-ui-patterns-proposal.md) §3.3 · consultation §7 Tier 4

Paste the block below into a fresh agent turn.

---

## Problem statement

Pricing is grouped by the four path stages. Horizontal accordion columns (pattern C) aid comparison — same interaction model as path screen (AU-12). **SSOT for numbers:** `src/lib/agent-room/data/pricing.ts`.

---

## The prompt

> You are upgrading **`pricing-screen.tsx`** to stage-grouped accordion columns on desktop, sharing accordion primitives with path screen where possible.
>
> ### 0. Orient first
>
> - `src/components/agent-room/screen/stub/pricing-screen.tsx`
> - `src/lib/agent-room/data/pricing.ts` — **only** source for dollar amounts and tier names
> - `room-output-guardrail.ts` (agents) — host must not quote prices in voice; UI owns numbers
> - AU-12 `process-accordion.tsx` if merged — reuse
>
> ### 1. Layout
>
> **Desktop:** four columns — Safety, Sandbox, Training, Technology (canonical names per AU-01)
> - Each column: stage num (mono), tier name, price line, short descriptor
> - One column expanded with full detail + CTA chips (existing targets: enroll, contact, handbook)
>
> **Mobile:** vertical stack of stage pricing cards
>
> ### 2. Content rules
>
> - Import all prices from `pricing.ts` — zero hardcoded `$` in TSX
> - Replace any `[Free entry point to confirm]` with honest copy from SSOT or "Contact us" pattern
> - SafeGuide vs SafeStart naming unchanged
>
> ### 3. Agent integration
>
> Local scene `cost` and engine `show_pricing` must still render this screen — props interface unchanged unless AU-16 adds dynamic props later.
>
> ### 4. Tests
>
> - Unit: pricing screen renders 4 stage groups
> - E2e: cost chip (collapsed) → pricing screen visible with Safety tier text from SSOT
>
> ### 5. Accessibility
>
> Same accordion a11y pattern as AU-12.

---

## Definition of done

- [ ] Four stage columns on desktop; stack on mobile
- [ ] All amounts from `data/pricing.ts`
- [ ] No bracket placeholders in rendered HTML
- [ ] Cost chip local route still works
- [ ] `pnpm typecheck` green

## Verification commands

```bash
pnpm test:e2e tests/e2e/agent-home-dock.spec.ts
pnpm typecheck
rg '\[Free entry' src/components/agent-room
```

## Do not

- Invent new pricing tiers in UI
- Quote prices in Caveat voice strip
- Add fifth pricing column for "movement leaders"
