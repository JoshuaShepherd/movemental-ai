# Agent Room — conversation & choreography model (SSOT)

**Status:** Authoritative. Defines where the concierge's text renders, when the dock is open or closed, and what the ink voice may and may not carry.

**Created:** 2026-06-17  
**Implemented:** 2026-06-17 (this repo + `movemental-ai-agents` caption rail)

**Supersedes:** `agent-room-chat-conversation-ui-ssot.md` surface matrix, length routing, and duplicate guards.

---

## 0. Mental model

The agent room has exactly **two text homes**, governed by **`dockState ∈ { collapsed, expanded }`**:

| `dockState` | Agent text home |
|---|---|
| `collapsed` | Ink caption — one short, non-wrapping Caveat line (scene choreography only) |
| `expanded` | Thread — body prose of any length (all conversation) |

They are never visible at once.

---

## 1. Locked invariants (I1–I6)

- **I1** Ink caption is one short, non-wrapping line — never an agent answer.
- **I2** Every AGENT turn renders in the expanded thread only.
- **I3** Collapsed and conversation are mutually exclusive; expansion holds until user collapses.
- **I4** `dockState` is the only surface switch — not phase, length, or mode.
- **I5** Caption validator caps ink-bound strings; overflow → thread + expand.
- **I6** Expanding overlays the screen behind a scrim; collapse restores it.

---

## 8. Client state model

```ts
type DockState = "collapsed" | "expanded";

type ThreadTurn = {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
  passage?: boolean; // styling hint only
};
```

Implementation: `useRoomThread`, `AgentDock` (`dockState`), `DiscussThread` (single renderer).

---

## 11. Open questions (resolved during implementation)

1. **Caption cap unit** — `CAPTION_CHAR_FALLBACK = 80` in `caption-validator.ts`; optional canvas measure when band width known.
2. **Scrim affordance** — collapse via backdrop / Escape / collapse button only (no tap-to-return hint on screen).
3. **Caption persistence on collapse** — last eligible `voiceLines` caption from scene choreography; agent prose never persists in band.

---

## 12. Changelog

| Date | Change |
|---|---|
| 2026-06-17 | Initial SSOT + implementation: single `thread`, `dockState` switch, caption-only band, scrim, phase demoted to engine-only. |
