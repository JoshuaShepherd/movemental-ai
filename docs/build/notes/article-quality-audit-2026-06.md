# Article quality audit — graded-high pilot (2026-06)

**Status:** Working audit. Scores every article toward the reader-ready standard and gives each one an ordered, step-by-step fix plan to reach **95** on the [Movemental article quality rubric](./movemental-article-quality-rubric.md).
**Method:** Each article is scored by the [`movemental-article-quality`](../../../.claude/skills/movemental-article-quality/SKILL.md) skill against the six rubric dimensions (Voice, Audience address, Prose craft, Coherence, Evidence, Doctrine) and the seven hard gates. The fix plan is ordered the way the rubric prescribes: **hard gates → audience → voice → craft/coherence → evidence/doctrine**, because audience framing is upstream and fixing it first makes everything below it cheaper.
**Scope of this pass:** the `80-84/` band (12 articles), per the pilot decision. Two are fully worked below as the format demonstration; the rest are listed as pending so the doc can be filled in the same shape.

> This rubric is **not** the [EEAT qualification rubric](./eeat-research-content-qualification-rubric.md). EEAT decides whether a corpus document is worth promoting. This decides whether the prose is good enough for a reader. An article can clear EEAT at band A and still read like an internal whitepaper — which is exactly what the second worked example below is.

---

## Pilot band status (`docs/articles/graded-high/80-84/`)

| # | Article | Current EEAT band | Quality score | Verdict | Gap to 95 | Status |
|---|---------|-------------------|---------------|---------|-----------|--------|
| 1 | [01-the-invisible-tax.md](../../articles/graded-high/80-84/01-the-invisible-tax.md) | 80-84 | **86** | NEEDS REVISION (light) | 9 | ✅ worked below |
| 2 | [06-formation-vs-information.md](../../articles/graded-high/80-84/06-formation-vs-information.md) | 80-84 | **59** | NOT AN ARTICLE YET + open gate | 36 | ✅ worked below |
| 3 | 04-movement-infrastructure.md | 80-84 | — | — | — | ⏳ pending |
| 4 | 05-ai-as-credibility-amplifier-not-faker.md | 80-84 | — | — | — | ⏳ pending |
| 5 | 09-scenius-as-credibility-solution.md | 80-84 | — | — | — | ⏳ pending |
| 6 | 10-content-fragmentation.md | 80-84 | — | — | — | ⏳ pending |
| 7 | 12-competitive-landscape.md | 80-84 | — | — | — | ⏳ pending |
| 8 | 15-adaptive-leadership.md | 80-84 | — | — | — | ⏳ pending |
| 9 | 26-the-convergence.md | 80-84 | — | — | — | ⏳ pending |
| 10 | credibility-how-it-works.md | 80-84 | — | — | — | ⏳ pending |
| 11 | the-moment-ai-made-the-tax-visible.md | 80-84 | — | — | — | ⏳ pending |
| 12 | transparency-disclosure-and-trust.md | 80-84 | — | — | — | ⏳ pending |

The two worked examples are deliberately opposite cases. **#1 is a strong narrative chapter** that needs one light pass (the gap is almost all mechanical voice). **#2 is an internal research note** that needs a rebuild for a reader (the gap is spread across three dimensions and a hard gate is open). Most of the pending ten will fall between them, and most will look more like #2 than #1 — the `eeat-candidate` / `ai-note` shapes are written for the team, not the reader.

---

## 1. `01-the-invisible-tax.md`

**Audience:** any (the chapter walks all four arms: nonprofit, leader, church, institution)
**Shape:** guide (book chapter)
**Verdict:** NEEDS REVISION — but light. **Score 86/100. Gap to 95: 9 pts.**

### Scorecard

