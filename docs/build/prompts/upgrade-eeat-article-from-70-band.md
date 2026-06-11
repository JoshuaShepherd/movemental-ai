# Build prompt — upgrade a Band B EEAT article (70–74) to Band A (95+)

**Goal.** Take one staged article from `docs/articles/graded-high/70-74/` and rewrite it until it clears **Band A (85–100)** on the [EEAT research content qualification rubric](../notes/eeat-research-content-qualification-rubric.md), with a realistic target of **95+** when the piece is ready to wire to `/footnotes`, agent KB, or promotion to `docs/articles/`.

**Primary audience for the finished piece:** A tired executive director, board chair, or senior pastor deciding who to hire for AI help — not an internal operator scoring rubrics.

**Read first:**

- [eeat-research-content-qualification-rubric.md](../notes/eeat-research-content-qualification-rubric.md) — all five dimensions and hard gates
- [research prompts README](../research/prompts/README.md) — output shape (executive summary, confidence, counter-arguments, practical recommendations)
- [01-ai-credibility-crisis.md](../../articles/graded-high/85-99/01-ai-credibility-crisis.md) — gold-standard tone: cool-headed, sourced, honest limits
- `.claude/skills/plain-prose/SKILL.md` — strip register-jargon; write for a person, not a deck
- `.claude/skills/movemental-prose/SKILL.md` — opening clarity, bare cross-refs, abstraction anchors, cadence clustering

**Do not conflate with:** `movemental-publish-gate` (ship/no-ship for live site), `movemental-narrative-audit` (doctrine alignment), or `alan-voice` (tenant voice).

---

## Phase 0 — Pick and baseline

1. **Select** one file from `docs/articles/graded-high/70-74/`. Prefer pieces with:
   - Clear org-thesis fit (credibility, stewardship, formation, trust — not leader dossier)
   - A discernible through-line already present
   - Room to add sourcing without inventing a new topic

2. **Score the draft** with the rubric worksheet (dimensions A–E). Record:
   - Weakest dimension (usually **B Evidence** or **D Publication readiness**)
   - Hard gates triggered (B ≤ 5, settled-doctrine duplicate, leader-dossier cap)
   - Duplicate-of links to existing `docs/build/research/articles/` or `graded-high/85-99/`

3. **Stop** if the piece is settled-doctrine duplicate with no new evidence angle — extract claims to a spreadsheet instead of rewriting.

---

## Phase 1 — Structure for Band A (Dimension D → 13–15)

Add or strengthen, in order:

1. **Executive summary** (150–250 words) — what the reader learns, what we claim vs. what we do not, one honest limit.
2. **Through-line** — each H2 advances one argument; cut sections that repeat the same beat.
3. **Confidence labels** on empirical or market claims inline or in a short **Evidence & limits** subsection:

   | Label | Use when |
   |-------|----------|
   | **Sourced** | Named study, report, date, URL or DOI |
   | **Attributed** | Named org or canon doc, no specific edition |
   | **Synthesis** | Movemental inference from multiple sources — say so |
   | **Opinion** | Author judgment, anecdote, or forecast — say so |

4. **Counter-arguments** (3–5 bullets) — what a skeptical board member or research-minded leader would push back on; do not straw-man.
5. **Practical recommendations** — what to do Monday morning (questions, flags, sequence), not only philosophy.
6. **Frontmatter** — add `purpose`, keep `status: eeat-candidate` until promoted; set `published_at` when rewrite completes.

**Target shape:** 1,500–5,000 words; honest synthesis, not marketing.

---

## Phase 2 — Evidence pass (Dimension B → 22–25)

**Hard gate:** B must be **≥ 17** before Band A; **≥ 22** for 95+ target.

1. **Inventory every factual sentence** — stats, dates, market claims, behavioral generalizations.
2. **For each:**
   - Attach a **Sourced** or **Attributed** anchor from `docs/articles/graded-high/85-99/ai-research-archive.md`, `authoritative-sources-ai-nonprofits-faith-formation.md`, Pew, BCG, NIST, or internal canon with explicit scope.
   - **Delete or soften** unsourced headline stats; never leave Contradicted numbers (see `01-ai-credibility-crisis.md`).
