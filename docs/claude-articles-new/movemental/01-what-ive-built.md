---
title: "What I've Built: Grounding AI in Verified Human Work"
slug: "01-what-ive-built"
author: "Joshua Shepherd"
original_number: 2
destination: "movemental.ai"
description: "The complete story of building the Movemental engine: reversing fragmentation for Alan Hirsch, spatial neighborhood intelligence for Brad Brisco, and a hundred hours of training for Youthfront."
---

# What I've Built: Grounding AI in Verified Human Work


When you have a PDF of a book, it feels like you have the book. So it seems obvious that a computer has it too.

It does not. A PDF is closer to a photograph of a book. The words are marks positioned on a page for a human eye, and nothing in the file says this line is a chapter title and that line is a footnote. Copy a few pages out and you will see it. Page numbers land in the middle of sentences. The running header repeats every thirty lines. Footnote markers detach from the words they belonged to. Two column layouts interleave into nonsense.

That is the best case, where the file has real text in it. A book scanned from a 1994 printing has no text at all, only an image of text.

A talk is worse. Thirty years of speaking exists as audio nobody has written down. To a computer an audio file is a waveform, not words. Until someone transcribes it, that hour does not exist as anything you can search or quote or check.

Then the articles, thirty years of them, a good portion simply gone when an organization folded or a domain lapsed. And about twenty thousand notes accumulated over more than a decade in whatever tool he was using that year.

##### What it costs him

A thirty year body of work turns out to be four or five bodies of work in incompatible forms, none of which can talk to any of the rest.

He cannot search his own work. If Alan wants everywhere he has written about a single idea across thirty years, there is no way to ask. He has to remember. The most complete index of that body of work is one man's recall, and there is no backup.

And he cannot see anyone moving through it. Someone finds an idea in a post, orders a book, sits with it for a year, takes a course, and starts teaching it in their own church. That journey is the point of the work, and it is invisible to him, because the work it runs through is in pieces that do not connect. He knows a book sold. He does not know what it started.

Meanwhile, search the questions he has spent his life answering and you will mostly find other people restating him. Some get it right. Some do not, and the ones who do not are frequently the easier read, so they travel further.

##### What happens when someone asks a machine

For twenty years, a person who wanted to understand his work went and found it. Bought the book, searched the site, asked someone who had read it.

That is not how it works now. Increasingly the first move, and often the only move, is to ask an assistant. Explain this idea. What does he mean by that. Give me the argument in a paragraph.

And it answers. Immediately, fluently, with no source.

The answer is assembled from whatever was reachable, which is the restatements. Posts by people working from a summary, conference notes, somebody's seminary paper, the tidy version that traveled because it was easy to repeat. His own words, sitting in photographs of pages and untranscribed audio and articles on dead sites, were not in the pool at all.

So the reader gets a competent, plausible, confident answer that is nobody's actual position. And nothing about it looks wrong, which is the part that matters. A misquote in print looks like a misquote. A misquote from a machine looks exactly like a correct answer, because everything it produces looks the same.

Multiply that by everyone learning about his work this year and the paraphrase quietly becomes the record.

##### And it runs the other way

The same problem blocks him from using any of this himself.

Ask a general assistant to help think through one of his own frameworks and it returns the secondhand version, because that is all it has. Ask it to draft something in his voice and it produces an imitation assembled from other people's summaries of him. The author gets a worse answer about his own work than a stranger gets about a well documented subject.

That is the trap. The people with the most to contribute are served worst by this technology, because it can only work with what it can reach, and their life's work is the part it cannot reach.

##### Which is true of you as well

Somebody is going to ask a machine about your organization. Probably today.

It will answer, it will not say it is unsure, and it will answer from whatever it could reach. Your website, a few press mentions, whatever anyone else has written about you. Not your case studies, not your evaluations, not the twenty years of thinking that would have made the answer accurate.

You do not get to opt out of that. The only decision available is whether the thing answering has your real work to draw on.

##### What I built