| Dim | Score | Carries the gap? | Reason (quoted) |
|-----|-------|------------------|-----------------|
| A Voice & register | 20/25 | **Yes (+4)** | Pervasive em dashes against the no-em-dash rule: *"in a filing cabinet Wes had never opened — because no one had told him…"* Plus costume words used as terms: *"the load-bearing constraint on the organization's fundraising ceiling,"* *"the scaffolding under which the real cost is carried,"* *"scatter across fourteen surfaces."* |
| B Audience address | 18/20 | minor (+1) | Strongly reader-facing — *"It is already coming out of your accounts"* — but leans on book scaffolding (*"the four who traveled into this book with us in the Preface,"* *"Chapter 3 will stay with longer"*) that dangles if read standalone. |
| C Prose craft | 13/15 | minor (+1) | Opening is exemplary (named role, scene, stakes by word 80). One cadence pattern: the section-sealing refrain *"Formation paid as accident." / "Coherence paid as drift."* repeats four times. |
| D Coherence | 14/15 | no | One through-line, eight-column ledger walked through four people, lands the choice. Long but earns it. |
| E Evidence & honesty | 12/15 | **Yes (+2)** | Honest hedging on the big number (*"in the settings I have worked with… the seven-figure range"*). But invented precision: *"a two-percent shift in Dean's willingness to initiate"* is a fabricated statistic stated as fact. |
| F Doctrine & refusals | 9/10 | minor (+1) | Two intelligences referenced correctly; Maggie framed as a person, not a fourth audience card; no sacred-replacement. |

**Hard gates open:** none. (The seven-figure number is hedged as personal experience on a book chapter, not presented as a sourced public stat — watch it if this chapter is excerpted onto a public surface.)

### Why a NEEDS-REVISION article is actually one pass out

86 lands in the NEEDS-REVISION band, but the gap is almost entirely **Dimension A mechanics** — em dashes and a handful of costume words. This is the rubric's "strong narrative chapter" case: fix the voice mechanics and the score jumps. Do not over-edit. The narrative, structure, and concreteness are already at ship quality; touching them would cost more than it earns.

### Ordered fix plan to 95

#### Step 1 — Replace every em dash with a period or a comma (recovers ~3 pts, Dimension A)
**Where:** throughout. Sample offenders:
- *"in a filing cabinet Wes had never opened — because no one had told him the filing cabinet mattered."* → *"in a filing cabinet Wes had never opened. No one had told him the filing cabinet mattered."*
- *"every gift Dean has ever made, including a 1999 gift to a predecessor nonprofit the organization acquired in a merger — but does not contain the reason…"* → *"…acquired in a merger. It does not contain the reason…"*
- *"the ability to recall what has already been learned, said, decided, or tried"* (list dashes in the eight-column definitions are fine; prose dashes are not).

**Do this:** grep the file for ` — ` and resolve each into two sentences or a comma. The no-em-dash rule is a named voice standard, not a preference; pervasive dashes alone hold this article out of the 23–25 band.

#### Step 2 — Run the costume test on the structural-metaphor words (recovers ~1 pt, Dimension A)
**Where:** four instances.
- *"the load-bearing constraint on the organization's fundraising ceiling"* → *"the real ceiling on the organization's fundraising."*
- *"a cabinet that Wes had never been told was load-bearing"* → *"a cabinet no one had told Wes mattered."*
- *"The list is the scaffolding under which the real cost is carried"* → *"The list is only the frame the cost hangs on."*
- *"scatter across fourteen surfaces"* and *"added a new surface without integrating the old ones"* → *"scatter across fourteen places"* / *"added a new place to look without connecting it to the old ones."*

**Do this:** each swaps cleanly to a plainer word with no loss of meaning, so each is costume. Cut.

#### Step 3 — Remove the one invented statistic (recovers ~2 pts, Dimension E)
**Where:** *"It produces a two-percent shift in Dean's willingness to initiate."*
**Problem:** manufactured precision stated as fact. Everywhere else the chapter is scrupulous about labeling estimates as experience; this one number breaks that discipline and is the chapter's only evidence soft spot.
**Do this:** *"It produces a small, permanent shift in Dean's willingness to initiate."* Keep the mechanism; drop the false decimal.

#### Step 4 — Decide the book-scaffolding references (recovers ~1 pt, Dimension B; only if repurposing standalone)
**Where:** *"the four who traveled into this book with us in the Preface,"* *"Chapter 3 will stay with longer,"* *"This is the chapter I have to write."*
**Problem:** fine inside the book; dangling if this runs as a standalone article.
**Do this:** if it stays a chapter, leave them. If it becomes a standalone article, replace *"we met in the Preface"* with a one-clause introduction of each person, and cut the forward/back chapter pointers.

