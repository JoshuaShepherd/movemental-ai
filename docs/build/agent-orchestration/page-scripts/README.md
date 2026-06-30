# Page scripts — plain-English walkthroughs

**Purpose:** One document per screen (or screen family) in the Movemental agent room. Each file walks through what happens from arrival to exit — what the visitor sees, what the agent says, what chips appear, and how input is routed — in complete plain English. No code required to follow along.

**Audience:** Product, content, engineering, and external agents who need to understand visitor experience without reading `scenes.ts` or SSOT tables.

**Live product:** `https://movemental.ai/agent`  
**Runtime default:** `hybrid` — most chip taps and regex matches run **local choreography** (instant, no LLM). The live model runs only on **AGENT-classified** input (expanded dock text, unmatched typing, Discuss phase).

---

## How to read these scripts

Each file follows the same shape:

1. **What this page is** — role in the product metaphor (the “manuscript sheet”).
2. **How you get here** — chips, typed text, engine tools, or deep links.
3. **What appears on the sheet** — headlines, forms, interactive elements.
4. **What the agent does** — ink caption lines, gestures, follow-up chips (in order).
5. **Composer & drawer — visitor expectations** — per-screen chip table, typing fork, sheet-vs-scrim gotchas, live model notes. **Global mechanics:** [00-composer-drawer-global.md](./00-composer-drawer-global.md).
6. **Related pages** — cross-links.

**Fixed copy** is quoted. **Computed copy** (diagnostics, readback gaps) is described by rule, not every variant.

**Live copy sync:** Home screen quoted copy is auto-synced from `src/lib/agent-room/data/home-copy.ts` into marked blocks in this folder (run `pnpm agent-orchestration:sync-screen-copy`). The docs viewer rebuild runs sync automatically.

---

## Reading order (recommended)

| # | File | Screen |
| --- | --- | --- |
| **→** | **[00-00-execution-prompt.md](./00-00-execution-prompt.md)** | **Agent execution queue — run first, then clear** |
| 0 | [00-room-arrival-and-routing.md](./00-room-arrival-and-routing.md) | Shell, mast, dock, global routing |
| 0b | [00-composer-drawer-global.md](./00-composer-drawer-global.md) | Composer/dock mechanics (shared by all pages) |
| 1 | [01-home.md](./01-home.md) | `home` |
| 2 | [02-safety-flow.md](./02-safety-flow.md) | `safetyFlow` (wizard) |
| 3 | [03-beat-reality-check.md](./03-beat-reality-check.md) | `beat` |
| 4 | [04-readback.md](./04-readback.md) | `readback` |
| 5 | [05-safety-stage.md](./05-safety-stage.md) | `safety` |
| 6 | [06-path.md](./06-path.md) | `path` |
| 7 | [07-sandbox.md](./07-sandbox.md) | `sandbox` |
| 8 | [08-training.md](./08-training.md) | `training` |
| 9 | [09-technology.md](./09-technology.md) | `technology` |
| 10 | [10-about.md](./10-about.md) | `about` |
| 11 | [11-pricing.md](./11-pricing.md) | `pricing` |
| 12 | [12-faq.md](./12-faq.md) | `faq` |
| 13 | [13-founders.md](./13-founders.md) | `founders` |
| 14 | [14-leader-profiles.md](./14-leader-profiles.md) | `leader` |
| 15 | [15-contact.md](./15-contact.md) | `contact` |
| 16 | [16-capture-and-confirm.md](./16-capture-and-confirm.md) | `capture` + `confirm` |
| 17 | [17-safety-dashboard-legacy.md](./17-safety-dashboard-legacy.md) | `safetyDashboard` |
| 18 | [18-engine-overlays.md](./18-engine-overlays.md) | `network`, `audience`, `handoff_human` |
| 19 | [19-document-pages.md](./19-document-pages.md) | `/agent/nonprofits`, `/agent/about`, … |

**Related (technical performance script):** [../movemental-room-script.md](../movemental-room-script.md) — edit-oriented scene keys and file pointers.  
**Related (architecture):** [../overview.md](../overview.md) — routing tree and redesign levers.

---

*Created 2026-06-29. When screens or scenes change, update the matching page script first, then SSOTs and `scenes.ts`. When **fixed screen copy** changes, edit `src/lib/agent-room/data/*-copy.ts` and run `pnpm agent-orchestration:sync-screen-copy`.*
