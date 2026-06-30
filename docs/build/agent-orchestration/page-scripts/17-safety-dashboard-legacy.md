# Safety dashboard screen (legacy stub)

**Screen id:** `safetyDashboard`  
**Role:** Legacy paid Safety funnel stub — largely superseded by **safety flow signup** and `/enroll`.

---

## 1. Current status

The primary on-ramp for Safety is **`safetyFlow`** (wizard) → dashboard signup step, not this screen.

`safetyDashboard` remains in the closed `ScreenId` set for backward compatibility and tests. New choreography should prefer `toSafetyFlowSignup` / `toSafetyDashboard` voice + flow step.

---

## 2. How you might still reach it

| Trigger | Scene |
| --- | --- |
| `toSafetyDashboard` | Shows safety flow at signup step with voice line about drafting five documents |
| Historical chips / tests | Direct show act |
| Engine | Uncommon render |

---

## 3. What appears on the sheet

Legacy Safety dashboard conversion UI — enrollment staging before Stripe `/enroll` when wired.

Treat as **deprecated path** in product planning; document for parity audits only.

---

## 4. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

**Deprecated screen** — prefer [02-safety-flow.md](./02-safety-flow.md) signup step. Composer behavior matches safety flow signup when this screen is shown.

| Trigger | Result |
| --- | --- |
| `toSafetyDashboard` scene | LOCAL → safetyFlow signup step + voice line |
| Typed navigation | Global classifier — may leave legacy screen |
| AGENT | Uncommon; host would use `show_safety_flow` |

No float chips defined for this screen in current choreography.

---

## 5. What to use instead

- [02-safety-flow.md](./02-safety-flow.md) — signup step
- [16-capture-and-confirm.md](./16-capture-and-confirm.md) — paid capture + confirm
- `/enroll` route — live enrollment funnel
