# Stitch prompt — Movemental marketing home (tabbed-argument spine, curated)

This file **replaces** any prior “home page” Stitch prompt that used [src/app/(site)/page.tsx](../../../src/app/(site)/page.tsx) as copy SSOT. **Copy for this screen** comes only from the **Home** panel of [docs/html/tabbed-argument-page.html](../../html/tabbed-argument-page.html) (`#panel-home`), **curated for length** — not the full ~52 routed rows.

---

## How to use (operators)

1. Open this file and copy **everything inside the `GENERATION PROMPT` fence** below (the inner ```markdown … ``` block — copy from `[Overall vibe]` through the last line before the closing fence).
2. In Stitch, call **`generate_screen_from_text`** (or your UI equivalent) with:
   - **`projectId`:** `2208910962065880866` — see [docs/build/stitch-project.md](../stitch-project.md). Do **not** use `list_projects` in routine flows.
   - **`deviceType`:** `DESKTOP` (primary). Optional follow-up: `MOBILE`.
   - **`prompt`:** pasted block.
3. After generation, capture Stitch `outputComponents` notes; download HTML/screenshot per your [stitch-design](../../.claude/skills/stitch-design/SKILL.md) workflow.
4. For React: [stitch-to-react-migration.md](./stitch-to-react-migration.md) — remap raw hex in Stitch output to **semantic** tokens from [DESIGN.md](../../design/DESIGN.md) §11.

---

## Sources of truth

| Layer | File |
| ----- | ---- |
| **Copy (canonical)** | [docs/html/tabbed-argument-page.html](../../html/tabbed-argument-page.html) — `#panel-home`, ordered list; each claim: `h4.card__title` + `p.card__body` inside `<details>`. Hand-ranked head = `li.card.card--head`. |
| **Copy (extract aid)** | [docs/build/_outputs/tabbed-home-hand25-extract.md](../_outputs/tabbed-home-hand25-extract.md) — first 25 `card--head` rows; use if pasting into Stitch without HTML open; **if HTML and extract disagree, trust HTML**. |
| **Visual charter** | [docs/design/DESIGN.md](../../design/DESIGN.md) — “The Digital Curator”; light-primary; regional Midnight; Inter; token discipline. |
| **Static composition cues** | [docs/design/STATIC_HTML_AND_TEMPLATES.md](../../design/STATIC_HTML_AND_TEMPLATES.md), [docs/html/site-templates/](../../html/site-templates/) |

**Prompt structure** follows [stitch-design](../../.claude/skills/stitch-design/SKILL.md): mood → **DESIGN SYSTEM** → **PAGE STRUCTURE** / content rules.

---

## Content budget (curated — not the full Home tab)

The Home tab in the HTML lists **~52** items. That list is an **internal routing index**. The **public home** must **not** paste every row.

| Rule | Detail |
| ---- | ------ |
| **Order** | Claims appear in **panel rank order** (rank 1 first). |
| **Spine (full sections)** | Ranks **1–8** by default: each = one editorial section with **title + body verbatim** from the HTML. |
| **Extension** | Ranks **9–12** as full sections **only** if the page still feels airy. **Ceiling: 12** full claim sections total. |
| **Tail** | Ranks **13–25** (`card--head` only): at most **one** band, **compressed** (3–6 bullets or a tight digest). **Paraphrase allowed only in that digest**; any remaining full sections must stay **verbatim**. |
| **Long tail** | Items outside the hand-ranked head or below rank 25: **no** full-width sections on this screen. |
| **Emphasis** | Favor **Positioning → Pain → Argument → Proof** before stacking extra **Sell** / **Strategy** / **Business** if space runs out. |
| **`docs/...` paths** | Provenance only — footnote / “Sources” styling, never the hero. |

---

## GENERATION PROMPT (copy everything inside the fence)

```markdown
[Overall vibe]
Design a **premium editorial marketing home** for Movemental — **high-end publication spread**, not a SaaS control panel. Tone: **credible, urgent, intellectually serious** (credibility crisis, scenius, infrastructure thesis) while staying **scannable**. **Breathing layout**: generous vertical rhythm; if tight, **drop extension claims or strengthen the tail digest** — never shrink type to fit. **Light-primary** site with **regional Midnight** bands for authority. **Calm motion** only; respect reduced-motion sensibility.

**DESIGN SYSTEM (REQUIRED):**
- **Platform:** Web, **desktop-first** (1280–1440px artboard).
- **Typeface:** **Inter only** (no second display font). Display: semibold–bold, ~**-0.02em** letter-spacing. Eyebrows / micro labels: uppercase, widened tracking, muted ink.
- **Semantic palette (use roles in output; remap raw hex from Stitch):**
  - **background** #f7f9fb · **section** / **muted** #f0f4f7 · **card** #ffffff · **elevated** / **secondary** #e1e9ee · **foreground** #2a3439 · **muted-foreground** #566166
  - **Midnight (regional only):** **inverse-surface** #101820, **inverse-foreground** #f7f9fb — step body/meta with **opacity on inverse ink**; do **not** use light-theme muted gray on Midnight.
  - **Primary** #0053db — **sparse** (CTAs, key emphasis, focus). **Primary dim** #0048c1 — **only** for **135°** CTA gradient (primary → primary-dim); **no other gradients**.
- **No-line rule:** no decorative `border-b` / `divide-y` between major bands — **surface ramp** + padding define chapters.
- **Elevation:** prefer tonal **ghost lift**; optional single **ambient** shadow: `0 12px 40px rgba(42, 52, 57, 0.06)` on floating cards only.
- **Layout:** outer rail **~1200px** max; long copy **~680px** max width; default vertical band **~80px**, hero / major turns **~120px**.
- **Policy:** **no** global dark `html`. **No** `bg-black` / `text-black` / unconstrained raw grays — see charter remap rules.
- **a11y:** WCAG-minded contrast; visible **focus-visible** rings; semantic heading order.

**STITCH → CHARTER REMEDIATION (when coloring):** Replace `bg-white`, `#ffffff` → card/popover; `#f0f4f7` → section; `#0053db` / `bg-blue-600` → primary; `#101820` → inverse-surface; `text-gray-*` → muted-foreground; decorative section borders → remove; arbitrary heavy shadows → none or ambient only.

