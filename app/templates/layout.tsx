"use client";

import { SiteNavigation } from "@/components/layouts/movement-leader";

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="template-movement-leader">
        <SiteNavigation />
      </div>
      {children}
    </div>
  );
}
