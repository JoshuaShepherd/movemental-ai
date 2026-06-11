# EEAT research content qualification rubric (0–100)

**Status:** Working note — use to triage documents from the Movemental corpus before adding them to the public research layer.  
**Date:** 2026-06-11  
**Purpose:** Score any candidate document (from the hundreds of files across Movemental repos and synced desktop corpus) for **current value as an EEAT research article** — i.e. worth promoting, adapting, or citing in the stack that feeds `/footnotes`, long-form articles, field guides, and agent knowledge.

**What this rubric is for:** Deciding *what to add* from existing intellectual property — not grading net-new drafts from scratch (though the same dimensions apply).

**What “EEAT research content” means here:** Internal or publishable synthesis that makes Movemental’s **Experience, Expertise, Authoritativeness, and Trust** legible to humans and systems — with traceable sources, honest limits, and a path to `/footnotes` or `docs/build/research/articles/`. It is **not** marketing copy, leader onboarding dossiers, or HTML prototypes unless heavily reworked.

---

## Corpus scope (where to look)

Primary trees referenced by [00-existing-corpus-audit](../research/prompts/00-existing-corpus-audit.md) and synced locally:

| Location | Approx. role | Typical doc types |
|----------|--------------|-------------------|
| `docs/from-movemental-ai/docs/` (sync of Desktop `movemental/docs`) | Book, business, articles, research SSOT | Manuscript chapters, credibility thesis, authoritative-sources index, strategy memos |
| `docs/build/research/articles/` + `raw/` | **Existing research article series** (01–21) | Finished or draft syntheses — check here first for duplicates |
| `docs/articles/graded-high/` | **EEAT triage staging** (score bands 70–74, 75–79, 80–84, 85–99) | Normalized candidates awaiting promotion to `docs/articles/` or research series |
| `docs/articles/` | Publishable long-form (frontmatter contract) | Canon, guides, playbooks — higher bar than research notes |
| `docs/movement_leader_research/` | Per-leader dossiers (~150 slugs) | Identity, biography, fragmentation — EEAT for *voices*, not org thesis |
| Root strategy docs (`guide-ai-credibility-2026.md`, `credibility-how-it-works.md`, etc.) | Settled doctrine | Often **already canonical** — score for *extract*, not re-article |
| Desktop `Alan-Hirsch-Movement-Leader-Research.md` | Single-leader deep export | Leader EEAT substrate, not Movemental org research |

**Rule of thumb:** If prompt 00 or `docs/build/research/raw/00-existing-corpus-audit.md` lists the file under **“Settled thinking — do not re-argue,”** cap **Strategic fit** unless the doc adds *new* evidence or a distinct audience angle.

---

## Scoring model (100 points)

Five dimensions, weighted by what actually determines whether a corpus file becomes a durable EEAT research article.

| # | Dimension | Max | Question it answers |
|---|-----------|-----|---------------------|
| A | **Strategic fit & gap fill** | 20 | Does Movemental still need this argument, and is it missing from the research series? |
| B | **Evidence & citation integrity** | 25 | Would we stake `/footnotes` and public claims on this sourcing? |
| C | **Argument & claim load** | 20 | How many live claims, argument cards, or EEAT rows does it support? |
| D | **Publication readiness** | 15 | How much edit work to reach a 1,500–5,000 word honest synthesis? |
| E | **EEAT deployability** | 20 | Can it wire to registry, linking, GEO, and agent KB without rework? |

**Total:** 100

---

## Dimension A — Strategic fit & gap fill (0–20)

| Score | Criteria |
|-------|----------|
| **18–20** | Fills a **named gap** in `docs/build/research/prompts/` (01–21) or [master talking-points index](./movemental-master-talking-points-index.md) §1–3; no adequate article exists; topic is **load-bearing** for org positioning (credibility crisis, scenius, formation, governance, discoverability). |
| **14–17** | Strong fit for a **secondary** surface (field guide, FAQ derivative, agent KB phase); partial overlap with an existing article but **distinct angle** (sector-specific, pastoral ethics layer, counter-argument pass). |
| **10–13** | Useful background; overlaps existing synthesis; would be a **merge-into** footnote or appendix, not a standalone article. |
| **5–9** | Tangential (single-leader bio, internal ops, HTML mockup notes, pricing mechanics without evidence layer). |
| **0–4** | Superseded, duplicate of settled doctrine, or **doctrine drift** (e.g. fourth audience funnel, recruiting roster, “Scenius” as public H1). |

