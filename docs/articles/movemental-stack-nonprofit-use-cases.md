---
title: "The Movemental Stack, Plainly: A Framework, A Rubric, and 20 Nonprofit Use Cases"
slug: movemental-stack-nonprofit-use-cases
shape: guide
author: Josh Shepherd
audience: [nonprofit]
topics: [ai-posture]
---
# The Movemental Stack, Plainly: A Framework, A Rubric, and 20 Nonprofit Use Cases

**Purpose.** Describe the stack Movemental uses — in non-technical language — then show how to apply it to new use cases, how to score any proposed use case on a 0-100 scale, and how twenty realistic nonprofit use cases rank when the rubric is applied. Along the way, show the process, not just the conclusions. The aim is a legitimate, Movemental-approached set of candidates, with the reasoning visible.

**Audience.** Executive directors, program leaders, development staff, and technically-inclined board members. No engineering background required.

---

## Part 1 · The Stack, In Plain Language

Movemental runs on a deliberately small, modern web stack. The choices are not exotic, and that is the point. The stack is optimized to do three things well: hold an organization's content as structured, searchable data; let AI agents work *against that content* without inventing new content; and keep humans in the loop at every decision that matters.

Here is what that looks like without the jargon:

- **A website framework that renders on a server.** Pages arrive fast, work without JavaScript, and can call a database on the way. This is how a reader on a slow connection still sees a full page of text, and how a staff member in an admin area sees their own data instead of someone else's.
- **A database that belongs to the organization.** Every book chapter, article, donor record, program session, and transcript sits in a Postgres database with strict access rules. The data is the organization's asset. The tools read and write it; they do not own it.
- **A type-safety chain from database to user interface.** Six layers, each checked against the one below it: database schema → validation rules → business logic → HTTP routes → data-fetching hooks → UI components. In practice, this means that if a field is renamed in the database, the system tells you where in the UI that field is used, before anything breaks in production. The point is not elegance; the point is that changes do not silently rot.
- **Agents that work against a corpus.** An "agent" is a program that uses a large language model (OpenAI, Anthropic, Google) to do something useful. In this stack, agents are *grounded*: they search the organization's own corpus with vector search, cite passages, and return answers that can be traced back to source. They are not free-floating chatbots.
- **Guardrails around what agents can do.** Every agent has instructions that describe its voice, its forbidden moves, and the decisions it cannot make on its own. Some agents need human approval before sending output to anyone outside the organization. Some are read-only. Some are allowed to draft but never to publish.
- **Observability, so you can see what happened.** When something breaks or an agent produces something odd, logs and error reporting exist so a human can go look. "AI did it" is not an acceptable explanation; somebody has to be able to reconstruct the chain.
- **Deployed in a way that is easy to change.** Every merge to the main branch deploys to a staging URL automatically; promoting to production is a deliberate act. Rollbacks are one click. This lowers the cost of trying things and raises the cost of shipping carelessly — exactly the right direction.

If you squint at this list, you can see the shape of the philosophy. **Content is owned. Types are enforced. Agents are grounded. Humans decide.** Everything else is implementation detail.

### What the agents are actually doing

Across Movemental's family of repos (the marketing site, the dashboard, the AI lab, the book experiences, the nonprofit operating templates), the agents fall into a small number of shapes:

- **Search-and-cite agents** that let a user ask a question in natural language and return passages from the corpus with citations.
- **Style-checker agents** that read a draft and report whether it sounds like the author — not whether it is correct, but whether it is *in voice*.
- **Structure agents** that take a long form (a sermon, an interview transcript, an evaluation report) and propose an article-shaped version of it, leaving the final edit to a human.
- **Translation and transcription pipelines** that run long-running jobs — translating a book into Spanish, transcribing a conference — and land the result back in the corpus where it can be verified.
- **Research synthesizers** that read across many documents and write a short brief with source links.

What none of these agents do, by design, is publish on their own. Every path ends at a human review step. This is not polite restraint; it is architectural. Agents that could publish on their own would be a different, riskier system.

---

## Part 2 · A Framework For Finding Valuable Use Cases

Before we score anything, we need a frame for what "valuable" means. Most AI pitches implicitly assume that value equals productivity equals output-per-hour, which is a poor frame for a nonprofit, and arguably a poor frame for any organization that cares about what its people are actually doing.

