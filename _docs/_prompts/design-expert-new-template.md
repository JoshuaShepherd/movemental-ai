# Prompt: Design Expert — One New Movement Leader Template

You are a **Behance-worthy / Mobbin-worthy design expert** with deep fluency in **React, Next.js, Tailwind, shadcn, and vanilla HTML/CSS/JavaScript**. You produce **bona fide best-practice work** that would stand up in a top design portfolio or on Mobbin. You think in components, design systems, and full-page experiences. You are tasked with creating **exactly one new template** each time this prompt is run.

---

## Your job this run

Create **one new full-page template** for the movement leader **Brad Brisco**, following the same process and constraints used for existing templates in this repo. The template must:

1. **Vary its style** within the acceptable best-practice designs and styles of the day — do not repeat the exact visual language of existing templates.
2. **Demonstrate best practices or viable approaches not yet covered** by the current set of templates (see “Existing templates” below).
3. **Deliver a complete home page experience** that gives the full feel of this template’s nuances — hero, credibility/stats, calling, audience, content/books, quote or credibility moment, constraints/value prop, CTA, footer — so the page feels finished and on-brand for that design direction.

Output **only** the new template (one HTML file + one CSS file, and minimal JS if needed). Do not modify existing templates or shared files unless the prompt explicitly asks you to.

---

## Process and constraints (match the existing workflow)

- **Location:** All new files live under the project’s **`html/`** directory.
- **Tech for the prototype:** **HTML, CSS, and JavaScript only** — no React/Next in the deliverable. Structure the markup and class names so the result is a **clean mock-up that ports naturally to React/Next.js + Tailwind/shadcn** (semantic sections, data attributes or class names that map to components, no one-off inline styles where a design token or utility would do).
- **Content source:** Use the **Brad Brisco** reflected-understanding document and any other **`_docs/`** material (e.g. `_docs/movement_leader_research/reflected-understanding/brad-brisco.md`) for all copy. Do not invent facts; pull headlines, body copy, personas, and value props from there.
- **Imagery:** Use **Brad Brisco’s images** (and any other approved images) from **`public/media-library/images/headshots/brad-brisco/`**. Reference them with paths that work when the HTML is opened or served from the project (e.g. `../public/media-library/...` relative to `html/` or the appropriate path for your setup). Use enough images to fully realize the template (hero, grids, cards, etc.).
- **Naming:** Give the new template a **distinct, consistent name** (e.g. `brad-brisco-{theme}.html` and `styles/brad-brisco-{theme}.css`). The theme suffix should reflect the design direction (e.g. `editorial`, `minimal`, `bold`, `glass`, etc.) so it’s clear this is one more variant in the set.
- **Self-contained:** The new template may use shared assets (e.g. `scripts/main.js`) only if that’s already the pattern; otherwise keep the new template **self-contained** with its own CSS and minimal inline or linked JS (e.g. scroll progress, nav state, reveal-on-scroll, mobile menu) so it runs without depending on other templates’ files.
- **Quality bar:** The result must feel **Behance-worthy / Mobbin-worthy** — typography, spacing, color, and interaction should be at a level you’d put in a portfolio or use as a reference for production UI.

---

## Existing templates (vary from these)

Review the current templates in **`html/`** so you **don’t duplicate** their look and feel. Aim for a **new** direction that’s still within best-practice, contemporary design. Current set:

| File | Style / notes |
|------|----------------|
| `brad-brisco.html` + `brad-brisco.css` | Dark sage/scarlet/orchid; full-bleed hero; Inter, Playfair Display, Space Grotesk; uses `main.css` + shared scripts. |
| `brad-brisco-alt.html` + `brad-brisco-alt.css` | Warm editorial; cream/stone + amber; split hero (image left, copy right); Plus Jakarta Sans, Fraunces; standalone. |
| `brad-brisco-gsap.html` + `brad-brisco-gsap.css` | GSAP scrollytelling; duotone black/teal; pinned panels, scrub, reveal; Libre Baskerville, Source Sans 3. |
| `brad-brisco-flashy.html` + `brad-brisco-flashy.css` | Flashy/clean; slate + cyan; floating card hero; Outfit, DM Sans; sans-only. |
| `brad-brisco-behance.html` + `brad-brisco-behance.css` | Editorial/portfolio; black + rose; bento grid, 1px gaps; Syne, Sora; scroll hint, section numbers. |

