# Raw research: Publishing economics & creator economy (Prompt 03)

**Date:** 2026-04-12  
**Prompt:** `docs/build/research/prompts/03-publishing-economics-creator-economy.md`  
**Skills applied:** academic-research (attempted), poll-opinion-research / industry-survey sources, author-research (trace + dossier style)

---

## 1. Argument index trace (repo)

| Claim | Cited ID in prompt | Actual primary trace in repo | Notes |
|--------|-------------------|------------------------------|-------|
| 85–90% publisher “capture” | `C-A11`, `C-P03` | `docs/arguments/custom-gpt/messaging-01-arguments.md` (C-A11), `messaging-02-pain-positioning-selling.md` (C-P03 alternate phrasing) | Individual `C-*.md` shards not present in workspace; content lives in consolidated messaging files. |
| False choice publisher vs rental platform | `C-P03` | Same — `messaging-02-pain-positioning-selling.md` | Core claim: leaders rarely monetize digital; books/speaking dominate. |
| $1,000 + 10% “revolutionary” | `C-SP05` | **Mismatch:** `C-SP05` in `messaging-02` is “Everything in one home” (consolidation). **$1,000 + 10%** copy appears under **“Revolutionary Pricing”** in same file (~line 1451) and in `docs/business-docs/core-docs/10-pricing-economic-rationale.md`. | Prompt should tie pricing to `10-pricing-economic-rationale.md` / messaging block, not only `C-SP05`. |
| $140K–$380K / year | `business-042` | **ID error in prompt:** `business-042` in `messaging-04-strategy.md` = *invitation-only GTM*, not monetization. **$140K–$380K** appears in `docs/movement_leader_research/alan-hirsch/README.md` (line 38) and `docs/arguments/custom-gpt/messaging-07-business-audience-ai.md`. | Treat projection as **internal opportunity estimate** for Alan Hirsch profile, not a validated market statistic. |
| `business-043` | Geographic expansion | `messaging-04-strategy.md` | Not material to publishing economics; prompt linkage is weak. |

---

## 2. Traditional publishing economics

### 2.1 Royalty rates (what is actually “10%”?)

**Standard framing (trade nonfiction):**

- **Hardcover:** commonly cited **10–15% of list (retail) price** on escalating scales as sales thresholds rise.
- **Paperback:** often **6–10% of list** (varies by format and contract).
- **Ebooks:** commonly **25% of net receipts** (publisher’s digital receipts after retailer), with some contracts higher or lower.

**Interpretation for claims:**

- Saying the **author earns ~10% of list** on print is **compatible with industry norms** for the *author’s contractual royalty on cover price*.
- Saying the **publisher “takes 90% of revenue”** as **pure extraction** is **misleading** without defining the numerator. The gap between cover price and author royalty includes **retailer margin**, **returns**, **printing/bindery**, **freight**, **marketing**, **overhead**, and **risk-bearing** (unsold inventory, advance write-downs). Economists and publishing scholars typically treat much of that as **cost of distribution and production**, not profit transferred from author to publisher.

**Religious / “Christian market” specifics:**

- Public-facing royalty pages from **assisted / hybrid Christian imprints** (e.g. Dove Christian Publishers) cite **~10–25%** depending on channel (higher on direct consumer sales, lower through distributors). These are **not identical** to Big Five trade terms but show the same order of magnitude as list-based print royalties.
- **Tim Challies** (industry practitioner overview) and similar posts describe **first advances** in the **low thousands** for many first-time Christian authors, with wide variance for established names — useful qualitatively; cite as **journalism**, not peer-reviewed data.

### 2.2 Author income (survey — “structural underpayment” evidence)

**Authors Guild — Key Takeaways from the 2023 Author Income Survey** (published **Sept 27, 2023**, updated Oct 25, 2023).  
URL: https://authorsguild.org/news/key-takeaways-from-2023-author-income-survey  
Collaborators included major publishers and trade orgs; **n = 5,699** published authors.

**Reported medians (2022 income year):**

| Segment | Median book income | Median total author-related income |
|---------|-------------------|-----------------------------------|
| Full-time authors (all) | **$10,000** | **$20,000** |
| Full-time, commercial market (excl. academic/edu) | **$15,000** | **$25,000** |
| All authors incl. part-time | **$2,000** | **$5,000** |
| Full-time self-published | **$12,800** (books) | **$15,000** (total) |

**Guild narrative:** half of full-time authors below **minimum wage** in many states from **all** writing-related work; **well below** federal minimum from **books alone**; **most** writing-related income from **non-book** activities (editing, teaching, speaking, etc.).

