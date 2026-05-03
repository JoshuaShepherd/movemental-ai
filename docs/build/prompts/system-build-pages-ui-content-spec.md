# System build pages — UI and content specification (authoring prompt)

Use this prompt when **designing, writing, auditing, or migrating** the Movemental **institutional system build** surface: **Discovery Lab**, **Content System Build**, **Fundraising System Build**, **Governance & Ethics System Build**, and the **Foundation layer** bridge. It is written so an agent or human can ship pages that **do the job** for nonprofit and institutional buyers: clarity on **problem → sprint → artifacts → sequencing → fit → next step**, without generic consulting vapor.

---

## 0) Mandatory context (read before writing)

1. **[`docs/design/DESIGN.md`](../../design/DESIGN.md)** — semantic tokens only (`bg-background`, `bg-section`, `bg-card`, `bg-inverse-surface`, `text-foreground`, `text-muted-foreground`, `text-inverse-foreground`, `bg-primary`, `border-border`, `shadow-ambient` where elevation is justified). No global “dark mode” on `html`; midnight sections use `variant="midnight"`. No decorative 1px borders between bands; depth via tonal stacking. Inter, editorial rhythm, accessible focus states.
2. **[`docs/notes/mvmtl-running-notes-founder-input-2026-04.md`](../../notes/mvmtl-running-notes-founder-input-2026-04.md)** — **five modular builds**, each optionally standalone; **four-week sprint** shape; **Discovery Lab first** when AI use cases / ownership / measurement are the constraint; **maturity model** for AI (experimentation stage: moratorium on **publishing** AI-affected content and on **sharing private data** with AI while learning). **Governance & ethics** as documented principles; **Ray Dalio–style clarity** only as **explicit analogy**, not a brand claim. **Network / linked voices / SEO** angle for institutional content systems—refine, do not invent statistics.
3. **Live routes as source of truth** (reconcile older docs that mention combined URLs):
   - Hub: `/services/system-builds`
   - Discovery Lab: `/services/discovery-lab` (not nested under `system-builds/`)
   - Content: `/services/system-builds/content`
   - Fundraising: `/services/system-builds/fundraising`
   - Governance & ethics (vertical): `/services/system-builds/governance-ethics`
   - Foundation (bridge / spine narrative): `/services/system-builds/foundation`
4. For **React / Stitch parity**: [`stitch-to-react-migration.md`](./stitch-to-react-migration.md); Stitch project **`2208910962065880866`** only.
5. For **static HTML** drafts: [`docs/html/site-templates/site-theme.css`](../../html/site-templates/site-theme.css) and shared instructions in [`html-template-exemplars-index.md`](./html-template-exemplars-index.md).

---

## 1) Job these pages must do (conversion + legitimacy)

A competent buyer should leave each page able to answer:

- **What broken pattern** this module fixes (named, concrete—not “alignment” platitudes).
- **What “done” looks like** in **operational artifacts** (not a slide deck, not “awareness”).
- **How the engagement runs** (timeboxed sprint, roles, honesty about prep).
- **Where this sits** relative to other modules **without false rigidity** (recommended sequence *and* à la carte).
- **Who it is for** (best-fit list) and **what we decline** when the org is not ready.
- **What to do next** (conversation / contact), with **expectations** (scoping, tradeoffs—not a template pitch).

If any of those are missing, the page does not yet do the job.

---

## 2) Shared UI architecture (all system build pages)

### 2.1 Layout primitives

- Compose with existing primitives: **`Section`**, **`Container`**, **`Display`**, **`Eyebrow`**, **`Prose`**, **`ArrowLink`** (`@/components/primitives`). Keep **`"use client"`** out of page files; pages remain Server Components unless a leaf truly needs hooks.
- **Hero rhythm**: account for fixed site nav (`pt` / negative margin patterns already used on long-form service pages). Eyebrow establishes module family (**Nonprofit system build**, **System build**, **Foundation system**, **Discovery Lab** as appropriate).
- **Section alternation**: default surface → `variant="section"` for tonal change → `variant="midnight"` for high-contrast “architecture / proof / transformation” bands. Do not stack identical tokens without a reason.
- **Midnight bands**: prose and lists must remain readable (`text-inverse-foreground`, muted lines at `/70`–`/80` opacity, primary accents for emphasis—not raw hex).