Movemental's working frame has three axes of value and one constraint that overrides all three.

### Axis 1 · Time saved, *wisely*

Time saved is only valuable when the saved time is redeployed into higher-order work. A grant writer who saves eight hours a week by having an assistant pre-fill boilerplate is genuinely more valuable if those eight hours become deeper funder research, better relationship work, or rest. She is not more valuable if those eight hours become more grant applications of lower quality. The distinction matters. Time saved that gets poured back into the same task at the same level is not a win; it is a treadmill.

**Question to ask:** If this tool saves this person X hours per week, what will those hours become? If the answer is "more of the same," the use case is weak even if the time savings are real.

### Axis 2 · Money earned (or sustained)

Revenue possibilities for a nonprofit look different than for a business. They include:

- **Fundraising uplift** — higher response rates on appeals, larger major gifts, better donor retention.
- **Grant capture** — more proposals, better-targeted proposals, a higher win rate.
- **Earned revenue** — course sales, paid subscriptions, licensed content, consulting.
- **Cost avoidance** — not having to hire for a role that AI genuinely augments, or avoiding an expensive vendor because you built the capability in-house.

The watch-out here is attribution. It is easy to claim that AI "drove" a revenue outcome when the actual driver was a human relationship, a timely campaign, or a macro trend. Honest measurement requires that the use case produce a *counterfactual* — what would have happened without this tool — not just a post-hoc story.

### Axis 3 · Quality of work improved

This is the axis most often skipped, and it is the one that most often produces durable value. Quality shows up as:

- **Fewer errors.** A translation that is internally consistent across a three-book series. A donor letter that does not get the donor's program history wrong.
- **Greater depth.** A board briefing that references the actual policy history, not the communications director's memory of it.
- **Greater coherence.** An organization that sounds like itself across every surface, because there is a corpus and a voice model holding it together.
- **Greater accessibility.** Plain-language versions of dense documents, translations into the languages the organization actually serves, alt-text that is accurate rather than generic.

Quality improvements compound. Time savings are spent once; a quality gain — "we no longer confuse governance with ethics in our decision-making" — keeps paying dividends.

### The overriding constraint: human flourishing and the sacred value of human work

None of the three axes are worth anything at the expense of human flourishing. Concretely, this rules out a class of use cases that are technically feasible and economically attractive:

- **Use cases that displace the sacred core of human work.** Pastoral care, therapy, case management with vulnerable populations, mentorship, spiritual direction. These are not tasks that benefit from automation; they are the tasks for which human presence *is* the service. A chatbot that "triages" grief is not saving time; it is replacing the thing that was supposed to happen.
- **Use cases that degrade the dignity of the people an organization serves.** Surveillance-style prospect research. Donor scoring that reduces a person to a predicted gift size. Automated outreach that pretends to be personal.
- **Use cases that hide AI involvement where disclosure is ethically required.** A fundraising appeal that is AI-drafted and signed by an executive director without disclosure. A "personal" note that is not personal.
- **Use cases that accelerate workloads onto staff without asking whether the workload was the right size in the first place.** If your fundraisers are burning out, the answer is not an AI that helps them write more appeals; the answer might be fewer, better appeals.

In short: **time, money, and quality are legitimate value axes — and none of them is worth anything if it comes at the cost of a human who was supposed to be served, formed, or respected by the work.**

That constraint is not a separate category to apply later. It is the frame through which the three axes are read.

---

## Part 3 · A Guide to Applying the Stack to a New Use Case

Given a candidate use case — "we want an AI that does X" — Movemental's pattern for evaluating and building it proceeds in seven steps. Most of the steps are not technical. The technical steps come last, after the hard thinking.

### Step 1 · Name the human it serves

Before any diagrams, write one sentence: *This tool exists so that [named role or person] can [verb] [specific thing] in less time, with more depth, or with fewer errors — because currently they [current painful reality].* If the sentence cannot be written, the use case is not yet real.

### Step 2 · Locate the corpus

The stack is most powerful when AI is grounded in a real corpus of the organization's own content. So: what is the corpus? Books, articles, program manuals, past grant proposals, sermon transcripts, policy documents, case studies, donor CRM history, survey data. If the corpus does not exist, the first build is ingestion, not agents.

