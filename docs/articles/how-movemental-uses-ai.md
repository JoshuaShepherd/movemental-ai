---
title: "How Movemental Uses AI"
slug: how-movemental-uses-ai
shape: guide
author: Josh Shepherd
audience: [any]
status: eeat-candidate
eeat_score_band: 70-74
purpose: "Tell the story of how Movemental uses AI—from an author’s work to delivery—in plain language. For audiences who may not have considered that some of this is even possible."
---

# How Movemental Uses AI

## The Author’s Work Comes First

The story doesn’t start with AI. It starts with the author.

Alan Hirsch has spent decades writing books, teaching courses, preaching sermons, and producing articles. *The Forgotten Ways*, *5Q*, *Reframation*, *Metanoia*—works that shape how people think about missional church and movement. Six pathways: Jesus Is Lord, Reframation, Metanoia, mDNA, Movement Intelligence, Forgotten Ways. The mDNA course, portal cards, evergreen articles. All of it human-authored, human-decided. That body of work is the foundation. Everything else builds on it.

Movemental’s job is to get that content online, discoverable, and useful—without flattening it into generic AI slop. Here’s what actually happens.

---

## Part 1: Getting the Work Online

### Books, articles, and videos have to become data

A PDF is a PDF. A sermon is a recording. To make them searchable, translatable, and usable by AI, they have to become structured text in a database.

**Books.** Alan’s books arrive as PDFs. Those get turned into MDX (structured markup), then ingested into Supabase as `books` and `book_chapters`. Spanish and Portuguese translations follow the same path—including AI-assisted translation where a human reviews for consistency. The result: the same platform, same checkout, multiple languages.

**Articles.** Markdown from the content-library goes through ingest scripts into `content_items`. No AI in the upload itself—pandoc and scripts. Deterministic.

**Video.** Sermons and talks get transcribed. YouTube URLs or uploaded files → audio extraction (FFmpeg) → transcription (OpenAI Whisper) → optional pass to add paragraphs and headings. The text then grounds courses and search. The video becomes something you can search and cite.

**Batch translation.** For large documents, files go to OpenAI’s Batch API. A job is queued, runs in the background, and the result lands in storage. Same idea as the Spanish/Portuguese books: scale without hand-translating every paragraph.

The point: the author’s work is turned into searchable, queryable text. AI helps with translation and transcription. The content itself is human-authored or human-verified.

---

## Part 2: Learning What “Sounds Like” the Author

Once the corpus exists, the next step is to understand what makes it *him*.

Movemental uses a **corpus extraction** process. Someone reads a representative slice of the work—chapters, articles, talks—and identifies recurring patterns:

- **Voice markers** — Named, weighted dimensions. For Alan: Christocentric anchoring (30%), pastoral warmth (20%), narrative imagery (15%), theological depth (10%), prophetic intensity (25%). Each has concrete targets—e.g., about 8.5 metaphors per 1000 words, 3.2 questions per 1000 words.
- **Failure modes** — What it *must not* sound like: corporate consultant, detached academic, antithesis (“not X but Y”), rushing to practice, homiletical mode.
- **Signature elements** — Direct address balance (45% we / 35% you / 20% I), biblical integration woven not proof-texted, rhetorical patterns (Reframe → Ground → Extract → Connect → Land).

This isn’t AI guessing. It’s humans reading, measuring, and naming. The output becomes instructions and rubrics that AI tools use later—so when AI *does* help, it’s calibrated to the author’s voice.

---

## Part 3: AI as Editor and Quality Gate

### Writing Assistant

When you’re drafting in the dashboard, you can select text and ask the Writing Assistant to refine, expand, condense, reframe, or deepen it. The assistant has access to the corpus (via vector search), voice instructions, and content-form templates (article vs. blog vs. chapter). It suggests. You accept or reject. It doesn’t publish. You do.

### Credibility check (anti-slop)

AI can sound confident and generic. The Credibility Agent checks: *Does this actually sound like the author?*

