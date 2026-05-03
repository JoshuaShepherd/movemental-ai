import type { Metadata } from "next";

import { LabPage as StudioLabPage } from "@/components/studio/pages/pathway/LabPage";

export const metadata: Metadata = {
  title: "Sandbox Discovery",
  description: "Mile Marker 02 — facilitated sandbox discovery and use-case sprints.",
};

export default function Page() {
  return (
    <StudioLabPage />
  );
}
