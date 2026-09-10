# 20. The dashboard shell — MOVED to its own prompt set

**Status** Re-scoped 2026-09-09 · **See** `docs/build-prompts/dashboard/`

## The scope question, answered

Prompt 20 opened by requiring a scope question before any work: *"Ask the user
whether the dashboard is in scope for this redesign."*

**Answer: not now.** The dashboard gets proper prompts as a separate project
rather than one thin file at the end of the marketing set.

## Why one prompt was never enough

The original file covered five routes in eighty lines. Reading the real code made
the mismatch obvious:

- It assumed three artifact states (drafted / in review / ratified). The schema
  has **two**: `draft` and `published`. There is no in-review state, which is
  the state a charter actually sits in longest.
- It treated ratification as a step in a flow. The schema binds a ratification to
  a specific `version_id`, which makes "what exactly did the board approve?" a
  central design problem rather than an implementation detail.
- It did not account for the fact that **a charter is never empty on first
  login** — provisioning inserts version 1 of all five documents — which changes
  the entire day-one design. Five of five layers read as "complete" before anyone
  has looked at them.
- It folded onboarding, two step flows over routes nobody had read, into the same
  file as the charter.

## What replaced it

`docs/build-prompts/dashboard/` — an index plus five prompts:

| # | Page |
| --- | --- |
| D1 | The shell and `/dashboard` |
| D2 | `/dashboard/safety` — the charter |
| D3 | The document view — read, edit, version |
| D4 | Ratification and signatures |
| D5 | Onboarding, both flows |

The index carries the full repo findings — the routes, the `safety_*` tables,
the real two-state model, and how saving and publishing actually work — so the
five prompts do not each re-derive them. It also records four open product
questions, one of which (signatures versus ratifications) blocks D4.

`/dashboard/ai-reality` is not in the set: it renders the same component already
designed as `Movemental Shared Reality.dc.html`. Its empty and unconfigured
states are covered by D1.
