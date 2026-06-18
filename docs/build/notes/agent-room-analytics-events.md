# Agent Room analytics events

**Path:** `docs/build/notes/agent-room-analytics-events.md`  
**As of:** 2026-06-18 (AU-19)

PostHog event catalog for the `/agent` room. Implementation: `src/lib/analytics/agent-room-events.ts`.

## Guardrails

- No PII in properties — never send raw email, message body, or beat answer text.
- Analytics failures are swallowed; the room never blocks on capture.
- No-op when `NEXT_PUBLIC_POSTHOG_KEY` is unset (dev/test/CI).

## Identity

- `anon_id_suffix` / `session_id_suffix` — last 8 chars of room storage ids (`movemental-room-anon`, `movemental-room-session`).
- `mode` — effective runtime mode (`hybrid` | `stub`; `stream` maps to hybrid unless legacy flag).

## Events

| Event | Trigger | Properties |
| --- | --- | --- |
| `agent_room_chip_tap` | Float / suggest chip tap | `label`, `route_kind` (`local` \| `agent` \| `navigate`), `surface` (`collapsed` \| `expanded`), `screen_id` |
| `agent_room_screen_show` | Local `show` act or engine `ui_render` | `screen_id`, `scene`, `source` (`local` \| `engine`) |
| `agent_room_turn` | Agent SSE turn completes | `phase`, `classifier`, `had_ui_render`, `roomContext` |
| `agent_room_dock_expand` | Drawer opens | `reason` (`user` \| `send` \| `chip` \| `discuss` \| `agent`) |
| `agent_room_discuss_enter` | `enterDiscuss` | `reason` (`readback` \| `objection` \| `chip` \| `agent`) |
| `agent_room_capture_submit` | `submitLead` from room | `kind` (`map` \| `paid` \| `free` \| `discuss`), `source` (`scene` \| `dock` \| `overlay`) |
| `agent_room_stall_recovery` | Engine 503 / stall | `retryable` |

### `roomContext` on `agent_room_turn`

```ts
{
  screenId: string;
  phase: "guide" | "discuss";
  mapAnswersCount: number;
  inLocalScene: boolean;
  mode: "hybrid" | "stub" | "stream";
}
```

Matches the proxy `roomContext` shape for server correlation.

## Env

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_POSTHOG_KEY` | PostHog project API key (optional) |
| `NEXT_PUBLIC_POSTHOG_HOST` | Ingest host (default `https://us.i.posthog.com`) |
