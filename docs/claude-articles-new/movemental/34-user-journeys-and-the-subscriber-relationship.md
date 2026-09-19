---
title: "User Journeys and the Subscriber Relationship"
slug: "34-user-journeys-and-the-subscriber-relationship"
author: "Joshua Shepherd"
original_number: 47
destination: "movemental.ai"
description: "How readers move from initial discovery to sustained cohort engagement without dark patterns or extractive monetization."
---

# User Journeys and the Subscriber Relationship

`user-journeys-and-subscriber-architecture.md` · 6,016 words

### User Journeys and the Subscriber Relationship

##### A canonical strategy document for the Movemental movement leader platforms

*Covers: what a user journey is and why it decides the architecture · the personas each platform is actually built for · the settled playbook and where it comes from · the specific journeys for Alan Hirsch and Brad Brisco · what the subscriber database must hold and what the UI must show.*

*Bracketed items are things that need confirming against the live build or against the leader before this is treated as settled.*

---

### 1 · What we are actually talking about

We are deciding what happens to a person between the moment they first land on a leader's site and the moment they either become a practitioner shaped by that leader's work or leave and never come back.

That sounds obvious. It is not what most people mean when they say "user journey." Most of the time that phrase means a diagram of pages someone might click through. That is a sitemap with arrows on it. What we mean is different and harder: **a defined sequence of states a person moves through, where each state is something we can observe, store, and act on, and where every page and every email exists to move someone from one named state to the next.**

The difference matters because one of them can be built and the other cannot. "The user explores the pathways and then considers a course" is not something a database can hold. "The user has completed one assessment, opened four of the last six letters, and has not started a pathway" is. The second one tells you what email to send on Tuesday. The first one tells you nothing.

So the real subject here is a small set of interlocking decisions:

- What states can a person be in.
- What events move them between states.
- What we store when that happens.
- What we show the leader, and what we show the person themselves.
- How all of that stays coherent when the same human being appears on Alan's site on Monday and Brad's site on Thursday.

That last one is the reason this document exists now rather than later. Two platforms are live. More are coming. If each one grows its own idea of what a subscriber is, we will spend the next two years reconciling them instead of building.

---

### 2 · Saying it plainly

Strip the vocabulary out and here is the whole thing.

Somebody has a problem on a Tuesday night. They search for it. They land on a page one of our leaders wrote. That page either answers the question or it does not. If it does, they now have a reason to trust the person who wrote it, and we have about ninety seconds to give them a reason to come back — because if they leave without one, we have permanently lost them and we will never know it happened.

So we offer them something. Not a mailing list. Something about themselves — a result, a profile, a reading of their own situation. They give us an email address for it, because the thing is worth more than the address.

Now we have a relationship rather than a visit. We write to them. Not announcements about what we published, but a real letter with a thought in it. Some of them reply. Over months, a few of them decide they want to actually be changed by this work rather than informed by it, and those people walk a pathway or join a cohort. A smaller number teach it to other people, which is the only outcome any of these leaders actually cares about.

And the whole time, we are writing down what happened. What they read, what they scored, what they opened, what they did. Not to score them like sales leads. To know what to send next, and to know which of the four things above is broken.

That is it. Everything below is detail on how to do that without it turning into marketing.

---

### 3 · Why this decides more than it looks like it decides

Four reasons this is worth a canonical document rather than a per-site decision.

**The email list is the only asset the leader actually owns.** Alan's audience currently reaches him through publishers, conferences, seminaries, and the people who teach his frameworks. Brad's reaches him through Send Network, Forge, Sentralized, and denominational relationships. Every one of those is a real relationship and not one of them is a channel he controls. If the intermediary changes — a network reorganizes, a conference folds, a publisher moves on — the leader loses the ability to speak to people who have organized their working lives around his work. Building the list is not a growth tactic. It is the thing that makes everything else survivable.

**Traffic arriving before there is somewhere to put it is lost permanently, and silently.** This is the expensive failure and it does not show up in any dashboard. A leader can publish for a year, watch traffic rise, and have nothing at the end of it. There is no error message for a visitor who was interested and had nowhere to go.