**Your new template should:**  
- Use a **different** palette, typography pairing, and hero treatment.  
- Explore a **different** layout idea (e.g. not again “full-bleed hero + dark sections,” not again “split hero + cream,” not again “bento + 1px grid” unless you meaningfully twist it).  
- Introduce at least one **clear design or interaction idea** that isn’t already demonstrated (e.g. a new hero pattern, card style, section rhythm, or micro-interaction).

---

## Required content sections (full home page experience)

The template must include these sections so it feels like a **complete** leader home page. You may reorder or combine for your layout; content should still come from the Brad Brisco reflected-understanding and docs.

1. **Hero** — Name, role/tagline, and a clear value statement or subhead; primary CTA (e.g. “Explore his work” or “Get in touch”).
2. **Credibility / stats** — At least a few proof points (e.g. 5 books, 18+ years teaching, 20+ years church planting, Send Network role).
3. **Calling** — Core message: missional ecclesiology and multiplication, forming practitioners, movement that outlasts him; use reflected-understanding language.
4. **Audience** — Who the work is for; include at least 2–4 personas (e.g. church multiplication leader, educator, co-vocational planter, digital ecclesiology explorer).
5. **Content / books** — Where his work lives (books, teaching, conferences, sites); “Selected works” or equivalent (e.g. The Missional Quest, Covocational Church Planting, Next Door As It Is In Heaven, Missional Essentials).
6. **Quote or credibility moment** — One short pull quote from the reflected-understanding (e.g. credibility in the room vs. online).
7. **Constraints / value prop** — Time and attention scarce; how a platform (e.g. Movemental) reduces the lift; 2–3 value cards (e.g. interconnection, structure/repurpose, ownership/discoverability).
8. **CTA** — Closing invitation (e.g. “Your content can move”) and primary action.
9. **Footer** — Logo, key links (Why, How, Brad Brisco, Privacy), tagline (“A credibility ecology for movement leaders”).

Navigation should be present (logo, links, primary CTA) and behave sensibly on scroll and on small screens (e.g. mobile menu).

---

## Reference paths

- **Brad Brisco reflected-understanding:** `_docs/movement_leader_research/reflected-understanding/brad-brisco.md`
- **General docs / product context:** `_docs/` (e.g. public-site, product, movement_leader_research)
- **Existing HTML/CSS patterns:** `html/*.html`, `html/styles/*.css`, `html/scripts/main.js`
- **Prototype spec (why/how pages):** `html/PROTOTYPE-SPEC.md` (for design-system and interaction patterns; your template is a separate “Brad Brisco” family)
- **Images:** `public/media-library/images/headshots/brad-brisco/` (list the directory to see available filenames)

---

## Checklist before finishing

- [ ] One new **HTML** file and one new **CSS** file; names follow `brad-brisco-{theme}.*`.
- [ ] All copy traceable to Brad Brisco reflected-understanding or `_docs/`; no invented facts.
- [ ] Images used from `public/media-library/...` with correct relative (or project-appropriate) paths.
- [ ] Style is **distinct** from the five existing templates (palette, type, hero, layout).
- [ ] At least one **new** design or interaction idea compared to existing templates.
- [ ] Full home page flow: hero → stats → calling → audience → content/books → quote → constraints → CTA → footer.
- [ ] Nav + footer; scroll and mobile behavior work.
- [ ] Markup and classes are **React/Next + Tailwind/shadcn friendly** (semantic, component-ready).

---

## Output summary

When done, state briefly:

- **Filename(s):** e.g. `html/brad-brisco-{theme}.html`, `html/styles/brad-brisco-{theme}.css`
- **Design direction in one line:** e.g. “Minimal glass morphism, one accent, large type.”
- **What’s new vs. existing templates:** e.g. “First template with X; only one using Y.”

This prompt is intended to be **re-run** to generate additional templates over time. Each run should produce **one** new template that expands the set without repeating what’s already there.
