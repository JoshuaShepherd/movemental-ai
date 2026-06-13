# Movemental article quality rubric (0–100)

**Status:** Canonical. Used by the [`movemental-article-quality`](../../../.claude/skills/movemental-article-quality/SKILL.md) skill to score and improve articles toward a publishable standard.
**Date:** 2026-06-12
**Threshold to ship:** **95**. Below 95, the piece is not ready for a reader.

---

## What this rubric is for

This grades **whether an article is ready for a reader** — written in the Movemental voice, addressed to our audience rather than to ourselves, and coherent end to end. It answers a single question:

> Would a senior leader who serves real people trust the person who wrote this, and finish it better off than they started?

It is **not** the [EEAT research-content qualification rubric](./eeat-research-content-qualification-rubric.md). That one decides *whether to promote a corpus document into the research layer* (strategic fit, citation integrity, deployability). This one decides *whether the prose itself is good enough to publish*. The two are orthogonal: a piece can clear EEAT triage at band A and still read like an internal whitepaper. This rubric catches that.

Where the two overlap — evidence and honesty — this rubric reuses the EEAT evidence standard rather than restating it (see Dimension E).

### The canon this rubric enforces

The scoring below is the operational form of three existing standards. When a dimension flags a problem, the fix routes to the skill that owns it:

| Standard | Owns | Skill |
|---|---|---|
| The Movemental company voice | stance, register, refusals, case-making | [`movemental-voice`](../../../.claude/skills/movemental-voice/SKILL.md) |
| Plain prose | costume-word cleanup, register | [`plain-prose`](../../../.claude/skills/plain-prose/SKILL.md) |
| Line-level prose craft | openings, anchors, cross-refs, cadence | [`movemental-prose`](../../../.claude/skills/movemental-prose/SKILL.md) |
| Canonical story | two intelligences, six stages, trusted voices | [`movemental-narrative-audit`](../../../.claude/skills/movemental-narrative-audit/SKILL.md) |
| Pre-publication integrity | citations, doctrine, mechanics, legal | [`movemental-publish-gate`](../../../.claude/skills/movemental-publish-gate/SKILL.md) |

---

## Scoring model (100 points)

Six dimensions. The two that most often separate an 82 from a 96 — **voice** and **audience address** — carry the most weight, because they are where corpus-grade research and book chapters most often fail as reader-facing articles.

| # | Dimension | Max | The question it answers |
|---|-----------|-----|-------------------------|
| A | **Voice & register** | 25 | Does it sound like Movemental said it out loud to one person? |
| B | **Audience address** | 20 | Is it written *for the reader*, not *about us*? |
| C | **Prose craft** | 15 | Do the lines do their work — clear opening, anchored claims, clean cadence? |
| D | **Coherence & structure** | 15 | Does it hold one through-line, each part earning the next? |
| E | **Evidence & honesty** | 15 | Are claims sourced or honestly hedged, with the other side conceded? |
| F | **Doctrine & refusals** | 10 | Is the canon right and are the brand refusals intact? |

**Total: 100. Ship at 95.**

---

## Dimension A — Voice & register (0–25)

The deepest test, from [`movemental-voice`](../../../.claude/skills/movemental-voice/SKILL.md): *say it the way you would say it out loud to one person.* We sell trust, so the prose has to embody it. A reader who feels handled, hyped, or talked down to has already learned the wrong thing about us.

| Score | Criteria |
|-------|----------|
| **23–25** | Reads like a thoughtful person talking across a table. Plain words doing real work. Calm, not loud — relief, not excitement. No em dashes. No costume words (see watchlist). Formatting is minimal: prose is prose, lists are true lists. Nothing performs. |
| **18–22** | Mostly in voice. A handful of costume words, one or two performing sentences, or light over-formatting (a paragraph broken into bullets to look organized). Easily fixed. |
| **12–17** | Audibly off in stretches. Whitepaper or deck register in multiple sections, bold/header decoration carrying what sentences should, several costume words used as load-bearing terms, occasional hype. |
| **6–11** | Sustained register problem. The piece performs intelligence rather than delivering it throughout. Em dashes, stacked meta-adjectives, abstract category nouns where picturable nouns belong. |
| **0–5** | Brochure, deck, or systems-engineering English end to end. Would fail the "would I trust who wrote this" test on sight. |

**The costume-or-term-of-art test** (run on every suspect word): *could you swap it for a plainer word with no loss of meaning?* Yes → costume, cut it. No → term of art, keep it.

