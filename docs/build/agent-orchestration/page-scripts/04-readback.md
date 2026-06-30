# Readback screen

**Screen id:** `readback`  
**Role:** Mirror the visitor’s answers back against the four-stage path (Safety → Sandbox → Training → Tech). Shows where they are, gap lines per stage, and fork chips for next steps.

Usually follows the **beat** diagnostic — especially when the Safety gate fails (most organizations).

---

## 1. How you get here

| Trigger | Context |
| --- | --- |
| Beat gate fail | Most common — one decision answer → readback |
| Beat full completion | All branch beats answered → computed gaps |
| Live diagnostician | Engine `show_readback` after `request_diagnosis` |
| Scene continuation | `beatScene` ends with `{ show: "readback" }` |

---

## 2. What appears on the sheet

**Eyebrow:** *"Your reality, mapped"* (or equivalent readback chrome)

**Path spine:** Four stage rows:
1. **01 Safety** — often marked *"you are here"*
2. **02 Sandbox**
3. **03 Training**
4. **04 Tech**

Each row shows either a **gap line** from computed `MapRead` (capitalized concern for that stage) or a **clear** line when no gap surfaced.

**Closing phrase** (gesture target `#rbphrase`):  
*"It starts with Safety — and so does almost everyone."*

**Optional:** Inline email capture for “Email me a copy” chip (`focusReadbackMapEmail` — may not swap screen).

---

## 3. What the agent does (local path)

Before or as the screen appears, voice acts from `readbackVoiceActs` or legacy full-path lines:

**Gate fail (typical):**
1. *"You're at Safety, leadership hasn't ratified it in writing yet."*
2. *"Your next move is to ratify what your organization will and won't do with AI."*
3. **Show** readback.
4. **Suggest** chips (gate-fail set).

**Full path (rare — cleared Safety):**
1. Gap summary lines from computed read.
2. *"The path is ordered. It starts with Safety."* (when gaps exist) or praise for clear shape.
3. **Gesture:** circle `#hereStage`, underline `#rbphrase`.
4. **Suggest** full-path chip set.

---

## 4. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

### Float chips after readback

All chips are **scene follow-ups** → **LOCAL always** (collapsed or expanded).

#### Gate fail (most orgs)

| Chip | Destination | Sheet change |
| --- | --- | --- |
| **Want this for your actual organization?** (lead) | `/assess` (navigate away) | Leaves room |
| Free handbook CTA | Safety flow DIY step | → safetyFlow |
| Build your dashboard | Safety flow signup step | → safetyFlow |
| ↺ Start over | Opening | → home |

#### Full path (cleared Safety)

| Chip | Destination | Sheet change |
| --- | --- | --- |
| **Want this for your actual organization?** (lead) | `/assess` | Leaves room |
| See what Sandbox looks like | Path screen | → path |
| Email me a copy | `focusMapEmail` | **Stays on readback** — scrolls to inline email |
| Talk to us | Discuss capture or contact | → capture or contact |
| ↺ Start over | Opening | → home |

### Type in the composer on this screen

| `chatActive` | Typical result |
| --- | --- |
| false | Regex may LOCAL-navigate (*"sandbox"*, *"contact"*) or AGENT for open questions |
| true | AGENT — host may elaborate on gaps; should call `show_readback`, `show_safety`, `show_path` rather than invent gap lines |

Submitting **inline map email** (if shown) uses capture API — not composer.

### Sheet vs drawer on this screen

| Event | Visible change |
| --- | --- |
| LOCAL chip (most chips) | Sheet swaps or navigates; drawer auto-collapses if open |
| **Email me a copy** | No swap — email field focused on readback |
| AGENT, prose only | Readback **hidden behind scrim**; thread updates |
| AGENT + `ui_render` readback/map | May focus email or refresh readback; collapse on `screenKey` change |

### Live model on this screen

Diagnostician narrates verdict; gap lines are **computed**, not model-authored. Engine must not invent stage gaps.

---

## 5. Related pages

- [03-beat-reality-check.md](./03-beat-reality-check.md) — source answers
- [02-safety-flow.md](./02-safety-flow.md) — handbook / dashboard chips
- [06-path.md](./06-path.md) — whole path context
