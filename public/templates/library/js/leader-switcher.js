/**
 * Single bottom-left floater: Templates — opens modal with design-mode cards and "View as" person selector inside.
 * Styled like launcher (sage, scarlet); floater is highlighted so it stands out.
 */
(function () {
  var LEADER_STORAGE_KEY = 'launcher-leader';
  var VALID_LEADERS = [
    { value: 'alan-hirsch', label: 'Alan Hirsch' },
    { value: 'brad-brisco', label: 'Brad Brisco' },
    { value: 'dave-ferguson', label: 'Dave Ferguson' }
  ];

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
  function appendLeaderToHref(href, leader) {
    if (!href || !leader) return href;
    var sep = href.indexOf('?') >= 0 ? '&' : '?';
    return href + sep + 'leader=' + encodeURIComponent(leader);
  }

  var MANIFEST_URL = (function () {
    var script = document.currentScript;
    if (script && script.src) {
      var base = script.src.replace(/\/[^/]*$/, '/');
      return base + '../templates-manifest.json';
    }
    return '';
  })();
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
    '#leader-floaters-wrap { position: fixed; bottom: 20px; left: 20px; z-index: 99999; display: flex; align-items: center; gap: 10px; font-family: Inter, system-ui, -apple-system, sans-serif; font-size: 14px; }',
    '#leader-floaters-wrap .floater-btn { width: 52px; height: 52px; border-radius: 50%; border: 2px solid ' + scarlet400 + '; background: ' + sage950 + '; color: ' + textOnDark + '; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(0,0,0,0.4), 0 0 0 3px rgba(203, 52, 55, 0.25); transition: border-color 0.2s, background 0.2s, box-shadow 0.2s; flex-shrink: 0; }',
    '#leader-floaters-wrap .floater-btn:hover { border-color: ' + scarlet500 + '; background: ' + sage900 + '; box-shadow: 0 6px 20px rgba(0,0,0,0.45), 0 0 0 3px rgba(203, 52, 55, 0.35); }',
    '#leader-floaters-wrap .floater-btn:focus { outline: 2px solid ' + scarlet500 + '; outline-offset: 2px; }',
    '#leader-floaters-wrap .floater-btn svg { width: 26px; height: 26px; }',
    '#leader-floaters-wrap .floater-label { font-size: 13px; font-weight: 600; color: ' + textOnDark + '; text-shadow: 0 1px 2px rgba(0,0,0,0.3); padding: 6px 12px; background: ' + sage900 + '; border: 1px solid ' + borderDark + '; border-radius: ' + radiusSm + '; white-space: nowrap; }',
    '#template-modal-overlay { position: fixed; inset: 0; background: rgba(15,20,15,0.85); backdrop-filter: blur(8px); z-index: 100000; display: none; align-items: center; justify-content: center; padding: 24px; }',
    '#template-modal-overlay.is-open { display: flex; }',
    '#template-modal { background: ' + sage950 + '; border: 1px solid ' + borderDark + '; border-radius: ' + radiusLg + '; box-shadow: 0 24px 48px rgba(0,0,0,0.5); max-width: 720px; width: 100%; max-height: 85vh; overflow: hidden; display: flex; flex-direction: column; }',
    '#template-modal .template-modal__head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 24px 24px 0; }',
    '#template-modal .template-modal__title { font-family: Playfair Display, Georgia, serif; font-size: 1.5rem; font-weight: 600; color: ' + textOnDark + '; margin: 0; letter-spacing: -0.02em; }',
    '#template-modal .template-modal__close { width: 40px; height: 40px; border: none; border-radius: ' + radiusSm + '; background: rgba(255,255,255,0.08); color: ' + textOnDark + '; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.2s; flex-shrink: 0; }',
    '#template-modal .template-modal__close:hover { background: rgba(255,255,255,0.15); }',
    '#template-modal .template-modal__view-as { display: flex; align-items: center; gap: 10px; padding: 16px 24px; margin-top: 12px; border-top: 1px solid ' + borderDark + '; flex-wrap: wrap; }',
    '#template-modal .template-modal__view-as-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: ' + textMuted + '; margin: 0; }',
    '#template-modal .template-modal__view-as-btns { display: flex; gap: 8px; flex-wrap: wrap; }',
    '#template-modal .template-modal__view-as-btn { padding: 8px 14px; border: 1px solid ' + borderDark + '; border-radius: ' + radiusSm + '; background: rgba(255,255,255,0.04); color: ' + textOnDark + '; font-size: 13px; cursor: pointer; transition: border-color 0.2s, background 0.2s; }',
    '#template-modal .template-modal__view-as-btn:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.25); }',
    '#template-modal .template-modal__view-as-btn.is-selected { background: rgba(203, 52, 55, 0.25); border-color: ' + scarlet400 + '; color: #fca5a5; }',
    '#template-modal .template-modal__subtitle { color: ' + textMuted + '; font-size: 0.9375rem; line-height: 1.5; margin: 0; padding: 0 24px 16px; }',
    '#template-modal .template-modal__scroll { overflow-y: auto; padding: 0 24px 24px; }',
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

  var wrap = document.createElement('div');
  wrap.id = 'leader-floaters-wrap';

  var templateBtn = document.createElement('button');
  templateBtn.type = 'button';
  templateBtn.className = 'floater-btn';
  templateBtn.setAttribute('aria-label', 'Templates — choose design mode and view as');
  templateBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 14a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 14a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/></svg>';
  wrap.appendChild(templateBtn);
  var label = document.createElement('span');
  label.className = 'floater-label';
  label.textContent = 'Templates';
  wrap.appendChild(label);

  document.body.appendChild(wrap);

  // —— Modal (theme + View as inside) ——
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
    '<div class="template-modal__view-as">' +
      '<span class="template-modal__view-as-label">View as</span>' +
      '<div class="template-modal__view-as-btns" id="template-modal-view-as-btns"></div>' +
    '</div>' +
    '<p class="template-modal__subtitle">Each mode includes home, content hub, books, courses, and more. Open a template to preview.</p>' +
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
  var viewAsBtns = document.getElementById('template-modal-view-as-btns');

  function getModalLeader() {
    var selected = viewAsBtns && viewAsBtns.querySelector('.template-modal__view-as-btn.is-selected');
    if (selected) return selected.getAttribute('data-leader');
    return getEffectiveLeader();
  }
  function setModalLeader(leader) {
    try { localStorage.setItem(LEADER_STORAGE_KEY, leader); } catch (e) {}
    if (viewAsBtns) {
      viewAsBtns.querySelectorAll('.template-modal__view-as-btn').forEach(function (btn) {
        btn.classList.toggle('is-selected', btn.getAttribute('data-leader') === leader);
      });
    }
  }
  function buildViewAsButtons() {
    if (!viewAsBtns) return;
    viewAsBtns.innerHTML = '';
    var current = getEffectiveLeader();
    VALID_LEADERS.forEach(function (o) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'template-modal__view-as-btn' + (o.value === current ? ' is-selected' : '');
      btn.setAttribute('data-leader', o.value);
      btn.textContent = o.label;
      btn.addEventListener('click', function () {
        setModalLeader(o.value);
        loadTemplatesIntoModal();
      });
      viewAsBtns.appendChild(btn);
    });
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
  }
  function openModal() {
    buildViewAsButtons();
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    loadTemplatesIntoModal();
  }

  function loadTemplatesIntoModal() {
    modalLoading.hidden = false;
    modalGrid.hidden = true;
    modalError.hidden = true;
    modalGrid.innerHTML = '';
    var leader = getModalLeader();
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
            '<a href="' + escapeAttr(href) + '">Open template →</a>';
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
    if (e.key === 'Escape') closeModal();
  });
})();
