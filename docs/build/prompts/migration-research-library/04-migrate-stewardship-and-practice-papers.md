# RL-04 — Migrate stewardship and practice papers

**Prompt ID:** RL-04  
**Blocks:** RL-02  
**Batch size:** 3 articles  
**Last updated:** 2026-06-11

---

## 1. Goal

Port **AI Stewardship Sequence** and discernment papers — product-adjacent but EEAT-valid public research.

| Source | Slug | Kind | Shape (frontmatter) |
| --- | --- | --- | --- |
| `finding-ai-guidance-worth-trusting.md` | `finding-ai-guidance-worth-trusting` | Paper | canon |
| `sandbox-discovery.md` | `sandbox-discovery` | Paper | methodology |
| `the-skill-of-ai.md` | `the-skill-of-ai` | Paper | ai-note |

These belong in **`RESEARCH_ITEMS`** (live index), not archive — they are deployable for executives and board members.

---

## 2. Read first

- Stewardship sequence canon: `docs/articles/graded-high/75-79/ai-stewardship-sequence-field-guide-for-organizational-leaders.md`
- `.claude/skills/movemental-narrative-audit/SKILL.md` — run after port, before merge
- Route D exclusion: `who-says-what-an-org-needs.md` is **not** in this batch

---

## 3. Per-article notes

### `finding-ai-guidance-worth-trusting`

- `featured: true` in frontmatter — give index prominence (below flagship)
- Expert vs guide distinction — preserve numbered tests
- Monday-morning recommendations section required
- Canon section `moment` — future `/articles` route may duplicate; research library is **first public ship**

### `sandbox-discovery`

- Four outputs + graduation gate — preserve structured lists
- Links to Safety stage — use plain `/research/…` links only when target exists
- Methodology shape — `ResearchKind: "Paper"` (not a separate enum)

### `the-skill-of-ai`

- Anti-"reskilling" frame — do not soften
- Skills stage sits after Sandbox — sequence order in cross-references: Safety → Sandbox → Skills

---

## 4. Cross-linking between the three

In each body, add a short "In this sequence" aside (margin note or final paragraph):

- Finding guidance → Sandbox → Skills
- Use relative `/research/{slug}` links

---

## 5. Definition of Done

- [x] Three full React bodies + metadata rows in `RESEARCH_ITEMS`
- [x] `finding-ai-guidance-worth-trusting` has `featured`-level index styling (if component supports — else note for RL-06)
- [ ] Narrative audit run; doctrine drift items fixed
- [ ] `pnpm typecheck` green (pre-existing agent-dock error unrelated)
- [x] `master_runner.md` RL-04 updated

---

## §10 Attempt log

| Date | Agent | Outcome | Notes |
| --- | --- | --- | --- |
| 2026-06-11 | — | Pack authored | — |
| 2026-06-11 | Cursor | **In progress** | `sandbox-discovery` live; `the-skill-of-ai` remains |
| 2026-06-11 | Cursor | **In progress** | `finding-ai-guidance-worth-trusting` live + featured; 2 stewardship papers remain |
| 2026-06-11 | Cursor | **Done** | `the-skill-of-ai` body + metadata + Fernandes cite [33]; batch complete (3/3) |
