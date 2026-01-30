"use client";

import { useState } from "react";
import {
  SearchAiAssistant,
  SearchMinimalCentered,
  SearchResourceHub,
  SearchFacetedFilters,
  SearchCommandPalette,
  SearchDiscoveryGrid,
  SearchResultsList,
  SearchDarkSpotlight,
  SearchAiConversational,
  SearchTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { SearchVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<SearchVariant, React.ComponentType> = {
  "search-ai-assistant": SearchAiAssistant,
  "search-minimal-centered": SearchMinimalCentered,
  "search-resource-hub": SearchResourceHub,
  "search-faceted-filters": SearchFacetedFilters,
  "search-command-palette": SearchCommandPalette,
  "search-discovery-grid": SearchDiscoveryGrid,
  "search-results-list": SearchResultsList,
  "search-dark-spotlight": SearchDarkSpotlight,
  "search-ai-conversational": SearchAiConversational,
};

export default function SearchTemplatePage() {
  const [activeTemplate, setActiveTemplate] =
    useState<SearchVariant>("search-ai-assistant");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      <div className="sticky top-14 z-40 bg-background border-b">
        <SearchTemplateSwitcher
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
        />
      </div>
      <ActiveComponent />
    </div>
  );
}
