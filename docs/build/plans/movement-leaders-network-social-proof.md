# Plan: Featuring the trusted movement-leader ecosystem (credibility + runway, not recruitment)

**Status:** Partially shipped (Phase 1 + doctrinal clarification landed 2026-04-21).
**Created:** 2026-04-21.
**Supersedes its own §2 terminology:** the primary public label is now **"Trusted voices."** "Committed voices" and "Movement Leaders Scenius" remain acceptable internal / explanatory terms but are no longer the default H1, nav label, or metadata phrase. This change follows the canonical doctrine in [../strategy/movement-leaders-as-ecosystem-layer.md](../strategy/movement-leaders-as-ecosystem-layer.md), which treats movement leaders as a distinct trusted-voice / ecosystem layer — **not** a parallel audience segment beside churches, nonprofits, and institutions.
**Scope:** Public marketing site (`src/app/(site)/**`) — information architecture, narrative framing, and phased implementation for trust / ecosystem proof anchored in named movement leaders, distinct from generic "partner" strips, recruitment funnels, and audience segmentation.

---

## 1 · Context and intent

### 1.1 Who is in scope

**Founding leadership (already on `/team`):**

- Alan Hirsch — Chief Missiologist & Co-founder  
- Brad Brisco — CEO & Co-founder  
- Joshua Shepherd — CTO & Founder  

**Movement Leaders Scenius (signed committed voices — research-backed):**

- Rowland Smith — `docs/movement_leader_research/rowland-smith`  
- Liz Rios — `docs/movement_leader_research/liz-rios`  
- JR Woodward — `docs/movement_leader_research/jr-woodward`  

**Canonical research roots for copy, network facts, and future “work” hooks:**  
`alan-hirsch`, `brad-brisco`, plus the three Scenius folders above. Josh Shepherd’s folder is in active expansion; treat `/team` and this plan as synchronized when research catches up.

### 1.2 What this plan is *for*

1. **Legitimate credibility** — Show that Movemental is embedded in a real scenius of practitioners and published thinkers, not only a product story.  
2. **Asset visibility** — Make the *people network* legible as a strategic asset (formation depth, geographic and theological diversity, institutional seriousness).  
3. **Runway for forthcoming work** — Surface each voice in a way that can later absorb courses, articles, books, and agent/voice experiences **without** a disruptive rebranding of the site chrome.

### 1.3 What this plan is *not* for

- **Recruiting** additional movement leaders (no “apply to be featured,” no pipeline CTA framed as joining the roster).  
- **Implying** that every organization named in individual research dossiers endorses Movemental the company.  
- **Flattening** founders and Scenius into one undifferentiated “logo wall” — that would blur governance, accountability, and the distinct promise of the Scenius cohort.

---

## 2 · Narrative frame (copy strategy)

### 2.1 One sentence to own internally

**“Movemental is stewarded by founders who live inside the fragmentation problem, and extended by a committed circle of movement leaders whose public work the platform is built to carry.”**

### 2.2 Public-facing vocabulary (recommended)

**Resolved (2026-04-21):** primary public label is **"Trusted voices."** See [../strategy/movement-leaders-as-ecosystem-layer.md](../strategy/movement-leaders-as-ecosystem-layer.md).

| Concept | Label (user-visible) | Notes |
|--------|----------------------|--------|
| Alan, Brad, Josh | **Team** (existing) | Keep `/team` as the place for roles, accountability, and company story. |
| Rowland, Liz, JR | **Trusted voices** (primary) | "Committed voices" and "Movement Leaders Scenius" may appear at most once per page as an explanatory subtitle. Avoid "ambassadors," "influencers," "partners," "roster." |
| Combined story | **Ecosystem** / **"Built with"** language | Use when describing the relationship between team and trusted voices as a credibility layer. Avoid "network" as a legal entity name. |

### 2.3 Tone guardrails

- **Evidence over hype** — Prefer specific domains of contribution (e.g., church planting networks, published books, seminary roles, boards) over superlatives. Pull facts from each folder’s README / summary / `network/` artifacts.  
- **Formation, not flex** — Align with existing team copy: inspectability, two intelligences, humane alternative to scatter-only publishing (`team-page-content.tsx`).  
- **Forward-ready** — Each voice block should include a stable **“Focus areas”** or **“Public work themes”** line that can remain true when SKUs change.

---

## 3 · Information architecture

### 3.1 Recommended primary destination

**Add a dedicated hub:** `/network` or `/voices` (choose one URL; both can redirect if needed).