**The multi-tenant question has a deadline.** Two sites are live. If we define the subscriber model now, the same person on both sites is one record with two relationships and we can eventually offer something across the network. If we define it later, they are two records with no way to reconcile them, and every cross-network product becomes an integration project. The cost of getting this right now is a schema conversation. The cost of getting it wrong is a migration.

**The journey is what tells us which content to make.** The content value work already established that each leader has an emptiest column and should build there. But you cannot see which column is empty without journey data. How many people arrive and leave without a name. How many have a name and never come back. How many come back and never do anything. Those three numbers point at the gap, and none of them exist unless the journey is instrumented.

---

### 4 · The playbook that is actually settled

There is more agreement about this than people admit. Here is what is genuinely known, where it comes from, and what remains judgment.

#### 4.1 People arrive at different distances from being ready

The oldest useful idea here is Eugene Schwartz's stages of awareness, from mid-century direct-response advertising: a person can be unaware there is a problem, aware of the problem, aware that solutions exist, aware of your particular solution, or ready to act. It has survived seventy years because it is true and because it has one hard implication.

**Content written for the wrong stage fails even when it is excellent.** A page arguing that your framework is the best available is wasted on someone who does not yet believe they have the problem it solves. A page explaining what the problem is bores someone who came ready to enrol. This is why "our content isn't converting" is almost always a stage mismatch rather than a quality problem.

The practical version: every page should know which stage it serves, and the next step it offers should be exactly one stage further along. Not three.

#### 4.2 Discovery happens by cluster, not by page

This is Moz's topic cluster model, which by now is close to consensus across the SEO field: a comprehensive hub page on a broad term, surrounded by six to eight pages each answering a specific question, all linked to the hub and to each other. Search systems resolve topical authority at the cluster level, not the page level. One brilliant orphan page is close to invisible.

Two things have changed since that model was written and both make it more important rather than less.

The first is that the systems doing the introducing are increasingly answer engines rather than link lists. A person asks a machine and gets a fluent, sourceless paragraph. What gets quoted is a self-contained answer near the top of a page — something liftable whole. That is now the front door.

The second is that a cluster is also what makes the second and third page views happen. A visitor on an orphan page has one exit, which is the back button. A visitor inside a cluster has six relevant next reads, and depth of visit is the single best predictor of whether someone will give you an email address.

#### 4.3 One primary next step per page

Well-established in conversion practice and repeatedly confirmed in testing: a page offering three next steps performs worse than the same page offering one. Choice imposes a cost, and the cost is paid in inaction.

The rule for us: every page has exactly one primary action. Secondary links can exist but must be visually subordinate. The primary action changes by stage, and it is almost never "subscribe to the newsletter," because nobody wants a newsletter. They want the thing the newsletter is attached to.

#### 4.4 What earns an email address is something about them, not about you

This is the single most useful operational distinction in the whole document, and the one most often got wrong.

A PDF explaining your framework is about you. An assessment that tells someone where they personally stand is about them. The second converts at multiples of the first, and it converts a better person — someone who now holds a fact about their own situation and a question that follows from it.

The test for whether a tool is good enough: **would the person forward their result to a colleague unprompted?** If not, it is a brochure with a form on it.

#### 4.5 Ask for information progressively, never all at once

Progressive profiling is standard practice in marketing automation, and the logic is simple. Every additional form field reduces completion. But you can ask for one more thing each time someone comes back, and by the fourth interaction you know more than any single form would ever have got you.

So the first ask is an email address and nothing else. Role comes from the second interaction. Organizational context comes from an assessment. What they are actually trying to do comes from a reply to a letter, which is why the letters have to ask real questions.

#### 4.6 Engagement decays and must be measured, not assumed

Direct marketing has used recency, frequency, and monetary value for decades, and the first two transfer directly. A subscriber who opened four of the last six letters is a fundamentally different person from one who has opened none in a year, and treating them identically wastes the first and annoys the second.

Two consequences we should adopt without argument:

