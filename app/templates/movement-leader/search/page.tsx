"use client";

import { useState } from "react";
import { SearchAiAssistant, SearchMinimalCentered, SearchResourceHub, SearchTemplateSwitcher } from "@/components/layouts/movement-leader";
import type { SearchVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<SearchVariant, React.ComponentType> = {
  "search-ai-assistant": SearchAiAssistant,
  "search-minimal-centered": SearchMinimalCentered,
  "search-resource-hub": SearchResourceHub,
};

export default function SearchTemplatePage() {
  const [activeTemplate, setActiveTemplate] = useState<SearchVariant>("search-ai-assistant");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      <div className="sticky top-14 z-40 bg-background border-b">
        <SearchTemplateSwitcher activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
      </div>
      <ActiveComponent />
    </div>
  );
}
