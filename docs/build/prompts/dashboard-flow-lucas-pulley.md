# Dashboard architecture & flow — Lucas Pulley

**Audience:** Product, engineering, and facilitation prompts where the signed-in user represents **Lucas Pulley** — **Movements Director**, Underground Network / Tampa Underground (`lucas-pulley` research dossier).

**Org record (Supabase):** `organizations.slug = lucas-pulley` (verify in environment before hard-coding URLs).

**Companion canon:** Lucas sits in Movemental’s **trusted-voice / ecosystem layer**—a movement leader whose **fragmented corpus** (Medium, podcasts, in-house teaching, Missio Alliance) is precisely what the platform helps **curate and activate**. He is **not** framed as a fourth peer funnel segment beside churches / nonprofits / institutions; see `docs/build/strategy/movement-leaders-as-ecosystem-layer.md`.

---

## 1. Identity & success criteria

Lucas is a **practitioner-first movement leader**: decentralized church multiplication, translocal movements support, strong systems thinking (mathematics background), and dense **network relationships** across Exponential, Missio Alliance, and Underground circles.

**He succeeds in the dashboard when:**

1. **Onboarding** clearly progresses through **identity → corpus → themes → agent test** without feeling like a nonprofit “compliance” funnel—copy should respect **theological and movement vocabulary** he already uses publicly.
2. **Corpus and themes steps** surface his **actual corpora** (books where present; for Lucas, articles, essays, podcasts, and teaching transcripts) so RAG and agent behavior stay **inspectable** and **bounded**.
3. **Agent test** feels like **quality assurance on a public voice**, not a gimmick—feedback loops should be easy to submit.
4. **Program templates** remain available as **optional literacy / facilitation artifacts** (Safety & Sandbox Stitch migrations), but they are **secondary** to his leader-specific onboarding unless Movemental assigns a cohort exercise.

---

## 2. Route architecture (what exists in code)

Same authenticated shell as other tenants: `(dashboard)/layout.tsx` → `DashboardShell` + **`OnboardingPanel`**.

| URL / rewrite | Purpose for Lucas |
|---------------|-------------------|
| `/dashboard` | **Overview** — entry to Program templates, Teaching library, full onboarding. |
| `/welcome` | **Full onboarding checklist** — all phases when unlocked. |
| `/onboarding/:step` → `/dashboard/onboarding/:step` | Task routes; **corpus**, **affiliates**, **themes**, **agent**, plus identity placeholders until dedicated UIs ship. |
| `/program` | Safety/Sandbox template index—useful when Movemental runs a **structured sequence** with him; otherwise informational. |
| `/program/safety/[templateId]`, `/program/sandbox/[templateId]` | Fixture viewers with optional **`program_engagements`** merge for `lucas-pulley`. |
| `/dashboard/teaching/claude-skills` | Strong fit—pedagogy for **skills-based agent authoring** aligns with his practitioner-teaching mode. |

**Organization context:** `?org=lucas-pulley` ensures onboarding APIs and program overlays resolve to his **movement-leader tenant**, not Youthfront or Movemental staff orgs.

---

## 3. Intended journey (happy path)

1. **Login** → `/dashboard` with membership tied to **`lucas-pulley`** org.
2. **Commitment phase** — agreement, payment, cohort selection—handled like other paid leaders (`docs/build/prompts/movement-leader-onboarding-flow.md`).
3. **Identity phase** — organization profile, consent, optional brand/images; language should reference **Underground Network + personal voice** without collapsing him into a generic “nonprofit admin.”
4. **Content phase (Movemental prep gates)** — **`corpus_review`**, **`affiliates_review`**, **`themes_review`** unlock when staff marks prep complete; these are **critical** for Lucas because his published surface area is **distributed across media types**.
5. **Activation phase** — **`agent_test`** → **`platform_tour`** → **`cohort_prep`** → **`final_confirmation`**. Agent testing should invite **scenario-based prompts** (movement theology, microchurch practice, leadership tensions) consistent with his public frameworks—not generic chat demos.
6. **Post-onboarding** — Overview remains useful; Teaching library supports **how-to** for extending agents with skills; Program routes activate when Movemental assigns template work.

---

## 4. Differentiation vs implementation-org tenants (e.g., Youthfront)

| Dimension | Lucas (`lucas-pulley`) | Org buyer (e.g., Youthfront) |
|-----------|------------------------|------------------------------|
| Primary outcome | **Trusted voice corpus + agent quality** | **Operational governance + inventory + board readiness** |
| Risk emphasis | Voice drift, mis-citation, over-claiming network authority | Youth data, donor data, accreditation narrative |
| Onboarding tone | Practitioner / movement vocabulary | COO / exec-table vocabulary |
| Program templates | Contextual / assigned | Safety & Sandbox often central | 

Prompts and fixtures should **not** swap these framings casually.

---

## 5. Network & content assumptions for prompts

When generating dashboard microcopy or tasks “for Lucas,” consult **`docs/movement_leader_research/lucas-pulley/`** (especially `summary.md`, `profile/`, `network/`). Useful anchors:

- **Title:** Movements Director (Executive Team; Joel Repic as Executive Director per 2025–26 public staff listings—confirm live source before quoting externally).
- **Distinctive frame:** Cities transformed by the **priesthood of all believers** activated in mission—repeated across interviews.
- **Corpus reality:** Few long-form books; **articles, podcasts, Medium, gated Teachable segments** matter for ingestion pipelines.

Never invent **private** metrics (subscriber counts, unreleased projects) if research flags them unknown.

---

## 6. Prompting checklist for engineers / AI agents

1. Verify **`lucas-pulley`** membership and onboarding rows after task-definition changes (`pnpm` backfill scripts / service layer—follow existing onboarding docs).
2. Ensure `/onboarding/*` rewrites in `next.config.ts` remain aligned with checklist `href` generation (`tasks.ts` routes).
3. When adding Program engagement rows for Lucas, use **`template_slug`** matching manifest IDs under `src/lib/program/stitch-manifest` / fixtures.
4. Preserve **six-layer** discipline if introducing new APIs—schema → services → routes → hooks (`CLAUDE.md` chain).

---

## 7. Source index (internal)

| Topic | Location |
|-------|----------|
| Structured dossier | `docs/movement_leader_research/lucas-pulley/README.md` |
| Movement leader onboarding doctrine | `docs/build/prompts/movement-leader-onboarding-flow.md` |
| Trusted voices vs organizations | `docs/build/strategy/movement-leaders-as-ecosystem-layer.md` |
| Public voice snippet (site) | `src/components/studio/pages/VoicesPage.tsx` (descriptor block; keep in sync with research) |
