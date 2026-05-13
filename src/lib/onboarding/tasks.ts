export type OnboardingPhase = "commitment" | "identity" | "content" | "activation";

export type OnboardingTaskRequirement = "required" | "optional" | "conditional";

export interface OnboardingTaskDefinition {
  key: string;
  phase: OnboardingPhase;
  title: string;
  description: string;
  estimatedMinutes: number;
  dependsOn: string[];
  requiresMovementalPrep: boolean;
  requirement: OnboardingTaskRequirement;
  route: string;
  iconKey?: string;
}

export const ONBOARDING_TASKS: readonly OnboardingTaskDefinition[] = [
  {
    key: "sign_agreement",
    phase: "commitment",
    title: "Sign agreements (MOU and engagement)",
    description:
      "Open the agreement step: review the MOU text (PDF when available for your org), sign the implementation MOU with your typed legal name in the dashboard, then mark this step complete.",
    estimatedMinutes: 15,
    dependsOn: [],
    requiresMovementalPrep: false,
    requirement: "required",
    route: "/onboarding/agreement",
  },
  {
    key: "confirm_payment",
    phase: "commitment",
    title: "Confirm your payment",
    description: "Confirm payment for your engagement.",
    estimatedMinutes: 5,
    dependsOn: ["sign_agreement"],
    requiresMovementalPrep: false,
    requirement: "required",
    route: "/onboarding/payment",
  },
  {
    key: "choose_cohort",
    phase: "commitment",
    title: "Choose your cohort start date",
    description: "Select the cohort that fits your calendar.",
    estimatedMinutes: 5,
    dependsOn: ["sign_agreement"],
    requiresMovementalPrep: false,
    requirement: "required",
    route: "/onboarding/cohort",
  },
  {
    key: "organization_profile",
    phase: "identity",
    title: "Tell us about your organization",
    description: "Organization name, domain, primary contact, escalation contact.",
    estimatedMinutes: 10,
    dependsOn: ["sign_agreement"],
    requiresMovementalPrep: false,
    requirement: "required",
    route: "/onboarding/organization",
  },
  {
    key: "images_upload",
    phase: "identity",
    title: "Upload images and headshots",
    description: "Photos and logos we could not find or that need updating.",
    estimatedMinutes: 10,
    dependsOn: ["sign_agreement"],
    requiresMovementalPrep: false,
    requirement: "optional",
    route: "/onboarding/images",
  },
  {
    key: "brand_guidelines",
    phase: "identity",
    title: "Brand and voice preferences",
    description: "Colors, fonts, voice notes, terminology preferences, audience details.",
    estimatedMinutes: 20,
    dependsOn: ["sign_agreement"],
    requiresMovementalPrep: false,
    requirement: "optional",
    route: "/onboarding/brand",
  },
  {
    key: "consent_block",
    phase: "identity",
    title: "Confirm your preferences",
    description: "Photography rights, public quoting, cohort visibility, communications.",
    estimatedMinutes: 5,
    dependsOn: ["sign_agreement"],
    requiresMovementalPrep: false,
    requirement: "required",
    route: "/onboarding/consent",
  },
  {
    key: "tax_form",
    phase: "identity",
    title: "Tax documentation",
    description: "W-9 or W-8BEN if your engagement involves payment from Movemental to you.",
    estimatedMinutes: 5,
    dependsOn: ["sign_agreement"],
    requiresMovementalPrep: false,
    requirement: "conditional",
    route: "/onboarding/tax",
  },
  {
    key: "orientation",
    phase: "identity",
    title: "Orientation: what Movemental is",
    description:
      "A short orientation covering what Movemental is, what success looks like, and what to expect.",
    estimatedMinutes: 10,
    dependsOn: ["sign_agreement"],
    requiresMovementalPrep: false,
    requirement: "required",
    route: "/onboarding/orientation",
  },
  {
    key: "corpus_review",
    phase: "content",
    title: "Review your research corpus",
    description:
      "Books, articles, and source material we have compiled. Add what is missing, flag what should not be there.",
    estimatedMinutes: 20,
    dependsOn: ["organization_profile"],
    requiresMovementalPrep: true,
    requirement: "required",
    route: "/onboarding/corpus",
  },
  {
    key: "affiliates_review",
    phase: "content",
    title: "Confirm your affiliated organizations",
    description: "Networks, denominations, and organizations we should associate with your work.",
    estimatedMinutes: 5,
    dependsOn: ["organization_profile"],
    requiresMovementalPrep: true,
    requirement: "required",
    route: "/onboarding/affiliates",
  },
  {
    key: "themes_review",
    phase: "content",
    title: "Review the themes we have identified",
    description: "The editorial themes we see across your work. Affirm, correct, or expand.",
    estimatedMinutes: 10,
    dependsOn: ["corpus_review"],
    requiresMovementalPrep: true,
    requirement: "required",
    route: "/onboarding/themes",
  },
  {
    key: "agent_test",
    phase: "activation",
    title: "Test your AI agent",
    description: "Your personal AI agent is ready. Test it, give feedback, and approve.",
    estimatedMinutes: 15,
    dependsOn: ["themes_review"],
    requiresMovementalPrep: true,
    requirement: "required",
    route: "/onboarding/agent",
  },
  {
    key: "platform_tour",
    phase: "activation",
    title: "Platform tour",
    description: "A short walkthrough of your dashboard and capabilities.",
    estimatedMinutes: 10,
    dependsOn: ["agent_test"],
    requiresMovementalPrep: false,
    requirement: "required",
    route: "/onboarding/tour",
  },
  {
    key: "cohort_prep",
    phase: "activation",
    title: "Cohort prep work",
    description: "A short reflection and intro before your cohort starts.",
    estimatedMinutes: 20,
    dependsOn: ["platform_tour"],
    requiresMovementalPrep: false,
    requirement: "required",
    route: "/onboarding/cohort-prep",
  },
  {
    key: "final_confirmation",
    phase: "activation",
    title: "Confirm you are ready",
    description: "A final review and confirmation that you are fully onboarded.",
    estimatedMinutes: 5,
    dependsOn: ["cohort_prep"],
    requiresMovementalPrep: false,
    requirement: "required",
    route: "/onboarding/confirm",
  },
] as const;

export const ONBOARDING_PHASES: readonly OnboardingPhase[] = [
  "commitment",
  "identity",
  "content",
  "activation",
];

export const TASK_KEY_SET = new Set(ONBOARDING_TASKS.map((t) => t.key));

export function taskDefinitionByKey(key: string): OnboardingTaskDefinition | undefined {
  return ONBOARDING_TASKS.find((t) => t.key === key);
}
