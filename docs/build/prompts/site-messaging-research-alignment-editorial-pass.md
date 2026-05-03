# Site messaging — research alignment editorial pass

**Purpose:** Run this prompt when you want to bring Movemental’s **public messaging** (marketing site, metadata, decks that mirror site copy, and any “proof” surfaces linked from the site) into **alignment with the internal research synthesis** under `docs/build/research/`, **without** flattening narrative, voice, or strategic coherence.

**Primary inputs (read in this order):**

1. `docs/build/research/articles/00-what-we-already-know.md` — inventory of what is settled vs fragile; epistemic modes; cross-prompt dependencies.
2. `docs/build/research/articles/16-convergence-thesis.md` — how to speak about “convergence,” kairos vs prediction, publisher/fee claims, four-forces bundling.
3. `docs/build/research/articles/01-ai-credibility-crisis.md` — which AI/trust statistics are defensible vs must be retired or re-scoped.
4. `docs/build/research/articles/12-competitive-landscape.md` — honest vs overstated competitor and “proof” comparisons.
5. **As needed for the pages you touch:** `06-formation-vs-information.md`, `07-bounded-networks.md`, `09-trust-verification.md`, `03-publishing-economics.md` (articles under `docs/build/research/articles/`), plus the matching `raw/` dossiers when a claim needs a footnote trail.

**Non-goals:** Do not use this pass to redesign the Stitch visual system, rewrite legal pages for counsel, or change product scope—only **claims, comparisons, forecasts, and implied evidentiary status** of language.

---

## 1. North star

Movemental’s brand promise is **not** “we have perfect data.” It is closer to: **we understand why trust signals broke, and we are building conditions where relational verification and coherent infrastructure can matter again.**  

The editorial task is to make every sentence **honest about what kind of claim it is** (measurement, analogy, design intent, scenario, conviction) so persuasion **gains** power from epistemic clarity instead of borrowing it from the strongest paragraph on the page.

---

## 2. Claim typology (apply to every load-bearing sentence)

When auditing copy, tag each claim as one of:

| Type | Rule for public copy |
|------|----------------------|
| **Sourced-and-stable** | May appear as fact; must carry **named source + date + scope** (population, geography, method) the first time it appears on a surface, or link to an on-site “Sources” / evidence subsection. |
| **Sourced-but-secondary** | Industry blogs, detector studies—allowed as **directional** with explicit detector/limit caveats; never as universal law. |
| **Plausible narrative** | Strong sense-making (history, economics, theology); keep **out of proof-tier** boxes; avoid numeric precision. |
| **Explicitly speculative** | Product futures, “at 100” field reports, convergence-as-kairos—must read as **scenario / invitation**, not forecast or peer-reviewed “convergence theory.” |

**Hard rule (from article 16):** Do not say **“four forces converge”** (or equivalent) without signaling **which sense** you mean: (a) empirical co-movement, (b) **integrated product design for a defined leader profile**, or (c) a **kairos** reading. Do not let one sense borrow credibility from another in the same breath.

---

## 3. Research-backed corrections — apply everywhere they appear

These are **cross-cutting** edits suggested by the research corpus. Implement them site-wide (hero, body, `/evidence`, `/vision`, services, methodology, pricing, platform story, footers, metadata, and any duplicated strings in components).

### 3.1 AI, trust, and “credibility crisis” language

- **Retire or verify** the **“68%”** (or any unsourced “users cannot tell human from AI”) family of statistics until a primary citation exists. Prefer **Pew (U.S. adults, 2025): 76%** say telling human vs AI apart matters; **53%** not too / not at all confident they can—**with link and date**, and clarify **self-efficacy**, not a lab discrimination task.  
- **Retire “40–60% of blogs are AI-generated”** unless tied to a **specific** report’s definitions. Prefer **Ahrefs Apr 2025** style framing (**new English pages, one per domain, detector-based**) with an explicit **detector caveat**, *or* separate **workflow adoption** statistics from **prevalence** statistics.  
- Treat **“credibility collapse”** as **coinage**: define **inputs collapsing / verification lag / epistemic externalities** in plain language, or soften to **renegotiation of trust signals**. Do not imply a single named sociological law.  
- **Nuance human detection:** It is fair to say **most people should not bet their epistemology on unaided vibe checks** as models improve; it is unfair to imply **nobody** can detect synthetic work or that **all channels** are already lost. Pair alarm with **where human-led discovery still wins top slots** (per SEO sampling discussed in article 01).  
- **Forecasts** (“by 2028 nearly impossible without network verification,” etc.): label as **projection**, not literature finding; pair with **what would falsify** the claim.

