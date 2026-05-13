# Alan Hirsch Author Platform Manual

## Strategy, Voice, and Production

---

**Document type.** Operational manual orchestrating the canonical Alan Hirsch platform documentation, the `.claude/skills/*` skill library, and the onbuilding cohort methodology into a single production system.

**Audience.** Operators, facilitators, editors, AI agents, and cohort participants producing content under Alan Hirsch's name and voice on the single-leader platform.

**Authoring discipline.** This manual *orchestrates* the existing canon; it does not *replace* it. When this manual and a canonical document disagree on execution detail, the canonical document wins. When this manual and the canonical documents disagree on orchestration intent, this manual wins. When voice-specification is in dispute, Alan personally ratifies.

**Version.** 1.0 (initial draft)
**Last updated.** 2026-05-13
**Primary author of this manual.** Joshua Shepherd, on behalf of the Movemental platform engineering team
**Ratifying parties.** Alan Hirsch (author and voice authority); the platform's product owner

**Relationship to existing canon:**

- `docs/articles/01-content-strategy-for-movement-leaders.md` — pillar/cluster strategy
- `docs/articles/02-the-evergreen-article-architecture.md` — nine-section article spec; five voice markers
- `docs/articles/03-transformation-over-information.md` — four-necessities pedagogy
- `docs/articles/04-the-eight-week-formation-scaffold.md` — course structure
- `docs/articles/05-formation-journeys-the-pathway-architecture.md` — twelve-section pathway spec
- `docs/articles/07-author-onboarding-course-outline.md` — four-week cohort exercises
- `docs/articles/LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md` — EEAT/linking canon
- `docs/articles/HOW_MOVEMENTAL_USES_AI.md` — corpus ingestion methodology
- `docs/build/notes/onbuilding-4-week-course-SSOT.md` — onbuilding single source of truth
- `.claude/skills/alan-voice/SKILL.md` — voice constitution
- `.claude/skills/article-plan/SKILL.md` — article brief generation
- `.claude/skills/article-author/SKILL.md` — article drafting pipeline
- `.claude/skills/article-audit/SKILL.md` — six-dimension pre-publish QA
- `.claude/skills/pathway-author/SKILL.md` — pathway code-level authoring
- `.claude/skills/pathway-audit/SKILL.md` — pathway QA
- `.claude/skills/course-author/SKILL.md` — course week section drafting
- `.claude/skills/course-ingest/SKILL.md` — course publication pipeline
- `.claude/skills/movemental-prose/SKILL.md` — institutional editorial polish (not for Alan-voice corpus pieces)
- `.claude/skills/movemental-narrative-audit/SKILL.md` — platform-narrative audit

**The non-negotiable rule.** Every artifact published under Alan's name passes through three gates: (1) corpus-grounding — every framework, quote, and substantive claim traces to a source in Alan's published corpus; (2) voice fidelity — the five voice markers score within the acceptable range, the antithesis prohibition is honored, AI cadence is absent; (3) Alan-ratification — Alan personally reviews and approves before publication. No gate may be skipped, regardless of editorial pressure.

---

# Part One — The author platform thesis

## 1.1 What an author platform is, and why Alan's is unusual

Most author platforms are marketing surfaces grafted onto a publishing career. They exist to sell the next book, fill the next speaking calendar, and harvest emails for downstream sales. They treat the reader as a customer.

Alan's platform is something else. It is a **formation engine** — a coordinated system of articles, pathways, courses, and cohort experiences designed not to convert readers into customers but to convert readers into practitioners. The platform's success metric is not traffic; it is not email sign-ups; it is not book sales. The success metric is whether a reader who lands on the platform is meaningfully closer to embodied missional practice when they leave than when they arrived.

This is a substantively different design problem from a typical author marketing site. It changes what each surface must do, how voice fidelity is enforced, how content is sequenced, and what counts as completion for any given artifact.

The platform is also unusual because it is built on a corpus rather than around a personality. Alan has spent more than thirty years writing, planting, training, and teaching. He has published thirteen-plus books. He has contributed frameworks — APEST, mDNA, the six elements of *Forgotten Ways*, the missional church canon as a contemporary reference — that other practitioners cite, teach, and build on. The platform's job is not to *create* Alan's credibility (it already exists in the field) but to make that credibility *navigable* — so that a reader who encounters Alan through a single article can find their way into the larger body of work, then into formation, then into community.

This is what makes the platform a single-author EEAT problem rather than an institutional one. The credibility is concentrated. The voice is concentrated. The risk of drift — from corpus-grounded scholarship into generic ministry content, from Alan's voice into AI cadence, from formation pedagogy into information dump — is concentrated too. The platform's disciplines exist to hold the concentration without diluting it.

## 1.2 The four EEAT layers, tuned for a single author

EEAT — Experience, Expertise, Authoritativeness, Trust — is the operative framework for how Google, generative AI systems, and sophisticated readers assess whether a source deserves their attention. For a single-author platform, each layer carries a specific load:

**Experience.** Alan has spent more than thirty years doing the work he teaches. He has planted churches. He has led denominational and movement-level training. He has trained practitioners across multiple continents. He has been in rooms where the questions the platform addresses were not theoretical. The platform's job is to *show* this — through biographical specificity, through case studies drawn from his own ministry, through the texture of language that comes only from having actually done the work. Generic missional content fails the Experience test. Alan's actual stories pass it.

**Expertise.** Alan has shaped a body of intellectual work the field references. *The Forgotten Ways*, *5Q*, *The Permanent Revolution*, *ReJesus*, *On the Verge*, and the rest of the corpus. The APEST framework. The mDNA architecture. The contributions to ecclesiology, missiology, and movement theory that scholars cite and practitioners deploy. The platform's job is to make this body of work *navigable* — through pillar articles that name the frameworks, through pathway architectures that connect frameworks to practice, through course curricula that teach the frameworks at depth.

**Authoritativeness.** Alan does not stand alone. He stands in a network of practitioners — Brad Brisco, Hugh Halter, JR Woodward, Lance Ford, Deb Hirsch, Michael Frost, and many others — who have cited his work, shared platforms with him, taught from his frameworks, and shaped the missional conversation alongside him. The platform's job is to make this network *visible* — through endorsements pages, through the published record of co-authored books and shared platforms, through the scenius graph that shows Alan in his cluster of peers rather than as an isolated thought leader.

**Trust.** Alan's pedagogical and theological refusals are themselves Trust signals. He refuses to treat "apostolic" as a personality label. He refuses to compress formation into a content-marketing funnel. He refuses to publish formation material that does not require the reader to do something. He refuses to manufacture transformation language without the actual work behind it. The platform's job is to *embody* these refusals — in what it publishes, in what it declines to publish, in how it structures the formation engine, in what it asks of readers.

When all four layers are doing their work, a reader landing on the platform can move from "I have never heard of Alan Hirsch" through "I see why this person matters" to "I want to learn from this work" to "I am becoming a practitioner shaped by this work" without ever feeling like they were sold to. The platform earns the reader's transformation by demonstrating, at every layer, that the work is real.

## 1.3 The voice-fidelity problem

The single existential risk for an author platform is voice drift. Readers come to the platform because they want *Alan's* thinking — not generic missional content, not AI-generated approximations, not a junior writer's pastiche. The moment the voice drifts, the platform stops being an Alan Hirsch platform and becomes a content site that happens to bear his name. That drift, once visible, is nearly impossible to recover from.

The voice discipline is therefore the platform's load-bearing intellectual commitment. It is not a style guide to consult. It is a constitution to enforce.

**The five voice markers.** Drawn from `docs/articles/02-the-evergreen-article-architecture.md` and operationalized in `.claude/skills/article-audit/SKILL.md`, every artifact published in Alan's voice is scored against five weighted markers:

1. **Christocentric.** The argument's center of gravity returns to Jesus — to his life, his teaching, his pattern, his ongoing significance. Alan's work is not theological abstraction; it is christological always.

2. **Prophetic.** The voice names what is wrong in the inherited patterns and calls the reader toward what is needed. Prophetic does not mean angry. It means clear-eyed, unflinching, willing to identify the failures of contemporary church and movement practice.

3. **Pastoral.** The prophetic edge is held in pastoral hands. The reader is not scolded; the reader is summoned. The voice cares about the person reading and shows that care through the rhythm and texture of address.

4. **Imagery.** Alan does not argue exclusively in propositions. He thinks in pictures, in patterns, in metaphors — the seed, the rhizome, the wild orchard, the apostolic genius. Imagery is not decoration; it is how the thinking moves.

5. **Theological depth.** The work draws on the full Christian intellectual tradition — biblical theology, ecclesiology, missiology, philosophy of religion, sociology of movement, history of revival. The voice is unembarrassed about its theological seriousness.

**The antithesis prohibition.** A specific rhetorical failure to refuse: arguing primarily through "not X, but Y" constructions. Cheap antithesis is a tell of AI drafting and lazy thinking. Alan's actual rhetorical move is *expansion* — taking what the reader expects, then showing what is larger, deeper, or more demanding. The antithesis prohibition is one of the most operationally important voice rules. See `.claude/skills/alan-voice/SKILL.md` for the full rule set.

**The AI-cadence prohibition.** Lists of three. Parallel structure used reflexively. "Not just X, but also Y, and Z." Bullet-point pedagogy where prose would do. The em-dash-comma rhythm that signals AI drafting. These patterns must be edited out, not preserved. Alan's actual prose is more varied, more rhythmically irregular, more willing to be long-sentenced than AI drafting tends to be.

**The corpus-grounding rule.** Every claim that purports to be Alan's must trace to a real source in his published corpus. No invented quotes. No fabricated frameworks. No "as Alan often says" lines that don't have a citation behind them. The corpus is the source of truth; every artifact is an extension of the corpus, never a fabrication on top of it.

**The five markers, the antithesis prohibition, the AI-cadence prohibition, and the corpus-grounding rule are non-negotiable.** They are the disciplines that distinguish this platform from every other "thought leader" content site. They are also the disciplines that make AI-assisted production possible without destroying what makes the platform worth reading. Without them, AI assistance is a slow-motion catastrophe. With them, AI assistance is the production multiplier that makes the platform's scope achievable.

## 1.4 The transformation-over-information principle

The platform's pedagogy, across every artifact type, follows the four necessities articulated in `docs/articles/03-transformation-over-information.md`:

1. **Dissonance.** The reader encounters something that disturbs their existing categories. Not for shock value — for the cognitive and theological tension that opens up the possibility of seeing differently. Every artifact creates dissonance somewhere; an artifact that confirms what the reader already thinks has failed.

2. **Action.** The reader is given something to *do*. Not "ten things to consider" — an actual, specific, time-bounded action that puts the teaching into embodied practice. Action is not optional; it is constitutive of formation.

3. **Reflection.** The reader has a structured way to think about what happened when they acted. Reflection is not journaling for its own sake; it is the discipline that converts experience into wisdom.

4. **Community.** The reader is pointed toward, or actually placed in, a community of others doing the same work. Solitary formation is incomplete formation. The platform's job is not just to teach individuals but to gather practitioners.

These four are not a course pattern; they are the platform's editorial spine. Every artifact — article, pathway, course week, newsletter — gestures toward all four, even if it only fully delivers on one or two. An article that is purely informational, with no dissonance, no invitation to action, no question that drives reflection, and no acknowledgment that this work happens in community, has failed the platform's pedagogical test. It might still be true. It might still be beautifully written. It is not yet a platform-quality artifact.

The transformation-over-information principle is what distinguishes a formation engine from a publishing site. It is what justifies asking the reader for substantial attention. It is what earns the reader's trust to keep coming back. It is non-negotiable.

## 1.5 The corpus-grounding discipline

The platform's relationship to Alan's published corpus is foundational. The corpus is not just source material to be cited; it is the substrate from which everything else is generated.

**The corpus inventory.** The platform maintains a living catalog of every book, article, talk, interview, and substantive piece of published work attributable to Alan. Each item in the corpus has an ingestion status — present in the platform's searchable archive, partially present, or not yet ingested. The inventory is maintained as part of the ongoing platform operations and is never allowed to drift out of date by more than one quarter.

**The ingestion pipeline.** Books are converted to MDX and ingested to the database with chapter-level granularity. Talks are transcribed, cleaned, and excerpted. Interviews are archived and tagged. Articles are added to the corpus alongside their pillar/cluster placement. The technical pipeline is documented in `docs/articles/HOW_MOVEMENTAL_USES_AI.md`; the editorial discipline is articulated here.

**The "no invented quotes" rule.** Every quote attributed to Alan in any artifact must be a real quote from a real source, with the citation visible to the reader. AI-assisted drafting may *summarize* Alan's positions; it may not *invent* quotations. Auditing for invented quotations is one of the six dimensions in `.claude/skills/article-audit/SKILL.md` and one of the platform's pre-publication gates.

**The framework citation rule.** Every reference to an Alan framework — APEST, mDNA, the six elements, the five voices, whatever is canonical — cites the originating book or article. Readers should be able to follow any framework reference back to the source where it is most fully developed. The frameworks are not floating concepts; they are anchored in specific Alan-published material.

**The "unique intent per URL" rule.** Articles on the platform are not republished book chapters. Each article serves a unique purpose, addresses a specific reader question, and occupies a distinct URL with a clear job. Paste-up chapters are forbidden. When a chapter's content would serve the platform's reader, the chapter becomes the basis for an article that is *rewritten* to serve the article's specific purpose, with proper citation back to the book.

**The corpus credit rule.** When the platform's content draws substantively from a specific source in the corpus, that source is named — in the article body, in the citations, and in the article's metadata. Readers should always be able to see what they are reading on top of.

## 1.6 The two-stage timeline

The platform's content production is staged across discernible milestones, each of which represents a meaningful threshold of readiness.

**Stage one — first onbuilding cohort completion (Month 1).** At the end of Alan's first four-week onbuilding cohort, the platform has: a strategic pillar/cluster map for the body of work; at least one tier-1 pillar article published; at least one tier-2 cluster article published; one course week drafted in publishable shape; one canonical pathway live at the twelve-section standard; the corpus partially ingested; the home and about pages live with Alan's voice present throughout. This is the minimum viable expression of the formation engine.

**Stage two — first full launch (Month 4).** Three months after onbuilding completion, the platform has: all six pillar tier-1 articles published; two more pathways live; the first full eight-week course shipped and run with at least one cohort; the corpus substantially ingested; the endorsements page populated with named practitioners; a working newsletter cadence established. This is the platform at first launch quality.

**Stage three — year one (Month 12).** All five canonical pathways live and refined based on reader feedback. Two full courses shipped and run. Quarterly teaching essays in production. Monthly newsletter on cadence. First measurable formation outcomes — pathway completion rates, course retention, cohort participant outcomes — visible and shaping refinement. This is the platform earning its right to claim it is doing formation work, not just publishing content.

**Stage four — year three (Month 36).** The full corpus migrated and indexed. All pillar tier-1, tier-2, and meaningful tier-3 articles published. Pathways revised across multiple iterations. Multiple full courses shipped and refined. AI conversation agents deployed in pathways and courses. The platform has trained a recognizable cohort of practitioners through the formation engine; some of them are now themselves teaching, citing, and extending Alan's work. This is the platform at maturity.

The staging matters because it sets honest expectations about what the platform can promise at any given moment. Premature claims of formation outcomes when only the first cohort has completed are a Trust violation. The platform's communications discipline is to claim only what the staging actually supports.

---

# Part Two — The surface architecture

The platform is not a flat collection of pages. It is a layered architecture where each surface carries a specific EEAT load, serves a specific reader, and connects deliberately to the surfaces above and below it. Part Two names every surface and maps it to the EEAT layer it primarily carries, the layers it supports, and its role in the formation engine.

## 2.1 The Experience and Expertise layers — the substantive content surfaces

These are the surfaces that prove Alan has done the work and shaped the field. They are the platform's intellectual substance.

**The corpus reference layer.** The deepest layer of the platform. Alan's books made navigable — each book with its full table of contents, chapter summaries, key passages, frameworks introduced, and downloadable purchase links. The transcripts archive of significant talks. The interviews archive. The article archive of pieces Alan has published in other venues with appropriate rights. This layer is the substrate from which the pillar, cluster, and long-tail articles are generated. It is not heavily trafficked by casual readers; it is the proof-of-substance that serious readers and AI systems consult when they want to verify that the platform's claims are grounded in real published work. URL pattern: `/corpus/books/[slug]`, `/corpus/talks/[slug]`, `/corpus/interviews/[slug]`, `/corpus/articles/[slug]`.

**The pillar articles.** Tier-1 long-form pieces, one per major pillar of Alan's body of work. Each pillar article is a definitional treatment of a major framework or theme — what it is, why it matters, how it connects to the rest of the body of work, what it asks of the reader. Pillar articles are the platform's most heavily linked-to internal surfaces; they are the EEAT spine that everything else hangs off. Word count: 3,500–6,000 words. URL pattern: `/articles/[pillar-slug]`. Each pillar article carries the nine-section architecture from `docs/articles/02-the-evergreen-article-architecture.md`. Each pillar article cites at least three sources from the corpus and at least one external authoritative source (academic citation, denominational statement, scholarly review).

