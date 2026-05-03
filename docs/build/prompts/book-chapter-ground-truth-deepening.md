# Prompt: Book chapter — ground truth, sources, and deepening (any chapter)

**Companion (voice, structure, line craft):** When the chapter’s ideas are roughly in place but the prose needs a **house-editor pass** (proportion, transitions, anti-slop, consistency), run [`book-chapter-publisher-quality-edit.md`](./book-chapter-publisher-quality-edit.md) on the same file—before or after this prompt depending on whether the bottleneck is **research** or **readiness**.

Use this prompt in **Cursor** or **Claude Code** when revising a **book manuscript chapter** under `docs/book-development/manuscript-ordered/` (or `manuscript-final/`). Goal: **deepen and round out** the chapter using **real artifacts** from this repo and, where appropriate, **read-only** sibling directories on the author’s machine—without inventing facts or smuggling marketing fluff.

This is **not** limited to two folders. The agent must **propose the best source set for *this* chapter** from the menu below (and any the human adds), then read selectively.

---

## Inputs the human provides (paste under the fold)

1. **Chapter file path** (required), e.g. `docs/book-development/manuscript-ordered/01-the-credibility-crisis.md`
2. **One-sentence thesis** of the chapter (optional but helpful)
3. **Hard constraints** (optional): e.g. “no new statistics,” “keep under N words,” “more institutional than personal,” “do not name X”
4. **Machine root** if not default: e.g. `/Users/joshuashepherd/Desktop/dev/repos`

---

## Hard rules for the agent

1. **Read-only** on all paths outside the `movemental` repo unless the human explicitly authorizes edits elsewhere.
2. **No fabrication**: do not invent studies, dates, employer claims, metrics, or private conversations. If you lack evidence, say so and suggest what to verify.
3. **Cite pointers, not walls**: when borrowing grounding from a sibling repo, name **file path + section** (or README anchor). Do not paste huge exports into the manuscript.
4. **Preserve voice**: the book is first-person and diagnostic; avoid turning chapters into corporate FAQ tone unless the chapter is explicitly that.
5. **Prefer primary artifacts** over secondhand summaries: founder notes, README hub maps, `_docs` indexes, agent/voice specs, research markdown with sources—over random chat logs unless the chapter is about process/archive.
6. **Deduplicate with adjacent chapters**: if the preface or another chapter already said it, **cross-reference lightly** or cut—do not repeat whole blocks.
7. **Output**: either (a) a **single consolidated edit** to the chapter file, or (b) a **short “proposed inserts”** block + minimal edits—whichever the human asked for in their message.

---

## Source directory menu (pick what fits *this* chapter)

Adjust roots if the machine differs. Default dev root: `/Users/joshuashepherd/Desktop/dev/repos`.

| If the chapter is mainly about… | Prioritize these locations (in order) | Why |
| --- | --- | --- |
| **Credibility, disclosure, trust, epistemics** | `movemental/docs/notes/mvmtl-running-notes-founder-input-2026-04.md`; `movemental/docs/build/research/` (articles + raw where cited); `movemental/docs/book-development/` sibling chapters; `docs/operations/` or `docs/knowledge/` **in the docs hub** (if present on disk) | Founder ground truth + prior book arguments + internal curriculum |
| **Org / product / offers / maturity model** | `movemental/docs/notes/mvmtl-running-notes-founder-input-2026-04.md`; `movemental/docs/build/prompts/mvmtl-cross-repo-documentation-index.md` (run as inventory); `alan-hirsch/` / `movemental-ai/` README, `docs/`, `_docs/` | Cross-repo truth; capability references |
| **Platform, schema, type-safety, “how AI can help safely”** | `alan-hirsch/` (patterns, CLAUDE, schema-adjacent docs); `movemental-content-studio/` or dashboard repos if they exist; `movemental/docs/design/DESIGN.md` only when the chapter touches org-site design | Technical credibility, rails for assistance |
| **Personal narrative, arc of the build, memoir** | `movemental/docs/book-development/manuscript-ordered/00-preface-the-story.md`; `chatgpt/` repo `CLAUDE.md`, `_docs/ai-archive/` (themes, book material, evidence indexes) | Lived timeline + archive discipline |
| **Voice, agents, Alan-corpus fidelity** | `alan-hirsch/` agents/skills/voice docs; `docs/agents/` and `docs/books/` **in the docs hub** | Voice markers, guardrails |
| **Research claims already in the chapter** | Prefer **re-opening the same file** the chapter cites (e.g. under `docs/build/research/articles/`); add `raw/` only to confirm wording, not to balloon citations | Keeps statistics honest |
| **Satellite or niche context** (nonprofit CRM, dashboards, etc.) | `movemental-ai/`, `non-profit-dashboard/`, paths listed in docs hub `satellite-projects/` if present | Avoid forcing irrelevant product detail |
| **“What exists in writing?” inventory** | Run or mirror the strategy in `docs/build/prompts/mvmtl-cross-repo-documentation-index.md` | Prevents contradicting sibling canon |

**Docs hub** (consolidated documentation corpus): typically `…/dev/repos/docs/README.md` and `_meta/NAV.md` — use when the chapter needs **curriculum, operations, intelligence, or book-adjacent** material that was merged from many repos.

**ChatGPT archive repo** (name may vary): often `…/dev/repos/chatgpt/` — use when the chapter benefits from **export discipline**, **resume/vocation master docs**, or **`ai-archive`** book-evidence workflows—not as a generic “read everything” (exports are huge; use indexes and `CLAUDE.md`).

If the best sources live somewhere else (e.g. `alan-books/`, `storyteller/`, a course repo), the agent should **name them explicitly in the plan** before reading deeply.

---

## Procedure (execute in order)

1. Read the **target chapter** end-to-end.
2. Read **`docs/notes/mvmtl-running-notes-founder-input-2026-04.md`** in this repo when the chapter touches Movemental product, governance, audiences, or offers (skip if clearly irrelevant).
3. Emit a **Source plan** (5–8 bullets): which directories/files you will use and **why this chapter**—not a generic list.
4. Read those files **selectively** (README, indexes, named markdown—avoid bulk JSON exports unless the chapter is about archives).
5. Propose **concrete revisions**: new subsection(s), tightened transitions, or one grounding paragraph—mapped to **specific** source paths.
6. If mirroring `manuscript-final/`, **sync** the same filename there only if the human wants both trees aligned.

---

## Invocation block (paste below the fold)

> Run `docs/build/prompts/book-chapter-ground-truth-deepening.md`.  
> Chapter: `PASTE_PATH_HERE`  
> Thesis (optional): `PASTE_ONE_SENTENCE`  
> Constraints (optional): `PASTE`  
> Deliver: `EDIT_IN_PLACE` or `PROPOSED_INSERTS_ONLY`  
> Dev repos root (optional): `/Users/joshuashepherd/Desktop/dev/repos`  
> Start with a **Source plan** before editing.

---

## Optional: sibling parity

Org-site prompts live in [`00-org-site-page-prompts-index.md`](./00-org-site-page-prompts-index.md). Book prompts are intentionally separate: book chapters may draw from **broader** read-only corpora than the marketing site should import verbatim.
