# Capture and confirm screens

**Screen ids:** `capture`, `confirm`  
**Role:** Lead capture forms mid-journey and confirmation sheets after submit — map email, paid enrollment, free handbook, discuss follow-up.

---

## 1. Capture screen (`capture`)

### What it is

A dedicated form sheet shown when a scene needs structured input before continuing. The scene runner **pauses** on `{ await: "capture" }` until submit or skip.

### Capture kinds

| Kind | Purpose | Typical entry |
| --- | --- | --- |
| `map` | Email readback / map copy | Readback chip, engine focus without full swap |
| `paid` | Paid SafeStart / dashboard enrollment | `withUs` scene |
| `free` | Free handbook (legacy path) | deprecated `onOwn` |
| `discuss` | Human follow-up for open conversation | `toDiscuss` scene |

### Scene `withUs` (paid path)

1. **Say:** *"Good. Let's get you set up."*
2. **Show** capture (`kind: paid`).
3. **Gesture:** circle submit button.
4. **Await** capture completion.
5. **Show** confirm (`mode: paid`).
6. Voice confirmation lines (below).

### Scene `toDiscuss` (discuss capture)

1. **Clear** ink.
2. **Say:** *"That deserves a real conversation, more than I can script here."*
3. **Say:** *"Leave your email and the team will pick it up with you."*
4. **Show** capture (`kind: discuss`).
5. **Await** capture.
6. **Show** confirm (`mode: discuss`).
7. **Say:** *"Got it. A real person will follow up, and the path stays right here."*
8. Suggest org assessment, beat, start over.

### What appears on capture sheet

Fields depend on kind — typically email, org name, role; paid may include billing-related staging before `/enroll`.

Submit posts to `/api/agent-room/capture` (or enroll API for paid).

**Never** echo typed PII in the ink caption.

---

## 2. Confirm screen (`confirm`)

### What it is

Post-submit reassurance on the sheet — not a form. Modes change copy.

### Modes

| Mode | After | Voice lines (withUs example) |
| --- | --- | --- |
| `paid` | Paid capture | *"You're in. Your dashboard is being set up."* then *"Your first move is your whole team's read."* |
| `free` | Handbook send | *"The guide is on its way. Free."* then team read encouragement |
| `discuss` | Discuss capture | Covered in toDiscuss scene |

### What appears on confirm sheet

**Paid:** Two-week engagement shape, who to gather, org-wide read as first move.

**Free:** Field guide on its way + checklist for five Guidebook layers.

**Discuss:** Acknowledgment that a human will follow up.

Follow-up chips: talk to us, start over, org assessment (discuss path).

---

## 3. Inline capture (no screen swap)

Engine `ui_render` for capture kind `map` may **focus readback email** without showing capture screen — visitor stays on readback.

Safety flow DIY/signup handle email inside the wizard — not the generic capture screen.

---

## 4. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

### Runner pause (`await: capture`)

While capture is active, the scene runner **blocks** until submit or skip. The dock may show capture fields; composer behavior depends on kind:

| Kind | Dock / composer |
| --- | --- |
| `paid` / `discuss` | Full capture sheet; PII **never** echoed in ink |
| `map` (inline) | Often **no capture screen** — readback email focus only |
| Handbook (safety flow) | Email in wizard sheet or dock via `focusHandbook` |

### Float chips after confirm

| Context | Chips | Routing |
| --- | --- | --- |
| Paid confirm | Talk to us, ↺ Start over | LOCAL scenes |
| Discuss confirm | Org assessment, beat, start over | LOCAL or navigate (`/assess`) |

### Type in the composer on capture/confirm

| Situation | Behavior |
| --- | --- |
| On capture sheet during `await` | Typing may still classify — can be disruptive; prefer form submit |
| After confirm, `chatActive` false | Global classifier |
| After confirm, thread active | AGENT follow-up |

### Sheet vs drawer

Confirm replaces capture on sheet (`screenKey` change) → drawer **auto-collapses**. AGENT during capture leaves capture/confirm hidden behind scrim.

**Never** speak submitted email/name/org in voice channel.

---

## 5. Related pages

- [04-readback.md](./04-readback.md) — map email
- [02-safety-flow.md](./02-safety-flow.md) — dashboard signup
- [15-contact.md](./15-contact.md) — general contact form
