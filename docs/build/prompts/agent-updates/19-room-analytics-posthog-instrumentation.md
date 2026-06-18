# AU-19 — Room analytics PostHog instrumentation

**Prompt ID:** au-19-room-analytics  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-18  
**Source:** consultation §7 Tier 5 · [single-surface-url-architecture-seo-and-analytics.md](../../notes/single-surface-url-architecture-seo-and-analytics.md)

Paste the block below into a fresh agent turn.

---

## Problem statement

Hybrid routing, chip taps, Discuss transitions, stall recovery, and capture completion are **invisible to analytics**. Without PostHog events carrying `roomContext`, the team cannot optimize the concierge funnel.

---

## The prompt

> You are instrumenting the **agent room** with PostHog events — minimal schema, no PII in event properties, consistent with existing project analytics patterns.
>
> ### 0. Orient first
>
> - Grep `posthog`, `capture(`, analytics in `src/`
> - PostHog skill/plugin docs if configured
> - [single-surface-url-architecture-seo-and-analytics.md](../../notes/single-surface-url-architecture-seo-and-analytics.md)
> - Key hooks: `use-agent-room-hybrid.ts`, `agent-dock.tsx`, `move-classifier.ts`, `capture.ts`
>
> ### 1. Event catalog (implement all)
>
> | Event | Trigger | Properties |
> | --- | --- | --- |
> | `agent_room_chip_tap` | Float chip / suggest chip | `label`, `route_kind` (local\|agent\|navigate), `surface` (collapsed\|expanded), `screen_id` |
> | `agent_room_screen_show` | Scene `show` act or ui_render | `screen_id`, `scene`, `source` (local\|engine) |
> | `agent_room_turn` | Agent SSE complete | `phase`, `classifier` (open_text\|…), `had_ui_render` boolean |
> | `agent_room_dock_expand` | Drawer opens | `reason` (user\|send\|chip\|discuss) |
> | `agent_room_discuss_enter` | enterDiscuss | `reason` (readback\|objection\|chip\|agent) |
> | `agent_room_capture_submit` | submitLead success | `kind` (map\|paid\|free\|discuss), `source` |
> | `agent_room_stall_recovery` | Engine 503 / stall | `retryable` |
>
> **Never include:** raw email, message body, beat answers text.
>
> ### 2. Implementation
>
> - Central helper: `src/lib/analytics/agent-room-events.ts`
> - Guard: no-op when PostHog not initialized (dev/test)
> - Call sites in controllers — not in every presentational component
> - Use existing `anonId` / `sessionId` as PostHog distinct id suffix if available
>
> ### 3. roomContext snapshot
>
> On each `agent_room_turn`, attach:
> ```ts
> { screenId, phase, mapAnswersCount, inLocalScene, mode: 'hybrid'|'stub'|'stream' }
> ```
> Matches proxy `roomContext` shape for correlation.
>
> ### 4. Tests
>
> - Unit: mock PostHog capture — chip tap fires event with correct props
> - E2e: optional — do not require PostHog network in CI
>
> ### 5. Docs
>
> Add event catalog to `docs/build/notes/agent-room-analytics-events.md` (new, short).

---

## Definition of done

- [ ] ≥7 event types implemented
- [ ] No PII in properties (code review checklist in PR)
- [ ] Analytics helper no-ops safely without PostHog key
- [ ] Event catalog doc committed
- [ ] `pnpm typecheck` green

## Verification commands

```bash
pnpm typecheck
pnpm test:run tests/unit/*analytics* 2>/dev/null || pnpm test:run
```

## Do not

- Send full composer text to PostHog
- Block room function if analytics fails
- Add third-party scripts beyond existing PostHog integration
