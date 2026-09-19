---
title: "Linking for SEO and GEO: Master Network Strategy"
slug: "33-linking-for-seo-and-geo"
author: "Joshua Shepherd"
original_number: 46
destination: "movemental.ai"
description: "Comprehensive guide to network topology, semantic corroboration, authority transfer, and generative engine optimization."
---

# Linking for SEO and GEO: Master Network Strategy

`linking-for-seo-and-geo.md` · 25,914 words

### Linking for SEO and GEO

**The authoritative sources, what they collectively teach, and two ranked inventories of every link worth making or earning.**

*Compiled 14 August 2026. Every claim below is either sourced or marked as judgment. Where the evidence is thin, it says so.*

---

#### How to read this document

Five parts, then the working appendices.

**Part One** is the source collection — who actually knows, tiered by how much weight their claims deserve.

**Part Two** is the aggregation: what those sources collectively teach about linking, internally and externally, including the places where they contradict each other.

**Part Three** holds the three inventories. **A** — every link you can make on your own platform. **B** — every link you can earn from someone else, each with the page it would live on, where on that page it belongs, and how it should be structured. **C** — every link you can give another author inside your own network, scored differently because those links carry a risk the other two don't.

**Part Four** defines what a "mention" actually is — the two highest-correlated signals in the whole evidence base — with worked examples of a good one and a worthless one.

**Part Five** is the network problem: how an intentional credibility network fails, and the governance that stops it.

Two things run underneath the whole thing. **Every link is a vote** — it makes a source vouched-for or it doesn't. **Every link is a road** — it makes a source reachable or it doesn't. The strongest items on both inventories do both at once.

---

### PART ONE — The source collection

Not all authorities are equal, and the biggest error in this field is treating a vendor blog post and a search engine's own documentation as the same kind of claim. Four tiers.

#### Tier 1 — Primary: the engines themselves

These are not opinions about how the systems work. They are statements by the people who run them. When Tier 1 contradicts Tier 3, Tier 1 wins.

| Source | What it is authoritative for | URL |
|---|---|---|
| **Google Search Central — Link best practices** | The definitive statement on crawlable links, anchor text, internal linking, and outbound linking. Short, specific, and routinely ignored. | `developers.google.com/search/docs/crawling-indexing/links-crawlable` |
| **Google Search Central — Spam policies** | What is explicitly named as link spam. The only document that defines the line you can be penalised for crossing. | `developers.google.com/search/docs/essentials/spam-policies` |
| **Google Search Central — `rel` attributes** | `nofollow`, `sponsored`, `ugc` — when each applies. | `developers.google.com/search/docs/crawling-indexing/qualify-outbound-links` |
| **Google — Optimizing for generative AI features** *(updated July 2026)* | Google's official position on GEO/AEO, including an explicit list of things not to bother with. The single most important recent document in this field. | `developers.google.com/search/docs/fundamentals/ai-optimization-guide` |
| **Google Search Quality Rater Guidelines** | E-E-A-T. Not a ranking algorithm — a description of what human raters are told to look for, which is the closest thing to a statement of intent that exists. | `guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf` |
| **Google — Creating helpful, reliable, people-first content** | The content standard the ranking systems are aimed at. | `developers.google.com/search/docs/fundamentals/creating-helpful-content` |
| **Google — Guidance on third-party SEO tools and advice** | Google's own framing for how to evaluate everything in Tiers 3 and 4. | `developers.google.com/search/docs/fundamentals/third-party-seo` |
| **Bing Webmaster Guidelines** | The second index, and the one behind Copilot. Broadly aligned with Google, more explicit about some link practices. | `bing.com/webmasters/help/webmaster-guidelines-30fba23a` |
| **Schema.org** | The vocabulary itself: `sameAs`, `citation`, `mentions`, `isPartOf`, `author`, `knowsAbout`. | `schema.org` |
| **IndexNow** | The submission protocol Bing, Yandex, Naver and others use. Google does not participate. | `indexnow.org` |

**Two Tier-1 findings that should reset expectations:**

Google's July 2026 generative-AI guide states plainly that optimizing for AI search *is* SEO, that Google Search does not use `llms.txt` or any special AI markup, that content "chunking" is unnecessary, that structured data is not required for generative AI features, and — most relevant here — that seeking inauthentic mentions across the web is not as useful as it appears. That last one is a direct shot at a large part of the current GEO consulting industry.

Google's link document is equally direct about the thing most sites get wrong: every page you care about should have a link from at least one other page on your site, anchor text should be specific enough to make sense read on its own, and linking out to other sites can help establish trustworthiness rather than leaking value.

#### Tier 2 — Peer-reviewed and large-N independent research

| Source | Finding that matters for linking | Reference |
|---|---|---|
| **Aggarwal et al., "GEO: Generative Engine Optimization"** (KDD 2024) | The founding paper. Across GEO-bench (10,000 queries), the three strongest content interventions were adding statistics, adding credible quotations, and **citing reliable sources** — each producing roughly 30–40% relative visibility gains. Keyword stuffing scored *below* baseline. | arXiv 2311.09735 |
| **"Optimizing Visibility in Generative Engines: A Critical Survey"** (2026) | The sober re-read of the above: the "40%" is a relative gain inside a simulator where five documents were already in context, not a promise about ChatGPT. Visibility in generative answers is relative and redistributive. | arXiv 2607.14035 |
| **Pew Research Center** | Users clicked a traditional result on 8% of visits where an AI summary appeared, versus 15% without; they clicked a link inside the summary on 1% of visits. Across 68,879 real searches. | pewresearch.org |

#### Tier 3 — Industry research houses (large datasets, commercial interest)

These are the best datasets available and they are all produced by companies selling something. Read the methodology; discount the framing.

| Source | What they're best for | Key linking finding |
|---|---|---|
| **Moz** | The canonical teaching material. *Beginner's Guide to SEO*, Domain Authority, the anchor-text and internal-linking chapters. Still the best conceptual on-ramp. | Links as votes; authority flows internally as well as externally. DA is Moz's model, not Google's metric. |
| **Ahrefs** | The largest public link index and the best empirical link research. | 75,000-brand study: YouTube mentions correlate with AI visibility at r≈0.737, branded web mentions 0.664, branded anchors 0.527, **backlinks 0.218**. Ahrefs publishes the correlation-is-not-causation caveat themselves. |
| **Semrush** | Best AI-citation datasets and the most transparent methodology in the category. | Backlinks study (1,000 domains, with Kevin Indig): backlink *authority* correlates with AI mentions, quantity doesn't, and **`nofollow` links show nearly the same correlation as follow links**. Separately: Reddit, LinkedIn and Wikipedia dominate LLM citations across 325,000 prompts. |
| **BrightEdge** | AI Overview tracking at enterprise scale. | Puts top-10/AI-Overview citation overlap far lower than Ahrefs — around 17%, methodology differing. |
| **Muck Rack (Generative Pulse)** | The definitive earned-media/AI-citation dataset. | Across 25M+ cited links (May 2026): **earned media = 84% of AI citations**, journalism 27%, paid and advertorial **0.3%**. Stable at 82–89% across three editions since July 2025. |
| **SE Ranking, Profound, Peec AI, Evertune, Conductor, Seer Interactive** | Citation-share tracking across engines. | Evertune: listicles account for a majority of LLM citations. SE Ranking: domains with heavy Reddit discussion earn several times more ChatGPT citations. |
| **Backlinko** | Large correlational ranking studies; the 11.8M-results analysis is still the most-cited link/ranking correlation set. | Referring domains correlate with rankings more strongly than any other single measured factor. |

#### Tier 4 — Practitioner interpretation (read for reasoning, not for facts)

