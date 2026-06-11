# Research library migration — master runner

**Canonical location:** `movemental-ai/docs/build/prompts/migration-research-library/`  
**Target agent:** Cursor / Claude Code executing one prompt at a time  
**Source corpus:** `docs/articles/graded-high/85-99/` (19 files)  
**Last updated:** 2026-06-11

---

## Mandatory agent protocol (every session)

You are the **research library migration runner**. Before ending any session:

1. **Read this file first** when picking up work in a new context window.
2. Execute prompts in **Recommended order** unless the status table shows a blocker resolved elsewhere.
3. After each prompt, **update this file**:
   - Set **Status**, **Last touched**, **Branch**, **Blockers** in the master table.
   - Append a row to **Session changelog**.
   - Append to the individual prompt's **§10 Attempt log**.
4. Run the **Verification checklist** in [README.md](./README.md) for every touched area.
5. Run **`movemental-publish-gate`** before marking RL-08 Done.

**Never** mark a row **Done** without checked Definition of Done in the child prompt **and** a green verification checklist.

---

## Master status table

| Order | ID | Prompt | Status | Last touched | Branch | Blockers / notes |
| ---: | --- | --- | --- | --- | --- | --- |
| 0 | RL-00 | [00-preflight-inventory-and-routing-matrix.md](./00-preflight-inventory-and-routing-matrix.md) | **Done** | 2026-06-11 | — | Matrix validated §10; flagship = Option A `ai-credibility-crisis` |
| 1 | RL-01 | [01-content-model-and-body-pipeline.md](./01-content-model-and-body-pipeline.md) | **Not started** | — | — | Blocks on RL-00 routing approval |
| 2 | RL-02 | [02-sources-findings-and-citations.md](./02-sources-findings-and-citations.md) | **Done** | 2026-06-11 | — | MASTER_SOURCES 18 rows; 4th findings panel (BCG); conflation comments |
| 3 | RL-03 | [03-migrate-research-series-batch-a.md](./03-migrate-research-series-batch-a.md) | **Done** | 2026-06-11 | — | 7/7 batch A readers wired; browser spot-check 01/11/16 pending |
| 4 | RL-04 | [04-migrate-stewardship-and-practice-papers.md](./04-migrate-stewardship-and-practice-papers.md) | **Done** | 2026-06-11 | — | 3/3 stewardship papers live on index |
| 5 | RL-05 | [05-migrate-thesis-and-narrative-papers.md](./05-migrate-thesis-and-narrative-papers.md) | **Done** | 2026-06-11 | — | 3/3 thesis/narrative papers live |
| 6 | RL-06 | [06-flagship-and-index-refresh.md](./06-flagship-and-index-refresh.md) | **Done** | 2026-06-11 | — | 6 live + 7 archive; prototype stubs removed |
| 7 | RL-07 | [07-reference-layer-and-agent-kb-sync.md](./07-reference-layer-and-agent-kb-sync.md) | **Done** | 2026-06-11 | — | Agent KB synced; corpus stub; Section 1 backlog; sources intro |
| 8 | RL-08 | [08-qa-parity-and-eeat-signoff.md](./08-qa-parity-and-eeat-signoff.md) | **Done** | 2026-06-11 | — | QA signoff doc; typecheck+build green; lint YELLOW repo-wide |
| — | RL-90 | [90-deferred-surfaces.md](./90-deferred-surfaces.md) | **Done** | 2026-06-11 | — | PDF buttons hidden; print relabeled; copy honest |

**Status values:** `Not started` · `In progress` · `Blocked` · `PR open` · `Done` · `Deferred`

---

## Recommended execution order

```text
RL-00  Preflight inventory + per-file routing matrix
  ↓
RL-01  Content model + body pipeline conventions
  ↓
RL-02  Sources, findings, citation layer
  ↓
RL-03  Research series batch A (01, 02, 03, 05, 09, 11, 16)  ← can overlap RL-04/05 after RL-02
RL-04  Stewardship papers (finding-ai-guidance, sandbox, skill)
RL-05  Thesis + narrative (credibility-thesis, crisis, fragmentation cost)
  ↓
RL-06  Flagship swap + library index refresh
  ↓
RL-07  Reference layer + agent KB sync
  ↓
RL-08  QA parity + EEAT signoff
  ↓
RL-90  PDF / search / articles route (operator request only)
```

**One prompt per PR** when possible. RL-03, RL-04, and RL-05 may ship as separate PRs once RL-02 lands.

---

## Current baseline (2026-06-11)

