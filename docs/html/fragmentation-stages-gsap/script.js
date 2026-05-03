/* ============================================================================
   Movemental — Fragmentation stages · horizontal GSAP deck
   Pin the deck, translate the track on vertical scroll, snap between slides.
   Reduced motion: skip the pin entirely; CSS stacks slides vertically.
   ============================================================================ */

(function () {
  "use strict";

  /* Year --------------------------------------------------------------------- */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const deck = document.querySelector("[data-deck]");
  const track = document.querySelector("[data-track]");
  const slides = Array.from(document.querySelectorAll("[data-slide]"));
  const currentIndexEl = document.querySelector("[data-current-index]");
  const currentNameEl = document.querySelector("[data-current-name]");
  const dots = Array.from(
    document.querySelectorAll(".stage-dots [data-jump]")
  );

  const STAGE_NAMES = [
    "Fragmentation",
    "Integration",
    "Activation",
    "Formation",
    "Multiplication",
    "Movement",
  ];

  let currentIndex = 0;

  function setActive(index) {
    if (index === currentIndex && slides[index].classList.contains("is-active")) {
      return;
    }
    currentIndex = index;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    if (currentIndexEl) {
      currentIndexEl.textContent = String(index + 1).padStart(2, "0");
    }
    if (currentNameEl) {
      currentNameEl.textContent = STAGE_NAMES[index];
    }
  }

  /* ------------------------------------------------------------------------
     Reduced-motion / no-GSAP fallback — the CSS already stacks slides; we
     just activate them all (so their reveal states apply) and wire dot
     clicks to native scrollIntoView.
     ------------------------------------------------------------------------ */
  if (prefersReduced || !window.gsap || !window.ScrollTrigger) {
    slides.forEach((s) => s.classList.add("is-active"));
    setActive(0);
    dots.forEach((d, i) => {
      d.addEventListener("click", () => {
        slides[i]?.scrollIntoView({ behavior: "auto", block: "start" });
        setActive(i);
      });
    });
    return;
  }

  /* ------------------------------------------------------------------------
     GSAP horizontal pin
     ------------------------------------------------------------------------ */
  const { gsap, ScrollTrigger } = window;
  gsap.registerPlugin(ScrollTrigger);

  const slideCount = slides.length;
  /** Progress stops 0 … 1 aligned to each full-width slide (equal flex slides). */
  const snapStep = slideCount > 1 ? 1 / (slideCount - 1) : 1;
  const snapToProgress = (value) => {
    const v = gsap.utils.clamp(0, 1, value);
    return Math.round(v / snapStep) * snapStep;
  };

  const tween = gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: deck,
      pin: true,
      /* 1:1 with scroll so panels don’t drift past; snap settles on the nearest slide. */
      scrub: true,
      anticipatePin: 1,
      end: () => "+=" + (track.scrollWidth - window.innerWidth),
      invalidateOnRefresh: true,
      fastScrollEnd: true,
      snap: {
        snapTo: snapToProgress,
        duration: { min: 0.14, max: 0.38 },
        delay: 0,
        ease: "power3.out",
      },
    },
  });

  /* Per-slide activation — single set of triggers that both mark the slide
     active and track the current index for keyboard nav.                     */
  slides.forEach((slide, i) => {
    ScrollTrigger.create({
      trigger: slide,
      containerAnimation: tween,
      start: "left center",
      end: "right center",
      onToggle: (self) => {
        if (self.isActive) setActive(i);
      },
    });
  });

  setActive(0);

  /* ------------------------------------------------------------------------
     Jump-to-stage — compute the vertical scroll position that corresponds
     to slide `index` along the pin's scroll range, then scroll there
     natively. No extra GSAP plugin required.
     ------------------------------------------------------------------------ */
  function scrollToSlide(index) {
    const st = tween.scrollTrigger;
    if (!st) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, index));
    const target =
      st.start + ((st.end - st.start) * clamped) / (slides.length - 1);
    window.scrollTo({ top: target, behavior: "smooth" });
  }

  dots.forEach((d, i) => {
    d.addEventListener("click", () => scrollToSlide(i));
  });

  /* Keyboard: ← / → (and ↑ / ↓) advance one slide; Home / End jump. */
  window.addEventListener("keydown", (e) => {
    if (
      e.target instanceof HTMLElement &&
      ["INPUT", "TEXTAREA"].includes(e.target.tagName)
    ) {
      return;
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      scrollToSlide(currentIndex + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      scrollToSlide(currentIndex - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      scrollToSlide(0);
    } else if (e.key === "End") {
      e.preventDefault();
      scrollToSlide(slides.length - 1);
    }
  });

  /* Refresh on load in case fonts shift layout */
  window.addEventListener("load", () => ScrollTrigger.refresh());
})();
