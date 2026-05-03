# Prompt: Page cutoffs, duplication policy, static HTML aligned to the React theme, and argument inventory marking

Use this document when turning the routed argument inventory (`docs/html/tabbed-argument-page.html`) into **draft public-site HTML** in `docs/html/site-templates/`, and when updating **which deduped items already have a narrative home** vs **which still need placement**.

Canonical visual system for the production app: `docs/design/DESIGN.md` and token implementation in `src/app/globals.css`. Static HTML must mirror **semantic tokens** (surfaces, primary, inverse/midnight, prose width, section rhythm) — not Tailwind class names from TSX, but the **same hex/CSS-variable meanings** so previews feel like the Next.js site.

---

## Part A — How a content marketing expert decides the cutoff per page

Treat each URL as having a **primary job-to-be-done (JTBD)** and a **time budget** for a cold visitor. The cutoff is where additional claims stop increasing clarity, confidence, or next-step intent and start adding **noise, repetition, or decision fatigue**.

### A1. Qualitative gates (always)

1. **JTBD fit** — Every block must answer: *Why does this sentence exist on this page specifically?* If the honest answer is “because we like saying it,” cut or move it.
2. **One dominant story per scroll depth** — Hero answers *what / for whom / why now*. The next band deepens *mechanism* or *proof*, not a second hero. If two bands compete to be “the thesis,” merge or demote one.
3. **Cognitive load** — Prefer one memorable frame over three half-developed ones. Editorial sites win on **sequence**, not density.
4. **Objection order** — Pricing/FAQ answer buying friction; do not front-load fine print on Home. Methodology earns trust for skeptics who already care; do not open with process on the front door.
5. **Audience specificity** — “Who we serve” and segment pages may reuse *themes* but must change *examples and stakes*. Same statistic, different moral for the reader = duplicate. Same paragraph copy-pasted = failure.

### A2. Numerical guardrails (soft caps, adjust for voice)

These are **heuristics**, not laws. Break them when the narrative clearly needs more room (e.g. legal Terms).

| Page archetype | Target readable words (body) | Sections (bands) | Notes |
| -------------- | -----------------------------: | ----------------: | ----- |
| Home | 450–750 | 4–6 | Must pass the “30-second stranger” test; one primary CTA. |
| About / origin | 600–900 | 5–7 | Story + values; light on feature lists. |
| Evidence / proof | 500–800 | 4–6 | Numbers and third-party signals; every stat tied to “so what.” |
| FAQ | Q&A pairs until redundancy | accordion or short sections | Stop when new questions repeat prior answers. |
| Methodology | 700–1100 | 5–8 | Mechanism depth; still no wall of jargon. |
| Pricing | 400–700 + tables if needed | 3–5 | Transparency without burying the offer. |
| Services | 550–900 | 5–8 | Outcomes and deliverables, not internal org chart. |
| System / architecture | 600–1000 | 5–7 | Diagrams or lists only if they reduce confusion. |
| Terms / legal | As required | minimal marketing | Tokens yes; no invented obligations. |
| Walkthrough / journey | 500–800 | 4–6 | Time-ordered; one path, optional branches as links. |
| Who we serve | 500–850 per primary segment | 4–6 | Segment-first language; avoid “everyone” dilution. |

**Scroll discipline:** if a section does not change the reader’s mental model, cut it or fold it into a footnote / linked doc.

### A3. The cutoff decision (synthesis)

**Stop adding content when:**

- Adding a claim does not change *belief*, *trust*, or *next action* for the page’s JTBD, **or**
- The claim is better served on another page’s JTBD (route it there instead), **or**
- The page already exceeds its soft word cap **and** the new material is not resolving a documented gap from the argument index.

---

## Part B — Duplication vs “covered elsewhere” (canonical policy)

**Default: do not duplicate.** When an argument is fully expressed on the best-fit page, other pages should **reference the idea in one line** (with a link) or **omit** it — not paste the same paragraph.

**When limited duplication is allowed:**

1. **Bridge sentence** — One sentence on Page B that acknowledges what Page A already proved (“We spell out the numbers on Evidence — here we focus on what that means for your board.”).
2. **Stat + different interpretation** — Same number, new “so what” for that audience (not the same surrounding copy).
3. **Legal / safety** — Short repeated disclaimers where required (privacy, AI limitations, org governance).
4. **Navigation / orientation** — Repeated micro-copy in headers/footers (not body thesis).

**Always cross off the list** in the argument inventory when the **substance** of an item is shipped on a page, even if only once. The inventory’s job is to prevent orphaned ideas — not to encourage repeating them everywhere.