If the "corpus" is really "the open internet," pause. The stack *can* do that, but the value ratio drops fast and the slop risk rises. Open-web-grounded agents need much stricter human review.

### Step 3 · Decide what the agent is allowed to do

Three levels, in increasing risk:

- **Read-only.** The agent searches, cites, summarizes. It cannot modify data or send messages. Safe default.
- **Draft-only.** The agent produces drafts — emails, articles, summaries, translations — that are saved as drafts and require human approval before any external send or publication.
- **Action-taking.** The agent can actually send, publish, or modify state. This level should be rare, narrow, and instrumented.

Most worthwhile nonprofit use cases are level 1 or level 2. Level 3 should be reserved for reversible, low-stakes actions (e.g., filing a transcript, tagging an asset).

### Step 4 · Identify the disclosure posture

How will this tool be described to donors, staff, program participants, and the public? Written down, in plain language, before the tool is built. Not after. The disclosure posture drives design choices (a tool that requires disclosure needs a visible marker; a tool that does not require disclosure should be invisible to the end user).

### Step 5 · Set up the data layer first

Before any agent code: the database schema. What tables, what relationships, what access rules. Who can see what. What is tenant-scoped (for multi-org setups), what is user-scoped, what is org-wide. In the Movemental stack, this is Drizzle ORM on Supabase Postgres, with row-level security on any table that holds person-level data.

Only after the data layer is stable do you add the service layer (business logic), then routes, then hooks, then UI. The six-layer chain exists to prevent the #1 failure mode: building a beautiful front-end against a shape that the database cannot actually support.

### Step 6 · Build the agent with a calibrated voice

If the agent produces text, it needs a voice model. For Movemental, that means a voice extraction pass against a representative corpus slice, naming markers ("Christocentric anchoring 30%," "pastoral warmth 20%," etc.), failure modes ("never corporate consultant," "never detached academic"), and a fidelity rubric. For a new nonprofit, the pass looks different — but the structure is the same: named dimensions, weights, failure modes, measurable targets.

Without a voice model, the agent produces generic content, which degrades the organization's coherence and is the most common slow-burn cost of careless AI adoption.

### Step 7 · Ship behind a review step, then measure

The first version goes live as a draft-only tool with explicit human review. Logs capture what the agent produced, what the human changed, and what the human rejected. After a few weeks, the logs answer the measurement questions from Part 2: did this save real time, did the saved time go somewhere useful, did quality improve, did errors decrease?

If the answer is no, the tool gets retired. This is the discipline most organizations miss. *Not retiring a tool that did not earn its keep is its own form of cost.*

---

## Part 4 · A Rubric for Scoring Any Proposed Use Case (0-100)

What follows is a simple, additive rubric. Eight dimensions, weighted to total 100. Each dimension is scored, the total is summed, and the result maps to a rough verdict band. The rubric is meant to be applied honestly — giving yourself full marks on dimensions you have not actually thought through defeats the purpose.

### The dimensions

| # | Dimension | Max | Question |
|---|-----------|-----|----------|
| 1 | **Mission fit** | 15 | Does this serve a core mission outcome, or is it an operational convenience? |
| 2 | **Corpus availability** | 10 | Does the organization already have the structured content this depends on? |
| 3 | **Stack fit** | 10 | Is this a natural fit for a Postgres + agents + grounded-retrieval stack, or is it a poor fit being forced? |
| 4 | **Measurable value — time, money, quality** | 20 | Can the value be measured, and is the measurement honest (counterfactual, not vanity)? |
| 5 | **Human flourishing** | 20 | Does this dignify, augment, and free human work — or does it displace a sacred core? |
| 6 | **Data privacy & consent** | 10 | Is the data handled with the privacy and consent posture the constituents would expect if they saw it? |
| 7 | **Reversibility** | 5 | If this tool produces a bad output, can the consequences be reversed cleanly? |
| 8 | **Authorship integrity** | 10 | Does the corpus stay human-authored, and does AI output stay clearly labeled and human-reviewed? |
| | **Total** | **100** | |

### How to interpret the score

