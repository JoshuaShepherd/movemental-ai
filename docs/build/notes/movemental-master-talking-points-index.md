# Movemental — master index of claims, talking points, and distinctives

**Revised:** 2026-04-22
**Purpose:** The working index for articulation. Ordered by strategic importance so that when you need the clearest phrasing of a Movemental idea — for a home-page rewrite, a deck, a donor letter, a podcast, a pricing page, a pitch — you can find it here in the form we currently believe is best. Each entry gives you the claim, the language we use now, where it lives in the codebase or corpus, and what to be careful about.
**Authority:** When live Next.js copy conflicts with any older markdown bundle, the live app and `docs/arguments/SITE-SSOT.md` win. This index is a semantic map. The repo is the source of truth.
**Companion:** The exhaustively enumerated set of micro-claims is the **173-card deduplicated corpus** in `docs/html/deduped-megapage.html` (exported into `docs/arguments/custom-gpt/messaging-01-arguments.md` … `messaging-08-*.md`). This document *indexes and groups* that territory. It does not replace the per-card YAML.

---

## How to read this index

Three things to know before you scroll.

**It is ordered, not alphabetized.** Section 1 is the breath you take before you say anything about Movemental in public. Section 2 is the diagnosis the buyer has to feel before anything else lands. Each subsequent section is less load-bearing than the one before it. If you only have thirty seconds with a reader, stay in sections 1 through 3. If you have two minutes, add section 4. If you have a meeting, keep going.

**Each entry says the claim twice.** Once in the short form we use in copy. Once in the longer form we use when the short form gets challenged. The short form is for heroes, eyebrows, email subject lines, social posts. The longer form is for essays, decks, call preparation, and the moment a serious reader asks *what do you actually mean by that?*

**Everything connects back to live surfaces.** Whenever a claim has an address in the codebase — a page, a component, a book chapter, a doctrine doc — the address is named. If you revise how we talk about something, revise the live surface in the same move, or the index drifts.

---

## 1. Positioning and North Star

This is what Movemental *is* in one breath, and the stance we take before anything else is said.

### 1.1 The wiser way

**Short form:** *There is a wiser way to navigate AI.*
**Longer form:** Between fearful avoidance and reckless adoption there is a narrower, more honest posture — the one where leaders accept that the frontier is real, refuse to perform a mastery they do not have, and do the slow work of keeping their organization recognizable as itself a year from now. That is the posture we build for.
**Lives at:** `/` hero (`src/components/sections/home/home-concept-modern-page-content.tsx`).
**Be careful of:** flattening this into "balanced AI" or "thoughtful AI." Those are beige. "Wiser" is a theological and practical claim about what kind of judgment the moment requires.

### 1.2 For organizations, not for heroes

**Short form:** *For organizations with people, formation, and mission at stake.*
**Longer form:** Movemental is built for mission-driven organizations — churches, nonprofits, seminaries, institutions — not for solo creators or generalist businesses. The digital primary audience is the senior leader who signs the letter, owns the outcomes, and cannot outsource their conscience to a vendor. Everything the platform does is sized for that reader.
**Lives at:** `/` hero eyebrow; `/organizations` hub; audience architecture.
**Be careful of:** letting "creators" or "thought leaders" sneak into front-door copy. The creator economy is adjacent, not primary.

### 1.3 You are not being asked to master AI

**Short form:** *You are not being asked to master AI. You are being asked to lead faithfully on a new frontier.*
**Longer form:** Mastery theatre — the pose that says *we figured this out* — is one of the worst pressures on mission-driven leaders right now. It produces bad procurement, bad rollouts, and bad hires. The actual assignment is smaller and harder: name what your organization stands for, keep staff formation intact while using these tools, and refuse to delegate conscience to anything that cannot carry it.
**Lives at:** `/` hero subcopy.
**Be careful of:** turning this into permission to not learn. Humility is not abdication. Leaders still have to lead.

### 1.4 Walking, not selling

**Short form:** *Start with clarity.*
**Longer form:** Movemental is implementation and advisory, not generic SaaS. The primary motion is relational: a conversation, a diagnostic, a bounded engagement, a handoff. The CTA pattern on every primary surface points to `/contact` because the right first move for the right reader is usually to talk.
**Lives at:** `/` primary CTA; `/services`; `/contact`.
**Be careful of:** lapsing into product-tour language. We are not asking people to try a free trial. We are asking them to decide whether to begin.

### 1.5 The adoption that endures

**Short form:** *The only adoption that endures is the one your organization can still recognize as itself a year later.*
**Longer form:** This is the one sentence that, if only one sentence from this document survived, should survive. It names the standard: not ROI, not speed, not feature parity with peers, but **continuity of self under pressure**. It also names the failure mode clearly: organizations that accept AI adoption which quietly repriced their voice, judgment, or craft will still call it success until a long-time donor goes quiet or a staff cohort leaves.
**Lives at:** `docs/articles/the-movemental-thesis.md` closing; book; long-form.
**Be careful of:** shortening this to a slogan. It works because it is unusually honest. Keep the sentence whole.

### 1.6 Not a tools problem

**Short form:** *This is not primarily a tools problem.*
**Longer form:** The question AI asks mission-driven organizations is not *what can this tool do for us* but *what does it do to us*. That is a leadership, formation, and humanity problem sitting three layers above any platform decision. Every tools-first adoption we have seen produces a version of the three-platform nonprofit — licenses active, staff trained, voice gone. Stating this out loud, first, is the precondition for every other conversation.
**Lives at:** `docs/articles/this-is-not-a-tools-problem.md`; `/` stakes section.
**Be careful of:** conceding the tool frame in vendor meetings to be polite. Polite concession is where most of the damage is done.

