# 4 · Component map and token translation

## The token table — read before writing any component

The designs carry hex literals. The repo forbids them. Every colour used in the
designs already exists as a named variable in `src/app/globals.css`. This
mapping is exact, not approximate.

| Design hex | CSS variable | Tailwind utility | Used for |
| --- | --- | --- | --- |
| `#FBFAF6` | `--color-ink-band-bg` | `bg-background` | Page ground |
| `#F6F3EC` | `--color-ink-band-surface` | `bg-section` | Recessed bands (the "Built with" strip) |
| `#FFFDF7` | `--color-ink-band-paper` | `bg-card` | Cards, pills, raised paper |
| `#1A1A1A` | `--color-ink-band-ink` | `text-foreground` | Body and heading ink |
| `#5C5651` | `--color-ink-band-ink-muted` | `text-muted-foreground` | Secondary copy, eyebrows |
| `#E5DFD2` | `--color-ink-band-border` | `border-border` | Every hairline |
| `#0A0E1A` | `--color-ink-band-hero-dark` | — | Dark section ground |
| `#E8ECF5` | `--color-ink-band-hero-ink` | — | Ink on dark ground |
| `#22409B` | `--color-ink-band-blue` | — | Action, underline draw, hand-note ink |
| `#EAFF3A` | `--color-ink-band-highlight` | — | Marker swipe behind primary CTAs |
| `#C08A7E` | `--color-ink-band-margin-red` | — | Notebook rule **only** — never text |
| `#9C4A2D` | `--color-ink-band-margin-red-ink` | `text-destructive` | Error/required/status **text** |
| `#FBF3C4` | `--color-ink-band-sticky` | — | Sticky-note paper |

Type faces map the same way:

| Design font stack | Variable |
| --- | --- |
| `'Playfair Display', Georgia, serif` | `--font-ink-display` |
| Body sans / Inter | `--font-ink-body` |
| `'Caveat', cursive` | `--font-ink-hand` |
| `'IBM Plex Mono', ui-monospace` | `--font-ink-mono` |

Any surface using these must sit inside an element carrying `.ink-band-surface`,
which is where the Ink Band ramp is declared. `InkBandUtilityShell` applies it
for auth/admin surfaces; `src/app/agent/layout.tsx` applies it for the room.

## Anti-invention constraints

State these to the implementing agent verbatim. They read as pedantic and they
are the highest-leverage lines in this package.

- **Zero hex or rgb in component source.** Use the table above.
- **No new UI primitives.** The repo has one: `src/components/ui/button.tsx`.
  Do **not** run `shadcn add`. shadcn is configured (`components.json`, style
  `radix-nova`) which makes adding a `Card` or `Badge` a single command — and
  the result will not match Ink Band. Compose from tokens instead.
- **Never restyle the UI kit in place.** `button.tsx` serves every surface. A
  variant tweak to satisfy one screen breaks the others silently.
- **No DDL from this repo.** New tables or columns go through
  `templates/SCHEMA-REQUEST.md`. Do not run `drizzle:gen` or `drizzle:push` as
  part of this migration.
- **One package manager: pnpm.** (`03-decisions.md` L-2.)
- **No second copy of a component that already exists.** Grep before creating.
  `Card2`, `ButtonNew`, `utils2` are the signature of this failure.
- **No `tokens.ts`.** Tokens live in `globals.css` and nowhere else.

## Per-screen map

`import` = use as-is. `model` = copy the layout, do not import.