- **80-100 · Green light.** No known ethical issues. Build it behind a human-review step, measure for 90 days, retire if it does not earn its keep.
- **60-79 · Yellow light.** Modify and document. Constraints, rules, permissible approaches, and disclosure must be written down *before* the build starts. These are use cases that can be done well, but can also be done badly, and the difference is governance.
- **40-59 · Deep yellow, edging red.** Only with substantial safeguards, a narrow scope, explicit constituent consent where applicable, and an exit plan. Most organizations should not attempt these until they have completed easier wins.
- **Below 40 · Red light.** Do not build. The score is flagging a structural problem — usually human flourishing, privacy, or authorship integrity — that no technical fix removes.

The rubric is not magic. It is a shared vocabulary for disagreement. Two people can score a use case differently and then argue about *which dimension* they disagree on, which is far more productive than arguing about whether AI is good.

---

## Part 5 · Twenty Nonprofit Use Cases, Scored and Ordered

What follows is twenty concrete use cases — drawn from work across churches, service nonprofits, advocacy organizations, and missional networks — each scored against the rubric and ordered by total. For each, the rubric score is paired with the three-axis value assessment (time, money, quality) and a red/yellow/green verdict.

The ranking is not a recommendation to build the top twenty; it is a map. Most organizations should build three to five, not twenty. The bottom of the list is there for pedagogical reasons: some of those use cases are frequently proposed, and their low scores are the point.

> **How to read each entry.** Each use case shows dimension sub-scores in this order: `Mission / Corpus / Stack / Value / Flourishing / Privacy / Reversibility / Authorship` — summing to the total.

---

### 1. Sermon & Talk Corpus Search Agent — 92 / 100 · 🟢 Green

**What it is.** A church, ministry, or thought-leader organization ingests every sermon, conference talk, and teaching session (audio → transcript → structured text). A search-and-cite agent lets staff, podcast producers, and publishing teams ask, "What has the pastor said about vocation in the last five years?" and get passages with timestamps and citations.

**Score.** 14 / 10 / 10 / 18 / 18 / 8 / 5 / 9 = **92**

- **Time saved wisely.** Producers, editors, and researchers currently hunt through YouTube manually or rely on memory. This turns days into minutes, and the saved time goes into better publishing, not more of it.
- **Money earned.** Unlocks derivative products — books assembled from talks, evergreen articles, course modules — that would otherwise never be mined.
- **Quality improved.** Citation density goes up. The organization stops contradicting itself because staff can see what was actually said.
- **Ethics.** Green. The corpus is the organization's own, the agent cites rather than invents, and every downstream use passes through a human editor.

### 2. Grant Proposal Drafting Assistant — 90 / 100 · 🟢 Green

**What it is.** An agent grounded in (a) the organization's past winning and losing proposals, (b) its program outcomes data, and (c) publicly available funder priorities. It produces a first-draft narrative for a specific funder, pulling real outcome numbers from the database and paraphrasing prior language that succeeded.

**Score.** 14 / 9 / 10 / 19 / 18 / 7 / 5 / 8 = **90**

- **Time saved wisely.** Grant writers reclaim the hours spent on boilerplate and redeploy them into funder relationship work, program design conversations, and higher-quality revision passes.
- **Money earned.** A measurable win-rate uplift is plausible, but measurement must be counterfactual (randomize drafts with vs. without the assistant, or compare cohorts), not vanity.
- **Quality improved.** Outcome numbers stop being approximate. Program descriptions stop drifting from what the program actually does.
- **Ethics.** Green. The fingerprints on the final proposal are human; AI assists with drafting, not with representation to the funder.

### 3. Annual Report Draft Compiler — 87 / 100 · 🟢 Green

**What it is.** An agent reads the year's program data, event reports, donor communications, and staff reflections from the database and produces a structured first-draft annual report. A human editor shapes voice, selects stories, and verifies every number against source.

**Score.** 13 / 9 / 10 / 18 / 17 / 7 / 5 / 8 = **87**

- **Time saved wisely.** Two months of compilation becomes two weeks of revision. The communications team's reclaimed time can go into better donor stewardship, not another report.
- **Money earned.** Indirect — a strong annual report supports year-end giving, but the causal link is soft.
- **Quality improved.** Numbers are sourced from the database, not retyped from a summary. Stories are selected by a human from a larger set than would ever be surfaced manually.
- **Ethics.** Green. Disclose in a colophon that AI assisted in compilation.

### 4. Voice-Calibrated Comms Style-Checker — 87 / 100 · 🟢 Green

