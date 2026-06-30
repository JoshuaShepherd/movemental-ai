# Path screen

**Screen id:** `path`  
**Role:** The whole four-stage journey on one sheet — Safety, Sandbox, Training, Technology — in order, with expandable detail per stage.

---

## 1. How you get here

| Trigger | Scene |
| --- | --- |
| Chips: **See the whole path**, from about/cost/faq | `toPath` |
| Regex: path, how does it work, whole path | `toPath` |
| Readback / beat follow-ups | `toPath` |
| Live engine | `show_path` |

---

## 2. Entry choreography

1. **Show** path screen.
2. Wait ~480ms.
3. **Say:** *"It starts with Safety. The rest comes after."*
4. Wait ~200ms.
5. **Say:** *"Almost everyone starts at the first step."*
6. **Suggest:**
   - **Show me Safety** (lead) → safety stage
   - **Show me Sandbox** → sandbox detail
   - **Map where we actually stand** → beat
   - **Our situation is more complicated than this** → discuss offer (if flag on)
   - **What does it cost?** → pricing

---

## 3. What appears on the sheet

Four ordered stages with labels from naming SSOT (Safety · Sandbox · Training · Tech).

Each stage typically expands to show what happens in that phase — process accordion pattern.

**Crumb:** ↑ Home.

---

## 4. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

### Float chips on this screen

| Chip | Collapsed | Expanded |
| --- | --- | --- |
| **Show me Safety** (lead) | LOCAL → safety stage | LOCAL |
| **Show me Sandbox** | LOCAL → sandbox | LOCAL |
| **Map where we actually stand** | LOCAL → beat | LOCAL |
| **Our situation is more complicated than this** | LOCAL → discuss offer or capture (flag) | LOCAL |
| **What does it cost?** | LOCAL → pricing | **AGENT** (opening label) |

Sheet stage accordions may also call `onRunScene` — LOCAL, same as chips.

### Type in the composer on this screen

| Input | Typical result |
| --- | --- |
| *"path"*, *"how it works"*, *"whole path"* | LOCAL → **stays on path** or re-runs `toPath` |
| *"pricing"*, *"contact"*, stage keywords | LOCAL → other screens |
| Conversational / unmatched | AGENT — host pairs prose with `show_path`; may gesture stage rows |
| `chatActive` true | AGENT only |

### Sheet vs drawer on this screen

Path is scrollable. LOCAL chip navigation collapses an open drawer so the new sheet is visible. AGENT without `ui_render` leaves path mounted but hidden behind scrim.

---

## 5. Live model behavior

Common AGENT render when visitor asks how Movemental works. Host pairs prose with `show_path`; may gesture at stage rows.

---

## 6. Related pages

- [05-safety-stage.md](./05-safety-stage.md) — stage 01 detail
- [07-sandbox.md](./07-sandbox.md), [08-training.md](./08-training.md), [09-technology.md](./09-technology.md) — stages 02–04
- [11-pricing.md](./11-pricing.md) — prices per stage
