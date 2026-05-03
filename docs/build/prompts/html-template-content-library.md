# Prompt: Static HTML — content library / card grid (Movemental tokens)

## Goal

Create a **mixed-type content library** page: page hero, filter tabs (All / Articles / Books / etc.), optional search field, and a **responsive grid** of cards. Card *shapes* may echo the sibling (3:4 book, text-forward article, 16:9 video) but **colors, shadows, and type** must follow Movemental DESIGN + `site-theme.css`.

## Output

`templates/alan-hirsch/exemplars/exemplar-content-library.html`  
Stylesheet: `./site-theme.css`

## Design constraints (Movemental)

- **Hero:** Title + subtitle on `background` or light `section`; no neon gradients except the allowed **primary → primary-dim** CTA gradient on buttons (`--gradient-primary` if defined in theme file; else solid `primary`).
- **Filter bar:** Pill or underline tabs using `muted-foreground` inactive and `primary` active state; hairline `border` acceptable under the bar only.
- **Grid:** `max-width: var(--container-max)`; gap that breathes; cards are `card` on `section` parent for tonal lift.
- **Hover:** Subtle `translateY` or shadow-ambient allowed; avoid aggressive scale on every tile unless reduced-motion disables it.
- **Badges:** Small uppercase labels; primary-filled badge only when it signals category—do not cover the whole card in blue.

## Reference IA (read-only)

- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/app/(public)/content/ContentLibraryClient.tsx`
- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/content-library/ContentLibraryGrid.tsx`
- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/content-library/ContentLibraryHero.tsx`
- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/content-library/ContentLibraryFilterBar.tsx`

## Page structure (minimum)

1. Nav.
2. **Hero:** `h1` “Content library” + short subtitle; optional stat row (counts) using muted text.
3. **Filter + search:** non-functional is fine; `input` uses `border-border`-equivalent token.
4. **Grid:** Include **at least**:
   - 2 book-style tiles (3:4 cover area, title, excerpt clamp, footer row),
   - 2 article-style tiles (meta row, title, excerpt, image strip),
   - 2 video-style tiles (16:9 thumb, play affordance, duration pill).
5. **Load more** as a `button` or text link (non-functional).

Detailed per-card markup can align with the three dedicated card prompts if those files exist; this page should still read as one coherent library.

## Acceptance criteria

- [ ] Responsive from 320px up; grid collapses to one column.
- [ ] Placeholder images: neutral `section`-tone blocks or CSS gradient placeholders—no stock URLs required.
- [ ] Token compliance; no `bg-white` / `text-gray-500` class soup.
