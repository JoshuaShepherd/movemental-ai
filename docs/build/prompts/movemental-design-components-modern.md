# Movemental Design Components — Modern

> **Output file:** `docs/html/movemental-design-components-modern.html` (single standalone HTML, embedded CSS + JS)
> **Design language:** Concept Modern — warm paper + ink, Inter + Instrument Serif italic, hairline sectioning, tonal bands, midnight regional bands.
> **Purpose:** A curated **design vocabulary / component showcase** for Movemental. One scrolling page that demonstrates the visual and content blocks that should define the site and platform-facing marketing language. This is **not** a production React page, **not** a generic pattern library, and **not** a Tailwind snippet dump — it is a **high-quality, browsable, editorially coherent HTML prototype** you could hand to a design lead and say “this is what Movemental looks like.”

---

## How to use this prompt

Work the phases in order. Each phase ends with a short **self-check**. Do not skip forward until the check passes. Ship the file in one pass; do not incrementally commit partial phases.

If, during a phase, you find yourself about to add a generic SaaS trope (neon gradient, floating blurry blobs, a fake chart with zero information, a hero with a rocket), **stop and re-read Phase 0**. The visual identity is *editorial calm*, not *startup energy*.

---

## Phase 0 — Preconditions (read first, do not skip)

Read these in order before writing any markup:

1. [docs/design/DESIGN.md](../../design/DESIGN.md) — the charter. Pay attention to: tonal stacking (§3 surfaces), primitives (§7), pattern recipes (§12 / §14), no-line sectioning rule, no-drop-shadow rule, CTA tokens.
2. [docs/design/FUTURE-concept-modern-html-charter.md](../../design/FUTURE-concept-modern-html-charter.md) — detailed Concept Modern reference: tokens, nav scrolled-glass state, label dot, reveal-on-scroll, italic serif emphasis layer, skip link, selection color.
3. [docs/design/MOTION.md](../../design/MOTION.md) and [docs/design/STATIC_HTML_AND_TEMPLATES.md](../../design/STATIC_HTML_AND_TEMPLATES.md) — motion budget + static-HTML rules.
4. Scan the existing `-modern` prototypes as **visual and structural exemplars**. Match their register:
   - `docs/html/homepage-concept-modern/` (base: tokens, nav, hero, reveal-on-scroll)
   - `docs/html/approach-concept-modern.html`
   - `docs/html/churches-concept-modern.html`
   - `docs/html/nonprofits-concept-modern.html`
   - `docs/html/institutions-concept-modern.html`
   - `docs/html/assessments-concept-modern.html`
   - `docs/html/services-pricing-concept-modern.html`
   - `docs/html/fragmentation-concept-modern/` (argument sections, query cards, midnight bands)
   - `docs/html/articles-concept-modern/` and `docs/html/audience-concept-modern/` (extensions over the homepage base)
5. Also scan `docs/html/master-components/` (hero-01…05, nav-01…05, viz-01…05, cards.html) for **section-level exemplars** only — use their structure as reference, do **not** copy markup wholesale.

### What this page is for

When opened, this page must make answerable:

- What kinds of blocks make Movemental feel like itself?
- What does *designed intelligence* look like?
- How does informational clarity, evidence, and system thinking become the visual language?
- How does authority, inspectability, and product depth show up without visual clutter?

It should read like a **component gallery built as a persuasive editorial artifact**, not a sterile pattern library.

### What this page is NOT

- A production React page
- A Tailwind snippet dump
- A generic style guide
- A SaaS marketing landing page kit
- A dashboard demo
- A dark-mode AI product skin

### Visual and editorial constraints (non-negotiable)

