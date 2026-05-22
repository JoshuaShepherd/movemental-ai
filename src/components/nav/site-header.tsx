"use client";

import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

import { Container } from "@/components/studio/Container";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "./theme-toggle";

const LOGO_LIGHT_SRC =
  "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/logos/movemental-logo-transparent.png";
const LOGO_DARK_SRC =
  "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/logos/movemental-logo-transparent-white.webp";

/* ──────────────────────────────────────────────────────────────────────────────
 * Editorial artifacts — refined chapter vignettes (88 × 56 canvas).
 *
 * Each artifact reads as a small object on a page: stroke 1, restrained fills
 * from semantic tokens so dark mode and Midnight bands resolve correctly.
 * ──────────────────────────────────────────────────────────────────────────── */

type ArtifactProps = { className?: string };

function SafetyArtifact({ className }: ArtifactProps) {
  return (
    <svg
      viewBox="0 0 88 56"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden
    >
      {/* Charter document */}
      <rect
        x="12"
        y="6"
        width="44"
        height="44"
        rx="2"
        fill="var(--card)"
        stroke="var(--border)"
      />
      {/* Header band */}
      <rect x="12" y="6" width="44" height="7" fill="var(--section)" />
      <line x1="18" y1="9.5" x2="34" y2="9.5" stroke="var(--ink-soft)" />
      {/* Text lines */}
      <line x1="18" y1="20" x2="48" y2="20" stroke="var(--rule)" />
      <line x1="18" y1="25" x2="50" y2="25" stroke="var(--rule)" />
      <line x1="18" y1="30" x2="44" y2="30" stroke="var(--rule)" />
      <line x1="18" y1="35" x2="46" y2="35" stroke="var(--rule)" />
      {/* Signature line + signed mark */}
      <line x1="18" y1="44" x2="40" y2="44" stroke="var(--ink-soft)" />
      <path
        d="M20 43 q2 -2 4 0 t4 0 t4 0"
        stroke="var(--foreground)"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />
      {/* Wax seal */}
      <circle cx="66" cy="38" r="8" fill="var(--status-stop)" />
      <circle
        cx="66"
        cy="38"
        r="5.5"
        fill="none"
        stroke="var(--primary-foreground)"
        strokeOpacity="0.45"
        strokeDasharray="1.2 1.2"
      />
      <path
        d="M66 33 v10 M61 38 h10"
        stroke="var(--primary-foreground)"
        strokeOpacity="0.55"
        strokeWidth="0.8"
      />
      {/* Ribbon */}
      <path
        d="M61 45 l-2 7 l4 -2 l3 2 l1 -7"
        fill="var(--status-stop)"
        opacity="0.7"
      />
    </svg>
  );
}

function SandboxArtifact({ className }: ArtifactProps) {
  return (
    <svg
      viewBox="0 0 88 56"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden
    >
      {/* Safe perimeter — dashed boundary */}
      <rect
        x="4"
        y="4"
        width="80"
        height="48"
        rx="3"
        fill="none"
        stroke="var(--ink-soft)"
        strokeDasharray="2 3"
      />
      {/* Contained surface */}
      <rect
        x="12"
        y="12"
        width="64"
        height="32"
        rx="2"
        fill="var(--card)"
        stroke="var(--border)"
      />
      {/* Specimens — three tested forms */}
      <circle
        cx="24"
        cy="28"
        r="4"
        fill="var(--section)"
        stroke="var(--border)"
      />
      <rect
        x="36"
        y="24"
        width="9"
        height="9"
        rx="1"
        fill="var(--section)"
        stroke="var(--border)"
      />
      <path
        d="M58 33 l5 -10 l5 10 z"
        fill="var(--pathway-accent)"
        fillOpacity="0.7"
        stroke="var(--pathway-accent)"
      />
      {/* Connector — observing relations */}
      <path
        d="M28 28 q6 -6 12 0 q6 6 18 0"
        fill="none"
        stroke="var(--rule)"
        strokeDasharray="1 2"
      />
    </svg>
  );
}

