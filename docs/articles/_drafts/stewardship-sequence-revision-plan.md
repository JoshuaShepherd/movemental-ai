# Revision plan — internal deep-dive: “Movemental and the AI Stewardship Sequence”

**Target document (current location):** `docs/build/temp/movemental-ai-path-comprehensive-guide-draft.md`  
**Note:** The draft’s H1 matches the user’s search string; it still lives under `docs/build/temp/`, not under `docs/articles/`. Relocation to `docs/articles/movemental-ai-stewardship-sequence-deep-dive.md` can be a separate editorial decision after revision.

**Sources read for this plan:**

| Source | Path |
| ------ | ---- |
| Field guide | `docs/articles/ssss-field-guide-for-organizational-leaders.md` |
| Thesis | `docs/articles/the-movemental-thesis.md` |
| Solutions methodology | `docs/articles/solutions-deployment.md` |
| Dual intelligence (long) | `docs/articles/intelligence-fragmentation.md` |
| Dual intelligence (integration piece) | `docs/articles/two-intelligences-integration.md` |
| Path SSOT overview | `docs/markdown/SSOT/movemental-full-path/part-00-document-overview.md` |
| Path SSOT Part 1 (sector reality) | `docs/markdown/SSOT/movemental-full-path/part-01-reality-ai-organizations-2026.md` |
| Path SSOT Part 7 (Solutions) | `docs/markdown/SSOT/movemental-full-path/part-07-solutions-deployment.md` |
| Path SSOT Part 9 (tech foundation) | `docs/markdown/SSOT/movemental-full-path/part-09-movemental-technological-foundation.md` |
| Path SSOT Part 10 (pricing) | `docs/markdown/SSOT/movemental-full-path/part-10-consolidated-pricing.md` |
| Terminology / naming | `docs/content/terminology-registers.md` |
| Master talking points | `docs/build/notes/movemental-master-talking-points-index.md` |
| Verified research corpus | `docs/research/state-of-ai-2026/movemental-research-corpus-v1.md` |
| Sandbox traffic-light detail | `docs/markdown/SSOT/movemental-full-path/part-05-sandbox-discovery.md`, `docs/build/notes/safety-sandbox-and-audiences-content-inventory.md` |
| Skills module (adjudication exercise) | `docs/markdown/SSOT/movemental-full-path/part-06-skills-development.md` |
| Founder / origin narrative (public story) | `docs/articles/the-story-of-movemental.md` |
| Founder narrative (business doc) | `docs/business-docs/core-docs/09-founder-narrative.md` |
| Internal founder profile | `docs/movement_leader_research/josh-shepherd/summary.md` |

**Not found (user-requested):**

- `docs/build/movemental-context.md` — no file at this path; equivalents used above.

**Status:** This plan lists proposed edits only. **No changes have been applied** to the deep-dive draft yet (per workflow).

---

## Summary judgment

The draft’s bones align with the **AI Stewardship Sequence** field guide and thesis. Main gaps: (1) **naming** — “Movemental AI Path” vs **AI Stewardship Sequence** needs explicit distinction matching Part 00 + terminology; §5 heading currently blurs them. (2) **Church-sector statistics** — draft is directional; Path SSOT Part 1 still embeds **superseded** Exponential/Lifeway pairing that the **research corpus** marks for correction; internal audio should cite **corpus-verified** Barna/Pushpay + Lifeway numbers or carry a sharp caveat when pointing readers at Part 1. (3) **Solutions configurations / pricing** — reconcile Part 7 vs Part 9/10 (letter counts, Configuration B naming, dollar ranges). (4) **Deepening** — traffic-light taxonomy, “remove AI from the story” test, candid Skills/Solutions rarity, slop argument, corpus/graph shorthand, optional founding story — all sourced below. (5) **Five commitments** — user’s exact list not located verbatim in repo; closest documented “non‑negotiables” are **four** pillars in `the-story-of-movemental.md`; flag for user to confirm MSOW/network covenant source.

---

## Proposed changes by section

### Document metadata / header

**R1 — Location and audience**