There is a system that answers questions from his own writing. Someone asks in their own words and gets an answer drawn from what he actually wrote, with the source attached. [SPECIFIC: what a citation looks like, and what happens when the material is not there.] If it does not have the material, it says so rather than filling the gap. That one behavior cost more than anything else in the build.

Around it there is a site: his themes, pathways, courses, articles, and library, connected so a person who arrives through one idea can move into the rest instead of hitting a dead end.

[PROOF. A link, a number with a date, a capture.]

The moment you make an archive answerable, you have built something that speaks in a person's name. If it says one thing he would not say, you have not helped him. You have added another confident, fluent, wrong voice to the pile that was the original problem, and it will be more persuasive than the pile because it sounds official.

So the system is organized around a refusal rather than a capability. It only says what he said. It shows you where. When it does not know, it says so.

I could hold that line because I taught this material for ten years. I know which ideas people misunderstand first and which ones do the actual work. That is not devotion, it is knowledge, and it is why the build is any good.

##### What publishing takes

One more loss, and it is structural rather than accidental.

When a book sells, the author sees about a dime of the dollar. That part people know. The part they do not know is that the publisher keeps the reader. The author never learns who bought it or what they did with it. Twenty years of writing, hundreds of thousands of readers, no relationship with a single one of them.

Ninety percent of the money and one hundred percent of the relationship.

Our terms are inverted. [SPECIFIC: the 90/10 split, plainly, and what it covers.] Not generosity. It is the only arrangement consistent with the argument, which is that the work belongs to the person who made it, and so does the relationship with the people it reached.

##### This is not a church problem

An agency has thirty years of strategy decks, research, and post-mortems on a server, findable only by the four people who were in the room. A nonprofit has two decades of stories, evaluations, and donor history spread across a database, a shared drive, an email archive, and the memory of a director about to retire. A seminary has faculty work nobody outside can reach and course material nobody inside can reuse.

In every case the work is done, it is good, it was expensive, and it cannot be reached from where anyone is standing. The organization pays for that twice a year: once when someone rebuilds what already existed, and once when someone leaves with the only copy of how it worked.

Alan's version is unusual only in how public it is.

---

#### What it takes

Doing that for Alan took six months, and most of it was failing at each layer until something held. Here are the layers, because if you have a body of work of your own you should know what you are looking at.

**Getting the words out.** Turning a photograph of a book back into language. The tools for this are all wrong in different ways depending on what you point them at, and the failures are not obvious. The output looks fine. You have to go hunting to find that chapter four lost its last two pages.

**Proving nothing was lost.** The step everyone skips. After a conversion you have a file that looks like a book. You do not know it is the book. Text goes missing quietly, a column drops, a section repeats, nobody notices for a year, and by then it is being quoted to readers as though it were complete. Something has to compare what came out against what went in before anything moves forward.

**Putting the structure back.** The system has to know that this paragraph is in chapter seven of this book, under this heading, and that this note belongs to that sentence. That is what lets a reader be sent to the right page instead of a vague direction.

**Cutting it into pieces, carefully.** To retrieve anything from a large body of work you have to break it up. Too large and the answer arrives buried. Too small and you get a sentence that means the opposite of what it meant in place, because the qualifier was in the previous paragraph. And a fragment on its own does not know where it came from, so it gets presented as a general claim. That is the mechanism by which these systems misquote people. It is not exotic. It is the default. Every piece has to carry its own context.

**The talks.** Transcription at volume, and then the harder half: a transcript is not writing. People speak in false starts and digressions that resolve twenty minutes later. Getting to something usable without smoothing away what was actually said is its own problem.

**Voice.** If you are going to produce language on someone's behalf, even a summary, you have to know how they write. Not their topics. Their rhythm, their moves, the words they would never use, what they refuse to say. Derived from the corpus, written down where a person can argue with it, and held to. Otherwise everything sounds like a general purpose machine wearing a name badge, and every reader can feel it.

**And then the chain.** Six layers, each depending on the one before it having gone right. I ran them by hand for a long time, which is why the first took six months. What I built runs them in order, holds its state so a failure at step four does not send you back to step one, and stops where a human being has to look at something.

