/**
 * Corpus tree + inlined file previews for the Integration stage.
 *
 * The tree is intentionally deeper than the morph demo — a real content
 * archive under `corpus/authors/alan-hirsch/…` with books, articles,
 * podcasts, talks, videos, and correspondence — so the folder browser
 * can show scale (hundreds of files) without every file needing a
 * hand-authored preview.
 *
 * Only a handful of "featured" files have fully-rendered previews; the
 * rest reuse shared stub content that still shows the ingest pattern.
 */

export type FileNode = {
  type: "file";
  name: string;
  size?: string;
  fileKey: string;
  featured?: boolean;
  dim?: boolean;
};

export type FolderNode = {
  type: "folder";
  name: string;
  meta?: string;
  children: Array<FolderNode | FileNode | EllipsisNode>;
};

export type EllipsisNode = {
  type: "ellipsis";
  text: string;
};

export type TreeNode = FolderNode | FileNode | EllipsisNode;

type JsonFile = {
  kind: "json";
  name: string;
  body: unknown;
};

type MarkdownFile = {
  kind: "md";
  name: string;
  sub?: string;
  html: string;
};

export type CorpusFile = JsonFile | MarkdownFile;

/* ---------------------------------------------------------------------------
   Files — keyed previews used by multiple tree entries.
--------------------------------------------------------------------------- */

