# Research Prompt 00: Existing Corpus Audit — What We Already Know

## Purpose

This prompt must run **before the other ten**. Its job is to mine the research, analysis, and thinking that already exists across three repositories and produce a single reference document that tells every subsequent research agent: here is what has already been done, here is what is well-sourced, and here is what still needs external verification.

The goal is not to generate new research. It is to surface, organize, and assess the existing intellectual foundation so that prompts 01–10 build on it rather than duplicate it.

## Repositories to audit

### 1. The docs repo — `/Users/joshuashepherd/Desktop/dev/repos/docs`

This is the largest corpus (~3,863 files). The research-heavy areas are:

**Lab** (`docs/lab/`) — 51 files of formal research:
- `lab/papers/ai/` — Literature reviews, citation networks, source index, paper profiles. **Read all files here.** These are the closest thing to academic research already done.
- `lab/polls/ai/` — Methodology notes, trend analysis, demographic breakdowns, data tables. **Read all files here.** These contain survey/polling data that may already answer questions in prompts 01 and 09.
- `lab/analysis/` — AI/human flourishing rubric, interpretation, ranked events. **Read all files here.**
- `lab/content-marketing-seo-geo/` — May contain SEO/GEO research relevant to prompt 05.
- `lab/youtube/ai/` — Topic digests from major AI voices (Claude, Karpathy, Gemini). Scan for cited research.

**Knowledge** (`docs/knowledge/`) — 163 files of structured curriculum:
- `knowledge/core-content/case-studies/` — 7 historical movement case studies (early church, Methodist, Moravian, Celtic, Chinese underground church). **Read all 7.** These directly inform prompt 04 (movement infrastructure).
- `knowledge/core-content/concept-definitions/` — 16 core concept definitions (APEST, mDNA, apostolic genius, communitas, liminality, organic systems). **Read all 16.** These are the theological vocabulary.
- `knowledge/core-content/contextual-background/` — 7 files covering theological, historical, cultural, and publication contexts. **Read all 7.**
- `knowledge/core-content/comprehensive-qa/` — 14 Q&A files by theme. Scan for cited evidence.

**Intelligence** (`docs/intelligence/leader-research/`) — 428 files:
- Focus on the deep profiles: Alan Hirsch, Brad Brisco, and any leaders with `voice-system/` or `profile/` subdirectories.
- `intelligence/leader-research/tam-search/` — TAM lists, rubric, search methodology. Relevant to prompt 07 (bounded networks).
- `intelligence/leader-research/reflected-understanding/` — Collective research insights across leaders.

**Operations/Strategy** (`docs/operations/strategy/`) — 200+ strategy docs:
- `operations/strategy/movemental-ai/credibility-how-it-works.md` — **Read in full.** This is the most thorough existing analysis of credibility mechanisms. Directly informs prompts 01, 02, and 09.
- `operations/strategy/movemental-ai/SCENIUS-VISUALIZATION-STORY-AND-2028.md` — **Read in full.** Network effects thesis with 2028 retrospective. Informs prompts 02 and 07.
- `operations/strategy/movemental-ai/SCENIUS-DEVELOPMENT-GUIDEBOOK.md` — **Read in full.** Scenius framework. Informs prompt 02.
- `operations/strategy/movemental-ai/guide-ai-credibility-2026.md` — **Read in full.** AI credibility landscape. Informs prompts 01 and 08.
- `operations/strategy/movemental-ai/NETWORK-EFFECT-VISUALIZATION-STORY.md` — Network visualization design. Informs prompt 07.

### 2. The movemental repo — `/Users/joshuashepherd/Desktop/movemental/docs`

**Book development** (`docs/book-development/`) — 91 files:
- `book-development/manuscript-ordered/` — 21 ordered chapters. **Read all chapter files.** These are the most developed articulation of the core arguments. Each chapter likely contains cited research that needs to be extracted and cataloged.
- `book-development/supporting-docs/SECTION_1_RESEARCH_AND_REFERENCES.md` — **Read in full.** This is an explicit research roadmap: 100+ search angles mapped to Section 1 claims, with specific papers, reports, and research gaps identified. This is the most important single file for this audit.
- `book-development/book-synthesis-output.md` — Synthesis of interviews and research.