---

## 2. The diagnosis — why the buyer should care

Positioning is how we speak. Diagnosis is what we see. If the buyer does not feel the diagnosis in their own body, nothing downstream will land.

### 2.1 The two equal errors

**Short form:** *Fearful avoidance and reckless adoption are the same mistake in different uniforms.*
**Longer form:** Avoidance says *if I do not engage, I cannot get it wrong*; it cedes the field, because staff will use these tools with or without the organization's scaffolding. Reckless adoption says *if I move first, I cannot be caught*; it outsources discernment to whoever ran the last demo. Both are reactions to the same shame about not knowing, and both skip the slow work of deciding what kind of adoption keeps the organization coherent with its mission.
**Lives at:** `/` Orientation section; thesis article; book Chapter: *The Two Equal Errors*.
**Be careful of:** drawing this as a political or cultural divide. It is not. The same leader can inhabit both errors on different weeks of the same month.

### 2.2 Integrity vs impact (the core tension)

**Short form:** *Move too fast and you lose integrity. Move too slow and you lose impact. The real work is learning to move with integrity.*
**Longer form:** AI cheapens impact in the short term and makes integrity harder to hold. Most mission-driven organizations read their current tension as *speed versus caution* on a spreadsheet. It is not. It is *coherence between what you say, what you ship, and who you are*, set against the rate at which your actual work reshapes lives and systems you exist to serve. Organizations that trade one for the other are both losing. They only look different while the loss is still deniable.
**Lives at:** `/` stakes; `docs/articles/integrity-vs-impact.md`; book.
**Be careful of:** collapsing integrity to ethics language. Integrity in this frame is structural: do the pieces hang together over time.

### 2.3 The dual intelligences (the architecture underneath)

**Short form:** *Informational intelligence is corpus. Relational intelligence is graph. Fragmented, neither compounds.*
**Longer form:** Every mission-driven organization carries two kinds of intelligence. **Informational** — books, articles, talks, frameworks, media, documents — lives in the corpus. **Relational** — the network of people who trust, vouch for, carry, and extend the work — lives in the graph. When they are fragmented across platforms and heads, the corpus has nothing faithful to stand on and the graph cannot supervise what models do in your voice. Ungrounded AI produces fluent approximation. **Grounded AI** runs retrieval over an integrated corpus and a legible relational graph.
**Lives at:** book Chapter 2 (`/book/read/two-intelligences`); `/assessment-new` (dual-intelligence diagnostic).
**Be careful of:** reducing this to "content strategy plus CRM." The point is that these two kinds of intelligence must be composited into one foundation, not kept as parallel pipelines.

### 2.4 Fragmentation — the meta-problem

**Short form:** *Fragmentation is the problem AI made visible. It is not the problem AI caused.*
**Longer form:** Informational fragmentation shows up as content in many homes with no trusted single surface. Relational fragmentation shows up as partners in apps with no durable map — memory walks out when staff or tools change. The predictable consequences repeat across every organization that has not integrated: nothing compounds, formation weakens, credibility weakens, AI becomes shallow. AI did not break these systems. It raised the cost of leaving them unrepaired.
**Lives at:** `/fragmentation` (six-stage narrative surface); `docs/articles/intelligence-fragmentation.md`; thesis.
**Be careful of:** framing `/fragmentation` as a *problem page*. It is a story page — it walks the reader through *scatter → field*, not just *what is broken*.

### 2.5 The five structural breaks

**Short form:** *Fragmentation, static content, signal collapse, invisible expertise, the death of the isolated asset.*
**Longer form:** These are one structural pressure seen from five doors. **Fragmentation:** output does not connect, so nothing compounds. **Static content:** most of what gets published does not move — does not change how a serious reader thinks, does not travel, does not feed the next piece. **Signal collapse:** craft used to act as a proxy for depth; many proxies are now cheap to mimic, so surfaces stop doing trust work. **Invisibility of expertise:** volume drowns, discovery layers reward what is easy to generate and easy to quote without context, and the people who know the most are not first in line. **The death of the isolated asset:** a single excellent piece no longer clears the noise floor; the new unit is a body of connected work.
**Lives at:** thesis article (*Problem* movement); book chapters 6–10.
**Be careful of:** using these five as a menu. They are one pressure felt from five places. State one well rather than all five lazily.

### 2.6 The one-paragraph test (the diagnostic every senior leader owes their organization)

**Short form:** *If your senior leader cannot describe your organization's relationship to AI in one paragraph, the organization does not yet have a relationship to AI. It has tool sprawl.*
**Longer form:** The paragraph has to be something the leader could say, unprompted, from memory, in a hallway, to a board member. It has to name what AI is and is not for inside this organization, what it is allowed to touch, what it is forbidden to touch, and what posture the organization takes toward the capability. Most senior leaders, asked honestly, discover they cannot produce it — because it was delegated, and delegation at that level always produces a paragraph the organization cannot rely on.
**Lives at:** `docs/articles/this-is-not-a-tools-problem.md`.
**Be careful of:** treating this as a policy exercise. The paragraph is not a policy. It is the precondition for any policy that will survive the first hard case.

---

## 3. Two frameworks — do not conflate

Movemental teaches two ordered sequences. They do different work. Conflating them is one of the most common internal drift patterns, and it flattens both.

### 3.1 The AI Stewardship Sequence (the on-ramp)

**Short form:** *Safety → Sandbox → Training → Tech. In that order. The order is load-bearing.*

**Stage-level articulation — use this language:**

