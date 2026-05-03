# Movemental terminology registers

Source of truth for the `movemental-prose` skill. Add, edit, or demote terms here — the skill reads this file at invocation. Keep each term on one line so the skill can grep cleanly.

Format: plain markdown headings + bulleted term rows. Each row: `- **term** — usage note or replacement`.

---

## Endorsed — use without gloss

These are Movemental's own vocabulary. The skill leaves them alone.

- **AI Stewardship Sequence** — Movemental's canonical AI adoption framework. First mention always expanded: "the AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions." Subsequent mentions can say "the AI Stewardship Sequence" or just use the stage names once context is clear. Optional supporting line where helpful: "The order is the framework." Acronym-first naming ("SSSS," "4S") is deprecated — do not use in new writing.
- **Safety / Sandbox / Skills / Solutions** — the four ordered stages of the AI Stewardship Sequence; use the stage names freely once the sequence has been named in the piece.
- **Fragmentation / Integration / Activation / Formation / Multiplication** — the five stages.
- **Movement leader / nonprofit / church / institution** — the four audience arms.
- **Library / pathways / voice** — the artefact trio.
- **Core library** — the small body of anchor pieces (twenty to fifty) an organisation stands on.
- **Fragmentation tax** — the cost of unconnected work compounding.
- **Senior pastor / executive director / founder / institutional lead** — named roles in addresses.
- **Two intelligences** — in a piece that defines it once; assume definition in book context.
- **Governance / conviction / boundaries** — the three layers of Safety.

---

## Tolerated — gloss on first use, then fine

Use freely once the piece has earned the term with a short inline definition. The skill flags uses without a prior gloss in the same piece.

- **Scenius** — "a shared, networked intelligence inside a real field of practice."
- **Apostolic genius / mDNA / APEST / 5Q** — only in pieces explicitly engaging the Hirsch corpus. Otherwise flag as audience-mismatch and cut.
- **Orbits and infra channels** — only when discussing connected channels + background infrastructure; always gloss first use.
- **Signal collapse** — "craft stopped acting as a reliable proxy for depth." Gloss first use.
- **Citation economy** — "what gets cited by AI systems when a reader asks a question." Gloss first use.

---

## Deprecated — do not use in new writing

Replace any existing instances in content you touch.

- **SSSS** / **4S** / **SSSS framework** / **4S framework** / **SSSS path** / **SSSS model** / **SSSS journey** — replaced by **AI Stewardship Sequence**. On first mention in any piece, write: "the AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions." Subsequent mentions: "the AI Stewardship Sequence" or just the stage names. Do not introduce a new acronym.

---

## Flagged — drift; replace, gloss tightly, or cut

Vocabulary that has crept in from sibling corpora, rhetorical excess, or AI-essayist cadence. The skill flags every instance.

- **load-bearing** as adjective — replace second occurrence with plain restatement of the claim the sentence is carrying.
- **staircase vs. the scramble / staircase, not a menu / staircase, not elevator** — keep one instance per piece. Second instance: replace with "the forward sequence" / "the inverted sequence."
- **moral theater** — replace with "performance without underlying change."
- **lab coat** (as in "production wearing a lab coat") — keep only when inside the Sandbox-vs-pilot contrast; otherwise replace with "unacknowledged production."
- **trip-wires** — once per piece maximum. Subsequent: "categories where a small mistake becomes a public problem."
- **ceremony vs. sequence** — once per piece. Subsequent: plain "going through the motions" / "actually doing the work."
- **sanded off / genre-drifting / stranger and smoother** — decorative; replace with a concrete description of what was lost.
- **borrowing chain / organisational fraud** — use sparingly; one instance per piece.
- **structural pressure / structural diagnosis** — allowed twice per piece; otherwise replace with a specific named pressure ("pressure from how the work is set up," "pressure from the board's review cadence").
- **decisive layers** — replace with "the layers that actually matter."
- **cargo-cult competence** — fine once; flag if repeated across pieces in a series.
- **the adjective is the argument / the adverb is the argument** — fine once; flag if repeated.

---

## Audience-mismatch flags

When a piece's `audience_tier` or content targets a specific arm, the skill flags vocabulary that only another arm would recognise.

### When writing for **nonprofit / institution / movement leader** audiences

Avoid or gloss:

- **Pastoral touchpoints, pastoral care, pastoral edges, pastoral email** — replace with "frontline relational work," "direct care," or a specific named situation.
- **Eulogy, disciplinary conversation, child-safety protocol** — replace with examples the reader's sector actually has.
- **Sermon, sermon series, small-group guide, discipleship pipeline** — replace with research brief, program curriculum, volunteer formation path, etc.
- **Theological conviction** — if the piece is not doing theology, say "deepest moral conviction" or "first-principle commitment."

### When writing for **church / pastor** audiences

Avoid or gloss:

- **Major gifts, development calendar, donor cohort, ARR** — replace with "steady givers," "annual giving rhythm," etc.
- **Program officers, grantmaker, capacity building** — replace with sector-appropriate terms.
- **Institutional lead** — say "senior leader" or name the role (elder, executive pastor).

### When writing for **institutional (seminary, denomination)** audiences

Avoid or gloss:

- **Founder, solo voice, thought leader** — institutions do not have founders in that sense; say "principal," "president," "dean," or "department chair."
- **Nonprofit-sector shorthand** — assume no fluency.

---

## Terms to watch (not yet flagged)

Dropped here when a term first appears in drafts but before a decision has been made. Josh to triage.

- **Stewardship** — theological in origin, used frequently in secular pieces. Decide: endorsed? tolerated? replaced with "responsibility"?
- **Formation as distinct from training** — endorsed but sometimes used without the distinction being earned in the piece.
- **Movement-shaped imagination** — poetic; unclear if it survives an ED test.
- **Epistemic humility** — tolerated in book chapters; likely drift in articles.

---

## How to add a term

Edit this file directly. Put the term under the right register. Re-run `movemental-prose` against the piece to see it applied.

The skill does not cache the registers — it re-reads on every invocation.