**Business docs** (`docs/business-docs/`) — 306 files:
- `business-docs/04_thought_leadership/credibility_framework/` — How credibility compounds. Informs prompts 01, 02, 09.
- `business-docs/04_thought_leadership/amplification_case/` — Case for amplification. Informs prompt 05.
- `business-docs/09_research_analysis/` — Audience research, candidate profiles, amplification data. Informs prompts 07 and 10.
- `business-docs/01_business_strategy/selling-points.md` (67K) — Detailed selling points with claims that need verification.
- `business-docs/core-docs/02-credibility-thesis.md` — Core credibility argument.
- `business-docs/core-docs/26-the-convergence.md` — The convergence thesis.

**Movement leader research** (`docs/movement_leader_research/`) — 412 files:
- Deep dossiers for Alan Hirsch, Brad Brisco, JR Woodward (content audits, gap analysis, movemental fit, digital presence, network mapping).
- `movement_leader_research/author-research/` — Cross-leader synthesis.

**Articles** (`docs/articles/`) — 24 files:
- `articles/guide-ai-credibility-2026.md` — AI credibility guide.
- `articles/LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md` — SEO/GEO strategy. Informs prompt 05.
- `articles/03-transformation-over-information.md` — Formation argument. Informs prompt 06.
- `articles/04-the-eight-week-formation-scaffold.md` — Pedagogical structure. Informs prompt 06.

**Research** (`docs/research/`) — 1 key file:
- `research/authoritative-sources-ai-nonprofits-faith-formation.md` (~2,500 lines) — **Read in full.** Curated source index with quality rubric, 12-tier source framework, and a "content router" mapping 13 recurring questions to specific research tiers. This is the existing research methodology.

**Arguments** (`docs/arguments/custom-gpt/`) — 10 files:
- The messaging corpus with 173 argument cards, strength ratings, and source attribution. Scan `messaging-06-proof.md` specifically for existing evidence citations.

### 3. The alan-hirsch repo — `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch`

**Public documentation** (`_docs/_public/`):
- `_public/insights/` — Analysis documents including AI model intelligence report, pricing analysis, home page consultation, copy grading. Scan for cited research.
- `_public/proposals/` — Vision documents for AI Lab, pricing, pathways. May contain market research.

**Content library** (`content-library/`):
- 13 articles and 9 book reviews with analysis (sentiment, objection maps, reader language maps). The book reviews are particularly valuable — they represent existing literary analysis.

### 4. The movemental-ai repo — `/Users/joshuashepherd/Desktop/dev/repos/movemental-ai`

**Root-level strategy documents** (the "big six"):
- `credibility-how-it-works.md` (51K) — The most thorough credibility analysis anywhere in the corpus.
- `SCENIUS-DEVELOPMENT-GUIDEBOOK.md` (26K) — Scenius framework and development strategy.
- `SCENIUS-VISUALIZATION-STORY-AND-2028.md` (20K) — Network effects thesis.
- `guide-ai-credibility-2026.md` (17K) — AI and credibility posture.
- `NETWORK-EFFECT-VISUALIZATION-STORY.md` (16K) — Network visualization.
- `HOW-IT-WORKS-PAGES-OVERVIEW.md` (20K) — Educational page strategy.

**Leader data** (`data/`):
- `movement-leaders.json` — Structured data on 100+ leaders.

**Business docs** (`_docs/business-docs/05_leadership_ops/`):
- Leader evaluation system (100-point rubric).
- Leader profiles, onboarding, prospecting frameworks.

## What to extract

For every file read, extract and catalog:

### A. Cited statistics and data points
For each statistic or data point found (e.g., "68% of internet users..."), record:
- The exact claim as stated
- The source cited (if any)
- Whether the source is primary (academic paper, survey report) or secondary (article citing a study)
- Confidence: **Sourced** (traceable to a specific publication) / **Attributed** (cites a general source like "Pew Research" but no specific report) / **Unsourced** (stated as fact without citation)