- **Safety** — governance with real authority, conviction-level naming of what will be tested when you adopt these tools, and explicit boundaries on where AI does and does not belong in this organization's work. Not a ban. Confidence to move without betraying the mission. Without Safety, speed curdles into self-suspicion.
- **Sandbox** — structured exploration: bounded space, stated hypotheses, defined use cases, a learning loop, shared artifacts. Not shadow IT. Not pilot-as-whole-plan. The protected place where the organization learns what it is becoming before it bets the mission on the answer.
- **Skills** — *formation, not training*. Training transfers techniques. Formation reshapes judgment. The capacities that matter are discernment, authorship, and stewardship: recognizing drift, holding the pen, knowing what must remain unmediated.
- **Solutions** — deployment into real workflows, owned by humans who can course-correct, governed by policy that is already real, under leadership that can name the tradeoffs. Solutions matter. They come last because their value is conditional on the previous three being in place.

**Role:** This is the *on-ramp* — how an organization safely enters AI. It is a staircase, not a menu. The inverted version (Solutions first, then retrofit policy and formation) is the single most expensive mistake we see in the sector.

**Lives at:**

- Field guide: `/articles/ssss-field-guide-for-organizational-leaders` (label: *the AI Stewardship Sequence field guide*).
- Article spine: `safety-before-speed`, `the-purpose-of-sandbox`, `the-skill-of-ai` (or `skills-as-formation-not-training`), `solutions-deployment`, `why-order-matters`, `the-ssss-framework`, `there-is-a-way-through-this`.
- Integrity diagnostic: `src/lib/ssss-integrity-assessment/` → `POST /api/assess/ssss-integrity`.

**Naming rule (non-negotiable):** The public name is **the AI Stewardship Sequence**. Spell out the four stages on first mention in any piece. Acronym-first naming ("SSSS," "4S") is **deprecated** in new materials. Existing internal slugs (`ssss-*`, `/api/assess/ssss-integrity`) stay for route stability — do not introduce new ones. See SITE-SSOT §12.

### 3.2 The six-stage arc (the long trajectory)

**Short form:** *Fragmentation → Integration → Activation → Formation → Multiplication → Movement.*

**Role:** This is the *road* — what the work looks like over years, not quarters, once the on-ramp has been taken. **Integration** is the load-bearing stage; the book's whole architecture turns on it. The arc names what it takes to move from *scatter* to *field* — an organization that acts less like a franchise and more like a living body of work.

**Lives at:** `/fragmentation` (canonical interactive narrative); book (*From Fragmentation to Movement*); thesis article.

**Linking pattern on home:** pair **Read the book** with **Walk the six stages** (`/fragmentation`) and **the AI Stewardship Sequence field guide**. Three doors, one house.

### 3.3 How the two frameworks work together

**Short form:** *Safety first — but not the end.*
**Longer form:** The Sequence is how an organization safely enters AI without losing itself. The six-stage arc is how that same organization matures into a body of work that compounds. Sequence without arc is a responsible adoption with nowhere to go. Arc without sequence is a long journey that starts in the wrong year. You can do them in the same sentence, but you cannot collapse them into the same chart. They are governed by different rules and live in different artifacts (field guide vs. book).

**Be careful of:** creating a master hybrid diagram that mixes the four stages and the six stages into one path. This has been attempted. It always obscures what each sequence is actually for.

---

## 4. What integration produces — the foundation nodes

When integration is working, four artifacts show up together. These are the product nouns on the home page.

| Node | Short form | What it really is |
| ---- | ---------- | ----------------- |
| **Library** | Knowledge, frameworks, documents, media — one coherent, queryable whole. | The informational corpus, organized so that every new piece either joins an existing argument or opens a new one on purpose. |
| **Graph** | People, relationships, trust — legible to the whole org. | The relational intelligence, visible enough that staff can supervise what models do with it, and durable enough that memory does not walk out with turnover. |
| **Voice** | Canonical articulation of how the work sounds — extensions still sound like the work. | The speech-print of the organization: tone, cadence, vocabulary, the handful of sentences that would be recognizable in a blind test. Without it, every assisted draft drifts toward the sector mean. |
| **Pathways** | Routes through what is integrated — formation as architecture, not accident. | The *how a reader moves* layer. Pathways turn a static library into a place where someone is actually being formed by a sequence, not just scrolling. |

**What integration produces (home NOT_THIS list, worth keeping in mind):** *not a content refresh; not a new platform; not "AI adoption" as the work; not a shortcut around leadership.* The most common reading we have to correct is the one where a reader hears "integration" and mentally substitutes "website rebuild." It is neither a refresh nor a platform. It is the architecture underneath whatever tool or site you also maintain.

**Lives at:** `/` foundation section; book Chapter 11 (library / pathways / voice).

---

## 5. Grounded vs ungrounded AI (the product-truth claim)

**Short form:** *Ungrounded AI produces fluent approximation. Grounded AI retrieves over a real corpus and a real graph.*
**Longer form:** The market is saturated with AI that sounds plausible because models are good at the surface of things. What they cannot do, on their own, is tell you the truth about *your* organization — your covenant commitments, your donors' names, your theology, your prior disagreements, your three-year archive, your living network of partners. Grounded AI at Movemental means something specific: retrieval over the integrated library *and* the legible relational graph, inside a voice boundary, under governance that someone owns by name. That is the only configuration under which assistance does not corrode the thing being assisted.
**Lives at:** home product-truth sections; `/platform`; `/system`; book chapters on architecture.
**Be careful of:** treating "grounded" as a technical adjective. It is a trust claim. Ungrounded systems are not neutral; they are load-bearing on plausibility, and plausibility is exactly what the market cannot trust anymore.

