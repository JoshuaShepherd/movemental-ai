# Canonical doctrine: movement leaders as an ecosystem layer (not an audience funnel)

**Status:** Canonical (authoritative)
**Created:** 2026-04-21
**Supersedes drift:** any treatment of movement leaders as a standard parallel audience segment beside churches, nonprofits, and institutions.
**Related:** [../plans/movement-leaders-network-social-proof.md](../plans/movement-leaders-network-social-proof.md), [../notes/site-pages-architecture-and-navigation-map.md](../notes/site-pages-architecture-and-navigation-map.md), [../audit/site-pages-inventory.md](../audit/site-pages-inventory.md), [../prompts/site-wide-navigation-ia-proposal.md](../prompts/site-wide-navigation-ia-proposal.md).

---

## The rule

**Organizations are the primary implementation audiences.
Movement leaders are a distinct trusted-voice and ecosystem layer, not merely a parallel funnel segment.**

Do not default to placing movement leaders inside audience or funnel architecture unless there is a specific campaign or product reason to do so.

---

## Why this matters

Earlier iterations of the site implicitly treated **movement leaders** as a fourth audience card beside churches, nonprofits, and institutions. That reading is structurally wrong for what Movemental is and how it will grow:

1. Churches, nonprofits, and institutions are **implementation audiences.** They adopt the platform, do formation work inside it, and are the right subjects of audience architecture, pricing, onboarding, and implementation service copy.
2. Movement leaders are not primarily buyers of a generic offering. Their public bodies of work are **the kind of fragmented informational and relational intelligence Movemental exists to serve** — and their standing, credibility, and networks are what make Movemental legible as a serious platform in the first place.

Flattening the two into one audience funnel:

- muddles the promise ("is this a product for me, or am I named on the site as a voice?"),
- obscures accountability (founders and trusted voices have different responsibilities to the work), and
- blocks future product surfaces — voice-aware agents, curated corpora, co-authored SKUs — that only make sense when movement leaders are framed as an **ecosystem layer** rather than a conversion segment.

---

## The distinction, made explicit

### Organizations — implementation audiences

Churches, nonprofits, and institutions belong in:

- audience architecture (`/organizations`, `/churches`, `/nonprofits`, `/institutions`)
- funnel and conversion logic (pricing, sandbox season, engagement inquiry)
- service / application / implementation framing
- assessment logic (`/assess`, `/assess/formation`)
- "who is Movemental for" / "use-case" framing

The `/organizations` hub and segment pages stay the primary ramp for *someone who might run Movemental inside their organization.*

### Movement leaders — trusted-voice, corpus, ecosystem layer

Movement leaders belong in:

- **trust and proof architecture** (social proof, "built with," named voices)
- **ecosystem framing** (who Movemental is embedded with in the field)
- **"built with" language** on narrative pages
- **product and corpus explanation** (whose bodies of work inform frameworks and, when consented, inform agents and curated reading)
- **future voice-aware platform framing** (per-voice pages, eventually voice-faithful agents / courses / articles when consent + corpus are ready)

Movement leaders **should not** be treated by default as:

- just another audience card beside churches, nonprofits, and institutions
- a standard funnel segment with its own conversion flow
- a recruiting or roster-growth mechanism ("apply to be featured")
- a generic partner or logo strip

Where movement leaders *do* legitimately appear as an audience — e.g. the `/movement-leaders` page, which speaks **to** authors/teachers whose own life's work has fragmented — the page reads as a **fit definition + practitioner playbook**, not as a parallel audience funnel. Its purpose is to help a movement leader recognize themselves in the five-failures / five-moves shape, not to sit beside churches and nonprofits in "who do we sell to."

---

## Preferred public language

Default public phrase:

> **Trusted voices**

Acceptable supporting phrases:

- Voices shaping the work
- Built with trusted movement voices
- Leaders shaping the work
- In conversation with movement leaders including…
- Shaped with a circle of movement leaders

Avoid as the primary public label unless there is a strong reason:

- Scenius
- Committed voices
- Ambassadors
- Influencers
- Advisors
- Partners
- Roster

"Scenius" may remain **internal** (module names, code comments, occasional explanatory subtitle for readers who already know the word). It should not be the H1 or the nav label.

---

## Where this shows up in the codebase

Single source of truth: this doc.

| Surface | Expected treatment |
|---------|--------------------|
| `src/components/nav/nav-links.ts` → **"Audiences"** menu | Segments column lists **only** the organization implementation audiences (Churches · Nonprofits · Institutions). The "Start here" column keeps `/organizations` + `/who-is-a-movement-leader` (definition) + `/movement-leaders` (practitioner fit) so the movement-leader surfaces are findable — but they are framed as *definition + fit*, not as a fourth parallel segment card. |
| `src/components/nav/nav-links.ts` → **"About"** menu | **"Trusted voices"** link to `/voices`, not "Committed voices." Subtitle may keep the Scenius wording one click deeper. |
| `/voices` (`src/components/sections/voices/voices-page-content.tsx`) | Primary public label is **Trusted voices**. Hero, intro, and invitation read as proof + ecosystem, not recruitment. Roster data still lives in `src/lib/committed-voices.ts` — the module name is internal and can stay as-is. |
| `src/components/sections/voices/voices-strip.tsx` | Default eyebrow and heading are calm "built with / shaped with trusted movement voices." |
| `/movement-leaders` page | Framed as a practitioner fit + five-failures diagnosis for authors/teachers whose own work has fragmented. Uses the voices strip as *proof*, not as part of an audience-selector pattern. |
| `/who-is-a-movement-leader` | Working definition. Opens with a short note that movement leaders are *a distinct ecosystem layer*, not a standard audience segment — so the reader knows what category they are in. |
| `/organizations` hub | Copy keeps implementation-audience framing: churches / nonprofits / institutions. If a sentence acknowledges movement leaders, it points to `/voices` as the *trusted-voice layer* rather than listing them as a fourth segment card. |
| `/about` | "Who Movemental serves" chip list uses only the three organization audiences. A separate sentence or chip surface names movement leaders as the trusted-voice layer and links to `/voices` — not a fourth peer chip. |
| Home page and other proof surfaces | If a trust/proof band references movement leaders, it uses "trusted voices" / "built with" language linking to `/voices`. |

---

## Consequences for future agents

1. **Do not add movement leaders as a fourth sibling card** in any audience hub, funnel comparison, or segment grid unless a specific campaign requires it — and even then, do so with explicit doctrinal justification.
2. **Do not introduce a movement-leader recruiting surface** ("apply to be a committed voice," "nominate a leader"). Voice expansion is a private editorial decision, not a form submission.
3. **Do not rename `/voices` into an audience segment.** `/voices` is the trusted-voice hub; it is governed by this doctrine, not by audience funnel logic.
4. **Do prefer "trusted voices"** as the public label in copy, nav, metadata, and proof strips. Keep internal type names (`CommittedVoice`, `COMMITTED_VOICES`) as-is to avoid churn; the split between *internal data model* and *public label* is intentional.
5. **When writing new strategy or prompt docs** that describe audience architecture, explicitly separate the two layers (implementation audiences vs trusted-voice / ecosystem layer) rather than enumerating "movement leaders, churches, nonprofits, institutions" as a flat list.

---

## One-sentence version for pull requests and agent briefs

> Movement leaders are not primarily a demand-generation segment for Movemental — they are a credibility-bearing, wisdom-bearing, ecosystem-shaping layer of the platform's public identity and future development. Churches, nonprofits, and institutions are the primary implementation audiences.

If a change would muddle that distinction, stop and re-read this doc before shipping it.
