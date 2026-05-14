/* ============================================================================
   Articles archive — filter by category, search titles/deks, sort
   ============================================================================ */
(function () {
  "use strict";

  const grid = document.querySelector("[data-archive-grid]");
  const cards = grid ? Array.from(grid.querySelectorAll("[data-archive-card]")) : [];
  const searchInput = document.querySelector("[data-archive-search]");
  const chips = document.querySelectorAll("[data-archive-chip]");
  const sortSelect = document.querySelector("[data-archive-sort]");
  const countEl = document.querySelector("[data-archive-count]");
  const emptyEl = document.querySelector("[data-archive-empty]");

  let activeCategory = "all";
  let searchQuery = "";
  let sortKey = "recent";

  function norm(s) {
    return (s || "").toLowerCase().trim();
  }

  function parseMeta(card) {
    const raw = card.getAttribute("data-date") || "0";
    const t = Date.parse(raw);
    return Number.isNaN(t) ? 0 : t;
  }

  function parseRead(card) {
    const m = (card.getAttribute("data-read") || "").match(/(\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  }

  function visible(card) {
    const cat = card.getAttribute("data-category") || "";
    const title = norm(card.querySelector(".archive-card__title")?.textContent);
    const dek = norm(card.querySelector(".archive-card__dek")?.textContent);
    const hay = title + " " + dek;
    if (activeCategory !== "all" && cat !== activeCategory) return false;
    if (searchQuery && !hay.includes(searchQuery)) return false;
    return true;
  }

  function apply() {
    const visibleCards = cards.filter(visible);
    if (sortKey === "recent") {
      visibleCards.sort((a, b) => parseMeta(b) - parseMeta(a));
    } else if (sortKey === "oldest") {
      visibleCards.sort((a, b) => parseMeta(a) - parseMeta(b));
    } else if (sortKey === "read") {
      visibleCards.sort((a, b) => parseRead(a) - parseRead(b));
    } else if (sortKey === "title") {
      visibleCards.sort((a, b) =>
        norm(a.querySelector(".archive-card__title")?.textContent).localeCompare(
          norm(b.querySelector(".archive-card__title")?.textContent)
        )
      );
    }

    const order = new Map(visibleCards.map((c, i) => [c, i]));
    cards.forEach((card) => {
      const show = visible(card);
      card.hidden = !show;
      if (show) {
        card.style.order = String(order.get(card) ?? 0);
      }
    });

    if (countEl) {
      countEl.innerHTML =
        "<strong>" +
        visibleCards.length +
        "</strong> piece" +
        (visibleCards.length === 1 ? "" : "s") +
        " match";
    }
    if (emptyEl) {
      emptyEl.hidden = visibleCards.length > 0;
    }
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const cat = chip.getAttribute("data-archive-chip") || "all";
      activeCategory = cat;
      chips.forEach((c) => {
        c.setAttribute("aria-pressed", c === chip ? "true" : "false");
      });
      apply();
    });
  });

  if (searchInput) {
    let t;
    searchInput.addEventListener("input", () => {
      clearTimeout(t);
      t = setTimeout(() => {
        searchQuery = norm(searchInput.value);
        apply();
      }, 160);
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      sortKey = sortSelect.value;
      apply();
    });
  }

  apply();
})();
