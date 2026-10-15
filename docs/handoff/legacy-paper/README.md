# Kept pages on Paper (S16)

The pages kept at the October 15, 2026 cutover were still on Ink Band, each with its own header and footer. S16 moves them onto Paper. **Copy and behaviour are unchanged.** Only the chrome, layout and type changed.

- **Source of truth for pixels:** the "Kept pages" page on the Movemental canvas (Claude Design), committed here under `source/Legacy-*.dc.html`. Screens from `next dev` are in `screens/`.
- **Styles:** the "Kept pages (S16)" section at the end of `src/app/(new)/mv.css` (the same kit the boards use, plus the page wiring after it).
- **Components:** `src/components/mv/legacy/`.
- **Links:** only through `MV_ROUTES` (`articles`, `research`, `researchFindings`, `researchFlagship`, `footnotes`, `fieldGuide`, `agent`, `privacy`, `terms`, `cookies`, `signUp`, `forgotPassword`, plus `articleHref`, `researchHref`, `founderHref`).

## What moved

| Route | Board | Component | Notes |
|---|---|---|---|
| `/articles` | Legacy-Articles | `articles-library.tsx` | Kind filter chips added (UX, no copy change) |
| `/articles/[slug]` | Legacy-Article | `article-reader.tsx` | Contents rail now rendered; headings get the TOC's ids |
| `/research` | Legacy-Research | `research-views.tsx` `ResearchIndex`, `research-client.tsx` `LoadArchiveRows` | Margin note moved under the deck |
| `/research/[slug]` | Legacy-Paper | `ResearchPaper`, `PaperActions` | Bodies are still `components/research/article-bodies.tsx`; `.mv-read--research` points their CSS variables at Paper |
| `/research/findings` | Legacy-Findings | `ResearchFindingsPage` | |
| `/sources` | Legacy-Sources | `ResearchSourcesPage` | Fixed: horizontal scroll on desktop. Rows without a URL are no longer links to `#` |
| `/footnotes` | Legacy-Footnotes | `footnotes-registry.tsx` | Same substring filter. Fixed: nested `<main>` |
| `/field-guide` (`?guide=sandbox`) | Legacy-FieldGuide | `field-guide.tsx` | Same API, messages and PDFs. "Back to the agent room" and "Set up your dashboard" footer links replaced by the site footer |
| `/how-we-use-ai` | Legacy-HowWeUseAI | `how-we-use-ai.tsx`, `ask-ai.tsx` | Now the page itself. `/agent/how-we-use-ai` → 308 (`next.config.ts`); sitemap and the Ask-AI prompt updated. Agent dock removed |
| `/about/[slug]` | Legacy-Founder | `founder-profile.tsx` | Back link goes to `/about` |
| `/privacy`, `/terms`, `/cookies` | Legacy-Legal | `legal.tsx` `MvLegal` (same props as `LegalPageContent`) | |
| `/newsletter/*` | Legacy-Utility | `utility.tsx` `MvUtility` (same props as `UtilityShellView`) | |
| `/login`, `/signup`, `/forgot-password`, `/auth/update-password` | Legacy-Utility | `auth-shell.tsx` | Supabase logic untouched; shadcn `Button` replaced by `.mv-btn-ink` |

All of these now live in `src/app/(new)/`, so they get the Paper fonts and `.mv-surface`. Their old per-route layouts (newsletter, auth, research, login, signup, forgot-password) were removed. The root layout already renders `<main id="main">`, so no page adds another.

## Not in scope

Dashboards, admin and staff pages, `/assess`, `/enroll`, `/program`, share and invite token pages, redirect-only routes, `/style-finder`. The old Ink Band components (`src/v2/components/research/*`, `components/research/research-*.tsx`, `LegalPageContent`, `UtilityShellView`, `FieldGuidePageContent`, `HowWeUseAiExperience`) are no longer used by these routes. They were left in place, not deleted.

## Gates

- `pnpm typecheck`, `pnpm lint` (no new errors), `pnpm link:check` (35 hrefs resolve).
- No hex or rgb literals in the new `.tsx`. The one exception is `articles/opengraph-image.tsx`, which moved unchanged; OG images cannot read CSS variables.
- Under `next dev`: all 22 routes 200, `/agent/how-we-use-ai` 308. One `<main>` per page. No horizontal scroll at 320, 390, 1024 or 1440 on 16 pages.
- `pnpm build` cannot finish in the sandbox (Google Fonts unreachable). Vercel builds it.
