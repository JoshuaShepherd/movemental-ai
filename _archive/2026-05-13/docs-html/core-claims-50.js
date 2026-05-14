/**
 * Movemental — strategy reference.
 * Two views: core claims (filterable) + homepage playbooks.
 */
(function () {
  // ---------- View tabs ----------
  const tabs = Array.from(document.querySelectorAll(".view-tab"));
  const views = Array.from(document.querySelectorAll(".view"));
  const STORAGE_VIEW_KEY = "movemental.coreClaims50.view.v1";

  function setView(name, opts) {
    const persist = !opts || opts.persist !== false;

    tabs.forEach(function (tab) {
      const isMatch = tab.getAttribute("data-view") === name;
      tab.classList.toggle("is-active", isMatch);
      tab.setAttribute("aria-selected", isMatch ? "true" : "false");
    });

    views.forEach(function (view) {
      const isMatch = view.id === "view-" + name;
      view.toggleAttribute("hidden", !isMatch);
      view.classList.toggle("view-active", isMatch);
    });

    if (persist) {
      try {
        localStorage.setItem(STORAGE_VIEW_KEY, name);
      } catch (e) {
        /* ignore */
      }
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      const name = tab.getAttribute("data-view");
      if (!name) return;
      setView(name);
      // Scroll to top of the view for clarity
      const target = document.getElementById("view-" + name);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 16, behavior: "smooth" });
      }
    });
  });

  // Initial view: hash > storage > default
  (function initView() {
    const hash = (window.location.hash || "").replace(/^#/, "");
    const known = ["claims", "playbooks", "audiences", "drafts"];
    let initial = "claims";

    if (hash) {
      // Route hash to its owning view.
      if (hash === "view-drafts" || hash.indexOf("draft-") === 0) {
        initial = "drafts";
      } else if (hash === "view-audiences" || hash.indexOf("aud-") === 0) {
        initial = "audiences";
      } else if (hash === "view-playbooks" || hash.indexOf("pb-") === 0) {
        initial = "playbooks";
      } else if (hash === "view-claims" || hash.indexOf("section-") === 0 || /^c\d/.test(hash)) {
        initial = "claims";
      }
    } else {
      try {
        const stored = localStorage.getItem(STORAGE_VIEW_KEY);
        if (stored && known.indexOf(stored) !== -1) initial = stored;
      } catch (e) {
        /* ignore */
      }
    }

    setView(initial, { persist: false });
  })();

  // ---------- Claim filter buttons ----------
  const buttons = Array.from(document.querySelectorAll(".filter-btn"));
  const cards = Array.from(document.querySelectorAll(".claim"));
  const countEl = document.getElementById("filter-count");
  const total = cards.length;

  function applyFilter(filter) {
    let visible = 0;

    cards.forEach(function (card) {
      const status = card.getAttribute("data-status");
      const show = filter === "all" || status === filter;
      card.classList.toggle("is-hidden", !show);
      if (show) visible += 1;
    });

    if (countEl) {
      countEl.textContent = visible + " of " + total;
    }
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) {
        b.classList.remove("is-active");
      });
      btn.classList.add("is-active");
      applyFilter(btn.getAttribute("data-filter") || "all");
    });
  });

  // ---------- Section IX: pages checklist ----------
  const STORAGE_KEY = "movemental.coreClaims50.pages.v1";
  const pageRows = Array.from(document.querySelectorAll(".page-row input[type='checkbox']"));
  const statTotal = document.getElementById("stat-total");
  const statKeep = document.getElementById("stat-keep");
  const statBack = document.getElementById("stat-back");
  const resetBtn = document.getElementById("pages-reset");

  function bucketFor(input) {
    const row = input.closest(".page-row");
    return row ? row.getAttribute("data-bucket") : null;
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* localStorage unavailable — silently no-op. */
    }
  }

  function refreshStats() {
    const counts = { keep: 0, back: 0, total: pageRows.length };
    pageRows.forEach(function (input) {
      const bucket = bucketFor(input);
      if (bucket && counts.hasOwnProperty(bucket)) counts[bucket] += 1;
    });
    if (statTotal) statTotal.textContent = String(counts.total);
    if (statKeep) statKeep.textContent = String(counts.keep);
    if (statBack) statBack.textContent = String(counts.back);
  }

  if (pageRows.length) {
    const state = loadState();

    pageRows.forEach(function (input) {
      const key = input.getAttribute("data-key");
      if (key && state[key]) input.checked = true;

      input.addEventListener("change", function () {
        const k = input.getAttribute("data-key");
        if (!k) return;
        const next = loadState();
        if (input.checked) next[k] = true;
        else delete next[k];
        saveState(next);
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        pageRows.forEach(function (input) {
          input.checked = false;
        });
        saveState({});
      });
    }

    refreshStats();
  }

  // Smooth-scroll TOC links (claims + playbook): focus matching heading.
  document.querySelectorAll(".toc a, .pb-toc a").forEach(function (link) {
    link.addEventListener("click", function () {
      const id = (link.getAttribute("href") || "").replace(/^#/, "");
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      // If the target lives in the other view, switch first.
      const inDrafts = target.closest("#view-drafts");
      const inAudiences = target.closest("#view-audiences");
      const inPlaybooks = target.closest("#view-playbooks");
      const inClaims = target.closest("#view-claims");
      if (inDrafts) setView("drafts");
      else if (inAudiences) setView("audiences");
      else if (inPlaybooks) setView("playbooks");
      else if (inClaims) setView("claims");

      setTimeout(function () {
        const heading =
          target.querySelector(".section-title") ||
          target.querySelector(".pb-section-title");
        if (heading) {
          heading.setAttribute("tabindex", "-1");
          heading.focus({ preventScroll: true });
        }
      }, 350);
    });
  });
})();
