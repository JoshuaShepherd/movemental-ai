import Link from "next/link";

import { Container } from "@/components/studio/Container";
import { env } from "@/lib/env";
import { listMembershipOrganizations } from "@/lib/services/onboarding/onboarding.service";
import { createClient } from "@/lib/supabase/server";

/**
 * Footer — IA columns + legal strip + organization entry points (sign-in /
 * dashboard) demoted from the header per marketing IA.
 */
export async function SiteFooter() {
  let showOrgDashboard = false;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.id) {
      const memberships = await listMembershipOrganizations(user.id);
      showOrgDashboard = memberships.length > 0;
    }
  } catch {
    /* unauthenticated or transient — omit org dashboard link */
  }

  const linkedInUrl = env.NEXT_PUBLIC_SOCIAL_LINKEDIN_URL;

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
            Helping organizations adopt AI in a way that keeps the mission recognizable, and the
            work responsibly human.
          </p>
          {linkedInUrl ? (
            <div className="flex gap-4">
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-section text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Movemental on LinkedIn"
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
            </div>
          ) : null}
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
                href="/movement-leaders"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Movement Leaders
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
                href="/field-guides"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Field guide
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Pricing
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
                href="/footnotes"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Claims and sources
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
          <h4 className="mb-6 font-semibold">Audiences</h4>
          <ul className="space-y-4 text-foreground/80">
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
                Take the assessment
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
                href="/field-guides"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Read the field guide
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
              >
                Organization sign-in
              </Link>
            </li>
            {showOrgDashboard ? (
              <li>
                <Link
                  href="/dashboard"
                  className="decoration-primary/30 underline-offset-4 transition-colors hover:text-primary hover:underline hover:decoration-primary"
                >
                  Organization dashboard
                </Link>
              </li>
            ) : null}
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
