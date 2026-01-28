"use client";

import { useState } from "react";
import { ReaderDocsSidebar, ReaderEbookDark, ReaderTemplateSwitcher } from "@/components/layouts/movement-leader";
import type { ReaderVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<ReaderVariant, React.ComponentType> = {
  "reader-docs-sidebar": ReaderDocsSidebar,
  "reader-ebook-dark": ReaderEbookDark,
};

export default function ReaderTemplatePage() {
  const [activeTemplate, setActiveTemplate] = useState<ReaderVariant>("reader-docs-sidebar");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      <div className="sticky top-14 z-40 bg-background border-b">
        <ReaderTemplateSwitcher activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
      </div>
      <ActiveComponent />
    </div>
  );
}
