# Raw research: 12 — Competitive landscape (honest comparisons)

**Prompt:** `docs/build/research/prompts/12-competitive-landscape.md`  
**Research date:** 2026-04-13  
**Scope:** Public pricing pages, help-center portability articles, industry timeline sources, agency cost surveys (secondary), venture-studio public descriptions. Movemental internal pricing (e.g. 10% take) taken from repo messaging only where cited.

---

## A. Movemental argument IDs referenced

| ID | Claim (paraphrased) |
|----|---------------------|
| `business-072` | vs traditional publishers: ownership, speed, economics; publisher takes 85–90% |
| `business-073` | vs Substack/Patreon: rental platforms; don’t own audience |
| `business-075` | vs WordPress/Squarespace: network effects gap |
| `business-076` | vs custom dev: $100K+, 6–12 months |
| `research-048` | Not publishing house or SaaS — venture-builder studio, aligned incentives |
| `C-PR04` | One developer / six months; **105+** tables (alt: **168+**); six-layer type safety; **60% faster** than industry |

**Internal inconsistency flagged:** `docs/arguments/custom-gpt/messaging-06-proof.md` lists **105** tables in one block and **168+** in an “alternate phrasing” block. **Reconcile before external use.**

**Repo technical reality (this workspace):** `src/lib/db/schema.ts` currently exports **one** `pgTable` (`placeholder`). Any “105+ tables” claim must be tied to **another schema source** (e.g. production DB, sibling repo, or future milestone)—not to the file in this snapshot.

---

## B. Traditional publishing — timelines, economics, hybrids

### Timelines (third-party publishing services)

