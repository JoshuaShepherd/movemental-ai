# Audience-page outcomes — restructure as a stage-mapped, audience-tabbed grid

**Status:** assessment + build prompt. Open task. Affects four mockups today; will affect the parallel React surfaces (`src/components/sections/audience/*`) once promoted.

**Author note:** writing this for a future implementer (human or agent). Read the *Critique* and *Specification* sections before touching markup.

---

## Where the problem lives today

| Surface | Section name on the page | Section anchor |
| --- | --- | --- |
| `docs/html/mock-churches.html` | "What the proof looks like → The artifact a church walks out with" | `#proof` |
| `docs/html/mock-nonprofits.html` | "What the proof looks like → The artifact a nonprofit walks out with" | `#proof` |
| `docs/html/mock-institutions.html` | "What the proof looks like → The artifact an institution walks out with" | `#proof` |
| `docs/html/mock-organizations.html` | (no equivalent — could host the canonical tabbed version) | — |

Each audience page currently uses a single `.case-block` with one paragraph of prose and three `case-metric` numbers. The block reads as a generic summary of "stuff you walk out with," disconnected from the four-stage Sequence that the rest of the page just spent screen-feet teaching.

**Anchor reads in production code under** `src/components/sections/audience/` (e.g. `audience-proof-section.tsx` or its current equivalent — verify before editing). The mockups should drive the React change, not the other way around.

---

## Critique (what is actually wrong)

1. **Stage-disconnection.** The page teaches Safety → Sandbox → Skills → Solutions in a 4-card stage grid, then collapses the *result* of those four stages into one undifferentiated paragraph. The reader is asked to trust that "engagement produces an artifact" without seeing what each stage produces. The argument loses its load-bearing structure exactly where the reader is deciding whether to take a next step.

2. **The word "artifacts" is wrong.** It is correct internally — the team thinks in artifacts because that is what gets written, signed, and archived. It is wrong on a public page because it sounds like a deliverable list from a consultancy deck. The reader is not trying to evaluate deliverables; they are trying to picture *what changes about the organization*. We need value-language, not procurement-language.

3. **No audience differentiation in the right place.** The audience page already filters by audience, but the result-shape across the three audiences is genuinely different (an elder-ratified pastoral letter is not an audit-defensible 990 narrative is not a counsel-vetted accreditation memo). Today, that difference only shows up in three near-identical paragraphs across three pages. A reader on `/organizations` (the hub) cannot see the difference at all without clicking into all three.

4. **Card order on the audience hub is wrong.** On `mock-organizations.html`, churches comes first. The natural reading order — and the order the rest of the site already uses in copy ("nonprofits, churches, and institutions") — has nonprofits first. **Already fixed in `mock-organizations.html` as of this writing.** Verify the React audience-trio matches when it is rebuilt.

---

## What the page should do instead

Replace the single proof block with a **stage-mapped outcomes grid** that has, for each of the four Sequence stages, one card describing — in clear value language — what the organization walks away with from that stage. The grid mirrors the four stage cards above it, one-for-one, so the reader can read the page top-to-bottom and feel each stage *land*.

When this grid lives on **`/organizations` (the audience hub)**, layer audience tabs on top so a reader can switch the language across all four cards at once. When this grid lives on **an audience page** (`/churches`, `/nonprofits`, `/institutions`), the tabs collapse to a single locked audience — the reader is already there.

### Section name (replace "What the proof looks like / The artifact …")

- **Public-facing H2:** "What you walk away with, *stage by stage*."
- **Eyebrow:** "Outcomes"
- The word "artifact" does not appear in copy. The section internally is `outcomes-by-stage`.

### The four cards (one per stage), in order

For each stage card, use this shape:

```
[stage number, e.g. "Stage 01"]
[stage name, e.g. "Safety"]
[one-sentence value-line — what this stage produces, in value language]
[three to five plain-language outcome bullets]
[optional small footer: a single phrase naming what this looks like in writing]
```

The bullets should describe **what changes about the organization**, not what files exist. Example difference:

| Don't | Do |
| --- | --- |
| "An elder-ratified posture document." | "Your elders can answer the AI question from the front of the room without flinching." |
| "Three named refusals on file." | "Three categories of work AI is not allowed to touch — written, signed, and known to staff." |
| "A 990-defensible audit trail." | "Your next funder review and 990 narrative include the AI posture by name; no one is improvising the answer." |