What took six months now takes hours, and the parts that need a person still get a person.

That is the actual product. The site is what you can see. This is what makes it possible, and it is why the next leader did not take six months.

---

#### Before any of this

I could build that because of four years at a construction chemicals company, which is not where anyone expects this to have happened.

I went in as director of marketing. Two months after ChatGPT was released I had used it to draft a stack of technical articles about concrete, and my job changed shape. I came off the org chart and spent three years building everything digital and AI.

What I built there, for a business selling construction chemicals, was the working prototype of everything I do now. A content operation that took organic traffic from around fifty thousand visits a year to around a hundred and forty thousand. A custom CRM with voice input and agents underneath it. A product system covering more than three hundred products. Mobile apps on two platforms in a two week build.

By mid 2025 I was running two builds at once with coding agents. One was theirs. The other was what I thought Alan needed.

---

#### For Brad

Brad Brisco equips people who start churches, at [the church-planting arm of one of the largest denominational networks in North America: confirm]. Six books. He coined the term a whole field now uses for the idea that ordinary work and ministry are not competing calls, which means his language is in other people's mouths constantly, usually without his name attached.

Out of the sector, that is a familiar figure: the practitioner who trains the trainers, whose framework is on the whiteboard in rooms he has never been in.

His fragmentation has the same shape as Alan's. It took weeks instead of six months, because by then the chain existed. That is the whole argument for having built it.

[PROOF. A link, a date.]

##### The other half

But Brad's work needed something Alan's did not, and this is where the platform stopped being one thing repeated.

His ideas are not primarily about texts. They are about places. A leader in his world is trying to understand an actual neighborhood, with actual people in it, and act accordingly. The failure mode is a leader who is deeply formed and knows almost nothing verifiable about the six blocks around their building. They plan from impression.

So for Brad I built something that gathers what is actually true about a place and puts it in front of a leader in a form they can act on. [SPECIFIC: what it pulls, what a leader sees, what they do with it.]

One build reverses fragmentation in a body of work. The other reverses it in what a leader knows about their own context, which is scattered across census records and local reports and things everyone assumes somebody has already checked.

Same underlying problem. What you need is real, it exists, and it is not reachable from where you are standing.

---

#### For Youthfront

Youthfront is a nonprofit in Kansas City where I have known people for years. Their situation had nothing to do with archives.

AI was already inside the organization and nobody had decided anything about it. [SPECIFIC: what was actually happening.]

Nothing had gone wrong. That is the part people miss. Nothing had gone wrong yet, and the absence of a bad day was being read as evidence there was nothing to decide.

I could have written them a policy in a week. It would have sat in a folder.

##### Why there had to be an order

By then I had spent three years showing this technology to organizations, and I watched the same thing every time. People got excited, tried something, hit a wall, stopped. Or they got worried, wrote a rule nobody could follow, stopped. Either way, stopped.

What was missing was not enthusiasm or caution. It was a path.

**Safety.** Decide what this is allowed to touch before anyone uses it for anything that matters. Written down, agreed, in language your staff actually use.

**Sandbox.** A bounded place where people use it on real work with real stakes, where being wrong is survivable, and where someone is paying attention.

**Training.** Not a workshop. Enough hours that a practice forms, because a demonstration changes nobody.

**Tech.** Build the thing. By now you know what to build, because the people who will use it have been working with it for months and can tell you.

Everyone wants to start at the end. The tools are the exciting part and the part with a price on them. Starting there gets you a capable system in an organization with no formed judgment about it, which is worse than having nothing, because now the mistakes are fast and confident.

##### Why safety could not wait

Every day an organization goes without deciding this, staff decide it individually, in private, on their own accounts, with the best intentions. They paste in the things that are hardest to write, which are exactly the things involving real people. A donor situation. A family circumstance. A young person's story. A personnel matter.

Nobody is being unreasonable. They are trying to do their jobs and a tool showed up that helps. But information about vulnerable people is leaving the organization, nobody decided that it should, there is no record, and there is no way to walk it back.

That is not a future risk. It is the current state of most organizations I talk to.

