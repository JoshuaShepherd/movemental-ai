# Build prompt — standard trusted-voice bio from movement leader research

**Goal.** For each movement leader in the Agent Room home portrait band (`src/lib/agent-room/data/leaders.ts` → `LEADERS`, rendered by `LeaderBand` on `/agent`), read their on-disk research dossier and produce the **full standard bio package**: structured metadata + editorial prose + home-card copy + graph subtitle. This is a **translation** task, not a research task — every fact must come from the dossier.

**Read first:**

- [movement-leaders-as-ecosystem-layer.md](../strategy/movement-leaders-as-ecosystem-layer.md) — public label is **"trusted voices"** (section eyebrow); these bios name practitioners in the scenius layer, not a recruiting roster.
- [site-voices-eeat-audience-credentials.md](../../movement_leader_research/site-voices-eeat-audience-credentials.md) — audience-intersection context (churches · nonprofits · institutions).
- `.claude/skills/movemental-committed-voice-bio/SKILL.md` — canonical field definitions and voice exemplars (Liz Rios, JR Woodward, Rowland Smith).
- `src/lib/committed-voices.ts` — publication-layer shape for `/voices/[slug]` (separate wiring step after rights review).

**Legacy note:** `src/data/home-data.ts` → `VOICES` (7 entries) is archived pre-marketing-migration data. The live home carousel is **`LEADERS` (17 entries)** on `/agent`.

---

## Scope — Agent Room portrait band (2026-06)

These **17 leaders** appear in `LEADERS` today. Run the prompt **once per slug** (16 dossier-backed; Josh Shepherd is founder-only — no research dossier).

| # | Slug | Display name | Dossier path | `committed-voice.md` |
|---|------|--------------|--------------|----------------------|
| 0 | `alan-hirsch` | Alan Hirsch | `_onboarded_leaders/alan-hirsch/` | ✓ full package |
| 1 | `brad-brisco` | Brad Brisco | `_onboarded_leaders/brad-brisco/` | ✓ full package |
| 2 | `jr-woodward` | JR Woodward | `_onboarded_leaders/jr-woodward/` | ✓ full package |
| 3 | `neil-cole` | Neil Cole | `_onboarded_leaders/neil-cole/` | ✓ full package |
| 4 | `rowland-smith` | Rowland Smith | `_onboarded_leaders/rowland-smith/` | ✓ full package |
| 5 | `rob-wegner` | Rob Wegner | `_onboarded_leaders/rob-wegner/` | ✓ full package |
| 6 | `liz-rios` | Liz Rios | `_onboarded_leaders/liz-rios/` | ✓ full package |
| 7 | `lucas-pulley` | Lucas Pulley | `lucas-pulley/` | ✓ full package |
| 8 | — | Josh Shepherd | *(founder; no dossier)* | skip |
| 9 | `jeremy-chambers` | Jeremy & Monica Chambers | `_onboarded_leaders/jeremy-chambers/` | ✓ full package |
| 10 | `dave-ferguson` | Dave Ferguson | `_onboarded_leaders/dave-ferguson/` | ✓ full package |
| 11 | `dhati-lewis` | Dhati Lewis | `_onboarded_leaders/dhati-lewis/` | ✓ full package |
| 12 | `hugh-halter` | Hugh Halter | `_onboarded_leaders/hugh-halter/` | ✓ full package |
| 13 | `michael-cooper` | Michael Cooper | `_onboarded_leaders/michael-cooper/` | ✓ full package |
| 14 | `roy-moran` | Roy Moran | `_onboarded_leaders/roy-moran/` | ✓ full package |
| 15 | `peyton-jones` | Peyton Jones | `_onboarded_leaders/peyton-jones/` | ✓ full package |
| 16 | `meghan-good` | Meghan Good | `_onboarded_leaders/meghan-good/` | ✓ full package |

**Dossier resolution rule.** Prefer `docs/movement_leader_research/<slug>/`. If missing, use `docs/movement_leader_research/_onboarded_leaders/<slug>/`. Never invent a third path.

**Hard stop.** If none of `summary.md`, `profile/biography.md`, and `profile/identity.md` exist (or legacy `_staff/legacy/<SLUG>_AUTHOR_PROFILE.md`), stop and report the dossier is too thin. Do not web-research to fill gaps.

---

## Phase 1 — Read the dossier (priority order)

Read every file that exists; skip silently if missing.

1. `summary.md`, `README.md` — current role, executive summary, book counts, digital presence facts.
2. `profile/identity.md` — canonical name spelling, location, disambiguation.
3. `profile/biography.md` — narrative arc, career timeline, pull quotes.
4. `profile/calling-profile.md` — vocational through-line (paragraph 2–3 of editorial bio).
5. `profile/theology.md`, `content/frameworks.md` — load-bearing frameworks and distinctives.
6. `profile/voice-analysis.md` — vocabulary, anti-patterns (do not flatten their voice).
7. `network/organizations.md` — founded / led orgs (credentials + secondary links).
8. `content/books.md`, `content/articles.md` — featured works with publisher + year.
9. `digital-presence/websites.md`, `_misc/digital-presence-discovery.md` — `primary_url`.
10. `fragmentation-story.md` — optional third-paragraph hinge (why their corpus is scattered).
11. Legacy fallbacks only: `_staff/legacy/<SLUG>_*.md`, root-level `*_AUTHOR_PROFILE.md`.

