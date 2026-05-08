# Agent prompt: simplify `/churches`, `/nonprofits`, and `/institutions` to hero + case study + path bridge + conversation-forward CTA

Use this document as the **full instruction set** for an implementation pass. It describes the **current** composition, what to **remove or archive**, what to **keep**, and **concrete before/after examples** so the result is a short page: **one hero band**, the **existing case study block**, a **brief path bridge** tying audience problems to the four stages, and a **closing CTA that prioritizes conversation over pricing**.

---

## 1. Outcome (definition of done)

| Route | End-user scroll | Technical shape |
| --- | --- | --- |
| `/churches` | Hero → Case study → Path bridge → CTA (conversation-forward) | One page module composes **four** sections; everything else archived or deleted from the composition |
| `/nonprofits` | Same | Same |
| `/institutions` | Same | Same |

**Hero** means: one above-the-fold band with H1, short supporting copy, and **at most one** primary action toward `/contact` (with optional secondary text link to `/pricing`).

**Case study** means: keep the existing `CaseStudy` / `CaseStudyNarrative` stack **unchanged** in content and audience wiring, unless copy explicitly references removed sections (then update anchors only).

**Path bridge** means: a **single short section** (3–5 sentences max) that names the four stages and tells **this audience** specifically why the sequencing matters. This preserves Movemental's strongest distinctive without restoring the full editorial scroll.

**CTA (conversation-forward)** means: the final conversion band's **primary** action is **Start a conversation** → `/contact?interest={audience}`. **Secondary** is **View packages and pricing** → `/pricing`. **Tertiary** row of text links: Safety, Sandbox, Skills, Solutions deep links to `/pathway/{stage}`.

This CTA hierarchy reflects the actual conversion mechanism for senior leaders in Movemental's warm network: **trusted conversation**, not price comparison. Pricing is preserved as a visible secondary path for visitors who are ready for it; conversation is primary because most visitors are **not** yet at the price-evaluation stage.

---

## 2. Current state (source of truth in this repo)

### 2.1 Route entrypoints

```tsx
// src/app/(site)/nonprofits/page.tsx
export default function Page() {
  return <StudioAudiencePage audience="nonprofits" />;
}
```

```tsx
// src/app/(site)/institutions/page.tsx
export default function Page() {
  return <StudioAudiencePage audience="institutions" />;
}
```

```tsx
// src/app/(site)/churches/page.tsx
export default function Page() {
  return <ChurchesContent />;
}
```

### 2.2 Studio stack (`nonprofits` + `institutions`)

`AudiencePage` composes, in order:

```tsx
// src/components/studio/pages/AudiencePage.tsx (abridged)
export function AudiencePage({ audience }: { audience: "churches" | "nonprofits" | "institutions" }) {
  const includeSegmentPathway = audience !== "nonprofits";

  return (
    <div className="audience-page">
      <StitchEditorialAudience audience={audience} />
      {includeSegmentPathway ? <SegmentPathway audience={audience} /> : null}
      <CaseStudy audience={audience} />
      <PathClosingCta />
      <PathFootnote audience={audience} pathStageHrefMode={includeSegmentPathway ? "hash" : "pathway"} />
    </div>
  );
}
```

**Remove from the live composition** (conceptually “archive the scroll”):

| Block | Component | Notes |
| --- | --- | --- |
| Editorial body after hero | `StitchEditorialAudience` — sections `#reasons`, `#path`, nonprofit `#artifacts`, nonprofit `#begin` | Institutions: only hero + reasons today; **all** of that except hero goes |
| Long pathway explainer | `SegmentPathway` | Only mounted for institutions today; **drop** for simplified page |
| Footnote links to removed anchors | `PathFootnote` | Either **remove** the component from the page or **trim** bullet list so it does not link to `#reasons`, `#path`, etc. that no longer exist |

**Keep:**

| Block | Component |
| --- | --- |
| Hero (extracted) | First `#hero` section only from `StitchEditorialAudience`, or a new thin `AudienceHero` |
| Case study | `CaseStudy` → `CaseStudyNarrative` |
| Path bridge | **New** thin `AudiencePathBridge` component (audience-specific copy) |
| Closing CTA | `PathClosingCta` — **edit** (or replace with `AudienceClosingCta`) so primary intent is **conversation**, secondary is **pricing** |