**The cluster articles.** Tier-2 pieces, multiple per pillar, each addressing a specific subtopic within the pillar's territory. Cluster articles deepen the pillar's argument in a specific direction, address a specific reader question, or treat a specific application of the pillar's framework. Word count: 2,000–3,500 words. URL pattern: `/articles/[cluster-slug]`. Each cluster article links to its pillar and to at least two other cluster articles within the same pillar's cluster.

**The long-tail articles.** Tier-3 pieces, focused on specific applications, seasonal pieces, current events read through Alan's frameworks, and reader-question responses. Long-tail articles are the platform's most numerous and most search-discoverable surface; they are how new readers encounter the platform when they search for a specific question. Word count: 1,200–2,500 words. URL pattern: `/articles/[long-tail-slug]`. Each long-tail article links upward to its cluster and pillar.

**The teaching essays.** Standalone pieces distinct from the pillar architecture — typically responding to a current question in the field, opening new territory in Alan's thinking, or expanding an existing framework based on developments since the original publication. Teaching essays are dated, treated as substantive contributions to the ongoing conversation, and archived rather than retired. Word count: 2,500–5,000 words. URL pattern: `/essays/[year]/[slug]`.

**The author pages.** Alan's primary author surface at `/about/alan-hirsch` — substantial editorial bio, books, frameworks, organizational footprint, network, endorsements, the canonical CV-as-narrative that establishes Experience and Expertise. Co-author pages where appropriate (Brad Brisco, Lance Ford, Hugh Halter, Deb Hirsch — wherever Alan has formally co-authored published work, the co-author gets a linked treatment). URL pattern: `/about/[author-slug]`.

## 2.2 The Authoritativeness layer — the network surfaces

These surfaces make visible the fact that Alan does not stand alone — that his work has been received, cited, endorsed, and extended by a network of recognized practitioners and institutions.

**The endorsements surface.** A curated page at `/endorsements` listing named practitioners with their organizational affiliations, their specific relationship to Alan's work, and what they specifically endorse. Each endorsement is a named, datable, citable thing — not a generic blurb. Categories: ecclesial leaders (denominational executives, bishops, conference moderators); academic figures (seminary faculty, scholars whose work cites Alan); movement practitioners (church planters, network leaders, training organization heads); cross-domain endorsers (leaders outside the missional church world whose work intersects). The platform refuses to publish endorsements that are vague, unattributable, or potentially fabricated.

**The "people Alan reads" surface.** A non-trivial Trust signal — `/influences` or similar — naming the thinkers Alan reads and points others toward. Alasdair MacIntyre, Walter Brueggemann, Jürgen Moltmann, Lesslie Newbigin, René Girard, Ivan Illich, James K. A. Smith, and others whose work has shaped Alan's. Naming these explicitly does two things: it shows Alan in a recognizable intellectual lineage (Authoritativeness), and it demonstrates that Alan is not interested in being the source — he points readers toward larger conversations (Trust).

**The speaking and teaching record.** `/speaking` — a substantive record of where Alan has taught, what he has taught, who hosted him. Seminaries (Fuller, Asbury, Northern, etc. — wherever applicable), denominational gatherings, conferences (Exponential, Verge, Forge, etc.), churches, networks. Each entry dated and described. Not for self-aggrandizement — for verifiability. A reader who wonders whether Alan's reception is real can see, at a glance, the texture of his actual teaching life.

**The citations and reviews record.** `/citations` — a list of where Alan's work has been cited in academic literature, reviewed in significant publications, and taught in institutional curricula. Each entry with full attribution. This is the most EEAT-load-bearing single surface on the platform from a search-and-AI perspective: it is the empirical evidence of authoritativeness in machine-readable form.

**The network visualization.** A scenius graph showing Alan in his cluster of named practitioners — Brisco, Halter, Woodward, Ford, D. Hirsch, Frost, and the others. The graph's edges are real relationships — co-authored books, shared platforms, mutual citation, organizational affiliation. The visualization is not decorative; it is evidentiary. The accessible-name and methodology link (see `docs/build/notes/homepage-ia-and-eeat-consultation-2026-05-12.md` §7) make the graph legible to non-visual readers and to skeptics who want to know how the relationships were mapped.

**The interviews archive.** `/interviews` — a curated archive of significant interviews Alan has given, with transcripts, dates, and the publication or podcast that hosted each. Interviews are an unusually high-signal authoritativeness mark: who interviewed Alan, in what context, on what topic, says something about his reception.

## 2.3 The Trust layer — the institutional disciplines

These are the surfaces and practices that signal seriousness — the platform's willingness to refuse cheap moves, honor consent, and maintain integrity over time.

**The corpus citation discipline.** Visible to every reader: every framework reference cites a specific source; every quote is attributed; every piece of substantive content has its corpus provenance shown. The platform refuses to publish anonymous-feeling content that gestures at Alan without grounding the gesture.

**The pedagogy discipline.** The four necessities are not just an internal production rule; they are visible to readers in how the platform asks for their attention. Articles invite action. Pathways require time. Courses demand cohort participation. The platform refuses to publish anything that pretends to be formation work while actually being content marketing.

**The refusal posture surfaces.** Where appropriate, the platform makes its refusals explicit. The "What this platform is not" page (potentially at `/about/what-this-is-not` or similar) names what the platform refuses to do: it is not a leadership coaching service, not a personality cult, not an apostolic credential mill, not a content-marketing funnel. Naming refusals publicly is itself a Trust move.

**The dated-and-revisable discipline.** Every article carries a publication date and a last-updated date. Significant revisions are noted with a brief changelog at the article's foot. The platform refuses the pretense that articles are eternally fresh; it admits that thinking develops and that the published record is a living archive.

**The author-approval gates.** Visible to readers: every article carries Alan's editorial sign-off in some form — either a final-paragraph acknowledgment, a marginal attribution, or a footer note. Where AI-assisted drafting was substantial, this is acknowledged honestly. The platform does not pretend that everything was hand-written by Alan when it was not, but it does guarantee that every published artifact passed through Alan's review.

**The "Alan reads everything" commitment.** Operationally, this is the firmest single Trust commitment the platform makes. Every artifact is read by Alan before publication. This is not a scaling problem the platform tries to engineer around; it is the discipline that keeps the platform honest. If Alan does not have capacity to read what is queued, the queue waits — the platform does not publish on Alan's behalf without his review.

**The maintenance commitment.** The platform commits, publicly, to maintaining its content over time — to revising articles when frameworks develop, to retiring positions Alan has revised, to updating endorsements when relationships change. Maintenance is a Trust signal because most content sites silently rot; the platform's commitment to active maintenance is differentiating.

## 2.4 The formation engine — the active pedagogical surfaces

These are the surfaces that *do* formation work, not just describe it. The formation engine is where the platform's pedagogy moves from theory into the reader's actual experience.

**The pathways.** Five canonical formation journeys, each a twelve-section editorial product at the standard articulated in `docs/articles/05-formation-journeys-the-pathway-architecture.md`. Each pathway is built around a single reframing question — the disturbance that opens the formation work. The pathways are not curricula; they are doorways. URL pattern: `/pathways/[pathway-slug]`.

**The courses.** Eight-week formation courses following the four-necessities scaffold from `docs/articles/04-the-eight-week-formation-scaffold.md`. Each course week has the structure articulated in `.claude/skills/course-author/SKILL.md`: opening video script, dissonance chat prompt, main teaching reading, case study, action prompts, reflection prompts, cohort/exit closure. Courses are run in cohort form with named facilitators; they are not self-paced content libraries. URL pattern: `/courses/[course-slug]`.

**The AI conversation layer.** Alan-voiced AI agents deployed at strategic points in the formation engine. In each pathway, an "AI Lab" section invites the reader into conversation with an agent configured for that pathway's specific formation question. In each course week, a dissonance prompt is paired with an AI conversational companion that holds the tension rather than resolving it prematurely. In each article's formation invitation, an optional AI conversation extends the article's argument into the reader's specific context. The voice configuration is governed by `.claude/skills/alan-voice/SKILL.md`; the corpus access is bounded; the refusal of premature resolution is enforced.

**The cohort infrastructure.** The system that moves readers from individual reading into communal practice. Cohort sign-up surfaces, cohort scheduling, cohort facilitator training, cohort participant communication, cohort completion artifacts. Cohorts are run in seasonal rhythms — typically two or three a year per course — with limited capacity and substantial commitment expected from participants. URL pattern: `/cohorts/[cohort-slug]`.

**The newsletter line.** The platform's correspondence with readers between articles, pathways, and courses. Two products: the broad **Newsletter** (substantive, biweekly, voice-faithful, pointing readers into the formation engine) and the **Field Letter** (quarterly, sent only to active Movement Leaders and cohort participants, more insider in register). URL pattern: `/newsletter/[issue-slug]`, with the archive at `/newsletter`.

## 2.5 The connective tissue

These surfaces do not carry primary EEAT load themselves. Their job is to make the substantive layers above legible to readers, search engines, and AI systems.

