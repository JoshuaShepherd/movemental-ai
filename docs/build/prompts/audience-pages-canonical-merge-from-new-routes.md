# Prompt: Canonical audience pages — merge `-new` experiments, retire parallel URLs

> **Intent:** Define the **single shipping version** of each audience surface so engineering can **delete** `*-new` routes, embed-only previews, and duplicate funnels—without losing narrative or visual ideas that should survive in production. **Route consolidation is necessary but not sufficient:** it must preserve the **canonical stage model** and **shared system logic** as the spine, with audience routes as **public applications of that one system**—not four unrelated products.

**Paste target:** Claude Code / Cursor inside the `movemental` repo when executing the consolidation PR (or split PRs: nonprofits narrative first, then homepage/embed cleanup).

---

## 0. Canonical model vs canonical pages

**Canonical (conceptual):**

- The **six-stage** progression and **shared system logic** (integration foundation, library / graph / relational memory, guided assistance, system builds taxonomy) are canonical.
- **Informational** and **relational** intelligence, **integration burden**, and **AI context dependence** are canonical terms across the whole site.

**Canonical (routes):**

- Audience URLs (`/movement-leaders`, `/churches`, `/nonprofits`, `/institutions` when shipped) are the **canonical public applications** of that same system in **different contexts**—emphasis, examples, and modules shift; the **product DNA** does not.

Every canonical audience page must make **visible**:

1. **Informational intelligence** — what the organization knows, where it lives, why it scatters.
2. **Relational intelligence** — who matters, how trust and memory move, why silos break continuity.
3. **The same underlying system** — composed for that audience; cross-links to `/how-it-works`, `/system-builds`, and `/fragmentation` ground the claim.

**Rule:** Route cleanup must **never** erase the “**one system · multiple contexts**” framing in copy, structure, or CTAs.

---

## 0b. Mandatory context (read before editing)

| Document | Why |
|----------|-----|
| [docs/design/DESIGN.md](../../design/DESIGN.md) | Semantic tokens, typography, motion, Midnight bands—**overrides** raw HTML mock. |
| [docs/build/prompts/stitch-to-react-migration.md](./stitch-to-react-migration.md) | Translation rules; Server Component defaults; token remap. |
| [docs/build/prompts/00-site-content-architecture-nav-master-prompt.md](./00-site-content-architecture-nav-master-prompt.md) | IA, consolidations, canonical route list. |
| [docs/arguments/SITE-SSOT.md](../../arguments/SITE-SSOT.md) | Navigation SSOT. |

**Stitch pin:** [docs/build/stitch-project.md](../stitch-project.md) — project `2208910962065880866` for **production** screens. Local `templates/stitch/**` HTML used in iframe experiments is **exploratory**: ship only ideas **harvested** into token-compliant React (§1b).

---

## 1b. Harvest rule — do not conflate “delete route” with “discard ideas”

Before deleting any `*-new` audience route or template-backed preview, **audit** it for:

- Narrative improvements (ordering, specificity, proof).
- Visual or **system demonstration** value (what helps a user see “what we actually build”).
- Audience-specific **modules** worth preserving in data or components.
- **Interaction patterns** worth porting as client leaves (no Tailwind-CDN iframe on public URLs).

**Policy:**

- `*-new` URLs **must not** survive as public IA or primary nav targets.
- Their **strongest** outcomes must be **intentionally harvested** into canonical pages or internal design notes—not lost by bulk deletion.

---

## 1. Situation today (inventory)

### 1.1 Canonical marketing routes (indexed, linked from nav)

| URL | Primary component | Role today |
|-----|-------------------|------------|
| `/movement-leaders` | `MovementLeadersPageContent` | Application of the shared system for corpus + network fragmentation. |
| `/churches` | `ChurchesPageContent` | Pathway-style application (formation / teaching foundation). |
| `/nonprofits` | `NonprofitsPageContent` | Application + system builds + merged funnel copy (diagnosis → stages → CTAs). |
| `/who-its-for` | `WhoItsForPageContent` | Hub into audience **applications**. |
| `/institutions` | `InstitutionsPageContent` (when shipped) | Parity audience application for research / curriculum / faculty corpus. |

Nav maps **Institutions** → `/institutions` (canonical audience page); **Organization inquiry** remains **`/inquiry`** as the form route. See `src/components/nav/nav-links.ts`.

### 1.2 Retired or retiring parallel routes (301 after deletion)

Former `*-new` iframe previews and parallel nonprofit funnel paths must **301** to canonical routes for at least one release once removed.

---

## 1.3 Supporting files (homepage “applications” band)

- `src/lib/audience-examples-new-data.ts` — tab labels and one-liners; **canonical paths only** (no `*-new` segments).
- `src/components/sections/home/home-audience-examples-new*.tsx` — **post–universal-spine** audience band; links to canonical pages only.

---

## 2. Strategic north star

Each canonical audience page must:

1. Name the **same diagnosis** (two intelligences, integration burden, AI).
2. Lexically align with `/fragmentation`, `/book`, `/how-it-works`—**link**, not paste the whole essay.
3. Share **CTA architecture** with peers: fragmentation → deeper story → contact / Discovery Lab / inquiry as appropriate.
4. Use **production primitives** and **semantic tokens** only.
5. Ground claims in **`/system-builds/*`** taxonomy.

**Non-goals:** Iframe-first public audience pages; four “product brands”; shadow IA under `-new`.

---

## 3. Shared system DNA (required on every canonical audience page)

All canonical audience pages share:

- **Narrative logic** — fragmentation named honestly → integration foundation → what Movemental installs → how to go deeper.
- **Product / system DNA** — one Movemental stack story, not a separate vendor per vertical.
- **Visual family** — Section rhythm, Midnight where appropriate, same card/typography primitives.
- **CTA architecture** — fragmentation / book / articles / contact or inquiry, consistent with `StorySpineCtaRow` patterns.

They **differ** in:

- Examples, modules, vocabulary emphasis, and which system builds are foregrounded.

---

## 4. Homepage — universal spine first, applications second

- The homepage retains a **universal narrative spine** first (`HomeHero` through **`HomeSystem`** — problem, consequence, turn, ordered stages).
- The **audience applications** band (`HomeAudienceExamplesNew`) sits **after** that spine so the site does not read as an early **four-product selector**.
- The band headline must communicate **“Same system, different applications”**; previews **link only to canonical audience URLs**, never shadow routes.
- Any retained preview chrome (screenshots, small frames) must read as **one platform family**, not four independent brands.

Section anchor: `#audience-applications` (stable link for in-page jumps).

---

## 5. Canonical page specifications

### 5.1 `/movement-leaders`, `/churches`

URL SSOT unchanged. Harvest mock ideas into **React** only. Hero or early band should nod to **shared system / same stage arc** as other audience pages.

### 5.2 `/nonprofits` — **reference implementation** for other audience pages

The merged `/nonprofits` page is the **clearest single example** of:

> **Diagnosis + application + what we build + pathway to deeper story**

It must show:

- **What the nonprofit-facing system looks like** (system builds, artifacts, interconnect copy).
- **How informational and relational intelligence appear** in nonprofit operations (explicit two-column diagnosis where helpful).
- **How the stage model applies** without repeating `/fragmentation` in full—use a **translated** grid or band that points back to the canonical story.

Funnel-only routes are removed; their copy lives here or in shared `nonprofit-content` modules consumed only by canonical surfaces.

### 5.3 `/institutions` — Option A (preferred)

**Option A (`/institutions`)** is preferred for **parity and clarity** with other audiences.

**Option B (`/inquiry` only)** is acceptable only if institutions are **intentionally** a softer, high-touch branch without a full parallel page.

If **Option A**: the page must **not** read as generic academic marketing—it must express the **same shared system logic**, with institutional examples (research continuity, curriculum, faculty graph) and the same CTA spine.

---

## 6. Safe migration discipline

1. **Do not** delete public routes until canonical replacements cover the same user intents (or explicit 301 to a better target).
2. **Preserve 301s** for all removed public paths.
3. **Remove embed infrastructure** only after homepage and audience links point to canonical routes only.
4. **Internal review** material may remain only if **gated** and `noindex`, with a removal date.
5. **Do not** delete `templates/stitch/**` until a **harvest audit** is recorded (even if the outcome is “no port”).

---

## 7. Engineering checklist

1. Canonical **content** per §5–6.
2. **Nav + SITE-SSOT** in one change set.
3. **301** for every retired experimental path.
4. **Robots:** index only canonical audience URLs.
5. **Delete** dead `*-new` `page.tsx` trees and unused embed handlers after §6.
6. **Docs:** `site-pages-inventory.md`, master IA prompt tables.

```bash
pnpm typecheck && pnpm lint && pnpm build
```

---

## 8. Acceptance criteria

- [ ] No production nav / `who-its-for` / homepage audience band points at `*-new` or shadow example paths.
- [ ] `/nonprofits` matches §5.2 (merged reference journey).
- [ ] `/institutions` matches Option A (or documented Option B).
- [ ] Homepage: universal spine **before** audience applications; band = same system, different contexts.
- [ ] 301s + SSOT + inventory agree.
- [ ] **Coherence test (user understanding):** A first-time visitor moving **home → audience page → `/fragmentation` → contact or inquiry** should feel **one coherent company argument**, not stitched experiments.

---

## 9. Optional LLM prepend

```text
You are merging audience routes in movemental. Canonical model: shared six-stage system + two intelligences. Canonical pages: public applications in context—/movement-leaders, /churches, /nonprofits, /institutions. Never ship public *-new or iframe-first audience URLs. Harvest template ideas into React before deletion. Preserve 301s. Update nav-links.ts and SITE-SSOT.md with route changes.
```

---

*Aligned with repo implementation; update paths if files move.*
