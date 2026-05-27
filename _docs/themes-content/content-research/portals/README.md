# Portal-Based Content Research Organization

> **Authoritative source for portal content population**

**Created**: January 20, 2026  
**Status**: Content Organized  
**Purpose**: Portal-based organization of all content research files

---

## Directory Structure

This directory contains all content research files organized by portal and content type. Each portal directory contains 12 content type subdirectories:

1. **comprehensive-qa/** - Comprehensive Q&A sets
2. **faq-answers/** - FAQ answers
3. **concept-definitions/** - Core concept definitions
4. **framework-explanations/** - Framework explanations
5. **thematic-deep-dives/** - Deep thematic explorations
6. **practical-guides/** - Practical implementation guides
7. **case-studies/** - Case studies and stories
8. **connection-maps/** - Connection maps between concepts
9. **contextual-background/** - Historical and theological context
10. **topic-clusters/** - Topic clusters and pillar pages
11. **story-index/** - Story catalog and index
12. **voice-style-reference/** - Voice and style reference materials

---

## Portals

### Active Portals (5)

- **[mDNA](mdna/)** - Missional DNA (mDNA)
  - The six-element genetic code for missional movements
  - Subportals: jesus-is-lord, disciple-making, missional-incarnational-impulse, apest-fivefold-ministry, organic-systems, liminality-communitas

- **[Movement Intelligence](movement-intelligence/)** - Movement Intelligence (mQ)
  - Movement Quality & Multiplication

- **[Reframation](reframation/)** - Reframation
  - Reframing Formation in Mission

- **[The Forgotten Ways](forgotten-ways/)** - The Forgotten Ways
  - Rediscovering Apostolic Genius

- **[Metanoia](metanoia/)** - Metanoia
  - Paradigm Shift & Transformation

### Subportals (6)

Located in `subportals/` directory:

- **[jesus-is-lord](subportals/jesus-is-lord/)** - Element 1: The foundation of mDNA
- **[disciple-making](subportals/disciple-making/)** - Element 2: Intentional formation and reproduction
- **[missional-incarnational-impulse](subportals/missional-incarnational-impulse/)** - Element 3: Sentness as identity
- **[apest-fivefold-ministry](subportals/apest-fivefold-ministry/)** - Element 4: Fivefold intelligence
- **[organic-systems](subportals/organic-systems/)** - Element 5: Simple, reproducible patterns
- **[liminality-communitas](subportals/liminality-communitas/)** - Element 6: Liminality and threshold experiences

### Cross-Portal Content

Located in `cross-portal/` directory:

- **[connection-maps](cross-portal/connection-maps/)** - Maps showing relationships between portals
- **[integrated-frameworks](cross-portal/integrated-frameworks/)** - Explanations of how frameworks work together
- **[thematic-integration](cross-portal/thematic-integration/)** - Guides on how themes integrate across portals

### Shared Content

Located in `shared/` directory:

- **[contextual-background](shared/contextual-background/)** - Historical and theological context shared across portals
- **[story-index](shared/story-index/)** - Story catalog and index
- **[voice-style-reference](shared/voice-style-reference/)** - Voice and style reference materials

---

## Content Organization

Content research files from `../core-content/` have been organized by portal based on:

1. **Portal Themes** - From portal configuration
2. **Book-to-Portal Mapping** - From `BOOK_TO_PORTAL_MAPPING.md`
3. **Content Analysis** - Keywords, concepts, frameworks
4. **File Naming Patterns** - Content type indicators in filenames

---

## Usage

Content research files in these directories serve as:

- Source material for portal page content generation
- Reference material for article writing
- Training data for AI content generation
- Authority source for portal content population

---

## File Naming Conventions

| Content Type | Naming Pattern | Example |
|--------------|---------------|---------|
| Comprehensive Q&A | `qa-{portal-slug}-{topic}.md` | `qa-mdna-framework.md` |
| FAQ Answers | `faq-{number}-{topic}.md` | `faq-003-what-is-apest.md` |
| Concept Definitions | `concept-definition-{concept}.md` | `concept-definition-mdna.md` |
| Framework Explanations | `framework-{framework}.md` | `framework-apest-5q.md` |
| Thematic Deep-Dives | `deep-dive-{topic}.md` or numbered | `01-jesus-is-lord-christocentrism.md` |
| Practical Guides | `guide-{topic}.md` or `how-to-{topic}.md` | `how-to-activate-apest-5q-in-your-context.md` |
| Case Studies | `case-study-{topic}.md` | `case-study-early-church-movement.md` |
| Connection Maps | `connection-map-{topic}.md` | `mdna-element-relationships.md` |
| Contextual Background | `context-{topic}.md` | `theological-context-ephesians-4-11.md` |
| Topic Clusters | `topic-cluster-{theme}.md` | Various |
| Story Index | `story-index-{topic}.md` | `01-HISTORICAL-MOVEMENT-STORIES.md` |

---

## Related Documentation

- `CONTENT_TO_PORTAL_MAPPING.md` - Detailed mapping document
- `BOOK_TO_PORTAL_MAPPING.md` - Book-to-portal mapping reference
- `PORTAL_THEME_MAPPING.md` - Portal theme definitions
- Portal configuration: `src/lib/config/portals.ts`

---

## Next Steps

1. ✅ Create portal directory structure
2. ✅ Map all content research files to portals
3. ✅ Copy files to portal directories
4. ⏳ Review and refine content organization
5. ⏳ Update database records with `portalThemes` field
6. ⏳ Generate portal-specific content from organized research
