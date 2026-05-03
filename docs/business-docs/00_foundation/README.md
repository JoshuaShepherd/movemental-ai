# Movemental Documentation Foundation

## Purpose
This directory acts as the canonical entry point for the Movemental knowledge base. Every narrative, playbook, research artifact, and design reference now lives inside `_docs`, organized into numbered pillars so AI agents and humans can rely on stable paths.

## Structure Overview
| Directory | Focus |
| --- | --- |
| `_docs/00_foundation` | Source of truth for scope, conventions, and governance; this file plus future onboarding briefs. |
| `_docs/01_business_strategy` | Go-to-market, business modeling, GTM playbooks, and messaging scaffolds. |
| `_docs/02_product_platform` | Product architecture, deployment governance, valuation stories, and creation prompts. |
| `_docs/03_brand_positioning` | Brand strategy, visual language, website vision, and all supporting research. |
| `_docs/04_thought_leadership` | Narrative development, amplification cases, and keynote-ready storytelling. |
| `_docs/05_leadership_ops` | Leadership evaluation, ops processes, AI values, and strategic narratives. |
| `_docs/06_creator_education` | Curriculum, creator enablement, visual prompt guides, and templates. |
| `_docs/07_ai_content_systems` | Agent specs, workflows, archive prompts, and deployment automation. |
| `_docs/08_integrated_design` | Design references, Alan Hirsch design game artifacts, playground code, and contrast rules. |
| `_docs/09_research_analysis` | Market intelligence, candidate research, amplification/credibility studies. |
| `_docs/10_tools_utilities` | Frameworks, notebooks, documentation packages, and platform audits. |
| `_docs/zz_archive` | Superseded drafts, PDFs/exports, and content pending deletion approval.

## Governance & Maintenance
- **Single source of truth**: Markdown lives here; PDFs/HTML exports sit beside their source or under `zz_archive`.
- **Link hygiene**: When moving files, update relative links immediately. Search for the old path before committing.
- **Versioning**: Use suffixes like `-v1`, `-v2` when keeping multiple historical takes on the same topic (see modern web design guides).
- **Change tracking**: Large structural updates should be logged in `_docs/00_foundation/changelog.md` (create as needed).
- **Archive policy**: Move deprecated or redundant assets into `_docs/zz_archive` with a short note rather than deleting outright.

## Outstanding Actions
1. Add a lightweight CI job (GitHub Action or similar) that runs `node scripts/check-doc-links.mjs` on every PR touching `_docs/`.
2. Extend the `/docs` knowledge center with search and filtering so contributors can jump directly to files (not just pillar READMEs).
3. Establish a quarterly documentation review ritual (owners, cadence, checklist) and capture it here or in `changelog.md`.

## Deletion / De-duplication Candidates
See `_docs/zz_archive/deletion-proposals.md` for the current manifest. No files have been removed yet; everything listed there awaits approval.
