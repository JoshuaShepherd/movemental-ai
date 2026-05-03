# Fragmentation book — chapter proposals

**File role:** Authoring prompt. Proposes the full chapter spine for a book-length treatment of *fragmentation* from the specific angle that movemental has been developing across its articles, site narrative, and the `/fragmentation` and `/fragmentation-new` parallel routes. Audiences: **movement leader / author, nonprofit, church, institution.**

**Sibling prompts (do not duplicate):**
- [book-chapter-publisher-quality-edit.md](./book-chapter-publisher-quality-edit.md) — editing protocol once chapters exist.
- [book-manuscript-review-response-pass.md](./book-manuscript-review-response-pass.md) — revision pass protocol.
- [combined-fragmentation-narrative-all-audiences.md](./combined-fragmentation-narrative-all-audiences.md) — the existing site-narrative version of this argument (source material, not chapter scaffolding).
- [fragmentation-new-six-stage-views.md](./fragmentation-new-six-stage-views.md) — parallel-route build spec (source material for the trajectory's shape).

**Companion outlines to differentiate from:**
- [`docs/book-development/manuscript-ordered/BOOK_OUTLINE.md`](../../book-development/manuscript-ordered/BOOK_OUTLINE.md) — the **existing AI-focused book**. That book treats AI as forcing function and argues integration is necessary for responsible AI use. **This book is prior to that book.** See the intersection/divergence note at the end.

---

## Editorial thesis (what makes this a different book)

The existing book says: *AI broke the credibility signals movement leaders rely on; here is how to steward voice, scenius, and disclosure in the AI era.*

This book says: *Every organization carrying meaning through time has been paying a fragmentation tax for decades — in voice dilution, pastoral burnout, credential drift, donor amnesia, succession failure. AI is the moment that made the tax visible and the pathway practical. The work is to integrate two kinds of intelligence — **informational** and **relational** — and then walk the six-stage trajectory from fragmentation to movement.*

The book argues that fragmentation is **structural, not a content problem**; that every meaningful organization already has the raw material it needs; that integration is the unglamorous load-bearing stage that most never invest in; and that the same six-stage trajectory holds for movement leaders, nonprofits, churches, and institutions — with different cost currencies and different concrete shapes in each.

The AI book is about **discernment in the storm**. This book is about **the architecture underneath**.

---

## Audience and voice notes

**Audiences (addressed throughout, with dedicated playbook chapters in Part VI):**

- **Movement leader / author** — the individual whose life's work is a body of ideas carried by a network. Pays the tax in voice dilution, scenius collapse, rented audience, and apprenticeship failure.
- **Nonprofit** — the mission organization that must fundraise, program, and compound year over year. Pays the tax in donor amnesia, program-development split, staff turnover amplification, and mid-tier giving drift.
- **Church** — the congregational body whose vocation is formation over time. Pays the tax in formation gaps, pastoral burnout, generational handoff failure, and the Sunday-to-weekday fracture.
- **Institution** — the multi-entity organism (denomination, seminary, college, network) with regional bodies, field offices, or campuses. Pays the tax in credentialing drift, cross-entity incoherence, alumni invisibility, and accreditation risk.

**Voice rules (carry across every chapter):**

- Direct, earnest, hype-free. No marketing language. Speaks to insiders who already sense the problem.
- Move consistently from **diagnosis → anatomy → cost → pathway → transformation → choice**.
- Open every chapter with a specific concrete scene (a succession crisis, a grant application, a pastor's laptop, a donor who drifted) before abstracting.
- Instantiate the argument across all four audiences at least once per chapter unless the chapter is an audience-specific playbook.
- Use defined terminology consistently: *informational intelligence, relational intelligence, fragmentation, integration, activation, formation, multiplication, movement, carry-forward, library, pathways, scenius, orbit, infra channels, scatter, foundation, field, mint the schema.*
- Short paragraphs. Lists where lists serve clarity, not as a default.
- Never pure theory. Every abstraction earns its place by being shown in a real organizational moment.

**Structural principle the book must embody, not just describe — "one system evolving":**

The six stages are not six different systems. They are the same intelligence — the same artifacts, the same relationships, the same people — re-ordered over time. The book must render this the way the site's parallel route does: through **carry-forward**. Specific scenes, artifacts, and characters introduced in Part I must reappear in Parts III, IV, and V in their evolved form, so the reader feels one field re-composing across the chapters rather than six parallel arguments. Treat every chapter as a frame of the same film, not a new film.

**Concrete rule.** Commission a small "cast" in the Preface and Chapter 1 — by name where possible, by role where not: a movement leader mid-succession, a nonprofit development director, a pastor on sabbatical, a seminary dean. These four return in every Part. The reader watches their scatter field become a library (Part III), answer a question in real time (Part IV), and seed a network (Part V). Do not introduce new protagonists in the back half of the book; evolve the ones already on stage.

---

## The book's spine (seven parts, twenty-two chapters + preface + coda)

### Part I — The tax you are already paying

*Function: Name the structural problem and the invisible price before offering any pathway. The reader should feel seen in the first forty pages.*

---

DRAFTED: ### Preface — The scatter field you are already standing in

Opens with a single scene — the author at a whiteboard with a leader whose life's work is scattered across fourteen surfaces, watching them realize none of it carries forward. States the book's thesis in one sentence: *You are not disorganized; you are fragmented, and fragmentation is structural.* Names the four audiences the book serves. Promises the six-stage pathway. Sources: [docs/articles/the-story-of-movemental.md](../../articles/the-story-of-movemental.md), scatter composite from `src/components/sections/fragmentation-story/fragmentation-story-content.ts` (`getScatterTilesForAudience`).

DRAFTED: ### Chapter 1 — The invisible tax

The opening diagnosis. Fragmentation is not chaos; it is the default state of every organization that accumulates knowledge and relationships over time. The tax is paid in eight currencies: **memory, continuity, compounding, credibility, formation, coherence, AI-readiness, risk exposure.** Introduce the cost-ledger frame that recurs through the book. Show the tax at work in all four audiences in under ten pages. Sources: [docs/articles/the-cost-of-fragmentation.md](../../articles/the-cost-of-fragmentation.md), [docs/articles/fragmentation-inventory.md](../../articles/fragmentation-inventory.md), `getCostLedger(audience, field)`.

DRAFTED: ### Chapter 2 — Two intelligences

Introduce the core distinction the book will operate on. **Informational intelligence** (what you know: documents, frameworks, decisions, voice, media, SOPs, theology) and **relational intelligence** (whom you are connected to: donors, staff, peers, endorsers, alumni, board, audience, succession). Ten categories of each. Argue that most organizations have thought about one side and not the other — and that both fragment in the same structural ways. Sources: [docs/articles/intelligence-fragmentation.md](../../articles/intelligence-fragmentation.md), [docs/articles/relational-intelligence.md](../../articles/relational-intelligence.md), [docs/articles/two-intelligences-integration.md](../../articles/two-intelligences-integration.md).

DRAFTED: ### Chapter 3 — Fragmentation is structural, not a content problem

The reframe. Most leaders interpret fragmentation as a content problem ("we need better documentation"), an efficiency problem ("we need a better tool"), or a willpower problem ("we need to be more disciplined"). All three framings are wrong. Fragmentation is a structural condition — the shape that intelligence takes when there is no shared foundation to hold it. Draws the parallel to the "adaptive leadership" reframe in the AI book's Ch2: there, AI was recast as anthropological; here, fragmentation is recast as structural. Sources: [docs/articles/fragmentation-inventory.md](../../articles/fragmentation-inventory.md), [docs/articles/why-your-content-isnt-compounding.md](../../articles/why-your-content-isnt-compounding.md).

DRAFTED: ### Chapter 4 — The moment AI made the tax visible

Why now. AI did not create fragmentation; AI **exposed** fragmentation. Fragmented intelligence fed to AI produces fluent hallucinations. The leader's competitors rank above the leader's own frameworks. The nonprofit's AI assistant cannot retrieve the donor history because the history lives in three systems. The church's AI search confidently misattributes sermons. AI is the forcing function that finally made the pathway obvious and the cost insupportable. Sources: [docs/articles/ai-means-organizations-have-to-rebuild.md](../../articles/ai-means-organizations-have-to-rebuild.md), [docs/articles/ai-collapses-the-cost-of-integration.md](../../articles/ai-collapses-the-cost-of-integration.md), [docs/articles/the-one-constraint-behind-every-ai-conversation.md](../../articles/the-one-constraint-behind-every-ai-conversation.md), [docs/articles/context-changes-everything.md](../../articles/context-changes-everything.md).

---

### Part II — The map

*Function: Give the reader the full six-stage trajectory as a mental model before descending into each stage.*

---

DRAFTED: ### Chapter 5 — The six stages, at a glance

Introduce the canonical sequence: **Fragmentation → Integration → Activation → Formation → Multiplication → Movement.** One paragraph per stage, no more. Argue that the sequence is not optional — stages depend on one another, skips fail, and almost every organization stalls between Stage 1 and Stage 2. This chapter is the table of contents for Parts III–V. Sources: [docs/articles/fragmentation-to-multiplication.md](../../articles/fragmentation-to-multiplication.md), `src/components/sections/fragmentation-story/fragmentation-story-content.ts` (stage copy exports), [docs/build/audit/fragmentation-new-six-stage-trajectory.md](../audit/fragmentation-new-six-stage-trajectory.md).

---

### Part III — Integration (the load-bearing stage)

*Function: Spend the most time on the stage most organizations skip. If this Part fails, the rest of the book fails.*

---

DRAFTED: ### Chapter 6 — What integration actually is

The positive definition. Integration is not "tidying"; it is the construction of a **foundation** — a single layer beneath all surfaces from which website, communications, dashboards, and AI tools can draw. Name its three components: the **library** (informational), the **network** (relational), and the **ontology** that connects them. Sources: [docs/articles/two-intelligences-integration.md](../../articles/two-intelligences-integration.md), [docs/articles/ai-integration-workflow.md](../../articles/ai-integration-workflow.md).

DRAFTED: ### Chapter 7 — Minting the schema

The most technical-sounding chapter in the book, but written without jargon. The first act of integration is making your ontology explicit: what are the *kinds* of things you traffic in (frameworks, stories, people, decisions, offerings), and how do they relate? Walk through the movemental schema in lay terms. Show the parallel across audiences: a church mints the schema for formation pathways; an institution mints the schema for credentialing; a nonprofit mints the schema for donor–program–story relationships; a movement leader mints the schema for books–frameworks–peers. Sources: [docs/articles/ai-integration-workflow.md](../../articles/ai-integration-workflow.md), [docs/articles/why-your-content-isnt-compounding.md](../../articles/why-your-content-isnt-compounding.md).

DRAFTED: ### Chapter 8 — Carry-forward

The durability principle. Once integrated, nothing is re-lost. Every subsequent stage must inherit from the one before without loss. Name the three enemies of carry-forward: staff transition, platform migration, and "starting fresh." Show how the integration foundation makes each of those a non-event instead of a crisis. Sources: the carry-forward strip concept from [docs/build/audit/fragmentation-new-six-stage-trajectory.md §Revision addendum](../audit/fragmentation-new-six-stage-trajectory.md), [docs/articles/fragmentation-inventory.md](../../articles/fragmentation-inventory.md).

DRAFTED: ### Chapter 9 — Why integration stalls (and how to start anyway)

The permission chapter. Integration is unglamorous and produces no visible output for weeks or months. Most organizations abandon it between Stage 1 and Stage 2 and return to producing fragmented content. Name the stall patterns honestly (politics of canonicalization, fear of "locking in," tool obsession, perfectionism). Give the reader a sixty-day starting plan that is small enough to finish. Sources: [docs/articles/ai-integration-workflow.md](../../articles/ai-integration-workflow.md), [docs/articles/nonprofit-foundation-build.md](../../articles/nonprofit-foundation-build.md).

---

### Part IV — Activation and formation (the payback)

*Function: Show what integration makes possible once you finish it. This is where readers who did the unglamorous work start seeing return.*

---

DRAFTED: ### Chapter 10 — Activation: the library answers

Introduce Stage 3. Activation is when the integrated foundation stops being a project and starts being an environment. Search works. Frameworks are referenceable. Voice exists as a style guide. AI tools grounded in the corpus become reliable. The development officer sees the donor's full history in one surface. The pastor opens their Sunday prep and the relevant formation arc is already connected. Sources: [docs/articles/activation-workflow.md](../../articles/activation-workflow.md), the "live query" card pattern from [fragmentation-new-six-stage-views.md](./fragmentation-new-six-stage-views.md).

### Chapter 11 — The library, the pathways, the voice

Three activated surfaces as case pattern. **Library** — the browsable corpus. **Pathways** — structured sequences through the material that guide learners. **Voice** — the explicit style and stance that every downstream surface (human or AI) inherits. Show each across audiences. Sources: [docs/articles/formation-workflow.md](../../articles/formation-workflow.md), [docs/articles/activation-workflow.md](../../articles/activation-workflow.md).

### Chapter 12 — Formation as the moral stage

Introduce Stage 4. Formation is where the seriousness of the whole project becomes visible: integrated intelligence is not an efficiency play, it is the foundation that shapes people over time. Without it, formation is accidental; with it, formation becomes architectural. Sources: [docs/articles/formation-workflow.md](../../articles/formation-workflow.md), [docs/articles/03-transformation-over-information.md](../../articles/03-transformation-over-information.md), [docs/articles/04-the-eight-week-formation-scaffold.md](../../articles/04-the-eight-week-formation-scaffold.md), [docs/articles/06-the-christocentric-spine.md](../../articles/06-the-christocentric-spine.md).

### Chapter 13 — Information can be structured; formation requires relationship

The book's sharpest assertion about the limits of the foundation. Informational intelligence can be structured and compiled; formation cannot be produced by structure alone. This is why relational intelligence is not a nice-to-have — it is the medium through which integrated information becomes formation. Names the two non-negotiables of formation work: embodied presence and sustained relationship. Sources: [docs/articles/relational-intelligence.md](../../articles/relational-intelligence.md), [docs/articles/formation-workflow.md](../../articles/formation-workflow.md), cross-reference to the AI book's Chapter 14 without duplicating it.

---

### Part V — Multiplication and movement (the compounding)

*Function: Show what the system becomes once it reproduces itself.*

---

### Chapter 14 — Multiplication: when the work stops depending on you

Introduce Stage 5. Multiplication is when the formed system begins to reproduce — frameworks travel and translate, curricula adapt across cultures, practitioners extend the voice into rooms the leader will never visit, AI faithfully extends the corpus rather than diluting it. The leader's calendar stops being the bottleneck. Sources: [docs/articles/multiplication-workflow.md](../../articles/multiplication-workflow.md), [docs/articles/fragmentation-to-multiplication.md](../../articles/fragmentation-to-multiplication.md).

### Chapter 15 — Orbits and infra channels

The anatomy of multiplication. **Orbits** — the bands of people at various relational distances from the center (cohort, chairs, seeds, expansions). **Infra channels** — the formal and informal infrastructure through which intelligence and relationships reproduce (publishing, training, partnerships, licensing, translation). Show how the foundation from Part III becomes the fuel both of them burn. Sources: `MULTIPLICATION_INFRA` and `MULTIPLICATION_ORBIT_NODES` in `fragmentation-story-content.ts`, [docs/articles/multiplication-workflow.md](../../articles/multiplication-workflow.md).

### Chapter 16 — Movement: when platforms become a field

Introduce Stage 6. Movement is the terminal frame: the system stops being an organization and becomes a field. Credibility is embedded in networks of verified humans. The genius is collective. The work outlives the founder, the language, the geography. The two intelligences, at this stage, converge — the distinction that organized Parts II–IV dissolves into a unified network where edges carry relationship and nodes carry corpus. Sources: `getMovementNetwork(audience, nodeCount)` and `MOVEMENT_NODES`, [docs/articles/the-story-of-movemental.md](../../articles/the-story-of-movemental.md).

---

### Part VI — Playbooks (one chapter per audience)

*Function: After the universal trajectory, give each audience a dedicated chapter that walks their specific shape of fragmentation and the specific moves of integration. Each chapter is self-contained enough that a reader from that audience could be handed only that chapter and get real value.*

---

### Chapter 17 — The movement leader / author

The shape of fragmentation for the individual whose work is a body of ideas. Voice dilution, scenius collapse, rented audience, apprenticeship failure, opportunity cost. Concrete moves: the canonical framework pages, the explicit lineage map, the contributor network surfaced, the AI trained on the corpus with disclosure, the succession foundation. Primary source: [docs/articles/playbook-movement-leader.md](../../articles/playbook-movement-leader.md) — the standalone playbook form of this chapter; draft the chapter as the book-scale expansion of this article, with Maggie as the animating protagonist. Supporting: [docs/articles/the-story-of-movemental.md](../../articles/the-story-of-movemental.md), [docs/articles/HOW_MOVEMENTAL_USES_AI.md](../../articles/HOW_MOVEMENTAL_USES_AI.md), the leader variant of `getCostLedger`.

### Chapter 18 — The nonprofit

The shape of fragmentation for mission organizations. Donor amnesia, program-development split, mid-tier giving drift, story starvation, staff turnover amplified, board-staff asymmetry. Concrete moves: the relational foundation for mid-tier donors, the story pipeline between program and development, the integrated program evaluation layer, the agentic private RAG for PII-safe internal search. Primary source: [docs/articles/playbook-nonprofit.md](../../articles/playbook-nonprofit.md) — the standalone playbook form of this chapter; draft the chapter as the book-scale expansion of this article, with Wes as the animating protagonist. Supporting: [docs/articles/nonprofit-foundation-build.md](../../articles/nonprofit-foundation-build.md), [docs/articles/nonprofit-content-build.md](../../articles/nonprofit-content-build.md), [docs/articles/nonprofit-fundraising-build.md](../../articles/nonprofit-fundraising-build.md), [docs/articles/nonprofit-discovery-lab.md](../../articles/nonprofit-discovery-lab.md), [docs/articles/nonprofits-pii-private-agentic-rag.md](../../articles/nonprofits-pii-private-agentic-rag.md), [docs/articles/case-study-youthfront.md](../../articles/case-study-youthfront.md).

### Chapter 19 — The church

The shape of fragmentation for congregational bodies. Formation gaps, pastoral burnout, Sunday-to-weekday fracture, generational handoff failure, stewardship as transactional, cultural-pressure incoherence. Concrete moves: the formation pathways library, The pastoral memory layer (with the right privacy frame), the sermon-to-practice bridge, the succession carry-forward. Primary source: [docs/articles/playbook-church.md](../../articles/playbook-church.md) — the standalone playbook form of this chapter; draft the chapter as the book-scale expansion of this article, with Joelle as the animating protagonist. Supporting: [docs/articles/formation-workflow.md](../../articles/formation-workflow.md), [docs/articles/04-the-eight-week-formation-scaffold.md](../../articles/04-the-eight-week-formation-scaffold.md), [docs/articles/06-the-christocentric-spine.md](../../articles/06-the-christocentric-spine.md), [docs/articles/05-formation-journeys-the-pathway-architecture.md](../../articles/05-formation-journeys-the-pathway-architecture.md).

### Chapter 20 — The institution

The shape of fragmentation for multi-entity organisms. Credentialing drift, cross-entity incoherence, alumni invisibility, accreditation and regulatory risk, archival illegibility, public-credibility fragility. Concrete moves: the cross-entity schema, The alumni intelligence layer, the accreditation evidence layer, the translation infrastructure for regional bodies. Primary source: [docs/articles/playbook-institution.md](../../articles/playbook-institution.md) — the standalone playbook form of this chapter; draft the chapter as the book-scale expansion of this article, with Elias as the animating protagonist. Supporting: [docs/articles/nonprofit-governance-ethics-build.md](../../articles/nonprofit-governance-ethics-build.md), [docs/articles/ai-governance-ethics-course-outline.md](../../articles/ai-governance-ethics-course-outline.md), case patterns from the `institution` branch of `getCostLedger` / `getFullStorySnippet`.

---

### Part VII — The moral frame and the beginning

*Function: Close the book by placing fragmentation work in its ethical context and giving the reader a way to start.*

---

### Chapter 21 — Stewardship: the ethical weight of integrated intelligence

Integrated intelligence is power. A foundation that holds donor relationships, formation histories, alumni networks, and theological positions can be stewarded or misused. Name the ethics of integration: data dignity, consent, privacy, the dangers of surveillance-flavored infrastructure inside a formation organization, the asymmetry between the organization and the individuals it holds data on. Argue that the moral case for integration must be accompanied by a moral case for restraint. Sources: [docs/articles/nonprofits-pii-private-agentic-rag.md](../../articles/nonprofits-pii-private-agentic-rag.md), [docs/articles/ai-governance-ethics-course-outline.md](../../articles/ai-governance-ethics-course-outline.md), cross-reference to AI-book Ch10 (Transparency) and Ch13 (What to refuse).

### Chapter 22 — Starting where you are

The closing charge. No organization finishes integration in a quarter. Every organization can make one honest move in thirty days. Offer three starting moves calibrated by current stage (pre-integration, mid-integration, post-activation) and by audience. Refuse to be prescriptive beyond that. End with the book's one-line thesis in the reader's own setting: *The tax you are paying is not the cost of being a living organization. It is the cost of a structural condition that now, finally, has a pathway out.*

### Coda — The movement you join when you stop fragmenting

A short closing image. The scatter field dissolving into the library, the library into pathways, the pathways into formation, formation into multiplication, multiplication into a field. The reader's own organization placed somewhere on that arc. Invitation to continue the conversation — not as customer, but as peer. Sources: [docs/articles/the-story-of-movemental.md](../../articles/the-story-of-movemental.md).

---

## Chapter list at a glance

| # | Title |
|---|-------|
| — | Preface: The scatter field you are already standing in |
| 1 | The invisible tax |
| 2 | Two intelligences |
| 3 | Fragmentation is structural, not a content problem |
| 4 | The moment AI made the tax visible |
| 5 | The six stages, at a glance |
| 6 | What integration actually is |
| 7 | Minting the schema |
| 8 | Carry-forward |
| 9 | Why integration stalls (and how to start anyway) |
| 10 | Activation: the library answers |
| 11 | The library, the pathways, the voice |
| 12 | Formation as the moral stage |
| 13 | Information can be structured; formation requires relationship |
| 14 | Multiplication: when the work stops depending on you |
| 15 | Orbits and infra channels |
| 16 | Movement: when platforms become a field |
| 17 | The movement leader / author |
| 18 | The nonprofit |
| 19 | The church |
| 20 | The institution |
| 21 | Stewardship: the ethical weight of integrated intelligence |
| 22 | Starting where you are |
| — | Coda: The movement you join when you stop fragmenting |

**Total: 22 chapters + preface + coda.**

---

## Intersection and divergence with the AI-focused book

This book and [BOOK_OUTLINE.md](../../book-development/manuscript-ordered/BOOK_OUTLINE.md) **share corpus and author but argue different theses.** They intersect cleanly and should cross-reference each other; they must not duplicate.

**Safe intersections (cross-reference, do not restate):**

- Scenius (AI-book Ch9) is assumed here as the relational foundation at multiplication and movement stages. This book treats scenius as the terminal shape of relational intelligence; the AI book treats it as credibility solution. Reference; do not redo.
- Voice preservation (AI-book Ch8) is a downstream consequence of the integrated voice layer described in Ch11 here. Reference; do not redo.
- Transparency and disclosure (AI-book Ch10) is the ethical counterpart to Ch21's stewardship frame. The AI book speaks to disclosure of AI use; this book speaks to stewardship of the integrated foundation itself.
- The AI maturity model (AI-book Ch7) sits alongside this book's six-stage trajectory. They are orthogonal axes — AI maturity is about the organization's posture toward AI; the six-stage trajectory is about the organization's structural condition.

**Divergences (this book owns):**

- The informational/relational distinction, the ten-plus-ten taxonomy, and the cost ledger are proprietary to this book. The AI book may allude; this book defines.
- The six-stage trajectory is proprietary to this book.
- The audience playbooks (Part VI) are proprietary to this book. The AI book speaks primarily to movement leaders; this book speaks to four audiences as peers.
- The "integration is structural, not a content problem" reframe (Ch3) is this book's load-bearing move. The AI book's equivalent move is "AI is anthropological, not technological" (AI-book Ch2). The two reframes rhyme intentionally but are not the same.

**The sentence that disambiguates them:**

> *The AI book is about discernment in the storm. This book is about the architecture underneath.*

---

## Drafting protocol

1. **Before drafting any chapter**, reread the two or three articles listed under "Sources" for that chapter and pull the concrete scenes and specific numbers. Do not draft from memory of the thesis; draft from material.
2. **Open with a scene**, not a claim. Every chapter's first page must place the reader in a specific organizational moment.
3. **Instantiate in all four audiences** in every non-playbook chapter, even if briefly. Use the `leader / nonprofit / church / institution` frame consistently.
4. **Use the cost-ledger currencies** (memory, continuity, compounding, credibility, formation, coherence, AI-readiness, risk exposure) whenever cost is discussed. Do not invent new categories.
5. **Respect the stage boundaries.** Do not promise Stage 3 benefits in a Stage 2 chapter. Do not let Movement-stage language leak into the Fragmentation chapters.
6. **Cross-reference the AI book by chapter number only**, never by quoting. Assume the reader may or may not have read it.
7. **End every chapter with a choice or a question**, not a summary. The book's voice treats the reader as a peer making decisions, not a student receiving information.
8. **Target length:** 4,500–6,500 words per chapter, except the Preface and Coda (1,500–2,500) and Chapter 5 (the map — 2,000–3,000, intentionally brief).
9. **Editing pass:** run each drafted chapter through [book-chapter-publisher-quality-edit.md](./book-chapter-publisher-quality-edit.md) before marking it complete.

---

## Narrative validation criteria (prose-level analogues to the site's trajectory tests)

Before any chapter is marked complete, verify it against these six criteria. They are adapted from the validation pass used on `/fragmentation-new` — where each stage had to be felt, not merely depicted — and apply here at the prose layer.

1. **Fragmentation is felt, not just understood.** Parts I–II must not read as a taxonomy of problems. By the end of Chapter 3 the reader should have the physical sensation of carrying too much weight in too many pockets. If Part I reads as a list of categories, it has failed. Rewrite toward scene, not toward inventory.

2. **Integration reads as re-ordering of the same system — not a replacement.** Chapters 6–9 must return to the exact artifacts, characters, and scenes named in Part I. No new protagonists. No new case studies invented at this point. The reader must see the same intelligence take new shape, the way `/fragmentation-new`'s "carry-forward" ribbon renders the same fourteen tiles between stages. If the reader cannot name three specific artifacts from Part I that reappear in Part III, the chapter has failed.

3. **Activation visibly shows use or response.** Chapters 10–11 must contain at least one fully rendered scene in which the system answers a question in real time — a development officer pulls a donor's full history in seconds; a pastor opens Sunday prep and the formation arc is already connected; a leader's AI assistant cites the correct framework with lineage. Abstract claims about "responsiveness" are disallowed; show a live query being answered.

4. **Formation demonstrates relational depth distinctly from informational structure.** Chapters 12–13 must land the asymmetry honestly. Information chapters can be shorter, tighter, more schematic. Formation chapters should be slower, more particular, willing to follow a single relationship over years. If Chapters 12–13 read at the same tempo as Chapters 6–9, they have failed. The prose itself must enact the claim that formation takes a different register than structuring.

5. **Movement feels like convergence of intelligences, not abstraction.** Chapter 16 is the most common failure mode in books of this genre — a soaring closing gesture that loses specificity. The chapter must remain particular: name people, name organizations, name what carried forward. The convergence of informational and relational intelligence at movement stage must be shown with the same protagonists the book opened with, now standing in a field. If the chapter could be swapped into any other book about scale, it has failed.

6. **The reader intuitively understands "this is one system evolving."** The final test is holistic. A careful reader should be able to close the book and say: *the scatter field I saw in the Preface became the foundation in Part III, which became the library that answered in Part IV, which became the field in Part V — and all of it was the same intelligence, finally carrying forward.* If that single sentence cannot be honestly said of the manuscript, the book has failed regardless of individual-chapter quality.

---

## Narrative pacing and restraint (the prose equivalent of the animation rules)

The parallel-route build deliberately refused pinned scroll timelines, long scrubs, and heavy visual effects in favor of short, honest transitions. The book should hold the same discipline at the prose layer:

- **Refuse rhetorical pinning.** Do not hold a single extended metaphor across an entire chapter. Let scenes transition cleanly and move on. Conviction is carried by accumulation, not by drawn-out set pieces.
- **Refuse the long scrub.** Do not belabor a diagnosis for pages after the reader has it. The moment a point lands, move. Repetition is for carry-forward of scenes across chapters, not for hammering a single claim within one.
- **Prefer intersection triggers.** Let ideas arrive at the moment the reader enters a new scene, then recede. The reader is driving.
- **Respect the reader's equivalent of `prefers-reduced-motion`.** Some readers will skim. Structure chapters so that a scanner who reads only the opening scene, the first paragraph of each section, and the closing question still walks away with the chapter's thesis intact.
- **No heavy filters.** No cleverness for its own sake. No ornamental language that obscures structure. The voice is plain and direct; distinction comes from what is said, not how ornately.

---

## Change log

- **2026-04-15** — Initial proposal. Paired with [docs/build/audit/fragmentation-new-six-stage-trajectory.md](../audit/fragmentation-new-six-stage-trajectory.md) and [docs/build/prompts/fragmentation-new-six-stage-views.md](./fragmentation-new-six-stage-views.md). Synthesized from the full fragmentation corpus in `docs/articles/` and the site-narrative exports in `src/components/sections/fragmentation-story/fragmentation-story-content.ts`. No chapters drafted yet.