| Screen (design file) | Route | Repo files | Mode |
| --- | --- | --- | --- |
| `Movemental Home v4.dc.html` | `/agent` | `src/app/agent/page.tsx` · `agent/layout.tsx` · `components/agent-room/agent-room.tsx` · `shell/mast.tsx` · `shell/mast-audience-nav.tsx` · `shell/mast-auth.tsx` · `shell/screen-zone.tsx` · `composer.tsx` · `screen/stub/home-screen.tsx` · `screen/stub/leader-band.tsx` · `src/lib/agent-room/data/home-copy.ts` · `data/leaders.ts` | model |
| `Movemental Safety Stage.dc.html` | `/agent/path/safety` **(new)** | `src/lib/agent-room/data/safety-charter.ts` · `data/safety-flow.ts` · `data/pricing.ts` · `data/faq.ts` · `naming.ts` | model |
| `Movemental Reality Map.dc.html` | `/assess` | `src/app/assess/page.tsx` · `data/beat-catalog.ts` · `data/map-q.ts` · `screen/reality-check-beat.tsx` · `screen/readback.tsx` · `screen/readback-path-spine.tsx` | model |
| `Movemental Audience Editions.dc.html` | `/agent/churches`, `/agent/nonprofits`, `/agent/institutions` | `audience/audience-edition/churches-edition-config.ts` · `nonprofits-edition-config.ts` · `audience-edition-types.ts` · `audience-edition-experience.tsx` · `audience/institutions-config.ts` | import configs, model layout |
| `Movemental Decks.dc.html` | `/agent/{churches,nonprofits,institutions}/deck` | `agent-room/deck/{church,nonprofit,institution}-deck.ts` · `deck-types.ts` · `standalone-deck.tsx` | import data, model layout |
| `Movemental Program.dc.html` | `/program` | `src/lib/agent-room/data/pricing.ts` · `data/faq.ts` · `data/safety-flow.ts` · `src/app/program/page.tsx` | import data |
| `Movemental Enroll.dc.html` | `/enroll` | `src/app/enroll/page.tsx` · `data/pricing.ts` · `data/safety-flow.ts` | model |
| `Movemental Field Guide.dc.html` | `/field-guide` | `field-guide/page.tsx` · `layout.tsx` · `components/field-guide/field-guide-page-content.tsx` · `safety-handbook-cover.tsx` · `src/lib/field-guide-page.ts` · `src/lib/safety-field-guide.ts` | import |
| `Movemental Research.dc.html` | `/research` | `src/lib/research/data.ts` (`RESEARCH_ITEMS`, `RESEARCH_ARCHIVE`) · `components/research/research-library.tsx` | import |
| `Movemental Research Paper.dc.html` | `/research/[slug]` | `research/research-article.tsx` · `article-bodies.tsx` · `article-toc.tsx` · `research.module.css` | import |
| `Movemental Research Indexes.dc.html` | `/research/findings`, `/research/sources` | `research/research-findings.tsx` · `research-sources.tsx` · `sources-list.tsx` | import |
| `Movemental Articles.dc.html` | `/articles` | `src/app/articles/page.tsx` · `src/lib/articles.ts` · `docs/articles/*.md` frontmatter | import |
| `Movemental Article.dc.html` | `/articles/[slug]` | `articles/[slug]/page.tsx` · `components/articles/article-detail.tsx` · `article.module.css` | import |
| `Movemental Voices.dc.html` | `/voices` | `voices/page.tsx` · `src/lib/committed-voices.ts` · `components/voices/voices-hub-page.tsx` | import |
| `Movemental Voice Profile.dc.html` | `/voices/[slug]` | `voices/[slug]/page.tsx` · `components/voices/voice-detail-page.tsx` · `voice-profile.module.css` | import |
| `Movemental About Founders.dc.html` | `/about` | `src/lib/founders/content.ts` · `src/app/about/page.tsx` | import |
| `Movemental Founder Profile.dc.html` | `/about/[slug]` | `founders/content.ts` (`FOUNDER_PROFILES`) · `components/founders/founder-profile-page.tsx` · `founder-profile.module.css` | import |
| `Movemental How We Use AI.dc.html` | `/agent/how-we-use-ai` | `how-we-use-ai/how-we-use-ai-data.ts` · `how-we-use-ai-experience.tsx` | import — **already complete in repo** |
| `Movemental Footnotes.dc.html` | `/footnotes` | `src/lib/citations/eeat-registry.ts` · `eeat-site-claims.json` · `site-footnotes/footnotes-page-client.tsx` | import |
| `Movemental Shared Reality.dc.html` | `/share/ai-reality/[token]` | `share/ai-reality/[token]/page.tsx` · `components/ai-reality/dashboard.tsx` · `src/lib/ai-reality/types.ts` | import |
| `Movemental Utility Shell.dc.html` | `/newsletter/*` only — see drift | `ink-band/utility-shell.tsx` · `utility-page-nav.tsx` · `step-spine.tsx` · `legal-page-content.tsx` | import |
| `Movemental Dashboard.dc.html` | `/dashboard`, `/dashboard/safety`, `/dashboard/onboarding/*` | `src/lib/services/safety/charter-dashboard.ts` · `provision-safety-org.ts` · `safety-dashboard/charter-dashboard-shell.tsx` · `data/safety-charter.ts` | model |

Wordmark on every screen: `src/components/brand/movemental-logo.tsx` — import,
subject to C-2.