### 2.2 Cards, grids, and evidence

- **Icon-led grids** (Lucide): one idea per card; short title + one paragraph max; icons `aria-hidden` with meaningful headings.
- **Comparison layouts** (before/after, static vs systematized): use paired columns or split panels inside midnight or card shells; ensure **non-color-only** cues (icons, labels, list markers) for state.
- **Images** (`next/image`): editorial, non-stock vibe; meaningful `alt` (mood + function, not keyword stuffing). Prefer existing `/images/site/*` language where possible.
- **Quantitative claims**: use **evidence-note** patterns from HTML theme or restrained inline qualification in React—**no fabricated metrics**.

### 2.3 Shared module chrome (reuse, do not reinvent)

Where the message fits, reuse **`@/components/system-builds`** sections so offers stay coherent:

- **`BuildFormatSection`** — four-week sprint, collaborative build, capability transfer framing (`compact` on long pages).
- **`SystemsIntegrationSection`** — how modules plug together; use `compact` when the page already has heavy narrative.
- **`AdaptiveLeadershipThroughline`** — human + adaptive leadership frame for AI pressure (especially Discovery Lab, Governance, Content “after AI” notes).
- **`OutputsSection`** — sprint-end artifact list with an intro that sets the bar (**operational**, tailored).
- **`AfterTheBuildSection`** — During / After / 90-day story (artifact adoption, not launch hype).
- **`ReadinessSection`** — prerequisites, sponsor behavior, data access—**honest gate**, not shame.
- **`TypicalPathsSection`** — hub + foundation pages; shows sequencing without locking every org into one path.

If you add a **new** section type, it must still read as part of the same **system-build family** (spacing, `Display` hierarchy, `Prose` width).

### 2.4 CTAs

- Primary: **`/contact`** — button styling uses **primary gradient** (`bg-linear-to-br from-primary to-primary-dim`) and visible **focus rings**.
- Secondary: contextual **hub**, **sibling module**, **nonprofit pathways**, **methodology**—never orphan the reader.

### 2.5 Metadata

- `title` and `description` should state **module outcome + differentiation** (artifacts, sprint, anti-slop), under SEO length norms. Avoid repeating the hub description verbatim on every child page.

---

## 3) Shared content architecture (every vertical page)

Each vertical (Discovery, Content, Fundraising, Governance) should include **ordered narrative blocks**—headings can vary, but the **obligations** exist:

1. **Positioning line** — what this module **is** and **is not** (e.g., not generic AI training; not “more content”; not fundraising advice alone).
2. **Problem diagnosis** — organizational pain in **plain language**; avoid blaming individuals; name silos, visibility, drift, risk.
3. **Outcome / promise** — tie to **artifacts** and **ownership**, not vibes.
4. **What you leave with** — explicit list aligned to sprint outputs (see §4 data seeds in `src/lib/system-builds/build-page-content.ts`).
5. **How the sprint runs** — four phases / weeks; collaborative language; **prep** and **team time** expectations.
6. **Integration** — how this module connects to **content**, **fundraising**, **governance**, **Discovery Lab** as appropriate—**cross-links** to real routes.
7. **Pathway fit** — “Best fit for organizations that…” bullets; optionally **readiness** gates where stakes are high (governance, data).
8. **Adaptive leadership / ethics hook** — especially when AI, publishing, or donor trust intersect.
9. **Closing CTA** — conversation + **what the first call is like** (tradeoffs, sequencing).

**Tone:** confident, institutional, **non-slop**; short paragraphs; prefer **named deliverables** over abstractions. **Church vs nonprofit** nuance: do not over-specify church delivery if direction is still open—stay honest and bounded per founder notes.

---

## 4) Per-vertical requirements

Below: **content jobs** + **UI jobs**. Align artifact copy with `contentBuildOutputs`, `fundraisingBuildOutputs`, `governanceBuildOutputs`, `discoveryBuildOutputs` and the paired `*AfterPhases` in **`src/lib/system-builds/build-page-content.ts`** when implementing in React.

