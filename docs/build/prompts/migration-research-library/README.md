# Research library migration — graded EEAT articles → `/research` React

**Canonical location:** `movemental-ai/docs/build/prompts/migration-research-library/`  
**Source corpus:** `docs/articles/graded-high/85-99/` (19 Band A files, imported 2026-06-11)  
**Target surface:** `/research` — already migrated from `public/templates/library/ink-research/` HTML to React  
**Out of scope for this pack:** `/articles/*` markdown routes (not live yet), PDF generation, full-text search, agent SSE — see [90-deferred-surfaces.md](./90-deferred-surfaces.md).

---

## What this pack is

A **sequenced agent prompt program** to wire Band A EEAT articles into the live research library:

| Layer | Location | Role |
| --- | --- | --- |
| Index + archive | `src/lib/research/data.ts` | `RESEARCH_ITEMS`, `RESEARCH_ARCHIVE`, kinds, abstracts, TOC, source rails |
| Findings | `src/lib/research/data.ts` | `FINDINGS_*` stat panels and trust charts |
| Master sources | `src/lib/research/data.ts` | `MASTER_SOURCES` registry |
| Article bodies | `src/components/research/article-bodies.tsx` | Full-read React prose keyed by slug |
| Pages | `src/app/research/` | Index, `[slug]`, `/findings`, `/sources` |
| Styles | `src/components/research/research.module.css` | Ink research reader (ported from `ink-research/css/main.css`) |

**Execute in order.** Start with [`master_runner.md`](./master_runner.md).

The 19 source files are **not one shape**. This pack routes each file to the correct surface (full reader, findings/sources only, agent KB, or excluded internal playbook) before any React porting begins.

---

## Source of truth hierarchy

1. **Band A corpus:** `docs/articles/graded-high/85-99/*.md` — canonical prose until promoted to `docs/build/research/articles/` or `docs/articles/`.
2. **Existing research series:** `docs/build/research/articles/` — check for duplicates before adding index rows (several 85–99 files mirror this tree).
3. **HTML prototype (visual canon):** `public/templates/library/ink-research/` — layout, typography, three-column reader; **do not** re-port CSS; match existing React components.
4. **Live React:** `src/components/research/` + `src/lib/research/data.ts` — implementation target.
5. **Agent KB mirror:** `docs/build/agents/agent-room/files/public/ai-research-archive.md` — keep in sync when archive stats change.
6. **EEAT rubric:** [eeat-research-content-qualification-rubric.md](../../notes/eeat-research-content-qualification-rubric.md) — promotion gates.

When markdown and `docs/build/research/articles/` disagree, **prefer the graded-high 85–99 copy** (newer triage pass) unless the research-series file has a more recent `published_at`.

---

## Article routing summary (19 files)

| Route | Count | Files |
| --- | ---: | --- |
| **A — Full `/research/[slug]` reader** | 13 | Research series + stewardship + thesis/narrative (see [00](./00-preflight-inventory-and-routing-matrix.md)) |
| **B — Sources + findings only** | 4 | `ai-research-archive`, `authoritative-sources-*`, `movemental-research-corpus-v1`, `section-1-research-and-references` |
| **C — Agent KB / internal reference** | 2 | Overlap of B; also sync agent-room archive |
| **D — Do not publish on `/research`** | 2 | `linking-strategy-eeat-geo-playbook`, `who-says-what-an-org-needs` (ops playbooks — `/footnotes` + internal docs only) |

---

## Prompt index

