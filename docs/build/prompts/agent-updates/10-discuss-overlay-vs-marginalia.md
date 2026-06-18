# AU-10 — Discuss overlay vs marginalia (decision + implementation)

**Prompt ID:** au-10-discuss-layout  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-18  
**Source:** [agent-room-long-form-discussion-ui.md](../../notes/agent-room-long-form-discussion-ui.md) · [agent-room-conversation-choreography-model-ssot.md](../../notes/agent-room-conversation-choreography-model-ssot.md)

**Operator gate:** Requires explicit choice in PR before large UI refactor.

Paste the block below into a fresh agent turn.

---

## Problem statement

Ink Band charter: **not a chat UI**. Discuss shipped as **expanded drawer overlay** (Model C) hiding the sheet. Long-form spec recommended **Model B** — manuscript stays visible, marginalia accumulates on sheet. Tension is unresolved; product must choose and implement consistently.

---

## The prompt

> You are resolving the **Discuss layout strategy** for `/agent` and implementing the chosen model with Ink Band fidelity.
>
> ### Step 0 — Operator decision (mandatory first output)
>
> Before coding, print this decision block and **wait for confirmation** if running interactively; if unattended, implement **Option B-lite** as default (see below).
>
> | Option | Behavior | Charter fit |
> | --- | --- | --- |
> | **A. Keep overlay** | Expanded drawer hides screen; thread in dialog | Lower — generic chat at peak engagement |
> | **B. Sheet marginalia** | Screen stays visible; `DiscussFold` / transcript beside sheet | Higher — "mark up one document" |
> | **B-lite (recommended)** | Guide: keep current overlay for AGENT thread; Discuss: sheet visible + marginalia column on `md+`, overlay on narrow viewports | Pragmatic |
>
> Document choice in `docs/build/notes/agent-room-discuss-layout-decision.md`.
>
> ### 0. Orient first
>
> - [agent-room-long-form-discussion-ui.md](../../notes/agent-room-long-form-discussion-ui.md) §5
> - [agent-room-conversation-choreography-model-ssot.md](../../notes/agent-room-conversation-choreography-model-ssot.md) — I1–I6 invariants
> - `src/components/agent-room/discuss/discuss-thread.tsx`, `DiscussFold`
> - `src/components/agent-room/agent-room-view.tsx` — `ScreenZone` + dock expanded guard
>
> ### 1. If Option B or B-lite
>
> - Discuss phase: **do not unmount** `ScreenZone` when dock expanded on `md+`
> - Render transcript in `DiscussFold` or side column with editorial measure (max ~68ch)
> - Composer may stay in dock footer OR move to sheet footer — prefer **dock composer** for one input locus
> - Mobile `<768px`: fall back to full overlay (acceptable charter exception)
> - Typography: thread body = Inter; agent emphasis ≠ Caveat bubbles
>
> ### 2. If Option A (keep overlay)
>
> - Update [INK_BAND_DESIGN_CHAIN.md](../../../design/INK_BAND_DESIGN_CHAIN.md) charter footnote: Discuss exception documented
> - Improve overlay scrim + "Return to sheet" affordance
> - Ensure readback screen content preserved in Discuss entry context
>
> ### 3. Invariants (must not break)
>
> - I2: AGENT prose in thread, not caption band
> - I4: `dockState` drives surface switch
> - No Slack-style avatars
> - `prefers-reduced-motion` honored
>
> ### 4. Tests
>
> - Playwright Discuss spec: screen visible (if B-lite desktop)
> - Visual: screenshot in PR for 1280px and 390px widths
>
> ### 5. Update SSOT
>
> Supersede conflicting sections in long-form discussion UI note with decision doc link.

---

## Definition of done

- [ ] Decision doc committed with chosen option and rationale
- [ ] Discuss layout matches decision on desktop + mobile
- [ ] Charter doc or discussion note updated
- [ ] Discuss e2e still green
- [ ] No new hex colors; Ink Band tokens only

## Verification commands

```bash
NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1 pnpm test:e2e tests/e2e/agent-room-discuss.spec.ts
pnpm typecheck
```

## Do not

- Implement both models behind random flag
- Replace sheet with full-height message list
- Ship without decision doc
