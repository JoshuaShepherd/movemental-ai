# Audience pages — narrative alignment audit

**Scope:** `/movement-leaders`, `/nonprofits`, `/churches`, `/system-builds`
**Lens:** Fragmentation-inspired architecture & narrative (see `/fragmentation`, home hero, `docs/book-development/fragmentation-manuscript-ordered/`)
**Not in scope:** UI tokens, component layout, responsive behavior — run `page-audit` for that.

---

## 0 · Canonical narrative — what the four pages should be downstream of

Ground truth read for this audit:

- `src/components/sections/home/home-hero.tsx` — Home Display: *"Your intelligence is fragmented. That's why it doesn't compound, form people, or scale."*
- `src/components/sections/fragmentation-story/fragmentation-story-content.ts` — six-stage copy, per-audience rails, cost-ledger by intelligence field
- `docs/book-development/fragmentation-manuscript-ordered/` — chs. 02 (two intelligences), 05 (six stages), 17–19 (leader / nonprofit / church playbooks)
- `src/app/(site)/system-builds/page.tsx` hero — already names the fragmentation spine correctly

**The spine every audience page should ride:**

1. **Diagnosis:** you pay a **fragmentation tax** on **two intelligences** — informational (corpus, frameworks, media, decisions) and relational (people, donors, cohort, partners, trust). The AI moment made the tax public.
2. **Reframe:** fragmentation is **structural**, not a content, tools, or willpower problem.
3. **Mechanism:** **six ordered stages** — Fragmentation → Integration → Activation → Formation → Multiplication → Movement. *Almost every organization stalls between stage 1 and stage 2.*
4. **Promise:** Movemental is **shared digital infrastructure** (library, graph, voice, pathways, decision log) — installed with you in a **4-week integration residency / build**, so a successor can inherit it.
5. **Proof:** attributable AI, citable canon, verified-human networks (scenius); *not* franchising or rented feeds.

If an audience page does not make that spine recognizable within the first scroll, it is drifting toward generic SaaS.

---

## 1 · `/movement-leaders` — Narrative alignment audit

### Executive read
The page correctly identifies the **consolidation / ownership / succession** frame and names "12 marks of a movement leader." But it opens on **stewardship economics** (hero promises "stewardship infrastructure"; second section leads with *90% retention / $1,000 upfront / 10% share*) before the reader has been told *why* consolidation is load-bearing. The fragmentation → integration mechanism is implied, never named. The result reads as "platform-for-authors with good economics," not "the chapter-17 playbook for the leader who can't answer *where is the canonical version of my framework?*".

### Ground truth cited
- Current: `src/components/sections/movement-leaders/movement-leaders-page-content.tsx`, `movement-leaders-data.ts`
- Canonical: fragmentation manuscript ch. 02 (two intelligences), ch. 05 (six stages), ch. 17 (movement-leader playbook); home hero; fragmentation-story `getFullStorySnippet('leader', ...)` and cost-ledger copy

### Dimension scores
| Dimension | Score | One-line evidence |
| --- | --- | --- |
| Copy | **Partial** | "Stewardship," "consolidation," "ownership," "network" are used; but "fragmentation," "integration," "foundation," "two intelligences," "corpus," "scenius" never appear |
| Narrative | **Partial** | Problem → reframe → mechanism → proof arc is not legible; hero + economics card fire before the diagnosis lands |
| Framework | **Misaligned** | Six stages never named; "Strategic depth & evidence" section invents a parallel 4-item rubric ("Credibility environment / Proof of scale / Acquisition motion / AI innovation lab") that competes with the canonical six-stage spine |
| Business model | **Aligned** | 90/10, ownership, curated network match `the-story-of-movemental.md` |
| Design charter (copy-level) | **Partial** | "Stewardship infrastructure" is on-voice; "AI innovation lab" is marketing-adjacent and breaks the one-voice rule |

### Section-by-section diagnosis

