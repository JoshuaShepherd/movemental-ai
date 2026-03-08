# 10 · Tools & Utilities

- **Owner**: Josh Shepherd
- **Last Review**: 2025-11-21
- **Interfaces With**: All pillars + app/engineering

## Scope
Support tooling, frameworks, NotebookLM packages, documentation bundles, and visualization utilities that help produce or distribute Movemental knowledge.

## Key Artifacts
- `frameworks/` – reusable canvases and decision models.
- `notebooks/` – Jupyter/NotebookLM exports and analysis notebooks.
- `visualizations/` – shared charts (when not embedded elsewhere).
- `knowledge_ops/` – master documentation packages, platform audits, NotebookLM strategies, design-game handbook.

## Maintenance
- Keep NotebookLM + audit packages updated after each major release cycle.
- Archive obsolete utilities under `_docs/zz_archive/` with a short note.
- Track cross-pillar dependencies (e.g., frameworks referenced in strategy docs) inside `_docs/00_foundation/changelog.md`.
