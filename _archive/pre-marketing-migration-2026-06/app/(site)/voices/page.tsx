import type { Metadata } from "next";

import { VoicesPage as StudioVoicesPage } from "@/components/studio/pages/VoicesPage";

export const metadata: Metadata = {
  title: "Movement Leaders",
  description: "Movement Leaders joining the conversation — credibility and relational proof.",
};

export default function Page() {
  return (
    <StudioVoicesPage />
  );
}