export const CORPUS_FILES: Record<string, CorpusFile> = {
  "tfw-manifest": {
    kind: "json",
    name: "manifest.json",
    body: {
      book_slug: "the-forgotten-ways",
      book_title: "The Forgotten Ways: Reactivating the Missional Church",
      author: "alan-hirsch",
      publisher: "Brazos Press",
      edition: "revised-expanded",
      year: 2016,
      language: "en",
      chapter_count: 19,
      word_count: 120_184,
      source: "supabase_export",
      conversion_date: "2026-03-27",
      checksum_sha256:
        "1c3b0e9a7f5d2b4e8c6a9f0b1d2e3c4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e",
    },
  },

  "tfw-ch04": {
    kind: "md",
    name: "ch04-the-heart-of-it-all-jesus-is-lord.md",
    sub: "The Forgotten Ways · Ch. 4 · Alan Hirsch · Brazos Press · 2016 · 6,876 words",
    html: `
<h2>Front matter</h2>
<pre class="md-yaml">file_id: tfw-ch04-the-heart-of-it-all-jesus-is-lord
canonical_id: alan:the-forgotten-ways:the-heart-of-it-all-jesus-is-lord
source_type: book-chapter
genre: theology-missional
book_slug: the-forgotten-ways
chapter_number: 4
chapter_title: The Heart of It All: Jesus Is Lord
author: Alan Hirsch
year: 2016
edition: revised-expanded
publisher: Brazos Press
word_count: 6876
estimated_reading_time: 34
key_concepts:
  - Apostolic Genius
  - Jesus is Lord
  - Liminality and Communitas
  - mDNA
mentions_scriptures:
  - Deuteronomy 6:4
  - 1 Corinthians 8:6
  - Romans 11:36
  - Matthew 6:33
mentions_figures:
  - Roland Allen
  - N. T. Wright
  - Martin Buber
is_canonical_definition_of:
  - Jesus is Lord</pre>

<h1>The Heart of It All: Jesus Is Lord</h1>

<blockquote>
  <p>For us there is but one God, the Father, from whom all things came and for whom we live; and there is but one Lord, Jesus Christ, through whom all things came and through whom we live.</p>
  <footer>&mdash; 1 Corinthians 8:6</footer>
</blockquote>

<blockquote>
  <p>The spontaneous expansion of the Church reduced to its elements is a very simple thing. It asks for no elaborate organization, no large finances, no great numbers of paid officials. It depends on nothing but the Spirit of God working through men and women who are indwelt by that Spirit, and who are willing to die to themselves that Christ may live in them.</p>
  <footer>&mdash; Roland Allen</footer>
</blockquote>

<p>When Paul completes his exploration into the mystery of God's involvement in human history, he brings us to the very essence of reality. He says, &ldquo;Oh, the depth of the riches of the wisdom and knowledge of God! How unsearchable his judgments, and his paths beyond tracing out! &hellip; For from him and through him and for him are all things. To him be the glory forever! Amen&rdquo; (Rom. 11:33&ndash;36).</p>

<p>The centrality of Jesus is more than just a singular &ldquo;element&rdquo; of Apostolic Genius. All genuine Christian movements throughout history have been maintained throughout by what we can call the consciousness of the lordship of Jesus, the absolute centrality of Christ, which is the one true God &ldquo;through whom all things came and through whom we live&rdquo; (1 Cor. 8:6).</p>

<h2>Distilling the message</h2>

<p>The &ldquo;gift&rdquo; that persecution seems to confer on the persecuted is that it enables them to distill the essence of the gospel message. The Chinese church is a perfect example. When all the external structures and reference points were removed, when all access to outside sources was cut off, they were somehow forced through sheer necessity to rediscover the core message they had always carried as the people of God. The result was a Jesus movement that grew from around 2 million to around 120 million in seventy years.</p>

<p>At the heart of all great movements is a recovery of a simple, uncluttered message&mdash;one that is easily understood and passed on, yet one that accurately reflects the Jesus of New Testament faith: <em>they are Jesus-shaped movements</em>.</p>

<hr />

<p class="md-notice">Excerpt from the canonical Markdown body. Full chapter continues for another ~6,000 words with sections on <em>Hear, O Israel</em>, <em>All of Life under God</em>, <em>Jesus Is Lord</em>, and <em>Jesus-Shaped Monotheism</em>.</p>
    `.trim(),
  },

  "tfw-chapter-stub": {
    kind: "md",
    name: "(chapter preview)",
    sub: "Same ingest pattern as Ch. 4 — open that chapter for the live preview",
    html: `
<h2>Front matter</h2>
<pre class="md-yaml">file_id: (chapter-id)
canonical_id: alan:the-forgotten-ways:(slug)
source_type: book-chapter
genre: theology-missional
book_slug: the-forgotten-ways
chapter_number: (n)
author: Alan Hirsch
year: 2016
publisher: Brazos Press
word_count: (count)
key_concepts: …
mentions_scriptures: …
mentions_figures: …</pre>

<h1>Chapter preview</h1>
<p>Every chapter in this book follows the same normalized ingest pattern: YAML frontmatter (chapter metadata, scriptures referenced, key concepts, SHA-256 checksum, estimated reading time) followed by the Markdown body in canonical form.</p>
<p class="md-notice">Open <strong>ch04-the-heart-of-it-all-jesus-is-lord.md</strong> to see the fully-rendered live preview with real content.</p>
    `.trim(),
  },

  "book-manifest-stub": {
    kind: "json",
    name: "manifest.json",
    body: {
      book_slug: "(slug)",
      author: "alan-hirsch",
      language: "en",
      chapter_count: "(n)",
      source: "supabase_export",
      note: "Same manifest schema as The Forgotten Ways — open that book for the fully-rendered live example.",
    },
  },

  "article-apest": {
    kind: "md",
    name: "apest-as-culture.md",
    sub: "Article · 2,140 words · published 2024-08-11",
    html: `
<h2>Front matter</h2>
<pre class="md-yaml">file_id: art-apest-as-culture
canonical_id: alan:articles:apest-as-culture
source_type: long-form-article
author: Alan Hirsch
year: 2024
word_count: 2140
estimated_reading_time: 11
key_concepts:
  - APEST
  - Fivefold ministry
  - Culture (vs. roles)
mentions_scriptures:
  - Ephesians 4:11–16</pre>

<h1>APEST is a culture, not a role taxonomy</h1>

<p>When leaders pick up APEST for the first time, the gravitational pull is always toward <em>roles</em>. Who is the apostle? Who is the prophet? It feels like a personality test and a job chart, and the organization's diagnostic impulse is to sort people into the five boxes and then call the result a healthy church.</p>

<h2>Why roles miss the point</h2>

<p>The problem is that the fivefold text in Ephesians 4 isn't a job description. It is a <em>culture</em> that Christ's ascension gift pours into the body. The body grows when the apostolic, prophetic, evangelistic, pastoral, and teaching impulses are diffused through every relationship, every meeting, every decision — not when five people are assigned five jobs.</p>

<p class="md-notice">See the <strong>Books</strong> folder for the fully-rendered live example with real Forgotten Ways data.</p>
    `.trim(),
  },

  "article-fragmentation": {
    kind: "md",
    name: "fragmentation-thesis.md",
    sub: "Article · 1,850 words · the fragmentation thesis",
    html: `
<h1>Fragmentation is not a discipline problem</h1>
<p>Your best thinking is already in the world &mdash; it is simply <strong>distributed across surfaces that do not talk to each other</strong>.</p>
<h2>What integration changes</h2>
<ul>
  <li>Every artifact gets a stable ID, checksum, and normalized body format.</li>
  <li>PDFs, decks, podcasts, and posts become rows in the same <code>manifest.json</code>.</li>
  <li>Markdown becomes the editorial interchange layer humans can read and ship.</li>
</ul>
<p class="md-notice">Pattern example. See the <strong>Books</strong> folder for the fully-rendered live example with real Forgotten Ways data.</p>
    `.trim(),
  },

  "article-stub": {
    kind: "md",
    name: "(article preview)",
    sub: "Editorial pattern — open the featured articles for live content",
    html: `
<h1>Article preview</h1>
<p>Articles are authored directly as Markdown with YAML frontmatter. Typed index lives in the shared <code>manifest.json</code>. Every article has a canonical ID, a word count, and a list of referenced scriptures + mentioned figures.</p>
<p class="md-notice">See the <strong>apest-as-culture.md</strong> or <strong>fragmentation-thesis.md</strong> article for the fully-rendered example.</p>
    `.trim(),
  },

  "podcast-ep042": {
    kind: "md",
    name: "ep-042-movement-and-formation.md",
    sub: "Podcast · 47 min · released 2024-11-03",
    html: `
<h2>Front matter</h2>
<pre class="md-yaml">file_id: pod-ep-042-movement-and-formation
source_type: podcast-transcript
duration_sec: 2820
host: Alan Hirsch
guests:
  - Deb Hirsch
key_concepts:
  - Movement / Formation dyad
  - Liminality
transcript_uri: corpus/authors/alan-hirsch/podcasts/the-forgotten-ways/ep-042.vtt</pre>

<h1>Ep. 42 · Movement and formation</h1>
<p><strong>[00:00]</strong> I want to talk tonight about the relationship between movement and formation &mdash; because I think we have gotten this backward.</p>
<p><strong>[00:48]</strong> Movement without formation is a crowd. Formation without movement is a museum.</p>
<p><strong>[02:14]</strong> The question I want us to sit with: what does a movement that <em>forms</em> people actually look like on a Tuesday afternoon?</p>
<p class="md-notice">Transcript pattern used across all podcast and audio folders. See the <strong>Books</strong> folder for the fully-rendered example with real Forgotten Ways data.</p>
    `.trim(),
  },

  "talk-catalyst": {
    kind: "md",
    name: "catalyst-2022-keynote.md",
    sub: "Conference talk · 38 min · Catalyst 2022",
    html: `
<h1>Catalyst 2022 Keynote · Apostolic Genius in an anxious age</h1>
<p><strong>[00:00]</strong> Tonight I want to make a simple argument, and then I want to complicate it the rest of the time.</p>
<p><strong>[03:41]</strong> Apostolic Genius is not a leadership profile. It is a <em>latent capacity</em> inside every ecclesia that, when it is given room to breathe, expresses itself as movement.</p>
<p class="md-notice">Transcript pattern used across all talks. Open the Books folder for the fully-rendered live example.</p>
    `.trim(),
  },

  "video-stub": {
    kind: "md",
    name: "(video preview)",
    sub: "Video / youtube folder · transcript pattern",
    html: `
<h2>Front matter</h2>
<pre class="md-yaml">file_id: video-(slug)
source_type: video-transcript
duration_sec: (n)
speaker: Alan Hirsch
year: (yyyy)
transcript_uri: corpus/authors/alan-hirsch/videos/…</pre>
<h1>Video transcript preview</h1>
<p>Each video gets a VTT transcript plus a Markdown body with speaker labels, timestamps, and chapter marks. Images and stills live as sidecar JSON.</p>
<p class="md-notice">See the <strong>Books</strong> folder for the fully-rendered live example with real data.</p>
    `.trim(),
  },

  "index-articles": {
    kind: "json",
    name: "index.json",
    body: {
      namespace: "alan-hirsch:articles",
      count: 28,
      canonical_ids: [
        "alan:articles:apest-as-culture",
        "alan:articles:fragmentation-thesis",
        "alan:articles:two-intelligences-integration",
        "alan:articles:missional-incarnational-impulse",
        "alan:articles:liminality-and-communitas",
        "alan:articles:disciplism-primer",
        "alan:articles:… + 22 more",
      ],
      schema: "corpus-article.v3",
    },
  },

  "index-podcast-feed": {
    kind: "json",
    name: "feed.json",
    body: {
      namespace: "alan-hirsch:podcasts:the-forgotten-ways",
      episode_count: 47,
      first_release: "2019-05-02",
      latest_release: "2026-02-14",
      hosts: ["Alan Hirsch"],
      guests: ["Deb Hirsch", "Michael Frost", "Brad Brisco", "+ 31 more"],
      schema: "corpus-podcast-feed.v2",
    },
  },

  "manifest-movements": {
    kind: "json",
    name: "manifest.json",
    body: {
      namespace: "movements:forge-network",
      kind: "organization",
      founding_year: 1997,
      regions: ["AU", "US", "EU"],
      publications: ["Forge Quarterly", "Missional Almanac"],
      related_authors: ["alan-hirsch", "michael-frost", "lance-ford"],
      schema: "corpus-org.v1",
    },
  },

  "images-index": {
    kind: "json",
    name: "index.json",
    body: {
      namespace: "alan-hirsch:images",
      image_count: 612,
      usage: "sidecar JSON per asset — alt text, dimensions, license, linked artifact",
      license_mix: { "rights-reserved": 420, "cc-by": 140, "cc0": 52 },
      schema: "corpus-image.v2",
    },
  },

  "feeds-index": {
    kind: "json",
    name: "index.json",
    body: {
      namespace: "feeds",
      kind: "syndication-inbound-outbound",
      inbound_sources: 18,
      outbound_channels: ["rss", "atom", "sitemap", "json-feed"],
      normalization: "all inbound collapses to the same Markdown + JSON pattern",
      schema: "corpus-feed.v1",
    },
  },
};