**Track engagement as a rolling score, not a binary subscribed flag.** Recency of last open, frequency over a trailing window, and depth of action.

**Sunset the disengaged deliberately.** Someone who has not opened anything in a year is hurting deliverability for everyone else. Ask once whether they want to stay, then stop mailing. This feels like losing something and is actually the opposite — sending to dead addresses is how you end up in spam folders for the living ones.

#### 4.7 Identity has to resolve across properties

For anyone running more than one site, the settled practice is a single canonical person record with per-property relationships hanging off it. The alternative — a separate list per site — means the same human is three strangers, you cannot tell whether cross-promotion works, and you will eventually mail them three times about the same thing.

Consent, however, does not travel. A person subscribing to Alan does not thereby subscribe to Brad. One identity, separate permissions.

#### 4.8 What is not settled and where judgment lives

Being honest about the edges.

**Cadence.** No reliable general answer. Consistency beats frequency, reliably. Whether that consistency is weekly or quarterly depends entirely on what the leader can sustain for years.

**Free-to-paid conversion rates.** The commonly cited benchmarks come from datasets with unpublished methodology. Treat any specific percentage as a rough prior and nothing more.

**A/B testing.** At the volumes these platforms will see for the next two years, it is not merely difficult, it is pointless. Detecting a meaningful difference at low conversion rates requires thousands of people per arm. We will have dozens. Decide by judgment and by qualitative signal, and stop pretending otherwise.

**Whether the paid tier should exist yet.** Genuinely open. The argument for early is that paying creates commitment and free accounts get abandoned. The argument for later is that you do not know what people will pay for until you have watched them use the free thing.

---

### 5 · The four states, which every platform shares

Everything above resolves into four states a person can be in. These are the same on every leader platform, they are what the database stores, and they are what the leader's dashboard reports on.

**Stranger.** Arrived, read something, no identity. We know a session and nothing more. The only thing that matters about this state is how many leave it and how many do not.

**Named.** Gave an email address in exchange for something. This is the single most important transition in the whole system, because everything downstream is impossible without it and it is invisible when it fails.

**Engaged.** Comes back on purpose. Opens the letters, reads more than one thing, has done something that produced a result about themselves. This is where most of the population should sit and where most of the value is.

**Practitioner.** Doing the work. Walking a pathway, in a cohort, using the material with their own people. A small number, and the reason the other three states exist.

There is a fifth state that we should name even though it is not a funnel stage, because for these particular leaders it is the actual goal: **Multiplier** — someone teaching this material to other people, without the leader in the room. It is not reachable by a sequence of emails. It is a consequence of the Practitioner state plus artifacts built to be handed on. We measure it by asking, because there is no other way.

The transitions between these are where the design work lives:

- Stranger → Named requires something worth an address.
- Named → Engaged requires a first letter that justifies the address within days.
- Engaged → Practitioner requires an invitation timed to something they did, not to a launch calendar.
- Practitioner → Multiplier requires artifacts that work without the leader present.

---

### 6 · Alan Hirsch

#### 6.1 The three primary personas

**The practitioner who already uses the frameworks and wants the real version.** A church planter, network leader, or pastor who encountered APEST or mDNA somewhere else — inside another author's book, at a conference, in a seminary class, from a colleague's summary. They are already using the language. They may be using it wrongly, most often by treating a fivefold category as a personality label. They arrive with a specific question about application. They do not need convincing that Alan matters; they need the accurate version and something to do with it. **This is the largest group and the one the platform is primarily built for.** Their journey should be short and should end at a pathway.

**The leader who has been sent by someone.** A staff member whose team is doing an APEST process, a planter whose network trains from Alan's material, a student assigned a chapter. They arrive warm but shallow — the trust is borrowed from whoever sent them, and it will not survive a page that fails to deliver. They need a fast, competent, usable orientation and one clear next step. They convert well because the intent is high and the context is already established. **The most under-served group, and the one the assessment work most directly reaches.**

