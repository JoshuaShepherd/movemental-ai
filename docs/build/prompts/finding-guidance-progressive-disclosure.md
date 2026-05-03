# Finding AI Guidance Worth Trusting — progressive-disclosure surface

**Status:** build prompt. Open task. Builds on existing canonical work; *does not duplicate it*.

**One-line summary.** We have a 1,500-word canonical essay and a deeply considered editorial brief. We do not yet have a *public surface* that meets a leader where they actually arrive — usually under thirty seconds of attention, often through a search, often when they have just been pitched by a consultant. This prompt proposes that surface: a home-page **band**, a standalone **progressively-disclosed page**, and a tight **discernment-questions component** that can be reused across the site.

**Core editorial frame, preserved from the brief.** The center is *finding guidance worth trusting*, not "buyer's guide." Buyer's-guide language is a useful *frame* for some readers, not the soul. The article's true keystone is the **guide vs. expert** distinction. The November 2022 line is a wedge for atmosphere, not the argument. *"Look for love"* / *"willing to lose a little reach to protect your formation"* is the differentiator. **Procedural closers are derivatives**, not the message.

---

## Read these first (they exist; do not re-research)

| File | What it is | What this surface should do with it |
| --- | --- | --- |
| [`docs/articles/finding-ai-guidance-worth-trusting.md`](../../articles/finding-ai-guidance-worth-trusting.md) | The canonical 1,500-word long-form essay. 208 lines. | The destination. Every piece of this surface links *to* it, never replaces it. |
| [`docs/build/notes/2026-mission-orgs-ai-buying-guide-research-brief.md`](../notes/2026-mission-orgs-ai-buying-guide-research-brief.md) | The editorial scaffold. Documents the publishing order and the moves that flatten the piece. | The voice and editorial rules to follow. **Do not re-litigate** what it has already settled. |
| [`docs/book-development/manuscript-ordered/04-finding-a-guide.md`](../../book-development/manuscript-ordered/04-finding-a-guide.md) | The book chapter the article is anchored to. | Source of any pull-quotes used in the surface. Cite as "the field guide" / "ch. 4," not as a repo path. |
| [`docs/articles/this-is-not-a-tools-problem.md`](../../articles/this-is-not-a-tools-problem.md), [`docs/articles/why-order-matters.md`](../../articles/why-order-matters.md), [`docs/articles/solutions-deployment.md`](../../articles/solutions-deployment.md) | The related reading the article points to in its footer. | The "if you want to keep reading" arc. Surface should respect this sequence, not invent a new one. |

If the implementer reads only one of these before drafting, read **`finding-ai-guidance-worth-trusting.md` start to finish**. Everything below assumes that essay is the source of truth.

---

## What is missing today (the gap the surface fills)

The essay is finished. It is good. **It is not yet reachable.**

A senior leader who is sitting across from a consultant on a Tuesday, has been pitched twice already this month, and has fifteen minutes between meetings does not arrive at a 1,500-word canonical essay first. They arrive at a search result, a forwarded link, or a home page. What they need at that moment of arrival is:

1. **A thirty-second read** that names the trust choice they are actually making, in language they recognize, without selling them anything.
2. **A five-minute set of markers** they can carry into the next conversation with the consultant.
3. **A long-form essay** they can read before the next board meeting, when they have more time.

We have surface 3. We do not have surfaces 1 and 2. Building them is the work.

We also have a soft constraint from the brief: **the procedural derivatives must not flatten the essay's center.** A "buyer's guide page" written without the spine of guide-vs-expert and the hard test ("willing to lose a little reach to protect your formation") is the failure mode the brief warned about. Build accordingly.

---

## The unique angle (in plain language)

Why this particular field warrants a discernment surface, not just a normal "services" page:

- **The technology this market sells expertise about emerged on a specific date.** Modern consumer-facing generative AI is something *the field is grappling with*, not something the field has grown up inside. The article's own line: *"Credentials from 2015 are not disqualifying. They are also not predictive of help with the particular work your organization is actually trying to do in 2026."*
- **The aesthetic of expertise is, right now, almost free to manufacture.** The same tools the market sells expertise about can produce the slide deck, the website, the LinkedIn post, the case study, and the testimonial. The signals leaders previously used to read credibility have been compressed toward zero cost.
- **The cost of getting the trust choice wrong is non-recoverable.** A misjudged AI advisor does not just deliver a bad project; they shape staff judgment, mission voice, and organizational posture for the years their decisions stay in place. The credibility-failure mode is downstream, slow, and quiet — which is exactly the failure mode least likely to show up in a vendor-selection rubric.

