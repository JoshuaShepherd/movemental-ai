# Raw research — 05: Expert discoverability (SEO, GEO, visibility gap)

**Date:** 2026-04-12  
**Prompt:** `docs/build/research/prompts/05-seo-geo-expert-discoverability.md`  
**Methods:** Web search / selective page fetch; Semantic Scholar API attempted (429 rate limit); internal repo grep for multiplier provenance.

---

## 1. SERP and the “visibility gap” (empirical verification)

### Feasibility note

Live, reproducible SERP position checks require either manual browser runs in a signed-in or clean session or a rank-tracking API. This file records **secondary evidence** (web summaries, representative URLs in snippets) and **plausible mechanisms** validated by SEO industry literature—not a frozen SERP export for April 2026.

### Target queries (to verify manually or with rank trackers)

| Query | Hypothesis (argument `C-P04`) | Quick secondary check (2026-04-12 web landscape) |
|--------|--------------------------------|-----------------------------------------------------|
| “APEST framework” | Aggregators / assessments / training sites may outrank a single “originator” homepage | Snippets surface Forgotten Ways / 5Q / third-party assessments; not a single canonical “creator” URL |
| “apostolic genius” | Book commerce (Amazon), Wikipedia-class summaries, reviews may dominate | Typical pattern for named concepts tied to books |
| “missional ecclesiology” | Academic publishers, Wikipedia, denominational hubs | Broad term; institutional and encyclopedic URLs common |
| “church multiplication” | Large ministries, publishers, course platforms | High competition head term |

### AI Overviews

Industry analyses (e.g. Ahrefs blog on AI Overviews and CTR) report **large CTR reductions** when AI Overviews appear—shifting value from “position 1 blue link” to “being cited inside the overview.” That **reframes** the visibility gap: experts may lose clicks even when ranked well. Treat exact percentages as **vendor-specific** unless reproduced on your own sample.

**Sources (industry):**

- Ahrefs — AI Overviews / CTR / large-scale keyword studies: `https://ahrefs.com/blog/ai-overviews-reduce-clicks` and related posts on AI Overview prevalence.  
- SparkToro — zero-click narrative (often cited in SEO industry; verify current year and methodology before quoting in marketing).

---

## 2. Is this specific to religious leaders or general to “framework creators”?

### Pattern: general

Named methodologies (“Jobs to be Done,” “Blue Ocean Strategy,” “OKRs”) routinely see **publishers, Wikipedia, consultancies, and course marketplaces** occupy top results alongside or above individual authors. Religious niche adds: **lower commercial link velocity**, more **nonprofit / church** domains (often weaker technical SEO), and **YMYL-adjacent** sensitivity for some queries (Google applies stricter quality expectations where harm could result—see rater guidelines for YMYL framing).

**Implication:** Movement leaders are a **subset** of a broader “originator vs. ecosystem” information-market problem, not a wholly separate failure mode.

---

## 3. “Aggregator advantage” — SEO literature themes

Common explanations repeated across practitioner sources (e.g. Search Engine Journal, agency blogs):

1. **Domain-level signals** — large sites accumulate links, crawl frequency, and brand queries.  
2. **Intent matching at scale** — programmatic or template-driven coverage of long-tail variants.  
3. **UX / composite utility** — comparison tables, consolidated answers, user reviews (especially Amazon).  
4. **Entity resolution** — Wikipedia often satisfies “what is X?” informational intent with a stable, well-linked entity page.

**Representative articles:**

- Search Engine Journal — aggregator ranking: `https://www.searchenginejournal.com/aggregator-sites-ranking/443134/`

---

## 4. EEAT — what Google publishes vs. what practitioners infer

### Official

- **Search Quality Rater Guidelines (PDF)** — primary source for definitions and examples raters use:  
  `https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf`  
- Google Search Central blog — high-level overview of rater guidelines:  
  `https://blog.google/products/search/overview-our-rater-guidelines-for-search`

Raters’ scores **do not directly move** individual URLs; they are used to **align** systems with human quality expectations. Marketing claims that “EEAT = a direct ranking score” should be softened.

### Practitioner commentary (examples)

