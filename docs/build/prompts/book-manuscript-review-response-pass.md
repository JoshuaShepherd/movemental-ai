# Prompt: Book manuscript — respond to publication review (quality pass without identity drift)

**Use when:** A **publication-style review** exists (e.g. [`docs/book-development/manuscript-ordered/reviews/publication-review-christianity-today-register.md`](../../book-development/manuscript-ordered/reviews/publication-review-christianity-today-register.md)) and the author or editor wants a **coordinated revision plan and/or execution** that **takes the review’s criticisms seriously** while **preserving** the book defined in `BOOK_META_OVERVIEW.md`, `BOOK_OUTLINE.md`, and `BOOK_VOICE_AND_STYLE_GUIDE.md`.

**Not the same as:** [`book-chapter-publisher-quality-edit.md`](./book-chapter-publisher-quality-edit.md) (single-chapter house edit without tying changes to an external review) or [`book-chapter-ground-truth-deepening.md`](./book-chapter-ground-truth-deepening.md) (research expansion). This prompt **orchestrates** cross-manuscript moves *because* of the review; after the plan is clear, invoke publisher-quality and/or deepening **per chapter** as sub-passes.

---

## Part A — Direction for humans

### Why this prompt exists

Publication reviews name real risks: **proper-noun / build-story density**, **audience gear-shifts**, **genre expectations** (theology vs. formation guide), and **perishable tooling language**. This pass ensures those notes become **tracked edits**, not a rewrite into a different book (e.g. academic *theology of technology*, pure how-to, or a stripped anonymous treatise).

### Non-negotiables (do not “fix” the review by violating these)

From `BOOK_META_OVERVIEW.md` and the outline—**preserve**:

| Commitment | Meaning for this pass |
| --- | --- |
| **Formation-oriented guide** | Strengthen judgment and posture; do **not** replace the book with a policy manual, playbook, or citation-dense monograph. |
| **Both problem and solution** | Do not resolve AI into wholesale embrace or rejection to satisfy a reviewer’s appetite for a “take.” |
| **Guide and fellow traveler** | First-person honesty and “still learning” stay; do not flatten into corporate “we” or omniscient expert voice. |
| **No product pitch** | Lightening Movemental / named-build references means **principles stand alone**—not deleting the author’s story or pretending the work never happened. |
| **Primary audience** | Movement leaders who steward content remain centered; **bridging** for pastors and institutions is additive, not a recentering of the whole book. |
| **Outline and merges** | Do not reopen merged chapters (e.g. theological integrity inside Ch 13; practice parameters in Ch 15) unless the author explicitly changes `BOOK_OUTLINE.md`. |

### Suggested sequencing (repo workflow)

1. **Human:** Confirm the review file path (default: `reviews/publication-review-christianity-today-register.md`). Optionally add `AUTHOR_OVERRIDES` (e.g. “keep Alan Hirsch naming in Ch 11”).
2. **Agent (this prompt, once):** Produce the **Review response memo** (Part B2)—cross-cutting diagnosis and chapter map—default save path: `docs/book-development/manuscript-ordered/reviews/review-response-memo.md`. **No** wholesale rewrites across 22 files in one run unless the human explicitly asks for execution mode `FULL_MANUSCRIPT`.
3. **Human:** Approve, adjust, or strike items from the memo.
4. **Agent:** Execute **per chapter** using [`book-chapter-publisher-quality-edit.md`](./book-chapter-publisher-quality-edit.md) with `AUTHOR_CONSTRAINTS` drawn from the approved memo (e.g. “reduce proper nouns outside Ch 11; add one parish vignette in Ch 17”).
5. **Optional:** [`book-chapter-ground-truth-deepening.md`](./book-chapter-ground-truth-deepening.md) only where the memo flags thin support—not to thicken theology beyond genre.

---

## Part B — Agent prompt (execute below the fold)

You are a **lead developmental editor** for a trade nonfiction manuscript on **AI, credibility, and leadership** in `docs/book-development/manuscript-ordered/`. A **publication-register review** has been written; your job is to **honor its praise as constraints on what not to break** and **honor its critiques as a work order**—without turning the book into something it is not.

### B0 — Inputs the human provides (paste under the fold)

1. **`REVIEW_PATH`** (required unless default) — Default: `docs/book-development/manuscript-ordered/reviews/publication-review-christianity-today-register.md`. Read it **in full** first.
2. **`EXECUTION_MODE`** — `MEMO_ONLY` (default) | `MEMO_PLUS_ONE_CHAPTER` | `FULL_MANUSCRIPT` (only if human explicitly requests multi-file edits in one session).
3. **`TARGET_CHAPTER`** (required if `MEMO_PLUS_ONE_CHAPTER`) — e.g. `docs/book-development/manuscript-ordered/11-my-2025-with-ai.md`
4. **`AUTHOR_OVERRIDES`** (optional) — Lines the author refuses to change, or emphases to keep.

### B1 — Required reading (before diagnosis)

