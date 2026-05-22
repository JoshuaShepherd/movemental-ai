import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Nothing_You_Could_Do } from "next/font/google";

import { HomePaperClient } from "./home-paper-client";
import styles from "./home-paper.module.css";

/**
 * /home-paper — a self-contained "field edition" of the Movemental home page.
 * Renders without the sitewide SiteHeader/SiteFooter (paper-shell is injected
 * by proxy.ts and read by the root layout). All styles are scoped via
 * `home-paper.module.css`, so the page's tokens (paper, ink, blue ballpoint,
 * yellow highlighter, navy AI dock) do not leak into the rest of the site.
 */
const fraunces = Fraunces({
  variable: "--font-paper-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const nothingYouCouldDo = Nothing_You_Could_Do({
  variable: "--font-paper-hand",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-paper-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Movemental — A Field Edition",
  description:
    "Movemental on paper: the four-stage Path, set in serif, annotated in blue ballpoint ink, cited by a small AI alongside.",
};

export default function Page() {
  const fontVars = [
    fraunces.variable,
    nothingYouCouldDo.variable,
    plexMono.variable,
  ].join(" ");

  return (
    <div className={`${styles["paper-root"]} ${fontVars}`}>
      <HomePaperClient />
    </div>
  );
}
