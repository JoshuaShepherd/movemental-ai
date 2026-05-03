# Raw research: Bounded networks, platform economics, and “100 leaders” (Prompt 07)

**Date:** 2026-04-12  
**Prompt:** `docs/build/research/prompts/07-bounded-networks-platform-economics.md`  
**Skills applied:** academic-research (OpenAlex + desk), author-research (trace + secondary sources), poll-opinion-research (creator-economy angle light — not primary for this prompt)

---

## 1. Argument index trace — **ID corrections vs prompt 07**

The prompt’s **argument ID → claim** mapping does not match the consolidated Custom GPT messaging files. Use this table for future prompts and audits.

| Prompt 07 cites | Actual block in repo | What it really is |
|-----------------|----------------------|-------------------|
| `research-033` = “Network effects don’t materialize” | **`id: research-033`** in `messaging-02-pain-positioning-selling.md` | **Social-to-email conversion** (70–80% “left on table”) — **not** the network-effects risk. |
| Network risk “Network Effects Don’t Materialize” | **`id: business-072`** in `messaging-04-strategy.md` | Correct risk card; sources `19-multi-tenant-network-expansion.md`. |
| `research-034` = “Quality decline as network expands” | **`id: research-034`** in `messaging-03-features.md` | **YouTube / video centralization** feature — **not** the quality-at-scale risk. |
| Quality-at-scale risk | **`id: business-073`** in `messaging-04-strategy.md` | Correct risk card. |
| `research-049` = “18% women” | **`id: research-049`** in `messaging-03-features.md` | **Assessment-based onboarding** — **not** gender stats. |
| 18% women (146 scored candidates) | **`id: research-040`** in `messaging-02-pain-positioning-selling.md` | Correct for diversity gap. |
| `research-050` = TAM “50,000 engaged leaders…” | **`id: research-050`** in `messaging-06-proof.md` | **Hirsch network density** (co-authors, orgs) — **not** TAM. |
| TAM “50,000 engaged leaders, millions more…” | **`id: research-003`** in `messaging-07-business-audience-ai.md` | Correct TAM-style claim. |
| `business-088` = word-of-mouth acquisition | **`id: business-088`** in `messaging-04-strategy.md` | **“Metrics and Signals: What Success Actually Looks Like”** — **not** acquisition. |
| Word-of-mouth / embedded acquisition | **`id: research-021`** in `messaging-07-business-audience-ai.md` | Correct; sources founder notes. |

**Verified positioning / selling / argument blocks (prompt got these right):**

- **`C-POS06`** — Cap at 100 movement leaders; founder notes + `19-multi-tenant-network-expansion.md`.
- **`C-A10`** — Scarcity / curation / scenius at bounded scale; same business doc.
- **`C-SP04`** — 28×–500× amplification + five “multiplier effects”; founder / business copy — **treat as internal model**, not third-party measured metric.

---

## 2. Internal strategy tension (important for honesty)

`docs/business-docs/core-docs/19-multi-tenant-network-expansion.md` describes **phase-based** expansion including **“Scale Phase: 1,000+ users”** and **“Maturation Phase: 500–1,000 users”**, while **`C-POS06`** insists on an **explicit 100-leader cap** at maturity.

**Interpretation for research:** Either (a) the 100 cap supersedes the older phase table, (b) “users” ≠ “movement leaders” (tenants vs end readers — clarify publicly), or (c) documents are out of sync. **Public messaging should resolve this** before critics do.

---

## 3. Network effects theory — bibliography & concepts

### 3.1 Definitions

- **Direct network effect:** Value to user *n* rises with count of users (e.g. fax machine, telephone).
- **Indirect (two-sided) network effect:** More suppliers attract more demand and vice versa (platform economics).
- **Data / learning effects:** Quality improves with scale (weaker at *n* = 100 unless shared ML across tenants — product-dependent).

**Andrew Chen — *The Cold Start Problem* (2021)**  
Trade book (a16z). Core idea: networked products face a **cold start**, then **tipping point**, **escape velocity**, **ceiling**, **moat** (per publisher summaries). Emphasizes **atomic networks** — dense subgraphs that work *before* the whole market is on board.  
Pointers: https://www.coldstart.com/ , a16z book page https://a16z.com/books/the-cold-start-problem  

