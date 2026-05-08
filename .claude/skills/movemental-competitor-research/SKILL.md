---
name: movemental-competitor-research
description: >
  Produce a standardized competitive intelligence profile for any company that
  competes (directly, adjacently, or potentially) with Movemental's AI-native
  vertical SaaS for churches, nonprofits, and missional institutions. Covers
  ChMS / giving incumbents (Pushpay, Subsplash, Tithe.ly, Planning Center,
  Realm/ACS, Breeze), nonprofit-CRM platforms (Bloomerang, Virtuous, Salesforce
  Nonprofit Cloud, Blackbaud), faith-aligned strategy firms (Slingshot,
  Auxano, Unstuck, Generis), Big-4 nonprofit practices (Deloitte, Accenture,
  KPMG, PwC), and emerging venture-backed AI-for-nonprofits startups. Output
  is one citation-rich markdown profile per competitor saved to
  docs/research/competitors/{slug}.md, plus optional synthesis docs (_summary,
  _competitive-positioning, _index).
user-invocable: true
allowed-tools: Read, Write, Edit, Bash, Grep, Glob, WebSearch, WebFetch
---

Run a competitive intelligence pass on: $ARGUMENTS

`$ARGUMENTS` should include:
- The competitor name (required), e.g. `"Pushpay"`
- Optionally the slug for the output file: `--slug pushpay`
- Optionally a category guess: `--category chms` (one of `chms`, `nonprofit-crm`, `consultancy`, `big-4`, `ai-startup`)
- Optionally `--depth deep|standard|light` (defaults to `standard`)
- Empty input — ask the user which competitor to profile

## When to use this skill

Use this skill any time someone asks for:
- A profile or "tell me about" answer for a specific competitor in Movemental's category
- A refresh of stale competitive intelligence in `docs/research/competitors/`
- A new entrant scan ("are there any new AI-for-nonprofits startups?")
- Synthesis docs (`_summary.md`, `_competitive-positioning.md`, `_index.md`) over the existing profile set

