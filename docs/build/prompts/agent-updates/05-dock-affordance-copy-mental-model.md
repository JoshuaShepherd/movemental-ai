# AU-05 — Dock affordance copy (visitor mental model)

**Prompt ID:** au-05-dock-affordance-copy  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-18  
**Source:** consultation §7 Tier 2 · [agent-room-conversation-choreography-model-ssot.md](../../notes/agent-room-conversation-choreography-model-ssot.md)

Paste the block below into a fresh agent turn.

---

## Problem statement

Visitors must learn an invisible rule: **collapsed pills open pages; typing opens conversation**. There is no persistent affordance. The dock mode switch is the highest-friction UX gap in an otherwise disciplined system.

---

## The prompt

> You are adding **minimal, Movemental-voiced affordance copy** near the agent dock so visitors understand screen-first pills vs conversation — without cluttering Ink Band or breaking the manuscript metaphor.
>
> ### Product rule (non-negotiable)
>
> - **Suggestions / float chips** → open structured screens (collapsed dock stays collapsed)
> - **Type and send** → expand drawer and talk to the concierge
> - Copy must be **plain**, not SaaS onboarding. No "AI assistant" jargon.
>
> ### 0. Orient first
>
> 1. Read [agent-room-chat-conversation-ui-ssot.md](../../notes/agent-room-chat-conversation-ui-ssot.md) §5.
> 2. Read `src/components/agent-room/shell/agent-dock.tsx`, `composer.tsx`, `voice-zone.tsx`.
> 3. Read `src/lib/agent-room/data/concierge-voice-lines.ts` for voice patterns.
> 4. Use [movemental-voice](https://github.com/) skill if available — short sentences, no em dashes, fiduciary tone.
>
> ### 1. Copy options (pick one primary + one secondary)
>
> **Primary (legend row under float chips or above composer):**
> - "Tap a suggestion to open a page. Type here to talk it through."
> - "Suggestions show you the sheet. Your words start a conversation."
>
> **Secondary (composer `aria-describedby`):**
> - Same text for screen readers.
>
> **Do not** use: "Ask AI anything", "Chat with us", intercom-style hints.
>
> ### 2. Implementation
>
> - Add a `.dockLegend` or reuse existing mono label primitive in `ink-band.module.css`:
>   - IBM Plex Mono, ~0.66rem, uppercase or sentence case (test both — prefer sentence case for warmth)
>   - `--ink-muted`, max-width aligned with composer card
> - Show legend when:
>   - Collapsed dock
>   - Guide phase
>   - Not `busy` during opening ink (optional: fade in after opening scene completes)
> - Hide when expanded drawer open (conversation context is obvious)
> - `prefers-reduced-motion`: no animation on legend
>
> ### 3. Optional: first-visit only
>
> If legend feels permanent-noisy, gate with `sessionStorage` key `agent-room-legend-seen` — dismiss after first send or first chip tap. Document trade-off in PR.
>
> ### 4. i18n / a11y
>
> - Legend associated with `#composer-input` via `aria-describedby`
> - Expand button keeps existing `aria-label`
>
> ### 5. Tests
>
> - Playwright: collapsed dock shows legend text (or first-visit behavior)
> - No regression on `agent-home-dock.spec.ts`
>
> ### 6. Docs
>
> One sentence in [agent-home-dock-functionality-2026-06-15.md](../../notes/agent-home-dock-functionality-2026-06-15.md) §3.

---

## Definition of done

- [ ] Visible affordance on collapsed dock (or documented first-visit gate)
- [ ] Copy matches Movemental voice; no chatbot clichés
- [ ] Screen reader association for composer
- [ ] `pnpm test:e2e tests/e2e/agent-home-dock.spec.ts` green
- [ ] Ink Band tokens only — no new hex

## Verification commands

```bash
pnpm typecheck
pnpm test:e2e tests/e2e/agent-home-dock.spec.ts
```

## Do not

- Add tooltip overlays that fight touch targets
- Change chip routing behavior in this slice
- Use Concept Modern typography on agent dock