- **Semantic, calm, editorial.** No startup gimmicks. No decorative noise. No raw flashy gradients. No generic SaaS dashboard feel.
- **Typography is the interface.** Prefer type scale, measure (`ch`), and whitespace over boxes and shadows.
- **Inter-first.** Instrument Serif **italic only** for emphasis, stage names, and human pull quotes — never body paragraphs.
- **Duotone + midnight.** Warm paper (`--bg`) + ink (`--ink`), alternating `--bg-alt` wash, optional `--dark` midnight bands for regional contrast. No other palette.
- **Hairlines and bands, not cards with borders-on-bands.** Borders are for forms/dense sub-panels only. Section depth comes from tonal stacking.
- **No drop shadows** beyond a quiet ambient elevation when a block truly floats above a busy background.
- **No pure black.** Use `--ink` / `--dark`.
- **Motion is subtle, optional, and gated.** Reveal-on-scroll (`translateY(12px)` + fade) is the house motion. Respect `prefers-reduced-motion: reduce` — degrade to a static stack.
- **Plain HTML/CSS/JS only.** No React, no build step, no external frameworks. Google Fonts link in the `<head>` is acceptable (static preview exception).

### Content constraints

- **No lorem ipsum.** Every headline, paragraph, pull quote, caption, and citation reads as real-feeling Movemental content.
- **Anchor themes:** fragmented intelligence; informational vs relational intelligence; fragmentation → integration → activation → formation → multiplication → movement; coherence; trust; inspectability; pathways; AI context; movement leaders, nonprofits, churches, institutions; system builds; authority and credibility; formation over growth; humans over hacks; scenius over genius; technology serves mission.
- No client PII, no real secrets, no real partner logos.

### Register check (apply at every phase)

The work feels right if it reads like: *designed intelligence · artful reasoning · inspectable authority · visualized systems · clear but not sterile.*

The work feels wrong if it reads like: *dashboard clutter · fake analytics charts · too many decorative icons · loud colors · empty illustration tropes.*

---

## Phase 1 — Document shell and tokens

Create `docs/html/movemental-design-components-modern.html`. Top of file, include a comment block summarizing:

- the purpose of the page (design vocabulary / component showcase for Movemental)
- the intended Concept Modern (“-modern”) design language
- the fact that the page is a visual/content vocabulary sheet, not a spec
- any intentional simplifications (static data, no backend, placeholder imagery)

Then set up:

1. `<!doctype html>`, `lang="en"`, `<meta charset>`, `<meta viewport>`.
2. `<title>Movemental Design Components — Modern</title>` and a short meta description in the same register as the existing Concept Modern pages.
3. Google Fonts preconnect + link for **Inter (400/500/600/700) + Instrument Serif (italic + regular)** — exactly as in `docs/html/homepage-concept-modern/index.html`.
4. Embedded `<style>` with the Concept Modern token set from [`FUTURE-concept-modern-html-charter.md` §4](../../design/FUTURE-concept-modern-html-charter.md):
   - Color: `--bg #faf6ee`, `--bg-alt #f2ece0`, `--surface #ffffff`, `--ink #19150f`, `--ink-muted #6b6660`, `--ink-soft #9f978b`, `--border #e6ddcb`, `--border-soft #efe7d6`, `--dark #141110`, `--dark-ink #f4efe5`, `--dark-muted rgba(244,239,229,0.62)`, `--dark-border rgba(244,239,229,0.14)`.
   - Type: `--font-sans` (Inter stack), `--font-serif` (Instrument Serif stack), mono stack.
   - Tracking: `--tr-display -0.028em`, `--tr-tight -0.022em`, `--tr-label 0.09em`.
   - Layout: `--container 1200px`, `--container-narrow 740px`, `--reading-max 640px`, `--gutter clamp(1.25rem,4vw,2.5rem)`, `--section-y clamp(5rem,10vw,8rem)`, `--nav-h 4.25rem`.
   - Motion: `--ease-out cubic-bezier(0.22,1,0.36,1)`, `--dur 0.7s`.
