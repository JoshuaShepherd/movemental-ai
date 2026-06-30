# 00 Execution prompt — page-script fixes (run first)

**Purpose:** Copy this entire file into Cursor or Claude Code when the queue has steps. When empty, add new steps from page-script audits.

**Status:** `EMPTY` — queue cleared after successful run  
**Last executed:** 2026-06-29 (steps 1–6)

---

## Queue

_No pending steps._

---

## Changelog

| Date | Steps | Notes |
| --- | --- | --- |
| 2026-06-29 | 1–6 | Home copy dedupe; document `?ask=` → AGENT; Ways-in lead → beat; Ways-in doors → AGENT; overview §5 auto-expand fix; `19-document-pages.md` handoff table. Code: `home-copy.ts`, `use-agent-room-hybrid.ts`. Tests: `agent-home-dock.spec.ts`, `agent-ways-in-interaction.spec.ts`. |

---

## Prompt maintenance

1. **Execute** — paste **Queue** into an agent session when steps exist; run verification commands from the archived prompt or SSOT docs.
2. **Empty** — on success, clear Queue to `_No pending steps._`, log in Changelog.
3. **Revise** — when page scripts or code drift, add new numbered steps above Changelog; set **Status** to `QUEUE`.

*Regenerate viewer after queue edits: `pnpm agent-orchestration:viewer:build`.*