**Geoffrey G. Parker, Marshall W. Van Alstyne, Sangeet Paul Choudary — *Platform Revolution* (2016)**  
Canonical business framing: pipelines vs platforms, governance, pricing on multi-sided markets. Useful for **why** a cap changes **governance** and **quality externalities**, not for proving a numeric “28×” law.

**Elinor Ostrom — *Governing the Commons* (1990)**  
OpenAlex retrieval (2026-04-12): work titled **“Governing the Commons”**, **1990**, **cited_by_count ≈ 18,463** (OpenAlex). Design principles for **bounded** commons: clear boundaries, rules matched to local context, monitoring, graduated sanctions, conflict resolution, minimal recognition of rights to organize, nested enterprises. **Strong analogue** for “curated cohort + rules” positioning — **not** proof that a SaaS cap equals a fishery, but a serious intellectual cousin.

### 3.2 “Minimum viable network size”

Platform literature rarely gives a **universal integer**. Critical mass is **market- and interaction-dependent**:

- For **two-sided marketplaces** (Uber, Airbnb), liquidity in each geography matters more than global *N*.
- For **B2B creator alliances**, value may peak at **moderate *N*** if value = trust × diversity × manageable coordination costs (inverse-U or plateau).

**Implication for Movemental:** Defend **100** with **coordination / trust / reputation** theory (Ostrom + Dunbar-shaped arguments), not with Metcalfe’s-law hand-waving unless you publish the model.

---

## 4. Dunbar’s number & group size

**Robin Dunbar** — social brain hypothesis; commonly summarized as **~150** stable relationships (often rounded from **~148** in original regression). Wikipedia and British Academy / Conversation pieces summarize **95% CI ~100–230** for “mean group size” in the classic framing.

**Recent debate:** A 2021 reanalysis (“‘Dunbar’s number’ deconstructed,” *PMC8103230* — browser fetch blocked by reCAPTCHA this session) reportedly argues smaller numbers with wide CIs; Dunbar’s replies (e.g. *The Conversation*, 2022) stress distinguishing **layers** of acquaintances vs intimate ties.

**How 100 compares:** **100 is below the popular 150 anchor** — plausible for “we can actually know each other” if “each other” means **leader-to-leader** ties, not every reader. It sits **inside** the wide anthropological CI if one treats 150 as fuzzy.

**Mark Granovetter — *The Strength of Weak Ties* (1973)**  
Bounded, high-trust networks risk **insularity** and **redundant information**. Healthy ecosystems need **bridge ties** to outside clusters. **Design implication:** intentional bridges (churches, seminaries, majority-world partners, guest fellows) should be explicit in the bounded-network story.

---

## 5. Bounded / curated platform case studies (desk)

| Example | Approx. scale / model | Relevance |
|---------|----------------------|-----------|
| **MasterClass** | **100+ to 200+** celebrity classes (third-party stats vary); **B2C subscription** bundles all instructors; heavy **production** spend. | Shows **bounded instructor set + subscription** can scale revenue **because subscribers are millions**, not because instructors are hundreds. Economics ≠ Movemental 1:1. |
| **YPO / EO-type forums** | Small **forum** groups (~8–12) inside larger membership | **Trust + confidentiality** at small scale; **brand** from exclusivity. |
| **Soho House, early Facebook, The Wing** | Invite / prestige | **Prestige + exclusion** can work; **Wing**-style failures show **governance and inclusion** risks when “curation” reads as **discrimination**. |
| **Cohort-based courses (CBC)** | 20–200 learners per cohort | **Community effects** (shared schedule, identity) often dominate **network effects** in strict sense. |

---

## 6. Economics of 100 leaders × 10% take (illustrative)

Let **G** = aggregate annual **gross merchandise / billings** through Movemental rails across all leaders.

**Platform share (10%)** = `0.10 × G`.

Example bands (toy model — not forecasts):

| Avg GMV per leader / year | 100 leaders → G | 10% to platform |
|---------------------------|-----------------|-----------------|
| $25,000 | $2.5M | $250k |
| $50,000 | $5M | $500k |
| $100,000 | $10M | $1M |
| $200,000 | $20M | $2M |

