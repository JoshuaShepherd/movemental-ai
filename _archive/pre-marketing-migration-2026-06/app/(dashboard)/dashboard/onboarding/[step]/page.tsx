import { notFound } from "next/navigation";

import { AffiliatesReviewTaskPage } from "@/components/onboarding/affiliates-review-task-page";
import { AgentOnboardingTaskPage } from "@/components/onboarding/agent-onboarding-task-page";
import { BrandGuidelinesTaskPage } from "@/components/onboarding/brand-guidelines-task-page";
import { ConsentBlockTaskPage } from "@/components/onboarding/consent-block-task-page";
import { CorpusReviewTaskPage } from "@/components/onboarding/corpus-review-task-page";
import { CohortPrepTaskPage } from "@/components/onboarding/cohort-prep-task-page";
import { FinalConfirmationTaskPage } from "@/components/onboarding/final-confirmation-task-page";
import { ImagesUploadTaskPage } from "@/components/onboarding/images-upload-task-page";
import { OrganizationProfileTaskPage } from "@/components/onboarding/organization-profile-task-page";
import { OrientationTaskPage } from "@/components/onboarding/orientation-task-page";
import { PlatformTourTaskPage } from "@/components/onboarding/platform-tour-task-page";
import {
  AgreementTaskPage,
  CohortTaskPage,
  PaymentTaskPage,
} from "@/components/onboarding/phase1-task-pages";
import { TaxFormTaskPage } from "@/components/onboarding/tax-form-task-page";
import { ThemesReviewTaskPage } from "@/components/onboarding/themes-review-task-page";
import { ONBOARDING_TASKS } from "@/lib/onboarding/tasks";

export const dynamic = "force-dynamic";

const STEP_TO_TASK_KEY: Record<string, string> = {};
for (const t of ONBOARDING_TASKS) {
  const seg = t.route.replace(/^\/onboarding\//, "");
  STEP_TO_TASK_KEY[seg] = t.key;
}

export default async function DashboardOnboardingStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  if (!STEP_TO_TASK_KEY[step]) notFound();

  switch (step) {
    case "agreement":
      return <AgreementTaskPage />;
    case "payment":
      return <PaymentTaskPage />;
    case "cohort":
      return <CohortTaskPage />;
    case "corpus":
      return <CorpusReviewTaskPage />;
    case "organization":
      return <OrganizationProfileTaskPage />;
    case "images":
      return <ImagesUploadTaskPage />;
    case "brand":
      return <BrandGuidelinesTaskPage />;
    case "consent":
      return <ConsentBlockTaskPage />;
    case "tax":
      return <TaxFormTaskPage />;
    case "orientation":
      return <OrientationTaskPage />;
    case "affiliates":
      return <AffiliatesReviewTaskPage />;
    case "themes":
      return <ThemesReviewTaskPage />;
    case "tour":
      return <PlatformTourTaskPage />;
    case "cohort-prep":
      return <CohortPrepTaskPage />;
    case "confirm":
      return <FinalConfirmationTaskPage />;
    case "agent":
      return <AgentOnboardingTaskPage />;
    default:
      notFound();
  }
}
