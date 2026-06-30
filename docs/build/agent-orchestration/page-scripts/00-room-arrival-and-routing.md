# Room arrival and global routing

This document describes everything that happens **before and around** any specific screen — the shell visitors land in, how input is classified, and the global moves available from anywhere.

---

## 1. Arrival

A visitor opens `https://movemental.ai/` or `/agent`. The site root redirects to the agent room.

**Before JavaScript loads:** A static fallback shows the home headline and body copy so the page is not blank. A noscript message explains that the full interactive guide needs JavaScript.

**After hydration:** The live agent room mounts. Default runtime is **hybrid** — local scripted scenes for most chip and regex paths; the live language model only when input is classified **AGENT**.

The room has three zones:

| Zone | What it is |
| --- | --- |
| **Mast** | Top bar: Movemental logo, audience links (Non-profits · Churches · Institutions), sign-in |
| **Screen** | Full-bleed “manuscript sheet” — one pre-built page at a time |
| **Agent dock** | Bottom: collapsed composer + ink caption **or** expanded conversation drawer |

---

## 2. Opening sequence (every cold visit)

When the room boots with no prior session, it runs the **`opening`** scene:

1. **Show** the home screen on the sheet.
2. **Wait** about half a second (fonts and layout settle).
3. **Say** one ink line in the dock’s handwriting strip:  
   *"Movemental meets leaders and organizations where they are. Let me show you how we can help."*
4. **Wait** briefly.
5. **Gesture** — underline the phrase *"the trust their work depends on"* on the home body.
6. **Suggest** four float chips above the composer:
   - **Get a clear next AI step** (lead)
   - About Movemental
   - What does it cost?
   - Get in touch

While this plays, the dock is **collapsed**. The ink line is short — one line, not a paragraph. Long answers belong in the expanded thread (see invariants I1–I6 in the choreography SSOT).

**Replay:** Tapping the logo or the ↺ control cancels any in-flight scene and runs `opening` again — home screen, greeting, gesture, default chips.

---

## 3. The dock — collapsed vs expanded

**Global composer/drawer reference:** [00-composer-drawer-global.md](./00-composer-drawer-global.md) — per-screen chip tables live in each page script.

### Collapsed (default)

- Single-line text field: placeholder *"Type here, or tap a suggestion…"*
- Send button, expand-chat control, drawer handle
- **Handwriting strip** above the composer — the agent’s current ink line
- **Float chips** — tappable suggestions from the last `suggest` act or engine `suggest` chunk

### Expanded

- Full-height conversation panel: message thread + composer
- **The screen sheet is hidden behind a scrim** — conversation owns the viewport below the mast (invariant I6)
- Empty thread may show **Ways in** doors (audience segments and curated entry points)
- Escape, backdrop tap, or collapse control restores the sheet at whatever screen was last mounted

**Auto-expand:** Only **AGENT-classified** sends expand the drawer (typed fallback, Discuss phase, expanded informational chips, or streaming agent turns). **LOCAL** sends — including regex-routed first messages and collapsed float chips — swap the sheet without expanding; if the drawer was already open, a sheet change auto-collapses it so the new page is visible.

### Two channels of agent speech

| Channel | Where | Used for |
| --- | --- | --- |
| **Ink caption** | Handwriting strip (collapsed) | Local `say` acts; short streamed lines |
| **Thread** | Expanded drawer | Full agent replies, AGENT-classified turns |

They are mutually exclusive in presentation: collapsed shows caption; expanded shows thread. AGENT turns always render in the expanded thread.

---

## 4. How every visitor action is classified (hybrid)

When the visitor taps a chip, types and sends, taps a leader portrait, or answers a beat question, the system decides **LOCAL** (run a scripted scene, usually with a screen swap) or **AGENT** (POST to `/api/agent-room/turn`, stream SSE from the live host).

Decision tree (simplified):

