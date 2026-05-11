import type { Metadata, Viewport } from "next";
import { Inter, Newsreader } from "next/font/google";
import { headers } from "next/headers";

import { SiteFooter } from "@/components/nav/site-footer";
import { SiteHeader } from "@/components/nav/site-header";
import { SiteHeaderCta } from "@/components/nav/site-header-cta";
import { canonicalSiteOrigin } from "@/lib/site-url";

import { Providers } from "./providers";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Newsreader — italic-forward editorial serif used for display headings and
 * emphasized text across the public site and authenticated shells. Replaces
 * Instrument Serif as the primary serif (Phase 01 chrome rationalization).
 * The CSS variable name `--font-serif-display` is preserved so Tailwind
 * aliases (`font-serif`, `font-headline`, `font-serif-display`) continue to
 * resolve without changes elsewhere in the codebase.
 */
const newsreader = Newsreader({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Movemental | A wiser way to navigate AI",
    template: "%s — Movemental",
  },
  description:
    "Movemental walks church and nonprofit leaders through the Movemental Path: Safety, Sandbox, Skills, Solutions, in order — so the mission stays recognizable on the other side.",
  metadataBase: new URL(canonicalSiteOrigin()),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Movemental",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  /** Light paper (`--background`); `ThemeColorSync` in `providers.tsx` updates for dark / saved theme. */
  themeColor: "#faf6ee",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const dashboardShell = h.get("x-movemental-shell") === "dashboard";

  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} h-full min-h-dvh antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <Providers>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          {!dashboardShell ? (
            <SiteHeader
              authDesktopCta={<SiteHeaderCta variant="desktop" />}
              authMobileCta={<SiteHeaderCta variant="mobile" />}
            />
          ) : null}
          <main id="main" className="flex flex-1 flex-col">
            {children}
          </main>
          {!dashboardShell ? <SiteFooter /> : null}
        </Providers>
      </body>
    </html>
  );
}