This is the substantive reason a generic "buyer's guide" template is the wrong shape. The reader is not selecting a vendor in a category that has matured. They are choosing **whose judgment will be quietly shaping their staff's judgment** — in a category where the people who will be honest about that are outnumbered by the people who will not.

The progressive-disclosure surface is the place where that distinction becomes legible without making the reader read 1,500 words on first contact.

---

## The surface, in three layers

### Layer 1 — The home-page band

A small, quiet section on `/` (one of the bottom-third bands, between the audience trio and the engagement section). Not a primary CTA. Not loud. The reader should encounter it the way they would encounter a footnote in a serious magazine.

**Eyebrow:** "Before you choose anyone"

**Display H2:** "How to read AI guidance, *when no one has grown up with it yet.*"

**Lede (≤ 50 words):** Most leaders we meet have been pitched twice already this month. The fastest help we can offer them, before they spend any money, is a short field guide for reading the people in front of them — a way to tell a guide from a confident performer. Free, no form.

**Two CTAs (pill row):**
- *Read the discernment guide* → `mock-finding-guidance.html` (the new standalone page proposed below)
- *Read the long version* → `mock-field-guide.html` or directly to the article when the React build is wired

**Visual treatment:** band-default (cream, not midnight). One short pull-quote in Instrument Serif italic, drawn from the canonical article — recommend the line:

> "*The choice you are making in this moment is not really about tools or strategies. It is about whose judgment will be quietly shaping your staff's judgment.*"

No ratings. No "what to look for: 5 things." That tone belongs on Layer 2, not on home. The band is a doorway, not a checklist.

---

### Layer 2 — The standalone page (`mock-finding-guidance.html`)

A new full-page mockup. Sits in the public surface alongside the existing thirteen. Reachable from:

- The home-page band (Layer 1).
- The Trusted voices page (a single contextual link in the editorial-note section).
- The FAQ page, "Section 03 — Proof" (one link from the answer to "What about quotes / case studies").
- The Movement leaders page (a single contextual link from the practitioner-fit section, since a practitioner is also asking the trust question, just from the other side of the table).

**Editorial promise.** This page is *not* a marketing page. It is not a sales surface. It does not optimize for time-on-page. It is a public good written by an organization that has, on the same site, named what it does and does not sell. The CTA at the end is "read the canonical essay" or "go back to thinking about your organization." It is *not* "talk to us." We have a contact page for that, and the reader knows where it is.

**Suggested page architecture (top to bottom):**

1. **Hero (band-midnight).**
   - Eyebrow: "A discernment guide for organizational leaders"
   - Display: "How to choose AI guidance *worth trusting*."
   - Lede: a paraphrased, tightened version of the essay's "real question is not which tool" opening — the four-consultant pitch in a month, the question of who to actually trust. ≤ 60 words.
   - Two CTAs: *See the markers* (anchor to §2 below) · *Read the long version* (link to the canonical essay).
   - Hero proof line: "We do not run on logos. The full essay this page is drawn from is on the field guide; both are free, neither is gated."

2. **The 30-second read (band-default).**
   - Section head eyebrow: "If you have thirty seconds"
   - H2: "The choice in front of you is *not really about tools.*"
   - Three or four short paragraphs, each one or two sentences. The job here is to name the trust choice, name the early-stack reality (the November 2022 line as a single beat), and turn the reader toward the markers below. Voice from the essay; ≤ 200 words total.
   - End with a small editorial line: "If that is the right starting frame, the markers below are what we look for. If it is not, the longer essay below has the full reasoning."

3. **The markers (band-section).**
   - Section head eyebrow: "If you have five minutes"
   - H2: "Six markers for *guides, not gurus*."
   - Six cards in a 3×2 (or 2×3) grid. Each card carries one of the markers from the essay's "What I actually look for" section, condensed to a value-line + a two-sentence read-aloud cue:
     1. **Evidence of grappling.** — the "I used to think X, now I think Y" sign
     2. **Evidence of building.** — something shipped, named, reviewed by someone they will name
     3. **Resistance to totalizing answers.** — "it depends" *with the dependencies named*
     4. **Stewardship of pace.** — learning and publishing held distinct
     5. **Accountability to named relationships.** — who corrects them, in public
     6. **Willingness to disappear.** — the engagement plans its own exit
   - The "fit to mission, not just sector" marker from the essay can be folded into card 1 or card 6 to keep the count at six. **Six is the right number** — three flattens the argument; nine starts to look procedural.