*Search Engine Land*, *Search Engine Journal*, *Search Engine Roundtable* (Barry Schwartz — the record of what Google actually said and when), Aleyda Solís (*#SEOFOMO*), Kevin Indig (*Growth Memo* — the strongest analytical writing in the field), Mike King / iPullRank (the most technically rigorous critique of Google's own claims), Lily Ray, Glenn Gabe, Cyrus Shepard, Dr. Pete Meyers, Rand Fishkin / SparkToro (best on the collapse of the click model).

**And the tools, which are evidence-gathering instruments rather than authorities:** Screaming Frog and Sitebulb for internal link graphs and orphan detection; Google Search Console for what Google actually sees; Ahrefs/Semrush/Majority for the external graph.

#### What to discount

- Anything that promises a ranking or citation outcome. Google explicitly warns that no third-party tool has access to its internal ranking or AI systems.
- Anything that reports a correlation as a lever. The 0.664 mentions number is the most abused statistic in the field: large brands accumulate mentions, links, authority and AI visibility simultaneously, and nothing in the data establishes direction.
- Anything selling `llms.txt` as a strategy. Google says it ignores the file; the adoption data shows the overwhelming majority of such files receive no AI requests at all. Five minutes for completeness if you want it. Not a plan.
- Any AI-visibility monitoring tool at the $99 tier. Repeated sampling of identical prompts found Gemini reproduces less than a third of its own citation set run to run; getting a usable confidence interval takes roughly 40–50 queries on Gemini and 150+ on ChatGPT-class surfaces. The cheap tiers sit below the noise floor and will show you movement that is entirely random.

---

### PART TWO — What the sources collectively teach

#### Internal linking — where there is near-total consensus

Nine points on which Google, Moz, Ahrefs and Semrush do not meaningfully disagree.

**1. A link only counts if it's an `<a href>`.** Google can only reliably crawl anchor elements with an `href` attribute resolving to a real URL. `<span>` with a click handler, `javascript:` hrefs, router attributes without `href` — all invisible or unreliable. JavaScript-inserted links are fine *if* they render as real anchors.

**2. Anchor text is the single most controllable signal on an internal link.** The test Google publishes: read the anchor text alone, out of context. If you can't tell what's on the other side, it's not descriptive enough. "Click here," "read more," "our website," and bare URLs all fail. So does the opposite error — cramming every related keyword in, which is keyword stuffing by another route.

**3. Context around the link matters.** The words before and after are read as part of the signal. Which is why chained links (`so many times this year`, each word a different link) destroy value: each link loses its surrounding text.

**4. Every page you care about needs at least one inbound internal link.** Orphans get crawled late, ranked poorly, and are effectively absent from your topical graph. This is the highest-yield audit in internal linking and the most commonly skipped.

**5. Architecture concentrates authority deliberately.** Pillar/cluster (or hub-and-spoke) exists so that the pages you most want to own a subject receive the most internal links. Pages with more inbound internal links from authoritative internal pages rank better than pages without — this is the closest thing to a mechanical lever in the whole discipline.

**6. Contextual body links beat navigational links.** Site-wide header and footer links are necessary plumbing but heavily discounted precisely because they're site-wide. A link inside a paragraph, where the idea is invoked, is worth several in a footer.

**7. There is no magic number of links per page.** Google's exact framing: if you think it's too many, it probably is. The old "100 links" rule is folklore.

**8. Keyword-stuffed footer link blocks are a known spam pattern.** Have been since 2013. Don't rebuild them.

**9. Internal linking is the highest cost-to-result ratio work available**, because it requires no outreach, no budget, and no permission — and because it's the one part of the link graph you can fix in an afternoon and never have to renegotiate.

#### Outbound external linking — the consensus everyone ignores

**Linking out is not leakage.** Google's documentation says directly that external links can help establish trustworthiness, and gives citing your sources as the worked example. The instinct to hoard links is a folk belief with no support in any Tier 1 document.

**`nofollow` is for sources you don't trust**, not for every external link. Using it on all outbound links is a misreading. Paid or placed links get `sponsored`; user-inserted links get `ugc`.

**Cite the primary source, not the summary.** Link the study, the government page, the publisher — not a blog post about them.

**Citing sources is one of the three strongest tested GEO interventions.** This is the point where the SEO consensus and the GEO evidence converge exactly: the thing that makes a page trustworthy to a human editor is the thing that makes it safe for a model to cite.

#### Inbound links — the consensus, and where it's shifting

**What's stable:**

- Links remain a strong ranking signal in classic search. Referring domains correlate with rankings more strongly than any other single measured factor.
- Quality and relevance beat volume. One contextual citation from a genuinely relevant, credible site outperforms fifty directory placements.
- Velocity itself is not judged; naturalness is. John Mueller's 2019 answer on 200 links in two days is worth reading in full, because the warning is in the *setup* rather than the answer: if you're asking how many links you can get in two days, you're probably not getting natural ones.
- The explicitly named violations are: buying links, exchanging links, and optimized-anchor links in guest posts and press releases distributed on other sites.

**What's shifted, and this is the important part:**

The evidence on AI citation points consistently in a direction that is uncomfortable for anyone who spent a decade building links:

| Signal | Correlation with AI visibility | Source |
|---|---|---|
| YouTube mentions | 0.737 | Ahrefs, 75k brands |
| Branded web mentions (linked *or* unlinked) | 0.664 | Ahrefs |
| Branded anchor text | 0.527 | Ahrefs |
| Branded search volume | 0.392 | Ahrefs |
| Domain Rating | 0.266 | Ahrefs |
| **Backlinks** | **0.218** | Ahrefs |

And alongside it:

- **Earned media accounts for ~84% of AI citations**; paid and advertorial for 0.3%; wire-distributed press releases for roughly 0.04% (Muck Rack; BuzzStream).
- **`nofollow` links correlate with AI mentions about as strongly as follow links** (Semrush, 1,000 domains) — which makes sense if what the model is reading is the *mention*, not the link graph.
- **The link between ranking and AI citation is weakening fast.** Ahrefs found 76% of AI Overview citations came from top-10 organic pages in mid-2025; by early 2026 that had fallen to 38%, with roughly 31% coming from positions 11–100 and another 31% from pages not in the top 100 at all. BrightEdge puts the overlap nearer 17%.
- **Format is becoming agnostic.** YouTube is now the most-cited domain in AI Overviews, accounting for 18.2% of citations sourced from outside the top 100.

**The honest synthesis:** *being talked about on properties that are already indexed appears to matter more than being linked from them, and video appears to matter most of all.* Strong enough to plan against. Not strong enough to bet everything on — every number in that table is correlational, the confound (big brands accumulate everything at once) is obvious, and Google explicitly warns that chasing inauthentic mentions doesn't work. The reconciliation is that mentions earned the way real reputations are earned work, and mentions manufactured to game a correlation don't.

#### Where the sources disagree

**On whether links still matter for AI.** Ahrefs' correlations say links are a weak predictor. Semrush's backlink study says authority *does* predict AI mentions once a domain crosses higher authority tiers. Both can be true: link-derived authority may be a threshold gate rather than a gradient.

**On structured data.** Every GEO vendor treats schema as essential. Google says structured data is not required for generative AI features and there's no special AI schema — while also saying to keep using it for rich results. My reading: schema's value for entity resolution (`sameAs`, `citation`) is real and different from its value for rich results, and Google's denial is specifically about "AI schema" hacks, not about entity markup.

**On formatting and chunking.** GEO content mills obsess over markdown structure and short chunks. Google says explicitly that chunking is unnecessary. Controlled testing puts formatting effects one to two orders of magnitude below freshness and authority gates. Layout is a tiebreaker, not a lever.

**On Reddit and Wikipedia.** They are unambiguously the most-cited domains, and unambiguously the hardest to game — cited Reddit threads skew old (~900 days) and low-upvote (up to 80% under 20 upvotes), and Wikipedia has an enforced conflict-of-interest policy. The correct conclusion is participation, not campaigns.

---

### PART THREE — The three inventories

#### Scoring methodology

Each entry carries three numbers.

- **SEO (0–100)** — contribution to classic ranking and discovery: crawl reach, equity flow, topical signal, indexation speed.
- **GEO (0–100)** — contribution to being retrieved, corroborated, and cited in AI-generated answers: entity resolution, freshness, third-party corroboration, extractability.
- **Impact (0–100)** — the composite that sets the rank: `0.45 × SEO + 0.55 × GEO`.

Inventory C uses a different formula, given in its own preamble, because a link between commercially related parties has to be scored net of risk. GEO is weighted slightly higher because that is the direction of travel, not because it is currently the larger traffic channel. If your business still depends primarily on classic organic clicks, re-weight to 0.65/0.35 and the order changes meaningfully — internal architecture and redirects rise, entity and mention work falls.

**What the numbers are.** An evidence-informed attribution model, calibrated against the sources in Part One and against practitioner judgment where evidence doesn't exist. No engine assigns these scores. They are a teaching model of where value accrues, useful for sequencing work, and they should not be reported to anyone as measurement.

**What they are not.** They are not additive. You cannot sum an inventory and call it a total. Several items are *gates* — canonical tags, redirects, crawlability — which add little when done and cap everything above them when not.

---
#### Inventory A — Every link you can make on your own platform

These are the links you control completely. No permission required, no outreach, no waiting. The ceiling is lower than Inventory B because you cannot vote for yourself — but the floor is guaranteed, the work is one-time or templatable, and nothing in Inventory B compounds properly until this inventory is done.

##### Ranking summary

| # | Link type | SEO | GEO | **Impact** |
|---|---|---:|---:|---:|
| A1 | Pillar hub page linking down to every cluster article beneath it | 88 | 74 | **80** |
| A2 | 301 redirects consolidating old domains, old URLs, and duplicate properties | 92 | 68 | **79** |
| A3 | Contextual in-body link to another page you own | 85 | 72 | **78** |
| A4 | `Person` schema with a complete `sameAs` array | 55 | 92 | **75** |
| A5 | `Article` schema carrying `author`, `datePublished`, `dateModified`, `citation`, `mentions` | 58 | 88 | **74** |
| A6 | Cluster article linking up to its pillar | 80 | 70 | **74** |
| A7 | Outbound citation link to a primary source, inside the claim | 55 | 85 | **72** |
| A8 | Byline linking to the author's full bio page | 55 | 84 | **71** |
| A9 | Cross-node citation strip: your page citing a peer's canonical framework page | 62 | 78 | **71** |
| A10 | Lateral links between sibling clusters in the same pillar | 70 | 72 | **71** |
| A11 | Homepage links to every pillar | 82 | 62 | **71** |
| A12 | Video/podcast page linking to its own transcript and to the parallel article | 60 | 78 | **70** |
| A13 | `rel="canonical"` on every indexable page | 82 | 60 | **70** |
| A14 | Orphan elimination — a scheduled audit that no page lacks inbound internal links | 78 | 62 | **69** |
| A15 | Citation registry: inline `Cite` markers resolving to a public `/footnotes` page | 48 | 82 | **67** |
| A16 | Long-tail question page linking up to its cluster and pillar | 66 | 68 | **67** |
| A17 | Retro-links: adding links from existing older pages to each newly published page | 74 | 60 | **66** |
| A18 | Glossary/ontology term links inline in prose | 50 | 78 | **65** |
| A19 | Co-author byline cross-linking to both authors' home platforms | 55 | 74 | **65** |
| A20 | Network footer strip naming peer nodes | 55 | 70 | **63** |
| A21 | Book page ↔ articles that build on the book | 58 | 66 | **62** |
| A22 | XML sitemap (and its automatic regeneration) | 70 | 55 | **62** |
| A23 | Breadcrumb trail with `BreadcrumbList` schema | 65 | 58 | **61** |
| A24 | Global header navigation | 72 | 50 | **60** |
| A25 | Pathway/journey page linking to at least three substantive articles | 60 | 58 | **59** |
| A26 | Case study linking to the frameworks it applies and the organization involved | 50 | 62 | **57** |
| A27 | Outbound links to your own verified profiles elsewhere | 35 | 72 | **55** |
| A28 | Related-content module at the end of an article | 58 | 52 | **55** |
| A29 | FAQ answer linking to the page that answers it in full | 48 | 58 | **54** |
| A30 | Table-of-contents jump links (fragment anchors) | 42 | 60 | **52** |
| A31 | Course week linking to two or more open articles | 52 | 50 | **51** |
| A32 | HTML library/index page listing everything you've published | 55 | 46 | **50** |
| A33 | `hreflang` cluster for translated versions | 55 | 45 | **50** |
| A34 | Newsletter archive issue linking to one substantive surface | 48 | 44 | **46** |
| A35 | Footer navigation | 52 | 42 | **46** |
| A36 | RSS / Atom feed link | 40 | 48 | **44** |
| A37 | Event page linking to speaker, topic, and the org hosting it | 42 | 44 | **43** |
| A38 | Tag / topic archive pages | 45 | 38 | **41** |
| A39 | Image used as a link, with descriptive `alt` | 38 | 34 | **36** |
| A40 | Pagination links | 40 | 28 | **33** |
| A41 | `rel="sponsored"` on any paid, affiliate, or placed outbound link | 30 | 20 | **24** |
| A42 | Internal search results pages | 20 | 22 | **21** |
| A43 | 404 / not-found page linking back to hubs | 25 | 18 | **21** |
| A44 | `rel="ugc"` or `nofollow` on user-submitted links | 28 | 15 | **21** |

##### The entries in full

###### A1. Pillar hub page linking down to every cluster article beneath it — **80/100**
*SEO 88 · GEO 74*

- **Which page it lives on.** The pillar/theme page for each of your major subjects.
- **Where on the page.** A structured list or card grid in the body of the pillar page, grouped by sub-question, below the pillar's own substantive argument — not a bare index at the top.
- **How to structure it.** One link per cluster article, anchored on the article's actual title or the question it answers. Add a one-line description under each so the link carries context. Keep every cluster in the pillar linked; a cluster missing from its pillar is a topology failure.
- **Why it scores where it does.** This is the single highest-yield internal structure: it concentrates authority on the pages that own each subject and gives an answer engine a map of how deeply you cover a topic. Query fan-out means the engine issues several sub-queries per question; a complete pillar means you have a page for each.

###### A2. 301 redirects consolidating old domains, old URLs, and duplicate properties — **79/100**
*SEO 92 · GEO 68*

- **Which page it lives on.** Server or edge config for every legacy address you control — old blog, ministry site, assessment tool, staging or vercel.app URL.
- **Where on the page.** Before any launch announcement, not after. One canonical host (pick www or apex and never mix). Map every legacy URL to its closest live equivalent, not all to the homepage.
- **How to structure it.** 301 permanent, one hop, never a chain. File a Change of Address in Search Console once live. Keep the redirects in place indefinitely — Search Console's forwarding signal expires long before the links do.
- **Why it scores where it does.** This is the highest-value link action available to anyone with history, because it moves years of accumulated third-party links onto one address instead of splitting them. It is also the one item on this list that cannot be recovered later if the old domain lapses.

###### A3. Contextual in-body link to another page you own — **78/100**
*SEO 85 · GEO 72*

- **Which page it lives on.** Inside the running prose of any article, pathway section, course week, case study, or field guide.
- **Where on the page.** In the sentence where the idea is actually invoked — mid-body, not in a link dump at the end. Two to six per 2,000 words, spaced apart by at least a paragraph.
- **How to structure it.** `<a href="/canonical/path">the name of the thing</a>`. Anchor = the target's own title or the framework's name, 2–6 words. Never "click here", "read more", or a bare URL. Give the link surrounding context — the words before and after it are read as part of the signal. Never chain links side by side.
- **Why it scores where it does.** Google's own link doc says every page you care about should have a link from at least one other page, and that anchor text should be descriptive enough to make sense read out of context. Contextual body links are the only internal link type that both passes equity and tells a retrieval system what the target is about.

###### A4. `Person` schema with a complete `sameAs` array — **75/100**
*SEO 55 · GEO 92*

- **Which page it lives on.** The author/about page, and referenced from every byline.
- **Where on the page.** JSON-LD in the `<head>`. One canonical Person node per human, with a stable `@id`.
- **How to structure it.** `sameAs` should list every externally verifiable profile: Wikipedia, Wikidata, publisher author pages, Amazon and Goodreads author pages, ORCID, LinkedIn, YouTube channel, the organizations they founded, denominational directories. Add `knowsAbout` for the frameworks they own and `worksFor` for affiliations.
- **Why it scores where it does.** This is the machine-readable version of 'I am one real, verifiable person, and I am the same person as the one on those other pages.' Entity resolution is a precondition for being cited by name rather than paraphrased anonymously; `sameAs` is officially supported and is what lets a knowledge graph triangulate you across sources.

###### A5. `Article` schema carrying `author`, `datePublished`, `dateModified`, `citation`, `mentions` — **74/100**
*SEO 58 · GEO 88*

- **Which page it lives on.** Every published article, essay, and newsletter archive page.
- **Where on the page.** JSON-LD in the `<head>`, with `author` pointing by `@id` at the Person node, and visible human-readable dates on the page as well.
- **How to structure it.** `citation` should list the works you actually cite (with URL or ISBN). `mentions` should list the entities the piece is about. `dateModified` must be truthful and must actually change when you revise.
- **Why it scores where it does.** Freshness is one of the strongest observed gates in controlled tests of how retrieval systems choose between candidate documents — an undated page is treated as an old one. `citation` and `mentions` are the only links on your site that state the *type* of the relationship rather than leaving it to be inferred.

###### A6. Cluster article linking up to its pillar — **74/100**
*SEO 80 · GEO 70*

- **Which page it lives on.** Every cluster/sub-topic article.
- **Where on the page.** First third of the article — in the paragraph that establishes the broader frame, plus optionally a 'part of' line under the byline.
- **How to structure it.** Anchor on the pillar's name (`the fivefold ministry`, `covocational church planting`). One upward link per article is enough; a second in a closing 'where this sits' line is acceptable.
- **Why it scores where it does.** Upward links consolidate topical signal on the hub and prevent the cluster from reading as a floating page. They are also what stops a reader arriving from a narrow query from dead-ending.

###### A7. Outbound citation link to a primary source, inside the claim — **72/100**
*SEO 55 · GEO 85*

- **Which page it lives on.** Any page making a factual, statistical, or interpretive claim.
- **Where on the page.** In the sentence containing the claim, not gathered in a bibliography at the bottom. Aim for even distribution through the piece.
- **How to structure it.** Anchor on the source's title or the study's name — `the 2024 KDD paper on generative engine optimization` — not on your own keyword. Link to the primary source (journal, government page, the original study, the publisher) rather than a blog summarizing it. Follow by default; `nofollow` only for a source you're criticizing and don't want to vouch for.
- **Why it scores where it does.** The GEO paper's strongest tested interventions were adding statistics, adding credible quotations, and citing reliable sources, each producing roughly 30–40% relative visibility gains. Google's own link guidance says linking out establishes trustworthiness. This is the cheapest content-level lever that exists.

###### A8. Byline linking to the author's full bio page — **71/100**
*SEO 55 · GEO 84*

- **Which page it lives on.** Every article, episode page, course week, and field guide.
- **Where on the page.** Directly under the title, with a photograph, and repeated as an expanded author card at the end of the piece.
- **How to structure it.** Anchor on the author's full name. The bio page it points at must carry credentials, books, roles, first-hand experience, and the `sameAs` array.
- **Why it scores where it does.** An anonymous page is a page nobody vouches for. Trust sits at the center of E-E-A-T, and the byline→bio→verified-profile chain is the cheapest way to make authorship machine-checkable.

###### A9. Cross-node citation strip: your page citing a peer's canonical framework page — **71/100**
*SEO 62 · GEO 78*

- **Which page it lives on.** Any article that genuinely builds on, extends, or argues with a peer's work.
- **Where on the page.** Inline in the argument where you use their idea, plus a visible 'builds on' strip near the byline naming the peer and the specific work.
- **How to structure it.** Anchor on the peer's framework by name plus their name — `Alan Hirsch's work on APEST`. Make it mutual only where the intellectual debt runs both ways. Five or six honest ones beat fifty mechanical ones.
- **Why it scores where it does.** Retrieval systems infer who is authoritative in a field largely from co-occurrence and cross-reference. A mutual, typed, specific citation between two independently credible sources is a corroboration signal that no single party can fabricate — which is exactly why it's trusted and exactly why manufacturing it is self-defeating.

###### A10. Lateral links between sibling clusters in the same pillar — **71/100**
*SEO 70 · GEO 72*

- **Which page it lives on.** Every cluster article.
- **Where on the page.** Two or more per article, in the body where the sibling idea is genuinely relevant.
- **How to structure it.** Anchor on the sibling's title. Two is the floor. Reciprocity is fine here because the relationship is real.
- **Why it scores where it does.** Lateral density is what distinguishes a topic you cover from a topic you own. It is also what lets a retrieval system see that your coverage is comprehensive and non-redundant across the sub-queries of a fan-out.

###### A11. Homepage links to every pillar — **71/100**
*SEO 82 · GEO 62*

- **Which page it lives on.** The homepage.
- **Where on the page.** In the main content area, one block per pillar with a sentence of framing — not buried in the footer.
- **How to structure it.** Anchor on the pillar name. Six or fewer; if you have more pillars than that, your pillar architecture is really a tag list.
- **Why it scores where it does.** The homepage carries the most inbound authority of any page you own. What it links to is your declaration of what you are about.

###### A12. Video/podcast page linking to its own transcript and to the parallel article — **70/100**
*SEO 60 · GEO 78*

- **Which page it lives on.** The owned episode page for every audio or video asset.
- **Where on the page.** Full transcript on the same indexable URL (or a linked transcript page), timestamped chapter links, and a link to the article that treats the same idea in text.
- **How to structure it.** Transcript in crawlable HTML, not an embedded PDF or a JS widget. `VideoObject` / `PodcastEpisode` schema with `transcript`, `thumbnailUrl`, and `Clip` chapters. Description links back to the pillar.
- **Why it scores where it does.** Audio and video are not crawlable; the transcript is the entire citable surface. Given that YouTube mentions are the single strongest observed correlate of AI visibility, an indexable text surface attached to every video is disproportionately valuable.

###### A13. `rel="canonical"` on every indexable page — **70/100**
*SEO 82 · GEO 60*

- **Which page it lives on.** The `<head>` of every page, including the page pointing at itself.
- **Where on the page.** Self-referencing canonical everywhere; cross-domain canonical on any syndicated copy of your work that you control.
- **How to structure it.** `<link rel="canonical" href="https://example.com/exact/path">` — absolute URL, one per page, matching the URL you actually want indexed (trailing slash and protocol consistent).
- **Why it scores where it does.** Duplicate addresses split the link equity a page has earned and give retrieval systems two candidates for the same content. Canonicalization is how the votes get counted once.

###### A14. Orphan elimination — a scheduled audit that no page lacks inbound internal links — **69/100**
*SEO 78 · GEO 62*

- **Which page it lives on.** The whole site, run as a recurring audit.
- **Where on the page.** Quarterly, or on every publish for a fast-moving site. Output is a work queue, not a report nobody reads.
- **How to structure it.** Flag any article, pathway, course week, book page, or transcript with zero inbound internal links; fix by adding a contextual link from the nearest relevant page. Also flag pages linked only from the footer or a tag archive — that is a technical, not a real, inbound link.
- **Why it scores where it does.** Orphaned pages get crawled late, ranked poorly, and are effectively absent from the topical graph. This is the highest-yield maintenance task in internal linking and the one most often skipped.

###### A15. Citation registry: inline `Cite` markers resolving to a public `/footnotes` page — **67/100**
*SEO 48 · GEO 82*

- **Which page it lives on.** Every substantive claim, on every page; one central claims page.
- **Where on the page.** Superscript or pill marker at the claim; the registry page groups by claim with source, URL, page number, and type.
- **How to structure it.** Each marker is a fragment link to the registry entry; each registry entry links out to the primary source. Nothing should resolve to a dead entry — broken citation pills are worse than no pills.
- **Why it scores where it does.** Corroboration made explicit and machine-readable. It also gives you one page an external journalist or researcher can link to, which is a rare thing to own.

###### A16. Long-tail question page linking up to its cluster and pillar — **67/100**
*SEO 66 · GEO 68*

- **Which page it lives on.** Narrow question/FAQ pages that catch specific queries.
- **Where on the page.** In the answer itself, after the direct answer is given.
- **How to structure it.** Answer the question in the first 60 words, then link up. Anchor on the cluster and pillar names. Every question page must have both links.
- **Why it scores where it does.** Query fan-out means an engine issues several related sub-queries per question. A page that answers one narrow sub-query and links up is how you get pulled into an answer for the parent question you don't rank for.

###### A17. Retro-links: adding links from existing older pages to each newly published page — **66/100**
*SEO 74 · GEO 60*

- **Which page it lives on.** Two to four existing, already-indexed pages, chosen for topical fit.
- **Where on the page.** Run at publish time, as a required step in the publish checklist — not as an occasional cleanup.
- **How to structure it.** Prefer source pages that already have external links pointing at them; those pass the most. Anchor on the new page's title. Add the link inside existing prose, revising the sentence if needed.
- **Why it scores where it does.** A new page with no internal links is invisible until a crawler stumbles on it. Linking it from established pages is the fastest indexation path you control, and it is the mechanism by which earned authority gets redistributed to new work.

###### A18. Glossary/ontology term links inline in prose — **65/100**
*SEO 50 · GEO 78*

- **Which page it lives on.** Every page that uses a framework term with a canonical definition.
- **Where on the page.** First use of the term in the body. Optionally a hover definition; the underlying link must still be a crawlable `<a href>`.
- **How to structure it.** Anchor on the term itself, pointing to `/glossary/{term}`. One canonical definition per term, one canonical URL, across the whole network — never two definitions in two places.
- **Why it scores where it does.** This is how a vocabulary becomes an entity set rather than a set of phrases. Owning the canonical definition of the terms a field argues in is the strongest available position when models paraphrase everyone using your language.

###### A19. Co-author byline cross-linking to both authors' home platforms — **65/100**
*SEO 55 · GEO 74*

- **Which page it lives on.** Any co-authored article, book page, or course.
- **Where on the page.** Both bios rendered in the byline block, each linking to that author's canonical bio on their own site.
- **How to structure it.** Pull live rather than hard-coding, so it stays correct. Both ends must carry the same treatment — a one-way co-author credit reads as a claim rather than a fact.
- **Why it scores where it does.** Co-authorship is a verifiable, non-fakeable relationship between two entities, and it is the cheapest true cross-node link that exists.

###### A20. Network footer strip naming peer nodes — **63/100**
*SEO 55 · GEO 70*

- **Which page it lives on.** Every page of every node in the network.
- **Where on the page.** Footer, above the legal line: peer names or logos, one line describing how each connects, and a link to an 'about this network' page.
- **How to structure it.** Anchor on the peer's name, not on a keyword. Keep the description honest and specific ('co-authored *The Permanent Revolution*'), never 'a movement of leaders' if it's two websites.
- **Why it scores where it does.** The cheapest single move that reframes a site from one person's homepage to a node in something larger. Costs one component; appears on every page.

###### A21. Book page ↔ articles that build on the book — **62/100**
*SEO 58 · GEO 66*

- **Which page it lives on.** Each book's page and the articles that draw on it.
- **Where on the page.** In the book page's 'what this argues' section, link to the three or four articles that extend it; in each article, link back to the book at the point the idea is introduced.
- **How to structure it.** `Book` schema with ISBN, publisher, edition, `author` by `@id`. Anchor on the book title, italicized, plus chapter where relevant.
- **Why it scores where it does.** Books are the most credible asset most authors own and are usually the least machine-legible thing on their site. Schema plus two-way linking converts a cover image into a citable entity.

###### A22. XML sitemap (and its automatic regeneration) — **62/100**
*SEO 70 · GEO 55*

- **Which page it lives on.** `/sitemap.xml`, submitted in Search Console and Bing.
- **Where on the page.** Regenerated on every publish — verify by publishing something and checking it appears. Framework caching defaults will bite you here.
- **How to structure it.** Include only canonical, indexable URLs. Accurate `lastmod`. Split with a sitemap index above ~50k URLs.
- **Why it scores where it does.** Not a link, but the discovery road that determines whether your links are ever traversed. Silent failure mode: it looks fine and simply stops updating.

###### A23. Breadcrumb trail with `BreadcrumbList` schema — **61/100**
*SEO 65 · GEO 58*

- **Which page it lives on.** Every page below the top level.
- **Where on the page.** Immediately above the H1, matching the URL hierarchy exactly.
- **How to structure it.** `Home › Pillar › Cluster › This page`, each segment a real link, anchored on the section's name. Mirror it in JSON-LD.
- **Why it scores where it does.** Breadcrumbs give every page an explicit position in the hierarchy for crawlers and are eligible to replace the URL in search results. They also guarantee no page is more than a few clicks from a hub.

###### A24. Global header navigation — **60/100**
*SEO 72 · GEO 50*

- **Which page it lives on.** Site-wide chrome.
- **Where on the page.** Five to seven top-level destinations mapping to your actual architecture (Themes, Library, Formation, About).
- **How to structure it.** Plain `<a href>` elements, not JS handlers. Descriptive labels, not clever ones. Mobile menu must contain the same crawlable links.
- **Why it scores where it does.** The persistent road network. High crawl value, low differentiating value — every competitor has one, and site-wide links are discounted precisely because they're site-wide.

###### A25. Pathway/journey page linking to at least three substantive articles — **59/100**
*SEO 60 · GEO 58*

- **Which page it lives on.** Each pathway or formation page.
- **Where on the page.** Inside the steps, at the point where the reader needs the substance behind the practice.
- **How to structure it.** Anchor on the article titles. Exactly one CTA at the end — not three competing asks.
- **Why it scores where it does.** Converts credibility into formation, and proves to a crawler that the pathway is grounded in a real corpus rather than being a standalone sales page.

###### A26. Case study linking to the frameworks it applies and the organization involved — **57/100**
*SEO 50 · GEO 62*

- **Which page it lives on.** Each case study or field report.
- **Where on the page.** In the narrative where the framework is applied; the org link in the setup paragraph.
- **How to structure it.** Anchor on the framework name and the organization's real name. Link the org's own site if the engagement is disclosed and they consent.
- **Why it scores where it does.** First-hand experience is the E-E-A-T signal no one can copy, and a case study that names and links the real organization is the version of it a machine can verify.

###### A27. Outbound links to your own verified profiles elsewhere — **55/100**
*SEO 35 · GEO 72*

- **Which page it lives on.** The about page, the footer, and the author bio block.
- **Where on the page.** A compact row on the about page; also mirrored in the `sameAs` array.
- **How to structure it.** Link to the profiles you actually maintain — YouTube channel, publisher author page, Amazon/Goodreads, LinkedIn, ORCID, Wikidata. Every one of those pages should link back to this address (see Inventory B).
- **Why it scores where it does.** Half of an entity-resolution loop. On its own it's weak; paired with the inbound half from Inventory B it is what makes the identity claim verifiable in both directions.

###### A28. Related-content module at the end of an article — **55/100**
*SEO 58 · GEO 52*

- **Which page it lives on.** Below the article body, above the CTA.
- **Where on the page.** Three to five items, curated or relevance-scored — never 'latest posts'.
- **How to structure it.** Each item a real `<a>` with the target's title as anchor and a one-line reason. Do not let this substitute for contextual body links; it is a supplement.
- **Why it scores where it does.** Useful for readers and for crawl paths, but weaker than in-body links because it carries no surrounding context. Auto-generated 'latest' modules are close to worthless.

###### A29. FAQ answer linking to the page that answers it in full — **54/100**
*SEO 48 · GEO 58*

- **Which page it lives on.** The FAQ page.
- **Where on the page.** At the end of each answer, after the answer is complete on its own.
- **How to structure it.** Answer fully in place first — a link is not an answer. Then `For the full treatment, see {title}`.
- **Why it scores where it does.** FAQ pages are heavily extracted for answer surfaces. The answer must stand alone; the link is what converts an extraction into a visit.

###### A30. Table-of-contents jump links (fragment anchors) — **52/100**
*SEO 42 · GEO 60*

- **Which page it lives on.** Long articles and field guides.
- **Where on the page.** Top of the article, with stable `id` attributes on each H2.
- **How to structure it.** `<a href="#section-slug">Section title</a>`; ids must be stable across edits so external deep links don't rot.
- **Why it scores where it does.** Stable section anchors let others cite a specific passage and let extraction systems address a passage rather than a page — which matters given how much citation comes from the top portion of a document.

###### A31. Course week linking to two or more open articles — **51/100**
*SEO 52 · GEO 50*

- **Which page it lives on.** Each week/module page (including the free week, which must be publicly indexable).
- **Where on the page.** In the teaching text, where the idea is developed.
- **How to structure it.** `Course` and `CourseInstance` schema on the hub; `noindex` the paid weeks, index the free one. Anchor on article titles.
- **Why it scores where it does.** Proves the course is grounded in the public corpus rather than floating, and gives the free week internal support so it can rank as the funnel entrance.

###### A32. HTML library/index page listing everything you've published — **50/100**
*SEO 55 · GEO 46*

- **Which page it lives on.** A single `/library` page, filterable.
- **Where on the page.** Linked from the header or footer; paginated with crawlable links, not infinite scroll.
- **How to structure it.** Real `<a>` per item with the title as anchor, grouped by type and topic.
- **Why it scores where it does.** A human-readable sitemap and the page most likely to be used by a researcher or journalist trying to see the shape of your work.

###### A33. `hreflang` cluster for translated versions — **50/100**
*SEO 55 · GEO 45*

- **Which page it lives on.** Every page that exists in more than one language.
- **Where on the page.** Reciprocal annotations across all language versions, including a self-reference and `x-default`.
- **How to structure it.** `<link rel="alternate" hreflang="es" href="...">` on every variant, each pointing at all the others.
- **Why it scores where it does.** Consolidates the authority of translations instead of letting them compete, and is the only way multi-language work reads as one entity.

###### A34. Newsletter archive issue linking to one substantive surface — **46/100**
*SEO 48 · GEO 44*

- **Which page it lives on.** The public, indexable archive page for each issue.
- **Where on the page.** One clear link per issue, in the body.
- **How to structure it.** The archive must be `index,follow` and in the sitemap — a newsletter that only exists in inboxes is invisible. `Article` + `isPartOf` a `Periodical`.
- **Why it scores where it does.** Turns broadcast into roads back in, and turns a private list into a public, crawlable corpus. The gate is publishing the archive at all.

###### A35. Footer navigation — **46/100**
*SEO 52 · GEO 42*

- **Which page it lives on.** Site-wide.
- **Where on the page.** Grouped into three or four labelled columns; keep the total modest.
- **How to structure it.** Descriptive labels. Do not stuff keyword-anchored links here — footers full of optimized anchors have been an explicit spam pattern for over a decade.
- **Why it scores where it does.** Necessary plumbing, low signal. The one high-value footer element is the network strip, scored separately.

###### A36. RSS / Atom feed link — **44/100**
*SEO 40 · GEO 48*

- **Which page it lives on.** `<head>` of the site plus a visible link on the library page.
- **Where on the page.** Full-content feed if you're comfortable with it; summary otherwise.
- **How to structure it.** `<link rel="alternate" type="application/rss+xml" href="/feed.xml">`.
- **Why it scores where it does.** Cheap machine-readable distribution; a common ingestion path for aggregators, newsletters, and tools that later become sources of mentions.

###### A37. Event page linking to speaker, topic, and the org hosting it — **43/100**
*SEO 42 · GEO 44*

- **Which page it lives on.** Each event or cohort page.
- **Where on the page.** In the description; speakers as named links to their bio pages.
- **How to structure it.** `Event` schema with `performer` and `location`. Keep the page live after the event with an outcome note rather than deleting it.
- **Why it scores where it does.** Event pages accumulate external links from attendees and hosts, then are usually deleted — throwing away the links. Keeping them and linking them into the graph is free.

###### A38. Tag / topic archive pages — **41/100**
*SEO 45 · GEO 38*

- **Which page it lives on.** `/topics/{tag}`.
- **Where on the page.** Only for tags with real depth behind them — five-plus substantive pieces.
- **How to structure it.** Give each one a paragraph of original framing so it isn't a bare list. `noindex` the thin ones.
- **Why it scores where it does.** Useful crawl paths; a liability at scale. Dozens of thin tag pages are the classic accidental scaled-content problem.

###### A39. Image used as a link, with descriptive `alt` — **36/100**
*SEO 38 · GEO 34*

- **Which page it lives on.** Cards, book covers, author photos, logo links.
- **Where on the page.** Anywhere an image is the clickable element.
- **How to structure it.** `<a href="/books/the-forgotten-ways"><img alt="The Forgotten Ways — book page"></a>`. The `alt` text *is* the anchor text for an image link; empty alt on a linked image is a wasted link.
- **Why it scores where it does.** Small but free. Most sites have dozens of linked images with empty alt attributes, each one an anchor-text signal thrown away.

###### A40. Pagination links — **33/100**
*SEO 40 · GEO 28*

- **Which page it lives on.** Archives, library, long series.
- **Where on the page.** Real numbered `<a>` links, not JS-only 'load more'.
- **How to structure it.** Crawlable links to each page; canonical self-referencing on each paginated page.
- **Why it scores where it does.** Purely a crawl-depth mechanism. Infinite scroll without crawlable pagination hides everything past the first screen.

###### A41. `rel="sponsored"` on any paid, affiliate, or placed outbound link — **24/100**
*SEO 30 · GEO 20*

- **Which page it lives on.** Anywhere money changed hands, in either direction.
- **Where on the page.** Applied at the link level, plus a visible human-readable disclosure near it.
- **How to structure it.** `<a href="..." rel="sponsored">`. Use `nofollow` if you're unsure which applies.
- **Why it scores where it does.** Purely protective. Undisclosed paid links are explicitly named in the spam policies; disclosed ones cost you nothing.

###### A42. Internal search results pages — **21/100**
*SEO 20 · GEO 22*

- **Which page it lives on.** `/search?q=`.
- **Where on the page.** `noindex, follow`.
- **How to structure it.** Useful to readers; keep out of the index to avoid generating thin duplicate pages at scale.
- **Why it scores where it does.** Near-zero direct value; included because getting it wrong (indexing search pages) actively hurts.

###### A43. 404 / not-found page linking back to hubs — **21/100**
*SEO 25 · GEO 18*

- **Which page it lives on.** The error template.
- **Where on the page.** Three or four links to the main hubs plus search.
- **How to structure it.** Return a real 404 status code — a 'soft 404' that returns 200 is the actual problem.
- **Why it scores where it does.** Damage control. Matters most during a migration, when it catches the redirects you missed.

###### A44. `rel="ugc"` or `nofollow` on user-submitted links — **21/100**
*SEO 28 · GEO 15*

- **Which page it lives on.** Comments, forums, member profiles, anywhere users can insert a URL.
- **Where on the page.** Applied automatically by the platform, not manually.
- **How to structure it.** `<a href="..." rel="ugc nofollow">`.
- **Why it scores where it does.** Protective. An open comment system without this is a spam magnet that damages the host site's trust.

---

#### Inventory B — Every link you can earn from others

These are the links other people make to you. Higher ceiling, no guarantees, and the ranking here diverges most sharply from classic SEO intuition — because the evidence on AI citation points at being *discussed on properties that are already indexed* more than at being *linked from* them. The bottom five entries are ranked last on purpose; they are listed so that their position is explicit rather than ambiguous.

##### Ranking summary

| # | Link type | SEO | GEO | **Impact** |
|---|---|---:|---:|---:|
| B1 | Feature or quote in an indexed journalistic outlet | 88 | 92 | **90** |
| B2 | Original research or data that others cite | 72 | 90 | **82** |
| B3 | A peer's article citing your framework by name | 78 | 86 | **82** |
| B4 | A faculty, adjunct, or course page on a university or seminary domain | 82 | 82 | **82** |
| B5 | A citation in a Wikipedia article | 60 | 95 | **79** |
| B6 | Your publisher's author page linking to your site | 72 | 84 | **79** |
| B7 | Being named and linked in someone else's YouTube video | 55 | 96 | **78** |
| B8 | Inclusion in a 'best books / best resources on X' roundup or listicle | 68 | 86 | **78** |
| B9 | Being quoted in a trade or industry publication | 70 | 82 | **77** |
| B10 | Co-authored work with both authors' sites linked | 70 | 82 | **77** |
| B11 | Guest essay published under your byline on a peer or industry site | 74 | 80 | **77** |
| B12 | Inclusion in a reading list, syllabus, or bibliography hosted on an institution's site | 70 | 80 | **76** |
| B13 | Being cited in a peer-reviewed journal article or academic book | 60 | 88 | **75** |
| B14 | Guest appearance link in podcast show notes | 62 | 84 | **74** |
| B15 | An accurate Wikidata item for you and your organization | 45 | 90 | **70** |
| B16 | A library research guide (LibGuides) listing your work | 65 | 74 | **70** |
| B17 | An interview transcript published on someone else's site | 58 | 78 | **69** |
| B18 | A peer's glossary or reference page pointing at your canonical definition | 55 | 78 | **68** |
| B19 | A speaker or session page for a conference you spoke at | 60 | 72 | **67** |
| B20 | A 'further reading' entry on a Wikipedia article | 50 | 80 | **66** |
| B21 | An 'our team', board, faculty, or advisor page on an organization's site | 58 | 70 | **65** |
| B22 | Your LinkedIn presence: personal profile, organization page, and substantive posts | 40 | 84 | **64** |
| B23 | An award, grant, fellowship, or cohort listing | 52 | 68 | **61** |
| B24 | Your author profile on retail and reader platforms | 45 | 72 | **60** |
| B25 | Organic mention in a Reddit thread on a relevant subreddit | 30 | 82 | **59** |
| B26 | An endorsement or blurb printed on someone else's book | 45 | 70 | **59** |
| B27 | A Substack recommendation and in-post citation from another writer | 45 | 66 | **57** |
| B28 | An unlinked but prominent brand or name mention on an indexed site | 25 | 82 | **56** |
| B29 | Your book's bibliography entry in someone else's book | 35 | 74 | **56** |
| B30 | A course platform instructor bio | 48 | 62 | **56** |
| B31 | A foreword, afterword, or chapter contribution credit | 40 | 68 | **55** |
| B32 | Podcast directory show pages (Apple, Spotify, YouTube) | 42 | 66 | **55** |
| B33 | A press kit or newsroom pickup | 50 | 58 | **54** |
| B34 | A Quora or Stack Exchange answer citing your work | 30 | 70 | **52** |
| B35 | A directory or database record: Crunchbase, LinkedIn company page, Google Business Profile | 40 | 62 | **52** |
| B36 | A translation or foreign-language publisher's page | 42 | 55 | **49** |
| B37 | A church, nonprofit, or practitioner site's 'resources we use' page | 45 | 52 | **49** |
| B38 | An archived or permanently identified version of your work | 30 | 60 | **46** |
| B39 | A job posting or staff affiliation page | 35 | 45 | **40** |
| B40 | A community or forum profile link | 20 | 30 | **26** |
| B41 | A paid, sponsored, or advertorial placement ⚠ | 12 | 10 | **11** |
| B42 | A blog comment link | 8 | 8 | **8** |
| B43 | Press-release wire syndication ⚠ | 10 | 6 | **8** |
| B44 | Paid guest-post networks and link insertions ⚠ | 3 | 5 | **4** |
| B45 | Reciprocal link exchanges arranged for SEO ⚠ | 3 | 4 | **4** |
| B46 | Private blog networks (PBNs) ⚠ | 0 | 0 | **0** |

##### The entries in full

###### B1. Feature or quote in an indexed journalistic outlet — **90/100**
*SEO 88 · GEO 92*

- **Which page it lives on.** The article page on the publication's own domain (not a syndicated copy).
- **Where on the page.** Inside the body, in the sentence that introduces you — 'X, who runs Y and wrote Z, says…'. A link in a byline bio at the foot is worth less than one in the body.
- **How to structure it.** Ask for the link on your full name or your organization's name pointing at your canonical homepage or the single best page on the subject. Give the journalist a one-line description of who you are and the exact URL — most link errors are the reporter guessing. Follow, in-body, on the publication's own domain. Never request keyword-stuffed anchor text.
- **Why it scores where it does.** Earned editorial media accounts for roughly 84% of all links AI systems cite (Muck Rack, 25M links, May 2026), a figure that has held between 82% and 89% across three editions since July 2025. Journalism alone is about 27%. Paid and advertorial content is 0.3%.

###### B2. Original research or data that others cite — **82/100**
*SEO 72 · GEO 90*

- **Which page it lives on.** Wherever it gets cited — articles, reports, papers, presentations.
- **Where on the page.** The citing page's body, in the sentence stating your finding.
- **How to structure it.** Publish the dataset or methodology on a stable URL with `Dataset` schema; state the headline number in a single quotable sentence; provide a suggested citation line on the page itself.
- **Why it scores where it does.** Adding statistics was one of the three strongest interventions in the foundational GEO experiments. Being the *source* of the statistic others repeat compounds every time it is repeated — and it is the one form of authority that cannot be bought.

###### B3. A peer's article citing your framework by name — **82/100**
*SEO 78 · GEO 86*

- **Which page it lives on.** Any article on a credible peer's own domain where they genuinely build on your work.
- **Where on the page.** Inline in their argument, at the point where they use your idea — plus optionally a 'builds on' credit near their byline.
- **How to structure it.** Anchor combining your name and the framework: `Alan Hirsch's APEST framework`. Should point at your canonical page for that framework, not your homepage. Should be mutual only where the debt is mutual.
- **Why it scores where it does.** Independent corroboration between credible sources is the strongest available authority signal in both systems, and cross-reference/co-occurrence is a large part of how models infer who the authorities in a field are. The test: would you make this link if search engines didn't exist?

###### B4. A faculty, adjunct, or course page on a university or seminary domain — **82/100**
*SEO 82 · GEO 82*

- **Which page it lives on.** The institution's own `.edu` directory page for you.
- **Where on the page.** The 'website' field of the faculty profile, and inside any course description you teach.
- **How to structure it.** Full name as anchor or a bare canonical URL. Email the department administrator: two lines, the exact URL, and a request to update the existing link. Also ask that your name be spelled consistently across the site.
- **Why it scores where it does.** Institutional domains carry unusual trust in both ranking and retrieval, the pages are stable for years, and the affiliation is itself an E-E-A-T signal independent of the link.

###### B5. A citation in a Wikipedia article — **79/100**
*SEO 60 · GEO 95*

- **Which page it lives on.** The `References` or `Further reading` section of an article on a topic you are genuinely a source for.
- **Where on the page.** As an inline citation supporting a specific factual sentence in the body — not as an 'External links' entry, which is weaker and more likely to be removed.
- **How to structure it.** Standard citation template with author, title, publisher, date, and URL. It will be `nofollow`; that is fine and irrelevant to why it matters. Never edit an article about yourself or your organization — declare any conflict of interest on the talk page and let an independent editor decide.
- **Why it scores where it does.** Wikipedia is a top-three cited domain across every study of AI answer sourcing, feeds Google's Knowledge Graph, and is disproportionately represented in training corpora. It is also the least manipulable item on this list, which is exactly why it is trusted.

###### B6. Your publisher's author page linking to your site — **79/100**
*SEO 72 · GEO 84*

- **Which page it lives on.** The publisher's author landing page, and the author byline on each book's product page.
- **Where on the page.** The 'website' field of the author bio block, above the book grid.
- **How to structure it.** Bare canonical domain or full-name anchor. Ask the marketing contact by email; ask for it on *every* book page as well as the author page, since they're usually separate templates.
- **Why it scores where it does.** Publisher domains are trusted, the pages are permanent, and the link is what ties a real-world publishing record to a web identity. It is also usually a two-line email that nobody has bothered to send.

###### B7. Being named and linked in someone else's YouTube video — **78/100**
*SEO 55 · GEO 96*

- **Which page it lives on.** The video's description box on the host's channel, plus your name spoken in the video and in the on-screen title/chapters.
- **Where on the page.** First two lines of the description (above the fold), plus a pinned comment. Ask the host to add a chapter marker at the segment where your framework is discussed.
- **How to structure it.** Full name + the specific work, then the URL on its own line. Ask them to include a one-sentence description of your work in the description text — the *mention* carries more weight than the link. Request captions/transcript be enabled.
- **Why it scores where it does.** YouTube mentions are the strongest single correlate of AI visibility in the largest public dataset (Ahrefs, 75,000 brands, r≈0.737 vs 0.218 for backlinks), and YouTube is now the single most-cited domain in Google's AI Overviews, accounting for 18.2% of citations that come from outside the top 100. Almost nobody in a niche field does this deliberately.

###### B8. Inclusion in a 'best books / best resources on X' roundup or listicle — **78/100**
*SEO 68 · GEO 86*

- **Which page it lives on.** The roundup article on a credible site in your field.
- **Where on the page.** As a numbered entry with your name, the work's title, a description of what it argues, and a link — not merely a link in a list of thirty.
- **How to structure it.** Anchor on the title of the work. Provide the writer with a two-sentence description and a cover image; you want the entry to contain enough text to be extractable on its own.
- **Why it scores where it does.** Listicles are wildly over-represented in AI citations (one 400-million-citation analysis puts them at roughly 63% of LLM citations), because they are pre-structured comparative answers to exactly the questions people ask assistants.

###### B9. Being quoted in a trade or industry publication — **77/100**
*SEO 70 · GEO 82*

- **Which page it lives on.** The publication's article page.
- **Where on the page.** In the body as a named source, with your title and organization stated in the same sentence.
- **How to structure it.** Give the reporter a quotable, specific, first-person sentence containing a number or a named framework — those are the sentences that survive into the excerpt. Provide the URL for the link unprompted.
- **Why it scores where it does.** Same mechanism as journalistic coverage, in a narrower and easier-to-reach venue. Trade press is where a niche field's canonical sources are actually established.

###### B10. Co-authored work with both authors' sites linked — **77/100**
*SEO 70 · GEO 82*

- **Which page it lives on.** The publisher page, the article page, and both authors' own sites.
- **Where on the page.** Both bios in the byline block on whichever site hosts the piece.
- **How to structure it.** Live-pulled bios where possible; both links present on both ends. Add the co-author to your `Person` schema context and vice versa.
- **Why it scores where it does.** A non-fakeable relationship between two entities, and the most defensible cross-link two people can have.

###### B11. Guest essay published under your byline on a peer or industry site — **77/100**
*SEO 74 · GEO 80*

- **Which page it lives on.** The article page on their domain.
- **Where on the page.** One link in the author bio at the foot, and at most one contextual in-body link to a specific resource that genuinely serves the argument.
- **How to structure it.** Bio link anchored on your name; in-body link anchored on the resource's title. Never keyword-anchored — Google's spam policies name optimized anchor text in guest posts as link spam. Write it as a real contribution to their audience, published once, not syndicated.
- **Why it scores where it does.** A genuine guest piece is an author-attributed appearance on someone else's trusted domain: link, mention, co-occurrence, and byline in one. The identical tactic done at scale with optimized anchors is an explicit policy violation — the difference is entirely in the execution.

###### B12. Inclusion in a reading list, syllabus, or bibliography hosted on an institution's site — **76/100**
*SEO 70 · GEO 80*

- **Which page it lives on.** A course syllabus page, a program reading list, or a library research guide (LibGuides).
- **Where on the page.** In the required/recommended reading list, with the URL of the work rather than only a print citation.
- **How to structure it.** Full bibliographic citation plus the canonical URL of your page for that work. Offer the instructor a stable permalink and a short excerpt page they can point students at.
- **Why it scores where it does.** Reading lists are the closest thing to a curated authority ranking in a field, they are heavily linked to by other institutions, and they are exactly the kind of corroborating page a model reads to decide who the canonical voices on a subject are.

###### B13. Being cited in a peer-reviewed journal article or academic book — **75/100**
*SEO 60 · GEO 88*

- **Which page it lives on.** The article's page on the journal's site and in the DOI record.
- **Where on the page.** The bibliography, with a DOI or stable URL where the work is online.
- **How to structure it.** Encourage citing the canonical URL of the work, and make sure a citable, stable version of the piece exists. Register an ORCID and keep your profile populated so citations resolve to you as one person.
- **Why it scores where it does.** Academic sources are one of the categories Muck Rack's study classifies inside the 84% earned-media share, and academic citation is the corroboration signal with the longest half-life. Slow, but it never decays.

###### B14. Guest appearance link in podcast show notes — **74/100**
*SEO 62 · GEO 84*

- **Which page it lives on.** The host's episode page on their own site, plus the RSS description that propagates to Apple and Spotify.
- **Where on the page.** In the guest introduction paragraph at the top of the show notes, and again in a 'links from this episode' block.
- **How to structure it.** Anchor on your full name for the bio link, and on the specific resource's title for any resource link. Send the host a pre-written three-line bio with the exact URLs — hosts almost always paste what you send. Ask for the transcript to be published on the page.
- **Why it scores where it does.** Show notes are indexed text on an established domain, they syndicate to several other indexed properties, and the transcript (if published) creates a long-form text surface where your ideas appear in someone else's voice — a co-occurrence signal.

###### B15. An accurate Wikidata item for you and your organization — **70/100**
*SEO 45 · GEO 90*

- **Which page it lives on.** wikidata.org, as a `Q` item with typed statements.
- **Where on the page.** `P856` (official website) pointing at your canonical domain; identifier properties for ORCID, VIAF, Library of Congress, ISNI, Goodreads, Google Scholar; `P800` (notable work) for each book.
- **How to structure it.** Create the item only if the underlying facts are externally sourced; add references to each statement. Mirror the QID back in your `Person`/`Organization` schema `sameAs`. Lower notability bar than Wikipedia and far easier to get right.
- **Why it scores where it does.** Wikidata is the structured backbone that feeds knowledge panels and entity resolution; Google migrated Freebase into it. A correct QID plus a reciprocal `sameAs` is the highest-leverage entity work available for an afternoon of effort.

###### B16. A library research guide (LibGuides) listing your work — **70/100**
*SEO 65 · GEO 74*

- **Which page it lives on.** The library's guide page on the institution's domain.
- **Where on the page.** In the topic's recommended sources list.
- **How to structure it.** Email the subject librarian with the topic, the work, and the stable URL. Librarians respond to this and almost nobody asks.
- **Why it scores where it does.** Institutional, curated, stable, and heavily linked between institutions. One of the highest effort-to-value ratios available.

###### B17. An interview transcript published on someone else's site — **69/100**
*SEO 58 · GEO 78*

- **Which page it lives on.** The host's transcript page.
- **Where on the page.** Full transcript, with your name attributed to each of your turns, and a bio block linking to your site.
- **How to structure it.** Ask that the transcript be posted as crawlable HTML on its own URL, with your name and affiliation in the intro paragraph. Offer to supply a cleaned transcript — most hosts will take it.
- **Why it scores where it does.** A long, indexed, third-party-hosted text document in which you make your arguments in your own words with your name attached. Structurally, one of the best assets in this entire inventory, and one of the easiest to ask for.

###### B18. A peer's glossary or reference page pointing at your canonical definition — **68/100**
*SEO 55 · GEO 78*

- **Which page it lives on.** The peer's glossary/term page.
- **Where on the page.** In the definition itself: 'the term originates with X; see their full definition.'
- **How to structure it.** Anchor on the term plus your name. Requires one canonical definition to exist on your side (see Inventory A).
- **Why it scores where it does.** Being the origin others point to for a term is the strongest position available in a field where models paraphrase everyone. This is the mechanism by which that origin status becomes legible.

###### B19. A speaker or session page for a conference you spoke at — **67/100**
*SEO 60 · GEO 72*

- **Which page it lives on.** The conference's own site.
- **Where on the page.** The speaker directory entry and the individual session page.
- **How to structure it.** Full name as anchor, canonical URL, with your session title and description as text on the page. Ask them to keep the archive page up after the event rather than wiping the site each year.
- **Why it scores where it does.** Stable, credible, and it corroborates the affiliation and expertise claims on your about page. The common failure is conferences deleting last year's site.

###### B20. A 'further reading' entry on a Wikipedia article — **66/100**
*SEO 50 · GEO 80*

- **Which page it lives on.** The `Further reading` section.
- **Where on the page.** A full bibliographic entry for a book or major work, where it genuinely serves the reader.
- **How to structure it.** Same conflict-of-interest rule: never add your own. It is more easily removed than an inline citation, so treat it as the weaker cousin of a real reference.
- **Why it scores where it does.** Lower value than an inline citation but the same underlying domain trust.

###### B21. An 'our team', board, faculty, or advisor page on an organization's site — **65/100**
*SEO 58 · GEO 70*

- **Which page it lives on.** The organization's people page.
- **Where on the page.** Your name, role, photo, and a one-line bio containing your affiliation, with the link on your name.
- **How to structure it.** Full name as anchor pointing at your canonical about page. Keep the bio text consistent with your own site's bio.
- **Why it scores where it does.** Affiliation corroboration. The value is less the link than the fact that a third party states the same thing about you that you state about yourself.

###### B22. Your LinkedIn presence: personal profile, organization page, and substantive posts — **64/100**
*SEO 40 · GEO 84*

- **Which page it lives on.** linkedin.com — the profile 'website' fields, the company page, and individual long-form posts.
- **Where on the page.** Profile: featured section and contact info. Posts: the idea stated in full in the post body, with the link in the first comment or at the end.
- **How to structure it.** Consistent name, title, and organization across profile and company page; `sameAs` both from your site. In posts, write the substance in the post itself — a bare link with 'thoughts?' produces no citable text.
- **Why it scores where it does.** LinkedIn is now a top-two cited domain in several large studies of AI answer sourcing (around 11% of citations in Semrush's 325,000-prompt analysis, and the biggest riser of 2025–26). It is one of the few high-citation platforms where a serious professional can participate authentically.

###### B23. An award, grant, fellowship, or cohort listing — **61/100**
*SEO 52 · GEO 68*

- **Which page it lives on.** The awarding body's announcement or recipient directory page.
- **Where on the page.** The recipient list entry with your name and organization.
- **How to structure it.** Ask for a link on your name at the point of announcement; these pages become permanent records.
- **Why it scores where it does.** Third-party validation on a domain you don't control, in a format that stays put.

###### B24. Your author profile on retail and reader platforms — **60/100**
*SEO 45 · GEO 72*

- **Which page it lives on.** Amazon Author Central, Goodreads author profile, Bookshop.org.
- **Where on the page.** The 'website' field in the author bio, and the bio text itself.
- **How to structure it.** Complete the bio fully with your frameworks named; link the canonical domain. Claim the profile so you control it. Mirror in `sameAs`.
- **Why it scores where it does.** For authors, this is where a large share of third-party identity signals live, and the profiles are usually half-empty. Trivial effort, permanent presence.

###### B25. Organic mention in a Reddit thread on a relevant subreddit — **59/100**
*SEO 30 · GEO 82*

- **Which page it lives on.** The thread page on reddit.com.
- **Where on the page.** Inside a substantive comment that answers the question, with the recommendation stated in prose.
- **How to structure it.** Participate as yourself, disclose your interest, answer the actual question. Do not seed threads or buy upvotes: cited threads skew old (average cited post age is around 900 days) and low-engagement (up to 80% have fewer than 20 upvotes), so manufactured virality does not produce citations.
- **Why it scores where it does.** Reddit is the most-cited domain in nearly every study of LLM sourcing (40.1% of references in Semrush's 150,000-citation study; ~11.3% share in the 2026 cut). Domains with heavy Reddit discussion earn several times more ChatGPT citations. It is also the platform where inauthenticity is punished fastest, by both moderators and the models.

###### B26. An endorsement or blurb printed on someone else's book — **59/100**
*SEO 45 · GEO 70*

- **Which page it lives on.** The book's publisher page, retail listings, and the physical jacket.
- **Where on the page.** The endorsement block, with your name, title, and organization.
- **How to structure it.** Ensure your name and affiliation are given in the exact canonical form. Ask the publisher to link your name on the web page where they list endorsements.
- **Why it scores where it does.** Circulates your name in permanent association with a credible work, across every retail surface. Rarely linked, frequently indexed.

###### B27. A Substack recommendation and in-post citation from another writer — **57/100**
*SEO 45 · GEO 66*

- **Which page it lives on.** Their publication's recommendation list and any post that cites you.
- **Where on the page.** In-post: inside their argument. Recommendation: their /recommendations page.
- **How to structure it.** Anchor on your publication's name or the specific piece's title. Recommendations are reciprocal by convention — only do it where you'd genuinely recommend them.
- **Why it scores where it does.** Modest link value, real audience value, and Substack posts are indexed and appear in citation datasets.

###### B28. An unlinked but prominent brand or name mention on an indexed site — **56/100**
*SEO 25 · GEO 82*

- **Which page it lives on.** Anywhere credible — an article, a transcript, a forum thread, a conference program.
- **Where on the page.** In prose, near the subject you want to be associated with, with your full name and the name of your work spelled consistently.
- **How to structure it.** Consistency is the whole technique: same name form, same organization name, same framework names, everywhere. Chase the mention, then optionally ask for the link — but do not trade away the mention to get one.
- **Why it scores where it does.** Branded web mentions correlate with AI visibility roughly three times as strongly as backlinks (0.664 vs 0.218 across 75,000 brands). Note the caveat the researchers themselves publish: correlation is not causation, and brand strength plausibly causes both. Note also Google's explicit warning that *seeking inauthentic mentions* does not work.

###### B29. Your book's bibliography entry in someone else's book — **56/100**
*SEO 35 · GEO 74*

- **Which page it lives on.** The print bibliography, which surfaces online via Google Books, publisher pages, and academic databases.
- **Where on the page.** The bibliography and, better, a discussed passage in the body.
- **How to structure it.** Nothing to structure directly — but ensure the citation form matches your canonical name and title so it resolves to the same entity everywhere.
- **Why it scores where it does.** Invisible to link tools and highly visible to models trained on books and academic corpora. The scoring gap between its SEO and GEO value is one of the widest on this list.

###### B30. A course platform instructor bio — **56/100**
*SEO 48 · GEO 62*

- **Which page it lives on.** The platform's instructor page (Seminary Now, Coursera, a denominational LMS).
- **Where on the page.** The bio block on the instructor page and on each course listing.
- **How to structure it.** Full bio with credentials, link on name or 'official site'. Ask for it on the course pages too, not just the instructor page.
- **Why it scores where it does.** Trusted third-party domain, permanent, and it corroborates the teaching claim.

###### B31. A foreword, afterword, or chapter contribution credit — **55/100**
*SEO 40 · GEO 68*

- **Which page it lives on.** The book's page, the table of contents, and the copyright page.
- **Where on the page.** The contributor list and the description text.
- **How to structure it.** Same rule: canonical name form; ask for a link where a web page lists contributors.
- **Why it scores where it does.** Stronger than a blurb because it makes you part of the work's authorship record, which flows into library and academic metadata.

###### B32. Podcast directory show pages (Apple, Spotify, YouTube) — **55/100**
*SEO 42 · GEO 66*

- **Which page it lives on.** The show page in each directory.
- **Where on the page.** The show description and each episode's description.
- **How to structure it.** Submit and verify the RSS feed to all three. Descriptions should contain the canonical URL and a real description of the show's subject, not just a tagline.
- **Why it scores where it does.** These pages rank, they're indexed, and they corroborate that the show exists. Ratings and reviews on them are a separate authority signal.

###### B33. A press kit or newsroom pickup — **54/100**
*SEO 50 · GEO 58*

- **Which page it lives on.** The outlet's or partner's news page.
- **Where on the page.** In the announcement text.
- **How to structure it.** Maintain a single press page with canonical facts, approved bios, high-res images, named spokespeople, and the exact URLs you want used. Journalists copy what's in front of them.
- **Why it scores where it does.** Value comes from making the correct link the path of least resistance for someone writing about you.

###### B34. A Quora or Stack Exchange answer citing your work — **52/100**
*SEO 30 · GEO 70*

- **Which page it lives on.** The answer page.
- **Where on the page.** Inside a genuinely useful answer, as supporting evidence.
- **How to structure it.** Answer the question properly first; cite yourself as a source with the specific page, not the homepage. Disclose that it's your work.
- **Why it scores where it does.** Quora URLs appear in AI citation datasets at meaningful volume (Semrush studied 26,000 Quora URLs cited in Google AI Mode). Low ranking value, real citation value.

###### B35. A directory or database record: Crunchbase, LinkedIn company page, Google Business Profile — **52/100**
*SEO 40 · GEO 62*

- **Which page it lives on.** Each platform's record for your organization.
- **Where on the page.** The official website field, plus consistent name, address, founding date, and description.
- **How to structure it.** Absolute consistency across all of them — the same organization name, the same description, the same URL. Mirror every one in `sameAs`.
- **Why it scores where it does.** Individually weak; collectively they are the corroboration set an entity-resolution system triangulates against. Inconsistency across them actively costs you.

###### B36. A translation or foreign-language publisher's page — **49/100**
*SEO 42 · GEO 55*

- **Which page it lives on.** The foreign publisher's site.
- **Where on the page.** The author page and each translated title's page.
- **How to structure it.** Link to your canonical domain (or its localized version if one exists, with `hreflang` in place).
- **Why it scores where it does.** Extends the entity into other language corpora, where competition for citation is far thinner.

###### B37. A church, nonprofit, or practitioner site's 'resources we use' page — **49/100**
*SEO 45 · GEO 52*

- **Which page it lives on.** The organization's resource or recommended-reading page.
- **Where on the page.** In the list, with a sentence saying what they use it for.
- **How to structure it.** Anchor on the resource's title. Ask for the sentence — 'we use this in our leadership formation' — because the description is what makes it evidence rather than a bare link.
- **Why it scores where it does.** Individually small. In aggregate, across dozens of practitioner organizations, this is what actual field adoption looks like to a crawler.

###### B38. An archived or permanently identified version of your work — **46/100**
*SEO 30 · GEO 60*

- **Which page it lives on.** archive.org, Zenodo, an institutional repository, or a DOI registry.
- **Where on the page.** A deposited copy of the significant work with metadata and a DOI.
- **How to structure it.** Deposit with correct author metadata and ORCID; link the DOI from your own page as the citable version.
- **Why it scores where it does.** Insurance and citability. Makes the work addressable in academic infrastructure, which is disproportionately represented in what models were trained on.

###### B39. A job posting or staff affiliation page — **40/100**
*SEO 35 · GEO 45*

- **Which page it lives on.** The employer's careers or staff page.
- **Where on the page.** The organization description.
- **How to structure it.** Consistent organization name and URL.
- **Why it scores where it does.** Weak on its own; counts as one more independent source stating the same affiliation.

###### B40. A community or forum profile link — **26/100**
*SEO 20 · GEO 30*

- **Which page it lives on.** Your profile page on a professional community.
- **Where on the page.** The website field.
- **How to structure it.** Fill it in with the canonical URL; don't put links in signatures on every post.
- **Why it scores where it does.** Marginal. Included for completeness — the cost is two minutes and the value is a small consistency signal.

###### B41. A paid, sponsored, or advertorial placement — **11/100**
*SEO 12 · GEO 10*

- **Which page it lives on.** The publication's sponsored-content section.
- **Where on the page.** Marked as sponsored, wherever they put it.
- **How to structure it.** Must carry `rel="sponsored"` and a visible disclosure. Buy it for the audience if the audience is worth it — never for the link.
- **Why it scores where it does.** Paid and advertorial content accounts for 0.3% of AI citations. Its SEO value is zero by policy when correctly marked and negative when it isn't.
- **⚠ Risk.** Policy risk if undisclosed.

###### B42. A blog comment link — **8/100**
*SEO 8 · GEO 8*

- **Which page it lives on.** The comment thread of someone else's post.
- **Where on the page.** Nowhere worth engineering.
- **How to structure it.** Will be `ugc`/`nofollow` on any well-run site. Comment substantively if you have something to say; do not treat it as a link tactic.
- **Why it scores where it does.** Effectively zero value for either system. Listed so that it is explicitly ranked at the bottom rather than left ambiguous.

###### B43. Press-release wire syndication — **8/100**
*SEO 10 · GEO 6*

- **Which page it lives on.** PR Newswire, Business Wire, and the hundreds of syndicated copies.
- **Where on the page.** The boilerplate at the foot.
- **How to structure it.** If you use the wire, use it for the announcement, not the links: brand-name anchors or bare URLs only, `nofollow`/`sponsored` on the links. Publish the release on your own newsroom as the canonical version.
- **Why it scores where it does.** Wire syndication accounts for roughly 0.04% of AI citations — essentially invisible. And 'links with optimized anchor text in press releases distributed on other sites' is named verbatim in Google's spam policies.
- **⚠ Risk.** Explicit spam-policy violation if anchors are optimized.

###### B44. Paid guest-post networks and link insertions — **4/100**
*SEO 3 · GEO 5*

- **Which page it lives on.** Low-quality blogs that accept payment for placements.
- **Where on the page.** n/a
- **How to structure it.** Do not.
- **Why it scores where it does.** Explicitly named as link spam. The upside is negligible and the downside is a manual action plus the loss of the one thing a credible network has that a competitor cannot copy: connections that are real.
- **⚠ Risk.** Named in Google's spam policies; manual-action risk.

###### B45. Reciprocal link exchanges arranged for SEO — **4/100**
*SEO 3 · GEO 4*

- **Which page it lives on.** Partner pages on sites you have no genuine relationship with.
- **Where on the page.** n/a
- **How to structure it.** Do not. The test: would you make this link if search engines didn't exist?
- **Why it scores where it does.** At small scale it's decoration; at scale it reads as a scheme. For a network whose entire advantage is that its connections are genuine, manufacturing a few trades away the only non-replicable asset it has.
- **⚠ Risk.** Named in Google's spam policies.

###### B46. Private blog networks (PBNs) — **0/100**
*SEO 0 · GEO 0*

- **Which page it lives on.** Domains you or a vendor secretly control.
- **Where on the page.** n/a
- **How to structure it.** Do not.
- **Why it scores where it does.** Straightforward manipulation with a well-documented failure mode.
- **⚠ Risk.** Manual action; potential deindexing.

---

#### Inventory C — Every link you can give another author inside your own network

This inventory behaves differently from the other two, so it is scored differently.

A link you give a peer inside a network you are commercially connected to has **four** values, not one. It is worth something to them, something to you, something to the network's collective credibility — and it carries a risk the other two inventories don't, because a link between related parties is the exact object that link-scheme detection is built to find.

- **Recipient** — what it's worth to the author receiving it.
- **Giver** — what it's worth to you. Outbound citation to credible sources is itself a trust signal; this column is not zero.
- **Network** — what it contributes to the corroboration signal that makes the whole field read as a real body of thought.
- **Risk** — how likely this link is to read as arrangement rather than thought, to a reviewer, a journalist, or a spam system. **Higher is worse.**

**Net = (0.35 × Recipient) + (0.25 × Giver) + (0.40 × Network) − (0.60 × Risk)**

The risk penalty is deliberately heavy, and scores can go negative. That is the point: several of the most tempting network link patterns are worth less than nothing, and a signed score says so plainly. Entries marked ⚠ are ones to remove, not to optimise.

##### Ranking summary

| # | Link you give a peer | Recip. | Giver | Network | Risk | **Net** |
|---|---|---:|---:|---:|---:|---:|
| C1 | A link inside a genuine disagreement with their position | 80 | 85 | 90 | 2 | **84** |
| C2 | A citation where you genuinely build on their framework | 88 | 72 | 92 | 5 | **83** |
| C3 | A co-author byline cross-link on work you actually wrote together | 75 | 70 | 85 | 3 | **76** |
| C4 | Deferring to their canonical definition of a shared term | 82 | 60 | 88 | 6 | **75** |
| C5 | Publishing a filmed or recorded conversation with them | 80 | 68 | 82 | 8 | **73** |
| C6 | Assigning their article or chapter as required reading in your course | 72 | 58 | 78 | 10 | **65** |
| C7 | A citation registry entry pointing at their work | 60 | 55 | 78 | 4 | **64** |
| C8 | Hosting a guest essay by them under their own byline | 78 | 55 | 75 | 18 | **60** |
| C9 | Naming them as a collaborator in a case study | 60 | 55 | 70 | 10 | **57** |
| C10 | Linking to their book page rather than their homepage | 65 | 45 | 62 | 8 | **54** |
| C11 | A pathway step pointing to their resource | 58 | 45 | 62 | 15 | **47** |
| C12 | Co-listing on an event page | 50 | 45 | 58 | 10 | **46** |
| C13 | A one-page 'about this network' page, linked once from each node | 45 | 40 | 70 | 15 | **45** |
| C14 | Featuring a peer's new book or launch on your homepage, temporarily | 62 | 40 | 60 | 18 | **45** |
| C15 | A translation or derivative-work credit | 48 | 35 | 55 | 8 | **43** |
| C16 | A curated further-reading block at the end of an article | 58 | 40 | 60 | 22 | **41** |
| C17 | A shared press or reference kit linking each member | 40 | 35 | 55 | 12 | **38** |
| C18 | A newsletter issue recommending their piece | 45 | 35 | 50 | 12 | **37** |
| C19 | A peer bio card on your about page | 50 | 45 | 60 | 28 | **36** |
| C20 | A site-wide network footer strip naming peers | 48 | 35 | 58 | 45 | **22** |
| C21 | An algorithmic cross-node recommendation module | 45 | 30 | 45 | 55 | **8** |
| C22 | The platform chrome link present on every page of every node | 30 | 25 | 50 | 50 | **7** |
| C23 | A cross-node link with keyword-optimised anchor text ⚠ | 55 | 15 | 20 | 85 | **-20** |
| C24 | A reciprocal link swap arranged for SEO ⚠ | 50 | 50 | 10 | 92 | **-21** |
| C25 | Linking a peer who has no independent footprint ⚠ | 35 | 8 | 12 | 70 | **-23** |
| C26 | A boilerplate cross-link block auto-inserted into every article ⚠ | 38 | 12 | 18 | 82 | **-26** |
| C27 | Complete-graph linking — every node links every other, in the same way ⚠ | 40 | 15 | 15 | 95 | **-33** |
| C28 | An undisclosed commercially arranged link ⚠ | 45 | 10 | 10 | 98 | **-37** |
| C29 | Duplicated glossary or corpus content across nodes ⚠ | 20 | 10 | 10 | 88 | **-39** |

##### The entries in full

###### C1. A link inside a genuine disagreement with their position — **84 net**
*Recipient 80 · Giver 85 · Network 90 · Risk 2*

- **Which page it lives on.** Your article arguing against, qualifying, or complicating a peer's claim.
- **Where on the page.** In the paragraph where you state what they argue, before you say why you think it's wrong or incomplete.
- **How to structure it.** Anchor on their name plus the specific claim: `Brad Brisco's case for covocational over bivocational`. State their position fairly and in their terms before you depart from it. No reciprocity expected or requested.
- **Why it scores where it does.** The single safest and most valuable cross-node link there is. Colluding parties do not argue with each other in public, so a substantive disagreement is self-authenticating in a way no mutual endorsement can be. It also produces exactly the co-occurrence signal — your name, their name, the concept, in one passage — while being impossible to read as a scheme.

###### C2. A citation where you genuinely build on their framework — **83 net**
*Recipient 88 · Giver 72 · Network 92 · Risk 5*

- **Which page it lives on.** Any article, pathway section, or course week where you use a peer's concept as load-bearing.
- **Where on the page.** Inline, in the sentence where the idea does its work — not in a credits block at the foot.
- **How to structure it.** Anchor on their name plus the framework: `Alan Hirsch's APEST`. Point at their canonical page for that framework, never their homepage. Say in the sentence what you take from it and what you're adding.
- **Why it scores where it does.** The gold standard. It's true, it helps the reader, it survives any scrutiny, and it's the edge that makes a network read as a body of thought rather than a directory. The test that governs it: would you make this link if search engines didn't exist?

###### C3. A co-author byline cross-link on work you actually wrote together — **76 net**
*Recipient 75 · Giver 70 · Network 85 · Risk 3*

- **Which page it lives on.** The article, book page, or course you co-produced.
- **Where on the page.** Both bios in the byline block, each linking to that author's own canonical about page.
- **How to structure it.** Pull live rather than hard-coding so it stays correct. Identical treatment at both ends. Reference each other by `@id` in the `Person` schema.
- **Why it scores where it does.** A non-fakeable relationship. Co-authorship is a matter of public record, which is precisely why the reciprocity here raises no flag while reciprocity elsewhere does.

###### C4. Deferring to their canonical definition of a shared term — **75 net**
*Recipient 82 · Giver 60 · Network 88 · Risk 6*

- **Which page it lives on.** Your glossary entry for a term that originates with them.
- **Where on the page.** In the definition itself, as the source line.
- **How to structure it.** `This term originates with {name}; the canonical definition is theirs.` Link the term to their glossary URL. One definition per term across the whole network — yours points at theirs rather than restating it.
- **Why it scores where it does.** Solves a real duplicate-content problem and creates a genuine origin-attribution edge at the same time. It also settles the vocabulary question the network exists to settle: one definition, not five.

###### C5. Publishing a filmed or recorded conversation with them — **73 net**
*Recipient 80 · Giver 68 · Network 82 · Risk 8*

- **Which page it lives on.** An episode page on your site, with a full transcript.
- **Where on the page.** Their name in the page title, their bio and canonical URL in the first paragraph of the description, and a link inside the transcript intro.
- **How to structure it.** Title format: `{Their name} on {the specific topic}`. Publish the transcript as crawlable HTML. `PodcastEpisode` or `VideoObject` schema with them as a named `Person`. Post the video version to YouTube with captions on.
- **Why it scores where it does.** This is the highest-value thing one network author can do for another, because it fires the strongest signal in the evidence base — a name in a YouTube title, description and transcript — while producing a long third-party-hosted text surface in which they make their own arguments in their own words.

###### C6. Assigning their article or chapter as required reading in your course — **65 net**
*Recipient 72 · Giver 58 · Network 78 · Risk 10*

- **Which page it lives on.** The course week or module page.
- **Where on the page.** In the reading list, with a line saying why this piece and not another.
- **How to structure it.** Anchor on the work's title. The free/public week should carry at least one, since the paid weeks are `noindex` and invisible.
- **Why it scores where it does.** Curricular adoption is a strong, verifiable statement of intellectual dependence. It is also one of the few cross-node links a reader immediately understands the reason for.

###### C7. A citation registry entry pointing at their work — **64 net**
*Recipient 60 · Giver 55 · Network 78 · Risk 4*

- **Which page it lives on.** Your `/footnotes` page, as the resolved source for a specific claim.
- **Where on the page.** In the registry row, with page number or timestamp where applicable.
- **How to structure it.** Full citation — author, title, edition, page, URL. The inline marker in the article resolves here; the registry entry links out to them.
- **Why it scores where it does.** Quiet, precise, and cumulative. Registry entries are the least performative cross-node links available, which is part of why they read as real.

###### C8. Hosting a guest essay by them under their own byline — **60 net**
*Recipient 78 · Giver 55 · Network 75 · Risk 18*

- **Which page it lives on.** A single article page on your site.
- **Where on the page.** Their full bio at the foot with one link to their canonical site, plus at most one contextual in-body link to a specific resource of theirs.
- **How to structure it.** Published once, not syndicated. Bio link anchored on their name; any in-body link anchored on the resource's title. Never keyword-anchored — Google's spam policies name optimized anchors in guest posts specifically.
- **Why it scores where it does.** Genuinely valuable, and the single cross-node pattern most likely to be misread if done repeatedly with the same structure. One or two a year per peer is a contribution; a monthly rotation of reciprocal guest posts across five sites is a pattern.

###### C9. Naming them as a collaborator in a case study — **57 net**
*Recipient 60 · Giver 55 · Network 70 · Risk 10*

- **Which page it lives on.** The case study or field report page.
- **Where on the page.** In the setup paragraph, where you say who was involved.
- **How to structure it.** Their name linked to their about page, with their actual role stated. Only where they were actually involved and consent to being named.
- **Why it scores where it does.** Shared work in the field is the offline reality the network exists to make visible online. It's also verifiable by anyone who asks the organisation involved.

###### C10. Linking to their book page rather than their homepage — **54 net**
*Recipient 65 · Giver 45 · Network 62 · Risk 8*

- **Which page it lives on.** Anywhere you reference one of their books.
- **Where on the page.** At the point of reference, in the prose.
- **How to structure it.** Anchor on the italicised title. Point at their canonical book page on their own site, not Amazon — the retail link is a separate, additional link, not a substitute.
- **Why it scores where it does.** Deep links to specific works read as reading; homepage links read as promotion. This distinction is visible to a human reviewer and is one of the cleanest signals of intent in a link graph.

###### C11. A pathway step pointing to their resource — **47 net**
*Recipient 58 · Giver 45 · Network 62 · Risk 15*

- **Which page it lives on.** A pathway or formation page.
- **Where on the page.** Inside the step, where a reader actually needs the resource.
- **How to structure it.** Anchor on the resource title, with a line on what it does for the reader at that point.
- **Why it scores where it does.** Legitimate where the pathway genuinely routes people outward. Becomes decorative fast if every pathway on every node includes a peer link by convention.

###### C12. Co-listing on an event page — **46 net**
*Recipient 50 · Giver 45 · Network 58 · Risk 10*

- **Which page it lives on.** The event or cohort page on your site.
- **Where on the page.** In the speaker or faculty list.
- **How to structure it.** Name linked to their about page, with their session title. Keep the page live after the event.
- **Why it scores where it does.** Events are verifiable public facts. Low ceiling, low risk, and the pages accumulate outside links from attendees.

###### C13. A one-page 'about this network' page, linked once from each node — **45 net**
*Recipient 45 · Giver 40 · Network 70 · Risk 15*

- **Which page it lives on.** A single page on your site describing the network and naming its members.
- **Where on the page.** Linked from the footer or about page — once, not on every page as a strip.
- **How to structure it.** Name each member with a sentence on the actual connection and a link. State the commercial relationship plainly, including who owns the platform and what the arrangement is. Keep the claim proportionate to reality.
- **Why it scores where it does.** Strictly better than a site-wide peer footer: same disclosure value, one link instead of thousands, and it puts the relationship on the record in a place a journalist or reviewer can read. Disclosure converts a connection that looks arranged into one that looks ordinary.

###### C14. Featuring a peer's new book or launch on your homepage, temporarily — **45 net**
*Recipient 62 · Giver 40 · Network 60 · Risk 18*

- **Which page it lives on.** The homepage, for a defined window.
- **Where on the page.** In a current-work block, dated, and removed afterwards.
- **How to structure it.** Anchor on the work's title. Say why you're pointing at it. Take it down when it's no longer current — a permanent 'featured' peer block is a footer strip wearing a different hat.
- **Why it scores where it does.** High-value while genuinely current. The homepage is your most authoritative page, which is exactly why permanent peer placement there reads as arrangement rather than recommendation.

###### C15. A translation or derivative-work credit — **43 net**
*Recipient 48 · Giver 35 · Network 55 · Risk 8*

- **Which page it lives on.** The translated or adapted resource page.
- **Where on the page.** In the provenance line.
- **How to structure it.** `Adapted from {title} by {name}, used with permission.` Linked, with the original as canonical.
- **Why it scores where it does.** Provenance stated plainly. Rare, but among the most legible forms of intellectual dependence.

###### C16. A curated further-reading block at the end of an article — **41 net**
*Recipient 58 · Giver 40 · Network 60 · Risk 22*

- **Which page it lives on.** Below the article body.
- **Where on the page.** Three to five items, chosen for this piece specifically.
- **How to structure it.** Each with a one-line reason. Mix network and non-network sources — a further-reading block containing only network authors is the tell. If you can't name a reason for an item, cut it.
- **Why it scores where it does.** Useful when curated, damaging when templated. The risk sits entirely in whether the same block appears under every article.

###### C17. A shared press or reference kit linking each member — **38 net**
*Recipient 40 · Giver 35 · Network 55 · Risk 12*

- **Which page it lives on.** One press page, reachable from every node.
- **Where on the page.** Canonical stats, approved bios, named spokespeople, and a link per member.
- **How to structure it.** One canonical version hosted once, with the other nodes linking to it rather than duplicating it.
- **Why it scores where it does.** Legitimate infrastructure that also gives outside writers a single correct place to get names, spellings and URLs right — which is where most earned-link errors originate.

###### C18. A newsletter issue recommending their piece — **37 net**
*Recipient 45 · Giver 35 · Network 50 · Risk 12*

- **Which page it lives on.** The public, indexable archive page for that issue.
- **Where on the page.** In the body, as the issue's single substantive link.
- **How to structure it.** The archive must be `index,follow`. Anchor on the piece's title, with a sentence on why it's worth reading.
- **Why it scores where it does.** Modest, and only counts at all if the archive is public. Most newsletters throw this value away entirely.

###### C19. A peer bio card on your about page — **36 net**
*Recipient 50 · Giver 45 · Network 60 · Risk 28*

- **Which page it lives on.** Your about or 'people I work with' page.
- **Where on the page.** In a named-relationships block, with a sentence each.
- **How to structure it.** Photo, name, one line on the actual working relationship, link. Keep it to people you actually work with, and say how.
- **Why it scores where it does.** Fine at five names with real sentences. A grid of twenty faces with no descriptions is a link directory, and reads as one.

###### C20. A site-wide network footer strip naming peers — **22 net**
*Recipient 48 · Giver 35 · Network 58 · Risk 45*

- **Which page it lives on.** The footer of every page on your site.
- **Where on the page.** Above the legal line.
- **How to structure it.** Peer names (not keyword anchors), one honest line each, and a link to the disclosure page. If your platform generates this automatically, vary nothing about the anchors — but understand that its uniformity across every node is itself the footprint.
- **Why it scores where it does.** The cheapest signal available and the largest footprint on this list. It multiplies one editorial decision by every page on every node, producing a complete, uniform, reciprocal graph — the exact shape link-scheme detection looks for. Worth keeping, but it should be the *only* site-wide cross-node element, and the 'about this network' page above does most of the same work with a fraction of the exposure.

###### C21. An algorithmic cross-node recommendation module — **8 net**
*Recipient 45 · Giver 30 · Network 45 · Risk 55*

- **Which page it lives on.** Article and pathway pages, generated by relevance scoring.
- **Where on the page.** Below the content, clearly labelled as related work from the network.
- **How to structure it.** Cap the number. Vary by page — a module that resolves to the same three peers everywhere is a footer strip with extra steps. Consider `nofollow` on the module while leaving editorial in-body citations followed.
- **Why it scores where it does.** The most seductive item here and one of the weakest. It scales the link count without scaling the intellectual relationship, which is the definition of the thing you don't want.

###### C22. The platform chrome link present on every page of every node — **7 net**
*Recipient 30 · Giver 25 · Network 50 · Risk 50*

- **Which page it lives on.** The Movemental bar above the leader header, site-wide, on every tenant.
- **Where on the page.** Left of the bar, as the network signal.
- **How to structure it.** Anchor it on the platform's name only — never on a descriptive keyword phrase. Point it at the disclosure page on the leader's own site, not at movemental.ai. Mark it `rel="nofollow"` (not `sponsored` — see Part Five; `sponsored` is for paid placements and this isn't one). Nofollowing costs nothing on the AI side, since nofollow links correlate with AI mentions about as strongly as followed ones.
- **Why it scores where it does.** A site-wide, identical, boilerplate link from every tenant to a commercially related property is structurally indistinguishable from a 'designed by' footer network — a pattern that has drawn manual actions for over a decade. The fix is trivial and costs nothing: qualify the link, keep the anchor to the brand name, and disclose. Do that and it becomes a non-issue.

###### C23. A cross-node link with keyword-optimised anchor text — **-20 net**
*Recipient 55 · Giver 15 · Network 20 · Risk 85*

- **Which page it lives on.** Anywhere.
- **Where on the page.** n/a
- **How to structure it.** Don't. Anchor on names and titles.
- **Why it scores where it does.** ⚠ Branded anchors correlate with AI visibility at 0.527; keyword anchors between commercially related sites are named in the spam policies. You are trading a signal that works for one that is explicitly prohibited.

###### C24. A reciprocal link swap arranged for SEO — **-21 net**
*Recipient 50 · Giver 50 · Network 10 · Risk 92*

- **Which page it lives on.** Pillar pages, traded.
- **Where on the page.** n/a
- **How to structure it.** Don't.
- **Why it scores where it does.** ⚠ Explicitly named as link spam. And it trades away the one asset the network has that a competitor cannot replicate — that its connections are real.

###### C25. Linking a peer who has no independent footprint — **-23 net**
*Recipient 35 · Giver 8 · Network 12 · Risk 70*

- **Which page it lives on.** Anywhere.
- **Where on the page.** n/a
- **How to structure it.** Wait until they have one, and help them build it first.
- **Why it scores where it does.** ⚠ Corroboration is only worth something between independently credible sources. Linking a node with no external evidence behind it doesn't lend them authority; it spends yours and adds a weak edge to the graph. The selection standard matters more than the node count.

###### C26. A boilerplate cross-link block auto-inserted into every article — **-26 net**
*Recipient 38 · Giver 12 · Network 18 · Risk 82*

- **Which page it lives on.** Every article on the node.
- **Where on the page.** n/a
- **How to structure it.** Don't. Curate per piece.
- **Why it scores where it does.** ⚠ Uniform, site-wide, reciprocal, and content-independent — four of the properties that define a link scheme, delivered at once.

###### C27. Complete-graph linking — every node links every other, in the same way — **-33 net**
*Recipient 40 · Giver 15 · Network 15 · Risk 95*

- **Which page it lives on.** Across all nodes.
- **Where on the page.** n/a
- **How to structure it.** Don't engineer it. Let the graph be lumpy.
- **Why it scores where it does.** ⚠ Real intellectual networks are uneven: hubs, one-way edges, and gaps where two people simply have never engaged. A complete, symmetric graph among commercially related sites is statistically anomalous and is the clearest available fingerprint. Evenness is the tell, not density.

###### C28. An undisclosed commercially arranged link — **-37 net**
*Recipient 45 · Giver 10 · Network 10 · Risk 98*

- **Which page it lives on.** Anywhere money, equity, or contract sits behind the link and isn't stated.
- **Where on the page.** n/a
- **How to structure it.** Disclose it, or don't make it.
- **Why it scores where it does.** ⚠ The single worst item on any of these lists. An undisclosed relationship discovered later costs more than a disclosed one ever could — with search systems, with journalists, and with the audience. Said plainly it's context; found by someone else it's a story.

###### C29. Duplicated glossary or corpus content across nodes — **-39 net**
*Recipient 20 · Giver 10 · Network 10 · Risk 88*

- **Which page it lives on.** The same definitions or articles published on multiple nodes.
- **Where on the page.** n/a
- **How to structure it.** One canonical host, cross-domain canonical or a link from the others.
- **Why it scores where it does.** ⚠ Not a link problem but a network problem that presents as one: identical content across commercially related domains splits the signal, competes with itself, and looks like a content network. One definition, one URL, everyone else links.

---

### PART FOUR — Anatomy of a mention: what actually counts

The two strongest signals in the entire evidence base are both called "mentions," and the word is doing a great deal of undefined work. Both have precise operational definitions, because both come from a specific index with specific rules about what it counts. Knowing the rule is what separates work that registers from work that doesn't.

#### What a "YouTube mention" is

**The operational definition.** Ahrefs measured it as: *any time the brand name appears in a YouTube video's title, description, or transcript.* Nothing more. It is a string match on a name inside indexed video text. A second variable, "YouTube mention impressions," weighted those mentions by each video's view count and correlated slightly *lower* (≈0.717 vs ≈0.737) — which is the most useful detail in the whole study, because it means **breadth of mention beats reach of mention**. Twenty videos across twenty channels naming you appear to matter more than one video with a million views.

Three consequences follow immediately.

**A link is not required.** No URL in the description, no backlink, nothing. The name in the text is the whole unit.

**Speech becomes text.** YouTube auto-captions nearly everything, so a sentence spoken aloud in a conversation becomes indexed transcript text. This is why the signal exists at all — and why the mechanism is plausible rather than magical: OpenAI is reported to have trained GPT-4 on more than a million hours of YouTube transcription, and Google's AI Mode cites YouTube more than any other domain.

**The name must match the string.** "Alan Hirsch" and "Alan Hirsh" are two different entities to a string index. So is "Hirsch" alone.

##### Three kinds, ranked

**1. Someone else's channel discusses your work without you in the room.** The strongest form, because it's independent. A seminary's channel posts a lecture called *Reading Alan Hirsch's APEST for the Local Church*; the lecturer says your name eleven times in forty minutes; the description names the book. That is one title mention, one description mention, and eleven transcript mentions on a channel you don't control.

**2. You as a guest on someone else's channel.** A filmed interview or a video podcast. Your name is in the title, your bio and site are in the description, and you speak your own frameworks for an hour into a transcript.

**3. Your own channel.** Counts in the index, but it is you talking about yourself — the weakest form of corroboration, and the one most likely to be discounted by anything smarter than a string match. Worth doing for the transcript surface; not worth mistaking for evidence.

##### A good one, concretely

> **Channel:** a denominational leadership network with 40,000 subscribers.
> **Title:** *Brad Brisco on Covocational Church Planting — Why Bivocational Isn't the Same Thing*
> **Description, first two lines:** "Brad Brisco is the author of *Covocational Church Planting* and *Missional Essentials*, and directs church planting for the Send Network. He joins us to explain the difference between bivocational and covocational ministry and why it changes how you recruit planters. Brad's work: bradbrisco.com"
> **In the video:** he defines the framework aloud, in his own words, twice, and names the two books.
> **Chapters:** a chapter marker reading "What covocational actually means (4:12)".
> **Captions:** on.

Count what that produced: the name in the title, the name plus two book titles plus an organization plus a framework in the description, the framework defined in his own voice in the transcript, a chapter title that is itself an extractable answer to a question people ask, and a URL. On a channel he doesn't own. That is a single asset that fires the highest-correlated signal in the dataset roughly a dozen times.

##### The weak versions

- A video titled *Episode 47* with a description reading "Great conversation this week!" — zero title mention, zero description mention, and if captions are off, zero transcript mentions. The interview effectively did not happen as far as any index is concerned.
- Ten thin videos on your own channel with no views, no transcripts, and no third-party reinforcement. The study points at brand salience, not content volume.
- A single viral hit. Impressions correlated *lower* than raw mention count.

##### How to earn them honestly

Say yes to filmed conversations rather than audio-only ones. Send hosts a three-line bio and the exact title you'd like, since most will use what you send. Ask for captions and chapter markers — both are free and both are the difference between a video that's indexed text and a video that's an opaque blob. Where you're teaching anyway, ask whether it can be filmed and posted. And name your own frameworks out loud when you speak, in full, rather than referring to "the model" — the transcript only contains what you actually said.

#### What a "branded web mention" is

**The operational definition.** A page anywhere on the indexed web whose text contains your brand or name string — **linked or unlinked**. It's counted per page, not per link. Correlation with AI visibility: 0.664, against 0.218 for backlinks.

Ahrefs flags a caveat worth carrying: branded web mentions *include* youtube.com pages when the name appears in a video title, so the two leading variables are not independent. The clean reading isn't "YouTube wins"; it's that distributed, credible conversation about you wins, and YouTube is currently its strongest visible proxy.

##### A good one, concretely

> On a seminary's blog, in an article titled *Five Frameworks Shaping Church Planting in 2026*:
>
> "The most-adopted of these is APEST, Alan Hirsch's reading of Ephesians 4 as five irreducible ministry functions rather than a hierarchy of offices. Hirsch, who wrote *The Forgotten Ways* and co-founded Movement Leaders Collective, argues that most Western churches operate with only two of the five active."

What makes it strong: it is on someone else's indexed domain; it contains the canonical name; it puts the name *next to the concept* in the same sentence, which is the co-occurrence a language model actually learns from; it names the work and the affiliation, so the entity is resolvable; and it states a specific position rather than a compliment. Whether it links is almost beside the point.

##### An adequate one

> A conference programme page: "Session 4 — *Communitas and the Missional Church*, with Alan Hirsch (Movement Leaders Collective)."

Short, but it carries name + framework + affiliation on an indexed third-party page. Multiply by every conference, syllabus, and staff page you've ever appeared on, and this is the bulk of most people's mention volume.

##### A worthless one

> "Great thoughts from @alanhirsch here 🔥" on a platform that isn't indexed, or a directory listing with your name and nothing else, or a page where your name appears in a sidebar list of 200 authors.

No context, no co-occurrence with any concept, and often no crawl. Volume of these does not accumulate into anything.

#### The name-string problem

This is the part almost nobody handles, and it silently destroys mention volume.

Pick one canonical form of your name, one of your organization, and one of each framework you own. Put them in a press kit. Use them in every bio you send. Correct them when you see them wrong — a two-line email fixes a decade of a misspelled surname on a publisher page. If your name is shared with anyone else notable, this plus the `sameAs` array is the only thing that resolves the confusion.

The test: search your own name in quotes, and your name plus each framework. If you find three spellings, four organizational descriptions, and two ways of naming the same framework, you don't have one entity with 500 mentions. You have four entities with 125 each.

#### Rubric: is this mention worth anything?

Score any individual mention against six attributes. Four or more, it counts.

| Attribute | Why it matters |
|---|---|
| On an indexed third-party domain | Self-published mentions are the weakest kind |
| Uses your canonical name string exactly | String match; variants are different entities |
| Your name appears in the same sentence as a concept you own | Co-occurrence is the thing models learn |
| Names the work, role, or affiliation | Makes the entity resolvable |
| Written or spoken by someone who isn't you | Independence is the whole point |
| Contains enough prose to be extractable on its own | A name in a list can't be quoted |

#### The caveat that governs all of it

Every number in this section is correlational, from one vendor's index, with a confound its own authors name: strong brands accumulate mentions, links, authority, and AI visibility at the same time, and nothing establishes which causes which. Google states directly that seeking inauthentic mentions is less useful than it appears.

What the correlation is most plausibly measuring is **brand salience** — the degree to which a name is a known thing in a field. You cannot manufacture that. You can, however, stop wasting the salience you already have: by being filmed instead of only recorded, by getting your name into titles instead of episode numbers, by naming your frameworks out loud, and by spelling yourself the same way everywhere.

---

### PART FIVE — The network problem

**How an intentional EEAT network fails, and what stops it.**

Everything in Inventory C sits inside a structural fact: Movemental authors are commercially connected to each other through a platform, and are simultaneously being presented as independent voices whose mutual corroboration is evidence. Both halves of that are true and defensible. The tension between them is real, it is manageable, and it is not managed by intending well.

#### The thing that is actually being claimed

The network's argument is: *these are separately credible people whose work genuinely connects, and making that connection visible online is simply making the offline truth legible.* That argument is sound. It is also exactly the argument that every link scheme in history has made about itself, which means the argument alone proves nothing. What distinguishes the two is entirely observable — in the shape of the graph, the specificity of the links, and whether the relationship is disclosed.

So the governing question is never "is this legitimate?" It is: **would a hostile but fair reviewer, reading only what's on the pages, conclude this was arranged?**

#### Two tests that settle almost every case

**The counterfactual test.** *Would you make this link if search engines and AI systems did not exist?* If yes, make it. If the only reason is that you're both in the network, don't. This is the test to write into the editorial policy, because it's the one an editor can apply without understanding SEO.

**The daylight test.** *Could you explain this link, out loud, to a journalist writing a sceptical piece about AI-assisted platforms in the church?* If the explanation requires a paragraph about authority flow, it's the wrong link.

#### The footprint problem — and Movemental's is unusually large

Link-scheme detection doesn't look for links. It looks for **footprints**: properties shared across a set of sites that shouldn't be shared if the sites were independent. Any one is unremarkable. The set is a fingerprint.

Named honestly, here is Movemental's:

| Footprint | Why it exists | What to do about it |
|---|---|---|
| One codebase and design system across every tenant | It's the product | Unavoidable and fine on its own. But it means every *other* item on this list compounds rather than being isolated. |
| The platform chrome bar, identical, on every page of every node, linking the same place | Product decision | `rel="nofollow"`, brand-name anchor only, pointing at a disclosure page. Costs nothing; removes the strongest single argument against you. See the table below for which network links get qualified and which don't. |
| A peer-proof band above the fold on every homepage | Product decision | Make the *content* genuinely tenant-specific — real named edges, real endorsements, different people per node. A uniform band with the same names everywhere is a footer strip in a better position. |
| Shared nav vocabulary, route structure, and schema types | Product decision | Fine. Structural similarity between sites isn't the problem; identical *link patterns* are. |
| A shared glossary and citation registry | Deliberate, and correct | One canonical host. Every other node links rather than duplicates. Duplicated definitions across related domains is a content-network signal and a self-competition problem at once. |
| Possible shared hosting, registrar, DNS, and analytics IDs | Convenience | Not worth engineering around — but don't add secrecy either. Whois privacy across a set of cross-linked related sites reads worse than the plain truth. |
| Simultaneous launches | Operational | Stagger where you can. A cohort of sites appearing in the same week with reciprocal links is a pattern; the same sites appearing over eighteen months is a roster. |
| Shared AI-assisted production pipeline | The product's own thesis | The real risk here is stylistic convergence — five authors whose prose starts to sound like one system. That damages the distinctiveness the whole GEO argument rests on, quite apart from any spam question. Voice fidelity is a credibility control, not just an aesthetic one. |

#### Which network links get qualified, and which don't

"Movemental references on a leader platform" is six different link types, and treating them the same is the error. The direction, the scale, and whether it's automated all change the answer.

| Link | Scale | Verdict | Why |
|---|---|---|---|
| Leader site → movemental.ai, from the chrome bar | Site-wide, every page, every tenant, identical | **`rel="nofollow"`**, brand-name anchor, and point it at the leader's own disclosure page rather than straight out | This is the only genuine footprint item. Automated + site-wide + boilerplate + commercially related is the shape that gets discounted. |
| Leader site → the network map / Movement Voices index | Site-wide | **Same treatment**, and preferably fold it into the same single chrome link rather than adding a second | Two site-wide network links is twice the footprint for no additional signal. |
| Leader site → its own `/network` disclosure page | Site-wide, but internal | **Followed. Normal internal link.** | It's your own page. This is where the actual disclosure work happens. |
| movemental.ai → each leader's site, from Movement Voices | One page, curated, named | **Followed.** Do not nofollow this. | A publisher's author page linking its authors is a legitimate followed link, and this is the same object: one page, real people, stated relationship. Nofollowing it would understate something true. |
| Leader → leader editorial citation | Per-page, reasoned | **Followed. Always.** | No money sits behind an author deciding to cite an idea. Qualifying these would suppress the one signal the network exists to produce. |
| A leader writing about Movemental as a subject, or a case study naming it | Per-page, editorial | **Followed**, if they'd have written it anyway — plus a visible disclosure line in the piece | Editorial content about a commercial partner is fine when the relationship is stated in the piece. |

**On `sponsored` versus `nofollow`.** `sponsored` is defined for advertisements and paid placements. The chrome bar isn't an ad; it's platform attribution inside a commercial relationship. `nofollow` is the semantically accurate marking, and both have the same practical effect of not passing endorsement. Reserve `sponsored` for links where money actually changes hands *for that specific link*.

**What nofollowing does not cost you.** Nothing on the AI side. Semrush's 1,000-domain study found nofollow links correlate with AI mentions about as strongly as followed ones — consistent with the mechanism being the *mention*, not the link graph. You are giving up a small amount of classic PageRank flow on a link that was going to be discounted anyway, and buying the removal of the strongest argument against the whole network.

**And the rel attribute is the smallest part of this.** Four things matter more: that only *one* cross-network element is site-wide; that its anchor is a brand name rather than a keyword phrase; that a real disclosure page exists and is reachable; and that the peer-proof band above the fold contains genuinely different, real, named edges per tenant rather than the same roster everywhere. Get those four right and the `rel` value is a footnote. Get them wrong and no attribute saves it.

#### Evenness is the tell, not density

This is the most important and least intuitive point in the section.

Real intellectual networks are **lumpy**. Some people cite one person constantly and another never. Edges run one way for years. Two members who ought to have engaged each other simply haven't. There are hubs, and there are people at the edge.

An engineered network is **even**. Everyone links everyone, roughly the same number of times, with roughly the same anchors, from roughly the same page positions.

Which means a Network Map that flags "underconnected pairs as connection opportunities" is a tool that will, if followed obediently, drive the graph toward the exact shape you don't want. **The audit should flag both extremes** — nodes with no edges at all *and* pairs whose reciprocity is suspiciously perfect. If two authors have never engaged each other's work, the correct output is not a link; it's either a real collaboration or nothing.

Practical form: never add a cross-node link to close a gap on a dashboard. Add it because someone wrote something that used someone else's idea.

#### The independence arithmetic

Corroboration is only worth what the corroborating sources are independently worth. Five nodes vouching for each other, where four have no external footprint, is not five times the authority of one — it is one node's authority, plus four pages.

This has a hard consequence for onboarding: **the selection standard matters more than the node count.** A new voice with no independent publication record, no third-party mentions, and no external links doesn't dilute the network's average — they dilute its *evidence*, because a link to them is a link a reviewer can't verify. The right sequence is to help a new node build independent presence first (Inventory B, top ten items) and wire them into the network second.

The corollary: the network's value to any member is roughly proportional to how credible the *other* members are without it. Which is an argument for being slow and choosy, and it is the opposite of the growth incentive.

#### Disclosure is the whole defence

Every publisher group, university system, and professional association states its connections plainly, and nobody thinks worse of them for it. Stating yours converts a connection that looks arranged into one that looks ordinary — because it is.

What has to be on the record, in plain language, on a page anyone can reach:

- That the network exists, and who is in it.
- That Movemental owns and operates the platform these sites run on.
- What the commercial relationship is — that authors are participants under agreement, and in broad terms what that involves.
- That authors retain their own IP, own their own domains, and write under their own editorial judgment.
- Where AI assisted in production, at what level, and who ratified it.

Two rules follow. **Anything with money behind it gets qualified** — the platform chrome, any paid placement, any sponsored arrangement. **Editorial citation between authors does not**, because there's no payment behind an author deciding to cite an idea, and nofollowing genuine citations would understate a relationship that is real.

The failure mode to avoid is the one that's easy to fall into: disclosing in the participation agreement, which nobody outside reads, and nowhere on the public site.

#### Overclaiming is the other way this fails

Two sites and a footer is not a movement. The audience for this work is unusually good at spotting the gap between what's promised and what's on the shelf, and the gap costs more than the claim gains.

Describe what's actually true. Two colleagues whose work genuinely connects is interesting, verifiable, and enough. Let the description lag the reality rather than lead it.

#### Self-competition

A network of authors in one field will eventually have two people ranking for the same thing, at which point they are splitting a signal rather than compounding one. The discipline is **territory**: each node owns a distinct sub-subject and points to the others for theirs. Comprehensive and non-redundant is what a retrieval system wants to cite; two near-identical pillar pages on "missional church" is the opposite.

Worth auditing annually: which pillar terms are claimed by more than one node, and who cedes.

#### A ratio worth holding

Judgment rather than evidence, but a useful discipline: **keep network links to roughly a fifth of your outbound links.** The majority of what you link should go outside the network entirely — primary sources, academic work, publishers, and people who disagree with you. A site whose outbound graph points overwhelmingly at commercially related properties looks like what it looks like, however honest each individual link was.

The healthiest possible outbound profile for a network author is one where a reviewer counting links finds mostly Oxford University Press, JSTOR, denominational archives, and a couple of critics — with peers appearing where peers genuinely belong.

#### Governance that actually holds

Five mechanisms, in order of how much they're worth:

1. **A reason recorded per cross-node link.** One field: why this link exists. If nobody can fill it in, the link doesn't ship. This single control does more than the other four combined, because it makes the counterfactual test operational.
2. **An edge audit that flags evenness as well as sparseness.** Report reciprocity ratios. Investigate perfect ones.
3. **A public disclosure page**, linked from every node, kept current.
4. **An annual territory review** — who owns which pillar terms, and where two nodes have drifted into the same ground.
5. **A cap on site-wide cross-node elements.** Pick one. Currently that should be the platform chrome, qualified. Everything else cross-node should be editorial, per-page, and reasoned.

#### If it goes wrong

The realistic failure is not a manual action; it is a slow one. The site-wide reciprocal pattern gets discounted, the network links stop counting, and nothing visibly breaks — you simply stop getting the lift you built for. The tell is cross-node links appearing in your link profile while the corresponding pages show no ranking or citation movement over two quarters.

The recovery is the same as the prevention: strip the automated, uniform, site-wide edges; keep the editorial ones; disclose everything; and let the graph go lumpy again.

#### The short version

The network's advantage is that its connections are real, and that is the one thing a competitor building five sites cannot copy. Every shortcut on this list — the automated module, the reciprocal block, the gap-closing link, the undisclosed arrangement — trades that non-replicable asset for something anyone can fake. Manufacture a few and you have spent the only thing you had.

---

### PART SIX — The things that aren't links but decide whether links matter

Four gates. Each adds little when correct and caps everything above it when wrong.

**Crawlability for AI agents.** Confirm `robots.txt` permits `GPTBot`, `ClaudeBot`, `PerplexityBot`, `OAI-SearchBot`, `ChatGPT-User`, `Claude-User`, `PerplexityBot` and `Google-Extended` as your policy requires. Note that `Google-Extended` is a robots token with no user-agent string and controls Gemini grounding and training — **not** AI Overviews, which serve from the regular Googlebot index. You cannot appear in Google Search and opt out of AI Overviews this way. If you're on Vercel or Cloudflare, check whether a managed AI-bot ruleset is silently blocking them. Nothing breaks when you're blocked; you simply aren't there.

**Indexability.** A page must be indexed and snippet-eligible to appear in Google's generative features at all. `noindex` on the wrong template is the single most common silent catastrophe.

**One address.** Two live sites in your name compete with each other, split every link you've ever earned, and leave every system unsure which one is you. Pick one, 301 the other, permanently.

**Visible, honest dates.** Publication and last-updated dates, rendered for humans and in `datePublished`/`dateModified`. In controlled testing of document selection, staleness was one of the few attributes that ruled a document out almost regardless of quality. An undated page is treated as an old one.

---

### PART SEVEN — Build sequence

Linking is a graph, and a graph has a dependency order whether you respect it or not. A link needs three things that must already exist: a stable address to point at, a shared word for what you're pointing at, and a sound page on both ends.

**Phase 0 — Substrate.** Canonical URL and entity registry. Canonical taxonomy (one definition per term, one URL). Citation registry and `/footnotes`. JSON-LD layer. Author identity record with the full `sameAs` array. *Nothing here is a page a reader visits. Skip it and every link built later is decoration.*

**Phase 1 — One node, complete.** Header/footer chrome → homepage → pillars → clusters → long-tail → pathways → courses → about/author → newsletter archive → search. Build one leader's platform completely against the topology rules, then treat it as the template.

**Phase 2 — Integrity engine.** Encode the topology rules as an audit that runs on a schedule (pillar → all clusters; cluster → pillar + 2 lateral; long-tail → up; pathway → 3+; course week → 2+; newsletter → 1+). Add publish-time maintenance: citation registry updated, corpus index updated, retro-links added from related older pages.

**Phase 3 — Earned links, in effort order.** Start with the ones that are two-line emails and already true: publisher author page, faculty page, conference speaker pages, denominational directories, retail author profiles, Wikidata. Then the ones that require producing something: podcast circuit, guest essays, original data. Then the ones you can only be given: journalism, Wikipedia, academic citation.

**Phase 4 — The network layer** (requires ≥2 nodes; full power at ~5; governed by Inventory C and Part Five). Movement footer first — cheapest, highest signal. Then cross-node bylines on genuinely co-authored work. Then cross-citation on frameworks that are genuinely shared, five or six done honestly rather than fifty done mechanically. Then a shared glossary with one canonical source. Defer federated search, network maps and ontology editors until the network actually exists.

---

### PART EIGHT — Anchor text pattern library

Reusable, and the difference between a link that carries meaning and one that carries none.

| Situation | Pattern | Example |
|---|---|---|
| Internal, to a framework page | *{Framework name}* | the fivefold ministry |
| Internal, to an article | *{Article title, or its first clause}* | why communitas needs liminality |
| Internal, upward to a pillar | *{Pillar name}* | missional church practice |
| Internal, to a book | *{Italicised title}* | *The Forgotten Ways* |
| Internal, to a person | *{Full name}* | Brad Brisco |
| Internal, to a glossary term | *{The term itself}* | communitas |
| Outbound, to a source | *{Source title or study name}* | the 2024 KDD paper on generative engine optimization |
| Outbound, to a peer's work | *{Name}'s {work}* | Alan Hirsch's work on APEST |
| Inbound, requested from a publisher/institution | *{Full name}* or the bare domain | Alan Hirsch · alanhirsch.com |
| Inbound, requested in journalism | *{Full name}* in the introducing sentence | — |
| Inbound, in a roundup | *{Work title}* | *The Permanent Revolution* |

**Never:** click here · read more · this article · our website · a bare URL mid-sentence · a keyword phrase you're targeting, requested from a third party.

**The rule for requested anchors:** ask for your name or the work's title. Asking a journalist or a publisher for a keyword-optimized anchor is the exact pattern named in the spam policies, and it also tells the recipient you're working an angle.

---

### PART NINE — The machine-readable links

Four schema blocks do most of the work. These are links too — typed ones, which is why they're worth more per unit than an untyped `<a>`.

**Person — the entity resolution block.** On the about page, referenced by `@id` from every byline.

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://example.com/about#person",
  "name": "Full Name",
  "url": "https://example.com/about",
  "image": "https://example.com/img/portrait.jpg",
  "jobTitle": "…",
  "worksFor": { "@type": "Organization", "@id": "https://example.com/#org" },
  "knowsAbout": ["APEST", "missional ecclesiology", "movement dynamics"],
  "sameAs": [
    "https://en.wikipedia.org/wiki/…",
    "https://www.wikidata.org/wiki/Q…",
    "https://orcid.org/0000-…",
    "https://www.amazon.com/author/…",
    "https://www.goodreads.com/author/show/…",
    "https://www.linkedin.com/in/…",
    "https://www.youtube.com/@…",
    "https://publisher.com/authors/…"
  ]
}
```

**Article — the freshness and corroboration block.**

```json
{
  "@type": "Article",
  "headline": "…",
  "author": { "@id": "https://example.com/about#person" },
  "datePublished": "2026-03-04",
  "dateModified": "2026-08-01",
  "isPartOf": { "@type": "CreativeWorkSeries", "name": "Pillar name" },
  "citation": [
    { "@type": "ScholarlyArticle", "name": "…", "url": "https://doi.org/…" },
    { "@type": "Book", "name": "…", "isbn": "978…" }
  ],
  "mentions": [{ "@type": "Thing", "name": "APEST", "@id": "https://example.com/glossary/apest" }]
}
```

**Book** — `isbn`, `publisher`, `bookEdition`, `author` by `@id`. **Course** — `provider`, `hasCourseInstance`, `teaches`. **BreadcrumbList** on every page below the top level.

Three rules: keep it in the `<head>`; make sure it describes what's actually visible on the page; make `dateModified` truthful, because a `dateModified` that updates on every deploy is a lie that gets detected.

---

### PART TEN — The four outreach scripts that account for most of Inventory B

Almost all of the high-value earned links in Part Four are already true facts that nobody has bothered to record. These are the emails.

**To a publisher's marketing contact.**
> Subject: Website link on my author page
> Hi — could you update the website link on my author page to `https://example.com`? Same URL for the author byline on each of the book pages if those are separate. Thanks — {name}

**To a department administrator at an institution.**
> Subject: Faculty profile link
> Hi — my faculty profile lists my website as {old URL}. Could you change it to `https://example.com`? Also, if the profile lists my name as {variant}, {canonical form} is the version I use everywhere else. Thanks — {name}

**To a podcast host, sent before recording.**
> Bio for the show notes, three lines and the links you'll want:
> {Three-line bio containing full name, current role, one book title, one framework name.}
> Site: `https://example.com` · The piece I referenced: `https://example.com/exact/page`
> Happy to supply a cleaned transcript if you publish them.

**To a subject librarian.**
> Subject: Suggestion for the {topic} research guide
> Hi — I noticed your guide on {topic}. {Work} covers {specific gap}; the stable link is `https://example.com/…` and the ISBN is {…}. Entirely your call — thought it might be useful to students on that unit. — {name}

Note what all four have in common: the exact URL, the canonical name form, no requested anchor text, and no argument for why they should care about your SEO.

---

### PART ELEVEN — Measuring any of this

**Internal graph.** Screaming Frog or Sitebulb, run on a schedule. Four numbers: orphan count, average inbound internal links per pillar and cluster, click depth from home, and topology-rule violations. Those four are the whole internal dashboard.

**External graph.** Search Console's Links report for what Google actually counts. Ahrefs or Semrush for referring domains, new and lost. Track referring *domains*, not links.

**AI visibility.** Report every figure as a floor, never a count.
- Server logs or Cloudflare AI Crawl Control for crawler hits. The user-triggered agents (`ChatGPT-User`, `Claude-User`, `Perplexity-User`) fire when a real person is getting a real answer; those are the closest thing to a live citation signal available. Training crawlers tell you nothing about visibility.
- Referral traffic from `chatgpt.com`, `claude.ai`, `perplexity.ai`, `gemini.google.com` — as a custom channel group, not GA4's default "AI Assistant" grouping, which excludes AI Overviews and AI Mode entirely.
- Search Console's generative AI performance report: **impressions only**, no clicks, no queries, no position, AI Overviews and AI Mode merged.
- Manual prompt sampling if you must, at 40–50 prompts minimum per engine, 150+ for ChatGPT-class surfaces. Below that you are measuring noise.

**Mentions.** The metric the evidence says matters most is also the one nobody instruments. Track unlinked brand mentions and YouTube mentions alongside links, because if the correlational picture is even directionally right, that's the leading indicator.

---

### PART TWELVE — Honest limits of this document

**The scores are judgment calibrated against evidence, not measurement.** Two people reading the same sources could reasonably move most entries by ten points. The risk weighting in Inventory C is the most subjective number in the document — it is set deliberately heavy, because the asymmetry is real: a link that underperforms costs you an opportunity, and a link that reads as a scheme costs you the network's whole argument.

**The GEO evidence base is young and almost entirely correlational.** The single most-quoted number in it (mentions 0.664 vs. backlinks 0.218) comes with a confound its own authors name: strong brands accumulate mentions, links, authority and AI visibility at the same time, and the direction of causation is not established.

**Most of it is vendor research.** Ahrefs, Semrush, Muck Rack and Profound all sell tools that measure the thing their research says matters. That doesn't make the data wrong; it makes the framing interested.

**Citation behaviour is unstable.** ChatGPT's Reddit citation share moved from roughly 60% to roughly 10% inside a few weeks in September 2025, then partially recovered. Any tactic tuned to a single platform's current preferences has a short half-life.

**The stable core is small, and it is old.** Publish something worth citing. Say who wrote it and when. Cite your sources. Link the things you actually build on, with their real names. Make sure everything you own can be reached and everything about you resolves to one person. That set has survived every algorithm change of the last fifteen years and is the same set the GEO research keeps rediscovering.

---

### Source list

**Tier 1 — primary**
- Google, *Link best practices* — https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Google, *Spam policies* — https://developers.google.com/search/docs/essentials/spam-policies
- Google, *Qualify your outbound links* — https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
- Google, *Optimizing your website for generative AI features on Google Search* (updated 10 July 2026) — https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Google, *Search Essentials* — https://developers.google.com/search/docs/essentials
- Google, *Creating helpful, reliable, people-first content* — https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google, *Guidance on third-party SEO tools and advice* — https://developers.google.com/search/docs/fundamentals/third-party-seo
- Google, *Search Quality Rater Guidelines* (E-E-A-T)
- Bing Webmaster Guidelines · Schema.org · IndexNow

**Tier 2 — research**
- Aggarwal, Murahari, Rajpurohit, Kalyan, Narasimhan, Deshpande, *GEO: Generative Engine Optimization*, KDD 2024 — arXiv 2311.09735
- *Optimizing Visibility in Generative Engines: A Critical Survey (2023–2026)* — arXiv 2607.14035
- Pew Research Center, *Google users are less likely to click on links when an AI summary appears* (2025)

**Tier 3 — industry datasets**
- Ahrefs, *Top brand visibility factors in ChatGPT, AI Mode and AI Overviews* (75,000 brands; source of the YouTube-mention and branded-web-mention definitions used in Part Five) — https://ahrefs.com/blog/ai-brand-visibility-correlations/
- Ahrefs Academy, *Brand Radar — YouTube visibility* (how the YouTube index is built) — https://ahrefs.com/academy/how-to-use-brand-radar/youtube
- Ahrefs, *Search rankings and AI citations* (863k keywords, 4M AI Overview URLs) — https://ahrefs.com/blog/search-rankings-ai-citations
- Semrush, *Do Backlinks Still Matter in AI Search? Insights from 1,000 Domains* — https://www.semrush.com/blog/backlinks-ai-search-study
- Semrush, *The Most-Cited Domains in AI: A 3-Month Study* — https://www.semrush.com/blog/most-cited-domains-ai/
- Muck Rack, *What Is AI Reading?* (Generative Pulse, May 2026) — https://muckrack.com/blog/what-is-ai-reading-may-2026
- Search Engine Land, *Stop chasing Reddit and Wikipedia: what actually drives AI recommendations* — https://searchengineland.com/reddit-wikipedia-what-drives-ai-recommendations-472580
- Search Engine Journal, *Google AI Overview citations from top-ranking pages drop sharply* — https://www.searchenginejournal.com/google-ai-overview-citations-from-top-ranking-pages-drop-sharply/568637/
- Moz, *Beginner's Guide to SEO* · Backlinko ranking-factor studies · BrightEdge, SE Ranking, Evertune, Conductor, Profound citation tracking

**Tier 4 — practitioners worth reading**
Barry Schwartz (Search Engine Roundtable) · Aleyda Solís (#SEOFOMO) · Kevin Indig (Growth Memo) · Mike King (iPullRank) · Lily Ray · Glenn Gabe · Cyrus Shepard · Rand Fishkin (SparkToro)

---

*Compiled 14 August 2026. Figures cited are current as of that date; citation-share numbers in particular move fast and should be re-checked before being quoted anywhere external.*

---