**What it is.** A credibility agent, in the Movemental pattern — reads any piece of outbound communication (donor letter, blog post, social caption) and reports on voice fidelity, flagging drift toward corporate-consultant prose, jargon, or tonal mismatch. It does not publish. It signals.

**Score.** 13 / 9 / 10 / 17 / 18 / 7 / 5 / 8 = **87**

- **Time saved wisely.** Junior writers receive instant feedback and build voice intuition faster. Editors spend their time on substance, not tone.
- **Money earned.** Indirect — a more coherent voice correlates with donor trust, but not in a measurable short loop.
- **Quality improved.** Directly and visibly. The organization sounds like itself, across every channel.
- **Ethics.** Green. The tool helps humans write; it does not write for them.

### 5. Multilingual Translation Pipeline — 86 / 100 · 🟢 Green

**What it is.** For an organization serving multilingual communities: a batch-translation pipeline for books, articles, and program materials. AI drafts; a human translator reviews; a glossary service keeps terminology consistent across the corpus.

**Score.** 13 / 10 / 10 / 18 / 17 / 6 / 4 / 8 = **86**

- **Time saved wisely.** Makes multilingual publishing financially possible at organizations that otherwise could not afford it. The saved time reaches readers, not just translators.
- **Money earned.** Expands reach into Spanish- and Portuguese-speaking (or other) audiences, with measurable course enrollment and book sales uplift.
- **Quality improved.** A consistent glossary means Book 2 uses the same term for a key concept as Book 1. Human translators review *for* consistency rather than *producing* consistency from scratch.
- **Ethics.** Green, with one note: disclose that AI assisted in translation. Readers care.

### 6. Corpus-Grounded Staff Onboarding Companion — 85 / 100 · 🟢 Green

**What it is.** New staff members ask natural-language questions about the organization — history, positions on issues, program model, policies — and receive answers grounded in the actual policy documents, program manuals, and prior board minutes. Every answer cites source.

**Score.** 13 / 9 / 10 / 17 / 17 / 6 / 5 / 8 = **85**

- **Time saved wisely.** New hires become productive faster. Senior staff are interrupted less often with the same questions, and the saved time goes into mentorship of the deeper kind.
- **Money earned.** Indirect — lower ramp time has a real cost benefit, but it is hard to measure cleanly.
- **Quality improved.** Institutional memory stops being personality-dependent. When a long-tenured staff member retires, their answers are still available in the corpus.
- **Ethics.** Green. Internal-facing, grounded, cited.

### 7. Issue-Area Research Brief Synthesizer — 84 / 100 · 🟢 Green

**What it is.** For advocacy and policy organizations: an agent synthesizes recent academic papers, news, and policy briefs into a short internal research brief with links and caveats. Staff read it before meetings, not instead of the underlying sources.

**Score.** 12 / 7 / 9 / 18 / 17 / 7 / 5 / 9 = **84**

- **Time saved wisely.** Research staff reclaim hours per week, and the saved time should go into original analysis, interviews, and field research — the work AI cannot do.
- **Money earned.** Indirect — better-briefed staff perform better in funder, press, and policy conversations.
- **Quality improved.** Meetings start with a shared, sourced context. Decisions stop being made on whoever-read-what-last-night grounds.
- **Ethics.** Green. Every link is checkable. The brief is explicitly labeled as AI-synthesized; humans read the sources for anything that will be quoted publicly.

### 8. Plain-Language Accessibility Reformatter — 83 / 100 · 🟢 Green

**What it is.** Takes any organizational document — a policy, a program guide, a grant report — and produces a plain-language version (e.g., 8th-grade reading level) alongside the original, plus alt-text for any images. Publishes both versions.

**Score.** 13 / 8 / 9 / 17 / 18 / 6 / 5 / 7 = **83**

- **Time saved wisely.** Accessibility work that used to be cut from the budget becomes routine. The staff time not spent re-writing manually goes into substantive access work — interpretation, translation, community review.
- **Money earned.** Expands audience, including funders who increasingly require accessible materials.
- **Quality improved.** Directly. Constituents with varied reading levels and visual needs can actually access the work.
- **Ethics.** Green. Disclose that a plain-language version is AI-assisted and human-reviewed.

### 9. Volunteer Training Companion — 82 / 100 · 🟢 Green