### B. Named scholars, frameworks, and intellectual debts
Who is cited or invoked? Build a list of:
- Named scholars (Brian Eno, Rodney Stark, Elizabeth Eisenstein, etc.)
- Named frameworks (EEAT, scenius, mDNA, etc.)
- Named studies or reports
- Historical examples used as evidence

### C. Original analysis and argumentation
What thinking has already been done that doesn't need to be redone? Flag:
- Arguments that are well-developed and internally coherent
- Analysis that synthesizes multiple sources
- Strategic frameworks that represent settled thinking (e.g., the credibility playbook, the scenius development guidebook)

### D. Gaps explicitly identified
Where does the existing corpus acknowledge it needs more evidence? Look for:
- Phrases like "needs research," "to be verified," "estimated," "approximately"
- The research roadmap in `SECTION_1_RESEARCH_AND_REFERENCES.md`
- The authoritative sources index's "content router" (questions mapped to source tiers)
- Anywhere a claim is rated MEDIUM or LOW strength in the argument index

### E. Internal contradictions or tensions
Where does the corpus say conflicting things? Flag:
- Different revenue projections or market size estimates across documents
- Tensions between "bounded scale" and "network effects" language
- Places where the same concept is framed differently in different documents

## Skills to use

This is primarily a **reading and synthesis task**, not a web research task. The relevant skills are:

- `/article-corpus` — for searching the Alan Hirsch book corpus for specific passages
- Direct file reading across all four repos

Do **not** use `/academic-research`, `/poll-opinion-research`, or `/author-research` for this prompt. Those are for prompts 01–10. This prompt audits what we have; those prompts fill what we lack.

## Output expectations

### Primary output: Existing Research Inventory
Save as `docs/build/research/raw/00-existing-corpus-audit.md`

Structure the document as follows:

#### Part 1: Statistics and Data Points Catalog
A table with columns: Claim | Source Cited | Confidence Rating | Found In (file path) | Relevant Research Prompt (01–10)

#### Part 2: Intellectual Bibliography
A list of every named scholar, framework, study, and historical example found in the corpus, with the file(s) where each appears. Group by theme.

#### Part 3: Settled Thinking
Summaries (2–5 sentences each) of the arguments and analyses that are well-developed and should be treated as foundation, not starting points for re-research. Include file paths.

#### Part 4: Explicit Gaps
A list of everything the corpus itself identifies as needing more evidence, organized by which research prompt (01–10) should address it. Include file paths and the exact language used.

#### Part 5: Tensions and Contradictions
A list of internal inconsistencies across the corpus, with file paths and the conflicting statements.

#### Part 6: Research Prompt Readiness Matrix
For each of the 10 research prompts, a brief assessment:
- What existing material is available (with paths)
- What the existing material already establishes
- What remains genuinely unknown and needs external research
- Recommended priority: **High** (core claim lacks evidence) / **Medium** (claim has some support but needs strengthening) / **Low** (existing material is sufficient for current purposes)

### Secondary output: Annotated Bibliography
Save as `docs/build/research/articles/00-what-we-already-know.md`

A readable 3,000–5,000 word synthesis that tells the story of what has already been thought through, analyzed, and documented across these repos. Written for a human reader (the founder, a collaborator) who wants to understand the state of the intellectual foundation without reading 4,000 files. Should be honest about what's well-sourced, what's plausible but unsourced, and what's genuinely speculative.

## Why this matters

Without this audit, the 10 research prompts risk:
1. **Duplicating** analysis that already exists in `credibility-how-it-works.md` or the book manuscript
2. **Missing** data points that are already cited somewhere in the 306 business docs
3. **Contradicting** settled strategic decisions documented in the scenius guidebook
4. **Ignoring** the explicit research gaps already identified in `SECTION_1_RESEARCH_AND_REFERENCES.md`

This prompt ensures the research effort is additive, not redundant.