- Lily Ray — EEAT overview and practical interpretation: `https://lilyray.nyc/e-a-t-expertise-authoritativeness-trustworthiness/`  
- SISTRIX — interview format on experience/expertise: `https://www.sistrix.com/ask-sistrix/seo-talks/how-to-use-your-experience-and-expertise-eeat-with-lily-ray`

**Evolution note:** “E-E-A-T” adds **Experience** to the older E-A-T framing; Google and the SEO community emphasize **Trust** as central. 2024–2025 guideline updates (as summarized by third parties) stress **authenticity** and spam/fake-entity patterns—verify any bullet list against the PDF before legal/compliance use.

---

## 5. Multi-expert hubs vs. individual sites

**Conceptual alignment (not a proven single “hub rank boost” factor):**

- Google documentation stresses **helpful, reliable, people-first** content; hubs can accumulate **breadth of coverage**, **internal links**, and **citation-like** references—signals correlated with authority.  
- **“Topical authority”** in SEO practice usually means **depth + internal linking + consistent entity** around a subject (pillar/cluster models)—see Moz on topic clusters: `https://moz.com/blog/blog-topic-clusters`

**Caution:** “Platforms with many experts rank better” is easy to **over-claim**. Correlation with large editorial operations does not prove a dedicated ranking knob for “number of experts.”

---

## 6. AI systems and religious / theological content

### Observable tendencies (vendor and gray-literature reports)

Third-party “AI citation” reports (e.g. Otterly, ConvertMate, StackMatix) assert heavy use of **large UGC / community** domains and **high-DA** brands in AI answer citations. These studies are **commercial** and methodology-sensitive—use as **directional**, not gospel.

Example report (commercial blog):  
`https://otterly.ai/blog/the-ai-citations-report-2026/`

### Why theology may be under-cited in some AI products

- Training data and retrieval corpora may **underweight** niche publishers vs. mainstream news / academic / wiki.  
- Safety layers may **down-rank** doctrinal certainty or reduce single-faith sourcing.  
- **Freshness** signals (claimed important for some AI search products) disadvantage slow-publishing scholars.

**Who gets cited:** often **Wikipedia**, major news, dominant commercial brands, and highly-linked reference pages—same structural bias as classic search, with **less** incentive to click through.

---

## 7. GEO — current state (foundational paper + venue)

### Primary paper (peer-reviewed / arXiv lineage)

**Title:** GEO: Generative Engine Optimization  
**arXiv:** `https://arxiv.org/abs/2311.09735` (v3 revised 2024-06-28)  
**PDF:** `https://arxiv.org/pdf/2311.09735`  
**Abstract (paraphrase):** Generative engines synthesize multiple sources; creators have little control; authors introduce GEO as a **black-box optimization** framework and **GEO-bench**; reported **up to ~40%** visibility improvement in generative responses in their evaluations; efficacy **varies by domain**.

**Venue note:** Collaborators include Princeton and other institutions; conference listing appears as **KDD 2024** in institutional metadata (verify BibTeX on arXiv for exact proceedings citation).

### Follow-on ecosystem (verify before academic citation)

Blogosphere references **AutoGEO**, **C-SEO Bench**, and other 2025–2026 artifacts—these should be traced to **actual papers** (venue, authors, peer review) before treating as established science.

---

## 8. GEO strategies that “work” (evidence hierarchy)

From the **Princeton-led GEO paper** (abstract-level claims only in this raw file):

- Domain-specific methods matter.  
- Some content manipulations improve **generative visibility** in their benchmark; others may not transfer to production engines.

Practitioner “playbooks” add: **clear structure**, **quotable expert lines**, **statistics**, **citations**, **schema**—aligned with classic information retrieval + LLM preference for extractable spans. **Keyword stuffing** is called out in secondary summaries as **harmful** in GEO experiments—do not import old SEO hacks blindly.

---

## 9. Religious / theological niche — specific evidence

**Limited rigorous, public, niche-specific A/B studies located in this pass.** Default position: assume **same structural forces** as general informational content, plus **smaller corpus** and **safety moderation**. Primary research gap worth a dedicated literature pass if product messaging depends on it.

---

