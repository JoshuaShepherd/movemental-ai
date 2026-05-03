/* Deduped Argument Index — client-side filter/search.
 * Extends megapage.js behavior with a fourth filter: "merged" view
 * (merged | singleton | all) that toggles on data-size > 1.
 */
(function () {
  'use strict';

  var state = {
    category: '',
    strength: '',
    corpus: '',
    merged: '',
    search: '',
  };

  var cards = [];
  var catSections = [];
  var els = {};

  function init() {
    els.search = document.getElementById('search');
    els.clear = document.getElementById('clear');
    els.results = document.getElementById('results');
    els.showing = document.getElementById('stat-showing');
    els.total = document.getElementById('stat-total');
    els.empty = document.getElementById('empty');

    cards = Array.prototype.slice.call(document.querySelectorAll('.card'));
    catSections = Array.prototype.slice.call(document.querySelectorAll('.cat'));

    cards.forEach(function (card) {
      var title = (card.querySelector('.card__title') || {}).textContent || '';
      var body = (card.querySelector('.card__body') || {}).textContent || '';
      var tags = Array.prototype.map
        .call(card.querySelectorAll('.card__tags li'), function (t) { return t.textContent; })
        .join(' ');
      var question = (card.querySelector('.card__question') || {}).textContent || '';
      // Include alternate phrasings in the searchable haystack so merged
      // clusters match searches that hit any of their members.
      var alts = Array.prototype.map
        .call(card.querySelectorAll('.alt__list li'), function (li) { return li.textContent; })
        .join(' ');
      card.__haystack = (title + ' ' + body + ' ' + tags + ' ' + question + ' ' + alts).toLowerCase();
      card.__size = parseInt(card.getAttribute('data-size') || '1', 10);
    });

    els.total.textContent = cards.length;

    document.querySelectorAll('.chips').forEach(function (group) {
      var filter = group.getAttribute('data-filter');
      group.addEventListener('click', function (e) {
        var chip = e.target.closest('.chip');
        if (!chip) return;
        var value = chip.getAttribute('data-value') || '';
        state[filter] = value;
        group.querySelectorAll('.chip').forEach(function (c) {
          c.classList.toggle('is-on', c === chip);
        });
        apply();
      });
    });

    var searchDebounce = null;
    els.search.addEventListener('input', function () {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(function () {
        state.search = els.search.value.trim().toLowerCase();
        apply();
      }, 80);
    });

    els.clear.addEventListener('click', function () {
      state.category = '';
      state.strength = '';
      state.corpus = '';
      state.merged = '';
      state.search = '';
      els.search.value = '';
      document.querySelectorAll('.chips').forEach(function (group) {
        group.querySelectorAll('.chip').forEach(function (c) {
          c.classList.toggle('is-on', (c.getAttribute('data-value') || '') === '');
        });
      });
      apply();
    });

    apply();
  }

  function apply() {
    var shown = 0;
    var catCounts = {};

    cards.forEach(function (card) {
      var cat = card.getAttribute('data-category');
      var str = card.getAttribute('data-strength');
      var cor = card.getAttribute('data-corpus') || '';
      var size = card.__size;

      var matchCat = !state.category || state.category === cat;
      var matchStr = !state.strength || state.strength === str;
      // Corpus filter matches against any corpus in the space-separated attribute.
      var matchCor = !state.corpus || cor.indexOf(state.corpus) !== -1;
      var matchMerged =
        !state.merged ||
        (state.merged === 'merged' && size > 1) ||
        (state.merged === 'singleton' && size === 1);
      var matchSearch = !state.search || card.__haystack.indexOf(state.search) !== -1;

      var visible = matchCat && matchStr && matchCor && matchMerged && matchSearch;
      card.classList.toggle('is-hidden', !visible);

      if (visible) {
        shown += 1;
        catCounts[cat] = (catCounts[cat] || 0) + 1;
      }
    });

    catSections.forEach(function (section) {
      var cat = section.getAttribute('data-category');
      var n = catCounts[cat] || 0;
      section.classList.toggle('is-empty', n === 0);
      var countEl = section.querySelector('[data-count-for]');
      if (countEl) countEl.textContent = String(n);
    });

    document.querySelectorAll('[data-toc-for]').forEach(function (el) {
      var cat = el.getAttribute('data-toc-for');
      el.textContent = String(catCounts[cat] || 0);
    });

    els.showing.textContent = shown;
    if (els.empty) els.empty.classList.toggle('is-visible', shown === 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
