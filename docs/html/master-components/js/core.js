/* ============================================================================
   Master components — shared behavior (nav, reveal, progress, drawer)
   ============================================================================ */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const nav = document.querySelector("[data-nav]");
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

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
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
      );
      reveals.forEach((el) => io.observe(el));
    }
  }

  const fill = document.querySelector("[data-reading-fill]");
  if (fill) {
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max <= 0 ? 0 : Math.max(0, Math.min(100, (window.scrollY / max) * 100));
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

  const toggle = document.querySelector("[data-nav-toggle]");
  if (toggle && nav && nav.classList.contains("nav--has-drawer")) {
    const drawerId = toggle.getAttribute("aria-controls");
    const drawer = drawerId ? document.getElementById(drawerId) : null;
    const setOpen = (open) => {
      nav.classList.toggle("nav--drawer-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    };
    toggle.addEventListener("click", () => {
      setOpen(!nav.classList.contains("nav--drawer-open"));
    });
    if (drawer) {
      drawer.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", () => setOpen(false));
      });
    }
    window.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") setOpen(false);
      },
      { passive: true }
    );
  }
})();
