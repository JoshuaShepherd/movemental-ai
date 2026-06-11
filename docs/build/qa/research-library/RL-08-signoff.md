# RL-08 — Research library QA signoff

**Date:** 2026-06-11  
**Agent:** Cursor  
**Verdict:** **GREEN** (migration signoff) with documented deltas below

---

## 1. Visual parity (HTML prototype → React)

Reference: `public/templates/library/ink-research/`  
Live: `/research`, `/research/[slug]`, `/research/findings`, `/research/sources`

| Page | Prototype | React | Status | Notes |
| --- | --- | --- | --- | --- |
| Library index | `index.html` | `/research` | **Green** | `research-library.tsx` — hero, rows, archive load; margin notes desktop/mobile split matches CSS |
| Article reader | `article.html` | `/research/ai-credibility-crisis` | **Green** | `articleLayout` three-column grid (TOC · body · sources rail); drop cap, numbered lists, margin notes in bodies |
| Findings | `findings.html` | `/research/findings` | **Green** | Stat panels + trust charts; hero margin note |
| Sources | `sources.html` | `/research/sources` | **Green** | Master list + callouts; layer intro (RL-07) |

**Deltas (accepted):**

- Prototype header nav still shows placeholder audience links; live `ResearchHeader` uses production IA.
- Flagship content is Band A `ai-credibility-crisis`, not prototype lorem *AI Reality Paper*.
- Mobile TOC: sticky scroll-spy via `ArticleToc`; prototype used static links — behavior equivalent, not pixel-identical.
- Screenshots not captured: Chrome unavailable in WSL (`user-chrome-devtools` could not launch stable channel). Structural parity verified via component/CSS audit.

---

## 2. Stat integrity audit

Source: `ai-research-archive.md` §Do not conflate

| Check | Result |
| --- | --- |
| `FINDINGS_STAT_PANELS` (4 panels) | **Pass** — Virtuous 92/7, Barna 60/5, McKinsey 88/6, BCG 60/5; each panel cites one study pair |
| `FINDINGS_HERO.lede` | **Pass** — no merged MIT/BCG/McKinsey headline |
| `<Cite>` in 13 bodies | **Pass** — indices map to `MASTER_SOURCES`; jagged-frontier (9) separate from BCG value gap (4) |
| Debunked "68%" | **Pass** — only appears in flagship/crisis bodies as *debunk* section, not as cited fact |

---

## 3. Publish gate (sampled set)

| Asset | Verdict | Notes |
| --- | --- | --- |
| Flagship `ai-credibility-crisis` | **GREEN** | Evidence audit tone; debunks 68%; named sources via `<Cite>` |
| `finding-ai-guidance-worth-trusting` | **GREEN** | Limits claims; jagged frontier + BCG 2024 cited separately |
| `scenius-network-credibility` | **GREEN** | Honest limits section; no public "Scenius" H1 drift |
| Agent-room `ai-research-archive.md` | **GREEN** | Tier A/B/C structure; conflation block; debunked table |

**YELLOW (non-blocking):**

- `/research` readers not yet in `eeat-site-claims.json` row-per-claim registry — follow-up when `/footnotes` wires research chips (RL-08 §5).

---

## 4. Footnote registry (Route A)

13 Route A slugs have full React bodies. Registry script not implemented; manual spot-check:

- Flagship + stewardship papers: ≥3 sourced claims each via `<Cite n={} />` → **Pass**
- Full `eeat-registry` rows for every research reader: **Deferred** — file gaps as follow-up, per prompt

---

## 5. Route coverage

| Route | Count | Status |
| --- | ---: | --- |
| A — full readers | 13 | All in `BODY_REGISTRY` + index/archive rows |
| B — reference layer | 4 | Findings, MASTER_SOURCES, agent KB, Section 1 backlog |
| D — excluded | 2 | `linking-strategy-eeat-geo-playbook`, `who-says-what-an-org-needs` → internal/`/footnotes` only (RL-00) |

---

## 6. Build verification

| Command | Result |
| --- | --- |
| `pnpm typecheck` | **Green** (fixed `agent-dock.tsx` `showWaysInButton` boolean) |
| `pnpm build` | **Green** — 14 `/research/[slug]` paths SSG |
| `pnpm lint` | **YELLOW** — 14 pre-existing errors repo-wide (agent-room, assessment); **zero errors** in `src/components/research/` after unused-import fix |

---

## 7. Promotion (markdown SSOT)

- Synced 13 Route A files: `docs/articles/graded-high/85-99/` → `docs/build/research/articles/`
- Updated `docs/articles/graded-high/README.md` — Band 85–99 wired notes
- RL-90 defers `/articles` root promotion and PDF
