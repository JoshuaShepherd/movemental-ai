# Fragmentation intel-artifacts — gap analysis

> Source of truth: [src/components/intel-artifacts/types.ts](../../../src/components/intel-artifacts/types.ts), Approach B's 13-artifact vocabulary in [fragmentation-unified-system-mockup.html](../fragmentation-unified-system-mockup.html), and the ART lookup in [fragmentation-sticky-mockup-css.html](../fragmentation-sticky-mockup-css.html) lines 3220–3545.

## Narrative slugs — coverage

| # | Slug | Family | Status | Narrative role | Primary insertion points |
|---|---|---|---|---|---|
| 1 | `order-of-service-structured-units` | info | covered | Unified ritual / single surface (Act I) | sticky-stage `unity`, scatter |
| 2 | `session-essential-structures-card` | info | covered | Complete unit of meaning (Act I) | sticky-stage `session`, scatter |
| 3 | `formal-design-systems-split-flow` | rel-leaning | covered | Duplication without a center (Act II) | sticky-stage `first-break`, scatter, IDE file |
| 4 | `book-fragments-of-form` | info | covered | Authored fragments (Act III) | sticky-stage `divergence`, constellation, IDE file |
| 5 | `module-formal-systems-intro` | info | covered | Modular surface (Act III) | sticky-stage `divergence`, constellation, IDE file |
| 6 | `cover-principles-design-fragmentation` | info | covered | Promise drift (Act III) | sticky-stage `divergence`, IDE file |
| 7 | `cover-structural-fragments-investigation` | info | covered | Research artifact (Act V) | sticky-stage `misalignment`, scatter |
| 8 | `podcast-card-abstract-structures` | info | covered | Parallel channel (Act IV) | sticky-stage `channels`, scatter |
| 9 | `mobile-chat-skeleton-bubbles` | rel | covered | Conversational shards (Act IV) | sticky-stage `channels`, scatter |
| 10 | `email-thread-multi-participant` | rel | covered | Async drift (Act V) | sticky-stage `misalignment`, scatter |
| 11 | `message-thread-staggered-fragments` | rel | covered | Misaligned thread (Act V) | sticky-stage `misalignment`, scatter |
| 12 | `core-hub-to-fragment-nodes` | rel | covered | Integration hub (spine) | scatter |
| 13 | `sketch-converge-diverge-flow` | info | covered | Formation abstract | scatter, formation |
| 14 | `stage-presentation-three-shapes` | info | covered | Embodied / public surface | scatter, formation |

## New narrative slugs (to add, per Approach B's two-family vocabulary)

| # | Slug | Family | Status | Narrative role | Primary insertion points |
|---|---|---|---|---|---|
| 15 | `doc-pdf-generic` | info | new | Generic brief / report artifact | scatter (outer ring), IDE file rows |
| 16 | `video-frame-timestamped` | info | new | Broadcast / video channel (Act IV) | sticky-stage `channels`, constellation |
| 17 | `notes-sticky-sketch` | info | new | Field notes, reflection (pathway stop) | scatter, formation "Reflection" stop |
| 18 | `crm-person-card` | rel | new | Person affordance, relationship state | sticky-stage `misalignment`, formation "Community" stop |
| 19 | `node-single` | rel (primitive) | new | Constellation vertex | peer-network composition in multiplication |
| 20 | `node-group` | rel (primitive) | new | Peer cluster with `+N` badge | peer-network composition in multiplication |

## Operational surfaces — coverage

| # | Slug | Family | Status | Narrative role |
|---|---|---|---|---|
| 1 | `intel-seo-surface` | info | covered | Search/share index surface (multiplication infra) |
| 2 | `intel-geo-entity` | info | covered | Machine-readable entity (activation schema tab) |
| 3 | `intel-translation-stack` | info | covered | Locale drift (multiplication infra) |
| 4 | `intel-ecommerce-shelf` | info | covered | Commerce expression (multiplication optional) |
| 5 | `intel-subscription-ledger` | info+rel | covered | Billing ↔ formation tie (multiplication) |
| 6 | `intel-ai-agent-workpack` | info | covered | Agent boundary (activation panel, multiplication infra) |

## Primitive gaps (atomic building blocks, not slugs)

- `IvNode` — circle vertex (outline / filled / primary), optional label.
- `IvNodeGroup` — ring + `+N` badge.
- `IvPdfBadge` — `PDF` pill.
- `IvPlayGlyph` — triangle on dark disc for video.
- `IvSticky` — warm-tinted, lightly rotated sticky-note shell.
- `IvBar` — add optional `height` size token.
- `IvAvatar` — add `size` + `unread` dot.

## Summary

- **Narrative:** 14 covered, 6 to add → **20 total** (14 existing + 3 info + 3 rel).
- **Operational:** 6 covered, 0 gap.
- **Primitives:** 5 new + 2 level-ups.
- **Wire-in:** 7 story files under `src/components/sections/fragmentation-story/` still render `<Image src={IMG.*}>` and must switch to `IntelNarrativeArtifact`.

See [fragmentation-intel-artifacts-visual-build.md](../prompts/fragmentation-intel-artifacts-visual-build.md) for the step-by-step build.
