/* Movemental Reader — client-side router, markdown loader, and UI glue.
   No build step. Loads marked.js from a CDN for Markdown → HTML. */

(function () {
  "use strict";

  const M = window.READER_MANIFEST;
  if (!M) throw new Error("Reader manifest missing — assets/manifest.js did not load.");

  const WPM = 220;
  const STORAGE_PREFIX = "movemental-reader:";
  const STORAGE_KEYS = {
    fontScale: STORAGE_PREFIX + "font-scale",
    theme:     STORAGE_PREFIX + "theme",
    tab:       STORAGE_PREFIX + "tab",
    filter:    STORAGE_PREFIX + "filter",
    read:      STORAGE_PREFIX + "read",            // map of doc ids → { scroll, updatedAt }
    finished:  STORAGE_PREFIX + "finished"         // set of doc ids
  };

  // ---------------- Storage helpers ----------------
  function loadJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  }
  function saveJSON(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  }

  // ---------------- Theme ----------------
  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else if (theme === "light") root.classList.remove("dark");
    else {
      const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", prefersDark);
    }
  }
  function setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    applyTheme(theme);
    updateThemeIcon();
  }
  function currentTheme() {
    return localStorage.getItem(STORAGE_KEYS.theme) || "system";
  }
  function updateThemeIcon() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    const isDark = document.documentElement.classList.contains("dark");
    btn.innerHTML = isDark
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }

  // ---------------- Manifest lookups ----------------
  function allEntries() {
    return [
      ...M.book.chapters.map((c, i) => ({
        ...c,
        kind: "book",
        root: M.book.root,
        index: i,
        displayTitle: c.title,
        displayEyebrow: c.label
      })),
      ...M.articles.map(a => ({
        ...a,
        kind: "article",
        displayTitle: a.title,
        displayEyebrow: (M.articleCategories.find(c => c.id === a.category) || {}).label || "Article"
      }))
    ];
  }
  function findEntry(kind, id) {
    if (kind === "book") {
      const idx = M.book.chapters.findIndex(c => c.id === id);
      if (idx === -1) return null;
      const c = M.book.chapters[idx];
      return {
        ...c,
        kind: "book",
        root: M.book.root,
        index: idx,
        prev: idx > 0 ? M.book.chapters[idx - 1] : null,
        next: idx < M.book.chapters.length - 1 ? M.book.chapters[idx + 1] : null
      };
    }
    const a = M.articles.find(x => x.id === id);
    if (!a) return null;
    return { ...a, kind: "article" };
  }
  function fullDocId(e) { return `${e.kind}:${e.id}`; }
  function readingMinutes(words) {
    return Math.max(1, Math.round(words / WPM));
  }

  // ---------------- Router ----------------
  // Hash shapes:
  //   #/                       → library (default)
  //   #/book/:id               → reader, book chapter
  //   #/article/:id            → reader, article
  function parseHash() {
    const h = location.hash || "#/";
    const [, ...parts] = h.split("/");
    if (!parts.length || parts[0] === "") return { route: "library" };
    if (parts[0] === "book" && parts[1]) return { route: "reader", kind: "book", id: parts[1] };
    if (parts[0] === "article" && parts[1]) return { route: "reader", kind: "article", id: parts[1] };
    return { route: "library" };
  }
  function navigate(hash) {
    if (location.hash === hash) handleRoute();
    else location.hash = hash;
  }

  // ---------------- Rendering: library ----------------
  function renderLibrary() {
    document.body.dataset.view = "library";
    document.getElementById("app-crumb").innerHTML =
      `<strong>Library</strong> · ${M.book.chapters.length} chapters · ${M.articles.length} articles`;

    // Stats
    const totalWords =
      M.book.chapters.reduce((s, c) => s + c.words, 0) +
      M.articles.reduce((s, a) => s + a.words, 0);
    const statsEl = document.getElementById("hero-stats");
    if (statsEl) {
      const finished = loadJSON(STORAGE_KEYS.finished, []);
      statsEl.innerHTML = [
        { num: M.book.chapters.length,              label: "Book chapters" },
        { num: M.articles.length,                   label: "Articles" },
        { num: `${Math.round(totalWords / 1000)}k`, label: "Words total" },
        { num: `${finished.length}`,                label: "Marked read" }
      ].map(s => `
        <div class="hero__stat">
          <div class="hero__stat-num">${s.num}</div>
          <div class="hero__stat-label">${s.label}</div>
        </div>`).join("");
    }

    const activeTab = localStorage.getItem(STORAGE_KEYS.tab) || "book";
    renderTabs(activeTab);
    renderLibraryContent(activeTab);
  }

  function renderTabs(active) {
    const host = document.getElementById("lib-tabs");
    host.innerHTML = `
      <div class="seg" role="tablist">
        <button class="seg__btn ${active === "book" ? "is-active" : ""}" data-tab="book"     role="tab">Book · ${M.book.chapters.length}</button>
        <button class="seg__btn ${active === "articles" ? "is-active" : ""}" data-tab="articles" role="tab">Articles · ${M.articles.length}</button>
      </div>`;
    host.querySelectorAll("[data-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        localStorage.setItem(STORAGE_KEYS.tab, tab);
        renderTabs(tab);
        renderLibraryContent(tab);
      });
    });
  }

  function renderLibraryContent(tab) {
    const host = document.getElementById("lib-content");
    if (tab === "book") host.innerHTML = bookSectionHTML();
    else host.innerHTML = articlesSectionHTML();

    bindCards(host);

    if (tab === "articles") {
      bindFilters(host);
    }
  }

  function bookSectionHTML() {
    const read = loadJSON(STORAGE_KEYS.read, {});
    const finished = new Set(loadJSON(STORAGE_KEYS.finished, []));

    return `
      <section class="lib-section" aria-labelledby="book-heading">
        <div class="lib-section__head">
          <div>
            <p class="lib-section__eyebrow">Manuscript</p>
            <h2 class="lib-section__title" id="book-heading">${escapeHTML(M.book.title)}</h2>
            <p class="lib-section__subtitle">${escapeHTML(M.book.subtitle)}</p>
          </div>
          <div class="lib-section__subtitle" style="text-align:right;">
            ${M.book.chapters.reduce((s, c) => s + c.words, 0).toLocaleString()} words ·
            ≈ ${readingMinutes(M.book.chapters.reduce((s, c) => s + c.words, 0))} min
          </div>
        </div>
        <div class="card-grid">
          ${M.book.chapters.map((c, i) => {
            const did = `book:${c.id}`;
            const isDone = finished.has(did);
            const progress = (read[did] && read[did].progress) || 0;
            return cardHTML({
              href: `#/book/${c.id}`,
              eyebrow: c.label,
              title: c.title,
              meta: `${readingMinutes(c.words)} min · ${c.words.toLocaleString()} words`,
              badge: String(i + 1).padStart(2, "0"),
              isRead: isDone,
              progress
            });
          }).join("")}
        </div>
      </section>`;
  }

  function articlesSectionHTML() {
    const currentFilter = localStorage.getItem(STORAGE_KEYS.filter) || "all";
    const read = loadJSON(STORAGE_KEYS.read, {});
    const finished = new Set(loadJSON(STORAGE_KEYS.finished, []));

    const countByCat = {};
    M.articleCategories.forEach(c => { countByCat[c.id] = 0; });
    countByCat.all = M.articles.length;
    M.articles.forEach(a => { if (countByCat[a.category] != null) countByCat[a.category]++; });

    const filtered = currentFilter === "all"
      ? M.articles
      : M.articles.filter(a => a.category === currentFilter);

    return `
      <section class="lib-section" aria-labelledby="articles-heading">
        <div class="lib-section__head">
          <div>
            <p class="lib-section__eyebrow">Drafts</p>
            <h2 class="lib-section__title" id="articles-heading">Articles</h2>
            <p class="lib-section__subtitle">Everything drafted across pillars — strategy, courses, nonprofit builds, and platform copy.</p>
          </div>
          <div class="lib-section__subtitle" style="text-align:right;">
            ${M.articles.reduce((s, a) => s + a.words, 0).toLocaleString()} words across ${M.articles.length} pieces
          </div>
        </div>
        <div class="filter-row" role="tablist" aria-label="Filter articles by category">
          ${M.articleCategories.map(c => `
            <button class="pill-btn ${c.id === currentFilter ? "is-active" : ""}" data-filter="${c.id}">
              ${escapeHTML(c.label)}
              <span class="pill-btn__count">${countByCat[c.id] || 0}</span>
            </button>
          `).join("")}
        </div>
        <div class="card-grid" id="articles-grid">
          ${filtered.length === 0
            ? `<div class="empty">No articles in this category yet.</div>`
            : filtered.map(a => {
                const did = `article:${a.id}`;
                const isDone = finished.has(did);
                const progress = (read[did] && read[did].progress) || 0;
                const cat = M.articleCategories.find(c => c.id === a.category);
                return cardHTML({
                  href: `#/article/${a.id}`,
                  eyebrow: cat ? cat.label : "Article",
                  title: a.title,
                  meta: `${readingMinutes(a.words)} min · ${a.words.toLocaleString()} words`,
                  badge: null,
                  isRead: isDone,
                  progress
                });
              }).join("")}
        </div>
      </section>`;
  }

  function cardHTML({ href, eyebrow, title, meta, badge, isRead, progress }) {
    return `
      <a class="card ${isRead ? "is-read" : ""}" href="${href}">
        <div class="card__eyebrow-row">
          <span class="card__eyebrow">${escapeHTML(eyebrow)}</span>
          ${badge ? `<span class="card__badge">${escapeHTML(badge)}</span>`
                 : `<span class="card__meta">${isRead ? "Read" : ""}</span>`}
        </div>
        <h3 class="card__title">${escapeHTML(title)}</h3>
        <div class="card__footer">
          <span class="card__cta">
            Open
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </span>
          <span class="card__meta">${escapeHTML(meta)}</span>
        </div>
        ${progress > 0 && progress < 100
          ? `<div class="card__progress"><div class="card__progress-fill" style="width:${progress}%"></div></div>` : ""}
      </a>`;
  }

  function bindCards(root) {
    // Links handle navigation themselves via hash.
  }

  function bindFilters(root) {
    root.querySelectorAll("[data-filter]").forEach(btn => {
      btn.addEventListener("click", () => {
        const f = btn.dataset.filter;
        localStorage.setItem(STORAGE_KEYS.filter, f);
        renderLibraryContent("articles");
      });
    });
  }

  // ---------------- Rendering: reader ----------------
  async function renderReader(kind, id) {
    const entry = findEntry(kind, id);
    if (!entry) {
      navigate("#/");
      return;
    }

    document.body.dataset.view = "reader";
    const crumb = document.getElementById("app-crumb");
    const catLabel = kind === "book"
      ? M.book.title
      : (M.articleCategories.find(c => c.id === entry.category) || {}).label || "Article";
    crumb.innerHTML = `<a href="#/" style="color:inherit;text-decoration:none">Library</a> · <strong>${escapeHTML(catLabel)}</strong> · ${escapeHTML(entry.title)}`;

    renderSidebar(kind, id);
    const main = document.getElementById("reader-main");
    main.innerHTML = `<div class="state-block"><div class="spinner"></div><div>Loading <code>${escapeHTML(entry.file)}</code>…</div></div>`;

    const url = (entry.root || "") + entry.file;
    try {
      const res = await fetch(encodeURI(url), { cache: "no-cache" });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const md = await res.text();
      const html = mdToHTML(stripFrontmatter(md));
      renderArticle(entry, html);
      hydrateRail();
      hydrateProgress();
      restoreScroll(entry);
    } catch (err) {
      main.innerHTML = `
        <div class="state-block">
          <h2>Could not load document</h2>
          <p>Tried to fetch <code>${escapeHTML(url)}</code></p>
          <p style="font-size:0.82rem;">${escapeHTML(err.message || String(err))}</p>
          <p style="margin-top:20px;">If you opened this file via <code>file://</code>, some browsers block local fetches. Serve <code>docs/</code> with a tiny static server (see docs/reader/README.md).</p>
        </div>`;
    }
  }

  function renderSidebar(kind, id) {
    const side = document.getElementById("reader-sidebar");
    if (kind === "book") {
      const finished = new Set(loadJSON(STORAGE_KEYS.finished, []));
      side.innerHTML = `
        <div class="reader-sidebar__head">
          <p class="reader-sidebar__label">Manuscript</p>
          <h2 class="reader-sidebar__title">${escapeHTML(M.book.title)}</h2>
          <p class="reader-sidebar__sub">${escapeHTML(M.book.subtitle)}</p>
        </div>
        <nav class="reader-sidebar__scroll" aria-label="Chapter list">
          <ul class="toc">
            ${M.book.chapters.map((c, i) => {
              const done = finished.has(`book:${c.id}`);
              return `
                <li class="toc__item ${c.id === id ? "is-current" : ""}">
                  <a href="#/book/${c.id}">
                    <span class="toc__num">${String(i + 1).padStart(2, "0")}</span>
                    <span>${escapeHTML(c.title)}${done ? " ✓" : ""}</span>
                  </a>
                </li>`;
            }).join("")}
          </ul>
        </nav>`;
    } else {
      const finished = new Set(loadJSON(STORAGE_KEYS.finished, []));
      const cat = M.articleCategories.find(c => c.id === findEntry("article", id).category);
      side.innerHTML = `
        <div class="reader-sidebar__head">
          <p class="reader-sidebar__label">${escapeHTML(cat ? cat.label : "Articles")}</p>
          <h2 class="reader-sidebar__title">Articles</h2>
          <p class="reader-sidebar__sub">${M.articles.length} pieces</p>
        </div>
        <nav class="reader-sidebar__scroll" aria-label="Article list">
          <ul class="toc">
            ${M.articles
              .slice()
              .sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title))
              .map(a => {
                const done = finished.has(`article:${a.id}`);
                return `
                  <li class="toc__item ${a.id === id ? "is-current" : ""}">
                    <a href="#/article/${a.id}">
                      <span class="toc__num">${readingMinutes(a.words)}m</span>
                      <span>${escapeHTML(a.title)}${done ? " ✓" : ""}</span>
                    </a>
                  </li>`;
              }).join("")}
          </ul>
        </nav>`;
    }
  }

  function renderArticle(entry, html) {
    const main = document.getElementById("reader-main");
    const prevNext = entry.kind === "book"
      ? { prev: entry.prev, next: entry.next }
      : { prev: null, next: null };

    const eyebrow = entry.kind === "book"
      ? entry.label
      : (M.articleCategories.find(c => c.id === entry.category) || {}).label || "Article";

    const finishedKey = fullDocId(entry);
    const isFinished = (loadJSON(STORAGE_KEYS.finished, []) || []).includes(finishedKey);

    main.innerHTML = `
      <article class="reader-article">
        <p class="reader-article__eyebrow">${escapeHTML(eyebrow)}</p>
        <h1 class="reader-article__title">${escapeHTML(entry.title)}</h1>
        <p class="reader-article__meta">
          ${readingMinutes(entry.words)} min read · ${entry.words.toLocaleString()} words ·
          <button id="toggle-finished" class="pill-btn" style="padding:2px 10px;font-size:0.72rem;">
            ${isFinished ? "✓ Marked read" : "Mark as read"}
          </button>
        </p>
        <hr class="reader-article__rule"/>
        <div class="prose" id="prose">${html}</div>

        <div class="chapter-nav">
          ${prevNext.prev
            ? `<a href="#/book/${prevNext.prev.id}">
                 <p class="chapter-nav__dir">← Previous</p>
                 <p class="chapter-nav__title">${escapeHTML(prevNext.prev.title)}</p>
               </a>`
            : `<a href="#/" style="cursor:pointer;">
                 <p class="chapter-nav__dir">← Back</p>
                 <p class="chapter-nav__title">Library</p>
               </a>`}
          ${prevNext.next
            ? `<a class="is-next" href="#/book/${prevNext.next.id}">
                 <p class="chapter-nav__dir">Next →</p>
                 <p class="chapter-nav__title">${escapeHTML(prevNext.next.title)}</p>
               </a>`
            : `<a class="is-next" href="#/">
                 <p class="chapter-nav__dir">Library →</p>
                 <p class="chapter-nav__title">Back to index</p>
               </a>`}
        </div>
      </article>`;

    // Give every heading an id for rail TOC + anchor scroll
    main.querySelectorAll(".prose h2, .prose h3").forEach((h, i) => {
      if (!h.id) h.id = "h-" + slugify(h.textContent) + "-" + i;
    });
    hardenLinks(document.getElementById("prose"));

    document.getElementById("toggle-finished").addEventListener("click", (e) => {
      e.preventDefault();
      toggleFinished(finishedKey);
      e.currentTarget.textContent =
        (loadJSON(STORAGE_KEYS.finished, []) || []).includes(finishedKey) ? "✓ Marked read" : "Mark as read";
    });
  }

  function hydrateRail() {
    const rail = document.getElementById("reader-rail");
    const prose = document.getElementById("prose");
    if (!rail || !prose) return;
    const headings = prose.querySelectorAll("h2, h3");
    if (!headings.length) { rail.innerHTML = ""; return; }
    rail.innerHTML = `
      <p class="reader-rail__label">On this page</p>
      <ul class="rail-toc">
        ${Array.from(headings).map(h => `
          <li class="rail-toc__item ${h.tagName === "H3" ? "is-h3" : ""}" data-target="${h.id}">
            <a href="#${h.id}">${escapeHTML(h.textContent)}</a>
          </li>`).join("")}
      </ul>`;

    const items = rail.querySelectorAll(".rail-toc__item");
    const map = new Map();
    items.forEach(it => map.set(it.dataset.target, it));

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          items.forEach(i => i.classList.remove("is-current"));
          const it = map.get(e.target.id);
          if (it) it.classList.add("is-current");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px", threshold: 0 });
    headings.forEach(h => io.observe(h));
  }

  // ---------------- Progress + scroll memory ----------------
  let progressTick = null;
  function hydrateProgress() {
    const fill = document.getElementById("progress-fill");
    if (!fill) return;
    const prose = document.getElementById("prose");
    if (!prose) { fill.style.width = "0%"; return; }
    const onScroll = () => {
      if (progressTick) return;
      progressTick = requestAnimationFrame(() => {
        const rect = prose.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const total = prose.offsetHeight + rect.top;
        const travelled = Math.min(Math.max(-rect.top + vh * 0.35, 0), prose.offsetHeight);
        const pct = Math.min(100, Math.max(0, (travelled / prose.offsetHeight) * 100));
        fill.style.width = pct.toFixed(1) + "%";
        persistProgress(pct);
        progressTick = null;
      });
    };
    window.removeEventListener("scroll", window.__readerScroll);
    window.__readerScroll = onScroll;
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function persistProgress(pct) {
    const route = parseHash();
    if (route.route !== "reader") return;
    const key = `${route.kind}:${route.id}`;
    const store = loadJSON(STORAGE_KEYS.read, {}) || {};
    store[key] = { scroll: window.scrollY, progress: Math.round(pct), updatedAt: Date.now() };
    saveJSON(STORAGE_KEYS.read, store);
  }

  function restoreScroll(entry) {
    const key = fullDocId(entry);
    const store = loadJSON(STORAGE_KEYS.read, {}) || {};
    const remembered = store[key];
    // If there is a hash fragment target on the URL, let browser handle it.
    if (location.hash.includes("#", 1)) return;
    if (remembered && remembered.scroll && remembered.scroll > 100) {
      // Offer gentle restore only if they've read some.
      window.scrollTo({ top: remembered.scroll, behavior: "instant" in window ? "instant" : "auto" });
    } else {
      window.scrollTo({ top: 0 });
    }
  }

  function toggleFinished(key) {
    const list = loadJSON(STORAGE_KEYS.finished, []) || [];
    const next = list.includes(key) ? list.filter(k => k !== key) : [...list, key];
    saveJSON(STORAGE_KEYS.finished, next);
  }

  // ---------------- Markdown ----------------
  function stripFrontmatter(md) {
    // YAML frontmatter
    if (md.startsWith("---")) {
      const end = md.indexOf("\n---", 3);
      if (end !== -1) return md.slice(md.indexOf("\n", end + 4) + 1);
    }
    return md;
  }
  function mdToHTML(md) {
    if (!window.marked) return `<pre>${escapeHTML(md)}</pre>`;
    return window.marked.parse(md, { gfm: true, breaks: false });
  }

  function hardenLinks(root) {
    if (!root) return;
    root.querySelectorAll("a[href]").forEach(a => {
      const href = a.getAttribute("href") || "";
      const isLocal =
        href.startsWith("#") ||
        href.startsWith("./") ||
        href.startsWith("../") ||
        href.startsWith("/");
      if (!isLocal && /^https?:\/\//i.test(href)) {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      }
    });
  }

  // ---------------- Utilities ----------------
  function escapeHTML(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
  function escapeAttr(s) { return escapeHTML(s); }
  function slugify(s) {
    return String(s).toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .slice(0, 60);
  }

  // ---------------- Font scale ----------------
  const FONT_STEPS = { sm: 0.92, md: 1, lg: 1.12, xl: 1.24 };
  function applyFontScale(key) {
    const scale = FONT_STEPS[key] || 1;
    document.documentElement.style.setProperty("--reader-scale", scale);
    localStorage.setItem(STORAGE_KEYS.fontScale, key);
    syncFontControl(key);
  }
  function syncFontControl(active) {
    document.querySelectorAll("[data-font]").forEach(b => {
      b.classList.toggle("is-active", b.dataset.font === active);
    });
  }

  // ---------------- Route handler ----------------
  function handleRoute() {
    const r = parseHash();
    if (r.route === "library") {
      renderLibrary();
      window.scrollTo({ top: 0 });
    } else {
      renderReader(r.kind, r.id);
    }
    closeSidebar();
  }

  function closeSidebar() {
    const side = document.getElementById("reader-sidebar");
    if (side) side.classList.remove("is-open");
  }

  // ---------------- Keyboard ----------------
  function bindKeys() {
    document.addEventListener("keydown", (e) => {
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
      const r = parseHash();
      if (r.route !== "reader" || r.kind !== "book") return;
      const entry = findEntry("book", r.id);
      if (!entry) return;
      if (e.key === "ArrowRight" && entry.next) { e.preventDefault(); navigate(`#/book/${entry.next.id}`); }
      if (e.key === "ArrowLeft"  && entry.prev) { e.preventDefault(); navigate(`#/book/${entry.prev.id}`); }
    });
  }

  // ---------------- Boot ----------------
  function boot() {
    applyTheme(currentTheme());
    updateThemeIcon();
    applyFontScale(localStorage.getItem(STORAGE_KEYS.fontScale) || "md");

    document.getElementById("theme-toggle").addEventListener("click", () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "light" : "dark");
    });
    document.querySelectorAll("[data-font]").forEach(btn => {
      btn.addEventListener("click", () => applyFontScale(btn.dataset.font));
    });
    document.getElementById("sidebar-toggle").addEventListener("click", () => {
      const s = document.getElementById("reader-sidebar");
      s.classList.toggle("is-open");
    });
    document.getElementById("back-home").addEventListener("click", (e) => {
      e.preventDefault();
      navigate("#/");
    });

    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (currentTheme() === "system") applyTheme("system");
      updateThemeIcon();
    });

    window.addEventListener("hashchange", handleRoute);
    bindKeys();
    handleRoute();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