**Breakeven** depends on **fully loaded cost** (engineering, support, AI inference, payments, legal, sales). Internal financial docs (`movemental_valuation_report.md`, etc.) may assume different average GMV — **reconcile** with cap narrative.

**Pareto at *N* = 100:** Power laws can still apply: a handful of leaders may carry most GMV; tail may be near-zero. **Implication:** platform sustainability may hinge on **top decile** performance — same as creator economy at large.

---

## 7. Network effects vs **community effects** (terminology)

What Movemental describes mixes:

1. **SEO / discovery “gravity”** from many related sites (logistics of crawl + topical authority) — **partially** scales with count of **indexed, interlinked** properties; can saturate.
2. **Cross-leader discovery** (reader of A finds B) — **small-N** can still work if graphs are dense among **high-trust** nodes.
3. **Scenius / peer accountability** — **community / club good**, often **anti-correlated** with open-scale anonymous platforms.

**Recommendation:** In external copy, prefer **“community effects + shared infrastructure + discovery synergies”** unless you have **auditable** measurement for “28×–500×.”

---

## 8. Failure modes for bounded networks

- **Insularity & echo chambers** — weak ties missing (Granovetter).
- **Prestige cartel** — curation becomes **gatekeeping** protecting incumbents.
- **Stagnation** — no renewal pipeline; **succession** not designed.
- **Concentration risk** — if top 5 leave, perceived value collapses.
- **Demographic skew** — `research-040` (18% women in scored sample) undermines “movement” breadth if unaddressed; invite-only models historically **amplify** homophily unless rubrics correct it.

**Mitigations (from Ostrom-flavored design):** transparent criteria, rotation, external advisors, published diversity goals, “bridge leader” roles, periodic open cohorts or public goods (free content) to maintain weak ties.

---

## 9. Gender / representation (`research-040`, not `research-049`)

**Claim:** Women are **18%** of **146** scored movement-leader candidates — gender gap in visibility and network (`messaging-02`, `research-040`).

**Research note:** Tie to literature on **homophily**, **tokenism**, and **legitimacy** of elite networks (organizational sociology). No additional primary survey run in this session — use internal scoring methodology doc if publishing externally.

---

## 10. Source index

| # | Source | URL or path | Notes |
|---|--------|-------------|-------|
| 1 | OpenAlex — Ostrom | API query `search=Elinor Ostrom commons governance` | Retrieved *Governing the Commons* metadata + citation count |
| 2 | Andrew Chen / Cold Start | https://www.coldstart.com/ , https://a16z.com/books/the-cold-start-problem | Book-level concepts |
| 3 | Dunbar — popular summary | https://en.wikipedia.org/wiki/Dunbar%27s_number | Entry point; cite primary lit for serious work |
| 4 | Dunbar — The Conversation 2022 | https://www.theconversation.com/dunbars-number-why-my-theory-that-humans-can-only-maintain-150-friendships-has-withstood-30-years-of-scrutiny-160676 | Defense / nuance |
| 5 | Internal — network expansion | `docs/business-docs/core-docs/19-multi-tenant-network-expansion.md` | Phase table vs 100-cap tension |
| 6 | Internal — messaging | `docs/arguments/custom-gpt/messaging-01-arguments.md` (C-A10), `messaging-02` (C-POS06, research-033/040), `messaging-03` (research-034/049), `messaging-04` (business-072/073/088), `messaging-06` (research-050), `messaging-07` (research-003, research-021) | ID trace |
| 7 | MasterClass stats (secondary) | Various blogs (SignHouse, Skillademia, etc.) | **Triangulate** before citing revenue/instructor counts in investor materials |

**Not completed:** Semantic Scholar (prior session: rate limit 429); PMC8103230 full text (reCAPTCHA).

---

## 11. Suggested fixes to prompt 07 (for maintainers)

Replace argument line with:

`C-POS06`, `C-A10`, `business-072`, `business-073`, `C-SP04`, `research-003`, `research-021`, `research-040` (gender); optionally keep `research-050` **only** if repurposed to mean “network density proof,” not TAM.