**Quick checks:**
- Cross-reference [research prompts README](../research/prompts/README.md) tier list.
- Grep argument index / `docs/arguments/` for claim IDs the doc supports.
- If the doc only restates `credibility-how-it-works.md` or `guide-ai-credibility-2026.md` without new sources → max **8** here.

---

## Dimension B — Evidence & citation integrity (0–25)

This is the EEAT backbone. Adapted from the source-quality table in `docs/research/authoritative-sources-ai-nonprofits-faith-formation.md` (Desktop `movemental/docs` sync: `docs/from-movemental-ai/docs/research/…`) and the confidence labels in [00-existing-corpus-audit](../research/raw/00-existing-corpus-audit.md).

| Score | Criteria |
|-------|----------|
| **22–25** | Majority of material facts are **Sourced** (author, date, publication, URL/DOI); methods/limitations stated; mix of **primary** (Pew, NIST, peer-reviewed) and Movemental synthesis clearly labeled; no known **Contradicted** headline stats left unflagged. |
| **17–21** | Most claims **Sourced** or **Attributed**; gaps explicitly marked “to be verified”; counter-evidence acknowledged (exemplar: [01-ai-credibility-crisis.md](../research/articles/01-ai-credibility-crisis.md)). |
| **12–16** | Mix of sourced and unsourced; useful **intellectual bibliography** but needs a verification pass before any public stat. |
| **6–11** | Mostly **Unsourced** statistics or “studies show”; vendor whitepapers without triangulation; leader `sources.md` rows marked “To be verified.” |
| **0–5** | Fabricated precision, broken telephone stats (e.g. unsourced “68%”), or **empirical claims presented as theological certainty** without layer labels. |

**Per-claim confidence (use when scoring B):**

| Label | Meaning | Points toward B |
|-------|---------|-----------------|
| **Sourced** | Traceable primary or reputable secondary with citation | Full credit |
| **Attributed** | Named org but no specific report/edition | Half credit |
| **Unsourced** | Stated as fact, no citation | No credit |
| **Contradicted** | Better evidence weakens the claim | Negative signal — flag for rewrite |

**Automatic cap:** Any doc that **depends** on a Contradicted headline stat for its thesis → **B ≤ 10** until rewritten.

---

## Dimension C — Argument & claim load (0–20)

| Score | Criteria |
|-------|----------|
| **18–20** | Directly supports **multiple** live surfaces: home claims, `/field-guide`, pricing narrative, argument cards, or agent KB; maps to EEAT layers (Experience/Expertise/Authoritativeness/Trust) with explicit examples. |
| **14–17** | Supports **one** major public claim cluster or a full research prompt thread; clear “so what for Movemental” section. |
| **10–13** | Enriches vocabulary or history; **one** footnote-worthy claim or definitional stability (e.g. “credibility collapse” coinage + definition). |
| **5–9** | Anecdotal or single-leader proof only; valuable for `/voices`, not org EEAT research series. |
| **0–4** | No extractable claims; pure process, meeting notes, or duplicate of [site-voices-eeat mapping](../../movement_leader_research/site-voices-eeat-audience-credentials.md) without extension. |

**Reference:** `docs/articles/LINKING-STRATEGY-EEAT-GEO-PLAYBOOK.md` (synced corpus) — linking is how authoritativeness becomes machine-readable; docs that name **who vouches, who is cited, what is primary** score higher.

---

## Dimension D — Publication readiness (0–15)

Target shape: [research prompt output spec](../research/prompts/README.md) — 1,500–5,000 words, executive summary, confidence ratings, counter-arguments, practical recommendations.