It scores drafts on dimensions like signature elements, tone, structure, language patterns, rhetorical devices, thematic alignment. Organizations can customize rubrics (in `credibility_rubrics`). The output is feedback—not a gate that blocks publishing, but a signal. “This paragraph drifts toward consultant-speak.” “This one’s missing the Christocentric anchor.”

Same idea in the voice eval: compare candidate text to canonical examples, compute coherence by voice marker, return the closest example and a breakdown. Helps you catch when you’re drifting.

### SEO Agent

A separate agent handles SEO: keyword research, structure optimization, schema markup, social meta tags, internal links, image optimization. It scores content on a 100-point scale (quality, technical, engagement, amplification). Again: AI suggests; humans decide.

### Pre-publish

Some flows combine SEO and Credibility: run both before publish. One pass, two sets of feedback.

---

## Part 4: Content Pipeline and Delivery

### Content pipeline preview

On the marketing site, visitors can try the **Content Pipeline Preview**. You pick your sources—books, sermons, PDFs, YouTube, Notion, Google Drive, etc.—and an agent shows how Movemental would process them: identify voice, themes, lane; structure for discovery; produce evergreen content. It’s a demo of the journey, not the journey itself.

### AI Lab

On the tenant site (e.g., alan-hirsch), **AI Lab** is a chat interface grounded in the tenant’s corpus. Before you chat, a context wizard asks: preferred name, language, region, what you’re working on, topics, conversation type. That context shapes the responses. The agent uses semantic search over the corpus, voice instructions, and theme-specific guidance (metanoia, movemental, mDNA). It’s tuned to sound like the author when answering—within the guardrails.

### Formation Companion

In-course chat. The Formation Companion knows which course, section, and lesson you’re in. It can fetch content context, search the corpus, and use your formation goals. Same voice, same corpus, but course-aware.

### AI Book

Movemental’s **AI Book** is a free knowledge spine—shared language for platform ownership, revenue models, movemental impact. It’s not a lead magnet; it’s foundational reading. Human-authored, AI-assisted structuring where applicable.

---

## Part 5: What Movemental Does *Not* Do

This is where it gets serious.

### AI does not write the corpus

The corpus—Alan’s books, pathways, articles, courses—is source material. AI reads it. It does not write it. We do not put AI-generated content into the corpus and treat it as Hirsch. We do not let AI invent stories or fabricate citations and call them source material.

### We do not publish raw AI output

Every citation, attribution, number, and story is verified. If we can’t verify it, we cut it. AI assists; humans decide. We publish what humans have verified, interpreted, and revised—not what AI produced without that pass.

### We do not trust AI’s confidence

AI speaks in declarative sentences. It sounds certain. That doesn’t mean it’s right. We treat every citation, attribution, and statistic as unverified until we’ve checked it.

### The division of labor

| AI | Humans |
|----|--------|
| Aggregate across corpus | Reflect on meaning |
| Surface patterns | Interpret patterns |
| Extract and cite | Verify citations |
| Suggest structure | Decide structure |
| Synthesize drafts | Revise for voice |

**Aggregation ≠ understanding.** The index is a map. Human reflection is the payoff.

### Hallucination protocol

1. Extract with AI. Get the list, citations, draft.
2. Verify before publish. Every citation, attribution, number, story.
3. If you can’t verify, cut it. Better to omit than to publish something false.
4. Don’t let AI add to the corpus.
5. Document when we catch one. Learn. Tighten the protocol.

**The corpus is the authority.** If we publish something that looks like a citation but isn’t, we’ve violated that authority. We’d rather publish less and be right than publish more and be wrong.

---

## Summary: The Journey in One Paragraph

The author’s work—books, sermons, articles, courses—is the starting point. Movemental ingests it (with AI helping on transcription and translation), extracts its voice through human-led corpus analysis, and uses that to calibrate tools: Writing Assistant, Credibility Agent, SEO Agent, AI Lab, Formation Companion. AI suggests, structures, and checks. Humans verify, interpret, and publish. The corpus stays human. The platform stays trustworthy.

---

**Document version:** 2.0 — February 2026 (rewritten as article, author-first, journalism-style)