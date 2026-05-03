# Home page revision v2 — decisive hero, canonical AI Stewardship Sequence, two-intelligences replacement, grounding proof

**Created:** 2026-04-17
**Target file:** [`src/components/sections/home/home-concept-modern-page-content.tsx`](../../../src/components/sections/home/home-concept-modern-page-content.tsx) (rendered at `/` via [`home-page-content.tsx`](../../../src/components/sections/home/home-page-content.tsx))
**Purpose:** A single, authoritative revision prompt for the `/` Concept Modern homepage that sharpens the hero, compresses the "two equal errors" diagnostic, replaces the off-canon "Human Layer / Technology Layer" block with the **two intelligences**, strengthens the AI Stewardship Sequence copy, grounds applicability and Why-Movemental, and adds one trust-bearing component — without breaking section `id`s or DESIGN.md tokens.

**Companion prompts (read first):**

- [`home-page-narrative-credibility-ia-plan.md`](./home-page-narrative-credibility-ia-plan.md) — home job (compressed argument), emotional sequence, hero vs problem rule, L2b trust discipline
- [`home-page-fragmentation-funnel-narrative.md`](./home-page-fragmentation-funnel-narrative.md) — locked copy anchors and the fragmentation-funnel spine (if any anchor here is locked there, update the funnel file **first**)
- [`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) — field-guide → `/book`, Ch. 2 = two intelligences, `/assess` vs `/assessment-new`, AI demo vs product, proof show vs tell
- [`assessment-dual-intelligence-infrastructure-from-assessment-new.md`](./assessment-dual-intelligence-infrastructure-from-assessment-new.md) — paired intelligences × six stages × infra channels
- [`stitch-to-react-migration.md`](./stitch-to-react-migration.md) — semantic tokens, primitives, token remap
- [`docs/design/DESIGN.md`](../../design/DESIGN.md) — §1 pillars, §8 semantic color, §11 token table, §L2b trust / evidence

**Canonical reference articles (voice + AI Stewardship Sequence definitions):**
`docs/articles/the-ssss-framework.md`, `docs/articles/safety-before-speed.md`, `docs/articles/sandbox-discovery.md`, `docs/articles/the-skill-of-ai.md`, `docs/articles/solutions-deployment.md`, `docs/articles/why-order-matters.md`, `docs/articles/the-movemental-thesis.md`, `docs/articles/there-is-a-way-through-this.md`, `docs/articles/two-intelligences-integration.md`.

---

## 0 · Non-negotiables (read before editing)

1. **Preserve section `id`s and anchors** — `#top`, `#stakes`, `#path`, `#unfold`, `#audiences`, `#about`, `#invitation`. If the `#unfold` section is replaced (see §6), retain the **`id="unfold"`** on the new section so in-page links and analytics do not break.
2. **Semantic tokens only.** No raw hex, no `bg-white`, `bg-black`, `bg-blue-*`, `text-gray-*`. Use `text-foreground`, `text-muted-foreground`, `text-ink-soft`, `bg-card`, `bg-section`, `border-border`, `bg-inverse-surface` (DESIGN.md §8, §11).
3. **Editorial voice** — calm, declarative, light-handed. No manifesto posturing. No fabricated statistics, logos, or testimonials. When a page-level claim cannot be inspectably sourced today, **soften it** and link to book/article depth (L2b discipline).
4. **Canonical vocabulary is load-bearing.** **AI Stewardship Sequence** = Safety, Sandbox, Skills, Solutions (on first mention, spell the full phrase; after that, "the AI Stewardship Sequence" or the stage names). **Two intelligences** = informational + relational. **Field guide** = `/book`. Do not fork these terms on `/`.
5. **Primitives, not bespoke layout.** Continue using `Section`, `Container`, `RevealOnScroll`, `ConceptLabel`, `SerifEm`, `Button`, and existing grid patterns. Preserve Reveal delays and the hairline rule at hero bottom.
6. **No audience collapse.** Keep the top of the page broadly applicable to nonprofits + churches + institutions; use audience-specific language (donor care, pastoral care, faculty knowledge) **below the fold** in AI Stewardship Sequence sub-copy, audience cards, and "what this produces."
7. **Scope discipline.** This is a **copy + structural** revision. No new color, typography, or motion primitives. Any new visuals must use existing tokens and primitives.

---

## 1 · Revised section order (9 sections)

| # | Section | Emotional job | Variant | Notes |
| -- | ------- | -------------- | ------- | ----- |
| 1 | **Hero** (`id="top"`) | Tension + promise (sharper) | `editorial` | New headline; tightened subhead; supporting-conviction aside |
| 2 | **Two equal errors** | Diagnostic fork (compressed) | `editorialAlt` | Tighter rail; no giant whitespace |
| 3 | **What's at stake** (`id="stakes"`) | Consequence (named clearly) | `editorial` | Add unifying third line; reframe "tech problem" line |
| 4 | **A different kind of response** | Bridge into the AI Stewardship Sequence | `editorial` | Ends with visual cue downward to `#path` |
| 5 | **The path forward — the AI Stewardship Sequence** (`id="path"`) | Process clarity | `editorialAlt` | Rewritten step copy (load-bearing); tighter closing graf |
| 6 | **What must come together** (`id="unfold"`) | Uniqueness + depth | `editorial` | **Replaces** Human Layer / Technology Layer with **two intelligences** |
| 7 | **Where this lands** (`id="audiences"`) | Applicability (concrete) | `editorialAlt` | Sharpened intro + card bodies |
| 8 | **Why Movemental** (`id="about"`) | Authority (grounded) | `editorial` | Column copy rewritten to be proof-adjacent, not self-declared |
| 9 | **What this is not / what this produces** (NEW) | Clarification + trust | `editorial` | Single combined grounding block (lightweight) |
| 10 | **Invitation** (`id="invitation"`) | Commitment | `editorial` (gradient) | Tightened headline, subhead, and CTA labels |

> The rhythm rule: **no two adjacent sections should be "eyebrow + giant statement + short explanation."** Break up the cadence with a comparison rail (§2), a bridge (§4), a four-card process (§5), a paired definition block (§6), and cards (§7, §9).

---

## 2 · Hero — sharper thesis, integrated aside, stronger secondary CTA

### Current (to replace)

```tsx
<h1>There is a different way to navigate AI.</h1>
<p>Between fearful avoidance and reckless adoption of AI, there is a narrow way. Let's walk it together.</p>
<Button>Start with clarity</Button>
<Button variant="ghost">See the path</Button>
{/* aside: You're not being asked to master AI. You're being asked to lead faithfully on a new frontier. That requires a different path. */}
```

### Revised

**Headline (primary recommendation — `text-balance`):**

> There is a **wiser** way to navigate AI.

*(`SerifEm` wraps "wiser". Alternate approved variants if A/B: "There is a **more coherent** way to navigate AI." "More coherent" aligns with the canonical `scatter → coherence` field language; use when paired with a proof strip that references informational/relational coherence. Do not use "faithful" as the top-of-hero word — it narrows the page to one audience; reserve it for the supporting aside where it already works.)*

**Subhead (replaces the "narrow way" line):**

> Between fearful avoidance and reckless adoption is a narrower, wiser path. We help mission-driven organizations walk it with clarity, judgment, and integrity.

**Supporting aside (tightened, with a label so it reads as a conviction block, not a floating caption):**

```text
Label: A note to leadership
— You're not being asked to master AI.
— You're being asked to lead faithfully on a new frontier.
— That requires a different path.
```

Render the label as a `ConceptLabel`-style eyebrow above the border-left block. Keep the `border-l-2` treatment; drop the unlabeled floating look.

**CTAs:**

- **Primary:** `Start with clarity` → `/contact` (unchanged)
- **Secondary (replace "See the path"):** `See the framework` → `#path`
  Rationale: the page's mid-spine is the AI Stewardship Sequence — a named framework — so "See the framework" reads as a concrete promise. Keep `Read the field guide` → `/book` as the tertiary option only if the design accommodates a third action; do not add a third CTA unless the row still fits on one line at `sm`.

**Do not change:** the `#top` id, the hairline gradient rule, the 8/4 column ratio, the `RevealOnScroll` delays, the `SerifEm` styling, or the editorial label position.

---

## 3 · Two equal errors — compress into a diagnostic fork

**Intent:** make this a compact comparison rail, not a full section with large whitespace. It currently reads like a third thesis slide; it should read like a **fork** the reader registers in seconds.

**Keep:** eyebrow `Orientation`, headline `When it comes to AI, there are two equal errors.`, the two numbered lines.

**Change:**

- Reduce section vertical spacing from `spacing="lg"` to the equivalent of `spacing="md"` (or narrow the `Container` and cut the top/bottom paddings by ~20–25%).
- Render the two errors as a **two-column horizontal split** (on `sm+`) with a thin vertical divider (`border-border`) between them, not a stacked ordered list. On mobile, keep the current stacked rail with horizontal rules.
- Add a **single closing interpretation line** below the pair (separate visual weight, smaller than H2):

  > Most organizations oscillate between these without realizing that **both fail the same way** — they treat AI as a tool problem when it is a judgment problem.

- Remove any filler whitespace between the headline and the pair; the pair should sit close under the headline.

---

## 4 · What's at stake — add unifying third line + sharpen the closing sentence

**Keep:** `#stakes` id, eyebrow, headline (`Can your organization's mission, voice, and integrity survive contact with AI?`), the `Move too fast` / `Move too slow` pair.

**Add a third column/row beneath the split (same visual weight as "Move too fast" / "Move too slow"):**

> **The real challenge.** It is not choosing speed or caution. It is learning to move with integrity.

On `sm+`, render as a third column in a 3-col grid so the split resolves into a triad; on mobile, render beneath the pair with the same card/line treatment. This turns the pair into a diagnostic that **concludes**, not one that dangles.

**Rewrite the closing body graf** (current: *"This is not primarily a tech problem. It is a human problem — and requires an adaptive response."*):

> This is not primarily a tool problem. It is a problem of judgment, responsibility, and organizational coherence — and it requires an adaptive response.

"Judgment / responsibility / coherence" maps cleanly to the canonical two-intelligences frame and the AI Stewardship Sequence that follow.

---

## 5 · A different kind of response — bridge into the AI Stewardship Sequence (not another statement)

**Intent:** this section should feel like a **turn**, not another equal-weight thesis. It exists to hand the reader off to §5 (the AI Stewardship Sequence).

**Keep:** eyebrow `A different kind of response`, the statement `You're not being asked to master AI. You're being asked to lead faithfully.`, the two supporting grafs, the small-caps line at the end.

**Change:**

- Tighten the two supporting grafs to one, preferably:

  > We must move wisely in a world that changed faster than any of us were trained for. This is what **a different kind of response** looks like in practice.

- Replace the small-caps closing (`The journey is hard, but the path is clear.`) with a **visual downward cue** that hands off to `#path`:
  - A small chevron or short vertical rule centered below the copy
  - Eyebrow-style label beneath it: `The path forward — in four steps ↓`
  - The line is a link to `#path` (`scroll-mt-[var(--site-chrome-total)]` already exists on path section)

No new primitives needed — compose with existing tokens.

---

## 6 · The path forward — the AI Stewardship Sequence with load-bearing step copy

**Keep:** `#path` id, the 4-column layout, step numbers `01`–`04`, closing paragraph, the transition line `Most organizations try to start at the end.`

**Rewrite each step body to be more consequential** (replace `PATH_STEPS[*].b`):

```ts
const PATH_STEPS = [
  {
    n: "01",
    t: "Safety",
    b: "Set the governance, convictions, and boundaries before experimentation outruns judgment — so speed never becomes drift.",
  },
  {
    n: "02",
    t: "Sandbox",
    b: "Create a bounded space for real experimentation and honest learning before any capability reaches the whole organization.",
  },
  {
    n: "03",
    t: "Skills",
    b: "Build the human capacity to discern, supervise, and lead with these tools — not just use them.",
  },
  {
    n: "04",
    t: "Solutions",
    b: "Deploy workflows, agents, and systems only after the foundation can actually hold them.",
  },
] as const;
```

> Rationale: each body now names the **load-bearing claim** from its canonical article — Safety governs (not prohibits), Sandbox bounds discovery, Skills is formation-as-judgment, Solutions is deferred until the foundation holds. This aligns with `docs/articles/safety-before-speed.md`, `sandbox-discovery.md`, `the-skill-of-ai.md`, `solutions-deployment.md`, `why-order-matters.md`.

**Closing paragraph rewrite (replace current two lines):**

> **Most organizations try to begin with solutions.** That is why the results do not hold. Movemental begins earlier — with the safety, the sandbox, and the skills that make every later solution actually work.

Render the first sentence **bold** (`text-foreground font-medium`) to carry the structural claim; second and third as `text-muted-foreground`.

**Spacing:** close the gap between the 4-card rail and the closing paragraph by ~25% so the paragraph feels like the rail's conclusion, not a new section.

---

## 7 · "What must come together" — REPLACES "How the work unfolds" (Human Layer / Technology Layer)

**Why this change is required:** "Human Layer / Technology Layer" is **drift from canon**. The canonical paired frame — present in `docs/articles/two-intelligences-integration.md`, `docs/articles/the-movemental-thesis.md`, book Ch. 2, and the `/fragmentation` walkthrough — is **informational intelligence** and **relational intelligence**. Using "Human / Technology" here flattens the uniqueness of the Movemental thesis and orphans the vocabulary the rest of the site and book teach.

**Keep:** `id="unfold"` (for anchor/analytics continuity), the two-card layout, the `bg-card` + large radius treatment, `RevealOnScroll` cadence, the `SerifEm` italic in titles.

**Rename the section heading** from "How the work unfolds" → **"What must come together"**.

**Replace `LAYERS` constant:**

```tsx
const LAYERS = [
  {
    tag: "Informational",
    title: "Informational intelligence",
    body: (
      <>
        The <em>content</em> side of the organization — frameworks, documents,
        teaching, pathways, donor letters, pastoral care notes, faculty
        knowledge, institutional memory. Scattered, it cannot compound or form
        people. Integrated, it becomes something an organization — and
        eventually its models — can actually stand on.
      </>
    ),
  },
  {
    tag: "Relational",
    title: "Relational intelligence",
    body: (
      <>
        The <em>people</em> side of the organization — trust, authority,
        communication, leadership, and the graph of real relationships that
        carries a mission forward. AI cannot replace this layer; it can only
        be useful when the relational layer is coherent enough to supervise it.
      </>
    ),
  },
] as const;
```

**Add a single closing line beneath the pair** (not a new section — a caption below the two-card grid):

> AI becomes genuinely useful only when both are coherent enough to support responsible action.

Render the closing line in `text-foreground font-medium` at the same max-width as the card grid.

**Cross-link:** add a small inline link under the closing line: `Read Chapter 2 — Two intelligences →` pointing to the shipped book reader slug for Ch. 2 (use the existing `/book/read/<two-intelligences-slug>` path — verify against `src/lib/book-types.ts`; do not invent a slug). If the slug is not live yet, link `/book` and let the book reader handle the chapter hand-off.

---

## 8 · Where this lands — sharpened intro + concrete audience cards

**Keep:** `#audiences` id, the three cards (`nonprofits`, `churches`, `institutions`), `Go deeper` affordance, card hover behavior.

**Rewrite the section intro** (replace current: *"The same path applies; the integration points differ. These are doorways into deeper work — not the whole story on one page."*):

> The same path applies across contexts. **What changes is where fragmentation appears and what must be integrated first.**

Bold the second sentence; keep the first as plain muted body.

**Rewrite each card body** (replace `AUDIENCE_HUBS[*].body`):

```ts
const AUDIENCE_HUBS = [
  {
    tag: "Nonprofits",
    title: "For nonprofits",
    body: "Integrate mission, donor context, organizational memory, and responsible AI use — so the story the world hears still sounds like yours.",
    href: "/nonprofits",
  },
  {
    tag: "Churches",
    title: "For churches",
    body: "Integrate teaching, pastoral care, discipleship pathways, and relational context into one formational system — not a stack of tools.",
    href: "/churches",
  },
  {
    tag: "Institutions",
    title: "For institutions",
    body: "Integrate knowledge, curriculum, faculty context, and long-term institutional memory — across entities, generations, and accreditors.",
    href: "/institutions",
  },
] as const;
```

**Optional (keep for later, do not ship in v2 unless the visual density allows):** a 2–3 bullet "what this includes" expand state on each card. If added now, keep it collapsed by default and use `text-ink-soft` for bullets so the card's first-pass density stays calm.

---

## 9 · Why Movemental — column copy rewritten to be proof-adjacent

**Keep:** `#about` id, headline (`We work at the intersection of leadership, formation, technology, and mission.`), the 3-column `AUTHORITY_STATEMENTS` layout, the italicized serif statements.

**Rewrite the column headlines + add one explanatory line each** (the current three are self-declared and slightly manifesto-toned):

```ts
const AUTHORITY_STATEMENTS = [
  {
    n: "01",
    t: "We understand the leadership and formation problem.",
    body: "AI is not only a technical shift. It pressures judgment, voice, trust, and organizational coherence — and those are leadership problems before they are tool problems.",
  },
  {
    n: "02",
    t: "We are built for mission-driven organizations.",
    body: "The product was shaped inside real movement, church, nonprofit, and institutional questions — not imported from generic software logic.",
  },
  {
    n: "03",
    t: "We build what the work actually needs.",
    body: "We do not begin with tools. We begin with the conditions that let tools, workflows, and agents become trustworthy and durable.",
  },
] as const;
```

Update the component to render the italic statement + a secondary `text-muted-foreground` body graf beneath it.

**Rewrite the closing paragraph** (replace current: *"We are not approaching AI as a trend to chase or a threat to deny …"*):

> We do not begin with AI solutions. We begin with the conditions that make AI use trustworthy, durable, and actually useful — then we help build what now fits.

---

## 10 · NEW section — "What this is not / What this produces"

**Placement:** between Why Movemental (§8 current) and Invitation (§10 current). Give it `id="grounding"`.

**Purpose:** add one lightweight trust-bearing component without breaking the calm editorial density. Strategy map §7 calls this "proof posture" — show sources or narrow claims; do not paste fake logos or metrics.

**Structure:** two stacked blocks inside a single `Section` (variant `editorial`), narrow container. No new primitives.

```markdown
Eyebrow: Grounding

Headline: What this is — and what it is not.

Block A: What this is not
— Not a generic AI consultancy.
— Not a tool-first product.
— Not a fear-based ethics posture.
— Not a shortcut around leadership.

Block B: What this produces
— Clearer governance and moral clarity before experimentation.
— Safer, honest experimentation with real evidence.
— Durable internal capability, not dependency on vendors.
— Deployments that can actually hold integrity over time.
```

**Visual:** a two-column grid at `md+`, single column on mobile. Block A uses `text-muted-foreground` with a small `text-ink-soft` eyebrow; Block B emphasizes items with `text-foreground` to carry outcome weight. Thin `border-border` between the two blocks on `md+`; horizontal rule between them on mobile. No shadows; no card chrome beyond `bg-card` if needed for tonal stacking.

> Do not attach logos, stats, or testimonials here. The block **earns** trust by naming its own limits and its concrete outcomes — not by importing third-party proof that is not inspectable on-page.

---

## 11 · Invitation — tighter headline, stronger subhead, CTA continuity

**Keep:** `#invitation` id, the gradient band, the single-column narrow layout.

**Rewrite the headline** (replace current `Start navigating this well—before the cost compounds.`):

> Start **before the cost of confusion compounds.**

Bold the second clause; keep the headline tight.

**Rewrite the subhead pair:**

> Don't guess your way through AI. Begin with a path that can actually hold **integrity, learning, and long-term use**.
>
> You don't have to figure this out alone. We'll help you begin — wisely.

**CTAs:**

- **Primary:** `Start with clarity` → `/contact` (unchanged — mirrors nav and hero for continuity)
- **Secondary:** replace `Talk with us` → **`Start a conversation`** → `/contact` (same href; different label, stronger verb, mirrors nav CTA pattern)

---

## 12 · Typography, spacing, and rhythm refinements

Apply across the page, not as a single section:

1. **Reduce top-of-page vertical breathing room by ~10–15%.** The hero through §4 currently over-breathes relative to the density of thought. Cut the `spacing="lg"` pad on the "two equal errors" and "stakes" sections toward `md`-equivalent values. Do not touch the AI Stewardship Sequence section spacing.
2. **Serif italic discipline.** `SerifEm` should stay a **precision instrument** (one emphasized phrase per headline, maximum). Audit §2 headline, §3 headline, §4 headline, §6 headline, §8 headline — if more than one italic phrase appears in a single block, keep only the one that is structurally load-bearing.
3. **Section starts should vary.** Right now every section opens with `divider line + eyebrow`. Vary the openings:
   - Sections 2, 3, 9 — divider + eyebrow (as today)
   - Sections 4, 6 — **eyebrow only**, no top rule (visual restart)
   - Section 5 — **card grid opening** with the step rail acting as its own visual anchor (already close to this; verify the top-border on the `<ol>` is the only rule at section top)
   - Section 7 — keep the 2-column "headline | intro" layout as is; this is already a different opening shape
4. **Increase body-text contrast on explanatory grafs beneath major headlines.** Where current body grafs sit in `text-muted-foreground` and feel thin, promote the **first sentence** to `text-foreground` (unchanged weight) or bump the weight slightly. Do not change the color token globally; apply surgically to §3 closing graf, §5 closing graf, §6 closing line, §8 closing graf.
5. **`text-balance` on every headline.** Already present on most — verify §5 headline and §7 new intro sentence use it.

---

## 13 · Component-level implementation checklist

Edit **one block at a time**; keep commits reviewable.

- [ ] **Hero (§2)** — update `h1` copy, `p` subhead, add `ConceptLabel`-style label above the right aside, rename CTA label to "See the framework", verify the hairline rule still renders on all breakpoints.
- [ ] **Two equal errors (§3)** — re-layout the rail as `sm:grid-cols-2` with a `border-border` divider; append the closing interpretation line; reduce section spacing.
- [ ] **Stakes (§4)** — add the third triad member "The real challenge"; rewrite the closing body line to the "judgment / responsibility / organizational coherence" formulation.
- [ ] **Bridge (§5)** — collapse the two supporting grafs into one; replace the small-caps closing line with a downward visual cue linking to `#path`.
- [ ] **Path / AI Stewardship Sequence (§6)** — replace `PATH_STEPS[*].b`; rewrite the closing paragraph (bold first sentence).
- [ ] **What must come together (§7)** — rename heading, replace `LAYERS` constant with `Informational intelligence` / `Relational intelligence` pair, add the single closing line beneath, add the Ch. 2 cross-link.
- [ ] **Where this lands (§8)** — rewrite the intro; rewrite all three `AUDIENCE_HUBS[*].body` strings.
- [ ] **Why Movemental (§9)** — extend `AUTHORITY_STATEMENTS` with a `body` field; update the component to render `italic statement + muted body` per column; rewrite the closing paragraph.
- [ ] **NEW Grounding (§10)** — add a new `Section` with `id="grounding"` between Why Movemental and Invitation, containing the "What this is not" / "What this produces" pair.
- [ ] **Invitation (§11)** — rewrite headline (bold tail clause); rewrite subhead pair; rename secondary CTA to "Start a conversation".
- [ ] **Rhythm pass (§12)** — vary section openings; tighten serif italic discipline; reduce top-of-page spacing; bump explanatory-graf contrast where noted.

**Do not:**

- Change `/`'s route or render pipeline (it composes `HomeConceptModernPageContent` via `home-page-content.tsx`).
- Introduce new primitives, tokens, or motion libraries.
- Add customer logos, numeric statistics without an L2b citation, or any testimonial without verifiable attribution.
- Replace `/contact` CTAs with email `mailto:` links; keep the contact route canonical.

---

## 14 · Voice and phrasing rules (apply throughout)

- **Prefer "organizations"** over "you" at the top of the page; earn the second-person by §4.
- **Named vocabulary wins.** Use "two intelligences," "informational intelligence," "relational intelligence," "the AI Stewardship Sequence," "Safety, Sandbox, Skills, Solutions," "fragmentation," "integration," "coherence," "formation" — exactly as the book and articles use them.
- **No "journey" hand-waving, no "revolutionize," no "unlock."** This page is calm-authoritative, not SaaS-exuberant.
- **One italic phrase per headline, maximum.** If a headline is already doing structural work, resist the italic.
- **Audience signal lines in mid-page (§6, §7, §8) should quietly name concrete artifacts** — donor letters, pastoral care notes, curriculum memory, board governance, teaching pathways — so the reader knows we understand the actual work without forcing a single audience frame.

---

## 15 · If you only change five things (priority order)

1. **Hero headline + subhead + secondary CTA label** — §2.
2. **Replace "Human Layer / Technology Layer" with "Informational intelligence / Relational intelligence"** — §7. This single change pulls the page back into canonical vocabulary and is the largest credibility lift available.
3. **Rewrite all four AI Stewardship Sequence step bodies** — §6. Each should name a load-bearing claim from its canonical article.
4. **Sharpen the audience cards** — §8 intro and all three card bodies.
5. **Add the new Grounding section** — §10.

Everything else is refinement that can land in a second pass if needed.

---

## 16 · Quick reference — canonical phrases to prefer on `/`

| Prefer | Avoid on `/` |
| ------ | ------------- |
| There is a **wiser** way to navigate AI. | There is a **different** way to navigate AI. |
| Between fearful avoidance and reckless adoption is a **narrower, wiser path**. | a narrow way |
| **Judgment, responsibility, and organizational coherence** | "a human problem" alone |
| **Informational intelligence / Relational intelligence** | Human Layer / Technology Layer |
| **The AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions** | bespoke variations ("Safety & Ethics," "Governance Stack") |
| **Most organizations try to begin with solutions.** | "start at the end" (keep as secondary) |
| **We begin with the conditions that make AI use trustworthy, durable, and actually useful.** | "We do not sell AI solutions first." |
| **Start before the cost of confusion compounds.** | "Start navigating this well—before the cost compounds." |
| **Start a conversation** (secondary CTA) | "Talk with us" |
| **See the framework** (hero secondary CTA) | "See the path" |

---

## 17 · Agent prepend block (paste into any agent working on `/`)

```text
Follow docs/build/prompts/home-page-revision-v2-decisive-hero-ssss-proof.md.
Non-negotiables:
- Edit src/components/sections/home/home-concept-modern-page-content.tsx only.
- Preserve section ids: #top, #stakes, #path, #unfold, #audiences, #about, #invitation. Keep #unfold on the new two-intelligences section.
- Semantic tokens only — no hex, no bg-white/bg-black/bg-blue-*, no text-gray-*.
- Canonical vocabulary is load-bearing: the AI Stewardship Sequence (Safety, Sandbox, Skills, Solutions); informational/relational intelligence; field guide → /book; two intelligences = book Ch. 2.
- No fabricated stats, logos, or testimonials. L2b trust discipline.
- Do not break routes, CTAs, or analytics anchors.
Ship order: hero → two intelligences replacement → AI Stewardship Sequence step copy → audience cards → grounding section.
```

---

## 18 · Related prompts to update in the same PR (if relevant)

- [`home-page-fragmentation-funnel-narrative.md`](./home-page-fragmentation-funnel-narrative.md) — if the hero headline lock or CTA labels change, amend §2.1 here first.
- [`audience-and-org-pages-copy-prompts-v2.md`](./audience-and-org-pages-copy-prompts-v2.md) — if the nonprofits/churches/institutions card bodies change, keep audience hero copy in sync.
- [`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) — no changes expected; this prompt follows its placement rules.

---

## 19 · Revision history

| Date | Author | Note |
| ---- | ------ | ---- |
| 2026-04-17 | Agent (Claude / movemental-narrative-audit) | Initial consolidated revision prompt synthesizing 11-section editorial feedback against Movemental canonical standards (two intelligences, the AI Stewardship Sequence, field guide, L2b proof). |