4. **The hard test (band-default, prose-led, no card grid).**
   - Section head eyebrow: "If you take only one thing"
   - H2: "Who is willing to *lose a little reach* to protect your formation?"
   - 150–200 words drawn near-verbatim from the essay's "Hard test" section. **This is the load-bearing paragraph** for the whole page. Do not paraphrase; do not soften; do not turn it into bullets. Use a `pull-quote` block to set off the question itself. Keep the sentence "If you cannot identify a moment in the conversation where the person across from you chose your formation over their platform, you do not yet know whether you are looking at a guide" — verbatim — because it is the page's hinge.

5. **Seven questions you can ask out loud (band-section).**
   - Section head eyebrow: "Bring these to the next call"
   - H2: "Seven questions worth asking *out loud*."
   - Numbered ordered list (use `.stages-list` from `mock-pages.css` for visual rhythm). The seven questions are the canonical set in the essay's "Questions worth asking out loud" section; copy verbatim.
   - Below the list, a quiet aside: "There are also red flags and green flags. Both are in the long version, in the same order they are in this page."

6. **Where this came from / disclosure (band-default, narrow-prose).**
   - Section head eyebrow: "On the source"
   - H2: "What this page is, *and what it isn't*."
   - 100–150 words, first-person from the essay's voice. Names the canonical essay, names the editorial brief that scaffolded it, names that the author runs Movemental and is inside the tension being described. The disclosure paragraph from the essay's "Where Movemental fits" section, condensed.
   - This section ensures the page is read as honest meta-commentary, not as marketing.

7. **Final CTA (band-midnight).**
   - Eyebrow: "If this page was useful"
   - H2: "Then read the long version, *or read the field guide.*"
   - Lede: "We did not write this to sell you anything. The CTA below is the same CTA we would give a friend in your seat: read the long version, or read the field guide that frames the work itself, and decide on your own time whether the next conversation is with us."
   - Two CTAs: *Read the long version* (canonical essay) · *Read the field guide* (`mock-field-guide.html`).
   - **No "Start a conversation" button on this page.** The contact page is in the nav; readers who want it know how to find it. Putting it here turns the page into a soft sales surface, which is exactly what the brief warned against.

---

### Layer 3 — The reusable discernment-questions component

A small, reusable card-grid component carrying a *subset* of the seven questions, designed to be dropped into other pages where the trust frame helps the reader. **Not a duplicate of the standalone page; a callout.**

**Where it could live:**

- As a final-third band on the **Trusted voices** page, carrying the question *"Who corrects this person? Whose work sharpens yours?"* — which the Trusted voices page is, in effect, a partial answer to.
- As a small block in the **FAQ** page, Section 03 (Proof), carrying the question *"What did you believe eighteen months ago that you no longer believe, and why?"* — alongside the existing answer about why we don't publish named case studies.
- Optionally on the **Assess** page, framed as "the diagnostic is one of these markers" — but only if the page does not start to feel like marketing-by-proxy.

**Shape.** Three small cards in a row, each carrying one question + one sentence of why-it-matters + a *single* link back to the standalone page. ≤ 80 words per card. Reuses `.outcome-card` styling from `mock-pages.css`.

**Do not reuse this component on:**
- The home page (the band in Layer 1 is the home-page surface; do not double up).
- The audience pages (they have their own work to do; this would dilute it).
- The contact or movement-leaders pages (they have load-bearing editorial of their own).

---

## Editorial rules (non-negotiable)

These are taken directly from the brief, reasserted here so the implementer does not have to re-derive them.

1. **Buyer-of-services language is a frame, not the voice.** The page can quote a buyer's-guide register ("if you have five minutes," "questions to ask"), but the *voice* stays in the essay's register: first-person, accountable, willing to disclose, willing to be wrong.
2. **Treat November 2022 as a single beat.** One short paragraph in the 30-second read, not the spine of the page. The honest argument is *grappling*, not *calendar*.
3. **Do not flatten "look for love" / formation.** The hard-test section is the load-bearing block. If review pressure pushes for it to become a bullet list, refuse the change and link the reviewer to the brief's editorial architecture.
4. **No procedural closer at the end.** The standalone page's CTA is "read the long version." Not "book a call." Not "download the PDF." The brief is explicit on this — "if the ending is only a checklist, the center has been flattened."
5. **Disclose, do not sell.** The disclosure section names that the author runs Movemental and is inside the tension. The brief warned against the page sounding like a contrarian industry takedown; the disclosure prevents that read.
6. **No fabricated examples.** If a marker needs an illustration, draw it from the canonical essay or omit it. Do not invent the four-consultant story for any audience that has not given consent for their story to be told.

