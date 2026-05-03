# Prompt: Book chapter — publisher-quality editorial pass (any chapter or portion)

**Use when:** The manuscript has a **stable outline** and **draft prose** in place, but chapters still need the kind of pass a house editor would give before typesetting: **argument clarity, proportion, voice, line-level craft, consistency, and honest epistemics**—without flattening the author into generic “thought leadership” or AI-smoothed paste.

**Not the same as:** [`book-chapter-ground-truth-deepening.md`](./book-chapter-ground-truth-deepening.md) (research, sourcing, and *adding* grounding). Run **deepening** when facts or citations are thin; run **this prompt** when the ideas are roughly there but the **chapter must read like a finished book**. You may run deepening first, then this prompt, in either order depending on need—if you are unsure, default to **this pass first** for voice and structure, then deepening only where the editorial memo flags weak support.

---

## Part A — Direction for the editorial team (humans)

### Where this book is in the pipeline

Per `docs/book-development/README.md` and `manuscript-ordered/`: the **canonical sequence and merge map are set** (preface + 21 chapters; theological integrity lives inside Ch 13; practice parameters merge agents / 70/30 / spectrum in Ch 15). **Prose is still uneven**—some chapters are thin, voice can drift toward explanation-default or AI-shaped smoothness, and cross-chapter repetition is a risk. This is **mid-to-late developmental draft** territory: not acquisition brainstorming, not final proofreading.

### The editing mix that fits *this* juncture

| Role (conceptual) | What to prioritize now | What to defer |
| --- | --- | --- |
| **Developmental editor (chapter-bounded)** | Each chapter’s **job** vs `BOOK_OUTLINE.md`; missing beats; order of sections; whether the opening **lands** and the close **hands off** to the next chapter; proportion (too much throat-clearing, too little pay-off). | Global reorder of parts (outline change) unless the author explicitly reopens structure. |
| **Substantive / line editor** | Clarity, rhythm, **transitions**, paragraph economy, **deduplication** vs neighbors, **through-lines** (`EDITING_AND_AGENT_GUIDE.md` §2), prophetic-pastoral balance (`BOOK_VOICE_AND_STYLE_GUIDE.md`). | Rewriting the book in a new voice; stripping all first-person. |
| **Sensitive copy editor** | Grammar, punctuation, parallel structure, **terminology consistency** (e.g. scenius, amplification vs replacement), **honest uncertainty** phrasing, flagging **stats that need a source** or softening. | Legal read; citation style perfection unless the chapter already carries formal notes. |
| **Fact / research pass** | Use **deepening** prompt or human researcher when the editorial memo finds **unsupported quantitative claims** or over-tight analogies. | Blocking the whole line edit on every footnote—**flag** and move on when fix requires primary lookup. |
| **Proofreader** | **Last** pass before print—typos, double spaces, heading hierarchy. | Doing this before substantive voice work wastes cycles. |

### Sequencing recommendation for the team

1. **Author or lead:** Lock the **outline slice** for the chapter in `BOOK_OUTLINE.md` when a chapter’s *job* changes; otherwise treat outline as fixed.
2. **Agent (this prompt):** One chapter (or one focused portion) per run—publisher-quality pass **in repo**, markdown in `manuscript-ordered/`.
3. **Human:** Read the **Editorial memo** + diff; accept, reject, or steer one constraint for a follow-up run.
4. **Optional second agent run:** Ground-truth deepening **only** on paragraphs the memo marks as under-sourced.
5. **Human copy pass:** Short final read for ear and theology—especially Ch 9 (scenius claims), Ch 11 (case study), Ch 13 (boundaries).

### Chunking

- **Default:** one chapter per invocation; agent always reads **outline neighbors** per `docs/book-development/manuscript-ordered/EDITING_AND_AGENT_GUIDE.md` §1a (not filename order—preface `00` follows Ch 3).
- **Two chapters:** only for an explicit **pair coherence** task (e.g. Ch 5–6), still producing two memos or one memo with two sections.

---

## Part B — Agent prompt (execute below the fold)

You are a **senior trade-nonfiction editor** (developmental + substantive line + sensitive copy) working in the **movemental** repo. Your job is to deliver a **publisher-quality** revision of **one** manuscript file (or one clearly delimited **portion** of it) so it is ready for the author’s **final read** and optional fact-deepening—not for legal review or design.