| Section | Current copy | Diagnosis | Recommended move |
| --- | --- | --- | --- |
| Hero | *"Stewardship infrastructure for leaders whose work is already forming people."* | Leads on infrastructure before diagnosis; "stewardship" is a virtue, not a mechanism | **Rewrite** to name the leader's specific fragmentation: *"Your corpus is scattered. Your network lives in your phone. Movemental builds the foundation underneath — so your framework compounds, cites, and survives succession."* |
| Retention stats card (90 / $1,000 / 10%) | Economics first | Conversion-stage card placed at education stage — reads transactional before the argument is made | **Move later** (after "Who counts as a movement leader?" or near "Apply"). Replace this slot with a two-intelligences diagnostic: left column = informational (books, talks, frameworks, decisions) scattered; right column = relational (board, publishers, cohort, alumni) carried in inbox |
| Consolidation · 3 cards | Credibility / Centralized ecosystem / Framework discovery | Each card is fine in isolation but none name the stage they advance. Reads as feature-bench | **Rename as integration outcomes:** *"One library (informational)," "One graph (relational)," "One voice that AI can quote."* Ties directly to ch. 5's foundation language |
| "You remain the leader, not the operator" midnight band | *"handles infrastructure so you focus on movement"* | Uses "movement" loosely. In canonical language, Movement is stage 6, not "what leaders do" | Keep the promise, **change the word**: "…so you stay the author, not the ops team." Reserve "movement" for stage-6 language |
| "Content doesn't move in the sense of circulating…" | Good diagnosis | Close to canonical but stops at diagnosis | **Add one line** that names the stall: *"This is the fragmentation → integration transition — the one almost every leader skips."* (ch. 5) |
| "Power of the ecosystem" | 100 vs 1,000 participants | "Curated discovery field" is right idea, wrong vocab | Use canonical: *"scenius"* or *"verified-human network."* Link to the **Multiplication / Movement** stages in the fragmentation story so the reader can see what 100 nodes actually does |
| "Platform ownership: not rental" | Ownership checks | Strong, on-voice | Keep. Move closer to the closing CTA so ownership is the *last* proof before apply |
| "Existing embodied work can be repurposed" | Capture & structure | Right idea; current copy is abstract | Anchor to Maggie (ch. 17) scene: *"The seven canonical framework pages. The lineage map. The contributor graph. The succession packet."* — those are the concrete integration artifacts the book names |
| "Who counts as a movement leader" (12 marks) | Standalone | Good content, wrong placement — reads like a definition primer dropped mid-funnel | **Move above the economics card.** Reader self-identifies, *then* sees what integration produces for them, *then* economics, *then* apply |
| "Strategic depth & evidence" (Credibility environment / Proof of scale / Acquisition motion / AI innovation lab) | New rubric | **Off-model.** This 4-item frame competes with the six-stage spine and introduces "AI innovation lab" which is not canonical | **Delete or replace** with a four-card six-stage map: *Fragmentation (where you are) · Integration (4-week residency) · Activation (your corpus answers) · Multiplication (frameworks travel).* Link each to the matching fragmentation-story act |
| BookReference | Points to `/book/read/the-six-stages-at-a-glance` | ✅ correct | Keep |
| StorySpineCtaRow | Audience note mentions consolidation chapters | ✅ correct | Keep |
| Final ghost CTA | "Infrastructure for those who steward movements" | "Steward movements" is back to loose movement language | Use "…for those whose life's work is already forming people" — picks up ch. 17's opening |

### Concrete rewrite priorities (must → optional)

1. **Hero rewrite** names fragmentation of *both* intelligences (informational + relational). Current hero only gestures at the informational side ("books, talks, frameworks").
2. **Delete the "Strategic depth & evidence" rubric.** Replace with a six-stage mini-map so the page rides the same spine as home + system-builds.
3. **Reorder:** 12 marks → two-intelligences diagnosis → consolidation (integration outcomes) → ownership midnight band → economics card → apply.
4. Thread the word **"foundation"** at least twice — once in hero, once at "Content doesn't move" — so a reader skim-reading recognizes the spine.
5. Replace "AI innovation lab" / "bounded AI assistance" with canonical **"AI grounded in your corpus / citations not hallucinations"** — mirrors the Activation stage copy already in `fragmentation-story-content.ts`.