**CONTENT SSOT:**
Substance must come from **`#panel-home`** in `docs/html/tabbed-argument-page.html`. For every **full** editorial section: **`h4.card__title`** and **`p.card__body`** (inside the card’s `<details>`) **verbatim** — no substitution with alternate marketing copy (e.g. not from current Next.js `page.tsx`).

**CONTENT BUDGET (CURATED — NOT ALL ~52 ROWS):**
- The Home tab HTML lists **~52** items; it is a **routing index**, not a mandate to render every card.
- **Default:** ranks **1–8** (`li.card.card--head` order) = **eight** full sections, verbatim title + body each.
- **Optional:** ranks **9–12** as extra full sections **only** if the layout still reads as **editorial / airy**. **Hard cap: 12** full claim sections in the main scroll.
- **Ranks 13–25:** at most **one** compressed band (bullets or two-column digest). **Paraphrase allowed only there.** Do not open 13 more full sections.
- **Beyond rank 25 / non–card--head tail:** do **not** promote to full sections on this page.
- **Visual hierarchy:** privilege early ranks (scale, Midnight placement, whitespace). Later ranks = smaller or grouped.
- **Internal `docs/...` source paths:** metadata / footnotes only — never the hero headline.

**AUTONOMOUS INTERPRETATION:**
You decide **composition** per included claim (split layout, pull-quote, inset metrics, icon row), **which** ranks 9–12 to include, **where** Midnight lands, and **nav/footer** grouping — provided **rank order**, **verbatim** full sections, **budget ceiling**, and **design system** hold. Add **one primary CTA** + **one secondary** (e.g. Contact / Apply paths) without inventing phone numbers or addresses.

**PAGE STRUCTURE (adapt within budget):**
1. **Sticky nav** — glass / frosted bar; Movemental mark; sensible marketing IA links.
2. **Hero (light band)** — **H1 / display:** rank **1** `card__title` **verbatim**. **Lede:** rank **1** `card__body` **verbatim** (whitespace normalize only) at comfortable measure.
3. **Sections** — ranks **2–8** (then **9–12** if used): each with **category** visible (Positioning, Pain, Argument, Sell, Proof, Theology, Strategy, Audience, AI, Business — match the HTML `card__cat` label), then **title** + **body** verbatim for full sections.
4. **Midnight band (optional)** — feature the strongest **Proof** or **Argument** from the set you included (still verbatim if body copy is shown at full length).
5. **Compressed tail (optional)** — single band for any **13–25** material you choose to surface; bullets or digest only.
6. **Closing CTA** — primary + secondary buttons.
7. **Footer** — column links + meta row; no fake contact data.

**Browser meta (optional on canvas):**  
Suggested **title:** `Movemental — Movement infrastructure for a credibility-scarce age` (from rank 1 title if it fits; else shorten without changing meaning).  
Suggested **description:** one sentence **assembled from rank 1 body phrases** (no new factual claims).
```

---

## UI type map (React / primitives parity)

| Stitch region | Product mapping |
| ------------- | ----------------- |
| Vertical bands | `Section` — `variant`: `default` \| `section` \| `elevated` \| `midnight`; `spacing`: `sm` \| `lg` |
| Horizontal rail | `Container` |
| Hero / section titles | `Display` (`lg` / `md` / `sm`) |
| Category / kicker | `Eyebrow` or compact label chip |
| Body copy | `Prose` |
| Asymmetric layouts | `FeatureSplit`, `SurfaceCard` (`tone`: `on-background` \| `on-section` \| `midnight`) |
| Actions | `Button`, `ArrowLink` |

---

## After generation (checklist)

1. **Length:** No dump of ~52 cards; **≤12** full claim sections; **≤1** digest band for tail.  
2. **Verbatim:** Ranks included as **full** sections match HTML **title + body** (1–8 mandatory if nothing dropped).  
3. **Tokens:** Semantic ramp + Midnight ladder per [DESIGN.md](../../design/DESIGN.md) §3–§11.  
4. **Handoff:** [stitch-to-react-migration.md](./stitch-to-react-migration.md).