**Costume watchlist** (cut unless genuinely a term of art here): substrate, scaffold/scaffolding, load-bearing, surface (as verb or noun), artifact, primitive (n.), leverage, operationalize, instrumentation, robust, orchestrate, unlock, optimize, at scale, deeply/fundamentally/profoundly, "it's worth noting," "a kind of."

**What loses points fast:** em dashes; the same point or price stated twice to build pressure; bold used as emphasis-by-default; a clear paragraph chopped into a bulleted list.

**Routes to:** `movemental-voice` (audit:), then `plain-prose` for stubborn register.

---

## Dimension B — Audience address (0–20)

The criterion the brief named directly: written **for our audience, not internally**. The reader is a church, nonprofit, institution, or individual leader — not the Movemental team. A piece that tells the reader *what Movemental should measure*, that cites internal claim-IDs, or that reads like a strategy memo has the wrong second person.

| Score | Criteria |
|-------|----------|
| **18–20** | The reader is the subject. The piece speaks to a named role under real pressure, in that sector's nouns (donors/board, congregation/discipleship, faculty/accreditation, corpus/network). Any internal scaffolding (claim IDs, "what we should do," strategy framing) is gone. The reader finishes knowing what *they* now see and can do. |
| **14–17** | Mostly reader-facing, with one or two internal seams: a stray "Movemental should…", a claim-ID reference, an executive-summary-to-the-team paragraph that should be cut or reframed. |
| **9–13** | Mixed. Reads partly as a reader article, partly as an internal note to the team. Audience drifts, or the sector is left generic where a specific one is clearly in view. |
| **4–8** | Predominantly internal. Framed around what *we* should build, prove, or measure. Reader is a bystander to a strategy conversation. |
| **0–3** | A working memo, research dossier, or planning doc with a title on top. Not addressed to any reader at all. |

**Tells of internal framing:** "Movemental should…", "what we should measure/build/claim next," references to `C-T02`-style claim IDs or `business-033`, "repo-level note," companion-file pointers in the body, an executive summary written for the team rather than the reader.

**Routes to:** `movemental-voice` (audience tuning section) and `movemental-prose` (audience-mismatch check).

---

## Dimension C — Prose craft (0–15)

Line-level discipline, from [`movemental-prose`](../../../.claude/skills/movemental-prose/SKILL.md)'s six checks.

| Score | Criteria |
|-------|----------|
| **14–15** | Opening answers who/what/why-now inside 90 words. Every specialised noun anchored to a named role, artefact, number, or pressure within three sentences. No bare `See [Title]` cross-references in the body. No paragraph stacking three AI-cadence devices. |
| **11–13** | One soft spot: a slightly philosophical opening that still lands, one or two unanchored abstractions, or a couple of bare cross-refs. |
| **7–10** | Opening is mood-first and slow to name a reader; several unanchored abstractions; more than two bare pointers; one or two cadence clusters. |
| **3–6** | Opening fails who/what/why; abstractions stacked without anchors throughout; cross-refs scattered as footnotes; aphoristic closers repeated. |
| **0–2** | No legible opening, no anchors, reads as AI-shaped throughout. |

**Anchor** = a named role acting, a specific artefact, a number/date/location, or a named pressure. **Cadence cluster** = three of {tricolon, "Not X. Y." antithesis, aphoristic closer, meta-adjective stack} in one paragraph.

**Routes to:** `movemental-prose`.

---

## Dimension D — Coherence & structure (0–15)

Does the piece make sense as one argument? From the sequencing logic in [`movemental-page-auditor`](../../../.claude/skills/movemental-page-auditor/SKILL.md) and `movemental-narrative-audit`.

| Score | Criteria |
|-------|----------|
| **14–15** | One clear through-line. Problem before solution. Each section earns the next. No internal contradictions. Lands its claim and leaves the reader somewhere specific. Length matches the argument — no padding, no truncation. |
| **11–13** | Coherent but with one structural seam: a section out of order, a thesis that arrives late, or an ending that trails off. |
| **7–10** | Through-line wobbles. Two or more sections feel interchangeable or repetitive. Solution introduced before the problem is felt. Reader can lose the thread. |
| **3–6** | List-of-points masquerading as an argument; no clear arc; sections contradict or duplicate each other. |
| **0–2** | No discernible structure; a pile of notes. |

**Routes to:** `movemental-narrative-audit` (argument-level), `movemental-page-auditor` (sequencing).

---

## Dimension E — Evidence & honesty (0–15)

Reuses the EEAT evidence standard ([rubric Dimension B](./eeat-research-content-qualification-rubric.md)) plus Movemental's honesty refusals. We sell trust; an unbacked claim spends it.

