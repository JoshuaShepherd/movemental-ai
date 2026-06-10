import type { Metadata } from "next";

import { LeaderSectionPage } from "../_components/leader-section-page";

export const metadata: Metadata = {
  title: "Network",
};

export default function Page() {
  return <LeaderSectionPage section="network" />;
}