### 2.3 Churches stack (`/churches`)

`ChurchesContent` sequences:

```tsx
// src/components/sections-mock/churches/churches-content.tsx
export function ChurchesContent() {
  return (
    <>
      <ChurchesHero />
      <WhatThisLooksLike />
      <ChurchPathway />
      <ChurchSkipRisks />
      <ChurchFaq />
      <ChurchProofBeat />
      <ChurchClosing />
    </>
  );
}
```

**Remove from composition:** `WhatThisLooksLike`, `ChurchPathway`, `ChurchSkipRisks`, `ChurchFaq`, `ChurchProofBeat`, `ChurchClosing`.

**Add:** `CaseStudy audience="churches"`, `AudiencePathBridge audience="churches"`, and a **conversation-first** CTA (reuse `PathClosingCta` or a slim `AudienceClosingCta` shared with studio pages).

**Hero:** Either keep `ChurchesHero` as-is **or** slim it: if “simple hero” means no three-column entry cards, replace `EntryCardsComponent` with one lede + one row of links — **primary** to `/contact`, **secondary** to `/pricing`.

---

## 3. How to archive (mechanics)

Pick **one** strategy and apply it consistently.

### Strategy A — Archive folder (recommended for large deleted JSX)

1. Create `src/components/_archive/audience-pages-full-scroll-YYYY-MM-DD/` (use the real date).
2. **Copy** (then delete from live paths) entire unused files, e.g.:
   - Full `StitchEditorialAudience.tsx` **or** the inner sections you remove, if you split the file.
   - `SegmentPathway.tsx` is shared; **do not move** the file unless nothing else imports it — instead leave the file in place and **stop importing** it from `AudiencePage`.
3. Add a one-line `README.md` in the archive folder: “Superseded by hero + case study + path bridge + conversation CTA; see `AudiencePage`.”

### Strategy B — Git history only

Delete unused sections in place; rely on git to recover. Fine if the diff is small and you are confident you will not need the old JSX soon.

### Strategy C — Feature flag (only if product needs A/B)

Gate old composition behind `NEXT_PUBLIC_AUDIENCE_PAGE_VARIANT=full|minimal`. Usually unnecessary for marketing pages.

**Do not** leave dead exports in `@/components/studio/pages` that nothing imports — either delete or move to `_archive`.

---

## 4. Implementation walkthrough (step-by-step)

### Step 1 — Unify the three routes on one composer (optional but clean)

Introduce something like `src/components/studio/pages/SlimAudiencePage.tsx`:

```tsx
// Pseudocode — intended structure, not a drop-in paste
export function SlimAudiencePage({ audience }: { audience: Audience }) {
  return (
    <div className="audience-page">
      <AudienceHero audience={audience} />
      <CaseStudy audience={audience} />
      <AudiencePathBridge audience={audience} />
      <AudienceClosingCta audience={audience} />
      {/* Optional: <PathFootnote ... trimmed /> */}
    </div>
  );
}
```

Then `nonprofits/page.tsx` and `institutions/page.tsx` render `<SlimAudiencePage audience="…" />`.

`churches/page.tsx` switches from `ChurchesContent` to the same `SlimAudiencePage audience="churches"` **or** keeps `ChurchesContent` but rewrites its body to match the same four blocks.

### Step 2 — Extract hero only from `StitchEditorialAudience`

In `StitchEditorialAudience`, each audience branch starts with `<section … id="hero">`. **Lift** that block into `AudienceHero.tsx` props:

- `eyebrow` / `kicker` (optional)
- `title` (ReactNode for italics)
- `subhead`
- Optional `callout` (institutions' bordered quote)

**Delete or archive** everything after the closing `</section>` of hero for that audience.

**Concrete example — nonprofits:**

- **Before:** Hero → `#reasons` → `#path` → `#artifacts` → `#begin` (midnight dual CTA).
- **After:** Hero only; `#begin` buttons (formerly “Schedule consultation”, “View pricing context”) **move into the closing CTA** section so you do not lose intent.

**Concrete example — institutions:**

- **Before:** Hero → `#reasons` grid.
- **After:** Hero only; the four “why sequencing matters” cards are **archived**. The single sentence about sequencing that justified those cards moves into the **path bridge** section described in Step 4 below.

**Concrete example — churches (studio branch):** `StitchEditorialAudience` includes a full churches layout (hero + reasons + path). If you unify on `SlimAudiencePage`, `AudienceHero` for `churches` should match that hero's typography **or** match `ChurchesHero` from `churches-content.tsx` — pick one voice and delete the duplicate path.

### Step 3 — Wire `CaseStudy` unchanged

```tsx
<CaseStudy audience={audience} />
```

Verify `id="case-study"` still exists for in-page links from the footnote or other pages.

### Step 4 — Add the path bridge (NEW)

Create `src/components/studio/segment/AudiencePathBridge.tsx`. This is a thin section (3–5 sentences) that ties this audience's specific situation to the four-stage path. It exists for two reasons: (1) it preserves Movemental's strongest distinctive — that **the order is the work** — without restoring the full editorial scroll; (2) it gives the closing CTA's tertiary stage links **context**, so visitors actually click them.

**Component structure** (starting reference — match repo primitives/tokens; adjust class names to existing patterns like `text-muted-foreground`, `Container`, `band-default`):

```tsx
import type { ReactNode } from "react";

type Props = { audience: "churches" | "nonprofits" | "institutions" };

const COPY: Record<Props["audience"], { eyebrow: string; body: ReactNode }> = {
  churches: {
    eyebrow: "Why the order matters for churches",
    body: (
      <>
        For churches, the order matters more than the menu. <em>Safety</em> first because the questions your staff and elders are asking deserve answers before tools get deployed. <em>Sandbox</em> second because exploration without discipline produces sermon-prep shortcuts you will regret. <em>Skills</em> third because formation produces leaders who can teach a congregation, not just users who can prompt a chatbot. <em>Solutions</em> last because deployment built on the foundation you have ratified is the only kind that holds.
      </>
    ),
  },
  nonprofits: {
    eyebrow: "Why the order matters for nonprofits",
    body: (
      <>
        For nonprofits, the order matters more than the menu. <em>Safety</em> first because your board's fiduciary expectations and your donors' trust are not optional. <em>Sandbox</em> second because individual staff exploration without governance is exactly the pattern that produces the 92%-adoption / 7%-capability gap the sector is documenting. <em>Skills</em> third because formation produces leaders, not just users. <em>Solutions</em> last because deployment built on a foundation works and deployment without a foundation breaks.
      </>
    ),
  },
  institutions: {
    eyebrow: "Why the order matters for institutions",
    body: (
      <>
        For institutions, the order matters more than the menu. <em>Safety</em> first because your board's fiduciary expectations are not optional and your accreditation context is non-negotiable. <em>Sandbox</em> second because institutional risk tolerance does not allow individual staff exploration without governance. <em>Skills</em> third because your faculty and staff need formation, not training. <em>Solutions</em> last because deployment without a foundation is what produces the failures you have watched at peer institutions.
      </>
    ),
  },
};

export function AudiencePathBridge({ audience }: Props) {
  const { eyebrow, body } = COPY[audience];
  return (
    <section
      id="path-bridge"
      aria-labelledby="path-bridge-heading"
      className="band-default py-20 md:py-24"
    >
      <div className="container mx-auto max-w-[760px] px-6 md:px-8">
        <p className="eyebrow mb-4 text-muted-foreground">{eyebrow}</p>
        <h2 id="path-bridge-heading" className="mb-6 font-serif text-2xl leading-tight md:text-3xl">
          The order is the work.
        </h2>
        <div className="text-base leading-relaxed text-muted-foreground md:text-lg">{body}</div>
      </div>
    </section>
  );
}
```

**Voice rules:** No bullet points. Italic emphasis **only** on the four stage names. No exclamation points. No banned consultant-speak words (leverage, synergy, transform, innovative, etc.). Max **5** sentences. Reading measure ~640–760px max width. The section sits **between** case study and closing CTA.

**Important:** the copy above is a **starting reference**, not a mandate to merge without review. The audience-specific phrasing should be reviewed by the founder before shipping. This component is the load-bearing strategic substance of the page after the case study; **the words matter**.

### Step 5 — Replace `PathClosingCta` with a conversation-forward variant

Current `PathClosingCta` emphasizes the four stage names but links to `/contact` and `/path`:

```tsx
// src/components/studio/path/PathClosingCta.tsx (excerpt)
<div className="flex flex-wrap justify-center gap-6">
  <Link href="/contact" className="btn-pill ...">
    Start a Conversation
  </Link>
  <Link href="/path" className="btn-pill ...">
    Explore the Full Path
  </Link>
</div>
```

**Target behavior (example copy and hierarchy):**

1. **Primary button:** Start a conversation → `/contact?interest={audience}` (e.g. `/contact?interest=for-nonprofits`)
2. **Secondary button:** View packages and pricing → `/pricing`
3. **Tertiary row** (text links, comma-separated or inline pill set): Safety → `/pathway/safety`, Sandbox → `/pathway/sandbox`, Skills → `/pathway/skills`, Solutions → `/pathway/solutions`

The **primary/secondary inversion** versus a pricing-first prompt is **deliberate**. Most visitors to audience pages in Movemental's warm-network conversion funnel are not yet at the price-evaluation stage; they are trying to figure out if Movemental is serious. A conversation CTA matches their actual decision moment. Pricing remains visible and one click away for visitors who are further along.

Keep the midnight `band-midnight` treatment and semantic tokens (`text-inverse-foreground`, `border-inverse-border`, etc.) per `docs/design/DESIGN.md`.

Give the closing section **`id="closing-cta"`** so the path footnote and any future internal links can target it cleanly (align with existing `PathClosingCta` if it already uses this id).

### Step 6 — Churches: slim `churches-content.tsx`

**Before composition:** seven sections.

**After composition:**

```tsx
export function ChurchesContent() {
  return (
    <>
      <ChurchesHeroSlim />
      <CaseStudy audience="churches" />
      <AudiencePathBridge audience="churches" />
      <AudienceClosingCta audience="churches" />
    </>
  );
}
```

Move removed section components (`WhatThisLooksLike`, `ChurchPathway`, …) into `_archive/.../churches-content-full.tsx` so marketing can recover prose if needed.

**Hero simplification example:** Replace the three `ENTRY_CARDS` with:

- Headline unchanged.
- One paragraph lede.
- Button row: **Start a conversation** → `/contact?interest=for-churches` (primary), **See packages** → `/pricing` (secondary text link).

If you **keep** the three cards, each card's `href` should still point at pathway entry, case study anchor, or conversation — not long essay sections you are deleting.

### Step 7 — `PathFootnote`

Open `PathFootnote.tsx`. If it links to `#reasons`, `#path`, or other removed ids, **update** to:

- `#hero`
- `#case-study`
- `#path-bridge`
- `#closing-cta`

Or **remove** `PathFootnote` entirely from the slim page if it adds no value.

### Step 8 — Verify SEO and a11y

- Page `metadata` in each `page.tsx` stays accurate.
- Single `h1` per page (in the hero).
- Section landmarks: `aria-labelledby` on hero, case study, path bridge, closing CTA.
- The four section ids (`#hero`, `#case-study`, `#path-bridge`, `#closing-cta`) are stable for analytics and any in-page deep links.

### Step 9 — Commands

```bash
pnpm typecheck
pnpm lint
```

---

## 5. What not to do

- Do not gut `CaseStudyNarrative` audience-specific copy unless case study text **explicitly** references a section you removed — then edit only those sentences.
- Do not change Drizzle schema or API routes; this is a marketing composition task.
- Do not introduce raw hex colors; stay on semantic tokens.
- Do not leave `SegmentPathway` imported if unused — removes a large client bundle chunk from the page.
- **Do not** promote pricing above conversation in the closing CTA. The hierarchy is **conversation-primary**, **pricing-secondary**, **stage-links-tertiary**. This is intentional.
- **Do not** lengthen the path bridge beyond **5** sentences. Its job is to be the smallest possible substantive bridge between case study and CTA, not to restore the editorial scroll.
- **Do not** add new sections beyond the four specified (hero, case study, path bridge, closing CTA). If a section seems necessary, raise it as a question rather than adding it; the simplification is the point.

---

## 6. Quick reference — files you will touch

| File | Action |
| --- | --- |
| `src/app/(site)/nonprofits/page.tsx` | Point at slim composer |
| `src/app/(site)/institutions/page.tsx` | Point at slim composer |
| `src/app/(site)/churches/page.tsx` | Optionally switch to slim composer |
| `src/components/studio/pages/AudiencePage.tsx` | Replace with slim export or re-export |
| `src/components/studio/pages/SlimAudiencePage.tsx` | **NEW** — composer for the four sections |
| `src/components/studio/segment/StitchEditorialAudience.tsx` | Split: keep hero slice only in live tree |
| `src/components/studio/segment/SegmentPathway.tsx` | Remove import from audience page |
| `src/components/studio/segment/AudiencePathBridge.tsx` | **NEW** — path bridge section with audience-specific copy |
| `src/components/studio/path/PathClosingCta.tsx` | Repurpose or duplicate as `AudienceClosingCta.tsx` with conversation-primary hierarchy |
| `src/components/studio/path/PathFootnote.tsx` | Trim links or drop from slim page |
| `src/components/sections-mock/churches/churches-content.tsx` | Delete sections from composition; archive file |
| `src/components/sections/*/*-page-content.tsx` | **No change required** for live routes unless something still imports them — they are legacy / alternate builds |

---

## 7. Acceptance checklist

- [ ] `/churches`, `/nonprofits`, `/institutions` each load with **four** major sections in order: hero, case study, path bridge, closing CTA.
- [ ] No broken hash links in footnote or internal CTAs.
- [ ] Primary commercial action in the closing CTA is **Start a conversation** → `/contact?interest={audience}`. Secondary is **View packages and pricing** → `/pricing`. Tertiary is the four stage links.
- [ ] Path bridge section is present, audience-specific, max **5** sentences, italic emphasis **only** on the four stage names.
- [ ] Archived JSX lives under `_archive/...` **or** is recoverable from git with a clear commit message.
- [ ] `pnpm typecheck` and `pnpm lint` pass.
- [ ] Single `h1` per page; all four sections have `aria-labelledby` where applicable.
- [ ] Visual smoke check: at desktop 1440px and mobile 375px, each page reads as **four** distinct bands with appropriate breathing room and no orphan UI from removed sections.

---

## 8. Strategic context (for the implementing agent)

This simplification is being shipped before the audience pages have been A/B tested against the current full-editorial composition. The decision to ship simpler now is based on three things:

1. The full editorial scroll has not been validated against actual customer conversations; warm-network conversion to date has come from founder-led outreach, not page-driven conversion.
2. The maintenance cost of three full editorial pages exceeds current bandwidth.
3. A simpler page is easier to iterate on than a longer one, so shipping simple now preserves optionality.

The **path bridge** section is the single concession to substantive argument because the path framing is Movemental's strongest distinctive — that **the order is the work** — and removing it entirely would reduce the audience pages to generic SaaS landing pages. **Five sentences** is the smallest version that still carries the argument.

The **conversation-primary** CTA hierarchy reflects the actual conversion mechanism for senior leaders evaluating Movemental: trusted introduction and direct conversation, not price comparison. Pricing remains visible because some visitors are further along; conversation is primary because most are not.

If post-launch data shows the path bridge is not being read (low scroll depth past the case study) or that pricing is converting better than conversation (which would be surprising but possible), revisit both decisions in the next iteration. Until then, ship the four-section slim composition **exactly** as specified.

---

## 9. Optional follow-up (out of scope unless requested)

- Align typography between `ChurchesHero` (marketing primitives) and `AudienceHero` (studio serif stack) for visual consistency.
- Add Playwright smoke: four selectors visible (`#hero`, `#case-study`, `#path-bridge`, `#closing-cta`).
- Add basic page analytics on the four section ids so the next iteration is data-informed rather than hypothesis-informed.
- Review and finalize the audience-specific path bridge copy with the founder before merging.

---

## Related

- Earlier draft focused on **packages-primary** CTA: superseded by this document. If both files existed, keep **this** file as the canonical audience-page simplification prompt.