/* ---------------------------------------------------------------------------
   Tree helpers — generate many similarly-structured chapters cheaply.
--------------------------------------------------------------------------- */

const tfwChapters: FileNode[] = [
  { type: "file", name: "preface.md", fileKey: "tfw-chapter-stub", size: "6.2 KB", dim: true },
  { type: "file", name: "ch01-introduction.md", fileKey: "tfw-chapter-stub", size: "12.1 KB", dim: true },
  { type: "file", name: "ch02-my-jerusalem-journey.md", fileKey: "tfw-chapter-stub", size: "18.4 KB", dim: true },
  { type: "file", name: "ch03-the-prism.md", fileKey: "tfw-chapter-stub", size: "22.9 KB", dim: true },
  { type: "file", name: "ch04-the-heart-of-it-all-jesus-is-lord.md", fileKey: "tfw-ch04", size: "40.1 KB", featured: true },
  { type: "file", name: "ch05-disciple-making.md", fileKey: "tfw-chapter-stub", size: "35.8 KB", dim: true },
  { type: "file", name: "ch06-missional-incarnational-impulse.md", fileKey: "tfw-chapter-stub", size: "33.2 KB", dim: true },
  { type: "file", name: "ch07-liminality-and-communitas.md", fileKey: "tfw-chapter-stub", size: "31.4 KB", dim: true },
  { type: "file", name: "ch08-apest-culture.md", fileKey: "tfw-chapter-stub", size: "38.9 KB", dim: true },
  { type: "file", name: "ch09-organic-systems.md", fileKey: "tfw-chapter-stub", size: "36.1 KB", dim: true },
  { type: "file", name: "glossary.md", fileKey: "tfw-chapter-stub", size: "4.8 KB", dim: true },
];

