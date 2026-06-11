---
title: "Verified AI Research Archive: Studies, Surveys, and Field Experiments"
slug: ai-research-archive
shape: ai-note
author: Josh Shepherd
audience: public
status: eeat-candidate
eeat_score_band: 85-99
version: "2026-06"
document_id: ai-research-archive
corpus_id: movemental-room-public
---


# Verified AI Research Archive

Each study below opens with a **Finding** paragraph; the agent should read and quote from that block first. Metadata (n, date, URL) follows. Percentages are **not interchangeable** across studies.

**Maintenance:** Re-validate AI-sector statistics annually.

---

## Executive summary

Adoption is broad and fast (Stanford AI Index 2026), but institutional payoff is rare: roughly **95%** of enterprise gen-AI pilots fail to produce meaningful financial returns (MIT NANDA 2025), while only about **5–7%** of organizations in any sector studied report real capability or ROI gains (BCG, McKinsey, Virtuous). Where tasks fit model strengths, controlled experiments show large productivity lifts; where they do not, AI can make people **less** accurate (HBS/MIT/BCG jagged frontier, 2023). For mission orgs: **adoption is everywhere; transformation is not; competence is task-contingent.**

---

## Do not conflate these studies

- **"MIT 95%"** = MIT NANDA *GenAI Divide* (2025): **pilot ROI failure**, not the productivity study.
- **"MIT/BCG productivity"** = Dell'Anna *Jagged Frontier* (2023): **+12% / +25% / +40%** on consulting tasks.
- **"Only 5% succeed"** = different studies (BCG future-built 5%, McKinsey high performers 6%, Virtuous major gains 7%): **different populations**.
- **"68% can't tell AI from human"** = **unverified**; use Pew **53% not confident** instead.

---

## Tier A: Enterprise adoption and ROI

### MIT NANDA: *The GenAI Divide: State of AI in Business 2025* (July 2025)

**Finding:** Roughly **95% of corporate generative AI pilots fail to deliver meaningful financial returns**, while a small minority capture disproportionate value (what the report calls the "GenAI Divide"). The study is based on executive interviews, employee/leader surveys, and review of public deployments. It does **not** prove AI is useless; it shows that once models are "good enough," **integration, workflow fit, governance, and line-leader ownership** determine outcomes more than the tool itself. This is **not** the same study as the 2023 BCG productivity experiment.

**Source:** [Report PDF](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf) · Aditya Challapally et al., MIT NANDA Initiative · ~150 exec interviews + surveys (confirm n in PDF)

**Tags:** `genai-divide` · `mit-95-percent`

---

### BCG: *The Widening AI Value Gap: Build for the Future 2025* (September 2025)

**Finding:** In a global study of **1,250 firms**, **60% generate no material value** from their AI investments, while only **5% qualify as "future-built"** (firms with an AI-first operating model and explicit governance). The winners are distinguished by operating-model change, not by buying better models.