---

## Part C — Prompt for building HTML/CSS/JS static templates

You are building **standalone** files under `docs/html/site-templates/` for stakeholder preview and copy iteration. They are **not** the Next.js app; they must still **look** like Movemental (“The Digital Curator”).

### C1. Files to create or update

- `site-theme.css` — `:root` variables aligned with `src/app/globals.css` / DESIGN.md (background `#f7f9fb`, foreground `#2a3439`, section `#f0f4f7`, card `#fff`, inverse `#101820`, primary `#0053db`, prose max `680px`, container max `1200px`, section vertical rhythm `80px` / `120px` for heroes).
- One HTML file per public route in scope (see list below). Each file:
  - Loads Inter from Google Fonts (static preview exception; production Next uses `next/font`).
  - Uses semantic structure: `header.site-midnight`, `main`, `section` bands with `data-surface` or class names mapped to tokens.
  - Includes a **shared nav** linking sibling templates.
  - Keeps JS minimal (mobile nav toggle if needed); no frameworks.

**In-scope routes** — include **both** the App Router marketing pages **and** the **legacy tab routes** from `tabbed-argument-page.html` (same intents as those tabs), so draft HTML stays aligned with how arguments are routed.

- **Legacy tabs (argument index):** `how-it-works.html`, `movement-leaders.html`, `churches-nonprofits.html`, `proof-about.html`, `pricing-faq.html` (Home is `index.html`).
- **Page-type tabs:** `about.html`, `evidence.html`, `faq.html`, `methodology.html`, `pricing.html`, `services.html`, `system.html`, `terms.html`, `walkthrough.html`, `who-we-serve.html`

**Home:** `index.html`

### C2. Visual rules (non-negotiable)

- **Inter only** for static templates (no secondary display font unless DESIGN explicitly adds one later).
- **No raw gray hex** for text — use `--foreground` / `--muted-foreground`.
- **Midnight hero** = `background: var(--inverse-surface); color: var(--inverse-foreground);`
- **Primary** for CTAs and key links only.
- **No decorative 1px borders** between major sections — use tonal bands (`section` vs `card`).
- **Ghost lift:** `card` blocks on `section` background before shadows; `shadow` only as `0 12px 40px rgba(42, 52, 57, 0.06)` if needed.

### C3. Copy stance

Write as an **expert storyteller**: tension first, plain language, theological and institutional **dignity** without hype. Prefer **specific nouns** over platform abstractions. Do not cram every routed argument into one page — apply Part A and Part B.

### C4. Argument inventory marking (after each build pass)

The tabbed inventory (`docs/html/tabbed-argument-page.html`) lists **173** unique `data-id` items. After drafting templates:

1. Maintain **`docs/html/argument-publication-status.js`** with:
   - `window.MVMTL_ARGUMENT_USED` — object keyed by `data-id`, values `{ pages: string[] }` listing which template file(s) substantially incorporate that item.
   - Every id from `docs/html/argument-ids.json` should appear either as **used** or be left implicit as **remaining** (script treats missing keys as remaining).

2. **`docs/html/argument-publication-status.js`** applies classes to every `li.card[data-id]`:
   - `card--pub-used` + badge “In draft site”
   - `card--pub-remaining` + badge “No draft home yet”

3. Extend **`docs/html/tabbed-argument-page.css`** for badges and optional left-rail tint so status is visible at a glance.

4. Add a short **legend** paragraph in the tabbed page intro linking to `site-templates/index.html` and explaining that badges reflect the latest static draft pass.

**Editorial rule:** only mark an id **used** when a reasonable reader would recognize the claim’s **substance** on the linked page. Do not mark for a single adjective overlap.

---

## Part D — Execution checklist (for the agent running this prompt)

- [ ] Read DESIGN.md L0–L5 and `globals.css` `:root` before writing CSS.
- [ ] Write or refresh all listed HTML templates + `site-theme.css`.
- [ ] Update `argument-publication-status.js` used map to match what the copy actually covers.
- [ ] Wire script + legend + CSS into `tabbed-argument-page.html` / `tabbed-argument-page.css`.
- [ ] Quick pass: open `index.html` and `tabbed-argument-page.html` in a browser (local server if needed) and verify nav + badges.

---

## References

- Argument index UI: `docs/html/tabbed-argument-page.html`, `tabbed-argument-page.css`, `tabbed-argument-page.js`
- Deduped id list: `docs/html/argument-ids.json` (generated; 173 ids)
- Production theme: `docs/design/DESIGN.md`, `src/app/globals.css`, `src/app/(site)/*/page.tsx`
