# Agent updates — execution prompts

**Source consultation:** [movemental-ui-ai-design-consultation-2026-06-18.md](../../notes/movemental-ui-ai-design-consultation-2026-06-18.md)  
**Agent room doc index:** [agent-room-documentation-index.md](../../notes/agent-room-documentation-index.md)

Self-contained prompts for Cursor / Claude Code to execute the consultation's tiered recommendations. Each file is paste-ready: read the **Problem statement**, paste **The prompt** block into a fresh agent turn, then verify against **Definition of done**.

## How to run

1. Open [master_runner.md](./master_runner.md) — pick the next `Not started` row in recommended order.
2. Execute **one prompt per PR** when possible; Tier 1 before Tier 2 unless a blocker is noted.
3. After each session, update the master status table and append to **Session changelog**.
4. Cross-repo prompts name both repos explicitly (`movemental-ai`, `movemental-ai-agents`).

## Prompt index

| ID | File | Tier | Repo(s) |
| --- | --- | --- | --- |
| AU-01 | [01-unify-stage-naming-public-copy.md](./01-unify-stage-naming-public-copy.md) | 1 | movemental-ai |
| AU-02 | [02-capture-funnel-e2e-audit-and-gaps.md](./02-capture-funnel-e2e-audit-and-gaps.md) | 1 | movemental-ai |
| AU-03 | [03-preview-hygiene-noindex-legal-redirects.md](./03-preview-hygiene-noindex-legal-redirects.md) | 1 | movemental-ai |
| AU-04 | [04-single-beat-ssot-local-engine.md](./04-single-beat-ssot-local-engine.md) | 1 | movemental-ai + agents |
| AU-05 | [05-dock-affordance-copy-mental-model.md](./05-dock-affordance-copy-mental-model.md) | 2 | movemental-ai |
| AU-06 | [06-regex-routing-audit-and-tests.md](./06-regex-routing-audit-and-tests.md) | 2 | movemental-ai |
| AU-07 | [07-screen-first-routing-matrix-playwright.md](./07-screen-first-routing-matrix-playwright.md) | 2 | movemental-ai |
| AU-08 | [08-agent-room-ssr-fallback-expansion.md](./08-agent-room-ssr-fallback-expansion.md) | 2 | movemental-ai |
| AU-09 | [09-discuss-mode-staging-e2e.md](./09-discuss-mode-staging-e2e.md) | 3 | movemental-ai + agents |
| AU-10 | [10-discuss-overlay-vs-marginalia.md](./10-discuss-overlay-vs-marginalia.md) | 3 | movemental-ai |
| AU-11 | [11-discuss-entry-chips-readback.md](./11-discuss-entry-chips-readback.md) | 3 | movemental-ai |
| AU-12 | [12-path-horizontal-process-accordion.md](./12-path-horizontal-process-accordion.md) | 4 | movemental-ai |
| AU-13 | [13-leader-band-card-carousel.md](./13-leader-band-card-carousel.md) | 4 | movemental-ai |
| AU-14 | [14-pricing-stage-accordion-columns.md](./14-pricing-stage-accordion-columns.md) | 4 | movemental-ai |
| AU-15 | [15-readback-ghost-number-spine.md](./15-readback-ghost-number-spine.md) | 4 | movemental-ai |
| AU-16 | [16-render-tools-dynamic-props.md](./16-render-tools-dynamic-props.md) | 5 | movemental-ai-agents + ai |
| AU-17 | [17-host-corpus-rag-wiring.md](./17-host-corpus-rag-wiring.md) | 5 | movemental-ai-agents |
| AU-18 | [18-session-transcript-persistence.md](./18-session-transcript-persistence.md) | 5 | movemental-ai + agents |
| AU-19 | [19-room-analytics-posthog-instrumentation.md](./19-room-analytics-posthog-instrumentation.md) | 5 | movemental-ai |
| AU-20 | [20-deprecate-stream-mode.md](./20-deprecate-stream-mode.md) | 6 | movemental-ai |
| AU-21 | [21-engine-safety-flow-parity.md](./21-engine-safety-flow-parity.md) | 6 | movemental-ai + agents |
| AU-22 | [22-ssot-docs-consolidation-index.md](./22-ssot-docs-consolidation-index.md) | 6 | docs only |

## Related prompts (overlap)

| Topic | Existing prompt |
| --- | --- |
| Screen-first dock pills | [dock-pill-screen-first-routing.md](../dock-pill-screen-first-routing.md) — AU-07 extends coverage |
| Full capture backend waterfall | [wire-capture-and-enrollment-to-backend.md](../wire-capture-and-enrollment-to-backend.md) — AU-02 audits completion |
| Safety flow migration QA | [safety-flow-migration-audit.md](../safety-flow-migration-audit.md) |
| Discuss backend | [integration-agent-backend/08-discuss-phase-and-model-b-layout.md](../integration-agent-backend/08-discuss-phase-and-model-b-layout.md) |

## Guardrails (all prompts)

- **pnpm only** — never `npm` / `yarn`.
- **Ink Band only** on `/agent` — no Concept Modern / `oat-*` tokens on agent surfaces.
- **Closed screen set** — no new `ScreenId` without product sign-off.
- **Hybrid is center** — do not default every chip to agent + expand.
- **Fix bottom-up** on type errors — see [TYPE_SAFETY_CHAIN.md](../../../architecture/TYPE_SAFETY_CHAIN.md).
- **Do not** add a fourth audience funnel card for movement leaders (doctrine).
