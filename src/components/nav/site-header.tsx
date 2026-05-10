"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X, Moon, Sun, Download } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

// Empty subscribe — the snapshot never changes after hydration, so we never
// need to notify React of an update. Defined at module scope so the function
// identity is stable across renders.
const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

import { Container } from "@/components/studio/Container";
import { useToolkitModal } from "@/components/toolkit/toolkit-modal-context";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "./theme-toggle";

const LOGO_LIGHT_SRC =
  "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/logos/movemental-logo-transparent.png";
const LOGO_DARK_SRC =
  "https://vhaiiiykcukrlyvwlgip.supabase.co/storage/v1/object/public/media-library/movemental/logos/movemental-logo-transparent-white.webp";

/**
 * Primary header — AI Studio template IA (Pathway mega-menu, Audiences, About, Contact).
 * Theme follows `next-themes` via {@link ThemeToggle} and the mobile row below.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  // Hydration gate — `useSyncExternalStore` returns the server snapshot
  // (false) during SSR/first paint and the client snapshot (true) once
  // hydrated. Avoids `setState` in `useEffect` (lint: react-hooks/set-state-in-effect).
  const mounted = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot,
  );
  const { open: openToolkitModal } = useToolkitModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

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

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          <div className="group relative">
            <Link
              href="/pathway"
              className="flex items-center gap-1 py-4 text-sm font-medium transition-all duration-200 hover:text-primary"
            >
              Movemental Path{" "}
              <svg
                className="h-4 w-4 opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>
            <div className="invisible absolute top-full left-0 z-50 w-64 translate-y-2 rounded-xl border border-border bg-card p-2 opacity-0 shadow-ambient transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <Link
                href="/pathway/safety"
                className={cn(
                  "block rounded-lg px-4 py-3 transition-colors hover:bg-section",
                  pathname.startsWith("/pathway/safety") &&
                    "border-l-2 border-pathway-accent bg-section",
                )}
              >
                <div className="text-sm font-semibold text-foreground">
                  01. Safety
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  AI use & trust charters
                </div>
              </Link>
              <Link
                href="/pathway/sandbox"
                className={cn(
                  "block rounded-lg px-4 py-3 transition-colors hover:bg-section",
                  pathname.startsWith("/pathway/sandbox") &&
                    "border-l-2 border-pathway-accent bg-section",
                )}
              >
                <div className="text-sm font-semibold text-foreground">
                  02. Sandbox
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Safe exploration · Tested use cases · Real work
                </div>
              </Link>
              <Link
                href="/pathway/skills"
                className="block rounded-lg px-4 py-3 transition-colors hover:bg-section"
              >
                <div className="text-sm font-semibold text-foreground">
                  03. Skills
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Cohorts & self-paced training
                </div>
              </Link>
              <Link
                href="/pathway/solutions"
                className="block rounded-lg px-4 py-3 transition-colors hover:bg-section"
              >
                <div className="text-sm font-semibold text-foreground">
                  04. Solutions
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Custom agentic CMS/LMS builds
                </div>
              </Link>
              <Link
                href="/pricing"
                className="block rounded-lg border-t border-border px-4 py-3 transition-colors hover:bg-section"
              >
                <div className="text-sm font-semibold text-foreground">Published pricing</div>
                <div className="mt-1 text-xs text-muted-foreground">Fees for each stage and the Path Bundle</div>
              </Link>
            </div>
          </div>

          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 py-4 text-sm font-medium transition-all duration-200 hover:text-primary"
            >
              Audiences{" "}
              <svg
                className="h-4 w-4 opacity-70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="invisible absolute top-full left-0 z-50 w-48 translate-y-2 rounded-xl border border-border bg-card p-2 opacity-0 shadow-ambient transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <Link
                href="/churches"
                className="block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-section"
              >
                For Churches
              </Link>
              <Link
                href="/nonprofits"
                className="block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-section"
              >
                For Nonprofits
              </Link>
              <Link
                href="/institutions"
                className="block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors hover:bg-section"
              >
                For Institutions
              </Link>
            </div>
          </div>

          <Link
            href="/about"
            className="relative py-4 text-sm font-medium transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:-translate-y-0.5 hover:text-primary hover:after:w-full"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="relative py-4 text-sm font-medium transition-all duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:-translate-y-0.5 hover:text-primary hover:after:w-full"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={() => openToolkitModal({ source: "nav" })}
            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-eyebrow text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Download className="size-3.5" aria-hidden />
            Free Safety Toolkit
          </button>
          <ThemeToggle size="comfortable" />
          <Link href="/contact" className="btn-pill btn-pill--primary py-2.5">
            Start a Conversation
          </Link>
        </div>

        <button
          type="button"
          className="rounded-md p-2 transition-colors hover:bg-section focus:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
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
            className="rounded-md p-2 text-lg font-medium transition-colors hover:bg-section"
          >
            Movemental Path
          </Link>
          <Link
            href="/pricing"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-md p-2 text-base font-medium text-muted-foreground transition-colors hover:bg-section hover:text-foreground"
          >
            Published pricing
          </Link>
          <div className="border-border ml-2 flex flex-col gap-2 border-l-2 py-1 pl-4">
            <span className="px-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              Path stages
            </span>
            <Link
              href="/pathway/safety"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "rounded-md p-2 text-[1.0625rem] font-medium transition-colors hover:bg-section",
                pathname.startsWith("/pathway/safety") && "bg-section",
              )}
            >
              Safety
            </Link>
            <Link
              href="/pathway/sandbox"
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "rounded-md p-2 text-[1.0625rem] font-medium transition-colors hover:bg-section",
                pathname.startsWith("/pathway/sandbox") && "bg-section",
              )}
            >
              Sandbox
            </Link>
            <span className="px-2 pt-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              Products
            </span>
            <Link
              href="/pathway/skills"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md p-2 text-[1.0625rem] font-medium transition-colors hover:bg-section"
            >
              Skills
            </Link>
            <Link
              href="/pathway/solutions"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md p-2 text-[1.0625rem] font-medium transition-colors hover:bg-section"
            >
              Solutions
            </Link>
          </div>
          <div className="border-border ml-2 flex flex-col gap-2 border-l-2 py-1 pl-4">
            <span className="px-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
              Audiences
            </span>
            <Link
              href="/churches"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md p-2 text-[1.0625rem] font-medium transition-colors hover:bg-section"
            >
              For Churches
            </Link>
            <Link
              href="/nonprofits"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md p-2 text-[1.0625rem] font-medium transition-colors hover:bg-section"
            >
              For Nonprofits
            </Link>
            <Link
              href="/institutions"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md p-2 text-[1.0625rem] font-medium transition-colors hover:bg-section"
            >
              For Institutions
            </Link>
          </div>
          <Link
            href="/about"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-md p-2 text-lg font-medium transition-colors hover:bg-section"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-md p-2 text-lg font-medium transition-colors hover:bg-section"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              openToolkitModal({ source: "nav-mobile" });
            }}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-section p-3 text-sm font-medium text-foreground transition-colors hover:bg-border"
          >
            <Download className="size-4" aria-hidden />
            Free Safety Toolkit
          </button>
          <button
            type="button"
            onClick={() => toggleTheme()}
            className="text-foreground/80 mt-4 flex items-center justify-center gap-2 rounded-md bg-section p-3 transition-colors hover:bg-border"
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
