# Contact screen

**Screen id:** `contact`  
**Role:** Human handoff — topic chips plus name, organization, email, message form.

**Rule:** The agent never reads form field values aloud in the voice channel.

---

## 1. How you get here

| Trigger | Scene |
| --- | --- |
| Chip **Get in touch** (collapsed) | `talkToUs` |
| Regex: contact, email, human, reach | `talkToUs` |
| Pricing / sandbox / training paid CTAs | `talkToUs` |
| Live engine | Contact render or handoff |

---

## 2. Entry choreography (`talkToUs`)

1. **Show** contact screen.
2. Wait ~460ms.
3. **Say:** *"Tell us a little about where you stand."*
4. Wait ~160ms.
5. **Say:** *"We read every message, and reply personally."*
6. **Suggest:**
   - **↺ Start over** (lead) → opening
   - **Map where we actually stand** → beat

---

## 3. What appears on the sheet

**Topic chips** — reason for reaching out (implementation, pricing question, partnership, etc.).

**Form fields:** name, organization, email, message.

**Submit:** POST to `/api/contact` when live (Resend notification to ops inbox).

**Success state (live):** On-screen confirmation — e.g. *"Got it, {name}. We got your message…"* — not spoken in ink.

**Stub/offline:** Client mock success without POST.

**Crumb:** ↑ Home.

---

## 4. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

**Form rule:** The agent **never reads form field values** in ink caption or thread. Success copy appears on-sheet only.

### Float chips on this screen

| Chip | Collapsed | Expanded |
| --- | --- | --- |
| **↺ Start over** (lead) | LOCAL → opening | LOCAL |
| **Map where we actually stand** | LOCAL → beat | LOCAL |

**Get in touch** opening chip: collapsed → this screen; expanded → AGENT.

**Sheet topic chips** (implementation, pricing, partnership, …) are form UI — they pre-fill topic locally; they do not invoke the classifier.

### Type in the composer on this screen

| Input | Typical result |
| --- | --- |
| *"contact"*, *"email"*, *"talk to"* | LOCAL → contact (may already be here) |
| Message while filling form | Same classifier — may AGENT expand drawer **over** the form |
| `chatActive` true | AGENT — follow-up in thread; host may re-render contact |

**Mitigation:** **behind: Contact** indicator names the form sheet; **↩ Back to Contact** collapses to the form. Host should call `show_contact` on contact topics (speak-and-show).

### Sheet vs drawer

Submit success is on-sheet (not spoken). LOCAL chips away collapse drawer. Policy questions from safety may route here when Discuss flag is off.

---

## 5. Related pages

- [16-capture-and-confirm.md](./16-capture-and-confirm.md) — structured capture kinds
- [18-engine-overlays.md](./18-engine-overlays.md) — `handoff_human` card
