# Movemental.ai — Site Audit (Live + Source)

**Date:** 2026-06-17  
**Scope:** Read-only reconciliation of `movemental-ai` (site + agent room UI) and `movemental-ai-agents` (engine) against the live preview at `https://www.movemental.ai` (apex `movemental.ai` → www).  
**Method:** Source enumeration + HTTP probes (status, redirects, SSR HTML). Browser automation was unavailable in the audit environment (Chrome not installed; Cursor browser MCP not connected); hydrated agent-room behavior is documented from source + SSR fallback + partial live HTML. **No forms were submitted. No sign-in performed.**

---

## 1. Executive summary

Movemental.ai is an **experimental, agent-first preview**: root `/` and many legacy URLs funnel to **`/agent`**, a full-screen **Ink Band** concierge room (paper `#fbfaf6`, Playfair display, ink-blue `#22409B`, Caveat voice line). Long-form **document surfaces** live under `/agent/*` (audience pages, about, movement-voices, how-we-use-ai, decks). Utility flows (`/assess`, `/enroll`, `/field-guide`, `/footnotes`, `/research`) sit outside the room shell but share Ink-mapped tokens.

A site-wide **announcement bar** states the preview is not final and not for public distribution. Despite that, **`robots.txt` allows indexing**, the **sitemap lists public routes**, and there is **no `noindex`** on `/agent` or document pages — a preview-hygiene gap.

**Top findings (priority order):**

