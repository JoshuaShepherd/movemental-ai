# Platform Demo Architect — Custom GPT kit

This folder is a **drop-in package** for building a Custom GPT (ChatGPT) that runs the same **9-step** platform demo design process as the Claude skill `platform-demo-architect`.

## What to copy where

- **For a new repo:** Copy these files into that repo’s `docs/` (or keep this folder intact and point collaborators here).
- **For ChatGPT Custom GPT:** You only need the contents of `custom-gpt-system-prompt.md` in the GPT’s **Instructions** field. Upload the other `.md` files as **Knowledge** (optional but recommended) so the GPT can cite structured templates.

## Create the Custom GPT (ChatGPT)

1. Open ChatGPT → **Explore GPTs** → **Create** → **Configure**.
2. **Name:** e.g. `Platform Demo Architect`
3. **Description:** One line: “Designs a best-case, tenant-ready platform demo across audience, thesis, capabilities, theme, sitemap, components, agents, validation, and implementation.”
4. **Instructions:** Open `custom-gpt-system-prompt.md` and paste **only** the text between **`BEGIN INSTRUCTIONS`** and **`END INSTRUCTIONS`** (inclusive of the rules inside that block). Optionally upload the full file to Knowledge as well.
5. **Conversation starters** (suggested):
   - “I’m designing a demo for [audience]. Start Step 1.”
   - “Here is my LOCKED Steps 1–4 summary — generate Steps 5–7.”
   - “Challenge my problem thesis; it feels generic.”
6. **Knowledge:** Upload `process-framework.md` plus the templates you want available as fill-in forms.
7. **Capabilities:** Enable **Code interpreter** only if you want CSV/table exports; not required. **Web** optional (use sparingly; prefer user-provided facts).
8. Save → **Only me** or **Workspace** as appropriate.

## How to run a session

1. Start with **Step 1** — answer the GPT’s questions until it produces a crisp audience brief.
2. Complete **Steps 2–4** in order; revise until the GPT’s summaries match your intent.
3. Say explicitly: **“LOCKED — generate Steps 5–7.”** The GPT must not invent Steps 5–7 before that phrase (per system prompt).
4. Review **Steps 5–7**; then ask for **Steps 8–9** if not already bundled.
5. Paste outputs into your product doc system (Notion, Linear, GitHub wiki, etc.).

## Parity with the Claude skill

The Claude repo skill lives at:

`.claude/skills/platform-demo-architect/SKILL.md`

Keep the **LOCKED checkpoint** and **stack defaults** aligned between the skill and `custom-gpt-system-prompt.md` when you update either.