**Greenleaf Book Group (hybrid/industry education):**  
- **Traditional path:** start-to-finish often **2–3 years** (includes agent acquisition, submission, deal negotiation, seasonal list slots).  
- **Production after contract:** **9 months–2 years**, **~18 months average** once in production.  
- **Hybrid:** commonly **6–12 months**, **~9 months typical**.  
- Source: [Greenleaf — industry timelines](https://greenleafbookgroup.com/learning-center/book-creation/how-long-will-it-take-to-publish-my-book-a-look-at-industry-timelines) (accessed 2026-04-13).

**Movemental “12-week onboarding”** — not benchmarked against Greenleaf in this pass; treat as **internal SLA** unless published.

### Royalties / “publisher takes 85–90%”

- Trade authors commonly receive roughly **10–15% of list price** on hardcovers (varies by format, channel, and contract); ebooks often **25% of net** (varies).  
- Movemental’s “publisher takes 85–90%” is **defensible as shorthand for the author’s royalty slice on print**, but **misleading if read as publisher profit margin**—retailers, returns, printing, marketing, and unearned advance risk absorb large shares.  
- Secondary explainer: [Reedsy — advances & royalties](https://www.reedsy.com/blog/how-much-do-authors-make/) (editorial, not legal advice).

### What publishers still provide (Movemental should not erase)

- **Non-refundable advance** (cash risk bearer)  
- **Developmental + line + copy editing** bench  
- **Cover + interior design**, proofing, indexing  
- **Retail distribution**, sales reps, returns handling  
- **Imprint brand** / awards pipeline / translation rights desk  

### Hybrid competitors (partial list)

- **Greenleaf**, **Author Solutions–class services**, **Inkwell**, many **paid “assisted publishing”** bundles — overlap Movemental’s “speed + services” lane more than Random House does.

---

## C. Feature & pricing matrix — creator / course / community (indicative)

**Note:** Prices change; confirm on official sites before sales collateral. Mix of **annual** vs **monthly** billing below—normalize before comparing.

| Platform | Entry pricing (public, 2026-era) | Take rate / fees | Portability highlights |
|----------|----------------------------------|------------------|-------------------------|
| **Substack** | Free to publish; paid subs incur platform fee | **10%** platform fee on paid subscription revenue + Stripe fees (see Substack Help); **Apple IAP** can add up to **~30%** for iOS upgrades | **Subscriber CSV export** supported ([Substack Help — export](https://support.substack.com/hc/en-us/articles/6314498343700-How-do-I-export-my-email-list-on-Substack)) |
| **Ghost(Pro)** | **$18/mo** Starter, **$29/mo** Publisher, **$199/mo** Business (billed yearly on pricing page) | **0%** platform transaction fee on paid memberships (per [Ghost pricing](https://ghost.org/pricing/)) | Member **import/export** on plans; open-source Ghost allows self-host exit |
| **Kajabi** | Public tiers often cited **$89–$399/mo**; **Jan 2026 pricing update** announced — verify on [kajabi.com/pricing](https://www.kajabi.com/pricing) | **0%** Kajabi transaction fee (per marketing); payment processing still applies | Full export depends on assets; migration guides exist |
| **Teachable** | **$39–$189/mo** monthly tiers commonly cited; verify [teachable.com/pricing](https://teachable.com/pricing/) | **Starter ~7.5%** platform transaction fee; higher tiers **0%** platform fee (per Teachable Help articles) | Course content export supported; audience export varies by feature era—verify help center |
| **Mighty Networks** | **$79 / $179 / $354** mo tiers on pricing detail pages (2025–2026 reporting) | Plan-dependent **transaction fees** (secondary summaries cite **~2% down to 0.5%** on higher tiers) | Migration services marketed on upper tiers |
| **Squarespace** | Secondary summaries cite **~$16–$33/mo** personal/business when billed annually — verify [squarespace.com/pricing](https://www.squarespace.com/pricing) | Commerce: **0–3%** transaction fee depending on plan (per many third-party comparisons) | Content export possible; membership is productized but not identical to full LMS stacks |
| **Beehiiv** | Flat SaaS tiers + scaling sends — verify [beehiiv.com/pricing](https://www.beehiiv.com/pricing) | Emphasizes **no rev share** on some tiers (marketing claim—verify) | Built for newsletter portability vs. Substack |
| **Kit (ConvertKit)** | Creator-focused email + commerce — verify [kit.com/pricing](https://kit.com/pricing) | Fees depend on plan + commerce rails | Strong automation + migration from Mailchimp etc. |

### “You don’t own your audience on Substack” — legal / practical truth

- **False if interpreted as “cannot export emails.”** Substack provides **CSV export** of subscribers.  
- **Fair if interpreted as:** (1) **payment + IAP dependency**, (2) **discovery algorithm** ownership, (3) **brand framing** (readers say “I read you on Substack”), (4) **terms + feature roadmap** risk, (5) **incomplete portability** of engagement graph beyond CSV.  
- Primary: [Publisher Agreement](https://substack.com/pa) (always read current version).

---

## D. Faith / ministry vertical platforms (sketch)

| Vendor | Positioning | Pricing transparency |
|--------|-------------|------------------------|
| **Subsplash** | Church app + web + giving + media | Mostly **custom / quote**; public site lists modules ([subsplash.com/pricing](https://www.subsplash.com/pricing)) |
| **Faithlife** | Bible software ecosystem, church media, Proclaim, etc. | Product-line specific |
| **RightNow Media** | B2B video library for organizations | Contract-based |
| **MinistryGrid** / **Lifeway** training | Denominational training rails | Contract-based |

**Gap:** These optimize for **church operations + curriculum distribution**, not necessarily **individual thought-leader scenius graph**—compare feature-by-feature before claiming overlap.

---

## E. WordPress / composable stacks — cost & parity

### Typical build cost bands (agency blog surveys — **low rigor**)

- **Template site:** low thousands USD.  
- **Custom marketing site:** roughly **$5k–$25k** commonly cited.  
- **Enterprise + custom integrations + LMS + community + commerce:** **$50k–$150k+** appears in multiple agency explainers — **highly dependent on scope, geography, and maintenance**.

### Plugin stack parity (qualitative)

- **LearnDash / LifterLMS** — courses, quizzing, certificates (feature depth varies).  
- **BuddyBoss / Memberium / community plugins** — social graph primitives.  
- **WooCommerce** — commerce.  
- **Multiple SSO / RLS-grade tenant isolation** — possible but **not default**; engineering cost rises quickly.

### “Network effects” claim (`business-075`)

Concretely, WordPress does **not** ship a **cross-tenant discovery graph** unless you **build** one (multisite network, shared app, or external marketplace). Movemental’s honest differentiator is **productized cross-leader graph + shared rails**, not “WordPress can’t do databases.”

---

## F. Venture-builder / studio models (comparables)

| Studio | Model (public description) |
|--------|----------------------------|
| **Atomic** | Co-builds companies in-house; large funds; hires founders into incubated ideas ([atomic.vc](https://www.atomic.vc/)) |
| **Hexa (ex-eFounders)** | Parallel SaaS company creation; studio equity + founder equity ([Hexa](https://www.hexa.com/)) |
| **Science Inc.** | Brand/consumer studio pattern (verify current site) |
| **Wilbur Labs** | Venture co-building / lab model (verify current site) |

**Fit check:** These studios typically **take significant equity** and **build multiple startups per year**. Movemental is closer to **selective client partnership + productized platform + revenue share** unless it truly spins independent portfolio cos at studio scale.

---

## G. Technical claims — benchmarking context

| Claim | Assessment |
|-------|--------------|
| **105+ / 168+ tables** | **Not verified** in this repo snapshot; **internally inconsistent** strings. Table count ≠ quality; can be **complexity theater** unless tied to necessary domain boundaries + test coverage. |
| **60% faster than industry standard** | Stated in `docs/business-docs/documentation-index/07-design-system-ux-philosophy.md` **without methodology** in snippet reviewed. **Requires:** metric (LCP? TTFB?), dataset (CrUX? synthetic?), baseline definition. |
| **One developer / six months** | **Impressive** as velocity narrative; **cautionary** for buyers on **bus factor**, documentation debt, and continuity risk—standard software engineering concern. |
| **Six-layer type safety** | Documented as **aspirational architecture** in `CLAUDE.md`; good engineering story if implementation matches across layers. |

---

## H. Source index (URLs)

| Topic | URL |
|-------|-----|
| Greenleaf timelines | https://greenleafbookgroup.com/learning-center/book-creation/how-long-will-it-take-to-publish-my-book-a-look-at-industry-timelines |
| Substack subscriber export | https://support.substack.com/hc/en-us/articles/6314498343700-How-do-I-export-my-email-list-on-Substack |
| Substack fees | https://support.substack.com/hc/en-us/articles/360037607131-How-much-does-Substack-cost |
| Ghost pricing | https://ghost.org/pricing/ |
| Kajabi pricing | https://www.kajabi.com/pricing |
| Teachable pricing | https://teachable.com/pricing/ |
| Mighty Networks pricing | https://www.mightynetworks.com/pricing-plan-detail |
| Subsplash pricing | https://www.subsplash.com/pricing |
| Atomic venture studio | https://www.atomic.vc/ |
| Patreon export help | https://support.patreon.com/hc/en-us/articles/34784011795469-Exporting-your-audience-s-emails-from-Patreon |

---

## I. Open items for Movemental team

1. Publish a **single authoritative spec** for C-PR04 numbers (tables, load-time benchmark).  
2. Decide whether to compare against **hybrid publishers** explicitly in sales narrative.  
3. Replace “don’t own your audience” with **precise lock-in mechanics** unless legally reviewed.  
4. Segment **custom build** comparisons: **marketing site** vs **LMS + community + multi-tenant + AI agents**.
