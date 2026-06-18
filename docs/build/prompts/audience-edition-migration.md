# Migrate audience edition pages — nonprofits & institutions

**Prompt ID:** audience-edition-migration  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Reference implementation:** churches edition (`/agent/churches`, completed 2026-06)  
**Source prototype:** parameterized HTML edition (churches / organizations / institutions)  
**Last updated:** 2026-06-18

Paste the block below into a fresh agent turn. Run **one audience per turn** (nonprofits first, then institutions) unless the user explicitly asks for both in one pass.

---

## The prompt

> You are migrating the **For [Audience] · Vol. 01** HTML edition onto the live Ink Band
> document route for **nonprofits** or **institutions**, using the churches edition as
> the completed reference. Churches is already live at `/agent/churches`; the prior
> long-form page is archived at `/agent/churches-old`.
>
> Your job: port the equivalent HTML edition for **one** audience, archive the current
> `AudiencePageExperience` page at `/agent/{slug}-old`, and wire the canonical route
> to the new edition experience — **without** breaking nonprofits/institutions that
> are not in scope for this turn.
>
> ### 0. Orient first (don't assume file paths)
>
> 1. Read the **churches reference implementation** end-to-end:
>    - `src/components/agent-room/audience/churches-edition/` — types, config, CSS,
>      components, experience composer
>    - `src/app/agent/churches/page.tsx` — thin server page
>    - `src/app/agent/churches-old/page.tsx` — archived prior page
>    - `src/components/agent-room/audience/churches-config-old.ts` — frozen old config
> 2. Read the **current target audience** long-form page:
>    - Nonprofits: `nonprofits-config.ts`, `letters/nonprofit-letter.md`,
>      `src/app/agent/nonprofits/page.tsx`
>    - Institutions: `institutions-config.ts`, `institutions/seminary-letter.md`,
>      `institutions/institutions-experience.tsx`, `src/app/agent/institutions/page.tsx`
> 3. Read design canon: `CLAUDE.md`, `docs/design/INK_BAND_DESIGN_CHAIN.md`
> 4. Read prototype notes: `docs/html/movemental-for-churches-edition.md`
> 5. Run `pnpm typecheck` before and after. This is **UI + static content only** — do
>    not touch the six-layer data chain unless explicitly required.
>
> ### 1. HTML edition — what is shared vs. audience-specific
>
> The HTML prototype is **one structural template** with parameterized copy. Everything
> except the opening claim and per-card framing nouns is shared across editions:
>
> | Edition | Lead claim (H1) | Card framing examples |
> | --- | --- | --- |
> | Churches | "AI is already inside your church" | study, pastoral care, pew, congregation |
> | Nonprofits / organizations | "AI is already inside your organization" | staff, donor records, board, beneficiaries |
> | Institutions | "AI is already inside your institution" | classroom, faculty, students, credential |
>
> **Section order (all editions — do not reorder):**
>
> ```text
> hero (lead claim + 6 evidence cards)
>   → the-path (4-stage order grid)
>   → stage-one (Safety + charter tabs)
>   → stage-four (layer stack + charter mini)
>   → why-a-platform (dark 4-slide carousel)
>   → the-limit (formation before deployment)
>   → start (CTAs + Ask AI)
>   → agent dock (DocumentPageShell — not inline HTML input)
> ```
>
> **Sidebar nav (7 items — same ids, same labels):**
>
> | id | label |
> | --- | --- |
> | `hero` | What's already true |
> | `the-path` | The path |
> | `stage-one` | Safety |
> | `stage-four` | The build |
> | `why-a-platform` | A fair question |
> | `the-limit` | The limit |
> | `start` | Start |
>
> **Path stage labels — use canonical naming from `PATH_STAGE_LABELS`:**
> Safety → Sandbox → **Training** → **Tech** (not HTML's "Skills" / "Solutions").
>
> **Layout — keep agent-room consistency:**
> - `DocumentPageShell` + `DocumentPageChrome` (sticky sidebar + mobile section nav)
> - Ink Band CSS variables only — no raw hex in TSX
> - Co-located CSS module; client components only where interaction is needed
>
> ### 2. Step-by-step migration (one audience)
>
> Complete these steps **in order** for either `nonprofits` or `institutions`.
>
> #### Step A — Save prototype + archive live page
>
> 1. Save the audience HTML SSOT under `docs/html/`:
>    - `movemental-for-nonprofits-edition.html` or
>    - `movemental-for-institutions-edition.html`
>    (If only a markdown summary exists, create one like
>    `docs/html/movemental-for-churches-edition.md`.)
> 2. Copy the live config to an `-old` file:
>    - `nonprofits-config.ts` → `nonprofits-config-old.ts` (export `NONPROFITS_PAGE_CONFIG_OLD`)
>    - `institutions-config.ts` → `institutions-config-old.ts` (export `INSTITUTIONS_PAGE_CONFIG_OLD`)
> 3. Add archive route `src/app/agent/{slug}-old/page.tsx`:
>    - Same as today's page (including letter markdown read from disk)
>    - Metadata: `robots: { index: false, follow: false }`
>    - Canonical still points at `/agent/{slug}`
> 4. Leave `/agent/{slug}/deck` unchanged — full deck remains available from `-old` and direct links.
>
> #### Step B — Generalize shared edition stack (first migration after churches only)
>
> If `churches-edition/` is still churches-specific, **refactor once** before adding
> the second audience:
>
> ```text
> src/components/agent-room/audience/audience-edition/
> ├── audience-edition-types.ts      # Rename ChurchesEditionConfig → AudienceEditionConfig
> ├── audience-edition.module.css    # Shared styles (from churches-edition.module.css)
> ├── audience-edition-experience.tsx
> ├── evidence-card-grid.tsx
> ├── path-order-grid.tsx
> ├── charter-tabs.tsx
> ├── solution-stack.tsx
> ├── platform-carousel.tsx
> └── reveal-on-scroll.tsx
> ```
>
> - Update `/agent/churches` to import from `audience-edition/` (re-export or thin wrapper ok).
> - Keep `churches-edition-config.ts` as audience data only, or move to
>   `audience-edition/config/churches-edition-config.ts`.
> - **Do not** duplicate the component stack per audience — only configs differ.
>
> If refactoring is out of scope for this turn, copy `churches-edition/` to
> `{slug}-edition/` and generalize in a follow-up. Prefer refactor when starting
> nonprofits.
>
> #### Step C — Author audience config
>
> Create `{slug}-edition-config.ts` exporting `{SLUG}_EDITION_CONFIG: AudienceEditionConfig`.
>
> Port copy from the HTML prototype. Use the **current** `{slug}-config.ts` pain cards,
> sources, deck copy, and letter themes as research — but the edition page **does not**
> include the letter, Sources dock, deeper-problem, foundation diagram, or build explorer.
>
> **Config checklist per section:**
>
> | Section | What to port |
> | --- | --- |
> | `mastVolume` | e.g. `For Nonprofits · Vol. 01` / `For Institutions · Vol. 01` |
> | `hero.leadClaim` | Audience-specific opening claim (see table §1) |
> | `hero.intro` | Swap church nouns → org/institution nouns |
> | `evidenceCards` (×6) | `where`, `num`, `accent`, `title`, `body`, `evidence.{bold,detail?,source}` — use `<details>` cites, not Sources dock |
> | `path.stages` | 4 stages; stage 01 links to `/agent/path/safety`, `isFirst: true` |
> | `safety` | Charter copy; swap "church" → "organization" / "institution"; reuse charter tab bodies from churches config (Vision–Response) with audience nouns |
> | `solutions.layers` | Foundation / Publishing / Formation / Relationships — audience-specific item labels (see churches config + `the-build-data.ts` for `{slug}` overlays) |
> | `platform` | Carousel question: "expensive church website" → "expensive nonprofit website" / "expensive seminary website" etc.; port 4 slides from `{slug}` deck intro or HTML |
> | `limit` | Formation-before-deployment copy; audience-tuned marginalia |
> | `start.ctas` | Primary mailto (audience-specific subject); secondary `/agent/path/safety` |
> | `dock` | Voice line + chips — drop "Read the board letter" scroll target |
>
> **Dock chips (template — tune voice line per audience):**
>
> ```ts
> chips: [
>   { label: "Map where we stand", action: "scene", scene: "toBeat" },
>   { label: "What's the first step?", action: "scene", scene: "toSafetyFlow" },
>   { label: "See the path", action: "scroll", target: "the-path" },
>   { label: "Talk to us", action: "scene", scene: "talkToUs" },
> ]
> ```
>
> **Citations:** Inline strings in config are fine. Optionally note `SourceId`s from
> `src/lib/citations/sources.ts` in comments for future catalog wiring — no schema changes.
>
> #### Step D — Wire canonical route
>
> Update `src/app/agent/{slug}/page.tsx`:
>
> ```tsx
> import { AudienceEditionExperience } from "@/components/agent-room/audience/audience-edition/audience-edition-experience";
> import { NONPROFITS_EDITION_CONFIG } from "@/components/agent-room/audience/audience-edition/nonprofits-edition-config";
>
> export default function NonprofitsPage() {
>   return <AudienceEditionExperience config={NONPROFITS_EDITION_CONFIG} />;
> }
> ```
>
> - Remove `readFileSync` letter loading from the canonical page (letter stays on `-old`).
> - Update page `metadata.description` to match the new arc (no letter/deeper-problem).
> - Institutions: replace `InstitutionsExperience` wrapper on canonical route; keep wrapper
>   on `-old` if convenient.
>
> #### Step E — Ask AI + cross-links
>
> 1. Update `{slug}Start` in `src/lib/agent-room/ask-ai/prompts.ts` to reflect the edition
>    arc (six evidence truths, ordered path, no letter on canonical page).
> 2. Leave `{slug}TheCase` in the catalog — still used from `-old` / letter downloads.
> 3. Verify `src/lib/agent-room/ways-in-doors.ts` segment copy still fits.
> 4. Fix any stale links (`/churches` → `/agent/churches`, etc.) if touched.
>
> #### Step F — Verify
>
> ```bash
> pnpm typecheck
> pnpm test:run tests/unit/ask-ai.test.ts
> ```
>
> **Manual browser checklist:**
>
> - [ ] `/agent/{slug}` — all 7 sidebar anchors scroll; mobile section menu works
> - [ ] Evidence card `<details>` open/close; charter tabs keyboard-nav
> - [ ] Carousel dots/arrows cycle 4 slides; `prefers-reduced-motion` skips fade
> - [ ] Safety step links to `/agent/path/safety`; dock chips hand off to `/agent` scenes
> - [ ] No raw hex in edition CSS module — Ink Band tokens only
> - [ ] `/agent/{slug}-old` renders prior page intact (letter, deck embed, build explorer)
> - [ ] `/agent/{slug}/deck` still loads standalone deck
> - [ ] Churches (if refactored) still passes the same checklist
>
> ### 3. What to remove from canonical page (same as churches)
>
> | Removed | Replaced by |
> | --- | --- |
> | Rhetorical hero + charter-five strip | Single H1 lead claim |
> | Sources dock + superscript cites | Per-card `<details>` evidence |
> | `#deeper-problem`, `#the-case` (letter) | Omitted on canonical route |
> | `#what-we-build`, `FoundationDiagram` | Omitted |
> | `#the-build` / `TheBuildExplorer` | `#stage-four` static layer stack |
> | `DeckSection` (full deck) | `#why-a-platform` 4-slide carousel |
> | `#formation` section | Merged into `#the-limit` |
>
> ### 4. Nonprofits-specific notes
>
> - **Lead claim:** "AI is already inside your organization"
> - **Evidence cards:** Draw from `nonprofits-config.ts` pain cards + verified sources;
>   reframe `where` labels for nonprofit context (donor data, board, program staff, etc.)
> - **Platform carousel:** Port from `nonprofit-deck.ts` opening slides or HTML —
>   "Isn't this just an expensive nonprofit website?"
> - **Layer stack items:** See `the-build-data.ts` → `nonprofits` demo paths
>   (`https://nonprofits.movemental.ai`, `/impact`, `/learn`, `/app/donors`)
> - **Start mailto:** match existing `nonprofits-config.ts` `start.mailtoHref` subject line
> - **Archive route:** `/agent/nonprofits-old`
>
> ### 5. Institutions-specific notes
>
> - **Lead claim:** "AI is already inside your institution" (HTML uses "institution";
>   live config says "seminary" in places — use institution for the edition H1 unless
>   product directs otherwise)
> - **Evidence cards:** Draw from `institutions-config.ts` (students, faculty rules,
>   accreditation, formation stakes)
> - **Platform carousel:** Port from `institution-deck.ts` —
>   "Isn't this just an expensive seminary website?" (or institution wording from HTML)
> - **Layer stack items:** See `the-build-data.ts` → `institutions` overlays
>   (`https://seminary.movemental.ai`, `/library`, `/scholarship`, etc.)
> - **Safety copy:** "seminary" / "institution" / "board" nouns — consistent with
>   `seminary-letter.md` tone
> - **Start mailto:** match existing `institutions-config.ts` `start.mailtoHref`
> - **Archive route:** `/agent/institutions-old`
> - **Wrapper:** Today `InstitutionsExperience` is a thin pass-through — canonical page
>   can import `AudienceEditionExperience` directly; keep wrapper only on `-old` if useful
>
> ### 6. CSS and components — do not re-port from scratch
>
> Reuse the churches edition CSS module and components. Only add new CSS if the HTML
> prototype introduces a **new** pattern not already in:
>
> - `audience-edition.module.css` (or `churches-edition.module.css` pre-refactor)
>
> Required patterns (already implemented for churches):
>
> | Pattern | Component |
> | --- | --- |
> | Red margin rule `.sheet` | experience root |
> | Evidence cards + accent rail | `EvidenceCardGrid` |
> | Path order + ink underline on Safety | `PathOrderGrid` |
> | Charter tabs Vision–Response | `CharterTabs` |
> | Layer stack + sticky charter mini | `SolutionStack` |
> | Dark carousel | `PlatformCarousel` |
> | Scroll reveal | `RevealOnScroll` |
> | SVG rough underline | uses global `#rough` filter from `InkFilters` in agent layout |
>
> ### 7. Recommended execution order
>
> 1. **Nonprofits** — refactor `churches-edition/` → shared `audience-edition/` if not done
> 2. **Nonprofits** — config + route + archive + verify
> 3. **Institutions** — config + route + archive + verify (shared stack only)
>
> Do **not** migrate both audiences in one diff unless the shared refactor is complete
> and both configs are ready — keeps review and rollback clean.
>
> ### 8. Out of scope (unless user asks)
>
> - Changing `AudiencePageExperience` for churches-old / nonprofits-old / institutions-old
> - Removing `/agent/{slug}/deck` or merging full deck back into canonical page
> - Adding letter download to canonical edition Start section
> - Renaming `PATH_STAGE_LABELS` globally
> - Marketing route aliases in `next.config.ts` (optional follow-up)
> - Six-layer schema / citation catalog wiring

---

## Completion report template

When done, report:

1. **Routes:** canonical, `-old`, deck URLs
2. **Files added/changed** (config, archive, shared refactor if any)
3. **Copy sources** (HTML prototype vs. adapted from old config)
4. **Verification:** typecheck + ask-ai tests + manual checklist status
5. **Follow-ups:** institutions remaining, shared refactor debt, stale links found
