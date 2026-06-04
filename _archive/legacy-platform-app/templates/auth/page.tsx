"use client";

import { useState , useEffect } from "react";
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
import { useTemplateVariant } from "@/app/templates/template-variant-context";

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

  const { setVariant } = useTemplateVariant();
  useEffect(() => { setVariant(activeTemplate); }, [activeTemplate, setVariant]);

  return (
    <>
      <div className="sticky top-14 z-40 bg-background border-b">
        <AuthTemplateSwitcher
          activeTemplate={activeTemplate}
          onTemplateChange={setActiveTemplate}
        />
      </div>
      <ActiveComponent />
    </>
  );
}
