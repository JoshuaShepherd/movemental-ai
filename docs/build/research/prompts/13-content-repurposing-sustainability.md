# Research Prompt 13: Content Repurposing and the Sustainable Creation Model

## Context

Movemental promises that leaders can sustain a robust digital presence by repurposing what they already create — sermons, talks, training — rather than generating new content from scratch. Specific claims about efficiency and sustainability need verification.

Key claims:

- "Sermon-to-article content repurposing — capture what leaders already create, transform it into findable digital objects" (`C-F05`)
- "Sustainable Content Creation: 5-Hour Week Model" (`research-025`) — leaders can maintain their platform with ~5 hours per week
- "The 70/30 Rule: Sustainable Content Creation Model" (`research-029`) — 70% AI draft, 30% human refinement
- "Repurposing existing work into articles is legitimate and necessary" (`articles-039`)
- "48 sermons preached last year can become 48 downloadable articles, discussion guides, and social media series" — same work, different infrastructure
- "Content pipeline preview — demo of Movemental processing your work" (`business-082`)

**Argument IDs:** `C-F05`, `research-025`, `research-029`, `articles-039`, `business-082` (plus any adjacent claims in the index tied to "capture and transform," creator time, or AI-assisted editorial workflows).

**Relationship to other prompts:** Run after **00 (corpus audit)** so you do not re-research what internal docs already establish. Overlap intentionally with **11 (voice / 70–30 / human–AI co-writing)** — here, treat voice fidelity and authorship ethics briefly and point to 11 for depth. **03 (publishing economics)** and **10 (fragmentation)** supply why repurposing matters economically and structurally; cite them rather than re-proving the whole publishing thesis.

## Research Questions

