/**
 * Agent dock + mast auth — shared across safety-scene HTML mock-ups.
 * Parity: docs/html/home/home.js (without carousel / phrase underline).
 */
(function () {
  const agentDock = document.getElementById("agent-dock");
  const agentCard = document.getElementById("agent-card");
  const dockBackdrop = document.getElementById("dock-backdrop");
  const expandToggle = document.getElementById("expand-toggle");
  const cardHandle = document.getElementById("card-handle");
  const cardCollapse = document.getElementById("card-collapse");
  const composerInput = document.getElementById("composer-input");
  const composerForm = document.getElementById("composer-form");
  const replay = document.getElementById("replay");

  function setExpanded(expanded) {
    if (!agentDock || !agentCard) return;
    agentDock.classList.toggle("is-expanded", expanded);
    agentCard.classList.toggle("is-expanded", expanded);
    if (dockBackdrop) dockBackdrop.hidden = !expanded;
    if (expandToggle) {
      expandToggle.setAttribute("aria-expanded", String(expanded));
      expandToggle.classList.toggle("is-active", expanded);
      expandToggle.setAttribute("aria-label", expanded ? "Collapse chat" : "Expand chat");
      expandToggle.setAttribute("title", expanded ? "Collapse chat" : "Expand chat");
    }
    if (cardHandle) cardHandle.setAttribute("aria-expanded", String(expanded));
    if (expanded && composerInput) requestAnimationFrame(() => composerInput.focus());
  }

  if (expandToggle) {
    expandToggle.addEventListener("click", () => {
      setExpanded(!agentDock?.classList.contains("is-expanded"));
    });
  }
  if (cardHandle) cardHandle.addEventListener("click", () => setExpanded(true));
  if (cardCollapse) cardCollapse.addEventListener("click", () => setExpanded(false));
  if (dockBackdrop) dockBackdrop.addEventListener("click", () => setExpanded(false));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && agentDock?.classList.contains("is-expanded")) setExpanded(false);
  });

  if (composerForm) {
    composerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const voice = document.getElementById("voice-line");
      if (composerInput?.value.trim() && voice) {
        voice.textContent = 'Not wired in this mock-up — you\'d send: "' + composerInput.value.trim() + '"';
        composerInput.value = "";
      }
    });
  }

  if (replay) {
    replay.addEventListener("click", () => {
      const sheet = document.getElementById("sheet");
      if (sheet) {
        sheet.style.animation = "none";
        void sheet.offsetWidth;
        sheet.style.animation = "";
      }
      if (agentDock?.classList.contains("is-expanded")) setExpanded(false);
      if (typeof window.__safetySceneReplay === "function") window.__safetySceneReplay();
    });
  }

  const AUTH_MENUS = {
    org: { label: "Organization workspace", links: [
      { href: "/dashboard/onboarding", text: "Onboarding" },
      { href: "/dashboard/ai-reality", text: "AI Reality dashboard" },
      { href: "/assess", text: "Integrity diagnostic" },
    ]},
    leader: { label: "Leader workspace", links: [
      { href: "/dashboard/onboarding/leader", text: "Leader onboarding" },
      { href: "/dashboard/ai-reality", text: "AI Reality dashboard" },
    ]},
    assess: { label: "Assessment workspace", links: [
      { href: "/dashboard/ai-reality", text: "Your AI Reality map" },
    ]},
  };

  const authOut = document.getElementById("auth-out");
  const authIn = document.getElementById("auth-in");
  const authMenuTrigger = document.getElementById("auth-menu-trigger");
  const authMenu = document.getElementById("auth-menu");
  const authMenuLabel = document.getElementById("auth-menu-label");
  const authMenuList = document.getElementById("auth-menu-list");
  const authSignOut = document.getElementById("auth-sign-out");

  function readAuthRole() {
    const p = new URLSearchParams(window.location.search).get("auth");
    return p === "org" || p === "leader" || p === "assess" ? p : "signed-out";
  }

  function renderAuthMenu(role) {
    if (!authMenuList || !authMenuLabel) return;
    const cfg = AUTH_MENUS[role];
    authMenuLabel.textContent = cfg ? cfg.label : "Workspace";
    authMenuList.innerHTML = "";
    (cfg?.links || []).forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.text;
      a.setAttribute("role", "menuitem");
      li.appendChild(a);
      authMenuList.appendChild(li);
    });
  }

  function setAuthMenuOpen(open) {
    if (!authMenu || !authMenuTrigger) return;
    authMenu.hidden = !open;
    authMenuTrigger.setAttribute("aria-expanded", String(open));
  }

  function applyAuthState() {
    const role = readAuthRole();
    const signedIn = role !== "signed-out";
    if (authOut) authOut.hidden = signedIn;
    if (authIn) authIn.hidden = !signedIn;
    if (signedIn) { renderAuthMenu(role); setAuthMenuOpen(false); }
  }

  applyAuthState();
  if (authMenuTrigger && authMenu) {
    authMenuTrigger.addEventListener("click", () => setAuthMenuOpen(authMenu.hidden));
  }
  if (authSignOut) {
    authSignOut.addEventListener("click", () => {
      const url = new URL(window.location.href);
      url.searchParams.delete("auth");
      window.location.href = url.toString();
    });
  }
  document.addEventListener("click", (e) => {
    if (!authMenu || authMenu.hidden) return;
    const t = e.target;
    if (authMenu.contains(t) || authMenuTrigger?.contains(t)) return;
    setAuthMenuOpen(false);
  });
})();
