import type { Metadata } from "next";

import { CookiesPageContent } from "@/components/sections/legal-cookies/cookies-page-content";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Movemental uses cookies and similar technologies on this website, and how you can control them.",
};

export default function CookiesPage() {
  return <CookiesPageContent />;
}
