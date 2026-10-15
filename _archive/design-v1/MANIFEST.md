# Design Archive Manifest — design-v1

**Date:** 2026-10-15  
**Reason:** Archiving all legacy design documentation, specifications, and design assets (Concept Modern, Ink Band, Stitch imports, and previous migration handoff materials) in preparation for a new version of the platform with its own design specifications.

---

## Structure

```
_archive/design-v1/
├── MANIFEST.md                         # This archive manifest
├── docs-design/                        # Canonical design specifications from docs/design/
│   ├── DESIGN.md                       # Concept Modern creative charter & design system specification
│   ├── INK_BAND_DESIGN_CHAIN.md        # Ink Band design system charter & specification
│   └── README.md                       # Original design docs index
├── docs-build-design/                  # Design system build chain from docs/build/design/
│   ├── README.md                       # Build documentation index & chain
│   ├── components.md                   # UI components specification
│   ├── design-philosophy.md            # Editorial, high-trust design philosophy
│   ├── homepage-spec.md                # Homepage design specification
│   ├── layouts.md                      # Layouts and page structure rules
│   ├── migration-notes.md              # Migration keep/normalize/deprecate notes
│   ├── page-audit-checklist.md         # Pass/fail audit rules
│   ├── primitives.md                   # L2 primitive building blocks
│   ├── tokens.css                      # CSS custom properties reference
│   └── tokens.md                       # Canonical token semantics and usage
├── agent-orchestration-design/         # Design docs from docs/build/agent-orchestration/
│   ├── INK_BAND_DESIGN_CHAIN.md        # Ink Band design chain copy
│   └── ssot-movemental-ui-ai-design-consultation-2026-06-18.md
├── notes-and-proposals/                # Design consultation notes and proposals
│   ├── ink-band-interactive-ui-patterns-proposal.md
│   └── movemental-ui-ai-design-consultation-2026-06-18.md
├── handoff/                            # Previous design-to-repo migration handoff
│   ├── README.md                       # Handoff index
│   ├── 01-recon.md                     # Recon findings
│   ├── 02-drift.md                     # Design drift analysis
│   ├── 03-decisions.md                 # Design & engineering decisions
│   ├── 04-component-map.md             # Screen-to-component mapping & hex-to-token table
│   ├── 05-fixture-seam.md              # Fixture seam definitions
│   ├── 06-phases.md                    # Ordered migration phases
│   ├── 07-return-channel.md            # State file & schema requests guide
│   ├── build-prompts/                  # Step-by-step build prompts (00-19)
│   ├── designs/                        # 36 static .dc.html screen exports and asset bundles
│   ├── screenshots/                    # QA screenshots
│   └── templates/                      # Migration templates
├── stitch/                             # Google Stitch exports
│   └── safety-dashboard/               # 21 screens, tokens.json, manifest, and import scripts
└── prompts/                            # Root design prompts & migration state files
    ├── PERFECT-SINGLE-PAGE-PROMPT.md   # Mobbin/Behance single-page website design prompt
    ├── MIGRATION-STATE.md              # Prior migration state receipt
    └── SCHEMA-REQUEST.md               # Prior schema request tracking
```

---

## Active Repo State After Archival

- `docs/design/README.md` is reset to a clean placeholder ready for incoming design specifications.
- Active codebase (`src/app/globals.css`, `src/components/`, etc.) remains operational with all tests, TypeScript types, and validation suites passing.
- When new platform design specs arrive, they should be placed in `docs/design/` according to the new platform architecture.
