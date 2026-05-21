/**
 * Writes docs/html/alan-hirsch-research-collated static assets (HTML, CSS, JS).
 * Run via: pnpm docs:alan-hirsch-research-html (calls build + this).
 */
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

import { STYLES_CSS } from "./alan-hirsch-research-viewer-styles";

export const VIEWER_OUT_DIRS = [
  path.join(process.cwd(), "docs/movement_leader_research/alan-hirsch/collated"),
  path.join(process.cwd(), "docs/html/alan-hirsch-research-collated"),
] as const;

const INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Alan Hirsch — Research Collated</title>
  <meta name="description" content="Movement leader research substrate — full collated corpus with sidebar navigation." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Newsreader:ital,wght@0,400;1,400&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="./styles.css" />
</head>
<body>
  <a class="ahrs-skip" href="#main-content">Skip to content</a>
  <header class="ahrs-topbar" role="banner">
    <button type="button" class="ahrs-btn ahrs-btn--icon ahrs-menu-btn" id="menu-toggle" aria-expanded="false" aria-controls="sidebar" title="Table of contents">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
    </button>
    <div class="ahrs-topbar__brand">
      <p class="ahrs-topbar__kicker">Movemental · Movement leader research</p>
      <p class="ahrs-topbar__title" id="topbar-title">Alan Hirsch — Research Collated</p>
    </div>
    <div class="ahrs-search" role="search">
      <svg class="ahrs-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
      <input type="search" id="content-search" placeholder="Search in page…" aria-label="Search document content" autocomplete="off" />
    </div>
    <div class="ahrs-topbar__actions">
      <button type="button" class="ahrs-btn" id="theme-toggle" title="Toggle light/dark">Theme</button>
      <button type="button" class="ahrs-btn" id="print-btn" title="Print">Print</button>
    </div>
    <div class="ahrs-progress" id="read-progress" aria-hidden="true"></div>
  </header>
  <div class="ahrs-overlay" id="overlay" hidden></div>
  <div class="ahrs-layout">
    <aside class="ahrs-sidebar" id="sidebar" aria-label="Table of contents">
      <div class="ahrs-sidebar__head">
        <p class="ahrs-sidebar__label">On this page</p>
        <input type="search" class="ahrs-sidebar__filter" id="toc-filter" placeholder="Filter sections…" aria-label="Filter table of contents" autocomplete="off" />
      </div>
      <nav class="ahrs-sidebar__nav">
        <ul class="ahrs-toc" id="toc-root"></ul>
      </nav>
      <p class="ahrs-sidebar__meta" id="sidebar-meta">Loading…</p>
    </aside>
    <main class="ahrs-main" id="main-content">
      <div class="ahrs-sheet">
        <header class="ahrs-hero" id="doc-hero">
          <h1 id="doc-title">Alan Hirsch — Movement Leader Research</h1>
          <ul class="ahrs-hero__meta" id="doc-meta-list"></ul>
          <p class="ahrs-hero__purpose" id="doc-purpose"></p>
        </header>
        <article class="ahrs-prose" id="doc-body">
          <p class="ahrs-status">Loading research corpus…</p>
        </article>
      </div>
    </main>
  </div>
  <button type="button" class="ahrs-btn ahrs-btn--primary ahrs-back-top" id="back-top" aria-label="Back to top">↑</button>
  <script src="./viewer.js" defer></script>
</body>
</html>
`;

const VIEWER_JS = `/**
 * Alan Hirsch research collated viewer — loads bundle.json (full markdown render).
 * Serve from repo docs root: pnpm reader:serve → /html/alan-hirsch-research-collated/
 */
