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
| About Movemental | LOCAL → about screen | AGENT → live reply in thread |
| What does it cost? | LOCAL → pricing screen | AGENT → live reply |
| Get in touch | LOCAL → contact screen | AGENT → live reply |

This asymmetry is intentional (screen-first on collapsed dock). It is the main reason visitors see a full page swap after one tap.

---

## 6. What the visitor can do next

**Global mechanics:** [00-composer-drawer-global.md](./00-composer-drawer-global.md) — `chatActive`, LOCAL vs AGENT, opening vs follow-up chips, sheet behind scrim.

### Tap a float chip

Routes per the table in section 5. Collapsed dock → instant page swap (LOCAL). Expanded drawer → informational chips become live conversation (AGENT), except the lead chip which still opens the safety-flow wizard locally.

### Tap a leader portrait

Runs `leaderScene(index)`:

- Shows the **leader** screen for that person.
- Agent says *"This is {name}."* then the profile lede (if approved copy exists).
- Follow-up chips depend on whether a full profile is in the catalog.
- The dock **stays collapsed** unless the visitor had already expanded it; either way, the sheet swap is visible because leader scenes always change `screenKey`, which auto-collapses an open drawer (see section 7).

### Type in the composer — the fork visitors miss

Typing and sending is **not** one behavior. The hybrid controller classifies every send as **LOCAL** (scripted scene, usually with a sheet swap) or **AGENT** (live model reply in the expanded thread). On home, **most first messages that sound like navigation** go LOCAL — that is why typing *"what does it cost?"* can feel like opening a preset page instead of starting a chat.

**Step 1 — Is there already conversation history?**

`chatActive` is true only when the thread (or server history) already has at least one turn. It is **not** the same as “the drawer is open.”

| Situation | `chatActive` | Typed send goes to… |
| --- | --- | --- |
| Collapsed dock, first send | false | Classifier (regex + confidence) |
| Expanded drawer, empty thread, first send | false | Classifier (same as collapsed) |
| After any prior user+assistant exchange | true | **AGENT always** — regex bypassed |

**Step 2 — Classifier when `chatActive` is false**

Ordered checks (see [00-room-arrival-and-routing.md](./00-room-arrival-and-routing.md) for the full tree):

1. **Discuss phase** → AGENT (not typical on cold home visit).
2. **Meta/objection phrasing** (e.g. *"our board is nervous"*, *"what if we tried…"*) → LOCAL `discussOffer` scene (consent chips to enter Discuss).
3. **Regex match** in `route-input.ts` → LOCAL scene **only if high-confidence**; weak matches (e.g. bare *"about"* in a long sentence) → AGENT.
4. **No match** → AGENT (`open_text`).

Common home-adjacent LOCAL triggers (first send, high-confidence):

| Visitor types something like… | Sheet shows |
| --- | --- |
| cost / price / afford | pricing |
| what is movemental / tell me about movemental | about |
| contact / talk to / email | contact |
| path / how it works / sandbox / training / tech | path or stage detail |
| stuck / next step / assess / safe / help | safety-flow wizard |
| who / founders / behind | founders |

**Step 3 — What the visitor sees after Send**

| Classification | Drawer | Sheet | Agent text |
| --- | --- | --- | --- |
| **LOCAL** scene | Stays **collapsed**, or **auto-collapses** if it was open | **Swaps immediately** — this is the “preset page” feeling | Short **ink caption** in the handwriting strip (scene `say`), not thread prose |
| **AGENT** turn | **Auto-expands** before streaming | Stays on current page **behind the scrim** (hidden) | Full reply in the **conversation thread**; host may also call `ui_render` tools |

**Important corrections:**

- Sending from the collapsed dock does **not** always expand the drawer. Only **AGENT** sends expand. LOCAL sends swap the sheet and keep the dock collapsed.
- Manually expanding the drawer **before** the first send does **not** force conversation mode. The first send still runs through the regex table unless `chatActive` is already true.
- After the first AGENT exchange, all further typing is conversational — no more regex page jumps.

**Stub mode only:** unmatched text gets a fixed refusal line with no screen change and no LLM.

### Expand chat (without sending)

- Sheet is hidden behind a scrim; conversation owns the viewport below the mast.
- Empty thread shows the **Ways in** door panel (curated utterances — these still route through the same classifier on first send).
- Float chip labels for About / Cost / Contact switch to **AGENT** utterances (section 5).
- Collapse (backdrop, Escape, or collapse control) restores the sheet at whatever screen was last mounted behind the scrim.

---

## 7. Sheet vs drawer — speak-and-show guarantee

The screen **always stays mounted** when the drawer expands (invariant **I6**). The visitor literally cannot see sheet updates while the drawer is open — AGENT prose-only replies on renderable topics used to feel like a silent failure (*nothing changed*). That outcome is **no longer normal**.

**Three layers enforce the guarantee:** (1) host **speak-and-show** rule on renderable topics; (2) **`behind: {screen}`** indicator in the expanded drawer header; (3) **`↩ Back to {screen}`** in-thread affordance when a turn completes with no `ui_render`.

What actually happens:

| Event | Drawer behavior | Can the visitor see the new sheet? | Visitor signal |
| --- | --- | --- | --- |
| LOCAL scene from **collapsed** dock (chip or typed regex) | Stays collapsed | **Yes** — immediate full-page swap | Ink caption |
| LOCAL scene while drawer was **already expanded** (first send) | **Auto-collapses** on `screenKey` change | **Yes** | Brief `Showing {screen} →` caption |
| AGENT turn, prose only on renderable topic (**policy violation**) | Expands (or stays expanded) | **No** until collapse | **behind:** indicator + **↩ Back to** affordance |
| AGENT turn **with** `ui_render` (e.g. `show_pricing`) | Expands for stream, then **auto-collapses** on `screenKey` change | **Yes** — collapse reveals the rendered screen | Sheet swap on collapse |

**Practical expectation on home:** Treat float chips and command-like first messages (*"pricing"*, *"contact us"*) as **navigation**. Treat unmatched, conversational first messages as **chat** (drawer expands, thread streams). After one agent reply, everything is chat until replay. While the drawer is open, **`behind: {screen}`** always names the mounted sheet — tap it or **↩ Back to** to return.

---

## 8. Live model behavior on home

The home screen itself is never generated by the model. The live host may call `show_home` or stream prose if the visitor is in an AGENT turn while home is visible (unusual on cold visit).

If the visitor expands and asks an open question, the host **must** pair thread prose with the matching `ui_render` tool on renderable topics (speak **and** show — mandatory host rule). The behind-indicator and `↩ Back to` affordance are client safety nets if the model omits a render call.

---

## 9. Related pages

- [02-safety-flow.md](./02-safety-flow.md) — lead chip destination
- [14-leader-profiles.md](./14-leader-profiles.md) — portrait taps
- [10-about.md](./10-about.md), [11-pricing.md](./11-pricing.md), [15-contact.md](./15-contact.md) — other opening chips
