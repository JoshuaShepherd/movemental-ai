# Org site page prompts — priority index

Numbered prompts for **marketing/legal pages** that may still need **Stitch/React parity passes** even when a first **`docs/html`** draft exists. Each sibling file is a **standalone prompt** you can paste into an authoring agent.

**Shared rules (prepend to any run):**

1. Read [`docs/design/DESIGN.md`](../../design/DESIGN.md) — tokens, section rhythm, no decorative borders between bands.
2. For **static HTML**: link [`docs/html/site-templates/site-theme.css`](../../html/site-templates/site-theme.css); follow the shared instructions in [`html-template-exemplars-index.md`](./html-template-exemplars-index.md) § “Shared instructions.”
3. For **React parity**: follow [`stitch-to-react-migration.md`](./stitch-to-react-migration.md); pinned Stitch project `2208910962065880866` only.
4. **Founder ground truth** before merging older corpus copy: [`docs/notes/mvmtl-running-notes-founder-input-2026-04.md`](../../notes/mvmtl-running-notes-founder-input-2026-04.md).
5. **Cross-repo inventory** (read-only siblings): run or mirror [`mvmtl-cross-repo-documentation-index.md`](./mvmtl-cross-repo-documentation-index.md).

| Priority | Prompt file | Target route / artifact | Suggested `docs/html` output (if static) |
| ---: | --- | --- | --- |
| 01 | [`01-page-contact.md`](./01-page-contact.md) | `/contact` | `docs/html/contact.html` |
| 02 | [`02-page-case-studies.md`](./02-page-case-studies.md) | `/case-studies` | `docs/html/case-studies.html` |
| 03 | [`03-page-manifesto.md`](./03-page-manifesto.md) | `/manifesto` | `docs/html/manifesto.html` |
| 04 | [`04-page-privacy-policy.md`](./04-page-privacy-policy.md) | `/privacy` | `docs/html/privacy.html` (optional mirror of shipped legal) |
| 05 | [`05-page-cookie-policy.md`](./05-page-cookie-policy.md) | `/cookies` | `docs/html/cookies.html` |
| 06 | [`06-page-services-overview.md`](./06-page-services-overview.md) | `/services` | `docs/html/services.html` (root-level; template exists under `site-templates/`) |
| 07 | [`07-page-organizational-systems.md`](./07-page-organizational-systems.md) | `/services/organizational-systems` | `docs/html/organizational-systems.html` |
| 08 | [`08-page-system-builds-hub.md`](./08-page-system-builds-hub.md) | `/services/system-builds` | `docs/html/system-builds.html` |
| 09 | [`09-page-foundation-layer-build.md`](./09-page-foundation-layer-build.md) | `/services/system-builds/foundation` | `docs/html/foundation-layer-build.html` |
| 10 | [`10-page-what-is-movemental-platform.md`](./10-page-what-is-movemental-platform.md) | `/platform` (legacy IA; org may remap) | `docs/html/platform.html` |

**Already drafted in `docs/html`** (reconcile / diff rather than duplicating): `index.html`, `about.html`, `evidence.html`, `faq.html`, `pricing.html`, `system.html`, `how-it-works.html`, `movement-leaders.html`, `churches.html`, `nonprofits.html`, `who-is-a-movement-leader.html`, `discovery-lab.html`, `movemental-at-100.html`, `content-system-build.html`, `fundraising-system-build.html`, `governance-ethics-system-build.html`, **`contact.html`**, **`case-studies.html`**, **`manifesto.html`**, **`privacy.html`**, **`cookies.html`**, **`services.html`**, **`organizational-systems.html`**, **`system-builds.html`**, **`foundation-layer-build.html`**, **`platform.html`**, plus `site-templates/` for methodology, walkthrough, who-we-serve, terms, services shell, etc.

**Cross-cutting (whole site, not a single route):**

| Prompt | Purpose |
| ------ | ------- |
| [`00-site-content-architecture-nav-master-prompt.md`](./00-site-content-architecture-nav-master-prompt.md) | Full IA + per-page content prompts + perfected nav spec; companion to inventory / SSOT after site-wide passes |
| [`strategy-artifacts-placement-and-flow.md`](./strategy-artifacts-placement-and-flow.md) | Placement SSOT: book (`/book`) vs the AI Stewardship Sequence field guide (`/articles/ssss-field-guide-for-organizational-leaders`) vs Ch. 2; `/fragmentation`; `/assess` vs `/assessment-new`; AI posture; articles; proof types; `/about`; anti–chapter-zero duplication |
| [`global-dark-mode-theme-rollout.md`](./global-dark-mode-theme-rollout.md) | Dark palette derived from current light tokens, `DESIGN.md` updates, `globals.css` `.dark` ramp, theme provider + **sun/moon** nav toggle, Midnight interaction, audit + QA |
| [`home-hero-scatter-integration-visual-plan.md`](./home-hero-scatter-integration-visual-plan.md) | Home `/` §1 hero right visual — dual-field scatter→settle, emotional + compositional constraints; implementation in `src/components/sections/home/home-hero-visual-dual-field.tsx` + `src/lib/home-hero-visual-session.ts` |
| [`home-page-narrative-credibility-ia-plan.md`](./home-page-narrative-credibility-ia-plan.md) | Home `/` — narrative ownership vs `/fragmentation` + book, credibility evidence (Chapter 1 / L2b), step-by-step refactor plan and finished IA vision |

**Deferred** (second wave — add new numbered prompts when promoted): `/team`, `/playbook`, `/scenius`, `/decision`, `/operating-model`, `/operating-model/detailed`, `/resources`, `/for-institutions`, `/m100/organizations`, legacy `/why-movemental*` variants, `/compare*`, `/strategy`, `/formation*`, etc.
