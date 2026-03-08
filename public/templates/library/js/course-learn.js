/**
 * Course learn view: builds sidebar from course.weeks and renders lesson content.
 * Include on course-learn.html after leader-content.js. Requires:
 * - #course-learn-accordion (sidebar container)
 * - #lesson-content (article: .lesson-content__meta, .lesson-content__title, .lesson-content__body, .lesson-content__nav)
 * - Hash format: #w{weekIndex}-l{lessonIndex} (e.g. #w0-l0)
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
    if (leader && ["alan-hirsch", "brad-brisco", "dave-ferguson"].indexOf(leader) >= 0) {
      return "../data/" + leader + ".json";
    }
    return "../data/alan-hirsch.json";
  }

  function escapeHtml(s) {
    if (s == null || s === "") return "";
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function sectionLabel(key) {
    var labels = {
      video: "Video",
      _videoScript: "Video transcript",
      scripture: "Scripture",
      reading: "Reading",
      action: "Action",
      reflection: "Reflection",
      lookingAhead: "Looking ahead"
    };
    return labels[key] || key;
  }

  function textToParagraphs(t) {
    if (!t || typeof t !== "string") return "";
    var trimmed = t.trim();
    if (!trimmed) return "";
    return trimmed.split(/\n\n+/).map(function (p) {
      return "<p>" + escapeHtml(p.trim()).replace(/\n/g, "<br>") + "</p>";
    }).join("");
  }

  function buildFlatLessons(weeks) {
    var flat = [];
    weeks.forEach(function (week, wi) {
    (week.lessons || []).forEach(function (lesson, li) {
      flat.push({
        weekIndex: wi,
        weekTitle: week.title || ("Week " + (wi + 1)),
        lessonIndex: li,
        lesson: lesson,
        slug: lesson.slug || "lesson-" + wi + "-" + li
      });
    });
    });
    return flat;
  }

  function parseHash() {
    var hash = (window.location.hash || "").replace(/^#/, "");
    var m = /^w(\d+)-l(\d+)$/.exec(hash);
    if (m) return { weekIndex: parseInt(m[1], 10), lessonIndex: parseInt(m[2], 10) };
    return null;
  }

  function renderSidebar(accordionEl, weeks, courseSlug) {
    if (!accordionEl || !weeks || !weeks.length) return;
    var flat = buildFlatLessons(weeks);
    var baseUrl = "course-learn.html?course=" + encodeURIComponent(courseSlug);
    var q = getQuery();
    if (q.leader) baseUrl += "&leader=" + encodeURIComponent(q.leader);
    var html = "";
    weeks.forEach(function (week, wi) {
      var open = wi === 0 ? " open" : "";
      html += "<details class=\"course-learn-week\"" + open + "><summary class=\"course-learn-week__summary\">" + escapeHtml(week.title || "Week " + (wi + 1)) + "</summary><ul class=\"course-learn-lessons\">";
      (week.lessons || []).forEach(function (lesson, li) {
        var href = baseUrl + "#w" + wi + "-l" + li;
        var label = lesson.title || (lesson.slug ? lesson.slug.replace(/-/g, " ") : (wi + 1) + "." + (li + 1));
        html += "<li><a href=\"" + href + "\" class=\"course-learn-lesson\" data-week=\"" + wi + "\" data-lesson=\"" + li + "\">" + escapeHtml(label) + "</a></li>";
      });
      html += "</ul></details>";
    });
    accordionEl.innerHTML = html;
  }

  function renderLessonBody(bodyEl, lesson) {
    if (!bodyEl || !lesson || !lesson.sections) return;
    var sections = lesson.sections;
    var sectionOrder = ["video", "_videoScript", "scripture", "reading", "action", "reflection", "lookingAhead"];
    var html = "";
    sectionOrder.forEach(function (key) {
      var val = sections[key];
      if (val == null || (typeof val === "string" && val.trim() === "")) return;
      var label = sectionLabel(key);
      var content = typeof val === "string" ? textToParagraphs(val) : escapeHtml(JSON.stringify(val));
      html += "<section class=\"lesson-section lesson-section--" + escapeHtml(key) + "\"><h2 class=\"lesson-section__title\">" + escapeHtml(label) + "</h2><div class=\"lesson-section__body\">" + content + "</div></section>";
    });
    bodyEl.innerHTML = html || "<p>No content for this lesson.</p>";
  }

  function renderMain(flat, currentIndex, lessonContentEl) {
    if (!lessonContentEl || !flat || !flat.length) return;
    var idx = Math.max(0, Math.min(currentIndex, flat.length - 1));
    var cur = flat[idx];
    var meta = lessonContentEl.querySelector(".lesson-content__meta");
    var title = lessonContentEl.querySelector(".lesson-content__title");
    var body = lessonContentEl.querySelector(".lesson-content__body");
    var nav = lessonContentEl.querySelector(".lesson-content__nav");
    if (meta) meta.textContent = cur.weekTitle + " · Lesson " + (idx + 1) + " of " + flat.length;
    if (title) title.textContent = cur.lesson.title || cur.slug.replace(/-/g, " ");
    if (body) renderLessonBody(body, cur.lesson);
    if (nav) {
      var prevLink = nav.querySelector(".lesson-content__nav-link--prev");
      var nextLink = nav.querySelector(".lesson-content__nav-link--next");
      var courseSlug = getQuery().course || "mdna";
      var base = "course-learn.html?course=" + encodeURIComponent(courseSlug);
      if (getQuery().leader) base += "&leader=" + encodeURIComponent(getQuery().leader);
      var labelSel = ".lesson-content__nav-label";
      if (prevLink) {
        if (idx > 0) {
          prevLink.href = base + "#w" + flat[idx - 1].weekIndex + "-l" + flat[idx - 1].lessonIndex;
          var prevLabel = prevLink.querySelector(labelSel);
          if (prevLabel) prevLabel.textContent = "Previous: " + (flat[idx - 1].slug.replace(/-/g, " "));
          prevLink.style.display = "";
        } else {
          prevLink.href = "#";
          prevLink.style.display = "none";
        }
      }
      if (nextLink) {
        if (idx < flat.length - 1) {
          nextLink.href = base + "#w" + flat[idx + 1].weekIndex + "-l" + flat[idx + 1].lessonIndex;
          var nextLabel = nextLink.querySelector(labelSel);
          if (nextLabel) nextLabel.textContent = "Next: " + (flat[idx + 1].lesson.title || flat[idx + 1].slug.replace(/-/g, " "));
          nextLink.style.display = "";
        } else {
          nextLink.href = "#";
          nextLink.style.display = "none";
        }
      }
    }
    document.querySelectorAll("#course-learn-accordion .course-learn-lesson").forEach(function (a) {
      a.classList.remove("course-learn-lesson--active");
      var w = parseInt(a.getAttribute("data-week"), 10);
      var l = parseInt(a.getAttribute("data-lesson"), 10);
      if (cur.weekIndex === w && cur.lessonIndex === l) a.classList.add("course-learn-lesson--active");
    });
  }

  function run(config) {
    var courseSlug = getQuery().course || (config.contentLibrary && config.contentLibrary.courses && config.contentLibrary.courses[0] && config.contentLibrary.courses[0].slug) || "mdna";
    var courses = config.contentLibrary && config.contentLibrary.courses;
    var course = courses && courses.find(function (c) { return c.slug === courseSlug; });
    if (!course) course = courses && courses[0];
    if (!course || !course.weeks || !course.weeks.length) return;

    var accordionEl = document.getElementById("course-learn-accordion");
    var lessonContentEl = document.getElementById("lesson-content");
    if (!accordionEl || !lessonContentEl) return;

    var backLink = document.querySelector(".course-learn-sidebar__back");
    if (backLink) {
      var detailHref = "course-detail.html?course=" + encodeURIComponent(courseSlug);
      if (getQuery().leader) detailHref += "&leader=" + encodeURIComponent(getQuery().leader);
      backLink.href = detailHref;
    }

    renderSidebar(accordionEl, course.weeks, courseSlug);
    var flat = buildFlatLessons(course.weeks);
    var parsed = parseHash();
    var currentIndex = 0;
    if (parsed !== null) {
      var found = flat.findIndex(function (f) { return f.weekIndex === parsed.weekIndex && f.lessonIndex === parsed.lessonIndex; });
      if (found >= 0) currentIndex = found;
    } else if (flat.length) {
      window.location.replace("#w" + flat[0].weekIndex + "-l" + flat[0].lessonIndex);
    }
    renderMain(flat, currentIndex, lessonContentEl);

    function onHashChange() {
      var p = parseHash();
      if (p === null) return;
      var idx = flat.findIndex(function (f) { return f.weekIndex === p.weekIndex && f.lessonIndex === p.lessonIndex; });
      if (idx >= 0) renderMain(flat, idx, lessonContentEl);
    }
    window.addEventListener("hashchange", onHashChange);

    accordionEl.addEventListener("click", function (e) {
      var a = e.target.closest("a[data-week][data-lesson]");
      if (!a) return;
      e.preventDefault();
      var w = a.getAttribute("data-week");
      var l = a.getAttribute("data-lesson");
      window.location.hash = "w" + w + "-l" + l;
      var idx = flat.findIndex(function (f) { return String(f.weekIndex) === w && String(f.lessonIndex) === l; });
      if (idx >= 0) renderMain(flat, idx, lessonContentEl);
    });
  }

  var jsonPath = getJsonPath();
  var base = document.querySelector('script[src*="leader-content.js"]');
  var basePath = "";
  if (base && base.src) {
    basePath = base.src.replace(/\/[^/]*$/, "/");
  }
  var url = basePath ? new URL(jsonPath, basePath).href : jsonPath;
  fetch(url)
    .then(function (r) { return r.json(); })
    .then(run)
    .catch(function () {});
})();
