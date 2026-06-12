import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, IBM_Plex_Mono } from "next/font/google";
import { canonicalSiteOrigin } from "@/lib/site-url";

import { AnnouncementBar } from "@/components/announcement-bar";

import { Providers } from "./providers";

import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

/** Ink Band display face — Playfair Display for headings in the agent room. */
const playfairDisplay = Playfair_Display({
  variable: "--font-ink-display-face",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Ink Band machinery face — IBM Plex Mono for labels and metadata. */
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ink-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Movemental | A wiser way to navigate AI",
    template: "%s | Movemental",
  },
  description:
    "Movemental helps church and nonprofit leaders complete the Movemental Path: Safety, Sandbox, Training, Technology, in order, so the mission stays recognizable on the other side.",
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
  themeColor: "#fbfaf6",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} ${ibmPlexMono.variable} h-full min-h-dvh antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <Providers>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <AnnouncementBar />
          <main id="main" className="flex min-w-0 flex-1 flex-col">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
