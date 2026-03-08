# Font Pairings: Top SaaS & Fashionable Web (2024–2025)

A ranked list of **font packages** (complete heading + body pairings) sourced from top SaaS websites, design roundups, and typography research. Use this to narrow options for templates in `html/` and `app/templates`—not avant-garde, but clearly on the right side of fashionable, SaaS-appropriate web design.

---

## Scope and purpose

- **Font package** = one cohesive solution: heading font + body font (and optionally mono for code). Not individual font options.
- **Audience**: Templates that should feel at home on any modern SaaS platform or content site.
- **Sources**: Top SaaS by revenue and design (e.g. Stripe, Notion, Figma, Vercel, Slack, HubSpot, Intercom, Webflow, GitLab, Dropbox, Zapier, Framer); designer roundups; font-audit and conversion studies (2024–2025).
- **Outcome**: A finite, ranked set of pairings to choose from when defining template typography.

---

## Methodology

- Pairings were collected from:
  - Documented typography of leading SaaS (Stripe, Figma, Notion, Vercel, Slack, etc.).
  - Font-audit data (e.g. Inter on 178+ SaaS landing pages; Poppins, Lato in top usage).
  - Designer-curated roundups (SaaS UI, Google Font pairings, TypeMatch-style guides).
  - Studies noting that designer-curated pairings outperform generic AI suggestions on conversion-related metrics.
- **Ranking** considers: prevalence on top SaaS, designer recommendation strength, readability/accessibility, and availability (Google Fonts, system, or common CDN).

---

## Ranked font packages (heading + body)

Each row is a **complete package**: use that heading + body pair as the total font solution for a template.

| Rank | Heading font       | Body font        | Optional mono | Notes |
|------|--------------------|------------------|---------------|--------|
| 1    | **Inter** (Bold/Semibold) | **Inter** (Regular) | Geist Mono, JetBrains Mono | Default for many top SaaS (Notion, Figma, Stripe body). Single typeface, maximum consistency and performance. |
| 2    | **Geist Sans**     | **Geist Sans**   | Geist Mono    | Vercel’s system; modern, Swiss-inspired. Used with Inter on sites like Basedash. Strong for dev/product tools. |
| 3    | **Inter**          | **Geist Sans**   | Geist Mono    | Very common SaaS combo: Inter headings or body with Geist. Clear hierarchy, both screen-optimized. |
| 4    | **TT Norms** / **Custom display** | **Inter** | — | Stripe-style: distinct display for headings, Inter for UI and body. TT Norms is commercial; substitute with similar geometric (e.g. DM Sans, Manrope) for open stack. |
| 5    | **DM Sans**        | **Inter** or **DM Sans** | — | Modern geometric sans; works as heading or full stack. SaaS dashboards and marketing. |
| 6    | **Space Grotesk**  | **Inter** or **Source Sans 3** | Space Mono | Technical, product-forward. Good for dev tools, AI, and data-heavy SaaS. |
| 7    | **Playfair Display** | **Inter**      | — | Editorial, high-end. Used in Substack-style and content-led SaaS. Serif headline + neutral body. |
| 8    | **Poppins**        | **Inter** or **Poppins** | — | Friendly, rounded; widely used on SaaS landing pages. Safe, approachable. |
| 9    | **Montserrat**     | **Source Sans 3** or **Open Sans** | — | Classic geometric + clean body. Strong in designer roundups and enterprise-style sites. |
| 10   | **Lato**           | **Lato** or **Open Sans** | — | Warm, readable; appears in top SaaS font audits. Good for content and trust-oriented products. |
| 11   | **Manrope**        | **Inter**        | — | Clear, low-friction; recommended for fintech, productivity, and admin UIs. |
| 12   | **Montserrat**     | **Merriweather** | — | Geometric headline + bookish serif body. Data storytelling and editorial SaaS. |
| 13   | **Open Sans**      | **Playfair Display** (body) or **Open Sans** | — | Reversed or same-family. Simple and professional; Playfair adds editorial accent. |
| 14   | **Source Sans 3**  | **Inter** or **Source Sans 3** | — | Adobe’s open sans; used in Stripe’s system. Reliable for UI and long-form. |
| 15   | **Work Sans** / **DM Sans** | **DM Sans** or **Inter** | — | Variable sans pairings; good for marketing + dashboard consistency. |
| 16   | **Roboto**         | **Open Sans** or **Roboto** | Roboto Mono | Familiar, stable; content-rich interfaces. Common in AI suggestions; use when you want maximum familiarity. |
| 17   | **Lora**           | **Inter** or **Lora** | — | Warm serif option for headings or body; editorial but softer than Playfair. |
| 18   | **Plus Jakarta Sans** | **Inter** or **Geist Sans** | — | Modern humanist; pairs well with Geist in real SaaS usage. |
| 19   | **Clash Grotesk** (or similar) | **Inter** | — | Distinct display option; Airtable-style (e.g. GT Eesti) can be approximated with Clash Grotesk or similar for brand differentiation. |
| 20   | **Larsseit** / **Slack Circular** (brand) | **Slack Circular** | — | Slack-style: custom headline + body. Included as reference; substitute with similar geometric + round sans if no license. |

---

## Tier summary

- **Tier 1 (1–5)**: Most prevalent on top SaaS and design systems. Single-face Inter or Geist, or Inter + Geist, or display + Inter. Safest for “any SaaS platform.”
- **Tier 2 (6–12)**: Strong designer and audit support. Clear personality (technical, editorial, friendly) while still fashionable and readable.
- **Tier 3 (13–20)**: Proven and professional; use when you need variety or a specific tone (editorial, enterprise, maximum familiarity) without leaving the “clear side of fashionable.”

---

## Usage with project templates

- **Existing typography doc**: See `_docs/_guides/typography-2026.md` for current variant assignments (Playfair + Inter, Inter-only, etc.). This guide is the **source list** to narrow future pairings.
- **Choosing a package**: Pick one row from the table as the full font solution for a template. Avoid mixing outside that package (e.g. don’t add a third display face from elsewhere).
- **Implementation**: Prefer fonts already in the app (e.g. `app/layout.tsx`). For new fonts, use `next/font` (Google or local) and the same fallback chains as in `typography-2026.md`.
- **Accessibility**: Test at 75% zoom on a 13" screen; ensure body 16px and clear weight/size hierarchy.

---

## References (summary)

- Top SaaS typography: Stripe (TT Norms, Inter, Source Sans Pro), Figma & Notion (Inter), Vercel (Geist), Slack (Larsseit, Slack Circular).
- Font-audit data: Inter dominant on SaaS landing pages; Poppins, Lato, and others in top usage sets.
- Designer roundups: SaaS Designer, Alpha Efficiency, TypeMatch, Google Font pairing guides, Inkbot, Medley.
- Conversion/readability: Designer-curated pairings cited as outperforming generic AI pairings on demo requests, signups, and pricing engagement; limit to 2–3 fonts and clear hierarchy.

---

*Last updated from research dated 2024–2025. Re-run a quick audit of top SaaS homepages when refreshing the list.*
