/* ============================================================================
   Movemental — Assessment concept · MODERN
   One-question-per-view stepper with keyboard navigation, local autosave,
   progress ticks, and a summary screen.

   Keyboard:
     Enter       → advance (if answered)
     Backspace   → back (when not inside a text field)
     1–9 / A–Z   → select matching option on single-choice
     Arrow L/R   → back / next
   ============================================================================ */

(function () {
  "use strict";

  const STORAGE_KEY = "mv_assessment_answers_v1";
  const app = document.querySelector("[data-app]");
  if (!app) return;

  const topbar = document.querySelector("[data-topbar]");
  const counterEl = document.querySelector("[data-step-counter]");
  const ticksWrap = document.querySelector("[data-step-ticks]");
  const savedEl = document.querySelector("[data-saved]");

  const intro = document.querySelector("[data-intro]");
  const questions = document.querySelector("[data-questions]");
  const done = document.querySelector("[data-done]");
  const qfoot = document.querySelector("[data-qfoot]");

  const startBtn = document.querySelector("[data-start]");
  const backBtn = document.querySelector("[data-back]");
  const nextBtn = document.querySelector("[data-next]");
  const restartBtn = document.querySelector("[data-restart]");
  const footCounter = document.querySelector("[data-foot-counter]");
  const errorEl = document.querySelector("[data-error]");

  const qEls = Array.from(document.querySelectorAll("[data-question]"));
  const total = qEls.length;

  // Restore prior answers
  let answers = {};
  try {
    answers = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {};
  } catch (_) {
    answers = {};
  }

  let index = 0;
  let view = "intro"; // intro | questions | done

  // --- Build stepper ticks ------------------------------------------------
  if (ticksWrap) {
    ticksWrap.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const tick = document.createElement("span");
      tick.className = "stepper__tick";
      tick.setAttribute("aria-hidden", "true");
      ticksWrap.appendChild(tick);
    }
  }

  function renderTicks() {
    if (!ticksWrap) return;
    const ticks = ticksWrap.querySelectorAll(".stepper__tick");
    ticks.forEach((t, i) => {
      t.classList.toggle("is-done", i < index);
      t.classList.toggle("is-current", i === index);
    });
    if (counterEl) {
      counterEl.textContent = `Step ${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
    }
    if (footCounter) {
      footCounter.textContent = `Question ${index + 1} of ${total}`;
    }
  }

  // --- Restore checked inputs from answers ---
  function hydrate() {
    qEls.forEach((qEl) => {
      const id = qEl.getAttribute("data-question");
      const type = qEl.getAttribute("data-type");
      const val = answers[id];
      if (val === undefined) return;
      if (type === "textarea") {
        const ta = qEl.querySelector("textarea");
        if (ta) ta.value = val;
      } else {
        const radio = qEl.querySelector(
          `input[type="radio"][value="${CSS.escape(String(val))}"]`
        );
        if (radio) radio.checked = true;
      }
    });
  }

  // --- Persistence --------------------------------------------------------
  let savedTimer = null;
  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
      if (savedEl) {
        savedEl.textContent = "Saved";
        clearTimeout(savedTimer);
        savedTimer = setTimeout(() => {
          if (savedEl) savedEl.textContent = "Autosaved";
        }, 1400);
      }
    } catch (_) {
      /* no-op */
    }
  }

  // --- Validate the current question --------------------------------------
  function currentQuestionEl() {
    return qEls[index];
  }

  function isAnswered(qEl) {
    if (!qEl) return false;
    const type = qEl.getAttribute("data-type");
    const optional = qEl.getAttribute("data-optional") === "true";
    if (optional) return true;
    if (type === "textarea") {
      const ta = qEl.querySelector("textarea");
      const min = Number(ta?.getAttribute("minlength") || 0);
      const val = (ta?.value || "").trim();
      return val.length >= (min || 1);
    }
    return !!qEl.querySelector('input[type="radio"]:checked');
  }

  function readAnswer(qEl) {
    const type = qEl.getAttribute("data-type");
    if (type === "textarea") {
      const ta = qEl.querySelector("textarea");
      return (ta?.value || "").trim();
    }
    const checked = qEl.querySelector('input[type="radio"]:checked');
    return checked ? checked.value : undefined;
  }

  // --- View transitions ---------------------------------------------------
  function showView(next) {
    view = next;
    if (topbar) topbar.setAttribute("data-view", view);
    intro.style.display = view === "intro" ? "block" : "none";
    questions.classList.toggle("is-active", view === "questions");
    done.classList.toggle("is-active", view === "done");
    qfoot.style.display = view === "questions" ? "block" : "none";
  }

  function focusCurrent() {
    const qEl = currentQuestionEl();
    if (!qEl) return;
    // focus first input
    const first =
      qEl.querySelector("textarea") ||
      qEl.querySelector('input[type="radio"]:checked') ||
      qEl.querySelector('input[type="radio"]');
    if (first) first.focus({ preventScroll: true });
  }

  function renderCurrent() {
    qEls.forEach((qEl, i) => {
      qEl.classList.toggle("is-current", i === index);
    });
    renderTicks();
    if (backBtn) backBtn.disabled = index === 0;
    if (nextBtn) {
      nextBtn.innerHTML =
        index === total - 1
          ? 'Finish <span class="arrow" aria-hidden="true">→</span>'
          : 'Next <span class="arrow" aria-hidden="true">→</span>';
    }
    clearError();
  }

  function goTo(i) {
    if (i < 0) i = 0;
    if (i >= total) {
      return finish();
    }
    index = i;
    renderCurrent();
    focusCurrent();
  }

  function next() {
    const qEl = currentQuestionEl();
    if (!isAnswered(qEl)) {
      showError("Please select an option to continue.");
      return;
    }
    // persist answer
    const id = qEl.getAttribute("data-question");
    answers[id] = readAnswer(qEl);
    persist();
    if (index === total - 1) {
      finish();
    } else {
      goTo(index + 1);
    }
  }

  function back() {
    if (index === 0) return;
    goTo(index - 1);
  }

  function finish() {
    buildSummary();
    showView("done");
    if (restartBtn) restartBtn.focus({ preventScroll: true });
  }

  function buildSummary() {
    const list = document.querySelector("[data-summary]");
    if (!list) return;
    list.innerHTML = "";
    qEls.forEach((qEl) => {
      const id = qEl.getAttribute("data-question");
      const label = qEl.getAttribute("data-summary-label") || "";
      const type = qEl.getAttribute("data-type");
      const val = answers[id];
      let pretty = "—";
      if (val !== undefined && val !== "") {
        if (type === "textarea") {
          pretty = val.length > 80 ? val.slice(0, 80) + "…" : val;
        } else {
          // look up the matching option's display text
          const opt = qEl.querySelector(
            `input[type="radio"][value="${CSS.escape(String(val))}"]`
          );
          if (opt) {
            const title = opt.parentElement.querySelector(".option__title");
            const scaleVal =
              opt.parentElement.querySelector(".scale__value");
            pretty = title
              ? title.textContent
              : scaleVal
              ? `${scaleVal.textContent} / 5`
              : String(val);
          } else {
            pretty = String(val);
          }
        }
      }
      const li = document.createElement("li");
      li.className = "summary__item";
      li.innerHTML = `<div class="summary__q">${escapeHTML(label)}</div><div class="summary__a">${escapeHTML(pretty)}</div>`;
      list.appendChild(li);
    });
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));
  }

  function showError(msg) {
    if (!errorEl) return;
    errorEl.textContent = msg;
  }
  function clearError() {
    if (errorEl) errorEl.textContent = "";
  }

  // --- Auto-advance on single-choice selection ----------------------------
  qEls.forEach((qEl) => {
    const type = qEl.getAttribute("data-type");
    if (type === "single" || type === "scale") {
      qEl.addEventListener("change", (e) => {
        if (e.target && e.target.matches('input[type="radio"]')) {
          const id = qEl.getAttribute("data-question");
          answers[id] = e.target.value;
          persist();
          clearError();
          // auto-advance with a short delay so users can see the selection
          setTimeout(() => {
            if (qEl.classList.contains("is-current")) next();
          }, 260);
        }
      });
    } else if (type === "textarea") {
      const ta = qEl.querySelector("textarea");
      const counter = qEl.querySelector("[data-ta-count]");
      const max = Number(ta?.getAttribute("maxlength") || 1000);
      if (ta && counter) {
        const update = () => {
          counter.textContent = `${ta.value.length.toLocaleString()} / ${max.toLocaleString()}`;
        };
        ta.addEventListener("input", () => {
          const id = qEl.getAttribute("data-question");
          answers[id] = ta.value;
          persist();
          update();
          clearError();
        });
        update();
      }
    }
  });

  // --- Buttons ------------------------------------------------------------
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      showView("questions");
      // Resume at the first unanswered question
      let resumeIdx = 0;
      for (let i = 0; i < qEls.length; i++) {
        if (!isAnswered(qEls[i])) {
          resumeIdx = i;
          break;
        }
        resumeIdx = i;
      }
      goTo(resumeIdx);
    });
  }
  if (nextBtn) nextBtn.addEventListener("click", next);
  if (backBtn) backBtn.addEventListener("click", back);
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      answers = {};
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (_) {}
      qEls.forEach((qEl) => {
        qEl.querySelectorAll("input[type=radio]").forEach(
          (r) => (r.checked = false)
        );
        const ta = qEl.querySelector("textarea");
        if (ta) ta.value = "";
        const counter = qEl.querySelector("[data-ta-count]");
        if (counter) {
          const max = Number(ta?.getAttribute("maxlength") || 1000);
          counter.textContent = `0 / ${max.toLocaleString()}`;
        }
      });
      index = 0;
      showView("intro");
    });
  }

  // --- Keyboard navigation ------------------------------------------------
  document.addEventListener("keydown", (e) => {
    if (view !== "questions") return;
    const inField =
      e.target &&
      (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT");
    const isRadio = e.target && e.target.type === "radio";
    // If focused in textarea, do not intercept most keys
    if (inField && !isRadio) {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        next();
      }
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      back();
    } else if (e.key === "Backspace") {
      e.preventDefault();
      back();
    } else if (/^[0-9a-zA-Z]$/.test(e.key)) {
      const qEl = currentQuestionEl();
      if (!qEl) return;
      const k = e.key.toUpperCase();
      const idx =
        /^[0-9]$/.test(e.key) && e.key !== "0"
          ? Number(e.key) - 1
          : k.charCodeAt(0) - "A".charCodeAt(0);
      const options = qEl.querySelectorAll('input[type="radio"]');
      if (options[idx]) {
        options[idx].checked = true;
        options[idx].dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  });

  // Year
  const y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  // Initial state
  hydrate();
  showView("intro");
  renderCurrent();
})();
