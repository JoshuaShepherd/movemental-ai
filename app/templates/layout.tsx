"use client";

import "@/app/styles/templates/movement-leader.css";
import { SiteNavigation } from "@/components/layouts/movement-leader";
import { VariantProvider } from "./template-variant-context";

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VariantProvider>
      <SiteNavigation />
      {children}
    </VariantProvider>
  );
}
