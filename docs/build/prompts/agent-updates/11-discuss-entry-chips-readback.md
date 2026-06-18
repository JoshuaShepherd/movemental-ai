# AU-11 — Discuss entry chips on readback

**Prompt ID:** au-11-discuss-readback-chips  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-18  
**Source:** [agent-room-long-form-discussion-ui.md](../../notes/agent-room-long-form-discussion-ui.md) §4.1 · consultation §7 Tier 3

**Depends on:** AU-09 (Discuss flag validated) recommended.

Paste the block below into a fresh agent turn.

---

## Problem statement

Discuss entry should be **explicit before implicit**. After readback — when visitors have the most context — a "Keep talking about this" chip should offer Discuss without waiting for meta-objection inference.

---

## The prompt

> You are adding **explicit Discuss entry chips on the readback screen** (local stub + engine stream paths) and wiring them to `enterDiscuss` with reason `readback`.
>
> ### 0. Orient first
>
> - `src/components/agent-room/screen/stub/readback-screen.tsx`
> - Stream readback: `src/components/agent-room/screen/stream/readback.tsx` (if exists)
> - `src/lib/agent-room/discuss-entry.ts` — `enterDiscuss(reason)`
> - `src/lib/agent-room/data/scenes.ts` — readback follow-up chips
> - Engine: `show_readback` fork intents in diagnostician tools
>
> ### 1. Chip design
>
> **Primary chip (when `DISCUSS_ENABLED`):**
> - Label: "Keep talking about this"
> - Say utterance (expanded): optional user line prefilled
> - Action: `enterDiscuss('readback')` — **local**, no SSE for entry
>
> **Secondary chips (existing):** pricing, path, handoff — do not remove.
>
> Place chips in readback fork row consistent with Ink Band chip primitive (one lead chip may use highlight yellow if product designates this as lead — otherwise standard chip).
>
> ### 2. Local readback path
>
> After `computeMapRead` / stub readback render:
> - Append suggest act or static chips calling `onDiscussEnter` prop
> - Thread from `use-agent-room-hybrid.ts` / stub hook
>
> ### 3. Engine readback path
>
> Diagnostician `show_readback` returns `fork` intents — add `discuss` intent:
> - Client maps `fork: "discuss"` → enterDiscuss
> - Update engine tool schema + seed if needed (`movemental-ai-agents`)
> - Zod honesty rail must validate new fork enum
>
> ### 4. UX
>
> - Entering Discuss from readback: dock expands, readback remains on sheet (or visible per AU-10)
> - First agent turn receives readback context in `roomContext` / history preamble
>
> ### 5. Tests
>
> - Unit: fork intent parser includes discuss
> - E2e (flag on): readback → tap chip → Discuss phase active
> - Flag off: chip hidden OR routes to discuss capture stub (honest)
>
> ### 6. Docs
>
> Update [agent-room-suggestion-pills-inventory-and-recommendations.md](../../notes/agent-room-suggestion-pills-inventory-and-recommendations.md) with readback Discuss chip row.

---

## Definition of done

- [ ] "Keep talking about this" visible on readback when Discuss enabled
- [ ] Chip triggers `enterDiscuss('readback')` without erroneous `/turn` on entry
- [ ] Engine readback fork supports discuss (if engine path used)
- [ ] Flag-off behavior honest (hidden or capture stub)
- [ ] Tests green

## Verification commands

```bash
NEXT_PUBLIC_AGENT_ROOM_DISCUSS=1 pnpm test:e2e tests/e2e/agent-room-discuss.spec.ts
pnpm test:run tests/unit/*discuss* 2>/dev/null || true
pnpm typecheck
```

## Do not

- Auto-enter Discuss silently after readback
- Remove pricing/path fork chips
- Add fourth unrelated CTA competing with Safety on-ramp