const bookStubChildren = (
  slug: string,
  chapterCount: number,
): Array<FileNode | EllipsisNode> => [
  { type: "file", name: "manifest.json", fileKey: "book-manifest-stub", size: "312 B" },
  { type: "file", name: `${slug}-ch01.md`, fileKey: "tfw-chapter-stub", size: "14.2 KB", dim: true },
  { type: "file", name: `${slug}-ch02.md`, fileKey: "tfw-chapter-stub", size: "18.7 KB", dim: true },
  {
    type: "ellipsis",
    text: `+ ${chapterCount - 2} more chapters (same Markdown + YAML frontmatter pattern)`,
  },
];

/* ---------------------------------------------------------------------------
   Roots — one per Integration folder node.
--------------------------------------------------------------------------- */

export type FolderRoot = {
  /** Key used by the SVG folder hit-zone `data-folder` attribute. */
  id: string;
  label: string;
  sublabel: string;
  icon: FolderIcon;
  /** Breadcrumb shown in the browser header. */
  kicker: string;
  context: string;
  /** The folder node (its children are the starting listing). */
  root: FolderNode;
};

export type FolderIcon =
  | "book"
  | "article"
  | "podcast"
  | "video"
  | "talk"
  | "mail"
  | "social"
  | "image"
  | "notes"
  | "rss"
  | "canon"
  | "movements";

