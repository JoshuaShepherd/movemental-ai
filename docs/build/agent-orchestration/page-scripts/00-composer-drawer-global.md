# Composer & drawer — global visitor expectations

**Purpose:** Universal rules for the agent dock on every stub screen in `/agent`. Each page script adds a **Composer & drawer** section with screen-specific chips and quirks; this file is the shared mechanics layer.

**Code SSOT:** `move-classifier.ts`, `route-input.ts`, `composer-routing.ts`, `shell/agent-dock.tsx`, `use-agent-room-hybrid.ts`

**Related:** [00-room-arrival-and-routing.md](./00-room-arrival-and-routing.md) (shell + classifier tree), [01-home.md](./01-home.md) (worked example)

---

## 1. Two outcomes for every send

Every chip tap or composer **Send** is classified **LOCAL** or **AGENT** before anything visible happens.

| Classification | Network | Typical visitor experience |
| --- | --- | --- |
| **LOCAL** | None (scripted `SCENES`) | Sheet may swap; short **ink caption** in collapsed handwriting strip |
| **AGENT** | POST `/api/agent-room/turn` (SSE) | Drawer **expands**; reply streams in **thread**; host may call `ui_render` tools |

This is why typing *"what does it cost?"* on a cold visit can open the pricing sheet instead of feeling like chat — high-confidence regex routing is LOCAL by design.

---

## 2. `chatActive` is not “drawer is open”

| Situation | `chatActive` | Typed send | Visitor signal |
| --- | --- | --- | --- |
| Collapsed dock, no prior thread | false | Classifier (regex + confidence + Discuss signals) | Dock legend |
| Expanded drawer, **empty** thread, first send | false | **Same classifier** — expanding alone does not force chat | Placeholder: *Ask a question — or tap a door* |
| LOCAL first send from expanded empty thread | false | LOCAL scene + auto-collapse | Brief `Showing {screen} →` caption |
| Thread (or server history) has ≥1 user+assistant exchange | true | **AGENT always** — regex bypassed | — |
| Discuss phase active | n/a | **AGENT always** | — |

After the first AGENT exchange, all further typing is conversational until **replay** (logo / ↺).

---

## 3. Float chips — two families

### Opening labels (four only)

These labels appear on the home opening scene and flip behavior by dock state:

| Label | Collapsed dock | Expanded drawer |
| --- | --- | --- |
| Get a clear next AI step | LOCAL → safety flow | LOCAL → safety flow |
| About Movemental | LOCAL → about | AGENT utterance |
| What does it cost? | LOCAL → pricing | AGENT utterance |
| Get in touch | LOCAL → contact | AGENT utterance |

If one of these labels appears as a float chip on **any** inner screen (e.g. **What does it cost?** on path), the same collapsed/expanded rule applies.

### Scene follow-up chips (everything else)

All chips bound to a scene target (`to: "toPath"`, `to: "toBeat"`, etc.) — including **See the whole path**, **Map where we actually stand**, **Show me Safety**, **↺ Start over** — run **LOCAL scenes regardless of dock state**. Tapping them swaps or updates the sheet; they never become AGENT utterances.

### Special chip targets (no scene swap)

| Target | Effect |
| --- | --- |
| `focusMapEmail` | Scroll/focus inline email on readback — **stay on readback** |
| `focusHandbook` | Expand dock + handbook email capture in dock footer |
| `toEnroll` | Navigate to `/enroll` |
| `toOrgAssessment` | Navigate to `/assess` |
| `toDiscuss` (flag on) | Enter Discuss phase (expanded AGENT thread) |
| `toDiscuss` (flag off) | LOCAL `toDiscuss` capture scene |

---

## 4. Typed text — classifier order (when `chatActive` is false)

1. **Discuss phase** → AGENT  
2. **Meta/objection** or streak thresholds → LOCAL `discussOffer` (consent chips) — **blocked on `beat` screen**  
3. **Regex match** (`route-input.ts`, first match) → LOCAL if **high-confidence**; else AGENT  
4. **No match** → AGENT (`open_text`)

High-confidence gating prevents bare keywords inside long sentences from hijacking navigation (e.g. *"a question about donors"* → AGENT, not about screen).

Full regex table: [00-room-arrival-and-routing.md](./00-room-arrival-and-routing.md) §5.

---

## 5. What the visitor sees after Send

| Classification | Drawer | Sheet | Agent text |
| --- | --- | --- | --- |
| **LOCAL** | Stays collapsed, or **auto-collapses** if already open | Swaps/updates when scene includes `show` | Ink caption (`say` acts) — not thread prose |
| **AGENT** | **Auto-expands** (or stays expanded) | Current sheet **stays mounted behind scrim** (I6); **behind:** indicator always visible; optional `ui_render` | Thread streaming; host **must** call matching show tool on renderable topics |

**Auto-collapse:** When `screenKey` changes (new `show` act or engine render), the dock collapses so the new sheet is visible. Voice-only LOCAL scenes (`whySafetyFirst`, `leaderWork`) do **not** change `screenKey` — drawer state unchanged.

**No silent stale sheet:** AGENT reply **without** a show tool on a renderable topic violates host policy (speak-and-show). The client backstop: **`behind: {screen}`** in the drawer header (tap to collapse) and **`↩ Back to {screen}`** in the thread when a turn completes with no `ui_render`. Collapse manually or tap either control to see the sheet again.

---

## 6. Expand chat without sending

- Sheet stays mounted behind scrim (invariant **I6**); **`behind: {screen}`** indicator names it while the drawer is open.
- Empty thread → **Ways in** door panel with placeholder *"Ask a question — or tap a door"*; first send still uses classifier unless `chatActive`.
- Opening chip labels use expanded routing (§3).
- Escape, backdrop tap, collapse control, **behind:** tap, or **`↩ Back to`** affordance restores the last mounted sheet.

---

## 7. Runtime modes

| Mode | Composer behavior |
| --- | --- |
| **hybrid** (default) | §1–§6 above |
| **stub** | Never AGENT; unmatched typed text → fixed refusal line, no LLM |
| **stream** (legacy) | Every send → AGENT |

---

## 8. Document pages (`/agent/about`, …)

Not covered here — composer always **navigates** to `/agent?ask=…` (no local classifier on the document surface). See [19-document-pages.md](./19-document-pages.md).

---

*When global rules change, update this file first, then each page’s **Composer & drawer** section for deltas only.*
