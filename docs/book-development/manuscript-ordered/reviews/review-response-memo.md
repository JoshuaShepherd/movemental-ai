# Review response memo (executed)

**Inputs:** `REVIEW_PATH` = `reviews/publication-review-christianity-today-register.md` (default). `EXECUTION_MODE` = **FULL_MANUSCRIPT** (cross-cutting edits applied in priority order per prompt B3).

**Constitutional reads:** `BOOK_META_OVERVIEW.md`, `BOOK_OUTLINE.md`, `BOOK_VOICE_AND_STYLE_GUIDE.md` (§1), `EDITING_AND_AGENT_GUIDE.md` (§1a, §2–3).

---

## 1) What the review asks you to protect (guardrails)

| Review strength | Guardrail for edits |
| --- | --- |
| Calm diagnosis of credibility collapse | Do not add panic, apocalyptic framing, or new hype stats without sources. |
| Adaptive-leadership reframe (not “learn to code”) | Do not dilute Heifetz / sociotechnical balance when trimming product names. |
| Evidence + humility (Ch 1 style) | Do not remove or soften cited evidence to “make room”; only demote *illustration* density. |
| Ethics with lines (Ch 13 tone) | Do not generalize refusals into vague “be thoughtful”; keep lanes sharp. |
| Honest *scenius* limits (Ch 9) | Do not strip qualification or turn the chapter into uncritical network worship. |
| Unfinished closing (Ch 21) | Do not “resolve” the author arc into triumph or false certainty. |
| First-person guide | Do not flatten to corporate “we” or delete the story in preface / Ch 11. |

---

## 2) Review critique → manuscript action matrix

| Review criticism | Risk if ignored | Primary locations | Action type | Success signal |
| --- | --- | --- | --- | --- |
| Movemental / proper-noun “manifesto” risk | Readers infer the book exists to promote a platform | Ch 1, 3, 6, 8, 9, 12, 17, 19, 20; preface | **Reframe** to generic teams / “this book” / “one build (Ch 11)”; **firewall** in Ch 11 | Principles read standalone; Ch 11 carries named case load |
| Audience gear-shifts (org vs parish) | Pastors bounce off systems-heavy stretches | Ch 3, 12, 17 | **Bridge** + **signpost** | At least two church-shaped anchors in application flow |
| Theology “thin” vs genre | Wrong readers expect a Tanner lecture; others dismiss as shallow | Ch 2 (early), Ch 17 | **Name genre** once clearly; **one parish vignette** in Ch 17 | Honest genre signal without new systematic theology |
| Prompting / tooling aging | Ch 18 competes with blogs that refresh quarterly | Ch 18 | **Demote** vendor/product tokens; **elevate** durable communication doctrine | Timeless verbs; fewer brand-tied examples |

---

## 3) Chapter-level hit list (priority)

| Priority | File | Rationale |
| --- | --- | --- |
| P0 | `02-ai-is-not-a-technological-challenge.md` | Genre signal for “field guide, not systematic theology” |
| P0 | `01-the-credibility-crisis.md` | Demote Movemental in diagnostic chapter |
| P0 | `03-where-we-are-and-why-now.md` | Same + keep discoverability argument |
| P0 | `06-amplification-not-replacement.md` | Same |
| P0 | `08-voice-preservation-as-priority.md` | Rubric language without org lock-in |
| P0 | `09-scenius-as-credibility-solution.md` | “This book” vs org as stretcher of term |
| P0 | `12-pace-and-discernment.md` | Governance example without product frame |
| P0 | `17-ai-and-formation-and-leadership.md` | Parish anchoring + soften internal notes |
| P0 | `18-everything-i-know-about-prompting.md` | Timeless prompting frame |
| P0 | `19-from-gutenberg-to-networks-of-trust.md` | Founder notes without sales subtext |
| P0 | `20-content-that-moves.md` | Internal checks without brand |
| P1 | `00-preface-the-story.md` | One-sentence firewall after naming the project |
| P1 | `11-my-2025-with-ai.md` | Explicit “named case study” signpost |
| P2 | `21-where-i-am-now.md` | Optional light touch only if needed |

---

## 4) Explicit non-goals

- Will not add a new chapter or reopen outline merges (theological integrity stays in Ch 13; practice parameters in Ch 15).
- Will not write a full *theology of technology* or liturgical systematics.
- Will not remove Ch 11’s named build or Alan Hirsch accountability (centerpiece per outline).
- Will not introduce new quantitative claims or citations.
- Will not strip NIST / ISO references where they serve sociotechnical honesty in Ch 2.
- Will not delete the preface’s narrative function—only clarify illustration vs thesis.

---

## 5) `AUTHOR_CONSTRAINTS` lines for follow-up publisher-quality passes

Paste into [`book-chapter-publisher-quality-edit.md`](../../../build/prompts/book-chapter-publisher-quality-edit.md) if you want a second line-edit sweep **after** this pass:

- **Ch 1:** “Keep all statistics and Pew/Ahrefs/CACM claims unchanged; replace Movemental illustration with organization-agnostic wording; preserve closing handoff to Ch 2.”
- **Ch 2:** “Preserve adaptive vs technical frame; keep genre paragraph; no new acronyms.”
- **Ch 3:** “Preserve GEO/E-E-A-T substance; reduce proper-noun dependency; keep ‘no panic’ tempo.”
- **Ch 6, 8, 9, 12:** “Principles-only Movemental mentions; keep scenius limits and COPE link in Ch 8.”
- **Ch 17:** “Keep Mezirow/Smith; preserve nonprofit/church distinction; retain new parish scene.”
- **Ch 18:** “No new tool names; keep principles list and chapter-seven mirror.”
- **Ch 19–20:** “Historical/ethical arc unchanged; anonymize internal note references.”
- **Preface + Ch 11:** “Strengthen firewall: story illustrates thesis; Ch 11 is only heavy proper-noun zone.”

---

## 6) Execution log

**Status: completed** in one agent session. Files touched: `00-preface-the-story.md`, `01-the-credibility-crisis.md`, `02-ai-is-not-a-technological-challenge.md`, `03-where-we-are-and-why-now.md`, `06-amplification-not-replacement.md`, `08-voice-preservation-as-priority.md`, `09-scenius-as-credibility-solution.md`, `11-my-2025-with-ai.md`, `12-pace-and-discernment.md`, `17-ai-and-formation-and-leadership.md`, `18-everything-i-know-about-prompting.md`, `19-from-gutenberg-to-networks-of-trust.md`, `20-content-that-moves.md`. **Movemental** remains where the outline expects a **named case study** (preface, Ch 4 disclaimer, Ch 11, Ch 21 honesty line).

**Quality checks:** Principles without product (Ch 1–3, 6, 8–9, 12, 17–20 no longer *depend* on the name); pastor-in-hurry (Ch 17: Sunday-school opener + Wednesday new-member vignette); honest genre (Ch 2 **Genre, briefly** paragraph).

---

**End of memo.**
