"use client";

import { useState } from "react";
import {
  PricingComparisonTable,
  PricingTeamCalculator,
  PricingTierCards,
  PricingPartnerSteps,
  PricingBusinessTiers,
  PricingMembershipGrid,
  PricingTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { PricingVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<PricingVariant, React.ComponentType> = {
  "pricing-comparison-table": PricingComparisonTable,
  "pricing-team-calculator": PricingTeamCalculator,
  "pricing-tier-cards": PricingTierCards,
  "pricing-partner-steps": PricingPartnerSteps,
  "pricing-business-tiers": PricingBusinessTiers,
  "pricing-membership-grid": PricingMembershipGrid,
};

export default function PricingTemplatePage() {
  const [activeTemplate, setActiveTemplate] = useState<PricingVariant>("pricing-tier-cards");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      <div className="sticky top-14 z-40 bg-background border-b">
        <PricingTemplateSwitcher activeTemplate={activeTemplate} onTemplateChange={setActiveTemplate} />
      </div>
      <ActiveComponent />
    </div>
  );
}
