import { onboardingResponses } from "@/lib/db/schema";
import {
  OnboardingResponsesSelectSchema,
  OnboardingResponsesInsertSchema,
  OnboardingResponsesUpdateSchema,
  OnboardingResponsesFiltersSchema,
  type OnboardingResponses,
  type OnboardingResponsesCreate,
  type OnboardingResponsesUpdate,
  type OnboardingResponsesFilters,
} from "@/lib/schemas";
import { SimplifiedService } from "./base.service";

export class OnboardingResponsesService extends SimplifiedService<
  typeof onboardingResponses,
  OnboardingResponses,
  OnboardingResponsesCreate,
  OnboardingResponsesUpdate,
  OnboardingResponsesFilters
> {
  constructor() {
    super(
      onboardingResponses,
      OnboardingResponsesSelectSchema,
      OnboardingResponsesInsertSchema,
      OnboardingResponsesUpdateSchema,
      OnboardingResponsesFiltersSchema,
    );
  }
}

export const onboardingResponsesService = new OnboardingResponsesService();
