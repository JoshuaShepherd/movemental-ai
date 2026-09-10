# Full Website Migration — Master Runner & Loop

**Canonical location:** `docs/build/prompts/full-site-migration/master_runner.md`  
**Target agents:** Antigravity / Claude Code / Cursor executing prompts in sequence or via autonomous loop  
**Source handoff:** `docs/handoff/`  
**Target codebase:** `movemental-ai` (Next.js 16.2.3, pnpm)  
**Last updated:** 2026-09-10  

---

## 1. Mandatory Agent Protocol (Every Session)

You are the **Movemental Website Replacement Migration Runner**. Before ending any turn or picking up a task:

1. **Read this file first** when picking up work in a new context window.
2. Follow the **Iterative Loop Execution Protocol** (§2) to advance towards 100%.
3. Build **exclusively in the shadow staging space** (`src/v2/` and `src/app/(site-v2)/v2/...`) until Phase 31. **Never overwrite existing production routes** during intermediate steps.
4. After completing each prompt:
   - Run the child prompt's **Gate command** and **Verification commands**.
   - Update this file: set **Status**, **Last touched**, **Branch**, and **Blockers/Notes**.
   - Update `MIGRATION-STATE.md` at the repo root.
   - Append an entry to the **Session Changelog** (§7).
5. Only when **all prompts FSM-00 through FSM-30 are 100% Done** and all tests pass may FSM-31 (Cutover & Platform Archival) be executed.

**Status values:** `Not started` · `In progress` · `Blocked` · `Done` · `Deferred`

---

## 2. Iterative Loop Protocol (to 100%)

To run this migration autonomously or interactively, execute the following loop:

```text
================================================================================
                    AUTONOMOUS MIGRATION LOOP (to 100%)
================================================================================
INIT:
  1. Inspect master_runner.md status table.
  2. Compute total_prompts = 25, completed_prompts = count("Done").
  3. Print progress percentage: (completed / total) * 100%.

LOOP:
  WHILE completed_prompts < total_prompts:
    a. SELECT next prompt in topological order (Tier 0 -> Tier 4) where
       Status == "Not started" AND all direct dependencies == "Done".
    b. MARK Status = "In progress".
    c. READ:
       - The child prompt file (e.g. 02-home-v4.md)
       - The source design .dc.html (e.g. docs/handoff/designs/Movemental Home v4.dc.html)
       - Authoritative drift rules in docs/handoff/02-drift.md & 03-decisions.md
       - Referenced repo components and data files.
    d. IMPLEMENT:
       - Author components in src/v2/components/...
       - Author page/route in src/v2/app/... or src/app/(site-v2)/v2/...
       - Strictly enforce token mapping (ZERO hex literals in TSX).
       - Ensure fluid layout, Caveat cursive notes, and notebook rule styling.
    e. VERIFY:
       - Run pnpm typecheck
       - Run prompt-specific verification command (or bash run-loop.sh check <ID>)
       - Inspect rendered DOM/preview at http://localhost:3000/v2/...
    f. IF verification fails:
       - Inspect diagnostic errors.
       - Apply targeted remediation.
       - Re-run verification until green.
    g. IF verification succeeds:
       - Check all Definition of Done boxes in the child prompt.
       - MARK Status = "Done", record timestamp in master_runner.md.
       - Log attempt in child prompt's Attempt Log.
       - Append row to Session Changelog.
       - Sync state to MIGRATION-STATE.md.
       - INCREMENT completed_prompts.

EXIT GATE:
  When completed_prompts == 23 (FSM-00 through FSM-22 are Done):
    -> ADVANCE to FSM-30 (Whole-Suite Automated Testing & 1-to-1 Visual Parity).
  When FSM-30 is Done:
    -> ADVANCE to FSM-31 (Production Cutover & Platform Archival).
================================================================================
```

---

## 3. Master Status Table