### 4.1 Discovery Lab (`/services/discovery-lab`)

**Content must**

- Anchor on **structured experimentation inside real work**, not tool shopping.
- Name the failure mode: **piloting without memory**—no documentation, no owners, no stop conditions.
- Cover **use case identification**, **experiment briefs**, **measurement that matters**, **risk / privacy / ethics** hooks tied to daily workflows—not a generic “AI policy” PDF.
- State relationship to **governance** (approval paths, publishing moratorium during learning—phrased responsibly and aligned to founder maturity model).
- Deliver **“leave with”** items: prioritized use-case register, experiment outcomes, measurement + risk notes, internal playbook **draft** (honest about maturity).

**UI must**

- Use **midnight** for the “capability architecture” band; 3-column icon grid readable on mobile (stack).
- Before/after or list patterns for **random → repeatable**.
- Methodology steps (audit → sandbox → live sprints → integrate) visually distinct from fundraising’s data-centric steps—avoid looking like the same template with different words.

### 4.2 Content System Build (`/services/system-builds/content`)

**Content must**

- Reframe **volume** vs **structure**: compounding **library**, **pathways**, **discoverability**, **reuse**—the top of funnel becomes **ordered**, not louder.
- Problem grid: scattered docs, drifted messaging, under-leveraged knowledge, disconnected comms—then **one line** tying symptoms to **discoverability / voice / lost institutional memory**.
- Artifacts: structured library, **thematic pathways**, **SEO-ready IA**, **deployable content system spec** (roles, publishing checks, reuse rules)—map honestly to Movemental or **client stack**.
- **After the build**: editors know where things live; less Slack archaeology; **90-day** reuse compounding; **AI** appears as “when you add Discovery Lab,” bounded material—not hype.
- Pathway: link **nonprofit pathways** + hub; **ReadinessSection** footnote should allow **resequencing** when fundraising or AI waits on story architecture.

**UI must**

- Strong **problem** band (midnight grid of pain cards works).
- **`OutputsSection`** for artifacts—do not bury deliverables in prose.
- Lighter **`BuildFormatSection` / `SystemsIntegrationSection`** (`compact`) after substantive sections.

### 4.3 Fundraising System Build (`/services/system-builds/fundraising`)

**Content must**

- Lead with **visibility over net-new relationships**—data + network already exist; **system** makes them actionable.
- Draw diagnosis/reactive vs systematized contrast; name **reactive outreach** and **unpredictable revenue** without shaming fundraisers.
- “**Not fundraising advice**—**system installation**” (or equivalent clarity): CRM / workflow / dashboard outcomes framed as **infrastructure**, aligned to founder note on **CRM + AI-powered donation engine** after track—**do not over-promise product names**; describe capabilities.
- Concrete assets: dashboard/report pack, relationship visibility, prioritized opportunities, workflows—tie to **stewardship queues** and **campaign readiness**.
- Methodology: **data cleaning → patterning → workflow design → pilot test** (or current canonical steps)—show **four-week** discipline.
- Integration strip: **governance integrity**, **AI learning loop**, **content signal**—must feel like **one organization**, not three vendors.
- Prep honesty: messy data expected; **data access** + **core team** participation—secondary CTA acceptable (“Review prep in conversation”).

**UI must**

- Consider **split hero** (text + editorial image / inset “operational clarity” card) for premium tone.
- **Icon grid** for system components (6 cards) works well in midnight.
- **Static vs systematized** section: strong visual pairing; maintain accessible list markers.
- **`shadow-ambient`** on elevated cards only where it matches DESIGN.md—not heavy drop shadows everywhere.

### 4.4 Governance & Ethics (`/services/system-builds/governance-ethics`)

**Content must**

- Separate **governance** (decision rights, oversight, accountability) from **ethics** (disclosure, formation, gray-area judgment)—**without doubling** the entire foundation page.
- Name pre-build pain: informal consensus, role ambiguity, reactive ethics.
- Post-build state: explicit authority, clean alignment, integrated integrity.
- Deliverables: governance manual, ethics charter, authority matrix, compliance protocol—describe as **usable**, **legal review where required**.
- Process: discovery → architecture → documentation → implementation (**with** leadership, not imposed).
- Requirements / **readiness**: executive-board access, honesty about improvised ethics, **sponsor** who holds the line, **weekly decision-carriers**—use **`ReadinessSection`** with `governanceReadinessRequires` or equivalent copy.
- **AI paragraph**: governance as spine that makes Discovery Lab and public AI **safer**—disclosure, approval, escalation for vulnerable populations / reputation.

