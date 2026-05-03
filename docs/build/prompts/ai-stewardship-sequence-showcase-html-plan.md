# Prompted plan — AI Stewardship Sequence full showcase (static HTML)

**Created:** 2026-04-21  
**Purpose:** Step-by-step instructions for a designer–developer pair (or a single agent) to build a **standalone** HTML/CSS/JavaScript page under `docs/html/` that functions as the **central teaching surface** for the **AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions** — one scrollable place that explains the model, links to **all** load-bearing articles and resources, and cross-links the **field guide**, assessments, and engagement surfaces without forking vocabulary.

**Outcome artifact (suggested):**  
`docs/html/ai-stewardship-sequence-showcase.html`  
*(or a small folder `docs/html/ai-stewardship-sequence-showcase/` with `index.html`, `showcase.js`, `showcase.css` if the interaction model outgrows a single file — see §7.)*

**Do not confuse with:**  
- **`/book`** — sustained thesis (*From Fragmentation to Movement*); not the operating sequence.  
- **Existing course previews** — [`docs/html/courses/ai-stewardship-sequence-index.html`](../../html/courses/ai-stewardship-sequence-index.html) is an excellent **spine** for the four stages + internal preview HTML; this showcase **extends** that job with **exhaustive canon links**, methodology articles, sandbox curriculum hub, and assessment CTAs.

---

## 0 · Read first (repo SSOT)