const books: FolderNode = {
  type: "folder",
  name: "books",
  meta: "15 titles · 218 chapters",
  children: [
    {
      type: "folder",
      name: "the-forgotten-ways",
      meta: "19 chapters · 680 KB · featured",
      children: [
        { type: "file", name: "manifest.json", fileKey: "tfw-manifest", size: "612 B", featured: true },
        ...tfwChapters,
        { type: "ellipsis", text: "+ 8 more chapters (ch10 – ch17 · appendices 1–5)" },
      ],
    },
    {
      type: "folder",
      name: "5q",
      meta: "8 chapters · 210 KB",
      children: bookStubChildren("5q", 8),
    },
    {
      type: "folder",
      name: "rejesus",
      meta: "14 chapters · 340 KB",
      children: bookStubChildren("rejesus", 14),
    },
    {
      type: "folder",
      name: "metanoia",
      meta: "10 chapters · 260 KB",
      children: bookStubChildren("metanoia", 10),
    },
    {
      type: "folder",
      name: "reframation",
      meta: "9 chapters · 240 KB",
      children: bookStubChildren("reframation", 9),
    },
    {
      type: "folder",
      name: "on-the-verge",
      meta: "11 chapters · 280 KB",
      children: bookStubChildren("on-the-verge", 11),
    },
    {
      type: "folder",
      name: "the-shaping-of-things-to-come",
      meta: "12 chapters · 310 KB",
      children: bookStubChildren("stc", 12),
    },
    {
      type: "folder",
      name: "the-permanent-revolution",
      meta: "11 chapters · 300 KB",
      children: bookStubChildren("tpr", 11),
    },
    {
      type: "ellipsis",
      text: "+ 8 more titles (right-here-right-now · untamed · disciplism · fast-forward-to-mission · handbook · …)",
    },
  ],
};

const articles: FolderNode = {
  type: "folder",
  name: "articles",
  meta: "28 published · 41 drafts",
  children: [
    { type: "file", name: "index.json", fileKey: "index-articles", size: "2.4 KB" },
    { type: "file", name: "apest-as-culture.md", fileKey: "article-apest", size: "19.8 KB", featured: true },
    { type: "file", name: "fragmentation-thesis.md", fileKey: "article-fragmentation", size: "17.1 KB", featured: true },
    { type: "file", name: "two-intelligences-integration.md", fileKey: "article-stub", size: "16.4 KB", dim: true },
    { type: "file", name: "missional-incarnational-impulse.md", fileKey: "article-stub", size: "15.2 KB", dim: true },
    { type: "file", name: "liminality-and-communitas.md", fileKey: "article-stub", size: "14.9 KB", dim: true },
    { type: "file", name: "disciplism-primer.md", fileKey: "article-stub", size: "13.3 KB", dim: true },
    { type: "file", name: "forge-mission-training.md", fileKey: "article-stub", size: "12.6 KB", dim: true },
    { type: "file", name: "eat-acts-or-eat-your-young.md", fileKey: "article-stub", size: "11.8 KB", dim: true },
    {
      type: "folder",
      name: "drafts",
      meta: "41 items · unpublished",
      children: [
        { type: "file", name: "2026-04-fragmentation-field-notes.md", fileKey: "article-stub", size: "9.1 KB", dim: true },
        { type: "file", name: "2026-03-apest-as-culture-revision-2.md", fileKey: "article-stub", size: "14.4 KB", dim: true },
        { type: "ellipsis", text: "+ 39 more drafts (dated 2024-09 through 2026-04)" },
      ],
    },
    { type: "ellipsis", text: "+ 20 more published articles" },
  ],
};

const podcasts: FolderNode = {
  type: "folder",
  name: "podcasts",
  meta: "2 shows · 89 episodes",
  children: [
    {
      type: "folder",
      name: "the-forgotten-ways",
      meta: "47 episodes · 38.2 GB audio",
      children: [
        { type: "file", name: "feed.json", fileKey: "index-podcast-feed", size: "842 B" },
        { type: "file", name: "ep-042-movement-and-formation.md", fileKey: "podcast-ep042", size: "92.1 KB", featured: true },
        { type: "file", name: "ep-041-missional-monasticism.md", fileKey: "video-stub", size: "88.4 KB", dim: true },
        { type: "file", name: "ep-040-liminality-live.md", fileKey: "video-stub", size: "90.2 KB", dim: true },
        { type: "ellipsis", text: "+ 44 more episodes (ep-001 through ep-039, ep-043 through ep-047)" },
      ],
    },
    {
      type: "folder",
      name: "movement-conversations",
      meta: "42 episodes · hosted",
      children: [
        { type: "file", name: "feed.json", fileKey: "book-manifest-stub", size: "680 B" },
        { type: "file", name: "mc-ep-012-forge-at-25.md", fileKey: "video-stub", size: "78.6 KB", dim: true },
        { type: "ellipsis", text: "+ 41 more episodes" },
      ],
    },
  ],
};