**Related:** *This is not a tools problem* (§1.6) is the diagnostic; *grounded vs ungrounded* is the architectural response.

---

## 6. Audience doctrine — organizations vs movement leaders

This is the single most load-bearing internal distinction on the site, and one of the easiest to accidentally flatten. Read the canonical doctrine doc before touching anything audience-shaped: [`docs/build/strategy/movement-leaders-as-ecosystem-layer.md`](../strategy/movement-leaders-as-ecosystem-layer.md).

### 6.1 The rule

> **Organizations are the primary implementation audiences.
> Movement leaders are a distinct trusted-voice and ecosystem layer, not merely a parallel funnel segment.**

### 6.2 What that means in practice

| Layer | Belongs in | Does **not** belong in |
| ----- | ---------- | ---------------------- |
| **Organizations** (churches, nonprofits, institutions) | audience architecture (`/organizations`, `/churches`, `/nonprofits`, `/institutions`), pricing, onboarding, implementation service copy, `/assess` | trusted-voice / proof architecture |
| **Movement leaders** | trust and proof architecture, "built with" language, corpus and product explanation, `/voices`, future voice-aware product surfaces | a fourth sibling card beside churches / nonprofits / institutions in any funnel, segment grid, or audience hub |

**Where movement leaders legitimately appear as an audience:** `/movement-leaders` and `/who-is-a-movement-leader` — both framed as *definition and practitioner fit*, not as a parallel funnel. A movement leader should recognize themselves in the five-failures / five-moves shape on `/movement-leaders` — they should not feel they are being sorted into a buyer segment.

### 6.3 Public vocabulary

Default public phrase: **Trusted voices**.
Acceptable supporting language: *voices shaping the work*, *built with trusted movement voices*, *leaders shaping the work*, *in conversation with movement leaders including…*, *shaped with a circle of movement leaders*.
Avoid as the primary public label unless there is a strong reason: *Scenius*, *committed voices*, *ambassadors*, *influencers*, *advisors*, *partners*, *roster*.

**"Scenius" stays internal.** It belongs in code comments, module names (`CommittedVoice`, `COMMITTED_VOICES` in `src/lib/committed-voices.ts`), and occasional explanatory sub-copy for readers who already know the word. It does not belong as an H1 or a nav label.

### 6.4 One-sentence version (for PR descriptions and agent briefs)

> Movement leaders are not primarily a demand-generation segment for Movemental — they are a credibility-bearing, wisdom-bearing, ecosystem-shaping layer of the platform's public identity and future development. Churches, nonprofits, and institutions are the primary implementation audiences.

---

## 7. The mDNA / Alan Hirsch theological spine

This is the layer that most distinguishes Movemental from every other AI-advisory firm in the sector, and it is the one the marketing language carries most carefully — because it is a theological and missiological commitment, not a brand affiliation. Treat this section as a reference for *what sits underneath our vocabulary*, especially when writing for churches, seminaries, or movement-leader audiences.

### 7.1 Movemental is shaped by Alan Hirsch's missional-DNA (mDNA) tradition

**Core claim:** The frameworks Alan has developed across thirty years of missional writing — the *apostolic genius* pattern, mDNA as the latent grammar of movemental Christianity, the church as living system rather than static institution — inform how Movemental thinks about *movement* at the platform level.

**What stays theological (used fully with theological audiences):**

- **Jesus is Lord.** The Christocentric spine. Movemental, in its church-facing work, treats this not as a slogan but as the decisive allegiance under which every other category is reordered.
- **Disciple-making.** The center of gravity for mission. Content that does not form disciples — in churches specifically — is content that has misunderstood its job.
- **Missional-incarnational impulse.** Presence before program. Sending before seating. Everything "movemental" presumes this outward posture.
- **APEST** — apostolic, prophetic, evangelistic, shepherding, teaching — as the fivefold gift-set of a healthy body. Relevant anywhere we talk about leadership formation, staffing, or the shape of a healthy organization.
- **Organic systems.** Living bodies, not machines. This is why "field, not franchise" is how we describe mature networks.
- **Communitas.** Bonded community formed in shared liminal work. This is the kind of community Movemental platform design aspires to enable — not social networking, not audience building.

**What is translated (used with secular / institutional audiences without flattening):**

- **Movement shape** instead of APEST theology when audiences won't carry the full term.
- **Field, not franchise** to describe distributed, self-correcting networks.
- **Scatter → field** to describe maturation from fragmented output to integrated body.
- **Formation over training / adoption** to carry the moral weight without requiring the theological vocabulary.

**Be careful of:**

- using mDNA or APEST in non-church copy without translation (it reads as insider code).
- using *formation* in church copy as if it were a secular synonym for training (it is not — formation is the theological term with the weight of an entire tradition behind it; honor it).
- importing Hirsch's vocabulary into places where the site has not earned the context.

**Primary sources:** Alan Hirsch's corpus (see `article-corpus` skill and `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/` sibling repo for canonical forms). Repo-local: `docs/book-development/manuscript-ordered/` (book chapters carry the translated frame); `docs/arguments/custom-gpt/messaging-01-arguments.md` (claims that cite the tradition).

### 7.2 Why this is Movemental's durable advantage

Most AI-advisory firms are adjacent to church / mission work but not inside the theological tradition. Movemental is a movemental-Christianity project that learned, over years, how to speak to the institutional surface without collapsing the theology underneath. When we say "formation, not training," or "adoption that endures," or "field, not franchise," we are drawing on a theological grammar that the sector has largely forgotten how to speak. That is a moat. Do not apologize for it.

---

## 8. Authority block — why Movemental is a credible "we"

### 8.1 Three authority statements we stand on

