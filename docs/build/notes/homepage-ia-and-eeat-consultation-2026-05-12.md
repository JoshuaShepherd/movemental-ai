# Homepage IA, conversion, citations, and EEAT — consultation note (2026-05-12)

**Status:** Working note — pairs with the implementation merged in the same slice (nav/footer, home folds, citations CSS, founder stubs, `/who-we-serve` archive).

**Canonical doctrine:** [movement-leaders-as-ecosystem-layer.md](../strategy/movement-leaders-as-ecosystem-layer.md) — organizations are implementation audiences; **trusted voices** are a distinct ecosystem layer, not a fourth funnel card.

---

## 1. Executive summary

The homepage already tells a coherent story (hero recognition → audience routing → path order → credibility → CTA). The gaps were **IA noise** (pricing and org entry competing with conversion), **labeling drift** (“movement leaders” vs doctrine’s “trusted voices”), **weak EEAT plumbing** (founders not linkable; initials as decoration), **citation UI** that read like academic footnote pills rather than editorial highlights, and a **bottom CTA** whose voice did not match the hero/path copy. This note records recommendations; the companion code changes apply the uncontroversial parts.

---

## 2. Organizational sign-in and header CTAs

**Recommendation:** Treat **organization account access** (`/login`, `/dashboard`) as *utility*, not *primary conversion*. The header’s primary slot should stay aligned to the main funnel: conversation (inquiry) and, for movement-leader accounts, the leader workspace.

**Applied:** Session-aware **organization dashboard** links were removed from `SiteHeaderCta`. **Organization sign-in** (`/login`) and conditional **organization dashboard** (when the user has org memberships) were added to the footer **Get started** column.

**Residual risk:** Org-only returning users now see **Start a Conversation** in the header until they scroll to the footer for the dashboard. If analytics show friction, add a single discreet text link under the primary button *only on `/dashboard`-eligible sessions* — but that was explicitly deprioritized here in favor of a clean header.

---

## 3. Articulable CTA and conversion strategy (nav + footer)

**North star (no new coinages):** The site already states the ladder: **decide in writing → Safety first → path order** (hero + path fold). Conversion should mirror that ladder with **at most three visible actions** at any tier:

| Tier | Role | Primary actions |
|------|------|-------------------|
| **Header** | Orientation + one soft exit | Path mega-menu, Audiences (three org segments + link to movement-leader *definition* surfaces if you add them later), About, Contact, Field guide download, theme, session CTA |
| **Hero** | First decision | “See the Movemental Path” + “Start a Conversation” (already present) |
| **Path fold** | Proof of sequence | “Begin with Safety” + stage links |
| **Footer** | Recovery + trust + utility | About, trusted voices, library, field guide, **pricing**, FAQ, claims/sources, contact, **org sign-in**, assess, segment links |

**Trusted voices vs audiences:** Keep **churches / nonprofits / institutions** as the only peer cards in audience architecture. Surface movement-leader **definition + fit** pages (`/movement-leaders`, `/who-is-a-movement-leader`) from **About** or a single footer line, *not* as a fourth card beside institutions — per doctrine.

**Applied:** Pricing removed from the Path mega-menu and mobile path block; **Pricing** added under footer **Movemental** column. Audiences dropdown no longer leads with a hub page; first links are the three segments. Footer label **Trusted voices** points to `/voices`.

---

## 4. Pricing IA (orgs × path × pathways)

**Recommendation:** One canonical **Pricing** page remains the **economics SSOT** (stage fees, bundle, comparisons). Secondary surfaces should *summarize*, not *fork* numbers:

- **Path pages** (`/pathway/*`): keep the **inline fee microcopy** already on the home path fold (e.g. Safety `$1,000`) as *orientation*, with a single “see published pricing” link to `/pricing` where numbers must be exact.
- **Assessment / contact:** never duplicate a full price table in prose; link to `/pricing` after qualification.

**Applied:** Nav demotion + footer link only (no pricing table duplication in this slice).

---

## 5. Founder EEAT (home strip)

**Recommendation:** Remove decorative initials; they add noise and imply an avatar stack pattern that competes with real portraits. Prefer **name + role + deep link** to a durable bio URL.

**Applied:** Founders on the home credibility fold link to **`/about/founders/[slug]`** stub pages with a short paragraph and a link to the full **`/about#founder-*`** anchors where the long-form narrative lives.

---

## 6. Citation / “footnote” design

**Common patterns in editorial + EEAT UIs:**

1. **Superscript linked numeral** — classic Wikipedia; strong for scan, weak for “warm” editorial.
2. **Side/rail references** — great for longform; heavy for marketing folds.
3. **Margin tick / highlighter** — reads as *editor’s mark*; pairs well with “Digital Curator” positioning.
4. **Icon + “Sources” drawer** — good for dense claims; more UI chrome.

**Recommendation:** Keep **popover + `/footnotes` registry** (you already invested in EEAT registry and tests). Change the *visual affordance* from **pill counter** to **bracketed highlighter mark** so it reads as “source highlight” not “academic apparatus.” Optional later: a **printed** stylesheet that inlines the note (you already have print rules on `.cite__pop`).

