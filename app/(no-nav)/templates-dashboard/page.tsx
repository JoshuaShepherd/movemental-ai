import { Metadata } from "next";
import { TemplatesDashboardClient } from "./TemplatesDashboardClient";

export const metadata: Metadata = {
  title: "Featured Website Templates | Movemental",
  description:
    "The best templates hand-picked by the team. Browse and discover website templates.",
};

export default function TemplatesDashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <TemplatesDashboardClient />
    </div>
  );
}
