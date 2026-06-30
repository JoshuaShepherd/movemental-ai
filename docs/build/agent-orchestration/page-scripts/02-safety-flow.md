# Safety flow wizard

**Screen id:** `safetyFlow`  
**Role:** Primary on-ramp from **Get a clear next AI step**. A self-serve wizard: one diagnostic question, personalized result, charter preview, fork between free handbook and Safety dashboard signup, and optional email capture.

This is one React screen with **internal steps** — the sheet stays on `safetyFlow` while step content changes.

---

## 1. How you get here

| Trigger | Scene |
| --- | --- |
| Lead chip **Get a clear next AI step** (collapsed or expanded) | `toSafetyFlow` |
| Regex: stuck, next, assess, safe, … | `toSafetyFlow` |
| Chips: **Start free, guided**, **Build your dashboard** (from safety stage) | `toSafetyFlowDiy` / `toSafetyFlowSignup` |
| Readback gate-fail chips | handbook or dashboard scenes |
| Live engine | `show_safety_flow` tool with step prop |

---

## 2. Entry choreography

When `toSafetyFlow` runs:

1. **Show** safety flow at step **question**.
2. **Say:** *"One question. Then we'll show you exactly where you stand, and what to do about it."*

No wait beats after the voice line in the current scene data — the question UI is immediately interactive.

---

## 3. Step-by-step walkthrough

### Step: Question

**On the sheet:**
- Eyebrow: *"Your next AI step · one question"*
- Title: *"Let's find your simplest next step."*
- The single question (footnote style):  
  *"Has your team agreed, in writing, on what you will and won't do with AI, and has your board ratified it?"*
- Four answer buttons:
  1. *"No, we haven't decided anything yet."* → answer `start`
  2. *"We've talked about it, but nothing's written down."* → answer `start`
  3. *"We have a draft, but our board hasn't ratified it."* → answer `draft`
  4. *"Yes. It's written and our board has ratified it."* → answer `done`

**Visitor action:** Tap one option. No agent voice between options — the UI advances locally.

**Routing after answer:**
- `start` or `draft` → **result** step
- `done` → **ahead** step (already ratified — skip result/fork for charter gap)

---

### Step: Result (answers `start` or `draft`)

**On the sheet:** Personalized copy based on answer.

**If `start` (no written decision yet):**
- Title: *"You're at the start of the path."*
- Explains four ordered stages: Safety → Sandbox → Training → Tech.
- Next move: decide in writing what you will and won't do with AI.

**If `draft` (draft exists, not ratified):**
- Title: *"You're closer than you think."*
- Explains they are still on Safety until ratification; a draft in a folder does not protect anyone.

**Visitor action:** Continue → **charter** step. Back → question.

**Agent:** No scripted say acts during wizard steps — voice is entry-only unless engine streams.

---

### Step: Ahead (answer `done`)

**On the sheet:**
- *"You've done the hardest first part."*
- Safety is behind them; next step is Sandbox — try AI on real work safely.

**Visitor action:** Can revisit charter or go back to question. Chips on sheet may route to path or sandbox scenes via `onRunScene`.

---

### Step: Charter

**On the sheet:**
- Title: *"Write and ratify your AI Safety Charter."*
- Five document layers with tap-to-read drafts and sticky notes for what is missing.
- CTA: *"Show me how to do it →"*

**Visitor action:** Continue → **fork** step. Back → result or ahead.

---

### Step: Fork

**On the sheet:** Two cards — honest fork between DIY and dashboard.

| Path | Tag | Price | Best when |
| --- | --- | --- | --- |
| **Free Handbook** | Do it yourself | Free | Team has time and will to finish and ratify |
| **Safety Dashboard** (recommended) | Build your dashboard | Free to start | Team is stretched or serves vulnerable people |

Body copy includes the “Tuesday gravity” line — finishing on a hard day when the blank page wins.

**Visitor action:**
- Choose Handbook → **diy** step
- Choose Dashboard → **signup** step
- Back → charter

---

### Step: DIY (free handbook)

