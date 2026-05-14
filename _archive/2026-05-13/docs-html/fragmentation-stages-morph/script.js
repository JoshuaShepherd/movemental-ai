/* ============================================================================
   Movemental — Fragmentation stages · sticky-morph
   Drive the SVG's data-stage attribute off which .stage article is centered
   in the viewport. CSS handles every position, fade, draw-in, and loop.
   ============================================================================ */

(function () {
  "use strict";

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const viz = document.getElementById("viz");
  const stages = Array.from(document.querySelectorAll(".stage"));
  const progressItems = Array.from(
    document.querySelectorAll("[data-progress] [data-step]")
  );

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* --- Reveal on scroll --------------------------------------------------- */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  /* --- Stage activation --------------------------------------------------- */
  if (!viz || stages.length === 0) return;

  function updateFolderFocusability(stage) {
    const hits = document.querySelectorAll(".node-folder-hit");
    hits.forEach((el) => {
      if (stage === 2) el.setAttribute("tabindex", "0");
      else el.setAttribute("tabindex", "-1");
    });
  }

  function setActiveStage(n) {
    const s = String(n);
    const changed = viz.dataset.stage !== s;
    if (changed) {
      viz.dataset.stage = s;
      stages.forEach((stageEl) => {
        const matches = Number(stageEl.dataset.stage) === n;
        if (matches) stageEl.setAttribute("aria-current", "step");
        else stageEl.removeAttribute("aria-current");
      });
      progressItems.forEach((li) => {
        li.classList.toggle("is-active", Number(li.dataset.step) === n);
      });
    }
    updateFolderFocusability(n);
  }

  function wireIntegrationDialogs() {
    const dlgFolder = document.getElementById("dlg-folder");
    const dlgJson = document.getElementById("dlg-json");
    const dlgMd = document.getElementById("dlg-md");
    const jsonBody = document.getElementById("dlg-json-body");
    const mdBody = document.getElementById("dlg-md-body");
    const folderTitle = document.querySelector("[data-folder-title]");
    const folderCtx = document.querySelector("[data-folder-context]");
    const folderTree = document.querySelector("[data-folder-tree]");
    const folderFineprint = document.querySelector("[data-folder-fineprint]");
    const fileKicker = document.querySelector("[data-file-kicker]");
    const fileTitle = document.querySelector("[data-file-title]");
    const mdKicker = document.querySelector("[data-md-kicker]");
    const mdTitle = document.querySelector("[data-md-title]");
    const mdSub = document.querySelector("[data-md-sub]");

    if (!dlgFolder || !dlgJson || !dlgMd || !jsonBody || !mdBody || !folderTree) return;

    /* ---------------------------------------------------------------------
       FILE CONTENT — real files from desktop/Dev/repos/alan-books/corpus
       for the Books folder; shared templates for the rest so users can
       still see the JSON/Markdown pattern.
       --------------------------------------------------------------------- */
    const FILES = {
      "tfw-book-json": {
        name: "the-forgotten-ways-book.json",
        path: "corpus/alan_hirsch/the-forgotten-ways/",
        kind: "json",
        body: {
          book_slug: "the-forgotten-ways",
          book_title: "The Forgotten Ways: Reactivating the Missional Church",
          tenant: "alan-hirsch",
          language: "en",
          chapter_count: 19,
          source: "supabase_export",
          conversion_date: "2026-03-27"
        }
      },
      "tfw-ch04-md": {
        name: "the-forgotten-ways-ch04-the-heart-of-it-all-jesus-is-lord.md",
        path: "corpus/alan_hirsch/the-forgotten-ways/",
        kind: "md",
        sub: "The Forgotten Ways · Ch. 4 · Alan Hirsch · Brazos Press · 2016 · 6,876 words",
        html: `
<h2>Front matter (YAML)</h2>
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
        `.trim()
      },

      "tfw-chapter-stub": {
        name: "(chapter preview)",
        path: "corpus/alan_hirsch/the-forgotten-ways/",
        kind: "md",
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
<p class="md-notice">Open <strong>the-forgotten-ways-ch04-the-heart-of-it-all-jesus-is-lord.md</strong> to see the fully-rendered live preview with real content.</p>
        `.trim()
      },

      /* Generic stubs — used by non-real folders so pattern is visible */
      "stub-canon-json": {
        name: "source-manifest.json",
        path: "corpus/canon-pdf/",
        kind: "json",
        body: {
          kind: "pdf",
          source_type: "scanned-book",
          title: "Source manifest — canon PDF archive",
          files: [
            { id: "pdf_042", title: "The Shaping of Things to Come (1st ed, 2003)", pages: 312, sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" },
            { id: "pdf_043", title: "Untamed (2010)", pages: 256, sha256: "9a8bcf4c2d0e1f5a6e7b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f" }
          ],
          note: "See the Books folder for a fully-rendered live example."
        }
      },
      "stub-video-md": {
        name: "keynote-2024-transcript.md",
        path: "corpus/video/keynote-2024/",
        kind: "md",
        sub: "YouTube / video folder · transcript pattern",
        html: `
<h2>Front matter</h2>
<pre class="md-yaml">file_id: keynote-2024-movement-formation
source_type: video-transcript
duration_sec: 2841
transcript_uri: corpus/video/keynote-2024.vtt
speaker: Alan Hirsch
year: 2024</pre>

<h1>Keynote · Movement and formation</h1>
<p><strong>[00:00]</strong> I want to talk tonight about the relationship between movement and formation &mdash; because I think we have gotten this backward.</p>
<p><strong>[00:48]</strong> Movement without formation is a crowd. Formation without movement is a museum.</p>
<p class="md-notice">Transcript pattern used across all video / audio folders. See the <strong>Books</strong> folder for the fully-rendered live example with real Forgotten Ways data.</p>
        `.trim()
      },
      "stub-article-md": {
        name: "fragmentation-thesis.md",
        path: "corpus/articles/",
        kind: "md",
        sub: "Web articles folder · editorial pattern",
        html: `
<h1>Fragmentation is not a discipline problem</h1>
<p>Your best thinking is already in the world &mdash; it is simply <strong>distributed across surfaces that do not talk to each other</strong>.</p>
<h2>What integration changes</h2>
<ul>
  <li>Every artifact gets a stable ID, checksum, and normalized body format.</li>
  <li>PDFs, decks, podcasts, and posts become rows in the same <code>corpus-manifest.json</code>.</li>
  <li>Markdown becomes the editorial interchange layer humans can read and ship.</li>
</ul>
<p class="md-notice">Pattern example. See the <strong>Books</strong> folder for a fully-rendered live example with real Forgotten Ways data.</p>
        `.trim()
      },
      "stub-sources-json": {
        name: "sources.json",
        path: "corpus/",
        kind: "json",
        body: {
          note: "Generic index pattern. See the Books folder for the live Forgotten Ways example.",
          sources: [
            { kind: "podcast", id: "ep_042", duration_sec: 2410 },
            { kind: "slides", id: "deck_012", slide_count: 24 },
            { kind: "thread", id: "tw_0917", post_count: 11 }
          ]
        }
      }
    };

    /* ---------------------------------------------------------------------
       FOLDER DEFINITIONS — each Integration folder gets its own tree
       --------------------------------------------------------------------- */
    const booksTree = [
      { type: "folder", name: "corpus", depth: 0 },
      { type: "folder", name: "alan_hirsch", depth: 1 },
      {
        type: "folder", name: "the-forgotten-ways", depth: 2,
        open: true, meta: "19 files · 680 KB"
      },
      { type: "file", name: "the-forgotten-ways-book.json", depth: 3, fileKey: "tfw-book-json", meta: "298 B" },
      { type: "file", name: "the-forgotten-ways-ch04-the-heart-of-it-all-jesus-is-lord.md", depth: 3, fileKey: "tfw-ch04-md", meta: "40.1 KB · 6,876 words", featured: true },
      { type: "file", name: "the-forgotten-ways-ch01-introduction.md", depth: 3, fileKey: "tfw-chapter-stub", meta: "12.1 KB", dim: true },
      { type: "file", name: "the-forgotten-ways-ch05-disciple-making.md", depth: 3, fileKey: "tfw-chapter-stub", meta: "35.8 KB", dim: true },
      { type: "file", name: "the-forgotten-ways-ch06-missional-incarnational-impulse.md", depth: 3, fileKey: "tfw-chapter-stub", meta: "33.2 KB", dim: true },
      { type: "file", name: "the-forgotten-ways-ch07-liminality-and-communitas.md", depth: 3, fileKey: "tfw-chapter-stub", meta: "31.4 KB", dim: true },
      { type: "file", name: "the-forgotten-ways-ch08-apest-culture.md", depth: 3, fileKey: "tfw-chapter-stub", meta: "38.9 KB", dim: true },
      { type: "file", name: "the-forgotten-ways-ch09-organic-systems.md", depth: 3, fileKey: "tfw-chapter-stub", meta: "36.1 KB", dim: true },
      { type: "ellipsis", text: "+ 11 more chapters (introduction · preface · conclusion · glossary · afterword · appendices 1–5)", depth: 3 },
      { type: "folder", name: "5q", depth: 2, meta: "8 chapters", dim: true },
      { type: "folder", name: "rejesus", depth: 2, meta: "14 chapters", dim: true },
      { type: "folder", name: "metanoia", depth: 2, meta: "10 chapters", dim: true },
      { type: "ellipsis", text: "+ 12 more books (handbook · on-the-verge · reframation · disciplism · fast-forward-to-mission · right-here-right-now · …)", depth: 2 }
    ];

    const stubTreeFor = (rootName, file, kind) => ([
      { type: "folder", name: "corpus", depth: 0 },
      { type: "folder", name: rootName, depth: 1, open: true, meta: "pattern · stub" },
      { type: "file", name: file, depth: 2, fileKey: kind, meta: "sample" },
      {
        type: "note",
        depth: 1,
        html: `This folder shares the same ingest pattern. Click the <strong>Books</strong> folder for the fully-rendered live example with real data from <em>The Forgotten Ways</em> in <code>desktop/Dev/repos/alan-books/corpus</code>.`
      }
    ]);

    const FOLDERS = {
      "Books": {
        title: "Books",
        kicker: "corpus/alan_hirsch/",
        context: "Published books live as a small <code>book.json</code> manifest plus one Markdown file per chapter. Click any file to open it.",
        fineprint: "Live example ingested from <code>desktop/Dev/repos/alan-books/corpus/alan_hirsch/the-forgotten-ways</code>.",
        tree: booksTree
      },
      "Canon / PDF": {
        title: "Canon · PDF archive",
        kicker: "corpus/canon-pdf/",
        context: "Scanned PDFs get OCR’d and split. Each source gets a manifest row plus a normalized Markdown body.",
        tree: stubTreeFor("canon-pdf", "source-manifest.json", "stub-canon-json")
      },
      "YouTube / video": {
        title: "YouTube · video",
        kicker: "corpus/video/",
        context: "Each video gets a VTT transcript plus a Markdown body with speaker labels, timestamps, and chapter marks.",
        tree: stubTreeFor("video", "keynote-2024-transcript.md", "stub-video-md")
      },
      "Podcasts / audio": {
        title: "Podcasts · audio",
        kicker: "corpus/audio/",
        context: "Episodes become transcripts with speaker turns, plus a JSON row that records duration, guests, and show notes.",
        tree: stubTreeFor("audio", "ep-042-transcript.md", "stub-video-md")
      },
      "Slide decks": {
        title: "Slide decks",
        kicker: "corpus/decks/",
        context: "Each deck gets a slide-by-slide Markdown export plus a manifest of slide titles, image references, and speaker notes.",
        tree: stubTreeFor("decks", "deck-012-slides.md", "stub-video-md")
      },
      "Web articles": {
        title: "Web articles",
        kicker: "corpus/articles/",
        context: "Articles are authored directly as Markdown with YAML frontmatter. Typed index lives in the shared manifest.",
        tree: stubTreeFor("articles", "fragmentation-thesis.md", "stub-article-md")
      },
      "Correspondence": {
        title: "Correspondence",
        kicker: "corpus/correspondence/",
        context: "Email threads collapse into redacted Markdown with thread lineage preserved in the manifest.",
        tree: stubTreeFor("correspondence", "thread-2024-03-04.md", "stub-article-md")
      },
      "Talk recordings": {
        title: "Talk recordings",
        kicker: "corpus/talks/",
        context: "Conference talks, sermons, and workshops — each with a transcript, slide capture, and manifest entry.",
        tree: stubTreeFor("talks", "forge-2024-keynote.md", "stub-video-md")
      },
      "Social threads": {
        title: "Social threads",
        kicker: "corpus/social/",
        context: "Long-form social threads normalize to Markdown with permalinks, engagement counts, and author attribution.",
        tree: stubTreeFor("social", "x-thread-2024-09-17.md", "stub-article-md")
      },
      "Image library": {
        title: "Image library",
        kicker: "corpus/images/",
        context: "Each image gets a sidecar JSON with alt text, dimensions, license, and the artifact it belongs to.",
        tree: stubTreeFor("images", "images-index.json", "stub-sources-json")
      },
      "Notes / drafts": {
        title: "Notes · drafts",
        kicker: "corpus/notes/",
        context: "Working notes and in-progress drafts live alongside published work — dated, tagged, linkable.",
        tree: stubTreeFor("notes", "2024-09-18-reframation-notes.md", "stub-article-md")
      },
      "RSS / syndication": {
        title: "RSS · syndication",
        kicker: "corpus/feeds/",
        context: "Inbound feeds are normalized to the same Markdown + JSON pattern. Syndication out uses the same layer.",
        tree: stubTreeFor("feeds", "feeds-index.json", "stub-sources-json")
      }
    };

    /* ---------------------------------------------------------------------
       Render helpers
       --------------------------------------------------------------------- */
    function escapeHtml(str) {
      return String(str).replace(/[&<>"']/g, (c) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
      })[c]);
    }

    function renderTree(rows) {
      const parts = [];
      for (const row of rows) {
        const depth = row.depth || 0;
        if (row.type === "folder") {
          const dimCls = row.dim ? " tree__row--dim" : "";
          const twig = row.open ? "▾" : "▸";
          const twigCls = row.open ? " tree__twig--open" : "";
          const meta = row.meta ? `<span class="tree__meta">${escapeHtml(row.meta)}</span>` : "<span></span>";
          parts.push(
            `<div class="tree__row tree__row--folder${dimCls}" style="--d: ${depth}">` +
              `<span class="tree__twig${twigCls}" aria-hidden="true">${twig}</span>` +
              `<span class="tree__name">${escapeHtml(row.name)}/</span>` +
              meta +
            `</div>`
          );
        } else if (row.type === "file") {
          const kind = row.name.endsWith(".json") ? "json" : row.name.endsWith(".md") ? "md" : "file";
          const twig = kind === "json" ? "{ }" : kind === "md" ? "M" : "·";
          const feat = row.featured ? " tree__row--featured" : "";
          const dim = row.dim ? " tree__row--dim" : "";
          const meta = row.meta ? `<span class="tree__meta">${escapeHtml(row.meta)}</span>` : "<span></span>";
          parts.push(
            `<button type="button" class="tree__row tree__row--file${feat}${dim}" style="--d: ${depth}" data-file-key="${escapeHtml(row.fileKey || "")}">` +
              `<span class="tree__twig tree__twig--${kind}" aria-hidden="true">${twig}</span>` +
              `<span class="tree__name">${escapeHtml(row.name)}</span>` +
              meta +
            `</button>`
          );
        } else if (row.type === "ellipsis") {
          parts.push(
            `<div class="tree__ellipsis" style="--d: ${depth}">${escapeHtml(row.text)}</div>`
          );
        } else if (row.type === "note") {
          parts.push(
            `<div class="tree__note" style="--d: ${depth}">${row.html}</div>`
          );
        }
      }
      return parts.join("");
    }

    function openFile(fileKey) {
      const file = FILES[fileKey];
      if (!file) return;
      if (file.kind === "json") {
        if (fileKicker) fileKicker.textContent = file.path || "";
        if (fileTitle) fileTitle.textContent = file.name;
        jsonBody.textContent = JSON.stringify(file.body, null, 2);
        dlgFolder.close();
        dlgJson.showModal();
      } else if (file.kind === "md") {
        if (mdKicker) mdKicker.textContent = file.path || "";
        if (mdTitle) mdTitle.textContent = file.name;
        if (mdSub) mdSub.textContent = file.sub || "";
        mdBody.innerHTML = file.html;
        dlgFolder.close();
        dlgMd.showModal();
      }
    }

    function openFolder(folderName) {
      const spec = FOLDERS[folderName] || FOLDERS["Books"];
      if (folderTitle) folderTitle.textContent = spec.title;
      const kickerEl = dlgFolder.querySelector(".asset-dlg__kicker");
      if (kickerEl && spec.kicker) kickerEl.textContent = spec.kicker;
      if (folderCtx) folderCtx.innerHTML = spec.context || "";
      if (folderFineprint) folderFineprint.innerHTML =
        spec.fineprint || "Click any <code>.json</code> or <code>.md</code> file to open it.";
      folderTree.innerHTML = renderTree(spec.tree || []);
      dlgFolder.showModal();
    }

    /* ---------------------------------------------------------------------
       Event wiring
       --------------------------------------------------------------------- */
    document.querySelectorAll("[data-close-dialog]").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.closest("dialog")?.close();
      });
    });

    document.querySelectorAll(".node-folder-hit").forEach((hit) => {
      const activate = (e) => {
        e.stopPropagation();
        if (!viz || viz.dataset.stage !== "2") return;
        const name = hit.getAttribute("data-folder-name") || "Books";
        openFolder(name);
      };
      hit.addEventListener("click", activate);
      hit.addEventListener("keydown", (e) => {
        if (!viz || viz.dataset.stage !== "2") return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          activate(e);
        }
      });
    });

    folderTree.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-file-key]");
      if (!btn) return;
      const key = btn.getAttribute("data-file-key");
      if (key) openFile(key);
    });
  }

  if (prefersReduced || !("IntersectionObserver" in window)) {
    /* Reduced motion: CSS already pins the viz in its final state. Mark
       the final stage active for accessibility semantics.                  */
    setActiveStage(6);
    wireIntegrationDialogs();
    return;
  }

  /* Watch the center ±10% of the viewport. Each .stage is at least 100dvh
     tall so exactly one should be inside this band at any time.            */
  const io = new IntersectionObserver(
    (entries) => {
      /* Pick the entry with the largest intersection ratio as "active". */
      let best = null;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (!best || entry.intersectionRatio > best.intersectionRatio) {
          best = entry;
        }
      }
      if (best) {
        const n = Number(best.target.dataset.stage);
        if (Number.isFinite(n)) setActiveStage(n);
      }
    },
    {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );
  stages.forEach((s) => io.observe(s));

  /* Initial: first stage active. */
  setActiveStage(1);
  wireIntegrationDialogs();
})();
