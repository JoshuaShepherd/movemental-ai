# html-template exemplars — agent index

> **Purpose:** Per-page entry points for auditing or porting **movemental-html-template** → **movemental-ai**. Creative law lives in [DESIGN.md](../../design/DESIGN.md); the full manifest and token map live in [MOVEMENTAL_HTML_TEMPLATE.md](../../design/MOVEMENTAL_HTML_TEMPLATE.md).

**Before any page work:**

1. Read [MOVEMENTAL_HTML_TEMPLATE.md](../../design/MOVEMENTAL_HTML_TEMPLATE.md) §3 (token translation) — never paste Oatmeal hex into `globals.css`.
2. Open the html-template file locally (`python3 -m http.server 8000` in html-template root) and the matching Next.js route in dev.
3. Compare **structure and copy**, not Playfair/oatmeal colors.

---

## Copy-paste audit prompt (any page)

> Read `docs/design/MOVEMENTAL_HTML_TEMPLATE.md` §3–§4 and `docs/design/DESIGN.md`. Open `{HTML_FILE}` in movemental-html-template and `{NEXT_ROUTE}` in movemental-ai. Diff section structure, headings, CTAs, and footnotes. Remap any lifted markup to Concept Modern semantic tokens (`bg-background`, `text-foreground`, `bg-primary`, `border-border`, `bg-inverse-surface`). Do not import Playfair, `--color-blue`, or oatmeal `--color-*` vars. Record copy drift in html-template `_reference/PAGE-MANIFEST.md` if React is canonical.

---

## R0 layout authorities

| HTML | Next.js | Primary audit focus |
| ---- | ------- | ------------------- |
| `movemental-home.html` | `/` | `.mh-*` sections vs `HomeContentNew`; mega-menu IA; `[data-committed-seats]` |
| `movemental-pricing.html` | `/pricing` | `.mp-*` tables; HTML superset sections not yet in React (§4.5 NOTES) |
| `pathway-safety.html` | `/pathway/safety` | `.flr-*` Five-Layer Read vs product wizard |
| `pathway-sandbox.html` | `/pathway/sandbox` | `.pw-*` hero + stage copy |
| `pathway-skills.html` | `/pathway/skills` | Same |
| `pathway-solutions.html` | `/pathway/solutions` | Same |
| `field-guide-safety.html` | `/field-guides/safety` | `.fg-*` hero, cover, `.fg-form` |
| `about-safestart.html` | `/about-safestart` | `.ss-*` week pairs, facilitators, FAQ |
| `movemental-paper.html` | *(none)* | Paper Edition only — do not port to `(site)` |

---

## R1/R2 marketing pages

| HTML | Next.js |
| ---- | ------- |
| `pathway-overview.html` | `/pathway` |
| `the-path.html` | `/the-path` |
| `start-with-safety.html` | `/start-with-safety` |
| `field-guides.html` | `/field-guides` |
| `field-guide-sandbox.html` | `/field-guides/sandbox` |
| `about.html` | `/about` |
| `faq.html` | `/faq` |
| `movemental-library.html` | `/library` |
| `audience-churches.html` | `/churches` |
| `audience-nonprofits.html` | `/nonprofits` |
| `audience-institutions.html` | `/institutions` |
| `voices.html` | `/voices` |
| `movement-leaders.html` | `/movement-leaders` |
| `assess.html` | `/assess` |
| `contact.html` | `/contact` |
| `evidence.html` | `/evidence` |
| `technology.html` | `/technology` |
| `how-we-use-ai.html` | `/how-we-use-ai` |
| `case-studies.html` | `/case-studies` |
| `are-we-compatriots.html` | `/are-we-compatriots` |
| `recipes.html` | `/recipes` |
| `movement-voice-commitments.html` | `/movement-voice-commitments` |
| `leader-apply.html` | `/leader/apply` |
| `safety-sign.html` | `/safety/sign` |
| `about-founder-{slug}.html` | `/about/founders/{slug}` |
| `movement-leader-{slug}.html` | `/movement-leaders/{slug}` |
| `footnotes.html` | `/footnotes` |
| `terms.html` / `privacy.html` / `cookies.html` | `/terms` / `/privacy` / `/cookies` |
| `login.html` / `forgot-password.html` | `/login` / `/forgot-password` |

**React-only (no html-template file):** `/who-we-serve`

---

## Tier D — do not sync to Movemental marketing

| HTML | Notes |
| ---- | ----- |
| `index.html`, `library.html`, `articles.html` | Alan Hirsch leader template — separate design chain intent |

---

## Product mocks

| HTML | Notes |
| ---- | ----- |
| `dashboard/charter-dashboard.html` | `.cd-*` — see `/safestart`, dashboard shells; read `dashboard/OPEN-DECISIONS.md` |

---

## Related

- [MOVEMENTAL_HTML_TEMPLATE.md](../../design/MOVEMENTAL_HTML_TEMPLATE.md) — manifest, namespaces, motion
- [STATIC_HTML_AND_TEMPLATES.md](../../design/STATIC_HTML_AND_TEMPLATES.md) — Core `1-html` tree (Concept Modern tokens)
- [stitch-to-react-migration.md](./stitch-to-react-migration.md) — Stitch screens (not html-template)
- [concept-modern-html-to-react-prompts.md](./concept-modern-html-to-react-prompts.md) — Concept Modern HTML prototypes in `1-html`