5. Global base rules: `*,*::before,*::after { box-sizing: border-box }`, body defaults (17px / 1.55 / `font-feature-settings: "kern","liga","cv11"`, antialiased), selection (`background: var(--ink); color: var(--bg)`), heading reset (`font-weight: 500`, `letter-spacing: var(--tr-display)`, `line-height: 1.1`), link inherit, image/svg defaults, skip-link, `@media (prefers-reduced-motion: reduce)` that zeroes transitions/animations.
6. A `.container` + `.container--narrow` system, a `.section` wrapper with `padding-block: var(--section-y)`, and tonal band modifiers: `.section--paper` (default), `.section--alt` (`--bg-alt`), `.section--dark` (`--dark` + inverse text tokens), `.section--surface` (`--surface`).
7. Primitive utilities to be used everywhere: `.eyebrow` (uppercase + `--tr-label` + muted ink + leading dot), `.display` (clamp-scaled h1), `.h2`, `.h3`, `.lead`, `.meta`, `.measure` (`max-width: var(--reading-max)`), `.em-serif` (applies `font-family: var(--font-serif); font-style: italic;`).
8. Button primitives: `.btn`, `.btn--primary` (ink pill), `.btn--ghost` (border-only), `.btn--sm`, `.btn--lg`, with animated `.arrow` on hover.

**Self-check:**

- [ ] Tokens match the charter values exactly.
- [ ] No raw hex anywhere in markup beyond the `:root` block.
- [ ] Reduced-motion override present.
- [ ] `body` uses `--bg` + `--ink`, not `#fff` / `#000`.

---

## Phase 2 — Chrome: nav, jump-nav, hero, closing footer band

1. **Top nav** (`<header class="nav">`): brand lockup, 4–6 link sections targeting the in-page anchors, one `.btn--sm.btn--ghost` “Download notes” + one `.btn--sm.btn--primary` “See the system.” Wire the scrolled-glass state (`color-mix(in srgb, var(--bg) 82%, transparent)` + `backdrop-filter: saturate(140%) blur(14px)`) via a tiny scroll listener that toggles `.is-scrolled`. Add a skip link.
2. **Sticky in-page nav (jump-nav)**: a slim horizontal pill or side rail (decide per responsive) that scroll-spies the 10 top-level sections (see Phase 3–12). On small screens, collapse into a `<details>`-based menu — no drawer libraries.
3. **Intro / Purpose hero** (`<section id="intro">`):
   - Eyebrow: `Design vocabulary · Movemental` with the leading `.label__dot`.
   - Display headline (two lines, italic-serif `<em>` carrying one phrase, e.g. *“designed intelligence”*).
   - A short two-paragraph editorial lede on the `.measure` width. Frame the page as a vocabulary sheet: one page to look at, decide from, and standardize.
   - A thin meta row beneath: `10 sections · ~70 components · single file · static HTML`.
4. **Closing footer band** (midnight): built at the end of the page but scaffolded now so the tonal rhythm is correct. Includes a restrained wordmark, one short pull-line, one primary CTA, one secondary link, and a legal hairline row.

**Self-check:**

- [ ] Nav has both scrolled-glass and resting states.
- [ ] Jump-nav anchors match section IDs used in later phases.
- [ ] Hero reads as editorial, not as a SaaS hero.
- [ ] No decorative iconography in the hero beyond the label dot.

---

## Phase 3 — Typography & Editorial Language (`#typography`)

Section header: eyebrow “01 · Typography & Editorial Language”, h2 in the house register, and a one-paragraph framing line (“Typography is the interface…”).

Build **polished, real** examples of each:

