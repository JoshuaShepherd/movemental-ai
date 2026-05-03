# Strategy — where major artifacts live and how they flow together

**Created:** 2026-04-17  
**Updated:** 2026-04-17  
**Purpose:** A single placement map for six product and content surfaces so agents and editors keep **one narrative spine**, clear **ownership per thesis**, and honest **proof posture** (see also [`home-page-narrative-credibility-ia-plan.md`](./home-page-narrative-credibility-ia-plan.md), [`00-site-content-architecture-nav-master-prompt.md`](./00-site-content-architecture-nav-master-prompt.md)).

**Non-negotiable vocabulary:** Six stages (`fragmentation` → `movement`), **informational** vs **relational** intelligence, **field** (scatter → coherence). Do not fork these definitions in marketing without updating the canonical surfaces below.

**Book vs AI Stewardship Sequence field guide (lock — two works):**

1. **Book** — `BOOK_HUB_PATH` (`/book`) and `/book/read/*` — the living manuscript *From Fragmentation to Movement*: two intelligences, fragmentation tax, six-stage map, integration as load-bearing. **This is not the AI Stewardship Sequence.**
2. **AI Stewardship Sequence field guide** — `SSSS_FIELD_GUIDE_PATH` (`/articles/ssss-field-guide-for-organizational-leaders`) — the AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions — the **operating path** for adopting AI under constraint. **Separate URL, separate artifact;** it **links to** the book for the longer thesis arc.
3. **Two intelligences** — deepest formal treatment in **book Chapter 2** (`/book/read/two-intelligences`); elsewhere **one sentence + link**.

Each canonical surface **cross-links once** to the other where readers need orientation; neither page re-owns the other’s full argument.

---

## 1. One-line map (visitor journey)

| Phase | Visitor state | Primary surfaces |
| ----- | -------------- | ----------------- |
| Orient | Curious, skeptical | `/` (compressed argument), **`/about`** (why Movemental exists — light orientation, not deep proof) |
| Learn the model | Wants the full map | `/fragmentation` |
| Read the thesis | Wants portable, chaptered depth | **`/book`**, `/book/read/[slug]` (book only) |
| Operate under constraint | Wants the four-step adoption path | **`/articles/ssss-field-guide-for-organizational-leaders`** (the AI Stewardship Sequence field guide) |
| Diagnose self | Wants “where am I weak?” | `/assess`, `/assessment-new` (when canonical), `/assess/formation` |
| See it work | Wants product behavior | `/walkthrough`, `/platform`, `/system`, `/how-it-works` |
| Trust claims | Wants receipts, not vibes | `/evidence`, `/case-studies`, **articles** with inspectable claims, book chapters |
| Act | Ready to talk or apply | `/contact`, `/apply`, `/inquiry`, system-builds CTAs |

Artifacts below are slotted into this journey — not treated as isolated “content types.”

---

## 2. Canonical ownership rules

1. **`/book`** (and `/book/read/*`) owns the **sustained thesis** — the only place the full fragmentation → movement argument may unfold chapter by chapter.  
2. **`SSSS_FIELD_GUIDE_PATH`** owns the **AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions** — do not fold this ordered path into `BOOK_SPINE` unless there is an explicit editorial decision to merge manuscripts.  
3. **Chapter 2 (two intelligences)** owns the **deepest formal definition** of informational vs relational intelligence; everywhere else **summarizes and links** here.  
4. **`/fragmentation`** owns the **six-stage experiential / animated public narrative** — the canonical *walkthrough* of the model.  
5. **`/assess`** = **operational system readiness** only; **`/assessment-new`** = **dual-intelligence × stage × infra-channel diagnosis** only — **never** merge UI, scoring, payloads, or lead semantics without an **explicit in-repo product decision**.  
6. **`/evidence`** owns **inspectable support** for stronger comparative and architectural claims; marketing pages **point** here or soften claims.  
7. **`/articles`** are **authority / discovery** surfaces (search, social, LLM citation) that **extend** the thesis — **same vocabulary** as `/book` and `/fragmentation`; **no** forked argot or generic “blog” voice.  
8. **Movemental AI** must **not outrun** architecture, corpus boundaries, or governance; demos stay **labeled** and illustrative. **No duplicate “chapter zero”** — no artifact re-opens the full argument from zero except **`/book`** (thesis), **`/fragmentation`** (staged narrative), or **`/`** (compressed front door only); everything else **enters mid-arc** and **links**.

---

## 3. Book vs AI Stewardship Sequence field guide (placement)