The *footer line* on each card can carry the artifact-style phrasing for operators who want it (e.g. "In writing: a one-paragraph posture statement, signed by the elder team"), but it sits below the value lines, not above them.

### Audience tabs (only on the hub)

On `/organizations`:

- A horizontal tab strip immediately above the four-card grid: **Nonprofits · Churches · Institutions**.
  - Default tab: **Nonprofits** (per the corrected card order).
  - Tab order matches the audience-card grid order on the same page.
- Switching tabs swaps the copy in all four stage cards simultaneously (twelve outcomes total: four stages × three audiences). The card *structure* and *stage names* do not change between tabs; only the audience-tuned outcome copy changes.
- No URL state needed for the mockups; for the React build, mirror the same pattern used elsewhere in the codebase for tabbed audience switchers (verify in `src/components/` before deciding — do not invent a new tab pattern).
- No JS fallback: render all three audiences stacked under a `<details>` per audience if JS is off. Acceptable failure mode is "user sees three stacked sections labeled by audience."

### Audience pages (`/churches`, `/nonprofits`, `/institutions`)

The same four-card grid lives on each audience page, but with no tab strip and no audience switcher — the page has already chosen the audience. The cards display only that audience's column.

For audience pages, add a small editorial line under the section head: "Want to see the same view across all three audiences? Open the [Who we serve hub →](/organizations#outcomes)."

---

## The twelve outcomes (drafting brief)

The implementer must write these. Below is the *shape* and quality bar — not the final copy. Use the home-page hero/lede voice as the standard: declarative, one sentence per beat, no jargon, no filler.

### Stage 01 — Safety

| Audience | Value line | Three outcome bullets (drafting cue) |
| --- | --- | --- |
| **Nonprofits** | The board can answer the AI question. | Donor-readable posture; named refusals around beneficiary data and unsupervised donor correspondence; audit-ready language for the next 990. |
| **Churches** | The elders can answer the AI question from the front of the room. | Pastoral-letter-readable posture; named refusals on sermon writing and pastoral correspondence; the senior staff and elders are saying the same thing. |
| **Institutions** | Board, faculty, and counsel can read the same page. | Counsel-vetted, faculty-readable posture; named refusals across pastoral and confessional categories; an updated handbook section the senate has reviewed. |

### Stage 02 — Sandbox

| Audience | Value line | Three outcome bullets (drafting cue) |
| --- | --- | --- |
| **Nonprofits** | Development and programs have actually used these tools, with the senior team watching. | Bounded experiments on real org data; what was kept and what was put down, on the record; the executive director can speak to it in a funder meeting. |
| **Churches** | Staff have explored AI on real church work, with the elders watching. | A church-shaped sandbox archive; pastoral judgment formed by use, not borrowed; the senior pastor can describe it in the next congregational update. |
| **Institutions** | Faculty and staff have explored AI inside the institution's own work, under governance. | Department-level sandbox archives across the disciplines that participated; what was kept and what was refused, in writing; faculty senate has seen the work. |

### Stage 03 — Skills

| Audience | Value line | Three outcome bullets (drafting cue) |
| --- | --- | --- |
| **Nonprofits** | Your staff have *judgment* about AI, not just access. | A formation curriculum your next development hire is onboarded into; staff who can defend their own AI use to a major donor; reduced reliance on Movemental, on purpose. |
| **Churches** | Your staff have pastoral judgment about AI, not just prompts. | A formation curriculum your next staff member is onboarded into; staff who can answer a congregant's AI question from inside the church's own theology; reduced reliance on Movemental, on purpose. |
| **Institutions** | Your faculty and staff have institutional judgment about AI, not just access. | A formation curriculum new faculty and staff are onboarded into; institutional voices who can carry the conversation into department meetings; reduced reliance on Movemental, on purpose. |

### Stage 04 — Solutions

