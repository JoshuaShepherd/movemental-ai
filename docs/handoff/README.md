# Movemental — design → repo migration handoff

Target repo: **JoshuaShepherd/movemental-ai**, branch `main`, tree `205198904fdf`
Recon performed: **2026-09-09T22:58Z** against that tree, not from memory.
Design source: 25 `.dc.html` screens in `designs/`, screenshots in `screenshots/`.

This package exists because a prose brief plus screenshots is not a handoff. The
agent doing the work inherits the repository, not the design conversation.
Everything decided in that conversation is written here or it is invisible.

## Read in this order

| File | What it does |
| --- | --- |
| `01-recon.md` | Every claim this package makes about the repo, traced to a file actually read |
| `02-drift.md` | **Authoritative.** Where the design work assumed something the repo contradicts |
| `03-decisions.md` | Every contradiction classified: locked / stop-and-report / check-and-branch |
| `04-component-map.md` | Real file paths per screen, marked import or model. Includes the hex→token table |
| `05-fixture-seam.md` | What is real, what is stubbed, what arrives later, per dynamic surface |
| `06-phases.md` | Ordered phases, each with a gate you can run rather than eyeball |
| `07-return-channel.md` | State file, schema requests, TODO tags, receipt |
| `templates/` | Starting content for the state file and the schema-request file |

`02-drift.md` overrides anything earlier in any document, including the original
build prompts in `build-prompts/`. Those prompts were written before this recon
and several of their assumptions are now known wrong.

## The three things most likely to go wrong

1. **Inventing a component.** The repo has exactly one UI primitive —
   `src/components/ui/button.tsx`. shadcn is configured but nothing else has been
   added. An agent that reaches for `Card`, `Badge`, or `Separator` will generate
   them and they will not match Ink Band. See `04-component-map.md`.
2. **Pasting hex.** The designs are inline-styled HTML full of hex literals,
   because that is what the design tool emits. The repo forbids hex in component
   source. The translation table in `04-component-map.md` is not optional.
3. **Guessing the package manager.** Both `package-lock.json` and
   `pnpm-lock.yaml` are committed. `03-decisions.md` locks this.

## Before writing any code

`AGENTS.md` at the repo root says this is Next.js 16.2.3 and that its APIs and
conventions differ from training data, and instructs you to read the relevant
guide in `node_modules/next/dist/docs/` first. That instruction is part of this
handoff. Follow it.

## Bundle contents

```
handoff/
  README.md                  this file — start here
  01-recon.md                files read → what they establish
  02-drift.md                authoritative: design assumptions the repo contradicts
  03-decisions.md            locked / stop-and-report / check-and-branch
  04-component-map.md        real paths per screen + the hex→token table
  05-fixture-seam.md         real vs stubbed vs later, per surface
  06-phases.md               ordered phases, each with a runnable gate
  07-return-channel.md       state file, schema requests, TODO tags, receipt
  templates/                 starting content for MIGRATION-STATE and SCHEMA-REQUEST
  designs/                   22 .dc.html screens — SSOT for pixels
    assets/                  20 portraits (17 leaders, 3 founders)
    history/                 home v2, v3, original — context, not build targets
    support.js md.js deck-stage.js
  screenshots/               18 captures + index
  build-prompts/             27 original prompts — SUPERSEDED by 02-drift.md
```

Design files open directly in a browser. No build step, no install.

## Readiness gate

| § | Requirement | Status |
| --- | --- | --- |
| 1 | Every repo claim traces to a file actually read | ✅ `01-recon.md`, 20 files at tree `205198904fdf` |
| 2 | Drift table present and marked authoritative | ✅ `02-drift.md`, 10 drift rows + 4 verified-unchanged |
| 3 | Every contradiction classified | ✅ 6 locked, 3 stop-and-report, 5 check-and-branch |
| 4 | Unverified capabilities written as check-then-branch | ✅ C-1…C-5 |
| 5 | Components named by real path, marked import or model | ✅ `04-component-map.md`, 22 screens |
| 5 | Anti-invention constraints stated | ✅ 7 constraints + the 13-row token table |
| 6 | Fixture seam declared per dynamic surface | ✅ 15 surfaces |
| 7 | Copy verbatim; design source committed | ✅ `designs/` — copy lives in the markup, unparaphrased |
| 8 | Every phase has a runnable or greppable gate | ✅ 9 phases, gates are `pnpm` scripts or `grep` |
| 9 | State file, schema-request file, TODO tag, receipt defined | ✅ `07-return-channel.md` + `templates/` |

## What a stranger would still have to guess

The adversarial read. These are the soft spots — named rather than hidden.

1. **How faithful is "model" mode meant to be?** For the screens marked *model*,
   this package does not say whether the existing repo component should be
   restyled in place or replaced. Default assumed: restyle in place, keep the
   component's data contract. If that is wrong for a screen, say so before
   Phase 2.
2. **The agent-room shell is not fully specified.** `ink-band.module.css` is
   138KB and was not read in full. A stranger rebuilding the home hero will have
   to read the relevant block themselves. C-5 tells them to; it cannot tell them
   which class.
3. **Copy that changed during design is not diffed.** The designs carry the
   current copy, and repo data files carry the old. Where a screen reads from a
   data file (pricing, FAQ, beats), the data file wins and the design should not
   be used to "correct" it. Where the copy is in the design only (home hero,
   the "Built with" line), the design wins. No table enumerates which is which —
   the fixture seam implies it but does not spell it out per string.
4. **Phase ordering assumes the Safety route lands first.** If Phase 1 is
   deferred, every `link:check` gate after it will fail on the dangling
   `/agent/path/safety` links that already exist in the repo. Deferring Phase 1
   means suspending that gate, not ignoring its failure.
5. **No visual regression baseline exists.** The gates prove the code compiles,
   routes resolve, and no hex leaked. Nothing proves the result looks right.
   That judgement stays human.
