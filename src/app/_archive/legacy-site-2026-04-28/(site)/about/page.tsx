import type { Metadata } from "next";

import { AboutPageContent } from "@/components/sections/about/about-page-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Movemental builds systems that bring fragmented informational and relational intelligence into one coherent platform — for work that is meant to form people, not just attract attention.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
