/**
 * Course player: video-left, outline-right layout. Populates from leader JSON course.weeks/lessons.
 * Requires: #course-player-outline, #course-player-poster, #course-player-poster-title, #course-player-poster-badge,
 * #course-player-video, #course-player-play-btn, #course-player-lesson-title, #course-player-lesson-excerpt,
 * #course-player-back, #course-player-sidebar-title, #course-player-lights-off.
 * Hash: #w{weekIndex}-l{lessonIndex}
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

  /** Placeholder durations for lessons (e.g. "1:51", "4:12") when not in JSON */
  function lessonDuration(weekIndex, lessonIndex) {
    if (weekIndex === 0 && lessonIndex === 0) return "1:51";
    return "4:12";
  }

  function buildFlatLessons(weeks) {
    var flat = [];
    weeks.forEach(function (week, wi) {
      (week.lessons || []).forEach(function (lesson, li) {
        flat.push({
          weekIndex: wi,
          weekTitle: week.title || ("Chapter " + (wi + 1)),
          lessonIndex: li,
          lesson: lesson,
          slug: lesson.slug || "lesson-" + wi + "-" + li,
          duration: lesson.duration || lessonDuration(wi, li)
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

  function firstLineOrExcerpt(lesson, maxLen) {
    var s = "";
    if (lesson.sections) {
      s = lesson.sections._videoScript || lesson.sections.reading || lesson.sections.reflection || "";
    }
    if (!s || typeof s !== "string") return "No description for this lesson.";
    s = s.trim().replace(/\s+/g, " ");
    if (s.length <= (maxLen || 180)) return s;
    return s.slice(0, maxLen || 180).trim() + "…";
  }

  function renderOutline(outlineEl, weeks, courseSlug, currentFlatIndex, flat) {
    if (!outlineEl || !weeks || !weeks.length) return;
    var baseUrl = "course-player.html?course=" + encodeURIComponent(courseSlug);
    var q = getQuery();
    if (q.leader) baseUrl += "&leader=" + encodeURIComponent(q.leader);
    var html = "";
    var globalIdx = 0;
    weeks.forEach(function (week, wi) {
      html += "<div class=\"course-player-chapter\">";
      html += "<h3 class=\"course-player-chapter__title\">" + escapeHtml(week.title || "Chapter " + (wi + 1)) + "</h3>";
      html += "<ul class=\"course-player-lessons\">";
      (week.lessons || []).forEach(function (lesson, li) {
        var item = flat[globalIdx];
        var duration = item ? item.duration : lessonDuration(wi, li);
        var href = baseUrl + "#w" + wi + "-l" + li;
        var label = lesson.title || (lesson.slug ? lesson.slug.replace(/-/g, " ") : (wi + 1) + "." + (li + 1));
        var num = (wi + 1) + "." + (li + 1);
        var isActive = globalIdx === currentFlatIndex;
        var activeClass = isActive ? " course-player-lesson-item--active" : "";
        html += "<li class=\"course-player-lesson-item" + activeClass + "\">";
        html += "<a href=\"" + href + "\" class=\"course-player-lesson-item__link\" data-week=\"" + wi + "\" data-lesson=\"" + li + "\">";
        html += "<span class=\"course-player-lesson-item__num\">" + escapeHtml(num) + "</span>";
        html += "<span class=\"course-player-lesson-item__title\">" + escapeHtml(label) + "</span>";
        html += "<span class=\"course-player-lesson-item__duration\">" + escapeHtml(duration) + "</span>";
        html += "<span class=\"course-player-lesson-item__play\" aria-hidden=\"true\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg></span>";
        html += "</a></li>";
        globalIdx++;
      });
      html += "</ul></div>";
    });
    outlineEl.innerHTML = html;
  }

  function showPoster(posterEl, videoEl, playBtn, title, badge) {
    if (posterEl) posterEl.classList.add("is-visible");
    if (videoEl) {
      videoEl.classList.remove("is-visible");
      videoEl.pause();
    }
    if (playBtn) playBtn.setAttribute("aria-label", "Play video");
    if (title) title.textContent = badge ? badge + ": " + (title.getAttribute("data-title") || "") : (title.getAttribute("data-title") || "Play");
    if (badge) badge.textContent = title.getAttribute("data-badge") || "Course";
  }

  function showVideo(videoEl, posterEl, playBtn) {
    if (posterEl) posterEl.classList.remove("is-visible");
    if (videoEl) {
      videoEl.classList.add("is-visible");
      videoEl.play().catch(function () {});
    }
    if (playBtn) playBtn.setAttribute("aria-label", "Pause video");
  }

  function updateMainContent(flat, idx, opts) {
    if (!flat || !flat.length || idx < 0 || idx >= flat.length) return;
    var cur = flat[idx];
    var lesson = cur.lesson;
    var titleEl = document.getElementById("course-player-lesson-title");
    var excerptEl = document.getElementById("course-player-lesson-excerpt");
    var posterTitle = document.getElementById("course-player-poster-title");
    var posterBadge = document.getElementById("course-player-poster-badge");
    if (titleEl) titleEl.textContent = lesson.title || cur.slug.replace(/-/g, " ");
    if (excerptEl) excerptEl.textContent = firstLineOrExcerpt(lesson);
    if (posterTitle) {
      posterTitle.setAttribute("data-title", lesson.title || cur.slug.replace(/-/g, " "));
      posterTitle.textContent = (cur.weekIndex + 1) + "." + (cur.lessonIndex + 1) + " " + (lesson.title || cur.slug.replace(/-/g, " "));
    }
    if (posterBadge && opts.courseTitle) posterBadge.setAttribute("data-badge", opts.courseTitle);
    var video = document.getElementById("course-player-video");
    var poster = document.getElementById("course-player-poster");
    var playBtn = document.getElementById("course-player-play-btn");
    if (lesson.sections && lesson.sections.video) {
      if (video) {
        video.src = lesson.sections.video;
        video.classList.add("is-visible");
        if (poster) poster.classList.remove("is-visible");
      }
    } else {
      showPoster(poster, video, playBtn, posterTitle, posterBadge);
    }
  }

  function run(config) {
    var courseSlug = getQuery().course || (config.contentLibrary && config.contentLibrary.courses && config.contentLibrary.courses[0] && config.contentLibrary.courses[0].slug) || "mdna";
    var courses = config.contentLibrary && config.contentLibrary.courses;
    var course = courses && courses.find(function (c) { return c.slug === courseSlug; });
    if (!course) course = courses && courses[0];
    if (!course || !course.weeks || !course.weeks.length) return;

    var flat = buildFlatLessons(course.weeks);
    var outlineEl = document.getElementById("course-player-outline");
    var sidebarTitleEl = document.getElementById("course-player-sidebar-title");
    var backLink = document.getElementById("course-player-back");
    if (backLink) {
      var detailHref = "course-detail.html?course=" + encodeURIComponent(courseSlug);
      if (getQuery().leader) detailHref += "&leader=" + encodeURIComponent(getQuery().leader);
      backLink.href = detailHref;
    }
    if (sidebarTitleEl) sidebarTitleEl.textContent = course.title || "Course";
    var posterBg = document.getElementById("course-player-poster-bg");
    if (posterBg && course.heroImage) {
      posterBg.src = course.heroImage;
      posterBg.alt = (course.title || "Course") + " — course";
    }

    var parsed = parseHash();
    var currentIndex = 0;
    if (parsed !== null) {
      var found = flat.findIndex(function (f) { return f.weekIndex === parsed.weekIndex && f.lessonIndex === parsed.lessonIndex; });
      if (found >= 0) currentIndex = found;
    } else if (flat.length) {
      window.location.replace("#w" + flat[0].weekIndex + "-l" + flat[0].lessonIndex);
    }

    renderOutline(outlineEl, course.weeks, courseSlug, currentIndex, flat);
    updateMainContent(flat, currentIndex, { courseTitle: course.title });

    outlineEl.addEventListener("click", function (e) {
      var a = e.target.closest("a[data-week][data-lesson]");
      if (!a) return;
      e.preventDefault();
      var w = a.getAttribute("data-week");
      var l = a.getAttribute("data-lesson");
      window.location.hash = "w" + w + "-l" + l;
      var idx = flat.findIndex(function (f) { return String(f.weekIndex) === w && String(f.lessonIndex) === l; });
      if (idx >= 0) {
        renderOutline(outlineEl, course.weeks, courseSlug, idx, flat);
        updateMainContent(flat, idx, { courseTitle: course.title });
      }
    });

    function onHashChange() {
      var p = parseHash();
      if (p === null) return;
      var idx = flat.findIndex(function (f) { return f.weekIndex === p.weekIndex && f.lessonIndex === p.lessonIndex; });
      if (idx >= 0) {
        renderOutline(outlineEl, course.weeks, courseSlug, idx, flat);
        updateMainContent(flat, idx, { courseTitle: course.title });
      }
    }
    window.addEventListener("hashchange", onHashChange);

    var playBtn = document.getElementById("course-player-play-btn");
    var video = document.getElementById("course-player-video");
    var poster = document.getElementById("course-player-poster");
    if (playBtn && video && poster) {
      playBtn.addEventListener("click", function () {
        if (poster.classList.contains("is-visible")) {
          showVideo(video, poster, playBtn);
        } else {
          if (video.paused) video.play().catch(function () {}); else video.pause();
          playBtn.setAttribute("aria-label", video.paused ? "Play video" : "Pause video");
        }
      });
      video.addEventListener("play", function () { poster.classList.remove("is-visible"); video.classList.add("is-visible"); playBtn.setAttribute("aria-label", "Pause video"); });
      video.addEventListener("pause", function () { playBtn.setAttribute("aria-label", "Play video"); });
    }

    var lightsOff = document.getElementById("course-player-lights-off");
    var sidebar = document.getElementById("course-player-sidebar");
    if (lightsOff && sidebar) {
      lightsOff.addEventListener("click", function () {
        var on = sidebar.getAttribute("aria-lights-off") === "true";
        sidebar.setAttribute("aria-lights-off", on ? "false" : "true");
        lightsOff.setAttribute("aria-pressed", on ? "false" : "true");
      });
    }
  }

  var jsonPath = getJsonPath();
  var base = document.querySelector('script[src*="leader-content.js"]');
  var basePath = "";
  if (base && base.src) basePath = base.src.replace(/\/[^/]*$/, "/");
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