| Asset | State |
| --- | --- |
| `/research` routes | Live — index, findings, sources, `[slug]` |
| HTML prototype | `public/templates/library/ink-research/` — reference only |
| `RESEARCH_ITEMS` | **6** live (Band A) + **7** archive rows — all full bodies |
| `article-bodies.tsx` | **13** full bodies |
| Band A corpus | 19 files in `docs/articles/graded-high/85-99/` — **13 readers wired** |
| Agent KB archive | `docs/build/agents/agent-room/files/public/ai-research-archive.md` — exists; verify parity in RL-07 |

**Flagship (RL-00 / RL-06):** `ai-credibility-crisis` — *The AI Credibility Crisis* (Option A). Prototype slugs removed.

---

## Session changelog

| Date | Prompt | Summary |
| --- | --- | --- |
| 2026-06-11 | — | Migration pack authored; all prompts Not started |
| 2026-06-11 | RL-00 | Validated 19-file routing matrix; flagship = `ai-credibility-crisis` (Option A); graded-high SSOT over research/articles |
| 2026-06-11 | RL-02 | Expanded MASTER_SOURCES (18), BCG findings panel, conflation guardrails, sources page intro |
| 2026-06-11 | RL-03/06 | Flagship `ai-credibility-crisis` live — body, index row, findings/footer links; removed `ai-reality-paper` |
| 2026-06-11 | RL-03 | `scenius-network-credibility` + `publishing-economics` full readers in archive; MASTER_SOURCES +3 (Authors Guild, Substack, Pew streaming) |
| 2026-06-11 | RL-03 | `seo-geo-discoverability` full reader in archive; MASTER_SOURCES +2 (Google SQG, GEO paper) |
| 2026-06-11 | RL-03 | `trust-verification` full reader in archive; MASTER_SOURCES +2 (Reuters DNR 2025, Stanford HAI labeling brief) |
| 2026-06-11 | RL-03 | `voice-preservation` + `convergence-thesis` — batch A complete (7/7); MASTER_SOURCES +5 (Pew disclosure, Hu, Ippolito, COPE, Dwivedi) |
| 2026-06-11 | RL-04 | `finding-ai-guidance-worth-trusting` on live index (featured); replaced prototype `the-drive-you-already-trust` |
| 2026-06-11 | RL-04 | `the-skill-of-ai` full reader on live index; MASTER_SOURCES +1 (Fernandes CHB 2026); RL-04 complete (3/3) |
| 2026-06-11 | RL-05 | `credibility-thesis` full reader on live index (10-section TOC); unsettled stats qualified via crisis audit links |
| 2026-06-11 | RL-05 | `the-credibility-crisis` narrative chapter live; MASTER_SOURCES +2 (Ahrefs, Cooke CACM); paired near credibility-thesis |
| 2026-06-11 | RL-05 | `the-cost-of-fragmentation` live — 4 audience sections, 8 currencies, Edelman cite, `/fragmentation` link; RL-05 complete (3/3) |
| 2026-06-11 | RL-04 | `sandbox-discovery` on live index; four outputs + graduation gate preserved |
| 2026-06-11 | RL-07 | Agent-room archive synced to graded-high; corpus v1 archive stub; Section 1 footnote backlog; sources layer intro; corpus-confidence-tags maintainer doc |
| 2026-06-11 | RL-06 | Index refresh: 6 live rows (narrative order), 7 archive rows; removed prototype stubs (`the-moment-of-authorship`, `the-governance-gap`, `augmentation-over-replacement`); moved `the-credibility-crisis` to archive |
| 2026-06-11 | RL-08 | QA signoff — stat audit pass, publish gate GREEN on 4 samples, markdown SSOT sync, `docs/build/qa/research-library/RL-08-signoff.md` |
| 2026-06-11 | RL-90 | Deferred-surface hygiene — hid index PDF actions; article footer → "Print this page"; hero/metadata copy no longer promises PDF |

---

## Global Definition of Done (runner level)

- [x] All **Route A** files (13) have `ResearchItem` rows + full React bodies (no stubs)
- [x] All **Route B** files (4) wired into sources and/or findings; no orphan stats
- [x] **Route D** files (2) explicitly excluded from `/research` with documented alternate home
- [x] Flagship row reflects real Band A content, not prototype lorem
- [x] `pnpm typecheck` green (`agent-dock.tsx` boolean fix)
- [ ] `pnpm lint` green — **YELLOW**: 14 pre-existing errors outside research (see RL-08 signoff)
- [x] `movemental-publish-gate` GREEN on flagship + 3 sampled readers (crisis, scenius, finding-ai-guidance)
- [x] Agent-room `ai-research-archive.md` in sync with live findings panels
- [x] No conflated headline stats (MIT 95% / BCG 5% / McKinsey 6% — see archive §Do not conflate)