1. **Leadership and formation, not tools.** Movemental exists because the work that matters in AI adoption is upstream of any platform decision.
2. **Shaped inside real organizational questions.** Movemental is not a generic SaaS logic applied to mission-driven orgs; it was built in the specific pressures of nonprofit, church, and institutional leadership.
3. **Conditions before capabilities.** We insist on the foundation before the downstream. That order is the difference between adoption that lasts and adoption that quietly repriced your voice.

**Lives at:** `/` authority block.

### 8.2 Co-founders and origin

- **Alan Hirsch** — movemental / missional corpus; long field credibility in movement Christianity.
- **Brad Brisco** — missional practice inside institutions; denominational-scale experience.
- **Josh Shepherd** — operator and builder; platform from a decade of leader-facing work; accountable voice inside the AI moment itself.

**Origin story (as told on `/`):** AI made visible what was always there — fragmentation under mission. Three streams converged: a movemental missional corpus, institutional missional practice, and an operator who had been quietly building infrastructure for serious content since before the current AI wave was a cultural event. The convergence is not a coincidence; it is the shape the problem required.

**Be careful of:** turning the three names into a celebrity stack. The authority is the convergence, not the individual fame. Names carry weight when the shape of the work around them carries weight.

### 8.3 Trusted voices (the ecosystem layer)

Read §6 if you have not. Trusted voices are the trust and proof architecture. They live on `/voices` and show up as *built with* / *shaped with* language on narrative pages. They are not a roster, not a recruitment surface, and not a fourth audience segment.

---

## 9. Proof and credibility architecture

The claims in this section are how Movemental *earns* the right to say everything above. They run through almost every public surface.

### 9.1 Credibility vs influence

**Short form:** *Credibility is stewarded. Influence is broadcast. They are not the same currency.*
**Longer form:** Influence can be rented, gamed, amplified, and inflated. Credibility is relational, domain-specific, conferred by communities, and earned over time. In the AI era — where influence metrics are the most gameable they have ever been — credibility is the asset that still works, and the work of keeping it is closer to stewardship than to marketing.
**Lives at:** book chapter on credibility; C-A02 and related cards in `messaging-01-arguments.md`.

### 9.2 Network verification (scenius, publicly named as trusted voices)

**Short form (public):** *Trust is traceable when credible people put their name next to yours.*
**Longer form:** In AI-saturated conditions, isolated expertise is fragile. A voice that no one vouches for, no one corrects, no one cites publicly, is a voice whose mistakes will land without a net. The credibility mechanism that still works is a network of aligned peers who reference each other's work, build on each other's ideas, and create mutual accountability — signals exponentially harder to fake than individual metrics. Brian Eno's word for this pattern is *scenius*; our public label is *trusted voices*; the substance is the same.
**Lives at:** `/voices`; argument card C-A01 in `messaging-01-arguments.md`; book Ch. 9 (legacy spine) or the corresponding chapter in the fragmentation manuscript — **verify against `BOOK_SPINE` in `src/lib/book-types.ts`**.

### 9.3 Voice preservation

**Short form:** *Extensions of the work must still sound like the work.*
**Longer form:** A common failure mode of AI-assisted publishing is a year-long drift toward sector-average prose. Voice preservation is the deliberate refusal of that drift. It is a combination of explicit voice artifacts (style guides, sample corpora, named do-not-do lists) and a formation practice that teaches staff to hear the drift before it ships.
**Lives at:** home; book; `docs/articles/ai-with-integrity.md`.

### 9.4 Inspectability

**Short form:** *Claims point to chapters, articles, or assessments — not vibes.*
**Longer form:** When we make a structural claim, we link to the artifact that develops it. That is a discipline, not a nicety. Readers who want to test the idea can. Agents who want to cite it correctly can. And the public mass of linked artifacts is itself a form of E-E-A-T, because it demonstrates that the argument has pieces a serious person could touch.
**Lives at:** `docs/build/prompts/strategy-artifacts-placement-and-flow.md`.

### 9.5 Handle platform stats carefully

Quantified proof claims that have circulated in older decks and copy cards should be treated as **assertions requiring verification** against the current product before republishing. If a number cannot be defended in the room where it would be challenged, it does not go in customer-facing copy.

---

## 10. SEO, GEO, and discoverability doctrine

Most mission-driven leaders were right to ignore the loudest version of SEO. That reading is preserved. What has changed is *how discovery works now*, and what it asks of a serious publisher.

### 10.1 The shift from ranking to being quoted

**Short form:** *Being findable is now the same question as being quotable by a machine in a helpful way.*
**Longer form:** For years, discoverability was "rank well on ten blue links." Today a user often gets an on-page generative answer that satisfies intent without clicking through. The practical consequence is that the unit of discoverability has shifted from *the page that ranks* to *the passage that can be quoted by a model inside someone else's answer*. Crisp, well-segmented passages with clear authorship are the form the new layer rewards.

### 10.2 E-E-A-T as north star

**Short form:** *Experience, expertise, authoritativeness, trust — and trust is weighted heaviest.*
**Longer form:** Google's Search Quality Rater Guidelines are not a ranking signal in the transparent sense, but they are the cleanest public statement of what durable authority looks like: clear authorship, transparent sourcing, editorial standards, pages that reduce harm. The work is boring. Bylines. Sourcing. Harm reduction. Pages a careful reader would respect. That orientation works for classic search *and* for the extractive tendencies of models that prefer well-segmented passages.

### 10.3 GEO — generative engine optimization

