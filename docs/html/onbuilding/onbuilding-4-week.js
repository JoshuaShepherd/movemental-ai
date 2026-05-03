/**
 * Onbuilding static preview: section nav active state + optional copy of ONBUILDING-4-WEEK-PROMPT.md
 */
(function () {
  "use strict";

  var nav = document.getElementById("ob-nav");
  if (!nav) return;

  var links = [].slice.call(nav.querySelectorAll('a[href^="#"]'));
  var byId = {};
  links.forEach(function (a) {
    var id = a.getAttribute("href");
    if (id && id.length > 1) {
      byId[id.slice(1)] = a;
    }
  });

  var sectionIds = Object.keys(byId).filter(function (id) {
    return document.getElementById(id);
  });

  function setActive(id) {
    links.forEach(function (a) {
      a.classList.remove("is-active");
      if (a.getAttribute("href") === "#" + id) a.classList.add("is-active");
    });
  }

  if (!sectionIds.length) return;

  function initFromHash() {
    var h = (location.hash || "").replace(/^#/, "");
    if (h === "top" || h === "") h = "model";
    if (h && document.getElementById(h) && byId[h]) setActive(h);
    else setActive("model");
  }
  initFromHash();
  window.addEventListener("hashchange", initFromHash);

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var id = e.target.id;
          if (id) setActive(id);
        });
      },
      { root: null, rootMargin: "-12% 0px -70% 0px", threshold: 0 }
    );
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  } else {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var mid = window.scrollY + window.innerHeight * 0.2;
        var best = null;
        var bestDist = Infinity;
        sectionIds.forEach(function (id) {
          var el = document.getElementById(id);
          if (!el) return;
          var top = el.getBoundingClientRect().top + window.scrollY;
          var d = Math.abs(top - mid);
          if (d < bestDist) {
            bestDist = d;
            best = id;
          }
        });
        if (best) setActive(best);
      });
    });
  }

  var copyBtn = document.getElementById("ob-copy-prompt");
  var toast = document.getElementById("ob-toast");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var path = "ONBUILDING-4-WEEK-PROMPT.md";
      if (window.fetch) {
        fetch(path)
          .then(function (r) {
            if (!r.ok) throw new Error("fetch failed");
            return r.text();
          })
          .then(function (text) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              return navigator.clipboard.writeText(text);
            }
            throw new Error("no clipboard");
          })
          .then(function () {
            if (toast) {
              toast.textContent = "Prompt copied to clipboard.";
              toast.classList.add("is-visible");
              setTimeout(function () {
                toast.classList.remove("is-visible");
              }, 2500);
            }
          })
          .catch(function () {
            if (toast) {
              toast.textContent =
                "Open ONBUILDING-4-WEEK-PROMPT.md in this folder (copy needs a local server or open the file).";
              toast.classList.add("is-visible");
              setTimeout(function () {
                toast.classList.remove("is-visible");
              }, 4200);
            }
          });
      }
    });
  }
})();