---

## 2 · `/nonprofits` — Narrative alignment audit

### Executive read
The page has the cleanest fragmentation-adjacent copy of the four ("From fragmented effort to working systems," a before/after "Fragmented vs Movemental State"). But the **two intelligences** frame is absent — everything is informational ("knowledge base," "SOPs," "dashboards"). Wes's chapter-18 scene is specifically about the **relational** fragmentation of the board/program/development graph; this page frames the promise as a tidier ops stack. It also says *"These are not services. These are system builds"* — a good line — then delivers a "services-ish" outputs list ("Architecture / Playbook / Trained Team / Analytics Suite") that could be any consultancy.

### Ground truth cited
- Current: `src/components/sections/nonprofits/nonprofits-page-content.tsx`, `nonprofits-data.ts`
- Canonical: ch. 02, ch. 05, ch. 18 (the nonprofit), fragmentation-story per-audience accent for `nonprofit` in `informationalAccent` and `relationalAccent`

### Dimension scores
| Dimension | Score | Evidence |
| --- | --- | --- |
| Copy | **Partial** | "Fragmented → movemental" framing present; "two intelligences," "foundation," "integration" absent |
| Narrative | **Aligned** | Arc works: current reality → before/after → interconnect → outputs → CTA |
| Framework | **Misaligned** | No stage language. Outputs list ("Architecture / Playbook / Trained Team / Analytics Suite") is ops-deliverables, not stage-artifacts |
| Business model | **Partial** | "Not a menu / interconnected" aligns; "Analytics Suite — custom dashboards that track the metrics that matter, not just vanity numbers" reads like generic agency marketing |
| Design charter (copy-level) | **Partial** | "No orphan software" is on-voice; "Day 1 productive" / "vanity numbers" breaks the charter's editorial calm |

### Section-by-section diagnosis

| Section | Current | Diagnosis | Recommended move |
| --- | --- | --- | --- |
| Hero | *"From fragmented effort to working systems. We build with you, not for you — system architecture, documented workflows, and the team knowledge to run it after we leave."* | Good. On-voice. Close to canonical | **Minor:** add one clause that names *both* fragmentations: *"Your programs, your donors, and your board each carry half the truth — on different tools, in different inboxes."* |
| Four system-build cards | Content / Fundraising / Governance / Discovery Lab | The cards are already good. The *framing sentence* ("Four system builds — linked and interoperable") is weak | Replace with: *"Four installs that turn fragmented programs and relationships into one working foundation."* |
| *"These are not services. These are system builds."* (midnight quote) | Good pull quote | ✅ keep, but it would land harder if followed by ch. 18's definition: an install produces *artifacts, owners, and handoff* — not a deck |
| Current reality (willpower / tribal knowledge / spreadsheets) | Strong ops diagnosis | Describes only the **informational** half. Wes's actual problem is that *"the organization could brief a major donor from the integrated system but still could not brief itself"* (ch. 18) | **Add the relational half:** "Donor nuance lives in your development hire's inbox. Program truth lives in the field officer's head. When one person leaves, years of relationship walk out with them." |
| Before / after (fragmented vs movemental) | Good device | Every "After" bullet is informational (searchable memory, real-time dashboards, automated cultivation, governance frameworks) | Rebalance to 2 informational + 2 relational: e.g. *"Donor and beneficiary memory that survives staff turnover," "Board, program, and development seeing the same narrative spine"* |
| "This is not a menu" elevated band | Good | Keep. Could name the integrated foundation explicitly: *"one coherent system your org can operate"* | Minor polish |
| "What you leave with" — Architecture / Playbook / Trained Team / Analytics Suite | Reads like a consultancy checklist | "Day 1 productive," "vanity numbers" are off-voice; "Analytics Suite" pattern competes with the four system builds above | Rewrite as **integration-stage artifacts** from ch. 5 / ch. 18: *"A queryable library," "A legible relational graph," "A voice guide AI can quote," "A decision log your board can audit."* These are the things the book actually names |
| BookReference | Points to `/book/read/what-integration-actually-is` | ✅ correct | Keep |
| StorySpineCtaRow | Notes "Integration (donor + program data) and Multiplication (visibility) first" | ✅ on-spine | Keep |
| Closing CTA *"Ready to install structure?"* | Good | "Install" is the right verb | Add under-line tying back: *"Integration first. Everything downstream is optional."* (ch. 5) |

