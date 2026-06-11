# Agent room corpus — topic index

Human-readable map of what each file contains and when retrieval should surface it. For machine sync, see [`MANIFEST.json`](./MANIFEST.json).

**Corpus version:** 2026-06  
**Total public documents:** 9 (6 markdown + 3 PDF)

---

## Quick routing

| Visitor asks about… | Primary document | Notes |
|---------------------|------------------|-------|
| Path stages, pricing quick ref | `public/movemental-kb-phase-1.md` | **[LIVE]** pricing |
| Safety stage handbook layers, Safety (facilitated) steps | `public/pdf/safety-field-guide.pdf` | **Canonical** for methodology |
| Sandbox phases, green/yellow/red | `public/pdf/sandbox-field-guide.pdf` | **Canonical** for methodology |
| Company identity, fragmentation thesis | `public/movemental-kb-phase-2.md` | Relay as Movemental framing |
| Scenii, Movement Voices, proof status | `public/movemental-kb-phase-3.md` | Voice count **[LIVE]** |
| Evergreen Engine, article archetypes | `public/pdf/evergreen-engine.pdf` | **Canonical** for Voice content system |
| AI adoption stats (churches, nonprofits) | `public/movemental-kb-phase-4.md` | **[RE-VALIDATE ANNUALLY]** |
| AI research studies, MIT 95%, jagged frontier, Pew | `public/ai-research-archive.md` | Full bibliography + conflation guardrails |
| How Movemental uses AI, site map | `public/movemental-kb-phase-4.md` | Technical detail dated May 2026 |
| Whole-story narrative | `public/movemental-the-talk.md` | Spoken arc, not fact lookup |

**Do not retrieve:** operator onboarding → `internal/` only.

---

## Markdown knowledge base

### `kb-phase-1` — Operating rules, Path, pricing, sources

Parts 0, IV, V, XIII. Summarizes Path and pricing; **defer to Field Guide PDFs** for step-by-step Safety/Sandbox methodology.

### `kb-phase-2` — Identity and thesis

Parts I, II. Fragmentation, authorship, Babel/Pentecost, Ferguson memo framing.

### `kb-phase-3` — Scenii and proof

Parts III, XI. Network model, honest current state, confirmed vs illustrative Voices.

### `kb-phase-4` — AI reality and product surface

Parts VI, VII, IX. AI Reality Paper stats, Movemental AI inventory, site/dashboard surfaces.

### `ai-research-archive` — Verified AI research bibliography

Curated archive of enterprise, academic, and mission-sector AI studies: GenAI Divide (95%), BCG/McKinsey value gaps, jagged frontier experiment, Stanford AI Index, Pew/Ahrefs credibility research, church/nonprofit surveys, FBI IC3 fraud data, Fernandes metacognition study. Includes **conflation guardrails** (MIT 95% ≠ BCG productivity study). **[RE-VALIDATE ANNUALLY]** for sector statistics.

### `narrative-the-talk` — The Talk

15-minute spoken narrative. Use for story requests, not precise facts.

---

## PDF sources (canonical for methodology)

### `field-guide-safety` — It Starts With Safety (Vol 1)

33-page Field Guide. Canonical for Safety stage: five layers, seven artifacts, self-directed walkthrough. Overrides KB summaries when they differ.

**Attributes:** `category=field-guide`, `volume=1`, `path_stage=safety`

### `field-guide-sandbox` — It Continues With Exploration (Vol 2)

48-page Field Guide. Canonical for Sandbox: eight phases, Future Plan, discernment workflow.

**Attributes:** `category=field-guide`, `volume=2`, `path_stage=sandbox`

### `evergreen-engine` — Edition One

Movement Voice content system: article archetypes, pathway components, EEAT gate. Canonical over `kb-phase-3` Evergreen summary.

**Attributes:** `category=methodology`, `domain=movement-voices`

---

## Internal (excluded)

| Document | Why |
|----------|-----|
| `voices-onboarding-walkthrough` | Operator placeholders, sign-in conventions |

---

## Authority hierarchy (retrieval)

1. Live website (`/pricing`, `/assess`, `/field-guides`) for **[LIVE]** facts
2. **Field Guide PDFs** for Safety/Sandbox methodology detail
3. **KB phases** for synthesized answers and cross-topic routing
4. **The Talk** for narrative only — not pricing or stats

---

## Phase 5 backlog

| Content | Blocker |
|---------|---------|
| Training / Technology Field Guides | PDFs not yet added |
| Audience playbooks | OCR |
| Participation Agreement | OCR |
| FAQ verbatim | `/faq` scrape |
