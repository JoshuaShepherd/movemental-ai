# Articles Inventory

**Generated:** 2026-04-20
**Purpose:** Single source of truth for the shape, canon position, series, audience, and topics of every publishable article under `docs/articles/`. This file drives the frontmatter migration (Stage 11 of [`docs/build/prompts/articles-information-architecture-and-presentation.md`](../build/prompts/articles-information-architecture-and-presentation.md)) and is the basis for the new collection routes under `/articles/*`.

**Valid `shape` values:** `canon` · `guide` · `playbook` · `field-guide` · `case-study` · `methodology` · `ai-note` · `sandbox` · `story`

**Valid `canon_section` values:** `moment` · `problem` · `path` · `future` · `synthesis`

**Valid `series` values:** `fragmentation` · `content-strategy` · `sandbox` · `ssss` · `two-intelligences` · `ai-governance` · `(null)`

**Valid `audience` values:** `leader` · `nonprofit` · `church` · `institution` · `seminary` · `any` (multi-value allowed)

**Valid `topics`:** `fragmentation` · `ssss` · `integrity` · `signal` · `formation` · `sandbox` · `multiplication` · `dual-intelligence` · `ai-posture` · `ai-credibility` · `content-strategy`

## Movemental Canon (23 pieces — the argument staircase)

Source: [`core-articles/movemental-canon-article-prompts.md`](../build/prompts/core-articles/movemental-canon-article-prompts.md)

| slug | shape | canon_section | canon_order | topics | status |
| ---- | ----- | ------------- | ----------- | ------ | ------ |
| the-frontier-you-didnt-choose | canon | moment | 1 | ai-posture | published |
| the-two-equal-errors | canon | moment | 2 | ai-posture | published |
| integrity-vs-impact | canon | moment | 3 | integrity, ai-posture | published |
| this-is-not-a-tools-problem | canon | moment | 4 | ai-posture | published |
| why-this-moment-feels-disorienting | canon | moment | 5 | ai-posture | published |
| the-fragmentation-tax | canon | problem | 6 | fragmentation | published |
| content-that-doesnt-move | canon | problem | 7 | fragmentation, content-strategy | published |
| the-collapse-of-signal-in-the-ai-age | canon | problem | 8 | signal | published |
| why-expertise-is-becoming-invisible | canon | problem | 9 | signal | published |
| the-death-of-isolated-work | canon | problem | 10 | fragmentation, signal | published |
| there-is-a-way-through-this | canon | path | 11 | ssss | published |
| the-ssss-framework | canon | path | 12 | ssss | published |
| why-order-matters | canon | path | 13 | ssss | published |
| safety-before-speed | canon | path | 14 | ssss, ai-governance | published |
| the-purpose-of-sandbox | canon | path | 15 | ssss, sandbox | published |
| skills-as-formation-not-training | canon | path | 16 | ssss, formation | published |
| why-solutions-come-last | canon | path | 17 | ssss | published |
| when-work-begins-to-move | canon | future | 18 | multiplication | published |
| from-content-to-movement | canon | future | 19 | multiplication, content-strategy | published |
| the-return-of-coherent-leadership | canon | future | 20 | signal, formation | published |
| ai-with-integrity | canon | future | 21 | integrity, ai-posture | published |
| building-for-the-next-decade | canon | future | 22 | multiplication, formation | published |
| the-movemental-thesis | canon | synthesis | 23 | ssss, integrity, fragmentation | published |

## Guides (numbered content-strategy + SEO/GEO)

| slug | shape | series | series_order | topics | status |
| ---- | ----- | ------ | ------------ | ------ | ------ |
| 01-content-strategy-for-movement-leaders | guide | content-strategy | 1 | content-strategy | published |
| 02-the-evergreen-article-architecture | guide | content-strategy | 2 | content-strategy | published |
| 03-transformation-over-information | guide | content-strategy | 3 | content-strategy, formation | published |
| 04-the-eight-week-formation-scaffold | guide | content-strategy | 4 | content-strategy, formation | published |
| 05-formation-journeys-the-pathway-architecture | guide | content-strategy | 5 | content-strategy, formation | published |
| 06-the-christocentric-spine | guide | content-strategy | 6 | content-strategy, formation | published |
| guide-ai-credibility-2026 | guide | (null) | (null) | ai-credibility, signal | published |
| movemental-stack-nonprofit-use-cases | guide | (null) | (null) | ai-posture | published |
| substack-and-movemental-system | guide | (null) | (null) | content-strategy | published |

## Playbooks (audience-specific integration)

