# Existing Research Inventory (Prompt 00)

**Generated:** 2026-04-12  
**Methodology:** This inventory prioritizes files the prompt flags as *read in full* or *read all*, plus targeted `grep` scans across `movemental/docs` for gap language (`to be verified`, `needs research`, `estimated`, etc.). The external **`docs`** repo (`/Users/joshuashepherd/Desktop/dev/repos/docs`) was sampled at high-leverage paths (`operations/strategy/movemental-ai/*`, `lab/papers/ai/*`, `knowledge/core-content/case-studies/*`). **`alan-hirsch`** and deeper **`docs/intelligence`** sweeps are *not* exhaustively enumerated here; subsequent passes should extend Part 1–2 from those trees using the same column schema.

---

## Part 1: Statistics and Data Points Catalog

| Claim | Source Cited | Confidence | Found In | Relevant Prompt |
| --- | --- | --- | --- | --- |
| 68% of internet users struggle to tell human vs AI-generated content | None in chapter (stated as “Studies show”) | **Unsourced** | `docs/book-development/manuscript-ordered/01-the-credibility-crisis.md` | 01 |
| 40–60% of online content involves AI assistance or generation | Framed as estimate (“somewhere between”) | **Attributed** (no primary citation in prose) | `docs/book-development/manuscript-ordered/01-the-credibility-crisis.md`; `docs/business-docs/core-docs/26-the-convergence.md` | 01 |
| Ahrefs: 74.2% of new webpages with AI-generated content; 71.7% mixed; 25.8% pure human; 2.5% pure AI | Ahrefs blog/study April 2025 (900k pages) | **Sourced** (secondary until PDF verified) | `docs/book-development/SECTION_1_RESEARCH_AND_REFERENCES.md` | 01 |
| Graphite / coverage: >50% of new articles AI-generated | Graphite / industry coverage | **Sourced** (verify URL/edition) | `docs/book-development/SECTION_1_RESEARCH_AND_REFERENCES.md` | 01 |
| Pew: ~50% more concerned than excited about AI; ~10% more excited | Pew Sept/Oct/Nov 2025 titles listed | **Sourced** (primary Pew reports when fetched) | `docs/book-development/SECTION_1_RESEARCH_AND_REFERENCES.md`; `docs/research/authoritative-sources-ai-nonprofits-faith-formation.md` | 01, 09 |
| Zenodo “Collapse of Trust in AI Assistants”: 61% materially different answers across runs; 48% shifted reasoning; 27% contradicted | Zenodo record cited by internal roadmap | **Sourced** (verify record) | `docs/book-development/SECTION_1_RESEARCH_AND_REFERENCES.md` | 01, 09 |
| Axis-style report: “$40B” generative-AI-enabled fraud by ~2027 | Named as “Technology Trust Crisis 2026” / Axis Intelligence | **Attributed** (confirm publisher + methodology) | `docs/book-development/SECTION_1_RESEARCH_AND_REFERENCES.md` | 01 |
| ACM: people cannot distinguish GPT-4 from human (~54% judged human, near chance) | ACM DOI given in roadmap | **Sourced** (verify DOI) | `docs/book-development/SECTION_1_RESEARCH_AND_REFERENCES.md` | 01 |
| ChatGPT 100M MAU in two months; vs TikTok 9 mo, Instagram 2.5 yr | UBS via Reuters/Ars (Feb 2023) | **Sourced** (journalism citing analyst note) | `docs/book-development/SECTION_1_RESEARCH_AND_REFERENCES.md` | 01 |
| ChatGPT ~900M+ weekly active (2025/2026) | Backlinko / Exploding Topics style aggregators | **Attributed** (verify against primary) | `docs/book-development/SECTION_1_RESEARCH_AND_REFERENCES.md` | 01 |
| McAfee Scamiverse 2026: ~114 hours/year questioning message authenticity; ~14 scam messages/day; 1 in 3 lost money | McAfee report | **Sourced** (verify report) | `docs/book-development/SECTION_1_RESEARCH_AND_REFERENCES.md` | 01, 09 |
| Deepfake file counts (~8M vs ~500K) and ~24.5% human detection for high-quality deepfake video | Aggregator / “Deepfake Statistics 2025” class | **Attributed** (triangulate primary) | `docs/book-development/SECTION_1_RESEARCH_AND_REFERENCES.md` | 01, 09 |
| Aalto 2025 / Tech Xplore: AI use correlated with *greater* overconfidence (Dunning–Kruger “reversal”) | University press + arxiv 2510.24772 cited | **Sourced** (once papers pulled) | `docs/book-development/SECTION_1_RESEARCH_AND_REFERENCES.md` | 01, 15 |
| Publishers take “typically 85–90%” revenue; authors “10–15%” | Historical/industry generalization | **Attributed** (no deal-level data) | `docs/business-docs/core-docs/26-the-convergence.md` | 03 |
| Rob Bell digital discovery: “30+ million” total views; “200+” podcast episodes; “600+” sermons | Internal estimates | **Unsourced / to be verified** | `docs/movement_leader_research/rob-bell/digital-presence-discovery.md` | 10, 12 |

