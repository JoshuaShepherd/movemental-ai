# Research Prompt 17: Assessment Science and Personalization Pipelines — From APEST to Adaptive Content

## Context

Movemental claims that assessments (APEST, mDNA) can drive personalized content experiences — route people who complete assessments into learning journeys tailored to their profile. This connects a psychometric claim (the assessment measures something real) to a pedagogical claim (personalized pathways improve formation) to a platform claim (this pipeline is a competitive advantage).

Key claims:

- "Assessment engine for APEST, mDNA, maturity, vocational calling" (`articles-029`)
- "Assessment-to-content pipeline: route completers (150,000+ for APEST) into personalized learning journeys" (`business-031`)
- "Assessment-based onboarding: understand leader maturity, constraints, and priorities before designing engagement" (`business-083`)
- "AI Lab with context awareness from personality to formation goals" (`articles-030`)
- "Context and Personalization as Required for Formation Work" (`book-016`)
- "Formation goals and spiritual discernment tracking — unique to Movemental" (`articles-033`)
- "Recommended learning journey: spiral through five theological portals" (`research-020`)

**Argument IDs to trace in the index:** tie findings back to `articles-029`, `business-031`, `business-083`, `articles-030`, `book-016`, `articles-033`, `research-020`, and any adjacent nodes that describe mDNA assessment, onboarding flows, or AI Lab context payloads.

## Relationship to other prompts

- **Prompt 14 (church planting movements / data)** treats **150K+ APEST completions as a credibility and comparators statistic** (sourcing, “widespread” vs. StrengthsFinder-scale tools). **Prompt 17** owns **psychometric defensibility, pedagogical personalization evidence, formation-measurement ethics, and the product pipeline** (assessment → routing → outcomes). Cross-link findings; **summarize** the 150K number in 17 if 14 already documents provenance, and **defer** headline movement statistics to 14.
- **Prompt 06 (formation vs. information)** asks whether transformational learning works online. **Prompt 17** should **connect assessment-driven pathways to measured learning/formation outcomes** where literature allows — cite 06’s conclusions rather than re-litigating all of online formation.
- **Prompt 15 (adaptive leadership / maturity)** frames leader development stages. **Prompt 17** should note **where “maturity” in assessments overlaps or conflicts** with stage theories used in 15 (Fowler, Kegan, etc.) — one subsection or footnote is enough.
- **Prompt 11 (voice / AI fidelity)** touches **context-aware AI**. **Prompt 17** should clarify **what assessment data may ethically feed models** (granularity, consent, minimization) without reopening full voice-fidelity NLP.

## Research Questions

### APEST assessment validity
1. What is the APEST assessment's psychometric provenance? Was it developed using standard test construction methodology (item analysis, factor analysis, norming)?
2. Has the APEST assessment been independently validated? Are there peer-reviewed publications on its reliability (test-retest, internal consistency) or validity (construct, criterion, predictive)?
3. How does APEST compare methodologically to established assessments? (StrengthsFinder/CliftonStrengths — Gallup-validated; MBTI — debated validity; Enneagram — no psychometric basis; DISC — moderate validity)
4. What does the assessment industry (ATP, ITC) say about minimum standards for personality/gifting assessments used in professional or spiritual contexts?

### Adaptive learning and personalization
5. What does the educational technology literature say about assessment-driven personalization? Does personalizing content pathways based on initial assessment actually improve learning outcomes? (Look at: adaptive learning platforms — Knewton, ALEKS, Carnegie Learning)
6. What's the evidence for "learning styles" and "personality-based learning"? (The VARK debunking, but also the valid work on prior knowledge, motivation, and self-regulation as personalization dimensions)
7. Is "spiral curriculum" (Bruner) the right model for the five-portal approach? What does the research say about spiral vs. linear vs. modular curriculum design?

