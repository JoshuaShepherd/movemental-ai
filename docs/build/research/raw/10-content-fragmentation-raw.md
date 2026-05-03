# Raw research: Content fragmentation and leader visibility (Prompt 10)

**Date:** 2026-04-12  
**Prompt:** [docs/build/research/prompts/10-content-fragmentation-leader-visibility.md](../prompts/10-content-fragmentation-leader-visibility.md)  
**Argument IDs:** `C-P02`, `C-SP05`, `research-022`, `C-P05`, `C-F10`, `C-F09`

**Skills applied:** Academic-style retrieval (OpenAlex), industry/trade sources (APA, Orbit Media, trade press), practitioner web (creator tools, SEO doctrine), internal argument grep where useful.

---

## Source index

| Tier | Source | Retrieval | Use |
|------|--------|-----------|-----|
| A | OpenAlex Works API (`mailto` param) | 2026-04-12 `curl` + `jq` | Peer-reviewed anchors for digital marketing / celebrity labor / fragmentation-adjacent topics. |
| A | Publishing Perspectives — Porter Anderson, “Audio Publishers Association US 2024 Survey” (June 3, 2024) | `WebFetch` https://publishingperspectives.com/2024/06/audio-publishers-association-us-2024-survey-9-percent-growth/ | APA/Edison headline stats; **religious/faith-based growth** line item. |
| A | Orbit Media — Andy Crestodina, “The 12th Annual Blogger Survey” / blogger analysis (2025 page) | `WebFetch` https://www.orbitmedia.com/blog/blogger-analysis/ | Consolidation-adjacent **content marketing effectiveness**, word count, AI use correlations; **n = 808** for 2025 “strong results” benchmark. |
| B | Kit (ConvertKit) — State of the Creator Economy / email marketing stats blog | Web search snippets + URLs | Creator adoption of email tools; treat as **vendor-sourced** not independent science. |
| B | HubSpot — topic clusters / pillar content marketing pages | Web search summary | Industry doctrine: **topical clustering** on one property supports discoverability narrative. |
| B | beehiiv, Wordflirt, Subpage — blog posts on social → email | Web search | **Directional** benchmarks; not peer-reviewed. |
| C | Ventress.app, creator blogs (YouTube consolidation) | Web search | **Anecdotal / SEO blog** tier — useful for hypotheses, not for hard claims. |

---

## 1. “Content fragmentation” in research literature

**OpenAlex sample** (`search=creator economy platform fragmentation`, 2026-04-12):

- *Research on the Impact of Content Fragmentation Propagation in Short Videos* (2022), `doi:10.2991/assehr.k.220105.044`, cited_by_count **7** — niche; uses “content fragmentation” in **short-video** propagation sense (not thought-leader portfolio sense).
- *Setting the future of digital and social media marketing research* (Kaplan & Haenlein, 2020), `doi:10.1016/j.ijinfomgt.2020.102168`, cited_by_count **2343** — agenda-setting for **platformization**, influencer marketing, consumer journeys.
- *The future of social media in marketing* (2019), `doi:10.1007/s11747-019-00695-1`, cited_by_count **1707** — frameworks for **social + retail + brand** convergence.

**OpenAlex** (`search=Mapping Internet Celebrity TikTok`):

- *Mapping Internet Celebrity on TikTok: Exploring Attention Economies and Visibility Labours* (2020), cited_by_count **466** — **visibility labor** and platform attention; supports thesis that **presence ≠ compounding** without editorial/system work.

**Gap:** Little peer-reviewed work uses the exact phrase **“platform scatter”** for nonprofit or religious thought leaders. Movemental’s claim is best grounded in **(a)** platform studies + marketing science + **(b)** primary inventory data on specific leaders.

---

## 2. Creator economy: email, ownership, “scatter”

**Kit / ConvertKit public narrative** (verify on `kit.com` / `convertkit.com` resources):

- High share of **professional creators** report using **email marketing tools** (industry surveys commonly cite **~80%+** adoption among serious creators — **re-verify annually** from Kit’s published PDF/blog).
- Positioning: email as **owned** channel vs. algorithmic social as **rented** reach.