**The citation infrastructure.** The `Cite` component pattern from `src/components/citations/` (and its repo equivalent on Alan's platform) — the inline bracketed-numeral marks that link to a footnotes registry. The visual treatment as highlighter-mark rather than academic pill. The print stylesheet that inlines notes for offline reading. The footnotes registry at `/footnotes` as the canonical claims index. See `docs/build/notes/homepage-ia-and-eeat-consultation-2026-05-12.md` §6 for the design canon; `docs/articles/LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md` for the EEAT integration.

**The JSON-LD structured data.** `Person` schema on Alan's author page with `sameAs` links to verified profiles (Wikipedia, denominational sites, seminary affiliations); `knowsAbout` populated with his framework names; `worksFor` and `affiliation` populated with current organizational ties. `Article` schema on every article with `author`, `datePublished`, `dateModified`, `citation`, and `mentions` populated. `Course` schema on each course. `CreativeWork` schema on books in the corpus. These are not optional; they are what makes the platform machine-readable to AI systems that increasingly mediate reader discovery.

**The internal linking topology.** The discipline articulated in `docs/articles/LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md`: pillar articles link to all their clusters; clusters link upward to their pillar and laterally to at least two other clusters in the same pillar; long-tail articles link upward; pathways link to relevant pillars and clusters; courses link to relevant pathways; the home page links to current and pillar-anchor surfaces. The topology is audited quarterly via `.claude/skills/article-audit/SKILL.md` and the pathway audit.

**The navigation chrome.** Header, footer, mobile menu — the persistent UI that lets readers move between layers without losing context. The voice extends into the chrome: button copy, menu labels, footer language all sound like Alan-platform language, not like generic SaaS navigation. The design discipline matches DESIGN.md (the Movemental platform's design canon) where shared infrastructure exists; otherwise it follows the Alan platform's own design specification.

**The search.** A working search across the platform that returns corpus-grounded results — articles, pathway sections, course weeks, corpus references — with relevance tuned for formation-seeking readers rather than generic queries. Search is not optional for a platform of this scope; readers who arrive via specific framework names or specific questions must be able to find what they came for.

## 2.6 The surface inventory matrix

| Surface | Primary EEAT layer | Supporting layers | Tier | Editorial owner |
| --- | --- | --- | --- | --- |
| `/` (home) | Trust + Authoritativeness | All four | P1 | Alan + platform PO |
| `/about/alan-hirsch` | Experience + Expertise | Authoritativeness, Trust | P1 | Alan |
| `/about/[co-author]` | Authoritativeness | Experience, Expertise | P2 | Alan + co-author |
| `/articles/[pillar]` | Expertise | Experience, Authoritativeness | P1 (×6) | Alan + editor |
| `/articles/[cluster]` | Expertise | Experience | P2 | Alan + editor |
| `/articles/[long-tail]` | Expertise | — | P3 | Editor (Alan ratifies) |
| `/essays/[year]/[slug]` | Expertise | Trust | P2 (ongoing) | Alan |
| `/pathways/[pathway]` | Trust (formation) | Expertise | P1 (×1), P2 (×4) | Alan + editor |
| `/courses/[course]` | Trust (formation) | Expertise | P2 (×1), P3 (×N) | Alan + course producer |
| `/corpus/books/[slug]` | Experience + Expertise | — | P1 (substantial) | Producer (Alan ratifies inventory) |
| `/corpus/talks/[slug]` | Experience | — | P2 (substantial) | Producer |
| `/corpus/interviews/[slug]` | Authoritativeness | Experience | P2 (substantial) | Producer |
| `/endorsements` | Authoritativeness | Trust | P1 | Alan + platform PO |
| `/influences` | Trust | Authoritativeness | P2 | Alan |
| `/speaking` | Authoritativeness | Experience | P2 | Producer (Alan ratifies) |
| `/citations` | Authoritativeness | Expertise | P2 | Producer (Alan ratifies) |
| `/interviews` | Authoritativeness | — | P2 | Producer |
| `/newsletter` (archive) | Connective | — | P2 | Editor |
| `/newsletter/[issue]` | Trust (cadence) | Expertise | Ongoing | Alan + editor |
| `/footnotes` | Connective | — | P1 | Producer (auto-maintained) |
| `/cohorts/[slug]` | Trust (formation) | — | P2 | Cohort facilitator |
| Network visualization (home) | Authoritativeness | — | P2 | Producer (Alan ratifies) |
| AI Lab (in pathways) | Trust (formation) | Expertise | P2 | Voice-config owner + Alan |
| AI Lab (in courses) | Trust (formation) | Expertise | P2 | Voice-config owner + Alan |

**Tier vocabulary.** P1 = required for first onbuilding-cohort-completion (Stage One, Month 1). P2 = required for first full launch (Stage Two, Month 4). P3 = year-one or beyond. Ongoing = continuously produced after launch.

**Editorial owner vocabulary.** *Alan* = Alan personally drafts or substantially originates. *Alan + editor* = collaborative production with Alan as voice authority. *Editor (Alan ratifies)* = editorial team produces; Alan signs off before publish. *Producer* = technical or research production; the surface is largely systematic. *Cohort facilitator* = the named human running cohort experiences.

---

# Part Three — The substantive content spine

Part Two named the *categories* of surfaces. Part Three names the *specific artifacts* that must exist within each category — what gets built, in what order, with what relationship to the rest of the platform. This is the content map. Every artifact downstream is produced against this map.

The map is generated from Alan's body of work as it currently stands. It will expand as Alan publishes new material; the maintenance discipline (Part 7.5) governs how new corpus enters the map.

## 3.1 The pillar architecture

The platform organizes Alan's body of work into six canonical pillars. The exact pillar names and groupings are drawn from `docs/articles/01-content-strategy-for-movement-leaders.md` and confirmed by Alan as the canonical content architecture. (Where the article doc lists the pillars differently from this manual, the article doc wins; this manual exists to operationalize the canon, not to redraw it.)

The six pillars, with primary book anchors:

### Pillar One — Missional Church Foundations
**Canonical statement.** The recovery of the missional nature of the church — not as a program added to ecclesial life, but as the constitutive identity from which everything else proceeds.
**Primary books.** *The Forgotten Ways*. *The Shaping of Things to Come* (with Michael Frost). *The Faith of Leap* (with Michael Frost).
**Pillar tier-1 article.** "The Missional Church: A Foundational Treatment." (working title; final title set during production)
**Cluster articles, indicative.**
- The recovery of missio Dei as ecclesial foundation
- Christendom and its long shadow
- The four interlocking shifts of missional movement
- What "missional" is not (the term's contested meanings)
- Reading the Western context: post-Christian, post-secular, post-modern
**Pathway integration.** Pathway Two ("Becoming a Missional Church") is the formation companion.
**Course integration.** Course One ("Forgotten Ways: An Eight-Week Formation") teaches the framework at depth.

### Pillar Two — Apostolic Genius and mDNA
**Canonical statement.** The six elements of *Apostolic Genius* — Jesus is Lord, disciple-making, missional-incarnational impulse, APEST culture, organic systems, communitas not just community — that constitute the inherited movemental DNA of the church.
**Primary books.** *The Forgotten Ways*. *The Forgotten Ways Handbook*.
**Pillar tier-1 article.** "Apostolic Genius: The mDNA of Movements."
**Cluster articles, indicative.**
- Jesus is Lord as the first mDNA element and why it matters
- Disciple-making as movement substrate
- Missional-incarnational impulse: the dual move
- Organic systems versus institutional architecture
- Communitas: liminality, ordeal, and movement formation
**Pathway integration.** Pathway One ("The mDNA Path") is the formation companion.
**Course integration.** Course One.

### Pillar Three — APEST and Fivefold Ministry
**Canonical statement.** The Ephesians 4 fivefold gifting — apostolic, prophetic, evangelistic, shepherding, teaching — as the constitutive leadership ecology of the church, recovered not as personality types but as Christ's ascension gifts.
**Primary books.** *5Q*. *The Permanent Revolution* (with Tim Catchim).
**Pillar tier-1 article.** "APEST: The Fivefold Ministry as Christ's Ecclesial Architecture."
**Cluster articles, indicative.**
- The apostolic function and its contemporary recovery
- Prophetic ministry inside and outside the church
- Evangelistic vocation reframed
- Shepherding without congregational captivity
- Teaching as ecclesial formation
- APEST and personality: what the framework is not
- Reading APEST against church-history patterns
**Pathway integration.** Pathway Three ("Discovering Your APEST Vocation") is the formation companion.
**Course integration.** Course Two ("APEST Formation: An Eight-Week Course"), planned for production year-one.

### Pillar Four — Movement and Multiplication
**Canonical statement.** What it takes for the church to move from addition to multiplication — the conditions, structures, and ecclesial habits that distinguish movemental churches from stationary ones.
**Primary books.** *On the Verge* (with Dave Ferguson). *The Permanent Revolution* (with Tim Catchim).
**Pillar tier-1 article.** "Movement: From Addition to Multiplication."
**Cluster articles, indicative.**
- The mathematics of multiplication and why most churches plateau
- Apostolic environments: what they require
- The role of communitas in movement initiation
- Liminality and the conditions of movement
- Why most "church growth" is not movement
**Pathway integration.** Pathway Four ("Multiplication Foundations") is the formation companion.
**Course integration.** Course Three (planned).

### Pillar Five — Discipleship and Christology
**Canonical statement.** The recovery of Jesus-centered discipleship as the substrate of all ecclesial renewal — the conviction that everything missional begins and ends in christology.
**Primary books.** *ReJesus* (with Michael Frost). *Untamed* (with Deb Hirsch). *Right Here, Right Now* (with Lance Ford).
**Pillar tier-1 article.** "Christology First: The Foundation of Missional Renewal."
**Cluster articles, indicative.**
- The Jesus question as the first ecclesial question
- Disciple-making as the church's primary task
- Why discipleship languages have been domesticated
- The Hebraic Jesus and Western captivity
- Spirituality and embodied practice in disciple-making
**Pathway integration.** Pathway Five ("Following Jesus into Mission") is the formation companion.
**Course integration.** Course Four (planned).

### Pillar Six — Leadership, Formation, and Spiritual Practice
**Canonical statement.** What leadership looks like inside a movemental ecclesiology — formation rather than skill acquisition, vocation rather than position, embodied practice rather than abstract competency.
**Primary books.** *Disciplism* (forthcoming/current). *The Faith of Leap* (with Michael Frost). *On the Verge*.
**Pillar tier-1 article.** "Movement Leadership: Formation Over Function."
**Cluster articles, indicative.**
- Leadership as vocation, not role
- The pastor-as-CEO trap
- Spiritual practice as leadership substrate
- Why leadership development without formation produces functionaries
- The communitas of leadership: liminality as training ground
**Pathway integration.** A cross-cutting pathway potentially titled "Leadership as Formation."
**Course integration.** Cross-cutting; modules appear in multiple courses.

**Pillar production sequencing.** Pillar tier-1 articles are produced in the order above, with Pillars 1, 2, and 3 produced during the onbuilding cohort (Stage One — Month 1) and Pillars 4, 5, and 6 produced in the post-onbuilding sprint (Stage Two — Months 2–4). Cluster articles are produced opportunistically as each pillar's tier-1 lands, with at least three cluster articles per pillar by Month 6 and the full cluster set by Month 12.

## 3.2 The pathway line

The platform commits to five canonical pathways. Each pathway is a twelve-section editorial product at the standard of `docs/articles/05-formation-journeys-the-pathway-architecture.md`, integrated with `.claude/skills/pathway-author/SKILL.md` for the code-level architecture.

**Pathway One — The mDNA Path.** Reframing question: *What if church renewal doesn't require new programs but the recovery of something the church has already been?* Companion to Pillar Two. Primary corpus draw: *The Forgotten Ways*. Production target: shipped in the onbuilding cohort's Week 4. Status target at Month 1: live.

**Pathway Two — Becoming a Missional Church.** Reframing question: *What changes when the church understands itself as sent rather than gathered?* Companion to Pillar One. Primary corpus draw: *The Shaping of Things to Come*. Production target: Month 2. Status target at Month 4: live.

**Pathway Three — Discovering Your APEST Vocation.** Reframing question: *What if your sense of leadership has been shaped by a framework that excludes the gift Christ actually gave you?* Companion to Pillar Three. Primary corpus draw: *5Q*. Production target: Month 3. Status target at Month 4: live.

**Pathway Four — Multiplication Foundations.** Reframing question: *What would have to be true for your church to begin multiplying rather than merely adding?* Companion to Pillar Four. Primary corpus draw: *On the Verge*. Production target: Month 5. Status target at Month 6: live.

**Pathway Five — Following Jesus into Mission.** Reframing question: *Who is the Jesus you are following, and is that Jesus the one who actually sends?* Companion to Pillar Five. Primary corpus draw: *ReJesus*. Production target: Month 7. Status target at Month 9: live.

**Pathway integration discipline.** Each pathway:
- Names its reframing question in the hero
- Walks the reader through the twelve sections in the canonical order
- Cites at least three corpus sources per substantive section
- Integrates an AI Lab conversation agent tuned to the pathway's specific question
- Links forward to the companion course (when live)
- Links backward to the companion pillar article
- Carries Alan's voice through every section without drift
- Is reviewed annually and revised as the corpus and reader feedback warrant

## 3.3 The course line

The platform commits to producing courses progressively, with the first course shipped at first launch (Month 4) and additional courses produced on a roughly annual cadence thereafter.

**Course One — The Forgotten Ways: An Eight-Week Formation.** The platform's founding course. Eight weeks following the four-necessities scaffold, centered on the mDNA framework, drawing primarily from *The Forgotten Ways* with supporting material from *The Forgotten Ways Handbook* and *Apostolic Genius* (the formal academic treatment). Each week treats one mDNA element (Week 1: orientation; Weeks 2–7: the six elements; Week 8: synthesis and commissioning). Production target: complete eight-week arc drafted by Month 4; first cohort run Month 6.

**Course Two — APEST Formation.** Eight-week course on the fivefold ministry framework, drawing from *5Q* and *The Permanent Revolution*. Week structure: Week 1 orientation; Week 2 apostolic; Week 3 prophetic; Week 4 evangelistic; Week 5 shepherding; Week 6 teaching; Week 7 APEST in ecclesial system; Week 8 synthesis and vocational commissioning. Production target: Month 8. First cohort: Month 12.

**Course Three — Multiplication Foundations.** Eight-week course on multiplication conditions, drawing from *On the Verge* and *The Permanent Revolution*. Production target: Year Two.

**Course Four — Christology and Discipleship.** Eight-week course on Jesus-centered discipleship, drawing from *ReJesus*, *Untamed*, and *Right Here, Right Now*. Production target: Year Two.

**Course Five — Leadership as Formation.** Eight-week course on movemental leadership, cross-cutting Pillar Six material. Production target: Year Three.

**Course integration discipline.** Each course:
- Follows the eight-week scaffold from `docs/articles/04-the-eight-week-formation-scaffold.md`
- Each week's section structure follows `.claude/skills/course-author/SKILL.md` (opening video script, dissonance prompt, main teaching reading 2k–3.5k words, case study, action prompts, reflection prompts, cohort/exit)
- Runs in cohort form with named facilitators; not self-paced
- Carries the four-necessities pedagogy in every week
- Cites the corpus appropriately; the teaching reading is original article-grade content, not republished book chapters
- Integrates AI conversation companions in dissonance and action sections
- Is revised between cohort runs based on participant feedback
- Carries Alan's voice through every reading; weeks with substantial AI assistance are voice-audited before publication

## 3.4 The teaching essay line

Standalone substantive essays outside the pillar architecture — typically 2,500–5,000 words — responding to current questions in the field, opening new territory in Alan's thinking, or expanding existing frameworks based on developments since the original publication.

**Production cadence.** Quarterly minimum; more frequent if Alan's writing rhythm supports it.

**Topic discipline.** A teaching essay earns its existence by doing one of three things: (1) responding substantively to a contemporary question the pillar articles do not yet address; (2) expanding an existing framework based on developments — biblical, ecclesial, cultural — that warrant the expansion; (3) opening territory in Alan's thinking that may eventually become a new pillar or pillar cluster.

**Editorial discipline.** Teaching essays follow a modified nine-section architecture from `docs/articles/02-the-evergreen-article-architecture.md` — typically with sections 5 (misunderstandings) and 8 (connection) lighter than in pillar articles, and section 6 (biblical foundation) often more central. Voice fidelity rules apply unchanged.

**Archive discipline.** Teaching essays are dated, archived rather than retired, and revised only when Alan substantively revises the position. The essay archive is part of the platform's intellectual record and is preserved.

## 3.5 The newsletter line

The platform maintains two newsletter products, each with a distinct register and audience.

**The Newsletter.** Biweekly correspondence to the broad reader list. Substantive — typically 600–1,200 words per issue — voice-faithful, organized around a single idea or question. Each issue points readers toward specific platform surfaces (pathway, course, essay, pillar article) without becoming promotional. The Newsletter's job is to maintain Alan's voice as a regular presence in subscribers' reading life and to give readers a reason to return to the platform between major artifacts.

**The Field Letter.** Quarterly correspondence to active Movement Leaders and current cohort participants only. More insider in register — assumes the reader is doing the work, not encountering it for the first time. Often longer (1,500–3,000 words), often more candid about challenges and developments in Alan's thinking, often including material that would not yet be ready for the public Newsletter. The Field Letter is a Trust signal in its own right: it tells active practitioners they are inside a real ongoing conversation, not on the outside of a content marketing machine.

**Newsletter and Field Letter editorial discipline.** Both products carry the five voice markers, follow the corpus-grounding rule, and pass through the same Alan-ratification gate as articles and essays. Neither product is ever sent without Alan's review.

## 3.6 The corpus reference layer

The corpus reference layer is the platform's substrate. It is also one of the platform's most significant EEAT investments: a fully navigable, searchable Alan corpus is a Trust and Expertise signal that few author platforms achieve.

**Books in the corpus, with target ingestion status:**

| Book | Year | Ingestion target |
| --- | --- | --- |
| *The Forgotten Ways* | 2006 (rev. 2016) | Month 1 — full chapter-level ingestion |
| *Apostolic Genius* | 2010 | Month 2 — full ingestion |
| *The Forgotten Ways Handbook* | 2009 | Month 2 — full ingestion |
| *The Shaping of Things to Come* (w/ Frost) | 2003 (rev. 2013) | Month 3 — full ingestion |
| *ReJesus* (w/ Frost) | 2008 | Month 4 — full ingestion |
| *The Faith of Leap* (w/ Frost) | 2011 | Month 5 — chapter summaries + key passages |
| *Untamed* (w/ D. Hirsch) | 2010 | Month 5 — chapter summaries + key passages |
| *Right Here, Right Now* (w/ Ford) | 2011 | Month 6 — chapter summaries + key passages |
| *On the Verge* (w/ Ferguson) | 2011 | Month 6 — chapter summaries + key passages |
| *The Permanent Revolution* (w/ Catchim) | 2012 | Month 4 — full chapter-level ingestion |
| *5Q* | 2017 | Month 3 — full chapter-level ingestion |
| *Disciplism* | current | Month 7 — full ingestion when published |
| Additional titles | various | Year Two — full ingestion as warranted |

**Talks and interviews.** Significant talks — Verge keynotes, Forge teachings, seminary lectures, denominational gatherings — are transcribed, cleaned, and excerpted on a rolling basis. The interview archive captures podcasts, magazine interviews, and other significant conversations with Alan, with transcripts where available and excerpt+citation where transcripts are not. Production target: a baseline archive of at least twenty talks and twenty interviews by Month 6.

**The corpus index.** A single navigable surface at `/corpus` lists every item in the corpus with its ingestion status, the pillar(s) it relates to, the frameworks it introduces or develops, and links to its full record. This index is what enables corpus-grounded research for AI-assisted article production: when an `article-author` skill draws from the corpus, the index is what tells it what is available.

---

# Part Four — The production pipeline

Part Three named what gets made. Part Four defines *how* it gets made — the production roles, the lifecycle every artifact passes through, the disciplines that govern production, and the artifact-to-skill mapping that makes the next part (Part Five) executable.

## 4.1 The production roles

Five roles, each with specific responsibilities and handoffs.

**Alan (author and voice authority).** Alan is the final voice. He ratifies every published artifact. He originates substantively — through corpus material (his books and talks are the source), through editorial direction for which pillar gets which treatment, through review of every draft before publication. Alan is not a name on the marquee; he is the operative editor of his own platform. The platform fails when it operates without him reading what it ships.

**The editor.** A named human responsible for editorial production — shaping outlines from briefs, drafting in Alan's voice with corpus grounding, running pre-Alan review passes, integrating Alan's edits, preparing artifacts for publication. The editor must be voice-trained: they must have read substantially in the corpus, internalized the five voice markers, and demonstrated capacity to produce drafts that Alan can edit-down rather than rewrite-from-scratch. The editor role may be filled by more than one person at scale, but each editor must clear a voice-fidelity bar before being given production responsibility.

**The producer.** Technical and operational responsibility for the platform. Corpus ingestion. Database publication. Linking topology maintenance. Citation registry. Skill orchestration. JSON-LD structured data. Performance, accessibility, SEO infrastructure. The producer is the role that makes the platform work technically; they execute against editorial direction but do not originate editorial content.

**AI agents.** Software agents — primarily Claude via the `.claude/skills/*` library — that handle research, drafting, audit, and meta-tasks at scale that a human team could not match. AI agents do not own any artifact; they assist the editor and producer in producing artifacts that humans then ratify. AI agent output is *never* published without human review. AI agent voice-fidelity is enforced through the skill specifications, the corpus grounding rules, and the pre-publication audit gates.

**The cohort facilitator.** When the platform runs cohort experiences (course runs, pathway cohorts), a named human facilitator is responsible for the cohort itself — facilitating discussions, holding the cohort's pedagogical integrity, communicating between Alan and participants, gathering feedback that shapes course revisions. The facilitator role is distinct from the editor and producer roles and may be filled by trained practitioners who are themselves products of the platform's earlier cohorts.

## 4.2 The production states

Every artifact moves through ten possible states. The state machine is enforced by the producer; the editor moves artifacts between states; Alan ratifies the state transitions that require his sign-off.

1. **Conceived.** The artifact is named on the production map (Part Three) but no production work has begun.

2. **Briefed.** A production brief exists — typically generated by the `article-plan` skill for articles, or by the equivalent planning step for pathways and courses. The brief names the artifact's pillar/cluster, its tier, its target word count, its keywords (for SEO/GEO surfaces), its corpus draws, its internal links, its CTA, and its metadata.

3. **Researched.** The corpus material has been pulled, summarized, and prepared for drafting. For articles, this is the `article-author` skill's research step; for pathways and courses, it is the equivalent corpus-pull stage.

4. **Drafted.** A first complete draft exists. For Alan-voice artifacts, the draft has been produced by the editor (with or without AI assistance), and the editor has done their first pass on voice fidelity.

5. **Voice-audited.** The draft has passed the audit (typically via `.claude/skills/article-audit/SKILL.md` for articles, `pathway-audit` for pathways, the equivalent gate for courses) on the six dimensions: voice, architecture, SEO, GEO, citations, funnel. Specific deviations are flagged and corrected before the next stage.

6. **Editorially-reviewed.** A second human (typically not the drafting editor) has read the artifact for argument coherence, factual accuracy, citation health, and overall fitness. Editorial review catches the failures that voice-audit does not — places where the voice is right but the argument is weak, or the citations are correct but the framing is off.

7. **Alan-ratified.** Alan has read the artifact and approved it for publication, with any final edits incorporated. This is the non-negotiable gate. Nothing is published without Alan's approval.

8. **Published.** The artifact is live on the platform. Its metadata is correct. Its links are working. Its citations resolve. Its structured data is rendered.

9. **Maintained.** The artifact is in the platform's living archive. It is dated, revisable, and reviewed on the maintenance cadence (Part 7.6). The maintained state is the default for nearly all published artifacts.

10. **Refreshed** or **Archived.** Maintained artifacts may be refreshed (significant revision based on new corpus material or developments) or archived (preserved but no longer treated as current). Retirement (full removal) is rare and only occurs when an artifact is superseded by a substantively better treatment that includes the prior material.

## 4.3 The voice constitution

The voice constitution is the platform's most operationally important rule set. It is what makes the difference between content that sounds like Alan and content that does not.

**The five markers (full specification).** Drawn from `docs/articles/02-the-evergreen-article-architecture.md` §Voice and operationalized in `.claude/skills/article-audit/SKILL.md`:

1. *Christocentric.* The argument returns to Jesus — to specific moments in Jesus's life and teaching, to christological frameworks, to the ongoing significance of Christ for ecclesiology. Tells: the article ends with Jesus in some specific way; biblical citations include gospel material substantively, not just as proof texts; theological reasoning is christological rather than abstract.

2. *Prophetic.* The article names what is wrong in the inherited patterns clearly and unflinchingly. Tells: the article identifies specific failures of contemporary church or movement practice; the failures are named with specificity, not generic complaint; the call to repair is concrete.

3. *Pastoral.* The prophetic edge is held with care for the reader. Tells: the reader is addressed as someone capable of the work the article calls for; the rhetorical register acknowledges difficulty; the article does not scold.

4. *Imagery.* The thinking moves in pictures and patterns alongside propositions. Tells: at least two substantive metaphors per long-form article; sustained images that organize the argument (the seed, the rhizome, the wild orchard); biblical imagery treated as primary material, not illustration.

5. *Theological depth.* The work draws on the full Christian intellectual tradition. Tells: substantive engagement with at least one theologian or scholar beyond Alan; references to ecclesiology, missiology, or theological history that demonstrate intellectual seriousness; no embarrassment about technical theological vocabulary when warranted.

**The antithesis prohibition.** The cheap "not X, but Y" rhetorical move is forbidden as the primary argumentative form. Alan's real move is *expansion*: taking the reader's expectation and showing what is larger, deeper, or more demanding than they had supposed. Antithesis may appear in passing; it must not be the engine of the argument. See `.claude/skills/alan-voice/SKILL.md` for the full rule.

**The AI-cadence prohibition.** Specific patterns to refuse:
- Reflexive lists of three
- Parallel structure used as a verbal tic
- "Not just X, but also Y, and Z" constructions
- Bullet-point pedagogy where prose would do
- Em-dash-comma rhythms that signal AI drafting
- Sentence-length monotony — Alan's actual sentences vary substantially in length, often running long when the thinking warrants
- The "as we shall see" / "as I will argue" gestures that AI drafting often produces but Alan rarely uses

**The expansion-by-example test.** A strong Alan article reaches its key moves through concrete examples — biblical, historical, contemporary, autobiographical — rather than through abstract argument alone. Articles that proceed entirely in propositions, without concrete moments where the argument lands in a story or a specific case, fail the test even if every other voice marker is present.

**The "would Alan say this?" question.** Editors are trained to ask, at every paragraph, whether Alan would actually say what the paragraph says — not whether it is true, but whether it is *his*. Many true things would not be said in Alan's voice. The test is voice, not correctness alone.

## 4.4 The corpus-grounding discipline

The platform's relationship to Alan's published corpus is the second non-negotiable discipline (after voice fidelity).

**The traceability rule.** Every claim attributed to Alan must trace to a real source. AI-assisted drafting may synthesize Alan's positions across multiple sources; it may not fabricate positions Alan has not taken. The editor and the audit step are jointly responsible for catching fabrications before publication.

**The quote-integrity rule.** No invented quotes. When an article quotes Alan, the quote is real, sourced, and citable. When the article paraphrases Alan, it does not present the paraphrase as a quote.

**The framework-citation rule.** Every reference to a canonical Alan framework — APEST, mDNA, the six elements, the five voices — cites the originating source. The first reference in any article carries the citation; subsequent references in the same article may abbreviate.

**The expansion-with-attribution rule.** When the platform extends Alan's frameworks — applying APEST to a new domain, drawing implications from mDNA the original books did not draw explicitly — the extension is acknowledged. "Alan does not say this directly, but his framework suggests..." is the honest formulation. Claiming Alan's authority for an extension he has not endorsed is forbidden.

**The unique-intent rule.** Articles are not paste-up book chapters. Each article addresses a specific reader question with a specific argumentative purpose. When an article's content would draw substantially from a single book chapter, the article is rewritten to serve the article's specific job, with appropriate citation back to the chapter.

## 4.5 The formation-first pedagogy as production filter

Every artifact passes through a pedagogy check before publication. The check asks four questions:

1. **Where is the dissonance?** What does this artifact ask the reader to see differently? What categories does it disturb?

2. **What is the action?** What specific, embodied, time-bounded thing does this artifact ask the reader to do?

3. **What is the reflection structure?** How does the reader process what happened when they acted?

4. **Where is community gestured at?** How does this artifact point the reader toward others doing the same work?

An artifact may not deliver fully on all four (a long-tail article will have a lighter community gesture than a pathway will, for instance), but every artifact must acknowledge all four. An artifact that has no dissonance, no invitation to action, no reflection question, and no community gesture has failed the platform's pedagogical test and is not yet publishable, regardless of its voice fidelity or factual accuracy.

The pedagogy filter is enforced by the editor at the editorially-reviewed state and verified by the audit step.

## 4.6 The artifact-to-skill mapping

This is the operational table that makes Part Five executable. For each artifact type, the canonical skill or skill chain used to produce it.

| Artifact type | Production skill chain | Audit skill |
| --- | --- | --- |
| Pillar tier-1 article | `article-plan` → `article-author` → editor pass | `article-audit` |
| Cluster tier-2 article | `article-plan` → `article-author` → editor pass | `article-audit` |
| Long-tail tier-3 article | `article-plan` → `article-author` → editor pass | `article-audit` |
| Teaching essay | Custom plan → `article-author` (modified) → Alan substantial draft | `article-audit` (modified) |
| Pathway | Pathway design (12-section narrative from doc 05) → `pathway-author` (code-level 12-block) → editor pass | `pathway-audit` |
| Course week | Course-thesis-and-scaffold → `course-author` per section → `course-ingest` | `article-audit` on teaching reading; cohort-facilitator review on all |
| Newsletter issue | Custom prompt (see 5.8) → editor pass | Lightweight audit (voice markers only) |
| Field Letter | Custom prompt (see 5.9) → editor pass → Alan draft pass | Lightweight audit |
| Corpus ingestion (book) | Custom pipeline per `HOW_MOVEMENTAL_USES_AI.md` | Manual review by producer |
| Corpus ingestion (talk) | Transcript → clean → excerpt → tag pipeline | Manual review |
| Endorsement entry | Editorial collection + Alan confirmation | None automated; Alan ratifies |
| AI conversation agent configuration | Custom voice-config per `alan-voice` | Voice audit on sample conversations |
| Voice audit (meta) | `article-audit` + `alan-voice` + five-marker rubric | Self-checking |
| Pedagogy audit (meta) | Custom prompt (see 5.13) | Self-checking |
| EEAT linking audit (meta) | Custom prompt per `LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md` | Self-checking |

**Skill discovery and orchestration.** Every production task begins by consulting the relevant skill specification. The skill files in `.claude/skills/*` are authoritative for execution detail; this manual is authoritative for orchestration — which skill runs when, in which order, with which handoffs. When a skill specification and this manual disagree on execution detail, the skill wins. When they disagree on orchestration, this manual wins.

**Skill maintenance.** Skills are themselves maintained artifacts. When a skill's specification drifts from current best practice — because Alan's voice rules have refined, because the corpus has expanded, because production experience has surfaced patterns — the skill is updated. Updates to the `alan-voice` skill require Alan's ratification.

---

# Part Five — The production prompts and skill orchestrations

This is the operational heart of the manual. Each subsection below is a complete, runnable production order for one artifact type. The prompts are written to be pasted into a Cursor or Claude session with minimal modification — substitute the artifact-specific inputs (pillar slug, pathway question, course week number, etc.) at the marked locations, and the prompt is ready to execute.

Every prompt has the same structure: **Inputs required** → **Skills invoked** → **The prompt itself** → **Expected outputs** → **Handoff and ratification path**.

## 5.1 Pillar tier-1 article production prompt

**Inputs required.**
- Pillar slug (one of the six canonical pillars from Part 3.1)
- Working title for the article (final title set during production)
- Primary corpus draws (which books, talks, articles are the source)
- Target word count (typically 4,500–6,000 for pillar tier-1)
- Internal links to relevant clusters and pathway

**Skills invoked.** `article-plan` (brief generation) → `article-author` (full nine-section drafting with corpus research) → `article-audit` (six-dimension QA) → human editor pass → Alan-ratification.

**The prompt.**

> Produce a pillar tier-1 article for the Alan Hirsch platform on **[PILLAR]**, working title **[TITLE]**.
>
> Phase 1 — Brief. Run `.claude/skills/article-plan/SKILL.md` to generate the production brief. The brief must include: pillar, tier (Tier 1), target keywords for SEO and GEO surfaces, the nine-section H2/H3 outline (per `docs/articles/02-the-evergreen-article-architecture.md`), the corpus sources targeted (specific books and chapters from `[CORPUS DRAWS]`), the internal links to relevant cluster articles and pathway, the formation invitation CTA (which pathway or course the article gestures toward), the meta description, the slug. Output the brief as a markdown document for review before drafting.
>
> Phase 2 — Research. Run the corpus research step of `.claude/skills/article-author/SKILL.md` against the brief. Pull the relevant passages from each cited corpus source. Tag each pulled passage with its source citation in canonical format. Identify at least three direct quotations that should appear in the draft and at least five framework or argument references that should be cited.
>
> Phase 3 — Draft. Run the full drafting pipeline of `.claude/skills/article-author/SKILL.md`. Produce the article in the nine-section architecture: opening hook (no heading, primary keyword in the first ~100 words), definition anchor (GEO-quotable, self-contained), why this matters (with a specific historical or contemporary parallel — not generic), core teaching (search-shaped H2/H3 substructure; corpus quotes integrated with attribution), common misunderstandings (expansion, not cheap antithesis — per the antithesis prohibition), biblical foundation (argument, not stacked proof-texts), practice (earned only after the above; the action the reader is invited into), how this connects (internal links to cluster articles, to the companion pathway, and to at least one other pillar where relevant), formation invitation (single CTA to the pathway or course).
>
> Optional FAQ block at the foot for extractability. Target word count: **[WORD COUNT]**.
>
> Voice fidelity: enforce the five voice markers from `.claude/skills/alan-voice/SKILL.md`. Refuse the antithesis-as-primary-move pattern. Refuse AI cadence (no reflexive lists of three, no parallel-structure tics, no em-dash-comma rhythm). Sentence-length variation: at least one third of the article's sentences run longer than 25 words, and at least one third run shorter than 12 words.
>
> Phase 4 — Audit. Run `.claude/skills/article-audit/SKILL.md` against the draft. The six audit dimensions: voice (five-marker rubric scored within acceptable range), architecture (all nine sections present in correct order, word count within target), SEO (primary keyword in first 100 words, H2/H3 search-shaped, meta description compelling), GEO (definition anchor quotable and self-contained, FAQ block present if scope warrants), citations (every framework reference cited; no invented quotes; quote-integrity verified), funnel (single formation invitation CTA, internal links to cluster/pillar/pathway/course in place).
>
> Output the audit report alongside the draft. Flag any failures. Iterate on the draft until all six dimensions pass.
>
> Phase 5 — Editor pass. Human editor reads the audited draft. Editor checks for argument coherence (does the reasoning hold?), factual accuracy (do the historical and biblical claims check out?), the "would Alan say this?" question (does each paragraph sound like Alan rather than like a careful student of Alan?). Editor returns the draft to Phase 3 if substantive revisions are needed; otherwise advances to Phase 6.
>
> Phase 6 — Alan-ratification. Alan reads the editor-approved draft. Alan's edits are incorporated; if Alan's edits are substantial, the draft returns to audit (Phase 4) before publication. When Alan approves the final draft, the artifact advances to publication.
>
> Phase 7 — Publication. Producer publishes to the platform. Citation footnote registry updated. Internal links from cluster and pillar articles updated to point to the new pillar. Pathway and course companions updated. Sitemap regenerated. Article appears at `/articles/[SLUG]`.

**Expected outputs.** A published pillar tier-1 article meeting all six audit dimensions, ratified by Alan, integrated into the platform's linking topology.

**Handoff and ratification path.** Producer-led publication only after Alan-ratification. No exceptions. The editor and producer roles may move the artifact through Phases 1–5 without Alan, but Phases 6 and 7 require Alan's explicit approval, captured in a written sign-off attached to the artifact record.

## 5.2 Cluster tier-2 article production prompt

**Inputs required.**
- Cluster slug
- Parent pillar slug (which pillar this cluster belongs to)
- Working title
- Specific subtopic the cluster article addresses within the pillar's territory
- Primary corpus draws
- Target word count (typically 2,500–3,500)

**Skills invoked.** Same chain as 5.1, scoped to a cluster's word count and depth.

**The prompt.**

> Produce a cluster tier-2 article for the Alan Hirsch platform on **[SUBTOPIC]**, within Pillar **[PARENT PILLAR]**, working title **[TITLE]**.
>
> Run the full pipeline from 5.1 (Phases 1–7), with these scope modifications:
>
> - Target word count: **[WORD COUNT — typically 2,500–3,500]**.
> - The article addresses a specific subtopic within the parent pillar's territory; it deepens the pillar's argument in one direction rather than treating the pillar comprehensively.
> - Internal links: link upward to the parent pillar tier-1 article; link laterally to at least two other cluster articles within the same pillar's cluster.
> - Voice fidelity rules apply unchanged. Audit dimensions apply unchanged.
> - The formation invitation CTA points to the companion pathway, not directly to a course (cluster articles serve the path-curious reader; the pillar article serves the framework-curious reader).
>
> The cluster article must read as a substantive entry in its own right, not as a thin extension of the pillar. A reader who lands on the cluster article without having read the pillar should be able to engage substantively with the subtopic; the cluster article carries the necessary framing internally rather than depending on the pillar to do its work.

**Expected outputs.** A published cluster article, linked to its pillar and to peer clusters, ratified by Alan.

**Handoff and ratification path.** Same as 5.1.

## 5.3 Long-tail tier-3 article production prompt

**Inputs required.**
- Article slug
- Cluster and pillar it relates to
- Reader question the article responds to (long-tail articles are search-discovered; the reader's actual question shapes the article)
- Working title
- Primary corpus draws (typically lighter than for pillars or clusters; long-tail articles may draw from a single source)
- Target word count (typically 1,500–2,500)

**Skills invoked.** Same chain as 5.1, scoped.

**The prompt.**

> Produce a long-tail tier-3 article for the Alan Hirsch platform addressing the reader question: **[QUESTION]**.
>
> Related cluster: **[CLUSTER SLUG]**. Related pillar: **[PILLAR SLUG]**.
>
> Run the full pipeline from 5.1 (Phases 1–7), with these scope modifications:
>
> - Target word count: **[WORD COUNT — typically 1,500–2,500]**.
> - The article responds directly to the reader's question stated in the prompt above. The opening hook acknowledges the question and signals that the article will treat it seriously.
> - Internal links: link upward to the cluster and pillar; link to the relevant pathway if the question is formation-adjacent.
> - The article's nine-section architecture may be simplified — sections 3 (why this matters) and 4 (core teaching) may merge for long-tail scope; section 5 (misunderstandings) may be optional if the subtopic does not warrant it; section 7 (practice) remains essential.
> - Voice fidelity rules apply unchanged.
>
> Long-tail articles serve readers who arrive via search with a specific question. They are the platform's front door for new readers; they must convert the new reader's specific search intent into a meaningful first encounter with Alan's voice and frameworks.

**Expected outputs.** A published long-tail article ratified by Alan and integrated into the linking topology.

**Handoff and ratification path.** For long-tail articles specifically: Alan-ratification may be batched (multiple long-tails reviewed together) rather than per-article, but no long-tail article publishes without Alan's written approval.

## 5.4 Teaching essay production prompt

**Inputs required.**
- Essay slug
- Year (essays are archived by year)
- The question or development the essay responds to (essays earn their existence by responding to a real contemporary question or by expanding an existing framework)
- Primary corpus draws plus any contemporary references
- Target word count (typically 3,000–5,000)

**Skills invoked.** Custom plan → modified `article-author` → `article-audit` (modified for essay scope) → Alan substantial draft pass.

**The prompt.**

> Produce a teaching essay for the Alan Hirsch platform on **[QUESTION OR DEVELOPMENT]**, for publication at `/essays/[YEAR]/[SLUG]`.
>
> Teaching essays differ from pillar articles in that they typically respond to a contemporary question, expand on existing frameworks based on new developments, or open territory in Alan's thinking that may eventually warrant pillar-level treatment. Voice fidelity rules apply unchanged. Corpus-grounding rules apply unchanged. The architecture is modified.
>
> Phase 1 — Plan. Articulate the essay's central question or development. Identify what is at stake — why this essay needs to exist now, what existing material it complements or extends, what the reader will be able to do or see after reading. Identify the corpus sources and any contemporary references that ground the essay. Identify the formation invitation: which pathway, course, or pillar does the essay gesture toward? Output the plan as a brief for review.
>
> Phase 2 — Draft. Produce the essay following a modified seven-section architecture:
>
> 1. **Opening.** A specific moment, question, or observation that grounds the essay's purpose. Not a generic introduction; a concrete entry point.
> 2. **The framing.** What is at stake. Why this essay matters now. The reader's likely position and the move the essay invites.
> 3. **The substantive argument.** The essay's core work. Multi-section H2/H3 structure if scope warrants. Corpus citations integrated. Imagery and theological depth foregrounded.
> 4. **The development.** Where Alan's thinking has moved on this question — what has changed, what has clarified, what new connections have emerged.
> 5. **The application.** What this means for practitioners now. Specific, embodied, time-bounded.
> 6. **The connection.** How this essay relates to the pillar architecture, the pathways, the courses. Internal links.
> 7. **The invitation.** A single formation invitation — to a pathway, course, conversation, or specific practice.
>
> Target word count: **[WORD COUNT — typically 3,000–5,000]**.
>
> Voice fidelity: five markers, antithesis prohibition, AI-cadence prohibition. Essays often run more rhetorically dense than pillar articles — sentence length variation may favor longer sentences; imagery may be more concentrated.
>
> Phase 3 — Audit. Run a modified audit. The six dimensions apply with these adjustments: architecture audits the seven-section essay structure rather than the nine-section article structure; SEO audit is lighter (essays are not primarily search surfaces); GEO audit remains (essays often serve as quotable substantive references for AI systems); citations audit remains in full force; funnel audit remains.
>
> Phase 4 — Alan substantial draft pass. Teaching essays warrant Alan's substantive editorial pass before publication — not just ratification. Alan reads the draft and makes any edits, additions, or restructurings he sees. The post-Alan version is what publishes.
>
> Phase 5 — Publication. Producer publishes. Essay archive index updated. Linking topology updated.

**Expected outputs.** A published teaching essay carrying Alan's substantive editorial mark, archived by year.

**Handoff and ratification path.** Teaching essays are the artifact type where Alan's hand is most visible. Editor produces a strong draft; Alan substantively edits; producer publishes. The intermediate audit and editorial review apply but are designed to make Alan's editorial work efficient, not to substitute for it.

## 5.5 Pathway production prompt

**Inputs required.**
- Pathway slug
- The reframing question that organizes the pathway (the disturbance that opens the formation work)
- Companion pillar (which pillar the pathway formation-companions)
- Primary corpus draws
- AI Lab conversation agent configuration (the voice configuration tuned to this pathway's specific question)

**Skills invoked.** Pathway design (the twelve-section narrative from `docs/articles/05`) → `pathway-author` (the code-level twelve-block model) → `pathway-audit` → human editor pass → Alan-ratification → AI Lab agent configuration.

**The prompt.**

> Produce a canonical pathway for the Alan Hirsch platform with reframing question: **[REFRAMING QUESTION]**.
>
> Pathway slug: **[SLUG]**. Companion pillar: **[PILLAR]**. Primary corpus: **[CORPUS DRAWS]**.
>
> Phase 1 — Pathway design. Articulate the twelve-section narrative per `docs/articles/05-formation-journeys-the-pathway-architecture.md`. The twelve sections (canonical order):
>
> 1. **Hero / provocation.** Opens with the reframing question. Voice forward. Names what is at stake.
> 2. **Overview.** What this pathway is, what it asks of the reader, what the reader will be able to do or see at the end.
> 3. **The model / framework.** The substantive intellectual content the pathway is built around (typically a framework from the companion pillar).
> 4. **The scripture thread.** The biblical material that grounds the pathway's claims. Substantive engagement, not proof-texting.
> 5. **The historical context.** Why this pathway matters at this cultural moment. Specific historical parallels.
> 6. **The cases.** Concrete narrative witnesses — people, communities, movements that have walked something like this path.
> 7. **The practices.** What the reader is invited to do. Specific, embodied, time-bounded.
> 8. **The curated resources.** Pointers into the corpus, the pillar articles, related material outside the platform that the reader should know.
> 9. **The AI Lab.** An invitation to conversation with the pathway's AI agent. The agent's voice is configured to hold the pathway's specific question without resolving it prematurely.
> 10. **FAQs.** Common questions readers ask at this point in the pathway, answered substantively.
> 11. **Distortion warnings.** What this pathway is not. The cheap or misleading versions the reader might encounter elsewhere.
> 12. **Invitation.** The next step — pathway-to-course transition, pathway-to-cohort transition, or pathway-to-deeper-pathway transition.
>
> Output the twelve-section narrative outline as a markdown document for review.
>
> Phase 2 — Code-level authoring. Run `.claude/skills/pathway-author/SKILL.md` to produce the code-level twelve-block content file at `src/lib/content/pathways/[SLUG].ts`. The code-level block model maps to the narrative sections (the skill specification names the mapping); follow the skill's mapping exactly. The twelve code blocks are grouped into four groups (Understand → Examine → Apply → Go deeper) per the skill specification.
>
> Phase 3 — Voice and corpus integration. Each section's content drafted in Alan's voice with corpus citations. The five voice markers apply unchanged. The corpus-grounding rules apply unchanged. The antithesis prohibition applies. The AI-cadence prohibition applies. Pathways are read by formation-seeking readers; voice fidelity matters especially in the hero, the practices, and the invitation sections.
>
> Phase 4 — Audit. Run `.claude/skills/pathway-audit/SKILL.md`. The audit covers the twelve-section architecture, SEO and GEO surfaces, voice fidelity, and the integration of the pathway into the platform's linking topology.
>
> Phase 5 — Editor pass. Human editor reads the audited pathway for narrative coherence — does the pathway actually take the reader somewhere? Is the formation arc real or merely structural? Are the practices specific enough to be embodied? Editor returns the pathway to Phase 3 if needed; otherwise advances.
>
> Phase 6 — Alan-ratification. Alan walks the pathway. Alan's edits are incorporated. Alan must be able to say "this is a path I would put a serious practitioner on" before the pathway advances to publication.
>
> Phase 7 — AI Lab agent configuration. Configure the AI Lab conversation agent for this pathway. Voice configuration per `.claude/skills/alan-voice/SKILL.md`. Corpus access bounded to the pathway's primary corpus draws and the companion pillar. The agent's behavior is tuned to *hold* the pathway's reframing question rather than to resolve it. Specific prompts at strategic points along the pathway invite the reader into conversation with the agent. Sample conversations are voice-audited before the agent is deployed.
>
> Phase 8 — Publication. Producer publishes the pathway at `/pathways/[SLUG]`. Linking topology updated: companion pillar links forward to the pathway; related cluster articles link to the pathway; the home page (if appropriate) links to the pathway as a current entry point.

**Expected outputs.** A published pathway with twelve substantive sections, ratified by Alan, with the AI Lab agent deployed and voice-audited.

**Handoff and ratification path.** Pathway production is more involved than article production. Plan on 4–6 weeks per pathway. Alan's ratification at Phase 6 is the longest-lead gate; the editor and producer should pace earlier phases to give Alan adequate time to walk the pathway before approval is requested.

## 5.6 Course week production prompt

**Inputs required.**
- Course slug
- Week number (1–8)
- Week topic (which mDNA element, which APEST gift, etc. — tied to the eight-week scaffold for the specific course)
- Primary corpus draws for the week
- Dissonance question the week opens with
- Action and reflection prompts for the week

**Skills invoked.** Course-thesis-and-scaffold (course-level prerequisite; see 5.7 below) → `course-author` for the specific week → `course-ingest` for publication.

**The prompt.**

> Produce Week **[N]** of **[COURSE TITLE]** for the Alan Hirsch platform.
>
> Week topic: **[TOPIC]**. Corpus draws: **[CORPUS]**. Dissonance question: **[QUESTION]**.
>
> Run `.claude/skills/course-author/SKILL.md` per its specification. The week's six section types:
>
> 1. **Opening video script (~5 minutes spoken).** Frames the week. Does not repeat the reading. Voice-forward — this is Alan speaking directly to cohort participants. The script names what is at stake in the week's topic and what the participant will be doing.
>
> 2. **Dissonance prompt (`chat_dissonance`).** AI companion conversation prompt. Holds tension and a question. *Does not resolve prematurely.* The dissonance prompt is the week's central pedagogical move; it cannot be skipped or softened.
>
> 3. **Main teaching reading.** 2,000–3,500 words. Hook → framework → scripture → implications structure. Corpus quotes integrated with attribution. The reading is original article-grade content, not a republished book chapter; it serves the week's specific pedagogical purpose. Voice fidelity rules apply unchanged. The reading carries blockquotes from the corpus and a final **Sources:** line listing every cited work.
>
> 4. **Case study.** A concrete narrative witness — a person, community, or movement that has lived the week's framework. Specific, named where possible, dated where possible. The case study makes the abstract concrete.
>
> 5. **Action prompts.** Time-boxed, embodied, with social accountability cues. The participant is invited to do something specific this week — a conversation to have, a practice to attempt, a discipline to begin. The action prompts include a structure for engaging at least one other person.
>
> 6. **Reflection prompts.** What the participant carries from the week's action into the next week. Structured questions, not journaling-for-its-own-sake. The reflection prompts feed into the cohort discussion at the start of next week.
>
> Audit: the teaching reading passes `article-audit` on the six dimensions (treated as a long article for audit purposes). The dissonance prompt is voice-audited for its handling of tension. The action prompts are pedagogy-audited (per the four-necessities filter — does this actually invite embodied practice or just gesture at it?).
>
> Cohort facilitator review: a named cohort facilitator (the human running the week with participants) reviews the week's material before publication and flags anything that will not work in cohort delivery.
>
> Alan-ratification: Alan reads the week's material. Alan's edits incorporated. Alan must approve before the week ingests.
>
> Publication: run `.claude/skills/course-ingest/SKILL.md` to upsert the week into the database per the course manifest and module markdown structure. The week appears in the course's URL structure and is available to enrolled cohort participants on the week's schedule.

**Expected outputs.** A published course week with all six section types, ratified by Alan, integrated into the cohort delivery system.

**Handoff and ratification path.** Course weeks are produced one at a time; the eight weeks of a course are typically produced sequentially over several months, with cohort facilitator feedback from earlier weeks shaping later weeks.

## 5.7 Course-level production prompt

**Inputs required.**
- Course slug
- Course thesis (the central claim or formation the course is built around)
- Eight-week arc (which framework dimension or element each week treats)
- Course's relationship to pillars and pathways

**Skills invoked.** Course thesis articulation → eight-week scaffold per `docs/articles/04` → week-by-week production via 5.6 → cohort facilitator training → publication.

**The prompt.**

> Produce **[COURSE TITLE]** for the Alan Hirsch platform.
>
> Course thesis: **[THESIS]**.
>
> Phase 1 — Thesis and scaffold. Articulate the course's central thesis — the formation the course is built around. Identify the eight-week arc per `docs/articles/04-the-eight-week-formation-scaffold.md`: Week 1 orientation; Weeks 2–7 one framework dimension per week with full four-necessities loop; Week 8 synthesis and commissioning. For each week, name the framework dimension treated, the dissonance question, the central practice, the reflection focus, and the cohort dynamic.
>
> Phase 2 — Course architecture document. Produce a course architecture document at `_docs/courses/[COURSE-SLUG]/architecture.md` (or repo equivalent) naming all eight weeks with their thesis, dissonance question, action focus, and reflection prompt. The architecture document is the course's editorial spine; every week is produced against it.
>
> Phase 3 — Week-by-week production. Run 5.6 for each of the eight weeks, in order. Each week's production may overlap with the next, but no week ingests until Alan has ratified it.
>
> Phase 4 — Cohort facilitator training. The named cohort facilitator(s) read the full course architecture and all eight weeks. The facilitator's training covers: the four-necessities pedagogy and how to enforce it in cohort discussion; the voice expectations (the facilitator carries Alan's voice in cohort spaces); the handling of dissonance prompts (do not resolve prematurely); the rhythm of weekly action-and-reflection; the integration of AI conversation agents in dissonance and action sections.
>
> Phase 5 — First cohort run. The course runs with a named first cohort. Participant feedback is gathered systematically (weekly reflection notes, mid-course check-in, exit interview). The cohort facilitator surfaces revision needs to the editor and Alan.
>
> Phase 6 — Course revision. After the first cohort completes, the course is revised based on participant feedback. Specific weeks may be rewritten; the dissonance prompts may be adjusted; the action prompts may be sharpened. The revised course is what subsequent cohorts encounter.

**Expected outputs.** A published, cohort-tested course at the platform's standard, refined after first-cohort feedback.

**Handoff and ratification path.** Course production runs over several months. Alan ratifies the architecture document, each week, and the post-first-cohort revision. Cohort facilitators ratify the cohort experience.

## 5.8 Newsletter issue production prompt

**Inputs required.**
- Issue date
- Central idea or question for the issue
- The platform surface(s) the issue points readers toward
- Length target (typically 600–1,200 words)

**Skills invoked.** Custom prompt (the Newsletter is too lightweight to require a full skill orchestration) → editor pass → Alan-ratification.

**The prompt.**

> Produce Newsletter issue dated **[DATE]** for the Alan Hirsch platform.
>
> Central idea: **[IDEA]**. Pointing readers toward: **[SURFACE]**. Length target: **[WORD COUNT — typically 600–1,200]**.
>
> The Newsletter is biweekly correspondence to the broad reader list. It is substantive, voice-faithful, and organized around a single idea or question. Each issue makes one move — names one observation, opens one question, develops one connection — and points the reader toward a specific platform surface (a pillar article, a pathway, an essay, a course enrollment opportunity) without becoming promotional.
>
> Structure: opening (the specific moment, observation, or question that grounds the issue); the move (the development of the idea); the connection (what this means for the reader); the invitation (the specific platform surface the issue points toward). No bullet lists. No SaaS-newsletter rhythm. The issue reads as a letter from Alan to a serious reader, not as an email blast.
>
> Voice fidelity: five markers, antithesis prohibition, AI-cadence prohibition. Sentence-length variation. At least one substantive image or metaphor. At least one concrete moment — biblical, autobiographical, contemporary, or historical.
>
> Audit: lightweight voice audit (the five markers must be present; the prohibitions must be honored). No formal `article-audit` run; the Newsletter's scope does not warrant the full six-dimension audit.
>
> Editor pass: a human editor reads the issue. Editor checks for voice fidelity, argument coherence, the invitation's specificity, and the "would Alan say this?" question.
>
> Alan-ratification: Alan reads the issue. Alan's edits incorporated. Alan must approve before the issue sends.
>
> Send: the producer schedules the issue for the biweekly send. The issue is also published to the Newsletter archive at `/newsletter/[ISSUE-SLUG]` for permanent reference.

**Expected outputs.** A published Newsletter issue, sent to subscribers, archived to the platform.

**Handoff and ratification path.** Newsletter production runs on a tight cadence (biweekly). Editor produces the draft 3–5 days before send; Alan ratifies 1–2 days before send; producer schedules the send.

## 5.9 Field Letter production prompt

**Inputs required.**
- Quarter (the Field Letter is quarterly)
- Central question, development, or honest internal observation
- Length target (typically 1,500–3,000 words)

**Skills invoked.** Custom prompt → editor pass → Alan substantial draft pass.

**The prompt.**

> Produce the Field Letter for **[QUARTER]** for the Alan Hirsch platform.
>
> The Field Letter is quarterly correspondence to active Movement Leaders and current cohort participants only. It is more insider in register than the Newsletter — it assumes the reader is doing the work, not encountering it for the first time. It may be longer, more candid about challenges and developments, and may include material that would not yet be ready for the public Newsletter.
>
> Central question or development: **[FOCUS]**. Length target: **[WORD COUNT — typically 1,500–3,000]**.
>
> Structure (more flexible than the Newsletter — Alan may substantively shape this):
> - An opening that names what is on Alan's mind at this point in the year.
> - A substantive development — where his thinking has moved, what he is reading, what he is seeing in the field that matters.
> - A practitioner-specific section — what this means for those actively doing the work the platform teaches.
> - An invitation to specific reflection, action, or conversation that fits the Field Letter's insider register.
>
> Voice fidelity: five markers, antithesis prohibition, AI-cadence prohibition. The Field Letter often runs more candid than other surfaces — Alan may share specific observations, name specific concerns, or describe specific developments in his thinking that would not yet be ready for broader publication.
>
> Editor pass: editor produces the substantive draft. Editor flags any place where the Field Letter's insider register may cross into territory Alan would not yet say publicly.
>
> Alan substantial draft pass: Alan reads the editor's draft and substantively edits. The Field Letter is the surface where Alan's hand is most visible. The published version carries Alan's editorial mark — additions, restructurings, removals — not just his ratification.
>
> Send: the producer sends the Field Letter to the active Movement Leaders list and current cohort participants. The Field Letter is *not* published to the public archive; it is correspondence, not content.

**Expected outputs.** A sent Field Letter carrying Alan's substantive editorial work.

**Handoff and ratification path.** Field Letter production runs on a quarterly cadence. Alan's substantive pass is non-negotiable; the editor's draft is the starting point, not the final version.

## 5.10 Corpus ingestion prompt (book)

**Inputs required.**
- Book title and slug
- Source file (MDX or markdown of the book's content, with appropriate rights)
- Target ingestion depth (full chapter-level, chapter summaries plus key passages, or excerpt-only)

**Skills invoked.** Custom pipeline per `docs/articles/HOW_MOVEMENTAL_USES_AI.md`.

**The prompt.**

> Ingest **[BOOK TITLE]** to the Alan Hirsch platform corpus at depth **[FULL / SUMMARY+KEY / EXCERPT]**.
>
> Phase 1 — Source preparation. Receive the book's source file. Verify the rights to publish the depth of ingestion target. (For most Alan books, full chapter-level ingestion requires publisher coordination; verify before proceeding.)
>
> Phase 2 — Chapter parsing. Parse the book into chapter-level records per the schema in `src/lib/database/schema.ts` (or repo equivalent). Each chapter record includes: chapter number, chapter title, full content (if full ingestion), summary (if summary-plus-key), key passages (always — at least three substantive passages per chapter), frameworks introduced (any framework or concept that first appears or is most fully developed in this chapter), and the chapter's relationship to the pillar architecture.
>
> Phase 3 — Framework registration. For each framework introduced or developed in the book, register the framework in the corpus framework index with its canonical citation (book, chapter, page if available). The framework index is what enables corpus-grounded article production: when an `article-author` skill references a framework, the framework index provides the canonical citation.
>
> Phase 4 — Pillar tagging. Tag each chapter with the pillar(s) it relates to per the pillar architecture in Part 3.1 of this manual. Multi-pillar tagging is acceptable when warranted.
>
> Phase 5 — Citation registry update. Update the citations and footnotes registry at `src/lib/citations/` to include the new book's chapter-level entries. Every chapter is now citable from articles.
>
> Phase 6 — Search index. Update the platform's search index to include the new corpus material. Verify that searches for framework names, key passages, and chapter titles return the ingested book.
>
> Phase 7 — Corpus index update. The corpus index at `/corpus` displays the newly ingested book with its ingestion status, pillar tagging, and links to chapter records.
>
> Phase 8 — Producer review. The producer verifies that every step has completed cleanly. Any chapter that did not ingest correctly is reported and re-processed.
>
> Phase 9 — Alan inventory ratification. Alan does not need to read every chapter (he wrote them), but he ratifies the inventory: the book is in the corpus at the depth claimed, the framework registrations are correct, the pillar tagging is accurate.

**Expected outputs.** A book fully (or partially, per target depth) ingested into the platform corpus, available for citation in articles, available in search, displayed in the corpus index.

**Handoff and ratification path.** Producer-led with Alan inventory ratification. The producer may run multiple ingestions in parallel; Alan ratifies as inventory is presented.

## 5.11 AI conversation agent production prompt

**Inputs required.**
- Deployment context (which pathway, course week, or article formation invitation the agent serves)
- The agent's specific question or tension (the formation question the agent holds)
- Corpus access boundaries (which corpus material the agent draws from)
- Voice configuration (the specific Alan-voice constraints for this agent)

**Skills invoked.** `.claude/skills/alan-voice/SKILL.md` for voice configuration → custom prompt for behavioral configuration → voice audit on sample conversations.

**The prompt.**

> Configure an AI conversation agent for the Alan Hirsch platform deployed at **[DEPLOYMENT CONTEXT]**.
>
> The agent's question: **[QUESTION]**. Corpus access: **[CORPUS BOUNDARIES]**.
>
> Phase 1 — Voice configuration. Apply `.claude/skills/alan-voice/SKILL.md` as the agent's voice constitution. The five voice markers, the antithesis prohibition, the AI-cadence prohibition, and the corpus-grounding rule all apply to the agent's outputs.
>
> Phase 2 — Behavioral configuration. The agent's behavior at this deployment context is governed by these rules:
>
> 1. The agent holds the deployment context's question; it does not resolve the question prematurely. If the user asks for resolution, the agent reflects the question back in a richer form, draws on corpus material that complicates the user's framing, and invites the user to sit with the tension.
> 2. The agent's corpus access is bounded to the materials named in **[CORPUS BOUNDARIES]**. The agent does not draw from corpus material outside these bounds.
> 3. The agent does not invent quotes. Every quotation from Alan is real, sourced from the bounded corpus, and citable.
> 4. The agent does not make claims about Alan's positions that the corpus does not support. When the user asks "what does Alan think about X" and X is not in the bounded corpus, the agent acknowledges the limit and points the user toward the relevant pillar or essay where the question is treated more fully.
> 5. The agent does not pretend to be Alan. It speaks *in* Alan's voice — drawing from the corpus, expressing positions Alan has expressed — but it is clear that it is an AI assistant trained on the corpus, not Alan himself.
> 6. The agent points users back to the platform's substantive surfaces (pillars, pathways, courses) where deeper engagement is possible.
>
> Phase 3 — Sample conversation generation. Generate at least five sample conversations covering the range of user questions the deployment context will surface. Sample conversations are voice-audited per `.claude/skills/article-audit/SKILL.md` (voice dimension only) and pedagogy-audited (does the agent hold dissonance? does it refuse premature resolution?).
>
> Phase 4 — Alan review of sample conversations. Alan reads the sample conversations. Alan's edits to agent behavior are incorporated. Alan must approve the agent's voice and behavior before deployment.
>
> Phase 5 — Deployment. The agent is deployed at the named context. The deployment is monitored: the producer reviews a random sample of real user conversations weekly for the first month, monthly thereafter, surfacing any voice drift or behavioral failure to the editor and Alan.

**Expected outputs.** A deployed AI conversation agent at the named context, voice-audited, behaviorally configured, monitored for drift.

**Handoff and ratification path.** Voice-config owner produces the agent configuration; Alan ratifies sample conversations; producer deploys and monitors. Voice drift detected at any point returns the agent to Phase 2 reconfiguration.

## 5.12 Voice audit meta-prompt

**Inputs required.**
- Artifact to audit (article, pathway section, course week reading, newsletter issue, Field Letter draft, agent conversation transcript)

**Skills invoked.** `.claude/skills/article-audit/SKILL.md` voice dimension + `.claude/skills/alan-voice/SKILL.md` + the five-marker rubric from `docs/articles/02`.

**The prompt.**

> Run a voice audit against the attached artifact for the Alan Hirsch platform.
>
> The audit covers four dimensions:
>
> 1. **Five-marker score.** Score the artifact on each of the five voice markers (Christocentric, Prophetic, Pastoral, Imagery, Theological depth). Each marker is scored 0–3 per the rubric in `.claude/skills/article-audit/SKILL.md` (0 = absent or harmful; 1 = weak; 2 = present and adequate; 3 = strong). The artifact passes if the combined score is at or above the threshold defined in the audit skill for its artifact type.
>
> 2. **Antithesis prohibition.** Identify any place where the argument proceeds primarily via "not X, but Y" construction. Cheap antithesis is a failure. Expansion (taking the reader's expectation and showing what is larger) is the correct move. Flag any antithesis-as-primary-move passages with specific line references.
>
> 3. **AI-cadence prohibition.** Identify any AI-drafting patterns: reflexive lists of three; parallel structure used as a tic; "not just X, but also Y, and Z" constructions; bullet-point pedagogy where prose would do; em-dash-comma rhythm; sentence-length monotony; "as we shall see" / "as I will argue" gestures. Flag every instance with specific line references.
>
> 4. **The "would Alan say this?" judgment.** For each paragraph, judge whether Alan would actually say what the paragraph says — not whether it is true, but whether it is *his*. Flag paragraphs where the answer is no, with specific reasoning.
>
> Output: a report listing each dimension's findings, with specific line references for every flag. The artifact passes when the five-marker score meets the threshold, no antithesis-as-primary-move passages are flagged, no more than two AI-cadence patterns are flagged, and no more than three "would Alan say this?" flags are returned.
>
> The artifact does not advance to publication until the voice audit passes. Flagged passages return to drafting for revision.

**Expected outputs.** A voice audit report with specific findings and line references; a pass/fail call.

**Handoff and ratification path.** Voice audit is a gate, not a step. Artifacts that fail the audit return to drafting. Auditors are trained on the rubric and have authority to fail an artifact regardless of editorial pressure.

## 5.13 Pedagogy audit meta-prompt

**Inputs required.**
- Artifact to audit (any artifact type, but most consequential for articles, pathways, and course weeks)

**Skills invoked.** Custom prompt (the four-necessities pedagogy filter from `docs/articles/03`).

**The prompt.**

> Run a pedagogy audit against the attached artifact for the Alan Hirsch platform.
>
> The audit asks four questions, one per necessity:
>
> 1. **Where is the dissonance?** What does this artifact ask the reader to see differently? What categories does it disturb? Point to the specific passage(s) where dissonance is created. If no passage creates dissonance, flag the artifact as pedagogy-incomplete.
>
> 2. **What is the action?** What specific, embodied, time-bounded thing does this artifact ask the reader to do? Generic "consider this" gestures are not action. Point to the specific invitation. If no specific action is named, flag the artifact as pedagogy-incomplete.
>
> 3. **What is the reflection structure?** How does the reader process what happened when they acted? Is the reflection a structured question (good), a journaling gesture (weak), or absent (failure)? Point to the reflection structure.
>
> 4. **Where is community gestured at?** How does this artifact point the reader toward others doing the same work? Specific cohort invitation? Reference to others on the same path? Encouragement to find a conversation partner? Point to the community gesture.
>
> Scope adjustments:
> - Pillar tier-1 articles: all four necessities present in substantive form.
> - Cluster tier-2 articles: at least three necessities present; the fourth may be lighter.
> - Long-tail tier-3 articles: at least two necessities present; dissonance and action are essential.
> - Pathways: all four necessities present in strong form; community gesture is concrete (specific cohort, specific practice partnership).
> - Course weeks: all four necessities present in strong form; this is the artifact type where pedagogy is most load-bearing.
> - Newsletters and Field Letters: at least dissonance and invitation (which serves as action) present; reflection and community may be implicit.
>
> Output: a report listing each necessity's findings. The artifact passes when its scope-adjusted threshold is met. Artifacts that fail return to drafting for pedagogy work.

**Expected outputs.** A pedagogy audit report with specific findings; a pass/fail call.

**Handoff and ratification path.** Pedagogy audit is a gate. Artifacts that fail return to drafting. The pedagogy filter is enforced by the editor at the editorially-reviewed state.

## 5.14 EEAT and linking audit meta-prompt

**Inputs required.**
- Audit scope (full platform, single pillar's cluster, single pathway and its surroundings)
- Audit frequency (quarterly by default; on-demand when significant content has been added or restructured)

**Skills invoked.** Custom prompt per `docs/articles/LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md`.

**The prompt.**

> Run an EEAT and linking audit against **[SCOPE]** of the Alan Hirsch platform.
>
> The audit covers six dimensions:
>
> 1. **Internal linking topology.** For every article in scope: does it link upward to its cluster and pillar? Does it link laterally to at least the minimum number of peer articles per the EEAT/GEO playbook? Are the link anchors descriptive and search-shaped, or generic? Flag every article with topology deficiencies.
>
> 2. **Orphan detection.** Identify any article, pathway, course, or corpus surface that has no inbound internal links from other platform surfaces. Orphans are a topology failure and an EEAT signal weakness.
>
> 3. **Citation health.** For every article in scope: does every `Cite` component resolve to an entry in the `/footnotes` registry? Are there broken citation pills? Are citations distributed evenly through the article or clustered at the end? Flag every citation-health issue.
>
> 4. **Outbound link quality.** For every article in scope: are external links going to authoritative sources (academic publications, recognized institutions, primary sources) or to generic web references? Flag low-quality outbound links.
>
> 5. **Pillar/cluster integrity.** Does each cluster article actually deepen its pillar in a specific direction, or has it drifted into general territory? Does the pillar architecture still cohere? Flag any cluster article whose subtopic has drifted from its pillar.
>
> 6. **EEAT signal currency.** Are the endorsements, citations, and speaking records current? Has anything significant happened in the past quarter that warrants an update? Flag stale EEAT surfaces.
>
> Output: a report per dimension, with specific findings and refresh recommendations. The report drives a quarterly refresh sprint.

**Expected outputs.** An EEAT and linking audit report; a quarterly refresh plan.

**Handoff and ratification path.** The producer runs the audit. The editor and Alan ratify the refresh plan. The refresh sprint proceeds against the ratified plan.

## 5.15 Onbuilding cohort orchestration prompt

**Inputs required.**
- Onbuilding cohort start date
- Author participating (currently Alan; potentially expandable to other movement leaders later)
- Cohort facilitator(s)

**Skills invoked.** Full orchestration of the four-week onbuilding cohort per `docs/build/notes/onbuilding-4-week-course-SSOT.md`.

**The prompt.**

> Run a four-week onbuilding cohort with **[AUTHOR]** beginning **[START DATE]**.
>
> Phase 1 — Pre-cohort preparation. The author has completed prerequisite materials: a substantial bio, a CV-grade reading list (the corpus inventory), an articulation of the body of work's major frameworks, and a draft of the pillar architecture. The cohort facilitator confirms readiness before Week 1.
>
> Phase 2 — Week 1: Corpus and architecture. Per the SSOT and `docs/articles/07-author-onboarding-course-outline.md` Week 1, the cohort produces: full corpus inventory; pillar/cluster strategic map; theme extraction; structural map sufficient to launch (not the full long-tail library). Cohort deliverable at end of Week 1: a strategic map ratified by the author and facilitator.
>
> Phase 3 — Week 2: Articles. Per SSOT Week 2: minimum one Tier-1 pillar article and one Tier-2 cluster article in production. Pipeline: corpus → ingest → draft → human edit → audit → ratify → publish. By end of Week 2: at least one pillar article published; at least one cluster article published; the article production pipeline working in the live platform.
>
> Phase 4 — Week 3: Course week. Per SSOT Week 3: one full course week drafted (opening video script, dissonance prompt, main teaching reading, case study, action and reflection prompts). The course week is publishable — not a placeholder. By end of Week 3: one course week ratified and ingested.
>
> Phase 5 — Week 4: Pathway and launch. Per SSOT Week 4: one canonical pathway live at the twelve-section standard; ecosystem map connecting pillar / cluster / course / pathway; launch checklist completed; commissioning of the author into the live platform. By end of Week 4: the platform is at first-onbuilding-completion readiness (Stage One per Part 1.6).
>
> Phase 6 — Post-cohort transition. The author transitions from cohort to ongoing production. The editor and producer continue producing against the strategic map from Week 1. The facilitator transitions from cohort-leading to advisory. The platform's first-launch sprint (Stage Two — Months 2–4) begins.

**Expected outputs.** A completed four-week onbuilding cohort producing the Stage One readiness threshold — one pillar, one cluster, one course week, one pathway live.

**Handoff and ratification path.** The cohort facilitator runs the four weeks. The author ratifies each week's deliverable. The platform's product owner ratifies the cohort completion and transitions the author into ongoing production.

---

# Part Six — The production schedule

Part Five gave the operational orders for producing each artifact type. Part Six sequences when those orders run. The schedule is staged against the four-stage timeline from Part 1.6, with explicit lists of what gets produced when.

## 6.1 The launch production order (Stage One — Month 1, the onbuilding cohort)

The minimum viable expression of the formation engine. Produced during the four-week onbuilding cohort.

**Articles.**
- Pillar 1 (Missional Church Foundations) tier-1 article — published.
- Pillar 2 (Apostolic Genius and mDNA) tier-1 article — published.
- Pillar 3 (APEST and Fivefold Ministry) tier-1 article — published.
- One cluster tier-2 article per published pillar — three cluster articles total — published.

**Pathways.**
- Pathway One (The mDNA Path) — live at twelve-section standard.

**Courses.**
- Course One Week 1 — drafted and ingested in publishable shape.

**Corpus.**
- *The Forgotten Ways* — full chapter-level ingestion complete.
- Corpus framework index populated with mDNA, APEST, the six elements, and the foundational missional vocabulary.

**Author surfaces.**
- `/about/alan-hirsch` — substantial editorial bio at the standard articulated in Part 2.1, with books, frameworks, network, and Alan's signed-off authorization.

**Endorsements.**
- `/endorsements` — populated with at least eight named practitioners across the four endorser categories (ecclesial leaders, academic figures, movement practitioners, cross-domain endorsers).

**Network visualization.**
- Home credibility fold network visualization — live with at least the named near-network of Brisco, Halter, Woodward, Ford, D. Hirsch, Frost, and immediate peers.

**Newsletter.**
- First two Newsletter issues — produced and sent.

**Connective tissue.**
- `/footnotes` registry populated with all citations from published articles.
- JSON-LD `Person` schema on `/about/alan-hirsch`.
- JSON-LD `Article` schema on every published article.
- Internal linking topology audit passed for all published material.

At the end of Stage One, the platform is at the Stage One readiness threshold — substantively present, voice-faithful, navigable, with the formation engine's first pathway and course week live.

## 6.2 The post-launch sprint (Stage Two — Months 2–4)

Three months of focused production bringing the platform to first-full-launch quality.

**Articles, Month 2.**
- Pillar 4 (Movement and Multiplication) tier-1 article — published.
- Pillar 5 (Discipleship and Christology) tier-1 article — published.
- Two more cluster tier-2 articles for Pillars 1, 2, 3 (one per pillar) — published.

**Articles, Month 3.**
- Pillar 6 (Leadership, Formation, Spiritual Practice) tier-1 article — published.
- Three more cluster tier-2 articles for Pillars 4, 5, 6 (one per pillar) — published.

**Articles, Month 4.**
- Three long-tail tier-3 articles addressing reader questions discovered during onbuilding — published.

**Pathways.**
- Pathway Two (Becoming a Missional Church) — live at Month 2.
- Pathway Three (Discovering Your APEST Vocation) — live at Month 4.

**Courses.**
- Course One — full eight-week arc drafted by Month 4. First cohort scheduled for Month 6.

**Corpus, Month 2.**
- *Apostolic Genius* — full ingestion.
- *The Forgotten Ways Handbook* — full ingestion.

**Corpus, Month 3.**
- *The Shaping of Things to Come* (Hirsch/Frost) — full ingestion.
- *5Q* — full ingestion.
- *The Permanent Revolution* (Hirsch/Catchim) — full ingestion.

**Corpus, Month 4.**
- *ReJesus* (Hirsch/Frost) — full ingestion.
- Talks archive — at least 10 transcribed and excerpted.
- Interviews archive — at least 10 archived.

**Author surfaces, Month 2–4.**
- Co-author pages (Brad Brisco, Lance Ford, Michael Frost, Deb Hirsch, Tim Catchim) — published where co-authorship is significant.
- `/influences` surface — published.
- `/speaking` surface — populated with substantial speaking record.
- `/citations` surface — populated with academic and editorial citations of Alan's work.
- `/interviews` surface — populated with archived interviews.

**Endorsements.**
- Endorsements list expanded to at least 15 named practitioners.

**Newsletter and Field Letter.**
- Newsletter on biweekly cadence — six issues sent across the three months.
- First Field Letter — sent at the end of Month 3.

**Teaching essays.**
- First quarterly teaching essay — published at the end of Month 4.

At the end of Stage Two, the platform is at first-full-launch quality. All six pillar tier-1 articles published. Three pathways live. First course's eight weeks drafted. The substantive content spine is in place.

## 6.3 The year-one order (Stage Three — Months 5–12)

The platform expands and runs its first formation engines.

**Pathways.**
- Pathway Four (Multiplication Foundations) — live by Month 6.
- Pathway Five (Following Jesus into Mission) — live by Month 9.

**Courses.**
- Course One — first cohort run, Months 6–7. First cohort revision, Months 8–9. Second cohort run, Months 10–12.
- Course Two (APEST Formation) — production begins Month 8. Full eight-week arc drafted by Month 12. First cohort scheduled for Year Two.

**Articles, Months 5–12.**
- All Pillars 1–6 cluster sets completed (3+ clusters per pillar, with at least 5 clusters for the most active pillars). Total cluster article count target: 20–25.
- Long-tail articles produced opportunistically — target 15+ long-tails by end of Year One.

**Corpus, Months 5–12.**
- All remaining Alan-authored or Alan-co-authored books from the inventory in Part 3.6 — at least chapter summaries plus key passages.
- Talks archive expanded to 20+ talks.
- Interviews archive expanded to 20+ interviews.

**Teaching essays.**
- Quarterly cadence maintained — three more essays published in Months 6, 9, 12.

**Newsletter and Field Letter.**
- Newsletter on biweekly cadence throughout.
- Field Letters at end of Months 6, 9, 12.

**EEAT audits.**
- Quarterly EEAT and linking audit run at end of Months 6, 9, 12. Refresh sprint at end of each.

**Cohort outcomes.**
- First cohort completion reflection captured (Month 7). Second cohort completion reflection (Month 12). Cohort outcomes shape Course One revision and inform Course Two production.

At the end of Stage Three (Year One), the platform has fully expressed its first formation engine. Five pathways live. One course tested in two cohort runs. The substantive content spine is mature. The platform has earned the right to claim it is doing formation work.

## 6.4 The ongoing cadence (Stage Four — Year Two onward)

After Year One, the platform shifts from production-sprint mode to ongoing-cadence mode. The production targets are:

**Articles.** One new tier-2 cluster or tier-3 long-tail article per pillar per quarter — typically 6 new articles per quarter, 24 per year. Sustained over multiple years, this populates the long-tail library.

**Pathways.** Existing pathways revised annually based on reader feedback and corpus expansion. New pathways added as Alan's body of work expands — typically one new pathway every 18 months.

**Courses.** Course Two ships in Year Two. Course Three in Year Three. The cadence is roughly one new course per year, with each course running 2–3 cohorts per year and being revised between runs.

**Teaching essays.** Quarterly cadence maintained indefinitely — 4 essays per year.

**Newsletter.** Biweekly indefinitely. The Newsletter is the platform's ongoing voice presence; it does not pause.

**Field Letter.** Quarterly indefinitely.

**Corpus.** New corpus material (books, talks, interviews) ingested as it becomes available. The corpus ingestion pipeline is maintained for new material; existing material is re-audited annually for citation health.

**EEAT audits.** Quarterly indefinitely.

## 6.5 The corpus expansion cadence

When Alan publishes new material — a new book, a major talk, a substantive interview — the platform handles it as a coordinated event, not as a routine ingestion.

**On the day the new material publishes:**
- A Newsletter issue announces the publication and points readers to where to find it.
- The home page (if appropriate) is updated to acknowledge the new material.
- The corpus ingestion pipeline (5.10) begins.

**Within two weeks of publication:**
- The new material is fully ingested at the target depth.
- The corpus index reflects the new material.
- The framework index is updated with any new frameworks introduced.
- Pillar tagging is applied.
- The citations registry is updated.

**Within two months of publication:**
- A teaching essay engages substantively with the new material — extending its argument, drawing implications, connecting it to the existing pillar architecture.
- Cluster articles in the relevant pillar(s) are reviewed and updated where the new material warrants revision.
- The pathway companion(s) for the relevant pillar(s) are reviewed and updated.

**Within six months of publication:**
- If the new material substantively expands an existing framework, the relevant pillar tier-1 article is revised to incorporate the development, with the revision noted in the article's changelog.
- If the new material introduces a substantively new framework, consideration is given to whether a new pillar is warranted (typically not — new frameworks usually fit within existing pillars — but the question is asked seriously).

The corpus expansion cadence keeps the platform from drifting out of currency with Alan's actual ongoing work.

## 6.6 The maintenance schedule

What gets refreshed when, beyond the quarterly audits.

**Annual reviews.**
- Every pillar tier-1 article — reviewed by Alan and editor; revised if warranted.
- Every pathway — walked by Alan and editor; revised if warranted.
- The author surfaces (`/about/alan-hirsch`, co-author pages, `/influences`, `/speaking`, `/citations`) — refreshed for currency.
- The voice constitution — reviewed for any refinement; updates require Alan's ratification.

**Between-cohort revisions.**
- Each course — revised between cohort runs based on participant feedback.

**As-warranted refreshes.**
- An article when new corpus material substantively affects its argument.
- A pathway when reader feedback surfaces a clear deficiency.
- A pillar tier-1 article when Alan's thinking has substantively developed.
- The home page when new flagship surfaces (a new pillar, a new pathway, a major essay) warrant promotion.

**Continuous maintenance.**
- The citation registry — every new article's citations added on publication.
- The corpus index — every new ingestion reflected immediately.
- The linking topology — internal links updated as new articles publish.
- The endorsements list — added to as new endorsements arrive.

---

# Part Seven — Measurement, drift monitoring, and refresh discipline

The platform does not just produce content; it monitors whether the content is doing the work it claims to do. Part Seven specifies what signals to watch, what drift to detect, and how refresh decisions are made.

## 7.1 Formation signal monitoring

The platform's primary success metric is formation, not traffic. The signals that indicate whether formation is happening:

**Pathway completion.** Of readers who begin a pathway, what proportion complete it? Completion is defined per pathway — typically reaching the eleventh or twelfth section, engaging with the AI Lab, and either signing up for a cohort or moving to the next pathway. Pathway completion below 15% suggests the pathway is too demanding, too unclear, or not actually answering its reframing question well. Completion above 40% suggests the pathway is doing real work.

**Course retention.** Of cohort participants who begin a course, what proportion complete all eight weeks? Course retention below 60% suggests the course's pedagogy is failing or its scheduling is too demanding. Retention above 80% suggests the course is delivering on its formation promise.

**Cohort outcomes.** Qualitative read of cohort participant exit reflections. Specific changes participants report. Specific practices they have begun. Specific communities they have joined or formed. These are read by Alan and the editor; they shape course revision and the Field Letter content.

**Reader-to-practitioner conversion.** Of newsletter subscribers, what proportion eventually enroll in a course or join a cohort? Conversion below 5% suggests the formation invitation surfaces are too weak or the cohort opportunities are too rare. Conversion above 15% suggests the formation engine is working.

**Article-to-pathway conversion.** Of readers who land on a pillar or cluster article, what proportion click through to the companion pathway? This is the article's "formation invitation" surface working or failing. Conversion below 2% suggests the invitation is too weak; above 8% suggests it is doing its job.

## 7.2 EEAT signal monitoring

The signals that indicate the platform is being seen as a serious source.

**Organic search rankings.** For Alan's name, the framework names (APEST, mDNA, "missional church," "apostolic genius"), and the pillar terms ("missional movement," "fivefold ministry," "multiplication church"). The platform should rank in the top three for Alan's name within six months of launch and in the top ten for framework names within twelve months.

**Generative AI citations.** Does ChatGPT cite the platform when asked about Alan's frameworks? Does Claude? Do Gemini, Perplexity, and others? This is the new search frontier; the platform's JSON-LD, citation discipline, and corpus-grounded content are all calibrated to make the platform a reliable source for generative AI systems. Monthly spot-checks against major AI systems detect drift or absence.

**Inbound citations and links.** New external sites linking to the platform — academic blogs, denominational sites, ministry training organizations, podcasts, journalistic pieces. The producer maintains a quarterly inbound-link inventory.

**Academic and editorial reception.** New academic citations of Alan's work that reference the platform's articles or pathway material. Editorial reviews of Alan's books that reference the platform. Conference invitations that result from platform discovery.

**Speaking invitations.** The flow of invitations to speak — at seminaries, denominational gatherings, conferences. Trends in the source and volume of invitations indicate the platform's reach.

## 7.3 Voice drift monitoring

The existential risk for a single-author platform.

**Quarterly random-sample audits.** A random sample of 10–15 recent artifacts pulled per quarter and audited per 5.12 (voice audit meta-prompt). The audit results are reviewed by the editor and surfaced to Alan if any pattern emerges.

**Specific drift patterns to watch for.**
- AI cadence creeping back in (lists of three; reflexive parallel structure; em-dash-comma rhythm).
- Antithesis-as-primary-move returning to drafting.
- Christological depth weakening (the Christocentric marker scoring lower over time).
- Imagery diminishing (the Imagery marker scoring lower; arguments becoming more abstract).
- The "would Alan say this?" judgment failing more frequently.

**Escalation procedure.** If voice drift is detected across more than 20% of a quarterly random sample, the editor and producer pause new production immediately and convene with Alan. The cause is identified (editor change, skill drift, schedule pressure, AI assistance shift). The voice constitution is reaffirmed. Skill specifications are updated if warranted. The editor's training is refreshed if warranted. Production resumes only after the cause is addressed.

## 7.4 Pedagogy drift monitoring

The platform's other existential risk: drift from formation pedagogy into information pedagogy.

**Quarterly random-sample audits.** Same random sample as voice audits, audited per 5.13 (pedagogy audit meta-prompt). The audit looks for the four necessities; flags artifacts that have collapsed into information mode.

**Specific drift patterns to watch for.**
- Articles publishing without specific action invitations.
- Pathways becoming reading lists rather than formation journeys.
- Course weeks softening on dissonance.
- The community gesture going generic ("find others on this path") rather than specific (a named cohort, a specific practice partnership).

**Escalation procedure.** Same as voice drift. Pedagogy is non-negotiable; pause-and-address when drift is detected.

## 7.5 Refresh triggers

What events trigger a refresh of which artifacts.

**A new Alan book or major work.** Triggers the corpus expansion cadence (Part 6.5). Triggers refresh of the relevant pillar tier-1 article(s). Triggers a teaching essay engaging the new material. May trigger pathway revision.

**A new framework contribution or significant development in Alan's thinking.** Triggers refresh of the framework's pillar tier-1 article. Triggers cluster articles where the framework is treated. Triggers a teaching essay. May trigger pathway revision.

**A new endorsement.** Triggers update of the endorsements page.

**A movement leader citing Alan publicly in a significant venue.** Triggers update of the citations and reception record.

**A cohort run completion.** Triggers course revision based on participant feedback.

**A reader feedback pattern.** When multiple readers ask the same question or surface the same difficulty, the editor and producer surface it as a potential refresh trigger — an article that needs reworking, a pathway section that needs sharpening, a course week that needs revision.

**A platform performance signal.** When formation metrics decline (pathway completion drops, course retention drops, conversion drops), the responsible surface is reviewed and refreshed.

## 7.6 The retirement discipline

What gets removed and when.

**Retirement is rare.** The platform's default is to maintain artifacts rather than retire them. Most "retirements" are actually refreshes — the artifact is substantively revised and the prior version is preserved in the changelog.

**True retirement is reserved for:**
- Artifacts that have been superseded by a substantively better treatment that includes the prior material.
- Artifacts that contain positions Alan has publicly revised, where the prior position is no longer something he holds.
- Artifacts that have become factually inaccurate in ways that revision cannot reasonably address.

**Retirement process.**
1. The editor identifies the artifact as a retirement candidate. Justification is documented.
2. Alan ratifies the retirement decision.
3. The artifact is preserved in the archive with an explicit retirement note, the date, the reason, and links to the superseding material.
4. The artifact's URL returns a respectful "this material has been superseded" page with links to the current treatment, rather than a 404.
5. Internal links pointing to the retired artifact are updated to point to the superseding material.

The platform never pretends the prior version did not exist. The intellectual record is preserved.

---

# Part Eight — Appendices

The reference material the manual draws on and the operational tools it uses.

## 8.1 The full surface inventory

This appendix is intended to be maintained as a living artifact. The initial inventory below reflects the Stage One readiness target; subsequent versions reflect Stage Two, Three, and Four states.

| Surface | URL pattern | Primary EEAT layer | Status target — Month 1 | Editorial owner | Last refreshed |
| --- | --- | --- | --- | --- | --- |
| Home | `/` | Trust + Authoritativeness | Live | Alan + PO | — |
| Author bio | `/about/alan-hirsch` | Experience + Expertise | Live | Alan | — |
| Co-author bios | `/about/[slug]` | Authoritativeness | Stage Two | Alan + co-author | — |
| Pillar 1 article | `/articles/missional-church-foundations` | Expertise | Live | Alan + editor | — |
| Pillar 2 article | `/articles/apostolic-genius-mdna` | Expertise | Live | Alan + editor | — |
| Pillar 3 article | `/articles/apest-fivefold-ministry` | Expertise | Live | Alan + editor | — |
| Pillar 4 article | `/articles/movement-multiplication` | Expertise | Stage Two | Alan + editor | — |
| Pillar 5 article | `/articles/christology-discipleship` | Expertise | Stage Two | Alan + editor | — |
| Pillar 6 article | `/articles/leadership-formation` | Expertise | Stage Two | Alan + editor | — |
| Cluster articles | `/articles/[slug]` | Expertise | Stage One (×3), expanding | Editor (Alan ratifies) | — |
| Long-tail articles | `/articles/[slug]` | Expertise | Stage Three | Editor (Alan ratifies) | — |
| Teaching essays | `/essays/[year]/[slug]` | Expertise + Trust | Stage Two (first essay) | Alan | — |
| Pathway One | `/pathways/mdna-path` | Trust (formation) | Live | Alan + editor | — |
| Pathway Two | `/pathways/missional-church` | Trust (formation) | Stage Two | Alan + editor | — |
| Pathway Three | `/pathways/apest-vocation` | Trust (formation) | Stage Two | Alan + editor | — |
| Pathway Four | `/pathways/multiplication` | Trust (formation) | Stage Three | Alan + editor | — |
| Pathway Five | `/pathways/following-jesus` | Trust (formation) | Stage Three | Alan + editor | — |
| Course One | `/courses/forgotten-ways` | Trust (formation) | Stage One (Week 1); Stage Two (full arc) | Alan + course producer | — |
| Course Two | `/courses/apest-formation` | Trust (formation) | Stage Three | Alan + course producer | — |
| Corpus index | `/corpus` | Experience + Expertise | Stage One (partial) | Producer | — |
| Forgotten Ways corpus | `/corpus/books/forgotten-ways` | Experience + Expertise | Live (full ingestion) | Producer | — |
| Other book corpus | `/corpus/books/[slug]` | Experience + Expertise | Stage Two (multiple); Stage Three (full library) | Producer | — |
| Talks archive | `/corpus/talks/[slug]` | Experience | Stage Two (10+) | Producer | — |
| Interviews archive | `/corpus/interviews/[slug]` | Authoritativeness | Stage Two (10+) | Producer | — |
| Endorsements | `/endorsements` | Authoritativeness | Live (8+ entries) | Alan + PO | — |
| Influences | `/influences` | Trust | Stage Two | Alan | — |
| Speaking record | `/speaking` | Authoritativeness | Stage Two | Producer (Alan ratifies) | — |
| Citations record | `/citations` | Authoritativeness | Stage Two | Producer (Alan ratifies) | — |
| Interviews archive page | `/interviews` | Authoritativeness | Stage Two | Producer | — |
| Network visualization | Home component | Authoritativeness | Live | Producer (Alan ratifies) | — |
| Newsletter | `/newsletter` (archive) + send | Trust (cadence) | Live (biweekly) | Editor | — |
| Field Letter | Direct send | Trust (cadence) | Stage Two (quarterly) | Alan + editor | — |
| Footnotes registry | `/footnotes` | Connective | Live (auto-maintained) | Producer | — |
| AI Lab agents | In pathways and courses | Trust (formation) | Stage One (one agent for Pathway One) | Voice-config owner + Alan | — |

## 8.2 Canonical voice samples

Three "this is Alan's voice" examples and three "this is not Alan's voice" examples. The samples are pulled from the corpus and from clear non-Alan content; they form the training material for editors and the reference for voice audits.

**Sample 1: This is Alan's voice.** [Pulled from *The Forgotten Ways* opening — to be inserted by the producer with proper citation. A passage that demonstrates Christocentric thinking, prophetic edge held pastorally, sustained imagery, and theological depth in 200–300 words. The passage is annotated with which voice markers it demonstrates and how.]

**Sample 2: This is Alan's voice.** [Pulled from a recent significant Alan talk transcript — to be inserted by the producer with proper citation. A passage that shows the same voice markers in spoken register rather than written. Annotated.]

**Sample 3: This is Alan's voice.** [Pulled from a recent Alan-authored article — to be inserted by the producer. A passage that shows the same markers in shorter-form written register. Annotated.]

**Sample 4: This is not Alan's voice — AI drift.** [An AI-drafted paragraph treating a missional topic with the AI cadence — lists of three, parallel structure, em-dash-comma rhythm, generic theological gesture. Annotated with the specific failures.]

**Sample 5: This is not Alan's voice — generic ministry-leadership content.** [A paragraph drawn from generic ministry-leadership content (church growth, leadership coaching, etc.) — what the platform must refuse. Annotated with what makes it generic and what makes it not Alan.]

**Sample 6: This is not Alan's voice — apostolic-as-brand.** [A paragraph that uses Alan's vocabulary as personality branding — "apostolic" as identity label, "movement" as marketing term, the framework names without the substantive theological work behind them. Annotated with what makes it brand-talk rather than scholarship.]

(The samples are to be inserted by the producer at platform setup. They are the most important single training artifact for editors and AI agents; their quality determines whether the voice constitution is enforceable.)

## 8.3 The pedagogy glossary

The terminology this manual depends on, with canonical definitions.

**The four necessities.** Dissonance, Action, Reflection, Community. Articulated in `docs/articles/03-transformation-over-information.md`. Every artifact gestures toward all four; substantive artifacts deliver on all four.

- **Dissonance.** Cognitive or theological tension that disturbs the reader's existing categories. Opens the possibility of seeing differently. Not for shock value; for the work the tension enables.
- **Action.** Specific, embodied, time-bounded thing the reader is invited to do. Not "consider this" — actual practice.
- **Reflection.** Structured way to process what happened when the reader acted. Not journaling-for-its-own-sake; the discipline that converts experience into wisdom.
- **Community.** The reader is pointed toward, or actually placed in, a community of others doing the same work. Solitary formation is incomplete.

**The five voice markers.** Christocentric, Prophetic, Pastoral, Imagery, Theological depth. Articulated in `docs/articles/02-the-evergreen-article-architecture.md`. Operationalized in `.claude/skills/article-audit/SKILL.md`. Each marker is scored 0–3 in the audit rubric.

**The nine-section article architecture.** Opening hook, definition anchor, why this matters, core teaching, common misunderstandings, biblical foundation, practice, how this connects, formation invitation. Optional FAQ block. Articulated in `docs/articles/02`; mirrored in `.claude/skills/article-author/SKILL.md`.

**The twelve-section pathway architecture.** Hero/provocation, overview, model/framework, scripture thread, historical context, cases, practices, curated resources, AI Lab, FAQs, distortion warnings, invitation. Articulated in `docs/articles/05`. The code-level twelve-block model in `.claude/skills/pathway-author/SKILL.md` maps these sections to authoring blocks grouped as Understand → Examine → Apply → Go deeper.

**The eight-week course scaffold.** Week 1 orientation; Weeks 2–7 one framework dimension per week with full four-necessities loop; Week 8 synthesis and commissioning. Articulated in `docs/articles/04-the-eight-week-formation-scaffold.md`.

**The six course-week section types.** Opening video script, dissonance chat prompt, main teaching reading, case study, action prompts, reflection prompts. Articulated in `.claude/skills/course-author/SKILL.md`.

**Pillar / cluster / long-tail.** The three article tiers. Pillar = tier 1, definitional, ~4,500–6,000 words. Cluster = tier 2, subtopic deepening, ~2,500–3,500 words. Long-tail = tier 3, specific application or reader question, ~1,500–2,500 words. Articulated in `docs/articles/01-content-strategy-for-movement-leaders.md`.

## 8.4 The framework reference

Alan's canonical frameworks with their originating citations. The framework index in the platform corpus is keyed against this reference.

**APEST (Fivefold Ministry).** Apostolic, Prophetic, Evangelistic, Shepherding, Teaching — Christ's ascension gifts to the church, recovered as the constitutive leadership ecology rather than personality types. Primary source: *5Q* (2017). Earlier developments: *The Permanent Revolution* (2012, with Tim Catchim); *The Forgotten Ways* (2006, "APEST culture" as the third mDNA element).

**mDNA — The Six Elements.** Jesus is Lord; disciple-making; missional-incarnational impulse; APEST culture; organic systems; communitas. The inherited movemental DNA of the church. Primary source: *The Forgotten Ways* (2006). Academic treatment: *Apostolic Genius* (2010).

**The Missio Dei foundation.** The recovery of mission as constitutive of God's own being and therefore of the church's identity. Primary sources: *The Shaping of Things to Come* (2003, with Michael Frost); *The Forgotten Ways* §1.

**Communitas (versus community).** Liminality, ordeal, and shared mission as the conditions of movement-forming relational density. Drawn from Victor Turner; theologically extended by Alan. Primary sources: *The Forgotten Ways*; *The Faith of Leap* (2011, with Michael Frost).

**Apostolic Environments.** The conditions that make movement possible — Christocentricity, missional-incarnational practice, disciple-making rhythms, APEST balance, organic structure, communitas formation. Primary source: *On the Verge* (2011, with Dave Ferguson).

**The four "shifts" of missional movement.** From a Christendom church to a missional church; from a settled ecclesiology to a sent ecclesiology; from a hierarchical leadership structure to an apostolic one; from program-centered ministry to disciple-centered ministry. Primary sources: *The Shaping of Things to Come*; *The Forgotten Ways*.

**The Hebraic versus Hellenistic Christ.** The recovery of Jesus's Hebraic context against Western theological captivity. Primary sources: *ReJesus* (2008, with Michael Frost); *Untamed* (2010, with Deb Hirsch).

**Liminality as movement substrate.** The threshold experience that opens movement formation — communitas, ordeal, shared mission in conditions of cultural displacement. Primary sources: *The Forgotten Ways*; *The Faith of Leap*.

(The framework reference is updated as Alan's work develops. New frameworks introduced in subsequent books are added here, with their originating citations.)

## 8.5 The corpus reference

The full inventory of Alan's published work as the platform's source-of-truth corpus. Maintained as a living document.

**Books (Alan-authored or Alan-co-authored):**

| Title | Year | Co-author(s) | Pillar relevance | Ingestion target | Status |
| --- | --- | --- | --- | --- | --- |
| *The Shaping of Things to Come* | 2003 (rev. 2013) | Michael Frost | Pillar 1, 4 | Full | — |
| *The Forgotten Ways* | 2006 (rev. 2016) | — | Pillar 1, 2, 3, 4 | Full | — |
| *ReJesus* | 2008 | Michael Frost | Pillar 5 | Full | — |
| *The Forgotten Ways Handbook* | 2009 | — | Pillar 2, 6 | Full | — |
| *Untamed* | 2010 | Deb Hirsch | Pillar 5 | Summary + key | — |
| *Apostolic Genius* | 2010 | — | Pillar 2, 4 | Full | — |
| *The Faith of Leap* | 2011 | Michael Frost | Pillar 4, 6 | Summary + key | — |
| *Right Here, Right Now* | 2011 | Lance Ford | Pillar 5, 6 | Summary + key | — |
| *On the Verge* | 2011 | Dave Ferguson | Pillar 4, 6 | Summary + key | — |
| *The Permanent Revolution* | 2012 | Tim Catchim | Pillar 3, 4 | Full | — |
| *5Q* | 2017 | — | Pillar 3 | Full | — |
| *Disciplism* | current/forthcoming | — | Pillar 5, 6 | Full when published | — |

**Significant talks (target archive):** Verge keynotes (multiple years); Forge teachings; Fuller Theological Seminary lectures; Asbury Theological Seminary lectures; Exponential conference keynotes; denominational gathering teachings; specific significant podcast appearances. Each talk transcribed, cleaned, and excerpted.

**Significant interviews (target archive):** Christianity Today; Outreach Magazine; Missio Alliance; specific significant podcast interviews; academic journal interviews. Each archived with transcript where available, excerpt-plus-citation otherwise.

**Articles published in external venues:** Alan's articles in Missio Alliance, Christianity Today, denominational publications, academic journals. Cataloged with appropriate rights for excerpting; full republication on the platform requires venue coordination.

## 8.6 Citation and linking specifications

**Citation component.** `<Cite index="[N]" />` renders as a bracketed numeral mark that links to the `/footnotes` registry entry. Visual treatment: highlighter-mark per the design canon in `docs/build/notes/homepage-ia-and-eeat-consultation-2026-05-12.md` §6. Print stylesheet inlines the note.

**Footnotes registry schema.** `src/lib/citations/[author-platform]-claims.json` (or equivalent path). Each entry includes: index (canonical numeral); claim (the substantive content being cited); source (the corpus item — book chapter, talk excerpt, interview quote); URL (where the citation resolves); page (where applicable); type (book / talk / interview / article / external).

**Internal linking discipline (per `docs/articles/LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md`):**
- Every pillar article links to all of its cluster articles.
- Every cluster article links upward to its pillar and laterally to at least two other clusters in the same pillar's cluster.
- Every long-tail article links upward to its cluster and pillar.
- Every pathway links to at least three pillar or cluster articles in the relevant pillar.
- Every course week's teaching reading links to at least two pillar or cluster articles.
- Newsletter issues link to at least one specific substantive surface.
- Field Letters link to specific cohort or practitioner surfaces.

**JSON-LD specifications:**
- `Person` schema on `/about/alan-hirsch` with: name, image, jobTitle, worksFor, affiliation, alumniOf (where applicable), sameAs (verified profiles: Wikipedia, denominational sites, seminary affiliations), knowsAbout (framework names), award (where applicable).
- `Person` schema on co-author pages with appropriate fields.
- `Article` schema on every article with: author (Alan, with Person reference), datePublished, dateModified, headline, image, publisher, mainEntityOfPage, citation (the corpus citations as CreativeWork references), about (the framework or topic).
- `Course` schema on each course with: name, description, provider, instructor (Alan), courseCode, hasCourseInstance (each cohort run).
- `CreativeWork` schema on books in the corpus with: name, author, datePublished, isbn (where applicable), publisher.
- `FAQPage` schema on long-form articles that include FAQ blocks.

## 8.7 The skill reference

Every Claude skill the manual orchestrates, with a one-line statement of what each does and how it fits into a production chain.

| Skill | One-line role | Used in |
| --- | --- | --- |
| `.claude/skills/article-plan/SKILL.md` | Generates a production brief for an article (pillar, tier, keywords, outline, corpus targets, links, CTA, meta, slug). | 5.1, 5.2, 5.3 |
| `.claude/skills/article-author/SKILL.md` | Full article drafting pipeline: research the corpus, draft in the nine-section architecture with citations. | 5.1, 5.2, 5.3, 5.4 (modified) |
| `.claude/skills/article-audit/SKILL.md` | Pre-publish six-dimension audit (voice, architecture, SEO, GEO, citations, funnel). | 5.1–5.4, 5.6, 5.12 |
| `.claude/skills/alan-voice/SKILL.md` | The voice constitution — five markers, antithesis prohibition, AI-cadence prohibition, "would Alan say this?" judgment. | Every Alan-voice production task; 5.11, 5.12 |
| `.claude/skills/pathway-author/SKILL.md` | Code-level pathway authoring at `src/lib/content/pathways/[slug].ts` — twelve content blocks grouped Understand → Examine → Apply → Go deeper. | 5.5 |
| `.claude/skills/pathway-audit/SKILL.md` | Pathway QA against the twelve-section architecture, SEO/GEO, voice. | 5.5 |
| `.claude/skills/course-author/SKILL.md` | Course week section drafting — six section types per week. | 5.6 |
| `.claude/skills/course-ingest/SKILL.md` | Course publication pipeline — manifest + module markdown → database upserts. | 5.6 |
| `.claude/skills/movemental-prose/SKILL.md` | Movemental institutional editorial polish (not for Alan-voice corpus pieces). | Not used in Alan production except for clearly institutional surfaces |
| `.claude/skills/movemental-narrative-audit/SKILL.md` | Platform-narrative audit at the institutional level. | Quarterly review of cross-surface narrative coherence |

## 8.8 The canonical document index

Every canonical document the manual orchestrates, with links.

- `docs/articles/01-content-strategy-for-movement-leaders.md` — pillar/cluster strategy; six-pillar map
- `docs/articles/02-the-evergreen-article-architecture.md` — nine-section spec; five voice markers
- `docs/articles/03-transformation-over-information.md` — four-necessities pedagogy
- `docs/articles/04-the-eight-week-formation-scaffold.md` — course structure
- `docs/articles/05-formation-journeys-the-pathway-architecture.md` — twelve-section pathway spec
- `docs/articles/07-author-onboarding-course-outline.md` — four-week cohort exercises
- `docs/articles/LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md` — EEAT/linking canon
- `docs/articles/HOW_MOVEMENTAL_USES_AI.md` — corpus ingestion methodology
- `docs/build/notes/onbuilding-4-week-course-SSOT.md` — onbuilding single source of truth
- `.claude/skills/*/SKILL.md` — skill library (see Part 8.7 for the index)
- `docs/build/notes/homepage-ia-and-eeat-consultation-2026-05-12.md` — homepage IA and EEAT design canon (Movemental-side; design patterns shared with the Alan platform where appropriate)

## 8.9 Change log

| Version | Date | Author | Summary |
| --- | --- | --- | --- |
| 1.0 | 2026-05-13 | Joshua Shepherd / AI initial draft | Initial draft. Eight-part structure: thesis, surface architecture, content spine, production pipeline, production prompts (fifteen orchestrations), production schedule, measurement and drift monitoring, appendices. Drafted against the existing Alan platform canon at the time of writing. Pending Alan's first pass and ratification. |

---

# Document mechanics

**Authoring conventions.** Every prompt in Part Five is paste-ready into Cursor or Claude. Every prompt names its inputs, the existing skills it orchestrates, the expected outputs, the editorial review path, and the Alan-ratification requirement.

**Review cadence.** Quarterly review by Alan and the platform's product owner. Material changes require both to ratify. Voice-specification changes require Alan personally. The change log is appended on every material revision.

**Source-of-truth status.** When this manual and the underlying skill files disagree, the skill files win for execution detail; this manual wins for orchestration intent. When this manual and the canonical Alan docs (`docs/articles/01`–`07`, the onbuilding SSOT, the linking playbook) disagree, the canonical docs win. This manual exists to *orchestrate* the canon, not to *replace* it.

**Failure modes the manual is designed to refuse.** Three failure modes the manual is specifically calibrated against:

1. **Voice drift.** The manual's most operationally important discipline. Every production order routes through the voice constitution; every artifact passes through voice audit; every artifact passes through Alan-ratification. The manual refuses any production path that bypasses these gates, regardless of editorial pressure.

2. **Pedagogy drift.** The four-necessities filter is enforced at the editorial-review state. The manual refuses any artifact that has collapsed into information mode — that publishes without dissonance, without action, without reflection structure, without community gesture.

3. **Scope inflation.** The staged timeline (Part 1.6 and Part 6) is honest about what the platform can claim at each stage. The manual refuses to promote artifacts to flagship status before their stage warrants. It refuses to claim formation outcomes the cohort runs have not yet demonstrated. It refuses to expand into territory Alan has not authorized.

---

# Comparative note: how this manual differs from the Movemental EEAT Strategy & Production Manual

Worth naming explicitly because the two manuals look structurally similar but do different work.

**Movemental's manual** is about an institution earning credibility. The EEAT load is distributed across founders, ecosystem, field guides, research papers, doctrine guardrails. The voice is the company's editorial register — disciplined, mature, institutional. The pedagogy is implicit (the Movemental Path: Safety → Sandbox → Skills → Solutions). The risk is institutional drift across a multi-author surface; the disciplines are doctrine guardrails, consistency-of-claim across surfaces, and the refusal of cheap moves like manufactured social proof and fourth-audience-card additions.

**Alan's manual** is about a single author making thirty years of work navigable as a formation engine. The EEAT load is concentrated in Alan — his books, his frameworks, his reception, his voice. The voice is Alan's specifically and is the platform's existential discipline. The pedagogy is explicit and load-bearing (four necessities; transformation over information; twelve-section pathways; eight-week course scaffolds). The risk is voice drift on a single-author surface, which is fatal in a way institutional drift is not. The disciplines are voice constitution, corpus grounding, formation-first pedagogy, and Alan-ratification at every publication gate.

The two manuals reference each other where they overlap — the EEAT four-layer framework, the surface architecture pattern, the production-prompt approach — and remain distinct in what they orchestrate. Movemental builds an institution. Alan's platform extends an author's life work. Both are necessary; neither substitutes for the other.

In practice, the Movemental platform and the Alan Hirsch platform may share infrastructure (design system, citation patterns, deployment patterns) but operate as distinct editorial products with distinct discipline systems. An editor trained on the Movemental manual is not automatically trained on Alan's voice; an editor trained on Alan's voice is not automatically trained on Movemental's institutional discipline. The training paths are deliberately separate.

---

*End of manual. This document is the orchestration layer above the existing Alan platform canon. It is to be read alongside, not in place of, the canonical documents listed in Part 8.8. When in doubt, return to the canonical docs.*