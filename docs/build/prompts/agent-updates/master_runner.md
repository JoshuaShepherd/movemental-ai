# Agent updates — master runner

**Canonical location:** `docs/build/prompts/agent-updates/`  
**Target agent:** Cursor / Claude Code executing one prompt at a time  
**Source:** [movemental-ui-ai-design-consultation-2026-06-18.md](../../notes/movemental-ui-ai-design-consultation-2026-06-18.md)  
**Last updated:** 2026-06-18

---

## Mandatory agent protocol (every session)

1. **Read this file first** when picking up work in a new context window.
2. Execute prompts in **Recommended order** unless the status table shows a dependency resolved.
3. After each prompt, **update this file**:
   - Set **Status**, **Last touched**, **Branch**, **Blockers** in the master table.
   - Append a row to **Session changelog**.
4. Run the child prompt's **Verification commands** before marking **Done**.
5. **One prompt per PR** when possible.

**Status values:** `Not started` · `In progress` · `Blocked` · `PR open` · `Done` · `Deferred`

---

## Master status table

| Order | ID | Prompt | Status | Last touched | Branch | Blockers / notes |
| ---: | --- | --- | --- | --- | --- | --- |
| 1 | AU-01 | [01-unify-stage-naming-public-copy.md](./01-unify-stage-naming-public-copy.md) | **Done** | 2026-06-18 | — | SSOT in `naming.ts`; legacy keys in `stage-mapper.ts` only |
| 2 | AU-02 | [02-capture-funnel-e2e-audit-and-gaps.md](./02-capture-funnel-e2e-audit-and-gaps.md) | **Done** | 2026-06-18 | — | Audit matrix in CTAs note; capture tests added |
| 3 | AU-03 | [03-preview-hygiene-noindex-legal-redirects.md](./03-preview-hygiene-noindex-legal-redirects.md) | **Done** | 2026-06-18 | — | `NEXT_PUBLIC_SITE_LAUNCH_READY`; legal pages; `/voices` redirect |
| 4 | AU-04 | [04-single-beat-ssot-local-engine.md](./04-single-beat-ssot-local-engine.md) | **Done** | 2026-06-18 | — | `beat-catalog.ts` SSOT; local MAP_Q expanded to 6 engine beats |
| 5 | AU-05 | [05-dock-affordance-copy-mental-model.md](./05-dock-affordance-copy-mental-model.md) | **Done** | 2026-06-18 | — | `DOCK_LEGEND_COPY` + `aria-describedby` |
| 6 | AU-06 | [06-regex-routing-audit-and-tests.md](./06-regex-routing-audit-and-tests.md) | **Done** | 2026-06-18 | — | False-positive matrix locked in unit tests |
| 7 | AU-07 | [07-screen-first-routing-matrix-playwright.md](./07-screen-first-routing-matrix-playwright.md) | **Done** | 2026-06-18 | — | Matrix doc + agent-chip-routing e2e |
| 8 | AU-08 | [08-agent-room-ssr-fallback-expansion.md](./08-agent-room-ssr-fallback-expansion.md) | **Done** | 2026-06-18 | — | `home-copy.ts` SSOT; noscript + path copy |
| 9 | AU-09 | [09-discuss-mode-staging-e2e.md](./09-discuss-mode-staging-e2e.md) | **Done** | 2026-06-18 | — | Turn-cap capture overlay; mocked E2E |
| 10 | AU-10 | [10-discuss-overlay-vs-marginalia.md](./10-discuss-overlay-vs-marginalia.md) | **Not started** | — | — | **Operator decision** before large UI work |
| 11 | AU-11 | [11-discuss-entry-chips-readback.md](./11-discuss-entry-chips-readback.md) | **Not started** | — | — | Blocked on AU-09 or Discuss flag plan |
| 12 | AU-12 | [12-path-horizontal-process-accordion.md](./12-path-horizontal-process-accordion.md) | **Not started** | — | — | UI-only; Ink Band canon |
| 13 | AU-13 | [13-leader-band-card-carousel.md](./13-leader-band-card-carousel.md) | **Not started** | — | — | |
| 14 | AU-14 | [14-pricing-stage-accordion-columns.md](./14-pricing-stage-accordion-columns.md) | **Not started** | — | — | |
| 15 | AU-15 | [15-readback-ghost-number-spine.md](./15-readback-ghost-number-spine.md) | **Not started** | — | — | |
| 16 | AU-16 | [16-render-tools-dynamic-props.md](./16-render-tools-dynamic-props.md) | **Done** | 2026-06-18 | — | `show_pricing`/`founders`/`about` dynamic props |
| 17 | AU-17 | [17-host-corpus-rag-wiring.md](./17-host-corpus-rag-wiring.md) | **Done** | 2026-06-18 | — | RAG wired; corpus-and-rag.md + §15.2 updated |
| 18 | AU-18 | [18-session-transcript-persistence.md](./18-session-transcript-persistence.md) | **Done** | 2026-06-18 | — | GET restore + anon index migration |
| 19 | AU-19 | [19-room-analytics-posthog-instrumentation.md](./19-room-analytics-posthog-instrumentation.md) | **Done** | 2026-06-18 | — | PostHog events + agent-room-analytics-events.md |
| 20 | AU-20 | [20-deprecate-stream-mode.md](./20-deprecate-stream-mode.md) | **Done** | 2026-06-18 | — | stream → hybrid; legacy flag; e2e migrated |
| 21 | AU-21 | [21-engine-safety-flow-parity.md](./21-engine-safety-flow-parity.md) | **Done** | 2026-06-18 | — | Engine steps + charter e2e; room-host seeded |
| 22 | AU-22 | [22-ssot-docs-consolidation-index.md](./22-ssot-docs-consolidation-index.md) | **Done** | 2026-06-18 | — | `agent-room-documentation-index.md` created |

