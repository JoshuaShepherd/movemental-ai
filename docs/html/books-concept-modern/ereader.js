/* ============================================================================
   Book e-reader — TOC drawer (mobile), scroll-spy active chapter, font prefs,
   prev/next between chapters
   ============================================================================ */
(function () {
  "use strict";

  const tocWrap = document.querySelector("[data-ereader-toc-wrap]");
  const tocToggle = document.querySelector("[data-ereader-toc-toggle]");
  const fontSans = document.querySelector("[data-ereader-font-sans]");
  const fontSerif = document.querySelector("[data-ereader-font-serif]");
  const main = document.querySelector("[data-ereader-main]");
  const titleEl = document.querySelector("[data-ereader-chapter-label]");
  const chapters = Array.from(document.querySelectorAll("[data-ereader-chapter]"));
  const tocLinks = Array.from(document.querySelectorAll("[data-ereader-toc] a[href^='#']"));
  const btnPrev = document.querySelector("[data-ereader-prev]");
  const btnNext = document.querySelector("[data-ereader-next]");

  const FONT_KEY = "movemental-ereader-font";

  function getIdx(id) {
    const i = chapters.findIndex((c) => c.id === id);
    return i < 0 ? 0 : i;
  }

  function setChapterLabel(el) {
    if (!titleEl || !el) return;
    const k = el.getAttribute("data-kicker") || "";
    const t =
      el.getAttribute("data-title") ||
      el.querySelector(".ereader-chapter-title")?.textContent ||
      "";
    titleEl.textContent = k ? k + " \u2014 " + t : t;
  }

  function setActiveToc(id) {
    tocLinks.forEach((a) => {
      const href = a.getAttribute("href") || "";
      const target = href.slice(1);
      a.classList.toggle("is-active", target === id);
    });
  }

  function updateNav() {
    const hash = (location.hash || "#" + chapters[0]?.id).slice(1);
    const idx = getIdx(hash);
    if (btnPrev) {
      btnPrev.disabled = idx <= 0;
      btnPrev.dataset.target = chapters[idx - 1]?.id || "";
    }
    if (btnNext) {
      btnNext.disabled = idx >= chapters.length - 1;
      btnNext.dataset.target = chapters[idx + 1]?.id || "";
    }
    const el = chapters[idx];
    if (el) setChapterLabel(el);
    setActiveToc(chapters[idx]?.id || "");
  }

  function goTo(id) {
    if (!id) return;
    location.hash = id;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (tocWrap && window.matchMedia("(max-width: 959px)").matches) {
      tocWrap.classList.remove("is-open");
      tocToggle?.setAttribute("aria-expanded", "false");
    }
    updateNav();
  }

  /* Font preference */
  function applyFont(mode) {
    if (!main) return;
    main.dataset.font = mode === "serif" ? "serif" : "sans";
    try {
      localStorage.setItem(FONT_KEY, mode);
    } catch (_) {}
    if (fontSans)
      fontSans.setAttribute("aria-pressed", mode === "sans" ? "true" : "false");
    if (fontSerif)
      fontSerif.setAttribute("aria-pressed", mode === "serif" ? "true" : "false");
  }

  let initialFont = "sans";
  try {
    initialFont = localStorage.getItem(FONT_KEY) === "serif" ? "serif" : "sans";
  } catch (_) {}
  applyFont(initialFont);

  fontSans?.addEventListener("click", () => applyFont("sans"));
  fontSerif?.addEventListener("click", () => applyFont("serif"));

  /* Mobile TOC */
  tocToggle?.addEventListener("click", () => {
    const open = !tocWrap?.classList.contains("is-open");
    tocWrap?.classList.toggle("is-open", open);
    tocToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  tocLinks.forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return;
      e.preventDefault();
      goTo(href.slice(1));
    });
  });

  btnPrev?.addEventListener("click", () => goTo(btnPrev.dataset.target || ""));
  btnNext?.addEventListener("click", () => goTo(btnNext.dataset.target || ""));

  window.addEventListener("hashchange", updateNav);

  /* Scroll spy — active chapter by viewport position */
  function onScrollSpy() {
    if (!chapters.length) return;
    const fromTop = 120;
    let current = chapters[0].id;
    for (const c of chapters) {
      const rect = c.getBoundingClientRect();
      if (rect.top <= fromTop) current = c.id;
    }
    setActiveToc(current);
    const el = document.getElementById(current);
    setChapterLabel(el);
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          onScrollSpy();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  if (!location.hash && chapters[0]?.id) {
    history.replaceState(null, "", "#" + chapters[0].id);
  }
  updateNav();
  onScrollSpy();
})();

