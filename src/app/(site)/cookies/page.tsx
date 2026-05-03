import type { Metadata } from "next";

import { CookiesPage as StudioCookiesPage } from "@/components/studio/pages/CookiesPage";

export const metadata: Metadata = {
  title: "Cookies",
  description: "How Movemental uses cookies.",
};

export default function Page() {
  return (
    <StudioCookiesPage />
  );
}
