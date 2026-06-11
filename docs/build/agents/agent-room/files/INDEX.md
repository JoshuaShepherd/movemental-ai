# Agent room corpus — topic index

Human-readable map of what each file contains and when retrieval should surface it. For machine sync, see [`MANIFEST.json`](./MANIFEST.json).

**Corpus date:** May 2026  
**Total public documents:** 5 (~128 KB)

---

## Quick routing (for prompt authors)

| Visitor asks about… | Primary document | KB part |
|---------------------|------------------|---------|
| Path stages, SafeStart, Sandbox, Skills, Solutions | `public/movemental-kb-phase-1.md` | Part IV |
| Pricing, engagement terms, Voice compensation | `public/movemental-kb-phase-1.md` | Part V |
| Operating rules, conflicts, source authority | `public/movemental-kb-phase-1.md` | Parts 0, XIII |
| What Movemental is, founders, origin story | `public/movemental-kb-phase-2.md` | Part I |
| Fragmentation, authorship, Babel/Pentecost thesis | `public/movemental-kb-phase-2.md` | Part II |
| Scenii, scenius, five-node anatomy, GEO | `public/movemental-kb-phase-3.md` | Part III |
| What's proven vs forthcoming, Voice roster care | `public/movemental-kb-phase-3.md` | Part XI |
| Church/nonprofit AI adoption stats | `public/movemental-kb-phase-4.md` | Part VI |
| How Movemental uses AI, voice fidelity, agents | `public/movemental-kb-phase-4.md` | Part VII |
| Site pages, dashboards, contact, assessments | `public/movemental-kb-phase-4.md` | Part IX |
| Whole-story narrative (spoken arc) | `public/movemental-the-talk.md` | — |

**Do not retrieve for:** operator onboarding steps → `internal/` only.

---

## Document catalog

### `kb-phase-1` — Operating rules, Path, pricing, sources

| Section | Topics | Retrieval notes |
|---------|--------|-----------------|
| Part 0 | Agent operating rules (7 rules) | Use when agent behavior questions arise |
| Part IV | Four-stage Path, Field Guides, traps | Canon-aligned; prefer prompt §5 for tier prices |
| Part V | Engagement + end-user pricing | **[LIVE]** — verify `/pricing` before quoting |
| Part XIII | Source register, conflicts, authority hierarchy | Use for `[CONFLICT]` resolution guidance |

**OpenAI attributes:** `category=knowledge-base`, `phase=1`, `domain=path-pricing`

---

### `kb-phase-2` — Identity and thesis

| Section | Topics | Retrieval notes |
|---------|--------|-----------------|
| Part I | Company identity, founders, posture, cap-100 | Voice count is **[LIVE]** |
| Part II | Fragmentation, slop, authorship, Ferguson memo | Relay as Movemental framing, not independent fact |

**OpenAI attributes:** `category=knowledge-base`, `phase=2`, `domain=identity-thesis`

---

### `kb-phase-3` — Scenii and proof

| Section | Topics | Retrieval notes |
|---------|--------|-----------------|
| Part III | Scenii model, four moves, Evergreen Engine, moat | Strategic framing |
| Part XI | Honest current state, confirmed vs named Voices | Never quote placeholders as facts |

**OpenAI attributes:** `category=knowledge-base`, `phase=3`, `domain=scenii-proof`

---

### `kb-phase-4` — AI reality and product surface

| Section | Topics | Retrieval notes |
|---------|--------|-----------------|
| Part VI | AI Reality Paper stats (churches, nonprofits, institutions) | **[RE-VALIDATE ANNUALLY]** |
| Part VII | Movemental's own AI use, inventory summary | Technical detail; cite inventory date |
| Part IX | Site map, dashboards, FAQ surface (not verbatim) | **[LIVE]** nav and URLs |

**OpenAI attributes:** `category=knowledge-base`, `phase=4`, `domain=ai-reality-product`

---

### `narrative-the-talk` — The Talk

Spoken 15-minute arc: reader trust → fragmentation → Scenii → Path → refusals. Use when visitor wants the **story** rather than a fact lookup. Lower precision chunking (600 tokens) preserves narrative flow.

**OpenAI attributes:** `category=narrative`, `phase=0`, `domain=spoken-narrative`

---

## Internal (excluded from upload)

| Document | Why excluded |
|----------|--------------|
| `voices-onboarding-walkthrough` | Operator placeholders, sign-in password convention, per-recipient credential slots |

---

## Known conflicts (do not merge in retrieval)

Documented in `kb-phase-1` Part XIII:

1. **Assessment specs** — question count, time, dimensions differ across sources → verify `/assess`
2. **Safety Guidebook framing** — five layers vs seven artifacts mapping incomplete
3. **Movement Voice count** — twenty-five vs "the hundred" across docs → check live source
4. **Tagline** — two variants in corpus → confirm live site

---

## Phase 5 backlog (not yet in corpus)

| Planned content | Blocker |
|-----------------|---------|
| Audience playbooks (church, nonprofit, institution, leader) | OCR image-only playbooks |
| Participation Agreement verbatim | OCR |
| FAQ verbatim (~59 questions) | Live `/faq` scrape |
| Field Guide full text | PDF export + upload as separate docs |

When added, create new `public/` files with frontmatter and manifest entries — do not append to phase files (keeps chunk boundaries stable).
