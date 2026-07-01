# Composer & drawer — global visitor expectations

**Purpose:** Universal rules for the agent dock on every stub screen in `/agent`. Each page script adds a **Composer & drawer** section with screen-specific chips and quirks; this file is the shared mechanics layer.

**Code SSOT:** `move-classifier.ts`, `navigation-shape.ts`, `route-input.ts`, `renderable-topics.ts`, `composer-routing.ts`, `shell/agent-dock.tsx`, `use-agent-room-hybrid.ts`

**Related:** [00-room-arrival-and-routing.md](./00-room-arrival-and-routing.md) (shell + classifier tree), [01-home.md](./01-home.md) (worked example)

---

## 1. Two outcomes for every send

Every chip tap or composer **Send** is classified **LOCAL** or **AGENT** before anything visible happens.

| Classification | Network | Typical visitor experience |
| --- | --- | --- |
| **LOCAL** | None (scripted `SCENES`) | Sheet may swap; short **ink caption** in collapsed handwriting strip |
| **AGENT** | POST `/api/agent-room/turn` (SSE) | Drawer **expands**; reply streams in **thread**; host may call `ui_render` tools |

First-send routing uses **navigation shape** (`navigationShape()`), not invisible session heuristics — see §4.

---

## 2. `chatActive` is not “drawer is open”

| Situation | `chatActive` | Typed send | Composer placeholder |
| --- | --- | --- | --- |
| Collapsed dock, no prior thread | false | Navigation-shape classifier | `Search or ask…` |
| Expanded drawer, **empty** thread, first send | false | Same classifier | `Search or ask…` |
| Thread has ≥1 exchange | true | **AGENT always** | `Ask a follow-up…` |
| Discuss phase active | n/a | **AGENT always** | — |

While typing (any state): navigation-shaped buffer shows `↵ opens the {screen} page`; otherwise `↵ starts a chat` (advisory only).

After the first AGENT exchange, all further typing is conversational until **replay** (logo / ↺).

---

## 3. Float chips — two families

### Opening labels (four only)

| Label | Collapsed dock | Expanded drawer |
| --- | --- | --- |
| Get a clear next AI step | LOCAL → safety flow | LOCAL → safety flow |
| About Movemental | LOCAL → about | AGENT → speak + `show_about` |
| What does it cost? | LOCAL → pricing | AGENT → speak + `show_pricing` |
| Get in touch | LOCAL → contact | AGENT → speak + `show_contact` |

Expanded informational chips **must not** re-author sheet facts in thread prose (see §5 / `renderable-topics.ts`).

If one of these labels appears as a float chip on **any** inner screen, the same collapsed/expanded rule applies.

**G1 reversal** (`Actually, just answer me ↩`) appears only for **typed LOCAL** sends — never chip taps.

### Scene follow-up chips (everything else)

All chips bound to a scene target — including **See the whole path**, **Map where we actually stand**, **Show me Safety**, **↺ Start over** — run **LOCAL scenes regardless of dock state**.

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
2. **Meta/objection** or streak thresholds → LOCAL `discussOffer` — **blocked on `beat` screen**  
3. **`navigationShape()`** → LOCAL if short + leading/sole keyword + not hedged; else AGENT  
4. (Legacy regex table in `route-input.ts` is keyword source only — not the routing decision)

Examples that must stay **AGENT**: *question about donors*, *i'm worried about what AI will cost us in trust*, *how should we think about AI and our donors?*

Implementation: `src/lib/agent-room/navigation-shape.ts`.

---

## 5. What the visitor sees after Send

| Classification | Drawer | Sheet | Agent text |
| --- | --- | --- | --- |
| **LOCAL** (typed) | Collapsed or auto-collapse | Swaps | Ink caption + reversal affordance (~8s) |
| **LOCAL** (chip) | Same | Swaps | Ink caption only |
| **AGENT** | Auto-expands | Mounted behind scrim (I6) | Thread; host **must** `ui_render` on renderable topics |

**Reveal over hide (G5):** If an AGENT turn completes on a **renderable topic** with no `ui_render`, the client **auto-issues the inferred render**, **auto-collapses** to reveal the sheet, and logs **`speakshow.violation`**. **`↩ Back to {screen}`** remains for **non-renderable** prose-only turns only.

**Auto-collapse:** When `screenKey` changes (LOCAL `show` or engine `ui_render`), the dock collapses so the new sheet is visible.

---

## 6. Expand chat without sending

- Sheet stays mounted behind scrim (I6); **`behind: {screen}`** indicator names it.
- Empty thread → **Ways in** door panel.
- Opening chip labels use expanded routing (§3).
- Escape, backdrop, collapse control, **behind:** tap, or **`↩ Back to`** (non-renderable only) restores the sheet.

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

## 9. Cross-refs

- Navigation-shape SSOT: `navigation-shape.ts`
- Renderable topics SSOT: `renderable-topics.ts` (`RENDERABLE_TOPIC_IDS`)
- Speak-and-show host rule: `docs/build/agents/agent-room/prompts/room-host.md`
