# Movemental — running notes (founder input, April 2026)

Working capture from a live conversation. **Not** canonical public copy until reviewed. Use with `docs/build/prompts/mvmtl-cross-repo-documentation-index.md` when reconciling against older docs in sibling repos.

---

## Product truth (software)

- Movemental **does custom software**. Reference implementations of **capability** live in sibling repos (read-only for this org site per `CLAUDE.md`):
  - **`/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch`** — exemplar leader platform (features, depth, patterns).
  - **`/Users/joshuashepherd/Desktop/dev/repos/movemental-ai`** — includes nonprofit dashboard and related documentation.
- **Notion + AI** called out on the current org-site manifesto is understood as **Stitch / placeholder example**, not a committed stack claim for marketing.

---

## AI guidance (tech + adaptive leadership)

- Organizations and leaders need help **navigating AI** as both a **technology** problem and a **human adaptive leadership** problem.
- **Maturity model** (five stages, paraphrased from founder):
  1. **Default / native awareness** — heard about AI; org has not taken conscious, organized action.
  2. **Structured, thoughtful experimentation** — learn and discover valuable use cases (time-saving, money-making, work-quality). **Safety during this phase:** moratorium on **publishing** AI-generated or AI-affected content; moratorium on **sharing private data** with AI. Orgs may allocate intentional time to experiment and **document** use cases.
  3. **Organizational adoption** — governance and ethics; document principles (founder cited **Ray Dalio–style** clarity as an analogy).
  4. **Optimize and improve** — iterative experimentation and documentation.
  5. **Public leadership** — rare today: leaders who **publicly demonstrate mature use of AI** across the organization (contrast to immature org-wide use).

---

## Audiences and visibility

- **Primary customer today:** individual **movement leaders** (relationship / word-of-mouth is the real acquisition path for them).
- **Org site purpose:** make work **visible** and **legitimate** as leaders sign up; leaders are embedded in **nonprofits** and **churches**, so the site must show that **all these groups** are served — **without** declaring a single “primary audience for the next 12 months” in copy (founder preference: show parity of served groups).
- **Movement leaders — cap / positioning:** offering is **explicitly limited to 100 movement leaders** (language **not yet** on movemental.org; needs to be added). Exemplar: Alan Hirsch–style platform in `alan-hirsch` repo. Archetypes mentioned: Alan Hirsch, Brad Brisco — **not** “authors and speakers only”; definition is broader (see index of sibling docs below).

- **Nonprofits vs churches:** **slightly distinct delivery models**. **Churches:** strongly **formation**-shaped; direction for churches is **not fully articulated yet** — OK to leave open. **Seminaries / denominations:** OK not to specify further for now.

---

## Nonprofit modular offers (system builds)

- **Five modular system builds** — any module can be taken standalone. Each is a **four-week sprint** with **clear outcomes**:
  1. **Discovery Lab** — discover valuable AI use cases; document them (aligns with experimentation stage above).
  2. **Governance & ethics** — full documentation of governance and ethics.
  3. **Fundraising** — outcomes include technology distributed to the org: **CRM**, **AI-powered donation engine** (after completing fundraising track).
  4. **Content** (content marketing sense) — **AI-powered content management** analogous to Alan Hirsch platform (after completing content track).
- **Network / SEO angle:** platforms are built for the **organization and connected leaders / stakeholders**; need site copy to show how **linked network** of related voices supports **discovery / SEO** (founder paraphrase — refine when brought over from fuller docs).

---

## Voice / copy hygiene (founder judgment)

- **Manifesto** on org site may be **low-trust / “slop”** — provenance unclear; treat as **candidate for rewrite or demotion** until aligned with the maturity model and modular offers.
- **“Venture builder”** on pricing: that phrase appears in **`src/app/(site)/pricing/page.tsx`** (“We are venture builders for the leaders and organizations…”). In startup vocabulary it usually means a **studio that co-builds products/businesses** with aligned incentives (often equity), as opposed to hourly consulting — **not** necessarily what Movemental means. **Action:** replace with language the founder owns, or define precisely if kept.

---

## Approvals (AI / voice)

- For **movement leaders**, **approval** of AI-affected public voice is anchored in the **leader** (and their process) — detail TBD when merging with written governance docs from sibling repos.

---

## Sibling repo index — “movement leader” and MVMTL narrative (paths only)

Searched **`movemental-ai`** (no full text imported here). High-signal locations:

| Area | Paths |
| --- | --- |
| Why Movemental / network / “100 leaders” | `_docs/site-docs/why-movemental-page/` (`README.md`, `00_ai-brief-why-movemental.md`, `01_copy-deck-why-movemental.md` — closing copy references **one hundred movement leaders** and network), `_docs/site-docs/03_why_movemental_longform.md` |
| Research / exemplar | `_docs/movement_leader_research/alan-hirsch/` (`README.md`, `analysis/movemental-fit.md`, `analysis/content-analysis.md`, `sources.md`) |
| Product / onboarding language | `_docs/type/02_LAYER_1_DATABASE.md` (mentions movement leader onboarding) |

**`alan-hirsch`** repo: sparse top-level `docs/`; **truth is mostly in app code and any `_docs` / CLAUDE patterns** — the cross-repo prompt should enumerate those trees.

---

## Next steps (when you resume)

1. Run **`docs/build/prompts/mvmtl-cross-repo-documentation-index.md`** in Cursor/Claude against the three corpora (this repo + two siblings).
2. Mark each indexed doc: **keep / merge / archive / contradicts April 2026 notes**.
3. Update org-site pages (pricing hero, manifesto, audiences) from the merged canon — separate task.
