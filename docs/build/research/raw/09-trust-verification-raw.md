# Raw research: 09 — Trust, verification, and digital identity in an AI age

**Prompt:** `docs/build/research/prompts/09-trust-verification-digital-identity.md`  
**Research date:** 2026-04-13  
**Methods:** Primary policy/docs (Google Search Central, Stanford HAI briefs), major surveys (Edelman press summaries, Reuters Institute DNR 2025 overview, Pew where cross-referenced), canonical academic citations (journals / DOI where known), reputation-systems classics, recent empirical threads on AI labeling. Not a systematic meta-analysis.

---

## A. Trust theory — psychology, org behavior, IS (selected bibliography)

### Integrative models of interpersonal / organizational trust

| Work | Core idea | Citation |
|------|-----------|----------|
| **Mayer, Davis, & Schoorman (1995)** | Integrative model: trust propensity + perceived **ability, benevolence, integrity** of trustee; risk-taking in relationship as outcome. Hugely influential across IS, marketing, health. | *Academy of Management Review*, 20(3), 709–734. (DOI commonly cited: `10.5465/amr.1995.9508080335` — verify in library resolver.) |
| **Gefen, Karahanna, & Straub (2003)** | Trust in e-vendors integrates with TAM; trust as important as usefulness/ease for experienced online shoppers. | *MIS Quarterly*, 27(1), 51–90. DOI: `10.2307/30036519`. [AISeL stable link](https://aisel.aisnet.org/misq/vol27/iss1/4/). |

### Online credibility evaluation (health / general web)

| Work | Core idea | Citation / access |
|------|-----------|-------------------|
| **Sillence, Briggs, Fishwick, & Harris (2004)** | Qualitative/longitudinal work on **trust and mistrust** of online health sites; staged rejection (e.g., design) vs. selection on perceived credibility/personalization. | “Trust and mistrust of online health sites.” *CHI 2004*. Institutional copies: [Northumbria research portal](https://researchportal.northumbria.ac.uk/en/publications/trust-and-mistrust-of-online-health-sites). |

### Social capital / trust as embedded in networks (sociology / political theory)

| Work | Core idea | Notes for Movemental |
|------|-----------|----------------------|
| **Putnam, R. D. (2000)** | *Bowling Alone* — civic engagement / associational life as social capital; trust correlated with dense civic networks (macro argument; contested causality). | Supports **“trust lives in communities of practice”** at a narrative level; not a digital-platform proof. |
| **Hardin, R. (2002/2006)** | **Encapsulated interest** account: trust as grounded in interests + incentives (“trust is … expectation of outcomes …”). | Useful counterweight to purely moral “character” framing — **incentives and stakes** matter. |
| **Gambetta, D. (2009)** | *Codes of the Underworld* — signaling, **costly signals**, and trust among criminals; cheating on signals is central theme. | Analogy for **gaming reputational graphs** (cheap endorsements vs. costly co-production). |

---

## B. Polls and industry-scale surveys (institutions, media, online)

### Edelman Trust Barometer (2025 cycle — verify year label on live PDF)

- **Theme (press summary):** “grievance,” perceived elite capture, **institutional distrust** not evenly distributed by income; **media** distrust bundled with fears of deliberate misleading.  
- Example press release framing: [PR Newswire — 2025 Edelman Trust Barometer](https://www.prnewswire.com/news-releases/2025-edelman-trust-barometer-reveals-high-level-of-grievance-towards-government-business-and-the-rich-302354832.html).  
- Hub: [2025 Edelman Trust Barometer](https://www.edelman.com/trust/2025/trust-barometer/).  
- **PDF:** `https://www.edelman.com/sites/g/files/aatuss191/files/2025-01/2025%20Edelman%20Trust%20Barometer_Final.pdf` (URL-encoded spaces).  

**Trend language (careful):** Edelman’s **global index** is often reported as **flat year-to-year** while **composition and grievance** shift; avoid “always declining” without the specific metric and year.

### Reuters Institute — *Digital News Report* 2025

- **Scope:** 48 markets; large combined sample; fieldwork varies by country (see methodology chapter in full PDF).  
- **Trust in news (aggregate):** Overview states **overall trust in the news (40%) has remained stable for the third year in a row**, still below pandemic-era peak.  
- **Epistemic anxiety:** **58%** globally concerned about ability to tell true from false online (similar to prior year); **73%** in US and Africa at high concern.  
- **AI + news expectations:** Cross-country net expectations that AI will make news **cheaper (+29)**, **more up-to-date (+16)**, but **less transparent (−8)**, **less accurate (−8)**, **less trustworthy (−18)**.  
- **Checking behavior:** Trusted **news brands** and **official/government** sources remain frequent places people say they go to verify truth—**across age groups**, with youth also using social and chatbots more.  
- Source: [Overview and key findings — DNR 2025](https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2025/overview-and-key-findings-2025-digital-news-report) (17 June 2025).

### Pew Research Center (cross-reference)

- For **AI vs. human detection confidence** and **importance of knowing provenance**, see Pew’s September 2025 science report suite (used in prompt `01`): **76%** importance / **53%** low confidence (U.S. adults, ATP).  
- Entry: [How Americans View AI and Its Impact on People and Society](https://www.pewresearch.org/science/2025/09/17/how-americans-view-ai-and-its-impact-on-people-and-society/).

---

## C. AI awareness, labels, and trust behavior (selected empirical threads)

| Finding (high level) | Implication |
|----------------------|-------------|
| **Stanford HAI — labeling AI-generated content** | Disclosure can shift **attribution** / identification without necessarily reducing **persuasion** of policy-like messages at scale (policy brief summarizes controlled survey evidence). | [Stanford HAI — “Labeling AI-Generated Content…”](https://hai.stanford.edu/policy/labeling-ai-generated-content-may-not-change-its-persuasiveness); PDF brief linked from that page. |
| **JMIR Formative Health (2024 path)** | Industry summaries report mixed effects: labels may help **discriminate** AI vs. human while not reliably reducing **sharing** intent. | Treat as **nuanced**: “labels ≠ trust restoration.” |

**Synthesis for Movemental:** Audiences can **want** transparency while still **behaving** as if fluent text is compelling; network proofs address a different failure mode than disclosure alone.

---

## D. Reputation systems — what worked; what failed

### eBay (empirical economics / IS)

- **Resnick & Zeckhauser (2002)** — “Trust among strangers…” empirical analysis of feedback incentives and reciprocity. Emerald chapter DOI often given as `10.1016/S0278-0984(02)11030-3`.  
- **Resnick, Zeckhauser, Swanson, & Lockwood (2006)** — *Experimental Economics* field experiment: established seller identity earned **~8.1% price premium** vs. new identities selling matched goods. [Cambridge Core](https://www.cambridge.org/core/journals/experimental-economics/article/value-of-reputation-on-ebay-a-controlled-experiment/610EA11BA19583907061AFB677BE4338).

**Lessons:** sparse negative feedback can be weak; **reputation is economic**; identities are **sticky assets**.

### Stack Overflow / karma systems

- **Strength:** granular reputation tied to **observable contributions**; community moderation.  
- **Failure modes (well documented in practice):** rep farming, voting rings, moderator–community conflict, **exclusion** of newcomers despite “meritocratic” rhetoric. (For raw research, cite HCI/CSCW literature separately if needed—not deep-mined in this pass.)

### Academic metrics (citations, co-authorship)

- **Co-authorship / citations** are strong **professional** signals inside science and adjacent labor markets; **weak direct evidence** they function as **public audience** trust signals outside expert subcultures (Movemental should treat “10 co-authors” as **social proof for insiders** unless UX translates it).  
- **Gaming:** citation rings, paper mills, bought citations — see e.g. *Scientific Reports* (2025) on citation manipulation services DOI `10.1038/s41598-025-88709-7`; Retraction Watch reporting on fake article networks (2026 case coverage).

---

## E. Google EEAT — what official documentation actually says

### Primary sources (Google Search Central)

- **Helpful, reliable, people-first content** — self-assessment questions; introduces **E-E-A-T** and states **Trust is most important**; others contribute; **not all must be present** for all topics.  
  - URL: [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)  
- **Who / How / Why** framing for transparency of **authorship**, **process** (including AI use), and **purpose**. Same page.  
- **Rater guidelines PDF** (for evaluator criteria, not a public ranking API):  
  - `https://services.google.com/fh/files/misc/hsw-sqrg.pdf` (linked from Search Central)  
  - Alternate host often cited: `https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf`

### Key clarifications (avoid SEO folklore)

- **E-E-A-T is not a single ranking factor** — Google’s own language.  
- **Raters do not directly move rankings** — feedback for alignment/training.  
- **Networks of experts:** guidelines emphasize **who** created content, **bylines**, **About** pages, and whether the site/person is **widely recognized** authority — this is **compatible** with Movemental’s “graph of credibility” **if** implemented as legible, checkable relationships—not badge spam.

---

## F. How AI systems pick “credible” sources (RAG / retrieval)

- Production and research systems increasingly separate **relevance** from **reliability** (e.g., reliability-aware RAG — EMNLP 2025 thread: ACL Anthology `2025.emnlp-main.1738` / arXiv `2410.22954`).  
- Heuristics in deployed assistants often still track **domain reputation**, **freshness**, **corroboration**, and **citation frequency** in training data—**opaque** and **vendor-specific**.  
- **Design implication:** Movemental cannot assume one universal “AI trust signal”; it should optimize for **human-visible proofs** *and* **machine-checkable structure** (consistent entities, canonical bios, verifiable outbound links).

---

## G. Movemental-specific prompts (quick answers)

| # | Question | Short answer | Confidence |
|---|----------|--------------|------------|
| 10 | Is **Trust + Expertise + Character + Platform** grounded in Mayer etc.? | **Partially.** Overlaps **ability / integrity** (expertise + character-ish) and **institutional context** (platform). “Character” is not Mayer’s standard triad label; “Platform” adds product layer Mayer didn’t specify. | **Partially supported synthesis / branding** |
| 11 | Failure modes of network trust? | **Citation rings**, **logrolling**, **cronyism**, **exclusion of outsiders**, **cheap mutual praise** — all real; academic and journalism literatures. | **Verified (conceptual + cases)** |
| 12 | Making network verification visible without credentialism? | HCI suggests **provenance**, **interaction history**, **third-party checks**, and **plain-language “why this person”** outperform dense CV dumps. Needs product research beyond this doc. | **Design hypothesis** |

---

## H. Source index (URLs)

| Topic | URL |
|-------|-----|
| Google — helpful content + E-E-A-T | https://developers.google.com/search/docs/fundamentals/creating-helpful-content |
| Google — SQEG PDF (linked from Search Central) | https://services.google.com/fh/files/misc/hsw-sqrg.pdf |
| Stanford HAI — AI labels & persuasion | https://hai.stanford.edu/policy/labeling-ai-generated-content-may-not-change-its-persuasiveness |
| Reuters — DNR 2025 overview | https://reutersinstitute.politics.ox.ac.uk/digital-news-report/2025/overview-and-key-findings-2025-digital-news-report |
| Edelman — Trust Barometer hub | https://www.edelman.com/trust/2025/trust-barometer/ |
| Pew — AI impact on society | https://www.pewresearch.org/science/2025/09/17/how-americans-view-ai-and-its-impact-on-people-and-society/ |
| MISQ — Gefen et al. 2003 | https://aisel.aisnet.org/misq/vol27/iss1/4/ |
| eBay reputation experiment (2006) | https://www.cambridge.org/core/journals/experimental-economics/article/value-of-reputation-on-ebay-a-controlled-experiment/610EA11BA19583907061AFB677BE4338 |
| Citation manipulation (2025) | https://doi.org/10.1038/s41598-025-88709-7 |

---

## I. Session gaps (for a second pass)

- Deep retrieval of **Mastodon / Bluesky** academic trust studies (prompt-relevant for federated graphs).  
- **W3C Verifiable Credentials / DID** standards landscape for “digital identity” section (only named at high level here).  
- **Edelman 2026** final PDF and any methodology change vs. 2025 — fetch when publishing externally.