### What we mean

- **Book** — *From Fragmentation to Movement* at **`/book`**: thesis, chapters, export.  
- **AI Stewardship Sequence field guide** — compiled article at **`SSSS_FIELD_GUIDE_PATH`**: the AI Stewardship Sequence — Safety, Sandbox, Skills, Solutions — as a four-step adoption path; links **to** the book for the arc it compresses.

### Canonical placement

| Surface | Role |
| ------- | ---- |
| **`/book`** | Book hub — hero, spine, export/subscribe; links to the **AI Stewardship Sequence field guide** once for the operating path. |
| **`/book/read/[slug]`** | Chapter reader; order from `BOOK_SPINE` / `book-types.ts`. |
| **`SSSS_FIELD_GUIDE_PATH`** | Field guide hub — the AI Stewardship Sequence in full; links **to** `/book` for two intelligences / six stages. |
| **Home `/`** | **Paired CTAs**: “Read the book” → `/book`; “Read the field guide” → `SSSS_FIELD_GUIDE_PATH` (see `BookSection` + home body links). |
| **`/fragmentation` outro** | **Both** links: book + the AI Stewardship Sequence field guide + contact (see `fragmentation-story-outro-cta`). |
| **`/about`** | Pointers to fragmentation story, **book**, **AI Stewardship Sequence field guide**, FAQ, articles — not a second thesis home. |

### Factoring into strategy

- **Strategy job — book:** Credibility + **thesis transfer** (fragmentation, two intelligences, six stages, integration).  
- **Strategy job — AI Stewardship Sequence field guide:** **Operating discipline** (Safety, Sandbox, Skills, Solutions) for teams adopting AI without skipping trust.  
- **Flow rule:** “**Book**” / “**read the book**” → **`/book`**. “**AI Stewardship Sequence**” / “four steps” / “Safety … Solutions” → **`/articles/ssss-field-guide-for-organizational-leaders`**. Do not use “field guide” as a fuzzy synonym for both; prefer explicit labels.  
- **Cross-link rule:** Each primary surface links to the other **once** where readers need orientation.

---

## 4. Two Intelligences Book

### What we mean

The **two intelligences** thesis is **Chapter 2** of the fragmentation book (`docs/book-development/fragmentation-manuscript-ordered/02-two-intelligences.md`) and the **conceptual spine** for product copy (informational vs relational infrastructure). “The book” in engineering terms is the whole spine; “two intelligences” is **one load-bearing chapter** and a **repeatable frame** across the site.

### Canonical placement

| Surface | Role |
| ------- | ---- |
| **`/book/read/...`** | **Authoritative definitions**, categories, asymmetry by audience — long-form home of the idea. |
| **`/fragmentation`** | **Applies** the frame inside the six-stage walkthrough (especially early stages + formation seam). |
| **`/` problem / system bands** | **Names** the pair briefly; **does not** replace Ch. 2 — links out. |
| **`/assessment-new` (dual-intelligence diagnostic)** | **Operationalizes** the pair + stages + infra channels (when shipped per [`assessment-dual-intelligence-infrastructure-from-assessment-new.md`](./assessment-dual-intelligence-infrastructure-from-assessment-new.md)). |
| **`/platform`, `/system`, `/how-it-works`, `/evidence`** | **Product and argument** language must stay consistent with Ch. 2 — no third unnamed “intelligence,” no collapsing relational into “community features” without naming the tradeoff. |

### Factoring into strategy

- **Strategy job:** Two intelligences = **diagnostic lens** — explains *why* scattered content + thin relationship graphs fail together.
- **Flow rule:** Marketing pages may **summarize** in one paragraph; **deep definition** lives in the book reader. Assessments **score**; they do not re-teach the whole chapter unless you add an explicit “primer” step with a link to Ch. 2.
- **Cross-link discipline:** When `/evidence` or an article compares approaches, **tag** claims as informational vs relational implications so the reader can map them back to the book.

---

## 5. Assessment (Infrastructure)

We run **two complementary families**; strategy is to keep both **named** and **non-overlapping** in visitor mental models.

**Hard constraint — do not blur:** **`/assess` and `/assessment-new` must remain semantically distinct products.** Do not merge them in **UI labels**, **scoring logic**, **results copy**, **API payloads**, or **lead-handling / CRM language** unless leadership has issued an **explicit product strategy change** documented in-repo. One instrument measures **operational readiness**; the other measures **dual-intelligence infrastructure against the six-stage arc**. Treating them as interchangeable destroys analytics validity and visitor trust.

