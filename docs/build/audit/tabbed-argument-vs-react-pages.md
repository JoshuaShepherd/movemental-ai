# Tabbed argument page vs React app — content audit

**Argument index:** `docs/html/tabbed-argument-page.html` (16 tabs, ordered cards per tab, 173 unique IDs reused across page-type tabs).
**App surface:** `src/app/(site)` marketing routes.

## Executive summary — structural drifts

| Issue | Detail |
|-------|--------|
| **No `/methodology` route** | Tabbed doc includes a full **Methodology** page-type tab (173 ordered claims). There is **no** `src/app/(site)/methodology/page.tsx`. How-it-works, system, evidence, and FAQ partially host “mechanism” language, but there is **no dedicated page** matching that tab’s intent. |
| **Legacy composite tabs vs split routes** | **Proof & About** (64) is modeled as one narrative in the HTML; the app splits it across **`/about`**, **`/evidence`**, and **`/case-studies`** (case studies are mostly placeholders). **Pricing & FAQ** (20) maps to **`/pricing`** + **`/faq`**. **Churches & Non-Profits** (48) maps to **`/churches`** + **`/nonprofits`**. **Who we serve** (173) has no single “who we serve” URL; closest is **`/who-is-a-movement-leader`** plus segment pages. |
| **Claim count ≫ section count** | Even dense pages (e.g. Home: **52** claims vs **~19** layout blocks) mean **many tabbed arguments are not 1:1 with a visible section**; they must compress into shared sections or remain uncovered. |
| **Terms tab vs live Terms** | Tabbed **Terms** lists 173 routed arguments (legal, data, risk). Live **`/terms`** is a short template (~9 prose sections), not a full legal argument deck. |
| **Walkthrough** | Tabbed list assumes a full journey narrative; live **`/walkthrough`** still uses a **video placeholder** (“Coming soon”) and six descriptive cards. |
| **Extra app routes not in tabbed legacy set** | Many `page.tsx` routes exist (book, blog, manifesto, inquiry, system-builds, etc.) that **do not correspond** to the 16 tabbed categories; their messaging is **out of scope** for this HTML file unless you extend the argument router. |

## Method

1. **Claim spine:** Parsed from each `<section class="panel" data-panel="…">` ordered list: `data-id`, hand-rail `data-head="1"`, `h4.card__title`, `p.card__body`.
2. **React corpus:** For each tab, listed files are concatenated and lowercased. **Methodology** uses **all** `(site)` `page.tsx` files (39 paths) as corpus **only because there is no methodology page**.
3. **Coverage:** Unique content words (len > 4, stopword-stripped) from title+body checked as substrings in the corpus. **Strong / partial / weak** buckets at 35% / 18% / below.
4. **1:1 pairing table:** **Rank i** ↔ **i-th layout block** in DOM order: `LightHeroPhotoBackdrop`, `MidnightHeroPhotoBackdrop`, `Section` (nested-safe `</Section>` matching), `BookEndorsementsFeatured` (self-closing). Each block labeled by first `Display` or `Eyebrow`. **Sub-table length = min(claims, blocks).**

---
## Tab: home

**Mapped React files:**
- `src/app/(site)/page.tsx` → /

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 52 |
| Heuristic block count | 19 |
| Ordered layout spine blocks | 15 |
| 1:1 pairing depth for sub-table | 15 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 12 |
| Partial | 38 |
| Weak | 2 |

### 1:1 rank ↔ layout spine (first 15 of 52 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `C-POS01` — Movement infrastructure for a credibility-scarce age — not a website, not another SaaS | **/** · LightHeroPhotoBackdrop: The system for people who form others |
| 2 | `C-P01` — 68% of internet users now struggle to distinguish human-created from AI-generated content. | **/** · MidnightHeroPhotoBackdrop: The work is real. The system is missing. |
| 3 | `C-A01` — Scenius (Brian Eno's term for collaborative genius emerging from creative networks) is the primary m | **/** · Section: Formation without infrastructure doesn't scale |
| 4 | `C-SP04` — Network amplification multiplies reach 28×–500× — the five multiplier effects | **/** · Section: Who Movemental is for |
| 5 | `C-SP05` — Everything in one home — consolidation that surfaces and unifies the leader's existing credibility | **/** · Section: The real audience |
| 6 | `C-PR01` — Movemental is built by movement leaders, for movement leaders. | **/** · BookEndorsementsFeatured: Book endorsements rail |
| 7 | `C-A06` — This moment is different — AI's speed, the accelerating crisis, and the closing window | **/** · Section: A system for your entire body of work |
| 8 | `business-025` — The Convergence: Four Concepts That Demand Something New | **/** · Section: From scattered work to connected system |
| 9 | `C-P04` — Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church mu | **/** · Section: What this enables |
| 10 | `C-P03` — The false choice — traditional publisher or rental platform, both extractive, neither sustainable | **/** · Section: Not another tool |
| 11 | `C-POS06` — Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck | **/** · Section: Aligned economics |
| 12 | `C-T02` — Four things hold Movemental together and are non-negotiable. | **/** · Section: Built from real depth—not generic software ambition |
| 13 | `C-P02` — Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizatio | **/** · Section: Non-negotiables |
| 14 | `C-S30` — Alan Hirsch's core theological positioning, per the reflected understanding: 'You're called to react | **/** · Section: What everything is oriented around |
| 15 | `C-SP07` — The first cohort defines the brand — early leaders are co-creators, not customers | **/** · Section: If your work is meant to last, it needs a system |
| … | _Claims 16–52: no same-index layout block (argument list longer than layout spine)._ | |

### Claim-by-claim drift (all 52 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `C-POS01` | yes | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movement infrastructure for a credibility-scarce age — not a website, not another SaaS |
| 2 | `C-P01` | yes | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 68% of internet users now struggle to distinguish human-created from AI-generated content. |
| 3 | `C-A01` | yes | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Scenius (Brian Eno's term for collaborative genius emerging from creative networks) is the primary mechanism for credibility in the AI age. |
| 4 | `C-SP04` | yes | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Network amplification multiplies reach 28×–500× — the five multiplier effects |
| 5 | `C-SP05` | yes | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Everything in one home — consolidation that surfaces and unifies the leader's existing credibility |
| 6 | `C-PR01` | yes | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental is built by movement leaders, for movement leaders. |
| 7 | `C-A06` | yes | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** This moment is different — AI's speed, the accelerating crisis, and the closing window |
| 8 | `business-025` | yes | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Convergence: Four Concepts That Demand Something New |
| 9 | `C-P04` | yes | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church multiplication' may not land on Alan Hirsc… |
| 10 | `C-P03` | yes | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The false choice — traditional publisher or rental platform, both extractive, neither sustainable |
| 11 | `C-POS06` | yes | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck |
| 12 | `C-T02` | yes | 50% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Four things hold Movemental together and are non-negotiable. |
| 13 | `C-P02` | yes | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizations, teaching at 4 seminaries, and speaki… |
| 14 | `C-S30` | yes | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's core theological positioning, per the reflected understanding: 'You're called to reactivate what's latent. |
| 15 | `C-SP07` | yes | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The first cohort defines the brand — early leaders are co-creators, not customers |
| 16 | `business-018` | yes | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Revolutionary Pricing: $1,000 + 10% vs. Industry Standard |
| 17 | `C-AU01` | yes | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental looks for leaders who catalyze visible, verifiable movement (transformation that multiplies beyond direct oversight), not just pl… |
| 18 | `articles-035` | yes | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Uniform platform, distinct expression—one engine, different cars |
| 19 | `C-T01` | yes | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Christocentric spine — Jesus at the center is load-bearing, not decorative |
| 20 | `C-A08` | yes | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content that transforms vs. content that extracts — an ethical distinction |
| 21 | `C-A04` | yes | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The guide posture — authority comes from sustained grappling, not from having figured it out |
| 22 | `C-A02` | yes | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Credibility differs from influence — measurable but not reducible to a metric |
| 23 | `C-A10` | yes | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Scarcity is structural — curation at bounded scale is how trust, scenius, and movement survive |
| 24 | `articles-020` | yes | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI as furnace needs a hearth—not savior, not threat |
| 25 | `articles-054` | yes | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI amplifies both crisis and opportunity—credibility becomes central |
| 26 | `book-003` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Is an Anthropological Problem, Not a Technological One |
| 27 | `research-016` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's integrated intellectual architecture moves from Christology (who Christ is and what He inaugurated) through Missiology (the Ch… |
| 28 | `research-046` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, network, hybrid, digital, denominational, inde… |
| 29 | `research-002` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** A second major persona is the multiplication leader—church planters, bivocational pioneers, and network strategists who think in terms of re… |
| 30 | `business-007` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Credibility: Trust + Expertise + Character + Platform |
| 31 | `articles-049` |  | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Curation over growth—maintaining relational credibility at bounded scale |
| 32 | `articles-046` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Incoherence reads as instability—coherence is formation requirement |
| 33 | `research-001` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement leaders are seminary-trained reformers stuck between institution and mission |
| 34 | `research-041` |  | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movement leaders solve for multiplication and reproduction, not institutional sustainability |
| 35 | `articles-050` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental leaders include Alan Hirsch, Brad Brisco, and emerging voices |
| 36 | `research-022` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder preference: show that all these groups are served, without hierarchy in public copy. |
| 37 | `book-033` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Research on AI Trust and Credibility Crisis |
| 38 | `book-005` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Speed of Adoption and Dunning-Kruger With AI |
| 39 | `book-045` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Book as Companionship in Uncertainty |
| 40 | `business-003` |  | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Formation Crisis: Growth Over Substance |
| 41 | `research-003` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's engaged audience is measured at 50,000+ (confirmed through 150,000+ APEST assessments taken). |
| 42 | `articles-040` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The stakes are spiritual and generational, not just personal efficiency |
| 43 | `book-002` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Tension: Using the Tool That Created the Problem |
| 44 | `business-080` |  | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What Moves Movemental: Movement Multiplication, Not Profit Maximization |
| 45 | `articles-037` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Book—free knowledge spine establishing shared language |
| 46 | `articles-042` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content pipeline preview—demo of Movemental processing your work |
| 47 | `research-030` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Context matters: Western church fragmentation, AI disruption, and capacity gaps create urgent need |
| 48 | `research-048` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Founder preference: show work visible, not declare primary audience—let leaders choose whom to serve |
| 49 | `book-024` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** From Gutenberg to Networks of Trust |
| 50 | `articles-026` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Isolation makes structural problems feel normal |
| 51 | `research-023` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Org site purpose is to make work visible and legitimate as leaders sign up |
| 52 | `book-006` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Movement Leaders Were Right to Ignore SEO Until Now |

---
## Tab: movement leaders

**Mapped React files:**
- `src/app/(site)/movement-leaders/page.tsx` → /movement-leaders

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 56 |
| Heuristic block count | 11 |
| Ordered layout spine blocks | 9 |
| 1:1 pairing depth for sub-table | 9 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 20 |
| Partial | 34 |
| Weak | 2 |

### 1:1 rank ↔ layout spine (first 9 of 56 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `C-P04` — Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church mu | **/movement-leaders** · LightHeroPhotoBackdrop: For leaders whose work already moves through people |
| 2 | `C-BM01` — For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform  | **/movement-leaders** · Section: Your credibility is real. Online, it is fragmented. |
| 3 | `C-SP05` — Everything in one home — consolidation that surfaces and unifies the leader's existing credibility | **/movement-leaders** · Section: This page is for you if… |
| 4 | `research-029` — You remain the leader, not the operator—Movemental handles infrastructure so you focus on movement | **/movement-leaders** · Section: How qualification works |
| 5 | `C-P02` — Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizatio | **/movement-leaders** · Section: What you get |
| 6 | `C-SP04` — Network amplification multiplies reach 28×–500× — the five multiplier effects | **/movement-leaders** · Section: You are not meant to publish alone |
| 7 | `business-019` — Platform Ownership: Not Rental, Complete Control | **/movement-leaders** · Section: AI is an amplifier, not an author of your authority |
| 8 | `C-F05` — The movemental-analysis documents for multiple leaders identify the same opportunity: existing embod | **/movement-leaders** · Section: Aligned economics |
| 9 | `C-F01` — Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA | **/movement-leaders** · Section: If your work already carries weight, it should have infrastructure to match |
| … | _Claims 10–56: no same-index layout block (argument list longer than layout spine)._ | |

