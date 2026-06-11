# Corpus confidence tags — maintainer reference

**Source:** `docs/articles/graded-high/85-99/movemental-research-corpus-v1.md`  
**Not public UI in v1** — internal maintainer vocabulary only.

| Tag | Meaning | Maintainer action |
| --- | --- | --- |
| **VERIFIED** | Primary source confirmed; statistic and attribution accurate as cited | Safe for findings panels, `<Cite />`, and agent KB Tier A/B blocks |
| **QUALIFIED** | Directionally correct but number, source, or wording adjusted from prior Movemental usage | Use qualified wording in public copy; note the correction in changelog |
| **NEW** | Sourced fresh in the verification pass; not previously cited by Movemental | Add to `MASTER_SOURCES` when load-bearing; wire into archive Tier A/B |
| **DROP** | Cannot be verified; recommended for removal | Remove from prose and claims registry; do not resurrect without new primary source |

**Next verification pass:** November 2026 (six-month cadence per corpus front matter).

**Cross-reference:** Stat conflation guardrails live in `src/lib/research/data.ts` header and `ai-research-archive.md` §Do not conflate.
