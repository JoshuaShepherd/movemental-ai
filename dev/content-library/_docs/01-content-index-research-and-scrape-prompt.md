# Prompt 1: Movement Leader Content Index, Timeline, Research & Scrape

**Audience:** Claude/Cursor agent or human researcher  
**Purpose:** Research, verify, index, and collect all digitally available content (text) produced by a movement leader to date—for use in Movemental templates, mock-ups, and platform development.  
**Context:** Movement leaders include Dave Ferguson, Mark Sayers, Brad Brisco, Alan Hirsch, Michael Frost, and others documented in `_docs/movement_leader_research/`.

---

## Scope

Produce a **complete, verified index and timeline** of every digitally available work:

- **Books** (print, ebook, PDF, excerpts, sample chapters)
- **Articles & blog posts** (personal site, Substack, Medium, third-party)
- **Podcasts** (owned shows, guest appearances, interviews)
- **Video** (YouTube, Vimeo, church site, conference recordings)
- **Courses & curriculum** (LMS, Teachable, Kajabi, free PDFs)
- **Newsletters** (Substack, Mailchimp, church bulletins)
- **Speaking notes, transcripts, PDF resources**
- **Church/organization site content** (sermons, teaching series, blog)
- **Third-party publications** (New Churches, ChurchLeaders, etc.)

If it exists online and the leader authored or co-authored it, it belongs in the index.

---

## Phase 1: Discovery & Research

### 1.1 Identify All Digital Properties

1. **Primary websites**
   - Personal domain (e.g. daveferguson.org, alanhirsch.org)
   - Church or ministry site
   - Organization sites (NewThing, Exponential, Forge, etc.) where the leader has authored content

2. **Publishing platforms**
   - Substack, Medium, WordPress
   - Amazon Author Central, Goodreads
   - Publisher pages (Baker, Zondervan, NavPress, etc.)

3. **Audio**
   - Own podcast(s)
   - Guest appearances (search: `"[Leader Name]" podcast`)
   - Sermon/teaching archives (church site, podcast feeds)

4. **Video**
   - YouTube channel(s) (personal, church, conference)
   - Vimeo, Vimeo Showcase
   - Conference platforms (Exponential, Sentralized, etc.)

5. **Social & professional**
   - LinkedIn articles
   - Twitter/X threads (if substantive)
   - Facebook (if used for long-form)

6. **Institutional**
   - Seminary/college courses (public syllabi, open content)
   - Training program materials (Forge, 100Movements, etc.)

### 1.2 Build the Master Index

Create a markdown document: `[leader-slug]-CONTENT-INDEX.md` with this structure:

```markdown
# [Leader Full Name]: Content Index

**Research date:** YYYY-MM-DD
**Leader slug:** [leader-slug]
**Sources verified:** [list of primary URLs]

---

## 1. Books (chronological)

| Year | Title | Co-authors | Publisher | Formats | URLs (Amazon, publisher, sample PDF) |
|------|-------|------------|-----------|---------|--------------------------------------|
| 2006 | The Forgotten Ways | — | Brazos | Print, eBook | [link] [link] |

---

## 2. Articles & Blog Posts

### 2.1 Primary blog/site
- **URL:** [base URL]
- **Platform:** WordPress / Substack / etc.
- **Posts:** [count if known]

| Date | Title | URL | Word count (est) |
|------|-------|-----|------------------|
| 2024-01-15 | Article title | https://... | 1200 |

### 2.2 Third-party publications
- **Platform** | **Role** | **Sample URLs**
- New Churches | Contributor | [link] [link]
- ChurchLeaders | Author | [link]

---

## 3. Podcasts

### 3.1 Owned show(s)
- **Show name** | **Platform** | **Episodes** | **Feed URL**

### 3.2 Guest appearances
| Date | Show | Episode # | Title | URL |
|------|------|-----------|-------|-----|

---

## 4. Video

### 4.1 YouTube
- **Channel** | **URL** | **Relevant videos (count or list)**

### 4.2 Other
- Vimeo, conference recordings, church site, etc.

---

## 5. Courses & Curriculum

| Name | Type | Platform/URL | Status |
|------|------|--------------|--------|
| Missional Essentials | 12-week curriculum | [link] | Active |

---

## 6. Newsletters

| Name | Platform | Archive URL | Frequency |
|------|----------|-------------|-----------|

---

## 7. Other (PDFs, resources, syllabi)

| Item | URL | Notes |
|------|-----|-------|
```

### 1.3 Verification Rules

- **Verify each URL** — Ensure links resolve; note 404s or moved content.
- **Capture dates** — Use publication date when available; otherwise "unknown."
- **Attribute co-authors** — Note co-authors for books, articles, and curriculum.
- **Cross-reference** — Use `_docs/movement_leader_research/` author-research and digital-presence-discovery files to validate and extend the index.

---

## Phase 2: Scraping & Collection

### 2.1 Ethical and Legal Guidelines

- Respect `robots.txt` and rate limits.
- Do not scrape paywalled or login-only content without permission.
- For books: Use Amazon/preview, publisher sample chapters, or author-provided excerpts only.
- Preserve original URLs and publication dates in metadata.
- Prefer RSS/API over aggressive scraping when available.

### 2.2 Scraping Strategy by Content Type