*Many* `movement_leader_research/*/sources.md` files contain **“To be verified”** on URLs and publication facts — catalogued as a class under **Prompt 10** (visibility / consolidation claims should not lean on those rows without verification).

---

## Part 2: Intellectual Bibliography (Grouped by Theme)

### Credibility, trust, and platforms

| Name / framework | Role | Example paths |
| --- | --- | --- |
| **E-E-A-T** (Experience, Expertise, Authoritativeness, Trustworthiness) | Google-quality heuristic; central to online credibility framing | `…/docs/operations/strategy/movemental-ai/credibility-how-it-works.md` (movemental clone same thesis in business docs) |
| **Pew Research Center** | US attitudes, AI concern/excitement, teens & tech | `SECTION_1…`, `authoritative-sources…` |
| **NIST AI RMF** + Cybersecurity Framework | Governance baseline for org/board language | `authoritative-sources…` |
| **Ronald Heifetz** — *Leadership Without Easy Answers* (1994) | Technical vs adaptive work; reframes AI as adaptive challenge | `SECTION_1…` |
| **Center for Humane Technology** — “The AI Dilemma” (Mar 2023) | Canonical “early threat list” | `SECTION_1…` |
| **Entrust, McAfee, Deloitte** (fraud / deepfake / TMT predictions) | Threat and institutional trust narratives | `SECTION_1…` |

### Scenius, networks, and creative culture

| Name / framework | Role | Example paths |
| --- | --- | --- |
| **Brian Eno** — *scenius* coinage | Communal intelligence vs lone genius | `…/docs/operations/strategy/movemental-ai/SCENIUS-DEVELOPMENT-GUIDEBOOK.md` |
| **Kevin Kelly** — mutual appreciation, tool exchange, network effects of success, local tolerance | Geography of scenius | Same |
| Historical **scenes** (Inklings, Bloomsbury, Paris 20s, Camp 4, Building 20, Silicon Valley) | Analogies for “scene” credibility | Same; informs prompt 02 |
| **Bounded scale ~100** | Operational cap on relational vouching | `SCENIUS-DEVELOPMENT-GUIDEBOOK.md`; `SCENIUS-VISUALIZATION-STORY-AND-2028.md` |

### Publishing, economics, and media history

| Name / framework | Role | Example paths |
| --- | --- | --- |
| **Gutenberg → industrial publishing** | Narrative of accidental centralization | `26-the-convergence.md` |
| **Oxford/Baker/Zondervan**-class imprints | Shorthand for institutional credibility | `credibility-how-it-works.md`; `02-credibility-thesis.md` |
| **Creator economy / gatekeeper decline** | Optional support for “why leaders ignored SEO” | `SECTION_1…` (search angles) |

### Movement history and case studies (external docs repo)

| Case | File |
| --- | --- |
| Early church movement | `…/docs/knowledge/core-content/case-studies/case-study-early-church-movement.md` |
| Methodist movement / Wesley profile | `case-study-methodist-movement.md`, `leader-profile-john-wesley.md` |
| Moravian, Celtic, Chinese underground, Patrick | respective `case-study-*.md`, `leader-profile-st-patrick.md` |

### AI research synthesis (external docs lab)

| Artifact | File |
| --- | --- |
| AI literature stack | `…/docs/lab/papers/ai/literature-review.md`, `paper-profiles.md`, `citation-network.md`, `source-index.md` |

### Theology and Movemental vocabulary (referenced across movemental business + manuscript)