- **Eyebrow** — labeled variants (with dot, with numeric index, with thin rule).
- **Display headline** — two size variants (hero scale, section scale), both with italic-serif `<em>` emphasis.
- **Section headline** — h2 with optional pre-title eyebrow and trailing kicker line.
- **Long-form paragraph block** — `.measure` width, opening drop-emphasis (no ornamental drop-cap; use a bold phrase + lead paragraph pattern from the fragmentation prototype).
- **Pull quote** — italic serif, attributed, with hairline separator.
- **Annotated pull quote** — pull quote + a small side-note with an inline citation marker that links to the citation block below.
- **Inline citation marker** — superscript numeric link with a `title` tooltip and an anchor to the references block; hover reveals the source in a small inline chip.
- **Citation note block** — a structured references list in `muted` ink, with 4–6 real-feeling references (book, article, dataset, report, internal research brief).
- **Key sentence / hinge statement** — a single large line on its own band that the rest of the page pivots around (e.g. *“Coherence, not cleverness, is the work.”*). Use `--bg-alt` band.
- **Numbered argument list** — 1 / 2 / 3 … vertical list with hairline dividers, each item = short label + one-sentence claim.

Each example gets a small caption block beneath it (muted ink, 12–13px) in the pattern:
`NAME · short intent · when to use · when not to use`.

**Self-check:**

- [ ] Instrument Serif used only on `<em>` inside display/quote/hinge surfaces.
- [ ] All paragraph blocks obey `.measure`.
- [ ] Citations actually read as sources, not as placeholders.

---

## Phase 4 — Argument & Evidence Components (`#argument`)

Section header in the same pattern. Build:

- **Claim block** — a single claim in display register with a short framing line.
- **Claim → Evidence → Implication block** — three vertical zones on a `--surface` card, hairline-divided; each zone is labeled. Evidence zone includes 2 numbered bullets with inline citations that link into the Phase 3 references.
- **Before / after comparison** — two-column panel; left column “Before: fragmented intelligence,” right column “After: coherent system.” No gradients, no arrows — use tonal contrast (alt vs surface) and a thin vertical rule.
- **Problem / solution contrast** — similar geometry but framed problem/solution with a small verdict line beneath.
- **Principle card grid** — 3-up grid on `section`; each card carries a number, a principle name, and a two-line elaboration. No icons. Ghost lift only.
- **FAQ accordion** — `<details>`/`<summary>` pattern, hairline between rows, smooth disclosure with reduced-motion respected. 5 real-feeling questions.
- **Myth / reality block** (include as part of this section) — left column “Common assumption,” right column “What we observe.”
- **Value statement grid** — 4-up of short value lines in bold display.
- **“What this means” explainer** — a post-claim synthesis paragraph block with a leading italic serif tag.

**Self-check:**

- [ ] No decorative borders around the whole section.
- [ ] Comparison blocks rely on tonal stacking, not on color-coded red/green.
- [ ] FAQ keyboard-accessible.

---

## Phase 5 — System Visualization Components (`#system`)

This section is the visual centerpiece. Diagrams must feel like the page, not a second palette. Use `currentColor`, thin strokes, light `color-mix` fills, Inter labels, monospace only for file-like rows.

Build:

- **Six-stage progression rail** — horizontal rail with 6 nodes: *Fragmentation → Integration → Activation → Formation → Multiplication → Movement*. Each node has a short label + one-line descriptor beneath. On mobile, stack vertically with the same rhythm. SVG only, no libraries.
- **Informational vs relational intelligence comparison** — two parallel columns of node/edge clusters; captions describe what each intelligence tracks. Use the same stroke language.
- **Fragmentation vs integration schematic** — left: scattered disconnected nodes; right: those same nodes connected into a legible structure. Label both sides. Must read as diagnostic, not decorative.
- **Layered system stack** — 4–5 horizontal bands labeled (e.g. *Signals · Context · Pathways · Relationships · Outcomes*); each band carries a one-line role; tonal alternation paper/alt; hairlines between layers.
- **Pathway / journey visualization** — a specific pathway example (e.g. *Leader onboarding → diagnostic → cohort → sustained practice*), rendered as a stepped rail with per-step annotations.
- **Workflow sequence strip** — 5–6 pill-like steps connected by hairlines, each step a short verb phrase and a tiny caption.
- **Network / movement field diagram** — small force-like graph, labeled clusters (e.g. *Movement leaders · Churches · Nonprofits · Institutions*), inline legend. Static SVG — no runtime simulation.
- **Capability map** (supplementary) — a compact 2D axis (e.g. *Informational ↔ Relational* on x, *Individual ↔ Collective* on y) with 6–8 labeled capabilities placed intentionally.
- **Shared system / different application block** — one central diagram with 3–4 radial branches labeled by audience.

