# Leader / theme data for HTML prototypes

This folder holds JSON data for thought leaders (and optionally themes) so prototypes can swap content without changing template structure.

## Files

- **alan-hirsch.json** — Content for Alan Hirsch: hero copy and images, themes, books, content library items, page copy, and image path references (`../images/alan/`, `../images/books/`). Use with `data-json="../data/alan-hirsch.json"` in templates.
- **brad-brisco.json** — Content for Brad Brisco: hero, portrait, themes, books (The Missional Quest, Missional Essentials, ReThink), content library items, page copy, and image path references (`../images/brad/`, `../images/books/`). Use with `data-json="../data/brad-brisco.json"` in templates.
- **dave-ferguson.json** — Content for Dave Ferguson: hero, portrait, themes, books (Hero Maker, Exponential, On the Verge, The Big Idea, B.L.E.S.S.), content library items, page copy, and image path references (`../images/dave/`, `../images/books/`). Use with `data-json="../data/dave-ferguson.json"` in templates.

## Switching leaders (interchangeability)

To use a different thought leader (Brad Brisco or Dave Ferguson) in the HTML prototypes, set each page’s leader-content script `data-json` attribute to the desired file: `data-json="../data/brad-brisco.json"` or `data-json="../data/dave-ferguson.json"`. All content (name, hero, portrait, books, page copy, titles) is then driven from that JSON. See `_docs/_prompts/INTEGRATE_LEADER_TEMPLATE_OPTIONS_PROMPT.md` for the full integration checklist.

- **courses/** — Optional course curriculum JSON (e.g. **mdna.json**) for the learn view. Course objects may include a `weeks` array; when merged into a leader config (e.g. via `merge_mdna_course.py`), the learn view can render the full 8-week structure. See **courses/README.md**.

## Path convention

Image paths in the JSON match what the templates use when served from a design-mode directory (e.g. `scholarly-editorial/`): `../images/alan/...`, `../images/brad/...`, `../images/dave/...`, and `../images/books/...`. When wiring up, the consuming script can inject these as-is for `img` sources.

## Schema (informal)

- **id**, **name**, **tagline** — Leader identity.
- **hero** — Title, subtitle, CTAs, image path(s) (including variants by context if needed).
- **portrait** — Headshot for bylines and book detail.
- **themes** — Array of `{ slug, title, description }` for exploration lane and filters.
- **contentLibrary** — **articles**, **courses**, **podcasts**, **videos** with title, theme, description, meta/runtime, linkLabel.
- **libraryCards** — Titles and descriptions for the five content-type cards on home.
- **books** — Slug, title, cover path, author, theme(s), short/long description where present.
- **pageCopy** — Books page, content hub, footer, chat placeholder text.
- **images** — Reference lists of leader and book image paths (for documentation or tooling).

Books with a single theme use **theme** and **themeLabel**; books with multiple themes (e.g. Reframation) use **themes** and **themeLabels**.