1. **`REVIEW_PATH`** — Full file; extract **every** actionable critique into a checklist (see B2).
2. **`docs/book-development/manuscript-ordered/BOOK_META_OVERVIEW.md`** — Audience, constraints, success criteria; treat as **constitutional**.
3. **`docs/book-development/manuscript-ordered/BOOK_OUTLINE.md`** — Chapter jobs; do not contradict merge/rationale without explicit human instruction.
4. **`docs/book-development/manuscript-ordered/BOOK_VOICE_AND_STYLE_GUIDE.md`** — Voice floor and ceiling.
5. **`docs/book-development/manuscript-ordered/EDITING_AND_AGENT_GUIDE.md`** — Read order for neighbors, through-lines, deduplication.

**If executing a chapter:** also read `TARGET_CHAPTER` and its outline neighbors per `EDITING_AND_AGENT_GUIDE.md` §1a.

### B2 — Review response memo (output first in chat)

Produce a structured memo (target **800–1,500 words** unless `MEMO_ONLY` and the human asked shorter). Include:

#### 1) What the review asks you to protect

List **3–7** strengths the review names (e.g. calm diagnosis, adaptive-leadership frame, evidence + humility, ethical lines, honest scenius limits, unfinished closing). For each, name **one guardrail** for later edits (“do not dilute X when fixing Y”).

#### 2) Review critique → manuscript action matrix

Map **each** criticism in the review to **concrete actions**, using this table format:

| Review criticism | Risk if ignored | Primary locations (chapters / preface) | Action type (cut / reframe / bridge / tag / split signpost) | Success signal |
| --- | --- | --- | --- | --- |
| … | … | … | … | … |

**Minimum rows** — ensure explicit rows for (when present in the review):

- **Movemental / proper-noun / “manifesto” risk** — firewall **illustration** vs **transferable principle**; reduce frequency of product-adjacent names outside the designated case-study chapter(s); add **one-line disclaimers** where a fair reader could confuse principle with pitch.
- **Audience gear-shifts** — organizational / systems language vs parish life; add **short bridging sentences**, **signposts** (“If you lead a congregation rather than a network…”), or **optional subheads** for “systems-minded readers” **without** new standalone chapters unless the author reopens the outline.
- **Theology “thin” vs genre** — **do not** attempt a full systematic theology of technology unless the author explicitly changes the book’s genre. Instead: **name the genre on the page once** (e.g. introduction or Ch 2–3 handoff), add **1–2 vivid parish or pastoral** examples where the review noted a gap, and **optional reading list** tone in one paragraph (titles only, no fake citations)—**or** a single new footnote-style “Further theological reads” if the house style allows.
- **Prompting / tooling aging** — in Ch 18 (or equivalent): **elevate** the durable claim (communication with a non-person, clarity, iteration, human-in-the-loop) and **demote or trim** vendor-ish, version-bound, or stack-specific lines; prefer **timeless verbs** (draft, stress-test, verify) over tool names.

#### 3) Chapter-level hit list

Ordered list: **which files** need a pass and **priority** (P0 = must, P1 = should, P2 = nice). Typical P0s when this review is the driver: preface (`00`), case-study chapter (`11`), organizational-heavy early chapters (`00`–`03` as needed), formation/leadership application (`17`), prompting (`18`), closing (`21`).

#### 4) Explicit non-goals

Bullet **3–6** things you will **not** do, tied to `BOOK_META_OVERVIEW.md` (e.g. “will not add a chapter that is only NIST compliance,” “will not remove first-person arc,” “will not convert scenius chapter into a literature review”).

#### 5) Sub-prompt invocations

For each P0/P1 chapter, give a **one-line instruction** the human can paste into [`book-chapter-publisher-quality-edit.md`](./book-chapter-publisher-quality-edit.md) as `AUTHOR_CONSTRAINTS`, synthesized from the matrix.

### B3 — Execution rules (if not `MEMO_ONLY`)

- **`MEMO_PLUS_ONE_CHAPTER`:** After the memo, run the **publisher-quality** criteria from `book-chapter-publisher-quality-edit.md` on **`TARGET_CHAPTER` only**, applying the approved matrix rows that touch that file. Output the usual short **chapter editorial memo** for that file plus apply edits to disk.
- **`FULL_MANUSCRIPT`:** Only with explicit human request; still output B2 memo first, then edit files **in priority order** with a brief per-file note; watch for **cross-chapter duplication** when demoting Movemental mentions.

### B4 — Quality bar (all execution modes)

After edits, the manuscript should still:

- Pass the **“principles without the product”** test: a reader who knows nothing of Movemental can still apply Ch 5–10 and Ch 12–17.
- Pass the **“pastor in a hurry”** test: a parish leader finds **at least two** anchoring scenes or sentences in the **application** chapters that feel like **church-shaped** life, not only org rebuild—without caricaturing polity.
- Pass the **“honest genre”** test: the book does not pretend to be a Tanner lecture; it **signals** its scope (formation guide + adaptive leadership + credibility craft) in plain language.

### B5 — Stop conditions

Stop and ask the human if:

- A review suggestion would **delete** the author’s story or **violate** `BOOK_META_OVERVIEW.md`.
- The fix requires **new quantitative claims**—route to [`book-chapter-ground-truth-deepening.md`](./book-chapter-ground-truth-deepening.md) with sources, or soften language only.

---

## Part C — Quick reference: review file path

Default input review:

`docs/book-development/manuscript-ordered/reviews/publication-review-christianity-today-register.md`

If the human adds a different review (e.g. second reader), set **`REVIEW_PATH`** to that file and re-run Part B from B0.

---

**End of prompt.**