**Applied:** `Cite` renders **`[n]`**; `citations.css` uses tilted, soft-edged highlight geometry; `/footnotes` list markers use **`[n]`** styling instead of circular counters.

**Gyptic / image-based marks:** Only worth it if you need literal brush texture at large sizes. For inline copy at 12–20px, **CSS highlighter** scales and stays accessible (focus ring, color tokens). If you later export SVG smears, use them as **optional** `background-image` on `.cite__btn`, not as the only signal.

---

## 7. Credibility network visualization (“scenius”) — framing without changing the graph

**Do not** rename the internal module or force “Scenius” into the H1 (doctrine). **Do** improve **EEAT packaging** around the unchanged viz:

- **Accessible name:** Describe *what the graph proves* (trusted relationships / credentials), not internal jargon.
- **Intro sentence:** Tie the viz to **field proof** — who is in the mesh, why edges exist — in one line above or beside the legend.
- **Caption / methodology link:** A quiet “How we map this” link to a short methodology blurb (even a `#` section on `/evidence` or `/how-we-use-ai`) improves EEAT for skeptical buyers.

**Applied:** Updated `aria-label` on the home instance toward **trusted voices** language. Copy still allows “movement leaders” in the *technical* sense inside the sentence where it clarifies relationship to Movemental; public chrome favors **trusted voices**.

---

## 8. Bottom homepage CTA — holistic alignment

**Problem:** The prior closing band (“we’re all beginners…”) was tonally disconnected from the hero/path, which are already **specific and fiduciary**.

**Recommendation:** The closing band should **repeat the same contract** as the hero second paragraph and path lede: *undecided safety → decide in writing → Safety first*. Offer **three exits** with clear intent:

1. **Begin with Safety** → `/pathway/safety` (primary implementation step).
2. **Safety field guide** → `/field-guides/safety` (free depth for skeptics).
3. **Start a Conversation** → `/contact` (human gate when the path is not enough).

No new slogans were introduced; strings were **recomposed** from existing hero/path language.

---

## 9. Social: LinkedIn only

**Applied:** Twitter icon removed from the footer. **LinkedIn** renders only when `NEXT_PUBLIC_SOCIAL_LINKEDIN_URL` is set in env (see `.env.local.example`). If the icon is missing locally, set the URL — avoids linking to a placeholder domain.

---

## 10. `/who-we-serve` archive

**Recommendation:** Do not maintain a fourth “hub” page that duplicates the home audience fold. **301/308** to **`/#audiences`** preserves intent for old links.

**Applied:** `src/app/(site)/who-we-serve/page.tsx` issues `permanentRedirect("/#audiences")`. Internal links updated to `/#audiences` where they previously pointed at `/who-we-serve`. Sitemap entry removed. EEAT registry rows that referenced `/who-we-serve` now use **`/`** as their `page` field so home-page citation wiring stays valid.

---

## 11. Definition of done (near-term)

- [x] Org sign-in / org dashboard demoted to footer; header simplified for dual-role users.
- [x] Pricing demoted from primary nav; listed in footer.
- [x] Who we serve overview archived to `/#audiences`.
- [x] Founder portraits link to stub bios + full `/about` anchors.
- [x] Citation mark restyled toward highlighter + bracket index; footnotes list aligned.
- [x] Bottom CTA aligned to Safety-first + existing copy.
- [ ] Set `NEXT_PUBLIC_SOCIAL_LINKEDIN_URL` in production env so the LinkedIn icon appears.
- [ ] Optional: add “How we map this network” methodology micro-page and link from the credibility fold.
- [ ] Optional: add `/about` menu entries for `/who-is-a-movement-leader` + `/movement-leaders` without treating them as audience peers.

---

## 12. Files touched (implementation index)

| Area | Files |
|------|--------|
| Nav | `src/components/nav/site-header.tsx` |
| Header CTA | `src/components/nav/site-header-cta.tsx` |
| Footer | `src/components/nav/site-footer.tsx` (now async server component) |
| Home credibility | `src/components/sections-mock/home/credibility-fold.tsx` |
| Home closing CTA | `src/components/sections-mock/home/final-cta.tsx` |
| Founder data | `src/lib/site-founders.ts` |
| Founder routes | `src/app/(site)/about/founders/[slug]/page.tsx` |
| Archive redirect | `src/app/(site)/who-we-serve/page.tsx` |
| Citations | `src/components/citations/cite.tsx`, `src/app/citations.css` |
| EEAT registry | `src/lib/citations/eeat-site-claims.json` |
| Sitemap | `src/app/sitemap.ts` |
| Cross-links | `movement-leaders-content.tsx`, `MovementLeadersPage.tsx` |

---

*This document is the assessment record; product owners can diff it against a second model’s output for any remaining disagreements (especially org-only header behavior and pricing microcopy on pathway pages).*