### Claim-by-claim drift (all 56 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `C-P04` | yes | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church multiplication' may not land on Alan Hirsc… |
| 2 | `C-BM01` | yes | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform ownership creates long-term asset buildi… |
| 3 | `C-SP05` | yes | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Everything in one home — consolidation that surfaces and unifies the leader's existing credibility |
| 4 | `research-029` | yes | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** You remain the leader, not the operator—Movemental handles infrastructure so you focus on movement |
| 5 | `C-P02` | yes | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizations, teaching at 4 seminaries, and speaki… |
| 6 | `C-SP04` | yes | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Network amplification multiplies reach 28×–500× — the five multiplier effects |
| 7 | `business-019` | yes | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Platform Ownership: Not Rental, Complete Control |
| 8 | `C-F05` | yes | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The movemental-analysis documents for multiple leaders identify the same opportunity: existing embodied work (talks, teaching, training) can… |
| 9 | `C-F01` | yes | 45% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA |
| 10 | `business-066` | yes | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Sustainable Content Creation: 5-Hour Week Model |
| 11 | `research-005` | yes | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes emphasize this clearly: movement leaders live under genuine time and attention constraints. |
| 12 | `articles-039` | yes | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Ownership is stewardship, not empire—responsibility, not dominance |
| 13 | `C-P01` | yes | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 68% of internet users now struggle to distinguish human-created from AI-generated content. |
| 14 | `C-SP07` | yes | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The first cohort defines the brand — early leaders are co-creators, not customers |
| 15 | `C-AU01` | yes | 44% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movemental looks for leaders who catalyze visible, verifiable movement (transformation that multiplies beyond direct oversight), not just pl… |
| 16 | `business-063` | yes | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 12-Week Onboarding: Platform Deployment + Voice Capture + Strategy |
| 17 | `research-018` | yes | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken through Hirsch's platforms, making it a sig… |
| 18 | `research-021` | yes | 35% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes state: 'Primary customer today: individual movement leaders (relationship/word-of-mouth is the real acquisition path). |
| 19 | `research-039` | yes | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Alan Hirsch opportunity analysis estimates $140K-$380K/year in additional revenue could be realized through: (1) scaled online courses o… |
| 20 | `research-001` | yes | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movement leaders are seminary-trained reformers stuck between institution and mission |
| 21 | `research-002` | yes | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** A second major persona is the multiplication leader—church planters, bivocational pioneers, and network strategists who think in terms of re… |
| 22 | `articles-030` | yes | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Lab with context awareness from personality to formation goals |
| 23 | `business-032` |  | 49% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 22 Specialized AI Agents Trained on Movemental Theology |
| 24 | `book-004` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Adaptive Leadership as the Response to AI |
| 25 | `articles-032` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Assessment engine for APEST, mDNA, maturity, vocational calling |
| 26 | `research-025` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Alan Hirsch opportunity analysis identifies: '150,000+ APEST assessment takers currently leave after seeing results. |
| 27 | `research-034` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For Alan Hirsch specifically, but applicable to others: content already exists (38+ videos) across 20+ third-party platforms (conference rec… |
| 28 | `research-046` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, network, hybrid, digital, denominational, inde… |
| 29 | `articles-013` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Eight-week formation scaffold with four non-negotiable necessities |
| 30 | `articles-017` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Evergreen article architecture with nine sections and voice markers |
| 31 | `business-029` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Execution Path: 100-Leader Scenius Network |
| 32 | `book-010` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Experimentation as Prerequisite to Discernment |
| 33 | `business-009` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Formation Must Accompany Amplification |
| 34 | `articles-046` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Incoherence reads as instability—coherence is formation requirement |
| 35 | `book-037` |  | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Leaders Don't Need Technical Expertise to Lead With AI |
| 36 | `research-035` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Missing audiobooks as revenue and access stream—most flagship titles have no audio version |
| 37 | `research-027` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder clarifies: archetypes mentioned (Alan Hirsch, Brad Brisco) are not just 'authors and speakers'—definition is broader. |
| 38 | `research-041` |  | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movement leaders solve for multiplication and reproduction, not institutional sustainability |
| 39 | `articles-015` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Pathways as formation journeys, not topic pages |
| 40 | `business-077` |  | 44% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Qualification Gate: mDNA Foundation Required |
| 41 | `business-078` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Qualification Gate: Visible Movement Impact Required |
| 42 | `articles-038` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Recommended learning journey: spiral through five theological portals |
| 43 | `articles-027` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Repurposing existing work into articles is legitimate and necessary |
| 44 | `research-033` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Social-to-email conversion is leaving 70-80% of audience on the table |
| 45 | `research-003` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's engaged audience is measured at 50,000+ (confirmed through 150,000+ APEST assessments taken). |
| 46 | `business-031` |  | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Three-Layer Maturity Model: mDNA > Leadership > Content |
| 47 | `research-008` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The reflected-understanding analysis for Alan Hirsch flags: 'Your content is not translated into key languages—including those with large po… |
| 48 | `book-016` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What AI Displaces: Relationship, Prayer, Embodiment, Presence, Formation |
| 49 | `business-060` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Community Features: Comments, Forums, Member Directories |
| 50 | `articles-026` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Isolation makes structural problems feel normal |
| 51 | `book-043` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Look for Love: Markers of Credible AI Guidance |
| 52 | `book-042` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Permission to Stay at Experimentation Level |
| 53 | `business-071` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Speaking and Consulting Booking Integration |
| 54 | `book-034` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Expertise Is Hard-Won and Worth Preserving |
| 55 | `book-006` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Movement Leaders Were Right to Ignore SEO Until Now |
| 56 | `research-040` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Women are 18% of 146 scored movement leader candidates—gender gap in visibility and network |

---
## Tab: churches nonprofits

**Mapped React files:**
- `src/app/(site)/churches/page.tsx` → /churches
- `src/app/(site)/nonprofits/page.tsx` → /nonprofits

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 48 |
| Heuristic block count | 22 |
| Ordered layout spine blocks | 20 |
| 1:1 pairing depth for sub-table | 20 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 24 |
| Partial | 24 |
| Weak | 0 |

### 1:1 rank ↔ layout spine (first 20 of 48 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `C-F09` — For organizational partners (nonprofits, churches, denominations), Movemental offers five modular sy | **/churches** · Section: Your church does not need more content. It needs a formation system. |
| 2 | `C-T03` — Embodied ministry cannot be automated — digital supports presence, never replaces it | **/churches** · Section: (no Display/Eyebrow in block) |
| 3 | `C-A05` — Refusal as love — what AI must not do, framed as protection of the sacred | **/churches** · Section: Sunday content is not the same thing as ongoing formation |
| 4 | `research-030` — Context matters: Western church fragmentation, AI disruption, and capacity gaps create urgent need | **/churches** · Section: What churches need now |
| 5 | `C-T02` — Four things hold Movemental together and are non-negotiable. | **/churches** · Section: What Movemental makes possible |
| 6 | `book-015` — What Churches Are Free (and Obligated) to Do | **/churches** · Section: Formation over growth is not a slogan here |
| 7 | `C-T01` — The Christocentric spine — Jesus at the center is load-bearing, not decorative | **/churches** · Section: How AI can serve a church responsibly |
| 8 | `C-F10` — Five-stage AI maturity model — from native awareness to mature public leadership | **/churches** · Section: Usefulness without surrender |
| 9 | `business-080` — What Moves Movemental: Movement Multiplication, Not Profit Maximization | **/churches** · Section: This is best for churches that… |
| 10 | `C-POS01` — Movement infrastructure for a credibility-scarce age — not a website, not another SaaS | **/churches** · Section: If your church wants to form people more intentionally, the system matters |
| 11 | `C-F05` — The movemental-analysis documents for multiple leaders identify the same opportunity: existing embod | **/nonprofits** · LightHeroPhotoBackdrop: Turn your mission into a system people can actually move through |
| 12 | `business-001` — Technology Properly Ordered to Serve Mission | **/nonprofits** · Section: We install the systems your organization should already have—but often does not |
| 13 | `research-036` — Exponential, Verge, and Missio Alliance events: movement leader ecosystem is visible and organized | **/nonprofits** · Section: Most nonprofit digital stacks were not built for formation |
| 14 | `research-022` — The founder preference: show that all these groups are served, without hierarchy in public copy. | **/nonprofits** · Section: You do not need more content production |
| 15 | `articles-013` — Eight-week formation scaffold with four non-negotiable necessities | **/nonprofits** · Section: A connected system for mission-shaped organizations |
| 16 | `C-P01` — 68% of internet users now struggle to distinguish human-created from AI-generated content. | **/nonprofits** · Section: Formation and sustainability are not separate problems |
| 17 | `C-A08` — Content that transforms vs. content that extracts — an ethical distinction | **/nonprofits** · Section: Not another tool in the stack |
| 18 | `C-T10` — Future vision — AI becomes a trusted knowledge graph and ministry companion | **/nonprofits** · Section: AI that serves your mission, not generic automation |
| 19 | `business-009` — Formation Must Accompany Amplification | **/nonprofits** · Section: Best fit for organizations that… |
| 20 | `research-046` — A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, networ | **/nonprofits** · Section: If your mission depends on people changing over time, you need more than a website |
| … | _Claims 21–48: no same-index layout block (argument list longer than layout spine)._ | |

### Claim-by-claim drift (all 48 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `C-F09` | yes | 49% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** For organizational partners (nonprofits, churches, denominations), Movemental offers five modular system builds. |
| 2 | `C-T03` | yes | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Embodied ministry cannot be automated — digital supports presence, never replaces it |
| 3 | `C-A05` | yes | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Refusal as love — what AI must not do, framed as protection of the sacred |
| 4 | `research-030` | yes | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Context matters: Western church fragmentation, AI disruption, and capacity gaps create urgent need |
| 5 | `C-T02` | yes | 45% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Four things hold Movemental together and are non-negotiable. |
| 6 | `book-015` | yes | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What Churches Are Free (and Obligated) to Do |
| 7 | `C-T01` | yes | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Christocentric spine — Jesus at the center is load-bearing, not decorative |
| 8 | `C-F10` | yes | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Five-stage AI maturity model — from native awareness to mature public leadership |
| 9 | `business-080` | yes | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What Moves Movemental: Movement Multiplication, Not Profit Maximization |
| 10 | `C-POS01` | yes | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movement infrastructure for a credibility-scarce age — not a website, not another SaaS |
| 11 | `C-F05` | yes | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The movemental-analysis documents for multiple leaders identify the same opportunity: existing embodied work (talks, teaching, training) can… |
| 12 | `business-001` | yes | 57% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Technology Properly Ordered to Serve Mission |
| 13 | `research-036` | yes | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Exponential, Verge, and Missio Alliance events: movement leader ecosystem is visible and organized |
| 14 | `research-022` | yes | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder preference: show that all these groups are served, without hierarchy in public copy. |
| 15 | `articles-013` | yes | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Eight-week formation scaffold with four non-negotiable necessities |
| 16 | `C-P01` | yes | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 68% of internet users now struggle to distinguish human-created from AI-generated content. |
| 17 | `C-A08` | yes | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content that transforms vs. content that extracts — an ethical distinction |
| 18 | `C-T10` | yes | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Future vision — AI becomes a trusted knowledge graph and ministry companion |
| 19 | `business-009` | yes | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Formation Must Accompany Amplification |
| 20 | `research-046` | yes | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, network, hybrid, digital, denominational, inde… |
| 21 | `C-A01` |  | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Scenius (Brian Eno's term for collaborative genius emerging from creative networks) is the primary mechanism for credibility in the AI age. |
| 22 | `C-BM01` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform ownership creates long-term asset buildi… |
| 23 | `C-SP05` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Everything in one home — consolidation that surfaces and unifies the leader's existing credibility |
| 24 | `C-AU01` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental looks for leaders who catalyze visible, verifiable movement (transformation that multiplies beyond direct oversight), not just pl… |
| 25 | `C-P03` |  | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The false choice — traditional publisher or rental platform, both extractive, neither sustainable |
| 26 | `C-A06` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** This moment is different — AI's speed, the accelerating crisis, and the closing window |
| 27 | `C-POS06` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck |
| 28 | `C-A10` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Scarcity is structural — curation at bounded scale is how trust, scenius, and movement survive |
| 29 | `C-F01` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA |
| 30 | `book-004` |  | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Adaptive Leadership as the Response to AI |
| 31 | `research-025` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Alan Hirsch opportunity analysis identifies: '150,000+ APEST assessment takers currently leave after seeing results. |
| 32 | `articles-047` |  | 49% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Communitas through shared risk and mission, not comfort |
| 33 | `articles-017` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Evergreen article architecture with nine sections and voice markers |
| 34 | `research-027` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder clarifies: archetypes mentioned (Alan Hirsch, Brad Brisco) are not just 'authors and speakers'—definition is broader. |
| 35 | `research-041` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movement leaders solve for multiplication and reproduction, not institutional sustainability |
| 36 | `articles-015` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Pathways as formation journeys, not topic pages |
| 37 | `business-066` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Sustainable Content Creation: 5-Hour Week Model |
| 38 | `business-025` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Convergence: Four Concepts That Demand Something New |
| 39 | `business-003` |  | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Formation Crisis: Growth Over Substance |
| 40 | `articles-040` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The stakes are spiritual and generational, not just personal efficiency |
| 41 | `articles-035` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Uniform platform, distinct expression—one engine, different cars |
| 42 | `business-058` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What Breaks Company If Ignored: Five Non-Negotiables |
| 43 | `business-033` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content Management System with Real-Time Collaborative Editing |
| 44 | `business-083` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Continuous Learning: Improvement Built Into Culture |
| 45 | `business-035` |  | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Learning Management System: Courses with Progress Tracking and Certificates |
| 46 | `articles-055` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Multi-language support—books, articles, and AI in Spanish, Portuguese, etc. |
| 47 | `business-089` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Partnership Pathways: Institutional + Relational |
| 48 | `book-006` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Movement Leaders Were Right to Ignore SEO Until Now |

---
## Tab: how it works

**Mapped React files:**
- `src/app/(site)/how-it-works/page.tsx` → /how-it-works

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 90 |
| Heuristic block count | 11 |
| Ordered layout spine blocks | 9 |
| 1:1 pairing depth for sub-table | 9 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 4 |
| Partial | 67 |
| Weak | 19 |

### 1:1 rank ↔ layout spine (first 9 of 90 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `articles-013` — Eight-week formation scaffold with four non-negotiable necessities | **/how-it-works** · LightHeroPhotoBackdrop: From scattered work to connected system |
| 2 | `book-018` — The 70/30 Rule: Sustainable Content Creation Model | **/how-it-works** · Section: (no Display/Eyebrow in block) |
| 3 | `C-F01` — Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA | **/how-it-works** · Section: What Movemental can work with |
| 4 | `business-032` — 22 Specialized AI Agents Trained on Movemental Theology | **/how-it-works** · Section: What it becomes |
| 5 | `articles-017` — Evergreen article architecture with nine sections and voice markers | **/how-it-works** · Section: AI inside the system, not bolted onto it |
| 6 | `C-PR02` — Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user  | **/how-it-works** · Section: Built for formation, not just information |
| 7 | `articles-019` — AI used as editing gate, not content creator | **/how-it-works** · Section: Organizations can start small |
| 8 | `C-A03` — Amplification, not replacement — the AI control boundary for voice, insight, and authority | **/how-it-works** · Section: More than a stack of tools |
| 9 | `C-F05` — The movemental-analysis documents for multiple leaders identify the same opportunity: existing embod | **/how-it-works** · Section: If the work is already there, the next question is the system |
| … | _Claims 10–90: no same-index layout block (argument list longer than layout spine)._ | |

### Claim-by-claim drift (all 90 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `articles-013` | yes | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Eight-week formation scaffold with four non-negotiable necessities |
| 2 | `book-018` | yes | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The 70/30 Rule: Sustainable Content Creation Model |
| 3 | `C-F01` | yes | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA |
| 4 | `business-032` | yes | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 22 Specialized AI Agents Trained on Movemental Theology |
| 5 | `articles-017` | yes | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Evergreen article architecture with nine sections and voice markers |
| 6 | `C-PR02` | yes | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user management, content, media, e-commerce,… |
| 7 | `articles-019` | yes | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI used as editing gate, not content creator |
| 8 | `C-A03` | yes | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Amplification, not replacement — the AI control boundary for voice, insight, and authority |
| 9 | `C-F05` | yes | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The movemental-analysis documents for multiple leaders identify the same opportunity: existing embodied work (talks, teaching, training) can… |
| 10 | `articles-015` | yes | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Pathways as formation journeys, not topic pages |
| 11 | `articles-030` | yes | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Lab with context awareness from personality to formation goals |
| 12 | `C-F10` | yes | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Five-stage AI maturity model — from native awareness to mature public leadership |
| 13 | `articles-025` | yes | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Corpus extraction to calibrate AI voice—not guessing, measuring |
| 14 | `articles-052` | yes | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Voice fidelity scoring for AI-drafted content |
| 15 | `business-049` | yes | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Voice Baseline System: Fingerprinting and Consistency |
| 16 | `articles-016` | yes | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Pillar-cluster architecture for topical authority and AI citation |
| 17 | `articles-018` | yes | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** GEO (Generative Engine Optimization) complements SEO |
| 18 | `articles-034` | yes | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** EEAT as the foundation for discoverability in search and AI |
| 19 | `articles-032` | yes | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Assessment engine for APEST, mDNA, maturity, vocational calling |
| 20 | `C-F09` | yes | 49% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** For organizational partners (nonprofits, churches, denominations), Movemental offers five modular system builds. |
| 21 | `C-F03` | yes | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Multi-tenant platform architecture — one codebase serves many leader sites |
| 22 | `business-045` | yes | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Movemental Can Underprice: AI-Powered Development Cost Curve |
| 23 | `C-A01` | yes | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Scenius (Brian Eno's term for collaborative genius emerging from creative networks) is the primary mechanism for credibility in the AI age. |
| 24 | `book-035` | yes | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Type-Safety Chain as Technical Alignment With Values |
| 25 | `business-063` | yes | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 12-Week Onboarding: Platform Deployment + Voice Capture + Strategy |
| 26 | `articles-048` | yes | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 30/60/90 day plan and commissioning liturgy—sending, not graduation |
| 27 | `articles-011` | yes | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Formation goals and spiritual discernment tracking—unique to Movemental |
| 28 | `business-031` | yes | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Three-Layer Maturity Model: mDNA > Leadership > Content |
| 29 | `C-A07` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Slowing down as resistance — AI can enable pace, not just acceleration |
| 30 | `C-S30` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch's core theological positioning, per the reflected understanding: 'You're called to reactivate what's latent. |
| 31 | `C-A06` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** This moment is different — AI's speed, the accelerating crisis, and the closing window |
| 32 | `C-A05` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Refusal as love — what AI must not do, framed as protection of the sacred |
| 33 | `C-PR04` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional work) demonstrated in practice the frame… |
| 34 | `articles-020` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI as furnace needs a hearth—not savior, not threat |
| 35 | `research-025` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Alan Hirsch opportunity analysis identifies: '150,000+ APEST assessment takers currently leave after seeing results. |
| 36 | `research-034` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For Alan Hirsch specifically, but applicable to others: content already exists (38+ videos) across 20+ third-party platforms (conference rec… |
| 37 | `business-069` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content Strategy Framework: Five Narrative Frames |
| 38 | `articles-049` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Curation over growth—maintaining relational credibility at bounded scale |
| 39 | `business-029` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Execution Path: 100-Leader Scenius Network |
| 40 | `book-010` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Experimentation as Prerequisite to Discernment |
| 41 | `business-042` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Go-To-Market: Invitation-Only, Relationship-Based Growth |
| 42 | `business-081` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Iterative Roadmap: Feedback-Driven, Not Feature-Driven |
| 43 | `book-037` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Leaders Don't Need Technical Expertise to Lead With AI |
| 44 | `business-088` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Metrics and Signals: What Success Actually Looks Like |
| 45 | `research-035` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Missing audiobooks as revenue and access stream—most flagship titles have no audio version |
| 46 | `business-016` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** MVP Definition: Core Value Over Feature Completeness |
| 47 | `business-077` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Qualification Gate: mDNA Foundation Required |
| 48 | `business-078` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Qualification Gate: Visible Movement Impact Required |
| 49 | `articles-038` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Recommended learning journey: spiral through five theological portals |
| 50 | `articles-027` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Repurposing existing work into articles is legitimate and necessary |
| 51 | `business-072` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Risk: Network Effects Don't Materialize |
| 52 | `business-073` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Risk: Quality Decline as Network Expands |
| 53 | `business-041` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Security and Compliance: HTTPS, Encryption, RBAC, GDPR-Ready |
| 54 | `business-066` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Sustainable Content Creation: 5-Hour Week Model |
| 55 | `book-013` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Theological Integrity as Non-Negotiable in Christian Content |
| 56 | `research-008` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The reflected-understanding analysis for Alan Hirsch flags: 'Your content is not translated into key languages—including those with large po… |
| 57 | `book-012` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Transparency as Trust Signal and Credibility Protection |
| 58 | `business-059` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Transparent Relationships: Network Verification Visible and Traceable |
| 59 | `articles-035` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Uniform platform, distinct expression—one engine, different cars |
| 60 | `book-015` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What Churches Are Free (and Obligated) to Do |
| 61 | `C-T10` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Future vision — AI becomes a trusted knowledge graph and ministry companion |
| 62 | `C-A09` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Specialized agents preserve voice; generic AI homogenizes |
| 63 | `articles-037` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Book—free knowledge spine establishing shared language |
| 64 | `business-038` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Analytics: Real-Time Performance Tracking Across All Content |
| 65 | `research-049` |  | 45% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Before launching a leader on Movemental, a thoughtful onboarding should assess: (1) content maturity (how much existing content is there to… |
| 66 | `articles-033` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Certificate system with verification codes and continuing education credits |
| 67 | `articles-044` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Codification without compromise—making patterns transmissible |
| 68 | `business-060` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Community Features: Comments, Forums, Member Directories |
| 69 | `research-047` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes: 'For movement leaders, approval of AI-affected public voice is anchored in the leader (and their process)—detail TBD when… |
| 70 | `articles-029` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content length: depth determined by intent, not arbitrary word count |
| 71 | `business-033` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content Management System with Real-Time Collaborative Editing |
| 72 | `articles-042` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content pipeline preview—demo of Movemental processing your work |
| 73 | `book-040` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Context and Personalization as Required for Formation Work |
| 74 | `business-037` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Digital Bookstore with Stripe Integration |
| 75 | `articles-036` |  | 52% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Formation Companion in courses—AI that knows the lesson, the week, the learner's context |
| 76 | `research-037` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The current org-site manifesto mentions 'Infrastructure: Notion + AI' but the founder notes flag this as a placeholder example, not a commit… |
| 77 | `business-043` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Geographic Expansion: English Markets First, Then Multi-Language |
| 78 | `business-079` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Global Expansion: 10-20 Year Horizon |
| 79 | `business-035` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Learning Management System: Courses with Progress Tracking and Certificates |
| 80 | `articles-055` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Multi-language support—books, articles, and AI in Spanish, Portuguese, etc. |
| 81 | `business-086` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Operational Scaling: Team Expansion With Network |
| 82 | `business-089` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Partnership Pathways: Institutional + Relational |
| 83 | `book-042` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Permission to Stay at Experimentation Level |
| 84 | `book-044` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Prompting as Humane Communication, Not Prompt Engineering |
| 85 | `business-055` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Quality Assurance Standards: 95% + 90% + 95% |
| 86 | `business-034` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Semantic Search and Cross-Platform Discovery |
| 87 | `business-071` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Speaking and Consulting Booking Integration |
| 88 | `business-036` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Video Streaming with Progress Tracking and Series Organization |
| 89 | `business-082` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** API and Third-Party Integrations (Post-MVP) |
| 90 | `business-065` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Five User Roles with Permission Levels |

---
## Tab: proof about

**Mapped React files:**
- `src/app/(site)/about/page.tsx` → /about
- `src/app/(site)/evidence/page.tsx` → /evidence
- `src/app/(site)/case-studies/page.tsx` → /case-studies

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 64 |
| Heuristic block count | 26 |
| Ordered layout spine blocks | 26 |
| 1:1 pairing depth for sub-table | 26 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 32 |
| Partial | 31 |
| Weak | 1 |

### 1:1 rank ↔ layout spine (first 26 of 64 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `C-PR01` — Movemental is built by movement leaders, for movement leaders. | **/about** · Section: Built for work that is meant to form people, not just attract attention |
| 2 | `C-PR02` — Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user  | **/about** · Section: Why Movemental had to exist |
| 3 | `research-018` — Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken thr | **/about** · Section: (no Display/Eyebrow in block) |
| 4 | `C-PR04` — The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional  | **/about** · Section: What holds Movemental together |
| 5 | `research-017` — Michael Frost and Alan Hirsch co-authored 'The Shaping of Things to Come' (2003), which introduced t | **/about** · Section: Not a manifesto. Not a growth machine. |
| 6 | `research-020` — Movement leader cohort is academically credible and seminary-integrated | **/about** · Section: What Movemental is — and is not |
| 7 | `C-T02` — Four things hold Movemental together and are non-negotiable. | **/about** · Section: Who Movemental serves |
| 8 | `C-A04` — The guide posture — authority comes from sustained grappling, not from having figured it out | **/about** · Section: Why trust it |
| 9 | `research-019` — Rick Warren's 'The Purpose Driven Life' has sold 30+ million copies in 85+ languages, making it one  | **/about** · Section: Who is building this |
| 10 | `research-050` — Alan Hirsch's network isn't scattered—it's coherent. | **/about** · Section: If the work matters, the infrastructure matters too |
| 11 | `C-T01` — The Christocentric spine — Jesus at the center is load-bearing, not decorative | **/evidence** · Section: The case that Movemental is real |
| 12 | `C-T03` — Embodied ministry cannot be automated — digital supports presence, never replaces it | **/evidence** · Section: (no Display/Eyebrow in block) |
| 13 | `research-036` — Exponential, Verge, and Missio Alliance events: movement leader ecosystem is visible and organized | **/evidence** · Section: The short version |
| 14 | `book-003` — AI Is an Anthropological Problem, Not a Technological One | **/evidence** · Section: Compared with assembled stacks, the product is unusually integrated |
| 15 | `C-A03` — Amplification, not replacement — the AI control boundary for voice, insight, and authority | **/evidence** · Section: What &ldquo;integrated&rdquo; means in practice |
| 16 | `business-075` — Economic Justice: Fair Exchange, Not Extraction | **/evidence** · Section: The AI advantage is not "we added a chatbot" |
| 17 | `C-A11` — Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing | **/evidence** · Section: (no Display/Eyebrow in block) |
| 18 | `business-058` — What Breaks Company If Ignored: Five Non-Negotiables | **/evidence** · Section: Architecturally, this is a real platform |
| 19 | `book-045` — The Book as Companionship in Uncertainty | **/evidence** · Section: Why this evidence matters |
| 20 | `book-021` — Not a Technical Manual, Manifesto, or Sales Pitch | **/evidence** · Section: How we state claims |
| 21 | `C-A08` — Content that transforms vs. content that extracts — an ethical distinction | **/evidence** · Section: What is still being built |
| 22 | `research-038` — Founder insight: manifesto may be low-trust slop—candidate for rewrite or demotion | **/evidence** · Section: The question is no longer whether the infrastructure can exist |
| 23 | `book-049` — The Three-Section Structure: Crisis, Response, Demonstration | **/case-studies** · Section: Real work. Real formation. Real outcomes. |
| 24 | `C-A07` — Slowing down as resistance — AI can enable pace, not just acceleration | **/case-studies** · Section: (no Display/Eyebrow in block) |
| 25 | `C-A05` — Refusal as love — what AI must not do, framed as protection of the sacred | **/case-studies** · Section: Story previews |
| 26 | `book-004` — Adaptive Leadership as the Response to AI | **/case-studies** · Section: Want to be a case study? |
| … | _Claims 27–64: no same-index layout block (argument list longer than layout spine)._ | |

### Claim-by-claim drift (all 64 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `C-PR01` | yes | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movemental is built by movement leaders, for movement leaders. |
| 2 | `C-PR02` | yes | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user management, content, media, e-commerce,… |
| 3 | `research-018` | yes | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken through Hirsch's platforms, making it a sig… |
| 4 | `C-PR04` | yes | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional work) demonstrated in practice the frame… |
| 5 | `research-017` | yes | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Michael Frost and Alan Hirsch co-authored 'The Shaping of Things to Come' (2003), which introduced the mDNA (missional DNA) framework and be… |
| 6 | `research-020` | yes | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement leader cohort is academically credible and seminary-integrated |
| 7 | `C-T02` | yes | 59% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Four things hold Movemental together and are non-negotiable. |
| 8 | `C-A04` | yes | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The guide posture — authority comes from sustained grappling, not from having figured it out |
| 9 | `research-019` | yes | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Rick Warren's 'The Purpose Driven Life' has sold 30+ million copies in 85+ languages, making it one of the best-selling books in history. |
| 10 | `research-050` | yes | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch's network isn't scattered—it's coherent. |
| 11 | `C-T01` | yes | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Christocentric spine — Jesus at the center is load-bearing, not decorative |
| 12 | `C-T03` | yes | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Embodied ministry cannot be automated — digital supports presence, never replaces it |
| 13 | `research-036` | yes | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Exponential, Verge, and Missio Alliance events: movement leader ecosystem is visible and organized |
| 14 | `book-003` | yes | 50% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI Is an Anthropological Problem, Not a Technological One |
| 15 | `C-A03` | yes | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Amplification, not replacement — the AI control boundary for voice, insight, and authority |
| 16 | `business-075` | yes | 55% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Economic Justice: Fair Exchange, Not Extraction |
| 17 | `C-A11` | yes | 44% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing |
| 18 | `business-058` | yes | 49% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What Breaks Company If Ignored: Five Non-Negotiables |
| 19 | `book-045` | yes | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Book as Companionship in Uncertainty |
| 20 | `book-021` | yes | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Not a Technical Manual, Manifesto, or Sales Pitch |
| 21 | `C-A08` | yes | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content that transforms vs. content that extracts — an ethical distinction |
| 22 | `research-038` | yes | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Founder insight: manifesto may be low-trust slop—candidate for rewrite or demotion |
| 23 | `book-049` | yes | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Three-Section Structure: Crisis, Response, Demonstration |
| 24 | `C-A07` |  | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Slowing down as resistance — AI can enable pace, not just acceleration |
| 25 | `C-A05` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Refusal as love — what AI must not do, framed as protection of the sacred |
| 26 | `book-004` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Adaptive Leadership as the Response to AI |
| 27 | `articles-054` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI amplifies both crisis and opportunity—credibility becomes central |
| 28 | `business-076` |  | 46% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Built on Movemental Theology: APEST, mDNA, Incarnational Mission |
| 29 | `research-016` |  | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch's integrated intellectual architecture moves from Christology (who Christ is and what He inaugurated) through Missiology (the Ch… |
| 30 | `research-046` |  | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, network, hybrid, digital, denominational, inde… |
| 31 | `articles-047` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Communitas through shared risk and mission, not comfort |
| 32 | `business-009` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Formation Must Accompany Amplification |
| 33 | `business-088` |  | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Metrics and Signals: What Success Actually Looks Like |
| 34 | `research-041` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement leaders solve for multiplication and reproduction, not institutional sustainability |
| 35 | `articles-050` |  | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movemental leaders include Alan Hirsch, Brad Brisco, and emerging voices |
| 36 | `articles-039` |  | 45% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Ownership is stewardship, not empire—responsibility, not dominance |
| 37 | `book-031` |  | 57% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Relationship as Non-Negotiable Foundation |
| 38 | `book-033` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Research on AI Trust and Credibility Crisis |
| 39 | `business-041` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Security and Compliance: HTTPS, Encryption, RBAC, GDPR-Ready |
| 40 | `book-005` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Speed of Adoption and Dunning-Kruger With AI |
| 41 | `business-001` |  | 57% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Technology Properly Ordered to Serve Mission |
| 42 | `business-025` |  | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Convergence: Four Concepts That Demand Something New |
| 43 | `articles-040` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The stakes are spiritual and generational, not just personal efficiency |
| 44 | `book-002` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Tension: Using the Tool That Created the Problem |
| 45 | `book-013` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Theological Integrity as Non-Negotiable in Christian Content |
| 46 | `book-012` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Transparency as Trust Signal and Credibility Protection |
| 47 | `book-016` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What AI Displaces: Relationship, Prayer, Embodiment, Presence, Formation |
| 48 | `book-015` |  | 35% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What Churches Are Free (and Obligated) to Do |
| 49 | `business-080` |  | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What Moves Movemental: Movement Multiplication, Not Profit Maximization |
| 50 | `C-T10` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Future vision — AI becomes a trusted knowledge graph and ministry companion |
| 51 | `articles-044` |  | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Codification without compromise—making patterns transmissible |
| 52 | `research-047` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder notes: 'For movement leaders, approval of AI-affected public voice is anchored in the leader (and their process)—detail TBD when… |
| 53 | `book-040` |  | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Context and Personalization as Required for Formation Work |
| 54 | `business-083` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Continuous Learning: Improvement Built Into Culture |
| 55 | `research-048` |  | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Founder preference: show work visible, not declare primary audience—let leaders choose whom to serve |
| 56 | `research-037` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The current org-site manifesto mentions 'Infrastructure: Notion + AI' but the founder notes flag this as a placeholder example, not a commit… |
| 57 | `book-024` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** From Gutenberg to Networks of Trust |
| 58 | `book-043` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Look for Love: Markers of Credible AI Guidance |
| 59 | `research-010` |  | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movemental is not a publishing house or SaaS—it's a venture-builder studio with aligned incentives |
| 60 | `research-023` |  | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Org site purpose is to make work visible and legitimate as leaders sign up |
| 61 | `book-047` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Theological Anthropology: What Happens to Human Vocation in an AI Age |
| 62 | `book-035` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Type-Safety Chain as Technical Alignment With Values |
| 63 | `book-034` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Expertise Is Hard-Won and Worth Preserving |
| 64 | `research-040` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Women are 18% of 146 scored movement leader candidates—gender gap in visibility and network |

---
## Tab: pricing faq

**Mapped React files:**
- `src/app/(site)/pricing/page.tsx` → /pricing
- `src/app/(site)/faq/page.tsx` → /faq

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 20 |
| Heuristic block count | 12 |
| Ordered layout spine blocks | 12 |
| 1:1 pairing depth for sub-table | 12 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 14 |
| Partial | 6 |
| Weak | 0 |

### 1:1 rank ↔ layout spine (first 12 of 20 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `business-018` — Revolutionary Pricing: $1,000 + 10% vs. Industry Standard | **/pricing** · Section: Aligned economics, not extraction |
| 2 | `C-BM01` — For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform  | **/pricing** · Section: Two ways to work with Movemental |
| 3 | `business-051` — vs. Traditional Publishers: Ownership + Speed + Economics | **/pricing** · Section: You keep 90%. Movemental takes 10%. |
| 4 | `business-052` — vs. Digital Platforms (Substack/Patreon): Ownership Matters | **/pricing** · Section: Economics in one view |
| 5 | `business-053` — vs. WordPress/Squarespace: Network Effects | **/pricing** · Section: Why this model is different |
| 6 | `business-054` — vs. Custom Development: Speed, Cost, Network | **/pricing** · Section: Focused 4-week builds |
| 7 | `C-POS06` — Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck | **/pricing** · Section: How engagement works |
| 8 | `business-019` — Platform Ownership: Not Rental, Complete Control | **/pricing** · Section: What you are paying for |
| 9 | `C-A11` — Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing | **/pricing** · Section: If the work matters, the economics should make sense |
| 10 | `C-A10` — Scarcity is structural — curation at bounded scale is how trust, scenius, and movement survive | **/faq** · Section: Everything you'd want to ask before engaging |
| 11 | `business-075` — Economic Justice: Fair Exchange, Not Extraction | **/faq** · Section: (no Display/Eyebrow in block) |
| 12 | `C-P03` — The false choice — traditional publisher or rental platform, both extractive, neither sustainable | **/faq** · Section: Still have questions? |
| … | _Claims 13–20: no same-index layout block (argument list longer than layout spine)._ | |

### Claim-by-claim drift (all 20 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `business-018` | yes | 70% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Revolutionary Pricing: $1,000 + 10% vs. Industry Standard |
| 2 | `C-BM01` | yes | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform ownership creates long-term asset buildi… |
| 3 | `business-051` | yes | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. Traditional Publishers: Ownership + Speed + Economics |
| 4 | `business-052` | yes | 58% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. Digital Platforms (Substack/Patreon): Ownership Matters |
| 5 | `business-053` | yes | 61% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. WordPress/Squarespace: Network Effects |
| 6 | `business-054` | yes | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. Custom Development: Speed, Cost, Network |
| 7 | `C-POS06` | yes | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck |
| 8 | `business-019` | yes | 65% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Platform Ownership: Not Rental, Complete Control |
| 9 | `C-A11` | yes | 52% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing |
| 10 | `C-A10` | yes | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Scarcity is structural — curation at bounded scale is how trust, scenius, and movement survive |
| 11 | `business-075` | yes | 61% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Economic Justice: Fair Exchange, Not Extraction |
| 12 | `C-P03` | yes | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The false choice — traditional publisher or rental platform, both extractive, neither sustainable |
| 13 | `business-045` | yes | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Why Movemental Can Underprice: AI-Powered Development Cost Curve |
| 14 | `business-042` | yes | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Go-To-Market: Invitation-Only, Relationship-Based Growth |
| 15 | `research-039` | yes | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Alan Hirsch opportunity analysis estimates $140K-$380K/year in additional revenue could be realized through: (1) scaled online courses o… |
| 16 | `research-021` | yes | 44% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder notes state: 'Primary customer today: individual movement leaders (relationship/word-of-mouth is the real acquisition path). |
| 17 | `C-A02` | yes | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Credibility differs from influence — measurable but not reducible to a metric |
| 18 | `business-007` | yes | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Credibility: Trust + Expertise + Character + Platform |
| 19 | `research-010` |  | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movemental is not a publishing house or SaaS—it's a venture-builder studio with aligned incentives |
| 20 | `book-006` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Movement Leaders Were Right to Ignore SEO Until Now |

---
## Tab: about

**Mapped React files:**
- `src/app/(site)/about/page.tsx` → /about

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 173 |
| Heuristic block count | 10 |
| Ordered layout spine blocks | 10 |
| 1:1 pairing depth for sub-table | 10 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 20 |
| Partial | 130 |
| Weak | 23 |

### 1:1 rank ↔ layout spine (first 10 of 173 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `C-PR01` — Movemental is built by movement leaders, for movement leaders. | **/about** · Section: Built for work that is meant to form people, not just attract attention |
| 2 | `C-PR02` — Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user  | **/about** · Section: Why Movemental had to exist |
| 3 | `research-018` — Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken thr | **/about** · Section: (no Display/Eyebrow in block) |
| 4 | `C-PR04` — The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional  | **/about** · Section: What holds Movemental together |
| 5 | `research-017` — Michael Frost and Alan Hirsch co-authored 'The Shaping of Things to Come' (2003), which introduced t | **/about** · Section: Not a manifesto. Not a growth machine. |
| 6 | `research-020` — Movement leader cohort is academically credible and seminary-integrated | **/about** · Section: What Movemental is — and is not |
| 7 | `C-T02` — Four things hold Movemental together and are non-negotiable. | **/about** · Section: Who Movemental serves |
| 8 | `C-A04` — The guide posture — authority comes from sustained grappling, not from having figured it out | **/about** · Section: Why trust it |
| 9 | `research-019` — Rick Warren's 'The Purpose Driven Life' has sold 30+ million copies in 85+ languages, making it one  | **/about** · Section: Who is building this |
| 10 | `research-050` — Alan Hirsch's network isn't scattered—it's coherent. | **/about** · Section: If the work matters, the infrastructure matters too |
| … | _Claims 11–173: no same-index layout block (argument list longer than layout spine)._ | |

### Claim-by-claim drift (all 173 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `C-PR01` | yes | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movemental is built by movement leaders, for movement leaders. |
| 2 | `C-PR02` | yes | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user management, content, media, e-commerce,… |
| 3 | `research-018` | yes | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken through Hirsch's platforms, making it a sig… |
| 4 | `C-PR04` | yes | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional work) demonstrated in practice the frame… |
| 5 | `research-017` | yes | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Michael Frost and Alan Hirsch co-authored 'The Shaping of Things to Come' (2003), which introduced the mDNA (missional DNA) framework and be… |
| 6 | `research-020` | yes | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement leader cohort is academically credible and seminary-integrated |
| 7 | `C-T02` | yes | 52% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Four things hold Movemental together and are non-negotiable. |
| 8 | `C-A04` | yes | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The guide posture — authority comes from sustained grappling, not from having figured it out |
| 9 | `research-019` | yes | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Rick Warren's 'The Purpose Driven Life' has sold 30+ million copies in 85+ languages, making it one of the best-selling books in history. |
| 10 | `research-050` | yes | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch's network isn't scattered—it's coherent. |
| 11 | `C-T01` | yes | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Christocentric spine — Jesus at the center is load-bearing, not decorative |
| 12 | `C-T03` | yes | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Embodied ministry cannot be automated — digital supports presence, never replaces it |
| 13 | `research-036` | yes | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Exponential, Verge, and Missio Alliance events: movement leader ecosystem is visible and organized |
| 14 | `book-003` | yes | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI Is an Anthropological Problem, Not a Technological One |
| 15 | `C-A03` | yes | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Amplification, not replacement — the AI control boundary for voice, insight, and authority |
| 16 | `business-075` | yes | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Economic Justice: Fair Exchange, Not Extraction |
| 17 | `C-A11` | yes | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing |
| 18 | `business-058` | yes | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What Breaks Company If Ignored: Five Non-Negotiables |
| 19 | `book-045` | yes | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Book as Companionship in Uncertainty |
| 20 | `book-021` | yes | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Not a Technical Manual, Manifesto, or Sales Pitch |
| 21 | `C-A08` | yes | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content that transforms vs. content that extracts — an ethical distinction |
| 22 | `research-038` | yes | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Founder insight: manifesto may be low-trust slop—candidate for rewrite or demotion |
| 23 | `book-049` | yes | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Three-Section Structure: Crisis, Response, Demonstration |
| 24 | `C-A07` | yes | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Slowing down as resistance — AI can enable pace, not just acceleration |
| 25 | `C-A05` | yes | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Refusal as love — what AI must not do, framed as protection of the sacred |
| 26 | `book-004` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Adaptive Leadership as the Response to AI |
| 27 | `articles-054` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI amplifies both crisis and opportunity—credibility becomes central |
| 28 | `business-076` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Built on Movemental Theology: APEST, mDNA, Incarnational Mission |
| 29 | `research-016` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's integrated intellectual architecture moves from Christology (who Christ is and what He inaugurated) through Missiology (the Ch… |
| 30 | `research-046` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, network, hybrid, digital, denominational, inde… |
| 31 | `articles-047` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Communitas through shared risk and mission, not comfort |
| 32 | `business-009` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Formation Must Accompany Amplification |
| 33 | `business-088` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Metrics and Signals: What Success Actually Looks Like |
| 34 | `research-041` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement leaders solve for multiplication and reproduction, not institutional sustainability |
| 35 | `articles-050` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental leaders include Alan Hirsch, Brad Brisco, and emerging voices |
| 36 | `articles-039` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Ownership is stewardship, not empire—responsibility, not dominance |
| 37 | `book-031` |  | 51% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Relationship as Non-Negotiable Foundation |
| 38 | `book-033` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Research on AI Trust and Credibility Crisis |
| 39 | `business-041` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Security and Compliance: HTTPS, Encryption, RBAC, GDPR-Ready |
| 40 | `book-005` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Speed of Adoption and Dunning-Kruger With AI |
| 41 | `business-001` |  | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Technology Properly Ordered to Serve Mission |
| 42 | `business-025` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Convergence: Four Concepts That Demand Something New |
| 43 | `articles-040` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The stakes are spiritual and generational, not just personal efficiency |
| 44 | `book-002` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Tension: Using the Tool That Created the Problem |
| 45 | `book-013` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Theological Integrity as Non-Negotiable in Christian Content |
| 46 | `book-012` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Transparency as Trust Signal and Credibility Protection |
| 47 | `book-016` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What AI Displaces: Relationship, Prayer, Embodiment, Presence, Formation |
| 48 | `book-015` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What Churches Are Free (and Obligated) to Do |
| 49 | `business-080` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What Moves Movemental: Movement Multiplication, Not Profit Maximization |
| 50 | `C-T10` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Future vision — AI becomes a trusted knowledge graph and ministry companion |
| 51 | `articles-044` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Codification without compromise—making patterns transmissible |
| 52 | `research-047` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes: 'For movement leaders, approval of AI-affected public voice is anchored in the leader (and their process)—detail TBD when… |
| 53 | `book-040` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Context and Personalization as Required for Formation Work |
| 54 | `business-083` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Continuous Learning: Improvement Built Into Culture |
| 55 | `research-048` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Founder preference: show work visible, not declare primary audience—let leaders choose whom to serve |
| 56 | `research-037` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The current org-site manifesto mentions 'Infrastructure: Notion + AI' but the founder notes flag this as a placeholder example, not a commit… |
| 57 | `book-024` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** From Gutenberg to Networks of Trust |
| 58 | `book-043` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Look for Love: Markers of Credible AI Guidance |
| 59 | `research-010` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental is not a publishing house or SaaS—it's a venture-builder studio with aligned incentives |
| 60 | `research-023` |  | 45% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Org site purpose is to make work visible and legitimate as leaders sign up |
| 61 | `book-047` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Theological Anthropology: What Happens to Human Vocation in an AI Age |
| 62 | `book-035` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Type-Safety Chain as Technical Alignment With Values |
| 63 | `book-034` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Expertise Is Hard-Won and Worth Preserving |
| 64 | `research-040` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Women are 18% of 146 scored movement leader candidates—gender gap in visibility and network |
| 65 | `research-027` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder clarifies: archetypes mentioned (Alan Hirsch, Brad Brisco) are not just 'authors and speakers'—definition is broader. |
| 66 | `C-POS06` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck |
| 67 | `C-P04` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church multiplication' may not land on Alan Hirsc… |
| 68 | `research-001` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement leaders are seminary-trained reformers stuck between institution and mission |
| 69 | `C-S30` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's core theological positioning, per the reflected understanding: 'You're called to reactivate what's latent. |
| 70 | `C-AU01` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental looks for leaders who catalyze visible, verifiable movement (transformation that multiplies beyond direct oversight), not just pl… |
| 71 | `C-SP05` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Everything in one home — consolidation that surfaces and unifies the leader's existing credibility |
| 72 | `business-031` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Three-Layer Maturity Model: mDNA > Leadership > Content |
| 73 | `research-008` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The reflected-understanding analysis for Alan Hirsch flags: 'Your content is not translated into key languages—including those with large po… |
| 74 | `C-P03` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The false choice — traditional publisher or rental platform, both extractive, neither sustainable |
| 75 | `C-P02` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizations, teaching at 4 seminaries, and speaki… |
| 76 | `C-SP04` |  | 35% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Network amplification multiplies reach 28×–500× — the five multiplier effects |
| 77 | `C-SP07` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The first cohort defines the brand — early leaders are co-creators, not customers |
| 78 | `business-045` |  | 35% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Movemental Can Underprice: AI-Powered Development Cost Curve |
| 79 | `research-003` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's engaged audience is measured at 50,000+ (confirmed through 150,000+ APEST assessments taken). |
| 80 | `C-F01` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA |
| 81 | `C-F05` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The movemental-analysis documents for multiple leaders identify the same opportunity: existing embodied work (talks, teaching, training) can… |
| 82 | `articles-015` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Pathways as formation journeys, not topic pages |
| 83 | `business-003` |  | 49% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Formation Crisis: Growth Over Substance |
| 84 | `business-066` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Sustainable Content Creation: 5-Hour Week Model |
| 85 | `research-022` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder preference: show that all these groups are served, without hierarchy in public copy. |
| 86 | `research-025` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Alan Hirsch opportunity analysis identifies: '150,000+ APEST assessment takers currently leave after seeing results. |
| 87 | `research-030` |  | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Context matters: Western church fragmentation, AI disruption, and capacity gaps create urgent need |
| 88 | `business-069` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content Strategy Framework: Five Narrative Frames |
| 89 | `articles-042` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content pipeline preview—demo of Movemental processing your work |
| 90 | `book-006` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Why Movement Leaders Were Right to Ignore SEO Until Now |
| 91 | `C-P01` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 68% of internet users now struggle to distinguish human-created from AI-generated content. |
| 92 | `book-037` |  | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Leaders Don't Need Technical Expertise to Lead With AI |
| 93 | `business-029` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Execution Path: 100-Leader Scenius Network |
| 94 | `business-032` |  | 44% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 22 Specialized AI Agents Trained on Movemental Theology |
| 95 | `research-034` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For Alan Hirsch specifically, but applicable to others: content already exists (38+ videos) across 20+ third-party platforms (conference rec… |
| 96 | `research-035` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Missing audiobooks as revenue and access stream—most flagship titles have no audio version |
| 97 | `book-042` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Permission to Stay at Experimentation Level |
| 98 | `C-A01` |  | 35% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Scenius (Brian Eno's term for collaborative genius emerging from creative networks) is the primary mechanism for credibility in the AI age. |
| 99 | `C-A06` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** This moment is different — AI's speed, the accelerating crisis, and the closing window |
| 100 | `C-F10` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Five-stage AI maturity model — from native awareness to mature public leadership |
| 101 | `articles-035` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Uniform platform, distinct expression—one engine, different cars |
| 102 | `research-021` |  | 35% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes state: 'Primary customer today: individual movement leaders (relationship/word-of-mouth is the real acquisition path). |
| 103 | `research-039` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Alan Hirsch opportunity analysis estimates $140K-$380K/year in additional revenue could be realized through: (1) scaled online courses o… |
| 104 | `business-033` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content Management System with Real-Time Collaborative Editing |
| 105 | `C-A10` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Scarcity is structural — curation at bounded scale is how trust, scenius, and movement survive |
| 106 | `articles-046` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Incoherence reads as instability—coherence is formation requirement |
| 107 | `research-002` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** A second major persona is the multiplication leader—church planters, bivocational pioneers, and network strategists who think in terms of re… |
| 108 | `research-005` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes emphasize this clearly: movement leaders live under genuine time and attention constraints. |
| 109 | `research-029` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** You remain the leader, not the operator—Movemental handles infrastructure so you focus on movement |
| 110 | `research-033` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Social-to-email conversion is leaving 70-80% of audience on the table |
| 111 | `articles-026` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Isolation makes structural problems feel normal |
| 112 | `C-POS01` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement infrastructure for a credibility-scarce age — not a website, not another SaaS |
| 113 | `articles-013` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Eight-week formation scaffold with four non-negotiable necessities |
| 114 | `articles-017` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Evergreen article architecture with nine sections and voice markers |
| 115 | `C-BM01` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform ownership creates long-term asset buildi… |
| 116 | `articles-019` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI used as editing gate, not content creator |
| 117 | `articles-020` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI as furnace needs a hearth—not savior, not threat |
| 118 | `articles-048` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** 30/60/90 day plan and commissioning liturgy—sending, not graduation |
| 119 | `articles-049` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Curation over growth—maintaining relational credibility at bounded scale |
| 120 | `articles-033` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Certificate system with verification codes and continuing education credits |
| 121 | `articles-037` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Book—free knowledge spine establishing shared language |
| 122 | `business-043` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Geographic Expansion: English Markets First, Then Multi-Language |
| 123 | `business-049` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Voice Baseline System: Fingerprinting and Consistency |
| 124 | `business-079` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Global Expansion: 10-20 Year Horizon |
| 125 | `business-065` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Five User Roles with Permission Levels |
| 126 | `C-A02` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Credibility differs from influence — measurable but not reducible to a metric |
| 127 | `business-007` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Credibility: Trust + Expertise + Character + Platform |
| 128 | `business-018` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Revolutionary Pricing: $1,000 + 10% vs. Industry Standard |
| 129 | `articles-027` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Repurposing existing work into articles is legitimate and necessary |
| 130 | `articles-030` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Lab with context awareness from personality to formation goals |
| 131 | `articles-032` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Assessment engine for APEST, mDNA, maturity, vocational calling |
| 132 | `articles-038` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Recommended learning journey: spiral through five theological portals |
| 133 | `book-010` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Experimentation as Prerequisite to Discernment |
| 134 | `business-063` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 12-Week Onboarding: Platform Deployment + Voice Capture + Strategy |
| 135 | `business-077` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Qualification Gate: mDNA Foundation Required |
| 136 | `business-078` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Qualification Gate: Visible Movement Impact Required |
| 137 | `business-060` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Community Features: Comments, Forums, Member Directories |
| 138 | `business-071` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Speaking and Consulting Booking Integration |
| 139 | `C-F09` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For organizational partners (nonprofits, churches, denominations), Movemental offers five modular system builds. |
| 140 | `business-019` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Platform Ownership: Not Rental, Complete Control |
| 141 | `articles-055` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Multi-language support—books, articles, and AI in Spanish, Portuguese, etc. |
| 142 | `business-035` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Learning Management System: Courses with Progress Tracking and Certificates |
| 143 | `business-089` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Partnership Pathways: Institutional + Relational |
| 144 | `business-042` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Go-To-Market: Invitation-Only, Relationship-Based Growth |
| 145 | `C-F03` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Multi-tenant platform architecture — one codebase serves many leader sites |
| 146 | `articles-011` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Formation goals and spiritual discernment tracking—unique to Movemental |
| 147 | `articles-016` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Pillar-cluster architecture for topical authority and AI citation |
| 148 | `articles-018` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** GEO (Generative Engine Optimization) complements SEO |
| 149 | `articles-025` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Corpus extraction to calibrate AI voice—not guessing, measuring |
| 150 | `articles-034` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** EEAT as the foundation for discoverability in search and AI |
| 151 | `book-018` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The 70/30 Rule: Sustainable Content Creation Model |
| 152 | `business-016` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** MVP Definition: Core Value Over Feature Completeness |
| 153 | `business-059` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Transparent Relationships: Network Verification Visible and Traceable |
| 154 | `business-072` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Risk: Network Effects Don't Materialize |
| 155 | `business-073` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Risk: Quality Decline as Network Expands |
| 156 | `business-081` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Iterative Roadmap: Feedback-Driven, Not Feature-Driven |
| 157 | `C-A09` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Specialized agents preserve voice; generic AI homogenizes |
| 158 | `articles-029` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content length: depth determined by intent, not arbitrary word count |
| 159 | `articles-036` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Formation Companion in courses—AI that knows the lesson, the week, the learner's context |
| 160 | `articles-052` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Voice fidelity scoring for AI-drafted content |
| 161 | `book-044` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Prompting as Humane Communication, Not Prompt Engineering |
| 162 | `business-034` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Semantic Search and Cross-Platform Discovery |
| 163 | `business-036` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Video Streaming with Progress Tracking and Series Organization |
| 164 | `business-037` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Digital Bookstore with Stripe Integration |
| 165 | `business-038` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Analytics: Real-Time Performance Tracking Across All Content |
| 166 | `business-055` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Quality Assurance Standards: 95% + 90% + 95% |
| 167 | `business-086` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Operational Scaling: Team Expansion With Network |
| 168 | `research-049` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Before launching a leader on Movemental, a thoughtful onboarding should assess: (1) content maturity (how much existing content is there to… |
| 169 | `business-082` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** API and Third-Party Integrations (Post-MVP) |
| 170 | `business-051` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** vs. Traditional Publishers: Ownership + Speed + Economics |
| 171 | `business-052` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** vs. Digital Platforms (Substack/Patreon): Ownership Matters |
| 172 | `business-053` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** vs. WordPress/Squarespace: Network Effects |
| 173 | `business-054` |  | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. Custom Development: Speed, Cost, Network |

---
## Tab: evidence

**Mapped React files:**
- `src/app/(site)/evidence/page.tsx` → /evidence

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 173 |
| Heuristic block count | 12 |
| Ordered layout spine blocks | 12 |
| 1:1 pairing depth for sub-table | 12 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 9 |
| Partial | 113 |
| Weak | 51 |

### 1:1 rank ↔ layout spine (first 12 of 173 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `C-PR01` — Movemental is built by movement leaders, for movement leaders. | **/evidence** · Section: The case that Movemental is real |
| 2 | `C-PR02` — Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user  | **/evidence** · Section: (no Display/Eyebrow in block) |
| 3 | `research-018` — Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken thr | **/evidence** · Section: The short version |
| 4 | `C-PR04` — The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional  | **/evidence** · Section: Compared with assembled stacks, the product is unusually integrated |
| 5 | `research-017` — Michael Frost and Alan Hirsch co-authored 'The Shaping of Things to Come' (2003), which introduced t | **/evidence** · Section: What &ldquo;integrated&rdquo; means in practice |
| 6 | `research-020` — Movement leader cohort is academically credible and seminary-integrated | **/evidence** · Section: The AI advantage is not "we added a chatbot" |
| 7 | `C-T02` — Four things hold Movemental together and are non-negotiable. | **/evidence** · Section: (no Display/Eyebrow in block) |
| 8 | `C-A04` — The guide posture — authority comes from sustained grappling, not from having figured it out | **/evidence** · Section: Architecturally, this is a real platform |
| 9 | `research-019` — Rick Warren's 'The Purpose Driven Life' has sold 30+ million copies in 85+ languages, making it one  | **/evidence** · Section: Why this evidence matters |
| 10 | `research-050` — Alan Hirsch's network isn't scattered—it's coherent. | **/evidence** · Section: How we state claims |
| 11 | `C-T01` — The Christocentric spine — Jesus at the center is load-bearing, not decorative | **/evidence** · Section: What is still being built |
| 12 | `C-T03` — Embodied ministry cannot be automated — digital supports presence, never replaces it | **/evidence** · Section: The question is no longer whether the infrastructure can exist |
| … | _Claims 13–173: no same-index layout block (argument list longer than layout spine)._ | |

### Claim-by-claim drift (all 173 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `C-PR01` | yes | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental is built by movement leaders, for movement leaders. |
| 2 | `C-PR02` | yes | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user management, content, media, e-commerce,… |
| 3 | `research-018` | yes | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken through Hirsch's platforms, making it a sig… |
| 4 | `C-PR04` | yes | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional work) demonstrated in practice the frame… |
| 5 | `research-017` | yes | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Michael Frost and Alan Hirsch co-authored 'The Shaping of Things to Come' (2003), which introduced the mDNA (missional DNA) framework and be… |
| 6 | `research-020` | yes | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement leader cohort is academically credible and seminary-integrated |
| 7 | `C-T02` | yes | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Four things hold Movemental together and are non-negotiable. |
| 8 | `C-A04` | yes | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The guide posture — authority comes from sustained grappling, not from having figured it out |
| 9 | `research-019` | yes | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Rick Warren's 'The Purpose Driven Life' has sold 30+ million copies in 85+ languages, making it one of the best-selling books in history. |
| 10 | `research-050` | yes | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's network isn't scattered—it's coherent. |
| 11 | `C-T01` | yes | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Christocentric spine — Jesus at the center is load-bearing, not decorative |
| 12 | `C-T03` | yes | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Embodied ministry cannot be automated — digital supports presence, never replaces it |
| 13 | `research-036` | yes | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Exponential, Verge, and Missio Alliance events: movement leader ecosystem is visible and organized |
| 14 | `book-003` | yes | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Is an Anthropological Problem, Not a Technological One |
| 15 | `C-A03` | yes | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Amplification, not replacement — the AI control boundary for voice, insight, and authority |
| 16 | `business-075` | yes | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Economic Justice: Fair Exchange, Not Extraction |
| 17 | `C-A11` | yes | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing |
| 18 | `business-058` | yes | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What Breaks Company If Ignored: Five Non-Negotiables |
| 19 | `book-045` | yes | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Book as Companionship in Uncertainty |
| 20 | `book-021` | yes | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Not a Technical Manual, Manifesto, or Sales Pitch |
| 21 | `C-A08` | yes | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content that transforms vs. content that extracts — an ethical distinction |
| 22 | `research-038` | yes | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Founder insight: manifesto may be low-trust slop—candidate for rewrite or demotion |
| 23 | `book-049` | yes | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Three-Section Structure: Crisis, Response, Demonstration |
| 24 | `C-A07` | yes | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Slowing down as resistance — AI can enable pace, not just acceleration |
| 25 | `C-A05` | yes | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Refusal as love — what AI must not do, framed as protection of the sacred |
| 26 | `book-004` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Adaptive Leadership as the Response to AI |
| 27 | `articles-054` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI amplifies both crisis and opportunity—credibility becomes central |
| 28 | `business-076` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Built on Movemental Theology: APEST, mDNA, Incarnational Mission |
| 29 | `research-016` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's integrated intellectual architecture moves from Christology (who Christ is and what He inaugurated) through Missiology (the Ch… |
| 30 | `research-046` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, network, hybrid, digital, denominational, inde… |
| 31 | `articles-047` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Communitas through shared risk and mission, not comfort |
| 32 | `business-009` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Formation Must Accompany Amplification |
| 33 | `business-088` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Metrics and Signals: What Success Actually Looks Like |
| 34 | `research-041` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement leaders solve for multiplication and reproduction, not institutional sustainability |
| 35 | `articles-050` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental leaders include Alan Hirsch, Brad Brisco, and emerging voices |
| 36 | `articles-039` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Ownership is stewardship, not empire—responsibility, not dominance |
| 37 | `book-031` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Relationship as Non-Negotiable Foundation |
| 38 | `book-033` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Research on AI Trust and Credibility Crisis |
| 39 | `business-041` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Security and Compliance: HTTPS, Encryption, RBAC, GDPR-Ready |
| 40 | `book-005` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Speed of Adoption and Dunning-Kruger With AI |
| 41 | `business-001` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Technology Properly Ordered to Serve Mission |
| 42 | `business-025` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Convergence: Four Concepts That Demand Something New |
| 43 | `articles-040` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The stakes are spiritual and generational, not just personal efficiency |
| 44 | `book-002` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Tension: Using the Tool That Created the Problem |
| 45 | `book-013` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Theological Integrity as Non-Negotiable in Christian Content |
| 46 | `book-012` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Transparency as Trust Signal and Credibility Protection |
| 47 | `book-016` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** What AI Displaces: Relationship, Prayer, Embodiment, Presence, Formation |
| 48 | `book-015` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** What Churches Are Free (and Obligated) to Do |
| 49 | `business-080` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What Moves Movemental: Movement Multiplication, Not Profit Maximization |
| 50 | `C-T10` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Future vision — AI becomes a trusted knowledge graph and ministry companion |
| 51 | `articles-044` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Codification without compromise—making patterns transmissible |
| 52 | `research-047` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes: 'For movement leaders, approval of AI-affected public voice is anchored in the leader (and their process)—detail TBD when… |
| 53 | `book-040` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Context and Personalization as Required for Formation Work |
| 54 | `business-083` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Continuous Learning: Improvement Built Into Culture |
| 55 | `research-048` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Founder preference: show work visible, not declare primary audience—let leaders choose whom to serve |
| 56 | `research-037` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The current org-site manifesto mentions 'Infrastructure: Notion + AI' but the founder notes flag this as a placeholder example, not a commit… |
| 57 | `book-024` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** From Gutenberg to Networks of Trust |
| 58 | `book-043` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Look for Love: Markers of Credible AI Guidance |
| 59 | `research-010` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental is not a publishing house or SaaS—it's a venture-builder studio with aligned incentives |
| 60 | `research-023` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Org site purpose is to make work visible and legitimate as leaders sign up |
| 61 | `book-047` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Theological Anthropology: What Happens to Human Vocation in an AI Age |
| 62 | `book-035` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Type-Safety Chain as Technical Alignment With Values |
| 63 | `book-034` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Why Expertise Is Hard-Won and Worth Preserving |
| 64 | `research-040` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Women are 18% of 146 scored movement leader candidates—gender gap in visibility and network |
| 65 | `research-003` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch's engaged audience is measured at 50,000+ (confirmed through 150,000+ APEST assessments taken). |
| 66 | `C-A06` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** This moment is different — AI's speed, the accelerating crisis, and the closing window |
| 67 | `C-P01` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 68% of internet users now struggle to distinguish human-created from AI-generated content. |
| 68 | `articles-017` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Evergreen article architecture with nine sections and voice markers |
| 69 | `C-P03` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The false choice — traditional publisher or rental platform, both extractive, neither sustainable |
| 70 | `C-BM01` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform ownership creates long-term asset buildi… |
| 71 | `C-SP07` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The first cohort defines the brand — early leaders are co-creators, not customers |
| 72 | `research-001` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement leaders are seminary-trained reformers stuck between institution and mission |
| 73 | `book-006` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Movement Leaders Were Right to Ignore SEO Until Now |
| 74 | `articles-032` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Assessment engine for APEST, mDNA, maturity, vocational calling |
| 75 | `business-032` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 22 Specialized AI Agents Trained on Movemental Theology |
| 76 | `research-035` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Missing audiobooks as revenue and access stream—most flagship titles have no audio version |
| 77 | `C-A01` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Scenius (Brian Eno's term for collaborative genius emerging from creative networks) is the primary mechanism for credibility in the AI age. |
| 78 | `articles-035` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Uniform platform, distinct expression—one engine, different cars |
| 79 | `business-018` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Revolutionary Pricing: $1,000 + 10% vs. Industry Standard |
| 80 | `C-AU01` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental looks for leaders who catalyze visible, verifiable movement (transformation that multiplies beyond direct oversight), not just pl… |
| 81 | `C-SP05` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Everything in one home — consolidation that surfaces and unifies the leader's existing credibility |
| 82 | `business-045` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Movemental Can Underprice: AI-Powered Development Cost Curve |
| 83 | `C-F01` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA |
| 84 | `C-F05` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The movemental-analysis documents for multiple leaders identify the same opportunity: existing embodied work (talks, teaching, training) can… |
| 85 | `articles-013` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Eight-week formation scaffold with four non-negotiable necessities |
| 86 | `articles-015` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Pathways as formation journeys, not topic pages |
| 87 | `business-019` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Platform Ownership: Not Rental, Complete Control |
| 88 | `business-066` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Sustainable Content Creation: 5-Hour Week Model |
| 89 | `research-021` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes state: 'Primary customer today: individual movement leaders (relationship/word-of-mouth is the real acquisition path). |
| 90 | `research-025` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Alan Hirsch opportunity analysis identifies: '150,000+ APEST assessment takers currently leave after seeing results. |
| 91 | `C-A10` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Scarcity is structural — curation at bounded scale is how trust, scenius, and movement survive |
| 92 | `C-POS06` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck |
| 93 | `articles-016` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Pillar-cluster architecture for topical authority and AI citation |
| 94 | `articles-025` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Corpus extraction to calibrate AI voice—not guessing, measuring |
| 95 | `articles-048` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 30/60/90 day plan and commissioning liturgy—sending, not graduation |
| 96 | `book-018` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The 70/30 Rule: Sustainable Content Creation Model |
| 97 | `business-037` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Digital Bookstore with Stripe Integration |
| 98 | `business-055` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Quality Assurance Standards: 95% + 90% + 95% |
| 99 | `C-S30` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch's core theological positioning, per the reflected understanding: 'You're called to reactivate what's latent. |
| 100 | `articles-020` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI as furnace needs a hearth—not savior, not threat |
| 101 | `articles-049` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Curation over growth—maintaining relational credibility at bounded scale |
| 102 | `research-005` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes emphasize this clearly: movement leaders live under genuine time and attention constraints. |
| 103 | `research-033` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Social-to-email conversion is leaving 70-80% of audience on the table |
| 104 | `articles-037` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Book—free knowledge spine establishing shared language |
| 105 | `articles-042` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content pipeline preview—demo of Movemental processing your work |
| 106 | `C-P02` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizations, teaching at 4 seminaries, and speaki… |
| 107 | `C-P04` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church multiplication' may not land on Alan Hirsc… |
| 108 | `C-POS01` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement infrastructure for a credibility-scarce age — not a website, not another SaaS |
| 109 | `C-SP04` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Network amplification multiplies reach 28×–500× — the five multiplier effects |
| 110 | `articles-046` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Incoherence reads as instability—coherence is formation requirement |
| 111 | `business-003` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Formation Crisis: Growth Over Substance |
| 112 | `research-002` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** A second major persona is the multiplication leader—church planters, bivocational pioneers, and network strategists who think in terms of re… |
| 113 | `research-022` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The founder preference: show that all these groups are served, without hierarchy in public copy. |
| 114 | `articles-026` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Isolation makes structural problems feel normal |
| 115 | `research-030` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Context matters: Western church fragmentation, AI disruption, and capacity gaps create urgent need |
| 116 | `C-F09` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For organizational partners (nonprofits, churches, denominations), Movemental offers five modular system builds. |
| 117 | `C-F10` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Five-stage AI maturity model — from native awareness to mature public leadership |
| 118 | `articles-027` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Repurposing existing work into articles is legitimate and necessary |
| 119 | `articles-030` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Lab with context awareness from personality to formation goals |
| 120 | `articles-038` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Recommended learning journey: spiral through five theological portals |
| 121 | `book-010` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Experimentation as Prerequisite to Discernment |
| 122 | `book-037` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Leaders Don't Need Technical Expertise to Lead With AI |
| 123 | `business-029` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Execution Path: 100-Leader Scenius Network |
| 124 | `business-031` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Three-Layer Maturity Model: mDNA > Leadership > Content |
| 125 | `business-051` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** vs. Traditional Publishers: Ownership + Speed + Economics |
| 126 | `business-052` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** vs. Digital Platforms (Substack/Patreon): Ownership Matters |
| 127 | `business-063` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 12-Week Onboarding: Platform Deployment + Voice Capture + Strategy |
| 128 | `business-077` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Qualification Gate: mDNA Foundation Required |
| 129 | `business-078` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Qualification Gate: Visible Movement Impact Required |
| 130 | `research-008` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The reflected-understanding analysis for Alan Hirsch flags: 'Your content is not translated into key languages—including those with large po… |
| 131 | `research-034` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For Alan Hirsch specifically, but applicable to others: content already exists (38+ videos) across 20+ third-party platforms (conference rec… |
| 132 | `articles-055` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Multi-language support—books, articles, and AI in Spanish, Portuguese, etc. |
| 133 | `book-042` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Permission to Stay at Experimentation Level |
| 134 | `business-033` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content Management System with Real-Time Collaborative Editing |
| 135 | `business-035` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Learning Management System: Courses with Progress Tracking and Certificates |
| 136 | `business-060` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Community Features: Comments, Forums, Member Directories |
| 137 | `business-071` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Speaking and Consulting Booking Integration |
| 138 | `business-089` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Partnership Pathways: Institutional + Relational |
| 139 | `C-A02` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Credibility differs from influence — measurable but not reducible to a metric |
| 140 | `business-007` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Credibility: Trust + Expertise + Character + Platform |
| 141 | `research-027` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder clarifies: archetypes mentioned (Alan Hirsch, Brad Brisco) are not just 'authors and speakers'—definition is broader. |
| 142 | `business-042` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Go-To-Market: Invitation-Only, Relationship-Based Growth |
| 143 | `research-039` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Alan Hirsch opportunity analysis estimates $140K-$380K/year in additional revenue could be realized through: (1) scaled online courses o… |
| 144 | `C-F03` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Multi-tenant platform architecture — one codebase serves many leader sites |
| 145 | `articles-011` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Formation goals and spiritual discernment tracking—unique to Movemental |
| 146 | `articles-018` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** GEO (Generative Engine Optimization) complements SEO |
| 147 | `articles-019` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI used as editing gate, not content creator |
| 148 | `articles-034` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** EEAT as the foundation for discoverability in search and AI |
| 149 | `business-016` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** MVP Definition: Core Value Over Feature Completeness |
| 150 | `business-059` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Transparent Relationships: Network Verification Visible and Traceable |
| 151 | `business-069` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content Strategy Framework: Five Narrative Frames |
| 152 | `business-072` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Risk: Network Effects Don't Materialize |
| 153 | `business-073` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Risk: Quality Decline as Network Expands |
| 154 | `business-081` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Iterative Roadmap: Feedback-Driven, Not Feature-Driven |
| 155 | `C-A09` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Specialized agents preserve voice; generic AI homogenizes |
| 156 | `articles-029` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content length: depth determined by intent, not arbitrary word count |
| 157 | `articles-033` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Certificate system with verification codes and continuing education credits |
| 158 | `articles-036` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Formation Companion in courses—AI that knows the lesson, the week, the learner's context |
| 159 | `articles-052` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Voice fidelity scoring for AI-drafted content |
| 160 | `book-044` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Prompting as Humane Communication, Not Prompt Engineering |
| 161 | `business-034` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Semantic Search and Cross-Platform Discovery |
| 162 | `business-036` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Video Streaming with Progress Tracking and Series Organization |
| 163 | `business-038` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Analytics: Real-Time Performance Tracking Across All Content |
| 164 | `business-043` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Geographic Expansion: English Markets First, Then Multi-Language |
| 165 | `business-049` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Voice Baseline System: Fingerprinting and Consistency |
| 166 | `business-079` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Global Expansion: 10-20 Year Horizon |
| 167 | `business-086` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Operational Scaling: Team Expansion With Network |
| 168 | `research-049` |  | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Before launching a leader on Movemental, a thoughtful onboarding should assess: (1) content maturity (how much existing content is there to… |
| 169 | `business-065` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Five User Roles with Permission Levels |
| 170 | `business-082` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** API and Third-Party Integrations (Post-MVP) |
| 171 | `research-029` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** You remain the leader, not the operator—Movemental handles infrastructure so you focus on movement |
| 172 | `business-053` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. WordPress/Squarespace: Network Effects |
| 173 | `business-054` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** vs. Custom Development: Speed, Cost, Network |

---
## Tab: faq

**Mapped React files:**
- `src/app/(site)/faq/page.tsx` → /faq

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 173 |
| Heuristic block count | 3 |
| Ordered layout spine blocks | 3 |
| 1:1 pairing depth for sub-table | 3 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 64 |
| Partial | 106 |
| Weak | 3 |

### 1:1 rank ↔ layout spine (first 3 of 173 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `business-018` — Revolutionary Pricing: $1,000 + 10% vs. Industry Standard | **/faq** · Section: Everything you'd want to ask before engaging |
| 2 | `C-BM01` — For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform  | **/faq** · Section: (no Display/Eyebrow in block) |
| 3 | `business-051` — vs. Traditional Publishers: Ownership + Speed + Economics | **/faq** · Section: Still have questions? |
| … | _Claims 4–173: no same-index layout block (argument list longer than layout spine)._ | |

### Claim-by-claim drift (all 173 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `business-018` | yes | 65% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Revolutionary Pricing: $1,000 + 10% vs. Industry Standard |
| 2 | `C-BM01` | yes | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform ownership creates long-term asset buildi… |
| 3 | `business-051` | yes | 44% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. Traditional Publishers: Ownership + Speed + Economics |
| 4 | `business-052` | yes | 55% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. Digital Platforms (Substack/Patreon): Ownership Matters |
| 5 | `business-053` | yes | 55% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. WordPress/Squarespace: Network Effects |
| 6 | `business-054` | yes | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. Custom Development: Speed, Cost, Network |
| 7 | `C-POS06` | yes | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck |
| 8 | `business-019` | yes | 62% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Platform Ownership: Not Rental, Complete Control |
| 9 | `C-A11` | yes | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing |
| 10 | `C-A10` | yes | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Scarcity is structural — curation at bounded scale is how trust, scenius, and movement survive |
| 11 | `business-075` | yes | 52% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Economic Justice: Fair Exchange, Not Extraction |
| 12 | `C-P03` | yes | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The false choice — traditional publisher or rental platform, both extractive, neither sustainable |
| 13 | `business-045` | yes | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Why Movemental Can Underprice: AI-Powered Development Cost Curve |
| 14 | `business-042` | yes | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Go-To-Market: Invitation-Only, Relationship-Based Growth |
| 15 | `research-039` | yes | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Alan Hirsch opportunity analysis estimates $140K-$380K/year in additional revenue could be realized through: (1) scaled online courses o… |
| 16 | `research-021` | yes | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder notes state: 'Primary customer today: individual movement leaders (relationship/word-of-mouth is the real acquisition path). |
| 17 | `C-A02` | yes | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Credibility differs from influence — measurable but not reducible to a metric |
| 18 | `business-007` | yes | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Credibility: Trust + Expertise + Character + Platform |
| 19 | `research-010` | yes | 35% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental is not a publishing house or SaaS—it's a venture-builder studio with aligned incentives |
| 20 | `book-006` | yes | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Movement Leaders Were Right to Ignore SEO Until Now |
| 21 | `articles-015` | yes | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Pathways as formation journeys, not topic pages |
| 22 | `articles-030` | yes | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI Lab with context awareness from personality to formation goals |
| 23 | `research-041` | yes | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement leaders solve for multiplication and reproduction, not institutional sustainability |
| 24 | `research-046` | yes | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, network, hybrid, digital, denominational, inde… |
| 25 | `C-F01` | yes | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA |
| 26 | `C-F05` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The movemental-analysis documents for multiple leaders identify the same opportunity: existing embodied work (talks, teaching, training) can… |
| 27 | `articles-013` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Eight-week formation scaffold with four non-negotiable necessities |
| 28 | `articles-017` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Evergreen article architecture with nine sections and voice markers |
| 29 | `business-066` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Sustainable Content Creation: 5-Hour Week Model |
| 30 | `research-025` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Alan Hirsch opportunity analysis identifies: '150,000+ APEST assessment takers currently leave after seeing results. |
| 31 | `C-A01` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Scenius (Brian Eno's term for collaborative genius emerging from creative networks) is the primary mechanism for credibility in the AI age. |
| 32 | `C-A06` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** This moment is different — AI's speed, the accelerating crisis, and the closing window |
| 33 | `articles-035` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Uniform platform, distinct expression—one engine, different cars |
| 34 | `articles-037` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI Book—free knowledge spine establishing shared language |
| 35 | `C-AU01` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental looks for leaders who catalyze visible, verifiable movement (transformation that multiplies beyond direct oversight), not just pl… |
| 36 | `C-P01` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 68% of internet users now struggle to distinguish human-created from AI-generated content. |
| 37 | `C-SP05` |  | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Everything in one home — consolidation that surfaces and unifies the leader's existing credibility |
| 38 | `C-A05` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Refusal as love — what AI must not do, framed as protection of the sacred |
| 39 | `book-015` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What Churches Are Free (and Obligated) to Do |
| 40 | `C-T10` |  | 35% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Future vision — AI becomes a trusted knowledge graph and ministry companion |
| 41 | `book-004` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Adaptive Leadership as the Response to AI |
| 42 | `business-009` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Formation Must Accompany Amplification |
| 43 | `C-A08` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content that transforms vs. content that extracts — an ethical distinction |
| 44 | `C-T01` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Christocentric spine — Jesus at the center is load-bearing, not decorative |
| 45 | `C-T02` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Four things hold Movemental together and are non-negotiable. |
| 46 | `articles-040` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The stakes are spiritual and generational, not just personal efficiency |
| 47 | `articles-054` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI amplifies both crisis and opportunity—credibility becomes central |
| 48 | `book-003` |  | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI Is an Anthropological Problem, Not a Technological One |
| 49 | `business-025` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Convergence: Four Concepts That Demand Something New |
| 50 | `business-080` |  | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What Moves Movemental: Movement Multiplication, Not Profit Maximization |
| 51 | `C-F09` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** For organizational partners (nonprofits, churches, denominations), Movemental offers five modular system builds. |
| 52 | `C-F10` |  | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Five-stage AI maturity model — from native awareness to mature public leadership |
| 53 | `articles-029` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content length: depth determined by intent, not arbitrary word count |
| 54 | `articles-055` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Multi-language support—books, articles, and AI in Spanish, Portuguese, etc. |
| 55 | `business-033` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content Management System with Real-Time Collaborative Editing |
| 56 | `business-035` |  | 55% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Learning Management System: Courses with Progress Tracking and Certificates |
| 57 | `business-089` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Partnership Pathways: Institutional + Relational |
| 58 | `research-027` |  | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder clarifies: archetypes mentioned (Alan Hirsch, Brad Brisco) are not just 'authors and speakers'—definition is broader. |
| 59 | `C-POS01` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement infrastructure for a credibility-scarce age — not a website, not another SaaS |
| 60 | `articles-027` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Repurposing existing work into articles is legitimate and necessary |
| 61 | `articles-032` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Assessment engine for APEST, mDNA, maturity, vocational calling |
| 62 | `articles-038` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Recommended learning journey: spiral through five theological portals |
| 63 | `book-010` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Experimentation as Prerequisite to Discernment |
| 64 | `book-037` |  | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Leaders Don't Need Technical Expertise to Lead With AI |
| 65 | `business-003` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Formation Crisis: Growth Over Substance |
| 66 | `business-029` |  | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Execution Path: 100-Leader Scenius Network |
| 67 | `business-031` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Three-Layer Maturity Model: mDNA > Leadership > Content |
| 68 | `business-032` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 22 Specialized AI Agents Trained on Movemental Theology |
| 69 | `business-063` |  | 49% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 12-Week Onboarding: Platform Deployment + Voice Capture + Strategy |
| 70 | `business-077` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Qualification Gate: mDNA Foundation Required |
| 71 | `business-078` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Qualification Gate: Visible Movement Impact Required |
| 72 | `research-008` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The reflected-understanding analysis for Alan Hirsch flags: 'Your content is not translated into key languages—including those with large po… |
| 73 | `research-022` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder preference: show that all these groups are served, without hierarchy in public copy. |
| 74 | `research-034` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For Alan Hirsch specifically, but applicable to others: content already exists (38+ videos) across 20+ third-party platforms (conference rec… |
| 75 | `research-035` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Missing audiobooks as revenue and access stream—most flagship titles have no audio version |
| 76 | `book-042` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Permission to Stay at Experimentation Level |
| 77 | `business-060` |  | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Community Features: Comments, Forums, Member Directories |
| 78 | `business-071` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Speaking and Consulting Booking Integration |
| 79 | `research-030` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Context matters: Western church fragmentation, AI disruption, and capacity gaps create urgent need |
| 80 | `C-S30` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's core theological positioning, per the reflected understanding: 'You're called to reactivate what's latent. |
| 81 | `articles-020` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI as furnace needs a hearth—not savior, not threat |
| 82 | `articles-049` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Curation over growth—maintaining relational credibility at bounded scale |
| 83 | `articles-042` |  | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content pipeline preview—demo of Movemental processing your work |
| 84 | `C-P02` |  | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizations, teaching at 4 seminaries, and speaki… |
| 85 | `C-P04` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church multiplication' may not land on Alan Hirsc… |
| 86 | `C-SP04` |  | 35% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Network amplification multiplies reach 28×–500× — the five multiplier effects |
| 87 | `C-SP07` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The first cohort defines the brand — early leaders are co-creators, not customers |
| 88 | `C-T03` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Embodied ministry cannot be automated — digital supports presence, never replaces it |
| 89 | `articles-046` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Incoherence reads as instability—coherence is formation requirement |
| 90 | `articles-047` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Communitas through shared risk and mission, not comfort |
| 91 | `business-001` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Technology Properly Ordered to Serve Mission |
| 92 | `business-058` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What Breaks Company If Ignored: Five Non-Negotiables |
| 93 | `research-001` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement leaders are seminary-trained reformers stuck between institution and mission |
| 94 | `research-002` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** A second major persona is the multiplication leader—church planters, bivocational pioneers, and network strategists who think in terms of re… |
| 95 | `research-003` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's engaged audience is measured at 50,000+ (confirmed through 150,000+ APEST assessments taken). |
| 96 | `research-036` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Exponential, Verge, and Missio Alliance events: movement leader ecosystem is visible and organized |
| 97 | `articles-026` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Isolation makes structural problems feel normal |
| 98 | `book-047` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Theological Anthropology: What Happens to Human Vocation in an AI Age |
| 99 | `business-083` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Continuous Learning: Improvement Built Into Culture |
| 100 | `C-A03` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Amplification, not replacement — the AI control boundary for voice, insight, and authority |
| 101 | `C-A07` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Slowing down as resistance — AI can enable pace, not just acceleration |
| 102 | `C-PR02` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user management, content, media, e-commerce,… |
| 103 | `C-PR04` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional work) demonstrated in practice the frame… |
| 104 | `book-012` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Transparency as Trust Signal and Credibility Protection |
| 105 | `book-013` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Theological Integrity as Non-Negotiable in Christian Content |
| 106 | `business-041` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Security and Compliance: HTTPS, Encryption, RBAC, GDPR-Ready |
| 107 | `business-088` |  | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Metrics and Signals: What Success Actually Looks Like |
| 108 | `articles-044` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Codification without compromise—making patterns transmissible |
| 109 | `book-035` |  | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Type-Safety Chain as Technical Alignment With Values |
| 110 | `book-040` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Context and Personalization as Required for Formation Work |
| 111 | `research-037` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The current org-site manifesto mentions 'Infrastructure: Notion + AI' but the founder notes flag this as a placeholder example, not a commit… |
| 112 | `research-047` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder notes: 'For movement leaders, approval of AI-affected public voice is anchored in the leader (and their process)—detail TBD when… |
| 113 | `articles-039` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Ownership is stewardship, not empire—responsibility, not dominance |
| 114 | `book-016` |  | 44% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What AI Displaces: Relationship, Prayer, Embodiment, Presence, Formation |
| 115 | `research-018` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken through Hirsch's platforms, making it a sig… |
| 116 | `book-034` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Expertise Is Hard-Won and Worth Preserving |
| 117 | `book-043` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Look for Love: Markers of Credible AI Guidance |
| 118 | `research-040` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Women are 18% of 146 scored movement leader candidates—gender gap in visibility and network |
| 119 | `C-A04` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The guide posture — authority comes from sustained grappling, not from having figured it out |
| 120 | `C-PR01` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental is built by movement leaders, for movement leaders. |
| 121 | `articles-050` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental leaders include Alan Hirsch, Brad Brisco, and emerging voices |
| 122 | `book-002` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Tension: Using the Tool That Created the Problem |
| 123 | `book-005` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Speed of Adoption and Dunning-Kruger With AI |
| 124 | `book-033` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Research on AI Trust and Credibility Crisis |
| 125 | `book-045` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Book as Companionship in Uncertainty |
| 126 | `research-016` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's integrated intellectual architecture moves from Christology (who Christ is and what He inaugurated) through Missiology (the Ch… |
| 127 | `book-024` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** From Gutenberg to Networks of Trust |
| 128 | `research-023` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Org site purpose is to make work visible and legitimate as leaders sign up |
| 129 | `research-048` |  | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Founder preference: show work visible, not declare primary audience—let leaders choose whom to serve |
| 130 | `C-F03` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Multi-tenant platform architecture — one codebase serves many leader sites |
| 131 | `articles-011` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Formation goals and spiritual discernment tracking—unique to Movemental |
| 132 | `articles-016` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Pillar-cluster architecture for topical authority and AI citation |
| 133 | `articles-018` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** GEO (Generative Engine Optimization) complements SEO |
| 134 | `articles-019` |  | 35% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI used as editing gate, not content creator |
| 135 | `articles-025` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Corpus extraction to calibrate AI voice—not guessing, measuring |
| 136 | `articles-034` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** EEAT as the foundation for discoverability in search and AI |
| 137 | `articles-048` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 30/60/90 day plan and commissioning liturgy—sending, not graduation |
| 138 | `book-018` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The 70/30 Rule: Sustainable Content Creation Model |
| 139 | `business-016` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** MVP Definition: Core Value Over Feature Completeness |
| 140 | `business-059` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Transparent Relationships: Network Verification Visible and Traceable |
| 141 | `business-069` |  | 44% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content Strategy Framework: Five Narrative Frames |
| 142 | `business-072` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Risk: Network Effects Don't Materialize |
| 143 | `business-073` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Risk: Quality Decline as Network Expands |
| 144 | `business-081` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Iterative Roadmap: Feedback-Driven, Not Feature-Driven |
| 145 | `C-A09` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Specialized agents preserve voice; generic AI homogenizes |
| 146 | `articles-033` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Certificate system with verification codes and continuing education credits |
| 147 | `articles-036` |  | 59% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Formation Companion in courses—AI that knows the lesson, the week, the learner's context |
| 148 | `articles-052` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Voice fidelity scoring for AI-drafted content |
| 149 | `book-044` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Prompting as Humane Communication, Not Prompt Engineering |
| 150 | `business-034` |  | 45% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Semantic Search and Cross-Platform Discovery |
| 151 | `business-036` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Video Streaming with Progress Tracking and Series Organization |
| 152 | `business-037` |  | 35% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Digital Bookstore with Stripe Integration |
| 153 | `business-038` |  | 45% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Analytics: Real-Time Performance Tracking Across All Content |
| 154 | `business-043` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Geographic Expansion: English Markets First, Then Multi-Language |
| 155 | `business-049` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Voice Baseline System: Fingerprinting and Consistency |
| 156 | `business-055` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Quality Assurance Standards: 95% + 90% + 95% |
| 157 | `business-079` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Global Expansion: 10-20 Year Horizon |
| 158 | `business-086` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Operational Scaling: Team Expansion With Network |
| 159 | `research-049` |  | 55% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Before launching a leader on Movemental, a thoughtful onboarding should assess: (1) content maturity (how much existing content is there to… |
| 160 | `business-065` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Five User Roles with Permission Levels |
| 161 | `business-082` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** API and Third-Party Integrations (Post-MVP) |
| 162 | `research-005` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder notes emphasize this clearly: movement leaders live under genuine time and attention constraints. |
| 163 | `research-029` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** You remain the leader, not the operator—Movemental handles infrastructure so you focus on movement |
| 164 | `research-033` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Social-to-email conversion is leaving 70-80% of audience on the table |
| 165 | `book-021` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Not a Technical Manual, Manifesto, or Sales Pitch |
| 166 | `book-031` |  | 54% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Relationship as Non-Negotiable Foundation |
| 167 | `book-049` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Three-Section Structure: Crisis, Response, Demonstration |
| 168 | `business-076` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Built on Movemental Theology: APEST, mDNA, Incarnational Mission |
| 169 | `research-017` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Michael Frost and Alan Hirsch co-authored 'The Shaping of Things to Come' (2003), which introduced the mDNA (missional DNA) framework and be… |
| 170 | `research-019` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Rick Warren's 'The Purpose Driven Life' has sold 30+ million copies in 85+ languages, making it one of the best-selling books in history. |
| 171 | `research-020` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement leader cohort is academically credible and seminary-integrated |
| 172 | `research-038` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Founder insight: manifesto may be low-trust slop—candidate for rewrite or demotion |
| 173 | `research-050` |  | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch's network isn't scattered—it's coherent. |

---
## Tab: methodology

**Mapped React files:** _No dedicated route._ Coverage uses **full-site** concatenation of **39** `page.tsx` files under `(site)`.

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 173 |
| Heuristic block count | 244 |
| Ordered layout spine blocks | 224 |
| 1:1 pairing depth for sub-table | 173 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 173 |
| Partial | 0 |
| Weak | 0 |

### 1:1 rank ↔ layout spine (first 173 of 173 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `articles-013` — Eight-week formation scaffold with four non-negotiable necessities | **/about** · Section: Built for work that is meant to form people, not just attract attention |
| 2 | `book-018` — The 70/30 Rule: Sustainable Content Creation Model | **/about** · Section: Why Movemental had to exist |
| 3 | `C-F01` — Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA | **/about** · Section: (no Display/Eyebrow in block) |
| 4 | `business-032` — 22 Specialized AI Agents Trained on Movemental Theology | **/about** · Section: What holds Movemental together |
| 5 | `articles-017` — Evergreen article architecture with nine sections and voice markers | **/about** · Section: Not a manifesto. Not a growth machine. |
| 6 | `C-PR02` — Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user  | **/about** · Section: What Movemental is — and is not |
| 7 | `articles-019` — AI used as editing gate, not content creator | **/about** · Section: Who Movemental serves |
| 8 | `C-A03` — Amplification, not replacement — the AI control boundary for voice, insight, and authority | **/about** · Section: Why trust it |
| 9 | `C-F05` — The movemental-analysis documents for multiple leaders identify the same opportunity: existing embod | **/about** · Section: Who is building this |
| 10 | `articles-015` — Pathways as formation journeys, not topic pages | **/about** · Section: If the work matters, the infrastructure matters too |
| 11 | `articles-030` — AI Lab with context awareness from personality to formation goals | **/apply** · Section: Apply to join Movemental |
| 12 | `C-F10` — Five-stage AI maturity model — from native awareness to mature public leadership | **/apply** · Section: (no Display/Eyebrow in block) |
| 13 | `articles-025` — Corpus extraction to calibrate AI voice—not guessing, measuring | **/apply** · Section: (no Display/Eyebrow in block) |
| 14 | `articles-052` — Voice fidelity scoring for AI-drafted content | **/assess** · Section: How mature is your formation system? |
| 15 | `business-049` — Voice Baseline System: Fingerprinting and Consistency | **/assess** · Section: (no Display/Eyebrow in block) |
| 16 | `articles-016` — Pillar-cluster architecture for topical authority and AI citation | **/blog** · Section: Thinking about formation, infrastructure, and mission |
| 17 | `articles-018` — GEO (Generative Engine Optimization) complements SEO | **/blog** · Section: (no Display/Eyebrow in block) |
| 18 | `articles-034` — EEAT as the foundation for discoverability in search and AI | **/blog** · Section: Stay in the conversation |
| 19 | `articles-032` — Assessment engine for APEST, mDNA, maturity, vocational calling | **/book/contributors** · Section: Contributors |
| 20 | `C-F09` — For organizational partners (nonprofits, churches, denominations), Movemental offers five modular sy | **/book/contributors** · Section: (no Display/Eyebrow in block) |
| 21 | `C-F03` — Multi-tenant platform architecture — one codebase serves many leader sites | **/book/contributors** · Section: (no Display/Eyebrow in block) |
| 22 | `business-045` — Why Movemental Can Underprice: AI-Powered Development Cost Curve | **/book/moderate** · Section: Book moderation |
| 23 | `C-A01` — Scenius (Brian Eno's term for collaborative genius emerging from creative networks) is the primary m | **/book** · Section: (no Display/Eyebrow in block) |
| 24 | `book-035` — Type-Safety Chain as Technical Alignment With Values | **/book** · Section: Three through-lines of the manuscript |
| 25 | `business-063` — 12-Week Onboarding: Platform Deployment + Voice Capture + Strategy | **/book** · Section: A book about credibility cannot hide behind polish. |
| 26 | `articles-048` — 30/60/90 day plan and commissioning liturgy—sending, not graduation | **/book** · Section: 21 chapters in 7 parts |
| 27 | `articles-011` — Formation goals and spiritual discernment tracking—unique to Movemental | **/book** · Section: This book improves because of its readers |
| 28 | `business-031` — Three-Layer Maturity Model: mDNA > Leadership > Content | **/book** · Section: Take it with you |
| 29 | `C-A07` — Slowing down as resistance — AI can enable pace, not just acceleration | **/book/read/[slug]** · Section: Part {chapter.partNumber}: {chapter.partTitle} |
| 30 | `C-S30` — Alan Hirsch's core theological positioning, per the reflected understanding: 'You're called to react | **/case-studies** · Section: Real work. Real formation. Real outcomes. |
| 31 | `C-A06` — This moment is different — AI's speed, the accelerating crisis, and the closing window | **/case-studies** · Section: (no Display/Eyebrow in block) |
| 32 | `C-A05` — Refusal as love — what AI must not do, framed as protection of the sacred | **/case-studies** · Section: Story previews |
| 33 | `C-PR04` — The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional  | **/case-studies** · Section: Want to be a case study? |
| 34 | `articles-020` — AI as furnace needs a hearth—not savior, not threat | **/churches** · Section: Your church does not need more content. It needs a formation system. |
| 35 | `research-025` — The Alan Hirsch opportunity analysis identifies: '150,000+ APEST assessment takers currently leave a | **/churches** · Section: (no Display/Eyebrow in block) |
| 36 | `research-034` — For Alan Hirsch specifically, but applicable to others: content already exists (38+ videos) across 2 | **/churches** · Section: Sunday content is not the same thing as ongoing formation |
| 37 | `business-069` — Content Strategy Framework: Five Narrative Frames | **/churches** · Section: What churches need now |
| 38 | `articles-049` — Curation over growth—maintaining relational credibility at bounded scale | **/churches** · Section: What Movemental makes possible |
| 39 | `business-029` — Execution Path: 100-Leader Scenius Network | **/churches** · Section: Formation over growth is not a slogan here |
| 40 | `book-010` — Experimentation as Prerequisite to Discernment | **/churches** · Section: How AI can serve a church responsibly |
| 41 | `business-042` — Go-To-Market: Invitation-Only, Relationship-Based Growth | **/churches** · Section: Usefulness without surrender |
| 42 | `business-081` — Iterative Roadmap: Feedback-Driven, Not Feature-Driven | **/churches** · Section: This is best for churches that… |
| 43 | `book-037` — Leaders Don't Need Technical Expertise to Lead With AI | **/churches** · Section: If your church wants to form people more intentionally, the system matters |
| 44 | `business-088` — Metrics and Signals: What Success Actually Looks Like | **/contact** · LightHeroPhotoBackdrop: Start a conversation |
| 45 | `research-035` — Missing audiobooks as revenue and access stream—most flagship titles have no audio version | **/contact** · Section: Who this is for |
| 46 | `business-016` — MVP Definition: Core Value Over Feature Completeness | **/contact** · Section: What to expect |
| 47 | `business-077` — Qualification Gate: mDNA Foundation Required | **/contact** · Section: How to start |
| 48 | `business-078` — Qualification Gate: Visible Movement Impact Required | **/contact** · Section: Trust & inspectability |
| 49 | `articles-038` — Recommended learning journey: spiral through five theological portals | **/contact** · Section: Message |
| 50 | `articles-027` — Repurposing existing work into articles is legitimate and necessary | **/contact** · Section: Prefer to explore first? |
| 51 | `business-072` — Risk: Network Effects Don't Materialize | **/cookies** · Section: Cookie Policy |
| 52 | `business-073` — Risk: Quality Decline as Network Expands | **/evidence** · Section: The case that Movemental is real |
| 53 | `business-041` — Security and Compliance: HTTPS, Encryption, RBAC, GDPR-Ready | **/evidence** · Section: (no Display/Eyebrow in block) |
| 54 | `business-066` — Sustainable Content Creation: 5-Hour Week Model | **/evidence** · Section: The short version |
| 55 | `book-013` — Theological Integrity as Non-Negotiable in Christian Content | **/evidence** · Section: Compared with assembled stacks, the product is unusually integrated |
| 56 | `research-008` — The reflected-understanding analysis for Alan Hirsch flags: 'Your content is not translated into key | **/evidence** · Section: What &ldquo;integrated&rdquo; means in practice |
| 57 | `book-012` — Transparency as Trust Signal and Credibility Protection | **/evidence** · Section: The AI advantage is not "we added a chatbot" |
| 58 | `business-059` — Transparent Relationships: Network Verification Visible and Traceable | **/evidence** · Section: (no Display/Eyebrow in block) |
| 59 | `articles-035` — Uniform platform, distinct expression—one engine, different cars | **/evidence** · Section: Architecturally, this is a real platform |
| 60 | `book-015` — What Churches Are Free (and Obligated) to Do | **/evidence** · Section: Why this evidence matters |
| 61 | `C-T10` — Future vision — AI becomes a trusted knowledge graph and ministry companion | **/evidence** · Section: How we state claims |
| 62 | `C-A09` — Specialized agents preserve voice; generic AI homogenizes | **/evidence** · Section: What is still being built |
| 63 | `articles-037` — AI Book—free knowledge spine establishing shared language | **/evidence** · Section: The question is no longer whether the infrastructure can exist |
| 64 | `business-038` — Analytics: Real-Time Performance Tracking Across All Content | **/faq** · Section: Everything you'd want to ask before engaging |
| 65 | `research-049` — Before launching a leader on Movemental, a thoughtful onboarding should assess: (1) content maturity | **/faq** · Section: (no Display/Eyebrow in block) |
| 66 | `articles-033` — Certificate system with verification codes and continuing education credits | **/faq** · Section: Still have questions? |
| 67 | `articles-044` — Codification without compromise—making patterns transmissible | **/how-it-works** · LightHeroPhotoBackdrop: From scattered work to connected system |
| 68 | `business-060` — Community Features: Comments, Forums, Member Directories | **/how-it-works** · Section: (no Display/Eyebrow in block) |
| 69 | `research-047` — The founder notes: 'For movement leaders, approval of AI-affected public voice is anchored in the le | **/how-it-works** · Section: What Movemental can work with |
| 70 | `articles-029` — Content length: depth determined by intent, not arbitrary word count | **/how-it-works** · Section: What it becomes |
| 71 | `business-033` — Content Management System with Real-Time Collaborative Editing | **/how-it-works** · Section: AI inside the system, not bolted onto it |
| 72 | `articles-042` — Content pipeline preview—demo of Movemental processing your work | **/how-it-works** · Section: Built for formation, not just information |
| 73 | `book-040` — Context and Personalization as Required for Formation Work | **/how-it-works** · Section: Organizations can start small |
| 74 | `business-037` — Digital Bookstore with Stripe Integration | **/how-it-works** · Section: More than a stack of tools |
| 75 | `articles-036` — Formation Companion in courses—AI that knows the lesson, the week, the learner's context | **/how-it-works** · Section: If the work is already there, the next question is the system |
| 76 | `research-037` — The current org-site manifesto mentions 'Infrastructure: Notion + AI' but the founder notes flag thi | **/inquiry** · Section: Tell us about your organization |
| 77 | `business-043` — Geographic Expansion: English Markets First, Then Multi-Language | **/inquiry** · Section: (no Display/Eyebrow in block) |
| 78 | `business-079` — Global Expansion: 10-20 Year Horizon | **/inquiry** · Section: (no Display/Eyebrow in block) |
| 79 | `business-035` — Learning Management System: Courses with Progress Tracking and Certificates | **/knowledge-ecosystem** · Section: The knowledge ecosystem, made legible |
| 80 | `articles-055` — Multi-language support—books, articles, and AI in Spanish, Portuguese, etc. | **/knowledge-ecosystem** · Section: One ecosystem, many roles |
| 81 | `business-086` — Operational Scaling: Team Expansion With Network | **/knowledge-ecosystem** · Section: What comes online, in what order |
| 82 | `business-089` — Partnership Pathways: Institutional + Relational | **/knowledge-ecosystem** · Section: One hundred leaders as a field |
| 83 | `book-042` — Permission to Stay at Experimentation Level | **/knowledge-ecosystem** · Section: How structure reads to careful systems |
| 84 | `book-044` — Prompting as Humane Communication, Not Prompt Engineering | **/knowledge-ecosystem** · Section: Layer stack |
| 85 | `business-055` — Quality Assurance Standards: 95% + 90% + 95% | **/manifesto** · LightHeroPhotoBackdrop: A manifesto in posture, not slogans |
| 86 | `business-034` — Semantic Search and Cross-Platform Discovery | **/manifesto** · Section: Who this is for — and what promise we refuse |
| 87 | `business-071` — Speaking and Consulting Booking Integration | **/manifesto** · Section: AI as adaptive challenge — and amplifier |
| 88 | `business-036` — Video Streaming with Progress Tracking and Series Organization | **/manifesto** · Section: Non-goals |
| 89 | `business-082` — API and Third-Party Integrations (Post-MVP) | **/manifesto** · Section: What to do next |
| 90 | `business-065` — Five User Roles with Permission Levels | **/movement-leaders** · LightHeroPhotoBackdrop: For leaders whose work already moves through people |
| 91 | `C-AU01` — Movemental looks for leaders who catalyze visible, verifiable movement (transformation that multipli | **/movement-leaders** · Section: Your credibility is real. Online, it is fragmented. |
| 92 | `research-041` — Movement leaders solve for multiplication and reproduction, not institutional sustainability | **/movement-leaders** · Section: This page is for you if… |
| 93 | `articles-050` — Movemental leaders include Alan Hirsch, Brad Brisco, and emerging voices | **/movement-leaders** · Section: How qualification works |
| 94 | `research-018` — Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken thr | **/movement-leaders** · Section: What you get |
| 95 | `C-T02` — Four things hold Movemental together and are non-negotiable. | **/movement-leaders** · Section: You are not meant to publish alone |
| 96 | `book-004` — Adaptive Leadership as the Response to AI | **/movement-leaders** · Section: AI is an amplifier, not an author of your authority |
| 97 | `business-025` — The Convergence: Four Concepts That Demand Something New | **/movement-leaders** · Section: Aligned economics |
| 98 | `research-003` — Alan Hirsch's engaged audience is measured at 50,000+ (confirmed through 150,000+ APEST assessments  | **/movement-leaders** · Section: If your work already carries weight, it should have infrastructure to match |
| 99 | `C-P01` — 68% of internet users now struggle to distinguish human-created from AI-generated content. | **/movemental-at-100** · Section: What happens when 100 leaders share a system built for formation |
| 100 | `C-SP05` — Everything in one home — consolidation that surfaces and unifies the leader's existing credibility | **/movemental-at-100** · Section: Five dimensions of realized capacity |
| 101 | `research-039` — The Alan Hirsch opportunity analysis estimates $140K-$380K/year in additional revenue could be reali | **/movemental-at-100** · Section: Eight layers, each with a different shape of impact |
| 102 | `C-A10` — Scarcity is structural — curation at bounded scale is how trust, scenius, and movement survive | **/movemental-at-100** · Section: Not a simple percentage model |
| 103 | `research-046` — A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, networ | **/movemental-at-100** · Section: Order of operations matters |
| 104 | `book-031` — Relationship as Non-Negotiable Foundation | **/movemental-at-100** · Section: Translation multiplies the entire system |
| 105 | `book-006` — Why Movement Leaders Were Right to Ignore SEO Until Now | **/movemental-at-100** · Section: At 100 leaders, the system compounds |
| 106 | `business-083` — Continuous Learning: Improvement Built Into Culture | **/movemental-at-100** · Section: What this adds up to |
| 107 | `C-PR01` — Movemental is built by movement leaders, for movement leaders. | **/movemental-at-100** · Section: If your work is meant to form people, it needs a system |
| 108 | `articles-054` — AI amplifies both crisis and opportunity—credibility becomes central | **/nonprofits** · LightHeroPhotoBackdrop: Turn your mission into a system people can actually move through |
| 109 | `research-016` — Alan Hirsch's integrated intellectual architecture moves from Christology (who Christ is and what He | **/nonprofits** · Section: We install the systems your organization should already have—but often does not |
| 110 | `book-024` — From Gutenberg to Networks of Trust | **/nonprofits** · Section: Most nonprofit digital stacks were not built for formation |
| 111 | `book-034` — Why Expertise Is Hard-Won and Worth Preserving | **/nonprofits** · Section: You do not need more content production |
| 112 | `book-043` — Look for Love: Markers of Credible AI Guidance | **/nonprofits** · Section: A connected system for mission-shaped organizations |
| 113 | `C-A08` — Content that transforms vs. content that extracts — an ethical distinction | **/nonprofits** · Section: Formation and sustainability are not separate problems |
| 114 | `C-P04` — Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church mu | **/nonprofits** · Section: Not another tool in the stack |
| 115 | `C-SP04` — Network amplification multiplies reach 28×–500× — the five multiplier effects | **/nonprofits** · Section: AI that serves your mission, not generic automation |
| 116 | `C-T01` — The Christocentric spine — Jesus at the center is load-bearing, not decorative | **/nonprofits** · Section: Best fit for organizations that… |
| 117 | `articles-040` — The stakes are spiritual and generational, not just personal efficiency | **/nonprofits** · Section: If your mission depends on people changing over time, you need more than a website |
| 118 | `business-009` — Formation Must Accompany Amplification | **/** · LightHeroPhotoBackdrop: The system for people who form others |
| 119 | `business-080` — What Moves Movemental: Movement Multiplication, Not Profit Maximization | **/** · MidnightHeroPhotoBackdrop: The work is real. The system is missing. |
| 120 | `research-001` — Movement leaders are seminary-trained reformers stuck between institution and mission | **/** · Section: Formation without infrastructure doesn't scale |
| 121 | `research-002` — A second major persona is the multiplication leader—church planters, bivocational pioneers, and netw | **/** · Section: Who Movemental is for |
| 122 | `C-A02` — Credibility differs from influence — measurable but not reducible to a metric | **/** · Section: The real audience |
| 123 | `business-007` — Credibility: Trust + Expertise + Character + Platform | **/** · BookEndorsementsFeatured: Book endorsements rail |
| 124 | `C-BM01` — For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform  | **/** · Section: A system for your entire body of work |
| 125 | `C-P03` — The false choice — traditional publisher or rental platform, both extractive, neither sustainable | **/** · Section: From scattered work to connected system |
| 126 | `C-POS06` — Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck | **/** · Section: What this enables |
| 127 | `book-021` — Not a Technical Manual, Manifesto, or Sales Pitch | **/** · Section: Not another tool |
| 128 | `book-049` — The Three-Section Structure: Crisis, Response, Demonstration | **/** · Section: Aligned economics |
| 129 | `business-076` — Built on Movemental Theology: APEST, mDNA, Incarnational Mission | **/** · Section: Built from real depth—not generic software ambition |
| 130 | `research-017` — Michael Frost and Alan Hirsch co-authored 'The Shaping of Things to Come' (2003), which introduced t | **/** · Section: Non-negotiables |
| 131 | `research-019` — Rick Warren's 'The Purpose Driven Life' has sold 30+ million copies in 85+ languages, making it one  | **/** · Section: What everything is oriented around |
| 132 | `research-020` — Movement leader cohort is academically credible and seminary-integrated | **/** · Section: If your work is meant to last, it needs a system |
| 133 | `research-038` — Founder insight: manifesto may be low-trust slop—candidate for rewrite or demotion | **/platform** · LightHeroPhotoBackdrop: What Movemental is — as a system, not a slogan |
| 134 | `C-T03` — Embodied ministry cannot be automated — digital supports presence, never replaces it | **/platform** · Section: Layered mental model |
| 135 | `articles-047` — Communitas through shared risk and mission, not comfort | **/platform** · Section: Built together vs turnkey fantasy |
| 136 | `business-001` — Technology Properly Ordered to Serve Mission | **/platform** · Section: Honest bounds |
| 137 | `business-058` — What Breaks Company If Ignored: Five Non-Negotiables | **/platform** · Section: Three sensible doors |
| 138 | `research-036` — Exponential, Verge, and Missio Alliance events: movement leader ecosystem is visible and organized | **/pricing** · Section: Aligned economics, not extraction |
| 139 | `C-POS01` — Movement infrastructure for a credibility-scarce age — not a website, not another SaaS | **/pricing** · Section: Two ways to work with Movemental |
| 140 | `business-003` — The Formation Crisis: Growth Over Substance | **/pricing** · Section: You keep 90%. Movemental takes 10%. |
| 141 | `business-052` — vs. Digital Platforms (Substack/Patreon): Ownership Matters | **/pricing** · Section: Economics in one view |
| 142 | `research-022` — The founder preference: show that all these groups are served, without hierarchy in public copy. | **/pricing** · Section: Why this model is different |
| 143 | `research-027` — The founder clarifies: archetypes mentioned (Alan Hirsch, Brad Brisco) are not just 'authors and spe | **/pricing** · Section: Focused 4-week builds |
| 144 | `research-030` — Context matters: Western church fragmentation, AI disruption, and capacity gaps create urgent need | **/pricing** · Section: How engagement works |
| 145 | `C-A04` — The guide posture — authority comes from sustained grappling, not from having figured it out | **/pricing** · Section: What you are paying for |
| 146 | `articles-039` — Ownership is stewardship, not empire—responsibility, not dominance | **/pricing** · Section: If the work matters, the economics should make sense |
| 147 | `book-002` — The Tension: Using the Tool That Created the Problem | **/privacy** · Section: Privacy Policy |
| 148 | `book-003` — AI Is an Anthropological Problem, Not a Technological One | **/services/discovery-lab** · Section: Discovery Lab |
| 149 | `book-005` — Speed of Adoption and Dunning-Kruger With AI | **/services/discovery-lab** · Section: The problem it solves |
| 150 | `book-016` — What AI Displaces: Relationship, Prayer, Embodiment, Presence, Formation | **/services/discovery-lab** · Section: What gets built (process view) |
| 151 | `book-033` — Research on AI Trust and Credibility Crisis | **/services/discovery-lab** · Section: Why this matters |
| 152 | `book-045` — The Book as Companionship in Uncertainty | **/services/discovery-lab** · Section: Best fit for organizations that… |
| 153 | `research-023` — Org site purpose is to make work visible and legitimate as leaders sign up | **/services/discovery-lab** · Section: If AI is already changing the environment, your organization needs more than awareness |
| 154 | `research-040` — Women are 18% of 146 scored movement leader candidates—gender gap in visibility and network | **/services/organizational-systems** · Section: Your organizational vision and vocation does not need to change. |
| 155 | `research-048` — Founder preference: show work visible, not declare primary audience—let leaders choose whom to serve | **/services/organizational-systems** · Section: What is actually happening |
| 156 | `C-A11` — Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing | **/services/organizational-systems** · Section: Organizational systems vs movement-leader platform |
| 157 | `C-P02` — Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizatio | **/services/organizational-systems** · Section: Explore modular builds |
| 158 | `C-SP07` — The first cohort defines the brand — early leaders are co-creators, not customers | **/services** · LightHeroPhotoBackdrop: Your work was never meant to live in books, PDFs, and scattered content |
| 159 | `articles-046` — Incoherence reads as instability—coherence is formation requirement | **/services** · Section: The static reality (often) |
| 160 | `business-075` — Economic Justice: Fair Exchange, Not Extraction | **/services** · Section: Two tracks — same posture |
| 161 | `articles-026` — Isolation makes structural problems feel normal | **/services** · Section: Modular sprint map (preview) |
| 162 | `research-010` — Movemental is not a publishing house or SaaS—it's a venture-builder studio with aligned incentives | **/services** · Section: Investment range |
| 163 | `business-018` — Revolutionary Pricing: $1,000 + 10% vs. Industry Standard | **/services** · Section: Tell us what you are trying to protect |
| 164 | `business-019` — Platform Ownership: Not Rental, Complete Control | **/services/system-builds/content** · Section: Content System Build |
| 165 | `research-021` — The founder notes state: 'Primary customer today: individual movement leaders (relationship/word-of- | **/services/system-builds/content** · Section: The problem it solves |
| 166 | `research-050` — Alan Hirsch's network isn't scattered—it's coherent. | **/services/system-builds/content** · Section: Why this matters |
| 167 | `book-047` — Theological Anthropology: What Happens to Human Vocation in an AI Age | **/services/system-builds/content** · Section: Where this sits in a pathway |
| 168 | `research-005` — The founder notes emphasize this clearly: movement leaders live under genuine time and attention con | **/services/system-builds/content** · Section: Best fit for organizations that… |
| 169 | `research-029` — You remain the leader, not the operator—Movemental handles infrastructure so you focus on movement | **/services/system-builds/content** · Section: If your organization already has the knowledge, the next step is structure |
| 170 | `research-033` — Social-to-email conversion is leaving 70-80% of audience on the table | **/services/system-builds/foundation** · Section: Clarity where it matters most |
| 171 | `business-051` — vs. Traditional Publishers: Ownership + Speed + Economics | **/services/system-builds/foundation** · Section: Governance vs ethics |
| 172 | `business-053` — vs. WordPress/Squarespace: Network Effects | **/services/system-builds/foundation** · Section: Sprint-end artifacts (illustrative) |
| 173 | `business-054` — vs. Custom Development: Speed, Cost, Network | **/services/system-builds/foundation** · Section: Up to the hub — or into discovery |

### Claim-by-claim drift (all 173 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `articles-013` | yes | 69% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Eight-week formation scaffold with four non-negotiable necessities |
| 2 | `book-018` | yes | 70% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The 70/30 Rule: Sustainable Content Creation Model |
| 3 | `C-F01` | yes | 90% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA |
| 4 | `business-032` | yes | 79% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 22 Specialized AI Agents Trained on Movemental Theology |
| 5 | `articles-017` | yes | 75% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Evergreen article architecture with nine sections and voice markers |
| 6 | `C-PR02` | yes | 81% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user management, content, media, e-commerce,… |
| 7 | `articles-019` | yes | 83% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI used as editing gate, not content creator |
| 8 | `C-A03` | yes | 76% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Amplification, not replacement — the AI control boundary for voice, insight, and authority |
| 9 | `C-F05` | yes | 69% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The movemental-analysis documents for multiple leaders identify the same opportunity: existing embodied work (talks, teaching, training) can… |
| 10 | `articles-015` | yes | 71% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Pathways as formation journeys, not topic pages |
| 11 | `articles-030` | yes | 80% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI Lab with context awareness from personality to formation goals |
| 12 | `C-F10` | yes | 82% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Five-stage AI maturity model — from native awareness to mature public leadership |
| 13 | `articles-025` | yes | 63% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Corpus extraction to calibrate AI voice—not guessing, measuring |
| 14 | `articles-052` | yes | 83% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Voice fidelity scoring for AI-drafted content |
| 15 | `business-049` | yes | 79% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Voice Baseline System: Fingerprinting and Consistency |
| 16 | `articles-016` | yes | 72% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Pillar-cluster architecture for topical authority and AI citation |
| 17 | `articles-018` | yes | 74% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** GEO (Generative Engine Optimization) complements SEO |
| 18 | `articles-034` | yes | 78% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** EEAT as the foundation for discoverability in search and AI |
| 19 | `articles-032` | yes | 68% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Assessment engine for APEST, mDNA, maturity, vocational calling |
| 20 | `C-F09` | yes | 87% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** For organizational partners (nonprofits, churches, denominations), Movemental offers five modular system builds. |
| 21 | `C-F03` | yes | 81% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Multi-tenant platform architecture — one codebase serves many leader sites |
| 22 | `business-045` | yes | 76% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Why Movemental Can Underprice: AI-Powered Development Cost Curve |
| 23 | `C-A01` | yes | 84% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Scenius (Brian Eno's term for collaborative genius emerging from creative networks) is the primary mechanism for credibility in the AI age. |
| 24 | `book-035` | yes | 85% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Type-Safety Chain as Technical Alignment With Values |
| 25 | `business-063` | yes | 76% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 12-Week Onboarding: Platform Deployment + Voice Capture + Strategy |
| 26 | `articles-048` |  | 62% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 30/60/90 day plan and commissioning liturgy—sending, not graduation |
| 27 | `articles-011` |  | 71% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Formation goals and spiritual discernment tracking—unique to Movemental |
| 28 | `business-031` |  | 84% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Three-Layer Maturity Model: mDNA > Leadership > Content |
| 29 | `C-A07` |  | 77% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Slowing down as resistance — AI can enable pace, not just acceleration |
| 30 | `C-S30` |  | 63% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch's core theological positioning, per the reflected understanding: 'You're called to reactivate what's latent. |
| 31 | `C-A06` |  | 66% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** This moment is different — AI's speed, the accelerating crisis, and the closing window |
| 32 | `C-A05` |  | 81% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Refusal as love — what AI must not do, framed as protection of the sacred |
| 33 | `C-PR04` |  | 78% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional work) demonstrated in practice the frame… |
| 34 | `articles-020` |  | 61% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI as furnace needs a hearth—not savior, not threat |
| 35 | `research-025` |  | 72% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Alan Hirsch opportunity analysis identifies: '150,000+ APEST assessment takers currently leave after seeing results. |
| 36 | `research-034` |  | 72% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** For Alan Hirsch specifically, but applicable to others: content already exists (38+ videos) across 20+ third-party platforms (conference rec… |
| 37 | `business-069` |  | 87% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content Strategy Framework: Five Narrative Frames |
| 38 | `articles-049` |  | 80% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Curation over growth—maintaining relational credibility at bounded scale |
| 39 | `business-029` |  | 77% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Execution Path: 100-Leader Scenius Network |
| 40 | `book-010` |  | 69% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Experimentation as Prerequisite to Discernment |
| 41 | `business-042` |  | 85% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Go-To-Market: Invitation-Only, Relationship-Based Growth |
| 42 | `business-081` |  | 82% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Iterative Roadmap: Feedback-Driven, Not Feature-Driven |
| 43 | `book-037` |  | 77% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Leaders Don't Need Technical Expertise to Lead With AI |
| 44 | `business-088` |  | 81% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Metrics and Signals: What Success Actually Looks Like |
| 45 | `research-035` |  | 57% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Missing audiobooks as revenue and access stream—most flagship titles have no audio version |
| 46 | `business-016` |  | 76% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** MVP Definition: Core Value Over Feature Completeness |
| 47 | `business-077` |  | 75% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Qualification Gate: mDNA Foundation Required |
| 48 | `business-078` |  | 72% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Qualification Gate: Visible Movement Impact Required |
| 49 | `articles-038` |  | 60% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Recommended learning journey: spiral through five theological portals |
| 50 | `articles-027` |  | 74% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Repurposing existing work into articles is legitimate and necessary |
| 51 | `business-072` |  | 74% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Risk: Network Effects Don't Materialize |
| 52 | `business-073` |  | 67% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Risk: Quality Decline as Network Expands |
| 53 | `business-041` |  | 66% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Security and Compliance: HTTPS, Encryption, RBAC, GDPR-Ready |
| 54 | `business-066` |  | 78% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Sustainable Content Creation: 5-Hour Week Model |
| 55 | `book-013` |  | 85% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Theological Integrity as Non-Negotiable in Christian Content |
| 56 | `research-008` |  | 68% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The reflected-understanding analysis for Alan Hirsch flags: 'Your content is not translated into key languages—including those with large po… |
| 57 | `book-012` |  | 72% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Transparency as Trust Signal and Credibility Protection |
| 58 | `business-059` |  | 75% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Transparent Relationships: Network Verification Visible and Traceable |
| 59 | `articles-035` |  | 79% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Uniform platform, distinct expression—one engine, different cars |
| 60 | `book-015` |  | 77% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What Churches Are Free (and Obligated) to Do |
| 61 | `C-T10` |  | 80% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Future vision — AI becomes a trusted knowledge graph and ministry companion |
| 62 | `C-A09` |  | 72% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Specialized agents preserve voice; generic AI homogenizes |
| 63 | `articles-037` |  | 71% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI Book—free knowledge spine establishing shared language |
| 64 | `business-038` |  | 80% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Analytics: Real-Time Performance Tracking Across All Content |
| 65 | `research-049` |  | 84% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Before launching a leader on Movemental, a thoughtful onboarding should assess: (1) content maturity (how much existing content is there to… |
| 66 | `articles-033` |  | 61% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Certificate system with verification codes and continuing education credits |
| 67 | `articles-044` |  | 72% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Codification without compromise—making patterns transmissible |
| 68 | `business-060` |  | 73% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Community Features: Comments, Forums, Member Directories |
| 69 | `research-047` |  | 79% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder notes: 'For movement leaders, approval of AI-affected public voice is anchored in the leader (and their process)—detail TBD when… |
| 70 | `articles-029` |  | 72% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content length: depth determined by intent, not arbitrary word count |
| 71 | `business-033` |  | 64% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content Management System with Real-Time Collaborative Editing |
| 72 | `articles-042` |  | 74% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content pipeline preview—demo of Movemental processing your work |
| 73 | `book-040` |  | 79% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Context and Personalization as Required for Formation Work |
| 74 | `business-037` |  | 74% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Digital Bookstore with Stripe Integration |
| 75 | `articles-036` |  | 85% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Formation Companion in courses—AI that knows the lesson, the week, the learner's context |
| 76 | `research-037` |  | 67% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The current org-site manifesto mentions 'Infrastructure: Notion + AI' but the founder notes flag this as a placeholder example, not a commit… |
| 77 | `business-043` |  | 56% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Geographic Expansion: English Markets First, Then Multi-Language |
| 78 | `business-079` |  | 51% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Global Expansion: 10-20 Year Horizon |
| 79 | `business-035` |  | 84% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Learning Management System: Courses with Progress Tracking and Certificates |
| 80 | `articles-055` |  | 73% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Multi-language support—books, articles, and AI in Spanish, Portuguese, etc. |
| 81 | `business-086` |  | 68% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Operational Scaling: Team Expansion With Network |
| 82 | `business-089` |  | 62% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Partnership Pathways: Institutional + Relational |
| 83 | `book-042` |  | 78% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Permission to Stay at Experimentation Level |
| 84 | `book-044` |  | 69% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Prompting as Humane Communication, Not Prompt Engineering |
| 85 | `business-055` |  | 75% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Quality Assurance Standards: 95% + 90% + 95% |
| 86 | `business-034` |  | 81% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Semantic Search and Cross-Platform Discovery |
| 87 | `business-071` |  | 78% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Speaking and Consulting Booking Integration |
| 88 | `business-036` |  | 70% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Video Streaming with Progress Tracking and Series Organization |
| 89 | `business-082` |  | 78% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** API and Third-Party Integrations (Post-MVP) |
| 90 | `business-065` |  | 85% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Five User Roles with Permission Levels |
| 91 | `C-AU01` |  | 78% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movemental looks for leaders who catalyze visible, verifiable movement (transformation that multiplies beyond direct oversight), not just pl… |
| 92 | `research-041` |  | 69% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movement leaders solve for multiplication and reproduction, not institutional sustainability |
| 93 | `articles-050` |  | 63% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movemental leaders include Alan Hirsch, Brad Brisco, and emerging voices |
| 94 | `research-018` |  | 57% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken through Hirsch's platforms, making it a sig… |
| 95 | `C-T02` |  | 86% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Four things hold Movemental together and are non-negotiable. |
| 96 | `book-004` |  | 68% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Adaptive Leadership as the Response to AI |
| 97 | `business-025` |  | 75% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Convergence: Four Concepts That Demand Something New |
| 98 | `research-003` |  | 69% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch's engaged audience is measured at 50,000+ (confirmed through 150,000+ APEST assessments taken). |
| 99 | `C-P01` |  | 71% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 68% of internet users now struggle to distinguish human-created from AI-generated content. |
| 100 | `C-SP05` |  | 72% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Everything in one home — consolidation that surfaces and unifies the leader's existing credibility |
| 101 | `research-039` |  | 57% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Alan Hirsch opportunity analysis estimates $140K-$380K/year in additional revenue could be realized through: (1) scaled online courses o… |
| 102 | `C-A10` |  | 79% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Scarcity is structural — curation at bounded scale is how trust, scenius, and movement survive |
| 103 | `research-046` |  | 65% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, network, hybrid, digital, denominational, inde… |
| 104 | `book-031` |  | 89% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Relationship as Non-Negotiable Foundation |
| 105 | `book-006` |  | 63% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Why Movement Leaders Were Right to Ignore SEO Until Now |
| 106 | `business-083` |  | 77% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Continuous Learning: Improvement Built Into Culture |
| 107 | `C-PR01` |  | 87% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movemental is built by movement leaders, for movement leaders. |
| 108 | `articles-054` |  | 68% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI amplifies both crisis and opportunity—credibility becomes central |
| 109 | `research-016` |  | 78% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch's integrated intellectual architecture moves from Christology (who Christ is and what He inaugurated) through Missiology (the Ch… |
| 110 | `book-024` |  | 66% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** From Gutenberg to Networks of Trust |
| 111 | `book-034` |  | 67% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Why Expertise Is Hard-Won and Worth Preserving |
| 112 | `book-043` |  | 67% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Look for Love: Markers of Credible AI Guidance |
| 113 | `C-A08` |  | 72% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content that transforms vs. content that extracts — an ethical distinction |
| 114 | `C-P04` |  | 74% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church multiplication' may not land on Alan Hirsc… |
| 115 | `C-SP04` |  | 79% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Network amplification multiplies reach 28×–500× — the five multiplier effects |
| 116 | `C-T01` |  | 56% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Christocentric spine — Jesus at the center is load-bearing, not decorative |
| 117 | `articles-040` |  | 74% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The stakes are spiritual and generational, not just personal efficiency |
| 118 | `business-009` |  | 79% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Formation Must Accompany Amplification |
| 119 | `business-080` |  | 74% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What Moves Movemental: Movement Multiplication, Not Profit Maximization |
| 120 | `research-001` |  | 73% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movement leaders are seminary-trained reformers stuck between institution and mission |
| 121 | `research-002` |  | 65% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** A second major persona is the multiplication leader—church planters, bivocational pioneers, and network strategists who think in terms of re… |
| 122 | `C-A02` |  | 75% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Credibility differs from influence — measurable but not reducible to a metric |
| 123 | `business-007` |  | 58% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Credibility: Trust + Expertise + Character + Platform |
| 124 | `C-BM01` |  | 84% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform ownership creates long-term asset buildi… |
| 125 | `C-P03` |  | 75% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The false choice — traditional publisher or rental platform, both extractive, neither sustainable |
| 126 | `C-POS06` |  | 77% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck |
| 127 | `book-021` |  | 79% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Not a Technical Manual, Manifesto, or Sales Pitch |
| 128 | `book-049` |  | 67% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Three-Section Structure: Crisis, Response, Demonstration |
| 129 | `business-076` |  | 78% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Built on Movemental Theology: APEST, mDNA, Incarnational Mission |
| 130 | `research-017` |  | 67% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Michael Frost and Alan Hirsch co-authored 'The Shaping of Things to Come' (2003), which introduced the mDNA (missional DNA) framework and be… |
| 131 | `research-019` |  | 65% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Rick Warren's 'The Purpose Driven Life' has sold 30+ million copies in 85+ languages, making it one of the best-selling books in history. |
| 132 | `research-020` |  | 63% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movement leader cohort is academically credible and seminary-integrated |
| 133 | `research-038` |  | 77% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Founder insight: manifesto may be low-trust slop—candidate for rewrite or demotion |
| 134 | `C-T03` |  | 80% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Embodied ministry cannot be automated — digital supports presence, never replaces it |
| 135 | `articles-047` |  | 77% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Communitas through shared risk and mission, not comfort |
| 136 | `business-001` |  | 81% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Technology Properly Ordered to Serve Mission |
| 137 | `business-058` |  | 74% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What Breaks Company If Ignored: Five Non-Negotiables |
| 138 | `research-036` |  | 53% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Exponential, Verge, and Missio Alliance events: movement leader ecosystem is visible and organized |
| 139 | `C-POS01` |  | 66% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movement infrastructure for a credibility-scarce age — not a website, not another SaaS |
| 140 | `business-003` |  | 76% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Formation Crisis: Growth Over Substance |
| 141 | `business-052` |  | 79% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. Digital Platforms (Substack/Patreon): Ownership Matters |
| 142 | `research-022` |  | 73% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder preference: show that all these groups are served, without hierarchy in public copy. |
| 143 | `research-027` |  | 60% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder clarifies: archetypes mentioned (Alan Hirsch, Brad Brisco) are not just 'authors and speakers'—definition is broader. |
| 144 | `research-030` |  | 87% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Context matters: Western church fragmentation, AI disruption, and capacity gaps create urgent need |
| 145 | `C-A04` |  | 71% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The guide posture — authority comes from sustained grappling, not from having figured it out |
| 146 | `articles-039` |  | 71% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Ownership is stewardship, not empire—responsibility, not dominance |
| 147 | `book-002` |  | 66% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Tension: Using the Tool That Created the Problem |
| 148 | `book-003` |  | 74% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI Is an Anthropological Problem, Not a Technological One |
| 149 | `book-005` |  | 60% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Speed of Adoption and Dunning-Kruger With AI |
| 150 | `book-016` |  | 66% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What AI Displaces: Relationship, Prayer, Embodiment, Presence, Formation |
| 151 | `book-033` |  | 51% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Research on AI Trust and Credibility Crisis |
| 152 | `book-045` |  | 52% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Book as Companionship in Uncertainty |
| 153 | `research-023` |  | 83% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Org site purpose is to make work visible and legitimate as leaders sign up |
| 154 | `research-040` |  | 53% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Women are 18% of 146 scored movement leader candidates—gender gap in visibility and network |
| 155 | `research-048` |  | 70% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Founder preference: show work visible, not declare primary audience—let leaders choose whom to serve |
| 156 | `C-A11` |  | 79% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing |
| 157 | `C-P02` |  | 69% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizations, teaching at 4 seminaries, and speaki… |
| 158 | `C-SP07` |  | 71% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The first cohort defines the brand — early leaders are co-creators, not customers |
| 159 | `articles-046` |  | 79% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Incoherence reads as instability—coherence is formation requirement |
| 160 | `business-075` |  | 85% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Economic Justice: Fair Exchange, Not Extraction |
| 161 | `articles-026` |  | 73% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Isolation makes structural problems feel normal |
| 162 | `research-010` |  | 72% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movemental is not a publishing house or SaaS—it's a venture-builder studio with aligned incentives |
| 163 | `business-018` |  | 84% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Revolutionary Pricing: $1,000 + 10% vs. Industry Standard |
| 164 | `business-019` |  | 85% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Platform Ownership: Not Rental, Complete Control |
| 165 | `research-021` |  | 72% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder notes state: 'Primary customer today: individual movement leaders (relationship/word-of-mouth is the real acquisition path). |
| 166 | `research-050` |  | 64% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch's network isn't scattered—it's coherent. |
| 167 | `book-047` |  | 66% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Theological Anthropology: What Happens to Human Vocation in an AI Age |
| 168 | `research-005` |  | 76% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder notes emphasize this clearly: movement leaders live under genuine time and attention constraints. |
| 169 | `research-029` |  | 79% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** You remain the leader, not the operator—Movemental handles infrastructure so you focus on movement |
| 170 | `research-033` |  | 82% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Social-to-email conversion is leaving 70-80% of audience on the table |
| 171 | `business-051` |  | 84% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. Traditional Publishers: Ownership + Speed + Economics |
| 172 | `business-053` |  | 79% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. WordPress/Squarespace: Network Effects |
| 173 | `business-054` |  | 81% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. Custom Development: Speed, Cost, Network |

---
## Tab: pricing

**Mapped React files:**
- `src/app/(site)/pricing/page.tsx` → /pricing

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 173 |
| Heuristic block count | 9 |
| Ordered layout spine blocks | 9 |
| 1:1 pairing depth for sub-table | 9 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 6 |
| Partial | 71 |
| Weak | 96 |

### 1:1 rank ↔ layout spine (first 9 of 173 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `business-018` — Revolutionary Pricing: $1,000 + 10% vs. Industry Standard | **/pricing** · Section: Aligned economics, not extraction |
| 2 | `C-BM01` — For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform  | **/pricing** · Section: Two ways to work with Movemental |
| 3 | `business-051` — vs. Traditional Publishers: Ownership + Speed + Economics | **/pricing** · Section: You keep 90%. Movemental takes 10%. |
| 4 | `business-052` — vs. Digital Platforms (Substack/Patreon): Ownership Matters | **/pricing** · Section: Economics in one view |
| 5 | `business-053` — vs. WordPress/Squarespace: Network Effects | **/pricing** · Section: Why this model is different |
| 6 | `business-054` — vs. Custom Development: Speed, Cost, Network | **/pricing** · Section: Focused 4-week builds |
| 7 | `C-POS06` — Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck | **/pricing** · Section: How engagement works |
| 8 | `business-019` — Platform Ownership: Not Rental, Complete Control | **/pricing** · Section: What you are paying for |
| 9 | `C-A11` — Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing | **/pricing** · Section: If the work matters, the economics should make sense |
| … | _Claims 10–173: no same-index layout block (argument list longer than layout spine)._ | |

### Claim-by-claim drift (all 173 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `business-018` | yes | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Revolutionary Pricing: $1,000 + 10% vs. Industry Standard |
| 2 | `C-BM01` | yes | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform ownership creates long-term asset buildi… |
| 3 | `business-051` | yes | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** vs. Traditional Publishers: Ownership + Speed + Economics |
| 4 | `business-052` | yes | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. Digital Platforms (Substack/Patreon): Ownership Matters |
| 5 | `business-053` | yes | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** vs. WordPress/Squarespace: Network Effects |
| 6 | `business-054` | yes | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** vs. Custom Development: Speed, Cost, Network |
| 7 | `C-POS06` | yes | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck |
| 8 | `business-019` | yes | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Platform Ownership: Not Rental, Complete Control |
| 9 | `C-A11` | yes | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing |
| 10 | `C-A10` | yes | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Scarcity is structural — curation at bounded scale is how trust, scenius, and movement survive |
| 11 | `business-075` | yes | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Economic Justice: Fair Exchange, Not Extraction |
| 12 | `C-P03` | yes | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The false choice — traditional publisher or rental platform, both extractive, neither sustainable |
| 13 | `business-045` | yes | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Movemental Can Underprice: AI-Powered Development Cost Curve |
| 14 | `business-042` | yes | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Go-To-Market: Invitation-Only, Relationship-Based Growth |
| 15 | `research-039` | yes | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Alan Hirsch opportunity analysis estimates $140K-$380K/year in additional revenue could be realized through: (1) scaled online courses o… |
| 16 | `research-021` | yes | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes state: 'Primary customer today: individual movement leaders (relationship/word-of-mouth is the real acquisition path). |
| 17 | `C-A02` | yes | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Credibility differs from influence — measurable but not reducible to a metric |
| 18 | `business-007` | yes | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Credibility: Trust + Expertise + Character + Platform |
| 19 | `research-010` | yes | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental is not a publishing house or SaaS—it's a venture-builder studio with aligned incentives |
| 20 | `book-006` | yes | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Why Movement Leaders Were Right to Ignore SEO Until Now |
| 21 | `business-071` | yes | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Speaking and Consulting Booking Integration |
| 22 | `articles-017` | yes | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Evergreen article architecture with nine sections and voice markers |
| 23 | `articles-035` | yes | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Uniform platform, distinct expression—one engine, different cars |
| 24 | `business-088` | yes | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Metrics and Signals: What Success Actually Looks Like |
| 25 | `articles-040` | yes | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The stakes are spiritual and generational, not just personal efficiency |
| 26 | `business-025` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Convergence: Four Concepts That Demand Something New |
| 27 | `C-F03` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Multi-tenant platform architecture — one codebase serves many leader sites |
| 28 | `business-016` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** MVP Definition: Core Value Over Feature Completeness |
| 29 | `business-081` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Iterative Roadmap: Feedback-Driven, Not Feature-Driven |
| 30 | `business-037` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Digital Bookstore with Stripe Integration |
| 31 | `articles-046` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Incoherence reads as instability—coherence is formation requirement |
| 32 | `research-001` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement leaders are seminary-trained reformers stuck between institution and mission |
| 33 | `research-041` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement leaders solve for multiplication and reproduction, not institutional sustainability |
| 34 | `research-046` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, network, hybrid, digital, denominational, inde… |
| 35 | `articles-026` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Isolation makes structural problems feel normal |
| 36 | `articles-032` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Assessment engine for APEST, mDNA, maturity, vocational calling |
| 37 | `research-035` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Missing audiobooks as revenue and access stream—most flagship titles have no audio version |
| 38 | `business-083` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Continuous Learning: Improvement Built Into Culture |
| 39 | `C-AU01` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental looks for leaders who catalyze visible, verifiable movement (transformation that multiplies beyond direct oversight), not just pl… |
| 40 | `C-P01` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** 68% of internet users now struggle to distinguish human-created from AI-generated content. |
| 41 | `C-SP05` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Everything in one home — consolidation that surfaces and unifies the leader's existing credibility |
| 42 | `articles-020` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI as furnace needs a hearth—not savior, not threat |
| 43 | `articles-037` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Book—free knowledge spine establishing shared language |
| 44 | `C-F01` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA |
| 45 | `C-F05` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The movemental-analysis documents for multiple leaders identify the same opportunity: existing embodied work (talks, teaching, training) can… |
| 46 | `articles-013` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Eight-week formation scaffold with four non-negotiable necessities |
| 47 | `articles-015` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Pathways as formation journeys, not topic pages |
| 48 | `book-005` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Speed of Adoption and Dunning-Kruger With AI |
| 49 | `book-045` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Book as Companionship in Uncertainty |
| 50 | `business-066` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Sustainable Content Creation: 5-Hour Week Model |
| 51 | `research-025` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Alan Hirsch opportunity analysis identifies: '150,000+ APEST assessment takers currently leave after seeing results. |
| 52 | `C-A01` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Scenius (Brian Eno's term for collaborative genius emerging from creative networks) is the primary mechanism for credibility in the AI age. |
| 53 | `C-A06` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** This moment is different — AI's speed, the accelerating crisis, and the closing window |
| 54 | `book-004` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Adaptive Leadership as the Response to AI |
| 55 | `business-009` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Formation Must Accompany Amplification |
| 56 | `C-A08` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content that transforms vs. content that extracts — an ethical distinction |
| 57 | `C-T01` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Christocentric spine — Jesus at the center is load-bearing, not decorative |
| 58 | `C-T02` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Four things hold Movemental together and are non-negotiable. |
| 59 | `business-080` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What Moves Movemental: Movement Multiplication, Not Profit Maximization |
| 60 | `C-A05` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Refusal as love — what AI must not do, framed as protection of the sacred |
| 61 | `articles-019` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI used as editing gate, not content creator |
| 62 | `book-015` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** What Churches Are Free (and Obligated) to Do |
| 63 | `research-027` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The founder clarifies: archetypes mentioned (Alan Hirsch, Brad Brisco) are not just 'authors and speakers'—definition is broader. |
| 64 | `C-T10` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Future vision — AI becomes a trusted knowledge graph and ministry companion |
| 65 | `business-038` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Analytics: Real-Time Performance Tracking Across All Content |
| 66 | `business-049` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Voice Baseline System: Fingerprinting and Consistency |
| 67 | `business-055` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Quality Assurance Standards: 95% + 90% + 95% |
| 68 | `business-082` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** API and Third-Party Integrations (Post-MVP) |
| 69 | `C-POS01` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement infrastructure for a credibility-scarce age — not a website, not another SaaS |
| 70 | `business-003` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Formation Crisis: Growth Over Substance |
| 71 | `research-022` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder preference: show that all these groups are served, without hierarchy in public copy. |
| 72 | `research-030` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Context matters: Western church fragmentation, AI disruption, and capacity gaps create urgent need |
| 73 | `C-F09` |  | 45% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** For organizational partners (nonprofits, churches, denominations), Movemental offers five modular system builds. |
| 74 | `C-F10` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Five-stage AI maturity model — from native awareness to mature public leadership |
| 75 | `C-P02` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizations, teaching at 4 seminaries, and speaki… |
| 76 | `C-P04` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church multiplication' may not land on Alan Hirsc… |
| 77 | `C-SP04` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Network amplification multiplies reach 28×–500× — the five multiplier effects |
| 78 | `C-SP07` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The first cohort defines the brand — early leaders are co-creators, not customers |
| 79 | `research-002` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** A second major persona is the multiplication leader—church planters, bivocational pioneers, and network strategists who think in terms of re… |
| 80 | `research-003` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's engaged audience is measured at 50,000+ (confirmed through 150,000+ APEST assessments taken). |
| 81 | `articles-055` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Multi-language support—books, articles, and AI in Spanish, Portuguese, etc. |
| 82 | `business-033` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content Management System with Real-Time Collaborative Editing |
| 83 | `business-035` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Learning Management System: Courses with Progress Tracking and Certificates |
| 84 | `business-089` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Partnership Pathways: Institutional + Relational |
| 85 | `C-T03` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Embodied ministry cannot be automated — digital supports presence, never replaces it |
| 86 | `articles-027` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Repurposing existing work into articles is legitimate and necessary |
| 87 | `articles-030` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI Lab with context awareness from personality to formation goals |
| 88 | `articles-038` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Recommended learning journey: spiral through five theological portals |
| 89 | `articles-047` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Communitas through shared risk and mission, not comfort |
| 90 | `book-010` |  | 0% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Experimentation as Prerequisite to Discernment |
| 91 | `book-037` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Leaders Don't Need Technical Expertise to Lead With AI |
| 92 | `business-001` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Technology Properly Ordered to Serve Mission |
| 93 | `business-029` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Execution Path: 100-Leader Scenius Network |
| 94 | `business-031` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Three-Layer Maturity Model: mDNA > Leadership > Content |
| 95 | `business-032` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** 22 Specialized AI Agents Trained on Movemental Theology |
| 96 | `business-058` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What Breaks Company If Ignored: Five Non-Negotiables |
| 97 | `business-063` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** 12-Week Onboarding: Platform Deployment + Voice Capture + Strategy |
| 98 | `business-077` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Qualification Gate: mDNA Foundation Required |
| 99 | `business-078` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Qualification Gate: Visible Movement Impact Required |
| 100 | `research-008` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The reflected-understanding analysis for Alan Hirsch flags: 'Your content is not translated into key languages—including those with large po… |
| 101 | `research-034` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** For Alan Hirsch specifically, but applicable to others: content already exists (38+ videos) across 20+ third-party platforms (conference rec… |
| 102 | `research-036` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Exponential, Verge, and Missio Alliance events: movement leader ecosystem is visible and organized |
| 103 | `book-042` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Permission to Stay at Experimentation Level |
| 104 | `business-060` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Community Features: Comments, Forums, Member Directories |
| 105 | `C-S30` |  | 2% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch's core theological positioning, per the reflected understanding: 'You're called to reactivate what's latent. |
| 106 | `articles-039` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Ownership is stewardship, not empire—responsibility, not dominance |
| 107 | `articles-049` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Curation over growth—maintaining relational credibility at bounded scale |
| 108 | `book-016` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** What AI Displaces: Relationship, Prayer, Embodiment, Presence, Formation |
| 109 | `research-018` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken through Hirsch's platforms, making it a sig… |
| 110 | `articles-042` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content pipeline preview—demo of Movemental processing your work |
| 111 | `book-034` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Why Expertise Is Hard-Won and Worth Preserving |
| 112 | `book-043` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Look for Love: Markers of Credible AI Guidance |
| 113 | `research-040` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Women are 18% of 146 scored movement leader candidates—gender gap in visibility and network |
| 114 | `C-A04` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The guide posture — authority comes from sustained grappling, not from having figured it out |
| 115 | `C-PR01` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental is built by movement leaders, for movement leaders. |
| 116 | `articles-050` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental leaders include Alan Hirsch, Brad Brisco, and emerging voices |
| 117 | `articles-054` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI amplifies both crisis and opportunity—credibility becomes central |
| 118 | `book-002` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Tension: Using the Tool That Created the Problem |
| 119 | `book-003` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Is an Anthropological Problem, Not a Technological One |
| 120 | `book-033` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Research on AI Trust and Credibility Crisis |
| 121 | `research-016` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's integrated intellectual architecture moves from Christology (who Christ is and what He inaugurated) through Missiology (the Ch… |
| 122 | `book-024` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** From Gutenberg to Networks of Trust |
| 123 | `research-023` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Org site purpose is to make work visible and legitimate as leaders sign up |
| 124 | `research-048` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Founder preference: show work visible, not declare primary audience—let leaders choose whom to serve |
| 125 | `C-A03` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Amplification, not replacement — the AI control boundary for voice, insight, and authority |
| 126 | `C-A07` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Slowing down as resistance — AI can enable pace, not just acceleration |
| 127 | `C-PR02` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user management, content, media, e-commerce,… |
| 128 | `C-PR04` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional work) demonstrated in practice the frame… |
| 129 | `book-012` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Transparency as Trust Signal and Credibility Protection |
| 130 | `book-013` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Theological Integrity as Non-Negotiable in Christian Content |
| 131 | `business-041` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Security and Compliance: HTTPS, Encryption, RBAC, GDPR-Ready |
| 132 | `research-005` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The founder notes emphasize this clearly: movement leaders live under genuine time and attention constraints. |
| 133 | `research-029` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** You remain the leader, not the operator—Movemental handles infrastructure so you focus on movement |
| 134 | `research-033` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Social-to-email conversion is leaving 70-80% of audience on the table |
| 135 | `articles-044` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Codification without compromise—making patterns transmissible |
| 136 | `book-035` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Type-Safety Chain as Technical Alignment With Values |
| 137 | `book-040` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Context and Personalization as Required for Formation Work |
| 138 | `research-037` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The current org-site manifesto mentions 'Infrastructure: Notion + AI' but the founder notes flag this as a placeholder example, not a commit… |
| 139 | `research-047` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes: 'For movement leaders, approval of AI-affected public voice is anchored in the leader (and their process)—detail TBD when… |
| 140 | `articles-011` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Formation goals and spiritual discernment tracking—unique to Movemental |
| 141 | `articles-016` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Pillar-cluster architecture for topical authority and AI citation |
| 142 | `articles-018` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** GEO (Generative Engine Optimization) complements SEO |
| 143 | `articles-025` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Corpus extraction to calibrate AI voice—not guessing, measuring |
| 144 | `articles-034` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** EEAT as the foundation for discoverability in search and AI |
| 145 | `articles-048` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** 30/60/90 day plan and commissioning liturgy—sending, not graduation |
| 146 | `book-018` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The 70/30 Rule: Sustainable Content Creation Model |
| 147 | `business-059` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Transparent Relationships: Network Verification Visible and Traceable |
| 148 | `business-069` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content Strategy Framework: Five Narrative Frames |
| 149 | `business-072` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Risk: Network Effects Don't Materialize |
| 150 | `business-073` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Risk: Quality Decline as Network Expands |
| 151 | `C-A09` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Specialized agents preserve voice; generic AI homogenizes |
| 152 | `articles-029` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content length: depth determined by intent, not arbitrary word count |
| 153 | `articles-033` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Certificate system with verification codes and continuing education credits |
| 154 | `articles-036` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Formation Companion in courses—AI that knows the lesson, the week, the learner's context |
| 155 | `articles-052` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Voice fidelity scoring for AI-drafted content |
| 156 | `book-044` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Prompting as Humane Communication, Not Prompt Engineering |
| 157 | `business-034` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Semantic Search and Cross-Platform Discovery |
| 158 | `business-036` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Video Streaming with Progress Tracking and Series Organization |
| 159 | `business-043` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Geographic Expansion: English Markets First, Then Multi-Language |
| 160 | `business-079` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Global Expansion: 10-20 Year Horizon |
| 161 | `business-086` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Operational Scaling: Team Expansion With Network |
| 162 | `research-049` |  | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Before launching a leader on Movemental, a thoughtful onboarding should assess: (1) content maturity (how much existing content is there to… |
| 163 | `business-065` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Five User Roles with Permission Levels |
| 164 | `book-021` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Not a Technical Manual, Manifesto, or Sales Pitch |
| 165 | `book-031` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Relationship as Non-Negotiable Foundation |
| 166 | `book-049` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Three-Section Structure: Crisis, Response, Demonstration |
| 167 | `business-076` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Built on Movemental Theology: APEST, mDNA, Incarnational Mission |
| 168 | `research-017` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Michael Frost and Alan Hirsch co-authored 'The Shaping of Things to Come' (2003), which introduced the mDNA (missional DNA) framework and be… |
| 169 | `research-019` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Rick Warren's 'The Purpose Driven Life' has sold 30+ million copies in 85+ languages, making it one of the best-selling books in history. |
| 170 | `research-020` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement leader cohort is academically credible and seminary-integrated |
| 171 | `research-038` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Founder insight: manifesto may be low-trust slop—candidate for rewrite or demotion |
| 172 | `research-050` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's network isn't scattered—it's coherent. |
| 173 | `book-047` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Theological Anthropology: What Happens to Human Vocation in an AI Age |

---
## Tab: services

**Mapped React files:**
- `src/app/(site)/services/page.tsx` → /services

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 173 |
| Heuristic block count | 8 |
| Ordered layout spine blocks | 6 |
| 1:1 pairing depth for sub-table | 6 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 1 |
| Partial | 52 |
| Weak | 120 |

### 1:1 rank ↔ layout spine (first 6 of 173 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `articles-013` — Eight-week formation scaffold with four non-negotiable necessities | **/services** · LightHeroPhotoBackdrop: Your work was never meant to live in books, PDFs, and scattered content |
| 2 | `book-018` — The 70/30 Rule: Sustainable Content Creation Model | **/services** · Section: The static reality (often) |
| 3 | `C-F01` — Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA | **/services** · Section: Two tracks — same posture |
| 4 | `business-032` — 22 Specialized AI Agents Trained on Movemental Theology | **/services** · Section: Modular sprint map (preview) |
| 5 | `articles-017` — Evergreen article architecture with nine sections and voice markers | **/services** · Section: Investment range |
| 6 | `C-PR02` — Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user  | **/services** · Section: Tell us what you are trying to protect |
| … | _Claims 7–173: no same-index layout block (argument list longer than layout spine)._ | |

### Claim-by-claim drift (all 173 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `articles-013` | yes | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Eight-week formation scaffold with four non-negotiable necessities |
| 2 | `book-018` | yes | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The 70/30 Rule: Sustainable Content Creation Model |
| 3 | `C-F01` | yes | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA |
| 4 | `business-032` | yes | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 22 Specialized AI Agents Trained on Movemental Theology |
| 5 | `articles-017` | yes | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Evergreen article architecture with nine sections and voice markers |
| 6 | `C-PR02` | yes | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user management, content, media, e-commerce,… |
| 7 | `articles-019` | yes | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI used as editing gate, not content creator |
| 8 | `C-A03` | yes | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Amplification, not replacement — the AI control boundary for voice, insight, and authority |
| 9 | `C-F05` | yes | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The movemental-analysis documents for multiple leaders identify the same opportunity: existing embodied work (talks, teaching, training) can… |
| 10 | `articles-015` | yes | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Pathways as formation journeys, not topic pages |
| 11 | `articles-030` | yes | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI Lab with context awareness from personality to formation goals |
| 12 | `C-F10` | yes | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Five-stage AI maturity model — from native awareness to mature public leadership |
| 13 | `articles-025` | yes | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Corpus extraction to calibrate AI voice—not guessing, measuring |
| 14 | `articles-052` | yes | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Voice fidelity scoring for AI-drafted content |
| 15 | `business-049` | yes | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Voice Baseline System: Fingerprinting and Consistency |
| 16 | `articles-016` | yes | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Pillar-cluster architecture for topical authority and AI citation |
| 17 | `articles-018` | yes | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** GEO (Generative Engine Optimization) complements SEO |
| 18 | `articles-034` | yes | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** EEAT as the foundation for discoverability in search and AI |
| 19 | `articles-032` | yes | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Assessment engine for APEST, mDNA, maturity, vocational calling |
| 20 | `C-F09` | yes | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For organizational partners (nonprofits, churches, denominations), Movemental offers five modular system builds. |
| 21 | `C-F03` | yes | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Multi-tenant platform architecture — one codebase serves many leader sites |
| 22 | `business-045` | yes | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Why Movemental Can Underprice: AI-Powered Development Cost Curve |
| 23 | `C-A01` | yes | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Scenius (Brian Eno's term for collaborative genius emerging from creative networks) is the primary mechanism for credibility in the AI age. |
| 24 | `book-035` | yes | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Type-Safety Chain as Technical Alignment With Values |
| 25 | `business-063` | yes | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 12-Week Onboarding: Platform Deployment + Voice Capture + Strategy |
| 26 | `articles-048` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** 30/60/90 day plan and commissioning liturgy—sending, not graduation |
| 27 | `articles-011` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Formation goals and spiritual discernment tracking—unique to Movemental |
| 28 | `business-031` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Three-Layer Maturity Model: mDNA > Leadership > Content |
| 29 | `C-A07` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Slowing down as resistance — AI can enable pace, not just acceleration |
| 30 | `C-S30` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch's core theological positioning, per the reflected understanding: 'You're called to reactivate what's latent. |
| 31 | `C-A06` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** This moment is different — AI's speed, the accelerating crisis, and the closing window |
| 32 | `C-A05` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Refusal as love — what AI must not do, framed as protection of the sacred |
| 33 | `C-PR04` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional work) demonstrated in practice the frame… |
| 34 | `articles-020` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI as furnace needs a hearth—not savior, not threat |
| 35 | `research-025` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Alan Hirsch opportunity analysis identifies: '150,000+ APEST assessment takers currently leave after seeing results. |
| 36 | `research-034` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** For Alan Hirsch specifically, but applicable to others: content already exists (38+ videos) across 20+ third-party platforms (conference rec… |
| 37 | `business-069` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content Strategy Framework: Five Narrative Frames |
| 38 | `articles-049` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Curation over growth—maintaining relational credibility at bounded scale |
| 39 | `business-029` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Execution Path: 100-Leader Scenius Network |
| 40 | `book-010` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Experimentation as Prerequisite to Discernment |
| 41 | `business-042` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Go-To-Market: Invitation-Only, Relationship-Based Growth |
| 42 | `business-081` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Iterative Roadmap: Feedback-Driven, Not Feature-Driven |
| 43 | `book-037` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Leaders Don't Need Technical Expertise to Lead With AI |
| 44 | `business-088` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Metrics and Signals: What Success Actually Looks Like |
| 45 | `research-035` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Missing audiobooks as revenue and access stream—most flagship titles have no audio version |
| 46 | `business-016` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** MVP Definition: Core Value Over Feature Completeness |
| 47 | `business-077` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Qualification Gate: mDNA Foundation Required |
| 48 | `business-078` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Qualification Gate: Visible Movement Impact Required |
| 49 | `articles-038` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Recommended learning journey: spiral through five theological portals |
| 50 | `articles-027` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Repurposing existing work into articles is legitimate and necessary |
| 51 | `business-072` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Risk: Network Effects Don't Materialize |
| 52 | `business-073` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Risk: Quality Decline as Network Expands |
| 53 | `business-041` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Security and Compliance: HTTPS, Encryption, RBAC, GDPR-Ready |
| 54 | `business-066` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Sustainable Content Creation: 5-Hour Week Model |
| 55 | `book-013` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Theological Integrity as Non-Negotiable in Christian Content |
| 56 | `research-008` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The reflected-understanding analysis for Alan Hirsch flags: 'Your content is not translated into key languages—including those with large po… |
| 57 | `book-012` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Transparency as Trust Signal and Credibility Protection |
| 58 | `business-059` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Transparent Relationships: Network Verification Visible and Traceable |
| 59 | `articles-035` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Uniform platform, distinct expression—one engine, different cars |
| 60 | `book-015` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What Churches Are Free (and Obligated) to Do |
| 61 | `C-T10` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Future vision — AI becomes a trusted knowledge graph and ministry companion |
| 62 | `C-A09` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Specialized agents preserve voice; generic AI homogenizes |
| 63 | `articles-037` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Book—free knowledge spine establishing shared language |
| 64 | `business-038` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Analytics: Real-Time Performance Tracking Across All Content |
| 65 | `research-049` |  | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Before launching a leader on Movemental, a thoughtful onboarding should assess: (1) content maturity (how much existing content is there to… |
| 66 | `articles-033` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Certificate system with verification codes and continuing education credits |
| 67 | `articles-044` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Codification without compromise—making patterns transmissible |
| 68 | `business-060` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Community Features: Comments, Forums, Member Directories |
| 69 | `research-047` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes: 'For movement leaders, approval of AI-affected public voice is anchored in the leader (and their process)—detail TBD when… |
| 70 | `articles-029` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content length: depth determined by intent, not arbitrary word count |
| 71 | `business-033` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content Management System with Real-Time Collaborative Editing |
| 72 | `articles-042` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content pipeline preview—demo of Movemental processing your work |
| 73 | `book-040` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Context and Personalization as Required for Formation Work |
| 74 | `business-037` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Digital Bookstore with Stripe Integration |
| 75 | `articles-036` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Formation Companion in courses—AI that knows the lesson, the week, the learner's context |
| 76 | `research-037` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The current org-site manifesto mentions 'Infrastructure: Notion + AI' but the founder notes flag this as a placeholder example, not a commit… |
| 77 | `business-043` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Geographic Expansion: English Markets First, Then Multi-Language |
| 78 | `business-079` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Global Expansion: 10-20 Year Horizon |
| 79 | `business-035` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Learning Management System: Courses with Progress Tracking and Certificates |
| 80 | `articles-055` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Multi-language support—books, articles, and AI in Spanish, Portuguese, etc. |
| 81 | `business-086` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Operational Scaling: Team Expansion With Network |
| 82 | `business-089` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Partnership Pathways: Institutional + Relational |
| 83 | `book-042` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Permission to Stay at Experimentation Level |
| 84 | `book-044` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Prompting as Humane Communication, Not Prompt Engineering |
| 85 | `business-055` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Quality Assurance Standards: 95% + 90% + 95% |
| 86 | `business-034` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Semantic Search and Cross-Platform Discovery |
| 87 | `business-071` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Speaking and Consulting Booking Integration |
| 88 | `business-036` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Video Streaming with Progress Tracking and Series Organization |
| 89 | `business-082` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** API and Third-Party Integrations (Post-MVP) |
| 90 | `business-065` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Five User Roles with Permission Levels |
| 91 | `C-POS06` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck |
| 92 | `C-T02` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Four things hold Movemental together and are non-negotiable. |
| 93 | `C-BM01` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform ownership creates long-term asset buildi… |
| 94 | `research-022` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The founder preference: show that all these groups are served, without hierarchy in public copy. |
| 95 | `book-006` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Why Movement Leaders Were Right to Ignore SEO Until Now |
| 96 | `research-041` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement leaders solve for multiplication and reproduction, not institutional sustainability |
| 97 | `research-046` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, network, hybrid, digital, denominational, inde… |
| 98 | `C-A08` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content that transforms vs. content that extracts — an ethical distinction |
| 99 | `research-027` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The founder clarifies: archetypes mentioned (Alan Hirsch, Brad Brisco) are not just 'authors and speakers'—definition is broader. |
| 100 | `C-AU01` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental looks for leaders who catalyze visible, verifiable movement (transformation that multiplies beyond direct oversight), not just pl… |
| 101 | `C-P01` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** 68% of internet users now struggle to distinguish human-created from AI-generated content. |
| 102 | `C-SP05` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Everything in one home — consolidation that surfaces and unifies the leader's existing credibility |
| 103 | `business-003` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Formation Crisis: Growth Over Substance |
| 104 | `business-053` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** vs. WordPress/Squarespace: Network Effects |
| 105 | `research-001` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement leaders are seminary-trained reformers stuck between institution and mission |
| 106 | `articles-026` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Isolation makes structural problems feel normal |
| 107 | `research-030` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Context matters: Western church fragmentation, AI disruption, and capacity gaps create urgent need |
| 108 | `C-A10` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Scarcity is structural — curation at bounded scale is how trust, scenius, and movement survive |
| 109 | `C-P03` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The false choice — traditional publisher or rental platform, both extractive, neither sustainable |
| 110 | `book-004` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Adaptive Leadership as the Response to AI |
| 111 | `business-009` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Formation Must Accompany Amplification |
| 112 | `C-A02` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Credibility differs from influence — measurable but not reducible to a metric |
| 113 | `C-T03` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Embodied ministry cannot be automated — digital supports presence, never replaces it |
| 114 | `articles-039` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Ownership is stewardship, not empire—responsibility, not dominance |
| 115 | `business-007` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Credibility: Trust + Expertise + Character + Platform |
| 116 | `business-083` |  | 3% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Continuous Learning: Improvement Built Into Culture |
| 117 | `research-038` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Founder insight: manifesto may be low-trust slop—candidate for rewrite or demotion |
| 118 | `C-T01` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Christocentric spine — Jesus at the center is load-bearing, not decorative |
| 119 | `articles-040` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The stakes are spiritual and generational, not just personal efficiency |
| 120 | `business-025` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Convergence: Four Concepts That Demand Something New |
| 121 | `business-075` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Economic Justice: Fair Exchange, Not Extraction |
| 122 | `business-080` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** What Moves Movemental: Movement Multiplication, Not Profit Maximization |
| 123 | `research-010` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental is not a publishing house or SaaS—it's a venture-builder studio with aligned incentives |
| 124 | `C-A04` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The guide posture — authority comes from sustained grappling, not from having figured it out |
| 125 | `research-005` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes emphasize this clearly: movement leaders live under genuine time and attention constraints. |
| 126 | `research-029` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** You remain the leader, not the operator—Movemental handles infrastructure so you focus on movement |
| 127 | `business-019` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Platform Ownership: Not Rental, Complete Control |
| 128 | `research-021` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes state: 'Primary customer today: individual movement leaders (relationship/word-of-mouth is the real acquisition path). |
| 129 | `research-039` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Alan Hirsch opportunity analysis estimates $140K-$380K/year in additional revenue could be realized through: (1) scaled online courses o… |
| 130 | `C-P02` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizations, teaching at 4 seminaries, and speaki… |
| 131 | `C-P04` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church multiplication' may not land on Alan Hirsc… |
| 132 | `C-POS01` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement infrastructure for a credibility-scarce age — not a website, not another SaaS |
| 133 | `C-SP04` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Network amplification multiplies reach 28×–500× — the five multiplier effects |
| 134 | `C-SP07` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The first cohort defines the brand — early leaders are co-creators, not customers |
| 135 | `articles-046` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Incoherence reads as instability—coherence is formation requirement |
| 136 | `business-054` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** vs. Custom Development: Speed, Cost, Network |
| 137 | `research-002` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** A second major persona is the multiplication leader—church planters, bivocational pioneers, and network strategists who think in terms of re… |
| 138 | `research-003` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch's engaged audience is measured at 50,000+ (confirmed through 150,000+ APEST assessments taken). |
| 139 | `articles-047` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Communitas through shared risk and mission, not comfort |
| 140 | `book-016` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What AI Displaces: Relationship, Prayer, Embodiment, Presence, Formation |
| 141 | `business-001` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Technology Properly Ordered to Serve Mission |
| 142 | `business-018` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Revolutionary Pricing: $1,000 + 10% vs. Industry Standard |
| 143 | `business-058` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** What Breaks Company If Ignored: Five Non-Negotiables |
| 144 | `research-018` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken through Hirsch's platforms, making it a sig… |
| 145 | `research-036` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Exponential, Verge, and Missio Alliance events: movement leader ecosystem is visible and organized |
| 146 | `book-034` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Why Expertise Is Hard-Won and Worth Preserving |
| 147 | `book-043` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Look for Love: Markers of Credible AI Guidance |
| 148 | `research-040` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Women are 18% of 146 scored movement leader candidates—gender gap in visibility and network |
| 149 | `book-031` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Relationship as Non-Negotiable Foundation |
| 150 | `book-049` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Three-Section Structure: Crisis, Response, Demonstration |
| 151 | `research-017` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Michael Frost and Alan Hirsch co-authored 'The Shaping of Things to Come' (2003), which introduced the mDNA (missional DNA) framework and be… |
| 152 | `research-019` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Rick Warren's 'The Purpose Driven Life' has sold 30+ million copies in 85+ languages, making it one of the best-selling books in history. |
| 153 | `research-020` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement leader cohort is academically credible and seminary-integrated |
| 154 | `research-050` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's network isn't scattered—it's coherent. |
| 155 | `C-A11` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing |
| 156 | `C-PR01` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental is built by movement leaders, for movement leaders. |
| 157 | `articles-050` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental leaders include Alan Hirsch, Brad Brisco, and emerging voices |
| 158 | `articles-054` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI amplifies both crisis and opportunity—credibility becomes central |
| 159 | `book-002` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Tension: Using the Tool That Created the Problem |
| 160 | `book-003` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Is an Anthropological Problem, Not a Technological One |
| 161 | `book-005` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Speed of Adoption and Dunning-Kruger With AI |
| 162 | `book-033` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Research on AI Trust and Credibility Crisis |
| 163 | `book-045` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Book as Companionship in Uncertainty |
| 164 | `research-016` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch's integrated intellectual architecture moves from Christology (who Christ is and what He inaugurated) through Missiology (the Ch… |
| 165 | `book-024` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** From Gutenberg to Networks of Trust |
| 166 | `research-023` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Org site purpose is to make work visible and legitimate as leaders sign up |
| 167 | `research-048` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Founder preference: show work visible, not declare primary audience—let leaders choose whom to serve |
| 168 | `research-033` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Social-to-email conversion is leaving 70-80% of audience on the table |
| 169 | `business-051` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** vs. Traditional Publishers: Ownership + Speed + Economics |
| 170 | `business-052` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** vs. Digital Platforms (Substack/Patreon): Ownership Matters |
| 171 | `book-021` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Not a Technical Manual, Manifesto, or Sales Pitch |
| 172 | `business-076` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Built on Movemental Theology: APEST, mDNA, Incarnational Mission |
| 173 | `book-047` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Theological Anthropology: What Happens to Human Vocation in an AI Age |

---
## Tab: system

**Mapped React files:**
- `src/app/(site)/system/page.tsx` → /system

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 173 |
| Heuristic block count | 12 |
| Ordered layout spine blocks | 10 |
| 1:1 pairing depth for sub-table | 10 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 26 |
| Partial | 133 |
| Weak | 14 |

### 1:1 rank ↔ layout spine (first 10 of 173 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `articles-013` — Eight-week formation scaffold with four non-negotiable necessities | **/system** · LightHeroPhotoBackdrop: A system, not a stack |
| 2 | `book-018` — The 70/30 Rule: Sustainable Content Creation Model | **/system** · Section: (no Display/Eyebrow in block) |
| 3 | `C-F01` — Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA | **/system** · Section: Same responsibilities, two architectures |
| 4 | `business-032` — 22 Specialized AI Agents Trained on Movemental Theology | **/system** · Section: One system. Every layer connected. |
| 5 | `articles-017` — Evergreen article architecture with nine sections and voice markers | **/system** · Section: Core system layers |
| 6 | `C-PR02` — Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user  | **/system** · Section: AI inside the system |
| 7 | `articles-019` — AI used as editing gate, not content creator | **/system** · Section: Formation is built in |
| 8 | `C-A03` — Amplification, not replacement — the AI control boundary for voice, insight, and authority | **/system** · Section: One system. Many expressions. |
| 9 | `C-F05` — The movemental-analysis documents for multiple leaders identify the same opportunity: existing embod | **/system** · Section: Why this matters |
| 10 | `articles-015` — Pathways as formation journeys, not topic pages | **/system** · Section: See how it works in practice |
| … | _Claims 11–173: no same-index layout block (argument list longer than layout spine)._ | |

### Claim-by-claim drift (all 173 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `articles-013` | yes | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Eight-week formation scaffold with four non-negotiable necessities |
| 2 | `book-018` | yes | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The 70/30 Rule: Sustainable Content Creation Model |
| 3 | `C-F01` | yes | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA |
| 4 | `business-032` | yes | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 22 Specialized AI Agents Trained on Movemental Theology |
| 5 | `articles-017` | yes | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Evergreen article architecture with nine sections and voice markers |
| 6 | `C-PR02` | yes | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user management, content, media, e-commerce,… |
| 7 | `articles-019` | yes | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI used as editing gate, not content creator |
| 8 | `C-A03` | yes | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Amplification, not replacement — the AI control boundary for voice, insight, and authority |
| 9 | `C-F05` | yes | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The movemental-analysis documents for multiple leaders identify the same opportunity: existing embodied work (talks, teaching, training) can… |
| 10 | `articles-015` | yes | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Pathways as formation journeys, not topic pages |
| 11 | `articles-030` | yes | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI Lab with context awareness from personality to formation goals |
| 12 | `C-F10` | yes | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Five-stage AI maturity model — from native awareness to mature public leadership |
| 13 | `articles-025` | yes | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Corpus extraction to calibrate AI voice—not guessing, measuring |
| 14 | `articles-052` | yes | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Voice fidelity scoring for AI-drafted content |
| 15 | `business-049` | yes | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Voice Baseline System: Fingerprinting and Consistency |
| 16 | `articles-016` | yes | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Pillar-cluster architecture for topical authority and AI citation |
| 17 | `articles-018` | yes | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** GEO (Generative Engine Optimization) complements SEO |
| 18 | `articles-034` | yes | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** EEAT as the foundation for discoverability in search and AI |
| 19 | `articles-032` | yes | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Assessment engine for APEST, mDNA, maturity, vocational calling |
| 20 | `C-F09` | yes | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For organizational partners (nonprofits, churches, denominations), Movemental offers five modular system builds. |
| 21 | `C-F03` | yes | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Multi-tenant platform architecture — one codebase serves many leader sites |
| 22 | `business-045` | yes | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Movemental Can Underprice: AI-Powered Development Cost Curve |
| 23 | `C-A01` | yes | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Scenius (Brian Eno's term for collaborative genius emerging from creative networks) is the primary mechanism for credibility in the AI age. |
| 24 | `book-035` | yes | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Type-Safety Chain as Technical Alignment With Values |
| 25 | `business-063` | yes | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 12-Week Onboarding: Platform Deployment + Voice Capture + Strategy |
| 26 | `articles-048` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 30/60/90 day plan and commissioning liturgy—sending, not graduation |
| 27 | `articles-011` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Formation goals and spiritual discernment tracking—unique to Movemental |
| 28 | `business-031` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Three-Layer Maturity Model: mDNA > Leadership > Content |
| 29 | `C-A07` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Slowing down as resistance — AI can enable pace, not just acceleration |
| 30 | `C-S30` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's core theological positioning, per the reflected understanding: 'You're called to reactivate what's latent. |
| 31 | `C-A06` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** This moment is different — AI's speed, the accelerating crisis, and the closing window |
| 32 | `C-A05` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Refusal as love — what AI must not do, framed as protection of the sacred |
| 33 | `C-PR04` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional work) demonstrated in practice the frame… |
| 34 | `articles-020` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI as furnace needs a hearth—not savior, not threat |
| 35 | `research-025` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Alan Hirsch opportunity analysis identifies: '150,000+ APEST assessment takers currently leave after seeing results. |
| 36 | `research-034` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For Alan Hirsch specifically, but applicable to others: content already exists (38+ videos) across 20+ third-party platforms (conference rec… |
| 37 | `business-069` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content Strategy Framework: Five Narrative Frames |
| 38 | `articles-049` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Curation over growth—maintaining relational credibility at bounded scale |
| 39 | `business-029` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Execution Path: 100-Leader Scenius Network |
| 40 | `book-010` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Experimentation as Prerequisite to Discernment |
| 41 | `business-042` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Go-To-Market: Invitation-Only, Relationship-Based Growth |
| 42 | `business-081` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Iterative Roadmap: Feedback-Driven, Not Feature-Driven |
| 43 | `book-037` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Leaders Don't Need Technical Expertise to Lead With AI |
| 44 | `business-088` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Metrics and Signals: What Success Actually Looks Like |
| 45 | `research-035` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Missing audiobooks as revenue and access stream—most flagship titles have no audio version |
| 46 | `business-016` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** MVP Definition: Core Value Over Feature Completeness |
| 47 | `business-077` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Qualification Gate: mDNA Foundation Required |
| 48 | `business-078` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Qualification Gate: Visible Movement Impact Required |
| 49 | `articles-038` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Recommended learning journey: spiral through five theological portals |
| 50 | `articles-027` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Repurposing existing work into articles is legitimate and necessary |
| 51 | `business-072` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Risk: Network Effects Don't Materialize |
| 52 | `business-073` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Risk: Quality Decline as Network Expands |
| 53 | `business-041` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Security and Compliance: HTTPS, Encryption, RBAC, GDPR-Ready |
| 54 | `business-066` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Sustainable Content Creation: 5-Hour Week Model |
| 55 | `book-013` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Theological Integrity as Non-Negotiable in Christian Content |
| 56 | `research-008` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The reflected-understanding analysis for Alan Hirsch flags: 'Your content is not translated into key languages—including those with large po… |
| 57 | `book-012` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Transparency as Trust Signal and Credibility Protection |
| 58 | `business-059` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Transparent Relationships: Network Verification Visible and Traceable |
| 59 | `articles-035` |  | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Uniform platform, distinct expression—one engine, different cars |
| 60 | `book-015` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What Churches Are Free (and Obligated) to Do |
| 61 | `C-T10` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Future vision — AI becomes a trusted knowledge graph and ministry companion |
| 62 | `C-A09` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Specialized agents preserve voice; generic AI homogenizes |
| 63 | `articles-037` |  | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI Book—free knowledge spine establishing shared language |
| 64 | `business-038` |  | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Analytics: Real-Time Performance Tracking Across All Content |
| 65 | `research-049` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Before launching a leader on Movemental, a thoughtful onboarding should assess: (1) content maturity (how much existing content is there to… |
| 66 | `articles-033` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Certificate system with verification codes and continuing education credits |
| 67 | `articles-044` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Codification without compromise—making patterns transmissible |
| 68 | `business-060` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Community Features: Comments, Forums, Member Directories |
| 69 | `research-047` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes: 'For movement leaders, approval of AI-affected public voice is anchored in the leader (and their process)—detail TBD when… |
| 70 | `articles-029` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content length: depth determined by intent, not arbitrary word count |
| 71 | `business-033` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content Management System with Real-Time Collaborative Editing |
| 72 | `articles-042` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content pipeline preview—demo of Movemental processing your work |
| 73 | `book-040` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Context and Personalization as Required for Formation Work |
| 74 | `business-037` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Digital Bookstore with Stripe Integration |
| 75 | `articles-036` |  | 67% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Formation Companion in courses—AI that knows the lesson, the week, the learner's context |
| 76 | `research-037` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The current org-site manifesto mentions 'Infrastructure: Notion + AI' but the founder notes flag this as a placeholder example, not a commit… |
| 77 | `business-043` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Geographic Expansion: English Markets First, Then Multi-Language |
| 78 | `business-079` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Global Expansion: 10-20 Year Horizon |
| 79 | `business-035` |  | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Learning Management System: Courses with Progress Tracking and Certificates |
| 80 | `articles-055` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Multi-language support—books, articles, and AI in Spanish, Portuguese, etc. |
| 81 | `business-086` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Operational Scaling: Team Expansion With Network |
| 82 | `business-089` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Partnership Pathways: Institutional + Relational |
| 83 | `book-042` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Permission to Stay at Experimentation Level |
| 84 | `book-044` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Prompting as Humane Communication, Not Prompt Engineering |
| 85 | `business-055` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Quality Assurance Standards: 95% + 90% + 95% |
| 86 | `business-034` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Semantic Search and Cross-Platform Discovery |
| 87 | `business-071` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Speaking and Consulting Booking Integration |
| 88 | `business-036` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Video Streaming with Progress Tracking and Series Organization |
| 89 | `business-082` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** API and Third-Party Integrations (Post-MVP) |
| 90 | `business-065` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Five User Roles with Permission Levels |
| 91 | `book-006` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Movement Leaders Were Right to Ignore SEO Until Now |
| 92 | `C-P04` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church multiplication' may not land on Alan Hirsc… |
| 93 | `C-SP04` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Network amplification multiplies reach 28×–500× — the five multiplier effects |
| 94 | `articles-026` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Isolation makes structural problems feel normal |
| 95 | `C-SP05` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Everything in one home — consolidation that surfaces and unifies the leader's existing credibility |
| 96 | `business-018` |  | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Revolutionary Pricing: $1,000 + 10% vs. Industry Standard |
| 97 | `research-046` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, network, hybrid, digital, denominational, inde… |
| 98 | `research-029` |  | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** You remain the leader, not the operator—Movemental handles infrastructure so you focus on movement |
| 99 | `research-030` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Context matters: Western church fragmentation, AI disruption, and capacity gaps create urgent need |
| 100 | `articles-050` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental leaders include Alan Hirsch, Brad Brisco, and emerging voices |
| 101 | `C-AU01` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental looks for leaders who catalyze visible, verifiable movement (transformation that multiplies beyond direct oversight), not just pl… |
| 102 | `C-A08` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content that transforms vs. content that extracts — an ethical distinction |
| 103 | `business-025` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Convergence: Four Concepts That Demand Something New |
| 104 | `research-040` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Women are 18% of 146 scored movement leader candidates—gender gap in visibility and network |
| 105 | `C-A10` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Scarcity is structural — curation at bounded scale is how trust, scenius, and movement survive |
| 106 | `C-P03` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The false choice — traditional publisher or rental platform, both extractive, neither sustainable |
| 107 | `C-POS06` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck |
| 108 | `book-004` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Adaptive Leadership as the Response to AI |
| 109 | `business-019` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Platform Ownership: Not Rental, Complete Control |
| 110 | `research-039` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Alan Hirsch opportunity analysis estimates $140K-$380K/year in additional revenue could be realized through: (1) scaled online courses o… |
| 111 | `research-041` |  | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movement leaders solve for multiplication and reproduction, not institutional sustainability |
| 112 | `C-A11` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing |
| 113 | `C-BM01` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform ownership creates long-term asset buildi… |
| 114 | `C-POS01` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement infrastructure for a credibility-scarce age — not a website, not another SaaS |
| 115 | `C-SP07` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The first cohort defines the brand — early leaders are co-creators, not customers |
| 116 | `articles-046` |  | 44% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Incoherence reads as instability—coherence is formation requirement |
| 117 | `business-003` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Formation Crisis: Growth Over Substance |
| 118 | `research-001` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement leaders are seminary-trained reformers stuck between institution and mission |
| 119 | `research-003` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's engaged audience is measured at 50,000+ (confirmed through 150,000+ APEST assessments taken). |
| 120 | `C-A04` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The guide posture — authority comes from sustained grappling, not from having figured it out |
| 121 | `C-PR01` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental is built by movement leaders, for movement leaders. |
| 122 | `book-002` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Tension: Using the Tool That Created the Problem |
| 123 | `book-005` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Speed of Adoption and Dunning-Kruger With AI |
| 124 | `book-033` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Research on AI Trust and Credibility Crisis |
| 125 | `business-076` |  | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Built on Movemental Theology: APEST, mDNA, Incarnational Mission |
| 126 | `research-016` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch's integrated intellectual architecture moves from Christology (who Christ is and what He inaugurated) through Missiology (the Ch… |
| 127 | `research-019` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Rick Warren's 'The Purpose Driven Life' has sold 30+ million copies in 85+ languages, making it one of the best-selling books in history. |
| 128 | `C-P01` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** 68% of internet users now struggle to distinguish human-created from AI-generated content. |
| 129 | `research-027` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder clarifies: archetypes mentioned (Alan Hirsch, Brad Brisco) are not just 'authors and speakers'—definition is broader. |
| 130 | `C-T01` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Christocentric spine — Jesus at the center is load-bearing, not decorative |
| 131 | `C-T02` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Four things hold Movemental together and are non-negotiable. |
| 132 | `articles-039` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Ownership is stewardship, not empire—responsibility, not dominance |
| 133 | `articles-040` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The stakes are spiritual and generational, not just personal efficiency |
| 134 | `business-007` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Credibility: Trust + Expertise + Character + Platform |
| 135 | `business-052` |  | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. Digital Platforms (Substack/Patreon): Ownership Matters |
| 136 | `business-053` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. WordPress/Squarespace: Network Effects |
| 137 | `business-054` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** vs. Custom Development: Speed, Cost, Network |
| 138 | `business-058` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What Breaks Company If Ignored: Five Non-Negotiables |
| 139 | `business-080` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What Moves Movemental: Movement Multiplication, Not Profit Maximization |
| 140 | `research-018` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken through Hirsch's platforms, making it a sig… |
| 141 | `book-034` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Expertise Is Hard-Won and Worth Preserving |
| 142 | `business-083` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Continuous Learning: Improvement Built Into Culture |
| 143 | `business-009` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Formation Must Accompany Amplification |
| 144 | `research-021` |  | 35% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes state: 'Primary customer today: individual movement leaders (relationship/word-of-mouth is the real acquisition path). |
| 145 | `business-075` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Economic Justice: Fair Exchange, Not Extraction |
| 146 | `C-P02` |  | 29% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizations, teaching at 4 seminaries, and speaki… |
| 147 | `research-002` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** A second major persona is the multiplication leader—church planters, bivocational pioneers, and network strategists who think in terms of re… |
| 148 | `research-005` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes emphasize this clearly: movement leaders live under genuine time and attention constraints. |
| 149 | `research-022` |  | 23% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder preference: show that all these groups are served, without hierarchy in public copy. |
| 150 | `research-033` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Social-to-email conversion is leaving 70-80% of audience on the table |
| 151 | `articles-054` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI amplifies both crisis and opportunity—credibility becomes central |
| 152 | `book-003` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Is an Anthropological Problem, Not a Technological One |
| 153 | `book-021` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Not a Technical Manual, Manifesto, or Sales Pitch |
| 154 | `book-045` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Book as Companionship in Uncertainty |
| 155 | `research-020` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement leader cohort is academically credible and seminary-integrated |
| 156 | `research-038` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Founder insight: manifesto may be low-trust slop—candidate for rewrite or demotion |
| 157 | `research-050` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch's network isn't scattered—it's coherent. |
| 158 | `book-024` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** From Gutenberg to Networks of Trust |
| 159 | `research-023` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Org site purpose is to make work visible and legitimate as leaders sign up |
| 160 | `research-048` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Founder preference: show work visible, not declare primary audience—let leaders choose whom to serve |
| 161 | `C-A02` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Credibility differs from influence — measurable but not reducible to a metric |
| 162 | `C-T03` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Embodied ministry cannot be automated — digital supports presence, never replaces it |
| 163 | `articles-047` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Communitas through shared risk and mission, not comfort |
| 164 | `book-016` |  | 25% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** What AI Displaces: Relationship, Prayer, Embodiment, Presence, Formation |
| 165 | `business-001` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Technology Properly Ordered to Serve Mission |
| 166 | `business-051` |  | 34% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** vs. Traditional Publishers: Ownership + Speed + Economics |
| 167 | `research-036` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Exponential, Verge, and Missio Alliance events: movement leader ecosystem is visible and organized |
| 168 | `book-043` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Look for Love: Markers of Credible AI Guidance |
| 169 | `research-010` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental is not a publishing house or SaaS—it's a venture-builder studio with aligned incentives |
| 170 | `book-031` |  | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Relationship as Non-Negotiable Foundation |
| 171 | `book-049` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Three-Section Structure: Crisis, Response, Demonstration |
| 172 | `research-017` |  | 31% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Michael Frost and Alan Hirsch co-authored 'The Shaping of Things to Come' (2003), which introduced the mDNA (missional DNA) framework and be… |
| 173 | `book-047` |  | 26% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Theological Anthropology: What Happens to Human Vocation in an AI Age |

---
## Tab: terms

**Mapped React files:**
- `src/app/(site)/terms/page.tsx` → /terms

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 173 |
| Heuristic block count | 1 |
| Ordered layout spine blocks | 1 |
| 1:1 pairing depth for sub-table | 1 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 0 |
| Partial | 1 |
| Weak | 172 |

### 1:1 rank ↔ layout spine (first 1 of 173 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `business-018` — Revolutionary Pricing: $1,000 + 10% vs. Industry Standard | **/terms** · Section: Terms of Service |
| … | _Claims 2–173: no same-index layout block (argument list longer than layout spine)._ | |

### Claim-by-claim drift (all 173 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `business-018` | yes | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Revolutionary Pricing: $1,000 + 10% vs. Industry Standard |
| 2 | `C-BM01` | yes | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform ownership creates long-term asset buildi… |
| 3 | `business-051` | yes | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** vs. Traditional Publishers: Ownership + Speed + Economics |
| 4 | `business-052` | yes | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** vs. Digital Platforms (Substack/Patreon): Ownership Matters |
| 5 | `business-053` | yes | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** vs. WordPress/Squarespace: Network Effects |
| 6 | `business-054` | yes | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** vs. Custom Development: Speed, Cost, Network |
| 7 | `C-POS06` | yes | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck |
| 8 | `business-019` | yes | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Platform Ownership: Not Rental, Complete Control |
| 9 | `C-A11` | yes | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing |
| 10 | `C-A10` | yes | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Scarcity is structural — curation at bounded scale is how trust, scenius, and movement survive |
| 11 | `business-075` | yes | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Economic Justice: Fair Exchange, Not Extraction |
| 12 | `C-P03` | yes | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The false choice — traditional publisher or rental platform, both extractive, neither sustainable |
| 13 | `business-045` | yes | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Why Movemental Can Underprice: AI-Powered Development Cost Curve |
| 14 | `business-042` | yes | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Go-To-Market: Invitation-Only, Relationship-Based Growth |
| 15 | `research-039` | yes | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Alan Hirsch opportunity analysis estimates $140K-$380K/year in additional revenue could be realized through: (1) scaled online courses o… |
| 16 | `research-021` | yes | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The founder notes state: 'Primary customer today: individual movement leaders (relationship/word-of-mouth is the real acquisition path). |
| 17 | `C-A02` | yes | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Credibility differs from influence — measurable but not reducible to a metric |
| 18 | `business-007` | yes | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Credibility: Trust + Expertise + Character + Platform |
| 19 | `research-010` | yes | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental is not a publishing house or SaaS—it's a venture-builder studio with aligned incentives |
| 20 | `book-006` | yes | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Why Movement Leaders Were Right to Ignore SEO Until Now |
| 21 | `business-041` | yes | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Security and Compliance: HTTPS, Encryption, RBAC, GDPR-Ready |
| 22 | `business-016` | yes | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** MVP Definition: Core Value Over Feature Completeness |
| 23 | `C-F09` | yes | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** For organizational partners (nonprofits, churches, denominations), Movemental offers five modular system builds. |
| 24 | `C-F10` | yes | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Five-stage AI maturity model — from native awareness to mature public leadership |
| 25 | `research-047` | yes | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The founder notes: 'For movement leaders, approval of AI-affected public voice is anchored in the leader (and their process)—detail TBD when… |
| 26 | `research-002` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** A second major persona is the multiplication leader—church planters, bivocational pioneers, and network strategists who think in terms of re… |
| 27 | `research-049` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Before launching a leader on Movemental, a thoughtful onboarding should assess: (1) content maturity (how much existing content is there to… |
| 28 | `research-041` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement leaders solve for multiplication and reproduction, not institutional sustainability |
| 29 | `research-046` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, network, hybrid, digital, denominational, inde… |
| 30 | `C-A01` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Scenius (Brian Eno's term for collaborative genius emerging from creative networks) is the primary mechanism for credibility in the AI age. |
| 31 | `C-A05` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Refusal as love — what AI must not do, framed as protection of the sacred |
| 32 | `C-A06` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** This moment is different — AI's speed, the accelerating crisis, and the closing window |
| 33 | `C-F01` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA |
| 34 | `C-F05` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The movemental-analysis documents for multiple leaders identify the same opportunity: existing embodied work (talks, teaching, training) can… |
| 35 | `articles-013` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Eight-week formation scaffold with four non-negotiable necessities |
| 36 | `articles-015` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Pathways as formation journeys, not topic pages |
| 37 | `articles-017` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Evergreen article architecture with nine sections and voice markers |
| 38 | `articles-035` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Uniform platform, distinct expression—one engine, different cars |
| 39 | `book-015` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** What Churches Are Free (and Obligated) to Do |
| 40 | `business-066` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Sustainable Content Creation: 5-Hour Week Model |
| 41 | `research-025` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Alan Hirsch opportunity analysis identifies: '150,000+ APEST assessment takers currently leave after seeing results. |
| 42 | `C-T10` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Future vision — AI becomes a trusted knowledge graph and ministry companion |
| 43 | `C-A08` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content that transforms vs. content that extracts — an ethical distinction |
| 44 | `C-AU01` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental looks for leaders who catalyze visible, verifiable movement (transformation that multiplies beyond direct oversight), not just pl… |
| 45 | `C-P01` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** 68% of internet users now struggle to distinguish human-created from AI-generated content. |
| 46 | `C-SP05` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Everything in one home — consolidation that surfaces and unifies the leader's existing credibility |
| 47 | `C-T01` |  | 2% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Christocentric spine — Jesus at the center is load-bearing, not decorative |
| 48 | `C-T02` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Four things hold Movemental together and are non-negotiable. |
| 49 | `articles-040` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The stakes are spiritual and generational, not just personal efficiency |
| 50 | `book-004` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Adaptive Leadership as the Response to AI |
| 51 | `business-009` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Formation Must Accompany Amplification |
| 52 | `business-025` |  | 2% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Convergence: Four Concepts That Demand Something New |
| 53 | `business-080` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** What Moves Movemental: Movement Multiplication, Not Profit Maximization |
| 54 | `articles-055` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Multi-language support—books, articles, and AI in Spanish, Portuguese, etc. |
| 55 | `business-033` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content Management System with Real-Time Collaborative Editing |
| 56 | `business-035` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Learning Management System: Courses with Progress Tracking and Certificates |
| 57 | `business-089` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Partnership Pathways: Institutional + Relational |
| 58 | `C-POS01` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement infrastructure for a credibility-scarce age — not a website, not another SaaS |
| 59 | `C-T03` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Embodied ministry cannot be automated — digital supports presence, never replaces it |
| 60 | `articles-047` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Communitas through shared risk and mission, not comfort |
| 61 | `business-001` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Technology Properly Ordered to Serve Mission |
| 62 | `business-003` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Formation Crisis: Growth Over Substance |
| 63 | `business-058` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** What Breaks Company If Ignored: Five Non-Negotiables |
| 64 | `research-022` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The founder preference: show that all these groups are served, without hierarchy in public copy. |
| 65 | `research-027` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The founder clarifies: archetypes mentioned (Alan Hirsch, Brad Brisco) are not just 'authors and speakers'—definition is broader. |
| 66 | `research-036` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Exponential, Verge, and Missio Alliance events: movement leader ecosystem is visible and organized |
| 67 | `business-083` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Continuous Learning: Improvement Built Into Culture |
| 68 | `research-030` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Context matters: Western church fragmentation, AI disruption, and capacity gaps create urgent need |
| 69 | `C-A03` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Amplification, not replacement — the AI control boundary for voice, insight, and authority |
| 70 | `C-A07` |  | 3% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Slowing down as resistance — AI can enable pace, not just acceleration |
| 71 | `C-PR02` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user management, content, media, e-commerce,… |
| 72 | `C-PR04` |  | 2% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional work) demonstrated in practice the frame… |
| 73 | `C-S30` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch's core theological positioning, per the reflected understanding: 'You're called to reactivate what's latent. |
| 74 | `articles-020` |  | 2% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI as furnace needs a hearth—not savior, not threat |
| 75 | `articles-027` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Repurposing existing work into articles is legitimate and necessary |
| 76 | `articles-030` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI Lab with context awareness from personality to formation goals |
| 77 | `articles-032` |  | 3% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Assessment engine for APEST, mDNA, maturity, vocational calling |
| 78 | `articles-038` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Recommended learning journey: spiral through five theological portals |
| 79 | `articles-049` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Curation over growth—maintaining relational credibility at bounded scale |
| 80 | `book-010` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Experimentation as Prerequisite to Discernment |
| 81 | `book-012` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Transparency as Trust Signal and Credibility Protection |
| 82 | `book-013` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Theological Integrity as Non-Negotiable in Christian Content |
| 83 | `book-037` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Leaders Don't Need Technical Expertise to Lead With AI |
| 84 | `business-029` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Execution Path: 100-Leader Scenius Network |
| 85 | `business-031` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Three-Layer Maturity Model: mDNA > Leadership > Content |
| 86 | `business-032` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** 22 Specialized AI Agents Trained on Movemental Theology |
| 87 | `business-063` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** 12-Week Onboarding: Platform Deployment + Voice Capture + Strategy |
| 88 | `business-077` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Qualification Gate: mDNA Foundation Required |
| 89 | `business-078` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Qualification Gate: Visible Movement Impact Required |
| 90 | `business-088` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Metrics and Signals: What Success Actually Looks Like |
| 91 | `research-008` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The reflected-understanding analysis for Alan Hirsch flags: 'Your content is not translated into key languages—including those with large po… |
| 92 | `research-034` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** For Alan Hirsch specifically, but applicable to others: content already exists (38+ videos) across 20+ third-party platforms (conference rec… |
| 93 | `research-035` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Missing audiobooks as revenue and access stream—most flagship titles have no audio version |
| 94 | `articles-037` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI Book—free knowledge spine establishing shared language |
| 95 | `articles-042` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content pipeline preview—demo of Movemental processing your work |
| 96 | `articles-044` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Codification without compromise—making patterns transmissible |
| 97 | `book-035` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Type-Safety Chain as Technical Alignment With Values |
| 98 | `book-040` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Context and Personalization as Required for Formation Work |
| 99 | `book-042` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Permission to Stay at Experimentation Level |
| 100 | `business-060` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Community Features: Comments, Forums, Member Directories |
| 101 | `business-071` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Speaking and Consulting Booking Integration |
| 102 | `research-037` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The current org-site manifesto mentions 'Infrastructure: Notion + AI' but the founder notes flag this as a placeholder example, not a commit… |
| 103 | `C-A04` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The guide posture — authority comes from sustained grappling, not from having figured it out |
| 104 | `C-P02` |  | 2% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizations, teaching at 4 seminaries, and speaki… |
| 105 | `C-P04` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church multiplication' may not land on Alan Hirsc… |
| 106 | `C-PR01` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental is built by movement leaders, for movement leaders. |
| 107 | `C-SP04` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Network amplification multiplies reach 28×–500× — the five multiplier effects |
| 108 | `C-SP07` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The first cohort defines the brand — early leaders are co-creators, not customers |
| 109 | `articles-039` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Ownership is stewardship, not empire—responsibility, not dominance |
| 110 | `articles-046` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Incoherence reads as instability—coherence is formation requirement |
| 111 | `articles-050` |  | 2% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental leaders include Alan Hirsch, Brad Brisco, and emerging voices |
| 112 | `articles-054` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI amplifies both crisis and opportunity—credibility becomes central |
| 113 | `book-002` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Tension: Using the Tool That Created the Problem |
| 114 | `book-003` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI Is an Anthropological Problem, Not a Technological One |
| 115 | `book-005` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Speed of Adoption and Dunning-Kruger With AI |
| 116 | `book-016` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** What AI Displaces: Relationship, Prayer, Embodiment, Presence, Formation |
| 117 | `book-033` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Research on AI Trust and Credibility Crisis |
| 118 | `book-045` |  | 3% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Book as Companionship in Uncertainty |
| 119 | `research-001` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement leaders are seminary-trained reformers stuck between institution and mission |
| 120 | `research-003` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch's engaged audience is measured at 50,000+ (confirmed through 150,000+ APEST assessments taken). |
| 121 | `research-016` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch's integrated intellectual architecture moves from Christology (who Christ is and what He inaugurated) through Missiology (the Ch… |
| 122 | `research-018` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken through Hirsch's platforms, making it a sig… |
| 123 | `articles-026` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Isolation makes structural problems feel normal |
| 124 | `book-024` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** From Gutenberg to Networks of Trust |
| 125 | `book-034` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Why Expertise Is Hard-Won and Worth Preserving |
| 126 | `book-043` |  | 0% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Look for Love: Markers of Credible AI Guidance |
| 127 | `research-023` |  | 3% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Org site purpose is to make work visible and legitimate as leaders sign up |
| 128 | `research-040` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Women are 18% of 146 scored movement leader candidates—gender gap in visibility and network |
| 129 | `research-048` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Founder preference: show work visible, not declare primary audience—let leaders choose whom to serve |
| 130 | `C-F03` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Multi-tenant platform architecture — one codebase serves many leader sites |
| 131 | `articles-011` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Formation goals and spiritual discernment tracking—unique to Movemental |
| 132 | `articles-016` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Pillar-cluster architecture for topical authority and AI citation |
| 133 | `articles-018` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** GEO (Generative Engine Optimization) complements SEO |
| 134 | `articles-019` |  | 2% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI used as editing gate, not content creator |
| 135 | `articles-025` |  | 2% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Corpus extraction to calibrate AI voice—not guessing, measuring |
| 136 | `articles-034` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** EEAT as the foundation for discoverability in search and AI |
| 137 | `articles-048` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** 30/60/90 day plan and commissioning liturgy—sending, not graduation |
| 138 | `book-018` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The 70/30 Rule: Sustainable Content Creation Model |
| 139 | `business-059` |  | 0% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Transparent Relationships: Network Verification Visible and Traceable |
| 140 | `business-069` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content Strategy Framework: Five Narrative Frames |
| 141 | `business-072` |  | 3% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Risk: Network Effects Don't Materialize |
| 142 | `business-073` |  | 3% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Risk: Quality Decline as Network Expands |
| 143 | `business-081` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Iterative Roadmap: Feedback-Driven, Not Feature-Driven |
| 144 | `C-A09` |  | 3% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Specialized agents preserve voice; generic AI homogenizes |
| 145 | `articles-029` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content length: depth determined by intent, not arbitrary word count |
| 146 | `articles-033` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Certificate system with verification codes and continuing education credits |
| 147 | `articles-036` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Formation Companion in courses—AI that knows the lesson, the week, the learner's context |
| 148 | `articles-052` |  | 3% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Voice fidelity scoring for AI-drafted content |
| 149 | `book-044` |  | 0% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Prompting as Humane Communication, Not Prompt Engineering |
| 150 | `business-034` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Semantic Search and Cross-Platform Discovery |
| 151 | `business-036` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Video Streaming with Progress Tracking and Series Organization |
| 152 | `business-037` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Digital Bookstore with Stripe Integration |
| 153 | `business-038` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Analytics: Real-Time Performance Tracking Across All Content |
| 154 | `business-043` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Geographic Expansion: English Markets First, Then Multi-Language |
| 155 | `business-049` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Voice Baseline System: Fingerprinting and Consistency |
| 156 | `business-055` |  | 0% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Quality Assurance Standards: 95% + 90% + 95% |
| 157 | `business-079` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Global Expansion: 10-20 Year Horizon |
| 158 | `business-086` |  | 3% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Operational Scaling: Team Expansion With Network |
| 159 | `business-065` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Five User Roles with Permission Levels |
| 160 | `business-082` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** API and Third-Party Integrations (Post-MVP) |
| 161 | `book-021` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Not a Technical Manual, Manifesto, or Sales Pitch |
| 162 | `book-031` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Relationship as Non-Negotiable Foundation |
| 163 | `book-049` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Three-Section Structure: Crisis, Response, Demonstration |
| 164 | `business-076` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Built on Movemental Theology: APEST, mDNA, Incarnational Mission |
| 165 | `research-005` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The founder notes emphasize this clearly: movement leaders live under genuine time and attention constraints. |
| 166 | `research-017` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Michael Frost and Alan Hirsch co-authored 'The Shaping of Things to Come' (2003), which introduced the mDNA (missional DNA) framework and be… |
| 167 | `research-019` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Rick Warren's 'The Purpose Driven Life' has sold 30+ million copies in 85+ languages, making it one of the best-selling books in history. |
| 168 | `research-020` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement leader cohort is academically credible and seminary-integrated |
| 169 | `research-029` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** You remain the leader, not the operator—Movemental handles infrastructure so you focus on movement |
| 170 | `research-033` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Social-to-email conversion is leaving 70-80% of audience on the table |
| 171 | `research-038` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Founder insight: manifesto may be low-trust slop—candidate for rewrite or demotion |
| 172 | `research-050` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch's network isn't scattered—it's coherent. |
| 173 | `book-047` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Theological Anthropology: What Happens to Human Vocation in an AI Age |

---
## Tab: walkthrough

**Mapped React files:**
- `src/app/(site)/walkthrough/page.tsx` → /walkthrough

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 173 |
| Heuristic block count | 4 |
| Ordered layout spine blocks | 4 |
| 1:1 pairing depth for sub-table | 4 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 1 |
| Partial | 28 |
| Weak | 144 |

### 1:1 rank ↔ layout spine (first 4 of 173 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `articles-013` — Eight-week formation scaffold with four non-negotiable necessities | **/walkthrough** · Section: See what a Movemental platform looks like |
| 2 | `book-018` — The 70/30 Rule: Sustainable Content Creation Model | **/walkthrough** · Section: (no Display/Eyebrow in block) |
| 3 | `C-F01` — Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA | **/walkthrough** · Section: What you will see |
| 4 | `business-032` — 22 Specialized AI Agents Trained on Movemental Theology | **/walkthrough** · Section: Ready to talk about what this could look like for you? |
| … | _Claims 5–173: no same-index layout block (argument list longer than layout spine)._ | |

### Claim-by-claim drift (all 173 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `articles-013` | yes | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Eight-week formation scaffold with four non-negotiable necessities |
| 2 | `book-018` | yes | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The 70/30 Rule: Sustainable Content Creation Model |
| 3 | `C-F01` | yes | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA |
| 4 | `business-032` | yes | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** 22 Specialized AI Agents Trained on Movemental Theology |
| 5 | `articles-017` | yes | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Evergreen article architecture with nine sections and voice markers |
| 6 | `C-PR02` | yes | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user management, content, media, e-commerce,… |
| 7 | `articles-019` | yes | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI used as editing gate, not content creator |
| 8 | `C-A03` | yes | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Amplification, not replacement — the AI control boundary for voice, insight, and authority |
| 9 | `C-F05` | yes | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The movemental-analysis documents for multiple leaders identify the same opportunity: existing embodied work (talks, teaching, training) can… |
| 10 | `articles-015` | yes | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Pathways as formation journeys, not topic pages |
| 11 | `articles-030` | yes | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Lab with context awareness from personality to formation goals |
| 12 | `C-F10` | yes | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Five-stage AI maturity model — from native awareness to mature public leadership |
| 13 | `articles-025` | yes | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Corpus extraction to calibrate AI voice—not guessing, measuring |
| 14 | `articles-052` | yes | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Voice fidelity scoring for AI-drafted content |
| 15 | `business-049` | yes | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Voice Baseline System: Fingerprinting and Consistency |
| 16 | `articles-016` | yes | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Pillar-cluster architecture for topical authority and AI citation |
| 17 | `articles-018` | yes | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** GEO (Generative Engine Optimization) complements SEO |
| 18 | `articles-034` | yes | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** EEAT as the foundation for discoverability in search and AI |
| 19 | `articles-032` | yes | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Assessment engine for APEST, mDNA, maturity, vocational calling |
| 20 | `C-F09` | yes | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** For organizational partners (nonprofits, churches, denominations), Movemental offers five modular system builds. |
| 21 | `C-F03` | yes | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Multi-tenant platform architecture — one codebase serves many leader sites |
| 22 | `business-045` | yes | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Why Movemental Can Underprice: AI-Powered Development Cost Curve |
| 23 | `C-A01` | yes | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Scenius (Brian Eno's term for collaborative genius emerging from creative networks) is the primary mechanism for credibility in the AI age. |
| 24 | `book-035` | yes | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Type-Safety Chain as Technical Alignment With Values |
| 25 | `business-063` | yes | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** 12-Week Onboarding: Platform Deployment + Voice Capture + Strategy |
| 26 | `articles-048` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** 30/60/90 day plan and commissioning liturgy—sending, not graduation |
| 27 | `articles-011` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Formation goals and spiritual discernment tracking—unique to Movemental |
| 28 | `business-031` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Three-Layer Maturity Model: mDNA > Leadership > Content |
| 29 | `C-A07` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Slowing down as resistance — AI can enable pace, not just acceleration |
| 30 | `C-S30` |  | 2% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch's core theological positioning, per the reflected understanding: 'You're called to reactivate what's latent. |
| 31 | `C-A06` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** This moment is different — AI's speed, the accelerating crisis, and the closing window |
| 32 | `C-A05` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Refusal as love — what AI must not do, framed as protection of the sacred |
| 33 | `C-PR04` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional work) demonstrated in practice the frame… |
| 34 | `articles-020` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI as furnace needs a hearth—not savior, not threat |
| 35 | `research-025` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Alan Hirsch opportunity analysis identifies: '150,000+ APEST assessment takers currently leave after seeing results. |
| 36 | `research-034` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** For Alan Hirsch specifically, but applicable to others: content already exists (38+ videos) across 20+ third-party platforms (conference rec… |
| 37 | `business-069` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content Strategy Framework: Five Narrative Frames |
| 38 | `articles-049` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Curation over growth—maintaining relational credibility at bounded scale |
| 39 | `business-029` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Execution Path: 100-Leader Scenius Network |
| 40 | `book-010` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Experimentation as Prerequisite to Discernment |
| 41 | `business-042` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Go-To-Market: Invitation-Only, Relationship-Based Growth |
| 42 | `business-081` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Iterative Roadmap: Feedback-Driven, Not Feature-Driven |
| 43 | `book-037` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Leaders Don't Need Technical Expertise to Lead With AI |
| 44 | `business-088` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Metrics and Signals: What Success Actually Looks Like |
| 45 | `research-035` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Missing audiobooks as revenue and access stream—most flagship titles have no audio version |
| 46 | `business-016` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** MVP Definition: Core Value Over Feature Completeness |
| 47 | `business-077` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Qualification Gate: mDNA Foundation Required |
| 48 | `business-078` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Qualification Gate: Visible Movement Impact Required |
| 49 | `articles-038` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Recommended learning journey: spiral through five theological portals |
| 50 | `articles-027` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Repurposing existing work into articles is legitimate and necessary |
| 51 | `business-072` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Risk: Network Effects Don't Materialize |
| 52 | `business-073` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Risk: Quality Decline as Network Expands |
| 53 | `business-041` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Security and Compliance: HTTPS, Encryption, RBAC, GDPR-Ready |
| 54 | `business-066` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Sustainable Content Creation: 5-Hour Week Model |
| 55 | `book-013` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Theological Integrity as Non-Negotiable in Christian Content |
| 56 | `research-008` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The reflected-understanding analysis for Alan Hirsch flags: 'Your content is not translated into key languages—including those with large po… |
| 57 | `book-012` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Transparency as Trust Signal and Credibility Protection |
| 58 | `business-059` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Transparent Relationships: Network Verification Visible and Traceable |
| 59 | `articles-035` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Uniform platform, distinct expression—one engine, different cars |
| 60 | `book-015` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** What Churches Are Free (and Obligated) to Do |
| 61 | `C-T10` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Future vision — AI becomes a trusted knowledge graph and ministry companion |
| 62 | `C-A09` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Specialized agents preserve voice; generic AI homogenizes |
| 63 | `articles-037` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI Book—free knowledge spine establishing shared language |
| 64 | `business-038` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Analytics: Real-Time Performance Tracking Across All Content |
| 65 | `research-049` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Before launching a leader on Movemental, a thoughtful onboarding should assess: (1) content maturity (how much existing content is there to… |
| 66 | `articles-033` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Certificate system with verification codes and continuing education credits |
| 67 | `articles-044` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Codification without compromise—making patterns transmissible |
| 68 | `business-060` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Community Features: Comments, Forums, Member Directories |
| 69 | `research-047` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The founder notes: 'For movement leaders, approval of AI-affected public voice is anchored in the leader (and their process)—detail TBD when… |
| 70 | `articles-029` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content length: depth determined by intent, not arbitrary word count |
| 71 | `business-033` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content Management System with Real-Time Collaborative Editing |
| 72 | `articles-042` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Content pipeline preview—demo of Movemental processing your work |
| 73 | `book-040` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Context and Personalization as Required for Formation Work |
| 74 | `business-037` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Digital Bookstore with Stripe Integration |
| 75 | `articles-036` |  | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Formation Companion in courses—AI that knows the lesson, the week, the learner's context |
| 76 | `research-037` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The current org-site manifesto mentions 'Infrastructure: Notion + AI' but the founder notes flag this as a placeholder example, not a commit… |
| 77 | `business-043` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Geographic Expansion: English Markets First, Then Multi-Language |
| 78 | `business-079` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Global Expansion: 10-20 Year Horizon |
| 79 | `business-035` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Learning Management System: Courses with Progress Tracking and Certificates |
| 80 | `articles-055` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Multi-language support—books, articles, and AI in Spanish, Portuguese, etc. |
| 81 | `business-086` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Operational Scaling: Team Expansion With Network |
| 82 | `business-089` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Partnership Pathways: Institutional + Relational |
| 83 | `book-042` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Permission to Stay at Experimentation Level |
| 84 | `book-044` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Prompting as Humane Communication, Not Prompt Engineering |
| 85 | `business-055` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Quality Assurance Standards: 95% + 90% + 95% |
| 86 | `business-034` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Semantic Search and Cross-Platform Discovery |
| 87 | `business-071` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Speaking and Consulting Booking Integration |
| 88 | `business-036` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Video Streaming with Progress Tracking and Series Organization |
| 89 | `business-082` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** API and Third-Party Integrations (Post-MVP) |
| 90 | `business-065` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Five User Roles with Permission Levels |
| 91 | `C-SP07` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The first cohort defines the brand — early leaders are co-creators, not customers |
| 92 | `book-006` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Why Movement Leaders Were Right to Ignore SEO Until Now |
| 93 | `C-T01` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Christocentric spine — Jesus at the center is load-bearing, not decorative |
| 94 | `C-T02` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Four things hold Movemental together and are non-negotiable. |
| 95 | `research-041` |  | 22% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movement leaders solve for multiplication and reproduction, not institutional sustainability |
| 96 | `research-046` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, network, hybrid, digital, denominational, inde… |
| 97 | `research-021` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The founder notes state: 'Primary customer today: individual movement leaders (relationship/word-of-mouth is the real acquisition path). |
| 98 | `research-039` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Alan Hirsch opportunity analysis estimates $140K-$380K/year in additional revenue could be realized through: (1) scaled online courses o… |
| 99 | `C-BM01` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform ownership creates long-term asset buildi… |
| 100 | `C-P02` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizations, teaching at 4 seminaries, and speaki… |
| 101 | `C-P04` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church multiplication' may not land on Alan Hirsc… |
| 102 | `articles-046` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Incoherence reads as instability—coherence is formation requirement |
| 103 | `C-AU01` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental looks for leaders who catalyze visible, verifiable movement (transformation that multiplies beyond direct oversight), not just pl… |
| 104 | `C-P01` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** 68% of internet users now struggle to distinguish human-created from AI-generated content. |
| 105 | `C-SP05` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Everything in one home — consolidation that surfaces and unifies the leader's existing credibility |
| 106 | `articles-047` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Communitas through shared risk and mission, not comfort |
| 107 | `research-018` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken through Hirsch's platforms, making it a sig… |
| 108 | `research-036` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Exponential, Verge, and Missio Alliance events: movement leader ecosystem is visible and organized |
| 109 | `book-043` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Look for Love: Markers of Credible AI Guidance |
| 110 | `book-004` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Adaptive Leadership as the Response to AI |
| 111 | `business-009` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Formation Must Accompany Amplification |
| 112 | `business-018` |  | 19% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Revolutionary Pricing: $1,000 + 10% vs. Industry Standard |
| 113 | `C-A10` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Scarcity is structural — curation at bounded scale is how trust, scenius, and movement survive |
| 114 | `C-P03` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The false choice — traditional publisher or rental platform, both extractive, neither sustainable |
| 115 | `C-POS06` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck |
| 116 | `C-A08` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Content that transforms vs. content that extracts — an ethical distinction |
| 117 | `articles-040` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The stakes are spiritual and generational, not just personal efficiency |
| 118 | `business-025` |  | 4% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Convergence: Four Concepts That Demand Something New |
| 119 | `business-080` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** What Moves Movemental: Movement Multiplication, Not Profit Maximization |
| 120 | `research-027` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The founder clarifies: archetypes mentioned (Alan Hirsch, Brad Brisco) are not just 'authors and speakers'—definition is broader. |
| 121 | `business-054` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** vs. Custom Development: Speed, Cost, Network |
| 122 | `business-019` |  | 18% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Platform Ownership: Not Rental, Complete Control |
| 123 | `C-POS01` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement infrastructure for a credibility-scarce age — not a website, not another SaaS |
| 124 | `C-SP04` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Network amplification multiplies reach 28×–500× — the five multiplier effects |
| 125 | `business-003` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Formation Crisis: Growth Over Substance |
| 126 | `business-076` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Built on Movemental Theology: APEST, mDNA, Incarnational Mission |
| 127 | `research-001` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement leaders are seminary-trained reformers stuck between institution and mission |
| 128 | `research-002` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** A second major persona is the multiplication leader—church planters, bivocational pioneers, and network strategists who think in terms of re… |
| 129 | `research-003` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch's engaged audience is measured at 50,000+ (confirmed through 150,000+ APEST assessments taken). |
| 130 | `research-022` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The founder preference: show that all these groups are served, without hierarchy in public copy. |
| 131 | `research-050` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch's network isn't scattered—it's coherent. |
| 132 | `articles-026` |  | 2% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Isolation makes structural problems feel normal |
| 133 | `research-030` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Context matters: Western church fragmentation, AI disruption, and capacity gaps create urgent need |
| 134 | `C-T03` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Embodied ministry cannot be automated — digital supports presence, never replaces it |
| 135 | `articles-039` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Ownership is stewardship, not empire—responsibility, not dominance |
| 136 | `book-016` |  | 16% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** What AI Displaces: Relationship, Prayer, Embodiment, Presence, Formation |
| 137 | `business-001` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Technology Properly Ordered to Serve Mission |
| 138 | `business-058` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** What Breaks Company If Ignored: Five Non-Negotiables |
| 139 | `book-034` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Why Expertise Is Hard-Won and Worth Preserving |
| 140 | `business-083` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Continuous Learning: Improvement Built Into Culture |
| 141 | `research-040` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Women are 18% of 146 scored movement leader candidates—gender gap in visibility and network |
| 142 | `C-A02` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Credibility differs from influence — measurable but not reducible to a metric |
| 143 | `business-007` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Credibility: Trust + Expertise + Character + Platform |
| 144 | `C-A11` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing |
| 145 | `business-075` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Economic Justice: Fair Exchange, Not Extraction |
| 146 | `research-010` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental is not a publishing house or SaaS—it's a venture-builder studio with aligned incentives |
| 147 | `C-A04` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The guide posture — authority comes from sustained grappling, not from having figured it out |
| 148 | `C-PR01` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental is built by movement leaders, for movement leaders. |
| 149 | `articles-050` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movemental leaders include Alan Hirsch, Brad Brisco, and emerging voices |
| 150 | `articles-054` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** AI amplifies both crisis and opportunity—credibility becomes central |
| 151 | `book-002` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Tension: Using the Tool That Created the Problem |
| 152 | `book-003` |  | 18% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** AI Is an Anthropological Problem, Not a Technological One |
| 153 | `book-005` |  | 7% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Speed of Adoption and Dunning-Kruger With AI |
| 154 | `book-033` |  | 5% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Research on AI Trust and Credibility Crisis |
| 155 | `book-045` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The Book as Companionship in Uncertainty |
| 156 | `research-005` |  | 8% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The founder notes emphasize this clearly: movement leaders live under genuine time and attention constraints. |
| 157 | `research-016` |  | 13% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Alan Hirsch's integrated intellectual architecture moves from Christology (who Christ is and what He inaugurated) through Missiology (the Ch… |
| 158 | `research-029` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** You remain the leader, not the operator—Movemental handles infrastructure so you focus on movement |
| 159 | `research-033` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Social-to-email conversion is leaving 70-80% of audience on the table |
| 160 | `book-024` |  | 12% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** From Gutenberg to Networks of Trust |
| 161 | `research-023` |  | 0% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Org site purpose is to make work visible and legitimate as leaders sign up |
| 162 | `research-048` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Founder preference: show work visible, not declare primary audience—let leaders choose whom to serve |
| 163 | `business-051` |  | 9% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** vs. Traditional Publishers: Ownership + Speed + Economics |
| 164 | `business-052` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** vs. Digital Platforms (Substack/Patreon): Ownership Matters |
| 165 | `business-053` |  | 24% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** vs. WordPress/Squarespace: Network Effects |
| 166 | `book-021` |  | 10% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Not a Technical Manual, Manifesto, or Sales Pitch |
| 167 | `book-031` |  | 20% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Relationship as Non-Negotiable Foundation |
| 168 | `book-049` |  | 6% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** The Three-Section Structure: Crisis, Response, Demonstration |
| 169 | `research-017` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Michael Frost and Alan Hirsch co-authored 'The Shaping of Things to Come' (2003), which introduced the mDNA (missional DNA) framework and be… |
| 170 | `research-019` |  | 17% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Rick Warren's 'The Purpose Driven Life' has sold 30+ million copies in 85+ languages, making it one of the best-selling books in history. |
| 171 | `research-020` |  | 11% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Movement leader cohort is academically credible and seminary-integrated |
| 172 | `research-038` |  | 15% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Founder insight: manifesto may be low-trust slop—candidate for rewrite or demotion |
| 173 | `book-047` |  | 14% | Likely missing or heavily paraphrased vs mapped source. |
| | | | | **Claim:** Theological Anthropology: What Happens to Human Vocation in an AI Age |

---
## Tab: who we serve

**Mapped React files:**
- `src/app/(site)/who-is-a-movement-leader/page.tsx` → /who-is-a-movement-leader
- `src/app/(site)/movement-leaders/page.tsx` → /movement-leaders
- `src/app/(site)/churches/page.tsx` → /churches
- `src/app/(site)/nonprofits/page.tsx` → /nonprofits

| Metric | Value |
|--------|-------|
| Ordered claims in tabbed HTML | 173 |
| Heuristic block count | 42 |
| Ordered layout spine blocks | 38 |
| 1:1 pairing depth for sub-table | 38 |

**Coverage (token heuristic):** strong ≥35% · partial 18–35% · weak <18%

| Bucket | Count |
|--------|-------|
| Strong | 165 |
| Partial | 8 |
| Weak | 0 |

### 1:1 rank ↔ layout spine (first 38 of 173 claims)

| Rank | Argument ID + shorthand | Same-rank layout block |
|------|-------------------------|-------------------------|
| 1 | `C-P04` — Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church mu | **/who-is-a-movement-leader** · Section: Who is a Movement Leader? |
| 2 | `C-BM01` — For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform  | **/who-is-a-movement-leader** · Section: A movement leader is someone who forms people in ways that multiply |
| 3 | `C-SP05` — Everything in one home — consolidation that surfaces and unifies the leader's existing credibility | **/who-is-a-movement-leader** · Section: The category has to be larger than its earliest examples |
| 4 | `research-029` — You remain the leader, not the operator—Movemental handles infrastructure so you focus on movement | **/who-is-a-movement-leader** · Section: What these leaders have in common |
| 5 | `C-P02` — Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizatio | **/who-is-a-movement-leader** · Section: The marks of a movement leader |
| 6 | `C-SP04` — Network amplification multiplies reach 28×–500× — the five multiplier effects | **/who-is-a-movement-leader** · Section: What movement leaders are not defined by |
| 7 | `business-019` — Platform Ownership: Not Rental, Complete Control | **/who-is-a-movement-leader** · Section: Why this matters now |
| 8 | `C-F05` — The movemental-analysis documents for multiple leaders identify the same opportunity: existing embod | **/who-is-a-movement-leader** · Section: A better question than "Do I fit?" |
| 9 | `C-F01` — Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA | **/who-is-a-movement-leader** · Section: If this describes your work, you should not have to build alone |
| 10 | `business-066` — Sustainable Content Creation: 5-Hour Week Model | **/movement-leaders** · LightHeroPhotoBackdrop: For leaders whose work already moves through people |
| 11 | `research-005` — The founder notes emphasize this clearly: movement leaders live under genuine time and attention con | **/movement-leaders** · Section: Your credibility is real. Online, it is fragmented. |
| 12 | `articles-039` — Ownership is stewardship, not empire—responsibility, not dominance | **/movement-leaders** · Section: This page is for you if… |
| 13 | `C-P01` — 68% of internet users now struggle to distinguish human-created from AI-generated content. | **/movement-leaders** · Section: How qualification works |
| 14 | `C-SP07` — The first cohort defines the brand — early leaders are co-creators, not customers | **/movement-leaders** · Section: What you get |
| 15 | `C-AU01` — Movemental looks for leaders who catalyze visible, verifiable movement (transformation that multipli | **/movement-leaders** · Section: You are not meant to publish alone |
| 16 | `business-063` — 12-Week Onboarding: Platform Deployment + Voice Capture + Strategy | **/movement-leaders** · Section: AI is an amplifier, not an author of your authority |
| 17 | `research-018` — Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken thr | **/movement-leaders** · Section: Aligned economics |
| 18 | `research-021` — The founder notes state: 'Primary customer today: individual movement leaders (relationship/word-of- | **/movement-leaders** · Section: If your work already carries weight, it should have infrastructure to match |
| 19 | `research-039` — The Alan Hirsch opportunity analysis estimates $140K-$380K/year in additional revenue could be reali | **/churches** · Section: Your church does not need more content. It needs a formation system. |
| 20 | `research-001` — Movement leaders are seminary-trained reformers stuck between institution and mission | **/churches** · Section: (no Display/Eyebrow in block) |
| 21 | `research-002` — A second major persona is the multiplication leader—church planters, bivocational pioneers, and netw | **/churches** · Section: Sunday content is not the same thing as ongoing formation |
| 22 | `articles-030` — AI Lab with context awareness from personality to formation goals | **/churches** · Section: What churches need now |
| 23 | `business-032` — 22 Specialized AI Agents Trained on Movemental Theology | **/churches** · Section: What Movemental makes possible |
| 24 | `book-004` — Adaptive Leadership as the Response to AI | **/churches** · Section: Formation over growth is not a slogan here |
| 25 | `articles-032` — Assessment engine for APEST, mDNA, maturity, vocational calling | **/churches** · Section: How AI can serve a church responsibly |
| 26 | `research-025` — The Alan Hirsch opportunity analysis identifies: '150,000+ APEST assessment takers currently leave a | **/churches** · Section: Usefulness without surrender |
| 27 | `research-034` — For Alan Hirsch specifically, but applicable to others: content already exists (38+ videos) across 2 | **/churches** · Section: This is best for churches that… |
| 28 | `research-046` — A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, networ | **/churches** · Section: If your church wants to form people more intentionally, the system matters |
| 29 | `articles-013` — Eight-week formation scaffold with four non-negotiable necessities | **/nonprofits** · LightHeroPhotoBackdrop: Turn your mission into a system people can actually move through |
| 30 | `articles-017` — Evergreen article architecture with nine sections and voice markers | **/nonprofits** · Section: We install the systems your organization should already have—but often does not |
| 31 | `business-029` — Execution Path: 100-Leader Scenius Network | **/nonprofits** · Section: Most nonprofit digital stacks were not built for formation |
| 32 | `book-010` — Experimentation as Prerequisite to Discernment | **/nonprofits** · Section: You do not need more content production |
| 33 | `business-009` — Formation Must Accompany Amplification | **/nonprofits** · Section: A connected system for mission-shaped organizations |
| 34 | `articles-046` — Incoherence reads as instability—coherence is formation requirement | **/nonprofits** · Section: Formation and sustainability are not separate problems |
| 35 | `book-037` — Leaders Don't Need Technical Expertise to Lead With AI | **/nonprofits** · Section: Not another tool in the stack |
| 36 | `research-035` — Missing audiobooks as revenue and access stream—most flagship titles have no audio version | **/nonprofits** · Section: AI that serves your mission, not generic automation |
| 37 | `research-027` — The founder clarifies: archetypes mentioned (Alan Hirsch, Brad Brisco) are not just 'authors and spe | **/nonprofits** · Section: Best fit for organizations that… |
| 38 | `research-041` — Movement leaders solve for multiplication and reproduction, not institutional sustainability | **/nonprofits** · Section: If your mission depends on people changing over time, you need more than a website |
| … | _Claims 39–173: no same-index layout block (argument list longer than layout spine)._ | |

### Claim-by-claim drift (all 173 rows)

| # | ID | Head? | Match | Drift note |
|---|----|-------|-------|------------|
| 1 | `C-P04` | yes | 53% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Someone searching for 'APEST framework,' 'apostolic genius,' 'missional ecclesiology,' or 'church multiplication' may not land on Alan Hirsc… |
| 2 | `C-BM01` | yes | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** For movemental leaders: 90% revenue retention enables sustainable full-time movement work, platform ownership creates long-term asset buildi… |
| 3 | `C-SP05` | yes | 55% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Everything in one home — consolidation that surfaces and unifies the leader's existing credibility |
| 4 | `research-029` | yes | 55% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** You remain the leader, not the operator—Movemental handles infrastructure so you focus on movement |
| 5 | `C-P02` | yes | 52% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch has 20 books (with 10 co-authors), 27 organizational affiliations, 5 founded organizations, teaching at 4 seminaries, and speaki… |
| 6 | `C-SP04` | yes | 60% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Network amplification multiplies reach 28×–500× — the five multiplier effects |
| 7 | `business-019` | yes | 53% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Platform Ownership: Not Rental, Complete Control |
| 8 | `C-F05` | yes | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The movemental-analysis documents for multiple leaders identify the same opportunity: existing embodied work (talks, teaching, training) can… |
| 9 | `C-F01` | yes | 59% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Voice-preserving AI — scenius-trained on the leader's corpus and theological DNA |
| 10 | `business-066` | yes | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Sustainable Content Creation: 5-Hour Week Model |
| 11 | `research-005` | yes | 57% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder notes emphasize this clearly: movement leaders live under genuine time and attention constraints. |
| 12 | `articles-039` | yes | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Ownership is stewardship, not empire—responsibility, not dominance |
| 13 | `C-P01` | yes | 51% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 68% of internet users now struggle to distinguish human-created from AI-generated content. |
| 14 | `C-SP07` | yes | 46% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The first cohort defines the brand — early leaders are co-creators, not customers |
| 15 | `C-AU01` | yes | 63% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movemental looks for leaders who catalyze visible, verifiable movement (transformation that multiplies beyond direct oversight), not just pl… |
| 16 | `business-063` | yes | 60% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 12-Week Onboarding: Platform Deployment + Voice Capture + Strategy |
| 17 | `research-018` | yes | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Over 150,000 APEST (Apostle, Prophet, Evangelist, Shepherd, Teacher) assessments have been taken through Hirsch's platforms, making it a sig… |
| 18 | `research-021` | yes | 49% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder notes state: 'Primary customer today: individual movement leaders (relationship/word-of-mouth is the real acquisition path). |
| 19 | `research-039` | yes | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Alan Hirsch opportunity analysis estimates $140K-$380K/year in additional revenue could be realized through: (1) scaled online courses o… |
| 20 | `research-001` | yes | 56% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movement leaders are seminary-trained reformers stuck between institution and mission |
| 21 | `research-002` | yes | 56% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** A second major persona is the multiplication leader—church planters, bivocational pioneers, and network strategists who think in terms of re… |
| 22 | `articles-030` | yes | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI Lab with context awareness from personality to formation goals |
| 23 | `business-032` | yes | 64% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 22 Specialized AI Agents Trained on Movemental Theology |
| 24 | `book-004` | yes | 59% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Adaptive Leadership as the Response to AI |
| 25 | `articles-032` | yes | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Assessment engine for APEST, mDNA, maturity, vocational calling |
| 26 | `research-025` |  | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Alan Hirsch opportunity analysis identifies: '150,000+ APEST assessment takers currently leave after seeing results. |
| 27 | `research-034` |  | 45% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** For Alan Hirsch specifically, but applicable to others: content already exists (38+ videos) across 20+ third-party platforms (conference rec… |
| 28 | `research-046` |  | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** A unifying argument across the 100-leader cohort: form is flexible (house church, megachurch, network, hybrid, digital, denominational, inde… |
| 29 | `articles-013` |  | 52% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Eight-week formation scaffold with four non-negotiable necessities |
| 30 | `articles-017` |  | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Evergreen article architecture with nine sections and voice markers |
| 31 | `business-029` |  | 50% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Execution Path: 100-Leader Scenius Network |
| 32 | `book-010` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Experimentation as Prerequisite to Discernment |
| 33 | `business-009` |  | 66% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Formation Must Accompany Amplification |
| 34 | `articles-046` |  | 62% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Incoherence reads as instability—coherence is formation requirement |
| 35 | `book-037` |  | 67% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Leaders Don't Need Technical Expertise to Lead With AI |
| 36 | `research-035` |  | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Missing audiobooks as revenue and access stream—most flagship titles have no audio version |
| 37 | `research-027` |  | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder clarifies: archetypes mentioned (Alan Hirsch, Brad Brisco) are not just 'authors and speakers'—definition is broader. |
| 38 | `research-041` |  | 57% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movement leaders solve for multiplication and reproduction, not institutional sustainability |
| 39 | `articles-015` |  | 45% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Pathways as formation journeys, not topic pages |
| 40 | `business-077` |  | 56% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Qualification Gate: mDNA Foundation Required |
| 41 | `business-078` |  | 51% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Qualification Gate: Visible Movement Impact Required |
| 42 | `articles-038` |  | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Recommended learning journey: spiral through five theological portals |
| 43 | `articles-027` |  | 46% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Repurposing existing work into articles is legitimate and necessary |
| 44 | `research-033` |  | 59% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Social-to-email conversion is leaving 70-80% of audience on the table |
| 45 | `research-003` |  | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch's engaged audience is measured at 50,000+ (confirmed through 150,000+ APEST assessments taken). |
| 46 | `business-031` |  | 65% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Three-Layer Maturity Model: mDNA > Leadership > Content |
| 47 | `research-008` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The reflected-understanding analysis for Alan Hirsch flags: 'Your content is not translated into key languages—including those with large po… |
| 48 | `book-016` |  | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What AI Displaces: Relationship, Prayer, Embodiment, Presence, Formation |
| 49 | `business-060` |  | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Community Features: Comments, Forums, Member Directories |
| 50 | `articles-026` |  | 49% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Isolation makes structural problems feel normal |
| 51 | `book-043` |  | 59% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Look for Love: Markers of Credible AI Guidance |
| 52 | `book-042` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Permission to Stay at Experimentation Level |
| 53 | `business-071` |  | 53% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Speaking and Consulting Booking Integration |
| 54 | `book-034` |  | 55% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Why Expertise Is Hard-Won and Worth Preserving |
| 55 | `book-006` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Why Movement Leaders Were Right to Ignore SEO Until Now |
| 56 | `research-040` |  | 42% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Women are 18% of 146 scored movement leader candidates—gender gap in visibility and network |
| 57 | `C-F09` |  | 57% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** For organizational partners (nonprofits, churches, denominations), Movemental offers five modular system builds. |
| 58 | `C-T03` |  | 63% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Embodied ministry cannot be automated — digital supports presence, never replaces it |
| 59 | `C-A05` |  | 54% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Refusal as love — what AI must not do, framed as protection of the sacred |
| 60 | `research-030` |  | 69% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Context matters: Western church fragmentation, AI disruption, and capacity gaps create urgent need |
| 61 | `C-T02` |  | 66% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Four things hold Movemental together and are non-negotiable. |
| 62 | `book-015` |  | 53% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What Churches Are Free (and Obligated) to Do |
| 63 | `C-T01` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Christocentric spine — Jesus at the center is load-bearing, not decorative |
| 64 | `C-F10` |  | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Five-stage AI maturity model — from native awareness to mature public leadership |
| 65 | `business-080` |  | 61% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What Moves Movemental: Movement Multiplication, Not Profit Maximization |
| 66 | `C-POS01` |  | 60% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movement infrastructure for a credibility-scarce age — not a website, not another SaaS |
| 67 | `business-001` |  | 73% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Technology Properly Ordered to Serve Mission |
| 68 | `research-036` |  | 45% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Exponential, Verge, and Missio Alliance events: movement leader ecosystem is visible and organized |
| 69 | `research-022` |  | 45% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder preference: show that all these groups are served, without hierarchy in public copy. |
| 70 | `C-A08` |  | 50% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content that transforms vs. content that extracts — an ethical distinction |
| 71 | `C-T10` |  | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Future vision — AI becomes a trusted knowledge graph and ministry companion |
| 72 | `C-A01` |  | 71% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Scenius (Brian Eno's term for collaborative genius emerging from creative networks) is the primary mechanism for credibility in the AI age. |
| 73 | `C-P03` |  | 59% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The false choice — traditional publisher or rental platform, both extractive, neither sustainable |
| 74 | `C-A06` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** This moment is different — AI's speed, the accelerating crisis, and the closing window |
| 75 | `C-POS06` |  | 50% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Explicitly capped at 100 movement leaders — curation is positioning, not a growth bottleneck |
| 76 | `C-A10` |  | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Scarcity is structural — curation at bounded scale is how trust, scenius, and movement survive |
| 77 | `articles-047` |  | 62% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Communitas through shared risk and mission, not comfort |
| 78 | `business-025` |  | 54% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Convergence: Four Concepts That Demand Something New |
| 79 | `business-003` |  | 62% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Formation Crisis: Growth Over Substance |
| 80 | `articles-040` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The stakes are spiritual and generational, not just personal efficiency |
| 81 | `articles-035` |  | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Uniform platform, distinct expression—one engine, different cars |
| 82 | `business-058` |  | 51% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** What Breaks Company If Ignored: Five Non-Negotiables |
| 83 | `business-033` |  | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content Management System with Real-Time Collaborative Editing |
| 84 | `business-083` |  | 35% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Continuous Learning: Improvement Built Into Culture |
| 85 | `business-035` |  | 55% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Learning Management System: Courses with Progress Tracking and Certificates |
| 86 | `articles-055` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Multi-language support—books, articles, and AI in Spanish, Portuguese, etc. |
| 87 | `business-089` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Partnership Pathways: Institutional + Relational |
| 88 | `articles-050` |  | 50% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movemental leaders include Alan Hirsch, Brad Brisco, and emerging voices |
| 89 | `research-016` |  | 64% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch's integrated intellectual architecture moves from Christology (who Christ is and what He inaugurated) through Missiology (the Ch… |
| 90 | `research-023` |  | 55% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Org site purpose is to make work visible and legitimate as leaders sign up |
| 91 | `research-048` |  | 49% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Founder preference: show work visible, not declare primary audience—let leaders choose whom to serve |
| 92 | `business-088` |  | 62% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Metrics and Signals: What Success Actually Looks Like |
| 93 | `articles-033` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Certificate system with verification codes and continuing education credits |
| 94 | `C-S30` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch's core theological positioning, per the reflected understanding: 'You're called to reactivate what's latent. |
| 95 | `articles-049` |  | 53% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Curation over growth—maintaining relational credibility at bounded scale |
| 96 | `business-007` |  | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Credibility: Trust + Expertise + Character + Platform |
| 97 | `research-019` |  | 46% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Rick Warren's 'The Purpose Driven Life' has sold 30+ million copies in 85+ languages, making it one of the best-selling books in history. |
| 98 | `C-PR01` |  | 68% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movemental is built by movement leaders, for movement leaders. |
| 99 | `book-024` |  | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** From Gutenberg to Networks of Trust |
| 100 | `C-A11` |  | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Why 90/10 is just — movement leaders have been structurally underpaid by extractive publishing |
| 101 | `business-054` |  | 52% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. Custom Development: Speed, Cost, Network |
| 102 | `business-043` |  | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Geographic Expansion: English Markets First, Then Multi-Language |
| 103 | `research-049` |  | 66% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Before launching a leader on Movemental, a thoughtful onboarding should assess: (1) content maturity (how much existing content is there to… |
| 104 | `business-018` |  | 46% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Revolutionary Pricing: $1,000 + 10% vs. Industry Standard |
| 105 | `research-017` |  | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Michael Frost and Alan Hirsch co-authored 'The Shaping of Things to Come' (2003), which introduced the mDNA (missional DNA) framework and be… |
| 106 | `research-020` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movement leader cohort is academically credible and seminary-integrated |
| 107 | `research-050` |  | 53% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Alan Hirsch's network isn't scattered—it's coherent. |
| 108 | `book-003` |  | 53% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI Is an Anthropological Problem, Not a Technological One |
| 109 | `book-033` |  | 32% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Research on AI Trust and Credibility Crisis |
| 110 | `book-045` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Book as Companionship in Uncertainty |
| 111 | `business-042` |  | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Go-To-Market: Invitation-Only, Relationship-Based Growth |
| 112 | `business-045` |  | 35% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Why Movemental Can Underprice: AI-Powered Development Cost Curve |
| 113 | `book-013` |  | 53% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Theological Integrity as Non-Negotiable in Christian Content |
| 114 | `business-041` |  | 21% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Security and Compliance: HTTPS, Encryption, RBAC, GDPR-Ready |
| 115 | `business-075` |  | 67% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Economic Justice: Fair Exchange, Not Extraction |
| 116 | `research-010` |  | 40% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Movemental is not a publishing house or SaaS—it's a venture-builder studio with aligned incentives |
| 117 | `research-047` |  | 49% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The founder notes: 'For movement leaders, approval of AI-affected public voice is anchored in the leader (and their process)—detail TBD when… |
| 118 | `articles-025` |  | 33% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Corpus extraction to calibrate AI voice—not guessing, measuring |
| 119 | `articles-034` |  | 57% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** EEAT as the foundation for discoverability in search and AI |
| 120 | `business-016` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** MVP Definition: Core Value Over Feature Completeness |
| 121 | `business-051` |  | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. Traditional Publishers: Ownership + Speed + Economics |
| 122 | `business-052` |  | 67% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. Digital Platforms (Substack/Patreon): Ownership Matters |
| 123 | `business-053` |  | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** vs. WordPress/Squarespace: Network Effects |
| 124 | `business-059` |  | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Transparent Relationships: Network Verification Visible and Traceable |
| 125 | `business-072` |  | 46% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Risk: Network Effects Don't Materialize |
| 126 | `business-073` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Risk: Quality Decline as Network Expands |
| 127 | `business-081` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Iterative Roadmap: Feedback-Driven, Not Feature-Driven |
| 128 | `business-034` |  | 51% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Semantic Search and Cross-Platform Discovery |
| 129 | `business-036` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Video Streaming with Progress Tracking and Series Organization |
| 130 | `business-037` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Digital Bookstore with Stripe Integration |
| 131 | `business-038` |  | 57% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Analytics: Real-Time Performance Tracking Across All Content |
| 132 | `business-086` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Operational Scaling: Team Expansion With Network |
| 133 | `C-A02` |  | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Credibility differs from influence — measurable but not reducible to a metric |
| 134 | `articles-020` |  | 37% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI as furnace needs a hearth—not savior, not threat |
| 135 | `book-021` |  | 52% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Not a Technical Manual, Manifesto, or Sales Pitch |
| 136 | `book-049` |  | 36% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Three-Section Structure: Crisis, Response, Demonstration |
| 137 | `articles-037` |  | 50% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI Book—free knowledge spine establishing shared language |
| 138 | `articles-042` |  | 53% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content pipeline preview—demo of Movemental processing your work |
| 139 | `C-A04` |  | 49% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The guide posture — authority comes from sustained grappling, not from having figured it out |
| 140 | `articles-054` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI amplifies both crisis and opportunity—credibility becomes central |
| 141 | `book-002` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The Tension: Using the Tool That Created the Problem |
| 142 | `book-005` |  | 28% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Speed of Adoption and Dunning-Kruger With AI |
| 143 | `C-A03` |  | 49% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Amplification, not replacement — the AI control boundary for voice, insight, and authority |
| 144 | `C-A07` |  | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Slowing down as resistance — AI can enable pace, not just acceleration |
| 145 | `C-PR02` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Movemental's backend infrastructure includes 105 database tables organized across 10+ domains (user management, content, media, e-commerce,… |
| 146 | `C-PR04` |  | 49% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The book's primary use case: building Movemental (a platform for amplifying Alan Hirsch's missional work) demonstrated in practice the frame… |
| 147 | `book-012` |  | 47% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Transparency as Trust Signal and Credibility Protection |
| 148 | `articles-044` |  | 56% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Codification without compromise—making patterns transmissible |
| 149 | `book-035` |  | 56% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Type-Safety Chain as Technical Alignment With Values |
| 150 | `book-040` |  | 55% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Context and Personalization as Required for Formation Work |
| 151 | `research-037` |  | 27% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** The current org-site manifesto mentions 'Infrastructure: Notion + AI' but the founder notes flag this as a placeholder example, not a commit… |
| 152 | `C-F03` |  | 45% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Multi-tenant platform architecture — one codebase serves many leader sites |
| 153 | `articles-011` |  | 49% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Formation goals and spiritual discernment tracking—unique to Movemental |
| 154 | `articles-016` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Pillar-cluster architecture for topical authority and AI citation |
| 155 | `articles-018` |  | 41% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** GEO (Generative Engine Optimization) complements SEO |
| 156 | `articles-019` |  | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** AI used as editing gate, not content creator |
| 157 | `articles-048` |  | 38% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** 30/60/90 day plan and commissioning liturgy—sending, not graduation |
| 158 | `book-018` |  | 43% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** The 70/30 Rule: Sustainable Content Creation Model |
| 159 | `business-069` |  | 67% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content Strategy Framework: Five Narrative Frames |
| 160 | `C-A09` |  | 50% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Specialized agents preserve voice; generic AI homogenizes |
| 161 | `articles-029` |  | 51% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Content length: depth determined by intent, not arbitrary word count |
| 162 | `articles-036` |  | 48% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Formation Companion in courses—AI that knows the lesson, the week, the learner's context |
| 163 | `articles-052` |  | 53% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Voice fidelity scoring for AI-drafted content |
| 164 | `book-044` |  | 52% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Prompting as Humane Communication, Not Prompt Engineering |
| 165 | `business-049` |  | 50% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Voice Baseline System: Fingerprinting and Consistency |
| 166 | `business-055` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Quality Assurance Standards: 95% + 90% + 95% |
| 167 | `business-079` |  | 39% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Global Expansion: 10-20 Year Horizon |
| 168 | `business-065` |  | 50% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Five User Roles with Permission Levels |
| 169 | `business-082` |  | 44% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** API and Third-Party Integrations (Post-MVP) |
| 170 | `book-031` |  | 83% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Relationship as Non-Negotiable Foundation |
| 171 | `business-076` |  | 65% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Built on Movemental Theology: APEST, mDNA, Incarnational Mission |
| 172 | `research-038` |  | 30% | Partial lexical overlap — verify specifics (stats, names, lists). |
| | | | | **Claim:** Founder insight: manifesto may be low-trust slop—candidate for rewrite or demotion |
| 173 | `book-047` |  | 46% | Higher overlap — still verify numbers and unique examples. |
| | | | | **Claim:** Theological Anthropology: What Happens to Human Vocation in an AI Age |

---

## Appendix: `(site)` routes outside the 16 tabbed categories

These marketing routes exist in the app but **do not correspond** to a named tab in `tabbed-argument-page.html`. They may still advance the product story; they are simply **out of scope** for the tabbed argument router unless you extend that document.

- `/apply`, `/assess`, `/blog`, `/book` and nested book routes, `/contact`, `/cookies`, `/inquiry`, `/knowledge-ecosystem`, `/manifesto`, `/movemental-at-100`, `/platform`, `/privacy`, `/vision`
- Services drill-down: `/services/discovery-lab`, `/services/organizational-systems`, `/services/system-builds` and nested system-build pages

**Note:** The **Methodology** tab has **no** matching route; it is not in this list because the gap is “missing page,” not “extra page.”