### 3.2 Publishing economics and platform fees

- When discussing **trade publishing splits**, prefer **royalty vocabulary** (author’s low double-digit **royalty on print list**; ebooks often **percent of net**) and clarify **what the remainder funds** (retail, returns, printing, marketing, advance risk). Avoid phrasing that sounds like **“the publisher pockets 85–90% as profit.”**  
- **Do not repeat** the **“Substack keeps 85–90%”** style claim as **cash rake** unless reconciled with **official fee docs** (article 16). The **defensible** critique is **structural dependency**: payments, discovery, mobile IAP stack, roadmap risk, habit inside the app—not **“you don’t own your list.”** Substack and Patreon document **subscriber export (CSV)**; the honest wedge is **platform dependency and graph portability limits**, not false legal ownership.  
- **Hybrid publishing** (e.g. Greenleaf-class timelines) is a **real comparator**: if Movemental contrasts **speed**, specify **time-to-ship digital surface** vs **full trade production + retail sell-in** unless you truly deliver the latter.  
- **Ghost, Kajabi, Teachable, Mighty Networks, Beehiiv, Kit:** acknowledge **who wins on flat SaaS, zero take-rate tiers, or ship speed**; Movemental wins on **integrated movement stack + governance + custom graph** when that is actually true—**not** by pretending competitors lack export or margin plays the buyer can read on their pricing page.

### 3.3 “Network effects,” bounded scale, and scenius

- **Bridge** Silicon Valley “network effects” language to **bounded curation** explicitly: prefer **depth over raw reach**, **Ostrom-style commons governance**, **Chen-style dense subgraphs first**, or **“community effects + shared infrastructure + discovery externalities”** over implying **Metcalfe’s law to billions**.  
- **Dunbar / ~100:** usable as **knowability among peer leaders**, not as proof of **commercial** compounding or SEO gravity.  
- **Scenius:** narrow claims to **movement-leader publishing stacks** that optimized for **solo scale and feed performance** rather than **mutual, cross-checkable esteem at human scale**—not “the internet ignored scenius.”  
- **Resolve internal consistency** for any copy that mixes **“100 movement leaders”** with **hundreds / 1000+ users** or “network effects optimization” **without defining terms** (article 07). Either **differentiate leader cap from end-user scale** or align numbers to a single canonical story.  
- **Gender / diversity:** if leadership representation numbers appear, treat them as **risk and accountability** language, not bragging; align IDs and claims with article 07 / prompt 19 research—**do not** mis-cite internal argument IDs.

### 3.4 Convergence, embodiment, movement history

- On first **strong** use of **“convergence,”** add a **plain gloss** (e.g. **four pressures tightening together for high-responsibility leaders**) and avoid sounding like **Jenkins’ *Convergence Culture*** or **Castells** unless you mean those literatures.  
- **Historical analogies** (Reformation, early church, etc.): keep as **interpretive scaffolding**, not **monocausal tech myths**; avoid “Gutenberg caused the Reformation” compression.  
- **Embodiment:** keep as **design principle and product test** (“does this crowd out local practice?”), not as proof that all four forces are one empirical shock.

### 3.5 Formation and learning claims

- **Formation ≠ information** is **conceptually sound**; do not imply a **single peer-reviewed scale** validates the **Four Necessities** or **eight-week** loop as *optimal*. Prefer **coherent with transformative-learning ingredients** + **testable**.  
- **Do not** use **youth mental health / screen-time** statistics as a stand-in for **LLM** formation claims (authoritative-sources discipline from article 00).  
- **Cohort vs self-paced:** if you claim cohort superiority, **earn** it with facilitation, obligation, and measurement—not completion rates alone.

### 3.6 Technical “proof” and evidence pages

