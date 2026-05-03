# Prompt: Static HTML — doc workspace shell (wildcard, Movemental tokens)

## Goal

Produce a **static layout shell** inspired by collaborative doc products: **fixed left rail** (logo, “new page” control, page list, notifications placeholder) + **main canvas** (title, empty editor body placeholder). This is **not** multiplayer—no Liveblocks, no auth. It demonstrates **information density, spacing, and chrome** for a future product surface while staying on-brand for Movemental marketing tokens.

## Output

`templates/alan-hirsch/exemplars/exemplar-wildcard-doc-workspace.html`  
Stylesheet: `./site-theme.css` + minimal scoped styles for sidebar width.

## Design constraints (Movemental)

- **Do not** copy Liveblocks example grays (`bg-gray-50`) as hardcoded hex. Map rail to `section` or `card`, main to `background`, with `border` token only for **sidebar edge** (dense tool exception) or between list rows at hairline opacity.
- **Primary:** Use for active page row, primary buttons, or focus rings—not full sidebar fill.
- **Typography:** Inter; sidebar labels uppercase small caps style per DESIGN label rules.
- **Canvas:** Large `min-height` reading area with placeholder paragraph in `prose-max` optional inner column.

## Reference IA (read-only)

- `/Users/joshuashepherd/Desktop/dev/repos/liveblocks-main/examples/nextjs-notion-like-ai-editor/app/components/DefaultLayout.tsx`
- Related: `PageLinks`, `Notifications` (structure only)

## Structure (minimum)

1. Skip link + minimal top strip OR integrate skip into main.
2. `div` flex row: **sidebar** `width: 240px` (collapsible to icon-only not required).
3. Sidebar: brand text, button “New page”, list of 5 fake page titles, footer “Templates” link.
4. **Main:** editable-looking `h1` (static text), toolbar row (bold/italic icons as non-functional spans), body placeholder lines.
5. Optional right margin note column on xl breakpoint (static “Comments off” note).

## Acceptance criteria

- [ ] Keyboard tab order: sidebar links → main title → toolbar buttons → body.
- [ ] Responsive: below `768px`, sidebar becomes top horizontal scroll or collapsible panel with one toggle button (small JS OK).
- [ ] No dependencies; token-based colors only.
