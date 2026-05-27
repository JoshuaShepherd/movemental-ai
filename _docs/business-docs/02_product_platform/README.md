# 02 · Product Platform

- **Owner**: Josh Shepherd
- **Last Review**: 2025-11-21
- **Interfaces With**: 01 Business Strategy, 07 AI Content Systems

## Scope
Technical architecture, Supabase schema, deployment governance, and valuation storytelling for the Movemental platform. Also includes creation prompts and platform capability definitions.

## Key Artifacts
- `architecture/` – product specs (`WHAT_WE_BUILT.md`, flagship implementation notes).
- `database/` – schema exports and SQL migrations.
- `capabilities/` – feature matrices and platform services.
- `deployment-governance.md` – operational playbook for rollout + PDF export archived in `_docs/zz_archive/exports/`.
- `movemental-creation-prompt.md` – canonical generation brief.
- `valuation/` – Markdown versions of the valuation narrative (00–11) plus compiled report.

## Maintenance
- Update after every major release of the platform/infra stack.
- When diagrams or databases change, regenerate references in both architecture and valuation chapters.
- Note any valuation updates inside `_docs/00_foundation/changelog.md` and notify Finance stakeholders.
