# Sandbox stage screen

**Screen id:** `sandbox`  
**Role:** Stage 02 detail — bounded experimentation with AI on real work after Safety is ratified.

---

## 1. How you get here

| Trigger | Scene |
| --- | --- |
| **Show me Sandbox** from path | `toSandbox` |
| Regex: sandbox, exploration | `toSandbox` |
| Live engine | Stage render tools |

---

## 2. Entry choreography

1. **Show** sandbox screen.
2. Wait ~480ms.
3. **Say:** *"Sandbox is where you try AI against real work, inside the rules you already ratified."*
4. Wait ~200ms.
5. **Say:** *"You sort what helps from what doesn't, and leave with a Future Plan."*
6. **Suggest:**
   - **Digital license · $5,000** (lead) → contact
   - **Hands-on · ~$15,000** → contact
   - **Start free, guided** → path
   - **Show me Safety** → safety stage
   - **What does it cost?** → pricing

---

## 3. What appears on the sheet

Stage 02 Sandbox explainer — digital vs in-person facilitation options, free guided entry points, connection back to Safety prerequisite.

Pricing tiers pull from pricing data SSOT (Sandbox free, digital license, in-person).

---

## 4. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

### Float chips on this screen

| Chip | Collapsed | Expanded |
| --- | --- | --- |
| **Digital license · $5,000** / **Hands-on · ~$15,000** (lead tiers) | LOCAL → contact | LOCAL |
| **Start free, guided** | LOCAL → path | LOCAL |
| **Show me Safety** | LOCAL → safety stage | LOCAL |
| **What does it cost?** | LOCAL → pricing | **AGENT** (opening label) |

### Type in the composer on this screen

| Input | Typical result |
| --- | --- |
| *"sandbox"*, *"exploration"* | LOCAL → sandbox (this screen) |
| *"pricing"*, *"contact"* | LOCAL → pricing or contact |
| Open questions about Sandbox tiers | AGENT — host should `show_pricing` / `show_sandbox`, not quote prices in thread alone |
| `chatActive` true | AGENT only |

### Sheet vs drawer

Standard: LOCAL swaps collapse drawer; AGENT prose-only hides sandbox behind scrim.

---

## 5. Related pages

- [06-path.md](./06-path.md)
- [11-pricing.md](./11-pricing.md)
