# FAQ screen

**Screen id:** `faq`  
**Role:** Ten grouped question-and-answer sections — honest answers including when Movemental is not the right fit.

---

## 1. How you get here

| Trigger | Scene |
| --- | --- |
| Chip **Read the FAQ** (opening — if present in variant) | `toFaq` |
| Regex: faq, frequently asked, common question | `toFaq` |
| Live engine | FAQ render tool |

Note: Current opening scene shows four chips without FAQ; FAQ remains reachable via regex, follow-up chips, and engine.

---

## 2. Entry choreography (`toFaq`)

1. **Show** faq screen.
2. Wait ~480ms.
3. **Say:** *"Honest answers, including when we're not the right fit."*
4. Wait ~160ms.
5. **Say:** *"Ten groups. Jump to what you need on the page."*
6. **Suggest:**
   - **Get in touch** (lead) → contact
   - **Map where we actually stand** → beat
   - **↺ Start over** → opening

---

## 3. What appears on the sheet

**Ten FAQ sections** from `data/faq.ts` — jump links or accordion groups covering philosophy, pricing, fit, AI stance, implementation, etc.

Visitor scrolls the sheet (FAQ scrolls unlike beat).

**Crumb:** ↑ Home.

---

## 4. Composer & drawer — visitor expectations

**Global rules:** [00-composer-drawer-global.md](./00-composer-drawer-global.md)

FAQ sheet **scrolls** — unlike beat. Visitor can read on-sheet while dock is collapsed.

### Float chips on this screen

| Chip | Collapsed | Expanded |
| --- | --- | --- |
| **Get in touch** (lead) | LOCAL → contact | **AGENT** (opening label) |
| **Map where we actually stand** | LOCAL → beat | LOCAL |
| **↺ Start over** | LOCAL → opening | LOCAL |

### Type in the composer on this screen

| Input | Typical result |
| --- | --- |
| *"faq"*, *"philosophy"*, *"stance on ai"* | LOCAL → faq (this screen) |
| *"contact"*, *"pricing"* | LOCAL → other screens |
| Question not matching regex | **AGENT** — expand + thread; host may point to FAQ sections or call FAQ render |
| `chatActive` true | AGENT only |

**Practical expectation:** Scroll the sheet for scripted Q&A; use composer for questions the ten groups do not cover.

### Sheet vs drawer

Expanded AGENT: **behind: FAQ** indicator preserves context label; **↩ Back to FAQ** returns to scroll position on collapse. LOCAL chip away collapses drawer and swaps sheet.

---

## 5. Related pages

- [15-contact.md](./15-contact.md)
- [10-about.md](./10-about.md)