**PDF / deeper tables:** page links to `Authors-Guild-2022-U.S.-Published-Author-Income-Study-slides-for-website.pdf` (URL on same page as of fetch).

**Use for Movemental:** Strong support for **economic precarity** and **diversification away from book royalties** among professional authors. Does **not** by itself prove a **90% publisher profit share**; it supports **low realized author earnings**.

---

## 3. Digital platform economics (verified fee schedules)

### 3.1 Substack (official)

**Source:** Substack Help — “How much does Substack cost?”  
URL: https://support.substack.com/hc/en-us/articles/360037607131-How-much-does-Substack-cost (fetched 2026-04-12)

- **Substack:** **10%** of paid subscription transactions when payments enabled.
- **Stripe:** credit card pricing (documented as **2.9% + $0.30** per transaction) plus **Stripe Billing** fee for recurring subscriptions (**0.7%** as of **July 2024** for recurring payments; legacy 0.5% until noted sunset for pre–July 10, 2024 accounts per Substack’s note).
- **iOS:** in-app purchases can route through Apple with **additional** Apple commission (often up to **30%** context-dependent).

**Implication:** Creator **retains roughly mid-to-high 80%** of gross subscription revenue on typical web card flows **before** tax — **not** “15–30%.”

**Internal doc conflict:** `docs/business-docs/core-docs/10-pricing-economic-rationale.md` states Substack/Patreon leave creators **15–30%** and platforms **extract 70–85%**. That is **inconsistent with Substack’s published fee schedule** unless “value” is defined to include non-fee factors (algorithm, brand, data) — which must be **labeled as interpretive**, not as payment percentages.

### 3.2 Patreon (official direction)

**Sources:** Patreon Help Center articles (web search summary, 2025 fee change):

- **New standard platform fee** for new creators (**effective after Aug 4, 2025**): **10%** (per Patreon announcement/help articles cited in search).
- **Legacy plans:** lower platform tiers (e.g. **5% / 8% / 12%** depending on plan generation — confirm current page for exact legacy matrix).
- **Plus:** payment processing, currency conversion, and **Apple IAP** fees where applicable.

**Implication:** Again, **creator keep is typically 80–90%+** of gross on many flows, not 15–30%.

### 3.3 Course platforms (summary — verify per vendor before quoting in sales)

| Platform | Platform transaction fee (typical) | Notes |
|----------|-------------------------------------|--------|
| **Kajabi** | **0%** platform fee on plans when using Kajabi Payments | Card processing ~2.9% + $0.30 (per Kajabi help articles in search results). |
| **Thinkific** | **0%** on paid plans (per third-party comparisons) | Processing still applies. |
| **Teachable** | **0%** on mid+ plans; **7.5%** on lower tiers; free/starter tiers may charge **higher %** | Check current Teachable pricing page — tiers change. |
| **Podia** | Mixed by plan | Pull from official pricing before hard claims. |

**Takeaway:** Comparing **Movemental 10% revenue share** to **“course SaaS”** is an apples/oranges mix: many LMS tools charge **SaaS subscription + processing**, not a **% of GMV** on higher tiers.

---

## 4. Creator income distribution (industry reports)

**ConvertKit / Kit — State of the Creator Economy 2024**