| Score | Criteria |
|-------|----------|
| **13–15** | Already reads as synthesis: headings, through-line, honest tone; ≤1 editing pass to match research article template; has or can easily gain YAML frontmatter per `src/lib/articles-schema.ts`. |
| **10–12** | Solid raw material (`raw/` tier); needs structural edit and source cleanup (~1–2 days). |
| **7–9** | Fragment: outline, bullet memo, or book chapter **slice**; needs extraction and merge. |
| **4–6** | Archive-quality notes, chat export, or duplicate draft; heavy rewrite. |
| **0–3** | Unstructured scrape, PDF-only, or HTML prototype with no citable prose. |

**Doc-shape modifiers (apply after base D score):**

| Shape | Modifier |
|-------|----------|
| Book manuscript chapter (`book-development/manuscript-ordered/`) | −2 (often needs de-duplication vs other chapters) |
| `business-docs/core-docs/` strategy | −1 (often lacks citations) |
| Lab / poll / paper profile (`docs/lab/`) | +2 (often closer to research article) |
| Leader dossier (`movement_leader_research/*/profile/`) | −3 for *org* research series (different product) |
| Already in `docs/build/research/articles/` | Score **0** — already added |

---

## Dimension E — EEAT deployability (0–20)

| Score | Criteria |
|-------|----------|
| **18–20** | Ready for: `eeat-site-claims.json` rows, `/footnotes` footnotes, internal linking hubs, JSON-LD-friendly definitions, agent KB excerpt; **stable entities** (named people, frameworks, institutions); extractable **quotable** paragraphs. |
| **14–17** | Needs light structuring (claim → source → footnote table) but content is deployable; fits GEO playbook layers (extractable expertise, primary-ness, stable entities). |
| **10–13** | Useful for agent retrieval only; no clean public claim boundaries. |
| **5–9** | Internal strategy; requires redaction or reframing before any public EEAT surface. |
| **0–4** | Cannot be quoted without misleading (pre-decision pricing, unconfirmed scholarships, persona seats presented as real leaders). |

**Deployability checklist (each ✓ ≈ +4 max):**
- [ ] At least **3** claims mappable to `claim` + `cite` + `footnote` registry shape (`src/lib/citations/eeat-registry.ts`)
- [ ] Distinguishes **empirical vs ethical vs advocacy** layers (authoritative-sources writer’s router)
- [ ] **Stable URLs/slugs** suggested for any new public page
- [ ] **Internal links** to existing canon named (credibility doc, path stages, field guides)
- [ ] No **hardcoded unverified stats** on Safety/home-tier surfaces without `[RE-VALIDATE]` flag

---

## Score bands — decision thresholds

| Total | Band | Action |
|-------|------|--------|
| **85–100** | **A — Add now** | Promote to `docs/build/research/articles/` (or `docs/articles/` if publish-ready); wire citations; add to research index. |
| **70–84** | **B — Adapt first** | Create raw + article pair; run verification pass on stats; 1 structured edit sprint. |
| **50–69** | **C — Mine, don’t publish** | Extract claims into audit spreadsheet / footnote backlog; keep as source for future synthesis. |
| **30–49** | **D — Archive reference** | Link from internal docs only; do not spend article pipeline time. |
| **0–29** | **E — Skip** | Duplicate, superseded, wrong audience, or integrity risk. |

**Hard gates (override band):**
- **Any dimension B ≤ 5** → cannot exceed **Band C** until sourcing fixed.
- **Settled thinking duplicate** (Part 3 of corpus audit) → cannot exceed **Band C** unless new primary evidence added.
- **Leader dossier** for org research series → cap **60** unless reframed as sector case study with sourced outcomes.

---

## Scoring worksheet

Copy for each candidate document:

```text
Document: [path]
Title: 
Date assessed: 
Assessor: 

A Strategic fit ( /20): 
B Evidence integrity ( /25): 
C Argument load ( /20): 
D Publication readiness ( /15): 
E EEAT deployability ( /20): 
─────────────────────────
TOTAL ( /100): 
Band: 
Primary gap filled (prompt # or talking-point §): 
Duplicate of: 
Claims to extract (count): 
Next action: 
```

---

## Example calibration scores