**The institutional evaluator.** A seminary faculty member deciding whether to put a book on a syllabus, a denominational executive weighing a training investment, an academic checking whether the frameworks hold up. Small in number, disproportionate in consequence, because one decision here reaches forty students a year for a decade. They are not looking for formation. They are looking for verifiability: the citation record, the academic reception, the frameworks stated precisely enough to be examined. They will not subscribe and should not be asked to. **They are served by the proof surfaces, and the conversion event is an adoption we may never see in analytics.** [Confirm whether we can capture institutional adoptions at all — probably only by asking.]

#### 6.2 The intended journey

Alan's problem is not obscurity. It is substitution. The vocabulary travels widely and it travels in the tidy version — easier to repeat, missing the hard part. Somebody asks a machine what APEST is and gets a confident, sourceless answer that is not his position, and nothing about it looks wrong.

So the journey begins earlier than a normal platform's. It begins with reclaiming the answer.

**Arrival is nearly always through a term.** Someone searches or asks about APEST, mDNA, communitas, apostolic genius, missional-incarnational. They land on a definitional page whose first three sentences are a complete, liftable answer to the question in the form it was asked. Everything else on that page sits below the answer. That page is the front door for the great majority of arrivals and it should be built as such.

**From the definitional page, one step: the cluster.** Six to eight interlinked pieces around that term, each answering a real question, including — importantly — the ones about what the framework is not. The piece on APEST and personality types is doing correction work that nothing else on the platform can do, and it is the piece a skeptical reader opens first.

**The named transition happens through the assessment, and this is where the APEST agentic extension is decisive.**

Alan already has assessments that work. They are widely used, well regarded, and — critically — they currently sit apart from the platform. That separation is the largest single opportunity in this document. Thousands of people have taken an APEST assessment and hold a result. That result is a fact about themselves. It is exactly the thing that earns an email address, and right now it is earning one somewhere else, or nowhere.

The extended agentic version changes the offer from a score to a conversation. Instead of "here is your profile, thank you," it becomes: here is your profile, and here is an agent bound to Alan's corpus that can tell you what this means for the decision you are actually facing this month. What it means when your whole team scores the same way. What it means that you scored high on something you have never been permitted to exercise in your current role. What the framework says about the gap you are feeling.

That is a fundamentally stronger thing than an assessment, for four reasons. It produces a result the person would forward. It generates, in the transcript, an unusually rich picture of their actual situation — better than any form would get. It naturally terminates in a specific pathway rather than a generic invitation. And it demonstrates the corpus binding, which is itself the proof: an agent that cites back to the books and is willing to say it does not know is a stronger credibility signal than any essay about rigor.

**Practically, this means the assessment result page is the most important conversion surface on Alan's platform** and should be designed as such rather than as a results screen. [Confirm the current assessment platform, whether results can be handed off, and whether existing takers can be reached. If the historic taker list exists and is contactable, that is the single largest asset in this document.]

**From named to engaged: two letters, doing different jobs.** A public letter to the broad list, one idea per issue, published nowhere else, on a rhythm he can hold for years. And a longer, more candid letter to people actively doing the work, which can say things not yet ready for the public one. The second is a proof signal in its own right — it tells practitioners they are inside a real conversation rather than on a mailing list. [Confirm whether both exist and at what cadence.]

**From engaged to practitioner: the pathway, entered from the assessment result.** This is why the agentic version matters so much. A generic "explore our pathways" invitation is weak. "Based on what you have just told me about your situation, the place to start is this one, and here is why" is a different thing entirely, and it is only possible because the agent has the conversation.

**From practitioner to multiplier: the facilitator layer.** Alan's multiplication is already happening and it is happening unsupervised. People teach this material constantly, in rooms he will never see, from summaries. So the work here is not to start multiplication. It is to make the accurate version easier to run than the garbled one — the facilitator page, the one-page version that is hard to misstate, the material that names the common misreadings directly.

#### 6.3 What the platform must not do

Alan's refusals are themselves the trust signal, so the journey has to respect them or it undermines the thing it is trying to build. No pressure sequences. No manufactured scarcity. No treating formation as a funnel stage. Articles stay free — paywalling them fractures the formation engine and destroys the discoverability that makes the whole thing work. And the agent must never pretend to be him.

