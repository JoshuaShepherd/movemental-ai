# Three-pass page audit with fixes

Run three audit skills in order on a single page and apply fixes inline. This is how narrative, cross-site, and visual storytelling get checked together — with one typecheck between each pass so fixes don't pile up silently.

**Scope:** any Movemental page (home, audience, article, system, walkthrough, assessment, etc.). Some patterns below are page-type-specific — they apply when the page matches, otherwise skip.

**Not in scope:** voice-level editing (use `alan-voice` after), full feature rebuilds, net-new components.

---

## 0 · Inputs

Fill these in before starting:

- **Route:** `/<path>` (e.g. `/churches`)
- **Source:** `src/app/(site)/<route>/page.tsx` + `src/components/sections/<domain>/*`
- **Page type:** homepage | audience | article | system | walkthrough | faq | field-guide | assessment (determines which rubrics apply)

---

## 1 · Run the three skills — in this order

Each skill has its own ground truth and output template. Invoke via the Skill tool:

1. **`movemental-narrative-audit`** — strategic / editorial alignment against two-intelligences, six stages, canonical artifacts (library / graph / voice / pathways), audience playbook.
2. **`movemental-page-auditor`** — six-pass audit: sequencing, copy, typography, UI, proof burden, cross-site role. Stricter than (1) on links, dead code, and proof.
3. **`visual-storytelling-audit`** — tonal band rhythm, emphasis discipline, section rhythm, token compliance, responsive fidelity.

**Do not run them in parallel.** Each pass changes the file; later passes need to judge the current state. Order matters: narrative first so the argument is right, then page auditor so cross-site ownership is clean, then visual so the fixes have stable copy to style against.

---

## 2 · Apply fixes after each pass

After each skill returns its audit, apply the **must-fix** and **should-improve** items via `Edit` — don't batch. Then:

```bash
pnpm typecheck
```

If it fails, resolve before moving to the next skill. If it passes, move on.

**Maximum 10 priority fixes per pass.** Drop the bottom ones if the list is long.

---

## 3 · Method — how fixes get applied (learned patterns)

These are the fix patterns that repeat across pages. Not all apply to every page — use judgment based on page type.

### 3.1 Verify before you link

Before adding any link-out, confirm the target route exists:

- App routes — check `src/app/(site)/<route>/page.tsx` exists via `Bash ls` or `Glob`.
- Articles — `Grep` the slug in `src/lib/articles.ts`.
- Book chapters — `Grep` the slug in `src/lib/book-types.ts`.

Recommending a link to a route that doesn't exist ships a dead click. "Memory says it exists" ≠ "exists now."

### 3.2 Canonical ownership — audience pages in particular

Audience pages (`/churches`, `/nonprofits`, `/institutions`) **must** link to:

- `/fragmentation` — walkthrough surface
- `/book/read/two-intelligences` — canonical definition
- `/articles/playbook-<audience>` — the domain playbook

And **must not** re-open:

- Full two-intelligences definition (name them in one sentence + link; don't redefine)
- Full six-stage walkthrough (name them in compressed form + link to `/fragmentation`)

Homepage, `/book`, `/fragmentation` own those arguments. Everyone else cites.

### 3.3 AI Stewardship Sequence path reframe

If the page uses `AudiencePathSection` (or equivalent) labeled "The path" with the AI Stewardship Sequence (Safety, Sandbox, Skills, Solutions), **this displaces the canonical six-stage model.** Fix:

- Relabel to **"The discipline of integration"** (or similar framing that locates the AI Stewardship Sequence *inside* the integration stage)
- Update lede to name the six-stage trajectory and link to `/fragmentation`
- Update coda to carry the stall insight: *"The stall usually looks like activity — new documents/programs/platforms. None of it changes the foundation layer."* (paraphrased from the playbook)

The AI Stewardship Sequence is a discipline within integration, not a replacement trajectory.

### 3.4 Two-intelligences vocabulary test

If the page describes fragmentation symptoms that cleanly split into informational (content, knowledge, memory, curricula) and relational (people, donors, staff, board, congregation), but never names the pair — add the naming:

```tsx
Every <audience> runs on{" "}
<Link href="/book/read/two-intelligences" className="underline decoration-border decoration-1 underline-offset-4 hover:decoration-foreground">
  two intelligences
</Link>
: the <strong>informational</strong> (…concrete examples…) and the <strong>relational</strong> (…concrete examples…).
```

One sentence. Link. Don't redefine.

### 3.5 Dead data files

Many audience pages have `<audience>-data.ts` companion files left over from earlier scaffolding (e.g. `systemBuildCards`, `fragmentedItems`, `movementalItems`, `outputBlocks`, `startHereCards`, `typicalPaths`). Check:

```text
Grep for the export name across src/
```

If nothing imports it, **delete the file.** Don't keep dead code — it signals drift and misleads future agents into thinking there's more structure than there is.

### 3.6 CTA retarget

In the final invitation section, the typical pattern is **primary (contact) + secondary (`/fragmentation`) + tertiary (playbook article)**. If the existing CTAs are:

- Two CTAs both pointing to `/contact` → dedupe; make one `/fragmentation`.
- "Read the full playbook" → `/articles` → retarget to `/articles/playbook-<audience>`.

### 3.7 Proof burden — soften strong claims

Flag claims like:

- "Six to nine months creates real traction" → *"…is a realistic window to prove the foundation."*
- Specific percentage lifts or retention numbers without on-page citation → soften to positioning.
- "We are the leading…" / "trusted by industry leaders" → remove or soften.

L2b inline citations are the target; positioning language is the fallback.

### 3.8 SerifEm emphasis discipline

Movemental's serif italic (`AudienceSerifEm`) is a precision instrument. If it appears in 8+ headlines on one page, it's become decoration. **Target ≤ 5 uses per page.**

Keep on load-bearing headlines: the tension moment, the reframe, the pivot, the moral weight. Remove from decorative flourishes ("in practice", "possible", "you are", "heaviest").

### 3.9 Tonal band rhythm

Check the `variant` on every `Section` / audience-concept component top-to-bottom. Patterns to fix:

- **Two consecutive `default` bands** → flip one to `section` unless one is visually distinct (a numbered rail vs prose is forgivable; two prose sections same variant is not).
- **Two consecutive `section` bands** → same — flip one.
- **No `midnight` band anywhere** → flag but don't auto-add; midnight needs content judgment (e.g. theological reflection, high-confidence proof moment).

Expected pattern for most pages: `default → section → default → section → …` with the occasional `midnight` for a culmination or regional contrast.

### 3.10 Gestural phrases to cut on sight

These paraphrase without adding information — delete them:

- "a narrow way forward"
- "Move too fast, and… Move too slow, and…" when it restates the errors band
- "in today's evolving landscape" / "in this moment" standalone
- "We work at the intersection of…" when not quantified

If removing the sentence leaves the paragraph intact, the sentence was decoration.

---

## 4 · Output expectations

After all three passes:

- All three audit reports should be visible in the conversation (the skills return structured markdown).
- Every fix applied should pass `pnpm typecheck`.
- A final cross-audit summary: how many fixes per pass, token compliance, what was flagged-only (not fixed).
- One or two items **flagged only** is acceptable — typically midnight-band additions or content judgment calls that need the user's input.

---

## 5 · What not to do

- **Don't parallelize the skills.** Each depends on the previous pass's fixes being live.
- **Don't add new primitives or components** just to fulfill a recommendation. Work with existing audience-concept / primitives.
- **Don't copy-paste fixes between pages.** Even if nonprofits and churches share structure, their copy and audience artifacts differ.
- **Don't skip typecheck between passes.** A broken build after pass 2 is much harder to diagnose than a broken build caught immediately.
- **Don't re-teach canonical doctrine** on a page that doesn't own it — name and link instead.

---

## 6 · Page inventory

All existing React pages under `src/app/(site)/`. ~~Strikethrough~~ = already audited with this three-pass method. Archived routes (`return null` + `next.config.ts` redirect) are excluded from the auditable list.

### Audience pages (highest-priority narrative surface)

- [x] ~~[/organizations](src/app/(site)/organizations/page.tsx) — hub~~
- [x] ~~[/movement-leaders](src/app/(site)/movement-leaders/page.tsx)~~
- [x] ~~[/nonprofits](src/app/(site)/nonprofits/page.tsx)~~
- [x] ~~[/churches](src/app/(site)/churches/page.tsx)~~
- [x] ~~[/institutions](src/app/(site)/institutions/page.tsx)~~

### Thesis / fragmentation / book

- [ ] [/](src/app/(site)/page.tsx) — home
- [ ] [/fragmentation](src/app/(site)/fragmentation/page.tsx)
- [ ] [/book](src/app/(site)/book/page.tsx) — landing
- [ ] [/book/read/[slug]](src/app/(site)/book/read/[slug]/page.tsx) — reader (audit as a template + 1–2 representative chapters)
- [ ] [/book/contributors](src/app/(site)/book/contributors/page.tsx)
- [ ] [/book/endorse](src/app/(site)/book/endorse/page.tsx)
- [ ] [/book/moderate](src/app/(site)/book/moderate/page.tsx)

### Articles

- [ ] [/articles](src/app/(site)/articles/page.tsx) — hub
- [ ] [/articles/[slug]](src/app/(site)/articles/[slug]/page.tsx) — reader template (use `article-audit` skill for single-article depth)
- [ ] [/articles/archive](src/app/(site)/articles/archive/page.tsx)

### Assessments

- [ ] [/assess](src/app/(site)/assess/page.tsx) — operational readiness
- [ ] [/assess/formation](src/app/(site)/assess/formation/page.tsx)
- [ ] [/assessment-new](src/app/(site)/assessment-new/page.tsx) — dual-intelligence infrastructure

### System / artifacts

- [ ] [/system/intel-artifacts](src/app/(site)/system/intel-artifacts/page.tsx) — (note: `/system` itself is archived and redirects to `/fragmentation`)

### Orientation / contact / misc

- [ ] [/about](src/app/(site)/about/page.tsx)
- [ ] [/team](src/app/(site)/team/page.tsx)
- [ ] [/contact](src/app/(site)/contact/page.tsx)
- [ ] [/blog](src/app/(site)/blog/page.tsx)
- [ ] [/faq](src/app/(site)/faq/page.tsx)
- [ ] [/newsletter/confirmed](src/app/(site)/newsletter/confirmed/page.tsx) — utility / low-priority

### Legal (tone consistency + link integrity only; skip full audit)

- [ ] [/cookies](src/app/(site)/cookies/page.tsx)
- [ ] [/privacy](src/app/(site)/privacy/page.tsx)
- [ ] [/terms](src/app/(site)/terms/page.tsx)

### Archived — do **not** audit (render `null`, redirect via `next.config.ts`)

- `/platform` → `/fragmentation`
- `/system` → `/fragmentation`
- `/knowledge-ecosystem` → (redirect in config)
- `/movemental-at-100` → (redirect in config)
- `/services` (and all subpaths) → `/contact`
- `/services/discovery-lab`, `/services/organizational-systems`, `/services/system-builds`
- `/who-is-a-movement-leader` → `/movement-leaders`
- `/evidence`, `/case-studies`, `/pricing`, `/manifesto`, `/how-it-works`, `/system-builds`, `/apply`, `/inquiry` — redirects without `page.tsx` shells

---

## 7 · Related prompts & skills

- `audience-pages-narrative-audit.md` — deeper audience-specific narrative audit (read alongside if the target is an audience page)
- `home-page-narrative-credibility-ia-plan.md` — if auditing the homepage
- `strategy-artifacts-placement-and-flow.md` — canonical ownership reference
- `alan-voice` skill — voice-level pass after the three audits finish
- `design-audit` / `page-audit` skills — single-pass alternatives when the full three-pass is overkill
