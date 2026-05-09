import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { headers } from "next/headers";

import { SiteFooter } from "@/components/nav/site-footer";
import { SiteHeader } from "@/components/nav/site-header";
import { canonicalSiteOrigin } from "@/lib/site-url";

import { Providers } from "./providers";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Movemental | A wiser way to navigate AI",
    template: "%s — Movemental",
  },
  description:
    "Movemental walks church and nonprofit leaders through the AI Stewardship Sequence: Safety, Sandbox, Skills, Solutions, in order — so the mission stays recognizable on the other side.",
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
      className={`${inter.variable} ${instrumentSerif.variable} h-full min-h-dvh antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <Providers>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          {!dashboardShell ? <SiteHeader /> : null}
          <main id="main" className="flex flex-1 flex-col">
            {children}
          </main>
          {!dashboardShell ? <SiteFooter /> : null}
        </Providers>
      </body>
    </html>
  );
}
