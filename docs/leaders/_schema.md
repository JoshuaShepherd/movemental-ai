# Leader profile schema (normalized)

**Purpose:** Shared field vocabulary for cofounder profiles in `docs/leaders/*.md`, future JSON/YAML exports, UI, and agent context.

**Status:** v1 — human-readable spec; machine serialization can mirror these keys.

---

## Root object: `leader`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | yes | Stable slug: `alan-hirsch`, `brad-brisco`, `josh-shepherd` |
| `name` | string | yes | Display name |
| `preferred_name` | string | no | e.g. `Joshua` vs `Josh` if both used |
| `role` | string | yes | Provisional title; refine with each person |
| `equity_percent` | number \| null | no | Internal only if published; omit from public UI |
| `domains` | string[] | yes | Contribution domains (theology, product, networks, etc.) |
| `summary` | string | yes | 2–4 sentence influence summary |
| `core_concepts` | object[] | yes | `{ "name": string, "description"?: string }` |
| `corpus` | object | yes | Breakdown below |
| `pathways` | string[] | no | Named pathway themes this leader anchors |
| `movemental_interpretation` | object | yes | Maps ideas → platform primitives (see profile §4) |
| `system_build_alignment` | object[] | yes | `{ "build": string, "rationale": string }` — builds: Discovery Lab, Content System Build, Fundraising System Build, Governance & Ethics, Foundation |
| `formation_alignment` | string | no | How they relate to formation / courses (narrative) |
| `demo_priority` | enum | yes | `primary` \| `secondary` \| `supporting` \| `internal` |
| `demo_notes` | string | no | How to use in demos / POC |
| `scenius_role` | string | yes | Network position: hub, bridge, builder, catalyst, etc. |
| `scenius_benefits` | string | no | How they gain from the network |
| `scenius_contributions` | string | no | How they strengthen others |
| `credibility_hooks` | string[] | no | Short phrases safe for marketing when approved |
| `internal_doc_links` | string[] | no | Repo-relative paths to deeper research |
| `gaps_unknowns` | string[] | yes | Honest limits; drives research backlog |

---

## Nested: `corpus`

| Field | Type | Description |
|-------|------|-------------|
| `books` | object[] | `{ "title": string, "role": "solo"|"co", "notes"?: string }` |
| `articles` | string | Summary or link to audit doc |
| `talks_media` | string | Summary or link to audio/video index |
| `courses` | string | Summary or link to courses doc |
| `themes` | string[] | High-level corpus clustering |

---

## Nested: `movemental_interpretation`

| Field | Type | Description |
|-------|------|-------------|
| `as_system` | string | What becomes configurable product / data model |
| `as_content_structure` | string | IA, pillars, tags, editorial patterns |
| `as_pathways` | string | Journey design, module sequencing |
| `as_courses` | string | Transformational course charter alignment |
| `as_ai_enabled` | string | Agents, RAG, voice fidelity, guardrails |

---

## Enums

**`demo_priority`**

- `primary` — flagship tenant / reference implementation (Alan).
- `secondary` — strong institutional demo / bridge narrative (Brad).
- `supporting` — appears in multi-leader stories, governance, ops.
- `internal` — founder/builder; not a “tenant demo” in the same sense (Josh).

---

## Versioning

- Bump a `schema_version` (e.g. in a future `leaders.json`) when fields are added or renamed.
- Profile markdown files should state `Profile version` in frontmatter or §1 when we add frontmatter.

---

## Canonical deep research (per leader)

| `id` | Primary research folder |
|------|-------------------------|
| `alan-hirsch` | `docs/movement_leader_research/alan-hirsch/` |
| `brad-brisco` | `docs/movement_leader_research/brad-brisco/` |
| `josh-shepherd` | `docs/business-docs/core-docs/`, `docs/team/team-bios.md`, `docs/articles/` (no parallel OSINT folder today) |
