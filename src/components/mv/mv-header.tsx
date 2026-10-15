"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { MvSignet } from "./brand/mark";
import { MAP_STAGES } from "./map/stages";
import { MV_ROUTES, mapStageHref } from "./routes";

/**
 * Site header for the Paper design system: the signet, five links, the Map panel and the
 * Resolution pill; a full-screen menu below 900 px. Boards: Brand-Navbar, Brand-Navbar-Phone,
 * Brand-Navbar-Phone-Open (docs/handoff/brand-nav/README.md).
 */

type Section = "resolve" | "map" | "guidebook" | "leaders" | "about" | null;

function sectionOf(pathname: string): Section {
  const is = (base: string) => pathname === base || pathname.startsWith(`${base}/`);
  if (is(MV_ROUTES.resolve) || is("/me") || is("/r")) return "resolve";
  if (is(MV_ROUTES.map)) return "map";
  if (is(MV_ROUTES.guidebook)) return "guidebook";
  if (is(MV_ROUTES.leaders)) return "leaders";
  if (is(MV_ROUTES.about) || is(MV_ROUTES.story)) return "about";
  return null;
}

const LINKS: ReadonlyArray<{ key: Exclude<Section, null | "map">; label: string; href: string }> = [
  { key: "guidebook", label: "Guidebook", href: MV_ROUTES.guidebook },
  { key: "leaders", label: "Leaders", href: MV_ROUTES.leaders },
  { key: "about", label: "About", href: MV_ROUTES.about },
];

