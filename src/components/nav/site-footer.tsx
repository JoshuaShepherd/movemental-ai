"use client";

import Link from "next/link";

import { Container } from "@/components/studio/Container";

/**
 * Footer — AI Studio template columns + legal strip.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background py-16 md:py-24">
      <Container className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-5 lg:gap-8">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 lg:pr-12">
          <Link
            href="/"
            className="mb-6 inline-block rounded-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
          >
            <h3 className="font-serif-display text-2xl font-bold tracking-tight text-foreground">
              Movemental
            </h3>
          </Link>
          <p className="mb-8 max-w-sm text-[1.0625rem] leading-relaxed text-muted-foreground">
            Helping organizations adopt AI in a way that keeps the mission
            recognizable, and the work responsibly human.
          </p>
          <div className="flex gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-section text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="LinkedIn"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-section text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Twitter"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="col-span-1">
          <h4 className="mb-6 font-semibold">Movemental</h4>
          <ul className="space-y-4 text-foreground/80">
            <li>
              <Link
                href="/about"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/voices"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Movement Voices
              </Link>
            </li>
            <li>
              <Link
                href="/library"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Library
              </Link>
            </li>
            <li>
              <Link
                href="/field-guide"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Field guide
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/how-we-use-ai"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                How we use AI
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-semibold">Who we serve</h4>
          <ul className="space-y-4 text-foreground/80">
            <li>
              <Link
                href="/who-we-serve"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Who we serve
              </Link>
            </li>
            <li>
              <Link
                href="/churches"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Churches
              </Link>
            </li>
            <li>
              <Link
                href="/nonprofits"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Nonprofits
              </Link>
            </li>
            <li>
              <Link
                href="/institutions"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Institutions
              </Link>
            </li>
            <li>
              <Link
                href="/movement-leaders"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Movement leaders
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-semibold">Get started</h4>
          <ul className="space-y-4 text-foreground/80">
            <li>
              <Link
                href="/assess"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Take the diagnostic
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Start a conversation
              </Link>
            </li>
            <li>
              <Link
                href="/field-guide"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Read the field guide
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-foreground/60 md:flex-row">
        <p>© {new Date().getFullYear()} Movemental. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/terms" className="transition-colors hover:text-primary">
            Terms
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-primary">
            Privacy
          </Link>
          <Link href="/cookies" className="transition-colors hover:text-primary">
            Cookies
          </Link>
        </div>
      </Container>
    </footer>
  );
}
