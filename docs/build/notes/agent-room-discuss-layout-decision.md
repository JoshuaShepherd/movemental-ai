# Agent room — Discuss layout decision

**Index:** [agent-room-documentation-index.md](./agent-room-documentation-index.md)

**Status:** **Operator decision recorded** — shipped behavior documented here until AU-10 implements B-lite  
**Created:** 2026-06-30  
**Supersedes:** open AU-10 gate in documentation-index conflict table

---

## Decision

| Field | Value |
| --- | --- |
| **Chosen model (shipped)** | **Option A — expanded dock overlay (Model C)** |
| **Effective** | 2026-06-10 through present |
| **Charter note** | Discuss is a documented exception to “manuscript always visible” — expanded dock hides `ScreenZone` while conversation is active |
| **Future option** | **B-lite** (sheet + marginalia on `md+`, overlay on narrow) remains the recommended upgrade in [AU-10](../prompts/agent-updates/10-discuss-overlay-vs-marginalia.md) |

---

## Shipped behavior (code SSOT)

When Discuss phase is active (`enterDiscuss()`):

1. Dock expands; **screen sheet unmounts** behind scrim (`dockExpanded` guard in `agent-room-view.tsx`).
2. Thread + composer live in `AgentDock` / `discuss-thread.tsx`.
3. Collapsed Discuss caption follows **choreography I1** (short caption line only) — not multi-line `DiscussVoice` in the band ([chat UI SSOT §6.3](./agent-room-chat-conversation-ui-ssot.md) deprecated for this).
4. `DiscussOverlay` component exists but is **unwired** per chat UI SSOT §15.

**Wiring SSOT:** [agent-room-chat-conversation-ui-ssot.md](./agent-room-chat-conversation-ui-ssot.md)  
**Caption invariants:** [agent-room-conversation-choreography-model-ssot.md](./agent-room-conversation-choreography-model-ssot.md) (I1–I6)

---

## Product intent vs shipped (historical)

| Doc | Says | Trust for wiring |
| --- | --- | --- |
| [agent-room-long-form-discussion-ui.md](./agent-room-long-form-discussion-ui.md) §5.1 | Mixed Model B recommendation + Model C overlay notes | **Intent only** — layout: this doc |
| INT-08 integration pack | Discuss foundation Done | Engine + capture gate — not layout |
| INK_BAND charter | Manuscript not chat app | Discuss overlay documented as exception below |

**INK_BAND footnote (added 2026-06-30):** Discuss phase may occupy the full viewport below mast via expanded dock. Guide phase remains manuscript-first.

---

## When to revisit

Implement AU-10 **B-lite** when:

- Operator confirms sheet-visible Discuss on desktop is worth the refactor cost, or
- User research shows overlay Discuss breaks readback / path context retention.

Until then, treat **Model C overlay** as canonical shipped behavior in page scripts, Playwright, and orchestration docs.

---

*Recorded 2026-06-30 to close documentation-index drift on Discuss layout.*
