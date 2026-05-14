/* ============================================================================
   Movemental — Business Model Breakdown
   Scroll-spy for the topbar nav. No deps, no build step.
   ========================================================================== */

(function () {
  "use strict";

  const navLinks = Array.from(
    document.querySelectorAll(".topbar__nav a[href^='#']")
  );

  if (!navLinks.length || !("IntersectionObserver" in window)) return;

  const sections = navLinks
    .map((a) => {
      const id = a.getAttribute("href").slice(1);
      const node = id ? document.getElementById(id) : null;
      return node ? { id, node, link: a } : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  const linkById = new Map(sections.map((s) => [s.id, s.link]));

  const setCurrent = (id) => {
    navLinks.forEach((a) => a.classList.remove("is-current"));
    const active = linkById.get(id);
    if (active) active.classList.add("is-current");
  };

  const observer = new IntersectionObserver(
    (entries) => {
      // Pick the entry with the largest intersection ratio that is above 0.
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]) setCurrent(visible[0].target.id);
    },
    {
      // Trigger when a section's top is between 20% and 60% of viewport —
      // keeps the current link aligned with the reader's focal area.
      rootMargin: "-20% 0px -55% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((s) => observer.observe(s.node));

  // Set an initial active link based on hash or first section.
  const initialId = (location.hash || "").replace(/^#/, "") || sections[0].id;
  if (linkById.has(initialId)) setCurrent(initialId);
})();
