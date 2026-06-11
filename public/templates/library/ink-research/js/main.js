/**
 * Ink Research Library — shared interactions
 * TOC scroll spy · citation hover · sources panel callout
 */
(function () {
  "use strict";

  function initTocSpy() {
    const sections = document.querySelectorAll("[data-toc-section]");
    const links = document.querySelectorAll("[data-toc-link]");
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          links.forEach((link) => {
            const match = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("is-active", match);
          });
        });
      },
      { root: null, rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initCitationHover() {
    const citations = document.querySelectorAll(".citation-sup");
    const sourceItems = document.querySelectorAll("[data-source-index]");

    citations.forEach((cite) => {
      cite.addEventListener("mouseenter", () => {
        const num = cite.textContent.replace(/\[|\]/g, "");
        sourceItems.forEach((item) => {
          const index = item.getAttribute("data-source-index");
          item.classList.toggle("is-highlight", index === num);
        });
      });
      cite.addEventListener("mouseleave", () => {
        sourceItems.forEach((item) => item.classList.remove("is-highlight"));
      });
    });
  }

  function initSourcesPanel() {
    const items = document.querySelectorAll(".sources-item[data-source-row]");
    if (!items.length) return;

    items.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        items.forEach((row) => row.classList.remove("is-active"));
        item.classList.add("is-active");
      });
    });

    // Default first item active
    items[0]?.classList.add("is-active");
  }

  function initLoadArchive() {
    const btn = document.querySelector("[data-load-archive]");
    if (!btn) return;

    btn.addEventListener("click", () => {
      btn.textContent = "Archive loaded";
      btn.disabled = true;
      btn.style.opacity = "0.6";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initTocSpy();
    initCitationHover();
    initSourcesPanel();
    initLoadArchive();
  });
})();