**Purpose:** Single canonical URL for “who stands with Movemental besides the three-person team,” with room to grow (more voices, future alumni, advisory circles) without bloating `/about` or duplicating long bios on `/movement-leaders`.

**Suggested URL:** **`/voices`** — short, human, works in footer and talks; reserve `/network` for a later, richer graph visualization if you ship `network-map`-style interactives.

### 3.2 How this relates to existing routes

| Route | Relationship to this plan |
|-------|---------------------------|
| `/team` | **Unchanged ownership** — founders only. Optional: one cross-link (“See also committed voices”). |
| `/movement-leaders` | **Audience segment** — keep focused on *the reader* (five failures, five moves). Add a *tight* band: “Built with practitioners in the room” linking to `/voices`, not a full duplicate roster. |
| `/who-is-a-movement-leader` | **Definition** — optional footnote strip: “Movemental’s committed voices exemplify this definition in public ministry; they are not a generic sample of all movement leaders.” |
| `/about` | **Short summary** + link to `/voices`; avoid long per-person content here. |
| `/book/contributors` | **Book-specific** — do not conflate book contributors with Scenius; cross-link only where a person is both (e.g., Alan). |
| Home `/` | **Optional** second fold: compact “Committed voices” row (faces + names + link). |

### 3.3 Optional future: per-voice URLs

**Phase 3:** `/voices/[slug]` (slugs: `rowland-smith`, `liz-rios`, `jr-woodward`, aligned with `docs/movement_leader_research/`). Each page: photo, 2–3 paragraph editorial bio, themes, **curated** external links (primary site, publisher), “On Movemental” section (empty state → coming work). No comment threads required at launch.

---

## 4 · UX and component patterns

### 4.1 Do not reuse `LogoStrip` alone for people

Today `LogoStrip` is tuned for **org / publisher marks** (`logo-strip.tsx` — grayscale partner treatment). Using it for **human** proof undercuts warmth and biography. **Recommendation:**

- **Founders:** stay on `/team` with current portrait cards.  
- **Scenius:** new **“VoiceCard”** primitive — portrait, name, one-line thesis, 2–3 tags (e.g., “Church planting · Published author · Network builder”), link to `/voices/[slug]` when live.

### 4.2 Layout tiers (progressive depth)

1. **Compact band** (home, `/movement-leaders`): 3 faces + heading + single CTA “Meet the committed voices.”  
2. **Hub grid** (`/voices`): equal cards, alphabetical or “Scenius” grouping — **not** ranked by follower counts.  
3. **Detail** (`/voices/[slug]`): long-form editorial bio + “why Movemental” (one paragraph, founder-approved).

### 4.3 Visual parity

Follow `docs/design/DESIGN.md`: token-first surfaces, accessible contrast, consistent portrait aspect (reuse team page’s `aspect-4/5` language where possible). Source headshots through the same pipeline as `/team` (`/headshots/*.webp`) once assets exist.

---

## 5 · Content model (single source of truth)

### 5.1 Proposed data shape (implementation-agnostic)

Centralize in something like `src/lib/committed-voices.ts` (or CMS later):

- `slug`, `displayName`, `shortTagline`, `themes[]`, `portraitSrc`, `portraitAlt`  
- `primaryUrl` (personal or org site — user leaves Movemental deliberately)  
- `credentials` (short bullet list — max 4, from research READMEs)  
- `movementalRelationship` enum: `founder` | `co_founder` | `scenius`  
- `featuredWorks` (optional strings — book titles only until rights/linking are cleared)

**Research folders** remain the editorial source; the TS module is the **published subset** (not a dump of `network/organizations.md`).

### 5.2 Legal / reputational hygiene

- **No implied org endorsement** — Card copy should describe *the person’s* roles; avoid “NAMB endorses Movemental”-style readings unless you have explicit legal clearance for co-branding.  
- **Photo rights** — same standard as team headshots: licensed or commissioned only.  
- **External links** — `rel="noopener noreferrer"`; open in same tab for trust (or consistent policy site-wide).

---

## 6 · Phased rollout

### Phase 0 — Narrative alignment (no new routes)

- Agree on primary label (**Committed voices** vs **Movement Leaders Scenius**).  
- Draft 150-word hub intro + one-line taglines for Rowland, Liz, JR (from `README.md` / `summary.md`).  
- Founder sign-off on “not recruitment” positioning.

### Phase 1 — Ship `/voices` hub