Every diagram gets a caption in the same `NAME · intent · when to use · when not to use` pattern, plus a one-line methodology note (“Rendered with static SVG; values illustrative”).

**Self-check:**

- [ ] All diagrams monochrome + ink; no rainbow categorical color.
- [ ] No fake analytics charts (no invented percentages, no invented line charts).
- [ ] Each diagram is accompanied by explanatory text — the diagram alone is never the argument.

---

## Phase 6 — Product / Platform Preview Components (`#product`)

Build restrained product surfaces that read like editorial product storytelling, not like a dashboard demo.

- **Product preview frame** — a rounded-corner surface card framed by a whisper of ambient shadow, showing a stylized pane (left rail + content area). Use the Concept Modern ink palette inside, no SaaS neon.
- **Audience template preview card** — 4 compact cards (Movement leader, Nonprofit, Church, Institution); each carries a screenshot-style pane composed of pure HTML/CSS (no images), a short caption, and a “Preview ↗” ghost link.
- **Preview switcher / selector** — a tabbed control that swaps the preview frame content; tabs labeled by audience; real JS wiring; keyboard/`aria-selected` correct; falls back to all-visible stacked panes without JS.
- **Module stack inside a preview** — a stacked list of 4–5 module rows (e.g. *Pathways · Relationship intelligence · Knowledge library · AI assistant · Signals*), each with a short descriptor.
- **Pathway module** — a focused close-up of the pathway row expanded inline.
- **Relationship intelligence module** — same geometry, different content.
- **Knowledge / library module** — same geometry; show 3–4 document rows with mono filenames + editorial titles.
- **AI assistant panel** — right-side pane inside the preview frame, with a prompt row, a grounded-answer card, and a “Sources” disclosure; uses the same ink palette — no gradient, no avatar theatrics.
- **Data / context side panel** — a small side-rail inside the preview showing *context layers* with hairline separators.
- **Restrained metrics module** — dashboard-like but editorial: 3 numerals with one-line captions and a short interpretive sentence below. No sparklines unless each line is genuinely informative; otherwise omit.

**Self-check:**

- [ ] Product surfaces read as *calm intelligence*, not *dashboard demo*.
- [ ] Preview switcher works without JS (degraded) and with JS (enhanced).
- [ ] No fabricated logos, no fabricated user avatars.

---

## Phase 7 — Trust / Authority Components (`#trust`)

Build blocks that show inspectability and authority without chest-thumping.

- **Why trust this block** — 3–4 short reasons in a numbered vertical list on an alt band.
- **Inspectable architecture block** — a quiet card that enumerates *what is visible to the customer* (code, data model, context sources, evaluation criteria). Mono labels + Inter descriptions.
- **Source / references panel** — curated list of real-feeling references organized by type (book · article · dataset · report · internal brief). Cross-links to the inline citation markers in Phase 3.
- **Builder / team profile card** — 2–3 cards with portrait placeholder (solid tonal square, initials in ink, no generated face), name, role, one-line orientation. Quiet hairline rule.
- **Scope / non-goals block** — two-column “What this is / What this is not” list with hairline rule and short items.
- **Guiding principles band** — midnight band with 5–6 one-line principles; typography carries the weight.
- **Process transparency panel** — numbered steps of how a build happens (Diagnose → Architect → Prototype → Ship → Maintain) with short descriptors.
- **“Built from within the field” block** — short editorial paragraph + attribution line.
- **Credibility note / caution panel** — a soft callout acknowledging limits (*“We do not do… We do not promise…”*) in the same calm register.