Illustrative — re-score when corpus changes.

| Document | A | B | C | D | E | Total | Band | Notes |
|----------|---|---|---|---|---|-------|------|-------|
| [01-ai-credibility-crisis.md](../research/articles/01-ai-credibility-crisis.md) (published) | 20 | 23 | 19 | 14 | 18 | **94** | A | Gold standard: honest stat hygiene, claim softening, Movemental implication. |
| `docs/research/authoritative-sources-ai-nonprofits-faith-formation.md` | 16 | 24 | 15 | 12 | 17 | **84** | B | Not an article — **index/router**; promote as SSOT appendix, not narrative piece. |
| [guide-ai-credibility-2026.md](../../guide-ai-credibility-2026.md) | 18 | 14 | 17 | 13 | 16 | **78** | B | Settled posture doc; extract to field guide + footnotes, don’t duplicate as research #22. |
| `credibility-how-it-works.md` (Desktop corpus / sync) | 15 | 12 | 18 | 10 | 15 | **70** | B | Doctrine-complete; needs citation pass for public stats. |
| Book ch. `01-the-credibility-crisis` (`book-development/manuscript-ordered/`) | 17 | 8 | 16 | 8 | 12 | **61** | C | Narrative strong; **B low** until 68%/40–60% stats fixed per audit. |
| `SECTION_1_RESEARCH_AND_REFERENCES.md` (`book-development/supporting-docs/`) | 14 | 20 | 14 | 6 | 10 | **64** | C | **Mine** for footnotes, not publish as article. |
| Leader `profile/biography.md` (typical deep slug) | 6 | 10 | 8 | 11 | 14 | **49** | D | Voice EEAT for `/voices`, not org research article. |
| `movement_leader_research/*/sources.md` with “To be verified” | 4 | 3 | 5 | 5 | 4 | **21** | E | Verification backlog, not publishable research. |
| HTML / `docs/html/` prototype | 2 | 0 | 2 | 1 | 2 | **7** | E | Design artifact — see [curated cleanup plan](./curated-cleanup-plan-2026-05.md). |

---

## Triage workflow (recommended)

1. **Search existing series** — `docs/build/research/articles/` + `docs/articles/` + `eeat-site-claims.json`.
2. **Check settled list** — [00-existing-corpus-audit Part 3](../research/raw/00-existing-corpus-audit.md).
3. **Score with worksheet** — all five dimensions; note hard gates.
4. **Route:**
   - **Band A:** assign prompt number or new slug; pair `raw/` + `articles/` if not already split.
   - **Band B:** create ticket for verification + edit; block public stat reuse until B ≥ 17.
   - **Band C:** add rows to claim extraction spreadsheet (claim | source | confidence | target surface).
   - **Band D/E:** `.cursorignore` / archive; no pipeline time.

5. **After add:** run `pnpm articles:check` if promoting to `docs/articles/`; add registry rows before home/field-guide citation.

---

## Relationship to other rubrics

| Rubric | Purpose | Do not conflate with |
|--------|---------|----------------------|
| **This doc (0–100)** | Corpus → EEAT **research article** qualification | |
| Leader 100-point evaluation | **Platform candidate** screening (movement alignment, audience, revenue) | Different outcome: invite vs publish |
| Maturity model | Deep leader assessment (mDNA, embodied integration) | |
| Voice-fidelity five markers | **Alan-voice** article QA | Institutional research uses `movemental-prose`, not alan-voice |
| Authoritative-sources 12 tiers | **Where to look** for evidence | This rubric grades **documents**, not external sources |

---

## Maintenance

- Re-calibrate when a new research prompt (22+) is added or when [homepage EEAT consultation](./homepage-ia-and-eeat-consultation-2026-05-12.md) changes registry requirements.
- After major corpus sync from Desktop `movemental/docs`, spot-check **5 docs** across `book-development/`, `business-docs/`, `research/`, and `articles/` to ensure bands still feel right.
- When in doubt, prefer **intellectual honesty over advocacy** — the research series exists to stress-test claims, not to win SEO ([research ground rules](../research/prompts/README.md)).