### Spiritual formation tracking
8. Can spiritual formation be meaningfully tracked or measured? What frameworks exist? (Dallas Willard's VIM model, James Fowler's stages of faith, Robert Kegan's constructive-developmental theory)
9. What are the ethical considerations of tracking spiritual progress digitally? What do pastoral theologians and spiritual directors say about quantifying formation?
10. Are there existing tools that attempt spiritual formation tracking? (Barna FRAMES, Monvee, RealLifeChange) How have they been received?

### Assessment-to-pipeline at scale
11. What is the actual re-engagement rate for assessment completers? What do assessment platforms report about how many people who take an assessment go on to consume related content? (BuzzFeed quizzes vs. StrengthsFinder coaching pipeline)
12. What would a 150,000-person pipeline actually yield in paying customers? What are typical assessment-to-conversion funnels in the coaching/learning industry?

### mDNA and related instruments
13. Is mDNA assessed with the same instrument as APEST, a distinct battery, or a composite score? What documentation exists for **construct definition** and **score interpretation** for each public-facing product?
14. If multiple instruments exist, what are the **implications for personalization** (single latent trait vs. multidimensional profile; risk of double-counting or conflicting routes)?

### Data ethics, privacy, and algorithmic routing
15. How do **GDPR**, **CPRA**, and sector norms treat “soft” sensitive categories (beliefs, affiliation, inferred psychology) when used for **automated recommendations**? What is best practice for **consent, explainability, and deletion** for faith-based profiling?
16. What does HCI and **recommender-system ethics** literature say about **filter bubbles**, **self-fulfilling labels** (e.g., reinforcing a low score on a gifting dimension), and **fairness** when pathways are algorithmically ranked?
17. What guardrails do **pastoral counselors and spiritual directors** recommend when leaders see **quantified** scores about themselves or others (comparison, shame, gamification)?

## Skills to use

- `/academic-research` — psychometrics, adaptive learning, spiritual development measurement, assessment validity, recommender ethics
- `/author-research` — James Fowler, Robert Kegan, Jerome Bruner, Dallas Willard, assessment developers and publishers in the faith/workplace assessment space
- `/poll-opinion-research` — assessment industry reports, adaptive learning effectiveness data, consumer trust in personalized EdTech
- `/article-corpus` — what Alan Hirsch and internal corpus sources claim about APEST, mDNA, formation goals, and personalization; flag where **marketing language outruns** what instruments can support

## Output expectations

### Raw research file → `docs/build/research/raw/17-assessment-science-raw.md`

Include:

- **APEST / mDNA psychometrics pack:** reliability evidence (α, test–retest), factor structure, norms (if any), manuals or gray literature; explicit **“none found”** sections where claims lack peer review
- **Comparator table:** APEST vs. CliftonStrengths vs. DISC vs. Big Five–based tools vs. Enneagram — on **validation status**, not theology (one row per criterion: internal consistency, predictive validity, independent audit, industry standing)
- **ITC / ATP / EFPA** (or equivalent) **minimum-expectation summary** for tests used in development/coaching contexts — map Movemental’s stated uses to those standards
- **Adaptive learning evidence matrix:** platform or study, population, outcome measure, effect size or qualitative verdict, limitation; include **null and negative** findings
- **Debunked vs. valid personalization dimensions:** short subsection on VARK / learning styles vs. **prior knowledge, spacing, retrieval practice, motivation, SRL**
- **Spiral curriculum:** Bruner and successors — when spiral design helps, when it hurts cognitive load; implications for “five portals” sequencing
- **Formation measurement frameworks:** VIM, Fowler, Kegan, etc. — what is **formative assessment** vs. **inappropriate surveillance** in Christian practice
- **Digital formation tools scan:** Barna FRAMES, Monvee, RealLifeChange, and any newer apps — uptake, critiques, discontinuations
- **Funnel benchmarks:** assessment → email → course purchase or coaching (industry ranges with citations); **sensitivity table** for conversion assumptions against a 150K top-of-funnel (cross-reference Prompt **14** for how 150K is defined)
- **Confidence ratings** for each major claim Movemental makes about assessments and personalization: Verified / Partially Supported / Unverified / Contradicted (with rationale)
- **Counter-arguments** section: strongest scholarly, pastoral, and UX objections to “assessment-driven personalized formation at scale”

### Exploratory article → `docs/build/research/articles/17-assessment-science.md`

**Target length:** 2,000–3,000 words (may run shorter if evidence is thin — say so explicitly rather than padding).

**Purpose:** Stress-test the **assessment → personalization → formation** chain: what is empirically grounded, what is plausible but unproven, and what **copy, product, and theology** need to change for the pipeline to stay honest and durable.

**Suggested outline:**

1. **Why this chain matters** — the three linked claims (psychometric, pedagogical, platform) and what fails if any link breaks
2. **APEST / mDNA on the evidence table** — what is documented vs. asserted; relation to industry standards; one honest paragraph on **limits of self-report gifting instruments**
3. **Does personalization improve outcomes?** — adaptive learning and EdTech; valid vs. junk personalization dimensions; connect outward to **Prompt 06** where relevant
4. **Spiral portals and curriculum theory** — Bruner's spiral as lens; risks of overload and unfalsifiable “journey” language
5. **Measuring formation without harming souls** — frameworks, pastoral ethics, anti-gamification; what “tracking” should never mean
6. **Pipeline economics and behavior** — re-engagement and conversion realism; tie to **Prompt 14** for 150K definition and comparators
7. **Data, consent, and recommenders** — privacy regimes, explainability, label risk; what the platform should log vs. never infer
8. **Recommendations** — credible public claims, in-product disclaimers, research backlog (e.g., pilot outcomes study), and **when to prefer human routing** over algorithmic routing

**Tone:** Intellectual honesty over advocacy (see `docs/build/research/prompts/README.md` ground rules). If psychometric support is weak, say so and propose **softer, accurate** language that still sells the real value (e.g., reflection tool + human interpretation + community discernment).

## Execution notes for the research agent

1. Read **`docs/build/research/raw/00-existing-corpus-audit.md`** (if present) before duplicating work already captured in the four-repo audit.
2. Read **`docs/build/research/raw/14-church-planting-movements-raw.md`** (if present) for the **150K+ provenance and definition-of-completion** thread; extend rather than repeating it here unless new sources appear.
3. **Full citations** for every statistic and norm: author, title, publisher or journal, date, URL or DOI where applicable.
4. Prefer **peer-reviewed** psychometrics and learning sciences over vendor white papers; label commercial sources clearly.
5. When internal copy uses words like **“validated,” “proven,” or “unique,”** map each instance to **evidence or retract** in the recommendations section.
6. Save outputs only to the paths specified above unless the user directs otherwise.