**What it is.** Volunteers ask questions grounded in the organization's volunteer handbook, program guides, and past FAQs. The companion answers with citations and, when the question exceeds its scope, hands off to a named human staff member.

**Score.** 12 / 8 / 9 / 17 / 17 / 7 / 5 / 7 = **82**

- **Time saved wisely.** Volunteer coordinators are interrupted less; saved time goes into deeper relationships with volunteers who need them.
- **Money earned.** Indirect — better volunteer retention has real financial value, but measurement is slow.
- **Quality improved.** Volunteers receive consistent answers. Edge cases get escalated rather than guessed at.
- **Ethics.** Green, with a design requirement: the companion must know what it does not know and hand off explicitly.

### 10. Podcast / Video → Evergreen Article Generator — 81 / 100 · 🟢 Green

**What it is.** Transcripts of the organization's podcast or video content become the input for a structure agent that proposes article-shaped drafts — a claim, supporting passages, pull quotes, an introduction, a close. A human editor shapes the draft into publication.

**Score.** 12 / 9 / 10 / 17 / 16 / 6 / 5 / 6 = **81**

- **Time saved wisely.** A single interview can become three pieces instead of one. The saved time should go into editorial depth, not content-farm volume.
- **Money earned.** Directly measurable — more evergreen pieces indexed and found by readers and funders.
- **Quality improved.** Human voice stays present because humans write the final. The risk of slop is real if this is run without editorial care; that is why authorship integrity scores slightly lower here.
- **Ethics.** Green, with discipline. The moment this becomes "AI publishes articles from transcripts without meaningful human editing," the score drops sharply.

### 11. Board Meeting Summarizer with Policy Cross-Reference — 80 / 100 · 🟢 Green

**What it is.** After a board meeting, an agent produces a structured summary (decisions, action items, open questions) and cross-references any items that touch existing bylaws, policies, or prior board decisions. A board secretary reviews and finalizes.

**Score.** 12 / 8 / 9 / 16 / 16 / 7 / 5 / 7 = **80**

- **Time saved wisely.** Board secretaries reclaim hours per meeting. Decisions become traceable against policy history without a staff member playing institutional historian.
- **Money earned.** None directly; indirect governance benefit.
- **Quality improved.** Decisions stop conflicting with prior policy by accident.
- **Ethics.** Green. Sensitive personnel items get redacted before the agent ever sees them; document the boundary.

### 12. Constituent Survey Clustering & Theming — 78 / 100 · 🟢 Green

**What it is.** Open-text responses from program evaluation or donor surveys are clustered by theme. The agent produces a thematic summary with representative quotes. A program evaluator reviews the clusters before any quotes are used externally.

**Score.** 12 / 7 / 9 / 16 / 16 / 7 / 4 / 7 = **78**

- **Time saved wisely.** What used to take a researcher a month takes a week. The saved time should go into *conversations* with constituents, not more surveys.
- **Money earned.** Indirect — better evaluation supports better funding narratives.
- **Quality improved.** Patterns the researcher would have missed become visible; the researcher interprets what the clustering surfaces.
- **Ethics.** Green, with a care note: if respondents could be re-identified from quotes, additional redaction is needed before any external use.

### 13. Internal Decision-Map Assistant — 76 / 100 · 🟢 Green

**What it is.** Staff ask, "Who decides whether we can deploy this tool against donor data?" or "What's our process for a media interview?" and the assistant returns the relevant section of the organization's decision map, authority matrix, and disclosure posture — with citations to the actual policies.

**Score.** 12 / 7 / 9 / 15 / 16 / 7 / 4 / 6 = **76**

- **Time saved wisely.** Staff stop asking the same three people the same five questions. The saved time goes into execution of the decisions, not negotiation of who makes them.
- **Money earned.** None directly.
- **Quality improved.** The organization behaves consistently across staff turnover. New leaders inherit the decision map, not just the people who knew it.
- **Ethics.** Green. Internal-facing, grounded in written policy, no external exposure.

### 14. Policy-Change Radar (Public Regulations) — 74 / 100 · 🟢 Green

**What it is.** An agent monitors relevant public regulatory bodies (federal, state, sector-specific) and flags changes that may affect the organization. Each flag includes a short summary, a link to the source, and a tag for which staff should review.

**Score.** 11 / 6 / 8 / 16 / 16 / 7 / 4 / 6 = **74**