| Term / framework | Typical use |
| --- | --- |
| **mDNA, APEST, apostolic genius, communitas, liminality** | Core movemental vocabulary (knowledge base lives in external `docs/knowledge/core-content/concept-definitions/` — extend bibliography there) |
| **Credibility = Trust + Expertise + Character + Platform** | `docs/business-docs/core-docs/02-credibility-thesis.md` |

---

## Part 3: Settled Thinking (Do Not Re-Argue From Scratch)

1. **Credibility as relational, situational judgment** — Not a score; conferred through institutions and people offline, **findability + graph topology + author legibility** online. Fully developed with onboarding tables and checklists in `credibility-how-it-works.md` (external docs + duplicate roots in movemental-ai).

2. **Scenius-as-credibility-infrastructure** — Eno/Kelly lineage + Movemental twist (“visible network vouches”). Conditions vs engineering; **bounded ~100** as explicit product philosophy. `SCENIUS-DEVELOPMENT-GUIDEBOOK.md`.

3. **The “claim → node” model of SEO + linking** — Same article before/after optimization differs not in truth but in **discoverability and graph position**. `credibility-how-it-works.md` Part Four.

4. **Audience definition: “high responsibility, low infrastructure”** — Canonical narrative for who Movemental serves; explicitly warns not to treat “Research supplement” as hard stats without separate sourcing. `docs/business-docs/09_research_analysis/movemental-audience-comprehensive.md`.

5. **Section 1 research roadmap** — Already maps statements → footnote candidates and agentic search checklist (replace 40–60%, verify Zenodo/Pew/ACM, etc.). `docs/book-development/SECTION_1_RESEARCH_AND_REFERENCES.md`.

6. **Authoritative sources index + writer’s router** — Tiered evidence model (empirical vs ethical vs debate) and question→section routing to avoid category errors. `docs/research/authoritative-sources-ai-nonprofits-faith-formation.md`.

7. **Visualization narrative decision** — Real names only for **actually onboarded** leaders; others as **persona seats** (Option A). `SCENIUS-VISUALIZATION-STORY-AND-2028.md`.

---

## Part 4: Explicit Gaps (Corpus Names Its Own Unknowns)

| Gap (paraphrase or quote) | Where stated | Suggested prompt |
| --- | --- | --- |
| “Replace any ‘40–60%’ or ‘68%’ with latest Ahrefs/Graphite/Pew/ACM-style figures” | `SECTION_1…` Part 3 | 01 |
| “68% of internet users…” — no citation in manuscript | `01-the-credibility-crisis.md` | 01 |
| “Axis Intelligence (or equivalent)” — naming uncertainty for $40B-style report | `SECTION_1…` | 01, 09 |
| Leader dossiers: pervasive **“To be verified”** on URLs, volumes, dates | e.g. `movement_leader_research/scott-shepherd/sources.md`, `tim-keel/summary.md`, `rob-bell/digital-presence-discovery.md` | 10, 12 |
| “Research supplement… not as hard statistics unless separately sourced” | `movemental-audience-comprehensive.md` | 07, 10, 19 |
| Scenius viz: **“Decision we need”** if product ever mixed real names for non-onboarded leaders | `SCENIUS-VISUALIZATION-STORY-AND-2028.md` | 02, 07 (positioning) |
| Nonprofit AI benchmarks: “verify the latest edition before citing” | `authoritative-sources…` §4 | 21 |
| **Church planting / movement growth stats** — not catalogued in this pass; prompt 14 expects primary demography | Gap by prompt design | 14 |

---

## Part 5: Tensions and Contradictions

| Topic | Statement A | Statement B | Notes |
| --- | --- | --- | --- |
| AI content prevalence | Manuscript + convergence use **40–60%** band and “68%” | Section 1 roadmap prefers **Ahrefs 74.2%** + Graphite **>50%** articles | Not logical contradiction — **manuscript lags curated research**. Align copy with verified primaries. |
| “Studies show 68%” | Authoritative tone in Ch.1 | No footnote | **Credibility risk** for a book about credibility. |
| Publisher split | “85–90% / 10–15%” in convergence doc | Prompt 03 asks if “90/10” framing is revolutionary | Align **definitions** (gross vs net, ebook vs print, agency cuts). |
| Network language | Kelly: “network effects of success” inside scenius | Guidebook: “network effects” **≠** infinite platform scale; **bounded 100** | **Language tension**, not strategic contradiction — clarify in prompt 07 copy. |
| Who is “in the network” | Older viz data mixed real names for non-onboarded leaders | Guidebook + viz doc **Option A** (only Alan/Brad “in” today) | Product/content **must pick one story** to avoid trust defect. |