**UI must**

- **Bento-style architecture grid** (roles, accountability, ethics frame, operational docs) is on-brand; watch mobile stacking order.
- Before/after in **midnight** split panel reads as “transformation.”
- Deliverables list: left **`Display`**, right bordered list—keep borders **semantic** (`border-elevated` / token-driven), not arbitrary gray chrome.

### 4.5 Foundation layer (`/services/system-builds/foundation`)

**Content must**

- Position as **operating spine** that connects Discovery Lab, content, and fundraising—**governance vs ethics** definitional section required.
- Link prominently to **`/services/system-builds/governance-ethics`** for the deep vertical (avoid duplicate SEO story; pick one canonical depth per topic family).
- Reuse **pathways** and **after foundation** persistence copy: named ambiguity, artifacts teams can run, **90-day** safer experiments.
- Sprint framing: foundation is still a **guided sprint**, not a policy retreat that never ships.

**UI must**

- **`TypicalPathsSection`**, **`BuildFormatSection`**, **`AfterTheBuildSection`**, **`SystemsIntegrationSection`** as the structural spine—this page is the **map**, not the deepest policy vault.

---

## 5) Hub page (`/services/system-builds`) — coordinator, not duplicate

**Content must**

- Explain **one system, installed in parts**; coordination tax / connective tissue metaphor.
- **Recommended sequence vs à la carte** list: Discovery Lab first *when*; content + fundraising *when*; governance / foundation *when*—mirror hub copy, not contradictory sibling pages.
- Cards: **outcome + who it’s for** subline (`systemBuildHubCards` pattern)—each card links to a **real** route.

**UI must**

- **`SystemStackSection`**, **`BuildFormatSection`**, **`TypicalPathsSection`** per existing hub composition—midnight stack section for “what the whole system feels like.”

---

## 6) Cross-linking and sequencing rules

- **Always** link modules to each other where **handoff friction** exists (content ↔ fundraising; governance ↔ Discovery Lab; foundation ↔ hub).
- Prefer **plain-language “when to reorder”** over forcing a single funnel.
- **Discovery Lab** route lives at **`/services/discovery-lab`**—never assume `/discovery-lab` unless the app actually exposes it (marketing links must match `src/app`).

---

## 7) Acceptance checklist (ship / audit gate)

- [ ] **Tokens only**—no raw neutrals, no `bg-white`/`bg-black`, no decorative border fences between major sections.
- [ ] Every vertical: **problem → artifacts → sprint → integration → fit → CTA** arc is complete.
- [ ] **No fabricated metrics** or unverified “ROI” claims.
- [ ] **AI maturity** language matches founder notes; **moratorium** language present where discussing experimentation responsibly.
- [ ] **Governance vs ethics** distinction present on foundation and governance pages without contradicting each other.
- [ ] **Routes** in copy match **`src/app/(site)/services/**` filesystem.
- [ ] **Metadata** unique per page; includes “artifacts / sprint / system” differentiator.
- [ ] **Accessibility**: heading order, icon `aria-hidden`, focusable CTAs, sufficient contrast on midnight.
- [ ] **Secondary CTAs** return readers to hub, pathways, or sibling modules—not a dead end.

---

## 8) Related numbered prompts (optional cross-reference)

- [`08-page-system-builds-hub.md`](./08-page-system-builds-hub.md) — hub static HTML / IA notes.
- [`09-page-foundation-layer-build.md`](./09-page-foundation-layer-build.md) — foundation HTML / SEO canon notes.
- Existing HTML verticals under `docs/html/` — reconcile with this spec and the React pages; prefer **one canonical depth** for governance story.

When this spec conflicts with an older doc, **prefer this spec + live `src/app` routes + April 2026 founder notes**, then file a small doc fix separately if needed.
