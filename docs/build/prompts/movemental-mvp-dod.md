# Prompt: Author the Definition of Done for the movemental.ai MVP (public site, excluding the dashboard)

**Target agent:** Claude Code (Opus 4.7 or equivalent capable coding agent) running in this repo.
**Audience for review:** Founders (Joshua Shepherd primary), engineering, content. The completed DoD will be reviewed line-by-line before any MVP "ship" decision.
**Repo / surface:** `01-Movemental-Core/movemental-ai` — public (unauthenticated) site under `src/app/(site)/**`. Excludes everything under `src/app/(dashboard)/**` and `src/app/(studio)/**`.
**Output file:** `docs/build/DOD/movemental-mvp-dod.md` (write or update — do not duplicate elsewhere)
**Last updated:** 2026-05-12

---

## 1. Role and stance

You are a senior product engineer + editorial QA partner. You write Definitions of Done the way an honest launch lead would — every line is something a human or CI step can verify before saying "ship." You favor concrete, observable checks over aspirational language. You treat the public site as a single conversion system, not a pile of independent pages.

Read before you write. Cite files with `path:line` ranges. Do not invent routes, components, or stakeholders. When the canon (`CLAUDE.md`, `docs/design/DESIGN.md`, `docs/build/strategy/movement-leaders-as-ecosystem-layer.md`) contradicts something you'd otherwise assume, the canon wins and you note the divergence.

---

## 2. Goal

Produce a single, durable Definition of Done at `docs/build/DOD/movemental-mvp-dod.md` that — when every checkbox is ticked — means the **early-stage MVP of movemental.ai is shippable to a first wave of strangers** (cold visitors, qualified leaders, and warm intros from Alan / Brad / Joshua). The DoD is **page-by-page** for public surfaces, **plus** the cross-cutting systems (SEO, EEAT/evidence, analytics, contact/newsletter, accessibility, performance, narrative integrity) that make the pages function as a conversion system.

The dashboard is **out of scope** — it has its own DoD at [`docs/build/DOD/movemental-dashboard-dod.md`](../DOD/movemental-dashboard-dod.md). Link to it; do not duplicate it.

---

## 3. Context — only what's load-bearing

- **Why now:** First-wave outreach is imminent; the site is well into the Stitch migration but has never had a public "is it done?" checklist. Founders want a single artifact they can drive against rather than a vibes-based ship call.
- **Site routes (single source of truth):** Enumerate from [`src/app/sitemap.ts`](../../../src/app/sitemap.ts) — that file is the curated public route list. Cross-check by scanning `src/app/(site)/**/page.tsx` for drift; if a page exists in code but not in sitemap (or vice versa), flag it.
- **Design quality bar:** [`docs/design/DESIGN.md`](../../design/DESIGN.md) — Digital Curator spec. Semantic tokens only; light default with optional dark; no 1px sectioning borders; Inter only; `#0053db` primary used sparingly; Ghost Lift (tonal stacking) over drop shadows.
- **Canonical doctrine that copy must not violate:**
  - [`docs/build/strategy/movement-leaders-as-ecosystem-layer.md`](../strategy/movement-leaders-as-ecosystem-layer.md) — movement leaders are a trusted-voice ecosystem layer, **not** a fourth audience card beside churches / nonprofits / institutions. Public label default: **"Trusted voices"**.
  - `CLAUDE.md` — overall narrative, design rules, stack constraints.