| Field | Content |
| ----- | ------- |
| Section | Lines 3–7 (status / assembled from) |
| Draft currently says | “Draft for editorial revision — Markdown source intended for eventual PDF export”; assembled from canon + SSOT. |
| Source material says | Internal NotebookLM audio use implies **not** default public PDF framing; master index notes SITE-SSOT / live app as authority for **published** copy (`docs/build/notes/movemental-master-talking-points-index.md` “Authority” paragraph). |
| Proposed revision | Add an explicit **Internal use — NotebookLM / audio** line; keep PDF as optional export. Remove or soften “organizational leaders” as primary audience if this artifact is staff-only (or split: “primary listener: internal team; secondary: senior leaders”). |
| Change type | Sharpening |

**R2 — Path to canonical filename**

| Field | Content |
| ----- | ------- |
| Section | Header / appendix C |
| Draft currently says | Paths under `docs/build/temp/` only as output location. |
| Source material says | User workflow expects `docs/articles/…deep-dive.md` eventually. |
| Proposed revision | After approval, move or copy to `docs/articles/movemental-ai-stewardship-sequence-deep-dive.md` and leave temp as deprecated pointer **or** keep single canonical path per team convention (note in revision history). |
| Change type | Correction (housekeeping) |

---

### §1 Introduction: What Movemental is

**R3 — Grounded vs ungrounded (missing thesis adjacent to product)**

| Field | Content |
| ----- | ------- |
| Section | §1 after “plain-language promise” or new subsection |
| Draft currently says | Integrity + adoption; not primarily tools; enduring adoption sentence. |
| Source material says | Talking points §5: **“Ungrounded AI produces fluent approximation. Grounded AI retrieves over a real corpus and a real graph.”** (`docs/build/notes/movemental-master-talking-points-index.md` §5). |
| Proposed revision | Add 2–4 sentences naming **grounded vs ungrounded** as the bridge between “two intelligences” and why the Sequence order matters for technical deployment. |
| Change type | Deepening |

**R4 — Four artifact nodes (library / graph / voice / pathways)**

| Field | Content |
| ----- | ------- |
| Section | §1 or §3 |
| Draft currently says | Two intelligences only in §3; §1 does not name integration outputs. |
| Source material says | Talking points §4 table: **Library, Graph, Voice, Pathways** — what integration produces (`docs/build/notes/movemental-master-talking-points-index.md` §4). |
| Proposed revision | Brief cross-reference: informational ↔ library/voice; relational ↔ graph; pathways ↔ formation architecture. Keeps audio listeners oriented when later sections say “corpus.” |
| Change type | Deepening |

**R5 — “Why this exists” / founding arc (user-requested)**

| Field | Content |
| ----- | ------- |
| Section | New §1.x “Why Movemental exists” (after opening paragraph) |
| Draft currently says | No founding narrative; jumps to convictions. |
| Source material says | `docs/articles/the-story-of-movemental.md`: Mission House Network 2011–~2022, formation community, transition to digital/AI work, fragmentation of Alan/Brad’s corpus, infrastructure-not-website thesis, scenius. `docs/movement_leader_research/josh-shepherd/summary.md`: Mission House ~100 young adults; QuadW role. **Does not** say “Methodist pastor” verbatim — avoid that label unless user confirms denomination detail elsewhere. |
| Proposed revision | Add **short** internal candid version (90–120 seconds audio): community formation decade → communications/digital → Alan/Brad fragmentation as proof case → platform + Sequence as organizational counterpart to leader infrastructure. Cite no fabricated timeline detail beyond files above. |
| Change type | Deepening |

**R6 — Five commitments (user-listed vs repo)**

| Field | Content |
| ----- | ------- |
| Section | New subsection after §1 or before §4 |
| Draft currently says | Nothing about mutual commitments between movement leaders. |
| Source material says | `docs/articles/the-story-of-movemental.md` lines 59–69: **four** non‑negotiables (Formation over growth; Humans over hacks; Scenius over genius; Technology properly ordered) plus economics/transparency bullets — **not** the user’s exact five (“shared missional DNA, scenius over guru, mutual credibility, transparent and mature AI use, redemptive business”). Repo grep did **not** locate the user’s five-worded covenant as a single canonical block. |
| Proposed revision | **Option A:** Add the **four** from `the-story-of-movemental.md` with filename citation and note “network covenant language evolves.” **Option B:** User supplies MSOW / onboarding source path; insert verbatim. **Option C:** Omit until sourced; add `<!-- INTERNAL: verify five commitments source -->` comment. |
| Change type | Deepening / correction pending user input |