#### Step 5 — Keep the section refrain; just confirm it does not cluster (recovers ~1 pt, Dimension C)
**Where:** *"Formation paid as accident." / "Coherence paid as drift." / "Compounding paid as scatter. Credibility paid as attribution drift."*
**Problem:** the rubric flags repeated aphoristic closers — but here the refrain is doing real structural work, sealing each parallel ledger section. This is authorial cadence, not AI tell.
**Do this:** **keep the refrain.** Only confirm no single paragraph also stacks a tricolon plus antithesis on top of it. It does not. This is a judgment call the skill should respect, not flatten.

### Projected re-score

| Dim | Now | After plan |
|-----|-----|------------|
| A | 20 | 24 |
| B | 18 | 19 |
| C | 13 | 14 |
| D | 14 | 14 |
| E | 12 | 14 |
| F | 9 | 9 |
| **Total** | **86** | **94** |

This lands at **94** — *one short of ship* on a conservative count, which is honest: the article is excellent and a careful editor will likely recover the last point in B or C while doing steps 1–4. Re-score after the pass rather than assuming 95. The work here is ~30 minutes, almost all of it Step 1.

---

## 2. `06-formation-vs-information.md`

**Audience:** leader, institution
**Shape:** ai-note (`status: eeat-candidate`)
**Verdict:** NOT AN ARTICLE YET, **hard gate open.** **Score 59/100. Gap to 95: 36 pts + close gate 7.**

### Scorecard

| Dim | Score | Carries the gap? | Reason (quoted) |
|-----|-------|------------------|-----------------|
| A Voice & register | 13/25 | **Yes (+11)** | Whitepaper register throughout. Dozens of bolded terms carrying what sentences should (*"is **conceptually sound**… **aspirational realism**: the scaffold is **coherent with theory**"*). Costume/jargon as load-bearing terms: *"operationalized," "outcome instrumentation," "scaffold," "product grammar," "differentiated spine," "validated battery."* Em dashes throughout. |
| B Audience address | 5/20 | **Yes (+13) — OPENS GATE 7** | Addressed to the team, not the reader. The piece is *about* Movemental: *"what would falsify the claim that a Movemental course…," "Movemental's bet should be stated precisely," "What evidence would strengthen Movemental most?"* Internal claim-IDs in body and frontmatter: *"`C-A08` is not primarily an empirical claim,"* `C-T02`, `C-F05`, `business-033`. Plus *"Alan Hirsch alignment (repo-level note)"* and a `companion_file` pointer. The reader (a seminary dean) is a bystander to a strategy memo. |
| C Prose craft | 7/15 | **Yes (+6)** | Opens on an *"Executive summary"* of abstractions — no named reader, no scene, no pressure. *"Movemental's core distinction… is conceptually sound and well aligned with major traditions."* Fails who/what/why-now. |
| D Coherence | 11/15 | minor (+3) | As an argument it holds (12 numbered sections build a real case). But it is a research-memo arc, not a reader arc, and several sections are list-of-findings. |
| E Evidence & honesty | 14/15 | no — its strength | Genuinely excellent. Concedes the strong counter (*"'Information is formation' (the strong version)"*), hedges hard (*"does not provide a tidy certificate"*), distinguishes empirical from normative, names real sources (Mezirow, Smith, Palmer, Lally et al.). This is the material worth saving. |
| F Doctrine & refusals | 9/10 | minor (+1) | Canon fine; explicitly guards the sacred (*"reflection cannot be outsourced to a chatbot that mimics empathy"*). |

**Hard gates open:** **Gate 7 — internal-only framing (B ≤ 8).** The article is addressed to the Movemental team. This caps it below 95 no matter how the other dimensions score.

### The diagnosis

This is not a weak article. It is a **strong internal research note wearing an article's title.** Its evidence dimension (14/15) is better than the narrative chapter's. The problem is entirely that it was written *for us, about us* — and no amount of line-polishing fixes that. The fix order matters more here than anywhere: **reframe for the reader first.** Doing so dissolves most of the register problem on its own, because "what Movemental should measure" is exactly the phrasing that drags in "instrumentation" and "operationalize."

Because the rebuild is structural, fix mode for this article should **hand the reframe to `movemental-voice` (`write:`) using this note as the source material**, not try to Edit-patch it in place. Edit-patching an internal memo into a reader article tends to leave seams.

