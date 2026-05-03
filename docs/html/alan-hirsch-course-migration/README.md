# Alan Hirsch → Movemental — Course front-end migration

This tree contains the static HTML/CSS/JS port of every Forgotten Ways and course-related view from the sibling `alan-hirsch` repo, re-skinned in Movemental's Digital Curator design language.

**Design sources (authority):**

1. [`docs/design/DESIGN.md`](../../design/DESIGN.md) — creative charter.
2. [`docs/design/STATIC_HTML_AND_TEMPLATES.md`](../../design/STATIC_HTML_AND_TEMPLATES.md) — `<head>` contracts, load order, shell rules.
3. [`docs/html/site-templates/site-theme.css`](../site-templates/site-theme.css) — semantic token ramp (do not fork).

**Build prompt:** [`docs/build/prompts/forgotten-ways-and-course-views-alan-hirsch-to-docs-html-migration.md`](../../build/prompts/forgotten-ways-and-course-views-alan-hirsch-to-docs-html-migration.md).

**Manifest contract:** [`_shared/SOURCE_ROUTE_AND_COMPONENT_MANIFEST.md`](./_shared/SOURCE_ROUTE_AND_COMPONENT_MANIFEST.md) — the list every file below is checked against.

## Subtree conventions (chosen for this migration)

- **Shell family:** the `course-previews`-style chrome (light-primary, semantic tokens, `course-preview.css`/`course-preview-app.js` patterns extended rather than forked). Pages use their own layout-only `<body class="fw-migration">` + the shared `_shared/forgotten-ways-shell.css`.
- **`<head>` order:** `preconnect → Inter Google Font → site-theme.css → _shared/forgotten-ways-shell.css → [page-local <style>] → _shared/forgotten-ways-learn.js (defer)`.
- **No second `:root`** in any page `<style>`. Tokens belong to `site-theme.css`.
- **No raw hex** outside `:root` (except SVG `currentColor` use and `color-mix` with semantic vars).
- **One L4 shell per page:** either the `fw-topbar` (course sub-nav) or a plain `.band-*` layout — never mixed.
- **States as separate files.** `…--loading.html`, `…--error.html`, `…--empty.html`, `…--locked.html`, `…--not-found.html`. Filenames mirror the source route + state.

## Route → file index

### FW-CORE — `forgotten-ways/`

| Source route | File | Status |
| --- | --- | --- |
| `/courses/forgotten-ways` | [`forgotten-ways/index.html`](./forgotten-ways/index.html) | built |
| `/courses/forgotten-ways` (loading) | [`forgotten-ways/index--loading.html`](./forgotten-ways/index--loading.html) | built |
| `/courses/forgotten-ways` (not found) | [`forgotten-ways/index--not-found.html`](./forgotten-ways/index--not-found.html) | built |
| `/courses/forgotten-ways/overview` | [`forgotten-ways/overview.html`](./forgotten-ways/overview.html) | built |
| `/courses/forgotten-ways/enroll` | [`forgotten-ways/enroll.html`](./forgotten-ways/enroll.html) | built |
| `/courses/forgotten-ways/enroll` (loading) | [`forgotten-ways/enroll--loading.html`](./forgotten-ways/enroll--loading.html) | built |
| `/courses/forgotten-ways/enroll` (not found) | [`forgotten-ways/enroll--not-found.html`](./forgotten-ways/enroll--not-found.html) | built |
| `/courses/forgotten-ways/learn` | [`forgotten-ways/learn.html`](./forgotten-ways/learn.html) | built |
| `/courses/forgotten-ways/learn` (loading) | [`forgotten-ways/learn--loading.html`](./forgotten-ways/learn--loading.html) | built |
| `/courses/forgotten-ways/learn` (error) | [`forgotten-ways/learn--error.html`](./forgotten-ways/learn--error.html) | built |
| `/courses/forgotten-ways/learn` (empty) | [`forgotten-ways/learn--empty.html`](./forgotten-ways/learn--empty.html) | built |
| `/courses/forgotten-ways/learn` (locked) | [`forgotten-ways/learn--locked.html`](./forgotten-ways/learn--locked.html) | built |
| `/courses/forgotten-ways/learn` (404) | [`forgotten-ways/learn-404.html`](./forgotten-ways/learn-404.html) | built |
| `/courses/forgotten-ways/learn` (week 8 closing) | [`forgotten-ways/learn-week8-closing.html`](./forgotten-ways/learn-week8-closing.html) | built |
| `/courses/forgotten-ways/cohort` | [`forgotten-ways/cohort.html`](./forgotten-ways/cohort.html) | built |
| `/courses/forgotten-ways/cohort` (loading) | [`forgotten-ways/cohort--loading.html`](./forgotten-ways/cohort--loading.html) | built |
| `/courses/forgotten-ways/resources` | [`forgotten-ways/resources.html`](./forgotten-ways/resources.html) | built |
| `/courses/forgotten-ways/resources` (loading) | [`forgotten-ways/resources--loading.html`](./forgotten-ways/resources--loading.html) | built |
| `/courses/forgotten-ways/journal` | [`forgotten-ways/journal.html`](./forgotten-ways/journal.html) | built |
| `/courses/forgotten-ways/journal` (loading) | [`forgotten-ways/journal--loading.html`](./forgotten-ways/journal--loading.html) | built |
| `/courses/forgotten-ways/journal` (empty) | [`forgotten-ways/journal--empty.html`](./forgotten-ways/journal--empty.html) | built |
| `/courses/forgotten-ways/player` | [`forgotten-ways/player.html`](./forgotten-ways/player.html) | built |
| `/courses/forgotten-ways/sales` | [`forgotten-ways/sales.html`](./forgotten-ways/sales.html) | built |