---

## Implementation order

1. **Mockup first.** Build `docs/html/mock-finding-guidance.html` against the architecture above. Use the standardized nav and footer from the existing `mock-*.html` family. Wire it into `mock-index.html` under a new section heading like "The work of choosing well." Use existing CSS recipes (`band-*`, `outcome-card`, `stages-list`, `pull-quote`, `evidence-note`) before adding new ones; only one new recipe should be needed (a slightly different "marker card" if `outcome-card` does not carry the right rhythm — verify before adding).

2. **Home-page band.** Add the Layer 1 band to `mock-home.html` between the audiences section and the engagement section. The band is short — it should not push the page to grow appreciably. Verify the page still reads top-to-bottom without rhythm collapse.

3. **Discernment-component drops.** Add Layer 3 callouts on `mock-voices.html` and `mock-faq.html` *only if* they do not crowd those pages. If either page starts to feel busy, hold the addition and revisit.

4. **Copy review with the founder.** Before promoting any of this to React, the founder reads the standalone page out loud, end to end, in one sitting. The brief's standard: *"talk it through in your own voice, then draft."* Same standard applies on the way back into a published surface.

5. **React promotion.** The standalone page becomes a route at `/find-a-guide` (or whatever short slug the founder lands on; the canonical essay's `slug: finding-ai-guidance-worth-trusting` exists already, so this should not collide). The home-page band lands as a new section component under `src/components/sections/home/`. The reusable Layer 3 component lands as a small primitive under `src/components/primitives/` or `src/components/sections/`, depending on how strictly the codebase distinguishes.

6. **SEO + canonical link.** The standalone page sets `<link rel="canonical">` to itself (it is the discernment surface), and prominently links to the canonical essay. The essay does not need to change. Cross-linking should not create a redirect war between them — verify both pages can co-exist as separate canonicals because they serve different reader intents.

7. **Don't index the home-page band as content.** It is a doorway, not a destination. No `id` that becomes a deep link target.

---

## What this prompt is *not* asking for

- **A new long-form essay.** It already exists. Re-writing it is the failure mode the brief explicitly warns against ("starting with checklist, FAQ fragment, services copy, or CTA snippets, then backfilling an article").
- **A formal procurement framework.** The brief is explicit that this surface is not a McKinsey-style buying rubric. The brief calls that "consulting cosplay." This page is a public good in the service of trust, not a procurement tool.
- **A scoring instrument.** No quizzes. No "rate this consultant 1–5 on six dimensions." The category-fit failure mode the page is trying to surface is the kind that scoring rubrics specifically miss — because the kind of consultant who would do well on a public scoring rubric is, at this stage of the field, indistinguishable from the kind who would do badly under year-three review.
- **A separate "for movement leaders" version.** Movement leaders are an ecosystem layer, not an audience. The page reads correctly to a practitioner without a movement-leader-only edition.

---

## Cross-references

- Canonical article: [`docs/articles/finding-ai-guidance-worth-trusting.md`](../../articles/finding-ai-guidance-worth-trusting.md).
- Editorial brief: [`docs/build/notes/2026-mission-orgs-ai-buying-guide-research-brief.md`](../notes/2026-mission-orgs-ai-buying-guide-research-brief.md). Trust the brief's editorial architecture; this prompt does not override it.
- Source chapter: [`docs/book-development/manuscript-ordered/04-finding-a-guide.md`](../../book-development/manuscript-ordered/04-finding-a-guide.md).
- Sibling articles: `this-is-not-a-tools-problem.md`, `why-order-matters.md`, `solutions-deployment.md`.
- Mockup family: `docs/html/mock-*.html`. New surface goes here as `mock-finding-guidance.html`.
- Doctrine on movement leaders: [`docs/build/strategy/movement-leaders-as-ecosystem-layer.md`](../strategy/movement-leaders-as-ecosystem-layer.md). Confirms why no fourth audience version of this surface.
- Companion prompt: [`audience-stage-outcomes-by-audience-tabs.md`](./audience-stage-outcomes-by-audience-tabs.md). Same period of work; different surface.
