# Home screen

**Screen id:** `home`  
**Role:** The opening manuscript — trust headline, value proposition, and leader portrait band. This is the default sheet after boot and after replay.

---

## 1. What this page is

The home screen is not a marketing landing page bolted beside a chat widget. It **is** the agent room’s starting manuscript: a centered sheet with one headline, one body paragraph, and a horizontal band of movement-leader portraits. The audience eyebrow (Non-profit · Church · Institution · Leader) lives in the mast, not on the sheet.

The body includes a highlighted phrase — *"the trust their work depends on"* — that the opening choreography underlines with an ink gesture.

---

## 2. How you get here

| Path | What triggers it |
| --- | --- |
| Cold visit | Automatic — first act of `opening` scene |
| Replay | Logo tap, ↺ control, or chip labeled ↺ Start over |
| From inner screens | **↑ Home** crumb or logo |

You cannot reach home through the beat or safety-flow wizards except by replay.

---

## 3. What appears on the sheet

<!-- LIVE-COPY:home:begin — synced from src/lib/agent-room/data/home-copy.ts; do not edit manually -->
**Headline:**  
*"Navigate AI without eroding the trust you spent decades building."*

**Body:**  
*"We help mission-driven organizations respond to AI without losing **the trust their work depends on**, through one simple path: use AI safely, experiment to find valuable, ethical use cases, train your people in AI leadership and maturity, and then build custom technological solutions tailor-made for your organization."*

**Leader band:** Scrollable portraits of movement leaders (names and credentials from the leaders data). Each portrait is tappable.

<!-- LIVE-COPY:home:end -->

The home sheet is **centered** with no top crumb — it is the only screen without the inner-page margin rules.

---

## 4. What the agent does (opening choreography)

After the home screen appears, in order:

1. Wait ~560ms.
2. **Say:** *"Movemental meets leaders and organizations where they are. Let me show you how we can help."*
3. Wait ~150ms.
4. **Gesture:** underline `#phrase` (the trust phrase in the body).
5. **Suggest** four chips (see section 5).

The dock stays **collapsed**. The ink line appears in the handwriting strip, not in a full thread.

---

## 5. Float chips after opening

| Chip label | Collapsed dock | Expanded dock |
| --- | --- | --- |
| **Get a clear next AI step** (lead) | LOCAL → safety flow wizard | LOCAL → safety flow wizard |
| About Movemental | LOCAL → about screen | AGENT → speak + `show_about` (renders the sheet; no re-authored facts) |
| What does it cost? | LOCAL → pricing screen | AGENT → speak + `show_pricing` (renders the sheet; no re-authored facts) |
| Get in touch | LOCAL → contact screen | AGENT → speak + `show_contact` (renders the sheet; no re-authored facts) |

Collapsed dock stays **screen-first** (instant LOCAL swap). Expanded drawer keeps conversation open but informational chips must **speak and show** the canonical sheet — not free prose with duplicated facts.

---

## 6. What the visitor can do next

**Global mechanics:** [00-composer-drawer-global.md](./00-composer-drawer-global.md) — `chatActive`, navigation-shape routing, composer hints, reversal affordance.

### Tap a float chip

Routes per section 5. **Chip taps never show the G1 reversal affordance** — chips are explicit navigation.

### Tap a leader portrait

Runs `leaderScene(index)`:

- Shows the **leader** screen for that person.
- Agent says *"This is {name}."* then the profile lede (if approved copy exists).
- Follow-up chips depend on whether a full profile is in the catalog.
- The dock **stays collapsed** unless the visitor had already expanded it; either way, the sheet swap is visible because leader scenes always change `screenKey`, which auto-collapses an open drawer (see section 7).

### Type in the composer

Every send is classified **LOCAL** (scripted scene + sheet swap) or **AGENT** (live model in the expanded thread). Behavior keys off the **shape of the input**, not invisible session state.

**`chatActive`** is true only when the thread (or server history) already has at least one turn. It is **not** the same as “the drawer is open.”

| Situation | `chatActive` | Typed send |
| --- | --- | --- |
| Collapsed dock, first send | false | Navigation-shape classifier |
| Expanded drawer, empty thread, first send | false | Same classifier |
| After any prior user+assistant exchange | true | **AGENT always** |

**Navigation-shape rule** (`navigationShape()` in `src/lib/agent-room/navigation-shape.ts`) — applies when `chatActive === false`:

