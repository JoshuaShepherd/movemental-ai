# D3. The document view — read, edit, version

**Status** Built — the `document` screen of `Movemental Dashboard.dc.html`

## Purpose

The screen where the work happens. A leader opens one of the five documents,
reads a draft written in their organization's context, changes what is wrong, and
saves. The promise is **"you edit instead of authoring"** — so this is a revision
surface, not a blank editor.

## Read first

- `charter-dashboard.ts` — the save path: new version at
  `version_number = latest + 1`, artifact set back to `draft`
- `safety-charter-drafts.ts` — the actual draft HTML the documents contain
- `Movemental Article.dc.html` — the reading typography already built; a charter
  layer is a document and should read like one

## The shape of the data

- `latestVersion.body_md` holds the body. The current shell injects it with
  `dangerouslySetInnerHTML` under `prose` classes.
- Versions are **append-only**. Every save is a new numbered row; nothing is
  overwritten. A board can be shown exactly what changed and when.
- Saving a draft on a published artifact **reverts it to draft**. That is a real
  consequence and the UI must say so before it happens, not after.

## Structure

1. **Document header** — layer number, formal document name, plain title, and
   current state. Mono for the metadata, Playfair for the title.
2. **The reading view first.** Default to reading, not editing. Someone opening
   Layer 02 is far more often reading it than changing it. Measure capped at
   66ch, notebook margin, the same body typography as the article reader.
3. **Edit as a deliberate mode.** One clear affordance to enter it. In edit mode
   the measure stays the same so the text does not reflow under the eye.
4. **Save consequence, stated before the act.** When the artifact is published,
   saving returns it to draft and the ratification no longer applies to the
   current text. Say that plainly at the point of saving.
5. **Version history** — the numbered list, newest first, with what a board would
   ask: which version is ratified, and which is current. A ratified version that
   is no longer current is the single most important thing this screen can show.
6. **The threat line and affirmations** — each layer in `safety-charter.ts`
   carries a `threat` (what goes wrong without this document) and an `aff` list
   (what it affirms or sets). These are the best available "why am I reading
   this" context and they are already written. Use them; do not write new ones.

## Design system

Reading typography above all. `SectionLabel`, `Eyebrow`, `FaqItem` for the
affirmations if they need collapsing, `Button` for the two real actions.
Token-styled inputs; `var(--ink)` border and `var(--focus-ring)` on focus.

## Interactions

- Read ⇄ edit, with no layout shift between them.
- Unsaved-changes protection. Losing a board document's edits is unforgivable.
- **No autosave.** Every save is a version row; silent autosave would fill the
  history with noise and make "what changed" unanswerable.

## Honesty constraints

- Never render a body the data does not have. The empty case is real — the repo's
  own line is "No draft body yet."
- Do not show a diff unless one is genuinely computed.
- Do not describe a save as "published".

## Done when

- Reading is the default and is genuinely pleasant at length.
- The ratified-version-vs-current-version distinction is unmissable.
- The revert-to-draft consequence is stated before the user commits.
