# Movemental dashboard — build prompts

A separate project from the marketing and diagnostic redesign. Those twenty
prompts covered the public surface: pages a stranger reads once. This set covers
the **product** — pages a staff team returns to, edits, and signs.

## Why it is separate

Different design problem, different constraints:

- **Repeat visits.** A visitor reads a marketing page once. A charter owner opens
  the dashboard weekly for two months. Novelty is a liability; legibility on the
  twentieth visit is the goal.
- **Real data, not example data.** Every public page in the redesign renders
  fixed copy. These pages render one organization's actual documents, at
  whatever state of incompleteness they are in.
- **Editing and consequence.** The public pages have one form. This has document
  editing, versioning, and an act — ratification — that a board stands behind.
- **Multiple people.** Membership, invitations, and who signed what.

## Ground rules for every prompt in this set

Everything from the public set's ground rules still applies (Design Components,
the design-system bundle, tokens only, the notebook margin, the 3.6rem header,
fluid layout, copy from the repo verbatim). Plus four specific to here:

- **Design only what the tables support.** The schema is the specification. If a
  status does not exist as a column value, it does not exist as a UI state.
- **No SaaS chrome.** No icon sidebars, no status badges in five colours, no
  activity feeds, no notification counts, no gamification. Same paper, same
  margin, same restraint as the public pages.
- **No invented organization data.** Use an obviously labelled example org, as
  `Movemental Reality Map.dc.html` and `Movemental Shared Reality.dc.html` do.
- **Continuity with the public pages is a feature.** A leader who read
  `Movemental Safety Stage.dc.html` should recognise the five layers instantly.
  Reuse that vocabulary exactly rather than inventing a product dialect.

## The prompts

| # | Page | Why here |
| --- | --- | --- |
| D1 | The shell and `/dashboard` | Establishes navigation, org identity, and the entry redirect every other page inherits |
| D2 | `/dashboard/safety` — the charter | The centre of the product: five documents from drafted to ratified |
| D3 | The document view — read, edit, version | The screen where the actual work happens |
| D4 | Publishing a version | The consequential act — and NOT what the original prompt assumed |
| D5 | `/dashboard/onboarding/[step]` + leader onboarding | Two step flows, one pattern |

`/dashboard/ai-reality` is **not** in this set. It renders the same
`AiRealityDashboard` component already designed as
`Movemental Shared Reality.dc.html`; the authenticated view differs only in
having a real org name and an empty state. D1 covers that empty state.

## What was found in the repo, before any prompt was written

Read once, recorded here so five prompts do not each re-derive it.

**The routes**

- `/dashboard` — `getOptionalAuthUser()`; no user redirects to
  `/login?next=/dashboard`, a user redirects to `/dashboard/ai-reality`. It
  renders nothing itself. It exists because transactional emails link to it.
- `/dashboard/layout.tsx` — just `InkBandUtilityShell`. No product chrome at the
  layout level.
- `/dashboard/safety` — `requireSafetyDashboardSession()` then
  `loadCharterDashboardForOrg(organizationId)`, rendering
  `CharterDashboardShell`. Failure renders one line: "Could not load charter
  data. Try again or contact support."
- `/dashboard/ai-reality` — no user redirects to `/assess`. No `TENANT_ORG_ID`
  renders "Dashboard not configured". No payload renders the empty state.

**The data model** (`src/lib/db/schema.ts`, `safety_*` tables)

`safety_guidebooks` · `safety_artifacts` (unique on org + slug) ·
`safety_artifact_versions` (unique on artifact + version_number) ·
`safety_layer_checklist_items` · `safety_guidebook_signatures` ·
`safety_guidebook_ratifications` · `safety_enrollments`.

**The state model — and the correction it forces**

The original prompt 20 assumed three artifact states: drafted / in review /
ratified. **The schema has two:** `status` is `"draft" | "published"`. There is
no in-review state. Derived values in `CharterDashboardPayload`:

- `layersComplete` — count of layers whose latest version has a non-empty
  `body_md`. "Complete" means *written*, not *approved*.
- `overallStatus` — `"published"` only when every artifact is published,
  otherwise `"draft"`.
- The header string the product already uses:
  `"Draft, {layersComplete} of {layerCount} layers complete"`, or `"Published"`.

**How editing and publishing actually work**

- Saving a draft inserts a **new row** in `safety_artifact_versions` at
  `version_number = latest + 1` and sets the artifact back to `status: "draft"`.
  Nothing is overwritten — history is append-only and complete.
- Publishing reads the latest version, inserts a **ratification row carrying that
  `version_id`**, and sets the artifact to `published`. Ratification is bound to
  a specific version, which is what makes "what exactly did the board approve?"
  answerable.
- Provisioning (`provision-safety-org.ts`) creates the artifacts at
  `status: "draft"` with `version_number: 1` already inserted. **A charter is
  never empty on first login** — the promise "you edit instead of authoring" is
  real in the data.

**The honest problem with what exists today**

`CharterDashboardShell` is a competent generic admin UI: a lucide-icon sidebar,
an org-initials avatar tile, `prose` classes, and `dangerouslySetInnerHTML` on
`body_md`. It works, and it looks like every other B2B dashboard. It shares no
vocabulary with the public pages — no notebook margin, no ghost numerals, no
Playfair, no mono step labels. **The redesign opportunity here is larger than on
any public page**, because the gap between the brand and the product is widest.

## Status

**Built** as `Movemental Dashboard.dc.html` — one file, nine screens, covering
D1–D5. Two prompt assumptions were corrected during the build; both are recorded
in the relevant prompt files and in the file's own header comment.

## Open questions for the product team

1. **Is there really no review state?** Two states model "someone is drafting"
   and "the board approved". They do not model "ready for the board to look at",
   which is the state a charter sits in longest. Adding it is a schema change,
   not a design decision.
2. **What is `safety_layer_checklist_items` for?** It exists and the dashboard
   never reads it. Either it drives a per-layer completeness checklist that
   should be surfaced, or it is dead.
3. **Signatures and ratifications are unused.** `publishArtifact()` writes to
   `safety_artifact_publications`, not to `safety_guidebook_ratifications` or
   `safety_guidebook_signatures`. Those two tables exist and nothing in the
   charter flow touches them. Either board signing was planned and never wired,
   or the tables are dead. D4 was built around the act that actually ships
   (publish a version) and names signing as undesigned.
4. **Who may publish?** `require-safety-api.ts` gates on org membership, not on
   role. If any member can ratify a board document, that is worth a deliberate
   decision rather than a default.
