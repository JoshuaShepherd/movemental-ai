# Prompt: Static HTML — general marketing / institutional landing (Movemental tokens)

## Goal

Build a **general-purpose landing** suitable for “About the org,” “Platform story,” or leadership profile: strong typographic hero, **split layout** (image + narrative) or single-column story sections, and a closing CTA. IA may follow sibling “about hero”; execution must match Movemental editorial (Digital Curator).

## Output

`templates/alan-hirsch/exemplars/exemplar-landing-general.html`  
Stylesheet: `./site-theme.css`

## Design constraints (Movemental)

- **Portrait / media column:** `card` or image on `section` with rounded corners; no harsh drop shadow—prefer ambient shadow only if the block floats above a busy background.
- **Eyebrow:** Uppercase, wide tracking, `muted-foreground` or slightly stronger `foreground` at small size.
- **Headline:** Large display with `-0.02em` tracking; line-height tight for display.
- **Body copy:** `muted-foreground` or `foreground` at 80–90% opacity for secondary paragraphs per token table intent.
- **Breathing:** Section vertical padding in the `--section-y-sm` / `--section-y-lg` spirit (use clamp in CSS if not in theme file yet).

## Reference IA (read-only)

- `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/about-page/about-hero.tsx`
- Runner-up for product tone (do not copy visuals):  
  `/Users/joshuashepherd/Desktop/dev/repos/movemental-sites/alan-hirsch/src/components/ai-lab/AILabHero.tsx`

## Page structure (minimum)

1. Nav.
2. **Hero band:** two-column on large screens — image `aspect-[4/5]` max width + text stack (eyebrow, `h1`, tagline italic line, two paragraphs).
3. **Values or milestones:** 3-up grid of short items on `section` surface.
4. **Midnight band (optional):** single full-width `inverse-surface` strip with one punchy statement + link (if used, keep copy short).
5. **Closing CTA:** primary button + secondary text link on `background`.

## Acceptance criteria

- [ ] Reads as “publication” not “dashboard”: generous whitespace, limited chip clutter.
- [ ] Inter only unless you explicitly justify an additional font in comments.
- [ ] Responsive image column stacks above or below text cleanly.
- [ ] All surfaces map to DESIGN token names.