Do **not** use this skill for:
- Customer/prospect research (that's a different motion — affiliations and stakeholders)
- Author or thought-leader profiles (use `affiliation-scrape`)
- Internal team or org research

## Movemental context the skill encodes

Every profile is written from this stance — keep it consistent across files:

- **Movemental** is an AI-native vertical SaaS for churches, nonprofits, and missional institutions
- **Founders**: Brad Brisco (CEO; NAMB Send Network leadership), Alan Hirsch (Co-founder / Chief Missiologist), Joshua Shepherd (CTO / Founder)
- **Four-stage path** (always reference these stage names verbatim when mapping overlap):
  1. **Safety Documentation** — $2,500 — AI policy, theological guardrails, board-ready governance
  2. **Sandbox Discovery** — $15,000 — guided experimentation environment with curated agents
  3. **Skills Development** — $15,000 cohort + $5,000/yr LMS — staff capability building
  4. **Solutions Deployment** — from $30,000 — bespoke agent + workflow build
- **Path Bundle** — $50,000 (all four stages)
- **Structural advantages to keep visible** in every profile: theological depth, multi-tenant agent architecture, warm-network distribution via Hirsch + Brisco, named refusals (what Movemental explicitly will not do), AI-native (not retrofit), missional formation lens
- **Customer segments**: church (typically <2,000 attendance to multi-site), nonprofit (donor-funded missional orgs), institution (denominations, seminaries, large faith-aligned NGOs)

## Categorization

Every profile must place the competitor in exactly one of these buckets, or flag as `uncategorizable / new-category`:

| Slug | Bucket | Examples |
|------|--------|----------|
| `chms` | ChMS / giving-platform incumbents | Pushpay, Subsplash, Tithe.ly, Planning Center, Realm/ACS, Breeze |
| `nonprofit-crm` | Nonprofit CRM / fundraising platforms | Bloomerang, Virtuous, Salesforce Nonprofit Cloud, Blackbaud |
| `consultancy` | Faith-aligned strategy / consulting firms | Slingshot Group, Auxano, The Unstuck Group, Generis |
| `big-4` | Big-4 + global consulting nonprofit practices | Deloitte, Accenture, KPMG, PwC |
| `ai-startup` | Venture-backed AI-for-nonprofits / AI-for-churches startups | Gloo, Pastors.ai, etc. (TBD via discovery) |
| `ai-consultant` | Independent or boutique AI-for-nonprofits consultancies | Faith-aligned solo practitioners, regional nonprofit support orgs |

Most ChMS players are not in Movemental's category *today* but could enter — say so explicitly in the profile rather than implying current direct competition.

## Research methodology

### 1. Source priority

Prioritize sources in this order. Recency matters — the AI-for-mission category is moving fast, so prefer 2025–2026 sources unless capturing structural facts (founding year, etc.).

1. **Company's own site** (about, leadership, pricing, customers, press)
2. **SEC / Companies House / public filings** (for public or formerly public companies, e.g. Pushpay)
3. **Funding databases reported in press**: Crunchbase, PitchBook references in news, official PR
4. **Trade press**: TechCrunch, Forbes, Christianity Today, MinistryTech, Nonprofit Times, Chronicle of Philanthropy
5. **G2 / Capterra / Software Advice** for product positioning and pricing tiers (treat with skepticism — vendor-influenced)
6. **LinkedIn** for headcount and leadership (treat headcount as an estimate)
7. **Wikipedia** as a starting point only — never the sole source for a factual claim

### 2. Required search queries

Run at minimum these searches per competitor (substitute `{name}`):

1. `"{name}" headquarters founded leadership`
2. `"{name}" funding round investors valuation` (or `"{name}" acquired by`)
3. `"{name}" pricing plans` and `"{name}" cost per month`
4. `"{name}" AI features` and `"{name}" artificial intelligence 2025` and `"{name}" generative AI`
5. `"{name}" customers case studies churches OR nonprofits`
6. `"{name}" competitors alternatives`
7. `"{name}" layoffs OR restructuring OR earnings 2025` (signals strain or momentum)

Capture 6–10 distinct source URLs per profile. Each factual claim in the profile must have a citation.

### 3. Depth modes

- **`deep`** — Tier 1 / closest competitive surface. 10+ sources. Read pricing pages, blog AI announcements, leadership bios, recent earnings or funding press. Time budget: 25–40 minutes.
- **`standard`** — Tier 2 / Tier 3 / Tier 4. 6–8 sources. Hit the seven required queries. Time budget: 12–20 minutes.
- **`light`** — Discovery passes, Big-4 practices that are not direct competitors. 4–6 sources. Confirm presence/absence in category and move on.

### 4. Honesty gates (apply before saving)

- Mark every estimated number with the prefix `Estimated:` and explain the basis.
- Mark every claim that is "implied but not confirmed" with `Implied:`.
- If you cannot find a source for a claim within reasonable effort, **omit the claim** rather than guessing.
- Do not paraphrase marketing language as fact (e.g. "industry-leading" → drop or rephrase as "company describes itself as…").
- Avoid consultant-speak: do not use the words *leverage, synergy, transform, innovative, disrupt, world-class, best-in-class, cutting-edge, paradigm, unlock, journey* (as a noun for a process).

## Output format — single competitor profile

Save to `docs/research/competitors/{slug}.md`. Use this exact template:

```markdown
---
name: {Company Name}
slug: {slug}
category: {chms | nonprofit-crm | consultancy | big-4 | ai-startup | ai-consultant | uncategorizable}
last_researched_date: {YYYY-MM-DD}
threat_today: {low | medium | high}
threat_year_2: {low | medium | high}
threat_year_5: {low | medium | high}
sources_count: {n}
---

# {Company Name}

## 1. Current state

- **Headquarters**: {city, country}  [^1]
- **Founded**: {year}  [^2]
- **Leadership**: {names + titles}  [^3]
- **Employees**: {number or estimate with basis}  [^4]
- **Funding history**: {seed → A → B → IPO / acquisition, with dates and amounts}  [^5]
- **Current valuation / market cap**: {public number or marked Estimated with basis}  [^6]
- **Public/private status**: {public ticker | private | subsidiary of X | PE-owned}

One paragraph (3–5 sentences) of plain-language context: what the company is, who they serve today, and where they are in their lifecycle.

## 2. Category

**{Category}** — {one-sentence justification, naming whether they are in Movemental's direct category today, an adjacent category, or a category that could converge.}

## 3. Product offerings

| Offering | Description | Price | Customer segment | GTM motion |
|----------|-------------|-------|------------------|------------|
| {…} | {…} | {…} | {…} | {…} |

Notes on the GTM motion: how do they sell? Inside sales / field sales / self-serve / channel partners / denominational deals / RFPs?

## 4. Overlap with Movemental's four stages

| Movemental stage | Competitor offering | Overlap level |
|------------------|---------------------|---------------|
| Safety Documentation ($2,500) | {what they offer here, or "nothing"} | {analogous / adjacent / none} |
| Sandbox Discovery ($15,000) | {…} | {…} |
| Skills Development ($15k cohort + $5k/yr LMS) | {…} | {…} |
| Solutions Deployment (from $30,000) | {…} | {…} |

One paragraph summarizing where overlap is real today versus where it's hypothetical.

## 5. Structural advantages and disadvantages versus Movemental

**They have that Movemental does not:**
- {bullet}
- {bullet}
- {bullet}

**Movemental has that they do not:**
- {bullet — explicitly cite theological depth / multi-tenant architecture / warm-network distribution / named refusals / AI-native posture / missional formation lens where each applies}
- {bullet}
- {bullet}

## 6. Threat assessment

| Timeframe | Level | Reasoning |
|-----------|-------|-----------|
| Today (2026) | {low/medium/high} | {1–2 sentences} |
| Year 2 (2027) | {low/medium/high} | {1–2 sentences — what would have to be true for them to escalate} |
| Year 5 (2030) | {low/medium/high} | {1–2 sentences — structural trajectory} |

## 7. Recommended Movemental positioning response

Two paragraphs: first paragraph is the **one-sentence elevator differentiator** plus support; second paragraph is **how to handle this competitor when it shows up in a sales conversation** — what to concede, what to own, what to redirect to.

## Sources

[^1]: [Title](URL) — accessed YYYY-MM-DD
[^2]: [Title](URL) — accessed YYYY-MM-DD
…
```

Every footnote must include URL **and** accessed date. If a profile lacks citations, reject it and re-run.

## Output format — synthesis docs

After at least Tiers 1–3 are complete, generate three synthesis files in the same directory:

### `_summary.md`

Single page with:
- Header table: category counts (chms: N, nonprofit-crm: N, etc.)
- Most-threatening competitor today / year 2 / year 5 (one each, with one-line reasoning)
- Three structural advantages Movemental holds across the entire landscape
- Three structural risks the landscape presents
- Recommended landscape positioning language for investor conversations (1 paragraph)
- Recommended landscape positioning language for customer conversations (1 paragraph)

### `_competitive-positioning.md`

- "Who are your competitors?" answer for investors (3–4 paragraphs, written as if spoken)
- "Why us instead of them?" answer for customers — three sub-sections (church, nonprofit, institution), each 2–3 paragraphs
- Specific positioning against the top 3 most-threatening competitors (one ~150-word block per competitor)

### `_index.md`

Just an index of all profiles. Format as a single markdown table:

| Slug | Name | Category | Threat today | Threat year 2 | Threat year 5 | Last researched |
|------|------|----------|--------------|---------------|---------------|-----------------|

Sorted by category, then by slug.

## Tier 5 discovery sub-procedure

When invoked with no specific company but instructed to "find emerging AI-for-nonprofits startups," run this discovery pass:

1. WebSearch each of:
   - `"AI nonprofit startup" funding 2025`
   - `"AI for churches" startup`
   - `"ChatGPT for nonprofits"`
   - `"AI compliance nonprofits"`
   - `Gloo AI` (a known faith-tech player worth checking)
   - `"vertical SaaS" nonprofit AI funding`
   - `"Y Combinator" nonprofit AI 2025`
   - `Pastors.ai OR Sermon.ai OR Faith.ai`
2. From each result page, extract: company name, year founded, funding (if any), what they sell.
3. Filter to companies with **$1M+ funding OR visible commercial traction** (paying customers cited, partnerships with major denominations, public revenue figures).
4. For each surfacing company, run the full skill on it.
5. **If no qualifying companies are found, write a discovery note** to `docs/research/competitors/_tier-5-discovery-{YYYY-MM-DD}.md` documenting:
   - All search queries used
   - All companies considered and why each was rejected (no funding, dormant, abandoned)
   - The negative-result conclusion: "as of {date}, no venture-backed AI-for-nonprofits competitor in this category meets the threshold"

A negative result is a useful artifact — do not skip writing it.

## Anti-patterns

- **Do not** copy marketing claims verbatim. ("Pushpay is a leading mobile-first giving platform" → write "Pushpay sells a mobile-first giving and ChMS platform.")
- **Do not** speculate about private financials beyond reported figures. If a 2021 round implied a valuation, say so explicitly.
- **Do not** call the four Movemental stages by other names — always Safety Documentation, Sandbox Discovery, Skills Development, Solutions Deployment.
- **Do not** position every competitor as a high threat. Most ChMS players are *low* threat today and only *medium* by year 5 if they aggressively re-platform onto AI-native infrastructure.
- **Do not** write profiles longer than ~600 words plus citations. Density beats prose.
- **Do not** use the words listed in the honesty gates section.

## Verification before saving

Before writing each profile, check:
- [ ] All seven sections are filled
- [ ] All bracketed placeholders are replaced
- [ ] At least 6 citations (for `standard` depth) with URL + accessed date
- [ ] Threat levels assigned for all three timeframes with reasoning
- [ ] Movemental's four stages named verbatim in section 4
- [ ] No banned words from the honesty gates list

## Related skills

- `affiliation-scrape` — author/leader affiliation research (different surface)
- `ai-model-research` — AI model competitive landscape (different domain)