| Order | ID | Prompt | Primary focus | Blocks |
| ---: | --- | --- | --- | --- |
| 0 | RL-00 | [00-preflight-inventory-and-routing-matrix.md](./00-preflight-inventory-and-routing-matrix.md) | Per-file routing, duplicate scan, flagship decision | — |
| 1 | RL-01 | [01-content-model-and-body-pipeline.md](./01-content-model-and-body-pipeline.md) | `ResearchItem` schema, body registry, markdown→React rules | RL-00 |
| 2 | RL-02 | [02-sources-findings-and-citations.md](./02-sources-findings-and-citations.md) | `MASTER_SOURCES`, `FINDINGS_*`, `<Cite>` wiring | RL-01 |
| 3 | RL-03 | [03-migrate-research-series-batch-a.md](./03-migrate-research-series-batch-a.md) | 01, 02, 03, 05, 09, 11, 16 | RL-02 |
| 4 | RL-04 | [04-migrate-stewardship-and-practice-papers.md](./04-migrate-stewardship-and-practice-papers.md) | finding-ai-guidance, sandbox, skill-of-ai | RL-02 |
| 5 | RL-05 | [05-migrate-thesis-and-narrative-papers.md](./05-migrate-thesis-and-narrative-papers.md) | credibility-thesis, credibility-crisis, cost-of-fragmentation | RL-02 |
| 6 | RL-06 | [06-flagship-and-index-refresh.md](./06-flagship-and-index-refresh.md) | Replace prototype flagship; index + archive rows | RL-03–05 |
| 7 | RL-07 | [07-reference-layer-and-agent-kb-sync.md](./07-reference-layer-and-agent-kb-sync.md) | Archive, corpus, authoritative-sources, section-1 | RL-02 |
| 8 | RL-08 | [08-qa-parity-and-eeat-signoff.md](./08-qa-parity-and-eeat-signoff.md) | Visual QA, publish gate, footnote registry rows | RL-06, RL-07 |
| — | RL-90 | [90-deferred-surfaces.md](./90-deferred-surfaces.md) | PDF, search, `/articles` promotion | RL-08 |

---

## Target directory map (after migration)

```text
src/
  app/research/
    page.tsx                    # Library index
    [slug]/page.tsx             # Article reader
    findings/page.tsx           # Stat panels
    sources/page.tsx            # Master source list
  components/research/
    article-bodies.tsx          # Slug → React body (grow from 1 → 13+ entries)
    research-article.tsx        # Three-column reader shell
    research.module.css         # Ink research styles (already ported)
  lib/research/
    data.ts                     # Items, findings, master sources
docs/articles/graded-high/85-99/  # Staging — promote when live
docs/build/research/articles/      # Research series SSOT (sync after migration)
```

---

## Skills (read when relevant)

| Skill | When |
| --- | --- |
| `.claude/skills/plain-prose/SKILL.md` | Before editing any body copy during port |
| `.claude/skills/movemental-prose/SKILL.md` | Line-level pass on ported readers |
| `.claude/skills/movemental-publish-gate/SKILL.md` | RL-08 signoff before calling any piece public |
| `.claude/skills/movemental-narrative-audit/SKILL.md` | Thesis + stewardship papers only |
| `.claude/skills/tailwind-cleanup/SKILL.md` | If adding classes outside `research.module.css` |

**Markdown → React decomposition** (same pattern as ink-research HTML migration):

1. Map H2/H3 → `<h3>` + `id` anchors matching `ResearchItem.sections`.
2. Map blockquotes → `styles.articleBlockquote`; margin asides → `styles.marginNote`.
3. Map `[n]` citations → `<Cite n={n} title="…" />` linked to `/research/sources`.
4. First paragraph → `styles.dropCap` when the prototype used a drop cap.
5. Keep prose in React for v1; do **not** introduce MDX until RL-90.

---

## Verification checklist (run after each prompt)

| Check | Command / action | Pass criterion |
| --- | --- | --- |
| TypeScript | `pnpm typecheck` | Zero errors |
| Lint | `pnpm lint` | No new errors in touched files |
| Dev server | `pnpm dev` → `/research` | Index renders all new rows |
| Reader | `/research/[slug]` for each migrated slug | Body renders; TOC scroll-spy works when sections exist |
| Sources | `/research/sources` | New registry rows + callouts |
| Findings | `/research/findings` | Stat panels match archive (no conflated stats) |
| Publish gate | `movemental-publish-gate` on flagship | GREEN or documented YELLOW items |
| Agent KB | Diff agent-room `ai-research-archive.md` | In sync with RL-07 |

Use Chrome DevTools MCP for browser verification when available.

---

## Relationship to other pipelines

| Pipeline | Relationship |
| --- | --- |
| [upgrade-eeat-article-from-70-band.md](../upgrade-eeat-article-from-70-band.md) | Brings 70–74 **up** to Band A; this pack **deploys** Band A to `/research` |
| [research prompts README](../../research/prompts/README.md) | Original 01–21 research threads; many 85–99 files are outputs of those prompts |
| [migration-agentic-front-end](../migration-agentic-front-end/README.md) | Separate surface (`/agent` Ink Band); do not mix tokens |
| `docs/articles/` + `src/lib/articles.ts` | Future home for **canon** and **story** shapes that need editorial layout outside the research table UI |
