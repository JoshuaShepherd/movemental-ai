(function () {
  "use strict";

  var STORAGE_KEY = "movemental-social-checklist-v1";

  function initTabs() {
    var tablist = document.querySelector("[data-platform-tabs]");
    if (!tablist) return;

    var tabs = tablist.querySelectorAll('[role="tab"]');
    var panels = document.querySelectorAll('[role="tabpanel"]');

    function activate(index) {
      tabs.forEach(function (tab, i) {
        var selected = i === index;
        tab.setAttribute("aria-selected", selected ? "true" : "false");
        tab.setAttribute("tabindex", selected ? "0" : "-1");
      });
      panels.forEach(function (panel, i) {
        panel.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
    }

    tablist.addEventListener("click", function (e) {
      var btn = e.target.closest('[role="tab"]');
      if (!btn || !tablist.contains(btn)) return;
      var idx = Array.prototype.indexOf.call(tabs, btn);
      if (idx >= 0) activate(idx);
    });

    tablist.addEventListener("keydown", function (e) {
      var keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
      if (keys.indexOf(e.key) === -1) return;
      e.preventDefault();
      var tabsArr = Array.prototype.slice.call(tabs);
      var current = tabsArr.findIndex(function (t) {
        return t.getAttribute("aria-selected") === "true";
      });
      var len = tabsArr.length;
      var next = current;
      if (e.key === "ArrowRight") next = (current + 1) % len;
      if (e.key === "ArrowLeft") next = (current - 1 + len) % len;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = len - 1;
      activate(next);
      tabs[next].focus();
    });

    activate(0);
  }

  function initChecklist() {
    var root = document.querySelector("[data-checklist]");
    if (!root) return;

    var inputs = root.querySelectorAll('input[type="checkbox"]');
    var saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
    } catch (_) {
      saved = {};
    }

    inputs.forEach(function (input) {
      var id = input.id;
      if (id && saved[id]) input.checked = true;
    });

    root.addEventListener("change", function () {
      var state = {};
      inputs.forEach(function (input) {
        if (input.id) state[input.id] = input.checked;
      });
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (_) {
        /* ignore quota */
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initTabs();
      initChecklist();
    });
  } else {
    initTabs();
    initChecklist();
  }
})();
