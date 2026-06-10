import type { Metadata } from "next";

import { LeaderSectionPage } from "../_components/leader-section-page";

export const metadata: Metadata = {
  title: "Gaps",
};

export default function Page() {
  return <LeaderSectionPage section="gaps" />;
}
