# Research Prompts — Deepening the 173 Arguments

These 22 prompts (00 + 01–21) are designed to be run by Claude agents with research skills (`/academic-research`, `/poll-opinion-research`, `/author-research`, `/article-corpus`). Each prompt:

1. **Identifies the specific claims** from the [deduped argument index](../../../html/tabbed-argument-page.html) that need deeper support
2. **Asks targeted research questions** — empirical verification, intellectual history, counter-arguments
3. **Specifies output in two forms:**
   - **Raw research** → `docs/build/research/raw/` — full citations, methodology notes, confidence assessments
   - **Exploratory article** → `docs/build/research/articles/` — intellectually honest synthesis (1,500–5,000 words)

## Execution order

**Prompt 00 must run first.** It audits existing research and thinking across four repos (movemental, docs, alan-hirsch, movemental-ai) so that prompts 01–20 build on what's already been done rather than duplicating it. Its output — a research inventory and readiness matrix — should be read by every subsequent agent.

## The 21 Research Threads

### Tier 1: Foundation (run first)

| # | File | Theme | Scope |
|---|------|-------|-------|
| **00** | [**existing-corpus-audit**](00-existing-corpus-audit.md) | **What we already know** — mine the existing repos | **Internal audit across 4 repos (~5,000 files)** |

### Tier 2: Core thesis (01–04)

| # | File | Theme | Scope |
|---|------|-------|-------|
| 01 | [ai-credibility-crisis](01-ai-credibility-crisis.md) | Is the credibility crisis real? Verify the stats. | Pain, Argument, Proof |
| 02 | [scenius-network-credibility](02-scenius-network-credibility.md) | Does scenius actually work as a credibility mechanism? | Argument, Theology |
| 03 | [publishing-economics](03-publishing-economics-creator-economy.md) | Is 90/10 revolutionary? What are real publishing economics? | Business Model, Selling Point, Pain |
| 04 | [movement-infrastructure](04-movement-infrastructure-historical.md) | Do the historical analogies (Reformation, early church) hold? | Positioning, Argument |

### Tier 3: Platform and strategy (05–10)

| # | File | Theme | Scope |
|---|------|-------|-------|
| 05 | [seo-geo-discoverability](05-seo-geo-expert-discoverability.md) | Can a platform solve the expert visibility gap? | Pain, Strategy, Selling Point |
| 06 | [formation-vs-information](06-formation-vs-information-digital.md) | Does transformational learning work online? | Theology, Feature, Argument |
| 07 | [bounded-networks](07-bounded-networks-platform-economics.md) | Can 100 leaders generate real network effects? | Positioning, Strategy, Business Model |
| 08 | [ai-theological-anthropology](08-ai-theological-anthropology.md) | Where does Movemental sit in the theology-of-AI landscape? | Theology, AI Posture |
| 09 | [trust-verification](09-trust-verification-digital-identity.md) | How does trust actually work online in an AI age? | Proof, Argument, Strategy |
| 10 | [content-fragmentation](10-content-fragmentation-leader-visibility.md) | Is consolidation actually the right solution? | Pain, Selling Point, Feature |

### Tier 4: Product and operations (11–15)

| # | File | Theme | Scope |
|---|------|-------|-------|
| 11 | [voice-preservation](11-voice-preservation-ai-fidelity.md) | Can AI actually preserve a leader's authentic voice? | Feature, Argument, AI |
| 12 | [competitive-landscape](12-competitive-landscape.md) | Are the vs. comparisons (publishers, Substack, WordPress) honest? | Positioning, Business Model |
| 13 | [content-repurposing](13-content-repurposing-sustainability.md) | Can leaders sustain quality content at 5 hours/week? | Feature, Strategy |
| 14 | [church-planting-movements](14-church-planting-movements-data.md) | Do the movement growth statistics hold up? | Proof, Argument |
| 15 | [adaptive-leadership](15-adaptive-leadership-ai-adoption.md) | Is Heifetz's framework the right lens for AI adoption? | Argument, Strategy |

### Tier 5: Deep structure (16–20)

| # | File | Theme | Scope |
|---|------|-------|-------|
| 16 | [convergence-thesis](16-convergence-thesis.md) | Are four forces actually converging, or is this narrative? | Positioning, Argument |
| 17 | [assessment-science](17-assessment-science-personalization.md) | Is APEST psychometrically valid? Can assessments drive content? | Feature, Proof |
| 18 | [communitas-digital](18-communitas-digital-community.md) | Can Turner's communitas survive translation to online? | Theology, Feature |
| 19 | [gender-diversity](19-gender-diversity-movement-leadership.md) | The 18% problem — what does the research say? | Audience, Strategy, Proof |
| 20 | [pricing-psychology](20-pricing-psychology-value-models.md) | Is $1,000 + 10% positioned correctly? | Business Model, Strategy |

### Tier 6: Organizational offering (21)

| # | File | Theme | Scope |
|---|------|-------|-------|
| 21 | [nonprofit-system-builds](21-nonprofit-system-builds-grounding.md) | Total grounding for the four co-created system builds | Governance, Experimentation, Fundraising, Content/Formation |

## Source repos

Prompt 00 audits all four; prompts 01–10 do external research to fill gaps 00 identifies.

| Repo | Path | What it contains | Approx. files |
|------|------|------------------|---------------|
| **docs** | `/Users/joshuashepherd/Desktop/dev/repos/docs` | Book corpus (13 books), knowledge base, lab research (papers, polls, analysis), intelligence (50+ leader profiles), strategy, courses, pathways | ~3,863 |
| **movemental** | `/Users/joshuashepherd/Desktop/movemental/docs` | Book manuscript (21 chapters), business docs (306 files), movement leader research (412 files), articles, argument index | ~1,000+ |
| **alan-hirsch** | `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch` | Content library (articles + book reviews), public insights, proposals, AI Lab docs | varies |
| **movemental-ai** | `/Users/joshuashepherd/Desktop/dev/repos/movemental-ai` | Root-level strategy docs (credibility, scenius, network effects — the "big six"), leader data JSON, UI design docs | varies |

## How to run

Each prompt is self-contained. To execute:

1. **Run prompt 00 first** — it produces `docs/build/research/raw/00-existing-corpus-audit.md`
2. Open each subsequent prompt file (01–10)
3. Reference the 00 audit output to understand what's already established
4. Use the suggested skills (listed in each prompt's "Skills to use" section)
5. Save outputs to the specified paths under `docs/build/research/raw/` and `docs/build/research/articles/`

The prompts 01–10 are ordered roughly by priority — the credibility crisis thesis (01) and scenius mechanism (02) are foundational to everything else. Publishing economics (03) and movement infrastructure (04) support the positioning. The remaining six deepen specific claims.

## Ground rules for research agents

- **Start from what exists.** Read the 00 audit output before beginning any external research. Don't duplicate work already done.
- **Intellectual honesty over advocacy.** These articles are for internal use. If a claim doesn't hold up, say so clearly.
- **Full citations.** Every statistic needs a traceable source with author, date, and publication.
- **Confidence ratings.** For each major claim, rate: Verified / Partially Supported / Unverified / Contradicted.
- **Counter-arguments.** The best research surfaces the strongest objections, not just supporting evidence.
- **Practical recommendations.** Each article should end with what Movemental should do differently based on what the research shows.