- PR and summary pages (e.g. PR Newswire announcement) cite survey scale (**1,000+ creators**) and headline stats such as **~18% earning $100k+** (third-party summaries; pull exact wording from PDF at https://convertkit.com/reports/creator-economy-2024 or successor URL).
- **Median income** not confirmed in snippets retrieved this session — **download report** before citing median.

**SignalFire / Linktree “creator economy” reports**

- Often cited for **power-law** income (small share of creators capture majority of revenue). **Re-fetch primary PDF** before quoting specific percentages — not reprinted here to avoid stale/wrong numbers.

**Authors Guild (again)**

- Useful for **book-centric** creators; complements platform-native surveys.

---

## 5. Subscription fatigue & switching costs (light touch)

- **Pew Research** (2025 short read): **83%** of U.S. adults use streaming TV; **36%** subscribe to cable/satellite — illustrates **stacked recurring media bills**. URL: https://www.pewresearch.org/short-reads/2025/07/01/83-of-us-adults-use-streaming-services-far-fewer-subscribe-to-cable-or-satellite-tv/
- **Commercial surveys** (Experian, Motley Fool-sponsored, Statista charts) report high shares of consumers feeling “too many” subscriptions — **use with caution** (methodology varies; not Pew gold standard).

---

## 6. $140K–$380K projection — methodology audit

**Source:** `docs/movement_leader_research/alan-hirsch/README.md` executive summary.

**What the number is:** A **single-leader strategic estimate** aggregating hypothetical upside from:

1. Scaled online courses (mDNA / APEST),
2. Audiobooks for flagship titles,
3. Paid newsletter tier,
4. YouTube centralization/monetization,
5. Premium APEST / workbook SKUs.

**What it is not (yet):**

- A published financial model with **enrollment curves**, **conversion rates**, **price points**, **refund/churn**, **CAC**, or **sensitivity tables**.
- Validated against **observed** revenue from comparable missional-theology creators.

**Stress-test questions before public use:**

- What **ARPU × active learners** path hits $140K? ($500 × 280 sales; $1,000 × 140; etc.)
- What **newsletter** paid conversion from **1,500 Substack** subs vs **37.9K Twitter** is assumed?
- YouTube monetization requires **watch hours / eligibility** — timeline?

**Recommendation:** Present as **illustrative upside band** with explicit assumptions, or **remove specific band** until modeled.

---

## 7. 90/10 precedents & cooperatives (desk notes)

- **Platform take rates** in creator tools range from **0% + SaaS fee** to **~30%** app-store/IAP corners — **10% of GMV** is **competitive** vs Substack’s headline 10% but **Movemental** bundles site + infra + support (different cost base).
- **Publishing co-ops / author-owned presses** exist (e.g. **Union Co-op** models, academic **OA** presses) — **not exhaustively researched** this session; good follow-up for “precedent” question.

**Illustrative unit economics (prompt Q8):**

- If **100** leaders each generate **$200,000** annual gross through the platform and Movemental takes **10%**, platform gross = **$2,000,000/year** (simplified, ignores processing costs, refunds, non-platform revenue). Reverse-solve for your own ARPU assumptions.

---

## 8. Academic API status (skill compliance)

| Source | Query / action | Result |
|--------|----------------|--------|
| Semantic Scholar | `creator economy platform revenue share authors` | **429 Too Many Requests** (no key) — no papers logged |
| OpenAlex | `book publishing author royalties` | **Poor relevance** (generic search surfaced unrelated high-citation clinical/guideline papers) — **refine** with `filter=concept.id:…` + narrower `search` in follow-up |
| PubMed / arXiv | Not run | Topic is social/econ, not biomedical priority |

**One relevant high-citation work** that appeared in noisy OpenAlex JSON (for **platform / social production** theory, not royalties): *The Wealth of Networks* (Benkler) — use for **governance / commons** framing if needed.

---

## 9. Source index (fetched or verified URLs)

| # | Source | URL | Used for |
|---|--------|-----|----------|
| 1 | Authors Guild | https://authorsguild.org/news/key-takeaways-from-2023-author-income-survey | Median incomes, methodology summary |
| 2 | Authors Guild PDF (linked from above) | https://authorsguild.org/app/uploads/2025/09/Authors-Guild-2022-U.S.-Published-Author-Income-Study-slides-for-website.pdf | Deeper tables (not fully parsed this session) |
| 3 | Substack Support | https://support.substack.com/hc/en-us/articles/360037607131-How-much-does-Substack-cost | 10% + Stripe fees |
| 4 | Internal — pricing rationale | `docs/business-docs/core-docs/10-pricing-economic-rationale.md` | Shows **internal** comparison claims to verify |
| 5 | Internal — Hirsch research | `docs/movement_leader_research/alan-hirsch/README.md` | $140K–$380K provenance |
| 6 | Pew (streaming / subscriptions context) | https://www.pewresearch.org/short-reads/2025/07/01/83-of-us-adults-use-streaming-services-far-fewer-subscribe-to-cable-or-satellite-tv/ | Macro subscription stack context |
| 7 | ConvertKit report landing | https://convertkit.com/reports/creator-economy-2024 | Creator economy distribution (needs PDF read) |

---

## 10. Bottom-line verification matrix (for legal / marketing review)

| External claim | Verdict | Action |
|----------------|---------|--------|
| Authors often earn **very little** from books alone | **Supported** (Authors Guild medians) | Cite Guild + year |
| **Publishers take 90% of book revenue** as a cash split | **Oversimplified / partly misleading** | Reframe to **royalty % of list/net** + **channel costs** |
| **Substack/Patreon take 70–85%** of subscription revenue | **Contradicted by vendor docs** | **Correct immediately** in site copy + `10-pricing-economic-rationale.md` |
| **$1,000 vs $50k–$150k custom dev** | **Directionally plausible** as a positioning story | Anchor with **comps** (agency quotes, Clutch ranges) when making financial comparisons |
| **$140k–$380k** digital upside | **Internal estimate**, not industry stat | Model transparently or soften language |
| **business-042** = that estimate | **False mapping** | Fix argument index / prompt |