---

### 7 · Brad Brisco

#### 7.1 The three primary personas

**The church planter who needs something to use this week.** Bivocational or covocational, often under-resourced, holding a real problem with a near deadline. They are not looking for a theology of place; they are looking for something to run with their core group on Tuesday. They convert on tools and they stay for the theology underneath, in that order — which is the reverse of how most people assume it works, and the reason the tool is Brad's front door rather than his back one. **The primary persona and the one the platform should be designed around.**

**The established pastor trying to turn the ship.** Leading an existing congregation, increasingly aware that the inherited attractional model is not working where they are, and facing the specific problem Brad wrote a doctorate on. They arrive skeptical of anything that sounds like a program relabel. They need the theological reframe before the practices, because a tactic without the reframe will get applied to an unchanged system and fail. They move slower than the planter and go deeper when they move. **The group Brad's corpus serves best and the one his site currently reaches least.**

**The network or denominational leader deciding whether to bring him in.** Responsible for many planters, evaluating whether Brad is both theologically serious and genuinely practical. They are not a reader; they are an evaluator with a budget and a calendar. What they need is fast evidence of both hands full — real theology and real tools — and confidence they will not regret the platform they give him. **Small in number and the highest-leverage group he has,** because one adoption puts his material in front of everyone that network trains. This is the persona for whom Send is not a slow accumulation but a single decision.

#### 7.2 The intended journey

Brad's problem is different from Alan's in a way that changes the whole shape. He is not being substituted for; he is under-indexed. He coined a term and does not own the answer to it. A stranger searching what he named mostly finds other people, or nothing.

**Arrival is split between search and network, and the network side is warmer and larger today.** Someone hears him at a Sentralized session, encounters him through Send Network, or is handed a book. Search is a real and growing secondary that his corpus makes credible but that is currently unbuilt.

So the first job is a definitional page per term he named, plus book hubs that state each book's argument, name who it is for, list the frameworks inside, and say where to start. Not product pages. Pages a stranger can use and a machine can quote. This is weeks of work against material that already exists.

**The named transition happens through the tool, and for Brad this should be the hero rather than a section.** His audience is practitioners who want something to run. A tool that reads their actual neighborhood, or reads their own covocational readiness, is about them in exactly the way that earns an address. It is also his most natural front door: the planter arrives with a problem and leaves with a finding about their own context. [Confirm the current state of the existing tools and whether results are captured against an identity.]

**From named to engaged: one letter, every other week, that is not a digest.** Brad's native form is the framework — a paradigm shift stated crisply, an inherited assumption named and corrected, one image or contrast. That is what the letter should carry, one per issue, published nowhere else. The failure mode to avoid is the roundup of what he published, which gets skimmed once and unsubscribed.

**From engaged to practitioner: the pathway, and increasingly the cohort.** The planter who ran the tool with their core group has already acted once. The invitation that follows should reference that, not launch a product.

**From practitioner to multiplier: this is where Brad's position is unusual and should be exploited deliberately.** Most people building toward multiplication have to find someone willing to run their material. Brad has standing relationships with organizations that train people at volume. One tool adopted as standard practice by a sending network reaches further than a year of publishing. That makes the facilitator layer — the run-it-with-a-group page, the forty-minute version, the two sentences on what not to say — the highest-value thing he can build after the definitional pages. [Confirm which network relationships are live and who actually decides on adoption.]

#### 7.3 The main risk

Brad's is a proof reflex. The strongest pull in his position is toward another book, another framework, another substantial piece of thinking — the work he is already good at, which will feel productive and change nothing. The journey design has to keep pointing at rendering and at the tools, because that is where the empty columns are.

---

### 8 · What the subscriber database has to hold

The model is one person, many relationships. A canonical person record; a separate relationship record per leader platform; consent and engagement tracked per relationship, never globally.

#### 8.1 The person

The canonical identity. One row per human being across the whole network.