**On the sheet:**
- *"Your AI Safety Handbook, free."*
- Email field: *"Where should we send it?"*
- Submit sends handbook (API capture when wired; UI success state on submit).

**After success:**
- *"It's on the way."* — check inbox, open first document tonight.
- Bridge line: if Tuesday gravity hits, dashboard is available with no pressure.

**Visitor action:** Can pivot to dashboard signup. Back → fork.

**Related scene:** `focusHandbook` may circle the email field in the dock when routed from older safety sub-scenes.

---

### Step: Signup (Safety dashboard)

**On the sheet:**
- *"Build your dashboard."*
- Org name + email fields.
- Submit: *"Continue"* — provisions dashboard signup flow (no checkout on first step).
- Fine print: free to start, draft first version, upgrade optional.
- *"Prefer to talk first?"* link — human handoff tone, no urgency language.

**After submit (`signup_sent`):**
- *"Check your inbox."* — sign-in link lands them in Safety dashboard with five documents drafted.

**Visitor action:** Back → fork.

**Scene `toSafetyDashboard`:** Alternative entry with voice: *"Tell us who you are. We'll draft all five documents…"*

---

## 4. Progress stepper

A dot stepper shows wizard progress (question → result/ahead → charter → fork/signup). Internal back buttons walk the reverse path per `safetyFlowBackStep`.

---

## 5. Exit paths (chips elsewhere that return here)

From **safety stage** screen: **Build your dashboard**, **Start free, guided**.  
From **readback** (gate fail): handbook CTA, dashboard chip.  
From **pricing**: **Start with Safety (free)** → safety stage, then fork into flow.

---

## 6. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

This wizard is driven primarily by **buttons on the sheet**, not the composer. The dock stays **collapsed** for most visitors unless they expand manually or a chip target opens dock capture (`focusHandbook`).

### Float chips

This screen does not define its own entry `suggest` block. Visitors arrive via:

| Entry chip / trigger | Dock | Result |
| --- | --- | --- |
| **Get a clear next AI step** (home opening) | Collapsed or expanded | LOCAL → this wizard (`toSafetyFlow`) |
| **Start free, guided** / **Build your dashboard** (from safety stage) | Either | LOCAL → DIY or signup step |
| Regex: stuck, next, assess, safe, help | Collapsed typical | LOCAL → question step |

### Type in the composer on this screen

While on any `safetyFlow` step, typed sends still pass through the **global classifier** unless `chatActive` is true:

| Typical input | Result | Visitor sees |
| --- | --- | --- |
| High-confidence navigation (*"pricing"*, *"contact"*, *"the path"*) | LOCAL scene | **Leaves the wizard** — sheet swaps (e.g. pricing); dock collapses if it was open |
| Conversational / unmatched | AGENT | Drawer expands; **behind: Safety flow** indicator; host **must** call `show_safety_flow` on safety topics (speak-and-show); **↩ Back to** if prose-only |
| After prior agent exchange | AGENT | Same — regex bypassed |

The wizard’s **answer buttons** are sheet UI — they never go through the composer.

### Sheet vs drawer on this screen

| Event | Visible change |
| --- | --- |
| Step change inside wizard | Sheet content updates; `screenKey` may stay `safetyFlow-*` — drawer usually **stays as-is** |
| LOCAL navigation out (typed/chip) | New screen; drawer **auto-collapses** if open |
| AGENT turn while wizard visible | Thread updates; wizard **not visible** until collapse |
| `focusHandbook` from safety sub-scenes | Drawer **expands**; handbook email field in dock footer (sheet may still be safety stage behind scrim) |

### Live model on this screen

Engine `show_safety_flow` can set step/answer during AGENT turns. In hybrid, most visitors complete the wizard locally with no LLM.

---

## 7. Related pages

- [05-safety-stage.md](./05-safety-stage.md) — stage explainer before fork
- [16-capture-and-confirm.md](./16-capture-and-confirm.md) — paid capture path (separate from free dashboard signup)
- [04-readback.md](./04-readback.md) — diagnostic readback may send people here
