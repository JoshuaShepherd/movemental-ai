# Pastoral-Warm Themes Content

**Template:** `pastoral-warm` (public template library)  
**Purpose:** Single source of truth for all theme copy used on the pastoral-warm template’s Themes page and Theme detail pages.  
**Design chain:** Content flows from this directory → leader JSON (e.g. `public/templates/library/data/alan-hirsch.json`) → HTML templates (`themes.html`, `theme-detail.html`).

---

## Design chain (content flow)

Types and structure flow **downstream** in the type-safety chain (`_docs/type/`). Theme **copy** follows a parallel content chain:

1. **Source of truth** — This directory (`_docs/themes-content/pastoral-warm/`)
   - One file per theme: `{slug}.md`
   - Each file defines: `title`, `shortDescription`, `longDescription`, optional `frameworkLabel`
2. **Data layer** — Leader JSON (`public/templates/library/data/*.json`)
   - `themes` array: `slug`, `title`, `description` (from `shortDescription`)
   - Optional: theme detail pages can use `longDescription` if the template supports it
3. **Presentation** — Pastoral-warm HTML
   - `themes.html`: theme cards (title, description) and “Key frameworks” section
   - `theme-detail.html?theme={slug}`: title, description (and optionally long description)

**Rule:** Update theme copy here first; then sync to the leader JSON so the template stays consistent and error-free.

---

## Themes (pastoral-warm only)

| Slug | Title | File |
|------|--------|------|
| `missional-church` | Missional Church | [missional-church.md](./missional-church.md) |
| `formation` | Formation | [formation.md](./formation.md) |
| `disciple-making` | Disciple Making | [disciple-making.md](./disciple-making.md) |
| `apest` | APEST | [apest.md](./apest.md) |
| `kingdom-mission` | Kingdom Mission | [kingdom-mission.md](./kingdom-mission.md) |
| `christocentric` | Christ at the Center | [christocentric.md](./christocentric.md) |

---

## Voice and style

- **Pastoral:** Warm, inviting, formation-oriented. Speak to leaders and practitioners who want to go deeper.
- **Clear:** Use preferred terms from content-research (mDNA, APEST, communitas, Apostolic Genius, etc.); avoid jargon without explanation.
- **Accurate:** Align with CORE_THEMES_INDEX and portal concept definitions; no new theology, only faithful summarization.
- **Concise:** Short description = 1–2 sentences for cards. Long description = 2–4 sentences for theme-detail or future body copy.

---

## File format (per theme)

Each `{slug}.md` file uses this structure:

```markdown
---
slug: theme-slug
title: Display Title
frameworkLabel: Optional label for Key frameworks (e.g. mDNA, APEST)
---

# Title (repeat for readability)

## Short description
One or two sentences for theme cards and theme-detail lead. Used as `description` in JSON.

## Long description
Two to four sentences for theme-detail body or future expansion. Warm, pastoral, inviting.
```

---

## Portal-grade structure (12 sections)

Each theme has a **portal folder** (`{slug}/`) with the same 12 sections as the alan-hirsch Uniform Portal Guide:

1. Hero (hero.md) — title, subtitle, description, hero quote + citation, hero image ref  
2. Subportals (subportals.md) — only for hubs, e.g. missional-church  
3. Core concept (core-concept.md) — 500–1000 words  
4. Featured content (featured-content.md) — books, articles, courses by slug  
5. Comprehensive Q&A (faqs.md) — 10–20 FAQs in 3–5 categories  
6. Practical guides (practical-guides.md) — roadmaps, tools, checklists  
7. Connection maps (connection-maps.md) — related themes with short descriptions  
8. Case studies & stories (case-studies.md) — 1–3 narratives  
9. Thematic deep dives (deep-dives.md) — 2–4 pieces with title, slug, excerpt  
10. Contextual background (contextual-background.md) — timeline or background items  
11. Topic clusters (topic-clusters.md) — 3–6 clusters with topic labels/links  
12. All content — driven by theme tag in data (no static file)  
+ AI guidance (ai-guidance.md) — 5–10 suggested prompts for AI Lab  

See **[PORTAL_STRUCTURE.md](./PORTAL_STRUCTURE.md)** for the full spec, section order, and mapping to alan-hirsch.

---

## References

- Type chain: `_docs/type/01_OVERVIEW.md`
- Core themes: `_docs/themes-content/content-research/CORE_THEMES_INDEX.md`
- Portal mapping: `_docs/themes-content/content-research/PORTAL_THEME_MAPPING.md`
- Template: `public/templates/library/pastoral-warm/themes.html`, `theme-detail.html`
- Leader data: `public/templates/library/data/alan-hirsch.json` (themes array)
- alan-hirsch Uniform Portal Guide: `c:\dev\alan-hirsch\_docs\UNIFORM_PORTAL_GUIDE.md`
