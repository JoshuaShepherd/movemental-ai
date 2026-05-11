import type { Metadata } from "next";

import { LeaderSectionPage } from "../_components/leader-section-page";

export const metadata: Metadata = {
  title: "Calling",
};

export default function Page() {
  return <LeaderSectionPage section="calling" />;
}
