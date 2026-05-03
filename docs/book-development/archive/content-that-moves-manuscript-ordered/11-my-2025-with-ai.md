# Chapter 11: My 2025 with AI

It was late. The kind of late where the screen is brighter than the room and your eyes start to lie about how much sense a paragraph makes.

I was not staring at a novel problem of philosophy. I was staring at a dashboard, a backlog, and the sickening feeling that I had mistaken velocity for progress. Again.

If you have ever built anything ambitious with AI at your elbow, you might know the feeling I started calling **AI psychosis**—not a clinical diagnosis, just a blunt name for a common delusion: the sense that you are *almost done*, perpetually at eighty percent, while the remaining twenty percent keeps shape-shifting into another eighty. The tool rewards motion. Your nervous system interprets motion as arrival. It is not.

This chapter is the centerpiece case study I promised you—not because my year was the most important year in AI, and not because you should copy my stack. It is here because **credibility books fail when they float above practice**. You deserve to see what the framework looks like when it gets mud on it: amplification versus replacement, voice preservation, transparency, human-in-the-loop, and the gap between intention and execution.

I will tell you the truth as I know it. I will not turn it into a sales pitch.

**Fence:** Elsewhere in the book I keep product-adjacent names sparse so the **frameworks** travel on their own. This chapter is the **deliberate exception**—one sustained, named case study—so you can see accountability chains under pressure. If you skip every proper noun, you should still recognize the **pattern**: corpus respect, human review, disclosure, human-in-the-loop.

## Why one story

You do not need a tour of every model release in 2025. You need one sustained example where the stakes were real: money, relationships, theology, time, reputation.

For me, that story is the year I tried to build **Movemental**—infrastructure meant to serve movement leaders whose life's work is being drowned out by noise—while learning, in public, what it means to use AI without lying to myself about who is authoring the work.

If names like **Alan Hirsch** and **Brad Brisco** appear here, it is not name-dropping. It is accountability. They are not props in my story; they are partners who had every right to ask hard questions about what I was building and how I was using AI. Their presence kept the project from becoming a private experiment. That is part of the lesson.

I give the fast mobile app, the late-October dread, and the friend with the video **more room in the preface**. I am not replaying that arc beat-for-beat here. I am carrying **enough** of the same facts so you can watch **Chapters 5–10A** land in one lived year, with names and stakes attached.

## The year in three movements

**First: ingestion and respect for the corpus.**  
The work did not start with AI "being creative." It started with **human-authored work** that had to become structured, searchable, and usable—books as MDX and database rows, articles ingested through deterministic scripts, sermons and talks transcribed so they could be cited and searched. AI helped where scale demanded it—translation jobs, transcription, batch processing—but the operating rule was simple: **the corpus is authority**. If we treat machine-generated text as if it were the author's life work, we have already lost the plot.

**Second: calibration—teaching the machine what "sounds like" a real voice.**  
Movemental uses a human-led process to extract voice markers, failure modes, and signature rhetorical habits from a representative slice of an author's work. That is not romantic; it is labor. Humans read, name patterns, and build rubrics. Later, tools can suggest and score drafts against those rubrics—what we sometimes call a credibility or voice check—but the point is not a number on a screen. The point is **early warning** when language drifts toward generic confidence.

If you hear a warning bell in that sentence, good. "Voice fidelity" is not a clinical lab result. It is a disciplined comparison between a draft and a curated set of examples, plus human judgment. I say that plainly because a book about credibility cannot smuggle marketing in as science.

**Third: agents as assistants, not authors.**  
Writing assistance, SEO suggestions, pre-publish checks, an AI Lab grounded in a tenant corpus, formation companions inside courses—the pattern repeats: **AI proposes; humans dispose.** Aggregation is not understanding. A vector index is a map, not a mind.

That is the official design. The lived reality, of course, is messier.

## What actually went wrong

**I confused front-end speed with full-stack truth.**  
I had shipped mobile apps quickly—fast enough that I once told the story as "about four weeks," then corrected myself: "No—actually, a week from start to finish." That correction is not a cute detail. It is evidence of the problem. I extrapolated from a thin slice of experience to a systems problem I did not yet understand.

**I multiplied projects when I should have multiplied discipline.**  
At one point I was carrying **six or seven** active builds—CRM ideas, front ends, experiments—because the visible parts moved fast. AI made the *surface* cheap. It did not make the *underneath* cheap. I was trying the same approach across too many surfaces and wondering why the approach kept failing. Parallel to that sprawl, knowledge itself was scattered across repos and folders; part of the correction was boring consolidation work—making the ecosystem *findable*, not merely *built*—so credibility had somewhere to stand.