function SkillsArtifact({ className }: ArtifactProps) {
  return (
    <svg
      viewBox="0 0 88 56"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden
    >
      {/* Ascending formation */}
      <rect
        x="8"
        y="38"
        width="14"
        height="12"
        rx="1.5"
        fill="var(--card)"
        stroke="var(--border)"
      />
      <rect
        x="26"
        y="30"
        width="14"
        height="20"
        rx="1.5"
        fill="var(--card)"
        stroke="var(--border)"
      />
      <rect
        x="44"
        y="22"
        width="14"
        height="28"
        rx="1.5"
        fill="var(--card)"
        stroke="var(--border)"
      />
      <rect
        x="62"
        y="12"
        width="14"
        height="38"
        rx="1.5"
        fill="var(--pathway-accent)"
        fillOpacity="0.72"
      />
      {/* Flag — formed leader */}
      <line
        x1="69"
        y1="12"
        x2="69"
        y2="4"
        stroke="var(--foreground)"
        strokeWidth="1"
      />
      <path d="M69 5 l6 2.2 l-6 2.2 z" fill="var(--foreground)" />
      {/* Hairline baseline */}
      <line x1="6" y1="50.5" x2="82" y2="50.5" stroke="var(--rule)" />
    </svg>
  );
}

function SolutionsArtifact({ className }: ArtifactProps) {
  return (
    <svg
      viewBox="0 0 88 56"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden
    >
      {/* Triptych — built system, integrated core */}
      <rect
        x="4"
        y="18"
        width="20"
        height="22"
        rx="2"
        fill="var(--card)"
        stroke="var(--border)"
      />
      <rect
        x="34"
        y="8"
        width="20"
        height="42"
        rx="2"
        fill="var(--inverse-surface)"
      />
      <rect
        x="64"
        y="18"
        width="20"
        height="22"
        rx="2"
        fill="var(--card)"
        stroke="var(--border)"
      />
      {/* Inner detail on dark core */}
      <line
        x1="38"
        y1="16"
        x2="50"
        y2="16"
        stroke="var(--inverse-foreground)"
        strokeOpacity="0.45"
      />
      <line
        x1="38"
        y1="22"
        x2="46"
        y2="22"
        stroke="var(--inverse-foreground)"
        strokeOpacity="0.3"
      />
      <line
        x1="38"
        y1="28"
        x2="50"
        y2="28"
        stroke="var(--inverse-foreground)"
        strokeOpacity="0.3"
      />
      <circle cx="44" cy="42" r="2.2" fill="var(--pathway-accent)" />
      {/* Side bracket details */}
      <line x1="9" y1="24" x2="19" y2="24" stroke="var(--rule)" />
      <line x1="9" y1="30" x2="19" y2="30" stroke="var(--rule)" />
      <line x1="69" y1="24" x2="79" y2="24" stroke="var(--rule)" />
      <line x1="69" y1="30" x2="79" y2="30" stroke="var(--rule)" />
      {/* Connectors */}
      <line x1="24" y1="29" x2="34" y2="29" stroke="var(--rule)" />
      <line x1="54" y1="29" x2="64" y2="29" stroke="var(--rule)" />
    </svg>
  );
}

type PathStage = {
  num: string;
  name: string;
  href: string;
  sub: string;
  Art: ComponentType<ArtifactProps>;
};

const PATH_STAGES: PathStage[] = [
  {
    num: "01",
    name: "Safety",
    href: "/pathway/safety",
    sub: "AI use & trust charters",
    Art: SafetyArtifact,
  },
  {
    num: "02",
    name: "Sandbox",
    href: "/pathway/sandbox",
    sub: "Safe exploration · Tested use cases · Real work",
    Art: SandboxArtifact,
  },
  {
    num: "03",
    name: "Skills",
    href: "/pathway/skills",
    sub: "Cohorts & self-paced training",
    Art: SkillsArtifact,
  },
  {
    num: "04",
    name: "Solutions",
    href: "/pathway/solutions",
    sub: "Custom agentic CMS/LMS builds",
    Art: SolutionsArtifact,
  },
];

type Audience = {
  marker: string;
  name: string;
  href: string;
  deck: string;
  byline: string;
  tintVar: string;
};

const AUDIENCES: Audience[] = [
  {
    marker: "A",
    name: "Churches",
    href: "/churches",
    deck: "Formation pathways, pastoral care, and institutional memory — held as one coherent intelligence.",
    byline: "Formation · Care · Memory",
    tintVar: "var(--audience-ring-churches)",
  },
  {
    marker: "B",
    name: "Nonprofits",
    href: "/nonprofits",
    deck: "Your donor base, content library, and program data should act on the same intelligence.",
    byline: "Mission · Money · Memory",
    tintVar: "var(--audience-ring-nonprofits)",
  },
  {
    marker: "C",
    name: "Institutions",
    href: "/institutions",
    deck: "Research, curriculum, and collaboration mapped so coherence survives turnover.",
    byline: "Entities · Generations · Accreditors",
    tintVar: "var(--audience-ring-institutions)",
  },
];

