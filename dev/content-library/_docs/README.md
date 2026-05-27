# Content Library: Research & Collection Prompts

**Purpose:** Standard prompts for researching, indexing, and collecting all digitally available content and media for movement leaders (Dave Ferguson, Mark Sayers, Brad Brisco, Alan Hirsch, Michael Frost, and others) for use in Movemental templates, mock-ups, and platform development.

---

## Prompts

| # | File | Purpose |
|---|------|---------|
| **1** | [01-content-index-research-and-scrape-prompt.md](./01-content-index-research-and-scrape-prompt.md) | Research, verify, and index all text content (books, articles, podcasts, video, courses, etc.); guide scraping and formatting for templates and DB seed |
| **2** | [02-media-library-research-and-collect-prompt.md](./02-media-library-research-and-collect-prompt.md) | Research, verify, and collect all images (headshots, book covers, featured images, podcast art, etc.); organize for `public/media-library/` and templates |
| **3** | [03-dev-workspaces-check-and-index-prompt.md](./03-dev-workspaces-check-and-index-prompt.md) | Check all workspaces under `dev/`, index their structure and contents, and produce `dev/DEV-WORKSPACES-INDEX.md` |

---

## Workflow

1. **Start with Prompt 1** — Build the content index and scrape/format text content.
2. **Then Prompt 2** — Build the media index and collect/organize images.
3. **Use Prompt 3** — Check and index dev workspaces (run on demand or after adding content).
3. **Output locations:**
   - Content: `dev/content-library/[leader-slug]/` (articles, metadata, JSON)
   - Images: `public/media-library/images/headshots/[leader-slug]/`, `.../books/[leader-slug]/`, etc.
   - Indexes: `dev/content-library/[leader-slug]/_docs/` or `_docs/movement_leader_research/[leader]/`
   - Dev workspaces index: `dev/DEV-WORKSPACES-INDEX.md` (from Prompt 3)

---

## Leader References

- **TAM Master List:** `_docs/movement_leader_research/tam-search/01-MASTER-RANKED-LIST.md`
- **Candidate Profiles:** `_docs/movement_leader_research/tam-search/02-CANDIDATE-PROFILES.md`
- **Existing Research:** `_docs/movement_leader_research/[leader]/` (digital-presence-discovery, content-analysis, etc.)
- **Author Research:** `_docs/movement_leader_research/author-research/` (*_CONTENT_AUDIT.md, *_TIMELINE.md)