## 10–11. Network SEO: internal linking, co-citation, topic clusters

### Internal linking / clusters

- Moz, HubSpot, and numerous agencies document **pillar + cluster** architecture for **topical coverage** and crawl/navigation benefits—**not** a guaranteed multiplier.  
- Co-citation as a classic IR / SEO concept: being **named alongside** trusted sources may help models and users associate entities; hard to isolate as a ranking experiment.

### “100-leader platform = SEO advantage”

**Conditionally true as a strategy container:** pooled **editorial depth**, **cross-linking**, **shared technical quality**, and **brand entity** can improve discovery **if** duplicate/thin content and governance issues are avoided. **Not automatically** true—networks can create **duplicate**, **canibalizing**, or **low-trust** patterns if templated.

---

## 12. Social vs. email — benchmarks and `C-P05` “70–80% left on the table”

### Industry round-number benchmarks (high variance by industry)

Multiple marketing blogs (2024–2026) cite patterns such as:

- Email **conversion rates** often quoted higher than organic social **conversion** for commerce-oriented funnels (ranges vary wildly).  
- Organic **reach** on major social platforms often quoted in **low single digits** for Pages (platform-dependent; changes frequently).

**Examples of secondary summaries (not peer-reviewed):**

- EmailToolTester — email vs social comparison articles: `https://www.emailtooltester.com/en/blog/email-marketing-vs-social-media/`

### Mapping to “70–80% left on the table”

No single Pew/Gallup-style statistic was found that states “70–80%” in this exact framing in the quick search pass. Treat **`C-P05` as a rhetorical compression** of (a) low organic reach, (b) rented audience risk, and (c) email’s relative conversion—**not** as a literal universal percentage without your own analytics.

---

## 13. Source of **28×–500×** reach multiplier (`C-SP04` / Movemental messaging)

### Internal documentation (this repo)

`docs/business-docs/documentation-index/10-pricing-economic-rationale.md` states modeled “math”:

- Solo platform: **1×**  
- **100-user network: 28×** amplification  
- **1,000-user network: 500×** amplification  

Same narrative appears in `docs/business-docs/core-docs/22-movemental-author-overview.md` and other index files.

### External peer-reviewed trace

**Not found** in this research pass as an independent empirical result in social contagion literature (Semantic Scholar 429; web search did not surface a standard citation for “28×–500×” as measured network reach).

**Conclusion for messaging:** Present as **internal model / illustrative scaling**, or qualify heavily with assumptions (cross-promotion rates, overlap correction, definition of “reach,” time window). **Do not** present as externally validated “research says 500×” without a primary study.

---

## Source index (retrieval log)

| Item | URL / location | Status |
|------|----------------|--------|
| GEO paper | `https://arxiv.org/abs/2311.09735` | Fetched (arXiv HTML) |
| Google rater guidelines PDF | `https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf` | Known stable URL; PDF not fully ingested |
| Lily Ray EEAT | `https://lilyray.nyc/e-a-t-expertise-authoritativeness-trustworthiness/` | Search hit |
| SEJ aggregators | `https://www.searchenginejournal.com/aggregator-sites-ranking/443134/` | Search hit |
| Ahrefs AI Overviews | `https://ahrefs.com/blog/ai-overviews-reduce-clicks` | Search hit |
| Moz topic clusters | `https://moz.com/blog/blog-topic-clusters` | Search hit |
| Multiplier provenance | `docs/business-docs/documentation-index/10-pricing-economic-rationale.md` | Read from repo |
| Semantic Scholar API | `api.semanticscholar.org/.../paper/search` | 429 Too Many Requests |

---

## Argument ID crosswalk (from prompt)

| ID | Theme |
|----|--------|
| `C-P04` | Originators under-ranked vs. Amazon/Wikipedia/generic publishers |
| `articles-055` | Leaders ignored SEO; landscape shifted |
| `research-017` | EEAT as discoverability foundation |
| `research-018` | Pillar/cluster → topical authority + AI citation |
| `research-019` | GEO complements SEO |
| `C-SP04` | Network amplification 28×–500× |
| `C-P05` | Social/email “left on table” (benchmark stress-test) |