**Source:** [BCG publication](https://www.bcg.com/publications/2025/widening-ai-value-gap-build-for-future-2025) · n=1,250 firms globally

**Tags:** `bcg-value-gap-2025` · `five-percent-future-built`

---

### McKinsey: *The State of AI in 2025* (November 2025)

**Finding:** **88% of organizations** now use AI in at least one business function, but only **6% qualify as "AI high performers"** who attribute significant EBIT impact to AI. Among high performers, **55% have fundamentally redesigned workflows**; workflow redesign, not tool selection, is the strongest correlate of value capture.

**Source:** [McKinsey State of AI](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) · Online survey June–July 2025 · n=1,993 · 105 nations

**Tags:** `mckinsey-state-of-ai-2025`

---

### McKinsey: *The Economic Potential of Generative AI* (2023, updated)

**Finding:** Generative AI could add **trillions of dollars** in economic value across industries by automating a large share of **work activities** (time spent on tasks, not a simplistic "X% of jobs eliminated" claim). The report sizes upside for boards while underscoring that **realizing potential requires rewiring how work is done**, not merely deploying chatbots.

**Source:** [McKinsey: Economic potential of generative AI](https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-economic-potential-of-generative-AI-the-next-productivity-frontier)

**Tags:** `mckinsey-economic-potential`

---

### McKinsey: *Superagency in the Workplace* (2025)

**Finding:** Organizations report **high planned AI investment** but **very few mature, workflow-integrated deployments** (~**1%** "mature" in some survey framings; confirm before narrow quoting). Most respondents see **limited gen-AI revenue impact to date** but remain optimistic about the next few years, a pattern of broad experimentation without institutional payoff yet.

**Source:** [McKinsey: Superagency](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work)

**Tags:** `mckinsey-superagency-2025`

---

## Tier A: Field experiments (productivity and harm)

### Dell'Anna et al.: *Navigating the Jagged Technological Frontier* (HBS / MIT / BCG, 2023)

**Finding:** In a randomized field experiment with BCG consultants, AI (GPT-4) produced **large gains on tasks inside current model capability**: **+12.2%** more tasks completed, **25.1%** faster, **>40%** higher quality, with the biggest lifts for below-median performers (~**43%** vs. ~**17%** for top performers). On **one task deliberately outside** the frontier, consultants **with** AI were **19 percentage points less likely to be correct** than those without. The lesson: the "frontier" is **jagged**. Similar-looking tasks can fall on opposite sides of what models handle well. Successful use requires **task literacy and human verification**, not access alone.

**Source:** [SSRN / HBS Working Paper 24-013](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321) · Sept 2023 · 18 inside-frontier tasks + 1 outside-frontier task

**Tags:** `jagged-frontier` · `bcg-productivity-study`

---

### BCG: GenAI skill-stretch experiment (2024)

**Finding:** In a follow-on experiment with **480 consultants**, generative AI helped workers stretch into tasks **outside their prior expertise** (e.g., data-science-style work) with large aptitude gains in some dimensions, but also produced **failure modes** when the tool misled on statistical reliability. Junior staff using AI without senior oversight can develop **phantom expertise**: confident output that looks competent but is wrong.

**Source:** [BCG press release](https://www.bcg.com/press/5september2024-generative-ai-knowledge-workers-consultants) · n=480 consultants

**Tags:** `jagged-frontier` · `phantom-expertise`

---

## Tier A: Macro benchmarks

### Stanford HAI: *AI Index 2026* (April 2026)

**Finding:** The AI Index documents **very high organizational AI uptake** (public summaries cite ~**88%** using AI in at least one function), **rapid consumer adoption** of generative tools (~**53%** population adoption within three years in chapter summaries), and **uneven depth**: agentic AI deployment remains early across many business functions. Gen-AI spread faster than PCs or the internet in adoption curves, but **transformation lags adoption**, explaining why boards feel urgency while staff see little institutional change.

**Source:** [2026 AI Index](https://hai.stanford.edu/ai-index/2026-ai-index-report/) · [Economy chapter](https://hai.stanford.edu/ai-index/2026-ai-index-report/economy) · Confirm exact figures in chapter PDF before public cite

**Tags:** `stanford-ai-index-2026`

---

## Tier B: Reliability and hallucinations

### OpenAI: *Why Language Models Hallucinate* (September 2025)

**Finding:** Hallucinations are **partly incentivized by how models are trained and evaluated**: standard accuracy benchmarks reward **guessing** over admitting uncertainty, so models learn test-taking behavior that produces confident wrong answers. Fixing hallucinations may require **changing evaluation incentives**, not only adding detection layers on top.

**Source:** [OpenAI research post](https://openai.com/research/why-language-models-hallucinate) · [PDF](https://cdn.openai.com/pdf/d04913be-3f6f-4d2b-b283-ff432ef4aaa5/why-language-models-hallucinate.pdf)

**Tags:** `hallucination-incentives`

---

## Tier B: Credibility, detection, and content flood

### Pew Research Center: AI detection confidence (U.S., June 2025)

**Finding:** Among U.S. adults, **76%** say it is extremely or very important to tell whether pictures, videos, and text are AI- or human-made, but **53%** are not too or not at all confident they can actually tell, a sharp **importance vs. self-efficacy gap**. This supports a credibility crisis narrative without relying on the unverified "68%" statistic.

**Source:** [Pew: How Americans View AI](https://www.pewresearch.org/science/2025/09/17/how-americans-view-ai-and-its-impact-on-people-and-society/) · n=5,023 U.S. adults · June 9–15, 2025

**Tags:** `pew-ai-detection-2025`

---

### All About Cookies: Retrospective surprise (U.S., February 2024)

**Finding:** **77% of U.S. adults** report encountering something online they believed was from a real person and later learned was AI-generated. This measures **retrospective surprise and pervasiveness**, not controlled discrimination accuracy in a lab task.

**Source:** [All About Cookies survey](https://allaboutcookies.org/ai-content-online-survey) · n=1,000 · Prolific · Feb 2024

**Tags:** `ai-content-surprise`

---

### Ahrefs: AI content in new web pages (April 2025)

**Finding:** Of **900,000** newly detected English web pages (one per domain), **74.2%** contained some AI-flagged content by Ahrefs' in-house detector, but only **2.5%** were "pure AI" and **25.8%** "pure human." AI is embedded widely in new publishing, yet **fully synthetic pages remain a minority**; detector accuracy limits apply.

**Source:** [Ahrefs study](https://ahrefs.com/blog/what-percentage-of-new-content-is-ai-generated) · Apr 2025 · detector-dependent, not peer-reviewed

**Tags:** `ahrefs-ai-content-2025`

---

### Cooke et al.: *As Good As A Coin Toss* (CACM 2025)

**Finding:** With realistic synthetic images, video, audio, and audiovisual stimuli, **~1,300 participants** detected AI-generated content at **near-chance accuracy (~50%)** on average; prior self-reported knowledge did not significantly help. The authors conclude it is **no longer feasible to rely on unaided human perception** as a defense against weaponized synthetic media.

**Source:** [DOI 10.1145/3729417](https://doi.org/10.1145/3729417) · [arXiv:2403.16760](https://arxiv.org/abs/2403.16760)

**Tags:** `coin-toss-detection-2025`

---

### Scientific Reports: Individual differences in AI text detection (2024)

**Finding:** People detect AI-written text **above chance on average**, but performance varies widely: **fluid intelligence** predicts better detection, while heavier **social/smartphone use** correlates with **mislabeling AI as human**. Text discrimination is not identical to multimodal "coin toss" results; **who is judging and how the task is designed** matter.

**Source:** [DOI 10.1038/s41598-024-76218-y](https://doi.org/10.1038/s41598-024-76218-y)

**Tags:** `ai-text-detection`

---

### ACL 2025: Expert ChatGPT users as detectors

**Finding:** **Frequent ChatGPT-using expert annotators** can be strong AI-text detectors under certain lab protocols, so **expertise exists**, but it does not mean the general public can reliably spot AI content in the wild.

**Source:** [ACL Anthology 2025.acl-long.267](https://aclanthology.org/2025.acl-long.267)

**Tags:** `expert-detection`

---

### NewsGuard / EU DisinfoLab: Industrial AI misuse

**Finding:** Investigative organizations document **thousands of AI-dominated "news" websites** growing rapidly (NewsGuard) and **coordinated inauthentic behavior** using generative techniques in large numbers (EU DisinfoLab, e.g., Doppelganger). This supports "weaponized scale" claims when tied to named org metrics; do not cite "millions of bots" without a primary count.

**Source:** [NewsGuard](https://www.newsguardtech.com/insights/watch-out-ai-news-sites-are-on-the-rise) · [EU DisinfoLab: Doppelganger](https://www.disinfo.eu/doppelganger-operation)

**Tags:** `ai-content-farms` · `disinformation`

---

### Edelman Trust Barometer: AI trust (2025)

**Finding:** Edelman's 2025 trust materials show **uneven comfort with corporate AI use** and **geographic divergence** in AI trust, useful for nuance so Movemental does not imply one global mood on AI.

**Source:** [Edelman Trust Barometer 2025](https://www.edelman.com/trust/2025/trust-barometer/) · [AI flash poll](https://www.edelman.com/trust/2025/trust-barometer/flash-poll-trust-artifical-intelligence)

**Tags:** `institutional-trust`

---

## Tier C: Churches and faith sector

### Exponential AI NEXT: *2026 State of AI in the Church Survey*

**Finding:** **91% of church leaders support AI in ministry** and **61% use it weekly or daily** (25% daily), up from 43% weekly/daily in 2024; **64%** use AI for sermon preparation. Yet only **9%** have a formal AI policy, **7%** an AI disclosure statement, and **73%** have nothing written. **75%** name theological misalignment as their top ethical concern; **60%** are very concerned about voice-cloning fraud; **25%** say AI scams already affected their community.

**Source:** Exponential AI NEXT / AIforChurchLeaders.com · cited in AI Reality Paper May 2026 · confirm URL/methodology at source

**Tags:** `church-ai-2026`

---

### Lifeway Research: Pastors and churchgoers (fielded Sept 2025, released Apr 2026)

**Finding:** Among **1,003 Protestant senior pastors**, **42%** use AI for ministry (10% regular, 32% experimenting) and **62%** are concerned about non-disclosure. Among **1,200 churchgoers**, **43%** disagree with their pastor using AI for sermon preparation (24% strongly), a **leader/congregation gap** on acceptability.

**Source:** [research.lifeway.com](https://research.lifeway.com) · phone survey pastors ±3.3% MOE

**Tags:** `lifeway-ai-2026`

---

### Barna & Pushpay: *State of Church Tech 2026* (March 2026)

**Finding:** **60% of U.S. church leaders** personally use AI at least monthly, but only **33%** say their church uses AI in ministry or operations. **64%** believe an AI use policy is important; **5%** of churches actually have one, a classic **adoption-ahead-of-governance** pattern.

**Source:** [Barna: church leaders AI](https://www.barna.com/research/church-leaders-ai-usage-concerns) · n=1,306 · fielded Nov–Dec 2025

**Tags:** `barna-church-tech-2026`

---

### Barna (via NPR, July 2025): Clergy and AI sermons

**Finding:** Only **12%** of senior Protestant clergy are **comfortable using AI to write sermons**, while **43%** see merit for **preparation and research**, a clear split between ghostwriting Sunday proclamation vs. assistive study.

**Source:** [NPR: clergy and AI sermons](https://www.npr.org/2025/07/17/nx-s1-5468637/clergy-grapple-with-the-ethics-of-using-ai-to-write-sermons)

**Tags:** `sermon-ai-ethics`

---

## Tier C: Nonprofits

### Virtuous & Fundraising.AI: *2026 Nonprofit AI Adoption Report* (February 2026)

**Finding:** **92% of nonprofits use AI** in some form (the question of whether to adopt is largely settled), but only **7% report major organizational capability improvements**. **81%** use AI individually and ad hoc rather than through shared workflows; **47%** have no AI governance policy. **79%** report small-to-moderate efficiency gains (faster drafts, quicker research) without deeper transformation; **individual use does not compound into institutional capability** without governance and shared workflows.

**Source:** [Virtuous report](https://virtuous.org/resource/the-2026-nonprofit-ai-adoption-report-download) · n=346 · fielded late 2025

**Tags:** `nonprofit-ai-2026`

---

### TechSoup × Tapp: *State of AI in Nonprofits 2025*

**Finding:** In a survey of **1,321+ nonprofits**, many are still exploring AI; roughly **7%** report successful operational/mission integration in benchmark language, while **~85% are exploring** but only **~24% have a formal AI strategy**, a large **strategy gap** between curiosity and institutional commitment. Larger orgs adopt faster; small shops depend on one or two overloaded decision-makers.

**Source:** [Tapp Network summary](https://blog.tappnetwork.com/tapp-and-techsoup-release-2025-ai-benchmark-report) · verify exact figures in PDF

**Tags:** `techsoup-2025`

---

### NTEN: *2025 Data Empowerment Report*

**Finding:** Among **220+ nonprofits**, AI-specific data policies are among the **least implemented** governance items. Nearly **half have no dedicated AI data policy**, even as "adopting AI tools" jumped into **top operational priorities**. Orgs are adopting tools before building the data governance those tools require.

**Source:** [NTEN PDF](https://word.nten.org/wp-content/uploads/2025/07/2025-Data-Empowerment-Report.pdf)

**Tags:** `nten-data-empowerment-2025`

---

### Forvis Mazars: *AI Governance for Nonprofit Boards* (February 2026)

**Finding:** AI governance is now a **fiduciary issue** for nonprofit boards: duties of Care, Loyalty, and Obedience extend to **technological oversight**, so boards that ignore AI governance may fail their obligations before harm occurs. Supporting data: **47%** of nonprofits have no AI governance policy; TechSoup found **76%** with no formal AI strategy; only **5%** with a clear, satisfactory policy. Donor and beneficiary data is routinely pasted into consumer AI tools without contractual protection.

**Source:** [Forvis Mazars brief](https://forvismazars.us/forsights/2026/02/ai-governance-for-nonprofit-boards)

**Tags:** `nonprofit-fiduciary-ai`

---

### Grant Thornton: *2026 AI Impact Survey*

**Finding:** Survey of **950 organizations** cited in Movemental's AI Reality Paper (May 2026) as part of the cross-sector evidence base. **Confirm headline percentages at the primary source** before quoting specific figures.

**Source:** AI Reality Paper source register · Grant Thornton 2026

**Tags:** `grant-thornton-2026`

---

## Tier C: Seminaries and institutions

### Theology and Science: AI retrospective (2026)

**Finding:** Generative AI use is **functionally universal among students under 30**, while institutional policy lags: some seminaries have thoughtful policies (Columbia Theological, Saint Meinrad, Puritan Reformed, Austin Presbyterian) but **no Association of Theological Schools-wide standard**, and faculty within one school often operate under different rules. Hallucinations remain a persistent technical limit; deeper questions about **authority, pastoral care, and formation** are largely unaddressed in policy.

**Source:** *Theology and Science* 2026 retrospective · cited in AI Reality Paper May 2026

**Tags:** `seminary-ai-policy`

---

### ATLA / theological librarianship (2024)

**Finding:** Qualitative evidence shows seminaries and theological educators **actively debating** AI pedagogy, academic integrity, and institutional policy; the sector is catching up, but quantitative prevalence data (e.g., "% of sermons AI-assisted") does not yet exist in large numbers.

**Source:** [Atla Proceedings: AI in the Seminary Classroom](https://serials.atla.com/proceedings/article/view/3561) · [Theological Librarianship AI volume](https://serials.atla.com/theolib/article/view/3512)

**Tags:** `seminary-ai-debate`

---

## Tier C: Documented harms and fraud

### FBI IC3: *2025 Annual Report* (AI-enabled fraud)

**Finding:** The FBI's 2025 Internet Crime Complaint Center report is the **first to break out AI-enabled fraud** as its own category: **22,364 complaints** with an AI-related descriptor and **$893 million** in adjusted losses (**$352 million** among Americans 60+). Voice cloning is embedded in business-email-compromise schemes; AI-employment fraud (~$13M) and AI-romance scams (~$19M) are documented categories, not theoretical risks.

**Source:** [ic3.gov](https://www.ic3.gov) · PSAs I-120324, PSA250515, PSA251219

**Tags:** `fbi-ic3-ai-fraud-2025` · `voice-cloning-fraud`

---

### AI Incident Database: Incident 1355 (pastor impersonation)

**Finding:** Documented **multi-state pattern** of scammers cloning pastors' voices from sermon footage to solicit emergency donations, with cases in Alabama, Florida, Missouri, Nebraska, New York, and a Philippines megachurch. Logged as AI Incident Database incident **1355**; covered by WIRED, VICE, Baptist News Global.

**Source:** [incidentdatabase.ai/cite/1355](https://incidentdatabase.ai/cite/1355)

**Tags:** `pastor-voice-cloning`

---

### Vatican / Pope Leo XIV: Deepfake warnings (January 2026)

**Finding:** Documented deepfake fraud targeting religious leaders, including Pope Leo XIV; the Pope's January message for World Day of Social Communications addressed **deepfake and digital fraud risks** for faith communities.

**Source:** Dicastery for Communication · summarized in *Our Sunday Visitor News*, Jan 2026

**Tags:** `religious-leader-deepfakes`

---

## Tier C: Human psychology and AI

### Fernandes et al.: *AI makes you smarter but none the wiser* (2026)

**Finding:** On demanding reasoning tasks with ChatGPT-class tools, participants **performed better but calibrated worse**: they **overestimated** how well they did. The classic Dunning–Kruger pattern was **disrupted**; in the publicized interpretation, **higher AI literacy correlated with greater overconfidence**. AI can make people feel competent while leaving them **less accurate about their own accuracy**, a risk for sophisticated users, not only novices.

**Source:** [DOI 10.1016/j.chb.2025.108779](https://doi.org/10.1016/j.chb.2025.108779) · *Computers in Human Behavior* vol. 175 (2026)

**Tags:** `fernandes-metacognition-2026` · do not say "DK exactly as in textbooks"

---

## Reference frameworks (not empirical studies)

**NIST AI RMF**: risk management vocabulary for boards. **ISO/IEC 42001**: AI management system requirements (risk, data, lifecycle, competence). **EU AI Act (2024)**: external policy model; does not bind most U.S. domestic nonprofits.

---

## Debunked claims: do not cite

| Claim | Use instead |
|-------|-------------|
| "68% can't distinguish AI from human" | Pew: **53% not confident**, **76% say it matters** |
| "40–60% of blogs are AI-generated" | Ahrefs: **74.2%** of new pages with *some* AI-detected text + detector caveat |
| "Millions of synthetic accounts" | NewsGuard / EU DisinfoLab with named metrics |
| "Detection impossible in 2–3 years" | Label as **Movemental forecast**, not literature |
| "Credibility collapse" | **Movemental framing**: define when used |

---

## Cross-sector pattern (5–7% winners)

| Sector | Broad adoption | Real capability / ROI |
|--------|----------------|------------------------|
| Enterprise (MIT) | Pilots widespread | ~**95%** pilots fail ROI; ~**5%** win |
| Enterprise (BCG) | AI spend widespread | **60%** no material value; **5%** future-built |
| Enterprise (McKinsey) | **88%** use AI | **6%** high performers |
| Nonprofits (Virtuous) | **92%** use AI | **7%** major capability gains |
| Churches (Barna) | **60%** leaders use AI monthly | **5%** have AI policy |

The gap is **individual use vs. institutional capability**, not AI yes/no.

---

## Tags (retrieval)

`genai-divide` · `jagged-frontier` · `stanford-ai-index-2026` · `mckinsey-state-of-ai-2025` · `bcg-value-gap-2025` · `nonprofit-ai-2026` · `church-ai-2026` · `techsoup-2025` · `nten-data-empowerment-2025` · `hallucination-incentives` · `pew-ai-detection-2025` · `ahrefs-ai-content-2025` · `coin-toss-detection-2025` · `fernandes-metacognition-2026` · `fbi-ic3-ai-fraud-2025` · `ai-stewardship-sequence`

---

*Re-validate AI-sector statistics annually. Not legal, financial, or investment advice.*