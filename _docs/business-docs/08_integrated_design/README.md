# 08 · Integrated Design

- **Owner**: Josh Shepherd
- **Last Review**: 2025-11-21
- **Interfaces With**: 03 Brand Positioning, 07 AI Content Systems, `app/`

## Scope
Design systems, WCAG rules, Alan Hirsch design game archives, and the standalone design playground experiments. This pillar governs typography, color contrast, motion patterns, and ShadCN overrides that the product team must follow.

## Key Artifacts
- **Design Game Documentation**: `_docs/design-game/` – Complete Design Game documentation including process, design language, technical reference, archive structure, examples, and resources.
- `alan-hirsch-platform-mvp-guide.md` plus archived hero implementations.
- `design_reference/` – Additional design reference materials (legacy, see design-game/ for current docs).
- `design-playground/` – Next.js sandbox for rapid prototyping (see `design-playground/STATUS.md`).

## Maintenance
- Verify every new screen against the contrast rules (see Design Rules log) before archiving.
- Keep `design_reference/` synced with lessons learned from live experiments.
- When the playground changes dependencies, document updates in `design-playground/STATUS.md` and `_docs/00_foundation/changelog.md`.
