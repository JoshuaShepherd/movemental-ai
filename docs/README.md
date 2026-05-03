# Documentation (Markdown)

This folder holds **source copy** and **reference exports** for the Movemental site (intended for a React / Next.js / Tailwind app).

## Reference implementation (Alan Hirsch MVP)

The **Alan Hirsch** deployment is the closest **MVP** for movement-leader platforms and shares the same technical lineage as what Movemental builds for nonprofits, churches, and seminaries.

- **[Alan Hirsch platform (repos + architecture)](projects/alan-hirsch/README.md)** — `alan-hirsch` (public site) and `movemental-visual-editor` (studio), feature map, and pointers to in-repo engineering docs.

## Site page copy (Trello origin)

Page and flow copy started from the **movemental.ai** Trello board; the canonical source is now Markdown on disk (not a live JSON export).

- **Index:** [content/README.md](content/README.md) (cards by list + article links)
- **Individual card files:** [content/trello-cards/](content/trello-cards/) — one Markdown file per card (`page_role: site_copy_draft` in frontmatter)

Edit those files directly for copy changes.

## Long-form articles

Canonical Markdown:

| Topic | File |
| --- | --- |
| Why Movemental exists | [content/articles/why-movemental-exists.md](content/articles/why-movemental-exists.md) |
| How the process works | [content/articles/how-it-works-process.md](content/articles/how-it-works-process.md) |
| Fundraising course | [content/articles/fundraising-course.md](content/articles/fundraising-course.md) |
| Content marketing course | [content/articles/content-marketing-course.md](content/articles/content-marketing-course.md) |
| AI Discovery Lab | [content/articles/ai-discovery-lab.md](content/articles/ai-discovery-lab.md) |

## Working notes & cross-repo indexing

- **Founder / strategy running notes:** [notes/mvmtl-running-notes-founder-input-2026-04.md](notes/mvmtl-running-notes-founder-input-2026-04.md) (draft; reconcile with sibling repos before treating as canonical).
- **Audience (canonical, agent-ready):** [business-docs/09_research_analysis/movemental-audience-comprehensive.md](business-docs/09_research_analysis/movemental-audience-comprehensive.md) — who Movemental serves, shared “high responsibility / low infrastructure” condition, segment narratives, ecosystem overlap (churches, nonprofits, parachurch, publishing, networks).
- **Agent prompt — inventory docs across `movemental`, `alan-hirsch`, `movemental-ai`:** [build/prompts/mvmtl-cross-repo-documentation-index.md](build/prompts/mvmtl-cross-repo-documentation-index.md)

## Other

- **PDF research reports:** e.g. [articles/Thought Leader Platform Research Report.pdf](articles/Thought%20Leader%20Platform%20Research%20Report.pdf) — binary asset; convert or summarize to Markdown separately if you want it searchable in-repo.