### FW-CORE — section-type fixtures (`forgotten-ways/fixtures/`)

Each page mounts a single section renderer over the real `fw-learn` shell so designers and React porters can see the exact chrome, typography, and spacing they need to implement.

| Section types | Fixture | Status |
| --- | --- | --- |
| `video`, `welcome` | [`forgotten-ways/fixtures/section-video.html`](./forgotten-ways/fixtures/section-video.html) | built |
| `scripture` | [`forgotten-ways/fixtures/section-scripture.html`](./forgotten-ways/fixtures/section-scripture.html) | built |
| `reading`, `post_course` | [`forgotten-ways/fixtures/section-reading.html`](./forgotten-ways/fixtures/section-reading.html) | built |
| `reflection` | [`forgotten-ways/fixtures/section-reflection.html`](./forgotten-ways/fixtures/section-reflection.html) | built |
| `practical_exercise` | [`forgotten-ways/fixtures/section-practical-exercise.html`](./forgotten-ways/fixtures/section-practical-exercise.html) | built |
| `field_experiment` | [`forgotten-ways/fixtures/section-field-experiment.html`](./forgotten-ways/fixtures/section-field-experiment.html) | built |
| `discussion`, `cohort_session` | [`forgotten-ways/fixtures/section-discussion.html`](./forgotten-ways/fixtures/section-discussion.html) | built |
| `integration` | [`forgotten-ways/fixtures/section-integration.html`](./forgotten-ways/fixtures/section-integration.html) | built |
| `lordship_opening`, `lordship_closing` | [`forgotten-ways/fixtures/section-devotional.html`](./forgotten-ways/fixtures/section-devotional.html) | built |
| `looking_ahead` | [`forgotten-ways/fixtures/section-looking-ahead.html`](./forgotten-ways/fixtures/section-looking-ahead.html) | built |
| `journey_continues`, `commissioning` | [`forgotten-ways/fixtures/section-journey-continues.html`](./forgotten-ways/fixtures/section-journey-continues.html) | built |
| `resource_blurb` | [`forgotten-ways/fixtures/section-resource-blurb.html`](./forgotten-ways/fixtures/section-resource-blurb.html) | built |
| `action` | [`forgotten-ways/fixtures/section-action.html`](./forgotten-ways/fixtures/section-action.html) | built |
| `assessment` | [`forgotten-ways/fixtures/section-assessment.html`](./forgotten-ways/fixtures/section-assessment.html) | built |
| `case_study` | [`forgotten-ways/fixtures/section-case-study.html`](./forgotten-ways/fixtures/section-case-study.html) | built |
| `guided_practice` | [`forgotten-ways/fixtures/section-guided-practice.html`](./forgotten-ways/fixtures/section-guided-practice.html) | built |
| `chat_dissonance`, `chat_action`, `chat_reflection` | [`forgotten-ways/fixtures/section-chat-cta.html`](./forgotten-ways/fixtures/section-chat-cta.html) | built |
| `context_discovery` | [`forgotten-ways/fixtures/section-context-intro.html`](./forgotten-ways/fixtures/section-context-intro.html) | built |
| `covenant` | [`forgotten-ways/fixtures/section-covenant.html`](./forgotten-ways/fixtures/section-covenant.html) | built |
| `exit_ticket` | [`forgotten-ways/fixtures/section-exit-ticket.html`](./forgotten-ways/fixtures/section-exit-ticket.html) | built |
| `transition` | [`forgotten-ways/fixtures/section-transition.html`](./forgotten-ways/fixtures/section-transition.html) | built |

### COURSE-GLOBAL — `course-platform/`

| Source route | File | Status |
| --- | --- | --- |
| `/courses` | [`course-platform/catalog.html`](./course-platform/catalog.html) | built |
| `/courses` (loading) | [`course-platform/catalog--loading.html`](./course-platform/catalog--loading.html) | built |
| `/courses` (empty) | [`course-platform/catalog--empty.html`](./course-platform/catalog--empty.html) | built |
| `/courses` (error) | [`course-platform/catalog--error.html`](./course-platform/catalog--error.html) | built |
| `/checkout` | [`course-platform/checkout.html`](./course-platform/checkout.html) | built |
| `/checkout` (empty) | [`course-platform/checkout--empty.html`](./course-platform/checkout--empty.html) | built |
| `/checkout` (error) | [`course-platform/checkout--error.html`](./course-platform/checkout--error.html) | built |
| `/checkout/success` | [`course-platform/checkout-success.html`](./course-platform/checkout-success.html) | built |
| `/checkout/cancel` | [`course-platform/checkout-cancel.html`](./course-platform/checkout-cancel.html) | built |

