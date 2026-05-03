# Prompt: Static HTML — rich editor toolbar chrome (wildcard, Movemental tokens)

## Goal

Build a **frozen UI mock** of a rich-text editor: **toolbar** with grouped formatting actions (bold, italic, lists, link, media, more menu) and a **large content area** with fake paragraphs and a blockquote. No TipTap, no ProseMirror—static HTML/CSS only. Demonstrates how Movemental tokens could wrap a “studio” surface.

## Output

`templates/alan-hirsch/exemplars/exemplar-wildcard-editor-chrome.html`  
Stylesheet: `./site-theme.css`

## Design constraints (Movemental)

- **Toolbar:** `card` or `elevated` strip; group separators use `border` token vertical rules **only** inside this dense control strip (per DESIGN form/dense exception).
- **Icons:** Inline SVG, `currentColor: var(--muted-foreground)` default, `var(--primary)` on hover/active.
- **Editor body:** `card` on `section` page background; inner `contenteditable` **optional**—if enabled, still no persistence; simpler is static `<div class="prose">` with placeholder content.
- **Primary:** One “Publish” or “Save” primary button in toolbar or sticky footer bar.

## Reference IA (read-only)

- `/Users/joshuashepherd/Desktop/dev/repos/movemental-dashboard/src/components/editor/RichContentEditor.tsx` (toolbar grouping / action density inspiration only)

## Structure (minimum)

1. Page title “Editor (preview)” outside editor shell.
2. Toolbar two rows max: row1 format, row2 insert / slash menu placeholder.
3. Body: heading + 2 paragraphs + blockquote + bullet list.
4. Sticky footer bar optional: “Saved · Draft” muted text + primary Save.

## Acceptance criteria

- [ ] All toolbar controls are `<button type="button">` with `aria-label`.
- [ ] Focus rings visible (`outline` or `box-shadow` using `ring` token intent).
- [ ] No external icon fonts; SVG only.
- [ ] Reduced motion: no animated “saving…” dots.