const talks: FolderNode = {
  type: "folder",
  name: "talks",
  meta: "74 conference + church talks",
  children: [
    { type: "file", name: "catalyst-2022-keynote.md", fileKey: "talk-catalyst", size: "64.1 KB", featured: true },
    { type: "file", name: "exponential-2023-apostolic-genius.md", fileKey: "video-stub", size: "58.8 KB", dim: true },
    { type: "file", name: "forge-australia-2021-workshop.md", fileKey: "video-stub", size: "61.4 KB", dim: true },
    { type: "file", name: "future-travelers-2024-dissonance.md", fileKey: "video-stub", size: "52.7 KB", dim: true },
    {
      type: "folder",
      name: "sermons",
      meta: "38 guest sermons",
      children: [
        { type: "file", name: "2023-11-missional-reformation.md", fileKey: "video-stub", size: "32.1 KB", dim: true },
        { type: "ellipsis", text: "+ 37 more sermons" },
      ],
    },
    { type: "ellipsis", text: "+ 68 more conference / workshop talks" },
  ],
};

const videos: FolderNode = {
  type: "folder",
  name: "videos",
  meta: "164 clips · 1.2 TB",
  children: [
    {
      type: "folder",
      name: "youtube",
      meta: "118 uploads · 34k subscribers",
      children: [
        { type: "file", name: "channel.json", fileKey: "book-manifest-stub", size: "412 B" },
        { type: "file", name: "what-is-apostolic-genius.md", fileKey: "video-stub", size: "24.6 KB", dim: true },
        { type: "file", name: "how-movements-form.md", fileKey: "video-stub", size: "28.9 KB", dim: true },
        { type: "ellipsis", text: "+ 116 more uploads" },
      ],
    },
    {
      type: "folder",
      name: "keynotes-raw",
      meta: "46 unlisted recordings",
      children: [
        { type: "file", name: "forge-intensive-2024-day-1.md", fileKey: "video-stub", size: "106.4 KB", dim: true },
        { type: "ellipsis", text: "+ 45 more raw recordings" },
      ],
    },
  ],
};

const correspondence: FolderNode = {
  type: "folder",
  name: "correspondence",
  meta: "328 threads · redacted",
  children: [
    { type: "file", name: "thread-2026-03-04-future-travelers-sync.md", fileKey: "article-stub", size: "18.2 KB", dim: true },
    { type: "file", name: "thread-2026-02-11-movemental-platform-launch.md", fileKey: "article-stub", size: "22.4 KB", dim: true },
    { type: "ellipsis", text: "+ 326 more threads (redacted, thread-lineage preserved in manifest)" },
  ],
};

const social: FolderNode = {
  type: "folder",
  name: "social",
  meta: "412 long-form threads · 2018 – 2026",
  children: [
    { type: "file", name: "x-thread-2026-04-apest-primer.md", fileKey: "article-stub", size: "11.8 KB", dim: true },
    { type: "file", name: "linkedin-2025-11-fragmentation.md", fileKey: "article-stub", size: "9.4 KB", dim: true },
    { type: "ellipsis", text: "+ 410 more normalized social threads" },
  ],
};

const notes: FolderNode = {
  type: "folder",
  name: "notes",
  meta: "ad-hoc · dated · taggable",
  children: [
    { type: "file", name: "2026-04-17-fragmentation-field-notes.md", fileKey: "article-stub", size: "6.2 KB", dim: true },
    { type: "file", name: "2026-04-01-reframation-deck-rehearsal.md", fileKey: "article-stub", size: "3.8 KB", dim: true },
    { type: "ellipsis", text: "+ ~1,400 dated notes spanning 2011 – 2026" },
  ],
};

const images: FolderNode = {
  type: "folder",
  name: "images",
  meta: "612 images · sidecar JSON",
  children: [
    { type: "file", name: "index.json", fileKey: "images-index", size: "14.8 KB" },
    { type: "ellipsis", text: "+ 612 images with alt text, dimensions, license, linked-artifact metadata" },
  ],
};