### COURSE-AUX — `account/`

| Source route | File | Status |
| --- | --- | --- |
| `/account` | [`account/dashboard.html`](./account/dashboard.html) | built |
| `/account` (loading) | [`account/dashboard--loading.html`](./account/dashboard--loading.html) | built |
| `/account/learning` | [`account/learning.html`](./account/learning.html) | built |
| `/account/learning` (loading) | [`account/learning--loading.html`](./account/learning--loading.html) | built |
| `/account/learning` (empty) | [`account/learning--empty.html`](./account/learning--empty.html) | built |
| `/account/profile` | [`account/profile.html`](./account/profile.html) | built |
| `/account/profile` (empty context) | [`account/profile--empty-context.html`](./account/profile--empty-context.html) | built |
| `/account/bookmarks` | [`account/bookmarks.html`](./account/bookmarks.html) | built |
| `/account/library` | [`account/library.html`](./account/library.html) | built |
| `/certificates/verify/[code]` | [`account/certificate-verify.html`](./account/certificate-verify.html) | built |
| `/certificates/verify/[code]` (loading) | [`account/certificate-verify--loading.html`](./account/certificate-verify--loading.html) | built |
| `/certificates/verify/[code]` (not found) | [`account/certificate-verify--not-found.html`](./account/certificate-verify--not-found.html) | built |

## Excluded (by §4 classification)

- `src/app/(admin)/**` — admin content management. Out of scope per migration prompt §4.
- Marketing-overlap pages (books hub, general pathways index) that embed course blocks only incidentally. They are covered by future prompts that target full-site parity.

## Human decisions that remain

See §9 of [`_shared/SOURCE_ROUTE_AND_COMPONENT_MANIFEST.md`](./_shared/SOURCE_ROUTE_AND_COMPONENT_MANIFEST.md). Specifically:

1. **Cohort meeting link** is `undefined` in `FORGOTTEN_WAYS_COHORT`; the static page renders a disabled CTA and a note. Confirm once backend is finalized.
2. **Certificate issuance workflow** is not defined in source; the verify template is illustrative.
3. **Bookmarks / library** routes are stubs; static pages render neutral empty states.
4. **Assets** — binaries are not yet copied (see [`assets/README.md`](./assets/README.md)); art-containing regions use semantic CSS placeholders that preserve the layout contract.
5. **Font** — pages standardize on **Inter** (Movemental charter) rather than source Newsreader/Manrope. Revisit when/if the Movemental charter admits a serif display face for course marketing.

## Testing

These templates are self-contained and work under `file://` as long as relative paths resolve. A static server is optional. Recommended:

```bash
# From repo root
pnpm reader:serve           # http://localhost:8765/alan-hirsch-course-migration/forgotten-ways/
```

Or any simple server (e.g. `python3 -m http.server 8000` inside `docs/html/`). Note: pages link back to `../README.html` as a friendly "home" — when served through a rendered docs pipeline that produces HTML from this file, the link works out of the box; when opened directly via `file://`, the link falls through to the raw markdown (which most browsers still render readably).

## Phase F — verification status

| Gate | Check | Result |
| ---- | ----- | ------ |
| F.1 — completeness | Every manifest route mapped to HTML (64 files) | **pass** |
| F.1 — completeness | Every `SectionType` has a fixture | **pass** (21/21) |
| F.1 — completeness | Every high-traffic state variant present | **pass** |
| F.1 — completeness | No TODO / TBD / FIXME / Lorem in bodies | **pass** |
| F.2 — design | No duplicate `:root` in any page `<style>` | **pass** |
| F.2 — design | No leaked global `html{}` / `box-sizing` reset | **pass** |
| F.2 — design | No raw hex outside `:root` ramp | **pass** (SVG `currentColor` + `color-mix(...)` only) |
| F.2 — design | Single shell family (`fw-topbar` *or* `site-top`) per subtree, per page | **pass** |
| F.3 — engineering | Internal links are relative | **pass** |
| F.3 — engineering | `assets/README.md` records provenance and pending binaries | **pass** |
| F.4 — mechanical | `sync-docs-html-nav.py` / `strip-docs-html-inline-l0-l1.py` not required (no root `docs/html/*.html` touched) | n/a |

## Handoff to React

When promoting a section to React:

1. Read the matching file under `forgotten-ways/fixtures/` to see markup and tokens in isolation.
2. Confirm tokens by grepping `site-theme.css`.
3. Follow [`docs/build/prompts/stitch-to-react-migration.md`](../../build/prompts/stitch-to-react-migration.md) for semantic class → Tailwind util remapping.
4. Copy any binaries into `public/images/...` and rewire via `next/image`.
