# Prompt: Static HTML — collaboration presence strip (wildcard, Movemental tokens)

## Goal

Create a **compact multiplayer-adjacent UI** pattern: **avatar stack** + “3 people viewing” label + optional status dot, suitable above a doc canvas or article. Static fake avatars (CSS initials or SVG circles)—no network, no Liveblocks SDK.

## Output

`templates/alan-hirsch/exemplars/exemplar-wildcard-collab-presence.html`  
Stylesheet: `./site-theme.css`

## Design constraints (Movemental)

- **Strip:** Sits on `card` or `section` with subtle `shadow-ambient` if overlapping content below.
- **Avatars:** 28–32px circles, `border: 2px solid var(--card)` overlap (-8px margin-left) for stack; initials in `muted-foreground` on `elevated` fill.
- **Overflow:** “+2” pill using `secondary` text colors.
- **Primary:** Online indicator dot may use `primary` at small size only.

## Reference IA (read-only)

- `/Users/joshuashepherd/Desktop/dev/repos/liveblocks-main/examples/nextjs-live-avatars-advanced/components/LiveAvatars.tsx` (stacking concept only)
- General awareness UI in Liveblocks examples under `examples/`

## Structure (minimum)

1. Nav (short).
2. **Presence bar:** avatars (4) + overflow + text + optional “Follow” ghost button (outline).
3. **Mock canvas** below: bordered **only** as inset well (`border: 1px solid var(--border)`) acceptable here as “artifact” frame, not full-page sectioning.
4. Short paragraph explaining this is a static pattern.

## Acceptance criteria

- [ ] `aria-label` on avatar group describing “Active collaborators (illustration)”.
- [ ] Color contrast for initials on circle backgrounds ≥ WCAG AA for large text (or use darker `foreground` on `elevated`).
- [ ] Works in one column mobile (stack avatars above text).
