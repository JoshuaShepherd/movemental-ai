/**
 * Toolkit modal + case-study TOC helpers for audience page HTML previews.
 */
(function () {
  function openModal() {
    var overlay = document.getElementById("toolkit-modal");
    if (!overlay) return;
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    var closeBtn = overlay.querySelector("[data-modal-close]");
    if (closeBtn) closeBtn.focus();
    document.documentElement.style.overflow = "hidden";
  }

  function closeModal() {
    var overlay = document.getElementById("toolkit-modal");
    if (!overlay) return;
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    if (!(t instanceof Element)) return;
    if (t.matches("[data-toolkit-open]")) {
      e.preventDefault();
      openModal();
    }
    if (t.matches("[data-modal-close]")) {
      e.preventDefault();
      closeModal();
    }
    if (t.id === "toolkit-modal") {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  var toc = document.querySelector(".case-toc");
  if (!toc || !window.matchMedia("(min-width: 1100px)").matches) return;

  var headings = Array.prototype.slice.call(
    document.querySelectorAll(".case-prose .display-h3[id]")
  );
  if (!headings.length) return;

  var links = Array.prototype.slice.call(toc.querySelectorAll('a[href^="#"]'));

  function onScroll() {
    var scrollPos = window.scrollY + 120;
    var activeId = "";
    for (var i = headings.length - 1; i >= 0; i--) {
      var h = headings[i];
      if (h.offsetTop <= scrollPos) {
        activeId = h.id;
        break;
      }
    }
    links.forEach(function (a) {
      var href = a.getAttribute("href") || "";
      var id = href.slice(1);
      if (id === activeId) {
        a.style.color = "var(--foreground)";
        a.style.fontWeight = "600";
      } else {
        a.style.color = "";
        a.style.fontWeight = "";
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
