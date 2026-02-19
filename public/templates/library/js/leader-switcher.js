/**
 * Bottom-left floaters: (1) Template switcher — opens modal with design-mode cards.
 * (2) Author switcher — "View as" Alan/Brad/Dave. Styled like launcher home (sage, scarlet).
 */
(function () {
  var LEADER_STORAGE_KEY = 'launcher-leader';
  var VALID_LEADERS = [
    { value: 'alan-hirsch', label: 'Alan Hirsch' },
    { value: 'brad-brisco', label: 'Brad Brisco' },
    { value: 'dave-ferguson', label: 'Dave Ferguson' }
  ];

  // Launcher-style tokens (match directories/index.html)
  var sage950 = '#0f140f';
  var sage900 = '#161d16';
  var sage800 = '#2c3a2c';
  var scarlet500 = '#cb3437';
  var scarlet400 = '#d55d5f';
  var textOnDark = '#ffffff';
  var textMuted = 'rgba(255,255,255,0.7)';
  var borderDark = 'rgba(255,255,255,0.15)';
  var radiusLg = '16px';
  var radiusMd = '12px';
  var radiusSm = '8px';

  function getLeaderFromUrl() {
    var params = new URLSearchParams(window.location.search);
    var leader = params.get('leader');
    return leader && VALID_LEADERS.some(function (o) { return o.value === leader; }) ? leader : null;
  }
  function getLeaderFromStorage() {
    try {
      var stored = localStorage.getItem(LEADER_STORAGE_KEY);
      return stored && VALID_LEADERS.some(function (o) { return o.value === stored; }) ? stored : null;
    } catch (e) { return null; }
  }
  function getEffectiveLeader() {
    return getLeaderFromUrl() || getLeaderFromStorage() || 'alan-hirsch';
  }
  function currentUrlWithLeader(leader) {
    var url = new URL(window.location.href);
    url.searchParams.set('leader', leader);
    return url.toString();
  }
  function appendLeaderToHref(href, leader) {
    if (!href || !leader) return href;
    var sep = href.indexOf('?') >= 0 ? '&' : '?';
    return href + sep + 'leader=' + encodeURIComponent(leader);
  }

  /** Manifest URL: resolve once at load (currentScript is only set while this script runs). */
  var MANIFEST_URL = (function () {
    var script = document.currentScript;
    if (script && script.src) {
      var base = script.src.replace(/\/[^/]*$/, '/');
      return base + '../templates-manifest.json';
    }
    return '';
  })();
  /** Base URL for template links: same directory as manifest, so hrefs like "behance-style/" resolve correctly from any page. */
  function getManifestBaseUrl() {
    if (MANIFEST_URL) return MANIFEST_URL.replace(/\/[^/]*$/, '/');
    return window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '/').replace(/\/[^/]+\/?$/, '/') || window.location.origin + '/';
  }
  function getManifestUrl() {
    if (MANIFEST_URL) return MANIFEST_URL;
    var path = window.location.pathname.replace(/\/$/, '');
    var oneUp = path.replace(/\/[^/]+$/, '') || '/';
    return oneUp === '/' ? 'templates-manifest.json' : '../templates-manifest.json';
  }

  var style = document.createElement('style');
  style.textContent = [
    '#leader-floaters-wrap { position: fixed; bottom: 20px; left: 20px; z-index: 99999; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; font-family: Inter, system-ui, -apple-system, sans-serif; font-size: 14px; }',
    '#leader-floaters-wrap .floater-btn { width: 48px; height: 48px; border-radius: 50%; border: 2px solid ' + borderDark + '; background: ' + sage950 + '; color: ' + textOnDark + '; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.35); transition: border-color 0.2s, background 0.2s; flex-shrink: 0; }',
    '#leader-floaters-wrap .floater-btn:hover { border-color: rgba(255,255,255,0.4); background: ' + sage900 + '; }',
    '#leader-floaters-wrap .floater-btn:focus { outline: 2px solid ' + scarlet500 + '; outline-offset: 2px; }',
    '#leader-floaters-wrap .floater-btn svg { width: 24px; height: 24px; }',
    '#leader-floaters-wrap #leader-switcher-floater .leader-floater__panel { position: absolute; bottom: 100%; left: 0; margin-bottom: 10px; min-width: 200px; padding: 8px; background: ' + sage950 + '; border: 1px solid ' + borderDark + '; border-radius: ' + radiusMd + '; box-shadow: 0 8px 24px rgba(0,0,0,0.4); display: none; }',
    '#leader-floaters-wrap #leader-switcher-floater.is-open .leader-floater__panel { display: block; }',
    '#leader-floaters-wrap .leader-floater__title { padding: 6px 10px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: ' + textMuted + '; }',
    '#leader-floaters-wrap .leader-floater__option { display: block; width: 100%; padding: 10px 12px; border: none; border-radius: ' + radiusSm + '; background: transparent; color: ' + textOnDark + '; text-align: left; cursor: pointer; font-size: 14px; transition: background 0.15s; }',
    '#leader-floaters-wrap .leader-floater__option:hover { background: rgba(255,255,255,0.1); }',
    '#leader-floaters-wrap .leader-floater__option.is-selected { background: rgba(203, 52, 55, 0.25); color: #fca5a5; }',
    '#template-modal-overlay { position: fixed; inset: 0; background: rgba(15,20,15,0.85); backdrop-filter: blur(8px); z-index: 100000; display: none; align-items: center; justify-content: center; padding: 24px; }',
    '#template-modal-overlay.is-open { display: flex; }',
    '#template-modal { background: ' + sage950 + '; border: 1px solid ' + borderDark + '; border-radius: ' + radiusLg + '; box-shadow: 0 24px 48px rgba(0,0,0,0.5); max-width: 720px; width: 100%; max-height: 85vh; overflow: hidden; display: flex; flex-direction: column; }',
    '#template-modal .template-modal__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 24px 24px 0; }',
    '#template-modal .template-modal__title { font-family: Playfair Display, Georgia, serif; font-size: 1.5rem; font-weight: 600; color: ' + textOnDark + '; margin: 0; letter-spacing: -0.02em; }',
    '#template-modal .template-modal__close { width: 40px; height: 40px; border: none; border-radius: ' + radiusSm + '; background: rgba(255,255,255,0.08); color: ' + textOnDark + '; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; flex-shrink: 0; }',
    '#template-modal .template-modal__close:hover { background: rgba(255,255,255,0.15); }',
    '#template-modal .template-modal__subtitle { color: ' + textMuted + '; font-size: 0.9375rem; line-height: 1.5; margin: 8px 0 0; padding: 0 24px; }',
    '#template-modal .template-modal__scroll { overflow-y: auto; padding: 20px 24px 24px; }',
    '#template-modal .template-modal__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 16px; list-style: none; margin: 0; padding: 0; }',
    '#template-modal .template-modal__card { background: rgba(255,255,255,0.04); border: 1px solid ' + borderDark + '; border-radius: ' + radiusMd + '; padding: 20px; transition: border-color 0.2s, background 0.2s; }',
    '#template-modal .template-modal__card:hover { border-color: ' + scarlet400 + '; background: rgba(203, 52, 55, 0.08); }',
    '#template-modal .template-modal__card h3 { font-family: Playfair Display, Georgia, serif; font-size: 1rem; font-weight: 600; color: ' + textOnDark + '; margin: 0 0 8px; }',
    '#template-modal .template-modal__card p { font-size: 0.8125rem; color: ' + textMuted + '; margin: 0 0 12px; line-height: 1.45; }',
    '#template-modal .template-modal__card a { display: inline-flex; align-items: center; gap: 6px; font-size: 0.875rem; font-weight: 600; color: ' + scarlet400 + '; text-decoration: none; }',
    '#template-modal .template-modal__card a:hover { color: ' + scarlet500 + '; text-decoration: underline; }',
    '#template-modal .template-modal__loading { color: ' + textMuted + '; padding: 24px; text-align: center; }',
    '#template-modal .template-modal__error { color: #fca5a5; padding: 24px; text-align: center; }'
  ].join('\n');
  document.head.appendChild(style);

  // Wrapper: template button on top, author floater below
  var wrap = document.createElement('div');
  wrap.id = 'leader-floaters-wrap';

  // —— Template switcher button (grid icon) ——
  var templateBtn = document.createElement('button');
  templateBtn.type = 'button';
  templateBtn.className = 'floater-btn';
  templateBtn.setAttribute('aria-label', 'Choose a design mode');
  templateBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 14a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 14a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/></svg>';
  wrap.appendChild(templateBtn);

  // —— Author switcher (person icon + panel) ——
  var authorWrap = document.createElement('div');
  authorWrap.id = 'leader-switcher-floater';
  authorWrap.style.position = 'relative';
  var authorBtn = document.createElement('button');
  authorBtn.type = 'button';
  authorBtn.className = 'floater-btn leader-floater__btn';
  authorBtn.setAttribute('aria-label', 'Change author (View as)');
  authorBtn.setAttribute('aria-expanded', 'false');
  authorBtn.setAttribute('aria-haspopup', 'true');
  authorBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>';
  var authorPanel = document.createElement('div');
  authorPanel.className = 'leader-floater__panel';
  authorPanel.setAttribute('role', 'menu');
  var authorTitle = document.createElement('div');
  authorTitle.className = 'leader-floater__title';
  authorTitle.textContent = 'View as';
  authorPanel.appendChild(authorTitle);
  VALID_LEADERS.forEach(function (o) {
    var opt = document.createElement('button');
    opt.type = 'button';
    opt.className = 'leader-floater__option' + (o.value === getEffectiveLeader() ? ' is-selected' : '');
    opt.textContent = o.label;
    opt.setAttribute('role', 'menuitem');
    opt.setAttribute('data-leader', o.value);
    authorPanel.appendChild(opt);
  });
  authorWrap.appendChild(authorBtn);
  authorWrap.appendChild(authorPanel);
  wrap.appendChild(authorWrap);

  document.body.appendChild(wrap);

  function setAuthorSelected(v) {
    authorPanel.querySelectorAll('.leader-floater__option').forEach(function (el) {
      el.classList.toggle('is-selected', el.getAttribute('data-leader') === v);
    });
  }
  function closeAuthorPanel() {
    authorWrap.classList.remove('is-open');
    authorBtn.setAttribute('aria-expanded', 'false');
  }
  authorBtn.addEventListener('click', function () {
    var open = authorWrap.classList.toggle('is-open');
    authorBtn.setAttribute('aria-expanded', open);
  });
  authorPanel.querySelectorAll('.leader-floater__option').forEach(function (opt) {
    opt.addEventListener('click', function () {
      var leader = opt.getAttribute('data-leader');
      setAuthorSelected(leader);
      try { localStorage.setItem(LEADER_STORAGE_KEY, leader); } catch (e) {}
      if (typeof window.__onLeaderChange === 'function') {
        window.__onLeaderChange(leader);
        closeAuthorPanel();
      } else {
        window.location.href = currentUrlWithLeader(leader);
      }
    });
  });

  // —— Templates modal ——
  var overlay = document.createElement('div');
  overlay.id = 'template-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'template-modal-title');
  var modal = document.createElement('div');
  modal.id = 'template-modal';
  modal.innerHTML =
    '<div class="template-modal__head">' +
      '<h2 id="template-modal-title" class="template-modal__title">Choose a design mode</h2>' +
      '<button type="button" class="template-modal__close" aria-label="Close">' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>' +
      '</button>' +
    '</div>' +
    '<p class="template-modal__subtitle">Or choose a quick starter. Each mode includes home, content hub, books, courses, and more.</p>' +
    '<div class="template-modal__scroll">' +
      '<p class="template-modal__loading" id="template-modal-loading">Loading templates…</p>' +
      '<ul class="template-modal__grid" id="template-modal-grid" hidden></ul>' +
      '<p class="template-modal__error" id="template-modal-error" hidden></p>' +
    '</div>';
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  var modalGrid = document.getElementById('template-modal-grid');
  var modalLoading = document.getElementById('template-modal-loading');
  var modalError = document.getElementById('template-modal-error');

  function closeModal() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
  }
  function openModal() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    loadTemplatesIntoModal();
  }

  function loadTemplatesIntoModal() {
    modalLoading.hidden = false;
    modalGrid.hidden = true;
    modalError.hidden = true;
    modalGrid.innerHTML = '';
    var leader = getEffectiveLeader();
    fetch(getManifestUrl())
      .then(function (r) {
        if (!r.ok) throw new Error(r.status + ' ' + r.statusText);
        return r.json();
      })
      .then(function (data) {
        modalLoading.hidden = true;
        if (!data || !Array.isArray(data.templates)) {
          modalError.textContent = 'No templates found.';
          modalError.hidden = false;
          return;
        }
        var manifestBase = getManifestBaseUrl();
        data.templates.forEach(function (t) {
          var primaryPage = t.pages && t.pages[0];
          var relHref = primaryPage ? primaryPage.href : (t.id + '/');
          var href = (manifestBase ? new URL(relHref, manifestBase).href : relHref);
          href = appendLeaderToHref(href, leader);
          var li = document.createElement('li');
          li.className = 'template-modal__card';
          li.innerHTML =
            '<h3>' + escapeHtml(t.name) + '</h3>' +
            (t.description ? '<p>' + escapeHtml(t.description) + '</p>' : '') +
            '<a href="' + escapeAttr(href) + '" target="_blank" rel="noopener noreferrer">Open template →</a>';
          modalGrid.appendChild(li);
        });
        modalGrid.hidden = false;
      })
      .catch(function (err) {
        modalLoading.hidden = true;
        modalError.textContent = 'Could not load templates. ' + (err && err.message ? err.message : '');
        modalError.hidden = false;
      });
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }
  function escapeAttr(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  templateBtn.addEventListener('click', openModal);
  overlay.querySelector('.template-modal__close').addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeModal();
      closeAuthorPanel();
    }
  });

  document.addEventListener('click', function (e) {
    if (authorWrap.classList.contains('is-open') && !authorWrap.contains(e.target) && !overlay.contains(e.target)) closeAuthorPanel();
  });
})();