### 5.1 System Readiness Diagnostic — `/assess`

- **Optimizes for:** Operational readiness (knowledge, SSOT, ops, leadership, AI readiness, visibility, formation structure, fundraising) — see `src/lib/system-readiness/questions.ts` in repo.
- **Visitor moment:** “We might buy/build something — how broken are our foundations operationally?”
- **Flow position:** **Mid-funnel, commercial** — after they believe the problem exists, before or alongside **Discovery Lab** / system-builds interest.
- **Outputs:** Lead capture + structured signal for sales/conversation; not the six-stage philosophy instrument.

### 5.2 Dual-intelligence (infrastructure) assessment — `/assessment-new` (path as implemented)

- **Optimizes for:** **Paired intelligences × six stages × infra channels** (book Ch. 2, 11–12, 15 alignment per [`assessment-dual-intelligence-infrastructure-from-assessment-new.md`](./assessment-dual-intelligence-infrastructure-from-assessment-new.md)).
- **Visitor moment:** “I understand fragmentation / two intelligences — **where is our bottleneck?**”
- **Flow position:** **After** `/fragmentation` or Ch. 2 primer — **philosophy-first diagnostic**. Strong pairing: query params on `/fragmentation` (`audience`, `field`) mirrored in assessment context picker when implemented.

### 5.3 Formation maturity — `/assess/formation`

- **Optimizes for:** Formation-specific maturity (distinct from operational system readiness in copy — avoid blending headlines).
- **Flow position:** **Audience-specific depth** (churches / institutions / leaders) linked from `/who-its-for` branches and formation-heavy pages.

### Factoring into strategy

| Principle | Application |
| --------- | ------------- |
| **One job per instrument** | Do not merge Likert banks across `/assess` and `/assessment-new` — mixed semantics poison analytics and trust. |
| **CTA ladder** | Philosophy assessment → `/fragmentation` + `/book/read/...` for learning; system readiness → `/walkthrough` + `/contact` + `/system-builds`. |
| **Honest labels** | Nav and hero subheads must say **what is being measured** (“operational readiness” vs “dual-intelligence infrastructure”). |
| **Nav packaging** | A single **“Assessments”** nav label may link to a **hub** that *explains both* — still **two** instruments, **two** URLs, **two** result shapes. |

---

## 6. AI Agent (Movemental product vs demo)

### What we mean

**Movemental AI** = the **bounded, in-context** assistant operating on **corpus + pathways + tenant rules** (formation posture, refusal lines, citations where required). **Demo** = **time-boxed or synthetic** experience that illustrates behavior **without** implying access to private corpus or production guardrails.

**Anti-hype lock:** **Movemental AI must always be presented as a function of context, corpus, and governance — not as a standalone magical assistant.**

### Canonical placement

| Surface | Movemental product | Demo |
| ------- | ------------------- | ---- |
| **`/walkthrough`** | Primary **guided** narrative — how AI sits inside libraries, pathways, formation workflows. | May embed **safe** scripted demo states; label clearly if not live product. |
| **`/platform`, `/system`, `/how-it-works`** | Architecture story: AI as **layer** with boundaries (not the whole product). | Optional “see example” modals — **never** presented as customer data. |
| **`/evidence`** | Argumentation: retrieval, grounding, multi-tenant isolation, formation alignment. | Secondary — “lab” or “prototype” only with explicit dating and scope. |
| **`/pricing`, `/faq`** | What is included / not included; data and model posture at a policy level. | N/A or “trial” mechanics only if true. |
| **Home `/`** | **One** crisp claim family in system or proof zones; link to `/walkthrough` or `/evidence` for depth. | Avoid hero-level demo unless it is **obviously** illustrative (caption + link to “how it really works”). |

### Factoring into strategy

- **Strategy job:** AI = **activation and multiplication accelerator** only when **informational** and **relational** foundations exist — never the headline cure for fragmentation alone (see book Ch. 11–12 posture).
- **Trust job:** Prefer **inspectable** descriptions (policies, diagrams, evaluation hooks) over **magic** demos. When showing UI, pair with **what data the model can see**.
- **Demo rule:** Anything labeled demo must **not** ship testimonials, fake org names, or implied results. Use neutral fixtures aligned with `DESIGN.md` trust patterns (L2b).

---

## 7. Content / Articles (especially “in context”)

### What we mean