| Audience | Value line | Three outcome bullets (drafting cue) |
| --- | --- | --- |
| **Nonprofits** | One AI Solution is in production — and the executive director can defend it in a funder meeting. | A named Solution matching governance and donor relationships; a written defense for the board and the program team; refusals still standing. |
| **Churches** | One AI Solution is in production — and the senior pastor can defend it from the front. | A named Solution matching theology, polity, and pastoral care; a written defense the elder team can speak to; refusals still standing. |
| **Institutions** | One AI Solution is in production — and the provost can defend it under accreditation review. | A named Solution matching governance and accreditation obligations; a written defense the senate and counsel have seen; refusals still standing. |

These twelve cells are *drafting cues*, not final copy. Bring them to the home-page voice (declarative, one beat per sentence, no marketing register) before shipping.

---

## Why this is better

- **Restores the load-bearing structure.** The four-stage grid above and the four-outcome grid below mirror each other. The reader sees the Sequence taught, then sees its concrete result, then keeps reading. The argument earns the next CTA.
- **Replaces "artifacts" with value language.** The outcome bullets describe what changes about the organization, not what files exist. The artifact phrasing is preserved as a footer on each card for operators and procurement readers, but it does not lead.
- **Makes the audience differentiation visible at a glance.** A leader on the hub can switch tabs and see, in seconds, that the same Sequence produces three genuinely different shapes of result. That is itself the argument for the three-audience-page IA.
- **Fixes the card-order inconsistency.** The corrected order (nonprofits → churches → institutions) on `/organizations` matches the in-copy convention across the rest of the site.

---

## Implementation order

1. **Mockups first.** Update the four mock pages: replace the existing `.case-block` with the new outcomes grid; on `mock-organizations.html`, add the tab strip + JS for tab switching. Use the existing `.outcomes-grid` recipe in `mock-pages.css` for the four-card grid; add a small `.outcomes-tabs` recipe for the audience switcher (one new component, ≤ 60 lines of CSS, no new dependencies). For tab switching, vanilla JS in `site-templates/site-shell.js` is sufficient; no framework.
2. **Copy pass.** Draft the twelve outcome cells against the brief above. Hold each cell to the home-page voice. No "deliverables" or "artifacts" in the lead lines. *Stop and have the founder review the twelve cells before promoting to React.*
3. **React promotion.** Verify which file in `src/components/sections/audience/` carries today's proof block (likely `audience-proof-section.tsx` or similar). Replace it with a stage-outcomes component that takes `audience` as a prop on the per-audience pages and renders the tabbed switcher on `/organizations`. Reuse the existing tab pattern in the codebase if one exists; otherwise propose a small new one rather than introducing Radix tabs.
4. **Accessibility checks.** Tabs must be keyboard-navigable (arrow keys to switch, Tab to move out). Each tab panel must be linked to its tab via `aria-controls`/`aria-labelledby`. Honor `prefers-reduced-motion`.
5. **Print fallback.** When the page prints, expand all three audience tabs into stacked sections with audience labels, so a printed audience hub still carries all twelve outcomes.

## What not to do

- Do not introduce a fourth "movement leaders" tab. Movement leaders are an ecosystem layer, not an audience — see `docs/build/strategy/movement-leaders-as-ecosystem-layer.md`.
- Do not reuse the section name "What the proof looks like." Outcomes are not proof. (Proof lives elsewhere — Trusted voices and the FAQ section about why we do not publish named case studies.)
- Do not duplicate the four-stage grid above the outcomes grid. The outcomes grid carries the same stage labels and numbers, and the visual rhythm should make it clear they are the *result* of the *same four stages*, not a parallel set.
- Do not start from artifact lists and translate to value language. Start from "what changes about this organization" and only add the artifact footer if it earns its space.

---

## Cross-references

- Mockups affected: `docs/html/mock-churches.html`, `docs/html/mock-nonprofits.html`, `docs/html/mock-institutions.html`, `docs/html/mock-organizations.html`.
- Doctrine: `docs/build/strategy/movement-leaders-as-ecosystem-layer.md` (no fourth audience).
- Voice reference: home-page hero, lede, and final CTA in `docs/html/mock-home.html`.
- Audience-card order canon: `mock-organizations.html` audience grid (nonprofits → churches → institutions).
- React surfaces: under `src/components/sections/audience/` and the routes at `src/app/(site)/{churches,nonprofits,institutions,organizations}/`. Verify exact paths before editing.