### Concrete rewrite priorities

1. **Introduce "two intelligences" language explicitly** in Current Reality — it's the single biggest gap. Wes's problem is *both* halves; the page only names one.
2. **Replace the generic outputs** ("Architecture / Playbook / Trained Team / Analytics Suite") with canonical integration artifacts: **library, graph, voice, pathways, decision log**.
3. **Name the stall.** After the before/after, add: *"The transition the book is most urgently for is fragmentation → integration. It's the one transition most nonprofits skip, usually by buying more tools."*
4. Strip "vanity numbers," "Day 1 productive" — too close to standard agency tone. Replace with calm, load-bearing language.

---

## 3 · `/churches` — Narrative alignment audit

### Executive read
The strongest-voiced of the four pages: "activity to formation," "pathway not a menu of programs," the Benedict/Methodist quote. But it has a **stage-skip problem**: the page emphasizes Formation (stage 4) and Pathways without ever naming that Formation depends on Integration and Activation first. Chapter 5's load-bearing claim — *"you cannot form people with a foundation that has not been activated"* — is exactly what this page needs to hold and does not. The "Typical Paths" card "Path A: Formation First" actually **contradicts** the canonical sequence.

### Ground truth cited
- Current: `src/components/sections/churches/churches-page-content.tsx`, `churches-data.ts`
- Canonical: ch. 02, ch. 05, ch. 12 (formation as moral stage), ch. 13 (information structured / formation requires relationship), ch. 19 (the church — Joelle's elder meeting)

### Dimension scores
| Dimension | Score | Evidence |
| --- | --- | --- |
| Copy | **Partial** | "Formation," "pathway," "infrastructure" used well; "fragmentation," "integration," "foundation," "two intelligences" mostly absent |
| Narrative | **Partial** | Flow is pleasant; the tension *"Joelle carried the seven hundred names in her body"* (ch. 19) is missing |
| Framework | **Misaligned** | Says "formation requires structure" ✅ but then orders Typical Path A as *Formation → Pathways* skipping the integration dependency. Contradicts ch. 5 §"sequence is not optional" |
| Business model | **Partial** | "System, not separate parts" is on-brand; "stewardship as relational rhythm" good; no explicit tie to curated-network / scenius |
| Design charter (copy-level) | **Aligned** | "Information without infrastructure creates exhaustion" is a charter-quality line |

### Section-by-section diagnosis

| Section | Current | Diagnosis | Recommended move |
| --- | --- | --- | --- |
| Hero | *"From activity to formation. Most churches are doing more than ever — and seeing less transformation."* | Strong voice. Understates fragmentation | **Add one clause:** *"…because teaching, groups, pastoral care, and liturgy each carry a fragment of the same formation — on different tools, in different memories."* Names both intelligences without jargon |
| Editorial intro "A pathway, not another stack of disconnected programs" | Good | Keep | — |
| Current reality (pulpit/pew gap, exhaustion) | On-voice | Missing Joelle's specific scene — budget meeting where nobody has the *why behind 2019* or the *current pastoral load* (ch. 19) | **Add a ch. 19-rooted paragraph:** *"The elder meeting debates budget lines without the why behind the 2019 pause, without the households under acute load, without a shared map. Each elder has a piece of the truth in memory."* |
| Paradigm Shift ("Formation requires structure") | Right principle | Stops at "formation requires structure" — leaves out *formation requires relationship* (ch. 13) | **Add a third card** or swap one to name the two intelligences explicitly: "Structure for what is teachable. Relationship for what is formative. One spine." |
| Assessment (4 Start Here cards) | Good | Copy is slightly trope-y ("great content getting lost in the noise") | Re-voice to mirror ch. 19's six pastoral failures — e.g. *"If your teaching isn't landing in anyone's week," "If pastoral care lives in the pastor's body, not the church's memory," "If elders decide without a shared map," "If AI feels like a theological question the church has not answered"* |
| Core System Builds (5 items) | Good product list | "Foundation layer" is at position 5 — weird ordering given it's presented as the operating spine | **Reorder:** Foundation layer first (it's the spine), then Content, Governance, Fundraising, Discovery Lab. Or keep order but add badge "start here" on foundation |
| "This is one system, not separate parts" (integration section) | Good | Good opportunity to name **Integration** as the stage | Add a sentence: *"This is the Integration stage — the foundation the later stages depend on."* (ch. 5) |
| Typical Paths (Formation First / Leadership Reset / Digital Modernization) | **Off-model** | "Path A: Formation First" violates the canonical "sequence is not optional" from ch. 5. You cannot do Formation before Integration + Activation | **Rewrite paths as integration-first variants:** *"Path A: Formation-driven integration — gather the teaching and discipleship artifacts first," "Path B: Governance-driven integration — start with elder decision-making," "Path C: AI-driven integration — start with Discovery Lab so the foundation is queryable."* All three are *still integration*, just by different door |
| Time Horizon (Month 6 / Year 2) | Good | Sentiments are right. "Clarity takes root" is softer than the book's claim that *integration produces no deliverable for six months* (ch. 5) | Sharpen: *"Month 6 — integration produces no public deliverable yet; the foundation is what you have. Year 2 — formation becomes predictable because the foundation holds"* |
| Concrete Outputs (Working Platform / Trained Team) | Thin (only 2 items) | Incomplete vs nonprofits page which has 4 | Expand to the canonical artifacts: library (teaching), graph (households), voice guide (pulpit ↔ liturgy ↔ groups), pathway, decision log |
| Midnight Benedict/Methodist quote | ✅ on-voice | Keep | — |
| StorySpineCtaRow note (Formation stage) | OK but **leads the reader toward stage 4 skipping stage 2** | | **Rewrite audience note:** *"For churches, pay special attention to the fragmentation → integration transition in the story — then read Formation alongside your liturgical rhythm once the foundation holds."* |
| Final CTA ("Ready to build your pathway?") | Good | Pathway-language is right | Keep |

