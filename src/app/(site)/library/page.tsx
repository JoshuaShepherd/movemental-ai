import type { Metadata } from "next";

import { LibraryPage as StudioLibraryPage } from "@/components/studio/pages/LibraryPage";

export const metadata: Metadata = {
  title: "Library",
  description: "Articles, podcasts, video, and documents from Movemental.",
};

export default function Page() {
  return (
    <StudioLibraryPage />
  );
}