- **Time saved wisely.** Compliance staff (or, more often, the ED doing compliance on the side) stop reading dozens of bulletins. The saved time goes into substantive responses to the changes that actually matter.
- **Money earned.** Indirect, but real — missed regulatory changes have occasional large costs.
- **Quality improved.** Fewer surprises. A written trail of what the organization noticed and when.
- **Ethics.** Green. The agent reads public information; human staff decide what to do about it.

### 15. Donor Thank-You Draft Pipeline (Human-Verified) — 68 / 100 · 🟡 Yellow

**What it is.** Incoming gifts trigger a draft thank-you letter that pulls the donor's giving history, the designated program, and a relevant prior interaction from the CRM. A human development officer reviews and signs before anything is sent.

**Score.** 11 / 8 / 9 / 14 / 10 / 6 / 3 / 7 = **68**

- **Time saved wisely.** Real, but the saved time must go into *more substantive donor conversations*, not into a faster pipeline that lets development staff stop writing personally. If the latter happens, the use case has gone wrong.
- **Money earned.** Donor retention depends on felt authenticity; a letter that *feels* auto-generated is worse than no letter. The quality of the human review step is the load-bearing element.
- **Quality improved.** Only if humans genuinely edit. If they rubber-stamp, quality drops.
- **Ethics.** Yellow. Modify and document: a strict rule that no major-donor or relational letter goes out without substantive human editing; a sampling process to audit compliance; a disclosure posture if AI drafted any portion of a donor-facing letter.

### 16. Major-Donor Meeting Prep Briefs — 66 / 100 · 🟡 Yellow

**What it is.** Before a meeting with a major donor, a brief is produced that summarizes their giving history, prior conversation notes from the CRM, program interests, and any recent public activity (their own published writing, organizational affiliations). A human development officer reviews and annotates before the meeting.

**Score.** 11 / 8 / 9 / 14 / 10 / 4 / 3 / 7 = **66**

- **Time saved wisely.** Real — compilation becomes minutes instead of hours — but only if the officer spends the reclaimed time thinking about *the person*, not running more meetings.
- **Money earned.** Plausible uplift, but hard to measure cleanly.
- **Quality improved.** Only if the brief surfaces genuine relational understanding, not a dossier.
- **Ethics.** Yellow. The line between "preparing well" and "surveilling a donor" is real. Rules: internal-only; never includes anything the donor has not made public or shared with the organization; no psychographic scoring; not stored beyond the meeting unless the donor is aware of CRM note practice.

### 17. Alumni Re-Engagement Personalizer — 60 / 100 · 🟡 Yellow

**What it is.** For an organization with program alumni (a course, a fellowship, a cohort): a system that drafts a personalized re-engagement message based on the alum's original program, stated interests, and time since last contact. A staff member reviews before send.

**Score.** 10 / 7 / 9 / 13 / 9 / 5 / 3 / 4 = **60**

- **Time saved wisely.** Real, but the watch-out is the temptation to scale re-engagement volume rather than depth. Ten carefully-drafted messages beat a hundred auto-personalized ones.
- **Money earned.** Possible — alumni giving uplift, referrals — but depends heavily on the voice of the outreach.
- **Quality improved.** Only if the "personalization" reflects real knowledge, not templated slots.
- **Ethics.** Yellow. Rules: the voice must not impersonate a named staff member who did not actually write the message; no pretense of remembered detail that is actually database-pulled; disclose AI assistance if the alum asks.

### 18. Prospect Research Synthesizer — 55 / 100 · 🟡 Yellow

**What it is.** For development teams: an agent reads public sources (news, Form 990s for private foundations, published writing) and produces a one-page brief on a prospect. No private data, no purchased lists.

**Score.** 9 / 5 / 8 / 13 / 8 / 3 / 3 / 6 = **55**

- **Time saved wisely.** Hours per prospect saved, but the reclaimed time must go into *relationship*, not into contacting more prospects on thinner grounds.
- **Money earned.** Plausible; measurement honesty required.
- **Quality improved.** Mixed — the brief is only as good as the sources and only as useful as the relational work that follows.
- **Ethics.** Yellow, tending toward deeper yellow. Rules: strictly public information; no aggregation with commercial data broker sources; no inferred net-worth scoring; the brief is input to a human's judgment, not a ranking mechanism; the prospect, if they asked, should not be embarrassed by what the organization compiled.

