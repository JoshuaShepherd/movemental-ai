(function () {
  "use strict";

  var printBtn = document.getElementById("btn-print");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }

  var expandBtn = document.getElementById("btn-expand-appendix");
  var appendix = document.getElementById("appendix");
  if (expandBtn && appendix) {
    expandBtn.addEventListener("click", function () {
      var details = appendix.querySelectorAll("details");
      var allOpen = true;
      for (var i = 0; i < details.length; i++) {
        if (!details[i].open) {
          allOpen = false;
          break;
        }
      }
      var nextOpen = !allOpen;
      for (var j = 0; j < details.length; j++) {
        details[j].open = nextOpen;
      }
      expandBtn.textContent = nextOpen ? "Collapse appendix" : "Expand appendix";
    });
  }
})();