**I hit a real fear that the whole thing was a mirage.**  
Late October brought a crisis that was not dramatic on the outside. It was quiet and awful: the suspicion that I had built an elaborate self-deception. That I was "eighty percent done" forever. That I had mistaken tooling for mastery.

## The friend and the video

The scene belongs in a book about credibility, so I will keep it short: I reached out to the one friend I have who is a software developer—not for rescue, mostly to say, "Look what I am building." He did not perform expertise at me. He shared a video the way you hand someone a map when you can see they are lost but you do not want to embarrass them.

Watching it, I felt something shift. Not inspiration—**recognition**. The issue was not "more prompts." The issue was architecture and sequencing—the boring work of making a system legible enough that assistance becomes reliable instead of theatrical.

That week—my notes cluster around **mid-to-late October** (the preface pins dates if you care about the paper trail)—became a reorientation: toward explicit data contracts, toward what I now call a **type-safety chain** (in my builds: database schema as source of truth, then validation, then services, then APIs, then hooks, then UI—downstream discipline, not clever shortcuts). Off the keyboard, the parallel was obvious: if a model is going to touch your corpus or your contracts, you need rails—places where "I think" becomes "here is what we can verify."

If you take nothing else from this chapter, take that: **sometimes the most important AI moment is not a new model. It is a human mirror and a willingness to rebuild.**

## What stayed human

Alan and Brad did not get a black box. They got process—shared documents, visible decisions, the awkward middle where the product is half-born. That relational exposure was not a nice-to-have. It was part of the integrity of the build.

Theology was not outsourced to a chat window. When AI suggested language that smoothed a hard edge, the right move was often to **reject the smoothness**—because the author's moral voice is sometimes supposed to be jagged.

Transparency was not a single blog post. It was a habit: documenting what the platform does and does not do, refusing to publish unverified citations, treating statistics as guilty until proven innocent. I have watched "confident wrong" spread faster than "cautious right." I am trying to build in the opposite direction.

When I later wrote internal notes about **organizational maturity**—how institutions move from awareness to experimentation to governance—the personal version of that showed up first: a hard line about what I would **not** ship while I was still learning, especially anything that looked like public voice or finished authority borrowed from a machine. Institutions need moratoriums and documented use cases; I needed the same instinct in a smaller room.

## What this illustrates (Chapters 5–10 in one life)

- **Amplifier, not faker:** The point was never to manufacture Alan. The point was to make decades of human work easier to find, learn from, and extend—without pretending the machine did the formation.

- **Amplification versus replacement:** Whenever the machine became the author of moral weight, we were off mission. When it became an editor, a transcriber, a pattern detector, a stress-tester—properly bounded—we were closer.

- **Voice preservation:** Rubrics and checks only work if humans keep saying, "That sentence is grammatically fine and spiritually hollow."

- **Networks of trust:** I did not build alone. Credibility in this project was never only individual; it was carried in conversation and correction.

- **Transparency:** If Movemental used AI in the pipeline, the honest posture is to say so—and to separate assistance from authorship.

## What I still do not know

I do not know the optimal adoption path for your institution. I do not know your board dynamics or your denominational politics. I do not know which tasks in your week should be green, yellow, or red—that comes later in the book, and it must be yours.

I do know this: **if your AI story is only a success story, people stop trusting you.** They should.

I failed forward in public more than I liked. I learned that pace without calibration becomes panic, and calibration without relationship becomes clever isolation. The tool rewards output; leadership requires **judgment about which outputs should exist**.

## Invitation

Your context is not mine. You may never build a platform. You may need policies, elders, a communications director, a grant compliance officer—real constraints I did not have in the same form.

But the questions travel:

- Who is the author of the moral weight your people receive?
- Where does agency sit—in you, or in the tool?
- What would it mean for you to amplify work you have actually done—without borrowing authority you have not earned?

If you can answer those with honesty, you do not need my exact stack. You need the posture.

Next, we talk about pace—because once you see what AI can do, the temptation is either to sprint until you break or to freeze until you disappear. Neither is faithful.

---

**Reflection questions**

1. Where have you felt "eighty percent done forever" in your own work—not only with AI, but with any tool that rewards motion?

2. Who are the humans who can mirror your blind spots before your public work does?

3. What is one place this week where you could move agency one step back toward yourself—without romanticizing exhaustion?