1. **Discuss phase** or **meta/objection** phrasing → discuss offer or AGENT (unchanged; see global doc).
2. First send routes **LOCAL** only if **all** hold:
   - **Short:** ≤ 5 content tokens after stripping filler (`what / is / the / a / does / it`, …).
   - **Leading or sole keyword:** a known route keyword (`cost`, `price`, `pricing`, `about`, `contact`, `path`, `founders`, …) is the first content token **or** the only content token (plus phrase-level matches like *what does it cost* / *tell me about movemental*).
   - **Not question-deep:** no hedged phrasing (`should`, `could`, `what if`, `how do we`, …) and no multi-clause sentences.
3. Anything else → **AGENT** (`open_text`), even if a route keyword appears mid-sentence.

Examples:

| Input | Route |
| --- | --- |
| `cost` / `pricing` | LOCAL → pricing |
| `what does it cost?` | LOCAL → pricing |
| `tell me about movemental` | LOCAL → about |
| `i'm worried about what AI will cost us in trust` | AGENT |
| `question about donors` | AGENT |

**Step 3 — What the visitor sees after Send**

| Classification | Drawer | Sheet | Visitor signal |
| --- | --- | --- | --- |
| **LOCAL** (typed) | Stays collapsed or auto-collapses | Swaps immediately | Ink caption + **`Showing {screen} →` · `Actually, just answer me ↩`** (~8s) in handwriting strip |
| **LOCAL** (chip tap) | Same | Swaps | Ink caption only — **no reversal** |
| **AGENT** | Auto-expands | Stays behind scrim until render/collapse | Thread stream; optional `ui_render` |

**Composer hints (G2):**

- Placeholder: cold → `Search or ask…`; after first exchange → `Ask a follow-up…`.
- While typing: navigation-shaped buffer → `↵ opens the {screen} page`; else → `↵ starts a chat`. Advisory only.

**G1 reversal:** Tapping **Actually, just answer me ↩** re-runs the original utterance as a forced **AGENT** turn (drawer expands, thread streams) while the sheet stays mounted behind the scrim.

**Stub mode only:** unmatched text gets a fixed refusal line with no screen change and no LLM.

### Expand chat (without sending)

- Sheet stays mounted behind scrim (I6); **`behind: {screen}`** names it.
- Empty thread → **Ways in** door panel.
- Opening chip labels use expanded routing (section 5).
- Collapse restores the last mounted sheet.

---

## 7. Sheet vs drawer — speak-and-show guarantee

The screen **always stays mounted** when the drawer expands (invariant **I6**). On **renderable topics**, the default resolution is **auto-render-then-reveal** — the visitor ends up looking at the sheet, not prose about a hidden one.

**Enforcement layers:** (1) host speak-and-show rule; (2) **`behind: {screen}`** while drawer is open; (3) client **auto-render + collapse** when a turn completes on a renderable topic with no `ui_render` (logs `speakshow.violation`); (4) **`↩ Back to {screen}`** only for genuinely **non-renderable** prose-only turns.

| Event | Drawer | Can visitor see new sheet? | Signal |
| --- | --- | --- | --- |
| LOCAL from collapsed (chip or typed nav-shape) | Collapsed | **Yes** — immediate swap | Ink caption (+ reversal if typed) |
| LOCAL while drawer was open (first send) | Auto-collapses | **Yes** | `Showing {screen} →` (+ reversal if typed) |
| AGENT + `ui_render` | Expands, then collapses on `screenKey` change | **Yes** | Sheet on collapse |
| AGENT, prose only on **renderable** topic | Expands, then **client auto-renders + collapses** | **Yes** (after safety net) | `speakshow.violation` metric |
| AGENT, prose only on **non-renderable** topic | Stays expanded | **No** until collapse | **behind:** + **↩ Back to** |

Renderable topic list: `src/lib/agent-room/renderable-topics.ts` (`RENDERABLE_TOPIC_IDS`).

---

## 8. Live model behavior on home

The home screen itself is never generated by the model.

**Hard rule (G4):** On renderable topics, the host **must** call the matching `show_*` tool and speak a **one-line lead only**. **Never** re-author prices, plan specifics, `@` addresses, or contact details in thread prose — the sheet is the only source of truth (same copy modules as stub screens).

**Renderable topics** (from `RENDERABLE_TOPIC_IDS`): about, pricing, contact, path, founders, faq, safety, safety_flow, leader — plus network/audience/handoff via engine tools when relevant.

Open strategy questions (*"our board is nervous"*) remain free prose — correct and unchanged.

---

## 9. Related pages

- [00-composer-drawer-global.md](./00-composer-drawer-global.md) — global composer/drawer + navigation-shape classifier
- [02-safety-flow.md](./02-safety-flow.md) — lead chip destination
- [14-leader-profiles.md](./14-leader-profiles.md) — portrait taps
- [10-about.md](./10-about.md), [11-pricing.md](./11-pricing.md), [15-contact.md](./15-contact.md) — other opening chips
