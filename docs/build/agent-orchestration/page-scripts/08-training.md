# Training stage screen

**Screen id:** `training`  
**Role:** Stage 03 detail — forming people to carry AI well inside the organization (not a tool workshop).

---

## 1. How you get here

| Trigger | Scene |
| --- | --- |
| Regex: training, formation | `toTraining` |
| Path stage navigation | `toTraining` |
| Live engine | Stage render tools |

---

## 2. Entry choreography

1. **Show** training screen.
2. Wait ~480ms.
3. **Say:** *"Training forms the people who will carry AI inside your organization. Not a tool workshop."*
4. Wait ~200ms.
5. **Say:** *"Eight weeks on discernment, authorship, and stewardship."*
6. **Suggest:**
   - **Talk to us about Training** (lead) → contact
   - **Show me Sandbox** → sandbox
   - **What does it cost?** → pricing

---

## 3. What appears on the sheet

Stage 03 Training — eight-week formation framing, free vs paid training ways forward from pricing data.

---

## 4. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

### Float chips on this screen

| Chip | Collapsed | Expanded |
| --- | --- | --- |
| **Talk to us about Training** (lead) | LOCAL → contact | LOCAL |
| **Show me Sandbox** | LOCAL → sandbox | LOCAL |
| **What does it cost?** | LOCAL → pricing | **AGENT** (opening label) |

### Type in the composer on this screen

| Input | Typical result |
| --- | --- |
| *"training"*, *"formation"* | LOCAL → training (this screen) |
| *"pricing"*, *"contact"* | LOCAL → other screens |
| Unmatched | AGENT |
| `chatActive` true | AGENT only |

### Sheet vs drawer

Standard LOCAL/AGENT visibility rules apply.

---

## 5. Related pages

- [06-path.md](./06-path.md)
- [11-pricing.md](./11-pricing.md)
