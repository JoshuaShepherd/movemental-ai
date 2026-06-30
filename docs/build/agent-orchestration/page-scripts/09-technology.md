# Technology stage screen

**Screen id:** `technology`  
**Role:** Stage 04 detail — scoped deployment only after Safety, Sandbox, and Training.

---

## 1. How you get here

| Trigger | Scene |
| --- | --- |
| Regex: technology, deployment, tech | `toTechnology` |
| Path navigation | `toTechnology` |
| Live engine | Stage render tools |

---

## 2. Entry choreography

1. **Show** technology screen.
2. Wait ~480ms.
3. **Say:** *"Tech is scoped deployment, only after Safety, Sandbox, and Training."*
4. Wait ~200ms.
5. **Say:** *"We would rather name a smaller first step than sell a build you are not ready to operate."*
6. **Suggest:**
   - **Talk to us about Tech** (lead) → contact
   - **See the whole path** → path
   - **What does it cost?** → pricing

---

## 3. What appears on the sheet

Stage 04 Technology — modular deployment posture, free orientation vs paid build modules from pricing SSOT.

---

## 4. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

### Float chips on this screen

| Chip | Collapsed | Expanded |
| --- | --- | --- |
| **Talk to us about Tech** (lead) | LOCAL → contact | LOCAL |
| **See the whole path** | LOCAL → path | LOCAL |
| **What does it cost?** | LOCAL → pricing | **AGENT** (opening label) |

### Type in the composer on this screen

| Input | Typical result |
| --- | --- |
| *"technology"*, *"deployment"*, *"build"* | LOCAL → technology (this screen) |
| *"pricing"*, *"path"* | LOCAL → other screens |
| Unmatched | AGENT — host may stress smaller first step vs full build |
| `chatActive` true | AGENT only |

### Sheet vs drawer

AGENT prose-only turns show **behind: {screen}** in the drawer header and **↩ Back to {screen}** in the thread; host must call matching `show_*` on renderable topics.

Standard LOCAL/AGENT visibility rules apply.

---

## 5. Related pages

- [06-path.md](./06-path.md)
- [11-pricing.md](./11-pricing.md)