**Short form:** *Structured, well-attributed, citation-friendly content lifts visibility inside generative answers.*
**Longer form:** Aggarwal et al. (arXiv:2311.09735; KDD 2024) is the foundational academic pointer. Findings: material but bounded lifts from structured interventions, with explicit domain dependence. Treat vendor benchmarks as directional, not gospel. The practical takeaway: write passages a model would quote *well*, and surround them with the connective tissue (authorship, dates, links, sibling articles) that lets a generative answer include you without embarrassing anyone.

### 10.4 Treat the site as a graph, not a homepage

**Short form:** *Depth without legible, connected public presence loses more often than it should.*
**Longer form:** Movemental's `/articles` library is not a blog. It is an authority graph — canon, guides, playbooks, and case studies wired to each other so that a reader arriving through any door ends up inside a coherent argument. Each piece is a node. Links are votes. The linked graph is increasingly how durable expertise gets surfaced.

**Lives at:** `/articles`; `docs/articles/LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md`.

### 10.5 What we do not do

- We do not farm thin content.
- We do not publish assistant-generated essays.
- We do not inflate volume at the cost of coherence.
- We do not replace `/articles` with `/blog` — `/blog` exists (`src/app/(site)/blog/page.tsx`) but is **not** the canonical long-form library and does not fork vocabulary.

---

## 11. Offerings, motion, and diagnostics

How the commercial surface actually works. Keep these roles clean — each surface does a specific job and should not be collapsed with its neighbor.

| Surface | Job | Do not merge with |
| ------- | --- | ----------------- |
| **`/contact`** | Primary commercial entry — *Start a conversation* / *Start with clarity*. Almost every primary CTA lands here. | — |
| **`/services`** | Engagements hub — what working with Movemental actually looks like. | pricing, methodology (cross-linked, not collapsed) |
| **`/services/sandbox-season`** | The flagship bounded engagement — a structured season (e.g. 12-week) where the organization does Safety → Sandbox work with Movemental alongside. The exemplar at `/services/sandbox-season/exemplar` shows what graduation looks like. | generic "pilot" framing |
| **`/pricing`** | Engagement economics. | the engagement itself |
| **`/methodology`**, **`/methodology/eight-patterns`** | How the work runs. Eight patterns is the distilled operational playbook. | `/fragmentation` (which is the *story*, not the method) |
| **`/assess`** | Assessments hub with three entry points; hosts **system readiness** at `#system-readiness`. | `/assessment-new` |
| **`/assess/formation`** | Formation maturity snapshot — a narrower diagnostic focused on staff formation. | operational readiness |
| **`/assessment-new`** | **Dual-intelligence × stages × infrastructure** diagnostic — *where is our bottleneck?* This is the philosophy-level instrument, not operational readiness. | `/assess` system-readiness |
| **`/resources/templates`** | Template pack request page. | content marketing |
| **Newsletter** | "One note per month" — the lowest-friction way to begin a quieter relationship with Movemental before any commercial conversation. | `/contact` |

**Redirects worth knowing (see `next.config.ts` for the full list):** legacy `/system-builds/*`, `/services/discovery-lab`, `/services/organizational-systems`, `/services/system-builds`, `/manifesto`, `/apply`, `/inquiry` all **301 → `/contact`**. `/how-it-works/*`, `/vision`, `/movemental-at-100`, `/knowledge-ecosystem` **301 → `/fragmentation`**. `/evidence`, `/case-studies` **301 → `/faq`**. Link behavior and code must match the live redirect table.

---

## 12. Artifact system — where arguments live

Every major argument has exactly one place that owns it. If two artifacts appear to own the same argument, that is a drift bug to fix.

| Artifact | URL / path | Owns |
|----------|------------|------|
| **Book** (*From Fragmentation to Movement*) | `/book`, `/book/read/[slug]` | The full **two-intelligences + six-stages** thesis, at book pacing. |
| **AI Stewardship Sequence field guide** | `/articles/ssss-field-guide-for-organizational-leaders` | The **Safety → Solutions** operating path. Links to the book for the longer arc. |
| **Fragmentation story** | `/fragmentation` | The **experiential** six-stage public narrative — scatter to field, walked, not explained. |
| **Home** | `/` | The **compressed** argument; points to book + field guide + fragmentation. |
| **The Movemental Thesis** | `docs/articles/the-movemental-thesis.md` | The **single-essay synthesis** — moment, problem, path, future in one read. |
| **Articles (canon / guides / playbooks)** | `/articles`, `/articles/archive`, `/articles/[slug]` | **Authority and discovery** — the authority graph; same vocabulary as book and fragmentation. |
| **Sandbox canon hub** | `/articles/sandbox`, `/articles/sandbox/[slug]` | Sandbox-specific canon articles; separate from services page. |
| **Playbooks** | `/articles/playbooks` (audience-tagged) | Per-audience integration patterns. |
| **Book manuscript (ordered)** | `docs/book-development/fragmentation-manuscript-ordered/` (legacy `manuscript-ordered` trees preserved) | Reader SSOT per `messaging-00` and `book-types.ts`. |

**Rule of thumb:** The book owns the sustained thesis. The field guide owns the operating path. `/fragmentation` owns the experience. Everything else points to those three.

See: [`docs/build/prompts/strategy-artifacts-placement-and-flow.md`](../prompts/strategy-artifacts-placement-and-flow.md).

---

## 13. Voice, vocabulary, and guardrails

### 13.1 The use / avoid table