| slug | shape | audience | topics | status |
| ---- | ----- | -------- | ------ | ------ |
| playbook-movement-leader | playbook | leader | ssss, multiplication | published |
| playbook-nonprofit | playbook | nonprofit | ssss, ai-governance | published |
| playbook-church | playbook | church | ssss, formation | published |
| playbook-institution | playbook | institution | ssss, ai-governance | published |

## Field Guides (lead magnet, executive-oriented)

| slug | shape | audience | topics | status |
| ---- | ----- | -------- | ------ | ------ |
| ssss-field-guide-for-organizational-leaders | field-guide | leader, nonprofit, church, institution | ssss | published |

## Methodology (how Movemental works)

| slug | shape | topics | status |
| ---- | ----- | ------ | ------ |
| fragmentation-inventory | methodology | fragmentation | published |
| solutions-deployment | methodology | ssss | published |
| sandbox-discovery | methodology | sandbox | published |

## Case Studies

| slug | shape | audience | topics | status |
| ---- | ----- | -------- | ------ | ------ |
| case-study-youthfront | case-study | nonprofit | fragmentation, multiplication | published |

## AI Notes (short-form AI posture pieces)

| slug | shape | topics | status |
| ---- | ----- | ------ | ------ |
| ai-collapses-the-cost-of-integration | ai-note | dual-intelligence, ai-posture | published |
| ai-means-organizations-have-to-rebuild | ai-note | ai-posture | published |
| nonprofits-pii-private-agentic-rag | ai-note | ai-governance | published |
| the-one-constraint-behind-every-ai-conversation | ai-note | ai-posture | published |
| the-skill-of-ai | ai-note | formation | published |

## Sandbox curriculum (nested under `sandbox/`)

Source: frontmatter in `docs/articles/sandbox/*.md`

| slug | shape | series_order | status |
| ---- | ----- | ------------ | ------ |
| sandbox/building-the-use-case-portfolio | sandbox | 9 | published |
| sandbox/discovering-value-under-constraint | sandbox | 2 | published |
| sandbox/discovery-engine-not-generator | sandbox | 1 | published |
| sandbox/recipes-are-not-cooking | sandbox | 7 | published |
| sandbox/scoring-value-honestly | sandbox | 6 | published |
| sandbox/the-eight-patterns-where-value-hides | sandbox | 5 | published |
| sandbox/the-ethical-and-relational-flag | sandbox | 8 | published |
| sandbox/the-three-kinds-of-value | sandbox | 3 | published |
| sandbox/the-three-layers-of-sandbox-work | sandbox | 4 | published |

## Story / essays (supporting narrative — not canon)

Pieces that are load-bearing for the narrative but outside the 23-piece canon.

| slug | shape | topics | status |
| ---- | ----- | ------ | ------ |
| the-story-of-movemental | story | (null) | published |
| the-movemental-thesis | (see canon) | — | — |
| context-changes-everything | story | ai-posture | published |
| fragmentation-to-multiplication | story | fragmentation, multiplication | published |
| intelligence-fragmentation | story | dual-intelligence | published |
| relational-intelligence | story | dual-intelligence | published |
| two-intelligences-integration | story | dual-intelligence | published |
| the-cost-of-fragmentation | story | fragmentation | published |
| the-work-of-safety | story | ssss | published |
| why-your-content-isnt-compounding | story | content-strategy, fragmentation | published |
| from-content-to-movement | (see canon) | — | — |

## Excluded (internal briefs / course outlines / videos — never public)

Present in `EXCLUDED_SLUGS` in `src/lib/articles.ts`. Keep excluded.

- `00_ai-brief-why-movemental`, `01_ai-vision-overview`, `01_copy-deck-why-movemental`
- `02_individual-site-presentation`, `03_platform-presentation`
- `07-ai-adoption-for-nonprofits-course-outline`, `07-author-onboarding-course-outline`
- `08-ai-powered-fundraising-system-4-week-course-outline`
- `ai-governance-ethics-course-outline`
- `COURSE_STRATEGY`, `HOW_MOVEMENTAL_USES_AI`, `HOW_MOVEMENTAL_WORKS_VIDEO_SCRIPT`
- `LINKING-STRATEGY-EEAT-GEO-PLAYBOOK`, `Thought Leader Platform Research Report`
- `UNIFORM-AND-DISTINCT-PLATFORM-GUIDE`, `VIDEO_SCRIPT_MOVEMENTAL_COURSES_INTRO`
- `activation-workflow`, `formation-workflow`, `multiplication-workflow`, `ai-integration-workflow`
- `nonprofit-content-build`, `nonprofit-discovery-lab`, `nonprofit-foundation-build`, `nonprofit-fundraising-build`, `nonprofit-governance-ethics-build`
- `credibility-how-it-works-video`
