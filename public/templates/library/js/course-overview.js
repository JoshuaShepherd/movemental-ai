/**
 * Course overview: builds outline from course.weeks and sets Start course link with ?course=.
 * Requires: #course-overview-outline, #course-overview-start-link.
 * Run after leader-content.js so course detail is already filled.
 */
(function () {
  function getQuery() {
    var s = typeof window !== "undefined" && window.location && window.location.search;
    if (!s) return {};
    return s.slice(1).split("&").filter(Boolean).reduce(function (acc, pair) {
      var i = pair.indexOf("=");
      var k = i >= 0 ? decodeURIComponent(pair.slice(0, i)).trim() : decodeURIComponent(pair);
      var v = i >= 0 ? decodeURIComponent(pair.slice(i + 1)).trim() : "";
      acc[k] = v;
      return acc;
    }, {});
  }

  function getJsonPath() {
    var script = document.querySelector('script[src*="leader-content.js"]');
    if (script && script.getAttribute("data-json")) return script.getAttribute("data-json");
    var leader = getQuery().leader;
    if (leader && ["alan-hirsch", "brad-brisco", "dave-ferguson"].indexOf(leader) >= 0)
      return "../data/" + leader + ".json";
    return "../data/alan-hirsch.json";
  }

  function escapeHtml(s) {
    if (s == null || s === "") return "";
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function renderOutline(container, weeks, courseSlug) {
    if (!container) return;
    if (!weeks || !weeks.length) {
      container.innerHTML = "<p class=\"course-overview-outline__empty\">No modules yet.</p>";
      return;
    }
    var baseUrl = "course-player.html?course=" + encodeURIComponent(courseSlug);
    var q = getQuery();
    if (q.leader) baseUrl += "&leader=" + encodeURIComponent(q.leader);
    var html = "";
    weeks.forEach(function (week, wi) {
      html += "<div class=\"course-overview-module\">";
      html += "<h3 class=\"course-overview-module__title\">" + escapeHtml(week.title || "Module " + (wi + 1)) + "</h3>";
      html += "<ul class=\"course-overview-module__lessons\">";
      (week.lessons || []).forEach(function (lesson) {
        var title = lesson.title || lesson.slug || "Lesson";
        html += "<li class=\"course-overview-module__lesson\">";
        html += "<span class=\"course-overview-module__lesson-icon\" aria-hidden=\"true\"></span>";
        html += "<span class=\"course-overview-module__lesson-title\">" + escapeHtml(title) + "</span>";
        html += "</li>";
      });
      html += "</ul></div>";
    });
    container.innerHTML = html;
  }

  function run(config) {
    var courseSlug = getQuery().course || (config.contentLibrary && config.contentLibrary.courses && config.contentLibrary.courses[0] && config.contentLibrary.courses[0].slug) || "mdna";
    var courses = config.contentLibrary && config.contentLibrary.courses;
    var course = courses && courses.find(function (c) { return c.slug === courseSlug; });
    if (!course) course = courses && courses[0];
    if (!course) return;

    var outlineEl = document.getElementById("course-overview-outline");
    var startLink = document.getElementById("course-overview-start-link");
    if (startLink) {
      var href = "course-player.html?course=" + encodeURIComponent(courseSlug);
      if (getQuery().leader) href += "&leader=" + encodeURIComponent(getQuery().leader);
      startLink.href = href;
    }
    renderOutline(outlineEl, course.weeks || [], courseSlug);
    var cardImg = document.querySelector('.course-overview-card__img');
    if (cardImg && course.heroImage) {
      cardImg.src = course.heroImage;
      cardImg.alt = (course.title || 'Course') + ' — course';
    }
  }

  var jsonPath = getJsonPath();
  var base = document.querySelector('script[src*="leader-content.js"]');
  var basePath = base && base.src ? base.src.replace(/\/[^/]*$/, "/") : "";
  var url = basePath ? new URL(jsonPath, basePath).href : jsonPath;
  fetch(url)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var config = data && data.contentLibrary ? data : { contentLibrary: { courses: (data && data.courses) || [] } };
      if (!config.contentLibrary.courses && data && data.courses) config.contentLibrary.courses = data.courses;
      run(config);
    })
    .catch(function () {});
})();