### B0 — Inputs the human provides (required / optional)

Paste under the fold when invoking:

1. **`TARGET_PATH`** (required) — Path under `docs/book-development/manuscript-ordered/`, e.g. `docs/book-development/manuscript-ordered/09-scenius-as-credibility-solution.md`.
2. **`SCOPE`** (optional) — Default: **entire file**. If portion: e.g. “from `## Section name` through end” or line range **only if** the human pasted those lines; otherwise edit the **whole chapter** so portion edits do not break coherence.
3. **`DELIVER`** (optional) — `EDIT_IN_PLACE` (default) | `MEMO_ONLY` | `MEMO_PLUS_SUGGESTED_PATCH` (memo + minimal patch block in chat, no file write).
4. **`AUTHOR_CONSTRAINTS`** (optional) — e.g. “do not exceed X words,” “keep opening anecdote,” “no new statistics,” “do not name X.”

### B1 — Required reading (do this before changing prose)

Read **in full** (or the sections indicated):

1. **`TARGET_PATH`** — The chapter (or portion + full file scan for voice).
2. **`docs/book-development/manuscript-ordered/BOOK_OUTLINE.md`** — Only the **subsection(s)** for this chapter’s **number and title** (its job, merge history, bullets). If unclear which section, map from filename prefix `NN-` to outline “Chapter NN.”
3. **`docs/book-development/manuscript-ordered/BOOK_META_OVERVIEW.md`** — §2 (constraints: what the book is/is not) and §3 (success criteria). Do not violate these.
4. **`docs/book-development/manuscript-ordered/BOOK_VOICE_AND_STYLE_GUIDE.md`** — Apply as **hard** standard for voice and anti-slop.
5. **`docs/book-development/manuscript-ordered/EDITING_AND_AGENT_GUIDE.md`** — §1a (read order), §2 (through-lines), §3 (cross-chapter rules). Open the **previous and next** chapter files in §1a order for **transitions and deduplication** (do not paste them wholesale into the chapter; **trim or cross-reference** repeated stats/anecdotes).
6. **`docs/book-development/CANONICAL_BOOK_DRAFTING_SYSTEM.md`** — §2 Epistemic rules and the **statistics / overclaim** guidance. **Do not introduce new statistics** without a named primary source; if the chapter contains a dubious number, **soften, qualify, or flag in the memo**—do not invent citations.

**Optional** (if the chapter is evidence-heavy and the human asks): spot-check the same research article under `docs/build/research/articles/` **only** for claims already in the chapter—this pass is **not** a full research expansion (use the deepening prompt for that).

### B2 — Editorial diagnosis (write this first in chat)

Before editing the file, output an **Editorial memo** (structured, concise—target **400–900 words** unless the chapter is enormous):

- **Chapter job** (one sentence): What this chapter must accomplish for the reader, per outline.
- **Fit assessment:** Does the draft **fulfill** that job? What is **missing, overweight, or out of order**?
- **Voice:** Where it matches `BOOK_VOICE_AND_STYLE_GUIDE.md`; where it drifts (e.g. explainer-default, hype, false certainty, AI telltales).
- **Epistemics:** List **each quantitative or strong empirical claim**; mark each as **supported / needs source / should soften** (no fabrication).
- **Cohesion:** Notes on **neighbors** (previous/next in §1a)—transitions, repeated material to cut or replace with a short cross-reference.
- **Top fixes** (numbered **5–10**): Highest-impact edits you will make (or recommend if `MEMO_ONLY`).

### B3 — Publisher-quality edit (criteria)

Apply revisions to **`TARGET_PATH`** (unless `MEMO_ONLY` or human said otherwise) so that the text meets **all** of the following:

1. **Opening:** The first screen **orients** and **earns** attention—no throat-clearing, no redundant restatement of the whole book unless this chapter is the right place for a single compressed recap (rare).
2. **Closing:** Lands on a **clear charge or pivot** that **hands off** logically to the next chapter in §1a order; no accidental “conclusion of entire book” unless this is Ch 21.
3. **Proportion:** Sections **scale** to importance; cut or merge paragraphs that **repeat** the outline’s earlier chapters; expand only where a **named beat** from the outline is missing (stay within meta constraints—this is not a how-to manual).
4. **Line craft:** Vary sentence length; cut filler; fix **unclear antecedents**; prefer **strong verbs**; reduce stacked abstractions; ensure lists **earn** their place.
5. **Voice:** Prophetic-pastoral, guide-not-guru, **calm**—per voice guide. Preserve **first person** where it carries relational authority; do not **sanitize** into third-person corporate.
6. **Terms:** Consistent use of book vocabulary (**amplification not replacement**, **scenius**, **formation**, etc.) without jargon walls—**define or gloss** once per chapter where needed.
7. **Tension:** Preserve **“AI as both problem and solution”** and other **deliberate tensions** from meta-overview—do not resolve them into platitudes.
8. **Trust:** No **unverified** stats; no **startup hype**; no **product pitch** for Movemental—illustration is allowed, **sales narrative** is not (`BOOK_META_OVERVIEW.md`).
9. **Markdown hygiene:** Clean `#` / `##` hierarchy consistent with the file; no broken fences; **no § symbol** in reader-facing prose (per project convention).
10. **Accessibility:** Plain language where possible; short paragraphs for screen reading; **meaningful subheads** where they help navigation.

### B4 — What not to do

- Do **not** change the **outline’s chapter order** or merge/split chapters in this pass unless the human explicitly asked for a structural proposal—in that case, put **restructuring** in the memo only and do **not** rename files without instruction.
- Do **not** add **new** research threads, long new sections, or **new statistics**—**flag** for [`book-chapter-ground-truth-deepening.md`](./book-chapter-ground-truth-deepening.md) instead.
- Do **not** **homogenize** voice into neutral “AI textbook” tone.
- Do **not** **resolve** theological or strategic tensions the book is designed to **hold**.

### B5 — Deliverables

- **Always:** Editorial memo (B2) in the assistant response.
- **If `EDIT_IN_PLACE` (default):** Apply edits **directly** to `TARGET_PATH`; keep diff **focused**—every change should trace to memo items.
- **If `MEMO_PLUS_SUGGESTED_PATCH`:** Memo + clearly delimited **suggested replacement** blocks for the hardest 2–4 zones only.
- **Optional closing:** **3–5 “author questions”**—real decisions only the author can make (voice, risk appetite, disclosure level), not generic encouragement.

### B6 — Self-check before you finish

Reply with a short **Checklist** (yes/no) in chat:

- Outline job for this chapter **met**?
- Voice guide **respected**?
- Meta constraints **respected**?
- Neighbors **checked** for duplication and transitions?
- No **new** unsupported stats?
- Opening and closing **strong**?

---

## Part C — Invocation block (paste below the fold)

```text
Run docs/build/prompts/book-chapter-publisher-quality-edit.md.

TARGET_PATH: PASTE_FULL_PATH_TO_MANUSCRIPT_ORDERED_FILE
SCOPE (optional): WHOLE_FILE | PASTE_PORTION_DESCRIPTION
DELIVER (optional): EDIT_IN_PLACE | MEMO_ONLY | MEMO_PLUS_SUGGESTED_PATCH
AUTHOR_CONSTRAINTS (optional): PASTE_ANY

Execute B1 → B2 (memo in chat) → B3–B5 → B6 checklist.
```

---

## Part D — Related prompts and docs

| Doc | Role |
| --- | --- |
| [`book-chapter-ground-truth-deepening.md`](./book-chapter-ground-truth-deepening.md) | Research, sources, selective **addition** of grounding. |
| `docs/book-development/manuscript-ordered/EDITING_AND_AGENT_GUIDE.md` | Read order §1a, through-lines, neighbor rule. |
| `docs/book-development/manuscript-ordered/BOOK_OUTLINE.md` | Chapter **job** and merge rationale. |
| `docs/book-development/manuscript-ordered/BOOK_VOICE_AND_STYLE_GUIDE.md` | **Target** voice and anti-slop. |
| `docs/book-development/manuscript-ordered/BOOK_META_OVERVIEW.md` | Audience, constraints, success. |
| `docs/book-development/CANONICAL_BOOK_DRAFTING_SYSTEM.md` | Epistemic tiers, stat discipline, edition notes. |

---

**End of prompt.**
