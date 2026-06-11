/**
 * Charter Dashboard — client-side SPA (hash routes, mock data).
 */
(() => {
  const mock = window.CharterDashboardMock;
  if (!mock) return;

  const VIEWS = {
    overview: { title: 'Overview', icon: 'layout-dashboard' },
    charter: { title: 'Charter', icon: 'scroll-text' },
    assessment: { title: 'Assessment', icon: 'clipboard-list' },
    search: { title: 'Search', icon: 'search' },
    rollout: { title: 'Rollout', icon: 'package' },
  };

  const state = {
    route: 'overview',
    charterLayer: 'statement',
    assessmentTab: 'preview',
    boardView: false,
    searchQuery: '',
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function showToast(message) {
    let el = $('.cd-toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'cd-toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => el.classList.remove('is-visible'), 2800);
  }

  function charterStatusLabel() {
    const { overallStatus, layersComplete, layerCount, ratifiedDate } = mock.charter;
    if (overallStatus === 'ratified' && ratifiedDate) {
      return `Ratified · ${ratifiedDate}`;
    }
    return `Draft — ${layersComplete} of ${layerCount} layers complete`;
  }

  function primaryCta() {
    if (mock.charter.primaryNextAction === 'ratify') {
      return {
        label: 'Prepare board ratification',
        detail: 'Rules and Response Plans need final review before the board packet is ready.',
        action: () => navigate('charter'),
        btn: 'Open Charter',
      };
    }
    return {
      label: 'Roll out the Assessment',
      detail: `${mock.assessment.staffCompleted} of ${mock.assessment.staffTotal} staff have completed — close the gap in Pastoral Care.`,
      action: () => navigate('assessment'),
      btn: 'Open Assessment',
    };
  }

  function renderOverview() {
    const cta = primaryCta();
    return `
      <div class="cd-view-header">
        <h1>Overview</h1>
        <p class="cd-view-lede">Operational status for your ${escapeHtml(mock.org.artifactLabel)} — searchable, ratifiable, and ready to roll out to staff.</p>
      </div>
      <div class="cd-stat-grid">
        <div class="cd-stat-card">
          <p class="cd-stat-label">${escapeHtml(mock.org.artifactLabel)}</p>
          <p class="cd-stat-value">${escapeHtml(charterStatusLabel())}</p>
          <p class="cd-stat-detail">Five layers · board-ratifiable document</p>
        </div>
        <div class="cd-stat-card">
          <p class="cd-stat-label">Assessment</p>
          <p class="cd-stat-value">${mock.assessment.staffCompleted} of ${mock.assessment.staffTotal}</p>
          <p class="cd-stat-detail">staff completed · rollout ${mock.assessment.rolloutActive ? 'in progress' : 'not started'}</p>
        </div>
        <div class="cd-stat-card">
          <p class="cd-stat-label">Product</p>
          <p class="cd-stat-value">${escapeHtml(mock.org.productLabel)}</p>
          <p class="cd-stat-detail">${escapeHtml(mock.org.cohort)}</p>
        </div>
      </div>
      <div class="cd-cta-banner">
        <div>
          <strong>${escapeHtml(cta.label)}</strong>
          <p>${escapeHtml(cta.detail)}</p>
        </div>
        <button type="button" class="cd-btn cd-btn-ghost-on-dark" data-primary-cta>${escapeHtml(cta.btn)}</button>
      </div>
      <h2 class="cd-section-title">Recent activity</h2>
      <ul class="cd-activity-list">
        ${mock.activity.map((a) => `
          <li><span class="cd-activity-when">${escapeHtml(a.when)}</span><span>${escapeHtml(a.text)}</span></li>
        `).join('')}
      </ul>
    `;
  }

  function renderCharter() {
    const layer = mock.charter.layers.find((l) => l.id === state.charterLayer) || mock.charter.layers[0];
    const boardClause = '<li class="cd-clause--board-only"><em>Board summary:</em> This layer is presented for ratification as part of the five-layer AI Charter. Adoption affirms the clauses above as binding organizational policy.</li>';

    return `
      <div class="cd-view-header">
        <h1>${escapeHtml(mock.org.artifactLabel)}</h1>
        <p class="cd-view-lede">Living document — five layers in order. Staff search references these clauses; the board ratifies the whole.</p>
      </div>
      <div class="cd-doc-toolbar" style="margin-bottom: var(--space-6);">
        <span class="cd-badge cd-badge--${mock.charter.overallStatus === 'ratified' ? 'ratified' : 'draft'}">${escapeHtml(charterStatusLabel())}</span>
        <div style="display:flex; flex-wrap:wrap; gap: var(--space-3); align-items:center;">
          <label class="cd-toggle"><input type="checkbox" data-board-view ${state.boardView ? 'checked' : ''} /> Board view</label>
          <button type="button" class="cd-btn cd-btn-secondary" data-export-pdf>
            <i data-lucide="file-down" width="16" height="16" aria-hidden="true"></i>
            Export to PDF
          </button>
        </div>
      </div>
      <div class="cd-charter-layout">
        <ul class="cd-layer-nav" role="tablist" aria-label="Charter layers">
          ${mock.charter.layers.map((l) => `
            <li>
              <button type="button" role="tab" aria-selected="${l.id === state.charterLayer}" class="${l.id === state.charterLayer ? 'is-active' : ''}" data-layer="${l.id}">
                <span class="cd-layer-nav-num">Layer ${l.num}</span>
                <span class="cd-layer-nav-name">${escapeHtml(l.name)}</span>
                <span class="cd-badge cd-badge--${l.status}">${l.status}</span>
              </button>
            </li>
          `).join('')}
        </ul>
        <article class="cd-doc-panel cd-board-view ${state.boardView ? 'is-on' : ''}" role="tabpanel">
          <h2>${escapeHtml(layer.name)}</h2>
          <p class="cd-doc-purpose">${escapeHtml(layer.purpose)}</p>
          <ol class="cd-clauses">
            ${layer.clauses.map((c) => `<li>${escapeHtml(c)}</li>`).join('')}
            ${boardClause}
          </ol>
        </article>
      </div>
    `;
  }

  function renderAssessment() {
    const { previewQuestions, departments, results, durationNote, inviteLink, staffCompleted, staffTotal } = mock.assessment;
    return `
      <div class="cd-view-header">
        <h1>Assessment</h1>
        <p class="cd-view-lede">Org-wide diagnostic — preview the question set, roll out by link, and read synthesis across dimensions. ${escapeHtml(durationNote)}.</p>
      </div>
      <div class="cd-tabs" role="tablist">
        <button type="button" class="cd-tab ${state.assessmentTab === 'preview' ? 'is-active' : ''}" data-assess-tab="preview" role="tab">Preview</button>
        <button type="button" class="cd-tab ${state.assessmentTab === 'rollout' ? 'is-active' : ''}" data-assess-tab="rollout" role="tab">Roll out</button>
        <button type="button" class="cd-tab ${state.assessmentTab === 'results' ? 'is-active' : ''}" data-assess-tab="results" role="tab">Results</button>
      </div>
      <div class="cd-tab-panel ${state.assessmentTab === 'preview' ? 'is-active' : ''}" role="tabpanel">
        <p class="cd-view-lede" style="margin-bottom: var(--space-6);">Representative questions — full instrument ships with your cohort.</p>
        <ul class="cd-question-list">
          ${previewQuestions.map((q) => `
            <li>
              <p class="cd-question-dim">${escapeHtml(q.dimension)}</p>
              <p style="margin:0; font-size: var(--fs-base); line-height: 1.5;">${escapeHtml(q.text)}</p>
            </li>
          `).join('')}
        </ul>
      </div>
      <div class="cd-tab-panel ${state.assessmentTab === 'rollout' ? 'is-active' : ''}" role="tabpanel">
        <p><strong>${staffCompleted} of ${staffTotal}</strong> staff completed.</p>
        <p class="cd-view-lede">Share an invite link — no accounts required for respondents in this mockup.</p>
        <div class="cd-invite-box">
          <input type="text" readonly value="${escapeHtml(inviteLink)}" aria-label="Assessment invite link" />
          <button type="button" class="cd-btn cd-btn-secondary" data-copy-invite>Copy link</button>
        </div>
        <table class="cd-progress-table">
          <thead><tr><th>Department</th><th>Invited</th><th>Completed</th></tr></thead>
          <tbody>
            ${departments.map((d) => `
              <tr><td>${escapeHtml(d.name)}</td><td>${d.invited}</td><td>${d.completed}</td></tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      <div class="cd-tab-panel ${state.assessmentTab === 'results' ? 'is-active' : ''}" role="tabpanel">
        <div class="cd-results-grid">
          <div class="cd-stat-card">
            <p class="cd-stat-label">Org synthesis</p>
            <p style="margin:0; line-height:1.6; font-size: var(--fs-sm);">${escapeHtml(results.summary)}</p>
          </div>
          <div>
            <h3 class="cd-section-title">By dimension</h3>
            <ul class="cd-dimension-list">
              ${results.dimensions.map((d) => `
                <li>
                  <span><strong>${escapeHtml(d.name)}</strong> — ${escapeHtml(d.finding)}</span>
                  <span class="cd-severity--${d.severity}">${d.severity}</span>
                </li>
              `).join('')}
            </ul>
          </div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
            <div class="cd-stat-card">
              <p class="cd-stat-label">AI already in use</p>
              <ul class="cd-clauses" style="padding-left: 1rem;">
                ${results.inUse.map((x) => `<li style="font-size: var(--fs-sm);">${escapeHtml(x)}</li>`).join('')}
              </ul>
            </div>
            <div class="cd-stat-card">
              <p class="cd-stat-label">Gaps</p>
              <ul class="cd-clauses" style="padding-left: 1rem;">
                ${results.gaps.map((x) => `<li style="font-size: var(--fs-sm);">${escapeHtml(x)}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function runSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const hits = [];
    for (const seed of mock.search.seeds) {
      if (seed.query.toLowerCase().includes(q) || seed.excerpt.toLowerCase().includes(q)) {
        hits.push({ layer: seed.layer, excerpt: seed.excerpt, query: seed.query });
      }
    }
    for (const row of mock.search.index) {
      const matchKw = row.keywords.some((k) => q.includes(k) || k.includes(q));
      const matchText = row.text.toLowerCase().includes(q);
      if (matchKw || matchText) {
        hits.push({ layer: row.layer, excerpt: row.text });
      }
    }
    const seen = new Set();
    return hits.filter((h) => {
      const key = h.layer + h.excerpt.slice(0, 40);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function renderSearch() {
    const results = state.searchQuery ? runSearch(state.searchQuery) : [];
    return `
      <div class="cd-view-header">
        <h1>Search</h1>
        <p class="cd-view-lede">Ask a question about your organization's AI posture. Answers cite the relevant Charter layer — what a PDF cannot do on its own.</p>
      </div>
      <div class="cd-search-hero">
        <input type="search" placeholder="${escapeHtml(mock.search.placeholder)}" value="${escapeHtml(state.searchQuery)}" data-search-input aria-label="Search the AI Charter" />
      </div>
      <div class="cd-seed-chips" aria-label="Example questions">
        ${mock.search.seeds.map((s) => `
          <button type="button" class="cd-seed-chip" data-seed-query="${escapeHtml(s.query)}">${escapeHtml(s.query)}</button>
        `).join('')}
      </div>
      <div data-search-results>
        ${!state.searchQuery ? '<p class="cd-search-empty">Try a question above or select an example.</p>' : ''}
        ${results.length === 0 && state.searchQuery ? '<p class="cd-search-empty">No matching clauses — try "pastoral", "incident", or "refuse".</p>' : ''}
        ${results.map((r) => `
          <div class="cd-search-result">
            <p class="cd-search-result-layer">${escapeHtml(r.layer)} layer</p>
            <p style="margin:0; line-height:1.6;">${escapeHtml(r.excerpt)}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderRollout() {
    return `
      <div class="cd-view-header">
        <h1>Rollout</h1>
        <p class="cd-view-lede">Pre-built supports that turn ratification into adoption — preview and download representative assets.</p>
      </div>
      <div class="cd-rollout-grid">
        ${mock.rollout.items.map((item) => `
          <article class="cd-rollout-card">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <p class="cd-rollout-format">${escapeHtml(item.format)}</p>
            <div class="cd-rollout-actions">
              <button type="button" class="cd-btn cd-btn-secondary" data-rollout-preview="${item.id}">Preview</button>
              <button type="button" class="cd-btn cd-btn-primary" data-rollout-download="${item.id}">Download</button>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  }

  const renderers = {
    overview: renderOverview,
    charter: renderCharter,
    assessment: renderAssessment,
    search: renderSearch,
    rollout: renderRollout,
  };

  function renderView() {
    const mount = $('#cd-view-mount');
    if (!mount) return;
    const fn = renderers[state.route];
    mount.innerHTML = fn ? fn() : '';
    wireView();
    if (window.lucide) window.lucide.createIcons({ nodes: [mount] });
  }

  function wireView() {
    $('[data-primary-cta]')?.addEventListener('click', () => primaryCta().action());

    $$('[data-layer]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.charterLayer = btn.dataset.layer;
        renderView();
      });
    });

    $('[data-board-view]')?.addEventListener('change', (e) => {
      state.boardView = e.target.checked;
      $('.cd-board-view')?.classList.toggle('is-on', state.boardView);
    });

    $('[data-export-pdf]')?.addEventListener('click', () => {
      showToast('Export queued (mock) — print-quality PDF would generate here.');
    });

    $$('[data-assess-tab]').forEach((tab) => {
      tab.addEventListener('click', () => {
        state.assessmentTab = tab.dataset.assessTab;
        renderView();
      });
    });

    $('[data-copy-invite]')?.addEventListener('click', () => {
      const input = $('.cd-invite-box input');
      if (input) {
        input.select();
        navigator.clipboard?.writeText(input.value).catch(() => {});
      }
      showToast('Invite link copied (mock).');
    });

    const searchInput = $('[data-search-input]');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        const resultsEl = $('[data-search-results]');
        if (resultsEl) {
          const results = runSearch(state.searchQuery);
          resultsEl.innerHTML =
            (!state.searchQuery ? '<p class="cd-search-empty">Try a question above or select an example.</p>' : '') +
            (results.length === 0 && state.searchQuery ? '<p class="cd-search-empty">No matching clauses — try "pastoral", "incident", or "refuse".</p>' : '') +
            results.map((r) => `
              <div class="cd-search-result">
                <p class="cd-search-result-layer">${escapeHtml(r.layer)} layer</p>
                <p style="margin:0; line-height:1.6;">${escapeHtml(r.excerpt)}</p>
              </div>
            `).join('');
        }
      });
    }

    $$('[data-seed-query]').forEach((chip) => {
      chip.addEventListener('click', () => {
        state.searchQuery = chip.dataset.seedQuery;
        renderView();
        $('[data-search-input]')?.focus();
      });
    });

    $$('[data-rollout-preview], [data-rollout-download]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.rolloutPreview || btn.dataset.rolloutDownload;
        const item = mock.rollout.items.find((i) => i.id === id);
        const action = btn.dataset.rolloutPreview ? 'Preview' : 'Download';
        showToast(`${action} — ${item?.title || 'asset'} (mock).`);
      });
    });
  }

  function setActiveNav() {
    $$('.cd-nav-link').forEach((link) => {
      link.classList.toggle('is-active', link.dataset.route === state.route);
    });
    const meta = $('#cd-topbar-meta');
    if (meta) meta.textContent = VIEWS[state.route]?.title || '';
  }

  function navigate(route) {
    if (!VIEWS[route]) return;
    state.route = route;
    location.hash = route;
    setActiveNav();
    renderView();
  }

  function initNav() {
    const navMount = $('#cd-nav-list');
    if (!navMount) return;
    navMount.innerHTML = Object.entries(VIEWS).map(([id, v]) => `
      <li>
        <a href="#${id}" class="cd-nav-link" data-route="${id}">
          <i data-lucide="${v.icon}" width="18" height="18" aria-hidden="true"></i>
          <span>${escapeHtml(v.title)}</span>
        </a>
      </li>
    `).join('');

    navMount.addEventListener('click', (e) => {
      const link = e.target.closest('[data-route]');
      if (!link) return;
      e.preventDefault();
      navigate(link.dataset.route);
    });
  }

  function parseRoute() {
    const hash = (location.hash || '#overview').replace(/^#/, '');
    return VIEWS[hash] ? hash : 'overview';
  }

  function init() {
    initNav();
    state.route = parseRoute();
    setActiveNav();
    renderView();
    window.addEventListener('hashchange', () => {
      state.route = parseRoute();
      setActiveNav();
      renderView();
    });
    if (window.lucide) window.lucide.createIcons();
    $('[data-sign-out]')?.addEventListener('click', () => {
      showToast('Sign out (mock) — would redirect to marketing login.');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