**Self-check:**

- [ ] No fabricated credentials, no invented logos.
- [ ] Portraits are tonal placeholders, never AI-generated faces.
- [ ] Callouts use tonal bands, not colored alert chips.

---

## Phase 8 — Audience / Application Components (`#audience`)

Build the “see how this works in your context” vocabulary.

- **Audience card row** — 4 cards (Movement leader, Nonprofit, Church, Institution); each card has an eyebrow, short headline, 2–3 bullets, and a ghost “See the system” link.
- **Movement leader application module** — full-width split with a narrative column and a small stack of capabilities relevant to that audience.
- **Nonprofit application module** — same geometry.
- **Church application module** — same geometry.
- **Institution application module** — same geometry.
- **“See how this works in your context” section** — a prompt-style section with four anchor buttons that scroll to the modules above.
- **Use-case card grid** — 6 compact use-case cards with a short verb-phrase title and one-line outcome.
- **Outcome grid** — 3–4 outcome tiles with a large italic-serif verb + an explanatory sentence.
- **Platform family comparison** — small comparison table (tonal rows, no zebra borders) showing what is shared vs specialized across audiences.
- **Example route / preview launcher** — a thin band that links to the preview switcher from Phase 6.

**Self-check:**

- [ ] Every audience gets the same respect — no module feels like a template copy.
- [ ] Comparison table obeys the no-line sectioning rule.
- [ ] Use-case cards are concrete (e.g. *“Map relational trust across a leadership cohort”*), never generic.

---

## Phase 9 — AI / Agent Components (`#ai`)

Build a restrained AI vocabulary that communicates groundedness, not magic.

- **AI use-case card** — 3 cards, each with a concrete AI application in Movemental context.
- **Context-aware response preview** — a mock exchange: short prompt → grounded answer → inline source chips. Mono for the prompt row, Inter for the answer, italic serif only on a single emphasized phrase.
- **Prompt / output demonstration block** — side-by-side prompt + structured output with a small annotations column explaining what the model is doing.
- **Retrieval / grounded answer block** — response card + a “Sources” drawer (`<details>`-based) listing 3 references.
- **Agent deployment card** — a quiet card naming an agent role, its inputs, its outputs, its escalation rule.
- **Workflow + agent pairing block** — visual pairing of a sequence step with the agent that assists it.
- **Human-in-the-loop panel** — a small annotated flow showing where a human decision intervenes; clearly labels *AI assists · Human decides*.
- **Safety / boundary callout** — a calm callout listing what the system will not do, in plain language.
- **Context layer explainer** — a stacked stack-of-layers diagram (echoing Phase 5) specific to *what context feeds the AI*.
- **AI value chain panel** — a small horizontal strip with 4 phases (Signal → Context → Inference → Action) and one-sentence roles.

**Self-check:**

- [ ] No “AI magic” rhetoric; every example is specific and grounded.
- [ ] No robot or brain iconography.
- [ ] Safety/limits are present and non-ironic.

---

## Phase 10 — Conversion / CTA Components (`#cta`)

Build conversion blocks that persuade by clarity, not by urgency.

- **CTA row** — eyebrow + short line + primary `.btn--primary` + ghost `.btn--ghost` on a paper band.
- **Entry-point comparison** — two or three entry points (e.g. *Discovery call · System diagnostic · Read the book*) presented as equal-weight tonal cards with distinct affordances.
- **Discovery / inquiry card** — a small surface card with 2–3 short fields (static; not wired) and a short reassurance line.
- **Contact panel** — editorial contact block with a short invitation, one email address placeholder, and a single ghost CTA.
- **“What to do next” grid** — 3 cards: *Read · Preview · Talk.*
- **Read the full story CTA** — linking to the manifesto or long-form.
- **See the book CTA** — linking to the book experience.
- **Explore the articles CTA** — linking to the articles hub.
- **Start with your system CTA** — linking to the system build hub.
- **Final conviction band** — midnight band, single italic-serif hinge line, primary CTA, small secondary text link. This is the closing note of the page.