**Articles** = filesystem-backed long-form in `docs/articles/` (loader: `src/lib/articles.ts`), surfaced at **`/articles`** and **`/articles/[slug]`**. **In context** means: written as if the reader may arrive from **search, social, or LLM summary** — so each piece must **self-locate** in the larger model (link to `/fragmentation`, relevant `/book/read/...`, and `/evidence` where claims need support).

### Strategic role (authority, not “blog”)

Articles are **not** generic blog churn. They are **repeatable authority assets**: **search-facing**, **social / shareable**, and **LLM-citation-friendly** surfaces that carry **inspectable** depth for people **not yet ready** to read the whole book. They **prove and extend** the same vocabulary as `/book` and `/fragmentation` — they do **not** establish a parallel voice or forked jargon.

### Canonical placement

| Surface | Role |
| ------- | ---- |
| **`/articles`, `/articles/[slug]`** | **Research memos**, methodology, deep dives, industry-specific arguments — **evidence + discovery** layer tied to the book’s thesis. |
| **`/blog`** | Optional shorter-updates route (`src/app/(site)/blog/page.tsx`); **must not** duplicate `docs/articles` or fork vocabulary — canonical essay library remains **`/articles`**. |
| **Home, `/evidence`, `/case-studies`, `/about`** | **Curate** links to specific articles where they substitute for long on-page proof — short lists, not exhaustive libraries. |
| **Inside book chapters** | “Further reading” blocks may point to **specific articles** when they extend a chapter claim (inspectable trail). |

### Factoring into strategy

| Principle | Application |
| --------- | ------------- |
| **Articles prove + surface; book teaches; fragmentation animates** | Articles carry **citations, data, comparisons** and **discovery** intent; book carries **sustained argument**; fragmentation carries **stage motion**. |
| **Every article has a “where am I?” graf** | Early paragraph: problem statement + link to the stage or intelligence it depends on. |
| **No orphan hot takes** | If an article introduces a new term, either **map it** to existing vocabulary or **promote** a glossary update in `/faq` or book errata workflow. |

---

## 8. Proof / Evidence (when to show vs tell a story)

### What we mean

**Proof** is anything that lets a **reasonable skeptic** verify or **feel** that we have done the thinking or the work: shipped product surfaces, **inspectable** writing, structured comparisons, case studies (even “in progress” with honest scope), team credibility, and **L2b-style** attribution for quantitative claims (`DESIGN.md` trust / evidence).

### Three proof types (pick deliberately)

| Type | Definition | Typical surfaces |
| ---- | ---------- | ---------------- |
| **Proof of thought** | Manuscript discipline, frameworks, endorsements, articles with citations — **why the model is coherent**. | `/book`, `/book/read/*`, **`/articles`**, **`/evidence`**, `/manifesto`, **`/about`** (light — points to depth) |
| **Proof of product** | Inspectable architecture, walkthrough UI, policies, diagrams — **how the system behaves and what it respects**. | **`/walkthrough`**, **`/evidence`**, `/how-it-works`, `/faq` (policy), captioned screenshots |
| **Proof of outcomes** | **Verified** engagement results, named partners where allowed — **what happened when someone used the work**. | **`/case-studies`**, testimonial rails **with** contracts, dated articles that document engagements |

Marketing pages (including `/`) may **combine pointers**; they should **not** dump all three types into one undifferentiated “trust wall.” Match proof **type** to the **claim** the section makes.

### Canonical placement

| Surface | Proof type |
| ------- | ---------- |
| **`/evidence`** | **Proof of thought + product** — argument patterns, architecture, AI-in-context, with pointers to articles and book. |
| **`/case-studies`** | **Proof of outcomes** (and methodology narrative where verified). |
| **Home proof band** | **Curated mix** — bias toward **pointers** to `/evidence`, articles, book — not a duplicate of `/evidence`. |
| **`/book` endorsements / contributors** | **Proof of thought** (manuscript credibility). |
| **Articles with data** | **Proof of thought** with **show** tables/charts — **primary** home for numbers marketing is not ready to host. |
| **`/walkthrough` / product captures** | **Proof of product** — UI flows; caption demo vs production. |

### When to **show** vs **tell**

| Situation | Prefer |
| --------- | ------ |
| Quantitative claim (stats, “X%”) | **Show** source or **move** claim to an article/book section with citation; on marketing pages **soften** headline until L2b-ready (per home narrative plan). |
| Architecture differentiator | **Proof of product** — diagram or walkthrough + **tell** the constraint (tenant isolation, corpus grounding). |
| Customer impact | **Proof of outcomes** on `/case-studies` only with **verifiable** details; else **proof of thought** via methodology + `/evidence`. |
| “What we learned building Movemental” | **Tell** in **manifesto / vision / articles** with dated honesty — **not** as anonymous third-party proof. |
| AI behavior | **Proof of product** — redacted/synthetic sessions + policy; avoid cherry-picked best answers without failure-mode discussion on `/evidence` or FAQ. |