**Interpretation for Movemental:** True regardless of exact percentage — **platform dependency risk** is standard marketing doctrine; numeric claims should cite **named survey year + question wording**.

---

## 3. Link-in-bio / “single page” consolidators (Linktree, Beacons, Stan)

**Category function:** Aggregate outbound links, light commerce, sometimes email capture.

**Why insufficient for “movement leader” use case (hypothesis, testable):**

1. **No semantic depth** — thin pages rarely earn **topic authority** for hundreds of long-tail queries across books, talks, articles.  
2. **No canonical corpus** — PDFs, LMS modules, publisher pages, podcast episodes remain **off-domain** duplicates.  
3. **Limited narrative** — credibility is often **story + evidence graph**, not a button grid.  
4. **Platform still intermediates** — policy, analytics, and brand dilution on **link host** domain.

**Not anti-Linktree:** excellent **wayfinding layer**; weak as **sole** “home” for a high-corpus leader.

---

## 4. SEO: consolidation, topical authority, single domain

**HubSpot-influenced industry model:** **Pillar + cluster** architecture on one primary domain to signal breadth and internal linkage (HubSpot research pages on topic clusters — cite HubSpot URLs in article).

**Google / SEO practitioner consensus (2023–2025):** “Topical authority” discourse strengthened after API documentation leaks discussed **site focus / radius** concepts (treat as **engineering-sourced rumor with market impact**, not journal article).

**Practical takeaway:** Moving **canonical** long-form to one domain tends to help **internal linking, crawl efficiency, brand query consolidation**; **mirrors** everywhere can **dilute** signals unless `rel=canonical` and redirect strategy are disciplined.

---

## 5. Social → email: benchmarks and the “70–80%” claim

**Problem type:** Confusion between:

- **CTR** from social post to landing page (often **low single digits** in many organic contexts — **highly variable** by platform and CTA).  
- **Follower → subscriber** conversion over a campaign window.  
- **Lifetime value** of non-converted followers (still useful for reach).

**Tier-B web summaries** (e.g. marketing blogs) often cite **~2–3%** landing-page CTR from social as order-of-magnitude **“almost nobody clicks”** evidence — **not** the same as “email capture rate.”

**Movemental `C-P05` “70–80% left on the table”:**

- **Defensible if reframed:** “For many accounts, **the vast majority** of followers never become **owned-list** subscribers” — aligns with **low conversion** literature directionally.  
- **Indefensible if framed as:** a universal **peer-reviewed 70–80%** figure for all niches — **no single study** was retrieved that matches that exact band for **organic** social-to-email across movement leaders.

**Recommendation:** Replace headline number with **range + source** (e.g. report Kit survey on % using email + separate benchmark on bio link CTR from a named A/B study), or run **first-party** measurement on Movemental cohort.

---

## 6. Audiobooks — market scale and “religious” tail

**Publishing Perspectives / APA (June 2024 reporting cycle):**

- US audiobook revenue grew **9% in 2023 to approximately $2 billion** (publisher-reported sales program + consumer survey).  
- Edison Research consumer survey (Feb 2024, **n = 1,061** U.S. adults 18+): **52%** of Americans have **tried** listening to an audiobook.  
- **Fastest-growing genres** in APA’s reported slice included **Religious, faith-based at +17% growth** (alongside history/bio/memoir, health/fitness, romance).  
- Top **revenue share** genres listed were **general fiction**, **SF/F**, **romance** — i.e. religious is **growth** story more than **volume king**.

**Implication for `C-F09`:** Audiobook format is a **real incremental channel**; **Christian nonfiction** competes in a market where **fiction dominates revenue share** — positioning should be **“format expansion + discoverability”**, not “audio will outsell print.”

**Note:** Trade press also circulates **$2.22B / 13%** figures for later APA cycles — **always cite the specific APA press release or survey year** to avoid mixed-year confusion.

---

## 7. Video: scattered appearances vs. one channel

**YouTube product reality:** Channels earn recommendations partly from **viewer history clustering** on that channel; **multiple channels** split watch history and upload cadence.

**Evidence quality:**

- **Strong:** Creator documentation + innumerable practitioner case studies.  
- **Weak for academic citation:** Few rigorous RCTs on “one vs many channels” for identical creators.