3. **Separate layers** — empirical vs ethical vs advocacy (authoritative-sources router).
4. **Anecdotes stay** if labeled **Opinion** and load-bearing for reader recognition — do not fabricate precision.

**Automatic cap reminder:** Thesis depends on a Contradicted stat → fix before any band move.

---

## Phase 3 — Human prose (plain-prose + movemental-prose)

Run **plain-prose** on the full draft:

1. Read for register — consultant-deck English, costume metaphors (`substrate`, `load-bearing`, `leverage`, `surface`, `unpack`).
2. Run costume-or-term-of-art test; keep Movemental terms of art (`formation`, `scenius`, `AI Stewardship Sequence`) with a plain gloss on first use.
3. Read aloud; shorten sentences that stack three abstractions without a concrete anchor.

Run **movemental-prose** checks:

1. **Opening (Critical):** First 60–90 words name who this is for, a concrete situation, and why keep reading.
2. **Bare cross-refs (High):** Collapse body `See [Title]` links into **## Where this connects** at the close — one sentence per link on why it matters *here*.
3. **Unanchored abstractions (High):** Every specialized noun gets a role, artifact, date, or pressure within three sentences.
4. **Cadence clustering (Medium):** Break paragraphs with four+ tricolons or antithesis pairs.

**Priority:** Reader understanding over rubric box-checking. If a rubric section makes the piece harder to read, simplify the section.

---

## Phase 4 — Deployability (Dimension E → 18–20)

1. **Extract ≥ 3 registry-shaped rows** (draft in prose or a table):

   ```text
   claim | cite | confidence | target surface (/footnotes, field-guide, agent KB)
   ```

2. **Map EEAT layers** — at least one explicit example each of Experience, Expertise, Authoritativeness, Trust in the body or summary.
3. **Internal links** — point to live canon in `graded-high/` with correct relative paths; no broken `./this-is-not-a-tools-problem.md` stubs.
4. **No hardcoded unverified stats** on Safety/home-tier surfaces without `[RE-VALIDATE]`.
5. **Disclosure** — author/org interest stated plainly where Movemental appears.

---

## Phase 5 — Re-score and route

Re-run the rubric worksheet. **Target totals:**

| Dimension | 95+ target |
|-----------|------------|
| A Strategic fit | 18–20 |
| B Evidence | 22–25 |
| C Argument load | 17–20 |
| D Publication readiness | 13–15 |
| E Deployability | 18–20 |

**Route:**

| Total | Action |
|-------|--------|
| **≥ 85** | Move file to `docs/articles/graded-high/85-99/`; update `eeat_score_band: 85-99` in frontmatter; update [graded-high README](../../articles/graded-high/README.md) index |
| **70–84** | Stay in band folder; list remaining gaps in a HTML comment at top of file or ticket |
| **< 70** | Do not spend more pipeline time without a scope change |

**Optional promotion:** When ready for `/articles/*`, copy to `docs/articles/` root and run `pnpm articles:check`.

---

## Phase 6 — Publish gate (optional)

Before any public URL, run `.claude/skills/movemental-publish-gate/SKILL.md`. Band A in the rubric ≠ GREEN on the publish gate.

---

## Checklist (copy per run)

```text
Article: 
Baseline band: 
Baseline score (A/B/C/D/E): 

[ ] Executive summary added
[ ] Confidence labels on factual claims
[ ] B ≥ 17 (≥ 22 for 95+ target)
[ ] Counter-arguments section
[ ] plain-prose pass complete
[ ] movemental-prose opening + Where this connects
[ ] ≥ 3 registry-shaped claims extracted
[ ] Frontmatter purpose + eeat_score_band updated
[ ] README index updated
[ ] Re-score total: 
[ ] Moved to 85-99/ (if ≥ 85)
```

---

## Reference calibration

| Piece | Why it scores high |
|-------|-------------------|
| `01-ai-credibility-crisis.md` | Sourced stats, softens broken numbers, counter-evidence, honest scope |
| `ai-stewardship-sequence-field-guide-for-organizational-leaders.md` | Operational sequence, tables, self-diagnostic |
| `finding-ai-guidance-worth-trusting.md` (post-upgrade) | Human discernment guide + sourced limits + checklist wired to canon |

---

*Maintained with the EEAT rubric. Re-calibrate when research prompt 22+ ships or registry requirements change.*