---

## Part 6: Research Prompt Readiness Matrix (01–21)

| # | Existing material | Already establishes | Still unknown / external | Priority |
| --- | --- | --- | --- | --- |
| **01** AI credibility crisis | `SECTION_1…`, Ch.1, lab AI papers index, `guide-ai-credibility-2026` (paths in ops strategy) | Narrative + candidate sources listed | Verify each stat; replace 68%; primary Zenodo/ACM pulls | **High** |
| **02** Scenius / network credibility | Eno/Kelly exegesis + application in guidebook + credibility doc | Internal theory of scenius-as-graph | Empirical: does peer-network vouching predict trust outcomes? | **Medium** |
| **03** Publishing economics | Convergence history; revenue split generalizations | Story of gatekeeping | Contract economics, genre splits, indie vs trad data | **High** |
| **04** Movement infrastructure | Seven case studies in external `docs` | Rich historical narrative | External historiography cross-check per case | **Medium** |
| **05** SEO / GEO / discoverability | `credibility-how-it-works`, articles `LINKING-STRATEGY-EEAT-GEO-PLAYBOOK` (movemental) | Mechanism model (E-E-A-T, nodes) | Platform efficacy studies, SERP/LLM citation research | **Medium** |
| **06** Formation vs information | `articles/03-transformation-over-information.md`, `04-the-eight-week-formation-scaffold.md` | Pedagogical stance | Learning-science evidence for online formation | **Medium** |
| **07** Bounded networks / platform economics | Guidebook bounded 100; viz story; audience doc | Positioning intent | Econometrics of small N graphs; “real” network effects | **High** |
| **08** AI theological anthropology | Convergence + credibility thesis strands | Provocative synthesis | Survey theology/AI literature explicitly | **Medium** |
| **09** Trust / verification / identity | Section 1 fraud stack; authoritative sources governance tiers | Framework for sources | Deepfake/biometric fraud primaries; digital ID policy | **High** |
| **10** Content fragmentation / consolidation | Audience comprehensive; leader research gaps | Problem framing | Market evidence for “single hub” solution | **Medium** |
| **11** Voice preservation | Manuscript ch.8; build articles in `docs/build/research/articles/` | Product claim direction | Technical + perceptual studies (voice cloning, detection) | **Medium** |
| **12** Competitive landscape | Leader dossiers (partial); selling-points doc (large) | Anecdotal comparisons | Structured competitor matrix with pricing | **High** |
| **13** Content repurposing / sustainability | Feature narratives scattered | Hypothesis | Time-use / creator economy studies | **Medium** |
| **14** Church planting movements data | Case studies; prompt scope | Illustrative history | Quantitative CPM research (prompt’s intent) | **High** |
| **15** Adaptive leadership / Heifetz | Section 1 footnote map | Canonical citation | Whether frame fits AI adoption empirics | **Low** |
| **16** Convergence thesis | `26-the-convergence.md` | Long-form narrative | Is “convergence” falsifiable? counter-narratives | **Medium** |
| **17** Assessment science / APEST | Concept defs in external docs (not deep-read here) | Internal theology | Psychometric validity | **High** |
| **18** Communitas / digital | Theological vocabulary in corpus | Analogy | Turner scholarship + digital community research | **Medium** |
| **19** Gender diversity | Articles/prompts exist in `docs/build/research/` | Placeholder until run | Demographic studies on movement leadership | **High** |
| **20** Pricing psychology | Business model scattered | Hypotheses | Anchoring, value equiv. in comparable SaaS | **High** |
| **21** Nonprofit system builds | `authoritative-sources…` + NTEN/NIST paths | Governance scaffolding | Sector-specific benchmarks | **Medium** |

---

**Next actions for agents on prompts 01–21**

1. Treat `SECTION_1_RESEARCH_AND_REFERENCES.md` as the **execution checklist** for statistics touching Section 1 / Chapter 1.  
2. Treat `authoritative-sources-ai-nonprofits-faith-formation.md` as the **methodological guardrail** for tier mixing.  
3. Before citing **movement_leader_research** volumes or URLs, run verification pass or downgrade to “internal estimate.”