- New route + footer/secondary nav entry (coordinate with `nav-links.ts` and any IA doc under `docs/build/prompts/`).  
- Three VoiceCards + short explainer + link back to `/team` and `/movement-leaders`.  
- Optional compact band on home and `/movement-leaders` pointing to hub.

### Phase 2 — SEO + schema

- `metadata` title/description for `/voices`.  
- Optional `Person` JSON-LD on detail pages when Phase 3 ships (validate with Search Console).

### Phase 3 — Per-voice pages + “coming work” slots

- `/voices/[slug]` with stable OG images per voice.  
- Tie-in hooks for future SKUs: “Courses,” “Articles,” “Conversation agents” as **disabled or empty** sections with honest labels (“In development”) until content exists.

### Phase 4 — Deeper proof (optional)

- Curated **quotes** (with permission) from published endorsements or Alan’s corpus — only where rights are clear.  
- Lightweight **“how they connect”** diagram (static SVG) if you want scenius *topology* without overclaiming data precision.

---

## 7 · Success measures

| Signal | Why it matters |
|--------|----------------|
| Time on `/voices` + scroll depth | Indicates proof is being read, not skipped. |
| Click-through to `/team` from `/voices` | Shows users connect company accountability to extended network. |
| Inbound questions referencing a **specific** voice | Qualitative check that names are memorable. |
| **Low** bounce from `/voices` to unrelated careers pages | Confirms we avoided “join us” misread. |

Avoid vanity metrics like raw traffic spikes from press; optimize for **comprehension and trust**.

---

## 8 · Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Looks like a recruiting funnel | No form above the fold; no “nominate a leader”; CTA points to `/contact` only for *platform* inquiries, with copy that does not mention roster expansion. |
| Founders overshadow Scenius | Visually separate sections on hub; equal card treatment for the three Scenius voices; founders linked “also see Team” rather than dominating the grid. |
| Stale bios | Quarterly review tied to research folder updates; `lastReviewed` in content model. |
| Overclaiming institutional ties | Human-centric copy; org logos only if you run a separate **evidence-backed** logo strip with permissions (future phase). |

---

## 9 · Open decisions (for leadership)

1. **Canonical URL:** ~~`/voices` vs `/network` vs nested under `/about/voices`.~~ **Resolved:** `/voices`.
2. **Primary public label:** ~~"Committed voices" vs "Movement Leaders Scenius" (subtitle strategy).~~ **Resolved 2026-04-21:** **"Trusted voices"** — per [../strategy/movement-leaders-as-ecosystem-layer.md](../strategy/movement-leaders-as-ecosystem-layer.md). Other phrases are internal / explanatory only.
3. **Whether Josh appears on both `/team` and `/voices`** — recommend **team only** for Josh to avoid duplication; `/voices` intro copy acknowledges three founders by name without a fourth card.
4. **Homepage prominence:** Phase 1 only in footer vs also a mid-page band on `/`.
5. **Home hero audience tabs** — `home-hero-tabbed-audiences.tsx` still lists "Movement Leaders" as the first of four tabs beside Nonprofits / Churches / Institutions, which conflicts with the doctrine. Open decision: relabel the tab (e.g. "Authors & teachers"), collapse it into a separate trusted-voice preview surface, or accept the mismatch as product-preview scope rather than audience-funnel scope. Do not expand the tab set further until this is resolved.

---

## 10 · Implementation checklist (engineering)

- [ ] Add `src/lib/committed-voices.ts` (or equivalent) with typed roster.  
- [ ] New `src/app/(site)/voices/page.tsx` + `CommittedVoicesPageContent` section component.  
- [ ] Wire `nav-links.ts` footer (and optionally header secondary) per IA review.  
- [ ] Add compact cross-link section to `movement-leaders-page-content.tsx` (copy + design review).  
- [ ] Headshots: extend `/public/headshots/` + alt text; match `TeamPortrait` patterns.  
- [ ] Phase 3: dynamic `[slug]` route + MDX or TS-driven long bios.  
- [ ] Update `docs/build/audit/site-pages-inventory.md` when the route ships (keep inventory in sync with code).

---

## 11 · Summary

Treat **social proof** as **inspectable human capital**: founders on `/team`, Scenius on a dedicated **`/voices`** hub with portrait-forward cards, narrative copy grounded in `docs/movement_leader_research/*`, and phased depth that ends in per-voice pages ready for future publications and products. Keep recruitment language out; keep **specificity, permissions, and parity** in. That positions Movemental as a serious platform **already surrounded by the leaders it exists to serve** — which is the credibility claim you actually want to earn.
