# Movemental — Full Website Migration Prompt Suite

**Canonical location:** `docs/build/prompts/full-site-migration/`  
**Target agents:** Antigravity / Claude Code / Cursor executing one prompt at a time or in a runner loop  
**Source handoff:** `docs/handoff/` (22 `.dc.html` designs, drift register, decision register, token map, fixture seam)  
**Target tree:** `movemental-ai` on Next.js 16.2.3  

---

## 1. Overview & Objective

This prompt suite provides an end-to-end, automated migration protocol to replace the existing Movemental website with a complete, 1-to-1 pixel-faithful, token-compliant implementation derived from the design handoff package (`docs/handoff/`).

### Core Strategic Mandates

1. **Zero Overwrite During Build (Shadow Staging):**  
   The candidate website is built entirely in parallel (`src/v2/` and `/v2/*` routes) so that the active website (`/`, `/agent`, `/program`, `/enroll`, etc.) remains 100% operational and undisturbed during development.
2. **Iterative Runner & Loop to 100%:**  
   Execution is governed by `master_runner.md` and an autonomous loop protocol. Each prompt defines an explicit contract, design source, anti-invention rules, and runnable verification gates.
3. **Rigorous Verification & Testing Gate:**  
   Once all components and routes are staged in the shadow tree (100%), a dedicated test gate (FSM-30) executes unit tests, link checks, zero-hex enforcement, and Playwright E2E/visual parity tests.
4. **Atomic Production Cutover & Platform Archival:**  
   Only after testing passes 100% does FSM-31 execute: the current platform is snapshotted to `archive/platform-v1-<timestamp>/`, the v2 files are placed at canonical production slugs, and post-cutover verification is performed.

---

## 2. Directory Structure

```
docs/build/prompts/full-site-migration/
├── README.md                                      # This specification & overview
├── master_runner.md                               # Master orchestrator, status table, loop protocol
├── run-loop.sh                                    # Runnable shell script for gate checking & loop automation
├── 00-preflight-scaffold-and-tokens.md            # FSM-00: Staging scaffold, tokens, MIGRATION-STATE
├── 01-safety-stage.md                             # FSM-01: /agent/path/safety (new route)
├── 02-home-v4.md                                  # FSM-02: Movemental Home v4 (hero & full-width leader band)
├── 03-reality-map-and-assess.md                   # FSM-03: /assess (reality check & diagnostic)
├── 04-shared-reality.md                           # FSM-04: /share/ai-reality/[token] (org readback)
├── 05-audience-editions.md                        # FSM-05: /agent/{churches,nonprofits,institutions}
├── 06-audience-decks.md                           # FSM-06: /agent/{churches,nonprofits,institutions}/deck
├── 07-program-pricing.md                          # FSM-07: /program (tiers, pricing, FAQ)
├── 08-enroll-flow.md                              # FSM-08: /enroll (sprint application flow)
├── 09-field-guide.md                              # FSM-09: /field-guide (handbook & field guide content)
├── 10-research-hub.md                             # FSM-10: /research (research library & catalog)
├── 11-research-paper-detail.md                    # FSM-11: /research/[slug] (full paper layout & TOC)
├── 12-research-indexes.md                         # FSM-12: /research/findings & /research/sources
├── 13-articles-hub.md                             # FSM-13: /articles (editorial articles catalog)
├── 14-article-detail.md                           # FSM-14: /articles/[slug] (editorial article reader)
├── 15-voices-hub.md                               # FSM-15: /voices (committed voices + 25-leader scenius)
├── 16-voice-profile.md                            # FSM-16: /voices/[slug] (individual leader profile)
├── 17-about-founders.md                           # FSM-17: /about (three founder bios & story)
├── 18-founder-profile.md                          # FSM-18: /about/[slug] (deep founder profile)
├── 19-how-we-use-ai.md                            # FSM-19: /agent/how-we-use-ai (disclosure experience)
├── 20-footnotes-eeat-registry.md                  # FSM-20: /footnotes (EEAT citation registry)
├── 21-utility-shell-and-newsletter.md             # FSM-21: /newsletter/* & utility wrappers
├── 22-dashboard-shell-and-safety.md               # FSM-22: /dashboard, /dashboard/safety, /onboarding
├── 30-full-suite-testing-and-parity-gate.md       # FSM-30: Comprehensive test suite, zero-hex & E2E gate
└── 31-production-cutover-and-platform-archive.md  # FSM-31: Archive v1 platform and promote v2 to production
```

---

## 3. Authoritative Ground Rules & Decisions

Every prompt in this pack inherits the locked decisions from `docs/handoff/02-drift.md` and `docs/handoff/03-decisions.md`:

| Code | Rule | Enforcement |
| --- | --- | --- |
| **L-1** | `/agent/path/safety` is a new public route | Create `src/v2/app/agent/path/safety/page.tsx` from `Movemental Safety Stage.dc.html`. |
| **L-2** | Package manager is strictly `pnpm` | Use `pnpm` for all scripts; never alter `pnpm-lock.yaml` unexpectedly. |
| **L-3** | Names & headshots only for the 25 movement leaders | No invented role or bio text on roster cards. Founders retain roles from `content.ts`. |
| **L-4** | Zero hex in component source | All colors must resolve through `--color-ink-band-*` tokens. |
| **L-5** | Home is v4 | Build from `Movemental Home v4.dc.html`; v2/v3/current are historical reference only. |
| **L-6** | Do not rebuild existing auth or legal pages | `/login`, `/signup`, `/terms`, etc. are already authored and must not be replaced. |
| **S-1** | Do not touch `/dashboard/ai-reality` | This route exists without a design; leave it untouched. |
| **S-2** | No unused safety tables | Ground only in `safety_artifacts`, `versions`, `publications`. Do not wire `safety_guidebooks`. |
| **S-3** | Do not alter publishing permissions | Do not invent role gates or delete UI affordances. |

---

## 4. How to Run the Loop

1. Read [`master_runner.md`](./master_runner.md).
2. Execute prompts sequentially according to the **Recommended execution order**.
3. For automated gate checking, use:
   ```bash
   bash docs/build/prompts/full-site-migration/run-loop.sh check <PROMPT_ID>
   ```
4. Follow the prompt's Definition of Done and gate criteria before marking **Done** in `master_runner.md`.
