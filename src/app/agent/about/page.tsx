import type { Metadata } from "next";

import { AboutExperience } from "@/components/agent-room/about/about-experience";

export const metadata: Metadata = {
  title: "About Movemental",
  description:
    "Who we are, why we exist, and what we believe. The authorship break, fragmentation, the Babel and Pentecost ethic, and the formation stakes for a generation asking the machine what it used to ask the church.",
  alternates: {
    canonical: "/agent/about",
  },
};

/** `/agent/about` — the why and the ethic behind Movemental. */
export default function AboutPage() {
  return <AboutExperience />;
}
