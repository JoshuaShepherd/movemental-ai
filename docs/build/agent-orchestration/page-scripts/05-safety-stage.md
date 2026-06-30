# Safety stage screen

**Screen id:** `safety`  
**Role:** Explains **Stage 01 — Safety**: why it comes first, what the AI Safety Charter is, and the fork between free self-serve and dashboard-led ratification.

This is the **stage explainer** sheet — not the multi-step safety flow wizard (see [02-safety-flow.md](./02-safety-flow.md)).

---

## 1. How you get here

| Trigger | Scene |
| --- | --- |
| Chip **Show me Safety** (from path, readback, pricing, sandbox) | `toSafety` |
| Regex: safety, charter, handbook | `toSafety` |
| Sub-scenes from older flows | `charter`, `involved` (voice-only extensions) |
| Live engine | `show_safety` / render tool |

---

## 2. Entry choreography (`toSafety`)

1. **Show** safety screen.
2. Wait ~520ms.
3. **Say:** *"AI is already inside your organization, and nobody has ratified the rules yet. That's what Safety fixes first."*
4. Wait ~240ms.
5. **Say:** *"Safety is your step. Here's what it means."*
6. Wait ~200ms.
7. **Say:** *"Complete it free with our help, or have us do it with you."*
8. **Suggest** chips:
   - **Build your dashboard** (lead) → signup step of safety flow
   - **Start free, guided** → DIY step of safety flow
   - **Why does this come first?** → `whySafetyFirst` (voice only)
   - **What could go wrong without it?** → `safetyWithoutIt` (voice only)
   - **I have a policy question** → contact or discuss (flag-dependent)

---

## 3. What appears on the sheet

**Stage 01 · Safety** headline and body explaining the Guidebook / charter layers.

**Two ways forward** (free field guide vs facilitated engagement) — copy from safety screen component and naming SSOT.

Five Guidebook layers may appear as expandable or listed content (ratification, use policy, response plan, etc.).

**Crumb:** ↑ Home returns to opening.

---

## 4. Voice-only sub-scenes

### `whySafetyFirst`

Speaks why Safety precedes Sandbox, Training, Tech — trust as the product for churches, nonprofits, seminaries. No screen change.

Chips return to dashboard signup or DIY, or **What could go wrong without it?**

### `safetyWithoutIt`

Speaks risks without a ratified charter: staff deciding alone, donor data in consumer tools, pastoral notes in chatbots, cloned voice threats.

Chips return to dashboard, DIY, or why-first.

### `charter` / `involved`

Short explanations of what a charter is and what facilitated engagement involves. May gesture toward handbook email in dock via `focusHandbook`.

---

## 5. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

### Float chips on this screen

All entry chips are **scene follow-ups** → LOCAL regardless of dock state.

| Chip | Result | Notes |
| --- | --- | --- |
| **Build your dashboard** (lead) | safetyFlow signup step | Sheet swap |
| **Start free, guided** | safetyFlow DIY step | Sheet swap |
| **Why does this come first?** | `whySafetyFirst` voice scene | **No sheet change** — ink captions only |
| **What could go wrong without it?** | `safetyWithoutIt` voice scene | **No sheet change** |
| **I have a policy question** | Discuss entry (flag on) or contact (flag off) | Discuss → expanded AGENT; contact → sheet swap |

Return chips from voice sub-scenes loop back to dashboard/DIY/fork.

### Type in the composer on this screen

| Input | Typical result |
| --- | --- |
| *"safety"*, *"charter"*, *"handbook"* (high-confidence, first send) | LOCAL → **stays on or returns to** safety stage via `toSafety` |
| *"pricing"*, *"path"*, etc. | LOCAL → other screens |
| Open / unmatched | AGENT — host policy: **do not quote prices in voice**; call `show_pricing` |
| `chatActive` true | AGENT only |

### Sheet vs drawer on this screen

| Event | Visible change |
| --- | --- |
| Fork chips (dashboard/DIY) | Sheet → safetyFlow; drawer collapses if open |
| Voice sub-chips | Safety sheet **still visible** (collapsed dock typical) |
| `focusHandbook` | Drawer expands; handbook email in dock — safety sheet behind scrim |
| AGENT prose-only (mitigated) | **behind: Safety** + **↩ Back to Safety**; host must `show_safety_flow` or `show_path` on safety topics |

---

## 6. Live model behavior

Host prompt: never quote prices in voice — call `show_pricing`. Safety stage is a preferred render when visitor needs orientation on Stage 01.

---

## 7. Related pages

- [02-safety-flow.md](./02-safety-flow.md) — wizard after fork chips
- [06-path.md](./06-path.md) — Safety as first of four stages
- [11-pricing.md](./11-pricing.md) — SafeGuide vs SafeStart tiers
