# Prompt: MVMTL cross-repo documentation index (anti-fluff, anti-hallucination)

Use this prompt in **Cursor** or **Claude Code** when you need a **single inventory** of everything already written about Movemental (MVMTL), its audiences, offers, AI maturity model, and product capabilities — spread across **this repo** and sibling codebases.

## Purpose

- **Discover** existing canonical docs (markdown, FAQs, copy decks, CLAUDE/agents, skills, `_docs`, `docs/content`, Trello exports, etc.).
- **Index** them back to the human with: path, one-line summary, approximate audience, and **freshness / risk** flags.
- **Avoid** importing outdated, contradictory, or fluffy material into the org site or a new “source of truth” doc without an explicit human decision.

## Hard rules for the agent

1. **Read-only on sibling repos** unless the human explicitly asks for edits in a given repository.
2. **No synthesis into final marketing copy** in this pass — **inventory and classification only**. If you infer intent, label it clearly as **inference**, not fact.
3. **Every bullet that quotes a doc** must include **file path** (and section heading if helpful). No uncited claims about what Movemental does.
4. **Flag contradictions** between documents (e.g. old “venture builder” pricing vs modular nonprofit sprints vs formation-only church language). Do not resolve contradictions without human input.
5. **Flag likely template / Stitch slop**: generic systems-bro language, Notion+AI as stack if not confirmed, “investor pipeline” metaphors, etc.
6. **Do not** paste entire large files into the output — summarize + pointer.

## Repositories to search (canonical list)

Adjust paths if the machine differs; default for Joshua’s setup:

| # | Repository | Role |
| --- | --- | --- |
| 1 | **This repo** — `movemental` (organizational marketing site) | `docs/`, `CLAUDE.md`, `AGENTS.md`, `src/app/(site)/` copy, `docs/content/`, `docs/build/personas/`, `docs/articles/`, `docs/research/` |
| 2 | **`/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch`** | Alan Hirsch **tenant app** — reference **product capability**: routes, features, README/CLAUDE, any `_docs` or `docs/` trees |
| 3 | **`/Users/joshuashepherd/Desktop/dev/repos/movemental-ai`** | Nonprofit dashboard, `_docs/` (site-docs, movement leader research, type docs, FAQs), skills that encode process |

If a fourth “docs” corpus exists (e.g. a dedicated docs-only clone), the human will name it — add it to the table before searching.

## Search strategy (execute in order)

1. **Glob** all `*.md`, `*.mdx` under `docs/`, `_docs/`, `.claude/` (skills only if they contain MVMTL/product/audience copy, not generic postgres tips), and root `README*`, `CLAUDE.md`, `AGENTS.md` in each repo.
2. **Ripgrep** keywords (case-insensitive), including: `Movemental`, `MVMTL`, `movement leader`, `100 movement`, `discovery lab`, `governance`, `ethics`, `maturity`, `nonprofit`, `church`, `seminary`, `denomination`, `system build`, `sprint`, `four-week`, `FAQ`, `pricing`, `venture builder`, `formation`, `platform`, `tenant`, `AI`, `moratorium`, `experiment`.
3. **Skim** high-hit files; ignore boilerplate (dependencies, unrelated skills).
4. **De-duplicate**: if the same copy appears in Trello export and a polished article, note **both** and which looks newer.

## Output format (required)

Deliver a **single markdown document** (paste in chat or write to a path the human specifies) with these sections:

### A. Executive index table

For each document:

- **Path** (repo-relative)
- **Title / topic**
- **Type** (e.g. canonical essay, draft copy deck, FAQ, code-adjacent spec, persona, research)
- **Primary audience** (movement leader / nonprofit / church / internal / mixed)
- **Last-updated signal** (git date if available, or frontmatter date, or “unknown”)
- **Status**: `candidate-canonical` | `supporting` | `likely-stale` | `template-slop-risk` | `contradicts-other-docs`
- **One sentence** factual summary (no puffery)

### B. Contradiction register

Bulleted list of **topic + doc A vs doc B** + recommendation: “human must choose.”

### C. Gaps register

What the human said is true (e.g. five-stage AI maturity, 100 movement leaders, modular sprints) but **no written doc** supports in repo — list as **gaps** for new writing.

### D. “Do not import” list

Files or sections that are **unsafe** to treat as canonical (reason in five words or fewer).

### E. Recommended next file (optional)

Suggest **one** path in **this** `movemental` repo for a future `docs/content/strategy/` or similar **merged canon** — do not create it unless asked.

## Ground truth anchor for this run

Before searching, read **`docs/notes/mvmtl-running-notes-founder-input-2026-04.md`** in this repo. Use it as **founder ground truth for classification**, not as a source to quote without the human’s approval.

## Invocation (paste below the fold)

> Run the MVMTL cross-repo documentation index per `docs/build/prompts/mvmtl-cross-repo-documentation-index.md`. Search the three listed repositories. Output sections A–E. Start by reading `docs/notes/mvmtl-running-notes-founder-input-2026-04.md`. Do not edit sibling repos.