- **Reconcile or remove** inconsistent **table/schema counts** (e.g. 105+ vs 168+); tie any public number to **this repo’s** `schema` / migration reality **or** clarify **which codebase** the count refers to (article 12).  
- **Remove or downgrade** **“60% faster than industry standard”**-class claims unless tied to a **published methodology** (URLs, tool, percentile, competitor set). Until then, treat as **internal marketing**, not `/evidence`.  
- **“One developer in six months”** (or similar): pair with **continuity, bus factor, documentation, and support**—or expect sophisticated buyers to read risk.  
- Prefer buyer-meaningful metrics (**uptime, export guarantees, support SLAs, time-to-first-value, security model**) over **complexity theater**.  
- **Venture studio / aligned incentives:** use **“studio-style build + operate”** or **revenue share with transparent caps** unless cap table reality matches **Atomic-style** studios (article 12).  
- On `/evidence` (and similar): soften **absolute** superiority claims (“no equivalent in the comparison set,” “ahead of the field”) unless you publish a **dated comparison matrix** or rephrase as **hypothesis + what would disprove it**. “Unusual depth” is stronger when **scoped** (integrated formation + AI + multi-tenant product in one codebase) rather than **unbounded**.

### 3.7 Network visualization and social proof

- Align with **scenius visualization ethics** from article 00: only **actually onboarded** peers appear as **in the network today**; others as **seats / placeholders**—never blur marketing into **misrepresented graph density**.

### 3.8 Assessments, movement statistics, pricing

- **APEST / assessment usage counts** (e.g. large “number of people assessed” claims): **verify or qualify** before proof-tier; see articles tied to prompts **17** and **14**.  
- **Church-planting / movement growth** statistics: only after prompt **14** style verification; avoid unsourced multiples.  
- **Pricing ($1K + 10%, etc.)**: align competitive framing with articles **03** and **20**—total cost of ownership vs **Beehiiv + Webflow + Circle**-class stacks, not only take-rate.

---

## 4. Execution workflow for the agent or editor

1. **Inventory** all URLs and components under `src/app/(site)/`, shared marketing components under `src/components/marketing/`, and `src/components/nav/` strings that state facts, comparisons, or forecasts. Include **metadata** `title` / `description`.  
2. **Build a claim ledger** (spreadsheet or table in the deliverable): quote, location, **claim type** (§2), **research verdict** (verify / rephrase / remove / label speculative), **suggested replacement** (draft text).  
3. **Triage:**  
   - **P0 — legal/reputational risk:** false ownership/export claims, wrong fee tables, unsubstantiated statistics presented as fact.  
   - **P1 — expert reader triggers:** publisher profit caricature, Metcalfe language without bounded bridge, proof-tier without methodology.  
   - **P2 — polish:** glossary footnotes, link-out to sources, tone tightening.  
4. **Revise in place** following `docs/design/DESIGN.md` tokens and voice (semantic color, no raw hex; light-primary; Inter; no engagement bait). Preserve **narrative rhythm**: replace hollowing with **sharper, narrower** truths.  
5. **Add a lightweight “How we talk about evidence”** pattern where useful: one short paragraph on the site or in `/methodology` that states Movemental **labels** forecast vs data—**models the epistemic virtues** the research recommends.

---

## 5. Deliverables

Produce a **single markdown report** (suggested path: `docs/build/_outputs/site-messaging-research-alignment-<date>.md`) containing:

1. **Executive summary** — five to ten bullets of the highest-impact alignment moves.  
2. **Claim ledger** — full table (§4).  
3. **Page-by-page recommendations** — file path + before/after snippets for P0/P1.  
4. **Optional glossary** — convergence, credibility collapse, network effects (bounded sense), formation vs information—for reuse across pages.  
5. **Open questions** — items that require **counsel**, **live pricing verification**, or **new primary research** before publication.

---

## 6. Success criteria

The pass succeeds when:

- No **known-bad** statistics or fee comparisons remain in **proof-tier** or **factual** voice.  
- **Competitive** claims are **segmented** (who you beat on which axis) and **generous** enough that a savvy buyer still feels respected.  
- **Vision** pages read as **scenario + design coupling**, not **physics of history** or undisclosed forecasts.  
- The through-line remains: **coherent system for formation-weighted leaders**, **bounded trust graph**, **integrated product**—now **anchored** in the same intellectual honesty the research series models.

---

## 7. Closing constraint

**Do not** “win” an argument with a sharper lie. The research corpus is explicit: Movemental’s **conceptual spine** is strong; the **footnote layer** was the weak link. This editorial pass exists so public language **earns the right to repeat the thesis**—with numbers, comparisons, and futures that survive **hostile readers** and still support **coherent, persuasive, on-brand** storytelling.
