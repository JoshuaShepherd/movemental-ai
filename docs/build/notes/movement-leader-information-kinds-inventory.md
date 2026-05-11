# Movement leader research — inventory of information kinds

**Purpose.** Catalog every *kind* of information that currently exists about movement leaders in [docs/movement_leader_research/](../../movement_leader_research/), independent of where it should ultimately surface. A separate pass will assign each kind to:

- **Public site / EEAT** — what is shown on movemental.com (`/voices`, leader profile pages, credibility bands, scenius graph) to demonstrate Experience, Expertise, Authoritativeness, and Trust to readers and search engines.
- **Author dashboard** — what is shown back to the leader themselves (inside the platform's authenticated dashboard) for self-awareness, content strategy, gap closure, calling alignment, and onboarding.

No assignments are made here. This is the **what-exists** map.

**Last updated**: 2026-05-11.

---

## 0. Orientation — how the corpus is shaped

[docs/movement_leader_research/](../../movement_leader_research/) contains one folder per leader (slug), plus a handful of cross-leader assets. There are **~150 leader slugs** in the manifest ([manifest.json](../../movement_leader_research/manifest.json), 2026-04-29 generation) at very uneven depth:

| Tier | File count | Example leaders | Shape |
|------|-----------|-----------------|-------|
| **Deep baseline** | 30–50 files across nested subfolders | `alan-hirsch/` (49), and the canonical structure replicated across `brad-brisco/`, `michael-frost/`, `josh-shepherd/`, `tim-catchim/`, `jr-woodward/`, `rowland-smith/`, `liz-rios/`, `lucas-pulley/`, `rob-wegner/`, `mark-sayers/`, etc. | Full `profile/`, `content/`, `digital-presence/`, `media/`, `network/`, `analysis/`, `pdf/` structure plus top-level executive docs. |
| **Mid-depth (single-pass)** | ~7 files, flat | `michael-frost/`, `alan-mcwilliam/`, `rich-robinson/`, `kurt-rietema/`, `tim-catchim/`, `rick-warren/`, `rowland-smith/`, `peyton-jones/`, `mark-sayers/` | Flat list: `summary.md`, `content-analysis.md`, `identity-verification.md`, `digital-presence-discovery.md`, `gap-analysis.md`, `movemental-analysis.md`, `sources.md`, `pdf/` |
| **Stub / unstarted** | 2 files (README + tracker) | `curt-thompson/`, `dan-kimball/`, `reggie-mcneal/`, `jose-humphreys/`, and most of the long tail | Placeholder `README.md` + `_tracker.md` showing checklist of areas to populate. |

Inventory below describes information kinds as they appear in the deep-baseline tier; mid-depth and stub leaders are subsets of the same kinds.

**Cross-leader assets** (sibling of the per-leader folders):

- [manifest.json](../../movement_leader_research/manifest.json) — machine-readable index of slugs + file counts.
- [index.html](../../movement_leader_research/index.html), [reader.js](../../movement_leader_research/reader.js), [mlr-reader.css](../../movement_leader_research/mlr-reader.css), [generate-manifest.mjs](../../movement_leader_research/generate-manifest.mjs) — a static reader app over the corpus.
- [network/](../../movement_leader_research/network/) — `network-map.md` + `network-graph.json` (47 leaders, 83 edges, 7 clusters, last update 2026-04-29).
- [audience/](../../movement_leader_research/audience/) — `core-audience-list.md` (37 individuals identified as the Movemental core audience).
- [profiles/](../../movement_leader_research/profiles/) — separate folder used only for **headshot source images** (alan-hirsch, mandy-smith, john-m-perkins, michael-frost, george-patterson, lucas-pulley).
- [reflected-understanding/](../../movement_leader_research/reflected-understanding/) — second-person "reflection spoken back" essays (currently `alan-hirsch.md`, `brad-brisco.md` + `README.md`).
- [tam-search/](../../movement_leader_research/tam-search/) — TAM/candidate work: master ranked list, candidate profiles, rubric, search plan, content-search strategy, field map, plausible-TAM alphabetized list, **`HEADSHOT-MANIFEST.csv`**, `fetch-wiki-headshots.py`.
- [quadw-foundation/](../../movement_leader_research/quadw-foundation/) — `content-marketing-playbook.md` (org-level, not a leader).
- [alan-hirsch-baseline-report.md](../../movement_leader_research/alan-hirsch-baseline-report.md) — system-level analysis of Hirsch's whole influence stack (TAM, constraints, opportunity sizing).
- [site-voices-eeat-audience-credentials.md](../../movement_leader_research/site-voices-eeat-audience-credentials.md) — already-existing **EEAT mapping** for the nine voices named on the public site (Churches / Nonprofits / Institutions × Experience / Expertise / Authoritativeness / Trust).

---

## 1. Identity & verification (`profile/identity.md` + `identity-verification.md`)

What appears, per leader:

- **Canonical identity table** — full legal name, "known as / goes by," birth date, birthplace, childhood location, current location, nationality, primary role(s), primary organization(s), US sponsor/employer. Each row tagged with **confidence** (VERIFIED / LIKELY / LOW) and **source URL** (Wikipedia, alanhirsch.org, IVP author page, Prabook, Internet Archive, etc.).
- **Disambiguation block** — list of other public figures sharing the same name, with explicit "this is NOT our subject" notes (e.g. four different "Alan Hirsch" persons disambiguated). Includes "reliable disambiguation modifiers" — keyword combinations that uniquely identify the subject in search.
- **Education table** — institution, degree/study, field, year, source URL. Notes on debunked attributions (e.g. Radboud University Nijmegen turned out to be the wrong Alan Hirsch).
- **Career timeline table** — year(s), role, organization, source. Granular: 1959 born → 1983 emigration → 1989 graduation → 1989-2004 pastorate → 1994 director role → 1996 Forge co-founding → 2009 Future Travelers → 2010 Wheaton M.A. → 2016 100Movements & 5Q Collective → present.
- **Family & personal** — spouse, siblings, heritage (Jewish / South African / Australian), conversion story, denominational ordination context, political formation, community affiliations (e.g. The Tribe of LA).
- **Confidence label** on the file overall (HIGH/MEDIUM/LOW) + **last-updated date**.

In a few leaders this also includes earlier-pass `identity-verification.md` at the leader-folder root (less structured, January 2026 phrasing) — the `profile/identity.md` version is the canonical one.

## 2. Biography & narrative (`profile/biography.md`, `biography.md`)

Long-form prose biography organized as:

- **Narrative biography** — 1–2 paragraph executive summary positioning the leader in their field.
- **Origin & formation** — childhood, formative experiences, conversion / vocational call.
- **Career & ministry arc** — chronological narrative tying jobs, books, and organizational founding into a story.
- **Current focus** — what they are doing now (orgs, roles, residence, communities).
- **Key relationships & influences table** — Person | Relationship | Significance. Captures co-authors, ministry partners, intellectual influences (e.g. Newbigin, Bonhoeffer, Roland Allen for Hirsch).
- **"In their own words" pull quotes** — 3–5 representative quotes with book/source citations.

## 3. Theological / framework profile (`profile/theology.md`)

- **Core thesis** — one paragraph naming their central argument.
- **Theological tradition** — primary + secondary influences, denominational context, ordination history.
- **Key frameworks & models table** — named system | description | where developed. For Hirsch: mDNA, APEST/5Q, Incarnational Mission, Metanoia, Movemental Thinking, Christology > Missiology > Ecclesiology cascade, theo-genetic codes, Reframation, etc.
- **Distinctive positions** — bullet list of theological claims that are recognizably this leader's.
- **Hermeneutical posture** — e.g. Hebraic vs Hellenistic, post-Christendom, Anabaptist-influenced.

## 4. Voice & style (`profile/voice-analysis.md`, plus `AUTHOR_PROFILE_PRESENTATION_STANDARDS.md` for Hirsch)

- **Voice summary** — one paragraph describing the leader's distinctive sound.
- **Writing characteristics matrix** — register, complexity, tone, storytelling, humor, scripture use, with one assessment paragraph each.
- **Signature phrases** — recurring vocabulary the leader has either coined ("movemental," "Apostolic Genius," "mDNA") or branded ("not X but Y" contrast structures, "the forgotten ways").
- **Favorite metaphors** — DNA/genetics, virus/organic spread, seed/womb, starfish vs spider, exile/return, etc.
- **Argument structure** — the typical rhetorical sequence the leader uses (provocation → historical grounding → framework → practical implication → call to action).
- **Opening style** — how the leader typically opens a chapter or talk.
- **Contrast structures** — binary pairings that act as cognitive disruption.
- **Sample passages** — direct quoted prose with source citation.
- **Speaking vs writing differences** — how the leader's spoken voice differs (warmer, more humorous, more passionate) from their written voice.

For Hirsch specifically, a **`AUTHOR_PROFILE_PRESENTATION_STANDARDS.md`** also exists — a deeply detailed voice & style guide grounded in a corpus analysis of all 13 published books (timeline, organizational period, books, frameworks).

## 5. Calling profile (`ALAN_HIRSCH_CALLING_PROFILE.md` and similar)

Distinct from biography or theology — frames *what the leader is called to do*:

- **Synthesized calling statement** — one-paragraph answer to "what is this person *for*?"
- **Core calling elements** — bulleted vocational identities (e.g. "Movement Catalyst," "Framework Builder," "Equipper of Leaders").
- **mDNA / framework alignment** — for movement-oriented leaders, alignment scoring per element of the framework they teach.
- **Movement leadership indicators** — observable signals that this person plays a movement-leader (not just thought-leader) role.
- **Content-to-calling alignment** — analysis of whether their current content actually serves their calling.
- **Digital calling opportunity map** — where calling and digital strategy intersect.

## 6. Content catalog — books (`content/books.md`)

Per book:

- Author(s), publisher, published date, ISBN-13, page count, formats (paperback / eBook / audiobook), Amazon URL, Goodreads URL.
- **Description** paragraph.
- **Key themes** tags.
- Co-author / foreword / editor relationships.
- **Audiobook gap flag** — explicit notes when no Audible audiobook exists for foundational titles.
- Notes on revised editions vs originals.

Aggregate counters at the top: total books, solo vs co-authored split.

## 7. Content catalog — articles & blog posts (`content/articles.md`)

Per article:

- Date, title, URL, publication, type (article / interview / series / video), status (active / dead-link).
- Grouped by publication (Saturate, Verge Network, Exponential, Christianity Today, Missional Church Network, etc.).
- Notes on series memberships and contributor profiles on each publication.

## 8. Content catalog — audio (`content/audio.md`)

- **Podcasts hosted** — show name, role, co-host, Apple/Spotify/RSS URLs, total episodes, start date, last episode, frequency, rating, description.
- **Guest appearances** — total guest episodes, unique podcasts, date range, then individual episodes with show, host, date, topic, URL.
- Sermon / talk audio if separate from podcasts.

## 9. Content catalog — videos (`content/videos.md`)

- Whether the leader has their **own YouTube channel** (Hirsch does not; many do not).
- **Video catalog table** — title, channel/platform, date, type (keynote / interview / podcast-video), URL.
- **Top videos by prominence/reach** vs **recent videos** (last 2–3 years).
- Notes on distribution pattern (org channels vs third-party channels) and what that says about their digital strategy.

## 10. Content catalog — courses & training (`content/courses.md`)

Per course:

- Platform (5Q Central, Ephesiology, Forge Teachable, Wheaton M.A., seminary adjunct programs).
- URL, instructors, format (video / self-paced / cohort), duration, price, status.
- Description and target outcomes.

## 11. Content catalog — academic publications (`content/academic.md`)

- **Google Scholar profile** — URL, h-index, total citations, i10-index (often "not found" for practitioners).
- **Works referenced in academic contexts** — year, title, publisher/venue, type, notes on academic reception.
- **Academic reviews** of their works — reviewer, journal/venue, URL.
- Notes on whether they fit the "practitioner-theorist" mold vs traditional academic.

## 12. Digital presence — websites (`digital-presence/websites.md`)

Per website:

- Domain, platform (Squarespace / WordPress / custom), status, has-blog (y/n), has-newsletter-signup (y/n), has-store (y/n), has-free-resources (y/n), has-assessments (y/n), has-FAQ (y/n).
- Key pages list.
- Site structure narrative.
- Content inventory table (page | URL | content type | notes).

For leaders running multiple sites (Hirsch has 6+ owned domains), each is profiled.

## 13. Digital presence — newsletters & email (`digital-presence/newsletters.md`)

- Platform (Substack / Mailchimp / ConvertKit), subscribe URL, frequency, subscribers, free vs paid, launch context.
- Recent posts (title, date, topic).
- Content style narrative.

## 14. Digital presence — social media (`digital-presence/social-media.md`)

- Per-platform table — handle, follower count, posts, frequency, last active, status.
- Per-platform detail blocks: URL, bio, links in bio, content style, engagement, notable observations.
- Gaps (e.g. "no YouTube channel," "Instagram dormant," "not on TikTok").

## 15. Digital presence — platform listings (`digital-presence/platforms.md`)

- **Course & learning platforms** — table of every platform they appear on (5Q Central, Ephesiology, Mx Training, seminary M.A.s, plus mainstream-platform absences like Teachable / Thinkific / Udemy / Skillshare).
- **Assessment tools** — APEST Assessment, APEST 360, mPULSE, etc. with URLs and descriptions.
- **Academic platforms** — Google Scholar, Academia.edu, ResearchGate (often "not found").
- **Publisher author pages** — IVP, Baker, Brazos, etc.

## 16. Media — academic citations (`media/citations.md`)

- Google Scholar profile data (URL, estimated citation count, h-index).
- **Most-cited works** with key citers (e.g. Scot McKnight, Ed Stetzer, Craig Van Gelder, Darrell Guder).
- **Key academic engagement** — who in academia engages with the leader's work and how (blog series, peer reviews, seminary course adoption).

## 17. Media — press coverage (`media/press-coverage.md`)

- **Featured coverage** table — date, publication, title, type (feature / interview / profile), URL.
- **News mentions** table.
- **Passing mentions** table.
- Aggregate count of press mentions.

## 18. Media — book reviews (`media/reviews.md`)

- **Review summary by book** — reviews found, average sentiment, Goodreads rating + count, Amazon rating.
- **Detailed reviews per book** — professional/editorial reviews + reader review patterns.
- Pulled "key praise" and "key criticism" quotes.

## 19. Network — collaborators (`network/collaborators.md`)

- **Network summary counts** — co-authors, endorsers (received), endorsements given, forewords (both directions), frequent collaborators, theological allies, **known tensions**.
- **Per-collaborator block** — joint works, relationship type, their platform, active status, "Movemental candidate?" flag, narrative notes.

## 20. Network — endorsements (`network/endorsements.md`)

- **Forewords written for them** — author, book, year, notes.
- **Back-cover endorsements received** — endorser, book, year, quote excerpt.
- **Endorsements given** — to whom, for what book.
- **Forewords written** — for whom.

## 21. Network — events (`network/events.md`)

- **Upcoming events** — date, event, location, role, URL.
- **Speaking availability** — accepts invitations (y/n), speaking bureau, booking contact, topics offered, typical fee range, notes on how they monetize speaking.
- **Event history by year** — date, event, location, type (conference-keynote / training / seminar), role, audience estimate, source URL.
- Aggregate count of documented events.

## 22. Network — organizations (`network/organizations.md`)

For each organization the leader founded, leads, or affiliates with:

- Website, role, status (active / now-led-by-others / inactive), year started, mission, **prominence score (1–10)**, confidence (HIGH/MEDIUM/LOW), source URL.
- Narrative notes (co-founders, vision, publishing arms, current trajectory).
- Aggregate count: e.g. Hirsch — 27 documented organizations across founder / leader / faculty / advisory / partner relationships.

## 23. Analysis — content (`analysis/content-analysis.md`)

- **Executive summary** — what this leader's distinctive intellectual contribution is.
- **Theme map** — primary themes (core to identity), secondary themes (recurring but not defining), tertiary themes.
- Per theme: description, key works, centrality score (1–10).
- Frameworks-to-themes mapping.
- Content evolution over time (how themes have shifted).

## 24. Analysis — audience (`analysis/audience-analysis.md`)

- **Direct audience metrics** table — channel | metric | count | date | confidence (Twitter followers, FB followers, podcast episodes, assessment completions, Goodreads ratings, Amazon presence, etc.).
- **Publishing reach** — total ratings, editions, implied total readership.
- **Audience segments** — % of active audience by segment (church planters / reforming pastors / academic practitioners / international leaders, etc.) with persona descriptions.
- **Audience consumption preferences** by segment.
- **Distribution channel mapping** — where each segment encounters them.
- **Unmet needs / content gaps** — what the audience wants but isn't getting.

For top-tier leaders there is also `ALAN_HIRSCH_AUDIENCE_PROFILE.md` style **stand-alone audience profile** — TAM analysis, segment personas, market size estimates, growth trends.

## 25. Analysis — gap (`analysis/gap-analysis.md` + `gap-analysis.md`)

- **Executive summary** — the structural gap between current embodied influence and digital infrastructure.
- **Content format gaps** — what exists | volume | quality | last-updated.
- **Digital presence scoring** — owned platform sophistication (often 3.2/5 type score).
- **Distribution gaps** — where the leader is absent (e.g. no YouTube channel despite 38+ scattered videos).
- **Conversion gaps** — e.g. 37.9K Twitter → 1.5K newsletter (4% vs industry baseline 15–25%).
- **Audience pipeline gaps** — assessment-to-pathway dead-ends.

## 26. Analysis — Movemental fit (`analysis/movemental-fit.md` + `movemental-analysis.md`)

- **Fit score across dimensions** — content volume, content quality, audience alignment, platform need, network effects, digital maturity, growth potential. Each 1–10 with notes.
- **Overall fit score** out of 10.
- **What Movemental would change for this author** — specific problems Movemental solves for this leader.
- **Platform fragmentation impact** narrative.
- **Cross-platform integration recommendations**.

## 27. Analysis — competitive landscape (`analysis/competitive-landscape.md`)

Frequently a stub awaiting `/author-gap-analysis` skill run, but when populated includes peer authors in the same space, positioning differences, and white-space opportunities. Currently sparse across the corpus.

## 28. Fragmentation story (`fragmentation-story.md`)

Narrative-style essay generated by the `fragmentation-story` skill describing:

- The leader's body of work in numbers (books, editions, readers, assessment completions, organizations founded, seminary affiliations).
- Where each piece of content currently lives and how it does not connect to the rest.
- The single most-telling fragmentation data point (for Hirsch: "150K APEST completions → no onward journey").
- Format-by-format inventory of where content is trapped (books, audio, video, social, email, translations).
- The thesis that fragmentation is caused by book/retailer/org-shaped containers that don't talk to each other.

## 29. Affinity rubrics & ranked lists (`hirsch-affinity-rubric.md`, `hirsch-affinity-ranked-list.md`)

- **Affinity rubric** — dimensions and scoring methodology for measuring conceptual/relational closeness to a reference leader (Hirsch). Designed to be completable without reading the source books, using web search, citations, affiliations, observable language.
- **Ranked list** — 500 candidates scored against the rubric, banded (Core 85–100 / High 65–84 / Moderate 45–64 / Low 25–44 / Minimal 0–24), with score, domain, evidence per row.
- These rubrics are reusable per leader (the Hirsch one is the canonical example).

## 30. Content marketing playbook (`content-marketing-playbook.md` + `.pdf`)

Second-person strategic essay addressed *to the leader directly*:

- Diagnoses their current content ecosystem.
- Names the gap between embodied work and digital infrastructure.
- Maps specific repurposing opportunities (conference talk → article series; lecture → blog series; consulting insight → content).
- Argues for content interconnection as the multiplier.
- Sketches the hub-and-spoke architecture the leader could build.

Both `.md` and rendered `.pdf` exist for several leaders.

## 31. Reflected understanding (`reflected-understanding/<slug>.md`)

Distinct top-level cross-leader folder. Second-person reflective essay structured as:

1. **Calling** — what they are called to do, in their own language.
2. **Audience** — who responds, personas, TAM context.
3. **Existing content** — where it lives before the platform.
4. **What's missing / where it's stuck**.
5. **What the platform would change**.
6. **The deeper edges** — what the leader may not yet see about their own work.
7. **Closing**.

Tone: "spoken back so the leader could endorse the language — familiar, with edges that deepen." Used for onboarding and "meet you where you are" copy. Currently exists for `alan-hirsch.md` and `brad-brisco.md`.

## 32. Top-level executive synthesis docs (Hirsch baseline only, so far)

For Hirsch — and intended as the template for top-tier voices:

- `ALAN_HIRSCH_COMPLETE_PROFILE.md` — single-document master profile, all dimensions consolidated.
- `ALAN_HIRSCH_AUTHOR_PROFILE.md` — author intelligence (bio, frameworks, voice, digital presence) for content strategy.
- `ALAN_HIRSCH_AUDIENCE_PROFILE.md` — TAM, segments, personas, consumption patterns, unmet needs.
- `ALAN_HIRSCH_CALLING_PROFILE.md` — synthesized calling statement, mDNA alignment, digital calling opportunity map.
- `ALAN_HIRSCH_CONTENT_AUDIT.md` — full content inventory with performance analysis and repurposing roadmap.
- `ALAN_HIRSCH_ORGS.md` — narrative version of `network/organizations.md` with logos referenced.
- `ALAN_HIRSCH_TIMELINE.md` — exhaustive year-by-year chronology + corpus-grounded voice & style guide (note: largest single file at ~52KB).
- `ALAN_HIRSCH_PROFILES_INDEX.md` — index of all the above for the leader.
- `AUTHOR_PROFILE_PRESENTATION_STANDARDS.md` — presentation standards (40% structured / 60% interpretive prose, target 1,000–1,300 words, visual-first) for how these profiles should be rendered.

## 33. Sources & research metadata

Per leader:

- `sources.md` — search queries used, websites consulted, documents/PDFs referenced, organizational sources, publication databases.
- `_tracker.md` — checklist of research areas with status (Not started / In progress / Complete) and last-updated dates.
- `README.md` — folder README with quick-reference (score, domain, cluster) and status checklist.
- **Last-updated date** stamps on every research file.
- **Confidence labels** (HIGH / MEDIUM / LOW / VERIFIED) on individual claims and on whole-file headers.
- `pdf/<slug>-research-packet.pdf` — bundled PDF of the leader's full research packet for offline / distribution use.
- `summary.pdf`, `content-marketing-playbook.pdf` — rendered PDFs of the corresponding markdown.

## 34. Headshots & visual assets

- [profiles/<slug>/media/headshot/](../../movement_leader_research/profiles/) — source headshot images per leader (.jpg / .png), separate from the main research folder. Currently populated for: alan-hirsch, mandy-smith, john-m-perkins, michael-frost, george-patterson, lucas-pulley.
- [tam-search/HEADSHOT-MANIFEST.csv](../../movement_leader_research/tam-search/HEADSHOT-MANIFEST.csv) — manifest of headshot acquisition state across the broader TAM list.
- [tam-search/fetch-wiki-headshots.py](../../movement_leader_research/tam-search/fetch-wiki-headshots.py) — automated headshot acquisition script.
- Organizational **logo references** embedded inside `network/organizations.md` and `ALAN_HIRSCH_ORGS.md` (paths like `public/images/orgs/100-movements-logo.png`).

## 35. Network / scenius maps (cross-leader)

- [network/network-map.md](../../movement_leader_research/network/network-map.md) — full connection table (Leader A | Leader B | Type | Weight | Evidence) covering 47 mapped leaders, 83 unique edges, 7 clusters, with **bridge figures** ranked by connection count (Hirsch, Wegner, Brisco, Ford, Ferguson, Woodward, Halter, Robinson, D. Hirsch).
- [network/network-graph.json](../../movement_leader_research/network/network-graph.json) — machine-readable graph for rendering in the site's `@xyflow/react` / `sigma` / `graphology` visualizations.
- Cluster annotations (e.g. "Cluster 5 merged Exponential+NewThing post-2025-04-01") with provenance.
- **Known tensions** rows surfaced from collaborator data.

## 36. Movemental TAM / field map (`tam-search/`)

- `01-MASTER-RANKED-LIST.md` — 500 candidate leaders ranked.
- `02-CANDIDATE-PROFILES.md` — capsule profiles of the candidate pool.
- `03-RUBRIC.md` — scoring rubric for inclusion.
- `04-SEARCH-PLAN.md`, `05-CONTENT-SEARCH-STRATEGY.md` — methodology.
- `08-MOVEMENT-LEADER-FIELD-MAP.md` — strategic asset mapping the seed field, with **Core / Likely / Edge** tiers and per-leader evidence rows.
- `09-PLAUSIBLE-TAM-ALPHABETIZED.md` — alphabetized TAM list.

## 37. EEAT credentials mapping — *already authored* for the nine on-site voices

[site-voices-eeat-audience-credentials.md](../../movement_leader_research/site-voices-eeat-audience-credentials.md) maps each of the nine site-named voices (alan-hirsch, brad-brisco, josh-shepherd, tim-catchim, jr-woodward, rowland-smith, liz-rios, lucas-pulley, rob-wegner) to a **3 × 4 grid**:

- **Audience columns**: Churches | Nonprofits | Institutions (movemental.com's three home-fold audiences).
- **EEAT rows**: Experience | Expertise | Authoritativeness | Trust.
- Each cell rated **Strong / Moderate→Strong / Moderate / Limited direct / Adjacent**, with sourced bullets (linked back to the leader's own `biography.md`, `identity.md`, `summary.md`, `affiliations.md`).
- Per-leader **audience intersection summary** ("all three," "Churches + Institutions only," etc.).

This is the structural template for the public-site EEAT layer; the per-leader research provides the raw evidence that fills it.

## 38. Baseline / system-level analyses (`<leader>-baseline-report.md`)

Currently only [alan-hirsch-baseline-report.md](../../movement_leader_research/alan-hirsch-baseline-report.md). Cross-repository synthesis:

- **Executive summary** — what exists, what doesn't, the core finding.
- **TAM analysis** — current realized TAM (50K–80K) vs latent TAM (500K–1.5M) with evidence basis tables and explicit confidence labels.
- **Key constraints suppressing TAM** — ranked list of structural gaps (no post-assessment journey, content locked in books, no owned digital platform, no email infrastructure, no audio layer, etc.).
- **Quantitative evidence** drawn across three repos: docs (content corpus), tenant app build, movemental-ai platform.
- **Methodology note** — evidence cited, estimation labeled, assumptions named.

---

## 39. Quick index — every distinct "kind of information"

For decision-making about EEAT vs dashboard, the kinds reduce to:

| # | Kind | Primary file(s) | Typical depth |
|---|------|-----------------|---------------|
| 1 | Canonical identity + disambiguation | `profile/identity.md` | Verified, source-linked |
| 2 | Education + career timeline | `profile/identity.md` | Year-by-year |
| 3 | Narrative biography + origin story | `profile/biography.md` | Long prose |
| 4 | Current focus + residence | `profile/biography.md` | 1–2 paras |
| 5 | Key relationships & influences | `profile/biography.md` | Table |
| 6 | Famous quotes / "in their own words" | `profile/biography.md` | 3–5 quotes |
| 7 | Theological tradition + denomination | `profile/theology.md` | Tagged |
| 8 | Named frameworks & models | `profile/theology.md` | Table per framework |
| 9 | Distinctive theological positions | `profile/theology.md` | Bullet list |
| 10 | Voice summary + writing characteristics | `profile/voice-analysis.md` | Matrix |
| 11 | Signature phrases + favorite metaphors | `profile/voice-analysis.md` | Lists |
| 12 | Argument structure + contrast patterns | `profile/voice-analysis.md` | Schematic |
| 13 | Speaking vs writing differences | `profile/voice-analysis.md` | Prose |
| 14 | Synthesized calling statement | `*_CALLING_PROFILE.md` | One paragraph |
| 15 | Core calling elements | `*_CALLING_PROFILE.md` | Bulleted identities |
| 16 | mDNA/framework alignment scoring | `*_CALLING_PROFILE.md` | Per-element |
| 17 | Movement leadership indicators | `*_CALLING_PROFILE.md` | Bullet list |
| 18 | Full book bibliography | `content/books.md` | Per-book card |
| 19 | Audiobook coverage flags | `content/books.md` | Per-book |
| 20 | Articles / blog posts (full inventory) | `content/articles.md` | By publication |
| 21 | Podcasts hosted + guest appearances | `content/audio.md` | Per-show |
| 22 | Video catalog + own-channel status | `content/videos.md` | Per-video |
| 23 | Courses & training | `content/courses.md` | Per-course |
| 24 | Academic publications + citations | `content/academic.md` | Scholar profile |
| 25 | Translation coverage | `fragmentation-story.md` | Language-by-language |
| 26 | Primary website audit | `digital-presence/websites.md` | Page-by-page |
| 27 | Newsletter platform + subscriber count | `digital-presence/newsletters.md` | Stat + style |
| 28 | Social media accounts (per platform) | `digital-presence/social-media.md` | Per-handle |
| 29 | Course/learning platform listings | `digital-presence/platforms.md` | Per-platform |
| 30 | Assessment tools | `digital-presence/platforms.md` | Per-tool |
| 31 | Academic citations (Scholar, h-index) | `media/citations.md` | Aggregate |
| 32 | Press coverage | `media/press-coverage.md` | Per-mention |
| 33 | Book reviews (editorial + reader) | `media/reviews.md` | Per-book |
| 34 | Praise quotes + criticism quotes | `media/reviews.md` | Excerpted |
| 35 | Co-authors & collaborators | `network/collaborators.md` | Per-person |
| 36 | Endorsements received + given + forewords | `network/endorsements.md` | Bi-directional |
| 37 | Upcoming events + speaking availability | `network/events.md` | Live schedule |
| 38 | Event history | `network/events.md` | Year-by-year |
| 39 | Organizations founded / led / affiliated | `network/organizations.md` | Per-org card |
| 40 | Theme map + content analysis | `analysis/content-analysis.md` | Centrality-scored |
| 41 | Direct audience metrics (followers, etc.) | `analysis/audience-analysis.md` | Per-channel |
| 42 | TAM analysis (realized vs latent) | `analysis/audience-analysis.md` + baseline | Tiered |
| 43 | Audience segments + personas | `analysis/audience-analysis.md` | Per-segment |
| 44 | Audience consumption preferences | `analysis/audience-analysis.md` | Per-segment |
| 45 | Unmet audience needs / content gaps | `analysis/audience-analysis.md` | Bullet list |
| 46 | Content format gaps | `analysis/gap-analysis.md` | Format-by-format |
| 47 | Digital maturity score | `analysis/gap-analysis.md` | 1–5 |
| 48 | Conversion gaps (e.g. follower → email) | `analysis/gap-analysis.md` | Ratios |
| 49 | Movemental fit score (multi-dimension) | `analysis/movemental-fit.md` | 1–10 per dim |
| 50 | What Movemental changes for the leader | `analysis/movemental-fit.md` | Bullet list |
| 51 | Competitive landscape (when populated) | `analysis/competitive-landscape.md` | Per-peer |
| 52 | Fragmentation story (narrative) | `fragmentation-story.md` | Long prose |
| 53 | Affinity rubric (re-usable) | `<leader>-affinity-rubric.md` | Dimensional |
| 54 | Affinity-ranked candidate list | `<leader>-affinity-ranked-list.md` | 500-row table |
| 55 | Content marketing playbook (second-person) | `content-marketing-playbook.md` | Strategic essay |
| 56 | Reflected understanding (second-person) | `reflected-understanding/<slug>.md` | Endorsable reflection |
| 57 | Complete profile (consolidated) | `*_COMPLETE_PROFILE.md` | Master doc |
| 58 | Sources / search queries used | `sources.md` | Methodology |
| 59 | Research tracker (status board) | `_tracker.md` | Checklist |
| 60 | Confidence labels on claims | every file header | HIGH/MED/LOW |
| 61 | Last-updated date stamps | every file header | ISO date |
| 62 | Rendered PDF research packet | `pdf/<slug>-research-packet.pdf` | Bundled |
| 63 | Headshot source image | `profiles/<slug>/media/headshot/` | .jpg/.png |
| 64 | Headshot acquisition manifest | `tam-search/HEADSHOT-MANIFEST.csv` | CSV |
| 65 | Organizational logos | `public/images/orgs/*.png` (referenced) | PNG |
| 66 | Cross-leader connection edges | `network/network-map.md` | Edge table |
| 67 | Cross-leader graph (machine-readable) | `network/network-graph.json` | JSON |
| 68 | Cluster + bridge-figure analysis | `network/network-map.md` | Cluster annotations |
| 69 | TAM master ranked list | `tam-search/01-MASTER-RANKED-LIST.md` | 500-row |
| 70 | TAM candidate profiles | `tam-search/02-CANDIDATE-PROFILES.md` | Capsule profiles |
| 71 | TAM rubric + search plan | `tam-search/03-RUBRIC.md`, `04-SEARCH-PLAN.md` | Methodology |
| 72 | Field map (Core / Likely / Edge tiers) | `tam-search/08-MOVEMENT-LEADER-FIELD-MAP.md` | Tiered |
| 73 | Plausible-TAM alphabetized | `tam-search/09-PLAUSIBLE-TAM-ALPHABETIZED.md` | Alpha list |
| 74 | EEAT × audience credentials grid (site voices) | `site-voices-eeat-audience-credentials.md` | 3×4 grid |
| 75 | Baseline system analysis (TAM + constraints) | `<leader>-baseline-report.md` | System-level |
| 76 | Cross-leader manifest (file counts) | `manifest.json` | JSON index |
| 77 | Static reader app over the corpus | `index.html`, `reader.js`, `mlr-reader.css` | App |
| 78 | Org-level marketing playbooks (non-leader) | `quadw-foundation/content-marketing-playbook.md` | Strategic essay |

---

## Notes for the next step

When deciding which kinds go to **EEAT / public site** vs **author dashboard**, useful framings:

- **EEAT lean** — anything that *demonstrates* Experience, Expertise, Authoritativeness, or Trust to a third party and is *evidence-grade* (verifiable, source-linked, public): kinds **1, 2, 3, 4, 5, 6, 7, 8, 9, 18, 21 (hosted only), 22 (top videos), 23, 24, 31, 32, 33 (praise), 35, 36, 37 (upcoming), 38, 39, 66, 67, 68, 74**.
- **Dashboard lean** — anything that *reflects the leader back to themselves* for self-awareness, content strategy, or pipeline insight, and which is private-by-default or pre-decisional: kinds **10, 11, 12, 13, 14, 15, 16, 17, 25, 26, 27, 28 (gaps), 30, 33 (criticism), 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 55, 56, 57, 75**.
- **Dual-surface candidates** (same fact, different framing) — kinds **20** (articles index becomes a public "Writings" list AND a dashboard "where your content lives" map), **21** (podcast appearances are public proof AND a dashboard exposure map), **22** (top videos are public scenius AND a dashboard "your video footprint" view), **39** (orgs are public credibility AND dashboard relationship inventory).
- **Internal only** (neither EEAT nor leader-facing dashboard, but useful for internal Movemental ops) — kinds **53, 54, 58, 59, 60, 61, 62, 64, 69, 70, 71, 72, 73, 76, 77, 78**.

These are framings, not decisions — the actual mapping is the next pass.