**R7 — Values doc cross-link (optional)**

| Field | Content |
| ----- | ------- |
| Section | Appendix C |
| Draft currently says | Article list only. |
| Source material says | `docs/business-docs/05_leadership_ops/movemental-ai-values-and-beliefs.md` referenced in founder research as ranked AI values. |
| Proposed revision | One-line pointer for internal readers who want the values stack behind Safety convictions. |
| Change type | Deepening |

---

### §2 The moment

**R8 — One-paragraph test (thesis diagnostic)**

| Field | Content |
| ----- | ------- |
| Section | §2.1 after tool sprawl |
| Draft currently says | Paragraph test appears only implicitly via thesis reference elsewhere. |
| Source material says | Thesis §Problem: “If a serious newcomer spent ninety minutes…” (`docs/articles/the-movemental-thesis.md`). Talking points §2.6 repeats (`docs/build/notes/movemental-master-talking-points-index.md`). |
| Proposed revision | Insert the **ninety-minute map** diagnostic verbatim or near-verbatim — high retention for audio. |
| Change type | Deepening |

**R9 — Five structural breaks (optional compression)**

| Field | Content |
| ----- | ------- |
| Section | §2.4 or new §2.5 |
| Draft currently says | Four cross-sector patterns only. |
| Source material says | Thesis lists five breaks: fragmentation, static content, signal collapse, invisible expertise, death of isolated asset (`docs/articles/the-movemental-thesis.md` §Problem). Talking points §2.5 warns not to use as lazy menu. |
| Proposed revision | Add one tight paragraph: “five doors, one pressure” with thesis wording; avoid bullet pile per talking-point caution. |
| Change type | Deepening |

**R10 — Church stats: directional vs corpus-verified**

| Field | Content |
| ----- | ------- |
| Section | §2.3 Churches paragraph |
| Draft currently says | Adoption jumped; governance lags; congregants forming opinions; voice cloning / impersonation in incident reporting. |
| Source material says | **Corpus** (`docs/research/state-of-ai-2026/movemental-research-corpus-v1.md` §1, §2.2.2, §4): Barna/Pushpay 2026 — **60%** church leaders use AI ≥ monthly; **33%** church uses AI in operations; **5%** established AI policy; Lifeway April 2026 release — **42%** pastors use AI for ministry (10% regular + 32% experimenting); **56%** non-users; FBI IC3 — AI-attributed fraud **$893M** 2025; voice cloning **400%+** jump (industry tracking cited); faith-sector deepfake incidents documented (OSV, incident DB). **Path SSOT Part 1** (`part-01-reality-ai-organizations-2026.md`) still cites **Exponential 91% / 9% policy / 25% scams** — corpus §10 marks **91% / 9% / 25% scams** as wrong or unverified. |
| Proposed revision | Replace directional church paragraph with **3–5 corpus-backed numbers** + parenthetical source names (internal doc is allowed to name studies). Add footnote: “Path SSOT Part 1 markdown reflects earlier survey mix; use **movemental-research-corpus-v1.md** for verified church figures until Part 1 is reconciled.” |
| Change type | Correction |

**R11 — Nonprofit stats: add verified cluster**

| Field | Content |
| ----- | ------- |
| Section | §2.3 Nonprofits |
| Draft currently says | Ubiquitous use; rare org capability improvement; individual use; fiduciary framing. |
| Source material says | Corpus §2.1.1: **92%** adoption, **7%** major capability improvement, **81%** individual without shared workflows, **47%** no governance — Virtuous/Fundraising.AI Feb 2026, n=346. |
| Proposed revision | Insert the numeric cluster once (audio-weighted). |
| Change type | Sharpening |

**R12 — Enterprise / pilot failure stat**

| Field | Content |
| ----- | ------- |
| Section | §2.3 or §3.4 |
| Draft currently says | “No durable learning loop” without citing NANDA. |
| Source material says | Corpus §1: MIT NANDA **95%** GenAI pilots no measurable business return; intelligence-fragmentation article cites same (`docs/articles/intelligence-fragmentation.md` §Part 4). |
| Proposed revision | One sentence tying fragmentation → pilot economics. |
| Change type | Deepening |

