/* ============================================================================
   Movemental — Contact concept · MODERN
   - nav scroll state
   - reveal-on-scroll
   - live character counter
   - inline validation on blur + submit
   - fake-submit with loading → success
   ============================================================================ */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* Year */
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Sticky nav state */
  const nav = document.querySelector("[data-nav]");
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Reveal on scroll */
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

  /* Character counter (message textarea) */
  const textarea = document.querySelector("[data-counter-target]");
  const counter = document.querySelector("[data-counter]");
  if (textarea && counter) {
    const max = Number(textarea.getAttribute("maxlength")) || 1000;
    const update = () => {
      const len = textarea.value.length;
      counter.textContent = `${len.toLocaleString()} / ${max.toLocaleString()}`;
    };
    textarea.addEventListener("input", update);
    update();
  }

  /* Validation helpers */
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function fieldWrap(input) {
    return input.closest(".field");
  }

  function validateField(input) {
    const wrap = fieldWrap(input);
    if (!wrap) return true;
    const kind = input.getAttribute("type") || input.tagName.toLowerCase();
    const required = input.hasAttribute("required");
    const val = (input.value || "").trim();
    const errEl = wrap.querySelector(".field__error");
    let ok = true;
    let msg = "";

    if (required && !val) {
      ok = false;
      msg =
        input.getAttribute("data-error-required") ||
        "This field is required.";
    } else if (val && kind === "email" && !emailRe.test(val)) {
      ok = false;
      msg =
        input.getAttribute("data-error-format") ||
        "Please enter a valid email address.";
    } else if (val && input.minLength && val.length < input.minLength) {
      ok = false;
      msg = `Please use at least ${input.minLength} characters.`;
    }

    wrap.classList.toggle("is-invalid", !ok);
    if (errEl) errEl.textContent = msg;
    return ok;
  }

  const form = document.querySelector("[data-form]");
  if (form) {
    const inputs = form.querySelectorAll(
      "input[name], textarea[name], select[name]"
    );
    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => {
        const wrap = fieldWrap(input);
        if (wrap && wrap.classList.contains("is-invalid")) {
          validateField(input);
        }
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let allOk = true;
      let firstBad = null;
      inputs.forEach((input) => {
        const ok = validateField(input);
        if (!ok && !firstBad) firstBad = input;
        allOk = allOk && ok;
      });

      // consent checkbox
      const consent = form.querySelector('[name="consent"]');
      if (consent && !consent.checked) {
        const wrap = consent.closest(".field") || consent.closest(".checkbox");
        if (wrap) {
          wrap.classList.add("is-invalid");
          const errEl = wrap.querySelector(".field__error");
          if (errEl) errEl.textContent = "Please agree before continuing.";
        }
        allOk = false;
        if (!firstBad) firstBad = consent;
      }

      if (!allOk) {
        if (firstBad && typeof firstBad.focus === "function") firstBad.focus();
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      const panel = form.closest(".form-panel");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.dataset.originalText = submitBtn.textContent || "";
        submitBtn.innerHTML = "Sending…";
      }

      // Simulate a network round-trip
      setTimeout(() => {
        if (panel) panel.classList.add("is-sent");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML =
            submitBtn.dataset.originalText || "Send message";
        }
      }, 900);
    });
  }
})();
