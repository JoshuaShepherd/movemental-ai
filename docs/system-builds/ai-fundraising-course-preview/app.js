(function () {
  "use strict";

  var lessons = window.COURSE_LESSONS;
  if (!Array.isArray(lessons) || lessons.length === 0) {
    document.getElementById("lesson-root").innerHTML =
      "<p>Course content failed to load. Ensure all <code>fr-lessons-*.js</code> files are present.</p>";
    return;
  }

  var byId = {};
  lessons.forEach(function (L) {
    byId[L.id] = L;
  });

  var root = document.getElementById("lesson-root");
  var navEl = document.getElementById("sidebar-nav");
  var crumb = document.getElementById("topbar-crumb");
  var sidebar = document.getElementById("sidebar");
  var backdrop = document.getElementById("backdrop");
  var navToggle = document.getElementById("nav-toggle");
  var navClose = document.getElementById("nav-close");

  function groupLabel(key) {
    var map = {
      start: "Start & Week 0",
      w1: "Week 1 — Align & govern",
      w2: "Week 2 — Data model",
      w3: "Week 3 — Relationships",
      w4: "Week 4 — Pilot & sustain",
      more: "Reference",
    };
    return map[key] || key;
  }

  function buildNav() {
    var groups = {};
    lessons.forEach(function (L) {
      var g = L.navGroup || "more";
      if (!groups[g]) groups[g] = [];
      groups[g].push(L);
    });

    var order = ["start", "w1", "w2", "w3", "w4", "more"];
    var frag = document.createDocumentFragment();

    order.forEach(function (gk) {
      if (!groups[gk]) return;
      var wrap = document.createElement("div");
      wrap.className = "nav-group";
      var lab = document.createElement("div");
      lab.className = "nav-group-label";
      lab.textContent = groupLabel(gk);
      wrap.appendChild(lab);

      groups[gk].forEach(function (L) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "nav-link";
        btn.setAttribute("data-id", L.id);
        var t = document.createElement("span");
        t.textContent = L.title;
        btn.appendChild(t);
        if (L.subtitle) {
          var s = document.createElement("small");
          s.textContent = L.subtitle;
          btn.appendChild(s);
        }
        wrap.appendChild(btn);
      });

      frag.appendChild(wrap);
    });

    navEl.appendChild(frag);

    navEl.addEventListener("click", function (e) {
      var t = e.target.closest(".nav-link");
      if (!t) return;
      var id = t.getAttribute("data-id");
      if (id) navigate(id, true);
    });
  }

  function setActiveNav(id) {
    navEl.querySelectorAll(".nav-link").forEach(function (el) {
      el.classList.toggle("is-active", el.getAttribute("data-id") === id);
    });
  }

  function closeMobileNav() {
    sidebar.classList.remove("is-open");
    if (backdrop) backdrop.hidden = true;
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  function openMobileNav() {
    sidebar.classList.add("is-open");
    if (backdrop) backdrop.hidden = false;
    if (navToggle) navToggle.setAttribute("aria-expanded", "true");
  }

  function render(id) {
    var L = byId[id];
    if (!L) {
      root.innerHTML = "<p>Lesson not found.</p>";
      return;
    }

    var header =
      '<header class="lesson-header">' +
      '<p class="lesson-kicker">' +
      escapeHtml(L.kicker || "") +
      "</p>" +
      '<h1 class="lesson-title">' +
      escapeHtml(L.h1 || L.title) +
      "</h1>" +
      (L.meta
        ? '<p class="lesson-meta">' + escapeHtml(L.meta) + "</p>"
        : "") +
      "</header>";

    root.innerHTML =
      header + '<div class="lesson-body">' + (L.html || "") + "</div>";
    crumb.textContent = L.title;
    setActiveNav(id);
    document.title =
      (L.h1 || L.title) + " — AI Fundraising System (Preview)";
    root.focus();
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function navigate(id, push) {
    if (!byId[id]) id = lessons[0].id;
    if (push) {
      if (history.replaceState) {
        history.pushState({ id: id }, "", "#" + encodeURIComponent(id));
      } else {
        location.hash = id;
      }
    }
    render(id);
    closeMobileNav();
  }

  function initialId() {
    var h = (location.hash || "").replace(/^#/, "");
    try {
      h = decodeURIComponent(h);
    } catch (e) {
      /* ignore */
    }
    if (h && byId[h]) return h;
    return lessons[0].id;
  }

  buildNav();

  window.addEventListener("popstate", function () {
    var id = initialId();
    render(id);
  });

  window.addEventListener("hashchange", function () {
    var id = initialId();
    render(id);
  });

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      if (sidebar.classList.contains("is-open")) closeMobileNav();
      else openMobileNav();
    });
  }
  if (navClose) navClose.addEventListener("click", closeMobileNav);
  if (backdrop) backdrop.addEventListener("click", closeMobileNav);

  navigate(initialId(), false);
})();
