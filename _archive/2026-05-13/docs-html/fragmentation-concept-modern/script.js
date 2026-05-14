/* ============================================================================
   Movemental — Fragmentation story · MODERN
   Same runtime as the modern homepage: scroll state, reveal, reading bar.
   ============================================================================ */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* Year in footer --------------------------------------------------------- */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Sticky-nav state (dark on hero, glassy cream below) ------------------- */
  const nav = document.querySelector("[data-nav]");
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Reveal on scroll ------------------------------------------------------- */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (prefersReduced || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-visible"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  /* Reading progress bar --------------------------------------------------- */
  const fill = document.querySelector("[data-reading-fill]");
  if (fill) {
    let ticking = false;
    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct =
        max <= 0
          ? 0
          : Math.max(0, Math.min(100, (window.scrollY / max) * 100));
      fill.style.setProperty("--reading-progress", pct + "%");
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }
})();
