/**
 * Leader content loader for HTML prototypes.
 * Fetches leader JSON and fills elements with data-leader and data-leader-list.
 * Include after main.js: <script src="../js/leader-content.js" data-json="../data/alan-hirsch.json"></script>
 *
 * Author (leader) can be overridden via URL: ?leader=alan-hirsch | brad-brisco | dave-ferguson
 */
(function () {
  var script = document.currentScript;
  var VALID_LEADERS = ['alan-hirsch', 'brad-brisco', 'dave-ferguson'];
  var defaultPath = (script && script.getAttribute('data-json')) || '../data/alan-hirsch.json';

  var leaderParam = (function () {
    if (typeof window === 'undefined' || !window.location || !window.location.search) return null;
    var m = window.location.search.slice(1).split('&').filter(Boolean).reduce(function (acc, pair) {
      var i = pair.indexOf('=');
      if (i >= 0) acc[decodeURIComponent(pair.slice(0, i)).trim()] = decodeURIComponent(pair.slice(i + 1)).trim();
      return acc;
    }, {});
    var leader = m.leader;
    return leader && VALID_LEADERS.indexOf(leader) >= 0 ? leader : null;
  })();

  var jsonPath = leaderParam ? '../data/' + leaderParam + '.json' : defaultPath;

  /** Load sticky bottom-left author switcher so user can change leader on any template page. */
  (function () {
    var script = document.currentScript;
    var src = script && script.src;
    if (src && typeof document !== 'undefined' && document.body) {
      var base = src.replace(/\/[^/]*$/, '/');
      var s = document.createElement('script');
      s.src = base + 'leader-switcher.js';
      s.async = false;
      document.body.appendChild(s);
    }
  })();

  /** When ?leader= is present, append it to same-page relative links so internal nav keeps the author. */
  function preserveLeaderParamOnLinks() {
    if (!leaderParam || typeof document === 'undefined') return;
    var param = 'leader=' + encodeURIComponent(leaderParam);
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || href === '#' || href.indexOf('leader=') >= 0) return;
      if (/^(https?:|\/\/|\/)/.test(href)) return;
      var sep = href.indexOf('?') >= 0 ? '&' : '?';
      a.setAttribute('href', href + sep + param);
    });
  }
  preserveLeaderParamOnLinks();

  function getByPath(obj, path) {
    if (!obj || path === undefined || path === null) return undefined;
    var parts = String(path).split('.');
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return undefined;
      var key = parts[i];
      cur = cur[key];
    }
    return cur;
  }

  function setElementValue(el, value, altPath, config) {
    if (value === undefined || value === null) return;
    if (el.tagName === 'IMG') {
      el.src = value;
      var alt = altPath ? getByPath(config, altPath) : (config.hero && config.hero.imageAlt);
      if (alt) el.alt = alt;
    } else if (el.tagName === 'A' && typeof value === 'object' && value !== null && ('label' in value || 'href' in value)) {
      if (value.label !== undefined) el.textContent = value.label;
      if (value.href !== undefined) el.href = value.href;
    } else if (typeof value === 'string' || typeof value === 'number') {
      el.textContent = value;
    }
  }

  function applyBackgroundImages(config) {
    document.querySelectorAll('[data-leader-bg]').forEach(function (el) {
      var path = el.getAttribute('data-leader-bg');
      var value = getByPath(config, path);
      if (value && typeof value === 'string') {
        el.style.backgroundImage = 'url(' + value + ')';
      }
    });
  }

  function applyScalars(config) {
    document.querySelectorAll('[data-leader]').forEach(function (el) {
      var path = el.getAttribute('data-leader');
      var value = getByPath(config, path);
      var altPath = el.getAttribute('data-leader-alt');
      setElementValue(el, value, altPath, config);
    });
    document.querySelectorAll('[data-leader-placeholder]').forEach(function (el) {
      var path = el.getAttribute('data-leader-placeholder');
      var value = getByPath(config, path);
      if (value != null) el.placeholder = value;
    });
  }

  function applyLists(config) {
    document.querySelectorAll('[data-leader-list]').forEach(function (container) {
      var listPath = container.getAttribute('data-leader-list');
      var items = getByPath(config, listPath);
      if (!Array.isArray(items) || items.length === 0) return;
      var excludeSlug = container.getAttribute('data-leader-list-exclude');
      if (listPath === 'books') {
        if (!excludeSlug) {
          var m = /[?&]book=([^&]+)/.exec(window.location.search);
          excludeSlug = (m && m[1]) || '';
        }
        if (excludeSlug) {
          items = items.filter(function (b) { return b.slug !== excludeSlug; });
          items = items.slice(0, 4);
        }
      }
      if (listPath === 'contentLibrary.videos') {
        if (!excludeSlug) {
          var vm = /[?&]slug=([^&]+)/.exec(window.location.search);
          excludeSlug = (vm && vm[1]) || '';
        }
        if (excludeSlug) items = items.filter(function (v) { return v.slug !== excludeSlug; });
        items = items.slice(0, 4);
      }
      if (listPath === 'contentLibrary.podcasts') {
        if (!excludeSlug) {
          var pm = /[?&]slug=([^&]+)/.exec(window.location.search);
          excludeSlug = (pm && pm[1]) || '';
        }
        if (excludeSlug) items = items.filter(function (p) { return p.slug !== excludeSlug; });
        items = items.slice(0, 4);
      }
      var template = container.querySelector('[data-leader-item-template]') || container.querySelector('.theme-card, .book-card, .content-card, .library-card') || container.firstElementChild;
      if (!template) return;
      var isTemplate = template.hasAttribute('data-leader-item-template');
      var fragment = document.createDocumentFragment();
      items.forEach(function (item, index) {
        var clone = template.cloneNode(true);
        clone.removeAttribute('data-leader-item-template');
        var filterType = item.theme || (item.themes && item.themes[0]) || item.slug;
        if (filterType) clone.setAttribute('data-type', filterType);
        if (listPath === 'contentLibrary.articles' && item.slug && clone.tagName === 'A') {
          clone.href = 'article-detail.html?slug=' + encodeURIComponent(item.slug);
        }
        if (listPath === 'contentLibrary.podcasts' && item.slug && clone.tagName === 'A') {
          clone.href = 'podcast-detail.html?slug=' + encodeURIComponent(item.slug);
        }
        if (listPath === 'contentLibrary.videos' && item.slug && clone.tagName === 'A') {
          clone.href = 'video-detail.html?slug=' + encodeURIComponent(item.slug);
        }
        if (listPath === 'contentLibrary.courses' && item.slug && clone.tagName === 'A') {
          clone.href = 'course-detail.html?course=' + encodeURIComponent(item.slug);
        }
        if (listPath === 'books' && item.slug && clone.tagName === 'A') {
          clone.href = 'book-detail.html?book=' + encodeURIComponent(item.slug);
        }
        if (listPath === 'themes' && item.slug && clone.tagName === 'A') {
          clone.href = 'theme-detail.html?theme=' + encodeURIComponent(item.slug);
          if (leaderParam) clone.href += '&leader=' + encodeURIComponent(leaderParam);
        }
        if (listPath === 'themes' && config.art && Array.isArray(config.art.all) && config.art.all.length > 0) {
          var img = clone.querySelector('.theme-card__img img, [data-leader-item="image"]');
          if (img && img.tagName === 'IMG') {
            img.src = config.art.all[index % config.art.all.length];
            img.alt = (item.title || 'Theme') + ' — theme';
          }
        }
        clone.querySelectorAll('[data-leader-item]').forEach(function (field) {
          var key = field.getAttribute('data-leader-item');
          var val = item[key];
          if (val === undefined && key === 'themeLabel') val = item.themeLabel || (item.themeLabels && item.themeLabels[0]);
          if (field.tagName === 'IMG') {
            if (key === 'cover' && val) {
              field.src = val;
              field.alt = item.coverAlt || item.title + ' cover';
            } else if (key === 'heroImage' && val) {
              field.src = val;
              field.alt = (item.title || 'Course') + ' — course';
              field.setAttribute('data-filled', 'true');
            } else if (key === 'artwork' && val) {
              field.src = val;
              field.alt = (item.title || 'Podcast') + ' — podcast artwork';
              field.setAttribute('data-filled', 'true');
            } else if (key === 'featuredImage' && val) {
              field.src = val;
              field.alt = (item.title || 'Article') + ' — featured';
              field.setAttribute('data-filled', 'true');
            }
          } else if (val !== undefined && val !== null) {
            field.textContent = val;
          }
        });
        fragment.appendChild(clone);
      });
      if (isTemplate) {
        container.innerHTML = '';
      } else {
        template.remove();
      }
      container.appendChild(fragment);
    });
  }

  function applyBookDetail(config) {
    var bookSlug = (function () {
      var m = /[?&]book=([^&]+)/.exec(window.location.search);
      if (m && m[1]) return m[1];
      var books = config.books;
      return (books && books[0] && books[0].slug) || 'reframation';
    })();
    var book = config.books && config.books.find(function (b) { return b.slug === bookSlug; });
    if (!book) return;
    document.querySelectorAll('[data-leader-book]').forEach(function (el) {
      var key = el.getAttribute('data-leader-book');
      var value = book[key];
      if (key === 'longDescription' && Array.isArray(value)) {
        value = value.map(function (p) { return '<p>' + escapeHtml(p) + '</p>'; }).join('');
        el.innerHTML = value;
        return;
      }
      if (key === 'themeLabels' && Array.isArray(value)) {
        el.textContent = value.join(', ');
        return;
      }
      if (el.tagName === 'IMG') {
        if (key === 'cover') { el.src = book.cover; el.alt = book.coverAlt || book.title + ' cover'; }
        if (key === 'authorImage') { el.src = config.portrait.headshot; el.alt = config.portrait.headshotAlt; }
      } else if (value !== undefined && value !== null) {
        el.textContent = value;
      }
    });
    var badgesContainer = document.querySelector('[data-leader-book-badges]');
    if (badgesContainer && (book.themeLabels || book.themeLabel)) {
      var labels = book.themeLabels || [book.themeLabel];
      badgesContainer.innerHTML = labels.map(function (l) { return '<span class="badge badge--theme">' + escapeHtml(l) + '</span>'; }).join('');
    }
    var readerLink = document.getElementById('book-reader-link');
    if (readerLink) readerLink.href = 'book-reader.html?book=' + encodeURIComponent(bookSlug);
    var readerBack = document.querySelector('a.book-reader__back');
    if (readerBack) readerBack.href = 'book-detail.html?book=' + encodeURIComponent(bookSlug);
    if (config.name && book.title) document.title = book.title + ' — ' + config.name;
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function applyCourseDetail(config) {
    var courseSlug = (function () {
      var m = /[?&]course=([^&]+)/.exec(window.location.search);
      if (m && m[1]) return m[1];
      var courses = config.contentLibrary && config.contentLibrary.courses;
      return (courses && courses[0] && courses[0].slug) ? courses[0].slug : '';
    })();
    var courses = config.contentLibrary && config.contentLibrary.courses;
    var course = courses && courses.find(function (c) { return c.slug === courseSlug; });
    if (!course) course = courses && courses[0];
    if (!course) return;
    document.querySelectorAll('[data-leader-course]').forEach(function (el) {
      var key = el.getAttribute('data-leader-course');
      var value = course[key];
      if (el.tagName === 'IMG') {
        if (value) { el.src = value; el.alt = course.title + ' image'; }
      } else if (value !== undefined && value !== null) {
        el.textContent = value;
      }
    });
    var badgesContainer = document.querySelector('[data-leader-course-badges]');
    if (badgesContainer && (course.themeLabel || course.theme)) {
      var label = course.themeLabel || (config.themes && config.themes.find(function (t) { return t.slug === course.theme; }) && config.themes.find(function (t) { return t.slug === course.theme; }).title);
      if (label) badgesContainer.innerHTML = '<span class="badge badge--theme">' + escapeHtml(label) + '</span>';
    }
    var promoSection = document.getElementById('course-detail-promo');
    if (promoSection && !course.promoTitle && !course.promoBody) promoSection.style.display = 'none';
    var promoMedia = document.querySelector('.course-detail__promo-media');
    if (promoMedia && !course.promoImage) promoMedia.style.display = 'none';
    if (course.heroImage) {
      var heroImg = document.querySelector('.course-detail__media .course-detail__instructor-img');
      if (heroImg) { heroImg.src = course.heroImage; heroImg.alt = (course.title || 'Course') + ' — course hero'; }
    }
  }

  function applyVideoDetail(config) {
    var videos = config.contentLibrary && config.contentLibrary.videos;
    if (!Array.isArray(videos) || videos.length === 0) return;
    var videoSlug = (function () {
      var m = /[?&]slug=([^&]+)/.exec(window.location.search);
      if (m && m[1]) return m[1];
      return videos[0].slug;
    })();
    var video = videos.find(function (v) { return v.slug === videoSlug; }) || videos[0];
    document.querySelectorAll('[data-leader-video]').forEach(function (el) {
      var key = el.getAttribute('data-leader-video');
      var value = video[key];
      if (value !== undefined && value !== null) el.textContent = value;
    });
    var badgesContainer = document.querySelector('[data-leader-video-badges]');
    if (badgesContainer && (video.themeLabel || video.theme)) {
      var label = video.themeLabel || (config.themes && config.themes.find(function (t) { return t.slug === video.theme; }) && config.themes.find(function (t) { return t.slug === video.theme; }).title);
      if (label) badgesContainer.innerHTML = '<span class="badge badge--theme">' + escapeHtml(label) + '</span>';
    }
  }

  function applyPodcastDetail(config) {
    var podcasts = config.contentLibrary && config.contentLibrary.podcasts;
    if (!Array.isArray(podcasts) || podcasts.length === 0) return;
    var podcastSlug = (function () {
      var m = /[?&]slug=([^&]+)/.exec(window.location.search);
      if (m && m[1]) return m[1];
      return podcasts[0].slug;
    })();
    var podcast = podcasts.find(function (p) { return p.slug === podcastSlug; }) || podcasts[0];
    document.querySelectorAll('[data-leader-podcast]').forEach(function (el) {
      var key = el.getAttribute('data-leader-podcast');
      var value = podcast[key];
      if (el.tagName === 'IMG') {
        if (key === 'artwork' && value) {
          el.src = value;
          el.alt = (podcast.title || 'Podcast') + ' — artwork';
          el.setAttribute('data-filled', 'true');
        }
      } else if (value !== undefined && value !== null) {
        el.textContent = value;
      }
    });
    var badgesContainer = document.querySelector('[data-leader-podcast-badges]');
    if (badgesContainer && (podcast.themeLabel || podcast.theme)) {
      var label = podcast.themeLabel || (config.themes && config.themes.find(function (t) { return t.slug === podcast.theme; }) && config.themes.find(function (t) { return t.slug === podcast.theme; }).title);
      if (label) badgesContainer.innerHTML = '<span class="badge badge--theme">' + escapeHtml(label) + '</span>';
    }
  }

  function applyDocumentTitle(config) {
    var key = document.body.getAttribute('data-leader-title');
    if (!key) return;
    var title = getByPath(config, key);
    if (title) document.title = title;
  }

  /** Theme detail page: read ?theme=slug, fill [data-leader-theme] and optional page title. */
  function applyThemeDetail(config) {
    var m = /[?&]theme=([^&]+)/.exec(window.location.search);
    var slug = m ? decodeURIComponent(m[1]) : '';
    var themes = config.themes;
    if (!Array.isArray(themes) || themes.length === 0) return;
    var theme = themes.find(function (t) { return t.slug === slug; }) || themes[0];
    document.querySelectorAll('[data-leader-theme]').forEach(function (el) {
      var key = el.getAttribute('data-leader-theme');
      var val = theme[key];
      if (el.tagName === 'IMG' && key === 'image' && val) {
        el.src = val;
        el.alt = (theme.title || 'Theme') + ' — theme';
      } else if (val !== undefined && val !== null) {
        el.textContent = val;
      }
    });
    var titleEl = document.body.getAttribute('data-leader-theme-title');
    if (titleEl === 'true' || titleEl === '') {
      document.title = (theme.title || 'Theme') + ' — ' + (config.name || '');
    }
  }

  /** Validate required top-level keys. Logs warnings for missing keys. Align with _docs/type/ and leader-config.schema.json (13 keys). */
  function validateConfig(config) {
    var required = ['id', 'name', 'tagline', 'hero', 'portrait', 'themes', 'contentLibrary', 'libraryCards', 'books', 'pageTitles', 'pageCopy', 'art', 'images'];
    var missing = required.filter(function (k) { return !(k in config); });
    if (missing.length > 0) {
      console.warn('[leader-content] Missing required keys in config:', missing.join(', '));
    }
    if (config.hero && !config.hero.title) {
      console.warn('[leader-content] config.hero.title is missing');
    }
    if (config.contentLibrary) {
      ['articles', 'courses', 'podcasts', 'videos'].forEach(function (k) {
        if (!Array.isArray(config.contentLibrary[k])) {
          console.warn('[leader-content] config.contentLibrary.' + k + ' should be an array');
        }
      });
    }
    return missing.length === 0;
  }

  function run(config) {
    validateConfig(config);
    if (config.id && document.body) document.body.setAttribute('data-leader-id', config.id);
    applyScalars(config);
    applyBackgroundImages(config);
    applyLists(config);
    applyBookDetail(config);
    applyCourseDetail(config);
    applyVideoDetail(config);
    applyPodcastDetail(config);
    applyDocumentTitle(config);
    applyThemeDetail(config);
  }

  fetch(jsonPath)
    .then(function (r) { return r.json(); })
    .then(run)
    .catch(function (err) { console.warn('Leader content failed to load:', err); });
})();
