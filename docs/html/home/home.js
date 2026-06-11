/**
 * Leader carousel + phrase underline gesture (static design mock-up).
 * Mirrors LeaderBand carousel math from leader-band.tsx.
 */
(function () {
  const shell = document.getElementById("carousel-shell");
  const viewport = document.getElementById("carousel-viewport");
  const track = document.getElementById("carousel-track");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const screen = document.getElementById("screen");
  const phrase = document.getElementById("phrase");
  const ink = document.getElementById("ink");
  const underline = document.getElementById("phrase-underline");
  const replay = document.getElementById("replay");
  const form = document.getElementById("composer-form");

  let index = 0;
  let metrics = { step: 0, maxIndex: 0, clipWidth: 0 };

  function measure() {
    if (!shell || !track) return;
    const items = track.children;
    const first = items[0];
    const second = items[1];
    const itemWidth = first ? first.offsetWidth : 0;
    const step = second && first ? second.offsetLeft - first.offsetLeft : itemWidth;
    const gap = Math.max(0, step - itemWidth);
    const available = shell.clientWidth;
    const visibleCount = step > 0 ? Math.max(1, Math.floor((available + gap) / step)) : 1;
    const fullClipWidth = visibleCount * step - gap;
    const trackWidth = items.length > 0 ? items.length * step - gap : 0;
    const clipWidth = Math.min(fullClipWidth, trackWidth);
    const maxIndex = Math.max(0, items.length - visibleCount);
    metrics = { step, maxIndex, clipWidth };
    if (viewport && clipWidth > 0) viewport.style.width = `${clipWidth}px`;
    index = Math.min(index, maxIndex);
    applyTransform();
    updateNav();
  }

  function applyTransform() {
    if (!track) return;
    track.style.transform = `translateX(${-index * metrics.step}px)`;
  }

  function updateNav() {
    if (!prevBtn || !nextBtn) return;
    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= metrics.maxIndex;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      index = Math.max(0, index - 1);
      applyTransform();
      updateNav();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      index = Math.min(metrics.maxIndex, index + 1);
      applyTransform();
      updateNav();
    });
  }

  if (typeof ResizeObserver !== "undefined" && shell) {
    const ro = new ResizeObserver(measure);
    ro.observe(shell);
  }

  window.addEventListener("load", () => {
    measure();
    drawPhraseUnderline();
  });

  function drawPhraseUnderline() {
    if (!screen || !phrase || !underline || !ink) return;
    const screenRect = screen.getBoundingClientRect();
    const phraseRect = phrase.getBoundingClientRect();
    const x0 = phraseRect.left - screenRect.left - 7;
    const y = phraseRect.bottom - screenRect.top + 3;
    const x1 = phraseRect.right - screenRect.left + 11;
    const steps = 20;
    let d = `M ${x0.toFixed(1)} ${(y + jitter(1.6)).toFixed(1)}`;
    for (let i = 1; i <= steps; i++) {
      const x = x0 + (x1 - x0) * (i / steps);
      const yy = y + Math.sin((i / steps) * Math.PI) * -1.4 + jitter(1.6);
      d += ` L ${x.toFixed(1)} ${yy.toFixed(1)}`;
    }
    d += ` L ${(x1 + 5).toFixed(1)} ${(y - 2.5).toFixed(1)}`;
    underline.setAttribute("d", d);
  }

  function jitter(n) {
    return (Math.random() - 0.5) * n;
  }

  if (replay) {
    replay.addEventListener("click", () => {
      index = 0;
      measure();
      drawPhraseUnderline();
      if (agentDock?.classList.contains("is-expanded")) setExpanded(false);
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => e.preventDefault());
  }

  const agentDock = document.getElementById("agent-dock");
  const agentCard = document.getElementById("agent-card");
  const dockBackdrop = document.getElementById("dock-backdrop");
  const expandToggle = document.getElementById("expand-toggle");
  const cardHandle = document.getElementById("card-handle");
  const cardCollapse = document.getElementById("card-collapse");
  const composerInput = document.getElementById("composer-input");
  const floatChips = document.getElementById("float-chips");

  function setExpanded(expanded) {
    if (!agentDock || !agentCard) return;
    agentDock.classList.toggle("is-expanded", expanded);
    agentCard.classList.toggle("is-expanded", expanded);
    if (dockBackdrop) dockBackdrop.hidden = !expanded;
    if (expandToggle) {
      expandToggle.setAttribute("aria-expanded", String(expanded));
      expandToggle.classList.toggle("is-active", expanded);
      expandToggle.setAttribute(
        "aria-label",
        expanded ? "Collapse chat" : "Expand chat"
      );
      expandToggle.setAttribute(
        "title",
        expanded ? "Collapse chat" : "Expand chat"
      );
    }
    if (cardHandle) cardHandle.setAttribute("aria-expanded", String(expanded));
    if (expanded && composerInput) {
      requestAnimationFrame(() => composerInput.focus());
    }
  }

  function expandDrawer() { setExpanded(true); }
  function collapseDrawer() { setExpanded(false); }

  if (expandToggle) {
    expandToggle.addEventListener("click", () => {
      setExpanded(!agentDock?.classList.contains("is-expanded"));
    });
  }
  if (cardHandle) {
    cardHandle.addEventListener("click", expandDrawer);
  }
  if (cardCollapse) {
    cardCollapse.addEventListener("click", collapseDrawer);
  }
  if (dockBackdrop) {
    dockBackdrop.addEventListener("click", collapseDrawer);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && agentDock?.classList.contains("is-expanded")) {
      collapseDrawer();
    }
  });

  if (floatChips) {
    floatChips.addEventListener("click", (e) => {
      const chip = e.target.closest(".floatChip");
      if (!chip || !composerInput) return;
      const say = chip.getAttribute("data-say") || chip.textContent.trim();
      composerInput.value = say;
      composerInput.focus();
    });
  }
})();