**Pragmatic synthesis:** For **personal brand** leaders, **one primary channel + playlists** often beats **many dormant channels**; for **multi-audience orgs** (kids vs. theology), **separation** can help **clarity** — not one-size-fits-all.

---

## 8. “Offline impact vs. online visibility” quantification

**Limited direct literature** on “movement theologians.” Proxies:

- **Bibliometrics** (citations vs. follower counts) — ORCID + Google Scholar vs. Instagram.  
- **Pew / Barna / Lifeway** on congregational digital habits — more about **churches** than individual **public intellectuals**.

**Pew** (2023) on online religious consumption — useful for **audience behavior**, not leader inventory.

**Movemental-specific fix:** Build a **Visibility Gap Index** per author: (books + chapters + talks + podcasts + courses) / (canonical URLs on owned domain + hours of searchable transcript + unified schema).

---

## 9. Content strategist recommendations (practitioner canon)

**Orbit Media 2025 blogger survey (n=808):**

- **21%** report **“strong results”** — used as benchmark throughout their analysis.  
- Average article length **~1,333 words**; longer/detailed programs correlate with stronger self-reported outcomes.  
- **AI:** very few use AI to write **complete** articles; that cohort **least** likely to report strong results — supports **“consolidation must preserve quality bar”** argument.

**Names from prompt:** Ann Handley, Joe Pulizzi, Andy Crestodina — **Crestodina** directly backed by fetched Orbit dataset; Handley/Pulizzi as **industry standards** (no new fetch required).

---

## 10. Case studies — consolidation with measurable lift

**Honest status:** Public, **audited** before/after analytics for thought leaders who consolidated are **rare** in open literature. Most evidence is:

- **Vendor case studies** (often directional).  
- **Creator memoir posts** (n=1).  
- **SEO agency posts** with redacted charts.

**Movemental opportunity:** Publish **first-party** case studies with leader permission: 90-day **branded search volume**, **sitelinks**, **newsletter signups**, **course enrollment**, **time-on-site** — with a **data contract** upfront.

---

## 11. What to collect from first Movemental users (product + research)

1. **Inventory:** count of assets by type (video, audio, PDF, course, newsletter, third-party article) + **URLs**.  
2. **Canonicalization:** % of assets with duplicate hosts (Amazon, Substack, Vimeo, seminary LMS).  
3. **Search:** Google Search Console **queries** and **impressions** pre/post migration to Movemental domain.  
4. **Email:** subscriber growth rate + **source attribution** (social vs. organic vs. referral).  
5. **Social:** follower counts vs. **link CTR** from bio / posts (platform-native analytics).  
6. **Time:** self-reported hours/week on **tool switching** (fragmentation tax survey).  
7. **Revenue:** new streams enabled (audiobook, course, paid community) — even **ordinal** (“small lift / none / significant”).

---

## Internal repo cross-refs (grep snapshot)

Messaging files under `docs/arguments/custom-gpt/` already narrate **scattered content**, **backend tables**, **digital maturity gaps** for specific leaders — use for **story**, not as **census** of all leaders.

---

## OpenAlex retrieval log (machine-readable)

```
Query: creator economy platform fragmentation
URL: https://api.openalex.org/works?search=creator%20economy%20platform%20fragmentation&per_page=8&mailto=research@example.com
meta.count: 8366
Notable DOIs retrieved: 10.1016/j.ijinfomgt.2020.102168 ; 10.2991/assehr.k.220105.044 ; 10.1007/s11747-019-00695-1

Query: omnichannel personal brand social media  
URL: https://api.openalex.org/works?search=omnichannel%20personal%20brand%20social%20media&per_page=6&mailto=research@example.com
Notable: Kaplan & Haenlein digital transformation (2019) DOI 10.1016/j.jbusres.2019.09.022 ; Kaplan & Haenlein social media marketing future (2020) as above.
```

---

## Disclaimer

Figures from trade press and vendor blogs **age quickly**. Marketing claims in Movemental copy should carry **year + publisher + methodology** or be expressed as **qualitative** (“most followers never join the mailing list”) without fake precision.