**R13 — Institutions paragraph**

| Field | Content |
| ----- | ------- |
| Section | §2.3 Institutions |
| Draft currently says | Students/faculty heavy AI use; uneven policy; silence propagates. |
| Source material says | Part 1 §Institutions + corpus §2.4 higher ed — draft is aligned; could add seminary policy examples named in Part 1 (Columbia, Saint Meinrad, etc.) as optional color. |
| Proposed revision | Optional one clause citing Part 1 examples; otherwise leave. |
| Change type | Optional deepening |

**R14 — Remove reliance on uncited “incident reporting” vagueness**

| Field | Content |
| ----- | ------- |
| Section | §2.3 Churches — voice cloning clause |
| Draft currently says | “entered real incident reporting” |
| Source material says | Corpus §4: FBI PSAs, IC3 annual, OSV/deepfake faith-sector reporting — verified. |
| Proposed revision | Tie to **FBI IC3 / documented faith-sector impersonation cases** per corpus wording; avoid sounding like uncited anecdote. |
| Change type | Correction |

---

### §3 Two intelligences / fragmentation

**R15 — Canon terms check**

| Field | Content |
| ----- | ------- |
| Section | §3.1–3.2 |
| Draft currently says | Informational intelligence; relational intelligence. |
| Source material says | Same terms in `intelligence-fragmentation.md`, `two-intelligences-integration.md`; talking points §2.3 shorthand **“corpus” / “graph.”** |
| Proposed revision | First mention keep full terms; add sentence: “Talking points sometimes shorthand **corpus** (informational) and **graph** (relational).” |
| Change type | Sharpening

**R16 — Integration sequence (four stages: integration → activation → formation → multiplication)**

| Field | Content |
| ----- | ------- |
| Section | §3.5 |
| Draft currently says | “multi-stage trajectory… integrated, activated, formation-centered, and ultimately multiplying” — accurate but not named as four sub-stages. |
| Source material says | `docs/articles/intelligence-fragmentation.md` §Part 3 names **Integration, Activation, Formation, Multiplication** for **each** intelligence. |
| Proposed revision | Explicitly name the four words so audio listeners map book arc to intelligence article. |
| Change type | Deepening |

**R17 — “Fragmentation is the problem AI made visible”**

| Field | Content |
| ----- | ------- |
| Section | §3.3 or §3.4 |
| Draft currently says | AI weaponizes fragmentation. |
| Source material says | Talking points §2.4: **“Fragmentation is the problem AI made visible. It is not the problem AI caused.”** |
| Proposed revision | Add exact clause — strengthens causal clarity for internal staff. |
| Change type | Sharpening |

**R18 — Deepening: AI mirrors / amplifies humans in the room (user-requested)**

| Field | Content |
| ----- | ------- |
| Section | New §3.6 or end of §3.4 |
| Draft currently says | Not stated. |
| Source material says | Not a single quoted paragraph in repo; **adjacent**: thesis integrity vs impact; talking points grounded AI requires **human-owned governance**; strategy doc `movement-leaders-as-ecosystem-layer.md` (not re-read in full this pass) governs network vs org distinction. |
| Proposed revision | Add candid internal principle: model output quality **tracks** who is authorized to judge, who owns voice, who sits in Sandbox — **strategic staffing is part of AI strategy**; network exists to put **high-trust humans** in adjacent orbit (align with talking points §6 audience doctrine — organizations primary; movement leaders ecosystem). Flag sentence-level review if doctrine doc constrains wording. |
| Change type | Deepening (editorial judgment — user review)

**R19 — Ten categories (informational)**

| Field | Content |
| ----- | ------- |
| Section | §3.1 |
| Draft currently says | Aggregated list (“not only publications…”) |
| Source material says | `intelligence-fragmentation.md` lists **ten** categories explicitly; draft collapses to summary. |
| Proposed revision | For internal depth: either brief parenthetical “see ten-category inventory in intelligence-fragmentation article” or enumerate in appendix bullet list (audio may prefer summary + pointer). |
| Change type | Deepening (optional)

---

### §4 Two frameworks

**R20 — AI Stewardship Sequence vs Movemental AI Path (user concern)**