| Document | Why |
| -------- | --- |
| [`docs/arguments/SITE-SSOT.md`](../../arguments/SITE-SSOT.md) | Routes, nav, **naming doctrine** (AI Stewardship Sequence; order is load-bearing; acronym-first “SSSS” deprecated in **new** user-facing copy). |
| [`docs/build/prompts/strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) | Book vs **AI Stewardship Sequence field guide**; `/assess` vs `/assessment-new`; what each surface *owns*. |
| [`docs/design/STATIC_HTML_AND_TEMPLATES.md`](../../design/STATIC_HTML_AND_TEMPLATES.md) | `<head>` contract, **no duplicated `:root`**, load order, shell choice. |
| [`docs/design/DESIGN.md`](../../design/DESIGN.md) | L0–L4, Midnight bands, trust (L2b), typography. |
| [`docs/articles/_inventory.md`](../../articles/_inventory.md) | Canon order, shapes, **sandbox** slugs — use to avoid missing articles. |

---

## 1 · Job of the page (one sentence)

**Teach the ordered path in one sitting** and let every kind of reader **drill to the right depth** (executive summary → field guide → individual articles → assessments → services) **without** duplicating the book’s full thesis arc.

---

## 2 · Information architecture (proposed)

Design this as **seven vertical bands** plus **persistent orientation** (sticky subnav or jump links). Each band maps to a clear reader job.

| # | Section `id` | Reader job | Content |
| -- | ------------- | ---------- | ------- |
| 1 | `#top` | **Orient** | Hero: name the sequence once in full (“the AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions”). One-line claim: order is the framework; later stages borrow trust from earlier ones. Primary CTA → field guide; secondary → assessments. |
| 2 | `#model` | **See the whole** | Visual “rail” or horizontal stepper (1→4) + **short** definitions per stage (2–3 sentences each). Optional: simple SVG or CSS-only diagram (no dependency). |
| 3 | `#why-order` | **Believe the sequence** | Tight copy + pull quote; link to [`why-order-matters`](https://movemental.com/articles/why-order-matters) and canon spine [`the-ssss-framework`](https://movemental.com/articles/the-ssss-framework) (URL slug is legacy; **on-page copy** says “AI Stewardship Sequence,” not “SSSS”). |
| 4 | `#safety` | **Stage 1 depth** | Safety articles + governance notes + `/assess` where relevant. |
| 5 | `#sandbox` | **Stage 2 depth** | Sandbox methodology + **all** `docs/articles/sandbox/*` articles + `/articles/sandbox` + Sandbox Season service. |
| 6 | `#skills` | **Stage 3 depth** | Formation canon + `the-skill-of-ai` + skills-as-formation + optional course preview link. |
| 7 | `#solutions` | **Stage 4 depth** | Solutions methodology + why-solutions-come-last + engagements pointer. |
| 8 | `#library` | **Single index** | Sortable or grouped **master list** of every linked article (see §4) — the “everything in one place” table for power users. |
| 9 | `#act` | **Move** | CTAs: `/contact`, `/services`, `/services/sandbox-season`, `/assess`, `/assessment-new` — each with **one honest line** of what the visitor gets (per strategy doc). |

**Cross-links required (once each in prominent but not repetitive positions):**

- **AI Stewardship Sequence field guide:** `https://movemental.com/articles/ssss-field-guide-for-organizational-leaders`  
- **Book hub (thesis, not sequence):** `https://movemental.com/book`  
- **Six-stage narrative:** `https://movemental.com/fragmentation`  
- **Assessments hub:** `https://movemental.com/assess`  
- **Dual-intelligence diagnostic:** `https://movemental.com/assessment-new`  
- **Sandbox article hub:** `https://movemental.com/articles/sandbox`  
- **Journey checklist (if treated as public resource):** `https://movemental.com/articles/the-ssss-journey-assessment-checklist`  

---

## 3 · URL policy for static HTML

- **Prefer absolute production URLs** (`https://movemental.com/...`) for article and app links so the file works when opened from disk, emailed, or hosted off-repo — match the pattern in [`ai-stewardship-sequence-index.html`](../../html/courses/ai-stewardship-sequence-index.html).  
- **Internal preview links** (to other `docs/html` course previews) may stay **relative** from the new file’s directory.  
- If the showcase lives at `docs/html/ai-stewardship-sequence-showcase.html`, relative paths to templates are: `./site-templates/site-theme.css` and `./site-templates/course-sequence-preview.css` (reuse course sequence styles where possible — see §6).

---

## 4 · Content inventory (minimum link set)

Use this as a **checklist** when building §8 “library.” Expand descriptions on the page; here, slugs only.

### 4.1 Canon staircase — path & synthesis (AI Stewardship Sequence spine)

From [`_inventory.md`](../../articles/_inventory.md) canon rows with `topics` including `ssss` or explicit stage names:

- `there-is-a-way-through-this`  
- `the-ssss-framework`  
- `why-order-matters`  
- `safety-before-speed`  
- `the-purpose-of-sandbox`  
- `skills-as-formation-not-training`  
- `why-solutions-come-last`  
- `the-movemental-thesis`  

### 4.2 Methodology articles (named in inventory under Methodology)

- `solutions-deployment`  
- `sandbox-discovery`  

### 4.3 Safety-adjacent story / governance

- `the-work-of-safety`  
- `nonprofits-pii-private-agentic-rag` (AI note — governance)  

### 4.4 Sandbox curriculum (`sandbox/`)

All nine sandbox articles from inventory:

- `sandbox/discovery-engine-not-generator`  
- `sandbox/discovering-value-under-constraint`  
- `sandbox/the-three-kinds-of-value`  
- `sandbox/the-three-layers-of-sandbox-work`  
- `sandbox/the-eight-patterns-where-value-hides`  
- `sandbox/scoring-value-honestly`  
- `sandbox/recipes-are-not-cooking`  
- `sandbox/the-ethical-and-relational-flag`  
- `sandbox/building-the-use-case-portfolio`  

### 4.5 Skills-adjacent

- `the-skill-of-ai` (AI note)  

### 4.6 Two intelligences (context for why “formation” matters)

Keep **short** on this page; link deeper to book Ch.2 via site:

- `two-intelligences-integration`  
- Book chapter: `https://movemental.com/book/read/two-intelligences`  

### 4.7 Playbooks (audience entry points)

- `playbook-nonprofit`, `playbook-church`, `playbook-institution`, `playbook-movement-leader`  

### 4.8 Optional “supporting canon” (problem/future) — link from a collapsible “Wider argument” row

If the page risks **overwhelming**, tuck canon pieces 1–10 and 18–22 under a **collapsed** `<details>` or a “Wider fragmentation staircase” link list — still **one page**, but staged disclosure.

---

## 5 · UI / UX design brief (for the collaborator designer)

**Visual hierarchy**

1. **Hero** — largest display type for “AI Stewardship Sequence”; subline in Instrument Serif italic for the four names; muted body for the “order is the framework” sentence.  
2. **Midnight band** — use for `#model` or `#act` only (one or two bands max; avoid carnival).  
3. **Stage sections** — shared card pattern: **stage label** · **one-sentence promise** · **3–5 links** · **“read next”** microcopy.  
4. **Library table** — responsive: stack on small screens; optional `<thead>` sticky inside section on desktop.

**Interaction (JavaScript — keep minimal)**

- **Sticky jump nav** or **scroll-spy** highlighting current stage (`IntersectionObserver`).  
- **Back-to-top** control after the fold.  
- Optional: **filter chips** on `#library` (data attributes on rows: `data-stage="safety|sandbox|skills|solutions|context"`).  
- **No** framework dependencies; vanilla JS only; defer script.  
- Respect **reduced motion**: disable scroll animations if any; prefer instant scroll for in-page anchors.

**Accessibility**

- Landmark regions: `<header>`, `<main>`, `<nav aria-label="On this page">`, `<footer>`.  
- Skip link to `#model` or `#main`.  
- Contrast: use tokens from `site-theme.css` only.

---

## 6 · Step-by-step build sequence

### Phase A — Scaffold

1. Create the target HTML file under `docs/html/` (see outcome in header).  
2. Paste the **mandatory `<head>` contract** from [`STATIC_HTML_AND_TEMPLATES.md`](../../design/STATIC_HTML_AND_TEMPLATES.md) **§2.2** (root prototype path): Inter preconnect + `site-theme.css` + `prototype-pages.css`.  
3. Add **`course-sequence-preview.css`** after `prototype-pages.css` if you reuse `band-midnight`, `stage-card`, `sssq-*` patterns from [`ai-stewardship-sequence-index.html`](../../html/courses/ai-stewardship-sequence-index.html).  
4. Add empty `<main id="main">` with section skeletons matching §2.

### Phase B — Copy layer

5. Write hero + `#model` using **non-acronym** vocabulary; first mention spells all four stages.  
6. Draft `#why-order` with one pull quote (blockquote.pull-quote if class exists in linked CSS; else use semantic `<blockquote>`).  
7. For each stage section (#4–#7 in §2), write **original** bridging copy (do not paste full articles — **link** for depth).  
8. Add `#library` as a definition list or table: columns **Title · Stage tag · One-line description · Link**.

### Phase C — Link verification

9. Every slug in §4 must appear at least once in `#library`; stage sections should surface **the most load-bearing** 3–5 each.  
10. Run a quick **grep** or script: ensure no `http://` typos; field guide URL exact match.  
11. Confirm **no** new user-facing “SSSS” / “4S” branding (per SITE-SSOT); file paths in prose may say “field guide” with explicit “AI Stewardship Sequence field guide” on first reference.

### Phase D — JavaScript

12. Implement sticky nav + optional scroll-spy in **one** deferred `<script>` or external `showcase.js`.  
13. If using `showcase.js`, keep **&lt;100 lines** unless filter UI justifies more.

### Phase E — QA

14. Open file locally in Chrome + Safari: check fonts load, anchors work, sticky nav does not obscure headings (use `scroll-margin-top` on section headings).  
15. Run through **`movemental-page-auditor`** skill mentally: narrative order, proof burden (no fabricated stats), cross-site role (this page complements, not replaces, `/fragmentation` and `/book`).  
16. Optional: add a one-line comment in HTML `<!-- Canonical live route if this ships: TBD -->` for future Next.js migration.

---

## 7 · Relationship to existing HTML

| Artifact | Action |
| -------- | ------ |
| [`docs/html/courses/ai-stewardship-sequence-index.html`](../../html/courses/ai-stewardship-sequence-index.html) | **Reuse** structure, CSS classes, and stage card prose patterns; **add** §2 bands `#library`, fuller article matrix, assessment block, book/fragmentation cross-links. |
| [`docs/html/courses/*`](../../html/courses/) previews | Link from Solutions/Sandbox sections as **“program shape”** context. |
| Future production route | If this graduates to `(site)`, keep this HTML as the **design reference** and port sections to React primitives (`Section`, `Container`, etc.). |

---

## 8 · Acceptance criteria (done = all true)

- [ ] Single HTML entry point opens with **no build step** and reads coherently top-to-bottom.  
- [ ] First mention of the framework uses the full phrase **AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions**.  
- [ ] Every article in §4.1–§4.5 appears in the **library** with a working `movemental.com` URL.  
- [ ] Field guide, book, fragmentation, assess hub, assessment-new, articles/sandbox, and services/sandbox-season are all linked with **accurate labels**.  
- [ ] CSS obeys STATIC_HTML contract: **no** duplicate `:root` in page `<style>`.  
- [ ] JS enhances navigation only; page remains usable with JS disabled.  
- [ ] Footer states **draft / static preview** status and points to DESIGN.md for token parity.

---

## 9 · Suggested opening prompt (paste into a fresh agent thread)

```text
Build the static showcase described in docs/build/prompts/ai-stewardship-sequence-showcase-html-plan.md.

Deliver docs/html/ai-stewardship-sequence-showcase.html (+ optional showcase.js) following STATIC_HTML_AND_TEMPLATES.md. Reuse docs/html/site-templates/site-theme.css, prototype-pages.css, and course-sequence-preview.css. Implement the section IA in plan §2, link every article listed in plan §4, and add minimal vanilla JS for sticky in-page nav or scroll-spy. Do not introduce SSSS/4S acronym branding in visible copy. Cross-link the field guide, book, fragmentation, /assess, /assessment-new, and /articles/sandbox once each in the hero or “act” band.

When finished, list any canon article under docs/articles/ with topic ssss or series sandbox that is NOT linked so we can patch the plan.
```

---

**End of plan.**
