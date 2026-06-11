# Terminology migration build notes (2026-06-10)

## Training and Tech: free entry placeholders

The pricing screen and `TwoWaysForward` component render `[Free entry point to confirm]` on the free card for **Training** and **Tech**. Do not publish a free claim until product decides whether that means:

- a free intro conversation where we help scope the engagement,
- a forthcoming free field guide, or
- a free overview page.

## Pathway slug redirects

`next.config.ts` now 301-redirects:

- `/pathway/skills` → `/pathway/training` → `/field-guide`
- `/pathway/solutions` → `/pathway/tech` → `/agent`

Review analytics and external citations before promoting the new slugs.

## Safety stat footnotes

The three Safety page stat callouts link to `/footnotes#…` rows added in `eeat-site-claims.json`. Verify primary sources against AI Reality research before shipping broadly.

## Downstream (not in this pass)

- Apply full "ways forward" copy to Sandbox, Training, and Tech stage pages (when those routes exist as dedicated screens).
- Path overview, FAQ, and pricing prose alignment beyond tier-name retirement.
- Internal knowledge base / agent KB find-replace (Section 8 of build prompt).
