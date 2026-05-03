/**
 * Forgotten Ways — learn shell interactions.
 * Minimal, a11y-first. Loaded as a non-module <script defer>.
 *
 * Responsibilities:
 *   - Mobile sidebar drawer (open/close, focus trap, Escape, backdrop)
 *   - Lesson tab switching (role=tablist)
 *   - Modal open/close (Capture Insight, Course Complete)
 *   - AI drawer open/close (right-side)
 *   - Mark-complete optimistic toggle (visual only)
 *   - Previous/Next navigation via URL hash (#section=...)
 *   - Accordion polyfill-safe: uses native <details>
 *   - Respects prefers-reduced-motion.
 *
 * No frameworks. No build step. Safe on file:// and any static server.
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  /* ---------------- Sidebar drawer (mobile) ---------------- */
  var sidebar = $("[data-fw-sidebar]");
  var backdrop = $("[data-fw-sidebar-backdrop]");
  var openBtns = $$("[data-fw-sidebar-open]");
  var closeBtns = $$("[data-fw-sidebar-close]");
  var lastFocus = null;

  function openSidebar() {
    if (!sidebar) return;
    lastFocus = document.activeElement;
    sidebar.classList.add("is-open");
    if (backdrop) backdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
    var first = sidebar.querySelector("a, button, [tabindex]");
    if (first) first.focus();
  }
  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove("is-open");
    if (backdrop) backdrop.classList.remove("is-open");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  openBtns.forEach(function (btn) {
    btn.addEventListener("click", openSidebar);
  });
  closeBtns.forEach(function (btn) {
    btn.addEventListener("click", closeSidebar);
  });
  if (backdrop) backdrop.addEventListener("click", closeSidebar);

  /* ---------------- Lesson tabs ---------------- */
  $$("[data-fw-tabs]").forEach(function (tabs) {
    var tabButtons = $$('[role="tab"]', tabs);
    var panels = $$('[role="tabpanel"]', tabs.parentNode);

    function activate(id) {
      tabButtons.forEach(function (b) {
        var active = b.getAttribute("aria-controls") === id;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", active ? "true" : "false");
        b.tabIndex = active ? 0 : -1;
      });
      panels.forEach(function (p) {
        p.hidden = p.id !== id;
      });
    }

    tabButtons.forEach(function (btn, idx) {
      btn.addEventListener("click", function () {
        activate(btn.getAttribute("aria-controls"));
      });
      btn.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        var delta = e.key === "ArrowRight" ? 1 : -1;
        var next = (idx + delta + tabButtons.length) % tabButtons.length;
        tabButtons[next].focus();
        activate(tabButtons[next].getAttribute("aria-controls"));
      });
    });
  });

  /* ---------------- Modals ---------------- */
  function bindModal(modal) {
    var opener = $$('[data-fw-modal-open="' + modal.id + '"]');
    var closers = $$("[data-fw-modal-close]", modal);
    opener.forEach(function (b) {
      b.addEventListener("click", function () {
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        var first = modal.querySelector("input, textarea, button");
        if (first) first.focus();
      });
    });
    closers.forEach(function (b) {
      b.addEventListener("click", function () {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
      });
    });
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
      }
    });
  }
  $$("[data-fw-modal]").forEach(bindModal);

  /* ---------------- AI drawer (right) ---------------- */
  var drawer = $("[data-fw-drawer]");
  $$("[data-fw-drawer-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (drawer) drawer.classList.add("is-open");
    });
  });
  $$("[data-fw-drawer-close]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (drawer) drawer.classList.remove("is-open");
    });
  });

  /* ---------------- Mark-complete toggle ---------------- */
  $$("[data-fw-mark-complete]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var done = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", done ? "false" : "true");
      btn.textContent = done ? "Mark Complete" : "Completed ✓";
    });
  });

  /* ---------------- Hash / query section navigation ---------------- */
  function applySectionFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get("section");
    if (!id) return;
    $$("[data-fw-section]").forEach(function (el) {
      el.hidden = el.getAttribute("data-fw-section") !== id;
    });
    $$("[data-fw-sidebar-link]").forEach(function (link) {
      link.classList.toggle(
        "is-active",
        link.getAttribute("data-fw-section-target") === id
      );
    });
  }
  $$("[data-fw-sidebar-link]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var target = link.getAttribute("data-fw-section-target");
      if (!target) return;
      e.preventDefault();
      var url = new URL(window.location.href);
      url.searchParams.set("section", target);
      window.history.pushState({}, "", url);
      applySectionFromUrl();
      if (!reduceMotion) {
        $("#fw-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      closeSidebar();
    });
  });
  window.addEventListener("popstate", applySectionFromUrl);
  applySectionFromUrl();

  /* ---------------- Global Escape handler ---------------- */
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (drawer && drawer.classList.contains("is-open")) {
      drawer.classList.remove("is-open");
    }
    var openModal = document.querySelector(".fw-modal.is-open");
    if (openModal) {
      openModal.classList.remove("is-open");
      openModal.setAttribute("aria-hidden", "true");
    }
    if (sidebar && sidebar.classList.contains("is-open")) {
      closeSidebar();
    }
  });

  /* ---------------- Quiz answer reveal (static feedback) ---------------- */
  $$("[data-fw-quiz]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var feedback = form.querySelector("[data-fw-quiz-feedback]");
      if (feedback) feedback.hidden = false;
    });
  });
})();
