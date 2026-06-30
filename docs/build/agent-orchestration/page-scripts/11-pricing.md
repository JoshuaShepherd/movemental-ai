# Pricing screen

**Screen id:** `pricing`  
**Role:** All public prices and refusals on one sheet — free guides vs fixed-price facilitation for each path stage.

Host policy: **never quote prices in voice** — show this screen instead (`room-output-guardrail` in engine).

---

## 1. How you get here

| Trigger | Scene |
| --- | --- |
| Chip **What does it cost?** (collapsed) | `cost` |
| Regex: cost, price, afford, free, pay | `cost` |
| Chips from path, faq, sandbox, training, tech | `cost` |
| Live engine | `show_pricing` |

---

## 2. Entry choreography (`cost`)

1. **Show** pricing screen.
2. Wait ~480ms.
3. **Say:** *"Every price is on the page, and what we refuse to do."*
4. Wait ~160ms.
5. **Say:** *"The guides are free. Facilitation is fixed-price."*
6. **Suggest:**
   - **Start with Safety (free)** (lead) → safety stage
   - **Map where we actually stand** → beat
   - **See the whole path** → path

---

## 3. What appears on the sheet

**Structure:** Four stage headers (Safety, Sandbox, Training, Tech) from pricing SSOT.

Each stage shows **two ways forward** pattern:
- Free self-serve guide / handbook path
- Paid facilitation tier with fixed price (e.g. Safety SafeStart, Sandbox digital license, Training cohort, Tech modules)

**Pricing refusals:** Six explicit things Movemental will not do (no usage-based surprise billing, no lock-in, etc.) — copy from `pricing.ts`.

Stage CTAs may link to `/enroll`, contact, or safety flow depending on tier.

**Crumb:** ↑ Home.

---

## 4. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

**Host policy:** Never quote prices in voice or thread without calling `show_pricing` — this screen is the price SSOT.

### Float chips on this screen

| Chip | Collapsed | Expanded |
| --- | --- | --- |
| **Start with Safety (free)** (lead) | LOCAL → safety stage | LOCAL |
| **Map where we actually stand** | LOCAL → beat | LOCAL |
| **See the whole path** | LOCAL → path | LOCAL |

**What does it cost?** opening chip (from home): collapsed → this screen; expanded → AGENT (should still render pricing for numbers).

### Type in the composer on this screen

| Input | Typical result |
| --- | --- |
| *"cost"*, *"price"*, *"how much"* | LOCAL → pricing (this screen) |
| Other stage keywords | LOCAL → safety, path, etc. |
| Unmatched | AGENT — host must use `show_pricing` tool for figures |
| `chatActive` true | AGENT only |

### Sheet vs drawer

AGENT prose-only turns show **behind: {screen}** in the drawer header and **↩ Back to {screen}** in the thread; host must call matching `show_*` on renderable topics.

Visitors often land here via LOCAL routing (instant swap, collapsed dock). AGENT on pricing without `ui_render` = thread-only update, prices **not visible** until collapse.

---

## 5. Related pages

- [05-safety-stage.md](./05-safety-stage.md)
- [07-sandbox.md](./07-sandbox.md) — tier detail
- [11-pricing.md](./11-pricing.md) — this document
