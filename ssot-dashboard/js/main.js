/**
 * SSOT Dashboard — Navigation and content loading
 * Loads content/*.html into the main area based on sidebar selection.
 */

(function () {
  const MAIN = document.querySelector("[data-ssot-main]");
  const NAV_LINKS = document.querySelectorAll("[data-ssot-nav-link]");
  const DEFAULT_SECTION = "foundation";

  function getSectionIdFromHash() {
    const hash = window.location.hash.slice(1);
    return hash || DEFAULT_SECTION;
  }

  function setActiveNav(sectionId) {
    NAV_LINKS.forEach(function (link) {
      const id = link.getAttribute("data-ssot-nav-link");
      link.classList.toggle("is-active", id === sectionId);
      link.setAttribute("aria-current", id === sectionId ? "page" : null);
    });
  }

  function showSection(sectionId) {
    const panels = MAIN.querySelectorAll("[data-section]");
    panels.forEach(function (panel) {
      panel.classList.toggle("is-hidden", panel.getAttribute("data-section") !== sectionId);
    });
    setActiveNav(sectionId);
    window.location.hash = sectionId;
  }

  function init() {
    const sectionId = getSectionIdFromHash();
    const exists = MAIN.querySelector("[data-section=\"" + sectionId + "\"]");
    showSection(exists ? sectionId : DEFAULT_SECTION);

    NAV_LINKS.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const id = link.getAttribute("data-ssot-nav-link");
        showSection(id);
      });
    });

    window.addEventListener("hashchange", function () {
      const sectionId = getSectionIdFromHash();
      const exists = MAIN.querySelector("[data-section=\"" + sectionId + "\"]");
      if (exists) showSection(sectionId);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