### Content repurposing effectiveness
1. What does the content marketing literature say about repurposing? (Gary Vaynerchuk's "content pyramid," Content Marketing Institute research on repurposing ROI)
2. Is there research on the quality difference between original content and repurposed/transformed content? Does repurposed content perform as well for SEO, engagement, and audience building?
3. What are the actual conversion rates for sermon-to-article, talk-to-course, or interview-to-resource workflows? How much human editing is required for quality output?
4. Are there case studies of religious leaders or authors who successfully repurposed existing content at scale?

### The 5-hour week claim
5. What do content creators actually spend on content creation per week? What do industry benchmarks show? (Orbit Media blogger survey, HubSpot content marketing reports, CoSchedule productivity data)
6. Is 5 hours/week realistic for maintaining a platform with articles, courses, email, social, and AI Lab? What are comparable platforms' maintenance requirements?
7. What does the research say about creator burnout and sustainable production rhythms? (Creator economy burnout studies, Buffer/Convertkit creator wellbeing reports)

### The 70/30 rule
8. Is there research validating specific AI/human ratios for content production? What do content agencies and publishing houses report about AI-assisted workflows?
9. What quality differential exists between 70/30 AI/human content and fully human-written content? Can readers detect the difference?
10. How does 70/30 compare to what other AI-content companies claim or deliver?

### Theological and ethical dimensions
11. Is there a theological case for repurposing as stewardship vs. repurposing as laziness? How do different traditions view the integrity of adapting spoken word to written form?
12. What do homiletics scholars say about the relationship between sermon and written text? Are they the same act, or fundamentally different? (Fred Craddock, Thomas Long, Barbara Brown Taylor)

### Platform, SEO, and product claims
13. What does current SEO guidance say about **duplicate or near-duplicate** content when one source (e.g., a sermon transcript) becomes many URLs (article, blog, downloadable PDF)? When does repurposing help E-E-A-T and topical authority, and when does it trigger thin-content or duplication penalties?
14. How do **Generative Engine Optimization (GEO)** and AI-overview visibility assumptions change the value of "sermon → article" if answers are synthesized from many sources? Does long-form repurposing still win discovery, or only certain formats (video, structured FAQs, citations)?
15. What do **LLM-assisted editorial** product benchmarks disclose about time saved vs. quality? (Vendor case studies are weak evidence — prefer peer-reviewed or third-party evaluations of drafting tools in professional writing contexts.)

### Operational realism
16. What is the **full workflow cost** of repurposing (transcription, outline, draft, fact-check, rights, CMS, metadata, distribution) — not just "writing time"? Where do hidden hours appear in creator surveys?
17. For **multi-channel maintenance** (email + social + course + community), what does research say about **minimum viable cadence** vs. burnout? Is "everything weekly" a fantasy even at five hours?
18. What **failure modes** are documented when organizations scale repurposing without editorial standards? (Quality collapse, audience fatigue, brand dilution.)

## Skills to use

- `/academic-research` — content marketing ROI, repurposing effectiveness, AI-assisted writing quality, creator sustainability, human–AI task division
- `/poll-opinion-research` — creator economy surveys, content marketing benchmarks (Orbit Media, HubSpot, Buffer, ConvertKit), time-use and wellbeing reports
- `/author-research` — homiletics and sermon–text relationship (Craddock, Long, Taylor and successors), content-strategy voices on repurposing (Vaynerchuk pyramid as *popular* frame — verify with CMI/academic sources)

Optional if the agent has access: `/article-corpus` — scan internal Alan-corpus or business docs for how Movemental already defines "5 hours," "70/30," and the pipeline demo so external research can **confirm or qualify** those definitions rather than straw-man them.

## Execution notes (for the research agent)

- **Start from prompt 00** — note what Movemental docs already assert about time models and repurposing; external research should stress-test those claims.
- **Separate claims:** (a) repurposing is *legitimate*, (b) repurposing is *efficient*, (c) repurposing hits *quality bars* for SEO/GEO/audience trust, (d) a fixed hour budget is *sustainable* across all channels — each may have different evidence strength.
- **Citations:** every statistic needs author, date, publication, and URL or DOI where applicable.
- **Confidence ratings** for each major Movemental claim touched in this thread: Verified / Partially Supported / Unverified / Contradicted — with one sentence of rationale each.
- **Counter-arguments:** include the strongest case against over-promising automation (e.g., "AI draft + light edit" producing generic or theologically thin output).
- **Practical close:** what Movemental should say in marketing vs. onboarding vs. contracts if the evidence only partially supports the 5-hour or 70/30 framing.

## Output expectations

### Raw research file → `docs/build/research/raw/13-content-repurposing-raw.md`

Include:

- Content repurposing effectiveness and ROI — academic and industry (CMI, etc.) with methodology notes
- Creator time-use benchmarks (blogging, newsletter, social, course maintenance) — broken out by activity where possible
- AI/human ratio research — what is actually measured vs. what is asserted
- Sermon-to-text / speech-to-article quality and editing-burden data (where it exists; flag gaps honestly)
- SEO/duplicate content / E-E-A-T guidance relevant to multi-format reuse of one primary source
- Homiletics and theological notes on spoken vs. written word (citations to standard texts)
- Confidence table for: `C-F05`, `research-025`, `research-029`, `articles-039`, the "48 sermons → 48 artifacts" example, `business-082`

### Exploratory article → `docs/build/research/articles/13-content-repurposing.md`

**Length:** 1,500–2,500 words (stretch toward 3,000 only if the evidence on workflow hours is dense and requires tables).

**Aim:** An intellectually honest assessment of whether the **capture-and-transform** model is realistic for movement leaders, what **total** time and skill investment looks like (including invisible work), and how **strongly** the 5-hour week and 70/30 claims can be stated without overreach.

**Cover at minimum:**

1. **The promise in plain language** — what Movemental is asking leaders to believe about their existing output and their weekly rhythm.
2. **Evidence on repurposing** — marketing wisdom vs. empirical performance (SEO, engagement, conversion); religious-leader or adjacent case studies if available.
3. **The hour budget** — compare claimed ~5 hours to benchmarked creator hours; define what "platform maintenance" must include to be apples-to-apples.
4. **The 70/30 rule** — what research exists; reader detection; relationship to prompt 11 on voice and gatekeeping.
5. **Theology and integrity** — stewardship vs. laziness; sermon ≠ essay where homiletics warns; disclosure and audience trust (brief pointer to deeper ethics in 11 if needed).
6. **Risks** — duplicate content, thin AI slurry, pastoral misalignment when scale outruns discernment.
7. **Recommendations** — revised claims, onboarding language, and metrics Movemental should track on first cohorts to replace narrative with data.
