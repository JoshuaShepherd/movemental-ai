/**
 * Local markdown reader: loads manifest.json + relative .md, renders with marked + DOMPurify.
 * Requires an HTTP server in this folder. Deep links: #/leader/file.md
 */
(function () {
  "use strict";

  var state = {
    manifest: null,
    leader: "",
    search: "",
    activePath: null,
  };

  function byId(id) {
    return document.getElementById(id);
  }

  function debounce(fn, t) {
    var idt;
    return function () {
      var a = arguments;
      clearTimeout(idt);
      idt = setTimeout(function () {
        fn.apply(null, a);
      }, t);
    };
  }

  function showFileBanner() {
    var b = byId("file-banner");
    if (b) b.classList.toggle("is-visible", location.protocol === "file:");
  }

  function getLeaderName(slug) {
    if (!slug) return "—";
    if (!state.manifest) return slug;
    for (var i = 0; i < state.manifest.leaders.length; i++) {
      if (state.manifest.leaders[i].slug === slug) {
        return state.manifest.leaders[i].name;
      }
    }
    return slug;
  }

  /** Heuristic: stitch file-row icon by folder group (sidebar signal). */
  function navIconName(group) {
    var g = (group || "").toLowerCase();
    if (g.indexOf("analysis") !== -1) return "query_stats";
    if (g.indexOf("content") !== -1) return "auto_stories";
    if (g.indexOf("digital") !== -1 || g.indexOf("presence") !== -1) return "public";
    if (g.indexOf("network") !== -1) return "hub";
    if (g.indexOf("media") !== -1) return "image";
    if (g.indexOf("profile") !== -1) return "person";
    if (g.indexOf("overview") !== -1 || g.indexOf("index") !== -1) return "menu_book";
    if (g.indexOf("all leaders") !== -1 || g.indexOf("—") !== -1) return "inventory_2";
    return "description";
  }

  function readHash() {
    var h = (location.hash || "").replace(/^#\/?/, "");
    if (!h) return null;
    return decodeURI(h);
  }

  function syncHash(path) {
    if (!path) return;
    if (readHash() === path) return;
    var next = location.pathname + location.search + "#/" + encodeURI(path);
    history.replaceState(null, document.title, next);
  }

  function pathToSlug(p) {
    if (!p) return null;
    if (p.indexOf("/") === -1) return "__root__";
    return p.split("/")[0];
  }

  function filterDocs(docs, q) {
    var t = String(q)
      .trim()
      .toLowerCase();
    if (!t) return docs;
    return docs.filter(function (d) {
      var p = d.path.toLowerCase();
      var y = d.title ? d.title.toLowerCase() : "";
      return (
        p.indexOf(t) !== -1 || y.indexOf(t) !== -1 || d.group.toLowerCase().indexOf(t) !== -1
      );
    });
  }

  function leaderDocList() {
    var m = state.manifest;
    if (!m) return [];
    if (state.leader === "__all__") {
      if (!state.search.trim()) return m.docs;
      return filterDocs(m.docs, state.search);
    }
    var base = m.docs.filter(function (d) {
      return d.slug === state.leader;
    });
    if (!state.search.trim()) return base;
    return filterDocs(base, state.search);
  }

  function groupKey(doc) {
    if (state.leader === "__all__") {
      return getLeaderName(doc.slug) + " — " + doc.group;
    }
    return doc.group;
  }

  function escapeAttr(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var renderMd;
  function ensureRender() {
    if (typeof window.marked === "undefined" || typeof DOMPurify === "undefined") {
      return null;
    }
    if (renderMd) return renderMd;
    window.marked.setOptions({ gfm: true, mangle: false, headerIds: true });
    renderMd = function (s) {
      return window.marked.parse(s, { async: false });
    };
    return renderMd;
  }

  function purifyAndWrapTable(html) {
    var d = document.createElement("div");
    d.innerHTML = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
    var tables = d.querySelectorAll("table");
    for (var i = 0; i < tables.length; i++) {
      var t = tables[i];
      var w = document.createElement("div");
      w.className = "table-wrap";
      t.replaceWith(w);
      w.appendChild(t);
    }
    return d.innerHTML;
  }

  function setDocChips(leaderName) {
    var ch = byId("doc-chips");
    if (!ch) return;
    ch.innerHTML = "";
    if (leaderName && leaderName !== "—") {
      var a = document.createElement("span");
      a.className = "mlr-doc-chip";
      a.textContent = leaderName;
      ch.appendChild(a);
    }
    var t = document.createElement("span");
    t.className = "mlr-doc-chip mlr-doc-chip--quiet";
    t.textContent = "Markdown";
    ch.appendChild(t);
  }

  function setCrumb() {
    var c = byId("breadcrumb");
    if (!c) return;
    if (state.activePath) {
      c.innerHTML = "<code class=\"mlr-breadcrumb-code\">" + escapeAttr(state.activePath) + "</code>";
    } else {
      c.textContent = "Pick a document in the library panel.";
    }
  }

  function setStat() {
    var s = byId("doc-stat");
    if (!s || !state.manifest) return;
    var m = state.manifest;
    s.textContent = m.docs.length + " documents · " + m.leaders.length + " leaders";
  }

  function setSidebarMeta() {
    var t = byId("sidebar-title");
    var m = byId("sidebar-meta");
    if (t) {
      t.textContent =
        state.leader === ""
          ? "No leader selected"
          : state.leader === "__all__"
            ? "All leaders"
            : getLeaderName(state.leader);
    }
    if (m) {
      if (!state.leader) {
        m.textContent = "";
        return;
      }
      m.textContent =
        (state.search.trim() ? "Filtered" : "Listing") +
        " " +
        leaderDocList().length +
        " file" +
        (leaderDocList().length === 1 ? "" : "s");
    }
  }

  function buildNav() {
    var nav = byId("sidebar-nav");
    if (!nav) return;
    if (!state.leader) {
      nav.innerHTML =
        "<p class=\"mlr-nav-empty\">Select a <strong>Dossier</strong> (leader) in the left panel, or <strong>All leaders</strong> to browse the full library.</p>";
      return;
    }
    var docs = leaderDocList();
    if (docs.length === 0) {
      nav.innerHTML =
        "<p class=\"mlr-nav-empty\">" +
        (state.search.trim()
          ? "No files match that filter."
          : "No files for this selection.") +
        "</p>";
      return;
    }
    var groups = {};
    for (var i = 0; i < docs.length; i++) {
      var d = docs[i];
      var gk = groupKey(d);
      if (!groups[gk]) groups[gk] = [];
      groups[gk].push(d);
    }
    var keys = Object.keys(groups);
    keys.sort();
    var frag = document.createDocumentFragment();
    for (var g = 0; g < keys.length; g++) {
      var k = keys[g];
      var list = groups[k].slice();
      list.sort(function (a, b) {
        return a.path.localeCompare(b.path);
      });
      var wrap = document.createElement("div");
      wrap.className = "mlr-nav-group";
      var lab = document.createElement("div");
      lab.className = "mlr-nav-group-label";
      lab.textContent = k;
      wrap.appendChild(lab);
      for (var j = 0; j < list.length; j++) {
        var d = list[j];
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "mlr-nav-btn" + (d.path === state.activePath ? " is-active" : "");
        btn.setAttribute("data-path", d.path);
        if (d.path === state.activePath) btn.setAttribute("aria-current", "page");
        var ico = document.createElement("span");
        ico.className = "material-symbols-outlined mlr-nav-ico";
        ico.setAttribute("aria-hidden", "true");
        ico.textContent = navIconName(d.group);
        var body = document.createElement("div");
        body.className = "mlr-nav-btn__body";
        var pri = document.createElement("span");
        pri.className = "mlr-nav-primary";
        pri.textContent = d.title;
        body.appendChild(pri);
        if (state.leader === "__all__") {
          var sec = document.createElement("span");
          sec.className = "mlr-nav-sec";
          sec.textContent = d.path;
          body.appendChild(sec);
        }
        btn.appendChild(ico);
        btn.appendChild(body);
        wrap.appendChild(btn);
      }
      frag.appendChild(wrap);
    }
    nav.innerHTML = "";
    nav.appendChild(frag);
  }

  /** New reading selection should start at the top (window + any local scrollers). */
  function scrollReadingToTop() {
    var de = document.documentElement;
    var hadSmooth = de.style.scrollBehavior;
    de.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    if (de) de.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    de.style.scrollBehavior = hadSmooth;
    var main = byId("main");
    if (main) main.scrollTop = 0;
    var wrap = document.querySelector(".mlr-main-wrap");
    if (wrap) wrap.scrollTop = 0;
  }

  function loadDocument(path) {
    var el = byId("doc-body");
    var h1 = byId("doc-h1");
    if (!el || !path) return;
    scrollReadingToTop();
    var main = byId("main");
    if (main) main.classList.add("is-loading");

    state.activePath = path;
    try {
      localStorage.setItem("mlr.path", path);
    } catch (e) {
      void 0;
    }
    setCrumb();
    setSidebarMeta();
    buildNav();

    var slug = pathToSlug(path);
    setDocChips(getLeaderName(slug));
    if (byId("doc-filename")) {
      byId("doc-filename").textContent = path;
    }
    if (byId("topbar-eyebrow")) {
      byId("topbar-eyebrow").textContent = "Reading";
    }

    fetch(encodeURI(path), { cache: "no-cache" })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text();
      })
      .then(function (text) {
        var rmd = ensureRender();
        if (!rmd) {
          el.innerHTML =
            '<p class="mlr-err">Loading libraries (marked, DOMPurify) failed.</p>';
          if (main) main.classList.remove("is-loading");
          scrollReadingToTop();
          return;
        }
        var rname = path.replace(/^.*\//, "").replace(/\.md$/i, "");
        var ttitle = rname
          .split(/[-_]/)
          .map(function (p) {
            return p ? p[0].toUpperCase() + p.slice(1) : p;
          })
          .join(" ");
        if (h1) h1.textContent = ttitle;
        if (byId("doc-filename")) {
          byId("doc-filename").textContent = path;
        }
        setDocChips(getLeaderName(pathToSlug(path)));
        el.className = "mlr-prose";
        el.innerHTML = purifyAndWrapTable(rmd(text));
        syncHash(path);
        if (main) main.classList.remove("is-loading");
        scrollReadingToTop();
        if (typeof window.requestAnimationFrame === "function") {
          window.requestAnimationFrame(function () {
            scrollReadingToTop();
            if (main) {
              try {
                main.focus({ preventScroll: true });
              } catch (e) {
                main.focus();
              }
            }
          });
        } else if (main) {
          try {
            main.focus({ preventScroll: true });
          } catch (e) {
            main.focus();
          }
        }
      })
      .catch(function (e) {
        if (main) main.classList.remove("is-loading");
        el.className = "";
        var msg = e && e.message ? e.message : String(e);
        el.innerHTML =
          "<p class=\"mlr-err\">Could not load <code>" +
          escapeAttr(path) +
          "</code> — " +
          escapeAttr(msg) +
          ".</p>";
        scrollReadingToTop();
      });
  }

  function closeDrawer() {
    var r = byId("layout");
    if (r) r.classList.remove("mlr-nav-open");
    var t = byId("nav-toggle");
    if (t) t.setAttribute("aria-expanded", "false");
    var back = byId("backdrop");
    if (back) back.setAttribute("hidden", "");
  }

  function onNavClick(e) {
    var btn = e.target && e.target.closest && e.target.closest(".mlr-nav-btn");
    if (!btn) return;
    var path = btn.getAttribute("data-path");
    if (!path) return;
    e.preventDefault();
    loadDocument(path);
    closeDrawer();
  }

  var debSearch = debounce(function () {
    setSidebarMeta();
    buildNav();
  }, 100);

  function onSearchInput() {
    var q = byId("q");
    state.search = (q && q.value) || "";
    debSearch();
  }

  function qEl() {
    return byId("q");
  }

  var dossierAllLabel = "";

  function dossierLabelForSlug(slug) {
    if (!slug) return "— Select a dossier —";
    if (slug === "__all__") {
      return dossierAllLabel || "All leaders";
    }
    if (state.manifest) {
      for (var i = 0; i < state.manifest.leaders.length; i++) {
        if (state.manifest.leaders[i].slug === slug) {
          return state.manifest.leaders[i].name + " (" + state.manifest.leaders[i].fileCount + ")";
        }
      }
    }
    return slug;
  }

  function updateDossierTrigger() {
    var el = byId("dossier-label");
    if (el) el.textContent = dossierLabelForSlug(state.leader);
  }

  function setLeaderValue(slug, fromUser) {
    state.leader = slug;
    if (qEl()) {
      state.search = (qEl().value || "").trim();
    }
    try {
      if (state.leader) {
        localStorage.setItem("mlr.leader", state.leader);
      } else {
        localStorage.removeItem("mlr.leader");
      }
    } catch (e) {
      void 0;
    }
    markDossierSelection();
    updateDossierTrigger();
    setSidebarMeta();
    buildNav();
    if (fromUser) {
      closeDossier();
    }
  }

  function markDossierSelection() {
    var root = byId("dossier-options");
    if (!root) return;
    var opts = root.querySelectorAll(".mlr-dossier-opt");
    for (var i = 0; i < opts.length; i++) {
      var b = opts[i];
      var sl = b.getAttribute("data-slug");
      if (sl === null) {
        sl = "";
      }
      var sel = sl === state.leader;
      b.setAttribute("aria-selected", sel ? "true" : "false");
    }
  }

  function buildDossierOption(slug, titleLine) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "mlr-dossier-opt";
    b.setAttribute("role", "option");
    b.setAttribute("data-slug", slug);
    b.setAttribute("aria-selected", "false");
    var check = document.createElement("span");
    check.className = "material-symbols-outlined mlr-dossier-opt__check";
    check.setAttribute("aria-hidden", "true");
    check.textContent = "check";
    var tx = document.createElement("span");
    tx.className = "mlr-dossier-opt__text";
    tx.textContent = titleLine;
    b.appendChild(check);
    b.appendChild(tx);
    b.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      setLeaderValue(slug, true);
    });
    return b;
  }

  var debDossierFilter = debounce(function () {
    filterDossierList();
  }, 80);

  function filterDossierList() {
    var f = byId("dossier-filter");
    var q = f ? f.value.trim().toLowerCase() : "";
    var root = byId("dossier-options");
    if (!root) return;
    var opts = root.querySelectorAll(".mlr-dossier-opt");
    for (var i = 0; i < opts.length; i++) {
      var b = opts[i];
      if (q === "") {
        b.classList.remove("is-dim");
        continue;
      }
      var find = b.getAttribute("data-search") || b.textContent || "";
      find = find.toLowerCase();
      b.classList.toggle("is-dim", find.indexOf(q) === -1);
    }
  }

  function populateDossier() {
    var root = byId("dossier-options");
    if (!root || !state.manifest) return;
    var m = state.manifest;
    dossierAllLabel = "All leaders (" + m.docs.length + " docs)";
    root.innerHTML = "";
    root.appendChild(buildDossierOption("", "— Select a dossier —"));
    var a = buildDossierOption("__all__", dossierAllLabel);
    a.setAttribute("data-search", "all leaders " + dossierAllLabel.toLowerCase());
    root.appendChild(a);
    m.leaders.forEach(function (L) {
      var line = L.name + " (" + L.fileCount + ")";
      var opt = buildDossierOption(L.slug, line);
      var sk = (L.name + " " + L.slug + " " + L.fileCount).toLowerCase();
      opt.setAttribute("data-search", sk);
      root.appendChild(opt);
    });
    var empty = root.querySelector('.mlr-dossier-opt[data-slug=""]');
    if (empty) {
      empty.setAttribute("data-search", "select");
    }
    markDossierSelection();
  }

  function isDossierOpen() {
    var p = byId("dossier-panel");
    return p && !p.hasAttribute("hidden");
  }

  function openDossier() {
    var r = byId("dossier-root");
    var p = byId("dossier-panel");
    var t = byId("dossier-trigger");
    if (r) r.classList.add("is-open");
    if (p) {
      p.removeAttribute("hidden");
    }
    if (t) {
      t.setAttribute("aria-expanded", "true");
    }
    var f = byId("dossier-filter");
    if (f) {
      f.value = "";
      filterDossierList();
      setTimeout(function () {
        f.focus();
      }, 10);
    }
  }

  function closeDossier() {
    var r = byId("dossier-root");
    var p = byId("dossier-panel");
    var t = byId("dossier-trigger");
    if (r) r.classList.remove("is-open");
    if (p) {
      p.setAttribute("hidden", "");
    }
    if (t) {
      t.setAttribute("aria-expanded", "false");
    }
    var f = byId("dossier-filter");
    if (f) f.value = "";
  }

  function onDocPointerDown(e) {
    if (!isDossierOpen()) return;
    var root = byId("dossier-root");
    if (root && !root.contains(e.target)) {
      closeDossier();
    }
  }

  function onDossierKey(e) {
    if (e.key === "Escape" && isDossierOpen()) {
      e.preventDefault();
      closeDossier();
    }
  }

  function wireDossier() {
    var tr = byId("dossier-trigger");
    if (tr) {
      tr.addEventListener("click", function (e) {
        e.stopPropagation();
        if (isDossierOpen()) {
          closeDossier();
        } else {
          openDossier();
        }
      });
    }
    var df = byId("dossier-filter");
    if (df) {
      df.addEventListener("input", debDossierFilter);
      df.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }
    document.addEventListener("mousedown", onDocPointerDown, true);
    document.addEventListener("keydown", onDossierKey, true);
  }

  function applyPathFromUrl() {
    var p = readHash();
    if (!p || !state.manifest) return false;
    if (p === state.activePath) return true;
    for (var i = 0; i < state.manifest.docs.length; i++) {
      if (state.manifest.docs[i].path === p) {
        if (p.indexOf("/") === -1) state.leader = "__root__";
        else state.leader = p.split("/")[0];
        updateDossierTrigger();
        markDossierSelection();
        setSidebarMeta();
        loadDocument(p);
        return true;
      }
    }
    return false;
  }

  function tryRestore() {
    if (readHash() && applyPathFromUrl()) return;
    try {
      var lp = localStorage.getItem("mlr.path");
      var sl = localStorage.getItem("mlr.leader");
      if (sl) {
        state.leader = sl;
      } else {
        state.leader = "alan-hirsch";
      }
      updateDossierTrigger();
      markDossierSelection();
      if (lp && state.manifest) {
        var ok = false;
        for (var i = 0; i < state.manifest.docs.length; i++) {
          if (state.manifest.docs[i].path === lp) {
            ok = true;
            break;
          }
        }
        if (ok) {
          if (lp.indexOf("/") === -1) {
            state.leader = "__root__";
          } else {
            state.leader = lp.split("/")[0];
          }
          updateDossierTrigger();
          markDossierSelection();
          loadDocument(lp);
          return;
        }
      }
    } catch (e) {
      void 0;
    }
    setSidebarMeta();
    buildNav();
  }

  function wire() {
    var nav = byId("sidebar-nav");
    if (nav) nav.addEventListener("click", onNavClick);
    var q = byId("q");
    if (q) q.addEventListener("input", onSearchInput);
    var tog = byId("nav-toggle");
    var back = byId("backdrop");
    if (tog) {
      tog.addEventListener("click", function () {
        var r = byId("layout");
        if (!r) return;
        var open = r.classList.toggle("mlr-nav-open");
        tog.setAttribute("aria-expanded", open ? "true" : "false");
        if (back) {
          if (open) {
            back.removeAttribute("hidden");
          } else {
            back.setAttribute("hidden", "");
          }
        }
      });
    }
    var c = byId("nav-close");
    if (c) {
      c.addEventListener("click", function () {
        var r = byId("layout");
        if (r) r.classList.remove("mlr-nav-open");
        tog = byId("nav-toggle");
        if (tog) tog.setAttribute("aria-expanded", "false");
        if (back) back.setAttribute("hidden", "");
      });
    }
    if (back) {
      back.addEventListener("click", function () {
        var r = byId("layout");
        if (r) r.classList.remove("mlr-nav-open");
        tog = byId("nav-toggle");
        if (tog) tog.setAttribute("aria-expanded", "false");
        back.setAttribute("hidden", "");
      });
    }
  }

  function onHash() {
    applyPathFromUrl();
  }

  fetch("manifest.json", { cache: "no-cache" })
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (data) {
      state.manifest = data;
      showFileBanner();
      setStat();
      populateDossier();
      wireDossier();
      wire();
      updateDossierTrigger();
      window.addEventListener("hashchange", onHash);
      tryRestore();
    })
    .catch(function () {
      showFileBanner();
      if (byId("doc-body")) {
        byId("doc-body").innerHTML =
          '<p class="mlr-err">Could not load manifest.json. Serve this folder over HTTP, e.g. <code>cd</code> here and run <code>npx -y serve</code> then open the printed URL. <code>file://</code> will not work.</p>';
      }
    });
})();