| Order | ID | Prompt File | Target Surface | Design Source (`docs/handoff/designs/`) | Mode | Status | Last Touched | Gate Check Command |
| ---: | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | FSM-00 | [00-preflight-scaffold-and-tokens.md](./00-preflight-scaffold-and-tokens.md) | Staging scaffold & token foundation | Token definitions in `globals.css` | infra | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-00` |
| 1 | FSM-01 | [01-safety-stage.md](./01-safety-stage.md) | `/agent/path/safety` | `Movemental Safety Stage.dc.html` | model | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-01` |
| 2 | FSM-02 | [02-home-v4.md](./02-home-v4.md) | `/agent` & `/` | `Movemental Home v4.dc.html` | model | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-02` |
| 3 | FSM-03 | [03-reality-map-and-assess.md](./03-reality-map-and-assess.md) | `/assess` | `Movemental Reality Map.dc.html` | model | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-03` |
| 4 | FSM-04 | [04-shared-reality.md](./04-shared-reality.md) | `/share/ai-reality/[token]` | `Movemental Shared Reality.dc.html` | import | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-04` |
| 5 | FSM-05 | [05-audience-editions.md](./05-audience-editions.md) | `/agent/{churches,nonprofits,institutions}` | `Movemental Audience Editions.dc.html` | hybrid | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-05` |
| 6 | FSM-06 | [06-audience-decks.md](./06-audience-decks.md) | `/agent/{...}/deck` | `Movemental Decks.dc.html` | hybrid | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-06` |
| 7 | FSM-07 | [07-program-pricing.md](./07-program-pricing.md) | `/program` | `Movemental Program.dc.html` | import | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-07` |
| 8 | FSM-08 | [08-enroll-flow.md](./08-enroll-flow.md) | `/enroll` | `Movemental Enroll.dc.html` | model | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-08` |
| 9 | FSM-09 | [09-field-guide.md](./09-field-guide.md) | `/field-guide` | `Movemental Field Guide.dc.html` | import | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-09` |
| 10 | FSM-10 | [10-research-hub.md](./10-research-hub.md) | `/research` | `Movemental Research.dc.html` | import | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-10` |
| 11 | FSM-11 | [11-research-paper-detail.md](./11-research-paper-detail.md) | `/research/[slug]` | `Movemental Research Paper.dc.html` | import | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-11` |
| 12 | FSM-12 | [12-research-indexes.md](./12-research-indexes.md) | `/research/findings`, `/sources` | `Movemental Research Indexes.dc.html` | import | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-12` |
| 13 | FSM-13 | [13-articles-hub.md](./13-articles-hub.md) | `/articles` | `Movemental Articles.dc.html` | import | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-13` |
| 14 | FSM-14 | [14-article-detail.md](./14-article-detail.md) | `/articles/[slug]` | `Movemental Article.dc.html` | import | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-14` |
| 15 | FSM-15 | [15-voices-hub.md](./15-voices-hub.md) | `/voices` | `Movemental Voices.dc.html` | import | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-15` |
| 16 | FSM-16 | [16-voice-profile.md](./16-voice-profile.md) | `/voices/[slug]` | `Movemental Voice Profile.dc.html` | import | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-16` |
| 17 | FSM-17 | [17-about-founders.md](./17-about-founders.md) | `/about` | `Movemental About Founders.dc.html` | import | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-17` |
| 18 | FSM-18 | [18-founder-profile.md](./18-founder-profile.md) | `/about/[slug]` | `Movemental Founder Profile.dc.html` | import | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-18` |
| 19 | FSM-19 | [19-how-we-use-ai.md](./19-how-we-use-ai.md) | `/agent/how-we-use-ai` | `Movemental How We Use AI.dc.html` | import | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-19` |
| 20 | FSM-20 | [20-footnotes-eeat-registry.md](./20-footnotes-eeat-registry.md) | `/footnotes` | `Movemental Footnotes.dc.html` | import | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-20` |
| 21 | FSM-21 | [21-utility-shell-and-newsletter.md](./21-utility-shell-and-newsletter.md) | `/newsletter/*` & utility shell | `Movemental Utility Shell.dc.html` | import | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-21` |
| 22 | FSM-22 | [22-dashboard-shell-and-safety.md](./22-dashboard-shell-and-safety.md) | `/dashboard`, `/dashboard/safety` | `Movemental Dashboard.dc.html` | model | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-22` |
| 30 | FSM-30 | [30-full-suite-testing-and-parity-gate.md](./30-full-suite-testing-and-parity-gate.md) | All v2 routes | All 22 `.dc.html` designs | audit | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-30` |
| 31 | FSM-31 | [31-production-cutover-and-platform-archive.md](./31-production-cutover-and-platform-archive.md) | Root production slugs (`src/app/`) | Full platform replacement | cutover | **Done** | 2026-09-10 | `bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-31` |

---

## 4. Execution Tiers & Dependency Flow

```text
Tier 0 — Foundation & Staging Scaffold
  FSM-00  Preflight Scaffold & Token Bridge (unblocks everything)
    │
Tier 1 — Core Public Anchors
  ├── FSM-01  Safety Stage Route (/agent/path/safety) [L-1]
  ├── FSM-02  Home v4 (/agent & /) [L-5]
  ├── FSM-03  Reality Map & Assess (/assess)
  └── FSM-04  Shared Reality Readback (/share/ai-reality/[token])
    │
Tier 2 — Commercial & Decision Surfaces (can parallelize after Tier 1)
  ├── FSM-05  Audience Editions (/agent/{churches,nonprofits,institutions})
  ├── FSM-06  Audience Decks (/agent/{...}/deck)
  ├── FSM-07  Program & Pricing (/program)
  ├── FSM-08  Enroll Flow (/enroll)
  └── FSM-09  Field Guide (/field-guide)
    │
Tier 3 — Editorial & Knowledge Ecosystem (can parallelize after Tier 1)
  ├── FSM-10  Research Hub (/research)
  ├── FSM-11  Research Paper (/research/[slug])
  ├── FSM-12  Research Indexes (/research/findings, /sources)
  ├── FSM-13  Articles Hub (/articles)
  ├── FSM-14  Article Reader (/articles/[slug])
  ├── FSM-15  Voices Hub (/voices) [3 published + 25 scenius]
  ├── FSM-16  Voice Profile (/voices/[slug])
  ├── FSM-17  About Founders (/about)
  ├── FSM-18  Founder Profile (/about/[slug])
  ├── FSM-19  How We Use AI (/agent/how-we-use-ai)
  └── FSM-20  Footnotes EEAT Registry (/footnotes)
    │
Tier 4 — Governance & Utility Surfaces
  ├── FSM-21  Utility Shell & Newsletter
  └── FSM-22  Dashboard Shell & Safety Charter (/dashboard, /dashboard/safety) [S-1 safe]
    │
Tier 5 — 100% Verification Gate
  └── FSM-30  Full-Suite Automated Testing, Zero-Hex, and Playwright E2E
    │
Tier 6 — Atomic Production Cutover
  └── FSM-31  Archive Legacy Platform to archive/platform-v1 and promote v2 to production
```

---

## 5. Global Definition of Done (Runner Level)

A prompt may only be marked **Done** when:

1. [ ] The child prompt's specific **Definition of Done** checklist is 100% verified.
2. [ ] Zero hex literals exist in the touched files (`grep -rE "#[0-9A-Fa-f]{6}"` returns 0).
3. [ ] `pnpm typecheck` exits with code 0.
4. [ ] `pnpm lint` introduces zero new errors.
5. [ ] Touched links and route references resolve cleanly.
6. [ ] The prompt's status in the Master Status Table is set to **Done**.
7. [ ] An entry is appended to the child prompt's **Attempt Log** and to the **Session Changelog** below.

---

## 6. Verification Baseline Commands

Run these before marking any Tier or prompt complete:

```bash
# 1. Typecheck
pnpm typecheck

# 2. Zero-hex scan across candidate files
grep -rE "#[0-9A-Fa-f]{6}" src/v2/ --include="*.tsx" --include="*.ts"

# 3. Route integrity check
pnpm routes:check

# 4. Internal links check
pnpm link:check

# 5. Articles frontmatter check
pnpm articles:check:warn
```

---

## 7. Session Changelog (Append-Only)

| Date | Agent / Operator | Prompt ID | Summary of Changes | Gate Result | Status |
| --- | --- | --- | --- | --- | --- |
| 2026-09-10 | Antigravity | FSM-PACK | Created full website migration prompt suite, runner, and loop harness | ✅ validated | Ready for loop |