| Field | Notes |
|---|---|
| `person_id` | Canonical identifier. Never per-tenant. |
| `email_primary` | Normalized and deduplicated. The join key in practice. |
| `email_alternates[]` | People sign up twice with two addresses. Merge, don't duplicate. |
| `display_name`, `given_name`, `family_name` | Progressive — often empty at first contact. |
| `country`, `timezone`, `language` | Timezone matters for send timing; language matters once translations exist. |
| `created_at`, `first_seen_tenant` | Which leader introduced them to the network. Worth knowing. |
| `merged_from[]` | Audit trail for identity merges. Non-negotiable — merges go wrong. |
| `global_suppression` | Hard bounce, spam complaint, or legal deletion request. Overrides every consent everywhere. |

#### 8.2 The relationship, per tenant

One row per person per leader platform. This is where nearly all the useful data lives.

| Field | Notes |
|---|---|
| `tenant_id` | The leader platform. |
| `stage` | `stranger` / `named` / `engaged` / `practitioner`. Computed, not self-declared. |
| `stage_entered_at` | Per stage. Time-in-stage is the diagnostic that tells you where the journey is stuck. |
| `acquisition_source` | Search, network referral, event, another tenant, direct. |
| `acquisition_entry_url` | The exact page that earned them. This is how you learn which content actually works. |
| `first_value_event` | What they gave the address for — which assessment, which tool, which guide. |
| `consent_newsletter`, `consent_insider`, `consent_product` | Separate permissions, separately timestamped. |
| `consent_timestamps`, `consent_source_url`, `consent_ip` | Compliance requires the record, not the assertion. |
| `engagement_score` | Rolling, 0–100. See below. |
| `last_open_at`, `last_click_at`, `last_site_visit_at` | The recency inputs. |
| `sunset_state` | `active` / `at_risk` / `re_permission_sent` / `sunset`. |
| `role_self_reported` | Planter, pastor, network leader, academic, student, other. Progressive. |
| `context_org_type`, `context_org_size` | From assessment or profile. Optional, high value when present. |
| `stated_goal` | Free text from a reply or an agent conversation. The most useful field on this table and the one no form ever fills well. |

#### 8.3 Events

Append-only. Everything else is derived from this.

`person_id` · `tenant_id` · `event_type` · `object_type` · `object_id` · `occurred_at` · `metadata`

Event types worth defining now: `page_view`, `content_read` (with depth), `email_sent`, `email_open`, `email_click`, `reply_received`, `assessment_started`, `assessment_completed`, `agent_session_started`, `agent_session_ended`, `pathway_started`, `pathway_step_completed`, `course_enrolled`, `course_week_completed`, `cohort_joined`, `purchase`, `facilitator_material_downloaded`, `taught_it_reported`.

That last one has no automatic trigger. It comes from asking, and it should exist as a field anyway, because the number it holds is the one these leaders actually care about.

#### 8.4 Assessment and agent results

This table is what makes Alan's platform work, so it should be built properly rather than as an afterthought.

| Field | Notes |
|---|---|
| `assessment_id`, `version` | Frameworks get revised. Results must stay interpretable. |
| `person_id`, `tenant_id` | |
| `result_payload` | Structured scores, not a rendered PDF. |
| `taken_at`, `retaken_from` | Change over time is meaningful, and it is a reason to come back. |
| `share_token` | For the forwardable result. Every share is an acquisition channel. |
| `agent_session_id` | Links the result to the conversation about it. |
| `derived_recommendation` | Which pathway the agent pointed to, and why. |
| `context_captured` | What the conversation revealed about their situation. This is the richest profiling source in the system and it arrives without a form. |

Two rules about the agent transcripts. They contain pastorally sensitive material and must be treated as such — the person should be told plainly what is kept, and should be able to delete it. And derived context should be reviewable by the person rather than silently held, because the alternative reads as surveillance and would violate exactly the trust the platform is built on.

#### 8.5 The engagement score

Keep it legible. A score nobody can explain gets ignored.

