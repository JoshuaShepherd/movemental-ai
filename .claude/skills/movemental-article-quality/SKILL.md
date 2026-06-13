---
name: movemental-article-quality
description: Score and improve a Movemental article to a publishable 95+ on the article quality rubric — written in our voice, addressed to our audience (not internally), and coherent end to end. Use whenever the user asks to audit, grade, score, raise, fix, or "get to 95" on a docs article, research piece, field guide, or book chapter; whenever an article reads like an internal whitepaper, strategy memo, or research dossier and needs to become reader-facing; and whenever someone asks "is this good enough to publish" or "why is this only an 82". This is the orchestrator over movemental-voice, plain-prose, movemental-prose, movemental-narrative-audit, and movemental-publish-gate — it gives one quality verdict and the exact fix order, rather than making you run four skills by hand.
user-invocable: true
allowed-tools: Read, Write, Edit, Grep, Glob, Skill
---

Score and improve a Movemental article toward 95+: $ARGUMENTS

`$ARGUMENTS` is a file path (an article in `docs/articles/`, `docs/build/research/articles/`, a graded-high band folder, or a book chapter). Prefix with `audit:` to score and produce the fix plan only, `fix:` to apply the plan in place and re-score, or omit for audit-then-fix. If a directory is passed, score every `.md` in it and return a ranked table (worst gap-to-95 first), then ask which to fix. If nothing is given, ask what to audit.

The goal is always the same: **get the article to 95 on the rubric, for a reader, in our voice, without breaking a hard gate.**

---

## Before you start — read these every run

They change between runs; do not work from memory.

1. **The target article**, including its frontmatter (`audience`, `shape`, `slug`, `eeat_score_band`, `status`). The audience field and the path tell you who this is for.
2. **[The quality rubric](../../../docs/build/notes/movemental-article-quality-rubric.md)** — the six dimensions, the hard gates, the band thresholds, and the fix order. This is the scoring instrument. Re-read it; it is the source of truth, not this file.
3. **[movemental-voice](../movemental-voice/SKILL.md)** and its [watchlist](../movemental-voice/references/watchlist.md) — the voice canon and the costume-word list Dimension A enforces.

Then determine the **audience arm** (church, nonprofit, institution, individual leader, or `any`) from frontmatter or context. Every fix is tuned to it.

> Note: `movemental-prose` references `docs/content/terminology-registers.md`, which may not exist. Do not depend on it. Use the costume watchlist in the rubric and in `movemental-voice/references/watchlist.md` instead.

---

## What this skill is and is not

- It **is** the single quality verdict for a reader-facing article: one score, one ordered fix plan, one re-score after fixing.
- It **orchestrates** the specialist skills rather than duplicating them. Each finding routes to the skill that owns the fix (table below). When a dimension needs deep work, invoke that skill via the Skill tool rather than re-deriving its logic here.
- It is **not** the [EEAT qualification rubric](../../../docs/build/notes/eeat-research-content-qualification-rubric.md) (should-we-promote-this), and it is **not** a page UI auditor (`page-audit`). It grades the prose, for a reader.

| Dimension | Owner skill |
|---|---|
| A — Voice & register | `movemental-voice` → `plain-prose` |
| B — Audience address | `movemental-voice` (audience tuning) + `movemental-prose` |
| C — Prose craft | `movemental-prose` |
| D — Coherence & structure | `movemental-narrative-audit` |
| E — Evidence & honesty | `movemental-publish-gate` (gates 2–3) |
| F — Doctrine & refusals | `movemental-narrative-audit` |

---

## Step 1 — Score against the rubric

Read the whole article. Score all six dimensions using the band descriptors in the rubric. For each dimension, you must cite **real quoted text** from the piece — a score with no quote is not a score.

Then check the **seven hard gates**. Any open gate caps the article below 95 no matter the subtotal. The most common one in this corpus is gate 7: **internal-only framing** (the piece is addressed to the team, not the reader).

Produce the scorecard (template in the rubric). Compute the gap to 95 and name which dimensions carry it.

## Step 2 — Build the ordered fix plan

This is the deliverable. Order the fixes by the rubric's fix sequence, because it is also the cheapest path:

> **hard gates → B (audience) → A (voice) → C/D (craft/coherence) → E/F (evidence/doctrine)**

Audience framing is upstream. Reframing an internal note for a reader often dissolves half the register problem before you touch a single costume word — so never start with line-level voice when Dimension B is low.

Each step must be **concrete and checkable**: quote the offending text, name the move, show the rewrite or the specific change, and note which dimension's points it recovers. A step a different editor could not execute from the page is not specific enough.

Use this step shape:

```
### Step N — <move> (recovers ~X pts, Dimension <L>)
**Where:** <section / quoted text>
**Problem:** <one line, in rubric terms>
**Do this:** <the specific edit, with before → after where it helps>
```

End the plan with a **projected re-score**: the expected score per dimension after the plan is executed, confirming it clears 95, and the hard gates it closes.

## Step 3 — Fix mode (if `fix:` or audit-then-fix)

Execute the plan top to bottom with Edit calls. For the heavy dimensions, hand off to the owner skill via the Skill tool:

- Deep register/voice work → invoke `movemental-voice` (`audit:`) on the section, or `plain-prose` for a stubborn passage.
- Line-level craft → invoke `movemental-prose` (`fix:`).
- Doctrine/argument → invoke `movemental-narrative-audit`.

Keep the author's argument and cadence. Josh's voice has real rhythm; do not flatten it to neutral explainer tone. Every edit must trace to a step in the plan.

After editing, **re-score all six dimensions and re-check the hard gates.** Report the before/after score. If it is not yet 95, say what still blocks it and propose the next pass — do not claim 95 you have not reached.

---

## Output

### Audit mode

```
# Article quality audit: <title>

**Path:** <path>
**Audience:** <arm>   **Shape:** <shape>
**Verdict:** SHIP / ONE PASS OUT / NEEDS REVISION / MAJOR REVISION
**Score:** <total>/100   **Gap to 95:** <n> pts

## Scorecard
| Dim | Score | Carries the gap? | One-line reason (with quote) |
| --- | ----- | ---------------- | ---------------------------- |
| A Voice & register    | x/25 | … | "<quote>" |
| B Audience address    | x/20 | … | "<quote>" |
| C Prose craft         | x/15 | … | "<quote>" |
| D Coherence           | x/15 | … | "<quote>" |
| E Evidence & honesty  | x/15 | … | "<quote>" |
| F Doctrine & refusals | x/10 | … | "<quote>" |

**Hard gates open:** <none | gate # + why>

## Ordered fix plan to 95
<the steps, in fix order, each concrete and quoted>

## Projected re-score
| Dim | Now | After plan |
…
**Projected total:** <n>/100 — clears 95: yes/no
```

### Fix mode

After applying: the before→after score table, a bullet list of what changed and which step it executed, any Medium suggestions left unapplied, and an honest statement of whether 95 was reached.

---

## Pre-return checklist

- [ ] Rubric read this run (not from memory); audience arm identified.
- [ ] All six dimensions scored with a real quote each.
- [ ] All seven hard gates checked explicitly.
- [ ] Fix plan ordered hard-gates → B → A → C/D → E/F, every step quoted and checkable.
- [ ] Projected (or, in fix mode, actual re-scored) total stated, and ≥95 only if truly reached.
- [ ] In fix mode, every Edit traces to a step; the author's argument and cadence preserved.
- [ ] No new costume words, unanchored abstractions, or internal framing introduced by the edits.
