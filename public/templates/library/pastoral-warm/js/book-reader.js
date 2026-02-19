/**
 * Pastoral-warm book reader: loads manifest and section HTML from content/books/
 * (built by scripts/build-pastoral-warm-books.mjs from _docs/themes-content/mdx).
 * Requires ?book=<slug>; optional ?section=<slug> (defaults to first section).
 */
(function () {
  var contentBase = 'content/books';
  var manifestUrl = contentBase + '/manifest.json';

  function getQuery() {
    var q = {};
    if (typeof window === 'undefined' || !window.location || !window.location.search) return q;
    window.location.search.slice(1).split('&').filter(Boolean).forEach(function (pair) {
      var i = pair.indexOf('=');
      if (i >= 0) q[decodeURIComponent(pair.slice(0, i)).trim()] = decodeURIComponent(pair.slice(i + 1)).trim();
    });
    return q;
  }

  function buildReaderUrl(bookSlug, sectionSlug) {
    var base = 'book-reader.html?book=' + encodeURIComponent(bookSlug);
    if (sectionSlug) base += '&section=' + encodeURIComponent(sectionSlug);
    return base;
  }

  function renderSidebar(book, currentSectionSlug) {
    var ol = document.querySelector('.book-reader__chapters');
    if (!ol) return;
    ol.innerHTML = '';
    var sections = book.sections || [];
    sections.forEach(function (sec, index) {
      var li = document.createElement('li');
      var btn = document.createElement('button');
      btn.className = 'book-reader__chapter' + (sec.slug === currentSectionSlug ? ' is-active' : '');
      btn.type = 'button';
      btn.setAttribute('data-section-slug', sec.slug);
      var num = document.createElement('span');
      num.className = 'book-reader__chapter-num';
      num.textContent = sec.type === 'chapter' && sec.order > 0 ? 'Chapter ' + sec.order : (sec.type || 'Section');
      btn.appendChild(num);
      btn.appendChild(document.createTextNode(' ' + (sec.title || sec.slug)));
      li.appendChild(btn);
      ol.appendChild(li);
    });
  }

  function setProse(html) {
    var el = document.querySelector('.book-reader__prose');
    if (!el) return;
    el.innerHTML = html || '<p>This section could not be loaded.</p>';
  }

  function setPlaceholder(message) {
    var el = document.querySelector('.book-reader__prose');
    if (!el) return;
    el.innerHTML = '<p class="book-reader__placeholder">' + (message || 'Select a chapter.') + '</p>';
  }

  function setChapterHeading(section) {
    var eyebrow = document.querySelector('.book-reader__chapter-eyebrow');
    var heading = document.querySelector('.book-reader__chapter-heading');
    if (eyebrow) eyebrow.textContent = section.type === 'chapter' && section.order > 0 ? 'Chapter ' + section.order : (section.type || '');
    if (heading) heading.textContent = section.title || section.slug;
  }

  function updateNav(book, currentIndex) {
    var sections = book.sections || [];
    var nav = document.querySelector('.book-reader__nav');
    if (!nav) return;
    var prevLink = nav.querySelector('[rel="prev"]') || nav.querySelector('.book-reader__nav-btn:first-child');
    var nextLink = nav.querySelector('.book-reader__nav-btn:not([rel="prev"])') || nav.querySelector('.book-reader__nav-btn:last-child');
    var prevSec = currentIndex > 0 ? sections[currentIndex - 1] : null;
    var nextSec = currentIndex >= 0 && currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
    if (prevLink && prevSec) {
      prevLink.href = buildReaderUrl(book.slug, prevSec.slug);
      prevLink.textContent = prevSec.title || prevSec.slug;
      prevLink.style.display = '';
    } else if (prevLink) prevLink.style.display = 'none';
    if (nextLink && nextSec) {
      nextLink.href = buildReaderUrl(book.slug, nextSec.slug);
      nextLink.innerHTML = (nextSec.title || nextSec.slug) + ' <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>';
      nextLink.style.display = '';
    } else if (nextLink) nextLink.style.display = 'none';
  }

  function updateProgress(currentIndex, total) {
    var bar = document.querySelector('.book-reader__progress-bar');
    if (!bar || total <= 0) return;
    var pct = Math.round(((currentIndex + 1) / total) * 100);
    bar.style.width = pct + '%';
  }

  function wireSidebarClicks(book) {
    document.querySelector('.book-reader__chapters') && document.querySelector('.book-reader__chapters').addEventListener('click', function (e) {
      var btn = e.target && e.target.closest && e.target.closest('button[data-section-slug]');
      if (!btn) return;
      var slug = btn.getAttribute('data-section-slug');
      if (slug) window.location.href = buildReaderUrl(book.slug, slug);
    });
  }

  fetch(manifestUrl)
    .then(function (r) { return r.ok ? r.json() : Promise.reject(new Error('Manifest not found')); })
    .then(function (manifest) {
      var q = getQuery();
      var bookSlug = q.book;
      if (!bookSlug) {
        setPlaceholder('No book specified. Open a book from the <a href="books.html">Books</a> page.');
        return;
      }
      var books = manifest.books || [];
      var book = books.find(function (b) { return b.slug === bookSlug; });
      if (!book) {
        setPlaceholder('This book is not yet available to read online.');
        return;
      }
      var sections = book.sections || [];
      var sectionSlug = q.section || (sections[0] && sections[0].slug);
      var currentIndex = sections.findIndex(function (s) { return s.slug === sectionSlug; });
      if (currentIndex < 0) currentIndex = 0;
      var section = sections[currentIndex];
      if (!section) {
        setPlaceholder('No sections found for this book.');
        return;
      }

      document.querySelector('.book-reader__book-title') && (document.querySelector('.book-reader__book-title').textContent = book.title);
      var backLink = document.querySelector('a.book-reader__back');
      if (backLink) backLink.href = 'book-detail.html?book=' + encodeURIComponent(bookSlug);

      renderSidebar(book, section.slug);
      setChapterHeading(section);
      updateNav(book, currentIndex);
      updateProgress(currentIndex, sections.length);
      wireSidebarClicks(book);

      return fetch(contentBase + '/' + encodeURIComponent(book.slug) + '/' + encodeURIComponent(section.slug) + '.html')
        .then(function (r) { return r.ok ? r.text() : Promise.reject(new Error('Section not found')); })
        .then(function (html) { setProse(html); })
        .catch(function () { setProse('<p>This section could not be loaded.</p>'); });
    })
    .catch(function (err) {
      setPlaceholder('Content could not be loaded. Run <code>npm run template:build-pastoral-warm-books</code> to build book content.');
    });
})();