| Field | Content |
| ----- | ------- |
| Section | §4.1 title; §5 title |
| Draft currently says | §4.1 “AI Stewardship Sequence”; §5 heading **“The Movemental AI Path in depth: Safety”** |
| Source material says | `terminology-registers.md`: public framework name **AI Stewardship Sequence**. `part-00-document-overview.md`: document title uses **Movemental AI Path** for Parts 5–8 (“remaining three stages of the Movemental AI Path”). Talking points §3.1: **Sequence** = on-ramp; §3.2: six-stage arc = road. |
| Proposed revision | (1) Rename §5 to **“The AI Stewardship Sequence in depth: Safety”** OR add clarifying sentence under §5: “‘Movemental AI Path’ is the **full SSOT document / commercial journey** name; the four ordered stages are the **AI Stewardship Sequence**.” (2) In §4.1, add 2 sentences mapping **Path** (PDF/SSOT bundle) vs **Sequence** (public stage names). |
| Change type | Correction

**R21 — Six-stage arc wording**

| Field | Content |
| ----- | ------- |
| Section | §4.2 |
| Draft currently says | Fragmentation → Integration → Activation → Formation → Multiplication → Movement |
| Source material says | Matches talking points §3.2 (`docs/build/notes/movemental-master-talking-points-index.md`). **terminology-registers.md** lists only **five** stage names under “Fragmentation / Integration…” — **omits “Movement”** — internal inconsistency in canon. |
| Proposed revision | Keep draft’s **six** stages; add footnote: “terminology-registers.md currently lists five stage labels — reconcile with six-stage arc (+ Movement) on next terminology edit.” No fabricated claim about “how Brad and Alan use it” — replace with: “Surfaced on `/fragmentation` and book-length narrative per talking points §3.2.” |
| Change type | Correction + sharpening

**R22 — Hybrid diagram warning**

| Field | Content |
| ----- | ------- |
| Section | §4.2 |
| Draft currently says | Rule for readers: Sequence for ops, arc for storytelling. |
| Source material says | Talking points §3.3: **do not** collapse into one master diagram. |
| Proposed revision | One explicit sentence: “Do not merge the four-stage and six-stage charts into a single ladder diagram — it obscures both.” |
| Change type | Deepening

**R23 — Stage display names vs SSOT product labels**

| Field | Content |
| ----- | ------- |
| Section | §4.1 |
| Draft currently says | Safety, Sandbox, Skills, Solutions |
| Source material says | SSOT uses **Sandbox Discovery**, **Skills Development**, **Solutions Deployment** as offering titles (`part-00-document-overview.md`); field guide uses plain stage names. |
| Proposed revision | Note: stage names are **Safety / Sandbox / Skills / Solutions**; facilitated offerings may read “Sandbox Discovery,” etc. |
| Change type | Sharpening

---

### §5 Safety

**R24 — Conviction layer wording**

| Field | Content |
| ----- | ------- |
| Section | §5.1 |
| Draft currently says | Convictions / first-principle lines |
| Source material says | Field guide mirrors thesis: convictions + governance + boundaries (`docs/articles/ssss-field-guide-for-organizational-leaders.md` §Stage 1). |
| Proposed revision | Align verb “sentences true enough to lose money over” from field guide — draft partially has this in advance criteria; pull into §5.1 for parity. |
| Change type | Sharpening

**R25 — Seven Safety artifacts (missing)**

| Field | Content |
| ----- | ------- |
| Section | §5 (new bullet or appendix) |
| Draft currently says | One-page governance sketch only |
| Source material says | Part 3 / productization: Safety stage produces **seven items** (Part 00 references “seven item toolkit”; cross-stage summary ~18–22 artifacts — `part-08-cross-stage-productization.md`). |
| Proposed revision | Internal deep-dive should name that Safety is **seven documented artifacts**, not merely “one page” — one page may be exec summary only. |
| Change type | Correction / deepening

---

### §6 Sandbox

**R26 — Red / yellow / green taxonomy (user-requested)**

