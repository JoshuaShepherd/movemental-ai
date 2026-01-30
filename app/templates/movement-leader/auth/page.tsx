"use client";

import { useState } from "react";
import {
  AuthSplitImage,
  AuthCenteredCard,
  AuthDarkMinimal,
  AuthSocialFirst,
  AuthBrandedHero,
  AuthMagicLink,
  AuthTabbedForm,
  AuthGradientOverlay,
  AuthTemplateSwitcher,
} from "@/components/layouts/movement-leader";
import type { AuthVariant } from "@/components/layouts/movement-leader";

const templateComponents: Record<AuthVariant, React.ComponentType> = {
  "auth-split-image": AuthSplitImage,
  "auth-centered-card": AuthCenteredCard,
  "auth-dark-minimal": AuthDarkMinimal,
  "auth-social-first": AuthSocialFirst,
  "auth-branded-hero": AuthBrandedHero,
  "auth-magic-link": AuthMagicLink,
  "auth-tabbed-form": AuthTabbedForm,
  "auth-gradient-overlay": AuthGradientOverlay,
};

export default function AuthTemplatePage() {
  const [activeTemplate, setActiveTemplate] =
    useState<AuthVariant>("auth-split-image");
  const ActiveComponent = templateComponents[activeTemplate];

  return (
    <div className="template-movement-leader" data-variant={activeTemplate}>
      <div className="sticky top-14 z-40 bg-background border-b">
        <AuthTemplateSwitcher
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
        />
      </div>
      <ActiveComponent />
    </div>
  );
}
