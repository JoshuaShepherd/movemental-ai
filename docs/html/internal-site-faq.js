/**
 * Filter FAQ items + optional section visibility.
 */
(function () {
  const input = document.querySelector("[data-faq-filter]");
  if (!input) return;

  const items = document.querySelectorAll(".faq-item[data-search]");

  function norm(s) {
    return (s || "").toLowerCase().trim();
  }

  function applyFilter() {
    const q = norm(input.value);
    items.forEach((el) => {
      const hay = norm(el.getAttribute("data-search"));
      el.classList.toggle("is-hidden", q.length > 0 && !hay.includes(q));
    });

    document.querySelectorAll(".faq-section").forEach((sec) => {
      const visible = sec.querySelectorAll(".faq-item:not(.is-hidden)").length;
      sec.classList.toggle("is-collapsed-section", visible === 0 && q.length > 0);
    });
  }

  input.addEventListener("input", applyFilter);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      input.value = "";
      applyFilter();
    }
  });
})();