| Field | Content |
| ----- | ------- |
| Section | §6 new subsection 6.6 or woven into 6.1 |
| Draft currently says | Hypotheses, boundaries — no traffic lights |
| Source material says | `part-05-sandbox-discovery.md` + inventory doc: **GREEN / YELLOW / RED** definitions for use cases; yellow requires documented revision path; red documented for future reference (`docs/build/notes/safety-sandbox-and-audiences-content-inventory.md` ~528). |
| Proposed revision | Add concise table: green = deployable / washing-machine class benefit; yellow = value + required revisions + timeline; red = harm regardless of guardrails or mission warp — **pull exact criteria from SSOT** (don’t paraphrase away nuance). |
| Change type | Deepening

**R27 — Sandbox deliverables trio**

| Field | Content |
| ----- | ------- |
| Section | §6 |
| Draft currently says | Shared artifacts — generic |
| Source material says | Part 5: **Use Case Portfolio**, **Discernment Memo**, **Readiness Assessment** (`part-05-sandbox-discovery.md`). |
| Proposed revision | Name the three deliverables explicitly. |
| Change type | Sharpening

**R28 — “Take AI out of the story” test (user-requested)**

| Field | Content |
| ----- | ------- |
| Section | §6 after Sandbox vs pilot |
| Draft currently says | Not present |
| Source material says | Not located verbatim in repo — **user working principle**. |
| Proposed revision | Add short paragraph: if removing AI leaves **no substantive human work**, the use case is suspect; if it leaves real judgment/authorship/stewardship tasks AI accelerated, it passes. Mark as **internal heuristic — ratify**. |
| Change type | Deepening (pending user ratification)

**R29 — Four-week rhythm**

| Field | Content |
| ----- | ------- |
| Section | §6 |
| Draft currently says | Weekly/biweekly generic |
| Source material says | Facilitated Sandbox described as **four-week** engagement in Part 5 / inventory doc |
| Proposed revision | When naming Movemental-facilitated Sandbox, say **four weeks**; self-led may differ — clarify. |
| Change type | Correction

---

### §7 Skills

**R30 — Level 4–5 maturity pointer**

| Field | Content |
| ----- | ------- |
| Section | §7.4 |
| Draft currently says | Median staff trip-wires |
| Source material says | Field guide references Level 4–5 judgment for Solutions-scale automation (`docs/articles/ssss-field-guide-for-organizational-leaders.md`); elaborated in `the-skill-of-ai` article (not re-read full file this pass — cite in appendix if expanded). |
| Proposed revision | One sentence + link to `docs/articles/the-skill-of-ai.md` for maturity ladder. |
| Change type | Deepening

**R31 — Green/yellow/red adjudication exercise**

| Field | Content |
| ----- | ------- |
| Section | §7 |
| Draft currently says | Three capacities only |
| Source material says | `part-06-skills-development.md`: practical exercise adjudicating green/yellow/red cases |
| Proposed revision | Cross-reference §6 traffic lights as Skills pedagogy spine. |
| Change type | Sharpening

**R32 — Deepening: most field orgs are not “in Skills” yet (user-requested)**

| Field | Content |
| ----- | ------- |
| Section | New §7.5 |
| Draft currently says | Skills criteria read as normative endpoint |
| Source material says | Corpus + thesis: governance gap universal; Part 10 posture — most churches Safety+Sandbox first; talking points: inversion is common failure |
| Proposed revision | Candid paragraph: **year-one honest posture** for many orgs is Safety + Sandbox repetition/refinement; Skills cohort **when** Sandbox proves sustained green/yellow portfolio and leadership commits; Solutions **rare** without upstream artifacts — state this as **field reality**, not lowering bar. |
| Change type | Deepening

---

### §8 Solutions

**R33 — Vendor conversation / procurement gate**

| Field | Content |
| ----- | ------- |
| Section | §8.3 or §8.7 |
| Draft currently says | Workflow thinking only |
| Source material says | `solutions-deployment.md` §“The vendor conversation becomes real”: data-tier map, no-go zones, legal instruments, sandbox graduation records (`docs/articles/solutions-deployment.md` lines 75–84). |
| Proposed revision | Add bullet strip mirroring article — this is missing vs canon. |
| Change type | Sharpening

**R34 — Configuration reconciliation (user concern)**