### Ordered fix plan to 95

#### Step 1 — Close Gate 7: decide the reader and re-aim the whole piece (recovers ~13 pts, Dimension B)
**Where:** the entire framing.
**Problem:** the subject is Movemental's strategy, not the reader's decision.
**Do this:** name the reader from the audience field — a **seminary dean or institutional leader deciding whether an online formation program actually forms anyone, or is just a video library with a progress bar.** Re-aim every "Movemental should…" into "here is how *you* can tell formation from information in what you are being sold or building." The thesis becomes the reader's question, not ours.

#### Step 2 — Strip all internal scaffolding (recovers part of B + Gate 7)
**Where:** body and frontmatter.
**Do this:** delete every claim-ID (`C-T02`, `C-F05`, `C-A07`, `C-A08`, `business-033`, `research-010`), the *"repo-level note,"* the *"internal research dossier"* reference, the `companion_file` frontmatter line, and the *"What evidence would strengthen Movemental most?"* / *"formation integrity memo (internal-facing)"* sections — or convert the last one into *"what to ask of any formation program before you trust it."* Same content, reader's hands.

#### Step 3 — Replace the "Executive summary" opening with a named scene (recovers ~5 pts, Dimension C)
**Where:** the opening.
**Problem:** abstraction-first, no reader, no stakes.
**Do this:** open on the dean (or the program director) under real pressure — *e.g.* a leader looking at a course with strong completion numbers and no idea whether anyone was actually changed. Land the who/what/why-now inside 90 words before any theory.

#### Step 4 — De-jargon and de-bold (recovers ~9 pts, Dimension A)
**Where:** throughout.
**Do this:** run the costume test on *operationalized, instrumentation, scaffold, product grammar, differentiated spine, aspirational realism, validated battery, non-negotiables.* Most are costume — swap for plain words (*"operationalized"* → *"measured," "instrumentation"* → *"ways to measure outcomes," "scaffold"* → *"design" or "the loop"*). Cut the bold down to near-zero: prose is prose. Replace em dashes with periods. Reserve any kept term of art (e.g., *covenanted repetition* may survive if defined plainly on first use).

#### Step 5 — Re-sequence to a reader arc and trim (recovers ~3 pts, Dimension D)
**Where:** the 12-section memo structure.
**Do this:** collapse to a reader arc — the problem the leader feels (completion ≠ formation) → why the difference is real (the evidence, kept) → the honest limits (no certificate, the access counter-argument) → what to ask before trusting any program. Keep the evidence and the conceded counter-arguments; they are the reason this is worth rebuilding rather than discarding. Cut the marketplace-neighbors and Alan-alignment asides or fold them into one reader-facing paragraph.

#### Step 6 — Preserve the honesty (protect Dimension E, already 14/15)
**Where:** the concessions and hedges.
**Do this:** carry every concession across intact. The piece's credibility lives in lines like *"the learning sciences bless the ingredients; they do not grant a patent."* That sentence is already in the voice — keep it as a model for the rewrite's tone.

### Projected re-score

| Dim | Now | After rebuild |
|-----|-----|---------------|
| A | 13 | 23 |
| B | 5 | 19 |
| C | 7 | 14 |
| D | 11 | 14 |
| E | 14 | 14 |
| F | 9 | 9 |
| **Total** | **59** | **93+** |
| Gate 7 | open | closed |

This is a **rebuild, not an edit** — realistically a 2–3 hour authoring pass via `movemental-voice write:` with this note as source, landing in the low-to-mid 90s on first rewrite and at 95 after one polish. The honest call: do not count it shipped off an in-place edit. The reframe is the work.

---

## How to extend this doc to the rest of the band

For each pending article, run:

```
/movemental-article-quality audit: docs/articles/graded-high/80-84/<file>.md
```

Paste the resulting scorecard + ordered fix plan in as a new numbered section, and update the status table row. When the band is complete, the same pattern scales to `75-79/` (23 articles) and `70-74/` (19), lowest-scoring first. Expect the lower bands to be dominated by the Dimension-B (internal framing) and Dimension-A (register) failures shown in example #2 — the narrative-chapter case (#1) is the exception, not the rule.