- **Recency of last meaningful action** — heaviest weight. An open last week beats twenty opens two years ago.
- **Frequency over a trailing 90 days** — opens, visits, clicks.
- **Depth** — did they complete something. An assessment or a pathway step counts far more than a click.
- **Reciprocity** — did they ever reply. Rare, and the strongest single predictor of everything downstream.

Score per relationship, never per person. Someone can be deeply engaged with Brad and dormant on Alan, and that is normal.

---

### 9 · What the UI has to show

Three audiences, three different views.

#### 9.1 The leader's dashboard

The leader is not a marketer and should never be shown a marketing dashboard. What they need is four numbers and one flag.

**The four states, with counts and trend.** How many strangers this month, how many became named, how many are engaged, how many are practitioners. Trend over the last six months.

**The transition rates, which is where the actual diagnosis lives.** Stranger-to-named is the one that reveals whether the offer is any good. Named-to-engaged reveals whether the first letter earns its keep. Engaged-to-practitioner reveals whether the invitation is timed to anything.

**The emptiest column, flagged.** The content strategy already says to build against the weakest motion. The dashboard should say which one that is rather than making the leader work it out.

**What people actually asked.** The top questions from agent sessions and site search, in the person's own words. This is the best content brief available and it is generated for free. It is also the single most interesting screen for the leader personally, which matters — a dashboard nobody opens is worthless.

**Replies, surfaced as a queue.** Replies to the letters come into the platform, not a marketing tool, because the replies are the relationship. They should look like correspondence, not tickets.

Deliberately absent: open-rate charts, list growth graphs, anything with the word funnel on it. Not because the data is wrong but because that framing will change how these particular leaders write, which costs more than the insight is worth.

#### 9.2 The person's own view

Most platforms have nothing here. It matters more than it looks.

**Their own results, kept and re-takeable.** An assessment result someone can return to is a reason to come back that requires no email.

**Where they are in a pathway.** Progress that survives a three-week gap.

**What they have told us, editable.** Role, context, stated goal — shown plainly, changeable by them. This inverts profiling from something done to a person into something they participate in, and it produces better data because people correct what they can see.

**Consent, per leader, in one place.** Which letters they get from whom, changeable without unsubscribing from everything. If the network eventually spans twenty leaders, this screen is the difference between a network and a nuisance.

#### 9.3 The Movemental network view

Not public and not the leader's. Ours.

Cross-tenant identity health — how many people appear on more than one platform, and whether the cross-references move anyone. The Scenius argument depends on peer proof working, and this is the only place we will find out whether it works on humans as well as on machines. Aggregate stage distribution by tenant, which tells us which leaders need help and where. And merge quality, because identity resolution fails quietly and expensively.

---

### 10 · The order to build it

Sequenced by what blocks what.

**First, the event stream and the person/relationship tables.** Everything derives from these and retrofitting them is painful. They can exist before any UI does.

**Second, one thing worth an email address per platform.** Alan's is the assessment result page — and the highest-value single move available anywhere in this document is connecting the existing assessment audience to the platform. Brad's is a tool as the hero of the home page rather than a section within it.

**Third, the letters, opened before the content push.** Every visitor who arrives before there is somewhere to put them is lost permanently. This is the cheapest thing on the list and the most expensive to have skipped.

**Fourth, the agentic APEST extension.** It upgrades the strongest existing asset, produces the richest profiling data in the system, and terminates naturally in a pathway. It is also the clearest demonstration that the corpus binding is real, which is a proof surface as much as a product.

**Fifth, the facilitator layer on both platforms.** The multiplication that both leaders actually care about, and the thing that makes the whole system worth building.

**Last, and only when there is real usage: the paid tier.** We do not currently know what people will pay for. Ten months of real usage will settle it better than any amount of modeling.

---

*Bracketed items above need confirming before this is treated as settled. The largest one by far is the state of Alan's existing assessment audience — whether the historic taker list exists, whether it can be contacted, and whether results can be handed off into the platform. If the answer is yes, that single fact reorders the build.*

---

# Part V — Site Copy, Notes & Client Documents

*Public-facing page copy, the short comparison Notes, and documents written for named partners.*

---
