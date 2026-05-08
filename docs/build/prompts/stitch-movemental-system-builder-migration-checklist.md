# Stitch Movemental System Builder — file inventory & migration checklist

Source tree: `docs/build/prompts/stitch_movemental_system_builder/`

This document lists **every path the product expects** (your directory list) and, for this clone, **whether files exist** and **where they land in the Next.js app**.

## Directory inventory (requested paths)

| Directory / path | Present in repo | Files (if any) | React / route target | Status |
| --- | --- | --- | --- | --- |
| `about_movemental_editorial/` | No | *(empty / not checked in)* | `AboutPage`, `(site)/about` — align when `code.html` or `screen.png` are added | Waiting on assets |
| `about_movemental_editorial/screen.png` | No | — | OG / about hero when provided | — |
| `about_movemental_editorial/screen.png:Zone.Identifier` | No | — | Ignore (Windows download metadata) | N/A |
| `ai_technology_movemental/` | No | *(not in repo)* | Folded into **`/technology`** (`TechnologyPage`) + Stage 04 editorial block | Fallback in app |
| `ai_training_for_mission_driven_organizations_movemental/` | Yes | `code.html` | **`/training`** (`TrainingPage`) | Migrated |
| `movemental_contact_page/` | Yes | `code.html` | **`/contact`** (`ContactPage`) | Migrated |
| `movemental_editorial/` | Yes | `DESIGN.md` only (no `code.html`) | Design tokens / copy reference; not a page export | Reference only |
| `movemental_for_churches_refined_editorial_design/` | Yes | `code.html` | **`/for-churches`** — `StitchEditorialAudience` + `SegmentPathway` | Migrated |
| `movemental_for_institutions/` | No | *(not in repo)* | **`/for-institutions`** — `StitchEditorialAudience` (synthetic from `segmentData`) + `SegmentPathway` | In-app editorial only |
| `movemental_for_nonprofits/` | Yes | `code.html` | **`/for-nonprofits`** — `StitchEditorialAudience` + `SegmentPathway` | Migrated |
| `movemental_home_stunning_editorial_refinement/` | Yes | `code.html` | **`/`** home sections under `sections-mock/home` + composition on home | Migrated (prior pass) |
| `sandbox_discovery_deep_dive/` | Yes | `code.html` | **`/pathway/sandbox`** (`SandboxPage`) | Migrated |
| `stage_01_safety_integrated_editorial_archive/` | Yes | `code.html` | **`/pathway/safety`** (`SafetyPage`) | Migrated |
| `stage_03_skills_movemental/` | Yes | `code.html` | **`/pathway/skills`** (`SkillsPathwayPage`) + **`/training`** cross-links | Migrated |
| `stage_04_solutions_refined_layout/` | Yes | `code.html` | **`/technology`** top fold (`TechnologyPage`) + **`/pathway/solutions`** | Migrated |
| `team_movemental/` | Yes | `code.html` | **`/team`** (`TeamPage`) — prior structure already matched narrative | Review / polish |
| `the_ai_stewardship_sequence_movemental/` | No | *(not in repo)* | **`/pathway`** eyebrow + sequencing copy (`PathwayOverviewPage`) | Fallback in app |
| `the_pathway_ai_movemental_overview/` | Yes | `code.html` | **`/pathway`** (`PathwayOverviewPage`) | Migrated |
| `trusted_voices/` | Yes | `code.html` | **`/voices`** (`VoicesPage`) | Migrated |

## Flat file list — everything under `stitch_movemental_system_builder` in this workspace

Only **13** paths exist on disk (no nested assets beyond these):

1. `ai_training_for_mission_driven_organizations_movemental/code.html`
2. `movemental_editorial/DESIGN.md`
3. `movemental_for_churches_refined_editorial_design/code.html`
4. `movemental_for_nonprofits/code.html`
5. `movemental_home_stunning_editorial_refinement/code.html`
6. `movemental_contact_page/code.html`
7. `sandbox_discovery_deep_dive/code.html`
8. `stage_01_safety_integrated_editorial_archive/code.html`
9. `stage_03_skills_movemental/code.html`
10. `stage_04_solutions_refined_layout/code.html`
11. `team_movemental/code.html`
12. `the_pathway_ai_movemental_overview/code.html`
13. `trusted_voices/code.html`

**Missing from disk (add from Stitch export if you want parity):**

- `about_movemental_editorial/*`
- `ai_technology_movemental/*`
- `movemental_for_institutions/*`
- `the_ai_stewardship_sequence_movemental/*`

## Migration rules (unchanged)

- Semantic tokens only (`bg-background`, `band-midnight`, `text-muted-foreground`, etc.); no raw Stitch hex in new React.
- Site chrome stays in `(site)` layout (`SiteHeader` / `SiteFooter`); Stitch nav/footer are **not** pasted into pages.
- Bottom-up: if schema/API were involved, regenerate layers — these screens are marketing-only.

## Verification

- `pnpm typecheck`
- Spot-check: `/pathway/safety`, `/pathway/sandbox`, `/technology`, `/for-churches`, `/for-nonprofits`, `/for-institutions`, `/voices`, `/team`