**Self-check:**

- [ ] No scarcity copy (“Only 3 spots left”), no countdowns.
- [ ] CTAs are tonal and restrained — ink pill primary, ghost secondary.
- [ ] Final band reads as invitation, not as sales.

---

## Phase 11 — Closing Summary (`#closing`)

One short section that re-frames the page:

- Eyebrow: `Closing`.
- A short italic-serif hinge line restating the working thesis.
- A two-column block: *What this system keeps / What this system refuses* (6 short items each, hairline-divided, no color-coded lists).
- A small meta line: *“This page is a working artifact — revised as the vocabulary settles.”*
- Link back to the jump-nav top.

Then the closing midnight footer band already scaffolded in Phase 2 — populate with a final short pull-line, a primary CTA, and a legal hairline row (© Movemental · a static design artifact · not a production site).

**Self-check:**

- [ ] The reader can skim the summary and leave with a clear mental model.

---

## Phase 12 — Interaction layer (lightweight JS)

Keep JS **vanishingly small**. Allowed:

- Nav scroll-spy to toggle `.is-scrolled`.
- Jump-nav active-section highlighting via `IntersectionObserver` (bail on older browsers; the nav still works).
- Preview switcher tabs (ARIA: `role="tablist"`, `aria-selected`, keyboard arrow keys).
- `<details>`-based accordions and evidence drawers (CSS/HTML only — no JS unless enhancing).
- Reveal-on-scroll (optional): a tiny `IntersectionObserver` that adds `.is-visible` to `[data-reveal]` blocks; must no-op under `prefers-reduced-motion: reduce`.
- Smooth scroll for internal anchors — rely on `html { scroll-behavior: smooth }` which is already disabled by the reduced-motion rule.

Disallowed:

- No SPA router. No hash-based client routes.
- No analytics, no trackers.
- No third-party scripts beyond the Google Fonts stylesheet.
- No charts libraries, no icon libraries.

**Self-check:**

- [ ] Page is fully usable with JS disabled; enhancements are additive.
- [ ] No console errors.
- [ ] Keyboard can traverse every interactive element.

---

## Phase 13 — Responsiveness

Ship breakpoints that hold up:

- **Desktop (≥1200px):** full container, 3/4-up grids, diagrams at natural size.
- **Tablet (768–1199px):** 2-up grids, diagrams reflow to stacked variants, jump-nav compresses to pill row.
- **Mobile (≤767px):** single column; diagrams stack vertically; nav collapses into a `<details>` menu; jump-nav becomes a `<details>` or sticky pill row; `.measure` tightens; padding scales via the `clamp()` tokens already set.
- **Print:** not required, but do not break obviously — `@media print` can set `--bg` to white and midnight bands to inverted.

**Self-check:**

- [ ] Every section is legible at 360px width.
- [ ] No horizontal scroll anywhere (except intentional scroll-snap rails, if any).
- [ ] Touch targets ≥ 44px on mobile.

---

## Phase 14 — Accessibility and quality

- Skip link present and functional.
- Headings form a single, legal outline (no jumped levels).
- All interactive controls keyboard-reachable with visible `:focus-visible` outline (use `outline: 2px solid var(--ink); outline-offset: 3px;` or equivalent token — do not remove focus).
- All SVGs decorative or titled — if titled, add `<title>`; if decorative, `aria-hidden="true"`.
- Color contrast verified against ink/paper and inverse on midnight.
- No autoplaying media, no motion-only signals.
- `prefers-reduced-motion: reduce` wiring tested.
- Every component is preceded by a small caption (`NAME · intent · when to use · when not to use`) so the page functions as a reference.

**Self-check:**

- [ ] Lighthouse Accessibility ≥ 95 on a local run.
- [ ] Tab order is logical from top to bottom.
- [ ] Reduced-motion toggle fully neutralizes transitions.

