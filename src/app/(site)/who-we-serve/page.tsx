import type { Metadata } from "next";

import { WhoWeServePage as StudioWhoWeServePage } from "@/components/studio/pages/WhoWeServePage";

export const metadata: Metadata = {
  title: "Who we serve",
  description: "Organizations and leaders Movemental is built for.",
};

export default function Page() {
  return (
    <StudioWhoWeServePage />
  );
}