/**
 * Primary header — editorial spread mega-menus.
 *
 * The Path menu opens as a two-page spread (left = title page, right = chapter
 * index with refined artifacts). The Audience menu opens as an appendix of
 * three essays. Both replace earlier list-style dropdowns; mobile shell is
 * preserved with Arabic numerals.
 */
export function SiteHeader({
  authDesktopCta,
  authMobileCta,
}: {
  authDesktopCta?: ReactNode;
  authMobileCta?: ReactNode;
}) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMega, setOpenMega] = useState<"path" | "audience" | null>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot,
  );
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!openMega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMega(null);
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest("[data-mega-group]")) setOpenMega(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [openMega]);

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-border bg-card/95 py-2 backdrop-blur-md"
          : "border-b border-transparent bg-transparent py-4",
      )}
      role="banner"
    >
      <Container className="flex items-center justify-between gap-6 transition-all duration-300">
        <Link
          href="/"
          className="flex items-center"
          aria-label="Movemental Home"
        >
          <Image
            src={LOGO_LIGHT_SRC}
            alt="Movemental"
            width={749}
            height={239}
            priority
            className="block h-11 w-auto dark:hidden"
          />
          <Image
            src={LOGO_DARK_SRC}
            alt="Movemental"
            width={749}
            height={239}
            priority
            className="hidden h-11 w-auto dark:block"
          />
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          <PathMega
            isOpen={openMega === "path"}
            setOpen={(open) => setOpenMega(open ? "path" : null)}
            pathname={pathname}
          />
          <AudienceMega
            isOpen={openMega === "audience"}
            setOpen={(open) => setOpenMega(open ? "audience" : null)}
          />

          <Link
            href="/about-safestart"
            className="relative px-3 py-3.5 text-sm font-medium transition-colors duration-200 after:absolute after:right-3 after:bottom-2.5 after:left-3 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-primary hover:after:scale-x-100"
          >
            SafeStart
          </Link>
          <Link
            href="/about"
            className="relative px-3 py-3.5 text-sm font-medium transition-colors duration-200 after:absolute after:right-3 after:bottom-2.5 after:left-3 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-primary hover:after:scale-x-100"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="relative px-3 py-3.5 text-sm font-medium transition-colors duration-200 after:absolute after:right-3 after:bottom-2.5 after:left-3 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-primary hover:after:scale-x-100"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/field-guides/safety"
            className="btn-pill btn-pill--ghost py-2.5 text-sm"
          >
            <Download className="size-4" aria-hidden />
            Field Guide
          </Link>
          <ThemeToggle size="comfortable" />
          {authDesktopCta ?? (
            <Link
              href="/contact?interest=safestart"
              className="btn-pill btn-pill--primary py-2.5"
              aria-label="Start SafeStart — the $1,000 facilitated engagement"
            >
              Start SafeStart
            </Link>
          )}
        </div>

        <button
          type="button"
          className="inline-flex size-11 min-h-11 min-w-11 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-section focus:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <div
        className={cn(
          "absolute top-full right-0 left-0 flex flex-col gap-2 overflow-hidden border-b border-border bg-card shadow-ambient transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "max-h-[80vh] px-6 py-6 opacity-100"
            : "pointer-events-none max-h-0 px-6 py-0 opacity-0",
        )}
      >
        <div className="flex max-h-full flex-col gap-4 overflow-y-auto pb-4">
          <Link
            href="/pathway"
            onClick={() => setIsMenuOpen(false)}
            className="flex min-h-11 items-center rounded-md px-2 text-lg font-medium transition-colors hover:bg-section"
          >
            Movemental Path
          </Link>
          <div className="ml-2 flex flex-col gap-2 border-l border-rule py-1 pl-4">
            <span className="px-2 text-[0.6875rem] font-semibold uppercase tracking-eyebrow text-ink-soft">
              Path stages
            </span>
            {PATH_STAGES.map((stage) => (
              <Link
                key={stage.href}
                href={stage.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex min-h-11 items-center gap-3 rounded-md px-2 text-[1.0625rem] font-medium transition-colors hover:bg-section",
                  pathname.startsWith(stage.href) && "bg-section",
                )}
              >
                <span className="font-serif italic text-ink-soft">
                  {stage.num}.
                </span>
                {stage.name}
              </Link>
            ))}
          </div>
          <div className="ml-2 flex flex-col gap-2 border-l border-rule py-1 pl-4">
            <span className="px-2 text-[0.6875rem] font-semibold uppercase tracking-eyebrow text-ink-soft">
              Audiences
            </span>
            {AUDIENCES.map((a) => (
              <Link
                key={a.href}
                href={a.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex min-h-11 items-center gap-3 rounded-md px-2 text-[1.0625rem] font-medium transition-colors hover:bg-section"
              >
                <span className="font-serif italic text-ink-soft">
                  {a.marker}.
                </span>
                For {a.name}
              </Link>
            ))}
          </div>
          <Link
            href="/about-safestart"
            onClick={() => setIsMenuOpen(false)}
            className={cn(
              "flex min-h-11 items-center rounded-md px-2 text-lg font-medium transition-colors hover:bg-section",
              pathname.startsWith("/about-safestart") && "bg-section",
            )}
          >
            SafeStart
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="flex min-h-11 items-center rounded-md px-2 text-lg font-medium transition-colors hover:bg-section"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="flex min-h-11 items-center rounded-md px-2 text-lg font-medium transition-colors hover:bg-section"
          >
            Contact
          </Link>
          <div className="mt-3 flex flex-col gap-2">
            <Link
              href="/field-guides/safety"
              onClick={() => setIsMenuOpen(false)}
              className="btn-pill btn-pill--ghost flex w-full justify-center gap-2 py-3 text-center"
            >
              <Download className="size-4" aria-hidden />
              Download the Field Guide
            </Link>
            {authMobileCta ?? (
              <Link
                href="/contact?interest=safestart"
                onClick={() => setIsMenuOpen(false)}
                className="btn-pill btn-pill--primary flex w-full justify-center py-3 text-center"
              >
                Start SafeStart
              </Link>
            )}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="mt-4 flex items-center justify-center gap-2 rounded-md bg-section p-3 text-foreground/80 transition-colors hover:bg-border"
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            {mounted && resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </header>
  );
}