| Field | Content |
| ----- | ------- |
| Section | §8.6 |
| Draft currently says | Spectrum: Tool optimization, Composed application, Content & intelligence platform, Full platform tenant, Network/multi-node, Hybrid — notes numbering drift |
| Source material says | **Part 7** (`part-07-solutions-deployment.md`): Config **A–E** only; Config B labeled **“Custom agentic ecosystem”** $80k–150k; Config C content platform $60k–120k + licensing. **Part 9** (`part-09-movemental-technological-foundation.md`): Config **A–F**; B = **“Composed Application”** same price band as Part 7 B; C higher alignment with content platform; D/E/F naming; honest accounting paragraph. **Part 10** (`part-10-consolidated-pricing.md`): **A–F** with Config C **$80,000–$150,000**; Config A $30–50k; D $180–320k; E $350–650k+. |
| Proposed revision | Present **one** internal table: letters A–F, names from **Part 9/10**, price bands from **Part 10**, with note “Part 7 PDF extraction predates extension; use Part 10 for dollars.” Remove reliance on “Configuration A-class” informal label **or** map explicitly to **Configuration A — Tool Optimization**. |
| Change type | Correction

**R35 — Configuration B naming drift**

| Field | Content |
| ----- | ------- |
| Section | §8.6 bullet “Composed application” |
| Draft currently says | Composed application |
| Source material says | Part 7: “Custom agentic ecosystem”; Part 9: “Composed Application” |
| Proposed revision | Use **Composed Application** as canonical (Part 9/10); optional parenthetical “(focused custom web app on Movemental stack — not full platform).” |
| Change type | Correction

**R36 — Configuration C price**

| Field | Content |
| ----- | ------- |
| Section | §8.6 (if prices inserted) |
| Draft currently says | No prices |
| Source material says | Part 7 $60–120k; Part 10 $80–150k |
| Proposed revision | If adding internal pricing appendix, use **Part 10** only. |
| Change type | Correction

**R37 — Internal pricing appendix (user-requested)**

| Field | Content |
| ----- | ------- |
| Section | New appendix after D or §8.x |
| Draft currently says | Silent on dollars |
| Source material says | `part-10-consolidated-pricing.md` Ten-A: Safety AI-assisted **$1,997**, facilitated MVP **$5,000**; Sandbox facilitated **$15,000**; Skills cohort **$15,000**, LMS license **$4,800/yr**; Solutions scoping **$5,000**; Config A **$30–50k**; full path bundle Configuration A **$58,500** (not $50k flat). User’s sketch **$50,000 bundle / $1,000 Safety** does **not** match Part 10 — correct to SSOT. |
| Proposed revision | Add **“Internal pricing (May 2026 SSOT)”** table lifted from Part 10 Ten-A with file citation — audio listeners optional skip. |
| Change type | Correction + deepening

**R38 — Deepening: “slop” argument (user-requested)**

| Field | Content |
| ----- | ------- |
| Section | §8.1 or §8.2 |
| Draft currently says | Workflow vs tool; not “slop” |
| Source material says | Thesis + fragmentation: volume without coherence; generic sector voice — conceptually “slop” without using banned **marketing** adjectives — use **plain** words: **interchangeable fluent filler**, **sector-generic voice**, **statistical-center theology** |
| Proposed revision | Name: Solutions without Safety/Sandbox produces **fluent generic output** that sounds productive — internal blunt term “slop” acceptable **once** in internal doc per user — avoid public-site banned list elsewhere (`transform`, `leverage`, etc.). |
| Change type | Deepening (voice judgment — user review)

**R39 — MIT NANDA / value durability**

| Field | Content |
| ----- | ------- |
| Section | §8.1 |
| Draft currently says | Value durable across turnover |
| Source material says | solutions-deployment + thesis |
| Proposed revision | Tie explicitly: durability means **workflow + governance**, not **subscription persistence**. |
| Change type | Sharpening

**R40 — Model wave ~18 months**

| Field | Content |
| ----- | ------- |
| Section | §10 / §8 feedback |
| Draft currently says | Model upgrades mentioned lightly |
| Source material says | `solutions-deployment.md` ~every eighteen months (`docs/articles/solutions-deployment.md` line 107) |
| Proposed revision | One clause — aligns internal expectation setting. |
| Change type | Deepening

**R41 — §8.7 vs solutions-deployment architecture**