**Do not read** `_staff/movemental-fit.md`, gap analyses, commerce playbooks, or TAM notes — staff-only; never surface in public bios.

---

## Phase 2 — Extract a working set

Before drafting, assemble these fields in scratch context. Every value maps to output below.

| Field | Source | Notes |
|-------|--------|-------|
| `slug` | folder name | kebab-case |
| `display_name` | identity + summary | Include Rev./Dr. only if dossier uses it consistently |
| `location_line` | identity | "City, State" or multi-region; ≤ 50 chars |
| `role` | current institutional roles | ≤ 3 entries, ` · ` separated, ≤ 90 chars total |
| `short_tagline` | calling + distinctive contribution | Third person, 18–28 words, ≤ 200 chars |
| `themes` | voice-analysis / frameworks | Exactly 3, Title Case, ≤ 28 chars each |
| `credentials` | organizations + degrees | 3–6 lines, each ≤ 110 chars, trailing "why it matters" clause |
| `featured_works` | books.md | 3–5 entries, `"Title (Publisher, Year)"` or with co-author |
| `primary_url` | digital presence | Absolute URL |
| `secondary_links` | org sites | 2–3 `{ label, href }`, not social profiles |
| `signature_frameworks` | frameworks.md / theology | 3–7 `{ name, definition }` (reserve; optional in v1) |
| `home_card_title` | synthesized from above | See §Home card title |
| `graph_title` | current role + one signature work | See §Graph title |

---

## Phase 3 — Master prompt (paste into agent; replace `{{SLUG}}`)

Use this block verbatim. Attach or `@`-reference the dossier folder for `{{SLUG}}`.

```markdown
You are writing the **standard trusted-voice bio** for Movemental's public surfaces. The leader is **`{{SLUG}}`**.

## Input

Research dossier at:
`docs/movement_leader_research/{{SLUG}}/` OR
`docs/movement_leader_research/_onboarded_leaders/{{SLUG}}/`

Read the dossier using the priority order in
`docs/build/prompts/movement-leader-standard-bio-from-research.md` Phase 1.
Do not use the web. Do not invent stats, quotes, or anecdotes.

## Output

Produce **one Markdown file** with YAML frontmatter and three body sections.

### YAML frontmatter (required keys)

```yaml
---
slug: {{SLUG}}
display_name:
role:                    # ≤ 90 chars, "Title, Org · Title, Org"
location_line:           # ≤ 50 chars
short_tagline: >-         # 18–28 words, third person
themes:                  # exactly 3, ≤ 28 chars each
credentials:             # 3–6 lines, ≤ 110 chars each
featured_works:          # 3–5 lines, ≤ 90 chars each
primary_url:             # absolute https URL
secondary_links:         # 2–3 org links (not social)
home_card_title:         # see rules below
graph_title:             # see rules below
sources:                 # dossier files you actually read (relative paths)
generated_at:            # today's ISO date YYYY-MM-DD
---
```

Optional reserve block (include when frameworks are well documented):

```yaml
signature_frameworks:
  - name:
    definition:          # one sentence each
```

### Body section 1 — `## Editorial bio`

2–3 paragraphs, **150–220 words total**, third person, slightly warmer than pure editorial register (calibrate to Liz Rios committed-voice exemplar in the skill).

**Must appear across the prose (distributed, not listed):**
- Current institutional role, named explicitly
- At least two books or major works with publisher where known
- At least one org they founded, co-founded, or lead
- At least one named co-author, collaborator, or institutional adjacency
- At least one place-anchor consistent with `location_line`

**Voice rules:**
- Dense with proper nouns — every paragraph has at least one verifiable noun from this dossier
- Vary sentence length (8 words to ~40)
- No bullet lists inside the bio
- Plain text book titles (no italics)

**Forbidden words/phrases:** renowned, world-class, leading voice, thought leader, passionate, transformative (as modifier), ecosystem (use network/orgs instead), "has made significant contributions", STAGGERING, marketing hype, first person, second person

**Forbidden patterns:** "Author of" laundry lists (YAML carries works); default "not X but Y" rhythm; invented numbers

### Body section 2 — `## Home card title`

One line for the home Voices carousel (`src/data/home-data.ts` → `title` field).

**Format:** semicolon-separated credential stack, not a sentence.

**Rules:**
- 12–22 words
- Third person implied (no "He/She" opener)
- Lead with role or signature contribution, not honorific alone
- Include: current role anchor + one signature book/framework + one org + one distinguishing scope signal (years, assessments, network scale) **only if in dossier verbatim**
- No semicolon after the final segment
- Must be unique — swapping names must break the line for other leaders

**Calibration (existing home cards):**
- Alan Hirsch: "Forgotten Ways and APEST architect; twenty books; Forge and 100 Movements; 150k+ assessments; coined movemental."
- Liz Rios: "Afro-Boricua theologian; Passion2Plant founder; Lilly-funded Púlpito Fellows; Fuller adjunct; Sojourners board; Need to Know contributor."