### Concrete rewrite priorities

1. **Fix the stage-order violation.** Rename "Path A: Formation First" and reorder Core System Builds so the spine (Foundation) leads, not trails.
2. **Name both intelligences** — current page reads single-intelligence (formation = teaching reaching people). Ch. 19 is emphatic that pastoral care / relational graph is the *other* half.
3. **Ground the Current Reality in Joelle's elder meeting** (ch. 19) rather than the generic "pulpit/pew gap" trope.
4. **Expand Concrete Outputs** to 4 artifacts matching nonprofits page and canonical foundation list.
5. **Sharpen Time Horizon** with the ch. 5 claim that integration's honest Month-6 output is *the foundation itself*, not visible transformation.

---

## 4 · `/system-builds` (hub) — Narrative alignment audit

### Executive read
The hub page is **closest** to canonical of the four — it explicitly names the six-stage spine in the hero and maps each build to a stage (Discovery Lab + Foundation → Integration; Content + pathways → Formation; Fundraising → Multiplication; Governance → steward). Good. The issues are smaller and largely about **ordering** and an **unframed middle** ("The invisible ceiling" is adjacent-but-not-identical to "fragmentation tax"), plus a CTA row ("Nonprofit overview / Organizational systems") that reads legacy.

### Ground truth cited
- Current: `src/components/sections/system-builds/system-builds-page-content.tsx`
- Canonical: ch. 05, the `AdaptiveLeadershipThroughline` and `TypicalPathsSection` (not read, treat as black-box — copy diagnosis only where visible in page.tsx)