| Content type | Method | Output format |
|--------------|--------|---------------|
| Blog/Substack articles | RSS feed + per-article fetch, or sitemap crawl | Markdown or HTML per article |
| YouTube transcripts | YouTube Data API or transcript services | Plain text or markdown |
| Podcast episodes | RSS feed metadata; transcripts if available | JSON + transcript files |
| PDFs | Direct download (when openly linked) | PDF + extracted text |
| Amazon/preview | Manual or structured data; no full-text scraping | Metadata only (title, year, co-authors, URL) |

### 2.3 Tooling Recommendations

- **RSS:** Use feed URLs (e.g. `site.com/feed`, `substack.com/feed/...`) for article discovery.
- **Sitemaps:** `site.com/sitemap.xml` for comprehensive URL discovery.
- **wget/curl:** For respectful batch fetching of HTML.
- **Puppeteer/Playwright:** Only when JavaScript-rendered content is required.
- **yt-dlp:** For YouTube video metadata and transcripts (when permitted).
- **Manual backup:** For complex or paywalled sources, document URLs and key metadata for human collection.

### 2.4 Output Directory Structure

```
dev/content-library/[leader-slug]/
├── _docs/
│   └── [leader-slug]-CONTENT-INDEX.md      # Master index (Phase 1)
├── articles/
│   ├── [slug]-[YYYY-MM-DD]-[short-title].md
│   └── metadata.json                        # Per-article: url, date, title, source
├── books/
│   └── metadata.json                        # Book metadata only (no full text)
├── podcasts/
│   ├── episodes-metadata.json
│   └── transcripts/                         # If available
│       └── [show-slug]-ep[NNN].md
├── video/
│   └── metadata.json                        # Video metadata + transcript URLs
├── courses/
│   └── metadata.json
└── raw/                                     # Original HTML/PDF when needed
    └── ...
```

---

## Phase 3: Formatting for Templates & Mock-ups

### 3.1 Target Formats

Content must be usable in:

1. **HTML templates** (`html/[leader]/` editorial mock-ups)
2. **Database seed** (`write` + `write_content` per `_docs/guides/prospective-writers-content-format.md`)
3. **Content audit** (per `_docs/movement_leader_research/author-research/*_CONTENT_AUDIT.md`)

### 3.2 Article Format (for templates and DB)

Each article file should include:

```markdown
---
title: "[Article Title]"
source: "[Blog/Platform Name]"
url: "https://..."
published_at: "YYYY-MM-DD"
author: "[Full Name]"
content_type: "article"
---

# [Article Title]

[Full or excerpted body — plain text or markdown. For cards use ~200 words; for full use complete text.]
```

### 3.3 JSON for Prospective Writers Seed

Produce a JSON file compatible with `scripts/seed-write-content.ts`:

```json
{
  "writers": [{
    "full_name": "[Leader Full Name]",
    "slug": "[leader-slug]",
    "bio": "...",
    "role": "...",
    "organization": "...",
    "tags": ["..."],
    "content": [
      {
        "title": "[Article/Book Title]",
        "content_type": "article|book|talk|quote",
        "body_excerpt": "[~200 words for cards]",
        "body_full": "[Full text if available]",
        "url": "https://...",
        "metadata": { "published_at": "YYYY-MM-DD", "source": "..." }
      }
    ]
  }]
}
```

### 3.4 Content Audit Summary

Generate a summary section suitable for `*_CONTENT_AUDIT.md`:

- Content inventory matrix (books, articles, podcasts, video, courses)
- Volume and frequency assessment
- Gaps (e.g. no recent video, no owned podcast)
- Repurposing opportunities

---

## Phase 4: Organization & Logic

### 4.1 Chronological Order

- Books: Publication year (or season when known).
- Articles: Publication date descending (newest first).
- Podcast appearances: Episode date.
- Video: Upload or event date.

### 4.2 Thematic Grouping (optional)

For templates, group content by theme (from `content-analysis` or `content-marketing-playbook`):

- Leadership multiplication
- Church planting
- Missional living
- Spiritual formation
- etc.

### 4.3 Deduplication

- Same article republished on multiple sites → Keep one canonical URL (prefer primary site).
- Podcast episode = one record; note if transcript exists separately.

---

## Completion Checklist

- [ ] All digital properties identified and listed.
- [ ] Master index `[leader-slug]-CONTENT-INDEX.md` complete with verified URLs.
- [ ] Articles scraped and saved as markdown with metadata.
- [ ] Book and video metadata captured (no unauthorized full-text).
- [ ] Podcast episodes and transcripts (if available) indexed.
- [ ] JSON produced for `seed-write-content.ts`.
- [ ] Content audit summary written.
- [ ] Files organized under `dev/content-library/[leader-slug]/` per structure above.
- [ ] Cross-referenced with existing `_docs/movement_leader_research/[leader]/` and `author-research/` files; discrepancies noted.

---

## Reference Documents

| Document | Purpose |
|----------|---------|
| `_docs/movement_leader_research/tam-search/02-CANDIDATE-PROFILES.md` | Leader list and domains |
| `_docs/movement_leader_research/*/digital-presence-discovery.md` | Existing platform discovery |
| `_docs/movement_leader_research/author-research/*_CONTENT_AUDIT.md` | Content audit format |
| `_docs/movement_leader_research/author-research/*_TIMELINE.md` | Book/event timeline format |
| `_docs/guides/prospective-writers-content-format.md` | JSON schema for seed script |
| `html/[leader]/PROMPT.md` | Template page requirements |