const rssFeeds: FolderNode = {
  type: "folder",
  name: "feeds",
  meta: "inbound + outbound",
  children: [
    { type: "file", name: "index.json", fileKey: "feeds-index", size: "3.2 KB" },
    { type: "ellipsis", text: "+ 18 inbound syndication sources · 4 outbound channels (rss · atom · sitemap · json-feed)" },
  ],
};

/* Alan Hirsch author root — the primary biography of content. */
const alanHirschAuthor: FolderNode = {
  type: "folder",
  name: "alan-hirsch",
  meta: "primary author · fully ingested",
  children: [books, articles, podcasts, talks, videos, correspondence, social, notes, images],
};

/* Canon / PDF — legacy scanned PDFs that feed the normalization pipeline. */
const canonPdf: FolderNode = {
  type: "folder",
  name: "canon-pdf",
  meta: "legacy scanned PDFs",
  children: [
    { type: "file", name: "manifest.json", fileKey: "book-manifest-stub", size: "1.1 KB" },
    {
      type: "folder",
      name: "alan-hirsch",
      meta: "first-editions + out-of-print",
      children: [
        { type: "file", name: "shaping-of-things-1st-ed-2003.md", fileKey: "tfw-chapter-stub", size: "312 KB", dim: true },
        { type: "file", name: "untamed-2010.md", fileKey: "tfw-chapter-stub", size: "256 KB", dim: true },
        { type: "ellipsis", text: "+ 9 more scans" },
      ],
    },
    {
      type: "folder",
      name: "reference-shelf",
      meta: "cited works · OCR'd",
      children: [
        { type: "file", name: "roland-allen-spontaneous-expansion.md", fileKey: "tfw-chapter-stub", size: "184 KB", dim: true },
        { type: "file", name: "lesslie-newbigin-gospel-in-pluralism.md", fileKey: "tfw-chapter-stub", size: "211 KB", dim: true },
        { type: "ellipsis", text: "+ 42 more cited works" },
      ],
    },
  ],
};

/* Movements — orgs & networks that carry the canon into the field. */
const movementsRoot: FolderNode = {
  type: "folder",
  name: "movements",
  meta: "organizations + networks",
  children: [
    {
      type: "folder",
      name: "forge-network",
      meta: "founded 1997 · AU/US/EU",
      children: [
        { type: "file", name: "manifest.json", fileKey: "manifest-movements", size: "524 B" },
        { type: "file", name: "forge-quarterly-2026-spring.md", fileKey: "article-stub", size: "34.2 KB", dim: true },
        { type: "ellipsis", text: "+ 94 more Forge publications + internal docs" },
      ],
    },
    {
      type: "folder",
      name: "100movements",
      meta: "publishing partner",
      children: [
        { type: "file", name: "manifest.json", fileKey: "book-manifest-stub", size: "618 B" },
        { type: "ellipsis", text: "+ 61 cross-published titles" },
      ],
    },
    {
      type: "folder",
      name: "future-travelers",
      meta: "leader cohort",
      children: [
        { type: "file", name: "manifest.json", fileKey: "book-manifest-stub", size: "704 B" },
        { type: "ellipsis", text: "+ 112 cohort artifacts (readings · field notes · coaching)" },
      ],
    },
  ],
};

/* ---------------------------------------------------------------------------
   Folder roots — one per Integration viz folder hit-zone.
--------------------------------------------------------------------------- */