1. **Stage naming split:** Agent front door and path canon use **Safety · Sandbox · Training · Technology** (stage 04 often shortened **Tech**). Research articles, field-guide canon, and `/research` use **Safety · Sandbox · Skills · Solutions**. `src/lib/ai-reality/stage-mapper.ts` bridges the two internally; public copy is not unified.
2. **Legacy redirect drift (live vs source):** `next.config.ts` redirects `/pricing`, `/faq`, `/evidence`, `/case-studies`, `/movement-leaders`, etc. to `/agent` or `/enroll`, but **live probes returned 404** for several of these — deployment may lag source or redirects are not applied at the edge.
3. **Preview indexability:** Unreleased preview is **crawlable/indexable** (robots allow, sitemap published, no meta robots block on main surfaces).
4. **Legal gap:** `/terms`, `/privacy`, `/cookies` — **404 live**, no routes in source.
5. **Voices URL gap:** Source defines **`/voices`** hub (`src/lib/committed-voices.ts`); **404 live**. Canonical public surface is **`/agent/movement-voices`** (live 200); `/movement-voices` and `/scenius` redirect there.
6. **Pricing placeholders:** Training and Technology **free tiers** show bracketed placeholders in source (`[Free entry point to confirm]`); paid tiers are specified. Access-mechanism copy exists in prose (“If the price isn't walkable…”) but is not a separate bracketed section.

---

## 2. Methodology

| Layer | What was done |
|--------|----------------|
| **Source** | All `src/app/**/page.tsx` routes; agent `ScreenId`, scenes, regex routes, chips; nav/footer chrome; engine seed (`movemental-ai-agents/scripts/seed-agent-room.ts`); redirects in `next.config.ts`. |
| **Live** | `curl -sI` for status/redirect chain; `curl -sL` for SSR HTML, meta, and visible copy signals. Canonical host: **www** (apex 307 → www). |
| **Not done** | Full hydrated agent turn walk (engine stream), form submission, login, screenshot theme audit per pixel. |

---

## 3. Full surface inventory (source vs live)

**Legend:** ✅ live 200 · ↪ redirect · ❌ 404 · 🔒 auth-gated · 📄 source-only (agent screen, no URL)

### 3.1 Front door & agent room

| Surface | Type | Source path | Live status | Notes |
|---------|------|-------------|-------------|-------|
| Root | redirect | `src/app/page.tsx` → `/agent` | ↪ 307 → `/agent` | |
| Agent room home | agent screen + URL | `/agent` | ✅ 200 | SSR includes `AgentRoomFallback`; hydrates to stream/stub room |
| Agent about | document | `/agent/about` | ✅ 200 | |
| Agent nonprofits | document | `/agent/nonprofits` | ✅ 200 | |
| Agent churches | document | `/agent/churches` | ✅ 200 | |
| Agent institutions | document | `/agent/institutions` | ✅ 200 | |
| Agent how-we-use-ai | document | `/agent/how-we-use-ai` | ✅ 200 | |
| Agent movement-voices | document | `/agent/movement-voices` | ✅ 200 | Public “Trusted voices” / scenius surface |
| Nonprofit deck | deck | `/agent/nonprofits/deck` | ✅ 200 | |
| Church deck | deck | `/agent/churches/deck` | ✅ 200 | |
| Institution deck | deck | `/agent/institutions/deck` | ✅ 200 | |
| Agent assessment alias | redirect | `/agent/assessment` → `/assess` | ↪ 307 → `/assess` | `robots: noindex` in source |
| Agent invite alias | redirect | `/agent/invite` → `/assess` | ↪ 307 → `/assess` | `robots: noindex` in source |

### 3.2 Agent screens (`ScreenId` — closed set)

From `src/lib/agent-room/acts.ts` + `stub-screen.tsx`:

| ScreenId | Component | Reachable via |
|----------|-----------|---------------|
| `home` | HomeScreen | Default opening scene |
| `beat` | BeatScreen | Chips / regex / safety flow |
| `readback` | ReadbackScreen | After beat completes (local or diagnostician handoff) |
| `safety` | SafetyScreen | `toSafety` scene |
| `confirm` | ConfirmScreen | Post-capture |
| `path` | PathScreen | `toPath` scene |
| `founders` | FoundersScreen | `whoBehind` scene |
| `leader` | LeaderScreen | Leader band tap |
| `about` | AboutScreen | `whatIs` scene |
| `contact` | ContactScreen | `talkToUs` scene |
| `pricing` | PricingScreen | `cost` scene |
| `faq` | FaqScreen | `toFaq` scene |
| `capture` | CaptureScreen | `withUs`, `toDiscuss`, map gate, etc. |
| `safetyDashboard` | SafetyDashboardScreen | Funnel stub |
| `sandbox` | SandboxScreen | `toSandbox` scene |
| `training` | TrainingScreen | `toTraining` scene |
| `technology` | TechnologyScreen | `toTechnology` scene |
| `safetyFlow` | SafetyFlowScreen | `toSafetyFlow*` scenes |

**Engine-extra components** (no `ScreenId`; rendered directly per `screen-map.ts`): `network`, `audience`, `handoff_human`.

### 3.3 Local scenes (`SCENES` in `src/lib/agent-room/data/scenes.ts`)

Static scene keys the stub runner can `run()`:

`opening`, `whatIs`, `cost`, `toFaq`, `whoBehind`, `talkToUs`, `leaderConnect`, `beatIntro`, `toBeat`, `toBeatCold`, `toSafetyFlow`, `toSafetyFlowDiy`, `toSafetyFlowSignup`, `toPath`, `toSandbox`, `toTraining`, `toTechnology`, `toSafety`, `whySafetyFirst`, `safetyWithoutIt`, `charter`, `involved`, `withUs`, `focusHandbook`, `onOwn`, `toSafetyDashboard`, `toDiscuss`, `discussOffer`

(Leader-aware scenes are wired in AF-10 extensions.)

### 3.4 Regex routes (`src/lib/agent-room/route-input.ts`)

Ordered first-match table → scene:

| Pattern intent | Target scene |
|----------------|--------------|
| path / how work | `toPath` |
| sandbox / exploration | `toSandbox` |
| training / formation | `toTraining` |
| technology / solutions / deployment | `toTechnology` |
| safety / charter | `toSafety` |
| cost / price | `cost` |
| faq / philosophy | `toFaq` |
| contact / talk | `talkToUs` |
| who / founders | `whoBehind` |
| about movemental | `whatIs` |
| start / assess / help (broad) | `toSafetyFlow` |

Fallback: spoken refusal (`CONCIERGE_VOICE.refusal`).

### 3.5 Default composer chips

From `src/components/agent-room/composer.tsx` + `composer-routing.ts`:

| Chip | Stream routing |
|------|----------------|
| **Get a clear next AI step** (lead) | **Local** → `toSafetyFlow` |
| About Movemental | **Engine** utterance |
| What does it cost? | **Engine** utterance |
| Get in touch | **Engine** utterance |

Ways-in panel (`ways-in-doors.ts`): lead door **“Map where we actually stand”**; audience segments Non-profits / Churches / Institutions / Just exploring with curated door copy.

### 3.6 Utility & operational routes

| Surface | Type | Source | Live |
|---------|------|--------|------|
| Assess (magic link) | utility | `/assess` | ✅ 200 |
| Enroll (paid Safety) | utility | `/enroll` | ✅ 200 |
| Field guide | utility | `/field-guide`, `?guide=sandbox` | ✅ 200 |
| Footnotes | reference | `/footnotes` | ✅ 200 |
| Research hub | content | `/research`, `/research/[slug]`, sources, findings | ✅ 200 |
| Founder profiles | document | `/about/[slug]` | ✅ (alan-hirsch, brad-brisco, josh-shepherd) |
| Login / signup / auth | auth | `/login`, `/signup`, `/forgot-password`, `/auth/update-password` | ✅ (not audited in depth) |
| Welcome | auth | `/welcome` | 🔒 redirect login; `noindex` |
| Dashboard | app | `/dashboard/*` | 🔒 login; `noindex` |
| Program | app | `/program` | 🔒 login; `noindex` |
| Agent runtime studio | studio | `/(studio)/agent-runtime` | 🔒; layout `noindex` |
| Newsletter | transactional | `/newsletter/confirmed`, `unsubscribed` | ✅ |
| Share / team-invite tokens | private | `/share/ai-reality/[token]`, `/team-invite/[token]` | token-gated; `noindex` |

### 3.7 Legacy marketing aliases (page-level redirects)

These **page.tsx** files `permanentRedirect` to `/agent/*`:

`/about` → `/agent/about` · `/churches` → `/agent/churches` · `/nonprofits` → `/agent/nonprofits` · `/institutions` → `/agent/institutions` · `/how-we-use-ai` → `/agent/how-we-use-ai` · `/movement-voices` → `/agent/movement-voices` · `/scenius` → `/agent/movement-voices`

**Live:** all probed aliases returned **308** to canonical `/agent/*` ✅

### 3.8 Legacy marketing (`next.config.ts` redirects) — source vs live

| Path | Source destination | Live probe |
|------|-------------------|------------|
| `/pricing` | `/enroll` | ❌ **404** (source says redirect) |
| `/faq` | `/agent` | ❌ **404** |
| `/evidence` | `/agent` | ❌ **404** |
| `/case-studies` | `/agent` | ❌ **404** |
| `/movement-leaders` | `/agent` | ❌ **404** |
| `/library` | (no route in source) | ❌ **404** |
| `/voices` | (hub in `committed-voices.ts`, no page) | ❌ **404** |
| `/contact` | `/agent` | not probed (expect redirect in source) |
| `/pathway/*`, `/field-guides/*`, `/blog`, `/book` | `/field-guide` or agent | partial — `/field-guide` ✅ 200 |

**Finding:** Several config redirects appear **not active on production** (404 instead of 308). Page-level redirects for audience pages **do** work.

### 3.9 Canonical host

- `https://movemental.ai/` → **307** → `https://www.movemental.ai/`
- `metadataBase` / sitemap host: `https://movemental.ai` (non-www in `robots.ts` Host line)
- Agent metadata canonical: `/agent` (relative)

---

## 4. Navigation & chrome

### 4.1 Agent room mast (`mast.tsx` + `mast-audience-nav.tsx`)

- **Logo** → home (`onHome` in room, `homeHref="/agent"` on documents)
- **Center nav:** Non-profits · Churches · Institutions → `/agent/nonprofits`, `/agent/churches`, `/agent/institutions`
- **End:** MastAuth (sign-in; not exercised)

No global footer in agent room; document pages use **sidebar “On this page”** (`document-page-chrome.tsx`).

### 4.2 Utility pages (`utility-page-nav.tsx`)

Footer links: Back to agent room · Field guide · `mailto:josh@movemental.ai`

### 4.3 Announcement bar (all surfaces)

Live SSR confirms:

- Label: **Experimental preview**
- Short: early-stage mock-up; movement-leader content under revision; **not yet distributed or shared publicly**
- Expand: contact josh@movemental.ai; content will be vetted by movement leaders before publication

---

## 5. Engine inventory (`movemental-ai-agents`)

Seeded agents (`scripts/seed-agent-room.ts`):

| Slug | Name | Model | Role |
|------|------|-------|------|
| `room-host` | Movemental Concierge | `claude-opus-4-6` | Front-of-house; beat, path, pricing, safety flow, network, audience, founders, capture, gestures, chips; handoff to diagnostician |
| `room-diagnostician` | Agent Room Diagnostician | `claude-opus-4-6` | Read-back synthesis via handoff only |

**Render tools (host):** `render_beat`, `show_path`, `show_pricing`, `show_safety_flow`, `show_network`, `show_audience`, `show_founders`, `offer_human_handoff`, `request_diagnosis`, `gesture_at`, `suggest_chips`, `show_capture`, optional `file_search` (if `OPENAI_VECTOR_STORE_ID` set).

**Render tools (diagnostician):** `show_readback`, `offer_human_handoff`.

**Note:** Seed comment on `show_path` still says “04 **Solutions**” while UI canon is Technology/Tech.

---

## 6. Copy appendix

### 6.1 Agent home (`home-screen.tsx` / SSR fallback)

| Element | Copy |
|---------|------|
| **Headline** | Navigate AI without eroding the trust you spent decades earning. |
| **Body** | We help mission-driven organizations respond to AI without losing **the trust their work depends on**, through one ordered path: get safe, experiment, form your people, then build. |
| **Backers (fallback)** | Built with and backed by movement leaders including Alan Hirsch, Brad Brisco, JR Woodward, Dave Ferguson, Josh Shepherd, and others in the network. |
| **Path (fallback)** | Safety, then Sandbox, then Training, then Technology. |
| **Path steps** | 01 · Safety — decide what's wise… · 02 · Sandbox — try AI against real work… · 03 · Training — form the people… · 04 · Technology — build what your work needs… |
| **Contact (fallback)** | josh@movemental.ai |
| **Theme** | Ink Band: bg `#fbfaf6`, Playfair headings, Inter body, IBM Plex Mono labels, ink-blue accent; Caveat on voice line |

### 6.2 Default chips & opening voice

- Chips: see §3.5
- Opening scene voice (`scenes.ts`): `CONCIERGE_VOICE.openingGreeting` after home show

### 6.3 Path screen (`path-screen.tsx`)

- Eyebrow: **The path**
- Lead: One ordered path. It starts with **Safety**.
- Stages: **Safety**, **Sandbox**, **Training**, **Tech** (via `PATH_STAGE_LABELS.tech`)

### 6.4 Pricing (`pricing.ts` + live agent screen)

| Stage | Free | Paid |
|-------|------|------|
| Safety | Free · about 1 to 2 months; handbook *It Starts With Safety* | **$1,000 · two weeks** |
| Sandbox | Free · self-paced; *It Continues With Exploration* | **$15,000 · four to six weeks** |
| Training | **[Free entry point to confirm]** (placeholder) | **$15,000 + $5,000 per year** |
| Technology / Tech | **[Free entry point to confirm]** (placeholder) | **From $30,000 · scoped** |

Refusals: no negotiation, no hidden tiers, no per-seat, no urgency, no logo-only network pay.

Access prose (not bracketed): “If the price isn't walkable… write to us before you rule anything out.”

Terms: 50% begin / 50% completion, Net 15.

### 6.5 Audience document — nonprofits (live SSR)

| Element | Copy |
|---------|------|
| Eyebrow | A NOTE TO NONPROFIT LEADERS |
| Headline | Are you called to **lead** in response to AI? |
| Pain cards | Mix of **Sourced** stats and **“A pattern leaders recognize”** (synthetic scenes) |
| Sources note | Two of the six points… patterns… never dressed up as survey numbers |
| Deeper | These aren't six problems. They're one. |
| Deck slide (example) | Isn't this just an expensive website? |

Churches and institutions configs follow the same pattern (`churches-config.ts`, `institutions-config.ts`).

### 6.6 `/assess`

| Element | Copy |
|---------|------|
| Label | Free · Map your AI reality |
| Headline | Find out the truth about AI in your organization. |
| Body | Short reality check; magic link into the room |
| Form | Email only (not submitted in audit) |

Does **not** mention “five” or “six dimensions” on this page. Agent beat uses **4 MAP_Q questions** (`map-q.ts`). Separate **Integrity Diagnostic** API uses **6 dimensions / 22 answers** (`src/lib/integrity-diagnostic/questions.ts`, `POST /api/assess`).

### 6.7 `/enroll`

| Element | Copy |
|---------|------|
| Headline | Get started with the dashboard. |
| Price signal | **$1,000** / Stripe |
| Fields (recorded, not submitted) | org_name, contact_name, email, org_type, team_size, timeline, budget_range, message |

### 6.8 `/field-guide`

- Default: Safety field guide — **It Starts With Safety**
- `?guide=sandbox`: Sandbox guide
- Stage naming in PDF/meta: Safety-focused; sandbox is exploration — does not use Skills/Solutions on page chrome

### 6.9 `/research` (live HTML)

Uses **Safety · Sandbox · Skills · Solutions** framing in article bodies (not Training · Technology).

---

## 7. Agent behavior (flows — source; forms not submitted)

### 7.1 Default chip: “Get a clear next AI step”

1. **Local** `toSafetyFlow` → `safetyFlow` step `question`
2. Voice: one question, then show where you stand
3. Options → result / charter / fork (DIY vs dashboard signup)
4. **Dashboard signup** → `capture` kind `paid` or enroll path — **fields recorded in §7.4**

### 7.2 “Map where we actually stand” (ways-in lead)

- From cold home: may route via `beatIntro` (chip) → `toBeat` vs direct `toBeat`
- **Beat screen:** MAP_Q questions (Safety gate Q1, then up to 3 more)
- On completion: local readback or **engine handoff** → `room-diagnostician` → `show_readback`
- Optional **capture** kind `map`: email + optional first name — **not submitted**

### 7.3 Engine vs local (stream mode)

| Visitor action | Typical handling |
|----------------|------------------|
| Lead chip “Get a clear next AI step” | **Local** safety flow |
| About / cost / contact chips | **Engine** (Concierge) |
| Typed regex match | **Local** scene (stub) or hybrid high-confidence route |
| Beat answers | **Engine** `render_beat` + handoff |
| Readback | **Engine** diagnostician |
| Meta/objection text | **Discuss offer** → optional `capture` discuss |

### 7.4 Capture form fields (`capture.ts`) — DO NOT SUBMIT

| Kind | Fields |
|------|--------|
| `map` | email*, first (optional) |
| `paid` | name*, email*, org*, role (optional) |
| `free` | email*, org (optional) |
| `discuss` | email*, org (optional), role (optional) |

### 7.5 Contact screen (`contact-screen.tsx`) — DO NOT SUBMIT

Topics: Starting with Safety · Exploring fit · Pricing · Something else  
Fields: name*, email*, organization (optional), message*  
POST: `/api/contact`

### 7.6 Safety flow signup / DIY

- DIY → handbook email capture (gesture to `#handbookEmail`)
- Signup → org provisioning narrative → capture paid variant

---

## 8. Findings (ten audits)

### 8.1 Stage naming (PRIORITY)

**Canon A (agent / path / pricing / FAQ / OG):** Safety · Sandbox · Training · Technology (UI often **Tech** for stage 04).

**Canon B (research / field guides / articles):** Safety · Sandbox · Skills · Solutions.

| Location | Wording |
|----------|---------|
| `src/lib/agent-room/naming.ts` | Training, **Tech** |
| `agent-room-fallback.tsx` | Training, **Technology** |
| `path-screen.tsx`, `faq.ts`, `scenes.ts` | Training, Technology |
| `safety-flow.ts` | Training, **Tech** |
| `src/app/layout.tsx` metadata | Training, **Technology** |
| `src/app/opengraph-image.tsx` | Training, Technology |
| `movemental-ai-agents` seed `show_path` comment | “04 **Solutions**” |
| `src/lib/research/data.ts` + research bodies | **Skills**, **Solutions** |
| `docs/articles/**`, field guide articles | **Skills**, **Solutions** |
| `src/lib/ai-reality/stage-mapper.ts` | Maps Skills→Training, Solutions→Technology |
| Live `/research` HTML | Skills, Solutions |
| Live `/agent/nonprofits` HTML | Training, Technology |
| `next.config.ts` | `/pathway/skills` → `/pathway/training`; `/pathway/solutions` → `/pathway/tech` |

**Recommendation:** Pick one public lexicon; run a repo-wide rename or explicit “legacy alias” layer; update engine prompts and vector corpus so the Concierge never mixes terms in one breath.

### 8.2 Legacy coexistence

- **Canonical audience content:** `/agent/{nonprofits,churches,institutions}` ✅
- **Legacy bare paths:** 308 to `/agent/*` ✅
- **Legacy marketing** (`/pricing`, `/faq`, `/evidence`, …): **404 live** despite `next.config.ts` — stale deploy or config not applied
- **Duplication risk:** Agent `about` screen (in-room) vs `/agent/about` document — intentional (same brand, different depth)
- **Research** remains a parallel content system with **Skills/Solutions** vocabulary

### 8.3 Named backers / people

**Home leader band** (`leaders.ts` — 17 portraits): Alan Hirsch, Brad Brisco, JR Woodward, Neil Cole, Rowland Smith, Rob Wegner, Liz Rios, Lucas Pulley, Josh Shepherd, Jeremy & Monica Chambers, Dave Ferguson, Dhati Lewis, Hugh Halter, Michael Cooper, Roy Moran, Peyton Jones, Meghan Good.

**Founders** (`founders/content.ts`): Alan Hirsch, Brad Brisco, Josh Shepherd — `/about/[slug]`, `/agent/about`, founders screen.

**Committed voices** (`committed-voices.ts`): Rowland Smith, Liz Rios, JR Woodward — intended `/voices/[slug]` (**404 live**); content on **`/agent/movement-voices`**.

**Consent risk:** Announcement bar says leader content is **not final** and will be vetted pre-publication; live site still names 17+ leaders on home and document pages.

### 8.4 Brand identity

| Surface | Identity |
|---------|----------|
| `/agent`, `/agent/*` documents, decks | **Ink Band** ✅ |
| `/assess`, `/enroll`, `/field-guide` | Ink-mapped utility (semantic Tailwind → ink ramp) ✅ |
| `/research` | Ink-compatible layout; copy uses **Skills/Solutions** ⚠️ |
| Announcement bar | Global, all pages |

No evidence of live Concept Modern `#0053db` on probed agent pages. Archived marketing under `_archive/pre-marketing-migration-2026-06/`.

### 8.5 Pricing

- Numbers consistent across `pricing.ts`, sandbox/technology screens, enroll **$1,000** entry
- **Training/Tech free tiers:** placeholder brackets in source — not resolved live
- **Access mechanism:** prose section exists; not placeholder brackets
- `/pricing` → should redirect to `/enroll` in source; **404 live**

### 8.6 Case studies

Audience pain cards explicitly label:

- **Sourced** — measured claims with footnote sources
- **“A pattern leaders recognize”** — synthetic scenes, not survey data

Config `sourcesNote` on each audience page states which of the “six points” are non-statistical. **No real named client case studies** on audience pages — illustrative/pattern framing.

### 8.7 Assessment dimensions

| Product | Dimensions / questions | Surface |
|---------|------------------------|---------|
| Agent reality map (beat) | **4 questions** (Safety gate + 3) | In-room / stream |
| Integrity diagnostic API | **6 dimensions**, 22 answers | `POST /api/assess` — no dedicated public multi-step UI found in `src/app` |
| `/assess` page | Magic link only; **no dimension count** | Live ✅ |

No live copy contradiction “five vs six” on `/assess`. Risk: future UI for integrity diagnostic may introduce six-dimension copy alongside four-question beat.

### 8.8 Canonical / duplicate URLs

| URL | Status | Canonical |
|-----|--------|-----------|
| `/agent/movement-voices` | ✅ 200 | **Yes** — public scenius/voices document |
| `/movement-voices` | ↪ 308 → above | alias |
| `/scenius` | ↪ 308 → above | alias |
| `/voices` | ❌ 404 | Source SSOT path in `committed-voices.ts` — **not implemented** |
| `/movement-leaders` | ❌ 404 (source: → `/agent`) | Legacy; content merged into agent narrative |

### 8.9 Legal / chrome

| Route | Live |
|-------|------|
| `/terms` | ❌ 404 |
| `/privacy` | ❌ 404 |
| `/cookies` | ❌ 404 |
| Generic 404 | ✅ 404 for unknown paths (Next default; no custom `not-found.tsx` in `src/app`) |
| `/footnotes` | ✅ 200 |

Pricing screen has inline **Terms** (payment splits), not legal pages.

### 8.10 Preview hygiene

| Signal | State |
|--------|--------|
| Announcement bar | ✅ Experimental preview, do not distribute |
| `robots.txt` | ⚠️ `Allow: /` for `*`; disallows only `/api/`, `/share/`, `/team-invite/`, `/dashboard/` |
| Cloudflare managed robots | Allows `search=yes`; blocks several AI crawlers |
| `sitemap.xml` | ⚠️ Lists `/agent`, `/assess`, `/enroll`, `/field-guide` |
| Meta robots on `/agent` | **None** (indexable) |
| Dashboard/program/share | `noindex` ✅ |

**Recommendation:** Add `robots: { index: false, follow: false }` to root layout or preview env flag; remove or noindex sitemap until launch; consider HTTP auth or Vercel deployment protection.

---

## 9. Prioritized punch list

| # | Priority | Page / file | Fix | Owner (inferable) |
|---|----------|---------------|-----|-------------------|
| 1 | **P0** | Global copy SSOT | Reconcile **Training/Technology** vs **Skills/Solutions**; update `naming.ts`, research articles, engine prompts, seed comments | Product + content |
| 2 | **P0** | `src/app/layout.tsx`, `robots.ts`, `sitemap.ts` | **noindex** entire preview; trim sitemap | Eng / DevOps |
| 3 | **P1** | Production deploy vs `next.config.ts` | Fix **404** on `/pricing`, `/faq`, `/evidence`, `/case-studies`, `/movement-leaders` | Eng |
| 4 | **P1** | `src/lib/committed-voices.ts` + app routes | Implement **`/voices`** hub or remove SSOT path; align with `/agent/movement-voices` | Eng + content |
| 5 | **P1** | Legal routes | Add `/terms`, `/privacy`, `/cookies` or footer links to external policies | Legal + eng |
| 6 | **P2** | `src/lib/agent-room/data/pricing.ts` | Resolve Training/Tech **free tier** placeholders before public launch | Product |
| 7 | **P2** | Leader portraits & bios | Complete consent vetting per announcement bar promise | Leadership ops |
| 8 | **P2** | `movemental-ai-agents` seed | Change `show_path` “Solutions” comment/tool copy to Technology | Eng |
| 9 | **P3** | Custom `not-found.tsx` | Ink Band 404 consistent with room | Design + eng |
| 10 | **P3** | Canonical host | Align `robots.txt` Host / sitemap with **www** vs apex | DevOps |

---

## 10. Audit constraints

- **Read-only** — no code or content modified during audit.
- **No form submissions** — capture, enroll, contact, assess, field-guide download not triggered.
- **No sign-in.**
- **Browser hydration** — limited; agent turn-by-turn behavior documented from source contracts. Re-run with Chrome DevTools when available for stream verification.

---

## Appendix A — Complete `page.tsx` route list (source)

```
/  → redirect /agent
/agent, /agent/about, /agent/nonprofits, /agent/churches, /agent/institutions
/agent/how-we-use-ai, /agent/movement-voices, /agent/assessment, /agent/invite
/agent/*/deck (3)
/about → /agent/about, /about/[slug]
/churches, /nonprofits, /institutions, /how-we-use-ai, /movement-voices, /scenius → agent aliases
/assess, /enroll, /field-guide, /footnotes, /research (+ sources, findings, [slug])
/login, /signup, /forgot-password, /auth/update-password, /welcome
/dashboard, /dashboard/onboarding/[step], /dashboard/onboarding/leader/[step]
/dashboard/ai-reality, /dashboard/safety
/program, /program/[category]/[templateId]
/newsletter/confirmed, /newsletter/unsubscribed
/share/ai-reality/[token], /team-invite/[token]
/(studio)/agent-runtime
```

---

## Appendix B — Engine tool list (quick reference)

**room-host:** `render_beat`, `show_path`, `show_pricing`, `show_safety_flow`, `show_network`, `show_audience`, `show_founders`, `offer_human_handoff`, `request_diagnosis`, `gesture_at`, `suggest_chips`, `show_capture`, [`file_search`]

**room-diagnostician:** `show_readback`, `offer_human_handoff`

---

## Remediated 2026-06-18 (AU-03)

| Finding | Remediation |
| --- | --- |
| Preview indexable despite announcement bar | `NEXT_PUBLIC_SITE_LAUNCH_READY` gates `noindex` on `/agent/*` (`src/app/agent/layout.tsx`) and empties sitemap until launch-ready |
| `/terms`, `/privacy`, `/cookies` 404 | Ink Band utility pages at `/terms`, `/privacy`, `/cookies` (marked `[LEGAL REVIEW REQUIRED]`) |
| `/voices` 404 | Permanent redirect to `/agent/movement-voices` in `next.config.ts` |
| Pricing bracket placeholders | Replaced `[Free entry point to confirm]` with honest “Field guide · coming soon” copy in `two-ways-forward.tsx` |
| Stage naming (AU-01) | Agent room, research bodies, and field guide already use Training/Tech; SSOT documented in `naming.ts` + `stage-mapper.ts` |

---

*End of audit.*
