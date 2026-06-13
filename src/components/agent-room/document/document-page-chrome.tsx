"use client";

import type { ReactNode } from "react";

import shell from "./document-shell.module.css";

export type DocumentNavEntry = {
  id: string;
  label: string;
};

type DocumentPageChromeProps = {
  children: ReactNode;
  entries: readonly DocumentNavEntry[];
  activeNavIndex: number;
  scrollTo: (id: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  scrollProgress: number;
  menuId: string;
  /** About page: numbered sidebar links with mono index prefix. */
  numberedSidebar?: boolean;
};

/**
 * Shared mobile nav + sticky sidebar chrome for long-form document pages.
 */
export function DocumentPageChrome({
  children,
  entries,
  activeNavIndex,
  scrollTo,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollProgress,
  menuId,
  numberedSidebar = false,
}: DocumentPageChromeProps) {
  const activeLabel = entries[activeNavIndex]?.label ?? entries[0]?.label ?? "";

  return (
    <>
      <div className={shell.mobileNav}>
        <div className={shell.mobileProgress} aria-hidden="true">
          <div className={shell.mobileProgressBar} style={{ width: `${scrollProgress}%` }} />
        </div>
        <div className={shell.mobileNavRow}>
          <span className={shell.mobileNavCurrent}>{activeLabel}</span>
          <button
            type="button"
            className={shell.mobileMenuBtn}
            aria-expanded={mobileMenuOpen}
            aria-controls={menuId}
            onClick={() => setMobileMenuOpen((o) => !o)}
          >
            Sections
          </button>
        </div>
        <nav
          id={menuId}
          className={`${shell.mobileMenu} ${mobileMenuOpen ? shell.mobileMenuOpen : ""}`}
          aria-label="Page sections"
        >
          {entries.map((entry, i) => (
            <button
              key={entry.id}
              type="button"
              className={i === activeNavIndex ? shell.mobileMenuLinkActive : shell.mobileMenuLink}
              onClick={() => {
                scrollTo(entry.id);
                setMobileMenuOpen(false);
              }}
            >
              {entry.label}
            </button>
          ))}
        </nav>
      </div>

      <div className={shell.layout}>
        <aside className={shell.sidebar} aria-label="Page sections">
          <p className={shell.sidebarLabel}>On this page</p>
          <nav className={shell.sidebarNav}>
            {entries.map((entry, i) => (
              <button
                key={entry.id}
                type="button"
                className={`${shell.sidebarLink} ${numberedSidebar ? shell.sidebarLinkNumbered : ""} ${
                  i === activeNavIndex ? shell.sidebarLinkActive : ""
                }`}
                aria-current={i === activeNavIndex ? "true" : undefined}
                onClick={() => scrollTo(entry.id)}
              >
                {numberedSidebar ? (
                  <span className={shell.sidebarNum}>{String(i + 1).padStart(2, "0")}</span>
                ) : null}
                {entry.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className={shell.contentMain}>{children}</main>
      </div>
    </>
  );
}