| Use | Avoid in new public copy |
| --- | ------------------------ |
| **The AI Stewardship Sequence** (spell out Safety, Sandbox, Skills, Solutions on first mention) | *SSSS*, *4S* as primary label |
| **Informational** and **relational** intelligence | "community" as a stand-in for relational without naming tradeoffs |
| **Integration** (load-bearing) | collapsing the six stages into "our process" with a different order |
| **Formation** (versus training) | "upskilling" as a substitute for judgment formation |
| **Trusted voices** (public) | *Scenius* as H1 or nav; *influencers*, *ambassadors*, *partners*, *roster* as the primary public label |
| **Field** (scatter → field) | inconsistent use of "ecosystem" that means something else in each surface |
| **Grounded** vs **ungrounded** AI | unguarded "AI-powered" with no foundation story |
| **Movemental as infrastructure / foundation layer** | "platform" alone when it implies *another siloed tool* |
| **Organizations** as primary audience | listing movement leaders as a fourth sibling beside churches / nonprofits / institutions |
| **Adoption that endures** | "responsible AI" as the only moral frame |
| **Coherence** as a named value | "aligned" used as wallpaper |

### 13.2 Tone posture

**We are:** calm, first-person when appropriate, accountable, specific, willing to name what we got wrong.
**We are not:** hype-forward, futurist, contrarian-for-its-own-sake, consulting-genre, pastoral-pamphlet, or insider-coded.
**House prose style:** Inter-set editorial; sentences that reward a second read; lists only when lists do the work better than paragraphs; no fake em-dash cadence; no emoji; no "In today's fast-paced world" anywhere, ever.

### 13.3 Phrases to protect (near-verbatim)

- *The only adoption that endures is the one your organization can still recognize as itself a year later.*
- *Who is willing to lose a little reach to protect your formation?*
- *Amplify what is real; refuse to simulate what is not.*
- *There is a wiser way to navigate AI.*
- *This is not primarily a tools problem.*
- *Safety first — but not the end.*
- *Scatter → field.*
- *Field, not franchise.*
- *Formation, not training.*

These sentences have earned their position and should not be rewritten for novelty.

---

## 14. UI and design posture

Full spec lives in [`docs/design/DESIGN.md`](../../design/DESIGN.md) ("The Digital Curator"). Quick orientation for anyone writing or reviewing surfaces:

- **Light-primary editorial site** with an optional global dark mode via `html.dark` + `next-themes`. **Dark hero bands** inside light pages use `variant="midnight"` (`bg-inverse-surface`) for regional contrast.
- **Semantic tokens only.** `bg-background`, `bg-section`, `bg-card`, `bg-elevated`, `bg-inverse-surface`, `text-foreground`, `text-muted-foreground`, `bg-primary`. Never raw hex, never `bg-white` / `bg-black` / `bg-blue-600`.
- **No 1px borders for sectioning.** Depth comes from tonal stacking — a `bg-card` block sitting on a `bg-section` background is the gold standard. Borders only for form-field accessibility (`border-border`).
- **No pasted-on drop shadows.** If elevation is truly needed, use `shadow-ambient`. Otherwise rely on Ghost Lift.
- **Primary is a light-switch,** not a wash. `#0053db` is for actions and high-priority focus only. Subtle `primary → primary_dim` 135° gradient is allowed for CTAs; no other gradients.
- **Never pure black.** Use `text-foreground` (resolves to an ink-like `#2a3439`) or `bg-inverse-surface` for dark elements.
- **Inter only.** Loaded via `next/font/google` in `layout.tsx`. Display headings carry `letter-spacing: -0.02em`; labels are uppercase with `letter-spacing: 0.05em`.
- **Breathing layout.** If a component feels crowded, increase padding — never shrink type to fit. Tokens: `--container-max: 1200px`, `--prose-max: 680px`, `--section-y-sm: 80px`, `--section-y-lg: 120px`.

**Stitch discipline:** new screens come from the pinned Stitch project `2208910962065880866`. Follow [`docs/build/prompts/stitch-to-react-migration.md`](../prompts/stitch-to-react-migration.md) for the mechanical translation.

---

## 15. Business model and commercial motion

Movemental is an **advisory-and-implementation** business with a supporting authority-content system. Not SaaS. Not pure consulting. The motion is deliberate:

**The funnel, stated plainly:**

1. **Discover** — a reader finds a canonical piece (`/fragmentation`, the thesis, a field guide article, the book) through search, generative answer, referral, or trusted-voice endorsement.
2. **Orient** — they read a second piece that sharpens the diagnosis (*This Is Not a Tools Problem*, *Why Order Matters*, the two equal errors).
3. **Self-assess** — they take one of the diagnostics: `/assessment-new` for philosophy-level ("where is our bottleneck?") or `/assess` for operational readiness.
4. **Begin quieter** — the newsletter is the lower-friction option for readers who want to stay connected without a commercial conversation.
5. **Talk** — the primary conversion is `/contact` → a real conversation. The CTA copy on every major surface points here.
6. **Engage** — a structured engagement, most often Sandbox Season (`/services/sandbox-season`), which is a bounded container that works through Safety and Sandbox in real organizational time.
7. **Hand off** — the engagement ends when the organization can run the next cycle on its own (see *Solutions: What Deployment Looks Like When the Order Was Right*).

**What this model does not do:**

- it does not sell licenses as the primary object.
- it does not sell "an AI strategy" as a deliverable divorced from the organization's own practice.
- it does not keep the consultant in the room forever (the handoff test is load-bearing).
- it does not scale by adding salespeople; it scales by adding trusted voices, corpus integrity, and authoritative articles.

**Primary ICP:** senior leaders of mission-driven organizations (churches with public teaching voice; nonprofits with board-grade responsibility; seminaries and institutions carrying inherited work) who are aware they cannot keep deferring the AI question.

**Secondary ICP (via ecosystem layer, not direct funnel):** movement leaders whose own work has fragmented and who recognize themselves in the `/movement-leaders` diagnostic.

