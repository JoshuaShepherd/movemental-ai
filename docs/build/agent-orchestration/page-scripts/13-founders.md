# Founders screen

**Screen id:** `founders`  
**Role:** Who stands behind Movemental — Alan, Brad, Josh with trust framing and connection to the leader network.

---

## 1. How you get here

| Trigger | Scene |
| --- | --- |
| Chip **Who's behind this?** (historical opening variant) | `whoBehind` |
| Regex: who, behind, leader, team, trust | `whoBehind` |
| Chips from about, leader | `whoBehind` |
| Live engine | Founders render |

---

## 2. Entry choreography (`whoBehind`)

1. **Show** founders screen.
2. Wait ~480ms.
3. **Say:** three lines from founder agent answers SSOT — who the founders are, how they connect to the movement, CEO note.
4. **Suggest:**
   - **Talk to us** (lead) → contact
   - **Map where we actually stand** → beat
   - **About Movemental** → about

---

## 3. What appears on the sheet

Founders team layout — Alan (Co-Founder / CMO), Brad (Co-Founder / CEO), Josh (Founder / CTO) with bios and photos.

Copy emphasizes connection to portraits on home band.

**Crumb:** ↑ Home.

---

## 4. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

### Float chips on this screen

| Chip | Collapsed | Expanded |
| --- | --- | --- |
| **Talk to us** (lead) | LOCAL → contact | LOCAL |
| **Map where we actually stand** | LOCAL → beat | LOCAL |
| **About Movemental** | LOCAL → about | **AGENT** (opening label) |

### Type in the composer on this screen

| Input | Typical result |
| --- | --- |
| *"who"*, *"founders"*, *"behind"* | LOCAL → founders (this screen) |
| *"about movemental"* | LOCAL → about |
| Leader-specific questions | AGENT — may use founder knowledge / corpus |
| `chatActive` true | AGENT only |

Entry voice uses **pre-written founder lines** (LOCAL `say`), not model prose.

### Sheet vs drawer

AGENT prose-only turns show **behind: {screen}** in the drawer header and **↩ Back to {screen}** in the thread; host must call matching `show_*` on renderable topics.

Standard rules. AGENT about founders without `ui_render` hides founders sheet behind scrim.

---

## 5. Related pages

- [14-leader-profiles.md](./14-leader-profiles.md) — extended leader band
- [10-about.md](./10-about.md)
