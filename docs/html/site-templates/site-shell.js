(function () {
  "use strict";
  var nav = document.querySelector(".site-nav");
  var btn = document.querySelector(".site-nav__toggle");
  if (nav && btn) {
    btn.addEventListener("click", function () {
      nav.classList.toggle("is-open");
      var open = nav.classList.contains("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var parts = (location.pathname || "").split("/");
  var file = parts[parts.length - 1] || "index.html";
  if (!file || file === "") file = "index.html";
  document.querySelectorAll(".site-nav a[href]").forEach(function (a) {
    var href = (a.getAttribute("href") || "").replace(/^\.\//, "");
    if (href === file) a.classList.add("is-active");
  });
})();
