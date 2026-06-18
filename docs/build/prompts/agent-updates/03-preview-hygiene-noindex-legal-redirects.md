# AU-03 — Preview hygiene (noindex, legal, redirects)

**Prompt ID:** au-03-preview-hygiene  
**Target agent:** Cursor / Claude Code  
**Primary repo:** `movemental-ai`  
**Last updated:** 2026-06-18  
**Source:** [movemental-site-audit.md](../../notes/movemental-site-audit.md) · consultation §6.1

Paste the block below into a fresh agent turn.

---

## Problem statement

The live preview shows an announcement bar ("not for public distribution") but **`robots.txt` allows indexing**, the sitemap lists public routes, and **`/terms`, `/privacy`, `/cookies` return 404**. Legacy redirects in `next.config.ts` may not match live edge behavior. Credibility product cannot look half-published.

---

## The prompt

> You are fixing **preview / launch hygiene** for movemental.ai: indexing policy, legal pages, redirect parity, and voices URL gap — without changing product UX on the agent room itself.
>
> ### 0. Orient first
>
> 1. Read [movemental-site-audit.md](../../notes/movemental-site-audit.md) §1, §3.7, §4.
> 2. Inspect:
>    - `src/app/robots.ts` or `public/robots.txt`
>    - `src/app/sitemap.ts`
>    - `next.config.ts` redirects
>    - `src/lib/committed-voices.ts` (`/voices` hub)
>    - Preview banner component (grep `not for public distribution`)
>
> 3. Probe locally:
>    ```bash
>    curl -sI http://localhost:3000/agent | rg -i 'x-robots|robots'
>    curl -sI http://localhost:3000/terms
>    curl -sI http://localhost:3000/voices
>    ```
>
> ### 1. Indexing policy (choose with env flag)
>
> Implement **environment-controlled** robots behavior:
>
> | Env | Behavior |
> | --- | --- |
> | `NEXT_PUBLIC_SITE_LAUNCH_READY=0` or unset (preview) | `noindex, nofollow` on `/agent`, `/agent/*` document pages; consider `Disallow: /agent` in robots OR keep allow but noindex meta (prefer **meta noindex** on agent surfaces so share previews still work) |
> | `NEXT_PUBLIC_SITE_LAUNCH_READY=1` | Remove preview noindex; allow indexing |
>
> - Add `metadata.robots` in `src/app/agent/layout.tsx` (and root if needed) gated on env.
> - Document in `src/lib/env.ts` if adding new public env var.
> - **Do not** remove sitemap entries without product sign-off — instead filter sitemap when preview mode.
>
> ### 2. Legal pages (minimal viable)
>
> Create Ink Band–styled utility pages (reuse `utility-shell.tsx`):
>
> - `/terms` — Terms of Service placeholder with real structure (sections: use, privacy reference, contact)
> - `/privacy` — Privacy Policy (data collected: forms, analytics, cookies; contact email)
> - `/cookies` — optional short cookie notice or redirect to privacy §cookies
>
> Link from footer if footer exists on utility surfaces; add to sitemap when launch-ready.
>
> Use plain prose — not lorem ipsum. Mark `[LEGAL REVIEW REQUIRED]` in HTML comments for counsel.
>
> ### 3. Redirect parity
>
> Reconcile [site audit](../../notes/movemental-site-audit.md) legacy 404s:
>
> - `/pricing`, `/faq`, `/evidence` → `/agent` or appropriate `/agent/*` screen (match `next.config.ts`)
> - `/voices` → `/agent/movement-voices` (308 permanent)
> - Confirm `/movement-voices`, `/scenius` aliases still work
>
> Add redirects in `next.config.ts` **and** page-level `permanentRedirect` where pattern already used.
>
> ### 4. Pricing placeholders
>
> Grep `[Free entry point to confirm]` and bracketed placeholders in `pricing-screen.tsx` / `data/pricing.ts`. Replace with honest copy ("Contact for walkable pricing") or remove bracket notation — never ship `[...]` to production HTML.
>
> ### 5. Tests
>
> - Playwright or Vitest: `/terms` returns 200
> - `/voices` redirects to movement-voices
> - Preview mode: `/agent` response includes `noindex` in metadata (test via rendered metadata helper if available)
>
> ### 6. Update site audit note
>
> Append "Remediated 2026-06-XX" section to [movemental-site-audit.md](../../notes/movemental-site-audit.md) with what changed.

---

## Definition of done

- [ ] `/terms` and `/privacy` return 200 with real structure
- [ ] `/voices` redirects to `/agent/movement-voices`
- [ ] Preview mode emits `noindex` on agent surfaces (env-gated)
- [ ] No bracketed pricing placeholders in SSR HTML
- [ ] `pnpm typecheck` green

## Verification commands

```bash
pnpm build
pnpm typecheck
curl -sI http://localhost:3000/terms
curl -sI http://localhost:3000/voices
```

## Do not

- Remove the preview announcement bar without product approval
- Block entire site in robots.txt in a way that breaks Vercel preview QA
- Publish final legal text without `[LEGAL REVIEW REQUIRED]` marker for counsel