### Factoring into strategy

- **Strategy job:** Proof reduces **epistemic friction** in a credibility-scarce market — it is **parallel** to the emotional arc on `/`, not a footer afterthought.
- **Flow rule:** After **consequence** and **system** sections on key landings, the next click for skeptics should often be **`/evidence`** or a **specific article**, not only “contact.”
- **Integrity rule:** If proof is thin, **narrow the claim** — alignment with founder discipline in [`book-chapter-ground-truth-deepening.md`](./book-chapter-ground-truth-deepening.md).

---

## 9. Cross-artifact linking matrix (quick reference)

| From → To | Book (`/book`) | AI Stewardship Sequence field guide (`/articles/ssss-field-guide-for-organizational-leaders`) | Two intelligences (Ch. 2) | `/assess` | `/assessment-new` | AI story | Articles | Proof (`/evidence`) |
| --------- | ---------------- | -------------------------------------------------------------------------- | ------------------------- | --------- | ------------------- | -------- | -------- | ------------------- |
| **Home `/`** | CTA + optional chapter deep link | Second CTA (the ordered path) | Name pair; link Ch. 2 | Secondary CTA for ops-ready buyers | CTA after model curiosity | Single promise + `/walkthrough` | Curated strip | Proof band + link |
| **`/about`** | Short CTA | Short CTA | Name + link Ch. 2 if needed | Optional “operations” link | Optional “diagnose” link | One line + `/walkthrough` | 1–2 curated | Pointer to `/evidence` / team |
| **`/fragmentation`** | Outro CTA | Outro CTA | Embedded conceptually | Link for “operations” readers | Link for “diagnose us” readers | Light mention in stages where AI amplifies | Related reading optional | Link when making comparative claims |
| **`/book`** | — | One cross-link | TOC + read route | Footer / “next step” for orgs | “Test your infrastructure” card | Ch. 11–15 hooks | Further reading lists | — |
| **`/walkthrough`** | “Why this exists” | When showing adoption flow | Explain boundaries | Natural after seeing dashboards | Optional embed | **Primary owner** | Link methodology pieces | Link trust/evidence |
| **`/articles/*`** | Cite chapters | When about the AI Stewardship Sequence | Link Ch. 2 for definitions | If about ops | If about dual intel | When reviewing product | — | Link `/evidence` + data |
| **`/evidence`** | Reference manuscript | If citing adoption discipline | Align terminology | Position as operational depth | Position as philosophical depth | Security + grounding section | Index key articles | — |

---

## 10. Related prompts (maintenance)

When routing or nav changes, update in the **same PR**:

- [`00-site-content-architecture-nav-master-prompt.md`](./00-site-content-architecture-nav-master-prompt.md) — Part 2–5 IA tables and perfected nav.
- [`home-page-narrative-credibility-ia-plan.md`](./home-page-narrative-credibility-ia-plan.md) — home vs fragmentation vs evidence ownership.
- [`assessment-dual-intelligence-infrastructure-from-assessment-new.md`](./assessment-dual-intelligence-infrastructure-from-assessment-new.md) — instrument semantics and storage.

---

## 11. Agent prepend block (optional)

Use this when editing multiple surfaces so placement stays coherent:

```text
Follow docs/build/prompts/strategy-artifacts-placement-and-flow.md:
- Book → /book (and /book/read/*). The AI Stewardship Sequence field guide → /articles/ssss-field-guide-for-organizational-leaders. Cross-link once each way on primary surfaces; do not merge arguments.
- Two intelligences: deep definition in book Ch. 2; /assessment-new scores; other pages summarize and link.
- /assess (operational readiness) and /assessment-new (dual-intelligence × stages) stay semantically distinct — no merged UI, scoring, or lead copy without explicit product decision.
- Movemental AI = f(context, corpus, governance); not a standalone magic assistant. Demos labeled; architecture first.
- Articles: authority/discovery surfaces; map vocabulary to book/fragmentation; no forked jargon or second “blog” truth.
- Proof: choose proof-of-thought vs product vs outcomes; show sources for numbers; no duplicate chapter-zero opens.
- /about orients and points; does not re-host the full thesis.
```