(function () {
  "use strict";

  var BUNDLE_URL = "./bundle.json";
  var FALLBACK_MD = "../../movement_leader_research/alan-hirsch/ALAN_HIRSCH_RESEARCH_COLLATED.md";

  var state = { bundle: null, headings: [], activeId: null };

  function $(id) { return document.getElementById(id); }

  function debounce(fn, ms) {
    var t;
    return function () {
      var a = arguments;
      clearTimeout(t);
      t = setTimeout(function () { fn.apply(null, a); }, ms);
    };
  }

  function slugify(text) {
    return String(text).toLowerCase()
      .replace(/<[^>]+>/g, "")
      .replace(/[^\\w\\s-]/g, "")
      .replace(/\\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "section";
  }

  function flattenToc(nodes, out) {
    out = out || [];
    (nodes || []).forEach(function (n) {
      out.push(n);
      if (n.children && n.children.length) flattenToc(n.children, out);
    });
    return out;
  }

  function renderTocItem(entry) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "#" + entry.id;
    a.dataset.level = String(entry.level);
    a.textContent = entry.text;
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var el = document.getElementById(entry.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        closeSidebar();
      }
    });
    li.appendChild(a);
    if (entry.children && entry.children.length) {
      var ul = document.createElement("ul");
      entry.children.forEach(function (c) { ul.appendChild(renderTocItem(c)); });
      li.appendChild(ul);
    }
    return li;
  }

  function buildToc(root, nodes) {
    root.innerHTML = "";
    (nodes || []).forEach(function (n) { root.appendChild(renderTocItem(n)); });
  }

  function filterToc(q) {
    var t = String(q || "").trim().toLowerCase();
    document.querySelectorAll(".ahrs-toc a").forEach(function (a) {
      var li = a.closest("li");
      if (!li) return;
      var show = !t || a.textContent.toLowerCase().indexOf(t) !== -1;
      li.style.display = show ? "" : "none";
    });
  }

  function wrapTables(container) {
    container.querySelectorAll("table").forEach(function (table) {
      if (table.parentElement && table.parentElement.classList.contains("ahrs-table-wrap")) return;
      var wrap = document.createElement("div");
      wrap.className = "ahrs-table-wrap";
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    });
  }

  function setMeta(bundle) {
    var m = bundle.meta || {};
    $("doc-title").textContent = m.title || "Alan Hirsch — Research Collated";
    $("topbar-title").textContent = m.title || "Research Collated";
    var list = $("doc-meta-list");
    list.innerHTML = "";
    function addItem(label, val) {
      if (!val) return;
      var li = document.createElement("li");
      li.innerHTML = "<strong>" + label + ":</strong> " + val;
      list.appendChild(li);
    }
    addItem("Slug", m.slug);
    addItem("Version", m.version);
    addItem("Updated", m.lastUpdated);
    addItem("Sections", String(m.headingCount || state.headings.length));
    addItem("Lines", String(m.lineCount || "—"));
    $("doc-purpose").textContent =
      "Machine-readable corpus for identity resolution, relational traversal, conceptual indexing, and voice fidelity. Full substrate — no truncation.";
    $("sidebar-meta").textContent =
      (m.headingCount || "?") + " headings · " + (m.lineCount || "?") + " lines · " + (m.generatedAt ? new Date(m.generatedAt).toLocaleDateString() : "");
  }

  function mountContent(bundle) {
    state.bundle = bundle;
    state.headings = flattenToc(bundle.toc || []);
    var body = $("doc-body");
    body.innerHTML = bundle.html || "<p class=\\"ahrs-status ahrs-status--error\\">Empty bundle.</p>";
    wrapTables(body);
    buildToc($("toc-root"), bundle.toc || []);
    setMeta(bundle);
    setupScrollSpy();
    document.title = (bundle.meta && bundle.meta.title) || document.title;
  }

  function setupScrollSpy() {
    var headings = Array.prototype.slice.call(
      document.querySelectorAll(".ahrs-prose h1[id], .ahrs-prose h2[id], .ahrs-prose h3[id], .ahrs-prose h4[id]")
    );
    if (!headings.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            state.activeId = entry.target.id;
            document.querySelectorAll(".ahrs-toc a").forEach(function (a) {
              a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
            });
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    headings.forEach(function (h) { observer.observe(h); });
  }

  function updateProgress() {
    var doc = document.documentElement;
    var scrollTop = doc.scrollTop || document.body.scrollTop;
    var height = doc.scrollHeight - doc.clientHeight;
    var pct = height > 0 ? (scrollTop / height) * 100 : 0;
    var bar = $("read-progress");
    if (bar) bar.style.width = pct + "%";
    var btn = $("back-top");
    if (btn) btn.classList.toggle("is-visible", scrollTop > 400);
  }

  function highlightSearch(q) {
    var body = $("doc-body");
    if (!body) return;
    body.querySelectorAll(".ahrs-mark").forEach(function (el) {
      var p = el.parentNode;
      if (!p) return;
      p.replaceChild(document.createTextNode(el.textContent), el);
      p.normalize();
    });
    var t = String(q || "").trim();
    if (t.length < 2) return;
    var walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    var re = new RegExp(t.replace(/[.*+?^\\$\\{\\}()|[\\]\\\\]/g, "\\\\$&"), "gi");
    nodes.forEach(function (node) {
      var text = node.nodeValue;
      if (!text || !re.test(text)) return;
      re.lastIndex = 0;
      var frag = document.createDocumentFragment();
      var last = 0;
      var m;
      while ((m = re.exec(text))) {
        if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        var mark = document.createElement("mark");
        mark.className = "ahrs-mark";
        mark.textContent = m[0];
        frag.appendChild(mark);
        last = m.index + m[0].length;
      }
      if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
      node.parentNode.replaceChild(frag, node);
    });
  }

  function closeSidebar() {
    $("sidebar").classList.remove("is-open");
    $("overlay").classList.remove("is-visible");
    $("overlay").hidden = true;
    $("menu-toggle").setAttribute("aria-expanded", "false");
  }

  function openSidebar() {
    $("sidebar").classList.add("is-open");
    $("overlay").classList.add("is-visible");
    $("overlay").hidden = false;
    $("menu-toggle").setAttribute("aria-expanded", "true");
  }

  function bindChrome() {
    $("menu-toggle").addEventListener("click", function () {
      if ($("sidebar").classList.contains("is-open")) closeSidebar();
      else openSidebar();
    });
    $("overlay").addEventListener("click", closeSidebar);
    $("back-top").addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    $("print-btn").addEventListener("click", function () { window.print(); });
    $("theme-toggle").addEventListener("click", function () {
      document.documentElement.classList.toggle("dark");
      try {
        localStorage.setItem("ahrs-theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
      } catch (e) {}
    });
    var saved = null;
    try { saved = localStorage.getItem("ahrs-theme"); } catch (e) {}
    if (saved === "dark") document.documentElement.classList.add("dark");

    $("toc-filter").addEventListener("input", function (e) {
      filterToc(e.target.value);
    });
    $("content-search").addEventListener(
      "input",
      debounce(function (e) {
        highlightSearch(e.target.value);
      }, 200)
    );
    window.addEventListener("scroll", debounce(updateProgress, 50), { passive: true });
    updateProgress();
  }

  function showError(msg) {
    $("doc-body").innerHTML = '<p class="ahrs-status ahrs-status--error">' + msg + "</p>";
    $("sidebar-meta").textContent = "Load failed";
  }

  function loadBundle() {
    return fetch(BUNDLE_URL).then(function (r) {
      if (!r.ok) throw new Error("bundle.json not found (" + r.status + "). Run: pnpm docs:alan-hirsch-research-html");
      return r.json();
    });
  }

  function init() {
    bindChrome();
    loadBundle()
      .then(mountContent)
      .catch(function (err) {
        showError(err.message || String(err));
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
`;

export async function writeViewerAssets(outDirs: readonly string[] = VIEWER_OUT_DIRS): Promise<void> {
  for (const outDir of outDirs) {
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), INDEX_HTML, "utf8");
    await writeFile(path.join(outDir, "viewer.js"), VIEWER_JS, "utf8");
    await writeFile(path.join(outDir, "styles.css"), STYLES_CSS, "utf8");
  }
}
