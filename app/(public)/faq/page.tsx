import { Metadata } from "next";
import { FaqSection } from "@/components/faq/FaqSection";

export const metadata: Metadata = {
  title: "FAQ | Movemental",
  description:
    "Frequently asked questions about Movemental: billing, ownership, roles, platform, and support. Who owns what, how plans work, and how to get started.",
  openGraph: {
    title: "FAQ | Movemental",
    description:
      "Questions about billing, ownership, roles, and the platform. Movemental helps movement leaders own their content and keep 90% of revenue.",
    type: "website",
  },
};

export default function FaqPage() {
  return <FaqSection showHeader={false} title="FAQ" />;
}
