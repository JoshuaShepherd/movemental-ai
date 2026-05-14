"use client";

import { useState, type ReactNode } from "react";

/** Owns the .is-open state on .site-nav and the aria-expanded attribute on the
 *  toggle button. Mirrors docs/html/site-templates/site-shell.js so the cream-
 *  paper recipe layer drives the visuals; React only owns the boolean. */
export function SiteNavMobileToggle({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="site-nav__toggle"
        aria-controls="primary-nav"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        Menu
      </button>
      <nav
        className={`site-nav${open ? " is-open" : ""}`}
        id="primary-nav"
        aria-label="Primary"
      >
        {children}
      </nav>
    </>
  );
}
