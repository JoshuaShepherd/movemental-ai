# Pastoral-Warm Portal-Grade Structure

**Purpose:** Each theme can be developed into a **full portal page** with the same 12 sections used in the alan-hirsch Uniform Portal Guide. This document defines the section order, content types, and file layout so pastoral-warm theme content rivals portal-grade depth and is ready when the template (or app) supports it.

**Reference:** `c:\dev\alan-hirsch\_docs\UNIFORM_PORTAL_GUIDE.md`

---

## Section order (uniform)

| # | Section | Content to provide | File per theme |
|---|---------|---------------------|-----------------|
| 1 | **Hero & overview** | Title, subtitle (eyebrow), description; one hero quote + citation; hero image ref + alt | `hero.md` |
| 2 | **Subportals** | If hub: slug, title, short description per subportal. Otherwise: none | `subportals.md` (optional) |
| 3 | **Core concept** | One body, 500–1000 words | `core-concept.md` |
| 4 | **Featured content** | 3–5 books, 2–3 articles, 1–2 courses (by slug or id) | `featured-content.md` |
| 5 | **Comprehensive Q&A** | 10–20 FAQs in 3–5 categories | `faqs.md` |
| 6 | **Practical guides** | Roadmaps, tools, checklists | `practical-guides.md` |
| 7 | **Connection maps** | 5–10 related themes/portals with short description each | `connection-maps.md` |
| 8 | **Case studies & stories** | 1–3 narrative case studies or stories | `case-studies.md` |
| 9 | **Thematic deep dives** | 2–4 pieces: title, slug, excerpt | `deep-dives.md` |
| 10 | **Contextual background** | Timeline or background (3–8 items) | `contextual-background.md` |
| 11 | **Topic clusters** | 3–6 clusters with topic labels/links | `topic-clusters.md` |
| 12 | **All content** | Aggregated list (driven by theme tag in data; no static file) | — |
| — | **AI guidance** (optional) | 5–10 suggested prompts for AI Lab | `ai-guidance.md` |

---

## File layout per theme

For each theme slug (e.g. `missional-church`, `formation`), use a **folder**:

```
pastoral-warm/
  README.md
  PORTAL_STRUCTURE.md
  themes-index.md
  missional-church.md          ← Overview (short/long description); feeds current template
  missional-church/             ← Portal-grade expansion
    hero.md
    subportals.md               ← Only if theme is a hub (e.g. mDNA has six elements)
    core-concept.md
    featured-content.md
    faqs.md
    practical-guides.md
    connection-maps.md
    case-studies.md
    deep-dives.md
    contextual-background.md
    topic-clusters.md
    ai-guidance.md
  formation.md
  formation/
    hero.md
    core-concept.md
    ...
  disciple-making/
  apest/
  kingdom-mission/
  christocentric/
```

The root `{slug}.md` remains the **overview** used by the current pastoral-warm template (cards + theme-detail). The `{slug}/` folder holds the **full portal content** for future use.

---

## Content standards

- **Voice:** Pastoral, warm, formation-oriented; align with CORE_THEMES_INDEX and portal terminology.
- **Terminology:** Use preferred terms (mDNA, APEST, communitas, Apostolic Genius, etc.); avoid “church DNA,” “six practices,” etc. where the guide specifies.
- **Sources:** Pull from `_docs/themes-content/content-research/` (portals, core-content, concept-definitions, faq-answers, framework-explanations, thematic-deep-dives, story-index) and cite books/chapters where appropriate.
- **Empty sections:** If a section has no content yet, use a short “Coming soon” or placeholder line so the structure is complete.

---

## Mapping: pastoral-warm themes → portal content

| Pastoral-warm slug | Primary portal alignment | Subportals (if any) |
|--------------------|--------------------------|---------------------|
| missional-church | mDNA / The Forgotten Ways | Six elements (Jesus is Lord, Disciple-Making, Missional-Incarnational, APEST, Organic Systems, Liminality & Communitas) |
| formation | Formation / Liminality & Communitas | — |
| disciple-making | Discipleship & Disciple-Making | — |
| apest | APEST & Fivefold Ministry | — |
| kingdom-mission | Movement Intelligence / mission | — |
| christocentric | Jesus is Lord (mDNA element) | — |

---

## References

- alan-hirsch: `_docs/UNIFORM_PORTAL_GUIDE.md`, `_docs/themes-revised/`
- movemental-ai: `_docs/themes-content/content-research/CORE_THEMES_INDEX.md`, `PORTAL_THEME_MAPPING.md`, `portals/mdna/`, `core-content/`