- **Existing audits that feed the DoD (read, don't re-do):**
  - [`docs/build/audits/movemental-site-audit-2026-05-11.md`](../audits/movemental-site-audit-2026-05-11.md)
  - [`docs/build/notes/site-pages-architecture-and-navigation-map.md`](../notes/site-pages-architecture-and-navigation-map.md)
  - [`docs/build/notes/homepage-ia-and-eeat-consultation-2026-05-12.md`](../notes/homepage-ia-and-eeat-consultation-2026-05-12.md)
  - [`docs/build/notes/movement-leader-information-kinds-inventory.md`](../notes/movement-leader-information-kinds-inventory.md)
- **Structural model to mirror exactly:** [`docs/build/DOD/movemental-dashboard-dod.md`](../DOD/movemental-dashboard-dod.md). The MVP DoD reuses sections 1 (How to use), 2 (Context already known), 3 (DoD registry — immutable rows), 4 (Single next-prompt queue), 5 (Append-only attempt log), 6 (Links). Keep the same prose and rule structure for sections 1.1–1.4 verbatim with surface name swapped.
- **Constraints:**
  - DoD rows must be observable by a stranger in 60 seconds (open page → check criterion → tick or untick). No "feels right" criteria.
  - Each criterion gets a stable `MVP-NN` ID for cross-reference; once assigned, IDs never change.
  - Tier the rows by ship priority using sitemap.ts as the proxy: **P1 (≥0.85)** = blocking MVP ship, **P2 (0.6–0.84)** = ship in first 30 days post-launch, **P3 (<0.6)** = post-launch acceptable.

---

## 4. Definition of Done — for THIS prompt's output

The DoD file you produce is itself done when:

- [ ] File exists at exactly `docs/build/DOD/movemental-mvp-dod.md` (one file, no duplicates).
- [ ] Section structure mirrors the dashboard DoD: §1 How to use (1.1–1.4 verbatim with surface swapped), §2 Context already known, §3 DoD registry, §4 Next prompt queue (single item), §5 Attempt log (append-only), §6 Links.
- [ ] §3 contains a **page-by-page** block: one sub-table per public route from `sitemap.ts`, plus a final sub-table for cross-cutting systems. Every row has: `ID`, `Criterion`, `Tier` (P1/P2/P3), `Status` (default `Not started`), `Notes` (cite `path:line` when relevant).
- [ ] Each public route in `sitemap.ts` is represented by at least 3 rows: **(a) content & narrative**, **(b) design & accessibility**, **(c) conversion / next-action wiring**. Add EEAT and SEO rows where load-bearing (home, audience hubs, evidence, pathway, founders).
- [ ] Cross-cutting systems block covers: SEO infra (titles, OG, JSON-LD, sitemap, robots, canonical), analytics (GA4, PostHog, Vercel Analytics wired and firing), contact + newsletter (double opt-in, notifications, rate limit), error states (404, 500, empty, offline), performance (LCP < 2.5s on /, /pathway, /assess on Vercel preview), accessibility (axe-clean on P1 pages; keyboard-only walkthrough of nav + assess), narrative integrity (no "movement leaders as 4th audience" copy anywhere), legal (privacy/terms/cookies current), citation/footnotes registry consistent with [`src/lib/citations/eeat-site-claims.json`](../../../src/lib/citations/eeat-site-claims.json).
- [ ] §2 lists **context already known** as facts: founders, canonical doctrine references, deployed Vercel project, current narrative SSOT. Marked re-verify on change.
- [ ] §4 contains exactly **one** next prompt (the immediate next action to drive toward done), not a backlog.
- [ ] §5 has the seed row: `2026-05-12 | AI / initial scaffold | File created from movemental-mvp-dod prompt | Registry seeded, statuses default to Not started`.
- [ ] §6 links to: sitemap.ts, DESIGN.md, the strategy doc, the dashboard DoD, the existing site audit, and the homepage IA consultation.
- [ ] The master checklist line at the end of §1 reads `[ ] All Section 3 items are Done and verified` with a parenthetical state note.
- [ ] No "good", "clean", "modern", "polished" as criteria. Replace with what to check.
- [ ] Movement-leader-related criteria reflect the trusted-voice doctrine (not "audience card").
- [ ] `pnpm exec tsc --noEmit` is clean if any code changed (it shouldn't — this prompt only writes one markdown file).

---

## 5. Output format

- **One file written:** `docs/build/DOD/movemental-mvp-dod.md`.
- **Markdown only.** Tables for the registry (so statuses can be updated in place). Bullet lists for parallel items. Code fences for any verification commands. No HTML.
- **IDs are stable.** Use `MVP-01`, `MVP-02`, … in §3 in row order. Once written, IDs never get renumbered — new criteria append at the bottom.
- **Tone:** plain, surgical, no marketing voice. The dashboard DoD is the reference register for tone.
- **Length:** as long as it needs to be. Expect ~80–120 rows across all sub-tables. Do not pad; do not abbreviate to fit a target.

---

## 6. Approach (recommended path)

1. **Read the references in §3 above.** Don't re-audit the site — the audits already exist. Your job is to convert what's known into checkable criteria.
2. **Enumerate routes.** Pull the route list from `src/app/sitemap.ts`. Cross-check against `src/app/(site)/**/page.tsx` and note any drift in §5 of the DoD (attempt log).
3. **Tier each route** using its sitemap priority: ≥0.85 → P1, 0.6–0.84 → P2, <0.6 → P3. Legal pages stay P1 regardless of priority weight.
4. **Draft per-page rows.** For each route, write the minimum criteria a launch lead would actually check: hero promise, narrative spine, primary CTA, secondary CTA, EEAT/evidence (if applicable), mobile rendering, axe-clean, OG image present, canonical URL, no console errors, no broken links.
5. **Draft cross-cutting rows.** SEO, analytics, contact/newsletter, error states, performance, accessibility, narrative integrity, citations, legal.
6. **Write §1, §2, §4, §5, §6** mirroring the dashboard DoD structure.
7. **Self-check against §4 of this prompt.** Confirm every box. Then append the seeded row to §5 of the DoD.

Pause and surface to the user (not auto-decide) if:
- Sitemap and `(site)/**/page.tsx` disagree by more than 2 routes — that's a scope question, not a DoD question.
- A canonical doctrine document is missing or contradicts the latest copy — flag it; don't silently pick a side.

---

## 7. Guardrails — do not

- Do not produce a DoD that mixes dashboard criteria into the public-site DoD. The two are deliberately separate documents.
- Do not place movement leaders as a 4th audience card or treat `/voices` as a recruiting/nominate surface — that violates the canonical doctrine.
- Do not use "Committed Voices" as a public label in DoD criteria — public label is **"Trusted voices"**. Internal type names (`CommittedVoice` / `COMMITTED_VOICES`) stay as-is in code and are not the DoD's concern.
- Do not write criteria that require subjective judgment ("feels premium", "tells the story well"). Replace each with an observable: a referenced doc passes a tone check, a paragraph quotes from the canonical narrative, a heading uses the exact phrasing in DESIGN.md.
- Do not touch `src/`. The prompt produces a single markdown file.
- Do not renumber existing IDs if this prompt is re-run against an existing DoD file. Append new rows; never reshuffle.
- Do not stack multiple "next prompts" in §4 of the DoD. Exactly one.

---

## 8. Iteration protocol (closed loop)

1. Produce the full DoD end-to-end in one pass. Do not stop mid-route for confirmation unless §7 forces a pause.
2. Self-check against §4 of this prompt. List which boxes are ticked and which are not, with a one-line reason for any gap.
3. If gaps remain that you can close without new information, close them and re-check.
4. Post a final summary (≤200 words): how many rows in §3 total, the count per tier (P1/P2/P3) and per route, the single next prompt you placed in §4, and what was deliberately deferred.
5. The user's first reply is iteration input, not approval. Apply targeted edits as `Edit` calls — usually scope shifts ("collapse founders into one row each", "lower the perf budget to 3s", "add a row for `/assess` submit-failure path"). Re-run the self-check.
6. The prompt's job is done when the user says "ship it" or when every box in §4 above is ticked and the user has had at least one chance to redirect.

---

## 9. Verification — how to prove the DoD file is ready

```bash
# File exists at the canonical path
test -f docs/build/DOD/movemental-mvp-dod.md

# Section headers present and in order
grep -nE "^## [1-6]\." docs/build/DOD/movemental-mvp-dod.md

# All sitemap routes are represented as DoD rows (none missing)
node -e "const r=require('./src/app/sitemap.ts');" 2>/dev/null || true
# (Manual: open both files side by side; every sitemap route appears in §3.)

# No vague modifiers leaked into criteria
! grep -nE "\b(clean|modern|polished|robust|great UX|good UX|nice|elegant)\b" docs/build/DOD/movemental-mvp-dod.md

# No accidental dashboard scope contamination
! grep -nE "(authenticated dashboard|/dashboard|onboarding panel|cohort schedule)" docs/build/DOD/movemental-mvp-dod.md

# Typecheck clean (nothing in src/ should have moved)
pnpm exec tsc --noEmit
```

A passing run shows: file exists, six section headers, no banned modifiers, no dashboard leakage, typecheck clean.

---

## 10. Attempt log (append-only for THIS prompt's history)

| Date (ISO)  | Actor               | Summary                                                                 | Outcome  |
|-------------|---------------------|-------------------------------------------------------------------------|----------|
| 2026-05-12  | build-prompt skill  | Initial draft of the MVP DoD authoring prompt                            | Drafted  |

---

## 11. Follow-on prompts (do not start until this one closes)

- After the MVP DoD lands, write a **per-tier execution prompt** (P1 first) that walks an agent through closing the smallest set of `Not started` rows it can in one session, then opens a PR with the status updates and code changes in the same diff.
- After P1 is fully `Done`, write a **MVP launch-day runbook prompt** that orchestrates final smoke checks, analytics verification, and the public soft-launch announcement.
