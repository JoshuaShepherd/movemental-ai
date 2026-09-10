# 7 · Return channel

The migration must hand back a description of what it did and what it could not
do. Four mechanisms.

## 1 · State file — `MIGRATION-STATE.md` (repo root)

Created in Phase 0, updated at **every** phase boundary and at every
check-and-branch skip. Start from `templates/MIGRATION-STATE.md`.

This is the difference between a resumed session and one that starts over. It
must record:

- the tree sha this handoff was built against (`205198904fdf`)
- one line per phase: not started / in progress / done, with the gate output
- every `03-decisions.md` check-and-branch that took the *absent* path, with one
  line of reason
- every stop-and-report finding

## 2 · Schema requests — `SCHEMA-REQUEST.md`

No DDL originates from this migration. Anything needing a new table, column, or
index gets appended to `SCHEMA-REQUEST.md` with: the screen that wants it, the
shape, and what the UI does in the meantime. Start from `templates/`.

Known candidate: `movement_leaders.primary_role` is empty for 24 of 25 rows.
That is a **data** gap, not a schema gap — the column exists. It does not
belong in this file; it belongs in the receipt.

## 3 · TODO markers

At every deferral, at the exact site:

```
// TODO(migration-slice-N): <what is missing> — see MIGRATION-STATE.md
```

Greppable: `grep -rn "TODO(migration-slice" src/`. Phase 8's gate depends on
every one of them having a matching state-file line.

## 4 · Receipt

At the end, a short status document — or an update to `github.md` if the
project keeps one — carrying:

- what shipped, by route
- what was skipped and why
- the three product questions this migration surfaced but must not answer:
  1. Any org member can publish a board document today; the dashboard UI
     implies role-gating (S-3).
  2. `/dashboard/ai-reality` is live with no design (S-1).
  3. `movement_leaders.primary_role` is empty for 24 of 25 leaders, which is why
     no roster shows role text (L-3).

**Do not claim a commit sha you do not know.** If the receipt needs one, read it
from `git rev-parse HEAD` after the final commit — never reconstruct it.