| Score | Criteria |
|-------|----------|
| **14–15** | Every material claim is sourced or honestly hedged. The other side is conceded before the case is made. Limits are stated. No overclaiming, no manufactured precision. Empirical, ethical, and advocacy claims are kept distinct. |
| **11–13** | Sound, with one gap: a stat that needs a citation, or a concession that should be added. |
| **7–10** | Several unsourced "studies show" claims, or a case made without conceding the obvious counter. |
| **3–6** | Load-bearing claim is unsourced; reads as advocacy dressed as fact. |
| **0–2** | Fabricated precision, untraceable quote, or empirical claim stated as certainty. |

**Routes to:** `movemental-publish-gate` (gates 2–3), EEAT rubric for the sourcing pass.

---

## Dimension F — Doctrine & refusals (0–10)

Canon correctness and the brand-level refusals, from `movemental-narrative-audit` and `movemental-voice`.

| Score | Criteria |
|-------|----------|
| **9–10** | Canon is right: two intelligences (informational + relational), six stages in order if referenced, movement leaders framed as **trusted voices** not a fourth audience card. All refusals intact: no urgency/scarcity, no faked authorship, no AI doing discernment/care/shepherding, no looking bigger than the work. |
| **6–8** | Canon mostly right, one soft drift (a stage out of order, a framework loosely stated) or one near-miss on a refusal. |
| **3–5** | A doctrine error (movement leaders as a fourth funnel, "Scenius" as a public label) or a refusal bent (mild urgency, AI implied to do formation). |
| **0–2** | Multiple doctrine errors or a hard refusal broken (faked authorship, AI replacing the sacred). |

**Routes to:** `movemental-narrative-audit`.

---

## Hard gates (cap the total below 95 regardless of subtotals)

Any one of these caps the article below the ship line until fixed. They mirror the [publish-gate](../../../.claude/skills/movemental-publish-gate/SKILL.md) hard gates:

1. **Faked authorship** — words put in a real person's mouth they did not say.
2. **AI replacing the sacred** — AI described as doing discernment, care, relationships, or shepherding.
3. **Doctrine drift** — movement leaders as a fourth audience card; recruiting/roster framing; "Scenius" as a public H1; a core framework misstated.
4. **Unsourced load-bearing stat on a public surface** — the thesis leans on a number with no citation.
5. **Untraceable quote, title, attribution, or dead link.**
6. **Placeholders left in body** — `[TODO]`, `[RE-VALIDATE]`, lorem.
7. **Internal-only framing on a reader surface** — the piece is addressed to the team, not the reader (Dimension B ≤ 8).

A piece can score 96 on the six dimensions and still be **not ready** if a hard gate is open. Beautiful prose never overrides an integrity gate.

---

## Score bands

| Total | Verdict | Meaning |
|-------|---------|---------|
| **95–100** | **SHIP** | Reader-ready. No hard gates open. |
| **88–94** | **ONE PASS OUT** | A focused edit sprint (usually voice + one structural fix) reaches 95. |
| **75–87** | **NEEDS REVISION** | Real reframing required — typically audience address and register together. |
| **60–74** | **MAJOR REVISION** | Substantially an internal doc; rebuild for a reader. |
| **0–59** | **NOT AN ARTICLE YET** | Notes, memo, or dossier; mine for material, don't edit in place. |

---

## Scorecard template

Copy for each article:

```text
Article: [path]
Title:
Audience (frontmatter / inferred):
Shape:
Date assessed:

A Voice & register   ( /25):
B Audience address   ( /20):
C Prose craft        ( /15):
D Coherence          ( /15):
E Evidence & honesty ( /15):
F Doctrine & refusals( /10):
──────────────────────────────
TOTAL ( /100):
Hard gates open: [none | list]
Verdict: SHIP / ONE PASS OUT / NEEDS REVISION / MAJOR REVISION
Gap to 95: [points, and which dimensions carry the gap]
```

---

## How to read a low score

The point of the scorecard is the **ordered fix plan**, not the number. Two articles can both score 82 and need opposite work:

- A **strong narrative chapter** loses points only on Dimension A (a few costume words) and a hard gate (internal aside). Fix: one light voice pass. Gap closes fast.
- An **internal research note** loses points across A, B, and D at once. Fix: reframe for the reader first (B), then de-jargon (A), then re-sequence (D). The order matters — reframing for the reader often dissolves half the register problem on its own.

Always fix in this order: **hard gates → B (audience) → A (voice) → C/D (craft/coherence) → E/F (evidence/doctrine).** Audience framing is upstream of almost everything else; fix it first and the rest gets cheaper.
