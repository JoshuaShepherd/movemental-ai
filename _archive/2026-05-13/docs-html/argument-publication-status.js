/**
 * Maps deduped argument `data-id` values to draft HTML where the claim's substance appears.
 * Legacy `site-templates/*.html` drafts were removed; remap entries here when copy lands
 * in concept-modern pages. Missing keys = not yet given a draft home.
 * Update alongside docs/build/prompts/content-cutoff-and-static-html-site.md
 */
(function () {
  "use strict";

  /** @type {Record<string, { pages: string[] }>} */
  window.MVMTL_ARGUMENT_USED = {};

  function applyPublicationBadges() {
    var map = window.MVMTL_ARGUMENT_USED || {};
    var cards = document.querySelectorAll("li.card[data-id]");
    var unique = Object.create(null);
    cards.forEach(function (li) {
      var id = li.getAttribute("data-id");
      if (id) unique[id] = true;
    });
    var ids = Object.keys(unique);
    var usedIds = ids.filter(function (id) {
      var e = map[id];
      return e && e.pages && e.pages.length;
    });
    var usedCount = usedIds.length;
    var remainingCount = ids.length - usedCount;

    cards.forEach(function (li) {
      var id = li.getAttribute("data-id");
      if (!id) return;
      var entry = map[id];
      var isUsed = !!(entry && entry.pages && entry.pages.length);

      li.classList.remove("card--pub-used", "card--pub-remaining");
      li.classList.add(isUsed ? "card--pub-used" : "card--pub-remaining");

      var head = li.querySelector(".card__head");
      if (!head) return;
      var old = head.querySelector(".pub-badge");
      if (old) old.remove();

      var badge = document.createElement("span");
      badge.className = "pub-badge pub-badge--" + (isUsed ? "used" : "remaining");
      if (isUsed) {
        badge.textContent = "In draft HTML";
        badge.title = "Substance appears in: " + entry.pages.join(", ");
      } else {
        badge.textContent = "No draft home yet";
        badge.title = "Not yet mapped in MVMTL_ARGUMENT_USED (concept-modern stack)";
      }
      head.insertBefore(badge, head.firstChild);
    });

    var summary = document.getElementById("argument-pub-summary");
    if (summary) {
      summary.innerHTML =
        "<strong>Draft HTML coverage.</strong> <strong>" +
        usedCount +
        "</strong> of <strong>" +
        ids.length +
        "</strong> unique items are mapped in <code>argument-publication-status.js</code> " +
        '(see <a href="./index.html"><code>docs/html/index.html</code></a> for concept-modern entry points). ' +
        "<strong>" +
        remainingCount +
        "</strong> remain without a mapped draft home. " +
        "Badges on each card reflect this map (hover for file list). " +
        "See <code>docs/build/prompts/content-cutoff-and-static-html-site.md</code> for cutoff rules.";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyPublicationBadges);
  } else {
    applyPublicationBadges();
  }
})();