export const FOLDER_ROOTS: FolderRoot[] = [
  {
    id: "books",
    label: "Books",
    sublabel: "15 titles · 218 chapters",
    icon: "book",
    kicker: "corpus/authors/alan-hirsch/",
    context:
      "Published books live as a <code>manifest.json</code> plus one Markdown file per chapter. The Forgotten Ways is the fully-rendered live example.",
    root: {
      type: "folder",
      name: "alan-hirsch/books",
      children: books.children,
    },
  },
  {
    id: "articles",
    label: "Articles",
    sublabel: "28 published · 41 drafts",
    icon: "article",
    kicker: "corpus/authors/alan-hirsch/",
    context:
      "Articles are authored directly as Markdown with YAML frontmatter. Drafts live in a sibling folder until they are promoted.",
    root: {
      type: "folder",
      name: "alan-hirsch/articles",
      children: articles.children,
    },
  },
  {
    id: "podcasts",
    label: "Podcasts",
    sublabel: "2 shows · 89 episodes",
    icon: "podcast",
    kicker: "corpus/authors/alan-hirsch/",
    context:
      "Episodes normalize to a transcript Markdown + <code>feed.json</code>. Audio binaries live in object storage; the corpus layer indexes them.",
    root: {
      type: "folder",
      name: "alan-hirsch/podcasts",
      children: podcasts.children,
    },
  },
  {
    id: "talks",
    label: "Talks",
    sublabel: "74 conference talks + sermons",
    icon: "talk",
    kicker: "corpus/authors/alan-hirsch/",
    context:
      "Conference keynotes, workshops, and guest sermons — each with a transcript, slide capture, and manifest entry.",
    root: {
      type: "folder",
      name: "alan-hirsch/talks",
      children: talks.children,
    },
  },
  {
    id: "videos",
    label: "Videos",
    sublabel: "YouTube + raw keynotes",
    icon: "video",
    kicker: "corpus/authors/alan-hirsch/",
    context:
      "YouTube uploads and unlisted raw recordings. Transcripts land next to the source; thumbnails live in <code>images/</code>.",
    root: {
      type: "folder",
      name: "alan-hirsch/videos",
      children: videos.children,
    },
  },
  {
    id: "correspondence",
    label: "Correspondence",
    sublabel: "328 threads · redacted",
    icon: "mail",
    kicker: "corpus/authors/alan-hirsch/",
    context:
      "Email threads collapse into redacted Markdown with thread lineage preserved in the manifest.",
    root: {
      type: "folder",
      name: "alan-hirsch/correspondence",
      children: correspondence.children,
    },
  },
  {
    id: "social",
    label: "Social threads",
    sublabel: "412 long-form threads",
    icon: "social",
    kicker: "corpus/authors/alan-hirsch/",
    context:
      "Long-form social threads normalize to Markdown with permalinks, engagement counts, and author attribution.",
    root: {
      type: "folder",
      name: "alan-hirsch/social",
      children: social.children,
    },
  },
  {
    id: "images",
    label: "Image library",
    sublabel: "612 images · sidecar JSON",
    icon: "image",
    kicker: "corpus/authors/alan-hirsch/",
    context:
      "Each image gets a sidecar JSON with alt text, dimensions, license, and the artifact it belongs to.",
    root: {
      type: "folder",
      name: "alan-hirsch/images",
      children: images.children,
    },
  },
  {
    id: "notes",
    label: "Notes · drafts",
    sublabel: "~1,400 dated notes",
    icon: "notes",
    kicker: "corpus/authors/alan-hirsch/",
    context:
      "Working notes and in-progress drafts live alongside published work — dated, tagged, linkable.",
    root: {
      type: "folder",
      name: "alan-hirsch/notes",
      children: notes.children,
    },
  },
  {
    id: "feeds",
    label: "RSS · feeds",
    sublabel: "inbound + outbound",
    icon: "rss",
    kicker: "corpus/",
    context:
      "Inbound feeds normalize to the same Markdown + JSON pattern. Syndication out uses the same layer.",
    root: {
      type: "folder",
      name: "feeds",
      children: rssFeeds.children,
    },
  },
  {
    id: "canon",
    label: "Canon · PDF",
    sublabel: "legacy scanned books",
    icon: "canon",
    kicker: "corpus/",
    context:
      "Scanned PDFs get OCR'd, split by chapter, and re-normalized. Each source gets a manifest row plus a Markdown body.",
    root: {
      type: "folder",
      name: "canon-pdf",
      children: canonPdf.children,
    },
  },
  {
    id: "movements",
    label: "Movements",
    sublabel: "networks + publishers",
    icon: "movements",
    kicker: "corpus/",
    context:
      "Organizations and networks that carry the canon into the field — each with a manifest, a publications folder, and a cohort archive.",
    root: {
      type: "folder",
      name: "movements",
      children: movementsRoot.children,
    },
  },
];

/**
 * Export helper for the master-root view (used when the browser is opened
 * from the "root" hit-zone in the middle of the Integration viz).
 */
export const MASTER_ROOT: FolderRoot = {
  id: "root",
  label: "corpus",
  sublabel: "the whole archive",
  icon: "book",
  kicker: "",
  context:
    "Every artifact — from scanned PDFs to live podcast episodes — normalizes into this tree. Click any folder to drill in.",
  root: {
    type: "folder",
    name: "corpus",
    children: [
      {
        type: "folder",
        name: "authors",
        meta: "primary + secondary",
        children: [alanHirschAuthor, { type: "ellipsis", text: "+ 11 more authors (deb-hirsch · michael-frost · brad-brisco · lance-ford · …)" }],
      },
      movementsRoot,
      canonPdf,
      rssFeeds,
    ],
  },
};
