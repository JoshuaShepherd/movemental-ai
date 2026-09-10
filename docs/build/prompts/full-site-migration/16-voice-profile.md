# FSM-16: Voice Profile Detail (`/voices/[slug]`)

**ID:** FSM-16  
**Phase:** Tier 3 — Editorial & Knowledge Ecosystem  
**Target Route/Files:**  
- Staging route: `src/app/(site-v2)/v2/voices/[slug]/page.tsx`  
- Staging components: `src/v2/components/voices/voice-profile-view.tsx`  
**Design Source:** `docs/handoff/designs/Movemental Voice Profile.dc.html`  
**Dependencies:** FSM-00, FSM-15  
**Status:** Ready for execution  

---

## 1. Context & Objective

The Voice Profile page details an individual committed leader's background, published works, core framework contributions, and relationship to Movemental's safety paradigm.

Build the candidate route in `src/app/(site-v2)/v2/voices/[slug]/` matching `Movemental Voice Profile.dc.html` 1-to-1 while consuming data from `src/lib/committed-voices.ts`.

---

## 2. Repo Sources to Read First

- `docs/handoff/designs/Movemental Voice Profile.dc.html` (authoritative layout, typography, and profile sections)
- `src/lib/committed-voices.ts` (`COMMITTED_VOICES`, `getCommittedVoiceBySlug`)
- `src/components/voices/voice-detail-page.tsx`
- `src/components/voices/voice-profile.module.css`
- `src/app/voices/[slug]/page.tsx`

---

## 3. Anti-Invention & Design Constraints

- **Only Committed Voices:** Valid slugs are `liz-rios`, `jr-woodward`, and `rowland-smith`. Return 404/not-found for uncommitted slugs.
- **Reading Margins:** Notebook margin on the narrative bio section.
- **L-4:** Zero hex in TSX files:
  - Profile card: `var(--color-ink-band-paper)`
  - Border: `var(--color-ink-band-border)`
  - Accent / Links: `var(--color-ink-band-blue)`
  - Quote highlight: `var(--color-ink-band-highlight)` marker swipe.

---

## 4. Implementation Steps

1. **Inspect Design HTML:**
   - Map sections in `Movemental Voice Profile.dc.html`:
     - Header / Mast: Fixed `3.6rem` with back-to-voices breadcrumb
     - Leader Hero: Large headshot portrait, full name in Playfair Display, primary focus, organization
     - Biography & Contributions: Long-form narrative with notebook margin
     - Published Works & Frameworks: Cards showing books, articles, or key models
     - Related Voices: Links to the other published voices
2. **Build Voice Profile Component:**
   - Author `src/v2/components/voices/voice-profile-view.tsx` accepting the leader data.
3. **Build Staging Page:**
   - Author `src/app/(site-v2)/v2/voices/[slug]/page.tsx` generating static params for the 3 slugs.
4. **Verification:**
   - Confirm zero-hex, typecheck, and rendering.

---

## 5. Definition of Done

- [ ] `src/app/(site-v2)/v2/voices/[slug]/page.tsx` renders all 3 committed voices cleanly.
- [ ] Visual parity matches `Movemental Voice Profile.dc.html` 1-to-1.
- [ ] Returns `notFound()` for unknown slugs.
- [ ] Zero hex values in touched files.
- [ ] `pnpm typecheck` exits 0.

---

## 6. Verification Commands & Gate

```bash
# 1. Zero-hex check
! grep -rE "#[0-9A-Fa-f]{6}" src/v2/components/voices/ src/app/\(site-v2\)/v2/voices/\[slug\]/

# 2. Typecheck
pnpm typecheck

# 3. Gate script
bash docs/build/prompts/full-site-migration/run-loop.sh check FSM-16
```

---

## 7. Attempt Log (Append-Only)

| Date | Agent | Status | Notes |
| --- | --- | --- | --- |
| — | — | Not started | Ready for execution |
