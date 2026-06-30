# About screen

**Screen id:** `about`  
**Role:** In-room summary of what Movemental is — founders named, link to full `/agent/about` document, optional Ask-your-AI export button.

This is the **stub sheet** shown by local choreography, not the long-form document page.

---

## 1. How you get here

| Trigger | Scene / route |
| --- | --- |
| Chip **About Movemental** (collapsed dock) | `whatIs` |
| Regex: what is, movemental, about | `whatIs` |
| Chips from founders, leader, pricing | `whatIs` |
| Live engine | `show_about` or equivalent render |
| Full document | `/agent/about` (separate route — see [19-document-pages.md](./19-document-pages.md)) |

---

## 2. Entry choreography (`whatIs`)

1. **Show** about screen.
2. Wait ~480ms.
3. **Say:** *"Here's the short version, the rest is on the page."*
4. Wait ~160ms.
5. **Say:** *"We help you meet AI without losing trust."*
6. **Suggest:**
   - **See the whole path** (lead) → path
   - **Map where we actually stand** → beat
   - **What does it cost?** → pricing
   - **Get in touch** → contact

---

## 3. What appears on the sheet

**Title:** About Movemental

**Lede:** Default — *"We help churches, nonprofits, and schools use AI without losing the trust their work depends on."* (Engine may override via stream props.)

**Who we are:** Alan Hirsch, Brad Brisco, Josh Shepherd — roles and founding story snippet.

**Founders team** visual (compact).

**Link:** *Read About Movemental →* to `/agent/about` for full story (Babel/Pentecost ethic, refusals, formation stakes).

**Ask your AI** button — exports prompt to external ChatGPT/Claude/Gemini; not the Movemental concierge.

**Crumb:** ↑ Home.

---

## 4. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

### Float chips on this screen

| Chip | Collapsed | Expanded |
| --- | --- | --- |
| **See the whole path** (lead) | LOCAL → path | LOCAL |
| **Map where we actually stand** | LOCAL → beat | LOCAL |
| **What does it cost?** | LOCAL → pricing | **AGENT** (opening label) |
| **Get in touch** | LOCAL → contact | **AGENT** (opening label) |

**About Movemental** opening chip (from home only): collapsed → this screen; expanded → AGENT.

### Type in the composer on this screen

| Input | Typical result |
| --- | --- |
| *"tell me about movemental"*, *"what is movemental"* | LOCAL → about (this screen) |
| Other navigation keywords | LOCAL → other screens |
| Unmatched / conversational | AGENT — may call `show_about` or answer in thread |
| `chatActive` true | AGENT only |

**Ask your AI** button on sheet exports to external providers — not composer/dock.

### Sheet vs drawer

LOCAL navigation collapses drawer. Host must call `show_about` on about topics (speak-and-show). Prose-only → **behind: About** indicator + **↩ Back to About** affordance.

---

## 5. Related pages

- [19-document-pages.md](./19-document-pages.md) — `/agent/about`
- [13-founders.md](./13-founders.md) — deeper founder focus
- [01-home.md](./01-home.md) — opening chip source