| Field | Content |
| ----- | ------- |
| Section | §8.7 |
| Draft currently says | Model / application / data / skill / governance layers |
| Source material says | Part 7 Seven-D names **Model, Application, Data, Skill, Governance** (`part-07-solutions-deployment.md`) — matches draft |
| Proposed revision | Add **explicit** sentence: vendor contracts encode Safety (from `solutions-deployment.md`); optional mention **deployment governance integration document** from Part 7 templates |
| Change type | Sharpening

---

### §9 Solutions vs dual fragmentation

**R42 — Voice-based intake claim verification**

| Field | Content |
| ----- | ------- |
| Section | §9.2 |
| Draft currently says | Voice-based intake extracts structured follow-ups from conversations |
| Source material says | Part 9 Nine-F describes capability in detail; Nine-G says capability **real and demonstrable** but full CRM integration deployment-specific (`part-09-movemental-technological-foundation.md`). |
| Proposed revision | Keep claim; add caveat: **Configuration D/E territory**; not implied for Config A tool optimization — avoids over-promising for all Solutions. |
| Change type | Correction

**R43 — Grounded retrieval wording**

| Field | Content |
| ----- | ------- |
| Section | §9.1 |
| Draft currently says | Retrieval-first posture |
| Source material says | Talking points §5 grounded AI definition |
| Proposed revision | Explicit “retrieve before generate / cite / checkable outputs” — aligns intelligence-fragmentation §Part 4 inverted failure modes |
| Change type | Sharpening

---

### §10 Feedback loop

**R44 — Align feedback bullets with solutions-deployment**

| Field | Content |
| ----- | ------- |
| Section | §10 |
| Draft currently says | Safety versions; Sandbox candidates; Skills updates |
| Source material says | `solutions-deployment.md` feedback loop enumerates near-identical list |
| Proposed revision | Near-verbatim parity — minor wording sync |
| Change type | Sharpening

---

### Appendix

**R45 — Source orientation — add corpus + CHARTER**

| Field | Content |
| ----- | ------- |
| Section | Appendix C |
| Draft currently says | Articles + SSOT Parts 1,7,9 |
| Source material says | `movemental-research-corpus-v1.md`; `docs/markdown/SSOT/movemental-full-path/CHARTER.md` for governance of SSOT edits |
| Proposed revision | List corpus as **verified stats** source; note Part 1 church numbers pending reconciliation |
| Change type | Correction

**R46 — terminology-registers drift flag**

| Field | Content |
| ----- | ------- |
| Section | Appendix or internal HTML comment |
| Draft currently says | — |
| Source material says | terminology six-stage inconsistency (R21) |
| Proposed revision | Internal note for comms team |
| Change type | Meta

**R47 — PDF production notes**

| Field | Content |
| ----- | ------- |
| Section | Appendix D |
| Draft currently says | Diagrams |
| Source material says | Talking points §3.3 no hybrid diagram |
| Proposed revision | Explicitly **forbid** merging four+six stage ladders on one slide figure |
| Change type | Sharpening

**R48 — Prose skill repetitions (optional)**

| Field | Content |
| ----- | ------- |
| Section | Global |
| Draft currently says | Multiple “load-bearing,” “staircase,” etc. |
| Source material says | `terminology-registers.md` flagged repetitions |
| Proposed revision | For audio: vary second occurrences per skill guidance — internal doc still benefits from reduced tic frequency |
| Change type | Sharpening (optional)

---

### Post-approval workflow items (do not execute until user signs plan)

**W1** — Apply edits to deep-dive file per approved subset of R1–R48  
**W2** — Archive prior version to `docs/articles/_archive/movemental-ai-stewardship-sequence-deep-dive-pre-revision-YYYY-MM-DD.md` (copy from current `docs/build/temp/…` if still there)  
**W3** — Add revision history footer + `<!-- INTERNAL REVIEW NOTES -->` per user spec  
**W4** — Read `docs/build/strategy/movement-leaders-as-ecosystem-layer.md` before finalizing R18 wording (not loaded in this planning pass)

---

## Count

**48** proposed revision records (R1–R48) + 4 workflow items (W1–W4).

---

*Plan produced by Cursor agent — no prose edits applied to the deep-dive draft yet.*