/** The accent pen stroke under a link (hover draws it, the current page keeps it). */
function Stroke() {
  return (
    <svg className="mv-nb-stroke" aria-hidden="true" viewBox="0 0 60 6" preserveAspectRatio="none">
      <path
        d="M1 4.2 C 14 1.6, 30 5.4, 44 3 S 57 2.2, 59 2.6"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg className={className} aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function MvHeader() {
  const pathname = usePathname() ?? "/";
  const current = sectionOf(pathname);
  const [scrolled, setScrolled] = useState(false);
  // Open state is tied to the route it was opened on, so navigating closes both.
  const [mapOpenOn, setMapOpenOn] = useState<string | null>(null);
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const mapOpen = mapOpenOn === pathname;
  const menuOpen = menuOpenOn === pathname;
  const setMapOpen = useCallback(
    (next: boolean | ((open: boolean) => boolean)) =>
      setMapOpenOn((on) => {
        const open = typeof next === "function" ? next(on === pathname) : next;
        return open ? pathname : null;
      }),
    [pathname],
  );
  const setMenuOpen = useCallback((open: boolean) => setMenuOpenOn(open ? pathname : null), [pathname]);
  const panelId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const mapButtonRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The Map panel: Escape closes and returns focus; a click outside the header closes.
  useEffect(() => {
    if (!mapOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMapOpen(false);
        mapButtonRef.current?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMapOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [mapOpen, setMapOpen]);

  // The phone menu: lock the page, focus the close button, Escape closes.
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    burgerRef.current?.focus();
  }, [setMenuOpen]);
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  const linkProps = (key: Section) =>
    current === key ? { "aria-current": "page" as const, "data-on": "true" } : {};

  return (
    <>
      <header ref={headerRef} className="mv-nb mv-no-print" data-scrolled={scrolled ? "true" : "false"}>
        <div className="mv-wrap mv-nb-in">
          <Link href={MV_ROUTES.home} className="mv-nb-brand" aria-label="Movemental home">
            <MvSignet size={27} />
          </Link>

          <nav aria-label="Main" className="mv-nb-nav">
            <ul>
              <li>
                <Link className="mv-nb-link" href={MV_ROUTES.resolve} {...linkProps("resolve")}>
                  Resolve
                  <Stroke />
                </Link>
              </li>
              <li>
                <button
                  ref={mapButtonRef}
                  type="button"
                  className="mv-nb-link"
                  aria-expanded={mapOpen}
                  aria-controls={panelId}
                  data-on={current === "map" || mapOpen ? "true" : undefined}
                  onClick={() => setMapOpen((o) => !o)}
                >
                  The Map
                  <svg className="mv-nb-chev" aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                  <Stroke />
                </button>
              </li>
              {LINKS.map((l) => (
                <li key={l.key}>
                  <Link className="mv-nb-link" href={l.href} {...linkProps(l.key)}>
                    {l.label}
                    <Stroke />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mv-nb-end">
            <Link className="mv-nb-link mv-nb-signin" href={MV_ROUTES.signIn}>
              Sign in
              <Stroke />
            </Link>
            <Link className="mv-nb-pill" href={MV_ROUTES.resolve}>
              Write your Resolution
              <Arrow className="mv-nb-arrow" />
            </Link>
            <button
              ref={burgerRef}
              type="button"
              className="mv-nb-burger"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
                <path d="M4 8h16" />
                <path d="M4 16h16" />
              </svg>
            </button>
          </div>
        </div>

        {mapOpen ? (
          <div className="mv-nb-panel" id={panelId}>
            <div className="mv-wrap">
              <div className="mv-nb-sheet">
                <div className="mv-nb-sheet-intro">
                  <p className="mv-nb-label">The Map</p>
                  <p className="mv-nb-sheet-title">Five stages, from conviction to working systems.</p>
                  <p className="mv-nb-sheet-note">Every stage produces something your organization keeps.</p>
                  <div className="mv-nb-sheet-more">
                    <Link href={MV_ROUTES.map} className="mv-nb-sheet-all">
                      See the whole Map <Arrow />
                    </Link>
                    <Link href={MV_ROUTES.assessment} className="mv-nb-sheet-quiet">
                      Not sure where you are? Take the Reality Assessment
                    </Link>
                  </div>
                </div>
                <ol className="mv-nb-stages">
                  {MAP_STAGES.map((s) => (
                    <li key={s.slug}>
                      <Link href={mapStageHref(s.slug)} className="mv-nb-stage">
                        <span className="mv-nb-stage-n">{s.n}</span>
                        <span className="mv-nb-stage-text">
                          <span className="mv-nb-stage-name">{s.name}</span>
                          <span className="mv-nb-stage-produces">Produces {s.produces}</span>
                        </span>
                        <Arrow className="mv-nb-stage-go" />
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      {menuOpen ? (
        <div className="mv-nb-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mv-nb-menu-bar">
            <Link href={MV_ROUTES.home} className="mv-nb-brand" aria-label="Movemental home" onClick={() => setMenuOpen(false)}>
              <MvSignet size={24} />
            </Link>
            <button ref={closeRef} type="button" className="mv-nb-burger" aria-label="Close menu" onClick={closeMenu}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
                <path d="M6 6l12 12" />
                <path d="M18 6 6 18" />
              </svg>
            </button>
          </div>
          <nav aria-label="Main" className="mv-nb-menu-nav">
            <Link className="mv-nb-big" href={MV_ROUTES.resolve} {...linkProps("resolve")}>
              Resolve
            </Link>
            <div className="mv-nb-menu-map">
              <Link className="mv-nb-big" href={MV_ROUTES.map} {...linkProps("map")}>
                The Map
              </Link>
              <ol>
                {MAP_STAGES.map((s) => (
                  <li key={s.slug}>
                    <Link className="mv-nb-mini" href={mapStageHref(s.slug)}>
                      <span className="mv-nb-mini-n">{s.n}</span>
                      <span>{s.name}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
            {LINKS.map((l) => (
              <Link key={l.key} className="mv-nb-big" href={l.href} {...linkProps(l.key)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mv-nb-menu-foot">
            <Link className="mv-nb-pill mv-nb-pill--block" href={MV_ROUTES.resolve}>
              Write your Resolution
            </Link>
            <Link className="mv-nb-menu-signin" href={MV_ROUTES.signIn}>
              Sign in
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