```
Visitor action
    │
    ├─ Discuss phase active? ───────────────────► AGENT (always)
    │
    ├─ chatActive? (thread or server history has ≥1 turn)
    │       └─ typed text ───────────────────────► AGENT (bypasses regex)
    │       (NOT the same as “drawer is expanded” — see §5)
    │
    ├─ Meta/objection streak + Discuss enabled? ─► LOCAL discussOffer scene
    │
    ├─ Opening chip on collapsed dock? ──────────► LOCAL scene (screen-first)
    │       (About → about, Cost → pricing, etc.)
    │
    ├─ Opening chip on expanded drawer? ─────────► AGENT for info chips;
    │       lead chip still LOCAL → safety flow
    │
    ├─ Typed text matches regex table?
    │       ├─ high-confidence? ───────────────────► LOCAL scene
    │       └─ weak match ─────────────────────────► AGENT
    │
    └─ else ─────────────────────────────────────► AGENT (open_text)
```

**Important:** On the **collapsed** dock, default opening chips almost always open a **local scene** that begins with swapping the sheet. That is why tapping “What does it cost?” shows the pricing page instantly with no network call.

On the **expanded** drawer, the same chip labels for About, Cost, and Get in touch route to **AGENT** — the live model answers in the thread (and may still call tools to show a screen).

### Sheet visibility when the drawer is open

The sheet **stays mounted behind the scrim** while the drawer is expanded — the visitor cannot see it. When a LOCAL scene (or an agent `ui_render`) changes the sheet, `screenKey` updates and the dock **auto-collapses**, revealing the new page. AGENT turns that reply in prose only leave the sheet unchanged and hidden until the visitor collapses manually.

---

## 5. Typed text — regex router (first message, `chatActive` false)

When the thread has **no prior turns** (`chatActive` is false), free text is matched against an ordered regex table. **First match wins**, then **high-confidence gating** decides LOCAL vs AGENT. Manually expanding the empty drawer does **not** skip this table — only a prior exchange in the thread does.

| If the message sounds like… | Scene runs | Sheet shows |
| --- | --- | --- |
| path, how it works, sandbox, training, tech | `toPath`, `toSandbox`, etc. | path or stage detail |
| safety, charter, handbook | `toSafety` | safety |
| cost, price, afford | `cost` | pricing |
| faq, questions | `toFaq` | faq |
| contact, email, human | `talkToUs` | contact |
| who, behind, founders | `whoBehind` | founders |
| what is movemental, tell me about movemental, about movemental | `whatIs` | about |
| stuck, next step, assess, safe, help | `toSafetyFlow` | safety flow wizard |

**Gotcha:** A bare *about* inside a longer sentence (e.g. *"a question about donors"*) is usually **low-confidence** and routes **AGENT**, not the About screen. Command-like phrases (*"tell me about movemental"*) route LOCAL.

**No match, or weak match:** The turn is classified **AGENT** — the drawer expands and the live host streams a reply (unless the engine is unavailable, in which case a stall recovery line appears).

**After the first agent exchange:** `chatActive` becomes true; all further typed messages bypass regex and go AGENT.

**Stub mode only:** Unmatched text gets a fixed refusal line with no screen change: *"That's outside what I can help with."*

---

## 6. Global moves (any screen)

| Action | What happens |
| --- | --- |
| Logo / ↺ replay | Cancel scenes → `opening` → home + default chips |
| **↑ Home** crumb (inner screens) | Same as replay |
| Leader portrait on home | `leaderScene(i)` → leader profile screen |
| Expand dock + type (empty thread) | Same classifier as collapsed first send — expand alone does not force AGENT |
| Expand dock + type (after prior agent turn) | AGENT turn → thread streaming |
| Deep link `?ask=…&from=…` | After opening settles, first turn sent automatically (document handoff) |

---

## 7. Runtime modes (summary)

| Mode | When LLM runs |
| --- | --- |
| **hybrid** (default) | AGENT-classified moves only |
| **stub** | Never — all local |
| **stream** (legacy) | Every composer action |

---

## 8. What to read next

- [01-home.md](./01-home.md) — the opening sheet and default chips in detail
- [02-safety-flow.md](./02-safety-flow.md) — primary on-ramp from the lead chip
- [../overview.md](../overview.md) — full routing tables and redesign levers
