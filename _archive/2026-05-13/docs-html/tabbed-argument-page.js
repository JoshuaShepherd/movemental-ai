/* Tabbed argument page — simple tab switcher with keyboard + deep-linking. */
(function () {
  'use strict';

  function init() {
    var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
    var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));

    function activate(id, opts) {
      opts = opts || {};
      tabs.forEach(function (t) {
        var isOn = t.getAttribute('data-tab') === id;
        t.classList.toggle('is-active', isOn);
        t.setAttribute('aria-selected', isOn ? 'true' : 'false');
        if (isOn && opts.focus) t.focus();
      });
      panels.forEach(function (p) {
        p.classList.toggle('is-active', p.getAttribute('data-panel') === id);
      });
      if (opts.updateHash !== false) {
        history.replaceState(null, '', '#' + id);
      }
      if (opts.scroll) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        activate(tab.getAttribute('data-tab'), { scroll: false });
      });
      tab.addEventListener('keydown', function (e) {
        var idx = tabs.indexOf(tab);
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          activate(tabs[(idx + 1) % tabs.length].getAttribute('data-tab'), { focus: true });
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          activate(tabs[(idx - 1 + tabs.length) % tabs.length].getAttribute('data-tab'), { focus: true });
        } else if (e.key === 'Home') {
          e.preventDefault();
          activate(tabs[0].getAttribute('data-tab'), { focus: true });
        } else if (e.key === 'End') {
          e.preventDefault();
          activate(tabs[tabs.length - 1].getAttribute('data-tab'), { focus: true });
        }
      });
    });

    // Deep-linking: #home, #movement-leaders, etc.
    var initial = (location.hash || '').replace('#', '');
    if (initial && tabs.some(function (t) { return t.getAttribute('data-tab') === initial; })) {
      activate(initial, { updateHash: false });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
