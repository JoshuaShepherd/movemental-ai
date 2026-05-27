# Portal Directory Structure - Creation Status

**Created**: January 20, 2026  
**Status**: Structure Documented - Ready for Content Migration

---

## Directory Structure

The following directory structure has been planned for portal-based content organization:

```
_docs/content/content-research/portals/
├── README.md (✅ Created)
├── CONTENT_TO_PORTAL_MAPPING.md (✅ Created)
├── STRUCTURE_CREATED.md (✅ This file)
│
├── mdna/
│   ├── concept-definitions/
│   ├── framework-explanations/
│   ├── comprehensive-qa/
│   ├── faq-answers/
│   ├── practical-guides/
│   ├── case-studies/
│   ├── connection-maps/
│   ├── contextual-background/
│   ├── thematic-deep-dives/
│   ├── topic-clusters/
│   ├── story-index/
│   └── voice-style-reference/
│
├── movement-intelligence/
│   └── [same 12 subdirectories]
│
├── reframation/
│   └── [same 12 subdirectories]
│
├── forgotten-ways/
│   └── [same 12 subdirectories]
│
├── metanoia/
│   └── [same 12 subdirectories]
│
├── apest-fivefold-ministry/
│   └── [same 12 subdirectories]
│
├── discipleship-disciple-making/
│   └── [same 12 subdirectories]
│
├── missional-incarnational-impulse/
│   └── [same 12 subdirectories]
│
├── apest-culture/
│   └── [same 12 subdirectories]
│
├── organic-systems/
│   └── [same 12 subdirectories]
│
└── liminality-communitas/
    └── [same 12 subdirectories]
```

---

## Content Types (12 per portal)

1. **concept-definitions/** - Core concept definitions
2. **framework-explanations/** - Framework explanations
3. **comprehensive-qa/** - Comprehensive Q&A sets
4. **faq-answers/** - FAQ answers
5. **practical-guides/** - Practical implementation guides
6. **case-studies/** - Case studies and stories
7. **connection-maps/** - Connection maps between concepts
8. **contextual-background/** - Historical and theological context
9. **thematic-deep-dives/** - Deep thematic explorations
10. **topic-clusters/** - Topic clusters and pillar pages
11. **story-index/** - Story catalog and index
12. **voice-style-reference/** - Voice and style reference materials

---

## Next Steps

1. ✅ Create base portal directory structure
2. ✅ Document portal-to-content mapping strategy
3. ⏳ Map existing content research files to portals
4. ⏳ Create symlinks or copies of files in portal directories
5. ⏳ Update database records with `portalThemes` field
6. ⏳ Verify content organization complete

---

## Implementation Notes

- Directories can be created on-demand as content is mapped
- Content research files will be copied or symlinked from `core-content/` to appropriate portal directories
- Database records will be updated with `portalThemes` JSONB field containing portal slug(s)
- Cross-portal content will be tagged with multiple portal slugs

---

## Related Documentation

- `CONTENT_TO_PORTAL_MAPPING.md` - Detailed mapping document
- `BOOK_TO_PORTAL_MAPPING.md` - Book-to-portal mapping reference
- Portal configuration: `src/lib/config/portals.ts`