/* ──────────────────────────────────────────────────────────────────────────────
 * Mega-menu primitives
 * ──────────────────────────────────────────────────────────────────────────── */

type MegaProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

function useHoverIntent(setOpen: (open: boolean) => void) {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }, [setOpen]);
  const onLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  }, [setOpen]);
  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );
  return { onEnter, onLeave };
}

function PathMega({
  isOpen,
  setOpen,
  pathname,
}: MegaProps & { pathname: string }) {
  const triggerId = useId();
  const menuId = useId();
  const { onEnter, onLeave } = useHoverIntent(setOpen);

  return (
    <div
      className="relative"
      data-mega-group="path"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        id={triggerId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!isOpen);
        }}
        className="inline-flex items-center gap-1.5 px-3 py-3.5 text-sm font-medium transition-colors duration-200 hover:text-primary aria-expanded:text-primary"
      >
        Movemental Path
        <svg
          className={cn(
            "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        id={menuId}
        role="menu"
        aria-labelledby={triggerId}
        className={cn(
          "absolute top-[calc(100%+0.25rem)] left-1/2 z-50 -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-card shadow-ambient transition-all duration-200",
          "w-[min(960px,calc(100vw-2rem))]",
          isOpen
            ? "translate-x-[-50%] translate-y-0 opacity-100"
            : "pointer-events-none translate-x-[-50%] -translate-y-2 opacity-0",
        )}
      >
        <div className="grid min-h-[420px] grid-cols-1 md:grid-cols-[0.85fr_1.15fr]">
          {/* Left page — title page */}
          <div
            className="flex flex-col gap-2 border-b border-dashed border-rule bg-background p-8 md:border-r md:border-b-0"
          >
            <div className="mb-6 flex items-baseline justify-between font-mono text-[0.625rem] uppercase tracking-[0.2em] text-ink-soft">
              <span>Volume One</span>
              <span>Front matter</span>
            </div>
            <div className="mb-2.5 text-[0.6875rem] uppercase tracking-[0.2em] text-ink-soft">
              The Movemental Path
            </div>
            <h3 className="font-serif text-3xl font-medium italic leading-[1.05] tracking-tight">
              Four ordered products.{" "}
              <em className="font-serif italic text-pathway-accent">
                Begin at Safety.
              </em>
            </h3>
            <p className="mt-5 max-w-[28ch] font-serif text-base italic leading-[1.55] text-foreground/80">
              A charter, a sandbox, a course, and a built system — in order,
              each earning the next.
            </p>
            <div className="mt-auto border-t border-rule pt-4 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-ink-soft">
              — Edited by Movemental
            </div>
          </div>

          {/* Right page — chapter index */}
          <div className="flex flex-col gap-2 p-8">
            <div className="mb-4 flex items-baseline justify-between font-mono text-[0.625rem] uppercase tracking-[0.2em] text-ink-soft">
              <span>Index of products</span>
              <span>01 — 04</span>
            </div>

            <ul className="flex flex-col">
              {PATH_STAGES.map((stage, idx) => {
                const isActive = pathname.startsWith(stage.href);
                const Art = stage.Art;
                return (
                  <li key={stage.href}>
                    <Link
                      href={stage.href}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className={cn(
                        "-mx-3 grid grid-cols-[3rem_1fr_88px] items-center gap-4 rounded-lg border-b border-rule px-3 py-4 transition-colors duration-200 hover:bg-background",
                        idx === PATH_STAGES.length - 1 && "border-b-0",
                      )}
                    >
                      <span
                        className={cn(
                          "text-right font-serif text-[1.625rem] italic leading-none",
                          isActive ? "text-pathway-accent" : "text-ink-soft",
                        )}
                      >
                        {stage.num}.
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <span className="text-[1.0625rem] font-semibold tracking-tight">
                          {stage.name}
                          {isActive ? (
                            <span className="ml-2 text-[0.6875rem] font-bold uppercase tracking-eyebrow text-status-stop">
                              Reading now
                            </span>
                          ) : null}
                        </span>
                        <span className="font-serif text-[0.8125rem] italic text-muted-foreground">
                          {stage.sub}
                        </span>
                      </span>
                      <span className="grid h-14 w-[88px] place-items-center overflow-hidden rounded-md bg-background ring-1 ring-rule">
                        <Art className="h-full w-full" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function AudienceMega({ isOpen, setOpen }: MegaProps) {
  const triggerId = useId();
  const menuId = useId();
  const { onEnter, onLeave } = useHoverIntent(setOpen);

  return (
    <div
      className="relative"
      data-mega-group="audience"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        id={triggerId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!isOpen);
        }}
        className="inline-flex items-center gap-1.5 px-3 py-3.5 text-sm font-medium transition-colors duration-200 hover:text-primary aria-expanded:text-primary"
      >
        Audiences
        <svg
          className={cn(
            "h-3.5 w-3.5 opacity-60 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        id={menuId}
        role="menu"
        aria-labelledby={triggerId}
        className={cn(
          "absolute top-[calc(100%+0.25rem)] left-1/2 z-50 overflow-hidden rounded-2xl border border-border bg-card shadow-ambient transition-all duration-200",
          "w-[min(820px,calc(100vw-2rem))]",
          isOpen
            ? "translate-x-[-50%] translate-y-0 opacity-100"
            : "pointer-events-none translate-x-[-50%] -translate-y-2 opacity-0",
        )}
      >
        <div className="p-8">
          <div className="mb-6 flex items-baseline justify-between border-b border-rule pb-4">
            <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-ink-soft">
              Appendix · Applications
            </span>
            <span className="font-serif text-sm italic text-muted-foreground">
              Same system, three contexts
            </span>
          </div>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {AUDIENCES.map((a) => (
              <li key={a.href}>
                <Link
                  href={a.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="group block rounded-lg p-3 transition-all duration-200 hover:-translate-y-0.5 hover:bg-background"
                >
                  <span
                    className="mb-2.5 inline-grid h-7 w-7 place-items-center rounded-full font-serif text-sm font-semibold italic"
                    style={{
                      backgroundColor: `color-mix(in oklab, ${a.tintVar} 14%, transparent)`,
                      color: a.tintVar,
                    }}
                  >
                    {a.marker}
                  </span>
                  <div className="mb-1.5 font-serif text-[1.375rem] font-medium italic leading-[1.1] tracking-tight">
                    For{" "}
                    <em
                      className="font-serif italic"
                      style={{ color: a.tintVar }}
                    >
                      {a.name}
                    </em>
                  </div>
                  <p className="max-w-[26ch] text-[0.8125rem] leading-[1.55] text-muted-foreground">
                    {a.deck}
                  </p>
                  <div
                    className="mt-2.5 font-mono text-[0.625rem] uppercase tracking-eyebrow"
                    style={{ color: a.tintVar }}
                  >
                    {a.byline}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
