import type { Metadata } from "next";

import { LeaderSectionPage } from "./_components/leader-section-page";

export const metadata: Metadata = {
  title: "Leader workspace",
  description: "Reflected understanding — seven-section author reflection.",
};

export default function LeaderHomePage() {
  return <LeaderSectionPage section="overview" />;
}