---

## Phase 15 — Final quality bar (acceptance)

When you open the finished file in a browser, it should feel like:

- Movemental’s design language is *finally visible* — not sketched, not improvised.
- Reasoning, evidence, authority, and system thinking have become the aesthetic.
- You are looking at a serious component system, not a random assemblage of blocks.
- These examples could credibly inform the homepage, about page, system pages, audience pages, AI pages, and long-form arguments — in one artifact.

It must help us decide:

- What to keep.
- What to standardize.
- What the Movemental “modern” visual language should be.

**Acceptance checklist:**

- [ ] File is a single `docs/html/movemental-design-components-modern.html` with embedded CSS + JS.
- [ ] No external dependencies beyond the Google Fonts stylesheet.
- [ ] No raw hex outside `:root`.
- [ ] No pure black, no flashy gradient, no drop shadow beyond a single quiet ambient elevation where justified.
- [ ] Instrument Serif used only on `<em>` inside display/quote/hinge surfaces — never body.
- [ ] Every one of the required components listed below is present and polished.
- [ ] Every component carries a short caption (`NAME · intent · when to use · when not to use`).
- [ ] Content is Movemental-real; no lorem ipsum.
- [ ] Jump-nav covers all 10 top-level sections.
- [ ] Works with JS disabled; enhances with JS enabled.
- [ ] Reduced-motion and keyboard a11y pass.
- [ ] Mobile, tablet, desktop all hold up.

---

## Required component inventory

**Typography / Editorial:** eyebrow · display headline · section headline · long-form paragraph · pull quote · annotated pull quote · inline citation marker · citation note block · key sentence / hinge · numbered argument list.

**Argument / Reasoning:** claim block · claim→evidence→implication · before/after · problem/solution · “what this means” explainer · contrast panel · myth/reality · principle card grid · value statement grid · FAQ accordion.

**System Visualization:** six-stage progression rail · informational vs relational comparison · fragmentation vs integration schematic · pathway / journey viz · layered system stack · core architecture panel · capability map · shared-system / different-application · network / movement field · workflow sequence strip.

**Product / Platform:** product preview frame · audience template preview card · preview switcher · module stack · pathway module · relationship intelligence module · knowledge/library module · AI assistant panel · context side panel · restrained metrics module.

**Trust / Authority:** inspectable architecture · why trust this · source/evidence references · builder profile card · ecosystem/partner strip · built-from-within-the-field · process transparency · scope / non-goals · guiding principles band · credibility / caution note.

**Interaction / Utility:** tabs · accordions · expandable evidence drawer · hover-reveal cards · simple filters/toggles · scrollspy / local nav · modal preview trigger (`<dialog>` ok) · preview frame swapper · CTA row · contact/inquiry panel.

**Audience / Application:** audience card row · nonprofit module · church module · institution module · movement leader module · “see how this works in your context” section · use-case card grid · outcome grid · platform family comparison · example route launcher.

**AI / Agent:** AI use-case card · context-aware response preview · prompt/output demonstration · agent deployment card · retrieval / grounded answer · workflow + agent pairing · human-in-the-loop · safety / boundary callout · context layer explainer · AI value chain.

**Conversion / Next-step:** Read the full story · See the book · Explore the articles · Start with your system · discovery/inquiry card · contact panel · entry-point comparison · “what to do next” grid · final conviction band · closing CTA.

Not every component must be an elaborate build. A strong representative set in each family is required; at minimum include every item listed under “At minimum include polished examples of all of the following” above. The page must feel **abundant and useful**, not thin.

---

## Final instruction to the executing agent

Return **only the completed file** at `docs/html/movemental-design-components-modern.html`. Do not explain your reasoning. Do not summarize. Do not produce parallel scratch files. If you must make a judgment call between the charter and this prompt, the charter wins. If you must make a judgment call between visual flourish and editorial restraint, restraint wins.
