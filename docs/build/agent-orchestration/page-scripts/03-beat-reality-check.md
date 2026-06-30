# Beat — organizational reality check

**Screen id:** `beat`  
**Role:** Interactive diagnostic — organizational reality questions with tappable answers. Most visitors answer **one decision question** and stop; a gate determines whether they see a Safety readback or continue through additional beats.

The beat screen is **compact** (does not scroll like other sheets).

---

## 1. How you get here

| Trigger | Notes |
| --- | --- |
| Chip **Map where we actually stand** | Direct `toBeat` |
| Chips from about, pricing, faq, path, founders, contact, leader | Often `toBeat` |
| Regex: stuck, next, assess, … | May route to `toSafetyFlow` instead (primary on-ramp) |
| Scene `beatIntro` | Two voice lines on **current** sheet, then chip into beat (cold diagnostic bridge) |
| Scene `toBeatCold` | Shows beat with single-question hint + one voice line |
| Live engine | `render_beat` tool with question index |

**Not** the same as safety flow: beat is the **organizational reality map** with gate logic; safety flow is the **charter ratification** wizard.

---

## 2. Entry

**Scene `toBeat`:**  
1. **Show** beat at question index `0` (first question in the active catalog).

Optional intro scenes (`beatIntro`, `toBeatCold`) speak before or with the first question — framing as “usually just one question; honest answers are the useful ones.”

---

## 3. What appears on the sheet

Each beat shows:
- Stage tag (e.g. Safety) when applicable
- Question text (from beat catalog / map-q data)
- Optional criteria bullets
- Tappable option buttons (`#opts` gesture target)

Progress indicator reflects position in the beat sequence (core order + branch beats for orgs that pass the Safety gate).

---

## 4. Question flow (conceptual)

The catalog aligns with engine beat IDs. The **decision beat** is the Safety gate:

**Decision question (paraphrased):** Has leadership ratified in writing what the organization will and won't do with AI?

| Answer type | What happens |
| --- | --- |
| **Gate fail** (not ratified) | Agent voices readback lines, **shows readback screen**, suggests dashboard / handbook / org assessment — **assessment stops** |
| **Gate pass** | Advances to additional beats (trust, tooling, formation, integration) |
| **Full path complete** | Computed map read → readback with full stage gaps |

Per-answer choreography (`beatScene`):

1. Clear ink.
2. **Gesture:** circle the chosen option.
3. Wait.
4. **Say** the option’s fixed reply line (e.g. *"That's the honest answer most give."*).
5. Either advance to next `beat` question index **or** finish into readback.

---

## 5. Agent voice during beats

Each option has a pre-written **say** line in data — not model-authored in local/hybrid LOCAL path.

If gate fails, readback voice acts run **before** the readback screen:

- Typical fail: *"You're at Safety, leadership hasn't ratified it in writing yet."* then *"Your next move is to ratify what your organization will and won't do with AI."*

If gate passes through full path:

- *"You cleared the Safety gate, that's rare."* then Sandbox as next move.

---

## 6. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

Primary interaction is **tapping answer buttons on the sheet** (`#opts`), not the composer.

### Float chips

No entry chips on the beat sheet itself. Inbound chips (from about, path, pricing, etc.):

| Chip | Dock | Result |
| --- | --- | --- |
| **Map where we actually stand** | Either | LOCAL → this screen (`toBeat`) |
| **Start with Safety** (`beatIntro` only) | Either | LOCAL → beat after intro voice |

All follow-up chips are **scene-bound** → LOCAL regardless of dock state.

### Type in the composer on this screen

| Situation | Behavior |
| --- | --- |
| Scene playing (`busy`, collapsed, no thread) | Send **ignored** — wait for ink animation to finish |
| On beat, `chatActive` false | Global classifier; regex may **route away** (e.g. *"pricing"* → pricing screen) |
| Meta/objection typing on beat | Discuss **offer blocked** while `screenId === "beat"` — falls through to regex/AGENT, not `discussOffer` |
| After agent exchange (`chatActive` true) | AGENT only — may stream; host uses `render_beat` / `request_diagnosis` |

**During beat:** Prefer sheet options. Composer is for navigation away or open conversation after thread exists.

### Sheet vs drawer on this screen

| Event | Visible change |
| --- | --- |
| Tap beat answer | LOCAL choreography — gesture, ink lines, next question or readback; drawer usually collapsed |
| Gate fail → readback | Sheet swaps to readback; drawer collapses if open |
| AGENT turn on beat | **behind: Reality check**; host should call `render_beat`; **↩ Back to** if prose-only |

### Discuss offer (when enabled)

Triggered from **other screens** or after leaving beat — not from implicit signals while on beat. Voice-only `discussOffer` scene; chips **Yes, talk it through** / **Stay on the guided path**.

---

## 7. Live model behavior

Visitor answers may feed engine; host calls `render_beat` then eventually `request_diagnosis` → diagnostician → `show_readback`.

---

## 8. Related pages

- [04-readback.md](./04-readback.md) — destination after answers
- [02-safety-flow.md](./02-safety-flow.md) — charter wizard (different entry)
- [03-beat-reality-check.md](./03-beat-reality-check.md) — this document