##### The hundred hours

At Youthfront we are doing a hundred hours of in person training across ten teams and every part of the organization. Not a pilot group. Not the technically inclined. The whole thing.

[SPECIFIC: what a session is. Who is in the room, what happens, what changes between hour one and hour forty.]

It runs across every team because fragmentation in an organization is not a technology problem. It is that the person who knows why a donor gives is not the person writing the appeal, and the person who was at camp is not the person telling the story, and none of it is written down. A tool does not fix that. People deciding to work differently fixes that, and then a tool can help.

[PROOF. What exists now that did not before.]

A hundred hours is a lot to ask of a nonprofit and I am not going to dress that up. It is the most expensive thing about how I work and I have not found a way around it that I believe in.

---

#### Now

Movemental is the company those builds turned into. I built the platform and I own it. Brad is CEO, because this is a business that runs on trust and he already holds it in the rooms where it matters. Alan is Chief Movement Officer. Both of them put thirty years of their own credibility behind something one person had built and nobody had seen yet. They did not have to do that.

[CURRENT STATE. Platforms live or in build, the four stages, whatever is checkable as of this month.]

I knew all of them before I built anything, and that is the method rather than a coincidence. You do not learn what someone needs by studying the category they belong to. You learn it by being in their world long enough to see what is missing from it.

---

#### Everything else

*Verify dates, links, and status before publishing. Anything you cannot check, cut.*

**Leader platforms.** Alan Hirsch — full platform, corpus, themes, pathways, courses, retrieval over his own writing [URL, date]. Brad Brisco — full platform plus neighborhood intelligence [URL, date]. Tim Catchim [scope, status]. [Others in build.]

**Organizations.** Youthfront — guidebook, sandbox, a hundred hours across ten teams [dates]. Movement Leaders Collective — digital and AI consulting, overview deck, donor materials [dates]. 100 Movements and 100 Movements Publishing [scope, dates].

**Systems.** The book chain: conversion, loss verification, structure recovery, context-carrying segmentation, ingest, distribution to retrieval, as one orchestrated process with human checkpoints. Orchestration platform [verify: nine pipelines, twenty-plus tasks, five human gates, four scheduled jobs] with durable state and gates that hold for days. Translation with three-layer evaluation and a native-speaker gate [languages, status]. Agent system across three tiers [count]. Citation and provenance: block-level anchors, footnote resolution, per-work bibliography graph, and a log of what ran and who approved it. Per-leader voice guides. Writing studio [scope]. Visual editor [scope]. A five-layer design chain. Skills library [count].

**Earlier.** Construction chemicals, 2022 to 2026: platform rebuild, first intranet, AI content operation, ~50,000 to ~140,000 organic visits a year, custom CRM with voice agents, 300-plus product system, iOS and Android in two weeks. BookMatch — session recommendation assistant, Heartland Book Festival, two days, 2,000-plus attendees [date]. [As You Go app — confirm status.]

**Written.** [Field guides, playbooks, the AI reality paper, the fragmentation thesis, the Evergreen Engine. Link what is public, cut the rest.]

---

*Part 2: how. Part 3: why.*

---

## 3. I started with two people, not a product

`how-i-built-it-two-people-v2.md` · 1,931 words

### I started with two people, not a product

*Draft 2, rebuilt. `/how-i-built-it/two-people`. ~1,750 words. First person, plain, no em dashes.*
*Bracketed items need a real detail from you. The build sequence and the proof are the two that matter.*

---

Alan and I had a standing call on Sunday nights at seven. We had been doing it for years. One week I asked Brad Brisco to join.

I did not want to describe the idea, so I built it instead. A quick site, made in an afternoon, showing a hundred potential authors as a network with the two of them at the origin. You could click any node and get the person, a rough estimate of what a platform might earn them, and what the whole network came to. I shared my screen and let them click on it.

What I said on that call is close to what the business is now. I offered them ten percent each.

What I did not know, and I want to be accurate about this, is that it would lead to organizations. I knew it had to lead somewhere. That took another year to see.

#### Why I started with people I knew