### Dimension scores
| Dimension | Score | Evidence |
| --- | --- | --- |
| Copy | **Aligned** | Explicit six-stage + fragmentation language in hero |
| Narrative | **Partial** | Hero sets up the spine; the body disperses into feature sections (typical paths, sequence, integration, stack, format, modules) without a clear climb back to the CTA |
| Framework | **Aligned** | Stage mapping is correct and matches `fragmentation-story-content.ts` |
| Business model | **Aligned** | Module + format + hub structure matches org positioning |
| Design charter (copy-level) | **Partial** | "Invisible ceiling / coordination tax" is on-voice; closing "Scope a build with us" is calm and right; nav to `/inquiry` "Organizational systems" is legacy IA |

### Section-by-section diagnosis

| Section | Current | Diagnosis | Recommended move |
| --- | --- | --- | --- |
| Hero | *"From fragmented effort to integrated systems. …the spine is the same six-stage path you see in the fragmentation story: Discovery Lab and Foundation advance Integration; Content and pathways lean on Formation; Fundraising → Multiplication; Governance keeps the stack stewarded."* | **Best single paragraph across all four pages.** Correctly names each module's canonical stage | Keep as anchor. Everything below should extend this, not re-pitch |
| "The invisible ceiling" | Adjacent to "fragmentation tax" but not identical | "Connective tissue … coordination tax" is a fine lay phrase but drifts from the book's named concept | Either (a) adopt canonical: *"The fragmentation tax — paid on two intelligences,"* or (b) explicitly bridge: *"Teams call this the invisible ceiling. The book names it the fragmentation tax."* Do not let two vocabularies co-exist without naming the relationship |
| AdaptiveLeadershipThroughline | Not readable from page.tsx | Verify the throughline language uses canonical stage names | **Audit required** — if it uses alt vocabulary ("adaptive capacity," "resilience"), reconcile |
| TypicalPathsSection | Not readable from page.tsx | Verify paths are sequenced integration-first | **Audit required** in component file |
| "Recommended sequence vs à la carte" | Three conditional starts (AI / story+support / governance) | Useful but frames all three as equal entry points. Ch. 5 is clear that *integration is the only real stage-2 transition* — all three are variants of it | Reframe the intro: *"All three paths are doors into the same integration residency. Pick the domain that's bleeding most."* |
| SystemsIntegrationSection / SystemStackSection / BuildFormatSection | Component black-box | — | **Audit required** — ensure they don't introduce competing vocabulary |
| Build modules grid | Matches hub cards | ✅ | Keep |
| "Scope a build with us" CTA | Good | Tone is on-voice | Keep |
| Sub-CTAs: "Nonprofit overview / Organizational systems" | Links to `/nonprofits` and `/inquiry` | "Organizational systems" is legacy IA language — does that route still exist? | **Audit:** verify `/inquiry` still makes sense; consider "Movement-leader overview" + "Church overview" for parity with audience pages |

### Concrete rewrite priorities

1. **Reconcile "invisible ceiling" with "fragmentation tax."** Pick one as canonical on this page, or bridge them in one sentence. Two names for the same thing is a drift pattern.
2. **Audit the three sub-components** not directly readable from `page.tsx`: `AdaptiveLeadershipThroughline`, `TypicalPathsSection`, `SystemsIntegrationSection`, `SystemStackSection`, `BuildFormatSection`. Confirm stage-vocabulary compliance.
3. **Add parity audience sub-CTAs** so movement-leader + church + nonprofit all have a clear path in from this hub, not only nonprofits.
4. **Consider a "where are you on the six stages?" micro-diagnostic** near the top — this hub is the natural place for it, and it would pull the whole audience system into one legible map.

---

## 5 · Cross-page patterns

Three recurring drift patterns worth naming so fixes can be mechanical:

### Pattern A — "Single-intelligence" drift
Nonprofits and Churches pages frame fragmentation almost entirely as informational (content, dashboards, teaching). Ch. 2 is explicit: **both** intelligences are fragmented in almost every org. Every audience page should name **relational** fragmentation with equal weight. Leaders: network-in-phone. Nonprofits: donor nuance walking out with staff turnover. Churches: pastoral load in the pastor's body. Institutions: alumni trust in tenure-line heads.

### Pattern B — Feature-bench drift
Movement-leaders "Strategic depth & evidence" (Credibility / Proof / Acquisition / AI lab), Nonprofits "What you leave with" (Architecture / Playbook / Trained Team / Analytics Suite), and Churches' thin two-output card introduce **four-item feature-bench rubrics** that compete with the canonical six-stage spine. Replace each with artifacts named in ch. 5: **library, graph, voice, pathways, decision log** — plus a sixth that's audience-specific (succession packet / donor spine / formation pathway / curriculum spine).

### Pattern C — Stage-skip drift
Churches "Path A: Formation First" is the worst case; the Movement-leaders page also drifts by invoking "movement" as a verb before stage 6 is earned. Every audience page should say, at least once, *"integration is the transition almost every org skips — it's the one this page is for."*

### Pattern D — Vocabulary co-existence
"Invisible ceiling" (system-builds), "coordination tax" (system-builds), "scattered organization" (nonprofits), "pulpit/pew gap" (churches) all name the same thing the book calls the **fragmentation tax**. Pick one canonical, bridge the others in one sentence, or retire them.

---

## 6 · Recommended rewrite order

If implementing one page at a time:

1. **Churches first** — has the stage-order violation (Path A: Formation First). Highest risk of saying something the book actively contradicts.
2. **Movement-leaders second** — highest surface area of drift ("Strategic depth & evidence" rubric, economics before diagnosis).
3. **Nonprofits third** — structurally sound; mostly needs the relational-intelligence half added and outputs rewritten to canonical artifacts.
4. **System-builds last** — lightest fixes; mostly vocabulary reconciliation and the component-level audit.

---

## 7 · Agent fix prompt (paste-ready)

Use this block to hand a single audience page to an agent for rewrite:

```
Rewrite the copy on src/components/sections/<audience>/<audience>-page-content.tsx (and <audience>-data.ts) to ride the canonical fragmentation spine. Follow docs/build/prompts/audience-pages-narrative-audit.md §<section number> for page-specific diagnosis.

Non-negotiables:
- Name BOTH intelligences (informational + relational) in the hero or first section.
- Use the six ordered stages by name: Fragmentation → Integration → Activation → Formation → Multiplication → Movement.
- Reserve "movement" for stage 6. Do not use it as a verb ("focus on movement").
- Name the fragmentation → integration stall once ("the transition almost every org skips").
- Concrete integration artifacts, not feature-bench: library, graph, voice, pathways, decision log.
- Match protagonist: Maggie (leader) / Wes (nonprofit) / Joelle (church) / Elias (institution) from docs/book-development/fragmentation-manuscript-ordered/ch. 17–19.

Forbidden phrases:
- "AI innovation lab," "Analytics Suite," "vanity numbers," "Day 1 productive."
- "Formation First" as a sequencing option that precedes integration.
- "Invisible ceiling" and "coordination tax" unless explicitly bridged to "fragmentation tax."

Forbidden claims:
- Movement / multiplication outcomes without integration as dependency.
- AI promises without grounding in corpus / citations (use the Activation-stage language from src/components/sections/fragmentation-story/fragmentation-story-content.ts).

Keep:
- DESIGN.md tokens, Section variants, primitives. This is copy-only.
- The shipped system-build routes (content / fundraising / governance-ethics / discovery-lab / foundation).
- StorySpineCtaRow and BookReference components (update their audienceNote / description strings only).

Verify before reporting done:
- `pnpm typecheck` passes.
- Hero + one body section name both intelligences.
- Stage vocabulary used at least twice.
- No forbidden phrases remain.
```
