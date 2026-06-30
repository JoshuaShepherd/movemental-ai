/**
 * Agent orchestration local reader — fetches pack markdown and renders with typography.
 * Served from docs/build/agent-orchestration/ (see serve-agent-orchestration-viewer.mjs).
 */

const PACK_BASE = "..";
const MANIFEST_URL = "./manifest.json";
const NAV_EXPAND_KEY = "ao-viewer-nav-expanded";

const $ = (sel) => document.querySelector(sel);

/** @type {import('./manifest-types').Manifest | null} */
let manifest = null;

/** Raw markdown for the active doc view (null on home / while loading). */
let currentDocMarkdown = null;
let currentDocPath = null;

const COPY_MD_RESET_MS = 2000;
let copyMdResetTimer = null;

function configureMarked() {
  if (!window.marked) return;
  window.marked.setOptions({
    gfm: true,
    breaks: false,
    headerIds: true,
    mangle: false,
  });
  window.marked.use({
    renderer: {
      link({ href, title, text }) {
        const t = title ? ` title="${title}"` : "";
        const isExternal = href?.startsWith("http");
        const rel = isExternal ? ' rel="noopener noreferrer"' : "";
        const target = isExternal ? ' target="_blank"' : "";
        return `<a href="${href}"${t}${rel}${target}>${text}</a>`;
      },
      code({ text, lang }) {
        const langClass = lang ? ` class="language-${lang}"` : "";
        return `<pre><code${langClass}>${escapeHtml(text)}</code></pre>`;
      },
    },
  });
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function docUrl(path) {
  return `${PACK_BASE}/${path.split("/").map(encodeURIComponent).join("/")}`;
}

function getRoute() {
  const hash = location.hash.slice(1);
  if (!hash) return { kind: "home" };
  const params = new URLSearchParams(hash);
  const doc = params.get("doc");
  if (doc) return { kind: "doc", path: doc };
  return { kind: "home" };
}

function setRoute(path) {
  if (!path) {
    location.hash = "";
    return;
  }
  location.hash = `doc=${encodeURIComponent(path)}`;
}

function findDoc(path) {
  return manifest?.documents.find((d) => d.path === path) ?? null;
}

function setCopyMarkdownState({ visible, enabled, label = "Copy markdown" }) {
  const btn = $("#btn-copy-markdown");
  if (!btn) return;
  btn.hidden = !visible;
  btn.disabled = !enabled;
  btn.textContent = label;
  btn.classList.toggle("btn-copied", label === "Copied!");
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

async function copyCurrentMarkdown() {
  if (!currentDocMarkdown || !currentDocPath) return;
  const btn = $("#btn-copy-markdown");
  try {
    await copyTextToClipboard(currentDocMarkdown);
    if (copyMdResetTimer) clearTimeout(copyMdResetTimer);
    setCopyMarkdownState({ visible: true, enabled: true, label: "Copied!" });
    copyMdResetTimer = setTimeout(() => {
      setCopyMarkdownState({ visible: true, enabled: true });
    }, COPY_MD_RESET_MS);
  } catch (err) {
    if (btn) btn.title = `Copy failed: ${err}`;
  }
}

function loadNavExpandedState() {
  try {
    const raw = localStorage.getItem(NAV_EXPAND_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveNavExpandedState(state) {
  try {
    localStorage.setItem(NAV_EXPAND_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota / private mode */
  }
}

/** @type {Record<string, boolean>} */
let navExpandedState = loadNavExpandedState();

function isGroupExpanded(groupId, { filterActive, activeGroupId }) {
  if (filterActive) return true;
  if (Object.prototype.hasOwnProperty.call(navExpandedState, groupId)) {
    return navExpandedState[groupId];
  }
  return groupId === activeGroupId;
}

function setGroupExpanded(groupId, expanded) {
  navExpandedState[groupId] = expanded;
  saveNavExpandedState(navExpandedState);
}

function activeGroupIdForRoute() {
  const r = getRoute();
  if (r.kind !== "doc") return null;
  const doc = findDoc(r.path);
  if (!doc) return null;
  return manifest?.groups.find((g) => g.documents.some((d) => d.path === doc.path))?.id ?? null;
}

function renderNav(filter = "") {
  const nav = $("#nav");
  if (!manifest || !nav) return;

  const q = filter.trim().toLowerCase();
  const filterActive = q.length > 0;
  const activeGroupId = activeGroupIdForRoute();
  const groups = manifest.groups;

  nav.innerHTML = "";

  const homeLink = document.createElement("a");
  homeLink.href = "#";
  homeLink.className = "nav-link nav-link-home";
  homeLink.dataset.home = "1";
  homeLink.innerHTML = `<span class="nav-link-label">Guide & structure</span><span class="nav-link-meta">Home</span>`;
  nav.appendChild(homeLink);

  for (const group of groups) {
    const docs = group.documents.filter(
      (d) =>
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.path.toLowerCase().includes(q),
    );
    if (!docs.length) continue;

    const expanded = isGroupExpanded(group.id, { filterActive, activeGroupId });

    const section = document.createElement("section");
    section.className = "nav-group";
    section.dataset.groupId = group.id;
    if (expanded) section.classList.add("is-expanded");

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "nav-group-toggle";
    toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    toggle.setAttribute("aria-controls", `nav-group-${group.id}`);
    toggle.innerHTML = `
      <span class="nav-group-chevron" aria-hidden="true"></span>
      <span class="nav-group-heading">
        <span class="nav-group-title">${group.label}</span>
        <span class="nav-group-count">${docs.length}</span>
      </span>`;

    const items = document.createElement("div");
    items.className = "nav-group-items";
    items.id = `nav-group-${group.id}`;
    items.hidden = !expanded;

    for (const doc of docs) {
      const a = document.createElement("a");
      a.href = `#doc=${encodeURIComponent(doc.path)}`;
      a.className = "nav-link nav-link-doc";
      a.dataset.path = doc.path;
      a.innerHTML = `<span class="nav-link-label">${doc.title}${doc.badge ? `<span class="badge">${doc.badge}</span>` : ""}</span>`;
      items.appendChild(a);
    }

    toggle.addEventListener("click", () => {
      const next = !section.classList.contains("is-expanded");
      section.classList.toggle("is-expanded", next);
      items.hidden = !next;
      toggle.setAttribute("aria-expanded", next ? "true" : "false");
      setGroupExpanded(group.id, next);
    });

    section.appendChild(toggle);
    section.appendChild(items);
    nav.appendChild(section);
  }
}

function highlightNav(path) {
  document.querySelectorAll(".nav-link").forEach((el) => {
    const isActive = path ? el.dataset.path === path : el.dataset.home === "1";
    el.classList.toggle("active", isActive);
  });

  if (path) {
    const doc = findDoc(path);
    const groupId = manifest?.groups.find((g) =>
      g.documents.some((d) => d.path === doc?.path),
    )?.id;
    if (groupId) {
      setGroupExpanded(groupId, true);
      const section = document.querySelector(`.nav-group[data-group-id="${groupId}"]`);
      const items = section?.querySelector(".nav-group-items");
      const toggle = section?.querySelector(".nav-group-toggle");
      section?.classList.add("is-expanded");
      if (items) items.hidden = false;
      toggle?.setAttribute("aria-expanded", "true");
    }
  }
}

function renderHome() {
  const content = $("#content");
  const breadcrumb = $("#breadcrumb");
  if (!content || !manifest) return;

  breadcrumb.textContent = "Home — structure & prompt lab";
  highlightNav(null);
  currentDocMarkdown = null;
  currentDocPath = null;
  setCopyMarkdownState({ visible: false, enabled: false });

  const layers = manifest.layers
    .map(
      (l) =>
        `<tr><td><strong>${l.id}</strong> ${l.name}</td><td>${l.summary}</td><td><code>${l.files}</code></td></tr>`,
    )
    .join("");

  const cards = manifest.groups
    .map(
      (g) => `
      <div class="card" data-group="${g.id}" role="button" tabindex="0">
        <h3>${g.label}</h3>
        <p>${g.description}</p>
        <p style="margin-top:0.5rem;font-family:var(--mono);font-size:0.68rem;color:var(--ink-faint)">${g.documents.length} documents</p>
      </div>`,
    )
    .join("");

  const readingPath = manifest.readingOrder
    .map((item) => {
      const doc = findDoc(item.path);
      if (!doc) return "";
      return `<li>
        <div>
          <a href="#doc=${encodeURIComponent(item.path)}">${doc.title}</a>
          <span class="desc">${item.why}</span>
        </div>
      </li>`;
    })
    .join("");

  const levers = manifest.redesignLevers
    .map(
      (l) =>
        `<tr><td>${l.risk}</td><td>${l.lever}</td><td><code>${l.files}</code></td><td>${l.effect}</td></tr>`,
    )
    .join("");

  content.innerHTML = `
    <div class="hero">
      <h1>Movemental agent orchestration</h1>
      <p class="hero-lede">A local-only reader for the share pack — routing, prompts, say/show choreography, and redesign levers. Use this to understand the system before prompting changes.</p>
    </div>

    <div class="section-block">
      <h2>Quick start</h2>
      <p><strong>${manifest.stats.documentCount}</strong> documents across <strong>${manifest.groups.length}</strong> sections. Live product: <code>/agent</code> · default mode: <code>hybrid</code> (local scenes first, LLM on AGENT classification).</p>
      <p>Why pages appear instead of chat: <em>screen-first</em> chip routing + host prompt “speak and show.” See <a href="#doc=${encodeURIComponent("overview.md")}">overview</a> §1 and §7.</p>
    </div>

    <div class="section-block">
      <h2>Sections</h2>
      <div class="card-grid">${cards}</div>
    </div>

    <div class="section-block">
      <h2>Guided reading path</h2>
      <ol class="reading-path">${readingPath}</ol>
    </div>

    <div class="section-block">
      <h2>Orchestration layers</h2>
      <table class="layer-table">
        <thead><tr><th>Layer</th><th>Role</th><th>Key files (code)</th></tr></thead>
        <tbody>${layers}</tbody>
      </table>
    </div>

    <div class="section-block">
      <h2>Redesign levers (from overview)</h2>
      <table class="layer-table">
        <thead><tr><th>Risk</th><th>Lever</th><th>Files</th><th>Effect</th></tr></thead>
        <tbody>${levers}</tbody>
      </table>
    </div>

    <div class="section-block prompt-lab">
      <h2>Prompt lab — copy into Claude/Cursor</h2>
      <p>Use these templates after reading the relevant SSOT. Replace bracketed placeholders.</p>

      <h3 style="font-family:var(--serif);font-size:1rem;margin:1.25rem 0 0.5rem">Chat-first chip routing</h3>
      <pre class="prompt-template">Context: docs/build/agent-orchestration/ (or this local reader).

Goal: Collapsed dock opening chips should start a conversation in the expanded thread — not swap to pre-built screens (pricing, about, contact).

Constraints:
- Preserve I1–I6 from choreography SSOT unless we explicitly revise them
- Hybrid mode; engine prompts seeded separately

Tasks:
1. Propose changes to composer-routing.ts and scenes.ts opening flow
2. List Playwright tests to update
3. Note any room-host.md prompt edits needed (speak-without-show default)

Acceptance: Tapping "What does it cost?" expands dock and POSTs /turn — no pricing screen unless user asks to see it.</pre>

      <h3 style="font-family:var(--serif);font-size:1rem;margin:1.25rem 0 0.5rem">Host prompt — prose-first mode</h3>
      <pre class="prompt-template">Context: engine/prompts/room-host.md + runtime assembly doc.

Goal: Default host turns to prose in thread; call render tools only when visitor explicitly asks to "show" a screen or starts reality check.

Deliver:
1. Diff against room-host.md §2 Operating Model
2. Which tools remain assigned in seed-agent-room.ts
3. Smoke-test utterances (pricing question, path question, off-domain)

Do not seed until I approve the prompt diff.</pre>

      <h3 style="font-family:var(--serif);font-size:1rem;margin:1.25rem 0 0.5rem">Audit one visitor journey</h3>
      <pre class="prompt-template">Using agent-platform-complete-reference.md and move-classifier.ts:

Trace this journey step by step (LOCAL vs AGENT, screen swaps, voice channel):
1. Cold visit → opening chips
2. Tap "About Movemental" (collapsed)
3. Expand dock → type "we're a 40-person nonprofit"

For each step: classifier outcome, scene/tool, what renders where (caption vs thread vs screen).</pre>
    </div>

    <p class="footer-note">Local reader · gitignored · regenerate with <code>pnpm agent-orchestration:viewer:build</code> · serve with <code>pnpm agent-orchestration:viewer</code></p>
  `;

  content.querySelectorAll(".card").forEach((card) => {
    const open = () => {
      const g = manifest.groups.find((x) => x.id === card.dataset.group);
      const first = g?.documents[0];
      if (first) setRoute(first.path);
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        open();
      }
    });
  });
}

async function renderDoc(path) {
  const content = $("#content");
  const breadcrumb = $("#breadcrumb");
  const doc = findDoc(path);

  if (!content) return;

  if (!doc) {
    content.innerHTML = `<div class="error-state">Document not in manifest: ${escapeHtml(path)}</div>`;
    currentDocMarkdown = null;
    currentDocPath = null;
    setCopyMarkdownState({ visible: false, enabled: false });
    return;
  }

  breadcrumb.textContent = doc.path;
  highlightNav(path);
  currentDocMarkdown = null;
  currentDocPath = path;
  setCopyMarkdownState({ visible: true, enabled: false, label: "Loading…" });
  content.innerHTML = `<div class="loading">Loading ${escapeHtml(doc.title)}…</div>`;

  try {
    const res = await fetch(docUrl(path));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const md = await res.text();
    currentDocMarkdown = md;
    currentDocPath = path;
    setCopyMarkdownState({ visible: true, enabled: true });
    const html = window.marked.parse(md);
    const group = manifest.groups.find((g) => g.documents.some((d) => d.path === path));

    content.innerHTML = `
      <div class="doc-meta">
        <span class="tag">${group?.label ?? "Doc"}</span>
        ${doc.badge ? `<span class="tag">${doc.badge}</span>` : ""}
        <span>${doc.path}</span>
      </div>
      <div class="prose">${html}</div>
      <p class="footer-note">Canonical file may be a symlink — edit the source noted in pack README.</p>
    `;

    content.querySelectorAll(".prose a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#")) return;
      if (href.endsWith(".md")) {
        const normalized = href.replace(/^\.\//, "").replace(/^\.\.\//, "");
        const inPack = manifest.documents.find(
          (d) => d.path === normalized || d.path.endsWith("/" + normalized),
        );
        if (inPack) {
          a.addEventListener("click", (e) => {
            e.preventDefault();
            setRoute(inPack.path);
          });
        }
      }
    });
  } catch (err) {
    currentDocMarkdown = null;
    currentDocPath = path;
    setCopyMarkdownState({ visible: true, enabled: false });
    content.innerHTML = `<div class="error-state">Failed to load ${escapeHtml(path)}: ${escapeHtml(String(err))}</div>`;
  }
}

async function route() {
  const r = getRoute();
  if (r.kind === "home") renderHome();
  else await renderDoc(r.path);
}

async function loadManifest() {
  const res = await fetch(`${MANIFEST_URL}?t=${Date.now()}`);
  if (!res.ok) throw new Error("manifest.json missing — run pnpm agent-orchestration:viewer:build");
  manifest = await res.json();
  renderNav($("#search")?.value ?? "");
  await route();
}

function wireEvents() {
  $("#btn-home")?.addEventListener("click", () => setRoute(null));
  $("#btn-refresh")?.addEventListener("click", () => loadManifest().catch(showFatal));
  $("#btn-copy-link")?.addEventListener("click", () => {
    navigator.clipboard?.writeText(location.href);
  });
  $("#btn-copy-markdown")?.addEventListener("click", () => {
    void copyCurrentMarkdown();
  });
  $("#search")?.addEventListener("input", (e) => {
    renderNav(e.target.value);
  });
  $("#nav")?.addEventListener("click", (e) => {
    const link = e.target.closest("[data-home]");
    if (link) {
      e.preventDefault();
      setRoute(null);
    }
  });
  window.addEventListener("hashchange", () => route());
}

function showFatal(err) {
  const content = $("#content");
  if (content) {
    content.innerHTML = `<div class="error-state">${escapeHtml(String(err))}</div>`;
  }
}

configureMarked();
wireEvents();
loadManifest().catch(showFatal);