---

## Recommended execution order

```text
Tier 1 — Product truth (parallel OK after AU-01)
  AU-01  Unify stage naming
  AU-02  Capture funnel E2E audit
  AU-03  Preview hygiene
  AU-04  Single beat SSOT          ← needs agents repo access

Tier 2 — Visitor mental model
  AU-05  Dock affordance copy
  AU-06  Regex routing audit
  AU-07  Screen-first matrix + Playwright
  AU-08  SSR fallback expansion

Tier 3 — Discuss (operator gates AU-10)
  AU-09  Discuss staging E2E
  AU-10  Overlay vs marginalia decision + implementation
  AU-11  Discuss entry chips on readback

Tier 4 — Information design (UI-only, can parallelize)
  AU-12  Path accordion
  AU-13  Leader carousel
  AU-14  Pricing accordion
  AU-15  Readback spine

Tier 5 — Agent intelligence
  AU-16  Dynamic render props      ← agents repo
  AU-17  RAG wiring                ← agents repo + env
  AU-18  Session persistence
  AU-19  PostHog instrumentation

Tier 6 — Hygiene
  AU-20  Deprecate stream mode     ← last; keep regression path until sign-off
  AU-21  Engine safety flow parity
  AU-22  SSOT docs index           ← anytime; good first doc PR
```

---

## Session changelog

| Date | ID | Agent | Outcome |
| --- | --- | --- | --- |
| 2026-06-18 | AU-01 | Cursor | Unified public stage labels; SSOT in `naming.ts` + `stage-mapper.ts`; unit tests |
| 2026-06-18 | AU-02 | Cursor | Capture funnel audit matrix; `submitLead` + schema tests; CTAs note updated |
| 2026-06-18 | AU-04 | Cursor | `beat-catalog.ts` SSOT; MAP_Q expanded to 6 engine beats; cross-repo sync tests |
| 2026-06-18 | AU-05 | Cursor | Dock legend copy + a11y; Playwright coverage |
| 2026-06-18 | AU-06 | Cursor | Regex routing audit; false-positive unit matrix; gotcha docs updated |
| 2026-06-18 | AU-07 | Cursor | Chip routing matrix doc; agent-chip-routing e2e; composer-routing unit tests |
| 2026-06-18 | AU-08 | Cursor | SSR fallback expansion; `home-copy.ts` SSOT; fallback unit test |
| 2026-06-18 | AU-09 | Cursor | Discuss turn-cap capture overlay; mocked discuss e2e; staging env doc |
| 2026-06-18 | AU-16 | Cursor | Dynamic render props on pricing/founders/about; engine + client Zod; room-host tests |
| 2026-06-18 | AU-17 | Cursor | file_search tests + corpus-and-rag.md + platform ref §15.2 RAG operator steps |
| 2026-06-18 | AU-18 | Cursor | Transcript GET restore; anon index; query script; validate:all green |
| 2026-06-18 | AU-22 | Cursor | Agent room documentation index; SSOT cross-links; CLAUDE.md pointer |
| 2026-06-18 | AU-03 | Cursor | Preview noindex gate, legal pages, `/voices` redirect, pricing placeholder fix |
| 2026-06-18 | AU-19 | Cursor | PostHog agent-room events; analytics helper; unit tests |
| 2026-06-18 | AU-20 | Cursor | Stream mode deprecated; hybrid default; e2e migrated |
| 2026-06-18 | AU-21 | Cursor | Safety flow engine parity; charter ui_render e2e; room-host branching |
| 2026-06-18 | — | — | Prompt suite created from UI/AI design consultation |

---

## Verification baseline (run before any AU prompt)

```bash
pnpm typecheck
pnpm test:run tests/unit/route-input.test.ts tests/unit/move-classifier.test.ts tests/unit/composer-routing.test.ts
pnpm test:e2e tests/e2e/agent-home-dock.spec.ts
```

Optional engine probe: `RUN_AGENT_ROOM_EE=1 pnpm test:e2e tests/e2e/agent-room.spec.ts`