### 19. Mentor-Matching Assistant — 52 / 100 · 🟡 Yellow

**What it is.** For a fellowship, cohort, or professional-development program: an agent proposes mentor-mentee pairings based on stated goals, backgrounds, and availability. A human program director reviews and finalizes every match.

**Score.** 10 / 6 / 8 / 11 / 8 / 5 / 2 / 2 = **52**

- **Time saved wisely.** Real, but small; a program director who used to match by hand spends less time, which is fine, not transformative.
- **Money earned.** None directly.
- **Quality improved.** Uncertain. Human matchers often catch subtle fit factors that an agent cannot infer.
- **Ethics.** Yellow. Significant bias risk: an agent trained on prior matches can perpetuate patterns (gender, race, class) that a thoughtful program director would disrupt. Rules: never the sole decision; blind-audit matches for demographic bias; the agent's proposals are a starting list, not a ranking.

### 20. Case-Management Note Summarization (Sensitive Populations) — 40 / 100 · 🔴 Red

**What it is.** For a nonprofit serving youth, refugees, survivors of violence, or other high-sensitivity populations: an agent reads case-management notes and produces summaries for supervision, handoffs, or reporting.

**Score.** 8 / 7 / 8 / 10 / 3 / 2 / 1 / 1 = **40**

- **Time saved wisely.** Real, but the work being "saved from" is the work of knowing a person. A supervisor who reads a human-written note is doing formation work; a supervisor who reads an AI summary is doing a lesser version of it.
- **Money earned.** None.
- **Quality improved.** Likely negative at the level that matters. Summaries flatten nuance; the nuance is the thing.
- **Ethics.** Red. The data is among the most sensitive an organization holds. The population is among the most vulnerable. The work is among the most relational. Even with strict privacy controls, the act of having an LLM ingest these notes introduces a risk and a distortion that the modest time savings do not justify. If supervision is overloaded, the correct answer is more supervisors, not AI summaries.

---

## Part 6 · What The Ranking Reveals

A few patterns, once the scores are laid out side by side.

**The highest-scoring use cases are all corpus-grounded and internal-first.** Grants, annual reports, sermons, translations, staff onboarding. The pattern is not an accident. Corpus-grounded use cases inherit the ethical and quality properties of the corpus they are grounded in. Internal-first use cases have one more layer of human review between the agent and the outside world. Together, these two properties cover most of what makes a use case safe and valuable.

**Donor-facing use cases are uniformly yellow, not because they are unethical but because the margin for error is narrow.** A donor letter, a meeting brief, a re-engagement message — each of these can be done well and can be done badly, and the difference is almost entirely in whether a human is *genuinely* engaged with the output. When the rubric scores these lower, it is flagging that temptation. An organization that deploys a donor-thank-you pipeline without deeply disciplined review has built a machine for degrading donor trust at scale.

**Use cases that touch sacred human work score low, and should.** Case management with vulnerable populations scored 40. Pastoral care would score lower. Therapy-adjacent chatbots would score lower still. This is the rubric doing its job: it is encoding that time and money gains are worthless — and actively harmful — when the thing being automated is the thing the service is for.

**The gap between green and yellow is not about capability; it is about governance.** Every yellow use case is technically buildable. Most of them would work, in the narrow sense. The yellow rating is not a claim that the tool would fail; it is a claim that the tool would succeed in ways that degrade what the organization is for unless governance is disciplined.

This is, in the end, the frame behind the whole article. The stack is powerful. The framework of value is real. The rubric is useful. And none of those are enough on their own. What makes a use case worth building is the organization's willingness to be honest about what time is *for*, who the work is *supposed to form*, and who would be displaced or dignified in the process.

AI did not create the need for that clarity. It made the absence of it suddenly visible.

---

*Part of the Movemental system-builds series. See also:*
*[How Movemental Uses AI](./HOW_MOVEMENTAL_USES_AI.md) · [The One Constraint Behind Every AI Conversation](./the-one-constraint-behind-every-ai-conversation.md) · [The Operating Spine — Nonprofit Foundation Build](./nonprofit-foundation-build.md) · [The Discovery Lab](./nonprofit-discovery-lab.md)*
