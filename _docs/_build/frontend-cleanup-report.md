# Frontend Component Cleanup Report

**Generated:** 2026-05-13
**Repo:** `movemental-ai` (Next.js 16 + React 19 + Tailwind v4)
**Skill:** `$frontend-cleanup` (manually executed against `my-skills/frontend-cleanup/SKILL.md` because the skill wasn't loaded in this session)
**Scope:** `src/components/` (445 component files across 32 top-level folders)
**Working tree:** clean at start, on `main` (changes will be staged to a slice branch before any moves)

---

## Summary

| Metric | Count |
|---|---|
| Total components scanned | **445** |
| Top-level component folders | 32 |
| Live components (kept) | ~357 |
| **High-confidence dead (archive)** | **88** |
| Flagged for manual review | 9 |
| Naming-debt renames | 2 |
| Dynamic / lazy imports detected | **0** *(static import graph is the full picture)* |

The cleanup falls cleanly into three buckets:

1. **Two whole top-level folders are dead** — `marketing/` (32 files) and `path/` (27 files). Both have zero external importers. `path/` was superseded by `pathway/` plus the page-level sections; `marketing/` is unreferenced editorial scaffolding.
2. **The `-new` shadow tree in `fragmentation-story/` is dead** (7 files). The "old" originals are still live (2 importers each); the "new" replacements have 0 transitive importers.
3. **Six smaller graveyards** scattered through `sections/`, `editorial-stitch/`, `citations/`, `forms/`, `onboarding/archive/`, and `nav/`.

Two pieces of self-documenting evidence support this report: `src/components/nav/mobile-nav.tsx` and `src/components/nav/nav-links.ts` **explicitly identify themselves as legacy and unwired** in JSDoc comments referencing a prior archive (`src/app/_archive/legacy-site-2026-04-28/`). The pattern this repo already established — date-stamped archive directories — is what this run will follow.

---

## Dead components (88) — proposed archive

Destination root: `src/components/_archive/2026-05-13/`. Subfolders preserve the original path so reverts are trivial.

### Category 1 — Whole-folder dead trees (59 files)

| Origin | Files | Destination | Reason |
|---|---:|---|---|
| `src/components/marketing/` | 32 | `_archive/2026-05-13/marketing/` | Zero external importers; entire `knowledge-graph/`, `story/`, `ui/`, `path-shared/` subtrees orphaned |
| `src/components/path/` | 27 | `_archive/2026-05-13/path/` | Zero external importers; `Path*` and `CaseStudy*` PascalCase legacy components, fully superseded by `pathway/` + page-level sections |

`marketing/` breakdown:
- `marketing/story-spine-cta-row.tsx`
- `marketing/knowledge-graph/` (14 files: `ClusterLabelLayer`, `EcosystemEmergenceView`, `entity-styles`, `FieldNetworkView`, `GraphDetailPanel`, `GraphFilters`, `GraphStoryControls`, `index`, `LeaderEcosystemView`, `MachineLegibilityView`, `NarrativeStepOverlay`, `NodeInspector`, `SystemLayerFlow`, `VisualizationLegend`)
- `marketing/story/` (9 files: `CapacityAxes`, `ImpactDimensionCards`, `index`, `LayerImpactCards`, `LayerImpactMatrix`, `NarrativeProjection`, `NetworkAggregationView`, `SequenceFlow`, `StoryCallout`, `TranslationMultiplier`)
- `marketing/ui/` (3 files: `impact-shape-indicator`, `index`, `types`)
- `marketing/path-shared/` (4 files: `entry-cards-component`, `if-skipped-component`, `index`, `pathway-component`)

`path/` breakdown (27 files): all `Path*.tsx`, `CaseStudy*.tsx`, plus `index.ts` and a handful of utilities. PascalCase naming + zero importers + parallel existence of `pathway/` confirm this is the older Stitch-imported scaffolding.

### Category 2 — Shadow tree (`-new` orphans, 9 files)

| Path | Importers | Reason |
|---|---:|---|
| `src/components/sections/fragmentation-story/fragmentation-story-new-shell.tsx` | 0 | Top of dead tree |
| `src/components/sections/fragmentation-story/fragmentation-story-new-wayfinding.tsx` | 1 (the dead shell) | Transitively dead |
| `src/components/sections/fragmentation-story/fragmentation-story-stage-activation-new.tsx` | 1 (the dead shell) | Transitively dead |
| `src/components/sections/fragmentation-story/fragmentation-story-stage-formation-new.tsx` | 1 (the dead shell) | Transitively dead |
| `src/components/sections/fragmentation-story/fragmentation-story-stage-integration-new.tsx` | 1 (the dead shell) | Transitively dead |
| `src/components/sections/fragmentation-story/fragmentation-story-stage-movement-new.tsx` | 1 (the dead shell) | Transitively dead |
| `src/components/sections/fragmentation-story/fragmentation-story-stage-multiplication-new.tsx` | 1 (the dead shell) | Transitively dead |
| `src/components/sections/home/home-audience-examples-new.tsx` | 0 external | Self-referential pair |
| `src/components/sections/home/home-audience-examples-new-client.tsx` | 1 (only its own `-new` sibling) | Transitively dead |

**Note:** The non-`-new` originals (`fragmentation-story-stage-activation.tsx`, etc.) have 2 importers each and are **still live**. They are not dead; only the `-new` shadow tree is.

### Category 3 — Smaller graveyards (20 files)

| Path | Reason |
|---|---|
| `src/components/sections/nonprofit-funnel-new/AssessmentEntryContent.tsx` | 0 importers |
| `src/components/sections/nonprofit-funnel-new/nonprofit-content.ts` | 0 importers |
| `src/components/sections/resources-templates/resources-templates-page-content.tsx` | Self-imports only |
| `src/components/sections/resources-templates/index.ts` | Self-imports only |
| `src/components/forms/contact-form.tsx` | 0 importers (sections-mock has its own `contact-form` — different file) |
| `src/components/forms/assessment-form.tsx` | 0 importers |
| `src/components/forms/templates-pack-request-form.tsx` | Only importer is `resources-templates/*` (itself dead) — chain-dead |
| `src/components/onboarding/archive/onboarding-panel.tsx` | Already in an `archive/` subfolder; no importer |
| `src/components/citations/references-rail.tsx` | Re-exported by `citations/index.ts` but no consumer imports it |
| `src/components/citations/cited-number.tsx` | Re-exported but no consumer imports it |
| `src/components/citations/marker.tsx` | Re-exported but no consumer imports it |
| `src/components/editorial-stitch/atmospheric-media-card.tsx` | 0 importers |
| `src/components/editorial-stitch/dot-texture-card.tsx` | 0 importers |
| `src/components/editorial-stitch/ghost-cta-panel.tsx` | 0 importers |
| `src/components/editorial-stitch/icon-feature-card.tsx` | 0 importers |
| `src/components/editorial-stitch/midnight-statement-quote.tsx` | 0 importers |
| `src/components/editorial-stitch/preview-well.tsx` | 0 importers |
| `src/components/editorial-stitch/showcase-intro.tsx` | 0 importers |
| `src/components/nav/mobile-nav.tsx` | **Self-documented** as legacy: *"⚠️ Legacy mobile drawer — not mounted in the live site."* |
| `src/components/nav/nav-links.ts` | **Self-documented** as legacy: *"⚠️ NOT WIRED INTO THE LIVE SITE."* |

Editorial-stitch files retained: `stitch-glass-top-bar.tsx` (1 importer in `services-page-content`) and `index.ts` (the barrel). Citations files retained: `index.ts`, `inline-source.tsx`, and the other 2 actively imported entries. After archive, `citations/index.ts` should be edited to stop re-exporting the three archived names.

---

## Manual review (9 items)

These are dead-or-internal-only signals that I do **not** auto-archive because they sit inside a live cluster and need a human to confirm what to do.

### `nav/` internal cluster

Once `mobile-nav.tsx` and `nav-links.ts` are archived (Category 3 above), these files in `src/components/nav/` have **no external importers** and may also be unreachable from the five live nav entry points (`site-header`, `site-footer`, `site-header-cta`, `site-logo`, `theme-toggle`):

| File | Reachable from live entry? |
|---|---|
| `nav-link.tsx` | Used by `nav-dropdown` and `mobile-menu`. Transitively reachable from `site-header` iff `site-header` mounts `mobile-menu` or `nav-dropdown`. |
| `nav-dropdown.tsx` | Used by `mobile-menu` only. Reachability flows through `mobile-menu`. |
| `nav-config.ts` | Used by `nav-link`, `nav-dropdown`, `mobile-menu`. |
| `mobile-menu.tsx` | Per `mobile-nav.tsx`'s own JSDoc, this is the active mobile menu *inside* `SiteHeader`. Likely live. |
| `nav-scroll-shadow.tsx` | Not seen imported by any live header. Suspected dead. |
| `nav-reading-progress.tsx` | Not seen imported by any live header. Suspected dead. |
| `site-nav-actions.tsx` | Not seen imported externally. Suspected dead. |
| `site-nav-desktop.tsx` | Not seen imported externally. Suspected dead. |
| `site-nav-mobile-toggle.tsx` | Not seen imported externally. Suspected dead. |

**Recommended action:** after Phase 4 lands and tests pass, run a second pass with `grep -L "from \"./mobile-menu\"\|from \"./nav-link\"\|from \"./nav-dropdown\"" src/components/nav/site-header.tsx` to verify the live header doesn't reach the cluster. If it doesn't, archive the cluster.

I'm leaving this out of Phase 4 because killing nav files is the easiest way to silently break the live site.

---

## Naming-debt renames (Phase 5)

Auto-rename would be risky on either of these. Both are flagged for the user's call.

| Path | Recommendation |
|---|---|
| `src/components/sections-mock/` | **Misnamed** — alive (imports from home page and start-with-safety page), but called "mock" which reads as scratch. Recommend rename to `src/components/sections-active/` or fold contents into `src/components/sections/`. **Will not rename until user picks the target.** |
| `src/components/sections-mock/home/scenius-v3-topology.ts` | `-v3` suffix with no v1/v2 in repo. Rename to `scenius-topology.ts` after a 1-line `grep`-and-`sed` verifies no external token-match. |

---

## Dynamic-import audit (Phase 1c)

Searched `src/` for `dynamic(`, `lazy(`, and string-form `await import(`. **Zero hits.** The static import graph is the complete reachability picture, which means the archive operations in Phase 4 are safe to evaluate purely by `grep`-able import statements.

(One sigma-graph library is loaded via `import("sigma")` inside `marketing/knowledge-graph/FieldNetworkView.tsx`, but that file is itself in the dead `marketing/` tree being archived.)

---

## Proposed archive layout

```
src/components/_archive/2026-05-13/
├── README.md                         # this run's manifest
├── marketing/                        # 32 files
├── path/                             # 27 files
├── sections/
│   ├── fragmentation-story/
│   │   ├── fragmentation-story-new-shell.tsx
│   │   ├── fragmentation-story-new-wayfinding.tsx
│   │   ├── fragmentation-story-stage-activation-new.tsx
│   │   ├── fragmentation-story-stage-formation-new.tsx
│   │   ├── fragmentation-story-stage-integration-new.tsx
│   │   ├── fragmentation-story-stage-movement-new.tsx
│   │   └── fragmentation-story-stage-multiplication-new.tsx
│   ├── home/
│   │   ├── home-audience-examples-new.tsx
│   │   └── home-audience-examples-new-client.tsx
│   ├── nonprofit-funnel-new/         # 2 files
│   └── resources-templates/          # 2 files
├── forms/
│   ├── assessment-form.tsx
│   ├── contact-form.tsx
│   └── templates-pack-request-form.tsx
├── onboarding/
│   └── onboarding-panel.tsx
├── citations/
│   ├── cited-number.tsx
│   ├── marker.tsx
│   └── references-rail.tsx
├── editorial-stitch/                 # 7 files
└── nav/
    ├── mobile-nav.tsx
    └── nav-links.ts
```

After archive, two follow-up edits:

1. **`src/components/citations/index.ts`** — remove the re-exports for `references-rail`, `cited-number`, `marker`.
2. **`src/components/editorial-stitch/index.ts`** — remove re-exports for the 7 archived files.

---

## Verification plan (Phase 4 post-conditions)

```bash
# 1. The archive must contain exactly 88 files
find src/components/_archive/2026-05-13 -type f \( -name "*.tsx" -o -name "*.ts" \) | wc -l   # expect 88

# 2. Type check must pass
pnpm typecheck

# 3. Lint must pass (or at least not regress)
pnpm lint

# 4. Production build must pass
pnpm build

# 5. No live imports point at archived paths
grep -rn "@/components/marketing\|@/components/path\b\|@/components/sections/nonprofit-funnel-new\|@/components/sections/resources-templates\|fragmentation-story-new\|home-audience-examples-new\|forms/contact-form\|forms/assessment-form\|forms/templates-pack-request-form\|onboarding/archive/onboarding-panel\|references-rail\|cited-number\|citations/marker\|editorial-stitch/atmospheric-media-card\|editorial-stitch/dot-texture-card\|editorial-stitch/ghost-cta-panel\|editorial-stitch/icon-feature-card\|editorial-stitch/midnight-statement-quote\|editorial-stitch/preview-well\|editorial-stitch/showcase-intro\|nav/mobile-nav\|nav/nav-links" src/ \
  --include="*.tsx" --include="*.ts" --include="*.mts" 2>/dev/null
# expect: no hits

# 6. Git history preserved (one rename commit per file)
git log --diff-filter=R --summary HEAD~1..HEAD | head
```

If `pnpm typecheck` or `pnpm build` fails: first response is `git revert HEAD`, then re-examine.

---

## Execution plan (if approved)

1. **Create slice branch:** `git checkout -b slice/S00-frontend-cleanup-2026-05-13`
2. **Phase 4a:** `mkdir -p src/components/_archive/2026-05-13/{marketing,path,sections,sections/fragmentation-story,sections/home,sections/nonprofit-funnel-new,sections/resources-templates,forms,onboarding,citations,editorial-stitch,nav}`
3. **Phase 4b:** `git mv` each of the 88 files into the archive (one batched commit).
4. **Phase 4c:** Edit `citations/index.ts` and `editorial-stitch/index.ts` to remove re-exports of archived names.
5. **Phase 4d:** Write `src/components/_archive/2026-05-13/README.md` with the manifest.
6. **Verify:** `pnpm typecheck && pnpm lint && pnpm build`. If green, commit.
7. **Stop.** Wait for user before Phase 5 (the `sections-mock` rename + `nav/` cluster pass).

---

## Approval prompt

Reply **`yes`** to proceed with Phase 4 as described.
Reply **`yes minus <path>`** (one or more) to exclude items.
Reply **`yes plus nav-cluster`** to also auto-archive the seven nav internal-only suspects after running the transitive-reachability check.
Reply **`stop`** to leave the report on disk and resume later.