### Body section 3 — `## Graph title`

One line for credibility-graph hover / network node subtitle.

**Rules:**
- ≤ 12 words
- Pattern: `Primary role · Signature work or org` OR `Role, Org`
- No semicolon stacks (save density for `home_card_title`)
- Example: "APE practitioner · Co-author, The Permanent Revolution"

## Self-check (revise until all pass)

1. YAML parses; all required keys non-empty
2. Editorial bio 150–220 words; each paragraph has a dossier-specific proper noun
3. `role` ≤ 90 chars; `location_line` ≤ 50; each `theme` ≤ 28; each credential ≤ 110
4. Exactly 3 themes; 3–5 featured works; 2–3 secondary links; all URLs absolute
5. Bio fails the name-swap test if it could fit another leader
6. No staff-only research (fit scores, gap analysis) leaked into copy
7. `home_card_title` and `graph_title` are distinct — not duplicates

## Save

Write to:
`docs/movement_leader_research/<slug>/committed-voice.md`
OR, if dossier lives under `_onboarded_leaders/`:
`docs/movement_leader_research/_onboarded_leaders/<slug>/committed-voice.md`

If a prior `committed-voice*.md` exists, write `committed-voice-<YYYY-MM-DD>.md` alongside — do not overwrite without operator confirmation.

Report: slug, display name, editorial word count, self-check pass/fail, save path, any fields the dossier did not supply and how you resolved them.
```

---

## Phase 4 — Voice exemplars (calibration)

Read these before judging output. Match **information density**; lean slightly toward Liz Rios's warmth.

### Editorial bio — Liz Rios (preferred register)

> Liz Rios has carried thirty-five years of ministry across pastoring, planting, teaching, and consulting — and into infrastructure. She founded Passion2Plant, the only national BIPOC-woman-led church planting network in the United States, and directs Púlpito Fellows, a three-year, bilingual preaching fellowship funded by the Lilly Endowment.
>
> Her work runs simultaneously across denominational, academic, and movement spaces: ordained Disciples of Christ; adjunct faculty at Fuller; board member at Sojourners; senior consultant with Freedom Road; consulting editor at Outreach Magazine. She holds a BA, MA, EdD, DMin, and a 2025 MA in Social Justice from Union.
>
> She writes from a mujerista frame — distinct in tone and theological surface area from anyone else inside Movemental's circle — and brings a live cohort operator's discipline to what a leader-platform actually has to carry.

### Home card title — density reference

| Leader | `home_card_title` |
|--------|-------------------|
| Alan Hirsch | Forgotten Ways and APEST architect; twenty books; Forge and 100 Movements; 150k+ assessments; coined movemental. |
| Brad Brisco | NAMB / Send Network multiplication strategies director; covocational ministry; five books; missional theology ↔ evangelical systems translator. |
| Rob Wegner | Kansas City Underground founder; Microchurch NEXT co-director; Starfish and the Spirit co-author; eight-book multiplication bibliography. |

### Graph title — brevity reference

| Leader | `graph_title` |
|--------|-----------------|
| Tim Catchim | APE practitioner · Co-author, The Permanent Revolution |
| JR Woodward | National Director, V3 Church Planting Movement |
| Lucas Pulley | Movements Director, Underground Network |

---

## Phase 5 — Downstream wiring (after bio exists)

The Markdown file is the **editorial SSOT**. Code publication is a separate step:

| Surface | Field | Source |
|---------|-------|--------|
| Agent Room carousel (`/agent`) | `LEADERS[].cred` | `graph_title` in committed-voice frontmatter |
| Archived marketing carousel | `VOICES[].title` in `home-data.ts` | `home_card_title` |
| Credibility graph | `VoiceGraphVoice.title` | `graph_title` |
| `/voices/[slug]` | `CommittedVoice` in `src/lib/committed-voices.ts` | Map YAML → TS by hand until a loader exists |
| Portrait | `/agent-room/leaders/{i}.jpg` or `/images/voices/<slug>.webp` | existing assets |

**Publication gate:** Only copy into `src/lib/committed-voices.ts` after rights review (`lastReviewed` date in TS).

---

## Batch run order (recommended)

All **16 dossier-backed** `LEADERS` entries now have the full standard package (`home_card_title`, `graph_title`, editorial bio). Re-run a slug only when its dossier materially changes or `LEADERS[].cred` drifts from `graph_title`.

1. **Refresh pass** — compare `LEADERS[].cred` in `leaders.ts` to `graph_title` after any dossier update.
2. **Josh Shepherd** — founder entry; no research dossier or committed-voice artifact (by design).
3. **`tim-catchim`** — has committed-voice but is not in `LEADERS`.

---

## Operator invocation (short)

```text
Apply docs/build/prompts/movement-leader-standard-bio-from-research.md Phase 3
for slug: rob-wegner
Read the dossier at docs/movement_leader_research/_onboarded_leaders/rob-wegner/
Save committed-voice.md and print the self-check report.
```

Repeat with `--dry-run` behavior by asking for the working set only (Phase 2 table) before drafting.