**Economics — write and revise carefully.** `/pricing` currently articulates the economics, and any number quoted publicly should match it. Do not invent numbers. Do not inflate numbers. If the number cannot be defended in the meeting it would be tested in, it does not ship.

---

## 16. Concept → where to go (lookup)

| You need to say… | Open first |
| ---------------- | ---------- |
| The wiser way / two errors / stakes | `src/components/sections/home/home-concept-modern-page-content.tsx` |
| How the Sequence and the six-stage arc pair | same file (`#path` + paragraph on *on-ramp vs road*); also the thesis article |
| Book vs field guide | [`docs/build/prompts/strategy-artifacts-placement-and-flow.md`](../prompts/strategy-artifacts-placement-and-flow.md) |
| Routes, nav, redirects | [`docs/arguments/SITE-SSOT.md`](../../arguments/SITE-SSOT.md); `src/components/nav/nav-links.ts` |
| Organizations vs movement leaders | [`docs/build/strategy/movement-leaders-as-ecosystem-layer.md`](../strategy/movement-leaders-as-ecosystem-layer.md) |
| The whole thesis in one read | `docs/articles/the-movemental-thesis.md` |
| This is not a tools problem | `docs/articles/this-is-not-a-tools-problem.md` |
| Why order matters / Safety first | `docs/articles/why-order-matters.md`; `docs/articles/safety-before-speed.md` |
| Solutions done right (deployment + handoff) | `docs/articles/solutions-deployment.md` |
| Scenius / network credibility | `docs/arguments/custom-gpt/messaging-01-arguments.md` (C-A01); current book chapter (verify against `BOOK_SPINE` in `src/lib/book-types.ts`) |
| Discernment / finding a guide | `docs/articles/finding-ai-guidance-worth-trusting.md`; book Ch. 4 *Finding a Guide* |
| Credibility how it works | `docs/articles/guide-ai-credibility-2026.md`; `docs/articles/credibility-how-it-works-video.md` |
| Dual intelligences (philosophy) | book Ch. 2; `/assessment-new` |
| AI Stewardship Sequence integrity | `src/lib/ssss-integrity-assessment/`; `/articles/the-ssss-framework`; `/articles/ssss-field-guide-for-organizational-leaders` |
| Linking / E-E-A-T / GEO discipline | `docs/articles/LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md` |
| Design system | [`docs/design/DESIGN.md`](../../design/DESIGN.md) |
| mDNA / Alan Hirsch tradition | `article-corpus` skill; sibling repo `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/` |
| Article library index | `src/lib/articles.ts` + `messaging-00` §6 |

**Book chapter slugs:** always derive from `BOOK_SPINE` in `src/lib/book-types.ts`, never from guessed paths.

---

## 17. The 173-claim corpus (mechanical index)

For any claim not captured at the semantic level above, drop into the per-card corpus.

- **Deduplicated viewer:** `docs/html/deduped-megapage.html` — **173 unique** items, **246** merged sources.
- **Per-tab view:** `docs/html/tabbed-argument-page.html` (16 tabs, ordered cards).
- **Machine list:** `docs/html/argument-ids.json` (when present after generation).
- **Regeneration:** `node scripts/extract-arguments.mjs` → `messaging-01` … `messaging-08`.
- **Category buckets** (from `docs/html/deduped-megapage.html` — update if the HTML is regenerated):
  Arguments 35 · Pain points 14 · Selling points 7 · Positioning 12 · Features & capabilities 36 · Theology & formation 17 · Strategy 28 · Proof & credibility 14 · Business model 4 · Audience 5 · AI posture 1.
- **Strength filter:** High 128 · Medium 43 · Low 2.
- **Merge filter:** Merged clusters 35 · Unique-only 138 (same 173 total).
- **Crosswalk:** `docs/build/audit/tabbed-argument-vs-react-pages.md` — maps legacy tab labels to live routes. Many "page" labels in YAML are stale (see `SITE-SSOT` §8).

**To be exhaustive on micro-claims,** use the 173 cards. **To decide what matters most and how pieces fit,** use this index.

---

## 18. Maintenance and governance

This document ages when the site ages. Revise it when any of the following happens:

1. **Positioning shifts.** Hero H1, primary audience, or the *wiser way* framing changes → revise §1 and §6.
2. **A framework is added, retired, or re-named.** → revise §3 and §13.1. Any deprecation of vocabulary must carry through to `DESIGN.md`, nav labels, and `SITE-SSOT.md` in the same PR.
3. **An audience doctrine shifts.** → revise §6 and update the canonical doctrine doc if it is the one moving.
4. **Route or nav changes ship.** → revise §11, §12, §16, plus `SITE-SSOT.md` and `docs/build/audit/site-pages-inventory.md`.
5. **A new canonical artifact launches** (major assessment, new hub, new book chapter set). → revise §12 and the lookup in §16.
6. **A new trusted voice is onboarded.** → update `/voices` and §8.3, not this file's shape.

**Sibling updates (easy to forget):**

- After any home-page change, update `docs/arguments/custom-gpt/messaging-00-live-site-and-narrative-ssot.md`. The extract script does not do it.
- After any deprecation of a slogan or acronym, grep the full repo for the old form and kill orphan uses.
- After any copy change that shifts how we describe *what integration produces*, verify the `/` foundation section and the corresponding book chapter are still coherent.

---

*End of index. For a literal listing of all 173 deduplicated claims, use the Custom GPT bundle or the deduped HTML. Use **this** document to decide **what matters most** and how the pieces fit — and to find the current, best way we are saying any of it.*
